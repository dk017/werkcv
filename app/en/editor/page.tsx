import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getCVWithSettings } from "@/app/actions";
import Editor from "@/app/editor/editor";
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

export default async function EnglishEditorPage({
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
      ? `/en/editor?id=${encodeURIComponent(id)}${uploadRequested ? "&upload=1" : ""}`
      : templateId
        ? `/en/editor?template=${encodeURIComponent(templateId)}&startSource=${encodeURIComponent(resolvedStartSource)}${uploadRequested ? "&upload=1" : ""}`
        : `/en/editor?template=professional&startSource=${encodeURIComponent(resolvedStartSource)}${uploadRequested ? "&upload=1" : ""}`;
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }

  if (!id) {
    const draftTemplateId = templateId || (uploadRequested ? "professional" : null);
    if (!draftTemplateId) {
      redirect(`/en/templates?startSource=${encodeURIComponent(resolvedStartSource)}`);
    }

    const cvId = await createEditorDraft({
      templateId: draftTemplateId,
      uiLanguage: "en",
      startSource: resolvedStartSource,
    });
    redirect(`/en/editor?id=${encodeURIComponent(cvId)}${uploadRequested ? "&upload=1" : ""}`);
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
