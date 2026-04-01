import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const featuredTemplates = templateList.filter((template) =>
  ["professional", "classical", "formal", "ats"].includes(template.id),
);

const templateUseCases: Record<string, string> = {
  professional:
    "Breed inzetbaar voor zakelijke functies waar je moderne rust en duidelijkheid wilt combineren.",
  classical:
    "Past goed bij formele of traditionele sectoren waar een tijdloze, serieuze uitstraling overtuigender werkt.",
  formal:
    "Sterke keuze voor finance, overheid, juridische rollen en andere functies waar je professioneel en compact wilt overkomen.",
  ats: "Praktisch voor formele sollicitaties die ook technisch goed leesbaar moeten blijven in ATS-systemen.",
};

const structureSteps = [
  {
    title: "1) Begin met je formele basisgegevens",
    body: "Naam, woonplaats, telefoon, e-mail en een duidelijke functietitel horen bovenaan. Houd deze sectie zakelijk en overzichtelijk.",
  },
  {
    title: "2) Schrijf een korte professionele samenvatting",
    body: "Een curriculum vitae hoeft niet afstandelijk te zijn, maar wel helder. Beschrijf in enkele zinnen je ervaring, specialisatie en toegevoegde waarde.",
  },
  {
    title: "3) Orden werkervaring van recent naar ouder",
    body: "Geef per functie context en resultaat. Een formele zoekterm vraagt meestal ook om een strakke, geloofwaardige werkervaring-sectie.",
  },
  {
    title: "4) Voeg opleiding, certificaten en relevante trainingen toe",
    body: "Zeker bij formele sectoren mag deze sectie iets meer nadruk krijgen, zolang ze relevant blijft voor de rol waarop je solliciteert.",
  },
  {
    title: "5) Rond af met vaardigheden en extra onderdelen die iets toevoegen",
    body: "Noem alleen tools, talen en aanvullende secties die je verhaal sterker maken. Een curriculum vitae wint op selectie, niet op lengte.",
  },
];

const formalGuidelines = [
  "Gebruik een zakelijke functietitel direct onder je naam.",
  "Houd sectiekoppen standaard: Werkervaring, Opleiding, Vaardigheden.",
  "Schrijf resultaatgericht, maar zonder marketingtaal of overdreven claims.",
  "Kies een rustige template die past bij formele Nederlandse sollicitaties.",
  "Gebruik 'curriculum vitae' alleen waar het natuurlijk voelt; in de praktijk blijft 'CV' meestal prima.",
];

const termCards = [
  {
    title: "Curriculum vitae = CV",
    body: "De zoekintentie is formeler, maar inhoudelijk gaat het om dezelfde sollicitatiedocumenten. De structuur blijft dus hetzelfde.",
  },
  {
    title: "Handig voor formele zoekers",
    body: "Deze variant trekt bezoekers die zakelijker taalgebruik gebruiken, bijvoorbeeld in overheid, juridische of traditionele zakelijke omgevingen.",
  },
  {
    title: "Maak het niet onnodig ouderwets",
    body: "Gebruik wel professionele taal, maar blijf modern en scanbaar. Recruiters willen helderheid, niet plechtige formuleringen.",
  },
];

const mistakes = [
  {
    title: "Fout: curriculum vitae zien als een compleet ander document",
    fix: "Fix: behandel het als een formelere benaming voor een CV, met dezelfde recruiter-logica en dezelfde behoefte aan scanbaarheid.",
  },
  {
    title: "Fout: te formeel schrijven waardoor je tekst stroef wordt",
    fix: "Fix: hou je taal zakelijk, maar concreet. Resultaat en relevantie wegen zwaarder dan ouderwetse formuleringen.",
  },
  {
    title: "Fout: te veel informatie opnemen omdat 'curriculum vitae' lang klinkt",
    fix: "Fix: ook een curriculum vitae moet selectief en vacaturegericht blijven. Alles wat niet helpt, mag eruit.",
  },
];

const faqs = [
  {
    question: "Wat is het verschil tussen curriculum vitae maken en cv maken?",
    answer:
      "In de praktijk vrijwel niets. Curriculum vitae is de volledige formele term voor CV. De inhoud, structuur en recruiter-eisen blijven hetzelfde.",
  },
  {
    question: "Wanneer gebruik ik liever de term curriculum vitae?",
    answer:
      "Vooral wanneer je doelgroep formeler zoekt of wanneer je zelf een meer zakelijke term gebruikt. Op je document zelf is 'CV' meestal nog steeds prima.",
  },
  {
    question: "Welke template past het best bij een curriculum vitae?",
    answer:
      "Professioneel, Klassiek, Formeel en ATS-vriendelijk zijn hier de veiligste keuzes. Ze houden het document rustig en geloofwaardig.",
  },
  {
    question: "Kan ik ook gratis een curriculum vitae maken?",
    answer:
      "Ja. Je kunt gratis starten in de editor, je document opbouwen en pas betalen wanneer je de definitieve PDF wilt downloaden.",
  },
  {
    question: "Moet een curriculum vitae langer zijn dan een normaal CV?",
    answer:
      "Nee. Ook hier geldt dat relevantie en scanbaarheid leidend zijn. Voor de meeste sollicitaties werkt 1 pagina voor starters en 1 tot 2 pagina's voor ervaren kandidaten.",
  },
];

