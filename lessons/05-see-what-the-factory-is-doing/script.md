# Script (outline): See what the factory is doing

Outline only. Each beat below is a heading, its job, and the points to hit; the words are written in a later pass. Same
format as the [lesson 4 script](../04-the-loop-reads-prs/script.md): narrated by Dan over the slides (face cam in a screen
corner), slides carry labels, this file carries the words. Beat numbers match the build steps in the [README](README.md).

Framing rule: the concept first (tool-neutral), then "in our demo we use...", then "yours can be anything". Bun and
Claude Code are our demo choices, never requirements. Nothing for the live beat is pre-queued in `factory/`: the factory
is asked, plans it, and builds it during the run.

Samples, not canon: `Upcoming`, `Past` and `Completed` are this sample's page names, and the reason strings are this
sample's wording. Say so once, early.

Field claims: every claim about another product names the section of this lesson's [options file](options.md) it comes
from, in the form "Field: <section name>". That section holds the first-party URL and the as-of date (all 2026-10-30).
Say only what the cell says; "not in their docs" means the pages checked do not say, never that the product lacks it.
Name the surface when you name the product (most products have several, and the answer is often on a different one).
The list of words to keep off the slides and out of the narration is in the deck config: say "not in their docs", never
the internal wording.

Examples marked _(illustration)_ are constructed for the lesson and are not a claim about any product. Say so each time.

Ids: the A-numbers are stable ids from the [brief](brief.md), not the order. Capabilities are walked by stage: Record,
Queue, Log, History.

## Running time

Estimates for the finished video, narration plus the demo. The live build is the variable part.

| Part | Beat | Estimate |
|---|---|---|
| Opening: why is nothing happening? | 1 | 3 min |
| Concept: four stages, Record, Queue, Log, History | 2 | 3 min |
| The reasons as concepts: A1 to A6 | 3 | 5 min |
| How the field differs | 4 | 4 min |
| **Live: the factory teaches itself to show its work (do not trim)** | 5 | 14 min |
| The run: the three questions, then Completed | 6 | 4 min |
| Names, and where factories take it | 7 | 1 min |
| Exercise | 8 | 1 min |
| **Total** | | **about 35 min** |

Trim order if the cut runs long, first to last:

1. The outcome filter of A4 moves from built live to a walk-through in beat 5, and shrinks to one line in beat 3.
2. Beat 4 keeps only A2, A3 and A6 (the capabilities that carry the reason or the link); the rest become one closing slide.
3. Beat 7 shrinks to one slide.
4. Beat 6 keeps the three questions and drops the closing tour of the Completed page to one sentence.

**Do not trim beat 5**, the live build. If time is still short, cut beat 6 down to one question, never beat 5.

## Beats

1. **Opening: why is nothing happening?** (about 3 min).
   - Hand-off from lessons 1 to 4: the loop has a task queue, opens PRs, reviews and patches them, and stops after a round
     cap. It works. But when it does nothing for a task, a PR or a patch, the only way to learn why is to read the loop's code
     or its files.
   - The three questions the person watching asks: why has my agent not made a PR for this task, not reviewed this PR, not
     patched this PR. Each has a specific answer the loop already computes and then throws away.
   - The one idea: every item the factory holds, and every tick it runs, says what it did and why, so you look at the view
     before you debug.
   - Where this sits: Feedback / maintenance, the Observability / ops sub-section, Keeps it safe and healthy band (show
     the factory map, component highlighted). First operations lesson; one local agent with no name.
   - Say what is left for later up front: transcripts, cost, stall detection and alerts, throughput dashboards, many agents
     and hosting are named in beat 7, not taught.
2. **Concept: four stages** (about 3 min). Tool-neutral.
   - Record: each tick writes one line saying what it did, and every candidate and every skipped run carries a reason.
   - Queue: a page of what the loop would pick next, in pick order, with the reason it waits.
   - Log: a page of past runs, newest first, narrowed by outcome.
   - History: a page of finished work that is still there after a restart.
   - New vocabulary to land: a reason is a string a person can read; "no work" is not a reason; one record per tick; one
     record, three pages.
   - Who does what: the loop is plain code and writes the record; the pages only read it. No agent is called to explain the
     loop. Say that the view is the loop's own answer, not a second system guessing.
