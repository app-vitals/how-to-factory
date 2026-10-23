# Field grid: lesson 1 (redo)

Draft research for Dan to review before any slide or matrix restructure. Scope is lesson 1 only: plan, dev-task, loop.
This replaces the earlier draft (session `lesson1-field-grid-redo`): every per-product file was redone against the
vendor's full docs index, and the loop is split into two grids, a verify-and-retry loop inside one task and a loop that
moves across tasks.

Every cell below is a short paraphrase of the per-product file linked in its row, which holds the first-party URLs, the
pages read and the fetch date for each claim. Nothing is added that those files do not source. Names are each product's
own, not canonical. "Who drives" is Human, Human approves or Automated, only where a first-party page says so. Several
products have more than one surface per grid; each cell names the surface it describes, and a cell with "not documented"
means a named surface has no page stating it (the pages checked are in the per-product file and in the CROSS-CHECK below).

Column note: PLAN, DEV-TASK and LOOP across tasks use input / step / output / who drives. The per-product files have no
output field for LOOP within a task (they record "retries until a check passes?", "what judges it" and "who drives"), so that
grid uses those three columns instead of inventing an output.

As of 2026-10-13 unless a row says otherwise. The per-product files were spot-checked against their cited pages on 2026-10-23 (corrections and as-of bumps are in each file); the summary cells below are unchanged by that pass.

## PLAN (as of 2026-10-13)

| Product | Input | Step | Output | Who drives |
| --- | --- | --- | --- | --- |
| [Devin](devin.md) | Ask Devin: a question or goal about an indexed repo. Linear: a ticket | Ask Devin: scope and break the task down in conversation. Linear: default `!plan` playbook (contents not shown); criteria and dependencies not documented | Ask Devin: a prompt that starts a session. Linear: todo list in the plan view | Linear: Human (assign, label, @mention) or Automated (Linear trigger). Ask Devin: not documented |
| [Factory](factory.md) | Spec Mode: a request. Missions: a goal plus clarifying questions | Spec Mode: read-only research, then a proposed plan. Missions: features grouped in milestones | Spec Mode: plan, optionally saved as Markdown. Missions: approved plan with per-feature validation criteria; dependency edges not documented | Human approves |
| [OpenHands](openhands.md) | Software Factory triage: a GitHub issue | Triage agent prioritizes, checks dependencies, establishes acceptance criteria (how they are written not documented) | Issue labeled `ready-for-dev`; separate task list not documented | Triage: Automated (every 5 min). Daily workflow plan: Human approves |
| [Cursor](cursor.md) | Plan Mode: a typed request. Projects: a larger body of work given to a coordinator | Plan Mode: clarify, research, write plan, person edits. Projects: coordinator plans and delegates; plan format not documented | Plan Mode: editable plan (home directory, or saved to workspace). Projects: stored plan not documented | Plan Mode: Human approves. Projects: Human directs. Slack plan note: not documented |
| [GitHub Copilot](copilot.md) | Cloud agent: a repo question, then a plan prompt | Research, ask for a plan before changes, then implement | Plan shown for review; split into tasks with criteria and dependencies not documented | Human approves |
| [Claude Code](claude-code.md) | Plan mode: a typed request. Agent team: a project description | Plan mode: read, then write a plan, no edits until approved; task split not documented. Agent team: lead creates tasks with dependencies | Plan mode: editable plan. Interview route: `SPEC.md`. Agent team: shared task list | Plan mode: Human approves. Agent team: Automated lead. Projects: Human approves if told to confirm first |
| **This sample** (`plan` skill, [factory/](../../factory/README.md)) | Conversation context, or a file the human points at | Writes tasks with description, acceptance criteria, dependencies | Entries in `factory/todos.json` | Human (triggered interactively) |

## DEV-TASK (as of 2026-10-13)

