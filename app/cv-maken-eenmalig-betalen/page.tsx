import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import MobileStickyCta from "@/components/landing/MobileStickyCta";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { cvDownloadPrice } from "@/lib/site-content";

const pageUrl = "https://werkcv.nl/cv-maken-eenmalig-betalen";

const priceSteps = [
  {
    title: "Maak gratis je cv",
    body: "Vul je gegevens in, kies een template en bekijk je voorbeeld zonder te betalen.",
  },
  {
    title: "Betaal pas bij PDF-download",
    body: `Je betaalt éénmalig ${cvDownloadPrice.display} wanneer je cv klaar is om te downloaden.`,
  },
  {
    title: "Blijf toegang houden",
    body: "Open hetzelfde cv later opnieuw, pas het aan en download opnieuw zonder abonnement.",
  },
];

const valueCards = [
  {
    title: "Je betaalt voor het resultaat",
    body: "Een CV-builder gebruik je meestal tijdelijk. Daarom betaal je bij WerkCV voor de definitieve cv-PDF, niet voor een maand waarin je de tool misschien niet meer gebruikt.",
  },
  {
    title: "Geen maandbedrag om te onthouden",
    body: "Er is geen proefperiode, geen automatische verlenging en geen opzegmoment dat later alsnog aandacht vraagt.",
  },
  {
    title: "Hetzelfde cv later opnieuw gebruiken",
    body: "Werk je cv later bij voor een nieuwe vacature, dan open je gewoon hetzelfde document opnieuw en download je opnieuw zonder extra abonnement.",
  },
];

const faqs = [
  {
    question: "Kan ik eerst gratis beginnen?",
    answer:
      "Ja. Je bouwt je cv gratis op, kiest een template en bekijkt je voorbeeld voordat je iets betaalt.",
  },
  {
    question: `Wanneer betaal ik ${cvDownloadPrice.display}?`,
    answer:
      "Je betaalt pas wanneer je jouw cv als PDF wilt downloaden. Daar zit de hele betaalstap.",
  },
  {
    question: "Is dit een abonnement of een proefperiode?",
    answer:
      "Nee. WerkCV werkt zonder maandabonnement, zonder proefperiode en zonder automatische verlenging.",
  },
  {
    question: "Kan ik hetzelfde cv later opnieuw openen?",
    answer:
      "Ja. Je kunt hetzelfde cv later opnieuw openen, aanpassen en opnieuw downloaden zonder extra abonnement.",
  },
];

export const metadata: Metadata = {
  title: {
    absolute: "CV maken en eenmalig betalen | Geen maandkosten | WerkCV",
  },
  description:
    "Bouw gratis je cv en betaal pas €4,99 bij PDF-download. Geen maandabonnement, geen proefperiode en geen automatische verlenging.",
  keywords: [
    "cv maken eenmalig betalen",
    "cv eenmalig betalen",
    "cv maken zonder maandkosten",
    "cv builder eenmalig betalen",
    "cv maken geen abonnement",
  ],
  alternates: {
    canonical: pageUrl,
    languages: {
      "nl-NL": pageUrl,
      "x-default": pageUrl,
    },
  },
  openGraph: {
    title: "CV maken en eenmalig betalen | Geen maandkosten | WerkCV",
    description:
      "Bouw gratis je cv en betaal pas €4,99 bij PDF-download. Geen maandabonnement, geen proefperiode en geen automatische verlenging.",
    url: pageUrl,
    siteName: "WerkCV",
    locale: "nl_NL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WerkCV - cv maken en eenmalig betalen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CV maken en eenmalig betalen | Geen maandkosten | WerkCV",
    description:
      "Bouw gratis je cv en betaal pas €4,99 bij PDF-download. Geen maandabonnement, geen proefperiode en geen automatische verlenging.",
    images: ["/opengraph-image"],
  },
};

export default function CvMakenEenmaligBetalenPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF0]">
      <FAQJsonLd questions={faqs} />

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
              trackingLocation="cv-maken-eenmalig-betalen:header_primary"
              trackingLabel={`Maak je cv voor eenmalig ${cvDownloadPrice.display}`}
              className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
            >
              Maak je cv
            </TrackedLandingLink>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 pb-28 md:pb-10">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "CV maken en eenmalig betalen", href: "/cv-maken-eenmalig-betalen" },
            ]}
          />
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {[
                `Eénmalig ${cvDownloadPrice.display}`,
                "Geen maandkosten",
                "Geen proefperiode",
                "Geen automatische verlenging",
              ].map((badge) => (
                <span
                  key={badge}
                  className="border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-black"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV maken en eenmalig betalen
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Bouw je cv gratis en betaal pas {cvDownloadPrice.display} wanneer je jouw professionele PDF wilt downloaden. Daarna kun je hetzelfde cv opnieuw openen, aanpassen en downloaden zonder extra kosten.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/editor"
                trackingLocation="cv-maken-eenmalig-betalen:hero_primary"
                trackingLabel={`Maak je cv voor eenmalig ${cvDownloadPrice.display}`}
                ctaEventName="cta_one_time_payment_hero"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Maak je cv voor eenmalig €4,99
              </TrackedLandingLink>
              <Link
                href="/templates"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Eerst gratis proberen
              </Link>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-700">
              Geen maandbedrag. Geen proefperiode. Geen automatische verlenging.
            </p>
          </div>

          <aside className="h-fit border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Direct duidelijk
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Eén prijs, pas aan het einde
            </h2>
            <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <p>Je begint gratis in de editor en gebruikt de templates zonder vooraf te betalen.</p>
              <p>De betaalstap zit pas op de definitieve PDF-download van je cv.</p>
              <p>Daarna houd je toegang tot hetzelfde cv zonder maandkosten of opzegmoment.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Prijsduidelijkheid
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Hoe werkt eenmalig betalen?
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {priceSteps.map((step) => (
              <article
                key={step.title}
                className="border-3 border-black bg-[#FFF9D9] p-5"
                style={{ borderWidth: "3px" }}
              >
                <h3 className="text-lg font-black text-black">{step.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{step.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <TrackedLandingLink
              href="/editor"
              trackingLocation="cv-maken-eenmalig-betalen:steps_primary"
              trackingLabel="Start gratis, betaal pas bij download"
              className="inline-block border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Start gratis, betaal pas bij download
            </TrackedLandingLink>
            <p className="text-sm font-medium text-slate-700">
              Geen maandbedrag. Geen proefperiode. Geen automatische verlenging.
            </p>
          </div>
        </section>

        <section className="mb-12 grid gap-5 md:grid-cols-3">
          {valueCards.map((card) => (
            <article
              key={card.title}
              className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="text-xl font-black text-black">{card.title}</h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{card.body}</p>
            </article>
          ))}
        </section>

        <section className="mb-12 border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
            Waarom dit model beter past
          </p>
          <h2 className="mt-2 text-3xl font-black text-white">
            Betaal voor je cv, niet voor een maandabonnement
          </h2>
          <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-200">
            Een CV-builder gebruik je meestal tijdelijk. Daarom betaal je bij WerkCV alleen voor de definitieve PDF-download.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <TrackedLandingLink
              href="/editor"
              trackingLocation="cv-maken-eenmalig-betalen:mid_primary"
              trackingLabel={`Maak mijn cv voor eenmalig ${cvDownloadPrice.display}`}
              ctaEventName="cta_one_time_payment_mid"
              className="inline-block border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black"
            >
              Maak mijn cv voor eenmalig €4,99
            </TrackedLandingLink>
            <p className="text-sm font-medium text-slate-200">
              Geen automatische verlenging. Geen opzegging nodig.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over eenmalig betalen
          </h2>
          <div className="mx-auto mt-8 max-w-4xl space-y-4">
            {faqs.map((faq) => (
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
              <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
                Eén duidelijke prijs
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Wil je één duidelijke prijs voor je cv?
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Start gratis en betaal pas wanneer je tevreden bent met je PDF.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/editor"
                trackingLocation="cv-maken-eenmalig-betalen:bottom_primary"
                trackingLabel={`Maak je cv voor eenmalig ${cvDownloadPrice.display}`}
                ctaEventName="cta_one_time_payment_bottom"
                className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Maak je cv voor eenmalig €4,99
              </TrackedLandingLink>
              <Link
                href="/prijzen"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Bekijk prijsmodel
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <MobileStickyCta
        text="Eenmalig €4,99 bij download"
        buttonLabel="Maak cv"
        href="/editor"
        trackingLocation="cv-maken-eenmalig-betalen:sticky_primary"
        trackingLabel="Maak cv"
        ctaEventName="cta_one_time_payment_sticky"
      />
    </div>
  );
}
