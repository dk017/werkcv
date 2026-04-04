import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const featuredTemplates = templateList.filter((template) =>
  ["modern", "elegant", "remarkable"].includes(template.id),
);

const templateUseCases: Record<string, string> = {
  modern:
    "Goede basis als je een eigentijds ontwerp wilt dat nog steeds breed inzetbaar blijft.",
  elegant:
    "Sterk wanneer je meer verfijning zoekt dan opvallendheid en de layout volwassen moet aanvoelen.",
  remarkable:
    "Nuttig voor rollen waar wat meer visuele energie acceptabel is, zolang je inhoud nog steeds de boventoon houdt.",
};

const designWorkflow = [
  {
    title: "1) Start vanuit functiecontext, niet vanuit smaak alleen",
    body: "Een sterk CV-ontwerp past bij de rol waarvoor je solliciteert. Design dat niet aansluit op sector en niveau voelt snel misplaatst.",
  },
  {
    title: "2) Kies de hiërarchie voordat je kleuren kiest",
    body: "Wat moet eerst opvallen: je naam, titel, profiel of werkervaring? Goede hiërarchie maakt een ontwerp bruikbaar, niet alleen mooi.",
  },
  {
    title: "3) Hou secties en witruimte consistent",
    body: "CV ontwerpen werkt het best als alle onderdelen dezelfde logica volgen. Consistentie laat een layout sneller professioneel aanvoelen.",
  },
  {
    title: "4) Laat de template de zware designkeuzes dragen",
    body: "Je hoeft het ontwerp niet vanaf nul te bedenken. Een goed template verkleint het risico op een rommelig of overwerkt eindresultaat.",
  },
  {
    title: "5) Toets je ontwerp op leesbaarheid en geloofwaardigheid",
    body: "Als je CV ontworpen oogt maar recruiters niet snel zien waar je relevant bent, dan verliest het ontwerp zijn functie.",
  },
];

const designPrinciples = [
  {
    title: "Rust",
    body: "Witruimte en logische groepering maken een CV direct professioneler dan extra grafische elementen dat doen.",
  },
  {
    title: "Richting",
    body: "Een ontwerp moet de lezer vanzelf sturen van naam naar titel, profiel en recente ervaring.",
  },
  {
    title: "Consistentie",
    body: "Als koppen, afstanden en accenten overal anders voelen, oogt een CV minder sterk dan je bedoelt.",
  },
  {
    title: "Passende stijl",
    body: "Creatieve energie, zakelijke rust of elegante verfijning zijn allemaal bruikbaar, zolang ze bij de rol passen.",
  },
];

const faqs = [
  {
    question: "Wat betekent cv ontwerpen precies?",
    answer:
      "CV ontwerpen gaat over de visuele opbouw van je document: layout, hiërarchie, witruimte, stijl en de manier waarop je inhoud gepresenteerd wordt.",
  },
  {
    question: "Moet ik zelf een cv ontwerpen of beter een template gebruiken?",
    answer:
      "Voor de meeste sollicitanten is een sterke template slimmer. Daarmee krijg je een ontworpen resultaat zonder de risico's van zelf vanaf nul bouwen.",
  },
  {
    question: "Welke templates zijn goed voor cv ontwerpen?",
    answer:
      "Modern, Elegant en Remarkable zijn goede keuzes als ontwerp en uitstraling een belangrijk deel van je besluit zijn.",
  },
  {
    question: "Kan een ontworpen cv nog steeds ATS-vriendelijk zijn?",
    answer:
      "Ja, zolang de structuur helder blijft en standaardsecties goed leesbaar zijn. Een ontworpen CV hoeft niet automatisch ATS-onveilig te zijn.",
  },
];

export const metadata: Metadata = {
  title: "CV Ontwerpen - Stijl, Hiërarchie en Layout die Werken | WerkCV",
  description:
    "CV ontwerpen zonder rommelig resultaat. Kies een template met sterke hiërarchie, passende stijl en rustige layout voor een verzorgd ontwerp.",
  keywords: [
    "cv ontwerpen",
    "curriculum vitae ontwerpen",
    "cv design",
    "cv layout ontwerpen",
    "cv vormgeven",
    "cv stijl kiezen",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-ontwerpen",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-ontwerpen",
      "x-default": "https://werkcv.nl/cv-ontwerpen",
    },
  },
};

