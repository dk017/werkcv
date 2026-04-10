import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const openingFormulas = [
  {
    title: "1) Functie + directe match",
    body: "Noem de functie en je eerste sterke inhoudelijke match met de rol. Zo weet de recruiter direct waarom jij relevant bent.",
  },
  {
    title: "2) Bedrijf + concrete reden",
    body: "Begin met iets specifieks over het bedrijf, product of team dat je aanspreekt. Dat werkt sterker dan een algemene openingszin.",
  },
  {
    title: "3) Resultaat + overstap naar de vacature",
    body: "Open met een recent resultaat en verbind dat direct aan waarom je op deze functie reageert.",
  },
  {
    title: "4) Richting + motivatie",
    body: "Gebruik dit vooral bij starters of switchers: leg kort uit welke richting je zoekt en waarom deze rol logisch is.",
  },
];

const openingExamples = [
  {
    title: "Voorbeeld opening voor administratie",
    text:
      "Met vijf jaar ervaring in administratieve ondersteuning en procesverbetering solliciteer ik naar de functie van administratief medewerker bij [Bedrijfsnaam], omdat deze rol direct aansluit op mijn ervaring met planning, dossierbeheer en Excel-gestuurde werkprocessen.",
  },
  {
    title: "Voorbeeld opening voor klantenservice",
    text:
      "Wat mij aanspreekt in de vacature voor klantenservicemedewerker bij [Bedrijfsnaam] is de combinatie van service, tempo en duidelijke communicatie. Juist in dat spanningsveld heb ik in mijn huidige rol een klanttevredenheid van 9,1 behaald.",
  },
  {
    title: "Voorbeeld opening voor een starter",
    text:
      "Tijdens mijn stage ontdekte ik hoe sterk mijn analytische en communicatieve vaardigheden samenkomen in een marketingomgeving. Daarom spreekt de junior marketingfunctie bij [Bedrijfsnaam] mij direct aan.",
  },
  {
    title: "Voorbeeld opening voor een carrièreswitch",
    text:
      "Na jaren in operations heb ik gemerkt dat mijn sterkste bijdrage ligt in procesanalyse en rapportage. De vacature voor junior data-analist bij [Bedrijfsnaam] is daarom voor mij een logische en gerichte volgende stap.",
  },
];

const mistakes = [
  "Openen met alleen 'Hierbij solliciteer ik...' zonder inhoudelijke haak.",
  "Te veel over jezelf zeggen zonder de rol of het bedrijf te noemen.",
  "Algemene woorden gebruiken als gemotiveerd of leergierig zonder bewijs.",
  "Een opening schrijven die naar elk bedrijf gestuurd kan worden.",
];

const faqs = [
  {
    question: "Hoe begin je een sollicitatiebrief sterk?",
    answer:
      "Een sterke opening noemt direct de functie, laat zien waarom jij inhoudelijk past en geeft liefst al een eerste concreet bewijs of een specifieke reden waarom dit bedrijf logisch is voor jou.",
  },
  {
    question: "Mag ik beginnen met 'Hierbij solliciteer ik'?",
    answer:
      "Dat mag, maar het is meestal te vlak. Recruiters lezen die formulering vaak en onthouden er weinig van. Een concretere openingszin werkt bijna altijd sterker.",
  },
  {
    question: "Moet ik in de eerste zin al een resultaat noemen?",
    answer:
      "Dat is niet verplicht, maar het kan sterk werken als het resultaat direct relevant is voor de vacature. Anders kun je beter openen met functie, motivatie en bedrijfsfit.",
  },
  {
    question: "Is een opening voor een motivatiebrief anders dan voor een sollicitatiebrief?",
    answer:
      "In de praktijk nauwelijks. In beide gevallen werkt een opening het best als die snel duidelijk maakt waarom jij, deze rol en dit bedrijf logisch bij elkaar passen.",
  },
  {
    question: "Hoe begin ik een sollicitatiebrief zonder werkervaring?",
    answer:
      "Focus dan op studie, stage, projecten, bijbaan of leerdoelen die direct aansluiten op de rol. De opening moet vooral richting en potentieel laten zien, niet jaren ervaring.",
  },
];

