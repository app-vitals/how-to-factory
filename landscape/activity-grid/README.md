# Activity grid: what the agent is doing and has done (lesson 5)

**As of 2026-10-30** (every product file was fetched that day). Every product cell below is a short pointer to the matching cell in
that product's own file, which holds the full wording, the first-party URLs, the pages read and the pages ruled out. This README
adds no claim that the per-product files do not source; the cross-check and observations are counts and comparisons computed from
those files. Nothing here describes our own sample factory: that comparison belongs to the lesson 5 inventory and the ranking built
on it.

Scope is the lesson 5 step only: an agent has work, and a person wants to see the queue, each item's status, why an item waits, a
log of what ran, the history, the link to the PR, why the agent did something, what it cost, and whether any of it works for one
local agent with no hosted account. How work is planned, built, verified or reviewed (lessons 1 to 4) is left out on purpose.

## The grid

Each product row shows the one surface where the product itself puts its list of running work, because the list is the first thing
a person opens. Every product has other surfaces, each its own column in its file, and they differ; the counts further down cover
all of them. Where the shown surface has no cell for a dimension and another surface of the same product does, the cell says
**Other surface** and names it. Names are each product's own, not canonical.

Surfaces shown: Devin, Sessions; Factory, Mission Control; OpenHands, Agent Canvas; Cursor, Agents Window / web / iOS; Copilot,
cloud sessions on GitHub; Claude Code, agent view (a research preview).

**Seeing the work: queue, status, reason**

| Product (surface shown) | List of current and queued work | Status per item | Stated reason when waiting, blocked or skipped |
| --- | --- | --- | --- |
| [Devin](devin.md) (Sessions) | Sessions are listed through the API and the MCP; a web-app sessions list: not documented. **Other surface** (Automations): events that wait for a free slot show as Queued | A status plus a finer detail on each session record (running, exit, error, suspended and others; working, waiting for user and others) | Partly: the detail names waiting for the user, waiting for approval, inactivity or a named limit. Automation skips are covered on **another surface**, with gaps; whether the Automations Activity tab shows a skip reason: not documented |
| [Factory](factory.md) (Mission Control) | A sidebar lists active and completed workers; a queue of waiting features: not documented | Not documented as a status vocabulary. **Other surface**: Automations have run states (Creating to Failed); Sessions have `idle`, `pending`, `running` in the API | Not documented here (a freeze or retry warning to investigate). **Other surface**: the Automations Events feed names the cause of each skipped delivery and automatic pause |
| [OpenHands](openhands.md) (Agent Canvas) | A sidebar lists conversations; the Automate view lists automations; a queue of waiting work: not documented | Automation runs are `PENDING`, `RUNNING`, `COMPLETED`, `FAILED`, `CANCELLED` or `SKIPPED`; goal runs have their own four | Partly: a `SKIPPED` run "can occur" at the concurrency limit (whether the run says so: not documented); a disabled automation shows a reason banner |
| [Cursor](cursor.md) (Agents Window) | A sidebar lists parallel agents; messages to a running agent queue in order; a queue of waiting tasks across agents: not documented | Not documented as status values in the app. **Other surface** (API): agent `ACTIVE`, `IDLE`, `ARCHIVED`; runs `CREATING` to `FINISHED`, `ERROR`, `CANCELLED`, `EXPIRED` | Partly: an agent waits on a named event; setup and PR-creation failures are named; a general "why is it waiting" field: not documented |
| [Copilot](copilot.md) (cloud sessions) | An agents panel, the home page and the repository Agents tab list sessions; a queue of issues waiting for Copilot: not documented | Session list status names: not documented. **Other surface** (Agent tasks API): `queued`, `in_progress`, `completed`, `failed` and four more | Partly and scattered: a firewall warning on the PR, an "Approve and run workflows" button, a one-hour timeout; a reason in the session list: not documented |
| [Claude Code](claude-code.md) (agent view) | One row per background session, grouped Pinned, Ready for review, Needs input, Working, Completed; messages to a working session queue | Working, Needs input, Idle, Completed, Failed, Stopped | A Needs input row shows the exact question or a short cause; a reason for "skipped": not documented |

**Log, history, PR link**

