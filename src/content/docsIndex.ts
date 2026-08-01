export type Doc = {
  slug: string;
  title: string;
  description: string;
  order: number;
  body: string;
};

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
      order: Number(data.order ?? 999),
      body,
    };
  })
  .sort((a, b) => a.order - b.order);

export function getDoc(slug: string): Doc | undefined {
  return DOCS.find((doc) => doc.slug === slug);
}
