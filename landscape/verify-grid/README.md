# Verify grid: finished work is checked (lesson 3)

**As of 2026-10-23** (every product file was re-fetched and spot-checked that day; the first pass was 2026-10-21). Every product cell below is a short pointer to the matching cell in
that product's own file, which holds the full wording, the first-party URLs, the pages read and the pages ruled out. This README
adds no claim that the per-product files do not source; the cross-check and observations are counts and comparisons computed from
those files. The "This sample" row is the one exception: it comes from our own inventory, not from a product page.

Scope is the lesson 3 step only: finished work is checked before it counts as done. Plan making (the plan grid), ticket
selection (the field grid), and review as a general activity are left out on purpose (see each product file).

## The grid

Each product row shows the one surface closest to the sample's flow: an agent finishes a task and something decides it is done.
Every product has other surfaces, each its own row in its file, and they differ; the counts further down cover all of them. Where
the shown surface has no cell for a dimension and another surface of the same product does, the cell says **Other surface** and
names it. "Who decides done" uses **Human**, **Human approves** or **Automated** only where the product file's cell says who
decides; where none of the three fits, the cell says what the file says. Names are each product's own, not canonical.

Surfaces shown: Devin, cloud session self-check before the PR; Factory, Mission; OpenHands, goal loop; Cursor, cloud agent;
Copilot, cloud agent session; Claude Code, interactive session.

**What runs, who decides, the app, the loop**

| Product (surface shown) | What runs | Who decides done | Runs the app itself | How it keeps going |
| --- | --- | --- | --- | --- |
| [Devin](devin.md) (cloud session self-check) | Existing tests, lint and type checks in the session; which ones are set by prompt, playbook, AGENTS.md or a skill | **Human**: people review the PR, then choose to merge | Yes, when the prompt asks (run locally, walk a browser flow, screenshots); a separate Testing mode drives the app | Iterates until tests pass before submitting; retry cap not documented |
| [Factory](factory.md) (Mission) | Validation workers at each milestone exercise the running app; exact commands not named | Not stated who declares done: the person acts as project manager and can tell the orchestrator to mark an item complete | Yes: validators launch the app; the project must supply a start script | Orchestrator adds fix features; a retry-limit warning exists, its value not documented |
| [OpenHands](openhands.md) (goal loop) | Whatever command the objective names; a judge model audits the output and runs nothing | **Automated**: a separate judge model, from real output | Only as far as the objective's command does; not described | Judge returns what is missing, the agent retries; default cap 10 rounds |
| [Cursor](cursor.md) (cloud agent) | The agent builds and tests in its VM; its own choice from prompt, skills and rules; a fixed set before a PR not documented | Not stated as a gate: a "merge-ready" PR with artifacts, the person validates | Yes: a desktop VM, dev servers, browser flows | Fixes CI failures on PRs it created; skips in set cases; stops after 10 follow-ups |
| [Copilot](copilot.md) (cloud agent session) | Tests and linters in its own Actions environment before it pushes; commands come from repo instructions | **Human**: the person reviews; the agent adds them as reviewer | Not documented | Not documented as retry-until-green; 59-minute session limit |
| [Claude Code](claude-code.md) (interactive session) | Whatever the person or project instructions name; no built-in test, lint or typecheck | None of the three: Claude stops when work looks done; without a check the person is the loop | **Other surface**: `/verify` and `/run` skills, Chrome, Computer use | **Other surface**: `/goal` and the `Stop` hook keep it going; the hook's block cap is 8 in a row, from one page only |
| **This sample** (dev-task pre-ship, spec check, CI gate) | Repo validate, lint, typecheck, tests, extra layers; every outcome recorded | **Automated** at the spec check (fresh-context subagent); failure of a local check never blocks, CI is the arbiter | Not in the pre-merge flow; a post-deploy canary suite hits the deployed app | Spec check loops until all MET; CI fix loop, up to 6 attempts |

**Criteria, planning, gating, limits, weakened tests**

