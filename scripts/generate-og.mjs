/**
 * Render the Open Graph / Twitter card image (1200x630) to public/og-image.png.
 *
 * Rendered through a real browser rather than composed in an image library so
 * it uses the actual webfonts and brand tokens — an OG card drawn with
 * whatever font happened to be on the build machine is how brand drift starts.
 *
 * The subject is the site's signature: a sentence in the target script with
 * its reading annotated above, which is the one thing about this product that
 * is legible at a glance in a Slack unfurl.
 *
 * Run: node scripts/generate-og.mjs
 */
import { chromium } from "@playwright/test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const OUT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../public/og-image.png",
);

const HTML = `<!doctype html>
<html><head><meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&family=Noto+Sans+JP:wght@700&display=swap" rel="stylesheet" />
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:1200px; height:630px; display:flex; flex-direction:column;
    justify-content:center; align-items:center;
    background:#f5f0e6; color:#3d3a35;
    font-family:"Instrument Sans", sans-serif;
    position:relative; overflow:hidden;
  }
  /* Same soft accent wash the hero uses. */
  .wash { position:absolute; top:-160px; left:50%; transform:translateX(-50%);
          width:900px; height:520px; border-radius:9999px;
          background:#f0e0d6; filter:blur(80px); }
  .inner { position:relative; display:flex; flex-direction:column; align-items:center; }
  .phrase { display:flex; gap:40px; align-items:flex-end; }
  .w { display:flex; flex-direction:column; align-items:center; }
  .reading { font-family:"IBM Plex Mono", monospace; font-size:22px; font-weight:500;
             color:#9c2c2c; opacity:.75; margin-bottom:10px; letter-spacing:.02em; }
  .word { font-family:"Noto Sans JP", sans-serif; font-size:104px; font-weight:700; line-height:1; }
  .meaning { margin-top:30px; font-size:30px; font-weight:500; color:#5c5750; }
  .rule { width:120px; height:3px; background:#9c2c2c; opacity:.35; margin:44px 0 34px; }
  .brand { display:flex; align-items:center; gap:16px; }
  .tile { width:60px; height:60px; border-radius:14px; background:#9c2c2c; color:#fff;
          display:grid; place-items:center; font-size:34px; font-weight:700; }
  .name { font-size:40px; font-weight:700; letter-spacing:-.01em; }
  .tag { margin-top:14px; font-family:"IBM Plex Mono", monospace; font-size:19px;
         text-transform:uppercase; letter-spacing:.14em; color:#6d6860; }
</style></head>
<body>
  <div class="wash"></div>
  <div class="inner">
    <div class="phrase">
      <div class="w"><div class="reading">nihongo</div><div class="word">日本語</div></div>
      <div class="w"><div class="reading">ga</div><div class="word">が</div></div>
      <div class="w"><div class="reading">yomeru</div><div class="word">読める</div></div>
    </div>
    <div class="meaning">&ldquo;I can read Japanese.&rdquo;</div>
    <div class="rule"></div>
    <div class="brand">
      <div class="tile">O</div>
      <div class="name">Open Lingo</div>
    </div>
    <div class="tag">Free &middot; Open source &middot; No account to start</div>
  </div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.setContent(HTML, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(600);
await page.screenshot({ path: OUT });
await browser.close();
console.log(`wrote ${OUT}`);
