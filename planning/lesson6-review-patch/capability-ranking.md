# Review and patch capabilities, ranked: expected, common, crucial

Internal planning doc. Input to the lesson 6 brief and options. Not published in the lesson.

Model: `planning/lesson4-pr-routing/capability-ranking.md`.

Sources, all in this repo:
- **Inventory**: `planning/lesson6-review-patch/shipwright-inventory.md`, read at shipwright commit `8b1d5a5` (cited as **Inv Rn**, **Inv Pn** and **Inv Cn** for the review, patch and convergence entries). Each Shipwright reason there is marked *documented*, *documented in part* or *inferred*; that mark is carried through below.
- **Grid**: `landscape/review-grid/README.md` and the six product files, as of 2026-11-11 (cited as **Grid**, with the dimension name; **Grid §4** is "Counts per dimension"). Patch counts come from `landscape/routing-grid/README.md` as quoted in the lesson 4 ranking, because the review grid covers review quality only.
- **Article**: `planning/lesson6-review-patch/anthropic-article.md`, 15 claims verified against the raw page (cited as **Art row n**). One team's internal figures, not a benchmark.
- **Overlap map**: `planning/lesson6-review-patch/overlap-map.md` (cited as **Overlap**), for what lessons 1 to 5 already teach.

## How the three axes are rated

| Axis | Question | How it is rated |
|---|---|---|
| **Expected** | Would someone building a review-and-fix loop assume it does this? | Judgement, **High / Med / Low**, from what the grid shows the products doing. Stated, not computed. |
| **Common** | How many of the six products document it? | A count, **N of 6**, on the shown surface of each product (Devin Review, Droid Review, Automated Code Review, Bugbot, Copilot code review, Claude Code Review). "Partly" and "other surface" are counted separately, never rounded up. |
| **Crucial** | What breaks without it? | **High / Med / Low**, from the failure in the inventory. High only where the inventory's reason is *documented*; *documented in part* and *inferred* reasons are capped at Med and flagged. Where the inventory marks a capability polish, Crucial is Low. |

Reading the counts: "not documented" in the grid means the pages checked do not say so, and several fetches were condensed (Grid, "What this grid cannot say"). It never means the product lacks the feature. Every N of 6 below is a statement about what the docs say. Where the review grid has no dimension for a capability (nearly all patch behaviour, and anything about how a loop decides), Common is **0 (not a grid dimension)**, and the lesson must say "none of these docs describe it", never "no product has it".

Scope: review quality (grading, noise control, verification, guidance, re-review, verdict) and the patch step that answers it (verify, reject, CI triage, convergence). Routing (which PR gets which phase) is lesson 4 and is not ranked again.

Tier rule, same as lessons 2 to 4: a capability is **Tier A (built live)** when it is crucial, or expected and common; **Tier B (named, not built)** when it is real but costly to build, depends on infrastructure the lesson does not have, or belongs to another lesson. Exceptions are listed under "Kept on weaker evidence".

## Baseline and already taught (not ranked)

Nothing below is ranked as new. Source: Overlap, "Not re-taught".

- The loop's three outcomes per PR, the routing rules behind them, and reading PR state live (lesson 4 A1 to A5).
- Review, patch, review: a patch moves the head, so the PR is reviewed again (lesson 4 A6).
- The blunt round cap and the `needs-human` flag, with a flagged PR skipped (lesson 4 A7).
- Why a reviewer on the author's own login posts a plain comment, not a formal approval (lesson 4 A8).
- Red-first tests, the evidence table, the bounded fix loop with a log and earlier attempts, and "never weaken a test to get green" (lesson 3).
- Independence of the check from the builder, with the fresh-context check as the example (lesson 3).
- CI as the arbiter via branch protection (lesson 3).

Where a ranked item below builds on one of these, the "Overlap" column says so and the lesson points back in one sentence. The overlap map marks each candidate **new** or **stub** (half of it taught); a stub is ranked only for the part lessons 3 and 4 left out.

## The ranked list

Ordered review first, then patch, then convergence.

### Tier A: built live

