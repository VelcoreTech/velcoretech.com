# -------------------------------
# Velcore Deploy Makefile
# -------------------------------

SSH_USER ?= amrx
SSH_PORT ?= 1337
DOMAIN   ?= velcoretech.com

LAN_HOST ?= 10.30.0.2
WAN_HOST ?= 76.235.132.229
NET      ?= auto   # auto | lan | wan

# Pick host based on NET. For auto: prefer LAN if reachable via SSH.
SSH_HOST = $(shell \
	if [ "$(NET)" = "lan" ]; then echo "$(LAN_HOST)"; \
	elif [ "$(NET)" = "wan" ]; then echo "$(WAN_HOST)"; \
	else \
		ssh -p $(SSH_PORT) -o BatchMode=yes -o ConnectTimeout=2 $(SSH_USER)@$(LAN_HOST) "true" >/dev/null 2>&1 && echo "$(LAN_HOST)" || echo "$(WAN_HOST)"; \
	fi \
)

export SSH_USER SSH_PORT DOMAIN LAN_HOST WAN_HOST NET SSH_HOST

.PHONY: help dev build deploy deploy-dry smoke live verify-live releases rollback post-test verify logs lastlog drain queue scrub-queue

help:
	@echo "Targets:"
	@echo "  make dev            - Run local Vite dev server"
	@echo "  make build          - Build production dist/ + write dist/build.txt"
	@echo "  make deploy         - Build + upload + promote + smoke (uses NET=$(NET) => $(SSH_HOST))"
	@echo "  make deploy-dry      - Dry-run deploy (non-mutating)"
	@echo "  make smoke          - Remote checks (services/api/nginx + remote build.txt)"
	@echo "  make live           - Show remote build marker (via https + ssh fallback)"
	@echo "  make verify-live     - Compare local dist/build.txt vs remote current/dist/build.txt"
	@echo "  make releases        - List latest releases on server"
	@echo "  make rollback REL=<release-id> - Roll back current -> REL"
	@echo "  make post-test TEST_EMAIL=you@domain.com - POST /api/contact"
	@echo "  make verify          - Check local prerequisites"
	@echo "  make logs            - List deploy logs"
	@echo "  make lastlog         - Tail latest deploy log"
	@echo "  make queue           - Show mail queue depth + most recent error"
	@echo "  make drain           - Trigger remote mail-queue drain + show last log lines"
	@echo "  make scrub-queue     - Show full details of every queued job. PRUNE=1 deletes all."
	@echo ""
	@echo "Network:"
	@echo "  NET=auto (default) prefers LAN_HOST if reachable"
	@echo "  NET=lan forces LAN_HOST=$(LAN_HOST)"
	@echo "  NET=wan forces WAN_HOST=$(WAN_HOST)"
	@echo ""
	@echo "Resolved target (this run): $(SSH_USER)@$(SSH_HOST):$(SSH_PORT)"

dev:
	npm run dev

build:
	npm run build
	@mkdir -p dist
	@BUILD_TS="$$(date -u +%Y-%m-%dT%H:%M:%SZ)"; \
	BUILD_SHA="$$(git rev-parse --short HEAD 2>/dev/null || echo no-git)"; \
	echo "$$BUILD_TS - $$BUILD_SHA" > dist/build.txt; \
	echo "Build marker: $$(cat dist/build.txt)"

deploy: build
	./scripts/deploy.sh

deploy-dry:
	./scripts/deploy.sh --dry-run --no-build

# Remote smoke checks only (DO NOT call deploy.sh here; keep it non-mutating)
smoke:
	@echo "Target: $(SSH_USER)@$(SSH_HOST):$(SSH_PORT)"
	@ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) \
	"set -e; \
	echo '[services]'; systemctl is-active nginx; systemctl is-active velcore-api; \
	echo '[api local]'; curl -fsS http://127.0.0.1:8088/api/health; echo; \
	echo '[api public]'; curl -fsS https://$(DOMAIN)/api/health; echo; \
	echo '[nginx test]'; sudo -n nginx -t >/dev/null && echo 'nginx config ok'; \
	echo '[build marker file]'; cat /var/www/velcoretech/current/dist/build.txt 2>/dev/null || echo 'no build.txt'"

