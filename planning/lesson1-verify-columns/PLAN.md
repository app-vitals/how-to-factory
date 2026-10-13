# Plan: lesson1-verify-columns (prefix VRF)

Repo: app-vitals/how-to-factory. Gives the dev-task "how the field differs" slide the same simple-concept treatment as the plan slide. Follows lesson1-plan-columns (PTC) and lesson1-branch-step (DTB), which are still merging.

## Direction (Dan, Slack)
- Verification approaches Dan listed: test/lint/typecheck, LLM audit/review, goal, acceptance tests. Are they distinct, or do the lines blur? Is there more?
- Dan: "a command's exit code, a second model, the agent itself, a person" is not captured with yes/no. After the two-column proposal: "sounds good, we should also fit goal in there as well."

## Findings that shaped the design (field-grid and matrix, 2026-10-13)
- The listed items sit on different axes and blur if used as columns: tests/lint/typecheck and acceptance tests are the same kind of check with different sources (the repo's standing suite vs the task's own criteria); LLM audit is a judge that reads evidence checks produce (OpenHands' judge reads the transcript for test output; Claude Code's /goal evaluator runs no commands and reads no files); "goal" bundles a retry loop with a judge (OpenHands goal loop, Claude Code /goal), and Stop hooks are the same retry loop with the person's script as the judge (Factory, Cursor, Claude Code).
- Distinct things in the sources: running the actual app (Devin testing mode with a recording, Factory QA against the running application, Cursor cloud agent using the software and a browser, OpenHands QA agent after the PR); who decides it is done (a check's result, another model, the agent itself, a person); how it keeps going (goal, hook, CI auto-fix, in the prompt, autopilot); timing (some of these run after the PR is open).
- Tests/lint and retrying are common to most factories, so they go in the caption, not a column.

## Design (Dan approved the two columns and four judge labels, then added goal)
- **Three dev-task columns replace the single `verify` component in landscape/matrix.json:**
  1. `verify-judge` - "Who decides it's done": one or two of four labels, joined with " + ": **A check** (a test, lint, typecheck or hook-script result), **Another model** (judge, critic, /goal evaluator, validation workers), **The agent itself**, **A person** (a person decides the work is correct, e.g. by watching a recording; the human PR review itself belongs to "what the human does"). Surface named in parentheses when a product has several.
  2. `verify-runs-app` - "Runs the app itself": yes/no style. Starts with "Yes" and notes "after the PR" where that applies; a cell no page supports is omitted and reads "not in their docs".
  3. `verify-keeps-going` - "How it keeps going until it passes": the mechanism, one or two of **Goal** (a stated end condition checked after each turn), **Hook** (a script blocks finishing), **Auto-fix** (CI fix after the PR), **In the prompt** (the instructions say iterate until tests pass), **Autopilot**. Cap values stay out of the short text.
- Each cell keeps name / summary / sourceUrl / asOf / `short` (at most 8 words). `short` conventions are as above (labels, not Yes/No, for judge and keeps-going). Cells are filled from landscape/field-grid/*.md including the LOOP-within grids, re-reading cited pages where unsure; never from memory; an unsupported cell is { omitted: reason } naming the pages checked.
- **Sample row:** judge = A check + the agent itself; runs the app = No (it runs the project's checks); keeps going = In the prompt (the skill says fix until they pass).
- **Slide wording:** same rules as the other differs slides: six vendors in the same order plus "This sample", as-of date in the header, never "matrix", "options.md", "sourced" or "not documented"; blanks read "not in their docs"; caption at most 12 words (for example "The prompt-to-PR flow is the same shape in every factory.").
- Scope: dev-task slide only. The loop slide stays as built.

## Tasks
| ID | Title | Deps | Model | Branch |
|---|---|---|---|---|
| VRF-1.1 | feat: split the verify column into judge, runs-the-app and keeps-going | none | sonnet | feat/vrf-1-1-verify-columns-matrix |
| VRF-2.1 | docs: rebuild dev-task tables and the dev-task differs beat | VRF-1.1, DTB-2.1 | sonnet | docs/vrf-2-1-devtask-tables-and-beat |
| VRF-3.1 | docs: rebuild the dev-task differs slide with three columns | VRF-2.1, DTB-3.1 | sonnet | docs/vrf-3-1-devtask-slide |

```
[PRIOR SESSIONS] DTB-2.1 ─┐   DTB-3.1 ─┐
[START] VRF-1.1 ─ VRF-2.1 (needs 1.1, DTB-2.1) ─ VRF-3.1 (needs 2.1, DTB-3.1)
```

## Breaking Change Safety
Removes the component `verify` and adds three. Consumers (grep): scripts/landscape-types.ts (ComponentId), check-landscape.test.ts fixtures, matrix.json, landscape/README.md (generated), options.md, README.md, script.md, the deck's dev-task differs slide, run-of-show.md. VRF-1.1 changes types, test fixtures, matrix.json and regenerates landscape/README.md atomically (CI check-landscape passes). The lesson docs (VRF-2.1) and slide (VRF-3.1) follow; until then they cite the earlier snapshot with their own inline URLs and dates (stale, not broken). VRF-2.1 and VRF-3.1 wait for DTB-2.1 and DTB-3.1 because those edit the same script/README/deck files. Safe to deploy standalone: yes.

## HITL
None.

## Decision Log
- Three columns; judge and keeps-going are categorical (labels), runs-the-app is yes/no, per Dan's point that a four-valued judge cannot be yes/no.
- Goal sits in "how it keeps going" as one mechanism among goal / hook / auto-fix / in the prompt / autopilot; when goal's end condition is judged by a model that shows in the judge column.
- A person as judge counts only where a person decides correctness (e.g. watching a recording); PR review stays on the "what the human does" slide.
- Acceptance tests are treated as the same kind of check as tests (different source), so no separate column; they link back to the plan slide's criteria column.
- Tests/lint and retrying go in the caption as common to most.
