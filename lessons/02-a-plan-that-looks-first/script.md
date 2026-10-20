# Script: A plan that looks before it slices

Narrated by Dan over the slides (face cam in a screen corner). Slides carry labels; this file carries the words.
Every demo beat in the [run-of-show](run-of-show.md) points at a numbered step here, and the step numbers match the
build steps in the [README](README.md).

Framing rule: the concept first (tool-neutral), then "in our demo we use...", then "yours can be anything". Bun and
Claude Code are our demo choices, never requirements. Nothing for the live beat is pre-queued in `factory/`: the factory
is asked, plans it, and builds it during the run.

Field claims: every claim about another product below names the section of this lesson's field comparison file
(the sources file in this folder) it comes from, in the form "Field: <section name>". That section holds the
first-party URL and the as-of date. Say only what the cell says; "not in their docs" means the pages checked do not say, never that the
product lacks it.

Failures marked _(illustration)_ are constructed for the lesson and are not a claim about any product. Say so each time.

## Running time

Estimates for the finished video, narration plus the two demos. The two demos are the variable parts.

| Part | Step | Estimate |
|---|---|---|
| Follow-up: lesson 1's loop, run for real | 1 | 5 min |
| What a skimming plan gets wrong | 2 | 2 min |
| Concept: look, design, approve, then slice | 3 | 3 min |
| The nine capabilities (concept, why, failure, build) | 4 | 15 min |
| How the field differs | 5 | 5 min |
| Live: the factory plans its own upgrade | 6 | 10 min |
| After approval: slice, then the loop builds it | 7 | 8 min |
| Names, and where factories take it | 8 | 3 min |
| Exercise | 9 | 2 min |
| **Total** | | **about 53 min** |

If the cut runs long, trim step 4's walk-through of the three capabilities shown as finished output (5, 8, 9) to one
minute each; do not trim the live beat.

## Talking points

1. **Follow-up: run lesson 1's loop for real** (about 5 min). Open by saying lesson 1 built the loop but ran nothing;
   now we run it.
   - **DEMO.** Give the loop one small task, for example "add a `greet(name)` function", and run it. This is narration
     over a real run: the presenter may talk over getting it running, and nothing is pre-queued in `factory/`. Show the
     loop pick the task, dev-task branch and work, and an open PR at the end. A person reviews and merges, as before.
   - Say what the viewer should notice: a task goes in, an open PR comes out, and nobody typed the steps in between.
2. **What is missing** (about 2 min). The loop is only as good as the tasks it is fed. Lesson 1's plan does a light
   version of looking: it skims the repo and agrees an approach, but its design never names risks or what could break and
   who depends on it, and its hard stop is on the task list, not the design. Ask what happens when a plan has not looked
   properly: tasks that rebuild what exists, name files that are not there, or break something nobody checked.
3. **Concept: look, design, approve, then slice** (about 3 min). Tool-neutral. Inputs are a brief or a conversation; the
   output is tasks. The idea in one sentence: a plan earns trust by looking before it designs and slicing safely after.
   Three groups of capability sit in front of and inside slicing.
   - **Understand:** ask only what the code cannot answer, explore the repo in layers, find what can be reused, flag
     what looks risky.
   - **Decide:** scan for what the change could break and who depends on it, save the design to one file, and get a
     hard human approval before any task is written. This is a stop, not a suggestion.
   - **Slice:** cut the approved design into tasks that are each safe to ship alone, skip what is already queued, and
     mark what only a person can do.
   - Say what is left out on purpose: per-task test planning, how specs are written, a shared standards file, and
     bundling, scoring and model tier. Each is named again in step 8.
