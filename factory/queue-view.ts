// Read-only view of the loop's work queue: a pure model builder and a self-contained HTML renderer.
// Nothing here writes, and attempts.sync is never called.

import { rankCandidates } from "./candidates.ts";
import type { AttemptsStore } from "./pr-attempts.ts";
import type { PullRequest } from "./prs.ts";
import type { Task } from "./tasks.schema.ts";

export type QueueKind = "dev-task" | "review" | "patch";

export interface QueueItem {
  /** 1-based, in loop order. */
  position: number;
  kind: QueueKind;
  /** Task id, or `#<pr>` for a pull request. */
  ref: string;
  title: string;
  createdAt?: string;
}

export interface QueueView {
  running: Task[];
  queue: QueueItem[];
}

export interface RenderOptions {
  /** Shown as a banner when the PR source failed. */
  prError?: string;
  /** Clock for the age column; injectable for tests. */
  now?: Date;
}

export function buildQueue(tasks: Task[], prs: PullRequest[], attempts: AttemptsStore): QueueView {
  const queue = rankCandidates(tasks, prs, attempts).map((c, i): QueueItem => {
    if (c.kind === "task") {
      return { position: i + 1, kind: "dev-task", ref: c.task.id, title: c.task.title, createdAt: c.task.createdAt };
    }
    return { position: i + 1, kind: c.action, ref: `#${c.pr.number}`, title: c.pr.title, createdAt: c.pr.createdAt };
  });
  return { running: tasks.filter((t) => t.status === "in_progress"), queue };
}

const ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = (s: string): string => s.replace(/[&<>"']/g, (c) => ESCAPES[c] ?? c);

function age(iso: string | undefined, now: Date): string {
  if (iso === undefined) return "–";
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "–";
  const mins = Math.max(0, Math.floor((now.getTime() - t) / 60_000));
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  return hours < 24 ? `${hours}h` : `${Math.floor(hours / 24)}d`;
}

const CSS = `
body{font:15px/1.5 system-ui,sans-serif;margin:2rem auto;max-width:56rem;padding:0 1rem;color:#1a1a1a;background:#fafafa}
h1{font-size:1.4rem}h2{font-size:1.1rem;margin-top:2rem}
table{border-collapse:collapse;width:100%}th,td{text-align:left;padding:.4rem .6rem;border-bottom:1px solid #ddd}
.badge{display:inline-block;padding:.1rem .5rem;border-radius:.7rem;color:#fff;font-size:.8rem}
.badge-dev-task{background:#2563eb}.badge-review{background:#7c3aed}.badge-patch{background:#d97706}
.next{background:#ecfdf5}.tag{margin-left:.5rem;font-size:.75rem;font-weight:600;color:#047857}
.empty{color:#666}
`;

// Only included when the banner is shown, so the class name appears in the page only then.
export const BANNER_CSS = ".banner-error{background:#fef2f2;border:1px solid #fca5a5;color:#991b1b;padding:.6rem .8rem;border-radius:.4rem}";

export function renderQueueHtml(view: QueueView, opts: RenderOptions = {}): string {
  const now = opts.now ?? new Date();
  const banner =
    opts.prError === undefined
      ? ""
      : `<p class="banner-error">Could not read pull requests: ${esc(opts.prError)}. Showing tasks only.</p>`;

  const running =
    view.running.length === 0
      ? `<p class="empty">Nothing running.</p>`
      : `<ul>${view.running.map((t) => `<li><code>${esc(t.id)}</code> ${esc(t.title)}</li>`).join("")}</ul>`;

  const rows = view.queue
    .map(
      (q, i) =>
        `<tr${i === 0 ? ' class="next"' : ""}><td>${q.position}</td>` +
        `<td><span class="badge badge-${q.kind}">${q.kind}</span></td>` +
        `<td><code>${esc(q.ref)}</code></td><td>${esc(q.title)}${i === 0 ? '<span class="tag">next up</span>' : ""}</td>` +
        `<td>${age(q.createdAt, now)}</td></tr>`,
    )
    .join("");
  const queue =
    view.queue.length === 0
      ? `<p class="empty">Queue is empty.</p>`
      : `<table><thead><tr><th>#</th><th>Kind</th><th>Ref</th><th>Title</th><th>Age</th></tr></thead><tbody>${rows}</tbody></table>`;

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="10">
<title>Factory queue</title><style>${CSS}${opts.prError === undefined ? "" : BANNER_CSS}</style></head>
<body><h1>Factory queue</h1>${banner}
<h2>Running now</h2>${running}
<h2>Up next</h2>${queue}
</body></html>
`;
}
