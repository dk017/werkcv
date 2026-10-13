import type { CVData } from "@/lib/cv";
import type { CvBodySectionId } from "@/lib/cv-sections";
import { cvSectionHasSubstantiveContent } from "@/lib/cv-sections";
import { getCompletionState, type CompletionStepId } from "@/lib/cv-completion";
import type { AppLocale } from "@/lib/app-v2-paths";

// The stepped editor shows one part of the CV at a time. "afronden" is the
// finish step: design, checks and download.
export const EDITOR_STEPS = [
  "persoonlijk",
  "profiel",
  "werkervaring",
  "opleiding",
  "vaardigheden",
  "extra",
  "afronden",
] as const;

export type EditorStepId = (typeof EDITOR_STEPS)[number];

export type PreviewEntryTarget = {
  section: "experience" | "education" | "internships";
  index: number;
};

// Indices refer to the currently rendered form arrays, including legacy entries
// without persistent IDs. Resolve them to field-array IDs when opening the form.
export function entryForPreviewTarget(value: string | undefined): PreviewEntryTarget | null {
  const match = value?.match(/^(experience|education|internships):(0|[1-9]\d*)$/);
  if (!match) return null;
  const index = Number(match[2]);
  return Number.isSafeInteger(index)
    ? { section: match[1] as PreviewEntryTarget["section"], index }
    : null;
}

export const CONTENT_STEPS = EDITOR_STEPS.filter((step) => step !== "afronden");

type StepCopy = { label: string; title: string; intro: string };

export const EDITOR_STEP_COPY: Record<AppLocale, Record<EditorStepId, StepCopy>> = {
  nl: {
    persoonlijk: {
      label: "Persoonlijk",
      title: "Persoonlijke gegevens",
      intro: "Hoe werkgevers je kunnen bereiken. Je gewenste functie staat bovenaan je CV.",
    },
    profiel: {
      label: "Profiel",
      title: "Profieltekst",
      intro: "Drie tot vijf zinnen over wie je bent, wat je kunt en wat je zoekt. Dit is het eerste wat een recruiter leest.",
    },
    werkervaring: {
      label: "Werkervaring",
      title: "Werkervaring",
      intro: "Begin met je huidige of laatste baan. Twee tot vijf banen is genoeg; oudere banen mag je korter houden.",
    },
    opleiding: {
      label: "Opleiding",
      title: "Opleiding",
      intro: "Je hoogst afgeronde opleiding eerst. Nog bezig? Zet dan de verwachte einddatum erbij.",
    },
    vaardigheden: {
      label: "Vaardigheden",
      title: "Vaardigheden en talen",
      intro: "Kies vaardigheden die bij de functie passen en die je kunt onderbouwen in een gesprek.",
    },
    extra: {
      label: "Extra",
      title: "Extra onderdelen",
      intro: "Optioneel: stages, cursussen, referenties en meer. Voeg alleen toe wat iets zegt over jou als werknemer.",
    },
    afronden: {
      label: "Afronden",
      title: "Afronden",
      intro: "Kies je ontwerp, controleer je CV en download je PDF.",
    },
  },
  en: {
    persoonlijk: {
      label: "Personal",
      title: "Personal details",
      intro: "How employers can reach you. Your target role appears at the top of your CV.",
    },
    profiel: {
      label: "Profile",
      title: "Profile summary",
      intro: "Three to five sentences on who you are, what you can do and what you are looking for. It is the first thing a recruiter reads.",
    },
    werkervaring: {
      label: "Experience",
      title: "Work experience",
      intro: "Start with your current or most recent job. Two to five jobs is enough; keep older ones short.",
    },
    opleiding: {
      label: "Education",
      title: "Education",
      intro: "Your highest completed education first. Still studying? Add the expected end date.",
    },
    vaardigheden: {
      label: "Skills",
      title: "Skills and languages",
      intro: "Choose skills that fit the role and that you can back up in an interview.",
    },
    extra: {
      label: "Extra",
      title: "Extra sections",
      intro: "Optional: internships, courses, references and more. Only add what says something about you as an employee.",
    },
    afronden: {
      label: "Finish",
      title: "Finish",
      intro: "Choose your design, check your CV and download your PDF.",
    },
  },
};

