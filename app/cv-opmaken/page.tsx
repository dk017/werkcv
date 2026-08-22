import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const formattingSteps = [
  {
    title: "1) Begin met de juiste template",
    body: "Goede CV-opmaak begint niet in een leeg Word-document maar met een layout die al rust, hiërarchie en scanbaarheid biedt.",
  },
  {
    title: "2) Houd secties kort en voorspelbaar",
    body: "Gebruik standaardkoppen zoals Profiel, Werkervaring, Opleiding en Vaardigheden. Daardoor snappen recruiter en ATS direct je structuur.",
  },
  {
    title: "3) Laat witruimte het werk doen",
    body: "Te weinig ruimte maakt een CV vermoeiend om te scannen. Goede opmaak betekent ook bewust ruimte laten tussen onderdelen.",
  },
  {
    title: "4) Gebruik maximaal één stijlaccent",
    body: "Een subtiele accentkleur of strakkere kopstijl helpt. Meer is meestal ruis en zelden een conversievoordeel.",
  },
  {
    title: "5) Controleer altijd de PDF-eindversie",
    body: "De beste opmaak is pas goed als de PDF stabiel, leesbaar en professioneel oogt op laptop en mobiel.",
  },
];

const commonMistakes = [
  {
    title: "Te weinig witruimte",
    body: "Een volgepakt CV lijkt langer dan het is en leest trager. Geef secties ademruimte.",
  },
  {
    title: "Onrustige koppen en marges",
    body: "Inconsistente kopgroottes en wisselende marges maken je CV rommelig, ook als de inhoud goed is.",
  },
  {
    title: "Te veel design-elementen",
    body: "Grafieken, iconen en blokken helpen zelden bij standaard sollicitaties en kunnen ATS-verwerking verstoren.",
  },
  {
    title: "Goede inhoud in verkeerde layout",
    body: "Zelfs sterke ervaring verliest impact als de opmaak de logica van je verhaal niet ondersteunt.",
  },
];

const faqs = [
  {
    question: "Wat betekent cv opmaken precies?",
    answer:
      "CV opmaken betekent dat je de structuur, witruimte, koppen en visuele hiërarchie zo instelt dat recruiters je inhoud snel kunnen scannen.",
  },
  {
    question: "Is cv opmaken hetzelfde als cv ontwerp?",
    answer:
      "Niet helemaal. Ontwerp klinkt vaak creatiever. Opmaken gaat vooral over leesbaarheid, rust en een professionele recruiter-proof layout.",
  },
  {
    question: "Moet ik mijn cv in Word opmaken?",
    answer:
      "Dat kan, maar een vaste editor met templates geeft meestal sneller een consistente en stabiele PDF zonder layoutproblemen.",
  },
  {
    question: "Welke cv-opmaak werkt het best voor ATS?",
    answer:
      "Een rustige layout met standaardsecties, beperkte visuele complexiteit en duidelijke koppen werkt het best voor ATS en recruiters.",
  },
];

export const metadata: Metadata = {
  title: "CV Opmaken - Professionele Layout Tips en Voorbeelden | WerkCV",
  description:
    "CV opmaken zonder rommelige layout? Leer hoe je je CV professioneel, ATS-vriendelijk en scanbaar opmaakt en pas het direct toe in de editor.",
  keywords: [
    "cv opmaken",
    "cv opmaak",
    "opmaak cv",
    "cv layout maken",
    "cv mooi maken",
    "professioneel cv opmaken",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-opmaken",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-opmaken",
      "x-default": "https://werkcv.nl/cv-opmaken",
    },
  },
};

