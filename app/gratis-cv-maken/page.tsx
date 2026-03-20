import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const featuredTemplates = templateList.filter((template) =>
  ["professional", "ats", "simple", "modern"].includes(template.id),
);

const templateUseCases: Record<string, string> = {
  professional:
    "Sterke basis voor administratie, finance en zakelijke functies waar rust en betrouwbaarheid tellen.",
  ats: "Handig als je vooral wilt scoren op duidelijke structuur en ATS-leesbaarheid.",
  simple:
    "Praktisch voor starters, snelle sollicitaties en iedereen die zonder visuele ruis wil beginnen.",
  modern:
    "Geschikt voor marketing, sales en tech als je CV net wat frisser mag ogen zonder onrustig te worden.",
};

const freeSteps = [
  {
    title: "1) Start gratis met een template dat bij je doelrol past",
    body: "Open de editor, kies een rustige template en begin daarna met de inhoud. Zo voorkom je dat je tijd verliest aan opmaak voordat je verhaal staat.",
  },
  {
    title: "2) Vul eerst je kerngegevens en functietitel in",
    body: "Naam, contactgegevens, woonplaats en een duidelijke functietitel vormen de basis. Recruiters moeten in seconden zien op welke rol je mikt.",
  },
  {
    title: "3) Schrijf profieltekst en werkervaring vacaturegericht",
    body: "Gebruik woorden uit de vacature en zet je ervaring neer in korte, resultaatgerichte bullets. Daarmee maak je van gratis starten ook echt een serieuze sollicitatieversie.",
  },
  {
    title: "4) Vergelijk templates terwijl je inhoud al staat",
    body: "Omdat je gratis kunt bewerken, zie je meteen welke layout jouw inhoud het best laat uitkomen. Pas daarna maak je de definitieve keuze.",
  },
  {
    title: "5) Download alleen als je tevreden bent",
    body: "WerkCV laat je gratis bouwen en vergelijken. De eenmalige betaling zit alleen op de uiteindelijke PDF-download, niet op het schrijven zelf.",
  },
];

const freeChecklist = [
  "Gratis starten in de editor",
  "Template vergelijken zonder direct te betalen",
  "Inhoud bewerken en aanscherpen per vacature",
  "Rustige, ATS-vriendelijke layouts kiezen",
  "Pas afrekenen wanneer je je PDF echt wilt downloaden",
];

const pricingCards = [
  {
    title: "Gratis",
    body: "CV aanmaken, inhoud invullen, templates vergelijken en je versie verbeteren tot hij sollicitatieklaar is.",
  },
  {
    title: "Eenmalig €4,99",
    body: "Definitieve PDF-download zonder terugkerend abonnement of verborgen verlenging.",
  },
  {
    title: "Geen abonnementsval",
    body: "Je hoeft niet eerst een duur plan te starten om te testen of de editor en templates voor jou werken.",
  },
];

const mistakes = [
  {
    title: "Fout: gratis CV maken verwarren met direct gratis PDF downloaden",
    fix: "Fix: positioneer duidelijk dat je gratis kunt bouwen en vergelijken, en dat de eenmalige betaling pas op de download zit.",
  },
  {
    title: "Fout: blind kiezen voor een 'gratis' tool met later abonnement",
    fix: "Fix: stuur bezoekers bewust naar de prijsuitleg zodat het verschil met abonnementsmodellen meteen helder is.",
  },
  {
    title: "Fout: gratis starten maar je tekst niet aanpassen per vacature",
    fix: "Fix: gebruik het gratis deel juist om meerdere inhoudsvarianten te bouwen voordat je de definitieve PDF downloadt.",
  },
];

const faqs = [
  {
    question: "Kan ik echt gratis een CV maken op WerkCV?",
    answer:
      "Ja. Je kunt gratis starten, je CV opbouwen, bewerken en templates vergelijken. De betaling volgt alleen wanneer je je definitieve PDF wilt downloaden.",
  },
  {
    question: "Is gratis cv maken hetzelfde als gratis cv template gebruiken?",
    answer:
      "Bij WerkCV wel ongeveer: je gebruikt de templates gratis in de editor en beslist pas later of je wilt downloaden. Daardoor kun je eerst de inhoud en layout testen.",
  },
  {
    question: "Waarom betaal ik pas bij download?",
    answer:
      "Dat model verlaagt de drempel om te starten en voorkomt dat je vooraf betaalt zonder te weten of de template en editor voor jouw sollicitatie werken.",
  },
  {
    question: "Kan ik mijn gratis CV later opnieuw aanpassen?",
    answer:
      "Ja. Je kunt teruggaan naar je CV, teksten aanpassen en pas afrekenen zodra de versie klaar is voor verzending.",
  },
  {
    question: "Welke template werkt het beste als ik gratis begin?",
    answer:
      "Voor de meeste functies zijn de Professioneel-, ATS- en Simpel-templates de veiligste start. Ze houden de inhoud rustig en recruiter-proof.",
  },
];

