import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const propertyGroups = [
  {
    title: "Goede eigenschappen voor service en klantcontact",
    examples: ["Klantgericht", "Geduldig", "Stressbestendig", "Helder communiceren"],
  },
  {
    title: "Goede eigenschappen voor administratie en office",
    examples: ["Nauwkeurig", "Georganiseerd", "Betrouwbaar", "Zelfstandig"],
  },
  {
    title: "Goede eigenschappen voor leiding of coordinatie",
    examples: ["Besluitvaardig", "Verantwoordelijk", "Coachend", "Resultaatgericht"],
  },
  {
    title: "Goede eigenschappen voor starters en scholieren",
    examples: ["Leergierig", "Punctueel", "Sociaal", "Aanpakker"],
  },
];

const differenceCards = [
  {
    title: "Eigenschappen",
    body: "Persoonlijke kenmerken zoals betrouwbaar, nauwkeurig of sociaal. Ze werken alleen goed als ze logisch terugkomen in je ervaring of gedrag.",
  },
  {
    title: "Sterke punten",
    body: "Eigenschappen of vaardigheden die jij echt als voordeel inzet in je werk. Sterke punten zijn dus vaak beter onderbouwde eigenschappen.",
  },
  {
    title: "Competenties",
    body: "Breder en professioneler geformuleerd gedrag, zoals plannen, analyseren of samenwerken. Op een volwassen CV zijn competenties vaak krachtiger dan losse eigenschappen.",
  },
];

const faqs = [
  {
    question: "Welke eigenschappen zet je op je cv?",
    answer:
      "Gebruik alleen eigenschappen die direct relevant zijn voor de functie en die je kunt onderbouwen met voorbeelden uit werk, school, stage of projecten. Een korte selectie van 3 tot 5 sterke eigenschappen werkt meestal beter dan een lange lijst.",
  },
  {
    question: "Wat zijn goede eigenschappen voor een cv?",
    answer:
      "Dat hangt af van de rol. Voor administratie werken bijvoorbeeld nauwkeurig en georganiseerd vaak goed, terwijl voor servicefuncties klantgericht en stressbestendig sterker zijn. Kies dus altijd functiegericht.",
  },
  {
    question: "Wat is het verschil tussen eigenschappen en competenties?",
    answer:
      "Eigenschappen zijn persoonlijker en eenvoudiger geformuleerd, zoals betrouwbaar of sociaal. Competenties zijn professioneler geformuleerd gedragsvaardigheden zoals samenwerken, plannen of analyseren.",
  },
  {
    question: "Kan ik eigenschappen voorbeelden letterlijk overnemen?",
    answer:
      "Gebruik voorbeelden als shortlist, maar stem ze af op jouw rol en bewijs. Recruiters geloven eigenschappen pas als ze ook terugkomen in je werkervaring, profieltekst of projecten.",
  },
];

export const metadata: Metadata = {
  title: "Eigenschappen Op CV - Goede Eigenschappen en Sterke Punten | WerkCV",
  description:
    "Zoek je goede eigenschappen voor op je CV? Bekijk sterke eigenschappen en sterke punten per rol, plus het verschil met competenties en vaardigheden.",
  keywords: [
    "eigenschappen in cv",
    "goede eigenschappen cv",
    "sterke punten cv",
    "voorbeelden sterke punten",
    "eigenschappen cv voorbeelden",
  ],
  alternates: {
    canonical: "https://werkcv.nl/eigenschappen-cv-voorbeelden",
    languages: {
      "nl-NL": "https://werkcv.nl/eigenschappen-cv-voorbeelden",
      "x-default": "https://werkcv.nl/eigenschappen-cv-voorbeelden",
    },
  },
};

export default function EigenschappenCvVoorbeeldenPage() {
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
        name: "Eigenschappen op CV",
        item: "https://werkcv.nl/eigenschappen-cv-voorbeelden",
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
            href="/tools/vaardigheden-generator"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Open vaardigheden tool
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Intent: eigenschappen in cv
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Goede eigenschappen en sterke punten die beter werken dan losse buzzwords
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Eigenschappen op een CV werken alleen als ze geloofwaardig voelen. Wie zoekt op goede
              eigenschappen of sterke punten wil meestal weten welke woorden echt helpen, welke te vaag
              zijn en hoe je ze koppelt aan de functie waarop je solliciteert.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/vaardigheden-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Maak shortlist eigenschappen
              </Link>
              <Link
                href="/competenties-voorbeelden"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Vergelijk met competenties
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Snelle vuistregel</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Schrijf niet alleen &quot;betrouwbaar&quot; of &quot;sociaal&quot;. Kies eigenschappen die direct bij de
              functie passen en laat ze daarna terugkomen in je profieltekst, werkervaring of concrete
              voorbeelden uit school, stage of werk.
            </p>
          </div>
        </section>

        <section className="mb-14 grid gap-5 md:grid-cols-3">
          {differenceCards.map((card) => (
            <article
              key={card.title}
              className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="text-xl font-black text-black">{card.title}</h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{card.body}</p>
            </article>
          ))}
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Per rolcluster
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Goede eigenschappen voor op je CV per situatie
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {propertyGroups.map((group) => (
              <article
                key={group.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-xl font-black text-black">{group.title}</h3>
                <ul className="mt-4 grid gap-2 text-sm font-medium leading-relaxed text-slate-700 sm:grid-cols-2">
                  {group.examples.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Vervolgstappen
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[
              {
                href: "/competenties-voorbeelden",
                title: "Competenties voorbeelden",
                body: "Gebruik deze route als je eigenschappen professioneler wilt formuleren in termen van competenties.",
              },
              {
                href: "/vaardigheden-cv-voorbeelden",
                title: "Vaardigheden voor CV",
                body: "Vergelijk eigenschappen met hard en soft skills zodra je je CV-sectie concreter wilt maken.",
              },
              {
                href: "/profieltekst-cv-voorbeelden",
                title: "Voorbeeld profiel CV",
                body: "Laat je sterkste eigenschappen terugkomen in je profieltekst in plaats van alleen in een losse lijst.",
              },
              {
                href: "/cv-voorbeelden",
                title: "CV voorbeelden",
                body: "Zie hoe eigenschappen geloofwaardig landen zodra ze terugkomen in bullets en resultaten.",
              },
              {
                href: "/templates",
                title: "Templates vergelijken",
                body: "Kies een rustige template zodra je sterke punten helder zijn en je ze logisch wilt verdelen over profieltekst, skills en werkervaring.",
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
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over eigenschappen op je CV
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
                Klaar om je sterke punten scherper te formuleren?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Kies eigenschappen die passen bij de rol en werk ze daarna uit in een rustige CV-structuur
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/vaardigheden-generator"
                className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Start shortlist tool
              </Link>
              <Link
                href="/templates"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Kies template
              </Link>
            </div>
          </div>
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Footer />
    </div>
  );
}
