# Plan: hwf-ops-lessons

Add the missing metrics / observability / ops candidates to the lesson backlog and component map. Docs only.

## Design
- `lessons/README.md`: new "Observability / ops" section (transcripts, run log, token/cost spend per task and day, stall detection, quiet-factory alerts, running the factory itself, on-call runbook). Split "Track a quality metric, not just spend" under Feedback / maintenance into a throughput/cycle-time dashboard entry and a rework/merge-rate entry.
- `docs/components.md` component 8: extend Range with factory-health observability and operating the factory itself.
- Entries stay unordered, tool-neutral, simplest-version-then-range. No third-party claims, so no citations needed.

## Tasks
| Task | Depends on | HITL |
|---|---|---|
| HOP-1.1 docs: add observability and ops entries to lesson backlog | — | |
| HOP-1.2 docs: extend feedback/maintenance range in components map | — | |

Both share branch `docs/hop-ops-backlog` (one PR). Safe to deploy standalone: yes (docs only).
