# Shipwright verification inventory

Internal management doc. Input to the lesson 3 priorities. Not published in the lesson.

## Provenance

- Repo: `app-vitals/shipwright`
- **Commit SHA read at: `7662e5efbc5db231691ba720986c453a3ba398ef`** (2026-10-20, `chore(chart): bump chart version to 1.26.45 (#4408)`)
- Read from a fresh `git pull` of `repos/shipwright` at that SHA. Paths are under `plugins/shipwright/`. Files read, cited below by short name with line numbers:
  - `commands/dev-task.md` (1376 lines) — **DT**
  - `references/dev-task-lean/pre-ship-checks.md` (34 lines) — **PSC** (the lean variant of DT Step 8)
  - `references/required-steps/dev-task.json` (67 lines) — **RS**
  - `skills/speed-budgets/SKILL.md` (176 lines) — **SB**
  - `skills/canary-execution/SKILL.md` (110 lines) — **CE**
  - `skills/repo-config/SKILL.md` (217 lines) — **RC**
  - `skills/test-readiness/SKILL.md` (297 lines) — **TR**
  - `references/principles.md` (546 lines), testing entries `t1`-`t10` only (L440-L546) — **PR**
- Scope: these files only. The `test-inventory`, `test-design`, `test-migration`, `test-roadmap`, `test-fix` phase skills, the `review` command, `deploy-canary-promote.md` and the CI workflows were not read. Anything described as absent is absent from these files, not necessarily from Shipwright.
- The review stage (a separate lesson) and release/canary mechanics are out of scope except where the verification files describe them.

## How to read the "why" column

- **documented** — the source states the reason itself. The source location is given.
- **inferred** — the source states the behavior but not the reason. The reason is my reading, not Shipwright's claim. Do not repeat it as fact.

## Capabilities

### 1. Failing-test-first (TDD) gate
- **What:** the implementation subagent must write failing tests before any production code, confirm they fail, make them pass, refactor with tests green. Expected Tests in the task brief are the starting point.
- **Source:** DT L481, L545, L575-L598.
- **Why:** *partly documented.* The rule is stated twice ("No production code is written before a failing test exists", L481). The RED step carries its own reason: "A test passing immediately means it is testing existing behavior or is incorrectly written" (L580). The broader reason for TDD is *inferred* (the test is a check that existed before the code could bias it).
- **Note:** it is the only hard block in the pipeline: "only Step 5's TDD red-green-refactor gate is a real block" (DT L883, L990).

### 2. Acceptance criteria drive the tests
- **What:** the subagent writes "tests covering each acceptance criterion"; every task is queued with 2-5 testable criteria (planning side). If a Test Type is specified, a test of that type must exist and pass.
- **Source:** DT L578 (RED step 3), L598 (validation step 3).
- **Why:** *inferred.* The file states the instruction, not the purpose. The reading: criteria are the contract, tests are how a machine checks it.

### 3. Local validation run before commit
- **What:** inside the implementation subagent, run the repo's validate command, fix errors, then commit.
- **Source:** DT L595-L598.
- **Why:** *inferred.* Nothing says why it runs here and again in Step 8. Likely reason: the subagent's own context is the cheapest place to fix a failure.

### 4. Fresh-context spec compliance check
- **What:** a separate `general-purpose` subagent on `haiku` gets only the acceptance criteria and `git diff main...HEAD` and rates each criterion MET / PARTIAL / NOT MET. Anything but MET goes back to the implementer; the loop repeats until all are MET.
- **Source:** DT Step 6.5 (L748-L796); RS step 6.5 marks it mandatory with an agent-dispatch proof.
- **Why:** *partly documented.* "This is an independent review — the subagent has no knowledge of implementation decisions" (L750). Why it runs on the cheapest model is also stated: "a lightweight structured review that must block until it finishes" (L752). That independence beats self-grading is the stated mechanism; the failure mode it prevents is not named (*inferred:* the builder marking its own work done).

