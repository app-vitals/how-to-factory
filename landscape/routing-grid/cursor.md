# Cursor: lesson 4 PR routing grid

Scope: lesson 4 only, the step after a PR is open: what triggers a review, when it runs again, who may approve, whether the
product fixes its own PR, what limits exist, how the next action is chosen, where PR state lives, and the handoff to a
person. Left out on purpose: how plans are made, how tickets are picked, and how checks run before the PR (lessons 1 to 3).
Every filled cell is a paraphrase of a first-party cursor.com page, with its URL and the date I fetched it (**2026-10-28**).
The review and fix notes in `landscape/field-grid/cursor.md` (2026-10-23) and `landscape/verify-grid/cursor.md` (2026-10-23)
were a starting list; every page used here was fetched again.

Names are Cursor's own, not canonical. A cell says `not documented` only after naming the pages checked. "Not documented"
means not in their docs, not that the product cannot do it.

Method: fetched the docs index (https://cursor.com/docs/llms.txt, 2026-10-28), listed the pages that could touch PR review,
approval, automations, the GitHub integration or cloud agents, and fetched each as a raw-Markdown URL (see "Pages read").
The Bugbot reference, PR Routing & Approval, the Bugbot help page and the review templates page were read from top to bottom.
The cloud agent, capabilities, automations, GitHub integration, Slack and Linear pages were read by searching them for review,
CI, conflict, limit, loop and approval terms and reading the matching sections, so a "not documented" there rests on those
searches, not a line-by-line read. (The first attempt through a summarising fetch tool returned 404 for pages that exist; I
re-fetched everything with curl and used those files.)

## The grid

Surfaces: **Bugbot** (the PR reviewer, with its Autofix option), **PR Routing & Approval** (assigns reviewers and can approve
low-risk PRs), **Cloud agent PR follow-up** (a cloud agent that opened a PR and keeps working on it: CI auto-fix and
subscriptions), **Automations** (generic triggers with a saved prompt; Bugbot and PR Routing & Approval are built on them).

| Dimension | Bugbot | PR Routing & Approval | Cloud agent PR follow-up | Automations |
| --- | --- | --- | --- | --- |
| **What triggers it** | Automatically on every PR update; manually by commenting `cursor review` or `bugbot run` (ignored when a bot account or GitHub App posts it). Drafts are skipped unless draft reviews are turned on. A repo can also set `frequency: everyPush` or `oncePerPr`. ([Bugbot](https://cursor.com/docs/bugbot.md), [Bugbot help](https://cursor.com/help/ai-features/bugbot.md), 2026-10-28) | Triggers you pick: PR opened (non-draft, or a draft marked ready), PR pushed / updated, PR commented (comment matching a regex). ([PR Routing & Approval](https://cursor.com/docs/approval-agents.md), 2026-10-28) | The agent subscribes to PR activity (comments, reviews, lifecycle changes) for one PR and to CI results on a branch, ends its turn, and is woken by a matching event. ([Cloud agent capabilities](https://cursor.com/docs/cloud-agent/capabilities.md), 2026-10-28) | On GitHub: PR opened, PR merged, label changed, CI completed, PR review comment, PR review submitted, review thread updated, workflow run completed, and more. ([Automations](https://cursor.com/docs/cloud-agent/automations.md), 2026-10-28) |
| **Re-review after new commits** | Yes by default. Each push runs a review of only the changes since the last Bugbot review (Incremental Review can be turned off for the full diff). A newer commit cancels a run in progress. A setting limits it to one review per PR. ([Bugbot](https://cursor.com/docs/bugbot.md), 2026-10-28) | With the "PR pushed / updated" trigger on, the next push runs the agent again. It looks only at checks on the latest commit. ([PR Routing & Approval](https://cursor.com/docs/approval-agents.md), 2026-10-28) | Not documented as a re-review (checked: Cloud agent capabilities, Cloud agent overview, Cloud agents help). New review activity wakes the agent as a follow-up in the same conversation. | Up to the author: a PR-pushed style trigger and the prompt decide (checked: Automations). |
| **Who may approve, and does AI approval count** | The Bugbot page describes findings and a `Cursor Bugbot` check, not approvals. Not documented whether anything it posts counts toward merge rules (checked: Bugbot, Bugbot help). The check ends `success` (no issues), `neutral` (findings; the default) or `failure` (only if configured to fail on unresolved issues). Requiring the check alone does not block merge on findings. ([Bugbot](https://cursor.com/docs/bugbot.md), 2026-10-28) | It can approve low-risk PRs when your criteria are met, under a maximum risk level and any `APPROVAL_POLICY.md` files. It does not approve if Bugbot or Security Agents report findings that need a person, or if an agent check has not finished after about 8 minutes. Whether that approval satisfies a required-reviewer rule: not documented (checked: PR Routing & Approval, GitHub integration). ([PR Routing & Approval](https://cursor.com/docs/approval-agents.md), 2026-10-28) | Not documented (checked: Cloud agent capabilities, Cloud agent overview). | If approvals are enabled the agent can approve, request changes and dismiss reviews; otherwise it can only comment. Approvals run as `cursor`. ([Automations](https://cursor.com/docs/cloud-agent/automations.md), 2026-10-28) |
| **Fixes its own PR: review comments** | Autofix (optional) starts a cloud agent to fix the bugs Bugbot found and posts a comment with the result. Modes: off, create a new branch, or commit to the existing branch. Without it, "Fix in Cursor" and "Fix in Web" links open the issue. ([Bugbot](https://cursor.com/docs/bugbot.md), 2026-10-28) | It assigns reviewers and approves; fixing is not described (checked: PR Routing & Approval). | A cloud agent that subscribed to PR activity can respond to review comments. The page's example is "open a PR, then respond to review comments and CI failures". ([Cloud agent capabilities](https://cursor.com/docs/cloud-agent/capabilities.md), 2026-10-28) | The automations page links a marketplace template for fixing PR review comments; I did not read the template (the page is script-rendered). The triggers PR review comment and PR review submitted exist. ([Automations](https://cursor.com/docs/cloud-agent/automations.md), 2026-10-28) |
| **Fixes its own PR: red CI** | Not documented for Bugbot itself (checked: Bugbot). | Not documented (checked: PR Routing & Approval). | Yes, on GitHub Actions: cloud agents try to fix CI failures on PRs they created. They skip it when a person pushed a commit, when a follow-up message was sent, and after 10 CI-failure follow-ups. `@cursor autofix off` / `on` in a PR comment turns it off or on for that PR. Teams and Enterprise plans. ([Cloud agent capabilities](https://cursor.com/docs/cloud-agent/capabilities.md), [Cloud agents help](https://cursor.com/help/ai-features/cloud-agents.md), 2026-10-28) | A CI completed trigger exists. What the run does is the author's prompt. ([Automations](https://cursor.com/docs/cloud-agent/automations.md), 2026-10-28) |
| **Fixes its own PR: merge conflicts** | Not documented (checked: Bugbot, Bugbot help). | Not documented (checked: PR Routing & Approval). | Not documented (checked: Cloud agent capabilities, Cloud agent overview, Cloud agents help, GitHub integration). | Not documented (checked: Automations). |
| **Caps or limits on rounds** | Bugbot skips PRs over its review-size limit and asks for a split. It caps reviews on PRs opened by bot accounts, per team, counting repeat reviews of one PR; the number is not given. Autofix on the existing branch: max 3 attempts per PR. ([Bugbot](https://cursor.com/docs/bugbot.md), 2026-10-28) | Waits about 8 minutes for agent checks, then does not approve. A cap on approval rounds: not documented (checked: PR Routing & Approval). | 10 CI-failure follow-ups per PR; a subscription lasts at most 180 days. A cap on review-comment rounds: not documented (checked: Cloud agent capabilities). ([Cloud agent capabilities](https://cursor.com/docs/cloud-agent/capabilities.md), 2026-10-28) | Loop and rate limits for automation runs: not documented (checked: Automations). Pull request triggers do not run on PRs from forks. |
| **How it chooses the next action** | It does not choose; it reviews the diff and reports. A person or Autofix acts on the findings. ([Bugbot](https://cursor.com/docs/bugbot.md), 2026-10-28) | The agent weighs the risk score, policy files (`APPROVAL_POLICY.md` near each changed file, `.cursor/approval-policies/ROUTING.md`), Bugbot and Security Agent findings, and current review state, then requests reviewers or approves. The more specific policy wins; unclear cases take the stricter reading. ([PR Routing & Approval](https://cursor.com/docs/approval-agents.md), 2026-10-28) | The prompt says what to wait for ("open a PR and keep CI green"); the event decides when the agent wakes. ([Cloud agent capabilities](https://cursor.com/docs/cloud-agent/capabilities.md), 2026-10-28) | The trigger and the saved prompt decide. ([Automations](https://cursor.com/docs/cloud-agent/automations.md), 2026-10-28) |
| **Where PR state lives** | On the PR: inline comments, a `Cursor Bugbot` check (and `Cursor Bugbot Autofix` when Autofix is on), and a summary in the description or a comment. Bugbot reads earlier top-level and inline comments as context. ([Bugbot](https://cursor.com/docs/bugbot.md), 2026-10-28) | Reads PR and check state from GitHub for the latest commit. Where its own decision is recorded: not documented (checked: PR Routing & Approval). | In the agent's conversation, plus the PR and CI results it is subscribed to. ([Cloud agent capabilities](https://cursor.com/docs/cloud-agent/capabilities.md), 2026-10-28) | Not documented (checked: Automations). |
| **When done: handoff to a person** | Findings and links for a person to act on; the merge decision is not described (checked: Bugbot). | Requests reviewers (code ownership and commit history) or approves; Slack and Teams notifications are optional. ([PR Routing & Approval](https://cursor.com/docs/approval-agents.md), 2026-10-28) | Cloud agents push to a branch "for handoff" and produce merge-ready PRs. In Slack, a completion notice links the PR. A merge by the agent: not documented (checked: Cloud agent overview, Slack integration). ([Cloud agent overview](https://cursor.com/docs/cloud-agent.md), [Slack](https://cursor.com/docs/integrations/slack.md), 2026-10-28) | An automation can request reviewers or message Slack. ([Automations](https://cursor.com/docs/cloud-agent/automations.md), 2026-10-28) |
| **A PR it authored itself** | Bugbot ignores `cursor review` / `bugbot run` posted by a bot account or GitHub App, and caps reviews on bot-authored PRs. Whether it reviews PRs a Cursor cloud agent opened: not documented as a separate case (checked: Bugbot). ([Bugbot](https://cursor.com/docs/bugbot.md), 2026-10-28) | Not documented as a separate case (checked: PR Routing & Approval). The page says changes to policy files in the same PR are not used to relax review for that PR. | Cloud agent commits are authored as the agent, not the person who started it, so review rules on author identity see the agent. CI auto-fix does not run on human commits. ([Cloud agents help](https://cursor.com/help/ai-features/cloud-agents.md), 2026-10-28) | PRs open as the starting person's GitHub account, or as `cursor` when the automation runs as a service account. ([Automations](https://cursor.com/docs/cloud-agent/automations.md), 2026-10-28) |

## Findings worth carrying into the lesson

- Cursor splits the PR step into separate products that read the same PR: Bugbot reviews and reports, PR Routing & Approval decides
  reviewers or approval, and the cloud agent that wrote the PR handles CI and comments. PR Routing & Approval waits for Bugbot's
  check on the latest commit and will not approve if Bugbot reports findings that need a person.
  ([PR Routing & Approval](https://cursor.com/docs/approval-agents.md), 2026-10-28)
- Re-review follows the head commit: Bugbot reviews each push (only the new changes by default) and PR Routing & Approval reads
  only the checks on the latest commit. This matches the lesson's "a patch makes the old review stale" idea.
  ([Bugbot](https://cursor.com/docs/bugbot.md), 2026-10-28)
- Caps are explicit and small: 3 Autofix attempts on the existing branch ([Bugbot](https://cursor.com/docs/bugbot.md), 2026-10-28), 10 CI-fix
  follow-ups ([Cloud agent capabilities](https://cursor.com/docs/cloud-agent/capabilities.md), 2026-10-28), an 8-minute wait for agent checks
  ([PR Routing & Approval](https://cursor.com/docs/approval-agents.md), 2026-10-28).
- Policy lives in files in the repo (`APPROVAL_POLICY.md`, `ROUTING.md`, `.cursor/config/bugbot.yaml`, read from the base branch so a
  PR cannot change how it is judged). ([Bugbot](https://cursor.com/docs/bugbot.md), [PR Routing & Approval](https://cursor.com/docs/approval-agents.md), 2026-10-28)
- The 2026-10-23 note that cloud agents fix CI up to 10 times still holds ([Cloud agent capabilities](https://cursor.com/docs/cloud-agent/capabilities.md), 2026-10-28).
  Pages that were not in the 2026-10-23 PR notes and are used here: Bugbot Autofix ([Bugbot](https://cursor.com/docs/bugbot.md), 2026-10-28), the
  Bugbot-aware approval agent ([PR Routing & Approval](https://cursor.com/docs/approval-agents.md), 2026-10-28), and the review and CI automation
  triggers ([Automations](https://cursor.com/docs/cloud-agent/automations.md), 2026-10-28).
- Merge conflicts are not in their docs on any page checked (Bugbot, Bugbot help, PR Routing & Approval, Cloud agent capabilities, Cloud
  agent overview, Cloud agents help, GitHub integration, Automations; searched 2026-10-28).

## Pages read

All fetched 2026-10-28 (index first: https://cursor.com/docs/llms.txt), as raw Markdown with curl. "Full" = read top to bottom;
"searched" = read the sections matching review, CI, conflict, limit, loop and approval terms.

- https://cursor.com/docs/bugbot.md (full, apart from the API response samples and the pricing section)
- https://cursor.com/docs/approval-agents.md (full)
- https://cursor.com/help/ai-features/bugbot.md (full)
- https://cursor.com/docs/agent-sdk/templates/reviews.md (full; SDK templates for building your own reviewer, no routing of Cursor's own)
- https://cursor.com/docs/cloud-agent/capabilities.md (searched; subscriptions and "Fixing CI Failures")
- https://cursor.com/help/ai-features/cloud-agents.md (searched; CI fix and commit author)
- https://cursor.com/docs/cloud-agent.md (searched)
- https://cursor.com/docs/cloud-agent/automations.md (searched; triggers, PR tools, identity)
- https://cursor.com/docs/integrations/github.md (searched; found no review, conflict or loop rules)
- https://cursor.com/docs/integrations/slack.md (searched; completion notice with PR link)
- https://cursor.com/docs/integrations/linear.md (searched; PR creation only)
- https://cursor.com/docs/agent-sdk/guides/github.md (searched; shows how to build an approve / request-changes reviewer)
- https://cursor.com/docs/origin/agents.md (searched; no routing detail)

## Ruled out (why)

- **Agent SDK reviewer guides** (reviews templates, GitHub guide): how to build your own reviewer on Cursor's SDK, not what
  Cursor's products do; read, but they have no column.
- **Cloud agent webhooks, Cloud agent API endpoints**: fetched (webhooks) or listed (endpoints) as API surfaces for starting runs,
  not PR routing; not read in detail. A gap, not a finding.
- **Security Agents** (https://cursor.com/docs/security-agents.md): feeds PR Routing & Approval as a review signal; not fetched again
  here. A gap, not a finding.
- **Marketplace templates** (fix PR review comments, triage failed workflows): the pages are script-rendered, so the fetch returned
  no readable template text. Named only as links from the Automations page.
- **Bugbot usage-based billing, Bugbot analytics API, Admin API**: cost and reporting, not routing.
- **Agent Review (`/agent-review`), Debug Mode, Grok bot approvals**: local or other-product flows; covered in the 2026-10-23 grids or
  judged from index titles, not fetched.
- **Release notes / changelog**: not searched; newer routing features might be listed there. A gap, not a finding.
