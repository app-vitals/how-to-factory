# Lesson 2: A plan that looks before it slices

**Component taught:** [Planning / decomposition](../../docs/components.md), in the Work in band: what a plan session does between a brief and a queue of tasks
**Video:** _added after publishing_

`factory/` in this repo is our demo. This lesson teaches the concept; Bun and Claude Code are what the demo happens to
use, never what you need. Each part below goes concept first, then "in our demo we use...", then "yours can be
anything".

## Names for this

In this lesson ours is the `plan` skill, with the design as a step inside it. Other factories call the step Plan mode
(Claude Code, Cursor, Copilot), Spec Mode (Factory) or a planning agent (OpenHands). Each term is sourced and dated in
[options.md](options.md#what-other-factories-call-it). Call yours whatever you like.

## The concept

A plan that slices straight from a request produces tasks that ignore what the code already has. A plan that first
reads the code, writes a short design, and gets a person to approve that design before any task exists produces tasks
that fit the code. Lesson 1's plan did the last step only: it sliced. This lesson adds the steps in front of it.

This lesson also adds a small follow-up segment at the start: lesson 1's loop, run for real on a small task, so the
loop is proven from a task to an open PR before we change what feeds it.

## What changes in the loop

The loop now consumes tasks that are grounded in the code and come from a design a human approved. The loop itself does
not change.

## The simplest thing that works

An agent that is told: look at the repo first, write a short design, stop and wait, and only then write tasks.

- **Understand:** ask only what the code cannot answer, explore the repo, find what can be reused, decide where the
  change goes.
- **Decide:** name complexity risks, name breaking changes together with their consumers, research only when something
  is unclear, and get a hard human approval of the design before any task is written.
- **Slice:** turn the approved design into tasks, as lesson 1's plan does today.

- **In our demo we use:** a markdown skill, [`factory/skills/plan/SKILL.md`](../../factory/skills/plan/SKILL.md), that
  the factory itself upgrades live on camera. Nothing about that upgrade is queued ahead of time.
- **Yours can be anything:** a prompt you paste, a planning mode, a script, a person who reads the code and writes the
  design by hand. What matters is the order: look, design, approval, then tasks.

## What the design contains

A short document, not a spec. Four parts:

- **Approach**: where the change goes and what it reuses.
- **Rejected alternatives**: what was considered and why not.
- **Risks**: anything complex or uncertain.
- **Breaking changes with their consumers**: what could break, and who or what depends on it.

## The live beat

The existing factory plans and runs its own upgrade of the plan skill, on camera. We ask it for the upgrade; it explores
the repo, writes a design, and stops. A person approves the design. Only then does it slice tasks, and the loop builds
them. The upgrade is not queued by a plan session and is not prepared in `factory/` beforehand: the factory is asked,
plans it, and builds it during the run.

## Build steps

Numbers match [script.md](script.md).

1. Follow-up: run lesson 1's loop for real on a small task (steps 1-2).
2. Concept: why look before slicing, and what the design holds (steps 3-4).
3. How the field differs (step 5).
4. Live: the factory plans its own upgrade of the plan skill and stops for approval (step 6).
5. Approve, slice and let the loop build it (step 7).
6. Names, where factories take it, the exercise (steps 8-9).

## How the field does it

Details, sources and as-of dates live in [options.md](options.md); product-by-product cells live in the
[landscape matrix](../../landscape/README.md).

| Approach | Example | Pick this if |
|---|---|---|
| Read-only plan mode, one person approves, same session builds | Plan modes in Claude Code, Cursor, Copilot, Devin, Factory | You work one change at a time in one session |
| Plan written to a file, handed to a second agent | OpenHands planning agent example | You want a plain file as the handoff |
| Plan split into units by a coordinator | Devin managed sessions, Factory Missions, Claude Code `/batch` | The change is large and parts are independent |
| Plan becomes tickets in a tracker | Devin PRD-to-tickets recipe, Copilot issue drafts | Your queue already lives in a tracker |

## Where factories take it

Described, not prescribed. Factories point toward coordinators that split a plan and run the pieces in parallel,
tracker tickets as the output, and a check standing in for the human approval. See
[options.md](options.md#where-it-goes-from-here).

Out of scope here, each owned by another lesson: proving and test planning (the verification lesson), how a spec gets
written (a later intake lesson), a shared standards file the plan reads (the instructions-and-standards lesson), and
bundling, estimates and model tier per task (a later planning lesson). Order stays open.

## Exercise and go further

See [exercise.md](exercise.md).

## Files

- [brief.md](brief.md): the one-page lesson brief
- [script.md](script.md), [options.md](options.md), [exercise.md](exercise.md)
