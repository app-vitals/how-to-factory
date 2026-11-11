// Read-only HTTP view of the loop's upcoming queue. A separate process from the loop: it never writes
// tasks or attempts and never calls attempts.sync.

import { type AuditStore, auditStore } from "./audit-log.ts";
import { buildHistory, type HistoryView, HISTORY_CSS, type OutcomeFilter, parseOutcomeFilter, renderHistoryHtml } from "./history-view.ts";
import { type AttemptsStore, attemptsStore } from "./pr-attempts.ts";
import { ghPrSource, type PrSource, type PullRequest } from "./prs.ts";
import { BANNER_CSS, buildQueue, renderQueueHtml } from "./queue-view.ts";
import { fileStore, type TaskStore } from "./tasks.store.ts";

export const DEFAULT_QUEUE_PORT = 4040;
export const PR_CACHE_MS = 10_000;
const HOST = "127.0.0.1";

export interface QueueServerOptions {
  /** 0 picks a free port (tests). */
  port: number;
  store: TaskStore;
  prs: PrSource;
  attempts: AttemptsStore;
  /** Clock for the PR cache and the age column; injectable for tests. */
  now?: () => Date;
  /** Read per request, never written. Defaults to the real audit log. */
  audit?: AuditStore;
}

interface PrListing {
  prs: PullRequest[];
  error?: string;
}

/** Appends the history section (and its CSS) to the rendered queue page. */
function withHistory(queueHtml: string, section: string, needsBannerCss: boolean): string {
  const css = HISTORY_CSS + (needsBannerCss ? BANNER_CSS : "");
  return queueHtml.replace("</style>", () => `${css}</style>`).replace("</body>", () => `${section}\n</body>`);
}

export function startQueueServer(opts: QueueServerOptions) {
  const now = opts.now ?? (() => new Date());
  const audit = opts.audit ?? auditStore();
  let cached: { at: number; listing: PrListing } | undefined;

  async function listPrs(): Promise<PrListing> {
    const t = now().getTime();
    if (cached && t - cached.at < PR_CACHE_MS) return cached.listing;
    let listing: PrListing;
    try {
      listing = { prs: await opts.prs.list() };
    } catch (e) {
      listing = { prs: [], error: e instanceof Error ? e.message : String(e) };
    }
    cached = { at: t, listing };
    return listing;
  }

  /** Read per request. A corrupt or unreadable log yields an empty view plus the error. */
  function readHistory(outcome: OutcomeFilter): { view: HistoryView; error?: string } {
    try {
      return { view: buildHistory(audit.list(), { outcome }) };
    } catch (e) {
      return { view: buildHistory([], { outcome }), error: e instanceof Error ? e.message : String(e) };
    }
  }

  return Bun.serve({
    hostname: HOST,
    port: opts.port,
    async fetch(req) {
      const url = new URL(req.url);
      const path = url.pathname;
      if (req.method !== "GET" || (path !== "/" && path !== "/api/queue" && path !== "/api/history")) {
        return new Response("not found", { status: 404 });
      }
      const outcome = parseOutcomeFilter(url.searchParams.get("outcome"));
      if (path === "/api/history") {
        const { view, error } = readHistory(outcome);
        return Response.json(error === undefined ? view : { ...view, error });
      }
      try {
        const { prs, error } = await listPrs();
        const view = buildQueue(opts.store.load(), prs, opts.attempts);
        if (path === "/api/queue") return Response.json(error ? { ...view, error } : view);
        const queueHtml = renderQueueHtml(view, { prError: error, now: now() });
        const history = readHistory(outcome);
        const html = withHistory(queueHtml, renderHistoryHtml(history.view, { outcome, error: history.error }), history.error !== undefined && error === undefined);
        return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
      } catch (e) {
        return new Response(`queue unavailable: ${e instanceof Error ? e.message : String(e)}`, { status: 500 });
      }
    },
  });
}

function parsePort(raw: string | undefined): number {
  if (raw === undefined || raw === "") return DEFAULT_QUEUE_PORT;
  const port = Number(raw);
  if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error(`QUEUE_PORT must be 0-65535, got "${raw}"`);
  return port;
}

if (import.meta.main) {
  const server = startQueueServer({
    port: parsePort(process.env.QUEUE_PORT),
    store: fileStore(),
    prs: ghPrSource(),
    attempts: attemptsStore(),
  });
  console.log(`queue view on http://${server.hostname}:${server.port}/`);
}
