# Exercise: make the review worth reading

**Goal:** a review and a patch of your own that replace the stubs from lesson 4. The review posts only graded findings
that point at the PR's own change, and its verdict follows from them. The patch checks each finding before it edits, can
reject a wrong one with a record, and a round that changes nothing stops the loop and flags a person.
**You need:** the loop from lesson 4 (anything that reads open PRs and picks review, patch or a person), a GitHub repo with
a few open PRs and a CI result on them, a rules file in that repo (any name, any format), an AI coding agent of your
choice, and a review step and a patch step you can change. Name no required tool; any agent, language, scheduler or API
client works.

Our demo uses Bun and Claude Code; you do not need either. Describe the outcomes in whatever tools you picked.

Try it on a scratch repo with these open PRs: one whose change has a real bug and some nits, one that moves old code
without changing it, one that a reviewer is likely to flag wrongly (a guard the next function depends on), one with a
flaky or red check, and one that the base branch itself breaks. That gives every outcome something to act on.

## Outcomes and done-when checks

Each outcome has a check you can make against real PRs and runs in your repo. Tick it only when you can point to the
evidence. The thresholds and caps are yours to choose; our demo's numbers are choices, not rules.

### 1. Only findings worth acting on are posted

The review grades what it finds and posts the part that clears a bar.

- [ ] every candidate finding carries a severity and a confidence (any scale you chose), and you can show them
- [ ] a finding below your threshold is not posted, and you can show it was dropped and why
- [ ] a PR with more findings than your count cap posts at most the cap, the highest graded first
- [ ] a finding on code the PR did not change (the moved-code PR) is dropped before posting

### 2. Findings are judged against the repo's own rules, with evidence

The review reads what this repo chose and shows where it looked.

- [ ] the review reads the repo's rules file, and you can show where it is read in
- [ ] every posted finding names a file and a line
- [ ] a finding with no location is dropped as unverifiable
- [ ] add a rule that endorses a pattern the review used to flag: the next review no longer flags it

### 3. The verdict is computed, and the label cannot disagree with it

The words on the PR follow from the findings, not from how the model felt.

- [ ] a function you wrote, not the model, turns the surviving findings into a verdict
- [ ] a check before posting refuses a label that contradicts that verdict (try a clean review under a findings label)
- [ ] the review works when the reviewer and the author are the same account, and never requests changes on it

### 4. A re-review reads only what changed

After a patch the review looks at the new diff and accounts for the earlier findings.

- [ ] the re-review is given the earlier findings and only the diff the patch added
- [ ] earlier findings are not posted again
- [ ] for each earlier finding the re-review says fixed, rejected or still there, and you can show all three on real PRs

### 5. The patch checks a finding before it edits

A wrong finding does not become wrong code.

- [ ] for each finding the patch records accept, modify or reject before it touches a file
- [ ] on the wrong-finding PR the patch reads the caller and rejects the finding, with no edit made for it
- [ ] a finding that names one line but describes a class of bug (modify) gets every instance fixed, or the patch says why not

### 6. A rejected finding ends the loop

A no from the patch is a record, not a dead end.

- [ ] a rejected finding gets a short reasoned reply on the PR
- [ ] a record marks the finding settled, and the review and the verdict function both read it
- [ ] the next review does not raise the rejected finding again, and the loop ends without hitting the round cap
- [ ] change the code under the rejected finding by hand: the review may raise it again (a settled record is not forever)

### 7. Red CI is triaged before it is fixed

The patch does not repair someone else's breakage.

- [ ] before editing for a red check, the patch looks at whether the base branch's latest run is red too
- [ ] on the PR the base branch breaks, the patch flags a person and leaves the PR's files alone
- [ ] a cancelled run is rerun, and the patch makes no edit if it then passes (if you skip the rerun, say so)
- [ ] the patch never weakens or removes a test to get green

### 8. A round that changes nothing stops the loop

The loop notices when it is going in circles.

- [ ] before and after each round you record the PR's head commit, open findings and CI result
- [ ] on the flaky-check PR a second round leaves all three unchanged, and the loop flags a person at that point
- [ ] the flag is the same marker as the round cap's, and flagged PRs are skipped by later ticks
- [ ] your round cap still exists behind it; you can find the number and show the cap alone would have taken longer
- [ ] remove the marker by hand: the loop treats the PR as a candidate again

## Whole-exercise check

- [ ] every file, command and workflow your loop names exists in the repo (or the loop says it creates it)
- [ ] run two ticks in a row on an unchanged PR: the second tick does nothing new to it, and posts no repeat findings
- [ ] your tick's summary shows the new reasons (finding dropped, finding rejected, no progress) next to each PR
- [ ] your names for the review gate, the verdict check and the settled record are ones you chose

## Go further on your own

- Add a fresh-context verifier: a second agent given only the finding and the code, never the first agent's reasoning,
  that drops findings it can disprove. Note what it caught that the first review missed.
- Compare how another factory in [options.md](options.md) grades findings or limits rounds with your threshold and cap.
- Pick a destination from [where it goes from here](options.md#where-it-goes-from-here) and write down what you would
  need to change to try it.