| Product | Input | Step | Output | Who drives |
| --- | --- | --- | --- | --- |
| [Devin](devin.md) | A person-written prompt or playbook; or a Linear or Jira ticket | Tests its own work before the PR (tests, lint, type checks) as the prompt names them; optional testing mode after the PR | A PR; testing mode adds a video | Human starts. Testing mode: Human approves, or Automated if pre-approved. Building step not labeled |
| [Factory](factory.md) | Session: a prompt. Mission worker: one feature. `droid exec`: a prompt. Linear: an assigned issue | Session: plan, diff, approval, validators at finish. Worker: build, then QA against the running app. Exec: built-in checks not documented | Linear: a PR. Mission: work via git, PR or branch not documented. Session: PR not documented | Session: Human approves. Mission worker, exec, Linear: Automated |
| [OpenHands](openhands.md) | Issue to PR: a labeled issue. SDK: a written objective. Daily workflow: a task the person picks | Issue to PR: branch, implement, run tests, open PR; what happens on failed tests not documented. SDK: agent works, judge audits | Issue to PR: draft PR plus link on the issue. SDK: a goal outcome; PR not documented | Issue to PR: Automated. SDK: Automated once code runs. Daily workflow: Human approves |
| [Cursor](cursor.md) | Cloud agent: a prompt from app, Slack, PR comment, Linear or API | Builds in a cloud VM, can run tests and use the app; fixed pre-delivery gate not documented | Cloud agent: PR with screenshots, videos, logs. Interactive agent: PR not documented | Cloud agent: Automated once started. Interactive: Human |
| [GitHub Copilot](copilot.md) | An issue or a prompt; criteria and file pointers advised | Works in its own Actions environment, runs tests and linters; how results gate the PR not documented | A `copilot/` branch, then a PR (assigned issues and `/task` open one) | Human approves |
| [Claude Code](claude-code.md) | Interactive: a prompt with a way to check. Headless: a CLI prompt or `@claude`. Cloud: a task | Interactive: edits, runs the check, iterates. Cloud: checks not documented as built in | A PR when asked; cloud session branch, then a PR | Interactive: Human. Headless, cloud: Automated once started |
| **This sample** (`dev-task` skill) | One todo id | Isolate in a git worktree, code, verify, deliver | PR; todo marked `pr_open` | Human, or the loop starts it |

## LOOP within a task (as of 2026-10-13)

Verify and retry until a check passes.

| Product | Retries until a check passes? | What judges it | Who drives |
| --- | --- | --- | --- |
| [Devin](devin.md) | In-session: iterates until tests pass (SDLC page). Auto-Fix on its own PRs. Dynamic Workflows loop if asked. Retry cap not documented | Tests, linters, CI named in the prompt; Devin Review findings | Auto-Fix: Automated once an admin enables it. In-session: not documented |
| [Factory](factory.md) | Missions: follow-up fix features, with a retry limit (value not documented). `Stop` hook can block finishing. Plain session or exec: not documented | Validation workers; or the person's hook script | Automated |
| [OpenHands](openhands.md) | SDK goal loop (cap 10); critic loop (cap 3, experimental). Issue-to-PR run: not documented | A second judge LLM reading the transcript; a critic score | Automated once turned on or run |
| [Cursor](cursor.md) | `/goal` (stopping test not documented); `stop` hook (cap 5); cloud-agent CI auto-fix (cap 10); `/autopilot` (cap not documented) | `/goal`: not documented. Hook: the person's script. CI fix: the repo's CI | Automated; `/autopilot` Human starts |
| [GitHub Copilot](copilot.md) | Cloud agent: runs tests and linters; keep-retrying rule not documented. CLI autopilot: continues until it judges done (cap 5) | The agent itself (autopilot); hook as gate not documented | Cloud agent: Human steers, who retries not documented. Autopilot: Automated |
| [Claude Code](claude-code.md) | `/goal` evaluator; `Stop` hook (8-block cap); a check inside the prompt; PR auto-fix (partly) | A small separate model; the person's script; the check itself; CI | Automated once set; Human chooses the condition |
| **This sample** (`dev-task` skill) | Step 3 says run the checks and fix until they pass; no cap stated | Acceptance checks, tests, typecheck, lint | The agent, following the skill |

## LOOP across tasks (as of 2026-10-13)

What moves on to the next piece of work by itself.

