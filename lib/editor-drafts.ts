import { defaultCV, type CVData } from "@/lib/cv";
import { getCurrentUser } from "@/lib/auth";
import { getDefaultThemeId, getTemplateConfig } from "@/lib/templates/registry";
import { Prisma } from "@prisma/client";
import { normalizeStartSource } from "@/lib/start-source";
import { createCvDocumentForUser } from "@/lib/agency-access";

export type EditorUiLanguage = "nl" | "en";

export type CreateEditorDraftInput = {
  templateId?: string;
  uiLanguage: EditorUiLanguage;
  startSource?: string | null;
};

export async function createEditorDraft(input: CreateEditorDraftInput): Promise<string> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("AUTH_REQUIRED");
  }

  const templateId = getTemplateConfig(input.templateId || "professional").id;
  const colorThemeId = getDefaultThemeId(templateId);
  const cvData: CVData = {
    ...defaultCV,
    personal: {
      ...defaultCV.personal,
      resumeLanguage: input.uiLanguage,
    },
  };

  const cv = await createCvDocumentForUser({
    title: input.uiLanguage === "en" ? "My CV" : "Mijn CV",
    data: cvData,
    templateId,
    colorThemeId,
    userId: user.id,
    attribution: (user.attribution || undefined) as Prisma.InputJsonValue | undefined,
    sourceCluster: user.sourceCluster || null,
    sourceLocale: user.sourceLocale || input.uiLanguage,
    startSource: normalizeStartSource(input.startSource),
  });

  return cv.id;
}
