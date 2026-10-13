# Factory (Droids / Missions): lesson 1 field grid

Scope: lesson 1 only (plan, dev-task, loop). Every filled field is a paraphrase of a first-party page, with its URL and
the date it was fetched (my own fetch, 2026-10-13). "Who drives" is exactly Human, Human approves or Automated, and only
when a page says so. Names are the product's own, not canonical. Several surfaces are used; each is named in its cell.

Method: started from the docs index at https://docs.factory.com/llms.txt (153 lines, about 110 pages), listed every page
relevant to planning, task workflows, verification and automation, and read those pages in full from their raw
Markdown (`<url>.md`). The three older URLs in the brief now redirect to current pages
(`/features/missions/overview` to `/missions/overview`, `/integrations/slack` to `/delegations/slack`,
`/cli/getting-started/overview` to `/droid-cli/overview`); the redirect targets are the ones cited below.

## PLAN

Two surfaces: **Spec Mode** (one task, one session) and **Missions** (a multi-feature project).

| Surface | Field | Value | Source | As of |
| --- | --- | --- | --- | --- |
| Spec Mode | input | A request stating the outcome, constraints, how to verify, and existing patterns to follow | https://docs.factory.com/autonomy-and-safety/specification-mode | 2026-10-13 |
| Spec Mode | step | Read-only: Droid researches the repo, reads files, asks clarifying questions and proposes a concrete plan; no edits, commits or service starts until approval | https://docs.factory.com/autonomy-and-safety/specification-mode | 2026-10-13 |
| Spec Mode | output | A proposed plan; optionally saved as a dated Markdown file (default `.factory/docs`) once approved. Whether it is split into separate tasks with criteria or dependencies: not documented (MODES, QUICK, CLI checked) | https://docs.factory.com/autonomy-and-safety/specification-mode | 2026-10-13 |
| Spec Mode | who drives | Human approves (Droid asks for approval; the person approves or keeps iterating) | https://docs.factory.com/autonomy-and-safety/specification-mode | 2026-10-13 |
| Missions | input | A goal, then a back-and-forth where Droid asks clarifying questions and probes constraints | https://docs.factory.com/missions/overview ; https://factory.com/news/missions | 2026-10-13 |
| Missions | step | Droid builds a structured plan of features grouped into milestones, reuses or develops skills for them, and pushes back until the plan is solid; the docs name ordering, milestones, skills and how work is validated as the parts to get right | https://docs.factory.com/missions/overview ; https://docs.factory.com/missions/planning | 2026-10-13 |
| Missions | output | The approved plan, shown in Mission Control; each feature has its own validation criteria visible in the Factory App. Explicit dependency edges between features: not documented (M-OVER, M-PLAN, M-CLI, M-APP, M-REF, M-NEWS checked; "ordering" is mentioned, dependencies are not) | https://docs.factory.com/missions/overview ; https://docs.factory.com/missions/running-app ; https://docs.factory.com/missions/planning | 2026-10-13 |
| Missions | who drives | Human approves (execution starts once the plan is approved) | https://docs.factory.com/missions/overview ; https://factory.com/news/missions | 2026-10-13 |

## DEV-TASK

Four surfaces: an interactive **Droid session**, a **Mission worker**, a headless **`droid exec`** run, and a
**delegated issue** (Linear).

