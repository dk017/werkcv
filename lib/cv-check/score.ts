import type { CvCheckCategory, CvCheckCategoryScore, CvCheckItem, CvCheckLocale, CvCheckResult } from "./types";

type ScoredCategory = Exclude<CvCheckCategory, "vacancy">;

/** Category weights (spec §5.3). Without a vacancy the four categories make 100. */
export const GENERAL_WEIGHTS: Record<ScoredCategory, number> = { parsing: 30, basics: 10, content: 35, dutch: 25 };
/** With a vacancy, the match counts 50 and basics fold into the other categories. */
export const VACANCY_WEIGHTS: Record<ScoredCategory | "vacancy", number> = { vacancy: 50, parsing: 15, basics: 0, content: 20, dutch: 15 };

export const CATEGORY_LABELS: Record<ScoredCategory, { nl: string; en: string }> = {
  parsing: { nl: "Leesbaarheid voor systemen", en: "Readable by systems" },
  basics: { nl: "Basis en contact", en: "Basics and contact" },
  content: { nl: "Inhoud en bewijs", en: "Content and evidence" },
  dutch: { nl: "Nederlandse conventies", en: "Dutch conventions" },
};

const SEVERITY_RANK = { critical: 0, important: 1, tip: 2 } as const;

function creditOf(check: CvCheckItem): number {
  if (check.credit !== undefined) return Math.max(0, Math.min(1, check.credit));
  return check.status === "pass" ? 1 : 0;
}

/** 0–100 within a category; categories with nothing scorable count as full marks. */
export function categoryScore(checks: CvCheckItem[], category: ScoredCategory): number {
  const scorable = checks.filter(
    (check) => check.category === category && (check.status === "pass" || check.status === "fail") && check.weight > 0,
  );
  const possible = scorable.reduce((total, check) => total + check.weight, 0);
  if (possible === 0) return 100;
  const earned = scorable.reduce((total, check) => total + check.weight * creditOf(check), 0);
  return Math.round((earned / possible) * 100);
}

/** Dutch rapportcijfer: 0 → 1,0 and 100 → 10,0, one decimal. */
export function toGrade(score: number): number {
  return Math.round((1 + (9 * Math.max(0, Math.min(100, score))) / 100) * 10) / 10;
}

export function gradeBand(grade: number): CvCheckResult["gradeBand"] {
  if (grade < 5.5) return "onvoldoende";
  if (grade < 7) return "voldoende";
  if (grade < 8.5) return "goed";
  return "uitstekend";
}

/** A failed critical check (scanned PDF, BSN on the CV) caps the grade below a pass. */
export const CRITICAL_CAP_SCORE = 49; // toGrade(49) = 5,4

export function computeScores(input: {
  checks: CvCheckItem[];
  vacancyScore: number | null;
  locale: CvCheckLocale;
}): Pick<CvCheckResult, "score" | "grade" | "gradeBand" | "generalScore" | "generalGrade" | "categories"> {
  const { checks, vacancyScore, locale } = input;
  const categoryIds = Object.keys(GENERAL_WEIGHTS) as ScoredCategory[];
  const categories: CvCheckCategoryScore[] = categoryIds.map((id) => ({
    id,
    label: locale === "en" ? CATEGORY_LABELS[id].en : CATEGORY_LABELS[id].nl,
    score: categoryScore(checks, id),
    weight: vacancyScore === null ? GENERAL_WEIGHTS[id] : VACANCY_WEIGHTS[id],
  }));

  const weighted = (weights: Record<string, number>, vacancy: number | null) => {
    const vacancyWeight = vacancy === null ? 0 : weights.vacancy;
    const total = categories.reduce((sum, category) => sum + category.score * weights[category.id], (vacancy ?? 0) * vacancyWeight);
    const weightSum = categories.reduce((sum, category) => sum + weights[category.id], vacancyWeight);
    return Math.round(total / weightSum);
  };

  const hasCriticalFailure = checks.some((check) => check.severity === "critical" && check.status === "fail");
  const cap = (score: number) => (hasCriticalFailure ? Math.min(score, CRITICAL_CAP_SCORE) : score);

  const generalScore = cap(weighted(GENERAL_WEIGHTS, null));
  const score = vacancyScore === null ? generalScore : cap(weighted(VACANCY_WEIGHTS, vacancyScore));

  const grade = toGrade(score);
  return {
    score,
    grade,
    gradeBand: gradeBand(grade),
    generalScore,
    generalGrade: toGrade(generalScore),
    categories,
  };
}

/**
 * Failed checks ordered by severity, then readability first (a scrambled reading order makes other
 * checks fail as a side effect, so fixing it comes first), then by the points they cost.
 */
export function rankFailedChecks(checks: CvCheckItem[]): CvCheckItem[] {
  const readabilityFirst = (check: CvCheckItem) => (check.category === "parsing" ? 0 : 1);
  return checks
    .filter((check) => check.status === "fail" && check.fix)
    .sort(
      (a, b) =>
        SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity] ||
        readabilityFirst(a) - readabilityFirst(b) ||
        b.weight * (1 - creditOf(b)) - a.weight * (1 - creditOf(a)),
    );
}
