# Options: how the field does it

Names are not canonical. All claims below are paraphrases of first-party pages, copied from
[`landscape/matrix.json`](../../landscape/matrix.json) (rendered in [landscape/README.md](../../landscape/README.md)).
As of 2026-10-10 for every row. Re-check before filming.
These appear on slides only; the lesson does not run other products live.

## What other factories call it

| Product | Planning | Execution | Source |
|---|---|---|---|
| Claude Code | plan mode | session | [plan mode](https://code.claude.com/docs/en/common-workflows), [overview](https://code.claude.com/docs/en/overview) |
| Cursor | Plan Mode | Cloud agents | [planning](https://cursor.com/docs/agent/planning), [cloud agents](https://cursor.com/docs/background-agent) |
| OpenHands | (not sourced) | sandbox | [sandboxes](https://docs.openhands.dev/openhands/usage/sandboxes/overview.md) |
| GitHub Copilot coding agent | (not sourced) | Copilot cloud agent | [about](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) |
| Devin | (not sourced) | session | [session tools](https://docs.devin.ai/work-with-devin/devin-session-tools.md) |
| Linear | Issues, Projects, Cycles | n/a (a queue, not an executor) | [conceptual model](https://linear.app/docs/conceptual-model) |
| This sample | `plan` | `dev-task` | [factory/skills](../../factory/skills/) |

## How work enters (intake)

| Approach | Example | Pick this if | Source |
|---|---|---|---|
| Chat mention | OpenHands Slack app; Cursor via Slack | your team lives in chat | [OpenHands](https://docs.openhands.dev/openhands/usage/cloud/slack-installation.md), [Cursor](https://cursor.com/docs/background-agent) |
| Ticket assignment | Devin via Linear | work already lives in a tracker | [Devin + Linear](https://docs.devin.ai/integrations/linear.md) |
| Issue or PR on GitHub | Copilot cloud agent | your work is on GitHub | [about](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) |
| You type it | Claude Code terminal | you are one person | [overview](https://code.claude.com/docs/en/overview) |

## Other factories at a glance (a sourced slide, not a live demo)

| Product | Access, as stated by the vendor | Source |
|---|---|---|
| OpenHands | repo states an MIT license and says agents can run locally or in Docker | [GitHub](https://github.com/OpenHands/OpenHands) |
| Devin | the Free self-serve plan lists limited Devin usage | [billing](https://docs.devin.ai/admin/billing/self-serve.md) |
| Cursor | Cloud Agents need a paid plan, charged at API pricing | [docs](https://cursor.com/docs/background-agent) |

## Where it goes from here

Destinations only, not a recommendation. Claude Code's overview points to parallel subagents, background agents,
scheduled Routines and the Agent SDK ([overview](https://code.claude.com/docs/en/overview)); Cursor runs agents in
isolated cloud VMs ([docs](https://cursor.com/docs/background-agent)); trackers such as Linear, Jira and GitHub
Issues hold the queue ([Linear](https://linear.app/docs/conceptual-model),
[Jira](https://support.atlassian.com/jira-software-cloud/docs/what-is-an-issue/),
[GitHub](https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issues)).
