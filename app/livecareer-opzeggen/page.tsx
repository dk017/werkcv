import type { Metadata } from "next";
import Link from "next/link";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import Footer from "@/components/Footer";
import OpzeggenConversionSection from "@/components/opzeggen/OpzeggenConversionSection";

const sourceLinks = [
  {
    label: "LiveCareer Nederland contact",
    href: "https://www.livecareer.nl/contact",
  },
  {
    label: "LiveCareer Nederland gebruiksvoorwaarden",
    href: "https://www.livecareer.nl/gebruiksvoorwaarden",
  },
  {
    label: "LiveCareer Nederland homepage",
    href: "https://www.livecareer.nl/",
  },
];

const steps = [
  "Log in op LiveCareer en ga via Mijn account en Mijn instellingen naar de online opzegpagina als je de self-serve route wilt gebruiken.",
  "Werkt dat niet, neem dan contact op met de klantenservice zoals de officiele voorwaarden aangeven.",
  "Controleer of je een bevestigingsmail met opzeggingsnummer ontvangt en bewaar die goed.",
  "Ontvang je geen bevestiging, neem dan opnieuw direct contact op via klantenservice@livecareer.com of het contactformulier.",
];

const faqs = [
  {
    question: "Hoe zeg je LiveCareer op?",
    answer:
      "Volgens de officiele Nederlandse gebruiksvoorwaarden kun je je abonnement op elk moment opzeggen via de online opzegpagina onder Mijn account en Mijn instellingen, of door contact op te nemen met de klantenservice.",
  },
  {
    question: "Wat gebeurt er na opzeggen bij LiveCareer?",
    answer:
      "De officiele Nederlandse gebruiksvoorwaarden zeggen dat het abonnement na opzeggen actief blijft tot het einde van de lopende factureringsperiode. LiveCareer zegt ook dat je een bevestigingsmail met opzeggingsnummer hoort te ontvangen.",
  },
  {
    question: "Kan ik LiveCareer per direct stopzetten?",
    answer:
      "De voorwaarden zeggen dat je het abonnement kosteloos kunt opzeggen met ingang van het einde van de lopende factureringsperiode. Dus wel op elk moment annuleren, maar niet per se met directe stop van toegang.",
  },
  {
    question: "Waarom zoeken mensen op livecareer opzeggen?",
    answer:
      "De intentie is meestal dubbel: een lopend abonnement willen stoppen en tegelijk willen weten of een eenvoudiger Nederlands alternatief zonder maandelijkse structuur beter past.",
  },
];

export const metadata: Metadata = {
  title: "LiveCareer Opzeggen - Officiele Stappen + Alternatief | WerkCV",
  description:
    "Zoek je hoe je LiveCareer opzegt? Bekijk wat de officiele Nederlandse voorwaarden en contactpagina zeggen over opzeggen, opzeggingsnummer en het einde van de factureringsperiode.",
  keywords: [
    "livecareer opzeggen",
    "livecareer abonnement opzeggen",
    "livecareer annuleren",
    "livecareer klantenservice",
    "livecareer alternatief",
  ],
  alternates: {
    canonical: "https://werkcv.nl/livecareer-opzeggen",
    languages: {
      "nl-NL": "https://werkcv.nl/livecareer-opzeggen",
      "x-default": "https://werkcv.nl/livecareer-opzeggen",
    },
  },
};

export default function LivecareerOpzeggenPage() {
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
        name: "LiveCareer opzeggen",
        item: "https://werkcv.nl/livecareer-opzeggen",
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
            trackingLocation="livecareer-opzeggen:header_primary"
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
              Intent: livecareer opzeggen
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              LiveCareer opzeggen: wat de officiele NL-voorwaarden zeggen
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Deze pagina vat samen wat LiveCareer Nederland zelf publiceert over
              opzeggen, bevestigingsmails en het einde van de factureringsperiode.
              Dat is precies de informatie waar cancel-intentiezoekers meestal op vastlopen.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/cv-maken-zonder-abonnement"
                trackingLocation="livecareer-opzeggen:hero_primary"
                trackingLabel="Bekijk alternatief zonder abonnement"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Bekijk alternatief zonder abonnement
              </TrackedLandingLink>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-600">
              Wil je pas daarna inhoudelijk vergelijken? De volgende stap staat lager op deze pagina.
            </p>
            <p className="mt-5 text-sm font-medium text-slate-600">
              Officiele bronnen gecheckt op 25 april 2026.
            </p>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Kernpunten uit de officiele bronnen</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <li>De Nederlandse voorwaarden zeggen dat opzeggen via Mijn account en Mijn instellingen kan.</li>
              <li>LiveCareer noemt klantenservice als alternatieve route als je vastloopt.</li>
              <li>De voorwaarden zeggen dat je een bevestiging met opzeggingsnummer hoort te ontvangen.</li>
              <li>Na opzeggen blijft het abonnement volgens de voorwaarden actief tot het einde van de lopende factureringsperiode.</li>
            </ul>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Op basis van de officiele NL-voorwaarden
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Stappen om LiveCareer op te zeggen
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
            Wat opvalt in de Nederlandse voorwaarden
          </p>
          <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-200">
            <p>
              LiveCareer maakt in de Nederlandse gebruiksvoorwaarden twee dingen heel
              duidelijk: je mag op elk moment opzeggen, maar het effect is in principe
              aan het einde van de lopende factureringsperiode.
            </p>
            <p>
              Daarnaast legt LiveCareer de nadruk op de bevestiging. Volgens de voorwaarden
              hoort de aanbieder een e-mail met opzeggingsnummer te sturen. Ontvang je die
              niet, dan moet je opnieuw contact opnemen met de klantenservice.
            </p>
            <p>
              Voor Nederlandse bezoekers is ook de lokale contactpagina nuttig, omdat die
              de route via klantenservice@livecareer.com en het contactformulier expliciet
              noemt. Daarmee heb je naast de accountroute ook een duidelijke fallback.
            </p>
          </div>
        </section>

        <OpzeggenConversionSection
          pageKey="livecareer-opzeggen"
          compareHref="/cv-gids/werkcv-vs-livecareer"
          compareTitle="LiveCareer alternatief"
          compareBody="Gebruik deze vergelijking als je na cancel-intentie ook inhoudelijk wilt bepalen of WerkCV of LiveCareer beter past bij jouw volgende CV."
        />

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Bronnen
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Officiele LiveCareer pagina&apos;s
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
            Veelgestelde vragen over LiveCareer opzeggen
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
                Klaar met doorlopende billing?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Kijk of een directe Nederlandse cv-builder beter past bij jouw volgende sollicitatie
              </h2>
            </div>
            <TrackedLandingLink
              href="/cv-maken-zonder-abonnement"
              trackingLocation="livecareer-opzeggen:footer_primary"
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
