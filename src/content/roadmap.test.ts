import { ROADMAP_ITEMS, LANES, itemsInLane } from "./roadmap";

describe("roadmap content", () => {
  it("assigns every item to a known lane", () => {
    const laneIds = LANES.map((l) => l.id);
    for (const item of ROADMAP_ITEMS) {
      expect(laneIds).toContain(item.lane);
    }
  });

  it("gives every item a title and a description", () => {
    for (const item of ROADMAP_ITEMS) {
      expect(item.title.trim().length).toBeGreaterThan(0);
      expect(item.description.trim().length).toBeGreaterThan(0);
    }
  });

  it("populates every lane", () => {
    for (const lane of LANES) {
      expect(itemsInLane(lane.id).length).toBeGreaterThan(0);
    }
  });

  it("uses unique titles so React keys are stable", () => {
    const titles = ROADMAP_ITEMS.map((i) => i.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("lists the features the landing page deliberately omits", () => {
    const unshipped = ROADMAP_ITEMS.filter((i) => i.lane !== "shipped")
      .map((i) => i.title.toLowerCase())
      .join(" ");
    expect(unshipped).toContain("anki");
    expect(unshipped).toContain("community");
  });
});
