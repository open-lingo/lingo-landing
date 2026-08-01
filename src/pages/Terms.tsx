import { LegalDocumentView } from "@/components/LegalDocumentView";
import { TERMS } from "@/content/legal";
import { LEGAL_LAST_UPDATED } from "@/content/legal/config";

export function Terms() {
  return <LegalDocumentView document={TERMS} lastUpdated={LEGAL_LAST_UPDATED} />;
}
