# Lesson 1: The simplest factory

**Components taught:** [Intake](../../docs/components.md), [Planning / decomposition](../../docs/components.md),
[Execution](../../docs/components.md), plus the smallest possible loop that ties them together
**Video:** _added after publishing_

`factory/` in this repo is our demo. This lesson teaches the concepts; Bun and Claude Code are what the demo happens
to use, never what you need. Each part below goes concept first, then "in our demo we use...", then "yours can be
anything".

## Names for this

The two jobs we build are called `plan` and `dev-task`. Those are just the names used in this sample. Other
factories use their own terms for the planning step and the working step; each is sourced and dated in
[options.md](options.md#what-other-factories-call-it).

| Product | Planning | Execution |
|---|---|---|
| Devin | Ask Devin ([source](https://docs.devin.ai/work-with-devin/ask-devin.md), as of 2026-10-13) | Devin session ([source](https://docs.devin.ai/essential-guidelines/instructing-devin-effectively.md), as of 2026-10-13) |
| Factory | Spec Mode ([source](https://docs.factory.com/autonomy-and-safety/specification-mode), as of 2026-10-13) | Mission worker session ([source](https://factory.com/news/missions), as of 2026-10-13) |
| OpenHands | GitHub Issue Triage automation ([source](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md), as of 2026-10-13) | GitHub Issue to PR automation ([source](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md), as of 2026-10-13) |
| Cursor | Plan Mode ([source](https://cursor.com/docs/agent/plan-mode), as of 2026-10-13) | Cloud agent ([source](https://cursor.com/docs/cloud-agent), as of 2026-10-13) |
| GitHub Copilot | no name in their docs | Copilot cloud agent ([source](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent), as of 2026-10-13) |
| Claude Code | Plan mode ([source](https://code.claude.com/docs/en/permission-modes.md), as of 2026-10-13) | Claude Code session ([source](https://code.claude.com/docs/en/how-claude-code-works.md), as of 2026-10-13) |

Call yours whatever you like; nothing downstream depends on our names.

## The concept

A software factory turns a request into a reviewed change without you typing every step. Lesson 1 builds the first
half of that and stops at an open pull request: **planning** (a conversation becomes small, checkable tasks),
**execution** (one agent does one todo on its own branch and opens a pull request) and a **loop** (repeat until no todo
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
  you. Four steps: **branch** (its own branch in a worktree, so main stays clean), **code**, **verify**
  (acceptance checks plus the project's tests, typecheck and lint, fixed until they pass), **deliver** (commit, push,
  PR, and record the status: `pr_open` once verify passes, blocked with a reason otherwise). Verify gates the PR.
  Claiming a task (locks, heartbeats) is a multi-agent concern and comes back in the parallel-work lesson.
- **How the field differs:** what judges a task done differs: tests, lint and type checks (Devin), tests and linters (Copilot), validation
  workers at each milestone end (Factory), a judge model (OpenHands SDK, Claude Code `/goal`), or the agent itself
  (Cursor). See [options.md](options.md).
- **In our demo we use:** a second markdown skill,
  [`factory/skills/dev-task/SKILL.md`](../../factory/skills/dev-task/SKILL.md), run in a git worktree. Demo: we
  write the skill.
- **Yours can be anything:** any agent, any language, any test runner, any way of keeping the work off main.

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

| Product | A person approves or edits first | Tasks outlive the chat | Criteria and dependencies in them | Who decides it's done | What starts the next task | Plan runs inside the loop? |
|---|---|---|---|---|---|---|
| Devin | not in their docs | Yes: Linear tickets and ticket comments ([2026-10-13](https://docs.devin.ai/use-cases/gallery/prd-to-tickets.md)) | Mixed: example tickets carry both; Ask Devin unstated ([2026-10-13](https://docs.devin.ai/use-cases/gallery/prd-to-tickets.md)) | A check (tests, lint, type checks) ([2026-10-13](https://docs.devin.ai/essential-guidelines/sdlc-integration.md)) | A schedule + An event or label (Automations) ([2026-10-13](https://docs.devin.ai/product-guides/automations.md)) | not in their docs |
| Factory (Droid) | Yes: approve or keep iterating ([2026-10-13](https://docs.factory.com/autonomy-and-safety/specification-mode)) | Yes: Spec Mode can save a file ([2026-10-13](https://docs.factory.com/autonomy-and-safety/specification-mode)) | Mixed: Missions criteria; dependencies not documented ([2026-10-13](https://docs.factory.com/missions/running-app)) | Another model (Mission validation workers) ([2026-10-13](https://docs.factory.com/missions/planning)) | A finished run + A schedule (Missions, automations) ([2026-10-13](https://docs.factory.com/missions/overview)) | No: plan approved before it runs ([2026-10-13](https://docs.factory.com/missions/overview)) |
| GitHub Copilot coding agent | Yes: review and iterate on the plan ([2026-10-13](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/research-plan-iterate)) | not in their docs | not in their docs | A check (tests and linters) ([2026-10-13](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents)) | A schedule + An event or label (automations) ([2026-10-13](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automations)) | not in their docs |
| OpenHands | No: triage runs automatically ([2026-10-13](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md)) | Yes: GitHub issue labeled ready-for-dev ([2026-10-13](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md)) | Yes: triage checks dependencies and criteria ([2026-10-13](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md)) | Another model (SDK goal loop) ([2026-10-13](https://docs.openhands.dev/sdk/guides/convo-goal.md)) | An event or label (5-minute poll) ([2026-10-13](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md)) | Yes: triage automation ([2026-10-13](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md)) |
| Cursor | Yes: edit the plan, then Build ([2026-10-13](https://cursor.com/docs/agent/plan-mode.md)) | Yes: plan file; Save to workspace ([2026-10-13](https://cursor.com/help/ai-features/plan-mode.md)) | not in their docs | A check (CI, for cloud auto-fix) ([2026-10-13](https://cursor.com/docs/cloud-agent/capabilities.md)) | A schedule + An event or label (Automations) ([2026-10-13](https://cursor.com/docs/cloud-agent/automations.md)) | Yes: Project coordinator plans and delegates ([2026-10-13](https://cursor.com/docs/agent/projects)) |
| Claude Code | Yes: edit it, approve, or keep planning ([2026-10-13](https://code.claude.com/docs/en/permission-modes.md)) | Yes: agent teams task list on disk ([2026-10-13](https://code.claude.com/docs/en/agent-teams.md)) | Mixed: agent teams have dependencies; criteria undocumented ([2026-10-13](https://code.claude.com/docs/en/agent-teams.md)) | A check + another model (/goal) ([2026-10-13](https://code.claude.com/docs/en/goal.md)) | A finished run (agent team self-claim) ([2026-10-13](https://code.claude.com/docs/en/agent-teams.md)) | Yes: team lead writes the task list ([2026-10-13](https://code.claude.com/docs/en/agent-teams.md)) |
| This sample | Yes: you shape it in chat | Yes: `todos.json` | Yes: each task has criteria and dependencies | A check + the agent itself, running the project's checks | A finished run: the script loops | No: you run plan first |

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
