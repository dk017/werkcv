import type { z } from "zod";
import type { Section } from "./contract";

/**
 * Reads the structure of a pasted CV for the v2 MCP answers: which sections exist, the profile, and each
 * job with its bullets, so a fix can name the exact place ("Werkervaring > Marketeer, bullet 1") and quote
 * the exact text. MCP-only: the website's checker (lib/tools/cv-score.ts, lib/cv-check/parse-preview.ts)
 * is not changed by this file.
 */

type SectionId = z.infer<typeof Section>;
type HeadingSection = Exclude<SectionId, "contact" | "general">;

const HEADINGS: Record<HeadingSection, string[]> = {
  profile: ["profiel", "profieltekst", "over mij", "samenvatting", "persoonlijk profiel", "profile", "summary", "about me", "professional summary"],
  experience: ["werkervaring", "ervaring", "beroepservaring", "relevante werkervaring", "experience", "work experience", "professional experience", "employment history"],
  education: ["opleiding", "opleidingen", "onderwijs", "opleiding en cursussen", "education"],
  skills: ["vaardigheden", "competenties", "kennis en vaardigheden", "skills", "technical skills", "key skills"],
  languages: ["talen", "talenkennis", "languages", "language skills"],
  certificates: ["certificaten", "cursussen", "certificaten en cursussen", "cursussen en certificaten", "trainingen", "certifications", "courses", "licenses and certifications"],
  // "Hobby's" is written with a straight or a curly apostrophe (Word and many PDFs use ’); both count.
  hobbies: ["hobby's", "hobbys", "hobby", "hobbies", "interesses", "persoonlijke interesses", "vrije tijd", "interests", "hobbies and interests"],
};
const CONTACT_HEADINGS = ["contact", "contactgegevens", "personalia", "persoonsgegevens", "personal details", "contact details"];
const SECTION_ORDER: SectionId[] = ["contact", "profile", "experience", "education", "skills", "languages", "certificates", "hobbies", "general"];

const BULLET = /^\s*(?:[-•*◦▪●–]|\d+[.)])\s+/;
const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const PHONE = /(?:\+31|0031|0)[\s-]?(?:6|[1-9]\d)(?:[\s-]?\d){7,8}/;

export type CvLine = { text: string; index: number };
export type ExperienceEntry = { title: string; header: string; bullets: string[] };
export type CvStructure = {
  sectionsFound: SectionId[];
  profileText: string | null;
  experience: ExperienceEntry[];
  bullets: Array<{ text: string; title: string; position: number }>;
};

export function normalizeHeading(line: string): string {
  return line
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/^[^\p{L}]+/u, "")
    .replace(/[:|.]+$/g, "")
    .replace(/\s*&\s*/g, " and ")
    .replace(/\s+/g, " ")
    .trim();
}

function headingOf(line: string): HeadingSection | "contact" | null {
  if (line.length > 40) return null;
  const normalized = normalizeHeading(line);
  if (CONTACT_HEADINGS.includes(normalized)) return "contact";
  for (const [id, aliases] of Object.entries(HEADINGS) as Array<[HeadingSection, string[]]>) {
    if (aliases.includes(normalized)) return id;
  }
  return null;
}

