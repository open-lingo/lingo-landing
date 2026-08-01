export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocument = {
  id: "privacy" | "terms" | "about";
  title: string;
  summary: string;
  sections: LegalSection[];
};
