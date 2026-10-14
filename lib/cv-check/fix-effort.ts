/**
 * How much work each CV-check finding is once the CV is in WerkCV.
 *
 * - "design": it no longer fails when the same content is graded as a WerkCV CV (text-based PDF,
 *   the template's columns, standard headings, file named after you). Measured per CV by
 *   comparing the original check with /api/cv-check/editor-grade, never assumed.
 * - "quick": a short input or one click (a level, a link, removing a detail).
 * - "write": the person rewrites something themselves (profile, results, wording).
 */

export type FixEffort = "design" | "quick" | "write";

// Checks reused from lib/tools/cv-score.ts carry a "score_" prefix in CV-check results.
const QUICK_CHECKS = new Set([
  "nl_language_levels",
  "nl_optional_personal_details",
  "nl_no_sensitive_ids",
  "nl_driving_licence",
  "nl_vog",
  "nl_big",
  "score_date_format_consistency",
  "score_linkedin_present",
  "score_location_present",
  "score_phone_present",
  "score_email_present",
  "score_no_placeholder_email",
  "score_experience_dates",
]);

/** Checks that failed on the original file but pass on the same content as a WerkCV CV. */
export function resolvedByDesign(originalFailedIds: readonly string[], werkcvFailedIds: readonly string[]): string[] {
  const stillFailing = new Set(werkcvFailedIds);
  return originalFailedIds.filter((id) => !stillFailing.has(id));
}

export function fixEffort(checkId: string, resolved: ReadonlySet<string>): FixEffort {
  if (resolved.has(checkId)) return "design";
  return QUICK_CHECKS.has(checkId) ? "quick" : "write";
}
