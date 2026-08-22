function enabled(value: string | undefined): boolean {
  return value === "1" || value?.toLowerCase() === "true";
}

export function proposalClaimVerifierEnabled(): boolean {
  return enabled(process.env.PROPOSAL_CLAIM_VERIFIER_ENABLED);
}

export function candidateAcknowledgementEnabled(): boolean {
  return enabled(process.env.CANDIDATE_ACKNOWLEDGEMENT_ENABLED);
}

export function claimBenchmarkPublicationEnabled(): boolean {
  return enabled(process.env.CLAIM_BENCHMARK_PUBLICATION_ENABLED);
}
