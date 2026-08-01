import { COPY, SUPPORTED_LANGUAGE_COUNT } from "./copy";

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

  it.each([
    "community deck",
    "leaderboard",
    "friends",
    "share yours",
    "anki",
    "stories with audio",
  ])("does not advertise %s, which does not ship today", (claim) => {
    expect(text).not.toContain(claim);
  });

  it("still makes the open-source pitch", () => {
    expect(text).toContain("open source");
  });
});
