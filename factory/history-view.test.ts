import { describe, expect, test } from "bun:test";
import type { AuditEntry } from "./audit-log";
import { buildHistory, parseOutcomeFilter, renderHistoryHtml } from "./history-view";

const entry = (n: number, over: Partial<AuditEntry> = {}): AuditEntry => ({
  at: `2026-11-11T10:${String(n).padStart(2, "0")}:00Z`,
  action: "dev-task",
  target: `task-${n}`,
  title: `title ${n}`,
  outcome: "success",
  durationMs: 1000,
  ...over,
});

const failure = (n: number, over: Partial<AuditEntry> = {}): AuditEntry =>
  entry(n, { outcome: "failure", reason: `reason ${n}`, ...over });
const skip = (n: number, over: Partial<AuditEntry> = {}): AuditEntry =>
  entry(n, { outcome: "skip", reason: `skipped ${n}`, ...over });

describe("parseOutcomeFilter", () => {
  test("accepts the three outcomes", () => {
    expect(parseOutcomeFilter("success")).toBe("success");
    expect(parseOutcomeFilter("failure")).toBe("failure");
    expect(parseOutcomeFilter("skip")).toBe("skip");
  });

  test("returns null for an unknown value, an empty string and undefined", () => {
    expect(parseOutcomeFilter("bogus")).toBeNull();
    expect(parseOutcomeFilter("")).toBeNull();
    expect(parseOutcomeFilter(undefined)).toBeNull();
    expect(parseOutcomeFilter(null)).toBeNull();
  });
});

describe("buildHistory", () => {
  test("orders newest first by at", () => {
    const h = buildHistory([entry(1), entry(3), entry(2)], { outcome: null });
    expect(h.rows.map((r) => r.target)).toEqual(["task-3", "task-2", "task-1"]);
  });

  test("on equal timestamps the later-appended entry comes first", () => {
    const at = "2026-11-11T10:00:00Z";
    const h = buildHistory([entry(1, { at }), entry(2, { at }), entry(3, { at })], { outcome: null });
    expect(h.rows.map((r) => r.target)).toEqual(["task-3", "task-2", "task-1"]);
  });

  test("compares timestamps as instants, not strings", () => {
    const early = entry(1, { at: "2026-11-11T12:00:00+02:00" }); // 10:00Z
    const late = entry(2, { at: "2026-11-11T10:30:00Z" });
    const h = buildHistory([late, early], { outcome: null });
    expect(h.rows.map((r) => r.target)).toEqual(["task-2", "task-1"]);
  });

  test("each outcome filter keeps only that outcome", () => {
    const all = [entry(1), failure(2), skip(3), entry(4), failure(5)];
    expect(buildHistory(all, { outcome: "success" }).rows.map((r) => r.target)).toEqual(["task-4", "task-1"]);
    expect(buildHistory(all, { outcome: "failure" }).rows.map((r) => r.target)).toEqual(["task-5", "task-2"]);
    expect(buildHistory(all, { outcome: "skip" }).rows.map((r) => r.target)).toEqual(["task-3"]);
  });

  test("counts are per outcome over all entries and unchanged by the filter", () => {
    const all = [entry(1), failure(2), skip(3), entry(4), failure(5)];
    const expected = { success: 2, failure: 2, skip: 1 };
    expect(buildHistory(all, { outcome: null }).counts).toEqual(expected);
    expect(buildHistory(all, { outcome: "failure" }).counts).toEqual(expected);
  });

  test("total and shown reflect the filter", () => {
    const all = [entry(1), failure(2), skip(3)];
    const h = buildHistory(all, { outcome: "failure" });
    expect(h.total).toBe(1);
    expect(h.shown).toBe(1);
  });

  test("caps at 100 rows by default and reports total and shown", () => {
    const all = Array.from({ length: 130 }, (_, i) => entry(i % 60, { target: `t-${i}`, at: new Date(Date.UTC(2026, 10, 11, 0, i)).toISOString() }));
    const h = buildHistory(all, { outcome: null });
    expect(h.rows).toHaveLength(100);
    expect(h.shown).toBe(100);
    expect(h.total).toBe(130);
    expect(h.rows[0]?.target).toBe("t-129");
  });

  test("applies the filter before the cap", () => {
    // 5 newest are successes, the only failure is the oldest; a cap of 3 must still show it.
    const all = [failure(1), entry(2), entry(3), entry(4), entry(5), entry(6)];
    const h = buildHistory(all, { outcome: "failure", limit: 3 });
    expect(h.rows.map((r) => r.target)).toEqual(["task-1"]);
    expect(h.total).toBe(1);
  });

  test("an explicit limit caps the rows", () => {
    const h = buildHistory([entry(1), entry(2), entry(3)], { outcome: null, limit: 2 });
    expect(h.rows.map((r) => r.target)).toEqual(["task-3", "task-2"]);
    expect(h.shown).toBe(2);
    expect(h.total).toBe(3);
  });

  test("empty input gives empty history", () => {
    const h = buildHistory([], { outcome: null });
    expect(h).toEqual({ rows: [], total: 0, shown: 0, counts: { success: 0, failure: 0, skip: 0 } });
  });

  test("does not mutate its input", () => {
    const all = [entry(1), entry(2)];
    buildHistory(all, { outcome: null });
    expect(all.map((e) => e.target)).toEqual(["task-1", "task-2"]);
  });
});

