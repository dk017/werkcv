import type { Metadata } from "next";
import ClaimEvidenceMethodology from "@/components/agency/ClaimEvidenceMethodology";
import { getAgencyPublicCapabilities } from "@/lib/agency-public-capabilities";
const url = "https://werkcv.nl/voor-bureaus/methodologie/claim-evidence-benchmark";
const description = getAgencyPublicCapabilities().proposalClaimVerifier
  ? "Open methodologie, publicatiepoorten en reviewstatus voor de WerkCV kandidaatvoorstel-claimchecker."
  : "Open methodologie, publicatiepoorten en reviewstatus voor WerkCV's CV-bewijscontrole; prestatieclaims blijven gesloten tot onafhankelijke review.";
export const metadata: Metadata = { title: "Claim–Evidence Benchmark-methodologie | WerkCV", description, alternates: { canonical: url, languages: { "nl-NL": url, "en": "https://werkcv.nl/en/agency/methodology/claim-evidence-benchmark" } } };
export default function Page() { return <ClaimEvidenceMethodology locale="nl" />; }
