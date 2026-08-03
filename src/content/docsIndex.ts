export type DocHeading = { id: string; text: string };

export type Doc = {
  slug: string;
  title: string;
  description: string;
  section: string;
  order: number;
  body: string;
  /** `##` headings, in document order — drives the "on this page" rail. */
  headings: DocHeading[];
};

export type DocSection = { title: string; docs: Doc[] };

/**
 * Minimal frontmatter parser — `key: value` pairs between `---` fences.
 * Deliberately not YAML: the docs only need flat string keys, and a real
 * parser is dependency weight this site does not need.
 */
export function parseFrontmatter(raw: string): {
  data: Record<string, string>;
  body: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    data[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { data, body: raw.slice(match[0].length) };
}

/** URL-safe anchor for a heading, matching what the renderer puts on the `<h2>`. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** `##` headings only. `###` is rare here and a two-level rail is noise. */
export function extractHeadings(body: string): DocHeading[] {
  const out: DocHeading[] = [];
  for (const line of body.split(/\r?\n/)) {
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (m) out.push({ id: headingId(m[1]), text: m[1] });
  }
  return out;
}

// Inlined at build time, so there is no runtime fetch. The markdown files are
// the durable artifact — a future static-site generator consumes them as-is.
const FILES = import.meta.glob<string>("./docs/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const DOCS: Doc[] = Object.entries(FILES)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    const slug = path.replace(/^\.\/docs\//, "").replace(/\.md$/, "");
    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      section: data.section ?? "Docs",
      order: Number(data.order ?? 999),
      body,
      headings: extractHeadings(body),
    };
  })
  .sort((a, b) => a.order - b.order);

/**
 * Sidebar order. Fixed rather than alphabetical: a docs nav should read in the
 * order a person needs it, and "Help" belongs last however it is spelled.
 */
const SECTION_ORDER = ["Start here", "Learning", "Help"];

export const DOC_SECTIONS: DocSection[] = (() => {
  const bySection = new Map<string, Doc[]>();
  for (const doc of DOCS) {
    const list = bySection.get(doc.section) ?? [];
    list.push(doc);
    bySection.set(doc.section, list);
  }
  const rank = (name: string) => {
    const i = SECTION_ORDER.indexOf(name);
    return i === -1 ? SECTION_ORDER.length : i;
  };
  return [...bySection.entries()]
    .sort(([a], [b]) => rank(a) - rank(b) || a.localeCompare(b))
    .map(([title, docs]) => ({
      title,
      docs: [...docs].sort((x, y) => x.order - y.order),
    }));
})();

/** Reading order across the whole tree — what prev/next step through. */
export const DOC_ORDER: Doc[] = DOC_SECTIONS.flatMap((s) => s.docs);

export function getDoc(slug: string): Doc | undefined {
  return DOCS.find((doc) => doc.slug === slug);
}

export function getNeighbours(slug: string): { prev?: Doc; next?: Doc } {
  const i = DOC_ORDER.findIndex((d) => d.slug === slug);
  if (i === -1) return {};
  return { prev: DOC_ORDER[i - 1], next: DOC_ORDER[i + 1] };
}

export type SearchHit = {
  doc: Doc;
  /** Where the match landed, for the result line. */
  context: string;
};

/**
 * Substring search over title, description, headings and body.
 *
 * Deliberately not fuzzy and not indexed: the whole corpus is a handful of
 * files already in memory, so a linear scan is instant and a search library
 * would be more code than the thing it searches. Ranked title > heading >
 * description > body so an exact page name wins.
 */
export function searchDocs(query: string, limit = 7): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const scored: { hit: SearchHit; score: number }[] = [];

  for (const doc of DOCS) {
    const title = doc.title.toLowerCase();
    const description = doc.description.toLowerCase();
    const heading = doc.headings.find((h) => h.text.toLowerCase().includes(q));
    const bodyIdx = doc.body.toLowerCase().indexOf(q);

    let score = 0;
    let context = doc.description;

    if (title.includes(q)) {
      score = title.startsWith(q) ? 100 : 80;
    } else if (heading) {
      score = 60;
      context = heading.text;
    } else if (description.includes(q)) {
      score = 40;
    } else if (bodyIdx !== -1) {
      score = 20;
      // A window around the match reads better than the first line of the doc.
      const start = Math.max(0, bodyIdx - 40);
      context =
        (start > 0 ? "…" : "") +
        doc.body.slice(start, bodyIdx + q.length + 60).replace(/\s+/g, " ").trim() +
        "…";
    }

    if (score > 0) scored.push({ hit: { doc, context }, score });
  }

  return scored
    .sort((a, b) => b.score - a.score || a.hit.doc.title.localeCompare(b.hit.doc.title))
    .slice(0, limit)
    .map((s) => s.hit);
}
