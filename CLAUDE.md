# how-to-factory

A tutorial series (YouTube) on how to build a software factory. Each lesson teaches one
universal component, builds the simplest working version live, shows how other factories
do it, and ends with students building their own. Shipwright is one worked example, not
the standard.

## Layout

- `docs/` — living, vendor-neutral component map (`docs/components.md`)
- `lessons/` — one directory per lesson (outline, script, options, exercise); unordered backlog in `lessons/README.md`
- `landscape/` — factory x component comparison matrix
- `decks/` — shared lesson deck framework (`deck.css`, `deck.js`, `deck.config.json`, `_template/`, `DIAGRAMS.md`); each lesson's deck is `lessons/<lesson>/deck/index.html`
- `factory/` — the sample factory, grown lesson by lesson
- `planning/` — plan-session output

## Commands

- `bun install` — install deps
- `bun run typecheck` — `tsc --noEmit`
- `bun test` — run tests
- `bun scripts/check-decks.ts` — enforce the deck rules below

## CI checks

- `CI / check` — typecheck + tests (`.github/workflows/ci.yml`)
- `pr-title-lint / Conventional-Commit PR title` — PR title must be a Conventional Commit; types: feat fix perf revert docs refactor test build ci chore (`pr-title-lint.yml`)
- `secret-scan / gitleaks secret scan` — pinned gitleaks binary over the PR/push commit range (`secret-scan.yml`)
- `CI / check` also runs `scripts/check-landscape.ts` and `scripts/check-decks.ts`.
- Renovate (`renovate.json`) keeps bun deps and GitHub Action SHA pins current; enabling the app is a human step.

TypeScript on Bun. Strict mode. Conventional commit prefixes (`feat:`, `fix:`, `docs:`, `chore:`).

## Rules

- **Cite your sources.** Every factual claim about another product needs a first-party
  source URL and an as-of date, or it is left out. Do not fabricate citations.
- **Names are not canonical.** Skills and components (plan, dev-task, ...) go by different
  names in different factories; present ours as examples, never as the standard.
- **`factory/` is the demo; lessons stay tool-neutral.** Each lesson part is the concept first (tool-neutral), then
  "in our demo we use...", then "yours can be anything". Bun and Claude Code are demo choices, never requirements;
  exercises list outcomes and name no required tool.
- Lessons show a simple version first, then where other factories take the concept. Describe
  destinations, never prescribe them.

## Deck rules

Every lesson ships a single-file HTML deck built from `decks/_template/index.html`; the presenter narrates over it, so
on-screen text is labels and keywords, never a transcript. Enforced by `scripts/check-decks.ts` in CI; full detail and
the diagram vocabulary in `decks/DIAGRAMS.md`.

- Max 3 bullets per slide, 8 words per bullet, 8 words in a title; no prose paragraphs (a caption of at most 12 words is
  allowed); one idea per slide; at most 2 visual blocks; every content slide has a visual (title and DEMO slides exempt).
- Diagrams: max 8 nodes, node labels at most 3 words, one diagram per slide, one question per diagram; HTML/CSS or inline
  SVG only; use the shared legend (human, agent, store/queue, external, scheduled job).
- Keep the bottom-right face-cam safe zone (22% x 30%) clear; check with `?guides`.
- Include the factory map in each lesson with the component being taught highlighted.
- Sources: Mayer's multimedia principles via Lucidea (https://lucidea.com/blog/mayers-12-principles-of-multimedia-learning),
  UC San Diego presentation guidance (https://multimedia.ucsd.edu/best-practices/presentation-design.html), C4 model
  (https://icepanel.io/blog/what-is-the-c4-model). Limits are stricter-than-source defaults, tunable in
  `decks/deck.config.json`; they come from general presentation research, not video-specific findings.
