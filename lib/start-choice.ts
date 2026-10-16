import type { CVData } from "@/lib/cv";

/**
 * "Hoe wil je beginnen?" for a new, empty CV: upload, start from an example for your job, or empty
 * fields. 21 days to 16 Oct 2026: 60 of 90 blank-form starts stayed empty (uploads: 0 of 68), while
 * 11 of the 30 blank starts with content paid. Run as a 50/50 test against today's form
 * ("form"); the variant is sticky per browser, like the price-copy test.
 */
export const START_CHOICE_EXPERIMENT = "start_choice_v1";
export const START_CHOICE_VARIANTS = ["choice", "form"] as const;
export type StartChoiceVariant = (typeof START_CHOICE_VARIANTS)[number];
export type StartChoiceOption = "upload" | "example" | "blank";

const STORAGE_KEY = "werkcv_start_choice_v1";
const DONE_PREFIX = "werkcv_start_choice_done_v1:";

export function isStartChoiceVariant(value: unknown): value is StartChoiceVariant {
  return typeof value === "string" && (START_CHOICE_VARIANTS as readonly string[]).includes(value);
}

/** Sticky per browser; a fresh random variant when storage is unavailable. */
export function getOrAssignStartChoiceVariant(random: () => number = Math.random): { variant: StartChoiceVariant; isNew: boolean } {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isStartChoiceVariant(stored)) return { variant: stored, isNew: false };
  } catch {
    // fall through
  }
  const variant: StartChoiceVariant = random() < 0.5 ? "choice" : "form";
  try {
    window.localStorage.setItem(STORAGE_KEY, variant);
  } catch {
    // not sticky without storage
  }
  return { variant, isNew: true };
}

/** A CV only gets the choice once: after a choice (or typing) it opens as usual. */
export function isStartChoiceDone(cvKey: string): boolean {
  try {
    return window.localStorage.getItem(`${DONE_PREFIX}${cvKey}`) === "1";
  } catch {
    return false;
  }
}

export function markStartChoiceDone(cvKey: string): void {
  try {
    window.localStorage.setItem(`${DONE_PREFIX}${cvKey}`, "1");
  } catch {
    // best effort
  }
}

export type StartExampleSummary = {
  /** "category/slug" for Dutch examples, "en:roleSlug" for English ones. */
  key: string;
  name: string;
  group: string;
  /** Lower-case search text: name plus the page keywords. */
  terms: string;
};

export function normalizeSearchText(value: string): string {
  return value.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}

/** Every word of the query must appear; matches in the job name rank above keyword matches. */
export function searchStartExamples(list: StartExampleSummary[], query: string, limit = 6): StartExampleSummary[] {
  const words = normalizeSearchText(query).split(" ").filter((word) => word.length > 0);
  if (words.length === 0) return [];
  const scored: Array<{ example: StartExampleSummary; score: number }> = [];
  for (const example of list) {
    const name = normalizeSearchText(example.name);
    const terms = `${name} ${normalizeSearchText(example.terms)} ${normalizeSearchText(example.group)}`;
    if (!words.every((word) => terms.includes(word))) continue;
    let score = 0;
    for (const word of words) {
      if (name.startsWith(word)) score += 3;
      else if (name.split(" ").some((part) => part.startsWith(word))) score += 2;
      else if (name.includes(word)) score += 1;
    }
    scored.push({ example, score });
  }
  return scored
    .sort((a, b) => b.score - a.score || a.example.name.localeCompare(b.example.name, "nl"))
    .slice(0, limit)
    .map((entry) => entry.example);
}

/**
 * The example's job content stays; its fictional person does not. The visitor fills in their own
 * name and contact details on the first step.
 */
export function withoutExamplePerson(data: CVData): CVData {
  return {
    ...data,
    personal: {
      ...data.personal,
      name: "",
      email: "",
      phone: "",
      location: "",
      address: "",
      postalCode: "",
      birthDate: "",
      birthPlace: "",
      nationality: "",
      driversLicense: "",
      gender: "",
      maritalStatus: "",
      linkedIn: "",
      github: "",
      website: "",
      photo: "",
    },
  };
}
