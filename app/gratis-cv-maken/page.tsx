import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import MoneyPageTrustBlock from "@/components/landing/MoneyPageTrustBlock";
import { buildDutchMetadata } from "@/lib/page-metadata";
import { cvDownloadPrice } from "@/lib/site-content";
import { templateList } from "@/lib/templates/registry";

const featuredTemplates = templateList.filter((template) =>
  ["professional", "ats", "simple", "modern"].includes(template.id),
);

const templateUseCases: Record<string, string> = {
  professional:
    "Sterke basis voor administratie, finance en zakelijke functies waar rust en betrouwbaarheid tellen.",
  ats: "Handig als je vooral wilt scoren op duidelijke structuur en ATS-leesbaarheid.",
  simple:
    "Praktisch voor starters, snelle sollicitaties en iedereen die zonder visuele ruis wil beginnen.",
  modern:
    "Geschikt voor marketing, sales en tech als je CV net wat frisser mag ogen zonder onrustig te worden.",
};

const freeSteps = [
  {
    title: "1) Start gratis met een template dat bij je doelrol past",
    body: "Open de editor, kies een rustige template en begin daarna met de inhoud. Zo voorkom je dat je tijd verliest aan opmaak voordat je verhaal staat.",
  },
  {
    title: "2) Vul eerst je kerngegevens en functietitel in",
    body: "Naam, contactgegevens, woonplaats en een duidelijke functietitel vormen de basis. Recruiters moeten in seconden zien op welke rol je mikt.",
  },
  {
    title: "3) Schrijf profieltekst en werkervaring vacaturegericht",
    body: "Gebruik woorden uit de vacature en zet je ervaring neer in korte, resultaatgerichte bullets. Daarmee maak je van gratis starten ook echt een serieuze sollicitatieversie.",
  },
  {
    title: "4) Vergelijk templates terwijl je inhoud al staat",
    body: "Omdat je gratis kunt bewerken, zie je meteen welke layout jouw inhoud het best laat uitkomen. Pas daarna maak je de definitieve keuze.",
  },
  {
    title: "5) Download alleen als je tevreden bent",
    body: "WerkCV laat je gratis bouwen en vergelijken. De eenmalige betaling zit alleen op de uiteindelijke PDF-download, niet op het schrijven zelf.",
  },
];

const quickAnswerCards = [
  {
    title: "Start for free in the editor",
    body: "You can build your CV, switch templates, and improve the content before paying anything.",
  },
  {
    title: "Pay only when the PDF is ready",
    body: "The paid step is the final download, not the writing and testing phase.",
  },
  {
    title: "Use it as an online CV builder",
    body: "This route is strongest if you want to make and edit the CV online instead of working in Word.",
  },
];

const freeRouteChoices = [
  {
    href: "/gratis-cv-template",
    title: "Gratis CV template",
    body: "Best if you mainly want to compare layouts before you start writing.",
  },
  {
    href: "/cv-opstellen",
    title: "CV opstellen",
    body: "Best if you need help with the right CV structure and section order before you start editing.",
  },
  {
    href: "/cv-maken",
    title: "CV maken",
    body: "Best if you want the full workflow for structure, writing quality, ATS, and stronger final content.",
  },
];

const freeChecklist = [
  "Gratis starten in de editor",
  "Template vergelijken zonder direct te betalen",
  "Inhoud bewerken en aanscherpen per vacature",
  "Meerdere versies bewaren voordat je downloadt",
  "Rustige, ATS-vriendelijke layouts kiezen",
  "Pas afrekenen wanneer je je PDF echt wilt downloaden",
];

const pricingCards = [
  {
    title: "Gratis",
    body: "CV aanmaken, inhoud invullen, templates vergelijken en je versie verbeteren tot hij sollicitatieklaar is.",
  },
  {
    title: `Eenmalig ${cvDownloadPrice.display}`,
    body: "Definitieve PDF-download zonder terugkerend abonnement, proefperiode of verborgen verlenging.",
  },
  {
    title: "Geen abonnementsval",
    body: "Je hoeft niet eerst een duur plan te starten om te testen of de editor en templates voor jou werken.",
  },
];

