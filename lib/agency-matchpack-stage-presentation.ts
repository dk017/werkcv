import type { ProposalClaimVerificationV1 } from "@/lib/tools/proposal-claim-verifier-schema";

export type MatchPackStageId =
  | "source"
  | "claims"
  | "candidate_facts"
  | "client_copy"
  | "output"
  | "approval";

export type MatchPackStageStatus =
  | "not_started"
  | "action_required"
  | "complete"
  | "locked";

export type MatchPackStagePresentation = {
  id: MatchPackStageId;
  status: MatchPackStageStatus;
  unresolvedCount: number;
  blockingReasonCodes: string[];
  canOpen: boolean;
};

export type MatchPackCandidateReviewState = {
  revisionVersion: number;
  status: string;
  candidateResponse: string | null;
  pendingSuggestionCount: number;
};

export type MatchPackStageInput = {
  isApproved: boolean;
  unsavedStageIds: MatchPackStageId[];
  canApprove: boolean;
  hasQuota: boolean;
  hasSavedSource: boolean;
  currentRevisionVersion: number | null;
  evidenceReviewerStatuses: string[];
  claimVerification: ProposalClaimVerificationV1 | null;
  clientCopy: {
    introduction: string;
    emailSubject: string;
    emailBody: string;
  };
  selectedVariant: string | null;
  approvalChecklistCompleted: number;
  approvalChecklistTotal: number;
  latestCandidateReview: MatchPackCandidateReviewState | null;
  claimVerifierEnabled: boolean;
  candidateAcknowledgementEnabled: boolean;
};

function stage(
  id: MatchPackStageId,
  status: MatchPackStageStatus,
  unresolvedCount = 0,
  blockingReasonCodes: string[] = [],
  canOpen = true,
): MatchPackStagePresentation {
  return { id, status, unresolvedCount, blockingReasonCodes, canOpen };
}

function unresolvedClaimCount(verification: ProposalClaimVerificationV1 | null): number {
  if (!verification?.claims.length) return 1;
  return verification.claims.filter((claim) => {
    if (claim.verdict === "unsupported" || claim.verdict === "contradicted") {
      return claim.reviewer.status !== "corrected" && claim.reviewer.status !== "removed";
    }
    if (claim.verdict === "partially_supported" || claim.verdict === "not_checkable") {
      return !["accepted", "corrected", "removed"].includes(claim.reviewer.status);
    }
    return false;
  }).length;
}

function candidateReviewPresentation(input: MatchPackStageInput): MatchPackStagePresentation {
  const candidateFactsDirty = input.unsavedStageIds.includes("candidate_facts");
  if (!input.candidateAcknowledgementEnabled) {
    return candidateFactsDirty
      ? stage("candidate_facts", "action_required", 1, ["UNSAVED_CANDIDATE_FACTS"])
      : stage("candidate_facts", "complete");
  }

  if (input.unsavedStageIds.length > 0) {
    return stage("candidate_facts", "action_required", 1, ["UNSAVED_CHANGES_INVALIDATE_ACKNOWLEDGEMENT"]);
  }

  const review = input.latestCandidateReview;
  if (!review) return stage("candidate_facts", "action_required", 1, ["CANDIDATE_REVIEW_REQUIRED"]);
  if (review.revisionVersion !== input.currentRevisionVersion) {
    return stage("candidate_facts", "action_required", 1, ["CANDIDATE_REVIEW_STALE"]);
  }
  if (review.candidateResponse === "declined") {
    return stage("candidate_facts", "action_required", 1, ["CANDIDATE_DECLINED"]);
  }
  if (review.pendingSuggestionCount > 0 || review.candidateResponse === "corrections_requested") {
    return stage("candidate_facts", "action_required", Math.max(1, review.pendingSuggestionCount), ["CANDIDATE_CORRECTIONS_PENDING"]);
  }
  if (review.candidateResponse === "confirmed" || review.status === "overridden") {
    return stage("candidate_facts", "complete");
  }
  return stage("candidate_facts", "action_required", 1, ["CANDIDATE_RESPONSE_PENDING"]);
}

