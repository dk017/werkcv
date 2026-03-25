import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";
import { getTemplateConfig } from "@/lib/templates/registry";

const modernTemplate = getTemplateConfig("modern");
const professionalTemplate = getTemplateConfig("professional");
const simpleTemplate = getTemplateConfig("simple");

const recruiterSignals = [
  "Aantoonbare omzetbijdrage met concrete targets, conversie of gemiddelde bonwaarde.",
  "Sterke klantbenadering: behoefte achterhalen, adviseren en passend afsluiten.",
  "Operationele betrouwbaarheid in kassa, voorraad, aanvulling en presentatie op de vloer.",
  "Combinatie van commercieel resultaat en servicekwaliteit bij drukte of piekmomenten.",
];

const templateCards = [
  {
    label: "Beste allround keuze",
    name: modernTemplate.nameDutch,
    body: "Moderne, energieke layout die goed werkt voor klantgerichte retail- en verkooprollen.",
    fit: "Past goed bij: verkoopmedewerker, winkelmedewerker, sales advisor.",
  },
  {
    label: "Voor zakelijke retailomgevingen",
    name: professionalTemplate.nameDutch,
    body: "Rustige, betrouwbare opmaak voor retailketens en premium stores waar nauwkeurigheid en uitstraling tellen.",
    fit: "Past goed bij: winkelteams met KPI-sturing en formele werkgevers.",
  },
  {
    label: "Voor starters en compacte CV's",
    name: simpleTemplate.nameDutch,
    body: "Duidelijke structuur die stage, bijbaan en eerste verkoopervaring snel scanbaar maakt.",
    fit: "Past goed bij: junior kandidaten en carrièreswitchers.",
  },
];

const profileExamples = [
  {
    title: "Algemeen verkoopmedewerker (medior)",
    text: "Commercieel ingestelde verkoopmedewerker met 5 jaar ervaring in retail, adviesverkoop en targetgestuurde teams. Ik verhoogde de gemiddelde bonwaarde met 14% via gerichte productcombinaties en duidelijk klantadvies. Ik combineer resultaatgericht werken met een sterke winkelervaring voor de klant.",
  },
  {
    title: "Mode retail verkoopmedewerker",
    text: "Klantgerichte verkoopmedewerker in fashion retail met ervaring in stylingadvies, voorraadrotatie en visual merchandising. Ik presteerde gemiddeld 11% boven persoonlijk maandtarget door actieve behoefteanalyse en passende upsell. Ik werk energiek, servicegericht en houd de winkelvloer commercieel sterk.",
  },
  {
    title: "Elektronica / showroom sales",
    text: "Resultaatgerichte verkoopmedewerker met 4 jaar ervaring in consumentenelektronica, productdemo's en advies op maat. Ik verlaagde retouren door heldere productuitleg en betere verwachtingsmanagement tijdens het verkoopgesprek. Ik vertaal technische productinformatie naar begrijpelijke klantwaarde.",
  },
  {
    title: "Starter / junior verkoopmedewerker",
    text: "Enthousiaste starter met bijbaanervaring in retail, kassawerk en klantcontact. Tijdens piekuren hielp ik wachttijden verlagen door duidelijke taakverdeling en snelle kassa-afhandeling. Ik zoek een verkoopfunctie waarin ik klantgerichtheid en commerciële leergierigheid verder ontwikkel.",
  },
];

const impactBullets = [
  "Gemiddeld 12% boven maandtarget gepresteerd via adviesverkoop en slimme productcombinaties.",
  "Conversie op drukke weekenduren verhoogd door heldere klantflow en prioritering op de winkelvloer.",
  "Gemiddelde bonwaarde verhoogd met gerichte cross-sell bij complementaire producten.",
  "Retourpercentage verlaagd door betere behoefteanalyse en duidelijk productadvies.",
  "Kassaproces versneld met minder correcties door strakkere controle aan het afrekenmoment.",
  "Voorraadtekorten teruggedrongen door nauwkeuriger aanvulrondes en signalering van hardlopers.",
  "Klanttevredenheid verhoogd met consequente follow-up op reserveringen en servicevragen.",
  "Nieuwe collega's ingewerkt op verkoopgesprekken, winkelstandaarden en kassaprocedures.",
];

const hardSkills = [
  "Kassasystemen en afrekenprocedures",
  "Omzetdoelen, conversie en bonwaarde-sturing",
  "Upsell en cross-sell technieken",
  "Voorraadbeheer en aanvulprocessen",
  "Visual merchandising basis",
  "Klachtenafhandeling en serviceherstel",
];

const softSkills = [
  "Commerciële gespreksvoering",
  "Actief luisteren en behoefteanalyse",
  "Overtuigingskracht zonder opdringerigheid",
  "Stressbestendigheid tijdens piekdrukte",
  "Teamgericht samenwerken op de vloer",
  "Servicegericht en representatief optreden",
];

const atsKeywords = [
  "verkoopmedewerker",
  "winkelmedewerker",
  "retail",
  "omzetdoelen",
  "upsell",
  "cross-sell",
  "conversie",
  "bonwaarde",
  "klantadvies",
  "kassawerkzaamheden",
  "voorraadbeheer",
  "visual merchandising",
];

