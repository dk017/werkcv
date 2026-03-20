import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const featuredTemplates = templateList.filter((template) =>
  ["professional", "simple", "modern", "classical"].includes(template.id),
);

const templateAngles: Record<string, string> = {
  professional:
    "Sterk als je een breed inzetbaar CV-sjabloon zoekt voor standaard Nederlandse sollicitaties.",
  simple:
    "Handig als je vooral snel wilt beginnen met een schoon en duidelijk sjabloon.",
  modern:
    "Past goed wanneer een iets frissere uitstraling logisch is voor je sector of rol.",
  classical:
    "Nuttig voor kandidaten die een meer traditionele, volwassen uitstraling willen behouden.",
};

const sjabloonSteps = [
  {
    title: "1) Kies een sjabloon dat bij je rol past",
    body: "Een sjabloon voor finance hoeft niet dezelfde indruk te maken als een sjabloon voor marketing. Begin daarom met de juiste mate van rust of moderniteit.",
  },
  {
    title: "2) Vul eerst je eigen inhoud in voordat je vergelijkt",
    body: "Een sjabloon ziet er pas echt goed uit als jouw tekst erin staat. Vergelijk layouts dus altijd met echte profieltekst en werkervaring.",
  },
  {
    title: "3) Gebruik het sjabloon als structuurhulp",
    body: "De beste CV-sjablonen helpen je automatisch met de juiste volgorde: persoonlijke gegevens, profiel, ervaring, opleiding en vaardigheden.",
  },
  {
    title: "4) Vermijd sjablonen die te druk of te creatief zijn",
    body: "Voor de meeste Nederlandse sollicitaties werkt rust beter dan opvallend design. Recruiters willen snel kunnen scannen.",
  },
  {
    title: "5) Zet pas daarna de definitieve PDF vast",
    body: "Door eerst gratis te bouwen en te vergelijken kies je het sjabloon op inhoudelijke kracht in plaats van op eerste indruk alleen.",
  },
];

const faqs = [
  {
    question: "Wat is een goed cv-sjabloon?",
    answer:
      "Een goed cv-sjabloon is rustig, scanbaar en logisch opgebouwd. Het ondersteunt je inhoud zonder af te leiden of ATS-problemen te veroorzaken.",
  },
  {
    question: "Wat is het verschil tussen een cv-sjabloon en een cv-template?",
    answer:
      "Vrijwel niets. Sjabloon is de Nederlandse term, template wordt vaker gebruikt in online tools. De zoekintentie is in beide gevallen hetzelfde: een vaste, bruikbare layout.",
  },
  {
    question: "Kan ik een cv-sjabloon gratis gebruiken op WerkCV?",
    answer:
      "Ja. Je kunt de sjablonen gratis openen en invullen in de editor. Je betaalt alleen als je de uiteindelijke PDF wilt downloaden.",
  },
  {
    question: "Welk sjabloon is het veiligst voor de meeste vacatures?",
    answer:
      "Professioneel, Simpel en Klassiek zijn vaak de veiligste keuzes als je niet precies weet welke layout het beste past. Ze houden je CV rustig en recruiter-proof.",
  },
];

export const metadata: Metadata = {
  title: "CV Maken Sjabloon - Kies een Rustig en Professioneel CV-Sjabloon | WerkCV.nl",
  description:
    "Zoek je een cv maken sjabloon? Vergelijk rustige en moderne CV-sjablonen, kies de beste structuur voor jouw sollicitatie en start gratis in de editor.",
  keywords: [
    "cv maken sjabloon",
    "sjabloon cv maken",
    "cv sjabloon maken",
    "goede cv sjabloon",
    "professioneel cv sjabloon",
    "sjabloon cv",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-maken-sjabloon",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-maken-sjabloon",
      "x-default": "https://werkcv.nl/cv-maken-sjabloon",
    },
  },
};

