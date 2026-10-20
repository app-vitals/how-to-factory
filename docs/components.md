# Software factory components

A living, vendor-neutral map of the parts a software factory is made of. Every
factory, from a single person with a chat window to a scheduled multi-agent
pipeline, ends up with some version of each of these.

**Names are your choice.** There are no canonical component names. The "also
called" line under each component lists names in common use, and none of them
is the standard. When you build your own, name things whatever makes sense to
you and your team.

**On sources.** This doc makes no claims about specific commercial products. Product-by-product
comparisons live in the landscape matrix, where every cell carries a source URL and an as-of date.
Where this doc mentions Shipwright, it is describing App Vitals' own factory, as one example among several.
Nothing here requires a particular agent, language, runner or hosting choice; the "Also called" lists and examples
name products only as illustrations.

**How to read each entry.** What it is, why it exists, the simplest version that works, and the range of
implementations you will see as factories grow. The range is a map of what exists, and nothing in it
is a recommended order.

---

## The four bands

The components group into four bands. Each lesson zooms into one band of the map.

- **Work in:** Intake, Planning.
- **Work done:** Execution, Verification, Review, Release.
- **Keeps it moving:** Coordination / loop, Chat interface.
- **Keeps it safe and healthy:** Governance, Feedback / maintenance, Memory / learning.

Entries marked **(proposed)** are candidate additions or splits that are not final; see the notes at the end.

---

## 1. Intake / spec

- **Also called:** requirements, ticket, brief, PRD, issue, prompt.
- **What it is:** how a unit of work enters the factory and gets written down well enough to act on.
- **Why it exists:** an agent can only be as good as the request it receives. Ambiguity at the door becomes rework downstream.
- **Simplest version:** you type the request into a chat session.
- **Range:** a markdown spec file in the repo; an issue template; an assigned ticket in a tracker; a Q&A session that produces a spec; webhooks from chat, email or monitoring; a structured form.
- **Shipwright example:** an interactive session that turns a conversation into a product spec file.

## 1b. Triage and readiness (proposed)

- **Also called:** triage, prioritization, grooming, readiness check, definition of ready, dedupe.
- **What it is:** the step between Intake and Planning where incoming work is prioritized, deduplicated and checked for dependencies and acceptance criteria before it is marked ready.
- **Why it exists:** not everything that arrives should be built, or built now. Unready work wastes an agent run and a reviewer's time.
- **Simplest version:** you skim the request list and pick the one that is clear enough to start.
- **Range:** a human sorting a backlog; a checklist a ticket must satisfy before it gets a "ready" label; automatic duplicate detection; dependency checks that hold work until its prerequisites land; an agent that scores, merges and rejects incoming requests.
- **Shipwright example:** a task becomes eligible only when its dependencies are satisfied, and tasks that need a person are flagged instead of started.

## 2. Planning / decomposition

- **Also called:** plan, plan-session, spec, decompose, breakdown, backlog grooming.
- **What it is:** turning an ambiguous ask into a scoped, ordered list of tasks that can each be done and checked independently.
- **Why it exists:** big asks overflow an agent's working context and hide dependencies. Small, well-bounded tasks succeed more often and fail more cheaply.
- **Simplest version:** ask the agent for a numbered checklist and work through it.
- **Range:** a plan file in the repo; tasks as issues; a durable task queue with dependencies, size or model-tier estimates and a "needs a human" flag; a coordinator agent that decomposes and assigns.
- **Shipwright example:** a planning command writes scored tasks, with dependencies, to a task store that survives restarts.
- **Depth:** a plan that looks before it slices clarifies and states assumptions, explores the code in layers for reuse, flags complexity risks, scans for breaking changes (consumers, backfill, the release pipeline), saves a design every task links to, waits for a person's approval, and cuts tasks that are each safe to ship alone, skipping queued duplicates and flagging person-only work. Lesson 2 teaches these. Bundling, scoring and model tier, autonomous mode with a decision log, second-model critique, parallel coordinators, tracker sync and methodology config are candidates for later deep dives; test planning belongs to Verification and a shared standards file to Instructions and standards.

## 3. Execution

- **Also called:** dev-task, feature-dev, implement, build, code, work.
- **What it is:** where an agent actually writes and runs code for one task.
- **Why it exists:** this is the step that produces the change. It also needs isolation so the agent cannot clobber work in progress.
- **Simplest version:** one agent, one task, on a branch, ending in a pull request.
- **Range:** your own working tree; a git worktree per task; a container or VM per task; one agent versus several in parallel; test-first prompts; sub-agents for research or review inside the task.
- **Shipwright example:** a task command claims one task, works in a worktree and opens a PR, never touching the main branch.

