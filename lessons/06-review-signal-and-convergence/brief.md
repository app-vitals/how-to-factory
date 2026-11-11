# Lesson brief: Review signal and convergence

> Agreed before any work is queued. One page. See [docs/lesson-playbook.md](../../docs/lesson-playbook.md).
> Scoping rule: lesson 1 explains plan and dev-task, builds a first version of each live, and runs a simple
> loop that ends at open PRs (a person reviews and merges). Every later lesson is ONE component, taught deep and built
> in that lesson, prioritized by expected, common and crucial; deeper dives come later. Order stays open. `factory/`
> is our demo; the lesson stays tool-neutral. The lesson's plan session queues lesson material only (brief, script,
> deck, exercise, options, run-of-show), never `factory/` changes: the factory builds `factory/` live.

## Component taught and band

[Review](../../docs/components.md) (section 5), which the component map lists in the **Work done** band, with **Patch**
as the second act: the step that answers a review. Lesson 4 built both as stub skills so the loop could route between
them. This lesson replaces the stubs with real ones and goes inside each.

## The one idea

A review is worth its signal-to-noise, and the loop needs a way to converge.

## Scope test

Does a single agent need it for a single flow? Yes, for any loop that lets an agent review and fix its own PRs. The
stub review from lesson 4 flags anything it can point to, so it cannot tell a real bug from noise, and the stub patch
obeys every finding, so a wrong finding becomes wrong code and the loop argues with itself. Both stay cheap while a
person reads every comment; with an agent reading them, the cost is rounds. Several reviewers voting, scoring a reviewer
against past incidents, tiered human approval and real merge are destinations: named, not taught.

