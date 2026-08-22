import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const featuredTemplates = templateList.filter((template) =>
  ["professional", "ats", "simple", "modern"].includes(template.id),
);

const whenEnglishCv = [
  "Je solliciteert bij een internationale werkgever of Engelstalig team.",
  "De vacature en functietitel zijn volledig in het Engels.",
  "Je werkt in een context met internationale stakeholders.",
  "De recruiter vraagt expliciet om een English resume/CV.",
];

const workflowSteps = [
  {
    title: "1) Start met de juiste Engelse functietitel",
    body: "Gebruik de titel uit de vacature. Geen letterlijke vertaling van je Nederlandse functienaam als die niet gangbaar is.",
  },
  {
    title: "2) Schrijf een korte professional summary",
    body: "Gebruik 3 tot 4 zinnen met focus op ervaring, specialisatie en impact. Houd toon direct en resultaatgericht.",
  },
  {
    title: "3) Beschrijf work experience met impact bullets",
    body: "Per functie 3 tot 6 bullets: action + context + result. Gebruik actieve werkwoorden zoals improved, delivered, led, reduced.",
  },
  {
    title: "4) Selecteer skills die aansluiten op de vacature",
    body: "Combineer technical skills en soft skills, maar alleen als je ze kunt onderbouwen in je ervaring of projecten.",
  },
  {
    title: "5) Pas layout en taal aan op internationale lezer",
    body: "Gebruik duidelijke sectietitels, korte zinnen en consistente datums. Vermijd lokale afkortingen zonder uitleg.",
  },
  {
    title: "6) Match je English CV met een English cover letter",
    body: "Laat terminologie en tone of voice overeenkomen tussen CV en brief voor een consistente sollicitatie.",
  },
];

const languageMistakes = [
  {
    title: "Letterlijke vertaling van profieltekst",
    wrong: "I am a driven and eager employee.",
    better:
      "Results-driven operations professional with 5 years of experience improving process efficiency and service quality.",
  },
  {
    title: "Taken zonder resultaat",
    wrong: "Responsible for customer service and administration.",
    better:
      "Handled 45+ customer cases daily and improved case resolution speed by 17% through a clearer escalation process.",
  },
  {
    title: "Vage skills zonder context",
    wrong: "Good communication and teamwork.",
    better:
      "Collaborated with sales, support, and operations teams to reduce onboarding delays by 22%.",
  },
];

const summaryExamples = [
  {
    title: "Summary example (operations)",
    text: "Operations professional with 6 years of experience in process optimization, planning, and cross-team coordination. Reduced workflow delays by 24% by redesigning internal handover procedures. Strong in data-driven decision-making and stakeholder communication.",
  },
  {
    title: "Summary example (starter)",
    text: "Motivated graduate with internship experience in customer support, reporting, and project coordination. Built a weekly action dashboard that improved follow-up consistency across the team. Eager to contribute in a junior role with high ownership and learning speed.",
  },
  {
    title: "Summary example (software)",
    text: "Full-stack developer with 5 years of experience building TypeScript and Node.js products. Improved release reliability and reduced deployment errors through CI/CD hardening and automated testing. Focused on scalable systems with measurable product impact.",
  },
];

const atsChecklist = [
  "Use standard headings: Summary, Experience, Education, Skills.",
  "Keep date formats consistent (e.g., Jan 2023 - Present).",
  "Use role-relevant keywords from the vacancy naturally.",
  "Avoid heavy graphics that can break parsing.",
  "Export as PDF after final review.",
];

