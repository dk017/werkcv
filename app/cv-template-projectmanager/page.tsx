import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";
import { getTemplateConfig } from "@/lib/templates/registry";

const professionalTemplate = getTemplateConfig("professional");
const atsTemplate = getTemplateConfig("ats");
const modernTemplate = getTemplateConfig("modern");

const recruiterSignals = [
  "Grip op scope, planning, budget en risico in plaats van alleen taakomschrijvingen.",
  "Meetbare delivery: oplevering, blokkades, doorlooptijd, budgetafwijking of voorspelbaarheid.",
  "Sterk stakeholdermanagement met duidelijke governance en escalatieroutes.",
  "Methodiek en context die passen bij de vacature: Agile, PRINCE2, PMO, change of implementatie.",
];

const templateCards = [
  {
    label: "Beste allround keuze",
    name: professionalTemplate.nameDutch,
    body: "Rustige, zakelijke layout die goed werkt voor projectomgevingen waar governance, overzicht en senioriteit belangrijk zijn.",
    fit: "Past goed bij: projectmanager, programma-ondersteuning, delivery en implementatie.",
  },
  {
    label: "Voor maximale ATS-veiligheid",
    name: atsTemplate.nameDutch,
    body: "Heldere opbouw voor corporate functies, PMO-rollen en vacatures waar je CV vooral snel scanbaar moet zijn.",
    fit: "Past goed bij: grote organisaties, consultancy en formele selectieprocessen.",
  },
  {
    label: "Voor digitale of moderne teams",
    name: modernTemplate.nameDutch,
    body: "Modernere uitstraling voor projectmanagers in tech, scale-ups of productomgevingen met veel cross-functionele samenwerking.",
    fit: "Past goed bij: IT-projecten, verandertrajecten en hybride delivery teams.",
  },
];

const profileExamples = [
  {
    title: "Projectmanager IT / transformatie",
    text: "Projectmanager met 8+ jaar ervaring in migraties, implementaties en change-trajecten binnen IT en operations. Ik stuurde multidisciplinaire teams aan op voorspelbare delivery, verlaagde escalaties via strakkere governance en hield projecten binnen scope en budget. Ik combineer stakeholdermanagement met rustige executiekracht onder druk.",
  },
  {
    title: "Projectmanager operations / procesverbetering",
    text: "Resultaatgerichte projectmanager met ervaring in procesverbetering, vendorcoordinatie en implementaties in operationele omgevingen. Ik verkortte doorlooptijden door duidelijke besluitmomenten, scherpe risico-opvolging en heldere prioritering tussen teams. Ik breng structuur in projecten waar veel afhankelijkheden tegelijk spelen.",
  },
  {
    title: "Junior projectmanager / PMO doorgroei",
    text: "Projectcoordinator met ervaring in planning, actieregistratie en stakeholderopvolging binnen complexe trajecten. In mijn vorige rol verbeterde ik het escalatieoverzicht en de vergadervoorbereiding, waardoor teams sneller door konden in uitvoering. Ik zoek een projectmanagerrol waarin ik meer eigenaarschap neem op delivery en besluitvorming.",
  },
  {
    title: "Freelance / interim projectmanager",
    text: "Freelance projectmanager gespecialiseerd in implementatie- en verandertrajecten bij middelgrote organisaties. Ik structureer scope, governance en opleverritme zodat projecten voorspelbaar blijven voor management en uitvoering. Ik werk pragmatisch, scherp op risico's en met focus op tastbare projectresultaten.",
  },
];

const impactBullets = [
  "Migratieprogramma van EUR 2,4M geleid met oplevering binnen scope en 5% onder budget.",
  "Escalatie- en besluitritme ingericht waardoor blokkades gemiddeld 40% sneller werden opgelost.",
  "Afhankelijkheden over 6 teams gecoordineerd en vertraging op het kritieke pad met 3 weken teruggebracht.",
  "Projectboard voorzien van duidelijke risico- en voortgangsrapportage, waardoor besluitvorming voorspelbaarder werd.",
  "Implementatietraject opgesplitst in beheersbare releases met minder herstelwerk na livegang.",
  "Vendorafspraken aangescherpt waardoor doorlooptijd en handoverkwaliteit zichtbaar verbeterden.",
  "Scope creep teruggedrongen door heldere change-afspraken en prioritering per workstream.",
  "Projectdocumentatie en actielijst gestandaardiseerd waardoor overdracht tussen teams soepeler verliep.",
];

