# Shipwright review and patch inventory

Internal management doc. Input to the lesson 6 priorities. Not published in the lesson.

Model: `planning/lesson4-pr-routing/shipwright-inventory.md`. That doc stops at routing (which PR gets which phase). This one goes inside two phases: review and patch.

Shipwright is one worked example of a review and patch loop, not the standard. Other factories split, merge or rename these capabilities.

## Provenance

- Repo: `app-vitals/shipwright`
- **Commit SHA read at: `8b1d5a54c8406753d1248052de7c59098ee7539b`** (2026-11-11, `chore(chart): bump chart version to 1.32.117 (#4999)`)
- Files read, cited below by short name with line numbers at that SHA:
  - `plugins/shipwright/commands/review.md` (1875 lines) — **RV**, cited by step
  - `plugins/shipwright/commands/patch.md` (2570 lines) — **PT**, cited by step
  - `plugins/shipwright/agents/code-reviewer.md` — **CRA**
  - `plugins/shipwright/agents/finding-verifier.md` — **FV**
  - `plugins/shipwright/scripts/compute-review-verdict.ts` — **CRV**
  - `plugins/shipwright/references/post-review-guide.md` — **PRG**
  - `agent/src/coding/patch-outcome-check.ts` — **POC**
  - `agent/src/coding/check-helpers.ts` (L965-L1070) — **CH**
  - `agent/src/coding/loop-orchestrator.ts` (L1290-L1440, L1765-L1795, L2176-L2195) — **LO**
  - `task-store/src/pull-request-service.ts` (L120-L145, L858-L945, L1205-L1235) — **PRS**
  - `task-store/src/routes/tasks.ts` (L833) and `task-store/src/routes/prs.ts` (L313, L335) — **TR**, **PR-R**
- Scope: these files and the listed parts only. Anything described as absent is absent from these parts, not necessarily from Shipwright. Not read: dependency-risk handling in review (RV Step 5.8) and patch (PT Step 3a.5), the lean patch variant (`plugins/shipwright/commands/patch-lean.md`), merge/deploy, the `review-staged` command body, and patch Steps 4 (conflict resolution) and 6c to 6d (CI-fix dispatch prompt) beyond what is cited.
- The review and patch commands are prompts that an agent follows, plus a few scripts. Where a rule is enforced by a script it says so. Where it is prose, the model can drift from it, and that difference is part of the lesson.

## How to read the columns

- **why: documented** — a source comment or doc states the reason. The location is given.
- **why: inferred** — the source states the behavior, not the reason. The reason is my reading. Do not repeat it as Shipwright's claim.
- **Class** — **crucial**: without it the loop does damage or never ends. **polish**: the loop works without it, it just works worse (noisier, slower, costlier).
- **Enforced by** — script (mechanical), service (task store), or prose (the agent is told to).

## Review

### R1. Confidence-to-severity grading, post threshold, finding cap
- **What:** each candidate finding gets a 0-100 confidence. 90-100 is critical, 75-89 important, 50-74 suggestion, below 50 discarded. The policy then drops findings below `min_confidence` (default 75) and trims to `max_findings` (default 5), lowest confidence first. Defaults are used when no policy is stored.
- **Source:** RV Step 1 L87-L92 (defaults); RV Step 8 L907-L930; CRA "Confidence Scoring" L54-L64 and severity mapping L108-L113.
- **Why:** *documented in part.* "Quality over quantity" (CRA L64) and "Keep it tight. A good review has 2-5 actionable items" (RV Step 8 L921). *Inferred:* a long list of low-confidence items trains authors to ignore the review, and every item the patch step must verify costs a run.
- **Enforced by:** prose for the scoring; the threshold and cap are applied by the main agent in Step 8.
- **Class:** crucial for the threshold (an unfiltered reviewer is noise that the patch step then spends cycles disproving). Polish for the exact numbers and the cap of 5.

