# Exercise: make the loop read PRs

**Goal:** a loop of your own that, each tick, reads every open PR from GitHub and gives each one exactly one outcome
(review it, patch it, or leave it for a person), sends a patched PR back to review, and stops at a round cap by flagging
a person.
**You need:** the loop from lesson 1 (anything that picks work on a schedule or on demand), a GitHub repo with a few open
PRs and a CI result on them (lesson 3), an AI coding agent of your choice, and a way to run a small review step and a
small patch step. The two steps can be stubs. Name no required tool; any agent, language, scheduler or API client works.

Our demo uses Bun and Claude Code; you do not need either. Describe the outcomes in whatever tools you picked.

Try it on a scratch repo with four open PRs: one with no review yet, one with a failing check, one already reviewed clean
with green CI, and one draft. That gives every outcome something to act on.

## Outcomes and done-when checks

Each outcome has a check you can make against real PRs and runs in your repo. Tick it only when you can point to the
evidence.

### 1. State is read live from GitHub

Each tick starts from a fresh list of open PRs, not from a stored copy.

- [ ] the tick lists the open PRs and reads each one's head commit, verdict, CI result and mergeability, and you can show the code or call that does it
- [ ] close a PR by hand between two ticks: the next tick no longer lists it
- [ ] push a commit to a PR by hand: the next tick sees the new head without being told
- [ ] your task file or store holds intent only, with no copy of PR state that the loop trusts

### 2. Only PRs that are ready are candidates

Drafts and the agent's own PRs are not reviewed.

- [ ] a draft PR is left alone, and the tick's summary says why
- [ ] a PR opened by the agent's own account is not reviewed by that account
- [ ] mark the draft ready: the next tick picks it up

### 3. The review leaves a verdict the loop can read

The review step's output tells approval from findings and names the commit it covers.

- [ ] the review posts a comment on the PR whose first line is a fixed word for approval or for findings, plus the commit it covers
- [ ] the loop reads that comment back; you can show it telling the two apart
- [ ] the review does not depend on formally approving the PR: it works when the reviewer and the author are the same account

### 4. One outcome per PR

Every candidate gets exactly one of review, patch, or wait for a person.

- [ ] a PR with no verdict covering its current head commit gets a review
- [ ] a PR with findings, a failing check or a conflict with main gets a patch (if you skip the conflict case, say so)
- [ ] a PR with a clean verdict on the current head, green CI and no conflict is left for a person, and the tick's summary shows it as waiting
- [ ] your tick's summary lists each PR with its one outcome, and no PR appears under two

### 5. A patch sends the PR back to review

An old verdict stops counting once the head moves.

- [ ] after the patch step pushes a commit, the earlier verdict no longer covers the head
- [ ] the next tick reviews the new head instead of patching again on the old findings
- [ ] you can show the sequence in the PR's history: review, patch, review

### 6. A cap, then a person

A PR that will not converge is flagged and left alone.

- [ ] the cap is a number you can find in the loop's instructions or code (our demo shows 3 rounds; yours can differ)
- [ ] force a PR that cannot be fixed: after the cap, the PR carries a marker (a label or a comment) that says a person is needed
- [ ] the next ticks skip the flagged PR, and the summary lists it as flagged instead of acting on it
- [ ] remove the marker by hand: the loop treats the PR as a candidate again

## Whole-exercise check

- [ ] every file, command and workflow your loop names exists in the repo (or the loop says it creates it)
- [ ] run two ticks in a row on an unchanged PR: the second tick does nothing new to it
- [ ] your names for the steps are ones you chose

## Go further on your own

- Make the cap different per trigger (findings, red CI, conflict), and note what you would change if CI is slow.
- Compare how another factory in [options.md](options.md) decides when a review starts with your commit-keyed verdict.
- Pick a destination from [where it goes from here](options.md#where-it-goes-from-here) and write down what you would
  need to change to try it.
