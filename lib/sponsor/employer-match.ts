// Matches the employer name shown on a job advert (LinkedIn, Indeed) to the IND register of recognised sponsors.
// Adverts use brand names ("ING", "Foot Locker EMEA", "Royal Den Hartogh Logistics"); the register uses legal names
// ("ING Bank N.V.", "Foot Locker Europe B.V."). Shared by the Chrome extension and the web checker, so both give the
// same answer. Pure functions, no network access.
//
// Three tiers, never a "no": the register holds legal names, and a false "not a sponsor" costs someone an application.
// - sponsor: a curated alias, or a name variant equals a registered name (also once words such as Europe, Holding or
//   Koninklijke are dropped from both sides)
// - likely: a registered name starts with, or contains, the name, or shares its distinctive first word; a related or
//   differently named entity, so the person checks which entity employs them
// - not_found: nothing under this name

import { coreName, kvkFromQuery, registerFromEntries, searchSponsors, type SponsorEntry, type SponsorRegister, type SponsorSearchResult } from "./register";

export type EmployerTier = "sponsor" | "likely" | "not_found";

export type EmployerMatch = {
  tier: EmployerTier;
  /** How the match was made, for the tooltip and the golden-set report. */
  via: "slug_alias" | "name_alias" | "exact" | "loose" | "compact" | "prefix" | "contains" | "first_word" | null;
  /** The matched entries first, then related entries of the same brand (for a sponsor), at most MAX_MATCHES. */
  matches: SponsorEntry[];
  /** How many entries matched (not counting related ones). */
  total: number;
};

/** Brands that the register lists under another legal name, as compiled match keys: "slug:<linkedin slug>" or "name:<core name>". */
export type AliasKeys = Record<string, string[]>;

export type EmployerIndex = {
  register: SponsorRegister;
  aliases: AliasKeys;
  byKey: Map<string, number[]>;
  byLoose: Map<string, number[]>;
  byCompact: Map<string, number[]>;
  byWord: Map<string, number[]>;
  byFirstWord: Map<string, number[]>;
  byKvk: Map<string, number[]>;
};

// Words LinkedIn and Indeed add to a brand that the legal name usually lacks, or puts elsewhere.
const GENERIC_TRAILING = new Set([
  "emea", "europe", "european", "benelux", "nl", "nederland", "netherlands", "holland",
  "group", "groep", "corporation", "corp", "company", "inc", "international", "global", "worldwide", "com",
  // A city after the brand ("AEB Amsterdam", "ECT Rotterdam") is where the job is, not part of the legal name.
  "amsterdam", "rotterdam", "utrecht", "eindhoven", "hague", "haag", "groningen", "schiphol",
]);
const GENERIC_LEADING = new Set(["royal", "koninklijke", "cooperatieve", "the"]);

// Dropped from both the advert's name and the legal name before the loose comparison: "Tommy Hilfiger Europe B.V.",
// "Coöperatieve Rabobank U.A.", "Picnic Technologies B.V.", "Amazon EU SARL, Dutch Branch".
// "Company" and "Corporation" stay: "The Antenna Company B.V." is not the employer "Antenna".
const LOOSE_TRAILING = new Set([
  ...[...GENERIC_TRAILING].filter((word) => !["company", "corporation", "corp", "inc"].includes(word)), "europa", "eu", "holding", "holdings", "branch", "dutch", "bank", "technologies", "technology",
  "cooperatief", "cooperatie", "bv", "nv", "ua", "sarl", "sa", "se", "gmbh", "ag", "ltd", "limited", "llc", "plc",
]);
const LOOSE_LEADING = new Set([...GENERIC_LEADING, "cooperatie", "nv", "bv"]);

// First words too common to stand for one employer ("Van Leeuwen", "Digital Survival", "Studio Noos").
const COMMON_FIRST_WORDS = new Set([
  ...LOOSE_TRAILING, ...LOOSE_LEADING,
  "van", "de", "den", "der", "het", "the", "royal", "koninklijke", "new", "digital", "social", "data", "world", "united",
  "energy", "global", "international", "euro", "european", "studio", "smart", "green", "blue", "health", "life", "cloud",
  "tech", "solid", "west", "east", "north", "south", "first", "best", "next", "open", "pure", "dutch", "holland", "amsterdam",
  "rotterdam", "general", "service", "services", "logistics", "recruitment", "creative", "expert", "experts", "medical",
  "premier", "prime", "total", "link", "plus", "media", "food", "foods", "home", "human", "mobile", "power", "quality",
  "michael", "john", "james", "peter", "paul", "david", "robert", "thomas", "william",
]);
const FIRST_WORD_MIN_LENGTH = 5;
const FIRST_WORD_MAX_ENTRIES = 3;

const MAX_MATCHES = 5;

/** Splits off a tagline ("Logistics United B.V. - Partner in Groei", "Harmonic Finance | Certified B Corp", "ECEM BV, Amsterdam"). */
function withoutTagline(name: string) {
  return name.split(/\s+[-–—|]\s+|\s*[|,]\s*/)[0];
}

