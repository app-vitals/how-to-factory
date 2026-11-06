# Plan: l05-deck-flow-cleanup

Repo: app-vitals/how-to-factory. Spec: [PRODUCT-SPEC.md](PRODUCT-SPEC.md). Docs-only; no code, no new tests (`scripts/check-decks.ts` is the existing gate).

## Design

Edit one deck file and the lesson docs that cite its slide numbers. Each flow ends at its last real step (store, job, agent or external node); "a person reads this" moves to captions and bullets.

### Slide map (28 slides now, 26 after)

| Old | New | Slide |
|---|---|---|
| 1-10 | 1-10 | same numbers; 4, 5, 7, 8, 9 get content edits |
| 11 | dropped | Queue stage |
| 12-13 | 11-12 | A3, DEMO |
| 14 | dropped | Log stage |
| 15-16 | 13-14 | A4, DEMO |
| 17-19 | 15-17 | History stage, A5, A6 |
| 20-21 | 18-19 | DEMO, DEMO |
| 22 | 20 | After |
| 23-28 | 21-26 | field slides, names, destinations, exercise |

### Diagram edits (node labels at most 3 words)

- Slide 4: four boxes, no arrows, History as a store node.
- Slide 5: Tick -> Pick or skip -> Run record; caption "One record. Queue, Log and History read it."
- Slide 7: Outcome and Reason feed Run record.
- Slide 8 (A1): the line; carries the only "Examples are illustrations" caption.
- Slide 9 (A2): a reason on every run record.
- Old 12 (A3): Candidates -> Sort by pick (oldest first); drop "Add reason" and "Upcoming page".
- Old 15 (A4): JSONL file -> Filter outcome -> Reason.
- Old 18 (A5): Task file -> Finished only -> Restart -> Task file.
- Old 19 (A6): Item id -> Link helper -> PR on GitHub.
- Old 22 (After): drop Web view.
- Exercise: last node "Finished work" (store); bullet "Every skipped run says why".
- "Around the view, later": may add a "Blocked list" option (options-grid stays at most 4).

## Tasks

| Task | Title | Depends on | Layer | Hours | Complexity | Model | HITL |
|---|---|---|---|---|---|---|---|
| LDV-1.1 | docs: remove view nodes and stage slides from lesson 5 deck | none | Frontend | 2 | 2 | haiku (sonnet via bundle) | |
| LDV-1.2 | docs: align lesson 5 docs with reworked deck | LDV-1.1 | Shared | 2 | 3 | sonnet | |

Both share branch `feat/ldv-l05-deck-flow` (one PR).

```
[START]
  └─ LDV-1.1: deck edits (no deps)
        └─ LDV-1.2: docs alignment (needs 1.1)
```

Safe to deploy standalone: yes (both). HITL scan: no tasks require human steps.

## Breaking Change Safety

Renumbering slides changes references in `run-of-show.md`, `script.md` and `checklist.md`; LDV-1.2 updates all of them in one task, and both tasks ship in one PR, so no intermediate state is deployed.

## Assumptions

- The sourced field-comparison slides (old 23-24) and their citations are left alone.
- The A3 slide follows the DEMO slide directly once the Queue stage slide is dropped.