export default function CvOpmakenPage() {
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
        name: "CV Opmaken",
        item: "https://werkcv.nl/cv-opmaken",
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
                <span>Layout-intentie</span>
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">
                <span className="wk-hero-highlight">CV opmaken</span> zodat recruiters direct zien
                wat telt
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--wk-ink-muted)]">
                Goede CV-opmaak maakt je ervaring sneller leesbaar, professioneler en
                betrouwbaarder. De meeste kandidaten verliezen niet op inhoud, maar op onrustige
                opmaak. Hier zie je hoe je die fout voorkomt en hoe je die verbeteringen direct
                toepast in WerkCV.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--wk-ink-muted)]">
                Deze route gaat bewust over layout en visuele rust, niet over de hele
                schrijfstrategie. Voor de algemene workflow rond inhoud, structuur en sub-intents
                gebruik je{" "}
                <Link
                  href="/cv-maken"
                  className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
                >
                  de CV maken gids
                </Link>
                .
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/editor" className="wk-button wk-button-primary">
                  Pas je opmaak direct toe
                </Link>
                <Link href="/cv-opmaak-voorbeeld" className="wk-button wk-button-secondary">
                  Bekijk opmaakvoorbeelden
                </Link>
              </div>
            </div>

            <div className="wk-card h-fit p-6">
              <h2 className="text-xl font-semibold text-[var(--wk-ink)]">Snelle opmaakregels</h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                <li>Gebruik vaste secties en logische volgorde.</li>
                <li>Laat witruimte werken in plaats van extra design.</li>
                <li>Beperk accentkleuren en decoratie.</li>
                <li>Controleer altijd de PDF-eindversie voor je solliciteert.</li>
              </ul>
              <div className="mt-6 border-t border-[var(--wk-border)] pt-5">
                <Link
                  href="/cv-maken-template"
                  className="text-sm font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
                >
                  Begin eerst met de juiste template
                </Link>
              </div>
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
              Zo maak je je CV-opmaak sterker in plaats van drukker
            </h2>
            <div className="mt-8 space-y-5">
              {formattingSteps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--wk-accent-soft)] text-sm font-semibold text-[var(--wk-primary)]">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--wk-ink)]">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--wk-ink-muted)]">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="grid gap-6 md:grid-cols-2">
            {commonMistakes.map((item) => (
              <article key={item.title} className="wk-card p-6">
                <h2 className="text-xl font-semibold text-[var(--wk-ink)]">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                href: "/cv-opmaak-voorbeeld",
                title: "CV opmaak voorbeeld",
                body: "Zie goede en slechte layoutkeuzes naast elkaar.",
              },
              {
                href: "/cv-maken-template",
                title: "CV maken template",
                body: "Kies eerst een rustige basislayout voor je sollicitatie.",
              },
              {
                href: "/modern-cv-voorbeeld",
                title: "Modern CV voorbeeld",
                body: "Voor functies waar een frissere uitstraling logisch is.",
              },
              {
                href: "/professioneel-cv-voorbeeld",
                title: "Professioneel CV voorbeeld",
                body: "Voor zakelijke functies waar rust en structuur zwaarder wegen.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-5 transition-colors hover:border-[var(--wk-primary)] hover:bg-[var(--wk-accent-soft)]"
              >
                <p className="text-sm font-semibold text-[var(--wk-ink)]">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="rounded-[var(--wk-radius-lg)] bg-[var(--wk-primary)] p-8 md:p-12">
            <h2 className="text-3xl font-semibold text-[var(--wk-primary-contrast)]">
              Rustige CV-opmaak wint vaker dan opvallende CV-opmaak
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--wk-primary-contrast)]/80">
              Voor de meeste Nederlandse vacatures is een professionele, scanbare layout de beste
              keuze. WerkCV helpt je die versie snel te bouwen zonder dat je zelf in Word of Canva
              hoeft te worstelen met marges en stijl.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/editor" className="wk-button wk-button-accent">
                Start met opmaken
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
            Veelgestelde vragen over CV opmaken
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="wk-card p-6">
                <h3 className="text-lg font-semibold text-[var(--wk-ink)]">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--wk-ink-muted)]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer variant="brand" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </main>
  );
}
