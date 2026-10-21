# Planning capabilities, ranked: expected, common, crucial

Internal planning doc. Input to the lesson 2 rewrite (LDR-5.x). Not published in the lesson.

Sources, both in this repo:
- **Inventory**: `planning/lesson-depth-reset/shipwright-inventory.md`, read at shipwright commit `5d01e2b` (cited as **Inv #n**, the numbered capability). Each Shipwright reason there is marked *documented* or *inferred*; that mark is carried through below.
- **Grid**: `landscape/plan-grid/README.md` and the six product files, as of 2026-10-20 (cited as **Grid**, with the dimension or column name).

## How the three axes are rated

| Axis | Question | How it is rated |
|---|---|---|
| **Expected** | Would someone using a plan step assume it does this? | Judgement, **High / Med / Low**, from what the grid shows plan modes doing. Stated, not computed. |
| **Common** | How many of the six products document it? | A count, **N of 6**, on the shown surface of each product (Devin CLI Plan mode, Factory Spec Mode, OpenHands planning agent, Cursor Plan Mode, Copilot Plan mode, Claude Code Plan mode). "Partly" is counted separately, never rounded up. |
| **Crucial** | What breaks without it? | **High / Med / Low**, from the failure in the inventory. High only where the inventory's reason is *documented*; *inferred* reasons are capped at Med and flagged. |

Reading the counts: "not documented" in the grid means the pages checked do not say so. It does not mean the product lacks the feature. Every N of 6 below is a statement about what the docs say.

Tier rule used here: a capability is **Tier A (built and exercised)** when it is crucial, or expected and common; **Tier B (named, not built)** when it is real but costly to build, depends on infrastructure the lesson does not have, or belongs to another lesson.

## Baseline (not ranked)

These are the plan skeleton, not depth capabilities, and the sample already has them from lesson 1 and the current plan skill: reading the repo, writing a design, task shape (id, title, 2 to 5 criteria, dependencies, branch). The grid supports putting them first: reading the code before proposing is **6 of 6**.

## The ranked list

Ordered by tier, then by how much the three ratings agree.

### Tier A: built and exercised

| # | Capability | Expected | Common (N of 6) | Crucial | Evidence |
|---|---|---|---|---|---|
| A8 | Queue awareness | Low | **0**. Not a grid dimension; tracker output is **0**, so the grid cannot show it | **High** | Inv #2: documented ("to avoid duplicates"; other sessions' task ids become valid `dependencies`). Kept because the duplicate-prevention and cross-session-dependency reasons are documented and the feature is cheap to build (one list call and a printed warning). |
| A1 | Clarify, then state assumptions | High | Clarify **5** (Devin, Cursor, Claude Code yes; Factory, Copilot partly). Assumptions as a plan part **0**; open questions **3** (Cursor, Copilot, Claude Code) | Med | Grid: *Clarify or interview mode*, *Assumptions or open questions surfaced*. Inv #9: "don't pick an interpretation silently" (documented as intent; the consequence is not spelled out, so Med). Inv #17 shows the unattended variant. |
| A2 | Layered exploration with reuse | High | Reads the code **6**. Reuse named as a plan part **0** (OpenHands partly: components, constraints) | Med | Grid: *Reads the code*, *Names reuse*. Reuse is blank on 22 of 37 surfaces and partial on 12; where it appears the person's prompt asks for it. Inv #3: the Source Map shortcut is documented; why four layers is inferred, so Med. |
| A3 | Complexity risks that can reshape the plan | Med | **0** (OpenHands lists "constraints", partly; Copilot names constraints) | Med | Grid: *Names reuse, risks or breaking changes*. Inv #4: examples but no rationale (inferred), so capped at Med. Inv #8 lets the design say how each risk is handled. While the inventory reason is inferred, the evidence that risks reshape the plan is strong: flagging coupled code, missing abstractions, and ordering constraints before design can avoid costly rework. |
| A4 | Breaking-change scan (consumers, backfill, release pipeline) | Med | **0**. Factory and Claude Code do it only if the prompt asks | **High** | Grid: widest gap in the survey. Inv #6, #5, #15: documented reasons. Pipeline consumers "won't appear in a local grep and won't error loudly; they'll just stop running"; a constraint before a backfill "will fail on (or corrupt) existing rows". |
| A5 | Saved design, linked from every task | High | Saved to a file by default **4** (Devin, OpenHands, Cursor, Claude Code). Linked from tasks **0** (OpenHands' `PLAN.md` is the handoff, step list only). Tracker output **0** | **High** | Grid: *Where the plan is saved*, *Tracker or ticket output*. Inv #19: documented. Re-synthesizing the plan from the task list "silently drops the design rationale, the Breaking Change Safety notes, and the embedded Decision Log". |
| A6 | Hard approval before tasks exist | High | **5** Human approves (Devin, Factory, Cursor, Copilot, Claude Code). OpenHands' SDK example: not documented. Some other surfaces (Devin spec-first and managed sessions, OpenHands prompt-led planning) are approvals only because the example prompt says to wait, see Grid cross-check §4 | Med | Grid: *Approval before work starts*, plus *Plan editable before approval*: **5** can change the plan (2 edit it, 3 by conversation). Inv #10: the gate is stated; why a human is wanted is **inferred** (tasks become autonomous work), so Med. |
| A7 | Slicing rules, including add, migrate, remove | Med | Ordering or dependencies marked **0** (2 partly: OpenHands step order, Cursor Build in Parallel). Slicing rules **0** | **High** | Grid: *Dependencies or ordering*, *How it becomes tasks*. Inv #15, #11, #14: documented: a rename or removal not split this way is "not safe to deploy independently — that gap is a broken intermediate state in production". The 1 to 8 hour cap and test-decision bullet are inferred. |
| A9 | Human-only task flag | Low | **0**. Two surfaces have a human marker that is not a plan step (Devin's red mark on a ticket, OpenHands' `HUMAN:` line on a PR) | **High** | Grid: *Human-only step flag*, wholly not documented on 24 of 37 surfaces. Inv #16: every reason documented: `.claude/**` writes are "blocked unconditionally by the Claude Code CLI's own protection", net-new secrets "require a human to provision", the task environment cannot reach production data. |

### Tier B: named, not built

| # | Capability | Expected | Common (N of 6) | Crucial | Evidence and why not built |
|---|---|---|---|---|---|
| B1 | Bundling | Low | Not surveyed (out of grid scope) | Med | Inv #13: documented, with a dated incident (2026-06-16, a bundle shipped incomplete). Needs a deploy gate to mean anything; the lesson has none. |
| B2 | Scoring and model tier | Low | Not surveyed (estimates and model tiers are out of grid scope) | Low | Inv #12: lower-tier default is documented; tier boundaries inferred. Pure spend tuning; the plan is correct without it. |
| B3 | Autonomous mode and decision log | Low | **1 partly**: OpenHands' SDK example runs straight on. Others pause for a human | Med | Inv #17: documented. Only meaningful once A6 exists to bypass. Name it as the unattended variant of A6. |
| B4 | Methodology config | Low | Not surveyed | Low | Inv #18: documented contract, large (12 checks, retry, abandon). Shipwright-specific plumbing; students' factories will differ. |
| B5 | Second-model critique | Low | **0** in the planning flow (OpenHands: optional separate tool; Factory: planning-model choice) | Low | Grid: wholly not documented on 16 of 37 surfaces. Not in Shipwright's plan-session either (Inv scope). |
| B6 | Parallel coordinators | Low | **1** (Cursor, Build in Parallel). Lives mostly in other surfaces | Low | Grid: *Parallel split*. Shipwright Gap #4: no critical-path analysis. Belongs with bundling and the later orchestration lesson. |
| B7 | Tracker sync | Low | **0** (4 plain answers across the 37 surfaces, none on a shown plan mode) | Low | Grid: *Tracker or ticket output*. Needs an external service; tasks to the queue are enough. |
| B8 | Per-task test layers | Med | Test planning is out of grid scope | Med | Inv #11: test-decision bullet, reason inferred. Owned by the verification lesson, per the approved proposal. |

### Considered and not carried forward

| Capability | Why left out | Evidence |
|---|---|---|
| Plan PR (commit `PLAN.md` on a docs branch, with secret scan) | Operational to Shipwright's pod-based runs. A5 already covers saving the design durably. | Inv #20: documented, but the reason is "the plan is lost with the pod". Grid: no product documents it. |
| Re-plan after a blocked build | Not in the target. | Grid: **0** document a step; 2 by hand or restart (Cursor, Claude Code). |
| Rollout or rollback section | Not in the target. | Grid: **0**, wholly not documented on 24 of 37. Shipwright Gap #3 agrees. Cursor's Rollouts feature is a post-code artifact, not a plan section; do not say "Cursor has no rollout plan" without that distinction. |
| Research step (web search when the approach is unclear) | Conditional and cheap; mention in A2 only. | Inv #7: trigger documented, reason for being conditional inferred. |

## Changes from the approved proposal

The approved Tier A and Tier B lists are in `planning/lesson-depth-reset/PLAN.md`. Result of ranking against the evidence:

**Crucial ratings:** A8 queue awareness is now rated High crucial (was Med) because Inv #2 documenting the "avoid duplicates" and cross-session-dependency reasons qualifies for High under the tier rule (documented evidence). A3 stays Med but is reframed from "flagged before design" to "complexity risks that can reshape the plan", emphasizing the plan-shaping consequence that the evidence supports empirically.

**No capability moves between tiers.** Every Tier A item is either crucial (A4, A5, A7, A8, A9, High) or expected and common (A1, A2, A6), or documented well enough to keep (A3). No Tier B item is crucial or common enough to promote: B8 is Med on both but is owned by the verification lesson.

**Added (made explicit, not new scope):**

| Change | Evidence |
|---|---|
| Backfill live-data check named inside A4, as its own sentence in the lesson | Inv #5: documented reason ("a mapping that looks complete against documentation can still miss a real data shape that only a live query would surface"). It was implied by "backfill" in the proposal. |
| Release or deploy pipeline named as a consumer in A4 | Inv #6: documented. The proposal said "consumers and backfill"; the inventory's strongest, most unusual reason is the pipeline, which a local grep cannot find. |
| Cross-session task ids as valid dependencies named inside A8 | Inv #2, #11: documented. |
| Autonomous mode (B3) described as the unattended variant of A6, so the two are taught as one idea | Inv #17 ties first-pass acceptance to there being no human to iterate with. |

**Dropped (not in the lesson at all):** Plan PR, re-plan, rollout or rollback, research as its own step. Reasons and evidence are in the table above.

**Kept on weaker evidence than the rest (flag for Dan):**
- **A8 queue awareness**: Low expected, 0 of 6. Crucial is now High because Inv #2 is documented and the feature is cheap to build. If lesson time is short, this is the first Tier A item to move to a walk-through.
- **A9 human-only flag**: 0 of 6, but every reason is documented and a missed flag sends an unworkable task to an agent that cannot do it. Kept; the novelty is in the lesson's favor, but say "what these docs say", not "no product can".
- **A3 complexity risks** and **A6 hard approval**: the Shipwright reasons are *inferred*, not documented. Teach the behavior; do not quote Shipwright as the source of the reason. A3 is reframed as risks that reshape the plan, which the evidence supports empirically even though Shipwright's rationale is inferred.

**Reduced claims to carry into the lesson:** "5 of 6 gate on approval" is true of the shown plan modes only. Elsewhere in the files, some "Human approves" cells are a prompt convention, not a product gate (Grid cross-check §4); do not generalize the count past the shown surfaces.

## Tier A write-ups (ready to paste into the brief)

Each item: concept, why it exists, a concrete failure without it, what it takes to build. Failures marked **(Shipwright, documented)** are the inventory's own words. Failures marked **(illustration)** are constructed for the lesson and are not a claim about any product.

### A8. Queue awareness
- **Concept:** before creating tasks, list what is already queued in this session and others, skip duplicates, and allow new tasks to depend on open ones. New work can be queued with dependencies on in-flight tasks without waiting for them to complete.
- **Why it exists:** **(Shipwright, documented)** "to avoid duplicates", and other sessions' tasks are "valid dependencies".
- **Failure without it (illustration):** the planner files the same migration task a second time under a new id; two agents build it.
- **To build:** one read of the task list and a dedupe check by title and branch; allow foreign ids in `dependencies`. Small, and the only item here that needs the task store from lesson 1.

### A1. Clarify, then state assumptions
- **Concept:** before designing, ask the few questions the spec leaves open; for what is still ambiguous, write the assumption into the plan and flag it for confirmation instead of choosing silently.
- **Why it exists:** the plan is the last cheap place to catch a wrong reading. Shipwright's wording: "don't pick an interpretation silently" (documented as intent; the consequence is not stated).
- **Failure without it (illustration):** spec says "notify the owner". The planner picks email, builds four tasks around it, and the owner wanted Slack. Nothing in the plan shows a choice was made, so the error surfaces in review.
- **To build:** a step that lists spec gaps that affect the design, asks only those, and appends an `Assumptions` section the approval step must show. Small: one prompt section and one output heading.

### A2. Layered exploration with reuse
- **Concept:** map the spec onto the layers the code actually has (logic, views, API, data), read the likely files in each, and record what to reuse and what is new versus modified.
- **Why it exists:** a design that names existing patterns produces tasks that fit the codebase. If the spec carries a source map, start there ("avoids re-deriving what the PRD session already identified", documented).
- **Failure without it (illustration):** the plan adds a new date-formatting helper while one already exists two directories over; review catches it, or it ships as a second copy.
- **To build:** an exploration step with a fixed per-layer checklist, read-only tools, and a `Reuse` and `New or modified` list in the design. Medium: the discipline is in the prompt, the cost is tokens spent reading.

### A3. Complexity risks that can reshape the plan
- **Concept:** while exploring, call out coupled code, missing abstractions, spec items that look simple but are not, and ordering constraints between layers; say what the design does about each. These are risks flagged before design that can reshape the plan.
- **Why it exists:** a risk named before design can reshape the design, avoiding costly rework. The inventory gives examples; the reshaping consequence is inferred but supported by the evidence that such flags change how the design proceeds.
- **Failure without it (illustration):** a "one-line" spec item touches a module six other features share; without flagging the coupling, it lands as a 1-hour task and takes two days.
- **To build:** one output block of `⚠` lines produced during A2 and a design rule that each is addressed or explicitly accepted. Small.

### A4. Breaking-change scan: consumers, backfill, release pipeline
- **Concept:** for every rename, removal or added constraint, find every current consumer before proposing tasks. Treat the build and release pipeline as an interface. For data migrations, require a live query of the real values.
- **Why it exists:** these are the changes that fail later and quietly. **(Shipwright, documented):** pipeline consumers "won't appear in a local grep and won't error loudly; they'll just stop running"; adding `NOT NULL` to a populated table "will fail on (or corrupt) existing rows".
- **Failure without it:** the task renames an endpoint, the grep misses a scheduled job that calls it, and the job stops with no error.
- **To build:** a scan step that greps callers (code, config, workflow files, scripts) for each changed interface and lists them in the plan; a rule that a migration task's criteria include a live-data query. Medium: grep is easy, deciding what counts as an interface is the work.

### A5. Saved design, linked from every task
- **Concept:** write the full plan to one file and give every task a link to it, rather than regenerating a summary from the task list.
- **Why it exists:** **(Shipwright, documented)** a re-synthesized plan "silently drops the design rationale, the Breaking Change Safety notes, and the embedded Decision Log" that the task's link points at.
- **Failure without it (illustration):** the executing agent opens a task, sees only its three bullets, and reverses a decision the design made on purpose.
- **To build:** write the approved plan verbatim to a path, store that path as a `source` field on each task. Small, but must be a rule: "verbatim, not summarized".

### A6. Hard approval
- **Concept:** no tasks are created until a person approves the design, and again the task list; nothing is written before that.
- **Why it exists:** tasks become autonomous work, so an error in the plan is multiplied downstream (the likely reason, inferred; Shipwright states the gate but not why).
- **Failure without it (illustration):** a wrong design becomes ten queued tasks and ten PRs before anyone reads it.
- **To build:** a stop in the flow that prints the design and waits; iteration until approved. Small to write, and the one step an automation cannot skip without a stated alternative (see B3).

### A7. Slicing rules, including add, migrate, remove
- **Concept:** every task is either atomic (all consumers updated in the same change) or split into add the new, migrate the consumers, remove the old. A constraint on a populated table splits into nullable column, backfill with live check, then constraint after the backfill is verified.
- **Why it exists:** **(Shipwright, documented)** a task that removes an interface while consumers remain is "not safe to deploy independently — that gap is a broken intermediate state in production".
- **Failure without it:** task 3 drops the old column; tasks 4 and 5 migrate readers. Merged in order, production breaks between 3 and 5.
- **To build:** a slicing prompt with the three-step rule, a per-task `Safe to deploy standalone` line, and a dependency table. Medium: the rule is short, applying it takes judgment the model must show.

### A9. Human-only task flag
- **Concept:** mark tasks that need a person (console action, secret provisioning, privileged command, production data access, protected paths), and write their steps as instructions for a human instead of code to write.
- **Why it exists:** **(Shipwright, documented)** some writes are blocked by the tool itself regardless of granted access; a new CI secret "requires a human to provision it"; the task environment cannot reach production data.
- **Failure without it:** an agent claims a task that needs a secret it cannot create, fails repeatedly, and the queue stalls behind it.
- **To build:** a pass over each task with a short keyword list plus a judgment step, a boolean `human` field, and a `Human steps` section in the description. Small; the keyword list is local to the stack.

## Recommended live-build scope

**Build on camera (the spine): A1, A2, A3, A6, A4 with A7.** That is: understand (clarify and assumptions, layered exploration with reuse, complexity risks), design, approve, then slice with the breaking-change rule. This matches the approved decision log, organized as Look (queue awareness, clarify, layered exploration, risks), then Design, Approve, and Slice.

Reasons, from the evidence above:
1. These are the steps where the plan visibly changes: a question appears, an assumption is written, a reuse list names a real file, a task list is split in three. A viewer can see each before-and-after.
2. A4 and A7 are the only Tier A pair with both High crucial and a documented failure, so a demonstration with a rename that breaks a hidden consumer carries the lesson's depth claim; the grid shows no product documents them (0 of 6).
3. A6 is the hinge: slicing only starts after approval, so it fits naturally between design and tasks.
4. A1 and A2 are the most expected (5 and 6 of 6), so building them first gets students to recognize the shape before the unusual parts.

**Walked through, not built: A5, A8, A9.** Each is short to build but adds no new visible step: A5 is a file write and a field, A8 is a list call, A9 is a flag. They are shown as a finished output (a plan with a `source` link, a deduped queue, one task marked human-only) and the code is left in the exercise. A8 remains here despite High crucial because Expected and Common are both weak; it is the first Tier A item to move to walk-through if lesson time is short.

**Named only: all of Tier B.** One slide, each with a destination lesson or the reason it is not built.

Do not move A4 or A7: they are the lesson's reason to exist.

## Open items for review

- "Expected" is judgement, not a count. If Dan wants it computed, the only defensible formula is the Common count; then A3, A4, A7, A8, A9 all read Low, and the tier list is unchanged because crucial carries them.
- The grid has no column for queue awareness, bundling, scoring, methodology config or test layers. Their Common is "not surveyed", not 0. Adding those dimensions is a research task if the lesson wants to claim anything about the field for them.
- Shipwright's `refresh-plan` was not read (inventory scope). Re-plan is rated from the grid only.
