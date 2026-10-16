import type { CVData } from "@/lib/cv";
import type { EditorStepId } from "@/lib/editor-steps";
import { formatResumeDateRange, getResumeLanguage } from "@/lib/resume-language";
import { cvDataToCheckText } from "./cv-data-text";
import { hasConsistentDateFormat } from "./date-formats";

/**
 * The CV-check findings as a to-do list in the improve editor. Each failed check gets one action:
 * an automatic fix, a short input, or the editor step where the person changes it themselves.
 * Whether an item is done is decided by re-grading the CV (/api/cv-check/editor-grade), not here.
 */

export type TodoInputField = "linkedIn" | "location" | "phone" | "email";

export type TodoAction =
  | { kind: "auto"; fix: "normalize_dates" }
  | { kind: "input"; field: TodoInputField }
  | { kind: "step"; step: EditorStepId };

const ACTIONS: Record<string, TodoAction> = {
  score_date_format_consistency: { kind: "auto", fix: "normalize_dates" },
  score_linkedin_present: { kind: "input", field: "linkedIn" },
  score_location_present: { kind: "input", field: "location" },
  score_phone_present: { kind: "input", field: "phone" },
  score_email_present: { kind: "input", field: "email" },
  score_no_placeholder_email: { kind: "input", field: "email" },
  score_profile_exists: { kind: "step", step: "profiel" },
  score_profile_length: { kind: "step", step: "profiel" },
  score_profile_years_experience: { kind: "step", step: "profiel" },
  score_profile_buzzwords: { kind: "step", step: "profiel" },
  score_no_first_person: { kind: "step", step: "profiel" },
  content_ai_leftovers: { kind: "step", step: "profiel" },
  score_experience_exists: { kind: "step", step: "werkervaring" },
  score_experience_dates: { kind: "step", step: "werkervaring" },
  score_quantified_achievement: { kind: "step", step: "werkervaring" },
  score_active_verbs: { kind: "step", step: "werkervaring" },
  score_education_present: { kind: "step", step: "opleiding" },
  nl_education_level: { kind: "step", step: "opleiding" },
  score_skills_present: { kind: "step", step: "vaardigheden" },
  nl_language_levels: { kind: "step", step: "vaardigheden" },
  nl_driving_licence: { kind: "step", step: "persoonlijk" },
  nl_no_sensitive_ids: { kind: "step", step: "persoonlijk" },
  nl_vog: { kind: "step", step: "extra" },
  nl_big: { kind: "step", step: "extra" },
};

export function todoActionFor(checkId: string): TodoAction {
  return ACTIONS[checkId] ?? { kind: "step", step: "afronden" };
}

const MONTHS: Record<string, number> = {
  jan: 1, januari: 1, january: 1,
  feb: 2, februari: 2, february: 2,
  mrt: 3, maart: 3, mar: 3, march: 3,
  apr: 4, april: 4,
  mei: 5, may: 5,
  jun: 6, juni: 6, june: 6,
  jul: 7, juli: 7, july: 7,
  aug: 8, augustus: 8, august: 8,
  sep: 9, sept: 9, september: 9,
  okt: 10, oktober: 10, oct: 10, october: 10,
  nov: 11, november: 11,
  dec: 12, december: 12,
};
const SHORT = {
  nl: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};
const ONGOING = /^(heden|nu|tot heden|present|current|now|today)$/i;

/**
 * One date as "aug 2021" (Dutch) or "Aug 2021" (English). Understands month names, "2021-08",
 * "08-2021" and "08/2021"; "heden"/"present" become the CV language's word. Anything else (a year
 * alone, free text) is returned unchanged: months are never invented.
 */
export function normalizeResumeDate(value: string, language: "nl" | "en"): string {
  const trimmed = value.trim().replace(/\s+/g, " ");
  if (!trimmed) return value;
  if (ONGOING.test(trimmed)) return language === "en" ? "present" : "heden";
  const format = (month: number, year: string) => `${SHORT[language][month - 1]} ${year}`;

  const named = trimmed.match(/^([a-z]+)\.?\s+(\d{4})$/i);
  if (named) {
    const month = MONTHS[named[1].toLowerCase()];
    return month ? format(month, named[2]) : value;
  }
  const yearFirst = trimmed.match(/^(\d{4})[-/.](\d{1,2})$/);
  if (yearFirst && Number(yearFirst[2]) >= 1 && Number(yearFirst[2]) <= 12) return format(Number(yearFirst[2]), yearFirst[1]);
  const monthFirst = trimmed.match(/^(\d{1,2})[-/.](\d{4})$/);
  if (monthFirst && Number(monthFirst[1]) >= 1 && Number(monthFirst[1]) <= 12) return format(Number(monthFirst[1]), monthFirst[2]);
  return value;
}

