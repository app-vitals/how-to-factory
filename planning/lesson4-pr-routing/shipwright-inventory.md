# Shipwright PR routing inventory

Internal management doc. Input to the lesson 4 priorities. Not published in the lesson.

Model: `planning/lesson3-verification/shipwright-inventory.md`.

## Provenance

- Repo: `app-vitals/shipwright`
- **Commit SHA read at: `881c455fc18e15a35ab77025f7a361fd477ee002`** (2026-10-27, `chore(chart): bump chart version to 1.32.1 (#4655)`)
- Read from a fresh clone at that SHA. Files read, cited below by short name with line numbers:
  - `agent/src/coding/loop-orchestrator.ts` (2548 lines) — **LO**
  - `agent/src/coding/work-selector.ts` (214 lines) — **WS**
  - `agent/src/coding/check-review.ts` — **CR** (candidate rules, L496-L720)
  - `agent/src/coding/check-patch.ts` — **CP** (candidate rules, L400-L700)
  - `agent/src/coding/check-dev-task.ts` (header only) — **CD**
  - `agent/src/coding/check-helpers.ts` (L920-L1030, block and auto-clear) — **CH**
  - `agent/src/coding/patch-outcome-check.ts` (L1-L45) — **POC**
  - `task-store/src/pull-request-service.ts` (L120-L145, thresholds) — **PRS**
  - `plugins/shipwright/commands/review.md` — **RV** (policy defaults L60-L100, commit tracking L546, L1375-L1384)
  - `plugins/shipwright/commands/patch.md` — **PT** (Step 2.5 DIRTY L307, Step 5a.7 second-round escalation L1229-L1354, cancelled-CI rerun L2079)
- Scope: these files only, and only the parts listed. Anything described as absent is absent from these parts, not necessarily from Shipwright. The merge/deploy phase (`check-deploy.ts`) was not read. `dev-task` internals are lesson 3.

## How to read the columns

- **why: documented** — a source comment or doc states the reason. The location is given.
- **why: inferred** — the source states the behavior, not the reason. The reason is my reading. Do not repeat it as Shipwright's claim.
- **Tier** — for a *simple* loop (one agent, a few repos): **expected** (every loop has it), **common** (most loops grow it), **crucial** (without it the loop breaks or does damage).

## Capabilities

### 1. One tick, one winner, drain until dry
- **What:** each tick collects candidates from every enabled phase, picks exactly one item, claims it, dispatches the matching one-shot command with the item id in the prompt, then repeats at once until nothing is selected. A dispatch that throws is skipped for the tick; the drain continues.
- **Source:** LO header L1-L60; selection L2052; throw isolation L2186-L2250.
- **Why:** *documented.* A throwing or timing-out dispatch must not "stall unrelated review/patch/deploy work" (LO throw-isolation comment). Drain-until-dry means work does not wait for the next cron tick.
- **Tier:** expected.

### 2. Candidate providers per phase
- **What:** each phase has a function that returns the full list of things it could act on, not just the first. Dev-task returns ready tasks; review returns open PRs needing review; patch returns PRs needing a fix; deploy returns approved PRs. The orchestrator merges them.
- **Source:** CD header L1-L22; CR header L1-L40; CP header L1-L24; LO L1972, L2026.
- **Why:** *documented.* "The selector needs the whole candidate set to pick the globally-oldest ready item" (CR, CP, CD headers).
- **Tier:** expected.

### 3. Per-phase on/off toggles
- **What:** five independent switches (dev-task, plan, review, patch, deploy) read every iteration. Deploy is opt-in. Plan is additionally behind an environment kill switch.
- **Source:** LO header L10-L16, plan gate near L1979; workspace instructions say review/patch are on by default.
- **Why:** *partly documented.* The kill switch reason is not stated (*inferred:* plan writes tasks, so it is the riskiest phase to run unattended).
- **Tier:** common.

