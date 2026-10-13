import { redirect } from "next/navigation";
import AppShell from "@/components/app/AppShell";
import ProfilePhotoGenerator from "@/app/profielfoto-cv-maken/ProfilePhotoGenerator";
import { getCurrentUser } from "@/lib/auth";
import { isAppV2Active } from "@/lib/app-v2";
import { appPaths, type AppLocale } from "@/lib/app-v2-paths";
import { profilePhotoPrice } from "@/lib/site-content";

// The public profile photo page keeps its SEO content; this is the same tool inside the app frame.
export default async function ProfilePhotoScreen({ locale, searchParams }: { locale: AppLocale; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const paths = appPaths(locale);
  const query = new URLSearchParams(Object.entries(await searchParams).flatMap(([key, value]) => typeof value === "string" ? [[key, value]] : []));
  const suffix = query.size ? `?${query}` : "";
  if (!(await isAppV2Active())) redirect(`${paths.publicTools.profilePhoto}${suffix}`);
  const user = await getCurrentUser();
  if (!user) redirect(`/login?locale=${locale}&next=${encodeURIComponent(`${paths.profilePhoto}${suffix}`)}`);
  const en = locale === "en";

  return (
    <AppShell active="profilePhoto" locale={locale}>
      <main className="mx-auto flex max-w-[1100px] flex-col gap-5 px-4 py-8 sm:px-8 sm:py-10">
        <header>
          <h1 className="text-[28px] font-extrabold tracking-tight text-[var(--wk-ink)]">{en ? "Profile photo" : "Profielfoto"}</h1>
          <p className="mt-1 max-w-[640px] text-sm leading-relaxed text-[var(--wk-ink-muted)]">
            {en
              ? `Turn a selfie or regular photo into a professional CV photo. You see the results for free first; to download, you pay ${profilePhotoPrice.displayEn} once.`
              : `Maak van een selfie of gewone foto een zakelijke CV-foto. Je ziet de resultaten eerst gratis; downloaden kost eenmalig ${profilePhotoPrice.display}.`}
          </p>
        </header>
        <ProfilePhotoGenerator uiLanguage={locale} context="app" />
      </main>
    </AppShell>
  );
}
