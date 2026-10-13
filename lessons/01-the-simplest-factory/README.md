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
half of that and stops at an open pull request: **planning** (a conversation becomes small, checkable tasks),
**execution** (one agent does one todo in isolation and opens a pull request) and a **loop** (repeat until no todo
is ready). A human reviews and merges.

## What the human does

Three things: chat and explore with your own agent, run the plan, review the PRs. The chat is part of plan, not a
separate step: plan's input is that conversation. After plan, the loop runs dev-task per todo without you.

## The simplest thing that works

An AI coding agent and a terminal. You talk the work through, read the result and open the PR yourself. Everything
else in this lesson is that same flow with the repeated parts written down once and a loop to run them.

## The parts

Each part goes concept first (inputs, steps, outputs, generalized across factories), then how the field differs
([options.md](options.md)), then a build-only demo: we write the skill or loop on camera and run nothing. Running
it end to end is lesson 2.

### Plan

- **Concept:** inputs are the conversation context (or a file); steps split it into small tasks; the output is a
  task list that outlives the session. Human-triggered and interactive.
- **What a task contains:** four parts. A *title* (a handle for skimming the queue). A *description* (what, why and
  what is out of scope), because the agent has no memory of your conversation. *Acceptance criteria* (checks the
  agent can run or inspect), because they tell it when it is done and give verify something to pass or fail.
  *Dependencies* (which tasks must finish before another can run), so the plan can cut smaller tasks and the loop can
  order them; see Kiro and Spec Kit in [options.md](options.md). Size is a rule, not a field: small enough for one PR. Status is the queue's state
  (introduced with the loop), and the branch is derived by dev-task (a real concern once work runs in parallel,
  a later lesson).
- **How the field differs:** the plan splits two ways. Claude Code, Cursor, Copilot and Factory show a plan you approve
  before work starts; OpenHands works from issues in a queue (a triage automation labels them ready). See
  [options.md](options.md).
- **In our demo we use:** a markdown skill, [`factory/skills/plan/SKILL.md`](../../factory/skills/plan/SKILL.md),
  that writes [`factory/todos.json`](../../factory/README.md). Demo: we write the skill.
- **Yours can be anything:** a prompt you paste, a planning mode, a script, a person filling in a spreadsheet.

Trackers and issues are the usual place a queue lives. `todos.json` is the portable stand-in so the lesson works
without an account anywhere.

### Dev-task

- **Concept:** inputs are one task; outputs are a pull request and a recorded status. The loop triggers it, not
  you. Four steps: **isolate** (its own branch in a worktree, so main stays clean), **code**, **verify**
  (acceptance checks plus the project's tests, typecheck and lint, fixed until they pass), **deliver** (commit, push,
  PR, and record the status: `pr_open` once verify passes, blocked with a reason otherwise). Verify gates the PR.
  Claiming a task (locks, heartbeats) is a multi-agent concern and comes back in the parallel-work lesson.
- **How the field differs:** what judges a task done differs: tests, lint and type checks (Devin), tests and linters (Copilot), validation
  workers at each milestone end (Factory), a judge model (OpenHands SDK, Claude Code `/goal`), or the agent itself
  (Cursor). See [options.md](options.md).
- **In our demo we use:** a second markdown skill,
  [`factory/skills/dev-task/SKILL.md`](../../factory/skills/dev-task/SKILL.md), run in a git worktree. Demo: we
  write the skill.
- **Yours can be anything:** any agent, any language, any test runner, any way of isolating the work.

### The loop

- **Concept:** inputs are the task list; steps are pick the next ready task, run dev-task, re-read, repeat; the
  output is open PRs. It stops when none is ready or one fails to reach an open PR. Status lives here: it is the
  queue's state, written by dev-task and read by the loop.
