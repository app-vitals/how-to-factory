# Lesson backlog

A pool of candidate lessons, grouped by [component](../docs/components.md) and sorted into four tentative tiers.
There is no numbering and no syllabus: lessons are chosen one at a time. Every lesson takes one component deep, covering what is
expected, common and crucial for it and building it live, then shows where different factories take it. Fuller deep dives come in later lessons.

Shipwright and the "origins" posts are background material and inputs, not a syllabus or a prescribed order.
Component and skill names in lessons are sample names, so call yours whatever you like.

The fuller plan and dev-task skills grow lesson by lesson, built by the factory itself: spec to plan expands plan;
verification, review and release extend dev-task.

Entries are options that plug into the loop, not steps. They assume no particular agent, language, runner or
order, and a lesson may build any of them with whatever toolchain the student uses.

**Order not final; lessons are chosen one at a time; within a tier the order is open.** The tiers follow one rule, the
trust ladder: the factory builds its own next parts, so earlier lessons make unattended building safer, and scale and
operations come later. The tiers are a reading aid, not a syllabus. New lessons follow the
[lesson playbook](../docs/lesson-playbook.md).

## Tier 1: Make the output trustworthy

Verification, Review and Release, plus the instructions and standards the factory reads from day one.

### Verification
- Make the agent run lint, typecheck and tests before it says "done"
- Require CI to pass before anything merges
- Design a test system for a repo that has none
- Compare how factories verify: who decides it is done, whether it runs the app itself, how it keeps going. Research is banked in `landscape/field-grid` and the `verify-*` columns of `landscape/matrix.json`

### Review
- Have a second agent review the PR
- Set confidence thresholds for AI review comments
- Decide what an AI reviewer may post or approve

### Release
_Depends on: Review and Verification._

- Let an agent merge when checks are green
- Add a canary step before promoting to everyone
- Detect regressions after merge and open a revert

### Instructions and standards (new candidate)

- Write a day-one instructions file the agent reads every session
- Add per-directory rules and a shared standards file every phase reads
- Enforce a standard with a check, not just a request

## Tier 2: Make the work better and easier to feed

Spec to plan, and Intake including triage and readiness.

### Planning / decomposition
- Break a conversation or spec into small tasks with dependencies
- Keep tasks in a durable queue instead of a chat window
- Estimate task size and pick a model tier per task
- Spec to plan: what a plan session does, in four activities plus two extras. Understand and Decide are taught by [lesson 2, A plan that looks before it slices](02-a-plan-that-looks-first/brief.md); the other parts are in the outline below

#### Spec to plan (outline)

A plan session turns an approved spec into a queue of tasks. One way to cut it:

1. **Understand** - clarify the ask, explore the code, find similar features to reuse, decide where the solution goes. _Taught by [lesson 2](02-a-plan-that-looks-first/brief.md)._
2. **Decide** - flag complexity risks; list breaking changes with their consumers, and any added constraint that needs
   a backfill first; research when the approach is unclear; get the design approved before slicing. _Taught by [lesson 2](02-a-plan-that-looks-first/brief.md)._
3. **Prove** - plan testing and verification: which test layers apply, and what each task adds or retires. _Owned by the Verification lesson._
4. **Slice** - small shippable tasks with dependencies; bundle tightly coupled ones into one PR; flag work only a human
   can do; optionally estimate size and pick a model tier. _Lesson 1 slices simply; bundling, estimates and model tiers (the extras) belong to a later planning lesson that is not yet scheduled._

Two extras: a standards file the plan reads first (owned by the Instructions and standards lesson), and an approval point
between design and tasks (taught in lesson 2).

Shipwright's plan session is one worked example of this shape, not the standard; other factories name and order the steps
differently.

##### How the field does it

Each claim is from the product's own page, fetched 2026-10-19. The full grid, with every surface, the pages checked and the
gaps, is in [`landscape/plan-grid/`](../landscape/plan-grid/README.md).

