# how-to-factory

A tutorial series (YouTube) on how to build a software factory. Each lesson teaches one
universal component, builds the simplest working version live, shows how other factories
do it, and ends with students building their own. Shipwright is one worked example, not
the standard.

## Layout

- `docs/` — living, vendor-neutral component map (`docs/components.md`)
- `lessons/` — one directory per lesson (outline, script, options, exercise); unordered backlog in `lessons/README.md`
- `landscape/` — factory x component comparison matrix
- `factory/` — the sample factory, grown lesson by lesson
- `planning/` — plan-session output

## Commands

- `bun install` — install deps
- `bun run typecheck` — `tsc --noEmit`
- `bun test` — run tests

TypeScript on Bun. Strict mode. Conventional commit prefixes (`feat:`, `fix:`, `docs:`, `chore:`).

## Rules

- **Cite your sources.** Every factual claim about another product needs a first-party
  source URL and an as-of date, or it is left out. Do not fabricate citations.
- **Names are not canonical.** Skills and components (plan, dev-task, ...) go by different
  names in different factories; present ours as examples, never as the standard.
- Lessons show a simple version first, then where other factories take the concept. Describe
  destinations, never prescribe them.
