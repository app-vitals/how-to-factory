# Plan: lesson 2 stage restructure

Session: `lesson2-stage-restructure`. Repo: `app-vitals/how-to-factory`. Scope: lesson 2 (`lessons/02-a-plan-that-looks-first`) plus the planning-stage list in `lessons/README.md` and `planning/lesson-depth-reset/capability-priorities.md`. Nothing under `factory/` changes.

Origin: Dan's review of the lesson 2 deck. Decisions are his.

## Design

1. **Delete the 9 failure slides** and their `cap-N-failure` diagrams. Each capability keeps its one diagram.
2. **One line per capability slide: why it exists, or what it prevents**, whichever is stronger for that capability. Not both. The freed bullet budget carries one or two short concrete examples. Deck rules still apply (max 3 bullets, 8 words each, title 8 words, at most 2 visual blocks, a visual on every content slide). Fuller examples (2 to 3 per capability) live in the script, README and brief. Examples constructed for the lesson keep the `(illustration)` tag.
3. **Stage vocabulary everywhere: Look, Design, Approve, Slice.** Replaces Understand and Decide. The stage name appears in each capability slide title (for example "Look: explore by layer, and reuse"). No letter or number scheme beyond that.
4. **Grouping.** Queue awareness moves into Look (it is early in a Shipwright plan session, step 1.3 and 1.4; slicing still dedupes and adds dependencies).
   - Look: queue awareness, clarify and state assumptions, layered exploration with reuse, complexity risks
   - Design: breaking-change scan, saved design linked from every task
   - Approve: hard approval before tasks exist
   - Slice: add, migrate, remove slicing; human-only task flag
   - Within Look the order mirrors the plan skill: read the queue first. Capability count stays nine.
5. **Queue awareness is key.** Crucial rating Med to High in `capability-priorities.md` (Inv #2 reason is documented, so High is allowed). Expected (Low) and Common (0 of 6) stay as the honest evidence. The lesson leads with: open tasks, including other sessions', are valid dependencies, so new work queues with confidence without waiting for in-flight work.
6. **Complexity risks stay, reworked.** Rating stays Med. Framed as risks that can reshape the plan: flagged before the design, and the design may rework or simplify the approach because of them.
7. **Deck checks.** `scripts/check-decks.ts` and its tests reference no failure slides; no script change expected. Verify they pass.

## Tasks

| Task | Title | Depends on |
|---|---|---|
| STG-1.1 | docs: rate queue awareness crucial and rework complexity risks in capability priorities | none |
| STG-1.2 | docs: rename the planning stages to look, design, approve, slice in the lessons backlog | none |
| STG-2.1 | docs: regroup lesson 2 README and brief by stage with what-it-prevents and examples | STG-1.1 |
| STG-2.2 | docs: regroup the lesson 2 script by stage and drop the failure beats | STG-2.1 |
| STG-3.1 | docs: rework the lesson 2 deck by stage and delete the failure slides | STG-2.1 |
| STG-3.2 | docs: renumber the lesson 2 run-of-show and checklist for the new deck | STG-2.2, STG-3.1 |

## Breaking Change Safety

Docs only; nothing is renamed or removed that code consumes. STG-3.1 removes slides, and STG-3.2 updates the run-of-show slide numbers that point at them, so STG-3.2 depends on STG-3.1. Safe to deploy standalone: yes for all.
