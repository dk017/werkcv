import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { EnglishUseExampleButton } from "@/components/cv-examples/EnglishUseExampleButton";
import type { CVData } from "@/lib/cv";
import { buildEnglishMetadata } from "../metadata";

export const metadata = buildEnglishMetadata({
  title: "Data Engineer CV Example Netherlands 2026",
  description:
    "Use a realistic English data engineer CV example for the Netherlands. Includes data pipeline bullets, cloud skills, data quality proof, and a one-click editor start.",
  path: "/en/english-cv-example-data-engineer-netherlands",
  keywords: [
    "data engineer cv example netherlands",
    "english cv example data engineer netherlands",
    "data engineer resume netherlands",
    "etl developer cv netherlands",
    "cloud data engineer cv netherlands",
  ],
});

const pageUrl = "https://werkcv.nl/en/english-cv-example-data-engineer-netherlands";
const roleSlug = "data-engineer";
const templateId = "robust";
const colorThemeId = "modern-teal";

const dataEngineerCV: CVData = {
  personal: {
    name: "Maya Vermeer",
    title: "Data Engineer",
    resumeLanguage: "en",
    email: "maya.vermeer@example.com",
    phone: "+31 6 2345 6789",
    location: "Rotterdam, Netherlands",
    address: "",
    postalCode: "",
    summary:
      "Data engineer with 5 years of experience building reliable batch and streaming pipelines for analytics, reporting, and machine learning use cases. Strong in Python, SQL, dbt, Airflow, Spark, Kafka, AWS, and Azure. Known for improving data quality, reducing pipeline failures, and translating business reporting needs into maintainable data models.",
    birthDate: "",
    birthPlace: "",
    nationality: "",
    driversLicense: "",
    gender: "",
    maritalStatus: "",
    linkedIn: "linkedin.com/in/mayavermeer",
    github: "github.com/mayavermeer",
    website: "",
    photo: "",
  },
  experience: [
    {
      role: "Data Engineer",
      company: "Harbour Analytics B.V.",
      location: "Rotterdam",
      start: "Apr 2022",
      end: "Present",
      description: "",
      highlights: [
        "Built Airflow and Spark pipelines processing 65 million logistics events per day for warehouse, transport, and customer reporting teams.",
        "Modelled trusted finance and operations datasets in dbt, reducing duplicated dashboard definitions across 4 business units.",
        "Added Great Expectations checks and alerting for critical tables, lowering recurring data quality incidents by 38% within two quarters.",
        "Partnered with analysts, product managers, and platform engineers to move legacy SQL jobs into version-controlled, observable pipelines.",
      ],
    },
    {
      role: "Junior Data Engineer",
      company: "Canal Retail Group",
      location: "Utrecht",
      start: "Sep 2019",
      end: "Mar 2022",
      description: "",
      highlights: [
        "Migrated daily sales and inventory ETL from scheduled scripts to Azure Data Factory and SQL-based transformation jobs.",
        "Improved dashboard freshness from next-day reporting to hourly updates for store managers and supply planners.",
        "Created reusable Python validation utilities that helped analysts detect missing files, schema changes, and late-arriving source data earlier.",
      ],
    },
  ],
  education: [
    {
      degree: "MSc Data Science",
      school: "Erasmus University Rotterdam",
      location: "Rotterdam",
      start: "2017",
      end: "2019",
      description: "Focus on data engineering, machine learning, and applied analytics for business decision-making.",
    },
    {
      degree: "BSc Computer Science",
      school: "University of Applied Sciences",
      location: "The Hague",
      start: "2013",
      end: "2017",
      description: "Graduation project: data warehouse prototype for inventory and sales forecasting.",
    },
  ],
  skills: [
    { name: "Python", level: 5 },
    { name: "SQL", level: 5 },
    { name: "dbt", level: 5 },
    { name: "Airflow", level: 4 },
    { name: "Spark", level: 4 },
    { name: "Kafka", level: 4 },
    { name: "AWS", level: 4 },
    { name: "Azure Data Factory", level: 4 },
    { name: "Data quality", level: 5 },
    { name: "Terraform", level: 3 },
  ],
  languages: [
    { name: "English", level: "Fluent" },
    { name: "Dutch", level: "Good" },
  ],
  internships: [],
  interests: [],
  properties: ["Analytical", "Reliable", "Business-minded"],
  courses: [
    { name: "Databricks Certified Data Engineer Associate", institution: "Databricks", year: "2024" },
    { name: "AWS Certified Data Analytics - Specialty", institution: "Amazon Web Services", year: "2023" },
  ],
  awards: [],
  references: [],
  sideActivities: [],
  customSections: [],
};

const experienceBullets = dataEngineerCV.experience[0].highlights;

const recruiterChecks = [
  "Pipeline scope: batch, streaming, orchestration, data warehouse, lakehouse, or platform ownership.",
  "Tool fit: Python, SQL, dbt, Airflow, Spark, Kafka, cloud storage, warehouses, and CI/CD where relevant.",
  "Reliability proof: data quality checks, monitoring, alerting, incident reduction, freshness, lineage, or governance.",
  "Business context: analytics, finance, logistics, product, risk, marketing, operations, or machine learning enablement.",
  "Dutch-market clarity: English/Dutch language level, location preference, and work-authorisation details when they affect hiring.",
];

