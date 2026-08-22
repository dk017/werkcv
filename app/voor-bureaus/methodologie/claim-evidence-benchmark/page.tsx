import type { Metadata } from "next";
import ClaimEvidenceMethodology from "@/components/agency/ClaimEvidenceMethodology";
const url = "https://werkcv.nl/voor-bureaus/methodologie/claim-evidence-benchmark";
export const metadata: Metadata = { title: "Claim–Evidence Benchmark-methodologie | WerkCV", description: "Open methodologie, publicatiepoorten en reviewstatus voor de WerkCV kandidaatvoorstel-claimchecker.", alternates: { canonical: url, languages: { "nl-NL": url, "en": "https://werkcv.nl/en/agency/methodology/claim-evidence-benchmark" } } };
export default function Page() { return <ClaimEvidenceMethodology locale="nl" />; }
