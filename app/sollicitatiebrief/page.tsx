import { redirect } from "next/navigation";
import { getCVWithSettings } from "@/app/actions";
import CoverLetterEditor from "@/app/cover-letter/CoverLetterEditor";
import { getCurrentUser } from "@/lib/auth";

export default async function CoverLetterPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const user = await getCurrentUser();
  const next = id ? `/sollicitatiebrief?id=${encodeURIComponent(id)}` : "/mijn-cvs";
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);
  if (!id) redirect("/mijn-cvs");

  const cv = await getCVWithSettings(id);
  if (!cv) redirect("/mijn-cvs");

  return <CoverLetterEditor cvId={id} initialTargetRole={cv.data.personal.title} uiLanguage="nl" />;
}
