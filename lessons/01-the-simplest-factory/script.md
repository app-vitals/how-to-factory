# Script: The simplest factory

Narrated by Dan over the slides (face cam bottom right). Slides hold labels; this file holds the words.
Demo beats are numbered steps; [run-of-show.md](run-of-show.md) points at them. Seven beats.

Framing rule for every part: the concept first (tool-neutral), then "in our demo we use...", then "yours can be
anything". Bun and Claude Code are our demo choices, never requirements.

1. **What a factory is and what we build.** A factory turns a request into a reviewed change. Show the factory map
   slide: eleven components in [docs/components.md](../../docs/components.md), today we touch planning and
   execution, plus a loop. We build the most basic version of each, live. Nothing here is the standard; `factory/`
   is our demo.
2. **DEMO plain agent.** In an empty scratch repo, ask an AI coding agent (ours is Claude Code) for a small change
   (e.g. "add a `greet(name)` function with a test"). Let it plan and edit. Point out: this works, and it is the
   simplest factory. What is missing is repeatability: you re-explain the process every time.
3. **DEMO plan, then the todo list.**
   - Concept: a request becomes small todos with acceptance criteria and dependencies.
   - In our demo we use a markdown skill, [`factory/skills/plan/SKILL.md`](../../factory/skills/plan/SKILL.md).
     Run it on a two-sentence spec and show it write `factory/todos.json`; open the file and show one entry's
     fields (see [`factory/README.md`](../../factory/README.md)).
   - Yours can be anything: a pasted prompt, a planning mode, a person.
   - One line: trackers and issues are the usual queue; `todos.json` is the portable stand-in.
4. **DEMO dev-task on one todo.**
   - Concept: one todo, worked in isolation, checked, ending in a pull request and a recorded status.
   - In our demo we use [`factory/skills/dev-task/SKILL.md`](../../factory/skills/dev-task/SKILL.md). Run it on one
     todo id. Narrate: status goes to `in_progress`, a worktree is created, tests run, a PR opens, status becomes
     `pr_open`.
   - Yours can be anything: any agent, language, test runner or isolation method.
5. **DEMO the loop runs the rest.**
   - Concept: while a todo is ready, run execution on it; stop when none is or one fails.
   - In our demo we use [`factory/loop.ts`](../../factory/loop.ts) (`bun factory/loop.ts`): pick the next `pending`
     todo whose dependencies are `done`, run the agent headlessly, re-read the file, repeat. Show it ending with open
     PRs.
   - Yours can be anything: a shell loop, a cron job, a queue worker; the agent command is configuration.
6. **You review and merge.** Open the PRs and the updated todos. You review and merge them yourself; nothing in this
   factory does it for you. Say what is deliberately missing: no automated review, no merge, no verification gate
   beyond the project's own tests. Those are later components, and the loop picks them up in an order we leave open.
   **Names slide:** `plan` and `dev-task` are just the names used in this sample. Show the "what other factories
   call it" table (from [options.md](options.md), a sourced slide, not a live demo): Claude Code and Cursor say plan
   mode, Cursor and Copilot say cloud agent, OpenHands says sandbox. Name yours anything.
7. **Exercise hand-off.** Point at [exercise.md](exercise.md): build your own plan, dev-task and loop in your own
   repo, with an AI coding agent and language of your choice. Closing line: later components get picked up by the
   loop, and the order is left open.
