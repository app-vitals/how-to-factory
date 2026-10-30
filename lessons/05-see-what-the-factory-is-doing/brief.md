# Lesson brief: See what the factory is doing

> Agreed before any work is queued. One page. See [docs/lesson-playbook.md](../../docs/lesson-playbook.md).
> Scoping rule: lesson 1 explains plan and dev-task, builds a first version of each live, and runs a simple
> loop that ends at open PRs (a person reviews and merges). Every later lesson is ONE component, taught deep and built
> in that lesson, prioritized by expected, common and crucial; deeper dives come later. Order stays open. `factory/`
> is our demo; the lesson stays tool-neutral. The lesson's plan session queues lesson material only (brief, script,
> deck, exercise, options, run-of-show), never `factory/` changes: the factory builds `factory/` live.

## Component taught and band

Observability / ops, the labelled sub-section of [Feedback / maintenance](../../docs/components.md), which the component
map lists in the **Keeps it safe and healthy** band. This is the first operations lesson. It covers the view of what one
local agent is doing and has done; the rest of operations is split across later lessons (see Out of scope).

## The one idea

Every item the factory holds, and every tick it runs, says what it did and why, so you look at the view before you debug.

## Scope test

Does a single agent need it for a single flow? Yes, for any loop that outlives the first few PRs. Lessons 1 to 4 give the
loop a task queue, PRs, review, patch and a round cap, but the only way to learn why the agent has not made a PR for a
task, not reviewed a PR, or not patched a PR is to read the loop's code or its files. The person watching asks exactly
those three questions, and each has a specific answer the loop already computes and then throws away. Several agents,
named agents, hosted accounts, spend and alerting are destinations: named, not taught.

