import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { calculateClaimEvidenceMetrics, type BenchmarkPrediction } from "./claim-evidence-metrics";
import { loadPrivateClaimEvidenceHoldout } from "./claim-evidence-holdout";
import {
  publicClaimEvidenceBenchmarkV1,
  publicClaimEvidenceBenchmarkV1Checksum,
  type ClaimEvidenceBenchmarkCaseV1,
} from "./claim-evidence-public-v1";

export const benchmarkRunCount = 3;
const runs = [1, 2, 3] as const;

type PreparedCase = ClaimEvidenceBenchmarkCaseV1 & {
  parsedText: string;
  sourceMap: import("../agency-matchpack-source").MatchPackSourceMapV1 | null;
};

function sha256(value: string | Buffer): string {
  return createHash("sha256").update(value).digest("hex");
}

function argument(name: string): string | undefined {
  const prefix = `--${name}=`;
  return process.argv.find((value) => value.startsWith(prefix))?.slice(prefix.length);
}

function assertHumanReviewGate(): void {
  if (process.env.CLAIM_BENCHMARK_REVIEW_STATUS?.trim().toLowerCase() !== "approved") {
    throw new Error("Independent benchmark review must be approved before performance evaluation.");
  }
  if (!process.env.CLAIM_BENCHMARK_REVIEW_RECORD_VERSION?.trim()) {
    throw new Error("CLAIM_BENCHMARK_REVIEW_RECORD_VERSION is required.");
  }
  if (!process.env.OPENAI_API_KEY?.trim()) throw new Error("OPENAI_API_KEY is required for the benchmark evaluator.");
}

async function prepareCases(cases: ClaimEvidenceBenchmarkCaseV1[]): Promise<PreparedCase[]> {
  const fixtureDirectory = process.env.CLAIM_BENCHMARK_FIXTURE_DIR?.trim();
  const { createMatchPackSource, normalizeMatchPackSourceText } = await import("../agency-matchpack-source");
  const { extractTextFromFileWithPages } = await import("../cv-parser");
  const prepared: PreparedCase[] = [];

  for (const benchmarkCase of cases) {
    if (sha256(benchmarkCase.cvText) !== benchmarkCase.sourceChecksum) {
      throw new Error(`${benchmarkCase.caseId}: labelled source checksum does not resolve.`);
    }
    if (benchmarkCase.proposalText.slice(benchmarkCase.claim.start, benchmarkCase.claim.end) !== benchmarkCase.claim.text) {
      throw new Error(`${benchmarkCase.caseId}: labelled proposal span does not resolve.`);
    }
    if (benchmarkCase.sourceFormat === "text") {
      prepared.push({ ...benchmarkCase, parsedText: normalizeMatchPackSourceText(benchmarkCase.cvText), sourceMap: null });
      continue;
    }
    if (!fixtureDirectory) {
      throw new Error("CLAIM_BENCHMARK_FIXTURE_DIR is required because the benchmark contains PDF and DOCX cases.");
    }
    const fixturePath = path.join(fixtureDirectory, `${benchmarkCase.caseId}.${benchmarkCase.sourceFormat}`);
    let buffer: Buffer;
    try {
      buffer = await readFile(fixturePath);
    } catch {
      throw new Error(`${benchmarkCase.caseId}: required ${benchmarkCase.sourceFormat.toUpperCase()} fixture is missing.`);
    }
    if (buffer.byteLength > 10 * 1024 * 1024) throw new Error(`${benchmarkCase.caseId}: fixture exceeds 10 MB.`);
    const extracted = await extractTextFromFileWithPages(buffer, path.basename(fixturePath), { maxTextChars: 18_000, maxPdfPages: 20 });
    const source = createMatchPackSource(extracted.fileType, extracted.text, extracted.pages);
    if (source.text !== normalizeMatchPackSourceText(benchmarkCase.cvText)) {
      throw new Error(`${benchmarkCase.caseId}: parsed fixture text differs from the independently reviewed source text.`);
    }
    prepared.push({ ...benchmarkCase, parsedText: source.text, sourceMap: source.sourceMap });
  }
  return prepared;
}

function thresholdResult(metrics: ReturnType<typeof calculateClaimEvidenceMetrics>) {
  const localeDelta = Math.abs(metrics.byLocale.nl.macroF1 - metrics.byLocale.en.macroF1);
  const parserFormatsComplete = Object.values(metrics.parserSuccessByFormat).every((value) => value.total > 0 && value.successRate === 1);
  const checks = {
    citationValidity: metrics.citationValidity === 1,
    unsupportedContradictedRecall: metrics.unsupportedContradictedCatchRate >= 0.9,
    supportedSevereFalseAlarm: metrics.supportedFalseAlarmRate <= 0.05,
    macroF1: metrics.macroF1 >= 0.8,
    currentFactConfirmationRecall: metrics.currentFactConfirmationRecall >= 0.9,
    verdictStability: metrics.verdictStability >= 0.95,
    localeDifference: localeDelta <= 0.1,
    parserSuccess: parserFormatsComplete,
  };
  return { passed: Object.values(checks).every(Boolean), checks, dutchEnglishMacroF1Difference: localeDelta };
}