| Product (surface shown) | Criteria turned into checks | Per-task test planning | CI or branch gating | Coverage or speed limits | Guard against weakening tests |
| --- | --- | --- | --- | --- | --- |
| [Devin](devin.md) | Prompt advice, not a product step: state success measurably; every slice needs a pass or fail check | Only as the prompt asks | Bound by the same branch protections as a person; no checks named | Coverage only as prompt examples; nothing enforced | Not documented; closest is a prompt saying existing tests must still pass |
| [Factory](factory.md) | Each feature carries validation criteria; how they map to tests not documented | Milestones set how often validation runs; per-feature test lists not documented | Not documented for Missions | Cost floor and a switch to turn validation off; no coverage limit | Not documented |
| [OpenHands](openhands.md) | The written objective is the check; it should name the command that must pass | Not documented | Not documented | A 10-round cap only | Not documented as a rule; the judge reads real output, which covers claims, not edited tests |
| [Cursor](cursor.md) | Not documented | Not documented | Waits for every check on the commit; whether CI is required before a PR is not documented | Not documented as limits | Not documented as a built-in; hooks could be written to do it |
| [Copilot](copilot.md) | In the task text, not automatic; no conversion into tests | Only via the task and repo instructions | Workflows wait for a person to approve and run; blocked from default branches, subject to rulesets | 59-minute cap; coverage thresholds not documented | Not documented; left to the person's review |
| [Claude Code](claude-code.md) | The person writes the condition in a goal; nothing converts it to tests | Optional plan mode; no required test list | **Other surface**: GitHub Actions not documented; Code Review is not enforced, you gate from your own CI | Coverage not documented | Advice only; no built-in protection for test files |
| **This sample** | Acceptance criteria drive the tests; fresh-context spec check rates each | Expected Tests in the task brief; a test type may be required | Branch protection requires CI status checks for every layer | Coverage reported with a threshold (warn, not block); four layers with speed budgets | Not in the files read; testing principles are judgment-only review criteria |

**Evidence and post-PR fixes**

| Product (surface shown) | Evidence shown to the person | Post-PR auto-fix |
| --- | --- | --- |
| [Devin](devin.md) | Screenshots and videos can be sent back as proof; live progress tab with command output | Yes: pushes commits for CI failures and review feedback |
| [Factory](factory.md) | Live progress log; worker terminal output, validation criteria, commits; screenshots not documented | Not documented for Missions; **other surface**: an Automation starter pushes one commit for a review comment |
| [OpenHands](openhands.md) | Command output and test results in the conversation the judge reads; the judge's verdict | Not documented |
| [Cursor](cursor.md) | Artifacts (screenshots, videos, logs) attached to the PR | CI-failure fixes on PRs it created, as in the keeps-going column |
| [Copilot](copilot.md) | Session log, commit messages, PR diff; screenshots not documented | Person-started: an `@copilot` comment, or a button on a failing job |
| [Claude Code](claude-code.md) | Advice to have Claude show test output or a screenshot; not automatic | **Other surface**: a cloud session can receive CI failures and review comments and push a fix |
| **This sample** | Requirements table, pre-ship check records, coverage table | CI fix loop; review-comment patching not read |

The "This sample" row comes from `planning/lesson3-verification/shipwright-inventory.md` (Shipwright commit `7662e5e`, read
2026-10-20; capabilities 3 to 14 and 16): our own design, not a sourced claim about anyone else. Where the inventory is silent the
cell says so.

## CROSS-CHECK

Method: `landscape/verify-grid/*.md` for the six products was parsed cell by cell. Devin and OpenHands record the grid as wide
tables (a row per surface, a column per dimension); the other four record one row per surface and dimension that has an answer,
with the absences listed in a separate "Not documented (with pages checked)" section. Each grid cell above was then compared with
its source cell. Cells are counted as **plain** (no "not documented" statement), **partial** (a "not documented" statement beside
other text; the text can be a partial answer or context, so this is a ceiling on how much is documented) or **wholly not
documented** (only that statement and its `(checked: ...)` list). The counts come from a throwaway parser over the files as of
this commit, not from a tool in the repo, so treat them as approximate to a cell or two at the margins.

### 1. Counts by product

