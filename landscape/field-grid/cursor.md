# Cursor: lesson 1 field grid (redo)

Scope: lesson 1 only (plan, dev-task, loop). Every filled field is a paraphrase of a first-party page, with its URL and the
date I fetched it (2026-10-23). "Who drives" is one of Human, Human approves, Automated, and only when a page says so;
otherwise `not documented`, followed by the index pages checked. Names are the product's own, not canonical. Several
surfaces per grid are used where one surface does not cover the concept; each is named in its table.

Method: started from the docs index (https://cursor.com/docs/llms.txt, fetched 2026-10-23), listed the pages on the agent,
cloud agents, automations, integrations, hooks, skills, subagents, CLI and SDK, and read the pages under "Pages read" in
full (the very large hooks and SDK pages were searched for the loop and planning sections rather than read end to end; see
"Pages read"). This replaces an earlier, shallower draft of this file. That draft rested on two starting pages, treated
"each automation runs independently" as the whole LOOP answer, and never opened the `/goal`, `/loop`, hooks, subscriptions or
Projects pages, so its conclusions are not carried over.

Interactive Plan Mode and the cloud agents / Automations are separate surfaces and are named as such in every table.
The docs renamed "Background Agents" to "Cloud Agents" (https://cursor.com/docs/cloud-agent.md, "Naming History"); the older
URL `/docs/background-agent` is not in the index, so the current pages are cited.

Index pages checked for any `not documented` below: Plan Mode (docs and help), Agent overview, Prompting agents, Projects,
Agents Window, Cloud Agents, Cloud agent capabilities, Cloud agent best practices, Automations (docs and help), Slack,
Linear and GitHub integrations, Hooks, Skills, Subagents, CLI overview / using / headless / GitHub Actions, Cloud agent
webhooks, SDK (TypeScript), Agent Review, Debug Mode, and the help pages on agentic coding, cloud agents and multi-agent
coding (URLs under "Pages read").

## PLAN

### Surface 1: interactive Plan Mode (Agent panel, Shift+Tab)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A request typed in the Agent panel while in Plan mode. Cursor can also suggest the mode when the wording signals a complex task. In the CLI the same mode starts with `--plan` (shorthand for `--mode=plan`) or from a session with `/plan [prompt]`, which also shows the current plan | https://cursor.com/docs/agent/plan-mode.md ; https://cursor.com/help/ai-features/plan-mode.md ; https://cursor.com/docs/cli/reference/parameters.md ; https://cursor.com/docs/cli/reference/slash-commands.md | 2026-10-23 |
| step | The agent asks clarifying questions, researches the codebase, then writes an implementation plan the person reviews and edits in chat or as markdown. The docs recommend it for work with several valid approaches or unclear scope. A plan that breaks work into separate tasks with acceptance criteria and dependencies: not documented as a plan format (checked: Plan Mode docs and help, Agent overview, Prompting agents, Agentic coding help). The Multi-agent help page does say that from a plan, **Build in Parallel** runs independent steps at once and keeps dependent steps in order, so plans have steps with ordering, but the page does not say how steps or dependencies are written | https://cursor.com/docs/agent/plan-mode.md ; https://cursor.com/help/ai-features/multi-agent.md | 2026-10-23 |
| output | An editable plan, opened as a virtual file and saved by default in the person's home directory; "Save to workspace" moves it into the repo for sharing | https://cursor.com/help/ai-features/plan-mode.md | 2026-10-23 |
| who drives | Human approves: the person clicks Build when satisfied with the plan. The docs also advise reverting and refining the plan, rather than patching a bad build with follow-ups | https://cursor.com/docs/agent/plan-mode.md | 2026-10-23 |

### Surface 2: Projects (coordinator agent in the Agents Window, runs on cloud agents)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A description of a larger body of work (a feature, a migration, a full app) given by chatting with the Project's coordinator agent, in a chosen repository | https://cursor.com/docs/agent/projects.md | 2026-10-23 |
| step | The coordinator does not write code. It plans the work and delegates it to other agents. The page does not describe the plan's format, or acceptance criteria or dependencies in it (checked: Projects, Agent overview, Agents Window) | https://cursor.com/docs/agent/projects.md | 2026-10-23 |
| output | Delegated agents, and finished work brought back to the person to check. A stored plan or task list: not documented (same pages checked). Shared context files that agents add to as they learn the codebase are documented, but those are notes, not a plan | https://cursor.com/docs/agent/projects.md | 2026-10-23 |
| who drives | Human directs the coordinator; the page says the coordinator delegates and brings work back for the person to check, and does not say the plan itself needs an approval click, so Human approves is not claimed | https://cursor.com/docs/agent/projects.md | 2026-10-23 |

### Surface 3: plan note posted in Slack before a cloud agent edits (Slack integration)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | An `@Cursor` mention in Slack. The agent reads the whole thread for context | https://cursor.com/docs/integrations/slack.md | 2026-10-23 |
| step | When fixing a bug, or when implementation details would help the team follow along, Cursor posts a short plan in the thread before it changes code; simple requests skip the note | https://cursor.com/docs/integrations/slack.md | 2026-10-23 |
| output | A short plan message in the thread, followed by status updates | https://cursor.com/docs/integrations/slack.md | 2026-10-23 |
| who drives | not documented whether the person must approve the note before work continues (checked: Slack integration, Cloud Agents) | n/a | 2026-10-23 |

## DEV-TASK

### Surface 1: cloud agent (started from Cursor Desktop, web, iOS, Slack, a GitHub PR or issue comment, Linear or the API)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A prompt from any of the entry points (Cursor Desktop with Cloud selected, web, iOS, Slack, a GitHub or Bitbucket PR or issue comment, Linear, the API); in Linear, a delegated issue or an `@Cursor` comment; in Slack, the thread. Optional settings ride along (repository, model, branch, via `[key=value]` in Linear) | https://cursor.com/docs/cloud-agent.md ; https://cursor.com/docs/integrations/linear.md | 2026-10-23 |
| step | The agent works in a cloud VM with the repository, dependencies and secrets, builds the change, and can run tests, start the app and use a browser or desktop to check it. The docs call the environment the most important setup step because an agent that cannot run tests "cannot close the loop". Which checks run is the agent's choice from the prompt, skills and `agents.md`; the best-practices page advises committing skills that say how to test and debug services. A fixed pre-delivery gate that always runs: not documented (checked: Cloud Agents, Capabilities, Best practices) | https://cursor.com/docs/cloud-agent.md ; https://cursor.com/docs/cloud-agent/best-practices.md | 2026-10-23 |
| output | A PR on a separate branch, with artifacts (screenshots, videos, log references) showing what changed and how the agent verified it; in Slack, a completion notification with an option to view the created PR in GitHub; in Linear, live status and an automatic PR | https://cursor.com/docs/cloud-agent/capabilities.md ; https://cursor.com/docs/integrations/slack.md ; https://cursor.com/docs/integrations/linear.md | 2026-10-23 |
| who drives | Automated once started. The person can follow up, take over the agent's desktop, or move it between cloud and local | https://cursor.com/docs/cloud-agent.md ; https://cursor.com/docs/agent/agents-window.md | 2026-10-23 |

### Surface 2: interactive Agent with a verifier subagent and hooks (Agents Window or editor)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A prompt, optionally a plan from Plan Mode; skills can be attached to a message or kept on as a Custom Mode (for example a team `/tdd` playbook) | https://cursor.com/docs/agent/prompting.md ; https://cursor.com/docs/agent/plan-mode.md | 2026-10-23 |
| step | The agent edits files and runs terminal commands. The Subagents page describes a **verifier** pattern: a skeptical subagent, defined by the person in `.cursor/agents/`, that checks claimed work by running tests and reporting what passed and what is incomplete; its stated reason is that agents mark tasks done when the implementation is incomplete. The page presents it as an example the person writes, not a built-in gate | https://cursor.com/docs/subagents.md | 2026-10-23 |
| output | Edits in the working tree or worktree, and a verifier report if the pattern is set up. Whether the interactive agent opens a PR by default: not documented (checked: Agent overview, Prompting agents, Subagents, Skills) | https://cursor.com/docs/subagents.md ; https://cursor.com/docs/skills.md | 2026-10-23 |
| who drives | Human prompts; the Agent overview describes Agent as able to "complete complex coding tasks independently". Whether the person must approve each turn: not documented (checked: Agent overview, Prompting agents) | https://cursor.com/docs/agent/overview.md | 2026-10-23 |

### Surface 3: Cursor CLI in print mode (scripts and CI)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A prompt passed to `agent -p`; with `--force` it applies file changes, without it changes are only proposed (headless page). The CLI Parameters page words it differently: `-p, --print` "has access to all tools, including write and shell", and the Permissions page says print mode can use write and shell tools, with `permissions.allow`, `permissions.deny` and `--force` controlling what runs without prompts. Whether bare `-p` writes files is therefore stated two ways across these pages; the headless page is quoted above and not reconciled | https://cursor.com/docs/cli/headless.md ; https://cursor.com/docs/cli/reference/parameters.md ; https://cursor.com/docs/cli/reference/permissions.md | 2026-10-23 |
| step | One non-interactive agent run. The Parameters page lists no option for a retry count, turn limit or "until a check passes" (checked: the full global-options, commands, MCP, sandbox and worker tables), and the Configuration page's `cli-config.json` has none either; permissions are the only project-level CLI setting (`<project>/.cursor/cli.json`). The GitHub Actions page recommends giving the agent file edits only and keeping commits, pushes and API calls in separate deterministic workflow steps for production CI, and also shows a full-autonomy variant | https://cursor.com/docs/cli/github-actions.md | 2026-10-23 |
| output | Text, JSON or streamed JSON; edited files when forced | https://cursor.com/docs/cli/headless.md | 2026-10-23 |
| who drives | Automated once the script or workflow runs; the person writes the script | https://cursor.com/docs/cli/github-actions.md | 2026-10-23 |

## LOOP-WITHIN-A-TASK

### Surface 1: `/goal` (interactive agent and CLI)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| retries until a check passes? | The page describes a long-lived objective the agent works toward "until it's fully complete", with the example `/goal fix all flaky tests and make CI green`, and contrasts it with the default where each message is a new job. It does not state a retry limit or the stopping test (checked: Agent overview, Prompting agents, CLI overview, CLI slash commands, CLI parameters, CLI configuration). The page says `/goal` is rolling out. The CLI slash-commands page has the same one-line description ("Give the agent a long-lived objective to work towards until it's fully complete. Rolling out."); no CLI parameter or `cli-config.json` field sets a goal limit | https://cursor.com/docs/agent/overview.md ; https://cursor.com/docs/cli/reference/slash-commands.md | 2026-10-23 |
| what judges it | not documented (same pages checked). The example's check is CI going green, but no page says whether the agent or a separate judge decides it is complete | n/a | 2026-10-23 |
| who drives | Automated after the person sets the goal; in the CLI Ctrl+C pauses it | https://cursor.com/docs/agent/overview.md | 2026-10-23 |

### Surface 2: `stop` and `subagentStop` hooks (project `.cursor/hooks.json`, also run in cloud agents)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| retries until a check passes? | Yes, if the person writes the hook. When the agent loop ends, the stop hook's script can return a `followup_message`, which Cursor submits as the next user message, so the agent continues. The docs describe this as enabling "iterate until a goal is met". Default cap is 5 automatic follow-ups per script, set by `loop_limit` (null removes the cap). The hook receives `loop_count` and the end status (completed, aborted, error). The Cloud Agents help page confirms the `stop` and `subagentStop` hooks run in cloud agents and says conversation-level hooks "let you build self-correcting loops around agent output and reasoning" | https://cursor.com/docs/hooks.md ; https://cursor.com/help/ai-features/cloud-agents.md | 2026-10-23 |
| what judges it | The hook script the person writes, which can run any check (tests, a linter, a file test) and decide whether to send another message. Cursor ships no default judge for this | https://cursor.com/docs/hooks.md | 2026-10-23 |
| who drives | Automated once the hook is configured. Cloud agents run command-based hooks from the repo, but not user-level hooks, and hooks do not run during early read-only exploration turns | https://cursor.com/docs/hooks.md ; https://cursor.com/docs/cloud-agent.md | 2026-10-23 |

### Surface 3: cloud agent fixing CI on its own PR

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| retries until a check passes? | Yes, for GitHub Actions. Cloud agents automatically try to fix CI failures in PRs they create. They skip it when a person pushed a new commit, when a follow-up message was sent, when the same check already fails on the base commit, and after 10 CI-failure follow-ups. A comment `@cursor autofix off` stops it (`@cursor autofix on` re-enables it, and it can be turned off globally in the dashboard under Cloud Agents > My Settings, per the Cloud Agents help page, which lists no retry cap) | https://cursor.com/docs/cloud-agent/capabilities.md ; https://cursor.com/help/ai-features/cloud-agents.md | 2026-10-23 |
| what judges it | The repository's own CI checks. A CI subscription waits for every check on the commit and reports one result, success or the names of failed checks | https://cursor.com/docs/cloud-agent/capabilities.md | 2026-10-23 |
| who drives | Automated. The page notes auto-fix is available on Teams plans | https://cursor.com/docs/cloud-agent/capabilities.md | 2026-10-23 |

### Surface 4: `/autopilot` on a pull request (cloud subagent)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| retries until a check passes? | A built-in skill that monitors a PR and addresses feedback, conflicts, failing checks and follow-up work. The Subagents page says a cloud agent iterates remotely to get the PR ready for merge. A retry limit: not documented (checked: Skills, Subagents, Agents Window) | https://cursor.com/docs/skills.md ; https://cursor.com/docs/subagents.md | 2026-10-23 |
| what judges it | Review feedback and CI results on the PR; the pages do not name a separate judge | https://cursor.com/docs/skills.md | 2026-10-23 |
| who drives | Human starts it by typing `/autopilot` or clicking the quick action; the work then runs without the local session | https://cursor.com/docs/subagents.md | 2026-10-23 |

Separate from the retry loops, Agent Review (`/agent-review`, or automatically after each commit) runs a dedicated review of
local changes at quick or deep depth. It reports findings; it does not say it loops back to fix them
(https://cursor.com/docs/agent/agent-review.md, 2026-10-23). Review policy is outside lesson 1, so it is not a grid row.

## LOOP-ACROSS-TASKS

### Surface 1: Automations (cloud agents started by triggers)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| what moves on by itself | A trigger starts a cloud agent with a saved prompt. Triggers: a schedule (preset or cron), source-control events (draft opened, PR opened, pushed, merged, comment; on GitHub also label changed, CI completed, workflow run completed, review submitted and more), Slack (new message, emoji reaction, channel created), a webhook POST, Linear (issue created, status changed, end of cycle), Sentry and PagerDuty events. An automation may have several triggers | https://cursor.com/docs/cloud-agent/automations.md | 2026-10-23 |
| queue / pacing | The trigger is the pacing. Scheduled runs may start late but not early. Memories (a notes file per automation, on by default) carry notes from one run to the next. A work queue or item list the automation walks through: not documented (checked: Automations docs and help, Projects, Capabilities) | https://cursor.com/docs/cloud-agent/automations.md | 2026-10-23 |
| output | Whatever the prompt asks for and the enabled tools allow: a PR (on by default for repo-backed automations), PR comments, reviewer requests, Slack messages, MCP tool calls | https://cursor.com/docs/cloud-agent/automations.md | 2026-10-23 |
| next piece of work after a run finishes | Not as a feature of one run starting the next. The next run starts when a trigger fires. Triggers on events such as PR merged, CI completed, a Linear status change or an issue label change mean one run's output (a merged PR, a label, a status) can be the event that starts another automation; the page does not describe this as chaining, so it is stated here as what the triggers allow, not as a documented workflow | https://cursor.com/docs/cloud-agent/automations.md | 2026-10-23 |
| who drives | Automated after a person creates and activates the automation | https://cursor.com/docs/cloud-agent/automations.md | 2026-10-23 |

### Surface 2: subscriptions and timers inside one cloud agent conversation

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| what moves on by itself | A cloud agent can subscribe to GitHub PR activity and CI results, Slack replies, Linear issue changes, or timers (a delay or a cron schedule), end its turn, and be woken by a matching event as a follow-up in the same conversation. The page's examples: open a PR, then respond to review comments and CI failures; ask in Slack and continue on reply; check back on a long job with a timer | https://cursor.com/docs/cloud-agent/capabilities.md | 2026-10-23 |
| queue / pacing | Events that arrive close together may wake the agent once. A subscription lasts at most 180 days and the agent unsubscribes when the wait ends. Service-account-owned agents (including automations set to run as a service account) do not get subscriptions | https://cursor.com/docs/cloud-agent/capabilities.md | 2026-10-23 |
| output | Continued work in the same conversation, with its full context | https://cursor.com/docs/cloud-agent/capabilities.md | 2026-10-23 |
| next piece of work after a run finishes | The wait is for follow-up on the same task, not a different task; moving to a new task: not documented for this surface (checked: Capabilities, Automations, Agent overview) | https://cursor.com/docs/cloud-agent/capabilities.md | 2026-10-23 |
| who drives | Automated once the agent is told what to wait for (by prompt or `/subscribe`) | https://cursor.com/docs/cloud-agent/capabilities.md | 2026-10-23 |

### Surface 3: Projects with subscriptions (coordinator delegating bug reports)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| what moves on by itself | When asked, the coordinator creates subscriptions: watch a Slack channel, run on a schedule, or follow pull requests. It then acts without a new prompt. The page's example is pointing the coordinator at a bug-report channel so it delegates a fix each time a bug is posted | https://cursor.com/docs/agent/projects.md | 2026-10-23 |
| queue / pacing | A "Listening" pill lists every event the Project listens for (a channel message, PR activity, CI runs on a branch, a schedule such as daily at 8:00 AM) and each subscription can be removed. A work queue the coordinator keeps: not documented (checked: Projects) | https://cursor.com/docs/agent/projects.md | 2026-10-23 |
| output | Delegated agents and finished work, brought back for the person to check | https://cursor.com/docs/agent/projects.md | 2026-10-23 |
| next piece of work after a run finishes | Yes for new events: each new bug message in the channel leads to a delegated fix. Picking the next item of an existing backlog by itself: not documented (same page checked) | https://cursor.com/docs/agent/projects.md | 2026-10-23 |
| who drives | Automated for events once subscriptions exist; Human sets the subscriptions up by asking the coordinator | https://cursor.com/docs/agent/projects.md | 2026-10-23 |

### Surface 4: `/loop` (built-in skill) with `/goal`

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| what moves on by itself | `/loop` runs a prompt or skill repeatedly at a given interval. The Agent overview page pairs it with `/goal`: without a fixed interval the agent chooses when to wake, and the person stops the loop when it should end | https://cursor.com/docs/skills.md ; https://cursor.com/docs/agent/overview.md | 2026-10-23 |
| queue / pacing | An interval, or an interval the agent picks. A list of items it walks through: not documented (checked: Skills, Agent overview, Capabilities) | https://cursor.com/docs/agent/overview.md | 2026-10-23 |
| output | Not documented beyond what the repeated prompt produces | n/a | 2026-10-23 |
| next piece of work after a run finishes | The next pass happens at the next interval or wake; whether that pass moves to a different task depends on the prompt, which the pages do not describe | https://cursor.com/docs/agent/overview.md | 2026-10-23 |
| who drives | Automated after the person starts it; Human stops it | https://cursor.com/docs/agent/overview.md | 2026-10-23 |

### Surface 5: person queues messages for an interactive agent

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| what moves on by itself | While the agent works, the person can queue more instructions (Enter), which it handles in order after the current task; Cmd+Enter sends one immediately instead | https://cursor.com/docs/agent/overview.md | 2026-10-23 |
| queue / pacing | The queued messages, reorderable by dragging | https://cursor.com/docs/agent/overview.md | 2026-10-23 |
| output | The agent's replies and edits for each message in turn | https://cursor.com/docs/agent/overview.md | 2026-10-23 |
| next piece of work after a run finishes | The next queued message, in order | https://cursor.com/docs/agent/overview.md | 2026-10-23 |
| who drives | Human supplies and orders the items; the agent works through them without further prompting | https://cursor.com/docs/agent/overview.md | 2026-10-23 |

## Pages read

All fetched 2026-10-23 and read in full unless noted.

- https://cursor.com/docs/llms.txt (the docs index)
- https://cursor.com/docs/agent/plan-mode.md
- https://cursor.com/help/ai-features/plan-mode.md
- https://cursor.com/docs/agent/overview.md
- https://cursor.com/docs/agent/prompting.md
- https://cursor.com/docs/agent/projects.md
- https://cursor.com/docs/agent/agents-window.md
- https://cursor.com/docs/agent/agent-review.md
- https://cursor.com/docs/agent/debug-mode.md
- https://cursor.com/docs/cloud-agent.md
- https://cursor.com/docs/cloud-agent/capabilities.md (read in full except the MCP and Cursor Cloud MCP tool tables, which were skimmed)
- https://cursor.com/docs/cloud-agent/best-practices.md
- https://cursor.com/docs/cloud-agent/automations.md
- https://cursor.com/docs/cloud-agent/api/webhooks.md (read to the signature section)
- https://cursor.com/help/ai-features/automations.md (read in full in the gap-closing pass)
- https://cursor.com/help/ai-features/cloud-agents.md (read in full in the gap-closing pass)
- https://cursor.com/docs/cli/reference/parameters.md (gap-closing pass, in full)
- https://cursor.com/docs/cli/reference/permissions.md (gap-closing pass, in full)
- https://cursor.com/docs/cli/reference/configuration.md (gap-closing pass, in full)
- https://cursor.com/docs/cli/reference/slash-commands.md (gap-closing pass, in full)
- https://cursor.com/help/ai-features/agentic-coding.md
- https://cursor.com/help/ai-features/multi-agent.md
- https://cursor.com/docs/integrations/slack.md (read the usage, status and handoff sections; settings and permission tables skimmed)
- https://cursor.com/docs/integrations/linear.md
- https://cursor.com/docs/integrations/github.md (searched; mostly Enterprise Server setup)
- https://cursor.com/docs/hooks.md (read the overview, cloud agent support, `stop` and `subagentStop` sections and the configuration table; the per-hook payload reference was searched)
- https://cursor.com/docs/skills.md (read the built-in skills and Custom Modes sections)
- https://cursor.com/docs/subagents.md (read the isolation, cloud subagents, verifier and patterns sections)
- https://cursor.com/docs/cli/headless.md
- https://cursor.com/docs/cli/github-actions.md
- https://cursor.com/docs/cli/overview.md
- https://cursor.com/docs/cli/using.md
- https://cursor.com/docs/sdk/typescript.md (searched for planning mode, goal, loop and scheduling wording; the `mode: "plan"` option is the only planning feature it documents)

## Ruled out (why)

- **Bugbot, Security Agents, PR Routing & Approval** (https://cursor.com/docs/bugbot.md, https://cursor.com/docs/security-agents.md,
  https://cursor.com/docs/approval-agents.md): Cursor-managed review and approval agents. Review policy and approval are
  outside lesson 1; not opened beyond their descriptions on the Automations page.
- **Agent Review and Debug Mode**: read, but Agent Review is review policy and Debug Mode is an interactive diagnosing flow
  that keeps the person in the loop to reproduce the bug. Neither is a plan, a dev-task run or a loop; only a one-line note
  on Agent Review is kept.
- **Cloud agent setup, Builds, environments, self-hosted machines and pools, security and network, private connectivity,
  identity (OIDC), settings, mobile**: sandboxes, environments, isolation, parallel capacity and ops. Out of scope for
  lesson 1. The environment's effect on whether an agent can test its own work is kept from the Cloud Agents page.
- **Worktrees, `/multitask`, swarms of isolated subagents, Build in Parallel, side chats**: isolation and parallel runs.
  Out of scope; only the single sentence on plan step ordering from the Multi-agent help page is used.
- **Rules** (https://cursor.com/docs/rules.md): conventions that guide the agent; fetched but not read for this pass, not a planning, task or loop mechanism on the index description.
- **Cloud Agents API endpoints and the SDK run lifecycle**: the API and SDK can create agents and runs from code, which is
  one more entry point for the DEV-TASK input; the endpoint reference is not a lesson 1 concept and was not read in full.
- **Models and pricing, release notes, changelog, Marketplace automation templates**: not about the concepts.
- **Pages in the index not read for this pass**: the GitLab, Bitbucket, Azure DevOps and Microsoft Teams integrations, Tab,
  Context, MCP, Plugins, Worktrees, Enterprise and Teams account pages, and the CLI reference pages for output format, ACP and
  shell mode (parameters, permissions, configuration and slash commands were read in the gap-closing pass). They cover setup, access or other surfaces.
- **Shipwright marketing pages** (`site/src/pages/compare.astro`, `vs/*.astro`): not consulted; no wording or claims reused.

## Gap-closing pass (2026-10-23)

Fetch date for every page below: 2026-10-23. All were fetched as Markdown (`.md` suffix) and read in full; none was unreachable. Flags come from "CROSS-CHECK" in `README.md`.

| Flag | Page read | Changed a cell? |
| --- | --- | --- |
| CLI reference: parameters | https://cursor.com/docs/cli/reference/parameters.md | **Yes.** PLAN Surface 1 input (`--plan`, `--mode plan`); DEV-TASK Surface 3 input and step: the page says `-p` "has access to all tools, including write and shell", which reads differently from the headless page; no option for a retry count, turn limit or loop |
| CLI reference: permissions | https://cursor.com/docs/cli/reference/permissions.md | **Yes**, same DEV-TASK Surface 3 cells: print mode can use write and shell tools, controlled by `permissions.allow`, `permissions.deny` and `--force`. It is a permission list (Shell, Read, Write, WebFetch, Mcp), not a pre-delivery gate |
| CLI reference: configuration | https://cursor.com/docs/cli/reference/configuration.md | Partly. No loop, retry or goal field in `cli-config.json`; only permissions can be set per project. Recorded in DEV-TASK Surface 3 step |
| CLI reference: slash commands (not flagged; opened because it is where `/goal` is listed) | https://cursor.com/docs/cli/reference/slash-commands.md | Partly. LOOP-WITHIN Surface 1: same one-line `/goal` description, "Rolling out"; the stopping test and judge are still not documented. `/plan` is listed |
| Help page: automations | https://cursor.com/help/ai-features/automations.md | No. It repeats the docs page (triggers, tools, Memories, billing) with a shorter trigger table, and has no queue, chaining or "next task" wording. LOOP-ACROSS Surface 1 stands |
| Help page: cloud agents | https://cursor.com/help/ai-features/cloud-agents.md | Partly. LOOP-WITHIN Surface 2 and Surface 3: it confirms `stop` and `subagentStop` hooks run in cloud agents, adds the "self-correcting loops" wording, and the CI auto-fix on and off comments and global setting. It states no retry cap and no chaining |

**Net effect on the slide cells.** PLAN (output, who drives), DEV-TASK (what judges done) and LOOP across tasks are unchanged: none of the six pages names a task queue or a run starting the next task, so "not documented" stands for those, with the pages now named. LOOP within a task is unchanged in substance (hook cap 5, CI-fix cap 10, `/goal` stopping test still not documented). One discrepancy is flagged rather than settled: the CLI Parameters and Permissions pages say print mode can use write and shell tools, while the headless page says changes are only proposed without `--force`.