### R2. Severity decides blocking, not confidence directly
- **What:** after thresholds, any `important` or `critical` finding left makes the pass blocking (`currentPassHasBlockingFindings`). Suggestions alone do not block.
- **Source:** RV Step 8 L924-L930; RV "Review Quality Rules" L1866-L1867 ("APPROVE means clean").
- **Why:** *documented.* Without this input, a fresh critical finding on a PR with no prior unresolved threads "would silently compute as APPROVE" (RV Step 8 L929-L930; RV Step 10 Case 3).
- **Enforced by:** boolean fed to the verdict script (R5).
- **Class:** crucial.

### R3. Pre-existing-on-base filter
- **What:** before reporting a finding, the reviewer checks whether the same code is already on the base branch unchanged. If so the finding is dropped as out of scope.
- **Source:** CRA Shipwright rule 4 L44; CRA "Verification Before Reporting" L66-L74; RV "Review Quality Rules" L1857-L1858 (`git show origin/{base}:{file}`).
- **Why:** *inferred.* The source states the rule, not the cost. The reading: a PR author cannot be asked to fix what they did not change, and a patch step that "fixes" it widens the diff and risks the PR. Rules 6-8 (test, layering, security) each repeat the filter.
- **Enforced by:** prose in the reviewer subagent.
- **Class:** crucial for an autonomous loop (the author is also an agent that will try to satisfy every finding). Polish in a human-only flow.