function strip(core: string, trailing: Set<string>, leading: Set<string>) {
  const words = core.split(" ").filter(Boolean);
  let changed = true;
  while (changed && words.length > 1) {
    changed = false;
    if (trailing.has(words[words.length - 1])) {
      words.pop();
      changed = true;
    } else if (leading.has(words[0])) {
      words.shift();
      changed = true;
    }
  }
  return words.join(" ");
}

const looseKey = (core: string) => strip(core, LOOSE_TRAILING, LOOSE_LEADING);

/**
 * The names worth looking up for one employer, most specific first, as core names (see coreName): the name as shown,
 * without tagline, without generic words (EMEA, Group, Royal, …), and the text inside and outside brackets
 * ("NX GROUP (NIPPON EXPRESS GROUP)" gives "nx" and "nippon express").
 */
export function employerNameVariants(name: string, slug?: string | null): string[] {
  const shown = name.replace(/&amp;/g, "&").replace(/[™®©]/g, "").replace(/\s+/g, " ").trim();
  const sources = [shown, withoutTagline(shown)];
  const bracket = /^(.*?)\s*\(([^)]+)\)\s*(.*)$/.exec(shown);
  if (bracket) sources.push(`${bracket[1]} ${bracket[3]}`, bracket[2]);

  const variants: string[] = [];
  const add = (value: string) => {
    if (value.length >= 2 && !variants.includes(value)) variants.push(value);
  };
  for (const source of sources) {
    const core = coreName(source);
    add(core);
    add(strip(core, GENERIC_TRAILING, GENERIC_LEADING));
  }
  // The LinkedIn slug often holds the full name the display name shortens ("foot-locker-europe" for "Foot Locker EMEA").
  if (slug && /-/.test(slug)) add(strip(coreName(slug.replace(/[-_]+/g, " ").replace(/\b(?:b ?v|n ?v)\b/g, " ")), GENERIC_TRAILING, GENERIC_LEADING));
  return variants;
}

/** Builds the lookup tables once, so a page of 25 job cards is matched in well under a millisecond each. */
export function buildEmployerIndex(register: SponsorRegister, aliases: AliasKeys = {}): EmployerIndex {
  const maps = {
    byKey: new Map<string, number[]>(),
    byLoose: new Map<string, number[]>(),
    byCompact: new Map<string, number[]>(),
    byWord: new Map<string, number[]>(),
    byFirstWord: new Map<string, number[]>(),
    byKvk: new Map<string, number[]>(),
  };
  const push = (map: Map<string, number[]>, key: string, index: number) => {
    const list = map.get(key);
    if (!list) map.set(key, [index]);
    else if (list[list.length - 1] !== index) list.push(index);
  };
  register.keys.forEach((keys, index) => {
    push(maps.byKvk, register.entries[index].kvk, index);
    for (const key of keys) {
      const loose = looseKey(key);
      push(maps.byKey, key, index);
      push(maps.byLoose, loose, index);
      push(maps.byCompact, loose.replace(/ /g, ""), index);
      push(maps.byFirstWord, loose.split(" ")[0], index);
      for (const word of new Set(key.split(" "))) push(maps.byWord, word, index);
    }
  });
  return { register, aliases, ...maps };
}

/** Builds the index from the compact form the extension ships: [name, kvk] pairs. */
export function employerIndexFromEntries(entries: [string, string][], aliases: AliasKeys = {}, registerDate: string | null = null) {
  return buildEmployerIndex(registerFromEntries(entries.map(([name, kvk]) => ({ name, kvk })), registerDate), aliases);
}

function byNameLength(index: EmployerIndex) {
  const { entries } = index.register;
  return (a: number, b: number) => entries[a].name.length - entries[b].name.length || entries[a].name.localeCompare(entries[b].name, "nl");
}

function result(index: EmployerIndex, tier: EmployerTier, via: EmployerMatch["via"], found: number[], related: number[] = []): EmployerMatch {
  const unique = Array.from(new Set(found)).sort(byNameLength(index));
  const seen = new Set(unique);
  const extra = Array.from(new Set(related.filter((i) => !seen.has(i)))).sort(byNameLength(index));
  return { tier, via, matches: [...unique, ...extra].slice(0, MAX_MATCHES).map((i) => index.register.entries[i]), total: unique.length };
}

const NONE: EmployerMatch = { tier: "not_found", via: null, matches: [], total: 0 };

/** Entries whose name starts with the brand: other entities of a matched sponsor, shown in the tooltip. */
function relatedEntries(index: EmployerIndex, variant: string) {
  const loose = looseKey(variant);
  return (index.byFirstWord.get(loose.split(" ")[0]) ?? []).filter((i) =>
    index.register.keys[i].some((key) => key.startsWith(`${variant} `) || looseKey(key) === loose),
  );
}

