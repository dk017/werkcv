import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const examples = [
  {
    title: "Voorbeeld opening (marketing medewerker)",
    text: "Met veel interesse solliciteer ik naar de functie van marketing medewerker bij [Bedrijfsnaam]. In mijn huidige rol stuur ik campagnes aan over social, e-mail en paid kanalen, waarbij ik de leadkwaliteit verbeterde door betere doelgroepsegmentatie en nauwe afstemming met sales.",
  },
  {
    title: "Voorbeeld kernalinea (performance en KPI)",
    text: "In de afgelopen twaalf maanden heb ik samen met het team de CPL met 21% verlaagd en de conversieratio op campagnelandingpagina&apos;s met 18% verhoogd. Dit bereikte ik door een vast testritme op creatives, doelgroepen en biedstrategie, gecombineerd met wekelijkse optimalisatie op basis van data.",
  },
  {
    title: "Voorbeeld kernalinea (content en SEO)",
    text: "Naast paid campagnes ben ik verantwoordelijk voor contentplanning en SEO-optimalisatie. Door topic-clusters op commerciële zoekintentie te bouwen en bestaande pagina&apos;s te herstructureren, groeide het organisch verkeer in zes maanden met 34% en nam het aandeel marketing qualified leads toe.",
  },
  {
    title: "Voorbeeld motivatie-alinea (teamfit en aanpak)",
    text: "Wat mij aanspreekt in uw vacature is de combinatie van creatief campagnewerk en data-gedreven verbetering. Ik werk graag in een team waar experimenteren, rapporteren en leren centraal staan, zodat marketingbeslissingen niet op gevoel maar op aantoonbare impact worden genomen.",
  },
  {
    title: "Voorbeeld afsluiting (gesprekgericht)",
    text: "Graag licht ik in een gesprek toe hoe ik met kanaalervaring, KPI-focus en een sterke executie-aanpak kan bijdragen aan uw marketingdoelen. Dank voor uw tijd en overweging. Ik zie uw reactie met belangstelling tegemoet.",
  },
];

const recruiterSignals = [
  "Je koppelt marketingwerk aan meetbare resultaten, niet alleen aan activiteiten.",
  "Je benoemt kanaalervaring concreet (SEO, SEA, social, e-mail, content).",
  "Je laat zien hoe je test, optimaliseert en rapporteert op KPI&apos;s.",
  "Je brief toont samenwerking met sales, design of product waar relevant.",
];

const checklist = [
  "Noem de functietitel exact en maak direct een match met de vacaturefocus.",
  "Onderbouw je impact met 1-2 KPI&apos;s zoals CPL, CTR, conversie of MQL.",
  "Benoem de kanalen waarop je echt hebt gewerkt en wat je daar verbeterde.",
  "Verbind je motivatie aan werkwijze, team en groeidoelen van het bedrijf.",
  "Sluit af met een concrete uitnodiging voor een gesprek.",
];

const atsTerms = [
  "marketing medewerker",
  "online marketeer",
  "leadgeneratie",
  "campagne optimalisatie",
  "SEO",
  "SEA",
  "paid social",
  "e-mailmarketing",
  "conversieratio",
  "CTR",
  "CPL",
  "Google Analytics",
];

const mistakes = [
  "Alleen creativiteit benoemen zonder KPI-bewijs of resultaatcontext.",
  "Vage claims over marketingervaring zonder kanaal- of toolvoorbeelden.",
  "Geen koppeling maken met de vacature-intent (groei, leads, awareness).",
  "Te veel toolnamen opsommen zonder te laten zien wat je ermee bereikte.",
  "Generieke motivatie zonder duidelijke fit met bedrijf of team.",
];

