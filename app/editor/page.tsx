import { redirect } from "next/navigation";
import { getCVWithSettings } from "../actions";
import { getCurrentUser } from "@/lib/auth";
import Editor from "./editor";
import { createEditorDraft } from "@/lib/editor-drafts";
import { cookies } from "next/headers";
import { normalizeStartSource, PENDING_START_SOURCE_COOKIE, readEncodedStartSource } from "@/lib/start-source";

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
    searchParams: Promise<{ id?: string; template?: string; startSource?: string; upload?: string }>;
}) {
    const { id, template, startSource, upload } = await searchParams;
    const user = await getCurrentUser();
    const templateId = normalizeTemplateId(template);
    const uploadRequested = isUploadRequested(upload);
    const cookieStore = await cookies();
    const resolvedStartSource =
        normalizeStartSource(startSource) ||
        readEncodedStartSource(cookieStore.get(PENDING_START_SOURCE_COOKIE)?.value) ||
        "editor_direct";

    if (!user) {
        const next = id
            ? `/editor?id=${encodeURIComponent(id)}${uploadRequested ? "&upload=1" : ""}`
            : templateId
                ? `/editor?template=${encodeURIComponent(templateId)}&startSource=${encodeURIComponent(resolvedStartSource)}${uploadRequested ? "&upload=1" : ""}`
                : `/editor?template=professional&startSource=${encodeURIComponent(resolvedStartSource)}${uploadRequested ? "&upload=1" : ""}`;
        redirect(`/login?next=${encodeURIComponent(next)}`);
    }

    if (!id) {
        const draftTemplateId = templateId || (uploadRequested ? "professional" : null);
        if (!draftTemplateId) {
            redirect(`/templates?startSource=${encodeURIComponent(resolvedStartSource)}`);
        }

        const cvId = await createEditorDraft({
            templateId: draftTemplateId,
            uiLanguage: "nl",
            startSource: resolvedStartSource,
        });
        redirect(`/editor?id=${encodeURIComponent(cvId)}${uploadRequested ? "&upload=1" : ""}`);
    }

    const cv = await getCVWithSettings(id);

    if (!cv) {
        // CV not found, redirect to template selection
        redirect(`/templates`);
    }

    return (
        <Editor
            initialData={cv.data}
            id={id}
            initialTemplateId={cv.templateId}
            initialColorThemeId={cv.colorThemeId}
            accountEmail={user.email}
            uiLanguage="nl"
        />
    );
}
