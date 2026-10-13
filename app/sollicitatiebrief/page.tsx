import { redirect } from "next/navigation";
import { getCVWithSettings } from "@/app/actions";
import CoverLetterEditor from "@/app/cover-letter/CoverLetterEditor";
import { getCurrentUser } from "@/lib/auth";
import { isAppV2Active } from "@/lib/app-v2";
import { appPaths } from "@/lib/app-v2-paths";

export default async function CoverLetterPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const user = await getCurrentUser();
  const next = id ? `/sollicitatiebrief?id=${encodeURIComponent(id)}` : "/mijn-cvs";
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);
  // App on: the cover letter lives in the app workspace, so stay inside the app frame.
  if (await isAppV2Active()) redirect(id ? appPaths("nl").coverLetter(id) : appPaths("nl").letters);
  if (!id) redirect("/mijn-cvs");

  const cv = await getCVWithSettings(id, "personal");
  if (!cv) redirect("/mijn-cvs");

  return <CoverLetterEditor cvId={id} initialTargetRole={cv.data.personal.title} uiLanguage="nl" />;
}
