import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";
import { getTemplateConfig } from "@/lib/templates/registry";

const professionalTemplate = getTemplateConfig("professional");
const atsTemplate = getTemplateConfig("ats");
const modernTemplate = getTemplateConfig("modern");

const recruiterSignals = [
  "Aantoonbare regie op planning, facilitaire processen en dagelijkse operatie.",
  "Meetbare procesverbetering in doorlooptijd, kosten of interne servicekwaliteit.",
  "Sterke stakeholdercoördinatie met management, leveranciers en interne teams.",
  "Rust en structuur onder druk: meerdere prioriteiten tegelijk betrouwbaar uitvoeren.",
];

const templateCards = [
  {
    label: "Beste allround keuze",
    name: professionalTemplate.nameDutch,
    body: "Zakelijke, rustige layout die past bij office operations, coördinatie en managementsupport.",
    fit: "Past goed bij: office manager, operations support, executive office roles.",
  },
  {
    label: "Voor maximale ATS-veiligheid",
    name: atsTemplate.nameDutch,
    body: "Heldere opbouw voor functies bij grotere organisaties met strikte ATS-selectie.",
    fit: "Past goed bij: corporate officefuncties en rolwissels via vacaturesites.",
  },
  {
    label: "Voor moderne scale-ups",
    name: modernTemplate.nameDutch,
    body: "Moderne uitstraling voor office managers in dynamische teams met veel cross-functionele samenwerking.",
    fit: "Past goed bij: scale-up operations en hybride teams.",
  },
];

const profileExamples = [
  {
    title: "Office manager (allround)",
    text: "Resultaatgerichte office manager met 6 jaar ervaring in planning, facilitaire coördinatie en teamondersteuning. Ik verbeterde interne serviceprocessen door duidelijke intake en prioritering, waardoor doorlooptijden daalden. Ik breng structuur, overzicht en voorspelbaarheid in teams met hoge operationele druk.",
  },
  {
    title: "Office manager in scale-up omgeving",
    text: "Proactieve office manager met ervaring in snelle groeifases, onboarding en leveranciersmanagement. Ik richtte een gestandaardiseerde onboardingflow in waardoor nieuwe collega&apos;s sneller operationeel waren. Ik combineer hands-on uitvoering met procesverbetering en heldere communicatie naar alle stakeholders.",
  },
  {
    title: "Executive office support",
    text: "Discreet en nauwkeurig office professional met sterke ervaring in complex agendabeheer, vergaderstructuur en directie-ondersteuning. Ik optimaliseerde overleg- en opvolgroutines waardoor besluitvorming sneller en consistenter werd opgevolgd. Ik bewaak prioriteiten en zorg voor rust in de dagelijkse operatie.",
  },
  {
    title: "Starter / carrièreswitch naar office management",
    text: "Organisatiegerichte professional met ervaring in administratie, planning en klantgerichte ondersteuning. In eerdere rollen verbeterde ik structuur in actiebeheer en communicatie, wat leidde tot minder ad-hoc werkdruk. Ik zoek een office manager rol waarin ik coördinatiekracht en eigenaarschap verder inzet.",
  },
];

const impactBullets = [
  "Onboardingproces opnieuw ingericht waardoor nieuwe medewerkers binnen 48 uur operationeel waren.",
  "Leveranciersafspraken geoptimaliseerd met structurele kostenbesparing op office-uitgaven.",
  "Interne serviceverzoeken gestroomlijnd met kortere doorlooptijd door prioriteringsregels.",
  "Agendabeheer verbeterd met minder dubbele boekingen en betere vergaderopvolging.",
  "Facilitaire meldingen centraal gemaakt, waardoor issues sneller werden opgepakt en afgerond.",
  "Document- en contractbeheer geordend met heldere eigenaarschap- en reviewmomenten.",
  "Maandelijkse operationele rapportage opgezet voor management met duidelijke actiepunten.",
  "Samenwerking tussen teams verbeterd door vaste communicatiecadans en actie-overzichten.",
];

