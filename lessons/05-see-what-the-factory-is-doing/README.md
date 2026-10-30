# Lesson 5: See what the factory is doing

**Component taught:** [Observability / ops](../../docs/components.md), the labelled sub-section of Feedback / maintenance in the Keeps it safe and healthy band: the view of what one local agent is doing and has done
**Video:** _placeholder, link added when the lesson is published_ (playlist: [How to Build a Software Factory](https://www.youtube.com/playlist?list=PLEtnpY4_ARns))

`factory/` in this repo is our demo. This lesson teaches the concept; Bun and Claude Code are what the demo happens to
use, never what you need. Each part below goes concept first, then "in our demo we use...", then "yours can be
anything".

## Names for this

In this lesson the three pages are `Upcoming`, `Past` and `Completed`, and each tick writes one run record; they are this
sample's names, not canonical. Other factories call the view of their work a Sessions list, Mission Control, Agent
sessions, an Agent Canvas, an Agents Window or an Agent view. Each term is cited and dated in
[options.md](options.md#what-other-factories-call-it). Call yours whatever you like.

## The concept

Every item the factory holds, and every tick it runs, says what it did and why, so you look at the view before you debug.
Lessons 1 to 4 gave the loop a task queue, PRs, review, patch and a round cap, but the only way to learn why the agent has
not made a PR for a task, not reviewed a PR or not patched a PR is to read the loop's code or its files. The loop already
computes those answers and then throws them away. This lesson keeps them: each tick leaves a record, every candidate and
every skipped run carries a reason, and a local web view shows what is next, what ran and what finished.

## What changes in the loop

Before, a person had to read the loop's code to learn why a task had no PR, a PR had no review or a PR had no patch. After,
the loop explains itself and they open the view first.

## The stages

Four stages, with a [brief](brief.md) that ranks each capability by expected, common and crucial.

- **Record:** each tick appends one line (start, end, the item picked, outcome, error) (A1), and every candidate and every
  skipped run carries a reason a person can read (A2).
- **Queue:** an Upcoming page in pick order, with type, item, age and why it is waiting (A3).
- **Log:** a Past page of runs, newest first, filterable by outcome, with the reason in a detail column (A4).
- **History:** a Completed page of finished work that survives a restart (A5), and a link from every row to its PR or
  task (A6).

- **In our demo we use:** the existing factory's loop, extended live: a JSONL run log, reason fields from the loop's
  existing candidate logic, and a small local web server. Nothing is pre-queued in `factory/`; the factory is asked, plans
  it, and builds it during the run.
- **Yours can be anything:** any agent, any language, any store for the record, and any way of showing it, from a web page
  to a terminal table.

## The live beat

The existing factory is asked to teach itself to show its work, on camera. It plans the work, the loop picks the tasks, and
the factory builds the three parts: a run-log writer, reason fields, and the web server with its three pages. The lesson's
own tasks and PRs flow through the view as they are built, so the run ends by asking the three questions of the Queue page
and finishing on the Completed page showing the history of the lesson's work.

## Build steps

Numbers match [script.md](script.md).

1. Opening: why is nothing happening? (beat 1).
2. Concept: the four stages (beat 2).
3. The reasons as concepts: record, reason, queue, log, history, link (beat 3).
4. How the field differs (beat 4).
5. Live: the factory teaches itself to show its work (beat 5).
6. The run: the three questions, then Completed (beat 6).
7. Names, and where factories take it (beat 7).
8. Exercise (beat 8).

## How the field does it

Details, sources and as-of dates live in [options.md](options.md); product-by-product cells live in the
[landscape comparison](../../landscape/README.md). Five of the six products surveyed list sessions rather than work items, and
none documents a queue of waiting work with the reason on its main surface. That is "not in their docs", never "no product
has one"; several answers sit on another surface, such as an automations feed or an API.

## Where factories take it

Described, not prescribed. Out of scope here, each owned by another lesson and named as a destination, never built:
transcripts and an investigation skill, cost, stall detection and alerts, an event log with queue snapshots, throughput
dashboards, fleet views and named agents, UI auth and hosting, and attempt caps and cooldowns in their production forms.
Order stays open. See [options.md](options.md#where-it-goes-from-here).

## Files

- [brief.md](brief.md): the one-page lesson brief
- [script.md](script.md), [options.md](options.md)
- [deck/index.html](deck/index.html): the lesson deck
