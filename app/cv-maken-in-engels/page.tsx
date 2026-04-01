import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const featuredTemplates = templateList.filter((template) =>
  ["professional", "ats", "simple", "modern"].includes(template.id),
);

const whenEnglishCv = [
  "Je solliciteert bij een internationale werkgever of Engelstalig team.",
  "De vacature en functietitel zijn volledig in het Engels.",
  "Je werkt in een context met internationale stakeholders.",
  "De recruiter vraagt expliciet om een English resume/CV.",
];

const workflowSteps = [
  {
    title: "1) Start met de juiste Engelse functietitel",
    body: "Gebruik de titel uit de vacature. Geen letterlijke vertaling van je Nederlandse functienaam als die niet gangbaar is.",
  },
  {
    title: "2) Schrijf een korte professional summary",
    body: "Gebruik 3 tot 4 zinnen met focus op ervaring, specialisatie en impact. Houd toon direct en resultaatgericht.",
  },
  {
    title: "3) Beschrijf work experience met impact bullets",
    body: "Per functie 3 tot 6 bullets: action + context + result. Gebruik actieve werkwoorden zoals improved, delivered, led, reduced.",
  },
  {
    title: "4) Selecteer skills die aansluiten op de vacature",
    body: "Combineer technical skills en soft skills, maar alleen als je ze kunt onderbouwen in je ervaring of projecten.",
  },
  {
    title: "5) Pas layout en taal aan op internationale lezer",
    body: "Gebruik duidelijke sectietitels, korte zinnen en consistente datums. Vermijd lokale afkortingen zonder uitleg.",
  },
  {
    title: "6) Match je English CV met een English cover letter",
    body: "Laat terminologie en tone of voice overeenkomen tussen CV en brief voor een consistente sollicitatie.",
  },
];

const languageMistakes = [
  {
    title: "Letterlijke vertaling van profieltekst",
    wrong: "I am a driven and eager employee.",
    better:
      "Results-driven operations professional with 5 years of experience improving process efficiency and service quality.",
  },
  {
    title: "Taken zonder resultaat",
    wrong: "Responsible for customer service and administration.",
    better:
      "Handled 45+ customer cases daily and improved case resolution speed by 17% through a clearer escalation process.",
  },
  {
    title: "Vage skills zonder context",
    wrong: "Good communication and teamwork.",
    better:
      "Collaborated with sales, support, and operations teams to reduce onboarding delays by 22%.",
  },
];

const summaryExamples = [
  {
    title: "Summary example (operations)",
    text: "Operations professional with 6 years of experience in process optimization, planning, and cross-team coordination. Reduced workflow delays by 24% by redesigning internal handover procedures. Strong in data-driven decision-making and stakeholder communication.",
  },
  {
    title: "Summary example (starter)",
    text: "Motivated graduate with internship experience in customer support, reporting, and project coordination. Built a weekly action dashboard that improved follow-up consistency across the team. Eager to contribute in a junior role with high ownership and learning speed.",
  },
  {
    title: "Summary example (software)",
    text: "Full-stack developer with 5 years of experience building TypeScript and Node.js products. Improved release reliability and reduced deployment errors through CI/CD hardening and automated testing. Focused on scalable systems with measurable product impact.",
  },
];

const atsChecklist = [
  "Use standard headings: Summary, Experience, Education, Skills.",
  "Keep date formats consistent (e.g., Jan 2023 - Present).",
  "Use role-relevant keywords from the vacancy naturally.",
  "Avoid heavy graphics that can break parsing.",
  "Export as PDF after final review.",
];

const faqs = [
  {
    question: "Wanneer moet ik mijn CV in het Engels maken?",
    answer:
      "Als de vacature Engelstalig is of je solliciteert bij een internationaal team. Volg dan ook de Engelse stijl: direct, kort en resultaatgericht.",
  },
  {
    question: "Is cv maken in engels hetzelfde als vertalen?",
    answer:
      "Nee. Een goede Engelse CV vraagt vaak herschrijven in plaats van letterlijk vertalen. Focus op impacttaal en internationale terminologie.",
  },
  {
    question: "Hoe lang moet een Engels CV zijn?",
    answer:
      "Voor starters meestal 1 pagina, voor ervaren kandidaten 1 tot 2 pagina's. Relevantie en scanbaarheid blijven belangrijker dan lengte.",
  },
  {
    question: "Moet ik ook een Engelse sollicitatiebrief toevoegen?",
    answer:
      "Ja, zeker bij Engelstalige vacatures. Gebruik dezelfde termen en toon als in je CV voor een consistente sollicitatie.",
  },
  {
    question: "Welke template werkt het best voor een English CV?",
    answer:
      "In de meeste gevallen een rustige, professionele of ATS-vriendelijke template met duidelijke koppen en weinig visuele ruis.",
  },
];

