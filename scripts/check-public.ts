import { existsSync, readFileSync, statSync } from "node:fs";
import { basename } from "node:path";

// Pre-public scan: tracked files must not carry internal names, private repos, local paths
// or internal hosts. Patterns are committed; there is no untracked or env-supplied input.
// A vendor allowlist additionally guards the structured landscape files.

export type Rule = { label: string; re: RegExp };

export const BANNED: Rule[] = [
  { label: "private intel repo", re: /app-vitals\/intel/i },
  { label: "internal product name", re: /\bsquadron\b|supplement-cert-platform/i },
  { label: "local filesystem path", re: /\/(?:home|Users)\/[\w.-]+\/|\/data\/agent-home|C:\\Users\\/i },
  { label: "internal host", re: /\b[\w-]+\.(?:internal|corp)\b/i },
];

// This script and its tests necessarily spell out the patterns they test.
export const EXEMPT = ["scripts/check-public.ts", "scripts/check-public.test.ts"];

export type Hit = { file: string; line: number; label: string };

export function scanContent(file: string, content: string, rules: Rule[]): Hit[] {
  const hits: Hit[] = [];
  content.split("\n").forEach((text, i) => {
    for (const { label, re } of rules) if (re.test(text)) hits.push({ file, line: i + 1, label });
  });
  return hits;
}

export function scanFiles(
  files: string[],
  read: (f: string) => string | null,
  rules: Rule[],
  exempt: string[] = EXEMPT,
): Hit[] {
  return files
    .filter((f) => !exempt.includes(f))
    .flatMap((f) => {
      const content = read(f);
      return content === null ? [] : scanContent(f, content, rules);
    });
}

// Vendors permitted in the structured landscape places. The task-queue trackers (Linear, Jira,
// GitHub Issues) are allowed because matrix.json already lists them as task-queue products.
// Anything else naming a company there is a hit. Compared case-insensitively after stripping a
// trailing parenthetical, e.g. "Factory (Droid)" -> "factory".
export const ALLOWED_VENDORS = [
  "Claude Code",
  "Copilot",
  "GitHub Copilot",
  "GitHub Copilot coding agent",
  "GitHub Copilot cloud agent",
  "Cursor",
  "Devin",
  "Factory",
  "OpenHands",
  "Linear",
  "Jira",
  "GitHub Issues",
];

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const ALLOWED_SLUGS = new Set(ALLOWED_VENDORS.map(slug));
const VENDOR_LABEL = "vendor not in allowlist";

export function isAllowedVendor(name: string): boolean {
  return ALLOWED_SLUGS.has(slug(name.replace(/\s*\(.*\)\s*$/, "")));
}

// Product id/name entries in landscape/matrix.json (products[].id and products[].name).
export function checkMatrix(file: string, content: string): Hit[] {
  let data: { products?: { id?: unknown; name?: unknown }[] };
  try {
    data = JSON.parse(content);
  } catch {
    return [{ file, line: 1, label: "unparseable JSON, vendors not checked" }];
  }
  const lines = content.split("\n");
  const start = Math.max(0, lines.findIndex((l) => /^\s*"products"\s*:/.test(l)));
  const lineOf = (key: string, value: string) => {
    const needle = JSON.stringify(value);
    const i = lines.findIndex((l, n) => n >= start && l.includes(`"${key}"`) && l.includes(needle));
    return i === -1 ? start + 1 : i + 1;
  };
  const hits: Hit[] = [];
  for (const p of data.products ?? []) {
    for (const key of ["id", "name"] as const) {
      const v = p[key];
      if (typeof v === "string" && !isAllowedVendor(v)) hits.push({ file, line: lineOf(key, v), label: VENDOR_LABEL });
    }
  }
  return hits;
}

// Per-product grid files: file stem, and the name before ':' in the first "# " heading.
export function checkGridFile(file: string, content: string): Hit[] {
  const hits: Hit[] = [];
  const stem = basename(file).replace(/\.md$/, "");
  if (!isAllowedVendor(stem)) hits.push({ file, line: 1, label: VENDOR_LABEL });
  const lines = content.split("\n");
  const i = lines.findIndex((l) => l.startsWith("# "));
  if (i !== -1) {
    const name = (lines[i] ?? "").slice(2).split(":", 1)[0]?.trim() ?? "";
    if (!isAllowedVendor(name)) hits.push({ file, line: i + 1, label: VENDOR_LABEL });
  }
  return hits;
}

export function checkVendors(files: string[], read: (f: string) => string | null): Hit[] {
  return files.flatMap((f) => {
    const isMatrix = f === "landscape/matrix.json";
    const isGrid = /^landscape\/[^/]+-grid\/[^/]+\.md$/.test(f) && basename(f) !== "README.md";
    if (!isMatrix && !isGrid) return [];
    const content = read(f);
    if (content === null) return [];
    return isMatrix ? checkMatrix(f, content) : checkGridFile(f, content);
  });
}

// Hit output never echoes the matched text, so nothing sensitive can leak into CI logs.
const format = (h: Hit) => `${h.file}:${h.line}  ${h.label}`;

function readText(f: string): string | null {
  if (!statSync(f).isFile()) return null;
  const buf = readFileSync(f);
  return buf.includes(0) ? null : buf.toString("utf8");
}

function main(): number {
  const tracked = Bun.spawnSync(["git", "ls-files", "-z"]).stdout.toString().split("\0").filter(Boolean);
  const present = tracked.filter(existsSync);
  const hits = [...scanFiles(present, readText, BANNED), ...checkVendors(present, readText)];
  if (hits.length > 0) {
    console.error(`check-public: ${hits.length} match(es)`);
    for (const h of hits) console.error(`  ${format(h)}`);
    return 1;
  }
  console.log(`check-public: ${tracked.length} tracked files clean`);
  if (!process.argv.includes("--gitleaks")) return 0;

  // Full history: no --no-git, no --log-opts range.
  const gl = Bun.spawnSync(["gitleaks", "git", "--redact", "--verbose", "--exit-code", "1", "."], {
    stdout: "inherit",
    stderr: "inherit",
  });
  if (gl.exitCode !== 0) {
    console.error("check-public: gitleaks failed over full history (is gitleaks installed?)");
    return 1;
  }
  return 0;
}

if (import.meta.main) process.exit(main());
