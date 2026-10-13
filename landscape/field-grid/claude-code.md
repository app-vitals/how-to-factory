# Claude Code: lesson 1 field grid (redo)

Scope: lesson 1 only (plan, dev-task, loop). Every filled field is a paraphrase of a first-party page, with its URL and the
date I fetched it (2026-10-13). "Who drives" is one of Human, Human approves, Automated, and only when a page says so;
otherwise `not documented`, followed by the index pages checked. Names are the product's own, not canonical. Several surfaces
per grid are used where one surface does not cover the concept; each is named in its table, and interactive, headless
(`claude -p`) and scheduled/cloud surfaces are kept apart.

Method: started from the docs index (https://code.claude.com/docs/llms.txt, fetched 2026-10-13), listed the pages on planning,
workflows, verification, automation, scheduling and parallel work, and read the pages under "Pages read" (the list says which
were read through and which only in the sections used). This replaces an earlier, shallower draft of this file, which used a
few starting pages and had one interactive surface per grid.

Index pages checked for any `not documented` below: Best practices, Common workflows, How Claude Code works, Permission modes
(plan mode), Keep Claude working toward a goal, Automate actions with hooks, Run prompts on a schedule, Automate work with
routines, Schedule recurring tasks in Desktop, Run Claude Code programmatically, Claude Code GitHub Actions, Use Claude Code in
the cloud (auto-fix), Run agents in parallel, Orchestrate teams of Claude Code sessions, Let Claude coordinate ongoing work with
Projects, Manage multiple agents with agent view, Orchestrate subagents at scale with dynamic workflows (URLs under "Pages read").

## PLAN

### Surface 1: interactive session in plan mode

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A typed request in a session started with `claude --permission-mode plan`, or after `Shift+Tab`, or a prompt prefixed with `/plan`. The guide's own example asks which files need to change and what the flow is for adding Google sign-in | https://code.claude.com/docs/en/best-practices.md ; https://code.claude.com/docs/en/permission-modes.md | 2026-10-13 |
| step | Claude reads files and runs exploring shell commands, then writes a plan; source files are not edited until the plan is approved. The guide frames it as four phases: explore, plan, implement, commit, and says to skip planning when the diff could be described in one sentence. Splitting the plan into separate tasks with acceptance criteria or dependencies: not documented for plan mode (checked: Best practices, Permission modes, Common workflows "Plan before editing", How Claude Code works) | https://code.claude.com/docs/en/best-practices.md ; https://code.claude.com/docs/en/permission-modes.md | 2026-10-13 |
| output | A plan shown in the session, which the person can open in a text editor (`Ctrl+G`) and edit before approving. Approving offers three choices: continue in auto mode, continue approving each edit, or keep planning. The plan can also be saved to the repo, committed and pushed so a cloud session can execute it | https://code.claude.com/docs/en/permission-modes.md ; https://code.claude.com/docs/en/claude-code-on-the-web.md | 2026-10-13 |
| who drives | Human approves | https://code.claude.com/docs/en/permission-modes.md | 2026-10-13 |

### Surface 2: interview that writes a spec (interactive, then a fresh session)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A short description of the feature plus a prompt asking Claude to interview the person with its question tool about implementation, UI, edge cases and tradeoffs | https://code.claude.com/docs/en/best-practices.md | 2026-10-13 |
| step | Claude keeps asking until the topics are covered, then writes the spec. The page advises specs that name the files and interfaces involved, state what is out of scope, and end with an end-to-end verification step | https://code.claude.com/docs/en/best-practices.md | 2026-10-13 |
| output | A `SPEC.md` file; the guide then says to start a fresh session to execute it, so the new session has clean context and a written spec | https://code.claude.com/docs/en/best-practices.md | 2026-10-13 |
| who drives | Human: the person answers the questions and starts the executing session. The page does not call it an approval step | https://code.claude.com/docs/en/best-practices.md | 2026-10-13 |

### Surface 3: agent team (experimental, off by default)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A description of the project to the lead session, with the experimental flag `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` set | https://code.claude.com/docs/en/agent-teams.md | 2026-10-13 |
| step | The lead creates tasks in a shared task list; each task is pending, in progress or completed, and a task can depend on other tasks, in which case it cannot be claimed until they are completed. Acceptance criteria on a task: not documented (checked: Agent teams, Run agents in parallel) | https://code.claude.com/docs/en/agent-teams.md | 2026-10-13 |
| output | The shared task list, stored locally under `~/.claude/tasks/{team-name}/` | https://code.claude.com/docs/en/agent-teams.md | 2026-10-13 |
| who drives | Automated for the lead's task creation. For teammates that plan before implementing, the page says the lead's session approves a teammate's plan as soon as the request arrives, without a person reviewing it | https://code.claude.com/docs/en/agent-teams.md | 2026-10-13 |

### Surface 4: Projects (public beta, claude.ai/code)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | Work pasted into one project conversation: a bug report, a stack trace, a list of tasks, or a spec file in the repository ("build what `docs/spec.md` describes") | https://code.claude.com/docs/en/claude-projects.md | 2026-10-13 |
| step | Claude decides what becomes a thread (one piece of work each) and can be told to propose threads and wait for a go-ahead, or to hold pull requests until the person has seen the plan. The page says "the work splits into threads"; a written task list with acceptance criteria or dependencies: not documented (checked: Projects, Run agents in parallel) | https://code.claude.com/docs/en/claude-projects.md | 2026-10-13 |
| output | Threads, each a cloud session on its own branch, listed in an Overview pane | https://code.claude.com/docs/en/claude-projects.md | 2026-10-13 |
| who drives | Human approves when the person asks to confirm first; otherwise Automated (the page lets the person say "start these now without asking") | https://code.claude.com/docs/en/claude-projects.md | 2026-10-13 |

## DEV-TASK

### Surface 1: interactive session, one task

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A prompt. The guide advises including a way to check the work: example test cases, a screenshot to compare, the exact error with a request to fix the root cause. The `fix-issue` skill example takes an issue number and starts from `gh issue view` | https://code.claude.com/docs/en/best-practices.md | 2026-10-13 |
| step | Claude edits, runs the check, reads the result and iterates until it passes. The guide says to have Claude show evidence (test output, command and result, screenshot). The example skill lists: read the issue, search, implement, write and run tests, lint and typecheck, commit, push and open a PR | https://code.claude.com/docs/en/best-practices.md | 2026-10-13 |
| output | Edits in the working directory; a commit and a pull request when asked ("create a pr"). Claude Code links the session to the PR so it can be found with `claude --from-pr` | https://code.claude.com/docs/en/common-workflows.md | 2026-10-13 |
| who drives | Human: the person prompts, can interrupt, and rewind to a checkpoint | https://code.claude.com/docs/en/best-practices.md | 2026-10-13 |

### Surface 2: headless run (`claude -p`, GitHub Actions)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A prompt passed on the command line, optionally with piped input; permissions fixed up front with `--allowedTools` or `--permission-mode`. The page's example: "Run the test suite and fix any failures". In GitHub Actions: an `@claude` comment on an issue or PR, or a `prompt` input on any workflow event | https://code.claude.com/docs/en/headless.md ; https://code.claude.com/docs/en/github-actions.md | 2026-10-13 |
| step | The same agent loop as the interactive session, with no person to answer prompts: anything not pre-approved is denied, and `--permission-prompts none` tells Claude not to retry denied calls. The run waits for background work such as subagents and background commands before exiting. Exit code is 0 on success and non-zero on failure | https://code.claude.com/docs/en/headless.md | 2026-10-13 |
| output | Text, JSON (result, session id, cost) or streamed JSON on stdout, plus whatever the prompt makes Claude do (edits, commit). In Actions, replies go in a comment on the issue or PR in interactive mode, and in the workflow log by default in automation mode | https://code.claude.com/docs/en/headless.md ; https://code.claude.com/docs/en/github-actions.md | 2026-10-13 |
| who drives | Automated once started; a script, CI event or comment starts it | https://code.claude.com/docs/en/headless.md | 2026-10-13 |

### Surface 3: cloud session (`claude --cloud`, claude.ai/code)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A task description sent with `claude --cloud "..."`, from the web or the phone. The guide's flow for hard tasks: plan locally, save the plan in the repo, push it, then send "Execute the migration plan in docs/migration-plan.md" | https://code.claude.com/docs/en/claude-code-on-the-web.md | 2026-10-13 |
| step | Claude works in a cloud virtual machine with the repository cloned; it keeps running after the laptop is closed, and the person can steer it or queue follow-up messages. Which checks it runs is up to the prompt and the repository's own instructions: not documented as a built-in step (checked: Use Claude Code in the cloud, Get started in the cloud) | https://code.claude.com/docs/en/claude-code-on-the-web.md | 2026-10-13 |
| output | A session with changes on a branch, from which the person can create a PR; the session can be pulled into a terminal with `--teleport` | https://code.claude.com/docs/en/claude-code-on-the-web.md | 2026-10-13 |
| who drives | Automated after the task is sent; Human steers | https://code.claude.com/docs/en/claude-code-on-the-web.md | 2026-10-13 |

### Surface 4: verification by a second agent (subagent, `/code-review`, workflow)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | The finished diff, plus a plan or criteria the reviewer is told to check against | https://code.claude.com/docs/en/best-practices.md | 2026-10-13 |
| step | A reviewer subagent in a fresh context checks the diff against the plan (every requirement implemented, listed edge cases tested, nothing out of scope changed) and reports gaps. The guide warns that a reviewer asked for gaps will usually find some, and says to tell it to flag only correctness or stated-requirement gaps. Dynamic workflows can have a second set of agents try to refute findings | https://code.claude.com/docs/en/best-practices.md ; https://code.claude.com/docs/en/workflows.md | 2026-10-13 |
| output | A list of gaps returned to the implementing session, which can fix them and re-review | https://code.claude.com/docs/en/best-practices.md | 2026-10-13 |
| who drives | Human asks for the review (naming the subagent in a prompt, an @-mention, or `claude --agent NAME`); the fix and re-review then run in the session. The Sub-agents page adds that Claude can also delegate on its own: it "automatically delegates tasks based on the task description" and each subagent's `description`, and a description containing phrases like "use proactively" encourages it; the page's own code-reviewer example is described "Use immediately after writing or modifying code". So a person-defined reviewer can run without being asked each time, but nothing says Claude Code ships one that runs after every task (checked: Best practices, Run agents in parallel, Sub-agents) | https://code.claude.com/docs/en/best-practices.md ; https://code.claude.com/docs/en/sub-agents.md | 2026-10-13 |

Sub-agents page (read through, 2026-10-13), for this surface: a custom subagent is a Markdown file with frontmatter in `.claude/agents/` (project) or `~/.claude/agents/`, with its own tools, model and system prompt, and starts in a fresh context. Its `maxTurns` field caps agentic turns; on the cap the output comes back marked partial and Claude can resume it. A `Stop` hook in a subagent's frontmatter runs as `SubagentStop` when the subagent finishes, and `SubagentStart` and `SubagentStop` also fire from `settings.json`. The page does not say a `SubagentStop` hook can send a subagent back to work (the blocking behaviour is documented for `Stop` in the hooks guide, quoted in LOOP-WITHIN Surface 2), so that is not claimed here.

### Surface 5: delegate from Slack (Claude Code in Slack, cloud session)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | An `@Claude` mention in a channel the app was invited to (public or private, not DMs). Claude reads the thread, or recent channel messages, for context and picks a repository from it. In "Code + Chat" routing it decides whether the message is a coding task; "Code only" sends every mention to Claude Code. The page advises defining "what done looks like" (tests, docs, a PR) in the request | https://code.claude.com/docs/en/slack.md | 2026-10-13 |
| step | A Claude Code cloud session is created, status updates are posted in the Slack thread, and a completion message @mentions the person with a summary. Which checks the session runs: not documented on this page (checked: Slack page, Use Claude Code in the cloud) | https://code.claude.com/docs/en/slack.md | 2026-10-13 |
| output | A cloud session with the changes. A person clicks **Create PR** (or **View Session**) to open a pull request; each session can create one PR, and repositories must be on GitHub | https://code.claude.com/docs/en/slack.md | 2026-10-13 |
| who drives | Human starts it with the mention; the session then runs on its own (Automated), and a Human clicks Create PR. The page says Claude "may follow directions from other messages in the context", so it advises using it only in trusted conversations | https://code.claude.com/docs/en/slack.md | 2026-10-13 |

Product status on the page: it documents "the earlier Claude Code in Slack", which runs each session under an individual Claude account (Pro or Max), and says the earlier bot "is retired effective October 5, 2026" in workspaces an organization has connected to Claude Tag, the organization-managed version for Team and Enterprise (https://code.claude.com/docs/en/slack.md, 2026-10-13). Claude Tag's own docs live on claude.com and were not read in this pass.

## LOOP-WITHIN-A-TASK

### Surface 1: `/goal` (interactive; also `claude -p "/goal ..."`)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| retries until a check passes? | Yes. After every turn a model checks the condition; if not met, Claude starts another turn using the evaluator's reason as guidance. The loop ends when the condition is met, the evaluator judges it impossible, an error the person must fix clears it, or the person clears it. If Claude stops using tools for several turns in a row, the loop stops with the goal still set. A turn or time limit can be written into the condition itself. With `-p`, the loop runs to completion in one invocation | https://code.claude.com/docs/en/goal.md | 2026-10-13 |
| what judges it | A separate small fast model reading the conversation so far. It runs no commands and reads no files, so the condition has to be something Claude's own output shows, such as a test result in the transcript. The page says `/goal` wraps a session-scoped prompt-based Stop hook | https://code.claude.com/docs/en/goal.md | 2026-10-13 |
| who drives | Automated once the person sets the condition; Human chooses the condition and can clear it | https://code.claude.com/docs/en/goal.md | 2026-10-13 |

### Surface 2: Stop hook (settings file; interactive and headless)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| retries until a check passes? | Yes. A `Stop` hook runs each time Claude finishes responding and can block the stop. A command hook runs a script and blocks until it passes; a prompt hook asks a model and feeds its reason back as the next instruction; an agent hook (experimental) starts a subagent with tools to check, for example by running the tests. Claude Code overrides a Stop hook after eight blocks in a row with no tool call in between; the cap can be raised with an environment variable | https://code.claude.com/docs/en/hooks-guide.md ; https://code.claude.com/docs/en/best-practices.md | 2026-10-13 |
| what judges it | Whatever the hook runs: the person's script (deterministic), a model reading the hook input, or a subagent that runs commands | https://code.claude.com/docs/en/hooks-guide.md | 2026-10-13 |
| who drives | Automated once the hook is in a settings file; the person writes it | https://code.claude.com/docs/en/hooks-guide.md | 2026-10-13 |

### Surface 3: check inside one prompt (interactive)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| retries until a check passes? | Yes, when the prompt asks for it: Claude does the work, runs the check, reads the result and iterates until it passes. This is the cheapest of the four options the guide lists (prompt, `/goal`, Stop hook, second opinion) and the only one that ends when Claude decides it is done | https://code.claude.com/docs/en/best-practices.md | 2026-10-13 |
| what judges it | The check itself (tests, build exit code, linter, a screenshot comparison); Claude reads the output | https://code.claude.com/docs/en/best-practices.md | 2026-10-13 |
| who drives | Human starts it; Claude drives the iterations | https://code.claude.com/docs/en/best-practices.md | 2026-10-13 |

### Surface 4: auto-fix of an open PR (cloud session)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| retries until a check passes? | Partly. While auto-fix is on, Claude receives CI failures and review comments for the PR, investigates and pushes a fix when one is clear. It does not stop at a pass/fail condition: the page describes reacting to each event, and says GitHub sends no event when the base branch moves and creates a conflict, so conflicts need a person to ask for a rebase | https://code.claude.com/docs/en/claude-code-on-the-web.md | 2026-10-13 |
| what judges it | The repository's CI checks and the reviewers' comments; for ambiguous comments Claude asks the person first | https://code.claude.com/docs/en/claude-code-on-the-web.md | 2026-10-13 |
| who drives | Automated once the per-PR toggle is on (the person turns it on, from the CI status bar, `/autofix-pr`, or by asking) | https://code.claude.com/docs/en/claude-code-on-the-web.md | 2026-10-13 |

### Surface 5: `/loop` inside an open session (see also LOOP-ACROSS)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| retries until a check passes? | Repeats a prompt on an interval, not toward a condition. Without an interval Claude picks a delay of one minute to one hour after each iteration and can end the loop itself once the task is done; the goal page contrasts it with `/goal`. Its built-in maintenance prompt continues unfinished work and tends the current branch's PR (review comments, failed CI, merge conflicts) | https://code.claude.com/docs/en/scheduled-tasks.md ; https://code.claude.com/docs/en/goal.md | 2026-10-13 |
| what judges it | Claude, each iteration; a recurring task also expires after seven days | https://code.claude.com/docs/en/scheduled-tasks.md | 2026-10-13 |
| who drives | Automated after the person starts it | https://code.claude.com/docs/en/scheduled-tasks.md | 2026-10-13 |

## LOOP-ACROSS-TASKS

### Surface 1: routines (cloud, scheduled / API / GitHub triggers)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| what moves on by itself | A saved prompt, repositories and connectors start a new cloud session on a schedule (hourly or longer, or once at a set time), on an HTTP POST to the routine's endpoint, or on a GitHub pull request or release event, with filters on author, labels, branch and draft state. Sessions are not reused: two PR events make two sessions. Issue events and issue labels are not in the listed GitHub events (checked: Routines "Supported events") | https://code.claude.com/docs/en/routines.md | 2026-10-13 |
| queue / pacing | Minimum interval one hour. Hourly caps: 100 scheduled runs per account; 30 manual or API fires per routine; GitHub events have their own caps and extra events are dropped. A work queue or item list kept by the routine: not documented (checked: Routines, Run prompts on a schedule); the page's "backlog maintenance" example has the prompt read an issue tracker through a connector | https://code.claude.com/docs/en/routines.md | 2026-10-13 |
| output | One session per run, with changes on a `claude/` branch; the person can open it, review and create a PR. A green run status only means the session started and exited, not that the task succeeded | https://code.claude.com/docs/en/routines.md | 2026-10-13 |
| next piece of work after a run finishes | Not documented as a feature: the next run starts at the next trigger. Checked: Routines, Run prompts on a schedule, Run agents in parallel | https://code.claude.com/docs/en/routines.md | 2026-10-13 |
| who drives | Automated after a person creates it; runs without permission prompts | https://code.claude.com/docs/en/routines.md | 2026-10-13 |

### Surface 2: desktop scheduled tasks (local, scheduled)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| what moves on by itself | A schedule (manual, hourly, daily, weekdays, weekly, or any interval asked for in plain language, down to one minute) starts a fresh session on the person's machine, optionally in its own git worktree | https://code.claude.com/docs/en/desktop-scheduled-tasks.md ; https://code.claude.com/docs/en/scheduled-tasks.md | 2026-10-13 |
| queue / pacing | Runs only while the app is open and the computer is awake; missed runs get one catch-up run for the latest missed time. A run is skipped if the previous one is still running. A work queue: not documented (checked: Desktop scheduled tasks, Run prompts on a schedule) | https://code.claude.com/docs/en/desktop-scheduled-tasks.md | 2026-10-13 |
| output | A new session in a Scheduled list with a desktop notification; Claude can edit, commit and open PRs | https://code.claude.com/docs/en/desktop-scheduled-tasks.md | 2026-10-13 |
| next piece of work after a run finishes | Not documented as a feature (same pages checked) | n/a | 2026-10-13 |
| who drives | Automated after a person creates it; permission mode is set per task | https://code.claude.com/docs/en/desktop-scheduled-tasks.md | 2026-10-13 |

### Surface 3: GitHub Actions (CI events or cron)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| what moves on by itself | A workflow runs Claude on any GitHub event or `cron` schedule when it has a `prompt` input (automation mode), or answers `@claude` mentions in issues, PRs and reviews and in the body or title of a newly opened issue (interactive mode). The page's setup copies a ready-made `claude.yml` | https://code.claude.com/docs/en/github-actions.md | 2026-10-13 |
| queue / pacing | GitHub's own event and runner model; bot actors are rejected unless listed in `allowed_bots`, which the page says keeps bots from triggering Claude in a loop. A queue of issues worked in order: not documented (checked: GitHub Actions, Run agents in parallel) | https://code.claude.com/docs/en/github-actions.md | 2026-10-13 |
| output | A comment on the issue or PR, commits pushed, or the workflow log | https://code.claude.com/docs/en/github-actions.md | 2026-10-13 |
| next piece of work after a run finishes | Not documented as a feature: the next event or cron tick starts the next run | https://code.claude.com/docs/en/github-actions.md | 2026-10-13 |
| who drives | Automated after the workflow file is committed; a comment from a person with write access starts an interactive run | https://code.claude.com/docs/en/github-actions.md | 2026-10-13 |

### Surface 4: `/goal` over a backlog, and agent team self-claim (inside one session or team)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| what moves on by itself | `/goal` is listed as suited to "working through a labeled issue backlog until the queue is empty": the next turn starts when the previous finishes. In an agent team, a teammate that finishes a task picks up the next unassigned, unblocked task from the shared list on its own | https://code.claude.com/docs/en/goal.md ; https://code.claude.com/docs/en/agent-teams.md | 2026-10-13 |
| queue / pacing | The goal page names the queue only as an example condition and gives no queue mechanism. For teams: a shared task list with pending, in progress and completed states, dependencies, and file locking so two teammates cannot claim the same task. Hooks `TaskCompleted` and `TeammateIdle` can send feedback and keep a teammate working | https://code.claude.com/docs/en/goal.md ; https://code.claude.com/docs/en/agent-teams.md | 2026-10-13 |
| output | The session's work (goal); completed tasks in the list (team) | https://code.claude.com/docs/en/agent-teams.md | 2026-10-13 |
| next piece of work after a run finishes | Yes, inside the session or team: next turn (goal) or next unblocked task (team, experimental and off by default) | https://code.claude.com/docs/en/agent-teams.md | 2026-10-13 |
| who drives | Automated after a person sets the goal or starts the team | https://code.claude.com/docs/en/agent-teams.md | 2026-10-13 |

### Surface 5: shell script around `claude -p`, `/batch`, and Projects (fan-out over a list)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| what moves on by itself | The best-practices guide shows a shell loop that calls `claude -p` once per file from a list the first run wrote, with tools pre-approved. `/batch` splits one change across 5 to 30 worktree-isolated subagents. In Projects, Claude starts a thread per task in the conversation and routes follow-ups to existing threads | https://code.claude.com/docs/en/best-practices.md ; https://code.claude.com/docs/en/claude-projects.md | 2026-10-13 |
| queue / pacing | A text file of tasks, read by the person's script (headless); a number of subagents (`/batch`); a list of threads in an Overview pane with states such as Waiting on you, Ready for review and Landing, with a thread limit the person can state (Projects; the page says that is an instruction, not a hard cap) | https://code.claude.com/docs/en/best-practices.md ; https://code.claude.com/docs/en/claude-projects.md | 2026-10-13 |
| output | One invocation, subagent or thread per item, each normally with its own branch or PR | https://code.claude.com/docs/en/claude-projects.md | 2026-10-13 |
| next piece of work after a run finishes | Yes in the shell loop (the script) and in Projects (the coordinating conversation starts threads; an idle thread also wakes when CI fails or a comment arrives on its PR) | https://code.claude.com/docs/en/claude-projects.md | 2026-10-13 |
| who drives | Automated for the script and `/batch` once started; Projects: Human approves if told to confirm first, otherwise Automated | https://code.claude.com/docs/en/claude-projects.md | 2026-10-13 |

### Surface 6: sessions messaging each other (cross-session messaging)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| what moves on by itself | Claude can send a plain-text message from one of the person's sessions to another (same machine over a local socket; other machines and cloud sessions through Remote Control and Anthropic servers), on its own or when asked. A message to an idle session starts a new turn there; to a busy one it is read between tool calls. Claude can also ask a session on this machine for one notice "when it next goes idle or exits" (`notify_when_idle`), so a watching session can start the next step when a worker finishes | https://code.claude.com/docs/en/cross-session-messaging.md | 2026-10-13 |
| queue / pacing | No task queue: a message is text, never the sender's history or files. A receiving session queues at most 50 accepted messages, rate-limits repeats per sender (so a message loop between two sessions stops on its own), and a notice subscription is dropped after 12 hours. Receivers set `crossSessionInbound` to `accept`, `hold` or `refuse`; by default a message to a session that prompts for permission is delivered, and one to a session that bypasses prompts is held for approval | https://code.claude.com/docs/en/cross-session-messaging.md | 2026-10-13 |
| output | Another turn in the receiving session; the page's examples are a migration finishing, a schema change another session builds on, and status from long-running work | https://code.claude.com/docs/en/cross-session-messaging.md | 2026-10-13 |
| next piece of work after a run finishes | Not documented as a work-picking feature. The page shows sessions handing findings and idle notices to each other; choosing the next task is left to the sessions' own prompts. A message cannot approve a permission prompt or change settings on the receiving side. Only the main conversation can subscribe to an idle notice, and only for the person's own local sessions | https://code.claude.com/docs/en/cross-session-messaging.md | 2026-10-13 |
| who drives | Automated once Claude decides to send, or Human asks it to; the receiving session's controls decide whether it is delivered | https://code.claude.com/docs/en/cross-session-messaging.md | 2026-10-13 |

## Pages read

All fetched 2026-10-13. "In full" means read from the first line to the last; "sections" means only the parts used above.

- https://code.claude.com/docs/llms.txt (the docs index, read in full)
- https://code.claude.com/docs/en/best-practices.md (in full)
- https://code.claude.com/docs/en/goal.md (in full)
- https://code.claude.com/docs/en/scheduled-tasks.md (in full)
- https://code.claude.com/docs/en/routines.md (in full)
- https://code.claude.com/docs/en/headless.md (in full)
- https://code.claude.com/docs/en/common-workflows.md (in full)
- https://code.claude.com/docs/en/agents.md (in full)
- https://code.claude.com/docs/en/hooks-guide.md (sections: events table, prompt-based hooks, agent-based hooks, Stop block cap)
- https://code.claude.com/docs/en/permission-modes.md (sections: available modes, common setups, plan mode, auto mode intro)
- https://code.claude.com/docs/en/desktop-scheduled-tasks.md (sections: intro, schedule options, how tasks run, missed runs, permissions, manage)
- https://code.claude.com/docs/en/github-actions.md (sections: intro, modes, who can trigger, `@claude` workflow, schedule workflow)
- https://code.claude.com/docs/en/claude-code-on-the-web.md (sections: `--cloud`, plan locally then execute, follow-ups, auto-fix)
- https://code.claude.com/docs/en/agent-teams.md (sections: intro, comparison, assign and claim tasks, hooks, plan approval)
- https://code.claude.com/docs/en/claude-projects.md (sections: intro, when to use, how a project is organized, pull requests, tuning)
- https://code.claude.com/docs/en/workflows.md (sections: intro, when to use, bundled workflow, watching a run)
- https://code.claude.com/docs/en/agent-view.md (intro only)
- https://code.claude.com/docs/en/channels.md (intro only)
- https://code.claude.com/docs/en/overview.md and https://code.claude.com/docs/en/how-claude-code-works.md (searched for the planning, loop, scheduling and CI passages; not read through)
- https://code.claude.com/docs/en/sub-agents.md (gap-closing pass, read through from the first line to the last)
- https://code.claude.com/docs/en/slack.md (gap-closing pass, in full)
- https://code.claude.com/docs/en/cross-session-messaging.md (gap-closing pass, in full)

## Ruled out (why)

- **Channels** (https://code.claude.com/docs/en/channels.md, intro read): an MCP server pushes chat or CI events into a session that is
  already open. It is a way to feed events to a running session, not a plan, a verify loop or a queue, and events only arrive
  while the session is open.
- **Agent view** (https://code.claude.com/docs/en/agent-view.md): dispatching and watching several background sessions is parallel runs,
  which is out of lesson 1 scope. Read only in its intro. Cross-session messaging, the Sub-agents page and the Slack page were
  read in the gap-closing pass (see below) and are now used in DEV-TASK Surfaces 4 and 5 and LOOP-ACROSS Surface 6.
- **Code Review and ultrareview** (https://code.claude.com/docs/en/code-review.md, https://code.claude.com/docs/en/ultrareview.md): review policy
  and posting, out of lesson 1 scope. Code Review was fetched but not read through, ultrareview was not fetched; `/code-review`
  appears only where the best-practices page names it as a check.
- **Worktrees, cloud environments, sandboxing, network access, permissions detail, Remote Control** (index pages, not fetched):
  isolation and ops, out of scope. Worktrees are mentioned only where a read page names them.
- **Plugins, skills authoring, mods, MCP setup, model and cost pages, administration, deployment and enterprise pages**: setup and
  administration, not what a lesson-1 factory does. The skills page (https://code.claude.com/docs/en/skills.md) was fetched but only
  used through the best-practices examples; the hooks reference (https://code.claude.com/docs/en/hooks.md) was fetched and used only for
  the `Stop` summary in the hooks guide.
- **GitLab CI/CD** (https://code.claude.com/docs/en/gitlab-ci-cd.md): by its index description the GitLab counterpart of the GitHub
  Actions surface; not fetched.
- **Shipwright marketing pages** (`site/src/pages/compare.astro`, `vs/*.astro`): not consulted; no wording or claims reused.

## Gap-closing pass (2026-10-13)

Fetch date for every page below: 2026-10-13. All were fetched as Markdown (`.md` suffix) and read through; none was unreachable. Flags come from "CROSS-CHECK" in `README.md`.

| Flag | Page read | Changed a cell? |
| --- | --- | --- |
| Sub-agents page, fetched but not read through | https://code.claude.com/docs/en/sub-agents.md (all 1,420 lines: built-ins, quickstart, scopes, frontmatter, tools, permission modes, memory, hooks, delegation, foreground and background, patterns, nesting, resume, forks, example subagents) | **Yes**, DEV-TASK Surface 4 "who drives": Claude can delegate to a person-defined reviewer subagent on its own, from the subagent's `description` ("use proactively"); it is not a built-in gate. Also logged: `maxTurns`, partial output and resume, and `Stop` hooks in a subagent running as `SubagentStop`. Not found: any statement that a `SubagentStop` hook can send a subagent back to work |
| Slack page, not fetched | https://code.claude.com/docs/en/slack.md (in full) | **Yes**, new DEV-TASK Surface 5: input from a channel mention, cloud session, status in thread, a person clicks Create PR; checks not documented. Also logs the Oct 5, 2026 retirement of the earlier bot in Claude Tag workspaces |
| Cross-session messaging page, not fetched | https://code.claude.com/docs/en/cross-session-messaging.md (in full) | Partly, new LOOP-ACROSS Surface 6: sessions can message each other and ask for an idle notice; it is not a queue and does not choose the next task, so the "next piece of work" answer for the existing surfaces is unchanged |

Not read in this pass (outside the flags): https://code.claude.com/docs/en/claude-tag.md was fetched and is a web landing page that points to setup and usage docs on claude.com, so Claude Tag itself is not described here.

**Net effect on the slide cells.** PLAN (output, who drives), LOOP within a task and LOOP across tasks are unchanged: the three pages add no plan format, no loop-until-pass mechanism beyond the `Stop` hook, `/goal` and PR auto-fix already recorded, and no work queue. DEV-TASK (what judges done) gains the delegation-by-description point and a Slack entry point, neither of which is a fixed pre-delivery check.