const sources = [
  {
    label: "Indeed NL - CV in het Engels: opbouw en voorbeelden",
    href: "https://nl.indeed.com/carrieregids/cv-motivatiebrief/cv-in-engels",
  },
  {
    label: "Resume.io - Resume examples and English writing patterns",
    href: "https://resume.io/resume-examples",
  },
  {
    label: "Zety - Resume examples and ATS-friendly guidance",
    href: "https://zety.com/resume-examples",
  },
  {
    label: "Prospects UK - How to write a CV",
    href: "https://www.prospects.ac.uk/careers-advice/cvs-and-cover-letters/how-to-write-a-cv",
  },
];

export const metadata: Metadata = {
  title: "CV Maken in Engels - Voorbeelden, Structuur en Tips | WerkCV.nl",
  description:
    "CV maken in Engels? Gebruik een duidelijke opbouw, Engelse voorbeeldzinnen en fout-naar-goed correcties. Start direct in de editor.",
  keywords: [
    "cv maken in engels",
    "cv in engels maken",
    "engels cv maken",
    "cv engels maken",
    "cv maken engels",
    "cv in het engels maken",
    "engelse cv opstellen",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-maken-in-engels",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-maken-in-engels",
      "x-default": "https://werkcv.nl/cv-maken-in-engels",
    },
  },
};

export default function CvMakenInEngelsPage() {
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
        name: "CV Maken in Engels",
        item: "https://werkcv.nl/cv-maken-in-engels",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "CV maken in Engels in 6 stappen",
    description: "Praktische workflow voor een sterk Engelstalig CV.",
    totalTime: "PT45M",
    step: workflowSteps.map((step) => ({
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
              Taal-intentie: cv maken in engels
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV maken in Engels zonder letterlijke vertaalfouten
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Een goed Engels CV is niet je Nederlandse CV in Google Translate. Je hebt een directere toon, duidelijke impact-bullets en internationale terminologie nodig. Op deze pagina krijg je een
              complete workflow, copy-ready Engelse voorbeelden en fouten die je direct kunt corrigeren.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Maak je English CV
              </Link>
              <Link
                href="/sollicitatiebrief-in-engels"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Match met English cover letter
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "English summary + bullet examples",
                "Fout-naar-goed vertalingen",
                "Internationale sollicitatieflow",
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
            <h2 className="text-xl font-black text-black">Wanneer kies je voor een English CV?</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {whenEnglishCv.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/engels-cv-template"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Bekijk ook: Engels CV template
              </Link>
              <span className="mx-2 text-slate-400">|</span>
              <Link
                href="/engels-cv-voorbeeld"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Engels CV voorbeeld
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Workflow
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            CV in Engels maken in 6 stappen
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {workflowSteps.map((step) => (
              <article
                key={step.title}
                className="border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{step.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                Templatekeuze
              </p>
              <h2 className="text-3xl font-black text-black">
                Templates die goed werken voor English CVs
              </h2>
            </div>
            <Link href="/templates" className="text-sm font-black text-black underline decoration-2 underline-offset-4">
              Bekijk alle templates
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredTemplates.map((template) => (
              <article
                key={template.id}
                className="flex h-full flex-col border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  {template.nameDutch}
                </p>
                <h3 className="mt-2 text-xl font-black text-black">{template.name}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                  {template.description}
                </p>
                <div className="mt-auto pt-5">
                  <Link
                    href="/editor"
                    className="inline-block border-2 border-black bg-yellow-400 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-black"
                  >
                    Start in editor
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Copy-ready English
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            English summary voorbeelden voor je CV
          </h2>
          <div className="mt-6 space-y-5">
            {summaryExamples.map((example) => (
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
              Gebruik profieltekst tool
            </Link>
            <Link
              href="/tools/cv-keywords"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Check English keywords
            </Link>
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Fout naar goed
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Typische taalfouten bij CV maken in Engels
            </h2>
            <div className="mt-4 space-y-4">
              {languageMistakes.map((item) => (
                <div key={item.title}>
                  <p className="text-sm font-bold text-slate-100">{item.title}</p>
                  <p className="mt-1 text-sm font-medium text-slate-300">
                    <span className="font-black">Wrong:</span> {item.wrong}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-100">
                    <span className="font-black">Better:</span> {item.better}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              ATS-check
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              ATS checklist voor je English CV
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              {atsChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-2 border-black pt-4">
              <Link
                href="/sollicitatiebrief-in-engels"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Combineer met sollicitatiebrief in Engels
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Bronnen en checkdatum
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Richtlijnen gecheckt op 8 maart 2026
          </h2>
          <div className="mt-6 space-y-3">
            {sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="block border-2 border-black bg-white p-4 text-sm font-medium text-slate-700 transition-colors hover:bg-yellow-100"
              >
                <span className="font-black text-black">{source.label}</span>
                <span className="mt-1 block break-all">{source.href}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over cv maken in engels
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
                Klaar voor internationale sollicitaties?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Bouw nu je Engelse CV en maak direct een consistente sollicitatie
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Start in de editor, gebruik de voorbeeldzinnen op deze pagina en koppel daarna een Engelse sollicitatiebrief.
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <Footer />
    </div>
  );
}
