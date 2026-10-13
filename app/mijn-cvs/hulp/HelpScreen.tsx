import { redirect } from "next/navigation";
import AppShell from "@/components/app/AppShell";
import { Icon } from "@/components/app/icons";
import { getCurrentUser } from "@/lib/auth";
import { isAppV2Active } from "@/lib/app-v2";
import { appPaths, type AppLocale } from "@/lib/app-v2-paths";
import { productFaqGroups } from "@/lib/product-faq";
import { englishAiFaqItems } from "@/lib/ai-discovery";

type Group = { id: string; title: string; questions: { id: string; question: string; answer: string }[] };

// Dutch: the product FAQ from /faq. English: the consumer answers used for the English site.
function groupsFor(locale: AppLocale): Group[] {
  if (locale === "nl") return productFaqGroups.map((group) => ({ id: group.id, title: group.title, questions: [...group.questions] }));
  return [{
    id: "general",
    title: "Frequently asked questions",
    questions: englishAiFaqItems.map((item, index) => ({ id: `q${index}`, question: item.question, answer: item.answer })),
  }];
}

const COPY = {
  nl: {
    title: "Hulp",
    intro: "Antwoorden op de meest gestelde vragen. Staat je vraag er niet bij? Mail ons gerust.",
    contactTitle: "Contact",
    contactText: "Vermeld het e-mailadres van je account, dan kunnen we je sneller helpen.",
    contactLink: "Mail contact@werkcv.nl",
  },
  en: {
    title: "Help",
    intro: "Answers to the most common questions. Can't find yours? Just email us.",
    contactTitle: "Contact",
    contactText: "Mention the email address of your account so we can help you faster.",
    contactLink: "Email contact@werkcv.nl",
  },
} as const;

export default async function HelpScreen({ locale }: { locale: AppLocale }) {
  const paths = appPaths(locale);
  const t = COPY[locale];
  if (!(await isAppV2Active())) redirect(paths.publicTools.help);
  const user = await getCurrentUser();
  if (!user) redirect(`/login?locale=${locale}&next=${encodeURIComponent(paths.help)}`);

  return (
    <AppShell active="help" locale={locale}>
      <main className="mx-auto flex max-w-[760px] flex-col gap-5 px-4 py-8 sm:px-8 sm:py-10">
        <header>
          <h1 className="text-[28px] font-extrabold tracking-tight text-[var(--wk-ink)]">{t.title}</h1>
          <p className="mt-1 text-sm leading-relaxed text-[var(--wk-ink-muted)]">{t.intro}</p>
        </header>

        {groupsFor(locale).map((group) => (
          <section key={group.id} aria-labelledby={`help-${group.id}`} className="rounded-2xl border border-[var(--wk-border)] bg-[var(--wk-surface)] p-2 sm:p-3">
            <h2 id={`help-${group.id}`} className="px-3 pb-1 pt-3 text-[17px] font-extrabold text-[var(--wk-ink)]">{group.title}</h2>
            <div className="divide-y divide-[var(--wk-border)]">
              {group.questions.map((item) => (
                <details key={item.id} className="group px-3">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 py-3 text-[15px] font-bold text-[var(--wk-ink)] [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <Icon name="chevronDown" size={18} aria-hidden="true" className="shrink-0 text-[var(--wk-ink-muted)] transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="pb-4 text-sm leading-relaxed text-[var(--wk-ink-muted)]">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}

        <section aria-labelledby="help-contact" className="rounded-2xl border border-[var(--wk-border)] bg-[var(--wk-surface)] p-5 sm:p-6">
          <h2 id="help-contact" className="text-[17px] font-extrabold text-[var(--wk-ink)]">{t.contactTitle}</h2>
          <p className="mt-1 text-sm leading-relaxed text-[var(--wk-ink-muted)]">{t.contactText}</p>
          <a href="mailto:contact@werkcv.nl" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--wk-primary)] px-5 text-sm font-bold text-[var(--wk-primary-contrast)] hover:bg-[var(--wk-primary-hover)]">
            <Icon name="mail" size={18} aria-hidden="true" />
            {t.contactLink}
          </a>
        </section>
      </main>
    </AppShell>
  );
}
