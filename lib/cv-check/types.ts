import type { CvVacatureMatchResult } from "@/lib/tools/cv-vacature-match-schema";
import type { LayoutSignals } from "./layout";
import type { ParsePreview } from "./parse-preview";

/** Bump when checks or weights change; stored with every result and shown on the methodology page. */
export const CV_CHECK_SCORE_VERSION = "2026-10.1";

export type CvCheckLocale = "nl" | "en";

export type CvCheckCategory = "parsing" | "basics" | "content" | "dutch" | "vacancy";

export type CvCheckSeverity = "critical" | "important" | "tip";

/** "info" = neutral note (e.g. optional personal details); it never costs points. */
export type CvCheckStatus = "pass" | "fail" | "info" | "not_applicable";

export type CvCheckItem = {
  id: string;
  category: CvCheckCategory;
  severity: CvCheckSeverity;
  status: CvCheckStatus;
  /** Relative weight inside its category; 0 for info-only checks. */
  weight: number;
  /** 0–1 credit for partially met checks; defaults to 1 for pass and 0 for fail. */
  credit?: number;
  label: string;
  /** Measured value or a short quote from the CV; never invented. */
  evidence: string | null;
  fix: string | null;
};

export type CvCheckCategoryScore = {
  id: Exclude<CvCheckCategory, "vacancy">;
  label: string;
  /** 0–100 within the category. */
  score: number;
  weight: number;
};

export type CvCheckResult = {
  scoreVersion: string;
  locale: CvCheckLocale;
  /** 0–100 overall; with a vacancy this is the vacancy-weighted score. */
  score: number;
  /** Dutch rapportcijfer 1,0–10,0. */
  grade: number;
  gradeBand: "onvoldoende" | "voldoende" | "goed" | "uitstekend";
  /** General CV quality without the vacancy component. */
  generalScore: number;
  generalGrade: number;
  categories: CvCheckCategoryScore[];
  checks: CvCheckItem[];
  topFixes: Array<{ checkId: string; category: CvCheckCategory; title: string; fix: string; evidence: string | null }>;
  vacancy: CvVacatureMatchResult | null;
  layout: LayoutSignals;
  parsePreview: ParsePreview;
  aiStatus: "ok" | "unavailable";
  wordCount: number;
};
