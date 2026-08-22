import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { buildDutchMetadata } from "@/lib/page-metadata";
import { templateList } from "@/lib/templates/registry";

const topTemplates = templateList.filter((template) =>
  ["professional", "ats", "simple", "modern"].includes(template.id),
);

const structureSteps = [
  {
    title: "1) Contactgegevens + functietitel",
    body: "Begin met naam, telefoon, e-mail, woonplaats en een duidelijke functietitel die aansluit op de vacature. Voeg alleen links toe die echt professioneel relevant zijn, zoals LinkedIn.",
  },
  {
    title: "2) Korte profieltekst (3-4 zinnen)",
    body: "Vat samen wie je bent, welke ervaring je meebrengt en welke waarde je toevoegt. Schrijf vacaturegericht en verwerk kernwoorden op een natuurlijke manier.",
  },
  {
    title: "3) Werkervaring in omgekeerd chronologische volgorde",
    body: "Start met je meest recente functie. Zet per rol 3 tot 6 bullets met actie, context en resultaat. Vermijd alleen taakomschrijvingen.",
  },
  {
    title: "4) Opleiding en relevante cursussen",
    body: "Noem opleiding, instelling en periode. Voeg alleen trainingen en certificaten toe die helpen voor deze functie.",
  },
  {
    title: "5) Vaardigheden en tools",
    body: "Combineer harde vaardigheden (software, methodes, talen) met soft skills die je kunt onderbouwen in ervaring of projecten.",
  },
  {
    title: "6) Eventuele extra secties",
    body: "Voeg alleen nevenactiviteiten, vrijwilligerswerk, projecten of certificeringen toe als ze bijdragen aan je geschiktheid voor de rol.",
  },
];

const roleVariants = [
  {
    title: "Starter opstellen",
    bullets: [
      "Plaats profieltekst en vaardigheden hoog op de pagina.",
      "Gebruik stages, bijbanen en projecten als bewijs.",
      "Houd het meestal op 1 pagina met focus op potentie.",
    ],
  },
  {
    title: "Medior/senior opstellen",
    bullets: [
      "Leg nadruk op recente functies en meetbare impact.",
      "Gebruik 1 tot 2 pagina's, met selectie op relevantie.",
      "Zet leiderschap, scope en verbeterresultaten expliciet neer.",
    ],
  },
  {
    title: "Carriere switch opstellen",
    bullets: [
      "Begin met overdraagbare skills in profieltekst.",
      "Gebruik skills-sectie en projecten om brug naar nieuwe rol te maken.",
      "Laat oude ervaring alleen staan als die direct relevant is.",
    ],
  },
];

const sectionExamples = [
  {
    title: "Profieltekst (goed opgesteld)",
    text: "Resultaatgerichte administratief medewerker met 5 jaar ervaring in dossierbeheer, facturatie en procesoptimalisatie. Verminderde correcties in maandafsluitingen met 28% door extra controlepunten in te voeren. Ik combineer nauwkeurigheid met duidelijke communicatie richting finance en operations.",
  },
  {
    title: "Werkervaring bullet (goed opgesteld)",
    text: "Factuurverwerking gestandaardiseerd met een controleworkflow, waardoor herstelwerk in de maandafsluiting met 30% daalde.",
  },
  {
    title: "Vaardigheden (goed opgesteld)",
    text: "Excel (gevorderd), Office 365, AFAS, rapportage, kwaliteitscontrole, prioriteiten stellen, stakeholdercommunicatie.",
  },
];

const mistakes = [
  {
    title: "Fout: cv opstellen als lange tekst zonder blokken",
    fix: "Fix: gebruik vaste secties met duidelijke koppen en witruimte. Recruiters scannen snel; structuur wint.",
  },
  {
    title: "Fout: alles opnemen zonder selectie",
    fix: "Fix: laat alleen ervaring en skills staan die relevant zijn voor de vacature waarop je nu solliciteert.",
  },
  {
    title: "Fout: werkervaring zonder resultaten",
    fix: "Fix: herschrijf per rol naar actie + resultaat + context. Waar mogelijk met cijfers.",
  },
  {
    title: "Fout: opmaak die ATS lastig leest",
    fix: "Fix: vermijd te veel grafische elementen, hou sectienamen standaard en lever als PDF aan.",
  },
];

