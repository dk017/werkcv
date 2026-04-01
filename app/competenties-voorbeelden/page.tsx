import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const competencyGroups = [
  {
    title: "Administratief en office",
    examples: ["Nauwkeurigheid", "Plannen en organiseren", "Prioriteren", "Verantwoordelijkheid nemen"],
  },
  {
    title: "Klantcontact en service",
    examples: ["Empathisch communiceren", "Problemen oplossen", "Conflicten rustig afhandelen", "Klantgericht handelen"],
  },
  {
    title: "Management en coordinatie",
    examples: ["Leiderschap", "Besluitvaardigheid", "Stakeholdermanagement", "Resultaatgericht sturen"],
  },
  {
    title: "Technisch en analytisch werk",
    examples: ["Analytisch denken", "Zelfstandig werken", "Kwaliteitsbewustzijn", "Continu verbeteren"],
  },
];

const differenceCards = [
  {
    title: "Competenties",
    body: "Breder gedragsmatig of beroepsmatig vermogen, zoals plannen, analyseren of samenwerken.",
  },
  {
    title: "Vaardigheden",
    body: "Concretere skills of technieken, zoals Excel, SQL, Power BI, tillen of orderpicken.",
  },
  {
    title: "Eigenschappen",
    body: "Persoonlijke kenmerken, zoals geduldig of sociaal. Op een CV zijn competenties meestal sterker dan losse eigenschappen.",
  },
];

const faqs = [
  {
    question: "Wat zijn goede competenties voor op je cv?",
    answer:
      "Goede competenties sluiten direct aan op de functie en kun je onderbouwen met voorbeelden. Denk aan plannen, analyseren, klantgerichtheid, samenwerken of besluitvaardigheid.",
  },
  {
    question: "Wat is het verschil tussen competenties en vaardigheden?",
    answer:
      "Vaardigheden zijn meestal concreter en technischer, zoals Excel of Power BI. Competenties gaan vaker over hoe je werkt, zoals plannen, communiceren of prioriteren.",
  },
  {
    question: "Hoeveel competenties zet je op je cv?",
    answer:
      "Voor de meeste CV&apos;s werkt een korte selectie van 4 tot 8 competenties het best. Kies alleen competenties die je later ook terug laat komen in werkervaring of projecten.",
  },
  {
    question: "Kan ik competenties voorbeelden letterlijk overnemen?",
    answer:
      "Gebruik voorbeelden als shortlist, maar stem ze af op de vacature en jouw praktijkervaring. Een recruiter gelooft competenties pas als ze terugkomen in je resultaten.",
  },
];

export const metadata: Metadata = {
  title: "Competenties Voorbeelden - Sterke Competenties voor je CV | WerkCV.nl",
  description:
    "Zoek je competenties voorbeelden voor je CV? Bekijk sterke competenties per rol, het verschil met vaardigheden en hoe je ze geloofwaardig op je CV zet.",
  keywords: [
    "competenties voorbeelden",
    "competenties cv",
    "wat zijn competenties",
    "competentie betekenis",
    "goede competenties voor cv",
    "voorbeelden competenties",
  ],
  alternates: {
    canonical: "https://werkcv.nl/competenties-voorbeelden",
    languages: {
      "nl-NL": "https://werkcv.nl/competenties-voorbeelden",
      "x-default": "https://werkcv.nl/competenties-voorbeelden",
    },
  },
};

export default function CompetentiesVoorbeeldenPage() {
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
        name: "Competenties Voorbeelden",
        item: "https://werkcv.nl/competenties-voorbeelden",
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
              Intent: competenties voorbeelden
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Competenties voorbeelden die sterker zijn dan losse eigenschappen
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Wie zoekt op competenties voorbeelden wil meestal weten welke woorden op een CV
              geloofwaardig zijn en welke te vaag blijven. Op deze pagina zie je per rol welke
              competenties goed werken, hoe ze verschillen van vaardigheden en hoe je ze slim inzet.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/vaardigheden-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Genereer shortlist
              </Link>
              <Link
                href="/vaardigheden-cv-voorbeelden"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk vaardigheden voorbeelden
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Snelle vuistregel</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Gebruik competenties niet als losse buzzwords. Kies alleen competenties die
              in je werkervaring, stages of projecten herkenbaar terugkomen. Dan voelen ze
              recruiter-proof in plaats van opgeplakt.
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
            Competenties voorbeelden per type werk
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {competencyGroups.map((group) => (
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
                href: "/vaardigheden-cv-voorbeelden",
                title: "Vaardigheden voor CV",
                body: "Vergelijk competenties met hard en soft skills zodra je je CV-sectie concreter wilt maken.",
              },
              {
                href: "/tools/vaardigheden-generator",
                title: "Vaardigheden generator",
                body: "Gebruik een tool als je vanuit de vacature een shortlist wilt bouwen in plaats van losse woorden te bedenken.",
              },
              {
                href: "/profieltekst-cv-voorbeelden",
                title: "Voorbeeld profiel CV",
                body: "Laat je sterkste competenties terugkomen in je profieltekst zodat ze niet alleen in een lijst staan.",
              },
              {
                href: "/cv-voorbeelden",
                title: "CV voorbeelden",
                body: "Zie hoe competenties geloofwaardig landen wanneer ze terugkomen in werkervaring en resultaatbulletpoints.",
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
            Veelgestelde vragen over competenties
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
                Klaar om competenties goed te plaatsen?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Kies je shortlist en zet die direct in je CV
              </h2>
            </div>
            <Link
              href="/tools/vaardigheden-generator"
              className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Start shortlist tool
            </Link>
          </div>
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Footer />
    </div>
  );
}
