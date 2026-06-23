import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { EnglishUseExampleButton } from "@/components/cv-examples/EnglishUseExampleButton";
import type { CVData } from "@/lib/cv";
import { buildEnglishMetadata } from "../metadata";

export const metadata = buildEnglishMetadata({
  title: "Software Engineer CV Example Netherlands 2026",
  description:
    "Use a realistic English software engineer CV example for the Netherlands. Includes profile, backend experience bullets, skills, language level, and a one-click editor start.",
  path: "/en/english-cv-example-software-engineer-netherlands",
  keywords: [
    "software engineer cv example netherlands",
    "english cv example software engineer netherlands",
    "developer resume netherlands",
    "backend developer cv netherlands",
    "expat software engineer cv netherlands",
  ],
});

const pageUrl = "https://werkcv.nl/en/english-cv-example-software-engineer-netherlands";
const roleSlug = "software-engineer";
const templateId = "modern";
const colorThemeId = "ocean-blue";

const softwareEngineerCV: CVData = {
  personal: {
    name: "Alex Morgan",
    title: "Backend Software Engineer",
    resumeLanguage: "en",
    email: "alex.morgan@example.com",
    phone: "+31 6 1234 5678",
    location: "Amsterdam, Netherlands",
    address: "",
    postalCode: "",
    summary:
      "Backend software engineer with 6 years of experience building Java, Spring Boot, AWS, and PostgreSQL services for payments and B2B SaaS platforms. Strong in API design, observability, incident response, and cross-functional delivery with product and operations teams. Looking for an English-speaking backend role in the Netherlands; Dutch A2 in progress.",
    birthDate: "",
    birthPlace: "",
    nationality: "",
    driversLicense: "",
    gender: "",
    maritalStatus: "",
    linkedIn: "linkedin.com/in/alexmorgan",
    github: "github.com/alexmorgan",
    website: "",
    photo: "",
  },
  experience: [
    {
      role: "Backend Software Engineer",
      company: "NorthSea Payments B.V.",
      location: "Amsterdam",
      start: "Mar 2022",
      end: "Present",
      description: "",
      highlights: [
        "Built Java and Spring Boot payment APIs used by 240+ merchant accounts, with PostgreSQL persistence and asynchronous processing through AWS SQS.",
        "Reduced incident triage time by 32% by adding structured logging, CloudWatch dashboards, alert rules, and on-call runbooks.",
        "Led the migration of legacy batch jobs to containerised AWS ECS workers, cutting average settlement processing time from 48 minutes to 17 minutes.",
        "Partnered with product, compliance, and customer support to translate recurring merchant issues into clearer API contracts and backlog priorities.",
      ],
    },
    {
      role: "Software Engineer",
      company: "CanalWorks SaaS",
      location: "Utrecht",
      start: "Jul 2019",
      end: "Feb 2022",
      description: "",
      highlights: [
        "Developed REST APIs and internal workflow tools in Node.js, TypeScript, and PostgreSQL for logistics planning customers.",
        "Improved test coverage around pricing and routing logic from 41% to 78%, reducing regression defects in monthly releases.",
        "Introduced code review checklists and lightweight architecture notes that helped a 7-person engineering team ship changes with fewer rework cycles.",
      ],
    },
  ],
  education: [
    {
      degree: "BSc Computer Science",
      school: "University of Applied Sciences",
      location: "Eindhoven",
      start: "2015",
      end: "2019",
      description: "Graduation project: event-driven order tracking service with Java, PostgreSQL, and Docker.",
    },
  ],
  skills: [
    { name: "Java", level: 5 },
    { name: "Spring Boot", level: 5 },
    { name: "TypeScript", level: 4 },
    { name: "REST APIs", level: 5 },
    { name: "PostgreSQL", level: 4 },
    { name: "AWS", level: 4 },
    { name: "Docker", level: 4 },
    { name: "Observability", level: 4 },
  ],
  languages: [
    { name: "English", level: "Fluent" },
    { name: "Dutch", level: "Basic" },
  ],
  internships: [],
  interests: [],
  properties: ["Pragmatic", "Structured", "Collaborative"],
  courses: [
    { name: "AWS Certified Developer - Associate", institution: "Amazon Web Services", year: "2024" },
    { name: "Secure API Design", institution: "OWASP training", year: "2023" },
  ],
  awards: [],
  references: [],
  sideActivities: [],
  customSections: [],
};

