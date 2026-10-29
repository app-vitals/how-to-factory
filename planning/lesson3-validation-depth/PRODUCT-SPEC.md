# Product spec: lesson 3 redo, validation depth (session lesson3-validation-depth)

Repo: app-vitals/how-to-factory. Decisions below were made with Dan in Slack on 2026-10-29.

## Problem

Lesson 3 ("Done means checked") was drafted and taught, and Dan is not happy with it. Its learnings feel light: nine
capabilities, but A1, A2, A4, A7 and A8 are all variations of "tell the agent to run the tests, and keep running them".
The brief pushed test layers and other kinds of validation into Tier B ("named, not built"), so the lesson never says
what a check is or why one check is not enough. The demo is also one long improvised live beat with no evidence of how
much the changes help.

## The one idea (new)

An agent that writes both the code and the checks passes both even when it understood the task wrong. Validation is
only as strong as the checks' **independence from the builder**. This is an agentic-engineering point: the techniques
are classic software engineering, and the lesson frames each by why it matters more when an agent writes the code.

## Decisions

1. **Redo lesson 3 in place** (`lessons/03-done-means-checked`). It is not published as final; rewrite it.
2. **Build live only what is already proven** (all autonomous by skill and tooling): criteria to red-first tests and
   layer choice (A2), run the repo's checks and show an evidence table (A1+A8, bounded loop as one line), the guard
   against weakened tests (A4), and the fresh-context check of the criteria (A5, with running the app as the step that
   exercises a path, A6).
3. **Mention, do not build:** held-out tests, mutation testing, property-based testing. Each is framed as a classic SE
   technique and why it matters more with agents. Our own Stryker run on lesson 1's suite is shown as a recorded
   result (68% score, 65 survivors; five hand-verified survivors, see below).
4. **CI gate (A9)** becomes a short "where a person comes in" beat, not a capability: the workflow is code, but a
   person sets the branch-protection rule, so it is not autonomous.
5. **Field comparison** shrinks from five slides to two, and is re-researched for the new ideas (hidden tests,
   test-quality measurement) across the same six products, per the playbook research protocol.
6. **Per-capability upgrade prompts.** dev-task is upgraded live with one short, self-contained prompt per built
   capability (about 8 lines of intent, stored in the repo, not "read the slides"), each producing a small SKILL.md diff.
7. **Measurement.** A small before/after: dev-task v1 vs v2 on about 4 tasks x 3 runs, scored by the mutation score of
   the tests the agent wrote (Stryker on changed files, a pre-filming scoring tool, not built live). One number per
   variant, stated honestly as a small noisy experiment. Doubles as a rehearsal of the live upgrade. Published
   research numbers are context only.
8. **Playbook rule holds:** this plan queues lesson material only. Nothing under `factory/` is queued; the factory
   builds its own upgrades live from the prompts. The only hand-built tooling is the scorer, which is not part of
   the factory.

## The five hand-verified mutation survivors (lesson 1's suite, not planted)

1. `tasks.schema.ts:30`, `:33`: title/description/dependencies validation, unchecked by any test (36/36 still pass
   with the whole `if` replaced by `false`).
2. `loop.ts:89`, `:93`: the stuck in_progress warning fires for the wrong tasks (filter replaced by all tasks).
3. `loop.ts:95`: "nothing ready" logs every poll instead of once.
4. `tasks.schema.ts:56`: the cycle finder's memoization is invisible to correctness tests (performance only).
5. `tasks.schema.ts:62`: an unreachable `?? []` fallback, so the answer is to delete code, not add a test.

Setup notes from the Stryker spike: the `command` runner works with `bun test`; Stryker needs TypeScript 5 (the repo
pins TS 7, which has no JS API); a full run of 273 mutants took about 9 minutes, so scope to changed files; the
`ps` binary was missing in the sandbox (environment only).

## Constraints

- Field claims name a first-party URL and an as-of date; "not documented" only after naming pages checked.
- Lessons stay tool-neutral: concept first, then "in our demo we use...", then "yours can be anything".
- Deck rules enforced by `scripts/check-decks.ts`.
- Sketch review before the full write (playbook section 1): brief, one stage slide, one capability slide.

## Out of scope

Building held-out tests, mutation or property-based testing live; changes under `factory/`; the full per-capability
ablation; the review, release and test-readiness lessons that own the deeper dives.
