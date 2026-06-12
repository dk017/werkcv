import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getCVWithSettings } from "@/app/actions";
import Editor from "@/app/editor/editor";
import { createEditorDraft } from "@/lib/editor-drafts";

function normalizeTemplateId(value: string | string[] | undefined): string | null {
  const template = Array.isArray(value) ? value[0] : value;
  return typeof template === "string" && template.length > 0 ? template : null;
}

export default async function EnglishEditorPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; template?: string; startSource?: string }>;
}) {
  const { id, template, startSource } = await searchParams;
  const user = await getCurrentUser();
  const templateId = normalizeTemplateId(template);

  if (!user) {
    const next = id
      ? `/en/editor?id=${encodeURIComponent(id)}`
      : templateId
        ? `/en/editor?template=${encodeURIComponent(templateId)}${startSource ? `&startSource=${encodeURIComponent(startSource)}` : ""}`
        : "/en/editor?template=classical";
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }

  if (!id) {
    if (!templateId) {
      redirect("/en/templates");
    }

    const cvId = await createEditorDraft({
      templateId,
      uiLanguage: "en",
      startSource: startSource || null,
    });
    redirect(`/en/editor?id=${encodeURIComponent(cvId)}`);
  }

  const cv = await getCVWithSettings(id);

  if (!cv) {
    redirect("/en/templates");
  }

  return (
    <Editor
      initialData={cv.data}
      id={id}
      initialTemplateId={cv.templateId}
      initialColorThemeId={cv.colorThemeId}
      uiLanguage="en"
    />
  );
}