## 3b. Execution environment (proposed)

- **Also called:** sandbox, runner, workspace, dev environment, isolation.
- **What it is:** the place an agent's work runs: the machine or container, its filesystem checkout, its network access and the secrets it can see.
- **Why it exists:** an agent that can run code can also break things. Where it runs sets how much damage a mistake or a bad instruction can do.
- **Simplest version:** your own laptop and working tree.
- **Range:** a git worktree per task; a container or VM per task; a sandbox with restricted network access; short-lived credentials injected only into the environment that needs them; a hosted runner pool. Today this is one bullet in Execution's range, and this entry would split it out.
- **Shipwright example:** each task runs in its own git worktree, with credentials supplied through the agent's environment configuration.

## 4. Verification

- **Also called:** testing, checks, CI, quality gates, validation.
- **What it is:** evidence that the work does what it should, gathered by something other than the agent's own say-so.
- **Why it exists:** agents can report success that did not happen. Machine-checked gates are what make "done" mean something.
- **Simplest version:** run the repo's existing test, lint and typecheck commands before opening the PR.
- **Range:** local checks only; required CI checks with branch protection; coverage thresholds; speed budgets per test layer; smoke tests against a deployed copy; a test-readiness effort that designs the test system before building features.
- **Shipwright example:** a staged test-readiness pipeline plus shared principles that execution and review both read.

## 5. Review

- **Also called:** code review, PR review, approval, second opinion.
- **What it is:** a checkpoint where someone other than the author, whether human, a second AI pass or both, looks at the change before it ships.
- **Why it exists:** authors miss their own mistakes. Review catches bugs, scope drift and policy violations.
- **Simplest version:** you read the diff yourself before merging.
- **Range:** human-only review; an AI reviewer that comments and a human who approves; confidence thresholds on AI findings; policy files defining what an AI reviewer may post or approve; self-authored changes downgraded to comments.
- **Shipwright example:** a review command whose posting rights come from a policy file.

## 6. Release

- **Also called:** merge, deploy, ship, rollout, promote.
- **What it is:** getting an approved change into the hands of users, and being able to undo it.
- **Why it exists:** merged code is not shipped code. Release is the highest-blast-radius step, so how much authority an agent gets here is a deliberate choice.
- **Simplest version:** an agent opens the PR and a human merges and deploys.
- **Range:** human merge, human deploy; agent merge on green checks; automatic deploy to staging; canary then promote; post-merge regression detection with automatic revert PRs. This is the widest spread of any component.
- **Shipwright example:** separate merge and deploy commands, with deploy as an opt-in canary-then-promote pipeline.

## 7. Governance / human-in-the-loop

- **Also called:** policy, autonomy levels, approvals, guardrails, audit.
- **What it is:** the rules for what the factory may do on its own, when it must stop and ask a person, and the record of what it did.
- **Why it exists:** autonomy without limits is a liability. Governance lets you grant trust incrementally and prove what happened.
- **Simplest version:** you approve every action when the agent asks.
- **Range:** permission prompts; an allow-list of tools; a policy file read by every phase; tasks flagged as needing a human; audit trails beyond the PR diff; formal compliance programs for organizations that need them.
- **Shipwright example:** one policy file controlling review posting, merge rights and autonomy, plus a task flag that routes work to a person.

**Sub-topic (proposed): security and access.** Who and what may touch the factory: which credentials an agent holds, what each token may read or write, which tools and networks are reachable, and how access is revoked. It is a note under Governance rather than a separate component, and it overlaps with the execution environment.

## 8. Feedback / maintenance

- **Also called:** observability, patrols, metrics, error triage, entropy scans, tech-debt sweeps.
- **What it is:** the loop that watches what the factory produced and what production is doing, and turns findings into new work.
- **Why it exists:** a factory that only builds new things accumulates breakage and drift. Feedback closes the loop.
- **Simplest version:** a scheduled job that runs a scan and lists findings for you.
- **Range:** usage and spend dashboards; error-tracker triage that files tasks; dependency and security scans; duplicate-code or convention-drift scans; quality metrics such as cycle time, merge rate and rework ratio; factory-health observability such as run logs, session transcripts, stall detection and alerts when the factory goes quiet; the operations of running the factory itself, such as secrets handling, sandboxing, staged rollouts and on-call.
- **Shipwright example:** scheduled scans for errors, security, convention drift and duplication that report and then queue tasks.

