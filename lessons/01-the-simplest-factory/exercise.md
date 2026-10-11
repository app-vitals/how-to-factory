# Exercise: build your own plan and dev-task

**Goal:** a repo of your own where one command turns a short spec into todos, and a second turns one todo into a
committed branch (and a PR if you have a remote).
**You need:** Claude Code and Bun. Git comes with your machine. A GitHub remote and `gh` are optional.

## Steps

1. Make a scratch project: `mkdir my-factory && cd my-factory && git init && bun init -y`, then make one commit.
2. Write a planning skill as a markdown file. Name it whatever you like (`plan`, `breakdown`, `feature-dev`).
   Use [`factory/skills/plan/SKILL.md`](../../factory/skills/plan/SKILL.md) as a reference, not a template to copy.
   It should turn a short spec into entries in `todos.json`.
3. Decide your todo fields. Minimum: id, title, acceptance criteria, status, dependencies, branch.
4. Ask Claude Code to write a small Bun test that validates `todos.json` against your fields.
5. Write an execution skill. Reference: [`factory/skills/dev-task/SKILL.md`](../../factory/skills/dev-task/SKILL.md).
   It takes one todo id, makes a git worktree on a new branch, does the work, runs `bun test`, commits, and updates
   the todo's status. If you have a remote and `gh`, open a PR; if not, stop at the committed branch.
6. Put both skills where Claude Code reads skills (`.claude/skills/<name>/SKILL.md` in your project).
7. Run your planning skill on a two-sentence spec of your own, then your execution skill on the first todo.

## Done when

- [ ] `todos.json` exists and your Bun test passes
- [ ] your execution skill produced a commit on its own branch in a separate worktree
- [ ] your skill names are ones you chose

## Go further on your own

- Add a dependency between two todos and make the execution skill refuse a blocked one.
- Compare your skill text with what another factory in [options.md](options.md) calls the same stage.
