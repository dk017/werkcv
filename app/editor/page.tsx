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

export default async function EditorPage({
    searchParams,
}: {
    searchParams: Promise<{ id?: string; template?: string; startSource?: string }>;
}) {
    const { id, template, startSource } = await searchParams;
    const user = await getCurrentUser();
    const templateId = normalizeTemplateId(template);
    const cookieStore = await cookies();
    const resolvedStartSource =
        normalizeStartSource(startSource) ||
        readEncodedStartSource(cookieStore.get(PENDING_START_SOURCE_COOKIE)?.value) ||
        "editor_direct";

    if (!user) {
        const next = id
            ? `/editor?id=${encodeURIComponent(id)}`
            : templateId
                ? `/editor?template=${encodeURIComponent(templateId)}&startSource=${encodeURIComponent(resolvedStartSource)}`
                : `/editor?template=professional&startSource=${encodeURIComponent(resolvedStartSource)}`;
        redirect(`/login?next=${encodeURIComponent(next)}`);
    }

    if (!id) {
        if (!templateId) {
            redirect(`/templates?startSource=${encodeURIComponent(resolvedStartSource)}`);
        }

        const cvId = await createEditorDraft({
            templateId,
            uiLanguage: "nl",
            startSource: resolvedStartSource,
        });
        redirect(`/editor?id=${encodeURIComponent(cvId)}`);
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
            uiLanguage="nl"
        />
    );
}
