import { redirect } from "next/navigation";
import { getCVWithSettings } from "../actions";
import { getCurrentUser } from "@/lib/auth";
import Editor from "./editor";
import { createEditorDraft } from "@/lib/editor-drafts";

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

    if (!user) {
        const next = id
            ? `/editor?id=${encodeURIComponent(id)}`
            : templateId
                ? `/editor?template=${encodeURIComponent(templateId)}${startSource ? `&startSource=${encodeURIComponent(startSource)}` : ""}`
                : "/editor?template=professional";
        redirect(`/login?next=${encodeURIComponent(next)}`);
    }

    if (!id) {
        if (!templateId) {
            redirect(`/templates`);
        }

        const cvId = await createEditorDraft({
            templateId,
            uiLanguage: "nl",
            startSource: startSource || null,
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