Opening hook and destinations source: the article "How the Claude Code team does code review" (claude.dev Blog, Oct 15,
2026, <https://claude.dev/blog/solving-code-review-at-anthropic/>). Only claims verified against the raw page in
`planning/lesson6-review-patch/anthropic-article.md` are used, and always as "one team reported": the figures are that
team's own internal PRs, with no dates or sample sizes, not a benchmark. Hook figures: substantive review comments on
internal PRs rose from 16% to 54% once review ran on every PR; one CLI PR went through more than 50 rounds of review and
fixes overnight; after the convergence work, PRs needing five or more rounds fell from 8.9% to 1.5% (one convergence
figure at most on a slide). The article's cap of 3 rounds is that team's rule, not ours.

Source for the choice and ranking: the review and patch capabilities ranked by expected, common and crucial, from the
Shipwright inventory, the six-product review-quality grid (as of 2026-11-11) and the article (internal notes in
`planning/lesson6-review-patch/`, not published in the lesson). The grid covers review quality only; patch facts come
from the routing grid. Where a row carries a count of 0, read it as "not documented", never "no product has one".

## In scope

Tier A: built and exercised. Every row of the capability table below. Review is about 9 live minutes, patch about 8.

- **Review gate:** grade each finding by severity and confidence, post only above a threshold and cap the count, drop
  findings whose code is already on the base branch, judge against the repo's own rules with file and line evidence, and
  compute the verdict from the findings so the label cannot disagree with the review.
- **Verifier and re-review:** a fresh-context verifier drops findings it can disprove (a walk-through, not a build); a
  re-review reads only the new diff, does not repost findings, and says per earlier finding whether it is still there.
- **Patch:** verify each finding before touching code (accept, modify or reject), reject a wrong finding with a rebuttal
  and a settled record so the loop ends, and triage red CI before fixing (check whether the base branch is red too).
- **Converge:** a same-state no-progress check next to lesson 4's round cap; the cap is the backstop.

## Out of scope

Tier B: named on one slide, each with the lesson that owns it. None is built here.

- Several reviewers run in parallel, merged, deduplicated and voted on: owned by a later review deep dive.
- An incident-based eval set the reviewer is scored against: owned by the feedback and maintenance lesson.
- Noise metrics (resolution rate, false-positive rate): owned by the feedback and maintenance lesson.
- Risk-tiered human approval, where the change sets the tier: owned by the release lesson.
- Real approval and merge, and an agent's approval never counting as a person's: owned by the release lesson.
- An author allowlist before the agent reviews or fixes: owned by the governance lesson.
- Claims and a head-moved check around a review across many workers: owned by the multi-agent coordination deep dive.
- Second-round disagreement escalation, and a post-push CI check: owned by a later patch deep dive.
- A same-reason skip streak that auto-blocks, and deferring to a human mid-conversation: owned by a later loop lesson.
- Writing a good review guidance file: owned by the instructions and standards lesson.
- Staged versus auto-post of a review: owned by the governance lesson.

## The sample's concrete steps

1. The review reads the diff and the repo's own rules file, and lists candidate findings, each with a file and line
   (Review).
2. Each finding gets a severity and a confidence; those below the threshold are dropped and the rest capped to a count
   (Review).
3. Findings on code already on the base branch are dropped (Review).
4. A script computes the verdict from the surviving findings; a gate refuses to post a label that disagrees with them,
   and the reviewer never requests changes on its own author's PR (Review).
5. The patch reads each finding and decides accept, modify or reject before touching code (Patch).
6. A rejected finding gets a rebuttal comment and a settled record, so a later run does not raise it again (Patch).
7. On red CI the patch first checks whether the base branch is red too; if so it flags a person instead of editing the
   PR (Patch).
8. The re-review reads only the diff the patch added, does not repost earlier findings, and attests per earlier finding
   (Review).
9. The loop compares the PR's state before and after a round; if nothing changed it stops and flags a person, with the
   round cap behind it (Converge).

## What the factory builds in this lesson

The existing factory replaces its stub review and stub patch with real ones, live on camera, from a brief given in the
lesson. Nothing is pre-queued in `factory/`, and no plan session queues this work: the factory is asked, plans it, and
builds it during the lesson run. The live build of the review gate and the patch reject path is the **do-not-trim beat**.
If time is short, the verifier, the cancelled-run rerun and the base-branch filter move to a walk-through, in that order;
verify-then-fix, the reject path and the no-progress check do not move. The run then shows a wrong finding ending the
loop, and the no-progress check stopping a PR.

## Reused / Not re-taught

Lesson 6 starts where the lesson 4 stubs stop and points back in one sentence; it does not re-teach these (from
`planning/lesson6-review-patch/overlap-map.md`).

- The loop's three outcomes per PR (review, patch, wait for a human) and the routing rules behind them (lesson 4).
- Reading PR state live from GitHub each tick, and skipping drafts and the agent's own PRs (lesson 4).
- Review, patch, review: a patch moves the head, so the PR is reviewed again; the verdict names the commit it covers
  (lesson 4).
- The round cap and the `needs-human` flag, with a flagged PR skipped (lesson 4).
- Why a reviewer on the author's own login posts a plain comment, not a formal approval (lesson 4).
- Red-first tests, the evidence table, the bounded fix loop with a log and earlier attempts, and never weakening a test
  to get green (lesson 3).
- A check is only as strong as its independence from the builder; the fresh-context check as the example (lesson 3).
- CI as the arbiter, made binding by a branch-protection rule (lesson 3).
- Why the field comparison says "not documented", never "no product has one" (lessons 3 and 4).

## Reused from earlier lessons / New this time

**Reused from earlier lessons**

- Lesson 1: the plan and dev-task skills and the loop; `tasks.json` as intent only.
- Lesson 2: the stage vocabulary, the capability slide pattern and the run-of-show format.
- Lesson 3: independence of the check, the fresh-context agent, and the bounded fix loop.
- Lesson 4: the router, the per-commit verdict, review-patch-review, the round cap, and the stub skills this lesson
  replaces.
- Lesson 5: the Log, so the new states here (finding dropped, finding rejected, no progress) show up as reasons.
- The deck rules, the expected / common / crucial ranking, and the Tier A / Tier B split.

**New this time**

- Signal-to-noise as the measure of a review: a grade, a threshold, a cap, and a base-branch filter.
- Judging against the repo's own rules, with evidence on every finding.
- A verdict computed from the findings, not written by the model.
- A patch that checks a finding before acting, and can reject it with a record.
- A same-state no-progress check next to the round cap.

## Capabilities

Grouped by stage and prioritized by expected, common and crucial. Examples marked (illustration) are constructed for the
lesson and are not a claim about any product. Counts are of the six surveyed products' documentation (Devin, Factory,
OpenHands, Cursor, Copilot, Claude Code); "not documented" means the pages checked do not say so, not that the product
lacks it. Crucial is "high" only where the Shipwright reason is documented; where it is partly documented or inferred, it
is capped at medium. Patch counts come from the routing grid, which the review grid does not cover. The A-numbers are the
ranking's stable ids, not the order. Shipwright has no review-round cap (it converges through a shared "settled"
definition and a no-progress check); the cap of 3 is a lesson-scale stand-in from lesson 4, and the article's cap is that
team's rule. If time is short, A5, A2 and the cancelled-run half of A9 are the first to move to a walk-through. From
lessons 1 to 4, revisit after lesson 6.

