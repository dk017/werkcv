import type { Metadata } from "next";
import ClaimEvidenceMethodology from "@/components/agency/ClaimEvidenceMethodology";
const url = "https://werkcv.nl/en/agency/methodology/claim-evidence-benchmark";
export const metadata: Metadata = { title: "Claim–Evidence Benchmark methodology | WerkCV", description: "Open methodology, publication thresholds and review status for the WerkCV candidate-proposal claim verifier.", alternates: { canonical: url, languages: { "nl-NL": "https://werkcv.nl/voor-bureaus/methodologie/claim-evidence-benchmark", "en": url } } };
export default function Page() { return <ClaimEvidenceMethodology locale="en" />; }