const hardSkills = [
  "Office operations en procescoördinatie",
  "Planning, agenda en vergaderbeheer",
  "Leveranciers- en contractbeheer",
  "Budgetbewaking en kostencontrole",
  "Facilitair beheer en serviceafhandeling",
  "Office tooling (Office 365, Teams, SharePoint)",
];

const softSkills = [
  "Prioriteren onder druk",
  "Nauwkeurigheid en opvolging",
  "Stakeholdermanagement",
  "Duidelijke schriftelijke communicatie",
  "Discretie en betrouwbaarheid",
  "Proactief probleemoplossend vermogen",
];

const atsKeywords = [
  "office manager",
  "office operations",
  "planning",
  "procesoptimalisatie",
  "leveranciersmanagement",
  "budgetbewaking",
  "facilitair beheer",
  "stakeholdermanagement",
  "agendabeheer",
  "onboarding",
  "teamondersteuning",
  "operationele ondersteuning",
];

const starterPlan = [
  "Gebruik administratie-, support- of coördinatie-ervaring als bewijs van operationele regie.",
  "Laat zien hoe je structuur bracht: planning, opvolging, verbeterde doorlooptijd of minder fouten.",
  "Noem relevante tooling met context, niet alleen als losse lijst.",
  "Pas functietermen aan op de vacature: office operations, facilitair, executive support of backoffice.",
];

const mistakes = [
  "Alleen taken opsommen zonder operationele impact of verbeterresultaten.",
  "Geen onderscheid maken tussen ad-hoc ondersteuning en structurele procesregie.",
  "Te brede skilllijst zonder prioriteiten die passen bij de vacature.",
  "Geen bewijs van stakeholdercoördinatie met management en leveranciers.",
];

const faqs = [
  {
    question: "Wat is het beste cv template voor office manager?",
    answer:
      "Meestal werkt een professionele of ATS-vriendelijke template het beste: rustig, overzichtelijk en sterk scanbaar. Voor scale-ups kan een moderne layout ook goed werken, zolang de inhoud strak blijft.",
  },
  {
    question: "Welke resultaten moet ik op een office manager CV noemen?",
    answer:
      "Noem resultaten rond planning, procesverbetering, kostenbeheersing, onboarding en servicekwaliteit. Recruiters willen zien dat je de operatie stabieler en efficiënter maakt.",
  },
  {
    question: "Hoe maak ik een office manager CV zonder directe titelervaring?",
    answer:
      "Gebruik ervaring uit administratie, support of coördinatierollen en vertaal die naar office management impact. Benoem concrete verbeteringen in structuur, opvolging en samenwerking.",
  },
  {
    question: "Wat is het verschil tussen office manager CV template en voorbeeld?",
    answer:
      "Een template geeft je de juiste structuur en opmaak. Een voorbeeld helpt je met inhoud en formuleringen. Gebruik beide voor een CV dat professioneel oogt en inhoudelijk overtuigt.",
  },
];

const sourceLinks = [
  {
    label: "SEO seed: cv-voorbeeld-office-manager (WerkCV data model)",
    href: "/cv-gids/cv-voorbeeld-office-manager",
  },
  {
    label: "CV voorbeeld administratief medewerker (WerkCV)",
    href: "/cv-gids/cv-voorbeeld-administratief-medewerker",
  },
  {
    label: "Indeed - Office Manager Resume Guide",
    href: "https://www.indeed.com/career-advice/resume-samples/office-manager",
  },
];

const officeTemplateIntentLinks = [
  {
    href: "/cv-aanmaken",
    label: "CV aanmaken voor office management",
    description: "Ga door naar een sollicitatieversie waarin structuur, planning en operationele regie meteen zichtbaar zijn.",
  },
  {
    href: "/gratis-cv-template",
    label: "Gratis CV template voor office rollen",
    description: "Vergelijk eerst rustige templates voordat je je office manager CV definitief maakt.",
  },
  {
    href: "/cv-maken-template",
    label: "CV maken met template",
    description: "Gebruik een vaste templateflow voor office operations in plaats van losse opmaakkeuzes.",
  },
  {
    href: "/professioneel-cv-template",
    label: "Professioneel CV template voor office teams",
    description: "Handig als betrouwbaarheid, rust en managementsupport centraal staan.",
  },
  {
    href: "/ats-cv-template",
    label: "ATS CV template voor corporate officefuncties",
    description: "Relevant voor grotere organisaties en formele vacaturesites met softwareselectie.",
  },
];