| Stage | Capability | Concept | Why it exists or what it prevents | Examples | What it takes to build |
|---|---|---|---|---|---|
| Review: find | A1. Grade each finding, post only above a threshold, cap the count | Each finding gets a severity and a confidence; those below a threshold are dropped and the rest capped. Expected: high. A severity-style grade shown by 5 (Devin; OpenHands, Cursor, Copilot, Claude Code partly) plus Factory on another surface; a visible confidence score by 0 shown; a numeric count cap by 0; a cap written by the repo by 2. Crucial: medium; the reason is documented in part ("quality over quantity"). | Without a bar the review posts everything it can point to, and the real bug is buried among nits. | The review posts 14 comments and the one that matters is the ninth. (illustration) A finding at confidence 40 is dropped; one at 90 is posted. (illustration) | A grade on each finding, a threshold, a count cap. Small. |
| Review: find | A2. Drop findings whose code is already on the base branch | A finding on a line the PR did not change is dropped before posting. Expected: high. Not documented by 3 (Devin, Cursor, Copilot); partly by 2; other surface by 1; a plain yes by 0. Crucial: medium; the Shipwright reason is inferred (an author cannot be asked to fix code they did not change). One team reported about 59% of what its reviewer kept flagging was old code. | The author is asked to fix what they did not write, and a loop re-finds the same old code every round. | The review flags a long-standing function the PR only moved. (illustration) The finding is dropped because blame shows the line predates the PR. (illustration) | One filter beside A1: compare a finding's line to the PR's changed lines. Small. |
| Review: find | A3. Judge against the repo's own rules, with file and line evidence | The review loads the repo's rules file and cites a file and line for every finding; a pattern the rules endorse is not flagged. Expected: high. A repo guidance file by 6 (3 yes, 3 partly); a review-specific guidance file by 3; a location on every finding by 6; a must-cite-evidence rule by 2. Crucial: medium; documented in part. | A review against generic taste flags what the repo chose on purpose, and a finding without a location cannot be checked. | The repo bans a pattern and the review does not know. (illustration) A finding with no line number is dropped as unverifiable. (illustration) | Read one rules file into the review prompt; require a location per finding. Small. |
| Review: decide | A4. A mechanical verdict plus a gate, so the label cannot disagree with the review | A script computes the verdict from the surviving findings; a gate refuses to post a label that contradicts them; the reviewer never requests changes on its own author's PR. Expected: medium. A stated verdict or approval by 5; never approves or blocks by 1; a verdict computed by a script by 0 (not a grid dimension). Crucial: high; a mislabeled clean review recurred across different PRs, so prose alone was not enough. The never-request-changes rule is a prose design choice, not a guarantee. | A review that says "looks good" under a CHANGES label sends the patch after nothing, and a request-changes block can only be lifted by a person or the same agent. | The review text lists no findings but the label says CHANGES. (illustration) The gate recomputes the label from the findings and refuses to post the wrong one. (illustration) | A pure function from findings to verdict, and one check before posting. Small. |
| Review: verify | A5. A fresh-context verifier drops findings it can disprove | A second agent with no view of the first one's reasoning tries to disprove each finding and drops the ones it can. Expected: medium. A named stage by 1 (Claude Code); instructed steps by 1; a blog description by 1; not documented by 2; other surface by 1. Crucial: low; the reason is inferred and optional. Kept on design: lesson 3's independence idea applied to the reviewer. A walk-through if time is short. | The reviewer's own mistakes reach the author, and a patch then "fixes" a bug that was never there. | The verifier reads the code, finds the null check the review missed, and drops the finding. (illustration) | A second prompt with the finding and the code, not the first agent's reasoning. Medium. |
| Re-review | A6. A diff-only re-review that does not repost findings and attests per earlier finding | After a patch, the review reads only the new diff, does not repost earlier findings, and states for each earlier finding whether it is fixed, rejected or still there. Expected: high. Incremental by default by 3 (Devin, Cursor, Claude Code); partly by 3; a per-finding attestation by 0 (not a grid dimension). Crucial: high; the attestation is what lets the loop tell fixed from forgotten. One team reported diff-only re-review after the first few passes and no repeated findings. | Each round re-reads the whole PR and reposts the same comments, so the loop re-litigates instead of converging. | Round two reposts all six findings, five already fixed. (illustration) Round two lists six findings with "fixed" on five and "still there" on one. (illustration) | Pass the earlier findings and the new diff into the review; write an attestation per finding. Small. |
| Patch | A7. Verify each finding before touching code: accept, modify or reject | The patch decides for each finding whether it is real, partly right or wrong before it edits anything. Expected: high. A fixer that works review comments unasked by 3 (Devin, Cursor Autofix, Claude Code cloud auto-fix); a check before acting by 0 (not a grid dimension). Crucial: high; reviewers can be wrong, and a fixer that obeys every finding turns a reviewer's mistake into code. One team reported flagging the bug class so every instance is fixed (the modify path). | A wrong finding becomes wrong code, and the next round has a new problem. | The review says to remove a guard that the next function depends on; the patch reads the caller and declines. (illustration) A finding names one line but the bug is a class; the patch fixes every instance. (illustration) | A step before the edit that reads each finding against the code and records accept, modify or reject. Small. |
| Patch | A8. The reject path: a rebuttal plus a settled record, so a wrong finding ends the loop | A rejected finding gets a short reasoned reply and a record that marks it settled, including resolving its thread. Expected: high. A person can dismiss or teach a finding in 5 (Copilot yes; four partly), which is the human side; the fixer rebutting and recording by 0 (not a grid dimension). Crucial: high; the rebuttal lets a later run see the finding was addressed, not ignored, and an open thread otherwise counts as unaddressed. | Without a way to say no, the review re-raises the wrong finding forever and the only exit is the round cap. | The patch replies "this guard is needed by `parse()`", records it settled, and the next review does not raise it. (illustration) | A reply plus a record the review and the gate read. Small to medium. |
| Patch | A9. CI triage: check whether the base branch is red too; rerun a cancelled run first | Before fixing red CI, the patch checks whether main is red as well and flags a person if so; a cancelled run is rerun rather than fixed. Expected: high. A surface that fixes red CI in 5 (some only on another surface or when asked); triage before the fix by 0 (not a grid dimension). Crucial: high for the base-red check, low for the rerun (a cheap safe action that saves a model run). | The patch edits a PR to fix someone else's breakage, or burns a run on a cancelled job. | Main is red and the patch "fixes" the PR's tests to match. (illustration) A cancelled run is rerun and passes. (illustration) | One check of the base branch's latest run, and one rerun call. Small. |
| Converge | A10. A same-state no-progress check next to the round cap | The loop compares the PR's state (head commit, open findings, CI result) before and after a round; if it did not change, it stops and flags a person; the round cap is the backstop. Expected: high. A numeric round cap by 1 (Cursor, routing grid); a same-state check by 0 (not a grid dimension). Crucial: high; every patch should end with the PR settled, changed or escalated, measured from live state. One team reported one PR over 50 rounds overnight and a cap of 3 after which the author is asked to rethink. | A cap alone wastes the rounds before it, and a round that changes nothing repeats forever until the cap. | A flaky test makes round after round end with the same red check. (illustration) The second round changes nothing, so the loop flags a person at once. (illustration) | Compare two snapshots of PR state; reuse the lesson 4 flag. Small. |

