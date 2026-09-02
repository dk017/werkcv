import assert from "node:assert/strict";
import test from "node:test";
import { publicClaimEvidenceBenchmarkV1Checksum } from "./claim-evidence-public-v1";
import { evaluateClaimEvidenceReleaseGate } from "./claim-evidence-release-gate";

const approvedEnvironment = {
  CLAIM_BENCHMARK_PUBLICATION_ENABLED: "true",
  CLAIM_BENCHMARK_REVIEW_STATUS: "approved",
  CLAIM_BENCHMARK_PUBLIC_SHA256: publicClaimEvidenceBenchmarkV1Checksum,
  CLAIM_BENCHMARK_HOLDOUT_SHA256: "a".repeat(64),
  CLAIM_BENCHMARK_REVIEW_RECORD_VERSION: "review-v1",
  CLAIM_BENCHMARK_EVALUATION_STATUS: "passed",
  CLAIM_BENCHMARK_EVALUATION_SHA256: "c".repeat(64),
};

test("benchmark publication requires every independent-review control", () => {
  assert.equal(evaluateClaimEvidenceReleaseGate(approvedEnvironment).ready, true);
  for (const key of Object.keys(approvedEnvironment)) {
    const incomplete = { ...approvedEnvironment, [key]: "" };
    assert.equal(evaluateClaimEvidenceReleaseGate(incomplete).ready, false, `${key} must fail closed`);
  }
});

test("an altered public dataset checksum cannot be published", () => {
  const result = evaluateClaimEvidenceReleaseGate({
    ...approvedEnvironment,
    CLAIM_BENCHMARK_PUBLIC_SHA256: "b".repeat(64),
  });
  assert.equal(result.ready, false);
  assert.equal(result.checks.publicChecksumApproved, false);
});
