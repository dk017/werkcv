// IND salary criteria for the highly skilled migrant (kennismigrant) and EU Blue Card routes: gross per month,
// excluding the 8% holiday allowance. The IND sets new amounts every year on 1 January; add the new year here and
// the salary checker page and the Chrome extension both pick it up.

export type SalaryRoute = "hsm30" | "hsmUnder30" | "reduced" | "blueCard";

export type SalaryThresholds = Record<SalaryRoute, number>;

export const SALARY_THRESHOLDS: Record<string, SalaryThresholds> = {
  "2026": { hsm30: 5942, hsmUnder30: 4357, reduced: 3122, blueCard: 5942 },
};

export const SALARY_ROUTE_LABELS: Record<SalaryRoute, string> = {
  hsm30: "Highly skilled migrant, 30 or over",
  hsmUnder30: "Highly skilled migrant, under 30",
  reduced: "Reduced criterion (recent graduate, orientation year)",
  blueCard: "EU Blue Card",
};

/** The amounts for a date's year, or the latest year known when the IND has not published a newer one yet. */
export function thresholdsFor(date = new Date()): { year: string; amounts: SalaryThresholds } {
  const years = Object.keys(SALARY_THRESHOLDS).sort();
  const year = years.filter((candidate) => Number(candidate) <= date.getFullYear()).pop() ?? years[0];
  return { year, amounts: SALARY_THRESHOLDS[year] };
}
