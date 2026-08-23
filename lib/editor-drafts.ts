import { defaultCV, type CVData } from "@/lib/cv";
import { getCurrentUser } from "@/lib/auth";
import { getDefaultThemeId, getTemplateConfig } from "@/lib/templates/registry";
import { Prisma } from "@prisma/client";
import { normalizeStartSource } from "@/lib/start-source";
import { createMatchPackCvDocument, createPersonalCvDocument } from "@/lib/workspace/cv-document-service";
import {
  AgencyAccessError,
  canCreateAgencyWork,
  getAgencyAccessForUser,
} from "@/lib/agency-access";

export type EditorUiLanguage = "nl" | "en";

export type CreateEditorDraftInput = {
  templateId?: string;
  uiLanguage: EditorUiLanguage;
  startSource?: string | null;
  workspace?: "consumer" | "agency";
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

  const workspace = input.workspace || "consumer";
  if (workspace === "agency") {
    const access = await getAgencyAccessForUser(user.id);
    if (access.state !== "active" || !access.ownerUserId) {
      throw new AgencyAccessError("AGENCY_SUBSCRIPTION_INACTIVE", "An active Agency subscription is required.");
    }
    if (!canCreateAgencyWork(access)) {
      throw new AgencyAccessError("AGENCY_SUBSCRIPTION_INACTIVE", "Your Agency role cannot create new CVs.");
    }
  }

  const data = {
    title: input.uiLanguage === "en" ? "My CV" : "Mijn CV",
    data: cvData,
    templateId,
    colorThemeId,
    attribution: (user.attribution || undefined) as Prisma.InputJsonValue | undefined,
    sourceCluster: user.sourceCluster || null,
    sourceLocale: user.sourceLocale || input.uiLanguage,
    startSource: normalizeStartSource(input.startSource),
  } as Omit<Prisma.CVDocumentUncheckedCreateInput, "userId" | "agencySubscriptionId">;

  const cv = workspace === "agency"
    ? await createMatchPackCvDocument(user.id, data)
    : await createPersonalCvDocument(user.id, data);

  return cv.id;
}
