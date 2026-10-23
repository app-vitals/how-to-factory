import { existsSync, readFileSync, statSync } from "node:fs";

// Pre-public scan: tracked files must not carry internal names, private repos, local paths
// or internal hosts. An optional UNTRACKED denylist (PRE_PUBLIC_EXTRA_BANNED=<file path>,
// one entry per line) catches client names without ever committing them.

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

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function parseDenylist(text: string): Rule[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l !== "" && !l.startsWith("#"))
    .map((l) => ({ label: "denylist entry", re: new RegExp(escapeRe(l), "i") }));
}

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

// Hit output never echoes the matched text, so a denylist entry cannot leak into CI logs.
const format = (h: Hit) => `${h.file}:${h.line}  ${h.label}`;

function readText(f: string): string | null {
  if (!statSync(f).isFile()) return null;
  const buf = readFileSync(f);
  return buf.includes(0) ? null : buf.toString("utf8");
}

function main(): number {
  const tracked = Bun.spawnSync(["git", "ls-files", "-z"]).stdout.toString().split("\0").filter(Boolean);
  const rules = [...BANNED];
  const extra = process.env.PRE_PUBLIC_EXTRA_BANNED;
  if (extra) {
    if (!existsSync(extra)) {
      console.error(`PRE_PUBLIC_EXTRA_BANNED file not found: ${extra}`);
      return 1;
    }
    rules.push(...parseDenylist(readFileSync(extra, "utf8")));
  }
  const hits = scanFiles(tracked.filter(existsSync), readText, rules);
  if (hits.length > 0) {
    console.error(`check-public: ${hits.length} banned match(es)`);
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