| Product | Surfaces | Cells in the file | Plain | Partial | Wholly not documented | Not applicable | Gap bullets |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Devin | 8 | 84 | 38 | 17 | 29 | 0 | in cells |
| Factory | 15 | 50 | 31 | 19 | 0 | 0 | 9 |
| OpenHands | 17 | 124 | 63 | 27 | 31 | 3 | in cells |
| Cursor | 13 | 32 | 18 | 14 | 0 | 0 | 8 |
| Copilot | 9 | 29 | 22 | 7 | 0 | 0 | 11 |
| Claude Code | 17 | 56 | 52 | 4 | 0 | 0 | 8 |
| **All (79)** | **79** | **375** | **224** | **88** | **60** | **3** | |

The cell counts are **not comparable across products**. Devin and OpenHands put a cell in every surface and dimension and say
"not documented" where there is nothing, so they show many wholly-not-documented cells. The other four only write a row where a page
gave an answer and list the rest as gap bullets, so their "wholly" count is 0 by construction, not because they have no gaps.
Read the gap bullets as the other four products' blank cells. The Not applicable cells are all OpenHands: the "who may change code"
column on Browser session recording and Automations run view, and the post-PR auto-fix column on Confirmation policy.

By dimension (all 375 cells; "who may change code" and "headless, models" are extras that surfaced in one file each and are not part
of the 11 common dimensions):

| Dimension | Cells | Plain | Partial | Wholly not documented |
| --- | --- | --- | --- | --- |
| What runs | 51 | 40 | 11 | 0 |
| Who decides done | 48 | 33 | 14 | 1 |
| Runs the app itself | 26 | 13 | 4 | 9 |
| How it keeps going | 36 | 20 | 16 | 0 |
| Criteria turned into checks | 27 | 18 | 8 | 1 |
| Per-task test planning | 22 | 7 | 2 | 13 |
| CI or branch gating | 29 | 12 | 10 | 7 |
| Coverage or speed limits | 28 | 18 | 5 | 5 |
| Guard against weakening tests | 26 | 6 | 10 | 10 |
| Evidence shown to the person | 40 | 33 | 5 | 2 |
| Post-PR auto-fix | 28 | 12 | 3 | 12 (+1 not applicable) |

### 2. Does every "not documented" cell name the pages checked?

Across the files, 150 cells carry a "not documented", "not stated" or "not described" statement. Most name the pages in a
`(checked: ...)`, `(same pages)` or `(<page> read in full)` form. Cells where the statement itself names no page:

- Factory, Mission, "what runs": "which exact commands run is not named", no pages in the cell. The gap bullet names the six Missions
  pages.
- Factory, Mission, "how it keeps going": the retry limit's value "is not documented", no pages in the cell. Same six pages in the
  gap bullet.
- Factory, Automation, "post-PR auto-fix": which starter uses the "checks completed" trigger "is not stated", no pages in the cell.
- Factory, Security review, "what runs": detail and any auto-fix "are not documented on the page", with "(summary)" only.
- Cursor, Cloud agent, "who decides done" ("Not stated as a gate") and "coverage or speed limits" ("Not documented as limits"): no
  pages in either cell. The gap bullets name cloud-agent, capabilities and best-practices.
- Cursor, Agent Review, "who decides done": "Not stated", no pages.
- OpenHands, Issue to PR automation, "what runs": which framework and what happens on a failure "are not stated", no pages in the cell.
- OpenHands, Headless mode and Agent-driven daily workflow, "how it keeps going"; Browser session recording and Automations run view,
  "post-PR auto-fix": "Not documented" with no pages.
- Copilot, Copilot CLI, "how it keeps going": "No guidance on CI failures or failing tests: not documented there", no pages.

Thirteen cells in total. For the four long-format products most of these are also covered by a gap bullet that names pages (for
example Factory's Missions pages, Cursor's cloud-agent pages); the Factory Security review and Automation cells and the Cursor Agent
Review "who decides done" cell have no bullet that obviously matches. None changes an answer; the fix is to add a `(checked: ...)`
list to those cells in `factory.md`, `cursor.md`, `openhands.md` and `copilot.md`.

