function enabled(value: string | undefined): boolean {
  return value === "1" || value?.toLowerCase() === "true";
}

export function proposalClaimVerifierEnabled(environment: Record<string, string | undefined> = process.env): boolean {
  return enabled(environment.PROPOSAL_CLAIM_VERIFIER_ENABLED);
}

export function candidateAcknowledgementEnabled(environment: Record<string, string | undefined> = process.env): boolean {
  return enabled(environment.CANDIDATE_ACKNOWLEDGEMENT_ENABLED);
}

export function claimBenchmarkPublicationEnabled(environment: Record<string, string | undefined> = process.env): boolean {
  return enabled(environment.CLAIM_BENCHMARK_PUBLICATION_ENABLED);
}
