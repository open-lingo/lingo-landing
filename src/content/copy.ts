import type { IconName } from "@/components/ui/Icon";

/** Korean, Japanese, Spanish — mirrors the app's AVAILABLE_LEARNING_LANGUAGE_IDS. */
export const SUPPORTED_LANGUAGE_COUNT = 3;

export type GridItem = {
  icon: IconName;
  title: string;
  description: string;
};

export type HeroPhrase = {
  lang: string;
  langLabel: string;
  words: { text: string; reading?: string }[];
  meaning: string;
};

/**
 * The hero sentence, per language. Each is a real, grammatical sentence a
 * learner reaches early — not a slogan translated word-for-word, which is what
 * makes most language-app marketing read as fake to anyone who speaks one.
 *
 * Spanish carries no reading row on purpose: it does not need romanisation,
 * and pretending otherwise would misrepresent the writing system.
 */
export const HERO_PHRASES: readonly HeroPhrase[] = [
  {
    lang: "ja",
    langLabel: "Japanese",
    words: [
      { text: "日本語", reading: "nihongo" },
      { text: "が", reading: "ga" },
      { text: "読める", reading: "yomeru" },
    ],
    meaning: "I can read Japanese.",
  },
  {
    lang: "ko",
    langLabel: "Korean",
    words: [
      { text: "한국어", reading: "hangugeo" },
      { text: "를", reading: "reul" },
      { text: "읽어요", reading: "ilgeoyo" },
    ],
    meaning: "I read Korean.",
  },
  {
    lang: "es",
    langLabel: "Spanish",
    words: [{ text: "Puedo" }, { text: "leer" }, { text: "español" }],
    meaning: "I can read Spanish.",
  },
] as const;

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
    eyebrow: "Free · Open source · No account needed to start",
    lead: "Right now you need the small grey text.",
    leadAccent: "Give it three weeks.",
    subtitle:
      "Structured courses, spaced repetition that actually tracks what you forget, and handwriting practice — in an app whose source you can read.",
    primaryCta: "Try a lesson",
    secondaryCta: "Create account",
    meta: "No card, no signup to try, no ads on lessons",
  },

  why: {
    eyebrow: "The pitch",
    title: "Built for learners, not for metrics",
    subtitle:
      "Four decisions that shaped the product. Each one costs us an engagement number.",
    items: [
      {
        icon: "flame",
        title: "No streak guilt",
        description:
          "Miss a day and nothing burns down. Five-minute lessons with real coverage beat a fake daily obligation you resent by week three.",
      },
      {
        icon: "bookText",
        title: "Written by hand",
        description:
          "Every module is authored and sequenced deliberately, following research on how a language is best introduced — not generated from a frequency list and shipped.",
      },
      {
        icon: "layers",
        title: "Scheduling that admits what you forgot",
        description:
          "FSRS-6 predicts when a word is about to slip and shows it then. No infinite drilling of things you already know.",
      },
      {
        icon: "github",
        title: "You can read the source",
        description:
          "MIT licensed, top to bottom. Inspect it, change it, run it on your own machine. If we ever get it wrong, you are not locked in.",
      },
    ] satisfies GridItem[],
  },

  features: {
    eyebrow: "What is in the app",
    title: "One app, no plugins",
    subtitle: "Everything below ships today.",
    items: [
      {
        icon: "graduationCap",
        title: "Structured courses",
        description:
          "Hand-authored modules with speech recognition, so pronunciation is corrected while you learn it rather than after.",
      },
      {
        icon: "bookOpen",
        title: "Flashcards that adapt",
        description:
          "Audio and images, with recognition and recall tracked as separate skills — because knowing a word on sight is not the same as producing it.",
      },
      {
        icon: "pencil",
        title: "Letter practice",
        description:
          "Animated stroke order, then handwriting checked on the strokes you drew, not just the final shape. Hiragana, Katakana, Hangul.",
      },
      {
        icon: "layers",
        title: "Grammar drills",
        description:
          "Particles and conjugation as quick targeted exercises, surfaced at the moment they matter instead of buried in a reference PDF.",
      },
    ] satisfies GridItem[],
  },

  demo: {
    eyebrow: "Inside a session",
    title: "Have a go",
    description:
      "Three real steps from the Japanese course, running on this page. Answer them — nothing is being recorded.",
    // Truthful count: `lingo/src/features/lesson/types.ts` defines 27 step types.
    more: "27 step types in the app · these are three",
  },

  open: {
    eyebrow: "Open by default",
    title: "Built in the open. Free forever.",
    description:
      "Every feature ships under the MIT license, and the repository is the same code running in production. Self-host it if you would rather.",
    repoCta: "Read the source",
  },

  closing: {
    title: "Three weeks from now",
    subtitle:
      "That sentence at the top stops needing its annotation. Start with one lesson — no account required.",
    roadmapPrompt: "Want to see what is coming next?",
    roadmapCta: "Read the roadmap",
  },
} as const;
