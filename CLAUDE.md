# how-to-factory

A tutorial series (YouTube) on how to build a software factory. Each lesson teaches one
universal component in depth, builds it live, shows how other factories do it, and ends
with students building their own. Shipwright is one worked example, not
the standard.

## Layout

- `docs/` — living, vendor-neutral component map (`docs/components.md`)
- `lessons/` — one directory per lesson (outline, script, options, exercise); unordered backlog in `lessons/README.md`
- `landscape/` — factory x component comparison matrix (`matrix.json`) plus per-product research grids (`plan-grid/`, `verify-grid/`, `field-grid/`)
- `decks/` — shared lesson deck framework (`deck.css`, `deck.js`, `deck.config.json`, `_template/`, `DIAGRAMS.md`); each lesson's deck is `lessons/<lesson>/deck/index.html`
- `factory/` — the sample factory, built by the factory itself as the course runs
- `planning/` — plan-session output

## Commands

- `bun install` — install deps
- `bun run typecheck` — `tsc --noEmit`
- `bun test` — run tests
- `bun scripts/check-decks.ts` — enforce the deck rules below
- `bun run check:landscape` — validate `landscape/matrix.json` (sources, dates, chip formats); `bun run render:landscape` regenerates `landscape/README.md` from it
- `bun run check:landscape-urls` — fetch every cited URL in `landscape/` and report dead/redirected ones with file:line (network; not part of `bun test` or CI)

## CI checks

- `CI / check` — typecheck + tests (`.github/workflows/ci.yml`)
- `pr-title-lint / Conventional-Commit PR title` — PR title must be a Conventional Commit; types: feat fix perf revert docs refactor test build ci chore (`pr-title-lint.yml`)
- `secret-scan / gitleaks secret scan` — pinned gitleaks binary over the PR/push commit range (`secret-scan.yml`)
- `CI / check` also runs `scripts/check-landscape.ts`, `scripts/check-decks.ts` and `scripts/check-public.ts` (banned internal names, paths, hosts in tracked files). Before going public run `bun run pre-public` (adds full-history gitleaks). It also enforces a vendor allowlist for `landscape/matrix.json` and the per-product `landscape/*-grid/*.md` files. Never commit client names.
- Renovate (`renovate.json`) keeps bun deps and GitHub Action SHA pins current; enabling the app is a human step.

TypeScript on Bun. Strict mode. Conventional commit prefixes (`feat:`, `fix:`, `docs:`, `chore:`).

## Before you commit — this repository is going public

Everything committed here may be read by anyone. Scrub before you commit:

- Never commit client names, client data, or internal infrastructure details (hostnames, internal paths, private URLs, credentials, tokens).
- Stage specific files by name (`git add <path>`); never `git add -A` or `git add .`.
- Read `git diff --staged` before committing and remove anything you would not want public.
- If you are unsure whether something is safe to publish, ask first; do not commit it.
- Run `bun run pre-public` before pushing. It runs `scripts/check-public.ts` (banned internal names, paths, hosts) plus a full-history gitleaks scan.

Planning and research docs (`planning/`, `landscape/`, `lessons/`) may be public, so write them accordingly.

## Rules

- **Cite your sources.** Every factual claim about another product needs a first-party
  source URL and an as-of date, or it is left out. Do not fabricate citations.
- **Names are not canonical.** Skills and components (plan, dev-task, ...) go by different
  names in different factories; present ours as examples, never as the standard.
- **`factory/` is the demo; lessons stay tool-neutral.** Each lesson part is the concept first (tool-neutral), then
  "in our demo we use...", then "yours can be anything". Bun and Claude Code are demo choices, never requirements;
  exercises list outcomes and name no required tool.
- **Plan sessions never touch `factory/`.** A lesson's plan session queues lesson material only (brief, script, deck,
  exercise, options, run-of-show); the factory builds `factory/` live.
- **One deep component per lesson.** A lesson teaches one component and builds it in that lesson, prioritizing what is
  expected, common and crucial for it. Fuller deep dives come in later lessons; name them as destinations, never
  prescribe them.
- **Follow the lesson playbook** (`docs/lesson-playbook.md`): scoping rule, lesson brief, research, work-queue rules, checklist, and the order a lesson is created in (section 10).

## Deck rules

Every lesson ships a single-file HTML deck built from `decks/_template/index.html`; the presenter narrates over it, so
on-screen text is labels and keywords, never a transcript. Enforced by `scripts/check-decks.ts` in CI; full detail and
the diagram vocabulary in `decks/DIAGRAMS.md`.

- Max 3 bullets per slide, 8 words per bullet, 8 words in a title; no prose paragraphs (a caption of at most 12 words is
  allowed); at most 3 words per `.comp-table` body cell (header row and first column exempt) and 4 options per `.options-grid`; one idea per slide; at most 2 visual blocks; every content slide has a visual (title and DEMO slides exempt).
- Viewer-facing text never contains internal jargon: `matrix`, `options.md`, `sourced`, `not documented` (list: `forbiddenWords` in `decks/deck.config.json`; comments and attributes are ignored).
- Diagrams: max 8 nodes, node labels at most 3 words, one diagram per slide, one question per diagram; HTML/CSS or inline
  SVG only; use the shared legend (human, agent, store/queue, external, scheduled job).
- Keep the bottom-right face-cam safe zone (22% x 30%) clear; check with `?guides`.
- Include the factory map in each lesson with the component being taught highlighted.
- Sources: Mayer's multimedia principles via Lucidea (https://lucidea.com/blog/mayers-12-principles-of-multimedia-learning),
  UC San Diego presentation guidance (https://multimedia.ucsd.edu/best-practices/presentation-design.html), C4 model
  (https://icepanel.io/blog/what-is-the-c4-model). Limits are stricter-than-source defaults, tunable in
  `decks/deck.config.json`; they come from general presentation research, not video-specific findings.