### 3. Does the grid above match the per-product files?

Every cell in the three tables above was read against the source cell it points to. Findings, none of which changes a product file's
answer:

- **Labels that the product files do not bold.** "Who decides done" is **Human** for Devin and **Automated** for OpenHands in the
  files. For Factory (Mission), Copilot and the Claude Code and Cursor cells the files describe who decides without one of the three
  labels. The grid applies **Human** to Copilot ("The person") because the cell says so in those words; the product files
  themselves do not use the label there. Factory, Cursor and Claude Code are left without a label because the cell does not name a
  decider (Factory's docs do not say who declares a Mission done).
- **Claude Code's interactive session is the only shown surface with four dimensions answered from other surfaces** (runs the app,
  keeps going, CI gating, post-PR fix). The grid marks each **Other surface**. The file itself has no row for the interactive session
  on those four.
- **Devin's Testing mode is a different surface from the one shown.** Its test plan, recorded video and "Test the app" gate sit on
  that row, not on the cloud-session self-check, so they are not counted in the shown-surface totals below.
- **Single-sourced figure.** `claude-code.md` now gives the `Stop` hook's consecutive-block cap as eight, from the hooks guide only;
  the earlier "five" read was not reproduced on any page and was dropped.
- **Copilot's `agentStop`.** `copilot.md` notes the cloud-agent hooks how-to has no `agentStop` event while the hooks reference does.
  The grid does not use the hook.
- **OpenHands `/goal`.** The `/goal` command from the 2026-10-13 field-grid notes was not re-confirmed and is not used; the goal loop
  row is the SDK `run_goal`.
- **Source-quality caveat applies to all six.** Every file says its fetch tool returned a condensed extraction, not raw page text, so a
  "not documented" is "the extraction did not mention it". Devin and OpenHands say this in their Method; Factory, Cursor, Copilot and
  Claude Code mark thinly returned pages "(summary)".

### 4. Blanks against the docs index

Playbook rule: flag any blank for a product whose index lists a relevant page. Each file's "Ruled out (why)" list was read against
its blanks. Findings:

- **Devin: release notes and CLI changelog not searched.** `devin.md` says they "might mention newer verify features". Flagged for
  re-check before the lesson says a Devin capability is absent. Its other ruled-out pages (Code Scans, Guardrails, Environment, the
  other SCM integrations, Stacked PRs) are product areas that plausibly hold gating detail the grid lacks: the file says whether the
  non-GitHub SCM pages describe branch gating "was not checked".
- **OpenHands: release notes and the Agent Canvas changelog not searched.** Same flag.
- **Factory: `api-reference/automations-ci` was not read.** `factory.md` rules it out as a programmatic wrapper and says it "might add
  Ticket to PR detail" and is the first page to read if that gap matters. The grid marks Factory's post-PR fix "not documented" for
  Missions, so this is flagged for re-check.
- **Copilot: the MCP customization page returned 404** (`extend-cloud-agent-with-mcp`, not retried). MCP-provided browser tools were not checked, which bears directly on the
  "runs the app itself" blank. Flagged for re-check.
- **Claude Code: changelog not searched.** `claude-code.md` says "whats-new and changelog" were not searched for verification changes.
  Flagged for re-check.
- **Cursor and Claude Code: no other ruled-out page plausibly fills a blank.** Cursor's list is conventions, planning, APIs, sandbox,
  billing and help pages; Claude Code's is security scanning, scheduling, permissions, other hosts and administration. Claude Code's
  Chrome and Computer use pages were read, not ruled out.

### 5. Counts on the surfaces shown

Counts are "N of 6" shown surfaces only (the table above), judged from the cells. They do not describe every surface of a product.

