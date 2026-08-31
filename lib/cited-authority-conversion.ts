import type { EditorFocusTarget } from "@/lib/editor-focus";

export const citedAuthorityIntentIds = [
  "skills",
  "profile",
  "english_cv",
  "student_cv",
  "admin_cv",
] as const;

export const citedAuthoritySourceIds = [
  "cited_authority_skills",
  "cited_authority_profile",
  "cited_authority_english_cv",
  "cited_authority_student_example",
  "cited_authority_admin_example",
  "cited_authority_admin_template",
] as const;

export type CitedAuthorityIntentId = (typeof citedAuthorityIntentIds)[number];
export type CitedAuthoritySourceId = (typeof citedAuthoritySourceIds)[number];

export type CitedAuthorityRouteConfig = {
  canonicalPath: string;
  intentId: CitedAuthorityIntentId;
  startSource: CitedAuthoritySourceId;
  landingLocale: "nl" | "en";
  editorUiLanguage: "nl" | "en";
  resumeLanguage: "nl" | "en";
  destination: "blank_editor" | "fictional_example";
  editorPath: "/editor" | "/en/editor";
  templateId: string;
  focus?: EditorFocusTarget;
  placement:
    | "after_first_examples"
    | "after_structure_section"
    | "after_hero"
    | "after_template_comparison";
};

export const citedAuthorityRouteConfigs = [
  {
    canonicalPath: "/vaardigheden-cv-voorbeelden",
    intentId: "skills",
    startSource: "cited_authority_skills",
    landingLocale: "nl",
    editorUiLanguage: "nl",
    resumeLanguage: "nl",
    destination: "blank_editor",
    editorPath: "/editor",
    templateId: "professional",
    focus: "skills",
    placement: "after_first_examples",
  },
  {
    canonicalPath: "/profieltekst-cv-voorbeelden",
    intentId: "profile",
    startSource: "cited_authority_profile",
    landingLocale: "nl",
    editorUiLanguage: "nl",
    resumeLanguage: "nl",
    destination: "blank_editor",
    editorPath: "/editor",
    templateId: "professional",
    focus: "profile",
    placement: "after_first_examples",
  },
  {
    canonicalPath: "/cv-tips/cv-maken-in-het-engels",
    intentId: "english_cv",
    startSource: "cited_authority_english_cv",
    landingLocale: "nl",
    editorUiLanguage: "en",
    resumeLanguage: "en",
    destination: "blank_editor",
    editorPath: "/en/editor",
    templateId: "professional",
    focus: "profile",
    placement: "after_structure_section",
  },
  {
    canonicalPath: "/cv-voorbeelden/studenten-en-starters/student-cv",
    intentId: "student_cv",
    startSource: "cited_authority_student_example",
    landingLocale: "nl",
    editorUiLanguage: "nl",
    resumeLanguage: "nl",
    destination: "fictional_example",
    editorPath: "/editor",
    templateId: "jobboss",
    focus: undefined,
    placement: "after_hero",
  },
  {
    canonicalPath: "/cv-voorbeelden/zakelijk-en-financieel/administratief-medewerker",
    intentId: "admin_cv",
    startSource: "cited_authority_admin_example",
    landingLocale: "nl",
    editorUiLanguage: "nl",
    resumeLanguage: "nl",
    destination: "fictional_example",
    editorPath: "/editor",
    templateId: "professional",
    focus: undefined,
    placement: "after_hero",
  },
  {
    canonicalPath: "/cv-template-administratief-medewerker",
    intentId: "admin_cv",
    startSource: "cited_authority_admin_template",
    landingLocale: "nl",
    editorUiLanguage: "nl",
    resumeLanguage: "nl",
    destination: "fictional_example",
    editorPath: "/editor",
    templateId: "professional",
    focus: undefined,
    placement: "after_template_comparison",
  },
] as const satisfies readonly CitedAuthorityRouteConfig[];

export function getCitedAuthorityRouteConfig(
  canonicalPath: string,
): CitedAuthorityRouteConfig | null {
  return citedAuthorityRouteConfigs.find((config) => config.canonicalPath === canonicalPath) ?? null;
}

export function buildCitedAuthorityEditorHref(config: CitedAuthorityRouteConfig): string {
  const params = new URLSearchParams();
  params.set("template", config.templateId);
  params.set("startSource", config.startSource);
  if (config.focus) params.set("focus", config.focus);
  return `${config.editorPath}?${params.toString()}`;
}