4. **The nine capabilities** (about 15 min, roughly 1.5 min each). Show the design slide first: approach, rejected
   alternatives, risks, and breaking changes with their consumers. Say it is short, and that naming consumers lets
   someone say "no, that one is used elsewhere" before work exists. Then, for each capability, say the concept, why it
   exists, the failure without it, and what it takes to build. Close each with "in our demo we use..." and "yours can
   be anything". Capabilities 1, 2, 3, 4, 6 and 7 are built live in step 6; 5, 8 and 9 are shown as finished output in
   step 7.
   - **Understand**
     - **1. Clarify, then state assumptions.**
       - Concept: ask the few questions the spec leaves open; write what is still ambiguous as a flagged assumption
         instead of choosing silently.
       - Why: the plan is the last cheap place to catch a wrong reading.
       - Failure _(illustration)_: the spec says "notify the owner"; the planner picks email, builds four tasks on it,
         and the owner wanted chat. Nothing shows a choice was made, so it surfaces in review.
       - Build: a step that lists the spec gaps that affect the design, asks only those, and adds an Assumptions
         section the approval step must show. Small.
       - Demo: an added instruction in the plan skill. Yours: a checklist you answer yourself, or a prompt that ends
         with "list what you assumed".
     - **2. Layered exploration, with reuse.**
       - Concept: map the spec onto the layers the code has (logic, views, API, data), read the likely files in each,
         and record what to reuse and what is new or modified.
       - Why: a design that names existing patterns yields tasks that fit the codebase.
       - Failure _(illustration)_: the plan adds a date helper while one exists two directories over; review catches
         it, or a second copy ships.
       - Build: an exploration step with a per-layer checklist, read-only tools, and Reuse and New or modified lists in
         the design. Medium; the cost is tokens.
       - Demo: a read-only exploration step in the plan skill. Yours: an agent's search tools, an editor's find-all, or
         you reading the tree.
     - **3. Complexity risks, flagged before the design.**
       - Concept: while exploring, call out coupled code, missing abstractions and spec items that look simple but are
         not, and say what the design does about each.
       - Why: a risk named before the design can shape the design.
       - Failure _(illustration)_: a "one-line" item touches a module six features share; it lands as a one-hour task
         and takes two days.
       - Build: one block of flagged lines produced during exploration, and a rule that each is addressed or explicitly
         accepted. Small.
       - Demo: a Risks section in the design file. Yours: a bulleted list at the top of your plan.
   - **Decide**
     - **4. Breaking-change scan: consumers, backfill, release pipeline.**
       - Concept: for every rename, removal or new constraint, find every current consumer first; treat the build and
         release pipeline as an interface; require a live query of real values before a data migration.
       - Why: these changes fail later and quietly. A consumer in a scheduled job or workflow does not show in a local
         search and stops without an error; a new constraint on a populated table fails on, or corrupts, existing rows.
       - Failure _(illustration)_: a task renames an endpoint, the search misses a scheduled job that calls it, and the
         job silently stops.
       - Build: a scan that searches code, config, workflow files and scripts for each changed interface and lists the
         hits in the plan, plus a rule that a migration task's criteria include a live-data query. Medium; searching is
         easy, deciding what counts as an interface is the work.
       - Demo: a Breaking changes section listing each interface and its consumers. Yours: `grep`, your editor, a
         dependency graph tool, or a teammate who knows the system.
     - **5. A saved design, linked from every task.**
       - Concept: write the full plan to one file and give every task a link to it, rather than rebuilding a summary
         from the task list.
       - Why: a summary built from the task list drops the rationale and breaking-change notes the executing agent
         needs.
       - Failure _(illustration)_: the agent opens a task, sees three bullets, and reverses a decision the design made
         on purpose.
       - Build: write the approved plan verbatim to a path and store that path on each task. Small, but it must be a
         rule: verbatim, not summarized.
       - Demo: a markdown design file whose path goes into every task. Yours: a wiki page, a ticket, a doc; anything
         with a stable link.
     - **6. Hard approval before tasks exist.**
       - Concept: no task is created until a person approves the design, and again the task list.
       - Why: tasks become autonomous work, so a plan error is multiplied downstream. Say this is a likely reason and
         that not every source states it.
       - Failure _(illustration)_: a wrong design becomes ten queued tasks and ten PRs before anyone reads it.
       - Build: a stop in the flow that prints the design and waits, iterating until approved. Small to write; the one
         step an automation cannot skip without a stated alternative.
       - Demo: an explicit stop in the plan skill. Yours: a pull request on the design file, a chat reply, a ticket
         status.
   - **Slice**
     - **7. Slicing rules: add, migrate, remove.**
       - Concept: each task is atomic (all consumers updated in the same change) or split into add the new, migrate
         the consumers, remove the old. A constraint on a populated table splits into a nullable column, a backfill
         with a live check, then the constraint.
       - Why: a task that removes an interface while consumers remain is not safe to deploy alone; the gap is a broken
         intermediate state in production.
       - Failure: task 3 drops the old column; tasks 4 and 5 migrate readers. Merged in order, production breaks
         between 3 and 5. (Say this one is also constructed for the lesson.)
       - Build: a slicing prompt with the three-step rule, a per-task "safe to deploy alone" line, and a dependency
         table. Medium; the rule is short, applying it takes judgment the model must show.
       - Demo: the slicing section of the plan skill plus a line on every task. Yours: a rule you apply by hand while
         writing the list.
     - **8. Queue awareness.**
       - Concept: before creating tasks, list what is already queued, here and in other sessions, skip duplicates, and
         let new tasks depend on open ones.
       - Why: it avoids duplicate work, and open tasks from other sessions are valid dependencies.
       - Failure _(illustration)_: the planner files the same migration again under a new id; two agents build it.
       - Build: one read of the task list and a dedupe check by title and branch; allow foreign ids in dependencies.
         Small.
       - Demo: a read of the task queue at the start of the plan. Yours: a glance at your board or issue list.
     - **9. Human-only task flag.**
       - Concept: mark tasks that need a person (a console action, a new secret, a privileged command, production
         data, a protected path) and write their steps as instructions for a person.
       - Why: some actions are blocked for the agent by the tool itself or are out of its reach, whatever access it was
         granted.
       - Failure _(illustration)_: an agent claims a task that needs a secret it cannot create, fails repeatedly, and
         the queue stalls behind it.
       - Build: a pass over each task with a short keyword list plus a judgment step, a boolean field, and a
         human-steps section. Small; the keyword list is local to your stack.
       - Demo: a flag on the task and a human-steps section in its description. Yours: a label, a column, an assignee.
