# Options: how the field makes a review worth reading, and a loop converge

Names are not canonical. Every claim about another product below is a paraphrase of a first-party page, taken from the lesson 6
review-quality grid ([`landscape/review-grid/`](../../landscape/review-grid/README.md)) and from
[`landscape/matrix.json`](../../landscape/matrix.json) (rendered in [landscape/README.md](../../landscape/README.md)). Each claim
carries its source URL and the date that page was fetched. The review-quality cells are all 2026-11-11; the patch and round-cap cells
(A7, A9, A10) come from the lesson 4 routing grid and are 2026-10-28, which is why those tables read "Checked 10/2026". Re-check
before filming. These appear on slides only; the lesson does not run other products live.

Scope is the lesson 6 step only: a review exists and a patch answers it, and the question is how good each is and whether the
loop converges. What triggers a review and who fixes the PR is lesson 4 (the routing grid is used only for the patch rows);
checks before the PR are lesson 3. Several reviewers voting, an incident eval set, risk-tiered approval and real merge are left out
on purpose (see [brief.md](brief.md)).

## One team's numbers (the hook)

One article from one team is used as a source, and only for what it says about its own work. "How the Claude Code team does code
review" (claude.dev Blog, published 2026-10-15, fetched 2026-11-11, <https://claude.dev/blog/solving-code-review-at-anthropic/>).
Every figure is that team's own internal PRs, with no dates or sample sizes given for the before and after sides: not a benchmark,
and not a claim about any other product. Only claims verified against the raw page are used (the check is in
`planning/lesson6-review-patch/anthropic-article.md`).

