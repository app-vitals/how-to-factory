# Cursor: activity grid

Scope: how Cursor shows what the agent is doing and has done: current and queued work, status, the reason an item waits, an
activity log, history, the link from an item to its PR, why the agent did something, cost, and whether it works for one local
agent without a hosted account. Left out on purpose: how work is planned, built, verified or reviewed (lessons 1 to 4).
Every filled cell is a paraphrase of a first-party cursor.com page, with its URL and the date I fetched it (**2026-10-30**).
The notes in `landscape/field-grid/cursor.md` and `landscape/routing-grid/cursor.md` (both for the same product) were a
starting list; every page used here was fetched again.

Names are Cursor's own, not canonical. A cell says `not documented` only after naming the pages checked. "Not documented"
means not in their docs, not that the product cannot do it.

Method: fetched the docs index (https://cursor.com/docs/llms.txt, 2026-10-30), listed the pages that could touch agent lists,
status, cloud agents, automations, integrations, usage, the API, hooks and the CLI, and fetched each as a raw-Markdown URL.
Every page under "Pages read" was read in full from the downloaded Markdown unless a note says otherwise, and every
`not documented` cell was checked against the whole of the pages named in it. Honest limit: pages not under "Pages read" were
judged from the index only (see "Ruled out").

## The grid

Surfaces: **Agents Window / web / iOS** (the desktop Agents Window, cursor.com/agents and the iOS app, which share one backend),
**Cloud agents** (the VM-backed runs those surfaces start, plus Automations and Projects that start them), **Slack and Linear**
(where an agent is started from a chat or issue tool), **CLI** (the `agent` command in a terminal), **API** (the Cloud Agents
API and the team dashboard). Where a cell fits several surfaces, the surface is named in the cell.

| Dimension | Agents Window / web / iOS | Slack and Linear | CLI | API and team dashboard |
| --- | --- | --- | --- | --- |
| **List of current and queued work** | Parallel agents are managed from the Agents Window sidebar, with pinning; iOS has an inbox and tracks up to eight agents on the lock screen. A Project's **Listening** pill lists the events it watches. Messages typed to a running agent can be queued, shown in order below the active task and reorderable. A queue of waiting tasks across agents: not documented (checked: Agents Window, Agent overview, Cloud agents, Projects). ([Agents Window](https://cursor.com/docs/agent/agents-window.md), [Multi-agent help](https://cursor.com/help/ai-features/multi-agent.md), [Cursor for iOS](https://cursor.com/docs/cloud-agent/mobile.md), [Projects](https://cursor.com/docs/agent/projects.md), [Agent overview](https://cursor.com/docs/agent/overview.md), 2026-10-30) | In Slack, `@Cursor list my agents` shows running agents. In Linear, the issue shows the agent session. ([Slack](https://cursor.com/docs/integrations/slack.md), [Linear](https://cursor.com/docs/integrations/linear.md), 2026-10-30) | `agent ls` opens previous chats to resume. A list of running work: not documented (checked: CLI overview, Using Agent in CLI). ([CLI overview](https://cursor.com/docs/cli/overview.md), [Using Agent in CLI](https://cursor.com/docs/cli/using.md), 2026-10-30) | The API lists agents for the authenticated user, newest first, with a filter by PR URL. The Cursor Cloud MCP lists runs, filterable by source, status, date, code changes, PR creation and archived state. The team dashboard has a Cloud Agents section. ([Cloud Agents API](https://cursor.com/docs/cloud-agent/api/endpoints.md), [Cloud agent capabilities](https://cursor.com/docs/cloud-agent/capabilities.md), [Dashboard](https://cursor.com/docs/account/teams/dashboard.md), 2026-10-30) |
| **Status per item** | Not documented as a list of status values in the app (checked: Agents Window, Cloud agents, iOS). The iOS app shows the chat stream live and sends a push notification when an agent finishes a turn. ([Cursor for iOS](https://cursor.com/docs/cloud-agent/mobile.md), 2026-10-30) | Slack shows a status under the thread while the agent works (for example "Cursor is reading code..."), then a completion notice. Linear shows real-time status. ([Slack](https://cursor.com/docs/integrations/slack.md), [Linear](https://cursor.com/docs/integrations/linear.md), 2026-10-30) | Not documented as a status view (checked: CLI overview, Using Agent in CLI, Output format). | An agent is `ACTIVE`, `IDLE` or `ARCHIVED`. A run is `CREATING`, `RUNNING` or `WAITING_FOR_BACKGROUND_WORK` while active, then `FINISHED`, `ERROR`, `CANCELLED` or `EXPIRED`. ([Cloud Agents API](https://cursor.com/docs/cloud-agent/api/endpoints.md), 2026-10-30) |
| **Stated reason when waiting, blocked or skipped** | Partly. A subscribed agent ends its turn and waits for a named event (CI result, PR comment, Slack reply, timer), and a single pending check holds back the CI result. The Cloud MCP events include `setup_failed`, `pr_creation_failed` and `mcp_auth_error` ("its tools were skipped, and the run continued"). Cloud agents skip CI auto-fix in four stated cases (a human commit, a follow-up message, the same check failing on base, ten follow-ups already). A general "why is this agent waiting" field: not documented (checked: Cloud agents, Capabilities, Agents Window). ([Cloud agent capabilities](https://cursor.com/docs/cloud-agent/capabilities.md), 2026-10-30) | Not documented (checked: Slack, Linear). | Not documented (checked: CLI overview, Using Agent in CLI). | `409 agent_busy` is returned for a follow-up while a run is active, and a steer is reported as `steered` or `queued`. A pool request that waits for an offline worker has a stated timeout. ([Cloud Agents API](https://cursor.com/docs/cloud-agent/api/endpoints.md), 2026-10-30) |
| **Run or activity log** | The agent page is the run record: conversation, code changes and artifacts (screenshots, videos, log references); iOS shows subagent child transcripts. The run dashboard shows the events above (setup, PR, artifact, MCP auth). Automations: a run log per automation, only a run's page and its events are described; a combined activity log: not documented (checked: Automations, Automations help). ([Cloud agents](https://cursor.com/docs/cloud-agent.md), [Cloud agent capabilities](https://cursor.com/docs/cloud-agent/capabilities.md), [Cursor for iOS](https://cursor.com/docs/cloud-agent/mobile.md), 2026-10-30) | Slack: a thread of status and plan notes, plus a plan posted before code changes for bug fixes. Linear: status updates on the issue. ([Slack](https://cursor.com/docs/integrations/slack.md), [Linear](https://cursor.com/docs/integrations/linear.md), 2026-10-30) | `--output-format stream-json` emits one JSON event per line (system init, user, assistant messages, a final result with `duration_ms`); text deltas are aggregated. ([Output format](https://cursor.com/docs/cli/reference/output-format.md), 2026-10-30) | A run can be streamed as server-sent events (`status`, `tool_call`, `result`), resumable with `Last-Event-ID`; hooks emit `stop` and `subagentStop` events with status and duration; Enterprise teams can send cloud-agent events through OpenTelemetry Export; an Audit Log covers security and admin actions (Enterprise). ([Cloud Agents API](https://cursor.com/docs/cloud-agent/api/endpoints.md), [Hooks](https://cursor.com/docs/hooks.md), [Automations](https://cursor.com/docs/cloud-agent/automations.md), [Dashboard](https://cursor.com/docs/account/teams/dashboard.md), 2026-10-30) |
| **History of finished work, and how long it is kept** | Conversations stay searchable: Cmd+K searches past transcripts through a local index. Cloud conversation history "is kept indefinitely by default"; environment snapshots are deleted after 30 days unused. Custom retention windows are early access for select Enterprise teams. ([Agent overview](https://cursor.com/docs/agent/overview.md), [Conversation search](https://cursor.com/help/ai-features/conversation-search.md), [Cloud agent security](https://cursor.com/docs/cloud-agent/security-network.md), 2026-10-30) | Slack threads and Linear issues keep the status history in those tools; their retention is those tools' own: not documented by Cursor (checked: Slack, Linear). | `agent ls`, `agent resume`, `--continue` and `--resume <id>` reopen earlier chats. How long they are kept: not documented (checked: CLI overview, Using Agent in CLI). ([CLI overview](https://cursor.com/docs/cli/overview.md), 2026-10-30) | An agent can be archived, unarchived or deleted permanently (this removes the transcript and artifacts). A stream's retention window is returned in a header; after it, the stream may return `410`. ([Cloud Agents API](https://cursor.com/docs/cloud-agent/api/endpoints.md), 2026-10-30) |
| **Link from an item to its PR** | The run page, the Cloud MCP events (`pr_created`, `pr_creation_failed`) and the iOS review view tie an agent to its PR; artifacts can be embedded in the PR description when a setting is on. ([Cloud agent capabilities](https://cursor.com/docs/cloud-agent/capabilities.md), [Cursor for iOS](https://cursor.com/docs/cloud-agent/mobile.md), 2026-10-30) | Slack: a completion notice with a view-PR button. Linear: the agent creates PRs when complete. ([Slack](https://cursor.com/docs/integrations/slack.md), [Linear](https://cursor.com/docs/integrations/linear.md), 2026-10-30) | Not documented (checked: CLI overview, Using Agent in CLI, Output format). | A run's `git.branches[]` carries `repoUrl`, `branch` and `prUrl`; agents can be listed by PR URL. Dashboard analytics chart PRs opened and merged by cloud agents. ([Cloud Agents API](https://cursor.com/docs/cloud-agent/api/endpoints.md), [Usage Analytics](https://cursor.com/docs/account/teams/analytics.md), 2026-10-30) |
| **See why the agent did something** | The conversation holds the agent's messages and tool calls; checkpoints let a person restore files at any point in the timeline. Chats can be shared as read-only transcripts (full history with tool calls and results, team or public link, Teams and Enterprise). A teammate can open a shared cloud agent read-only. ([Agent overview](https://cursor.com/docs/agent/overview.md), [Shared transcripts](https://cursor.com/help/ai-features/shared-transcripts.md), [Cloud agents](https://cursor.com/docs/cloud-agent.md), 2026-10-30) | Slack posts a plan before changing code for bug fixes. Linear: not documented beyond status updates (checked: Linear). ([Slack](https://cursor.com/docs/integrations/slack.md), 2026-10-30) | Session ids and `stream-json` events, plus transcript paths given to hooks. ([Output format](https://cursor.com/docs/cli/reference/output-format.md), [Hooks](https://cursor.com/docs/hooks.md), 2026-10-30) | The Cursor Cloud MCP fetches a run's full transcript and diff metadata (admins: any team run; others: their own). Hooks receive `conversation_id`, `generation_id` and `transcript_path`. ([Cloud agent capabilities](https://cursor.com/docs/cloud-agent/capabilities.md), [Hooks](https://cursor.com/docs/hooks.md), 2026-10-30) |
| **Cost or usage per item** | Cloud agents use plan usage at the selected model's rate; a spend limit is requested when first used. Per-agent cost shown in the app: not documented (checked: Cloud agents, Agents Window, iOS, Models & pricing). iOS leaves "admin, billing, and usage" to the web. ([Cloud agents](https://cursor.com/docs/cloud-agent.md), [Cursor for iOS](https://cursor.com/docs/cloud-agent/mobile.md), 2026-10-30) | Not documented (checked: Slack, Linear). | Not documented (checked: Output format, CLI overview). | Token usage per run and per agent (input, output, cache write, cache read, total) from `GET /v1/agents/{id}/usage`. The dashboard has Usage and analytics (agents created, PRs, lines of code), by team, user and repository. A per-agent dollar cost: not documented (checked: Cloud Agents API, Usage Analytics, Dashboard). ([Cloud Agents API](https://cursor.com/docs/cloud-agent/api/endpoints.md), [Usage Analytics](https://cursor.com/docs/account/teams/analytics.md), 2026-10-30) |
| **One local agent, no hosted account** | Not documented as working without an account (checked: Agents Window, Cloud agents, Models & pricing). The pricing page lists a Free plan with limited Agent use; Cloud agents need a paid plan (Premium and above, Teams, Enterprise, or a legacy paid plan) and a connected source-control account. ([Cloud agents](https://cursor.com/docs/cloud-agent.md), [Models & pricing](https://cursor.com/docs/models-and-pricing.md), 2026-10-30) | Needs a Cursor account linked to Slack or Linear. ([Slack](https://cursor.com/docs/integrations/slack.md), [Linear](https://cursor.com/docs/integrations/linear.md), 2026-10-30) | Login uses a Cursor account in the browser, or an API key from the dashboard. Whether it runs with no Cursor account: not documented (checked: Authentication, CLI overview). ([Authentication](https://cursor.com/docs/cli/reference/authentication.md), 2026-10-30) | Needs a Cursor API key. Self-Hosted Machines move tool execution to your own machine but are still run through Cursor's cloud. ([Cloud Agents API](https://cursor.com/docs/cloud-agent/api/endpoints.md), [Self-Hosted Machines](https://cursor.com/docs/cloud-agent/self-hosted.md), 2026-10-30) |

## Findings worth carrying into the lesson

- The richest view of agent activity is per cloud agent: a page with the conversation, changes and artifacts, a lifecycle status
  and run status in the API, and a PR link in `git.branches[].prUrl`. A single queue across waiting tasks is not in the pages
  read. ([Cloud Agents API](https://cursor.com/docs/cloud-agent/api/endpoints.md), [Cloud agents](https://cursor.com/docs/cloud-agent.md), 2026-10-30)
- Waiting is stated as an event the agent subscribed to, not as a status label; the reason strings that exist are narrow (CI
  auto-fix skip rules, setup and PR-creation failures). ([Cloud agent capabilities](https://cursor.com/docs/cloud-agent/capabilities.md), 2026-10-30)
- Cost per item is tokens through the API; money views are team-level usage. ([Cloud Agents API](https://cursor.com/docs/cloud-agent/api/endpoints.md), [Usage Analytics](https://cursor.com/docs/account/teams/analytics.md), 2026-10-30)
- Conversation history is kept indefinitely by default; snapshots expire after 30 days unused. ([Cloud agent security](https://cursor.com/docs/cloud-agent/security-network.md), 2026-10-30)
- Status is also pushed to where the work was requested: Slack thread status and Linear session updates, with the PR link on
  completion. ([Slack](https://cursor.com/docs/integrations/slack.md), [Linear](https://cursor.com/docs/integrations/linear.md), 2026-10-30)
- A person can follow a local CLI run through `stream-json` events and `agent ls`, but no run list or log view is described.
  ([Output format](https://cursor.com/docs/cli/reference/output-format.md), [CLI overview](https://cursor.com/docs/cli/overview.md), 2026-10-30)

## Pages read

All fetched 2026-10-30 (index first: https://cursor.com/docs/llms.txt). Each read in full as raw Markdown, except where a note
says otherwise.

- https://cursor.com/docs/agent/overview.md
- https://cursor.com/docs/agent/agents-window.md
- https://cursor.com/docs/agent/projects.md
- https://cursor.com/docs/cloud-agent.md
- https://cursor.com/docs/cloud-agent/capabilities.md
- https://cursor.com/docs/cloud-agent/automations.md
- https://cursor.com/docs/cloud-agent/settings.md
- https://cursor.com/docs/cloud-agent/mobile.md
- https://cursor.com/docs/cloud-agent/security-network.md (data retention section only)
- https://cursor.com/docs/cloud-agent/metadata.md (headings and keys only)
- https://cursor.com/docs/cloud-agent/self-hosted.md (overview and authentication parts; searched for account terms)
- https://cursor.com/docs/cloud-agent/api/endpoints.md (List, Get, Follow-up, Run, Stream, Usage and lifecycle sections; the environments, secrets, workers and pools sections were not read)
- https://cursor.com/docs/integrations/slack.md (usage, status and managing sections; the settings and pool sections were searched)
- https://cursor.com/docs/integrations/linear.md
- https://cursor.com/docs/integrations/github.md (setup only; no activity view named)
- https://cursor.com/docs/hooks.md (searched for transcript, status and duration fields; not read end to end)
- https://cursor.com/docs/cli/overview.md
- https://cursor.com/docs/cli/using.md
- https://cursor.com/docs/cli/reference/output-format.md (searched for event and usage fields)
- https://cursor.com/docs/cli/reference/authentication.md (opening sections)
- https://cursor.com/docs/account/teams/dashboard.md
- https://cursor.com/docs/account/teams/analytics.md
- https://cursor.com/docs/models-and-pricing.md (plan list and pool sections; searched for per-agent cost)
- https://cursor.com/docs/agent-sdk/guides/opentelemetry.md (opening part; it covers the Agent SDK, not the editor)
- https://cursor.com/help/ai-features/cloud-agents.md
- https://cursor.com/help/ai-features/background-agents.md
- https://cursor.com/help/ai-features/automations.md
- https://cursor.com/help/ai-features/multi-agent.md
- https://cursor.com/help/ai-features/shared-transcripts.md
- https://cursor.com/help/ai-features/conversation-search.md

## Ruled out (why)

- **Agent SDK pages** (TypeScript SDK, Python SDK, `agent-sdk/*` guides and references, sessions, schedules, http-api):
  the TypeScript SDK and the Agent SDK sessions and HTTP API pages were judged from index titles only, not fetched. They are
  likely to describe more run and usage data; this is a gap, not a finding. The OpenTelemetry guide is for the Agent SDK, not
  the editor or cloud agents, so it is not counted as a Cursor activity view.
- **Enterprise OpenTelemetry Export and Compliance and Monitoring pages**: named in the Automations page and Dashboard page,
  not fetched. The Enterprise cells above rest on those two pages' wording only.
- **Admin API and usage-events pages** (`account/teams/admin-api.md`, `analytics-api.md`): linked from the usage endpoint,
  judged from index titles; not fetched.
- **Bugbot, Security Agents, PR Routing & Approval**: covered by the routing-grid for review, not activity views.
- **Release notes and CLI changelog**: not searched; later pages may add activity features. A gap, not a finding.
- **Origin pages** (`origin/*`): code hosting and its CLI, judged from the index only.
- **Setup, Builds, identity, private connectivity and network pages**: environment and security setup, not activity views;
  judged from the index except where listed above.
