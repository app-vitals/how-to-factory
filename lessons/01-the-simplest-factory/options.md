# Options: how the field does it

Names are not canonical. All claims below are paraphrases of first-party pages, copied from
[`landscape/matrix.json`](../../landscape/matrix.json) (rendered in [landscape/README.md](../../landscape/README.md)).
Each cell carries its own as-of date. Re-check before filming.
These appear on slides only; the lesson does not run other products live.

## How the field differs

One table per concept, copied cell for cell from [`landscape/matrix.json`](../../landscape/matrix.json): the bold text is
the product's own name for the capability, then a paraphrase of its first-party page, the source URL and the as-of date.
Names are not canonical. A cell says "not documented" only where the page itself says so; a cell the matrix omits reads
"not in their docs" and lists the pages checked. In the Plan table the bold text names the surface, because one product
often has two (Claude Code plan mode vs agent teams; Cursor Plan Mode vs Projects). The last row of each table is the sample in `factory/`, sourced to our own
files. Task-queue products (Linear, Jira, GitHub Issues) are not compared here; they are where a queue lives, not an agent.

### Plan

| Product | A person approves or edits first | Tasks outlive the chat | Criteria and dependencies in them |
|---|---|---|---|
| Devin | not in their docs. Pages checked: Ask Devin, Linear, Jira, Using Playbooks, gallery bulk-plan-backlog and prd-to-tickets (docs.devin.ai). They describe a person working with Devin in conversation or Devin posting plan comments with open questions, but none states whether a person must approve or edit the plan before work starts. | **PRD to tickets**: In the gallery example Devin reads a PRD and creates Linear tickets, so the plan lives in the tracker. The bulk-plan example instead posts the plan as a comment on each ticket. Ask Devin produces a prompt that starts a session; the page does not say it is saved. ([source](https://docs.devin.ai/use-cases/gallery/prd-to-tickets.md), as of 2026-10-13) | **PRD to tickets**: The page's example output is tickets with an ID, title, T-shirt size, dependencies on other tickets, description, acceptance criteria and likely file paths; it is an example, not a guaranteed format. The Ask Devin page does not say its breakdown carries criteria or dependencies. ([source](https://docs.devin.ai/use-cases/gallery/prd-to-tickets.md), as of 2026-10-13) |
| Factory (Droid) | **Specification Mode**: Droid researches read-only and proposes a plan; nothing is edited until the person approves, and the person can approve or keep iterating on it. In Missions, execution starts once the plan is approved. ([source](https://docs.factory.com/autonomy-and-safety/specification-mode), as of 2026-10-13) | **Specification Mode**: Once approved, the plan can optionally be saved as a dated Markdown file (default .factory/docs). Whether Spec Mode splits it into separate tasks is not documented. ([source](https://docs.factory.com/autonomy-and-safety/specification-mode), as of 2026-10-13) | **Missions plan**: A Mission plan is features grouped into milestones, and each feature has its own validation criteria visible in the Factory App. Explicit dependency edges between features are not documented (ordering is mentioned). ([source](https://docs.factory.com/missions/running-app), as of 2026-10-13) |
| GitHub Copilot coding agent | **Research, plan and iterate**: The cloud agent shows a plan before making changes; the person reviews it and iterates with follow-up prompts until it matches their intent, then asks it to implement. In Copilot CLI plan mode the person chooses to accept the plan before autopilot starts. ([source](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/research-plan-iterate), as of 2026-10-13) | not in their docs. Pages checked (docs.github.com): Research, plan and iterate; Copilot CLI autopilot; Copilot on GitHub.com; Best practices; Dynamic workflows. They say the plan is shown in the conversation or executed by the same session; none says it is saved as a file or tracker items. | not in their docs. Pages checked (docs.github.com): Research, plan and iterate; Copilot CLI autopilot; Best practices; improve-a-project tutorial. None says a plan is split into tasks carrying acceptance criteria or dependencies (the tutorial has the person check criteria on issues Copilot creates from findings, which is not plan output). |
| OpenHands | **Software Factory triage**: The triage agent runs as an automation that checks every 5 minutes: it prioritizes issues, checks dependencies, establishes acceptance criteria, then applies the ready-for-dev label. The page describes no step where a person approves or edits the result; the person writes the issues and acceptance criteria beforehand. ([source](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md), as of 2026-10-13) | **ready-for-dev label**: The output of triage is the GitHub issue carrying the ready-for-dev label, which the developer automation watches. A separate task list or plan file is not documented. ([source](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md), as of 2026-10-13) | **Software Factory triage**: The triage agent checks the issue's dependencies and establishes acceptance criteria before applying ready-for-dev. How the criteria are written is not documented. ([source](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md), as of 2026-10-13) |
| Cursor | **Plan Mode**: The agent writes a plan that the person reviews and edits in chat or as markdown, then clicks Build when satisfied. If it is not right, the docs advise reverting and refining the plan rather than patching a bad build with follow-ups. ([source](https://cursor.com/docs/agent/plan-mode.md), as of 2026-10-13) | **Plan Mode**: The plan opens as an editable virtual file saved by default in the person's home directory; Save to workspace moves it into the repo for sharing. ([source](https://cursor.com/help/ai-features/plan-mode.md), as of 2026-10-13) | not in their docs. Pages checked (cursor.com): Plan Mode docs and help, Agent overview, Prompting agents, Agentic coding help, Multi-agent help, Projects. None says plan steps carry acceptance criteria. Multi-agent help says Build in Parallel keeps dependent steps in order but not how dependencies are written. |
| Claude Code | **Plan mode**: Claude writes a plan and does not edit source files until it is approved. The person can open the plan in a text editor (Ctrl+G) and edit it; approving offers three choices: continue in auto mode, continue approving each edit, or keep planning. ([source](https://code.claude.com/docs/en/permission-modes.md), as of 2026-10-13) | **Agent teams**: In an agent team the lead creates tasks in a shared task list, stored locally under ~/.claude/tasks/{team-name}/. Agent teams are experimental and off by default. ([source](https://code.claude.com/docs/en/agent-teams.md), as of 2026-10-13) | **Agent teams**: Tasks in the shared task list can depend on other tasks: a pending task with unresolved dependencies cannot be claimed until they are completed. Acceptance criteria on a task are not documented. ([source](https://code.claude.com/docs/en/agent-teams.md), as of 2026-10-13) |
| This sample | Yes: you shape it in chat ([source](../../factory/skills/plan/SKILL.md)) | Yes: `factory/todos.json` ([source](../../factory/README.md)) | Yes: each task has criteria and dependencies ([source](../../factory/skills/plan/SKILL.md)) |

### Dev-task

| Product | Who decides it's done |
|---|---|
| Devin | **unknown**: Devin runs existing tests, lint and type checks in its own environment before submitting a PR. Which checks run is set by the prompt, playbook or repo skill, not by a fixed pipeline. ([source](https://docs.devin.ai/essential-guidelines/sdlc-integration.md), as of 2026-10-13) |
| Factory (Droid) | **Validation workers**: Validation workers run at the end of each milestone, verifying its work, and Missions validate their own work by exercising the running application. ([source](https://docs.factory.com/missions/planning), as of 2026-10-13) |
| GitHub Copilot coding agent | **Cloud agent session**: The agent works in its own GitHub Actions environment, where it runs tests and linters to validate changes. How the results decide whether it keeps going before opening the PR is not documented. ([source](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents), as of 2026-10-13) |
| OpenHands | **Goal Completion Loop**: In the SDK, a second judge LLM audits the transcript for evidence, such as test output, that proves the objective is complete. The Issue to PR automation lists running tests as a step but does not document what happens when they fail. ([source](https://docs.openhands.dev/sdk/guides/convo-goal.md), as of 2026-10-13) |
| Cursor | **CI auto-fix**: Cloud agents automatically try to fix CI failures in PRs they create, and the repository's own CI checks are the judge. A fixed pre-delivery gate that always runs is not documented. ([source](https://cursor.com/docs/cloud-agent/capabilities.md), as of 2026-10-13) |
| Claude Code | **/goal**: After every turn a separate small model checks the condition. The evaluator runs no commands and reads no files, so the condition must be something the transcript shows, such as a test result the agent's own check produced. ([source](https://code.claude.com/docs/en/goal.md), as of 2026-10-13) |
| This sample | A check + the agent itself: the `dev-task` skill's verify step has the agent run the task's acceptance checks plus the project's tests, typecheck and lint, and fix until they pass; it gates the PR ([source](../../factory/skills/dev-task/SKILL.md)) |

### Loop

| Product | What starts the next task | Plan runs inside the loop? |
|---|---|---|
| Devin | **Automations**: An automation fires on a trigger (schedule, ticket, GitHub, Slack or webhook) and starts a session with a saved prompt. A finished session choosing the next ticket by itself is not documented. ([source](https://docs.devin.ai/product-guides/automations.md), as of 2026-10-13) | not in their docs. Pages checked: Automations, Linear, Jira, Using Playbooks, gallery bulk-plan-backlog and prd-to-tickets (docs.devin.ai). None states whether a plan step runs inside the automation loop, or whether a person approves one first. |
| Factory (Droid) | **Mission orchestrator**: After each feature or milestone finishes, the orchestrator starts the next work from the plan. Separately, scheduled automations (for example the "Ticket to PR" starter, every 15 minutes) pick up ready tickets. ([source](https://docs.factory.com/missions/overview), as of 2026-10-13) | **Missions plan approval**: A Mission's plan is built with the person and must be approved before execution starts; the docs describe the orchestrator working from that plan and do not describe it re-planning during execution. ([source](https://docs.factory.com/missions/overview), as of 2026-10-13) |
| GitHub Copilot coding agent | **Copilot automations**: A saved task runs when a trigger fires: a recurring schedule, an issue created, a pull request opened, or a pull request synchronized. Picking the next ready issue by itself is not documented for automations. ([source](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automations), as of 2026-10-13) | not in their docs. Pages checked: About automations, Creating automations, Managing rationale and approvals, Using cloud agent on GitHub (docs.github.com). None states whether a plan step runs inside the automation loop or is approved before it. |
| OpenHands | **Software Factory**: Four automations poll every 5 minutes. GitHub labels and statuses are the queue, and the next labeled issue is taken at the next poll. ([source](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md), as of 2026-10-13) | **Software Factory triage**: The triage automation runs on the same 5-minute poll: it prioritizes issues, checks dependencies and establishes acceptance criteria before applying the ready-for-dev label, which triggers the developer automation. No person approves in between. ([source](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md), as of 2026-10-13) |
| Cursor | **Automations**: A trigger (schedule, source-control, Slack, webhook, Linear event) starts a cloud agent with a saved prompt. One run starting the next is not documented as chaining. ([source](https://cursor.com/docs/cloud-agent/automations.md), as of 2026-10-13) | **Projects coordinator**: The Project coordinator plans the work, delegates it to agents and brings the finished work back; with subscriptions it delegates a fix each time a bug is posted. The page does not say whether each event gets a fresh plan or whether a plan needs approval. ([source](https://cursor.com/docs/agent/projects), as of 2026-10-13) |
| Claude Code | **Agent teams**: In an agent team, a teammate that finishes a task picks up the next unassigned, unblocked task from the shared list on its own. Experimental and off by default. ([source](https://code.claude.com/docs/en/agent-teams.md), as of 2026-10-13) | **Agent teams**: The team lead creates the tasks in the shared task list (with dependencies) and teammates work through them. The page does not say a person approves that task list first. ([source](https://code.claude.com/docs/en/agent-teams.md), as of 2026-10-13) |
| This sample | A finished run: the script loops. `loop.ts` picks the next pending todo whose dependencies are done and runs the agent on it, stopping at the first failure ([source](../../factory/loop.ts)) | No: you run plan first ([source](../../factory/loop.ts)) |

## What other factories call it

Each product's own term for the planning step and the working step, copied from the `plan-name` and `execute-name`
cells of [`landscape/matrix.json`](../../landscape/matrix.json). `plan` and `dev-task` are only this sample's names.

| Product | Planning | Execution |
|---|---|---|
| Devin | Ask Devin ([source](https://docs.devin.ai/work-with-devin/ask-devin.md), as of 2026-10-13) | Devin session ([source](https://docs.devin.ai/essential-guidelines/instructing-devin-effectively.md), as of 2026-10-13) |
| Factory | Spec Mode ([source](https://docs.factory.com/autonomy-and-safety/specification-mode), as of 2026-10-13) | Mission worker session ([source](https://factory.com/news/missions), as of 2026-10-13) |
| OpenHands | GitHub Issue Triage automation ([source](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md), as of 2026-10-13) | GitHub Issue to PR automation ([source](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md), as of 2026-10-13) |
| Cursor | Plan Mode ([source](https://cursor.com/docs/agent/plan-mode), as of 2026-10-13) | Cloud agent ([source](https://cursor.com/docs/cloud-agent), as of 2026-10-13) |
| GitHub Copilot | no name in their docs | Copilot cloud agent ([source](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent), as of 2026-10-13) |
| Claude Code | Plan mode ([source](https://code.claude.com/docs/en/permission-modes.md), as of 2026-10-13) | Claude Code session ([source](https://code.claude.com/docs/en/how-claude-code-works.md), as of 2026-10-13) |

GitHub Copilot: the pages checked (Research, plan and iterate; About Copilot cloud agent; the 2026-04-01 changelog post)
ask for a plan before changes but none names the planning feature, so the cell reads "no name in their docs".

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
