// Read-only view of the audit log: a pure model builder and an HTML fragment renderer.
// The fragment reuses the queue page's inline styles (.badge, .empty, .banner-error, tables);
// HISTORY_CSS adds only what history needs. No client JS, no external requests.

import { AUDIT_OUTCOMES, type AuditEntry, type AuditOutcome } from "./audit-log.ts";
import { escapeHtml, renderPrRef } from "./pr-link.ts";

export const DEFAULT_HISTORY_LIMIT = 100;

export type OutcomeFilter = AuditOutcome | null;

export interface HistoryOptions {
  /** null means All. */
  outcome: OutcomeFilter;
  limit?: number;
}

export interface HistoryView {
  /** Matching entries, newest first, capped at `limit`. */
  rows: AuditEntry[];
  /** Entries matching the filter, before the cap. */
  total: number;
  shown: number;
  /** Per outcome over ALL entries; independent of the filter. */
  counts: Record<AuditOutcome, number>;
}

export interface HistoryRenderOptions {
  outcome: OutcomeFilter;
  /** Shown as a banner when the audit log could not be read. */
  error?: string;
}

export function parseOutcomeFilter(value: string | null | undefined): OutcomeFilter {
  return AUDIT_OUTCOMES.find((o) => o === value) ?? null;
}

export function buildHistory(entries: AuditEntry[], opts: HistoryOptions): HistoryView {
  const limit = opts.limit ?? DEFAULT_HISTORY_LIMIT;
  const counts: Record<AuditOutcome, number> = { success: 0, failure: 0, skip: 0 };
  for (const e of entries) counts[e.outcome] += 1;

  const matching = entries
    .map((entry, index) => ({ entry, index, time: Date.parse(entry.at) }))
    .filter(({ entry }) => opts.outcome === null || entry.outcome === opts.outcome)
    // Newest first; on equal timestamps the later-appended entry wins.
    .sort((a, b) => b.time - a.time || b.index - a.index)
    .map(({ entry }) => entry);

  const rows = matching.slice(0, Math.max(0, limit));
  return { rows, total: matching.length, shown: rows.length, counts };
}

const esc = escapeHtml;

// dev-task rows stay plain text: there is no task view to link to yet.
function refCell(e: AuditEntry): string {
  if (e.action === "dev-task") return esc(String(e.target));
  return renderPrRef({ number: e.target, repo: e.repo, url: e.url, plain: String(e.target) });
}

export const HISTORY_CSS = `
.chips{display:flex;gap:.5rem;margin:.5rem 0 1rem}
.chip{padding:.2rem .7rem;border:1px solid #ccc;border-radius:1rem;color:#1a1a1a;text-decoration:none;font-size:.85rem}
.chip.active{background:#1a1a1a;border-color:#1a1a1a;color:#fff}
.badge-success{background:#047857}.badge-failure{background:#dc2626}.badge-skip{background:#6b7280}
`;

function duration(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  const s = ms / 1000;
  if (s < 60) return `${Math.round(s * 10) / 10}s`;
  return `${Math.floor(s / 60)}m ${Math.round(s % 60)}s`;
}

function chip(label: string, value: AuditOutcome | null, count: number, active: boolean): string {
  const href = value === null ? "?#history" : `?outcome=${value}#history`;
  return `<a class="chip${active ? " active" : ""}"${active ? ' aria-current="true"' : ""} href="${href}">${label} (${count})</a>`;
}

export function renderHistoryHtml(history: HistoryView, opts: HistoryRenderOptions): string {
  const { counts } = history;
  const all = counts.success + counts.failure + counts.skip;
  const chips =
    `<nav class="chips">` +
    chip("All", null, all, opts.outcome === null) +
    chip("Success", "success", counts.success, opts.outcome === "success") +
    chip("Failure", "failure", counts.failure, opts.outcome === "failure") +
    chip("Skip", "skip", counts.skip, opts.outcome === "skip") +
    `</nav>`;

  const banner = opts.error === undefined ? "" : `<p class="banner-error">Could not read the audit log: ${esc(opts.error)}</p>`;

  const rows = history.rows
    .map(
      (e) =>
        `<tr><td>${esc(e.at)}</td>` +
        `<td><span class="badge badge-${e.action}">${e.action}</span></td>` +
        `<td><code>${refCell(e)}</code></td><td>${esc(e.title)}</td>` +
        `<td><span class="badge badge-${e.outcome}">${e.outcome}</span></td>` +
        `<td>${e.outcome === "success" ? "" : esc(e.reason ?? "")}</td>` +
        `<td>${duration(e.durationMs)}</td></tr>`,
    )
    .join("");

  const body =
    history.rows.length === 0
      ? `<p class="empty">No runs to show.</p>`
      : `<table><thead><tr><th>Time</th><th>Kind</th><th>Ref</th><th>Title</th><th>Outcome</th><th>Reason</th><th>Duration</th></tr></thead><tbody>${rows}</tbody></table>`;

  const note = history.shown < history.total ? `<p class="empty">showing ${history.shown} of ${history.total}</p>` : "";

  return `<section id="history"><h2>History</h2>${banner}${chips}${body}${note}</section>`;
}
