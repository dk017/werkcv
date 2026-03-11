import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getTemplateConfig } from "@/lib/templates/registry";

const modernTemplate = getTemplateConfig("modern");
const atsTemplate = getTemplateConfig("ats");
const professionalTemplate = getTemplateConfig("professional");

const recruiterSignals = [
  "Heldere stack: taal, framework, database, cloud en tooling.",
  "Projectimpact met metrics: performance, uptime, kosten of release-snelheid.",
  "Teamfit-signalen: code reviews, samenwerking, ownership en communicatie.",
  "ATS-zoektermen die exact aansluiten op de vacature (bijv. TypeScript, React, Node.js, AWS).",
];

const marketSignals = [
  {
    title: "Nederlandse ICT-arbeidsmarkt",
    body: "UWV rapporteerde in Q2 2025 ongeveer 23.000 openstaande ICT-vacatures en 553.000 werkenden in de sector.",
  },
  {
    title: "Software developer vraag (NL)",
    body: "Nationale Vacaturebank liet op 27 februari 2026 meer dan 1.100 software developer vacatures zien.",
  },
  {
    title: "Techstack-trend 2025",
    body: "Stack Overflow Developer Survey 2025 toont JavaScript, SQL, Python en TypeScript als dominante productiestacks bij professionele developers.",
  },
];

const templateCards = [
  {
    label: "Beste allround keuze",
    name: modernTemplate.nameDutch,
    body: "Strakke, actuele layout die goed past bij frontend, full-stack en productteams.",
    fit: "Past goed bij: frontend developer, full-stack developer, web developer.",
  },
  {
    label: "Voor maximale ATS-veiligheid",
    name: atsTemplate.nameDutch,
    body: "Ultrascanbare opbouw voor corporate vacatures en grote ATS-funnels.",
    fit: "Past goed bij: enterprise functies, consultancy, grote tech-werkgevers.",
  },
  {
    label: "Voor zakelijke technische rollen",
    name: professionalTemplate.nameDutch,
    body: "Rustige template met nadruk op betrouwbaarheid en inhoudelijke diepte.",
    fit: "Past goed bij: backend, platform, integratie en interne productteams.",
  },
];

const profileExamples = [
  {
    title: "Frontend developer",
    text: "Frontend developer met 4+ jaar ervaring in TypeScript, React en Next.js binnen productteams. Ik heb Core Web Vitals verbeterd waardoor laadtijden met 34% daalden en conversie op key flows steeg. Ik bouw graag schaalbare UI's die direct businessimpact leveren.",
  },
  {
    title: "Backend developer",
    text: "Backend developer met 6 jaar ervaring in Node.js, PostgreSQL en event-driven architectuur. Ik verminderde API-latency met 41% en verbeterde releasebetrouwbaarheid via geautomatiseerde tests en CI/CD. Ik focus op stabiele systemen met duidelijke eigenaarschap in productie.",
  },
  {
    title: "Full-stack developer",
    text: "Full-stack software ontwikkelaar met 5 jaar ervaring in TypeScript, React en Node.js. Ik realiseerde een migratie naar componentgedreven architectuur en verkortte implementatietijd voor nieuwe features met 30%. Ik combineer technische diepte met sterke productafstemming.",
  },
  {
    title: "Starter / junior developer",
    text: "Leergierige junior software ontwikkelaar met stage-ervaring in JavaScript, API-integraties en testautomatisering. Tijdens mijn afstudeerproject ontwikkelde ik een dashboard waarmee handmatige rapportage met 8 uur per week afnam. Ik zoek een team waar ik snel kan groeien op codekwaliteit en delivery.",
  },
];

const projectBullets = [
  "Paginalaadtijd met 38% verlaagd door code-splitting, caching en rendering-optimalisaties.",
  "Deployfrequentie verhoogd van wekelijks naar dagelijks met CI/CD en betere testdekking.",
  "Bug-rate na release met 27% verlaagd door teststrategie en strengere PR-checks.",
  "Cloudkosten verlaagd door autoscaling-aanpassingen en efficiënter resourcegebruik.",
  "API-response tijd sterk verbeterd via query-optimalisatie en indexbeheer.",
  "Monoliet gefaseerd opgesplitst in services met minder incidentimpact per release.",
  "Observability uitgebreid met logging/tracing waardoor incident-resolutie sneller werd.",
  "Technische documentatie gestandaardiseerd voor snellere onboarding van nieuwe developers.",
];

