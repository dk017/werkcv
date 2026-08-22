import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getTemplateConfig } from "@/lib/templates/registry";

const simpleTemplate = getTemplateConfig("simple");

const wordProblems = [
  "Marges, tabstops en koppen verschuiven zodra je tekst aanpast.",
  "Eenzelfde CV bewaren in meerdere Word-versies wordt snel rommelig.",
  "De PDF-uitvoer uit Word oogt niet altijd stabiel op mobiel of bijlage-preview.",
  "Je verliest tijd aan layout in plaats van aan profieltekst en werkervaring.",
];

const wordFlow = [
  {
    title: "1) Start vanuit een vaste template in plaats van een leeg Word-document",
    body: "Daardoor heb je direct structuur voor profiel, ervaring, opleiding en vaardigheden zonder eerst marges en lettertypes te moeten instellen.",
  },
  {
    title: "2) Schrijf eerst de inhoud, niet de opmaak",
    body: "Een sterk CV wint op relevantie. Gebruik Word-intentie om mensen snel naar een editorflow te sturen waar de layout al klopt.",
  },
  {
    title: "3) Vergelijk je inhoud in meerdere layouts",
    body: "Met dezelfde tekst zie je direct of een simpel, professioneel of moderner template het beste werkt voor jouw functie.",
  },
  {
    title: "4) Download pas op het einde als PDF",
    body: "Het doel is geen Word-bestand bewaren, maar een nette, stabiele sollicitatieversie versturen.",
  },
];

const faqs = [
  {
    question: "Kan ik nog steeds een cv maken in Word?",
    answer:
      "Ja, maar het kost vaak meer tijd aan opmaak en versiebeheer. Voor de meeste sollicitaties is een vaste online template sneller en stabieler.",
  },
  {
    question: "Wat is beter: cv maken in Word of online?",
    answer:
      "Online is meestal beter als je meerdere vacaturevarianten wilt maken, snel wilt aanpassen en direct een nette PDF wilt hebben zonder layoutgedoe.",
  },
  {
    question: "Kan ik WerkCV gebruiken als alternatief voor Word?",
    answer:
      "Ja. Je kiest een template, vult je inhoud in en downloadt pas als je klaar bent. Daarmee vervang je het handmatige Word-opmaakwerk grotendeels.",
  },
  {
    question: "Kan ik mijn cv bij WerkCV als Word-bestand downloaden?",
    answer:
      "Nee. WerkCV is bedoeld als sneller alternatief voor cv maken in Word. Je kiest een template, werkt online in de editor en downloadt daarna de definitieve versie als PDF.",
  },
  {
    question: "Moet ik nog steeds als PDF versturen?",
    answer:
      "Meestal wel. PDF blijft voor sollicitaties de veiligste eindvorm, omdat de layout dan stabiel blijft bij recruiters en ATS-systemen.",
  },
];

export const metadata: Metadata = {
  title: "CV Maken in Word - Kies Templates en Download Daarna als PDF | WerkCV",
  description:
    "CV maken in Word? WerkCV is een sneller alternatief: kies een template, vul online in en download daarna als stabiele PDF. Geen Word-opmaakstress.",
  keywords: [
    "cv maken in word",
    "cv maken word",
    "word cv maken",
    "cv in word maken",
    "cv op word maken",
    "zelf cv maken in word",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-maken-in-word",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-maken-in-word",
      "x-default": "https://werkcv.nl/cv-maken-in-word",
    },
  },
};

export default function CvMakenInWordPage() {
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
        name: "CV Maken in Word",
        item: "https://werkcv.nl/cv-maken-in-word",
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
                <span>Word-intentie</span>
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">
                <span className="wk-hero-highlight">CV maken in Word?</span> Kies liever een template
                en download daarna als PDF
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--wk-ink-muted)]">
                Mensen zoeken nog vaak op <strong>cv maken in Word</strong> omdat dat vertrouwd
                voelt. In de praktijk ontstaat daar vaak opmaakfrictie. WerkCV is geen Word-export
                tool, maar een sneller alternatief: je kiest een template, werkt online in de editor
                en downloadt daarna een stabiele PDF zonder te worstelen met tabellen, marges en
                schuivende koppen.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--wk-ink-muted)]">
                Zie deze route als een Word-specifieke beslispagina. Zoek je niet per se naar Word,
                maar gewoon naar de beste algemene aanpak? Dan is{" "}
                <Link
                  href="/cv-maken"
                  className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
                >
                  CV maken
                </Link>{" "}
                de bredere hoofdroute.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/templates" className="wk-button wk-button-primary">
                  Bekijk CV templates
                </Link>
                <Link href="/editor" className="wk-button wk-button-secondary">
                  Of start direct in editor
                </Link>
              </div>
            </div>

            <div className="wk-card h-fit p-6">
              <h2 className="text-xl font-semibold text-[var(--wk-ink)]">
                Waarom Word vaak vertraagt
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                {wordProblems.map((item) => (
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
              <p className="mt-6 border-t border-[var(--wk-border)] pt-5 text-sm font-semibold text-[var(--wk-ink)]">
                WerkCV eindigt in PDF, niet in Word.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="wk-card p-6">
              <div className="wk-eyebrow mb-3">
                <span>Praktische start</span>
              </div>
              <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">
                Beste start als je normaal in Word begint
              </h2>
              <div className="mt-5 rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-5">
                <h3 className="text-2xl font-semibold text-[var(--wk-ink)]">
                  {simpleTemplate.nameDutch}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                  {simpleTemplate.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                  <li>Rustige, vertrouwde basis.</li>
                  <li>Makkelijk te vullen zonder layoutgedoe.</li>
                  <li>Goede stap van Word-denken naar sneller solliciteren.</li>
                </ul>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/editor" className="wk-button wk-button-primary wk-button-small">
                    Gebruik deze template
                  </Link>
                  <Link href="/templates" className="wk-button wk-button-secondary wk-button-small">
                    Bekijk alle templates
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <div className="wk-eyebrow mb-3">
                <span>Betere flow</span>
              </div>
              <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
                Van Word-intentie naar een sterkere sollicitatieversie
              </h2>
              <div className="mt-6 space-y-4">
                {wordFlow.map((item, index) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--wk-accent-soft)] text-sm font-semibold text-[var(--wk-primary)]">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--wk-ink)]">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="rounded-[var(--wk-radius-lg)] bg-[var(--wk-primary)] p-8 md:p-12">
            <h2 className="max-w-3xl text-3xl font-semibold text-[var(--wk-primary-contrast)]">
              Gebruik Word niet als einddoel, maar als zoeksignaal
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--wk-primary-contrast)]/80 sm:text-base">
              De meeste gebruikers willen uiteindelijk geen Word-bestand bewaren, maar gewoon een
              nette sollicitatieversie versturen. WerkCV verkort die route: template kiezen, inhoud
              invullen, per vacature aanscherpen en daarna als PDF downloaden.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/templates" className="wk-button wk-button-accent">
                Bekijk templates
              </Link>
              <Link href="/cv-maken-pdf" className="wk-button wk-button-secondary">
                Waarom PDF beter werkt
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <h2 className="text-center text-3xl font-semibold text-[var(--wk-ink)]">
            Veelgestelde vragen over CV maken in Word
          </h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
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