describe("renderHistoryHtml", () => {
  const render = (entries: AuditEntry[], outcome: "success" | "failure" | "skip" | null = null, extra: { error?: string; limit?: number } = {}) =>
    renderHistoryHtml(buildHistory(entries, { outcome, limit: extra.limit }), { outcome, error: extra.error });

  test("is a fragment, not a full page", () => {
    const html = render([entry(1)]);
    expect(html).not.toContain("<html");
    expect(html).not.toContain("<!doctype");
    expect(html).not.toContain("<body");
  });

  test("shows time, kind, ref, title, outcome and duration for a row", () => {
    const html = render([entry(1, { action: "review", target: 42, title: "My PR", durationMs: 2500 })]);
    expect(html).toContain("2026-11-11");
    expect(html).toContain("review");
    expect(html).toContain("42");
    expect(html).toContain("My PR");
    expect(html).toContain("success");
    expect(html).toContain("2.5s");
  });

  test("shows the reason for failure and skip but none for success", () => {
    const html = render([entry(1), failure(2, { reason: "boom happened" }), skip(3, { reason: "nothing to do" })]);
    expect(html).toContain("boom happened");
    expect(html).toContain("nothing to do");
    const onlyOk = render([entry(1)]);
    expect(onlyOk).not.toContain("reason");
  });

  test("escapes HTML-special characters in titles and reasons", () => {
    const html = render([failure(1, { title: `<b>"x" & 'y'</b>`, reason: `<img src=x onerror=alert(1)>` })]);
    expect(html).not.toContain("<b>");
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;b&gt;&quot;x&quot; &amp; &#39;y&#39;&lt;/b&gt;");
    expect(html).toContain("&lt;img src=x onerror=alert(1)&gt;");
  });

  test("escapes the error banner", () => {
    const html = render([entry(1)], null, { error: "<script>bad</script>" });
    expect(html).toContain("&lt;script&gt;bad&lt;/script&gt;");
  });

  test("has no http(s):// references and no <script>", () => {
    const html = render([entry(1), failure(2), skip(3)], "failure", { error: "oops" });
    expect(html).not.toMatch(/https?:\/\//);
    expect(html).not.toContain("<script");
  });

  test("every chip links to ?outcome=<value>, All links without it, anchored to #history", () => {
    const html = render([entry(1)]);
    expect(html).toContain('href="?#history"');
    expect(html).toContain('href="?outcome=success#history"');
    expect(html).toContain('href="?outcome=failure#history"');
    expect(html).toContain('href="?outcome=skip#history"');
  });

  test("each chip shows its count", () => {
    const html = render([entry(1), failure(2), failure(3), skip(4)]);
    expect(html).toMatch(/All[^<]*\(?4\)?/);
    expect(html).toMatch(/Success[^<]*\(?1\)?/);
    expect(html).toMatch(/Failure[^<]*\(?2\)?/);
    expect(html).toMatch(/Skip[^<]*\(?1\)?/);
  });

  test("the active chip is marked, and only it", () => {
    const marked = (html: string) => html.match(/class="chip[^"]*active[^"]*"/g) ?? [];
    expect(marked(render([entry(1)], null))).toHaveLength(1);
    const failing = render([entry(1), failure(2)], "failure");
    expect(marked(failing)).toHaveLength(1);
    expect(failing).toMatch(/class="chip[^"]*active[^"]*"[^>]*href="\?outcome=failure#history"/);
    expect(failing).toContain('aria-current="true"');
  });

  test("shows 'showing N of M' only when capped", () => {
    const entries = [entry(1), entry(2), entry(3)];
    expect(render(entries, null, { limit: 2 })).toContain("showing 2 of 3");
    expect(render(entries)).not.toContain("showing");
  });

  test("shows an empty state and no table when there is nothing to show", () => {
    const html = render([]);
    expect(html).toContain("No runs");
    expect(html).not.toContain("<table");
  });

  test("shows an empty state for a filter with no matches", () => {
    const html = render([entry(1)], "failure");
    expect(html).toContain("No runs");
    expect(html).not.toContain("<table");
  });

  test("shows a banner when error is set and none otherwise", () => {
    expect(render([entry(1)], null, { error: "disk gone" })).toContain("disk gone");
    expect(render([entry(1)])).not.toContain("banner-error");
  });

  test("keeps the id the chips anchor to", () => {
    expect(render([entry(1)])).toContain('id="history"');
  });
});

describe("renderHistoryHtml links", () => {
  const URL7 = "https://github.com/acme/widgets/pull/7";
  const prEntry = (over: Partial<AuditEntry> = {}) =>
    entry(1, { action: "review", target: 7, repo: "acme/widgets", url: URL7, ...over });
  const render = (entries: AuditEntry[]) =>
    renderHistoryHtml(buildHistory(entries, { outcome: null }), { outcome: null });

  test("a review row with a url links to the PR in a new tab", () => {
    const html = render([prEntry()]);
    expect(html).toContain(`<a href="${URL7}" target="_blank" rel="noopener noreferrer"`);
    expect(html).toContain("acme/widgets#7</a>");
    expect(html).toContain('title="acme/widgets"');
  });

  test("a patch row with a url links too", () => {
    expect(render([prEntry({ action: "patch" })])).toContain(`<a href="${URL7}"`);
  });

  test("a PR row without a url renders plain text", () => {
    const html = render([prEntry({ repo: undefined, url: undefined })]);
    expect(html).not.toContain('target="_blank"');
    expect(html).toContain("<code>7</code>");
  });

  test("a dev-task row never renders a link, even with a url", () => {
    const html = render([entry(1, { repo: "acme/widgets", url: URL7 })]);
    expect(html).not.toContain('target="_blank"');
    expect(html).not.toContain(URL7);
    expect(html).toContain("task-1");
  });

  test("a javascript: or http: url is plain text, not an anchor", () => {
    for (const url of ["javascript:alert(1)", "http://github.com/acme/widgets/pull/7"]) {
      const html = render([prEntry({ url })]);
      expect(html).not.toContain('target="_blank"');
      expect(html).not.toContain('href="javascript');
      expect(html).not.toContain('href="http:');
      expect(html).toContain("<code>7</code>");
    }
  });

  test("the href is HTML-escaped", () => {
    const html = render([prEntry({ url: `https://github.com/a/b/pull/7?x="><script>alert(1)</script>&y=1` })]);
    expect(html).not.toContain("<script>alert");
    expect(html).toContain("&quot;&gt;&lt;script&gt;");
    expect(html).toContain("&amp;y=1");
  });
});
