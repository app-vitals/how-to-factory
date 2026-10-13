# Options: how the field does it

Names are not canonical. All claims below are paraphrases of first-party pages, copied from
[`landscape/matrix.json`](../../landscape/matrix.json) (rendered in [landscape/README.md](../../landscape/README.md)).
As of 2026-10-10 for every row. Re-check before filming.
These appear on slides only; the lesson does not run other products live.

## What other factories call it

| Product | Planning | Execution | Source |
|---|---|---|---|
| Claude Code | plan mode | session | [plan mode](https://code.claude.com/docs/en/common-workflows), [overview](https://code.claude.com/docs/en/overview) |
| Cursor | Plan Mode | Cloud agents | [planning](https://cursor.com/docs/agent/planning), [cloud agents](https://cursor.com/docs/background-agent) |
| OpenHands | (not sourced) | sandbox | [sandboxes](https://docs.openhands.dev/openhands/usage/sandboxes/overview.md) |
| GitHub Copilot coding agent | (not sourced) | Copilot cloud agent | [about](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) |
| Devin | (not sourced) | session | [session tools](https://docs.devin.ai/work-with-devin/devin-session-tools.md) |
| Linear | Issues, Projects, Cycles | n/a (a queue, not an executor) | [conceptual model](https://linear.app/docs/conceptual-model) |
| This sample | `plan` | `dev-task` | [factory/skills](../../factory/skills/) |

## What starts the next unit of work

Copied from the `loop` cells of the matrix, as of 2026-10-12. In this sample the loop is our choice: a script that
picks the next ready todo ([`factory/loop.ts`](../../factory/loop.ts)). Cells the matrix omits are listed as not sourced.

| Product | What starts a run | Source |
|---|---|---|
| Claude Code | Routines: a schedule (recurring or one-off), an HTTP POST to the routine's API endpoint, or GitHub events | [routines](https://code.claude.com/docs/en/routines) |
| Cursor | Automations: a schedule (preset or cron), events from GitHub, GitLab, Slack, Linear and more, or a webhook | [automations](https://cursor.com/docs/cloud-agent/automations) |
| Devin | Automations: Slack messages, GitHub webhooks, Linear ticket updates, schedules (cron or one-time) and custom webhooks | [automations](https://docs.devin.ai/product-guides/automations.md) |
| GitHub Copilot coding agent | Automations: a task defined once, run on a schedule or on repository events | [about](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) |
| OpenHands | Automations: AI tasks run on a cron schedule, each run in a fresh sandbox | [automations](https://docs.openhands.dev/openhands/usage/automations/overview.md) |
| Factory (Droid) | Automation trigger: a schedule, a Slack message, a GitHub event, or an HTTP POST to a webhook | [automations](https://docs.factory.com/software-factory/automations.md) |
| Codegen | not sourced (the pages fetched describe manual, Web UI/CLI, API and PR-driven starts only) | n/a |
| Linear, Jira, GitHub Issues | not sourced (queues, not executors) | n/a |
| This sample | **our choice:** `loop.ts` runs while a todo is ready, one todo per run, stopping at the first failure | [factory/loop.ts](../../factory/loop.ts) |

## How the field differs

Three short tables, one per part. Same sources and as-of dates as the matrix; "not sourced" means the matrix has no
first-party page for it, not that the product lacks it.

### Plan (as of 2026-10-10)

| Product | Planning | Source |
|---|---|---|
| Claude Code | plan mode: proposes a plan, no edits until you approve, in the session | [common workflows](https://code.claude.com/docs/en/common-workflows) |
| Cursor | Plan Mode: asks questions, researches, produces a plan you review and edit before code is written | [planning](https://cursor.com/docs/agent/planning) |
| Devin | no sourced planning stage | n/a |
| GitHub Copilot coding agent | no sourced planning stage | n/a |
| OpenHands | no sourced planning stage | n/a |
| Codegen | no sourced planning stage | n/a |
| Factory (Droid) | no sourced planning stage | n/a |
| This sample | `plan` skill writes the plan to `factory/todos.json`, so it persists outside any session | [factory/skills/plan](../../factory/skills/plan/SKILL.md) |

### Dev-task (as of 2026-10-10)

The shape is common: one task, worked in an isolated environment, checked, handed back as changes. The differences are
the environment and what triggers it.

| Product | Environment | Source |
|---|---|---|
| Claude Code | a session; subagents and background agents in parallel; `claude -p` for CI | [overview](https://code.claude.com/docs/en/overview) |
| Cursor | cloud agents in isolated VMs with a full development environment | [background agents](https://cursor.com/docs/background-agent) |
| Devin | a session with shell, IDE and browser | [session tools](https://docs.devin.ai/work-with-devin/devin-session-tools.md) |
| GitHub Copilot coding agent | an ephemeral cloud development environment | [about](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) |
| OpenHands | a sandbox (Docker, Process or Remote) | [sandboxes](https://docs.openhands.dev/openhands/usage/sandboxes/overview.md) |
| Codegen | isolated environments where agents run code and open PRs | [overview](https://docs.codegen.com/introduction/overview) |
| Factory (Droid) | CLI, Missions and headless Exec Mode | [overview](https://docs.factory.com/cli/getting-started/overview) |
| This sample | the `dev-task` skill in a git worktree | [factory/skills/dev-task](../../factory/skills/dev-task/SKILL.md) |

### Loop (as of 2026-10-12)

Most of these products start each session from a human or an event (a mention, a ticket, a webhook, a schedule),
as the table above shows. Running a queue to exhaustion with a script is our choice for this sample, not something
the sources describe as a product feature.

| Product | Starts from | Source |
|---|---|---|
| Claude Code, Cursor, Devin, Copilot, OpenHands, Factory (Droid) | a human, or an event or schedule you configure | see "What starts the next unit of work" |
| Codegen | not sourced | n/a |
| This sample | our choice: `loop.ts` picks the next ready todo | [factory/loop.ts](../../factory/loop.ts) |

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

## How work enters (intake)

| Approach | Example | Pick this if | Source |
|---|---|---|---|
| Chat mention | OpenHands Slack app; Cursor via Slack | your team lives in chat | [OpenHands](https://docs.openhands.dev/openhands/usage/cloud/slack-installation.md), [Cursor](https://cursor.com/docs/background-agent) |
| Ticket assignment | Devin via Linear | work already lives in a tracker | [Devin + Linear](https://docs.devin.ai/integrations/linear.md) |
| Issue or PR on GitHub | Copilot cloud agent | your work is on GitHub | [about](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) |
| You type it | Claude Code terminal | you are one person | [overview](https://code.claude.com/docs/en/overview) |

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
