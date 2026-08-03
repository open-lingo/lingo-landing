import { COPY, HERO_PHRASES, SUPPORTED_LANGUAGE_COUNT } from "./copy";

function allStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(allStrings);
  }
  return [];
}

describe("landing copy", () => {
  const text = allStrings(COPY).join(" ").toLowerCase();

  it("states the real number of supported languages", () => {
    expect(SUPPORTED_LANGUAGE_COUNT).toBe(3);
  });

  it("offers one hero phrase per supported language", () => {
    expect(HERO_PHRASES).toHaveLength(SUPPORTED_LANGUAGE_COUNT);
  });

  it("gives every hero phrase words and a meaning", () => {
    for (const phrase of HERO_PHRASES) {
      expect(phrase.words.length).toBeGreaterThan(0);
      expect(phrase.meaning.trim().length).toBeGreaterThan(0);
      for (const word of phrase.words) {
        expect(word.text.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("annotates the non-Latin scripts with readings", () => {
    for (const phrase of HERO_PHRASES.filter((p) => p.lang !== "es")) {
      expect(phrase.words.every((w) => w.reading)).toBe(true);
    }
  });

  it.each([
    "community deck",
    "leaderboard",
    "friends",
    "share yours",
    "anki",
    "stories with audio",
    // Retired 2026-08-03: you can try a lesson signed out, but an account is
    // required for progress to persist or sync, so "no account needed" oversold it.
    "no account",
    "no signup",
  ])("does not advertise %s, which does not ship today", (claim) => {
    expect(text).not.toContain(claim);
  });

  it("still makes the open-source pitch", () => {
    expect(text).toContain("open source");
  });
});
