# Exercise: make your plan look first

**Goal:** a planning step of your own that reads the code, writes a design, stops for your approval, and only then writes
tasks you can check against real files.
**You need:** a repo that already has some code, an AI coding agent of your choice, and the planning step you built in
lesson 1 (or any way of turning a request into tasks). Name no required tool; any agent, language or runner works.

Our demo uses Bun and Claude Code; you do not need either. Describe the outcomes in whatever tools you picked.

## Outcomes

1. The plan reads the code before it proposes anything.
2. The plan writes a design that names what it reuses and what it could break.
3. The plan stops for approval before it creates any task.
4. On a small feature, the tasks it writes name real files.

Try it on a small feature in a repo that already has code, so there is something to reuse and something to break.

## Done when

- [ ] before it proposed anything, your plan looked at the existing code (you can point to where)
- [ ] the design names at least one thing it reuses and at least one thing it could break, with who depends on it
- [ ] the plan stopped and waited, and no task existed until you approved
- [ ] every file a task names exists in the repo (or the task says it creates it)
- [ ] your names are ones you chose

## Go further on your own

- Ask the plan a question the code can answer and check that it looks instead of asking you.
- Reject a design and see what the plan does next.
- Compare your design's wording with what another factory in [options.md](options.md) shows for the same stage.
