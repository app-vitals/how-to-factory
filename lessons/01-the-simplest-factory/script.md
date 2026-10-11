# Script: The simplest factory

Narrated by Dan over the slides (face cam bottom right). Slides hold labels; this file holds the words.
Demo beats are numbered steps; [run-of-show.md](run-of-show.md) points at them.

## Talking points

1. **What a factory is.** A factory turns a request into a reviewed change. Show the factory map slide: eleven
   components in [docs/components.md](../../docs/components.md), today we touch three: intake, planning, execution.
   Everyone ends up with a version of each, from one person in a chat window to a scheduled pipeline.
2. **What we build today.** A request becomes todos, a todo becomes a pull request. Two markdown skills, one JSON
   file ([`factory/todos.schema.ts`](../../factory/todos.schema.ts) defines it). Nothing runs on a schedule yet.
   The ACP harness and the loop are built on camera in later lessons; they are not pre-built.

## Demo beats

3. **DEMO plain Claude Code.** In an empty scratch repo, ask Claude Code for a small change (e.g. "add a
   `greet(name)` function with a test"). Let it plan and edit. Point out: this works, and it is the simplest
   factory. What is missing is repeatability: you re-explain the process every time.
4. **DEMO the plan skill.** Show [`factory/skills/plan/SKILL.md`](../../factory/skills/plan/SKILL.md): a markdown
   file with a few numbered steps. Install it where Claude Code reads skills (copy the folder into your project's
   `.claude/skills/`). Run it on a two-sentence spec. Show it write entries to `factory/todos.json`.
5. **DEMO the todo list.** Open the generated `factory/todos.json`. Walk the fields from
   [`factory/README.md`](../../factory/README.md): id, acceptance criteria, status, dependencies, branch. Run
   `bun test factory` to show the schema check passes. The todo list is the queue.
6. **DEMO the dev-task skill.** Show [`factory/skills/dev-task/SKILL.md`](../../factory/skills/dev-task/SKILL.md).
   Run it on one todo id. Narrate: status goes to `in_progress`, a git worktree is created, tests run, a PR opens,
   status becomes `pr_open`.
7. **Check the result.** Open the PR and the updated todo. Say what is deliberately missing: no review, no merge,
   no verification gate beyond the project's own tests. Those are later components.
8. **Preview the harness (slides only, no build).** One architecture slide: chat message in, agent runtime, our
   skills, todos file, GitHub. "We build this on camera in later lessons; none of it exists yet."
9. **DEMO the same job in another factory.** Use one of the demoable entries in the
   [landscape matrix](../../landscape/README.md) (see [options.md](options.md)): OpenHands is MIT-licensed and
   self-hostable; Devin lists a free tier; Cursor cloud agents need a paid plan. Pick whichever you can run
   on camera that day. Give it the same two-sentence spec. Do not rank them; point out that the stages are the same
   and only the names and where it runs differ.

## Names for this

Say it out loud, twice: `plan` and `dev-task` are just the names used in this sample. Show the "what other
factories call it" table slide (from [options.md](options.md)): Claude Code and Cursor say plan mode, Cursor and
Copilot say cloud agent, OpenHands says sandbox. You can name yours `feature-dev`, `build`, anything. The
harness will take the skill name as configuration.

## Exercise hand-off

Point at [exercise.md](exercise.md): build your own planning skill and execution skill in your own repo, with only
Claude Code and Bun installed. Name them whatever you like.