- Substantive review comments on internal PRs went from 16% to 54% once review ran on every PR
  ([source](https://claude.dev/blog/solving-code-review-at-anthropic/), blog post published 2026-10-15, fetched 2026-11-11).
- One CLI PR went through more than 50 rounds of review and fixes overnight, until its author stopped it ([source](https://claude.dev/blog/solving-code-review-at-anthropic/), blog post published 2026-10-15, fetched 2026-11-11).
- After the team's convergence work, PRs needing five or more rounds fell from 8.9% to 1.5% ([source](https://claude.dev/blog/solving-code-review-at-anthropic/), blog post published 2026-10-15, fetched 2026-11-11). One convergence figure at
  most goes on a slide.
- The article's cap of three rounds is that team's rule, not ours; after three rounds the reviewer asks the author to rethink the
  approach ([source](https://claude.dev/blog/solving-code-review-at-anthropic/), blog post published 2026-10-15, fetched 2026-11-11).

## How the field differs

One table per Tier A capability of the [brief](brief.md), in the brief's own ids (A1 to A10) and its order of stages (Review,
Re-review, Patch, Converge). Each table opens with the field, then ends with the row for this lesson's sample. Where a capability has
a matrix dimension, the Mark column is that cell's chip: ✓ yes, ✗ no (only where a cited page states it), ◐ partly or mixed, and `–`
where the pages checked do not say. In each cell the bold text names the surface the claim is about, because most products have
several and they are usually separate; the review surface is shown unless the cell says otherwise. A cell reads "Not in their docs"
when the pages checked do not say, and lists them. That is a statement about those pages, not about what the product can do: most
fetches returned condensed extractions, so a gap can also be a page the extraction left out. The last row of each table is the target
for this lesson's sample. It comes from the [brief](brief.md) and is our own design, not a claim about anyone else. Where a
sample capability has no dimension in the grid (a computed verdict, an attestation per finding, a base-red check), the field
tables say nothing about it and "Not compared here" lists it.

### Review: find

#### A1. Grade each finding, post only above a threshold, cap the count

Simplest version: each finding gets a severity and a confidence; those below a threshold are dropped and the rest capped to a count
(the lesson shows the numbers as choices, not rules).

**Grade** (matrix dimension "Grades findings by severity or confidence")

| Checked 11/2026 | Mark | Grades findings |
|---|---|---|
| Devin | ✓ | **Severe / Non-severe**: Severe or Non-severe; Critical or Warning ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-11-11) |
| Factory (Droid) | ◐ | **P0 to P3**: CI review not documented; /review grades P0-P3 ([source](https://docs.factory.com/automations/code-review), as of 2026-11-11) |
| GitHub Copilot | ◐ | **Severity label**: High, Medium or Low labels; no confidence ([source](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review), as of 2026-11-11) |
| OpenHands | ◐ | **Priority labels**: Four labels, risk block; no confidence score ([source](https://docs.openhands.dev/openhands/usage/use-cases/code-review.md), as of 2026-11-11) |
| Cursor | ◐ | **Severity field**: Severity in analytics data; no visible confidence ([source](https://cursor.com/docs/bugbot.md), as of 2026-11-11) |
| Claude Code | ◐ | **Severity markers**: Important, Nit, Pre-existing; no confidence grade ([source](https://code.claude.com/docs/en/code-review-pull-requests.md), as of 2026-11-11) |
| This sample | ✓ | Target: severity and confidence on each finding ([source](brief.md)) |

✓ yes  ✗ no  ◐ partly  – not in their docs

Five of six shown surfaces have a severity-style grade, one of them off the shown surface (Factory's local `/review`; Cursor's only in
analytics data); none documents a visible confidence score. Claude Code's plugin, another surface, scores 0 to 100 and drops anything
under 80 ([source](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/code-review/README.md), as of 2026-11-11).

**Threshold or cap** (matrix dimension "Caps or thresholds comments posted")

| Checked 11/2026 | Mark | Limits what is posted |
|---|---|---|
| Devin | ◐ | **Finding types**: No count cap; per-type posting switches ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-11-11) |
| Factory (Droid) | ◐ | **Prompt line**: No default cap; prompt can add one ([source](https://docs.factory.com/automations/code-review-ci), as of 2026-11-11) |
| GitHub Copilot | ◐ | **Review effort**: No comment cap; effort Lite, Balanced, Max ([source](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review), as of 2026-11-11) |
| OpenHands | ◐ | **Material finding**: No numeric cap; 'material finding' bar ([source](https://github.com/OpenHands/extensions/blob/main/skills/code-review/SKILL.md), as of 2026-11-11) |
| Cursor | ◐ | **Size limit**: No comment cap; size limit and effort setting ([source](https://cursor.com/docs/bugbot.md), as of 2026-11-11) |
| Claude Code | ◐ | **REVIEW.md caps**: No built-in cap; REVIEW.md can set one ([source](https://code.claude.com/docs/en/code-review-customize.md), as of 2026-11-11) |
| This sample | ✓ | Target: drop below a threshold, then cap the count ([source](brief.md)) |

✓ yes  ✗ no  ◐ partly  – not in their docs

No shown surface documents a numeric cap on comments. What exists is a rule the repo writes (Claude Code's `REVIEW.md`, Factory's
prompt line), a content bar in skill text (OpenHands), a posting switch per class (Devin) or limits on whether a review runs
(Cursor, Copilot effort).

#### A2. Drop findings whose code is already on the base branch

Simplest version: a finding on a line the PR did not change is dropped before posting.

| Checked 11/2026 | Mark | Filters problems that predate the PR |
|---|---|---|
| Devin | – | Not in their docs. Pages checked: Devin Review, Auto-Fix PR Bugs (docs.devin.ai). No filter for problems that existed before the PR is named; nearby, a later push is reviewed for bugs introduced or affected by the changes since the last review, and each PR in a stack is diffed against the layer below. (as of 2026-11-11) |
| Factory (Droid) | ◐ | **Introduced by change**: CI review not documented; /review requires introduced-by-change ([source](https://docs.factory.com/automations/code-review), as of 2026-11-11) |
| GitHub Copilot | – | Not in their docs. Pages checked: the code review concept page, use-code-review, configure-code-review, the responsible-use agents card and the customize-code-review tutorial (docs.github.com). The card says only that it reads pull request diffs and metadata. (as of 2026-11-11) |
| OpenHands | ◐ | **Current head**: Present on current head; diff-base filter undocumented ([source](https://github.com/OpenHands/extensions/blob/main/skills/code-review/SKILL.md), as of 2026-11-11) |
| Cursor | – | Not in their docs. Pages checked: Bugbot docs, Bugbot help page, Bugbot blog posts (cursor.com). No filter for problems that existed before the PR is named; nearby, it analyzes the PR diff and by default only the changes since its previous review. (as of 2026-11-11) |
| Claude Code | ◐ | **Pre-existing**: Own severity class; first-review suppression undocumented ([source](https://code.claude.com/docs/en/code-review-pull-requests.md), as of 2026-11-11) |
| This sample | ✓ | Target: findings on code the PR did not change are dropped ([source](brief.md)) |

✓ yes  ✗ no  ◐ partly  – not in their docs

Three of six have no such cell, three are partly, none is a plain yes. Claude Code treats Pre-existing as its own severity class, not
a filter. For the reason it matters, one team reported that about 59% of what its reviewer kept flagging was old code that had been
there since the reviewer's first pass (found with `git blame`) ([source](https://claude.dev/blog/solving-code-review-at-anthropic/), blog post published 2026-10-15, fetched 2026-11-11).

#### A3. Judge against the repo's own rules, with file and line evidence

Simplest version: the review loads the repo's rules file and cites a file and line for every finding.

**Repo guidance** (matrix dimension "Reads repo guidance files, with ignore rules")

| Checked 11/2026 | Mark | Repo guidance file |
|---|---|---|
| Devin | ✓ | **REVIEW.md**: REVIEW.md plus AGENTS.md, CLAUDE.md and more ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-11-11) |
| Factory (Droid) | ◐ | **review-guidelines**: review-guidelines skill; AGENTS.md reading not documented ([source](https://docs.factory.com/automations/code-review-ci), as of 2026-11-11) |
| GitHub Copilot | ◐ | **Custom instructions**: Instruction files, AGENTS.md, REVIEW.md; excludeAgent ([source](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review), as of 2026-11-11) |
| OpenHands | ◐ | **Repo review skill**: Repo skill file; no ignore syntax ([source](https://docs.openhands.dev/openhands/usage/use-cases/code-review.md), as of 2026-11-11) |
| Cursor | ✓ | **BUGBOT.md**: BUGBOT.md nested; ignore is prose ([source](https://cursor.com/docs/bugbot.md), as of 2026-11-11) |
| Claude Code | ✓ | **REVIEW.md**: CLAUDE.md and REVIEW.md from base branch ([source](https://code.claude.com/docs/en/code-review-customize.md), as of 2026-11-11) |
| This sample | ✓ | Target: read the repo's rules file before judging ([source](brief.md)) |

✓ yes  ✗ no  ◐ partly  – not in their docs

**Evidence** (matrix dimension "Requires file and line evidence")

| Checked 11/2026 | Mark | Location on each finding |
|---|---|---|
| Devin | ◐ | **Learn more**: Location rule not documented; findings show explanation, fix ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-11-11) |
| Factory (Droid) | ◐ | **Inline comments**: Inline comments on lines; proof rule not documented ([source](https://docs.factory.com/automations/code-review-ci), as of 2026-11-11) |
| GitHub Copilot | ◐ | **Line feedback**: Tied to lines, suggested change; proof rule undocumented ([source](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review), as of 2026-11-11) |
| OpenHands | ✓ | **Line references**: Line references and verified path and line ([source](https://docs.openhands.dev/openhands/usage/use-cases/code-review.md), as of 2026-11-11) |
| Cursor | ◐ | **Inline comments**: Inline with fix; must-cite rule not documented ([source](https://cursor.com/docs/bugbot.md), as of 2026-11-11) |
| Claude Code | ✓ | **File:Line table**: Inline comments, File:Line table, reasoning section ([source](https://code.claude.com/docs/en/code-review-pull-requests.md), as of 2026-11-11) |
| This sample | ✓ | Target: a finding without file and line is dropped ([source](brief.md)) |

✓ yes  ✗ no  ◐ partly  – not in their docs

All six document a guidance file. Every file shows findings tied to a location; a must-cite rule is documented as such for OpenHands
(skill text) and, optionally, for Claude Code via `REVIEW.md`. For the same idea in one team's words: a short code-owner guidance
file tells the reviewer what matters, caps nits, lists paths to skip and asks for file-and-line evidence, and the team checks
separately that the reviewer follows it ([source](https://claude.dev/blog/solving-code-review-at-anthropic/), blog post published 2026-10-15, fetched 2026-11-11).

### Review: decide and verify

#### A4. A mechanical verdict plus a gate, so the label cannot disagree with the review

Simplest version: a script computes the verdict from the surviving findings; a gate refuses to post a label that contradicts them;
the reviewer never requests changes on its own author's PR.

The field's version is whether the reviewer states a verdict or approves (matrix dimension "States a verdict or approves"). A
verdict computed by script, and a gate on the label, are not dimensions in the grid, so they are not compared.

| Checked 11/2026 | Mark | States a verdict or approves |
|---|---|---|
| Devin | ◐ | **Devin Review status**: Commit status; approval is Autoapprover, beta ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-11-11) |
| Factory (Droid) | ◐ | **Approval**: Approves when no issues; blocking not documented ([source](https://docs.factory.com/automations/code-review-ci), as of 2026-11-11) |
| GitHub Copilot | ✓ | **Approval assessment**: Assessment in overview; approvals opt-in ([source](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review), as of 2026-11-11) |
| OpenHands | ✓ | **Review verdict**: APPROVE, COMMENT or REQUEST_CHANGES ([source](https://docs.openhands.dev/openhands/usage/use-cases/code-review.md), as of 2026-11-11) |
| Cursor | ◐ | **Cursor Bugbot check**: Neutral check by default; approval is other surface ([source](https://cursor.com/docs/bugbot.md), as of 2026-11-11) |
| Claude Code | ✗ | **Neutral check**: Never approves or blocks; neutral check ([source](https://code.claude.com/docs/en/code-review.md), as of 2026-11-11) |
| This sample | ✓ | Target: verdict computed from findings; gate refuses a mismatched label ([source](brief.md)) |

✓ yes  ✗ no  ◐ partly  – not in their docs

Factory, OpenHands and Copilot (opt-in) can approve; Devin and Cursor approve on another surface; Claude Code never approves or
blocks. Nothing is said about which of these a team should want.

#### A5. A fresh-context verifier drops findings it can disprove

Simplest version: a second agent that cannot see the first one's reasoning tries to disprove each finding and drops the ones it can.
Kept on design; the first item to move to a walk-through if time is short.

| Checked 11/2026 | Mark | Verifies before posting |
|---|---|---|
| Devin | ◐ | **Finding triage**: Verification step not documented; triage on own PRs ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-11-11) |
| Factory (Droid) | ◐ | **Two passes**: CI review none; Security review runs two passes ([source](https://docs.factory.com/automations/security-review), as of 2026-11-11) |
| GitHub Copilot | – | Not in their docs. Pages checked: the code review concept page, use-code-review, configure-code-review and the responsible-use agents card (docs.github.com). The card lists four steps, none a separate check, and names false positives as a known risk. (as of 2026-11-11) |
| OpenHands | ◐ | **Verify before posting**: Instructed re-read and reproduce step; no second model ([source](https://github.com/OpenHands/extensions/blob/main/skills/code-review/SKILL.md), as of 2026-11-11) |
| Cursor | ◐ | **Eight passes**: Blog: eight passes, majority vote, validator; docs silent ([source](https://cursor.com/blog/building-bugbot), as of 2026-11-11) |
| Claude Code | ✓ | **Verification step**: Parallel finders, then verification drops false positives ([source](https://code.claude.com/docs/en/code-review.md), as of 2026-11-11) |
| This sample | ✓ | Target: a fresh-context verifier drops findings it can disprove ([source](brief.md)) |

✓ yes  ✗ no  ◐ partly  – not in their docs

One shown surface documents a named stage (Claude Code); OpenHands has it as instructed steps in skill text; Cursor's is in a blog
post that may have changed since; Devin's is not named; Copilot documents none; Factory's is on another surface.

### Re-review

#### A6. A diff-only re-review that does not repost findings and attests per earlier finding

Simplest version: after a patch, the review reads only the new diff, does not repost earlier findings, and states for each earlier
finding whether it is fixed, rejected or still there.

| Checked 11/2026 | Mark | Re-reviews only new changes |
|---|---|---|
| Devin | ✓ | **Incremental review**: Changes since last review; findings carried forward ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-11-11) |
| Factory (Droid) | ◐ | **Re-run on push**: Runs each push; avoiding repeats not documented ([source](https://docs.factory.com/automations/code-review-ci), as of 2026-11-11) |
| GitHub Copilot | ◐ | **Review new pushes**: Off by default; may repeat resolved comments ([source](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review), as of 2026-11-11) |
| OpenHands | ◐ | **Manual re-review**: No push trigger; avoids duplicate comments ([source](https://docs.openhands.dev/openhands/usage/use-cases/code-review.md), as of 2026-11-11) |
| Cursor | ✓ | **Incremental Review**: Only changes since last review; reads earlier comments ([source](https://cursor.com/docs/bugbot.md), as of 2026-11-11) |
| Claude Code | ✓ | **Focused re-review**: Focuses on changes; says how many left out ([source](https://code.claude.com/docs/en/code-review-pull-requests.md), as of 2026-11-11) |
| This sample | ✓ | Target: new diff only, no reposts, an attestation per earlier finding ([source](brief.md)) |

✓ yes  ✗ no  ◐ partly  – not in their docs

Incremental by default on three (Devin, Cursor, Claude Code); off by default on two (OpenHands, Copilot); Factory runs again on each
push with repeat-avoidance not documented. A per-finding attestation is not a dimension in the grid. One team reported re-reviewing
only the new diff after the first few passes, and no repeats of findings already posted ([source](https://claude.dev/blog/solving-code-review-at-anthropic/), blog post published 2026-10-15, fetched 2026-11-11).

### Patch

The grid covers review quality only. The three patch tables below use the lesson 4 routing grid, so their cells are dated
2026-10-28.

#### A7. Verify each finding before touching code: accept, modify or reject

Simplest version: the patch decides for each finding whether it is real, partly right or wrong before it edits anything.

The field's version is whether a fixer works review comments without being asked (matrix dimension "Fixes review comments itself").
A check before acting is not a dimension, so it is not compared.

| Checked 10/2026 | Mark | Fixes review comments |
|---|---|---|
| Devin | ✓ | **Devin Review auto-fix**: Session fixes findings on its own PRs ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-10-28) |
| Factory (Droid) | ◐ | **Review Comment Fixer**: Starter automation pushes one fix commit ([source](https://docs.factory.com/software-factory/automations.md), as of 2026-10-28) |
| GitHub Copilot | ◐ | **Fix with Copilot**: Cloud agent fixes when asked ([source](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github.md), as of 2026-10-28) |
| OpenHands | – | Not in their docs. Pages checked: Automated Code Review, PR Review workflow, Software Factory (does not say how comments become a revision), GitHub Integration. (as of 2026-10-28) |
| Cursor | ◐ | **Bugbot Autofix**: Optional Autofix on Bugbot findings ([source](https://cursor.com/docs/bugbot.md), as of 2026-10-28) |
| Claude Code | ◐ | **Cloud auto-fix**: Cloud auto-fix, not the reviewer ([source](https://code.claude.com/docs/en/claude-code-on-the-web.md), as of 2026-10-28) |
| This sample | ✓ | Target: accept, modify or reject each finding before the edit ([source](brief.md)) |

✓ yes  ✗ no  ◐ partly  – not in their docs

For the modify path, one team reported flagging the class of bug so the author fixes every instance, not one line ([source](https://claude.dev/blog/solving-code-review-at-anthropic/), blog post published 2026-10-15, fetched 2026-11-11). The
article does not describe a fix-back mechanism beyond an agent often picking up the fix overnight, so nothing else from it is used
for the patch.

#### A8. The reject path: a rebuttal plus a settled record, so a wrong finding ends the loop

Simplest version: a rejected finding gets a short reasoned reply and a record that marks it settled, including resolving its thread.

The grid shows only the human side: how a person dismisses a finding or teaches the reviewer it was wrong (matrix dimension "Lets a
person dismiss or teach a finding"). A fixer rebutting a finding and recording it is not a dimension, so it is not compared.

| Checked 11/2026 | Mark | Person dismisses or teaches |
|---|---|---|
| Devin | ◐ | **Resolve finding**: Mark resolved, edit REVIEW.md; thumbs-down not documented ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-11-11) |
| Factory (Droid) | – | Not in their docs. Pages checked: Automated Code Review (CI), Security Review, local /review, Automations custom (docs.factory.com). No feedback control for dismissing or teaching a finding is described; the lever shown is editing the guidelines skill or the workflow. (as of 2026-11-11) |
| GitHub Copilot | ✓ | **React or resolve**: React, reply, resolve or hide; teach via instructions ([source](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review), as of 2026-11-11) |
| OpenHands | ◐ | **Edit the guide**: Edit the guide and re-request; thumbs invited ([source](https://github.com/OpenHands/extensions/blob/main/skills/code-review/SKILL.md), as of 2026-11-11) |
| Cursor | ◐ | **@cursor remember**: Remember command, learned rules; dismiss click undescribed ([source](https://cursor.com/docs/bugbot.md), as of 2026-11-11) |
| Claude Code | ◐ | **Resolve thread**: Resolve thread, reply, edit REVIEW.md; no thumbs loop ([source](https://code.claude.com/docs/en/code-review-pull-requests.md), as of 2026-11-11) |
| This sample | ✓ | Target: rebuttal comment plus a settled record the review reads ([source](brief.md)) |

✓ yes  ✗ no  ◐ partly  – not in their docs

Mostly manual: resolving a thread and editing a guidance file are the levers; Cursor alone documents learning from reactions and
replies.

#### A9. CI triage: check whether the base branch is red too; rerun a cancelled run first

Simplest version: before fixing red CI, the patch checks whether main is red as well and flags a person if so; a cancelled run is
rerun rather than fixed.

The field's version is whether something fixes red CI (matrix dimension "Fixes red CI itself"). Triage before the fix is not a
dimension, so it is not compared.

| Checked 10/2026 | Mark | Fixes failing checks |
|---|---|---|
| Devin | ✓ | **Auto-Fix**: Auto-Fix iterates on failing CI ([source](https://docs.devin.ai/essential-guidelines/sdlc-integration.md), as of 2026-10-28) |
| Factory (Droid) | – | Not in their docs. Pages checked: Automated Code Review, Custom Automations (a checks-completed trigger exists, no CI-fix starter), Delegations. (as of 2026-10-28) |
| GitHub Copilot | ◐ | **Fix with Copilot**: Cloud agent fixes CI when asked ([source](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github.md), as of 2026-10-28) |
| OpenHands | ◐ | **Software Factory**: Failed checks lead to revisions ([source](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md), as of 2026-10-28) |
| Cursor | ✓ | **Cloud agent CI fix**: Cloud agents fix CI on their own PRs ([source](https://cursor.com/docs/cloud-agent/capabilities.md), as of 2026-10-28) |
| Claude Code | ◐ | **Cloud auto-fix**: Cloud auto-fix reacts to failed checks ([source](https://code.claude.com/docs/en/claude-code-on-the-web.md), as of 2026-10-28) |
| This sample | ✓ | Target: base-red check first; rerun a cancelled run ([source](brief.md)) |

✓ yes  ✗ no  ◐ partly  – not in their docs

### Converge

#### A10. A same-state no-progress check next to the round cap

Simplest version: the loop compares the PR's state (head commit, open findings, CI result) before and after a round; if nothing
changed it stops and flags a person; the lesson 4 round cap is the backstop.

The field's version is limits on review or fix rounds (matrix dimension "Limits review or fix rounds"). A same-state check is not a
dimension, so it is not compared.

| Checked 10/2026 | Mark | Limits on rounds |
|---|---|---|
| Devin | ◐ | **Per-PR spend limit**: Per-PR spend cap, no round cap ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-10-28) |
| Factory (Droid) | – | Not in their docs. a review-round cap is not on Automated Code Review or Delegations (only platform rate limits on automations). (as of 2026-10-28) |
| GitHub Copilot | ◐ | **Code review budget**: Budget limits only, no round cap ([source](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/code-review.md), as of 2026-10-28) |
| OpenHands | – | Not in their docs. Pages checked: Automated Code Review, PR Review workflow, Software Factory. (as of 2026-10-28) |
| Cursor | ✓ | **Autofix attempts**: 3 Autofix attempts, 10 CI follow-ups ([source](https://cursor.com/docs/bugbot.md), as of 2026-10-28) |
| Claude Code | ◐ | **Code Review spend limits**: Spend and credit limits, no round cap ([source](https://code.claude.com/docs/en/code-review-costs.md), as of 2026-10-28) |
| This sample | ✓ | Target: no-progress check, with the lesson 4 cap of 3 behind it ([source](brief.md)) |

✓ yes  ✗ no  ◐ partly  – not in their docs

A numeric cap on rounds is rare: one of the six on the surfaces shown. For the problem it answers, one team reported one CLI PR
going through more than 50 rounds overnight, and a cap of three rounds after which the reviewer asks the author to rethink the
approach (the cap hands control back to the author; it does not stop the loop by itself) ([source](https://claude.dev/blog/solving-code-review-at-anthropic/), blog post published 2026-10-15, fetched 2026-11-11). After its convergence work
the same team reported PRs needing five or more rounds fell from 8.9% to 1.5% ([source](https://claude.dev/blog/solving-code-review-at-anthropic/), blog post published 2026-10-15, fetched 2026-11-11). Shipwright has no round cap of its own in this
sense: it converges through a shared settled definition and a no-progress check; the cap of 3 is a lesson-scale stand-in from lesson 4 ([source](brief.md)).

## Not compared here

Parts of the Tier A steps have no column in the grid, so nothing is said about the field for them: a verdict computed by script and a
gate on the label (A4), an attestation per earlier finding (A6), a check before acting on a finding (A7), a fixer's rebuttal and
settled record (A8), triage of red CI before fixing and the rerun of a cancelled run (A9), and a same-state no-progress check (A10). A
visible confidence score is documented on no shown surface. Also not covered by any page read: how good any reviewer is in practice (the
only quality figures are vendors' own), and which wording wins where a docs page and skill text differ (OpenHands). Where the grid is
silent, the lesson says so rather than guessing.

## What other factories call it

Each product's own term for the grade on a finding and for the repo file it reads, from the matrix cells for that product. The
sample's names (review gate, verdict gate, settled record) are only this sample's.

| Product | What it calls the grade | What it calls the repo guidance |
|---|---|---|
| Devin | Severe / Non-severe ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-11-11) | REVIEW.md ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-11-11) |
| Factory (Droid) | P0 to P3 ([source](https://docs.factory.com/automations/code-review), as of 2026-11-11) | review-guidelines ([source](https://docs.factory.com/automations/code-review-ci), as of 2026-11-11) |
| GitHub Copilot | Severity label ([source](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review), as of 2026-11-11) | Custom instructions ([source](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review), as of 2026-11-11) |
| OpenHands | Priority labels ([source](https://docs.openhands.dev/openhands/usage/use-cases/code-review.md), as of 2026-11-11) | Repo review skill ([source](https://docs.openhands.dev/openhands/usage/use-cases/code-review.md), as of 2026-11-11) |
| Cursor | Severity field ([source](https://cursor.com/docs/bugbot.md), as of 2026-11-11) | BUGBOT.md ([source](https://cursor.com/docs/bugbot.md), as of 2026-11-11) |
| Claude Code | Severity markers ([source](https://code.claude.com/docs/en/code-review-pull-requests.md), as of 2026-11-11) | REVIEW.md ([source](https://code.claude.com/docs/en/code-review-customize.md), as of 2026-11-11) |

## Where it goes from here

Destinations only, not a recommendation. These are the Tier B items of the [brief](brief.md); each is named, not built, and the
owner is the lesson named in the brief. Where the grid or the article says something, it is stated once; otherwise nothing is
claimed.

| Destination | Owner | What the field or the article says |
|---|---|---|
| Several reviewers in parallel, merged, deduplicated and voted on | a later review deep dive | Cursor's blog describes eight passes, a majority vote and a validator model; its docs and help page do not describe the pipeline, and the post may have changed since ([source](https://cursor.com/blog/building-bugbot), as of 2026-11-11). Claude Code's docs describe parallel candidate finding followed by a verification step ([source](https://code.claude.com/docs/en/code-review.md), as of 2026-11-11). |
| An incident-based eval set the reviewer is scored against | the feedback and maintenance lesson | One team reported past incident and revert PRs, each bug confirmed by engineers who know the code, as a set the reviewer runs against daily, with every reviewer change scored against all of it ([source](https://claude.dev/blog/solving-code-review-at-anthropic/), blog post published 2026-10-15, fetched 2026-11-11). |
| Noise metrics (resolution rate, false-positive rate) | the feedback and maintenance lesson | See the table below. No product documents a false-positive or precision rate. |
| Risk-tiered human approval, where the change sets the tier | the release lesson | One team reported three tiers: low needs no person once automated review and security checks are green, medium one person, high two; the change sets the tier, not the author ([source](https://claude.dev/blog/solving-code-review-at-anthropic/), blog post published 2026-10-15, fetched 2026-11-11). |
| Real approval and merge; an agent's approval never counting as a person's | the release lesson | The same team states that an agent's approval never counts as a person's; automated review can clear a low-risk change but not fill a slot that needs a human ([source](https://claude.dev/blog/solving-code-review-at-anthropic/), blog post published 2026-10-15, fetched 2026-11-11). The same page describes a merge queue that re-runs every check against main with the change applied, so two PRs that pass separately cannot combine into a broken main. See A4 for the field's reviewer approvals. |
| An author allowlist before the agent reviews or fixes | the governance lesson | In the same article only authors on a trusted list get the lighter approval paths ([source](https://claude.dev/blog/solving-code-review-at-anthropic/), blog post published 2026-10-15, fetched 2026-11-11). Nothing else is claimed. |
| Claims and a head-moved check around a review across many workers | the multi-agent coordination deep dive | Nothing is claimed about the field. |
| Second-round disagreement escalation; a post-push CI check | a later patch deep dive | Nothing is claimed about the field. |
| A same-reason skip streak that auto-blocks; deferring to a human mid-conversation | a later loop lesson | Nothing is claimed about the field. |
| Writing a good review guidance file | the instructions and standards lesson | A guidance file is common in the field (A3). One team's advice: short, name what failure looks like, cap nits, list paths to skip, ask for file-and-line evidence ([source](https://claude.dev/blog/solving-code-review-at-anthropic/), blog post published 2026-10-15, fetched 2026-11-11). |
| Staged versus auto-post of a review | the governance lesson | Nothing is claimed about the field. |

**Noise metrics** (matrix dimension "Measures its own noise")

| Checked 11/2026 | Mark | Measures its own noise |
|---|---|---|
| Devin | ◐ | **Review analytics**: Review counts; resolved means fixed in code ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-11-11) |
| Factory (Droid) | – | Not in their docs. Pages checked: Review Benchmark, Agent Effectiveness overview, dashboard and cost-and-productivity (docs.factory.com). The Review Benchmark Markdown holds only an embedded component, and Agent Effectiveness has no review-comment acceptance or false-positive figure. (as of 2026-11-11) |
| GitHub Copilot | – | Not in their docs. Pages checked: the code review concept page, use-code-review, configure-code-review and the responsible-use agents card (docs.github.com). The card gives overall benchmarks and a false-positive risk note, and thumbs are the only feedback signal described. (as of 2026-11-11) |
| OpenHands | ◐ | **Suggestion accuracy**: After-merge judge recipe; no false-positive rate ([source](https://docs.openhands.dev/overview/skills/monitoring.md), as of 2026-11-11) |
| Cursor | ◐ | **Resolution rate**: Resolution rate and per-rule acceptance; no false-positive rate ([source](https://cursor.com/docs/bugbot.md), as of 2026-11-11) |
| Claude Code | ◐ | **Analytics page**: Analytics, Feedback card; false-positive rate absent ([source](https://code.claude.com/docs/en/code-review-costs.md), as of 2026-11-11) |
| This sample | – | Not built in this lesson; named as a destination ([source](brief.md)) |

✓ yes  ✗ no  ◐ partly  – not in their docs

Outcome counts, never a false-positive rate: Cursor (resolution rate), Claude Code (auto-resolved comments), Devin (resolved only
when fixed in code) and OpenHands (a recipe) document an outcome measure; Factory and Copilot document no review figure. The resolution
rate figures in Cursor's cell are Cursor's own, not independent.
