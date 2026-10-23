# Plan: lesson2-per-task-tests

Repo: app-vitals/how-to-factory. Design approved (option B) and task list approved by Dan, 2026-10-21.

## Design

Option B, the light preview. Per-task test planning stays Tier B, owned by the verification lesson. The lesson shows one
example task with its test-decision criterion and adds one exercise check. No capability row, no new slide, no renumbering.

Rejected: option A (a full A10 capability). It adds a test-layer concept to a lesson about looking first and slicing
safely, shifts slide numbers 17-26, and forces a run-of-show and checklist renumber (see #145).

### What changes

| File | Change |
|---|---|
| `brief.md` | Tier B says the plan states each task's test-decision criterion; verification lesson owns test design. A7 "What it takes to build" gets the same clause. |
| `README.md` | Mirror the brief in the A7 section and the out-of-scope paragraph (~L216, ~L279). |
| `deck/index.html` | Slide 16 only: the test-decision criterion replaces the "Backfill before make required" bullet (3 bullets, 8 words max). |
| `script.md` | Slice beat (~L173) gets a short mention; out-of-scope lines (~L61, ~L239) reworded to not contradict. |
| `exercise.md` | One checkbox under outcome 7. |
| `run-of-show.md`, `checklist.md` | Row 7 mentions the test-decision criterion; checklist only if it references the changed beats. |

Reuse: slide 16's structure; the brief's A7 example style. Untouched: `factory/`, slide count, capability count,
`options.md` (its destination wording stays true).

### Complexity risks

- Deck limits: slide 16 already has 3 bullets, so the test-decision criterion replaces one. If it will not fit the word and caption
  limits, fall back to option A's new slide. Run `check-decks` early.
- Tier-B contradiction: brief, README, script and run-of-show all say per-task test planning is out of scope. Land the
  wording change consistently (PTT-1.1 first, others depend on it).
- Verification-lesson overlap: show the bullet only; no layer names.

### Breaking-change scan

Nothing renamed or removed. Slide-number references exist in run-of-show and checklist; none move under option B.

### Assumptions

1. Option B is acceptable (confirmed by Dan).
2. The test-decision criterion is an illustration on slide 16 under the existing caveat; no claims about other products.
3. The exercise change is a checkbox inside outcome 7, not a new outcome.

## Tasks

| Task | Title | Depends on | HITL | Safe alone |
|---|---|---|---|---|
| PTT-1.1 | docs: state per-task tests in the lesson 2 brief and README | none | | yes |
| PTT-1.2 | docs: show a task's test-decision criterion on the lesson 2 slice slide | PTT-1.1 | | yes |
| PTT-1.3 | docs: add the per-task test beat to the lesson 2 script | PTT-1.1 | | yes |
| PTT-1.4 | docs: add a per-task test check to lesson 2 exercise outcome 7 | PTT-1.1 | | yes |
| PTT-1.5 | docs: align the lesson 2 run-of-show and checklist with the test beat | PTT-1.2, PTT-1.3 | | yes |

```
[START]
  └─ PTT-1.1 brief + README
        ├─ PTT-1.2 slide 16 ──┐
        ├─ PTT-1.3 script ────┴─ PTT-1.5 run-of-show + checklist
        └─ PTT-1.4 exercise
```

HITL scan: no tasks require human steps.
