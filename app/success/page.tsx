import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCV } from "@/app/actions";
import { getEditorPathForLanguage } from "@/lib/editor-path";
import { prisma } from "@/lib/prisma";
import { getResumeLanguage, ResumeLanguage } from "@/lib/resume-language";
import PurchaseSuccessActions from "./PurchaseSuccessActions";

export const metadata: Metadata = {
  title: "Betaling Geslaagd - WerkCV",
  description: "Je betaling is geslaagd. Download nu je professionele CV als PDF.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ cvId?: string; lang?: string; bundle?: string }>;
}) {
  const { cvId, lang, bundle } = await searchParams;
  if (!cvId) redirect("/");

  // Always authorise the requested CV, even when checkout returned a language.
  // This keeps arbitrary CV IDs from exposing payment metadata.
  const cv = await getCV(cvId, "personal");
  if (!cv) redirect("/login");

  const requestedLanguage: ResumeLanguage | null = lang === "en" || lang === "nl" ? lang : null;
  const resolvedLanguage = requestedLanguage ?? getResumeLanguage(cv);
  const editorPath = getEditorPathForLanguage(resolvedLanguage, cvId);
  const hasProfilePhotoBundle = bundle === "profile-photo";
  const profilePhotoPath = resolvedLanguage === "en"
    ? "/en/profile-photo#profielfoto-tool"
    : "/profielfoto-cv-maken#profielfoto-tool";
  const paidOrder = await prisma.order.findFirst({
    where: { cvId, paidAt: { not: null } },
    orderBy: { paidAt: "desc" },
    select: { id: true, product: true, amountCents: true, currency: true },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-xl rounded-xl bg-white p-8 text-center shadow-lg">
        <PurchaseSuccessActions
          cvId={cvId}
          language={resolvedLanguage}
          editorPath={editorPath}
          profilePhotoPath={profilePhotoPath}
          hasProfilePhotoBundle={hasProfilePhotoBundle}
          initialOrder={paidOrder}
        />
      </div>
    </div>
  );
}
