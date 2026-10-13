# Script: The simplest factory

Narrated by Dan over the slides (face cam bottom right). Slides hold labels; this file holds the words.
Demo beats are numbered steps; [run-of-show.md](run-of-show.md) points at them. Every demo is build-only: we write
the skill or the loop on camera and run nothing. The end-to-end run is lesson 2.

Framing rule for every part: the concept first (tool-neutral), then "in our demo we use...", then "yours can be
anything". Bun and Claude Code are our demo choices, never requirements. For plan, dev-task and the loop, each
concept covers inputs, steps and outputs generalized across factories, then a "how the field differs" slide
(from [options.md](options.md)), then the build-only demo.

1. **What a factory is, and the factory map.** A factory turns a request into a reviewed change. Show the factory
   map slide: eleven components in [docs/components.md](../../docs/components.md), today we touch planning and
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
     (Linear tickets). Do the tasks carry criteria and dependencies? Only OpenHands triage and Factory Missions
     document acceptance criteria, and only OpenHands triage and Claude Code agent teams document dependencies. Say
     "not in their docs" only for omitted cells (Devin approval, Copilot persistence and contents, Cursor contents);
     elsewhere say what the cell says, including "not documented" where the page says so.
   - In our demo we use a markdown skill, [`factory/skills/plan/SKILL.md`](../../factory/skills/plan/SKILL.md),
     writing [`factory/todos.json`](../../factory/README.md). DEMO: write the skill on camera. Do not run it.
   - Yours can be anything: a pasted prompt, a planning mode, a person. Trackers and issues are the usual queue;
     `todos.json` is the portable stand-in. Show one task's four parts on a task-card slide (a slide, not a demo).
5. **Dev-task: concept, then DEMO write the dev-task skill.**
   - Concept: inputs are one task, outputs are a pull request and a recorded status. Dev-task is triggered by the
     loop, not by you. Four steps: **isolate** (its own branch in a worktree, so main stays clean), **code** (implement
     against the description and criteria), **verify** (run the acceptance checks plus the project's tests,
     typecheck and lint; fix until they pass), **deliver** (commit, push, open the PR and record the status: `pr_open`
     once verification passes, blocked with a reason otherwise). Verify gates the PR: nothing is delivered until it
     passes. Say claim (locks, heartbeats, stale claims) is a multi-agent concern; it comes back in the parallel-work
     lesson.
   - How the field differs (slide, [options.md](options.md)): what judges a task done differs. Devin runs
     tests, lint and type checks, and Copilot runs tests and linters (Copilot's page does not document how the results gate the PR); Factory runs
     validation workers at the end of each milestone; OpenHands' SDK and Claude Code's `/goal` use a judge model;
     Cursor's agent builds and tests itself with no fixed gate. Ours is the project's own tests and checks, and they
     gate the PR.
   - In our demo we use [`factory/skills/dev-task/SKILL.md`](../../factory/skills/dev-task/SKILL.md). DEMO: write
     the skill on camera. Do not run it on a todo.
   - Yours can be anything: any agent, language, test runner or isolation method.
6. **The loop: concept, then DEMO write the loop.**
   - Concept: inputs are the task list, steps are pick the next ready task, run dev-task on it, re-read the list,
     repeat; output is a stream of open PRs. It stops when none is ready or one fails. Here status shows up: it is
     the queue's state (pending, in progress, PR open, done, blocked), written by dev-task and read by the loop.
   - How the field differs (slide, [options.md](options.md)): moving on to the next task by itself splits the field.
     Factory's orchestrator, OpenHands (polling labeled issues every 5 minutes) and Claude Code (agent teams,
     experimental) document it. Devin and Cursor document event or schedule starts, not a finished run picking
     the next task; Copilot automations document trigger starts and the gh-aw work queue documents picking the next task. Say "document", never "cannot": the sources only say what they document. The loop is our choice.
   - In our demo we use [`factory/loop.ts`](../../factory/loop.ts) (Bun). DEMO: write the loop on camera. Do not
     run it.
   - Yours can be anything: a shell loop, a cron job, a queue worker; the agent command is configuration.
7. **Why we loop (our opinion, say so).** This is our view, not a standard. A plan as a file survives the session.
   One todo per run limits the blast radius. The loop removes the human as the bottleneck. The human stays at plan
   and at PR review.
8. **How it all works together (slide only).** One slide, nothing run. Contrast our flow with the alternative where
   a human or an event starts each session. Do not claim other products cannot loop; the sources only say what they
   document.
9. **Names, and where factories take it.** `plan` and `dev-task` are just the names used in this sample. Show the
   product names for each cell (from [options.md](options.md), a sourced slide): Claude Code and Cursor say plan mode,
   Factory says Missions and a mission orchestrator, Devin says Ask Devin and Automations, OpenHands says Software
   Factory. Name yours anything. Say what is
   deliberately missing: no automated review, no merge, no verification gate beyond the project's own tests.
10. **Next lesson and exercise.** Next lesson we run it end to end, then the loop builds the next feature. The
    exercise ([exercise.md](exercise.md)) has you build your own plan, dev-task and loop and run them end to end
    yourself, with an agent and language of your choice.
