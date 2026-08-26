import type { CVData } from "./cv";
import { getTemplateConfig } from "./templates/registry";

/**
 * The sections a candidate can deliberately move in the editor. Personal
 * details remain in the document header; these are the content blocks that
 * appear in the main body of every CV layout.
 */
/**
 * The persisted body-section contract. Keep this list deliberately boring:
 * it is shared by the editor, every React template and the PDF renderer.
 * Personal details and the profile header are not movable body sections.
 */
export const CV_BODY_SECTION_IDS = [
  "experience",
  "education",
  "internships",
  "courses",
  "awards",
  "skills",
  "languages",
  "interests",
  "properties",
  "references",
  "sideActivities",
  "customSections",
] as const;

export type CvBodySectionId = (typeof CV_BODY_SECTION_IDS)[number];
/** @deprecated Use CvBodySectionId. Kept for legacy callers during migration. */
export type CvReorderableSectionId = CvBodySectionId;
/** @deprecated Use CV_BODY_SECTION_IDS. */
export const CV_REORDERABLE_SECTION_IDS = CV_BODY_SECTION_IDS;

export const DEFAULT_CV_SECTION_ORDER: CvBodySectionId[] = [
  "experience",
  "education",
  "internships",
  "courses",
  "awards",
  "skills",
  "languages",
  "interests",
  "properties",
  "references",
  "sideActivities",
  "customSections",
];

const SECTION_ID_SET = new Set<string>(CV_BODY_SECTION_IDS);

export function normalizeCvSectionOrder(value: unknown): CvBodySectionId[] {
  const source = Array.isArray(value) ? value : [];
  const seen = new Set<CvBodySectionId>();
  const result: CvBodySectionId[] = [];

  for (const candidate of source) {
    if (typeof candidate !== "string" || !SECTION_ID_SET.has(candidate) || seen.has(candidate as CvBodySectionId)) {
      continue;
    }
    const id = candidate as CvBodySectionId;
    seen.add(id);
    result.push(id);
  }

  for (const id of DEFAULT_CV_SECTION_ORDER) {
    if (!seen.has(id)) result.push(id);
  }

  return result;
}

export function getCvSectionOrderIndex(
  order: unknown,
  sectionId: CvBodySectionId,
): number {
  return normalizeCvSectionOrder(order).indexOf(sectionId);
}

export function getCvSectionLabel(
  sectionId: CvBodySectionId,
  uiLanguage: "nl" | "en",
): string {
  const labels: Record<CvBodySectionId, [string, string]> = {
    experience: ["Werkervaring", "Experience"],
    education: ["Opleidingen", "Education"],
    internships: ["Stages", "Internships"],
    courses: ["Cursussen en certificaten", "Courses and certificates"],
    awards: ["Prestaties", "Achievements"],
    skills: ["Vaardigheden", "Skills"],
    languages: ["Talen", "Languages"],
    interests: ["Interesses", "Interests"],
    properties: ["Eigenschappen", "Personal qualities"],
    references: ["Referenties", "References"],
    sideActivities: ["Nevenactiviteiten", "Side activities"],
    customSections: ["Extra onderdelen", "Custom sections"],
  };

  return labels[sectionId][uiLanguage === "en" ? 1 : 0];
}

