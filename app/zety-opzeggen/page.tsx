import type { Metadata } from "next";
import Link from "next/link";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import Footer from "@/components/Footer";
import OpzeggenConversionSection from "@/components/opzeggen/OpzeggenConversionSection";

const sourceLinks = [
  {
    label: "Zety contact",
    href: "https://zety.com/contact",
  },
  {
    label: "Zety pricing",
    href: "https://zety.com/pricing",
  },
  {
    label: "Zety terms of service",
    href: "https://zety.com/terms-of-service",
  },
];

const steps = [
  "Log in op Zety en open in je accountdashboard de sectie 'My Plan' als je de self-serve route wilt gebruiken.",
  "Kun je daar niet verder, gebruik dan de officiele contactpagina en annuleer via chat of via de klantenservice.",
  "Controleer daarna of je een bevestiging met cancellation number of andere bevestigingsmail ontvangt en bewaar die.",
  "Check ook welk plan actief was: trial of jaarplan, zodat je weet welke verlengmomenten en betaalcyclus op jouw account van toepassing zijn.",
];

const faqs = [
  {
    question: "Hoe zeg je Zety op?",
    answer:
      "Volgens de officiele contactpagina kun je Zety het makkelijkst opzeggen via de supportchat of klantenservice. Diezelfde pagina noemt ook de self-serve route via de accountdashboardsectie 'My Plan'. De terms of service verwijzen daarnaast naar de online cancel page onder je instellingen.",
  },
  {
    question: "Heeft Zety een abonnement?",
    answer:
      "De officiele Zety.com-pricingpagina laat een 14-daagse pro trial zien die daarna automatisch verlengt per vier weken, plus een jaarpakket dat jaarlijks automatisch verlengt. Zety zegt erbij dat je altijd kunt annuleren; prijzen en voorwaarden kunnen per markt verschillen.",
  },
  {
    question: "Wat gebeurt er na opzeggen bij Zety?",
    answer:
      "De terms of service zeggen dat Zety een bevestiging met cancellation number stuurt voor een cancellation request. De exacte toegang na opzeggen hangt samen met het plan en de billing terms van de offer page waarop je hebt gekocht.",
  },
  {
    question: "Waarom zoeken mensen op zety opzeggen?",
    answer:
      "Die intentie is meestal commercieel: mensen willen niet alleen stoppen, maar ook begrijpen of een rustiger alternatief zonder trial- of verlengfrictie beter past bij Nederlandse sollicitaties.",
  },
];

export const metadata: Metadata = {
  title: "Zety Opzeggen - Officiele Stappen + Alternatief | WerkCV",
  description:
    "Zoek je hoe je Zety opzegt? Bekijk de officiele cancel-routes via support en My Plan, wat de pricingpagina zegt over verlenging en vergelijk daarna een alternatief voor Nederlandse sollicitaties.",
  keywords: [
    "zety opzeggen",
    "zety abonnement opzeggen",
    "zety cancel subscription",
    "zety trial opzeggen",
    "zety alternatief nederland",
  ],
  alternates: {
    canonical: "https://werkcv.nl/zety-opzeggen",
    languages: {
      "nl-NL": "https://werkcv.nl/zety-opzeggen",
      "x-default": "https://werkcv.nl/zety-opzeggen",
    },
  },
};

export default function ZetyOpzeggenPage() {
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
        name: "Zety opzeggen",
        item: "https://werkcv.nl/zety-opzeggen",
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
            href="/cv-maken-zonder-abonnement"
            trackingLocation="zety-opzeggen:header_primary"
            trackingLabel="Alternatief zonder abonnement"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Alternatief zonder abonnement
          </TrackedLandingLink>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Intent: zety opzeggen
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Zety opzeggen: wat de officiele contact- en terms-pagina zeggen
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Deze pagina vat samen wat Zety zelf publiceert over cancellation,
              billing en verlenging. Dat is vooral nuttig voor mensen die niet alleen
              willen stoppen, maar ook willen weten of een Nederlandse route zonder
              trial- of verlengfrictie beter past.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/cv-maken-zonder-abonnement"
                trackingLocation="zety-opzeggen:hero_primary"
                trackingLabel="Bekijk alternatief zonder abonnement"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Bekijk alternatief zonder abonnement
              </TrackedLandingLink>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-600">
              Wil je pas daarna inhoudelijk vergelijken? De vergelijking met WerkCV staat lager op deze pagina.
            </p>
            <p className="mt-5 text-sm font-medium text-slate-600">
              Officiele bronnen gecheckt op 19 april 2026.
            </p>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Kernpunten uit de officiele bronnen</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <li>De officiele contactpagina noemt support bellen of chatten als makkelijkste cancel-route.</li>
              <li>Dezelfde pagina noemt ook een self-serve route via de dashboardsectie &quot;My Plan&quot;.</li>
              <li>De terms zeggen dat Zety een e-mail met cancellation number stuurt om de request te bevestigen.</li>
              <li>De pricingpagina toont een trial- en jaarplanstructuur met automatische verlenging; prijzen kunnen per markt verschillen.</li>
            </ul>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Op basis van de officiele Zety-pagina&apos;s
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Stappen om Zety op te zeggen
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

        <section className="mb-10 border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
            Wat opvalt op de officiele pricing- en cancelpagina&apos;s
          </p>
          <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-200">
            <p>
              Zety maakt cancellation vrij duidelijk, maar koppelt die direct aan een
              bredere pricingstructuur. Op de officiele Zety.com-pricingpagina staat
              een 14-daagse trial voor USD 1,95 die daarna automatisch verlengt tegen
              USD 25,95 per vier weken, plus een jaarpakket van USD 71,40 dat jaarlijks
              automatisch verlengt. Zety zegt er ook bij dat je altijd kunt annuleren.
            </p>
            <p>
              Voor Nederlandse zoekers is de belangrijkste nuance dat marktprijzen kunnen
              verschillen. Daarom is het slim om niet alleen naar de headlineprijs te kijken,
              maar ook naar de officiele offer page en de bevestiging na aankoop.
            </p>
            <p>
              De cancel-flow zelf is volgens Zety dubbel afgedekt: via chat of support,
              of via &quot;My Plan&quot; in je account. De terms voegen daaraan toe dat je een
              cancellation number per e-mail hoort te krijgen.
            </p>
          </div>
        </section>

        <OpzeggenConversionSection
          pageKey="zety-opzeggen"
          compareHref="/cv-gids/werkcv-vs-zety"
          compareTitle="WerkCV vs Zety"
          compareBody="Vergelijk een rustige Nederlandse no-subscription route met Zety's bredere internationale suite en verlengmodel."
        />

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Bronnen
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Officiele Zety pagina&apos;s
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
            Veelgestelde vragen over Zety opzeggen
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
                Klaar met trialfrictie?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Kijk of een directe Nederlandse cv-route beter past bij jouw sollicitatieproces
              </h2>
            </div>
            <TrackedLandingLink
              href="/cv-maken-zonder-abonnement"
              trackingLocation="zety-opzeggen:footer_primary"
              trackingLabel="Bekijk alternatief"
              className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Bekijk alternatief
            </TrackedLandingLink>
          </div>
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Footer />
    </div>
  );
}