- Devin CLI Plan mode (https://docs.devin.ai/cli/reference/commands.md, as of 2026-10-19): the plan tool set is read-only
  (search, read, a question tool), and leaving Plan mode shows an approval prompt before anything is implemented.
- Factory Spec Mode (https://docs.factory.com/autonomy-and-safety/specification-mode.md, as of 2026-10-19): read-only until
  the plan is approved; the plan can optionally be saved as a Markdown file, and the pages show no fixed template.
- OpenHands planning agent (https://docs.openhands.dev/sdk/guides/agent-custom.md, as of 2026-10-19): an SDK example where a
  planning agent can only write `PLAN.md`, to a fixed outline of objective, context, approach and steps, then a second agent
  builds from it; the example has no pause for a person.
- Cursor Plan Mode (https://cursor.com/docs/agent/plan-mode.md, as of 2026-10-19): asks clarifying questions, researches the
  codebase, then opens an editable plan; the person approves by clicking Build.
- GitHub Copilot plan mode (https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-plan-mode,
  as of 2026-10-19): read-only research, then a summary, steps and open questions; nothing changes until the person approves.
- Claude Code Plan mode (https://code.claude.com/docs/en/permission-modes, as of 2026-10-19): explores without editing,
  writes a plan file you can edit, and offers approve or keep planning.

Across these: reading the code first and a human approval before work starts are common; asking the plan to name reuse or
breaking changes is mostly left to the person's prompt, and how a plan becomes tasks varies by product.

### Intake / spec
- Turn a chat conversation into a written spec file
- Accept work from an issue or ticket instead of a prompt
- Triage incoming work: prioritize, dedupe and check it is ready before an agent starts (new candidate)
- Define "ready": dependencies satisfied and acceptance criteria present (new candidate)

## Tier 3: Scale it

Execution depth including the execution environment, multi-agent coordination and the scheduled loop, and the chat interface.

### Execution
- Run one task in an isolated git worktree and open a PR
- Write the test first, then the code
- Run several tasks in parallel without collisions
- Choose where the agent runs: worktree, container or restricted sandbox (new candidate: execution environment)

### Coordination / loop
_Depends on: the execution environment lesson, before parallel runs._

- Make one tick that picks the next task and dispatches it
- Schedule the loop on a cron
- Have a coordinator assign work to specialist agents
- Claim a task in a shared queue so two agents never take the same one (new candidate: multi-agent coordination)
- Cap how many agents run at once (new candidate: multi-agent coordination)

### Chat interface
- Drive an agent from a chat app
- Build a small harness around an agent runtime
- Post progress and approval requests back to a thread

## Tier 4: Run it for real

Governance, Feedback / maintenance, Observability / ops, and memory mining and learning.

### Governance / human-in-the-loop
_Depends on: Review and Release._

- Write an autonomy policy file every phase reads
- Flag tasks that need a human and route them
- Keep an audit trail beyond the PR diff
- Decide which credentials and tools an agent may hold, and how access is revoked (new candidate: security and access, a sub-topic of Governance)

### Feedback / maintenance
_Depends on: Observability / ops._

- Schedule a scan and turn findings into tasks
- Triage errors from an error tracker automatically
- Track throughput and cycle time on a dashboard
- Track rework and merge rate, not just spend

### Observability / ops
_A labelled sub-section of Feedback / maintenance, as in [components](../docs/components.md), not a component of its own._

- Read a run transcript to see why the agent did what it did
- Keep a run log of what each tick did
- Track token and cost spend per task and per day
- Detect a stalled loop (stuck claims, growing queue age)
- Alert when the factory goes quiet
- Run the factory itself: secrets, sandboxing, rolling out a new agent image
- Write an on-call runbook for an agent

### Memory / learning
- Write an instructions file and improve it from corrections
- Mine past sessions for recurring lessons
- Package repeatable work as reusable skills