export const metadata: Metadata = {
  title: "Gratis CV Maken - Start Gratis, Betaal Alleen Bij Download | WerkCV.nl",
  description:
    "Gratis CV maken in een professionele editor? Start gratis, vergelijk templates en betaal alleen bij PDF-download. Geen abonnement, wel een serieuze CV-builder.",
  keywords: [
    "gratis cv maken",
    "cv maken gratis",
    "maak een cv gratis",
    "cv gratis maken",
    "online cv maken gratis",
    "cv maken gratis online",
    "curriculum vitae maken gratis",
  ],
  alternates: {
    canonical: "https://werkcv.nl/gratis-cv-maken",
    languages: {
      "nl-NL": "https://werkcv.nl/gratis-cv-maken",
      "x-default": "https://werkcv.nl/gratis-cv-maken",
    },
  },
};

export default function GratisCvMakenPage() {
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
        name: "Gratis CV Maken",
        item: "https://werkcv.nl/gratis-cv-maken",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Gratis CV maken in 5 stappen",
    description:
      "Workflow om gratis te starten, je CV af te maken en pas op het einde te beslissen over de PDF-download.",
    totalTime: "PT25M",
    step: freeSteps.map((step) => ({
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
              Hoge intentie: gratis cv maken
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Gratis CV maken zonder meteen vast te zitten aan een abonnement
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Wie zoekt op gratis cv maken wil vooral laagdrempelig starten,
              meerdere templates vergelijken en pas beslissen over betaling wanneer
              de inhoud echt klaar is. WerkCV laat je precies dat doen: gratis
              bouwen, verbeteren en vergelijken, daarna eenmalig afrekenen als je
              PDF klaar is.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Begin gratis in editor
              </Link>
              <Link
                href="/prijzen"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk hoe gratis werkt
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Gratis starten en bewerken",
                `${templateList.length} templates vergelijken`,
                "Eenmalig betalen bij PDF-download",
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
            <h2 className="text-xl font-black text-black">
              Wat krijg je als je gratis start?
            </h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {freeChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/templates"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Vergelijk eerst alle CV templates
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Workflow
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Gratis CV maken in 5 praktische stappen
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {freeSteps.map((step) => (
              <article
                key={step.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-xl font-black text-black">{step.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-5 md:grid-cols-3">
          {pricingCards.map((card, index) => (
            <div
              key={card.title}
              className={`border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] ${
                index === 0 ? "bg-yellow-400" : "bg-white"
              }`}
            >
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-700">
                {card.title}
              </p>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-800">
                {card.body}
              </p>
            </div>
          ))}
        </section>

        <section className="mb-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                Template startpunten
              </p>
              <h2 className="text-3xl font-black text-black">
                Gratis starten met een template die recruiter-proof blijft
              </h2>
            </div>
            <Link
              href="/templates"
              className="text-sm font-black text-black underline decoration-2 underline-offset-4"
            >
              Bekijk alle templates
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
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
                    Start gratis
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Veelgemaakte fouten
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Waar gratis CV-pagina&apos;s vaak misgaan
            </h2>
            <div className="mt-4 space-y-3">
              {mistakes.map((item) => (
                <div key={item.title}>
                  <p className="text-sm font-bold leading-relaxed text-slate-100">
                    {item.title}
                  </p>
                  <p className="text-sm font-medium leading-relaxed text-slate-300">
                    {item.fix}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Slimme vervolgstappen
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Verdiep de gratis-intentie zonder duplicate pagina&apos;s
            </h2>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/cv-maken",
                  title: "CV maken",
                  body: "Gebruik het hoofd-stappenplan als je behalve prijs ook inhoud en schrijfkwaliteit wilt verbeteren.",
                },
                {
                  href: "/cv-aanmaken",
                  title: "CV aanmaken",
                  body: "Sterke vervolgroute voor mensen die vooral zo snel mogelijk willen starten met een eerste versie.",
                },
                {
                  href: "/curriculum-vitae-maken",
                  title: "Curriculum vitae maken",
                  body: "Formelere variant van dezelfde intentie, vooral bruikbaar voor zakelijke of formele zoekers.",
                },
                {
                  href: "/online-cv-maken",
                  title: "Online CV maken",
                  body: "Logische vervolgstap voor bezoekers die snelheid, online bewerken en meerdere versies willen.",
                },
                {
                  href: "/prijzen",
                  title: "Prijzen",
                  body: "Leg helder uit dat gratis starten losstaat van de eenmalige betaling op de uiteindelijke PDF-download.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-2 border-black bg-[#FFFEF0] p-4 transition-colors hover:bg-yellow-100"
                >
                  <p className="text-sm font-black text-black">{item.title}</p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">
                    {item.body}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over gratis CV maken
          </h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <summary className="flex cursor-pointer items-center justify-between p-4 text-left text-base font-black text-black">
                  {faq.question}
                  <span className="ml-3 text-xl transition-transform group-open:rotate-45">
                    +
                  </span>
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
                Klaar om gratis te starten?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Bouw eerst je CV af en beslis pas daarna over de download
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Gebruik de editor, vergelijk layouts en hou de drempel laag tot je
                definitieve versie echt sollicitatieklaar is.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Open editor
              </Link>
              <Link
                href="/templates"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Bekijk templates
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <Footer />
    </div>
  );
}
