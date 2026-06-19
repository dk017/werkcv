import { redirect } from "next/navigation";
import { getCVWithSettings } from "@/app/actions";
import CoverLetterEditor from "@/app/cover-letter/CoverLetterEditor";
import { getCurrentUser } from "@/lib/auth";

export default async function EnglishCoverLetterPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const user = await getCurrentUser();
  const next = id ? `/en/cover-letter?id=${encodeURIComponent(id)}` : "/en/editor";
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);
  if (!id) redirect("/en/templates");

  const cv = await getCVWithSettings(id);
  if (!cv) redirect("/en/templates");

  return <CoverLetterEditor cvId={id} initialTargetRole={cv.data.personal.title} uiLanguage="en" />;
}
