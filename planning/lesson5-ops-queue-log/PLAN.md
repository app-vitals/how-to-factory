# Plan: lesson5-ops-queue-log (prefix LOQ)

Repo: app-vitals/how-to-factory. Design and task list approved by Dan, 2026-10-30. Lesson material only: **no `factory/` changes** (the factory builds `factory/` live). Mirrors [`planning/lesson4-pr-routing`](../lesson4-pr-routing/PLAN.md) and the sequence in [`docs/lesson-creation.md`](../../docs/lesson-creation.md).

## Direction (Dan, Slack)
- First operations lesson: seeing what your factory is doing through a web interface, inspired by Shipwright's Queue & Activity page (queue plus loop log).
- The view is built during the lesson. The lesson's own dev tasks and PRs appear in the queue and loop log, and the Completed view at the end shows the full history of the lesson's work.
- A single local agent with no name. Viewers come to the web view to ask: why has my agent not created a PR for this task, not reviewed this PR, not patched this PR.
- Same format as earlier lessons: concept, then what other factories have, then the build. Scope it tightly; it is the first of several operations lessons.
- An investigation skill is a destination, not built here ("hold off if it does not fit").

## Design
- **Topic (confirmed by approval): Observability / ops**, the labelled sub-section of Feedback / maintenance (`docs/components.md`), Keeps-it-safe-and-healthy band.
- **One idea:** every item the factory holds, and every tick it runs, says what it did and why; look at the view before you debug.
- **Stages (draft):** Record (one event per tick with outcome, duration and skip or error reason; a reason on every candidate), Queue (Upcoming: type, item, age, waiting because), Log (Past ticks, filterable by outcome, linked to task or PR), History (Completed work kept across restarts).
- **Payoff:** the three questions (no PR, no review, no patch) each map to a specific reason string in the Queue view.
- **Built live, not queued:** a run-log writer in the loop (JSONL), reason fields from the existing candidate and PR-state logic, and a small local web server rendering Queue, Log and Completed pages.
- **Out of scope (owners):** transcript reading and the investigation skill (later ops lesson); token and cost spend (later ops lesson); stall detection and alerts (later ops lessons); throughput and cycle-time dashboards (feedback and maintenance lesson); fleet views and named agents (multi-agent deep dive); UI auth and hosting (governance lesson).
- **Research:** the same six products, how each shows what the agent is doing and has done. First-party URL and as-of date on every claim.

### Reuse
Lesson 4's research shape, brief, options, deck, script and run-of-show formats; `decks/_template`; `landscape/field-grid` and `landscape/routing-grid` as starting notes; lesson 4's PR routing and attempt cap, whose states the view explains.

### Complexity risks
- `landscape/matrix.json` and the vendor allowlist are touched only by LOQ-1.9; run `check:landscape` and re-render the README.
- The deck must pass `scripts/check-decks.ts`.
- Public repo: scrub rules apply to every file, including `planning/` notes.
- The demo needs real tasks and PRs flowing through the loop; the run-of-show (LOQ-2.4) plans the data.

### Breaking-change scan
Additions only: a new grid directory, new matrix columns, a new lesson directory, backlog wording. No renames or removals.

### Assumptions
1. Component is Observability / ops (confirmed by approval).
2. Directory name `lessons/05-see-what-the-factory-is-doing` (renameable until the lesson ships; confirmed).
3. Research follows the six-product pattern; dimensions are a starting list.
4. Dan reviews the sketch PR (LOQ-2.1); the deck and script tasks stay blocked until it merges.

## Tasks

| Task | Title | Depends on | HITL | Safe alone |
|---|---|---|---|---|
| LOQ-1.1 | docs: inventory Shipwright queue and loop-log capabilities and the reason for each | none | | yes |
| LOQ-1.2 to 1.7 | docs: research how Devin, Factory, OpenHands, Cursor, Copilot, Claude Code show agent activity (one each) | none | | yes |
| LOQ-1.8 | docs: assemble the activity grid with a cross-check | 1.2 to 1.7 | | yes |
| LOQ-1.9 | feat: add the activity visibility dimensions to the landscape matrix | 1.8 | | yes |
| LOQ-1.10 | docs: rank activity visibility capabilities on expected, common and crucial | 1.1, 1.8 | | yes |
| LOQ-1.11 | docs: add the lesson 5 brief (see what your factory is doing) | 1.10 | | yes |
| LOQ-1.12 | docs: write lesson 5 options from the activity grid | 1.11, 1.9 | | yes |
| LOQ-1.13 | docs: update the lesson backlog and components map for lesson 5 | 1.11 | | yes |
| LOQ-2.1 | docs: sketch the lesson 5 deck for review | 1.11, 1.12 | | yes |
| LOQ-2.2 | docs: build the lesson 5 deck | 2.1 | | yes |
| LOQ-2.3 | docs: write the lesson 5 script and lesson README | 2.1 | | yes |
| LOQ-2.4 | docs: write the lesson 5 exercise, run-of-show and pre-filming checklist | 2.2, 2.3 | | yes |

```
[START] ├─ LOQ-1.1 ─────────────────────────────┐
        └─ LOQ-1.2..1.7 (parallel) → 1.8 ─┬─ 1.9 ───────────────┐
                                           └─ 1.10 (+1.1) → 1.11 ─┬─ 1.13
                                                                    └─ 1.12 (+1.9) → 2.1 → 2.2, 2.3 → 2.4
```

HITL scan: no tasks require human steps (no `.claude/**` files, no CI workflow secrets).

## Open items
- Lesson 4 video URL is still pending from Dan. The lesson 5 README and backlog leave the lesson 4 link as a placeholder; a small docs task follows once the URL is supplied (not invented).

## Decision Log
- Component: Observability / ops, per Dan; the lesson 4 brief left the queue snapshot to this lesson.
- Investigation skill: kept as a named destination for a later ops lesson, per Dan.
- Length target 30 to 40 minutes, as lessons 1 to 4.
- Sketch review gates the deck and script: lesson-creation recipe step 5.
