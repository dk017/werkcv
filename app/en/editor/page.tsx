import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getCVWithSettings } from "@/app/actions";
import Editor from "@/app/editor/editor";
import { createEditorDraft } from "@/lib/editor-drafts";
import { cookies } from "next/headers";
import { normalizeStartSource, PENDING_START_SOURCE_COOKIE, readEncodedStartSource } from "@/lib/start-source";
import { normalizeEnglishRoleExampleStartSource } from "@/lib/english-role-examples";
import { isAgencyAccessError } from "@/lib/agency-access";
import { getWorkspaceEntitlementsForUser, isWorkspaceSwitcherEnabled } from "@/lib/workspace/entitlements";
import type { Metadata } from "next";
import { normalizeEditorFocus } from "@/lib/editor-focus";

export const metadata: Metadata = {
  title: "English CV Editor for the Netherlands | WerkCV",
  description: "Build, edit and preview your English CV for jobs in the Netherlands.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

function normalizeTemplateId(value: string | string[] | undefined): string | null {
  const template = Array.isArray(value) ? value[0] : value;
  return typeof template === "string" && template.length > 0 ? template : null;
}

function isUploadRequested(value: string | string[] | undefined): boolean {
  const upload = Array.isArray(value) ? value[0] : value;
  return upload === "1";
}

export default async function EnglishEditorPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; template?: string; startSource?: string; upload?: string; workspace?: string; downloadIntent?: string; focus?: string }>;
}) {
  const { id, template, startSource, upload, workspace, downloadIntent, focus } = await searchParams;
  const user = await getCurrentUser();
  const templateId = normalizeTemplateId(template);
  const uploadRequested = isUploadRequested(upload);
  const resolvedFocus = normalizeEditorFocus(focus);
  const cookieStore = await cookies();
  const rawStartSource = typeof startSource === "string" ? startSource : "";
  const roleStartSource = normalizeEnglishRoleExampleStartSource(rawStartSource);
  const resolvedStartSource =
    roleStartSource ||
    (rawStartSource.toLowerCase().startsWith("en_role_example_") ? null : normalizeStartSource(startSource)) ||
    readEncodedStartSource(cookieStore.get(PENDING_START_SOURCE_COOKIE)?.value) ||
    "editor_direct";

  if (!user) {
    const nextParams = new URLSearchParams();
    if (id) nextParams.set("id", id);
    nextParams.set("template", templateId || "professional");
    nextParams.set("startSource", resolvedStartSource);
    if (resolvedFocus) nextParams.set("focus", resolvedFocus);
    if (uploadRequested) nextParams.set("upload", "1");
    if (workspace === "agency") nextParams.set("workspace", "agency");
    if (downloadIntent === "1") nextParams.set("downloadIntent", "1");
    const next = `/en/editor?${nextParams.toString()}`;
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }

  if (!id) {
    const draftTemplateId = templateId || "professional";

    let cvId: string;
    try {
      cvId = await createEditorDraft({
        templateId: draftTemplateId,
        uiLanguage: "en",
        startSource: resolvedStartSource,
        workspace: workspace === "agency" ? "agency" : "consumer",
      });
    } catch (error) {
      if (isAgencyAccessError(error)) {
        redirect(`/agency/account?error=${encodeURIComponent(error.code)}`);
      }
      throw error;
    }
    const editorParams = new URLSearchParams({
      id: cvId,
      template: draftTemplateId,
      startSource: resolvedStartSource,
    });
    if (resolvedFocus) editorParams.set("focus", resolvedFocus);
    if (uploadRequested) editorParams.set("upload", "1");
    if (downloadIntent === "1") editorParams.set("downloadIntent", "1");
    redirect(`/en/editor?${editorParams.toString()}`);
  }

  const cv = await getCVWithSettings(id);

  if (!cv) {
    redirect("/en/templates");
  }

  const workspaceEntitlements = await getWorkspaceEntitlementsForUser(user.id);
  return (
    <Editor
      initialData={cv.data}
      id={id}
      initialTemplateId={cv.templateId}
      initialColorThemeId={cv.colorThemeId}
      accountEmail={user.email}
      uiLanguage="en"
      agencyRouteLocked={cv.agencyRouteLocked}
      workspaceEntitlements={workspaceEntitlements}
      workspaceSwitcherEnabled={isWorkspaceSwitcherEnabled(workspaceEntitlements)}
      workspaceContext={cv.workspaceContext}
    />
  );
}
