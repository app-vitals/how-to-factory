# Verification capabilities, ranked: expected, common, crucial

Internal planning doc. Input to the lesson 3 brief (VLS-1.2) and options (VLS-1.13). Not published in the lesson.

Sources, both in this repo:
- **Inventory**: `planning/lesson3-verification/shipwright-inventory.md`, read at shipwright commit `7662e5e` (cited as **Inv #n**, the numbered capability, and **Inv Gap #n** for the numbered gaps). Each Shipwright reason there is marked *documented*, *partly documented* or *inferred*; that mark is carried through below.
- **Grid**: `landscape/verify-grid/README.md` and the six product files, as of 2026-10-21 (cited as **Grid**, with the dimension or column name; **Grid §5** is the "Counts on the surfaces shown" table).

## How the three axes are rated

| Axis | Question | How it is rated |
|---|---|---|
| **Expected** | Would someone using a verification step assume it does this? | Judgement, **High / Med / Low**, from what the grid shows the products doing. Stated, not computed. |
| **Common** | How many of the six products document it? | A count, **N of 6**, on the shown surface of each product (Devin cloud session self-check, Factory Mission, OpenHands goal loop, Cursor cloud agent, Copilot cloud agent session, Claude Code interactive session). "Partly", "when the prompt asks" and "other surface" are counted separately, never rounded up. |
| **Crucial** | What breaks without it? | **High / Med / Low**, from the failure in the inventory. High only where the inventory's reason is *documented*; *partly documented* and *inferred* reasons are capped at Med and flagged. Where the inventory has no entry (Shipwright lacks it), Crucial is capped at Med and the failure is marked as an illustration. |

Reading the counts: "not documented" in the grid means the pages checked do not say so, and the fetch tool returned condensed extractions (Grid §3). It does not mean the product lacks the feature. Every N of 6 below is a statement about what the docs say. Where the grid has no dimension for a capability, Common is **0 (not a grid dimension)** and the grid cannot show it.

Tier rule used here, same as lesson 2: a capability is **Tier A (built and exercised)** when it is crucial, or expected and common; **Tier B (named, not built)** when it is real but costly to build, depends on infrastructure the lesson does not have, or belongs to another lesson. Exceptions are listed under "Kept on weaker evidence".

Stages follow the approved design in `planning/lesson3-verification/PLAN.md`: **Define**, **Run**, **Gate**.

## Baseline (not ranked)

The sample already has these from lessons 1 and 2, so they are not depth capabilities: tasks with 2 to 5 acceptance criteria, a branch per task, and an `Expected Tests` bullet in the task brief (lesson 2's per-task test line). Running the repo's validate command once before the PR is the simplest version in `docs/components.md` section 4 and is where lesson 1 stopped.

## The ranked list

Ordered by stage, then by how much the three ratings agree.

### Tier A: built and exercised

| # | Stage: capability | Expected | Common (N of 6) | Crucial | Evidence |
|---|---|---|---|---|---|
| A1 | Run: the repo's own checks before done (tests, lint, typecheck) | High | **5**; Claude Code **partly** (runs whatever the person or project names). Product picks the exact commands **0** | Med | Grid: *What runs*, Grid §5 ("Product picks the exact check commands: 0 of 6"). Inv #3, #6: "Verifications are crucial to ensuring your work is valid" is documented, but why it runs both in the subagent and again pre-ship is inferred, so Med. |
| A2 | Define: acceptance criteria become tests, written before the code | High | Criteria turned into checks by the product **0**; the written objective or per-feature criteria are the check in **2** (OpenHands, Factory). Failing-test-first **0** (not a grid dimension) | **High** | Grid: *Criteria turned into checks*. Inv #1, #2: the rule is stated twice and the RED step carries its own documented reason: "A test passing immediately means it is testing existing behavior or is incorrectly written". It is the only hard block in the pipeline (Inv #1 note). The broader reason for TDD is inferred, but the RED-step reason alone is documented, so High. |
| A3 | Define: a test line on every task | Med | Per-task test planning **0** on the shown surfaces (Devin's separate Testing mode writes a plan); 13 of 22 cells wholly not documented | Med | Grid: *Per-task test planning*. Inv #2: "If a Test Type is specified, a test of that type must exist and pass" is documented as a rule; the purpose is inferred, so Med. Carries lesson 2's hand-off (PR #146) into a check. |
| A4 | Run: never weaken a test to get green | High | **0** of 6 and none of the 79 surfaces document a built-in guard | Med | Grid: *Guard against weakening tests*, Observations ("Absent"). Inv Gap #2: Shipwright has no such rule either (`weaken`: 0 hits), so there is no documented reason to quote; Med by the cap. Failure is an illustration, see the write-up. Kept on the lesson's design, see "Kept on weaker evidence". |
| A5 | Run: a fresh-context check of the criteria against the diff | Med | A separate verifier: **2** (Factory validation workers, OpenHands judge). Who decides done: Automated **2**, Human **2**, no gate stated **2** | Med | Grid: *Who decides done*. Inv #4: "This is an independent review — the subagent has no knowledge of implementation decisions" is documented, including why it runs on the cheapest model. The failure it prevents (the builder marking its own work done) is inferred, so Med. Inv Gap #5: it judges from the diff, never from a run. |
| A6 | Run: run the app where it matters | Med | Built in **2** (Factory, Cursor); when the prompt asks **1** (Devin); other surface **1** (Claude Code); not described **2** (OpenHands, Copilot) | Med | Grid: *Runs the app itself*. Inv Gap #1: Shipwright has no instruction to run the app (0 hits for `screenshot`, `visual`, `lighthouse`). A criterion about behavior can be rated MET on code that never ran (Inv Gap #5). No documented Shipwright reason, so Med. |
| A7 | Run: a bounded loop until checks pass | High | A loop that keeps going: **4** (Devin, Factory, OpenHands, Cursor); numeric cap stated **2** (OpenHands 10 rounds, Cursor 10 CI follow-ups); Copilot not documented; Claude Code other surface | Med | Grid: *How it keeps going*, Grid §5. Inv #4, #10: spec check loops until all MET; CI fix loop up to 6 attempts, each attempt told "do NOT repeat" earlier ones (documented). Why 6 is inferred; "bounded" is by design, so Med. |
| A8 | Run: show evidence, not a claim | High | Logs or diffs reach the person **6**; visual evidence (screenshots or video) **2** (Devin, Cursor) | Med | Grid: *Evidence shown to the person*, Grid §5. Inv #5, #6: requirements table and recorded check outcomes. Purpose of recording passes as well as failures is inferred, so Med. |
| A9 | Gate: CI is the arbiter, required by branch protection | High | CI waits: Cursor waits on every check on the commit **1**; repo rules bind the agent **2** (Devin, Copilot); a product-required check before the PR **0** | **High** | Grid: *CI or branch gating* ("Mostly the repository's, not the product's"). Inv #8, #13: documented. "The audit's verification commands are only meaningful if `main` cannot be merged unless they pass"; "Without enforcement, the audit is a social contract. Engineers WILL bypass it under deadline pressure". Inv #8: local failures never block, CI "the real arbiter against CI's unrestricted environment". Inv Gap #4: with no required checks, a red run does not stop a merge. |

### Tier B: named, not built

| # | Stage: capability | Expected | Common (N of 6) | Crucial | Evidence and why not built (owner lesson) |
|---|---|---|---|---|---|
| B1 | Gate: coverage threshold that blocks (3-stage lifecycle) | Med | Enforced by the product **0** of 6 | Med | Grid: *Coverage or speed limits* ("Rare"). Inv #9, #13: the lifecycle reason is documented ("would instantly break every repo currently below that floor"), but locally Shipwright only warns, and the 90% default has no stated reason (Inv Gap #7), so Med. Needs a repo with a baseline and a CI job that has run for days. Owner: **release lesson** (component 6, where merge rights are decided); the lesson names the warn-only first stage. |
| B2 | Gate: speed budgets per test layer | Low | Limits that exist bound rounds, time or cost: **0** for per-test speed | **High** | Grid: *Coverage or speed limits*. Inv #12: documented ("Slow tests are not run; tests not run are not coverage"; a 200 ms+ "unit" test is "integration in disguise"). Inv Gap #6: nothing in dev-task reads them. They belong to the test-readiness pipeline. Owner: **test-readiness destination** (named at the end of lesson 3, not taught). High crucial but not built: needs a populated suite with four layers. |
| B3 | Gate: canary suite after deploy, with a safety lint | Low | Not a grid dimension; **0** | **High** | Inv #14, #15: documented (60 s budget "not actually a gate" if slower; "stating the rule doesn't enforce it"). Release verification, not per-task verification; needs a deployed environment the lesson does not have. Owner: **release lesson** (component 6). |
| B4 | Define: testing principles as review criteria | Low | Not a grid dimension; **0** | Med | Inv #16: partly documented; ten rules, all judgment-only, read by the code reviewer. Owner: **review lesson** (component 5). |
| B5 | Run: record every check outcome, learned skip | Low | Not a grid dimension; **0** | Low | Inv #6, #7: recording purpose and learned-skip reason both inferred, so capped at Med and rated Low (an optimization on top of A1). Needs the task store from lesson 1 plus history. Owner: **feedback and maintenance lesson** (component 8). |
| B6 | Run: required-step list with proof signals | Low | Not a grid dimension; **0** | Med | Inv #11: inferred; two steps are marked "unmeasured at first". Shipwright plumbing that tells a reviewer whether a step ran. Owner: **governance lesson** (component 7). |
| B7 | Gate: test-readiness pipeline designs the test system | Low | Not a grid dimension; **0** | Med | Inv #17: partly documented. Destination only, per `PLAN.md` out-of-scope list. Owner: **test-readiness destination** (not a lesson yet). |
| B8 | Run: measure test quality (mutation, flake handling) | Low | Not a grid dimension; **0** | Low | Inv Gap #3: Shipwright has none (`mutation`: 0 hits). No documented reason to rate higher. Owner: **feedback and maintenance lesson** (component 8). |
| B9 | Run: post-PR auto-fix without a person asking | Med | **2** (Devin, Cursor); Copilot person-started; Factory and Claude Code other surface; OpenHands none | Med | Grid: *Post-PR auto-fix*. Inv #10 is the sample's version (CI fix loop). Taught as the tail of A7 in the lesson; its own slide would pull in review comments. Owner: **review lesson** (component 5) for the review-feedback half. |

### Considered and not carried forward

| Capability | Why left out | Evidence |
|---|---|---|
| Requirements verification table as its own slide | A5 covers the independent check; the table is its record (A8). It reads the diff only, so it does not add a second kind of evidence. | Inv #5 (inferred); Inv Gap #5. |
| Local failure never blocks the push | Folded into A9. It is why the gate has to sit in CI. | Inv #8, documented. |
| Coverage report as a per-task table | Folded into B1. | Inv #9. |
| Choosing the check commands automatically | **0 of 6**; all six leave the commands to the prompt, repo files or project. A1 teaches naming them in repo instructions. | Grid §5. |

## Changes from the approved design

The approved stages (Define, Run, Gate) and the "never weaken a test" and "run the app where it matters" items are in `planning/lesson3-verification/PLAN.md`; the final list was to come from the inventory and the grid. Result of ranking:

**Tier A (nine items):** A1 to A9 above. A2 and A9 are High crucial (documented reasons). A1, A7 and A8 are expected and common. A3 to A6 are on judgement, see below.

**Moves out of the design's Tier A thinking:** coverage thresholds and speed budgets, which the design lists under Gate, are Tier B (B1, B2). B2 is High crucial but cannot be built without a populated four-layer suite, and nothing in dev-task reads it (Inv Gap #6).

**Nothing promoted to Tier A from Tier B on the evidence.** No Tier B item is both expected and common. B2 and B3 are High crucial and documented; the cost to build them is what keeps them in B.

**Kept on weaker evidence (flag for Dan):**
- **A4 never weaken a test**: 0 of 6 and Shipwright has no such rule (Inv Gap #2). Kept because the design names it in the Run stage and it is the cheapest check to build (a diff rule: no deleted or loosened assertions without a stated reason). Say "none of these docs describe one", never "no product has one". Crucial stays Med; the failure is an illustration, not a quote.
- **A3 test line on every task** and **A6 run the app**: Med crucial, with common counts of 0 and 2. Kept because the design's Define and Run stages need them. A6 is the first item to move to a walk-through if lesson time is short.
- **A5 fresh-context check**: Med crucial (failure inferred) and only 2 of 6, kept because it is the sample's answer to "done should mean something a machine checked, not the agent's say-so" (the design's one idea). Its limit (it reads the diff, not a run) is the reason A6 exists.
- **A1 and A8** have Med crucial: the Shipwright reasons are partly documented or inferred. Teach the behavior; do not quote Shipwright as the source of the reason.

**Reduced claims to carry into the lesson:**
- "Who decides done" is not a complete scale: Human 2, Automated 2, no stated gate 2 (Grid §3, §5). Do not present Human and Automated as the only options.
- "Not documented" means the extraction did not mention it (Grid §3). Grid §4 flags five re-checks before the lesson says a capability is absent: Devin and OpenHands release notes, Factory's `automations-ci` page, Copilot's MCP page (404), and Claude Code's changelog.
- The Claude Code interactive-session row answers four dimensions from other surfaces; say "other surface" when citing it.

## Tier A write-ups (ready to paste into the brief)

Each item: concept, why it exists, a concrete failure without it, what it takes to build. Failures marked **(Shipwright, documented)** are the inventory's own words. Failures marked **(illustration)** are constructed for the lesson and are not a claim about any product.

### A2. Define: acceptance criteria become tests, written before the code
- **Concept:** each acceptance criterion gets a test written first; the test is run and must fail before any production code exists.
- **Why it exists:** **(Shipwright, documented)** "A test passing immediately means it is testing existing behavior or is incorrectly written". A check written after the code can be shaped by the code.
- **Failure without it (illustration):** the agent writes the function, then a test that calls the function and asserts whatever it returned. The test passes, the criterion was never checked.
- **To build:** one rule in the task brief ("write failing tests for each criterion, run them, confirm red, then implement") and a step that records the red run. Small.

### A9. Gate: CI is the arbiter, required by branch protection
- **Concept:** local checks are a fast signal; the gate is a CI job that `main` cannot be merged without. Branch protection requires it.
- **Why it exists:** **(Shipwright, documented)** "Without enforcement, the audit is a social contract. Engineers WILL bypass it under deadline pressure." The agent's sandbox often lacks tools or secrets, so a local run is not the arbiter.
- **Failure without it (illustration):** a local lint run is skipped for a missing tool, the PR opens, and nothing stops the merge with CI red.
- **To build:** a CI workflow running the repo's validate command and one branch-protection rule requiring it. Small; a human sets the rule, the lesson shows it. Pairing rule: the workflow lands first and runs green for a few days before it is required (Inv #13).

### A1. Run: the repo's own checks before done
- **Concept:** before reporting done, run the repo's install, lint, typecheck and test commands named in repo instructions; report each outcome.
- **Why it exists:** done should mean a machine ran the checks, not that the agent said so. **(Shipwright, documented)** "Verifications are crucial to ensuring your work is valid." Why they run twice (in the subagent, then pre-ship) is inferred.
- **Failure without it (illustration):** the agent says "all green" without running anything; the first failure shows in CI.
- **To build:** list the commands in `CLAUDE.md` and tell the agent to run them. Small; this is the lesson 1 simplest version with the outcome recorded.

### A7. Run: a bounded loop until checks pass
- **Concept:** a failing check sends the agent back to fix it, with the failure log and a list of what earlier attempts tried, up to a cap; then it stops and asks.
- **Why it exists:** **(Shipwright, documented)** each fix attempt is told "do NOT repeat" earlier approaches. The cap's value (6) is inferred.
- **Failure without it (illustration):** with no cap the agent loops on a flaky test all night; with no history it makes the same fix three times.
- **To build:** a loop in the dev-task prompt with a counter and a one-line history. Small.

### A5. Run: a fresh-context check of the criteria against the diff
- **Concept:** a separate agent, given only the criteria and the diff, marks each one MET, PARTIAL or NOT MET. Anything else goes back.
- **Why it exists:** **(Shipwright, documented)** "This is an independent review — the subagent has no knowledge of implementation decisions". The failure prevented (the builder grading its own work) is inferred.
- **Failure without it (illustration):** the implementer rates its own criteria, and every one is MET.
- **To build:** one sub-agent call with a fixed prompt on a cheap model. Small. Limit: it reads the diff, not a run.

### A8. Run: show evidence, not a claim
- **Concept:** print a table of each criterion, each check and its outcome, so a person can see what ran.
- **Why it exists:** a "done" with no record cannot be told apart from a skipped step. The recording purpose is inferred.
- **Failure without it (illustration):** the PR says "tested" and the person cannot tell which checks ran.
- **To build:** a table in the PR body from the check outputs. Small.

### A3. Define: a test line on every task
- **Concept:** every task states which test proves it, and at which layer, before building starts.
- **Why it exists:** **(Shipwright, documented)** a Test Type, when set, must exist and pass. Why is inferred.
- **Failure without it (illustration):** a task with no test line ships with no test and nothing marks the gap.
- **To build:** one bullet in the task shape, from lesson 2. Small.

### A6. Run: run the app where it matters
- **Concept:** for a user-facing criterion, start the app and exercise the path; attach the output.
- **Why it exists:** a diff-reading check can rate behavior MET on code that never ran (Inv Gap #5).
- **Failure without it (illustration):** a button is wired to the wrong handler; the diff reads fine; every test mocks the handler.
- **To build:** a start script plus a prompt line. Medium: the lesson must supply the start script, as Factory's docs also require.

### A4. Run: never weaken a test to get green
- **Concept:** a failing test is fixed in the code. A test may only change with a stated reason that the criterion changed; deleting or loosening an assertion otherwise fails the check.
- **Why it exists:** no Shipwright file states this (Inv Gap #2), and none of the six products document a guard (Grid). The reason is the lesson's own.
- **Failure without it (illustration):** the loop (A7) hits a failing test, loosens the assertion, and reports green after one attempt.
- **To build:** a diff rule in the spec check: no removed or weakened assertions in test files unless the task says so. Small to state; judgement to enforce.
