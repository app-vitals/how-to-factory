# Factory (Droids / Missions): verification grid

Scope: how Factory verifies work, meaning what checks run, who decides a task is done, whether the product runs the app
itself, what keeps it going, and what evidence the person sees. Left out on purpose: how plans are made (see
`landscape/plan-grid/factory.md`), sandbox and permission design, and review policy beyond what it says about verifying.
Every filled cell is a paraphrase of a first-party page, with its URL and the date I fetched it (**2026-10-21**). Names
are Factory's own (Missions, Spec Mode, Droid Control, Delegations), not canonical. Several surfaces are used because no
single one covers every dimension; each row names its surface.

Method: fetched the docs index (https://docs.factory.com/llms.txt, 2026-10-21), listed every page that could touch
verification (Missions, Automated QA, hooks, autonomy, `droid exec`, delegations, automations, code and security review,
agent readiness, release, Droid Control), then fetched the raw Markdown (`<url>.md`) of each. The fetch tool returns a
model-written summary of a page, not raw text, so quoted phrases below are short and were checked against that summary;
a claim that rests on a page the tool summarised thinly is marked "(summary)". Started from
`landscape/field-grid/factory.md` (2026-10-13) but every page was fetched again; its notes are not carried over unchecked.

## The grid

Surfaces: **Mission** (multi-feature run with an orchestrator, workers and validators), **`/qa` skill** (Automated QA),
**Droid session** (interactive CLI or app), **`Stop` / `PostToolUse` hook**, **`droid exec`** (headless), **Delegation**
(Linear, Jira, Slack), **Automation** (scheduled or event-driven), **Review** (local `/review`, CI review, security
review), **Droid Control** (plugin).

| Surface | Dimension | Value | Source | As of |
| --- | --- | --- | --- | --- |
| Mission | what runs | Validation workers run at the end of each milestone: a scrutiny kind and a user-testing kind. They run tests, look for regressions and check that the pieces integrate; a QA pass exercises the running app alongside the usual test, lint and build cycle. Which exact commands (tests, lint, typecheck) run is not named; it follows the project | https://docs.factory.com/missions/planning ; https://docs.factory.com/missions/reference ; https://factory.com/news/missions | 2026-10-21 |
| Mission | who decides done | Not a human gate in the docs: validators and the orchestrator decide, and the person is described as a project manager who watches, unblocks and redirects. The person can pause and tell the orchestrator to mark an item complete and move on, which is the only documented human override | https://factory.com/news/missions ; https://docs.factory.com/missions/overview ; https://docs.factory.com/missions/running-cli | 2026-10-21 |
| Mission | runs the app itself | Yes, as user-facing QA against the running application for each feature; validators launch the app, walk through flows and flag visual or functional faults. It needs the project to supply a script that starts or mocks the app and its dependencies; without it the Mission "cannot reliably verify its own work" | https://docs.factory.com/missions/overview ; https://docs.factory.com/missions/planning ; https://factory.com/news/missions | 2026-10-21 |
| Mission | how it keeps going | When validation finds problems the orchestrator adds follow-up fix features before moving on. A feature that keeps failing raises a retry-limit warning, and the person is told to inspect the latest worker for that feature. The limit's value is not documented | https://docs.factory.com/missions/overview ; https://docs.factory.com/missions/planning ; https://factory.com/news/missions | 2026-10-21 |
| Mission | acceptance criteria turned into checks | Each feature carries validation criteria, visible by drilling into a feature in the Factory App along with its commits. Whether criteria are written before the code, or how they map to test files, is not documented (checked: missions/overview, planning, reference, running-cli, running-app, factory.com/news/missions) | https://docs.factory.com/missions/running-app ; https://docs.factory.com/missions/planning | 2026-10-21 |
| Mission | per-task test planning | Planning names how work is validated as one of the things to get right, and milestones set how often validation runs (one milestone for a simple project, more for complex ones to limit drift). Per-feature test lists: not documented (same pages as above) | https://docs.factory.com/missions/planning ; https://docs.factory.com/missions/overview | 2026-10-21 |
| Mission | coverage or speed limits | Cost floor is about one run per feature plus two per milestone; fix features can add more. The docs advise the QA script start the whole stack with one command, log to files, stay light on resources and accept programmatic input. A repository at Agent Readiness Level 4 or above is advised. Validation can be turned off (scrutiny and user-testing separately) in Mission Control settings; those two switches are user-managed and cannot be set by an organization's managed settings | https://docs.factory.com/missions/planning ; https://docs.factory.com/missions/overview ; https://docs.factory.com/missions/reference | 2026-10-21 |
| Mission | evidence shown to the person | Mission Control lists every worker and milestone in a live progress log; selecting a worker shows its terminal output, reasoning and sub-tasks; a feature's validation criteria and commits can be opened. Screenshots or recordings from Mission QA: not documented (checked: missions/running-app, running-cli, overview, planning) | https://docs.factory.com/missions/running-app | 2026-10-21 |
| Mission | guard against weakening tests | Not documented (checked: missions/overview, planning, reference, running-cli, running-app, factory.com/news/missions). The docs only note that validators start in a fresh session with clean context | https://factory.com/news/missions ; https://docs.factory.com/missions/planning | 2026-10-21 |
| Mission | CI required or branch protection | Not documented (same Missions pages; software-factory/overview and droid-exec/overview also checked). A Mission's PR outcome is likewise not documented | https://docs.factory.com/missions/overview ; https://docs.factory.com/software-factory/overview | 2026-10-21 |
| Mission | headless, models | `droid exec --mission` needs `--auto high` or the skip-permissions flag; orchestrator, worker and validator each get their own model and reasoning effort | https://docs.factory.com/droid-exec/overview ; https://docs.factory.com/missions/reference | 2026-10-21 |
| `/qa` skill | what runs | Reads the diff, maps changed files to apps using path patterns in a generated `config.yaml`, and runs only the flows for affected apps (a CLI-only change skips web tests). Web apps are driven in a real browser, terminal apps through a virtual terminal, APIs with curl | https://docs.factory.com/software-factory/automated-qa | 2026-10-21 |
| `/qa` skill | who decides done | The skill writes a report with pass, fail or blocked per test case. The check can be set required or optional in CI, so the repository's merge rules decide whether a failure stops the merge. The exact pass rule: not documented (automated-qa read in full) | https://docs.factory.com/software-factory/automated-qa | 2026-10-21 |
| `/qa` skill | runs the app itself | Yes: a real browser, a virtual terminal, or HTTP calls, per app type. Setup (`/install-qa`) analyses the codebase, asks a questionnaire, then generates the skills; a changelog entry says setup now reviews its own generated files | https://docs.factory.com/software-factory/automated-qa ; https://docs.factory.com/changelog/release-notes | 2026-10-21 |
| `/qa` skill | how it keeps going | Not a retry loop. Its "failure learning" updates the QA skill files, never the code under test, in one of three ways: suggest in the report (default), auto-commit, or open a draft PR. Retry on a failed run: not documented (automated-qa read in full) | https://docs.factory.com/software-factory/automated-qa | 2026-10-21 |
| `/qa` skill | CI required or branch protection | The generated GitHub Actions workflow runs on pull requests (and after preview deploys on Vercel or Netlify) and calls `droid exec` with the QA skill; the check can be marked required. It needs repository secrets for credentials named in `config.yaml`. The workflow is generated only if a `.github/` folder exists | https://docs.factory.com/software-factory/automated-qa | 2026-10-21 |
| `/qa` skill | evidence shown to the person | A PR comment with a table of test cases and results, plus inline evidence: screenshots, terminal text snapshots or PNGs, and optional animated before/after images for visual regressions. A changelog entry says QA reports on GitLab CI setups include video evidence; the automated-qa page itself mentions no video | https://docs.factory.com/software-factory/automated-qa ; https://docs.factory.com/changelog/release-notes | 2026-10-21 |
| `/qa` skill | coverage or speed limits | Scope is limited to apps whose path patterns match the diff. Timeouts and platform limits: not documented (automated-qa read in full) | https://docs.factory.com/software-factory/automated-qa | 2026-10-21 |
| Droid session | what runs | Droid inspects the code, shows the exact diff, waits for approval, then runs "the relevant validators" when asked to finish; the quickstart also tells the person to review the diff and run the relevant tests before accepting. Which validators (tests, lint, typecheck) are built in: not documented, the page names none (summary; droid-cli/quickstart) | https://docs.factory.com/droid-cli/quickstart | 2026-10-21 |
| Droid session | who decides done | Human approves: the person accepts or rejects each proposed change in the interface | https://docs.factory.com/droid-cli/quickstart | 2026-10-21 |
| Droid session | acceptance criteria turned into checks | The request is where they live: Spec Mode advice is to state the outcome, constraints, verification steps and patterns to follow, and the example asks for tests for invalid or expired links. Nothing turns them into checks automatically | https://docs.factory.com/autonomy-and-safety/specification-mode | 2026-10-21 |
| Droid session | per-task test planning | Only through that request text; tests appear as part of the planned work, not as an enforced gate (Interaction Modes) | https://docs.factory.com/autonomy-and-safety/specification-mode | 2026-10-21 |
| Droid session | coverage or speed limits | Autonomy Level decides whether tests can run unprompted: Low covers file edits and low-risk commands, Medium adds dependency installs, builds and local commits (the page says to pick Medium when a run must build or test), High adds pushes, migrations and scripts | https://docs.factory.com/autonomy-and-safety/auto-run | 2026-10-21 |
| Droid session | evidence shown to the person | The diff and approve/reject prompt; `/review` for uncommitted changes, commits or branch diffs. Logs or recordings of a test run: not documented (droid-cli/quickstart, autonomy-and-safety/auto-run checked) | https://docs.factory.com/droid-cli/quickstart | 2026-10-21 |
| `Stop` hook | how it keeps going | A person-written script runs when Droid is about to finish. Exit code 2, or a JSON `block` decision with a reason, stops the finish and tells Droid what to do next; this is how a project can force a final check. A `stop_hook_active` flag lets the script avoid looping forever | https://docs.factory.com/harness/hooks | 2026-10-21 |
| `Stop` hook | who decides done | The hook script, i.e. the person's own check. Droid ships no built-in test hook | https://docs.factory.com/harness/hooks | 2026-10-21 |
| `PostToolUse` hook | what runs | Fires right after a tool finishes, with a matcher such as create, edit or patch; suited to formatting, validation and feeding errors back. The page's only worked example formats TypeScript files; running linters, type checks or tests the same way is the intended pattern but has no example (summary) | https://docs.factory.com/harness/hooks | 2026-10-21 |
| `SubagentStop` hook | what runs | Fires when a sub-droid finishes, with its result and error; meant for checking the sub-droid's output or asking for more work | https://docs.factory.com/harness/hooks | 2026-10-21 |
| `droid exec` | who decides done | The exit code: 0 on success, non-zero on failure, including a permission violation, a tool error or an unmet objective; the page says to treat non-zero as failed in CI. What counts as an unmet objective is not defined | https://docs.factory.com/droid-exec/overview | 2026-10-21 |
| `droid exec` | what runs | Whatever the prompt asks. The docs' example for testing is a prompt to install dependencies, run tests and fix failing checks at `--auto medium`; there is no built-in test step | https://docs.factory.com/droid-exec/overview | 2026-10-21 |
| `droid exec` | evidence shown to the person | Text, JSON or JSON-RPC output; the JSON result carries an error flag, duration, turn count and session id, so a script can check success. The page advises asking the agent to emit artifacts the pipeline can verify | https://docs.factory.com/droid-exec/overview | 2026-10-21 |
| `droid exec` | guard against weakening tests | Not documented (checked: droid-exec/overview, harness/hooks, autonomy-and-safety/auto-run). A command-policy check (`droid rules check`) previews allow/ask/block for a command, which is about commands, not test files | https://docs.factory.com/droid-exec/overview | 2026-10-21 |
| Delegation (Linear, Jira, Slack) | what runs | The request is expected to say how to verify; the examples tell Droid to run the relevant tests and open a PR. Droid investigates, implements and tests on a remote computer | https://docs.factory.com/delegations/index ; https://docs.factory.com/delegations/linear ; https://docs.factory.com/delegations/jira ; https://docs.factory.com/delegations/slack | 2026-10-21 |
| Delegation (Linear, Jira, Slack) | who decides done | The person: all three pages say to review the changes and the test results before merging, and that delegating does not replace code review | https://docs.factory.com/delegations/linear ; https://docs.factory.com/delegations/jira ; https://docs.factory.com/delegations/slack | 2026-10-21 |
| Delegation (Linear, Jira, Slack) | acceptance criteria turned into checks | The issue text carries them: the Linear and Jira pages advise putting the repo, outcome, acceptance criteria and verification steps in the description, which is passed to Droid at the start. No automatic conversion to tests is described | https://docs.factory.com/delegations/linear ; https://docs.factory.com/delegations/jira | 2026-10-21 |
| Delegation (Linear, Jira, Slack) | CI required or branch protection | Factory authors the PR, so the requester can still approve it. The delegations page shows how to require two approvals through branch protection, or a required status check enforcing two human approvals for PRs by the Factory bot | https://docs.factory.com/delegations/index | 2026-10-21 |
| Delegation (Linear, Jira, Slack) | evidence shown to the person | Progress, actions and a final response in the agent session on the issue (Jira also reports preparing, working and waiting states), plus the linked PR. In Slack: messages, files, artifacts and result videos; a code channel shows the repo, branch and a diff of changes | https://docs.factory.com/delegations/linear ; https://docs.factory.com/delegations/jira ; https://docs.factory.com/delegations/slack | 2026-10-21 |
| Delegation (Linear, Jira, Slack) | how it keeps going | Not documented as a verify-and-retry loop (checked: delegations index, linear, jira, slack). Follow-up messages continue the same session; the person can stop a Linear run, and stopping does not undo work already done | https://docs.factory.com/delegations/linear ; https://docs.factory.com/delegations/jira | 2026-10-21 |
| Automation | post-PR auto-fix | Starter "Review Comment Fixer" (trigger: a GitHub comment on a PR) makes the requested change, pushes one commit and replies. The GitHub event list also includes "checks completed", so an automation can react to CI results; which starter uses that trigger is not stated (the failed-pipeline triager below is webhook-driven) | https://docs.factory.com/software-factory/automations | 2026-10-21 |
| Automation | what runs | Starters touching verification: Ticket to PR (every 15 minutes, takes ready Linear or Jira tickets one at a time to an open PR), Test Coverage (on a PR, adds focused tests for changed code and comments on what is covered), CI Failure Triage (webhook; sorts failed pipelines into flaky, infrastructure or regression and names the responsible commit), Code Health (weekdays, one small maintenance PR per run, including coverage gaps). What Ticket to PR runs before opening the PR: not documented (software-factory/automations read; api-reference/automations-ci not read) | https://docs.factory.com/software-factory/automations | 2026-10-21 |
| Automation | how it keeps going | Runs are skipped while the previous one is going; five scheduled failures in a row pause an automation; a webhook automation is capped at 10 runs an hour; a folder holds standing instructions, memory notes and run reports | https://docs.factory.com/software-factory/automations | 2026-10-21 |
| Review | what runs | CI review looks for functional defects (broken control flow, async mistakes, null dereference, leaks, injection, missing error handling, off-by-one, races) and skips style; it posts inline comments and approves when it finds nothing. Whether it runs tests: not documented (code-review-ci, code-review checked). Local `/review` is static: severity P0 to P3 with locations and suggested fixes, nothing is applied automatically | https://docs.factory.com/software-factory/code-review-ci ; https://docs.factory.com/software-factory/code-review | 2026-10-21 |
| Review | who decides done | Local `/review`: the author, who decides what to fix. CI review: whether its findings block a merge or count as a required check is not documented (code-review-ci, code-review checked) | https://docs.factory.com/software-factory/code-review | 2026-10-21 |
| Review | acceptance criteria turned into checks | Repository-specific review criteria can be written as a review-guidelines skill, which the reviewer uses; it is a rubric, not a test | https://docs.factory.com/software-factory/code-review-ci | 2026-10-21 |
| Security review | what runs | Two passes: a candidate pass that traces untrusted input across trust boundaries, then a validation pass that rechecks each candidate for reachability, exploitability, existing controls and false positives; only findings with a realistic exploit path are reported. Severity threshold, blocking and notifications are action inputs; their detail and any auto-fix are not documented on the page (summary) | https://docs.factory.com/software-factory/security-review | 2026-10-21 |
| Software Factory dashboard | CI required or branch protection | The Validate stage reports repo coverage of code review, QA and security audit, with pass rate and review volume, and labels PR validations as a "merge gate". Whether the gate is enforced by Factory or by repository settings: not documented (software-factory/overview checked) | https://docs.factory.com/software-factory/overview | 2026-10-21 |
| Release | what runs | The verify step of the release workflow runs validation, reviews failures and compares rollout blockers, using readiness from code review, QA, security review and CI; pass rate is the share of release gates that finished without intervention | https://docs.factory.com/software-factory/release | 2026-10-21 |
| Droid Control | runs the app itself | A plugin that lets Droid launch and operate terminal, web, Electron and desktop apps through four drivers (virtual terminal, browser, desktop accessibility, real terminal emulators) | https://docs.factory.com/software-factory/droid-control | 2026-10-21 |
| Droid Control | evidence shown to the person | Text snapshots for behaviour claims, screenshots for visual claims, and video recordings; its verification command reports CONFIRMED, REFUTED or INCONCLUSIVE and carries rules against staging evidence to fit an expected result. QA runs report pass or fail with annotated evidence | https://docs.factory.com/software-factory/droid-control | 2026-10-21 |
| Agent Readiness | coverage or speed limits | Scores a repo on verification groundwork: linters, type checkers, formatters and pre-commit hooks; unit and integration tests runnable locally; deterministic build commands; branch protection, secret scanning and code owners. Level 4 adds fast CI feedback, regular deploys and flaky-test detection, and needs most of Level 3 first | https://docs.factory.com/agent-readiness/overview ; https://docs.factory.com/agent-readiness/readiness-report | 2026-10-21 |

## Not documented (with pages checked)

- Which commands (tests, lint, typecheck) a Mission's validators run, and how a feature's validation criteria are written
  or tied to tests: missions/overview, missions/planning, missions/reference, missions/running-cli, missions/running-app,
  factory.com/news/missions.
- The per-feature retry limit's value, and who or what marks a Mission finished beyond the orchestrator: the same six
  Missions pages.
- A guard against an agent weakening or deleting tests (any surface): missions/* (six pages above), droid-exec/overview,
  harness/hooks, autonomy-and-safety/auto-run, software-factory/automated-qa, software-factory/code-review-ci,
  droid-cli/quickstart. Hooks could be written to do it, but no page says so.
- Screenshots or recordings from Mission QA: missions/running-app, running-cli, overview, planning.
- Whether CI review, security review or the Validate "merge gate" is enforced as a required check: software-factory/code-review-ci,
  code-review, security-review, overview. Only `/qa` is documented as able to be required, and only delegations/index
  documents a branch-protection recipe (two approvals).
- A built-in retry-until-green loop outside Missions: droid-cli/quickstart, droid-exec/overview, delegations/linear,
  delegations/jira, delegations/slack, software-factory/automated-qa.
- What Ticket to PR checks or fixes before and after opening the PR, and any CI-fix loop after a PR: software-factory/automations
  (api-reference/automations-ci was not read; see Ruled out).
- Whether CI review runs tests, and any self-validation of its findings: software-factory/code-review-ci,
  software-factory/code-review.
- Timeouts for `droid exec`: droid-exec/overview.

## Pages read

Fetched 2026-10-21 from the index https://docs.factory.com/llms.txt, as raw Markdown (`<url>.md`) through a tool that
returns a summary; none of the pages was seen as verbatim text.

- missions/overview, missions/planning, missions/reference, missions/running-cli, missions/running-app
- software-factory/automated-qa, software-factory/automations, software-factory/droid-control
- software-factory/code-review, software-factory/code-review-ci, software-factory/security-review
- software-factory/overview, software-factory/release, software-factory/triage
- harness/hooks, droid-exec/overview, droid-cli/quickstart
- autonomy-and-safety/specification-mode, autonomy-and-safety/auto-run
- delegations/index, delegations/linear, delegations/jira, delegations/slack
- agent-readiness/overview, agent-readiness/readiness-report
- changelog/release-notes, changelog/feature-maturity (the latter lists no feature's tag; it only explains the tags)
- https://factory.com/news/missions (first-party news post, not in the docs index)

Triage was read and has no verification content (it classifies and routes intake).

## Ruled out (why)

- **Microsoft Teams delegation**: same pattern as the other delegation pages; not read.
- **Droid Computers, Environments, Remote Control, OpenCompute, Worktrees**: where work runs, not how it is verified.
- **Droid Shield, Sandbox, permission rules**: safety controls, not verification of correctness; Autonomy Level is used only
  where it decides whether tests can run.
- **Incident Response, AutoWiki, Agent Effectiveness (and its dashboards)**: operations, documentation and measurement.
- **api-reference/automations-ci, API references, SDKs (Python, TypeScript), Sessions API**: programmatic wrappers of
  features already read; automations-ci might add Ticket to PR detail and is the first page to read if that gap matters.
- **harness/subagents, skills, custom slash commands, plugins, MCP, connectors, AGENTS.md**: extension points; hooks was
  the one read because it is the documented way to force a check.
- **Enterprise, pricing, models, BYOK, Factory Router, telemetry, audit log, compliance**: not verification content.
- **Benchmarks (Agent Arena, Legacy Bench, NextJS, Review Benchmark, Terminal Bench)**: product evaluations, not the
  verification a user's work gets.
