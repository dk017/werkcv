import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import MobileStickyCta from "@/components/landing/MobileStickyCta";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { cvDownloadPrice } from "@/lib/site-content";

const pageUrl = "https://werkcv.nl/cv-downloaden-zonder-abonnement";
const supportLine =
  "Geen proefperiode. Geen automatische verlenging. Geen abonnement om later op te zeggen.";

const heroBadges = [
  "Download-intentie",
  `Eenmalig ${cvDownloadPrice.display}`,
  "Geen abonnement",
  "PDF direct downloaden",
  "Later opnieuw openen",
];

const downloadSteps = [
  {
    title: "1. Maak je cv gratis af",
    body: "Vul je gegevens in, kies een template en controleer eerst rustig je inhoud. Er is nog geen betaalstap nodig.",
  },
  {
    title: "2. Betaal pas bij de PDF-download",
    body: `Pas wanneer je cv klaar is en je de PDF wilt hebben, betaal je éénmalig ${cvDownloadPrice.display}.`,
  },
  {
    title: "3. Download zonder maandkosten",
    body: "Na de betaling start er geen maandabonnement. Je downloadt je cv en kunt later terugkomen om hetzelfde cv opnieuw te openen of bij te werken.",
  },
];

const downloadChecks = [
  {
    question: "Is het gratis om te starten?",
    answer: "Ja, bouwen en bewerken is gratis.",
  },
  {
    question: "Wanneer betaal ik?",
    answer: "Alleen bij de definitieve PDF-download.",
  },
  {
    question: "Moet ik iets opzeggen?",
    answer: "Nee, er loopt geen abonnement.",
  },
  {
    question: "Krijg ik automatische verlenging?",
    answer: "Nee.",
  },
  {
    question: "Kan ik later terugkomen?",
    answer: "Ja, je kunt hetzelfde cv later opnieuw openen en bijwerken.",
  },
  {
    question: "Wat kost downloaden?",
    answer: `Eénmalig ${cvDownloadPrice.display}`,
  },
];

const reasonCards = [
  {
    title: "Je betaalt voor de download, niet voor een maand",
    body: "Deze pagina is specifiek voor mensen die vooral willen weten wat er gebeurt op het moment van downloaden. Bij WerkCV zit de prijs op de PDF-download, niet op een doorlopend plan.",
  },
  {
    title: "Rustig eerst maken, daarna pas beslissen",
    body: "Je hoeft niet eerst een proefperiode te starten om te zien of de editor goed werkt. Maak je cv eerst af, beoordeel het resultaat en betaal pas als je de PDF echt wilt versturen.",
  },
  {
    title: "Beter passend bij een sollicitatieronde",
    body: "De meeste mensen gebruiken een cv-maker tijdelijk. Daarom is een eenmalige downloadprijs vaak logischer dan een abonnement dat doorloopt nadat je cv al klaar is.",
  },
];

const relatedLinks = [
  {
    href: "/cv-maken-zonder-abonnement",
    title: "CV maken zonder abonnement",
    body: "De sterkste vervolgstap als je het hele prijsmodel en de vergelijking met abonnementsmodellen wilt zien.",
  },
  {
    href: "/cv-maken-eenmalig-betalen",
    title: "CV maken en eenmalig betalen",
    body: "Bekijk deze pagina als je meer zoekt op de combinatie van bouwen, betalen en later opnieuw downloaden.",
  },
  {
    href: "/cv-maken-zonder-verborgen-kosten",
    title: "CV maken zonder verborgen kosten",
    body: "Handig als je vooral wilt controleren wat je wel en niet betaalt en wanneer de betaalstap precies komt.",
  },
  {
    href: "/prijzen",
    title: "Bekijk het prijsmodel",
    body: `Hier zie je in één oogopslag wat je krijgt voor ${cvDownloadPrice.display} en waarom er geen abonnement achter zit.`,
  },
  {
    href: "/templates",
    title: "Bekijk templates",
    body: "Vergelijk eerst de beschikbare ATS-vriendelijke layouts voordat je je definitieve PDF downloadt.",
  },
  {
    href: "/gratis-cv-maken",
    title: "Start gratis met je cv",
    body: "Goede route als je eerst zonder drempel wilt bouwen en pas later wilt beslissen over de download.",
  },
];