### R4. Repo-rules compliance: CLAUDE.md and principles
- **What:** the reviewer is handed the root CLAUDE.md plus any CLAUDE.md in directories with changed files, and checks the diff against explicit rules. It does not flag a pattern the CLAUDE.md explicitly endorses. Three activation-gated rules (test readiness, architecture layering, security) cite a principles file: a repo-level override at `.claude/shipwright/principles.md`, else the plugin's `references/principles.md`. Layering is only checked when the repo declares layers.
- **Source:** RV Step 7 L710-L721 (inputs); CRA "Core Review Responsibilities" L25, rules 5-8 L46-L52 and the principles lookup L33-L36; RV "Review Quality Rules" L1861.
- **Why:** *documented in part.* The endorsement check exists so the reviewer does not contradict the project's own conventions (RV L1861). *Inferred:* a reviewer with no repo rules reviews against its own taste, and the activation gates keep unrelated rules from firing on every PR. The "no declared layers, no layering findings" clause (CRA L50) reads as a deliberate guard against inventing a boundary.
- **Enforced by:** prose. The input assembly is a step the agent follows.
- **Class:** crucial for the CLAUDE.md input (it is how a team's rules reach the reviewer at all). Polish for the three gated rules.

### R5. Mechanical verdict function
- **What:** the event posted to GitHub (`APPROVE` or `COMMENT`) and the `Verdict: ...` label in the body are computed by a script from three booleans: `selfReview`, `unaddressedFindings`, `currentPassHasBlockingFindings`. `event` is COMMENT when any is true. `verdictLabel` is COMMENT when either findings boolean is true, regardless of why `event` was forced.
- **Source:** CRV L18-L80 (truth table L42-L55); RV Step 10 L1180-L1213.
- **Why:** *documented.* A mislabeled clean review recurred "across different PRs", which showed "prose guidance alone was insufficient" (RV Step 10 L1227-L1234). The label is read downstream: `Verdict: APPROVE` in a self-authored review is how the patch side recognizes a clean self-approve (RV Step 10 L1215-L1225).
- **Enforced by:** script (`compute-review-verdict.ts`), called by the agent.
- **Class:** crucial. The label is a machine-readable contract between two phases.

### R6. Hard gate: unaddressed findings force COMMENT
- **What:** before the verdict, a script decides whether the PR has unaddressed findings from earlier reviews at the current head: an unresolved inline thread, or a COMMENTED/CHANGES_REQUESTED review body not excluded by one of five rules (clean self-approve, addressed by a later author reply, superseded by a later clean self-review, attested resolved in the findings ledger, thread answered by the author). This overrides the reviewer's own APPROVE.
- **Source:** RV Step 9.5 L1060-L1172; the exclusion list L1109-L1143.
- **Why:** *documented.* The definition is shared with patch's Step 3a so the two cannot drift; the earlier drift between the merge check and the patch/review checks is the cited cause (RV L1063-L1066). The ledger exclusion exists to break a deadlock: a self-authored review that said COMMENT could otherwise pin the PR at COMMENT forever, because a later review could only be clean if there were no unaddressed findings (RV L1130-L1137).
- **Enforced by:** script (`compute-unaddressed-findings.ts`); its unit tests are named as the authoritative spec (RV L1148-L1149).
- **Class:** crucial. Without it a reviewer can approve over an open thread and the merge phase proceeds.

### R7. Hard gate: label validation before posting
- **What:** after the body is built, the same script runs in validation mode. A body whose `Verdict:` label does not match the computed label, or has none, aborts the post until fixed.
- **Source:** RV Step 10.5 L1325-L1348; CRV validation entry point (header L1-L14).
- **Why:** *documented.* "A mismatch must never silently proceed to posting" (RV L1347-L1348); same incidents as R5.
- **Enforced by:** script plus an agent instruction to stop.
- **Class:** crucial where the label is consumed by another phase, polish otherwise.

### R8. Self-review limit and "request changes is never used"
- **What:** GitHub rejects approving your own PR through the API. When the PR author is the reviewing account, the event is forced to COMMENT, but the label still says APPROVE if nothing is wrong (Case 1). Separately, the review never submits `REQUEST_CHANGES`: only APPROVE or COMMENT. Self-review is off by default (`allow_self_review` false).
- **Source:** CRV L56-L57 (self-approve rejected by the API) and L47 (truth table row); RV Step 10 Case 1 L1238-L1247; RV Review Quality Rules L1865; PRG L144-L149; RV Step 1 L90.
- **Why:** *documented for both.* The label stays honest while the event is forced, so a clean self-review is not read as an unaddressed finding forever (RV L1245-L1247). On request-changes: it "blocks the PR and requires the reviewer to dismiss. COMMENT achieves the same signal without the hard block" (PRG L148-L149). *Inferred:* an automated reviewer that cannot reliably come back and dismiss would wedge PRs.
- **Enforced by:** script for the self-review override; prose for the never-request-changes rule (no code path enforces it in the files read).
- **Class:** self-review forcing: crucial (mechanical, GitHub requires it). Never-request-changes: polish as a rule, but it is a design choice every factory makes on purpose: a block that only a human or the same agent can lift.

### R9. Verifier pass drops disprovable findings
- **What:** when more than one reviewer's output was merged, a built-in verifier re-checks each merged finding against the diff and marks it unsubstantiated only with concrete evidence (code does not exist, already handled, not in changed code). Unsubstantiated findings are dropped. It cannot add findings or change severity. If it fails, the unverified merged set is kept.
- **Source:** RV Step 7 "Verify" L882-L897; FV L9-L24.
- **Why:** *inferred.* The source states the behavior. The reading: merging several reviewers raises recall and false positives together, and a cheap second look removes the ones that are plainly wrong before they cost a patch cycle. The conservative default ("a dropped real finding costs more than a kept doubtful one", FV L22) shows which error it fears more.
- **Enforced by:** prose and a fixed subagent. It does not run for a single reviewer.
- **Class:** polish. Note the asymmetry with patch (P1): the verifier is optional and one-sided, while patch always verifies before acting.

### R10. Multiple reviewers, merged and deduped
- **What:** the review phase can list up to five reviewer subagents. All run in one parallel call with the same inputs. Findings are merged before any threshold: duplicates are same file, lines within 3, and similar titles (containment or Jaccard >= 0.6), grouped transitively. The highest severity wins, confidence is the max, and the count of distinct reviewers that agreed breaks ties when trimming to the cap. A failed reviewer is retried once, then dropped. If all fail, the built-in reviewer runs, then an inline review.
- **Source:** RV Step 7 "Multiple reviewers" L818-L880; fallback chain L780-L816.
- **Why:** *inferred.* One reviewer has blind spots, so several differently-prompted reviewers widen coverage; dedup keeps the cap meaningful. The fallback chain's stated aim is that "the pipeline always produces a valid response" (RV L795-L798) so a bad override cannot leave a claim outstanding.
- **Enforced by:** prose (the merge rules are described for the agent; no merge script was read).
- **Class:** polish for multi-reviewer. The terminal fallback (some valid response always) is crucial.

### R11. Re-review with per-prior-finding attestation
- **What:** on a later pass, each earlier qualifying review (reference = full commit SHA + submit time) is passed to the reviewer, which must return one entry per prior review saying whether the issue is still present, with `file:line` or diff evidence required in both directions. Resolved attestations are written to a findings ledger. With several reviewers, an entry is resolved only if every reviewer that answered said so. The Re-Review section appends a resolution table to the review file.
- **Source:** RV Step 5 L388-L398 (collection and ref format); RV Step 7 L722-L742, ledger write L744-L778; merge rule L867-L871; CRA L117-L122; RV Step 9 Re-Review L1014-L1056.
- **Why:** *documented.* The ledger write makes the attestation durable so the hard gate (R6) sees it on this and later passes. A full SHA is required because the gate "does an exact string match" on the ref (RV L392-L394). *Inferred:* without an explicit check, a reviewer re-reviewing a new diff can silently forget what it flagged before, and the loop cannot tell fixed from forgotten.
- **Enforced by:** structured output (`priorFindingsStatus`) plus the gate script. Ledger writes are best-effort and never block posting (RV L774-L778).
- **Class:** crucial for any loop that re-reviews after a push. This is what lets a loop converge instead of re-litigating.

### R12. Claim, head-moved check, post-failure release, staged versus auto-post
- **What:**
  - **Claim:** the PR record is claimed atomically at the current head before work starts. A 409 means another agent holds it, and the run exits silently. A heartbeat is renewed before the long review phase so a stale-claim reaper does not reset it.
  - **Head-moved check:** immediately before posting, the live head is re-fetched. If it changed since claim, the review is not posted, the claim is released, and the PR is picked up fresh next pass.
  - **Post failure:** if the post fails, the claim is released and the record is not marked reviewed, because marking it would hide an unreviewed PR from future passes. The post is never re-run after a parse problem: a duplicate review cannot be deleted.
  - **Staged versus auto-post:** with `auto_post_reviews` true (default) the review is posted. With it false, the record is marked staged with the verdict and the claim is released; posting is owned only by the separate staged-review command.
  - **Live-review pre-check:** before any claim, GitHub is queried for a terminal review at the current head from any reviewer, so a review from another system also counts.
- **Source:** RV Step 4 claim L141-L175; heartbeat RV Step 5 L573-L581; RV Step 11 head-moved L1356-L1380, post failure L1397-L1410, never re-POST L1389-L1391; staged L1444-L1471; ownership L1756-L1759; RV Step 14 live pre-check L1539-L1551, pre-claim fast path L1726-L1747.
- **Why:** *documented.* Head-moved: the diff the review was built on "is no longer HEAD" (RV L1367-L1369). Post failure: marking would let the dedup "permanently hide this PR" (RV L1401-L1402). Live pre-check: the task-store record cannot see a review posted by another agent on a different store (RV L1543-L1549). Staged mode is the human-in-the-loop variant; the source gives no further reason.
- **Enforced by:** service (atomic claim, release) and prose (the freshness re-check).
- **Class:** claim: crucial (two agents must not review the same head). Head-moved: crucial (a stale review misleads and may trigger a wrong patch). Post-failure release: crucial. Staged mode: polish (it is a policy switch). Live pre-check: polish for a single-store deployment.

### R13. Defer to a human mid-conversation
- **What:** if the head has not moved and a human has open substantive feedback, review skips and records the commit as seen, so it does not talk over them. If the head has moved, this check is skipped and review runs.
- **Source:** RV Step 5 "Unresolved Comment Check" L470-L571.
- **Why:** *documented in part.* "Don't talk over them" (RV L472-L473); the new-commit override is explicit (RV L475-L479). The caveat that the skip can lapse for plain PR comments is documented (RV L553-L563).
- **Enforced by:** script (`compute-unresolved-comment-check.ts`).
- **Class:** polish.

## Patch

### P1. Verify each finding before fixing (accept, modify, reject)
- **What:** before changing code, the fix subagent reads the code each finding refers to and checks outside claims (flags, library behavior) by search. Each finding is classified ACCEPT (premise and fix both right), MODIFY (premise right, prescribed fix wrong, apply the correct one and say what changed), or REJECT (premise wrong, do not implement). Only accepted and modified findings are implemented. When the reviewer is a different login, the findings are weighted the same.
- **Source:** PT Step 5b prompt, [A.5] L1467-L1486; [B] L1488-L1494.
- **Why:** *documented.* "Reviewers can be wrong — misread code, incorrect flag semantics, bad API assumptions" (PT L1469-L1470).
- **Enforced by:** prose, inside the fix subagent's prompt.
- **Class:** crucial in a machine-to-machine loop. A fixer that obeys every finding amplifies reviewer mistakes into code.

### P2. The reject path: rebuttal and a settled record
- **What:** every REJECTed finding gets a PR comment explaining why, the matching inline threads are resolved, and a `rejected` entry is written to the findings ledger with the reason as evidence. A review with nothing actionable (for example a bot saying there is no feedback) is treated the same. The same rule covers every open item the run did not fix, not only explicit rejections. A run that fixes nothing ends settled, never silent.
- **Source:** PT [D] L1575-L1615; PT Step 5c L1692-L1722; PT Step 5c.5 ledger write L1763-L1803 (outcome "settle-with-rejected" L1788-L1794). Inline-thread refs carry a comment count so they self-expire on a new comment (PT L1697-L1700).
- **Why:** *documented.* The rebuttal lets a later run "recognize the review was addressed (rejected with reasoning, not ignored) instead of reflagging it forever" (PT L1595-L1597). Threads must be resolved too, because an unresolved inline thread counts as unaddressed regardless of any comment (PT L1599-L1602). The ledger write is what re-qualifies the PR for a fresh review of the rebuttal (PT L1796-L1798).
- **Enforced by:** prose plus the service ledger. Step 5c only verifies the subagent did both.
- **Class:** crucial. Without a settled record, a rejected finding is a permanent candidate.

### P3. Second-round disagreement escalation
- **What:** before dispatching a fix, patch looks for an earlier PR-author comment that predates the current review and judges whether it rebutted the same finding (SAME or DIFFERENT, with a written justification). If it is the same finding, patch does not rebut again or fix. It resolves all open inline threads, comments, and escalates to a human. A different finding proceeds as first round. A first-round BLOCKED report from the fix subagent also escalates, so it is not retried every tick.
- **Source:** PT Step 5a.7 L1229-L1365; BLOCKED handling PT Step 5c L1723-L1742.
- **Why:** *documented.* If the reviewer is still unconvinced after a rebuttal, "that is a genuine human-judgment deadlock, not something another automated pass will resolve" (PT L1235-L1238). The content-correlation step exists because a timestamp-only check once escalated on an unrelated earlier comment (PT L1263-L1271).
- **Enforced by:** prose. The timestamp pre-filter is cheap, the same/different judgment is the model's.
- **Class:** crucial. It is the only thing that ends a reviewer-versus-fixer argument without a round cap (see "No round cap").

### P4. CI triage
- **What:** three cases before any CI fix is attempted.
  1. **Rerun cancelled first.** If the latest run is only cancelled (no failure), rerun it, poll about two minutes, and if it comes back green skip the fix entirely. If it ends cancelled or failing again, treat it as a hang or timeout signal and collect durations for the fix prompt.
  2. **Main-red check.** If the same jobs fail on the base branch's latest run, block the PR on `main_red`, comment, and tell the human how to resume. No ledger entry is written, so an unblock re-runs.
  3. **Out-of-scope CI.** If the failure is not caused by this PR, write a `ci:{head}:{signature}` rejected entry and release the claim. A push changes the head and the entry stops matching.
  Separately, if the PR already carries a human-escalation block, CI-fix is skipped so it does not contradict it.
- **Source:** PT Step 6b.8 L2055-L2143; Step 6b.9 L2145-L2195; Step 6b.6 L1942-L2005.
- **Why:** *documented.* A cancelled run is "most often a job that hit timeout-minutes" or an outside cancellation, so "a cheap rerun is a safe, essentially no-op action" (PT L2066-L2072). Without the ledger entry the checker "re-selects the PR every tick" (PT L2171-L2172). The escalation check exists because the earlier escalation would otherwise be undone by a CI fixer (PT L1944-L1953).
- **Enforced by:** prose and the service.
- **Class:** rerun-cancelled: polish (saves a model run). Main-red: crucial (otherwise the fixer edits a PR to fix someone else's breakage). Out-of-scope entry: crucial for the same reason as P2.

### P5. Post-push CI verification with a single bonus fix
- **What:** if any push happened this cycle, patch polls CI at the final head every 30 seconds for about five minutes, evaluating only the latest run per workflow through a shared classifier. If still red, it dispatches exactly one more CI-fix subagent with fresh logs and does not poll or retry again. A BLOCKED report reuses the normal escalation.
- **Source:** PT Step 6.5 L2424-L2530 (cadence L2448-L2450, single bonus L2520-L2522).
- **Why:** *documented.* A conflict fix or finding fix "can introduce a new test failure that Step 6's own CI-fix pass never ran against" (PT L2426-L2431). "A single bonus attempt, not a new fix loop" (PT L2521-L2522).
- **Enforced by:** prose with a shared script classifier (`is-ci-green.ts`).
- **Class:** polish for the verification (the next tick would catch red CI anyway). The single-attempt bound is what keeps it from becoming an unbounded loop.

## Convergence, and what Shipwright does not have

### No review-round cap, only counters
Shipwright has no review-round cap. In the files read, nothing stops a PR after N review-and-patch rounds. The task store keeps `reviewCycles` (incremented when a review is posted) and `patchCycles` (incremented on each patch run). They are counters for reporting and audit, not limits: PRS L858-L869 and L901-L943 increment them; the route docs describe them as increments only (PR-R L313, L335); the only other reference is the audit-field list in `task-store/src/pr-transition-diff.ts` L52-L53. A search of `agent/src/coding/` found no read of either field in any check, selector or orchestrator file. Termination comes from the mechanisms below, not from a round count.

### C1. Shared settled definition
- **What:** whether a finding is "unaddressed" is computed by one function, used by the review gate, patch's candidacy check and the post-dispatch outcome check. A finding is settled by a fix (thread resolved), an author reply, a ledger entry (resolved by review, rejected by patch), or a newer clean self-review.
- **Source:** RV Step 9.5 L1063-L1066 and L1145-L1149; POC L15 (imports the same function) and L87-L89 ("candidacy here cannot drift from candidacy there"); `agent/src/coding/check-patch.ts` L425 (comment pointing at the shared script).
- **Why:** *documented.* A previous drift between separate copies of the definition is the cited cause (RV L1065-L1066).
- **Enforced by:** one script, reused.
- **Class:** crucial. Two phases disagreeing on "done" is how loops spin.

### C2. No-progress outcome check
- **What:** the orchestrator snapshots live PR state (head SHA, open finding refs, merge conflict, CI failing, behind-and-ready) before and after each patch dispatch. A changed state is progress. If the PR is no longer a candidate it is settled. If it is still a candidate with identical state, the run was a no-op and the PR is blocked on first occurrence instead of being re-dispatched. The block self-clears when the head moves. If state cannot be read, it fails open (no escalation). A thrown dispatch is left to the crash budget in C3.
- **Source:** POC L1-L84 (`evaluatePatchOutcome`); LO L1765-L1795; CH L969-L975 and L1026-L1070 (self-clearing).
- **Why:** *documented.* The invariant stated in the header: "every patch dispatch ends with the PR settled, changed, or escalated", checked from live state "without parsing transcripts" so it holds for completed, silent or thrown exits (POC L6-L11).
- **Enforced by:** orchestrator code, outside the model.
- **Class:** crucial. This is the backstop for a patch run that quietly does nothing.

### C3. Same-reason streak blocks
- **What:** a dispatch that ends silent records a skip with its reason. For tasks, the streak advances only when the same reason repeats and resets to 1 on a different reason; at 3 the task is set blocked. A dispatch that made real progress (live-state check for patch) resets the streak instead. A crashing dispatch records one stable error reason so repeated crashes hit the same threshold. Pull-request records also auto-block at 3 consecutive skips, and a CI failure with the same signature across 3 patch cycles blocks. Spin detection separately warns at 3 consecutive dispatches of the same item.
- **Source:** LO L1298-L1306 (crash reason), L1350-L1418 (streak and reset logic); TR L833 (same-reason rule for tasks); PRS L122-L130 and L1205-L1235 (PR auto-block at 3), L132-L141 (CI-failure streak); LO L624 and L2176-L2192 (spin detection).
- **Why:** *documented.* A legitimate defer that changes reason each tick must not auto-block, while "a genuinely stuck task repeating the identical reason three times in a row does" (LO L1355-L1362).
- **Enforced by:** service and orchestrator code.
- **Class:** crucial as a backstop. The threshold of 3 is a polish choice. I did not confirm from the PR-record service code that its streak is reason-aware; the task route documents it, and the orchestrator passes a reason for both item types.

### How the pieces converge
A PR leaves the loop through one of: approved and merged; settled (every finding fixed or rejected with a record, P2, C1); escalated to a human (second-round disagreement P3, main red P4, no progress C2, repeated same skip C3, BLOCKED report P3). There is no fourth exit that counts rounds.

## Crucial versus polish, summary

| Capability | Class |
|---|---|
| R1 confidence/threshold/cap | crucial (threshold), polish (numbers) |
| R2 severity decides blocking | crucial |
| R3 pre-existing-on-base filter | crucial for autonomous loops |
| R4 repo rules (CLAUDE.md input) | crucial; gated principle rules polish |
| R5 mechanical verdict | crucial |
| R6 unaddressed-findings gate | crucial |
| R7 label validation | crucial where consumed downstream |
| R8 self-review forced COMMENT / never request-changes | crucial / design choice |
| R9 verifier pass | polish |
| R10 multiple reviewers, merge and dedup | polish; always-a-response fallback crucial |
| R11 re-review attestation | crucial |
| R12 claim, head-moved, post-failure release | crucial; staged mode, live pre-check polish |
| R13 defer to human mid-conversation | polish |
| P1 verify before fix | crucial |
| P2 reject path and settled record | crucial |
| P3 second-round escalation | crucial |
| P4 CI triage | main-red and out-of-scope crucial; rerun-cancelled polish |
| P5 post-push CI and bonus fix | polish |
| C1 shared settled definition | crucial |
| C2 no-progress outcome check | crucial |
| C3 same-reason streak blocks | crucial as backstop |

## Open items for the lesson

- Most of the "crucial" set is enforced by prose, not code: R3, R4, P1, P2, P3. The ones enforced mechanically are R5, R6, R7, C1, C2, C3 and the claim. A lesson on this should say which rules survive a model that drifts.
- No rule here is verified by running it; every claim is from reading the files above.
- Not covered: how review and patch behave when review is disabled, how dependency-bump findings change the loop, and the lean patch variant.
