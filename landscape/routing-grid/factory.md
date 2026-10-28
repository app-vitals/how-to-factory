# Factory (Droids / Missions): lesson 4 PR routing grid

Scope: lesson 4 only, the step after a PR is open: what triggers a review, when it runs again, who may approve, whether the
product fixes its own PR, what limits exist, how the next action is chosen, where PR state lives, and the handoff to a
person. Left out on purpose: how plans are made, how tickets are picked, and how checks run before the PR (lessons 1 to 3).
Every filled cell is a paraphrase of a first-party docs.factory.com page, with its URL and the date I fetched it
(**2026-10-28**). The review and fix notes in `landscape/field-grid/factory.md` (2026-10-23) and
`landscape/verify-grid/factory.md` (2026-10-23) were a starting list; every page used here was fetched again.

Names are Factory's own, not canonical. A cell says `not documented` only after naming the pages checked. "Not documented"
means not in their docs, not that the product cannot do it.

Method: fetched the docs index (https://docs.factory.com/llms.txt, 2026-10-28), listed the pages that could touch PR review,
automations, delegations, headless runs or CI, and fetched each as a raw-Markdown URL (see "Pages read"). Honest limit: the
fetch tool returns a condensed answer to a question I ask per page, not the raw page, so a "not documented" answer rests on
that tool saying the page lacked the topic. I did not read any page character by character.

## The grid

Surfaces: **Droid Review** (the automated PR reviewer, run by the `Factory-AI/droid-action` GitHub Action or the GitLab
equivalent), **Security Review**, **Automations** (GitHub-event triggers), **Delegations** (Slack, Linear, Jira: Droid opens the
PR), **Local `/review`** (before the PR exists).

| Dimension | Droid Review | Security Review | Automations | Delegations | Local `/review` |
| --- | --- | --- | --- | --- | --- |
| **What triggers it** | A PR being opened, new commits pushed, a PR reopened, or a draft marked ready. Draft PRs are skipped. Mention or label triggers: not documented (checked: Automated Code Review). ([Automated Code Review](https://docs.factory.com/software-factory/code-review-ci.md), 2026-10-28) | A comment mentioning `@droid security` on a PR, or a setting (`automatic_security_review`) that runs it on every non-draft PR. ([Security Review](https://docs.factory.com/software-factory/security-review.md), 2026-10-28) | GitHub events you pick: PR opened, PR, comment added, new push to a branch, label change, or checks completed, optionally with a schedule. ([Custom Automations](https://docs.factory.com/software-factory/automations.md), 2026-10-28) | A person mentions `@Factory`, or assigns an issue to it. ([Delegations](https://docs.factory.com/delegations/index.md), 2026-10-28) | A person types `/review` in a local session; it can compare the branch to a base branch. ([Local Code Review](https://docs.factory.com/software-factory/code-review.md), 2026-10-28) |
| **Re-review after new commits** | The workflow fires again on each push, so a new review runs. How old comments are deduplicated or resolved: not documented (checked: Automated Code Review). ([Automated Code Review](https://docs.factory.com/software-factory/code-review-ci.md), 2026-10-28) | Not documented (checked: Security Review). | A "new push to branch" event can start a run; which starter uses it is not stated. ([Custom Automations](https://docs.factory.com/software-factory/automations.md), 2026-10-28) | Not documented as a review loop (checked: Delegations, Linear, Jira, Slack). | Not documented (checked: Local Code Review). |
| **Who may approve, and does AI approval count** | The reviewer submits an approval when it finds no issues. Whether that approval is a required check or satisfies branch protection: not documented (checked: Automated Code Review, Software Factory overview). ([Automated Code Review](https://docs.factory.com/software-factory/code-review-ci.md), 2026-10-28) | Not documented whether it blocks or approves (checked: Security Review). | Not documented (checked: Custom Automations). | A person. The page shows how to require independent GitHub review of Factory-authored PRs: required approval count of two, or a required status check enforcing two human approvals for PRs opened by `factory-droid[bot]`. ([Delegations](https://docs.factory.com/delegations/index.md), 2026-10-28) | Not an approval; the author decides what to fix. Who authorizes changes: not documented (checked: Local Code Review). |
| **Fixes its own PR: review comments** | Not documented; it posts comments and an approval, nothing about fixing (checked: Automated Code Review). | Not documented (checked: Security Review). | The "Review Comment Fixer" starter makes the change a teammate asks for in a PR comment, pushes one commit and replies. ([Custom Automations](https://docs.factory.com/software-factory/automations.md), 2026-10-28) | Not documented how Droid handles review feedback on its PR (checked: Delegations, Linear, Jira, Slack). A follow-up goes through the original conversation or issue. ([Delegations](https://docs.factory.com/delegations/index.md), 2026-10-28) | Findings carry suggested replacement code, but the page describes analysis, not automatic edits. ([Local Code Review](https://docs.factory.com/software-factory/code-review.md), 2026-10-28) |
| **Fixes its own PR: red CI** | Not documented (checked: Automated Code Review). | Not documented (checked: Security Review). | A "checks completed" trigger exists, so an automation can react to CI results. No starter for fixing CI is listed on the page. ([Custom Automations](https://docs.factory.com/software-factory/automations.md), 2026-10-28) | Not documented (checked: Delegations, Linear, Jira, Slack). | Not applicable before a PR; not documented. |
| **Fixes its own PR: merge conflicts** | Not documented (checked: Automated Code Review). | Not documented (checked: Security Review). | Not documented; no starter for conflicts is listed (checked: Custom Automations). | Not documented (checked: Delegations, Linear, Jira, Slack). | Not documented (checked: Local Code Review). |
| **Caps or limits on rounds** | A review-round cap: not documented (checked: Automated Code Review). | Not documented (checked: Security Review). | Platform limits, not round caps: each Factory-managed computer hosts up to 10 automations, at most 5 scheduled for the same minute; webhook automations accept 60 requests a minute and 10 runs an hour. ([Custom Automations](https://docs.factory.com/software-factory/automations.md), 2026-10-28) | Per-machine parallel worker limits that administrators set. A cap on fix rounds: not documented (checked: Delegations, Linear, Jira, Slack). ([Delegations](https://docs.factory.com/delegations/index.md), 2026-10-28) | Not documented (checked: Local Code Review). |
| **How it chooses the next action** | Not documented beyond comment or approve (checked: Automated Code Review). Teams can steer it with a `review-guidelines` skill file in the repo. ([Automated Code Review](https://docs.factory.com/software-factory/code-review-ci.md), 2026-10-28) | Two passes (find candidates, then recheck each); what happens after is not documented. Optional `security-review-guidelines` skill. ([Security Review](https://docs.factory.com/software-factory/security-review.md), 2026-10-28) | Not documented (checked: Custom Automations). The event you select and the prompt you write decide it. | The instruction the person gives. ([Delegations](https://docs.factory.com/delegations/index.md), 2026-10-28) | The command you run decides it; output is findings with severity. ([Local Code Review](https://docs.factory.com/software-factory/code-review.md), 2026-10-28) |
| **Where PR state lives** | Not documented (checked: Automated Code Review). The workflow needs a token with write access to pull requests, contents and issues, so comments land on GitHub. ([Automated Code Review](https://docs.factory.com/software-factory/code-review-ci.md), 2026-10-28) | Comments on the PR; scheduled audits write files to a local folder. ([Security Review](https://docs.factory.com/software-factory/security-review.md), 2026-10-28) | Not documented (checked: Custom Automations). | Slack: in the thread or code channel where work began. Linear and Jira: in the issue's agent session. Delegations overview: not documented (checked: Delegations). ([Slack](https://docs.factory.com/delegations/slack.md), 2026-10-28) | Not documented (checked: Local Code Review). |
| **When done: handoff to a person** | Not documented (checked: Automated Code Review, Software Factory overview). | Not documented (checked: Security Review). | Not documented (checked: Custom Automations). | The person reviews the changes and test results before merging; the Linear and Jira pages say delegating does not replace code review. Shared-identity PRs are attributed to a service account, not the requester. ([Linear](https://docs.factory.com/delegations/linear.md), [Jira](https://docs.factory.com/delegations/jira.md), 2026-10-28) | The author. |
| **A PR it authored itself** | Skipping bot PRs is shown as an optional condition, alongside a `[skip-review]` title tag. Whether Droid Review looks at Droid-authored PRs by default: not documented (checked: Automated Code Review). ([Automated Code Review](https://docs.factory.com/software-factory/code-review-ci.md), 2026-10-28) | Not documented (checked: Security Review). | Not documented whether automations act on Droid-authored PRs (checked: Custom Automations). | Factory is the PR author, not the teammate; GitHub stops an author approving their own PR, but the requester can still approve a Factory-authored one. ([Delegations](https://docs.factory.com/delegations/index.md), 2026-10-28) | Not applicable. |

## Findings worth carrying into the lesson

- Review and fixing are separate pieces in Factory's docs: Droid Review comments and approves; a separate automation (Review Comment Fixer) makes requested changes. No page ties the two into one loop. ([Automated Code Review](https://docs.factory.com/software-factory/code-review-ci.md), [Custom Automations](https://docs.factory.com/software-factory/automations.md), 2026-10-28)
- Re-review is event-driven: every push fires the workflow again. A cap on rounds is not in their docs (pages checked in the cells above).
- Factory documents the approval question for its own PRs: the delegation is the author, so a person other than the requester can be required through GitHub branch protection. This is the clearest self-review answer in the pages read. ([Delegations](https://docs.factory.com/delegations/index.md), 2026-10-28)
- Red CI and merge conflicts on its own PR: not in their docs. A "checks completed" trigger exists for automations.

## Pages read

All fetched 2026-10-28 (index first: https://docs.factory.com/llms.txt). Condensed extraction, see Method.

- https://docs.factory.com/software-factory/code-review-ci.md
- https://docs.factory.com/software-factory/code-review.md
- https://docs.factory.com/software-factory/security-review.md
- https://docs.factory.com/software-factory/automations.md
- https://docs.factory.com/software-factory/overview.md
- https://docs.factory.com/delegations/index.md
- https://docs.factory.com/delegations/linear.md
- https://docs.factory.com/delegations/jira.md
- https://docs.factory.com/delegations/slack.md
- https://docs.factory.com/droid-exec/overview.md (CI use: the packaged review action is named here; no loop or retry limits)
- https://docs.factory.com/api-reference/automations-ci.md (CI workflow management API; says nothing on triggers, review or routing)

## Ruled out (why)

- **Missions**: how a Mission plans and validates its own work (lessons 1 to 3); no page read describes a Mission opening a PR.
- **Droid Computers, Sandbox, Worktrees, Autonomy Level**: isolation and permissions, not routing after a PR.
- **droid-exec/recipes/lint-autofix**: listed in the index as ending in a PR; judged from the index description, not fetched.
- **Release, Incident Response, AutoWiki, Agent Effectiveness**: release and ops, not PR routing; judged from index titles, not fetched.
- **Release notes**: not searched; newer routing features might be listed there. A gap, not a finding.
