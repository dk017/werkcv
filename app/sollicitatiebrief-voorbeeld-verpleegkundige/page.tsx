import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const examples = [
  {
    title: "Voorbeeld opening (verpleegkundige)",
    text: "Met grote betrokkenheid solliciteer ik naar de functie van verpleegkundige bij [Zorginstelling]. Als BIG-geregistreerde verpleegkundige met ervaring in klinische zorg en multidisciplinair samenwerken, wil ik mijn kennis van patiëntenzorg, triage en zorgcoördinatie inzetten binnen uw team.",
  },
  {
    title: "Voorbeeld kernalinea (klinische kwaliteit)",
    text: "In mijn huidige rol ben ik verantwoordelijk voor zorgverlening, observatie, medicatieveiligheid en nauwkeurige EPD-rapportage. Door een strakkere overdrachtsstructuur in te voeren, verbeterde de continuïteit van zorg tussen diensten en daalde het aantal onvolledige overdrachten merkbaar.",
  },
  {
    title: "Voorbeeld motivatie-alinea (zorgvisie en teamfit)",
    text: "Wat mij aanspreekt in uw organisatie is de nadruk op kwalitatieve, mensgerichte zorg en professionele ontwikkeling. Ik werk graag in teams waarin klinisch redeneren, duidelijke communicatie en gezamenlijke verantwoordelijkheid centraal staan, zodat patiënten consistente en veilige zorg ervaren.",
  },
  {
    title: "Voorbeeld afsluiting (gesprekgericht)",
    text: "Graag licht ik in een gesprek toe hoe ik met mijn verpleegkundige ervaring en kwaliteitsgerichte aanpak kan bijdragen aan uw afdeling. Dank voor uw tijd en overweging. Ik zie uw reactie met belangstelling tegemoet.",
  },
];

const recruiterSignals = [
  "Je benoemt BIG-registratie en klinische context duidelijk en correct.",
  "Je koppelt zorgtaken aan kwaliteit, veiligheid en teamafstemming.",
  "Je toont praktijkervaring met overdracht, rapportage en zorgcoördinatie.",
  "Je brief is empathisch en professioneel, zonder vage claims.",
];

const checklist = [
  "Vermeld je BIG-registratie (of status) en functietitel direct in de brief.",
  "Noem concrete zorgcontext zoals afdeling, doelgroep of type zorg.",
  "Onderbouw kwaliteit met één verbeterresultaat of praktijkvoorbeeld.",
  "Sluit af met een heldere uitnodiging voor gesprek.",
];

const atsTerms = [
  "verpleegkundige",
  "BIG-registratie",
  "klinisch redeneren",
  "EPD-rapportage",
  "triage",
  "medicatieveiligheid",
  "zorgcoordinatie",
  "multidisciplinair",
  "acute zorg",
  "patiëntenzorg",
  "SBAR-overdracht",
];

const mistakes = [
  "BIG-registratie niet noemen of onduidelijk laten.",
  "Alleen zorgtaken opsommen zonder kwaliteits- of contextbewijs.",
  "Geen vermelding van rapportage, overdracht of teamafstemming.",
  "Te algemene motivatie zonder koppeling aan zorginhoud en afdeling.",
];

const faqs = [
  {
    question: "Wat moet in een sollicitatiebrief voor verpleegkundige staan?",
    answer:
      "Benoem je BIG-registratie, relevante zorgervaring en hoe je kwaliteit en veiligheid in de praktijk borgt. Laat zien hoe je samenwerkt in het zorgteam en wat jouw concrete bijdrage is.",
  },
  {
    question: "Moet ik BIG-registratie in mijn brief vermelden?",
    answer:
      "Ja, voor verpleegkundige functies is dat meestal essentieel. Vermeld je BIG-status duidelijk en actueel om direct vertrouwen op te bouwen bij de eerste selectie.",
  },
  {
    question: "Hoe maak ik een verpleegkundige brief zonder veel werkervaring?",
    answer:
      "Gebruik stage- en leerwerkervaring met concrete situaties: observaties, rapportage, ADL-zorg, triage of teamoverdracht. Laat zien dat je veilig, nauwkeurig en patiëntgericht werkt.",
  },
  {
    question: "Kan ik deze voorbeeldbrief letterlijk overnemen?",
    answer:
      "Gebruik de voorbeelden als structuur. Personaliseer altijd met jouw afdelingservaring, patiëntcontext en resultaten zodat de brief geloofwaardig blijft.",
  },
];

const sourceLinks = [
  {
    label: "CV template verpleegkundige (WerkCV)",
    href: "/cv-template-verpleegkundige",
  },
  {
    label: "CV voorbeeld verpleegkundige (WerkCV)",
    href: "/cv-voorbeelden/zorg-en-welzijn/verpleegkundige",
  },
  {
    label: "Indeed - Registered Nurse Cover Letter Examples",
    href: "https://www.indeed.com/career-advice/cover-letter-samples/registered-nurse",
  },
];

export const metadata: Metadata = {
  title: "Sollicitatiebrief Voorbeeld Verpleegkundige | WerkCV.nl",
  description:
    "Gebruik een sterk sollicitatiebrief voorbeeld voor verpleegkundige. Inclusief BIG-proof openingszinnen, klinische voorbeeldblokken en praktische checklist. Start direct in de generator.",
  keywords: [
    "sollicitatiebrief voorbeeld verpleegkundige",
    "motivatiebrief verpleegkundige voorbeeld",
    "verpleegkundige sollicitatiebrief",
    "sollicitatiebrief zorg",
    "BIG sollicitatiebrief verpleegkundige",
    "korte sollicitatiebrief verpleegkundige",
  ],
  alternates: {
    canonical: "https://werkcv.nl/sollicitatiebrief-voorbeeld-verpleegkundige",
    languages: {
      "nl-NL": "https://werkcv.nl/sollicitatiebrief-voorbeeld-verpleegkundige",
      "x-default": "https://werkcv.nl/sollicitatiebrief-voorbeeld-verpleegkundige",
    },
  },
};

export default function SollicitatiebriefVoorbeeldVerpleegkundigePage() {
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
        name: "Sollicitatiebrief Voorbeeld Verpleegkundige",
        item: "https://werkcv.nl/sollicitatiebrief-voorbeeld-verpleegkundige",
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
              Rol-intent: verpleegkundige
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Sollicitatiebrief voorbeeld verpleegkundige dat BIG-proof en zorginhoudelijk sterk overkomt
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Voor verpleegkundige functies kijken recruiters direct naar registratie, klinische kwaliteit en teamfit. Deze pagina geeft je role-specifieke voorbeeldblokken waarmee je een
              persoonlijke sollicitatiebrief schrijft die zorginhoud en motivatie overtuigend combineert.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Schrijf direct in generator
              </Link>
              <Link
                href="/cv-template-verpleegkundige"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Koppel met verpleegkundige CV template
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "BIG-proof briefstructuur",
                "Klinische voorbeeldzinnen",
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
            Sollicitatiebrief voorbeeldblokken voor verpleegkundige functies
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
              Wat je brief zwak maakt voor verpleegkundige vacatures
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
            Veelgestelde vragen over een sollicitatiebrief voor verpleegkundige
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
                Schrijf je verpleegkundige sollicitatiebrief en rond direct je CV af
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
