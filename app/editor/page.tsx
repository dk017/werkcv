import { redirect } from "next/navigation";
import CvUnavailable from "@/components/CvUnavailable";
import { getCVWithSettings } from "../actions";
import { getCurrentUser } from "@/lib/auth";
import Editor from "./editor";
import { createEditorDraft } from "@/lib/editor-drafts";
import { cookies } from "next/headers";
import { normalizeStartSource, PENDING_START_SOURCE_COOKIE, readEncodedStartSource } from "@/lib/start-source";
import { isAgencyAccessError } from "@/lib/agency-access";
import { getWorkspaceEntitlementsForUser, isWorkspaceSwitcherEnabled } from "@/lib/workspace/entitlements";
import { normalizeEditorFocus } from "@/lib/editor-focus";
import { consumerAiEnabled } from "@/lib/consumer-ai-availability";

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

export default async function EditorPage({
    searchParams,
}: {
    searchParams: Promise<{ id?: string; template?: string; startSource?: string; upload?: string; workspace?: string; focus?: string; downloadIntent?: string }>;
}) {
    const { id, template, startSource, upload, workspace, focus, downloadIntent } = await searchParams;
    const user = await getCurrentUser();
    const templateId = normalizeTemplateId(template);
    const uploadRequested = isUploadRequested(upload);
    const resolvedFocus = normalizeEditorFocus(focus);
    const cookieStore = await cookies();
    const resolvedStartSource =
        normalizeStartSource(startSource) ||
        readEncodedStartSource(cookieStore.get(PENDING_START_SOURCE_COOKIE)?.value) ||
        "editor_direct";

    if (!user) {
        const nextParams = new URLSearchParams();
        if (id) nextParams.set("id", id);
        nextParams.set("template", templateId || "professional");
        nextParams.set("startSource", resolvedStartSource);
        if (resolvedFocus) nextParams.set("focus", resolvedFocus);
        if (uploadRequested) nextParams.set("upload", "1");
        if (downloadIntent === "1") nextParams.set("downloadIntent", "1");
        if (workspace === "agency") nextParams.set("workspace", "agency");
        const next = `/editor?${nextParams.toString()}`;
        redirect(`/login?next=${encodeURIComponent(next)}`);
    }

    if (!id) {
        const draftTemplateId = templateId || "professional";

        let cvId: string;
        try {
            cvId = await createEditorDraft({
                templateId: draftTemplateId,
                uiLanguage: "nl",
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
        redirect(`/editor?${editorParams.toString()}`);
    }

    const cv = await getCVWithSettings(id);

    if (!cv) {
        return <CvUnavailable locale="nl" />;
    }

    const workspaceEntitlements = await getWorkspaceEntitlementsForUser(user.id);
    return (
        <Editor
            key={id}
            initialContentVersion={cv.contentVersion}
            aiReviewEnabled={consumerAiEnabled() && !cv.agencyRouteLocked}
            initialData={cv.data}
            id={id}
            initialTemplateId={cv.templateId}
      initialColorThemeId={cv.colorThemeId}
      accountEmail={user.email}
      uiLanguage="nl"
      agencyRouteLocked={cv.agencyRouteLocked}
      workspaceContext={cv.workspaceContext}
      workspaceEntitlements={workspaceEntitlements}
      workspaceSwitcherEnabled={isWorkspaceSwitcherEnabled(workspaceEntitlements)}
    />
    );
}
