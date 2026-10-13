# Field grid: lesson 1 draft

Draft research for Dan to review before any slide or matrix restructure. Scope is lesson 1 only: plan, dev-task, loop.
Every cell is a short paraphrase of the per-product file linked in its row, which holds the first-party URLs and the
fetch date for each claim. Cells that say "not documented" are kept as the per-product files have them. Names are each
product's own, not canonical. "Who drives" is Human, Human approves or Automated, only where a first-party page says so.

Products and surfaces differ per row; each cell names the surface it describes. As of 2026-10-13 unless a row says
otherwise.

## PLAN (as of 2026-10-13)

| Product | Input | Step | Output | Who drives |
| --- | --- | --- | --- | --- |
| [Devin](devin.md) (Linear `!plan`) | Linear ticket content | Default playbook, typically `!plan`; task split with criteria/dependencies not documented | Todo list synced to Linear's plan view; rest not documented | not documented |
| [Factory](factory.md) (Missions) | A goal, then clarifying questions from Droid | Structured plan of features in milestones; acceptance-criteria wording and dependencies not documented | Approved plan in Mission Control | Human approves |
| [OpenHands](openhands.md) (Cloud Slack) | not documented | not documented | not documented | not documented |
| [Cursor](cursor.md) (Plan Mode) | Typed request; agent asks questions, researches code | Clarify, research, write plan, person edits, then build; task split not documented | Editable plan, saved in home directory by default | Human approves |
| [GitHub Copilot](copilot.md) (cloud agent) | Prompt, or assigned issue/PR | Can research, plan and implement; separate plan or task split not documented | not documented | not documented |
| [Claude Code](claude-code.md) (interactive plan mode) | Typed request; optionally an interview that writes a spec | Reads files and proposes a plan, no edits until approved; task split not documented as built in | Editable plan; SPEC.md for the interview route | Human approves |
| **This sample** (`plan` skill, see [factory/](../../factory/README.md)) | Conversation context, or a file the human points at | Writes tasks with description, acceptance criteria, dependencies | Entries in `factory/todos.json` | Human (triggered interactively) |

## DEV-TASK (as of 2026-10-13)

| Product | Input | Step | Output | Who drives |
| --- | --- | --- | --- | --- |
| [Devin](devin.md) (session from written instructions) | Person-written task: scope, steps, success criteria, code pointers | Guide says to have it test its own work before the PR: tests, run app, browser, CI | PR or branch; PR link and activity posted to Linear ticket | not documented |
| [Factory](factory.md) (Mission worker) | One feature from the plan, clean-context worker | Builds feature; per-feature QA against the running app; milestone validation | Work handed off via git, follow-up work on issues; PR not documented | Automated (person can pause) |
| [OpenHands](openhands.md) (Cloud Slack) | Slack message mentioning @openhands, optional repo | not documented | Reply in thread; PR or diff not documented | Human |
| [Cursor](cursor.md) (cloud agent) | Prompt from an entry point (app, Slack, PR comment, Linear, API) | Builds, tests, interacts with the software; which checks not documented | PR on a separate branch, with screenshots, videos or logs | Automated once started |
| [GitHub Copilot](copilot.md) (assigned issue / chat) | Problem description, acceptance criteria, file pointers advised | Edits files, runs tests and linters | Branch or PR; feedback via @copilot comments adds commits | Human |
| [Claude Code](claude-code.md) (interactive session) | Prompt; guide advises a runnable check and definition of done | Does the work, runs the check, iterates until it passes | Commits and a PR on request | Human |
| **This sample** (`dev-task` skill) | One todo id | Isolate in a git worktree, code, verify, deliver | PR; todo marked `pr_open` | Human or the loop starts it |

## LOOP (as of 2026-10-13)

