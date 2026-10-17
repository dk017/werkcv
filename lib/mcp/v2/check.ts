import type { z } from "zod";
import { rankFailedChecks } from "@/lib/cv-check/score";
import type { CvCheckItem, CvCheckResult } from "@/lib/cv-check/types";
import {
  BAND_LABELS,
  CHECK_WEIGHTS,
  CheckCvOutput,
  SCHEMA_VERSION,
  bandFor,
  computeCheckScore,
  nextStepAfterCheck,
  toGrade10,
  type Fix,
  type Section,
} from "./contract";
import { countWords, findCliches, isQuantified, quoteSentencesWith, readCvStructure, weakOpenerOf, type CvStructure } from "./cv-structure";

export const SCORING_VERSION = "2026-10";

type Locale = "nl" | "en";
type FixT = z.infer<typeof Fix>;
type SectionId = z.infer<typeof Section>;

const CATEGORY_MAP = { parsing: "ats", basics: "basics", content: "content", dutch: "dutch_conventions" } as const;
const CATEGORY_LABELS = {
  content: { nl: "Inhoud en bewijs", en: "Content and evidence" },
  ats: { nl: "Leesbaarheid voor systemen", en: "Readable by systems" },
  basics: { nl: "Basis en contact", en: "Basics and contact" },
  dutch_conventions: { nl: "Nederlandse conventies", en: "Dutch conventions" },
} as const;
const CATEGORY_ORDER = ["content", "ats", "basics", "dutch_conventions"] as const;

const SECTION_BY_CHECK: Record<string, SectionId> = {
  quantified_achievement: "experience", active_verbs: "experience", experience_exists: "experience", experience_dates: "experience",
  date_format_consistency: "experience",
  profile_exists: "profile", profile_length: "profile", profile_buzzwords: "profile", profile_length_and_cliches: "profile",
  profile_years_experience: "profile", no_first_person: "profile",
  email_present: "contact", phone_present: "contact", linkedin_present: "contact", location_present: "contact", no_placeholder_email: "contact",
  nl_optional_personal_details: "contact",
  education_present: "education", nl_education_level: "education",
  skills_present: "skills",
  languages_present: "languages", nl_language_levels: "languages",
  interests_present: "hobbies",
};

const SECTION_NAMES: Record<SectionId, { nl: string; en: string }> = {
  contact: { nl: "Contactgegevens", en: "Contact details" },
  profile: { nl: "Profiel", en: "Profile" },
  experience: { nl: "Werkervaring", en: "Work experience" },
  education: { nl: "Opleiding", en: "Education" },
  skills: { nl: "Vaardigheden", en: "Skills" },
  languages: { nl: "Talen", en: "Languages" },
  certificates: { nl: "Certificaten", en: "Certificates" },
  hobbies: { nl: "Hobby's", en: "Hobbies" },
  general: { nl: "Hele cv", en: "Whole CV" },
};

function severityOf(check: CvCheckItem): FixT["severity"] {
  if (check.severity === "critical") return "critical";
  if (check.severity === "tip") return "low";
  return check.weight >= 8 ? "high" : "medium";
}

function bulletWhere(locale: Locale, title: string, position: number): string {
  const section = SECTION_NAMES.experience[locale];
  const bullet = locale === "en" ? "bullet" : "bullet";
  return title ? `${section} > ${title}, ${bullet} ${position}` : `${section}, ${bullet} ${position}`;
}

/** Engine evidence is only used as a quote when it is literally in the CV (never for ID numbers). */
function verbatimOrNull(cvText: string, value: string | null, checkId: string): string | null {
  if (!value || checkId === "nl_no_sensitive_ids") return null;
  return cvText.includes(value) ? value : null;
}

type Ctx = { cvText: string; locale: Locale; structure: CvStructure; cliches: string[]; weakOpeners: string[]; profileWords: number | null };

