import { proposalClaimVerificationV1Schema, type ProposalClaimVerificationV1 } from "@/lib/tools/proposal-claim-verifier-schema";

export class AgencyClaimGateError extends Error {
  constructor(readonly code: string, message: string) {
    super(message);
    this.name = "AgencyClaimGateError";
  }
}

export function parseStoredClaimVerification(value: unknown): ProposalClaimVerificationV1 | null {
  if (value === null || value === undefined) return null;
  return proposalClaimVerificationV1Schema.parse(value);
}

export function getUnresolvedClaimIssues(value: unknown, options: { candidateConfirmed?: boolean } = {}) {
  const verification = parseStoredClaimVerification(value);
  if (!verification) return [{ id: "missing", verdict: "not_checkable", reason: "claim_verification_missing" }];
  const issues: Array<{ id: string; verdict: string; reason: string }> = [];
  for (const claim of verification.claims) {
    const disposition = claim.reviewer.status;
    if (disposition === "removed" || disposition === "corrected") continue;
    if (claim.verdict === "unsupported" || claim.verdict === "contradicted") {
      issues.push({ id: claim.id, verdict: claim.verdict, reason: "critical_claim_unresolved" });
      continue;
    }
    if (claim.verdict === "confirmation_required") {
      if (disposition !== "candidate_confirmed" && !options.candidateConfirmed) issues.push({ id: claim.id, verdict: claim.verdict, reason: "candidate_confirmation_required" });
      continue;
    }
    if (claim.verdict === "partially_supported" || claim.verdict === "not_checkable") {
      if (disposition !== "accepted") issues.push({ id: claim.id, verdict: claim.verdict, reason: "recruiter_disposition_required" });
    }
  }
  return issues;
}

export function assertClaimsReadyForCandidateReview(value: unknown): ProposalClaimVerificationV1 {
  const verification = parseStoredClaimVerification(value);
  if (!verification) {
    throw new AgencyClaimGateError("CLAIM_VERIFICATION_REQUIRED", "Check the client-facing claims before inviting the candidate.");
  }
  const issues = getUnresolvedClaimIssues(verification).filter((issue) => issue.reason !== "candidate_confirmation_required");
  if (issues.length) {
    throw new AgencyClaimGateError("CLAIM_REVIEW_INCOMPLETE", "Resolve unsupported, contradictory and manually reviewable claims before inviting the candidate.");
  }
  return verification;
}

export function assertClaimsReadyForApproval(value: unknown, candidateConfirmed: boolean): ProposalClaimVerificationV1 {
  const verification = parseStoredClaimVerification(value);
  if (!verification) {
    throw new AgencyClaimGateError("CLAIM_VERIFICATION_REQUIRED", "Check the client-facing claims before approval.");
  }
  const issues = getUnresolvedClaimIssues(verification, { candidateConfirmed });
  if (issues.length) {
    throw new AgencyClaimGateError("CLAIM_REVIEW_INCOMPLETE", "Resolve every claim review before approval.");
  }
  return verification;
}