const mistakes = [
  {
    title: "Fout: gratis CV maken verwarren met direct gratis PDF downloaden",
    fix: "Fix: positioneer duidelijk dat je gratis kunt bouwen en vergelijken, en dat de eenmalige betaling pas op de download zit.",
  },
  {
    title: "Fout: blind kiezen voor een 'gratis' tool met later abonnement",
    fix: "Fix: stuur bezoekers bewust naar de prijsuitleg zodat het verschil met abonnementsmodellen meteen helder is.",
  },
  {
    title: "Fout: gratis starten maar je tekst niet aanpassen per vacature",
    fix: "Fix: gebruik het gratis deel juist om meerdere inhoudsvarianten te bouwen voordat je de definitieve PDF downloadt.",
  },
];

const faqs = [
  {
    question: "Kan ik online gratis een CV maken en later pas downloaden?",
    answer:
      "Ja. WerkCV is juist bedoeld voor online gratis cv maken: je start in de editor, bewerkt je inhoud, vergelijkt templates en beslist pas op het einde of je de PDF wilt downloaden.",
  },
  {
    question: "Wat is het verschil tussen gratis cv maken en cv aanmaken?",
    answer:
      "Gratis cv maken draait vooral om gratis starten, templates vergelijken, versies bewaren en pas later betalen bij download. Cv aanmaken draait juist om vanaf nul snel een eerste basisversie opzetten zonder blanco-pagina stress.",
  },
  {
    question: "Kan ik echt gratis een CV maken op WerkCV?",
    answer:
      "Ja. Je kunt gratis starten, je CV opbouwen, bewerken en templates vergelijken. De betaling volgt alleen wanneer je je definitieve PDF wilt downloaden.",
  },
  {
    question: "Is gratis cv maken hetzelfde als gratis cv template gebruiken?",
    answer:
      "Bij WerkCV wel ongeveer: je gebruikt de templates gratis in de editor en beslist pas later of je wilt downloaden. Daardoor kun je eerst de inhoud en layout testen.",
  },
  {
    question: "Waarom betaal ik pas bij download?",
    answer:
      "Dat model verlaagt de drempel om te starten en voorkomt dat je vooraf betaalt zonder te weten of de template en editor voor jouw sollicitatie werken.",
  },
  {
    question: "Kan ik mijn gratis CV later opnieuw aanpassen?",
    answer:
      "Ja. Je kunt teruggaan naar je CV, teksten aanpassen en pas afrekenen zodra de versie klaar is voor verzending.",
  },
  {
    question: "Welke template werkt het beste als ik gratis begin?",
    answer:
      "Voor de meeste functies zijn de Professioneel-, ATS- en Simpel-templates de veiligste start. Ze houden de inhoud rustig en recruiter-proof.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "Gratis CV maken en pas betalen bij download | WerkCV",
  description:
    "Gratis CV maken in een serieuze builder? Start gratis, vergelijk templates, bewaar versies en betaal pas bij PDF-download. Geen abonnement en geen proefperiode.",
  path: "/gratis-cv-maken",
  keywords: [
    "gratis cv maken",
    "cv maken gratis",
    "maak een cv gratis",
    "cv gratis maken",
    "online cv maken gratis",
    "cv maken gratis online",
    "curriculum vitae maken gratis",
  ],
  languages: {
    "nl-NL": "https://werkcv.nl/gratis-cv-maken",
    "x-default": "https://werkcv.nl/gratis-cv-maken",
  },
});

