# Factory (Droids / Missions): verification grid

Scope: how Factory verifies work, meaning what checks run, who decides a task is done, whether the product runs the app
itself, what keeps it going, and what evidence the person sees. Left out on purpose: how plans are made (see
`landscape/plan-grid/factory.md`), sandbox and permission design, and review policy beyond what it says about verifying.
Every filled cell is a paraphrase of a first-party page, with its URL and the date I fetched it (**2026-10-21**; table cells re-checked against the pages on **2026-10-23**). Names
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
| Mission | what runs | Validation workers run at the end of each milestone: a scrutiny kind and a user-testing kind. They exercise the running application to check the milestone's work, and this runs alongside the standard test, lint and build cycle, not in place of it. Which exact commands (tests, lint, typecheck) run is not named; it follows the project | https://docs.factory.com/missions/planning ; https://docs.factory.com/missions/reference ; https://factory.com/news/missions | 2026-10-23 |
| Mission | who decides done | The docs do not say who or what declares a Mission or feature done (missions/overview read again for this). They describe validation workers checking each feature, and the person as a project manager who watches, unblocks and redirects. The person can pause the orchestrator and tell it to mark the current item complete and move on | https://factory.com/news/missions ; https://docs.factory.com/missions/overview ; https://docs.factory.com/missions/running-cli | 2026-10-23 |
| Mission | runs the app itself | Yes, as user-facing QA against the running application for each feature; validators launch the app, walk through flows and flag visual or functional faults. It needs the project to supply a script that starts or mocks the app and its dependencies; without it the Mission "cannot reliably verify its own work" | https://docs.factory.com/missions/overview ; https://docs.factory.com/missions/planning ; https://factory.com/news/missions | 2026-10-23 |
| Mission | how it keeps going | When validation finds problems the orchestrator adds follow-up fix features before moving on. A feature that keeps failing raises a retry-limit warning, and the person is told to inspect the latest worker for that feature. The limit's value is not documented | https://docs.factory.com/missions/overview ; https://docs.factory.com/missions/planning ; https://factory.com/news/missions | 2026-10-23 |
| Mission | acceptance criteria turned into checks | Each feature carries validation criteria, visible by drilling into a feature in the Factory App along with its commits. Whether criteria are written before the code, or how they map to test files, is not documented (checked: missions/overview, planning, reference, running-cli, running-app, factory.com/news/missions) | https://docs.factory.com/missions/running-app ; https://docs.factory.com/missions/planning | 2026-10-23 |
| Mission | per-task test planning | Milestones set how often validation runs ("for simple projects, one milestone is often enough"; finer milestones in complex projects limit drift and rework). Per-feature test lists: not documented (same pages as above) | https://docs.factory.com/missions/planning ; https://docs.factory.com/missions/overview | 2026-10-23 |
| Mission | coverage or speed limits | Cost floor is about one run per feature plus two per milestone; fix features can add more. The docs advise the QA script start the whole stack with one command, log to files, stay light on resources and accept programmatic input. A repository at Agent Readiness Level 4 or above is advised. Validation can be turned off in Mission Control settings (scrutiny and user-testing have separate skip settings in the reference); an organization cannot set those two switches | https://docs.factory.com/missions/planning ; https://docs.factory.com/missions/overview ; https://docs.factory.com/missions/reference | 2026-10-23 |
| Mission | evidence shown to the person | Mission Control lists every worker and milestone in a live progress log; selecting a worker shows its terminal output, reasoning and sub-tasks; a feature's validation criteria and commits can be opened. Screenshots or recordings from Mission QA: not documented (checked: missions/running-app, running-cli, overview, planning) | https://docs.factory.com/missions/running-app | 2026-10-23 |
| Mission | guard against weakening tests | Not documented (checked: missions/overview, planning, reference, running-cli, running-app, factory.com/news/missions). The only nearby statement is that each feature gets a fresh worker session with clean context, which is not a test guard | https://factory.com/news/missions ; https://docs.factory.com/missions/planning | 2026-10-23 |
| Mission | CI required or branch protection | Not documented (same Missions pages; software-factory/overview and droid-exec/overview also checked). A Mission's PR outcome is likewise not documented | https://docs.factory.com/missions/overview ; https://docs.factory.com/software-factory/overview | 2026-10-23 |
| Mission | headless, models | `droid exec --mission` needs `--auto high` or `--skip-permissions-unsafe`; orchestrator, worker and validator each get their own model and reasoning effort | https://docs.factory.com/droid-exec/overview ; https://docs.factory.com/missions/reference | 2026-10-23 |
| `/qa` skill | what runs | Reads the diff, maps changed files to apps using path patterns in a generated `config.yaml`, and runs only the flows for affected apps. Web apps are driven in a real browser, terminal apps through a virtual terminal, APIs with curl | https://docs.factory.com/software-factory/automated-qa | 2026-10-23 |
| `/qa` skill | who decides done | The skill writes a report with pass, fail or blocked per test case. The check can be configured as required or optional in CI, so the repository's merge rules decide whether a failure stops the merge. The exact pass rule: not documented (automated-qa read in full) | https://docs.factory.com/software-factory/automated-qa | 2026-10-23 |
| `/qa` skill | runs the app itself | Yes: a real browser, a virtual terminal, or HTTP calls, per app type. Setup (`/install-qa`) analyses the codebase, asks a questionnaire, then generates the skills; a changelog entry says setup now reviews its own generated files | https://docs.factory.com/software-factory/automated-qa ; https://docs.factory.com/changelog/release-notes | 2026-10-23 |
| `/qa` skill | how it keeps going | Not a retry loop. Its "failure learning" updates the QA skill files, never the code under test, in one of three ways: suggest in the report (default), auto-commit, or open a draft PR. Retry on a failed run: not documented (automated-qa read in full) | https://docs.factory.com/software-factory/automated-qa | 2026-10-23 |
| `/qa` skill | CI required or branch protection | The generated GitHub Actions workflow runs on pull requests (and after preview deploys on Vercel or Netlify) and calls `droid exec` with the QA skill; the check can be marked required. It needs repository secrets for credentials named in `config.yaml`. Setup offers to generate the workflow when the project has a `.github/` directory | https://docs.factory.com/software-factory/automated-qa | 2026-10-23 |
| `/qa` skill | evidence shown to the person | A PR comment with a table of test cases and results, plus inline evidence: screenshots, terminal text snapshots or PNGs, and animated before/after images for visual regressions when ImageMagick is installed. A changelog entry says QA reports on GitLab CI setups include video evidence; the automated-qa page itself mentions no video | https://docs.factory.com/software-factory/automated-qa ; https://docs.factory.com/changelog/release-notes | 2026-10-23 |
| `/qa` skill | coverage or speed limits | Scope is limited to apps whose path patterns match the diff. No timeouts or platform limits are documented beyond an example `tuistory` wait of 8 seconds (automated-qa read in full) | https://docs.factory.com/software-factory/automated-qa | 2026-10-23 |
| Droid session | what runs | Droid inspects the code, shows the exact diff, waits for approval, then runs "the relevant validators" when asked to finish; the quickstart also tells the person to review the diff and run the relevant tests before accepting. Which validators (tests, lint, typecheck) are built in: not documented, the page names none (summary; droid-cli/quickstart) | https://docs.factory.com/droid-cli/quickstart | 2026-10-23 |
| Droid session | who decides done | Human approves: the person accepts or rejects each proposed change in the interface | https://docs.factory.com/droid-cli/quickstart | 2026-10-23 |
| Droid session | acceptance criteria turned into checks | The request is where they live: Spec Mode advice is to state the outcome, constraints, verification steps and patterns to follow, and the example asks for tests for invalid or expired links. Nothing turns them into checks automatically | https://docs.factory.com/autonomy-and-safety/specification-mode | 2026-10-23 |
| Droid session | per-task test planning | Only through that request text; tests appear as part of the planned work, not as an enforced gate (Interaction Modes) | https://docs.factory.com/autonomy-and-safety/specification-mode | 2026-10-23 |
| Droid session | coverage or speed limits | Autonomy Level decides whether tests can run unprompted: Low covers file edits and low-risk commands, Medium adds reversible workspace changes such as dependency installs, builds and local commits (the page says to pick Medium when a run must install dependencies, build, test or make local commits), High adds higher-risk actions such as pushes where permitted, migrations and custom scripts | https://docs.factory.com/autonomy-and-safety/auto-run | 2026-10-23 |
| Droid session | evidence shown to the person | The diff and approve/reject prompt; `/review` for uncommitted changes, a commit or a branch diff. Logs or recordings of a test run: not documented (droid-cli/quickstart, autonomy-and-safety/auto-run checked) | https://docs.factory.com/droid-cli/quickstart ; https://docs.factory.com/software-factory/code-review | 2026-10-23 |
| `Stop` hook | how it keeps going | A person-written script runs when Droid is about to finish. Exit code 2 feeds stderr back to Droid, and a JSON `decision: "block"` with a `reason` prevents stopping and tells Droid what to do next; this is how a project can force a final check. The hook input carries a `stop_hook_active` field (which the page summary ties to avoiding endless re-blocking) | https://docs.factory.com/harness/hooks | 2026-10-23 |
| `Stop` hook | who decides done | The hook script, i.e. the person's own check. Droid ships no built-in test hook | https://docs.factory.com/harness/hooks | 2026-10-23 |
| `PostToolUse` hook | what runs | Fires right after a tool finishes, with a matcher such as `Create|Edit|ApplyPatch`; common uses are formatting files, running validation and adding feedback after an edit (exit code 2 feeds stderr back to Droid). The page's only worked example formats TypeScript files; running linters, type checks or tests the same way is the intended pattern but has no example (summary) | https://docs.factory.com/harness/hooks | 2026-10-23 |
| `SubagentStop` hook | what runs | Fires when a sub-droid finishes, with its result and error; meant for checking the sub-droid's output or asking for more work | https://docs.factory.com/harness/hooks | 2026-10-23 |
| `droid exec` | who decides done | The exit code, but only weakly: 0 when the run completes, non-zero when it stops early (a permission stop, an invalid flag, an API error); the page says to treat non-zero as failed in CI and that exit 0 means Droid finished, not that the task succeeded, so the pipeline must check the result with its own tools | https://docs.factory.com/droid-exec/overview | 2026-10-23 |
| `droid exec` | what runs | Whatever the prompt asks. The docs' example for testing is a prompt to install dependencies, run tests and fix failing checks at `--auto medium`; there is no built-in test step | https://docs.factory.com/droid-exec/overview | 2026-10-23 |
| `droid exec` | evidence shown to the person | Text (default), JSON, stream-JSON or stream-JSON-RPC output; the JSON result carries `is_error`, `duration_ms`, `num_turns` and `session_id`. The page advises asking the agent to emit artifacts the pipeline can verify | https://docs.factory.com/droid-exec/overview | 2026-10-23 |
| `droid exec` | guard against weakening tests | Not documented (checked: droid-exec/overview, harness/hooks, autonomy-and-safety/auto-run). A command-policy check (`droid rules check`) previews allow/ask/block for a command, which is about commands, not test files | https://docs.factory.com/droid-exec/overview | 2026-10-23 |
| Delegation (Linear, Jira, Slack) | what runs | The request is expected to say how to verify (the Linear and Jira pages advise including verification steps; the index says to state how Droid should verify the result). Delegated work covers investigation, implementation and testing | https://docs.factory.com/delegations/index ; https://docs.factory.com/delegations/linear ; https://docs.factory.com/delegations/jira ; https://docs.factory.com/delegations/slack | 2026-10-23 |
| Delegation (Linear, Jira, Slack) | who decides done | The person: all three pages say to review the changes and the test results before merging; the Linear and Jira pages add that delegating does not replace code review | https://docs.factory.com/delegations/linear ; https://docs.factory.com/delegations/jira ; https://docs.factory.com/delegations/slack | 2026-10-23 |
| Delegation (Linear, Jira, Slack) | acceptance criteria turned into checks | The issue text carries them: the Linear and Jira pages advise putting the repo, outcome, acceptance criteria and verification steps in the description, which is passed to Droid at the start. No automatic conversion to tests is described | https://docs.factory.com/delegations/linear ; https://docs.factory.com/delegations/jira | 2026-10-23 |
| Delegation (Linear, Jira, Slack) | CI required or branch protection | Factory authors the PR, so the requester can still approve it. The delegations page shows how to require two approvals through branch protection, or a required status check enforcing two human approvals for PRs by the Factory bot | https://docs.factory.com/delegations/index | 2026-10-23 |
| Delegation (Linear, Jira, Slack) | evidence shown to the person | Progress and results in the agent session on the issue (Jira also shows preparing, working and waiting states), and a linked pull request to review. In Slack: messages, files, artifacts and result videos; a code channel shows the repo, branch and a diff of changes | https://docs.factory.com/delegations/linear ; https://docs.factory.com/delegations/jira ; https://docs.factory.com/delegations/slack | 2026-10-23 |
| Delegation (Linear, Jira, Slack) | how it keeps going | Not documented as a verify-and-retry loop (checked: delegations index, linear, jira, slack). On Jira, follow-up instructions go in the same conversation thread; the person can stop a Linear run, and stopping does not undo work already done | https://docs.factory.com/delegations/linear ; https://docs.factory.com/delegations/jira | 2026-10-23 |
| Automation | post-PR auto-fix | Starter "Review Comment Fixer" (trigger: a GitHub comment on a PR) makes the requested changes in one commit. The GitHub event list also includes "checks completed", so an automation can react to CI results; which starter uses that trigger is not stated (the failed-pipeline triager below is webhook-driven) | https://docs.factory.com/software-factory/automations | 2026-10-23 |
| Automation | what runs | Starters touching verification: Ticket to PR (every 15 minutes, converts ready Linear or Jira tickets into pull requests), Test Coverage (on a PR, adds focused tests for changed code), CI Failure Triage (webhook; sorts failed pipelines into flaky, infrastructure or regression and names the responsible commit), Code Health (weekdays, rotates dependency audits, dead code and coverage checks). What Ticket to PR runs before opening the PR: not documented (software-factory/automations read; api-reference/automations-ci not read) | https://docs.factory.com/software-factory/automations | 2026-10-23 |
| Automation | how it keeps going | A webhook automation's run is skipped while its previous run is going; five scheduled failures in a row pause an automation; a webhook automation is capped at 10 runs an hour (the limit resets at the top of the next hour); each automation has a folder holding instructions (`HEARTBEAT.md`), memory and reports | https://docs.factory.com/software-factory/automations | 2026-10-23 |
| Review | what runs | CI review looks for clear bugs (dead code, broken control flow, async mistakes, null dereference, leaks, injection, missing error handling, off-by-one, races) and skips style; it posts inline comments and approves when it finds nothing. Whether it runs tests: not documented (code-review-ci, code-review checked). Local `/review` (against a base branch, uncommitted changes, a commit, or custom instructions) reports findings with severity P0 to P3 and file locations; nothing is applied automatically | https://docs.factory.com/software-factory/code-review-ci ; https://docs.factory.com/software-factory/code-review | 2026-10-23 |
| Review | who decides done | Local `/review`: the author, who decides what to fix. CI review: whether its findings block a merge or count as a required check is not documented (code-review-ci, code-review checked) | https://docs.factory.com/software-factory/code-review | 2026-10-23 |
| Review | acceptance criteria turned into checks | Repository-specific review criteria can be written in a `review-guidelines` skill file, which is injected into every review run; it is a rubric, not a test | https://docs.factory.com/software-factory/code-review-ci | 2026-10-23 |
| Security review | what runs | Two passes: a candidate pass that traces data flows across trust boundaries, then a validation pass that rechecks each candidate for reachability, exploitability, existing controls and false positives; only findings with a realistic exploit path are reported. Severity threshold, blocking and team notification are inputs declared in the action's `action.yml`; their detail is not on the page, and auto-fix is not mentioned (summary) | https://docs.factory.com/software-factory/security-review | 2026-10-23 |
| Software Factory dashboard | CI required or branch protection | The Validate stage reports repo coverage of code review, QA and security audit, with pass rate and review volume, and tags a "merge gate" metric for QA, security and code-review checks run against pull requests. Whether the gate is enforced by Factory or by repository settings: not documented (software-factory/overview checked) | https://docs.factory.com/software-factory/overview | 2026-10-23 |
| Release | what runs | The verify step of the release workflow runs validation, reviews failures and compares rollout blockers, using readiness from code review, QA, security review and CI; pass rate is the share of release gates that finished without intervention. The page marks Release as Private Preview | https://docs.factory.com/software-factory/release | 2026-10-23 |
| Droid Control | runs the app itself | A plugin that lets Droid launch and operate terminal, web, Electron and desktop apps through four drivers (virtual terminal, browser, desktop accessibility tree, headless terminal emulator) | https://docs.factory.com/software-factory/droid-control | 2026-10-23 |
| Droid Control | evidence shown to the person | Its `/verify` command uses text snapshots for functional claims and screenshots for visual claims, reports CONFIRMED, REFUTED or INCONCLUSIVE, and carries anti-fabrication rules against staging evidence to match an expected result; `/demo` records before/after videos. `/qa-test` reports a step-level pass/fail table with inline evidence (screenshots or text snapshots) | https://docs.factory.com/software-factory/droid-control | 2026-10-23 |
| Agent Readiness | coverage or speed limits | Scores a repo across nine pillars, including linters, type checkers and formatters; deterministic build commands; unit and integration tests; and branch protection, secret scanning and code ownership. A repo advances a level by passing 80% of that level's criteria; Level 4 (Optimized) is described as fast CI feedback, regular deployment frequency and flaky test detection | https://docs.factory.com/agent-readiness/overview | 2026-10-23 |

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

