# OpenHands: activity grid

Scope: how OpenHands shows what the agent is doing and has done: current and queued work, status, the reason an item waits,
an activity log, history, the link from an item to its PR, why the agent did something, cost, and whether it works for one
local agent without a hosted account. Left out on purpose: how work is planned, built, verified or reviewed (lessons 1 to 4).
Every filled cell is a paraphrase of a first-party docs.openhands.dev page, with its URL and the date I fetched it
(**2026-10-30**). The notes in `landscape/field-grid/openhands.md` and `landscape/routing-grid/openhands.md` (both for the same
product) were a starting list; every page used here was fetched again.

Names are OpenHands' own, not canonical. A cell says `not documented` only after naming the pages checked. "Not documented"
means not in their docs, not that the product cannot do it.

Method: fetched the docs index (https://docs.openhands.dev/llms.txt, 2026-10-30), listed the pages that could touch
conversations, automations, run history, metrics, persistence and tracing, and fetched each as a raw-Markdown URL. Every page
under "Pages read" was read in full from the downloaded Markdown, and every `not documented` cell was checked against the whole
of the pages named in it. Honest limit: pages not under "Pages read" were judged from the index only (see "Ruled out").

## The grid

Surfaces: **Agent Canvas** (the browser control surface; by default it runs a local backend on the person's machine; its
conversation list, the Automate view and the Activity Log), **Cloud UI** (the hosted web app at app.all-hands.dev), **SDK**
(the Python library, for people who build their own runner). The Software Factory and Issue to Pull Request automations run
inside Agent Canvas and show up through its Automate view.

| Dimension | Agent Canvas | Cloud UI | SDK |
| --- | --- | --- | --- |
| **List of current and queued work** | The sidebar lists conversations, with filters for automation-run conversations, tags, pinned and archived ones. The Automate view lists every automation on the active backend with name, trigger type and enabled state. A queue of waiting issues or tasks: not documented (checked: Conversations, Managing automations, Issue to Pull Request, Software Factory). ([Conversations](https://docs.openhands.dev/openhands/usage/agent-canvas/conversations.md), [Managing automations](https://docs.openhands.dev/openhands/usage/agent-canvas/managing-automations.md), 2026-10-30) | The landing page shows `Recent Conversations` and `Suggested Tasks` for repositories OpenHands can reach. A queue of waiting work: not documented (checked: Cloud UI). ([Cloud UI](https://docs.openhands.dev/openhands/usage/cloud/cloud-ui.md), 2026-10-30) | Not documented as a work list (checked: Persistence, Metrics Tracking, Observability). Each conversation has its own directory on disk. ([Persistence](https://docs.openhands.dev/sdk/guides/convo-persistence.md), 2026-10-30) |
| **Status per item** | Automation runs show `PENDING`, `RUNNING`, `COMPLETED`, `FAILED`, `CANCELLED` or `SKIPPED`, plus a live phase (`PENDING`, `RUNNING`, `FAILED`) on cards, in the Activity Log and on the home screen. A completed run's badge also shows its task outcome. A `/goal` run shows `running`, `complete`, `capped` or `interrupted`. Per-issue status for an Issue to PR run: not documented beyond the issue comments and PR (checked: Issue to Pull Request). ([Managing automations](https://docs.openhands.dev/openhands/usage/agent-canvas/managing-automations.md), [Conversations](https://docs.openhands.dev/openhands/usage/agent-canvas/conversations.md), 2026-10-30) | Not documented (checked: Cloud UI, GitHub Integration). The GitHub page says the issue gets a comment when work starts, with a link to follow progress. ([GitHub Integration](https://docs.openhands.dev/openhands/usage/cloud/github-installation.md), 2026-10-30) | The persisted state holds the agent's execution status (idle, running, paused and so on) and the iteration count. ([Persistence](https://docs.openhands.dev/sdk/guides/convo-persistence.md), 2026-10-30) |
| **Stated reason when waiting, blocked or skipped** | Partly. A `SKIPPED` run "can occur" when the backend reaches its concurrency limit; whether the run itself shows that reason: not documented (checked: Managing automations). A disabled automation shows a banner with a reason (for example manually disabled, or a permanent dispatch failure), structured detail and a timestamp. A paused or waiting conversation: not documented (checked: Conversations, Managing automations). ([Managing automations](https://docs.openhands.dev/openhands/usage/agent-canvas/managing-automations.md), 2026-10-30) | Not documented (checked: Cloud UI, GitHub Integration, Getting Started). | Not documented (checked: Persistence, Observability). |
| **Run or activity log** | Yes: an Activity Log per automation with run phase, status and cost, exportable as CSV or JSON. Script automations have `View logs` for their output. While an agent works, the composer shows a live chip for its current action (reading a file, running a command, or `Thinking`). ([Managing automations](https://docs.openhands.dev/openhands/usage/agent-canvas/managing-automations.md), [Conversations](https://docs.openhands.dev/openhands/usage/agent-canvas/conversations.md), 2026-10-30) | The Cloud UI page lists recent conversations; a run log or activity log for the account: not documented (checked: Cloud UI). The automations page says each automation run appears as a conversation in the list. ([Managing Automations](https://docs.openhands.dev/openhands/usage/automations/managing-automations.md), 2026-10-30) | Events are saved one file per event under the conversation's `events/` directory, which the page calls the same trajectory data as OpenHands V0's `trajectory.json`. A default console visualizer prints events as they happen; it can be replaced with your own class. ([Persistence](https://docs.openhands.dev/sdk/guides/convo-persistence.md), [Custom Visualizer](https://docs.openhands.dev/sdk/guides/convo-custom-visualizer.md), 2026-10-30) |
| **History of finished work, and how long it is kept** | Conversations stay in the list. Archiving hides one without deleting it; its full history stays on the backend. `Delete all` is permanent. Settings, secrets and conversation history live in `~/.openhands` (npm, npx) or the `openhands-data` Docker volume until the person removes them. On cloud backends a script run's sandbox is deleted shortly after the run, so its logs are gone afterwards. A retention period: not documented (checked: Conversations, Managing automations, Install Agent Canvas, Architecture). ([Conversations](https://docs.openhands.dev/openhands/usage/agent-canvas/conversations.md), [Install Agent Canvas](https://docs.openhands.dev/openhands/usage/agent-canvas/setup.md), [Managing automations](https://docs.openhands.dev/openhands/usage/agent-canvas/managing-automations.md), 2026-10-30) | Run conversations are saved so they can be reviewed or continued later. A retention period: not documented (checked: Cloud UI, Automations Overview, Managing Automations). ([Automations Overview](https://docs.openhands.dev/openhands/usage/automations/overview.md), 2026-10-30) | Saved until the person deletes the directory; a retention period is not documented (checked: Persistence). The default location is `workspace/conversations/`. ([Persistence](https://docs.openhands.dev/sdk/guides/convo-persistence.md), 2026-10-30) |
| **Link from an item to its PR** | Issue to PR: the agent opens a PR titled `[#42] <issue title>` with `Closes #42` in the body and posts the PR link on the issue. In a conversation, the overview panel shows git state including branch, commits and pull requests. A link from an Activity Log run row to a PR: not documented (checked: Managing automations, Conversations). ([Issue to Pull Request](https://docs.openhands.dev/openhands/usage/agent-canvas/prebuilt/issue-to-pr.md), [Conversations](https://docs.openhands.dev/openhands/usage/agent-canvas/conversations.md), 2026-10-30) | Labeling an issue `openhands` or mentioning `@openhands` gets a comment with a progress link, then a PR if the issue looks solved, then a summary comment with the PR link. ([GitHub Integration](https://docs.openhands.dev/openhands/usage/cloud/github-installation.md), 2026-10-30) | Not documented (checked: Persistence, Metrics Tracking). |
| **See why the agent did something** | Each conversation keeps messages, tool calls and file changes. `Export transcript` downloads Markdown or HTML, optionally with full tool inputs and outputs and timestamps, built in the browser. A goal run shows the judge's score and the missing work. Child conversations stay linked to their parent. ([Conversations](https://docs.openhands.dev/openhands/usage/agent-canvas/conversations.md), 2026-10-30) | The conversation view has a chat panel where the agent explains its actions, a changes tab, a terminal tab and others. ([Key Features](https://docs.openhands.dev/openhands/usage/key-features.md), 2026-10-30) | Full event log in the saved directory. Optional OpenTelemetry tracing (agent step, tool call, LLM call, conversation run) to Laminar, MLflow, Honeycomb, Jaeger or any OTLP backend, switched on by environment variables. ([Persistence](https://docs.openhands.dev/sdk/guides/convo-persistence.md), [Observability](https://docs.openhands.dev/sdk/guides/observability.md), 2026-10-30) |
| **Cost or usage per item** | Cost per automation run in USD (four decimals) in the Activity Log and its exports; no cost shown when the backend reports none. In a conversation, a context-window meter opens a usage panel with token usage and provider balance. Cost per Issue to PR issue: not documented (checked: Issue to Pull Request, Software Factory). ([Managing automations](https://docs.openhands.dev/openhands/usage/agent-canvas/managing-automations.md), [Conversations](https://docs.openhands.dev/openhands/usage/agent-canvas/conversations.md), 2026-10-30) | A maximum budget per conversation can be set in `Settings > Application`; the conversation stops at the limit and can be continued with a prompt. A per-conversation cost display: not documented (checked: Cloud UI, Application Settings). The `Billing` tab adds credits. ([Application Settings](https://docs.openhands.dev/openhands/usage/settings/application-settings.md), [Cloud UI](https://docs.openhands.dev/openhands/usage/cloud/cloud-ui.md), 2026-10-30) | Token counts, cost and latency per LLM call, summed per LLM (`accumulated_cost`, token usage) and across a conversation; saved with the conversation state. ([Metrics Tracking](https://docs.openhands.dev/sdk/guides/metrics.md), [Persistence](https://docs.openhands.dev/sdk/guides/convo-persistence.md), 2026-10-30) |
| **One local agent, no hosted account** | Yes on the pages read: the default install runs a local backend (`127.0.0.1:8000`) on the person's machine, with their own model key, and conversations, settings and secrets are stored locally. The automation server is part of that local stack, and the first-time-setup page calls the PR review automation runnable "locally". An OpenHands Cloud account is listed as a prerequisite only for the Cloud backend. ([Install Agent Canvas](https://docs.openhands.dev/openhands/usage/agent-canvas/setup.md), [First Time Setup](https://docs.openhands.dev/openhands/usage/agent-canvas/first-time-setup.md), [Architecture](https://docs.openhands.dev/openhands/usage/agent-canvas/architecture.md), [Cloud Backend](https://docs.openhands.dev/openhands/usage/agent-canvas/backend-setup/cloud.md), 2026-10-30) | No: the page starts with logging in through GitHub, GitLab or Bitbucket. ([Getting Started](https://docs.openhands.dev/openhands/usage/cloud/openhands-cloud.md), 2026-10-30) | Yes: a Python library run in the person's own code; tracing and persistence are opt-in. ([Persistence](https://docs.openhands.dev/sdk/guides/convo-persistence.md), [Observability](https://docs.openhands.dev/sdk/guides/observability.md), 2026-10-30) |

## Findings worth carrying into the lesson

- The strongest activity view in their docs is per automation run: status, phase, cost and an exportable log, with the run's
  conversation behind it. Per-item views for a queue of issues are not in the pages read; the Issue to PR page keeps "persistent
  state" of processed issues but does not say it can be viewed. ([Managing automations](https://docs.openhands.dev/openhands/usage/agent-canvas/managing-automations.md), [Issue to Pull Request](https://docs.openhands.dev/openhands/usage/agent-canvas/prebuilt/issue-to-pr.md), 2026-10-30)
- The reason an item waits is thin: the only stated reasons are a skipped run at the concurrency limit and a disabled-automation
  banner. ([Managing automations](https://docs.openhands.dev/openhands/usage/agent-canvas/managing-automations.md), 2026-10-30)
- The link to the PR lives on the GitHub side (issue comment, `Closes #N`, PR title), not in the run log. ([Issue to Pull Request](https://docs.openhands.dev/openhands/usage/agent-canvas/prebuilt/issue-to-pr.md), 2026-10-30)
- Cost is shown per automation run and per conversation (usage panel), and capped by a per-conversation budget in the Cloud settings.
- Everything works on one local machine with a local backend, history stored in `~/.openhands`; cloud features (read-only sharing
  of an automation's conversation inside an organization) need a Cloud backend. ([Managing automations](https://docs.openhands.dev/openhands/usage/agent-canvas/managing-automations.md), [Install Agent Canvas](https://docs.openhands.dev/openhands/usage/agent-canvas/setup.md), 2026-10-30)
- Their two automation pages disagree on how many run statuses exist: the Agent Canvas page lists six, the chat-route
  Managing Automations page lists four (pending, running, completed, failed). ([Managing Automations](https://docs.openhands.dev/openhands/usage/automations/managing-automations.md), 2026-10-30)

## Pages read

All fetched 2026-10-30 (index first: https://docs.openhands.dev/llms.txt). Each read in full as raw Markdown, except where a
note says otherwise.

- https://docs.openhands.dev/openhands/usage/agent-canvas/overview.md
- https://docs.openhands.dev/openhands/usage/agent-canvas/conversations.md
- https://docs.openhands.dev/openhands/usage/agent-canvas/managing-automations.md
- https://docs.openhands.dev/openhands/usage/agent-canvas/backends.md
- https://docs.openhands.dev/openhands/usage/agent-canvas/backend-setup/local.md
- https://docs.openhands.dev/openhands/usage/agent-canvas/backend-setup/cloud.md
- https://docs.openhands.dev/openhands/usage/agent-canvas/architecture.md
- https://docs.openhands.dev/openhands/usage/agent-canvas/setup.md (install steps skimmed for state, data and account terms; the rest is per-OS commands)
- https://docs.openhands.dev/openhands/usage/agent-canvas/first-time-setup.md
- https://docs.openhands.dev/openhands/usage/agent-canvas/prebuilt/issue-to-pr.md
- https://docs.openhands.dev/openhands/usage/agent-canvas/prebuilt/github-repo-monitor.md (setup only; no activity view named)
- https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md
- https://docs.openhands.dev/openhands/usage/use-cases/daily-workflow.md (a chat-based work queue: the agent summarises PRs and issues in one conversation; no product activity view named)
- https://docs.openhands.dev/openhands/usage/automations/overview.md
- https://docs.openhands.dev/openhands/usage/automations/managing-automations.md
- https://docs.openhands.dev/openhands/usage/cloud/cloud-ui.md
- https://docs.openhands.dev/openhands/usage/cloud/openhands-cloud.md
- https://docs.openhands.dev/openhands/usage/cloud/github-installation.md
- https://docs.openhands.dev/openhands/usage/cloud/cloud-api.md (first part only, how to start a conversation; later part not read)
- https://docs.openhands.dev/openhands/usage/key-features.md
- https://docs.openhands.dev/openhands/usage/settings/application-settings.md
- https://docs.openhands.dev/sdk/guides/convo-persistence.md
- https://docs.openhands.dev/sdk/guides/metrics.md
- https://docs.openhands.dev/sdk/guides/observability.md (overview, what is traced and hierarchy; vendor setup sections not needed)
- https://docs.openhands.dev/sdk/guides/convo-custom-visualizer.md

## Ruled out (why)

- **Issue Triage and the ready-for-dev Gate** (`/overview/issue-lifecycle.md`): read; it is about how OpenHands' own repositories
  label contributor issues, not a view of agent activity.
- **Cloud API reference pages** (search conversations, search events, export conversation, git changes and diff, pending
  messages, sandbox list): judged from index titles only, not fetched. They suggest an API for listing conversations and exporting
  one, and a queue for pending messages; this is a gap, not a finding.
- **Agent Canvas release notes (v1.10.0 to v1.31.0)**: not searched; later pages may add activity features. A gap, not a finding.
- **Agent Server API pages (events, conversations), Hooks, Monitoring and Improving Skills, Critic, Goal Completion Loop,
  Pause and Resume, Send Message While Running**: judged from index titles; they concern control or evaluation, not showing
  activity. Critic and goal loops were covered in the 2026-10-23 field grid.
- **Troubleshooting, Agent Profiles, LLM profiles, Docker execution, Kubernetes, Modal, DigitalOcean backends**: setup and
  deployment, not activity views; judged from the index only.