# Prefer public check, fall back to SSH if /build.txt isn't mapped publicly
live:
	@echo "Resolved target: $(SSH_USER)@$(SSH_HOST):$(SSH_PORT) (NET=$(NET))"
	@echo "Public build marker (https://$(DOMAIN)/build.txt):"
	@curl -fsS https://$(DOMAIN)/build.txt 2>/dev/null || echo "no public build.txt (maybe nginx not mapped)"
	@echo
	@echo "Server build marker (/var/www/velcoretech/current/dist/build.txt):"
	@ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "cat /var/www/velcoretech/current/dist/build.txt 2>/dev/null || echo 'no build.txt'"

verify-live:
	@test -f dist/build.txt || (echo "ERROR: dist/build.txt missing. Run: make build" && exit 1)
	@echo "Local : $$(cat dist/build.txt)"
	@echo -n "Remote: "
	@ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "cat /var/www/velcoretech/current/dist/build.txt 2>/dev/null || echo 'no build.txt'"

releases:
	@ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) \
	"ls -1dt /var/www/velcoretech/releases/* 2>/dev/null | sed 's#.*/##' | head -n 20"

rollback:
	@test -n "$(REL)" || (echo "ERROR: set REL=<release-id> (see: make releases)" && exit 1)
	@ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "sudo -n /usr/local/bin/velcore-rollback.sh $(REL)"

post-test:
	@test -n "$(TEST_EMAIL)" || (echo "ERROR: set TEST_EMAIL=you@domain.com" && exit 1)
	curl -fsS -X POST https://$(DOMAIN)/api/contact \
	  -H "Content-Type: application/json" \
	  -d '{"name":"Make Test","company":"Velcore Test","email":"$(TEST_EMAIL)","phone":"555-555-5555","users":"11-25 users","challenge":"IT Assessment","message":"Makefile post-test submission.","website":""}' ; \
	echo

verify:
	@command -v npm >/dev/null
	@command -v rsync >/dev/null
	@command -v ssh >/dev/null
	@test -f package.json
	@echo "OK: local prerequisites"
	@echo "Resolved target: $(SSH_USER)@$(SSH_HOST):$(SSH_PORT) (NET=$(NET))"

logs:
	@ls -lt logs 2>/dev/null | head -n 20 || true

lastlog:
	@ls -t logs/deploy-*.log 2>/dev/null | head -n 1 | xargs -I{} sh -c 'echo "==> {}"; tail -n 180 {}'

# Show current mail-queue depth + the most-recent job's lastError
queue:
	@echo "Target: $(SSH_USER)@$(SSH_HOST):$(SSH_PORT)"
	@ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) \
		"echo -n 'depth: '; ls /var/lib/velcore-mail-queue/*.json 2>/dev/null | wc -l; \
		latest=\$$(ls -t /var/lib/velcore-mail-queue/*.json 2>/dev/null | head -1); \
		if [ -n \"\$$latest\" ]; then \
			echo 'latest:'; \
			cat \"\$$latest\" | tr ',' '\\n' | grep -E '\"id\"|\"attempts\"|\"nextAttemptAt\"|\"lastError\"' || true; \
		else echo 'queue empty'; fi"

# Show full details of every queued mail job. PRUNE=1 deletes all jobs.
scrub-queue:
	@echo "Target: $(SSH_USER)@$(SSH_HOST):$(SSH_PORT)"
	@ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) \
		"shopt -s nullglob; jobs=(/var/lib/velcore-mail-queue/*.json); \
		if [ \$${#jobs[@]} -eq 0 ]; then echo 'queue empty'; exit 0; fi; \
		echo \"depth: \$${#jobs[@]}\"; \
		for f in \"\$${jobs[@]}\"; do \
			echo \"--- \$$(basename \$$f)\"; \
			python3 -c \"import json,sys; j=json.load(open(sys.argv[1])); print('  id:', j.get('id','?'), '\n  attempts:', j.get('attempts',0), '\n  nextAttempt:', j.get('nextAttemptAt','?'), '\n  lastError:', str(j.get('lastError','none'))[:160])\" \"\$$f\"; \
		done; \
		if [ '$(PRUNE)' = '1' ]; then rm -f \"\$${jobs[@]}\"; echo ''\nAll jobs pruned.''; fi"

# Manually trigger the queue drainer + tail recent logs.
# Requires passwordless sudo for systemctl/journalctl on the server.
drain:
	@echo "Target: $(SSH_USER)@$(SSH_HOST):$(SSH_PORT)"
	@ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) \
		"sudo -n systemctl start velcore-mail-drain.service && \
		sleep 2 && \
		sudo -n journalctl -u velcore-mail-drain.service -n 5 --no-pager && \
		echo '---queue depth after drain---' && \
		ls /var/lib/velcore-mail-queue/*.json 2>/dev/null | wc -l"
