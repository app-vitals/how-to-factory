# Plan: lesson3-deck-fixes (prefix DKF)

Repo: app-vitals/how-to-factory. Design and task list approved by Dan, 2026-10-21. Lesson material only; no `factory/` changes.

## Findings (review of `lessons/03-done-means-checked/deck/index.html`, after VLS-2.1)
1. Slide 21 ("Criteria and test plans: partial at best") shows a "✗ no" for Claude Code under criteria to checks. The playbook says never claim a product cannot do something; a blank reads "not in their docs". The verify grid says nothing converts criteria to tests automatically, which is documented, but the chip must agree with the rule and with the grid and matrix.
2. Slide 23's title ("Only Copilot clearly gates on CI rules") can read as the others lacking CI gates. The cells for them are partial or not in their docs.
3. Slide rendering at 1920x1080 was not verified; the playbook and the lesson 3 checklist require it. `check-decks` tests counts and words, not layout.

## Design
- **DKF-1.1**: reword the slide 23 title to state what to notice without implying absence (for example "CI gating is rarely spelled out"). Re-check slide 21 Claude Code criteria cell against `landscape/verify-grid/claude-code.md` and the `verify-criteria` cell in `landscape/matrix.json`; use a mark the grid supports (◐ where the person writes the condition and the page shows acceptance criteria in a goal, – where no page says so), never ✗ unless a page states the product does not. Keep deck, matrix chip, options.md and script wording in agreement. Check the title wording on all four field slides against the same rule.
- **DKF-1.2**: render the lesson 3 deck at 1920x1080 using the headless-shell procedure in `planning/lesson1-grokable-slides/PLAN.md`, look at every table slide and each changed slide for wrapped rows, overflow and the face-cam zone, fix what is found, and make the checklist's render box honest (ticked only if done).

Rejected: editing the deck by hand outside a plan session (repo rule); touching VLS-1.14, which is already `pr_open`.

### Reuse
Lesson 3 deck, `landscape/verify-grid`, `landscape/matrix.json`, the lesson 2 render procedure.

### Complexity risks
- A chip change in `matrix.json` must keep `scripts/check-landscape.ts` green and not alter lesson 1 or 2 slides.
- Render environment may lack the headless shell; if so DKF-1.2 reports what it could not verify rather than ticking the box.

### Breaking-change scan
Only lesson 3 files and one matrix cell change; no renames or removals. Consumers of the cell: lesson 3 deck, options.md and script (checked in DKF-1.1).

### Assumptions
1. Slide numbers in the review match the current deck (21 and 23).
2. ◐ or – is the right replacement for ✗; the task decides from the grid.

## Tasks

| Task | Title | Depends on | HITL | Safe alone |
|---|---|---|---|---|
| DKF-1.1 | docs: fix the slide 21 and 23 wording in the lesson 3 deck | none | | yes |
| DKF-1.2 | docs: render the lesson 3 deck at 1920x1080 and fix layout problems | DKF-1.1 | | yes |

```
[START] DKF-1.1 ── DKF-1.2
```

HITL scan: no tasks require human steps.
