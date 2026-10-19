# Plan: lesson2-spec-to-plan (prefix L2P)

Repo: app-vitals/how-to-factory. Lesson 2 ("A plan that looks before it slices", working title): lesson material and research only. **No `factory/` changes**: per FBL-1.1 the factory is built out live, by itself, during the lesson.

## Direction (Dan, Slack)
- Next lesson is spec to plan, not verification. The spec itself stays an input; formalizing it is a later intake lesson (order: plan, dev-task, verification, review, then spec).
- Follow-up from lesson 1: the loop gets run for real in the opening segment. Dan may just talk over getting it running. The lesson uses the factory to extend itself live.
- A human must approve the design before any tasks are written.
- Redo the field research for ALL six comparables. Size is not tested in this pass.

## Brief (agreed)
- Component: Planning / decomposition (spec to plan). One idea: a plan that reads the code and gets its design approved before slicing yields tasks that fit what already exists.
- In scope: Understand (clarify inside the session, explore code, find reuse, decide where it goes); Decide (complexity risks, breaking changes with consumers, research only when unclear, hard human approval before tasks are written).
- Out of scope (owners): Prove/test planning -> verification lesson; how a spec gets written -> later intake/spec lesson; standards file -> instructions-and-standards lesson; bundling, estimates, model tier -> unscheduled later planning lesson.
- Sample steps: take brief/conversation; ask only what the code cannot answer; explore the repo; write a short design (approach, rejected alternatives, risks, breaking changes + consumers); human approves; slice as today.
- Opening segment: run lesson 1's loop for real on a small task. Narration only; nothing pre-queued.
- Live beat: the existing factory plans and runs its own upgrade of the plan skill on camera. Not queued here.
- Exercise outcomes: plan reads code before proposing; writes a design naming reuse and breakage; stops for approval before creating tasks; on a small feature the tasks name real files.
- Loop delta: loop proven end to end; it consumes tasks grounded in code with an approved design.

## Design
- Lesson dir `lessons/02-a-plan-that-looks-first/` (brief, README, options, script, exercise, run-of-show, checklist, deck/index.html).
- Research in `landscape/plan-grid/`, one file per product plus an assembled README, following playbook section 2 (docs index first, pages read in full, Pages read / Ruled out, first-party URL + fetch date, own words). Columns follow this lesson's steps: reads code before proposing; design output and form; names reuse/risks/breaking changes; approval before work (Human / Human approves / Automated, only when a page states it); how it becomes tasks. Existing 2026-10-13 notes in lessons/README.md are stale starting points only.
- Slide chips: add the plan columns to `landscape/matrix.json` (chip + short, as LRS-1.1 did for the loop). May need a type/checker tweak in `scripts/` (repo tooling, not `factory/`).
- Shared files are chained: lessons/README.md and the brief template are also edited by FBL-1.1, so tasks touching them depend on it.

## Tasks
| ID | Title | Deps | Model | Branch |
|---|---|---|---|---|
| L2P-1.1 | docs: add lesson 2 brief | FBL-1.1 | sonnet | docs/l2p-1-1-lesson2-brief |
| L2P-1.2 | docs: research Devin planning against the docs index | none | sonnet | docs/l2p-1-2-plan-devin |
| L2P-1.3 | docs: research Factory planning against the docs index | none | sonnet | docs/l2p-1-3-plan-factory |
| L2P-1.4 | docs: research OpenHands planning against the docs index | none | sonnet | docs/l2p-1-4-plan-openhands |
| L2P-1.5 | docs: research Cursor planning against the docs index | none | sonnet | docs/l2p-1-5-plan-cursor |
| L2P-1.6 | docs: research Copilot planning against the docs index | none | sonnet | docs/l2p-1-6-plan-copilot |
| L2P-1.7 | docs: research Claude Code planning against the docs index | none | sonnet | docs/l2p-1-7-plan-claude-code |
| L2P-2.1 | docs: assemble the plan grid with a cross-check | 1.2-1.7 | sonnet | docs/l2p-2-1-plan-grid |
| L2P-2.2 | feat: add plan-design dimension to landscape matrix | 2.1 | sonnet | feat/l2p-2-2-matrix-plan-design |
| L2P-3.1 | docs: write lesson 2 options.md from the plan grid | 1.1, 2.2 | sonnet | docs/l2p-3-1-options |
| L2P-3.2 | docs: write lesson 2 README, script and exercise | 3.1 | sonnet | docs/l2p-3-2-script |
| L2P-3.3 | docs: build lesson 2 deck | 3.2 | sonnet | docs/l2p-3-3-deck |
| L2P-3.4 | docs: write lesson 2 run-of-show and checklist | 3.3 | sonnet | docs/l2p-3-4-run-of-show |
| L2P-4.1 | docs: mark spec-to-plan taught in the backlog and refresh its field notes | FBL-1.1, 2.1 | sonnet | docs/l2p-4-1-backlog |

```
[PRIOR] FBL-1.1 [pr_open]
[START] ├─ L2P-1.1 (needs FBL-1.1)
        ├─ L2P-1.2..1.7 (six parallel, one file each)
              └─ 2.1 ─┬─ 2.2 ─┬─ 3.1 (also needs 1.1) ─ 3.2 ─ 3.3 ─ 3.4
                      └─ 4.1 (also needs FBL-1.1)
```

## Breaking Change Safety
Additive only. L2P-2.2 adds a dimension to matrix.json without renaming or removing anything the lesson 1 deck reads and must keep check-landscape green. Safe to deploy standalone: yes (each task).

## HITL
None.

## Decision Log
- Matrix chips (2.2) kept, as lesson 1 did, so slides read from data; Dan approved.
- Brief (1.1) waits on FBL-1.1 because both edit the brief template.
- Loop follow-up and live extension are script/run-of-show narration only; nothing is queued against factory/.