### 5. Requirements verification table
- **What:** the main agent rates each criterion against the diff as MET, PARTIAL, NOT MET or UNVERIFIABLE (for things like "feels snappy"), prints a table, and tallies counts. PARTIAL or NOT MET after the fix loop sets the task to `blocked` with `requirements_not_met`.
- **Source:** DT Step 7 (L798-L841).
- **Why:** *inferred.* UNVERIFIABLE is a documented status (L809) but the file does not explain why a second check follows Step 6.5. It reads as a recorded, countable verdict that feeds the handoff metrics (L826-L832).
- **Note:** this is a diff-reading check, not a run. Nothing here executes the code.

### 6. Pre-ship checks, run locally and recorded
- **What:** install, lint (scoped to changed files when a `lintScoped` command is cached), typecheck, the default test command, then every extra test layer, each with a 10-minute timeout. Every outcome (`ran_passed`, `ran_failed`, `skipped`, `timed_out`) is POSTed to the task store `/verification-checks` with an optional reason category.
- **Source:** DT Step 8 (L843-L991), "Run and Record Verifications" (L871-L927); PSC.
- **Why:** *partly documented.* "Verifications are crucial to ensuring your work is valid" (L873). Recording passes as well as failures is required but its purpose is *inferred* (history that the learned-skip rule reads, #7). Scoped lint's reason is *inferred* (speed).

### 7. Learned skip
- **What:** before a check runs, the last two records for that repo and check name are fetched. If both are `skipped` or `timed_out`, the check is skipped locally and recorded as `learned_skip`.
- **Source:** DT L906-L916 (also in the subagent brief, L626); PSC "Learned skip".
- **Why:** *inferred.* The file gives the rule only. Reading: stop paying a 10-minute timeout for a check that never finishes in this environment.

### 8. Failures never block the push; CI is the arbiter
- **What:** a failed, timed-out or skipped local check does not stop the pipeline. Local failures go on to the push and the CI gate.
- **Source:** DT L882-L884, L987-L991; PSC; RS marks step 8 as mandatory but only "partial" measurable.
- **Why:** *documented.* "let the CI Gate (Step 9b) be the real arbiter against CI's unrestricted environment" (L990). Tied to the environment: the agent's sandbox often lacks tools or secrets (the reason categories at L891-L893).
- **Caveat for the lesson:** this is a deliberate softening. The local run is a fast signal, not a gate.

### 9. Coverage measurement and threshold
- **What:** coverage is run for each changed package and reported in a table. Threshold comes from the planning doc (default 90%). Below threshold: warn and continue. `coverage_before`, `coverage_after` and `coverage_delta` are recorded and written to the task.
- **Source:** DT "Coverage Gate" (L929-L959); PSC "Coverage".
- **Why:** *partly documented.* "Do NOT silently skip this check" (L959). The reason for the 90% default is not stated (*inferred:* a conventional high bar). The warn-and-proceed behavior matches #8.
- **Note:** despite the heading "Gate", the local coverage check never blocks. The blocking version is the branch-protection coverage check (#13).

### 10. CI gate with a bounded fix loop
- **What:** after the PR opens, poll the GitHub Actions API every 30 s for 10 minutes. Judge only the latest run per workflow. A merge conflict (`DIRTY`) or any non-success run starts a fix loop: a fresh subagent gets the failure logs and what earlier attempts tried, up to 6 attempts. If still failing, the task is `blocked` with `ci_max_retries_exhausted`. If no CI runs appear within 60 s, the gate is skipped.
- **Source:** DT Step 9b (L1158-L1336). RS lists 9b as non-mandatory (it only fires on failure).
- **Why:** *partly documented.* Latest-run-per-workflow is explained: "to match the behavior of `gh pr checks`" (L1216-L1217). The polling-via-loop rule is documented with an incident (AGH-1.1: a scheduled wakeup silently failed and left a green PR unrecorded, L858 and L1199). Each fix attempt is told "do NOT repeat" earlier attempts (L1287); the cap is set at L1256, so the retry cap of 6 is bounded by design; why 6 is *inferred*.
- **Note:** agent tokens cannot use the Checks API, so the loop uses Actions runs (L1182).

### 11. Required-step list with proof signals
- **What:** a machine-readable list of the mandatory dev-task steps, each with a `proofOfRunning` signal (an agent dispatch, a printed table, a command run) and a `measurable` flag. Steps 6 and 7 are marked "marker needed; unmeasured at first".
- **Source:** RS (whole file); the lean variant of dev-task lists a **Proof:** line per step.
- **Why:** *inferred.* The file defines the list, not its purpose. Reading: let a reviewer or tool tell whether a step actually ran or was silently skipped. The "unmeasured at first" entries admit that two steps cannot yet be proven.

### 12. Test layers and speed budgets
- **What:** four layers with default budgets (95th percentile / hard cap / suite): unit <50 ms / <200 ms / <30 s; integration <2 s / <10 s / <3 min; smoke <5 s / <15 s / <30-60 s; E2E <30 s / <90 s / <10 min; full PR pipeline <15 min; canary suite <60 s. A repo may tighten, never loosen. The cap is enforced by per-layer `timeout-minutes` (suite target x 1.5) and the runner's per-test timeout.
- **Source:** SB L13-L24, L125-L169.
- **Why:** *documented.* "Slow tests are not run; tests not run are not coverage" (L11). Speed = trust: pipeline over 20 minutes "engineers route around it", and an agent needs "a verdict in seconds, not minutes" (L30-L39). The hard cap is a guillotine because runtime reveals the real layer: a 200 ms+ "unit" test is "integration in disguise" (L45). Principle `t6_layer_speed_mismatch` (PR L495) is the cited source of truth.
- **Note:** a per-test timeout failure is "a mis-layered test signal, not a flakiness signal", so the fix is to move the test, not raise the cap (SB L169, L176).
- **Status:** these budgets belong to the **test-readiness pipeline**, which designs a repo's test system. Nothing in DT reads them during a normal task.

### 13. Branch protection makes CI a real gate
- **What:** for `main`: pull request required, required status checks for every layer-relevant CI job. Deliberately **off**: required reviews (0), enforce-admins, up-to-date-before-merge, conversation resolution. The coverage check has a 3-stage lifecycle: job lands (signal only), then "coverage must not decrease" required immediately, then a hard 90% required once the repo reaches it. A repo already at 90% skips straight to stage 3. Canary is never a merge check.
- **Source:** RC L19-L39, L82-L119, L210-L212.
- **Why:** *documented.* "The audit's verification commands are only meaningful if `main` cannot be merged unless they pass" (L11). "Without enforcement, the audit is a social contract. Engineers WILL bypass it under deadline pressure" (L210). Each "off" setting has its own stated reason: required reviews cannot be satisfied because GitHub rejects self-approval (L37); canary is excluded because it needs a deployed env and gating merge on it would deadlock (L211). The coverage lifecycle exists because jumping to a hard 90% "would instantly break every repo currently below that floor" (L102).
- **Pairing rule:** every task that adds a CI workflow must be paired with a task that makes it required, landed after the workflow has run green on main for a few days (RC L84-L94).

### 14. Canary suite as a post-deploy gate
- **What:** a small suite (smoke and E2E, critical/high-tier flows only) that runs against a deployed `TEST_TARGET_URL` through its own entry point, under 60 s. Tests read-only or clean up after themselves. A failing canary blocks promotion to production, not merge.
- **Source:** CE (whole file, key rules L17-L59); RC L51-L57 (deploy hooks).
- **Why:** *documented.* A 60 s budget because "anything slower is not run on every deploy and therefore not actually a gate" (CE L48). Separate entry point because reusing `test:smoke` boots local dependencies (CE L19, L109). Canary-only auth because it "proves the deployment's auth wiring works" (CE L106). Safety rules come from `t7_canary_safety` (PR L505).
- **Note:** this is release verification, not per-task verification. The lesson should treat it as a destination (see out-of-scope list in PLAN.md).

### 15. Canary safety lint
- **What:** before a test is promoted to the canary suite, grep for write patterns (`.create`, `POST`, `DELETE`, ...) and classify each hit as setup-only with teardown in `try/finally`, canary-scoped, or unsafe. Any unsafe hit sends the test to `rebuild`.
- **Source:** CE L61-L94.
- **Why:** *documented.* "stating the rule doesn't enforce it" (CE L63). A grep is a mechanical check on a prose rule.

### 16. Testing principles used as review criteria
- **What:** ten testing rules, all judgment-only (not machine-scanned): no global mocking (`t1`), inject a clock (`t2`), recorded fixtures for external clients (`t3`), no duplicate coverage across layers (`t5`), layer/speed match (`t6`), canary safety (`t7`), layer-encoding file names (`t8`), new services wired into canary (`t9`), and untested critical logic (`t10`: auth, payment, data mutation and error paths must land with a test in the same PR). `t4` was moved to the architecture domain.
- **Source:** PR L440-L546.
- **Why:** *partly documented.* Individual reasons are given in each entry: global mocks "leak" into sibling suites in the same Bun process (`t1`); raw `new Date()` "make[s] snapshots and time-sensitive assertions flaky" (`t2`); misnamed files "may be excluded from the test run or the coverage report" (`t8`). That they are judgment-only and read by the code reviewer, rather than scanned, is stated (L440-L446).

### 17. Test-readiness pipeline (destination)
- **What:** a daily cron runs five phases per repo in order: inventory, design, migration, roadmap, fix. The last turns the roadmap into task-store tasks. Phases start from the first stale artifact, or all run with `--full`. Output lands as a docs PR.
- **Source:** TR L14-L36, L194-L212, L288-L297.
- **Why:** *partly documented.* The cron-facing purpose is stated: "Drive the complete test-readiness pipeline from the first stale phase to publication" (L16). The staleness guard exists so it "exits early for a repo when all of its phase artifacts are fresh" (L8-L9). Why daily is *inferred* (artifacts drift as the repo changes).
- **Note:** it designs and queues test work. It does not run tests itself. Capabilities #12-#15 are its contracts.

## Gaps

What Shipwright's verification files do not mention. First-hand observations only: each gap is an absence in the pinned files.

**Method used to verify absence:** case-insensitive `grep -c` of the term against `commands/dev-task.md`, the `references/dev-task-lean/*.md` files, and the four skill files above at `7662e5e`; a count of 0 across all means the files never mention it. Where a term appears, I read the hit and noted it. Absence from these files does not prove absence from the plugin.

| # | Gap | How verified absent |
|---|-----|---------------------|
| 1 | No instruction to run the app and look at it. Verification is test commands and diff reading. DT mentions Playwright only as an example test command (L236, L869). | `run the app`: 1 hit in DT, the unrelated "run the appropriate add command" (L463). `screenshot`, `visual`, `lighthouse`: 0 hits. |
| 2 | No rule against weakening or deleting a test to get green. The nearest rules are "don't raise the timeout cap" (SB L169) and the TDD red-step check. | `weaken`: 0 hits in all files. |
| 3 | No test-quality measurement beyond coverage: no mutation testing, no flake detection or quarantine. | `mutation`: 0 hits. `flak`: 0 hits in DT and lean files; 4 hits in skills, all about network flake, parallelism or the `consolidation-scan` retry example (RC L178, L216; SB L56, L169). |
| 4 | Local checks never block; only CI and branch protection do. If the repo has no required checks configured, a red local run or a red CI run does not stop a merge by itself. | DT L882-L884, L987-L991; RC branch protection is a recommendation emitted by the pipeline (L19-L39), not applied by DT. |
| 5 | Step 7 and Step 6.5 both judge criteria from the diff only, never from a run. A criterion about behavior can be rated MET on code that is never executed. | DT L798-L841 and L748-L796: inputs are the criteria and `git diff main...HEAD` only. |
| 6 | The speed budgets, canary contract, and testing principles are consumed by the test-readiness pipeline, not by DT's Step 8. DT does not check a new test's runtime or layer. | `speed`, `budget` in DT: no reference to SB. (DT's only budget is the 10-minute check timeout, L880.) |
| 7 | Coverage threshold default of 90% has no stated reason, and coverage is measured but the local result never blocks. | DT L949, L957. |
| 8 | Steps 6 and 7 have no proof signal yet. | RS: "marker needed; unmeasured at first" (both). |

Not a gap, to avoid a false claim: the `review` stage also verifies PRs. It was not read, so its verification behavior is out of scope here.