Source for the choice and ranking: the activity visibility capabilities ranked by expected, common and crucial, from the
Shipwright inventory and the six-product activity grid (internal notes in `planning/lesson5-ops-queue-log/` and
`landscape/activity-grid/`, not published in the lesson). The grid is as of 2026-10-30. Five of the six products list
sessions rather than work items and none documents a queue of waiting work with the reason on its main surface, which is
why several rows below carry a count of 0 or "partial" (read it as "not documented on the surface checked", never "no
product has one").

## In scope

Tier A: built and exercised. Every row of the capability table below.

- **Record:** each tick writes one record (start, end, the item picked, outcome, error); every candidate and every skipped
  run carries a reason string. "No work" is not a reason.
- **Queue:** an Upcoming page in pick order: type, item, age, and why it is waiting.
- **Log:** a Past page of runs, newest first, filterable by outcome, with the reason in a detail column.
- **History:** a Completed page of finished work that survives a restart.
- **Link:** every row links to its PR or task, and a run row links to its item.
- The payoff: the three questions (no PR, no review, no patch) each map to a specific reason string in the Queue view.

## Out of scope

Tier B: named on one slide, each with the lesson that owns it. None is built here.

- Transcript reading, a session link per run, and the investigation skill that reads them: owned by a later operations
  lesson. The investigation skill is a named destination, not built here.
- Token and cost spend per run and per task: owned by a later operations lesson (cost).
- Stall detection (a last-heartbeat fallback for runs that never finished) and alerts when the loop is stuck or failing:
  owned by later operations lessons.
- An append-only event log per task and PR, snapshot history of the queue, and verification results as rows: owned by a
  later operations lesson.
- Throughput and cycle-time dashboards: owned by the feedback and maintenance lesson.
- Fleet views, named agents, claims and stale-claim recovery: owned by the multi-agent coordination deep dive.
- UI auth and hosting for the web view (the sample's server binds to the local machine): owned by the governance lesson.
- Attempt caps, skip counters and auto-block, and redispatch cooldown in their production forms: owned by a later loop
  lesson. Lesson 4's round cap already ships; this lesson only shows it.

## The sample's concrete steps

1. Each tick, after the loop picks its work, append one record to a JSONL file: start, end, the item picked, outcome and
   any error (Record).
2. For every candidate task and PR, return the item and the reason it was or was not picked, reusing lesson 4's
   candidate and PR-state logic; a run that does nothing stores why (Record).
3. Serve a Queue page that lists what the loop would pick next, in pick order, with type, item, age and reason (Queue).
4. Serve a Log page that reads the JSONL, newest first, with an outcome filter in the query string (Log).
5. Serve a Completed page that lists finished tasks and PRs from the task file, so it survives a restart (History).
6. Turn every task id and `org/repo#n` into a link, on all three pages (Link).
7. Run the loop on the lesson's own tasks and PRs, ask the three questions of the Queue view, and finish on the Completed
   page showing the full history of the lesson's work.

## What the factory builds in this lesson

The existing factory teaches itself to show its work, live on camera, from a brief given in the lesson. Nothing is
pre-queued in `factory/`, and no plan session queues this work: the factory is asked, plans it, and builds it during the
lesson run. The build is three parts: a run-log writer in the loop (JSONL), reason fields from the existing candidate
and PR-state logic, and a small local web server with Queue, Log and Completed pages. The lesson's own dev tasks and PRs
flow through the view as they are built, so the Completed page at the end shows the history of the lesson's work. The
live build is the do-not-trim beat. The outcome filter on the Log page is the first part to move to a walk-through if
time is short.

## Reused from earlier lessons / New this time

**Reused from earlier lessons**

- Lesson 1: the plan and dev-task skills, the loop that ends at open PRs, and `tasks.json` as intent.
- Lesson 2: the stage vocabulary (capabilities grouped by stage, one stage slide, then one slide per capability).
- Lesson 2: the capability slide pattern (title `Stage: capability`, one why-or-prevents bullet, two "e.g." bullets, one
  diagram, the illustration caption) and the run-of-show format.
- Lesson 4: PR routing and the attempt cap. Their states (needs review, needs patch, waiting for a human, flagged after
  the cap) are the reasons this lesson's view explains; they are not re-taught.
- The deck rules, the expected / common / crucial ranking, and the Tier A / Tier B split.

**New this time**

- Four stages for observability: Record, Queue, Log, History.
- A reason on every candidate and every skipped run, as a string a person can read.
- A run record per tick that survives the tick.
- A local web view with three pages over one record.
- A Completed view that keeps finished work across restarts.

## Capabilities

Grouped by stage and prioritized by expected, common and crucial. Examples marked (illustration) are constructed for the
lesson and are not a claim about any product. Counts are of the six surveyed products' documentation (Devin, Factory,
OpenHands, Cursor, Copilot, Claude Code); "not documented" means the pages checked do not say so, not that the product
lacks it. Crucial is "high" only where the Shipwright reason is documented; where it is inferred it is capped at medium.
The A-numbers are the ranking's stable ids, not the order. If time is short, the outcome filter in A4 is the first to
move to a walk-through. From lessons 1 to 4, revisit after lesson 5.

| Stage | Capability | Concept | Why it exists or what it prevents | Examples | What it takes to build |
|---|---|---|---|---|---|
| Record | A1. One run record per tick | Each tick appends one line to a JSONL file: start, end, duration, the item picked (task or PR and its id), the outcome and any error. Expected: high. A log of what ran in 6 of 6, at six different grains; one record per tick of a polling loop is documented by 0 (not a grid dimension). Crucial: high; the outcome and error fields are documented. | A skipped or crashed tick leaves no trace, and a crashing item cannot be told from an idle one. | The agent skipped a PR three ticks ago and nothing says so; the person guesses. (illustration) A tick that throws is recorded as failed with its error, so it shows up in the Log. (illustration) | A small writer called from the tick. Small. |
| Record | A2. A reason on every queue item and every skipped run | Every candidate carries a reason string, and a run that did nothing stores why; "no work" is not a reason. Expected: high. A stated reason for waiting on the main surface is documented plainly by 0 and partly by 6; a reason for a skip on another surface by 1 (Factory). Crucial: high; the reasons are documented. | Without a reason, every row says "queued" and a stuck item looks the same as an idle one. | A PR sits for a day with no review and the view says only "queued". (illustration) The row says "waiting: round cap reached (3), needs a person". (illustration) | Reuse lesson 4's candidate and PR-state logic to return `{item, reason}`. Medium. |
| Queue | A3. An Upcoming view in pick order | A page listing what the loop would pick next: type, item, age and the A2 reason. Expected: high. A list of running work in 5 of 6 (sessions, not work items); a documented queue of waiting work on the main surface by 0. Crucial: medium; the purpose is inferred. | A person sees what is next and why without reading the loop's code. | The only way to learn what is next is to read the loop's code. (illustration) The three questions are answered from one page. (illustration) | One route rendering the current candidate list. Small. |
| Log | A4. A Past view of runs, filterable by outcome | A page of past runs, newest first, with an outcome filter and the reason in a detail column. Expected: high. A log in 6 of 6; a filter by outcome is not a grid dimension (0). Crucial: medium; the filter's purpose is inferred. | One failed run is not lost among hundreds of ticks, and the reason is read first. | Hundreds of ticks in one file and the one failed run lost in them. (illustration) Filter to `skipped` and read the reasons in a column. (illustration) | One route reading the JSONL with a query-string filter. Small. |
| History | A5. A Completed view that survives restarts | A page of finished tasks and PRs with when each started, when its PR opened and when it merged, read from the task file. Expected: high. Finished work stays listable in 6 of 6; a retention period is stated by 3. Crucial: medium; the purpose is inferred. | A restart does not erase the story; the lesson's own work is still there at the end. | A restart empties the view and the lesson's work vanishes. (illustration) The Completed page lists every task the lesson built, with its PR. (illustration) | Read finished tasks from the task file. Small. |
| History | A6. Link every item to its PR and task | Every row's id is a link: a task to its record, a PR to GitHub; a run row links to its item. Expected: high. A PR link on the shown surface in 5 of 6; run row to item is not a grid dimension (0). Crucial: high; the reason is documented. | You find the row and the PR is one click away instead of a copy-paste. | The answer to "why no review" is in the row, and the PR is a hunt away. (illustration) A run row links back to the task it worked on. (illustration) | One helper that turns `org/repo#n` or a task id into a URL, used by all three pages. Small. |

## Prerequisites

- Lesson 1: the plan and dev-task skills and the loop that ends at open PRs.
- Lesson 4: PR routing and the attempt cap, so there are states to explain.
- Real tasks and open PRs flowing through the loop during the run (the lesson's checklist plans the data).

## Exercise outcomes

Outcomes only; no required tool, language or runner. Each covers one or more Tier A capabilities.

- Each tick leaves a record of what was picked, the outcome and any error (A1).
- Every candidate and every skipped run carries a reason a person can read (A2).
- A page shows what the loop would pick next, with age and reason (A3).
- A page shows past runs and can be narrowed by outcome (A4).
- Finished work is still listed after a restart (A5).
- Every task and PR on every page links to its record (A6).
- Without reading code, the three questions (no PR, no review, no patch) are answered from the view.

## Loop delta

**What does the loop do after this lesson that it could not before?**

The loop explains itself. Each tick leaves a record, every candidate and every skipped run carries a reason, and a local
web view shows what is next, what ran and what finished. Before, a person had to read the loop's code to learn why a task
had no PR, a PR had no review or a PR had no patch. After, they open the view first.

**Does it cover what is expected, common and crucial for its one component?** (and name the deeper dives left for later lessons)

Yes, for seeing one local agent's work. The capabilities rated crucial on documented reasons (A1, A2, A6) and the
expected-and-common views (A3 to A5) are in Tier A and built; the Queue, Log and Completed pages are the lesson's
deliverable. Common is uneven because five of the six products list sessions rather than work items and none documents a
reason for waiting on its main surface. Left for later: transcripts and the investigation skill, cost, stall detection
and alerts (later operations lessons), throughput dashboards (feedback and maintenance lesson), fleet views and named
agents (multi-agent deep dive), and UI auth and hosting (governance lesson).

## Length target

30 to 40 minutes, the same as lessons 1 to 4. The ranking budgets 35: hook 3, stages 3, the reason strings as concepts 5,
what other factories do 4, the live build 14 (the do-not-trim beat), the run (the lesson's own work flows through; the
Completed page at the end) 4, destinations and exercise 2.
