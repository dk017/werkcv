import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const examples = [
  {
    title: "Voorbeeld opening (projectmanager)",
    text: "Met veel interesse solliciteer ik naar de functie van projectmanager bij [Bedrijfsnaam]. In mijn huidige rol stuur ik complexe trajecten aan met focus op planning, stakeholderafstemming en voorspelbare oplevering. Juist die combinatie van structuur, executiekracht en duidelijke communicatie wil ik inzetten binnen uw organisatie.",
  },
  {
    title: "Voorbeeld kernalinea (delivery en resultaat)",
    text: "In mijn meest recente project leidde ik een implementatietraject met meerdere afhankelijkheden tussen operations, IT en externe leveranciers. Door een strakker besluitritme en betere risico-opvolging bleef het project binnen scope en daalde de doorlooptijd van escalaties zichtbaar. Ik stuur op overzicht en voortgang zonder het team onnodig te belasten met ruis.",
  },
  {
    title: "Voorbeeld kernalinea (stakeholders en governance)",
    text: "Daarnaast ben ik gewend om management, uitvoering en leveranciers op een lijn te houden via heldere governance, concrete actieoverzichten en realistische verwachtingen. Daardoor ontstaat sneller besluitvorming en blijft eigenaarschap duidelijk, ook wanneer prioriteiten verschuiven of risico's oplopen.",
  },
  {
    title: "Voorbeeld motivatie-alinea (teamfit en context)",
    text: "Wat mij aanspreekt in uw vacature is de combinatie van inhoudelijke complexiteit en praktische delivery. Ik werk graag in omgevingen waar projectsturing niet alleen gaat over plannen maken, maar vooral over mensen, afhankelijkheden en het daadwerkelijk afronden van trajecten met zichtbaar resultaat.",
  },
  {
    title: "Voorbeeld afsluiting (gesprekgericht)",
    text: "Graag licht ik in een gesprek toe hoe ik met mijn ervaring in planning, governance en stakeholdermanagement kan bijdragen aan uw lopende projecten. Dank voor uw tijd en overweging. Ik zie uw reactie met belangstelling tegemoet.",
  },
];

const recruiterSignals = [
  "Je brief maakt duidelijk dat je projecten echt stuurt in plaats van alleen ondersteunt.",
  "Je onderbouwt projectimpact met resultaat op planning, risico, besluitvorming of oplevering.",
  "Je benoemt stakeholdermanagement en governance zonder in vaag managementjargon te vervallen.",
  "Je toon straalt rust, eigenaarschap en realisme uit.",
];

const checklist = [
  "Noem de functietitel exact en koppel die direct aan projectcontext en verantwoordelijkheid.",
  "Voeg minimaal een concreet projectresultaat toe op delivery, budget, risico of doorlooptijd.",
  "Laat zien hoe jij besluitvorming, escalaties of stakeholderafstemming organiseert.",
  "Verwerk methode of context alleen als die relevant is voor de vacature.",
  "Sluit af met een concrete uitnodiging voor gesprek.",
];

const atsTerms = [
  "projectmanager",
  "projectleider",
  "stakeholdermanagement",
  "planning",
  "budgetbewaking",
  "risicoanalyse",
  "governance",
  "PMO",
  "Agile",
  "PRINCE2",
  "change management",
  "implementatie",
];

const mistakes = [
  "Alleen schrijven dat je projectskills hebt zonder bewijs van echte delivery-impact.",
  "Te veel methodewoorden gebruiken zonder context of resultaat.",
  "Geen projectomvang of complexiteit laten doorschemeren in je voorbeelden.",
  "Algemene motivatie zonder link naar de projectomgeving of de kern van de vacature.",
  "Een brief schrijven alsof het een CV is: te veel losse feiten, te weinig samenhangend verhaal.",
];

