import type { CVData } from "./cv";
import { CV_BODY_SECTION_IDS, cvSectionHasSubstantiveContent } from "./cv-sections";

/**
 * A CV can contain a real identity, link, or photo before it has a complete
 * body. That is still user-authored content and must replace the fictional
 * template preview immediately.
 */
export function hasAnyCvUserContent(data: CVData): boolean {
  const personal = data.personal ?? {};
  const hasPersonalValue = Object.entries(personal).some(([key, value]) => (
    key !== "resumeLanguage"
      && typeof value === "string"
      && value.trim().length > 0
  ));

  return hasPersonalValue || CV_BODY_SECTION_IDS.some((sectionId) => (
    cvSectionHasSubstantiveContent(data, sectionId)
  ));
}

export function isCvEmpty(data: CVData): boolean {
  return !hasAnyCvUserContent(data);
}