const hardSkills = [
  "TypeScript / JavaScript",
  "React / Next.js / Node.js",
  "SQL (PostgreSQL/MySQL) en NoSQL waar relevant",
  "REST/GraphQL API ontwerp",
  "Git, CI/CD, Docker",
  "Cloud (AWS/Azure/GCP) + monitoring",
  "Testing (unit/integration/e2e)",
];

const softSkills = [
  "Ownership op features en productie-impact",
  "Samenwerken in cross-functionele teams",
  "Technische keuzes helder uitleggen",
  "Code review discipline",
  "Prioriteren op businessimpact",
  "Mentoring en kennisdeling",
];

const atsKeywords = [
  "software ontwikkelaar",
  "software engineer",
  "full stack developer",
  "frontend developer",
  "backend developer",
  "TypeScript",
  "React",
  "Node.js",
  "SQL",
  "REST API",
  "CI/CD",
  "Docker",
  "AWS",
  "testautomatisering",
];

const starterPlan = [
  "Gebruik projecten en stages als bewijs van echte delivery: probleem, oplossing, resultaat.",
  "Zet je stack concreet neer met niveau en context (wat je ermee bouwde).",
  "Plaats GitHub of portfolio zichtbaar in je contactsectie.",
  "Vermijd buzzwords zonder bewijs; koppel elke skill aan een projectvoorbeeld.",
];

const mistakes = [
  "Alleen technologieën opsommen zonder impact of context.",
  "Geen metrics gebruiken bij projecten of werkervaring.",
  "Stack niet afstemmen op vacaturetermen in ATS.",
  "Te veel focus op design en te weinig op technische inhoud.",
];

const faqs = [
  {
    question: "Wat is het beste cv template voor software ontwikkelaar?",
    answer:
      "Dat hangt af van je doelrol, maar meestal werken moderne en ATS-vriendelijke templates het best. Ze houden je technische inhoud scanbaar voor recruiters en sollicitatiesoftware.",
  },
  {
    question: "Welke projecten moet ik op een developer CV zetten?",
    answer:
      "Kies projecten met aantoonbare impact: performanceverbetering, reliability, kostenreductie of snellere delivery. Beschrijf per project de context, jouw bijdrage en het resultaat.",
  },
  {
    question: "Moet ik GitHub op mijn CV zetten?",
    answer:
      "Ja, als je repositories representatief zijn voor je niveau. Voeg alleen projecten toe die leesbare code, duidelijke README en relevante stack tonen.",
  },
  {
    question: "Hoe ATS-proof maak ik een software developer CV?",
    answer:
      "Gebruik duidelijke koppen, vacature-terminologie en exacte stacktermen in profiel, skills en werkervaring. Vermijd visuele ruis en houd je opbouw consistent.",
  },
];

export const metadata: Metadata = {
  title: "CV Template Software Ontwikkelaar - ATS-proof en Sollicitatieklaar | WerkCV.nl",
  description:
    "Gebruik het beste CV template voor software ontwikkelaar. Inclusief profieltekst voorbeelden, project-bullets met metrics, stack-opbouw en ATS-keywords. Start gratis in de editor.",
  keywords: [
    "cv template software ontwikkelaar",
    "software ontwikkelaar cv template",
    "software engineer cv template",
    "developer cv template",
    "full stack developer cv",
    "frontend developer cv",
    "backend developer cv",
    "ats software developer cv",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-template-software-ontwikkelaar",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-template-software-ontwikkelaar",
      "x-default": "https://werkcv.nl/cv-template-software-ontwikkelaar",
    },
  },
};

