/**
 * Emit public/sitemap.xml and public/robots.txt before the Vite build.
 *
 * Both are derived from VITE_SITE_ORIGIN and from the docs directory itself,
 * so a domain change is a variable change and a new doc page is picked up by
 * adding the markdown file — nothing to remember to update by hand.
 *
 * Run automatically by `npm run build`.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const DOCS_DIR = path.join(ROOT, "src/content/docs");

const origin = (process.env.VITE_SITE_ORIGIN || "").replace(/\/+$/, "");
if (!origin) {
  console.error(
    "generate-seo-files: VITE_SITE_ORIGIN is not set.\n" +
      "  Local:  cp .env.example .env\n" +
      "  CI:     set the repo variable (see .github/workflows/deploy.yml)",
  );
  process.exit(1);
}

/** Read a doc's frontmatter title + description for the llms.txt index. */
function docMeta(slug) {
  const raw = fs.readFileSync(path.join(DOCS_DIR, `${slug}.md`), "utf8");
  const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
  const out = {};
  if (fm) {
    for (const line of fm[1].split(/\r?\n/)) {
      const i = line.indexOf(":");
      if (i !== -1) out[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  return { title: out.title || slug, description: out.description || "" };
}

/** Frontmatter `order` doubles as a rough priority hint within the docs tree. */
function docSlugs() {
  if (!fs.existsSync(DOCS_DIR)) return [];
  return fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .sort();
}

// changefreq/priority are hints, not promises. The landing page is the entry
// point, docs change most often, legal almost never.
const routes = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/roadmap", changefreq: "weekly", priority: "0.8" },
  { loc: "/docs", changefreq: "weekly", priority: "0.7" },
  ...docSlugs().map((slug) => ({
    loc: `/docs/${slug}`,
    changefreq: "monthly",
    priority: "0.6",
  })),
  { loc: "/about", changefreq: "monthly", priority: "0.5" },
  { loc: "/privacy", changefreq: "yearly", priority: "0.3" },
  { loc: "/terms", changefreq: "yearly", priority: "0.3" },
];

const lastmod = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${origin}${r.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

// The app origin is deliberately not linked here — it is an authed product
// surface with nothing worth indexing, and it serves its own robots.txt.
const robots = `# ${origin}
User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;

// llms.txt — the llmstxt.org convention: a Markdown file an LLM can read to
// understand the site. Needs an H1 and links, which is exactly the docs tree
// we already have, so it is generated rather than hand-kept.
const llms = `# Open Lingo

> Free, open-source language learning: structured courses, FSRS-6 spaced
> repetition, and handwriting practice for Korean, Japanese and Spanish.
> MIT licensed; the repositories are the same code running in production.

Open Lingo is a web app. This site is the marketing and documentation surface;
the app itself lives on a separate origin and requires an account for progress
to persist or sync across devices.

## Docs

${docSlugs()
  .map((slug) => {
    const { title, description } = docMeta(slug);
    return `- [${title}](${origin}/docs/${slug}): ${description}`;
  })
  .join("\n")}

## Product

- [Roadmap](${origin}/roadmap): What has shipped, what is being built, and what is queued. No dates.
- [About](${origin}/about): What the project is and how it is funded.

## Legal

- [Privacy Policy](${origin}/privacy): What is stored, why, and how to delete it.
- [Terms of Service](${origin}/terms): Terms governing use of the app.

## Source

- [Web app](https://github.com/open-lingo/lingo): React SPA, MIT licensed.
- [Backend](https://github.com/open-lingo/lingo-core): FastAPI service, MIT licensed.
- [This site](https://github.com/open-lingo/lingo-landing): MIT licensed.
`;

fs.mkdirSync(PUBLIC, { recursive: true });
fs.writeFileSync(path.join(PUBLIC, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(PUBLIC, "robots.txt"), robots);
fs.writeFileSync(path.join(PUBLIC, "llms.txt"), llms);
console.log(
  `generate-seo-files: ${routes.length} urls -> sitemap.xml, robots.txt, llms.txt (${origin})`,
);
