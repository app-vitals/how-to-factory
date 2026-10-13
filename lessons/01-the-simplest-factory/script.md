# Script: The simplest factory

Narrated by Dan over the slides (face cam bottom right). Slides hold labels; this file holds the words.
Demo beats are numbered steps; [run-of-show.md](run-of-show.md) points at them. Every demo is build-only: we write
the skill or the loop on camera and run nothing. From here, each later lesson adds a component from the factory map and builds it with this factory.

Framing rule for every part: the concept first (tool-neutral), then "in our demo we use...", then "yours can be
anything". Bun and Claude Code are our demo choices, never requirements. For plan, dev-task and the loop, each
concept covers inputs, steps and outputs generalized across factories, then a "how the field differs" slide
(from [options.md](options.md)), then the build-only demo.

1. **What a factory is, and the factory map.** A factory turns a request into a reviewed change. Show the factory
   map slide: eight of the components in [docs/components.md](../../docs/components.md), today we touch planning and
   execution, plus a loop. Nothing here is the standard; `factory/` is our demo.
2. **What the human does.** Three things: chat and explore with your own agent, run the plan, review the PRs.
   The chat is part of plan, not a separate demo: you and the agent talk the work through, then you run plan and its
   input is that conversation. Everything between plan and the PRs runs without you.
3. **What we build.** Slide of the parts: Chat, Plan, Todo list, Loop, Dev-task, PRs, You review. Plan is
   human-triggered and interactive; the loop triggers dev-task, once per todo.
4. **Plan: concept, then DEMO write the plan skill.**
   - Concept: inputs are the conversation context (or a file you point at), steps are split into small tasks,
     output is a task list that outlives the session. Generalized, every factory has some version of this.
   - What a task needs, and why (a slide before the demo; sources in [options.md](options.md)). Four parts:
     **title**, **description**, **acceptance criteria**, **dependencies**.
     - Title: a short handle so a human skimming the queue knows what it is.
     - Description: what to build, why, and what is out of scope. The agent starts each task with no memory of the
       conversation, so the description is all the context it gets.
     - Acceptance criteria: checks the agent can run or inspect, not intentions. This is the strongest agreement
       across the sources, because it is what lets the agent know it is done and lets verify (below) pass or fail.
     - Worked example (say it over the task-card slide): a task "add a `greet(name)` function" with two criteria.
       `greet('Ada')` returns `Hello, Ada`; `greet('')` is rejected with an error. Each criterion becomes a check
       the agent can run, here a test: one asserts the greeting, one asserts the error. The plan writes the
       criteria as checks; dev-task runs them in its verify step.
     - Dependencies: a task must finish before another can execute. That is what lets the plan cut smaller
       tasks and what the loop orders by. Kiro documents a dependency graph with parallel waves and Spec Kit marks
       independent tasks `[P]` ([options.md](options.md)).
     - Size is a rule, not a field: each task is small enough to deliver as one PR. Status is not plan output; it is
       the queue's state, introduced in the loop section. The branch is derived by dev-task; it only becomes a real
       concern with parallel work, which is a later lesson.
   - How the field differs (slide, [options.md](options.md)): three questions, each answered from the cells and nothing
     more. Does a person approve or edit the plan first? Approval is the gate form of human in the loop. When the person
     is not satisfied, the docs describe editing and iterating, not dropping the plan: Cursor (edit the plan, then
     Build), Copilot (review and iterate until it matches intent) and Claude Code (edit the plan, approve, or keep
     planning; no source edits until approved). Factory also approves or keeps iterating. OpenHands triage runs
     automatically; a person writes the issue. Do tasks outlive the chat? The field splits between a plan you approve
     and tasks in a queue, and the same product often has both surfaces: Claude Code plan mode vs agent teams (task list
     on disk), Cursor Plan Mode (a plan file) vs Projects, OpenHands triage (issues labeled ready-for-dev), Devin
     (Linear tickets). Do the tasks carry criteria and dependencies? OpenHands triage, Factory Missions and Devin's
     example tickets (an example, not a guaranteed format) document acceptance criteria; OpenHands triage, Claude Code
     agent teams and Devin's example tickets document dependencies. Say
     "not in their docs" only for omitted cells (Devin approval, Copilot persistence and contents, Cursor contents);
     elsewhere say what the cell says, including "not documented" where the page says so.
   - In our demo we use a markdown skill, [`factory/skills/plan/SKILL.md`](../../factory/skills/plan/SKILL.md),
     writing [`factory/todos.json`](../../factory/README.md). DEMO: write the skill on camera. Do not run it.
   - Yours can be anything: a pasted prompt, a planning mode, a person. Trackers and issues are the usual queue;
     `todos.json` is the portable stand-in. Show one task's four parts on a task-card slide (a slide, not a demo).
