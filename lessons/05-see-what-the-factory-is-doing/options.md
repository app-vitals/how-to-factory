# Options: how the field shows what the agent is doing and has done

Names are not canonical. Every claim below is a paraphrase of a first-party page, taken from the lesson 5 activity grid
([`landscape/activity-grid/`](../../landscape/activity-grid/README.md)) and from [`landscape/matrix.json`](../../landscape/matrix.json)
(rendered in [landscape/README.md](../../landscape/README.md)). Each claim carries its source URL and the date that page was
fetched (all 2026-10-30). Re-check before filming. These appear on slides only; the lesson does not run other products live.

Scope is the lesson 5 step only: an agent has work, and a person wants to see what it has queued, what it ran, what it finished and
why. Transcripts, cost, stall detection, alerts, fleet views and hosting are left out on purpose (see [brief.md](brief.md)).

## How the field differs

One table per Tier A capability of the [brief](brief.md), in the brief's own ids (A1 to A6), in the brief's order of stages (Record,
Queue, Log, History). Each table opens with the simplest version, which is the sample's own design, then shows the field. Where a
capability has a matrix dimension, the Mark column is that cell's chip: ✓ yes, ✗ no (only where a cited page states it), ◐ partly or
mixed. Where the grid has no dimension, the Mark is `–`. In each cell the bold text names the surface the claim is about, because most
products have several and they differ. The surface shown is the one where the product puts its list of running work (Devin, Sessions;
Factory, Mission Control; OpenHands, Agent Canvas; Cursor, Agents Window; Copilot, cloud sessions on GitHub; Claude Code, agent view),
unless the cell says **Other surface**. A cell reads "not in their docs" when the pages checked do not say, and lists the pages
checked. That is a statement about those pages, not about what the product can do: several grid files read condensed extractions
of long pages, so a gap can also be a page the extraction left out. The last row of each table is the target for this lesson's
sample. It comes from the [brief](brief.md) and is our own design, not a claim about anyone else.

Five of the six products list sessions or conversations, not work items, and none of them documents a queue of waiting work with the
reason on its main surface. Read that as "not in their docs", never "no product has one". Several of the answers sit on another
surface (an automations feed, an API), and the cells say so.

### A1. One run record per tick

Simplest version: each tick appends one line to a JSONL file: start, end, duration, the item picked, the outcome and any error.

The field's version of this is a log of what ran (matrix dimension "Keeps a run or activity log"). Six of six have one, at six different
grains: per worker, per run, per session. A single record per tick of a polling loop is not a grid dimension, so it is not compared.
The table shows what one record holds; A4 shows how a person reads them.

