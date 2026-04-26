import type { Metadata } from "next";
import Link from "next/link";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import Footer from "@/components/Footer";
import MobileStickyCta from "@/components/landing/MobileStickyCta";
import { cvDownloadPrice } from "@/lib/site-content";

const sourceLinks = [
  {
    label: "CVster contact",
    href: "https://cvster.nl/contact",
  },
  {
    label: "CVster help: hoe zeg ik mijn account op?",
    href: "https://help.cvster.nl/nl/articles/3831424",
  },
  {
    label: "CVster help: hoe werkt facturering?",
    href: "https://help.cvster.nl/nl/articles/3832256",
  },
];

const steps = [
  "Open CVster en ga rechtsboven naar Account.",
  "Ga naar Accountinstellingen en kies daar Annuleer abonnement.",
  "Kun je niet inloggen? Gebruik dan de contactpagina van CVster om je account op te zoeken en alsnog te annuleren.",
  "Controleer de bevestiging per e-mail en let op tot wanneer premium nog actief blijft.",
];

const differenceBullets = [
  "Geen proefabonnement nodig om te starten",
  "Geen maandelijkse verlenging",
  "Geen opzegmoment om te onthouden",
  "Gratis bouwen, pas betalen bij PDF-download",
  `Eénmalig ${cvDownloadPrice.display} per cv-download`,
];

const faqs = [
  {
    question: "Hoe zeg je CVster op?",
    answer:
      "Volgens de officiele help-pagina kun je in de app via Accountinstellingen je abonnement annuleren. CVster zegt ook dat je dit via de contactpagina kunt regelen als je niet kunt inloggen.",
  },
  {
    question: "Wat gebeurt er na opzeggen bij CVster?",
    answer:
      "CVster zegt dat je premium na annuleren nog actief blijft tot 30 dagen na je laatste maandbetaling of tot 7 dagen na je laatste proefperiodebetaling. Daarna schakelt het account terug naar gratis.",
  },
  {
    question: "Heeft CVster een gratis account na opzeggen?",
    answer:
      "Ja. Volgens de help-pagina kun je na annuleren nog steeds inloggen, je cv bekijken en verder gebruiken binnen de gratis accountmogelijkheden.",
  },
  {
    question: "Heeft CVster een proefperiode?",
    answer:
      "Ja. De officiele facturatie-uitleg zegt dat een proefperiode na 7 dagen automatisch wordt omgezet in een premiumabonnement als je niet op tijd annuleert. CVster zegt er ook bij dat prijzen kunnen verschillen per regio of ouder prijsmodel.",
  },
  {
    question: "Is WerkCV een alternatief voor CVster?",
    answer:
      `Ja, vooral als je geen proefabonnement of automatische verlenging wilt. Je maakt je cv gratis en betaalt alleen éénmalig ${cvDownloadPrice.display} bij PDF-download.`,
  },
];

export const metadata: Metadata = {
  title: "CVster opzeggen? Stappen + alternatief zonder proefabonnement",
  description:
    "Bekijk hoe je CVster kunt opzeggen en maak daarna een cv zonder proefabonnement of automatische verlenging. WerkCV kost éénmalig €4,99 bij download.",
  keywords: [
    "cvster opzeggen",
    "cvster abonnement opzeggen",
    "cvster annuleren",
    "cvster stoppen",
    "cvster premium opzeggen",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cvster-opzeggen",
    languages: {
      "nl-NL": "https://werkcv.nl/cvster-opzeggen",
      "x-default": "https://werkcv.nl/cvster-opzeggen",
    },
  },
};

