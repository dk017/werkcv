import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { buildEnglishMetadata } from "../metadata";

export const metadata = buildEnglishMetadata({
  title: "Highly Skilled Migrant CV Netherlands",
  description:
    "Build a Netherlands-ready CV for the highly skilled migrant route. Clarify sponsorship, salary context, Dutch-market fit, and recruiter proof without overloading your CV.",
  path: "/en/highly-skilled-migrant-cv-netherlands",
  keywords: [
    "highly skilled migrant cv netherlands",
    "kennismigrant cv netherlands",
    "highly skilled migrant resume netherlands",
    "hsm cv netherlands",
    "netherlands sponsor cv",
  ],
});

const pageUrl = "https://werkcv.nl/en/highly-skilled-migrant-cv-netherlands";

const cvSignals = [
  {
    title: "Recognised sponsor reality",
    body:
      "If sponsorship is required, say it once and clearly. Do not make the entire CV about the visa route.",
  },
  {
    title: "Salary-route confidence",
    body:
      "For 2026, IND thresholds depend on age and route. Use the checker before you spend weeks applying to offers that cannot work.",
  },
  {
    title: "Local role mapping",
    body:
      "Translate your previous title into Dutch-market role language: backend engineer, data analyst, product manager, finance specialist, or similar.",
  },
  {
    title: "Evidence over ambition",
    body:
      "Dutch recruiters need tools, scope, systems, users, revenue, compliance, incidents, delivery, or measurable outcomes.",
  },
];

const wordingExamples = [
  {
    weak: "Need visa sponsorship.",
    strong: "Work route: highly skilled migrant route; recognised sponsor required.",
  },
  {
    weak: "Open to relocation.",
    strong: "Relocating to the Netherlands from August 2026; available for English-speaking backend roles.",
  },
  {
    weak: "Senior developer with international experience.",
    strong: "Backend engineer with 7 years of Java, Spring Boot, AWS, and payments-platform experience.",
  },
];

const sections = [
  {
    title: "Header",
    body:
      "Use name, target role, city or relocation timing, phone, email, LinkedIn, and portfolio or GitHub if relevant. Add one work-route line only if it removes hiring uncertainty.",
  },
  {
    title: "Profile",
    body:
      "Use 4 lines: seniority, domain, tools, business proof, and Netherlands fit. Avoid broad statements like passionate professional seeking an opportunity.",
  },
  {
    title: "Experience",
    body:
      "Explain foreign company context only when needed. A Dutch recruiter may not know the brand, market size, or title hierarchy from your previous country.",
  },
  {
    title: "Education and salary route",
    body:
      "Keep education clear, but do not turn the CV into an IND application. Salary and sponsor checks belong in preparation, not in every CV section.",
  },
];

const sources = [
  {
    label: "IND - Highly skilled migrant",
    href: "https://ind.nl/en/residence-permits/work/highly-skilled-migrant",
  },
  {
    label: "IND - Required amounts income requirements",
    href: "https://ind.nl/en/required-amounts-income-requirements",
  },
  {
    label: "Government.nl - Hiring a highly skilled migrant",
    href: "https://www.government.nl/topics/immigration-to-the-netherlands/question-and-answer/hire-a-highly-skilled-migrant",
  },
];

