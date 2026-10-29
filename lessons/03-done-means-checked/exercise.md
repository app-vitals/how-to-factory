# Exercise: make done mean checked

**Goal:** a build step of your own that reads each task's acceptance criteria, writes a failing test for every acceptance
criterion first, runs the repo's own checks and shows what ran, never loosens a test to get green, has a separate check
mark each criterion, and ends at a gate the agent cannot talk past.
**You need:** a repo with a test runner and a CI service of any kind, an AI coding agent of your choice, tasks that carry
2 to 5 acceptance criteria (from the planning step you built in lesson 2, or written by hand), and the build step you made
in lesson 1. Name no required tool; any agent, language or runner works.

Our demo uses Bun and Claude Code; you do not need either. Describe the outcomes in whatever tools you picked.

Try it on a small task with at least two acceptance criteria, one of them user-facing (a page, a command or an endpoint a
person would use). That gives the checks something to run and the gate something to block.

## Outcomes and done-when checks

Each outcome has a check you can make against real files and runs in your repo. Tick it only when you can point to the
evidence.

### 1. Criteria become tests, written first

Each acceptance criterion has a test, at the layer that proves it, that failed before the code that satisfies it existed.

- [ ] each task carries 2 to 5 specific, testable acceptance criteria, and you can point to where they are read before building starts
- [ ] one criterion names the test layer and the tests added or retired; a task that needs none says why, and you accepted the reason
- [ ] every criterion maps to at least one named test at the layer it names, and the test exists in your repo
- [ ] you can show a run of each new test failing, dated before the commit that adds the code
- [ ] a test that passed on its first run was rewritten, and you can see the rewrite

### 2. The repo's own checks, with evidence

The agent runs the repo's install, lint, typecheck and test commands and shows what ran and what happened.

- [ ] the commands are listed in a file the agent reads, and each one runs when you paste it into a terminal
- [ ] the PR has a table with one row per criterion and one row per check, each with an outcome (pass, fail, skipped with a reason)
- [ ] break one check on purpose (a lint error): the table shows it failing, not "all green"
- [ ] a failing check goes back with its log and what earlier attempts tried; force a failure that cannot be fixed and the loop stops at a cap you can find in the step's instructions and hands the log to you
- [ ] you can tell from the table alone which checks ran

### 3. No test weakened to get green

A failing test is fixed in the code, and a test changes only with a stated reason that the criterion changed.

- [ ] induce a failure in a new test: the fix is in the code, and the test's assertions are the same before and after
- [ ] if a test did change, the change comes with a one-line reason that names the criterion
- [ ] a deleted, loosened or newly skipped test fails the check unless the task says the criterion changed
- [ ] a flaky test, if you hit one, was flagged for a person instead of skipped silently

### 4. A fresh check of the criteria

A separate check, given only the criteria and the diff, marks each criterion MET, PARTIAL or NOT MET, and for a
user-facing criterion the app is started and the path exercised.

- [ ] the check was given the criteria and the diff and nothing from the builder's reasoning (you can show its input)
- [ ] it returned one status per criterion with a line of evidence, and anything not MET went back to be fixed
- [ ] remove the code for one criterion on a branch: the check reports it as NOT MET
- [ ] for a user-facing criterion, the start command runs by itself and the output of exercising the path (a response, a log or a screenshot) is attached to the PR; a criterion with no user-facing behavior says it skipped this and why

### 5. A gate that binds

A CI job runs the repo's checks, and the main branch cannot be merged while it is red. This is a guardrail on the
agent, set up once per repo and not per task.

- [ ] a CI workflow runs the same validate command you run locally, and its file exists in your repo
- [ ] a rule on the main branch requires that job before merge, you can see the rule in your settings, and it applies to every task without anyone acting per task
- [ ] open a PR with a failing check: the merge is blocked until it is fixed

### 6. Where independence runs out

Three ideas the lesson names and does not build: held-out tests, mutation testing and property-based testing.

- [ ] pick one test the agent wrote and write down what would make it pass for wrong code
- [ ] name which of held-out tests, mutation testing or property-based testing would catch that, and why the agent that wrote the test would not

## Whole-exercise check

- [ ] every file, command and workflow your step names exists in the repo (or the step says it creates it)
- [ ] your names for the steps are ones you chose

## Go further on your own

- Make the loop's cap different per check, and note what you would change if a check is slow.
- Run a mutation tool of your choice on one file of your own tests, and look at one surviving mutant: does it call for a new test, a different test, or deleting code?
- Compare your fresh check's wording with what another factory in [options.md](options.md) shows for the same stage.
- Pick a destination from [where it goes from here](options.md#where-it-goes-from-here) and write down what you would need to change to try it.