| Dimension | Count on the shown surfaces |
| --- | --- |
| Product picks the exact check commands | **0 of 6**: all six leave the commands to the prompt, repo instructions or project (Factory: "follows the project") |
| Product runs the app itself | **2 of 6** built in (Factory, Cursor); 1 when the prompt asks (Devin); 1 on another surface (Claude Code); 2 not described (OpenHands, Copilot) |
| Who decides done | **Human** 2 (Devin, Copilot); **Automated** 1 (OpenHands); no gate stated 3 (Factory, Cursor, Claude Code) |
| A loop with a stated numeric cap | **2 of 6** (OpenHands, 10 rounds; Cursor, 10 CI follow-ups); Devin and Factory loop with no cap value; Copilot not documented; Claude Code on another surface |
| Criteria turned into checks by the product | **0 of 6**; the written objective or per-feature criteria are the check in 2 (OpenHands, Factory) |
| Product-made per-task test plan | **0 of 6** on the shown surfaces (Devin's separate Testing mode writes one) |
| Coverage threshold enforced by the product | **0 of 6** |
| Guard against weakening tests | **0 of 6**; none of the 79 surfaces documents a built-in guard for test files either |
| Visual evidence attached for the person | **2 of 6** (Devin can send screenshots and video back; Cursor attaches artifacts to the PR); the other four give logs or advice |
| Post-PR fix without a person asking | **2 of 6** (Devin, Cursor); Copilot is person-started; Factory and Claude Code on another surface; OpenHands none |

## Observations

"Common", "uneven" and "rare" are judgements over the counts above. Facts are the product files'.

| Dimension | Verdict | Notes |
| --- | --- | --- |
| What runs | **Same**: the project's own checks | All six run what the prompt, repo files or project name; none ships a fixed test, lint and typecheck set. Factory's validators and OpenHands' judge are the only built-in verifiers. |
| Who decides done | **Differs**; three labels do not cover it | Two products say a person; one says a machine decides; three have no stated gate. In Claude Code's interactive session the agent decides by default, which none of the three labels names. |
| Runs the app itself | **Uneven** | Built in on 2 of 6 shown surfaces; the others leave it to the prompt, another surface or say nothing. |
| How it keeps going | **Differs** | Loops exist everywhere but one, with a cap value in two shown surfaces. Claude Code's loop lives on other surfaces. |
| Criteria turned into checks | **Mostly the person's job** | 0 of 6 convert automatically; the closest are written objectives (OpenHands) and per-feature validation criteria (Factory). |
| Per-task test planning | **Rare** | 13 of 22 cells are wholly not documented; Devin's Testing mode is the one product-made test plan. |
| CI or branch gating | **Mostly the repository's**, not the product's | Devin and Copilot say repo rules bind the agent; Cursor waits on checks; nobody on the shown surfaces documents requiring a check before the PR opens. |
| Coverage or speed limits | **Rare** | 0 of 6 enforce coverage; the limits that exist bound rounds, time or cost. |
| Guard against weakening tests | **Absent** | 0 of 6 shown and none of 79 surfaces document a built-in guard. Near-misses: a Claude Code `/goal` constraint the person writes, hooks that could deny edits (Cursor, Copilot), OpenHands' role split where the QA agent cannot edit code. |
| Evidence shown to the person | **Common as logs, rare as video** | Logs or diffs are everywhere; screenshots or video are attached by 2 of 6. |
| Post-PR auto-fix | **Differs** | Two shown surfaces fix on their own; the rest need a person or another surface. |

For the lesson, against the "This sample" row:

- **Expected on a shown surface (5 or 6 of 6):** the project's own checks run before done, and logs or a diff reach the person. The
  sample does both.
- **Documented by two or fewer:** product-run app checks, a numeric loop cap, visual evidence, post-PR fixes with no person asking.
  The sample has a capped CI fix loop (6) and a post-deploy app check, but no pre-merge app run.
- **Documented by none of the shown surfaces:** converting criteria into checks automatically, a product-made test plan, a coverage
  threshold the product enforces, a guard against weakening tests. The sample has a spec check and a coverage warning but no guard
  either (not in the inventory files); that is a statement about what these docs say, not about what the products can do.
- **Handle with care:** "Human" and "Automated" are not the only answers. The lesson should not present them as a complete scale.

## Product files

- [Devin](devin.md)
- [Factory](factory.md)
- [OpenHands](openhands.md)
- [Cursor](cursor.md)
- [Copilot](copilot.md)
- [Claude Code](claude-code.md)
