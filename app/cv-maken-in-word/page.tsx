import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getTemplateConfig } from "@/lib/templates/registry";

const simpleTemplate = getTemplateConfig("simple");

const wordProblems = [
  "Marges, tabstops en koppen verschuiven zodra je tekst aanpast.",
  "Eenzelfde CV bewaren in meerdere Word-versies wordt snel rommelig.",
  "De PDF-uitvoer uit Word oogt niet altijd stabiel op mobiel of bijlage-preview.",
  "Je verliest tijd aan layout in plaats van aan profieltekst en werkervaring.",
];

const wordFlow = [
  {
    title: "1) Start vanuit een vaste template in plaats van een leeg Word-document",
    body: "Daardoor heb je direct structuur voor profiel, ervaring, opleiding en vaardigheden zonder eerst marges en lettertypes te moeten instellen.",
  },
  {
    title: "2) Schrijf eerst de inhoud, niet de opmaak",
    body: "Een sterk CV wint op relevantie. Gebruik Word-intentie om mensen snel naar een editorflow te sturen waar de layout al klopt.",
  },
  {
    title: "3) Vergelijk je inhoud in meerdere layouts",
    body: "Met dezelfde tekst zie je direct of een simpel, professioneel of moderner template het beste werkt voor jouw functie.",
  },
  {
    title: "4) Download pas op het einde als PDF",
    body: "Het doel is geen Word-bestand bewaren, maar een nette, stabiele sollicitatieversie versturen.",
  },
];

const faqs = [
  {
    question: "Kan ik nog steeds een cv maken in Word?",
    answer:
      "Ja, maar het kost vaak meer tijd aan opmaak en versiebeheer. Voor de meeste sollicitaties is een vaste online template sneller en stabieler.",
  },
  {
    question: "Wat is beter: cv maken in Word of online?",
    answer:
      "Online is meestal beter als je meerdere vacaturevarianten wilt maken, snel wilt aanpassen en direct een nette PDF wilt hebben zonder layoutgedoe.",
  },
  {
    question: "Kan ik WerkCV gebruiken als alternatief voor Word?",
    answer:
      "Ja. Je kiest een template, vult je inhoud in en downloadt pas als je klaar bent. Daarmee vervang je het handmatige Word-opmaakwerk grotendeels.",
  },
  {
    question: "Kan ik mijn cv bij WerkCV als Word-bestand downloaden?",
    answer:
      "Nee. WerkCV is bedoeld als sneller alternatief voor cv maken in Word. Je kiest een template, werkt online in de editor en downloadt daarna de definitieve versie als PDF.",
  },
  {
    question: "Moet ik nog steeds als PDF versturen?",
    answer:
      "Meestal wel. PDF blijft voor sollicitaties de veiligste eindvorm, omdat de layout dan stabiel blijft bij recruiters en ATS-systemen.",
  },
];

export const metadata: Metadata = {
  title: "CV Maken in Word - Kies Templates en Download Daarna als PDF | WerkCV.nl",
  description:
    "CV maken in Word? WerkCV is een sneller alternatief: kies een template, vul online in en download daarna als stabiele PDF. Geen Word-opmaakstress.",
  keywords: [
    "cv maken in word",
    "cv maken word",
    "word cv maken",
    "cv in word maken",
    "cv op word maken",
    "zelf cv maken in word",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-maken-in-word",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-maken-in-word",
      "x-default": "https://werkcv.nl/cv-maken-in-word",
    },
  },
};

export default function CvMakenInWordPage() {
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
        name: "CV Maken in Word",
        item: "https://werkcv.nl/cv-maken-in-word",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "CV maken in Word vervangen door een snellere workflow",
    description:
      "Praktische stappen voor mensen die nu nog in Word starten maar sneller naar een stabiele sollicitatie-PDF willen.",
    totalTime: "PT20M",
    step: wordFlow.map((step) => ({
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
            href="/editor"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Start in editor
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Word-intentie
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV maken in Word? Kies liever een template en download daarna als PDF
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Mensen zoeken nog vaak op <strong>cv maken in Word</strong> omdat dat
              vertrouwd voelt. In de praktijk ontstaat daar vaak opmaakfrictie.
              WerkCV is geen Word-export tool, maar een sneller alternatief: je kiest
              een template, werkt online in de editor en downloadt daarna een stabiele
              PDF zonder te worstelen met tabellen, marges en schuivende koppen.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/templates"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Bekijk CV templates
              </Link>
              <Link
                href="/editor"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Of start direct in editor
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Waarom Word vaak vertraagt</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {wordProblems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-5 border-t-4 border-black pt-5 text-sm font-black text-black">
              WerkCV eindigt in PDF, niet in Word.
            </p>
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Praktische start
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Beste start als je normaal in Word begint
            </h2>
            <div className="mt-5 border-4 border-black bg-[#FFFEF0] p-5">
              <h3 className="text-2xl font-black text-black">{simpleTemplate.nameDutch}</h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                {simpleTemplate.description}
              </p>
              <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
                <li>Rustige, vertrouwde basis.</li>
                <li>Makkelijk te vullen zonder layoutgedoe.</li>
                <li>Goede stap van Word-denken naar sneller solliciteren.</li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/editor"
                  className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
                >
                  Gebruik deze template
                </Link>
                <Link
                  href="/templates"
                  className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
                >
                  Bekijk alle templates
                </Link>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Betere flow
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Van Word-intentie naar een sterkere sollicitatieversie
            </h2>
            <div className="mt-6 space-y-4">
              {wordFlow.map((item, index) => (
                <div key={item.title} className="flex gap-4">
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center border-3 border-black bg-white text-sm font-black text-black"
                    style={{ borderWidth: "3px" }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-black">{item.title}</h3>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-black p-8 text-white shadow-[8px_8px_0px_0px_rgba(250,204,21,1)]">
          <h2 className="text-3xl font-black">
            Gebruik Word niet als einddoel, maar als zoeksignaal
          </h2>
          <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-slate-200">
            De meeste gebruikers willen uiteindelijk geen Word-bestand bewaren, maar
            gewoon een nette sollicitatieversie versturen. WerkCV verkort die route:
            template kiezen, inhoud invullen, per vacature aanscherpen en daarna als
            PDF downloaden.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/templates"
              className="border-4 border-white bg-yellow-400 px-5 py-3 text-base font-black text-black"
            >
              Bekijk templates
            </Link>
            <Link
              href="/cv-maken-pdf"
              className="border-4 border-white bg-transparent px-5 py-3 text-base font-black text-white"
            >
              Waarom PDF beter werkt
            </Link>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-black text-black">Veelgestelde vragen over CV maken in Word</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{faq.question}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </div>
  );
}