const faqs = [
  {
    question: "Wanneer moet ik mijn CV in het Engels maken?",
    answer:
      "Als de vacature Engelstalig is of je solliciteert bij een internationaal team. Volg dan ook de Engelse stijl: direct, kort en resultaatgericht.",
  },
  {
    question: "Is cv maken in engels hetzelfde als vertalen?",
    answer:
      "Nee. Een goede Engelse CV vraagt vaak herschrijven in plaats van letterlijk vertalen. Focus op impacttaal en internationale terminologie.",
  },
  {
    question: "Hoe lang moet een Engels CV zijn?",
    answer:
      "Voor starters meestal 1 pagina, voor ervaren kandidaten 1 tot 2 pagina's. Relevantie en scanbaarheid blijven belangrijker dan lengte.",
  },
  {
    question: "Moet ik ook een Engelse sollicitatiebrief toevoegen?",
    answer:
      "Ja, zeker bij Engelstalige vacatures. Gebruik dezelfde termen en toon als in je CV voor een consistente sollicitatie.",
  },
  {
    question: "Welke template werkt het best voor een English CV?",
    answer:
      "In de meeste gevallen een rustige, professionele of ATS-vriendelijke template met duidelijke koppen en weinig visuele ruis.",
  },
];

const sources = [
  {
    label: "Indeed NL - CV in het Engels: opbouw en voorbeelden",
    href: "https://nl.indeed.com/carrieregids/cv-motivatiebrief/cv-in-engels",
  },
  {
    label: "Resume.io - Resume examples and English writing patterns",
    href: "https://resume.io/resume-examples",
  },
  {
    label: "Zety - Resume examples and ATS-friendly guidance",
    href: "https://zety.com/resume-examples",
  },
  {
    label: "Prospects UK - How to write a CV",
    href: "https://www.prospects.ac.uk/careers-advice/cvs-and-cover-letters/how-to-write-a-cv",
  },
];

export const metadata: Metadata = {
  title: "CV Maken in Engels - Voorbeelden, Structuur en Tips | WerkCV",
  description:
    "CV maken in Engels? Gebruik een duidelijke opbouw, Engelse voorbeeldzinnen en fout-naar-goed correcties. Start direct in de editor.",
  keywords: [
    "cv maken in engels",
    "cv in engels maken",
    "engels cv maken",
    "cv engels maken",
    "cv maken engels",
    "cv in het engels maken",
    "engelse cv opstellen",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-maken-in-engels",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-maken-in-engels",
      "x-default": "https://werkcv.nl/cv-maken-in-engels",
    },
  },
};

