import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const pdfBenefits = [
  "PDF houdt je layout stabiel op laptop, mobiel en ATS-preview.",
  "Recruiters zien exact dezelfde opmaak als jij bedoelde.",
  "Je voorkomt verschuivende regels of kapotte koppen uit Word-bestanden.",
  "Een PDF voelt direct definitiever en professioneler als bijlage.",
];

const pdfFlow = [
  {
    title: "1) Maak je CV eerst in een editor of vaste template",
    body: "Een PDF is een eindvorm, geen fijne schrijfomgeving. Bouw je CV eerst in een omgeving waar inhoud en layout makkelijk aanpasbaar zijn.",
  },
  {
    title: "2) Controleer titel, profiel en recente ervaring",
    body: "Zorg dat de eerste scan klopt voordat je exporteert. Een nette PDF helpt alleen als de inhoud direct relevant voelt.",
  },
  {
    title: "3) Bekijk de PDF altijd op mobiel en desktop",
    body: "Veel recruiters openen bijlagen eerst in een compacte preview. Check daarom of koppen, witruimte en bullets overal rustig blijven.",
  },
  {
    title: "4) Verstuur pas nadat je de eindversie hebt vastgezet",
    body: "PDF werkt juist goed omdat je sollicitatieversie na export niet meer ongewenst verschuift.",
  },
];

const faqs = [
  {
    question: "Hoe maak ik een cv als PDF?",
    answer:
      "De beste route is eerst je CV opbouwen in een editor of template en daarna exporteren naar PDF. Zo houd je controle over inhoud én een stabiele eindlayout.",
  },
  {
    question: "Is PDF beter dan Word voor sollicitaties?",
    answer:
      "Meestal wel. PDF voorkomt layoutverschillen en maakt de kans kleiner dat recruiters een verschoven of rommelige versie zien.",
  },
  {
    question: "Kan ik bij WerkCV een PDF-CV maken?",
    answer:
      "Ja. Je bouwt je CV in de editor op en downloadt daarna de definitieve versie als PDF zodra alles klopt.",
  },
  {
    question: "Moet een cv altijd als PDF worden verstuurd?",
    answer:
      "In de meeste gevallen wel, tenzij een werkgever expliciet om een ander formaat vraagt. PDF is voor standaardsollicitaties de veiligste keuze.",
  },
];

export const metadata: Metadata = {
  title: "CV Maken PDF - Maak Eerst Goed, Download Daarna Stabiel | WerkCV",
  description:
    "CV maken als PDF? Leer waarom PDF de beste eindvorm is voor sollicitaties en bouw je CV eerst rustig op in de editor voordat je downloadt.",
  keywords: [
    "cv maken pdf",
    "cv pdf maken",
    "pdf cv maken",
    "cv in pdf maken",
    "gratis cv maken pdf",
    "cv maken gratis pdf",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-maken-pdf",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-maken-pdf",
      "x-default": "https://werkcv.nl/cv-maken-pdf",
    },
  },
};

export default function CvMakenPdfPage() {
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
        name: "CV Maken PDF",
        item: "https://werkcv.nl/cv-maken-pdf",
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
                <span>PDF-intentie</span>
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">
                <span className="wk-hero-highlight">CV maken als PDF</span> begint met een goede
                editor, niet met een losse file
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--wk-ink-muted)]">
                Zoekers op <strong>cv maken pdf</strong> willen meestal een nette sollicitatieversie
                die overal hetzelfde oogt. PDF is inderdaad de beste eindvorm, maar niet de slimste
                startvorm. WerkCV laat je eerst opbouwen, daarna pas stabiel downloaden.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--wk-ink-muted)]">
                Deze route gaat daarom vooral over export en eindformaat. Voor de brede schrijf- en
                structuurflow gebruik je beter{" "}
                <Link
                  href="/cv-maken"
                  className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
                >
                  de algemene CV maken pagina
                </Link>
                .
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/editor" className="wk-button wk-button-primary">
                  Bouw je PDF-versie
                </Link>
                <Link href="/gratis-cv-maken" className="wk-button wk-button-secondary">
                  Start gratis
                </Link>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[`${templateList.length} templates als basis`, "Stabiele PDF als eindversie"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)] px-4 py-3 text-sm font-semibold text-[var(--wk-ink)]"
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="wk-card h-fit p-6">
              <h2 className="text-xl font-semibold text-[var(--wk-ink)]">
                Waarom PDF de beste eindvorm is
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                {pdfBenefits.map((item) => (
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
              <span>Exportflow</span>
            </div>
            <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
              Zo maak je een nette CV-PDF zonder layoutproblemen
            </h2>
            <div className="mt-6 space-y-4">
              {pdfFlow.map((step, index) => (
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
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                href: "/cv-maken",
                title: "Algemene CV-workflow",
                body: "Gebruik eerst het hoofd-stappenplan als je inhoud, structuur en ATS-logica nog moet opbouwen.",
              },
              {
                href: "/cv-maken-in-word",
                title: "CV maken in Word",
                body: "Zie waarom Word vaak vooral een tussenstap is richting PDF.",
              },
              {
                href: "/online-cv-maken",
                title: "Online CV maken",
                body: "Bouw eerst flexibel online voordat je de eindversie vastzet.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="wk-card block p-5 transition-colors hover:border-[var(--wk-primary)]"
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
          <h2 className="text-center text-3xl font-semibold text-[var(--wk-ink)]">
            Veelgestelde vragen over CV als PDF maken
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