async function main() {
  assertHumanReviewGate();
  const [{ cases: holdoutCases, fileChecksum }, verifier] = await Promise.all([
    loadPrivateClaimEvidenceHoldout(),
    import("../tools/proposal-claim-verifier"),
  ]);
  const allCases = [
    ...await prepareCases(publicClaimEvidenceBenchmarkV1),
    ...await prepareCases(holdoutCases),
  ];
  const predictions: BenchmarkPrediction[] = [];
  let extractionFalsePositiveCount = 0;

  for (const run of runs) {
    for (const benchmarkCase of allCases) {
      const result = await verifier.verifyProposalClaims({
        cvText: benchmarkCase.parsedText,
        proposalText: benchmarkCase.proposalText,
        locale: benchmarkCase.locale,
        sourceMap: benchmarkCase.sourceMap,
        now: new Date("2026-09-01T00:00:00.000Z"),
      });
      const claim = result.claims.find((candidate) => (
        candidate.proposalStart === benchmarkCase.claim.start
        && candidate.proposalEnd === benchmarkCase.claim.end
        && candidate.claim === benchmarkCase.claim.text
      ));
      extractionFalsePositiveCount += result.claims.filter((candidate) => candidate !== claim).length;
      const citationDisplayed = Boolean(claim?.evidence.length);
      const citationValid = !claim?.evidence.length || claim.evidence.every((reference) => (
        reference.sourceDigest === result.sourceDigest
        && benchmarkCase.parsedText.slice(reference.start, reference.end) === reference.snippet
      ));
      predictions.push({
        caseId: benchmarkCase.caseId,
        expected: benchmarkCase.claim.expectedVerdict,
        predicted: claim?.verdict || "not_checkable",
        claimExtracted: Boolean(claim),
        citationDisplayed,
        citationValid,
        parserSucceeded: true,
        run,
        locale: benchmarkCase.locale,
        sourceFormat: benchmarkCase.sourceFormat,
        errorCategory: benchmarkCase.claim.errorCategory,
      });
    }
  }

  const metrics = calculateClaimEvidenceMetrics(predictions, { extractionFalsePositiveCount, bootstrapIterations: 2_000, bootstrapSeed: 20260901 });
  const publicMetrics = calculateClaimEvidenceMetrics(predictions.filter((row) => !row.caseId.includes("-holdout-")), { bootstrapIterations: 2_000, bootstrapSeed: 20260902 });
  const holdoutMetrics = calculateClaimEvidenceMetrics(predictions.filter((row) => row.caseId.includes("-holdout-")), { bootstrapIterations: 2_000, bootstrapSeed: 20260903 });
  const threshold = thresholdResult(metrics);
  const representativeFailures = predictions
    .filter((row) => !row.claimExtracted || row.expected !== row.predicted || !row.citationValid)
    .slice(0, 40)
    .map(({ caseId, run, expected, predicted, claimExtracted, citationValid, errorCategory }) => ({ caseId, run, expected, predicted, claimExtracted, citationValid, errorCategory }));
  const reportBody = {
    benchmarkVersion: "1.0.0",
    evaluatedAt: new Date().toISOString(),
    applicationCommit: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
    publicCorpusChecksum: publicClaimEvidenceBenchmarkV1Checksum,
    privateHoldoutChecksum: fileChecksum,
    reviewRecordVersion: process.env.CLAIM_BENCHMARK_REVIEW_RECORD_VERSION,
    caseCount: allCases.length,
    runsPerCase: benchmarkRunCount,
    predictionCount: predictions.length,
    pinnedRuntime: {
      verifierVersion: verifier.PROPOSAL_CLAIM_VERIFIER_VERSION,
      promptVersion: verifier.PROPOSAL_CLAIM_PROMPT_VERSION,
      model: verifier.PROPOSAL_CLAIM_MODEL,
      temperature: 0,
      parserContract: "extractTextFromFileWithPages/createMatchPackSource",
    },
    threshold,
    metrics,
    publicMetrics,
    holdoutMetrics,
    representativeFailures,
    limitations: [
      "This evaluates source support, not objective candidate truth, identity or suitability.",
      "Aggregate output must not be published until the independent review record and release gate are complete.",
    ],
  };
  const report = { ...reportBody, evaluationPayloadChecksum: sha256(JSON.stringify(reportBody)) };
  const output = `${JSON.stringify(report, null, 2)}\n`;
  const outputPath = argument("output");
  if (outputPath) {
    const resolved = path.resolve(outputPath);
    await mkdir(path.dirname(resolved), { recursive: true });
    await writeFile(resolved, output, "utf8");
  }
  process.stdout.write(output);
  if (!threshold.passed) process.exitCode = 2;
}

main().catch((error) => {
  console.error("claim_evidence_benchmark_failed", error instanceof Error ? error.message : "unknown_error");
  process.exitCode = 1;
});
