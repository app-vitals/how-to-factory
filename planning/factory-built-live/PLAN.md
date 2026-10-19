# Plan: factory-built-live (prefix FBL)

Repo: app-vitals/how-to-factory. Records the rule that lesson plan sessions queue lesson material only and never `factory/` changes.

## Direction (Dan, Slack)
- "we want to use the factory to build itself moving forward and we don't want to add to the factory/ each lesson like we did this one so we don't want to have anything else built there during these plan sessions. we want to build it out as we work through the course."
- The fuller `plan` and `dev-task` skills grow lesson by lesson, built by the factory.

## Design
The rule: a lesson's plan session queues lesson material only (brief, script, deck, exercise, options, run-of-show). It never queues `factory/` changes. `factory/` is built out live, by the factory itself, as the course runs.

Edits:
- `docs/lesson-playbook.md`: section 0 gets the rule; brief item 6 ("what the factory builds") becomes what is built live on camera, not pre-queued; item 9 and the exercise/loop-delta wording say the loop delta comes from the live build; section 7 gets one line that lesson plan sessions queue no `factory/` tasks.
- `CLAUDE.md`: Layout line for `factory/` changes from "grown lesson by lesson" to built by the factory itself as the course runs; a Rules bullet says plan sessions never touch `factory/`.
- `lessons/README.md`: backlog note that the fuller plan and dev-task skills grow lesson by lesson (spec-to-plan expands plan; verification, review and release extend dev-task), built by the factory.
- `lessons/_template/brief.md`: scoping blockquote and the "What the factory builds in this lesson" prompt carry the old wording; align them.

Out of scope: anything under `factory/` (including `factory/README.md`, whose "grown lesson by lesson" wording is now slightly stale; a good first live-build example). The verification lesson brief is a separate follow-up.

## Tasks
| ID | Title | Deps | Model | Branch |
|---|---|---|---|---|
| FBL-1.1 | docs: lesson plans queue lesson material only, factory built live | none | sonnet | docs/fbl-1-1-factory-built-live |

## Breaking Change Safety
Wording only; nothing renamed or removed externally. Safe to deploy standalone: yes.

## HITL
None.

## Decision Log
- Included `lessons/_template/brief.md` beyond the files Dan listed: it carries the old wording and would contradict the playbook.
- Left `factory/README.md` alone per the no-`factory/` instruction; flagged as a follow-up.