export default function CvTemplateSoftwareOntwikkelaarPage() {
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
        name: "CV Template Software Ontwikkelaar",
        item: "https://werkcv.nl/cv-template-software-ontwikkelaar",
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
              Rol-intent: software ontwikkeling
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV template software ontwikkelaar dat je stack en impact meteen overtuigend toont
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Developer-selectie draait niet alleen om tools, maar om aantoonbare impact. Deze pagina combineert templatekeuze met copy-ready profielteksten, projectbullets en ATS-termen zodat
              je CV zowel technisch als commercieel sterk overkomt.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Start met developer template
              </Link>
              <Link
                href="/cv-voorbeelden/technologie-en-ict/software-ontwikkelaar"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk volledig developer voorbeeld
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Template + inhoud in één flow",
                "ATS keyword matching",
                "Gratis starten, later downloaden",
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
            <h2 className="text-xl font-black text-black">Wat tech recruiters direct checken</h2>
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

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Arbeidsmarktcontext 2025/2026
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Waarom software developer CV&apos;s nu nog strakker moeten zijn
          </h2>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
            De Nederlandse IT-markt blijft groot en competitief. Juist daarom maken structuur, meetbare impact en vacaturematch het verschil tussen gezien worden en afvallen.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {marketSignals.map((item) => (
              <div key={item.title} className="border-2 border-black bg-[#FFFEF0] p-4">
                <p className="text-sm font-black text-black">{item.title}</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Template-keuze
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Welke CV template werkt het best voor software ontwikkelaars?
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
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link
              href="/modern-cv-template"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Vergelijk met modern CV template
            </Link>
            <Link
              href="/ats-cv-template"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Vergelijk met ATS CV template
            </Link>
            <Link
              href="/professioneel-cv-template"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Vergelijk met professioneel CV template
            </Link>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Copy-ready profieltekst
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Profieltekst voorbeelden voor developer rollen
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
              Project- en werkervaring bullets
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Sterke developer bullets met meetbare impact
            </h2>
            <ul className="mt-5 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              {projectBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/tools/werkervaring-bullets"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Maak developer bullets op maat met de werkervaring tool
              </Link>
            </div>
          </div>

          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Skills + ATS termen
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Stack en zoektermen die in dev-vacatures terugkomen
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
              Zo bouw je een sterk software developer CV als starter
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
              Wat developers vaak laat liggen in hun CV
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              {mistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-2 border-black pt-4">
              <Link
                href="/sollicitatiebrief-voorbeeld-software-ontwikkelaar"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Match je CV met: sollicitatiebrief voorbeeld software ontwikkelaar
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over een CV template voor software ontwikkelaars
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

        <section className="mb-14 border-4 border-black bg-white p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Bronnen (laatst gecontroleerd: 8 maart 2026)
          </p>
          <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
            <p>
              <a
                href="https://www.werk.nl/arbeidsmarktinformatie/kansrijke-beroepen/ict"
                target="_blank"
                rel="noreferrer noopener"
                className="underline decoration-2 underline-offset-2 text-black"
              >
                UWV Kansrijke beroepen ICT
              </a>
            </p>
            <p>
              <a
                href="https://www.werk.nl/arbeidsmarktinformatie/sector/ict"
                target="_blank"
                rel="noreferrer noopener"
                className="underline decoration-2 underline-offset-2 text-black"
              >
                UWV arbeidsmarktinformatie ICT (Q2 2025)
              </a>
            </p>
            <p>
              <a
                href="https://www.nationalevacaturebank.nl/vacatures/functie/software-developer"
                target="_blank"
                rel="noreferrer noopener"
                className="underline decoration-2 underline-offset-2 text-black"
              >
                Nationale Vacaturebank software developer vacatures
              </a>
            </p>
            <p>
              <a
                href="https://survey.stackoverflow.co/2025/technology/"
                target="_blank"
                rel="noreferrer noopener"
                className="underline decoration-2 underline-offset-2 text-black"
              >
                Stack Overflow Developer Survey 2025 - Technology
              </a>
            </p>
            <p>
              <a
                href="https://github.blog/open-source/git/github-octoverse-2025-top-programming-languages/"
                target="_blank"
                rel="noreferrer noopener"
                className="underline decoration-2 underline-offset-2 text-black"
              >
                GitHub Octoverse 2025 - Top programming languages
              </a>
            </p>
          </div>
        </section>

        <section className="border-4 border-black bg-yellow-400 px-6 py-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
                Klaar om je developer CV te finaliseren?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Bouw je CV in de editor en solliciteer met een stack die direct duidelijk is
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Start gratis met het juiste template, voeg impact-bullets toe en download pas wanneer je sollicitatieversie volledig staat.
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
