// IND public register of recognised sponsors (erkende referenten), work and highly skilled migrants:
// parsing and name search. Pure functions, so the matching rules are tested without network access.
// The register lists two things per organisation: its name and its KvK number. It does not say which
// jobs an employer sponsors, how many people, or since when.
//
// Ported from the UK sponsor checker (OneOffUKCV), adapted to the Dutch register: one static HTML
// table instead of a CSV, KvK numbers, and Dutch legal forms.

export type SponsorEntry = { name: string; kvk: string };

export type SponsorMatch = SponsorEntry & { match: "exact" | "close" };

export type SponsorSearchResult = {
  status: "listed" | "possible" | "not_found";
  matches: SponsorMatch[];
  total: number;
};

export type SponsorRegister = {
  entries: SponsorEntry[];
  /** ISO date (YYYY-MM-DD) the IND says the overview was last updated, when it could be read. */
  registerDate: string | null;
  /** Normalised match keys per entry (legal name plus any trading name), parallel to `entries`. */
  keys: string[][];
};

// Legal-form and geography words that do not distinguish one employer from another. Words such as
// "holding", "group" or "services" are kept, so "Acme" is not an exact match for "Acme Holding B.V.".
const REMOVABLE_SUFFIXES = new Set([
  "bv", "nv", "ua", "cv", "vof", "bvba", "ltd", "limited", "llc", "llp", "inc", "gmbh", "ag", "sa", "sarl", "plc", "co", "corp",
  "nederland", "netherlands", "holland", "the",
]);

const tidy = (value: string) => value.replace(/\s+/g, " ").trim();

/**
 * Lower case, accents removed, dots inside abbreviations dropped ("B.V." and "H.O.D.N." become "bv" and
 * "hodn", while "Booking.com" keeps a word break), "&" as "en", other punctuation as single spaces.
 */
export function normaliseName(value: string) {
  return value
    .toLocaleLowerCase("nl-NL")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/(?<![a-z])([a-z])\.(?=[a-z](?:\.|(?![a-z])))/g, "$1")
    .replace(/&/g, " en ")
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** The distinctive part of a name: legal forms removed from the end and "the" from the start. */
export function coreName(value: string) {
  const words = normaliseName(value).split(" ").filter(Boolean);
  while (words.length > 1 && REMOVABLE_SUFFIXES.has(words[words.length - 1])) words.pop();
  while (words.length > 1 && words[0] === "the") words.shift();
  return words.join(" ");
}

/** Legal name plus any trading name after "h.o.d.n.", "handelend onder de naam", "t/a" or "trading as". */
function nameKeys(name: string) {
  const parts = name
    .split(/\s+(?:-\s*)?(?:h\.?o\.?d\.?n\.?|handelend onder(?: de naam)?|t\/a|trading as)\s+/i)
    .map(tidy)
    .filter(Boolean);
  return Array.from(new Set(parts.map(coreName).filter(Boolean)));
}

/** The register writes quotes around abbreviations twice (""AME""); show one. */
export function tidyDisplayName(value: string) {
  return tidy(value.replace(/"{2,}/g, '"'));
}

/** KvK numbers are eight digits; people type them with spaces or dots. */
export function kvkFromQuery(query: string) {
  const digits = query.replace(/[\s.\-]/g, "");
  return /^\d{8}$/.test(digits) ? digits : null;
}

const DUTCH_MONTHS: Record<string, number> = {
  januari: 1, februari: 2, maart: 3, april: 4, mei: 5, juni: 6, juli: 7, augustus: 8, september: 9, oktober: 10, november: 11, december: 12,
};

/** "Het overzicht is bijgewerkt op 5 oktober 2026." as an ISO date, or null. */
export function registerDateFromText(text: string) {
  const match = /bijgewerkt op\s+(\d{1,2})\s+([a-z]+)\s+(\d{4})/i.exec(text);
  const month = match ? DUTCH_MONTHS[match[2].toLowerCase()] : undefined;
  if (!match || !month) return null;
  return `${match[3]}-${String(month).padStart(2, "0")}-${match[1].padStart(2, "0")}`;
}

function decodeEntities(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)));
}

