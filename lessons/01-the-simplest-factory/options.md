# Options: how the field does it

Names are not canonical. All claims below are paraphrases of first-party pages, copied from
[`landscape/matrix.json`](../../landscape/matrix.json) (rendered in [landscape/README.md](../../landscape/README.md)).
Each cell carries its own as-of date. Re-check before filming.
These appear on slides only; the lesson does not run other products live.

## How the field differs

One table per concept, copied cell for cell from [`landscape/matrix.json`](../../landscape/matrix.json): the bold text is
the product's own name for the capability, then a paraphrase of its first-party page, the source URL and the as-of date.
Names are not canonical. A cell says "not documented" only where the page itself says so; the matrix has no omitted
cells, so nothing here is "not in their docs". The last row of each table is the sample in `factory/`, sourced to our own
files. Task-queue products (Linear, Jira, GitHub Issues) are not compared here; they are where a queue lives, not an agent.

### Plan

| Product | Plan output | Plan: who drives |
|---|---|---|
| Devin | **Ask Devin**: In Ask Devin the person scopes and breaks down the task in conversation with Devin, which writes a context-rich prompt that starts an Agent session. The page does not say the breakdown carries acceptance criteria or dependencies. ([source](https://docs.devin.ai/work-with-devin/ask-devin.md), as of 2026-10-13) | **Linear integration**: With Linear, a person starts the work by assigning the ticket, tagging a playbook label or @mentioning Devin (Human), or a Linear automation trigger starts it without manual assignment (Automated). For Ask Devin the page does not label who drives. ([source](https://docs.devin.ai/integrations/linear.md), as of 2026-10-13) |
| Factory (Droid) | **Missions**: Droid builds a structured plan of features grouped into milestones; once the person approves it, the Mission enters Mission Control. Dependency edges between features are not documented. ([source](https://docs.factory.com/missions/overview), as of 2026-10-13) | **Missions**: Mission execution starts once the person approves the plan. ([source](https://docs.factory.com/missions/overview), as of 2026-10-13) |
| GitHub Copilot coding agent | **Research, plan and iterate**: The cloud agent shows a plan in the conversation for review before any changes. Splitting a plan into separate tasks with acceptance criteria and dependencies is not documented. ([source](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/research-plan-iterate), as of 2026-10-13) | **Research, plan and iterate**: The person reviews the plan and iterates until it matches their intent before the agent implements it. ([source](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/research-plan-iterate), as of 2026-10-13) |
| OpenHands | **Software Factory triage**: A triage agent prioritizes issues, checks their dependencies and establishes acceptance criteria, then applies the ready-for-dev label. A separate task list or plan file is not documented. ([source](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md), as of 2026-10-13) | **Software Factory triage**: The triage step is an automation that checks every 5 minutes (Automated); a person writes the issue. ([source](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md), as of 2026-10-13) |
| Cursor | **Plan Mode**: The plan is editable and opens as a virtual file saved by default in the home directory; Save to workspace moves it into the repo. A plan that splits into tasks with criteria and dependencies is not documented as a format. ([source](https://cursor.com/help/ai-features/plan-mode.md), as of 2026-10-13) | **Plan Mode**: The person clicks Build when satisfied with the plan. ([source](https://cursor.com/docs/agent/plan-mode.md), as of 2026-10-13) |
| Claude Code | **Plan mode**: Claude reads the code and writes a plan the person can open in an editor and edit before approving. Splitting the plan into separate tasks with acceptance criteria or dependencies is not documented for plan mode. ([source](https://code.claude.com/docs/en/permission-modes.md), as of 2026-10-13) | **Plan mode**: Source files are not edited until the person approves the plan. ([source](https://code.claude.com/docs/en/permission-modes.md), as of 2026-10-13) |
| This sample | `plan` skill writes a task list to `factory/todos.json`, outside any session ([source](../../factory/skills/plan/SKILL.md)) | Human: you talk the work through, then run the skill ([source](../../factory/skills/plan/SKILL.md)) |

### Dev-task

| Product | Verify: what judges done |
|---|---|
| Devin | **unknown**: Devin runs existing tests, lint and type checks in its own environment and iterates until tests pass before submitting a PR. Which checks run is set by the prompt, playbook or repo skill, not by a fixed pipeline. ([source](https://docs.devin.ai/essential-guidelines/sdlc-integration.md), as of 2026-10-13) |
| Factory (Droid) | **Validation workers**: Validation workers run at the end of each milestone, verifying its work, and Missions validate their own work by exercising the running application. ([source](https://docs.factory.com/missions/planning), as of 2026-10-13) |
| GitHub Copilot coding agent | **Cloud agent session**: The agent works in its own GitHub Actions environment, where it runs tests and linters to validate changes. How the results decide whether it keeps going before opening the PR is not documented. ([source](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents), as of 2026-10-13) |
| OpenHands | **Goal Completion Loop**: In the SDK, a second judge LLM audits the transcript for evidence, such as test output, that proves the objective is complete. The Issue to PR automation lists running tests as a step but does not document what happens when they fail. ([source](https://docs.openhands.dev/sdk/guides/convo-goal.md), as of 2026-10-13) |
| Cursor | **Cloud Agents**: The cloud agent can build, test and interact with the changed software, and can control a desktop and browser. The docs say an agent that cannot run tests cannot close the loop. A fixed pre-delivery gate that always runs is not documented. ([source](https://cursor.com/docs/cloud-agent), as of 2026-10-13) |
| Claude Code | **/goal**: After every turn a separate small model checks the condition; if it is not met, Claude starts another turn. The evaluator runs no commands and reads no files, so the condition must be something the transcript shows, such as a test result. ([source](https://code.claude.com/docs/en/goal.md), as of 2026-10-13) |
| This sample | The `dev-task` skill's verify step: the task's acceptance checks plus the project's tests, typecheck and lint, fixed until they pass; it gates the PR ([source](../../factory/skills/dev-task/SKILL.md)) |

### Loop

| Product | Loop: next task by itself | Loop: who drives |
|---|---|---|
| Devin | **Automations**: An automation fires on a trigger (schedule, ticket, GitHub, Slack or webhook) and starts a session with a saved prompt. A finished session choosing the next ticket by itself is not documented. ([source](https://docs.devin.ai/product-guides/automations.md), as of 2026-10-13) | **Automations**: The page says events start sessions automatically, without a person tagging Devin, once a person has created the automation. ([source](https://docs.devin.ai/product-guides/automations.md), as of 2026-10-13) |
| Factory (Droid) | **Mission orchestrator**: After each feature or milestone finishes, the orchestrator reviews progress and starts the next work from the plan. ([source](https://docs.factory.com/missions/overview), as of 2026-10-13) | **Mission orchestrator**: After approval an orchestrator manages execution; the person can pause it and talk to it to recover. ([source](https://docs.factory.com/missions/overview), as of 2026-10-13) |
| GitHub Copilot coding agent | **Agentic Workflows work queue (gh-aw)**: On the gh-aw site (GitHub Next), a native work queue holds work as a dependency graph; the scheduler picks eligible work and a task waits for its predecessors' results. Copilot automations are documented only as trigger-started runs, not as picking the next ready issue. ([source](https://github.github.com/gh-aw/reference/work-queue/), as of 2026-10-13) | **Agentic Workflows work queue (gh-aw)**: Automated once the producer, dispatcher and worker workflows are published on the default branch. ([source](https://github.github.com/gh-aw/guides/deploy-work-queue/), as of 2026-10-13) |
| OpenHands | **Software Factory**: Four automations poll every 5 minutes. GitHub labels and statuses are the queue, and the next labeled issue is taken at the next poll. ([source](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md), as of 2026-10-13) | **Software Factory**: Automated after a person turns on the four automations and files the issues. ([source](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md), as of 2026-10-13) |
| Cursor | **Automations**: A trigger (schedule, source-control, Slack, webhook, Linear event) starts a cloud agent with a saved prompt. One run starting the next is not documented as chaining. ([source](https://cursor.com/docs/cloud-agent/automations.md), as of 2026-10-13) | **Automations**: Automated after a person creates and activates the automation. ([source](https://cursor.com/docs/cloud-agent/automations.md), as of 2026-10-13) |
| Claude Code | **Agent teams**: In an agent team, a teammate that finishes a task picks up the next unassigned, unblocked task from the shared list on its own. Experimental and off by default. ([source](https://code.claude.com/docs/en/agent-teams.md), as of 2026-10-13) | **Agent teams**: Automated after a person starts the team. ([source](https://code.claude.com/docs/en/agent-teams.md), as of 2026-10-13) |
| This sample | `loop.ts` picks the next pending todo whose dependencies are done and runs the agent on it, stopping at the first failure ([source](../../factory/loop.ts)) | Automated once you start the script ([source](../../factory/loop.ts)) |

## What a good task contains

Each row is a paraphrase of a first-party page, fetched and read on 2026-10-12. Only what the fetched page says is
listed; a claim the page did not support was dropped.

| Product | What it says a task needs | Source (as of 2026-10-12 unless stated) |
|---|---|---|
| GitHub Copilot coding agent | a clear description of the problem or work, complete acceptance criteria for what a good solution looks like (for example, whether there should be unit tests), and directions about which files need to change | [best practices](https://docs.github.com/en/copilot/how-tos/agents/copilot-coding-agent/best-practices-for-using-copilot-to-work-on-tasks) |
| Devin | be as specific as possible, give the repo and broader purpose as context, define clear success criteria, and split work into verifiable sub-tasks, one session each | [instructing Devin effectively](https://docs.devin.ai/essential-guidelines/instructing-devin-effectively) |
| Claude Code | give it a check it can run (tests, a build, a linter) so it can verify its own work; the most useful specs name the files and interfaces involved, state what is out of scope, and end with an end-to-end verification step | [best practices](https://code.claude.com/docs/en/best-practices) |
| Anthropic (long-running agents) | a feature list where each entry has a description, verification steps and a `passes` flag the agent edits only by changing its status; JSON chosen because the model is less likely to overwrite it than Markdown (published 2025-11-26) | [effective harnesses](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) |
| Spec Kit | its tasks command marks independent tasks `[P]` and outlines safe parallel groups | [spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md), as of 2026-10-13 |
| Kiro | builds a dependency graph of the tasks in `tasks.md` and groups independent tasks into waves; tasks in a wave run concurrently, waves run in order | [specs](https://kiro.dev/docs/specs/), as of 2026-10-13 |

**Dependencies** exist so a task can wait until another finishes. That ordering is what lets the plan cut small tasks
and what the loop orders by. Kiro documents a dependency graph with parallel waves, and Spec Kit marks independent
tasks `[P]`. Neither page was found to say more than that here (for example, Kiro's page does not address tracing
tasks to requirements, so we do not claim it). Size is not a
field in any of these; Copilot's page stresses well-scoped tasks and Devin's says split into verifiable sub-tasks, so
we treat size as a rule (one PR), not a field.

## Other factories at a glance (a sourced slide, not a live demo)

| Product | Access, as stated by the vendor | Source |
|---|---|---|
| OpenHands | repo states an MIT license and says agents can run locally or in Docker | [GitHub](https://github.com/OpenHands/OpenHands) |
| Devin | the Free self-serve plan lists limited Devin usage | [billing](https://docs.devin.ai/admin/billing/self-serve.md) |
| Cursor | Cloud Agents need a paid plan, charged at API pricing | [docs](https://cursor.com/docs/background-agent) |

## Where it goes from here

Destinations only, not a recommendation. Claude Code's overview points to parallel subagents, background agents,
scheduled Routines and the Agent SDK ([overview](https://code.claude.com/docs/en/overview)); Cursor runs agents in
isolated cloud VMs ([docs](https://cursor.com/docs/background-agent)); trackers such as Linear, Jira and GitHub
Issues hold the queue ([Linear](https://linear.app/docs/conceptual-model),
[Jira](https://support.atlassian.com/jira-software-cloud/docs/what-is-an-issue/),
[GitHub](https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issues)).
