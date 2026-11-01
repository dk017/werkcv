// Two quick reads of a job advert for someone who needs a sponsored job: the advertised salary against the IND
// threshold, and whether the advert asks for Dutch. Local text checks, no AI, so both are shown as "likely", never as
// a certainty. Bundled into the Chrome extension.

export type SalaryPeriod = "month" | "year" | "hour" | "unknown";

export type AdvertisedSalary = {
  min: number;
  max: number;
  period: SalaryPeriod;
  /** The text the amount was read from, for the tooltip. */
  text: string;
};

const MONTH = /\b(?:per\s+maand|p\/?m\b|p\.m\.|\/\s?(?:maand|month|mo|mnd)\b|per\s+month|a\s+month|monthly|maandsalaris|maandelijks|bruto\s+per\s+maand|mnd\b)/i;
const YEAR = /\b(?:per\s+jaar|p\/?j\b|\/\s?(?:jaar|year|yr|y)\b|per\s+(?:year|annum)|a\s+year|annual(?:ly)?|yearly|jaarsalaris|jaarlijks|per\s+jr)\b/i;
const HOUR = /\b(?:per\s+uur|p\/?u\b|\/\s?(?:uur|hour|hr|h)\b|per\s+hour|an\s+hour|hourly|uurloon|uurtarief)\b/i;

const AMOUNT = String.raw`(\d{1,3}(?:[.,\s]\d{3})+(?:[.,]\d{1,2})?|\d+(?:[.,]\d{1,2})?)\s?([kK])?`;
const SALARY = new RegExp(
  String.raw`(?:€|\beur(?:o)?\b)\s?${AMOUNT}(?:\s*(?:\/\s?[a-z]+)?\s*(?:-|–|—|tot|to|and|en)\s*(?:€|\beur(?:o)?\b)?\s?${AMOUNT})?`,
  "gi",
);

/** "4.500", "4,500", "4.500,00", "60K", "4 500" as a number of euros. */
export function parseAmount(value: string, thousands?: string) {
  const compact = value.replace(/\s/g, "");
  let number: number;
  if (/^\d{1,3}(?:[.,]\d{3})+(?:[.,]\d{1,2})?$/.test(compact)) {
    const decimals = /[.,]\d{1,2}$/.exec(compact);
    const whole = decimals ? compact.slice(0, -decimals[0].length) : compact;
    number = Number(whole.replace(/[.,]/g, "")) + (decimals ? Number(`0.${decimals[0].slice(1)}`) : 0);
  } else {
    number = Number(compact.replace(",", "."));
  }
  return thousands ? number * 1000 : number;
}

function periodNear(text: string, start: number, end: number): SalaryPeriod {
  const after = text.slice(end, end + 40);
  const before = text.slice(Math.max(0, start - 40), start);
  const inside = text.slice(start, end);
  for (const part of [inside, after, before]) {
    if (HOUR.test(part)) return "hour";
    if (MONTH.test(part)) return "month";
    if (YEAR.test(part)) return "year";
  }
  return "unknown";
}

/**
 * The first salary in euros the advert states, with its period. Without a period word, amounts under 15,000 are read
 * as monthly and higher ones as yearly, as Dutch adverts write them. Amounts under 10 euros are ignored.
 */
export function parseAdvertisedSalary(text: string): AdvertisedSalary | null {
  for (const match of text.matchAll(SALARY)) {
    const first = parseAmount(match[1], match[2]);
    const second = match[3] ? parseAmount(match[3], match[4] ?? match[2]) : first;
    if (!Number.isFinite(first) || first < 10) continue;
    let min = Math.min(first, second);
    let max = Math.max(first, second);
    // "€60 - 80K": the K on the second amount applies to both.
    if (!match[2] && match[4] && min < 1000 && max >= 1000) min *= 1000;
    if (min > max) [min, max] = [max, min];
    let period = periodNear(text, match.index ?? 0, (match.index ?? 0) + match[0].length);
    if (period === "unknown") period = max < 200 ? "hour" : max < 15000 ? "month" : "year";
    return { min, max, period, text: match[0].trim() };
  }
  return null;
}

export type SalaryVerdict = {
  /** "above" when the whole range meets the threshold, "below" when none of it does, "range" when it spans it. */
  verdict: "above" | "below" | "range" | "unclear";
  threshold: number;
  /** Monthly gross excluding holiday allowance, as far as the advert lets us work it out. */
  monthlyMin: number | null;
  monthlyMax: number | null;
  /** A yearly figure may or may not include the 8% holiday allowance; the verdict holds either way unless "unclear". */
  yearly: boolean;
};

/** Compares an advertised salary with one IND threshold. Hourly rates are "unclear": hours per week are not known. */
export function compareSalary(salary: AdvertisedSalary, threshold: number): SalaryVerdict {
  if (salary.period === "hour" || salary.period === "unknown") {
    return { verdict: "unclear", threshold, monthlyMin: null, monthlyMax: null, yearly: false };
  }
  const yearly = salary.period === "year";
  // A yearly amount divided by 12 if it excludes holiday allowance, by 12.96 if it includes it.
  const low = yearly ? salary.min / 12.96 : salary.min;
  const high = yearly ? salary.max / 12 : salary.max;
  const monthlyMin = Math.round(yearly ? salary.min / 12 : salary.min);
  const monthlyMax = Math.round(yearly ? salary.max / 12 : salary.max);
  const verdict = low >= threshold ? "above" : high < threshold ? "below" : salary.min === salary.max ? "unclear" : "range";
  return { verdict, threshold, monthlyMin, monthlyMax, yearly };
}

