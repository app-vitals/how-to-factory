# Plan: lesson4-pr-routing (prefix LPR)

Repo: app-vitals/how-to-factory. Design and task list approved by Dan, 2026-10-28. Lesson material only: **no `factory/` changes** (the factory builds `factory/` live). Mirrors [`planning/lesson3-verification`](../lesson3-verification/PLAN.md) and the sequence in [`docs/lesson-creation.md`](../../docs/lesson-creation.md).

## Direction (Dan, Slack)
- Mirror lesson 1: after task to PR, the loop now goes from PR to ready for a human to merge.
- The main feature is PR lookup in the loop and deciding whether a PR needs review, needs a patch, or nothing. Reassess review after a patch.
- Review and patch skills stay simple stubs, like the lesson 1 skills. Do not focus on the skills; deeper review and patch lessons can come later, one at a time.
- Look at how other factories think about these phases; Shipwright may be used as input.
- Length: all lessons so far ran 30 to 40 minutes. Target the same.

## Design
- **Topic (assumption, confirmed by approval): Coordination / loop** (`docs/components.md` section 10), with Review (section 5) touched only through stub skills.
- **One idea:** a PR is not finished work. Each tick the loop looks at every open PR and decides: review, patch, or wait for a human.
- **Stages (draft):** See (PR lookup; state read from GitHub each tick, `tasks.json` stays intent only), Decide (review needed = no verdict on the current head commit; patch needed = findings, red CI or conflicts; otherwise wait), Reassess (a patch pushes a new commit so the old review no longer applies: review, patch, review), Stop (round cap of 2 to 3, then flag a human).
- **Stub skills:** the review stub posts a plain `APPROVED` or `FINDINGS` verdict comment that the loop reads. Real GitHub approval and the self-review limitation are a "where factories take it" item. Both skills are built live, not queued.
- **Length:** the script outline carries a running-time table totalling 30 to 40 minutes, with the live loop build as the explicit do-not-trim beat.
- **Research focus:** how products decide what a PR needs and when to re-review: triggers, re-review on new commits, loop caps, who can approve, whether the product fixes its own PR. First-party sources only, URL and as-of date on every claim. Shipwright's loop, review and patch are inventoried as input, including how strict oldest-first ordering across phases can starve review and patch when the task backlog is deep.
- **Out of scope (owners):** review quality (later review lesson), patch quality (later patch lesson), merge and release (Release lesson), multi-agent claims (coordination deep dive), cron scheduling (later loop lesson).

### Reuse
Lesson 3's research shape (inventory, six product files, assembled grid, matrix dimensions, ranking), brief, options, deck, script and run-of-show formats; `decks/_template`; `landscape/field-grid` and `landscape/verify-grid` as starting notes for each product; the `Reused / New this time` brief section.

### Complexity risks
- Matrix edits (LPR-1.9) share `landscape/matrix.json` and the vendor allowlist; run `check:landscape` and re-render the README.
- The deck must pass `scripts/check-decks.ts` (3 bullets, 8 words, one diagram, 8 node max, forbidden viewer words).
- Lesson 4's demo needs PRs on GitHub and a reviewer that cannot formally approve its own PR; the checklist (LPR-2.4) plans the fallback.
- Public repo: scrub rules apply to every file, including `planning/` notes.

### Breaking-change scan
Additions only: new grid directory, new matrix columns, a new lesson directory, backlog wording. No renames or removals; lessons 1 to 3 keep their files.

### Assumptions
1. Component is the loop, with review and patch as stubs (confirmed by approval).
2. Directory name is `lessons/04-the-loop-reads-prs` (renameable until the lesson ships).
3. Research follows the six-product pattern (one task each, assembled and cross-checked); dimensions are a starting list.
4. Dan reviews the sketch PR (LPR-2.1); the deck and script tasks stay blocked until it merges.

## Tasks

| Task | Title | Depends on | HITL | Safe alone |
|---|---|---|---|---|
| LPR-1.1 | docs: inventory Shipwright PR routing and the reason for each capability | none | | yes |
| LPR-1.2 to 1.7 | docs: research Devin, Factory, OpenHands, Cursor, Copilot, Claude Code PR routing (one each) | none | | yes |
| LPR-1.8 | docs: assemble the routing grid with a cross-check | 1.2 to 1.7 | | yes |
| LPR-1.9 | feat: add the PR routing dimensions to the landscape matrix | 1.8 | | yes |
| LPR-1.10 | docs: rank PR routing capabilities on expected, common and crucial | 1.1, 1.8 | | yes |
| LPR-1.11 | docs: add the lesson 4 brief (the loop learns about PRs) | 1.10 | | yes |
| LPR-1.12 | docs: write lesson 4 options from the routing grid | 1.11, 1.9 | | yes |
| LPR-1.13 | docs: update the lesson backlog for lesson 3 taught and lesson 4 | 1.11 | | yes |
| LPR-2.1 | docs: sketch the lesson 4 deck for review | 1.11, 1.12 | | yes |
| LPR-2.2 | docs: build the lesson 4 deck | 2.1 | | yes |
| LPR-2.3 | docs: write the lesson 4 script and lesson README | 2.1 | | yes |
| LPR-2.4 | docs: write the lesson 4 exercise, run-of-show and pre-filming checklist | 2.2, 2.3 | | yes |

```
[START] ├─ LPR-1.1 ─────────────────────────────┐
        └─ LPR-1.2..1.7 (parallel) → 1.8 ─┬─ 1.9 ───────────────┐
                                           └─ 1.10 (+1.1) → 1.11 ─┬─ 1.13
                                                                    └─ 1.12 (+1.9) → 2.1 → 2.2, 2.3 → 2.4
```

HITL scan: no tasks require human steps (no `.claude/**` files, no CI workflow secrets).

## Open items
- Lesson 3 video URL: needed from Dan to link the lesson 3 README; a small docs task follows once supplied (not invented).
- Dave's lesson 2 plan-skill update is not on main; the brief assumes the current plan skill (#94) unless it lands first.
- Round cap shown as a choice (3 rounds), not a rule.

## Decision Log
- Component: the loop with review and patch as stubs, per Dan; deeper review and patch lessons are backlog follow-ons.
- Length target 30 to 40 minutes: Dan, from the filmed lessons (the lesson 3 estimate of 49 ran shorter).
- Sketch review gates the deck and script: lesson-creation recipe step 5.
