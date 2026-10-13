import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCV } from "@/app/actions";
import { getEditorPathForLanguage } from "@/lib/editor-path";
import { prisma } from "@/lib/prisma";
import { getResumeLanguage, ResumeLanguage } from "@/lib/resume-language";
import PurchaseSuccessActions from "./PurchaseSuccessActions";
import { getCurrentUser } from "@/lib/auth";
import { isCvPhotoDataUrl } from "@/lib/profile-photo-cv";
import AppShell from "@/components/app/AppShell";
import { isAppV2Active } from "@/lib/app-v2";
import { appPaths } from "@/lib/app-v2-paths";

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
  // App on: never drop a signed-in user on the marketing home; the dashboard is home.
  const appHome = (await isAppV2Active()) ? appPaths(lang === "en" ? "en" : "nl").dashboard : null;
  if (!cvId) redirect(appHome ?? "/");

  const user = await getCurrentUser();
  if (!user) {
    const returnParams = new URLSearchParams({ cvId });
    if (lang === "en" || lang === "nl") returnParams.set("lang", lang);
    if (bundle === "profile-photo") returnParams.set("bundle", bundle);
    redirect(`/login?locale=${lang === "en" ? "en" : "nl"}&next=${encodeURIComponent(`/success?${returnParams}`)}`);
  }

  // Always authorise the requested CV, even when checkout returned a language.
  // This keeps arbitrary CV IDs from exposing payment metadata.
  const cv = await getCV(cvId, "personal");
  if (!cv) redirect(appHome ?? "/login");

  const requestedLanguage: ResumeLanguage | null = lang === "en" || lang === "nl" ? lang : null;
  const resolvedLanguage = requestedLanguage ?? getResumeLanguage(cv);
  const editorPath = getEditorPathForLanguage(resolvedLanguage, cvId);
  const hasProfilePhotoBundle = bundle === "profile-photo";
  const profilePhotoPath = appHome
    ? appPaths(resolvedLanguage).profilePhoto
    : resolvedLanguage === "en"
      ? "/en/profile-photo#profielfoto-tool"
      : "/profielfoto-cv-maken#profielfoto-tool";
  const paidOrder = await prisma.order.findFirst({
    where: { cvId, paidAt: { not: null } },
    orderBy: { paidAt: "desc" },
    select: { id: true, product: true, amountCents: true, currency: true },
  });
  // Offer the AI profile photo unless this person already bought one.
  const hasPaidProfilePhoto = Boolean(await prisma.profilePhotoProject.findFirst({
    where: { userId: user.id, status: "paid" },
    select: { id: true },
  }));
  const cvPhoto = isCvPhotoDataUrl(cv.personal.photo) ? cv.personal.photo : null;

  const actions = (
    <PurchaseSuccessActions
      cvId={cvId}
      language={resolvedLanguage}
      editorPath={editorPath}
      profilePhotoPath={profilePhotoPath}
      hasProfilePhotoBundle={hasProfilePhotoBundle}
      initialOrder={paidOrder}
      profilePhotoOffer={hasProfilePhotoBundle || hasPaidProfilePhoto ? null : { cvPhoto }}
      inApp={Boolean(appHome)}
    />
  );

  if (appHome) {
    return (
      <AppShell active="cvs" locale={resolvedLanguage}>
        <main className="flex justify-center px-4 py-10 sm:py-16">
          <div className="w-full max-w-xl rounded-2xl border border-[var(--wk-border)] bg-[var(--wk-surface)] p-8 text-center shadow-[var(--wk-shadow-md)]">
            {actions}
          </div>
        </main>
      </AppShell>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-xl rounded-xl bg-white p-8 text-center shadow-lg">
        {actions}
      </div>
    </div>
  );
}