export const metadata: Metadata = {
  title: "Sollicitatiebrief beginnen in 2026: sterke openingszinnen | WerkCV",
  description:
    "Leer hoe je een sollicitatiebrief sterk begint met openingszinnen, formules en voorbeelden per situatie. Vermijd standaardopeningen en schrijf direct overtuigender.",
  keywords: [
    "sollicitatiebrief beginnen",
    "hoe begin je een sollicitatiebrief",
    "opening sollicitatiebrief",
    "eerste zin sollicitatiebrief",
    "sollicitatiebrief openingszin",
    "motivatiebrief beginnen",
  ],
  alternates: {
    canonical: "https://werkcv.nl/sollicitatiebrief-beginnen",
    languages: {
      "nl-NL": "https://werkcv.nl/sollicitatiebrief-beginnen",
      "x-default": "https://werkcv.nl/sollicitatiebrief-beginnen",
    },
  },
};

export default function SollicitatiebriefBeginnenPage() {
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
        name: "Sollicitatiebrief beginnen",
        item: "https://werkcv.nl/sollicitatiebrief-beginnen",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Sollicitatiebrief beginnen in 4 stappen",
    description: "Praktische formule om een sollicitatiebrief sterker te openen.",
    totalTime: "PT15M",
    step: openingFormulas.map((step) => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.body,
    })),
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
              Intent: sollicitatiebrief beginnen
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Sollicitatiebrief beginnen zonder zwakke standaardzin
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              De eerste zin van je brief bepaalt of een recruiter doorleest. Op deze pagina zie je
              hoe je openingszinnen schrijft die functie, motivatie en bewijs meteen logisch
              samenbrengen.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Schrijf direct je opening
              </Link>
              <Link
                href="/sollicitatiebrief-voorbeeld"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Eerst briefvoorbeelden bekijken
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Wat een opening direct moet doen</h2>
            <div className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <p>Noem de functie of richting snel en duidelijk.</p>
              <p>Geef een eerste reden waarom jij inhoudelijk past.</p>
              <p>Maak de zin zo specifiek dat hij niet naar elk bedrijf kan.</p>
              <p>Zet de toon voor de rest van je brief: concreet, rustig en recruiterproof.</p>
            </div>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/motivatiebrief-schrijven"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Bekijk ook: motivatiebrief schrijven
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Opening workflow
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Sollicitatiebrief beginnen in 4 praktische stappen
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {openingFormulas.map((step) => (
              <article
                key={step.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-xl font-black text-black">{step.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Openingszinnen
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Voorbeeldopeningen per situatie
          </h2>
          <div className="mt-6 space-y-5">
            {openingExamples.map((example) => (
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
              Veelgemaakte fout
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Een opening schrijven die niets specifieks zegt
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-200">
              {mistakes.map((mistake) => (
                <li key={mistake}>{mistake}</li>
              ))}
            </ul>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Slimme vervolgstappen
            </p>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/sollicitatiebrief-maken",
                  title: "Sollicitatiebrief maken",
                  body: "Gebruik de centrale briefhub als je naast je opening ook routekeuze, structuur en voorbeelden wilt zien.",
                },
                {
                  href: "/motivatiebrief-schrijven",
                  title: "Motivatiebrief schrijven",
                  body: "Gebruik de volledige schrijfworkflow zodra je opening staat en je de rest van de brief wilt afmaken.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld",
                  title: "Sollicitatiebrief voorbeelden",
                  body: "Vergelijk complete briefblokken voor opening, midden en afsluiting.",
                },
                {
                  href: "/motivatiebrief-zonder-werkervaring",
                  title: "Motivatiebrief zonder werkervaring",
                  body: "Handig als je opening vooral moet steunen op studie, stage of projecten.",
                },
                {
                  href: "/open-sollicitatie-brief",
                  title: "Open sollicitatie schrijven",
                  body: "Gebruik een andere openingslogica als je zonder concrete vacature schrijft.",
                },
                {
                  href: "/tools/sollicitatiebrief-generator",
                  title: "Sollicitatiebrief generator",
                  body: "Zet je openingszin meteen door naar een complete, persoonlijke brief.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-2 border-black bg-[#FFFEF0] p-4 transition-colors hover:bg-yellow-100"
                >
                  <p className="text-sm font-black text-black">{item.title}</p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">{item.body}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over een sollicitatiebrief beginnen
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
                Klaar om je eerste alinea te schrijven?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Begin sterk en werk daarna de rest van je brief af
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Gebruik de openingslogica van deze pagina, maak direct je brief in de generator en
                koppel daarna een passend CV.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Start met brief
              </Link>
              <Link
                href="/editor"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Bouw ook je CV
              </Link>
            </div>
          </div>
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <Footer />
    </div>
  );
}
