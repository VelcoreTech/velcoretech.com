# velcoretech.com — Improvement Roadmap

Persistent backlog of work to take the site from "competent MSP" to "next-level
professional." Items are prioritized by leverage. Tier 1 is what's hurting
credibility right now and should be done first; Tier 2-4 compound over time.

Mark items `[x]` as completed; add notes inline. CLAUDE.md should reference
this file so future sessions can pick up where we left off.

---

## Tier 1 — Must-have (this month)

### 1. Fix all 404 internal links — **DONE 2026-05-06**
- [x] Moved `src/pages/services/Work WIth/*.tsx` → `src/pages/services/` (folder removed)
- [x] Wired routes in `App.tsx` for `endpoint`, `networking`, `cloud`, `edge`, `audit-ready`, `soc2`
- [x] No `governance.tsx` existed — remapped 12+ `/services/governance#…` refs across 11 files to `/services/consulting`
- [x] Sitemap rewritten: dropped `governance` + `backup-recovery` (no pages); lowercased `SOC2` → `soc2`; removed dead city subroutes (`*/consulting`, `*/compliance`, `*/network-security`); deduped `/city/monterey-bay`; lastmod bumped to 2026-05-06
- [x] Fixed casing on `/services/Managed-IT` import (was `Managed-IT.tsx`, file is `managed-it.tsx`) — would've broken on case-sensitive filesystems
- [x] Fixed `/services/assessment` typo (was actually `/assessment`)
- [x] `npm run build` clean; all 9 `/services/*` HTTP-tested at 200 against dev server
**Follow-ups (deferred to Tier 2 #12):** add anchor IDs (`#email-security`, `#vcio`, etc.) to existing service pages so deep links scroll-to-section instead of landing at top.

### 2. Case studies — **scaffolding done, content needs your data 2026-05-06**
- [x] Built `/case-studies` page with 3 stacked engagements (UAE / USA / Egypt)
      using realistic anonymized placeholders. Region/industry/size pills,
      starting-state → what-we-did → outcomes structure, optional pull quotes,
      framework tags, ItemList JSON-LD, sticky jump-bar
- [x] Routed in `App.tsx`, added to sitemap, linked from Footer "Company" column
- [x] Disclosure footer ("references available on request under NDA")
- [ ] **You** — replace the placeholder details in `src/pages/CaseStudies.tsx`
      (`studies` array) with real engagement data: client snapshot, starting
      state, what was delivered, real metrics, real quote (with permission)
      or remove `quote` entirely
- [ ] Future: link to case studies from Home (Tier 2 #11 Results bar) and About

### 3. Trust block on Home — **DONE 2026-05-06**
- [x] Honest two-column band between Hero and Metrics: "Frameworks we align with"
      (SOC 2 Readiness · HIPAA-aware · NIST CSF · ISO 27001-aligned · CIS Controls)
      and "Stack we operate" (Microsoft 365 · Cloudflare Edge · Identity Governance
      · Managed EDR · Backup & DR)
- [x] No claimed partner-tier badges — pills describe what's used / what's
      adhered to, not vendor partnerships we haven't earned
- [ ] Future: as real partner tiers are achieved, swap the matching pill for an
      actual logo (e.g. "Microsoft Solutions Partner — Modern Work")
- [ ] Future: client-logo strip (Tier 1 #2 follow-up — needs case-study client
      permissions first)
- [ ] Future: footnote or soften the "98%/<15min/96%/29%" metric block once
      real client outcomes are in

### 4. Industries page rewrite — **DONE 2026-05-06**
- [x] Removed Energy / Oil & Gas / Heavy Industrial (initial pass)
- [x] Removed Manufacturing (NIST 800-82 / NERC CIP / ICS — too heavy-industrial for a Santa Cruz MSP)
- [x] Removed Private Equity (sophisticated buyers go to tier-1 firms; "portfolio-wide standardization" + "exit readiness" was overclaim)
- [x] Added Professional Services (legal / accounting / architecture) — matches USA case study
- [x] Added Tech Startups (SOC 2 aspirants / Series-A diligence) — matches Egypt fintech case study
- [x] Rewrote remaining 5 verticals (Financial Services, Healthcare, Hospitality, Nonprofit, Media) in Velcore voice ~100 words each
- [x] Trimmed overclaims: dropped SOX / GLBA / SEC framing from Financial (big-bank scope), dropped M&A integration + "market analysis" from Healthcare, dropped GDPR claim from Hospitality + Nonprofit (no EU client basis)
- [x] Tightened compliance lists: HITRUST → "HITRUST-aware", CMMC → "CMMC-aware", everything qualified honestly
- [x] Reordered: case-study-aligned verticals lead (Professional Services → Tech Startups → Financial Services), then Healthcare, Hospitality, Nonprofit, Media

### 5. Founded date + origin story — **DONE 2026-05-06**
- [x] About hero rewritten: "Built on Two Decades / Across Three Continents",
      Est. 2025 in the page badge
- [x] "Why Velcore Exists" replaces generic Mission paragraph with the real
      founder origin story (Amr Sorour, founded 2025, 20+ years across Africa,
      Asia, America, observed pattern, built Velcore to deliver the opposite)
- [x] Amr's team-card bio updated to match the founder framing
- [x] Schema upgraded `LocalBusiness` → `ProfessionalService`, added
      `foundingDate: 2025-01-01`, added `founder: { Person, Amr Sorour }`,
      added `email`

### 6. Trim overclaiming language — **DONE 2026-05-06**
- [x] About > Capabilities: removed "Mergers & acquisitions IT due diligence
      and integration"
- [x] About > Cybersecurity: "24/7 SIEM and SOC oversight" → "24/7 security
      monitoring with vetted managed-detection partners"
- [x] About > Cybersecurity: "Vulnerability management and penetration
      testing" → "Vulnerability management with vetted penetration-testing
      partners"
- [x] ManagedITPillars (Consulting pillar): removed "M&A IT due diligence and
      integration" line
- [x] consulting.tsx: "M&A Support" → "Technology Due Diligence" (narrower
      defensible claim — pre-deal assessment + integration coordination with
      specialized partners, not full integration delivery)
- [ ] Future: as real SOC / pen-test partners are publicly named, swap "vetted
      partners" for the actual partner name (e.g. "with Huntress as our managed
      detection partner") — partner credibility is honest and a positive signal

### 7. Specific Santa Cruz address in footer + Contact — **DONE 2026-05-10**
- [x] Footer location: "California, USA" → "Santa Cruz, CA 95060"
- [x] Added real street address (280 Harvey West Blvd) — Footer, Home JSON-LD,
      Santa Cruz city page JSON-LD, Monterey Bay city page JSON-LD (was placeholder "123 Main St")
- [x] Google Maps embed added to Contact page; location card now links to Maps

---

## Tier 2 — High-leverage (next 30-60 days)

### 8. Resources / blog at `/resources` — **2 posts live 2026-05-10**
- [x] Built `/resources` index page + `/resources/:slug` dynamic route
- [x] Posts metadata in `src/content/posts.ts` (slug/title/summary/date/tags/readTime/author/draft/body)
- [x] Per-post body components in `src/pages/resources/posts/` — write JSX, prose styling handled by parent
- [x] `@tailwindcss/typography` plugin added to Tailwind config; prose-* classes now render properly
- [x] Article JSON-LD on each post + Blog JSON-LD on the index, OG tags, canonicals
- [x] Related-posts block (matches by tag overlap), CTA to Assessment, BottomBreadcrumbs
- [x] Resources link added to Footer "Company" column
- [x] Post 1: "Microsoft 365 Conditional Access: A Practical Baseline for Growing Teams"
- [x] Post 2: "SOC 2 Type I Readiness: A Practical Checklist for 50-Person Firms" — 2026-05-10
- [ ] **Next topics:** Cloudflare DNS hardening for nonprofits, M365 → Google Workspace migration mistakes

### 9. Client portal link in header
- [ ] "Client Login →" pointing to your PSA (Halo / SuperOps / Atera / whatever)
- [ ] Even a third-party link signals operational maturity
- [ ] Existing clients need somewhere to go

### 9b. Customer self-service portal — **planned**
Full authenticated client portal where customers can log in, see their active package, and manage preferences.

**Scope:**
- [ ] Auth layer — login/signup with email+password and/or magic link (Supabase Auth or Clerk recommended)
- [ ] Dashboard — "My Plan" view showing exactly which services and features are included in their current package (pulled from their account record)
- [ ] Package customization — allow clients to toggle/request add-ons (Backup & DR, Identity Management, etc.) with changes routed to Velcore for approval before billing change
- [ ] Service health tile — live status of their monitored services (hooks into the `/status` system or an MSP-side API)
- [ ] Document vault — view/download their onboarding docs, runbooks, security reports, compliance evidence
- [ ] Billing summary — current plan, renewal date, next invoice (read-only, linked out to billing portal)
- [ ] Support ticket shortcut — quick-open a ticket or see recent ticket status without leaving the portal

**Technical notes:**
- Protected routes under `/portal/*`, lazy-loaded and separate from the marketing site bundle
- API layer needed server-side (new Express endpoints or Supabase RLS policies) — do NOT expose client data to the static build
- Design should match the existing Velcore dark theme (shadcn/ui components are already available)
- Start with read-only dashboard (My Plan + Documents) before adding write/customization features

**Dependencies:** Requires a backend data source (PSA/CRM or Supabase table) that maps client accounts to their active services. Scope the data model first before building UI.

### 10. Status page — **basic version done 2026-05-07**
- [x] Built `/status` page with 4 components (Public Website, Contact API, Mail Pipeline, Client Support)
- [x] Live ping to `/api/health` for the API component (auto-refreshes every 60s, 5s timeout)
- [x] Color-aware status badges (operational green, degraded amber, outage red, checking grey) work in light + dark themes
- [x] Footer link with green dot indicator next to Privacy/Legal/Terms
- [x] `noindex, follow` meta — keeps it out of search but link-followable
- [ ] Future: graduate to a dedicated subdomain (`status.velcoretech.com`) on Better Stack / Instatus / Atlassian Statuspage when you want incident history, scheduled-maintenance announcements, and subscriber notifications. The current `/status` is a "first responder" view, not an incident-management platform

### 11. Rewrite homepage hero stat block as Results bar
- [ ] Once tasks 2 + 3 above are done, lead with real client outcomes
      ("Reduced incident MTTR by 60% in 90 days") instead of generic metrics

### 12. Anchor IDs on existing service pages — **DONE 2026-05-07**
- [x] Added 13 anchor stubs across 6 service pages mapping to fragments referenced from Pricing/Industries:
      `identity-access`, `vcio`, `vendor-management`, `budget-planning` → consulting;
      `email-security`, `incident-readiness`, `penetration-testing`, `security-operations` → cybersecurity;
      `governance-compliance` → audit-ready;
      `backup-recovery`, `m365-cloud` → cloud;
      `edge-security` → edge;
      `network-firewall` → networking
- [x] Stubs are placed at the start of each page's main content section (after hero) with `scroll-mt-24` to clear the fixed header
- [x] Updated `App.tsx` `ScrollToTop` to respect URL hash — scrolls to the anchor with retry logic for lazy/Suspense-mounted routes

---

## Tier 3 — Differentiation (60-180 days)

### 13. Security disclosures page at `/security`
- [ ] List your own controls: M365 with CA, MFA-everywhere, EDR, encrypted
      backups, vendor list with SOC 2 status, password manager, hardware MFA
- [ ] Buyers in regulated industries ask for this in vendor security reviews
- [ ] Having it pre-published wins deals before you're even on the call

### 14. Pricing transparency on add-ons
- [ ] Show typical project ranges ("Penetration test: $4-8k, depending on
      scope") instead of just "Add-on"
- [ ] Bold move that filters out tire-kickers and earns trust with serious buyers

### 15. Comparison page
- [ ] `/compare/velcore-vs-msp` — head-to-head against typical MSP /
      break-fix shop / DIY in-house IT
- [ ] Captures bottom-of-funnel search ("vs" queries are high-intent)

### 16. Newsletter / mailing list
- [ ] Even small. List of 200 local IT decision-makers > 20k Twitter followers
- [ ] Quarterly cadence aligned with the resources / blog posts

---

## Tier 4 — Polish

### 17. Real OG image — **DONE 2026-05-10**
- [x] Replaced all 30+ `og-image.jpg` references across src/ and index.html with `og-image.png`
      (covers every page constant, inline meta tags, and Twitter card tags)

### 18. Lighthouse + axe-core pass
- [ ] Target: 95+ accessibility, 90+ performance
- [ ] Hero image is heavy; lazy-load below-the-fold harder
- [ ] Audit color contrast on light mode (the recently-introduced theme)

### 19. Schema cleanup
- [ ] LocalBusiness → ProfessionalService (or ITConsulting if supported in
      your geo) often ranks better for B2B IT services
- [ ] Add `serviceType`, `priceRange`, `aggregateRating` (once you have reviews)

### 20. Backend hardening — **DONE 2026-05-10**
- [x] Fixed malformed override.conf (heredoc artifact removed; clean [Unit]+[Service] stanzas)
- [x] Added `make scrub-queue` — shows all queued jobs with id/attempts/lastError. PRUNE=1 deletes all.
- [x] Drain failure alerting in drain-queue.js — after each drain cycle, jobs with ≥5 attempts trigger
      a single alert email to MAIL_TO (4-hour cooldown via .alert-state.json in queue dir)

---

## Done

- [x] Light/dark mode toggle wired (next-themes, theme-aware tokens)
- [x] New VT shield+core SVG mark + favicon set regenerated
- [x] No-flash theme bootstrap in index.html
- [x] Manifest + meta tags cleaned up
- [x] Mail pipeline restored — drain service `EnvironmentFile=` override
- [x] `make queue` / `make drain` Makefile targets
- [x] Backend smoke pipeline verified (API sync send works → SMTP via Purelymail)
- [x] CLAUDE.md operational reference written
