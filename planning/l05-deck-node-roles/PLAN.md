# Plan: l05-deck-node-roles

Repo: app-vitals/how-to-factory. Spec: [PRODUCT-SPEC.md](PRODUCT-SPEC.md). Docs-only; no code, no new tests (`scripts/check-decks.ts` is the existing gate).

## Design

One deck file, `lessons/05-see-what-the-factory-is-doing/deck/index.html`. No slide is added or removed, so no slide references in the lesson docs change.

| Slide | Diagram | Change |
|---|---|---|
| 4 (concept) | Record, Queue, Log, History | `Record` agent -> store |
| 5 (build-flow) | Tick, Pick or skip, Run record | `Pick or skip` agent -> job; insert `Agent` (agent) before `Run record` |
| 8 (cap-a1) | Tick, Pick item, Outcome, JSONL line | `Pick item` agent -> job; insert `Agent` (agent) before `Outcome` |
| 9 (cap-a2) | Candidate, Pick or skip, Reason string, Run record | already job; verify only |
| 11 (cap-a3) | Candidates, Sort by pick | label -> `Sort by age` |
| 16 (cap-a5) | Task file, Finished only, Restart, Task file | drop `Restart` and the second `Task file`; end on a `History` store node |
| 26 (exercise) | Record, Reason, Queue and log, Finished work | verify `Record` color (store, not agent) |

Deck rules still hold: at most 8 nodes, labels at most 3 words, one diagram per slide.

## Tasks

| Task | Title | Depends on | Layer | Hours | Complexity | Model | HITL |
|---|---|---|---|---|---|---|---|
| NDR-1.1 | docs: fix node roles and flows in lesson 5 deck | none | Frontend | 1 | 2 | haiku | |

Branch `docs/ndr-l05-deck-node-roles`. Safe to deploy standalone: yes. HITL scan: no tasks require human steps.

```
[START]
  └─ NDR-1.1: deck node roles (no deps)
```

## Breaking Change Safety

No renames or removals of anything with consumers. Slide numbers are unchanged.

## Assumptions

- Slide 16 keeps its title ("finished work survives restarts"); only the diagram changes. The restart beat is deliberate in the run-of-show and exercise.
- Slide 26's `Record` node is recolored only if it is currently an agent node.
