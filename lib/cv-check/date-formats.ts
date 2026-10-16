/**
 * The date styles a CV uses, as the CV-check's "datumnotatie is consistent" check counts them. Shared
 * by the grade (lib/tools/cv-score.ts) and the editor's to-do, so the to-do can tell beforehand whether
 * a date fix will make the check pass. No server-only imports: this also runs in the browser.
 */

const DUTCH_MONTHS = [
  "jan", "januari", "feb", "februari", "mrt", "maart", "apr", "april",
  "mei", "jun", "juni", "jul", "juli", "aug", "augustus", "sep", "sept",
  "september", "okt", "oktober", "nov", "november", "dec", "december",
  "present", "heden", "nu",
];

const ENGLISH_MONTHS = [
  "jan", "january", "feb", "february", "mar", "march", "apr", "april",
  "may", "jun", "june", "jul", "july", "aug", "august", "sep", "sept",
  "september", "oct", "october", "nov", "november", "dec", "december",
  "present", "current",
];

const BIRTH_DATE_LINE = /^(?:geboortedatum|geboren|date of birth|birth date|birthdate|born)\b/;
const MONTH_NAME_DATE =new RegExp(`\\b(?:${[...DUTCH_MONTHS, ...ENGLISH_MONTHS].join("|")})\\s+\\d{4}\\b`, "i");

function normalizeForMatching(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\p{L}\p{N}\s/%+.-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export type DateFormat = "month_name" | "year_month" | "month_year_numeric" | "year_only";

/**
 * `educationLines`: the lines of the education section. Dutch CVs often list a study as "2013 - 2017"
 * next to work periods with months, and recruiters accept that, so a year-only period there is not a
 * second style. Lines are matched by text and count, so the same "2013 - 2017" under work still counts.
 */
export function detectDateFormats(lines: string[], educationLines: string[] = []): Set<DateFormat> {
  const formats = new Set<DateFormat>();
  const education = new Map<string, number>();
  for (const line of educationLines) education.set(line, (education.get(line) ?? 0) + 1);

  for (const line of lines) {
    const normalized = normalizeForMatching(line);
    // A birth date ("Geboortedatum: 15 maart 1994") is a date, not a period style.
    if (BIRTH_DATE_LINE.test(normalized)) continue;

    if (MONTH_NAME_DATE.test(normalized)) {
      formats.add("month_name");
      // A numeric date in the same period ("2018-08 - juli 2021") is a second style too.
      if (/\b\d{4}[-/]\d{1,2}\b/.test(normalized)) formats.add("year_month");
      if (/\b\d{1,2}[-/]\d{4}\b/.test(normalized)) formats.add("month_year_numeric");
      continue;
    }

    if (/\b\d{4}[-/]\d{1,2}\b/.test(normalized)) {
      formats.add("year_month");
      continue;
    }

    if (/\b\d{1,2}[-/]\d{4}\b/.test(normalized)) {
      formats.add("month_year_numeric");
      continue;
    }

    // Only a period counts as a date style: a lone year ("Kanjertraining, 2021") is how courses and
    // awards are listed and is not an inconsistency next to "aug 2021 - heden".
    if (/\b\d{4}\s*[-–]\s*(?:\d{4}|heden|nu|present|current)\b/.test(normalized)) {
      const left = education.get(line) ?? 0;
      if (left > 0) {
        education.set(line, left - 1);
        continue;
      }
      formats.add("year_only");
    }
  }

  return formats;
}

/** The check's verdict on a whole CV text, split into lines the way the grade splits it. */
export function hasConsistentDateFormat(text: string, educationLines: string[] = []): boolean {
  const lines = text.replace(/\r\n/g, "\n").split("\n").map((line) => line.trim()).filter(Boolean);
  return detectDateFormats(lines, educationLines).size <= 1;
}
