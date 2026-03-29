import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import AgencyCtaLink from "@/components/agency/AgencyCtaLink";
import { FAQJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";

const painPoints = [
  {
    title: "Minder handmatig knip- en plakwerk",
    body:
      "Kleine bureaus verliezen snel uren aan opmaak, Word-fouten en het telkens opnieuw netjes zetten van kandidaatprofielen.",
  },
  {
    title: "Consistent klantbeeld",
    body:
      "Opdrachtgevers willen geen rommelige bron-CV's. Ze willen een rustige, representatieve versie in de stijl van jouw bureau.",
  },
  {
    title: "Sneller naar voorstelbaar document",
    body:
      "De pilot is bedoeld voor teams die snel een eerste branded kandidaat-CV willen testen zonder meteen een groot softwaretraject in te gaan.",
  },
  {
    title: "Heldere afspraken over data",
    body:
      "Bij de pilot spreken we vooraf af hoe lang documenten blijven staan, welke gegevens nodig zijn en wanneer extra privacyafspraken nodig zijn.",
  },
];

const pilotIncludes = [
  "Pilot vanaf EUR249 per maand",
  "1 branded template in jouw bureau-uitstraling",
  "Handmatige onboarding en korte implementatie",
  "Factuur in plaats van consumenten-checkout",
  "Priority support tijdens de pilot",
  "Fair-use afspraken in plaats van een loze unlimited-belofte",
];

const fitCards = [
  {
    title: "Goede eerste fit",
    items: [
      "Solo recruiters en boutique bureaus",
      "Outplacement en career-transition partijen",
      "Teams die branded kandidaat-CV's willen testen zonder zware integratie",
    ],
    tone: "bg-white",
  },
  {
    title: "Nog niet de focus",
    items: [
      "Enterprise aanbestedingen met uitgebreide security review",
      "Volledige ATS-integraties en multi-workspace beheer",
      "Teams die nu al harde unlimited-SLA's nodig hebben",
    ],
    tone: "bg-rose-100",
  },
];

const pilotSteps = [
  {
    title: "1. Intake op doelgroep en volume",
    body:
      "We kijken eerst naar jouw type kandidaten, klantpresentatie en ongeveer hoeveel kandidaat-CV's je maandelijks wilt verwerken.",
  },
  {
    title: "2. Eerste branded route opzetten",
    body:
      "Daarna richten we een eerste template-route in die past bij je bureau-uitstraling en de kandidaatpresentatie die je wilt sturen.",
  },
  {
    title: "3. Pilot draaien met echte kandidaatcases",
    body:
      "Je test de workflow in een kleine pilot in plaats van direct breed uit te rollen. Zo zien we waar de tijdswinst en frictie echt zitten.",
  },
  {
    title: "4. Beslissen: opschalen of niet",
    body:
      "Pas na echte usage bepalen we of een bredere agency-workspace logisch is, of dat een lichtere samenwerking beter past.",
  },
];

const comparisonRows = [
  {
    title: "Agency pilot nu",
    body:
      "Snelle validatie met een branded kandidaat-CV route, handmatige onboarding, factuur en support. Geen groot productproject nodig.",
  },
  {
    title: "Volledige agency-workspace later",
    body:
      "Pas na betaalde interesse bouwen we teamfuncties zoals seats, gedeelde templates, usage limits en strengere retentiecontrole.",
  },
];

const faqs = [
  {
    question: "Is dit al een volledig self-serve agency-platform?",
    answer:
      "Nee. Dit is bewust een pilot-aanpak. We starten klein met onboarding, een branded template en heldere afspraken, zodat we eerst echte betaalde vraag valideren.",
  },
  {
    question: "Is de pilot unlimited?",
    answer:
      "Nee. We werken met fair-use afspraken, niet met een onbeperkte belofte die later tot gedoe leidt. Tijdens de intake spreken we volume en gebruik helder af.",
  },
  {
    question: "Voor wie is deze pilot het meest geschikt?",
    answer:
      "Voor solo recruiters, boutique agencies, outplacement en kleine teams die kandidaat-CV's sneller in een nette bureau-uitstraling willen zetten.",
  },
  {
    question: "Kunnen jullie meteen multi-seat workspaces en facturatie op maat aanbieden?",
    answer:
      "Facturatie en pilotafspraken kunnen nu al. Een volwaardige team-workspace met seats, gedeelde templates en uitgebreid beheer bouwen we pas verder uit na gevalideerde vraag.",
  },
  {
    question: "Hoe zit het met AVG en dataretentie?",
    answer:
      "Tijdens de pilot maken we vooraf expliciete afspraken over opslag, retentie en eventuele extra privacy-eisen. Voor zwaardere eisen of enterprise-behoeften is aanvullend productwerk nodig.",
  },
];

export const metadata: Metadata = {
  title: "Agency CV Formatting Pilot | WerkCV.nl voor recruiters",
  description:
    "WerkCV Agency is een pilot voor solo recruiters, boutique bureaus en outplacement. Laat kandidaat-CV's sneller in jouw stijl zetten met onboarding, factuur en fair-use vanaf EUR249 per maand.",
  keywords: [
    "cv formatteren recruitment bureau",
    "cv formatting software recruiters",
    "kandidaat cv in huisstijl",
    "cv tool recruiter",
    "cv converter recruitment",
    "cv opmaak bureau",
    "agency cv formatting",
    "recruitment cv template",
  ],
  alternates: {
    canonical: "https://werkcv.nl/agency",
  },
};

export default function AgencyPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://werkcv.nl/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Agency",
        item: "https://werkcv.nl/agency",
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
          <Link
            href="/partners"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-bold text-black transition-colors hover:bg-yellow-300"
          >
            Partners
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm font-medium text-gray-600">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-black hover:underline">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="font-bold text-black">Agency</li>
          </ol>
        </nav>

        <section className="mb-10 border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="mb-4 inline-block border-2 border-black bg-sky-200 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-black">
            WerkCV Agency Pilot
          </div>
          <h1 className="mb-4 text-4xl font-black text-black md:text-5xl">
            Branded kandidaat-CV&apos;s zonder Word-chaos
          </h1>
          <p className="max-w-3xl text-lg font-medium leading-relaxed text-black">
            WerkCV Agency is een kleine pilot voor solo recruiters, boutique bureaus en
            outplacementpartijen die kandidaat-CV&apos;s sneller voorstelbaar willen maken in een
            rustige bureau-uitstraling. Geen overdreven enterprise-belofte, maar een praktische
            eerste stap met onboarding, factuur en fair-use afspraken.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm font-black text-black">
            <span className="border-2 border-black bg-white px-3 py-1">Vanaf EUR249 p/m</span>
            <span className="border-2 border-black bg-white px-3 py-1">1 branded template</span>
            <span className="border-2 border-black bg-white px-3 py-1">Factuur + support</span>
            <span className="border-2 border-black bg-white px-3 py-1">Pilot met fair use</span>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <AgencyCtaLink
              href="mailto:contact@werkcv.nl?subject=WerkCV%20Agency%20pilot&body=Bedrijfsnaam:%0AType%20organisatie:%0AOngeveer%20aantal%20kandidaat-CV's%20per%20maand:%0AHuidige%20werkwijze:%0A"
              label="Vraag agency pilot aan"
              location="agency_hero"
              className="inline-block border-4 border-black bg-yellow-400 px-6 py-4 text-center text-lg font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            />
            <AgencyCtaLink
              href="/contact"
              label="Plan eerst een kennismaking"
              location="agency_hero"
              className="inline-block border-4 border-black bg-white px-6 py-4 text-center text-lg font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-gray-50 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            />
          </div>
        </section>

        <section className="mb-10 grid gap-6 md:grid-cols-2">
          {painPoints.map((item) => (
            <article
              key={item.title}
              className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="mb-3 text-xl font-black text-black">{item.title}</h2>
              <p className="font-medium leading-relaxed text-gray-700">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="mb-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-3xl font-black text-black">Wat de pilot nu wel bevat</h2>
            <ul className="space-y-3 text-sm font-bold leading-relaxed text-black">
              {pilotIncludes.map((item) => (
                <li key={item}>&bull; {item}</li>
              ))}
            </ul>
            <p className="mt-5 text-sm font-medium leading-relaxed text-gray-700">
              De pilot is bedoeld om echte betaalde vraag te toetsen. Daarom houden we de
              propositie scherp en geloofwaardig in plaats van direct een vol enterprise-platform
              te beloven.
            </p>
          </div>

          <div className="border-4 border-black bg-sky-200 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-black">Waarom nu klein starten</h2>
            <p className="text-sm font-medium leading-relaxed text-black">
              Jouw eerste doel is niet twintig agencies tegelijk. Jouw eerste doel is één betalende
              pilot die laat zien welke workflow, prijs en privacy-afspraken echt belangrijk zijn.
              Dat voorkomt een dure B2B-bouwronde zonder bewijs.
            </p>
          </div>
        </section>

        <section className="mb-10 grid gap-6 md:grid-cols-2">
          {fitCards.map((card) => (
            <article
              key={card.title}
              className={`border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${card.tone}`}
            >
              <h2 className="mb-3 text-xl font-black text-black">{card.title}</h2>
              <ul className="space-y-2 text-sm font-bold leading-relaxed text-black">
                {card.items.map((item) => (
                  <li key={item}>&bull; {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="mb-10">
          <h2 className="mb-6 text-3xl font-black text-black">Hoe de pilot werkt</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {pilotSteps.map((step) => (
              <article
                key={step.title}
                className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="mb-3 text-xl font-black text-black">{step.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-gray-700">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10 grid gap-6 md:grid-cols-2">
          {comparisonRows.map((row) => (
            <article
              key={row.title}
              className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="mb-3 text-xl font-black text-black">{row.title}</h2>
              <p className="font-medium leading-relaxed text-gray-700">{row.body}</p>
            </article>
          ))}
        </section>

        <section className="mb-10">
          <h2 className="mb-6 text-3xl font-black text-black">Veelgestelde vragen</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <summary className="flex cursor-pointer items-center justify-between p-4 font-black text-black">
                  {faq.question}
                  <span className="ml-2 text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="border-t-2 border-black px-4 pb-4 pt-3 font-medium leading-relaxed text-gray-700">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="border-4 border-black bg-yellow-400 p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-3 text-3xl font-black text-black">
            Richt je eerste agency-pilot deze maand scherp in
          </h2>
          <p className="mx-auto mb-6 max-w-2xl font-medium leading-relaxed text-black">
            Stuur kort je bureau-type, ongeveer maandvolume en huidige manier van kandidaat-CV&apos;s
            presenteren. Dan reageren we met de snelste werkbare pilotroute.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <AgencyCtaLink
              href="mailto:contact@werkcv.nl?subject=WerkCV%20Agency%20pilot"
              label="Mail over de pilot"
              location="agency_footer"
              className="inline-block border-4 border-black bg-white px-6 py-4 text-lg font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            />
            <AgencyCtaLink
              href="/contact"
              label="Open contactpagina"
              location="agency_footer"
              className="inline-block border-4 border-black bg-black px-6 py-4 text-lg font-black text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            />
          </div>
        </section>
      </main>

      <FAQJsonLd questions={faqs} />
      <OrganizationJsonLd />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Footer />
    </div>
  );
}
