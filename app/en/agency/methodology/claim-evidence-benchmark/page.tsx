import type { Metadata } from "next";
import ClaimEvidenceMethodology from "@/components/agency/ClaimEvidenceMethodology";
import { getAgencyPublicCapabilities } from "@/lib/agency-public-capabilities";
const url = "https://werkcv.nl/en/agency/methodology/claim-evidence-benchmark";
const description = getAgencyPublicCapabilities().proposalClaimVerifier
  ? "Open methodology, publication thresholds and review status for the WerkCV candidate-proposal claim verifier."
  : "Open methodology, publication thresholds and review status for WerkCV's CV evidence check; performance claims remain closed until independent review.";
export const metadata: Metadata = { title: "Claim–Evidence Benchmark methodology | WerkCV", description, alternates: { canonical: url, languages: { "nl-NL": "https://werkcv.nl/voor-bureaus/methodologie/claim-evidence-benchmark", "en": url } } };
export default function Page() { return <ClaimEvidenceMethodology locale="en" />; }