const starterPlan = [
  "Gebruik bijbaan- of stageervaring als bewijs van klantcontact, kassawerk en teamtempo.",
  "Benoem altijd commerciële signalen, ook klein: targetbijdrage, extra verkoop of hogere service.",
  "Laat in je bullets zien hoe je een klantgesprek voert van vraag naar passend advies.",
  "Gebruik vacaturespecifieke termen zoals retail, verkoopdoelen en winkelpresentatie.",
];

const mistakes = [
  "Alleen schrijven dat je commercieel bent zonder cijfers of concrete verkoopimpact.",
  "Taken opsommen zonder klantresultaat, omzetbijdrage of verbeteractie.",
  "Geen onderscheid maken tussen servicewerk en echte verkoopresultaten.",
  "Te veel focus op opmaak en te weinig op vacaturematch met retail-termen.",
];

const faqs = [
  {
    question: "Wat is het beste cv template voor verkoopmedewerker?",
    answer:
      "Voor de meeste retailrollen werkt een modern of professioneel template het best: scanbaar, duidelijk en commercieel sterk zonder visuele ruis. Starters kunnen een eenvoudiger template kiezen met nadruk op profiel en skills.",
  },
  {
    question: "Welke cijfers moet ik op een verkoopmedewerker CV zetten?",
    answer:
      "Gebruik cijfers zoals targetrealisatie, conversie, gemiddelde bonwaarde, retourreductie of klantwaardering. Ook kleine verbeteringen maken je CV veel geloofwaardiger dan algemene claims.",
  },
  {
    question: "Hoe maak ik een verkoop CV zonder lange ervaring?",
    answer:
      "Gebruik relevante bijbaan- of stagevoorbeelden met klantcontact, kassawerk en adviesmomenten. Laat zien dat je commercieel gedrag begrijpt en verantwoordelijkheid neemt op de winkelvloer.",
  },
  {
    question: "Wat is het verschil tussen cv template en cv voorbeeld voor verkoopmedewerker?",
    answer:
      "Een template geeft structuur en opmaak. Een voorbeeld helpt je met formuleringen en inhoud. Het beste resultaat krijg je door voorbeeldtekst te vertalen naar je eigen resultaten in een sterke template.",
  },
];

const sourceLinks = [
  {
    label: "WerkCV keyword data - verkoopmedewerker cluster (update 8 maart 2026)",
    href: "/",
  },
  {
    label: "CV voorbeeld winkelmedewerker (inhoudspatroon in NL context)",
    href: "/cv-voorbeelden/horeca-en-detailhandel/winkelmedewerker",
  },
  {
    label: "Indeed Career Guide - Retail Resume Writing",
    href: "https://www.indeed.com/career-advice/resumes-cover-letters/retail-associate-resume",
  },
];

const salesTemplateIntentLinks = [
  {
    href: "/cv-aanmaken",
    label: "CV aanmaken voor verkoopfuncties",
    description: "Start direct met een sollicitatieversie waarin targets, adviesverkoop en klantcontact samenkomen.",
  },
  {
    href: "/gratis-cv-template",
    label: "Gratis CV template voor retail en sales",
    description: "Vergelijk eerst gratis layouts voordat je je verkoop-CV afmaakt.",
  },
  {
    href: "/cv-maken-template",
    label: "CV maken met template",
    description: "Gebruik een vaste templateflow om retailresultaten en commerciële impact beter te tonen.",
  },
  {
    href: "/modern-cv-template",
    label: "Modern CV template voor sales",
    description: "Handig als je energie, winkelvloerervaring en commerciële drive visueel sterk wilt neerzetten.",
  },
  {
    href: "/professioneel-cv-template",
    label: "Professioneel CV template voor commerciële teams",
    description: "Relevant voor formelere salesomgevingen en accountgerichte retailrollen.",
  },
];

export const metadata: Metadata = {
  title: "CV Template Verkoopmedewerker - Retail CV met KPI-Impact | WerkCV.nl",
  description:
    "Gebruik het beste CV template voor verkoopmedewerker. Inclusief profieltekst voorbeelden, retail KPI-bullets, skills en ATS-keywords. Start gratis in de editor.",
  keywords: [
    "cv template verkoopmedewerker",
    "cv verkoopmedewerker voorbeeld",
    "voorbeeld cv verkoopmedewerker",
    "cv voorbeeld verkoopmedewerker",
    "cv winkelmedewerker voorbeeld",
    "cv voorbeeld winkelmedewerker",
    "verkoopster cv voorbeeld",
    "retail cv template",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-template-verkoopmedewerker",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-template-verkoopmedewerker",
      "x-default": "https://werkcv.nl/cv-template-verkoopmedewerker",
    },
  },
};

