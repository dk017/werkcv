import { z } from "zod";
import { CVData, cvSchema } from "@/lib/cv";

export const voiceSectionSchema = z.enum(["contact", "profile", "experience", "education", "skills"]);
export type VoiceSection = z.infer<typeof voiceSectionSchema>;

export const voiceAnswerSchema = z.object({
  promptId: z.string().trim().min(1).max(100),
  section: voiceSectionSchema,
  transcript: z.string().trim().max(12_000),
});
export type VoiceAnswer = z.infer<typeof voiceAnswerSchema>;

export const voiceProposalRequestSchema = z.object({
  cvId: z.string().uuid(),
  uiLanguage: z.enum(["nl", "en"]),
  currentCv: cvSchema,
  answers: z.array(voiceAnswerSchema).min(1).max(20),
}).superRefine((value, context) => {
  const totalCharacters = value.answers.reduce((total, answer) => total + answer.transcript.length, 0);
  if (totalCharacters > 50_000) {
    context.addIssue({ code: "custom", message: "Voice transcript is too long." });
  }
});

export const voiceCandidateSchema = z.object({
  personal: z.object({
    name: z.string().default(""),
    title: z.string().default(""),
    email: z.string().default(""),
    phone: z.string().default(""),
    location: z.string().default(""),
    summary: z.string().default(""),
  }).default({ name: "", title: "", email: "", phone: "", location: "", summary: "" }),
  experience: z.array(z.object({
    role: z.string().default(""),
    company: z.string().default(""),
    location: z.string().default(""),
    start: z.string().default(""),
    end: z.string().default(""),
    description: z.string().default(""),
    highlights: z.array(z.string()).default([]),
  })).default([]),
  education: z.array(z.object({
    degree: z.string().default(""),
    school: z.string().default(""),
    location: z.string().default(""),
    start: z.string().default(""),
    end: z.string().default(""),
    description: z.string().default(""),
  })).default([]),
  skills: z.array(z.object({
    name: z.string().default(""),
    level: z.number().min(1).max(5).default(3),
    levelConfirmed: z.boolean().default(false),
  })).default([]),
  languages: z.array(z.object({
    name: z.string().default(""),
    level: z.enum(["Moedertaal", "Vloeiend", "Goed", "Basis", "Native", "Fluent", "Good", "Basic"]).default("Goed"),
    levelConfirmed: z.boolean().default(false),
  })).default([]),
  warnings: z.array(z.string()).default([]),
  followUpQuestions: z.array(z.string()).default([]),
});
export type VoiceCandidate = z.infer<typeof voiceCandidateSchema>;

export const voiceCvChangeSchema = z.object({
  id: z.string(),
  section: voiceSectionSchema,
  action: z.enum(["add", "update"]),
  targetPath: z.string().optional(),
  before: z.unknown().optional(),
  after: z.unknown(),
  sourcePromptIds: z.array(z.string()),
  reviewNote: z.string().optional(),
});
export type VoiceCvChange = z.infer<typeof voiceCvChangeSchema>;

function normalizedKey(value: string): string {
  return value.trim().toLocaleLowerCase().replace(/\s+/g, " ");
}

function hasMeaningfulObjectValue(value: Record<string, unknown>): boolean {
  return Object.values(value).some((entry) =>
    typeof entry === "string" ? entry.trim().length > 0 : Array.isArray(entry) && entry.length > 0,
  );
}

function mergeNonEmpty<T extends Record<string, unknown>>(current: T, candidate: T): T {
  const next = { ...current };
  for (const [key, value] of Object.entries(candidate)) {
    if (typeof value === "string" && value.trim()) next[key as keyof T] = value as T[keyof T];
    if (Array.isArray(value) && value.length > 0) next[key as keyof T] = value as T[keyof T];
    if (typeof value === "number") next[key as keyof T] = value as T[keyof T];
  }
  return next;
}