const faqs = [
  {
    question: "Wat moet in een sollicitatiebrief voor projectmanager staan?",
    answer:
      "Benoem projectcontext, projectresultaat en hoe jij planning, stakeholders en risico's stuurde. Laat zien dat je niet alleen meedoet, maar projecten actief in beweging houdt.",
  },
  {
    question: "Welke resultaten werken sterk in een projectmanager brief?",
    answer:
      "Resultaten op oplevering, budget, risicoverlaging, snellere besluitvorming of minder blokkades werken het best. Kies voorbeelden die passen bij de schaal en context van de vacature.",
  },
  {
    question: "Hoe schrijf ik een projectmanager brief zonder volledige titelervaring?",
    answer:
      "Gebruik ervaring uit projectcoordinatie, PMO, operations of implementatie en vertaal die naar projectimpact. Benoem waar jij al eigenaarschap nam op planning, opvolging of stakeholderafstemming.",
  },
  {
    question: "Moet ik Agile of PRINCE2 noemen in mijn brief?",
    answer:
      "Alleen als het relevant is voor de vacature en jij er echt mee werkte. Belangrijker dan de naam van de methode is hoe jij die gebruikte om projecten beter te sturen.",
  },
  {
    question: "Kan ik dit voorbeeld direct kopieren?",
    answer:
      "Gebruik de structuur als basis en vervang de details door je eigen projectcontext, KPI's en manier van sturen. Dan blijft je brief geloofwaardig en onderscheidend.",
  },
];

const sourceLinks = [
  {
    label: "CV template projectmanager (WerkCV)",
    href: "/cv-template-projectmanager",
  },
  {
    label: "CV voorbeeld projectmanager (WerkCV)",
    href: "/cv-gids/cv-voorbeeld-projectmanager",
  },
  {
    label: "CV voorbeeld ICT projectleider (WerkCV)",
    href: "/cv-voorbeelden/technologie-en-ict/ict-projectleider",
  },
];

export const metadata: Metadata = {
  title: "Sollicitatiebrief Voorbeeld Projectmanager | WerkCV",
  description:
    "Gebruik een sterk sollicitatiebrief voorbeeld voor projectmanager. Inclusief deliverygerichte voorbeeldzinnen, checklist, ATS-termen en FAQ. Start direct in de generator.",
  keywords: [
    "sollicitatiebrief voorbeeld projectmanager",
    "motivatiebrief projectmanager voorbeeld",
    "projectmanager sollicitatiebrief",
    "sollicitatiebrief projectleider",
    "junior projectmanager sollicitatiebrief",
    "korte sollicitatiebrief projectmanager",
  ],
  alternates: {
    canonical: "https://werkcv.nl/sollicitatiebrief-voorbeeld-projectmanager",
    languages: {
      "nl-NL": "https://werkcv.nl/sollicitatiebrief-voorbeeld-projectmanager",
      "x-default": "https://werkcv.nl/sollicitatiebrief-voorbeeld-projectmanager",
    },
  },
};

export default function SollicitatiebriefVoorbeeldProjectmanagerPage() {
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
        name: "Sollicitatiebrief Voorbeeld Projectmanager",
        item: "https://werkcv.nl/sollicitatiebrief-voorbeeld-projectmanager",
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
              Rol-intent: projectmanager
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Sollicitatiebrief voorbeeld projectmanager dat delivery, overzicht en eigenaarschap overtuigend laat zien
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Bij projectmanager vacatures draait je brief om bewijs van regie. Deze pagina geeft je role-specifieke voorbeeldblokken waarmee je laat zien dat jij projecten voorspelbaar houdt, stakeholders meeneemt en risico&apos;s actief beheerst.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Schrijf direct in generator
              </Link>
              <Link
                href="/cv-template-projectmanager"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Koppel met projectmanager CV template
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Deliverygerichte voorbeeldzinnen",
                "Governance- en stakeholderfocus",
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
            Sollicitatiebrief voorbeeldblokken voor projectmanager functies
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
              Wat je brief zwak maakt voor projectmanager vacatures
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
            Bronnen (laatst gecontroleerd: 21 april 2026)
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
            Veelgestelde vragen over een sollicitatiebrief voor projectmanager
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
                Schrijf je projectmanager sollicitatiebrief en rond direct je CV af
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Gebruik de generator voor je brief en bouw daarna je CV in dezelfde workflow verder uit.
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
