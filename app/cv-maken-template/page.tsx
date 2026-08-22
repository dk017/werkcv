import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const featuredTemplates = templateList.filter((template) =>
  ["professional", "modern", "simple", "ats"].includes(template.id),
);

const templateUseCases: Record<string, string> = {
  professional:
    "Sterke keuze als je een rustige, brede template zoekt voor administratie, finance, support en veel kantoorfuncties.",
  modern:
    "Handig wanneer je CV wat frisser mag ogen voor marketing, sales, product of tech zonder onrustig te worden.",
  simple:
    "Snelste start als je vooral een heldere basis wilt en niet wilt blijven hangen op designkeuzes.",
  ats: "Geschikt wanneer je maximale scanbaarheid en standaardstructuur wilt voor recruiter en ATS.",
};

const selectionSteps = [
  {
    title: "1) Kies eerst op functietype, niet op kleur",
    body: "Een goede CV-template versterkt je rol en sector. Begin daarom bij de vraag welk niveau van formaliteit en rust je nodig hebt.",
  },
  {
    title: "2) Controleer of je inhoud genoeg ruimte krijgt",
    body: "Templates werken pas goed als profieltekst, werkervaring en vaardigheden niet gepropt ogen. Scan je voorbeeldinhoud altijd in de layout.",
  },
  {
    title: "3) Gebruik rustige sectiekoppen en logische volgorde",
    body: "De beste templates maken meteen duidelijk waar profiel, ervaring, opleiding en vaardigheden staan. Dat versnelt de eerste recruiter-scan.",
  },
  {
    title: "4) Vergelijk twee of drie layouts met dezelfde inhoud",
    body: "Door dezelfde tekst in meerdere templates te bekijken zie je snel welke versie het meest professioneel en geloofwaardig overkomt.",
  },
  {
    title: "5) Download pas wanneer de combinatie van inhoud en layout klopt",
    body: "WerkCV laat je eerst gratis vergelijken. Daardoor kies je de template pas op basis van een echte sollicitatieversie, niet op gevoel alleen.",
  },
];

const faqs = [
  {
    question: "Wat is het verschil tussen een cv template en een cv sjabloon?",
    answer:
      "In de praktijk wordt hetzelfde bedoeld: een vaste layout waarmee je sneller een professioneel CV opbouwt. Template wordt iets vaker gebruikt bij online editors.",
  },
  {
    question: "Welke cv template past het best bij de meeste sollicitaties?",
    answer:
      "Voor de meeste Nederlandse functies zijn rustige templates zoals Professioneel, Simpel en ATS de veiligste keuzes. Ze blijven scanbaar en breed inzetbaar.",
  },
  {
    question: "Kan ik een cv template eerst gratis proberen?",
    answer:
      "Ja. Je kunt de templates gratis openen in de editor, je inhoud invullen en layouts vergelijken. Je betaalt alleen wanneer je de definitieve PDF wilt downloaden.",
  },
  {
    question: "Moet een cv template creatief zijn om op te vallen?",
    answer:
      "Niet per se. Voor de meeste sollicitaties werkt duidelijke structuur beter dan opvallend design. Opvallen moet vooral uit je inhoud en relevantie komen.",
  },
];

export const metadata: Metadata = {
  title: "CV Maken Template - Kies de Beste CV Layout voor Jouw Sollicitatie | WerkCV",
  description:
    "Zoek je een CV maken template? Vergelijk rustige, moderne en ATS-vriendelijke layouts, kies de beste template voor jouw rol en start gratis in de editor.",
  keywords: [
    "cv maken template",
    "cv template maken",
    "template cv maken",
    "professionele cv template",
    "cv layout kiezen",
    "cv template online",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-maken-template",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-maken-template",
      "x-default": "https://werkcv.nl/cv-maken-template",
    },
  },
};