function hasText(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function hasSubstantiveItem(value: unknown, fields: string[]): boolean {
  if (hasText(value)) return true;
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const record = value as Record<string, unknown>;
  return fields.some((field) => {
    const candidate = record[field];
    if (hasText(candidate)) return true;
    return Array.isArray(candidate) && candidate.some(hasText);
  });
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function arrayField(value: unknown, field: string): unknown[] {
  const candidate = asRecord(value)[field];
  return Array.isArray(candidate) ? candidate : [];
}

/** Returns true only when a saved section contains user-authored substance. */
export function cvSectionHasSubstantiveContent(data: unknown, sectionId: CvBodySectionId): boolean {
  switch (sectionId) {
    case "experience":
      return arrayField(data, "experience").some((item) => hasSubstantiveItem(item, ["role", "company", "location", "start", "end", "description", "highlights"]));
    case "education":
      return arrayField(data, "education").some((item) => hasSubstantiveItem(item, ["degree", "school", "location", "start", "end", "description"]));
    case "internships":
      return arrayField(data, "internships").some((item) => hasSubstantiveItem(item, ["role", "company", "location", "start", "end", "description", "highlights"]));
    case "courses":
      return arrayField(data, "courses").some((item) => hasSubstantiveItem(item, ["name", "institution", "year"]));
    case "awards":
      return arrayField(data, "awards").some(hasText);
    case "skills":
      return arrayField(data, "skills").some((item) => hasSubstantiveItem(item, ["name"]));
    case "languages":
      // A default proficiency (for example "Goed") is not a language entry
      // by itself; the language name is the substantive user-authored value.
      return arrayField(data, "languages").some((item) => hasSubstantiveItem(item, ["name"]));
    case "interests":
      return arrayField(data, "interests").some(hasText);
    case "properties":
      return arrayField(data, "properties").some(hasText);
    case "references":
      return arrayField(data, "references").some((item) => hasSubstantiveItem(item, ["name", "role", "company", "email", "phone"]));
    case "sideActivities":
      return arrayField(data, "sideActivities").some((item) => hasSubstantiveItem(item, ["title", "organization", "start", "end", "description"]));
    case "customSections":
      return arrayField(data, "customSections").some((item) => hasSubstantiveItem(item, ["title", "items"]));
  }
}

/** Backwards-compatible alias used by older editor callers. */
export const cvSectionHasContent = cvSectionHasSubstantiveContent;

/**
 * Keep the core sections visible in the reorder control even before the user
 * adds content. Optional sections only appear once they contain data.
 */
export function getEditorSectionIds(
  data: CVData,
  visibility?: Partial<Record<CvBodySectionId, boolean>>,
): CvBodySectionId[] {
  return normalizeCvSectionOrder(data.sectionOrder).filter(
    (sectionId) => sectionId === "experience"
      || sectionId === "education"
      || sectionId === "skills"
      || sectionId === "languages"
      // A saved section is always visible. A stale local toggle must not hide
      // content the user has already entered; the toggle only enables an
      // otherwise empty optional card.
      || cvSectionHasSubstantiveContent(data, sectionId)
      || visibility?.[sectionId] === true,
  );
}

export function getOrderedSectionIds(
  data: CVData,
  visibility?: Partial<Record<CvBodySectionId, boolean>>,
): CvBodySectionId[] {
  const present = new Set(getEditorSectionIds(data, visibility));
  return normalizeCvSectionOrder(data.sectionOrder).filter((id) => present.has(id));
}

export type CvSectionLayout = {
  layout: "single-column" | "two-column-left" | "two-column-right";
  ordered: CvBodySectionId[];
  sidebar: CvBodySectionId[];
  main: CvBodySectionId[];
};

/**
 * Resolve one persisted order into the lanes dictated by the template
 * registry. This is the only place that knows which sections belong in the
 * sidebar for a two-column layout.
 */
export function resolveCvSectionLayout(
  data: CVData,
  templateId: string,
  visibility?: Partial<Record<CvBodySectionId, boolean>>,
): CvSectionLayout {
  const layout = getTemplateConfig(templateId).layout;
  const ordered = getOrderedSectionIds(data, visibility);
  if (layout === "single-column") {
    return { layout, ordered, sidebar: [], main: ordered };
  }

  const sidebarSet = new Set<CvBodySectionId>(["skills", "languages", "interests"]);
  const sidebar = ordered.filter((id) => sidebarSet.has(id));
  const main = ordered.filter((id) => !sidebarSet.has(id));
  return { layout, ordered, sidebar, main };
}

/** Swap two visible sections within their template lane without changing the
 * relative position of hidden section ids in the persisted array. */
export function moveSectionWithinLane(
  data: CVData,
  templateId: string,
  sectionId: CvBodySectionId,
  direction: -1 | 1,
  visibility?: Partial<Record<CvBodySectionId, boolean>>,
): CvBodySectionId[] {
  const normalized = normalizeCvSectionOrder(data.sectionOrder);
  const resolved = resolveCvSectionLayout(data, templateId, visibility);
  const lane = resolved.layout === "single-column" || !["skills", "languages", "interests"].includes(sectionId)
    ? resolved.main
    : resolved.sidebar;
  const index = lane.indexOf(sectionId);
  const nextIndex = index + direction;
  if (index < 0 || nextIndex < 0 || nextIndex >= lane.length) return normalized;
  const target = lane[nextIndex];
  const sourcePosition = normalized.indexOf(sectionId);
  const targetPosition = normalized.indexOf(target);
  if (sourcePosition < 0 || targetPosition < 0) return normalized;
  const next = [...normalized];
  next[sourcePosition] = target;
  next[targetPosition] = sectionId;
  return next;
}
