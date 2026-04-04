import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const examples = [
  {
    title: "Voorbeeld opening (administratief medewerker)",
    text: "Met veel interesse solliciteer ik naar de functie van administratief medewerker bij [Bedrijfsnaam]. In mijn huidige rol verwerk ik dagelijks dossiers, facturen en planningen voor meerdere teams, waarbij ik de foutmarge in rapportages met 26% heb teruggebracht door strakkere controles.",
  },
  {
    title: "Voorbeeld kernalinea (proces en software)",
    text: "Ik werk gestructureerd met Excel, Outlook en [AFAS/Exact/SAP], en zorg dat administratieve processen niet alleen kloppen maar ook sneller lopen. Door een vast opvolgschema voor openstaande acties in te voeren, verkortte ik de doorlooptijd van interne verzoeken met gemiddeld twee werkdagen.",
  },
  {
    title: "Voorbeeld motivatie-alinea (bedrijf-fit)",
    text: "Wat mij aanspreekt in uw organisatie is de combinatie van professionaliteit en servicegericht werken. Ik herken mij in die manier van samenwerken en wil mijn ervaring in nauwkeurige verwerking, duidelijke communicatie en eigenaarschap inzetten om uw team direct te ondersteunen.",
  },
  {
    title: "Voorbeeld afsluiting (gesprekgericht)",
    text: "Graag licht ik in een gesprek toe hoe ik met structuur en nauwkeurigheid kan bijdragen aan uw administratieve processen. Dank voor uw tijd en overweging. Ik kijk uit naar uw reactie.",
  },
];

const recruiterSignals = [
  "Je noemt de functietitel exact zoals in de vacature.",
  "Je onderbouwt betrouwbaarheid met concrete werkresultaten.",
  "Je benoemt relevante systemen en workflow-ervaring.",
  "Je brief blijft compact, professioneel en vacaturegericht.",
];

const checklist = [
  "Gebruik de exacte functietitel en bedrijfsnaam in de opening.",
  "Noem minimaal één meetbaar resultaat uit je administratie-ervaring.",
  "Verwerk relevante systemen (zoals Excel/AFAS/Exact/SAP) met context.",
  "Sluit af met een concrete uitnodiging voor een gesprek.",
];

const atsTerms = [
  "administratief medewerker",
  "dossierbeheer",
  "factuurverwerking",
  "agendabeheer",
  "planning",
  "gegevensverwerking",
  "Office 365",
  "Excel",
  "AFAS",
  "Exact",
  "SAP",
  "nauwkeurigheid",
];

const mistakes = [
  "Algemene brief zonder verwijzing naar functie of vacaturecontext.",
  "Alleen motivatie noemen zonder concreet bewijs uit werkervaring.",
  "Geen software- of proceservaring benoemen voor administratieve taken.",
  "Te lange tekstblokken waardoor recruiters je kern missen.",
];

const faqs = [
  {
    question: "Wat moet in een sollicitatiebrief voor administratief medewerker staan?",
    answer:
      "Noem kort je relevante administratie-ervaring, gebruikte systemen en concrete resultaten. Laat zien hoe je met structuur en nauwkeurigheid het team direct ondersteunt.",
  },
  {
    question: "Hoe lang moet een administratieve sollicitatiebrief zijn?",
    answer:
      "Houd de brief kort en duidelijk: meestal 3 tot 5 alinea&apos;s. Recruiters willen snel zien waarom je past, zonder lange algemene tekst.",
  },
  {
    question: "Welke resultaten werken goed in een administratieve brief?",
    answer:
      "Voorbeelden die goed werken: minder fouten, snellere verwerking, betere opvolging van acties, en betrouwbaardere rapportages of planning.",
  },
  {
    question: "Kan ik deze voorbeeldbrief direct kopiëren?",
    answer:
      "Gebruik de voorbeelden als structuur. Pas ze altijd aan op jouw ervaring, vacaturetaal en concrete resultaten voor een geloofwaardige sollicitatie.",
  },
];

const sourceLinks = [
  {
    label: "CV template administratief medewerker (WerkCV)",
    href: "/cv-template-administratief-medewerker",
  },
  {
    label: "CV voorbeeld administratief medewerker (WerkCV)",
    href: "/cv-gids/cv-voorbeeld-administratief-medewerker",
  },
  {
    label: "Indeed - Administrative Assistant Cover Letter Examples",
    href: "https://www.indeed.com/career-advice/cover-letter-samples/administrative-assistant",
  },
];

export const metadata: Metadata = {
  title: "Sollicitatiebrief Voorbeeld Administratief Medewerker | WerkCV",
  description:
    "Gebruik een sterk sollicitatiebrief voorbeeld voor administratief medewerker. Inclusief opening, kernalinea's, checklist en copy-ready zinnen. Start direct in de generator.",
  keywords: [
    "sollicitatiebrief voorbeeld administratief medewerker",
    "motivatiebrief administratief medewerker voorbeeld",
    "administratief medewerker sollicitatiebrief",
    "sollicitatiebrief administratie voorbeeld",
    "korte sollicitatiebrief administratief medewerker",
    "sollicitatiebrief administratieve functie",
  ],
  alternates: {
    canonical: "https://werkcv.nl/sollicitatiebrief-voorbeeld-administratief-medewerker",
    languages: {
      "nl-NL": "https://werkcv.nl/sollicitatiebrief-voorbeeld-administratief-medewerker",
      "x-default": "https://werkcv.nl/sollicitatiebrief-voorbeeld-administratief-medewerker",
    },
  },
};

export default function SollicitatiebriefVoorbeeldAdministratiefMedewerkerPage() {
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
        name: "Sollicitatiebrief Voorbeeld Administratief Medewerker",
        item: "https://werkcv.nl/sollicitatiebrief-voorbeeld-administratief-medewerker",
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
              Rol-intent: administratie
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Sollicitatiebrief voorbeeld administratief medewerker dat direct professioneel overtuigt
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Voor administratieve vacatures wil een recruiter snel zien dat je nauwkeurig werkt, processen begrijpt en opvolging bewaakt. Op deze pagina krijg je copy-ready voorbeelden die je
              direct omzet naar een sterke, persoonlijke sollicitatiebrief.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Schrijf direct in generator
              </Link>
              <Link
                href="/cv-template-administratief-medewerker"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Koppel met admin CV template
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Role-specific voorbeeldzinnen",
                "Checklist voor administratie",
                "Direct te gebruiken in AI-tool",
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
            Sollicitatiebrief voorbeeldblokken voor administratieve functies
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
              Wat je brief zwak maakt voor administratieve functies
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
            Veelgestelde vragen over een sollicitatiebrief voor administratief medewerker
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
                Schrijf je sollicitatiebrief en rond direct je administratief CV af
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
