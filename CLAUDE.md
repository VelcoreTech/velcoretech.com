# Velcore Tech — Project Notes

VelcoreTech is a Managed Services / Cybersecurity firm based in Santa Cruz, CA. This repo
is **V3** of velcoretech.com — a React/Vite/TypeScript site with structured local-SEO
architecture and a small Node API for the contact form.

`README.md` is the SEO/routing handbook (URL rules, city-hub pattern, Helmet/JSON-LD
requirements). This file is the operational handbook (where things live, how to deploy,
how mail flows). **`ROADMAP.md` is the prioritized improvement backlog** — check it
before starting new work; mark items `[x]` as you finish them.

---

## Production server — "the server"

When the user says **"the server"**, they mean the box that hosts velcoretech.com.

| What | Value |
|---|---|
| LAN host | `10.30.0.2` |
| WAN host | `76.235.132.229` |
| SSH user | `amrx` |
| SSH port | `1337` |
| OS | Ubuntu (Linux 5.15) |
| Web | nginx (`/etc/nginx/sites-enabled/`) |
| TLS / domain | `velcoretech.com` |

Connect: `ssh -p 1337 amrx@10.30.0.2` (the Makefile auto-picks LAN if reachable, else WAN).

### Server layout

| Path | Purpose |
|---|---|
| `/var/www/velcoretech/current` | Live release symlink (`dist/` from this repo) |
| `/var/www/velcoretech/releases/` | Past releases (rollback targets) |
| `/var/www/velcoretech/DEPLOYED.txt` | Last deploy marker |
| `/opt/velcore-api/` | Contact-form API (Express 5 + nodemailer) |
| `/opt/velcore-api/index.js` | API server (binds `127.0.0.1:8088`) |
| `/opt/velcore-api/drain-queue.js` | Mail-queue retry worker |
| `/opt/velcore-api/.env` | API/SMTP config (root:root 0640 — needs sudo to read) |
| `/var/lib/velcore-mail-queue/` | Disk-backed mail queue (one JSON per job) |

### systemd services

| Unit | Type | Notes |
|---|---|---|
| `nginx.service` | always-on | TLS termination + static + `/api/*` reverse proxy |
| `velcore-api.service` | always-on | Runs as `www-data`. Has `EnvironmentFile=/opt/velcore-api/.env` |
| `velcore-mail-drain.timer` | every 60s | Triggers `velcore-mail-drain.service` |
| `velcore-mail-drain.service` | oneshot | Drains queued jobs. **Has a drop-in override at** `/etc/systemd/system/velcore-mail-drain.service.d/override.conf` adding `EnvironmentFile=` so it can see SMTP creds (the unit runs as `www-data` and `.env` is root:root 0640) |

### Public endpoints

- `https://velcoretech.com/` — site
- `https://velcoretech.com/api/health` → `{"ok":true}`
- `https://velcoretech.com/api/contact` — POST, rate-limited 20/15min
- `https://velcoretech.com/build.txt` — current build marker

---

## Local project structure

Stack: React 18 + Vite 7 + TypeScript + TailwindCSS + shadcn/ui + react-router + react-helmet-async + framer-motion + react-query.

```
src/
  App.tsx                 # Routes (lazy-loaded). Add new routes here.
  main.tsx                # Mount + ThemeProvider
  index.css               # Design tokens (:root = dark, .light = light) + utilities
  components/
    brand/Logo.tsx        # VT shield+core SVG + wordmark lockup
    theme/                # next-themes provider + ThemeToggle
    layout/               # Header, Footer, Layout, CookieConsent
    common/               # SectionHeader, FeatureCard, Pillars, Tracking
    ui/                   # shadcn primitives (don't edit unless intentional)
  pages/
    Home, About, Contact, Pricing, Industries, Assessment, NotFound
    services/             # what-we-do (services landing) + service spokes
    city/{santa-cruz,bay-area,monterey-bay}/   # local SEO hubs
    legal/                # Privacy, Legal, Terms
public/
  favicon.svg             # Source of truth for the mark
  favicon-maskable.svg    # PWA maskable variant
  *.png / favicon.ico     # Generated via scripts/gen-favicons.mjs
  site.webmanifest, sitemap.xml, robots.txt, og-image.png
scripts/
  deploy.sh               # Called by `make deploy`
  gen-favicons.mjs        # Rasterizes favicon.svg → all sizes (needs sharp)
```

**Conventions** (also in README.md):
- Routes are lowercase, hyphen-separated, no underscores, no query params for SEO pages.
- Every new page must be added to `App.tsx` AND `public/sitemap.xml`.
- Every page needs Helmet metadata + canonical + Open Graph + JSON-LD (city pages also need Breadcrumb JSON-LD).
- City hub pattern: `/city/{city}/(managed-it|cybersecurity|cloud-migration|edge-security)`.

---

## Build & deploy

