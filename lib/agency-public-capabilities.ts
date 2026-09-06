import {
  candidateAcknowledgementEnabled,
  claimBenchmarkPublicationEnabled,
  proposalClaimVerifierEnabled,
} from "@/lib/agency-feature-flags";

/**
 * The public feature contract for MatchPack marketing and discovery surfaces.
 *
 * Keep this deliberately small and server-safe. Product pages must not invent
 * a capability here: static values are backed by the current Agency product
 * contract, while gated values are read from the same flags that control the
 * corresponding product release.
 */
export type AgencyPublicCapabilities = {
  pdfExport: true;
  docxExport: true;
  reusableAgencyTemplates: true;
  teamRoles: true;
  revisionHistory: true;
  csvExchange: true;
  retentionControls: true;
  deletionControls: true;
  proposalClaimVerifier: boolean;
  candidateAcknowledgement: boolean;
  benchmarkPublished: boolean;
  atsIntegration: false;
  clientPortal: false;
  automatedClientSending: false;
};

export function getAgencyPublicCapabilities(
  environment: Record<string, string | undefined> = process.env,
): AgencyPublicCapabilities {
  return {
    pdfExport: true,
    docxExport: true,
    reusableAgencyTemplates: true,
    teamRoles: true,
    revisionHistory: true,
    csvExchange: true,
    retentionControls: true,
    deletionControls: true,
    proposalClaimVerifier: proposalClaimVerifierEnabled(environment),
    candidateAcknowledgement: candidateAcknowledgementEnabled(environment),
    benchmarkPublished: claimBenchmarkPublicationEnabled(environment),
    atsIntegration: false,
    clientPortal: false,
    automatedClientSending: false,
  };
}

/** Runtime contract for server-rendered pages. */
export const agencyPublicCapabilities = getAgencyPublicCapabilities();

export function capabilityLabel(
  capability: keyof AgencyPublicCapabilities,
  environment: Record<string, string | undefined> = process.env,
): "available" | "gated" | "not_available" {
  const value = getAgencyPublicCapabilities(environment)[capability];
  if (value === true) return "available";
  if (capability === "proposalClaimVerifier" || capability === "candidateAcknowledgement" || capability === "benchmarkPublished") {
    return "gated";
  }
  return "not_available";
}
