# Plan: lesson3-verification (prefix VLS)

Repo: app-vitals/how-to-factory. Design and task list approved by Dan, 2026-10-21. Lesson material only: **no `factory/` changes** (the factory builds `factory/` live).

## Direction (Dan, Slack)
- Upfront work is fine: show the full lesson and where it is going.
- Do not over-index on two lessons, but each lesson should be easier to create than the last, building on the previous one.
- Dan reviews mostly via the deck `index.html`.

## Design
- **Topic (assumption, confirmed by approval): Verification.** Lesson 2's order was plan, dev-task, verification, review, spec. `docs/components.md` section 4 defines it, and PR #146 hands per-task test planning to it. Lesson 1 banked three verify columns (`verify-judge`, `verify-runs-app`, `verify-keeps-going`) for all six products.
- **One idea (draft):** "done" should mean something a machine checked, not the agent's say-so.
- **Stages (draft):** Define (each task states its test line; acceptance criteria become checks), Run (run the repo's tests, lint and typecheck before done; never weaken a test to get green; run the app where it matters), Gate (required CI, branch protection, coverage and speed budgets). Final capability list comes from a later inventory and field survey.
- **Out of scope (owners):** review lesson, release/canary, the test-readiness pipeline (destination only), spec writing.
- **Easier each time (Dan's goal):** VLS-1.1 turns the playbook into a reusable recipe: sketch review first (brief + stage slide + one capability slide before script/README/deck), a stage-grouped capability table in the brief template, a stage and capability slide pattern in the deck template, a required "Reused from earlier lessons / New this time" section in every brief, and a lesson 2 entry in playbook section 9 that records rework passes. Rules are marked "from lessons 1 and 2, revisit after lesson 3" so they do not harden early.
- **Deck shape:** about 26 slides like lesson 2's final deck. Stage slide, then one slide per capability: title `Stage: capability`, one why-or-prevents bullet, two "e.g." bullets, one diagram, caption "Examples are illustrations, not product claims."
- **Research first (Dan, revised 2026-10-21):** how the other factories verify shapes the lesson, so the Shipwright inventory and a six-product verify grid (starting from `landscape/field-grid`, going deeper with depth dimensions) come before the brief. Capabilities are then ranked on expected, common and crucial, and the brief, options, deck and script are built from that. Same shape as lesson 2's depth reset, done once, up front.

Rejected: deferring research until after a draft (Dan: it should shape the lesson); writing the playbook refresh last (the brief and deck would be built on the stale failure-slide rules).

### Reuse
Lesson 2's final deck structure (`lessons/02-a-plan-that-looks-first/deck/index.html`), brief capability table, script and run-of-show format; `decks/_template`; `landscape/field-grid` and the `verify-*` matrix columns (not touched here).

### Complexity risks
- Template deck edits must pass `scripts/check-decks.ts` (3 bullets, 8 words, 8-word titles, one diagram, max 2 visual blocks).
- Placeholder field slides must avoid the forbidden viewer-facing words.
- VLS-1.1 touches the playbook and templates that lesson 2's PTT tasks do not edit, so no shared-file conflict; VLS-1.2 depends on PTT-1.1 because it restates the test-line hand-off.

### Breaking-change scan
Playbook and template edits affect only future lessons; lessons 1 and 2 keep their files. VLS-1.1 greps for consumers of the removed failure-slide wording (CLAUDE.md, `lessons/_template/*`, `scripts/check-decks.ts` and its tests) before editing.

### Assumptions
1. Verification is lesson 3 (confirmed by approval).
2. The working directory name is `lessons/03-done-means-checked`; renameable until the lesson ships.
3. Verify research follows the six-product pattern from lesson 2 (one task each, assembled and cross-checked). Depth dimensions are a starting list; each researcher may add what the pages surface.
4. A concrete slide count is guidance, not a gate, unless `check-decks` already enforces it.

## Tasks

| Task | Title | Depends on | HITL | Safe alone |
|---|---|---|---|---|
| VLS-1.1 | docs: turn the playbook into a reusable lesson recipe from lessons 1 and 2 | none | | yes |
| VLS-1.3 | docs: inventory Shipwright verification capabilities and the reason for each | none | | yes |
| VLS-1.4 to 1.9 | docs: research Devin, Factory, OpenHands, Cursor, Copilot, Claude Code verification against the docs index (one task each) | none | | yes |
| VLS-1.10 | docs: assemble the verify grid with a cross-check | VLS-1.4 to 1.9 | | yes |
| VLS-1.11 | feat: add the verification depth dimensions to the landscape matrix | VLS-1.10 | | yes |
| VLS-1.12 | docs: prioritize verification capabilities by expected, common and crucial | VLS-1.3, VLS-1.10 | | yes |
| VLS-1.2 | docs: add lesson 3 brief (verification) | VLS-1.1, PTT-1.1, VLS-1.12 | | yes |
| VLS-1.13 | docs: write lesson 3 options from the verify grid | VLS-1.2, VLS-1.11 | | yes |
| VLS-2.1 | docs: draft the lesson 3 deck skeleton | VLS-1.2, VLS-1.11, VLS-1.13 | | yes |
| VLS-2.2 | docs: draft the lesson 3 script outline | VLS-1.2, VLS-1.13 | | yes |
| VLS-2.3 | docs: draft the lesson 3 exercise outcomes and run-of-show outline | VLS-2.1, VLS-2.2 | | yes |

```
[PRIOR] PTT-1.1 [merged #147]
[START] ├─ VLS-1.1 ──────────────────────────────┐
        ├─ VLS-1.3 ───────────────┐               │
        └─ VLS-1.4..1.9 (six parallel) → 1.10 ─┬─ 1.11 ──────────────┐
                                               └─ 1.12 (+1.3) → VLS-1.2 (+1.1, PTT-1.1)
                                                        └─ VLS-1.13 (+1.11) → VLS-2.1 (+1.2, 1.11, 1.13)
                                                                              VLS-2.2 (+1.2, 1.13) → VLS-2.3 (+2.1)
```

HITL scan: no tasks require human steps.

## Decision Log
- Topic Verification: Dan approved with the assumption stated.
- Research moved ahead of the brief (inventory, six verify files, grid, matrix, priorities): Dan, after the first plan was queued.
- Playbook refresh generalized into a reusable recipe (reuse section, sketch review): Dan's "easier each time, don't over-index" direction.