const faqs = [
  {
    question: "Should I mention highly skilled migrant status on my CV?",
    answer:
      "Mention it only if it affects hiring. A short line such as 'highly skilled migrant route; recognised sponsor required' is clearer than vague visa wording.",
  },
  {
    question: "Should I put expected salary on the CV?",
    answer:
      "Usually no. Check thresholds before applying, but keep salary negotiation outside the CV unless the employer specifically requests it.",
  },
  {
    question: "Does a sponsor route mean my CV should be longer?",
    answer:
      "No. The CV should still be direct and recruiter-friendly. Use links or tools for route checks instead of adding immigration detail everywhere.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Highly Skilled Migrant CV Netherlands",
  description:
    "Practical CV guidance for expats applying through the highly skilled migrant route in the Netherlands.",
  inLanguage: "en-NL",
  mainEntityOfPage: pageUrl,
  datePublished: "2026-05-14",
  dateModified: "2026-05-14",
  author: { "@id": "https://werkcv.nl/#organization" },
  publisher: { "@id": "https://werkcv.nl/#organization" },
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

export default function HighlySkilledMigrantCvPage() {
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
              { label: "Highly skilled migrant CV", href: "/en/highly-skilled-migrant-cv-netherlands" },
            ]}
          />
        </div>
      </div>

      <section className="border-b-4 border-black bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="mb-3 inline-block border-2 border-black bg-[#4ECDC4] px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-black">
            Sponsor route CV
          </p>
          <p className="mb-4 text-sm font-bold text-slate-600">Last reviewed May 14, 2026</p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">
            Highly skilled migrant CV for the Netherlands
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-700">
            If your Dutch job application depends on the highly skilled migrant route,
            your CV needs to reduce sponsor uncertainty while still reading like a
            strong professional document. Mention the route clearly, then prove the role fit.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedLandingLink href="/tools/kennismigrant-salary-checker" trackingLocation="hsm_cv_hero" trackingLabel="salary_checker" className="border-4 border-black bg-black px-6 py-3 text-sm font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Check HSM salary route
            </TrackedLandingLink>
            <TrackedLandingLink href="/en/templates" trackingLocation="hsm_cv_hero" trackingLabel="templates" className="border-4 border-black bg-[#4ECDC4] px-6 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Choose English template
            </TrackedLandingLink>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-6xl px-6 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-black text-slate-950">What this CV must prove</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {cvSignals.map((signal) => (
              <div key={signal.title} className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-black text-slate-950">{signal.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{signal.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6">
          <h2 className="text-3xl font-black text-slate-950">Recommended CV structure</h2>
          <div className="mt-6 divide-y-2 divide-black border-2 border-black">
            {sections.map((section) => (
              <div key={section.title} className="grid gap-3 p-4 md:grid-cols-[180px_1fr]">
                <h3 className="font-black text-slate-950">{section.title}</h3>
                <p className="leading-relaxed text-slate-700">{section.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-[#E9FFFC] p-6">
          <h2 className="text-3xl font-black text-slate-950">Better wording for sponsor-sensitive applications</h2>
          <div className="mt-6 overflow-hidden border-4 border-black bg-white">
            {wordingExamples.map((item) => (
              <div key={item.weak} className="grid border-b-2 border-black last:border-b-0 md:grid-cols-2">
                <div className="bg-red-50 p-4 text-sm font-semibold text-slate-800">{item.weak}</div>
                <div className="bg-green-50 p-4 text-sm font-semibold text-slate-900">{item.strong}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 border-4 border-black bg-black p-7 text-white">
          <h2 className="text-3xl font-black">Build the CV after checking the route</h2>
          <p className="mt-3 max-w-3xl text-slate-200">
            First check whether the salary route is realistic. Then use a Dutch-market
            English template so the CV still reads like a job application, not an immigration memo.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <TrackedLandingLink href="/tools/kennismigrant-salary-checker" trackingLocation="hsm_cv_bottom" trackingLabel="salary_checker" className="border-4 border-white bg-[#4ECDC4] px-5 py-3 font-black text-black">
              Check salary threshold
            </TrackedLandingLink>
            <TrackedLandingLink href="/en/editor" trackingLocation="hsm_cv_bottom" trackingLabel="editor" className="border-4 border-white bg-white px-5 py-3 font-black text-black">
              Open English editor
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
          <h2 className="text-3xl font-black text-slate-950">Sources</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {sources.map((source) => (
              <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer" className="block border-3 border-black bg-white p-4 font-bold text-slate-900">
                {source.label}
              </a>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/en/expat-cv-netherlands" className="underline font-bold">Main expat CV guide</Link>
            <Link href="/en/english-cv-example-software-engineer-netherlands" className="underline font-bold">Software engineer CV example</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
