# Plan: how-to-factory (session `how-to-factory`, prefix HWF; HTF was taken by an unrelated shipwright task)

Repo: app-vitals/how-to-factory (private for now; MIT + public later). Focus: **lesson 1**.

## Product intent (from Dan)
- YouTube series teaching how to build a software factory. High-level universal components; students pick their own implementations.
- Shipwright, its origins posts, and other factories are *inputs*, not a prescribed order. Origins is "our evolution", not a syllabus.
- Each lesson: simplest working version of one concept, built live, students build their own. Then show **where each factory takes it** (destinations, non-prescriptive).
- Demo other factories during lessons where possible.
- Lesson 1: overview of what we'll build, then build a simple version live (start with plain Claude Code, then plan + dev-task skills, then harness; the factory eventually builds the factory), then students build their own.
- Stack: TypeScript/Bun. ACP = Agent Client Protocol, backed by Claude Code. Sample result lives in this repo.
- Lesson order is chosen one at a time; only the universal component map needs to be decent now.

- Component and skill names are not canonical: everyone's plan/dev-task will differ and may be named differently (e.g. feature-dev). Show what other factories call them.

## Design
Repo layout:
- `README.md` pitch; `docs/components.md` living vendor-neutral component map (derived from intel `software-factory-components`), each component linked to candidate lessons
- `lessons/README.md` unordered backlog grouped by component; `lessons/_template/` and `lessons/01-*/`
- `landscape/` factory x component matrix; every cell has source URL + as-of date (CI-enforced); includes a "demoable" column
- `factory/` sample factory that grows lesson by lesson; `factory/skills/<name>/SKILL.md` plain-markdown generic skills

Lesson template sections: concept; simplest thing that works; build steps; **how the field does it** (options table); **where factories take it** (destinations, explicitly non-prescriptive); optional tiny maintenance-cron slot; exercise / go further on your own; video link.

NOT queued (built on camera / factory builds itself): ACP harness v0 (Bun client driving Claude Code via the ACP adapter), one-tick loop that dispatches dev-task, lesson rehearsal.

## Tasks
| ID | Title | Deps | Model | HITL |
|---|---|---|---|---|
| HWF-1.1 | Add Bun/TS scaffold, CI and CLAUDE.md | — | haiku | |
| HWF-1.2 | Write universal components doc, README pitch and lesson backlog | — | sonnet | |
| HWF-1.3 | Add landscape matrix with citation checker | 1.1 | sonnet | |
| HWF-2.1 | Write lesson 1 materials and lesson template | 1.2, 1.3 | sonnet | |
| HWF-2.2 | Add v1 generic plan and dev-task skills | 1.1 | sonnet | |
| HWF-2.3 | Link factory skills into .claude/skills | 2.2 | haiku | HITL |

```
[START]
  ├─ HWF-1.1 (no deps) ─┬─ HWF-1.3 ─┐
  │                      └─ HWF-2.2 ─ HWF-2.3 (HITL)
  └─ HWF-1.2 (no deps) ──────────────┴─ HWF-2.1 (needs 1.2, 1.3)
```

Breaking-change safety: all additions in a new repo; safe to deploy standalone: yes.
HITL scan: HWF-2.3 only (`.claude/**`). CI workflow in 1.1 uses no `secrets.*`.

