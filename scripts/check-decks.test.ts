import { describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, writeFileSync, cpSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { checkDeckHtml, checkDecks, loadConfig, wordCount } from "./check-decks.ts";

const ROOT = join(import.meta.dir, "..");
const cfg = loadConfig(ROOT);

const deck = (...slides: string[]) => `<html><body>${slides.join("")}</body></html>`;
const slide = (body: string, kind = "content", title = "A short title") =>
  `<section class="slide" data-kind="${kind}"><div class="slide-inner"><h2>${title}</h2>${body}</div></section>`;
const VISUAL = `<div class="visual"><table><tr><td>cell</td></tr></table></div>`;
const diagram = (nodes: string[]) =>
  `<div class="visual diagram" data-diagram="x">${nodes.map((n) => `<div class="node">${n}</div>`).join("")}</div>`;
const rules = (html: string) => checkDeckHtml(html, cfg).map((v) => v.rule);

describe("check-decks rules", () => {
  test("passes a clean slide", () => {
    expect(rules(deck(slide(`<ul><li>one</li><li>two</li><li>three</li></ul>${VISUAL}`)))).toEqual([]);
  });

  test("fails a 4th bullet", () => {
    expect(rules(deck(slide(`<ul><li>a</li><li>b</li><li>c</li><li>d</li></ul>${VISUAL}`)))).toEqual(["bullet-count"]);
  });

  test("fails a 9-word bullet but allows 8", () => {
    expect(rules(deck(slide(`<ul><li>one two three four five six seven eight nine</li></ul>${VISUAL}`)))).toEqual(["bullet-words"]);
    expect(rules(deck(slide(`<ul><li>one two three four five six seven eight</li></ul>${VISUAL}`)))).toEqual([]);
  });

  test("fails a 9-word title but allows 8", () => {
    expect(rules(deck(slide(VISUAL, "content", "one two three four five six seven eight nine")))).toEqual(["title-words"]);
    expect(rules(deck(slide(VISUAL, "content", "one two three four five six seven eight")))).toEqual([]);
  });

  test("fails a prose paragraph; allows a short caption; fails a long one", () => {
    expect(rules(deck(slide(`<p>This is prose.</p>${VISUAL}`)))).toEqual(["prose"]);
    expect(rules(deck(slide(`<p class="caption">short caption</p>${VISUAL}`)))).toEqual([]);
    const long = Array(13).fill("w").join(" ");
    expect(rules(deck(slide(`<p class="caption">${long}</p>${VISUAL}`)))).toEqual(["caption-words"]);
  });

  test("fails a content slide with no visual", () => {
    expect(rules(deck(slide(`<ul><li>only text</li></ul>`)))).toEqual(["no-visual"]);
  });

  test("fails 3 visual blocks but allows 2", () => {
    expect(rules(deck(slide(VISUAL + VISUAL + VISUAL)))).toEqual(["visual-count"]);
    expect(rules(deck(slide(VISUAL + VISUAL)))).toEqual([]);
  });

  test("fails a 9-node diagram but allows 8", () => {
    const labels = (n: number) => Array.from({ length: n }, (_, i) => `n${i}`);
    expect(rules(deck(slide(diagram(labels(9)))))).toEqual(["diagram-nodes"]);
    expect(rules(deck(slide(diagram(labels(8)))))).toEqual([]);
  });

  test("fails a 4-word node label but allows 3", () => {
    expect(rules(deck(slide(diagram(["one two three four"]))))).toEqual(["node-label-words"]);
    expect(rules(deck(slide(diagram(["one two three"]))))).toEqual([]);
  });

  test("fails more than one diagram per slide", () => {
    expect(rules(deck(slide(diagram(["a"]) + diagram(["b"]))))).toEqual(["diagram-count"]);
  });

  test("fails content placed in the safe zone (inline style or class)", () => {
    const style = `<div style="position:absolute; right:2%; bottom:2%">x</div>`;
    expect(rules(deck(slide(VISUAL + style)))).toEqual(["safe-zone"]);
    expect(rules(deck(slide(VISUAL + `<div class="in-safe-zone">x</div>`)))).toEqual(["safe-zone"]);
    const clear = `<div style="position:absolute; right:30%; bottom:2%">x</div>`;
    expect(rules(deck(slide(VISUAL + clear)))).toEqual([]);
  });

  test("reports the slide number and file", () => {
    const v = checkDeckHtml(deck(slide(VISUAL), slide(`<ul><li>x</li></ul>`)), cfg, "f.html");
    expect(v).toEqual([{ file: "f.html", slide: 2, rule: "no-visual", message: expect.any(String) }]);
  });
});

describe("check-decks exemptions and exclusions", () => {
  test("title and DEMO slides are exempt from the visual rule", () => {
    expect(rules(deck(slide(`<p class="subtitle">hi</p>`, "title"), slide(`<div class="demo-label">DEMO</div>`, "demo", "DEMO")))).toEqual([]);
  });

  test("exercise slides are not exempt from the visual rule", () => {
    expect(rules(deck(slide(`<ul><li>go</li></ul>`, "exercise")))).toEqual(["no-visual"]);
  });

  test("table cells, code and diagram labels do not count toward word limits", () => {
    const words = Array(20).fill("w").join(" ");
    const html = slide(
      `<ul><li>short <code>${words}</code></li></ul>
       <div class="visual"><table><tr><td>${words}</td></tr></table></div>
       <div class="visual diagram"><svg><text>${words}</text></svg></div>`,
    );
    // The diagram has no .node, so only the word-count exclusions are exercised here.
    expect(rules(deck(html))).toEqual([]);
  });

  test("list items inside visuals are not bullets", () => {
    expect(rules(deck(slide(`<div class="visual"><ul><li>a</li><li>b</li><li>c</li><li>d</li></ul></div>`)))).toEqual([]);
  });

  test("wordCount ignores symbols and decodes entities", () => {
    expect(wordCount("a &amp; b → c")).toBe(3);
  });
});

describe("forbidden words", () => {
  test("fails with the slide and word named", () => {
    const v = checkDeckHtml(deck(slide(VISUAL), slide(`<ul><li>See the Options.md file</li></ul>${VISUAL}`)), cfg);
    expect(v.map((x) => [x.slide, x.rule])).toEqual([[2, "forbidden-word"]]);
    expect(v[0]?.message).toContain("options.md");
  });

  test("matches multi-word phrases case-insensitively, including table cells", () => {
    expect(rules(deck(slide(`<div class="visual"><table><tr><td>Not   Documented</td></tr></table></div>`)))).toEqual(["forbidden-word"]);
  });

  test("matches whole phrases only, not substrings", () => {
    expect(rules(deck(slide(`<ul><li>We outsourced the matrixes</li></ul>${VISUAL}`)))).toEqual([]);
    expect(rules(deck(slide(`<ul><li>It was sourced locally</li></ul>${VISUAL}`)))).toEqual(["forbidden-word"]);
  });

  test("passes a clean deck", () => {
    expect(rules(deck(slide(`<ul><li>plain words</li></ul>${VISUAL}`)))).toEqual([]);
  });

  test("ignores comments, attributes, scripts and styles", () => {
    const body = `<!-- matrix sourced --><ul><li>fine</li></ul><div class="visual matrix" title="sourced"><table><tr><td>x</td></tr></table></div><script>var matrix=1</script><style>.matrix{}</style>`;
    expect(rules(deck(slide(body)))).toEqual([]);
  });
});

describe("check-decks over the repo", () => {
  test("the template passes", async () => {
    const { violations, files } = await checkDecks(ROOT);
    expect(files).toBeGreaterThanOrEqual(1);
    expect(violations).toEqual([]);
  });

  test("CLI exits non-zero for a failing lesson deck and zero for a clean one", () => {
    const root = mkdtempSync(join(tmpdir(), "decks-"));
    mkdirSync(join(root, "decks/_template"), { recursive: true });
    cpSync(join(ROOT, "decks/deck.config.json"), join(root, "decks/deck.config.json"));
    cpSync(join(ROOT, "decks/_template/index.html"), join(root, "decks/_template/index.html"));
    const run = () => Bun.spawnSync(["bun", join(ROOT, "scripts/check-decks.ts"), root]);
    expect(run().exitCode).toBe(0);
    mkdirSync(join(root, "lessons/01-x/deck"), { recursive: true });
    writeFileSync(join(root, "lessons/01-x/deck/index.html"), deck(slide(`<ul><li>a</li><li>b</li><li>c</li><li>d</li></ul>${VISUAL}`)));
    expect(run().exitCode).toBe(1);
  });
});

describe("check-decks CLI", () => {
  const CLI = join(ROOT, "scripts/check-decks.ts");
  const CLEAN = deck(slide(`<ul><li>a</li><li>b</li><li>c</li></ul>${VISUAL}`));
  const BAD = deck(slide(`<ul><li>a</li><li>b</li><li>c</li><li>d</li></ul>${VISUAL}`));

  // A fixture repo whose only deck is the template, so the deck count is exactly 1.
  const fixture = (html: string) => {
    const root = mkdtempSync(join(tmpdir(), "decks-cli-"));
    mkdirSync(join(root, "decks/_template"), { recursive: true });
    cpSync(join(ROOT, "decks/deck.config.json"), join(root, "decks/deck.config.json"));
    writeFileSync(join(root, "decks/_template/index.html"), html);
    return root;
  };
  const run = async (args: string[], cwd?: string) => {
    const proc = Bun.spawn(["bun", CLI, ...args], { cwd, stdout: "pipe", stderr: "pipe" });
    const [stdout, stderr, exitCode] = await Promise.all([new Response(proc.stdout).text(), new Response(proc.stderr).text(), proc.exited]);
    return { stdout, stderr, exitCode };
  };

  test("a clean fixture deck exits 0 and reports OK on stdout", async () => {
    const { exitCode, stdout } = await run([fixture(CLEAN)]);
    expect(exitCode).toBe(0);
    expect(stdout).toContain("check-decks: 1 deck(s) OK");
  });

  test("a rule violation exits 1 with a located line and a summary on stderr", async () => {
    const { exitCode, stdout, stderr } = await run([fixture(BAD)]);
    expect(exitCode).toBe(1);
    expect(stdout).toBe("");
    expect(stderr).toMatch(/^decks\/_template\/index\.html slide 1 \[bullet-count\] .+$/m);
    expect(stderr).toContain("check-decks: 1 violation(s) in 1 deck(s)");
  });

  test("with no argument the root is the current directory", async () => {
    expect((await run([], fixture(CLEAN))).stdout).toContain("check-decks: 1 deck(s) OK");
    const bad = await run([], fixture(BAD));
    expect(bad.exitCode).toBe(1);
    expect(bad.stderr).toContain("1 violation(s) in 1 deck(s)");
  });
});

describe("check-decks table cell and option limits", () => {
  const table = (rows: string) => `<div class="visual"><table class="comp-table">${rows}</table></div>`;
  const header = `<tr><th>Vendor</th><th>Queue is a very long header</th></tr>`;

  test("fails a body cell over the word limit, naming the cell", () => {
    const v = checkDeckHtml(deck(slide(table(`${header}<tr><td>Acme</td><td>one two three four</td></tr>`))), cfg);
    expect(v.map((x) => x.rule)).toEqual(["table-cell-words"]);
    expect(v[0]?.slide).toBe(1);
    expect(v[0]?.message).toContain("one two three four");
  });

  test("allows a cell at the limit and a lone mark", () => {
    expect(rules(deck(slide(table(`${header}<tr><td>Acme</td><td>one two three</td></tr><tr><td>Beta</td><td>✓</td></tr>`))))).toEqual([]);
  });

  test("exempts the first column and the header row", () => {
    expect(rules(deck(slide(table(`${header}<tr><td>Acme Corp Cloud Agents</td><td>ok</td></tr>`))))).toEqual([]);
  });

  test("ignores tables that are not comp-tables", () => {
    expect(rules(deck(slide(`<div class="visual"><table><tr><td>a</td><td>one two three four five</td></tr></table></div>`)))).toEqual([]);
  });

  const grid = (n: number) =>
    `<div class="visual options-grid">${Array.from({ length: n }, (_, i) => `<div class="option"><h3>O${i}</h3></div>`).join("")}</div>`;

  test("fails 5 options but allows 4", () => {
    expect(rules(deck(slide(grid(5))))).toEqual(["option-count"]);
    expect(rules(deck(slide(grid(4))))).toEqual([]);
  });
});
