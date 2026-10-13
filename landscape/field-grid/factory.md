# Factory (Droid / Missions): lesson 1 field grid

Scope: lesson 1 only (plan, dev-task, loop). Every filled field is a paraphrase of a first-party page, with its
URL and the date it was fetched. "Who drives" is one of Human, Human approves, Automated, and only when a page says so;
otherwise `not documented`. Names are the product's own, not canonical.

## PLAN

Surface: Missions (started from a Droid session).

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A goal the person describes, then a back-and-forth where Droid asks clarifying questions and probes constraints (docs name the command `/missions`; the news page names `/enter-mission`) | https://docs.factory.com/features/missions/overview ; https://factory.com/news/missions | 2026-10-13 |
| step | Droid turns the goal into a structured plan of features grouped into milestones; the docs tie features to validation, but acceptance-criteria wording and explicit dependencies between features: not documented | https://docs.factory.com/features/missions/overview ; https://factory.com/news/missions | 2026-10-13 |
| output | The approved plan, shown in Mission Control (the Missions orchestration view, in the CLI and the Factory app) | https://docs.factory.com/features/missions/overview | 2026-10-13 |
| who drives | Human approves | https://docs.factory.com/features/missions/overview ; https://factory.com/news/missions | 2026-10-13 |

## DEV-TASK

Surface: a Mission worker handling one feature.

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | One feature from the plan, given to a worker session that starts with clean context | https://factory.com/news/missions | 2026-10-13 |
| step | The worker builds the feature, reusing existing skills in the project; the docs say each feature is checked with user-facing QA against the running app, and at the end of a milestone validation workers run tests, look for regressions and check integration | https://docs.factory.com/features/missions/overview ; https://factory.com/news/missions | 2026-10-13 |
| output | Work handed off through git, with follow-up work created when validation finds issues; whether a PR comes out of a Mission: not documented | https://factory.com/news/missions | 2026-10-13 |
| who drives | Automated (after plan approval the orchestrator runs it; the person can pause) | https://docs.factory.com/features/missions/overview | 2026-10-13 |

Second surface, interactive Droid CLI: the person steers and approves actions, and reviews plans, tool calls and diffs in the terminal. Who drives: Human approves. Source: https://docs.factory.com/cli/getting-started/overview (as of 2026-10-13).

## LOOP

Surfaces: Missions orchestrator; Slack mention; headless `droid exec`.

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | Missions: the finished feature and the accumulated progress. Slack: an @Factory mention in a thread, a direct message, or `!new <task>`. Exec mode: structured input from a script or CI job | https://factory.com/news/missions ; https://docs.factory.com/integrations/slack ; https://docs.factory.com/cli/getting-started/overview | 2026-10-13 |
| step | Missions: the orchestrator reviews progress after each feature and moves on, adding follow-up work when validation fails. Slack: Droid keeps small questions in the thread and can open a code channel for larger multi-step work. Exec mode: runs a stabilized workflow without interaction | https://factory.com/news/missions ; https://docs.factory.com/integrations/slack ; https://docs.factory.com/cli/getting-started/overview | 2026-10-13 |
| output | Missions: the next feature starts. Slack: thread replies, pull requests when code changes are needed, and files or artifacts posted back. Exec mode: machine-readable output for pipelines | https://factory.com/news/missions ; https://docs.factory.com/integrations/slack ; https://docs.factory.com/cli/getting-started/overview | 2026-10-13 |
| who drives | Missions: Automated between features (person can pause). Exec mode: Automated. Slack: Human (a person mentions it); whether Droid continues past that on its own is only partly described | https://docs.factory.com/features/missions/overview ; https://docs.factory.com/cli/getting-started/overview ; https://docs.factory.com/integrations/slack | 2026-10-13 |

## Not documented

- PLAN: acceptance-criteria wording and dependencies between features (the two pages also disagree on the command name).
- DEV-TASK: whether a Mission delivers a PR or a branch.
- LOOP: schedule-based starts were not covered by the pages fetched for this grid.
