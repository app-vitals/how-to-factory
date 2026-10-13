# Plan: lesson1-plan-columns (prefix PTC)

Repo: app-vitals/how-to-factory. Follows lesson1-field-slides (FGS), which is merged. Simplifies the plan "how the field differs" slide.

## Direction (Dan, Slack)
- The plan differs slide is noisy ("Plan output" is a column of unrelated phrases). Compare simple yes/no concepts: whether a person approves (human in the loop), and whether tasks get queued up. Dan chose three columns and asked whether approval is also HITL and what happens when you don't approve (HITL, or just dropped?).

## Findings that shaped the design (field-grid, 2026-10-13)
- Approval is a gate form of human-in-the-loop. When a person does not approve, the docs describe editing and iterating, not dropping: Cursor (person edits the plan, then builds), Copilot (review the plan and iterate until it matches intent), Claude Code (no source edits until approved; plan editable first). Factory approves before a Mission runs. OpenHands triage is Automated (a person writes the issue). Devin via Linear: a person starts it or an automation trigger does. Nothing in the docs says a rejected plan is simply dropped.
- Queue vs not is a property of a surface, not a product: Claude Code plan mode makes a plan document while agent teams build a shared task list with dependencies; Cursor Plan Mode vs Projects; OpenHands triage turns issues into ready-for-dev work; Factory Missions group features in milestones; Copilot documents no task split. "No" can only be claimed where a page says so; otherwise the honest value is "not in their docs".
- What is inside the tasks is the sharpest signal and ties to the task-card slide: acceptance criteria are documented for OpenHands triage and Factory Missions; dependencies for OpenHands triage and Claude Code agent teams (and Kiro's dependency graph).
- Whether the plan outlives the chat (session only / saved file / tracker) is the same idea as "a plan as a file survives the session".

## Design
- **Three plan columns replace plan-output and plan-drive in landscape/matrix.json:** `plan-hitl` ("A person approves or edits first"), `plan-persist` ("Tasks outlive the chat"), `plan-contents` ("Criteria and dependencies in them"). verify, loop-across and loop-drive are unchanged. Each cell keeps name / summary / sourceUrl / asOf / `short` (at most 8 words); `short` starts with the answer (Yes, No, or Mixed) and names the surface when a product has two. A "No" is allowed only where a page states the behavior (for example OpenHands triage is automated); otherwise the cell is { omitted: reason } naming the pages checked. plan-hitl summaries state what happens when the person is not satisfied where a page says (edit / iterate).
- **Wording on slides and in the script:** the column header says "A person approves or edits first"; "human in the loop" is the concept, "approval gate" the mechanism; rejection means edit and iterate, not drop (only where the docs say so). Slides never say "matrix", "options.md", "sourced" or "not documented"; a blank reads "not in their docs".
- **Sample row:** a person shapes the plan in chat (Yes); tasks outlive the chat in todos.json (Yes); criteria and dependencies are in each task (Yes).
- Scope: plan slide only. Dev-task and loop slides stay as built in FGS; if Dan wants the same simplification there, that is a follow-up session.

## Tasks
| ID | Title | Deps | Model | Branch |
|---|---|---|---|---|
| PTC-1.1 | feat: replace plan columns in the landscape matrix with three yes/no questions | none | sonnet | feat/ptc-1-1-plan-columns-matrix |
| PTC-2.1 | docs: rebuild plan tables and the plan beat from the new columns | 1.1 | sonnet | docs/ptc-2-1-plan-tables-and-beat |
| PTC-3.1 | docs: rebuild the plan differs slide with three columns | 2.1 | sonnet | docs/ptc-3-1-plan-slide |

```
[START] └─ PTC-1.1 ─ PTC-2.1 ─ PTC-3.1
```

## Breaking Change Safety
Removes components plan-output and plan-drive and adds three. Consumers (grep): scripts/landscape-types.ts (ComponentId), check-landscape.test.ts fixtures, matrix.json, landscape/README.md (generated), lessons/01-the-simplest-factory/options.md, README.md, script.md, the deck's plan differs slide, run-of-show.md. PTC-1.1 changes types, checker tests, matrix.json and regenerates landscape/README.md atomically (CI check-landscape passes). options.md/README/script (PTC-2.1) and the slide (PTC-3.1) follow; until then they cite the earlier snapshot with their own inline URLs and dates, stale but not broken. Safe to deploy standalone: yes.

## HITL
None.

## Decision Log
- Three columns (Dan's call), with column names phrased as yes/no questions.
- "No" only where a page states it: absence cannot be shown from docs, so default is "not in their docs".
- Approval treated as HITL's gate form; rejection documented as edit/iterate, not dropped.
- Scope limited to the plan slide per Dan's message; dev-task and loop slides unchanged.
