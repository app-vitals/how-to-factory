# Lesson brief: A plan that looks first and slices safely

> Agreed before any work is queued. One page. See [docs/lesson-playbook.md](../../docs/lesson-playbook.md).
> Scoping rule: lesson 1 explains plan and dev-task, builds a first version of each live, and runs a simple
> loop that ends at open PRs (a person reviews and merges). Every later lesson is ONE component, taught deep and built
> in that lesson, prioritized by expected, common and crucial; deeper dives come later. Order stays open. `factory/`
> is our demo; the lesson stays tool-neutral. The lesson's plan session queues lesson material only (brief, script,
> deck, exercise, options, run-of-show), never `factory/` changes: the factory builds `factory/` live.

## Component taught and band

[Planning / decomposition](../../docs/components.md), in the **Work in** band. The lesson zooms into spec to plan: what a
plan session does between a brief and a queue of tasks.

## The one idea

A plan earns trust by looking before it designs and slicing safely after: it reads the code, asks and states what the spec
leaves open, names what a change could break, gets a person's approval, and only then cuts tasks that are each safe to ship.

## Scope test

Does a single agent need it for a single flow? Yes. Any agent that works on an existing codebase produces better work from a
plan that has looked at that code first, and a plan that cuts unsafe slices breaks production between merges. This is the
core of the component, not an extra. The heavier forms (bundling, scoring, model tier) are destinations: named, not taught.

Source for the choice and ranking: the planning capabilities ranked by expected, common and crucial, from the Shipwright
inventory and the six-product plan grid (internal notes in `planning/lesson-depth-reset/`, not published in the lesson).

## In scope

Tier A: built and exercised. Every row of the capability table below.

- **Look:** check the queue for in-flight work (open tasks are valid dependencies), clarify and state assumptions, explore
  the code in layers and find what to reuse, flag complexity risks that can reshape the plan.
- **Design:** scan for breaking changes (consumers, backfill, the release pipeline), and save the design where every task
  links to it.
- **Approve:** a hard human approval before any task exists.
- **Slice:** cut tasks that are safe to ship on their own (add, migrate, remove), and mark tasks only a person can do.

## Out of scope

Tier B: named on one slide, each with the lesson that owns it. None is built here.

- Per-task test planning (which test layers apply, what each task adds or retires): owned by the verification lesson.
- How a spec gets written (the spec stays an input here): owned by the intake / spec-writing lesson.
- A shared standards file the plan reads first: owned by the instructions-and-standards lesson.
- Bundling tightly coupled tasks: owned by a later planning deep dive.
- Scoring tasks and choosing a model tier per task: owned by the same later planning deep dive.
- Autonomous mode and a decision log (the unattended variant of approval), second-model critique, parallel coordinators,
  tracker sync and methodology config: destinations in a later planning deep dive. Not prescribed here.

## The sample's concrete steps

1. Take the brief or conversation as input, and list the queue already open (Look).
2. Ask only the questions the code cannot answer; write what is still ambiguous as assumptions.
3. Explore the repo layer by layer; record what to reuse and what is new or modified.
4. Flag complexity risks; scan for consumers of every renamed, removed or constrained interface.
5. Write the design (approach, rejected alternatives, risks, breaking changes with consumers, assumptions) to a file.
6. A person approves the design. No task is written before this.
7. Slice into tasks: atomic, or add then migrate then remove. Each task links the design and states whether it is safe to
   deploy alone. Tasks that need a person are marked and written as human steps.
8. A person approves the task list; the tasks are queued.

## What the factory builds in this lesson

The existing factory plans and builds its own upgrade of the plan skill live on camera, from a brief given in the lesson.
Nothing is pre-queued in `factory/`, and no plan session queues this work: the factory is asked, plans it, and builds it
during the lesson run. The live build covers the spine, steps 2 to 7 (clarify and assumptions, layered exploration with
reuse, risks, the breaking-change scan, approval, slicing). The rest of Tier A is walked through as finished output.

## Capabilities

Grouped by stage and prioritized by expected, common and crucial. Examples marked (illustration) are constructed for the lesson and are not a
claim about any product. Counts are of the six surveyed products' documentation; "not documented" means the pages checked
do not say so, not that the product lacks it. Treated live: A1, A2, A3, A4, A6, A7. Walked through: A5, A8, A9. The A-numbers are stable ids, not the order.

