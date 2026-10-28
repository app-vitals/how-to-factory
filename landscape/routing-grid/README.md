# Routing grid: what a PR needs next (lesson 4)

**As of 2026-10-28** (every product file was fetched that day). Every product cell below is a short pointer to the matching cell in
that product's own file, which holds the full wording, the first-party URLs, the pages read and the pages ruled out. This README
adds no claim that the per-product files do not source; the cross-check and observations are counts and comparisons computed from
those files. Nothing here describes our own sample factory: that comparison belongs to the Shipwright inventory
(`planning/lesson4-pr-routing/shipwright-inventory.md`) and the ranking built on it.

Scope is the lesson 4 step only: a PR is open, and something decides whether it needs a review, a fix, or nothing until a person
acts. Plan making (the plan grid), ticket selection (the field grid), and checks before the PR (the verify grid) are left out on
purpose (see each product file).

## The grid

Each product row shows the one surface that reviews the PR, because the review is the first decision the loop makes. Every product
has other surfaces, each its own column in its file, and they differ; the counts further down cover all of them. Where the shown
surface has no cell for a dimension and another surface of the same product does, the cell says **Other surface** and names it.
"Approval" uses the words each file uses: a product "approves" only where its file says so. Names are each product's own, not
canonical.

Surfaces shown: Devin, Devin Review; Factory, Droid Review; OpenHands, Automated Code Review; Cursor, Bugbot; Copilot, Copilot
code review; Claude Code, Code Review (the managed service).

**Starting a review and running it again**

| Product (surface shown) | What triggers a review | Re-review after new commits | Who may approve; does an AI approval count |
| --- | --- | --- | --- |
| [Devin](devin.md) (Devin Review) | Auto-review on "PR is created" (drafts included) or "PR is ready"; or `/devin review` from someone with write access | A setting: "Only once" or "Every push"; otherwise a person re-runs it | People approve under their own identity; a beta **Autoapprover** can approve the reviewed commit. Whether the repo counts that toward merge: not documented |
| [Factory](factory.md) (Droid Review) | PR opened, pushed, reopened or marked ready (drafts skipped), or `@droid review`; `automatic_review` defaults to `false`, so the automatic route is opt-in | The workflow fires again on each push; how old comments are deduplicated: not documented | Submits an approval when it finds no issues. Whether that satisfies branch protection: not documented |
| [OpenHands](openhands.md) (Automated Code Review) | Non-draft PR opened, draft marked ready, the `review-this` label, or `openhands-agent` requested as reviewer | Not by default: `synchronize` is left out on purpose "to avoid noisy re-reviews"; re-add the label or re-request the reviewer | The reviewer picks `APPROVE` when nothing blocks; a dedicated bot account approves. Whether that counts toward merge rules: not documented |
| [Cursor](cursor.md) (Bugbot) | Automatically on every PR update, or `cursor review` / `bugbot run`; drafts skipped unless turned on | Yes by default: each push is reviewed, only the changes since the last review; a setting limits it to one per PR | Not approvals: findings and a `Cursor Bugbot` check. **Other surface**: PR Routing & Approval can approve low-risk PRs; whether that satisfies a required reviewer: not documented |
| [Copilot](copilot.md) (code review) | By default only when someone requests Copilot as reviewer; automatic reviews are a setting (PR opened, or draft marked ready) | Not by default: one review unless "Review new pushes" is on; a person can re-request | Default is a "Comment" review that counts for nothing. With approvals on (public preview, off by default) it can approve and that counts like a teammate's; a later push dismisses it |
| [Claude Code](claude-code.md) (Code Review) | Per repository: once on open or ready, after every push, or manual only; `@claude review` always works for someone with write access | Only where pushes trigger reviews (every-push setting, or a PR subscribed with `@claude review always`); later reviews focus on what changed | A review never approves or blocks. Whether a repo's rules count an AI approval: not documented for any surface |

**Fixing its own PR**