- **How the field differs:** moving on to the next task by itself splits the field. Factory, OpenHands and Claude Code
  document it (Factory's orchestrator, OpenHands polling labeled issues, Claude Code agent teams, experimental);
  Devin and Cursor document event or schedule starts; Copilot automations document trigger starts and the gh-aw work queue documents picking the next task. See [options.md](options.md).
- **In our demo we use:** [`factory/loop.ts`](../../factory/loop.ts), a short Bun script that picks the next
  `pending` todo whose dependencies are `done` and runs the agent headlessly on it. Demo: we write the loop.
- **Yours can be anything:** a shell `while` loop, a cron job, a queue worker. The agent command is configuration.

## Why we loop

This is our opinion, not a standard. A plan kept as a file survives the session. One todo per run limits the blast
radius. The loop removes the human as the bottleneck, while the human stays at plan and at PR review.

## How it all works together

A slide only, nothing run: our flow (human plans, loop runs dev-task, human reviews) contrasted with the
alternative where a human or an event starts each session.

## Build steps

Numbers match [script.md](script.md).

1. Factory map, what the human does, what we build (steps 1-3).
2. Write the plan skill (step 4).
3. Write the dev-task skill (step 5).
4. Write the loop (step 6).
5. Why we loop, how it works together, names (steps 7-9).
6. Next lesson: run it end to end (step 10).

## How the field does it

Short labels copied from [`landscape/matrix.json`](../../landscape/matrix.json); each links to its first-party source with
the as-of date.

| Product | Plan output | Plan: who drives | Verify: what judges done | Loop: next task by itself | Loop: who drives |
|---|---|---|---|---|---|
| Devin | Ask Devin: prompt that starts a session ([2026-10-13](https://docs.devin.ai/work-with-devin/ask-devin.md)) | Linear: Human or Automated; Ask Devin unstated ([2026-10-13](https://docs.devin.ai/integrations/linear.md)) | Tests, lint, type checks named in prompt ([2026-10-13](https://docs.devin.ai/essential-guidelines/sdlc-integration.md)) | Triggers start sessions; next-ticket pick undocumented ([2026-10-13](https://docs.devin.ai/product-guides/automations.md)) | Automated after setup ([2026-10-13](https://docs.devin.ai/product-guides/automations.md)) |
| Factory (Droid) | Mission plan: features grouped in milestones ([2026-10-13](https://docs.factory.com/missions/overview)) | Human approves ([2026-10-13](https://docs.factory.com/missions/overview)) | Validation workers at each milestone end ([2026-10-13](https://docs.factory.com/missions/planning)) | Orchestrator starts next feature after each ([2026-10-13](https://docs.factory.com/missions/overview)) | Automated; person can pause ([2026-10-13](https://docs.factory.com/missions/overview)) |
| GitHub Copilot coding agent | Plan shown for review; no task split documented ([2026-10-13](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/research-plan-iterate)) | Human approves ([2026-10-13](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/research-plan-iterate)) | Runs tests and linters; gate not documented ([2026-10-13](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents)) | gh-aw work queue; Copilot automations: not documented ([2026-10-13](https://github.github.com/gh-aw/reference/work-queue/)) | Automated once workflows are published ([2026-10-13](https://github.github.com/gh-aw/guides/deploy-work-queue/)) |
| OpenHands | Issue labeled ready-for-dev ([2026-10-13](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md)) | Automated triage; Human writes the issue ([2026-10-13](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md)) | SDK: judge LLM audits transcript for proof ([2026-10-13](https://docs.openhands.dev/sdk/guides/convo-goal.md)) | Polls labeled issues every 5 minutes ([2026-10-13](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md)) | Automated once a person sets it up ([2026-10-13](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md)) |
| Cursor | Editable plan; saved to home or workspace ([2026-10-13](https://cursor.com/help/ai-features/plan-mode.md)) | Plan Mode: Human approves ([2026-10-13](https://cursor.com/docs/agent/plan-mode.md)) | Agent builds and tests itself; no fixed gate ([2026-10-13](https://cursor.com/docs/cloud-agent)) | Triggers start runs; chaining not documented ([2026-10-13](https://cursor.com/docs/cloud-agent/automations.md)) | Automated after setup ([2026-10-13](https://cursor.com/docs/cloud-agent/automations.md)) |
| Claude Code | Editable plan; task split not documented ([2026-10-13](https://code.claude.com/docs/en/permission-modes.md)) | Plan mode: Human approves ([2026-10-13](https://code.claude.com/docs/en/permission-modes.md)) | /goal: small model checks the condition ([2026-10-13](https://code.claude.com/docs/en/goal.md)) | Agent teams self-claim next task (experimental) ([2026-10-13](https://code.claude.com/docs/en/agent-teams.md)) | Automated once a person starts the team ([2026-10-13](https://code.claude.com/docs/en/agent-teams.md)) |
| This sample | `plan` skill writes `todos.json` | Human | Acceptance checks, tests, typecheck, lint | `loop.ts` picks the next ready todo | Automated once started |

Sources, quotes and as-of dates: [options.md](options.md). Full matrix: [landscape](../../landscape/README.md).

## Where factories take it

Described, not prescribed. Factories point toward: work queues in a tracker (Linear, Jira, GitHub
Issues), isolated cloud sandboxes per task, and parallel agents or scheduled runs. Later components get picked up by
the loop, in an order that is left open.

## What belongs in lesson 1

The test: does a single agent need it to turn one conversation into reviewed PRs end to end? If yes, it is here: plan
(tasks with a description, acceptance criteria and dependencies), dev-task, the loop, and you planning and reviewing.
The rest is where factories take it, covered in later lessons.

## Exercise and go further

See [exercise.md](exercise.md).

## Files

- [script.md](script.md), [options.md](options.md), [exercise.md](exercise.md)
- [deck/index.html](deck/index.html), [run-of-show.md](run-of-show.md)
