# Plan grid: spec to plan (lesson 2)

**As of 2026-10-19.** Every product cell below is a short pointer to the matching cell in that product's own file, which holds
the full wording, the first-party URLs, the pages read and the pages ruled out. This README adds no claim that the per-product
files do not source; the cross-check and observations are counts and comparisons computed from those files.

Scope is the lesson 2 step only: a request or spec becomes a plan. Test and verification planning, how specs are written,
standards files, estimates, model tiers, and bundling or PR shaping are left out on purpose (see each product file).

## The grid

Each product row shows the one surface closest to the sample's flow (read the code, write a design, wait for approval, then
slice). Every product has other surfaces, each its own row in its file, and they differ; the counts further down cover all of them.
"Approval before work starts" uses only **Human**, **Human approves** or **Automated**, and only where a page says so. Names are
each product's own, not canonical.

| Product (surface shown) | Reads the code before proposing | Design output and form | Names reuse, risks or breaking changes | Approval before work starts | How it becomes tasks |
| --- | --- | --- | --- | --- | --- |
| [Devin](devin.md) (CLI Plan mode) | Yes: read-only tool set | Plan written to a file; heading and summary only documented | Not documented | **Human approves** | Not documented |
| [Factory](factory.md) (Spec Mode) | Yes: read-only until approved | Plan for review; optional Markdown file, no template | Only if the person asks | **Human approves** | Not documented; same session builds |
| [OpenHands](openhands.md) (planning agent, then execution agent; SDK example) | Yes: read and write-`PLAN.md`-only tools | `PLAN.md` to a fixed outline: objective, context, approach, steps | Partly: components, constraints, rationale | Not documented; example runs straight on | `PLAN.md` is the handoff; its step list only |
| [Cursor](cursor.md) (Plan Mode) | Yes: asks, then researches | Editable plan file; no template | Not documented | **Human approves** (Build click) | One plan, one Build; parallel for independent steps |
| [Copilot](copilot.md) (Plan mode in the IDE) | Yes: read-only research | Summary, steps, open questions; Markdown | Constraints named; reuse, breaking changes not documented | **Human approves** (Start Implementation) | Plan steps are the units; no task store |
| [Claude Code](claude-code.md) (Plan mode) | Yes: read-only until approved | Plan file you can edit; no required sections | Not built in; only if the prompt asks | **Human approves** | Not documented; same session edits |
| **This sample** (the upgraded plan skill) | Reads the repo first | Design with reuse and breaking changes | Names both | Waits for human approval | Then slices into tasks |

The "This sample" row is the target in the lesson 2 plan (`planning/lesson2-spec-to-plan/PLAN.md`): our own design, not a
sourced claim about anyone else.

## CROSS-CHECK

Method: every row of every "The grid" table in the six product files was parsed, 37 surface rows and 185 cells, and each cell
that says a thing is not documented was checked for the pages it names. Every file's method line names the docs index it listed
first (Devin `https://docs.devin.ai/llms.txt`, Factory `https://docs.factory.com/llms.txt`, OpenHands
`https://docs.openhands.dev/llms.txt`, Cursor `https://cursor.com/docs/llms.txt`, Copilot `https://docs.github.com/en/copilot`
plus `https://docs.github.com/llms.txt`, Claude Code `https://code.claude.com/docs/llms.txt`).

### 1. Does every "not documented" cell name the pages checked?

81 of 185 cells carry a "not documented" statement. 79 name the pages checked, in the form `(checked: ...)`. Two do not:

- Claude Code, "Session task list", How it becomes tasks: says whether the list comes from an approved plan is not documented, but
  names no pages. The row's other cells name Interactive mode, Tools reference and Agent SDK todo tracking.
- Claude Code, "Agent SDK plan mode", Approval: says it is not documented "as an approval label", but names no pages. The row's other
  cells name Agent SDK permissions, Handle approvals and user input, and Todo tracking.

Both are fixable by adding a `(checked: ...)` list to those cells in `claude-code.md`. Neither changes a grid answer.

### 2. Blank counts

A **blank** is a cell that is wholly "not documented". A **partial** cell answers part of the column and says the rest is not
documented. Counts are over all surfaces of the product (rows in the file), not just the row shown above. Format: blank / partial.

| Product (surface rows) | Reads | Design | Reuse | Approval | Tasks |
| --- | --- | --- | --- | --- | --- |
| Devin (6) | 0 / 0 | 0 / 1 | 1 / 4 | 0 / 0 | 1 / 0 |
| Factory (3) | 2 / 0 | 1 / 0 | 1 / 2 | 0 / 0 | 1 / 1 |
| OpenHands (6) | 4 / 0 | 0 / 1 | 3 / 2 | 1 / 2 | 0 / 0 |
| Cursor (7) | 0 / 2 | 1 / 1 | 7 / 0 | 4 / 0 | 2 / 3 |
| Copilot (6) | 2 / 0 | 1 / 0 | 3 / 2 | 1 / 0 | 1 / 0 |
| Claude Code (9) | 1 / 0 | 1 / 4 | 7 / 2 | 3 / 1 | 3 / 1 |
| **All (37)** | **9 / 2** | **4 / 7** | **22 / 12** | **9 / 3** | **8 / 5** |

Not counted as blanks: OpenHands "Issue to Pull Request automation" design says "None" (the docs describe no plan there), and
Claude Code "Session task list" reads says "Not applicable" (bookkeeping, not exploration). Both are stated answers.