type PeriodSection = "experience" | "education" | "internships" | "sideActivities";
type Period = { start: string; end: string };

function mapCvDates(data: CVData, map: (value: string, language: "nl" | "en") => string): CVData {
  const language = getResumeLanguage(data);
  const period = <T extends Period>(item: T): T => ({ ...item, start: map(item.start, language), end: map(item.end, language) });
  return {
    ...data,
    experience: data.experience.map(period),
    education: data.education.map(period),
    internships: data.internships.map(period),
    sideActivities: data.sideActivities?.map(period),
  };
}

/** Every period on the CV in one date style (experience, education, internships, side activities). */
export function normalizeCvDates(data: CVData): CVData {
  return mapCvDates(data, normalizeResumeDate);
}

const isMonthDate = (value: string, language: "nl" | "en") => {
  const parts = value.trim().split(" ");
  return parts.length === 2 && /^\d{4}$/.test(parts[1]) && SHORT[language].includes(parts[0]);
};
const isYear = (value: string) => /^\d{4}$/.test(value.trim());

/** One date as its year only ("aug 2021" becomes "2021"); "heden" and free text ("zomer 2016") stay. */
export function yearOnlyResumeDate(value: string, language: "nl" | "en"): string {
  const normalized = normalizeResumeDate(value, language);
  return isMonthDate(normalized, language) ? normalized.trim().split(" ")[1] : normalized;
}

/** Every period as years only ("2022 – heden"): the one style a CV with year-only periods supports without inventing months. */
export function yearOnlyCvDates(data: CVData): CVData {
  return mapCvDates(data, yearOnlyResumeDate);
}

export type MissingMonthPeriod = { section: PeriodSection; index: number; label: string; period: string };

/**
 * What the date to-do can do for this CV. "auto": putting the dates in one style makes the check pass.
 * "months": it cannot, because periods with only a year sit next to periods with a month. The person
 * adds the months (`missing`) or, when that passes the check (`yearsOnly`), switches every period to
 * years only. Decided with the check's own detector on the text the grade reads, so it matches the grade.
 * A study listed with years only ("2013 – 2017") is accepted next to work periods with months.
 */
export type DateFix = { kind: "auto" } | { kind: "months"; missing: MissingMonthPeriod[]; yearsOnly: boolean };

/** The date lines of the education section, as the grade finds them under the education heading. */
const educationDateLines = (data: CVData) =>
  data.education.map((item) => formatResumeDateRange(item.start, item.end, data).trim()).filter(Boolean);
const passesDateCheck = (data: CVData) => hasConsistentDateFormat(cvDataToCheckText(data), educationDateLines(data));

export function planDateFix(data: CVData): DateFix {
  const normalized = normalizeCvDates(data);
  if (passesDateCheck(normalized)) return { kind: "auto" };

  const language = getResumeLanguage(data);
  const sections: Array<[PeriodSection, Array<Period & { label: string }>]> = [
    ["experience", normalized.experience.map((item) => ({ ...item, label: item.role || item.company }))],
    ["internships", normalized.internships.map((item) => ({ ...item, label: item.role || item.company }))],
    ["education", normalized.education.map((item) => ({ ...item, label: item.degree || item.school }))],
    ["sideActivities", (normalized.sideActivities ?? []).map((item) => ({ ...item, label: item.title || item.organization }))],
  ];
  const hasMonths = sections.some(([, items]) => items.some((item) => isMonthDate(item.start, language) || isMonthDate(item.end, language)));
  const missing: MissingMonthPeriod[] = [];
  if (hasMonths) {
    for (const [section, items] of sections) {
      items.forEach((item, index) => {
        if (!isYear(item.start) && !isYear(item.end)) return;
        // Years only is fine for a study, unless one side has a month.
        if (section === "education" && !isMonthDate(item.start, language) && !isMonthDate(item.end, language)) return;
        const period = [item.start.trim(), item.end.trim()].filter(Boolean).join(" – ");
        missing.push({ section, index, label: item.label.trim() || period, period });
      });
    }
  }
  return { kind: "months", missing, yearsOnly: passesDateCheck(yearOnlyCvDates(data)) };
}

export function profileWordCount(data: CVData): number {
  return data.personal.summary.trim().split(/\s+/).filter(Boolean).length;
}
