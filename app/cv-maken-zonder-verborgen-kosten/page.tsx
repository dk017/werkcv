import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import MobileStickyCta from "@/components/landing/MobileStickyCta";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { cvDownloadPrice } from "@/lib/site-content";

const pageUrl = "https://werkcv.nl/cv-maken-zonder-verborgen-kosten";

const clarityChecks = [
  ["Gratis starten", "Ja, je kunt je cv eerst maken, aanpassen en bekijken."],
  ["Betaalmoment", "Alleen wanneer je de definitieve PDF wilt downloaden."],
  ["Prijs", `Eénmalig ${cvDownloadPrice.display} per cv-download.`],
  ["Abonnement", "Nee, er is geen maandbedrag of automatische verlenging."],
  ["Opzeggen nodig", "Nee, omdat er geen abonnement loopt."],
  ["Verborgen kosten", "Nee, de downloadprijs wordt vooraf duidelijk genoemd."],
];

const faqItems = [
  {
    question: "Kan ik bij WerkCV een cv maken zonder verborgen kosten?",
    answer:
      `Ja. Je start gratis en betaalt alleen ${cvDownloadPrice.display} wanneer je jouw definitieve cv als PDF downloadt. Er is geen abonnement, proefperiode of automatische verlenging.`,
  },
  {
    question: "Wanneer betaal ik precies?",
    answer:
      "Je betaalt pas bij de PDF-download. Je kunt dus eerst je gegevens invullen, templates vergelijken en je cv controleren.",
  },
  {
    question: "Moet ik later iets opzeggen?",
    answer:
      "Nee. WerkCV werkt zonder abonnement. Er is daardoor geen maandbedrag en geen opzegmoment.",
  },
  {
    question: "Is gratis starten hetzelfde als gratis downloaden?",
    answer:
      `Nee. Het bouwen, bewerken en bekijken is gratis. De definitieve PDF-download kost éénmalig ${cvDownloadPrice.display}.`,
  },
];

export const metadata: Metadata = {
  title: {
    absolute: "CV maken zonder verborgen kosten | Geen abonnement | WerkCV",
  },
  description:
    "Maak gratis je cv en betaal pas éénmalig €4,99 bij PDF-download. Geen verborgen kosten, geen proefperiode, geen automatische verlenging en niets om op te zeggen.",
  keywords: [
    "cv maken zonder verborgen kosten",
    "cv maken geen verborgen kosten",
    "cv maken zonder abonnement",
    "cv maken eenmalig betalen",
    "cv downloaden zonder abonnement",
  ],
  alternates: {
    canonical: pageUrl,
    languages: {
      "nl-NL": pageUrl,
      "x-default": pageUrl,
    },
  },
  openGraph: {
    title: "CV maken zonder verborgen kosten | WerkCV",
    description:
      "Gratis bouwen, pas betalen bij PDF-download. Geen abonnement, proefperiode of automatische verlenging.",
    url: pageUrl,
    siteName: "WerkCV",
    locale: "nl_NL",
    type: "article",
  },
};

export default function CvMakenZonderVerborgenKostenPage() {
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
          <TrackedLandingLink
            href="/editor"
            trackingLocation="cv-maken-zonder-verborgen-kosten:header_primary"
            trackingLabel="Maak gratis je cv"
            className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
          >
            Maak gratis je cv
          </TrackedLandingLink>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 pb-28 md:pb-10">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "CV maken zonder verborgen kosten", href: "/cv-maken-zonder-verborgen-kosten" },
            ]}
          />
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {["Geen verborgen kosten", "Geen abonnement", `Eenmalig ${cvDownloadPrice.display}`, "Betalen bij PDF-download"].map((badge) => (
                <span
                  key={badge}
                  className="border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-black"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV maken zonder verborgen kosten
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Bouw gratis je Nederlandse cv, bekijk je voorbeeld en betaal pas éénmalig {cvDownloadPrice.display} wanneer je de PDF wilt downloaden. Geen proefperiode, geen automatische verlenging en geen abonnement om later op te zeggen.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/editor"
                trackingLocation="cv-maken-zonder-verborgen-kosten:hero_primary"
                trackingLabel="Maak gratis je cv, betaal pas bij downloaden"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Maak gratis je cv, betaal pas bij downloaden
              </TrackedLandingLink>
              <Link
                href="/prijzen"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk prijsmodel
              </Link>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-700">
              Je betaalt alleen voor de definitieve PDF-download. Tot dat moment kun je rustig bouwen en aanpassen.
            </p>
          </div>

          <aside className="h-fit border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Prijshelderheid
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Wat betaal je wel en niet?
            </h2>
            <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <p>Wel: éénmalig betalen als je jouw cv als PDF downloadt.</p>
              <p>Niet: maandkosten, proefperiode, automatische verlenging of extra opzegstappen.</p>
              <p>Ook niet: betalen voordat je weet of de editor en template bij je passen.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Geen verrassingen
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Wat betekent zonder verborgen kosten bij WerkCV?
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {clarityChecks.map(([title, body]) => (
              <article
                key={title}
                className="border-3 border-black bg-[#FFF9D9] p-4"
                style={{ borderWidth: "3px" }}
              >
                <h3 className="text-sm font-black text-black">{title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-black">
              CV downloaden zonder abonnement
            </h2>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
              Bij WerkCV zit de betaling niet op een maandplan, maar op het eindresultaat: de PDF-download van je cv. Dat past beter bij sollicitanten die tijdelijk een cv-maker nodig hebben.
            </p>
            <Link href="/cv-maken-zonder-abonnement" className="mt-4 inline-block text-sm font-black text-black underline decoration-2 underline-offset-4">
              Lees meer over cv maken zonder abonnement
            </Link>
          </article>

          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-black">
              CV maken met één duidelijke prijs
            </h2>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
              Je start gratis, maakt je cv af en betaalt pas als je de PDF echt wilt gebruiken. Zo weet je vooraf waar je aan toe bent.
            </p>
            <Link href="/cv-maken-eenmalig-betalen" className="mt-4 inline-block text-sm font-black text-black underline decoration-2 underline-offset-4">
              Bekijk cv maken en eenmalig betalen
            </Link>
          </article>
        </section>

        <section className="mb-12">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over verborgen kosten
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
                Start zonder verborgen kosten
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Bouw je cv gratis, betaal pas bij PDF-download en voorkom maandkosten of opzegstress.
              </p>
            </div>
            <TrackedLandingLink
              href="/editor"
              trackingLocation="cv-maken-zonder-verborgen-kosten:bottom_primary"
              trackingLabel="Maak gratis je cv"
              className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Maak gratis je cv
            </TrackedLandingLink>
          </div>
        </section>
      </main>

      <Footer />

      <MobileStickyCta
        text="Geen verborgen kosten"
        buttonLabel="Start gratis"
        href="/editor"
        trackingLocation="cv-maken-zonder-verborgen-kosten:sticky_primary"
        trackingLabel="Start gratis"
        ctaEventName="cta_no_subscription_sticky"
      />
    </div>
  );
}
