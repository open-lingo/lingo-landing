import type { LegalDocument } from "./types";

/**
 * Ported from the app, with one deliberate change: the mission paragraph
 * originally read "spaced repetition, structured courses, stories, and
 * community-created decks". Stories and community decks ship dark today, so
 * naming them here would reintroduce exactly the unshipped-feature claim this
 * site exists to remove. They are on the roadmap instead.
 *
 * Unlike privacy.ts and terms.ts, this is a mission statement rather than an
 * agreement, so editing it is an editorial call, not a legal one.
 */
export const ABOUT: LegalDocument = {
  id: "about",
  title: "About Open Lingo",
  summary:
    "A free, open-source language learning app built by learners. We fund hosting through optional ads—not by selling your data.",
  sections: [
    {
      id: "mission",
      title: "Our mission",
      paragraphs: [
        "Open Lingo helps people learn languages with spaced repetition, structured courses, and letter practice.",
        "The project is open source. You can inspect the code, report issues, and contribute on GitHub.",
      ],
    },
    {
      id: "funding",
      title: "How we’re funded",
      paragraphs: [
        "We aim to keep core learning free. Revenue may come from optional advertising (with your consent) and, in the future, optional premium subscriptions that remove ads and support development.",
        "We do not sell personal information.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        "For privacy requests, account issues, or general feedback, reach us via the contact link on our Privacy Policy page or open an issue on GitHub.",
      ],
    },
  ],
};
