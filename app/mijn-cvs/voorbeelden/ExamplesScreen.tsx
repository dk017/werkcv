import Link from "next/link";
import { redirect } from "next/navigation";
import AppShell from "@/components/app/AppShell";
import { CvThumbnail } from "@/components/app/CvThumbnail";
import { UseExampleButton } from "@/components/cv-voorbeelden/UseExampleButton";
import { getCurrentUser } from "@/lib/auth";
import { isAppV2Active } from "@/lib/app-v2";
import { appPaths, type AppLocale } from "@/lib/app-v2-paths";
import { getAllCategories, getExamplesByCategory } from "@/lib/cv-voorbeelden/registry";
import { englishRoleExamples } from "@/lib/english-role-examples";
import type { CVData } from "@/lib/cv";

type Card = { key: string; name: string; description: string; sampleCV: CVData; templateId: string; colorThemeId: string };

const COPY = {
  nl: {
    title: "Voorbeelden",
    intro: "Ingevulde CV's per beroep. Kies er een en je opent een eigen kopie in de editor; daarna vervang je de tekst door je eigen ervaring.",
    use: "Gebruik dit voorbeeld",
    categories: "Kies een beroepsgroep",
  },
  en: {
    title: "Examples",
    intro: "Filled-in CVs to start from. Pick one and you open your own copy in the editor, then replace the text with your own experience.",
    use: "Use this example",
    categories: "Choose a field",
    english: "English CV examples",
    dutch: "Dutch-language examples (for Dutch employers)",
  },
} as const;

function ExampleGrid({ cards, locale, useLabel }: { cards: Card[]; locale: AppLocale; useLabel: string }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <li key={card.key} className="flex flex-col overflow-hidden rounded-2xl border border-[var(--wk-border)] bg-[var(--wk-surface)]">
          <div className="border-b border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-3" aria-hidden="true">
            <div className="mx-auto aspect-[210/297] w-full max-w-[220px] overflow-hidden rounded-md bg-white shadow-sm">
              <CvThumbnail data={card.sampleCV} templateId={card.templateId} colorThemeId={card.colorThemeId} />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2 p-4">
            <h3 className="text-[15px] font-extrabold text-[var(--wk-ink)]">{card.name}</h3>
            <p className="line-clamp-3 text-[13px] leading-relaxed text-[var(--wk-ink-muted)]">{card.description}</p>
            <div className="mt-auto pt-2">
              <UseExampleButton
                templateId={card.templateId}
                colorThemeId={card.colorThemeId}
                sampleCV={card.sampleCV}
                label={useLabel}
                startSource="app_examples"
                pagePath={appPaths(locale).examples}
                uiLanguage={locale}
                trackingLocation="app_examples"
                trackingLabel={card.key}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

// The public example pages keep their SEO content; this is a compact gallery inside the app frame.
export default async function ExamplesScreen({ locale, searchParams }: { locale: AppLocale; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const paths = appPaths(locale);
  if (!(await isAppV2Active())) redirect(paths.publicTools.examples);
  const user = await getCurrentUser();
  if (!user) redirect(`/login?locale=${locale}&next=${encodeURIComponent(paths.examples)}`);

  const en = locale === "en";
  const t = COPY[locale];
  const params = await searchParams;
  const param = en ? "category" : "categorie";
  const categories = getAllCategories();
  const requested = typeof params[param] === "string" ? params[param] : "";
  const active = categories.find((category) => category.slug === requested) ?? categories[0];
  const dutchCards: Card[] = getExamplesByCategory(active.slug).map((example) => ({
    key: `${example.categorySlug}/${example.slug}`,
    name: example.name,
    description: example.description,
    sampleCV: example.sampleCV,
    templateId: example.templateId,
    colorThemeId: example.colorThemeId,
  }));
  const englishCards: Card[] = en ? Object.entries(englishRoleExamples).map(([key, role]) => ({
    key: `en/${key}`,
    name: role.sampleCV.personal.title || key,
    description: role.sampleCV.personal.summary,
    sampleCV: role.sampleCV,
    templateId: role.templateId,
    colorThemeId: role.colorThemeId,
  })) : [];

  return (
    <AppShell active="examples" locale={locale}>
      <main className="mx-auto flex max-w-[1100px] flex-col gap-6 px-4 py-8 sm:px-8 sm:py-10">
        <header>
          <h1 className="text-[28px] font-extrabold tracking-tight text-[var(--wk-ink)]">{t.title}</h1>
          <p className="mt-1 max-w-[680px] text-sm leading-relaxed text-[var(--wk-ink-muted)]">{t.intro}</p>
        </header>

        {en ? (
          <section aria-labelledby="examples-english" className="flex flex-col gap-3">
            <h2 id="examples-english" className="text-[17px] font-extrabold text-[var(--wk-ink)]">{COPY.en.english}</h2>
            <ExampleGrid cards={englishCards} locale={locale} useLabel={t.use} />
          </section>
        ) : null}

        <section aria-labelledby="examples-library" className="flex flex-col gap-3">
          {en ? <h2 id="examples-library" className="text-[17px] font-extrabold text-[var(--wk-ink)]">{COPY.en.dutch}</h2> : <h2 id="examples-library" className="sr-only">{t.title}</h2>}
          <nav aria-label={t.categories} className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = category.slug === active.slug;
              return (
                <Link
                  key={category.slug}
                  href={`${paths.examples}?${param}=${encodeURIComponent(category.slug)}`}
                  scroll={false}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-bold transition-colors ${isActive
                    ? "border-[var(--wk-primary)] bg-[var(--wk-primary)] text-[var(--wk-primary-contrast)]"
                    : "border-[var(--wk-border-strong)] bg-white text-[var(--wk-ink)] hover:border-[var(--wk-primary)]"}`}
                >
                  {category.name}
                </Link>
              );
            })}
          </nav>
          <ExampleGrid cards={dutchCards} locale={locale} useLabel={t.use} />
        </section>
      </main>
    </AppShell>
  );
}
