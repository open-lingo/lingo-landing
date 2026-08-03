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

fs.mkdirSync(PUBLIC, { recursive: true });
fs.writeFileSync(path.join(PUBLIC, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(PUBLIC, "robots.txt"), robots);
console.log(
  `generate-seo-files: ${routes.length} urls -> sitemap.xml, robots.txt (${origin})`,
);
