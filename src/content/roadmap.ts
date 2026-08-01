import type { IconName } from "@/components/ui/Icon";

export type Lane = "shipped" | "in-progress" | "planned";

export type RoadmapItem = {
  lane: Lane;
  title: string;
  description: string;
  tags?: string[];
};

export const LANES: { id: Lane; label: string; icon: IconName }[] = [
  { id: "shipped", label: "Shipped", icon: "circleCheck" },
  { id: "in-progress", label: "In progress", icon: "circleDot" },
  { id: "planned", label: "Planned", icon: "layers" },
];

/**
 * Deliberately undated. The Shipped lane doubles as a changelog and needs
 * updating each release — a stale Shipped lane reads as a dead project.
 *
 * This is also where features live that the landing page may not claim yet.
 */
export const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    lane: "shipped",
    title: "Japanese course",
    description:
      "Hand-authored modules from hiragana through intermediate grammar, with speech practice.",
    tags: ["Courses"],
  },
  {
    lane: "shipped",
    title: "Korean course",
    description: "Hangul, core vocabulary, and the first grammar modules.",
    tags: ["Courses"],
  },
  {
    lane: "shipped",
    title: "FSRS-6 spaced repetition",
    description:
      "Modern scheduling that tracks recognition and recall separately, so a card knows how you actually did.",
    tags: ["Flashcards"],
  },
  {
    lane: "shipped",
    title: "Letter practice",
    description:
      "Animated stroke order and handwriting input with shape verification.",
    tags: ["Practice"],
  },
  {
    lane: "shipped",
    title: "Placement test",
    description:
      "An adaptive test that finds your level and unlocks the right starting module.",
    tags: ["Courses"],
  },
  {
    lane: "shipped",
    title: "Full audio coverage",
    description: "Every sentence in every lesson has recorded audio.",
    tags: ["Practice"],
  },
  {
    lane: "in-progress",
    title: "Anki deck import",
    description:
      "Bring an existing Anki collection across, keeping your review history so cards resume where they were.",
    tags: ["Flashcards"],
  },
  {
    lane: "in-progress",
    title: "Korean conjugation trainer",
    description:
      "Verb and adjective conjugation drills matching the Japanese trainer.",
    tags: ["Practice"],
  },
  {
    lane: "in-progress",
    title: "Mobile app",
    description: "A native app sharing the same courses and review schedule.",
    tags: ["Platform"],
  },
  {
    lane: "planned",
    title: "Community decks",
    description:
      "Publish your own decks, browse other learners', and fork the ones you like.",
    tags: ["Community"],
  },
  {
    lane: "planned",
    title: "Friends and profiles",
    description: "Follow other learners, compare progress, and study together.",
    tags: ["Community"],
  },
  {
    lane: "planned",
    title: "Graded stories",
    description:
      "Short readers at your level with synced audio and tap-to-translate.",
    tags: ["Practice"],
  },
  {
    lane: "planned",
    title: "More languages",
    description:
      "Spanish is live and early. Mandarin, French, and German are queued behind it.",
    tags: ["Courses"],
  },
];

export function itemsInLane(lane: Lane): RoadmapItem[] {
  return ROADMAP_ITEMS.filter((item) => item.lane === lane);
}
