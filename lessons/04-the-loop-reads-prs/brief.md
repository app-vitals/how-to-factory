# Lesson brief: The loop reads PRs

> Agreed before any work is queued. One page. See [docs/lesson-playbook.md](../../docs/lesson-playbook.md).
> Scoping rule: lesson 1 explains plan and dev-task, builds a first version of each live, and runs a simple
> loop that ends at open PRs (a person reviews and merges). Every later lesson is ONE component, taught deep and built
> in that lesson, prioritized by expected, common and crucial; deeper dives come later. Order stays open. `factory/`
> is our demo; the lesson stays tool-neutral. The lesson's plan session queues lesson material only (brief, script,
> deck, exercise, options, run-of-show), never `factory/` changes: the factory builds `factory/` live.

## Component taught and band

[Coordination / loop](../../docs/components.md) (section 10), which the component map lists in the **Keeps it moving**
band. The lesson works on the boundary with the **Work done** band: the loop gains the stretch between "a PR is open" and
"a PR is ready for a person to merge". Review and patch appear only as stub skills; the lesson teaches how the loop
chooses between them, not how either works inside.

## The one idea

A PR is not finished work: each tick the loop looks at every open PR and decides whether it needs a review, needs a
patch, or needs nothing but a person.

## Scope test

Does a single agent need it for a single flow? Yes, for any loop that outlives the first PR. Lesson 1's loop picks a
task, builds it and stops at an open PR; nothing then looks at that PR again, so a review verdict, a red check or a new
push goes unseen until a person notices. The decision of what to do next with each PR is the core of the loop, not an
extra. Running several agents at once, claiming work, and scheduling the tick are destinations: named, not taught.

Source for the choice and ranking: the PR routing capabilities ranked by expected, common and crucial, from the Shipwright
inventory and the six-product routing grid (internal notes in `planning/lesson4-pr-routing/`, not published in the
lesson). The grid is as of 2026-10-28. Most of the six products are event-driven reviewers started by a push or a
comment; none of the pages checked describe a loop that polls every open PR, which is why several rows below carry a
count of 0 (read it as "not documented", never "no product has one").

## In scope

Tier A: built and exercised. Every row of the capability table below.

- **See:** each tick, read every open PR's state from GitHub (head commit, verdicts, CI result, mergeability); skip drafts
  and the agent's own PRs; read the review's verdict from a plain comment. `tasks.json` stays intent only.
- **Decide:** a review is needed when no verdict covers the current head commit; a patch is needed when there are findings,
  red CI or a conflict; otherwise wait for a human.
- **Reassess:** a patch pushes a new commit, so the old verdict no longer applies; review again (review, patch, review).
- **Stop:** after a set number of patch rounds on one PR, stop touching it and flag a person.
- The review and patch skills are built live as **stubs**: the review posts a plain `APPROVED` or `FINDINGS` comment on the
  head commit; the patch makes a small change and pushes.

## Out of scope

Tier B: named on one slide, each with the lesson that owns it. None is built here.

- Review quality (finding grading, inline comments, posting policy, reviewing against principles, a fresh reply that
  re-opens a reviewed PR): owned by the review lesson.
- Real GitHub approval, and the limit that an author cannot approve its own PR: owned by the review lesson, with whether
  an approval counts toward merge owned by the release lesson.
- Patch quality (how a finding becomes a commit, reading CI logs, resolving a conflict, a second-round disagreement,
  rerunning cancelled CI): owned by the patch lesson.
- Merge, canary and promote, and patching a behind-main PR only once it is otherwise ready: owned by the release lesson.
- Multi-agent claims (claim before dispatch, a reaper for dead claims, ordering work across tasks and PRs, backlog
  starvation): owned by the multi-agent coordination deep dive.
- Cron scheduling (the tick itself, idle backoff, a busy flag, per-phase switches, one winner per tick, failing open on a
  lookup error): owned by a later loop lesson.
