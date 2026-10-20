# Lesson 2: A plan that looks before it slices

**Component taught:** [Planning / decomposition](../../docs/components.md), in the Work in band: what a plan session does between a brief and a queue of tasks
**Video:** _added after publishing_

`factory/` in this repo is our demo. This lesson teaches the concept; Bun and Claude Code are what the demo happens to
use, never what you need. Each part below goes concept first, then "in our demo we use...", then "yours can be
anything".

## Names for this

In this lesson ours is the `plan` skill, with the design as a step inside it. Other factories call the step Plan mode
(Claude Code, Cursor, Copilot), Spec Mode (Factory) or a planning agent (OpenHands). Each term is sourced and dated in
[options.md](options.md#what-other-factories-call-it). Call yours whatever you like.

## The concept

A plan that slices straight from a request produces tasks that ignore what the code already has, and tasks that are
unsafe to merge one at a time. A plan that first reads the code, says what it assumed, names what the change could
break, gets a person to approve the design, and only then cuts tasks that each ship on their own produces work that fits.
Lesson 1's plan already does a light version: it skims the repo, asks what the code cannot answer, agrees an approach
with you, and gets the task list approved before writing it. This lesson makes each of those steps real, and adds the
ones it lacks.

The lesson opens with a short follow-up: lesson 1's loop, run for real on a small task, so the loop is proven from a
task to an open PR before we change what feeds it.

## What changes in the loop

The loop now consumes tasks that come from a design a human approved, and every task is safe to ship alone. The loop
itself does not change; the plan feeding it does.

## The simplest thing that works

An agent that is told: read the repo first, write down the design, stop and wait, and only then write tasks.

- **Understand:** ask only what the code cannot answer, record the rest as assumptions, read the code layer by layer,
  find what can be reused, flag what looks risky.
- **Decide:** scan for what the change could break, save the design to one file, and get a hard human approval before
  any task is written.
- **Slice:** cut the approved design into tasks that are each safe to ship, skip what is already queued, and mark what
  only a person can do.

- **In our demo we use:** a markdown skill, [`factory/skills/plan/SKILL.md`](../../factory/skills/plan/SKILL.md), that
  the factory itself upgrades live on camera. Nothing about that upgrade is queued ahead of time.
- **Yours can be anything:** a prompt you paste, a planning mode, a script, a person who reads the code and writes the
  design by hand. What matters is the order: look, design, approval, then tasks.

## The capabilities

Nine capabilities make up the lesson, each built or walked through. For each: the concept, why it exists, what breaks
without it, and what it takes to build, then how our demo does it and why yours can differ. Failures marked
_(illustration)_ are constructed for the lesson and are not a claim about any product. Where [options.md](options.md)
says how the field handles a step, the link goes to that section; some steps have no column in the field comparison, and
the lesson says so rather than guessing.

### Understand

#### 1. Clarify, then state assumptions

- **Concept:** ask the few questions the spec leaves open, and write what is still ambiguous as a flagged assumption
  instead of choosing silently.
- **Why it exists:** the plan is the last cheap place to catch a wrong reading.
- **Without it:** _(illustration)_ the spec says "notify the owner"; the planner picks email, builds four tasks on it, and
  the owner wanted chat. Nothing shows a choice was made, so it surfaces in review.
- **What it takes to build:** a step that lists the spec gaps that affect the design, asks only those, and adds an
  Assumptions section that the approval step must show. Small.
- **In our demo we use:** an added instruction in the plan skill, built live.
- **Yours can be anything:** a checklist you answer yourself, or a prompt that ends with "list what you assumed".
- **Field:** [asking before it designs](options.md#asks-before-it-designs),
  [assumptions or open questions](options.md#assumptions-or-open-questions-in-the-plan).

#### 2. Layered exploration, with reuse

- **Concept:** map the spec onto the layers the code has (logic, views, API, data), read the likely files in each, and
  record what to reuse and what is new or modified.
- **Why it exists:** a design that names existing patterns yields tasks that fit the codebase.
- **Without it:** _(illustration)_ the plan adds a date helper while one exists two directories over; review catches it,
  or a second copy ships.
- **What it takes to build:** an exploration step with a per-layer checklist, read-only tools, and Reuse and New or
  modified lists in the design. Medium; the cost is tokens.
- **In our demo we use:** a read-only exploration step in the plan skill that fills those two lists.
- **Yours can be anything:** an agent's search tools, an editor's find-all, or you reading the tree.
- **Field:** [reads the code before proposing](options.md#reads-the-code-before-proposing),
  [design output and its form](options.md#design-output-and-its-form).

#### 3. Complexity risks, flagged before the design

- **Concept:** while exploring, call out coupled code, missing abstractions and spec items that look simple but are not,
  and say what the design does about each.
- **Why it exists:** a risk named before the design can shape the design.
- **Without it:** _(illustration)_ a "one-line" item touches a module six features share; it lands as a one-hour task and
  takes two days.
- **What it takes to build:** one block of flagged lines produced during exploration, and a rule that each is addressed
  or explicitly accepted. Small.
- **In our demo we use:** a Risks section in the design file.
- **Yours can be anything:** a bulleted list at the top of your plan.
- **Field:** [names reuse, risks or breaking changes](options.md#names-reuse-risks-or-breaking-changes).

### Decide

#### 4. Breaking-change scan: consumers, backfill, release pipeline

- **Concept:** for every rename, removal or new constraint, find every current consumer first; treat the build and
  release pipeline as an interface; and require a live query of real values before a data migration.
- **Why it exists:** these changes fail later and quietly. A consumer in a scheduled job or workflow does not show in a
  local search and stops without an error; a new constraint on a populated table fails on, or corrupts, existing rows.
- **Without it:** _(illustration)_ a task renames an endpoint, the search misses a scheduled job that calls it, and the
  job silently stops.
- **What it takes to build:** a scan that searches code, config, workflow files and scripts for each changed interface and
  lists the hits in the plan, plus a rule that a migration task's criteria include a live-data query. Medium; searching is
  easy, deciding what counts as an interface is the work.
- **In our demo we use:** a Breaking changes section in the design file listing each interface and its consumers.
- **Yours can be anything:** `grep`, your editor, a dependency graph tool, or a teammate who knows the system.
- **Field:** [names reuse, risks or breaking changes](options.md#names-reuse-risks-or-breaking-changes). The
  release-pipeline and live-data checks have no column in the field comparison; see
  [not compared here](options.md#not-compared-here).

#### 5. A saved design, linked from every task

- **Concept:** write the full plan to one file and give every task a link to it, rather than rebuilding a summary from the
  task list.
- **Why it exists:** a summary built from the task list drops the rationale and breaking-change notes the executing agent
  needs.
- **Without it:** _(illustration)_ the agent opens a task, sees three bullets, and reverses a decision the design made on
  purpose.
- **What it takes to build:** write the approved plan verbatim to a path and store that path on each task. Small, but it
  must be a rule: verbatim, not summarized.
- **In our demo we use:** a markdown design file whose path goes into every task.
- **Yours can be anything:** a wiki page, a ticket, a doc; anything with a stable link.
- **Field:** [where the plan is saved](options.md#where-the-plan-is-saved).

#### 6. Hard approval before tasks exist

- **Concept:** no task is created until a person approves the design, and again the task list.
- **Why it exists:** tasks become autonomous work, so a plan error is multiplied downstream (a likely reason; not every
  source states it).
- **Without it:** _(illustration)_ a wrong design becomes ten queued tasks and ten PRs before anyone reads it.
- **What it takes to build:** a stop in the flow that prints the design and waits, iterating until approved. Small to
  write; the one step an automation cannot skip without a stated alternative.
- **In our demo we use:** an explicit stop in the plan skill; the live run waits for a person to say yes.
- **Yours can be anything:** a pull request on the design file, a chat reply, a ticket status. Approval handed to an
  automated check is a destination the field is trying, described under
  [where it goes from here](options.md#where-it-goes-from-here), not something to start with.
- **Field:** [approval before work starts](options.md#approval-before-work-starts),
  [changing the plan before approval](options.md#changing-the-plan-before-approval).

### Slice

#### 7. Slicing rules: add, migrate, remove

- **Concept:** each task is atomic (all consumers updated in the same change) or split into add the new, migrate the
  consumers, remove the old. A constraint on a populated table splits into a nullable column, a backfill with a live
  check, then the constraint.
- **Why it exists:** a task that removes an interface while consumers remain is not safe to deploy alone; the gap is a
  broken intermediate state in production.
- **Without it:** task 3 drops the old column; tasks 4 and 5 migrate readers. Merged in order, production breaks between 3
  and 5.
- **What it takes to build:** a slicing prompt with the three-step rule, a per-task "safe to deploy alone" line, and a
  dependency table. Medium; the rule is short, applying it takes judgment the model must show.
- **In our demo we use:** the slicing section of the plan skill, plus a line on every task.
- **Yours can be anything:** a rule you apply by hand while writing the list.
- **Field:** [how it becomes tasks](options.md#how-it-becomes-tasks),
  [order and dependencies between steps](options.md#order-and-dependencies-between-steps).

#### 8. Queue awareness

- **Concept:** before creating tasks, list what is already queued (here and in other sessions), skip duplicates, and let
  new tasks depend on open ones.
- **Why it exists:** it avoids duplicate work, and open tasks from other sessions are valid dependencies.
- **Without it:** _(illustration)_ the planner files the same migration again under a new id; two agents build it.
- **What it takes to build:** one read of the task list and a dedupe check by title and branch; allow foreign ids in
  dependencies. Small.
- **In our demo we use:** a read of the task queue at the start of the plan.
- **Yours can be anything:** a glance at your board or your issue list.
- **Field:** no column in the comparison; see [not compared here](options.md#not-compared-here).

#### 9. Human-only task flag

- **Concept:** mark tasks that need a person (a console action, a new secret, a privileged command, production data, a
  protected path) and write their steps as instructions for a person.
- **Why it exists:** some actions are blocked for the agent by the tool itself or are out of its reach, whatever access it
  was granted.
- **Without it:** _(illustration)_ an agent claims a task that needs a secret it cannot create, fails repeatedly, and the
  queue stalls behind it.
- **What it takes to build:** a pass over each task with a short keyword list plus a judgment step, a boolean field, and a
  human-steps section. Small; the keyword list is local to your stack.
- **In our demo we use:** a flag on the task and a human-steps section in its description.
- **Yours can be anything:** a label, a column, an assignee.
- **Field:** [tasks only a person can do](options.md#tasks-only-a-person-can-do).

## The live beat

The existing factory plans and runs its own upgrade of the plan skill, on camera. We ask it for the upgrade; it
explores the repo, writes a design, and stops. A person approves the design. Only then does it slice tasks, and the loop
builds them. The upgrade is not queued by a plan session and is not prepared in `factory/` beforehand: the factory is
asked, plans it, and builds it during the run. The live build covers the spine, capabilities 1, 2, 3, 4, 6 and 7; the
rest (5, 8, 9) are walked through as finished output.

## Build steps

Numbers match [script.md](script.md).

1. Follow-up: run lesson 1's loop for real on a small task (steps 1-2).
2. Concept: why look before slicing, and what the design holds (steps 3-4).
3. How the field differs (step 5).
4. Live: the factory plans its own upgrade of the plan skill and stops for approval (step 6).
5. Approve, slice and let the loop build it (step 7).
6. Names, where factories take it, the exercise (steps 8-9).

## How the field does it

Details, sources and as-of dates live in [options.md](options.md); product-by-product cells live in the
[landscape matrix](../../landscape/README.md).

| Approach | Example | Pick this if |
|---|---|---|
| Read-only plan mode, one person approves, same session builds | Plan modes in Claude Code, Cursor, Copilot, Devin, Factory | You work one change at a time in one session |
| Plan written to a file, handed to a second agent | OpenHands planning agent example | You want a plain file as the handoff |
| Plan split into units by a coordinator | Devin managed sessions, Factory Missions, Claude Code `/batch` | The change is large and parts are independent |
| Plan becomes tickets in a tracker | Devin PRD-to-tickets recipe, Copilot issue drafts | Your queue already lives in a tracker |

## Where factories take it

Described, not prescribed. Factories point toward coordinators that split a plan and run the pieces in parallel,
tracker tickets as the output, and a check standing in for the human approval. See
[options.md](options.md#where-it-goes-from-here).

Out of scope here, each owned by another lesson and named as a destination, never built: per-task test planning (the
verification lesson), how a spec gets written (a later intake lesson), a shared standards file the plan reads (the
instructions-and-standards lesson), and bundling tightly coupled tasks, scoring tasks and choosing a model tier (a later
planning deep dive). The same deep dive owns the unattended variant of approval with a decision log, a second model
reading the plan, parallel coordinators, tracker sync and configuring the planning method. Order stays open.

## Exercise and go further

See [exercise.md](exercise.md).

## Files

- [brief.md](brief.md): the one-page lesson brief
- [script.md](script.md), [options.md](options.md), [exercise.md](exercise.md)
