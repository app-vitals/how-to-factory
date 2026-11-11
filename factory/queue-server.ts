// Read-only HTTP view of the loop's upcoming queue. A separate process from the loop: it never writes
// tasks or attempts and never calls attempts.sync.

import { type AttemptsStore, attemptsStore } from "./pr-attempts.ts";
import { ghPrSource, type PrSource, type PullRequest } from "./prs.ts";
import { buildQueue, renderQueueHtml } from "./queue-view.ts";
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
}

interface PrListing {
  prs: PullRequest[];
  error?: string;
}

export function startQueueServer(opts: QueueServerOptions) {
  const now = opts.now ?? (() => new Date());
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

  return Bun.serve({
    hostname: HOST,
    port: opts.port,
    async fetch(req) {
      const path = new URL(req.url).pathname;
      if (req.method !== "GET" || (path !== "/" && path !== "/api/queue")) {
        return new Response("not found", { status: 404 });
      }
      try {
        const { prs, error } = await listPrs();
        const view = buildQueue(opts.store.load(), prs, opts.attempts);
        if (path === "/api/queue") return Response.json(error ? { ...view, error } : view);
        const html = renderQueueHtml(view, { prError: error, now: now() });
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