5. **How the field differs** (about 5 min; slides). Say only what the cells say, and say "not in their docs" where a
   cell says so. The surfaces differ (a read-only mode, a planning agent), so name the surface when you name the
   product. Do not claim any product cannot do something.
   - Reading the code first (capability 2): Devin, Factory, Copilot, OpenHands, Cursor and Claude Code each document a
     planning surface that can look at the code before it proposes. Field: Reads the code before proposing.
   - Asking first (capability 1): Cursor and Claude Code ask questions as a step of planning; Devin has a question
     tool; Factory and Copilot ask partly, as questions that arrive while researching or with the draft; the OpenHands
     example tells its planner not to ask. Field: Asks before it designs.
   - Assumptions (capability 1): no page checked shows a named assumptions part; Copilot's standard plan has open
     questions. Field: Assumptions or open questions in the plan.
   - Reuse, risks and breaking changes (capabilities 2, 3 and 4): most pages do not say the plan must name them.
     Copilot names constraints and OpenHands asks for constraints and rationale; for Devin and Cursor it is not in
     their docs. The release-pipeline and live-data checks in capability 4 have no column in the comparison, so say
     nothing about the field there. Field: Names reuse, risks or breaking changes; Not compared here.
   - Where the plan is saved (capability 5): Factory saves optionally, OpenHands writes `PLAN.md`, Cursor and Claude
     Code write a file, Copilot offers an editor tab. None of the six is documented as linking the saved plan from each
     task. Field: Where the plan is saved.
   - Approval (capability 6): Devin, Factory, Copilot, Cursor and Claude Code document a human approving before work
     starts; for OpenHands it is not in their docs, and its example script runs the second agent straight after the
     first. Field: Approval before work starts; Changing the plan before approval.
   - Slicing (capability 7): the shown plan modes mostly hand the plan to the same session. Ordering is partly shown by
     Cursor and OpenHands; slicing rules are not in the docs of any shown surface. Field: How it becomes tasks; Order and
     dependencies between steps.
   - Queue awareness (capability 8): not compared; say so. Field: Not compared here.
   - Person-only tasks (capability 9): not in their docs for any of the six. Field: Tasks only a person can do.
   - Takeaway: products slice in different places, and no product in the grid documents all of design, approval and
     slicing in one step. Ours is one way, not the standard.
6. **DEMO the factory plans its own upgrade of the plan skill** (about 10 min). The live beat. The existing factory, the
   one built in lesson 1, is asked to upgrade its own plan skill to look first. Nothing is pre-queued in `factory/`, and
   no plan session queued this work: say that out loud on camera.
   - Ask: "upgrade the plan skill so its design names risks and breaking changes with their consumers, and it stops
     for approval of the design before it writes tasks."
   - Show the plan skill run on that request. It lists the open queue, asks only what the code cannot answer, writes
     what is still unclear as assumptions (1), explores the repo layer by layer and records what to reuse and what is
     new or modified (2), flags complexity risks (3), and scans for consumers of every interface the upgrade changes
     (4). Narrate each as it appears.
   - It writes a design with an approach and a rejected alternative, and stops (6). Point at the stop: no tasks exist
     yet.
   - Read the design out loud, assumptions included, and approve it. This is the human step the lesson is about.
7. **After approval: slice, then the loop builds it** (about 8 min). The plan slices the approved design into tasks that
   name real files (7). Show that the tasks point at files that exist, and that each says whether it is safe to deploy
   alone and carries a dependency line. The loop runs dev-task on each, and the PRs are the upgraded plan skill. A person
   reviews and merges. The upgrade is the factory's own work, planned and built in this run, not queued by a plan
   session.
   - Walk through the finished output for the three capabilities not built live: the design file path on every task
     (5), the queue read and a duplicate it skipped (8), and a task flagged for a person with its steps written for a
     person (9). Say these are shown as output, not rebuilt.
   - Yours can be anything: the same order works with any agent and any runner.
8. **Names, and where factories take it** (about 3 min). `plan` is only this sample's name; other factories say Plan
   mode (Claude Code, Cursor, Copilot), Spec Mode (Factory) or planning agent (OpenHands). Field: What other factories
   call it. Destinations, described not prescribed: a coordinator that splits a plan and runs pieces in parallel,
   tracker tickets as the output, a check standing in for the approval. Field: Where it goes from here. Say what is
   deliberately out of scope, each with its own lesson and order open, promising nothing: per-task test planning (the
   verification lesson), how specs are written (an intake lesson), a shared standards file (the standards lesson), and
   bundling, scoring and model tier, the unattended variant of approval, a second model reading the plan, parallel
   coordinators, tracker sync and configuring the planning method (a later planning deep dive).
9. **Exercise** (about 2 min). The [exercise](exercise.md) has you give your own planning step the same behaviours, with
   an agent and language of your choice. Say it lists outcomes only and names no required tool.