const faqItems = [
  {
    question: "Kan ik bij WerkCV een cv downloaden zonder abonnement?",
    answer:
      `Ja. Je betaalt alleen éénmalig ${cvDownloadPrice.display} wanneer je jouw cv als PDF downloadt. Er start geen proefperiode, geen maandabonnement en geen automatische verlenging.`,
  },
  {
    question: "Moet ik eerst betalen voordat ik mijn cv zie?",
    answer:
      "Nee. Je kunt eerst je cv maken, de template kiezen en je voorbeeld controleren. Pas bij de PDF-download betaal je.",
  },
  {
    question: "Kan ik later terugkomen naar hetzelfde cv?",
    answer:
      "Ja. Je kunt hetzelfde cv later opnieuw openen, aanpassen en opnieuw downloaden zonder dat daar een maandabonnement voor nodig is.",
  },
  {
    question: "Is cv downloaden zonder abonnement hetzelfde als gratis downloaden?",
    answer:
      `Nee. Het bouwen en bewerken is gratis. De definitieve PDF-download kost éénmalig ${cvDownloadPrice.display}.`,
  },
  {
    question: "Wat is het verschil met een proefperiode?",
    answer:
      "Bij WerkCV hoef je geen proefperiode te starten die later automatisch overgaat in maandkosten. Je betaalt alleen op het moment dat je de PDF echt wilt hebben.",
  },
];

export const metadata: Metadata = {
  title: {
    absolute: "CV downloaden zonder abonnement | PDF direct downloaden | WerkCV",
  },
  description:
    "Download je cv zonder abonnement. Maak gratis je cv, betaal pas éénmalig €4,99 bij PDF-download en voorkom proefperiodes, automatische verlenging en maandkosten.",
  keywords: [
    "cv downloaden zonder abonnement",
    "cv pdf downloaden zonder abonnement",
    "cv direct downloaden zonder abonnement",
    "cv downloaden geen abonnement",
    "cv maker downloaden zonder abonnement",
    "cv maken zonder abonnement",
  ],
  alternates: {
    canonical: pageUrl,
    languages: {
      "nl-NL": pageUrl,
      "x-default": pageUrl,
    },
  },
  openGraph: {
    title: "CV downloaden zonder abonnement | WerkCV",
    description:
      "Maak gratis je cv en betaal pas éénmalig €4,99 als je de PDF wilt downloaden. Geen proefperiode, geen automatische verlenging en geen maandkosten.",
    url: pageUrl,
    siteName: "WerkCV",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WerkCV - cv downloaden zonder abonnement",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CV downloaden zonder abonnement | WerkCV",
    description:
      "Maak gratis je cv en betaal pas éénmalig €4,99 als je de PDF wilt downloaden. Geen proefperiode, geen automatische verlenging en geen maandkosten.",
    images: ["/opengraph-image"],
  },
};

export default function CvDownloadenZonderAbonnementPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF0]">
      <FAQJsonLd questions={faqItems} />

      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-yellow-400 px-1">CV</span>.nl
            </span>
          </Link>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/prijzen"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Bekijk prijsmodel
            </Link>
            <TrackedLandingLink
              href="/editor"
              trackingLocation="cv-downloaden-zonder-abonnement:header_primary"
              trackingLabel="Maak gratis je cv"
              className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
            >
              Maak gratis je cv
            </TrackedLandingLink>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 pb-28 md:pb-10">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "CV downloaden zonder abonnement", href: "/cv-downloaden-zonder-abonnement" },
            ]}
          />
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {heroBadges.map((badge) => (
                <span
                  key={badge}
                  className="border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-black"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV downloaden zonder abonnement
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Maak gratis je cv, download je PDF pas als je klaar bent en betaal dan éénmalig{" "}
              {cvDownloadPrice.display}. Geen proefperiode, geen automatische verlenging en geen maandkosten die later doorlopen.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/editor"
                trackingLocation="cv-downloaden-zonder-abonnement:hero_primary"
                trackingLabel="Maak gratis je cv, download later zonder abonnement"
                ctaEventName="cta_download_no_subscription_hero"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Maak gratis je cv, download later zonder abonnement
              </TrackedLandingLink>
              <Link
                href="/templates"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk templates
              </Link>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-700">
              Handig als je vooral wilt weten wat er gebeurt rond de download: je betaalt alleen voor de PDF die je echt wilt gebruiken.
            </p>
          </div>

          <aside className="h-fit border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Download zonder verrassing
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Wat gebeurt er precies bij WerkCV?
            </h2>
            <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <p>Je maakt eerst gratis je cv af en bekijkt je resultaat in de editor.</p>
              <p>De enige betaalstap komt bij de definitieve PDF-download.</p>
              <p>Na betaling start er geen abonnement dat later automatisch doorloopt.</p>
            </div>
            <p className="mt-5 border-t-4 border-black pt-4 text-sm font-black leading-relaxed text-black">
              {supportLine}
            </p>
          </aside>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-600">
            Downloadroute
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Zo download je je cv zonder abonnement
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {downloadSteps.map((step) => (
              <article
                key={step.title}
                className="border-3 border-black bg-[#FFF9D9] p-4"
                style={{ borderWidth: "3px" }}
              >
                <h3 className="text-base font-black text-black">{step.title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{step.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <TrackedLandingLink
              href="/editor"
              trackingLocation="cv-downloaden-zonder-abonnement:steps_primary"
              trackingLabel="Start gratis en download later"
              ctaEventName="cta_download_no_subscription_steps"
              className="inline-block border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Start gratis en download later
            </TrackedLandingLink>
            <Link
              href="/prijzen"
              className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Bekijk prijsmodel
            </Link>
          </div>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Snelle controle
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Wat je wel en niet krijgt bij de download
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {downloadChecks.map((item) => (
              <article
                key={item.question}
                className="border-3 border-black bg-[#FFF9D9] p-4"
                style={{ borderWidth: "3px" }}
              >
                <p className="text-sm font-black text-black">{item.question}</p>
                <p className="mt-2 text-base font-black text-slate-900">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12 grid gap-5 md:grid-cols-3">
          {reasonCards.map((card) => (
            <article
              key={card.title}
              className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="text-xl font-black text-black">{card.title}</h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{card.body}</p>
            </article>
          ))}
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Hoofdpagina in deze cluster
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Lees ook: cv maken zonder abonnement
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Wil je niet alleen de download begrijpen, maar het hele model vergelijken met abonnementen en proefperiodes? Ga dan door naar de pagina die al het sterkst presteert in deze no-subscription cluster.
            </p>
            <Link
              href="/cv-maken-zonder-abonnement"
              className="mt-5 inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Bekijk cv maken zonder abonnement
            </Link>
          </article>

          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Prijshelderheid
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Liever focussen op prijs en verborgen kosten?
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Gebruik deze route als je vooral wilt controleren wat je betaalt, wanneer je betaalt en waarom er geen maandbedrag doorloopt nadat je cv al is gedownload.
            </p>
            <Link
              href="/cv-maken-zonder-verborgen-kosten"
              className="mt-5 inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Bekijk verborgen-kosten uitleg
            </Link>
          </article>
        </section>

        <section className="mb-12 border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
            Interne vervolgroutes
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {relatedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block border-2 border-white bg-white/10 p-4 transition-colors hover:bg-white hover:text-black"
              >
                <p className="text-sm font-black">{item.title}</p>
                <p className="mt-1 text-sm font-medium leading-relaxed text-slate-200 hover:text-slate-700">
                  {item.body}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over cv downloaden zonder abonnement
          </h2>
          <div className="mx-auto mt-8 max-w-4xl space-y-4">
            {faqItems.map((faq) => (
              <details
                key={faq.question}
                className="group border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <summary className="flex cursor-pointer items-center justify-between p-4 text-left text-base font-black text-black">
                  {faq.question}
                  <span className="ml-3 text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="border-t-2 border-black px-4 pb-4 pt-3 text-sm font-medium leading-relaxed text-slate-700">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="border-4 border-black bg-yellow-400 px-6 py-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-black text-black">
                Klaar om je cv zonder abonnement te downloaden?
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Bouw eerst gratis je cv, download de PDF pas als je tevreden bent en voorkom proefperiodes of maandkosten achteraf.
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                {supportLine}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/editor"
                trackingLocation="cv-downloaden-zonder-abonnement:bottom_primary"
                trackingLabel="Maak gratis je cv"
                ctaEventName="cta_download_no_subscription_bottom"
                className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Maak gratis je cv
              </TrackedLandingLink>
              <Link
                href="/cv-maken-eenmalig-betalen"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Bekijk eenmalig betalen
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <MobileStickyCta
        text="CV downloaden zonder abonnement"
        buttonLabel="Start gratis"
        href="/editor"
        trackingLocation="cv-downloaden-zonder-abonnement:sticky_primary"
        trackingLabel="Start gratis"
        ctaEventName="cta_download_no_subscription_sticky"
      />
    </div>
  );
}