const hardSkills = [
  "Projectplanning en roadmapsturing",
  "Budgetbewaking en voortgangsrapportage",
  "Risico-, issue- en dependencymanagement",
  "Stakeholdermanagement en governance",
  "Agile, Scrum, PRINCE2 of hybride projectaanpak",
  "Vendorcoordinatie en change management",
];

const softSkills = [
  "Rust houden onder druk",
  "Duidelijk beslissen en prioriteren",
  "Escalaties professioneel begeleiden",
  "Complexiteit vertalen naar heldere acties",
  "Teams op oplevering laten samenwerken",
  "Eigenaarschap nemen zonder ruis",
];

const atsKeywords = [
  "projectmanager",
  "projectleider",
  "stakeholdermanagement",
  "planning",
  "budgetbewaking",
  "risicoanalyse",
  "governance",
  "PMO",
  "Agile",
  "PRINCE2",
  "change management",
  "implementatie",
  "migratie",
];

const starterPlan = [
  "Gebruik coordinator-, PMO- of teamleadervaring als bewijs van projectregie in wording.",
  "Laat zien dat jij acties, afhankelijkheden en besluitvorming al beter organiseerde dan voorheen.",
  "Noem methodieken en tooling alleen als je ze praktisch hebt toegepast in planning of opvolging.",
  "Vertaal supporttaken naar projectimpact: minder blokkades, scherpere governance of betere voortgangsinformatie.",
];

const mistakes = [
  "Taken opsommen zonder resultaat op planning, budget, risico of delivery.",
  "Alleen methodieken noemen zonder te laten zien hoe je ze in de praktijk gebruikte.",
  "Geen projectomvang benoemen: teamgrootte, budget, duur of complexiteit blijven dan onzichtbaar.",
  "Vage claims over leiderschap zonder voorbeelden van besluitvorming, escalaties of stakeholderafstemming.",
];

const faqs = [
  {
    question: "Wat is het beste cv template voor projectmanager?",
    answer:
      "Voor de meeste projectmanager vacatures werkt een professionele of ATS-vriendelijke template het best: rustig, scanbaar en sterk op structuur. Een modernere template kan goed werken in digitale of scale-up omgevingen, zolang de inhoud strak en evidence-based blijft.",
  },
  {
    question: "Welke resultaten moet ik op een projectmanager CV noemen?",
    answer:
      "Gebruik resultaten rond oplevering, budget, doorlooptijd, risicoverlaging, stakeholderalignment en voorspelbaarheid van delivery. Recruiters willen zien wat er beter liep door jouw projectsturing.",
  },
  {
    question: "Hoe maak ik een projectmanager CV zonder jarenlange titelervaring?",
    answer:
      "Gebruik ervaring uit projectcoordinatie, PMO, operations of teamlead-rollen en vertaal die naar projectimpact. Benoem waar jij planning, governance, actielijsten, escalaties of besluitvorming al beter maakte.",
  },
  {
    question: "Wat is het verschil tussen een projectmanager CV template en een projectmanager CV voorbeeld?",
    answer:
      "Een template geeft je de juiste opmaak en structuur. Een voorbeeld helpt je met formuleringen, KPI-bullets en profielteksten. Het sterkste resultaat krijg je door je eigen projectresultaten in een rustige template te zetten.",
  },
];

const sourceLinks = [
  {
    label: "CV voorbeeld projectmanager (WerkCV)",
    href: "/cv-gids/cv-voorbeeld-projectmanager",
  },
  {
    label: "CV voorbeeld ICT projectleider (WerkCV)",
    href: "/cv-voorbeelden/technologie-en-ict/ict-projectleider",
  },
  {
    label: "CV voorbeeld projectleider bouw (WerkCV)",
    href: "/cv-voorbeelden/bouw-en-techniek/projectleider-bouw",
  },
  {
    label: "Werkervaring op je CV beschrijven (WerkCV)",
    href: "/cv-tips/cv-werkervaring-beschrijven",
  },
];