| Product (surface shown) | Review comments | Red CI | Merge conflicts |
| --- | --- | --- | --- |
| [Devin](devin.md) | Findings on a Devin-owned PR with monitoring on go to the session first; only unfixed ones post as comments | "Auto-fix" covers bugs and failing CI | Not documented for a single PR (checked: Devin Review, Auto-Fix PR Bugs); resolved quietly for stacks, **other surface** |
| [Factory](factory.md) | Not documented for Droid Review; **other surface**: the "Review Comment Fixer" automation pushes one commit | Not documented; a "checks completed" automation trigger exists | Not documented |
| [OpenHands](openhands.md) | Not documented; **other surface**: the Software Factory does not say how comments become a revision | Not documented; **other surface**: Software Factory turns failed checks into revisions | Not documented; **other surface**: its watchdog updates a stale branch |
| [Cursor](cursor.md) | Autofix (optional) starts a cloud agent on the bugs Bugbot found: off, new branch, or commit to the branch | Not documented for Bugbot; **other surface**: a cloud agent fixes CI on PRs it created | Not documented on any page checked |
| [Copilot](copilot.md) | **Other surface**: the cloud agent, when asked ("Fix with Copilot", `@copilot`); starting on its own: not documented | **Other surface**: cloud agent, when asked from a failing run; Copilot's push waits for a person to approve workflows | **Other surface**: cloud agent, when asked; it then asks the person for review |
| [Claude Code](claude-code.md) | The review is read-only and pushes nothing; **other surface**: cloud auto-fix decides per comment to fix, ask or skip | **Other surface**: cloud auto-fix and Projects threads | **Other surface**: auto-fix gets no event for a conflict; the person asks for a rebase. Projects threads have a Resolve conflicts button |

**Limits, choosing, state, handoff**

| Product (surface shown) | Caps or limits | How it chooses the next action | Where PR state lives | Handoff to a person | A PR it authored itself |
| --- | --- | --- | --- | --- | --- |
| [Devin](devin.md) | A per-PR auto-review spend limit; a cap on fix rounds: not documented | Not documented for the review; findings are graded and posted | GitHub plus Devin: optional commit status, PR comments, review history in the webapp | A person approves, requests changes or merges | Reviewed like any other; Autoapprover will not approve under the same bot identity |
| [Factory](factory.md) | A review-round cap: not documented | Not documented beyond comment or approve; a `review-guidelines` skill steers it | Not documented; comments land on the PR | Not documented | Skipping bot PRs is an optional condition; default: not documented |
| [OpenHands](openhands.md) | A cap on reviews: not documented | Not documented | Review comments, plus a "Review in progress" comment edited to "Review complete" | Not documented; **other surface**: the Software Factory watchdog merges when its conditions pass | Not documented whether it reviews agent PRs; **other surface**: Software Factory does by design |
| [Cursor](cursor.md) | Autofix on the existing branch: 3 attempts per PR; repeat reviews of bot-opened PRs capped, number not given | It does not choose; it reviews and reports | On the PR: inline comments, a `Cursor Bugbot` check, a summary | Findings and links; the merge decision is not described | Ignores `cursor review` posted by a bot account; reviewing cloud-agent PRs: not documented as a separate case |
| [Copilot](copilot.md) | A round cap: not documented; costs are per review and reviews stop when the budget is used | It does not choose; each review is a request or a configured trigger | On the PR: review comments, an overview comment with the approval assessment, the review itself | Posts its review; the person applies suggestions, delegates fixes or merges | Can be reviewed (billed to the human co-author); Copilot approving its own PR: not documented |
| [Claude Code](claude-code.md) | No round cap; limits are spend and credit balance, and a skipped review gets a comment naming the cause | It does not choose; the repo setting, a push, a comment command or a re-run starts the next review | On the PR: inline comments, review body, a `Claude Code Review` check run | Ranked inline comments; the reader resolves, pushes a fix or replies; a reply starts no review | Not documented for this service; comments from bots do not start a review |

## CROSS-CHECK

Method: the six per-product files in `landscape/routing-grid/` were read cell by cell, and each grid cell above was compared with its
source cell. Five files are one column per surface with the same eleven dimension rows; `claude-code.md` is a long table with one row
per surface and dimension that has an answer and no fixed row set, so its cells were matched by dimension name. Every "Other surface"
mark was traced to the cell in the named column. Cells are counted as **plain** (no "not documented" statement), **partial** (a "not
documented" statement beside other text, a ceiling on how much is documented) or **wholly not documented** (only that statement and
its `(checked: ...)` list). The counts come from a throwaway parser over the files as of this commit, not from a tool in the repo, so
treat them as approximate to a cell or two at the margins.

### 1. Counts by product

| Product | Surfaces | Cells in the file | Plain | Partial | Wholly not documented |
| --- | --- | --- | --- | --- | --- |
| Devin | 5 | 55 | 36 | 8 | 11 |
| Factory | 5 | 55 | 15 | 13 | 27 |
| OpenHands | 5 | 55 | 18 | 18 | 19 |
| Cursor | 4 | 44 | 24 | 12 | 8 |
| Copilot | 3 | 33 | 21 | 12 | 0 |
| Claude Code | 5 | 26 | 18 | 8 | 0 |
| **All (27)** | **27** | **268** | **132** | **71** | **65** |