| Stage | Capability | Concept | Why it exists | What it prevents (examples) | What it takes to build |
|---|---|---|---|---|---|
| Look | A8. Queue awareness | Before creating tasks, list what is already queued, here and in other sessions, skip duplicates, and let new tasks depend on open ones, so new work is queued on in-flight tasks without waiting for them. Expected: low. 0 of 6 (not a surveyed dimension). Crucial: high, because the reason is documented. | Avoids duplicate work; open tasks, including other sessions', are valid dependencies, so work queues with confidence without waiting for in-flight tasks. | Duplicate work and plans that stall waiting on in-flight tasks. (illustration) The same migration filed again under a new id, so two agents build it. (illustration) Task 7 needs a column an open task is adding; it lists that task as a dependency and is queued now. (illustration) A fix overlaps an in-flight refactor and is sequenced after it. | One read of the task list and a dedupe check by title and branch; allow foreign ids in dependencies. Small. |
| Look | A1. Clarify, then state assumptions | Ask the few questions the spec leaves open; write what is still ambiguous as a flagged assumption instead of choosing silently. Expected: high. Documented by 5 of 6 (clarify). | The plan is the last cheap place to catch a wrong reading. | A wrong reading of the spec built on in full. (illustration) "Notify the owner": the planner picks email, builds four tasks on it, and the owner wanted chat; nothing shows a choice was made. (illustration) "Recent orders" is assumed to be 30 days and stated, and the approver changes it to 90 before any task exists. (illustration) Who can delete a record is asked, not defaulted to "anyone". | A step that lists spec gaps that affect the design, asks only those, and adds an Assumptions section the approval step must show. Small. |
| Look | A2. Layered exploration with reuse | Map the spec onto the layers the code has (logic, views, API, data), read the likely files in each, and record what to reuse and what is new or modified. Expected: high. 6 of 6 read the code. | A design that names existing patterns yields tasks that fit the codebase. | Tasks that ignore what the code already has. (illustration) A date helper added while one exists two directories over. (illustration) A new endpoint style added when every other endpoint goes through one shared handler, so it skips auth and logging. (illustration) A task written for a layer the spec does not touch. | An exploration step with a per-layer checklist, read-only tools, and Reuse and New or modified lists in the design. Medium: the cost is tokens. |
| Look | A3. Complexity risks flagged before design | While exploring, call out coupled code, missing abstractions and spec items that look simple but are not; say what the design does about each. These are risks that can reshape the plan: the design may rework or simplify its approach because of them. | A risk named before the design can reshape the design. | A plan that looks right and then changes shape mid-work. (illustration) A "one-line" item touches a module six features share; it lands as a 1-hour task and takes two days, where flagged early the design isolates it behind a small adapter first. (illustration) Two items need the same missing abstraction, built once ahead of both instead of twice. (illustration) A shortcut on a table three services read is dropped for the safer route. | One block of flagged lines produced during exploration, and a rule that each is addressed or explicitly accepted. Small. |
| Design | A4. Breaking-change scan: consumers, backfill, release pipeline | For every rename, removal or new constraint, find every current consumer first, treat the build and release pipeline as an interface, and require a live query of real values before a data migration. Crucial: high. 0 of 6 document it. | These changes fail later and quietly: a consumer in a scheduled job or workflow does not show in a local search and stops without an error; a new constraint on a populated table fails on or corrupts existing rows. | Failures that arrive later and quietly. (illustration) A task renames an endpoint, the search misses a scheduled job that calls it, and the job silently stops. (illustration) A renamed build output that a deploy workflow still copies by the old name, shipping an empty bundle. (illustration) A unique constraint added to a table that already holds duplicates, so the migration fails halfway. | A scan that searches code, config, workflow files and scripts for each changed interface and lists the hits in the plan; a rule that a migration task's criteria include a live-data query. Medium: searching is easy, deciding what counts as an interface is the work. |
| Design | A5. Saved design, linked from every task | Write the full plan to one file and give every task a link to it, rather than rebuilding a summary from the task list. Expected: high. 4 of 6 save a plan to a file; 0 link it from tasks. | A summary built from the task list drops the design rationale and breaking-change notes the executing agent needs. | An executing agent working from a summary that dropped the rationale. (illustration) The agent opens a task, sees three bullets, and reverses a decision the design made on purpose. (illustration) "Keep the old endpoint" until the mobile release ships; only the design says so, so the agent removes it as dead code. (illustration) A reviewer asks why an approach was chosen; the rejected alternatives are in the design file. | Write the approved plan verbatim to a path and store that path on each task. Small, but it must be a rule: verbatim, not summarized. |
| Approve | A6. Hard approval before tasks exist | No task is created until a person approves the design, and again the task list. Expected: high. 5 of 6 gate on approval on the surfaces shown. | Tasks become autonomous work, so a plan error is multiplied downstream (likely reason; not stated by every source). | A plan error multiplied downstream. (illustration) A wrong design becomes ten queued tasks and ten PRs before anyone reads it. (illustration) The approver corrects one line of the Assumptions section and nothing built on it needs undoing. (illustration) The approach is rejected at the design, costing a paragraph of feedback instead of ten closed PRs. | A stop in the flow that prints the design and waits, iterating until approved. Small to write; the one step an automation cannot skip without a stated alternative. |
| Slice | A7. Slicing rules: add, migrate, remove | Each task is atomic (all consumers updated in the same change) or split into add the new, migrate the consumers, remove the old. A constraint on a populated table splits into nullable column, backfill with a live check, then the constraint. Crucial: high. 0 of 6 document slicing rules or dependencies. | A task that removes an interface while consumers remain is not safe to deploy alone: the gap is a broken intermediate state in production. | A broken intermediate state in production. Task 3 drops the old column; tasks 4 and 5 migrate readers; merged in order, production breaks between 3 and 5. (illustration) A "make the field required" task ships before the backfill, and every old row fails validation. (illustration) A rename cut as add, migrate, remove works at every merge point, so any one task can be reverted safely. | A slicing prompt with the three-step rule, a per-task "safe to deploy standalone" line, and a dependency table. Medium: the rule is short, applying it takes judgment the model must show. |
| Slice | A9. Human-only task flag | Mark tasks that need a person (console action, new secret, privileged command, production data, protected paths) and write their steps as instructions for a person. Crucial: high. 0 of 6 document it. | Some actions are blocked for the agent by the tool itself or are out of its reach, whatever access it was granted. | An agent claiming work it cannot do. (illustration) A task needs a secret the agent cannot create; it fails repeatedly and the queue stalls behind it. (illustration) A production data fix goes to a person with the exact query and the check to run afterwards. (illustration) A task touches a protected path, and the agent's push is rejected on every attempt. | A pass over each task with a short keyword list plus a judgment step, a boolean field, and a human-steps section. Small; the keyword list is local to the stack. |

