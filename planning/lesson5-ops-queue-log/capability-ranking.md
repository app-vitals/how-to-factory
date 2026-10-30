# Activity visibility capabilities, ranked: expected, common, crucial

Internal planning doc. Input to the lesson 5 brief (LOQ-1.11) and options (LOQ-1.12). Not published in the lesson.

Model: `planning/lesson4-pr-routing/capability-ranking.md`.

Sources, both in this repo:
- **Inventory**: `planning/lesson5-ops-queue-log/shipwright-inventory.md`, read at shipwright commit `7ed64d8` (cited as **Inv #n**, the numbered capability, and **Inv Gap #n** for the numbered gaps). Each Shipwright reason there is marked *documented* or *inferred*; that mark is carried through below.
- **Grid**: `landscape/activity-grid/README.md` and the six product files, as of 2026-10-30 (cited as **Grid**, with the dimension or column name; **Grid §4** is the "Counts on the shown surfaces" table).

## How the three axes are rated

| Axis | Question | How it is rated |
|---|---|---|
| **Expected** | Would someone building a view of a single local agent's work assume it has this? | Judgement, **High / Med / Low**, from what the grid shows the products doing. Stated, not computed. |
| **Common** | How many of the six products document it? | A count, **N of 6**, on the shown surface of each product (Grid §4). "Partly", "other surface" and "not documented" are counted separately, never rounded up. |
| **Crucial** | What breaks without it? | **High / Med / Low**, from the failure in the inventory. High only where the inventory's reason is *documented*; *inferred* reasons are capped at Med and flagged. Where the inventory has no entry, Crucial is capped at Med and the failure is marked as an illustration. |

## Scope

One local agent, no name, one person watching. The person opens a web view to ask: **why has my agent not created a PR for this task, not reviewed this PR, not patched this PR.** Fleet views, named agents and hosted accounts are out of scope (Inv #6; Grid §4, "Works for one local agent").

Tier rule, same as lessons 2 to 4: a capability is **Tier A (built live)** when it is crucial, or expected and common; **Tier B (named, not built)** when it is real but costly to build, depends on infrastructure the lesson does not have, or belongs to another lesson. "Common" counts as met at 3 of 6 or more. Exceptions are listed under "Kept on weaker evidence".

Stages follow the draft design in `planning/lesson5-ops-queue-log/PLAN.md`: **Record**, **Queue**, **Log**, **History**.

## Baseline (not ranked)

The sample already has a loop that picks a task, opens a PR and routes review and patch (lessons 1 to 4), including the PR states and attempt cap that this lesson's view explains. This lesson adds the record and the views over it.

## The ranked list

Ordered by stage.

### Tier A: built live

| # | Stage: capability | Expected | Common (N of 6) | Crucial | Evidence |
|---|---|---|---|---|---|
| A1 | Record: one run record per tick (start, end, duration, the item picked, outcome, error) | High | A log of what ran **6** (six different grains: progress tab, sidebar log, exportable log, run record, session log, summary plus `claude logs`). One record per tick of a polling loop **0** (not a grid dimension) | **High** | Grid §4 ("A log of what ran: 6 of 6"), Observations ("Log: Common"). Inv #15, #16, #17, #19: documented. The picked item type and id are stored on the run; a failed dispatch is recorded with its error and counted as a skip. The purpose of one row per pick is inferred (Inv #15), but the outcome and error fields are documented (Inv #17). Failure without it: a skipped or crashed tick leaves no trace and the three questions have no answer. |
| A2 | Record: a reason on every queue item and every skipped run | High | A stated reason for waiting on the shown surface **0** plain, **6** partial (each cell has a "not documented" statement beside the reason). Reason for a skip on another surface **1** (Factory, Automations events) | **High** | Grid §4 ("A stated reason for waiting: 0 of 6 plain"), Observations ("Reason for waiting: Uneven"). Inv #8, #10, #11: documented. A blocked-by list gives every current reason, each skip stores a reason, and a command that does nothing says why instead of a generic "no work". Inv Gap #1, #2: the queue view itself does not show why an item waits, which is what this lesson adds. Failure without it: "no work" on every row, and a stuck item looks the same as an idle one. |
| A3 | Queue: an Upcoming view in pick order (type, phase, item, age) | High | A list of running work **5** (sessions or conversations, not work items). A documented queue of waiting work **0** on the shown surface (Devin's Queued is on another surface) | Med | Grid §4 ("A list of running work: 5 of 6", "A documented queue of waiting work: 0 of 6"), Observations ("List of work"). Inv #1, #2, #3: the ranked list, age on every row and type and phase badges. Purpose is inferred (a human sees what is next without reading logs), so Crucial is capped at Med. |
| A4 | Log: a Past view of runs, filterable by outcome | High | A log **6** (as A1). A filter by outcome: not a grid dimension, **0** | Med | Grid §4. Inv #17 (documented, five outcome values), Inv #23 (inferred: filters and grouping keep the main table focused). Capped at Med on the filter; the outcome column itself rides on A1. |
| A5 | History: a Completed view that survives restarts | High | Finished work stays listable **6**; a retention period stated **3** (Cursor, Claude Code, Copilot with two pages that differ). Devin, Factory and OpenHands: not documented | Med | Grid §4 ("Retention stated in days or a rule: 3 of 6"), Observations ("History and retention: Uneven; retention rare"). Inv #24: inferred (terminal statuses and timestamps kept, no comment says on purpose). Inv #25 is documented for an append-only event log, but that is Tier B (B3). Capped at Med. The lesson's payoff depends on it: the Completed view at the end shows the lesson's own work. |
| A6 | Link: an item links to its PR and its task, and a run row links to its item | High | PR link on the shown surface **5** (Factory only through the Sessions API). Run row to item: not a grid dimension, **0** | **High** | Grid §4 ("PR link on the shown surface: 5 of 6"), Observations ("PR link: Common, often a display"). Inv #4: documented (a PR item links out to GitHub because the record id is not available there). Inv #28: documented (task stores `pr`, `prUrl`, branch). Inv #30: log-to-item direction is crucial; item-to-runs was not confirmed. Failure without it: you find the row, then hunt for the PR. |

### Tier B: named, not built

| # | Stage: capability | Expected | Common (N of 6) | Crucial | Evidence and why not built (owner) |
|---|---|---|---|---|---|
| B1 | Stall detection: a duration fallback for runs that never finished, last-heartbeat column | Low | **0** (not a grid dimension) | Med | Inv #18: documented (the last heartbeat stands in for the end of a run that crashed or stalled). Needs a heartbeat sender and a rule for "stalled". Owner: **later ops lesson**. |
| B2 | Alerts: tell a person when the loop is stuck or failing | Low | **0** (not a grid dimension) | Med | No inventory entry (Inv #19 sends errors to an error tracker, which is the nearest). Crucial capped at Med; failure is an illustration: the factory stalls overnight and nobody looks. Owner: **later ops lessons** (alerting). |
| B3 | Append-only event log per task and PR (who changed what, when) | Low | **0** | Med | Inv #25: documented (append-only because a plain insert is race-safe). A single writer can use the run log; the need grows with more than one writer. Owner: **later ops lesson**. |
| B4 | Cost and token spend per run and per task | Med | Cost per item on the shown surface **3** (Devin, OpenHands, Copilot as tokens); Factory mission level only; Cursor and Claude Code on another surface | Low | Grid §4. Inv #20, #26: #20 documented for the skipped-run case, #26 inferred. Answers none of the three questions. Owner: **later ops lesson** (cost). |
| B5 | Transcripts and a session link per run, and the investigation skill that reads them | Med | Why the agent did something, as a transcript or session log **6**; a recorded reason per decision rare | Med | Grid Observations ("Why the agent did something: Common: the transcript"). Inv #21: documented key choice, purpose inferred. The investigation skill is a destination, not built, per Dan (`PLAN.md`, Direction). Owner: **later ops lesson** (investigation). |
| B6 | Fleet views: several agents, who is eligible, who queued it | Low | **0** on the shown surfaces (Grid scope is one agent) | Low for this scope | Inv #6: inferred, exists because Shipwright runs several agents. Owner: **multi-agent deep dive** (component 10b). |
| B7 | UI auth and hosting for the web view | Low | Works for one local agent, no hosted account **2** plainly (OpenHands, Claude Code); the dashboard needs sign-in for Factory | Low locally, High once shared | Grid §4. No inventory entry. The lesson's server binds to the local machine. Owner: **governance lesson** (component 7). |
| B8 | Snapshot history of the queue (what it looked like an hour ago) | Low | **0** | Low | Inv #5, Inv Gap #3: documented that the snapshot is overwritten; the run log is the history. Owner: **later ops lesson**. |
| B9 | Attempt caps, skip counter and auto-block, redispatch cooldown | Med | **0** (Cursor caps attempts: 1) | **High** | Inv #10, #12, #13: documented. The lesson 4 round cap already ships; the view only *shows* the cap. Owner: **later loop lesson**. |
| B10 | Claim, heartbeat and stale-claim recovery | Low | **0** | Med for one agent (a crashed run leaves a claim) | Inv #14: documented. A single local agent has no second worker. Owner: **coordination deep dive** (component 10b). |
| B11 | Verification results as rows (why the checks failed or were skipped) | Low | **0** | Med | Inv #27: documented. The run record shows the outcome; the structured rows are lesson 3's subject. Owner: **later ops lesson**. |
| B12 | Throughput and cycle-time dashboards | Low | **0** | Low | Not in the inventory. Owner: **feedback and maintenance lesson** (component 8). |
| B13 | Idle ticks as run rows | Low | **0** | Med | Inv Gap #4: Shipwright makes no run row for a tick with no dispatch, so "ran, found nothing" cannot be told from "did not run". Kept in B as a production detail; the sample may choose to write the row anyway (see "Kept on weaker evidence"). Owner: **later ops lesson**. |

### Considered and not carried forward

| Capability | Why left out | Evidence |
|---|---|---|
| Item type and phase badges as their own capability | Folded into A3. | Inv #3. |
| Age on every row | Folded into A3; the ordering rule is lesson 4's. | Inv #2. |
| Ready rule (pending, not held, dependencies met) as its own slide | The reason strings in A2 carry it. | Inv #7. |
| Hold flag and blocked reason on the record | Folded into A2. | Inv #9. |
| Skip reasons as tagged markers | Folded into A2: the marker is how the reason is written. | Inv #11. |
| Filters and grouping by cron | Only the outcome filter is kept, in A4. | Inv #23. |
| Execution counters on the task (simplify counts, coverage) | Not about the three questions. | Inv #26. |

## Lesson length: does Tier A fit 30 to 40 minutes?

Budget in minutes, not a script. Earlier lessons ran 30 to 40 minutes (`PLAN.md`, Design). The live build is the do-not-trim beat and the largest part.

| Part | Minutes | Tier A covered |
|---|---|---|
| Hook: the three questions; the one idea | 3 | - |
| Stages: Record, Queue, Log, History | 3 | A1 to A5 named |
| Reason strings as concept slides (no PR, no review, no patch) | 5 | A2 |
| What other factories do (differs slide, two or three products) | 4 | A1, A2, A5 evidence |
| **Live: run-log writer, reason fields, local web view** | **14** | A1 to A6 |
| Run it: the lesson's own tasks and PRs appear; Completed at the end | 4 | A3 to A6 |
| Destinations and exercise hand-off | 2 | Tier B named |
| **Total** | **35** | |

The build is 14 of 35. Six items fit if A3 to A5 are three pages over one record: one writer (A1, A2), one server with three routes (A3 to A5), and A6 as a link helper used by all three. If time runs short, A4's outcome filter is the first to move to a walk-through.

## Changes from the approved design

The draft stages and the build list are in `PLAN.md`. Result of ranking:

**Tier A (six items):** A1 to A6. A1, A2 and A6 are High crucial on documented reasons; A3 to A5 are expected and common but capped at Med.

**Matches the design.** The built-live list in `PLAN.md` (a run-log writer, reason fields, Queue, Log and Completed pages) is A1 to A5; A6 is the linking the design implies on every row.

**Nothing promoted to Tier A from Tier B on the evidence.** The only High crucial items in B are the caps and cooldown (B9), which lesson 4 already ships; the view only displays them.

**Kept on weaker evidence (flag for Dan):**
- **A2**: Common is 0 plain. No product's shown cell fully documents a reason for waiting (Grid §4). Kept because it is crucial on documented reasons (Inv #8, #10, #11) and it is the whole payoff of the lesson. Say "none of these docs describe a complete reason on the main surface", never "no product has one" (Factory names skip causes on another surface).
- **A3 and A4**: Crucial is capped at Med on inferred reasons (Inv #1, #23). Kept because they are expected and common (5 and 6 of 6), and the web view is the lesson's deliverable.
- **A5**: Inv #24 is inferred, and retention is stated by 3 of 6. Kept because the design promises a Completed view of the lesson's own work.
- **Idle tick row (B13)**: the sample may write a row for an idle tick even though Shipwright does not (Inv Gap #4). Do not present it as Shipwright's behaviour.

**Reduced claims to carry into the lesson:**
- Five of six products list *sessions*, not work items, and none documents a queue of waiting work on the shown surface (Grid Observations). A waiting-for-a-person row is not a queue.
- Where the grid says "Other surface", cite it as such (Factory's skip causes, Cursor's status, Copilot's status list).
- Grid cross-check flags re-checks before the lesson says a capability is absent: release notes were not searched for any of the six; Cursor's Agent SDK, Admin API and usage pages, Copilot's usage-metrics pages and OpenHands' Cloud API pages were not fetched (Grid §3).
- Inv Gap #2: not-ready tasks are not in Shipwright's ranked list, so its page cannot say "waiting on dependency X". The lesson's reason field goes further than that page does.
- Shipwright was not run for the inventory (read of the source only). Nothing here was observed live.

## Tier A write-ups (ready to paste into the brief)

Each item: concept, why it exists, a concrete failure without it, what it takes to build. Failures marked **(Shipwright, documented)** are the inventory's own words. Failures marked **(illustration)** are constructed for the lesson and are not a claim about any product.

### A1. Record: one run record per tick
- **Concept:** each tick appends one line to a JSONL file: start, end, the item picked (task or PR and its id), the outcome and any error.
- **Why it exists:** **(Shipwright, documented)** a dispatch that throws is completed as failed with its error and then counted as a skip, so a crashing item cannot loop forever unseen (Inv #19). The purpose of one row per pick is inferred.
- **Failure without it (illustration):** the agent skipped a PR three ticks ago and nothing says so; the person guesses.
- **To build:** a small writer called from the tick. Small.

### A2. Record: a reason on every queue item and every skipped run
- **Concept:** every candidate carries a reason string, and a run that did nothing stores why. "No work" is not a reason.
- **Why it exists:** **(Shipwright, documented)** a command that decides to do nothing says why instead of the generic fallback (Inv #11), and a task can list every reason it is blocked at once (Inv #8).
- **Failure without it (illustration):** a PR sits for a day with no review and the view says only "queued".
- **To build:** reuse the candidate and PR-state logic from lesson 4 to return `{item, reason}`. Medium.

### A3. Queue: the Upcoming view
- **Concept:** a page listing what the loop would pick next, in pick order: type, phase, item, age, and the reason from A2.
- **Why it exists:** the inventory's own table has no reason column (Inv Gap #1); this lesson adds one. The ranking purpose is inferred (Inv #1).
- **Failure without it (illustration):** the only way to learn what is next is to read the loop's code.
- **To build:** one route rendering the loop's current candidate list. Small.

### A4. Log: the Past view
- **Concept:** a page of past runs, newest first, with an outcome filter and the A2 reason in a detail column.
- **Why it exists:** **(Shipwright, documented)** the skip reason wins over an error in the detail cell, so a reader sees why first (Inv #17).
- **Failure without it (illustration):** hundreds of ticks in one file, and one failed run lost in them.
- **To build:** one route reading the JSONL with a query-string filter. Small.

### A5. History: the Completed view
- **Concept:** a page of finished work, kept across restarts, with when it started, when its PR opened and when it merged.
- **Why it exists:** the task record keeps its final status and timestamps (Inv #24, inferred purpose). The lesson's own tasks end up here.
- **Failure without it (illustration):** a restart empties the view and the lesson's work vanishes.
- **To build:** read finished tasks from the task file. Small.

### A6. Link: item to PR and task
- **Concept:** every row's id is a link: a task to its page or record, a PR to GitHub. A run row links to its item.
- **Why it exists:** **(Shipwright, documented)** a PR item links out to GitHub because the record id is not available in that view (Inv #4).
- **Failure without it (illustration):** the answer to "why no review" is in the row, and the PR is a copy-paste away.
- **To build:** one helper that turns `org/repo#n` or a task id into a URL. Small.