const faqs = [
  {
    question: "Wat moet in een sollicitatiebrief voor marketing staan?",
    answer:
      "Benoem je kanaalervaring, concrete campagneresultaten en je manier van optimaliseren. Laat zien hoe je marketingimpact realiseert in plaats van alleen taken op te sommen.",
  },
  {
    question: "Welke KPI&apos;s kan ik in een marketing sollicitatiebrief noemen?",
    answer:
      "Gebruik KPI&apos;s die bij je rol passen, zoals CPL, CTR, conversieratio, ROAS, MQL of organisch verkeer. Kies 1-2 cijfers die je kort kunt toelichten met context.",
  },
  {
    question: "Hoe schrijf ik een marketingbrief zonder veel ervaring?",
    answer:
      "Gebruik stage-, project- of freelancecases met concrete output. Zelfs kleine verbeteringen in clicks, leads of engagement zijn sterk als je ze helder en eerlijk toelicht.",
  },
  {
    question: "Is een motivatiebrief voor marketing anders dan een sollicitatiebrief?",
    answer:
      "In de praktijk worden de termen vaak door elkaar gebruikt. Belangrijk is dat je zowel motivatie als meetbare relevantie laat zien voor de specifieke marketingfunctie.",
  },
  {
    question: "Kan ik dit voorbeeld letterlijk overnemen?",
    answer:
      "Gebruik het als structuur en herschrijf met je eigen projecten, KPI&apos;s en kanaalervaring. Personalisatie bepaalt of je brief geloofwaardig en onderscheidend overkomt.",
  },
];

const sourceLinks = [
  {
    label: "CV template marketing medewerker (WerkCV)",
    href: "/cv-template-marketing-medewerker",
  },
  {
    label: "CV voorbeeld marketing manager (WerkCV)",
    href: "/cv-voorbeelden/marketing-en-communicatie/marketing-manager",
  },
  {
    label: "CV voorbeeld social media specialist (WerkCV)",
    href: "/cv-voorbeelden/marketing-en-communicatie/social-media-specialist",
  },
  {
    label: "Indeed - Marketing Manager Cover Letter Examples",
    href: "https://www.indeed.com/career-advice/cover-letter-samples/marketing-manager",
  },
];

export const metadata: Metadata = {
  title: "Sollicitatiebrief Voorbeeld Marketing | WerkCV",
  description:
    "Gebruik een sterk sollicitatiebrief voorbeeld voor marketing. Inclusief KPI-gedreven voorbeeldzinnen, kanaalgerichte formuleringen, checklist en FAQ. Start direct in de generator.",
  keywords: [
    "sollicitatiebrief voorbeeld marketing",
    "motivatiebrief marketing voorbeeld",
    "sollicitatiebrief marketing medewerker",
    "sollicitatiebrief online marketeer",
    "sollicitatiebrief content marketeer",
    "korte sollicitatiebrief marketing",
  ],
  alternates: {
    canonical: "https://werkcv.nl/sollicitatiebrief-voorbeeld-marketing",
    languages: {
      "nl-NL": "https://werkcv.nl/sollicitatiebrief-voorbeeld-marketing",
      "x-default": "https://werkcv.nl/sollicitatiebrief-voorbeeld-marketing",
    },
  },
};

export default function SollicitatiebriefVoorbeeldMarketingPage() {
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
        name: "Sollicitatiebrief Voorbeeld Marketing",
        item: "https://werkcv.nl/sollicitatiebrief-voorbeeld-marketing",
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
              Rol-intent: marketing
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Sollicitatiebrief voorbeeld marketing dat campagne-impact en kanaalervaring overtuigend laat zien
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Voor marketing vacatures telt niet alleen wat je hebt gedaan, maar vooral welk resultaat je hebt neergezet. Met deze role-specifieke voorbeelden schrijf je sneller een persoonlijke
              brief die recruiters direct laat zien hoe jij groei, leads en conversie helpt verbeteren.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Schrijf direct in generator
              </Link>
              <Link
                href="/cv-template-marketing-medewerker"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Koppel met marketing CV template
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "KPI-gedreven voorbeeldblokken",
                "Kanaalspecifieke formuleringen",
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
            Sollicitatiebrief voorbeeldblokken voor marketing functies
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
              Wat je brief zwak maakt voor marketing vacatures
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
            Bronnen (laatst gecontroleerd: 9 maart 2026)
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
            Veelgestelde vragen over een sollicitatiebrief voor marketing
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
                Schrijf je marketing sollicitatiebrief en rond direct je CV af
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
