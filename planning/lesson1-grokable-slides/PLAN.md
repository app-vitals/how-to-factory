# Plan: lesson1-grokable-slides (prefix GRK)

Repo: app-vitals/how-to-factory. Makes the lesson-1 "how the field differs" slides, the names slide and the "Where factories take it" slide grokable, and makes the rule enforceable. Follows lesson1-next-arc (NXA) and factory-map-and-playbook (FMP), both merged.

## Direction (Dan, Slack)
- "i thought i was going to see simpler 'how the field differs' slides after the latest pass, but it wasn't the case. also for the date last checked we can shorten to 10/2026. differ slides need to be grokable."
- "Where factories take it: the boxes now wrap." Then: "ok, let's do a plan session for both fixes."

## Findings (slides on main, rendered at 1920x1080)
- Differs slides: the last pass fixed which columns to compare but left every cell as a sentence: the plan slide is 3 columns x 7 rows of cells like 'Mixed: example tickets carry both; Ask Devin unstated' with four answer styles (Yes / No / Mixed / not in their docs); the loop slide uses compound chips like 'A schedule + An event or label (Automations)'; the names slide has long names ('GitHub Issue Triage automation'); the header reads 'Who (as of 2026-10-13)'; titles say what the slide is, not what to notice.
- Destinations slide: `.options-grid` is hard-coded to 3 columns (decks/deck.css line 112) but NXA-1.1 added a fourth option, so it wraps to a second row; headings wrap to two lines; the Checks box repeats its heading as its subtext. check-decks verifies counts and words, not layout, and the task was not rendered before it was called done.
- The matrix cell `short` (at most 8 words) is right for options.md and the script but too long for a slide cell.

## Design
- **Matrix `chip` field:** every populated cell gains a required `chip` (the slide text). Rules per component, validated by check-landscape: yes/no components (plan-hitl, plan-persist, plan-contents, verify-runs-app, loop-includes-plan) use exactly one mark - ✓ yes, ✗ no (a page states it, e.g. automated), ◐ partly; labelled components use one or two fixed labels joined with ' + ' - verify-judge: Check, Model, Agent, Person; verify-keeps-going: Goal, Hook, Auto-fix, Prompt, Autopilot; loop-starts-next: Event, Schedule, Finished run, Person; name components (plan-name, execute-name) use the product's own term trimmed to at most 3 words. Omitted cells render as '–' (not in their docs). `short` stays at 8 words for options.md and the script.
- **Slides:** plan, dev-task, loop and names slides become tables of marks and chips only (no sentences), each with a takeaway title of at most 8 words stated so the data supports it: plan 'Few plans carry criteria and dependencies', dev-task 'Most use a check; some add a model', loop 'Only some loops plan for themselves', names 'Same jobs, different names'. Titles must be re-checked against the chips at implementation and changed if the data does not support them. Header column 1 reads 'Checked 10/2026' (month/year of the latest asOf in the slide's cells; the data keeps ISO dates). A one-line legend under any table that uses marks: '✓ yes  ✗ no  ◐ partly  – not in their docs'. Six vendors in the same order plus 'This sample'. Qualifiers stay in options.md and the script.
- **Destinations slide:** make `.options-grid` adapt to its option count (auto-fit, at most 4 across) so it cannot wrap unexpectedly, shorten each box (heading is the piece: Plan, Dev-task, Loop, Checks; one short phrase underneath: 'A tracker holds the queue', 'Each task in its own VM', 'Several at once, or scheduled', 'Another model or script judges done'), remove the duplicated line, keep the caption.
- **Render check:** each changed slide is rendered at 1920x1080 (Playwright's chromium headless shell is available in the agent environment: a temp copy of the deck with `.slide{display:none!important}.slide:nth-of-type(N){display:grid!important}` injected, then `chrome-headless-shell --no-sandbox --window-size=1920,1080 --screenshot=...`) and checked for wrapped rows, overflow and the face-cam zone; the PR body records what was checked. If no browser is available the task says so explicitly and does not claim a visual check.
- **Enforce it:** check-decks gains `maxTableCellWords` (default 3; marks count as one word; first column and header exempt) and `maxOptions` (default 4) in decks/deck.config.json so grokable is a CI rule, not a memory. It lands after the slides are rebuilt so main stays green.
- **Playbook:** docs/lesson-playbook.md and lessons/_template/checklist.md add the marks/chips/takeaway-title/'Checked MM/YYYY'/legend rules and 'render every changed slide at 1920x1080'.

## Tasks
| ID | Title | Deps | Model | Branch |
|---|---|---|---|---|
| GRK-1.1 | feat: add slide chips to landscape matrix cells | none | sonnet | feat/grk-1-1-matrix-chips |
| GRK-2.1 | docs: rebuild the field slides as marks and chips and fix the destinations grid | GRK-1.1 | sonnet | docs/grk-2-1-grokable-slides |
| GRK-2.2 | docs: add the grokable-slide rules to the playbook and checklist | GRK-1.1 | haiku | docs/grk-2-2-playbook-rules |
| GRK-3.1 | feat: enforce table cell and option limits in check-decks | GRK-2.1 | sonnet | feat/grk-3-1-cell-limits-check |

```
[START] GRK-1.1 ─┬─ GRK-2.1 ─ GRK-3.1
                 └─ GRK-2.2
```

## Breaking Change Safety
GRK-1.1 adds a required field to every populated matrix cell; types, checker, renderer, tests, matrix.json and the generated README change atomically in that task (CI check-landscape passes). GRK-2.1 rewrites slide text and one CSS rule used only by options-grid slides (decks/deck.css, lesson decks and the template deck - verify every deck that uses `.options-grid` still renders). GRK-3.1 adds CI limits; it depends on GRK-2.1 and must verify every deck in the repo (including lessons/_template/deck) passes before landing. No pending tasks edit these files (verified: only HWF-1.2, a stale deploying record, is not deployed). Safe to deploy standalone: yes.

## HITL
None.

## Decision Log
- Marks for yes/no, fixed labels for categories, trimmed own-term names: Dan's earlier point that a four-valued judge is not yes/no, and 'grokable'.
- Takeaway titles are drafts that must match the data at implementation time.
- 'Checked 10/2026' derives from asOf at build time; data stays ISO.
- Enforcement is a separate, later task so CI cannot fail on in-flight slide work.
- Destinations fix and slide rebuild share one task (same file, same render check).
