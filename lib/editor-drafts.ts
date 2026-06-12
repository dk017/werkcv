import { prisma } from "@/lib/prisma";
import { defaultCV, type CVData } from "@/lib/cv";
import { getCurrentUser } from "@/lib/auth";
import { getDefaultThemeId, getTemplateConfig } from "@/lib/templates/registry";

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

  const cv = await prisma.cVDocument.create({
    data: {
      title: input.uiLanguage === "en" ? "My CV" : "Mijn CV",
      data: cvData,
      templateId,
      colorThemeId,
      userId: user.id,
      startSource: input.startSource || null,
    },
  });

  return cv.id;
}
