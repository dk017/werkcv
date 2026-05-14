import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { buildEnglishMetadata } from "../metadata";

export const metadata = buildEnglishMetadata({
  title: "CV Netherlands Without Dutch Language",
  description:
    "How to write a CV for jobs in the Netherlands when you do not speak Dutch yet. Show language level honestly, target English-speaking roles, and avoid common expat mistakes.",
  path: "/en/cv-netherlands-without-dutch-language",
  keywords: [
    "cv netherlands without dutch language",
    "jobs netherlands without dutch cv",
    "english cv netherlands no dutch",
    "cv without dutch language netherlands",
    "expat cv no dutch netherlands",
  ],
});

const pageUrl = "https://werkcv.nl/en/cv-netherlands-without-dutch-language";

const decisionRules = [
  {
    title: "Target English-language vacancies first",
    body:
      "If the vacancy is written in English and the team works internationally, an English CV is normal. Still use a Dutch-market layout and direct proof.",
  },
  {
    title: "Do not pretend Dutch is irrelevant",
    body:
      "If the role involves customers, public sector, healthcare, education, logistics coordination, or local operations, Dutch may matter even when English is accepted.",
  },
  {
    title: "Show progress without overselling",
    body:
      "A clear A1, A2, or B1 statement with active learning is better than 'basic Dutch' or 'learning Dutch' with no context.",
  },
];

const examples = [
  {
    weak: "Dutch: basic",
    strong: "Dutch: A2, currently taking weekly lessons. English: C1 professional.",
  },
  {
    weak: "No Dutch yet",
    strong: "Dutch: beginner A1. Targeting English-speaking data analyst roles while studying Dutch.",
  },
  {
    weak: "Fluent in English, learning local language",
    strong: "English: C1 professional. Dutch: A2 reading and daily conversation, not yet for customer-facing writing.",
  },
];

const cvSections = [
  "Use a target role that appears in English-language Dutch vacancies.",
  "Add city, relocation status, or availability near the top.",
  "Put English and Dutch levels in a separate language section.",
  "Show tools, industries, and outcomes that are recognizable to Dutch employers.",
  "Avoid personal details that do not help with role fit.",
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
    label: "English-speaking companies in the Netherlands",
    href: "https://werkcv.nl/en/english-speaking-companies-netherlands",
  },
];

const faqs = [
  {
    question: "Can I get a job in the Netherlands without Dutch?",
    answer:
      "Yes, especially in international teams, tech, research, SaaS, logistics, finance, and support roles. But your CV should target English-speaking vacancies clearly.",
  },
  {
    question: "Should I hide that I do not speak Dutch?",
    answer:
      "No. Be honest and specific. A clear language section is better than making the recruiter guess.",
  },
  {
    question: "Should my CV be Dutch if my Dutch is weak?",
    answer:
      "Usually no. Use English for English-speaking roles. A weak Dutch CV can create more risk than a clear English CV with honest language levels.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "CV Netherlands Without Dutch Language",
  description:
    "Practical CV guidance for applying in the Netherlands without strong Dutch language skills.",
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

export default function CvNetherlandsWithoutDutchLanguagePage() {
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
              { label: "CV without Dutch", href: "/en/cv-netherlands-without-dutch-language" },
            ]}
          />
        </div>
      </div>

      <section className="border-b-4 border-black bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="mb-3 inline-block border-2 border-black bg-[#4ECDC4] px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-black">
            No Dutch yet
          </p>
          <p className="mb-4 text-sm font-bold text-slate-600">Last reviewed May 14, 2026</p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">
            CV for the Netherlands without Dutch language
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-700">
            Not speaking Dutch does not automatically block you from Dutch jobs.
            But your CV must make the target role, working language, location,
            and learning progress clear. Do not hide the language gap; frame it honestly.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedLandingLink href="/en/templates" trackingLocation="no_dutch_cv_hero" trackingLabel="templates" className="border-4 border-black bg-black px-6 py-3 text-sm font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Choose English CV template
            </TrackedLandingLink>
            <TrackedLandingLink href="/en/editor" trackingLocation="no_dutch_cv_hero" trackingLabel="editor" className="border-4 border-black bg-[#4ECDC4] px-6 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Open English editor
            </TrackedLandingLink>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-6xl px-6 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-black text-slate-950">The practical rule</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">
            Use English when the vacancy is in English and the work can realistically
            be done in English. If the job is Dutch-speaking, do not rely on a CV trick.
            Choose a better target role or be clear that your Dutch is still developing.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {decisionRules.map((rule) => (
              <div key={rule.title} className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-black text-slate-950">{rule.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{rule.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-[#E9FFFC] p-6">
          <h2 className="text-3xl font-black text-slate-950">Better language-level wording</h2>
          <div className="mt-6 overflow-hidden border-4 border-black bg-white">
            {examples.map((item) => (
              <div key={item.weak} className="grid border-b-2 border-black last:border-b-0 md:grid-cols-2">
                <div className="bg-red-50 p-4 text-sm font-semibold text-slate-800">{item.weak}</div>
                <div className="bg-green-50 p-4 text-sm font-semibold text-slate-900">{item.strong}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6">
          <h2 className="text-3xl font-black text-slate-950">What your first page should show</h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {cvSections.map((item) => (
              <li key={item} className="border-2 border-black bg-[#FFFEF9] p-4 text-sm font-bold text-slate-900">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12 border-4 border-black bg-black p-7 text-white">
          <h2 className="text-3xl font-black">Build a clear English CV for Dutch employers</h2>
          <p className="mt-3 max-w-3xl text-slate-200">
            Start with an English CV layout, use Dutch-market structure, and show your
            language level honestly. That is stronger than a translated CV that overstates Dutch ability.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <TrackedLandingLink href="/en/templates" trackingLocation="no_dutch_cv_bottom" trackingLabel="templates" className="border-4 border-white bg-[#4ECDC4] px-5 py-3 font-black text-black">
              Choose template
            </TrackedLandingLink>
            <TrackedLandingLink href="/en/editor" trackingLocation="no_dutch_cv_bottom" trackingLabel="editor" className="border-4 border-white bg-white px-5 py-3 font-black text-black">
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
            <Link href="/en/guides/netherlands-cv-without-dutch-language" className="underline font-bold">Detailed guide version</Link>
            <Link href="/en/english-speaking-companies-netherlands" className="underline font-bold">English-speaking companies</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
