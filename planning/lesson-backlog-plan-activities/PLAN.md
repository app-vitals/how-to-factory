# Plan: lesson-backlog-plan-activities (prefix LBP)

Repo: app-vitals/how-to-factory. One docs change: add the "what a plan session does" outline to the lesson backlog (`lessons/README.md`, Planning / decomposition) as the outline for a later spec-to-plan lesson.

## Direction (Dan, Slack)
Beyond explore code, find similar features, decide where the solution goes, assess breaking changes and plan testing/verification: what else does Shipwright's plan-session do, and what do other factories do? Dan: put the four activities and two extras into the backlog as the outline. Dan was unsure about defaulting to built-in sessions; our call is to write the activities as explicit skill steps and present built-in plan modes as one way to get the same result.

## Design
Add a "Spec to plan" entry under Planning / decomposition in lessons/README.md (backlog stays unordered and tool-neutral). Content:
- **Understand:** clarify the ask; explore the code; find similar features/patterns to reuse; decide where the solution goes.
- **Decide:** weigh complexity risks and breaking changes (list consumers of any rename/removal; constraint additions on existing data need a backfill first); research when the approach is unclear; get the design approved before slicing.
- **Prove:** plan testing and verification (which test layers; what each task adds or retires).
- **Slice:** small shippable tasks with dependencies; bundle tightly coupled ones into one PR; flag work only a human can do; optionally estimate size and pick a model tier.
- **Extras beside the four:** a standards file the plan reads first (a repo instructions file, principles file); an approval point between design and tasks.
- Sources paragraph (fetched 2026-10-12, first-party only, re-verified by the task before citing): Cursor Plan Mode (clarifying questions, codebase research, editable saved plan); Claude Code best practices (explore, plan, implement, commit; interview-then-spec; skip planning when the diff is one sentence); Kiro specs (requirements with acceptance criteria, design with testing strategy, tasks with a dependency graph and traceability); Spec Kit (constitution, specify, plan, tasks, implement, converge). Devin/Copilot: no pre-work planning page found, left out.
- Shipwright's own steps are described as "one example" with no source claim needed beyond the repo's own skill; follow CLAUDE.md (names not canonical, Shipwright is one worked example).
- Not added: a "plan quality / review the plan" line (offered, not requested).

## Tasks
| ID | Title | Deps | Model | Branch |
|---|---|---|---|---|
| LBP-1.1 | docs: add spec-to-plan outline to lesson backlog | none | sonnet | docs/lbp-1-1-spec-to-plan-outline |

## Breaking Change Safety
Additive docs only; nothing renamed or removed. Safe to deploy standalone: yes.

## HITL
None.

## Decision Log
- Entry name and placement: defaulted to "Spec to plan" under Planning / decomposition, keeping the backlog unordered.
- Plan-quality idea: defaulted to not adding - offered to Dan but not requested.
- Built-in plan modes: defaulted to "one way, not the default" per the earlier recommendation.
