import { defaultCV, type CVData } from "@/lib/cv";
import { getCurrentUser } from "@/lib/auth";
import { getDefaultThemeId, getTemplateConfig } from "@/lib/templates/registry";
import { Prisma } from "@prisma/client";
import { normalizeStartSource } from "@/lib/start-source";
import {
  normalizeEnglishRoleExampleStartSource,
} from "@/lib/english-role-examples";
import { createMatchPackCvDocument, createPersonalCvDocument } from "@/lib/workspace/cv-document-service";
import { recordEnglishRoleExampleCvCreated } from "@/lib/english-role-example-events";
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

  const rawStartSource = typeof input.startSource === "string" ? input.startSource : "";
  const roleExampleStartSource = normalizeEnglishRoleExampleStartSource(rawStartSource);
  const safeStartSource = roleExampleStartSource
    || (rawStartSource.toLowerCase().startsWith("en_role_example_") ? null : normalizeStartSource(rawStartSource));

  const data = {
    title: input.uiLanguage === "en" ? "My CV" : "Mijn CV",
    data: cvData,
    templateId,
    colorThemeId,
    attribution: (user.attribution || undefined) as Prisma.InputJsonValue | undefined,
    sourceCluster: user.sourceCluster || null,
    sourceLocale: user.sourceLocale || input.uiLanguage,
    startSource: safeStartSource,
  } as Omit<Prisma.CVDocumentUncheckedCreateInput, "userId" | "agencySubscriptionId">;

  const cv = workspace === "agency"
    ? await createMatchPackCvDocument(user.id, data)
    : await createPersonalCvDocument(user.id, data);

  await recordEnglishRoleExampleCvCreated({
    cvId: cv.id,
    templateId,
    startSource: safeStartSource,
    uiLanguage: input.uiLanguage,
  });

  return cv.id;
}
