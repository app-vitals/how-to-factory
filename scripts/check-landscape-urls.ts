import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export type UrlRef = { url: string; file: string; line: number };
export type UrlResult = UrlRef & { status: number | null; location?: string; error?: string };
/** Injected HTTP probe: must not follow redirects, so 3xx statuses are visible. */
export type Probe = (url: string) => Promise<{ status: number; location?: string }>;

const URL_RE = /https?:\/\/[^\s"'<>`)\]\\]+/g;
const TRAILING_PUNCT_RE = /[.,;:!?]+$/;

/** Every http(s) URL in `text` with its 1-based line, de-duplicated per line. */
export function extractUrls(text: string, file: string): UrlRef[] {
  const refs: UrlRef[] = [];
  text.split("\n").forEach((lineText, i) => {
    const seen = new Set<string>();
    for (const m of lineText.matchAll(URL_RE)) {
      const url = m[0].replace(TRAILING_PUNCT_RE, "");
      if (seen.has(url)) continue;
      seen.add(url);
      refs.push({ url, file, line: i + 1 });
    }
  });
  return refs;
}

/** Probes each distinct URL once (bounded concurrency); returns only non-2xx or failed refs. */
export async function findBadUrls(refs: UrlRef[], probe: Probe, concurrency = 8): Promise<UrlResult[]> {
  const unique = [...new Set(refs.map((r) => r.url))];
  const outcome = new Map<string, Omit<UrlResult, keyof UrlRef>>();
  let next = 0;
  const worker = async () => {
    while (next < unique.length) {
      const url = unique[next++]!;
      try {
        const { status, location } = await probe(url);
        outcome.set(url, { status, location });
      } catch (e) {
        outcome.set(url, { status: null, error: e instanceof Error ? e.message : String(e) });
      }
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, unique.length) }, worker));
  return refs
    .map((r) => ({ ...r, ...outcome.get(r.url)! }))
    .filter((r) => r.status === null || r.status < 200 || r.status >= 300);
}

export function formatResult(r: UrlResult): string {
  const where = `${r.file}:${r.line}`;
  if (r.status === null) return `${where} ERROR ${r.url} (${r.error})`;
  if (r.status >= 300 && r.status < 400)
    return `${where} REDIRECT ${r.status} ${r.url}${r.location ? ` -> ${r.location}` : ""}`;
  return `${where} DEAD ${r.status} ${r.url}`;
}

const fetchProbe: Probe = async (url) => {
  const res = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(15_000) });
  return { status: res.status, location: res.headers.get("location") ?? undefined };
};

export function landscapeFiles(root = "landscape"): string[] {
  const files = ["matrix.json"];
  for (const dir of readdirSync(root, { withFileTypes: true }))
    if (dir.isDirectory())
      for (const f of readdirSync(join(root, dir.name))) if (f.endsWith(".md")) files.push(join(dir.name, f));
  return files.map((f) => join(root, f));
}

if (import.meta.main) {
  const refs = landscapeFiles().flatMap((f) => extractUrls(readFileSync(f, "utf8"), f));
  const bad = await findBadUrls(refs, fetchProbe);
  console.log(`landscape-urls: checked ${new Set(refs.map((r) => r.url)).size} urls`);
  for (const r of bad) console.error(formatResult(r));
  if (bad.length) process.exit(1);
  console.log("landscape-urls: ok");
}