const mistakes = [
  "Writing a data engineer CV like a data analyst CV and hiding pipeline ownership.",
  "Listing tools without showing the scale, reliability, or business use case behind them.",
  "Forgetting data quality, monitoring, and governance even though they are central to production data work.",
  "Overloading the skills section with every library instead of the stack that matches the vacancy.",
  "Using Dutch section labels or proficiency values inside an otherwise English CV.",
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
    question: "What should a data engineer CV show first?",
    answer:
      "Show your target title, core stack, pipeline ownership, data quality work, and business context quickly. Recruiters should understand whether you build production data systems, not only dashboards.",
  },
  {
    question: "Should a data engineer CV include cloud certifications?",
    answer:
      "Include recent, relevant certifications when they support the vacancy. Put cloud, Databricks, dbt, or data engineering certificates below skills or education, not above your strongest work experience.",
  },
  {
    question: "Should I mention Dutch language level?",
    answer:
      "Yes. English-speaking data roles are common in international teams, but an honest Dutch level such as Basic, Good, or Fluent helps employers understand communication fit.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Data Engineer CV Example Netherlands",
  description:
    "A practical English CV example for data engineers applying to roles in the Netherlands.",
  inLanguage: "en-NL",
  mainEntityOfPage: pageUrl,
  datePublished: "2026-06-23",
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

export default function DataEngineerCvExamplePage() {
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
              { label: "Data engineer CV example", href: "/en/english-cv-example-data-engineer-netherlands" },
            ]}
          />
        </div>
      </div>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
              English CV example for data roles
            </p>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Data engineer CV example that opens directly in the editor
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              Start from a realistic data engineer CV written for applications in the Netherlands. The example focuses on pipelines, cloud platforms, data quality, and business impact instead of a loose list of tools.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <EnglishUseExampleButton templateId={templateId} colorThemeId={colorThemeId} sampleCV={dataEngineerCV} roleSlug={roleSlug} />
              <TrackedLandingLink
                href="/en/templates?startSource=data_engineer_example_template"
                trackingLocation="data_engineer_example_hero"
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
              <div className="border-b-2 border-teal-700 pb-3">
                <h2 className="text-2xl font-bold text-teal-800">{dataEngineerCV.personal.name}</h2>
                <p className="text-sm font-medium text-slate-600">{dataEngineerCV.personal.title}</p>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-700">{dataEngineerCV.personal.summary}</p>
              <div className="mt-5">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-teal-800">Experience</h3>
                <p className="mt-2 text-sm font-bold text-slate-900">
                  {dataEngineerCV.experience[0].role} - {dataEngineerCV.experience[0].company}
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
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">What data hiring teams scan first</h2>
            <p className="mt-4 leading-7 text-slate-700">
              A strong data engineer CV should make production ownership obvious. Work in NL advises clear CV structure so employers can quickly understand work experience and education; for data engineering, that means stack, data scale, reliability, and stakeholders must be visible quickly.
            </p>
          </div>
          <div className="grid gap-3">
            {recruiterChecks.map((item) => (
              <div key={item} className="rounded-md border border-slate-200 bg-white p-4 text-sm font-medium leading-6 text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">Copy the structure, not the wording</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Example profile summary</h2>
            </div>
            <span className="text-sm font-semibold text-slate-500">Target: data engineer, Netherlands</span>
          </div>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-700">{dataEngineerCV.personal.summary}</p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">Experience bullets that show production value</h2>
          <div className="mt-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-950">Data Engineer</h3>
                <p className="font-medium text-slate-600">Harbour Analytics B.V., Rotterdam</p>
              </div>
              <p className="text-sm font-semibold text-slate-500">Apr 2022 - Present</p>
            </div>
            <ul className="mt-5 space-y-3">
              {experienceBullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-teal-600" />
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
              {dataEngineerCV.skills.map((skill) => (
                <span key={skill.name} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-700">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">Work route and language clarity</h2>
            <p className="mt-4 leading-7 text-slate-700">
              Data roles in international teams often accept English CVs, but language level and work-route clarity still matter. If sponsorship affects your application, verify the current IND thresholds before applying.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">Mistakes that weaken a data engineer CV</h2>
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
              <h2 className="text-3xl font-bold tracking-tight">Build from this data engineer example</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                The button creates a CV with this example already filled in. Replace the fictional details with your own pipelines, stack, data quality work, education, and language level.
              </p>
            </div>
            <EnglishUseExampleButton
              templateId={templateId}
              colorThemeId={colorThemeId}
              sampleCV={dataEngineerCV}
              roleSlug={roleSlug}
              className="inline-flex items-center justify-center rounded-md bg-teal-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-60"
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
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-teal-300"
              >
                <span className="font-bold text-slate-950">{source.label}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-600">{source.note}</span>
              </a>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm font-bold">
            <Link href="/en/english-cv-example-software-engineer-netherlands" className="text-teal-700 underline">
              Software engineer CV example
            </Link>
            <Link href="/en/dutch-cv-examples" className="text-teal-700 underline">
              More Netherlands CV examples
            </Link>
            <Link href="/en/templates" className="text-teal-700 underline">
              English CV templates
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
