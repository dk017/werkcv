import type {
  CvMatchInputMode,
  CvMatchLocale,
  CvVacatureMatchResult,
} from "@/lib/tools/cv-vacature-match";

export const PENDING_CV_MATCH_STORAGE_KEY = "werkcv_pending_cv_match_v1";
export const PENDING_CV_MATCH_TTL_MS = 60 * 60 * 1000;

export type PendingCvMatch = {
  version: 1;
  createdAt: number;
  locale: CvMatchLocale;
  inputMode: CvMatchInputMode;
  cvText: string;
  vacancyText: string;
  result: CvVacatureMatchResult;
};

export function isPendingCvMatch(value: unknown): value is PendingCvMatch {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<PendingCvMatch>;

  return (
    candidate.version === 1 &&
    typeof candidate.createdAt === "number" &&
    (candidate.locale === "nl" || candidate.locale === "en") &&
    (candidate.inputMode === "file" || candidate.inputMode === "text") &&
    typeof candidate.cvText === "string" &&
    candidate.cvText.length >= 120 &&
    typeof candidate.vacancyText === "string" &&
    candidate.vacancyText.length >= 120 &&
    Boolean(candidate.result) &&
    typeof candidate.result?.score === "number" &&
    Array.isArray(candidate.result?.topFixes)
  );
}
