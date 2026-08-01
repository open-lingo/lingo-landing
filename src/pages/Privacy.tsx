import { LegalDocumentView } from "@/components/LegalDocumentView";
import { PRIVACY } from "@/content/legal";
import { LEGAL_LAST_UPDATED } from "@/content/legal/config";

export function Privacy() {
  return <LegalDocumentView document={PRIVACY} lastUpdated={LEGAL_LAST_UPDATED} />;
}
