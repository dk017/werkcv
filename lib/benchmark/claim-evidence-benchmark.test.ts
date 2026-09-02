import assert from "node:assert/strict";
import test from "node:test";
import { publicClaimEvidenceBenchmarkV1 } from "./claim-evidence-public-v1";
import { calculateClaimEvidenceMetrics, type BenchmarkPrediction } from "./claim-evidence-metrics";
import { parsePrivateHoldoutJsonl } from "./claim-evidence-holdout";

test("public benchmark has 60 balanced, resolvable, fictional transparency cases", () => {
  assert.equal(publicClaimEvidenceBenchmarkV1.length, 60);
  assert.equal(publicClaimEvidenceBenchmarkV1.filter((item) => item.locale === "nl").length, 30);
  assert.equal(publicClaimEvidenceBenchmarkV1.filter((item) => item.locale === "en").length, 30);
  assert.ok(new Set(publicClaimEvidenceBenchmarkV1.map((item) => item.occupationalFamily)).size >= 8);
  assert.deepEqual(new Set(publicClaimEvidenceBenchmarkV1.map((item) => item.sourceFormat)), new Set(["text", "pdf", "docx"]));
  assert.equal(new Set(publicClaimEvidenceBenchmarkV1.map((item) => item.caseId)).size, 60);

  const counts = new Map<string, number>();
  for (const item of publicClaimEvidenceBenchmarkV1) {
    counts.set(item.claim.expectedVerdict, (counts.get(item.claim.expectedVerdict) || 0) + 1);
    assert.equal(item.proposalText.slice(item.claim.start, item.claim.end), item.claim.text);
    if (item.claim.acceptedSourceSpan) {
      assert.equal(item.cvText.slice(item.claim.acceptedSourceSpan.start, item.claim.acceptedSourceSpan.end), item.claim.acceptedSourceSpan.text);
    }
    assert.doesNotMatch(item.cvText, /@|\+31|\+44/);
  }
  for (const count of counts.values()) assert.equal(count, 10);
});

test("metric suite reports perfect pinned repeated predictions without hiding denominators", () => {
  const predictions: BenchmarkPrediction[] = publicClaimEvidenceBenchmarkV1.flatMap((item) => ([1, 2, 3] as const).map((run) => ({
    caseId: item.caseId,
    expected: item.claim.expectedVerdict,
    predicted: item.claim.expectedVerdict,
    citationDisplayed: item.claim.acceptedSourceSpan !== null,
    citationValid: true,
    claimExtracted: true,
    parserSucceeded: true,
    run,
    locale: item.locale,
    sourceFormat: item.sourceFormat,
    errorCategory: item.claim.errorCategory,
  })));
  const metrics = calculateClaimEvidenceMetrics(predictions, { bootstrapIterations: 100, bootstrapSeed: 7 });

  assert.equal(metrics.macroF1, 1);
  assert.equal(metrics.citationValidity, 1);
  assert.equal(metrics.unsupportedContradictedCatchRate, 1);
  assert.equal(metrics.supportedFalseAlarmRate, 0);
  assert.equal(metrics.numericalContradictionRecall, 1);
  assert.equal(metrics.currentFactConfirmationRecall, 1);
  assert.equal(metrics.verdictStability, 1);
  assert.equal(metrics.claimExtractionPrecision, 1);
  assert.equal(metrics.claimExtractionRecall, 1);
  assert.equal(metrics.byLocale.nl.total, 90);
  assert.equal(metrics.byLocale.en.total, 90);
  assert.equal(metrics.parserSuccessByFormat.pdf.successRate, 1);
});

test("private holdout parser fails closed when the required 40 cases are absent", () => {
  assert.throws(() => parsePrivateHoldoutJsonl(""), /exactly 40 cases/);
});