## Prerequisites

- Lesson 1: the plan and dev-task skills and the loop.
- Lesson 3: the independence of the check, and a required CI result to read.
- Lesson 4: the router, the per-commit verdict and the stub review and patch skills, which this lesson replaces.
- Open PRs on GitHub to review and patch, including one with a wrong finding to reject, and a reviewer that cannot
  formally approve its own PR (the lesson's checklist plans the setup and the fallback).

## Exercise outcomes

Outcomes only; no required tool, language or runner. Each covers one or more Tier A capabilities.

- The review posts only findings above a threshold, within a count cap, each with a file and line, and none on code the
  PR did not change (A1, A2, A3).
- The review judges against the repo's own rules file (A3).
- The verdict is computed from the findings, and a mismatched label is refused (A4).
- The patch decides accept, modify or reject for each finding before it edits (A7).
- A wrong finding gets a rebuttal and a settled record, and is not raised again (A8).
- On red CI the patch checks whether the base branch is red too before changing the PR (A9).
- A re-review reads only the new diff and states what became of each earlier finding (A6).
- A round that changes nothing stops the loop and flags a person, with the round cap behind it (A10).

## Loop delta

**What does the loop do after this lesson that it could not before?**

The review is now worth reading: it posts only graded, evidenced findings on the PR's own changes, judged against the
repo's rules, and its verdict follows mechanically from them. The patch no longer obeys every finding: it checks each,
fixes the real ones, and rejects the wrong ones with a record, so a wrong finding ends the loop instead of feeding it.
The re-review reads only what changed, and a round that changes nothing stops the loop. Before, the stubs flagged
anything and obeyed everything, and only the round cap ended the argument.

**Does it cover what is expected, common and crucial for its one component?** (and name the deeper dives left for later lessons)

Yes, for review quality and the fix-back step. Every capability rated crucial and documented (A4, A6, A7, A8, A9's
base-red check, A10) and the ones rated expected high (A1, A2, A3) are in Tier A and built; A5 is kept on design as the
first walk-through. Common is low for the patch rows because the review grid does not cover patch; none of the docs
checked describe those behaviours, which is not the same as no product doing them. Left for later: several reviewers
voting (later review deep dive), the incident eval set and noise metrics (feedback and maintenance lesson), risk-tiered
approval and real approval and merge (release lesson), the author allowlist (governance lesson), claims across many
workers (multi-agent coordination deep dive), and second-round escalation (later patch deep dive).

## Length target

30 to 40 minutes, the same as lessons 1 to 5. The ranking budgets 35: hook 3, concept slides 4, what other factories do 4,
the live review gate 9, the live patch (verify, then reject) 8, the run (a wrong finding ends the loop, no-progress) 5,
destinations and exercise 2. The live build of the review gate and the patch reject path is the do-not-trim beat.
