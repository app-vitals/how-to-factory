# Verification capabilities, re-ranked for the validation-depth redo (v2)

Internal planning doc. Successor to `capability-priorities.md` (the nine-capability ranking, kept as the record of the first draft). Input to the rewritten lesson 3 brief (LVR-2.1). Not published in the lesson.

Scope comes from `planning/lesson3-validation-depth/PRODUCT-SPEC.md` (decisions 2 to 4): **four capabilities built live, three mentioned, one human-gate beat.** The one idea is that a check is only as strong as its independence from the builder.

Sources, all in this repo:
- **Inventory**: `planning/lesson3-verification/shipwright-inventory.md`, read at shipwright commit `7662e5e` (**Inv #n**, **Inv Gap #n**). Each Shipwright reason is marked *documented*, *partly documented* or *inferred*.
- **Grid**: `landscape/verify-grid/README.md` and the six product files. Original dimensions as of 2026-10-21 (re-checked 2026-10-23); hidden-test and test-quality dimensions added 2026-10-29 (LVR-1.8). Cited as **Grid** with the dimension name; **Grid §5** is "Counts on the surfaces shown"; **Grid §6** is the cell-by-cell check of the added dimensions.
- **Research**: `planning/lesson3-validation-depth/research.md` (LVR-1.1), fetched 2026-10-29, cited as **Res §n**. Preprints are marked medium confidence there and are not Shipwright reasons.

## Rating rules (unchanged from v1)

| Axis | Rule |
|---|---|
| **Expected** | Judgement, High / Med / Low, from what the grid shows products doing. Stated, not computed. |
| **Common** | A count, N of 6, on each product's shown surface. "Partly", "when the prompt asks" and "other surface" are counted separately, never rounded up. "Not documented" means the pages checked do not say so (Grid §3), not that the product lacks it. |
| **Crucial** | High only where a **documented** reason exists (Shipwright inventory marked *documented*). *Partly documented* and *inferred* reasons are capped at Med and flagged. Where Shipwright has no entry, capped at Med and the failure is an illustration. **Outside evidence (research preprints, papers) is context, not a documented reason: it does not lift a rating to High.** |

## The ranked list

### Built live (4)

| # | Capability | Expected | Common (N of 6) | Crucial | Evidence |
|---|---|---|---|---|---|
| 1 | **Criteria become red-first tests, with layer choice** (was A2, with the layer half of A3) | High | Criteria turned into checks by the product **0**; the written objective or per-feature criteria are the check in **2** (OpenHands, Factory). Failing-test-first **0** (not a grid dimension). Per-task test planning **0** on shown surfaces (Devin's separate Testing mode writes a plan) | **High** | Grid: *Criteria turned into checks*, *Per-task test planning*. Inv #1, #2: the RED step carries a documented reason, "A test passing immediately means it is testing existing behavior or is incorrectly written", and is the only hard block in the pipeline (Inv #1 note). Layer choice rides on the Test Type rule (Inv #2, rule documented, purpose inferred); that half alone would be Med, the RED step carries the High. |
| 2 | **Run the repo's checks and show an evidence table** (was A1 + A8 merged; bounded loop is one line) | High | Checks run before done: **5**, Claude Code **partly**; product picks the exact commands **0**. Logs or diffs reach the person **6**; visual evidence **2** (Devin, Cursor). Loop that keeps going **4**; numeric cap stated **2** (OpenHands, Cursor) | Med | Grid: *What runs*, *Evidence shown to the person*, *How it keeps going*, Grid §5. Inv #3, #5, #6, #10: "Verifications are crucial to ensuring your work is valid" is documented, but why they run twice and why outcomes are recorded (passes included) is inferred, so Med. The fix-loop's "do NOT repeat" history is documented (Inv #10); the cap of 6 is inferred. |
| 3 | **Guard against weakened tests** (was A4) | High | **0** of 6; none of the 79 surfaces document a built-in guard | Med | Grid: *Guard against weakening tests*, Observations ("Absent"). Inv Gap #2: Shipwright has no such rule (`weaken`: 0 hits), so there is no documented reason to quote; Med by the cap, failure is an illustration. Kept on the lesson's design: it is the cheapest independence check (a diff rule on test files) and it protects capability 1 from the loop in capability 2. |
| 4 | **Fresh-context check of the criteria against the diff, with running the app as its step** (was A5 with A6 as its step) | Med | A separate verifier **2** (Factory validation workers, OpenHands judge). Who decides done: Automated **2**, Human **2**, no gate stated **2**. Runs the app: built in **2** (Factory, Cursor); when the prompt asks **1** (Devin); other surface **1** (Claude Code); not described **2** (OpenHands, Copilot) | Med | Grid: *Who decides done*, *Runs the app itself*. Inv #4: "This is an independent review — the subagent has no knowledge of implementation decisions" is documented, including why it runs on the cheapest model; the failure it prevents (builder grades its own work) is inferred, so Med. Inv Gap #1, #5: the check reads the diff, never a run, so a behavior criterion can be MET on code that never ran. Running the app is the step that closes that gap. No documented Shipwright reason for it (0 hits for `screenshot`, `visual`, `lighthouse`), so Med. This is the capability that most directly states the one idea. |

### Mentioned, not built (3)

Each is framed as a classic software-engineering technique and why it matters more when an agent writes both code and checks. None is documented by a shown product surface; the reasons come from research, so Crucial is capped at Med and flagged.

| # | Capability | Expected | Common (N of 6) | Crucial | Evidence and why not built |
|---|---|---|---|---|---|
| M1 | **Held-out tests** (tests the builder cannot see) | Low | **0** of 6 documented (all six "not documented", pages named); other surface 2 (Cursor verifier subagent is a clean context, not hidden checks, partly; Claude Code plugin evals hide cases but test a plugin) | Med, **flagged** | Grid: *Hidden or held-out tests*, Grid §5, §6. Res §1: SpecBench (medium confidence preprint) reports the visible-minus-held-out pass-rate gap growing about 28 points per tenfold code size; CapCode is a method, not a rate. No Shipwright entry, so capped at Med; the study is context, not a Shipwright reason. Not built: needs a place the builder cannot read and a person to author the hidden cases. Owner: a later verification lesson. |
| M2 | **Mutation testing** (would the tests fail if the code were wrong) | Low | **0** of 6, and 0 of 54 surfaces; coverage is the stand-in (Devin partly, Claude Code when the prompt asks) | Med, **flagged** | Grid: *Test-quality measure*, Grid §5. Res §2: Meta ACH (high confidence, self-reported): 49% of mutant-killing tests added no line coverage, so coverage and mutation score measure different things; SWE-Mutation: best model detects 36.15% of mutants. Our recorded Stryker run on lesson 1's suite (68% score, 65 survivors, five hand-verified; PRODUCT-SPEC) is the first-party result and is shown as a recorded result, not built live. Inv Gap #3: Shipwright has none (`mutation`: 0 hits). A full run took about 9 minutes, so not live. Do not use the unverified "42% fewer defects" figure (Res §2.3). |
| M3 | **Property-based testing** | Low | **0** of 6, and 0 of 54 surfaces; not documented on all six shown surfaces | Low to Med, **flagged** | Grid: *Property-based or fuzz testing*. Res §3: Anthropic Frontier Red Team: 56% valid and 32% reportable of 50 reviewed reports, an agent finding bugs in existing libraries, not checking its own fresh code. A person still decides the property. Capped at Med; rated Low on the lesson because it needs intent a person states. Owner: a later verification lesson. |

### Human-gate beat (not a capability)

| # | Beat | Expected | Common (N of 6) | Crucial | Evidence |
|---|---|---|---|---|---|
| G1 | **CI is the arbiter, required by branch protection** (was A9) | High | CI waits: Cursor **1**; repo rules bind the agent **2** (Devin, Copilot); a product-required check before the PR **0** | **High** | Grid: *CI or branch gating*. Inv #8, #13: documented, "Without enforcement, the audit is a social contract. Engineers WILL bypass it under deadline pressure." Inv Gap #4: with no required checks a red run does not stop a merge. The workflow is code; a person sets the branch-protection rule, so it is not autonomous and is shown as the place a person comes in. High crucial is kept; the rating did not change, only the treatment. |

## Changes from the approved design

The earlier ranking (`capability-priorities.md`) had nine Tier A capabilities (A1 to A9) and nine Tier B. The validation-depth spec (Dan, 2026-10-29) changes scope, not the rating rules.

**Moved and merged:**
- **A2 stays first and gains the layer choice.** The layer half of A3 (a test-decision criterion on every task) folds in because choosing which layer proves a criterion is what lets one idea cover more than "run the tests". Why: the earlier draft read as variations of "tell the agent to run the tests".
- **A1 + A8 merged** into one capability, "run the checks and show an evidence table". They were the same loop seen from two ends (run, then show); the bounded loop (A7) shrinks to one line inside it. Ratings unchanged (Med crucial, reasons inferred).
- **A7 (bounded loop) is no longer its own capability.** Expected High, common 4 of 6 still hold, but it is the tail of capability 2, not a separate beat.
- **A5 and A6 combined.** Running the app (A6) becomes the step that the fresh-context check (A5) uses to exercise a path, since A5 alone only reads the diff (Inv Gap #5). Both stay Med.
- **A4 unchanged** in rating (Med, 0 of 6) and still kept on the lesson's design rather than evidence.
- **A3 dissolved:** its layer-choice half folds into capability 1; its "every task carries a test-decision bullet" half is baseline from lesson 2.
- **A9 demoted from capability to human-gate beat** (G1). Rating unchanged (High crucial, documented). It is not autonomous: a person sets the branch-protection rule.

**Moved in from Tier B / new:** held-out tests, mutation testing and property-based testing (M1 to M3) are new to the lesson, drawn from the research (LVR-1.1) and the added grid dimensions (LVR-1.8). The earlier B8 ("measure test quality (mutation, flake handling)") becomes M2, promoted from the feedback and maintenance lesson to a mention here; flake handling stays with that lesson. All three score 0 of 6 on the shown surfaces. They are mentioned because of the one idea (independence from the builder), not because the evidence ranks them above anything else.

**Unchanged in Tier B (not carried into this lesson's body, still named as destinations):** coverage threshold that blocks (B1), speed budgets (B2, High crucial, documented, not built), canary suite (B3, High crucial, documented), testing principles as review criteria (B4), recorded check outcomes with learned skip (B5), required-step proof signals (B6), the test-readiness pipeline (B7), post-PR auto-fix (B9). Owners as in the v1 doc.

**Honest limits:**
- **Only two High crucial ratings** hold, capability 1 (RED step) and G1; both rest on documented Shipwright reasons. Everything else is Med or Low. The research preprints do not change that: they say the problem is real, not that Shipwright documents a reason.
- **The three mentioned items are 0 of 6 documented.** Say "none of the shown docs describe one", never "no product has one". Grid §4 lists the re-checks that must happen before the lesson says a capability is absent.
- **Preprints are medium confidence.** SpecBench's 28-versus-27 point discrepancy and SWE-Mutation's metric definitions must be re-checked before filming (Res open items). CapCode's venue is unconfirmed; do not write "ICML".
- **The Stryker result is first-party and small:** one suite, one run. The planned v1 versus v2 experiment is a small noisy experiment, not a rate.
- **The Claude Code interactive-session row answers some dimensions from other surfaces;** say "other surface" when citing it.
- **Flag for Dan:** capability 3 (0 of 6, no Shipwright rule) and the held-out-tests mention (M1, the only one with no first-party result of ours) are the weakest on evidence. Capability 3 is the first thing to cut if lesson time is short.
