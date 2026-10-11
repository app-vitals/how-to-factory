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
- Break a spec into small tasks with dependencies
- Keep tasks in a durable queue instead of a chat window
- Estimate task size and pick a model tier per task

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
- Track a quality metric, not just spend

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