export default function CvMakenInEngelsPage() {
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
        name: "CV Maken in Engels",
        item: "https://werkcv.nl/cv-maken-in-engels",
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
                <span>Taal-intentie: cv maken in engels</span>
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">
                <span className="wk-hero-highlight">CV maken in Engels</span> zonder letterlijke
                vertaalfouten
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--wk-ink-muted)]">
                Een goed Engels CV is niet je Nederlandse CV in Google Translate. Je hebt een
                directere toon, duidelijke impact-bullets en internationale terminologie nodig. Op
                deze pagina krijg je een complete workflow, copy-ready Engelse voorbeelden en fouten
                die je direct kunt corrigeren.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--wk-ink-muted)]">
                Deze pagina is bedoeld voor Nederlandse zoekers die een Engelstalig CV willen
                schrijven. Zoek je juist de brede Nederlandse CV-workflow? Gebruik{" "}
                <Link
                  href="/cv-maken"
                  className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
                >
                  CV maken
                </Link>
                . Wil je direct in een Engelstalige interface werken? Ga dan naar{" "}
                <Link
                  href="/en"
                  className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
                >
                  /en
                </Link>
                .
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/editor" className="wk-button wk-button-primary">
                  Maak je English CV
                </Link>
                <Link href="/sollicitatiebrief-in-engels" className="wk-button wk-button-secondary">
                  Match met English cover letter
                </Link>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  "English summary + bullet examples",
                  "Fout-naar-goed vertalingen",
                  "Internationale sollicitatieflow",
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
                Wanneer kies je voor een English CV?
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                {whenEnglishCv.map((item) => (
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
              <div className="mt-6 border-t border-[var(--wk-border)] pt-5">
                <Link
                  href="/engels-cv-template"
                  className="text-sm font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
                >
                  Bekijk ook: Engels CV template
                </Link>
                <span className="mx-2 text-[var(--wk-ink-muted)]">|</span>
                <Link
                  href="/engels-cv-voorbeeld"
                  className="text-sm font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
                >
                  Engels CV voorbeeld
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="wk-eyebrow mb-3">
            <span>Workflow</span>
          </div>
          <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
            CV in Engels maken in 6 stappen
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {workflowSteps.map((step) => (
              <article key={step.title} className="wk-card p-5 md:p-6">
                <h3 className="text-lg font-semibold text-[var(--wk-ink)]">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--wk-ink-muted)]">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="wk-eyebrow mb-3">
                <span>Templatekeuze</span>
              </div>
              <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
                Templates die goed werken voor English CVs
              </h2>
            </div>
            <Link
              href="/templates"
              className="text-sm font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
            >
              Bekijk alle templates
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredTemplates.map((template) => (
              <article key={template.id} className="wk-card flex h-full flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wk-ink-muted)]">
                  {template.nameDutch}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-[var(--wk-ink)]">{template.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                  {template.description}
                </p>
                <div className="mt-auto pt-5">
                  <Link href="/editor" className="wk-button wk-button-primary wk-button-small">
                    Start in editor
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="wk-eyebrow mb-3">
            <span>Copy-ready English</span>
          </div>
          <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
            English summary voorbeelden voor je CV
          </h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {summaryExamples.map((example) => (
              <article key={example.title} className="wk-card p-6">
                <h3 className="text-lg font-semibold text-[var(--wk-ink)]">{example.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--wk-ink-muted)]">{example.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/tools/profieltekst-generator"
              className="wk-button wk-button-primary wk-button-small"
            >
              Gebruik profieltekst tool
            </Link>
            <Link href="/tools/cv-keywords" className="wk-button wk-button-secondary wk-button-small">
              Check English keywords
            </Link>
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="wk-card wk-card-warning p-6">
              <div className="wk-eyebrow mb-3">
                <span>Fout naar goed</span>
              </div>
              <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">
                Typische taalfouten bij CV maken in Engels
              </h2>
              <div className="mt-4 space-y-4">
                {languageMistakes.map((item) => (
                  <div key={item.title}>
                    <p className="text-sm font-semibold leading-6 text-[var(--wk-ink)]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[var(--wk-ink-muted)]">
                      <span className="font-semibold">Wrong:</span> {item.wrong}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[var(--wk-ink)]">
                      <span className="font-semibold">Better:</span> {item.better}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="wk-card p-6">
              <div className="wk-eyebrow mb-3">
                <span>ATS-check</span>
              </div>
              <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">
                ATS checklist voor je English CV
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                {atsChecklist.map((item) => (
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
              <div className="mt-6 border-t border-[var(--wk-border)] pt-5">
                <Link
                  href="/sollicitatiebrief-in-engels"
                  className="text-sm font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
                >
                  Combineer met sollicitatiebrief in Engels
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="wk-eyebrow mb-3">
            <span>Bronnen en checkdatum</span>
          </div>
          <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
            Richtlijnen gecheckt op 8 maart 2026
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="block rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4 text-sm leading-6 text-[var(--wk-ink-muted)] transition-colors hover:border-[var(--wk-primary)]"
              >
                <span className="font-semibold text-[var(--wk-ink)]">{source.label}</span>
                <span className="mt-1 block break-all">{source.href}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <h2 className="text-center text-3xl font-semibold text-[var(--wk-ink)]">
            Veelgestelde vragen over cv maken in engels
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

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="rounded-[var(--wk-radius-lg)] bg-[var(--wk-primary)] p-8 md:p-12">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wk-primary-contrast)]/80">
                  Klaar voor internationale sollicitaties?
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-[var(--wk-primary-contrast)]">
                  Bouw nu je Engelse CV en maak direct een consistente sollicitatie
                </h2>
                <p className="mt-2 text-sm leading-7 text-[var(--wk-primary-contrast)]/80 sm:text-base">
                  Start in de editor, gebruik de voorbeeldzinnen op deze pagina en koppel daarna een
                  Engelse sollicitatiebrief.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/editor" className="wk-button wk-button-accent">
                  Open editor
                </Link>
                <Link href="/prijzen" className="wk-button wk-button-secondary">
                  Bekijk prijzen
                </Link>
              </div>
            </div>
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