const projectTemplateIntentLinks = [
  {
    href: "/cv-aanmaken",
    label: "CV aanmaken voor projectfuncties",
    description: "Ga direct door naar een sollicitatieversie waarin delivery, governance en projectimpact centraal staan.",
  },
  {
    href: "/gratis-cv-template",
    label: "Gratis CV template voor projectrollen",
    description: "Vergelijk eerst rustige templates voordat je je projectmanager CV definitief maakt.",
  },
  {
    href: "/cv-maken-template",
    label: "CV maken met template",
    description: "Gebruik een vaste templateflow om projectomvang, stakeholderwerk en KPI-bullets beter te structureren.",
  },
  {
    href: "/professioneel-cv-template",
    label: "Professioneel CV template voor projectmanagement",
    description: "Handig als je een zakelijke, managementvriendelijke layout wilt zonder onrustige opmaak.",
  },
  {
    href: "/ats-cv-template",
    label: "ATS CV template voor corporate projectrollen",
    description: "Relevant voor consultancy, corporate delivery en vacatures met strakke ATS-selectie.",
  },
];

export const metadata: Metadata = {
  title: "CV Template Projectmanager - Delivery, Governance en ATS-Fit | WerkCV",
  description:
    "Gebruik het beste CV template voor projectmanager. Inclusief profieltekst voorbeelden, project KPI-bullets, skills en ATS-keywords. Start gratis in de editor.",
  keywords: [
    "cv template projectmanager",
    "projectmanager cv template",
    "cv projectmanager",
    "cv voorbeeld projectmanager",
    "projectmanager cv voorbeeld",
    "junior projectmanager cv",
    "projectleider cv",
    "it projectmanager cv",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-template-projectmanager",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-template-projectmanager",
      "x-default": "https://werkcv.nl/cv-template-projectmanager",
    },
  },
};

export default function CvTemplateProjectmanagerPage() {
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
        name: "CV Template Projectmanager",
        item: "https://werkcv.nl/cv-template-projectmanager",
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
              Rol-intent: projectmanager
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV template projectmanager dat delivery, governance en projectimpact direct laat zien
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Projectmanager vacatures draaien om bewijs: kun jij complexe trajecten voorspelbaar sturen zonder grip te verliezen op scope, planning en stakeholders? Deze pagina combineert de juiste template met copy-ready profielteksten, impact-bullets en ATS-termen zodat je projectregie overtuigend overkomt.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Start met projectmanager template
              </Link>
              <Link
                href="/cv-gids/cv-voorbeeld-projectmanager"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk volledig CV voorbeeld
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Template + inhoud in een projectflow",
                "KPI- en governancevoorbeelden",
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
            <h2 className="text-xl font-black text-black">Wat recruiters direct checken bij projectmanager CV&apos;s</h2>
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
            Welke CV template werkt het best voor projectmanager?
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
              href="/cv-template-office-manager"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Bekijk office manager variant
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
              Van projectmanager template naar de juiste CV-route
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
              Deze vervolgstappen helpen je om vanuit een projectmanager template door te gaan naar de juiste aanmaak-, template- of ATS-route zonder je structuur opnieuw te moeten uitvinden.
            </p>
            <SectionIntentLinks links={projectTemplateIntentLinks} locale="nl" />
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Copy-ready profieltekst
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Profieltekst voorbeelden voor projectmanagement
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
              Sterke bullets voor een projectmanager CV
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
                Maak projectbullets op maat met de werkervaring tool
              </Link>
            </div>
          </div>

          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Skills + ATS termen
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Vaardigheden en zoekwoorden die vaak terugkomen in projectmanager vacatures
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
              Zonder volledige titelervaring
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Zo bouw je een sterk projectmanager CV als junior of doorgroeier
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
              Wat uitnodigingen vaak blokkeert in projectmanagement sollicitaties
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              {mistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-2 border-black pt-4">
              <Link
                href="/cv-gids/cv-voorbeeld-projectmanager"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Bekijk ook: volledig CV voorbeeld projectmanager
              </Link>
              <Link
                href="/sollicitatiebrief-voorbeeld-projectmanager"
                className="mt-3 block text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Match je CV met: sollicitatiebrief voorbeeld projectmanager
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Bronnen (laatst gecontroleerd: 21 april 2026)
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
            Veelgestelde vragen over een CV template voor projectmanager
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
                Klaar om je projectmanager CV te finaliseren?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Bouw je CV in de editor en solliciteer met meer delivery- en governancekracht
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Gebruik deze template als basis, voeg je sterkste projectbewijzen toe en werk daarna vacaturegericht af in de editor.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Open CV editor
              </Link>
              <Link
                href="/sollicitatiebrief-voorbeeld-projectmanager"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Bekijk projectmanager brief
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
