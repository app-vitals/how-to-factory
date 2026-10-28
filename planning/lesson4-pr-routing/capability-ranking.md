# PR routing capabilities, ranked: expected, common, crucial

Internal planning doc. Input to the lesson 4 brief (LPR-1.11) and options (LPR-1.12). Not published in the lesson.

Model: `planning/lesson3-verification/capability-priorities.md`.

Sources, both in this repo:
- **Inventory**: `planning/lesson4-pr-routing/shipwright-inventory.md`, read at shipwright commit `881c455` (cited as **Inv #n**, the numbered capability, and **Inv Gap #n** for the numbered gaps). Each Shipwright reason there is marked *documented*, *partly documented* or *inferred*; that mark is carried through below.
- **Grid**: `landscape/routing-grid/README.md` and the six product files, as of 2026-10-28 (cited as **Grid**, with the dimension or column name; **Grid §4** is the "Counts on the shown surfaces" table).

## How the three axes are rated

| Axis | Question | How it is rated |
|---|---|---|
| **Expected** | Would someone building a loop that watches PRs assume it does this? | Judgement, **High / Med / Low**, from what the grid shows the products doing. Stated, not computed. |
| **Common** | How many of the six products document it? | A count, **N of 6**, on the shown surface of each product (Devin Review, Droid Review, Automated Code Review, Bugbot, Copilot code review, Claude Code Review). "Partly", "when asked" and "other surface" are counted separately, never rounded up. |
| **Crucial** | What breaks without it? | **High / Med / Low**, from the failure in the inventory. High only where the inventory's reason is *documented*; *partly documented* and *inferred* reasons are capped at Med and flagged. Where the inventory has no entry, Crucial is capped at Med and the failure is marked as an illustration. |

Reading the counts: "not documented" in the grid means the pages checked do not say so, and most fetches returned condensed extractions (Grid, "What this grid cannot say"). It does not mean the product lacks the feature. Every N of 6 below is a statement about what the docs say. Most of the grid's products are **event-driven reviewers**: a push or a comment starts a review, and the grid says only three of six describe any rule for choosing the next action, and that the choice is mostly the trigger's or a person's. A polling loop that looks at every open PR is therefore **0 of 6 documented** and the grid cannot show it. Where the grid has no dimension for a capability, Common is **0 (not a grid dimension)**.

Scope: the loop's routing decisions only (see, decide, reassess, stop). Review depth and patch depth are not ranked; see "Belongs to a later lesson".

Tier rule, same as lessons 2 and 3: a capability is **Tier A (built live)** when it is crucial, or expected and common; **Tier B (named, not built)** when it is real but costly to build, depends on infrastructure the lesson does not have, or belongs to another lesson. Exceptions are listed under "Kept on weaker evidence".

Stages follow the approved design in `planning/lesson4-pr-routing/PLAN.md`: **See**, **Decide**, **Reassess**, **Stop**.

## Baseline (not ranked)

The sample already has these from lessons 1 to 3, so they are not depth capabilities: a loop that picks a task, builds it and opens a PR (lesson 1), a plan that makes the tasks (lesson 2), and checks that gate the PR (lesson 3). `tasks.json` holds intent only. This lesson adds what happens after the PR exists.

## The ranked list

Ordered by stage, then by how much the three ratings agree.

### Tier A: built live

| # | Stage: capability | Expected | Common (N of 6) | Crucial | Evidence |
|---|---|---|---|---|---|
| A1 | See: read every open PR's state from GitHub each tick | High | PR state kept on GitHub **6**; a loop that lists all open PRs **0** (products are triggered, not polling) | Med | Grid §4 ("PR state kept on GitHub: 6 of 6"), *Where PR state lives*, *How it chooses the next action*. Inv #2, Inv Gap #3: the phase "needs the whole candidate set"; the hand-off between phases is not a message, each tick recomputes from GitHub. The candidate-set reason is documented; reading live state instead of a stored copy is Inv Gap #3 and gives no reason, so Med. |
| A2 | See: skip PRs that are not ready for review (drafts, the agent's own) | Med | Drafts skipped **3** (Factory, OpenHands, Cursor); drafts included **1** (Devin); Copilot and Claude Code not stated for drafts. Skipping bot PRs: an optional condition in **1** (Factory); bot-posted commands ignored in **2** (Cursor, Claude Code) | Med | Grid: *What triggers a review*, *A PR it authored itself* ("Mostly not documented"). Inv #4, #7: draft skip and self-review default are *partly documented* and *inferred*, so Med. |
| A3 | Decide: a review is needed when no verdict covers the current head commit | High | A review at each new push by default **1** (Cursor); a setting **2** (Devin, Claude Code); off unless set **2** (OpenHands, Copilot); Factory only if its opt-in is on. A stored record of which commit was reviewed **0** (not a grid dimension). Reviewing only what changed since the last review **2** (Cursor, Claude Code) | **High** | Grid §4 ("Re-review on a push"), Grid Observations. Inv #5: documented. A separate `reviewedCommitSha` exists so other commit bumps "can never masquerade as 'already reviewed at this head'", and the live check exists because the record "can't see a review posted by an agent running against a DIFFERENT task-store instance". |
| A4 | Decide: a patch is needed when there are findings, red CI or a conflict | High (findings, red CI); Low (conflict) | Fixes review comments without being asked **3** (Devin, Cursor Autofix, Claude Code cloud auto-fix); a surface that fixes red CI **5** (Devin on the shown surface; OpenHands, Cursor, Claude Code on another; Copilot only when asked); Factory not documented. Merge-conflict repair for a single PR **1** (Copilot, when asked) | Med | Grid §4 ("Fixes review comments without a person asking: 3 of 6", "Merge-conflict repair: 1 of 6"), *Fixing its own PR*. Inv #8: findings, red CI and conflict are the first three triggers; reason *partly documented*, so Med. Conflicts are rare in the grid and kept on the design, see below. |
| A5 | Decide: otherwise wait for a human | High | A person is the stated handoff **3** (Devin, Copilot, Claude Code); not described **3** (Cursor merge decision, Factory, OpenHands; OpenHands' watchdog merges, other surface) | Med | Grid §4, *Handoff to a person*. No inventory entry: Shipwright's wait is the absence of any candidate (Inv Gap #4 leaves merge to the deploy phase). Crucial capped at Med. Failure is an illustration: a loop with no "nothing to do" outcome keeps invoking an agent on PRs that need only a person. |
| A6 | Reassess: a patch pushes a new commit, so the old review no longer applies; review again | High | Re-review on push as in A3 (**1** by default, **4** with a setting, **1** conditional). Review, patch, review as one loop without a person **0**; Factory, Copilot and Claude Code say they do not hand off | **High** | Grid §4, Grid "What this grid cannot say" ("Whether the pieces form one loop"). Inv #5, #14: documented. A new push changes the head and re-opens candidacy; and a PR is not re-dispatched for the same phase within 25 minutes on an unchanged commit, after an observed bug: "a PR was re-dispatched every 2-5 minutes for hours on an unchanged commit". |
| A7 | Stop: cap the rounds, then flag a human and leave the PR alone | Med | A numeric round or attempt cap **1** (Cursor: 3 Autofix attempts per PR, 10 CI follow-ups); Devin caps spend, not rounds; four state none | **High** | Grid §4 ("A numeric cap on rounds: 1 of 6"), Grid Observations ("Rare"). Inv #16, #17, #19: documented. Three runs against the same CI failure block the PR (#16); a patch that leaves the PR still a candidate at the same head blocks it and flags a human (#17); a blocked or human-flagged PR is excluded, or it "gets re-selected ... on every drain tick, indefinitely, until a human clears the flag" (#19). |
| A8 | See: the review leaves a verdict the loop can read | Med | Reviewer posts an approval **3** (Factory, OpenHands, Copilot when switched on) plus a beta Autoapprover **1** (Devin); no approval **2** (Cursor, Claude Code). Whether an AI approval counts toward merge: **1** of 6 documents it (Copilot, when enabled). A plain-text verdict **0** (not a grid dimension) | Med | Grid §4 ("The reviewer posts an approval", "Documented whether an AI approval counts"). Inv #5, #7: the live check of GitHub reviews is documented; why a self-authored review is forced to a plain comment is *inferred* (likely GitHub rejecting self-approval), so Med. Kept on the lesson's design: the stub review posts `APPROVED` or `FINDINGS`. |

### Tier B: named, not built

| # | Stage: capability | Expected | Common (N of 6) | Crucial | Evidence and why not built (owner) |
|---|---|---|---|---|---|
| B1 | Stop: a cooldown per PR and phase on an unchanged commit | Low | Not a grid dimension; **0** | **High** | Inv #14: documented (see A6). The round cap (A7) and the head-commit key (A3) bound the same failure at lesson scale; a timer is the production form. Owner: **later loop lesson** (component 10). |
| B2 | Stop: skip counter and auto-block that clears when the head moves | Low | **0** | **High** | Inv #15: documented. Needs a store of counts per PR and a clearing rule. Owner: **later loop lesson**. |
| B3 | Decide: second-round disagreement escalation | Low | **0** | Med | Inv #18: documented (repeating the same response is a "false" retry), but a simple loop can use A7 alone. Owner: **later patch lesson**. |
| B4 | Decide: cancelled CI is rerun before any code change | Low | **0** | Med | Inv #9: *partly documented*. A patch-quality detail. Owner: **later patch lesson**. |
| B5 | See: a fresh human reply re-opens a reviewed PR | Low | **0** | Med | Inv #6: documented ("confirmed live on PR #2456"). A review-quality detail. Owner: **later review lesson**. |
| B6 | See: an author allowlist before the agent reviews | Low | **0** | Med | Inv #4: *partly documented*; it gates "an agent's FIRST exposure" to an author's PR. Trust, not routing. Owner: **governance lesson** (component 7). |
| B7 | Decide: behind-main PRs are patched only once otherwise ready | Low | Merge-conflict repair as in A4, **1**; BEHIND handling **0** | Med | Inv #8: reason *partly documented*. Depends on knowing what "ready to merge" means. Owner: **release lesson** (component 6). |
| B8 | Decide: real approval, not only a comment verdict | Med | See A8: **3** approve, **1** beta, **2** do not; counting toward merge **1** | Med | Inv #7: a self-authored review is forced to a comment, reason inferred. The lesson shows the limit and names it as a "where factories take it" item. Owner: **review lesson** (component 5) and **release lesson** (component 6). |
| B9 | See: age-ordered queue across tasks and PRs, with a PR inheriting its task's age | Low | **0** (not a grid dimension; "Behaviour under load" is a grid gap) | Med | Inv #11, #12: documented ("deliberately simple v1", and why the "ready for review" timestamp is not used). Needs more than one task in flight. Owner: **coordination deep dive** (component 10b). |
| B10 | See: starvation of review and patch by a deep task backlog | Low | **0** | Med | Inv #13, Inv Gap #1: the mechanism is my reading of the code and was not run; capped at Med. The shipped lesson must not call it a Shipwright claim. Owner: **coordination deep dive**. |
| B11 | Stop: claim an item before dispatch, with a reaper for dead claims | Low | **0** | **High** (once more than one worker runs) | Inv #10: documented. A single-loop demo has no second worker. Owner: **coordination deep dive** (component 10b). |
| B12 | Stop: one winner per tick, and a throwing dispatch skipped | Med | **0** | **High** | Inv #1: documented ("must not stall unrelated review/patch/deploy work"). In the sample it is a try/catch around one dispatch; named while building A4 and A5, not given its own slide. Owner: **later loop lesson**. |
| B13 | Per-phase on/off switches | Low | **0** | Low | Inv #3: *partly documented*. Owner: **later loop lesson**. |
| B14 | Fail open when the lookup errors | Low | **0** | Med | Inv #20: documented, with a stated trade-off against deploy, which fails closed. Owner: **later loop lesson**. |
| B15 | Idle backoff and a busy flag | Low | **0** | Med | Inv #21, #22: documented. Cron scheduling is a later loop lesson (`PLAN.md` out of scope). Owner: **later loop lesson**. |
| B16 | Queue snapshot for observability | Low | **0** | Low | Inv #23: *inferred* purpose. Owner: **feedback and maintenance lesson** (component 8). |

### Belongs to a later review or patch lesson

The lesson keeps the review and patch skills as stubs. These are about what a skill does, not what the loop decides, so they leave the ranking:

| Item | Why it is out | Owner |
|---|---|---|
| Review quality: finding grading, inline comments, review policy and posting rules, and reviewing against stated principles | Judgement inside the review skill. The loop only reads the verdict (A8). | **Later review lesson** (component 5) |
| Fresh-reply exception, and the review-posting policy table | B5; depth of the review step. | **Later review lesson** |
| Patch quality: how a finding becomes a commit, how CI logs are read, how a conflict is resolved | Judgement inside the patch skill. The loop only decides that a patch is due (A4). | **Later patch lesson** |
| Second-round escalation and cancelled-CI rerun | B3, B4. | **Later patch lesson** |
| Merge, canary, promote | After "ready for a human to merge". | **Release lesson** (component 6) |

### Considered and not carried forward

| Capability | Why left out | Evidence |
|---|---|---|
| Candidate providers per phase as its own slide | Folded into A1: the loop collects every PR first, then decides. | Inv #2. |
| Review tied to a commit as separate from patch's commit | Folded into A3 and A6. The separate field is a store detail. | Inv #5. |
| Self-review exception for a requested reviewer | A detail of B8. | Inv #7. |
| Choosing the next action with a weighted score | Only Cursor's PR Routing & Approval and Claude Code's cloud auto-fix describe weighing inputs, on other surfaces; the sample's rule is fixed (A3, A4, A5). | Grid, "What this grid cannot say". |

## Lesson length: does Tier A fit 30 to 40 minutes?

Budget in minutes, not a script. The previous lessons ran 30 to 40 minutes (`PLAN.md`, Direction). The live loop build is the do-not-trim beat and the largest part.

| Part | Minutes | Tier A covered |
|---|---|---|
| Hook: a PR is not finished work; the one idea | 3 | - |
| Stages: See, Decide, Reassess, Stop | 3 | A1, A2 named |
| The three decisions as concept slides (review, patch, wait) | 5 | A3, A4, A5 |
| What other factories do (differs slide, two or three products) | 4 | A3, A7, A8 evidence |
| **Live: build the loop and the two stub skills** | **14** | A1 to A8 |
| Run it: patch, then re-review, then the cap | 4 | A6, A7 |
| Destinations and exercise hand-off | 2 | Tier B named |
| **Total** | **35** | |

The build is 14 of 35, the largest part. Eight items in a 14-minute build is tight: A1 and A2 are one function (list open PRs, drop drafts), A3 to A5 are one decision function, A6 follows from A3 once the head commit is the key, and A8 is the stub review's one-line output. That leaves roughly three code beats (list, decide, stop). If time runs short, A2 and A8 are the first to move to a walk-through.

## Changes from the approved design

The approved stages (See, Decide, Reassess, Stop) and stubs are in `PLAN.md`. Result of ranking:

**Tier A (eight items):** A1 to A8. A3, A6 and A7 are High crucial (documented reasons). The rest are on judgement, see below.

**Not in the design's Tier A thinking:** the redispatch cooldown (B1) and skip auto-block (B2) are High crucial and documented but are production forms of what the head-commit key (A3) and the round cap (A7) do at lesson scale. They stay in B because they need stored counters and timers.

**Nothing promoted to Tier A from Tier B on the evidence.** No Tier B item is both expected and common; the products' docs mostly describe triggers, not a loop, so Common is 0 for nearly everything that is about a loop.

**Kept on weaker evidence (flag for Dan):**
- **A1 and A5**: Common is 0 or a count of what the grid does not measure (state lives on GitHub, 6 of 6; a polling loop, 0). Kept because the design's one idea (a PR is not finished work, the loop looks at it each tick) is these two. Say "none of these docs describe a polling loop", never "no product has one".
- **A4 merge-conflict trigger**: 1 of 6 in the grid, expected Low. Kept because Shipwright checks it first (Inv #8) and a conflict blocks a merge. It is the first thing to drop from A4 if time is short; findings and red CI carry the beat.
- **A8 a verdict the loop can read**: Med crucial and a lesson-design choice. It exists so the loop has something to read without needing real GitHub approval, which a self-authored PR cannot have (B8).
- **A2 skip drafts and own PRs**: Med crucial on partly documented or inferred reasons. Teach the behavior; do not quote Shipwright as the source of the reason.

**Reduced claims to carry into the lesson:**
- The starvation of review and patch by a deep backlog (B10) is a reading of the code, not run, and not a claim about any other product (Grid: behaviour under load is not covered).
- Rows where the grid says "Other surface" must be cited as such: a product's reviewer and its fixer are usually different surfaces (Grid Observations).
- Grid cross-check flags re-checks before the lesson says a capability is absent: Devin release notes and non-GitHub source control, Factory's lint-autofix recipe, OpenHands release notes, Cursor's Security Agents page, Copilot's unread pages, Claude Code release notes (Grid §3). Factory's re-review on push depends on its `automatic_review` opt-in (Grid §2).

## Tier A write-ups (ready to paste into the brief)

Each item: concept, why it exists, a concrete failure without it, what it takes to build. Failures marked **(Shipwright, documented)** are the inventory's own words. Failures marked **(illustration)** are constructed for the lesson and are not a claim about any product.

### A1. See: read every open PR's state from GitHub each tick
- **Concept:** each tick the loop lists the open PRs and reads each one's state (head commit, verdicts, CI result, mergeability) from GitHub. `tasks.json` stays intent only.
- **Why it exists:** **(Shipwright, documented)** the selector "needs the whole candidate set". Reading live state rather than a stored copy is how Shipwright works (Inv Gap #3); the reason is not stated.
- **Failure without it (illustration):** the loop remembers "PR 12 is reviewed" in its own file, a person pushes a fix, and the loop never looks again.
- **To build:** one function that lists open PRs and returns their facts. Small.

### A3. Decide: a review is needed when no verdict covers the current head commit
- **Concept:** a review belongs to a commit. If no verdict exists for the PR's current head, the PR needs a review.
- **Why it exists:** **(Shipwright, documented)** a separate reviewed-commit field means other commit bumps "can never masquerade as 'already reviewed at this head'".
- **Failure without it (illustration):** with no commit key, the loop either reviews the same PR every tick or never reviews a changed one.
- **To build:** store the commit in the verdict comment and compare it with the head. Small.

### A4. Decide: a patch is needed when there are findings, red CI or a conflict
- **Concept:** a PR with unresolved findings, a failing check, or a conflict with main needs a patch, not another review.
- **Why it exists:** the review says what is wrong and CI says it does not pass; a person should not have to ask. **(Shipwright, partly documented)** the three triggers are checked in a fixed order; the order's reason is not stated.
- **Failure without it (illustration):** a review posts findings and nothing acts on them; the PR sits until a person notices.
- **To build:** three checks on the facts from A1. Small. The patch itself is a stub.

### A5. Decide: otherwise wait for a human
- **Concept:** a PR with a clean verdict on the current head, green CI and no conflict needs nothing from the loop. It is ready for a person to merge.
- **Why it exists:** no inventory reason; the sample's version of "done" for this lesson is "ready for a human to merge".
- **Failure without it (illustration):** the loop keeps invoking an agent on a finished PR.
- **To build:** the default branch of the decision function. Small.

### A6. Reassess: a patch invalidates the old review
- **Concept:** a patch pushes a new commit, so the earlier verdict no longer covers the head. The loop reviews again: review, patch, review.
- **Why it exists:** **(Shipwright, documented)** a new push changes the head and re-opens candidacy; and the same phase is not re-dispatched on an unchanged commit, after a bug where "a PR was re-dispatched every 2-5 minutes for hours".
- **Failure without it (illustration):** the patch fixes the finding, the old `FINDINGS` verdict stays current, and the loop patches again.
- **To build:** nothing beyond A3, once the verdict carries the commit. Small.

### A7. Stop: cap the rounds, then flag a human
- **Concept:** after a set number of patch rounds on one PR (the lesson shows 3 as a choice, not a rule), the loop stops touching it and flags a person.
- **Why it exists:** **(Shipwright, documented)** three runs against the same failure block the PR, and a blocked PR is excluded or it is "re-selected ... on every drain tick, indefinitely".
- **Failure without it (illustration):** a flaky or unfixable test sends the loop around review and patch all night.
- **To build:** a counter per PR and a label or comment that marks "needs a human", which the loop reads. Small.

### A2. See: skip PRs that are not ready for review
- **Concept:** drafts, and PRs the agent itself authored where it cannot review them, are not candidates.
- **Why it exists:** a draft is not asking for review; a loop approving its own work is not a review. Reasons *partly documented* and *inferred* in the inventory.
- **Failure without it (illustration):** the loop spends a review on a half-finished draft.
- **To build:** two conditions in the list function. Small.

### A8. See: the review leaves a verdict the loop can read
- **Concept:** the stub review posts a plain `APPROVED` or `FINDINGS` comment on the head commit. The loop reads it; real GitHub approval is a destination.
- **Why it exists:** the loop needs something to read, and a self-authored PR cannot receive a real approval from its own author. **(Shipwright, inferred)** a self-authored review is forced to a plain comment.
- **Failure without it (illustration):** the review is a wall of prose and the loop cannot tell findings from approval.
- **To build:** one line in the review stub. Small.
