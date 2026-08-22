import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const stageSteps = [
  {
    title: "1) Zet de stagefunctie of richting direct bovenaan",
    body: "Recruiters willen snel zien of je op marketing, HR, finance, zorg, IT of een andere stage richt. Maak dat meteen duidelijk.",
  },
  {
    title: "2) Gebruik studieprojecten en opdrachten als bewijs",
    body: "Als je nog geen eerdere stage hebt, kunnen schoolprojecten, portfolio-werk en verenigingsactiviteiten prima laten zien wat je kunt.",
  },
  {
    title: "3) Benoem wat je wilt leren én wat je al kunt bijdragen",
    body: "Een goed stage-CV laat niet alleen motivatie zien, maar ook initiatief, softwarekennis, samenwerking en praktische output.",
  },
  {
    title: "4) Houd het relevant en compact",
    body: "Voor een stage-CV is 1 pagina meestal genoeg. Laat vooral alles weg wat niets toevoegt aan de rol waarop je solliciteert.",
  },
];

const stageSignals = [
  "Heldere stage-richting of opleidingscontext.",
  "Projecten, opdrachten of portfolio met concrete output.",
  "Beschikbaarheid en leerhouding.",
  "Rustige opmaak zonder overdesign.",
];

const faqs = [
  {
    question: "Wat zet ik op mijn cv voor een stage?",
    answer:
      "Zet je opleiding, relevante vakken, projecten, software, vrijwilligerswerk, bijbaanervaring en een korte profieltekst op je stage-CV. Focus op potentie en bewijs.",
  },
  {
    question: "Kan ik een stage-cv maken zonder eerdere stage?",
    answer:
      "Ja. Gebruik schoolprojecten, praktijkopdrachten, portfolio, bestuurswerk en bijbanen om te laten zien dat je verantwoordelijkheid neemt en iets oplevert.",
  },
  {
    question: "Hoe lang mag een stage-cv zijn?",
    answer:
      "Voor de meeste stagekandidaten is 1 pagina voldoende. Recruiters willen snel zien wat relevant is, niet alles wat je ooit hebt gedaan.",
  },
  {
    question: "Kan ik gratis beginnen met mijn stage-cv?",
    answer:
      "Ja. WerkCV laat je gratis starten in de editor. Je betaalt alleen als je later de definitieve PDF wilt downloaden.",
  },
];

export const metadata: Metadata = {
  title: "Stage CV Maken - Sterk CV voor Stageplek en Afstudeerstage | WerkCV",
  description:
    "Stage cv maken? Zet opleiding, projecten, stage-intentie en vaardigheden om in een sterk stage-CV. Start gratis in de editor en download later als PDF.",
  keywords: [
    "stage cv maken",
    "cv maken stage",
    "cv maken voor stage",
    "stage cv",
    "stage sollicitatie cv",
    "cv stage maken",
  ],
  alternates: {
    canonical: "https://werkcv.nl/stage-cv-maken",
    languages: {
      "nl-NL": "https://werkcv.nl/stage-cv-maken",
      "x-default": "https://werkcv.nl/stage-cv-maken",
    },
  },
};

export default function StageCvMakenPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://werkcv.nl",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Stage CV Maken",
        item: "https://werkcv.nl/stage-cv-maken",
      },
    ],
  };
  return (
    <main>
      <section className="wk-section">
        <div className="wk-container">
          <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="wk-eyebrow mb-3">
                <span>Stage-intentie</span>
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">
                <span className="wk-hero-highlight">Stage CV maken</span> dat laat zien wat je al
                kunt en wat je snel gaat leren
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--wk-ink-muted)]">
                Een stage-CV hoeft niet vol werkervaring te zitten. Het moet vooral geloofwaardig
                laten zien dat jij de basis hebt om snel mee te draaien: opleiding, projecten,
                software, verantwoordelijkheidsgevoel en een duidelijke leerhouding.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/editor" className="wk-button wk-button-primary">
                  Start je stage-CV
                </Link>
                <Link
                  href="/cv-voorbeelden/studenten-en-starters/stage-cv"
                  className="wk-button wk-button-secondary"
                >
                  Bekijk stage voorbeeld
                </Link>
              </div>
            </div>

            <div className="wk-card h-fit p-6">
              <h2 className="text-xl font-semibold text-[var(--wk-ink)]">
                Waar stagebegeleiders op letten
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                {stageSignals.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--wk-success-soft)] text-[var(--wk-success)]">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="wk-card p-6 md:p-8">
            <div className="wk-eyebrow mb-3">
              <span>Stappenplan</span>
            </div>
            <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
              Zo bouw je een stage-CV dat serieus overkomt
            </h2>
            <div className="mt-6 space-y-4">
              {stageSteps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--wk-accent-soft)] text-sm font-semibold text-[var(--wk-primary)]">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--wk-ink)]">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--wk-ink-muted)]">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                href: "/cv-voorbeelden/studenten-en-starters/stage-cv",
                title: "Stage CV voorbeeld",
                body: "Zie hoe een stagegerichte versie inhoudelijk is opgebouwd.",
              },
              {
                href: "/cv-voorbeelden/studenten-en-starters/student-cv",
                title: "Student CV voorbeeld",
                body: "Gebruik dit als bredere basis voor studie, projecten en stage.",
              },
              {
                href: "/cv-maken-student",
                title: "CV maken student",
                body: "Ga terug naar de bredere student-intentie voor meer context.",
              },
              {
                href: "/cv-voorbeelden/studenten-en-starters/eerste-baan-starter",
                title: "Eerste baan starter",
                body: "Handig als je stage en eerste baan dicht tegen elkaar aan zitten.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4 transition-colors hover:border-[var(--wk-primary)]"
              >
                <p className="text-sm font-semibold text-[var(--wk-ink)]">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
            Veelgestelde vragen over stage-CV&apos;s
          </h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="wk-card p-5">
                <summary className="cursor-pointer font-semibold text-[var(--wk-ink)]">
                  {faq.question}
                </summary>
                <p className="mt-3 leading-7 text-[var(--wk-ink-muted)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Footer variant="brand" />
    </main>
  );
}