export function deriveMatchPackStagePresentation(input: MatchPackStageInput): MatchPackStagePresentation[] {
  const sourceDirty = input.unsavedStageIds.includes("source");
  const legacyEvidenceUnresolved = input.claimVerifierEnabled
    ? 0
    : input.evidenceReviewerStatuses.filter((status) => status === "unreviewed").length;
  const source = !input.hasSavedSource
    ? stage("source", input.canApprove ? "not_started" : "locked", 1, ["SOURCE_NOT_SAVED"])
    : sourceDirty || legacyEvidenceUnresolved
      ? stage("source", "action_required", (sourceDirty ? 1 : 0) + legacyEvidenceUnresolved, [
        ...(sourceDirty ? ["UNSAVED_SOURCE_CHANGES"] : []),
        ...(legacyEvidenceUnresolved ? ["EVIDENCE_REVIEW_REQUIRED"] : []),
      ])
      : stage("source", "complete");

  const stages: MatchPackStagePresentation[] = [source];

  if (input.claimVerifierEnabled) {
    const claimsDirty = input.unsavedStageIds.some((id) => id === "claims" || id === "candidate_facts" || id === "client_copy");
    const evidenceUnresolved = input.evidenceReviewerStatuses.filter((status) => status === "unreviewed").length;
    const claimUnresolved = unresolvedClaimCount(input.claimVerification);
    const unresolved = evidenceUnresolved + claimUnresolved;
    const reasons: string[] = [];
    if (!input.claimVerification) reasons.push("CLAIM_VERIFICATION_REQUIRED");
    if (evidenceUnresolved) reasons.push("EVIDENCE_REVIEW_REQUIRED");
    if (claimUnresolved && input.claimVerification) reasons.push("CLAIM_DISPOSITION_REQUIRED");
    if (claimsDirty) reasons.push("UNSAVED_CHANGES_INVALIDATE_CLAIMS");
    stages.push(stage(
      "claims",
      unresolved || claimsDirty ? "action_required" : "complete",
      unresolved + (claimsDirty ? 1 : 0),
      reasons,
    ));
  }

  stages.push(candidateReviewPresentation(input));

  const missingClientCopy = [input.clientCopy.introduction, input.clientCopy.emailSubject, input.clientCopy.emailBody]
    .filter((value) => !value.trim()).length;
  const clientCopyDirty = input.unsavedStageIds.includes("client_copy");
  stages.push(missingClientCopy || clientCopyDirty
    ? stage("client_copy", "action_required", missingClientCopy + (clientCopyDirty ? 1 : 0), [
      ...(missingClientCopy ? ["CLIENT_COPY_INCOMPLETE"] : []),
      ...(clientCopyDirty ? ["UNSAVED_CLIENT_COPY"] : []),
    ])
    : stage("client_copy", "complete"));

  const outputDirty = input.unsavedStageIds.some((id) => id === "candidate_facts" || id === "client_copy" || id === "output");
  stages.push(input.selectedVariant && !outputDirty
    ? stage("output", "complete")
    : stage("output", "action_required", 1, [outputDirty ? "UNSAVED_OUTPUT_SELECTION" : "OUTPUT_SELECTION_REQUIRED"]));

  const prerequisiteUnresolved = stages.reduce(
    (total, item) => total + (item.status === "complete" ? 0 : Math.max(1, item.unresolvedCount)),
    0,
  );
  const checklistRemaining = Math.max(0, input.approvalChecklistTotal - input.approvalChecklistCompleted);
  const approvalReasons: string[] = [];
  if (prerequisiteUnresolved) approvalReasons.push("PREREQUISITES_UNRESOLVED");
  if (checklistRemaining) approvalReasons.push("APPROVAL_CHECKLIST_INCOMPLETE");
  if (!input.canApprove) approvalReasons.push("ROLE_FORBIDDEN");
  if (!input.hasQuota) approvalReasons.push("AGENCY_QUOTA_REACHED");

  stages.push(input.isApproved
    ? stage("approval", "complete")
    : prerequisiteUnresolved || !input.canApprove || !input.hasQuota
      ? stage("approval", "locked", prerequisiteUnresolved + checklistRemaining, approvalReasons)
      : checklistRemaining
        ? stage("approval", "action_required", checklistRemaining, approvalReasons)
        : stage("approval", "action_required", 1, ["FINAL_APPROVAL_REQUIRED"]));

  if (input.isApproved) {
    return stages.map((item) => item.id === "approval"
      ? item
      : { ...item, status: "locked", blockingReasonCodes: ["MATCHPACK_SNAPSHOT_LOCKED"] });
  }
  return stages;
}