| # | Capability | Overlap | Expected | Common (N of 6) | Crucial | Evidence |
|---|---|---|---|---|---|---|
| A1 | Review: grade each finding by severity and confidence, post only above a threshold, cap the count | new (lesson 4 hands it off) | High | Severity-style grade **5** shown (Devin Yes; OpenHands, Cursor, Copilot, Claude Code partly) plus Factory on another surface; a visible confidence score **0** shown (Claude Code's plugin, another surface, scores 0 to 100 and drops under 80). A numeric count cap **0**; a cap written by the repo **2** (Claude Code `REVIEW.md`, Factory prompt line); a content bar **1** (OpenHands); a posting switch per class **1** (Devin) | Med | Grid §4 ("Findings graded", "Threshold or cap"), Grid Observations. Inv R1: 0 to 100 confidence mapped to critical, important, suggestion, default floor 75 and cap 5, reason *documented in part* ("quality over quantity"), so Med. Inv R2 (severity decides blocking) is documented and feeds A4. Art row 11: a good guidance file caps nits. |
| A2 | Review: drop findings whose code is already on the base branch | new | High | Not documented **3** (Devin, Cursor, Copilot); partly **2** (OpenHands skill text; Claude Code labels Pre-existing as its own class, not a filter); other surface **1** (Factory local `/review`). A plain "yes" **0** | Med | Grid §4 ("Filter for problems that existed before the PR"). Inv R3: reason *inferred* (an author cannot be asked to fix code they did not change), so Med; crucial in an agent-to-agent loop, polish with a human author. Art row 6 reports about 59% of what its reviewer kept flagging was old code, which is a reason to teach it, not a documented Shipwright reason. |
| A3 | Review: judge against the repo's own rules, with file and line evidence on every finding | new (lessons 3 and 4 hand it off) | High | A repo guidance file **6** (Yes: Devin, Cursor, Claude Code; Partly: Factory, OpenHands, Copilot); `REVIEW.md` read by **3** (Devin, Copilot, Claude Code). A location on every finding **6**; a must-cite-evidence rule documented **2** (OpenHands skill text, Claude Code via `REVIEW.md`) | Med | Grid §4 ("Repo guidance files", "Evidence required"). Inv R4: the root rules file reaches the reviewer, and a pattern the file endorses is not flagged; reason *documented in part*, so Med. Art row 11: short code-owner guidance file, evidence requested. |
| A4 | Review: a mechanical verdict function plus a gate, so the label cannot disagree with the review; self-review limit; no request-changes | stub (the format is lesson 4 A8; how the verdict follows from the findings is not taught) | Med | A stated verdict or approval **5** (Yes: OpenHands, Copilot; Partly: Devin status, Factory approve-only, Cursor check); never approves or blocks **1** (Claude Code); a verdict computed by a script **0** (not a grid dimension) | **High** | Grid §4 ("States a verdict"). Inv R2, R5, R6, R7: documented. A mislabeled clean review recurred "across different PRs", showing prose alone was not enough; the label is read by the patch side. Inv R8: request-changes is not used because it blocks the PR until the reviewer dismisses it. The self-review forcing is mechanical and documented; the never-request-changes rule is prose, a design choice. |
| A5 | Review: a fresh-context verifier drops findings it can disprove | stub (lesson 3 teaches a fresh agent that checks a build, not a reviewer's findings) | Med | A named stage **1** (Claude Code: candidates, verification, dedupe); instructed steps in skill text **1** (OpenHands); a blog-post description **1** (Cursor); not named or not documented **2** (Devin, Copilot); other surface **1** (Factory Security review, two passes) | Low | Grid §4 ("Verification pass"). Inv R9: reason *inferred*, and the inventory classes it polish: the verifier is optional, one-sided, and runs only when more than one reviewer's output was merged. Kept on design, see "Kept on weaker evidence". |
| A6 | Review: diff-only re-review that does not repost earlier findings and attests, per earlier finding, whether it is still there | stub (lesson 4 A6 teaches the trigger; the scope of the re-review is not taught) | High | Incremental by default **3** (Devin, Cursor, Claude Code after a push); partly **3** (Factory, OpenHands, Copilot; Copilot may repeat resolved comments). A per-finding attestation **0** (not a grid dimension) | **High** | Grid §4 ("Re-review"). Inv R11: documented. The attestation is written to a ledger the gate (A4) reads, so the loop can tell fixed from forgotten; "what lets a loop converge instead of re-litigating". Art rows 8 and 10: diff-only after the first passes; no repeats. |
| A7 | Patch: verify each finding before touching code (accept, modify or reject) | new (lesson 4 hands off "how a finding becomes a commit") | High | A fixer that works review comments without being asked **3** (Devin, Cursor Autofix, Claude Code cloud auto-fix). A check before acting **0** (not a grid dimension) | **High** | Routing grid via the lesson 4 ranking (fixes comments unasked, 3 of 6). Inv P1: documented ("Reviewers can be wrong"). A fixer that obeys every finding turns reviewer mistakes into code. Art row 9: flag the bug class so every instance is fixed (supports the Modify path). |
| A8 | Patch: the reject path, a rebuttal plus a settled record so a wrong finding ends the loop | new (lesson 4 hands off "a second-round disagreement") | High | A person can dismiss or teach a finding **5** (Yes: Copilot; Partly: Devin, OpenHands, Cursor, Claude Code); the fixer rebutting and recording a rejection **0** (not a grid dimension) | **High** | Grid §4 ("How a person dismisses"), which is the human side. Inv P2: documented. The rebuttal lets a later run "recognize the review was addressed (rejected with reasoning, not ignored) instead of reflagging it forever"; the unresolved inline thread has to be resolved too, because it counts as unaddressed otherwise. |
| A9 | Patch: CI triage, rerun a cancelled run first and check whether the base branch is red too | stub (lesson 4 sends red CI to patch; lesson 3 has the fix loop; rerun and base-red are handed to the patch lesson) | High | A surface that fixes red CI **5** (Devin on the shown surface; OpenHands, Cursor, Claude Code on another; Copilot only when asked). Triage before the fix **0** (not a grid dimension) | **High** (base-red check); Low (rerun cancelled) | Routing grid via the lesson 4 ranking. Inv P4: documented. Base branch red: block the PR, otherwise the fixer edits a PR to fix someone else's breakage (crucial). Cancelled run: "a cheap rerun is a safe, essentially no-op action" (polish, saves a model run). The two halves are rated separately; the base-red check carries the beat. |
| A10 | Converge: a same-state no-progress check next to the round cap | stub (lesson 4 A7 teaches the cap and the flag) | High | A numeric round cap **1** (Cursor, from the routing grid); the article's cap of 3 is Anthropic's, not a grid count. A same-state check **0** (not a grid dimension) | **High** | Inv C2: documented ("every patch dispatch ends with the PR settled, changed, or escalated", checked from live state). Inv C1: one shared "settled" definition, because separate copies drifted. Art rows 5, 7: one PR ran over 50 rounds; the article's reviewer hands back to the author after 3. Shipwright has no round cap: see "The Shipwright fact". |

### Tier B: named, not built

Every item names its owner lesson. Owners follow `docs/components.md`; where the map has no lesson yet, the owner is the component's later lesson.

| # | Capability | Expected | Common (N of 6) | Crucial | Why not built, and owner |
|---|---|---|---|---|---|
| B1 | Several reviewers run in parallel, merged, deduplicated and voted on | Med | **0** documented as such on the shown surfaces; Cursor's blog describes eight passes and a majority vote (**1**, may have changed) | Low | Inv R10: *inferred*, polish; the fallback that some valid response is always produced is crucial but is a robustness detail. Costly and needs the verifier (A5) first. Owner: **later review deep dive** (component 5). |
| B2 | An incident-based eval set the reviewer is scored against daily | Low | **0** (Cursor and Claude Code count outcomes; OpenHands has an evaluation recipe) | Med | Art row 12 (one team's practice); not in the inventory. Needs a history of incidents the sample does not have. Owner: **feedback and maintenance lesson** (component 8). |
| B3 | Noise metrics: resolution rate, auto-resolved comments, false-positive rate | Low | Outcome counts **4** partly (Devin, OpenHands, Cursor, Claude Code); a false-positive rate **0**; Factory and Copilot none | Low | Grid §4 ("noise measured"). Not in the inventory. Owner: **feedback and maintenance lesson** (component 8). |
| B4 | Risk-tiered human approval, where the change sets the tier | Med | **0** | Med | Art row 13. Real approval and merge need a person's slot. Owner: **release lesson** (component 6). |
| B5 | Real approval; an agent's approval never counts as a person's | Med | Approve **3** (Factory, OpenHands, Copilot opt-in) plus Devin and Cursor on other surfaces; counting toward merge **1** | Med | Art rows 14, 15. Inv R8: the sample shows the limit and names the rest. Owner: **release lesson** (component 6). |
| B6 | An author allowlist before the agent reviews or fixes | Low | **0** | Med | Lesson 4 inventory #4 (partly documented): it gates an agent's first exposure to an author's PR. Trust, not quality; not in this inventory. Owner: **governance lesson** (component 7). |
| B7 | Claim, head-moved check and post-failure release around a review | Low | **0** | **High** (once more than one worker runs) | Inv R12: documented. A single-loop demo has one worker. Owner: **coordination deep dive** (component 10b). |
| B8 | Defer to a human mid-conversation | Low | **0** | Low | Inv R13: polish. Owner: **later loop lesson** (component 10). |
| B9 | Post-push CI check with one bonus fix | Low | **0** | Low | Inv P5: polish; the next tick catches red CI anyway. Owner: **later patch deep dive** (component 3). |
| B10 | Second-round disagreement escalation | Low | **0** | **High** | Inv P3: documented, the only thing that ends a reviewer-versus-fixer argument without a round cap. The reject path (A8) and the no-progress check (A10) cover the sample; this needs a judgement of same finding versus a new one. Owner: **later patch deep dive** (component 3). |
| B11 | Same-reason skip streak that auto-blocks at 3 | Low | **0** | **High** (backstop) | Inv C3: documented. Needs a store of counts per item. Owner: **later loop lesson** (component 10). |
| B12 | Guidance-file authoring: what to put in `REVIEW.md` and how to keep it short | Med | See A3; `REVIEW.md` **3** | Med | The review reads the file (A3); writing a good one is the instructions lesson. Art row 11. Owner: **instructions and standards lesson** (component 9a). |
| B13 | Staged versus auto-post of the review, and a live pre-check for a review from another system | Low | **0** | Low | Inv R12: polish switches. Owner: **governance lesson** (component 7). |

### Considered and not carried forward

| Capability | Why left out | Evidence |
|---|---|---|
| Who owns the PR record and the review file | Store detail. | Inv R12. |
| A 0 to 100 confidence score with exact bands | Folded into A1; the numbers are polish. | Inv R1. |
| Merge queue re-checking against main | Release lesson, outside review. | Art row 15. |
| Security-review layer, flags and gradual release | Outside review quality. | Art "Left out". |
| Rules that fire only for tests, layering or security | Folded into A3; the gated rules are polish. | Inv R4. |

## Lesson length: does Tier A fit 30 to 40 minutes, with patch about 8?

Budget in minutes, not a script. Review and patch stay one lesson (`PLAN.md`), and the live build of the review gate and the patch reject path is the do-not-trim beat.

| Part | Minutes | Tier A covered |
|---|---|---|
| Hook: the article's numbers, and the one idea (signal-to-noise, and a way to converge) | 3 | - |
| Concept slides: review quality, then fix-back | 4 | A1 to A10 named |
| What other factories do (differs slide, two or three products) | 4 | A1, A3, A5, A6 evidence |
| **Live: build the review gate** | **9** | A1, A3, A4, A6 built; A2 a one-line filter |
| **Live: build patch, verify then reject** | **8** | A7, A8, A9 |
| Run it: a wrong finding ends the loop; no-progress check | 5 | A8, A10 |
| Destinations and exercise hand-off | 2 | Tier B named |
| **Total** | **35** | |

Patch gets about 8 minutes, as the plan sets. Ten Tier A items in 17 build minutes is tight. Folds that keep it honest: A2 is one filter beside A1; A4 is one script and one check at posting; A5 is a walk-through, not a build; A9 is the base-red check live and the cancelled-run rerun said aloud. If time runs short, A5, the cancelled-run rerun in A9, and A2 move to walk-throughs in that order. A7, A8 and A10 do not move.

## The Shipwright fact to keep straight

**Shipwright has no review-round cap.** Inv, "No review-round cap, only counters": the task store keeps review and patch cycle counters that are written on each run and read by no check, selector or orchestrator in the files read. It stops a PR in three ways: the PR is **settled** (every finding fixed or rejected with a record, one shared definition, A8 and A10), **escalated** to a person (disagreement, base red, no progress, repeated same skip), or merged. No fourth exit counts rounds. The lesson 4 sample's cap of 3 is a lesson-scale stand-in. The article's cap of 3 is Anthropic's rule (Art row 7). Neither may be presented as a production Shipwright cap. A10 teaches the no-progress check next to the cap, and says the cap is the backstop.

## Changes from the approved design

The approved Tier A in `PLAN.md` is nine items; this ranking has ten.

- **The plan's item 1 split in two.** Grading with a threshold and cap (A1) and the pre-existing filter (A2) have different counts and different crucial ratings, so they are ranked apart. Both are still taught in one beat.
- **The plan's item 2 and its evidence rule merged into A3.** Same beat; the evidence requirement is the check the guidance file makes enforceable.
- **Nothing promoted from Tier B on the evidence.** No Tier B item is crucial and also common or expected. B7, B10 and B11 are High crucial and documented, but each needs infrastructure or a judgement the lesson does not build, so they stay named.
- **Nothing dropped as already taught.** Every candidate that overlaps lessons 1 to 5 is a stub with a clear new part (A4, A5, A6, A9, A10). The taught halves are not re-ranked.

## Kept on weaker evidence (flag for Dan)

- **A5 verifier pass.** Common is 1 of 6 as a named stage, Crucial is Low (inventory: polish, reason inferred). Kept because the design chose it and it is lesson 3's independence idea applied to the reviewer. It is the first item to demote to Tier B (owner: the later review deep dive) if the build runs long.
- **A2 pre-existing filter.** Common is mostly "not documented" and Shipwright's reason is inferred. Kept because the article reports a large share of repeat flags were old code (Art row 6, with its wording caveat) and it ties to the converge beat. Teach the behaviour; do not quote Shipwright as the source of the reason.
- **A1 and A3.** Crucial is capped at Med: the inventory's reasons are *documented in part*. The ratings rest on Expected and Common, which are strong.
- **A7 to A10 Common.** The review grid does not cover patch. The counts come from the routing grid, and the specific behaviours (verify before fix, reject path, triage, no-progress check) are 0 because no grid dimension asks. Say "none of these docs describe it". Do not say no product does it.
- **A4 never-request-changes.** A design choice enforced by prose only. Teach the choice and the reason (a block that only a human or the same agent can lift), and do not call it a Shipwright guarantee.

## Reduced claims to carry into the lesson

- Most Shipwright "crucial" rules are enforced by prose, not code: A2, A3, A7, A8 and the reject path. The mechanical ones are the verdict function, the gate, the label check and the no-progress check (A4, A10). Inv "Open items": say which rules survive a model that drifts.
- No rule in the inventory was run; every claim is from reading the files.
- The article's figures are one team's internal numbers with no dates or sample sizes. Present them as "one team reported". The cap of 3 is that team's rule.
- Rows where the grid says "Other surface" must be cited as such: a product's reviewer and its fixer are usually different surfaces.
- Open flags from the grid cross-check apply before the lesson says a capability is absent: Devin release notes, Factory's action inputs and `/deep-review`, OpenHands' plugin scripts and the two unresolved wording conflicts, Cursor's changelog index, Copilot's blog posts, Claude Code's plugin skill file (Grid §3).