const cellText = (html: string) => tidy(decodeEntities(html.replace(/<[^>]*>/g, " ")));

/**
 * Reads the register from the IND page. Throws when the table or its header changes, so a redesigned page
 * never silently empties the checker.
 */
export function parseIndRegisterHtml(html: string): SponsorRegister {
  const rows = Array.from(html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi), (row) =>
    Array.from(row[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi), (cell) => cellText(cell[1])),
  ).filter((cells) => cells.length >= 2);

  const header = (rows[0] ?? []).map((cell) => cell.toLocaleLowerCase("nl-NL"));
  if (header[0] !== "organisatie" || header[1] !== "kvk-nummer") {
    throw new Error(`Unexpected register columns: ${header.join(", ")}`);
  }

  const entries: SponsorEntry[] = [];
  const keys: string[][] = [];
  for (const [rawName, rawKvk] of rows.slice(1)) {
    const name = tidyDisplayName(rawName);
    const kvk = rawKvk.replace(/\s/g, "");
    if (!name || !/^\d{8}$/.test(kvk)) continue;
    entries.push({ name, kvk });
    keys.push(nameKeys(name));
  }
  return { entries, registerDate: registerDateFromText(cellText(html)), keys };
}

/**
 * Finds employers by name or KvK number. An exact match on the distinctive part of the name ("Booking.com" finds
 * "Booking.com B.V.") is "listed". Names that start with, or contain every word of, the query are "possible",
 * because the register uses legal names and adverts often use brand names.
 */
export function searchSponsors(register: SponsorRegister, query: string, limit = 10): SponsorSearchResult {
  const clean = query.slice(0, 160);
  const kvk = kvkFromQuery(clean);
  const byLength = (a: number, b: number) =>
    register.entries[a].name.length - register.entries[b].name.length || register.entries[a].name.localeCompare(register.entries[b].name, "nl");

  if (kvk) {
    const found = register.entries.flatMap((entry, index) => (entry.kvk === kvk ? [index] : []));
    return {
      status: found.length ? "listed" : "not_found",
      matches: found.slice(0, limit).map((index) => ({ ...register.entries[index], match: "exact" as const })),
      total: found.length,
    };
  }

  const target = coreName(clean);
  if (target.length < 2) return { status: "not_found", matches: [], total: 0 };
  const words = target.split(" ");

  const exact: number[] = [];
  const prefix: number[] = [];
  const contains: number[] = [];
  register.keys.forEach((keys, index) => {
    if (keys.includes(target)) exact.push(index);
    else if (keys.some((key) => key.startsWith(`${target} `))) prefix.push(index);
    else if (keys.some((key) => words.every((word) => ` ${key} `.includes(` ${word} `)))) contains.push(index);
  });

  const ordered = exact.sort(byLength).concat(prefix.sort(byLength), contains.sort(byLength));
  const exactSet = new Set(exact);
  return {
    status: exact.length ? "listed" : ordered.length ? "possible" : "not_found",
    matches: ordered.slice(0, limit).map((index) => ({ ...register.entries[index], match: exactSet.has(index) ? ("exact" as const) : ("close" as const) })),
    total: ordered.length,
  };
}

/** Entries whose name starts with a letter ("0" for digits and other characters), sorted for a list page. */
export function entriesForLetter(register: SponsorRegister, letter: string): SponsorEntry[] {
  const wanted = letter.toLowerCase();
  return register.entries
    .filter((entry) => {
      const first = normaliseName(entry.name).charAt(0);
      return wanted === "0" ? !/[a-z]/.test(first) : first === wanted;
    })
    .sort((a, b) => normaliseName(a.name).localeCompare(normaliseName(b.name)) || a.kvk.localeCompare(b.kvk));
}

export const LIST_LETTERS = ["0", ..."abcdefghijklmnopqrstuvwxyz"] as const;