export default function CvsterOpzeggenPage() {
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
        name: "CVster opzeggen",
        item: "https://werkcv.nl/cvster-opzeggen",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FFFEF0]">
      <header className="relative z-10 border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-yellow-400 px-1">CV</span>.nl
            </span>
          </Link>
          <TrackedLandingLink
            href="/editor"
            trackingLocation="cvster-opzeggen:header_primary"
            trackingLabel="Maak cv zonder proefabonnement"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Maak cv zonder proefabonnement
          </TrackedLandingLink>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14 pb-28 md:pb-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Intent: CVster opzeggen
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CVster opzeggen: stappen en alternatief zonder proefabonnement
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Wil je je CVster abonnement opzeggen? Hieronder vind je de stappen om je abonnement te controleren en stop te zetten. Zoek je daarna een cv-maker zonder proefperiode of maandelijkse verlenging? Met WerkCV maak je gratis je cv en betaal je alleen éénmalig {cvDownloadPrice.display} bij PDF-download.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/editor"
                trackingLocation="cvster-opzeggen:hero_primary"
                trackingLabel="Maak cv zonder proefabonnement"
                ctaEventName="cta_cvster_cancel_hero"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Maak cv zonder proefabonnement
              </TrackedLandingLink>
              <Link
                href="/cv-maken-zonder-abonnement"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk hoe WerkCV werkt
              </Link>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-600">
              Eénmalig betalen. Geen maandabonnement. Geen automatische verlenging.
            </p>
            <p className="mt-5 text-sm font-medium text-slate-600">
              Officiele bronnen gecheckt op 1 april 2026.
            </p>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Kernpunten uit de officiele bronnen</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <li>CVster zegt dat opzeggen via Accountinstellingen kan.</li>
              <li>Kun je niet inloggen, dan noemt CVster de contactpagina als alternatieve route.</li>
              <li>Na annuleren blijft premium nog actief tot het einde van de lopende betaalperiode of proefperiode.</li>
              <li>Daarna schakelt het account terug naar gratis en kun je nog steeds inloggen.</li>
            </ul>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Op basis van het CVster helpcentrum
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Stappen om CVster op te zeggen
          </h2>
          <div className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <div key={step} className="flex gap-4">
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center border-3 border-black bg-[#FFFEF0] text-sm font-black text-black"
                  style={{ borderWidth: "3px" }}
                >
                  {index + 1}
                </div>
                <p className="pt-1 text-sm font-medium leading-relaxed text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-yellow-400 px-6 py-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
            Na het opzeggen
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Geen zin meer in proefperiodes of maandelijkse verlenging?
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-black sm:text-base">
            WerkCV is gemaakt voor sollicitanten die gewoon één goede cv-PDF nodig hebben. Je start gratis, vult je gegevens in, bekijkt je cv en betaalt alleen als je de PDF wilt downloaden.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <TrackedLandingLink
              href="/editor"
              trackingLocation="cvster-opzeggen:after_steps_primary"
              trackingLabel="Maak mijn cv zonder abonnement"
              ctaEventName="cta_cvster_cancel_after_steps"
              className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Maak mijn cv zonder abonnement
            </TrackedLandingLink>
          </div>
          <p className="mt-3 text-sm font-medium text-black">
            Geen trial. Geen automatische verlenging. Geen opzegging achteraf.
          </p>
        </section>

        <section className="mb-10 border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
            Wat opvalt in het helpcentrum
          </p>
          <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-200">
            <p>
              CVster maakt annuleren relatief praktisch: volgens het helpcentrum kun je het zowel
              in je account als via de contactpagina regelen als je niet kunt inloggen.
            </p>
            <p>
              Ook belangrijk is wat er na annuleren gebeurt. CVster zegt expliciet dat premium niet
              direct verdwijnt, maar nog doorloopt tot het einde van je laatste maand- of proefbetaling.
            </p>
            <p>
              De officiele facturatie-uitleg zegt daarnaast dat een proefperiode na 7 dagen automatisch
              overgaat in premium als je niet op tijd annuleert. CVster zegt er wel bij dat prijzen per
              regio of ouder prijsmodel kunnen verschillen, dus controleer altijd je eigen checkoutdetails.
            </p>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Waarom WerkCV anders werkt
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Geen nieuw proefabonnement nodig
          </h2>
          <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
            {differenceBullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="shrink-0 font-black text-black">-</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <TrackedLandingLink
            href="/editor"
            trackingLocation="cvster-opzeggen:mid_primary"
            trackingLabel="Start gratis met WerkCV"
            className="mt-6 inline-block border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Start gratis met WerkCV
          </TrackedLandingLink>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Bronnen
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Officiele CVster pagina&apos;s
          </h2>
          <div className="mt-6 space-y-3">
            {sourceLinks.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="block border-2 border-black bg-white p-4 text-sm font-medium text-slate-700 transition-colors hover:bg-yellow-100"
              >
                <span className="font-black text-black">{source.label}</span>
                <span className="mt-1 block break-all">{source.href}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over CVster opzeggen
          </h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
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
                Zonder nieuw abonnement
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Nieuwe cv nodig, maar geen nieuw abonnement?
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Gebruik WerkCV als simpel alternatief: gratis bouwen, éénmalig betalen bij download en daarna klaar.
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black">
                Geen trial. Geen automatische verlenging. Geen opzegging achteraf.
              </p>
            </div>
            <TrackedLandingLink
              href="/editor"
              trackingLocation="cvster-opzeggen:bottom_primary"
              trackingLabel="Start gratis met WerkCV"
              ctaEventName="cta_cvster_cancel_bottom"
              className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Start gratis met WerkCV
            </TrackedLandingLink>
          </div>
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Footer />

      <MobileStickyCta
        text="Geen nieuw proefabonnement"
        buttonLabel="Start gratis"
        href="/editor"
        trackingLocation="cvster-opzeggen:sticky_primary"
        trackingLabel="Start gratis"
        ctaEventName="cta_cvster_cancel_sticky"
      />
    </div>
  );
}
