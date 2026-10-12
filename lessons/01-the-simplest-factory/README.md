# Lesson 1: The simplest factory

**Components taught:** [Intake](../../docs/components.md), [Planning / decomposition](../../docs/components.md),
[Execution](../../docs/components.md), plus the smallest possible loop that ties them together
**Video:** _added after publishing_

`factory/` in this repo is our demo. This lesson teaches the concepts; Bun and Claude Code are what the demo happens
to use, never what you need. Each part below goes concept first, then "in our demo we use...", then "yours can be
anything".

## Names for this

The two jobs we build are called `plan` and `dev-task`. Those are just the names used in this sample. Other
factories call the same jobs `feature-dev`, `implement`, `build`, `breakdown` and more (see
[options.md](options.md)). Call yours whatever you like; nothing downstream depends on our names.

## The concept

A software factory turns a request into a reviewed change without you typing every step. Lesson 1 builds the first
half of that and stops at an open pull request: **planning** (a request becomes small, checkable todos),
**execution** (one agent does one todo in isolation and opens a pull request) and a **loop** (repeat until no todo
is ready). A human reviews and merges.

## The simplest thing that works

An AI coding agent and a terminal. You type the request, read the result and open the PR yourself. Everything else
in this lesson is that same flow with the repeated parts written down once and a loop to run them.

## The parts

### Plan

- **Concept:** turn a short request into a list of small todos, each with acceptance criteria and dependencies.
- **In our demo we use:** a markdown skill, [`factory/skills/plan/SKILL.md`](../../factory/skills/plan/SKILL.md),
  that writes [`factory/todos.json`](../../factory/README.md).
- **Yours can be anything:** a prompt you paste, a planning mode, a script, a person filling in a spreadsheet.

Trackers and issues are the usual place a queue lives. `todos.json` is the portable stand-in so the lesson works
without an account anywhere.

### Dev-task

- **Concept:** take one todo, work it in isolation, check it, open a pull request, record the new status.
- **In our demo we use:** a second markdown skill,
  [`factory/skills/dev-task/SKILL.md`](../../factory/skills/dev-task/SKILL.md), run in a git worktree.
- **Yours can be anything:** any agent, any language, any test runner, any way of isolating the work.

### The loop

- **Concept:** while a todo is ready, run execution on it; stop when none is or when one fails to reach an open PR.
- **In our demo we use:** [`factory/loop.ts`](../../factory/loop.ts), a short Bun script that picks the next
  `pending` todo whose dependencies are `done` and runs the agent headlessly on it.
- **Yours can be anything:** a shell `while` loop, a cron job, a queue worker. The agent command is configuration.

## Build steps

Numbers match [script.md](script.md).

1. Start with a plain agent on a tiny task (step 2).
2. Write the plan skill and read the todo list it produces (step 3).
3. Write the dev-task skill and run it on one todo (step 4).
4. Run the loop over the rest, ending at open PRs (step 5).
5. Review and merge them yourself (step 6).

## How the field does it

| Approach | Example | Pick this if |
|---|---|---|
| Plan mode in your coding agent | Claude Code, Cursor | you want a plan you approve before edits |
| Ticket assigned to an agent | Devin via Linear, Copilot cloud agent | work already lives in a tracker |
| Chat mention starts a run | OpenHands, Cursor via Slack | your team lives in chat |
| What starts the next unit of work: a schedule or event you configure | Claude Code Routines, Cursor, Devin, Copilot, OpenHands | you want work to start without you typing |
| Markdown skills plus a todo file (this lesson) | sample `plan` / `dev-task` | you want it forkable and tool-neutral; our loop script starts the next todo (our choice) |

Sources, quotes and as-of dates: [options.md](options.md). Full matrix: [landscape](../../landscape/README.md).

## Where factories take it

Described, not prescribed. Factories in the matrix point toward: work queues in a tracker (Linear, Jira, GitHub
Issues), isolated cloud sandboxes per task, and parallel agents or scheduled runs. Later components get picked up by
the loop, in an order that is left open.

## Exercise and go further

See [exercise.md](exercise.md).

## Files

- [script.md](script.md), [options.md](options.md), [exercise.md](exercise.md)
- [deck/index.html](deck/index.html), [run-of-show.md](run-of-show.md)