### 3. Blanks against the docs index

Playbook rule: flag any blank for a product whose index lists a relevant page. Each file's "Ruled out (why)" list was read against
its blanks. Findings:

- **Factory: possible gap in the changelog.** The Factory file says the changelog was not searched for plan entries, so behaviour
  newer than the docs pages may be missing. This touches Factory's blanks for design detail, reuse and tasks. Devin's and Cursor's
  changelogs were searched; Factory's was not. Flagged for re-check.
- **Devin: the `!plan` playbook text is held in the app.** Devin's Linear row has no blank, but the gallery page says the
  playbook's contents are not on the docs pages, so what it must name (reuse, breaking changes) cannot be checked from the docs.
  The playbook authoring pages are ruled out as saying nothing about what a plan contains.
- **Claude Code: "Let Claude interview you"** in Best practices (question the person, write a `SPEC.md`) was ruled out as the
  intake lesson's topic. It bears on clarifying questions, not on any blank in this grid.
- **No other blank has a ruled-out page that plausibly fills it.** The ruled-out lists for OpenHands, Cursor, Copilot and
  Claude Code are standards files, review, verification, triggers, hosting, administration, pricing and model choice.

### 4. Comparing products against each other

- **Reuse is blank most often, and unevenly.** Five products have at least one page that advises the person to point the agent
  at existing patterns or files in the prompt (Devin, Factory, OpenHands, Copilot, Claude Code). Cursor has none: its reuse cell is
  blank on all 7 surfaces, though its Prompting agents page was read in full. Cursor's all-blank column is the largest contrast and
  the cell most worth re-checking before the lesson says it.
- **Claude Code and Cursor have the most surfaces and the most blanks** (9 and 7 rows). Some of those rows are not planning
  surfaces in the lesson's sense (Cursor's Ask mode and Cloud Agents API, Claude Code's session task list and Agent SDK), so their
  blank counts are partly an artefact of how many rows were recorded, not a weaker docs set.
- **Approval is consistent where a plan mode exists.** The shown surface for Devin, Factory, Cursor, Copilot and Claude Code is
  **Human approves**. OpenHands' SDK example has no stated pause, and its Software Factory and ready-for-dev surfaces are
  **Automated**. Surfaces started from a ticket or message are mostly **Human** (a person starts it; no plan gate is described).
- **Several "Human approves" cells rest on a prompt, not a product gate.** Devin's spec-first session, OpenHands' prompt-led
  planning and Devin's managed sessions (walkthrough) are approvals only because the example prompt says to wait. The files mark
  each as a prompt convention.
- **No product shows the sample's full set in one documented step.** Each shown surface has read-code and approval; none documents
  all of: design with reuse and breaking changes, approval, then slicing into tasks.
- **Task-slicing is documented mostly in other surfaces.** Devin (PRD to tickets, managed sessions), Factory (Missions), Copilot
  (CLI fleet, issue creation), Cursor (Projects) and Claude Code (`/batch`, agent teams) slice in separate surfaces from the shown
  plan mode; the shown plan modes either hand the plan to the same session or leave the split undocumented.

## Observations

Counts are the all-surface blank / partial counts from the cross-check. "Same / differs / mostly undocumented" is a judgement over
the six shown rows plus the other surfaces in the files.

| Column | Verdict | Blank / partial (of 37 rows) | Notes |
| --- | --- | --- | --- |
| Reads the code before proposing | **Same** | 9 / 2 | Every shown plan mode reads the code, usually read-only, before proposing. Blanks come from surfaces started by a ticket or a coordinator, not from plan modes. |
| Design output and form | **Differs** | 4 / 7 | A file or editable plan is common; fixed outlines are rare (OpenHands `PLAN.md`, Copilot summary-steps-questions). Most say no template is shown. |
| Names reuse, risks or breaking changes | **Mostly undocumented** | 22 / 12 | The widest gap. Reuse and breaking changes appear mainly when the person's prompt asks, or in an adaptable template (Copilot's planner agent). |
| Approval before work starts | **Same** in plan modes, **differs** elsewhere | 9 / 3 | Human approves in five of six shown plan modes. Differs for ticket-driven and automated surfaces. |
| How it becomes tasks | **Differs** | 8 / 5 | Shown plan modes mostly hand the plan to the same session. Splitting into tasks lives in separate surfaces (tickets, missions, fleets, `/batch`). |

For Dan, what relates to lesson 2 and what to later lessons:

- **Lesson 2 (this lesson):** reading the code before proposing (same everywhere), the approval gate before slicing (same in plan
  modes), and the design that names reuse and breaking changes (mostly undocumented, so the sample can show something the docs
  mostly leave to the prompt).
- **Lesson 2, handle with care:** "how it becomes tasks" differs widely, but the sample's step is just "slice as today"; the grid
  supports saying products slice in different places, not that one way is standard.
- **Later lessons:** prompt-convention approvals and the `!plan`-style playbooks touch the standards and instructions lesson;
  Missions, `/batch`, fleets and managed sessions (parallel sessions per work package) touch the unscheduled bundling lesson; and
  Devin's PRD-to-tickets and Claude Code's "interview you" touch the spec and intake lesson.

## Product files

- [Devin](devin.md)
- [Factory](factory.md)
- [OpenHands](openhands.md)
- [Cursor](cursor.md)
- [Copilot](copilot.md)
- [Claude Code](claude-code.md)
