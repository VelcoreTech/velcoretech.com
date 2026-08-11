# Security Policy

`velcoretech.com` is a public repository and must contain **no secrets** — API keys, tokens, and
credentials belong in environment variables (`.env`, git-ignored), never in the repo or the built bundle.

## Reporting a vulnerability

**Do not open a public issue for security problems.** Use GitHub's **private vulnerability reporting**
for this repository (**Security → Report a vulnerability**). Include reproduction steps and the affected
path(s). We aim to acknowledge within a few business days and to fix or mitigate confirmed issues promptly.

## Scope

In scope:

- Secrets/keys committed to the repo or exposed in the shipped bundle.
- XSS / injection or unsafe handling of user input in site code.
- A dependency with a known, exploitable vulnerability affecting the deployed site.
- CI/CD misconfiguration that could leak secrets or allow an unauthorized deploy.

Out of scope:

- A missing `.env` (expected — supplied per environment, never committed).
- Style or best-practice suggestions with no security impact (open a normal issue instead).

## Handling secrets

All keys live in git-ignored `.env` files; only `.env.example` (placeholders) may be committed. The
`secret-scan` CI gate blocks tracked env files and committed private-key/token shapes. If you find a
committed secret, report it privately as above so it can be rotated and purged from history.