| Surface | Field | Value | Source | As of |
| --- | --- | --- | --- | --- |
| Droid session | input | A prompt; the quickstart advises one small, verifiable change, and Spec Mode advises stating how to verify | https://docs.factory.com/droid-cli/quickstart ; https://docs.factory.com/autonomy-and-safety/specification-mode | 2026-10-13 |
| Droid session | step | Inspects the code, proposes a plan when needed, shows the diff, waits for approval before editing, and runs the relevant validators when asked to finish | https://docs.factory.com/droid-cli/quickstart | 2026-10-13 |
| Droid session | output | Edits in the working tree; commits and branch work happen conversationally on request. A PR from this surface: not documented (QUICK, CLI checked) | https://docs.factory.com/droid-cli/quickstart ; https://docs.factory.com/droid-cli/overview | 2026-10-13 |
| Droid session | who drives | Human approves (the docs call it a propose-and-approve loop; Autonomy Level sets how much runs without asking) | https://docs.factory.com/droid-cli/quickstart ; https://docs.factory.com/autonomy-and-safety/specification-mode | 2026-10-13 |
| Mission worker | input | One feature from the approved plan, handled by a worker session with clean context | https://factory.com/news/missions ; https://docs.factory.com/missions/overview | 2026-10-13 |
| Mission worker | step | Builds the feature, reusing project skills; each feature is checked by user-facing QA against the running app (this needs a script that can start or mock the app); at a milestone end, validation workers verify the milestone | https://docs.factory.com/missions/overview ; https://docs.factory.com/missions/planning ; https://factory.com/news/missions | 2026-10-13 |
| Mission worker | output | Work handed off through git, plus follow-up fix features when validation finds issues. Whether a Mission ends in a PR or a branch: not documented (M-OVER, M-PLAN, M-CLI, M-APP, M-REF, M-NEWS checked) | https://factory.com/news/missions ; https://docs.factory.com/missions/planning | 2026-10-13 |
| Mission worker | who drives | Automated (an orchestration layer manages execution after approval; the person can pause and redirect it) | https://docs.factory.com/missions/overview ; https://docs.factory.com/missions/running-cli | 2026-10-13 |
| `droid exec` | input | A prompt, a prompt file (`-f`), or piped text; read-only unless `--auto low/medium/high` is given | https://docs.factory.com/droid-exec/overview | 2026-10-13 |
| `droid exec` | step | A single non-interactive pass; an action above the granted autonomy stops the run with an error; `--use-spec` starts in Spec Mode. What it checks before finishing is whatever the prompt asks for: not documented as a built-in step (EXEC, CLI, QUICK checked) | https://docs.factory.com/droid-exec/overview | 2026-10-13 |
| `droid exec` | output | Text, JSON or JSON-RPC output, plus files the prompt asks for; exit code 0 on success, non-zero on failure including an unmet objective | https://docs.factory.com/droid-exec/overview | 2026-10-13 |
| `droid exec` | who drives | Automated | https://docs.factory.com/droid-exec/overview | 2026-10-13 |
| Linear issue | input | A Linear issue assigned to Factory or an `@Factory` comment; the guide advises putting repo, outcome, acceptance criteria and verification steps in the description | https://docs.factory.com/delegations/linear | 2026-10-13 |
| Linear issue | step | Droid investigates, implements and tests on a remote computer, posting progress in Linear; it moves a backlog or to-do issue to a started state | https://docs.factory.com/delegations/linear | 2026-10-13 |
| Linear issue | output | A pull request whose link is attached to the issue; the page says delegation does not replace code review | https://docs.factory.com/delegations/linear | 2026-10-13 |
| Linear issue | who drives | Automated once assigned (anyone with the Stop control in Linear can halt the run) | https://docs.factory.com/delegations/linear | 2026-10-13 |

## LOOP-WITHIN-A-TASK

Does it retry until a check passes, what judges, who drives.

