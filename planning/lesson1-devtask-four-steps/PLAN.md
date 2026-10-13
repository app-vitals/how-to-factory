# Plan: lesson1-devtask-four-steps (prefix LDF)

Repo: app-vitals/how-to-factory. Follows lesson1-plan-output (LPO). Corrects two things Dan caught reviewing the deck.

## Direction (Dan, Slack)
- "Depends on: our choice, not the field's" is wrong. Dependencies are for the loop: a task must finish before another can execute, and that is what lets us create smaller tasks.
- Do we need "claim" in dev-task for this presentation? It is for multi-agent. Could have it though.
- What belongs in this lesson versus others (Shipwright and other factories do much more).

## Research
- Kiro specs (https://kiro.dev/docs/specs/, fetched 2026-10-12): tasks carry a dependency graph, independent tasks group into concurrent waves, tasks trace to requirements. This replaces the earlier "thin sourcing, Spec Kit [P] only" claim; the dependency wording in options.md, README.md and script.md must be updated and the Kiro row added after re-fetching the page.
- Claim is a multi-agent concern (stops two agents taking one task). In this lesson's loop one dev-task runs at a time; what a single agent needs is isolation (a branch and worktree so main stays clean).

## Design (calls made per Dan's confirmation)
- **Dependencies:** purpose is ordering for the loop so tasks can stay small. Slide bullet: "Depends on: order, so tasks stay small". No "our choice" framing; cite Kiro (dependency graph, parallel waves) and Spec Kit `[P]`.
- **Dev-task = four steps:** Isolate (worktree on `feat/<id-lowercase>`; set `in_progress` as a visible marker only), Code, Verify (acceptance checks plus project tests, typecheck, lint; fix until pass), Deliver (commit, push, PR, and record status: `pr_open` only after verification passes, `blocked` with a reason otherwise). Claim returns as a real step (locks, heartbeats, stale claims) in the parallel-work lesson. The dependencies-done guard moves out of dev-task; the loop's `pickNext` already enforces it.
- **Scope rule for lesson 1:** does a single agent need it to turn one conversation into reviewed PRs end to end? Yes: plan (tasks with description, acceptance criteria, dependencies), dev-task, loop, human plans and reviews. Everything else is a destination for the "where factories take it" slide and is already a backlog category. Verified-sourcing only for Kiro, Spec Kit, Cursor, Claude Code on planning; execution/review/release claims about other factories need fetching before any slide cites them.

## Tasks
| ID | Title | Deps | Model | Branch |
|---|---|---|---|---|
| LDF-1.1 | docs: cut dev-task to four steps in skill | none | haiku | docs/ldf-1-1-devtask-four-steps-skill |
| LDF-1.2 | docs: reframe dependencies and dev-task steps in lesson docs | 1.1 | sonnet | docs/ldf-1-2-lesson-docs-dependencies |
| LDF-1.3 | docs: update deck and run-of-show for four-step dev-task | 1.2 | sonnet | docs/ldf-1-3-deck-devtask-dependencies |

```
[START] └─ LDF-1.1 ─ LDF-1.2 ─ LDF-1.3
```

## Breaking Change Safety
Docs and skill wording only. The skill's old Claim/Record names are referenced in lesson docs, deck and run-of-show; those are updated in LDF-1.2/1.3. No code or schema change. Safe to deploy standalone: yes.

## HITL
None. Skill edited via factory/skills (not .claude/**).

## Decision Log
- Claim: defaulted to dropping it from lesson 1 - single-agent loop needs isolation, not locking.
- Record: defaulted to folding into Deliver - the loop reads the status, but it is one line, not a teaching step.
- Dependencies-done guard: defaulted to removing from dev-task - loop's pickNext enforces it.