/** The job title from a header line such as "Marketing Coördinator – Fietsplaats B.V. (2022 – heden)". */
export function titleFromHeader(header: string): string {
  return header
    .split(/\s+[–—-]\s+|\s+\|\s+|,\s+|\s+bij\s+|\s+at\s+|\s*\(/i)[0]
    .trim();
}

export function readCvStructure(cvText: string): CvStructure {
  const lines = cvText.split(/\r?\n/).map((text) => text.trim()).filter(Boolean);
  const found = new Set<SectionId>();
  if (EMAIL.test(cvText) || PHONE.test(cvText)) found.add("contact");

  let current: HeadingSection | "contact" | null = null;
  const profileLines: string[] = [];
  const experience: ExperienceEntry[] = [];
  let lastWasBullet = true;

  for (const line of lines) {
    const heading = headingOf(line);
    if (heading) {
      current = heading;
      found.add(heading);
      lastWasBullet = true;
      continue;
    }
    if (current === "profile") profileLines.push(line);
    if (current === "experience") {
      if (BULLET.test(line)) {
        if (!experience.length) experience.push({ title: "", header: "", bullets: [] });
        experience[experience.length - 1].bullets.push(line.replace(BULLET, "").trim());
        lastWasBullet = true;
      } else if (lastWasBullet || !experience.length) {
        // A non-bullet line after bullets starts the next job; its first line holds the title.
        experience.push({ title: titleFromHeader(line), header: line, bullets: [] });
        lastWasBullet = false;
      } else {
        experience[experience.length - 1].header += ` ${line}`;
      }
    }
  }

  const bullets = experience.flatMap((entry) => entry.bullets.map((text, i) => ({ text, title: entry.title, position: i + 1 })));
  return {
    sectionsFound: SECTION_ORDER.filter((id) => found.has(id)),
    profileText: profileLines.length ? profileLines.join(" ") : null,
    experience,
    bullets,
  };
}

/* ------------------------------------------------------------------ */
/* Content signals                                                     */
/* ------------------------------------------------------------------ */

const WEAK_OPENERS = [
  "verantwoordelijk voor", "verantwoordelijk was voor", "meewerken aan", "meegewerkt aan", "ondersteuning bij",
  "ondersteunen van", "ondersteunen bij", "assisteren bij", "helpen bij", "helpen met", "bezig met", "betrokken bij",
  "taken:", "werkzaamheden:",
  "responsible for", "assisted with", "assisting with", "helped with", "helping with", "worked on", "involved in",
  "duties included", "tasks included", "in charge of",
];

/** The weak opener a bullet starts with, as written in the CV, or null. */
export function weakOpenerOf(bullet: string): string | null {
  const lower = bullet.toLowerCase();
  const opener = WEAK_OPENERS.find((candidate) => lower.startsWith(candidate));
  return opener ? bullet.slice(0, opener.length) : null;
}

/** A bullet shows a measurable result when it has a number, a percentage or an amount. */
export function isQuantified(bullet: string): boolean {
  return /\d/.test(bullet) || /%|€|\$/.test(bullet);
}

// Phrases recruiters read as filler. Matched case-insensitively; the exact text from the CV is returned.
const CLICHES: RegExp[] = [
  /\benthousiast\p{L}*(?:\s+en\s+leergierig\p{L}*)?/giu,
  /\bleergierig\p{L}*/giu,
  /\b(?:echte\s+)?team\s?player\b/giu,
  /\bnieuwe uitdaging\b/giu,
  /\bresultaatgericht\p{L}*/giu,
  /\bgedreven\b/giu,
  /\bproactie[fv]\p{L}*/giu,
  /\bhands-on\b/giu,
  /\bzelfstarter\b/giu,
  /\bpassie voor\b/giu,
  /\bstressbestendig\p{L}*/giu,
  /\bout-of-the-box\b/giu,
  /\bcommunicatief vaardig\b/giu,
  /\bresults[- ]driven\b/giu,
  /\bself-starter\b/giu,
  /\bhard[- ]working\b/giu,
  /\bgo-getter\b/giu,
  /\bpassionate\b/giu,
  /\bdetail[- ]oriented\b/giu,
  /\bnew challenge\b/giu,
];

/** Clichés in the CV text, each as written, without overlaps, in reading order. */
export function findCliches(text: string): string[] {
  const hits: Array<{ start: number; end: number; text: string }> = [];
  for (const pattern of CLICHES) {
    for (const match of text.matchAll(pattern)) {
      const start = match.index ?? 0;
      const end = start + match[0].length;
      if (hits.some((hit) => start < hit.end && end > hit.start)) continue;
      hits.push({ start, end, text: match[0] });
    }
  }
  return hits.sort((a, b) => a.start - b.start).map((hit) => hit.text);
}

export function countWords(text: string | null): number | null {
  if (!text) return null;
  return text.split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word)).length;
}

/**
 * The sentences of `paragraph` that contain any of `phrases`, as one exact slice of the CV text (from the
 * first such sentence to the end of the last), so a client can find it with a plain text search.
 */
export function quoteSentencesWith(cvText: string, phrases: string[]): string | null {
  if (!phrases.length) return null;
  const positions = phrases.map((phrase) => cvText.indexOf(phrase)).filter((index) => index >= 0);
  if (!positions.length) return null;
  const first = Math.min(...positions);
  const last = Math.max(...phrases.map((phrase) => { const at = cvText.indexOf(phrase); return at < 0 ? -1 : at + phrase.length; }));
  // Sentence start: after the previous ". ", "! ", "? " or the start of the line.
  let start = first;
  while (start > 0 && !/[.!?\n]/.test(cvText[start - 1])) start -= 1;
  while (start < first && /\s/.test(cvText[start])) start += 1;
  let end = last;
  while (end < cvText.length && !/[.!?\n]/.test(cvText[end])) end += 1;
  if (end < cvText.length && /[.!?]/.test(cvText[end])) end += 1;
  return cvText.slice(start, end).trim();
}