function buildFix(check: CvCheckItem, ctx: Ctx): FixT {
  const id = check.id.replace(/^score_/, "");
  const nl = ctx.locale === "nl";
  const section = SECTION_BY_CHECK[id] ?? "general";
  const base: FixT = {
    id,
    severity: severityOf(check),
    section,
    where: section === "general" ? null : SECTION_NAMES[section][ctx.locale],
    quote: verbatimOrNull(ctx.cvText, check.evidence, id),
    problem: check.label,
    fix: check.fix ?? check.label,
    example: null,
  };
  const { bullets } = ctx.structure;

  if (id === "quantified_achievement" && bullets.length) {
    // A plain task bullet is the clearest example; weak-opener bullets are quoted by the active_verbs fix.
    const target =
      bullets.find((bullet) => !isQuantified(bullet.text) && !weakOpenerOf(bullet.text)) ??
      bullets.find((bullet) => !isQuantified(bullet.text)) ??
      bullets[0];
    const plain = bullets.filter((bullet) => !isQuantified(bullet.text)).length;
    return {
      ...base,
      where: bulletWhere(ctx.locale, target.title, target.position),
      quote: target.text,
      problem: plain === bullets.length
        ? (nl ? `Geen enkele van je ${bullets.length} bullets bevat een cijfer of resultaat.` : `None of your ${bullets.length} bullets has a number or result.`)
        : (nl ? `${plain} van je ${bullets.length} bullets bevatten geen cijfer of resultaat.` : `${plain} of your ${bullets.length} bullets have no number or result.`),
      fix: nl ? "Voeg per functie minstens één resultaat toe met een cijfer, budget of percentage." : "Add at least one result per job with a number, budget or percentage.",
      example: nl ? `${target.text}, met als resultaat [X] (bijvoorbeeld +[X]% of een budget van €[X]).` : `${target.text}, resulting in [X] (for example +[X]% or a budget of €[X]).`,
    };
  }
  if (id === "active_verbs" && bullets.length) {
    const weak = bullets.filter((bullet) => weakOpenerOf(bullet.text));
    const target = weak[0] ?? bullets[0];
    const opener = weak.length ? weakOpenerOf(target.text) : null;
    return {
      ...base,
      where: bulletWhere(ctx.locale, target.title, target.position),
      quote: target.text,
      problem: opener
        ? (nl ? `${weak.length} bullets beginnen met een zwakke opener zoals '${opener}'.` : `${weak.length} bullets start with a weak opener such as '${opener}'.`)
        : (nl ? "Je bullets beschrijven vooral taken, niet wat je bereikte." : "Your bullets mostly describe tasks, not what you achieved."),
      fix: nl ? "Begin elke bullet met een actief werkwoord en eindig met het resultaat." : "Start each bullet with an active verb and end with the result.",
    };
  }
  if (id === "profile_length" || id === "profile_buzzwords" || id === "profile_length_and_cliches") {
    const quote = quoteSentencesWith(ctx.cvText, ctx.cliches) ?? (ctx.structure.profileText && ctx.cvText.includes(ctx.structure.profileText) ? ctx.structure.profileText : null);
    const words = ctx.profileWords ?? 0;
    const lengthPart = nl ? `Je profiel telt ${words} woorden (advies: 50-120)` : `Your profile has ${words} words (advice: 50-120)`;
    const clichePart = ctx.cliches.length ? (nl ? ` en bestaat vooral uit clichés` : ` and is mostly clichés`) : "";
    return {
      ...base,
      id,
      where: SECTION_NAMES.profile[ctx.locale],
      quote,
      problem: id === "profile_buzzwords"
        ? (nl ? `Je profiel bevat clichés zoals '${ctx.cliches[0] ?? "teamplayer"}'.` : `Your profile contains clichés such as '${ctx.cliches[0] ?? "team player"}'.`)
        : `${lengthPart}${id === "profile_length_and_cliches" ? clichePart : ""}.`,
      fix: nl ? "Schrijf 3-5 zinnen over je specialisme, je belangrijkste resultaat en de functie die je zoekt." : "Write 3-5 sentences about your specialism, your main result and the job you are looking for.",
    };
  }
  return base;
}

/** Failed checks as v2 fixes, most important first; profile length and clichés become one fix. */
function fixesFor(result: CvCheckResult, ctx: Ctx): FixT[] {
  const ranked = rankFailedChecks(result.checks);
  const ids = new Set(ranked.map((check) => check.id));
  const merged = ids.has("score_profile_length") && ids.has("score_profile_buzzwords");
  const fixes: FixT[] = [];
  for (const check of ranked) {
    if (merged && check.id === "score_profile_buzzwords") continue;
    if (merged && check.id === "score_profile_length") {
      const buzz = ranked.find((c) => c.id === "score_profile_buzzwords")!;
      const severity = [severityOf(check), severityOf(buzz)].sort((a, b) => ["critical", "high", "medium", "low"].indexOf(a) - ["critical", "high", "medium", "low"].indexOf(b))[0];
      fixes.push({ ...buildFix({ ...check, id: "profile_length_and_cliches" }, ctx), severity });
      continue;
    }
    fixes.push(buildFix(check, ctx));
  }
  return fixes;
}

