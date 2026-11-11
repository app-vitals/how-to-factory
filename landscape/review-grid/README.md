# Review-quality grid: how findings are graded and filtered (lesson 6)

**As of 2026-11-11** (every product file was fetched that day). Every product cell below is a short pointer to the matching
cell in that product's own file, which holds the full wording, the first-party URLs, the pages read and the pages ruled out. This
README adds no claim that the per-product files do not source; the cross-check and observations are counts and comparisons computed
from those files. Nothing here describes our own sample factory: that comparison belongs to the Shipwright inventory and the
ranking built on it.

Scope is the lesson 6 step only: a review exists, and the question is how good it is. How findings are graded, what keeps weak ones
off the pull request, what the reviewer reads for guidance, what each finding must show, how a repeat review behaves, how a person
says a finding is wrong, how noise is counted, and whether the reviewer states a verdict. What triggers a review and who fixes the
PR afterwards (the routing grid, `landscape/routing-grid/README.md`) and checks before the PR (the verify grid) are left out on
purpose.

## The grid

Each product row shows one surface, the one that reviews the pull request, because the review is where findings are graded and
filtered. Every product has other surfaces, each its own column or rows in its file; the counts by product below cover all of them.
Where the shown surface has no answer for a dimension and another surface of the same product does, the cell says **Other
surface** and names it. Names are each product's own, not canonical.

Surfaces shown: Devin, Devin Review; Factory, CI review (Droid Review via Droid Action); OpenHands, Automated Code Review; Cursor,
Bugbot; Copilot, code review on GitHub.com; Claude Code, the managed Code Review service.

**Cell labels.** Every cell starts with one fixed label, then a short summary of the file's cell.

| Label | Meaning |
| --- | --- |
| **Yes** | The file's cell documents the behaviour with no stated gap. |
| **No** | The file's cell documents that the surface does not do it. |
| **Partly** | The file documents part of it, or documents it and also says what is missing ("not documented" beside other text). |
| **Not documented** | The file says the pages checked do not say it. Any nearby facts it names are not the thing asked. This is not a claim that the product lacks it. |
| **Other surface** | The shown surface has no documented answer and another surface of the same product does; the cell names it. |

The dimensions are the ten rows shared by the per-product files. Factory's and Copilot's files are one row per surface and
dimension, so their severity and confidence rows are folded into the first dimension, and rows that have no counterpart in the
other files (depth, memory, handing a finding to a fixer, and the like) stay in the product file only.

**Grading, limits, filters**