## Prerequisites

- Lesson 1: the plan and dev-task skills and the task loop.

## Exercise outcomes

Outcomes only; no required tool, language or runner. Each covers one or more Tier A capabilities.

- Before it designs, the plan asks only what the code cannot answer and records what is left as visible assumptions (A1).
- The plan reads the code in layers and names what it reuses and what is new or modified, citing real files (A2).
- The plan lists complexity risks, and each is addressed in the design or explicitly accepted (A3).
- For a renamed, removed or constrained interface, the plan lists every consumer found, including any in the build or
  release pipeline, and requires a live check of real data before a migration (A4).
- The design is saved to one file, and every task links to it (A5).
- The plan stops for approval of the design before it creates any task (A6).
- A change that removes or renames something comes out as add, migrate, remove, or as one atomic task, and each task says
  whether it is safe to deploy alone (A7).
- The plan reads the open queue, skips a duplicate it would have filed, and accepts an open task as a dependency (A8).
- A task that needs a person is flagged and written as steps for a person (A9).

## Loop delta

**What does the loop do after this lesson that it could not before?**

The loop is proven end to end: the lesson opens by running lesson 1's loop for real, from a task to an open PR, as
narration only with nothing pre-queued. Then the loop consumes tasks that come from a plan that read the code, stated its
assumptions, scanned for what it could break, was approved by a person, and was cut into slices that are each safe to merge
alone, with duplicates skipped and person-only work flagged. Before, plan turned a brief straight into tasks; now it can
refuse an unsafe cut, and the factory has upgraded its own plan skill to do this.

**Does it cover what is expected, common and crucial for its one component?** (and name the deeper dives left for later lessons)

Yes. Every capability rated crucial (A4, A5, A7, A8, A9) and every one rated expected and common (A1, A2, A6) is in Tier A and
exercised; A3 is kept as cheap and documented. Left for later: per-task test planning (verification lesson), spec
writing (intake lesson), a shared standards file (standards lesson), and bundling, scoring and model tier, autonomous
mode, second-model critique, parallel coordinators, tracker sync and methodology config (a later planning deep dive).