The counts are **not comparable across products**. Claude Code's file has no fixed row set, so a dimension nobody answered has no
cell and shows no wholly-not-documented count; it lists those gaps in a separate section instead. Copilot's file has no wholly empty
cell by construction of its questions, not because it has no gaps. Read Factory's 27 as a statement about its docs index being thin on
PR routing, not as a weaker product.

### 2. Does the grid above match the per-product files?

Every cell in the three tables above was read against the source cell it points to. Findings:

- **Factory's re-review depends on an opt-in.** `factory.md` says the workflow "fires again on each push", and its Findings section
  says "every push fires the workflow again", but its trigger cell says `automatic_review` defaults to `false`. A push starts a review
  only where automatic review is on. The grid says "on each push" in the cell and carries the opt-in in the trigger column. Not
  resolved in the file: its Findings line reads stronger than its cell. Flagged for the next edit of `factory.md`.
- **Devin's own-PR fixing has a setting in the way.** `devin.md` says findings on a Devin-owned PR go to the session first (Devin
  Review column), while the Auto-Fix column's "A PR it authored itself" cell says Devin's own review comments arrive as
  `devin-ai-integration[bot]` and, under the default "No bots" setting, are not acted on as comments unless allowlisted. Both are
  sourced and both are kept; the pages do not say which path wins. The grid shows the first and does not claim the loop works by
  default. Flagged, not resolved.
- **Approval words differ.** Factory and OpenHands say their reviewers "approve"; Cursor's Bugbot and Claude Code's Code Review say
  they do not; Devin separates the reviewer (no approval) from a beta Autoapprover; Copilot comments by default. The grid uses each
  file's own verb and does not map them onto one scale.
- **Claude Code's "fixes its own PR" is one row, not three.** `claude-code.md` has a single "does it fix its own PR" row for the
  managed review and separate rows for merge conflicts and CI only on the cloud auto-fix surface. The grid splits those into the
  review-comment, CI and conflict columns; the review-comment column for Claude Code is the cloud auto-fix "trigger and next action"
  row, marked **Other surface**.
- **Cursor's "other surface" cells rest on searched pages.** The cloud agent, capabilities, automations and GitHub pages behind
  Cursor's CI-fix and conflict cells were searched, not read top to bottom (see its Method), so "not documented" there is weaker than
  for Bugbot and PR Routing & Approval, which were read in full.
- **Source-quality caveat applies to three of six.** Devin, Factory and Claude Code say their fetch tool returned a condensed answer,
  not raw page text, so their "not documented" is "the extraction did not mention it". OpenHands re-read every listed page in full;
  Cursor and Copilot fetched raw Markdown with curl but only searched some pages, and say which.
