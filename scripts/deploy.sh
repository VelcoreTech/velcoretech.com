#!/usr/bin/env bash
set -euo pipefail

# ---------------------------
# Network selection
# ---------------------------
LAN_HOST="${LAN_HOST:-10.30.0.2}"
WAN_HOST="${WAN_HOST:-76.235.132.229}"
NET="${NET:-auto}"          # lan | wan | auto

# Inherited from Makefile (or env)
SSH_USER="${SSH_USER:-amrx}"
SSH_PORT="${SSH_PORT:-1337}"
DOMAIN="${DOMAIN:-velcoretech.com}"

REMOTE_BASE="/var/www/velcoretech"
REMOTE_STAGE="${REMOTE_BASE}/.deploy/tmp"
PROMOTE_CMD="/usr/local/bin/velcore-promote.sh"

# Flags
DRY_RUN=0
NO_BUILD=0
DO_SMOKE=1

usage() {
  cat <<EOF
Usage: scripts/deploy.sh [--dry-run] [--no-build] [--no-smoke]

Env:
  NET=lan|wan|auto         (default: auto)
  LAN_HOST=192.168.1.199
  WAN_HOST=76.235.132.229
  SSH_USER=amrx
  SSH_PORT=1337
  DOMAIN=velcoretech.com
EOF
}

for arg in "${@:-}"; do
  case "$arg" in
    --dry-run)  DRY_RUN=1 ;;
    --no-build) NO_BUILD=1 ;;
    --no-smoke) DO_SMOKE=0 ;;
    -h|--help)  usage; exit 0 ;;
    "") ;;
    *) echo "Unknown arg: $arg"; usage; exit 2 ;;
  esac
done

pick_host() {
  if [[ "$NET" == "lan" ]]; then echo "$LAN_HOST"; return; fi
  if [[ "$NET" == "wan" ]]; then echo "$WAN_HOST"; return; fi

  # auto: prefer LAN if reachable quickly
  if ssh -p "${SSH_PORT}" -o BatchMode=yes -o ConnectTimeout=2 "${SSH_USER}@${LAN_HOST}" "true" >/dev/null 2>&1; then
    echo "$LAN_HOST"
  else
    echo "$WAN_HOST"
  fi
}

SSH_HOST="$(pick_host)"

# ---------------------------
# Pretty output + logging
# ---------------------------
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

mkdir -p logs
LOG_FILE="logs/deploy-$(date +%Y%m%d-%H%M%S).log"
exec > >(tee -a "$LOG_FILE") 2>&1

ok()   { echo "  ✅  $*"; }
warn() { echo "  ⚠️  $*" >&2; }
fail() { echo "  ❌  $*" >&2; exit 1; }
step() { echo; echo "[*] $*"; }

echo "============================================================"
echo "Velcore Deploy (releases)"
echo "============================================================"
echo "Target          : ${SSH_USER}@${SSH_HOST}:${SSH_PORT}   (NET=${NET})"
echo "Remote base     : ${REMOTE_BASE}"
echo "Remote stage    : ${REMOTE_STAGE}"
echo "Domain          : ${DOMAIN}"
echo "Flags           : DRY_RUN=${DRY_RUN}  NO_BUILD=${NO_BUILD}  DO_SMOKE=${DO_SMOKE}"
echo "Log file        : ${LOG_FILE}"
echo "------------------------------------------------------------"

step "Preflight (local tools)"
command -v npm  >/dev/null || fail "npm not found"
command -v rsync >/dev/null || fail "rsync not found"
command -v ssh  >/dev/null || fail "ssh not found"
[[ -f package.json ]] || fail "package.json not found (run from repo root?)"
ok "Local prerequisites OK"

step "Preflight (SSH connectivity)"
ssh -p "${SSH_PORT}" -o BatchMode=yes -o ConnectTimeout=8 "${SSH_USER}@${SSH_HOST}" "true" >/dev/null \
  || fail "SSH failed (keys/port/host)"
ok "SSH OK"

