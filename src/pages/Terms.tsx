import { LegalDocumentView } from "@/components/LegalDocumentView";
import { TERMS } from "@/content/legal";
import { LEGAL_LAST_UPDATED } from "@/content/legal/config";
import { useSeo } from "@/useSeo";

export function Terms() {
  useSeo({ title: "Terms of Service", description: "The terms that govern use of Open Lingo.", path: "/terms" });
  return <LegalDocumentView document={TERMS} lastUpdated={LEGAL_LAST_UPDATED} />;
}