### 4. Review candidacy: which PRs get reviewed
- **What:** a PR is skipped if it is a draft, carries the `automated` label, is authored by the agent itself (unless self-review is allowed or the agent is a requested reviewer), or comes from an author not on the review allowlist. Otherwise it is a candidate unless a dedup rule (#5) excludes it.
- **Source:** CR L512-L560 (draft, label, self-review), L580-L612 (allowlist).
- **Why:** *partly documented.* Drafts and the allowlist are about not spending a review on a PR that is not ready or not trusted (*inferred*). The allowlist comment says it gates "an agent's FIRST exposure" to an author's PR (CR L580). The `automated` label reason is *inferred:* bot PRs are not reviewed.
- **Tier:** draft skip and dedup: expected. Allowlist: common. Label: common.

### 5. Review is tied to a commit
- **What:** the task-store PR record keeps `reviewedCommitSha` (the commit the review covered) and `reviewState`. A PR is not a review candidate again while a terminal review exists at its current head. A new push changes the head and re-opens candidacy. A second check reads live GitHub reviews, so a review posted from another system also counts.
- **Source:** CR L110-L117 (field and why it is separate), L373-L395 (terminal-skip, staged), L630-L670 (live dedup); RV L546.
- **Why:** *documented.* `reviewedCommitSha` is separate from the shared `commitSha` so that "patch()'s unrelated commitSha bumps ... can never masquerade as 'already reviewed at this head'" (CR L110-L115). The live check exists because the record "can't see a review posted by an agent running against a DIFFERENT task-store instance" (CR header).
- **Tier:** crucial (without a commit key the loop reviews the same PR forever or never re-reviews a changed one).

### 6. Fresh-reply exception
- **What:** a non-agent comment posted after the last review makes a reviewed PR a candidate again, even at the same head.
- **Source:** CR L630-L660 (`hasFreshNonAgentComment`).
- **Why:** *documented.* Without it a clean review would "unconditionally" hide the PR from a later human reply (CR L636-L645, "confirmed live on PR #2456").
- **Tier:** common.

### 7. Self-review handling
- **What:** by default the agent does not review PRs it authored (`allow_self_review` defaults to false). If enabled, a self-authored review is forced to a plain comment rather than an approve, and a later clean self-review supersedes an earlier one. A PR where the agent is a requested reviewer bypasses the exclusion.
- **Source:** RV policy table L84-L92; CR L548-L556; RV L1038-L1051, L1136.
- **Why:** *inferred.* The default is conservative; neither file states the reason. Lesson 3's inventory notes GitHub rejects self-approval, which is the likely mechanical reason for "forced to COMMENT". The default-off reading: a loop approving its own work is not a review.
- **Tier:** crucial in one form: a loop must not approve and merge its own PR unreviewed. The exact switch is a design choice.

### 8. Patch candidacy: findings, red CI, conflicts
- **What:** a PR the agent authored (or an allowlisted author's) is a patch candidate when any of these is true, checked in order: a real merge conflict (`DIRTY`); unaddressed review findings; failing or cancelled CI; or `BEHIND` main *and* otherwise ready to merge (approved, CI green, no findings). A rejected-finding entry in the ledger settles that trigger.
- **Source:** CP L600-L665; `isCiPatchTrigger` L403-L420; `isBehindReady` L491-L510.
- **Why:** *partly documented.* Behind-main is patch-worthy "only once otherwise ready to merge" (CP L600-L602), so a stale branch does not burn a patch cycle before it is wanted. The ledger rule exists so a finding the patch step rejected is not re-opened (*inferred* from its name).
- **Tier:** findings, red CI: expected. Conflict: common. BEHIND readiness: common.

### 9. Cancelled CI is rerun first
- **What:** a PR qualifying only because CI was cancelled (not failed) is a patch candidate, and patch tries a rerun before touching any code.
- **Source:** CP L150-L185, L653-L655; PT L2079.
- **Why:** *partly documented.* The source describes a job that hit its `timeout-minutes` and was reported by GitHub's API as `cancelled` (CP L153-L156; PT L664, L2067), so a rerun can clear it without a code change. That a rerun beats a fix commit is *inferred*.
- **Tier:** common.

### 10. Claiming before dispatch
- **What:** the selected item is claimed in the task store before the command runs (tasks via `claimTask`, PRs via `claimPr`). A 409 means another replica got it; the item is skipped for the rest of the tick. A claim that throws is skipped and logged, not fatal. Selection also skips PRs whose record is already claimed.
- **Source:** LO L2090-L2165; CP L579; claim TTL is 65 minutes (CD header L11-L13, stale-claim reaper).
- **Why:** *documented.* A clean 409 must be excluded "or an item that always loses the claim race ... starv[es] every other candidate" (LO L2124-L2133). The TTL reaper reclaims claims a crashed run left behind (CD header).
- **Tier:** crucial once more than one worker can run; common for a single worker (a stale claim still needs a reaper).

### 11. Age-based FIFO across tasks and PRs
- **What:** one ordering for all work: oldest first, tasks and PRs in the same list. No phase priority. Equal age: tasks before PRs.
- **Source:** WS `selectNextWorkItem` and `rankWorkItems`; LO header L21-L24, L2052.
- **Why:** *documented.* "Deliberately simple v1 prioritization, expected to evolve" (WS header).
- **Tier:** expected (some ordering is needed). The specific rule is a choice.

### 12. A PR inherits its task's age
- **What:** a PR candidate's age is its linked task's `createdAt`, falling back to the PR's own GitHub `createdAt` if no task is linked. The "ready for review" timestamp is deliberately not used.
- **Source:** CR L695; CP header L10-L20; CR header L28-L34.
- **Why:** *documented.* "readyForReviewAt is a necessarily-recent phase-readiness stamp, not the work item's true origination age" (CR header).
- **Tier:** common. This is the main defence against the starvation in #13.

### 13. Starvation of review and patch by a deep backlog (a gap, with a mechanism)
- **What:** there is no per-phase quota or reserved slot. Review and patch compete on age alone.
- **My reading of the code, not a Shipwright claim:** because of #12, a PR carries its task's age. Tasks planned in one batch have close creation times, so a PR from the first task of a batch is older than that batch's remaining tasks and is picked first. But an *older* backlog (planned earlier) still outranks a newer batch's PRs, so those reviews and patches wait until the older tasks are drained. Nothing bounds that wait. PRs with no linked task use GitHub's `createdAt`, which is later than their branch's task.
- **Source:** WS (no phase field in the comparison); CR L695.
- **Why:** *inferred.* WS calls it v1 and "no phase-priority bias" is on purpose (LO header L21-L24). No source says starvation was considered.
- **Tier:** a way to prevent it is crucial once the backlog is deep; for a short queue it does not matter.
- **Not verified:** I did not run a deep-backlog scenario. The claim above is from reading the comparison code.

### 14. Redispatch cooldown per PR and phase
- **What:** a PR is not re-dispatched for the same phase within 25 minutes if its commit has not changed. The key is `{pr}:{phase}`.
- **Source:** LO L706 (`PR_REDISPATCH_COOLDOWN_MS`), filter at L2033.
- **Why:** *documented.* Observed bug: "a PR was re-dispatched every 2-5 minutes for hours on an unchanged commit" (LO L677-L678). Phase-scoped because a review dispatch "was suppressing an unrelated, independent patch need" (LO cooldown comment, PRC-1.1).
- **Tier:** crucial (the loop must not re-run the same action on an unchanged PR).

### 15. Skip counting and auto-block
- **What:** each time a dispatched command reports that it did nothing, the item's skip count rises. At 3 the item is blocked and no longer selected. A block clears itself when the head commit or the latest review changes. Tagged "deferred" skips (waiting on a dependency or sibling) do not count.
- **Source:** PRS L125-L130 (`SKIP_BLOCK_THRESHOLD = 3`); CH L988-L1030 (`clearStaleSkipBlock`); LO L1351 area (deferrals not counted); spin warning at 3 same-id dispatches, LO L619.
- **Why:** *documented.* Blocks self-clear "so a PR whose head moved re-enters candidacy" (PRS L142). Counting legitimate defers "risked a false" block (LO L1351).
- **Tier:** crucial (a stuck item otherwise consumes every tick).

### 16. CI-failure streak cap
- **What:** if patch runs three times in a row against the same CI failure signature, the PR is blocked.
- **Source:** PRS L133-L141 (`CI_FAILURE_BLOCK_THRESHOLD = 3`).
- **Why:** *documented.* So the loop stops "re-dispatching CI-fix cycles that keep hitting the same failure" (PRS L134-L137).
- **Tier:** crucial (this is the cap on patch retries).

### 17. Patch no-progress escalation
- **What:** candidacy is recomputed from live state before and after every patch dispatch. If the PR is still a candidate at the same head with the same unsettled findings, the PR is blocked on the first occurrence and a human is flagged.
- **Source:** POC header L1-L12; CH L929-L935.
- **Why:** *documented.* Invariant: "every patch dispatch ends with the PR settled, changed, or escalated" (POC L7-L8). It reads live state, so it works for any exit including `[silent]` and thrown errors.
- **Tier:** crucial.

### 18. Second-round disagreement escalation
- **What:** if a reviewer re-raises a finding that the author already answered and patch already acted on, patch does not try a third time. It escalates to a human (task flag, or PR-level block when no task is linked).
- **Source:** PT Step 5a.7 L1229-L1354.
- **Why:** *documented.* The source calls repeating the same response a "false" retry (PT L1269, sentence continues on the next line); the reading is that a third identical attempt cannot succeed. Escalating on a genuine second round bounds reviewer-versus-agent ping-pong.
- **Tier:** common. A simple loop can use #16 and #17 alone.

### 19. Blocked and human-flagged work is excluded
- **What:** a PR is not a candidate for review or patch if its record is `blocked`, or its linked task is `hitl` or `blocked`. Bundles (several tasks on one branch) wait until the bundle is complete.
- **Source:** CP L579-L598 and bundle check L690-L695; CR L690-L715.
- **Why:** *documented.* Without it an escalated PR whose CI stays red "gets re-selected ... on every drain tick, indefinitely, until a human clears the flag" (CP L690 area, CBD-2.2).
- **Tier:** crucial (the other half of #15-#18).

### 20. Fail open on lookup errors
- **What:** if the task-store query for a PR record or linked task throws, the PR stays eligible. (Deploy fails closed instead.)
- **Source:** CR L560-L566; CP L566-L570, L677-L684.
- **Why:** *documented.* "a transient task-store error must not silently exclude an otherwise-qualifying PR" (CP L570). The patch comment adds that patch re-dispatch is "not consequential enough to block on an unreachable task-store."
- **Tier:** common.

### 21. Idle backoff
- **What:** after 3 consecutive ticks with no candidates, the tick skips all candidate collection (no GitHub calls) for 5 minutes. Both are env-configurable.
- **Source:** LO L635-L650.
- **Why:** *documented.* The comment ties it to avoiding GitHub and task-store calls on an empty queue (LO L628-L636).
- **Tier:** common.

### 22. Busy flag
- **What:** a tick that starts while the previous one is still draining does nothing. A drain wedged for more than 35 minutes escalates its log from warning to error.
- **Source:** LO header L5-L8; L657 (`BUSY_STALL_THRESHOLD_MS`).
- **Why:** *documented.* The 35 minutes sits above the 30-minute single-dispatch ceiling so it "never fires during normal drain overlap" (LO L645-L657).
- **Tier:** expected.

### 23. Queue snapshot for observability
- **What:** every iteration, the full ranked candidate list is reported, whether or not anything is dispatched.
- **Source:** LO L2047-L2051; LO header L60-L64.
- **Why:** *inferred.* The header says it is "deliberately" exempt from the idle-noise guard; the purpose (letting a human see the queue) is my reading.
- **Tier:** common.

## Gaps

First-hand observations only. Method: read of the files listed in Provenance, plus `grep` of the terms below in `work-selector.ts` and `loop-orchestrator.ts` at `881c455`. Absence here does not prove absence from the plugin.

| # | Gap | How verified absent |
|---|-----|---------------------|
| 1 | No quota, reserved slot, or phase weight for review and patch against a deep task backlog. The only mitigation is age inheritance (#12). | `WS` comparison uses age only; no phase field read in `selectNextWorkItem` or `compareByAge`. |
| 2 | The comparison is on ISO strings, so a candidate with an empty age (`""` when neither a task nor a GitHub date is found) sorts first. | `CR L695`: `?? ""` fallback. Whether that is reachable was not tested. |
| 3 | The review-to-patch hand-off is not a message: patch finds its work by recomputing from GitHub each tick. The loop has no queue between phases. | `CP` collects from GitHub and the ledger; no hand-off record was seen in these files. |
| 4 | Merge is not covered. A PR that is approved and green is handled by the deploy phase, which is off by default and was not read. | Out of scope; see Provenance. |

Not a gap, to avoid a false claim: the task-store skip counter and the CI-streak counter are separate mechanisms with the same threshold (3) and different triggers (#15 and #16).
