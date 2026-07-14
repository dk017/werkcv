import type { Metadata } from "next";
import Link from "next/link";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import Footer from "@/components/Footer";
import MobileStickyCta from "@/components/landing/MobileStickyCta";
import { buildDutchMetadata } from "@/lib/page-metadata";
import { cvDownloadPrice } from "@/lib/site-content";

const sourceLinks = [
  {
    label: "CVster direct opzegformulier",
    href: "https://cvster.nl/contact/cancel-subscription",
    note: "Officiele opzegpagina waar je met je registratie-e-mailadres het abonnement kunt opzeggen.",
  },
  {
    label: "CVster contact",
    href: "https://cvster.nl/contact",
    note: "Contactpagina met onderwerp 'Abonnement annuleren' en verwijzing naar het directe opzeggingsformulier.",
  },
  {
    label: "CVster help: account annuleren, downgraden of verwijderen",
    href: "https://help.cvster.nl/nl/articles/3832256",
    note: "Helpcentrumartikel over annuleren zonder app-login, annuleren via Accountinstellingen en accountverwijdering.",
  },
  {
    label: "CVster help: gratis gebruik en proefabonnement",
    href: "https://help.cvster.nl/nl/articles/3831424",
    note: "Helpcentrumartikel over gratis functies, proefabonnement en automatische omzetting naar maandabonnement.",
  },
];

const steps = [
  "Open het officiele CVster-opzegformulier via de contactpagina of rechtstreeks via cvster.nl/contact/cancel-subscription.",
  "Vul het e-mailadres in waarmee je je bij CVster hebt geregistreerd of betaald.",
  "Klik op Abonnement opzeggen en open daarna de bevestigingsmail die CVster stuurt.",
  "Bevestig de annulering via de stappen in die e-mail. Zonder die bevestiging is de opzegging mogelijk nog niet afgerond.",
  "Wordt je e-mailadres niet gevonden of komt de bevestigingsmail niet binnen, probeer een ander gebruikt e-mailadres, controleer spam of annuleer via Accountinstellingen in de app.",
];

const accountSteps = [
  "Log in op CVster.nl.",
  "Klik rechtsboven op Account.",
  "Ga naar Accountinstellingen.",
  "Kies Annuleer abonnement en bevestig de annulering in de volgende stap.",
];

const proofChecklist = [
  "Bewaar de bevestigingsmail van CVster.",
  "Maak een screenshot van het opzegformulier of van de accountinstellingen na annuleren.",
  "Controleer je spammap en zoek op 'CVster.nl' als de bevestigingsmail niet direct verschijnt.",
  "Noteer welk e-mailadres is gebruikt voor registratie, betaling of login.",
  "Controleer na annuleren tot welke datum premium actief blijft.",
];

const differenceBullets = [
  "Geen proefabonnement nodig om te starten",
  "Geen maandelijkse verlenging",
  "Geen opzegmoment om te onthouden",
  "Gratis bouwen, pas betalen bij PDF-download",
  `Eénmalig ${cvDownloadPrice.display} per cv-download`,
];

const whyWerkCvBullets = [
  "Gebouwd voor de Nederlandse arbeidsmarkt",
  "ATS-vriendelijke templates zonder overbodige opmaak",
  "Gratis starten, pas betalen bij PDF-download",
  "Geen abonnement of automatische verlenging",
  `Eén duidelijke prijs: ${cvDownloadPrice.display}`,
];