| Product (surface shown) | Run or activity log | History of finished work, and how long it is kept | Link from an item to its PR |
| --- | --- | --- | --- |
| [Devin](devin.md) | A Progress tab logs commands, edits and browser activity per session. **Other surface** (Automations): an Activity tab lists invocations | Finished sessions stay listable and can be archived; retention: not documented | The session record lists its PRs; Linear and Slack show them too |
| [Factory](factory.md) | A right sidebar keeps a live progress log of every worker | Past missions are found on the Mission Control tab; retention: not documented. Stated retention exists only elsewhere (30 days for webhook deliveries, 7 days for Slack code channels) | Not documented on a feature or mission. **Other surface** (Sessions API): "artifacts" list the PRs a session touched |
| [OpenHands](openhands.md) | Per automation, an Activity Log (phase, status, cost) exportable as CSV or JSON; a live chip shows the current action | Conversations stay in the list; archiving hides without deleting; stored locally until removed; a retention period: not documented | Issue to PR posts the PR link on the issue; a link from a run row to a PR: not documented |
| [Cursor](cursor.md) | The agent page is the run record (conversation, changes, artifacts); a combined automations log: not documented | Cloud history "kept indefinitely by default"; environment snapshots deleted after 30 days unused | The run page and the iOS review view tie an agent to its PR. **Other surface** (API): `git.branches[].prUrl` |
| [Copilot](copilot.md) | A session log with reasoning and tools used, streamed live | An Actions session's log stays on GitHub.com; sessions can be archived, not deleted; how long chat data is kept: two pages differ | A "Copilot started work" event on the PR links to the session; each commit message links to the log |
| [Claude Code](claude-code.md) | A one-line summary per row refreshes from the session; `claude logs` prints recent output; attaching posts a recap | Completed rows stay until deleted; idle processes stop after about an hour. **Other surface** (CLI): transcripts are cleaned after 30 days by default | A `#N` link on the row coloured by check and review state; it depends on `gh` seeing the PR |

**Why, cost, local use**

| Product (surface shown) | See why the agent did something | Cost or usage per item | One local agent, no hosted account |
| --- | --- | --- | --- |
| [Devin](devin.md) | Progress tab and command history; Session Insights builds a timeline after the session; a raw reasoning transcript export: not documented | Usage in ACUs per session; cost per automation run: not documented | Partly: the CLI keeps history locally; a queue or status view for local CLI sessions: not documented |
| [Factory](factory.md) | Open a worker to see its terminal output, thought process and sub-tasks | Mission-level time and credits; per feature or worker: not documented. **Other surface** (Sessions API): credits per session | The CLI runs Mission Control; the dashboard needs sign-in; running with no Factory account: not documented |
| [OpenHands](openhands.md) | Each conversation keeps messages, tool calls and file changes; `Export transcript` as Markdown or HTML | Cost per automation run in USD in the Activity Log; a usage panel in a conversation | Yes on the pages read: the default install is a local backend |
| [Cursor](cursor.md) | The conversation holds messages and tool calls; checkpoints restore files; chats can be shared as read-only transcripts | Per-agent cost in the app: not documented. **Other surface** (API): token usage per agent | Not documented as working without an account; cloud agents need a paid plan |
| [Copilot](copilot.md) | The session log; the commit-message link is the audit trail; a rationale per decision outside issue triage: not documented | The session overview shows token usage and length; a per-session credit figure in the list: not documented | Not on the pages read for cloud sessions. **Other surface** (Copilot CLI): partly, with a GitHub login |
| [Claude Code](claude-code.md) | Attach to open the full conversation; no step log beyond the transcript | Nothing per row. **Other surface** (CLI): `/usage` shows estimated session cost | Yes on the page read: runs on the machine with the same stored credentials |

## CROSS-CHECK

Method: the six per-product files in `landscape/activity-grid/` were read cell by cell, and each grid cell above was compared with its
source cell. All six files carry the same nine dimension rows, worded slightly differently. The column layouts differ: `devin.md`
is one column (plus four extra rows that this grid leaves out), the other five are one column per surface. Every "Other surface" mark
was traced to the cell in the named column. Three mechanical checks were run over every file: each URL cited in a grid cell appears
under that file's "Pages read" (all 113 do), every fetch date in a grid cell is 2026-10-30 (all are), and the nine dimension names
match across the five files that have named rows. Cells are counted as **plain** (no "not documented" statement), **partial** (a
"not documented" statement beside other text, a ceiling on how much is documented) or **wholly not documented** (only that statement
and its `(checked: ...)` list). The counts come from a throwaway parser over the files as of this commit, not from a tool in the
repo, so treat them as approximate to a cell or two at the margins.

