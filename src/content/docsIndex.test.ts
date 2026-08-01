import { DOCS, getDoc, parseFrontmatter } from "./docsIndex";

describe("parseFrontmatter", () => {
  it("splits frontmatter from the body", () => {
    const raw = "---\ntitle: Hello\norder: 2\n---\n\n## Body text\n";
    const { data, body } = parseFrontmatter(raw);
    expect(data.title).toBe("Hello");
    expect(data.order).toBe("2");
    expect(body.trim()).toBe("## Body text");
  });

  it("returns the whole input as the body when there is no frontmatter", () => {
    const { data, body } = parseFrontmatter("just text");
    expect(data).toEqual({});
    expect(body).toBe("just text");
  });
});

describe("DOCS", () => {
  it("loads every markdown file in content/docs", () => {
    expect(DOCS.length).toBeGreaterThanOrEqual(5);
  });

  it("gives every doc a slug, title, description, and body", () => {
    for (const doc of DOCS) {
      expect(doc.slug).toMatch(/^[a-z0-9-]+$/);
      expect(doc.title.length).toBeGreaterThan(0);
      expect(doc.description.length).toBeGreaterThan(0);
      expect(doc.body.trim().length).toBeGreaterThan(0);
    }
  });

  it("sorts by the order field", () => {
    const orders = DOCS.map((d) => d.order);
    expect([...orders].sort((a, b) => a - b)).toEqual(orders);
  });

  it("uses unique slugs", () => {
    const slugs = DOCS.map((d) => d.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("getDoc", () => {
  it("finds a doc by slug", () => {
    expect(getDoc("getting-started")?.title).toBe("Getting started");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getDoc("nope")).toBeUndefined();
  });
});
