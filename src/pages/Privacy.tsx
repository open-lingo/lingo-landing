import { LegalDocumentView } from "@/components/LegalDocumentView";
import { PRIVACY } from "@/content/legal";
import { LEGAL_LAST_UPDATED } from "@/content/legal/config";
import { useSeo } from "@/useSeo";

export function Privacy() {
  useSeo({ title: "Privacy Policy", description: "What Open Lingo stores, why, and how to delete it.", path: "/privacy" });
  return <LegalDocumentView document={PRIVACY} lastUpdated={LEGAL_LAST_UPDATED} />;
}