## Decision Log
- Skills location: defaulted to `factory/skills/` canonical + HITL link into `.claude/skills` (CLI blocks agent writes to `.claude/**`).
- Harness/loop unqueued: so they can be built on camera.
- Matrix sourcing: first-party docs only, because factorymode has a history of fabricated citations.
- Naming: added 'also called' to components doc, 'what they call it' to matrix, 'names for this' to template; skill names are renameable sample names.
- Repo hygiene (added after HWF-1.1): no deploy pipeline needed (content repo; /shipwright:merge only, deploy cron off). gitleaks run as a pinned binary, not gitleaks-action, to avoid a net-new org license secret. Branch protection/merge settings are HITL because the agent PAT gets 403 on those endpoints. allow_auto_merge stays off (bundle gate).
- Presentations: each lesson = slides + live demos, Dan narrates over slides with face cam in a screen corner. Format: single-file HTML scroll-snap decks matching intel's Shipwright decks (no build, forkable) over Slidev/reveal.js. Little text, a visual on every content slide, DEMO-cue slides, bottom-right face-cam safe zone (assumed bottom-right, configurable). Enforced by scripts/check-decks.ts in CI (HWF-1.6). Dark theme (matches intel's ridgeline/partner decks), swappable via CSS variables.
- Deck text limits (revised after research, Dan: 40 words/slide too many): max 3 bullets/slide, 8 words/bullet, 8-word titles, no prose, one idea per slide, max 8 nodes per diagram with 3-word labels; narrator speaks, slide holds labels (Mayer redundancy/segmenting/coherence/signaling via Lucidea summary; UCSD presentation guidance: <=4 bullets x <=4 units, image alone when possible). Limits are stricter-than-source defaults, tunable in decks/deck.config.json. Diagram vocabulary in decks/DIAGRAMS.md incl. C4-style architecture zoom and a recurring 'factory map' with the current component highlighted.

---

# Revision: lesson 1 gains the loop (tasks HWF-3.x)

## Intent (from Dan)
- Lesson 1 = what `plan` and `dev-task` do, build the most basic version of each live, then a simple loop over the todos. The loop stops at an open PR; the human reviews and merges.
- `factory/` is our demo. Lessons teach tool-neutral concepts; Bun and Claude Code are demo choices, never requirements. Students use any agent, language and toolchain.
- Everything else (verification, review, release, governance, memory, chat front door, parallel runs, other isolation, schedule/external triggers, live demos of other factories) is pushed to later lessons. Lesson order stays open; each later lesson adds one component the loop picks up.

## Design
- `factory/loop.ts`: pure `pickNext(todos)` (first `pending` todo with all dependencies `done`, else null) plus a `main` that validates `todos.json`, runs the agent headlessly with the execution skill and the todo id, re-reads the file, and repeats. Stops on the first todo that does not end `pr_open` or `done`. One todo at a time. Agent command is configuration; the default's headless flags and tool allow-list are verified against first-party docs (cited, as-of dated) and passed on the CLI, so no `.claude/**` edit.
- Lesson text pattern per part: tool-neutral concept, then "in our demo we use...", then "yours can be anything".
- Seven-beat flow: what a factory is and what we build; plain agent demo; plan skill then the generated todo list; dev-task skill on one todo; the loop runs the rest, ending at open PRs; you review and merge, plus the names slide; exercise.
- Cut: harness preview (replaced by the real loop), live other-factory demo (becomes a sourced slide), separate todo-fields beat (folded into the plan beat), maintenance-cron placeholder.

## Tasks
| ID | Title | Deps | Model | HITL |
|---|---|---|---|---|
| HWF-3.1 | feat: add todo loop script with pickNext selector | none | sonnet | |
| HWF-3.2 | docs: rewrite lesson 1 around the loop | 3.1 | sonnet | |
| HWF-3.3 | docs: update lesson 1 deck and run-of-show for the loop | 3.2 | sonnet | |
| HWF-3.4 | docs: remove tool-specific assumptions from backlog, template and docs | 3.2 | haiku | |

```
[START]
  └─ HWF-3.1
        └─ HWF-3.2
              ├─ HWF-3.3
              └─ HWF-3.4
```

Breaking-change safety: additions and in-place doc edits only; safe to deploy standalone: yes. HITL scan: none (no `.claude/**`, no CI secrets).

## Decision Log
- Loop language: defaulted to Bun/TS (repo stack); it is the demo, and the exercise stays language-neutral.
- 3.2 and 3.3 stay separate PRs rather than a bundle.
- Loop stays out of ACP/chat/schedule; those are "where factories take it".
- Headless launch flags and allow-list must be verified against first-party docs before writing.
- Other-lessons audit (3.4) runs against the backlog, template, components doc and README, since lesson 1 is the only lesson.
- HWF-3.2: lesson 1 text rewritten around the loop. The deck and run-of-show still follow the old step numbering until HWF-3.3.