- A per-PR cooldown and a skip counter that clears when the head moves (the production forms of the head-commit key and
  the round cap): owned by a later loop lesson.
- An author allowlist before the agent reviews: owned by the governance lesson.
- A queue snapshot for observability: owned by the feedback and maintenance lesson.

## The sample's concrete steps

1. List the open PRs from GitHub and read each one's facts: head commit, verdict comments, CI result, mergeability (See).
2. Drop drafts and the agent's own PRs (See).
3. For each remaining PR, find the review verdict for the current head commit; if there is none, the PR needs a review
   (Decide).
4. If the verdict is `FINDINGS`, CI is red, or the PR conflicts with main, the PR needs a patch (Decide).
5. If the verdict is `APPROVED` on the head, CI is green and there is no conflict, do nothing: the PR is ready for a
   person to merge (Decide).
6. Run the stub review or the stub patch for the chosen PR; the review leaves its verdict in a comment on the head
   commit (See, Decide).
7. After a patch pushes a new commit, the old verdict no longer covers the head, so the next tick reviews again
   (Reassess).
8. After the round cap on one PR (the lesson shows 3 as a choice, not a rule), stop and flag a person; the loop skips a
   flagged PR (Stop).

## What the factory builds in this lesson

The existing factory teaches its loop to read PRs, live on camera, from a brief given in the lesson. Nothing is
pre-queued in `factory/`, and no plan session queues this work: the factory is asked, plans it, and builds it during the
lesson run, including the two stub skills. The live build is the do-not-trim beat and covers three code beats: list and
read the PRs, decide, and stop. The drafts skip and the verdict format are the first parts to move to a walk-through if
time is short. The run then shows a patch, a re-review, and the cap.

## Reused from earlier lessons / New this time

**Reused from earlier lessons**

- Lesson 1: the plan and dev-task skills and the loop that ends at open PRs, now extended past the PR.
- Lesson 1: `tasks.json` as intent only.
- Lesson 2: the stage vocabulary (capabilities grouped by stage, one stage slide, then one slide per capability).
- Lesson 2: the capability slide pattern (title `Stage: capability`, one why-or-prevents bullet, two "e.g." bullets, one
  diagram, the illustration caption) and the run-of-show format.
- Lesson 3: checks that gate a PR, so a red CI result is something the loop can read.
- The deck rules, the expected / common / crucial ranking, and the Tier A / Tier B split.

**New this time**

- Four stages for the loop: See, Decide, Reassess, Stop.
- State read live from GitHub each tick, not remembered in the loop's own files.
- A review that belongs to a commit: a verdict covers one head and expires when the head moves.
- Three outcomes for every PR: review, patch, or wait for a human.
- A cap on rounds, with a flag for a person.

**Plan skill baseline.** This brief assumes the plan skill as on main (PR #94). Dave's lesson 2 plan-skill update is not
on main; if it lands first, re-check the hand-off wording.

## Capabilities

Grouped by stage and prioritized by expected, common and crucial. Examples marked (illustration) are constructed for the
lesson and are not a claim about any product. Counts are of the six surveyed products' documentation (Devin, Factory,
OpenHands, Cursor, Copilot, Claude Code); "not documented" means the pages checked do not say so, not that the product
lacks it. Crucial is "high" only where the Shipwright reason is documented; where it is partly documented or inferred, it
is capped at medium. The A-numbers are the ranking's stable ids, not the order. If time is short, A2 and A8 are the first
to move to a walk-through. From lessons 1 to 3, revisit after lesson 4.

