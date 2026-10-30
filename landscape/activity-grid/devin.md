# Devin: lesson 5 activity grid (queue, status, log, history)

Scope: lesson 5 only, how Devin shows what the agent is doing and has done. Every filled cell is a paraphrase of a
first-party docs.devin.ai page, with its URL and the date I fetched it (**2026-10-30**). `landscape/field-grid/devin.md`
and `landscape/routing-grid/devin.md` were a starting list (they cover Automations queueing, Linear and GitHub
entry points, and PR routing); every page used here was fetched again. Names are Devin's own, not canonical.

Method: fetched the docs index (https://docs.devin.ai/llms.txt, 2026-10-30), listed the pages that could touch session
lists, status, activity or run logs, history, session-to-PR links, transcripts, usage and the local CLI, and fetched each
as a raw-Markdown URL (see "Pages read"). A cell says `not documented` only after naming the pages checked.

Surfaces: **Sessions** (the cloud app and its Progress tab), **Automations** (the Activity tab), **Session API and Devin MCP**
(programmatic listing), **Session Insights**, **Linear and Slack** (status shown where the work was requested),
**Devin CLI** (local agent).

## The grid

| Dimension | What the docs say | Source | As of |
| --- | --- | --- | --- |
| List of current and queued work items | Two kinds of list are documented. (1) Sessions: the API lists an organization's sessions, and the MCP can search them by tags, playbook, origin, schedule, user, or created or updated time. A web-app sessions list page: not documented (checked: Your First Session, Session Tools, Advanced Capabilities, Session Insights, Slack). (2) Automations: events that arrive while the per-automation concurrency limit is full wait in a queue, and an automation's Activity shows them as **Queued**. | https://docs.devin.ai/api-reference/v3/sessions/organizations-sessions.md ; https://docs.devin.ai/work-with-devin/devin-mcp.md ; https://docs.devin.ai/product-guides/automations.md | 2026-10-30 |
| Status per item | A session record carries a status (new, claimed, running, exit, error, suspended, resuming) plus a finer detail (working, waiting for user, waiting for approval, finished, inactivity, user request, error, and several usage or quota limit reasons). Slack code channels show a status chip: working, blocked or done. Linear shows Devin's plan (todo list) and an activity feed on the ticket. Ask Devin shows the status of a session it started inside the conversation. | https://docs.devin.ai/api-reference/v3/sessions/get-organizations-session.md ; https://docs.devin.ai/integrations/slack.md ; https://docs.devin.ai/integrations/linear.md ; https://docs.devin.ai/get-started/first-run.md | 2026-10-30 |
| Stated reason when waiting, blocked or skipped | Partly. For sessions, the status detail names why a session is not working: waiting for the user, waiting for approval, inactivity, or a named limit (org usage, user usage, out of credits or quota, total session limit, contract expired). For automations, the Activity tab shows whether each invocation succeeded or was skipped and error text for failures; a Preflight script may return a free-text `reason` when it skips an event. Whether that reason string appears in the Activity tab: not documented (checked: Automations). Events dropped because the queue was full: what a person sees for them is not documented (checked: Automations). | https://docs.devin.ai/api-reference/v3/sessions/get-organizations-session.md ; https://docs.devin.ai/product-guides/automations.md | 2026-10-30 |
| Run or activity log | Per session, a Progress tab logs shell commands, code edits and browser activity in one view, with a command history that lets you jump to a point in the session. Per automation, an Activity tab lists recent invocations with timestamps, outcome, links to the sessions created and error messages, plus a 30-day sparkline on the list page. Dynamic workflows show each phase and agent with live status in a workflow panel. The Devin MCP can list a session's events, fetch their detail and search them. | https://docs.devin.ai/work-with-devin/devin-session-tools.md ; https://docs.devin.ai/product-guides/automations.md ; https://docs.devin.ai/work-with-devin/dynamic-workflows.md ; https://docs.devin.ai/work-with-devin/devin-mcp.md | 2026-10-30 |
| History of finished work and how long it is kept | Finished sessions stay listable and can be archived (web app, Slack `archive`, CLI `/archive`, API); an archived session is not given PR comments until unarchived, and an `@Devin` mention in an archived Slack thread unarchives it. Session records carry `is_archived`, created and updated times. How long sessions, logs or Activity entries are kept: not documented (checked: Session Insights, Usage, Automations, Session Tools, Slack, Enterprise billing, the sessions API pages and the docs index for retention pages). | https://docs.devin.ai/integrations/slack.md ; https://docs.devin.ai/integrations/gh.md ; https://docs.devin.ai/api-reference/v3/sessions/get-organizations-session.md ; https://docs.devin.ai/cli/cloud.md | 2026-10-30 |
| Link from an item to its PR | Yes, in several places. The session record has a list of pull requests. In Linear the PR URL and the session link are added to the agent session. In Slack code channels, chips and tabs show the PRs a session opens. When a person comments `/devin` on a PR, Devin replies on the PR with a link to the session. Automation Activity links to the sessions it created (the page does not say the PR is shown there). | https://docs.devin.ai/api-reference/v3/sessions/get-organizations-session.md ; https://docs.devin.ai/integrations/linear.md ; https://docs.devin.ai/integrations/slack.md ; https://docs.devin.ai/integrations/gh.md | 2026-10-30 |
| See why the agent did something (transcript, step log) | The Progress tab and command history show what was run and edited and let you jump to a moment. Side chats let you ask a read-only question about a session's reasoning without interrupting it. Session Insights, after a session, generates a timeline of key events with issues rated high, medium or low, an improved prompt and knowledge-usage notes; an "Investigate with Devin" button opens a session to dig deeper. The API lists a session's messages and the MCP lists its events. A raw reasoning transcript export: not documented (checked: Session Tools, Session Insights, sessions API pages, Devin MCP). | https://docs.devin.ai/work-with-devin/devin-session-tools.md ; https://docs.devin.ai/product-guides/session-insights.md ; https://docs.devin.ai/work-with-devin/devin-mcp.md | 2026-10-30 |
| Cost or usage per item | Yes. Per session, usage in ACUs is shown in Session Insights (any user) and the session record has `acus_consumed`; on Teams plans it also has `on_demand_usage` in USD. Per account, self-serve plans have a Usage & limits page; enterprise has Consumption and Consumption Analytics pages (by organization, then by user). Automations can set an ACU limit per session and an invocation limit per time window. Cost per automation run, or per ticket: not documented (checked: Automations, Usage, Enterprise billing). | https://docs.devin.ai/product-guides/session-insights.md ; https://docs.devin.ai/admin/billing/usage.md ; https://docs.devin.ai/admin/billing/enterprise.md ; https://docs.devin.ai/product-guides/automations.md | 2026-10-30 |
| Works for one local agent without a hosted account | Partly documented. The CLI keeps conversation history locally and can resume it (`devin -c`, `devin -r`). Cloud sessions from the CLI need a Devin account. The sessions, Activity tab, Insights, Linear and Slack surfaces above are described as parts of the hosted app. A queue, status or activity view for local CLI sessions: not documented (checked: Quickstart, Essential Commands, Devin Cloud in the CLI, Devin CLI). | https://docs.devin.ai/cli/essential-commands.md ; https://docs.devin.ai/cli/cloud.md ; https://docs.devin.ai/cli/index.md | 2026-10-30 |

## Extra dimensions the pages surfaced

| Dimension | What the docs say | Source | As of |
| --- | --- | --- | --- |
| Filter or search the list | The sessions API and MCP filter by tags, playbook, origin (webapp, slack, linear, jira, automation, cli and others), user, automation and time. Tags can be set when a session is created by an automation. | https://docs.devin.ai/api-reference/v3/sessions/get-organizations-session.md ; https://docs.devin.ai/work-with-devin/devin-mcp.md ; https://docs.devin.ai/product-guides/automations.md | 2026-10-30 |
| Parent and child items | A coordinator session can start managed child sessions, is notified when one finishes or needs input, and can watch their ACU use; the session record has a parent and child ids. | https://docs.devin.ai/work-with-devin/advanced-capabilities.md ; https://docs.devin.ai/api-reference/v3/sessions/get-organizations-session.md | 2026-10-30 |
| Notifications | An automation can email on every run, on failure only or on success only. Slack and Linear carry status where the work was requested. | https://docs.devin.ai/product-guides/automations.md ; https://docs.devin.ai/integrations/slack.md | 2026-10-30 |
| Wait for many items to settle | The MCP can wait on several sessions until each is finished, errored, sleeping or waiting. | https://docs.devin.ai/work-with-devin/devin-mcp.md | 2026-10-30 |

## Findings worth carrying into the lesson

- Status and reason live on the session record as two fields: a coarse state and a detail that names why it is not working. That is close to the lesson's "waiting because" idea.
- The only queue the docs describe is for automation events. Which item starts next is described as set by the trigger or a Preflight script, and the Activity tab is the nearest thing to a loop log in their docs.
- Cost per item is well covered; retention of history and a local-only view are not in their docs (pages named in the grid).

## Pages read

Read in full (raw Markdown, 2026-10-30):

- https://docs.devin.ai/llms.txt
- https://docs.devin.ai/get-started/first-run.md
- https://docs.devin.ai/work-with-devin/devin-session-tools.md
- https://docs.devin.ai/work-with-devin/advanced-capabilities.md
- https://docs.devin.ai/work-with-devin/dynamic-workflows.md
- https://docs.devin.ai/work-with-devin/devin-mcp.md
- https://docs.devin.ai/product-guides/session-insights.md
- https://docs.devin.ai/product-guides/automations.md
- https://docs.devin.ai/admin/billing/usage.md
- https://docs.devin.ai/admin/billing/enterprise.md
- https://docs.devin.ai/integrations/linear.md
- https://docs.devin.ai/cli/cloud.md

Read in part (sections on sessions, status, PR links, archive and history; the rest skimmed by search, not read line by line):

- https://docs.devin.ai/integrations/gh.md
- https://docs.devin.ai/integrations/slack.md
- https://docs.devin.ai/cli/essential-commands.md
- https://docs.devin.ai/cli/index.md
- https://docs.devin.ai/api-reference/v3/sessions/get-organizations-session.md (response schema)
- https://docs.devin.ai/api-reference/v3/sessions/organizations-sessions.md (permissions and filters)

## Ruled out (why)

- **Devin Review, Stacked PRs, Testing & Recordings**: PR review and checks (lessons 3 and 4), not activity of the agent. Not fetched this pass.
- **Devin Coach, Usage policies, Personal Analytics, Org ACU limits**: enterprise usage governance; judged from index titles, not fetched. Cost per item is covered from the Usage and Enterprise billing pages.
- **Oncall, Auto-triage, Code Scans, Security 2.0**: separate products with their own views; judged from index titles, not fetched.
- **Enterprise environment rollout health**: monitors blueprint builds, not agent work; not fetched.
- **Other API reference pages (messages, attachments, insights list, schedules)**: only the session record and list pages were read; the message and event shapes were not read, so the transcript row rests on the MCP and API page summaries.
- **Release notes and CLI changelog**: not searched; newer activity features might be listed there. A gap, not a finding.
- **Air-gapped on-disk formats (audit-log schema)**: a separate federal offering; not fetched, so any local log file format there is unchecked.
- **Web-app screens**: nothing was opened in the product; every cell comes from docs pages only.
