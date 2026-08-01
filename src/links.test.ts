import { appUrl, siteUrl, LINKS } from "./links";

describe("appUrl", () => {
  it("joins a path onto the app origin", () => {
    expect(appUrl("/try")).toBe("http://localhost:5173/try");
  });

  it("normalizes a missing leading slash", () => {
    expect(appUrl("try")).toBe("http://localhost:5173/try");
  });

  it("does not double the slash when the origin has a trailing one", () => {
    expect(appUrl("/try")).not.toContain("//try");
  });
});

describe("siteUrl", () => {
  it("joins a path onto the site origin", () => {
    expect(siteUrl("/roadmap")).toBe("http://localhost:5175/roadmap");
  });
});

describe("LINKS", () => {
  it("points every product CTA at the app origin", () => {
    for (const href of [LINKS.tryFree, LINKS.getStarted, LINKS.signIn]) {
      expect(href.startsWith("http://localhost:5173")).toBe(true);
    }
  });

  it("points the repo link at the GitHub org", () => {
    expect(LINKS.github).toBe("https://github.com/open-lingo/lingo");
  });
});
