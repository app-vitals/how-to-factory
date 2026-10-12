# Exercise: build your own plan, dev-task and loop

**Goal:** a repo of your own where a planning conversation becomes a todo list, one todo becomes a committed branch (and a PR if
you have a remote), and a loop does that for every ready todo.
**You need:** an AI coding agent of your choice that can run headlessly, any language and test runner, and git. A
GitHub remote and `gh` are optional.

Our demo uses Bun and Claude Code; you do not need either. Describe the outcomes in whatever tools you picked.

## Outcomes

1. A scratch project under git with one commit and at least one passing test.
2. A planning step (skill, prompt, script; name it whatever you like) whose input is your conversation with your
   agent about the work (or a file you point it at) and that produces a todo list file with, at minimum: id, title, acceptance criteria, status, dependencies, branch.
3. A check that the todo list file is valid (any language, any test runner).
4. An execution step that takes one todo id, works it on its own branch in a separate worktree or equivalent
   isolation, runs the project's tests, commits, and updates the todo's status. If you have a remote and `gh`, it
   opens a PR; if not, it stops at the committed branch.
5. A loop that runs the execution step on the first pending todo whose dependencies are done, and repeats until none
   is ready. It stops on the first todo that does not end with an open PR or done.
6. You review and merge the results yourself.

Use [`factory/skills/plan/SKILL.md`](../../factory/skills/plan/SKILL.md),
[`factory/skills/dev-task/SKILL.md`](../../factory/skills/dev-task/SKILL.md) and
[`factory/loop.ts`](../../factory/loop.ts) as references, not templates to copy.

## Done when

- [ ] your todo list file exists and your validity check passes
- [ ] your execution step produced a commit on its own branch in separate isolation
- [ ] your loop worked at least two todos in dependency order
- [ ] your names are ones you chose

You build all three pieces and run them end to end yourself. For a guided end-to-end run, see lesson 2.

## Go further on your own

- Make the execution step refuse a todo whose dependencies are not done.
- Compare your planning step's wording with what another factory in [options.md](options.md) calls the same stage.