export default function CvOntwerpenPage() {
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
        name: "CV ontwerpen",
        item: "https://werkcv.nl/cv-ontwerpen",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "CV ontwerpen in 5 stappen",
    description:
      "Praktische ontwerpworkflow voor een CV dat stijlvol, leesbaar en functiegericht blijft.",
    totalTime: "PT25M",
    step: designWorkflow.map((step) => ({
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
            href="/templates"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Bekijk templates
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Ontwerp-intentie
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV ontwerpen met een layout die stijl en leesbaarheid in balans houdt
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              CV ontwerpen is meer dan iets moois kiezen. Het gaat om de juiste
              hiërarchie, passende stijl en een layout die je inhoud laat winnen.
              Deze pagina helpt je om designkeuzes functioneel te maken in plaats
              van decoratief.
            </p>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-600">
              Deze route gaat specifiek over layout, hiërarchie en stijlkeuzes.
              Zoek je eerst het brede stappenplan voor inhoud, vacaturematch en
              ATS-structuur? Gebruik dan de{" "}
              <Link
                href="/cv-maken"
                className="font-black text-black underline decoration-2 underline-offset-4"
              >
                hoofdgids CV maken
              </Link>
              .
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/templates"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Kies je ontwerp
              </Link>
              <Link
                href="/editor"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Start in editor
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">
              Ontwerpprincipes die je CV sterker maken
            </h2>
            <div className="mt-5 space-y-4">
              {designPrinciples.map((item) => (
                <div key={item.title}>
                  <p className="text-sm font-black text-black">{item.title}</p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Ontwerpworkflow
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Zo ontwerp je een CV dat er niet alleen goed uitziet, maar ook werkt
          </h2>
          <div className="mt-6 space-y-4">
            {designWorkflow.map((step, index) => (
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

        <section className="mb-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                Ontwerprichtingen
              </p>
              <h2 className="text-3xl font-black text-black">
                Templates die designkeuzes al voor een groot deel oplossen
              </h2>
            </div>
            <Link
              href="/templates"
              className="text-sm font-black text-black underline decoration-2 underline-offset-4"
            >
              Bekijk alle templates
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {featuredTemplates.map((template) => (
              <div
                key={template.id}
                className="flex h-full flex-col border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  {template.nameDutch}
                </p>
                <h3 className="mt-2 text-xl font-black text-black">
                  {template.name}
                </h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                  {template.description}
                </p>
                <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
                  {templateUseCases[template.id]}
                </p>
                <div className="mt-auto pt-5">
                  <Link
                    href="/editor"
                    className="inline-block border-2 border-black bg-yellow-400 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-black"
                  >
                    Start nu
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              href: "/mooie-cv-maken",
              title: "Mooie CV maken",
              body: "Gebruik deze route als je vooral een verzorgde uitstraling zoekt zonder diep in ontwerpprincipes te duiken.",
            },
            {
              href: "/modern-cv-voorbeeld",
              title: "Modern CV voorbeeld",
              body: "Bekijk hoe een hedendaags ontwerp eruitziet wanneer inhoud en layout goed samenwerken.",
            },
            {
              href: "/cv-opmaken",
              title: "CV opmaken",
              body: "Werk daarna aan witruimte, sectievolgorde en de eindafwerking van je gekozen ontwerp.",
            },
            {
              href: "/professioneel-cv-maken",
              title: "CV maken",
              body: "Ga daarna naar de brede hoofdgids als je naast design ook inhoud, ATS en vacaturematch wilt aanscherpen.",
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
            Goed CV-ontwerp kiest niet voor meer effecten, maar voor meer richting
          </h2>
          <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-slate-200">
            Als de lezer vanzelf begrijpt waar je sterk in bent en waar hij moet
            kijken, doet het ontwerp zijn werk. Dat is waardevoller dan losse
            visuele flair zonder duidelijke functie.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/templates"
              className="border-4 border-white bg-yellow-400 px-5 py-3 text-base font-black text-black"
            >
              Bekijk ontwerptemplates
            </Link>
            <Link
              href="/editor"
              className="border-4 border-white bg-transparent px-5 py-3 text-base font-black text-white"
            >
              Open editor
            </Link>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-black text-black">
            Veelgestelde vragen over CV ontwerpen
          </h2>
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
