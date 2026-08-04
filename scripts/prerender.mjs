/**
 * Prerender every route to static HTML after the Vite build.
 *
 * The site is a client-rendered SPA, so a crawler that does not run JS was
 * served `<div id="root"></div>` — 21 bytes, no h1, no headings, no links.
 * That is one root cause behind four separate SEO findings, and it is also why
 * a shared /docs/... link unfurled with the homepage card: social crawlers
 * never execute the useSeo hook.
 *
 * This renders each route in a real browser and writes the resulting DOM to
 * dist/<route>/index.html, so the first byte a crawler receives already
 * contains the content and the route's own title, description, canonical and
 * OG tags. React still boots and takes over on the client.
 *
 * Serving those nested files needs the CloudFront Function in lingo-infra
 * (`cloudfront_function.tf`) to map /roadmap -> /roadmap/index.html; S3 behind
 * OAC has no directory-index behaviour of its own.
 *
 * Run automatically by `npm run build`.
 */
import { chromium } from "@playwright/test";
import { preview } from "vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const DOCS_DIR = path.join(ROOT, "src/content/docs");

function routes() {
  const docs = fs.existsSync(DOCS_DIR)
    ? fs
        .readdirSync(DOCS_DIR)
        .filter((f) => f.endsWith(".md"))
        .map((f) => `/docs/${f.replace(/\.md$/, "")}`)
    : [];
  return ["/", "/roadmap", "/docs", ...docs, "/about", "/privacy", "/terms"];
}

if (!fs.existsSync(path.join(DIST, "index.html"))) {
  console.error("prerender: dist/index.html missing — run the Vite build first.");
  process.exit(1);
}

// `preview` serves dist/ as-is. The dev server would transform source instead,
// so what gets captured has to come from the real build.
const server = await preview({
  root: ROOT,
  preview: { port: 0, strictPort: false },
  logLevel: "error",
});
const addr = server.httpServer.address();
const origin = `http://localhost:${addr.port}`;

const browser = await chromium.launch();
const page = await browser.newPage();

let written = 0;
for (const route of routes()) {
  await page.goto(origin + route, { waitUntil: "networkidle", timeout: 45000 });
  // useSeo runs in an effect; give React a beat to commit title/meta/canonical.
  await page.waitForFunction(() => document.querySelector("h1") !== null, {
    timeout: 15000,
  });
  await page.waitForTimeout(200);

  // The font stylesheet ships as `rel=preload` + an onload that swaps it to
  // `rel=stylesheet`, keeping it off the critical path. By capture time that
  // swap has already run, so serialising the DOM would bake the
  // render-blocking form back into every prerendered page. Put `rel` back
  // before reading the HTML out.
  await page.evaluate(() => {
    const link = document.querySelector(
      'link[as="style"][href*="fonts.googleapis.com"]',
    );
    if (link) link.setAttribute("rel", "preload");
  });

  const html =
    "<!doctype html>\n" + (await page.evaluate(() => document.documentElement.outerHTML));


  const outDir = route === "/" ? DIST : path.join(DIST, route);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html);

  const h1 = await page.evaluate(() => document.querySelector("h1")?.textContent?.trim() ?? "");
  console.log(`  ${route.padEnd(26)} h1="${h1.slice(0, 42)}"`);
  written++;
}

await browser.close();
await server.httpServer.close();
console.log(`prerender: ${written} routes written`);
