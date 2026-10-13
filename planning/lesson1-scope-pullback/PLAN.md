# Plan: lesson1-scope-pullback (prefix SPB)

Repo: app-vitals/how-to-factory. Pulls the lesson-1 field comparisons back to lesson-1 scope and adds the small connectors between acceptance criteria and verification. Follows lesson1-verify-columns (VRF) and lesson1-loop-columns (LPL).

## Direction (Dan, Slack)
- On the "Names are your choice" slide: the second column says "Checking done" while the sample says dev-task; should it be plan and execution (or coding), or is checking done verification? Are the names accurate? Did we slip into other lessons (planning and verification are future lessons)?
- Dan: "i feel like we had to have some sort of acceptance criteria and verification here, but we were trying to keep the lesson digestible. where did we go too far, where should we pull back, where should we add more?" Then: "let's go ahead and plan it. only update tasks if they are still pending, and don't update merged PRs."

## Findings
- The names slide column mixes execution names (Cursor "Cloud Agents", Copilot "Cloud agent session") with checking mechanisms (Factory "Validation workers", OpenHands "Goal Completion Loop", Claude Code "/goal"), because it reused the `verify` cell names. dev-task is the Execution component (docs/components.md #3); Verification is component #4 and shows faded on the factory map. Copilot's "Research, plan and iterate" is a docs page title, not a product term; Devin's "no name in their docs" for checking is shaky (Testing & Recordings, Auto-Fix and Devin Review are named features).
- Lesson 1 components are Planning, Execution and Loop plus the human at plan and PR review. We slipped on the dev-task differs slide (who decides done / runs the app / keeps going is the Verification lesson), on the loop slide's "a person can step in between tasks" (governance), and in comparison volume overall (four compare-the-field slides).
- Already in the lesson at about the right depth: acceptance criteria on the task card and "criteria: checks the agent can run"; verify as the third dev-task step; "the PR opens only after verification passes"; the exercise requires a verify step. Missing connectors: a worked example of a criterion becoming a check, the failure path (verify fails, task blocked, the loop stops), and an honest forward pointer (in our sample the agent grades itself).

## Design
- **Task-store changes made before this plan** (each checked pending first; merged PRs and non-pending tasks untouched): VRF-2.1 and VRF-3.1 rescoped to the single verify-judge column; LPL-1.1/2.1/3.1 rescoped to two loop columns (loop-starts-next, loop-includes-plan; no loop-person-between). VRF-1.1's three-component matrix split is already merged and stays as banked data for the verification lesson; the lesson materials use only verify-judge. The older plans (planning/lesson1-verify-columns, planning/lesson1-loop-columns) are not edited; this plan is the record of the change.
- **Names slide:** columns "Planning | Execution" (sample: plan | dev-task). Names are each product's own term, sourced; a cell with no product term reads "no name in their docs" only after the pages are named. New matrix components `plan-name` and `execute-name` ("What they call the planning step / the working step") hold the data so the slide, options.md and the script derive from the checked matrix.
- **Connectors (script, two short captions, backlog pointer):** (1) a worked example: a task with two criteria (for instance "greet('Ada') returns 'Hello, Ada'") shown becoming the checks verify runs; (2) the failure path in one line: verify fails, the task is set blocked with a reason, the loop stops on it; (3) a forward pointer: in our sample the agent runs the checks and decides it is done, other factories add an independent judge, and that is the verification lesson. lessons/README.md's Verification section gets a pointer to the banked research (landscape/field-grid and the verify-* matrix columns). The exercise's planning outcome asks for criteria written as checks you can run.
- Ordering: all of this edits the matrix, script, options and deck files that the pending VRF/LPL/DTB tasks also edit, so the new tasks depend on the last editor of each (LPL-1.1 for the matrix, LPL-3.1 for the lesson docs and deck).

## Tasks
| ID | Title | Deps | Model | Branch |
|---|---|---|---|---|
| SPB-1.1 | feat: add plan-name and execute-name columns to the landscape matrix | LPL-1.1 | sonnet | feat/spb-1-1-name-columns-matrix |
| SPB-2.1 | docs: rebuild the names slide as planning and execution | SPB-1.1, LPL-3.1 | sonnet | docs/spb-2-1-names-slide |
| SPB-3.1 | docs: connect acceptance criteria to verification and point to the verification lesson | SPB-2.1 | sonnet | docs/spb-3-1-criteria-verify-connectors |

```
[PRIOR SESSIONS] LPL-1.1 ─┐   LPL-3.1 ─┐
[START] SPB-1.1 (needs LPL-1.1) ─ SPB-2.1 (needs 1.1, LPL-3.1) ─ SPB-3.1 (needs 2.1)
```

## Breaking Change Safety
SPB-1.1 adds components (additive); consumers of the component list are scripts/landscape-types.ts, the checker tests, renderer and generated README, all updated atomically in that task. SPB-2.1 replaces the names slide's second column and the options.md names table. SPB-3.1 is additive prose plus two captions. No renames or removals of anything external. Safe to deploy standalone: yes.

## HITL
None.

## Decision Log
- Header "Execution" (not "Coding" or "Checking done"): matches the component in docs/components.md and the dev-task node on the factory map.
- Names live in the matrix (plan-name, execute-name) so slides are derived from sourced data, per the earlier `short` convention.
- Verification depth is banked, not deleted: matrix columns and field-grid research stay; lesson materials show only who decides it's done.
- The unsupported "Research, plan and iterate" page title is not used as a product name.
