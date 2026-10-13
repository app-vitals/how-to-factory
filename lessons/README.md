# Lesson backlog

An unordered pool of candidate lessons, grouped by [component](../docs/components.md). There is no numbering
and no syllabus: lessons are chosen one at a time. Every lesson builds the simplest working version of one
idea, then shows where different factories take it.

Shipwright and the "origins" posts are background material and inputs, not a syllabus or a prescribed order.
Component and skill names in lessons are sample names, so call yours whatever you like.

Entries are options that plug into the loop, not steps. They assume no particular agent, language, runner or
order, and a lesson may build any of them with whatever toolchain the student uses.

## Intake / spec
- Turn a chat conversation into a written spec file
- Accept work from an issue or ticket instead of a prompt

## Planning / decomposition
- Break a conversation or spec into small tasks with dependencies
- Keep tasks in a durable queue instead of a chat window
- Estimate task size and pick a model tier per task
- Spec to plan: what a plan session does, in four activities plus two extras (outline below)

### Spec to plan (outline)

A plan session turns an approved spec into a queue of tasks. One way to cut it:

1. **Understand** - clarify the ask, explore the code, find similar features to reuse, decide where the solution goes.
2. **Decide** - flag complexity risks; list breaking changes with their consumers, and any added constraint that needs
   a backfill first; research when the approach is unclear; get the design approved before slicing.
3. **Prove** - plan testing and verification: which test layers apply, and what each task adds or retires.
4. **Slice** - small shippable tasks with dependencies; bundle tightly coupled ones into one PR; flag work only a human
   can do; optionally estimate size and pick a model tier.

Two extras: a standards file the plan reads first, and an approval point between design and tasks.

Shipwright's plan session is one worked example of this shape, not the standard; other factories name and order the steps
differently.

#### How the field does it

Each claim is from the product's own page, fetched 2026-10-13.

- Cursor Plan Mode (https://cursor.com/docs/agent/planning, as of 2026-10-13): the agent asks clarifying questions,
  researches the codebase, and produces a plan you can review and edit through chat or markdown files; plans are saved by
  default in your home directory.
- Claude Code best practices (https://code.claude.com/docs/en/best-practices, as of 2026-10-13): a four-phase workflow
  of explore, plan, implement, commit; for larger features, have the agent interview you and write a spec first; if you
  could describe the diff in one sentence, skip the plan.
- Kiro specs (https://kiro.dev/docs/specs/, as of 2026-10-13): feature specs hold requirements with acceptance
  criteria, a design that includes a testing strategy, and tasks, over which Kiro builds a dependency graph.
- Spec Kit (https://github.com/github/spec-kit, as of 2026-10-13): a command sequence of constitution, specify, plan,
  tasks, implement, then converge, repeating implement and converge until convergence reports Converged.

## Execution
- Run one task in an isolated git worktree and open a PR
- Write the test first, then the code
- Run several tasks in parallel without collisions

## Verification
- Make the agent run lint, typecheck and tests before it says "done"
- Require CI to pass before anything merges
- Design a test system for a repo that has none

## Review
- Have a second agent review the PR
- Set confidence thresholds for AI review comments
- Decide what an AI reviewer may post or approve

## Release
- Let an agent merge when checks are green
- Add a canary step before promoting to everyone
- Detect regressions after merge and open a revert

## Governance / human-in-the-loop
- Write an autonomy policy file every phase reads
- Flag tasks that need a human and route them
- Keep an audit trail beyond the PR diff

## Feedback / maintenance
- Schedule a scan and turn findings into tasks
- Triage errors from an error tracker automatically
- Track throughput and cycle time on a dashboard
- Track rework and merge rate, not just spend

## Observability / ops
- Read a run transcript to see why the agent did what it did
- Keep a run log of what each tick did
- Track token and cost spend per task and per day
- Detect a stalled loop (stuck claims, growing queue age)
- Alert when the factory goes quiet
- Run the factory itself: secrets, sandboxing, rolling out a new agent image
- Write an on-call runbook for an agent

## Memory / learning
- Write an instructions file and improve it from corrections
- Mine past sessions for recurring lessons
- Package repeatable work as reusable skills

## Coordination / loop
- Make one tick that picks the next task and dispatches it
- Schedule the loop on a cron
- Have a coordinator assign work to specialist agents

## Chat interface
- Drive an agent from a chat app
- Build a small harness around an agent runtime
- Post progress and approval requests back to a thread
