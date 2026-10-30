# Exercise: make the loop explain itself

**Goal:** a loop of your own that leaves a record of every tick, gives every candidate and every skipped run a reason a
person can read, and shows what is next, what ran and what finished in a view you can open before you read any code. The
view answers three questions: why has no PR been made for this task, why has this PR not been reviewed, why has this PR
not been patched.
**You need:** the loop from lessons 1 to 4 (a task queue, PRs, review, patch and a round cap), a few tasks and open PRs for
it to work on, an AI coding agent of your choice, and some way to show a page or table of results (a web page, a terminal
table or a file all count). Name no required tool; any agent, language, store or scheduler works.

Our demo uses Bun, a JSONL file and a small local web server; you do not need any of them. Describe the outcomes in whatever
tools you picked.

Try it on a scratch repo with a short task list and a few open PRs that give every reason something to say: a task with no
PR yet, a PR with no review, a PR with findings that has not been patched, a PR flagged after the round cap, and one task
that is already finished.

## Outcomes and done-when checks

Each outcome has a check you can make against real ticks, tasks and PRs in your repo. Tick it only when you can point to
the evidence.

### 1. Each tick leaves a record

A tick that did nothing, skipped something or crashed still leaves a trace.

- [ ] after a tick, the record holds one new entry with the start, the end, the item picked, the outcome and any error
- [ ] a tick that picks nothing still writes an entry, and the entry says why
- [ ] force an error in the tick: an entry with the outcome failed and the error text appears, and the next tick still runs
- [ ] the record outlives the process: stop the loop, start it again, and the earlier entries are still there

### 2. Every candidate and every skipped run carries a reason

The reason is a sentence a person can read, and "no work" is not one.

- [ ] every task and PR the loop considers comes back with the item and a reason it was or was not picked
- [ ] the reasons for your three questions are different and specific: a task with no PR, a PR with no review for its current commit, and a PR with findings that has not been patched
- [ ] a PR flagged after the round cap reads as waiting for a person, with the cap in the reason
- [ ] a skipped run in the record stores the same kind of reason, not a blank
- [ ] the reasons come from the loop's own decision logic, not from asking an agent to guess afterwards

### 3. A queue view shows what the loop picks next

You can see what is next, and why each item waits, without opening code.

- [ ] the view lists the candidates in the order the loop would pick them, with the type, the item, how long it has waited and the reason
- [ ] change a task or a PR by hand (open a PR, push a commit, flag one): the view shows the change on the next load
- [ ] answer the three questions by pointing at three rows of this view, one per question

### 4. A log view shows what already ran

One failed or skipped run is easy to find among many.

- [ ] the view lists past runs, newest first, with the outcome and the reason in a detail column
- [ ] you can narrow the list to one outcome (for example skipped or failed) and the other runs drop out
- [ ] run enough ticks that the list is longer than one screen, then find the one failed run by narrowing

### 5. Finished work is still listed after a restart

The history is read from stored state, not kept in the running process.

- [ ] the view lists finished tasks and PRs, with when each started, when its PR opened and when it merged
- [ ] restart the process that serves the view: the same finished work is still listed
- [ ] after you run your loop on a few tasks, the list shows the full history of those tasks, each with its PR

### 6. Every item links to its record

You find the row, then the PR is one click away.

- [ ] a task id in any view links to its record, and a PR in any view links to the PR
- [ ] a run row in the log links to the item it worked on
- [ ] one helper builds the links for all three views, and you can show it

## Whole-exercise check

- [ ] every file, command and page your loop names exists in the repo (or the loop says it creates it)
- [ ] ask the three questions of the view with the code closed, and answer each from a reason on screen
- [ ] your names for the pages and the record are ones you chose

## Go further on your own

- Add a row to the record for a tick that found nothing to do, and note what that does to the log's length.
- Compare how another factory in [options.md](options.md) shows work that is waiting with your queue view.
- Pick a destination from [where it goes from here](options.md#where-it-goes-from-here), such as stall detection or cost
  per run, and write down what you would need to add to the record to try it.
