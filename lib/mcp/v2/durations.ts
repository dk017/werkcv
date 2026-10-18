import { readCvStructure } from "./cv-structure";

/**
 * Job durations computed in code for match_vacancy. The model cannot do date arithmetic reliably
 * (gpt-4o-mini read "June 2021 – present" as 2 years, and as 5 months when given today's date), so the
 * prompt gets the durations and is told to use them for "N years of experience" requirements.
 */

const MONTHS: Record<string, number> = {
  jan: 1, januari: 1, january: 1,
  feb: 2, febr: 2, februari: 2, february: 2,
  mrt: 3, maa: 3, maart: 3, mar: 3, march: 3,
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
const NOW = /^(heden|nu|present|now|current|huidig|today|vandaag)$/i;

type YearMonth = { year: number; month: number | null };

function parsePoint(raw: string): YearMonth | "now" | null {
  const text = raw.trim().replace(/\.$/, "").toLowerCase();
  if (NOW.test(text)) return "now";
  let m = text.match(/^([a-zé]+)\.?\s+(\d{4})$/); // "juni 2021", "Jun. 2021"
  if (m && MONTHS[m[1]]) return { year: Number(m[2]), month: MONTHS[m[1]] };
  m = text.match(/^(\d{1,2})\s*[/-]\s*(\d{4})$/); // "06/2021", "6-2021"
  if (m && Number(m[1]) >= 1 && Number(m[1]) <= 12) return { year: Number(m[2]), month: Number(m[1]) };
  m = text.match(/^(\d{4})\s*[/-]\s*(\d{1,2})$/); // "2021-06"
  if (m && Number(m[2]) >= 1 && Number(m[2]) <= 12) return { year: Number(m[1]), month: Number(m[2]) };
  m = text.match(/^(\d{4})$/);
  if (m) return { year: Number(m[1]), month: null };
  return null;
}

const POINT = String.raw`(?:[A-Za-zé]+\.?\s+\d{4}|\d{1,2}\s*[/-]\s*\d{4}|\d{4}\s*[/-]\s*\d{1,2}|\d{4}|heden|nu|present|now|current|huidig|today|vandaag)`;
const RANGE = new RegExp(String.raw`(${POINT})\s*(?:[–—-]|t/m|tot|to|until)\s*(${POINT})`, "i");

/** Months between the start and end of a date range in `text`, or null when there is no readable range. */
export function rangeMonths(text: string, today: Date): number | null {
  const m = text.match(RANGE);
  if (!m) return null;
  const start = parsePoint(m[1]);
  const end = parsePoint(m[2]);
  if (!start || start === "now" || !end) return null;
  const endYm: YearMonth = end === "now" ? { year: today.getUTCFullYear(), month: today.getUTCMonth() + 1 } : end;
  // Year-only ranges count whole years ("2017 – 2021" = 4 years). Month ranges count both end months, as CVs
  // mean them ("jan 2020 – dec 2020" is a full year).
  const months = start.month === null || endYm.month === null
    ? (endYm.year - start.year) * 12
    : (endYm.year - start.year) * 12 + (endYm.month - start.month) + 1;
  return months >= 0 && months < 12 * 60 ? months : null;
}

export function formatMonths(months: number, locale: "nl" | "en"): string {
  const y = Math.floor(months / 12);
  const mo = months % 12;
  if (locale === "nl") return [y ? `${y} jaar` : "", mo ? `${mo} ${mo === 1 ? "maand" : "maanden"}` : ""].filter(Boolean).join(" en ") || "0 maanden";
  return [y ? `${y} ${y === 1 ? "year" : "years"}` : "", mo ? `${mo} ${mo === 1 ? "month" : "months"}` : ""].filter(Boolean).join(" ") || "0 months";
}

/** One line per job with a readable date range, e.g. "Warehouse Team Lead – PortLink Logistics (June 2021 – present): 5 years 4 months". */
export function jobDurationLines(cvText: string, today: Date, locale: "nl" | "en"): string[] {
  return readCvStructure(cvText).experience
    .map((job) => {
      const months = rangeMonths(job.header, today);
      return months === null ? null : `${job.header.trim()}: ${formatMonths(months, locale)}`;
    })
    .filter((line): line is string => Boolean(line));
}

const NUMBER_WORDS: Record<string, number> = {
  een: 1, één: 1, one: 1, twee: 2, two: 2, drie: 3, three: 3, vier: 4, four: 4, vijf: 5, five: 5,
  zes: 6, six: 6, zeven: 7, seven: 7, acht: 8, eight: 8, tien: 10, ten: 10,
};

/** "3 jaar", "minimaal drie jaar", "at least 3+ years", "5 yrs" -> the number of years asked, or null. */
export function requiredYears(text: string): number | null {
  const m = text.toLowerCase().match(/(\d{1,2}|een|één|one|twee|two|drie|three|vier|four|vijf|five|zes|six|zeven|seven|acht|eight|tien|ten)\s*\+?\s*(?:jaar|jaren|years?|yrs?)\b/);
  if (!m) return null;
  const n = /^\d+$/.test(m[1]) ? Number(m[1]) : NUMBER_WORDS[m[1]];
  return n && n <= 30 ? n : null;
}

const squash = (value: string) => value.toLowerCase().replace(/\s+/g, " ").trim();

/** Months of the job whose header or bullets contain `quote`, or null when the quote is not inside a dated job. */
export function jobMonthsForQuote(cvText: string, quote: string, today: Date): number | null {
  const q = squash(quote);
  if (!q) return null;
  const job = readCvStructure(cvText).experience.find((entry) => squash(entry.header).includes(q) || entry.bullets.some((b) => squash(b).includes(q)));
  return job ? rangeMonths(job.header, today) : null;
}