function summaryFor(locale: Locale, categories: Record<string, number>, quantified: number, bullets: number, weak: number, cliches: number): string {
  const nl = locale === "nl";
  const clean = categories.ats >= 80 && categories.basics >= 80;
  const good = clean
    ? (nl ? "Je CV is netjes opgebouwd en goed leesbaar" : "Your CV is well structured and easy to read")
    : (nl ? "Je CV heeft nog werk nodig aan opbouw en leesbaarheid" : "Your CV still needs work on structure and readability");
  const gaps: string[] = [];
  if (bullets > 0 && quantified === 0) gaps.push(nl ? "laat geen meetbare resultaten zien" : "shows no measurable results");
  if (weak >= 2) gaps.push(nl ? "beschrijft vooral taken" : "mostly describes tasks");
  if (cliches >= 2 && gaps.length < 2) gaps.push(nl ? "heeft een algemeen profiel" : "has a generic profile");
  if (!gaps.length) return nl ? `${good} en laat concrete resultaten zien.` : `${good} and shows concrete results.`;
  const joined = gaps.length === 1 ? gaps[0] : `${gaps.slice(0, -1).join(", ")} ${nl ? "en" : "and"} ${gaps[gaps.length - 1]}`;
  return `${good}, ${nl ? "maar" : "but"} ${joined}.`;
}

/** Maps the existing checker's result onto the v2 contract. The website's own grade is not changed. */
export function toCheckCvV2(result: CvCheckResult, cvText: string, locale: Locale): CheckCvOutput {
  const structure = readCvStructure(cvText);
  const bulletTexts = structure.bullets.map((bullet) => bullet.text);
  const weakOpeners = [...new Set(bulletTexts.map(weakOpenerOf).filter((opener): opener is string => Boolean(opener)))];
  const cliches = [...new Set(findCliches(cvText))];
  const profileWords = countWords(structure.profileText);
  const stats = {
    wordCount: result.wordCount,
    profileWordCount: profileWords,
    experienceBulletCount: bulletTexts.length,
    quantifiedBulletCount: bulletTexts.filter(isQuantified).length,
    weakBulletOpeners: weakOpeners,
    clichesFound: cliches,
  };

  const categoryScores = Object.fromEntries(
    result.categories.map((category) => [CATEGORY_MAP[category.id], Math.round(category.score)]),
  ) as Record<(typeof CATEGORY_ORDER)[number], number>;
  for (const id of CATEGORY_ORDER) categoryScores[id] ??= 100;

  const score = computeCheckScore(categoryScores, stats);
  const band = bandFor(score);
  const fixes = fixesFor(result, { cvText, locale, structure, cliches, weakOpeners, profileWords });

  return {
    score,
    grade10: toGrade10(score),
    band,
    bandLabel: BAND_LABELS[band][locale],
    summary: summaryFor(locale, categoryScores, stats.quantifiedBulletCount, stats.experienceBulletCount, weakOpeners.length, cliches.length),
    categories: CATEGORY_ORDER.map((id) => ({ id, label: CATEGORY_LABELS[id][locale], score: categoryScores[id], weight: CHECK_WEIGHTS[id] })),
    stats,
    topFixes: fixes.slice(0, 3),
    otherFixesCount: Math.max(0, fixes.length - 3),
    criticalIssues: result.checks.filter((check) => check.severity === "critical" && check.status === "fail").length,
    sectionsFound: structure.sectionsFound,
    canOpenInEditor: true,
    nextStep: nextStepAfterCheck(locale, score),
    limitations:
      locale === "en"
        ? "Based on the pasted text only: layout such as columns or scans is not assessed. This grade uses its own weighting and can differ from the CV check on the website."
        : "Alleen gebaseerd op de geplakte tekst: opmaak zoals kolommen of scans is niet beoordeeld. Dit cijfer gebruikt een eigen weging en kan afwijken van de cv-check op de website.",
    meta: { tool: "check_cv", schemaVersion: SCHEMA_VERSION, scoringVersion: SCORING_VERSION, locale },
  };
}