**Sub-section: Observability / ops.** Kept as a labelled sub-section of this component, not a component of its own. It covers factory-health observability (run logs, session transcripts, stall detection, alerts when the factory goes quiet) and the operations of running the factory itself (secrets handling, sandboxing, staged rollouts, on-call). `lessons/README.md` carries the same sub-section under its own Observability / ops heading.

## 9a. Instructions and standards (proposed)

- **Also called:** instructions, rules, standards, CLAUDE.md, AGENTS.md, skills, conventions, style guide.
- **What it is:** the standards file, skills and rules a factory reads from day one: how the code is written, what commands to run, what to never do. Split out of Memory / learning.
- **Why it exists:** an agent that starts every session knowing the house rules makes fewer avoidable mistakes. This is written before any mistake happens, unlike learning from corrections.
- **Simplest version:** one markdown instructions file in the repo that the agent reads each session.
- **Range:** a single instructions file; per-directory rules; a library of reusable skills; shared standards enforced by checks as well as read by agents; organization-wide defaults with per-project overrides.
- **Shipwright example:** a project instructions file plus a shared principles file that execution, planning and review all read.

## 9. Memory / learning

- **Also called:** instructions, rules, CLAUDE.md, AGENTS.md, notes, knowledge, skills.
- **What it is:** how the factory keeps what it learned from corrections and past sessions so the next session starts smarter. Day-one standards are split out as Instructions and standards (proposed).
- **Why it exists:** each agent session starts fresh. Without durable memory, you correct the same mistake every week.
- **Simplest version:** a markdown instructions file in the repo that the agent reads each session, and that you edit when it gets something wrong.
- **Range:** hand-written instructions; agent-proposed edits to those files; per-user or per-project memory stores; reusable skills; a periodic job that mines past sessions for recurring lessons.
- **Shipwright example:** an interactive capture command and an unattended cross-session mining job, both writing into instructions and skills.

## 10. Coordination / loop

- **Also called:** orchestrator, dispatcher, scheduler, loop, coordinator, cron.
- **What it is:** what decides which work happens next, and runs it without a human launching each step.
- **Why it exists:** it turns a set of capable commands into a factory that keeps moving on its own.
- **Simplest version:** you pick the next task and start the agent.
- **Range:** manual launch; a shell loop; a cron tick that picks the oldest ready item and dispatches the matching phase; per-phase schedulers; a coordinator agent assigning to specialist agents; parallel workers pulling from a shared queue.
- **Shipwright example:** a recurring tick merges candidates from each phase and dispatches exactly one, oldest first.

## 10b. Multi-agent coordination (proposed)

- **Also called:** delegation, orchestration, claims, swarm, parallel runs, fan-out.
- **What it is:** how several agents share work without colliding: who takes which task, how a task is claimed, how results come back. Split from the loop, which stays "what starts the next task".
- **Why it exists:** once more than one agent runs at a time, two can pick the same task or edit the same files. Someone has to decide who owns what.
- **Simplest version:** one agent at a time, so there is nothing to coordinate.
- **Range:** a lead agent delegating to sub-agents; a claim on a task in a shared queue, with a heartbeat so abandoned claims are released; parallel workers on separate branches; specialist agents per phase; limits on how many run at once.
- **Shipwright example:** a task is claimed atomically before work starts, with a heartbeat that lets a stale claim be reclaimed.

## 11. Chat interface

- **Also called:** ChatOps, Slack bot, harness, front door, console.
- **What it is:** the place where people talk to the factory: give instructions, get status, answer questions, approve things.
- **Why it exists:** a factory people cannot easily talk to is a factory people stop using. It is also where human-in-the-loop requests land.
- **Simplest version:** the terminal session you are already in.
- **Range:** a CLI or IDE session; a chat-app bot that triggers runs and posts results; a web dashboard; a harness that wraps an agent runtime and exposes it through a protocol such as ACP; voice.
- **Shipwright example:** a Slack-driven harness where messages and scheduled jobs arrive as prompts and replies post back to the thread.

---

## Notes on the map

- The components overlap and blur. Many factories merge two or three into one command or one agent. That is fine.
- The order above is a rough flow of work and not a build order. Start wherever your pain is.
- The list is living. If you find a component that is missing, or a better way to carve this up, change it. Entries marked (proposed) are not final: they may be merged back, renamed or dropped.
- The bands are a reading aid, and a component can serve more than one band.
- Observability / ops is kept as a labelled sub-section of Feedback / maintenance, in this doc and in `lessons/README.md`, and not promoted to a component. If it grows enough to need its own lesson series, promote it then.
