# Options: how the field decides what a PR needs next

Names are not canonical. Every claim below is a paraphrase of a first-party page, taken from the lesson 4 routing grid
([`landscape/routing-grid/`](../../landscape/routing-grid/README.md)) and from [`landscape/matrix.json`](../../landscape/matrix.json)
(rendered in [landscape/README.md](../../landscape/README.md)). Each claim carries its source URL and the date that page was
fetched (all 2026-10-28). Re-check before filming. These appear on slides only; the lesson does not run other products live.

Scope is the lesson 4 step only: a PR is open, and something decides whether it needs a review, a fix, or nothing until a person
acts. Review depth and patch depth (how a finding becomes a commit, how a review grades a finding), plans, ticket selection and
checks before the PR are left out on purpose (see [brief.md](brief.md)).

## How the field differs

One table per Tier A capability of the [brief](brief.md), in the brief's own ids (A1 to A8), in the brief's order of stages (See,
Decide, Reassess, Stop). Each table opens with the simplest version, which is the sample's own design, then shows the field. Where
a capability has a matrix dimension, the Mark column is that cell's chip: ✓ yes, ✗ no (only where a cited page states it), ◐ partly or
mixed, and labels where the dimension uses them. Where the grid has no dimension, the Mark is `–`. In each cell the bold text names
the surface the claim is about, because most products have several (a reviewer, a fixer, an approver) and they are usually separate.
The surface shown is the one that reviews the PR, unless the cell says **Other surface**. A cell reads "not in their docs" when the
pages checked do not say, and lists the pages checked. That is a statement about those pages, not about what the product can do: most
fetches returned condensed extractions, so a gap can also be a page the extraction left out. The last row of each table is the target
for this lesson's sample. It comes from the [brief](brief.md) and is our own design, not a claim about anyone else.

Most of the six products are event-driven reviewers: a push or a comment starts a review. None of the pages checked describe a
loop that polls every open PR, which is why A1 and A5 below carry no mark. Read that as "not documented", never "no product has one".

### A1. Read every open PR's state from GitHub each tick

Simplest version: list the open PRs, and for each read the head commit, the verdict comments, the CI result and mergeability from
GitHub. `tasks.json` stays intent only.