| Stage | Capability | Concept | Why it exists or what it prevents | Examples | What it takes to build |
|---|---|---|---|---|---|
| See | A1. Read every open PR's state from GitHub each tick | Each tick the loop lists the open PRs and reads each one's head commit, verdicts, CI result and mergeability from GitHub; `tasks.json` stays intent only. Expected: high. PR state lives on GitHub in 6 of 6; a loop that lists all open PRs is documented by 0 (the products are triggered, not polling). Crucial: medium; the candidate-set reason is documented, reading live state is not explained. | The loop needs the whole set of candidates to choose among, and a stored copy goes stale when a person pushes. | The loop remembers "PR 12 is reviewed" in its own file, a person pushes a fix, and the loop never looks again. (illustration) Each tick starts from a fresh list, so a PR a person closed drops out. (illustration) | One function that lists open PRs and returns their facts. Small. |
| See | A2. Skip PRs that are not ready for review | Drafts, and PRs the agent itself authored where it cannot review them, are not candidates. Expected: medium. Drafts skipped by 3 (Factory, OpenHands, Cursor), included by 1 (Devin); skipping bot PRs is an optional condition in 1 (Factory). Crucial: medium; the reasons are partly documented or inferred. | A draft is not asking for review, and a loop approving its own work is not a review. | The loop spends a review on a half-finished draft. (illustration) A draft is marked ready, and the next tick picks it up. (illustration) | Two conditions in the list function. Small. |
| See | A8. The review leaves a verdict the loop can read | The stub review posts a plain `APPROVED` or `FINDINGS` comment on the head commit, and the loop reads it. Expected: medium. A reviewer posts an approval in 3 (Factory, OpenHands, Copilot when switched on), a beta autoapprover in 1 (Devin), no approval in 2 (Cursor, Claude Code); a plain-text verdict is not a dimension in the grid. Crucial: medium; a lesson-design choice, and why a self-authored review is a plain comment is inferred. | The loop needs something to read, and an author cannot formally approve its own PR. | The review is a wall of prose and the loop cannot tell findings from approval. (illustration) The verdict names the commit it covers, so a later push does not inherit it. (illustration) | One line in the review stub's output format. Small. |
| Decide | A3. A review is needed when no verdict covers the current head commit | A review belongs to a commit; if no verdict exists for the PR's current head, the PR needs a review. Expected: high. A review at each new push by default in 1 (Cursor), a setting in 2 (Devin, Claude Code), off unless set in 2 (OpenHands, Copilot); a stored record of which commit was reviewed is not a grid dimension. Crucial: high, because the reason is documented. | Without a commit key, other changes to the PR can look like "already reviewed". | With no commit key, the loop reviews the same PR every tick, or never reviews a changed one. (illustration) A verdict that names commit `a1b2c3` does not count once the head is `d4e5f6`. (illustration) | Store the commit in the verdict comment and compare it with the head. Small. |
| Decide | A4. A patch is needed when there are findings, red CI or a conflict | A PR with findings, a failing check or a conflict with main needs a patch, not another review. Expected: high for findings and red CI, low for a conflict. Fixing review comments without being asked in 3 (Devin, Cursor Autofix, Claude Code cloud auto-fix); a surface that fixes red CI in 5 (some on another surface or only when asked); conflict repair in 1 (Copilot, when asked). Crucial: medium; the three triggers are partly documented. | The review says what is wrong and CI says it does not pass; a person should not have to ask. | A review posts findings and nothing acts on them; the PR sits until a person notices. (illustration) CI goes red on a PR with a clean verdict, and the loop patches it anyway. (illustration) The conflict trigger is the first to drop if time is short. (illustration) | Three checks on the facts from A1. Small; the patch itself is a stub. |
| Decide | A5. Otherwise, wait for a human | A PR with a clean verdict on the current head, green CI and no conflict needs nothing from the loop; it is ready for a person to merge. Expected: high. A person is the stated handoff in 3 (Devin, Copilot, Claude Code); not described in 3. Crucial: medium; no inventory entry, so the failure is an illustration. | Without a "nothing to do" outcome, the loop keeps spending agent runs on finished PRs. | The loop keeps invoking an agent on a PR that needs only a person. (illustration) A ready PR shows up in the tick's summary as "waiting for a human". (illustration) | The default branch of the decision function. Small. |
| Reassess | A6. A patch invalidates the old review: review again | A patch pushes a new commit, so the earlier verdict no longer covers the head; the loop reviews again (review, patch, review). Expected: high. Re-review on push as in A3; review, patch, review as one loop without a person is documented by 0 (not a grid dimension: the grid cannot say whether the pieces form one loop). Crucial: high, because the reason is documented. | The same phase must not run again on an unchanged commit, and a new push must re-open the PR for review. | The patch fixes the finding, the old `FINDINGS` verdict stays current, and the loop patches again. (illustration) The patch pushes, the head moves, and the next tick runs a fresh review. (illustration) | Nothing beyond A3, once the verdict carries the commit. Small. |
| Stop | A7. Cap the rounds, then flag a human and leave the PR alone | After a set number of patch rounds on one PR (3 is shown as a choice, not a rule), the loop stops touching it and flags a person. Expected: medium. A numeric round or attempt cap in 1 (Cursor: 3 Autofix attempts per PR, 10 CI follow-ups); Devin caps spend, not rounds; 4 state none. Crucial: high, because the reasons are documented. | A flagged PR that is still a candidate gets picked again on every tick, indefinitely. | A flaky or unfixable test sends the loop around review and patch all night. (illustration) After the cap the PR carries a "needs a human" label and the loop skips it. (illustration) | A counter per PR and a label or comment that marks "needs a human", which the loop reads. Small. |

