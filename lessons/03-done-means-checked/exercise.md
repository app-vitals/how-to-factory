# Exercise: make done mean checked

**Goal:** a build step of your own that reads each task's test line, writes a failing test for every acceptance
criterion first, runs the repo's own checks, never loosens a test to get green, fixes failures inside a cap, shows what
ran and what happened, and ends at a gate the agent cannot talk past.
**You need:** a repo with a test runner and a CI service of any kind, an AI coding agent of your choice, tasks that carry
a test line and acceptance criteria (from the planning step you built in lesson 2, or written by hand), and the build
step you made in lesson 1. Name no required tool; any agent, language or runner works.

Our demo uses Bun and Claude Code; you do not need either. Describe the outcomes in whatever tools you picked.

Try it on a small task with at least two acceptance criteria, one of them user-facing (a page, a command or an endpoint
a person would use). That gives the checks something to run and the gate something to block.

## Outcomes and done-when checks

Each outcome has a check you can make against real files and runs in your repo. Tick it only when you can point to the
evidence.

### 1. A test line before building starts

The task states which test proves it before the agent writes code.

- [ ] the task carries a test line, and you can point to where it is read before building starts
- [ ] a task marked "none needed" has a reason on record that you accepted
- [ ] a task whose line names a layer (unit, integration) got a test at that layer

### 2. Criteria become tests, written first

Each acceptance criterion has a test that failed before the code that satisfies it existed.

- [ ] every criterion maps to at least one named test that exists in your repo
- [ ] you can show a run of each new test failing, dated before the commit that adds the code
- [ ] a test that passed on its first run was rewritten, and you can see the rewrite

### 3. The repo's own checks before done

The agent runs the repo's install, lint, typecheck and test commands and reports each outcome.

- [ ] the commands are listed in a file the agent reads, and each one runs when you paste it into a terminal
- [ ] the report names each command and its outcome (pass, fail, skipped, timed out)
- [ ] break one check on purpose (a lint error): the report shows it failing, not "all green"

### 4. No test weakened to get green

A failing test is fixed in the code, and a test changes only with a stated reason that the criterion changed.

- [ ] induce a failure in a new test: the fix is in the code, and the test's assertions are the same before and after
- [ ] if a test did change, the change comes with a one-line reason that names the criterion
- [ ] a flaky test, if you hit one, was flagged for a person instead of skipped silently

### 5. A bounded loop

A failing check sends the agent back with the failure log and what earlier attempts tried, and the loop stops at a cap.

- [ ] the cap is a number you can find in the step's instructions
- [ ] on the second attempt the agent's input includes the first attempt's log and a line saying what it tried
- [ ] force a failure that cannot be fixed: the loop stops at the cap and hands the log to you, rather than continuing

### 6. A fresh check of the criteria

A separate check, given only the criteria and the diff, marks each criterion MET, PARTIAL or NOT MET.

- [ ] the check was given the criteria and the diff and nothing from the builder's reasoning (you can show its input)
- [ ] it returned one status per criterion, and anything not MET went back to be fixed
- [ ] remove the code for one criterion on a branch: the check reports it as NOT MET

### 7. Run the app where it matters

For a user-facing criterion, the app is started and the path exercised, with the output attached.

- [ ] the start command exists in your repo and runs by itself
- [ ] the output of exercising the path (a response, a log or a screenshot) is attached to the PR
- [ ] a criterion with no user-facing behavior says it skipped this and why

### 8. Evidence, not a claim

The PR shows what ran and what happened, in a form a person can read without opening the logs.

- [ ] the PR has a table with one row per criterion and one row per check, each with an outcome
- [ ] a check that did not run shows as skipped with a reason, not as passed
- [ ] you can tell from the table alone which checks ran

### 9. A gate that binds

A CI job runs the repo's checks, and the main branch cannot be merged while it is red.

- [ ] a CI workflow runs the same validate command you run locally, and its file exists in your repo
- [ ] a rule on the main branch requires that job before merge, and you can see the rule in your settings
- [ ] open a PR with a failing check: the merge is blocked until it is fixed

## Whole-exercise check

- [ ] every file, command and workflow your step names exists in the repo (or the step says it creates it)
- [ ] your names for the steps are ones you chose

## Go further on your own

- Make the loop's cap different per check, and note what you would change if a check is slow.
- Compare your fresh check's wording with what another factory in [options.md](options.md) shows for the same stage.
- Pick a destination from [where it goes from here](options.md#where-it-goes-from-here) and write down what you would
  need to change to try it.