```bash
make dev          # Vite dev server (port 8080, falls back to 8081 if taken)
make build        # production build → dist/ + dist/build.txt marker
make deploy       # build + upload + promote + remote smoke
make deploy-dry   # dry-run (no mutation)
make smoke        # remote services / api / nginx / build-marker check
make live         # show remote build marker (HTTP + SSH fallback)
make verify-live  # diff local vs remote build markers
make releases     # list recent releases
make rollback REL=<id>   # roll current → release id
make logs / lastlog      # local deploy logs in logs/
```

Deploys are atomic: `releases/<id>` is uploaded, `current` symlink flips, nginx reloads.

---

## Mail pipeline

**Provider:** Purelymail SMTP (`mailserver.purelymail.com:587`, STARTTLS). Creds in `/opt/velcore-api/.env` as `SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS`. Outbound `MAIL_FROM`/`MAIL_TO` also live there.

**Flow on `POST /api/contact`:**
1. Zod validation + honeypot.
2. `transporter.sendMail()` synchronously — both lead notification (to info@) and user confirmation (to submitter).
3. On send failure → write a JSON job to `/var/lib/velcore-mail-queue/` and return `{ok:true, queued:true}`. (No `queued:true` field means the synchronous send succeeded.)
4. Drain timer fires every 60s, retries each job with exponential backoff (cap 1 hour). On success, the job file is unlinked.

**Operational helpers (added in this repo):**
```bash
make queue        # SSH in, show queue depth + most-recent job's lastError
make drain        # SSH in, manually fire velcore-mail-drain.service + tail logs
make post-test TEST_EMAIL=you@domain.com   # POST a real /api/contact end-to-end
```

**Known one-time pitfall (already fixed but document so it doesn't recur):**
The drain service runs as `www-data`. `.env` is `root:root 0640`. Without an
`EnvironmentFile=` directive, dotenv silently fails to load the file, `SMTP_HOST`
becomes empty, and nodemailer falls back to `localhost:587` — every send fails with
`ECONNREFUSED ::1:587`. Fix: drop-in override on the drain unit (already in place).
**If you ever add another `www-data` worker that needs SMTP, give it the same drop-in.**

---

## Brand & theme

**Mark:** `src/components/brand/Logo.tsx`. SVG shield silhouette in V-form (notched top, rounded apex) with a centered T core. Brand gradient (electric blue → cyan) is constant across themes; the wordmark uses theme tokens (`text-foreground` + `.text-gradient`).

**Brand colors** (HSL):
- Primary: `210 100% 52%` (dark) / `210 96% 44%` (light) — electric blue
- Accent: `195 100% 50%` (dark) / `195 92% 42%` (light) — cyan

**Theme:** next-themes, `attribute="class"`, default `dark`, `enableSystem`, `storageKey: "velcore-theme"`. The CSS uses `:root` for dark tokens and `.light` for light overrides — Tailwind's `dark:` variant still keys off the `.dark` class. There's an inline no-flash bootstrap script in `index.html` that applies the stored class before React paints.

**Editing the mark:** Edit `public/favicon.svg`, then regenerate the raster set:
```bash
npm i --no-save sharp && node scripts/gen-favicons.mjs
```
This writes 16/32/180/192/512 PNGs, the multi-res `favicon.ico`, the maskable 512, and `og-image.png` (1200×630) all from the SVG.

---

## When things look wrong

| Symptom | First check |
|---|---|
| Contact form looks broken | `make smoke`, then `make queue`. If queue grows, `sudo journalctl -u velcore-mail-drain.service -n 30` for `lastError`. |
| Site shows old version after deploy | `make verify-live` (compare local vs remote build.txt). If mismatch, redeploy or rollback with `make rollback REL=...`. |
| Light/dark stuck or flashes | Check the inline script in `index.html` and `localStorage.getItem('velcore-theme')`. |
| New favicon not showing | Browser cache. Bump the SVG, re-run gen-favicons, hard reload. |
| Dev server "Failed to load /src/pages/Services.tsx" | Stale `vite.config.ts` `warmup` path — services landing now lives at `src/pages/services/what-we-do.tsx`. |

---

## Things to be careful about

- **Never widen `.env` permissions** to fix env-loading bugs. Use a systemd `EnvironmentFile=` drop-in instead (the unit reads as root, then drops privileges).
- **Never deploy without smoke**. `make deploy` already smokes after promote — don't bypass.
- **Never edit `src/components/ui/*`** unintentionally — those are shadcn primitives shared across pages.
- **The 3 city hubs share structure.** When adding a 4th city, copy `monterey-bay/` (newest pattern) and update `App.tsx` + `sitemap.xml`.
- **Routes are case-sensitive.** Existing routes are inconsistent (`/services/Managed-IT` capitalized, but city subroutes are lowercase). Match what's already there to avoid 404s and broken canonicals.
