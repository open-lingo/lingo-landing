import { LegalDocumentView } from "@/components/LegalDocumentView";
import { ABOUT } from "@/content/legal";
import { useSeo } from "@/useSeo";

export function About() {
  useSeo({ title: "About", description: "A free, open-source language learning app built by learners.", path: "/about" });
  return <LegalDocumentView document={ABOUT} />;
}