| Product | Input | Step | Output | Who drives |
| --- | --- | --- | --- | --- |
| [Devin](devin.md) | Automations: schedule, ticket, GitHub, Slack, webhook triggers | A Preflight script can emit work items, one session each; Dynamic Workflows pass items through stages. A finished session starting the next ticket: not documented | One session per event or item | Automated |
| [Factory](factory.md) | Mission orchestrator; scheduled and event automations; `droid exec --mission` | Orchestrator starts the next feature after each. "Ticket to PR" picks ready tickets one at a time every 15 min | Next feature; an open PR per ticket | Automated (five failed scheduled runs pause it) |
| [OpenHands](openhands.md) | Software Factory: four automations on 5-minute polls; Issue to PR polling | GitHub labels and statuses are the queue; the next labeled issue is taken at the next poll. Cloud automations: queue depth not documented | Merged PRs; a conversation, branch and PR per issue | Automated after a person sets them up |
| [Cursor](cursor.md) | Automations (many triggers); Projects subscriptions; `/loop` | Trigger is the pacing; a run starting the next is not documented as chaining. Projects: each new bug message gets a delegated fix; backlog picking not documented | Per the prompt: PR, comments, Slack | Automated after setup; `/loop` Human stops |
| [GitHub Copilot](copilot.md) | Automations (schedule, issue created, PR opened or pushed); Agentic Workflows | Picking the next ready issue or chaining tasks: not documented | Labels, an opened PR; issues, comments, PRs | Automated; Human approves held-back issue changes and merges |
| [Claude Code](claude-code.md) | Routines, desktop schedules, GitHub Actions; `/goal` over a backlog; agent team; shell loop over `claude -p`; Projects | Routines, schedules, Actions: next run at next trigger. `/goal`, team self-claim, shell loop, Projects: next item by itself | One session per run; completed tasks; a thread or PR per item | Automated after setup; Projects: Human approves if told to confirm |
| **This sample** (`factory/loop.ts`) | `todos.json` with a ready todo (pending, dependencies done) | Picks the first ready todo, runs the agent headlessly, re-reads the file, repeats; stops on the first todo not ending `pr_open` or `done` | Next todo worked | Automated (script) |

The "This sample" rows come from [factory/README.md](../../factory/README.md), `factory/skills/` and `factory/loop.ts`, not from
a first-party product page.

## CROSS-CHECK (as of 2026-10-13)

Gap-closing passes (2026-10-13, one per product, recorded in each per-product file) re-read the pages the flags below named. The
Flag column now says what each pass found. The four grids above were not regenerated, so a few cells there still carry the
pre-pass wording; where a pass changed a cell, the per-product file is the current answer.

Method: every "not documented" in the four tables was traced to its per-product file, and the file's own "Pages read",
"Index pages checked" and "Ruled out" lists were compared against the pages each file says its docs index lists. Then each
product was compared against the others.

### Part 1: each "not documented" cell against the pages checked

Each row names the index pages the per-product file lists as checked (all fetched 2026-10-13). A flag means the file says its
index lists a page that could bear on the cell and that page was not read in full.

