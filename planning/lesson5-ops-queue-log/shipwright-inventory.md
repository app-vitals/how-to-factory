# Shipwright queue and loop-log inventory

Internal management doc. Input to the lesson 5 priorities. Not published in the lesson.

Model: `planning/lesson4-pr-routing/shipwright-inventory.md`.

## Provenance

- Repo: `app-vitals/shipwright`
- **Commit SHA read at: `7ed64d89964361f998400fc048f5d490943c7bd5`** (2026-10-29, `docs: freshness refresh (20261029) (#4665)`)
- Read from a local clone at that SHA. Files read, cited below by short name:
  - `admin/src/coding/admin-ui-queue-pages.ts` (952 lines) — **QP** (the Queue & Activity page: Upcoming and Past tables, cron-run row)
  - `agent/src/coding/work-queue-reporter.ts` (90 lines) — **WQR** (snapshot POST)
  - `agent/src/coding/work-selector.ts` — **WS** (`RankedWorkItem`, `rankWorkItems`, candidate shapes)
  - `agent/src/coding/loop-orchestrator.ts` — **LO** (header, dispatch outcome handling L1255-L1360, thresholds L619-L626, L706)
  - `agent/src/coding/loop-cron-classifier.ts` (header only) — **LCC** (phase toggles)
  - `task-store/prisma/schema.prisma` — **SCH** (`Task` L66, `TaskEvent` L178, `PullRequest` L256, `PullRequestEvent` L433)
  - `task-store/src/ready.ts` — **RDY** (what "ready" means)
  - `task-store/src/blocked-by.ts` — **BB** (`computeBlockedBy`)
  - `task-store/src/routes/tasks.ts` (list endpoint description, L382) — **TR**
  - `task-store/src/pull-request-service.ts` (`SKIP_BLOCK_THRESHOLD`, L130) — **PRS**
  - `admin/src/coding/admin-types.ts` (work-queue endpoint description, L265-L310) — **AT**
- Scope: these files only, and only the parts listed. Anything described as absent is absent from these parts, not necessarily from Shipwright.
- **Not read:** the `AgentCronRun` table definition. The admin schema file that defines it was not found in the tree (only a generated client under `admin/prisma/client/`). Cron-run fields below are taken from how QP and LO read and write them. `cronRunOutcomeLabel` (the function that turns a run into the Outcome badge) lives in a shared admin package that was not read, so the exact label set is not listed here except the five outcome filter values in QP (`posted`, `dm`, `silent`, `skipped`, `error`).
- Not run: I did not start the admin app or the loop. Nothing here was observed live.

## How to read the columns

- **why: documented** — a source comment or doc states the reason. The location is given.
- **why: inferred** — the source states the behavior, not the reason. The reason is my reading. Do not repeat it as Shipwright's claim.
- **Tier** — for a *single local agent* (one loop, a few repos, one person watching): **expected** (every loop has it), **common** (most loops grow it), **crucial** (without it you cannot tell what the factory is doing or why it is stuck).
- **Answers** — which question the capability helps answer: **why no PR** (a task has no PR yet), **why no review** (a PR has no review), **why no patch** (a PR with findings or red CI has no fix).

## Capabilities

### A. Listing the queue

#### 1. Ranked upcoming list
- **What:** the Queue & Activity page has an "Upcoming" table with columns `#`, `Type` (task or PR), `Phase` (dev-task, plan, review, patch, deploy), `Item` (id and title, linked), and `Age`. Rows are in the order the loop would pick them. An empty queue shows "Queue is empty — nothing pending."
- **Source:** QP L520-L560 (`queueRow`, table head); `RankedWorkItem` in WS L120-L125.
- **Why:** *inferred.* The page text says the snapshot appears once the loop ticks and reports its ranked queue (QP L535); the purpose (let a human see what is next without reading logs) is my reading.
- **Answers:** why no PR (is the task in the list, and how many items are ahead of it), why no review, why no patch (same, for a PR).
- **Tier:** expected.