## Prerequisites

- Lesson 1: the plan and dev-task skills and the loop that ends at open PRs.
- Lesson 3: checks that gate a PR, so there is a CI result to read.
- Open PRs on GitHub to route (the lesson's checklist plans the setup, including a reviewer that cannot formally approve
  its own PR).

## Exercise outcomes

Outcomes only; no required tool, language or runner. Each covers one or more Tier A capabilities.

- Each tick lists the open PRs and reads their state from GitHub, not from a stored copy; drafts and the agent's own PRs are skipped (A1, A2).
- A review leaves a verdict that names the commit it covers, and the loop can tell approval from findings (A8, A3).
- Each PR gets exactly one outcome: review, patch, or wait for a human (A3, A4, A5).
- After a patch pushes a new commit, the old verdict no longer counts and the PR is reviewed again (A6).
- After the round cap, the PR is flagged for a person and the loop stops touching it (A7).

## Loop delta

**What does the loop do after this lesson that it could not before?**

The loop's work no longer ends at an open PR. Each tick it reads every open PR from GitHub and picks one outcome for
each: review it, patch it, or leave it for a person. A review belongs to a commit, so a patch sends the PR back to review;
a round cap stops a PR that will not converge and flags a person. A PR that reaches "reviewed clean, CI green, no
conflict" is ready for a human to merge. Before, a person had to notice every verdict, red check and new push.

**Does it cover what is expected, common and crucial for its one component?** (and name the deeper dives left for later lessons)

Yes, for the routing decision. All three capabilities rated crucial and documented (A3, A6, A7) and the capabilities rated
expected high (A1, A4, A5) are in Tier A and built; A2 and A8 are kept on judgement as the cheapest parts the design
needs, and are the first to become a walk-through. Common is low across the board because the products' docs describe
triggers, not a polling loop. Left for later: review quality and real approval (review lesson), patch quality (patch
lesson), merge and release (release lesson), claims, ordering and starvation across many workers (multi-agent
coordination deep dive), scheduling the tick, cooldowns and auto-block (later loop lesson), the author allowlist
(governance lesson), and the queue snapshot (feedback and maintenance lesson).

## Length target

30 to 40 minutes, the same as lessons 1 to 3. The ranking budgets 35: hook 3, stages 3, the three decisions 5, what other
factories do 4, the live build 14 (the do-not-trim beat), the run (patch, re-review, cap) 4, destinations and exercise 2.
