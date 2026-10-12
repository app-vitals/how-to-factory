# Plan: lesson1-plan-output (prefix LPO)

Repo: app-vitals/how-to-factory. Follows lesson1-restructure (LRS); touches lesson 1 deck/script/exercise and `factory/`.

## Direction (Dan, Slack)
- The plan demo's output is tasks, not a schema. Teach what a task needs and why before the plan demo.
- "Others in the matrix" means nothing to a viewer (they don't have the matrix); remove viewer-facing references to the matrix, options.md and "sourced".
- Dev-task steps need to be explicit; at least code and verify.
- Dan asked us to decide the open questions based on what most factories do.

## Research (fetched 2026-10-12)
- Description with context: Copilot cloud agent best practices (docs.github.com/copilot/how-tos/agents/copilot-coding-agent/best-practices-for-using-copilot-to-work-on-tasks) - clear description, background, files involved, one logical task per issue. Devin (docs.devin.ai/essential-guidelines/instructing-devin-effectively) - be specific, give context. Claude Code best practices (code.claude.com/docs/en/best-practices) - good specs name files/interfaces and state what is out of scope.
- Verification is the strongest agreement: Copilot "complete acceptance criteria"; Devin "clear success criteria"; Claude Code "give Claude a way to verify its work"; Anthropic long-running agents (anthropic.com/engineering/effective-harnesses-for-long-running-agents) - per-feature verification steps, mark passing only after testing, JSON chosen because the model is less likely to overwrite it than markdown.
- Size: Copilot "keep it atomic", Devin "split into verifiable sub-tasks". A rule, not a field.
- Dependencies: thin sourcing (Spec Kit marks independent tasks [P]); the case for them is our own reasoning (the loop needs an order). Say so on the slide.
- Status is progress state owned by whoever runs the work (Anthropic's `passes` flag), not the planner.
- Claude Code's own fix-issue skill example has the dev-task shape: implement, write and run tests, lint and typecheck, commit, PR.
- Copilot's page was read via a search summary (the first fetch 404'd): LPO-2.1 must fetch the page before citing it.

## Design (calls made per Dan: "decide based on what most factories do")
- **Plan output = tasks with four things:** title, description (what, why, out of scope), acceptance criteria (checks the agent can run or inspect; label "acceptance criteria", the term most factories use), dependencies. Size is a rule (small enough for one PR), not a field. No size/complexity field in lesson 1.
- **Status is not plan output.** It is the queue's state; the planner writes `pending` as bookkeeping. Introduced in the loop section.
- **Branch is dropped from the schema.** Dev-task derives `feat/<id-lowercase>`. Real branch/worktree coordination is a parallel-work topic for a later lesson. Existing todos.json files that still carry `branch` stay valid (unknown keys are ignored).
- **Dev-task steps:** claim (mark in progress, isolate) -> code -> verify (run the todo's acceptance checks plus project tests, typecheck, lint; fix until they pass) -> deliver (commit, PR) -> record (status; blocked with a reason if verification cannot pass). The PR only opens after verification passes.
- **Viewer wording:** no "matrix", "options.md" or "sourced" on slides. Row "Others in the matrix" becomes "Devin, Copilot, OpenHands, Codegen: no planning feature in their docs"; captions "Sources and dates in options.md" become "Links in the video description"; names slide "not sourced" becomes "no planning docs found". As-of dates stay in table headers. Repo docs (options.md, README) keep their citations.
- **Deck order:** plan concept, plan differs, a "what a plan outputs: tasks" task-card slide plus a "why each part" slide, then the plan DEMO. The old "todo list schema" slide is replaced.

## Tasks
| ID | Title | Deps | Model | Branch |
|---|---|---|---|---|
| LPO-1.1 | refactor: drop branch from todo schema | none | haiku | refactor/lpo-1-1-drop-todo-branch |
| LPO-1.2 | docs: define task output in plan skill and dev-task steps | 1.1 | sonnet | docs/lpo-1-2-skills-task-output |
| LPO-2.1 | docs: teach task output and dev-task steps in lesson 1 | 1.2 | sonnet | docs/lpo-2-1-lesson-task-output |
| LPO-3.1 | docs: rework lesson 1 deck for task output and viewer wording | 2.1 | sonnet | docs/lpo-3-1-deck-task-output |

```
[START]
  └─ LPO-1.1 ─ LPO-1.2 ─ LPO-2.1 ─ LPO-3.1
```

## Breaking Change Safety
`branch` is removed from `Todo` and the validator. Consumers (grep): `factory/todos.schema.ts`, its test, `factory/loop.test.ts` fixture, `factory/skills/plan` + `dev-task`, `factory/README.md`, lesson exercise. All updated across LPO-1.1/1.2/2.1. `loop.ts` does not read `branch`. Existing todos.json with a `branch` field stays valid. All tasks: safe to deploy standalone.

## HITL
None. Skills are edited via `factory/skills/` (not `.claude/**`).

## Decision Log
- Acceptance-criteria label: defaulted to "acceptance criteria" - the term Copilot, Devin and Spec Kit use; keeps the schema key.
- Status/branch: defaulted to removing both from plan output, dropping branch from the schema - matches Anthropic's progress-flag-owned-by-runner pattern and defers branch coordination to the parallel-work lesson.
- Size/complexity field: defaulted to none for lesson 1 - sources treat size as a scoping rule.