| Product | Mark | Where PR state lives |
|---|---|---|
| Devin | GitHub + Own app | **Devin Review**: State sits on GitHub (optional commit status, PR comments) and in Devin (review history in the webapp, the owning session). ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-10-28) |
| Factory (Droid) | GitHub | **Droid Review**: The workflow needs a token with write access to pull requests, contents and issues, so comments land on the PR. Other state is not documented. ([source](https://docs.factory.com/software-factory/code-review-ci.md), as of 2026-10-28) |
| GitHub Copilot | GitHub | **Copilot code review**: State sits on the PR: review comments, an overview comment with the approval assessment, and the approval itself as a PR review. ([source](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-code-review.md), as of 2026-10-28) |
| OpenHands | GitHub | **Automated Code Review**: Review comments land on the PR, with a Review in progress comment edited to Review complete. Other state is not documented. ([source](https://docs.openhands.dev/openhands/usage/use-cases/code-review.md), as of 2026-10-28) |
| Cursor | GitHub | **Bugbot**: State sits on the PR: inline comments, a Cursor Bugbot check, and a summary comment or description. ([source](https://cursor.com/docs/bugbot.md), as of 2026-10-28) |
| Claude Code | GitHub | **Code Review**: State sits on the PR in GitHub: inline comments, the review body, and a check run named Claude Code Review. ([source](https://code.claude.com/docs/en/code-review-pull-requests.md), as of 2026-10-28) |
| This sample | GitHub | Target: a tick lists every open PR and reads its state live from GitHub ([source](brief.md)) |

Not compared: a loop that lists every open PR. The grid has no dimension for it, so nothing is said about the field.

### A2. Skip PRs that are not ready for review

Simplest version: two conditions in the list step. A draft is not a candidate, and neither is a PR the agent itself authored.

| Product | Mark | Drafts, and its own PRs |
|---|---|---|
| Devin | – | **Devin Review**: Auto-review starts when a PR is created (drafts included) or marked ready. A PR it wrote is reviewed like any other; the beta Autoapprover will not approve under the same bot identity. ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-10-28) |
| Factory (Droid) | – | **Droid Review**: Runs on opened, pushed, reopened or ready PRs, with drafts skipped. Skipping bot PRs is shown as an optional condition; whether it reviews Droid-authored PRs by default is not documented. ([source](https://docs.factory.com/software-factory/code-review-ci.md), as of 2026-10-28) |
| GitHub Copilot | – | **Copilot code review**: Automatic reviews can start when a PR is opened or a draft is marked ready, as a setting. Its own PRs: reviews of PRs written by the cloud agent are billed to the human co-author; Copilot approving its own PR is not documented. ([source](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/code-review.md), as of 2026-10-28) |
| OpenHands | – | **Automated Code Review**: Starts on a non-draft PR opened or a draft marked ready. Whether the reviewer looks at PRs the agent wrote is not documented. ([source](https://docs.openhands.dev/openhands/usage/use-cases/code-review.md), as of 2026-10-28) |
| Cursor | – | **Bugbot**: Drafts are skipped unless turned on. It ignores `cursor review` posted by a bot account. ([source](https://cursor.com/docs/bugbot.md), as of 2026-10-28) |
| Claude Code | – | **Code Review**: Drafts are not stated. Comments from bots do not start a review; its own PRs are not in their docs for this service. ([source](https://code.claude.com/docs/en/code-review-pull-requests.md), as of 2026-10-28) |
| This sample | – | Target: drafts and the agent's own PRs are dropped before any decision ([source](brief.md)) |

### A3. A review is needed when no verdict covers the current head commit

Simplest version: the verdict comment names the commit it covers. If no verdict names the PR's current head, the PR needs a review.

The field's version of this is when a push starts another review (matrix dimension "Re-reviews after a push"). None of the pages
checked describe a stored record of which commit was reviewed, so that part is not compared.

| Product | Mark | Review after a push |
|---|---|---|
| Devin | ◐ | **Devin Review cadence**: Cadence is a setting: Only once, or Every push; otherwise a person re-runs the review from the PR actions menu. ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-10-28) |
| Factory (Droid) | ◐ | **Droid Review**: The workflow fires again on each push, so a push starts a review where automatic review is on (it is off by default). How old comments are deduplicated is not documented. ([source](https://docs.factory.com/software-factory/code-review-ci.md), as of 2026-10-28) |
| GitHub Copilot | ◐ | **Review new pushes**: Copilot reviews a PR once unless Review new pushes is on; a person can re-request a review. ([source](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-code-review.md), as of 2026-10-28) |
| OpenHands | ◐ | **Automated Code Review**: Not by default: the synchronize trigger is left out on purpose to avoid noisy re-reviews. Re-add the label, re-request the reviewer, or add synchronize to the condition. ([source](https://docs.openhands.dev/openhands/usage/use-cases/code-review.md), as of 2026-10-28) |
| Cursor | ✓ | **Bugbot**: Each push is reviewed, looking only at changes since the last review; a newer commit cancels a run in progress, and a setting limits it to one review per PR. ([source](https://cursor.com/docs/bugbot.md), as of 2026-10-28) |
| Claude Code | ◐ | **Code Review**: Only where pushes trigger reviews (the every-push setting, or a PR subscribed with `@claude review always`); later reviews focus on what changed since the last one. ([source](https://code.claude.com/docs/en/code-review-pull-requests.md), as of 2026-10-28) |
| This sample | ✓ | Target: a verdict names the commit it covers; no verdict for the head means a review ([source](brief.md)) |

### A4. A patch is needed when there are findings, red CI or a conflict

Simplest version: three checks on the facts from A1. Unresolved findings, a failing check, or a conflict with main each send the PR
to a patch, not to another review. The patch itself is a stub.

The field mostly splits the reviewer from the fixer: the review and the fix are separate surfaces in Factory, OpenHands, Cursor,
Copilot and Claude Code, and Devin ties them together through the session that owns the PR.

**Findings** (matrix dimension "Fixes review comments itself")

| Product | Mark | Fixes review comments |
|---|---|---|
| Devin | ✓ | **Devin Review auto-fix**: On a PR a Devin session owns, findings go to the session first and only unfixed ones post as comments; on other PRs Auto-fix starts a new session. ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-10-28) |
| Factory (Droid) | ◐ | **Review Comment Fixer**: A Custom Automations starter makes the change a teammate asks for in a PR comment, pushes one commit and replies. Droid Review itself is not documented as fixing. ([source](https://docs.factory.com/software-factory/automations.md), as of 2026-10-28) |
| GitHub Copilot | ◐ | **Fix with Copilot**: When asked (Fix with Copilot, or an @copilot mention), the cloud agent implements review comments as commits or a new PR. Starting on its own is not documented. ([source](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github.md), as of 2026-10-28) |
| OpenHands | – | Not in their docs. Pages checked: Automated Code Review, PR Review workflow, Software Factory (does not say how comments become a revision), GitHub Integration. (as of 2026-10-28) |
| Cursor | ◐ | **Bugbot Autofix**: Optional Autofix starts a cloud agent to fix the bugs Bugbot found: off, commit to a new branch, or commit to the existing branch. ([source](https://cursor.com/docs/bugbot.md), as of 2026-10-28) |
| Claude Code | ◐ | **Cloud auto-fix** (other surface): The review itself is read-only and pushes nothing. In a cloud session, auto-fix decides per review comment whether to fix it, ask the person or skip it. ([source](https://code.claude.com/docs/en/claude-code-on-the-web.md), as of 2026-10-28) |

**Red CI** (matrix dimension "Fixes red CI itself")

| Product | Mark | Fixes failing checks |
|---|---|---|
| Devin | ✓ | **Auto-Fix**: With Auto-Fix on, Devin iterates on failing CI checks on PRs its sessions work on. ([source](https://docs.devin.ai/essential-guidelines/sdlc-integration.md), as of 2026-10-28) |
| Factory (Droid) | – | Not in their docs. Pages checked: Automated Code Review, Custom Automations (a checks-completed trigger exists, no CI-fix starter), Delegations. (as of 2026-10-28) |
| GitHub Copilot | ◐ | **Fix with Copilot**: When asked from a failing Actions run page, the cloud agent investigates and pushes a fix. A person must approve workflow runs on its push. Starting without a person is not documented. ([source](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github.md), as of 2026-10-28) |
| OpenHands | ◐ | **Software Factory** (other surface): Failed checks lead to revisions, and the watchdog will not merge without passing Actions runs. Which automation performs the revision is not documented. ([source](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md), as of 2026-10-28) |
| Cursor | ✓ | **Cloud agent CI fix** (other surface): Cloud agents try to fix CI failures on GitHub Actions for PRs they created, skipping after a person pushes. Teams and Enterprise plans. ([source](https://cursor.com/docs/cloud-agent/capabilities.md), as of 2026-10-28) |
| Claude Code | ◐ | **Cloud auto-fix** (other surface): While auto-fix is on for a PR, the cloud session receives failed CI check events and pushes a fix when it is clear; the review service does not fix. ([source](https://code.claude.com/docs/en/claude-code-on-the-web.md), as of 2026-10-28) |

**Merge conflicts** (matrix dimension "Repairs merge conflicts"). The conflict trigger is the weakest part of A4 in the field: one
of the six documents a repair for a single PR.

| Product | Mark | Repairs conflicts |
|---|---|---|
| Devin | ◐ | **Stacked PRs**: Conflicts are resolved quietly for stacked PRs. For a single PR, conflict repair is not documented on the Devin Review or Auto-Fix pages. ([source](https://docs.devin.ai/work-with-devin/stacked-prs.md), as of 2026-10-28) |
| Factory (Droid) | – | Not in their docs. Pages checked: Automated Code Review, Custom Automations, Delegations. (as of 2026-10-28) |
| GitHub Copilot | ◐ | **Fix with Copilot**: When asked (Fix with Copilot in the merge box, or @copilot), the cloud agent resolves the conflict, checks build, tests and linter, then asks the person for review. ([source](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github.md), as of 2026-10-28) |
| OpenHands | ◐ | **Software Factory** (other surface): The watchdog updates a stale branch before merging. Conflict resolution as such is not documented. ([source](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md), as of 2026-10-28) |
| Cursor | – | Not in their docs. Pages checked: Bugbot, Bugbot help, PR Routing & Approval, Cloud agent capabilities, Cloud agents help, Automations. (as of 2026-10-28) |
| Claude Code | ◐ | **Cloud auto-fix** (other surface): GitHub sends no event when the base branch moves, so auto-fix cannot react on its own; the person asks Claude to rebase. Projects threads have a Resolve conflicts button. ([source](https://code.claude.com/docs/en/claude-code-on-the-web.md), as of 2026-10-28) |
| This sample | ✓ | Target: findings, red CI or a conflict each make the PR need a patch ([source](brief.md)) |

### A5. Otherwise, wait for a human

Simplest version: the default branch of the decision. A clean verdict on the current head, green CI and no conflict means the loop
does nothing, and the PR is ready for a person to merge.

The grid has no mark for this. What it records is who the product names as the handoff, and that most products do not choose a next
action themselves.

| Product | Mark | Handoff to a person |
|---|---|---|
| Devin | – | **Devin Review**: A person approves, requests changes or merges. The page says Devin commits or comments for a user only when that user starts it. ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-10-28) |
| Factory (Droid) | – | Not in their docs. Pages checked: Automated Code Review, Software Factory overview. (as of 2026-10-28) |
| GitHub Copilot | – | **Copilot code review**: Posts its review; the person applies suggestions, delegates fixes, or merges. With approvals off, a person's approval is still what the rules count. ([source](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/code-review.md), as of 2026-10-28) |
| OpenHands | – | Not in their docs for the reviewer (checked: Automated Code Review). **Other surface**: the Software Factory watchdog merges on its own when its conditions pass. ([source](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md), as of 2026-10-28) |
| Cursor | – | **Bugbot**: Findings and links for a person to act on; the merge decision is not described. ([source](https://cursor.com/docs/bugbot.md), as of 2026-10-28) |
| Claude Code | – | **Code Review**: Ranked inline comments; the reader resolves, pushes a fix or replies. A reply starts no review. ([source](https://code.claude.com/docs/en/code-review-pull-requests.md), as of 2026-10-28) |
| This sample | – | Target: a PR that needs nothing gets no agent run and shows as waiting for a human ([source](brief.md)) |

Three of the six say outright that the trigger or a person chooses the next action rather than the product (GitHub Copilot, Cursor
and Claude Code, on the surfaces shown). Only Cursor's PR Routing & Approval is described weighing inputs (a risk score, policy
files and review state) before it requests reviewers or approves ([source](https://cursor.com/docs/approval-agents.md), as of
2026-10-28).

### A6. A patch invalidates the old review: review again

Simplest version: nothing beyond A3. A patch pushes a new commit, so the earlier verdict no longer names the head, and the next tick
reviews again: review, patch, review.

The field shares the A3 table: re-review after a push is on by default in one product, a setting in others, and off in two. Whether
a reviewer, a fixer and an approver form one loop with no person between them is not stated on the pages checked (the grid cannot
say); Factory, Copilot and Claude Code say they do not hand off to each other. Copilot is the one that ties the two together
explicitly, in the other direction: with approvals on, a later push dismisses its earlier approval
([source](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-code-review.md), as of 2026-10-28).

### A7. Cap the rounds, then flag a human and leave the PR alone

Simplest version: a counter of patch rounds per PR (the lesson shows 3 as a choice, not a rule). At the cap the loop marks the PR for
a person and skips it from then on.

| Product | Mark | Limits on review or fix rounds |
|---|---|---|
| Devin | ◐ | **Per-PR spend limit**: One cost cap per PR for auto-review (ACUs or dollars); once hit, auto-review stops for that PR. A cap on fix rounds is not documented. ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-10-28) |
| Factory (Droid) | – | Not in their docs. A review-round cap is not on Automated Code Review or Delegations (only platform rate limits on automations). (as of 2026-10-28) |
| GitHub Copilot | ◐ | **Code review budget**: A round cap per PR is not documented. Reviews are billed per review and stop when the applicable budget is used up; a cloud agent session runs at most 59 minutes. ([source](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/code-review.md), as of 2026-10-28) |
| OpenHands | – | Not in their docs. Pages checked: Automated Code Review, PR Review workflow, Software Factory. (as of 2026-10-28) |
| Cursor | ✓ | **Autofix attempts**: Autofix on the existing branch is capped at 3 attempts per PR, and cloud agents stop after 10 CI-failure follow-ups per PR. ([source](https://cursor.com/docs/bugbot.md), as of 2026-10-28) |
| Claude Code | ◐ | **Code Review spend limits**: No cap on review rounds per PR is stated. Limits are a monthly spend limit, the organization's spend limit and the credit balance; a skipped review gets a comment naming the cause. ([source](https://code.claude.com/docs/en/code-review-costs.md), as of 2026-10-28) |
| This sample | ✓ | Target: after 3 patch rounds on one PR the loop flags a person and stops touching it ([source](brief.md)) |

A numeric cap on rounds is rare: one of the six on the shown surfaces. The limits that exist bound spend, time or event counts.

### A8. The review leaves a verdict the loop can read

Simplest version: the stub review posts a plain `APPROVED` or `FINDINGS` comment that names the head commit, and the loop reads
it. A PR written by the agent cannot receive a real approval from its own author, so a comment is the version that always works.

The field's version of this is whether the reviewer posts an approval (matrix dimension "Reviewer can approve the PR"). A plain-text
verdict comment is not a dimension in the grid, so it is not compared.

| Product | Mark | Reviewer approval |
|---|---|---|
| Devin | ◐ | **Autoapprover**: Devin Review does not approve or request changes; people do. A beta Autoapprover can approve the reviewed commit, and whether the repo counts that toward merge is not documented. ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-10-28) |
| Factory (Droid) | ✓ | **Droid Review**: The reviewer submits an approval when it finds no issues. Whether that satisfies branch protection is not documented. ([source](https://docs.factory.com/software-factory/code-review-ci.md), as of 2026-10-28) |
| GitHub Copilot | ◐ | **Copilot approvals**: The default is a Comment review that counts for nothing. With approvals on (public preview, off by default) Copilot can approve like a teammate, and a later push dismisses it. ([source](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-code-review.md), as of 2026-10-28) |
| OpenHands | ✓ | **Automated Code Review**: The reviewer prompt picks APPROVE when nothing blocks, and a dedicated bot account is the identity that approves. Whether that counts toward merge rules is not documented. ([source](https://docs.openhands.dev/openhands/usage/use-cases/code-review.md), as of 2026-10-28) |
| Cursor | ◐ | **PR Routing & Approval** (other surface): Bugbot posts findings and a check, not approvals. A separate PR Routing & Approval agent can approve low-risk PRs; whether that satisfies a required reviewer is not documented. ([source](https://cursor.com/docs/approval-agents.md), as of 2026-10-28) |
| Claude Code | ✗ | **Code Review**: The page says a review never approves or blocks the PR, and its check run never concludes as a failure, so the merge decision stays with the team. ([source](https://code.claude.com/docs/en/code-review.md), as of 2026-10-28) |
| This sample | – | Target: a plain `APPROVED` or `FINDINGS` comment on the head commit ([source](brief.md)) |

Only Copilot says when an AI approval counts toward a required-approval rule; for the other five it is not documented.

## Not compared here

Parts of the Tier A steps have no column in the grid, so nothing is said about the field for them: a loop that lists every open
PR each tick (A1), a stored record of which commit was reviewed (A3), review, patch, review as one loop with no person (A6), and a
plain-text verdict (A8). Behaviour under load (queueing, ordering across many PRs, one phase starving another) is not covered by
any page read. Where the grid is silent, the lesson says so rather than guessing.

## What other factories call it

Each product's own term for the part that reviews the PR, from the matrix cell for that product. `Review` and `patch` and the
loop's decision are only this sample's names.

| Product | What it calls the reviewer |
|---|---|
| Devin | Devin Review ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-10-28) |
| Factory | Droid Review ([source](https://docs.factory.com/software-factory/code-review-ci.md), as of 2026-10-28) |
| GitHub Copilot | Copilot code review ([source](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/code-review.md), as of 2026-10-28) |
| OpenHands | Automated Code Review ([source](https://docs.openhands.dev/openhands/usage/use-cases/code-review.md), as of 2026-10-28) |
| Cursor | Bugbot ([source](https://cursor.com/docs/bugbot.md), as of 2026-10-28) |
| Claude Code | Code Review, a managed service ([source](https://code.claude.com/docs/en/code-review-setup.md), as of 2026-10-28) |

## Where it goes from here

Destinations only, not a recommendation. These are the Tier B items of the brief; each is named, not built, and the lesson that
owns it is named in the brief. Where the grid or matrix says something about the field, it is stated once; otherwise nothing is
claimed.

- **Review depth.** Finding grading, inline comments, posting policy, reviewing against principles, and a fresh reply that
  re-opens a reviewed PR belong to the review lesson. In the field, Claude Code's reviews rank their inline comments
  ([source](https://code.claude.com/docs/en/code-review-pull-requests.md), as of 2026-10-28) and Devin grades findings before
  posting them ([source](https://docs.devin.ai/work-with-devin/devin-review.md), as of 2026-10-28).
- **Real approval.** Approving as a reviewer, the limit that an author cannot approve its own PR, and whether an approval counts
  toward merge belong to the review and release lessons. See A8 for the field.
- **Patch depth.** How a finding becomes a commit, reading CI logs, resolving a conflict, a second-round disagreement and
  rerunning cancelled CI belong to the patch lesson. See A4 for who fixes what in the field.
- **Merge, canary, promote.** After "ready for a person to merge"; the release lesson.
- **Several agents at once.** Claiming work before dispatch, a reaper for dead claims, ordering across tasks and PRs, and starvation
  by a deep backlog belong to the multi-agent coordination deep dive. Nothing is claimed about the field.
- **The tick itself.** Cron scheduling, idle backoff, a busy flag, per-phase switches, one winner per tick, a per-PR cooldown and a
  skip counter belong to a later loop lesson. Nothing is claimed about the field.
- **Trust and upkeep.** An author allowlist before the agent reviews belongs to the governance lesson; a queue snapshot for
  observability belongs to the feedback and maintenance lesson. Nothing is claimed about the field.
