import { PRIVACY, TERMS, ABOUT } from "./index";
import { LEGAL_LAST_UPDATED, privacyContactHref } from "./config";

describe("legal documents", () => {
  it.each([PRIVACY, TERMS, ABOUT])(
    "$id has a title, summary, and sections",
    (doc) => {
      expect(doc.title.length).toBeGreaterThan(0);
      expect(doc.summary.length).toBeGreaterThan(0);
      expect(doc.sections.length).toBeGreaterThan(0);
    },
  );

  it.each([PRIVACY, TERMS, ABOUT])("$id gives every section prose", (doc) => {
    for (const section of doc.sections) {
      expect(section.id).toMatch(/^[a-z0-9-]+$/);
      expect(section.title.length).toBeGreaterThan(0);
      expect(section.paragraphs.length).toBeGreaterThan(0);
    }
  });

  it("uses unique section ids within a document", () => {
    for (const doc of [PRIVACY, TERMS, ABOUT]) {
      const ids = doc.sections.map((s) => s.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("exposes an ISO last-updated date", () => {
    expect(LEGAL_LAST_UPDATED).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("always produces a working privacy contact route", () => {
    expect(privacyContactHref()).toMatch(/^(mailto:|https:\/\/github\.com\/)/);
  });
});