3. **The reasons as concepts** (about 5 min). One stage slide per stage, then one beat per capability. Each capability:
   concept, one line on why or prevents, two spoken examples _(illustration)_, what it takes to build, then "in our demo we
   use..." and "yours can be anything". Built live in beat 5.
   - **A1. One run record per tick** (Record). Start, end, duration, the item picked, the outcome and any error. A skipped
     or crashed tick otherwise leaves no trace and a crashing item cannot be told from an idle one. Build: a small writer
     called from the tick. Demo: a JSONL file, one line per tick. Yours: any append-only store.
   - **A2. A reason on every queue item and every skipped run** (Record). The reason is the payoff of the lesson. Without
     it every row says "queued". Build: reuse lesson 4's candidate and PR-state logic to return an item and a reason.
     Spoken example _(illustration)_: "waiting: round cap reached (3), needs a person".
   - **A3. An Upcoming view in pick order** (Queue). Type, item, age and the A2 reason, from one route rendering the
     current candidate list. Demo: a small local web server. Yours: a terminal table or a file would do the same job.
   - **A4. A Past view of runs, filterable by outcome** (Log). Newest first, reason in a detail column, an outcome filter in
     the query string. Prevents one failed run being lost among hundreds of ticks. First to become a walk-through if time is
     short.
   - **A5. A Completed view that survives restarts** (History). Finished tasks and PRs with when each started, when its PR
     opened and when it merged, read from the task file, so a restart does not erase the story.
   - **A6. Link every item to its PR and task** (History). A task id links to its record, `org/repo#n` to GitHub, a run row
     to its item. One helper used by all three pages.
   - The payoff slide: the three questions each map to a reason string in the Queue view. Show it once now, prove it in
     beat 6.
4. **How the field differs** (about 4 min; slides). One slide group per capability, in the brief's ids. Say only what the
   cells say. Five of the six products list sessions rather than work items, and none documents a queue of waiting work with
   the reason on its main surface; several answers sit on another surface (an automations feed, an API). Say it as "not in
   their docs", never "no product has one".
   - A1: Field: A1 (what one record holds). A2: Field: A2 (a stated reason when waiting or skipped). A3: Field: A3 (the list
     of current and queued work). A4: Field: A4 (where past runs are read and how they narrow). A5: Field: A5 (history and
     how long it is kept). A6: Field: A6 (the link from an item to its PR).
   - Capabilities with no column to compare: say so (Field: Not compared here), for example one record per tick of a polling
     loop, a reason stored for a tick that picked nothing, pick order and an age column, and a run row linking to its item.
     Claim nothing about the field there.
   - Takeaway: the view appears in different places and under different names across surfaces; ours is one way, not the
     standard. Do not claim any product cannot do something.
5. **DEMO: the factory teaches itself to show its work** (about 14 min). The live beat, do not trim. The factory built in
   lesson 1 and extended in lessons 2 to 4 is asked to explain itself. Nothing is pre-queued in `factory/`, and no plan
   session queued this work; say that out loud on camera.
   - Ask, from the brief given in the lesson: each tick, write one record; give every candidate and every skipped run a
     reason; serve Queue, Log and Completed pages on the local machine; link every id.
   - Show the plan run on that request, then the loop picking the tasks. The three code beats are the run-log writer
     (A1), the reason fields from the existing candidate and PR-state logic (A2), and the small web server with the
     Queue, Log and Completed pages and the link helper (A3 to A6).
   - Show the reason function on a few made-up items _(illustration)_ before the server exists, so the strings are read
     before they are drawn.
   - The lesson's own dev tasks and PRs flow through the new view as they are built; leave the Queue page open in a
     browser tab and glance at it between steps.
   - A person reviews and merges the factory's own PRs, as before.
   - Fallback if short: do the outcome filter (A4) as a walk-through.
6. **The run: the three questions, then Completed** (about 4 min). The new view on the tasks and open PRs prepared in the
   checklist.
   - Ask the three questions of the Queue page, one at a time: a task with no PR, a PR with no review, a PR with no patch.
     Each is answered by the reason string on its row, without opening code.
   - Open the Log page, filter to `skipped`, and read the reasons in a column; follow a run row's link to its item.
   - Finish on the Completed page: the full history of the lesson's own work, each task with its PR. Restart the server and
     show the page is still full.
   - Lesson 4's round cap is shown, not re-taught: a PR flagged after the cap appears as "waiting: round cap reached".
7. **Names, and where factories take it** (about 1 min).
   - Names are not canonical: `Upcoming`, `Past`, `Completed` and the run record are only this sample's names. Field: What
     other factories call it (Sessions list, Mission Control, Agent sessions, Agent Canvas, Agents Window, Agent view).
   - Destinations, described not prescribed, each with its owning lesson, order open, promising nothing (Field: Where it
     goes from here): transcripts and an investigation skill, and cost (later operations lessons); stall detection and alerts
     (later operations lessons); an event log, queue snapshots and verification rows (a later operations lesson);
     throughput and cycle-time dashboards (feedback and maintenance lesson); fleet views, named agents and claims
     (multi-agent coordination deep dive); UI auth and hosting (governance lesson); attempt caps and cooldowns in their
     production forms (a later loop lesson).
8. **Exercise** (about 1 min). The exercise lists outcomes and names no required tool, language or runner. Hand off: your
   own loop, with an agent and language of your choice, gets the same behaviours. Close on the loop delta: the loop
   explains itself, so you open the view before you debug.