- **No conflict between files on a shared fact.** The numeric limits (Cursor's 3 Autofix attempts and 10 CI-failure follow-ups,
  Copilot's 59-minute session) each appear once, in the file that sources them, and no other routing file contradicts them.
- **Nothing found where a grid cell says more than its source.** After the checks above, no cell was changed.

### 3. Blanks against the docs index

Playbook rule: flag any blank for a product whose index lists a relevant page. Each file's "Ruled out (why)" list was read against
its blanks. Findings:

- **Devin: release notes and CLI changelog not searched**, and the non-GitHub source-control pages were not fetched, so routing there is
  unchecked. Flagged for re-check before the lesson says a Devin capability is absent.
- **Factory: `droid-exec/recipes/lint-autofix` was judged from its index description**, which says it ends in a PR. It bears on "fixes
  its own PR"; flagged. Release notes were not searched.
- **OpenHands: release notes not searched**; Headless Mode and the Critic page were not fetched again for routing.
- **Cursor: Security Agents not fetched again** though it feeds PR Routing & Approval; marketplace templates for fixing review
  comments and triaging workflows were script-rendered and unreadable, so those two blanks are open.
- **Copilot: three pages not read** (the cloud agent risks page returned 404, GitHub Agentic Workflows and Copilot CLI in Actions were
  not fetched, agent apps fetched but not read in detail). The 404 page and the Actions pages could bear on red CI without a
  person. Flagged.
- **Claude Code: ultrareview and local `/code-review` not fetched**; the person starts both, so no routing blank turns on them.
  Release notes were not searched.

### 4. Counts on the shown surfaces

Counts are "N of 6" shown surfaces only (the tables above), judged from the cells. They do not describe every surface of a product.

| Dimension | Count on the shown surfaces |
| --- | --- |
| An automatic review trigger exists | **6 of 6** as a setting or a documented trigger; stated as the default in 1 (Cursor); stated as off by default in 2 (Factory, Copilot) |
| Re-review on a push | **On by default** in 1 (Cursor); **off unless a setting is turned on** in 2 (OpenHands, Copilot); a setting with no stated default in 2 (Devin, Claude Code); Factory only if its opt-in is on |
| The reviewer posts an approval | **Yes** in 3 (Factory, OpenHands, Copilot when switched on); beta Autoapprover in 1 (Devin); **No** in 2 (Cursor Bugbot, Claude Code) |
| Documented whether an AI approval counts toward merge | **1 of 6** (Copilot, when enabled); not documented for the other five |
| A numeric cap on rounds | **1 of 6** (Cursor: 3 Autofix attempts, 10 CI follow-ups); Devin caps spend, not rounds; the other four state none |
| The reviewer's own surface can fix the PR | **2 of 6** as an option (Devin Review's auto-fix, Cursor Bugbot's Autofix); Claude Code's review is read-only; the other three use another surface or a person |
| Fixes review comments without a person asking | **3 of 6** (Devin, Cursor Autofix, Claude Code cloud auto-fix on **another surface**); Copilot on request; Factory and OpenHands other surface, unclear |
| Merge-conflict repair documented for a single PR | **1 of 6** (Copilot, when asked); Claude Code says it cannot react on its own; the other four not documented or stacks only |
| PR state kept on GitHub | **6 of 6** (comments, checks, statuses or labels); Devin and Claude Code add state in their own app or session |
| A person is the stated handoff | **3 of 6** (Devin, Copilot, Claude Code); Cursor Bugbot posts findings and links but does not describe the merge decision; **not documented** for Factory and OpenHands (OpenHands' Software Factory watchdog merges on its own, **other surface**) |

## Observations

"Common", "uneven" and "rare" are judgements over the counts above. Facts are the product files'.

| Dimension | Verdict | Notes |
| --- | --- | --- |
| What triggers a review | **Same shape, different defaults** | Every product has an automatic trigger and a manual one; whether automatic is the default differs. |
| Re-review after new commits | **Differs, and often off** | One of six re-reviews every push by default (Cursor); OpenHands and Copilot leave it off until a setting is turned on; Devin and Claude Code make it a setting; Factory depends on its opt-in. |
| Who may approve | **Differs; rarely says what counts** | Only Copilot says when an AI approval satisfies a required-approval rule, and it dismisses that approval on the next push. |
| Fixes its own PR | **Usually a different surface from the reviewer** | The review and the fix are separate pieces in Factory, OpenHands, Cursor, Copilot and Claude Code. Devin ties them together through the session that owns the PR. |
| Merge conflicts | **Rare** | One of six documents a repair for a single PR; one documents why it cannot react. |
| Caps on rounds | **Rare** | One numeric cap in the shown set; the limits that exist bound spend, time or event counts. |
| How it chooses the next action | **Mostly not the product's job** | Three of six say outright that the trigger or a person decides; the rest do not document a rule. |
| Where PR state lives | **Common: GitHub** | Comments, checks, statuses or labels in all six. |
| Handoff to a person | **Uneven** | A person is the stated handoff in three of six; Cursor leaves the merge decision undescribed, Factory and OpenHands do not document a handoff. |
| A PR it authored itself | **Mostly not documented** | Every file answers this in part (an identity rule, a billing note, a skip condition); none documents the full case. |

## What this grid cannot say

- **Absence.** "Not documented" means not on the pages checked. 65 cells are wholly that, and most product files read condensed
  extractions of their pages. None of it shows a product lacks a capability.
- **How a decision gets made inside a product.** The rows ask how the next action is chosen; the docs mostly describe triggers, not
  decision rules. Only Cursor's PR Routing & Approval and Claude Code's cloud auto-fix describe weighing inputs before acting.
- **Whether the pieces form one loop.** Several products ship a reviewer, a fixer and an approver as separate surfaces. The files
  rarely say whether one hands off to the next without a person. Factory's, Copilot's and Claude Code's Findings say they do not.
- **Behaviour under load.** Queueing, ordering across many PRs, and starvation of one phase by another are not covered by any product
  page read. That is a Shipwright question (see its inventory), not a sourced claim about anyone else.
- **Defaults and plan limits.** Several features are beta, preview, or on a particular plan (Cursor's CI fix on Teams and Enterprise,
  Copilot's approvals in public preview). The grid names them where the file does and cannot say who has them switched on.
- **Anything after 2026-10-28.** Release notes and changelogs were not searched for any of the six.

## Product files

- [Devin](devin.md)
- [Factory](factory.md)
- [OpenHands](openhands.md)
- [Cursor](cursor.md)
- [Copilot](copilot.md)
- [Claude Code](claude-code.md)
