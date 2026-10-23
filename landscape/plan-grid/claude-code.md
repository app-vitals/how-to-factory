# Claude Code: lesson 2 plan grid (spec to plan)

Scope: lesson 2 only, the step where a spec or request becomes a plan. Left out on purpose: test and verification planning
(verification lesson), how specs are written (intake lesson), standards files, estimates and model tiers, and bundling or
PR shaping. Every filled field is a paraphrase of a first-party page, with its URL and the date I fetched it
(**2026-10-19**). Nothing here is carried over from the 2026-10-13 notes in `lessons/README.md` or
`landscape/field-grid/claude-code.md`; every page below was fetched again.

"Approval before work starts" uses exactly one of **Human**, **Human approves** or **Automated**, and only where a page
states it. Where a page does not, the cell says `not documented` and names the index pages checked. Names are Claude Code's
own, not canonical. Several surfaces are used because no single one covers every column; each row names its surface.

Method: fetched the docs index (https://code.claude.com/docs/llms.txt, 2026-10-19; about 230 English pages), listed every
page in the Build with Claude Code, Platforms, Reference and Agent SDK sections that could touch planning, design before
coding, code exploration, plan review or approval, and turning a plan into tasks, then fetched the raw markdown of those
pages. Pages whose subject is planning were read in full; long reference pages (settings, tools, commands, skills, desktop,
VS Code, agent view, hooks guide) were searched for plan, approval, clarification, task and dependency wording and the
matching sections read, not read end to end. Both lists are under "Pages read" and "Ruled out (why)".

## The grid

| Surface | READS THE CODE BEFORE PROPOSING | DESIGN OUTPUT AND ITS FORM | NAMES REUSE, RISKS OR BREAKING CHANGES | APPROVAL BEFORE WORK STARTS | HOW IT BECOMES TASKS |
| --- | --- | --- | --- | --- | --- |
| **Plan mode** (terminal CLI, Desktop, VS Code; `Shift+Tab`, `/plan`, `--permission-mode plan`) | Yes, by definition: Claude reads files and runs shell commands to explore, and does not edit source. Edits stay blocked until a plan is approved, except in an interactive terminal session with bypass permissions available, where the block is not enforced and Claude is only told to plan. Claude can also ask multiple-choice clarifying questions with its question tool. ([Permission modes](https://code.claude.com/docs/en/permission-modes), [Tools reference](https://code.claude.com/docs/en/tools-reference), 2026-10-19) | A plan written to a file (default folder under the user's Claude directory; the `plansDirectory` setting moves it into the project) and shown for review. You can open it in your editor with `Ctrl+G` and change it before approving. In VS Code it opens as a Markdown document where you add inline comments. Required sections: not documented (checked: Permission modes, Best practices, Common workflows, VS Code, Desktop). ([Permission modes](https://code.claude.com/docs/en/permission-modes), [Settings](https://code.claude.com/docs/en/settings-reference), [VS Code](https://code.claude.com/docs/en/vs-code), 2026-10-19) | Not built in. The docs' own example prompt asks "what files need to change" and "what's the session flow", and the guidance on prompts tells you to point Claude at an existing pattern to follow, so reuse and file impact come from what you ask for. Risks and breaking changes: not documented (checked: Permission modes, Best practices, Common workflows, Prompt library, Large codebases). ([Best practices](https://code.claude.com/docs/en/best-practices), 2026-10-19) | **Human approves.** When the plan is ready Claude presents it and offers: approve and continue in auto mode, approve and review each edit, or keep planning. Pressing `Shift+Tab` leaves plan mode without approving. ([Permission modes](https://code.claude.com/docs/en/permission-modes), 2026-10-19) | Not documented as a conversion (checked: Permission modes, Best practices, Common workflows, Tools reference, Interactive mode). Approving ends plan mode and Claude starts editing in the same session, "verifying against its plan"; the plan file is re-injected after context compaction in long sessions. Separately, Claude keeps its own to-do checklist for multi-step work (see the task list row), but no page says the plan is split into it. ([Best practices](https://code.claude.com/docs/en/best-practices), [Large codebases](https://code.claude.com/docs/en/large-codebases), 2026-10-19) |
| **Built-in Explore and Plan subagents** (inside a session) | Yes. Explore is a read-only search agent that Claude hands code searches to, at a thoroughness it picks (quick, medium, very thorough), so results stay out of the main context. Plan is a read-only research agent used while in plan mode. Both start without your CLAUDE.md and git status. ([Subagents](https://code.claude.com/docs/en/sub-agents), 2026-10-19) | Findings returned to the main conversation; the plan itself is still written by the main session. Exact return shape: not documented (checked: Subagents, Features overview). ([Subagents](https://code.claude.com/docs/en/sub-agents), 2026-10-19) | Not documented (checked: Subagents, Features overview). | Not documented (checked: Subagents). Subagents inherit the session's permission rules and are read-only, so they do not themselves start work. ([Subagents](https://code.claude.com/docs/en/sub-agents), 2026-10-19) | Not documented (checked: Subagents, Features overview). |
| **`/batch` bundled skill** (terminal) | Yes: the skill researches the codebase first. ([Commands](https://code.claude.com/docs/en/commands), 2026-10-19) | A plan that splits a large change into 5 to 30 independent units. Presented form: not documented (checked: Commands, Skills). ([Commands](https://code.claude.com/docs/en/commands), 2026-10-19) | Independence of the units is the stated aim of the decomposition; reuse, risks and breaking changes: not documented (checked: Commands, Skills). ([Commands](https://code.claude.com/docs/en/commands), 2026-10-19) | The page says the plan is presented and work starts "once approved" but not who approves, so no label: not documented (checked: Commands, Skills). ([Commands](https://code.claude.com/docs/en/commands), 2026-10-19) | After approval, one background subagent per unit, each in its own isolated worktree; each implements its unit, runs tests and publishes its change. ([Commands](https://code.claude.com/docs/en/commands), 2026-10-19) |
| **Agent teams** (experimental; lead plus teammates) | A teammate spawned while the lead is in plan mode works read-only until its plan is ready. How it reads the code: follows plan mode above. ([Agent teams](https://code.claude.com/docs/en/agent-teams), 2026-10-19) | A plan approval request sent from teammate to lead. Form of the plan: not documented (checked: Agent teams). ([Agent teams](https://code.claude.com/docs/en/agent-teams), 2026-10-19) | Not documented (checked: Agent teams). | **Automated.** The page says Claude Code approves the teammate's plan in the lead's session as soon as it arrives, without the lead reviewing it, unless you changed that teammate's permission mode after it was spawned (then the lead reviews it); edits and commands afterwards still go through permission prompts. ([Agent teams](https://code.claude.com/docs/en/agent-teams), 2026-10-19) | A shared task list: the lead creates tasks, teammates claim them, states are pending, in progress and completed, and a task with unfinished dependencies cannot be claimed until they complete. The page does not say a teammate's plan becomes those tasks. ([Agent teams](https://code.claude.com/docs/en/agent-teams), 2026-10-19) |
| **Session task list** (Claude's own checklist, terminal) | Not applicable: this is bookkeeping, not exploration. | A checklist of items Claude creates to plan multi-step work, each pending, in progress or complete. Only present on the models listed in the docs; newer models do not get it by default. ([Interactive mode](https://code.claude.com/docs/en/interactive-mode), [Tools reference](https://code.claude.com/docs/en/tools-reference), 2026-10-19) | Not documented (checked: Interactive mode, Tools reference, Agent SDK todo tracking). | Not documented (checked: Interactive mode, Tools reference). No approval step is described; it is shown to you with `Ctrl+T`. | Claude creates the items itself; they persist across context compactions, and a named list directory can be shared across sessions with an environment variable. Whether it comes from an approved plan: not documented. ([Interactive mode](https://code.claude.com/docs/en/interactive-mode), 2026-10-19) |
| **Plan locally, run in the cloud** (`claude --cloud`, web) | Plan mode locally, as above; the cloud session reads the pushed repo. ([Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web), 2026-10-19) | The plan saved as a file in the repo, committed and pushed so the cloud machine can clone it. ([Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web), 2026-10-19) | Not documented (checked: Claude Code on the web). | **Human approves**, via the local plan mode step above; the cloud page itself only says to push and start the session "once you're satisfied". ([Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web), 2026-10-19) | One cloud session is started by a prompt that points at the plan file; each `--cloud` command is an independent parallel session. The page does not describe splitting the plan itself. ([Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web), 2026-10-19) |
| **Projects** (cloud coordinator conversation, claude.ai; public beta on Pro and Max) | Not documented how the coordinator looks at code before acting (checked: Projects, Claude Code on the web). Threads clone the added repositories with their CLAUDE.md, but not the repositories' skills. ([Projects](https://code.claude.com/docs/en/claude-projects), 2026-10-19) | Optionally a Suggested threads list, where you click a suggestion to start that thread. Not a plan document. ([Projects](https://code.claude.com/docs/en/claude-projects), 2026-10-19) | Not documented (checked: Projects). | **Human approves**, but only if you ask: you can tell Claude to propose threads and wait for a go-ahead, or to start without asking. The page says such preferences are instructions Claude keeps to, not enforced settings. ([Projects](https://code.claude.com/docs/en/claude-projects), 2026-10-19) | The coordinator turns each message into a thread (a cloud session), several unrelated tasks in one message become separate threads. ([Projects](https://code.claude.com/docs/en/claude-projects), 2026-10-19) |
| **Agent SDK plan mode** (programmatic) | Same behavior: explores without editing; may ask clarifying questions first. ([Agent SDK permissions](https://code.claude.com/docs/en/agent-sdk/permissions), [Handle approvals and user input](https://code.claude.com/docs/en/agent-sdk/user-input), 2026-10-19) | Not documented what the plan looks like to the host (checked: Agent SDK permissions, Handle approvals and user input, Todo tracking). | Not documented (checked: Agent SDK permissions, Handle approvals and user input). | Not documented as an approval label. File edits are never auto-approved in plan mode, even by allow rules or a hook; they go to your approval callback. ([Agent SDK permissions](https://code.claude.com/docs/en/agent-sdk/permissions), 2026-10-19) | Not documented (checked: Agent SDK permissions, Todo tracking). |
| **Dynamic workflows** (script of many subagents) | Subagents explore their areas independently; the page lists "a plan drafted from several angles" as a use. ([Dynamic workflows](https://code.claude.com/docs/en/workflows), [Agents](https://code.claude.com/docs/en/agents), 2026-10-19) | A JavaScript script Claude writes that holds the orchestration; before the run you see the planned phases and can view the raw script. ([Dynamic workflows](https://code.claude.com/docs/en/workflows), 2026-10-19) | Not documented (checked: Dynamic workflows). | **Human approves** in Manual and accept-edits modes (each run), once in auto mode (first launch), and not at all in bypass mode, `claude -p` or the SDK, where it is governed by permission rules. This approves running the script, not a design. ([Dynamic workflows](https://code.claude.com/docs/en/workflows), 2026-10-19) | The script itself is the task structure; the runtime launches the agents it names. ([Dynamic workflows](https://code.claude.com/docs/en/workflows), 2026-10-19) |

## Pages read

Fetched 2026-10-19 as raw markdown from the docs index at https://code.claude.com/docs/llms.txt (each at
`https://code.claude.com/docs/en/<name>.md`). "In full" means the section or page was read through; "searched" means searched
for plan, approval, clarification, task, dependency and spec wording with the matching sections read.

- Permission modes (`permission-modes`): plan mode and approval sections in full, rest searched
- Best practices (`best-practices`): explore, plan, code and prompting sections in full, rest searched
- Common workflows (`common-workflows`): "Plan before editing" in full, rest searched
- Subagents (`sub-agents`): built-in subagents section in full, rest searched
- Commands (`commands`): searched; the `/plan` and `/batch` rows read
- Tools reference (`tools-reference`): tool table, question tool and task-tool availability sections read
- Interactive mode (`interactive-mode`): task list section read, rest searched
- Agent teams (`agent-teams`): plan-before-implementing and task list sections in full, rest searched
- Dynamic workflows (`workflows`): comparison table and approval section in full, rest searched
- Projects (`claude-projects`): working-in-a-project sections in full, rest searched
- Claude Code on the web (`claude-code-on-the-web`): "Plan locally, execute in the cloud" read, rest searched
- Large codebases (`large-codebases`): "Scope and plan changes that span packages" read, rest searched
- Settings reference (`settings-reference`): `plansDirectory`, `useAutoModeDuringPlan` and `showClearContextOnPlanAccept` entries read
- Claude directory (`claude-directory`): searched for the plans folder
- How Claude Code works (`how-claude-code-works`): permission mode list read, rest searched
- Agent SDK permissions (`agent-sdk/permissions`): plan mode section read
- Agent SDK handle approvals and user input (`agent-sdk/user-input`): clarifying questions section read
- Agent SDK todo tracking (`agent-sdk/todo-tracking`): searched
- VS Code (`vs-code`): permission modes and `/plan` section read, rest searched
- Desktop (`desktop`): permission modes section read, rest searched
- Agents (`agents`): searched
- Goal (`goal`): opening and comparison table read
- Skills (`skills`): searched (bundled skills and subagent fields)
- Agent view (`agent-view`): searched
- Prompt library (`prompt-library`): the Plan-tagged prompts read
- Features overview (`features-overview`): searched
- CLI reference (`cli-reference`), Headless (`headless`): searched, no plan wording beyond the permission-mode flag

## Ruled out (why)

Pages from the same index that I set aside for this lesson, with the reason.

- Goal (https://code.claude.com/docs/en/goal): keeps a session running until a stated condition holds. That is execution and completion checking, not planning; the condition is the verification lesson's territory.
- Routines, Scheduled tasks, Desktop scheduled tasks, Channels, Remote Control, Deep links, Mobile: ways to trigger or reach sessions, not planning.
- Slack, Claude Tag, GitHub Actions, GitLab CI/CD, Headless: start work from a message, mention or pipeline; searched, no plan or approval wording for a design step (the Slack and Actions pages talk only about plan limits).
- Code Review pages, `/code-review`, Ultrareview, Security guidance, Claude Security: reviews of code that exists, not plans.
- `/ultraplan`: the commands page lists it as removed in favor of plan mode, so there is nothing current to record.
- Memory, CLAUDE.md, rules, Skills (beyond bundled-skill rows), Output styles, Hooks, Plugins and Mods pages, Settings files: standards and instruction files, owned by a later lesson.
- "Let Claude interview you" in Best practices: has Claude question you and write a SPEC.md, which is how specs are written (intake lesson). Left out of the grid.
- Model config (including the `opusplan` setting), Fast mode, Advisor, Costs, Effort and usage pages: model tiers and estimates, left out on purpose.
- Worktrees, Sessions, Checkpointing, Context window, Prompt caching: mechanics for running or resuming sessions; searched, no planning content beyond what is cited above.
- Agent SDK pages other than permissions, user input and todo tracking (hosting, sessions, streaming, hooks, MCP, custom tools, observability, references): build and hosting details.
- Admin, setup, authentication, cloud-provider, gateway, network, security, data and legal pages: deployment and administration.
- Chrome, Computer use, JetBrains, Desktop iOS simulator, Platforms and integrations: other ways to run or drive the tool; Platforms read only to confirm there is no separate planning feature.
- What's new weekly pages and the changelog: release notes, not the current docs of record; every claim above rests on the reference pages instead.

## Depth dimensions

Added in the depth-reset pass. Twelve extra dimensions for each of the nine surfaces above, with the same surface names. Every
page below was fetched again on **2026-10-20**: the docs index (https://code.claude.com/docs/llms.txt) first, then each page as raw
Markdown, read or searched for the dimension's terms. Nothing here changes the grid above, and the fetch dates in the grid stay as
they were. Names are Claude Code's own. "Not documented" always names the pages checked. Where a page states an intention and not a
mechanism, the entry says so and does not guess which one it is. The read-only row uses the labels **Tool restriction** and
**Instruction only**; where the docs name no mechanism the entry says that instead. The headline finding above (no single surface
covers every column) holds for these dimensions too: most of the depth lives in plan mode and agent teams, and the other surfaces
borrow it.

### Plan mode (terminal CLI, Desktop, VS Code; `Shift+Tab`, `/plan`, `--permission-mode plan`)

| Dimension | What the docs say | Sources (fetched 2026-10-20) |
| --- | --- | --- |
| Clarify or interview mode | Yes. Claude can ask multiple-choice questions with its question tool while it plans; you answer by picking an option or typing your own text. An unanswered question stays open unless you set a timeout setting. A separate documented habit is to ask Claude to interview you and write a spec file; that is how specs are written, so it is left to the intake lesson. | [Tools reference](https://code.claude.com/docs/en/tools-reference), [Best practices](https://code.claude.com/docs/en/best-practices) |
| Assumptions or open questions surfaced | Partly. The question tool is the documented route for surfacing what Claude is unsure of. A plan section for assumptions or open questions: not documented (checked: Permission modes, Best practices, Common workflows, Tools reference, Large codebases). | [Tools reference](https://code.claude.com/docs/en/tools-reference), [Permission modes](https://code.claude.com/docs/en/permission-modes) |
| Plan editable before approval | Yes. `Ctrl+G` opens the proposed plan in your editor so you can change it before Claude proceeds, and "No, keep planning" lets you tell Claude what to change. In VS Code the plan opens as a Markdown document where you add comments (see the grid above). | [Permission modes](https://code.claude.com/docs/en/permission-modes), [Best practices](https://code.claude.com/docs/en/best-practices) |
| Where the plan is saved | A file. By default under the user's Claude directory in the home folder; the `plansDirectory` setting moves it into the project, unless the path resolves outside the project root, in which case the home folder is used. Not chat only. | [Settings reference](https://code.claude.com/docs/en/settings-reference), [Large codebases](https://code.claude.com/docs/en/large-codebases) |
| Dependencies or ordering between steps | Not documented as a plan feature (checked: Permission modes, Best practices, Common workflows, Large codebases, Tools reference). The large-codebase guidance asks you to hand Claude a shared change and all its call sites in one session so the decisions stay consistent, which is advice to the person, not a marked ordering in the plan. | [Large codebases](https://code.claude.com/docs/en/large-codebases) |
| Parallel split of independent work | Not documented for the plan itself (checked: Permission modes, Best practices, Common workflows, Large codebases). Parallel work is a separate choice: sessions in worktrees, subagents, agent teams or `/batch` (rows below). | [Best practices](https://code.claude.com/docs/en/best-practices) |
| Re-plan after execution is blocked | By hand, not by a documented re-plan step. After approval the session leaves plan mode; to plan again, cycle back with `Shift+Tab` or start a prompt with `/plan`. The plan file is re-injected after context compaction. Whether a blocked build triggers a re-plan on its own: not documented (checked: Permission modes, Best practices, Large codebases). Separately, the checkpoint menu can restore conversation, code or both, so an attempt can be undone and tried again; it tracks only edits made through Claude's file tools. | [Permission modes](https://code.claude.com/docs/en/permission-modes), [Large codebases](https://code.claude.com/docs/en/large-codebases), [Best practices](https://code.claude.com/docs/en/best-practices) |
| Second-model plan critique | Not documented for the plan (checked: Permission modes, Best practices, Common workflows, Advisor). The advisor tool lets Claude consult a second, usually stronger, model before committing to an approach, but it is a session-wide setting that Claude decides when to call, not a plan-review step, and it is experimental and API-only. The documented review of a finished change against a written plan uses a fresh subagent, after the work. | [Advisor](https://code.claude.com/docs/en/advisor), [Best practices](https://code.claude.com/docs/en/best-practices) |
| Read-only enforcement | **Tool restriction** in most places: edits stay blocked until you approve, and shell commands outside the built-in read-only set are routed to the auto-mode classifier or prompt you. The exception is an interactive terminal session with bypass permissions available, where the block is not enforced and Claude is only told to plan: **Instruction only**. Plan mode keeps its blocks in `-p` runs, the Agent SDK and the VS Code chat panel. | [Permission modes](https://code.claude.com/docs/en/permission-modes) |
| Tracker or ticket output | Not documented (checked: Permission modes, Best practices, Common workflows, Tools reference). The plan is a file. Issue-tracker work is reachable only through MCP servers you add, which the best-practices page mentions for implementing from issues, not for writing plans out. | [Best practices](https://code.claude.com/docs/en/best-practices), [Tools reference](https://code.claude.com/docs/en/tools-reference) |
| Human-only step flag | Not documented (checked: Permission modes, Best practices, Common workflows, Tools reference). | [Permission modes](https://code.claude.com/docs/en/permission-modes), [Best practices](https://code.claude.com/docs/en/best-practices) |
| Rollout or rollback section | Not documented (checked: Permission modes, Best practices, Common workflows, Large codebases, Tools reference). Searched all of them for rollback and rollout wording; the only hits are unrelated (database tests, organization rollout). | [Permission modes](https://code.claude.com/docs/en/permission-modes), [Large codebases](https://code.claude.com/docs/en/large-codebases) |

### Built-in Explore and Plan subagents (inside a session)

| Dimension | What the docs say | Sources (fetched 2026-10-20) |
| --- | --- | --- |
| Clarify or interview mode | Not documented (checked: Subagents, Tools reference). The subagents return findings; questions to the person come from the main session. | [Subagents](https://code.claude.com/docs/en/sub-agents) |
| Assumptions or open questions surfaced | Not documented (checked: Subagents, Best practices). | [Subagents](https://code.claude.com/docs/en/sub-agents) |
| Plan editable before approval | Not applicable: they produce research, not the plan (checked: Subagents). The plan is the main session's, as in plan mode above. | [Subagents](https://code.claude.com/docs/en/sub-agents) |
| Where the plan is saved | Not applicable: the findings go back into the main conversation (checked: Subagents). | [Subagents](https://code.claude.com/docs/en/sub-agents) |
| Dependencies or ordering between steps | Not documented (checked: Subagents, Best practices). | [Subagents](https://code.claude.com/docs/en/sub-agents) |
| Parallel split of independent work | Not documented for plans (checked: Subagents, Best practices). The best-practices page does suggest asking Claude to use subagents to investigate, which keeps the research out of the main context. | [Best practices](https://code.claude.com/docs/en/best-practices) |
| Re-plan after execution is blocked | Not documented (checked: Subagents). | [Subagents](https://code.claude.com/docs/en/sub-agents) |
| Second-model plan critique | Not documented (checked: Subagents, Advisor). Explore's model can be set lower than the main one, which is a cost choice, not a critique. | [Subagents](https://code.claude.com/docs/en/sub-agents) |
| Read-only enforcement | **Tool restriction.** Both are listed with read-only tools, and Write and Edit are denied. | [Subagents](https://code.claude.com/docs/en/sub-agents) |
| Tracker or ticket output | Not documented (checked: Subagents). | [Subagents](https://code.claude.com/docs/en/sub-agents) |
| Human-only step flag | Not documented (checked: Subagents). | [Subagents](https://code.claude.com/docs/en/sub-agents) |
| Rollout or rollback section | Not documented (checked: Subagents). | [Subagents](https://code.claude.com/docs/en/sub-agents) |

### `/batch` bundled skill (terminal)

| Dimension | What the docs say | Sources (fetched 2026-10-20) |
| --- | --- | --- |
| Clarify or interview mode | Not documented (checked: Commands, Skills). | [Commands](https://code.claude.com/docs/en/commands), [Skills](https://code.claude.com/docs/en/skills) |
| Assumptions or open questions surfaced | Not documented (checked: Commands, Skills). | [Commands](https://code.claude.com/docs/en/commands) |
| Plan editable before approval | Not documented (checked: Commands, Skills). The page says a plan is presented and work starts once approved, and nothing about changing it. | [Commands](https://code.claude.com/docs/en/commands) |
| Where the plan is saved | Not documented (checked: Commands, Skills). | [Commands](https://code.claude.com/docs/en/commands) |
| Dependencies or ordering between steps | Not documented as ordering (checked: Commands, Skills). The units are meant to be independent, so the page describes no sequence between them. | [Commands](https://code.claude.com/docs/en/commands) |
| Parallel split of independent work | Yes, it is the point: 5 to 30 independent units, one background subagent for each, each in its own isolated worktree. | [Commands](https://code.claude.com/docs/en/commands), [Best practices](https://code.claude.com/docs/en/best-practices) |
| Re-plan after execution is blocked | Not documented (checked: Commands, Skills). Each unit's subagent runs its tests and publishes its own change; what happens when one fails is not described. | [Commands](https://code.claude.com/docs/en/commands) |
| Second-model plan critique | Not documented (checked: Commands, Skills). | [Commands](https://code.claude.com/docs/en/commands) |
| Read-only enforcement | Not documented as a mechanism (checked: Commands, Skills). The page says the skill researches and presents a plan before spawning, but not how edits are held back, so no label is given. | [Commands](https://code.claude.com/docs/en/commands) |
| Tracker or ticket output | Each unit's subagent publishes its own change; the page does not say in what form. A ticket or tracker output: not documented (checked: Commands, Skills). | [Commands](https://code.claude.com/docs/en/commands) |
| Human-only step flag | Not documented (checked: Commands, Skills). | [Commands](https://code.claude.com/docs/en/commands) |
| Rollout or rollback section | Not documented (checked: Commands, Skills). | [Commands](https://code.claude.com/docs/en/commands) |

### Agent teams (experimental; lead plus teammates)

| Dimension | What the docs say | Sources (fetched 2026-10-20) |
| --- | --- | --- |
| Clarify or interview mode | Not documented for the team plan (checked: Agent teams). You can message the lead or any teammate directly to redirect or ask follow-ups. | [Agent teams](https://code.claude.com/docs/en/agent-teams) |
| Assumptions or open questions surfaced | Not documented (checked: Agent teams). | [Agent teams](https://code.claude.com/docs/en/agent-teams) |
| Plan editable before approval | No for the teammate's plan: unless you changed that teammate's permission mode after spawning, the approval request is granted the moment it reaches the lead's session, without the lead reviewing it. You can message a teammate to redirect its approach at any time. | [Agent teams](https://code.claude.com/docs/en/agent-teams) |
| Where the plan is saved | Not documented (checked: Agent teams). The shared task list is kept on disk under a directory named for the session and stays after the session ends until a cleanup period passes. | [Agent teams](https://code.claude.com/docs/en/agent-teams) |
| Dependencies or ordering between steps | Yes, for tasks: a task can depend on others, a pending task with unfinished dependencies cannot be claimed, and finishing one unblocks the tasks that depended on it automatically. The page advises a single session or subagents for sequential work or work with many dependencies. | [Agent teams](https://code.claude.com/docs/en/agent-teams) |
| Parallel split of independent work | Yes. Teammates are separate sessions that work at once, and the page says the roles work best when they can proceed without waiting on each other. Tasks are claimed under a file lock so two teammates do not take the same one. | [Agent teams](https://code.claude.com/docs/en/agent-teams) |
| Re-plan after execution is blocked | Not documented as a re-plan (checked: Agent teams). The lead can reassign tasks or message a teammate, and a teammate can reject a shutdown request with an explanation. Hooks can stop a task from being created or marked complete and send feedback. | [Agent teams](https://code.claude.com/docs/en/agent-teams) |
| Second-model plan critique | Not documented for plans (checked: Agent teams). The page's example for debugging has teammates challenge each other's theories, which is critique of findings. | [Agent teams](https://code.claude.com/docs/en/agent-teams) |
| Read-only enforcement | **Tool restriction** while the lead is in plan mode: a teammate it spawns works in read-only plan mode until its plan is ready. A teammate can also be limited to the tools in a subagent definition. | [Agent teams](https://code.claude.com/docs/en/agent-teams) |
| Tracker or ticket output | Not documented (checked: Agent teams). The task list is local to the team. | [Agent teams](https://code.claude.com/docs/en/agent-teams) |
| Human-only step flag | Not documented (checked: Agent teams). | [Agent teams](https://code.claude.com/docs/en/agent-teams) |
| Rollout or rollback section | Not documented (checked: Agent teams). | [Agent teams](https://code.claude.com/docs/en/agent-teams) |

### Session task list (Claude's own checklist, terminal)

| Dimension | What the docs say | Sources (fetched 2026-10-20) |
| --- | --- | --- |
| Clarify or interview mode | Not applicable: bookkeeping, not conversation (checked: Interactive mode, Tools reference). | [Interactive mode](https://code.claude.com/docs/en/interactive-mode) |
| Assumptions or open questions surfaced | Not documented (checked: Interactive mode, Tools reference, Agent SDK todo tracking). | [Interactive mode](https://code.claude.com/docs/en/interactive-mode) |
| Plan editable before approval | Not documented (checked: Interactive mode, Tools reference). You can ask Claude to show or clear the tasks. | [Interactive mode](https://code.claude.com/docs/en/interactive-mode) |
| Where the plan is saved | Persists across context compactions. A named list directory under the Claude directory in the home folder can be shared across sessions with an environment variable. Not in the repo. | [Interactive mode](https://code.claude.com/docs/en/interactive-mode) |
| Dependencies or ordering between steps | The tools reference describes `TaskUpdate` as updating task status, dependencies and details, but no page shows how a single session's checklist uses dependencies (checked: Interactive mode, Tools reference, Agent SDK todo tracking). Task dependencies and claiming rules are documented for agent teams, which share the same task tools (see that row). | [Agent teams](https://code.claude.com/docs/en/agent-teams) |
| Parallel split of independent work | Not documented (checked: Interactive mode, Tools reference). In an agent team the list is shared, and teammates claim from it. | [Interactive mode](https://code.claude.com/docs/en/interactive-mode), [Agent teams](https://code.claude.com/docs/en/agent-teams) |
| Re-plan after execution is blocked | Not documented (checked: Interactive mode, Tools reference, Agent SDK todo tracking). | [Interactive mode](https://code.claude.com/docs/en/interactive-mode) |
| Second-model plan critique | Not documented (checked: Interactive mode, Tools reference). | [Interactive mode](https://code.claude.com/docs/en/interactive-mode) |
| Read-only enforcement | Not applicable: it records progress and does not touch the code. Whether the task tools are allowed in plan mode: not documented (checked: Tools reference, Permission modes). | [Tools reference](https://code.claude.com/docs/en/tools-reference) |
| Tracker or ticket output | Not documented (checked: Interactive mode, Tools reference). The list is local; the issue-tracker route is MCP servers you add. | [Interactive mode](https://code.claude.com/docs/en/interactive-mode) |
| Human-only step flag | Not documented (checked: Interactive mode, Tools reference). | [Interactive mode](https://code.claude.com/docs/en/interactive-mode) |
| Rollout or rollback section | Not documented (checked: Interactive mode, Tools reference). | [Interactive mode](https://code.claude.com/docs/en/interactive-mode) |

### Plan locally, run in the cloud (`claude --cloud`, web)

| Dimension | What the docs say | Sources (fetched 2026-10-20) |
| --- | --- | --- |
| Clarify or interview mode | Locally, as plan mode above. A cloud session once running can be steered with a queued message; a clarifying step on the cloud side: not documented (checked: Claude Code on the web). | [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) |
| Assumptions or open questions surfaced | Not documented (checked: Claude Code on the web). | [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) |
| Plan editable before approval | Yes, locally: the plan is a file you can edit and commit before pushing. The page says to start the cloud session once you are satisfied with it. | [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web), [Permission modes](https://code.claude.com/docs/en/permission-modes) |
| Where the plan is saved | In the repo: the page says to save the plan to the repo, commit and push so the cloud machine can clone it. | [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) |
| Dependencies or ordering between steps | Not documented (checked: Claude Code on the web). | [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) |
| Parallel split of independent work | Yes, across sessions: each `--cloud` command starts its own session and they run at once. Splitting one plan across them is left to the person. | [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) |
| Re-plan after execution is blocked | Not documented as a re-plan (checked: Claude Code on the web). A running session can be steered by a queued message, or pulled into the terminal with `--teleport`, where work continues locally. | [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) |
| Second-model plan critique | Not documented (checked: Claude Code on the web). | [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) |
| Read-only enforcement | Local planning follows plan mode above. Cloud sessions list Accept edits, Plan and Auto, and pre-approve file edits regardless of mode, so plan mode there is not described as an edit lock beyond what the mode itself does: not documented further (checked: Claude Code on the web, Permission modes). | [Permission modes](https://code.claude.com/docs/en/permission-modes) |
| Tracker or ticket output | A pull request can be created from the finished session. A ticket or tracker output: not documented (checked: Claude Code on the web). | [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) |
| Human-only step flag | Not documented (checked: Claude Code on the web). | [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) |
| Rollout or rollback section | Not documented (checked: Claude Code on the web). | [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) |

### Projects (cloud coordinator conversation, claude.ai; public beta on Pro and Max)

| Dimension | What the docs say | Sources (fetched 2026-10-20) |
| --- | --- | --- |
| Clarify or interview mode | Not documented as an interview (checked: Projects). On a first project the coordinator may start a thread that explores the repository and proposes next steps; you can tell it how to behave in plain words. | [Projects](https://code.claude.com/docs/en/claude-projects) |
| Assumptions or open questions surfaced | Partly. A thread that needs your reply or approval, or that failed, is listed as waiting on you. A list of assumptions: not documented (checked: Projects). | [Projects](https://code.claude.com/docs/en/claude-projects) |
| Plan editable before approval | Only by instruction. Suggested threads are a list you start with a click, and you can tell Claude not to open a pull request until you have seen the plan. The page says such preferences are instructions Claude keeps to, not enforced settings. | [Projects](https://code.claude.com/docs/en/claude-projects) |
| Where the plan is saved | Not documented as a plan (checked: Projects). Decisions and requirements you ask it to remember go to project memory, stored as files that later threads read. | [Projects](https://code.claude.com/docs/en/claude-projects) |
| Dependencies or ordering between steps | Not documented (checked: Projects). You can ask it to run at most a number of threads at a time, which limits concurrency and sets no order. | [Projects](https://code.claude.com/docs/en/claude-projects) |
| Parallel split of independent work | Yes. Threads run in parallel, and the page describes several unrelated tasks in one message becoming separate threads, or one thread per repository. | [Projects](https://code.claude.com/docs/en/claude-projects) |
| Re-plan after execution is blocked | Partly. A thread that stops as blocked or fails shows under waiting on you; the page says a shared cause across several blocked threads usually points to a setup gap to fix before re-running. You can steer a thread from its own message box. A re-plan step: not documented (checked: Projects). | [Projects](https://code.claude.com/docs/en/claude-projects) |
| Second-model plan critique | Not documented (checked: Projects). | [Projects](https://code.claude.com/docs/en/claude-projects) |
| Read-only enforcement | Not documented for planning (checked: Projects). The first exploring thread is described as one that explores without changing anything, with no mechanism named, so no label is given. | [Projects](https://code.claude.com/docs/en/claude-projects) |
| Tracker or ticket output | Each thread works on its own branch and pull request, and the overview pane lists threads by state. A ticket or tracker output: not documented (checked: Projects). | [Projects](https://code.claude.com/docs/en/claude-projects) |
| Human-only step flag | Not documented (checked: Projects). Approval prompts inside a thread wait for you in that thread. | [Projects](https://code.claude.com/docs/en/claude-projects) |
| Rollout or rollback section | Not documented (checked: Projects). | [Projects](https://code.claude.com/docs/en/claude-projects) |

### Agent SDK plan mode (programmatic)

| Dimension | What the docs say | Sources (fetched 2026-10-20) |
| --- | --- | --- |
| Clarify or interview mode | Yes. Claude may ask clarifying questions through the question tool, which reaches your approval callback as multiple-choice questions. You cannot add your own questions to that flow. If you restrict the tool list, you must include the question tool or Claude cannot ask. | [Agent SDK user input](https://code.claude.com/docs/en/agent-sdk/user-input), [Agent SDK permissions](https://code.claude.com/docs/en/agent-sdk/permissions) |
| Assumptions or open questions surfaced | Partly: the clarifying questions are the route. A structured assumptions or open-questions field: not documented (checked: Agent SDK permissions, Agent SDK user input, Todo tracking). | [Agent SDK user input](https://code.claude.com/docs/en/agent-sdk/user-input) |
| Plan editable before approval | Not documented (checked: Agent SDK permissions, Agent SDK user input). Your callback decides each prompted action. | [Agent SDK permissions](https://code.claude.com/docs/en/agent-sdk/permissions) |
| Where the plan is saved | Not documented (checked: Agent SDK permissions, Agent SDK user input, Todo tracking). | [Agent SDK permissions](https://code.claude.com/docs/en/agent-sdk/permissions) |
| Dependencies or ordering between steps | Not documented (checked: Agent SDK permissions, Todo tracking). | [Agent SDK todo tracking](https://code.claude.com/docs/en/agent-sdk/todo-tracking) |
| Parallel split of independent work | Not documented (checked: Agent SDK permissions, Todo tracking). | [Agent SDK permissions](https://code.claude.com/docs/en/agent-sdk/permissions) |
| Re-plan after execution is blocked | Not documented (checked: Agent SDK permissions, Agent SDK user input). The mode can be switched during a session (`setPermissionMode()` in TypeScript, `set_permission_mode()` in Python). | [Agent SDK permissions](https://code.claude.com/docs/en/agent-sdk/permissions) |
| Second-model plan critique | Not documented (checked: Agent SDK permissions, Agent SDK user input). | [Agent SDK permissions](https://code.claude.com/docs/en/agent-sdk/permissions) |
| Read-only enforcement | **Tool restriction.** File edits are never auto-approved in plan mode, even when an allow rule matches or a hook approves; they, and shell commands that modify files, go to your approval callback. Read-only tools run normally. | [Agent SDK permissions](https://code.claude.com/docs/en/agent-sdk/permissions) |
| Tracker or ticket output | Not documented (checked: Agent SDK permissions, Todo tracking). | [Agent SDK todo tracking](https://code.claude.com/docs/en/agent-sdk/todo-tracking) |
| Human-only step flag | Not documented (checked: Agent SDK permissions, Agent SDK user input). | [Agent SDK permissions](https://code.claude.com/docs/en/agent-sdk/permissions) |
| Rollout or rollback section | Not documented (checked: Agent SDK permissions, Agent SDK user input, Todo tracking). | [Agent SDK permissions](https://code.claude.com/docs/en/agent-sdk/permissions) |

### Dynamic workflows (script of many subagents)

| Dimension | What the docs say | Sources (fetched 2026-10-20) |
| --- | --- | --- |
| Clarify or interview mode | Not documented (checked: Dynamic workflows). | [Dynamic workflows](https://code.claude.com/docs/en/workflows) |
| Assumptions or open questions surfaced | Not documented (checked: Dynamic workflows). A report can list claims it could not verify as unverified, which is about findings, not plan assumptions. | [Dynamic workflows](https://code.claude.com/docs/en/workflows) |
| Plan editable before approval | Partly. Before the run you see the planned phases and can view the raw script, and `Ctrl+G` opens the script in your editor; you can add a comment to your yes or no answer. The prompt is to run the script, not to approve a design. | [Dynamic workflows](https://code.claude.com/docs/en/workflows) |
| Where the plan is saved | The script can be saved as a command, in the project (shared with everyone who clones the repo) or in the home folder (only you). | [Dynamic workflows](https://code.claude.com/docs/en/workflows) |
| Dependencies or ordering between steps | Yes, in code: the script holds the loop and the branching, groups agents into titled phases, and can run a set of agents at once and wait for all of them. | [Dynamic workflows](https://code.claude.com/docs/en/workflows) |
| Parallel split of independent work | Yes. A script can fan out one agent per item and run sets of agents at the same time; one call accepts up to 4,096 items. Edits can be made in isolated copies so they do not conflict. | [Dynamic workflows](https://code.claude.com/docs/en/workflows) |
| Re-plan after execution is blocked | Partly, in the runtime: an agent whose output stops arriving restarts from the same prompt, and a failed agent inside a parallel set yields an empty result while the run carries on. Re-planning the design: not documented (checked: Dynamic workflows). | [Dynamic workflows](https://code.claude.com/docs/en/workflows) |
| Second-model plan critique | Closest documented: drafting a hard plan from several independent angles and weighing them, and having independent agents adversarially check each other's findings before they are reported. Whether those agents use a different model: not documented (checked: Dynamic workflows). | [Dynamic workflows](https://code.claude.com/docs/en/workflows) |
| Read-only enforcement | Not documented as a mechanism for planning runs (checked: Dynamic workflows). In plan mode a hook's approval alone does not start a workflow; a permission rule or your host's approval is needed. | [Dynamic workflows](https://code.claude.com/docs/en/workflows) |
| Tracker or ticket output | Not documented as an output (checked: Dynamic workflows). A saved workflow can take issue numbers as input, which is reading tickets, not writing them. | [Dynamic workflows](https://code.claude.com/docs/en/workflows) |
| Human-only step flag | Not documented (checked: Dynamic workflows). | [Dynamic workflows](https://code.claude.com/docs/en/workflows) |
| Rollout or rollback section | Not documented (checked: Dynamic workflows). | [Dynamic workflows](https://code.claude.com/docs/en/workflows) |

### Pages read (depth pass)

Fetched 2026-10-20 as raw Markdown from https://code.claude.com/docs/llms.txt (each at `https://code.claude.com/docs/en/<name>.md`).
"In full" means the section or page was read through; "searched" means searched for plan, clarify, interview, assumption,
dependency, parallel, read-only, critique, ticket, human and rollback wording with the matching sections read.

- Permission modes (`permission-modes`): plan mode, review and approve, and bypass sections in full, rest searched
- Best practices (`best-practices`): explore-plan-code, interview, subagent, checkpoint and parallel-session sections in full, rest searched
- Common workflows (`common-workflows`): "Plan before editing" in full, rest searched
- Subagents (`sub-agents`): built-in subagents section in full, rest searched
- Commands (`commands`): searched; the `/plan`, `/batch` and `/ultraplan` rows read
- Skills (`skills`): searched for bundled skill wording
- Tools reference (`tools-reference`): question tool, plan tools and task-tool availability sections in full, rest searched
- Interactive mode (`interactive-mode`): task list section in full, rest searched
- Agent teams (`agent-teams`): plan-before-implementing, task list and permissions sections in full, rest searched
- Dynamic workflows (`workflows`): comparison, approval and saving sections in full, rest searched
- Projects (`claude-projects`): threads, overview, tuning and approval sections in full, rest searched
- Claude Code on the web (`claude-code-on-the-web`): "Plan locally, execute in the cloud" and parallel-task sections in full, rest searched
- Large codebases (`large-codebases`): "Scope and plan changes that span packages" in full, rest searched
- Settings reference (`settings-reference`): `plansDirectory` entry in full, rest searched
- Advisor (`advisor`): opening, when-to-use and comparison sections read
- Agent SDK permissions (`agent-sdk/permissions`): plan mode section in full, rest searched
- Agent SDK handle approvals and user input (`agent-sdk/user-input`): clarifying questions section in full, rest searched
- Agent SDK todo tracking (`agent-sdk/todo-tracking`): searched

### Ruled out (depth pass)

- Checkpointing (https://code.claude.com/docs/en/checkpointing): the rewind menu is cited from Best practices only, as the documented way to undo an attempt. The page itself was not opened, so no claim rests on it.
- Advisor (https://code.claude.com/docs/en/advisor): read, but it is a session-wide second-model consult with its own cost and availability limits, not a step in the plan. It is cited only to show the plan has no critique step of its own.
- `opusplan` and other model settings, Fast mode, Costs, Effort: model tiers and estimates, left out on purpose as in the earlier pass.
- Goal, Routines, Scheduled tasks, Channels, Remote Control, Slack, GitHub Actions, GitLab CI/CD, Headless: trigger or run mechanics, not planning, as in the earlier pass.
- Code Review pages, Ultrareview, `/code-review`, Security guidance: reviews of code that exists, so they cannot supply a plan critique. Best practices' adversarial review of a diff against a plan file is cited as the closest documented neighbour and is marked as after-the-work.
- Hooks, Memory, CLAUDE.md, rules, Skills (beyond the bundled-skill wording), Output styles, Plugins: standards and instruction files, owned by a later lesson. Hooks are mentioned only where the agent teams page names task-created and task-completed hooks.
- MCP servers: the route to an issue tracker is noted where Best practices names it; the pages for individual servers were not read.
- Agent SDK pages other than permissions, user input and todo tracking: hosting and build details, as in the earlier pass.
- What's new weekly pages and the changelog: release notes, not the docs of record, as in the earlier pass.
