import { claimBenchmarkPublicationEnabled } from "@/lib/agency-feature-flags";
import { publicClaimEvidenceBenchmarkV1Checksum } from "@/lib/benchmark/claim-evidence-public-v1";

export type ClaimEvidenceReleaseGate = {
  ready: boolean;
  checks: {
    publicationFlag: boolean;
    independentReviewApproved: boolean;
    publicChecksumApproved: boolean;
    privateHoldoutChecksumPresent: boolean;
    reviewerRecordVersionPresent: boolean;
    evaluationPassed: boolean;
    evaluationReportChecksumPresent: boolean;
  };
};

const SHA256_PATTERN = /^[a-f0-9]{64}$/;

export function evaluateClaimEvidenceReleaseGate(environment: NodeJS.ProcessEnv = process.env): ClaimEvidenceReleaseGate {
  const approvedPublicChecksum = environment.CLAIM_BENCHMARK_PUBLIC_SHA256?.trim().toLowerCase() || "";
  const holdoutChecksum = environment.CLAIM_BENCHMARK_HOLDOUT_SHA256?.trim().toLowerCase() || "";
  const checks = {
    publicationFlag: claimBenchmarkPublicationEnabled(environment),
    independentReviewApproved: environment.CLAIM_BENCHMARK_REVIEW_STATUS?.trim().toLowerCase() === "approved",
    publicChecksumApproved: approvedPublicChecksum === publicClaimEvidenceBenchmarkV1Checksum,
    privateHoldoutChecksumPresent: SHA256_PATTERN.test(holdoutChecksum),
    reviewerRecordVersionPresent: Boolean(environment.CLAIM_BENCHMARK_REVIEW_RECORD_VERSION?.trim()),
    evaluationPassed: environment.CLAIM_BENCHMARK_EVALUATION_STATUS?.trim().toLowerCase() === "passed",
    evaluationReportChecksumPresent: SHA256_PATTERN.test(environment.CLAIM_BENCHMARK_EVALUATION_SHA256?.trim().toLowerCase() || ""),
  };
  return { ready: Object.values(checks).every(Boolean), checks };
}

export function claimEvidenceBenchmarkReleaseReady(): boolean {
  return evaluateClaimEvidenceReleaseGate().ready;
}
