import type { CVData } from "@/lib/cv";
import type { CvBodySectionId } from "@/lib/cv-sections";
import { cvSectionHasSubstantiveContent } from "@/lib/cv-sections";
import { getCompletionState, type CompletionStepId } from "@/lib/cv-completion";

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

export const CONTENT_STEPS = EDITOR_STEPS.filter((step) => step !== "afronden");

type StepCopy = { label: string; title: string; intro: string };

export const EDITOR_STEP_COPY: Record<EditorStepId, StepCopy> = {
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
};

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
