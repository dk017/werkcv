import { redirect } from "next/navigation";
import { getCVWithSettings } from "@/app/actions";
import CoverLetterEditor from "@/app/cover-letter/CoverLetterEditor";
import { getCurrentUser } from "@/lib/auth";
import { isAppV2Active } from "@/lib/app-v2";
import { appPaths } from "@/lib/app-v2-paths";

export default async function EnglishCoverLetterPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const user = await getCurrentUser();
  const next = id ? `/en/cover-letter?id=${encodeURIComponent(id)}` : "/en/editor";
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);
  // App on: the cover letter lives in the app workspace, so stay inside the app frame.
  if (await isAppV2Active()) redirect(id ? appPaths("en").coverLetter(id) : appPaths("en").letters);
  if (!id) redirect("/en/templates");

  const cv = await getCVWithSettings(id, "personal");
  if (!cv) redirect("/en/templates");

  return <CoverLetterEditor cvId={id} initialTargetRole={cv.data.personal.title} uiLanguage="en" />;
}
