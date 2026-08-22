import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const mobileAdvantages = [
  "Snel kleine aanpassingen doen tussen werk, studie of reizen door.",
  "Direct reageren op een vacature zodra je die ziet.",
  "Geen laptop nodig voor profieltekst, titel of snelle vacatureversie.",
  "Makkelijker voor starters en bijbaanzoekers die vooral mobiel werken.",
];

const mobileFlow = [
  {
    title: "1) Kies een rustige template die goed schaalt op kleine schermen",
    body: "Mobiel werken vraagt om minder frictie. Begin met een template die je inhoud compact en overzichtelijk houdt.",
  },
  {
    title: "2) Vul eerst titel, profiel en recente ervaring in",
    body: "Op mobiel win je door de belangrijkste stukken eerst af te maken. Detailoptimalisatie kan daarna nog steeds.",
  },
  {
    title: "3) Gebruik mobiel voor snelle vacature-aanpassingen",
    body: "Een functietitel, profieltekst of paar bullets aanpassen gaat vaak prima op je telefoon en bespaart uitstel.",
  },
  {
    title: "4) Controleer daarna de volledige versie voor download",
    body: "Mobiel is sterk voor snelheid, maar je wilt de eindversie nog steeds rustig nalopen voordat je je PDF verstuurt.",
  },
];

const faqs = [
  {
    question: "Kan ik echt een cv maken op mobiel?",
    answer:
      "Ja. Voor veel gebruikers is mobiel prima voor starten, invullen en snelle aanpassingen. Voor de eindcheck is het slim om nog even rustig naar de volledige versie te kijken.",
  },
  {
    question: "Is cv maken op telefoon handig voor sollicitaties?",
    answer:
      "Ja, vooral als je snel wilt reageren op vacatures of onderweg kleine wijzigingen wilt maken. Het verlaagt de drempel om meteen te beginnen.",
  },
  {
    question: "Wat moet ik eerst doen als ik mijn cv op mobiel maak?",
    answer:
      "Begin met functietitel, profieltekst en recente werkervaring. Daarmee staat de kern van je sollicitatie al snel goed.",
  },
  {
    question: "Kan ik daarna ook een PDF downloaden?",
    answer:
      "Ja. WerkCV laat je mobiel werken en daarna de definitieve PDF downloaden zodra je versie klaar is.",
  },
];

export const metadata: Metadata = {
  title: "CV Maken op Mobiel - Snel Je CV Bouwen op Telefoon | WerkCV",
  description:
    "CV maken op mobiel of telefoon? Werk sneller vanuit een vaste template, pas je profiel en ervaring direct aan en download daarna je PDF.",
  keywords: [
    "cv maken op mobiel",
    "cv maken op telefoon",
    "mobiel cv maken",
    "cv op telefoon maken",
    "cv maken mobile",
    "cv maken smartphone",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-maken-op-mobiel",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-maken-op-mobiel",
      "x-default": "https://werkcv.nl/cv-maken-op-mobiel",
    },
  },
};

export default function CvMakenOpMobielPage() {
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
        name: "CV Maken op Mobiel",
        item: "https://werkcv.nl/cv-maken-op-mobiel",
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
                <span>Mobiele intentie</span>
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">
                <span className="wk-hero-highlight">CV maken op mobiel</span> zodat je direct kunt
                starten, ook zonder laptop
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--wk-ink-muted)]">
                Zoekers op <strong>cv maken op mobiel</strong> of{" "}
                <strong>cv maken op telefoon</strong> willen vooral snelheid. Geen uitstel tot ze
                achter een laptop zitten, maar meteen een serieuze sollicitatieversie starten. Deze
                pagina laat zien hoe je dat praktisch en zonder rommelige flow doet.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--wk-ink-muted)]">
                Deze pagina gaat dus over apparaatkeuze en snelheid, niet over de hele
                CV-strategie. Voor de brede workflow rond inhoud, structuur en ATS gebruik je beter
                de{" "}
                <Link
                  href="/cv-maken"
                  className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
                >
                  algemene CV maken gids
                </Link>
                .
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/editor" className="wk-button wk-button-primary">
                  Start mobiel je CV
                </Link>
                <Link href="/gratis-cv-maken" className="wk-button wk-button-secondary">
                  Start gratis
                </Link>
              </div>
            </div>

            <div className="wk-card h-fit p-6">
              <h2 className="text-xl font-semibold text-[var(--wk-ink)]">
                Waarom mobiel interessant is
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                {mobileAdvantages.map((item) => (
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
              <span>Mobiele workflow</span>
            </div>
            <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
              Zo gebruik je mobiel slim voor je CV
            </h2>
            <div className="mt-6 space-y-4">
              {mobileFlow.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--wk-accent-soft)] text-sm font-semibold text-[var(--wk-primary)]">
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
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                href: "/online-cv-maken",
                title: "Online CV maken",
                body: "Brede online flow als je buiten mobiel ook laptopgebruik meeneemt.",
              },
              {
                href: "/cv-maken-pdf",
                title: "CV maken PDF",
                body: "Zet je mobiele versie daarna stabiel om naar de eind-PDF.",
              },
              {
                href: "/cv-maken",
                title: "Algemene CV-workflow",
                body: "Gebruik de hoofdgids als je naast mobiel gemak ook inhoud, structuur en ATS-stappen wilt aanscherpen.",
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
            Veelgestelde vragen over CV maken op mobiel
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
