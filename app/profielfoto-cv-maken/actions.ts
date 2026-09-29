"use server";

import { Prisma } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth";
import { cvSchema } from "@/lib/cv";
import { saveCvDocumentWithMeaningfulState } from "@/lib/cv-meaningful-persistence";
import { createEditorDraft } from "@/lib/editor-drafts";
import { getEditorPathForLanguage } from "@/lib/editor-path";
import { prisma } from "@/lib/prisma";
import { isCvPhotoDataUrl } from "@/lib/profile-photo-cv";
import { authorizeCvDocument } from "@/lib/workspace/cv-authorization";

type CvPhotoResult = { ok: true; photo: string | null } | { ok: false; error: "AUTH_REQUIRED" | "NOT_FOUND" };

/** The photo already on the CV the person came from, to start the AI photo from. */
export async function getCvPhotoForProfilePhoto(cvId: string): Promise<CvPhotoResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "AUTH_REQUIRED" };
  try {
    const cv = await authorizeCvDocument(user.id, cvId, "read");
    if (cv.workspace.kind !== "personal") return { ok: false, error: "NOT_FOUND" };
    const parsed = cvSchema.safeParse(cv.data);
    const photo = parsed.success ? parsed.data.personal.photo : "";
    return { ok: true, photo: isCvPhotoDataUrl(photo) ? photo : null };
  } catch {
    return { ok: false, error: "NOT_FOUND" };
  }
}

type ApplyResult =
  | { ok: true; editorPath: string }
  | { ok: false; error: "AUTH_REQUIRED" | "NOT_PAID" | "INVALID_PHOTO" | "CV_NOT_FOUND" | "SAVE_FAILED" };

/**
 * Put a paid AI profile photo on a CV: the CV the person came from, or a new CV when they came
 * from elsewhere. The photo is the selected variant, cropped to the editor's CV photo format in
 * the browser; the server checks ownership of both the photo project and the CV.
 */
export async function applyProfilePhotoToCv(input: {
  projectId: string;
  cvId: string | null;
  photoDataUrl: string;
  locale: "nl" | "en";
}): Promise<ApplyResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "AUTH_REQUIRED" };
  if (!isCvPhotoDataUrl(input.photoDataUrl)) return { ok: false, error: "INVALID_PHOTO" };

  const project = await prisma.profilePhotoProject.findFirst({
    where: { id: input.projectId, userId: user.id },
    select: { status: true },
  });
  if (project?.status !== "paid") return { ok: false, error: "NOT_PAID" };

  let cvId = input.cvId;
  if (!cvId) {
    try {
      cvId = await createEditorDraft({ templateId: "professional", uiLanguage: input.locale, startSource: "profile_photo" });
    } catch {
      return { ok: false, error: "SAVE_FAILED" };
    }
  }

  try {
    const cv = await authorizeCvDocument(user.id, cvId, "edit_content");
    if (cv.workspace.kind !== "personal") return { ok: false, error: "CV_NOT_FOUND" };
    const parsed = cvSchema.safeParse(cv.data);
    if (!parsed.success) return { ok: false, error: "SAVE_FAILED" };
    const data = { ...parsed.data, personal: { ...parsed.data.personal, photo: input.photoDataUrl } };
    const saved = await saveCvDocumentWithMeaningfulState({
      id: cvId,
      // Only overwrite the version we just read; a concurrent editor save wins and we report failure.
      where: { id: cvId, userId: user.id, agencySubscriptionId: null, data: { equals: cv.data as Prisma.InputJsonValue } },
      data,
      source: "manual_save",
      uiLanguage: data.personal.resumeLanguage ?? input.locale,
    });
    if (!saved.success) return { ok: false, error: "SAVE_FAILED" };
    return { ok: true, editorPath: getEditorPathForLanguage(data.personal.resumeLanguage ?? input.locale, cvId) };
  } catch {
    return { ok: false, error: "CV_NOT_FOUND" };
  }
}
