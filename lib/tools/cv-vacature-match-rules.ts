// Deterministic corrections applied after the model's vacancy analysis. The model extracts
// requirements and quotes; these rules enforce judgements it gets wrong inconsistently
// (golden set: "Engels (moedertaal)" marked missing for C1 English).

type RequirementStatus = "strong" | "partial" | "missing";

type RequirementLike = {
  requirement: string;
  vacancyEvidence: string;
  status: RequirementStatus;
  cvEvidence: string;
};

type FixLike = { title: string; action: string };

const CEFR_ORDER = ["a1", "a2", "b1", "b2", "c1", "c2"] as const;
type Cefr = (typeof CEFR_ORDER)[number];

const LANGUAGES: Array<{ id: string; names: string[] }> = [
  { id: "nl", names: ["nederlands", "dutch"] },
  { id: "en", names: ["engels", "english"] },
  { id: "de", names: ["duits", "german", "deutsch"] },
  { id: "fr", names: ["frans", "french"] },
  { id: "es", names: ["spaans", "spanish"] },
];

function normalize(value: string): string {
  return value
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function languagesIn(text: string): string[] {
  const normalized = normalize(text);
  return LANGUAGES.filter((language) =>
    // Prefix match so adjective forms count too ("Nederlandse taal", "Engelse").
    language.names.some((name) => new RegExp(`\\b${name}`).test(normalized)),
  ).map((language) => language.id);
}

function cefrIndex(level: Cefr): number {
  return CEFR_ORDER.indexOf(level);
}

/** Level the vacancy asks for; descriptive wording maps to its usual CEFR equivalent. */
function requiredLevel(text: string): Cefr | null {
  const normalized = normalize(text);
  const explicit = normalized.match(/\b([abc][12])\b/);
  if (explicit) return explicit[1] as Cefr;
  if (/(moedertaal|native)/.test(normalized)) return "c2";
  if (/(uitstekend|vloeiend|fluent|excellent|perfect)/.test(normalized)) return "c1";
  if (/(goed|good|zeer goed|very good)/.test(normalized)) return "b2";
  return null;
}

/** Level the CV claims for one language, from the quoted CV evidence. */
function claimedLevel(evidence: string): Cefr | null {
  const normalized = normalize(evidence);
  if (/(moedertaal|native|tweetalig|bilingual)/.test(normalized)) return "c2";
  const explicit = normalized.match(/\b([abc][12])\b/);
  if (explicit) return explicit[1] as Cefr;
  if (/(vloeiend|fluent|uitstekend|excellent)/.test(normalized)) return "c1";
  if (/(zeer goed|very good|goed|good)/.test(normalized)) return "b2";
  return null;
}

function languageStatus(requirement: RequirementLike): RequirementStatus | null {
  const requiredLanguages = languagesIn(`${requirement.requirement} ${requirement.vacancyEvidence}`);
  const evidenceLanguages = languagesIn(requirement.cvEvidence);
  // Only judge single-language requirements where the CV quote is about that same language.
  if (requiredLanguages.length !== 1 || !evidenceLanguages.includes(requiredLanguages[0])) return null;

  const required = requiredLevel(`${requirement.requirement} ${requirement.vacancyEvidence}`);
  const claimed = claimedLevel(requirement.cvEvidence);
  if (!required || !claimed) return null;

  const gap = cefrIndex(required) - cefrIndex(claimed);
  if (gap <= 0) return "strong";
  if (gap === 1) return "partial";
  return "missing";
}

// Capitalised words that are levels, languages or sentence furniture, not tools or names.
const NON_TOOL_TERMS = new Set([
  "mbo", "hbo", "wo", "vmbo", "havo", "vwo", "bachelor", "master", "msc", "bsc",
  "nederlands", "nederlandse", "engels", "engelse", "english", "dutch", "duits", "duitse", "german", "frans", "franse", "french",
  "je", "jij", "wij", "we", "you", "your", "the", "een", "de", "het", "ervaring", "experience", "minimaal", "kennis",
]);

/**
 * Tool and product names in the requirement (Excel, Salesforce, Zendesk, SAP). Dutch does not
 * capitalise ordinary nouns, so capitalised non-initial words are almost always proper names.
 */
function toolTerms(requirementText: string): string[] {
  return requirementText
    .split(/[.!?;:]\s+/)
    .flatMap((sentence) => sentence.split(/[\s,()/]+/).slice(1))
    .map((word) => word.replace(/[^\p{L}\p{N}+#.-]/gu, "").replace(/\.$/, ""))
    .filter((word) => word.length >= 2 && /^\p{Lu}/u.test(word) && !NON_TOOL_TERMS.has(word.toLowerCase()));
}

function mentionsTerm(cvText: string, term: string): boolean {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}([^\\p{L}\\p{N}]|$)`, "iu").test(cvText);
}

/**
 * Applies the rules to one requirement:
 * - language requirements are judged by CEFR level (moedertaal/native = C2);
 * - a requirement with a CV quote that really occurs in the CV is never "missing";
 * - a tool or product named in the requirement that the CV mentions is at least "partial".
 */
export function reconcileRequirementStatus<T extends RequirementLike>(requirement: T, cvText: string): T {
  const byLanguage = languageStatus(requirement);
  if (byLanguage) return { ...requirement, status: byLanguage };
  if (requirement.status !== "missing") return requirement;

  const quote = normalize(requirement.cvEvidence);
  if (quote.length >= 3 && normalize(cvText).includes(quote)) {
    return { ...requirement, status: "partial" };
  }
  if (toolTerms(requirement.requirement).some((term) => mentionsTerm(cvText, term))) {
    return { ...requirement, status: "partial" };
  }
  return requirement;
}

const AVAILABILITY_PATTERN =
  /(beschikbaar|beschikbaarheid|flexib|zaterdag|zondag|weekend|avond|diensten|werktijden|uren per week|startdatum|reisbereid|availability|weekends?|shifts?|start date|willing to travel)/;

/** Availability and willingness items are rarely CV evidence; rank them after substantive gaps. */
export function isAvailabilityFix(fix: FixLike): boolean {
  return AVAILABILITY_PATTERN.test(normalize(`${fix.title} ${fix.action}`));
}

export function pickTopFixes<T extends FixLike>(fixes: T[], count = 3): T[] {
  const substantive = fixes.filter((fix) => !isAvailabilityFix(fix));
  const availability = fixes.filter((fix) => isAvailabilityFix(fix));
  return [...substantive, ...availability].slice(0, count);
}