const experienceBullets = softwareEngineerCV.experience[0].highlights;

const scanChecks = [
  "A searchable job title: Backend Software Engineer, Software Engineer, Full Stack Developer, or Data Engineer.",
  "A focused stack: languages, frameworks, cloud, databases, testing, and observability tools that match the vacancy.",
  "Evidence of scale: users, APIs, transactions, latency, incidents, uptime, releases, or team size.",
  "Clear collaboration: product, operations, security, support, compliance, or customer-facing stakeholders.",
  "Practical Netherlands context: city or remote preference, English/Dutch language level, and work-authorisation clarity where relevant.",
];

const mistakes = [
  "Opening with a generic personal statement and making recruiters hunt for your stack.",
  "Listing every technology ever touched instead of the tools that fit the target vacancy.",
  "Using vague bullets such as responsible for backend development without systems, scope, or outcomes.",
  "Mixing Dutch and English labels in the same English CV.",
  "Leaving sponsorship or relocation constraints unclear when they affect the hiring route.",
];

const sources = [
  {
    label: "Work in NL - CV guidance",
    href: "https://www.workinnl.nl/en/employment/cv-en/default.aspx",
    note: "Official guidance that a CV should be clear, well laid out, and quick to understand.",
  },
  {
    label: "IND - 2026 income requirements",
    href: "https://ind.nl/en/required-amounts-income-requirements",
    note: "Official 2026 salary thresholds for highly skilled migrant and European Blue Card routes.",
  },
  {
    label: "Eurostat - ICT specialists",
    href: "https://ec.europa.eu/eurostat/statistics-explained/index.php?title=ICT_specialists_in_employment",
    note: "EU context for ICT specialist employment, including the Netherlands in 2025 data.",
  },
];

