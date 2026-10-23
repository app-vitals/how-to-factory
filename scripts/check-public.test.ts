import { describe, expect, test } from "bun:test";
import { BANNED, EXEMPT, parseDenylist, scanContent, scanFiles } from "./check-public.ts";

describe("scanContent", () => {
  test("hits a seeded banned string with file and line", () => {
    const hits = scanContent("a.md", "ok\nsee app-vitals/intel for more", BANNED);
    expect(hits).toEqual([{ file: "a.md", line: 2, label: "private intel repo" }]);
  });

  test.each([
    ["/home/someone/project", "local filesystem path"],
    ["/data/agent-home/workspace", "local filesystem path"],
    ["db.corp", "internal host"],
    ["Squadron", "internal product name"],
  ])("flags %s", (text, label) => {
    expect(scanContent("f", text, BANNED).map((h) => h.label)).toContain(label);
  });

  test("passes clean text", () => {
    expect(scanContent("a.md", "A factory has plan, build, verify.", BANNED)).toEqual([]);
  });
});

describe("denylist", () => {
  const rules = parseDenylist("# comment\n\nAcme Widgets\n");

  test("matches case-insensitively", () => {
    expect(scanContent("a.md", "we built this for ACME widgets", rules)).toHaveLength(1);
  });

  test("ignores comments and blanks, escapes regex chars", () => {
    expect(rules).toHaveLength(1);
    expect(scanContent("a.md", "axme", parseDenylist("a.me"))).toEqual([]);
  });

  test("hit label does not echo the entry", () => {
    expect(JSON.stringify(scanContent("a.md", "acme widgets", rules))).not.toMatch(/acme/i);
  });
});

describe("scanFiles", () => {
  const files = { "a.md": "squadron", "scripts/check-public.ts": "squadron", "bin.png": "" };
  const read = (f: string) => (f === "bin.png" ? null : files[f as keyof typeof files] ?? null);

  test("skips exempt paths and unreadable (binary) files", () => {
    const hits = scanFiles(Object.keys(files), read, BANNED);
    expect(hits.map((h) => h.file)).toEqual(["a.md"]);
    expect(EXEMPT).toContain("scripts/check-public.ts");
  });
});
