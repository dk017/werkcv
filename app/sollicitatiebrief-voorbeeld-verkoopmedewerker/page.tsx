import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const examples = [
  {
    title: "Voorbeeld opening (verkoopmedewerker)",
    text: "Met veel enthousiasme solliciteer ik naar de functie van verkoopmedewerker bij [Bedrijfsnaam]. In mijn huidige rol combineer ik klantadvies met targetgericht werken op de winkelvloer, waarbij ik actief bijdraag aan omzet, klanttevredenheid en een verzorgde presentatie van het assortiment.",
  },
  {
    title: "Voorbeeld kernalinea (omzet en KPI)",
    text: "In de afgelopen twaalf maanden presteerde ik gemiddeld 13% boven mijn maandtarget door sterke behoefteanalyse en passende productcombinaties. Daarnaast steeg de gemiddelde bonwaarde binnen mijn dienstblokken doordat ik cross-sell structureel toepaste zonder de klantervaring te verslechteren.",
  },
  {
    title: "Voorbeeld kernalinea (service en operatie)",
    text: "Naast commerciële resultaten bewaak ik ook operationele kwaliteit, zoals correcte kassa-afhandeling, tijdige aanvulling en overzicht op hardlopende producten. Door strakkere signalering van voorraadtekorten konden we misgrijpen beperken en piekdrukte op de vloer beter opvangen.",
  },
  {
    title: "Voorbeeld motivatie-alinea (teamfit en werkstijl)",
    text: "Wat mij aanspreekt in uw vacature is de combinatie van klantgerichtheid, tempo en teamwerk. Ik werk graag in een omgeving waar je op de vloer direct impact hebt: klanten goed helpen, verkoopkansen benutten en samen zorgen voor een sterke winkelprestatie.",
  },
  {
    title: "Voorbeeld afsluiting (gesprekgericht)",
    text: "Graag licht ik in een gesprek toe hoe ik met commerciële focus en winkelervaring kan bijdragen aan uw teamresultaten. Dank voor uw tijd en overweging. Ik zie uw reactie met belangstelling tegemoet.",
  },
];

const recruiterSignals = [
  "Je brief toont commerciële impact met concrete retailresultaten.",
  "Je laat zien dat je klantadvies koppelt aan omzet en bonwaarde.",
  "Je benoemt ook operationele betrouwbaarheid op de winkelvloer.",
  "Je schrijft klantgericht en professioneel, zonder algemene claims.",
];

const checklist = [
  "Noem de functietitel exact en verwijs naar de winkel- of sectorcontext.",
  "Onderbouw je bijdrage met 1-2 KPI&apos;s zoals target, conversie of bonwaarde.",
  "Laat zien hoe je klantadvies en service in de praktijk uitvoert.",
  "Benoem operationele taken die belangrijk zijn in retail (kassa, voorraad, presentatie).",
  "Sluit af met een heldere uitnodiging voor een gesprek.",
];

const atsTerms = [
  "verkoopmedewerker",
  "winkelmedewerker",
  "retail",
  "omzetdoelstellingen",
  "cross-sell",
  "upsell",
  "conversie",
  "bonwaarde",
  "klantadvies",
  "kassawerkzaamheden",
  "voorraadbeheer",
  "winkelpresentatie",
];

const mistakes = [
  "Alleen klantvriendelijkheid benoemen zonder commerciële resultaten.",
  "Geen cijfers noemen over target, bonwaarde of verkoopimpact.",
  "Operationele taken vergeten waardoor je profiel onvolledig oogt.",
  "Te algemene motivatie zonder link naar winkelcontext of teamtempo.",
  "Te lange zinnen waardoor je kernbijdrage niet snel zichtbaar is.",
];

const faqs = [
  {
    question: "Wat moet in een sollicitatiebrief voor verkoopmedewerker staan?",
    answer:
      "Benoem je klantcontactervaring, commerciële resultaten en operationele betrouwbaarheid op de winkelvloer. Laat zien hoe je service combineert met omzetbijdrage.",
  },
  {
    question: "Welke cijfers kan ik in een verkoopbrief noemen?",
    answer:
      "Gebruik cijfers zoals targetrealisatie, bonwaarde, conversie, retourreductie of klantwaardering. Zelfs kleine verbeteringen zijn sterk als je ze kort en concreet toelicht.",
  },
  {
    question: "Hoe schrijf ik een verkoopbrief zonder veel ervaring?",
    answer:
      "Gebruik stage- of bijbaanvoorbeelden met klantadvies, kassa en samenwerking tijdens piekuren. Laat zien dat je commercieel gedrag begrijpt en verantwoordelijkheid neemt op de vloer.",
  },
  {
    question: "Is een motivatiebrief voor retail anders dan een sollicitatiebrief?",
    answer:
      "In de praktijk lopen de termen vaak door elkaar. Belangrijk is dat je motivatie altijd onderbouwd wordt met concrete verkoop- en klantresultaten.",
  },
  {
    question: "Kan ik dit voorbeeld letterlijk overnemen?",
    answer:
      "Gebruik de structuur als basis en personaliseer met jouw winkelcontext, KPI&apos;s en voorbeelden. Dat maakt je brief geloofwaardig en onderscheidend.",
  },
];