| Product | Cell (grid) | Pages checked | Flag |
| --- | --- | --- | --- |
| Devin | Linear `!plan` contents; plan criteria and dependencies (PLAN) | Linear, Using Playbooks, SDLC integration, Ask Devin | Resolved. Skills pages hold no plan content. Gallery pages (bulk-plan backlog, PRD to tickets) add plan output with confidence scores, steps, open questions, dependencies and criteria. The default `!plan` playbook contents are still not shown anywhere |
| Devin | Ask Devin who drives; in-session retry who drives (PLAN, LOOP within) | Ask Devin, When to Use Devin, SDLC integration, Instructing Devin | None |
| Devin | Retry cap or stopping rule (LOOP within) | SDLC integration, Instructing Devin, Testing & Recordings | Re-read with use-case best practices and gallery pages: objective verification is advised, CI-fix and Auto-Fix examples added; cap or stopping rule still not documented |
| Devin | A finished session starts the next ticket (LOOP across) | Automations, Linear, Jira, Scheduled Sessions, Advanced Capabilities, When to Use Devin | Resolved. Gallery, example and tutorial pages read; none documents a finished session choosing the next ticket, so the answer stays not documented |
| Factory | Spec Mode task split; Missions dependency edges (PLAN) | Specification mode, quickstart, CLI overview; six Missions pages and the Missions news post | Resolved. Changelog scanned (about 30 Sep to 13 Oct only); no dependency edges, Mission PR or retry value |
| Factory | Mission ends in a PR or a branch; session PR; exec built-in checks (DEV-TASK) | Six Missions pages, news post, droid-exec, quickstart, CLI overview | Resolved. All three read. No Mission or session PR is documented; Jira delegation opens a PR like Linear |
| Factory | Retry limit value; built-in retry outside Missions (LOOP within) | missions/overview, planning, reference; quickstart, specification mode, droid-exec, CLI overview, automated-qa | Resolved. automated-qa read: `/qa` reports pass/fail as a PR comment; it edits QA skills, not the code under test. Retry limit value still not documented |
| OpenHands | How triage writes criteria; separate task list (PLAN) | Software Factory, Issue to PR, Managing Automations | None |
| OpenHands | Daily workflow criteria and dependencies (PLAN) | Daily Workflow | None |
| OpenHands | Tests failing in Issue to PR; PR from SDK goal (DEV-TASK, LOOP within) | Issue to PR, Software Factory, Managing Automations, Critic, Goal Completion Loop | Resolved. All five read in full. None says what the Issue to PR run does when tests fail, so it stays not documented |
| OpenHands | Cloud automations queue depth; next piece after a run (LOOP across) | Automations Overview, Creating, Event-Based, Managing, GitHub Repository Monitor | Resolved. Repository Monitor page ends after setup; no queue or chaining |
| Cursor | Plan task format; Projects stored plan; Slack approval (PLAN) | Plan Mode docs and help, Agent overview, Prompting, Projects, Agents Window, Slack, Cloud Agents | None |
| Cursor | Fixed pre-delivery gate; interactive PR (DEV-TASK) | Cloud Agents, Capabilities, Best practices, Agent overview, Prompting, Subagents, Skills | None |
| Cursor | `/goal` stopping test and judge; `/autopilot` cap (LOOP within) | Agent overview, Prompting, CLI overview, Skills, Subagents, Agents Window | Resolved. Parameters, permissions, configuration and slash commands read; `/goal` stopping test and judge still not documented. The pages disagree with the headless page on whether bare `-p` writes files |
| Cursor | Work queue; a run starting the next (LOOP across) | Automations docs and help, Projects, Capabilities, Skills, Agent overview | Resolved. Both help pages read; no queue or chaining. Cloud-agent help confirms `stop` hooks run in cloud agents |
| Copilot | Splitting a plan into tasks (PLAN) | Research plan iterate, changelog 2026-04-01, Best practices, Copilot on GitHub.com, Dynamic workflows, autopilot, Agent management | None |
| Copilot | How test results gate the PR; retry rule; hook as a gate (DEV-TASK, LOOP within) | Managing agent sessions, Using cloud agent, Best practices, Customize the environment, Hooks, limitations | Resolved. The hooks reference documents an `agentStop` hook whose `block` decision forces another turn (8-block cap stated for the CLI). The dynamic-workflows how-to has no retry-until-pass construct. A built-in keep-going-until-a-check-passes rule is still not documented |
| Copilot | Next ready issue, chaining tasks (LOOP across) | About and Creating automations, rationale and approvals, Agent management, Using cloud agent, Dynamic workflows | Resolved. gh-aw fetched: its work queue picks the next eligible task from a dependency graph. `assign-to-agent` assigns Copilot to an issue it is pointed at; it does not pick the next one. Copilot automations themselves still document no next-task pick |
| Claude Code | Plan-mode task split; agent team criteria (PLAN) | Best practices, Permission modes, Common workflows, How Claude Code works, Agent teams, Run agents in parallel | None |
| Claude Code | Cloud checks; Who drives for second-agent review (DEV-TASK) | Use Claude Code in the cloud, Get started in the cloud, Best practices, Run agents in parallel | Resolved. Sub-agents page read: Claude can delegate to a person-defined reviewer by its description; no built-in review gate |
| Claude Code | Routines, desktop, Actions: next piece; work queue (LOOP across) | Routines, Run prompts on a schedule, Desktop scheduled tasks, GitHub Actions, Run agents in parallel | Resolved. Both read: Slack starts a cloud session and a person clicks Create PR; cross-session messaging is not a queue |

