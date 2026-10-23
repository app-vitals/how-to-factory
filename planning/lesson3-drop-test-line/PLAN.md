# Plan: lesson 3 drops the "test line" framing

Session: `lesson3-drop-test-line` (prefix `LTL`). Repo: app-vitals/how-to-factory. Lesson material only; nothing under `factory/`.

## Why

"Test line" is a teaching label lesson 2 coined. The factory has no such artifact: a Shipwright task is a title, a description and 2-5 acceptance criteria. Test guidance (layers affected, tests added, tests retired and why) is one criterion bullet (plan-session Step 5), and `layer` is a tag. Lesson 3 should teach the steps of verification, not a recap of a lesson-2 artifact.

## Alignment with Shipwright (checked against plugin `dev-task.md`)

- Matches: red-green-refactor then validate (Step 5), fresh criteria check with MET / PARTIAL / NOT MET (6.5), repo checks (8), PR body carries the criteria table (7, 9), CI gate with 6 bounded fix attempts and attempt history (9b).
- Not in Shipwright: a "never weaken a test" guard (A4) and a step that runs the app (A6). Red-first is an instruction in the subagent prompt, with no recorded proof of the red run. These stay in the lesson as what the live upgrade adds (A4, proof of red) or as walk-throughs (A6), and no lesson text may claim Shipwright already does them.

## Design

- Retire A3 (a test line on every task); the ids stay stable. A2 becomes "Define: criteria become tests, written first" and gains one note: one criterion names the test layer and the tests added or retired.
- Capabilities go from nine to eight across Define, Run, Gate.
- Deck 26 -> 24 slides: delete slide 8 (hand-off recap) and slide 9 (A3); renumber everything after.
- "What the human does" slide: nodes become `Write criteria` -> `Set CI rule` -> `Read PR evidence`. The PR evidence is the criteria-and-checks table in the PR; green CI is the gate, a separate thing.
- Slide 4 caption "Nine capabilities" -> "Eight". Slide 23 caption -> "Each PR carries its criteria and outcomes."
- Field slide 21 drops the "Test plan per task" column.
- Script: the Define block (A2 and A3, 5 min) becomes A2 only (about 3 min); total about 49 min.
- Exercise Step 1 becomes "Criteria are checkable before building starts".
- Live beat is framed as making red-first provable (and adding the weaken-a-test guard), not as adding red-first, which dev-task already instructs.
- Lesson 2: rename "test line" to "test-decision criterion".

## Tasks

| Task | Title | Depends on | Layer | HITL |
|---|---|---|---|---|
| LTL-1.1 | docs: fold lesson 3 test line into the criteria capability | none | Shared | |
| LTL-1.2 | docs: drop the lesson 3 test line slides and renumber | LTL-1.1 | Frontend | |
| LTL-2.1 | docs: rename the lesson 2 test line to a test-decision criterion | none | Shared | |

```
[START]
  ├─ LTL-1.1 (no deps)
  │     └─ LTL-1.2 (needs 1.1)
  └─ LTL-2.1 (no deps)
```

All three are docs-only, additive or rename-only, safe to deploy standalone. LTL-1.1 and LTL-1.2 are split because the deck depends on the brief and script wording settling first.

## Decision Log

- Retire A3 vs keep as a bullet: defaulted to retire, fold into A2 - its content is a good acceptance criterion, not a capability.
- "What the human does" slide variant: defaulted to three nodes - split once / each-PR variant left as an option.
- Keep A4 and A6: defaulted to keep, labelled as not-Shipwright - confirmed by Dan.
- Include lesson 2 rename (LTL-2.1): defaulted to include as an independent task.
