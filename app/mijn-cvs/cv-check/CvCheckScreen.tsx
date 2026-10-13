import { redirect } from "next/navigation";
import AppShell from "@/components/app/AppShell";
import CvCheckTool from "@/components/cv-check/CvCheckTool";
import { getCurrentUser } from "@/lib/auth";
import { isAppV2Active } from "@/lib/app-v2";
import { appPaths, type AppLocale } from "@/lib/app-v2-paths";

const COPY = {
  nl: {
    general: { title: "CV-check", intro: "Upload je CV of plak de tekst. Je krijgt een cijfer en concrete verbeterpunten, en opent je CV daarna direct in de editor." },
    vacancy: { title: "Vacature-match", intro: "Plak een vacature naast je CV en zie per eis wat je CV al laat zien en wat nog ontbreekt." },
  },
  en: {
    general: { title: "CV check", intro: "Upload your CV or paste the text. You get a grade and concrete improvements, then open your CV straight in the editor." },
    vacancy: { title: "Job match", intro: "Paste a job ad next to your CV and see, requirement by requirement, what your CV already shows and what is missing." },
  },
} as const;

// The public /cv-check pages keep their SEO content; this is the same tool inside the app frame.
export default async function CvCheckScreen({ locale, mode }: { locale: AppLocale; mode: "general" | "vacancy" }) {
  const paths = appPaths(locale);
  const here = mode === "vacancy" ? paths.vacancyMatch : paths.cvCheck;
  if (!(await isAppV2Active())) redirect(mode === "vacancy" ? paths.publicTools.vacancyMatch : paths.publicTools.cvCheck);
  const user = await getCurrentUser();
  if (!user) redirect(`/login?locale=${locale}&next=${encodeURIComponent(here)}`);
  const t = COPY[locale][mode];
  const en = locale === "en";

  return (
    <AppShell active={mode === "vacancy" ? "vacancyMatch" : "cvCheck"} locale={locale}>
      <main className="mx-auto flex max-w-[980px] flex-col gap-5 px-4 py-8 sm:px-8 sm:py-10">
        <header>
          <h1 className="text-[28px] font-extrabold tracking-tight text-[var(--wk-ink)]">{t.title}</h1>
          <p className="mt-1 max-w-[640px] text-sm leading-relaxed text-[var(--wk-ink-muted)]">{t.intro}</p>
        </header>
        <CvCheckTool
          locale={locale}
          initialShowVacancy={mode === "vacancy"}
          entry={mode === "vacancy" ? "app_vacancy" : "app"}
          methodologyHref={en ? "/en/cv-check/methodology" : "/cv-check/methodologie"}
          // Straight into the editor; the cv_check start sources keep the uploaded file handoff working.
          editorHref={en ? "/en/editor?template=professional&startSource=cv_check_en" : "/editor?template=professional&startSource=cv_check"}
        />
      </main>
    </AppShell>
  );
}