Result: no cell is a blank without named pages, and every flag in the table was followed up. Four flags changed an answer:
Copilot documents a stop-and-retry hook (like Factory, Cursor and Claude Code) and, on the gh-aw site, a work queue that picks the
next task; Devin documents plan output with dependencies and criteria in gallery examples; Factory and Claude Code gained
documented surfaces (`/qa`, Jira delegation, Slack). The rest stayed not documented after the extra reading, so those blanks can
now be quoted with the pages checked.

### Part 2: products against each other

Does one product document something another's file marks undocumented?

- **Retry hook at the end of a run.** Factory (`Stop` hook `block`), Cursor (`stop` hook `followup_message`) and Claude Code
  (`Stop` hook) document a hook that keeps the agent working. Copilot's file marks "a hook can send the agent back" as not
  documented. Resolved: the Copilot hooks reference documents `agentStop` with a `block` decision, so all four document a retry hook.
  Copilot's version is a script the person writes; a built-in rule is still not documented.
- **Dependencies in a plan.** Factory marks dependency edges between Mission features not documented. Claude Code's agent team
  (tasks cannot be claimed until their dependencies are completed), OpenHands triage ("checks their dependencies") and Cursor's
  Build in Parallel (dependent steps stay in order) document dependency handling. Devin, Cursor Plan Mode and Copilot mark the task
  split with criteria and dependencies not documented; Devin's PRD-to-tickets gallery example (dependencies and criteria in tickets) and Copilot's gh-aw work queue (a task graph) now document them too; criteria are stated by OpenHands triage, Factory Missions (per-feature validation criteria) and the Copilot improve-a-project tutorial (issues the person checks).
- **Next piece of work by itself.** Devin and Cursor mark "a finished run starts the next piece" not documented after the gap passes;
  Copilot automations still do, but the gh-aw work queue documents it.
  Factory (Mission orchestrator, "Ticket to PR"), OpenHands (label and poll) and Claude Code (`/goal` over a backlog, team self-claim,
  shell loop, Projects) document it. Devin's Preflight emitting one session per work item is close to Factory's "Ticket to PR", so the
  Devin gap is narrow: the pages describe work items and events, not a session choosing a next ticket.
- **A PR from a session.** Factory marks a PR from a plain session and from a Mission not documented (Linear and Jira delegation do open one); Cursor, Copilot, Claude Code,
  Devin and OpenHands (Issue to PR) document one.
- **Retry caps.** Documented for OpenHands (10 and 3), Cursor (5 and 10), Copilot autopilot (5) and Claude Code (8 for the `Stop` hook).
  Not documented for Devin, Factory (value) and Cursor `/autopilot`.
- **Pre-delivery gate.** Devin and Claude Code document the agent running a named check before the PR; Cursor and Copilot mark the
  fixed gate not documented, and OpenHands lists "runs tests" as a step without the failure path.

## Observations (for Dan)

Counting rule: a **blank** is a cell where every surface of a product is "not documented". A **partial** is a filled cell that
carries a "not documented" aside for one surface or sub-question. Counts are over the six products, not the sample row.

| Grid | Column | Blanks (of 6) | Partial | Reads as |
| --- | --- | --- | --- | --- |
| PLAN | input | 0 | 0 | Same: a request, goal, issue or ticket |
| PLAN | step | 0 | 4 (Devin, OpenHands, Cursor, Claude Code) | Differs; whether the plan splits into tasks with criteria and dependencies is where the sample is most specific, and the sources vary by surface |
| PLAN | output | 0 | 5 (Devin, Factory, OpenHands, Cursor, Copilot) | Differs: plan view, Mission Control plan, label, editable plan, spec file, task list |
| PLAN | who drives | 0 | 2 (Devin, Cursor) | Differs: Human approves is common, but triage, agent-team and Linear triggers are Automated |
| DEV-TASK | input | 0 | 0 | Same: a written prompt or issue; criteria advised by Devin, Copilot, Claude Code |
| DEV-TASK | step | 0 | 5 (Factory, OpenHands, Cursor, Copilot, Claude Code) | Mostly the same: build, run tests, iterate; the check that gates delivery is often undocumented |
| DEV-TASK | output | 0 | 3 (Factory, OpenHands, Cursor) | Mostly the same: a PR or branch |
| DEV-TASK | who drives | 0 | 1 (Devin) | Differs: Human or Human approves (Devin start, Copilot, Claude Code interactive) vs Automated (Factory worker, OpenHands, Cursor cloud) |
| LOOP within | retries? | 0 | 5 (Devin, Factory, OpenHands, Cursor, Copilot) | Mostly the same: all have some form; caps and stopping rules vary or are undocumented |
| LOOP within | what judges | 0 | 2 (Cursor `/goal`, Copilot hooks) | Differs: tests and CI, a person's script, a judge model, the agent itself |
| LOOP within | who drives | 0 | 2 (Devin, Copilot) | Mostly Automated once set up |
| LOOP across | input | 0 | 0 | Differs: schedules and events everywhere, plus label polling, `/goal` and team self-claim |
| LOOP across | step | 0 | 5 (Devin, OpenHands, Cursor, Copilot, Claude Code) | Differs: Factory, OpenHands and Claude Code document moving on by itself; the other three document only event or schedule starts |
| LOOP across | output | 0 | 0 | Differs, depending on the prompt |
| LOOP across | who drives | 0 | 0 | Same: Automated after a person sets it up |