step "Preflight (sudo NOPASSWD for promote + nginx)"
ssh -p "${SSH_PORT}" -o BatchMode=yes -o ConnectTimeout=8 "${SSH_USER}@${SSH_HOST}" \
  "sudo -n /usr/sbin/nginx -t >/dev/null && sudo -n ${PROMOTE_CMD} --help >/dev/null 2>&1 || true" >/dev/null \
  || fail "sudo -n blocked. Fix /etc/sudoers.d/velcore-deploy"
ok "sudo -n OK"

# ---------------------------
# Build
# ---------------------------
if [[ "$NO_BUILD" -eq 0 ]]; then
  step "Build frontend (npm run build)"
  npm run build
  ok "Build completed"
else
  step "Build skipped (--no-build)"
  warn "Using existing dist/"
fi

step "Write build marker (dist/build.txt)"
BUILD_TS="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
BUILD_SHA="$(git rev-parse --short HEAD 2>/dev/null || echo 'no-git')"
echo "${BUILD_TS} - ${BUILD_SHA}" > dist/build.txt
ok "Build marker written: ${BUILD_TS} - ${BUILD_SHA}"

step "Validate dist/"
[[ -d dist ]] || fail "dist/ missing"
[[ -f dist/index.html ]] || fail "dist/index.html missing"
[[ -f dist/build.txt ]] || fail "dist/build.txt missing"
ok "dist/ looks valid"

# ---------------------------
# Remote stage prep
# ---------------------------
step "Prepare remote stage directory"
ssh -p "${SSH_PORT}" "${SSH_USER}@${SSH_HOST}" \
  "mkdir -p '${REMOTE_STAGE}' && rm -rf '${REMOTE_STAGE:?}/'*"
ok "Remote stage ready"

# ---------------------------
# Upload
# ---------------------------
step "Upload dist/ to remote stage"
RSYNC_FLAGS=(-avz --delete -e "ssh -p ${SSH_PORT}")
if [[ "$DRY_RUN" -eq 1 ]]; then
  RSYNC_FLAGS+=(--dry-run)
  warn "Dry-run enabled"
fi

rsync "${RSYNC_FLAGS[@]}" dist/ "${SSH_USER}@${SSH_HOST}:${REMOTE_STAGE}/"
ok "Rsync completed"

if [[ "$DRY_RUN" -eq 1 ]]; then
  step "Dry-run cleanup (remote stage)"
  ssh -p "${SSH_PORT}" "${SSH_USER}@${SSH_HOST}" "rm -rf '${REMOTE_STAGE:?}/'*" || true
  ok "Dry-run complete (non-mutating). Log: ${LOG_FILE}"
  exit 0
fi

# ---------------------------
# Promote
# ---------------------------
step "Promote release on server"
ssh -p "${SSH_PORT}" "${SSH_USER}@${SSH_HOST}" "sudo -n ${PROMOTE_CMD}"
ok "Promote OK"

# ---------------------------
# Smoke
# ---------------------------
if [[ "$DO_SMOKE" -eq 1 ]]; then
  step "Smoke checks (remote)"
  ssh -p "${SSH_PORT}" "${SSH_USER}@${SSH_HOST}" \
    "set -e;
     echo '[services]'; systemctl is-active nginx; systemctl is-active velcore-api;
     echo '[api local]'; curl -fsS http://127.0.0.1:8088/api/health; echo;
     echo '[api public]'; curl -fsS https://${DOMAIN}/api/health; echo;
     echo '[build marker]'; cat /var/www/velcoretech/current/dist/build.txt; echo;
     echo '[nginx test]'; sudo -n nginx -t >/dev/null && echo 'nginx config ok'"
  ok "Smoke OK"
else
  step "Smoke skipped (--no-smoke)"
fi

echo
echo "SUMMARY:"
echo "  Target : ${SSH_HOST} (NET=${NET})"
echo "  Build  : $(cat dist/build.txt 2>/dev/null || echo 'n/a')"
echo "  Live   : $(ssh -p "${SSH_PORT}" "${SSH_USER}@${SSH_HOST}" "cat /var/www/velcoretech/current/dist/build.txt 2>/dev/null || echo 'no-build.txt'")"
echo "  Log    : ${LOG_FILE}"
ok "Done"
