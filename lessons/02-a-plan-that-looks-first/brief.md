# Lesson brief: A plan that looks before it slices

> Agreed before any work is queued. One page. See [docs/lesson-playbook.md](../../docs/lesson-playbook.md).
> Scoping rule: lesson 1 explains plan and dev-task, builds the most basic version of each live, and runs a simple
> loop that ends at open PRs (a person reviews and merges). Every later lesson adds ONE component to the existing loop
> and ends with the loop doing a little more. Each lesson is about the size of lesson 1. Order stays open. `factory/`
> is our demo; the lesson stays tool-neutral. The lesson's plan session queues lesson material only (brief, script,
> deck, exercise, options, run-of-show), never `factory/` changes: the factory builds `factory/` live.

## Component taught and band

[Planning / decomposition](../../docs/components.md), in the **Work in** band. The lesson zooms into spec to plan: what a
plan session does between a brief and a queue of tasks.

## The one idea

A plan that reads the code and gets its design approved before slicing yields tasks that fit what already exists.

## Scope test

Does a single agent need it for a single flow? Yes, in a small form. Any agent that works on an existing codebase
produces better work from a plan that has looked at that code first. The heavier forms (estimates, bundling, model tiers)
are destinations: mentioned, not taught.

## In scope

- **Understand:** clarify inside the session, explore the code, find what can be reused, decide where the change goes.
- **Decide:** name complexity risks, name breaking changes together with their consumers, research only when something is
  unclear, and get a hard human approval of the design before any task is written.

## Out of scope

- Proving and test planning (which test layers apply, what each task adds or retires): owned by the verification lesson.
- How a spec gets written (the spec stays an input here): owned by the later intake / spec lesson.
- A shared standards file the plan reads first: owned by the instructions-and-standards lesson.
- Bundling tightly coupled tasks, estimates and model tier per task: owned by an unscheduled later planning lesson.

## The sample's concrete steps

1. Take the brief or conversation as input.
2. Ask only what the code cannot answer.
3. Explore the repo.
4. Write a short design: approach, rejected alternatives, risks, and breaking changes with their consumers.
5. A human approves the design.
6. Slice into tasks, as lesson 1's plan does today.

## What the factory builds in this lesson

The existing factory plans and runs its own upgrade of the plan skill live on camera, with nothing pre-queued in
`factory/`. No plan session queues this work: the factory is asked, plans it, and builds it during the lesson run.

## Prerequisites

- Lesson 1: the plan and dev-task skills and the task loop.

## Exercise outcomes

- The plan reads the code before it proposes anything.
- The plan writes a design that names what it reuses and what it could break.
- The plan stops for approval before it creates any task.
- On a small feature, the tasks it writes name real files.

## Loop delta

**What does the loop do after this lesson that it could not before?**

Two things. First, the loop is proven end to end: it runs for real, from a task to an open PR. Second, the loop consumes
tasks that are grounded in the code and come from a design a human approved.

The opening segment runs lesson 1's loop for real on a small task, as narration only with nothing pre-queued. It is
listed as a follow-up segment, not as part of this lesson's core scope.

**Is this about the size of lesson 1?** (explain the thing, build the most basic version live, students build their own)

Not tested in this pass.
