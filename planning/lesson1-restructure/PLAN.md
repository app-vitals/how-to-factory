# Plan: lesson1-restructure (prefix LRS)

Repo: app-vitals/how-to-factory. Focus: lesson 1 (`lessons/01-the-simplest-factory`).

## Direction (Dan, Slack)
- Human chats with an agent and explores, then runs a plan session (human-triggered, interactive). The chat is part of plan, not a separate demo or slide.
- Plan writes `factory/todos.json`; the loop runs dev-task per todo; the human reviews PRs. Dev-task is triggered by the loop.
- Lesson flow: concept (inputs/steps/outputs, generalized, with how the field differs) then a build-only demo, for plan, dev-task and loop. Plan and dev-task demos are us writing the skills; nothing is run on camera, and there is no end-to-end demo (that is lesson 2).
- Then: why we loop (our opinion), how it all works together (slide only), next lesson. Keep the factory map, what-we-build and what-the-human-does slides.
- Students build plan, dev-task and the loop in the exercise and run it end to end themselves.
- Call out where other factories differ (sourced only); the loop is our opinion and is labelled so.
- Demo label text smaller and simpler.

## Design
No schema or `loop.ts` change. `factory/` already supports human-triggered plan plus loop-driven dev-task.

- **Landscape matrix:** add a fourth component `loop` ("What starts the next run") to `ComponentId`, checker, renderer and tests. `intake` cells already say what starts a session; `loop` is about what starts the next one (schedule, routine, queue worker). Every product gets a loop cell, sourced from a first-party page or omitted with a reason. Never filled from memory.
- **How the field differs:** the deck rules cap captions at 12 words and one idea per slide, so each concept gets its own short "how the field differs" slide with a comparison table (vendor, as-of date), data copied from `options.md`. Wording must be "no sourced planning stage", never "has no planning stage": the matrix only supports the former.
- **Plan skill input:** conversation context (or a file if given), not "a short spec".
- **Deck (target about 18 slides):** title; factory map; what the human does (chat+explore, run plan, review PRs); what we build (Chat, Plan, Todo list, Loop, Dev-task, PRs, You review); plan concept; plan differs; DEMO write the plan skill; todo list (schema slide, not a demo); dev-task concept; dev-task differs; DEMO write the dev-task skill; loop concept; loop differs; DEMO write the loop; why we loop (our opinion); how it works together (contrast with human/event-starts-each-session); next lesson; names; where factories take it; exercise.
- Standalone chat slide and chat demo, the todo-list demo, and the manual dev-task run are removed.
- Pre-filming: run the skills end to end once yourself (they are only tested by students on camera-free time).

## Tasks
| ID | Title | Deps | Model | Branch |
|---|---|---|---|---|
| LRS-1.1 | feat: add loop dimension to landscape matrix | none | sonnet | feat/lrs-1-1-landscape-loop |
| LRS-1.2 | docs: add what-starts-next-work rows to options and README | 1.1 | sonnet | docs/lrs-1-2-options-loop-rows |
| LRS-1.3 | chore: shrink demo label in deck.css | none | haiku | chore/lrs-1-3-demo-label |
| LRS-2.1 | docs: take conversation context as plan skill input | none | haiku | docs/lrs-2-1-plan-skill-input |
| LRS-2.2 | docs: restructure lesson 1 script, README and exercise | 1.2, 2.1 | sonnet | docs/lrs-2-2-lesson-restructure |
| LRS-3.1 | docs: rework lesson 1 deck and run-of-show | 1.2, 1.3, 2.2 | sonnet | docs/lrs-3-1-deck-rework |

```
[START]
  ├─ LRS-1.1 ─ LRS-1.2 ─┐
  ├─ LRS-2.1 ───────────┼─ LRS-2.2 ─┐
  └─ LRS-1.3 ───────────────────────┴─ LRS-3.1 (also needs 1.2)
```

## Breaking Change Safety
Adding `loop` to `ComponentId` makes the key required on every product, so LRS-1.1 adds every product's loop cell in the same PR (atomic). Nothing else renames or removes an interface. The deck removals touch only `lessons/01-*/deck/index.html` and `run-of-show.md`, updated together in LRS-3.1. All tasks: safe to deploy standalone.

## HITL
None. `factory/skills/*` is edited via its real path, not `.claude/**`.