| Product (surface shown) | Findings graded by severity or confidence | Threshold or cap on comments posted | Verification pass before posting | Filter for problems that existed before the PR |
| --- | --- | --- | --- | --- |
| [Devin](devin.md) (Devin Review) | **Yes**: bugs Severe or Non-severe, security Critical or Warning, plus Investigate and Informational flags; no confidence scale beyond the Severe wording | **Partly**: no count cap documented; a posting switch per finding type (bugs and security on by default, flags off) | **Partly**: a named verification step is not documented; later reviews check for duplicate and resolved findings. On a Devin-owned PR with triage on, the owning session works the findings first | **Not documented** as a filter; nearby, later pushes look at changes since the last review |
| [Factory](factory.md) (CI review) | **Other surface**: CI review is not documented; local `/review` grades P0 to P3 and Security review Critical to Low; no confidence score | **Partly**: no default cap documented; a prompt line can add one (the file's example is "at most 5 comments"); drafts skipped, paths filter | **Other surface**: Security review runs two passes; local `/review` has an eight-point test, not a separate pass; CI review has no cell | **Other surface**: local `/review` requires the finding to be introduced by the change; CI review not documented |
| [OpenHands](openhands.md) (Automated Code Review) | **Partly**: severity labels Critical, Important, Suggestion, Nit and a Low, Medium or High risk block; a numeric confidence score is not in their docs | **Partly**: no numeric cap in their docs; skill text sets a "material finding" bar and says not to post Nits (the docs page lists Nit as a label; which wins is unresolved) | **Partly**: an instructed step in skill text (re-read, reproduce, check callers, drop if unproven); a second independent model pass is not in their docs | **Partly**: skill text says a finding must be present on the current head; a docs-page diff-base filter is not in their docs |
| [Cursor](cursor.md) (Bugbot) | **Partly**: severity exists in the analytics data (`high`, `medium`; scale undefined, may be null); a visible confidence grade is not documented | **Partly**: no cap on a count of comments documented; caps on whether a review runs (size limit, bot-PR review cap) and an effort setting | **Partly**: the docs do not describe the pipeline; a blog post describes eight passes, a majority vote, a validator model and a dedupe against earlier runs (may have changed since) | **Not documented** as a filter; nearby, it reviews the diff and by default only changes since the last review |
| [Copilot](copilot.md) (code review on GitHub.com) | **Partly**: each comment labelled High, Medium or Low; confidence not documented as a score or label | **Partly**: no count cap or severity threshold documented; the dial is review effort (Lite, Balanced, Max) | **Not documented**: no separate check step named; the application card lists false positives as a known risk | **Not documented**: the card says only that it reads diffs and metadata |
| [Claude Code](claude-code.md) (Code Review service) | **Partly**: Important, Nit and Pre-existing markers; a visible confidence grade is not in their docs | **Partly**: no built-in cap; the repo's `REVIEW.md` can set one (example: at most five Nits), honored from a protected branch | **Yes**: parallel candidate finding, then a verification step that drops false positives, then dedupe and ranking | **Partly**: Pre-existing is its own severity class, shown separately; whether the first review suppresses any is not in their docs |

**Guidance, evidence, re-review**

| Product (surface shown) | Repo guidance files it reads, and how it is told what to ignore | Evidence required (file and line) | Re-review: only new changes, no repeat |
| --- | --- | --- | --- |
| [Devin](devin.md) | **Yes**: `REVIEW.md`, `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md` and other agent or rule files; extra globs in settings; "ignore" is prose in `REVIEW.md`; rules can exclude whole PRs | **Partly**: a hard cite-a-location rule is not documented; findings carry an explanation, example and fix, and the gallery example names a file and line | **Yes**: by default only changes since the last review, earlier findings carried forward and checked for duplicates; whole-PR re-review when large; automatic on a later push only if the cadence is "Every push" |
| [Factory](factory.md) | **Partly**: `.factory/skills/review-guidelines/SKILL.md`; ignore via a workflow paths list, a job condition or that skill; whether `AGENTS.md` is read is not documented | **Partly**: inline comments on the lines concerned, optional suggestion blocks; a rule requiring proof beyond that is not documented | **Partly**: the workflow runs again on each push and reads existing comments; whether it reviews only new commits or avoids repeats is not documented |
| [OpenHands](openhands.md) | **Partly**: repo skill `.agents/skills/custom-codereview-guide.md`; skill text also reads `AGENTS.md`; ignoring is prose, a dedicated ignore syntax is not in their docs | **Yes**: line references are part of the documented output; skill text requires evidence and a verified path and line (the optional `require-evidence` input is evidence from the PR author) | **Partly**: pushes do not start a review by default; the prompt says to avoid duplicating unresolved comments; a "review only new commits" mode is not in their docs |
| [Cursor](cursor.md) | **Yes**: `.cursor/BUGBOT.md` (root and nested), team, learned and manual rules, a repo config read from the base branch; "ignore" is prose | **Partly**: a must-cite-a-location rule is not documented; comments are inline with an explanation and suggested fix | **Yes**: by default only changes since the previous review; reads earlier comments to avoid duplicates; a once-per-PR setting |
| [Copilot](copilot.md) | **Partly**: `.github/copilot-instructions.md`, path-specific `*.instructions.md`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `REVIEW.md`; `excludeAgent` keeps a file from the reviewer; a path or severity filter on comments is not documented | **Partly**: feedback tied to lines, with a suggested change where possible; a proof rule is not documented | **Partly**: off by default (needs "Review new pushes" or a re-request); a re-review may repeat resolved or downvoted comments; limiting to new commits is not documented |
| [Claude Code](claude-code.md) | **Yes**: `CLAUDE.md` and review-only `REVIEW.md`, read from the base branch; "ignore" and caps are prose in `REVIEW.md` | **Yes**: inline comments on the lines, a check-run table with `File:Line`, a "Why this was flagged" section; `REVIEW.md` can add a citation rule | **Yes**: an automatic review after a push focuses on what changed and says in the body how many findings it left out |

**Pushback, noise, verdict**

| Product (surface shown) | How a person dismisses it or teaches it a finding is wrong | How its own noise is measured | Does it state a verdict or approve |
| --- | --- | --- | --- |
| [Devin](devin.md) | **Partly**: mark a finding resolved; edit `REVIEW.md`; chat follow-up; a thumbs-down that trains it is not documented | **Partly**: dashboard counts of review ACUs, reviews and bugs caught; analytics count a finding resolved only when fixed in code (2026-10-21 note); a false-positive rate is not documented | **Partly**: a `Devin Review` commit status with an admin-chosen passing condition; approval is the beta Autoapprover, **Other surface** |
| [Factory](factory.md) | **Not documented** as a feedback control; the lever is editing the guidelines skill or the workflow | **Not documented**: the Review Benchmark page holds only an embedded component; Agent Effectiveness has no review figure | **Partly**: CI review submits an approval when it finds no issues; whether it requests changes or blocks is not documented |
| [OpenHands](openhands.md) | **Partly**: skill text ends each review with "edit the guide and re-request"; thumbs reactions invited; a docs-page description of dismissing is not in their docs | **Partly**: a suggestion-accuracy recipe (after-merge LLM judge) on the monitoring page and an evaluation workflow in the plugin README; a false-positive rate is not in their docs | **Yes**: the posting call takes `APPROVE`, `COMMENT` or `REQUEST_CHANGES`; skill text and docs word the Critical case differently, unresolved |
| [Cursor](cursor.md) | **Partly**: `@cursor remember [fact]`, rules learned from reactions and replies; what a person clicks to dismiss is not described | **Partly**: a resolution rate (Cursor's own figures) and per-rule acceptance in the dashboard and analytics API; a false-positive rate by that name is not documented | **Partly**: a `Cursor Bugbot` check, `neutral` by default; whether Bugbot itself approves is not documented; approval is PR Routing & Approval, **Other surface** |
| [Copilot](copilot.md) | **Yes**: react, reply, resolve or hide; thumbs go to GitHub; replies are not seen by Copilot; teach through instruction files and Memory | **Not documented** for review; the card gives overall benchmarks and a false-positive risk note, and thumbs are the only feedback signal | **Yes**: an approval assessment in every overview; default review type is "Comment"; approvals are opt-in and a push dismisses one |
| [Claude Code](claude-code.md) | **Partly**: resolve the thread; replies are read by the next review; add a rule to `REVIEW.md`; a thumbs loop is not in their docs | **Partly**: analytics page with PRs, spend, a Feedback card (auto-resolved comments) and findings by severity; a false-positive rate is not in their docs | **No**: it never approves or blocks; the check run is neutral and exposes severity counts for a script |

## CROSS-CHECK

Method: the six per-product files in `landscape/review-grid/` were read cell by cell, and each of the 60 grid cells above was
compared with its source cell. Four files (Devin, OpenHands, Cursor, Claude Code) are a table with the same ten dimension rows and
one column per surface; `factory.md` and `copilot.md` are one row per surface and dimension with no fixed row set, so their cells
were matched by dimension name, and a grid cell that folds several rows (severity plus confidence, a guidance file plus how to
ignore) was traced to each of them. Every "Other surface" mark was traced to the surface it names. Source cells are counted as
**plain** (no "not documented" statement), **partial** (a "not documented" statement beside other text) or **wholly not
documented** (only that statement and its `(checked: ...)` list). The counts and the trace come from a throwaway parser over the
files as of this commit, not from a tool in the repo, so treat them as approximate to a cell or two at the margins: the
plain/partial/wholly split is a text heuristic (it looks for the files' own "not documented" wordings and ignores citations and
`(checked: ...)` lists), and wording it does not recognise counts as plain.

### 1. Counts by product

Source cells in each product's file (every surface, including extra rows that have no counterpart in the grid).

| Product | Surfaces | Cells in the file | Plain | Partial | Wholly not documented |
| --- | --- | --- | --- | --- | --- |
| Devin | 3 | 30 | 15 | 8 | 7 |
| Factory | 4 (plus a "Review (any)" row group) | 22 | 12 | 10 | 0 |
| OpenHands | 3 | 30 | 3 | 16 | 11 |
| Cursor | 3 | 30 | 15 | 11 | 4 |
| Copilot | 3 | 20 | 10 | 8 | 2 |
| Claude Code | 4 | 40 | 18 | 11 | 11 |
| **All** | **20** | **172** | **73** | **64** | **35** |

Grid cells by product (the ten shown-surface cells of each row above, by label).

| Product | Yes | No | Partly | Not documented | Other surface |
| --- | --- | --- | --- | --- | --- |
| Devin | 3 | 0 | 6 | 1 | 0 |
| Factory | 0 | 0 | 5 | 2 | 3 |
| OpenHands | 2 | 0 | 8 | 0 | 0 |
| Cursor | 2 | 0 | 7 | 1 | 0 |
| Copilot | 2 | 0 | 5 | 3 | 0 |
| Claude Code | 4 | 1 | 5 | 0 | 0 |
| **All (60)** | **13** | **1** | **36** | **7** | **3** |

The counts are **not comparable across products**. The file shapes differ: Devin, OpenHands, Cursor and Claude Code fill a cell for
every surface and dimension, so a surface with nothing to say shows a wholly-not-documented cell; Factory and Copilot wrote one row
only where there was something to record or an explicit gap, so they show few or no wholly empty cells without having fewer gaps
(their gaps are listed in each file's "Not documented" section). OpenHands' 3 plain cells reflect that most of its answers sit in
skill text with a "not in their docs" caveat on the docs page, not that it documents less. Cursor's "Nearby" column and Copilot's
"Admin configuration" surface are counted as surfaces because the files do.

### 2. Does the grid above match the per-product files?

Every cell in the three tables above was read against the source cell it points to, and every backticked name in a grid cell was
searched for in its product file (none is missing). The parser flagged one cell for a label that disagrees with its source cell's
wording; reading the rest by hand found no cell that says more than its source. Findings:

- **Factory's noise cell has no "not documented" wording in its row.** `factory.md` says the Review Benchmark Markdown holds only an
  embedded component and Agent Effectiveness has no review figure, but only the file's "Not documented" list at the bottom says
  outright that no measured noise or false-positive rate is documented. The grid says **Not documented**, tracing to both. The
  file's cell is correct but reads as plain to a parser; no change.
- **None of the 7 "Not documented" grid cells is a wholly empty source cell.** Six source cells carry nearby facts (Devin, Cursor
  and Copilot on pre-existing problems; Factory on dismissal; Copilot on verification and on noise) and the seventh is the Factory
  noise case above. The grid keeps the label and the files' wording, and names the nearby fact only for Devin and Cursor. By the
  rule in the label table those facts are not the thing asked.
- **Five "Partly" cells rest on a plain source cell.** Devin's verdict (a status here, approval on Autoapprover, another surface),
  Factory's and Copilot's guidance cells (a gap sits in an adjacent row, such as whether `AGENTS.md` is read or a path filter on
  comments), Copilot's grading (severity yes, confidence a separate "not documented" row) and Cursor's dismissal (the file says
  what a person clicks "is not described", wording the parser misses). Each was kept as **Partly** because a gap is stated in the
  file for that dimension.
- **Devin's own-PR triage sits against its bot-comment setting.** `devin.md` says that where "direct finding triage" is on, the
  session that owns the PR works the findings first (the verification cell above); the same file's Auto-Fix column says Devin
  Review posts as a bot account and, under the default bot setting, the session does not act on its comments until that bot is
  allowed. Both are sourced and both kept; the pages do not say which path wins. The grid carries the first as conditional and does
  not claim the loop works by default. Flagged, not resolved.
- **OpenHands has two unresolved wording conflicts, carried as written.** The docs page lists Nit as a label while the posting skill
  says never to post Nits (cap cell), and the review skill's verdict rule differs from the posting skill's mapping of Critical to
  REQUEST_CHANGES (verdict cell). The file says it did not find which governs at run time. Flagged for a live run.
- **Factory's cells are mostly other-surface answers.** CI review (the surface shown) has no documented severity, verification
  pass or pre-existing filter; the answers are on local `/review` and Security review. Three of ten cells say **Other surface**.
  `factory.md` also records that the action's own inputs (severity threshold, blocking, bot allowlists) were not read, so those
  CI cells are weaker than they look.
- **Cursor's verification and noise answers lean on its own blog posts.** The verification cell comes from a post that describes
  results through January 2026 and was read through a summarizing extraction tool, not raw text; the file says the pipeline may
  have changed. The resolution-rate figures in the noise cell are Cursor's own, not independent. The grid cell says "a blog post
  describes" and "may have changed since".
- **Source quality varies.** Devin's, Factory's, Copilot's and Claude Code's docs pages were fetched as raw Markdown; OpenHands'
  review instructions are skill files in its first-party extensions repository ("skill text", on `main`, can change), and its
  grid cells say so; Cursor's blogs and part of Claude Code's and Devin's pages were searched or summarized, not read in full (see
  each file's "Pages read").
- **No conflict between files on a shared fact** was found, and no numbers are repeated across files with different values. The
  numeric examples in the grid (Claude Code's five Nits, Factory's five comments) each appear in the file that sources them.
- **No product file was changed.** No cell of the grid was changed after the check; the labels were set while drafting from the
  source cells, and the trace above was run on that draft.

### 3. Blanks against the docs index

Playbook rule: flag any blank for a product whose index lists a relevant page. Each file's "Ruled out (why)" list was read against
its blanks. Findings:

- **Devin: older release notes and the CLI and Desktop changelogs were not fetched**, and the 2026 notes were searched by keyword,
  not read in full. A review feature described only there would be missed. Flagged before the lesson says a Devin capability is
  absent (verification pass, pre-existing filter, thumbs-down learning).
- **Factory: the Droid Action `action.yml` was not read** (outside the allowlist); its severity-threshold, blocking and bot-allowlist
  inputs bear on the severity, cap and verdict cells. A `/deep-review` multi-pass skill appears only in a changelog line and is not
  described, and it could bear on the verification cell. The Review Benchmark figures are rendered by a component and absent from
  the Markdown. Flagged.
- **OpenHands: the plugin's `agent_script.py`, `prompt.py` and `evaluate_review.py` and the supply-chain reference were not read**,
  so how prior threads are fetched and how the evaluation counts are unchecked; those bear on the re-review and noise cells.
  The reviewer was not run on a real PR, so the two wording conflicts above are open. Blog posts were not fetched.
- **Cursor: the main changelog index returned scaffolding**, so only the 2026-04-08 entry was read; the blog posts were read
  through a summarizing tool; Security Agents, the analytics API and the SDK GitHub guide were searched, not read in full. The
  pre-existing, cap and dismissal blanks are open to a changelog entry.
- **Copilot: blog and changelog posts were not read**, and the Copilot CLI review agent was not re-read (it reviews local changes,
  not a pull request). The Not documented cells for verification, pre-existing filter and noise are from the docs pages and the
  application card only. Flagged.
- **Claude Code: the plugin's `SKILL.md` and a second README returned empty bodies**, so nothing is cited from them; Ultrareview,
  the GitHub Actions page, Analytics and Memory were searched, not read in full; the subagents and skills pages (for building your
  own reviewer) were not fetched. The plugin and Ultrareview surfaces are in the file but not shown in the grid.

### 4. Counts per dimension

Counts are "N of 6" on the shown surfaces (the grid above), by label: **plain** is Yes or No, **partial** is Partly, **wholly not
documented** is Not documented, and a fourth column counts Other surface. They do not describe every surface of a product.

| Dimension | Plain | Partial | Wholly not documented | Other surface | Who |
| --- | --- | --- | --- | --- | --- |
| Findings graded by severity or confidence | 1 | 4 | 0 | 1 | Yes: Devin; Other surface: Factory |
| Threshold or cap on comments posted | 0 | 6 | 0 | 0 | none states a numeric cap |
| Verification pass before posting | 1 | 3 | 1 | 1 | Yes: Claude Code; Not documented: Copilot; Other surface: Factory |
| Filter for problems that existed before the PR | 0 | 2 | 3 | 1 | Not documented: Devin, Cursor, Copilot; Other surface: Factory |
| Repo guidance files and how to ignore | 3 | 3 | 0 | 0 | Yes: Devin, Cursor, Claude Code |
| Evidence required (file and line) | 2 | 4 | 0 | 0 | Yes: OpenHands, Claude Code |
| Re-review: only new changes | 3 | 3 | 0 | 0 | Yes: Devin, Cursor, Claude Code |
| How a person dismisses or teaches it | 1 | 4 | 1 | 0 | Yes: Copilot; Not documented: Factory |
| How its own noise is measured | 0 | 4 | 2 | 0 | Not documented: Factory, Copilot |
| States a verdict or approves | 3 | 3 | 0 | 0 | Yes: OpenHands, Copilot; No: Claude Code |
| **All (60 cells)** | **14** | **36** | **7** | **3** | |

## Observations

"Common", "uneven" and "rare" are judgements over the counts above. Facts are the product files'.

| Dimension | Verdict | Notes |
| --- | --- | --- |
| Findings graded | **Common for severity, rare for confidence** | Five of six shown surfaces have a severity-style grade (Cursor's only in analytics data); Factory's is on another surface, local `/review`; no shown surface documents a visible confidence score. Claude Code's plugin, another surface, scores 0 to 100 and drops anything under 80. |
| Cap on comments | **Rare as a number** | No shown surface documents a numeric count cap. What exists is a rule written by the repo (Claude Code's `REVIEW.md`, Factory's prompt line), a content bar in skill text (OpenHands), a posting switch per class (Devin) or limits on whether a review runs (Cursor, Copilot effort). |
| Verification pass | **Uneven, and often in prompts or posts** | One shown surface documents a named stage (Claude Code); OpenHands has it as instructed steps in skill text; Cursor's is in a blog post; Devin's is not named; Copilot documents none; Factory's is on another surface. |
| Pre-existing-problem filter | **Mostly not documented** | Three of six not documented, one other surface, two partly (OpenHands skill text; Claude Code treats it as its own class, not a filter). |
| Guidance files | **Common, with an ignore written in prose** | All six document a guidance file; `REVIEW.md` is read by three (Devin, Copilot, Claude Code). "Ignore" is prose in most; Factory and Copilot add structural routes (a paths list, `excludeAgent`). |
| Evidence required | **Location shown everywhere, a rule rarely** | Every file shows findings tied to a location; a must-cite rule is documented as such for OpenHands (skill text) and, optionally, Claude Code via `REVIEW.md`; Devin, Cursor, Copilot and Factory say a rule is not documented. |
| Re-review | **Differs** | Incremental by default on three (Devin, Cursor, Claude Code after a push); off by default on two (OpenHands, Copilot); Factory runs again on each push with repeat-avoidance not documented. |
| Dismissal and teaching | **Mostly manual** | Resolving a thread and editing a guidance file are the levers; Cursor alone documents learning from reactions and replies. Copilot's thumbs go to GitHub and replies are not read by it. |
| Noise measured | **Outcome counts, never a false-positive rate** | Cursor (resolution rate), Claude Code (auto-resolved comments), Devin (resolved only when fixed in code) and OpenHands (a recipe) document an outcome measure; none documents a false-positive or precision rate; Factory and Copilot document no review figure. |
| Verdict | **Differs** | Factory, OpenHands and Copilot (opt-in) can approve; Devin and Cursor approve on another surface; Claude Code never approves or blocks. |

## What this grid cannot say

- **Absence.** "Not documented" means not on the pages checked. Seven grid cells are labelled that and 35 of the 172 source cells
  are wholly that; most of the rest carry a stated gap. None of it shows a product lacks a capability.
- **How good any reviewer actually is.** The grid records documented mechanisms. No product file ran a reviewer on a real PR, and
  the only quality figures (Cursor's resolution rate, Cursor's Autofix merge rate) are the vendor's own.
- **Which wording wins at run time.** Where docs and skill text differ (OpenHands' Nit label and Critical verdict), the files
  record both and do not say which governs.
- **Behaviour that lives in code the files did not read.** Factory's action inputs, OpenHands' plugin scripts and Claude Code's
  plugin skill file are unchecked.
- **Defaults and plan limits.** Several features are beta, in preview, or on a plan (Devin's Autoapprover and custom reviewers,
  Copilot's approvals and Max effort, Claude Code's Team and Enterprise service, Cursor's usage-based effort levels). The grid names
  them where the file does and cannot say who has them switched on.
- **Surfaces beyond the one shown.** The grid shows one surface per product; the other columns and rows are in each file and in
  the counts by product above.
- **Anything after 2026-11-11.** Release notes and changelogs were not fully searched for any of the six.

## Product files

- [Devin](devin.md)
- [Factory](factory.md)
- [OpenHands](openhands.md)
- [Cursor](cursor.md)
- [Copilot](copilot.md)
- [Claude Code](claude-code.md)
