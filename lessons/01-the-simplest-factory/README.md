# Lesson 1: The simplest factory

**Components taught:** [Intake](../../docs/components.md), [Planning / decomposition](../../docs/components.md),
[Execution](../../docs/components.md)
**Video:** _added after publishing_

## Names for this

The two skills we build are called `plan` and `dev-task`. Those are just the names used in this sample. Other
factories call the same jobs `feature-dev`, `implement`, `build`, `breakdown` and more (see
[options.md](options.md)). Call yours whatever you like; nothing downstream depends on our names.

## The concept

A software factory turns a request into a reviewed change without you typing every step. Three parts do the first
half of that: **intake** (the request gets written down), **planning** (the request becomes small, checkable
todos) and **execution** (one agent does one todo in isolation and opens a pull request).

## The simplest thing that works

Plain Claude Code in a terminal. You type the request, read the result, and open the PR yourself. Everything else
in this lesson is that same loop with the repeated parts moved into two markdown skill files and a JSON todo list.

## Build steps

Numbers match [script.md](script.md).

1. Start with plain Claude Code on a tiny task (step 3).
2. Write the `plan` skill and a todo list file (steps 4-5).
3. Write the `dev-task` skill: one todo, one worktree, one PR (steps 6-7).
4. Preview the harness that will drive these later (step 8).

The sample skills live in [`factory/skills/`](../../factory/skills/); the todo schema is in
[`factory/README.md`](../../factory/README.md). The ACP harness and the loop are built on camera in later
lessons and are not pre-built.

## How the field does it

| Approach | Example | Pick this if |
|---|---|---|
| Plan mode in your coding agent | Claude Code, Cursor | you want a plan you approve before edits |
| Ticket assigned to an agent | Devin via Linear, Copilot cloud agent | work already lives in a tracker |
| Chat mention starts a run | OpenHands, Cursor via Slack | your team lives in chat |
| Markdown skills plus a todo file (this lesson) | sample `plan` / `dev-task` | you want it forkable and tool-neutral |

Sources, quotes and as-of dates: [options.md](options.md). Full matrix: [landscape](../../landscape/README.md).

## Where factories take it

Described, not prescribed. Factories in the matrix point toward: work queues in a tracker (Linear, Jira, GitHub
Issues), isolated cloud sandboxes per task, and parallel agents or scheduled runs. Later lessons in this series
pick these up one at a time.

## Maintenance cron (optional)

A tiny weekly job that runs `bun test` on the sample factory and lists failures as new todos. Not built in this
lesson; it returns once the loop exists.

## Exercise and go further

See [exercise.md](exercise.md).

## Files

- [script.md](script.md), [options.md](options.md), [exercise.md](exercise.md)
- [deck/index.html](deck/index.html), [run-of-show.md](run-of-show.md)
