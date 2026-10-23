# Plan: public-readiness

Repo: app-vitals/how-to-factory. Goal: make the repo safe to flip public. Requested and scoped by Dan (2026-10-23).

**Top priority: no client data or client details leak.** Planning docs and research (`planning/`, `landscape/`) are fine to publish and useful to learners; keep them, but stay careful.

## Audit findings (2026-10-23)

- Tree (127 files) and all commits (186): no secrets, keys, `.env`, client or customer names, internal hostnames, IPs, Slack IDs or local paths.
- All 185 PR bodies/reviews/comments, 26 inline review comments and the issues: pattern scan clean (secrets, Slack/Sentry URLs, internal names, emails, local paths). Pattern scan, not a line-by-line read.
- License is MIT (App Vitals). Commit history carries two author emails (needs Dave's OK).
- Existing `secret-scan.yml` (gitleaks) scans PR/push ranges only, not full history.
- Guidance: `app-vitals/shipwright` CLAUDE.md "Before you commit — this repository is going public", `check-banned-strings.ts`, `task pre-public`, SECURITY/CONTRIBUTING/CODE_OF_CONDUCT.

## Design

- `scripts/check-public.ts` (+ `bun run pre-public`): banned-strings scan over tracked files (internal org/product names, `app-vitals/intel`, local paths, internal hosts) plus an optional untracked client-name denylist (`PRE_PUBLIC_EXTRA_BANNED` file path; the list itself is never committed). Runs gitleaks over full history. Wired into CI for the committed patterns.
- Competitor claims: liveness check for cited URLs, then per-grid re-fetch of every claim.
- Public-facing files: README, SECURITY.md, CONTRIBUTING.md (issues welcome, PRs by invitation for now; no CODE_OF_CONDUCT). CLAUDE.md gets the going-public scrub rule.
- Human steps: Dave sign-off; repo settings; one pre-flip run of `pre-public` with the real client-name list; visibility flip.
- History: planning/research docs stay in history by decision (non-secret). No rewrite.

## Tasks

| ID | Task | Depends on | HITL |
|---|---|---|---|
| PUB-1.1 | ci: add pre-public scan (banned strings, client denylist hook, full-history gitleaks) | — | |
| PUB-1.2 | docs: drop private intel reference from deck.css | — | |
| PUB-1.3 | ci: add landscape source-URL liveness check | — | |
| PUB-1.4 | docs: spot-check plan-grid claims against sources | 1.3 | |
| PUB-1.5 | docs: spot-check verify-grid claims against sources | 1.3 | |
| PUB-1.6 | docs: spot-check field-grid claims against sources | 1.3 | |
| PUB-2.1 | docs: add public README, SECURITY.md and CONTRIBUTING.md | — | |
| PUB-2.2 | docs: add going-public scrub rule to CLAUDE.md | 1.1 | |
| PUB-3.1 | Dave signs off on email in history and publishing | — | HITL |
| PUB-3.2 | Repo settings + pre-public run with real client list | 1.1-2.2 | HITL |
| PUB-3.3 | Flip visibility to public | 3.1, 3.2 | HITL |

All tasks are additions or doc edits: safe to deploy standalone.

## Decision Log

- Planning/research docs: keep in repo and history — Dan: fine to share, and useful to learners.
- Spot-check depth: every claim — fabricated-citation history in sibling repos.
- Community files: SECURITY + CONTRIBUTING only; no CODE_OF_CONDUCT — defaulted, Dan can change.
