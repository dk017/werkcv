import type { ProposalClaimVerdict } from "@/lib/tools/proposal-claim-verifier-schema";

export type BenchmarkPrediction = { caseId: string; expected: ProposalClaimVerdict; predicted: ProposalClaimVerdict; citationValid: boolean };

export function calculateClaimEvidenceMetrics(rows: BenchmarkPrediction[]) {
  const classes: ProposalClaimVerdict[] = ["supported", "partially_supported", "unsupported", "contradicted", "confirmation_required", "not_checkable"];
  const perClass = Object.fromEntries(classes.map((verdict) => {
    const tp = rows.filter((row) => row.expected === verdict && row.predicted === verdict).length;
    const fp = rows.filter((row) => row.expected !== verdict && row.predicted === verdict).length;
    const fn = rows.filter((row) => row.expected === verdict && row.predicted !== verdict).length;
    const precision = tp + fp ? tp / (tp + fp) : 0;
    const recall = tp + fn ? tp / (tp + fn) : 0;
    return [verdict, { precision, recall, f1: precision + recall ? 2 * precision * recall / (precision + recall) : 0, support: tp + fn }];
  }));
  const classValues = Object.values(perClass);
  const critical = rows.filter((row) => row.expected === "unsupported" || row.expected === "contradicted");
  const supported = rows.filter((row) => row.expected === "supported");
  const currentFacts = rows.filter((row) => row.expected === "confirmation_required");
  return {
    total: rows.length,
    macroF1: classValues.reduce((sum, value) => sum + value.f1, 0) / classes.length,
    citationValidity: rows.length ? rows.filter((row) => row.citationValid).length / rows.length : 0,
    unsupportedContradictedCatchRate: critical.length ? critical.filter((row) => row.predicted === "unsupported" || row.predicted === "contradicted").length / critical.length : 0,
    supportedFalseAlarmRate: supported.length ? supported.filter((row) => row.predicted === "unsupported" || row.predicted === "contradicted").length / supported.length : 0,
    currentFactConfirmationRecall: currentFacts.length ? currentFacts.filter((row) => row.predicted === "confirmation_required").length / currentFacts.length : 0,
    perClass,
  };
}
