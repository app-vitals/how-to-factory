# Run of show: Lesson 1, The simplest factory

The single filming sequence: slide range, then demo, then slide range. Slide numbers are 1-based positions in
[deck/index.html](deck/index.html). Every demo beat names the [script.md](script.md) step it performs.

| # | Slides | Demo beat | Script step | Notes |
|---|---|---|---|---|
| 1 | 1-3 | | 1 | Factory map (planning, execution and loop glow), then what we build. Say `factory/` is our demo, not the standard |
| 2 | 4 | DEMO plain agent | 2 | Empty scratch repo, one small change |
| 3 | 5-6 | | 3 | The simplest factory is a chat; skills are markdown. Concept first, then "our demo", then "yours can differ" |
| 4 | 7 | DEMO the plan skill | 3 | Run on a two-sentence spec, write `factory/todos.json` |
| 5 | 8 | | 3 | Todo status flow |
| 6 | 9 | DEMO the todo list | 3 | Open todos.json, show one entry's fields |
| 7 | 10 | DEMO the dev-task skill | 4 | One todo to worktree to PR; check PR and todo status |
| 8 | 11 | | 5 | The loop diagram: pick ready todo, run agent, re-read, stop when none |
| 9 | 12 | DEMO the loop | 5 | `bun factory/loop.ts`, ends with open PRs |
| 10 | 13-14 | | 6 | You review and merge; say what is deliberately missing. Names table is a sourced slide, not a demo |
| 11 | 15-16 | | 7 | Where factories take it, then the exercise hand-off |