const sourceLinks = [
  {
    label: "CV template verkoopmedewerker (WerkCV)",
    href: "/cv-template-verkoopmedewerker",
  },
  {
    label: "CV voorbeeld winkelmedewerker (WerkCV)",
    href: "/cv-voorbeelden/horeca-en-detailhandel/winkelmedewerker",
  },
  {
    label: "Indeed - Sales Associate Cover Letter Examples",
    href: "https://www.indeed.com/career-advice/cover-letter-samples/sales-associate",
  },
];

export const metadata: Metadata = {
  title: "Sollicitatiebrief Voorbeeld Verkoopmedewerker | WerkCV",
  description:
    "Gebruik een sterk sollicitatiebrief voorbeeld voor verkoopmedewerker. Inclusief KPI-gedreven voorbeeldzinnen, retail checklist, ATS-termen en FAQ. Start direct in de generator.",
  keywords: [
    "sollicitatiebrief voorbeeld verkoopmedewerker",
    "motivatiebrief verkoopmedewerker voorbeeld",
    "sollicitatiebrief winkelmedewerker",
    "sollicitatiebrief retail",
    "korte sollicitatiebrief verkoopmedewerker",
    "sollicitatiebrief verkoopster voorbeeld",
  ],
  alternates: {
    canonical: "https://werkcv.nl/sollicitatiebrief-voorbeeld-verkoopmedewerker",
    languages: {
      "nl-NL": "https://werkcv.nl/sollicitatiebrief-voorbeeld-verkoopmedewerker",
      "x-default": "https://werkcv.nl/sollicitatiebrief-voorbeeld-verkoopmedewerker",
    },
  },
};

export default function SollicitatiebriefVoorbeeldVerkoopmedewerkerPage() {
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
        name: "Sollicitatiebrief Voorbeeld Verkoopmedewerker",
        item: "https://werkcv.nl/sollicitatiebrief-voorbeeld-verkoopmedewerker",
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
            href="/tools/sollicitatiebrief-generator"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Open generator
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Rol-intent: verkoopmedewerker
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Sollicitatiebrief voorbeeld verkoopmedewerker dat service en commerciële impact sterk combineert
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Voor retailfuncties wil een recruiter direct zien dat je klantgericht bent én resultaat levert. Deze role-specifieke voorbeeldblokken helpen je om snel een persoonlijke brief te
              schrijven die laat zien hoe jij bijdraagt aan omzet, bonwaarde en een sterke winkelervaring.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Schrijf direct in generator
              </Link>
              <Link
                href="/cv-template-verkoopmedewerker"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Koppel met verkoopmedewerker CV template
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "KPI-gedreven voorbeeldzinnen",
                "Retail- en servicefocus",
                "Direct inzetbaar in AI-tool",
              ].map((item) => (
                <div
                  key={item}
                  className="border-3 border-black bg-white px-4 py-3 text-sm font-black text-black"
                  style={{ borderWidth: "3px" }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Wat recruiters in deze brief direct checken</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {recruiterSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/sollicitatiebrief-voorbeeld"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Bekijk ook: algemene sollicitatiebrief voorbeelden
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Copy-ready voorbeelden
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Sollicitatiebrief voorbeeldblokken voor verkoopfuncties
          </h2>
          <div className="mt-6 space-y-5">
            {examples.map((example) => (
              <article
                key={example.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{example.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{example.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Checklist voor verzenden
            </p>
            <div className="mt-4 space-y-3">
              {checklist.map((item, index) => (
                <div key={item} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center border-2 border-white bg-black text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-slate-200">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t-2 border-yellow-300 pt-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
                ATS-termen om te verwerken
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-100">
                {atsTerms.join(" | ")}
              </p>
            </div>
          </div>

          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Veelgemaakte fouten
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Wat je brief zwak maakt voor retail vacatures
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              {mistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-2 border-black pt-4">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Schrijf deze brief direct met de sollicitatiebrief generator
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Bronnen (laatst gecontroleerd: 10 maart 2026)
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Bronnen en referenties
          </h2>
          <div className="mt-6 space-y-3">
            {sourceLinks.map((source) => (
              <a
                key={source.label}
                href={source.href}
                target={source.href.startsWith("http") ? "_blank" : undefined}
                rel={source.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="block border-2 border-black bg-white p-4 text-sm font-medium text-slate-700 transition-colors hover:bg-yellow-100"
              >
                <span className="font-black text-black">{source.label}</span>
                <span className="mt-1 block break-all">
                  {source.href.startsWith("http") ? source.href : `https://werkcv.nl${source.href}`}
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over een sollicitatiebrief voor verkoopmedewerker
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
                Klaar om je brief en CV te finaliseren?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Schrijf je verkoop sollicitatiebrief en rond direct je CV af
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Gebruik de generator voor je brief en bouw daarna je CV in dezelfde workflow.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Start met sollicitatiebrief
              </Link>
              <Link
                href="/editor"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Open CV editor
              </Link>
            </div>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Footer />
    </div>
  );
}
