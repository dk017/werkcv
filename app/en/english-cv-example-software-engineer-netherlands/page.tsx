import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { buildEnglishMetadata } from "../metadata";

export const metadata = buildEnglishMetadata({
  title: "English CV Example Software Engineer Netherlands",
  description:
    "A practical English CV example for software engineers applying in the Netherlands. Includes profile summary, experience bullets, skills, language level, and expat notes.",
  path: "/en/english-cv-example-software-engineer-netherlands",
  keywords: [
    "english cv example software engineer netherlands",
    "software engineer cv netherlands",
    "developer cv example netherlands",
    "expat software engineer cv netherlands",
    "backend developer cv netherlands",
  ],
});

const pageUrl = "https://werkcv.nl/en/english-cv-example-software-engineer-netherlands";

const sampleBullets = [
  "Built Java and Spring Boot payment APIs processing 1.8M monthly transactions across merchant accounts.",
  "Reduced incident triage time by 32% by adding structured logging, alert rules, and runbook documentation.",
  "Migrated legacy batch jobs to AWS ECS workers, cutting average processing time from 48 minutes to 17 minutes.",
  "Worked with product, compliance, and support teams to translate recurring customer issues into backlog items.",
];

const skillGroups = [
  ["Backend", "Java, Spring Boot, Node.js, REST APIs, event-driven services"],
  ["Cloud and data", "AWS, Docker, PostgreSQL, Redis, SQS, CloudWatch"],
  ["Ways of working", "Agile delivery, incident response, code review, technical documentation"],
  ["Languages", "English C1 professional, Dutch A2 in progress"],
];

const mistakes = [
  "Listing every framework ever used instead of the tools relevant to the Dutch vacancy.",
  "Using a title such as full stack ninja or software craftsman instead of a searchable role title.",
  "Hiding sponsorship needs until late in the process.",
  "Writing only responsibilities without scale, systems, users, performance, or business impact.",
];

const sources = [
  {
    label: "Work in NL - CV",
    href: "https://www.workinnl.nl/en/employment/cv-en/default.aspx",
  },
  {
    label: "Europass - Create your CV",
    href: "https://europass.europa.eu/en/create-europass-cv",
  },
  {
    label: "IND - Highly skilled migrant",
    href: "https://ind.nl/en/residence-permits/work/highly-skilled-migrant",
  },
];

