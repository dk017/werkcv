import type { ProposalClaimVerdict } from "@/lib/tools/proposal-claim-verifier-schema";

const classes: ProposalClaimVerdict[] = ["supported", "partially_supported", "unsupported", "contradicted", "confirmation_required", "not_checkable"];

export type BenchmarkPrediction = {
  caseId: string;
  expected: ProposalClaimVerdict;
  predicted: ProposalClaimVerdict;
  citationValid: boolean;
  citationDisplayed?: boolean;
  claimExtracted?: boolean;
  parserSucceeded?: boolean;
  run?: 1 | 2 | 3;
  locale?: "nl" | "en";
  sourceFormat?: "text" | "pdf" | "docx";
  errorCategory?: string;
};

type MetricInterval = { value: number; lower: number; upper: number };

function verdictMetrics(rows: BenchmarkPrediction[]) {
  return Object.fromEntries(classes.map((verdict) => {
    const tp = rows.filter((row) => row.expected === verdict && row.predicted === verdict).length;
    const fp = rows.filter((row) => row.expected !== verdict && row.predicted === verdict).length;
    const fn = rows.filter((row) => row.expected === verdict && row.predicted !== verdict).length;
    const precision = tp + fp ? tp / (tp + fp) : 0;
    const recall = tp + fn ? tp / (tp + fn) : 0;
    return [verdict, { precision, recall, f1: precision + recall ? 2 * precision * recall / (precision + recall) : 0, support: tp + fn }];
  })) as Record<ProposalClaimVerdict, { precision: number; recall: number; f1: number; support: number }>;
}

function macroF1(rows: BenchmarkPrediction[]): number {
  if (!rows.length) return 0;
  return Object.values(verdictMetrics(rows)).reduce((sum, value) => sum + value.f1, 0) / classes.length;
}

function criticalCatch(rows: BenchmarkPrediction[]): number {
  const critical = rows.filter((row) => row.expected === "unsupported" || row.expected === "contradicted");
  return critical.length ? critical.filter((row) => row.predicted === "unsupported" || row.predicted === "contradicted").length / critical.length : 0;
}

function quantile(values: number[], q: number): number {
  const sorted = [...values].sort((a, b) => a - b);
  if (!sorted.length) return 0;
  const position = (sorted.length - 1) * q;
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  return lower === upper ? sorted[lower] : sorted[lower] + (sorted[upper] - sorted[lower]) * (position - lower);
}

function seededRandom(seed = 42): () => number {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 0x1_0000_0000;
  };
}

function bootstrap(rows: BenchmarkPrediction[], metric: (sample: BenchmarkPrediction[]) => number, iterations: number, seed: number): MetricInterval {
  const value = metric(rows);
  if (!rows.length || iterations <= 0) return { value, lower: value, upper: value };
  const random = seededRandom(seed);
  const samples: number[] = [];
  for (let iteration = 0; iteration < iterations; iteration += 1) {
    samples.push(metric(Array.from({ length: rows.length }, () => rows[Math.floor(random() * rows.length)])));
  }
  return { value, lower: quantile(samples, 0.025), upper: quantile(samples, 0.975) };
}

function stability(rows: BenchmarkPrediction[]): number {
  const grouped = new Map<string, ProposalClaimVerdict[]>();
  for (const row of rows) {
    if (!row.run) continue;
    const values = grouped.get(row.caseId) || [];
    values.push(row.predicted);
    grouped.set(row.caseId, values);
  }
  const repeated = [...grouped.values()].filter((values) => values.length >= 2);
  return repeated.length ? repeated.filter((values) => new Set(values).size === 1).length / repeated.length : 0;
}

function compactMetrics(rows: BenchmarkPrediction[]) {
  return { total: rows.length, macroF1: macroF1(rows), unsupportedContradictedCatchRate: criticalCatch(rows) };
}

export function calculateClaimEvidenceMetrics(
  rows: BenchmarkPrediction[],
  options: { extractionFalsePositiveCount?: number; bootstrapIterations?: number; bootstrapSeed?: number } = {},
) {
  const perClass = verdictMetrics(rows);
  const supported = rows.filter((row) => row.expected === "supported");
  const currentFacts = rows.filter((row) => row.expected === "confirmation_required");
  const displayedCitations = rows.filter((row) => row.citationDisplayed !== false);
  const numericalContradictions = rows.filter((row) => row.expected === "contradicted" && /numerical|duration|date|expired/i.test(row.errorCategory || ""));
  const extracted = rows.filter((row) => row.claimExtracted !== false).length;
  const falsePositives = Math.max(0, options.extractionFalsePositiveCount || 0);
  const falseNegatives = rows.length - extracted;
  const iterations = Math.max(0, Math.min(10_000, options.bootstrapIterations ?? 1_000));
  const seed = options.bootstrapSeed ?? 42;

  const byLocale = Object.fromEntries((["nl", "en"] as const).map((locale) => [locale, compactMetrics(rows.filter((row) => row.locale === locale))]));
  const parserSuccessByFormat = Object.fromEntries((["pdf", "docx", "text"] as const).map((format) => {
    const explicitRows = rows.filter((row) => row.sourceFormat === format && row.parserSucceeded !== undefined);
    return [format, { total: explicitRows.length, successRate: explicitRows.length ? explicitRows.filter((row) => row.parserSucceeded).length / explicitRows.length : null }];
  }));

  return {
    total: rows.length,
    claimExtractionPrecision: extracted + falsePositives ? extracted / (extracted + falsePositives) : 0,
    claimExtractionRecall: rows.length ? extracted / (extracted + falseNegatives) : 0,
    macroF1: macroF1(rows),
    citationValidity: displayedCitations.length ? displayedCitations.filter((row) => row.citationValid).length / displayedCitations.length : 1,
    unsupportedContradictedCatchRate: criticalCatch(rows),
    supportedFalseAlarmRate: supported.length ? supported.filter((row) => row.predicted === "unsupported" || row.predicted === "contradicted").length / supported.length : 0,
    numericalContradictionRecall: numericalContradictions.length ? numericalContradictions.filter((row) => row.predicted === "contradicted").length / numericalContradictions.length : 0,
    currentFactConfirmationRecall: currentFacts.length ? currentFacts.filter((row) => row.predicted === "confirmation_required").length / currentFacts.length : 0,
    verdictStability: stability(rows),
    perClass,
    byLocale,
    parserSuccessByFormat,
    confidenceIntervals: {
      macroF1: bootstrap(rows, macroF1, iterations, seed),
      unsupportedContradictedCatchRate: bootstrap(rows, criticalCatch, iterations, seed + 1),
    },
  };
}