/**
 * Looks up one employer: the LinkedIn slug alias, then a name alias, then an exact or loose name, then a registered name
 * that starts with or contains a variant, then a distinctive shared first word. A one-word variant only counts for a
 * "contains" match when the word is long enough to be distinctive, so "Edge" does not match every "… Edge B.V.".
 */
export function matchEmployer(index: EmployerIndex, employer: { name: string; slug?: string | null }): EmployerMatch {
  const slug = employer.slug?.toLowerCase().trim();
  const kvkEntries = (kvks: string[] | undefined) => kvks?.flatMap((kvk) => index.byKvk.get(kvk) ?? []) ?? [];

  const bySlug = slug ? kvkEntries(index.aliases[`slug:${slug}`]) : [];
  if (bySlug.length) return result(index, "sponsor", "slug_alias", bySlug);

  const variants = employerNameVariants(employer.name, slug);
  if (!variants.length) return NONE;

  for (const variant of variants) {
    const found = kvkEntries(index.aliases[`name:${variant}`]);
    if (found.length) return result(index, "sponsor", "name_alias", found);
  }

  for (const variant of variants) {
    const found = index.byKey.get(variant);
    if (found?.length) return result(index, "sponsor", "exact", found, relatedEntries(index, variant));
  }
  // A loose match on a short one-word name ("ACE" for "ACE Company B.V.") is too weak for a green badge.
  for (const variant of variants) {
    const loose = looseKey(variant);
    const found = index.byLoose.get(loose);
    if (found?.length) return result(index, /^[^ ]{1,3}$/.test(loose) ? "likely" : "sponsor", "loose", found, relatedEntries(index, variant));
  }
  // "Suitsupply" for "Suit Supply B.V.": the same letters without spaces, for names long enough not to collide.
  for (const variant of variants) {
    const compact = looseKey(variant).replace(/ /g, "");
    const found = compact.length >= 6 ? index.byCompact.get(compact) : undefined;
    if (found?.length) return result(index, "sponsor", "compact", found);
  }

  const { keys } = index.register;
  for (const variant of variants) {
    const first = variant.split(" ")[0];
    // "Sun Pharma" also finds "Sun Pharmaceutical Industries (Europe) B.V.": the last word may be shortened.
    const last = variant.split(" ").pop() ?? "";
    const open = variant.includes(" ") && last.length >= 5;
    const found = (index.byWord.get(first) ?? index.byFirstWord.get(first) ?? []).filter((i) =>
      keys[i].some((key) => key.startsWith(`${variant} `) || (open && key.startsWith(variant))),
    );
    if (found.length) return result(index, "likely", "prefix", found);
  }

  for (const variant of variants) {
    const words = variant.split(" ");
    if (words.length === 1 && words[0].length < 5) continue;
    const lists = words.map((word) => index.byWord.get(word) ?? []);
    const smallest = lists.reduce((a, b) => (b.length < a.length ? b : a));
    const found = smallest.filter((i) => keys[i].some((key) => words.every((word) => ` ${key} `.includes(` ${word} `))));
    if (found.length) return result(index, "likely", "contains", found);
  }

  // "Rhenus Logistics" for "Rhenus Air & Ocean B.V.": a rare first word shared with a few entries, so a related company.
  for (const variant of variants) {
    const words = looseKey(variant).split(" ");
    if (words.length < 2 || words[0].length < FIRST_WORD_MIN_LENGTH || COMMON_FIRST_WORDS.has(words[0])) continue;
    const found = index.byFirstWord.get(words[0]) ?? [];
    if (found.length && found.length <= FIRST_WORD_MAX_ENTRIES) return result(index, "likely", "first_word", found);
  }

  return NONE;
}

const indexes = new WeakMap<SponsorRegister, EmployerIndex>();

/**
 * The web checker's search with the employer matcher on top: a brand that the plain name search only finds as
 * "possible" or not at all ("ING", "PwC", "Tommy Hilfiger") is answered as the extension's badge would answer it.
 */
export function searchEmployer(register: SponsorRegister, aliases: AliasKeys, query: string, limit = 10): SponsorSearchResult {
  const plain = searchSponsors(register, query, limit);
  if (plain.status === "listed" || kvkFromQuery(query)) return plain;
  let index = indexes.get(register);
  if (!index) {
    index = buildEmployerIndex(register, aliases);
    indexes.set(register, index);
  }
  const employer = matchEmployer(index, { name: query });
  if (employer.tier === "not_found") return plain;
  // Related entities listed after a sponsor's own entries are close matches, not exact ones.
  const found = employer.matches.map((entry, position) => ({
    ...entry,
    match: employer.tier === "sponsor" && position < employer.total ? ("exact" as const) : ("close" as const),
  }));
  const seen = new Set(found.map((entry) => `${entry.kvk}|${entry.name}`));
  const matches = [...found, ...plain.matches.filter((entry) => !seen.has(`${entry.kvk}|${entry.name}`))].slice(0, limit);
  return {
    status: employer.tier === "sponsor" ? "listed" : "possible",
    matches,
    total: Math.max(plain.total, matches.length),
  };
}