const faqs = [
  {
    question: "Hoe zeg je CVster op?",
    answer:
      "Volgens de officiële help-pagina kun je een CVster-abonnement opzeggen via het opzegformulier op de contactpagina, zelfs zonder in te loggen op de app. Je zoekt je account op met je e-mailadres, klikt op Abonnement annuleren en bevestigt daarna via de e-mail die CVster stuurt.",
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
    question: "Kan ik CVster opzeggen zonder in te loggen?",
    answer:
      "Ja. CVster zegt in het helpcentrum dat je een abonnement op de website kunt opzeggen zonder in te loggen op de app, via de contactpagina en de optie Abonnement opzeggen.",
  },
  {
    question: "Heeft CVster een proefperiode?",
    answer:
      "Ja. De officiële facturatie-uitleg zegt dat een proefperiode na 7 dagen automatisch wordt omgezet in een premiumabonnement als je niet op tijd annuleert. CVster zegt er ook bij dat prijzen kunnen verschillen per regio of ouder prijsmodel.",
  },
  {
    question: "Is WerkCV een alternatief voor CVster?",
    answer:
      `Ja, vooral als je geen proefabonnement of automatische verlenging wilt. Je maakt je cv gratis en betaalt alleen éénmalig ${cvDownloadPrice.display} bij PDF-download.`,
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "CVster Opzeggen 2026 - Formulier + Alternatief | WerkCV",
  description:
    "CVster opzeggen? Gebruik het officiele formulier, bevestig via e-mail en controleer wanneer premium stopt. Bekijk daarna een alternatief zonder abonnement.",
  path: "/cvster-opzeggen",
  keywords: [
    "cvster opzeggen",
    "cvster abonnement opzeggen",
    "cvster annuleren",
    "cvster stoppen",
    "cvster premium opzeggen",
  ],
  languages: {
    "nl-NL": "https://werkcv.nl/cvster-opzeggen",
    "x-default": "https://werkcv.nl/cvster-opzeggen",
  },
});

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
              CVster opzeggen: direct formulier, e-mailbevestiging en alternatief
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Wil je je CVster abonnement opzeggen? Volgens het CVster-helpcentrum kan
              dat via een opzegformulier op de website, zelfs zonder in te loggen op de
              app. Je zoekt je account op met je e-mailadres en bevestigt de annulering
              daarna via de e-mail die CVster stuurt.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://cvster.nl/contact/cancel-subscription"
                target="_blank"
                rel="noreferrer"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Open CVster opzegformulier
              </a>
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
              Daarna opnieuw een cv nodig? WerkCV werkt met éénmalig betalen bij PDF-download.
            </p>
            <p className="mt-4 border-2 border-black bg-white px-4 py-3 text-sm font-medium leading-relaxed text-slate-700">
              Let op: WerkCV is niet verbonden aan CVster. We vatten hier openbare informatie samen en tonen daarna een alternatief zonder proefabonnement.
            </p>
            <p className="mt-5 text-sm font-medium text-slate-600">
              Officiële bronnen gecheckt op 14 juli 2026. Het CVster-helpcentrum vermeldt
              bij het opzegartikel: bewerkt op 6 maart 2025.
            </p>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Kernpunten uit de officiële bronnen</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <li>CVster zegt dat opzeggen via de contactpagina kan zonder in te loggen op de app.</li>
              <li>Je moet je account zoeken met het e-mailadres waarmee je bent geregistreerd.</li>
              <li>Na het formulier stuurt CVster een e-mail waarmee je de annulering moet bevestigen.</li>
              <li>Via Accountinstellingen annuleren blijft een fallback als het formulier niet lukt.</li>
              <li>Na annuleren blijft premium nog actief tot het einde van de lopende betaalperiode of proefperiode.</li>
              <li>Daarna schakelt het account terug naar gratis en kun je nog steeds inloggen.</li>
            </ul>
          </div>
        </section>

        <section id="stappen" className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
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

        <section className="mb-14 grid gap-6 md:grid-cols-[0.95fr_1.05fr]">
          <div className="border-4 border-black bg-yellow-400 p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
              Als het formulier niet werkt
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Opzeggen via Accountinstellingen
            </h2>
            <ol className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-black">
              {accountSteps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="font-black">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Bewijs bewaren
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Checklist na je opzegging
            </h2>
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm font-medium leading-relaxed text-slate-700 marker:text-black">
              {proofChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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
            WerkCV is gemaakt voor sollicitanten die gewoon één goede cv-PDF nodig hebben. Je start gratis, vult je gegevens in, bekijkt je cv en betaalt alleen {cvDownloadPrice.display} als je de PDF wilt downloaden.
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
            Geen proefperiode. Geen automatische verlenging. Geen opzegging achteraf.
          </p>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            CVster alternatief
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            CVster alternatief zonder proefabonnement
          </h2>
          <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
            Zoek je een CVster alternatief omdat je geen proefperiode of automatische verlenging wilt? WerkCV werkt met gratis bouwen en een eenmalige betaling bij PDF-download.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <TrackedLandingLink
              href="/editor"
              trackingLocation="cvster-opzeggen:alternative_primary"
              trackingLabel="Maak cv zonder proefabonnement"
              className="inline-block border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Maak cv zonder proefabonnement
            </TrackedLandingLink>
            <Link
              href="/alternatief-voor-cvster"
              className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Bekijk CVster alternatief
            </Link>
          </div>
        </section>

        <section className="mb-10 border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
            Wat opvalt in het helpcentrum
          </p>
          <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-200">
            <p>
              CVster maakt annuleren relatief praktisch: volgens het helpcentrum kun je het
              via de website regelen zonder eerst in te loggen op de app. De belangrijkste
              stap is niet alleen het formulier invullen, maar ook de annulering bevestigen
              via de e-mail die daarna wordt verstuurd.
            </p>
            <p>
              Ook belangrijk is wat er na annuleren gebeurt. CVster zegt expliciet dat premium niet
              direct verdwijnt, maar nog doorloopt tot het einde van je laatste maand- of proefbetaling.
            </p>
            <p>
              De officiële uitleg over gratis gebruik zegt daarnaast dat een proefperiode na 7 dagen automatisch
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
          <ul className="mt-5 list-disc space-y-3 pl-5 text-sm font-medium leading-relaxed text-slate-700 marker:text-black">
            {differenceBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
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
            Officiële CVster pagina&apos;s
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
                <span className="mt-2 block leading-relaxed">{source.note}</span>
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

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Waarom WerkCV?
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm font-medium leading-relaxed text-slate-700 marker:text-black">
            {whyWerkCvBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <p className="mt-5 text-sm font-medium leading-relaxed text-slate-700">
            Lees ook meer over{" "}
            <Link href="/cv-maken-zonder-abonnement" className="font-black text-black underline">
              cv maken zonder abonnement
            </Link>
            ,{" "}
            <Link href="/cv-maken-eenmalig-betalen" className="font-black text-black underline">
              een cv maken met eenmalige betaling
            </Link>
            , ons{" "}
            <Link href="/prijzen" className="font-black text-black underline">
              prijsmodel
            </Link>
            , de vergelijking voor de{" "}
            <Link href="/beste-cv-maker-nederland" className="font-black text-black underline">
              beste cv-maker van Nederland
            </Link>
            {" "}en de gids over de{" "}
            <Link href="/goedkoopste-cv-maker-nederland" className="font-black text-black underline">
              goedkoopste cv-maker
            </Link>
            .
          </p>
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
                Geen proefperiode. Geen automatische verlenging. Geen opzegging achteraf.
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