### 1. Counts by product

| Product | Surfaces | Cells in the file | Plain | Partial | Wholly not documented | Not applicable |
| --- | --- | --- | --- | --- | --- | --- |
| Devin | 1 | 9 | 3 | 6 | 0 | 0 |
| Factory | 5 | 45 | 24 | 17 | 2 | 2 |
| OpenHands | 3 | 27 | 11 | 13 | 3 | 0 |
| Cursor | 4 | 36 | 18 | 12 | 6 | 0 |
| Copilot | 4 | 36 | 17 | 17 | 2 | 0 |
| Claude Code | 5 | 45 | 37 | 8 | 0 | 0 |
| **All (22)** | **22** | **198** | **110** | **73** | **13** | **2** |

The counts are **not comparable across products**. Devin's file has one column, so its nine cells blend several surfaces and are
partly "not documented" by construction of that merge. Claude Code's file has the fewest blanks, partly because its cells name a surface that has an answer. Cells that open with "Not on the pages read" or "No" (Copilot's cloud sessions, automations and API local-use cells; Claude Code's cloud local-use cell) are counted plain; they are negatives.
Read Factory's and Cursor's gaps as statements about thin docs on activity views, not as weaker products.

### 2. Does the grid above match the per-product files?

Every cell in the three tables above was read against the source cell it points to. Findings:

- **Cursor's file lists five surfaces and draws four columns.** The intro names "Cloud agents" as its own surface, but the table
  folds them into the Agents Window and API columns. The grid shows the first column and the API column through **Other surface**
  marks, so no cell changed. Flagged for the next edit of `cursor.md`.
- **Two product files record a disagreement between their own sources, and the grid keeps the disagreement.** OpenHands: the Agent
  Canvas page lists six run statuses, the chat-route Managing Automations page lists four; the grid shows the Agent Canvas six
  because that is the surface shown. Copilot: one page says an Actions session's log remains available, another gives 28 days for
  its chat data; the grid says "two pages differ" and picks neither. Neither is resolved by the pages.
- **A third disagreement is not about activity.** Claude Code's file notes that two pages disagree on whether a project thread reads
  `.claude/settings.json`. It has no cell here and is left out.
- **Status words are not one scale.** Devin has seven session statuses plus a detail field; Claude Code has six row states, a second
  set in JSON (`working`, `blocked`, `done`, `failed`, `stopped`) and a third at process level; Copilot's eight states exist only in
  the API; Cursor's are API-only too. The grid copies each product's own words and does not map them.
- **Several "Other surface" cells are the product's best answer, not a side note.** Factory's reasons (Automations), PR links
  (Sessions API) and per-session cost (Sessions API); Cursor's status, PR link and token cost (API); Copilot's status list (API).
  A reader who only opens the shown surface will not see them.
- **Source-quality caveats differ.** Claude Code's grid was assembled from helper-reader summaries and spot-checked by the author;
  Factory and Copilot read long pages by section and keyword search, and say so; Devin read six pages in part. Their "not
  documented" cells are weaker than OpenHands' and Cursor's, which read each named page in full.
- **No cell was changed.** After the checks above, no cell says more than its source, and no file contradicts another on a shared
  fact (retention numbers, caps and limits each appear once, in the file that sources them).

### 3. Blanks against the docs index

Playbook rule: flag any blank for a product whose index lists a relevant page. Each file's "Ruled out (why)" list was read against
its blanks. Findings:

- **Devin: release notes and CLI changelog not searched**, and web-app screens were not opened, so a sessions list page and a local
  CLI view are unchecked. Flagged for re-check before the lesson says a Devin capability is absent.
- **Factory: Telemetry Data Reference and Analytics API pages not fetched**; a per-item cost field may exist there. Release notes
  were not searched.
- **OpenHands: Cloud API reference pages** (search conversations, search events, export, pending messages) were judged from titles
  only, and they suggest a list and a queue the grid says are not documented. Release notes (v1.10.0 to v1.31.0) were not searched.
- **Cursor: Agent SDK, Admin API and usage-events pages not fetched**, and the Enterprise OpenTelemetry Export page; the file says
  they are likely to hold more run and usage data. The Enterprise cells rest on two pages' wording. Release notes not searched.
- **Copilot: GitHub Agentic Workflows, Autopilot and remote control of CLI sessions not fetched**, and the usage-metrics pages; REST
  endpoints beyond the agent tasks page were not read, and the log text API, if there is one, would sit there.