const atsChecklist = [
  "Gebruik herkenbare sectietitels zoals Werkervaring, Opleiding, Vaardigheden.",
  "Gebruik vacaturetaal in functietitel, profieltekst en werkervaring.",
  "Vermijd overmatig grafische elementen die parsing kunnen verstoren.",
  "Controleer op consistente datumnotatie en heldere volgorde.",
  "Exporteer als PDF zodat opmaak stabiel blijft.",
];

const faqs = [
  {
    question: "Wat betekent een cv goed opstellen?",
    answer:
      "Dat je informatie logisch ordent zodat recruiter en ATS in seconden begrijpen wat je kunt. Het gaat om volgorde, selectie en leesbaarheid, niet alleen om design.",
  },
  {
    question: "Wat is de beste volgorde voor een cv?",
    answer:
      "Voor de meeste sollicitaties werkt: contactgegevens, profieltekst, werkervaring, opleiding, vaardigheden en daarna optionele secties zoals certificaten of vrijwilligerswerk.",
  },
  {
    question: "Hoe stel ik een cv op zonder veel werkervaring?",
    answer:
      "Gebruik een sterke profieltekst, zet relevante vaardigheden vroeg in je CV en gebruik stages, projecten of vrijwilligerswerk als bewijs van inzet en resultaat.",
  },
  {
    question: "Moet ik mijn cv per vacature opnieuw opstellen?",
    answer:
      "Ja, meestal wel. Pas functietitel, profieltekst en prioriteit in werkervaring aan op de vacature. Dat verhoogt je match en je kans op reactie.",
  },
  {
    question: "Is 1 pagina altijd beter dan 2 pagina's?",
    answer:
      "Niet altijd. Starters kunnen vaak op 1 pagina blijven, ervaren kandidaten mogen naar 2 pagina's als alle informatie relevant en scanbaar blijft.",
  },
];

const sources = [
  {
    label: "werk.nl - Cv maken (onderdelen, volgorde, PDF-tip)",
    href: "https://www.werk.nl/werkzoekenden/solliciteren/tips/cv/",
  },
  {
    label: "UWV Inspiratie - Dit willen werkgevers lezen op je cv",
    href: "https://inspiratie.uwv.nl/loopbaan/dit-willen-werkgevers-lezen-op-je-cv-dukke-geeft-tips",
  },
  {
    label: "Indeed NL - Hoe maak je een cv",
    href: "https://nl.indeed.com/carrieregids/cv-motivatiebrief/hoe-maak-je-een-cv",
  },
  {
    label: "Indeed Support - ATS-vriendelijke opmaak (geen zware grafische opmaak)",
    href: "https://support.indeed.com/hc/nl/articles/11314976176141-Veelgestelde-vragen-Een-cv-bestand-aanmaken-uploaden-en-beheren",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "CV opstellen met de juiste structuur en volgorde | WerkCV",
  description:
    "CV opstellen met duidelijke secties, logische volgorde en recruiter-proof voorbeelden per onderdeel. Voor structuur-intentie, niet voor templatevergelijking.",
  path: "/cv-opstellen",
  keywords: [
    "cv opstellen",
    "opstellen cv",
    "opstellen van een cv",
    "cv opstellen voorbeeld",
    "hoe cv opstellen",
    "cv structuur",
    "cv volgorde",
    "curriculum vitae opstellen",
  ],
  languages: {
    "nl-NL": "https://werkcv.nl/cv-opstellen",
    "x-default": "https://werkcv.nl/cv-opstellen",
  },
});