function valuesEqual(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

export function buildVoiceCvChanges(
  currentCv: CVData,
  candidate: VoiceCandidate,
  answers: VoiceAnswer[],
): VoiceCvChange[] {
  const changes: VoiceCvChange[] = [];
  let sequence = 0;
  const promptIdsFor = (section: VoiceSection) =>
    answers.filter((answer) => answer.section === section).map((answer) => answer.promptId);
  const addChange = (change: Omit<VoiceCvChange, "id" | "sourcePromptIds">, section: VoiceSection) => {
    changes.push({ ...change, id: `voice-change-${++sequence}`, sourcePromptIds: promptIdsFor(section) });
  };

  const personalFields: Array<keyof VoiceCandidate["personal"]> = ["name", "title", "email", "phone", "location", "summary"];
  for (const field of personalFields) {
    const after = candidate.personal[field].trim();
    const before = currentCv.personal[field] || "";
    if (after && normalizedKey(after) !== normalizedKey(before)) {
      addChange({
        section: field === "summary" ? "profile" : "contact",
        action: before.trim() ? "update" : "add",
        targetPath: `personal.${field}`,
        ...(before.trim() ? { before } : {}),
        after,
      }, field === "summary" ? "profile" : "contact");
    }
  }

  for (const item of candidate.experience.filter((entry) => hasMeaningfulObjectValue(entry))) {
    const matchIndex = currentCv.experience.findIndex((entry) =>
      normalizedKey(entry.role) === normalizedKey(item.role)
      && normalizedKey(entry.company) === normalizedKey(item.company)
      && Boolean(normalizedKey(item.role) && normalizedKey(item.company)),
    );
    if (matchIndex >= 0) {
      const after = mergeNonEmpty(currentCv.experience[matchIndex], item);
      if (!valuesEqual(currentCv.experience[matchIndex], after)) {
        addChange({ section: "experience", action: "update", targetPath: `experience.${matchIndex}`, before: currentCv.experience[matchIndex], after }, "experience");
      }
    } else {
      addChange({ section: "experience", action: "add", after: item }, "experience");
    }
  }

  for (const item of candidate.education.filter((entry) => hasMeaningfulObjectValue(entry))) {
    const matchIndex = currentCv.education.findIndex((entry) =>
      normalizedKey(entry.degree) === normalizedKey(item.degree)
      && normalizedKey(entry.school) === normalizedKey(item.school)
      && Boolean(normalizedKey(item.degree) && normalizedKey(item.school)),
    );
    if (matchIndex >= 0) {
      const after = mergeNonEmpty(currentCv.education[matchIndex], item);
      if (!valuesEqual(currentCv.education[matchIndex], after)) {
        addChange({ section: "education", action: "update", targetPath: `education.${matchIndex}`, before: currentCv.education[matchIndex], after }, "education");
      }
    } else {
      addChange({ section: "education", action: "add", after: item }, "education");
    }
  }

  for (const [field, items] of [["skills", candidate.skills], ["languages", candidate.languages]] as const) {
    for (const item of items.filter((entry) => entry.name.trim())) {
      const currentItems = currentCv[field] || [];
      const matchIndex = currentItems.findIndex((entry) => normalizedKey(entry.name) === normalizedKey(item.name));
      const after = { name: item.name, level: item.level };
      const reviewNote = item.levelConfirmed
        ? undefined
        : field === "skills"
          ? "SKILL_LEVEL_NOT_STATED"
          : "LANGUAGE_LEVEL_NOT_STATED";
      if (matchIndex < 0) {
        addChange({ section: "skills", action: "add", targetPath: field, after, reviewNote }, "skills");
      } else if (item.levelConfirmed && !valuesEqual(currentItems[matchIndex], after)) {
        addChange({ section: "skills", action: "update", targetPath: `${field}.${matchIndex}`, before: currentItems[matchIndex], after }, "skills");
      }
    }
  }

  return changes;
}

export function applyVoiceCvChanges(currentCv: CVData, changes: VoiceCvChange[]): CVData {
  const next = structuredClone(currentCv);
  type EditablePersonalField = "name" | "title" | "email" | "phone" | "location" | "summary";

  for (const change of changes) {
    if (change.targetPath?.startsWith("personal.")) {
      const field = change.targetPath.slice("personal.".length) as EditablePersonalField;
      if (["name", "title", "email", "phone", "location", "summary"].includes(field) && typeof change.after === "string") {
        next.personal[field] = change.after;
      }
      continue;
    }

    const collection = change.targetPath?.startsWith("education")
      ? "education"
      : change.targetPath?.startsWith("skills")
        ? "skills"
        : change.targetPath?.startsWith("languages")
          ? "languages"
          : "experience";
    const list = next[collection] as Array<unknown>;
    const indexPart = change.targetPath?.split(".")[1];
    const index = indexPart === undefined ? -1 : Number(indexPart);
    if (change.action === "update" && Number.isInteger(index) && index >= 0 && index < list.length) {
      list[index] = change.after;
    } else if (change.action === "add") {
      list.push(change.after);
    }
  }

  return cvSchema.parse(next);
}

export function getVoiceMissingCoreDetails(candidate: VoiceCandidate, language: "nl" | "en"): string[] {
  const missing: string[] = [];
  const label = (nl: string, en: string) => language === "en" ? en : nl;
  if (!candidate.personal.name.trim()) missing.push(label("Naam", "Name"));
  if (!candidate.personal.title.trim()) missing.push(label("Gewenste functie", "Target role"));
  if (!candidate.personal.email.trim() && !candidate.personal.phone.trim()) missing.push(label("E-mail of telefoonnummer", "Email or phone number"));
  if (!candidate.personal.summary.trim()) missing.push(label("Profieltekst", "Professional profile"));
  if (candidate.experience.length === 0) missing.push(label("Werkervaring", "Work experience"));
  if (candidate.education.length === 0) missing.push(label("Opleiding", "Education"));
  if (candidate.skills.length === 0) missing.push(label("Vaardigheden", "Skills"));
  return missing;
}

export function getVoiceFollowUpQuestions(candidate: VoiceCandidate, language: "nl" | "en"): string[] {
  const questions = [...candidate.followUpQuestions];
  const add = (nl: string, en: string) => questions.push(language === "en" ? en : nl);
  const alreadyAsks = (anchor: string, patterns: RegExp[]) => questions.some((question) => {
    const normalized = question.toLocaleLowerCase();
    return (!anchor || normalized.includes(anchor.toLocaleLowerCase()))
      && patterns.some((pattern) => pattern.test(normalized));
  });

  for (const experience of candidate.experience) {
    const company = experience.company.trim();
    const role = experience.role.trim();
    if (!role && !alreadyAsks(company, [/job title/, /functietitel/])) {
      add(
        company ? `Wat was je exacte functietitel bij ${company}?` : "Wat was je exacte functietitel voor deze werkervaring?",
        company ? `What was your exact job title at ${company}?` : "What was your exact job title for this experience?",
      );
    }
    if (!company && !alreadyAsks(role, [/employer/, /werkgever/, /company/, /bedrijf/])) {
      add(
        role ? `Bij welke werkgever had je de functie ${role}?` : "Bij welke werkgever was deze werkervaring?",
        role ? `Which employer did you work for as ${role}?` : "Which employer was this experience with?",
      );
    }
    if ((!experience.start.trim() || !experience.end.trim())
      && !alreadyAsks(company || role, [/date/, /start/, /end/, /begin/, /eind/])) {
      const anchor = company || role || (language === "en" ? "this role" : "deze functie");
      add(
        `Wat waren de exacte begin- en einddatum bij ${anchor}?`,
        `What were the exact start and end dates for ${anchor}?`,
      );
    }
  }

  for (const education of candidate.education) {
    const anchor = education.school.trim() || education.degree.trim();
    if (!education.degree.trim()) {
      add(
        anchor ? `Wat was de officiële naam van je diploma of opleiding bij ${anchor}?` : "Wat was de officiële naam van je diploma of opleiding?",
        anchor ? `What was the official degree or programme name at ${anchor}?` : "What was the official degree or programme name?",
      );
    }
  }

  return Array.from(new Set(questions.map((question) => question.trim()).filter(Boolean))).slice(0, 8);
}
