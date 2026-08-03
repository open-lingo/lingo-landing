import {
  DOCS,
  DOC_ORDER,
  DOC_SECTIONS,
  extractHeadings,
  getDoc,
  getNeighbours,
  headingId,
  parseFrontmatter,
  searchDocs,
} from "./docsIndex";

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

describe("headingId", () => {
  it("slugifies a heading", () => {
    expect(headingId("The four ratings")).toBe("the-four-ratings");
  });

  it("drops punctuation so anchors stay URL-safe", () => {
    expect(headingId("Is it free?")).toBe("is-it-free");
  });
});

describe("extractHeadings", () => {
  it("collects ## headings in document order", () => {
    const body = "intro\n\n## First\ntext\n\n## Second\n";
    expect(extractHeadings(body)).toEqual([
      { id: "first", text: "First" },
      { id: "second", text: "Second" },
    ]);
  });

  it("ignores ### and #", () => {
    expect(extractHeadings("# Title\n### Deep\n")).toEqual([]);
  });

  it("gives every shipped doc at least one heading", () => {
    for (const doc of DOCS) {
      expect(doc.headings.length).toBeGreaterThan(0);
    }
  });
});

describe("DOC_SECTIONS", () => {
  it("groups every doc into a section", () => {
    const grouped = DOC_SECTIONS.flatMap((s) => s.docs);
    expect(grouped).toHaveLength(DOCS.length);
  });

  it("puts Start here first and Help last", () => {
    const titles = DOC_SECTIONS.map((s) => s.title);
    expect(titles[0]).toBe("Start here");
    expect(titles[titles.length - 1]).toBe("Help");
  });

  it("orders docs within a section by their order field", () => {
    for (const section of DOC_SECTIONS) {
      const orders = section.docs.map((d) => d.order);
      expect([...orders].sort((a, b) => a - b)).toEqual(orders);
    }
  });
});

describe("getNeighbours", () => {
  it("walks the tree in reading order", () => {
    const first = DOC_ORDER[0];
    const second = DOC_ORDER[1];
    expect(getNeighbours(first.slug).prev).toBeUndefined();
    expect(getNeighbours(first.slug).next?.slug).toBe(second.slug);
    expect(getNeighbours(second.slug).prev?.slug).toBe(first.slug);
  });

  it("has no next on the last page", () => {
    expect(getNeighbours(DOC_ORDER[DOC_ORDER.length - 1].slug).next).toBeUndefined();
  });

  it("returns nothing for an unknown slug", () => {
    expect(getNeighbours("nope")).toEqual({});
  });
});

describe("searchDocs", () => {
  it("ignores queries shorter than two characters", () => {
    expect(searchDocs("a")).toEqual([]);
  });

  it("ranks a title match above a body mention", () => {
    const hits = searchDocs("flashcards");
    expect(hits[0].doc.slug).toBe("flashcards");
  });

  it("finds a doc by a heading", () => {
    const hits = searchDocs("four ratings");
    expect(hits[0].doc.slug).toBe("flashcards");
    expect(hits[0].context).toMatch(/four ratings/i);
  });

  it("finds a doc by body text and quotes the surrounding sentence", () => {
    const hits = searchDocs("stroke order");
    expect(hits.map((h) => h.doc.slug)).toContain("letter-practice");
  });

  it("returns nothing for a term the docs do not mention", () => {
    expect(searchDocs("kubernetes")).toEqual([]);
  });

  it("respects the result limit", () => {
    expect(searchDocs("the", 3).length).toBeLessThanOrEqual(3);
  });
});