const faqs = [
  {
    question: "Should a software engineer CV for the Netherlands be in English?",
    answer:
      "Use English when the vacancy is in English. Many Dutch tech roles accept English, but the CV should still use Dutch-market clarity and structure.",
  },
  {
    question: "Should I mention sponsorship on a developer CV?",
    answer:
      "Mention it briefly when it affects hiring. One clear work-route line is better than hiding it or overexplaining it.",
  },
  {
    question: "How technical should the CV be?",
    answer:
      "Technical enough to prove fit, but not a project dump. Show stack, scale, ownership, and outcomes for the target role.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "English CV Example Software Engineer Netherlands",
  description:
    "Practical English CV example for software engineers applying to jobs in the Netherlands.",
  inLanguage: "en-NL",
  mainEntityOfPage: pageUrl,
  datePublished: "2026-05-14",
  dateModified: "2026-05-14",
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
    <main className="min-h-screen bg-[#FFFEF9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="border-b-4 border-black bg-white">
        <div className="mx-auto max-w-6xl px-6 py-3">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "English hub", href: "/en" },
              { label: "Software engineer CV example", href: "/en/english-cv-example-software-engineer-netherlands" },
            ]}
          />
        </div>
      </div>

      <section className="border-b-4 border-black bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="mb-3 inline-block border-2 border-black bg-[#4ECDC4] px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-black">
            Tech CV example
          </p>
          <p className="mb-4 text-sm font-bold text-slate-600">Last reviewed May 14, 2026</p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">
            English software engineer CV example for the Netherlands
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-700">
            Dutch tech recruiters need to see your stack, seniority, business context,
            and communication fit quickly. This example shows the tone and structure
            for an English CV that still feels local to the Netherlands.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedLandingLink href="/en/templates" trackingLocation="software_engineer_cv_hero" trackingLabel="templates" className="border-4 border-black bg-black px-6 py-3 text-sm font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Use an English template
            </TrackedLandingLink>
            <TrackedLandingLink href="/en/editor" trackingLocation="software_engineer_cv_hero" trackingLabel="editor" className="border-4 border-black bg-[#4ECDC4] px-6 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Open English editor
            </TrackedLandingLink>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-6xl px-6 py-12">
        <section className="mb-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black text-slate-950">Example profile summary</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              Backend software engineer with 6 years of experience building Java,
              Spring Boot, AWS, and PostgreSQL systems for payments and merchant
              operations. Strong in API design, production incident response,
              observability, and cross-team delivery. Targeting English-speaking
              backend roles in Amsterdam, Utrecht, or remote-first Dutch teams;
              highly skilled migrant sponsorship required.
            </p>
          </div>
          <aside className="border-4 border-black bg-[#FFF7E8] p-6">
            <h2 className="text-2xl font-black text-slate-950">Why this works</h2>
            <ul className="mt-4 space-y-3 text-sm font-semibold leading-relaxed text-slate-800">
              <li>The target role is immediately clear.</li>
              <li>The stack is specific, not a generic tech list.</li>
              <li>The sponsorship need is direct but not dominant.</li>
              <li>The Netherlands location target is practical.</li>
            </ul>
          </aside>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-black text-slate-950">Example experience bullets</h2>
          <div className="mt-6 border-4 border-black bg-white p-6">
            <h3 className="font-black text-slate-950">Backend Engineer - Fintech Platform, 2021-2026</h3>
            <ul className="mt-4 space-y-3">
              {sampleBullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-slate-700">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full border border-black bg-[#4ECDC4]" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-12 bg-[#E9FFFC] p-6">
          <h2 className="text-3xl font-black text-slate-950">Skills section example</h2>
          <div className="mt-6 divide-y-2 divide-black border-4 border-black bg-white">
            {skillGroups.map(([label, value]) => (
              <div key={label} className="grid gap-3 p-4 md:grid-cols-[180px_1fr]">
                <h3 className="font-black text-slate-950">{label}</h3>
                <p className="text-slate-700">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-black text-slate-950">Mistakes to avoid</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {mistakes.map((mistake) => (
              <div key={mistake} className="border-3 border-black bg-white p-4 text-sm font-semibold text-slate-800">
                {mistake}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 border-4 border-black bg-black p-7 text-white">
          <h2 className="text-3xl font-black">Turn this example into your CV</h2>
          <p className="mt-3 max-w-3xl text-slate-200">
            Use the structure, not the exact wording. Replace the stack, scale, results,
            language level, and route details with your own proof.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <TrackedLandingLink href="/en/templates" trackingLocation="software_engineer_cv_bottom" trackingLabel="templates" className="border-4 border-white bg-[#4ECDC4] px-5 py-3 font-black text-black">
              Choose template
            </TrackedLandingLink>
            <TrackedLandingLink href="/en/editor" trackingLocation="software_engineer_cv_bottom" trackingLabel="editor" className="border-4 border-white bg-white px-5 py-3 font-black text-black">
              Open editor
            </TrackedLandingLink>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-black text-slate-950">FAQ</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((item) => (
              <details key={item.question} className="border-4 border-black bg-white p-4">
                <summary className="cursor-pointer font-black text-slate-950">{item.question}</summary>
                <p className="mt-3 leading-relaxed text-slate-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-slate-950">Sources and next routes</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {sources.map((source) => (
              <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer" className="block border-3 border-black bg-white p-4 font-bold text-slate-900">
                {source.label}
              </a>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/en/expat-cv-netherlands" className="underline font-bold">Main expat CV guide</Link>
            <Link href="/en/highly-skilled-migrant-cv-netherlands" className="underline font-bold">Highly skilled migrant CV</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