export const metadata: Metadata = {
  title: "Curriculum Vitae Maken - Professioneel en Zakelijk Opgebouwd | WerkCV.nl",
  description:
    "Curriculum vitae maken in een professionele editor. Gebruik een formele, recruiter-proof structuur, kies een passende template en betaal alleen bij PDF-download.",
  keywords: [
    "curriculum vitae maken",
    "curriculum vitae maken gratis",
    "curriculum vitae opstellen",
    "een curriculum vitae maken",
    "curriculum vitae gratis maken",
    "cv maken",
    "professioneel cv maken",
  ],
  alternates: {
    canonical: "https://werkcv.nl/curriculum-vitae-maken",
    languages: {
      "nl-NL": "https://werkcv.nl/curriculum-vitae-maken",
      "x-default": "https://werkcv.nl/curriculum-vitae-maken",
    },
  },
};

export default function CurriculumVitaeMakenPage() {
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
        name: "Curriculum Vitae Maken",
        item: "https://werkcv.nl/curriculum-vitae-maken",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Curriculum vitae maken in 5 stappen",
    description:
      "Formele en recruiter-proof workflow om een curriculum vitae op te bouwen zonder onnodige ballast.",
    totalTime: "PT30M",
    step: structureSteps.map((step) => ({
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
              Formele intentie: curriculum vitae maken
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Curriculum vitae maken met een rustige, professionele structuur
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Mensen die zoeken op curriculum vitae maken gebruiken vaak formeler
              taalgebruik, maar zoeken uiteindelijk hetzelfde: een geloofwaardig,
              overzichtelijk en recruiter-proof CV. Op deze pagina vertalen we die
              formele zoekintentie naar een moderne opbouw, passende templates en een
              duidelijke route naar de editor.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Maak je curriculum vitae
              </Link>
              <Link
                href="/professioneel-cv-template"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk professionele template
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Formele zoekintentie, moderne opbouw",
                "Sterk voor zakelijke rollen",
                "Betaal alleen bij PDF-download",
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
              Richtlijnen voor een formeel maar modern curriculum vitae
            </h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {formalGuidelines.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/cv-opstellen"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Lees ook: CV opstellen met de juiste volgorde
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Workflow
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Curriculum vitae maken in 5 stappen
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {structureSteps.map((step) => (
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
          {termCards.map((card, index) => (
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
                Veilige templates
              </p>
              <h2 className="text-3xl font-black text-black">
                Templates die goed werken voor curriculum vitae-intentie
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
                    Start in editor
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
              Waar formele CV-pagina&apos;s vaak doorslaan
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
              Verbind formele intentie met de juiste vervolgpagina
            </h2>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/curriculum-vitae-template",
                  title: "Curriculum vitae template",
                  body: "Gebruik deze route als je formele templatekeuze belangrijker is dan algemene schrijfbegeleiding.",
                },
                {
                  href: "/cv-maken",
                  title: "CV maken",
                  body: "De hoofdgids als je behalve formele taal ook praktische schrijfrichtlijnen en copy-ready voorbeelden wilt.",
                },
                {
                  href: "/cv-opstellen",
                  title: "CV opstellen",
                  body: "Sterke volgende stap voor bezoekers die vooral op zoek zijn naar juiste volgorde en sectie-indeling.",
                },
                {
                  href: "/gratis-cv-maken",
                  title: "Gratis CV maken",
                  body: "Voor bezoekers die tegelijk zekerheid willen over prijsmodel, gratis starten en eenmalig betalen.",
                },
                {
                  href: "/professioneel-cv-template",
                  title: "Professioneel CV template",
                  body: "Past goed bij de formele, zakelijke intentie achter curriculum vitae maken.",
                },
                {
                  href: "/cv-voorbeelden",
                  title: "CV voorbeelden",
                  body: "Gebruik echte beroepsvoorbeelden zodra je wilt zien hoe formele structuur in praktijk eruitziet.",
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
            Veelgestelde vragen over curriculum vitae maken
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
                Klaar om een formele versie op te bouwen?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Start je curriculum vitae in de editor en houd het professioneel
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Kies een rustige template, zet de juiste volgorde neer en download pas
                wanneer je document echt klaar is voor verzending.
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
