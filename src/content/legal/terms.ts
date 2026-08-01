import type { LegalDocument } from "./types";

/**
 * Ported byte-for-byte from the app's legalDocuments.ts. This is the text users
 * agreed to — do not reword, shorten, or "improve" it. Changes here are a legal
 * decision, not an editorial one.
 */
export const TERMS: LegalDocument = {
  id: "terms",
  title: "Terms of Service",
  summary:
    "By using Open Lingo you agree to these terms. The service is provided as-is for language learning; community content is offered by users under open licenses.",
  sections: [
    {
      id: "accept",
      title: "Agreement",
      paragraphs: [
        "These Terms of Service (“Terms”) govern your use of Open Lingo. By creating an account or using the service, you agree to these Terms and our Privacy Policy.",
        "If you do not agree, do not use the service.",
      ],
    },
    {
      id: "service",
      title: "The service",
      paragraphs: [
        "Open Lingo provides language-learning tools including courses, flashcards, stories, and community content. Features may change, be added, or be removed during beta and MVP releases.",
        "We do not guarantee uninterrupted availability. We may suspend access for maintenance, abuse, or legal reasons.",
      ],
    },
    {
      id: "accounts",
      title: "Accounts",
      paragraphs: [
        "You are responsible for activity under your account. Keep your login credentials secure.",
        "You must provide accurate registration information and not impersonate others.",
        "We may suspend or terminate accounts that violate these Terms or harm other users or the service.",
      ],
    },
    {
      id: "content",
      title: "User and community content",
      paragraphs: [
        "You retain rights to content you create. By submitting content to community areas, you grant Open Lingo a license to host, display, and distribute that content as part of the service (including under open-source terms you select when publishing).",
        "Do not upload content that infringes others’ rights, is illegal, harassing, or malware.",
        "We may remove content that violates these Terms or applicable law.",
      ],
    },
    {
      id: "disclaimer",
      title: "Educational disclaimer",
      paragraphs: [
        "Open Lingo is for general language education. It is not professional advice (legal, medical, immigration, etc.). Community decks and courses may contain errors.",
      ],
    },
    {
      id: "ads-premium",
      title: "Ads and future paid features",
      paragraphs: [
        "The free tier may include advertising. Optional paid features may be offered later with separate billing terms.",
        "Advertising is subject to third-party network policies when you consent to advertising cookies.",
      ],
    },
    {
      id: "liability",
      title: "Disclaimer of warranties; limitation of liability",
      paragraphs: [
        "THE SERVICE IS PROVIDED “AS IS” WITHOUT WARRANTIES OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY LAW, OPEN LINGO AND CONTRIBUTORS ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE SERVICE.",
      ],
    },
    {
      id: "opensource",
      title: "Open source",
      paragraphs: [
        "Application source code is available under open-source licenses listed in the repository. Your use of the software is also subject to those licenses where applicable.",
      ],
    },
    {
      id: "law",
      title: "Governing law",
      paragraphs: [
        "These Terms are governed by the laws applicable to the project operators’ principal place of business, without regard to conflict-of-law rules, except where mandatory consumer protections in your country require otherwise.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        "Questions about these Terms can be sent using the same contact method as our Privacy Policy.",
      ],
    },
  ],
};