export type DutchRequirement = {
  level: "required" | "plus" | "not_required" | "none_found";
  writtenIn: "nl" | "en" | "unknown";
  /** The phrase that decided it, when one did. */
  evidence: string | null;
};

const NOT_REQUIRED = [
  /\b(?:no|without)\s+(?:need\s+(?:for|to\s+speak)\s+)?dutch\b(?:\s+(?:required|needed|necessary))?/i,
  /\bdutch\s+(?:is\s+)?not\s+(?:required|necessary|needed|a\s+(?:must|requirement))\b/i,
  /\b(?:you\s+)?(?:don'?t|do\s+not)\s+(?:need\s+to\s+)?(?:speak|know)\s+dutch\b/i,
  /\bnederlands\s+(?:is\s+)?niet\s+(?:vereist|verplicht|nodig|noodzakelijk)\b/i,
];
const PLUS = [
  /\bdutch\s+(?:language\s+)?(?:skills\s+)?(?:is|are|would\s+be)?\s*(?:a\s+)?(?:plus|bonus|nice[\s-]to[\s-]have|advantage|benefit|preferred)\b/i,
  /\b(?:knowledge\s+of|speaking)\s+dutch\s+(?:is\s+)?(?:a\s+)?(?:plus|bonus|advantage)\b/i,
  /\bnederlands\s+(?:is\s+)?(?:een\s+)?(?:pr[eé]|pluspunt|voordeel|nice\s+to\s+have)\b/i,
];
const REQUIRED = [
  /\b(?:fluen(?:t|cy)|proficien(?:t|cy)|native|excellent|good|strong|business[\s-]level|full\s+professional)\s+(?:command\s+of\s+|level\s+of\s+|knowledge\s+of\s+)?(?:(?:in|of)\s+)?(?:the\s+)?(?:both\s+)?(?:english\s+(?:and|&)\s+)?dutch\b/i,
  /\bdutch\s+(?:(?:and|&)\s+english\s+)?(?:is\s+|are\s+)?(?:a\s+)?(?:must|required|requirement|mandatory|essential|necessary)\b/i,
  /\bdutch[\s-](?:speaking|speaker)\b/i,
  /\b(?:speak|write)s?\s+(?:fluent\s+)?dutch\b/i,
  /\bvloeiend\s+(?:in\s+)?(?:het\s+)?nederlands\b/i,
  /\bnederlands(?:e\s+taal)?\s+(?:is\s+)?(?:een\s+)?(?:must|vereist|verplicht|noodzakelijk)\b/i,
  /\b(?:uitstekende|goede|perfecte)\s+(?:beheersing\s+van\s+de\s+)?nederlandse\s+taal\b/i,
  /\bbeheersing\s+van\s+de\s+nederlandse\s+taal\b/i,
  /\bje\s+spreekt\s+(?:en\s+schrijft\s+)?(?:vloeiend\s+)?nederlands\b/i,
  /\b(?:nederlandstalig|nl[\s-]?talig)\b/i,
];

const DUTCH_WORDS = new Set(["de", "het", "een", "en", "van", "je", "jij", "wij", "we", "voor", "met", "op", "niet", "ook", "als", "bij", "naar", "wat", "onze", "ons", "zijn", "jouw", "werk", "ervaring", "binnen", "bent", "heb", "hebt"]);
const ENGLISH_WORDS = new Set(["the", "and", "of", "to", "you", "we", "for", "with", "our", "are", "your", "will", "work", "experience", "team", "have", "this", "that", "be"]);

/** Whether the job text is mostly Dutch or English, from common words. */
export function advertLanguage(text: string): DutchRequirement["writtenIn"] {
  let dutch = 0;
  let english = 0;
  for (const word of text.toLowerCase().match(/[a-zà-ÿ']+/g) ?? []) {
    if (DUTCH_WORDS.has(word)) dutch++;
    if (ENGLISH_WORDS.has(word)) english++;
  }
  if (dutch + english < 15) return "unknown";
  return dutch > english * 1.2 ? "nl" : english > dutch * 1.2 ? "en" : "unknown";
}

/** Reads the advert for a Dutch-language requirement. A negation ("Dutch is not required") wins over a requirement. */
export function dutchRequirement(text: string): DutchRequirement {
  const writtenIn = advertLanguage(text);
  const find = (patterns: RegExp[]) => {
    for (const pattern of patterns) {
      const match = pattern.exec(text);
      if (match) return match[0];
    }
    return null;
  };
  const negative = find(NOT_REQUIRED);
  if (negative) return { level: "not_required", writtenIn, evidence: negative };
  const plus = find(PLUS);
  if (plus) return { level: "plus", writtenIn, evidence: plus };
  const required = find(REQUIRED);
  if (required) return { level: "required", writtenIn, evidence: required };
  return { level: "none_found", writtenIn, evidence: null };
}
