# Exercise: make your plan look first and slice safely

**Goal:** a planning step of your own that reads the code, states its assumptions, names what the change could break,
stops for your approval of a saved design, and only then writes tasks that are each safe to ship alone.
**You need:** a repo that already has some code, an AI coding agent of your choice, a task queue of any kind (a file, a
board, a list), and the planning step you built in lesson 1 (or any way of turning a request into tasks). Name no required
tool; any agent, language or runner works.

Our demo uses Bun and Claude Code; you do not need either. Describe the outcomes in whatever tools you picked.

Try it on a feature that renames or removes something in a repo that already has code, and that has at least one consumer
outside the obvious source files (a script, a workflow, a scheduled job). That gives the plan something to reuse and
something to break.

## Outcomes and done-when checks

Each outcome has a check you can make against real files in your repo. Tick it only when you can point to the evidence.

### 1. Clarify, then state assumptions

The plan asks only what the code cannot answer, and records what is left as visible assumptions.

- [ ] every question the plan asked is one the code could not answer (you checked each against the repo)
- [ ] the saved design has an Assumptions section, and it appeared in front of you before you approved

### 2. Layered exploration with reuse

The plan reads the code in layers and names what it reuses and what is new or modified.

- [ ] the design lists at least one thing it reuses, as a real path that exists in your repo
- [ ] the design lists what is new or modified, and every modified path exists
- [ ] the plan's own record shows it read files in more than one layer (for example logic and data), not only the one
  the request names

### 3. Complexity risks

The plan lists risks found while exploring, and says what it does about each.

- [ ] the design has at least one flagged risk that points to a real file or module
- [ ] each risk is either addressed in the design or marked as accepted

### 4. Breaking-change scan

For a renamed, removed or constrained interface, the plan lists every consumer it found and checks real data before a
migration.

- [ ] the consumer list came from a search, not recall: you can name the search the plan ran, and it covered code,
  config, workflow files and scripts
- [ ] you ran the same search yourself and found no consumer the plan missed (or the plan now lists it)
- [ ] if any task changes stored data, its acceptance criteria include a query against real values, and you can see
  the query's output

### 5. Saved design, linked from every task

The approved design lives in one file, and every task points to it.

- [ ] the design is in a single file at a path that exists in your repo or docs
- [ ] the file's text matches what you approved, word for word, not a regenerated summary
- [ ] every task in the queue carries a link or path to that file, and the path resolves

### 6. Hard approval

The plan stops for approval of the design before it creates any task.

- [ ] the plan stopped and waited, and the queue was empty of this plan's tasks until you approved
- [ ] you rejected or changed the design once, and the plan revised it and asked again instead of continuing

### 7. Slicing: add, migrate, remove

The plan cuts the change into tasks that are each safe to ship, and says so.

- [ ] the removal or rename came out as add, migrate, remove tasks, or as one atomic task that updates every consumer
- [ ] every task states whether it is safe to deploy alone
- [ ] every task states the tests it adds or retires, or says none are needed and why; each named test file or case exists
  in your repo (or the task says it creates it)
- [ ] merge the tasks in order in your head (or on a branch): at no point between two merges does a consumer point at
  something that no longer exists

### 8. Queue awareness

The plan reads the open queue before it files anything.

- [ ] put a task in the queue that overlaps your feature before planning; the plan skipped or referenced it instead of
  filing a duplicate
- [ ] at least one new task lists an already-open task as a dependency, and that id exists in the queue

### 9. Human-only tasks

A task that needs a person is flagged and written as steps for a person.

- [ ] include one step only a person can do (for example adding a secret or a console setting); the plan flagged that
  task, and its description is a list of steps for a person
- [ ] no task an agent would claim depends on a credential or permission it cannot get

## Whole-exercise check

- [ ] every file any task names exists in the repo (or the task says it creates it)
- [ ] your names for the steps are ones you chose

## Go further on your own

- Ask the plan a question the code can answer and check that it looks instead of asking you.
- Compare your design's wording with what another factory in [options.md](options.md) shows for the same stage.
- Pick a destination from [where it goes from here](options.md#where-it-goes-from-here) and write down what you would
  need to change to try it.
