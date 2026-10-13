# Plan: lesson1-branch-step (prefix DTB)

Repo: app-vitals/how-to-factory. Renames the first dev-task step from "Isolate" to "Branch" across the skill, lesson docs and deck.

## Direction (Dan, Slack)
Dan asked what "isolate" is. Answer: step 1 of the dev-task skill loads the todo, marks it in_progress (a visible marker, not a lock) and creates a git worktree on its own branch `feat/<id-lowercase>` off the latest main, then works only there, so main stays clean, other work is untouched, a failed run is a throwaway branch, and the PR comes from that branch. "Isolate" is jargon on a slide and reads as sandboxing; isolation (worktree per task, VMs, parallel collisions) is a later execution lesson in the backlog. Dan: "branch is exactly what i was thinking."

## Design
- **Step 1 becomes "Branch":** load the todo (stop if missing), create a worktree on its own branch derived from the id (`feat/<id-lowercase>`) off the latest main so main stays clean, work only there. The `in_progress` marker stays in the skill as a one-line note (visible marker only, not a lock) but is not part of the step's label or the slide; status recording stays in Deliver.
- **Wording:** "branch" in the skill, script, README, exercise, run-of-show and the deck's dev-task node. "Isolation" stays as the word for the later lesson (the backlog entry "Run one task in an isolated git worktree" and "Where factories take it" sandbox mentions are left alone). Exercise: the execution step works on its own branch (a separate worktree keeps your checkout clean); done-when says "on its own branch".
- **Ordering with open work:** PTC-2.1 (script/README/options) and PTC-3.1 (deck/run-of-show) from lesson1-plan-columns edit the same files and are not merged yet, so the lesson-docs task depends on PTC-2.1 and the deck task on PTC-3.1 to avoid conflicts.

## Tasks
| ID | Title | Deps | Model | Branch |
|---|---|---|---|---|
| DTB-1.1 | docs: rename the isolate step to branch in the dev-task skill | none | haiku | docs/dtb-1-1-branch-step-skill |
| DTB-2.1 | docs: rename isolate to branch in the lesson docs and exercise | DTB-1.1, PTC-2.1 | sonnet | docs/dtb-2-1-branch-step-lesson-docs |
| DTB-3.1 | docs: rename isolate to branch on the dev-task slide and run-of-show | DTB-2.1, PTC-3.1 | haiku | docs/dtb-3-1-branch-step-deck |

```
[PRIOR SESSION lesson1-plan-columns] PTC-2.1 ─┐ PTC-3.1 ─┐
[START] DTB-1.1 ─ DTB-2.1 (needs 1.1, PTC-2.1) ─ DTB-3.1 (needs 2.1, PTC-3.1)
```

## Breaking Change Safety
Step label rename, wording only. Consumers (grep): factory/skills/dev-task/SKILL.md, factory/README.md, lessons/01-the-simplest-factory/{script,README,exercise,run-of-show}.md, deck/index.html (dev-task node). No code or schema change; no CI check reads the step names. Safe to deploy standalone: yes.

## HITL
None. Skill edited via factory/skills (not .claude/**).

## Decision Log
- Name: "Branch", per Dan.
- in_progress marker: kept as a one-line note in the skill, dropped from the step label, slide and script; loop.ts is not changed.
- Isolation stays as the term for the later execution lesson; backlog and destination mentions untouched.
- Cross-session dependencies on PTC-2.1/PTC-3.1 to avoid editing the same files concurrently.
