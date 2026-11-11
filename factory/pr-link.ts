// Renders a pull request reference as an HTML link. Shared by the queue and history views.
// Only https URLs become anchors; anything else (including a missing url) is plain text.

const ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export const escapeHtml = (s: string): string => s.replace(/[&<>"']/g, (c) => ESCAPES[c] ?? c);

function isHttps(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "https:" && u.hostname !== "";
  } catch {
    return false;
  }
}

export interface PrLinkInput {
  number: number | string;
  repo?: string;
  url?: string;
  /** Text shown when there is no usable link. */
  plain: string;
}

/** `<a>` to the PR (text `<repo>#<n>` or `#<n>`, repo as tooltip), or the escaped plain text. */
export function renderPrRef({ number, repo, url, plain }: PrLinkInput): string {
  if (url === undefined || !isHttps(url)) return escapeHtml(plain);
  const hasRepo = repo !== undefined && repo !== "";
  const text = `${hasRepo ? repo : ""}#${number}`;
  const title = hasRepo ? ` title="${escapeHtml(repo)}"` : "";
  return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer"${title}>${escapeHtml(text)}</a>`;
}