export default function CvOpstellenPage() {
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
        name: "CV Opstellen",
        item: "https://werkcv.nl/cv-opstellen",
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
                <span>Structuur-intentie: CV opstellen</span>
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">
                <span className="wk-hero-highlight">CV opstellen</span> met de juiste volgorde en
                inhoud per sectie
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--wk-ink-muted)]">
                Veel kandidaten weten wat ze willen vertellen, maar niet hoe ze hun CV logisch
                moeten opstellen. Op deze pagina krijg je een duidelijk opbouwmodel, voorbeelden
                per sectie en varianten voor starter, medior en carriere switch. Zo zet je snel een
                CV neer dat zowel recruiters als ATS-systemen goed kunnen lezen.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--wk-ink-muted)]">
                Deze pagina bezit dus vooral de structuur- en volgorde-intentie. Voor de bredere
                route met ook templatekeuze, gratis starten en andere sub-intents ga je terug naar{" "}
                <Link
                  href="/cv-maken"
                  className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
                >
                  CV maken
                </Link>
                .
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/templates" className="wk-button wk-button-primary">
                  Kies template voor je opbouw
                </Link>
                <Link href="/cv-opmaak-voorbeeld" className="wk-button wk-button-secondary">
                  Bekijk cv opmaak voorbeelden
                </Link>
                <Link href="/cv-maken" className="wk-button wk-button-secondary">
                  Naar complete CV gids
                </Link>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  "Volgorde + sectie-opbouw",
                  "Voorbeelden en foutcorrecties",
                  "Start gratis, betaal bij download",
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
                Snelle check voor een goed opgesteld CV
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                <li>
                  <strong className="text-[var(--wk-ink)]">Duidelijke secties:</strong> profiel,
                  werkervaring, opleiding, vaardigheden.
                </li>
                <li>
                  <strong className="text-[var(--wk-ink)]">Logische volgorde:</strong> meest
                  relevante info bovenaan.
                </li>
                <li>
                  <strong className="text-[var(--wk-ink)]">Korte bullets:</strong> geen lange lappen
                  tekst.
                </li>
                <li>
                  <strong className="text-[var(--wk-ink)]">Vacaturematch:</strong> termen en
                  prioriteiten sluiten aan op de rol.
                </li>
              </ul>
              <div className="mt-6 border-t border-[var(--wk-border)] pt-5">
                <Link
                  href="/tools/cv-keywords"
                  className="text-sm font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
                >
                  Controleer je vacaturematch met de keywords tool
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="wk-eyebrow mb-3">
            <span>Structuurmodel</span>
          </div>
          <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
            CV opstellen in 6 vaste onderdelen
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {structureSteps.map((step) => (
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
          <div className="grid gap-6 md:grid-cols-3">
            {roleVariants.map((variant) => (
              <article key={variant.title} className="wk-card p-5">
                <h3 className="text-xl font-semibold text-[var(--wk-ink)]">{variant.title}</h3>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                  {variant.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="wk-eyebrow mb-3">
            <span>Voorbeeldblokken</span>
          </div>
          <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
            Zo ziet een goed opgesteld CV eruit in de praktijk
          </h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {sectionExamples.map((item) => (
              <article key={item.title} className="wk-card p-6">
                <h3 className="text-lg font-semibold text-[var(--wk-ink)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/tools/profieltekst-generator"
              className="wk-button wk-button-primary wk-button-small"
            >
              Genereer profieltekst
            </Link>
            <Link
              href="/tools/werkervaring-bullets"
              className="wk-button wk-button-secondary wk-button-small"
            >
              Maak werkervaring bullets
            </Link>
            <Link
              href="/vaardigheden-cv-voorbeelden"
              className="wk-button wk-button-secondary wk-button-small"
            >
              Bekijk vaardigheden voorbeelden
            </Link>
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="wk-eyebrow mb-3">
                <span>Aanbevolen templates</span>
              </div>
              <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
                Kies een layout die je opstelling ondersteunt
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
            {topTemplates.map((template) => (
              <article key={template.id} className="wk-card flex h-full flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wk-ink-muted)]">
                  {template.nameDutch}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-[var(--wk-ink)]">{template.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                  {template.description}
                </p>
                <div className="mt-auto pt-5">
                  <Link href="/templates" className="wk-button wk-button-primary wk-button-small">
                    Vergelijk templates
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="wk-card wk-card-warning p-6">
              <div className="wk-eyebrow mb-3">
                <span>Fouten en fixes</span>
              </div>
              <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">
                Veelgemaakte fouten bij CV opstellen
              </h2>
              <div className="mt-4 space-y-3">
                {mistakes.map((item) => (
                  <div key={item.title}>
                    <p className="text-sm font-semibold leading-6 text-[var(--wk-ink)]">
                      {item.title}
                    </p>
                    <p className="text-sm leading-6 text-[var(--wk-ink-muted)]">{item.fix}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="wk-card p-6">
              <div className="wk-eyebrow mb-3">
                <span>ATS-check</span>
              </div>
              <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">
                ATS-vriendelijke opstelling checklist
              </h2>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
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
              <div className="mt-6 border-t border-[var(--wk-border)] pt-4">
                <Link
                  href="/ats-cv-template"
                  className="text-sm font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
                >
                  Vergelijk met ATS CV template
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
            Onderbouwde richtlijnen (gecheckt op 8 maart 2026)
          </h2>
          <div className="mt-8 space-y-3">
            {sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="block rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-4 text-sm leading-6 text-[var(--wk-ink-muted)] transition-colors hover:bg-[var(--wk-accent-soft)]"
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
          <div className="grid gap-6 md:grid-cols-2">
            <div className="wk-card p-6">
              <div className="wk-eyebrow mb-3">
                <span>Verwante intenties</span>
              </div>
              <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">
                Pagina&apos;s die dicht op CV opstellen zitten
              </h2>
              <div className="mt-4 grid gap-4">
                {[
                  {
                    href: "/cv-maken",
                    title: "CV maken",
                    body: "De bredere gids als je behalve structuur ook hulp zoekt bij profieltekst, bullets en templatekeuze.",
                  },
                  {
                    href: "/curriculum-vitae-maken",
                    title: "Curriculum vitae maken",
                    body: "Formelere variant voor bezoekers die zakelijker taalgebruik gebruiken maar dezelfde opbouw nodig hebben.",
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4 transition-colors hover:border-[var(--wk-primary)]"
                  >
                    <p className="text-sm font-semibold text-[var(--wk-ink)]">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.body}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="wk-card p-6">
              <div className="wk-eyebrow mb-3">
                <span>Prijs- en startintentie</span>
              </div>
              <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">
                Routes voor gratis starten of direct bouwen
              </h2>
              <div className="mt-4 grid gap-4">
                {[
                  {
                    href: "/gratis-cv-maken",
                    title: "Gratis CV maken",
                    body: "Legt helder uit hoe gratis starten werkt en wanneer de eenmalige betaling pas in beeld komt.",
                  },
                  {
                    href: "/online-cv-maken",
                    title: "Online CV maken",
                    body: "Logische vervolgroute voor bezoekers die structuur zoeken, maar liever meteen online in een builder werken.",
                  },
                  {
                    href: "/prijzen",
                    title: "Prijzen",
                    body: "Bekijk het betaalmodel als je wilt snappen hoe gratis bewerken en betaald downloaden samenkomen.",
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4 transition-colors hover:border-[var(--wk-primary)]"
                  >
                    <p className="text-sm font-semibold text-[var(--wk-ink)]">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.body}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <h2 className="text-center text-3xl font-semibold text-[var(--wk-ink)]">
            Veelgestelde vragen over CV opstellen
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
                  Klaar om je CV echt goed op te stellen?
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-[var(--wk-primary-contrast)]">
                  Zet de juiste structuur direct om naar je eigen CV
                </h2>
                <p className="mt-2 text-sm leading-7 text-[var(--wk-primary-contrast)]/80 sm:text-base">
                  Gebruik deze opbouw, kies daarna een rustige template en werk je CV zonder
                  opmaakgedoe verder uit.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/templates" className="wk-button wk-button-secondary">
                  Vergelijk templates
                </Link>
                <Link href="/cv-maken" className="wk-button wk-button-accent">
                  Start met je basis-CV
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