export const metadata: Metadata = {
  title: "CV Template Office Manager - Operationsgericht en Sollicitatieklaar | WerkCV.nl",
  description:
    "Gebruik het beste CV template voor office manager. Inclusief profieltekst voorbeelden, operationele KPI-bullets, skills en ATS-keywords. Start gratis in de editor.",
  keywords: [
    "cv template office manager",
    "office manager cv template",
    "cv office manager",
    "office manager cv voorbeeld",
    "cv voorbeeld office manager",
    "office management cv",
    "cv operations support",
    "office manager cv maken",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-template-office-manager",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-template-office-manager",
      "x-default": "https://werkcv.nl/cv-template-office-manager",
    },
  },
};

export default function CvTemplateOfficeManagerPage() {
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
        name: "CV Template Office Manager",
        item: "https://werkcv.nl/cv-template-office-manager",
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
              Rol-intent: office management
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV template office manager dat regie, structuur en operationele impact direct laat zien
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Office manager vacatures draaien om één kernvraag: breng jij rust in de operatie terwijl alles tegelijk loopt? Deze pagina combineert de juiste template met copy-ready profielteksten,
              impact-bullets en ATS-termen zodat je betrouwbaarheid en verbeterkracht overtuigend presenteert.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Start met office manager template
              </Link>
              <Link
                href="/cv-gids/cv-voorbeeld-office-manager"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk volledig CV voorbeeld
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Template + inhoud in één workflow",
                "Operationsgerichte KPI-voorbeelden",
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
            <h2 className="text-xl font-black text-black">Wat recruiters direct checken bij office manager CV&apos;s</h2>
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
            Welke CV template werkt het best voor office manager?
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
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <Link
              href="/professioneel-cv-template"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Vergelijk met professioneel CV template
            </Link>
            <Link
              href="/ats-cv-template"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Vergelijk met ATS CV template
            </Link>
            <Link
              href="/cv-template-administratief-medewerker"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Bekijk administratief variant
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
              Van office manager template naar de juiste CV-route
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
              Deze vervolgstappen helpen je om vanuit een office-manager template door te gaan naar de juiste aanmaak-, template- of ATS-route zonder je structuur opnieuw op te bouwen.
            </p>
            <SectionIntentLinks links={officeTemplateIntentLinks} locale="nl" />
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Copy-ready profieltekst
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Profieltekst voorbeelden voor office management
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
              Sterke operationele bullets voor je office manager CV
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
                Maak operationele bullets op maat met de werkervaring tool
              </Link>
            </div>
          </div>

          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Skills + ATS termen
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Vaardigheden en zoekwoorden die vaak terugkomen in office manager vacatures
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
              Zonder directe titelervaring
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Zo bouw je een sterk office manager CV als starter of switcher
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
              Wat uitnodigingen vaak blokkeert in office management sollicitaties
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              {mistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-2 border-black pt-4">
              <Link
                href="/cv-gids/cv-voorbeeld-office-manager"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Bekijk ook: volledig CV voorbeeld office manager
              </Link>
              <Link
                href="/sollicitatiebrief-voorbeeld-office-manager"
                className="mt-3 block text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Match je CV met: sollicitatiebrief voorbeeld office manager
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Bronnen (laatst gecontroleerd: 9 maart 2026)
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
                <span className="mt-1 block break-all">
                  {source.href.startsWith("http") ? source.href : `https://werkcv.nl${source.href}`}
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over een CV template voor office manager
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
                Klaar om je office manager CV te finaliseren?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Bouw je CV in de editor en solliciteer met meer operationele overtuigingskracht
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Start gratis met de juiste template, gebruik de voorbeelden op deze pagina en download pas als je sollicitatieversie volledig staat.
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
