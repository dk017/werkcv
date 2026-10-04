import type { Metadata } from "next";
import { redirect } from "next/navigation";
import PublicEditorSection from "@/components/public-editor/PublicEditorSection";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Verbeter je cv na de CV-check | WerkCV",
  robots: { index: false, follow: false },
};

// "Verbeter in de editor" from the CV-check. Visitors without an account edit their checked CV here
// and only sign in at download; signed-in visitors keep their account editor.
export default async function CvCheckImprovePage({ searchParams }: { searchParams: Promise<{ upload?: string; handoff?: string }> }) {
  const { upload, handoff } = await searchParams;
  // A link from an AI assistant (MCP) carries a one-time token that only the public editor can open.
  const handoffToken = typeof handoff === "string" && /^[A-Za-z0-9_-]{43}$/.test(handoff) ? handoff : null;
  if (!handoffToken && (await getCurrentUser())) {
    redirect(`/editor?template=professional&startSource=cv_check${upload === "1" ? "&upload=1" : ""}`);
  }

  return (
    <main>
      <PublicEditorSection locale="nl" source="public_editor_cv_check_nl" variant="cv_check" importCheckedCv={upload === "1"} handoffToken={handoffToken} />
    </main>
  );
}