After the gap passes, Copilot LOOP within (hook as a gate) and LOOP across (gh-aw queue) gain documented answers and Devin PLAN
output gains the gallery examples; the other flagged cells stay as counted below. The counts below are for the grids above and
were not recomputed.

No column has a blank. The old draft had blanks in several columns (PLAN who drives had three); the redo found a page for each. What remains is partial.

**Lesson 1 versus later lessons.** Bearing on lesson 1: PLAN step and output (does a plan become tasks with criteria and
dependencies), DEV-TASK step and output (what verifies, what comes out), LOOP within (retry until a check passes), and LOOP across
step (does the next piece of work start by itself). Closer to later lessons: PLAN and DEV-TASK who drives (human approval),
LOOP across input and pacing (triggers, rate limits, queues), and any cell about review, merge, isolation or parallel runs, which
the per-product files ruled out as out of scope.

**Corrections to the superseded draft.**

1. "Only Factory Missions moves on to the next task by itself" is wrong. Factory (Mission orchestrator, "Ticket to PR"),
   OpenHands (Software Factory label-and-poll), and Claude Code (`/goal` over a backlog, agent-team self-claim, a shell loop,
   Projects threads) all document it. Devin, Cursor and Copilot still do not document a finished run starting the next one.
2. "Plan is always Human approves" is wrong. OpenHands triage and Claude Code's agent-team lead are Automated, Linear triggers can
   start Devin without a person, and Claude Code Projects can start threads without asking.
3. OpenHands plan "not documented" is wrong. The Software Factory page has a triage automation that prioritizes issues, checks
   dependencies and establishes acceptance criteria. How the criteria are written is still not documented.
4. Devin next-task "not documented" is half right. Automations with Preflight work items, and Dynamic Workflows staged pipelines,
   are documented; a finished session choosing the next ticket is not.
5. Copilot plan "not documented" is wrong. The cloud agent has a research, plan and iterate flow, Human approves, and Copilot CLI
   has plan mode then autopilot. Splitting a plan into tasks is still not documented.
6. Claude Code "plainly human-driven" is wrong. `/goal`, `Stop` hooks, PR auto-fix, routines, headless runs and GitHub Actions are
   Automated once set up.
7. The old LOOP grid blurred two loops. It is now split into verify-and-retry inside one task and moving across tasks.
8. Smaller: Cursor "each run is independent, no chaining" is now more careful (events can start another automation, but the page
   does not call it chaining; Projects react to new events); the Copilot automations row was written without fetching the page and
   is now sourced; OpenHands DEV-TASK is no longer "Slack only" but Issue to PR, the SDK goal loop and the daily workflow.

**Kiro and Spec Kit.** Not rows, as in the old README, re-fetched 2026-10-13. Kiro documents requirements, design and a tasks file
per spec, and builds a dependency graph of the tasks in `tasks.md` to run independent tasks in waves
([Kiro specs](https://kiro.dev/docs/specs/)). Spec Kit documents specify, plan, tasks, implement and converge steps for a feature
([Spec Kit](https://github.com/github/spec-kit)); the page fetched does not detail task dependencies, so only Kiro is confirmed to
document them.
