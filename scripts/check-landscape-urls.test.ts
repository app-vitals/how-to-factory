import { describe, expect, test } from "bun:test";
import { extractUrls, findBadUrls, formatResult, type Probe } from "./check-landscape-urls.ts";

describe("extractUrls", () => {
  test("finds JSON sourceUrls with line numbers", () => {
    const text = `{\n  "sourceUrl": "https://a.example/docs",\n  "x": 1\n}`;
    expect(extractUrls(text, "m.json")).toEqual([{ url: "https://a.example/docs", file: "m.json", line: 2 }]);
  });

  test("finds markdown link urls and strips trailing punctuation", () => {
    const text = `intro\nSee ([Docs](https://b.example/x), 2026-10-19). Also https://c.example/y.`;
    expect(extractUrls(text, "g.md").map((r) => [r.url, r.line])).toEqual([
      ["https://b.example/x", 2],
      ["https://c.example/y", 2],
    ]);
  });

  test("dedupes repeats on one line but keeps separate lines", () => {
    const text = "https://d.example/a https://d.example/a\nhttps://d.example/a";
    expect(extractUrls(text, "f").map((r) => r.line)).toEqual([1, 2]);
  });
});

describe("findBadUrls", () => {
  const refs = [
    { url: "https://ok.example", file: "a", line: 1 },
    { url: "https://gone.example", file: "a", line: 2 },
    { url: "https://moved.example", file: "b", line: 3 },
    { url: "https://down.example", file: "b", line: 4 },
    { url: "https://gone.example", file: "c", line: 5 },
  ];
  const probe: Probe = async (url) => {
    if (url.includes("ok")) return { status: 200 };
    if (url.includes("gone")) return { status: 404 };
    if (url.includes("moved")) return { status: 301, location: "https://new.example" };
    throw new Error("ECONNREFUSED");
  };

  test("reports non-2xx and errors with file and line, probing each url once", async () => {
    const calls: string[] = [];
    const bad = await findBadUrls(refs, async (u) => { calls.push(u); return probe(u); });
    expect(calls.length).toBe(4);
    expect(bad.map((r) => formatResult(r))).toEqual([
      "a:2 DEAD 404 https://gone.example",
      "b:3 REDIRECT 301 https://moved.example -> https://new.example",
      "b:4 ERROR https://down.example (ECONNREFUSED)",
      "c:5 DEAD 404 https://gone.example",
    ]);
  });

  test("returns nothing when all urls are 2xx", async () => {
    expect(await findBadUrls([refs[0]!], probe)).toEqual([]);
  });
});