| Product | Input | Step | Output | Who drives |
| --- | --- | --- | --- | --- |
| [Devin](devin.md) (Automations) | Trigger: schedule, Slack, Linear, Jira, GitLab events | Optional validation script before start; concurrency limits; next task by itself not documented | A Devin session per trigger | Automated for the start |
| [Factory](factory.md) (Missions; Slack; `droid exec`) | Missions: finished feature and progress. Slack: mention. Exec: script or CI input | Missions: reviews progress after each feature, moves on, adds follow-ups | Missions: next feature starts. Slack: replies, PRs. Exec: machine-readable output | Missions and exec: Automated; Slack: Human |
| [OpenHands](openhands.md) (Automations) | Prompt plus schedule and timezone; event triggers listed elsewhere | Runs the prompt at each fire; chaining runs not documented | Whatever the prompt asks for; conversation saved | Automated for the start |
| [Cursor](cursor.md) (Automations) | Schedule, source-control, Slack, webhook, Linear/Sentry/PagerDuty events, plus a prompt | Follows the prompt; each run is independent, no chaining | PR comments, PRs or Slack messages | Automated |
| [GitHub Copilot](copilot.md) (cloud agent automations) | Task defined once, with schedule or repo event | Runs the saved task when it fires; next task by itself not documented | not documented | Automated for the start (dedicated page not fetched) |
| [Claude Code](claude-code.md) (routines) | Schedule, HTTP POST, or GitHub event | New session runs the saved prompt; nothing says it continues to a next task | Session with changes on a `claude/` branch | Automated |
| **This sample** (`factory/loop.ts`) | `todos.json` with a ready todo (pending, dependencies done) | Picks the first ready todo, runs the agent headlessly, re-reads the file, repeats | Next todo worked; stops on first todo not ending `pr_open` or `done` | Automated (script) |

The "This sample" rows come from [factory/README.md](../../factory/README.md), not from a first-party product page.

## Observations (for Dan)

Counting rule: a blank is a cell that is wholly "not documented" across the six products (not the sample row). Cells
that are filled but carry an "X not documented" aside are counted separately as partial.

| Grid | Column | Blanks (of 6) | Partial | Reads as |
| --- | --- | --- | --- | --- |
| PLAN | input | 1 (OpenHands) | 0 | Mostly the same: a typed request or ticket; Devin/Copilot start from an issue or ticket |
| PLAN | step | 1 (OpenHands) | 5 (task split with criteria/dependencies undocumented for Devin, Factory, Cursor, Copilot, Claude Code) | Differs; the split into tasks is where the sample is most specific and nobody sourced it |
| PLAN | output | 2 (Copilot, OpenHands) | 1 (Devin) | Differs: plan view, Mission Control, editable plan, spec file |
| PLAN | who drives | **3** (Devin, Copilot, OpenHands) | 0 | Where documented, always Human approves |
| DEV-TASK | input | 0 | 0 | Mostly the same: a written prompt or issue; criteria advised by Devin, Copilot, Claude Code |
| DEV-TASK | step | 1 (OpenHands) | 1 (Cursor: which checks run) | Mostly the same: build, test, iterate |
| DEV-TASK | output | 0 | 2 (Factory, OpenHands: PR not documented) | Mostly the same: a PR or branch |
| DEV-TASK | who drives | 1 (Devin) | 0 | Differs: Human (OpenHands, Copilot, Claude Code) vs Automated (Cursor, Factory) |
| LOOP | input | 0 | 0 | Mostly the same: schedule or event triggers |
| LOOP | step | 0 | 5 (continuing to a next task by itself is undocumented or stated as not happening for Devin, OpenHands, Cursor, Copilot, Claude Code) | Differs: only Factory Missions documents moving on by itself |
| LOOP | output | 1 (Copilot) | 0 | Differs, depending on the prompt |
| LOOP | who drives | 0 | 3 (Devin, OpenHands, Copilot: only the start) | Mostly the same: Automated for the start |

**Flagged for rework (more than two blanks):** PLAN / who drives (3 blanks). PLAN / output has two, at the limit.
Counting partials too, PLAN / step and LOOP / step are effectively undocumented on the questions the lesson cares about
(task splitting, continuing to the next task).

**Lesson content versus later lessons.** The differences that bear on lesson 1 are PLAN / step (does a plan split work
into tasks with criteria and dependencies), DEV-TASK / step and output (what verifies the work, what comes out), and
LOOP / step (does it continue to the next task on its own). PLAN / who drives and DEV-TASK / who drives relate to
human-in-the-loop, which Dan asked to add. LOOP / input and DEV-TASK / input mostly describe trigger surfaces and
entry points (Slack, Linear, schedules), which are closer to later-lesson topics than to what lesson 1 teaches;
treat them as candidates to drop in the second round.

**Kiro and Spec Kit.** Not rows: Kiro documents requirements, design and a tasks file and builds a dependency graph of
tasks ([Kiro specs](https://kiro.dev/docs/specs/), as of 2026-10-13); Spec Kit documents a specification, plan and
tasks step ([Spec Kit](https://github.com/github/spec-kit), as of 2026-10-13), but the page fetched did not detail
task dependencies, so only Kiro is confirmed to document them.