- **Claude Code: Slack and Claude Tag pages, the Agent SDK observability and session-storage pages, and artifacts were judged from
  titles only**; changelog pages were not searched.

### 4. Counts on the shown surfaces

Counts are "N of 6" shown surfaces only (the tables above), judged from the cells. They do not describe every surface of a product.

| Dimension | Count on the shown surfaces |
| --- | --- |
| A list of running work in the product | **5 of 6** (Factory, OpenHands, Cursor, Copilot, Claude Code as a sidebar, panel or rows); Devin's is documented through the API and MCP only |
| A documented queue of waiting work | **0 of 6** on the shown surface. Claude Code and Cursor each queue messages to a running agent, but those are per-agent message queues, not a queue of waiting work; Devin's Queued is on **another surface**; the other three: not documented |
| A named status vocabulary on the shown surface | **3 of 6** (Devin on the record, OpenHands, Claude Code); Factory, Cursor and Copilot name theirs on **another surface** only |
| A stated reason for waiting on the shown surface | **0 of 6** plain; 6 partial (each shown cell has a "not documented" statement beside the reason; Factory's reads "Not documented here" beside a warning); Factory's named cause of each skip is on **another surface** |
| A log of what ran | **6 of 6**, in six different forms (progress tab, sidebar log, exportable log, run record, session log, summary plus `claude logs`) |
| PR link on the shown surface | **5 of 6**; Factory only through the Sessions API (**other surface**) |
| Retention stated in days or a rule | **3 of 6** (Cursor, Claude Code, Copilot's 28 days with a conflict); Devin, Factory (shown surface) and OpenHands: not documented |
| Cost per item on the shown surface | **3 of 6** (Devin per session, OpenHands per run, Copilot as tokens and length); Factory at mission level only; Cursor and Claude Code on **another surface** |
| Works for one local agent | **2 of 6** plainly (OpenHands, Claude Code); Devin and Factory partly through the CLI; Cursor and Copilot: not on the pages read |

## Observations

"Common", "uneven" and "rare" are judgements over the counts above. Facts are the product files'.

| Dimension | Verdict | Notes |
| --- | --- | --- |
| List of work | **Common, but a list of sessions** | Five of six list sessions or conversations, not work items; none shows a queue of waiting issues on the shown surface (Claude Code and Cursor queue messages per agent, which is not a queue of work). |
| Status | **Uneven, often API-only** | Three of six name statuses on the shown surface; for the other three the names sit on another surface or in an API. |
| Reason for waiting | **Uneven** | No product's cell is plain (six partial; Factory names skip causes on another surface). Strongest where work is scheduled or unattended (automation skips and pauses, Needs input rows); thin for a plain waiting session. |
| Log | **Common** | Every product has one; they differ in grain (per worker, per run, per session). |
| History and retention | **Uneven; retention rare** | Items stay listable everywhere; a stated retention period is the exception. |
| PR link | **Common, often a display** | Five of six link on the shown surface; in Claude Code it is drawn from what the session did, not stored. |
| Why the agent did something | **Common: the transcript** | The transcript or session log is the answer in all six; a recorded reason per decision is rare. |
| Cost | **Uneven grain** | Per session, per automation run or per mission; rarely per ticket. |
| Local, no hosted account | **Rare** | Two plainly, two partly. |

## What this grid cannot say

- **Absence.** "Not documented" means not on the pages checked. 13 cells are wholly that and 73 more are partly that, and several
  product files read condensed extractions of their pages. None of it shows a product lacks a capability.
- **What the screens look like.** Every cell comes from docs pages. No product was opened, so layout, defaults and what a person
  sees first are untested.
- **How a decision gets made inside a product.** The rows ask what is shown, not how the next item is chosen.
- **A queue of work items.** Almost every list is a list of sessions or conversations. Whether any product keeps a task record that
  outlives a session is not covered by the pages read.
- **Defaults, plans and previews.** Several features are previews, early access or plan-limited (agent view, the Agent tasks API,
  Copilot automations). The grid names them where the file does and cannot say who has them switched on.
- **Anything after 2026-10-30.** Release notes and changelogs were not searched for any of the six.

## Product files

- [Devin](devin.md)
- [Factory](factory.md)
- [OpenHands](openhands.md)
- [Cursor](cursor.md)
- [Copilot](copilot.md)
- [Claude Code](claude-code.md)