export default function GratisCvMakenPage() {
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
        name: "Gratis CV Maken",
        item: "https://werkcv.nl/gratis-cv-maken",
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
                <span>Hoge intentie: gratis cv maken</span>
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">
                <span className="wk-hero-highlight">Gratis CV maken</span> en pas betalen als je PDF
                echt klaar is
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--wk-ink-muted)]">
                Wie zoekt op gratis cv maken wil vooral laagdrempelig starten, meerdere templates
                vergelijken, versies bewaren en pas beslissen over betaling wanneer de inhoud echt
                klaar is. WerkCV laat je precies dat doen: gratis bouwen, verbeteren en
                vergelijken, daarna eenmalig afrekenen als je PDF klaar is.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--wk-ink-muted)]">
                Deze pagina focust bewust op gratis starten, prijslogica en het moment van betalen.
                Zoek je vooral een eerste basisversie vanaf nul? Gebruik dan{" "}
                <Link
                  href="/cv-maken"
                  className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
                >
                  CV maken
                </Link>
                . Voor de brede workflow rond inhoud, structuur en ATS gebruik je de{" "}
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
                  Maak gratis je cv, betaal pas bij downloaden
                </Link>
                <Link href="/prijzen" className="wk-button wk-button-secondary">
                  Bekijk prijsmodel
                </Link>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  "Gratis starten en bewerken",
                  `${templateList.length} templates vergelijken`,
                  "Eenmalig betalen bij PDF-download",
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
                Wat krijg je als je gratis start?
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                {freeChecklist.map((item) => (
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
                  href="/templates"
                  className="text-sm font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
                >
                  Vergelijk eerst alle CV templates
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
              <span>Kort antwoord</span>
            </div>
            <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
              Kun je echt gratis online een CV maken?
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--wk-ink-muted)] md:text-base">
              Ja. Op WerkCV kun je online gratis je CV maken, bewerken en templates vergelijken. De
              betaalde stap zit pas op de uiteindelijke PDF-download. Daarmee past deze route beter
              bij mensen die eerst willen testen en schrijven dan bij mensen die per se direct een
              gratis PDF verwachten.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {quickAnswerCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4"
                >
                  <h3 className="text-base font-semibold text-[var(--wk-ink)]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{card.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {freeRouteChoices.map((choice) => (
                <Link
                  key={choice.href}
                  href={choice.href}
                  className="wk-card block p-4 transition-colors hover:border-[var(--wk-primary)]"
                >
                  <p className="text-sm font-semibold text-[var(--wk-ink)]">{choice.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--wk-ink-muted)]">{choice.body}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="wk-card p-6 md:p-8">
            <div className="wk-eyebrow mb-3">
              <span>Gratis vs betaald</span>
            </div>
            <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
              Wat is gratis en wanneer betaal je?
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-accent-soft)] p-5">
                <h3 className="text-xl font-semibold text-[var(--wk-ink)]">Gratis</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                  <li>Je cv aanmaken en invullen.</li>
                  <li>Templates en kleuren vergelijken.</li>
                  <li>Teksten verbeteren en later terugkomen.</li>
                  <li>Voorbeeld bekijken voordat je beslist.</li>
                </ul>
              </div>
              <div className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-highlight-soft)] p-5">
                <h3 className="text-xl font-semibold text-[var(--wk-ink)]">Betaald</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                  <li>Alleen de definitieve PDF-download.</li>
                  <li>Eenmalig {cvDownloadPrice.display} per cv-document.</li>
                  <li>Geen abonnement, proefperiode of automatische verlenging.</li>
                  <li>Hetzelfde betaalde cv later opnieuw bewerken en downloaden.</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/editor" className="wk-button wk-button-primary">
                Start gratis met mijn cv
              </Link>
              <Link href="/prijzen" className="wk-button wk-button-secondary">
                Bekijk prijsmodel
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MoneyPageTrustBlock
        title="Waarom gratis starten bij WerkCV logisch is"
        intro="Je ziet eerst of je cv-inhoud, template en PDF-route goed voelen. Pas als je tevreden bent met de definitieve versie betaal je voor de download."
      />

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="wk-eyebrow mb-3">
            <span>Workflow</span>
          </div>
          <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
            Gratis CV maken in 5 praktische stappen
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {freeSteps.map((step) => (
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
          <div className="grid gap-5 md:grid-cols-3">
            {pricingCards.map((card, index) => (
              <div
                key={card.title}
                className={index === 0 ? "wk-card wk-card-accent p-6" : "wk-card p-6"}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wk-ink-muted)]">
                  {card.title}
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--wk-ink-muted)]">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="wk-card p-5">
            <p className="text-sm leading-7 text-[var(--wk-ink-muted)]">
              Gratis starten is stap 1. Wil je daarna expliciet weten hoe{" "}
              <Link
                href="/cv-maken-zonder-abonnement"
                className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
              >
                cv maken zonder abonnement
              </Link>{" "}
              werkt en waarom WerkCV met eenmalig betalen rekent, dan is dat de beste vervolgpagina.
            </p>
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="wk-eyebrow mb-3">
                <span>Template startpunten</span>
              </div>
              <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
                Gratis starten met een template die recruiter-proof blijft
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
              <div key={template.id} className="wk-card flex h-full flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wk-ink-muted)]">
                  {template.nameDutch}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-[var(--wk-ink)]">{template.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                  {template.description}
                </p>
                <p className="mt-4 text-sm leading-6 text-[var(--wk-ink-muted)]">
                  {templateUseCases[template.id]}
                </p>
                <div className="mt-auto pt-5">
                  <Link href="/editor" className="wk-button wk-button-primary wk-button-small w-full">
                    Maak gratis je cv
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="wk-card wk-card-warning p-6">
              <div className="wk-eyebrow mb-3">
                <span>Veelgemaakte fouten</span>
              </div>
              <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">
                Waar gratis CV-pagina&apos;s vaak misgaan
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
                <span>Slimme vervolgstappen</span>
              </div>
              <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">
                Verdiep de gratis-intentie zonder duplicate pagina&apos;s
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    href: "/cv-maken",
                    title: "CV maken",
                    body: "Gebruik het hoofd-stappenplan als je behalve prijs ook inhoud en schrijfkwaliteit wilt verbeteren.",
                  },
                  {
                    href: "/cv-opstellen",
                    title: "CV opstellen",
                    body: "Sterke vervolgroute voor mensen die eerst structuur, volgorde en inhoud per sectie willen aanscherpen.",
                  },
                  {
                    href: "/templates",
                    title: "CV templates",
                    body: "Sterke vervolgroute voor mensen die nu vooral willen vergelijken welke layout het beste past voordat ze later downloaden.",
                  },
                  {
                    href: "/cv-gids/beste-cv-builder-zonder-abonnement",
                    title: "Zonder abonnement vergelijken",
                    body: "Vergelijk WerkCV met andere routes als je expliciet zoekt naar een no-subscription model.",
                  },
                  {
                    href: "/prijzen",
                    title: "Prijzen",
                    body: "Leg helder uit dat gratis starten losstaat van de eenmalige betaling op de uiteindelijke PDF-download.",
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
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <h2 className="text-center text-3xl font-semibold text-[var(--wk-ink)]">
            Veelgestelde vragen over gratis CV maken
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
          <div className="rounded-[var(--wk-radius-lg)] bg-[var(--wk-primary)] p-8 text-center md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wk-primary-contrast)]/80">
              Klaar om gratis te starten?
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[var(--wk-primary-contrast)]">
              Bouw eerst je CV af en beslis pas daarna over de download
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-[var(--wk-primary-contrast)]/80 sm:text-base">
              Gebruik de editor, vergelijk layouts en hou de drempel laag tot je definitieve versie
              echt sollicitatieklaar is.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/editor" className="wk-button wk-button-accent">
                Maak gratis je cv
              </Link>
              <Link href="/templates" className="wk-button wk-button-secondary">
                Bekijk templates
              </Link>
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
