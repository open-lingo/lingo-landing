import type { IconName } from "@/components/ui/Icon";

/** Korean, Japanese, Spanish — mirrors the app's AVAILABLE_LEARNING_LANGUAGE_IDS. */
export const SUPPORTED_LANGUAGE_COUNT = 3;

export type GridItem = {
  icon: IconName;
  title: string;
  description: string;
};

/**
 * Every user-visible marketing string. Components import from here rather than
 * inlining prose, so adding i18n later is mechanical.
 *
 * Claims here must be reachable in production. Community decks, social, stories,
 * and Anki import belong in `roadmap.ts` until they actually ship —
 * `copy.test.ts` enforces that.
 */
export const COPY = {
  hero: {
    eyebrow: "Built by learners · 100% open source",
    headlineLead: "Pick a language.",
    headlineAccent: "Start in 60 seconds.",
    subtitle:
      "Structured courses, spaced-repetition flashcards, and letter practice — in a free app you actually own.",
    primaryCta: "Try it free",
    secondaryCta: "Get started",
    meta: "No credit card · No signup to try · Free and open source",
    languages: "Korean, Japanese, and Spanish today — more on the roadmap.",
  },

  why: {
    eyebrow: "Why Open Lingo",
    title: "Built for learners, not metrics",
    subtitle: "Four reasons people stay.",
    items: [
      {
        icon: "flame",
        title: "Honest pace",
        description:
          "Five-minute lessons with real coverage. No streak guilt, no fake gamification.",
      },
      {
        icon: "bookText",
        title: "Real curriculum",
        description:
          "Hand-authored, research-backed sequencing — not an auto-generated word list.",
      },
      {
        icon: "layers",
        title: "Spaced repetition that respects you",
        description:
          "Cards return when you are about to forget, not on a fixed schedule. No infinite drills.",
      },
      {
        icon: "github",
        title: "Yours to fork",
        description:
          "MIT licensed and open source. Read it, change it, self-host it. The app is the source.",
      },
    ] satisfies GridItem[],
  },

  features: {
    eyebrow: "What you get",
    title: "Everything in one app",
    subtitle: "No upsells, no plugins.",
    items: [
      {
        icon: "graduationCap",
        title: "Structured courses",
        description:
          "Hand-authored modules with speech recognition and pronunciation practice.",
      },
      {
        icon: "bookOpen",
        title: "Flashcards that adapt",
        description:
          "FSRS-6 spaced repetition with audio and images, tracking recognition and recall separately.",
      },
      {
        icon: "pencil",
        title: "Letter practice",
        description:
          "Animated stroke order and handwriting with shape verification — Hiragana, Katakana, and Hangul.",
      },
      {
        icon: "layers",
        title: "Grammar drills",
        description:
          "Grammar surfaced as quick, targeted exercises instead of buried in a reference PDF.",
      },
    ] satisfies GridItem[],
  },

  open: {
    eyebrow: "Open by default",
    title: "Built in the open. Free forever.",
    description:
      "Every feature ships under the MIT license. Self-host it if you want to.",
    repoCta: "View on GitHub",
  },

  closing: {
    title: "Ready to start learning?",
    subtitle: "Five minutes a day. Real progress in three weeks.",
    roadmapPrompt: "Curious what is coming next?",
    roadmapCta: "See the roadmap",
  },
} as const;