5. **Dev-task: concept, then DEMO write the dev-task skill.**
   - Concept: inputs are one task, outputs are a pull request and a recorded status. Dev-task is triggered by the
     loop, not by you. Four steps: **branch** (its own branch in a worktree, so main stays clean), **code** (implement
     against the description and criteria), **verify** (run the acceptance checks plus the project's tests,
     typecheck and lint; fix until they pass), **deliver** (commit, push, open the PR and record the status: `pr_open`
     once verification passes, blocked with a reason otherwise). Verify gates the PR: nothing is delivered until it
     passes. If verify fails, the task is set blocked with a
     reason and the loop stops on it; that is how the loop knows something went wrong. Say claim (locks, heartbeats, stale claims) is a multi-agent concern; it comes back in the parallel-work
     lesson.
   - How the field differs (slide, [options.md](options.md)): the prompt-to-PR flow is the same shape in every
     factory, and running tests and linters and retrying are common to most (caption). The one thing the slide shows
     is who decides it is done, and the answer is a category, not yes/no: a check (Devin and Copilot run tests,
     lint and type checks; Cursor's repository CI judges its cloud auto-fix; Copilot's page does not document how
     results gate the PR), another model (Factory's validation workers; OpenHands' SDK goal loop), a check plus
     another model (Claude Code's `/goal`), or the agent itself. Ours is the agent itself, running the project's own
     checks, and they gate the PR. Say that how factories verify in depth is the verification lesson. Say only what
     the cells source.
   - In our demo we use [`factory/skills/dev-task/SKILL.md`](../../factory/skills/dev-task/SKILL.md). DEMO: write
     the skill on camera. Do not run it on a todo.
   - Yours can be anything: any agent, language, test runner or way of keeping the work off main.
6. **The loop: concept, then DEMO write the loop.**
   - Concept: inputs are the task list, steps are pick the next ready task, run dev-task on it, re-read the list,
     repeat; output is a stream of open PRs. It stops when none is ready or one fails: a task that
     failed verify is blocked with a reason, and the loop stops on it. Here status shows up: it is
     the queue's state (pending, in progress, PR open, done, blocked), written by dev-task and read by the loop.
   - How the field differs (slide, [options.md](options.md)): once set up, most run without a person starting each
     task, so "who drives" is not a column; it barely separates anyone. The field differs on two questions. First,
     what starts the next task: a finished run (Factory's orchestrator, Claude Code agent teams, experimental) or a
     schedule or event (OpenHands polling labeled issues every 5 minutes; Cursor, Copilot and Devin automations).
     Devin, Cursor and Copilot document trigger starts, not a finished run picking the next task. Second, whether plan
     runs inside the loop: OpenHands (its triage automation), Claude Code agent teams (the lead writes the task list)
     and Cursor Projects (the coordinator plans and delegates) do; Factory has a person approve the plan before the
     Mission runs. Link back to the plan slide's [approval column](options.md#plan): ours runs plan first, which is where the human
     approval lives. Devin and Copilot say nothing either way ("not in their docs"). Do not add a column for a person
     stepping in between tasks; that is a later lesson. Say "document", never "cannot": the sources only say what they
     document. The loop is our choice.
   - In our demo we use [`factory/loop.ts`](../../factory/loop.ts) (Bun). DEMO: write the loop on camera. Do not
     run it.
   - Yours can be anything: a shell loop, a cron job, a queue worker; the agent command is configuration.
7. **Why we loop (our opinion, say so).** This is our view, not a standard. A plan as a file survives the session.
   One todo per run limits the blast radius. The loop removes the human as the bottleneck. The human stays at plan
   and at PR review.
8. **How it all works together (slide only).** One slide, nothing run. Contrast our flow with the alternative where
   a human or an event starts each session. Do not claim other products cannot loop; the sources only say what they
   document.
9. **Names, and where factories take it.** `plan` and `dev-task` are only this sample's names. Show the product term
   in each cell of the Planning and Execution columns (from [options.md](options.md), a sourced slide): Claude Code
   and Cursor say Plan mode, Factory says Spec Mode, Devin says Ask Devin, OpenHands says GitHub Issue Triage; for
   execution Devin says Devin session, Cursor says cloud agent, Copilot says Copilot cloud agent. Copilot's planning
   cell reads "no name in their docs". Say nothing the cells do not source. Name yours anything. Say what is
   deliberately missing: no automated review, no merge, no verification gate beyond the project's own tests. In our sample the
   agent runs the checks and decides it is done; other factories add an independent judge (another model, a script,
   a person). That is the verification lesson.
   Then the destinations slide: each option extends one piece we built (Plan: a tracker holds the queue; Dev-task: each
   task in its own environment; Loop: several at once, or on a schedule; Checks: another model or a script judges
   done). Say: later, not next. From here our factory builds its own parts. Sources are in [options.md](options.md).
10. **Next lesson and exercise.** From here our factory builds its own next parts: each lesson adds a component from the factory map, we plan the
    feature, the loop runs dev-task on the tasks, and a person reviews the PRs. The order is open; promise nothing. The
    exercise ([exercise.md](exercise.md)) has you build your own plan, dev-task and loop and run them end to end
    yourself, with an agent and language of your choice.