| Product | Mark | What one record holds |
|---|---|---|
| Devin | ✓ | **Automations Activity tab** (other surface): Lists recent invocations with timestamps, outcome, links to the sessions created and error messages. Per session, a Progress tab logs commands, edits and browser activity. ([source](https://docs.devin.ai/product-guides/automations.md), as of 2026-10-30) |
| Factory (Droid) | ✓ | **Automations Events feed** (other surface): A run entry carries outcome, duration and a link to its session. On Mission Control, a sidebar keeps a live progress log of every worker and milestone. ([source](https://docs.factory.com/automations/custom.md), as of 2026-10-30) |
| GitHub Copilot | ✓ | **Agent tasks API** (other surface): The task detail returns each session with prompt, branch names, model, usage, timestamps and any error. The session log itself shows reasoning and the tools used. ([source](https://docs.github.com/en/rest/agent-tasks/agent-tasks.md), as of 2026-10-30) |
| OpenHands | ✓ | **Activity Log**: One per automation, with run phase, status and cost, exportable as CSV or JSON. ([source](https://docs.openhands.dev/openhands/usage/agent-canvas/managing-automations.md), as of 2026-10-30) |
| Cursor | ✓ | **Agent page**: The run record is the conversation, code changes and artifacts. Other surface (CLI): `stream-json` prints one event per line, ending in a result with a duration. ([source](https://cursor.com/docs/cloud-agent/capabilities.md), as of 2026-10-30) |
| Claude Code | ✓ | **Agent view**: Each row has a one-line summary refreshed from the session; `claude logs` prints recent output; attaching posts a recap. ([source](https://code.claude.com/docs/en/agent-view.md), as of 2026-10-30) |
| This sample | ✓ | Target: one JSONL line per tick with start, end, item picked, outcome and error ([source](brief.md)) |

Not compared: one record per tick of a polling loop. The grid has no dimension for it, so nothing is said about the field.

### A2. A reason on every queue item and every skipped run

Simplest version: every candidate carries a reason string, and a run that did nothing stores why. "No work" is not a reason.

The field's version is a stated reason when an item is waiting, blocked or skipped (matrix dimension "States why an item is waiting").
None of the six is plain on the shown surface: each shown cell has a "not in their docs" statement beside what it does say.

| Product | Mark | Stated reason when waiting or skipped |
|---|---|---|
| Devin | ◐ | **Status detail**: The session status detail names waiting for the user, waiting for approval, inactivity or a named limit. Automation skips are on another surface (Activity tab), with gaps; whether that tab shows a skip reason is not in their docs. ([source](https://docs.devin.ai/api-reference/v3/sessions/get-organizations-session.md), as of 2026-10-30) |
| Factory (Droid) | ◐ | **Mission Control**: A freeze or retry-limit warning to investigate; a stated reason field is not in their docs (pages checked: Running in the Factory App, Factory Missions). **Other surface** (Automations): the Events feed names the cause of each skipped delivery and automatic pause. ([source](https://docs.factory.com/automations/custom.md), as of 2026-10-30) |
| GitHub Copilot | ◐ | **Troubleshooting**: Partly and scattered: a firewall warning on the PR, an Approve and run workflows button, a one-hour timeout. A reason in the session list is not in their docs. ([source](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/troubleshoot-cloud-agent.md), as of 2026-10-30) |
| OpenHands | ◐ | **Agent Canvas**: A SKIPPED run can occur at the concurrency limit (whether the run itself says so is not in their docs). A disabled automation shows a banner with a reason. ([source](https://docs.openhands.dev/openhands/usage/agent-canvas/managing-automations.md), as of 2026-10-30) |
| Cursor | ◐ | **Cloud agent events**: An agent waits on a named event, and setup and PR-creation failures are named. A general reason a given agent is waiting is not in their docs. ([source](https://cursor.com/docs/cloud-agent/capabilities.md), as of 2026-10-30) |
| Claude Code | ◐ | **Agent view**: A Needs input row shows the exact question or a short cause. A reason for skipped is not in their docs (page checked: Agent view). ([source](https://code.claude.com/docs/en/agent-view.md), as of 2026-10-30) |
| This sample | ✓ | Target: every candidate and every skipped run carries a reason string a person can read ([source](brief.md)) |

The reasons are strongest where work is scheduled or unattended (automation skips and pauses, Needs input rows) and thinnest for a
plain waiting session ([source](../../landscape/activity-grid/README.md), grid observations, as of 2026-10-30).
Not compared: a reason stored for a tick that picked nothing. The grid has no dimension for it.

### A3. An Upcoming view in pick order

Simplest version: one page listing what the loop would pick next: type, item, age and the A2 reason.

The field's version is a list of current work (matrix dimension "Shows a list of current work"). Five of six list running work on the
shown surface, as sessions or conversations. A documented queue of waiting work on the shown surface: none of six. Devin's Queued is
on another surface.

| Product | Mark | List of current and queued work |
|---|---|---|
| Devin | ◐ | **Sessions list**: Sessions are listed through the API and the MCP; a web-app list is not in their docs. **Other surface** (Automations): events waiting for a free concurrency slot show as Queued in the Activity tab. ([source](https://docs.devin.ai/product-guides/automations.md), as of 2026-10-30) |
| Factory (Droid) | ◐ | **Mission Control**: A left sidebar lists active and completed workers. A queue of waiting features is not in their docs (pages checked: Running in the Factory App, Running in the CLI, Factory Missions). ([source](https://docs.factory.com/missions/running-app.md), as of 2026-10-30) |
| GitHub Copilot | ◐ | **Agent sessions**: An agents panel, the home page and the repository Agents tab list sessions. A queue of issues waiting for Copilot is not in their docs. ([source](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents.md), as of 2026-10-30) |
| OpenHands | ◐ | **Agent Canvas sidebar**: Lists conversations; the Automate view lists automations. A queue of waiting issues or tasks is not in their docs. ([source](https://docs.openhands.dev/openhands/usage/agent-canvas/conversations.md), as of 2026-10-30) |
| Cursor | ◐ | **Agents Window**: A sidebar lists parallel agents, and messages to a running agent queue in order. A queue of waiting tasks across agents is not in their docs. ([source](https://cursor.com/docs/agent/agents-window.md), as of 2026-10-30) |
| Claude Code | ✓ | **Agent view** (research preview): One row per background session, grouped Pinned, Ready for review, Needs input, Working and Completed; messages sent to a working session join its queue. ([source](https://code.claude.com/docs/en/agent-view.md), as of 2026-10-30) |
| This sample | ✓ | Target: a page in pick order with type, item, age and reason ([source](brief.md)) |

Messages queued for one running agent (Cursor, Claude Code) are a per-agent message queue, not a queue of waiting work.
Not compared: pick order, an age column and a reason column on the list. The grid has no dimension for them.

### A4. A Past view of runs, filterable by outcome

Simplest version: one page of past runs, newest first, with an outcome filter in the query string and the reason in a detail column.

Uses the same matrix dimension and chips as A1 (a log of what ran). Here the table shows how a person reads and narrows the log. A filter
by outcome is not a grid dimension, so the cells record only what the pages name.

| Product | Mark | Where a person reads past runs, and how it narrows |
|---|---|---|
| Devin | ✓ | **Automations Activity tab** (other surface): Recent invocations with outcome and errors. The sessions API and MCP filter by tags, playbook, origin, user, automation and time; outcome is not among the filters listed. ([source](https://docs.devin.ai/product-guides/automations.md), as of 2026-10-30) |
| Factory (Droid) | ✓ | **Automations Events feed** (other surface): Newest first, in UTC, filterable to Runs (outcome, duration, session link), Alerts (failed starts, automatic pauses, missed runs) and Deliveries. ([source](https://docs.factory.com/automations/custom.md), as of 2026-10-30) |
| GitHub Copilot | ✓ | **Session log**: Streamed live per session. A separate log of runs with an outcome per run, for automations, is not in their docs (page checked: Copilot automations). **Other surface** (Agent tasks API): tasks list filtered by state. ([source](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations.md), as of 2026-10-30) |
| OpenHands | ✓ | **Activity Log**: Per automation, with phase, status and cost, exported as CSV or JSON. The filters named are on the conversation list (automation-run conversations, tags, pinned, archived), not by outcome. ([source](https://docs.openhands.dev/openhands/usage/agent-canvas/managing-automations.md), as of 2026-10-30) |
| Cursor | ✓ | **Agent page**: The run record per agent. A combined automations log is not in their docs (pages checked: Automations, Automations help). **Other surface** (Cloud MCP): lists runs filterable by source, status and date. ([source](https://cursor.com/docs/cloud-agent/capabilities.md), as of 2026-10-30) |
| Claude Code | ✓ | **Agent view**: Rows filter by agent, state, name, directory or PR; `claude logs` prints recent output. ([source](https://code.claude.com/docs/en/agent-view.md), as of 2026-10-30) |
| This sample | ✓ | Target: runs newest first, outcome filter in the query string, reason in a detail column ([source](brief.md)) |

Not compared: an outcome filter as such, and the reason in a detail column. The grid has no dimension for them.

### A5. A Completed view that survives restarts

Simplest version: one page of finished tasks and PRs with when each started, when its PR opened and when it merged, read from the task
file so a restart does not empty it.

The field's version is a history of finished work and how long it is kept (matrix dimension "Keeps history of finished work"). Finished
work stays listable in all six; a retention period is stated by three of six on the shown surface (Cursor, Claude Code, and Copilot,
where two pages differ).

| Product | Mark | History of finished work, and how long |
|---|---|---|
| Devin | ◐ | **Archive**: Finished sessions stay listable and can be archived. How long sessions, logs or Activity entries are kept is not in their docs. ([source](https://docs.devin.ai/integrations/slack.md), as of 2026-10-30) |
| Factory (Droid) | ◐ | **Mission Control tab**: Past missions are found there. How long they are kept is not in their docs; retention is stated only elsewhere (30 days for webhook deliveries, 7 days for Slack code channels). ([source](https://docs.factory.com/missions/running-app.md), as of 2026-10-30) |
| GitHub Copilot | ◐ | **Archived sessions**: An Actions session's log stays on GitHub.com; sessions can be archived but not deleted. How long chat data is kept is stated differently on two pages. ([source](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data.md), as of 2026-10-30) |
| OpenHands | ◐ | **Conversation archive**: Conversations stay in the list; archiving hides without deleting, and history is stored locally until removed. A retention period is not in their docs. ([source](https://docs.openhands.dev/openhands/usage/agent-canvas/conversations.md), as of 2026-10-30) |
| Cursor | ✓ | **Cloud history**: Kept indefinitely by default; environment snapshots are deleted after 30 days unused. ([source](https://cursor.com/docs/cloud-agent/security-network.md), as of 2026-10-30) |
| Claude Code | ✓ | **Completed rows**: Stay until deleted; idle processes stop after about an hour with the conversation kept on disk. **Other surface** (CLI): transcripts are cleaned after 30 days by default. ([source](https://code.claude.com/docs/en/agent-view.md), as of 2026-10-30) |
| This sample | ✓ | Target: a Completed page read from the task file, still listed after a restart ([source](brief.md)) |

Not compared: whether a view is rebuilt from a task record or from the process's own state. The pages read do not say.

### A6. Link every item to its PR and task

Simplest version: every row's id is a link. A task links to its record, a PR to GitHub, and a run row to its item. One helper turns a
task id or `org/repo#n` into a URL for all three pages.

The field's version is a link from an item to its PR (matrix dimension "Links an item to its PR"). Five of six link on the shown surface;
Factory only through the Sessions API. In Claude Code the link is drawn from what the session did, not stored. A link from a run row to
its item is not a grid dimension.

| Product | Mark | Link from an item to its PR |
|---|---|---|
| Devin | ✓ | **Session pull requests**: The session record lists its pull requests; Linear and Slack show them too. ([source](https://docs.devin.ai/api-reference/v3/sessions/get-organizations-session.md), as of 2026-10-30) |
| Factory (Droid) | ◐ | **Session artifacts**: A PR link on a Mission Control feature or mission is not in their docs. **Other surface** (Sessions API): artifacts list the pull requests a session touched. ([source](https://docs.factory.com/api-reference/sessions.md), as of 2026-10-30) |
| GitHub Copilot | ✓ | **Copilot started work**: An event on the PR links to the session, and each Copilot commit message links to the session logs. ([source](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents.md), as of 2026-10-30) |
| OpenHands | ◐ | **Issue to Pull Request**: Posts the PR link on the issue. A link from an Activity Log run row to a PR is not in their docs. ([source](https://docs.openhands.dev/openhands/usage/agent-canvas/prebuilt/issue-to-pr.md), as of 2026-10-30) |
| Cursor | ✓ | **Run page**: The run page and the iOS review view tie an agent to its PR. **Other surface** (API): a run's git branches carry a PR URL. ([source](https://cursor.com/docs/cloud-agent/capabilities.md), as of 2026-10-30) |
| Claude Code | ✓ | **Agent view**: A `#N` link on the row is coloured by check and review state; detection relies on `gh` seeing the PR. ([source](https://code.claude.com/docs/en/agent-view.md), as of 2026-10-30) |
| This sample | ✓ | Target: every task id and `org/repo#n` is a link, and a run row links to its item ([source](brief.md)) |

Not compared: a run row linking to the item it worked on, and a task linking to its own record. The grid has no dimension for either.

## Not compared here

Parts of the Tier A steps have no column in the grid, so nothing is said about the field for them: one record per tick of a polling loop
(A1), a reason stored for a tick that picked nothing (A2), pick order, age and a reason column on a list (A3), an outcome filter and a
reason in a detail column (A4), and a run row linking to its item (A6). How a product decides which item is next is not covered either:
the grid asks what is shown, not how the choice is made. Every cell comes from docs pages; no product was opened, so layout, defaults
and what a person sees first are untested. Release notes and changelogs were not searched for any of the six. Where the grid is silent,
the lesson says so rather than guessing.

## What other factories call it

Each product's own term for the view of its work, from the matrix cell for "Shows a list of current work". `Upcoming`, `Past`,
`Completed` and the run record are only this sample's names.

| Product | What it calls the view |
|---|---|
| Devin | Sessions list ([source](https://docs.devin.ai/product-guides/automations.md), as of 2026-10-30) |
| Factory | Mission Control ([source](https://docs.factory.com/missions/running-app.md), as of 2026-10-30) |
| GitHub Copilot | Agent sessions ([source](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents.md), as of 2026-10-30) |
| OpenHands | Agent Canvas sidebar ([source](https://docs.openhands.dev/openhands/usage/agent-canvas/conversations.md), as of 2026-10-30) |
| Cursor | Agents Window ([source](https://cursor.com/docs/agent/agents-window.md), as of 2026-10-30) |
| Claude Code | Agent view ([source](https://code.claude.com/docs/en/agent-view.md), as of 2026-10-30) |

## Where it goes from here

Destinations only, not a recommendation. These are the Tier B items of the brief; each is named, not built, and the lesson that owns
it is named in the brief. Where the grid or matrix says something about the field, it is stated once; otherwise nothing is claimed.

- **Transcripts and an investigation skill.** Transcript reading, a session link per run and the skill that reads them belong to a
  later operations lesson. In the field, the transcript or session log is the answer to "why did it do that" in all six; a recorded
  reason per decision is rare. Example: OpenHands exports a conversation transcript as Markdown or HTML
  ([source](https://docs.openhands.dev/openhands/usage/agent-canvas/conversations.md), as of 2026-10-30).
- **Cost.** Token and cost spend per run and per task belong to a later operations lesson. Per item it is documented on the shown
  surface by three of six (Devin per session, OpenHands per automation run, Copilot as tokens and length); the grain is uneven
  ([source](../../landscape/activity-grid/README.md), as of 2026-10-30).
- **Stall detection and alerts.** A last-heartbeat fallback for runs that never finished, and a notice when the loop is stuck or
  failing, belong to later operations lessons. Nothing is claimed about the field beyond one example: a Devin automation can email
  on every run, on failure only or on success only ([source](https://docs.devin.ai/product-guides/automations.md), as of 2026-10-30).
- **Event log, queue snapshots and verification rows.** An append-only event log per task and PR, snapshot history of the queue and
  verification results as rows belong to a later operations lesson. Nothing is claimed about the field.
- **Throughput and cycle-time dashboards.** The feedback and maintenance lesson. In the field, Factory has a throughput view of
  cycle time by project, pod and user, which is a trend view and not a list of items in flight
  ([source](https://docs.factory.com/agent-effectiveness/dashboard.md), as of 2026-10-30).
- **Fleet views, named agents, claims and stale-claim recovery.** The multi-agent coordination deep dive. Nothing is claimed about
  the field.
- **UI auth and hosting.** The governance lesson; the sample's server binds to the local machine. In the field, working as one local
  agent with no hosted account is plain for two of six on the pages read (OpenHands, Claude Code). OpenHands' default install runs a
  local backend ([source](https://docs.openhands.dev/openhands/usage/agent-canvas/setup.md), as of 2026-10-30), and Claude Code's agent
  view runs on the machine with the same stored credentials as interactive sessions
  ([source](https://code.claude.com/docs/en/agent-view.md), as of 2026-10-30).
- **Attempt caps, skip counters, auto-block and redispatch cooldown.** A later loop lesson. Lesson 4's round cap already ships; this
  lesson only shows it. Nothing is claimed about the field here.