export default function CvMakenSjabloonPage() {
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
        name: "CV Maken Sjabloon",
        item: "https://werkcv.nl/cv-maken-sjabloon",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "CV-sjabloon kiezen in 5 stappen",
    description:
      "Praktische manier om het juiste CV-sjabloon te kiezen en daarna door te gaan naar de editor.",
    totalTime: "PT20M",
    step: sjabloonSteps.map((step) => ({
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
              Sjabloon-intentie
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV maken sjabloon kiezen dat je inhoud sterker maakt
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Veel mensen zoeken niet op template maar op <strong>sjabloon</strong>.
              De behoefte is hetzelfde: een duidelijke basis waarmee je sneller een
              professioneel CV opbouwt. WerkCV laat je meerdere sjablonen gratis
              vergelijken en pas op het einde beslissen welke versie je als PDF
              downloadt.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/templates"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Kies een CV-sjabloon
              </Link>
              <Link
                href="/editor"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Start direct
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">
              Wanneer werkt een CV-sjabloon het best?
            </h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <li>Als je niet vanaf een leeg document wilt beginnen.</li>
              <li>Als je snel structuur wilt voor profiel, ervaring en opleiding.</li>
              <li>Als je meerdere layouts wilt vergelijken met dezelfde inhoud.</li>
              <li>Als je een professionele indruk wilt zonder opmaakstress in Word.</li>
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/cv-maken-template"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Liever op template zoeken? Bekijk cv maken template
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          {featuredTemplates.map((template) => (
            <article
              key={template.id}
              className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                Sjabloon
              </p>
              <h2 className="mt-2 text-2xl font-black text-black">
                {template.nameDutch}
              </h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                {templateAngles[template.id] ?? template.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/editor"
                  className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
                >
                  Gebruik dit sjabloon
                </Link>
                <Link
                  href="/templates"
                  className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
                >
                  Vergelijk meer
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="mb-14 border-4 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Werkwijze
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Zo gebruik je een CV-sjabloon zonder generiek te klinken
          </h2>
          <div className="mt-6 space-y-4">
            {sjabloonSteps.map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center border-3 border-black bg-[#FFFEF0] text-sm font-black text-black"
                  style={{ borderWidth: "3px" }}
                >
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-black text-black">{step.title}</h3>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              href: "/modern-cv-template",
              title: "Modern CV template",
              body: "Voor een wat frissere uitstraling zonder rommelige layout.",
            },
            {
              href: "/professioneel-cv-template",
              title: "Professioneel CV template",
              body: "Voor een rustige, zakelijke indruk in brede Nederlandse functies.",
            },
            {
              href: "/gratis-cv-template",
              title: "Gratis CV template",
              body: "Zie hoe gratis starten werkt en welke templates daarvoor handig zijn.",
            },
            {
              href: "/cv-opmaken",
              title: "CV opmaken",
              body: "Pas daarna de opmaak verder aan voor je definitieve sollicitatieversie.",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-yellow-100"
            >
              <p className="text-sm font-black text-black">{item.title}</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                {item.body}
              </p>
            </Link>
          ))}
        </section>

        <section className="mb-14 border-4 border-black bg-black p-8 text-white shadow-[8px_8px_0px_0px_rgba(250,204,21,1)]">
          <h2 className="text-3xl font-black">
            Gebruik een goed sjabloon als basis, niet als vervanging van inhoud
          </h2>
          <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-slate-200">
            Het juiste CV-sjabloon versnelt je start en maakt je document rustiger,
            maar het echte verschil zit nog steeds in profieltekst, ervaring en
            relevantie voor de vacature. WerkCV helpt met beide: structuur én editor.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/templates"
              className="border-4 border-white bg-yellow-400 px-5 py-3 text-base font-black text-black"
            >
              Bekijk sjablonen
            </Link>
            <Link
              href="/prijzen"
              className="border-4 border-white bg-transparent px-5 py-3 text-base font-black text-white"
            >
              Bekijk prijzen
            </Link>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-black text-black">Veelgestelde vragen over CV-sjablonen</h2>
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
