import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const featuredTemplates = templateList.filter((template) =>
  ["simple", "professional", "ats", "modern"].includes(template.id),
);

const studentUseCases: Record<string, string> = {
  simple:
    "Sterke start voor studenten die snel een eerste versie willen bouwen zonder afleiding.",
  professional:
    "Handig als je stage, studieprojecten en bijbaanervaring rustig en volwassen wilt presenteren.",
  ats: "Slim als je ook op trainee-, stage- of juniorrollen solliciteert waar scanbaarheid telt.",
  modern:
    "Past als je voor marketing, communicatie of digitale startersrollen net iets frisser wilt ogen.",
};

const studentSteps = [
  {
    title: "1) Begin met een duidelijke doelrol",
    body: "Zet bovenaan niet alleen 'student', maar ook waarop je mikt: stage, bijbaan, traineeship of eerste baan. Dat geeft richting aan de rest van je CV.",
  },
  {
    title: "2) Gebruik stage, projecten en bijbaan als bewijs",
    body: "Ook zonder fulltime werkervaring kun je laten zien dat je verantwoordelijkheid neemt, samenwerkt en resultaat levert.",
  },
  {
    title: "3) Houd je student-CV compact",
    body: "Voor de meeste studenten is 1 pagina genoeg. Prioriteer relevante ervaring, vaardigheden en schoolprojecten die echt aansluiten op de functie.",
  },
  {
    title: "4) Pas je profieltekst per vacature aan",
    body: "Een student-CV wint wanneer je laat zien waarom jij juist voor die stage, bijbaan of startersrol past.",
  },
];

const faqs = [
  {
    question: "Hoe maak ik een goed cv als student?",
    answer:
      "Gebruik studie, stage, projecten, bestuurswerk, vrijwilligerswerk en bijbaanervaring als bewijs van vaardigheden. Houd het compact en relevant voor de rol waarop je solliciteert.",
  },
  {
    question: "Mag ik een student-CV op 1 pagina houden?",
    answer:
      "Ja. Voor de meeste studenten is 1 pagina de beste keuze. Dat dwingt je om alleen de meest relevante informatie te laten zien.",
  },
  {
    question: "Wat zet ik op mijn cv als student zonder veel ervaring?",
    answer:
      "Focus op studieprojecten, stages, bijbanen, vrijwilligerswerk, software, talen en een sterke profieltekst die je motivatie en richting duidelijk maakt.",
  },
  {
    question: "Kan ik als student gratis beginnen?",
    answer:
      "Ja. Je kunt gratis starten in de editor, je CV opbouwen en pas betalen als je de definitieve PDF wilt downloaden.",
  },
];

export const metadata: Metadata = {
  title: "CV Maken Student - Sterk Student-CV voor Stage, Bijbaan en Starter | WerkCV",
  description:
    "CV maken als student? Bouw snel een sterk student-CV met stage, projecten, bijbaan en profieltekst. Start gratis in de editor en download later als PDF.",
  keywords: [
    "cv maken student",
    "studenten cv maken",
    "cv maken als student",
    "cv student maken",
    "gratis cv maken student",
    "student cv maken",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-maken-student",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-maken-student",
      "x-default": "https://werkcv.nl/cv-maken-student",
    },
  },
};

export default function CvMakenStudentPage() {
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
        name: "CV Maken Student",
        item: "https://werkcv.nl/cv-maken-student",
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
                <span>Student-intentie</span>
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">
                <span className="wk-hero-highlight">CV maken als student</span> zonder vast te
                lopen op weinig werkervaring
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--wk-ink-muted)]">
                Een goed student-CV draait niet om jarenlang werkverleden, maar om slim laten zien
                wat je al hebt gedaan: stage, schoolprojecten, bijbaan, bestuur,
                vrijwilligerswerk en vaardigheden. WerkCV helpt je die ervaring om te zetten in een
                rustige, recruiter-proof versie.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--wk-ink-muted)]">
                Deze route is specifiek voor stage, bijbaan, trainee en starter-intentie. Zoek je
                eerst het brede stappenplan voor een algemeen CV? Gebruik dan de{" "}
                <Link
                  href="/cv-maken"
                  className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
                >
                  hoofdgids CV maken
                </Link>
                .
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/editor" className="wk-button wk-button-primary">
                  Start je student-CV
                </Link>
                <Link
                  href="/cv-voorbeelden/studenten-en-starters/student-cv"
                  className="wk-button wk-button-secondary"
                >
                  Bekijk student voorbeeld
                </Link>
              </div>
            </div>

            <div className="wk-card h-fit p-6">
              <h2 className="text-xl font-semibold text-[var(--wk-ink)]">
                Wat recruiters wél willen zien
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                {[
                  "Een duidelijke doelrol: stage, bijbaan, trainee of junior functie.",
                  "Praktisch bewijs uit studie, stage, project of bijbaan.",
                  "Een korte profieltekst die motivatie en richting laat zien.",
                  "Een rustige template die je potentie professioneel presenteert.",
                ].map((item) => (
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
          <div className="grid gap-6 md:grid-cols-2">
            {featuredTemplates.map((template) => (
              <article key={template.id} className="wk-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wk-ink-muted)]">
                  Template
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[var(--wk-ink)]">
                  {template.nameDutch}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                  {studentUseCases[template.id] ?? template.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/editor"
                    className="wk-button wk-button-primary wk-button-small"
                  >
                    Gebruik deze template
                  </Link>
                  <Link
                    href="/templates"
                    className="wk-button wk-button-secondary wk-button-small"
                  >
                    Vergelijk layouts
                  </Link>
                </div>
              </article>
            ))}
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
              Zo maak je als student snel een sterk CV
            </h2>
            <div className="mt-6 space-y-4">
              {studentSteps.map((step, index) => (
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
                href: "/cv-voorbeelden/studenten-en-starters/student-cv",
                title: "CV voorbeeld student",
                body: "Bekijk hoe een sterk studentprofiel is opgebouwd.",
              },
              {
                href: "/cv-voorbeelden/studenten-en-starters/stage-cv",
                title: "CV voorbeeld stage",
                body: "Zie hoe je stage-intentie en studieprojecten sterk koppelt.",
              },
              {
                href: "/cv-tips/cv-maken-als-student",
                title: "CV tips voor studenten",
                body: "Lees extra uitleg over lengte, inhoud en veelgemaakte fouten.",
              },
              {
                href: "/stage-cv-maken",
                title: "Stage CV maken",
                body: "Ga door naar de aparte stage-zoekintentie.",
              },
              {
                href: "/cv-gids/cv-voorbeeld-student-bijbaan",
                title: "CV voorbeeld student bijbaan",
                body: "Pak een kort, scanbaar voorbeeld voor winkel-, horeca- of logistiek werk naast je studie.",
              },
              {
                href: "/cv-middelbare-school-student",
                title: "CV middelbare school student",
                body: "Gebruik deze route als je nog op school zit en een eerste CV zoekt voor stage of bijbaan.",
              },
              {
                href: "/cv-gids/cv-voorbeeld-zonder-ervaring",
                title: "CV zonder ervaring",
                body: "Gebruik de BOFU gids als school, stage en kleine jobs nu nog je belangrijkste bewijs zijn.",
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
            Veelgestelde vragen over student-CV&apos;s
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
