import { test, expect } from "@playwright/test";

test("landing renders and its CTA points at the app origin", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  const cta = page.getByRole("link", { name: /try a lesson/i }).first();
  const href = await cta.getAttribute("href");
  expect(href).toBeTruthy();
  expect(href).not.toMatch(/^\//); // must be absolute — a relative CTA 404s here
});

test("landing does not advertise unshipped features", async ({ page }) => {
  await page.goto("/");
  const body = (await page.locator("body").innerText()).toLowerCase();
  for (const claim of ["community deck", "leaderboard", "anki"]) {
    expect(body).not.toContain(claim);
  }
});

test("roadmap renders all three lanes with items", async ({ page }) => {
  await page.goto("/roadmap");
  for (const lane of ["Shipped", "In progress", "Planned"]) {
    await expect(page.getByRole("heading", { name: lane })).toBeVisible();
  }
  await expect(page.getByText("Anki deck import")).toBeVisible();
});

test("docs index links through to a doc page", async ({ page }) => {
  await page.goto("/docs");
  // Scoped to the index list: the same title also appears in the nav rail.
  await page.getByRole("main").getByRole("link", { name: /flashcards and reviews/i }).first().click();
  await expect(
    page.getByRole("heading", { level: 1, name: /flashcards and reviews/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: /the four ratings/i }),
  ).toBeVisible();
});

test("the docs rail lists every section and marks the open page", async ({ page }) => {
  await page.goto("/docs/flashcards");
  const rail = page.getByRole("navigation", { name: "Docs" });
  for (const section of ["Start here", "Learning", "Help"]) {
    await expect(rail.getByText(section, { exact: true })).toBeVisible();
  }
  await expect(
    rail.getByRole("link", { name: /flashcards and reviews/i }),
  ).toHaveAttribute("aria-current", "page");
});

test("docs search finds a page by its heading", async ({ page }) => {
  await page.goto("/docs");
  await page.getByRole("searchbox", { name: /search docs/i }).fill("four ratings");
  await page.getByRole("button", { name: /flashcards and reviews/i }).first().click();
  await expect(
    page.getByRole("heading", { level: 1, name: /flashcards and reviews/i }),
  ).toBeVisible();
});

test("a doc page offers on-this-page and next links", async ({ page }) => {
  await page.goto("/docs/courses");
  await expect(page.getByRole("navigation", { name: "On this page" })).toBeVisible();
  await page.getByRole("navigation", { name: "Nearby pages" })
    .getByRole("link").last().click();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("legal pages render", async ({ page }) => {
  for (const [path, heading] of [
    ["/privacy", /privacy policy/i],
    ["/terms", /terms/i],
    ["/about", /about/i],
  ] as const) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
  }
});

test("the hero phrase switches language on demand", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("日本語")).toBeVisible();
  await page.getByRole("button", { name: /show korean/i }).click();
  await expect(page.getByText("한국어")).toBeVisible();
});

test("the embedded vocabulary step grades an answer", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /hello \/ good afternoon/i }).click();
  // Anchored to the schedule copy: a bare /correct/i also matches "corrected"
  // in the feature list further down the band.
  await expect(page.getByText(/next review in/i)).toBeVisible();
});

test("the review step grades a card after revealing it", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: /^review$/i }).click();
  await page.getByRole("button", { name: /show answer/i }).click();
  await page.getByRole("button", { name: /^Good\s*5d$/ }).click();
  await expect(page.getByText(/graded good · back in 5d/i)).toBeVisible();
});

test("the build step assembles a sentence", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: /build a sentence/i }).click();
  for (const word of ["わたし", "は", "がくせい", "です"]) {
    await page.getByRole("button", { name: word, exact: true }).first().click();
  }
  await expect(page.getByText(/は marks the topic/i)).toBeVisible();
});

test("content below the fold is reachable without motion", async ({ page }) => {
  // Reveals must fail visible — a reader with reduced motion still gets the page.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /built for learners/i }),
  ).toBeVisible();
  await expect(page.getByText(/no streak guilt/i)).toBeVisible();
});

test("theme toggle switches to dark", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /theme/i }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
});

test("the head carries canonical, OG and structured data", async ({ page }) => {
  await page.goto("/");
  const head = await page.content();
  // Vite substitutes %VITE_*% at build time; a literal left in the output means
  // the origin never got injected and every absolute URL is broken.
  expect(head).not.toContain("%VITE_");

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /^https?:\/\/.+/,
  );
  for (const sel of [
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[property="og:image"]',
    'meta[name="twitter:card"]',
  ]) {
    await expect(page.locator(sel)).toHaveCount(1);
  }

  const ld = await page.locator('script[type="application/ld+json"]').textContent();
  const parsed = JSON.parse(ld ?? "{}");
  expect(parsed["@type"]).toBe("SoftwareApplication");
  expect(parsed.url).toMatch(/^https?:\/\//);
});

test("icons and the manifest are served", async ({ page, request }) => {
  await page.goto("/");
  for (const asset of [
    "/favicon.ico",
    "/favicon-32x32.png",
    "/apple-touch-icon.png",
    "/icon-192.png",
    "/icon-512.png",
    "/icon-maskable-512.png",
    "/og-image.png",
    "/site.webmanifest",
  ]) {
    const res = await request.get(asset);
    expect(res.status(), `${asset} should be served`).toBe(200);
  }
});

test("robots and sitemap list every route", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toMatch(/Sitemap:\s*https?:\/\/.+\/sitemap\.xml/);

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const route of ["/", "/roadmap", "/docs", "/docs/flashcards", "/privacy"]) {
    expect(xml, `sitemap should list ${route}`).toContain(`<loc>`);
  }
  // Every doc page must appear, so a new markdown file cannot be silently
  // left out of the index.
  expect(xml).toContain("/docs/placement-test");
});

test("routes set their own title and canonical", async ({ page }) => {
  await page.goto("/roadmap");
  await expect(page).toHaveTitle(/Roadmap · Open Lingo/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/roadmap$/,
  );

  await page.goto("/docs/flashcards");
  await expect(page).toHaveTitle(/Flashcards and reviews · Open Lingo/);
});