| Surface | Field | Value | Source | As of |
| --- | --- | --- | --- | --- |
| Mission | retries until a check passes? | Yes, in outline: when validation surfaces issues the orchestrator creates follow-up fix features before moving on; a feature retry limit exists and warns when hit (the limit's value: not documented, M-OVER, M-PLAN, M-REF checked) | https://factory.com/news/missions ; https://docs.factory.com/missions/overview | 2026-10-13 |
| Mission | what judges | Validation workers: scrutiny and user-testing (QA against the running app), plus tests, regression and integration checks; models for them are set separately; either validation kind can be skipped in settings | https://docs.factory.com/missions/planning ; https://docs.factory.com/missions/reference ; https://factory.com/news/missions | 2026-10-13 |
| Mission | who drives | Automated (the person can pause, tell it to mark an item complete and move on, or re-plan) | https://docs.factory.com/missions/overview ; https://docs.factory.com/missions/running-cli | 2026-10-13 |
| Session with a `Stop` hook | retries until a check passes? | A user-written hook runs when Droid is about to finish; a `block` decision with a reason keeps it working, so a script can require a check before it stops | https://docs.factory.com/harness/hooks | 2026-10-13 |
| Session with a `Stop` hook | what judges | The hook script (the person's own check) | https://docs.factory.com/harness/hooks | 2026-10-13 |
| Session with a `Stop` hook | who drives | Automated | https://docs.factory.com/harness/hooks | 2026-10-13 |
| Plain session or `droid exec` | retries until a check passes? | Not documented as a built-in loop (QUICK, MODES, EXEC, CLI, QA checked); the quickstart only says validators run when asked to finish, and exec fails with a non-zero exit instead of retrying | https://docs.factory.com/droid-cli/quickstart ; https://docs.factory.com/droid-exec/overview | 2026-10-13 |
| Plain session or `droid exec` | what judges / who drives | not documented (same pages checked) | https://docs.factory.com/droid-cli/quickstart ; https://docs.factory.com/droid-exec/overview | 2026-10-13 |
| `/qa` skill | retries until a check passes? | Not a retry loop: it reads the diff, runs the relevant user-flow checks and writes a structured report | https://docs.factory.com/software-factory/automated-qa | 2026-10-13 |

## LOOP-ACROSS-TASKS

What moves on to the next piece of work by itself.

| Surface | Field | Value | Source | As of |
| --- | --- | --- | --- | --- |
| Mission orchestrator | trigger | The finished feature or milestone: the orchestrator reviews progress and starts the next work from the plan | https://factory.com/news/missions ; https://docs.factory.com/missions/overview | 2026-10-13 |
| Mission orchestrator | who drives | Automated (the person can pause it; long missions can run on a Droid Computer) | https://docs.factory.com/missions/overview ; https://docs.factory.com/missions/running-app | 2026-10-13 |
| Scheduled automation | trigger | A schedule in plain words or a five-field cron (UTC); the starter "Ticket to PR" runs every 15 minutes, picks up ready Linear or Jira tickets one at a time and drives each to an open PR | https://docs.factory.com/software-factory/automations | 2026-10-13 |
| Scheduled automation | state carried on | A folder with the standing instructions (`HEARTBEAT.md`), notes in `memory/`, run reports and per-automation skills | https://docs.factory.com/software-factory/automations | 2026-10-13 |
| Scheduled automation | who drives | Automated (five failed scheduled runs in a row pause it) | https://docs.factory.com/software-factory/automations | 2026-10-13 |
| Event automation | trigger | A Slack message, a webhook POST, or a GitHub event (pull request, comment, push, label change, checks completed); a run is skipped while the previous run is still going, and a webhook automation is capped at 10 runs an hour | https://docs.factory.com/software-factory/automations | 2026-10-13 |
| Event automation | who drives | Automated | https://docs.factory.com/software-factory/automations | 2026-10-13 |
| Delegation (Slack, Linear, Jira, Teams) | trigger | A person mentions or assigns Factory; follow-up messages continue the same session | https://docs.factory.com/delegations ; https://docs.factory.com/delegations/slack ; https://docs.factory.com/delegations/linear | 2026-10-13 |
| Delegation (Slack, Linear, Jira, Teams) | who drives | Human starts each one; running it afterwards is Automated (LINEAR) | https://docs.factory.com/delegations ; https://docs.factory.com/delegations/linear | 2026-10-13 |
| `droid exec --mission` | trigger | Run from CI or a cron job; a Mission headless needs `--auto high` or `--skip-permissions-unsafe` | https://docs.factory.com/droid-exec/overview ; https://docs.factory.com/missions/reference | 2026-10-13 |
| `droid exec --mission` | who drives | Automated | https://docs.factory.com/droid-exec/overview | 2026-10-13 |

## Not documented (with the index pages checked)

- Whether a Mission ends in a PR or a branch: missions/overview, missions/planning, missions/running-cli,
  missions/running-app, missions/reference, factory.com/news/missions, droid-exec/overview.
- Dependency edges between features in a Mission plan: the same six Missions pages.
- The value of the per-feature retry limit: missions/overview, missions/planning, missions/reference.
- Task split with criteria in Spec Mode: autonomy-and-safety/specification-mode, droid-cli/quickstart, droid-cli/overview.
- A built-in retry-until-check loop outside Missions: droid-cli/quickstart, autonomy-and-safety/specification-mode,
  droid-exec/overview, droid-cli/overview, software-factory/automated-qa.

## Pages read

Read in full, from https://docs.factory.com/llms.txt (fetched 2026-10-13) unless noted:

- missions/overview, missions/planning, missions/running-cli, missions/running-app, missions/reference
- autonomy-and-safety/specification-mode (Interaction Modes, which covers Spec Mode)
- droid-exec/overview (including its Mission Mode section)
- software-factory/automations (Custom Automations)
- software-factory/triage
- delegations/index, delegations/slack, delegations/linear
- droid-cli/overview, droid-cli/quickstart
- harness/hooks (lifecycle events and `Stop` behaviour)
- https://factory.com/news/missions (the news post, not in the docs index)

Read in part only: software-factory/automated-qa (setup and how QA runs), software-factory/overview and harness/skills
(searched for loop, ticket and built-in-skill content), delegations/jira (opening section only).

## Ruled out (why)

- **Droid Computers, Environments, Remote Control, Sandbox, Worktrees**: out of lesson 1 scope (sandboxes, isolation).
- **Code Review, Automated Code Review, Security Review, Release, Incident Response, AutoWiki, Agent Effectiveness**:
  review policy, release and ops are out of scope; only noted as guided automations.
- **Agent Readiness (overview, report, dashboard)**: Missions suggests a readiness level for QA to work, but the pages
  are about repo scoring, not planning or looping; not read.
- **Delegations: Jira, Microsoft Teams**: same pattern as Linear and Slack; Jira opening section skimmed, Teams not read.
- **Droid Sessions API, Python and TypeScript SDKs, CI Automations API, Factory API**: programmatic wrappers of the
  same exec and automation features; not read.
- **Subagents, custom slash commands, plugins, MCP, connectors, AGENTS.md**: extension points used inside the surfaces
  above, not a planning, task or loop surface of their own.
- **Autonomy Level, permission rules, Droid Shield**: approval and safety controls; Autonomy Level is only mentioned
  where it changes who drives.
- **Enterprise, pricing, models, BYOK, Factory Router, telemetry, audit log, benchmarks, changelog, feature maturity**:
  not planning, task or loop content; the changelog was not scanned for planning features.
