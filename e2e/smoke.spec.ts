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
  await page.getByRole("link", { name: /flashcards and reviews/i }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: /flashcards and reviews/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: /the four ratings/i }),
  ).toBeVisible();
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

test("the lesson preview grades an answer", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /hello \/ good afternoon/i }).click();
  // Anchored to the schedule copy: a bare /correct/i also matches "corrected"
  // in the feature list further down the band.
  await expect(page.getByText(/next review in/i)).toBeVisible();
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