// The URL parameter that holds the step: Dutch pages use ?stap=, English pages ?step=.
export function stepParamName(locale: AppLocale): "stap" | "step" {
  return locale === "en" ? "step" : "stap";
}

const SECTION_STEP: Record<CvBodySectionId, EditorStepId> = {
  experience: "werkervaring",
  education: "opleiding",
  skills: "vaardigheden",
  languages: "vaardigheden",
  internships: "extra",
  courses: "extra",
  awards: "extra",
  interests: "extra",
  properties: "extra",
  references: "extra",
  sideActivities: "extra",
  customSections: "extra",
};

export function normalizeEditorStep(value: unknown): EditorStepId | null {
  return typeof value === "string" && (EDITOR_STEPS as readonly string[]).includes(value)
    ? (value as EditorStepId)
    : null;
}

export function stepForSection(sectionId: CvBodySectionId): EditorStepId {
  return SECTION_STEP[sectionId];
}

// Maps what was clicked in the live preview to the step that edits it.
// Templates mark body sections with data-cv-section and the header parts
// with data-cv-edit ("personal" or "profile").
export function stepForPreviewTarget(target: { section?: string | null; edit?: string | null }): EditorStepId | null {
  if (target.edit === "profile") return "profiel";
  if (target.edit === "personal") return "persoonlijk";
  if (target.section && Object.hasOwn(SECTION_STEP, target.section)) return SECTION_STEP[target.section as CvBodySectionId];
  return null;
}

const COMPLETION_STEP: Partial<Record<EditorStepId, CompletionStepId>> = {
  persoonlijk: "contact",
  profiel: "summary",
  werkervaring: "experience",
  opleiding: "education",
  vaardigheden: "skills",
};

export function getStepStates(data: CVData): Record<EditorStepId, boolean> {
  const completion = getCompletionState(data, "nl");
  const done = new Set(completion.steps.filter((step) => step.complete).map((step) => step.id));
  const extraHasContent = (Object.keys(SECTION_STEP) as CvBodySectionId[])
    .filter((id) => SECTION_STEP[id] === "extra")
    .some((id) => cvSectionHasSubstantiveContent(data, id));
  return {
    persoonlijk: done.has("contact"),
    profiel: done.has("summary"),
    werkervaring: done.has("experience"),
    opleiding: done.has("education"),
    vaardigheden: done.has("skills"),
    extra: extraHasContent,
    afronden: completion.isReady,
  };
}

// Where to land when the editor opens without an explicit step.
export function initialEditorStep(data: CVData, isEmpty: boolean): EditorStepId {
  if (isEmpty) return "persoonlijk";
  const states = getStepStates(data);
  const firstOpen = (Object.keys(COMPLETION_STEP) as EditorStepId[]).find((step) => !states[step]);
  return firstOpen ?? "afronden";
}

export function neighbourSteps(step: EditorStepId): { previous: EditorStepId | null; next: EditorStepId | null } {
  const index = EDITOR_STEPS.indexOf(step);
  return {
    previous: index > 0 ? EDITOR_STEPS[index - 1] : null,
    next: index < EDITOR_STEPS.length - 1 ? EDITOR_STEPS[index + 1] : null,
  };
}

// The step the editor opens on: an explicit ?stap= / ?step=, then a focus or upload
// request from another page, then the first unfinished part of the CV.
export function resolveInitialStep(input: {
  step: unknown;
  focus: "profile" | "skills" | null;
  uploadRequested: boolean;
  data: CVData;
  isEmpty: boolean;
}): EditorStepId {
  return normalizeEditorStep(input.step)
    ?? (input.focus === "profile" ? "profiel" : input.focus === "skills" ? "vaardigheden" : null)
    ?? (input.uploadRequested ? "persoonlijk" : null)
    ?? initialEditorStep(input.data, input.isEmpty);
}