export default function CvMakenTemplatePage() {
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
        name: "CV Maken Template",
        item: "https://werkcv.nl/cv-maken-template",
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
                <span>Template-intentie</span>
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">
                <span className="wk-hero-highlight">CV maken template</span> kiezen zonder te
                verdwalen in te veel layouts
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--wk-ink-muted)]">
                Wie zoekt op <strong className="font-semibold text-[var(--wk-ink)]">cv maken template</strong> wil
                meestal snel een goede layout kiezen en daarna verder met de inhoud. Op deze pagina
                helpen we je de beste CV-template selecteren op basis van rol, uitstraling en
                scanbaarheid, zodat je daarna direct kunt starten in de editor. Een CV-template
                wordt in het Nederlands ook wel een CV-sjabloon genoemd; beide termen bedoelen hier
                dezelfde vaste layout.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--wk-ink-muted)]">
                Zie dit als de keuzehulp voor layout- en template-intentie. Voor het volledige
                stappenplan rond inhoud, schrijfkwaliteit en vacaturematch gebruik je daarna beter
                de{" "}
                <Link
                  href="/cv-maken"
                  className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
                >
                  hoofdgids CV maken
                </Link>
                .
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/templates" className="wk-button wk-button-primary">
                  Bekijk alle templates
                </Link>
                <Link href="/editor" className="wk-button wk-button-secondary">
                  Start direct met invullen
                </Link>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  "Rustige en moderne layouts",
                  "Vergelijk op echte inhoud",
                  "Eenmalig betalen bij download",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)] px-4 py-3 text-sm font-semibold text-[var(--wk-ink)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="wk-card h-fit p-6">
              <h2 className="text-xl font-semibold text-[var(--wk-ink)]">
                Wat maakt een goede CV-template?
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                <li>
                  <strong className="font-semibold text-[var(--wk-ink)]">Scanbaar:</strong> secties
                  en koppen zijn direct duidelijk.
                </li>
                <li>
                  <strong className="font-semibold text-[var(--wk-ink)]">Passend:</strong> de
                  uitstraling klopt met je rol en sector.
                </li>
                <li>
                  <strong className="font-semibold text-[var(--wk-ink)]">Rustig:</strong> inhoud
                  krijgt ruimte zonder designruis.
                </li>
                <li>
                  <strong className="font-semibold text-[var(--wk-ink)]">Praktisch:</strong> je
                  kunt snel vergelijken en door naar de definitieve versie.
                </li>
              </ul>
              <div className="mt-6 border-t border-[var(--wk-border)] pt-5">
                <Link
                  href="/templates"
                  className="text-sm font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
                >
                  Bekijk alle CV-templates en sjablonen
                </Link>
              </div>
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
                  {templateUseCases[template.id] ?? template.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/editor"
                    className="wk-button wk-button-primary wk-button-small"
                  >
                    Gebruik in editor
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
              <span>Keuzeproces</span>
            </div>
            <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
              Zo kies je de beste CV-template zonder tijd te verliezen
            </h2>
            <div className="mt-6 space-y-4">
              {selectionSteps.map((step, index) => (
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
                href: "/curriculum-vitae-template",
                title: "Curriculum vitae template",
                body: "Speciaal voor formelere template-intentie en rustige, zakelijke layouts.",
              },
              {
                href: "/templates",
                title: "Alle CV-templates",
                body: "Vergelijk alle layouts met je eigen inhoud en kies daarna de beste versie.",
              },
              {
                href: "/cv-maken",
                title: "CV maken",
                body: "Ga hierna verder als de layout gekozen is en je de inhoud recruiter-proof wilt aanscherpen.",
              },
              {
                href: "/cv-opmaken",
                title: "CV opmaken",
                body: "Verbeter de layout verder nadat je de juiste template hebt gekozen.",
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
          <div className="rounded-[var(--wk-radius-lg)] bg-[var(--wk-primary)] p-8 md:p-12">
            <h2 className="max-w-3xl text-3xl font-semibold text-[var(--wk-primary-contrast)]">
              Kies je template, vul je inhoud in en download pas wanneer alles klopt
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--wk-primary-contrast)]/80 sm:text-base">
              WerkCV is gebouwd voor mensen die eerst een goede template willen kiezen, daarna hun
              inhoud willen aanscherpen en pas op het einde willen betalen voor de PDF. Dat maakt
              template-zoekintentie direct bruikbaar voor echte sollicitaties.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/templates" className="wk-button wk-button-accent">
                Vergelijk templates
              </Link>
              <Link href="/prijzen" className="wk-button wk-button-secondary">
                Bekijk prijzen
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
            Veelgestelde vragen over CV templates
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