export default function CvTemplateVerkoopmedewerkerPage() {
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
        name: "CV Template Verkoopmedewerker",
        item: "https://werkcv.nl/cv-template-verkoopmedewerker",
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
              Rol-intent: retail & verkoop
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV template verkoopmedewerker dat direct commerciële impact laat zien
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Voor verkoopfuncties kijken recruiters niet alleen naar klantvriendelijkheid, maar vooral naar resultaat: conversie, bonwaarde en targetbijdrage. Deze pagina combineert de juiste
              template met copy-ready profielteksten, KPI-bullets en ATS-termen zodat je sneller op gesprek komt.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Start met verkoop template
              </Link>
              <Link
                href="/cv-voorbeelden/horeca-en-detailhandel/winkelmedewerker"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk volledig CV voorbeeld
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Template + KPI-inhoud in één flow",
                "Retail ATS-keywords direct toepasbaar",
                "Gratis starten, betalen bij download",
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
            <h2 className="text-xl font-black text-black">Wat recruiters direct checken bij verkoop CV&apos;s</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {recruiterSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/tools/cv-keywords"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Check je vacaturematch met de CV keywords tool
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Template-keuze
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Welke CV template werkt het best voor verkoopmedewerker?
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {templateCards.map((card) => (
              <article
                key={card.name}
                className="flex h-full flex-col border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                  {card.label}
                </p>
                <h3 className="mt-2 text-xl font-black text-black">{card.name}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{card.body}</p>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{card.fit}</p>
                <div className="mt-auto pt-5">
                  <Link
                    href="/editor"
                    className="inline-block border-2 border-black bg-yellow-400 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-black"
                  >
                    Gebruik in editor
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            <Link
              href="/modern-cv-template"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Vergelijk met modern CV template
            </Link>
            <Link
              href="/professioneel-cv-template"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Vergelijk met professioneel CV template
            </Link>
            <Link
              href="/cv-template-klantenservice-medewerker"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Bekijk klantenservice variant
            </Link>
            <Link
              href="/cv-template-marketing-medewerker"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Bekijk marketing variant
            </Link>
            <Link
              href="/templates"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Bekijk alle templates
            </Link>
          </div>
          <div className="mt-8 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Template-intentie
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Van verkooptemplate naar commerciële sollicitatieversie
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
              Gebruik deze vervolgstappen als je vanuit retail- of verkoopintentie wilt doorpakken naar de beste template- of aanmaakroute voor commerciële functies.
            </p>
            <SectionIntentLinks links={salesTemplateIntentLinks} locale="nl" />
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Copy-ready profieltekst
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Profieltekst voorbeelden voor verkoop- en retailfuncties
          </h2>
          <div className="mt-6 space-y-5">
            {profileExamples.map((example) => (
              <article
                key={example.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{example.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{example.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/tools/profieltekst-generator"
              className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
            >
              Genereer profieltekst
            </Link>
            <Link
              href="/profieltekst-cv-voorbeelden"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Meer profieltekst voorbeelden
            </Link>
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Werkervaring bullets
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Sterke KPI-bullets voor je verkoopmedewerker CV
            </h2>
            <ul className="mt-5 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              {impactBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/tools/werkervaring-bullets"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Maak verkoop-bullets op maat met de werkervaring tool
              </Link>
            </div>
          </div>

          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Skills + ATS termen
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Vaardigheden en zoekwoorden voor retail vacatures
            </h2>
            <div className="mt-5 grid gap-4">
              <div className="border-2 border-black bg-[#FFFEF0] p-4">
                <p className="text-sm font-black text-black">Hard skills</p>
                <ul className="mt-2 space-y-1 text-sm font-medium text-slate-700">
                  {hardSkills.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="border-2 border-black bg-[#FFFEF0] p-4">
                <p className="text-sm font-black text-black">Soft skills</p>
                <ul className="mt-2 space-y-1 text-sm font-medium text-slate-700">
                  {softSkills.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                ATS keyword bank
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                {atsKeywords.join(" | ")}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Zonder ervaring
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Zo bouw je een sterk verkoopmedewerker CV als starter
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-200">
              {starterPlan.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Veelgemaakte fouten
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Wat uitnodigingen vaak blokkeert in retail-sollicitaties
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              {mistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-2 border-black pt-4">
              <Link
                href="/cv-voorbeelden/horeca-en-detailhandel/winkelmedewerker"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Bekijk ook: volledig CV voorbeeld winkelmedewerker
              </Link>
              <Link
                href="/sollicitatiebrief-voorbeeld-verkoopmedewerker"
                className="mt-3 block text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Match je CV met: sollicitatiebrief voorbeeld verkoopmedewerker
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Bronnen (laatst gecontroleerd: 8 maart 2026)
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Bronnen en inspiratie achter deze pagina
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
                <span className="mt-1 block break-all">{source.href.startsWith("http") ? source.href : `https://werkcv.nl${source.href}`}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over een CV template voor verkoopmedewerker
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
                Klaar om je verkoop CV af te ronden?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Bouw je CV in de editor en solliciteer met meetbare retail-impact
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Start gratis met het juiste template, pas de KPI-voorbeelden aan op jouw winkelervaring en download pas als je sollicitatieversie staat.
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
                href="/prijzen"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Bekijk prijzen
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
