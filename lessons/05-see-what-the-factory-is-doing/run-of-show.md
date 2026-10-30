# Run of show: Lesson 5, See what the factory is doing

The single filming sequence: slide range, then demo, then slide range. Slide numbers are 1-based positions in
[deck/index.html](deck/index.html) (28 slides). Every row names the [script.md](script.md) beat it performs, and the
time column is that beat's estimate from the script's running time table. Like lessons 2 to 4, this lesson runs things on
camera: the live beat is a real run, not build-only.

**Pre-filming:** work through [checklist.md](checklist.md). Run the live beat once on a scratch repo: ask the factory to
show its work as in beat 5, and see what it plans, whether the record and the reasons come out as the script says and
whether the three pages render. Stage the data for the run (see "Demo data plan" below). Re-check the as-of dates in the
field comparison file. Nothing for the demo is pre-queued in `factory/`.

| # | Slides | Demo beat | Script beat | Time | Notes |
|---|---|---|---|---|---|
| 1 | 1-3 | | 1 | 3 min | Title, factory map (observability gets a closer look), the three questions the loop cannot answer. **Lesson 4 hand-off check, on camera:** run the lesson 4 loop once on the staged data and show it still picks review, patch or a person for the open PRs, and that a PR flagged after the round cap is left alone. Say the loop works and then say the problem: when it does nothing for a task or a PR, the only way to learn why is to read its code. The one idea: every item the factory holds, and every tick it runs, says what it did and why. Say what is left for later up front: transcripts, cost, stall detection and alerts, throughput dashboards, many agents and hosting are named in row 15, not taught |
| 2 | 4-5 | | 2 | 3 min | Concept: Record, Queue, Log, History, tool-neutral. Land the vocabulary: a reason is a string a person can read, "no work" is not a reason, one record per tick, one record with three pages. Say who does what: the loop is plain code and writes the record, the pages only read it, no agent is called to explain the loop. Say once that `Upcoming`, `Past`, `Completed` and the reason wording are this sample's names. Slide 5 lists what we build |
| 3 | 6 | DEMO write one record per tick | 5 | 3 min | The live beat starts here and runs through rows 4 to 10 as one build, with the stage slides between the DEMO slides. Say out loud that nothing is pre-queued and no plan session queued this. Ask the factory, in the words of the exercise goal: each tick, write one record; give every candidate and every skipped run a reason; serve Queue, Log and Completed pages on the local machine; link every id. Show the plan run on that request and the tasks it writes to the task file: these are the lesson's own tasks, the first rows of the history. Then the loop picks the first task, the run-log writer (A1). Start the loop on a repeating tick now and leave it ticking for the rest of the build, so the record fills while the view is built |
| 4 | 7-9 | | 3 | 2 min | Record: A1 one run record per tick (8), A2 a reason on every item (9). Concept, one line on why it exists, spoken examples (each an _(illustration)_), what it takes to build, then "in our demo we use..." and "yours can be anything". Point back at the writer from row 3. First to shrink to one line each if time is short |
| 5 | 10 | DEMO add a reason to every candidate | 5 | 3 min | The reason function (A2) from the existing candidate and PR-state logic. Show it on a few made-up items _(illustration)_ before the server exists, so the strings are read before they are drawn. Three strings matter for the payoff: a task with no PR, a PR with no review, a PR with no patch, and the round-cap string. A person reviews and merges the factory's own PR |
| 6 | 11-12 | | 3 | 1 min | Queue: A3 an Upcoming view in pick order (12). Type, item, age and the reason from one route |
| 7 | 13 | DEMO serve the Upcoming page | 5 | 3 min | The server and the Queue page (A3). Open it in a browser tab and leave it open; glance at it between steps so the lesson's own tasks and PRs are seen moving from waiting to picked to PR open. If the page shows a task with the wrong reason, say so and fix it in the take: the reason is the lesson |
| 8 | 14-15 | | 3 | 1 min | Log: A4 a Past view of runs, filterable by outcome (15). The outcome filter is the first part to become a walk-through if time is short |
| 9 | 16 | DEMO serve the Past page and filter | 5 | 2 min | The Log page (A4) over the record the running loop has been writing since row 3. Filter to `skipped` and read the reasons in a column. Fallback: walk through the prepared filter instead of building it |
| 10 | 17-19 | | 3 | 2 min | History: finished work stays visible (17), A5 a Completed view that survives restarts (18), A6 link every item to its PR (19). Concept only; the build follows |
| 11 | 20 | DEMO link rows and show Completed | 5 | 3 min | The link helper (A6) used by all three pages, then the Completed page (A5). Do not open Completed as the finale yet: keep it for row 12. Confirm a task id opens its record and an `org/repo#n` opens GitHub. End of the live build; a person reviews and merges the factory's last PR |
| 12 | 21 | DEMO ask the three questions of the view | 6 | 4 min | The run on the staged data. Ask the three questions of the Queue page, one at a time: a task with no PR, a PR with no review, a PR with no patch. Each is answered by the reason string on its row, without opening code. Open the Log page, filter to `skipped`, read the reasons, follow a run row's link to its item. Show lesson 4's round cap as a row reading "waiting: round cap reached", not re-taught. **Finish on the Completed page:** the full history of the lesson's own work, every task from the plan run in row 3 with its PR and its dates. Restart the server and show the page is still full. If time is short, keep one question and the Completed page, never the live build |
| 13 | 22 | | 6 | (in row 12) | After: the loop explains itself. Walk the diagram once: tasks, loop, PRs, run record, web view. Three pages, one record, kept across restarts. Shown, not rebuilt |
| 14 | 23-24 | | 4 | 4 min | How the field differs, two slides: waiting work with a reason is rare (23, A2 and A3) and finished work stays while PR links vary (24, A5 and A6). Marks and chips only. Say "not in their docs" for a "-", never "has none". Do not claim any product cannot do something. Name the surface with the product (several answers sit on another surface, such as an automations feed or an API). Capabilities with no column to compare (A1, A4 filter, run row to item) get no claim. Takeaway: the view appears in different places and under different names; ours is one way, not the standard. Links go in the video description |
| 15 | 25-27 | | 7 | 1 min | Names ("Same job, different names"; the page names and the run record are this sample's), then where factories take it and what comes around the view later: destinations described, not prescribed. Out of scope: transcripts and an investigation skill, cost, stall detection and alerts, an event log with queue snapshots, throughput dashboards, fleet views and named agents, UI auth and hosting, attempt caps and cooldowns in their production forms. Each has its own lesson, order open; promise nothing. Shrinks to one slide if the cut runs long |
| 16 | 28 | | 8 | 1 min | Exercise hand-off: give your own loop the same behaviours, any agent and language. Outcomes only, no required tool. Close on the loop delta: the loop explains itself, so you open the view before you debug |

Timing: about 35 minutes in total, matching the script. The live beat (rows 3, 5, 7, 9 and 11, about 14 minutes of demo plus the
concept slides between them) is the variable part: let it run through the plan, the reason function on made-up items and the
server. Trim order is the script's: the outcome filter becomes a walk-through, the field comparison shrinks to the slides that
carry the reason and the link, names shrink to one slide, and the closing tour of Completed shrinks to a sentence.

**Open item for the cut:** the deck interleaves the DEMO slides (6, 10, 13, 16, 20) with the stage slides and puts the
three-questions run at slide 21, while the script narrates the live build as one beat (beat 5) before the run (beat 6)
and puts the field comparison (beat 4) before both. This sheet follows the deck order, so the field comparison is filmed
after the run. If you would rather film in script order, move slides 23 and 24 to follow slide 5 and keep the rest; the
build is unchanged either way.

## Demo data plan

The aim is that the lesson's own work shows up in the view as it is made, and that the end of the run has something to
answer every question. Two kinds of data, kept separate. Check that nothing in either names a client or an internal host
(the repo is public).

**The lesson's own tasks and PRs (made during filming).** The plan run in row 3 writes the tasks for the build. Expect
about four to six: the run-log writer, the reason fields, the server with the Queue page, the Log page, the Completed page
and link helper. Each opens a PR that a person reviews and merges, as before.

- the loop ticks on a repeating schedule from the moment the writer merges, so the Log fills with real ticks; ticks before
  that moment are not in the record, so tell the viewer the Log starts when the writer lands, and let the Completed page
  (read from the task file) carry the earlier history
- the Queue page is opened as soon as it exists, so the viewer sees the remaining tasks and PRs of the lesson in it
- the task file is not reset between the build and the run, so Completed shows every task of the lesson with its PR,
  start, PR opened and merged times

**Pre-staged data (before filming), so the three questions have answers:**

- [ ] a scratch repo with CI (lesson 3) and the lesson 4 loop already working on it
- [ ] one task with no PR yet, left ready, with a ready rule that the loop would pick next after the lesson's own tasks (question 1)
- [ ] a PR opened by a different account than the loop's, with no verdict on its current head commit (question 2)
- [ ] a PR with a `FINDINGS` verdict on its head commit that has not been patched yet, or whose patch was held back for the take (question 3)
- [ ] a PR the loop has already flagged after the round cap, with the marker lesson 4 uses, so "waiting: round cap reached" has a row
- [ ] a draft PR, so the Queue or Log shows a skip with its reason
- [ ] one task that is already finished with a merged PR, so Completed has older history under the lesson's own
- [ ] a reset note for reusing the data: restore the task file, delete the run record, remove the verdict comments and the marker, and reset the head commits, so a retake starts clean

If the staged data gets disturbed during a take (a PR closed, a head moved, a task marked done by mistake), use the reset
note, or switch to a spare set staged the same way.