const faqs = [
  {
    question: "Should a software engineer CV for the Netherlands be in English?",
    answer:
      "Use English when the vacancy is written in English or the company works internationally. Keep the structure local and practical: role title, short profile, experience, education, skills, languages, and relevant certificates.",
  },
  {
    question: "Should I mention visa sponsorship or work authorisation?",
    answer:
      "Yes, if it changes the hiring route. A short line is enough. For highly skilled migrant or European Blue Card routes, always verify current IND thresholds before relying on salary assumptions.",
  },
  {
    question: "How long should a developer CV be?",
    answer:
      "Most software engineer CVs should fit one or two pages. Use the second page only when it contains relevant projects, technical depth, certifications, or recent experience that supports the vacancy.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Software Engineer CV Example Netherlands",
  description:
    "A practical English CV example for software engineers applying to roles in the Netherlands.",
  inLanguage: "en-NL",
  mainEntityOfPage: pageUrl,
  datePublished: "2026-05-14",
  dateModified: "2026-06-23",
  author: { "@type": "Organization", name: "WerkCV", url: "https://werkcv.nl" },
  publisher: { "@type": "Organization", name: "WerkCV", url: "https://werkcv.nl" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "en-NL",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function SoftwareEngineerCvExamplePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-3">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/en" },
              { label: "CV examples", href: "/en/dutch-cv-examples" },
              { label: "Software engineer CV example", href: "/en/english-cv-example-software-engineer-netherlands" },
            ]}
          />
        </div>
      </div>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
              English CV example for the Netherlands
            </p>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Software engineer CV example that opens directly in the editor
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              Start from a realistic backend software engineer CV written for Dutch-market applications. The example is already structured for an English CV: profile, measurable experience, technical skills, languages, and certificates.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <EnglishUseExampleButton templateId={templateId} colorThemeId={colorThemeId} sampleCV={softwareEngineerCV} roleSlug={roleSlug} />
              <TrackedLandingLink
                href="/en/templates?startSource=software_engineer_example_template"
                trackingLocation="software_engineer_example_hero"
                trackingLabel="templates"
                className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-50"
              >
                Choose another template
              </TrackedLandingLink>
            </div>
            <p className="mt-4 text-sm font-medium text-slate-500">
              Free to edit. Pay only if you download the finished PDF.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm">
            <div className="rounded-md bg-white p-6 shadow-sm">
              <div className="border-b-2 border-blue-700 pb-3">
                <h2 className="text-2xl font-bold text-blue-800">{softwareEngineerCV.personal.name}</h2>
                <p className="text-sm font-medium text-slate-600">{softwareEngineerCV.personal.title}</p>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-700">{softwareEngineerCV.personal.summary}</p>
              <div className="mt-5">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-blue-800">Experience</h3>
                <p className="mt-2 text-sm font-bold text-slate-900">
                  {softwareEngineerCV.experience[0].role} - {softwareEngineerCV.experience[0].company}
                </p>
                <ul className="mt-2 space-y-2 text-xs leading-5 text-slate-700">
                  {experienceBullets.slice(0, 3).map((bullet) => (
                    <li key={bullet}>- {bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-6xl px-5 py-12">
        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">What Dutch tech recruiters scan first</h2>
            <p className="mt-4 leading-7 text-slate-700">
              Work in NL explains that a CV should be clearly written and laid out so employers can quickly understand your education and work experience. For software roles, that means your stack and impact must be visible before the reader reaches page two.
            </p>
          </div>
          <div className="grid gap-3">
            {scanChecks.map((item) => (
              <div key={item} className="rounded-md border border-slate-200 bg-white p-4 text-sm font-medium leading-6 text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Copy the structure, not the wording</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Example profile summary</h2>
            </div>
            <span className="text-sm font-semibold text-slate-500">Target: backend role, Netherlands</span>
          </div>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-700">{softwareEngineerCV.personal.summary}</p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">Experience bullets that show impact</h2>
          <div className="mt-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-950">Backend Software Engineer</h3>
                <p className="font-medium text-slate-600">NorthSea Payments B.V., Amsterdam</p>
              </div>
              <p className="text-sm font-semibold text-slate-500">Mar 2022 - Present</p>
            </div>
            <ul className="mt-5 space-y-3">
              {experienceBullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-600" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-14 grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">Skills example</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {softwareEngineerCV.skills.map((skill) => (
                <span key={skill.name} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-700">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">Language and route clarity</h2>
            <p className="mt-4 leading-7 text-slate-700">
              If your application depends on work authorisation, keep it short and factual. The IND publishes current income requirements for highly skilled migrant and European Blue Card routes; salary thresholds change, so verify them before applying.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">Mistakes that reduce completion and replies</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {mistakes.map((mistake) => (
              <div key={mistake} className="rounded-md border border-slate-200 bg-white p-4 text-sm font-medium leading-6 text-slate-700 shadow-sm">
                {mistake}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-xl bg-slate-950 p-7 text-white">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Build from this example in the editor</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                The button creates a CV with this example already filled in. Replace the fictional details with your own stack, results, education, and language level.
              </p>
            </div>
            <EnglishUseExampleButton
              templateId={templateId}
              colorThemeId={colorThemeId}
              sampleCV={softwareEngineerCV}
              roleSlug={roleSlug}
              className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">FAQ</h2>
          <div className="mt-5 space-y-3">
            {faqs.map((item) => (
              <details key={item.question} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer font-bold text-slate-950">{item.question}</summary>
                <p className="mt-3 leading-7 text-slate-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">Sources checked</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">
            Last reviewed on June 23, 2026. These sources support the page guidance; the CV itself is fictional and should be adapted before use.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-emerald-300"
              >
                <span className="font-bold text-slate-950">{source.label}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-600">{source.note}</span>
              </a>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm font-bold">
            <Link href="/en/dutch-cv-examples" className="text-emerald-700 underline">
              More Netherlands CV examples
            </Link>
            <Link href="/en/ats-resume-netherlands" className="text-emerald-700 underline">
              ATS resume guide
            </Link>
            <Link href="/en/templates" className="text-emerald-700 underline">
              English CV templates
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
