import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getCVWithSettings } from "@/app/actions";
import Editor from "@/app/editor/editor";

export default async function EnglishEditorPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const user = await getCurrentUser();

  if (!user) {
    const next = id ? `/en/editor?id=${encodeURIComponent(id)}` : "/en/templates";
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }

  if (!id) {
    redirect("/en/templates");
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
