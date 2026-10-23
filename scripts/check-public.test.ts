import { describe, expect, test } from "bun:test";
import { ALLOWED_VENDORS, BANNED, EXEMPT, checkGridFile, checkMatrix, checkVendors, isAllowedVendor, scanContent, scanFiles } from "./check-public.ts";

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

const matrix = (...products: { id: string; name: string }[]) => JSON.stringify({ products }, null, 2);

describe("vendor allowlist", () => {
  test.each(["Claude Code", "Copilot", "GitHub Copilot coding agent", "Cursor", "Devin", "Factory (Droid)", "OpenHands", "Linear", "Jira", "GitHub Issues"])(
    "allows %s",
    (n) => expect(isAllowedVendor(n)).toBe(true),
  );

  test("matrix.json with all six vendors passes", () => {
    const m = matrix(
      { id: "claude-code", name: "Claude Code" },
      { id: "copilot", name: "GitHub Copilot coding agent" },
      { id: "cursor", name: "Cursor" },
      { id: "devin", name: "Devin" },
      { id: "factory", name: "Factory (Droid)" },
      { id: "openhands", name: "OpenHands" },
    );
    expect(checkMatrix("landscape/matrix.json", m)).toEqual([]);
  });

  test("non-allowlisted company in matrix.json fails with line and no echo", () => {
    const m = matrix({ id: "devin", name: "Devin" }, { id: "zorbo", name: "Zorbo Corp" });
    const hits = checkMatrix("landscape/matrix.json", m);
    expect(hits.map((h) => h.label)).toEqual(["vendor not in allowlist", "vendor not in allowlist"]);
    expect(hits[0]?.line).toBe(m.split("\n").findIndex((l) => l.includes('"zorbo"')) + 1);
    expect(JSON.stringify(hits)).not.toMatch(/zorbo/i);
  });

  test("grid file: allowed stem and heading pass", () => {
    expect(checkGridFile("landscape/plan-grid/cursor.md", "# Cursor: lesson 2 plan grid\n")).toEqual([]);
    expect(checkGridFile("landscape/verify-grid/factory.md", "# Factory (Droids / Missions): grid\n")).toEqual([]);
    expect(checkGridFile("landscape/verify-grid/copilot.md", "# GitHub Copilot (cloud agent, CLI): grid\n")).toEqual([]);
  });

  test("grid file: non-allowlisted heading and stem fail", () => {
    const hits = checkGridFile("landscape/plan-grid/zorbo.md", "intro\n# Zorbo Corp: lesson 2\n");
    expect(hits).toEqual([
      { file: "landscape/plan-grid/zorbo.md", line: 1, label: "vendor not in allowlist" },
      { file: "landscape/plan-grid/zorbo.md", line: 2, label: "vendor not in allowlist" },
    ]);
  });

  test("checkVendors routes files, skips README and unrelated paths", () => {
    const files: Record<string, string> = {
      "landscape/matrix.json": matrix({ id: "zorbo", name: "Zorbo" }),
      "landscape/plan-grid/README.md": "# Plan grid: spec to plan\n",
      "landscape/plan-grid/zorbo.md": "# Zorbo: x\n",
      "docs/zorbo.md": "# Zorbo: x\n",
    };
    const hits = checkVendors(Object.keys(files), (f) => files[f] ?? null);
    expect([...new Set(hits.map((h) => h.file))]).toEqual(["landscape/matrix.json", "landscape/plan-grid/zorbo.md"]);
  });

  test("allowlist contains the six vendors", () => {
    for (const v of ["Claude Code", "Copilot", "Cursor", "Devin", "Factory", "OpenHands"]) expect(ALLOWED_VENDORS).toContain(v);
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
