import type { Metadata } from "next";
import { redirect } from "next/navigation";
import PublicEditorSection from "@/components/public-editor/PublicEditorSection";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Improve your CV after the CV check | WerkCV",
  robots: { index: false, follow: false },
};

// "Improve in the editor" from the CV check. Visitors without an account edit their checked CV here
// and only sign in at download; signed-in visitors keep their account editor.
export default async function EnglishCvCheckImprovePage({ searchParams }: { searchParams: Promise<{ upload?: string }> }) {
  const { upload } = await searchParams;
  if (await getCurrentUser()) {
    redirect(`/en/editor?template=professional&startSource=cv_check_en${upload === "1" ? "&upload=1" : ""}`);
  }

  return (
    <main>
      <PublicEditorSection locale="en" source="public_editor_cv_check_en" variant="cv_check" importCheckedCv={upload === "1"} />
    </main>
  );
}