## Added dimensions: hidden tests and test quality (fetched 2026-10-29)

Two new dimensions, plus property-based and fuzz testing where documented. The dimensions above are not repeated. Method: the docs
index (https://docs.factory.com/llms.txt, 2026-10-29) was fetched first, then every page that could touch testing, QA, review,
hooks, readiness or test generation was fetched again and asked about these topics only. As above, the fetch tool returns a condensed
extraction, so each "not documented" rests on that tool reporting the topic absent from the page. Surfaces covered: Missions
(validation workers), the `/qa` skill, the daily docs-and-tests `droid exec` recipe, the Test Coverage automation starter, CI code
review, hooks, Droid Control and Agent Readiness. The index now lists the QA, review and automations pages under `/automations/`;
the earlier grid cites them under `/software-factory/`, and the `/software-factory/automations` page was still served on 2026-10-29.

| Surface | HIDDEN OR HELD-OUT TESTS | TEST-QUALITY MEASURE (mutation score or similar) | PROPERTY-BASED OR FUZZ TESTING |
| --- | --- | --- | --- |
| **Mission validation workers** | Not documented as a hidden check. The pages say validation workers check each milestone after the feature workers, and the news post describes workers reviewing accumulated work, so the validator is a different worker from the builder. Whether it is a separate session, or whether any criteria are kept from the builder, is not stated (checked: missions/overview, planning, reference, running-app, factory.com/news/missions). The overview also describes the Mission running user-facing QA to "self-correct as it goes", which reads as the same system checking its own work. ([Missions planning](https://docs.factory.com/missions/planning.md), [news post](https://factory.com/news/missions), 2026-10-29) | Not documented (checked: missions/overview, planning, reference, running-app, factory.com/news/missions). The news post says validators run tests, look for regressions and check integration; nothing measures how good the tests are. | Not documented (checked: the same five pages). |
| **`/qa` skill** | Not documented (checked: automations/automated-qa). The skill derives its flows from the diff and the generated config, and nothing says they are kept from the coding agent. ([Automated QA](https://docs.factory.com/automations/automated-qa.md), 2026-10-29) | Not documented: the report is pass, fail or blocked per case, with no measure of the checks themselves (checked: automations/automated-qa). | Not documented (checked: automations/automated-qa). |
| **Daily docs-and-tests recipe (`droid exec`)** | Partly, and not about tests. The recipe splits the work into a `draft` job that writes code and a `verify` job that runs the tests without credentials, so the run step is separate from the writing step. The tests the draft job wrote are the ones that run; nothing is held back. If they fail, the PR opens as a draft with a note. ([Daily docs and tests recipe](https://docs.factory.com/droid-exec/recipes/daily-docs-tests.md), 2026-10-29) | Only "do the new tests run and pass". No measure of whether they would catch a bug (checked: droid-exec/recipes/daily-docs-tests). | Not documented (checked: droid-exec/recipes/daily-docs-tests). |
| **Test Coverage automation starter** | Not documented (checked: software-factory/automations). | Coverage only: the starter adds tests for what a PR changes and comments on what is now covered. Mutation score or similar: not documented. ([Automations](https://docs.factory.com/software-factory/automations.md), 2026-10-29) | Not documented (checked: software-factory/automations). |
| **CI code review** | Not documented (checked: automations/code-review-ci). | Not documented: no assessment of whether a PR's tests are weak or missing (checked: automations/code-review-ci). ([CI code review](https://docs.factory.com/automations/code-review-ci.md), 2026-10-29) | Not documented (checked: automations/code-review-ci). |
| **Hooks** | Not documented. No page mentions protecting or hiding test files; a hook could be written to do it, but the page does not say so (checked: harness/hooks). ([Hooks](https://docs.factory.com/harness/hooks.md), 2026-10-29) | Not documented (checked: harness/hooks). | Not documented (checked: harness/hooks). |
| **Droid Control** | Not documented as a hidden check. The page frames the droid as an investigator that reports a claim as refuted when it is false, with rules against staging evidence to fit the expected result. That is honesty of evidence, not a check kept from the builder (checked: software-factory/droid-control). ([Droid Control](https://docs.factory.com/software-factory/droid-control.md), 2026-10-29) | Not documented: it reports CONFIRMED, REFUTED or INCONCLUSIVE per claim, not a measure of tests (checked: software-factory/droid-control). | Not documented (checked: software-factory/droid-control). |
| **Agent Readiness** | Not documented (checked: agent-readiness/overview). | The nearest thing is the Testing pillar (criteria such as unit tests existing, integration tests existing and tests running locally) and flaky-test detection, named at Level 4. Both describe the repository, not the tests an agent just wrote; mutation score is not documented. ([Agent Readiness](https://docs.factory.com/agent-readiness/overview.md), 2026-10-29) | Not documented (checked: agent-readiness/overview). |
| **`droid exec`** | Not documented (checked: droid-exec/overview). | Not documented (checked: droid-exec/overview). ([droid exec](https://docs.factory.com/droid-exec/overview.md), 2026-10-29) | Not documented (checked: droid-exec/overview). |

Takeaways for the lesson, all from the cells above:

- No page documents held-out tests. The closest design is the Mission's validation workers, a different worker from the builder, but nothing says they use criteria the builder cannot see. The daily recipe separates the test run from the writing, not the tests from the writer.
- Test quality is measured, where at all, as coverage (Test Coverage starter) or as a repository property (Agent Readiness). No page documents mutation score or a check that the new tests would fail on a broken change.
- Property-based and fuzz testing are not documented on any page read.

### Pages read (added dimensions)

All fetched 2026-10-29, index first (https://docs.factory.com/llms.txt). Condensed extraction, see Method above.

- https://docs.factory.com/missions/overview.md
- https://docs.factory.com/missions/planning.md
- https://docs.factory.com/missions/reference.md
- https://docs.factory.com/missions/running-app.md
- https://factory.com/news/missions
- https://docs.factory.com/automations/automated-qa.md
- https://docs.factory.com/automations/code-review-ci.md
- https://docs.factory.com/software-factory/automations.md
- https://docs.factory.com/droid-exec/recipes/daily-docs-tests.md
- https://docs.factory.com/droid-exec/overview.md
- https://docs.factory.com/harness/hooks.md
- https://docs.factory.com/software-factory/droid-control.md
- https://docs.factory.com/agent-readiness/overview.md

### Ruled out (why), added dimensions

- **`/automations/automations.md`**: returned 404 on 2026-10-29; the `/software-factory/automations` page was read instead.
- **automations/code-review, security-review, wiki/auto-refresh**: local review, security review and wiki refresh; the CI review page stood in for review, and none is about tests the agent wrote. Not fetched, so a test-quality remark there would be missed.
- **agent-readiness/readiness-report, dashboard, api-reference/readiness-reports**: report and dashboard wrappers of the overview; not fetched.
- **Benchmarks (Agent Arena, Legacy Bench, NextJS, Review Benchmark, Terminal Bench)**: product evaluations, not a check applied to a user's work.
- **Release notes and changelog**: not searched; a newer entry could announce a test-quality or held-out-test feature that the pages above do not yet describe. That is a gap, not a finding.
- **Missions running-cli and the delegation pages**: read for the first grid with no test-quality content; not fetched again here.