#### 2. Age on every row
- **What:** each item carries an `age` (an ISO timestamp) and the page renders it relative to now. The ranking is oldest first.
- **Source:** WS `RankedWorkItem.age`; QP `workQueueAgeCell`; ordering per `rankWorkItems` (WS L184).
- **Why:** *inferred.* Age is the sort key, so showing it lets a reader see why one item is ahead of another. Lesson 4's inventory covers the ordering rule itself.
- **Answers:** why no review, why no patch (a PR that inherits an old task's age may sit behind older work).
- **Tier:** expected.

#### 3. Item type and phase badges
- **What:** every row says whether it is a task or a PR and which phase will act on it. The same two badges appear on the cron-run log, where the "Item" cell shows Task or PR.
- **Source:** QP L161 (phase badge styles), `ITEM_TYPE_BADGE_STYLE`, `ITEM_TYPE_LABEL`.
- **Why:** *inferred.* The code comment says the colors exist so a reader can tell a Task row from a PR row "at a glance".
- **Answers:** why no review / no patch (the phase column tells you whether the loop sees the PR as needing review, a patch, or deploy).
- **Tier:** expected.

#### 4. Linked items
- **What:** a task id links into the admin task page. A PR item (`org/repo#123`) links out to GitHub. If the id does not parse, it shows as plain text.
- **Source:** QP L28-L40 (`workItemLink`).
- **Why:** *documented.* The comment says the PR record id "isn't available in this shape", so the link goes to GitHub.
- **Answers:** all three (one click from a queue or log row to the thing itself).
- **Tier:** expected.

#### 5. Snapshot, not history
- **What:** the loop sends its full ranked list every iteration, including the last empty one. The admin API keeps one snapshot per agent and overwrites it. The POST is capped at 50 items (the oldest kept). It never throws if the POST fails.
- **Source:** LO header L57-L66 (idle iteration still reports); WQR L18-L22 (cap), L34-L48 (fire-and-forget); AT L310 ("there is no history"); `Last computed: …` line in QP L535.
- **Why:** *documented* for the empty-snapshot rule: LO calls an empty snapshot on an idle tick "itself meaningful signal". The overwrite and cap reasons are *inferred* (a status view, not an audit trail).
- **Answers:** why no PR / review / patch **right now**. It cannot answer what the queue looked like an hour ago.
- **Tier:** snapshot of the queue: crucial. Keeping history of it: not present; the cron-run log (section C) is the history.

#### 6. Fleet view with eligibility
- **What:** a merged page across agents, deduped, with two extra columns: which agents are eligible to work an item (matched on each agent's repos) and which agent queued it.
- **Source:** QP L738-L885 (`buildMergedWorkQueueRows`, `Eligible agents`, `Queued by`).
- **Why:** *inferred.* It exists because Shipwright runs several agents on shared repos.
- **Answers:** why no PR (no eligible agent for the repo).
- **Tier:** not needed for a single local agent. Listed so the lesson can say what it skips.

### B. Recording why an item is waiting

#### 7. Ready means: pending, not held, dependencies met
- **What:** a task is ready only if it is `pending`, not flagged for a human (`hitl`), not a product-spec task, has no fresh same-branch `in_progress` sibling, and every dependency is satisfied. Satisfied means the dependency is merged, done, deploying, deployed or cancelled; or on the same branch and `pr_open`/`approved`; or `pr_open` with its PR merged on GitHub. Oldest first.
- **Source:** RDY header L1-L30; TR L382 (`?ready=true`).
- **Why:** *documented* in the RDY header, which states the rules and notes the sibling guard stops two sessions working one git branch.
- **Answers:** why no PR (the task is not ready, so it is not in the queue at all).
- **Tier:** crucial. Dependencies and the hold flag are the two ways a task waits on purpose.

#### 8. Blocked-by list with a reason per entry
- **What:** for any task the store can compute every current reason it is not workable, as a list: a `hitl` hold, an explicit `blocked` status with its stored reason, or one entry per unsatisfied dependency (id and its status; an unknown id is reported as `unknown`). `?state=blocked` returns blocked tasks with these entries.
- **Source:** BB L40-L100 (`computeBlockedBy`); TR L382 (`?state=blocked`).
- **Why:** *documented.* The doc comment says it returns "all reasons why `task` is currently blocked". A task can have several at once.
- **Answers:** why no PR. This is the direct answer to that question.
- **Tier:** crucial.

#### 9. Hold flag and blocked reason on the record
- **What:** `hitl` (a human must act), `status: blocked` and `blockedReason` (free text, e.g. why it was parked), plus `blockedAt`, `note`. On a PR record: `blocked`, `blockedReason`, `blockedAt`, plus the head commit and review the block happened on.
- **Source:** SCH `Task` L66-L130 (`hitl`, `blockedReason`, `blockedAt`, `note`); SCH `PullRequest` L256-L372 (`blocked`, `blockedReason`, `blockedHeadSha`, `blockedReviewId`, `blockedAt`).
- **Why:** *documented* for the PR block-time fields (SCH comment PSL-3.1: so "block frequency and the head/review the PR was blocked on are directly queryable").
- **Answers:** why no review, why no patch (a blocked PR is excluded from both; lesson 4 inventory #19).
- **Tier:** crucial.

#### 10. Skip count with a reason, and an auto-block
- **What:** each time a dispatched command finds nothing to do (it ends `[silent]`), the item's `skipCount` and `lastSkippedAt` update. `lastSkipReason` stores why. The count only grows while the *same* reason repeats; a different reason restarts it at 1. At 3 the item is auto-blocked (hold flag plus reason), so the loop stops selecting it. A later success resets the count.
- **Source:** SCH `Task` L100-L115 (comment on `lastSkipReason`, SRB-1.1); PRS L130 (`SKIP_BLOCK_THRESHOLD = 3`); LO L1296-L1340 (record on `[silent]`, reason from the marker).
- **Why:** *documented.* The SCH comment explains the same-reason rule: a legitimate defer that changes reason each tick "never crosses the threshold on its own"; only a task repeating the identical reason three times is stuck.
- **Answers:** why no PR, why no review, why no patch (the reason text says what the command last found).
- **Tier:** crucial. Without a cap a stuck item uses every tick. See lesson 4 inventory #15.

#### 11. Skip reasons as tagged markers
- **What:** a command that decides to do nothing can say why with a machine-readable `[skip-reason:text]` marker next to `[silent]`. If it does not, the loop records the fixed text `command:no-work`. A dispatch that throws is recorded as `dispatch:runner-error`. Both end up in the cron-run record and in `lastSkipReason`.
- **Source:** LO L1310-L1330 (marker parse, fallback literal); LO L626 (`DISPATCH_ERROR_SKIP_REASON`). The dev-task command text shows the tagged forms `deferred:dependency-unsatisfied:{dep-id}` and `deferred:same-branch-sibling-busy:{branch}`.
- **Why:** *documented.* LO's comment (DBV-1.1) says the marker records "exactly why nothing happened, instead of the generic" fallback.
- **Answers:** why no PR, why no review, why no patch. A specific reason beats "no work".
- **Tier:** crucial for the reason to be useful; the fallback text alone is common.

#### 12. Attempt caps on retry loops
- **What:** three caps visible in these files. Skips: 3 (above). Same CI failure: a PR is blocked after 3 patch runs against the same failure signature (`consecutiveCiFailureCount`, `lastCiFailureSignature`). Spin detection: a warning when the same item id is dispatched 3 times in a row (`SPIN_DETECTION_THRESHOLD`).
- **Source:** SCH `PullRequest` L300-L318; LO L619; PRS L130-L141.
- **Why:** *documented.* The SCH comment says the CI cap stops "re-dispatching CI-fix cycles that keep hitting the same wall".
- **Answers:** why no patch (a PR blocked at the cap is not patched again).
- **Tier:** crucial. A cap on retries is what keeps a loop from burning money on one PR.

#### 13. Redispatch cooldown
- **What:** a PR is not dispatched again for the same phase for 25 minutes if its commit has not changed.
- **Source:** LO L706 (`PR_REDISPATCH_COOLDOWN_MS`).
- **Why:** *documented* in lesson 4 inventory #14. Listed here because it is a reason a PR is **absent** from the queue snapshot while cooling.
- **Answers:** why no review, why no patch (it was handled a few minutes ago).
- **Tier:** crucial. Note: I did not check whether the Upcoming table shows a cooling PR; it is likely just missing. *Not verified.*

#### 14. Claim, heartbeat and stale-claim recovery
- **What:** a task or PR being worked has `claimedBy`, `claimedAt` and `heartbeatAt`. Another worker sees it as taken. A claim with no heartbeat for 65 minutes is treated as stale and reset.
- **Source:** SCH `Task` L117-L122 and `PullRequest` (claim fields); RDY L9-L25 (freshness rule, 65 minute default via `DEFAULT_CLAIM_TTL_MS`).
- **Why:** *documented* in RDY (a crashed claim must not "permanently starve the rest of the bundle").
- **Answers:** why no PR (someone is on it), why no review, why no patch (a claim is in flight).
- **Tier:** common for one agent (one worker rarely collides with itself, but a crashed run leaves a claim behind), crucial with more than one.

### C. What a loop tick records

#### 15. One run row per dispatch
- **What:** each dispatch opens a run row before the command starts and completes it afterwards. The row has: start time, completion time, outcome, a `skipped` flag, `skipReason`, `error` text, token and model breakdown, the phase cron it came from, the item type and item id it targeted, and the Claude session id.
- **Source:** LO L1116-L1140 (`createRun` with phase, item type and id; `recordSessionId`); LO L1255-L1360 (`completeRun`, `skipRun`); QP L44-L95 (`CronRunItem` field list).
- **Why:** *documented* for the shape (comments on each `CronRunItem` field in QP). The purpose is *inferred*: one row per pick lets you read a tick without logs.
- **Answers:** all three. The row says which item was picked, what happened, and how long it took.
- **Tier:** crucial.

#### 16. Pick: item type and id on the run
- **What:** the run stores which task or PR the tick picked (`itemType`, `itemId`). Both are null for a tick that dispatched nothing and for runs from before this was tracked. The page shows them in an "Item" column with a link (item 4).
- **Source:** QP L60-L70 (field doc); LO L1019-L1034.
- **Why:** *documented* in the QP field comment.
- **Answers:** why no PR / review / patch (was this item ever picked, and when).
- **Tier:** crucial.

#### 17. Outcome, skip reason and error in one cell
- **What:** the Outcome badge is the run's result. Hovering shows `skipReason` if the run was skipped (even when an error is also set), else the `error` text. A "Detail" column repeats that text, truncated if long. The filter form offers five outcomes: `posted`, `dm`, `silent`, `skipped`, `error`.
- **Source:** QP L345-L360 (`badgeTitle`), L447-L460 (Detail cell), L645 (`OUTCOME_OPTIONS`).
- **Why:** *documented.* QP's comment states the priority: "skipReason wins whenever the run is skipped (even if error is also set)".
- **Answers:** why no PR / review / patch. A skipped run with a reason is the direct answer.
- **Tier:** crucial.

#### 18. Duration, with a fallback for runs that never finished
- **What:** duration is completed minus started. If the run has no completion time (it crashed or stalled), the page shows `~` plus the time from start to the last heartbeat. A "Last Heartbeat" column shows the most recent progress push, relative to now.
- **Source:** QP L377-L395 (`durationCell`, `heartbeatCell`); QP L70-L80 (`lastHeartbeatAt` doc).
- **Why:** *documented.* The `lastHeartbeatAt` comment says it is used "as a duration fallback when the run has no completedAt yet (a stalled/crashed run)".
- **Answers:** why no PR (is the run still going, or did it die).
- **Tier:** common. Duration is expected; the crash fallback is common.

#### 19. A failed dispatch is recorded, then counted
- **What:** if the dispatched command throws, the run is completed as `failed` with the error text and any partial token spend, the error goes to the error tracker with the item type and id attached, then it counts as a skip (item 10) and the error is rethrown to the tick. The tick then moves on to the next candidate.
- **Source:** LO L1255-L1305.
- **Why:** *documented* (inline comments, PHS-3.3): a deterministically crashing item should hit the skip auto-block "instead of only tripping spin detection".
- **Answers:** why no PR / review / patch (it was tried and it crashed).
- **Tier:** crucial.

#### 20. Token and model spend per run
- **What:** each run row carries a per-model cost breakdown and token counts, shown as badges and a Tokens column. A run that ends `[silent]` still records the spend, because the command may have used real tokens before finding nothing to do.
- **Source:** QP L101-L110 (`MODEL_BADGE_STYLE`), L180-L185 (Tokens, Model columns); LO L1315-L1335 (`buildTokenPayload` on skip).
- **Why:** *documented* for the skip case (LO comment: "forward that spend ... rather than dropping it").
- **Answers:** none of the three directly. It answers what a no-op tick cost.
- **Tier:** common.

#### 21. Session link per run
- **What:** a run stores the Claude session id so the exact transcript can be found. Review, patch and deploy dispatches get a fresh session key per run; dev-task uses a stable key per task id.
- **Source:** QP L84-L90 (`sessionId`); LO L1051-L1090.
- **Why:** *documented* in LO L1051-L1086 (comments on the key choice); the purpose (read what the model did) is *inferred*.
- **Answers:** all three, when the row says "skipped" or "error" but not enough. This is where you read why.
- **Tier:** common. For a local agent the equivalent is keeping the run's transcript or output file next to the log row.

#### 22. Idle ticks are visible
- **What:** a tick that finds nothing is still reported as an empty snapshot; the run log has no row for it unless a dispatch happened. A tick is also skipped while the previous one is still draining.
- **Source:** LO header L57-L66.
- **Why:** *documented.* The header says an idle tick is deliberately exempt from the idle-noise guard (the log would otherwise fill with empty rows).
- **Answers:** why no PR / review / patch (the queue was empty, or the item was not eligible).
- **Tier:** common.

#### 23. Filters and grouping on the log
- **What:** the Past section has a filter form (cron, outcome). The shipwright-loop runs show in the main table; runs from other crons are grouped in collapsed sections. Filtering to one cron skips the grouping.
- **Source:** QP L561-L660.
- **Why:** *inferred.* The code comment says grouping keeps the main table focused on the loop.
- **Answers:** none directly; makes #15 to #17 readable.
- **Tier:** common.

### D. Keeping completed work

#### 24. Task status history on the record
- **What:** a task keeps its final states: `merged`, `done`, `deploying`, `deployed`, `cancelled` are terminal in the status enum, and the record keeps `startedAt`, `prCreatedAt`, `mergedAt`, `completedAt`, `deployedAt`, `cancelledAt`, `mergeCommit`. The record is not removed when the work ends.
- **Source:** SCH `TaskStatus` L25-L36; `Task` L66-L100.
- **Why:** *inferred.* Nothing in these lines says the records are kept on purpose, but the timestamps imply an intended lookup.
- **Answers:** why no PR (the task is already merged or cancelled).
- **Tier:** expected.

#### 25. Append-only event log per task and per PR
- **What:** every field change on a task or PR is written as a row: field, old value, new value, actor (agent id or "system"), the method that wrote it, and a timestamp. Rows are only added.
- **Source:** SCH `TaskEvent` L178-L190 and its comment above; `PullRequestEvent` L433-L446.
- **Why:** *documented.* The SCH comment says it is a dedicated append-only table because a plain insert is race-safe while a JSON-array read-modify-write patch is not.
- **Answers:** all three. "Who changed the status to blocked, and when" has a stored answer.
- **Tier:** common. A local agent with one writer can use a single log file; the need grows with more than one writer.

#### 26. Execution data on the task
- **What:** per-task counters kept after the work: CI fix attempts, simplify fix counts, coverage change, effort level, token and cost totals, and the model used.
- **Source:** SCH `Task` L125-L150.
- **Why:** *inferred.* They look like inputs to a cost and quality view; the schema has no comment saying so.
- **Answers:** none of the three. Useful for "what did this cost", out of scope for lesson 5.
- **Tier:** common for cost; not needed for the three questions.

#### 27. Verification results as rows
- **What:** each verification check run before a PR is opened (install, lint, typecheck, test) is recorded with a status (`ran_passed`, `ran_failed`, `skipped`, `timed_out`) and an optional reason category. The record is linked to a task or a PR.
- **Source:** SCH `VerificationCheck` (referenced from `Task` and `PullRequest`; enum comment near L455); dev-task command text.
- **Why:** *documented* in the SCH comment (a structured successor to a printed-only "PRE-SHIP CHECKS" table).
- **Answers:** why no PR (did the checks fail, or were they skipped and why).
- **Tier:** common. Lesson 3 covers verification itself.

### E. Linking an item to its PR and task

#### 28. Task to PR link
- **What:** a task stores the PR number (`pr`), URL (`prUrl`), branch, and the time the PR was created. A task becomes `pr_open` when a PR exists.
- **Source:** SCH `Task` (`pr`, `prUrl`, `branch`, `prCreatedAt`); the dev-task command final PATCH to `pr_open`.
- **Why:** *documented* in the dev-task command text (the PATCH sets `status`, `pr`, `prCreatedAt`).
- **Answers:** why no PR (a null `pr` with status `in_progress` means it has not got that far).
- **Tier:** expected.

#### 29. PR to task link, and PR origin fields
- **What:** a PR record is keyed by repo and PR number and stores title, head branch, author, and an `origin` (where the PR came from). It does not carry a task id column in the lines read; the loop derives a PR's age from its linked task by branch (lesson 4 inventory #12).
- **Source:** SCH `PullRequest` L256-L330 (origin and metrics comment, POM-1.1); the PR age rule in CR/CP headers (lesson 4 inventory).
- **Why:** *documented* for `origin` (SCH comment). The absence of a task id column is *my reading of the lines read*; I did not search the whole schema for a relation.
- **Answers:** why no review, why no patch (which task and branch the PR belongs to).
- **Tier:** common. The link has to exist somewhere; a local agent can put the task id in the branch name.

#### 30. Run row to item and session
- **What:** a cron-run row links to its item (items 4, 16) and its session (item 21). A task or PR row links back by id to its runs only through the cron-run page filter, not through a field on the task. *Not verified:* whether the task page lists its runs.
- **Source:** QP L28-L40, L60-L90.
- **Why:** *inferred.*
- **Answers:** all three, going from a log row to the item. The reverse (item to all its runs) was not confirmed.
- **Tier:** crucial in the log-to-item direction; common in the other.

## Questions and the capabilities that answer them

| Question | First place to look | Then |
|----------|--------------------|------|
| Why no PR for a task? | Blocked-by (#8): hold flag, blocked reason, unmet dependency | Ready rules (#7); skip reason and count (#10, #11); claim (#14); verification rows (#27); run row (#15, #17) |
| Why no review for a PR? | Upcoming row and phase (#1, #3) | Blocked PR (#9); redispatch cooldown (#13); run row for that PR (#16, #17); event log (#25) |
| Why no patch for a PR? | Upcoming row and phase (#1, #3) | Attempt caps (#12); blocked PR (#9); skip reason (#10, #11); run error (#19) |

## Gaps

First-hand observations only. Method: read of the files listed in Provenance. Absence here does not prove absence from Shipwright.

| # | Gap | How verified absent |
|---|-----|---------------------|
| 1 | The Upcoming table has five columns (`#`, `Type`, `Phase`, `Item`, `Age`). It does not show *why* an item is waiting, only that it is in the order. The reason lives on the task record (#8, #9, #10), not in the queue view. | QP L541-L548 (table head). |
| 2 | Not-ready tasks (held, blocked, unmet dependency) are not in the ranked list: it is built from candidates, and the ready rules (#7) filter first. So the page cannot show "waiting on dependency X". | RDY header; WS candidate types. Inferred from how the two fit; I did not trace the dev-task candidate provider. |
| 3 | The queue snapshot is overwritten, not stored (#5). | AT L310. |
| 4 | A tick with no dispatch makes no run row (#22), so the log cannot tell "ran, found nothing" from "did not run". | LO header L57-L66 (idle is reported as a snapshot only). |
| 5 | The outcome label set, and how a run becomes `posted` or `dm` rather than `silent`, were not read. | `cronRunOutcomeLabel` lives in a package outside what was read. |

Not a gap, to avoid a false claim: the task skip counter (#10) and the PR CI-failure counter (#12) are separate mechanisms with the same threshold (3) and different triggers.
