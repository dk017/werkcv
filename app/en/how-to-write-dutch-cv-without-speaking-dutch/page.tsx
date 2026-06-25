import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { buildEnglishMetadata } from "../metadata";

const pagePath = "/en/how-to-write-dutch-cv-without-speaking-dutch";
const pageUrl = `https://werkcv.nl${pagePath}`;
const lastReviewed = "June 25, 2026";

export const metadata = buildEnglishMetadata({
  title: "How to Write a Dutch CV When You Do Not Speak Dutch",
  description:
    "How to write a Netherlands CV when you do not speak Dutch yet: language levels, English vacancies, relocation wording, work authorization, and CV examples.",
  path: pagePath,
  keywords: [
    "how to write dutch cv without speaking dutch",
    "cv netherlands without dutch",
    "english cv netherlands no dutch",
    "jobs netherlands without dutch cv",
    "dutch cv when you do not speak dutch",
    "expat cv netherlands no dutch",
  ],
  type: "article",
});

const decisionCards = [
  {
    title: "Use English when the vacancy is English",
    body:
      "If the job ad and team language are English, an English CV is usually the clearest choice. Do not submit weak Dutch just to look local.",
  },
  {
    title: "Show Dutch level honestly",
    body:
      "A1 or A2 is not a failure. It is useful information. Add active learning only if it is true and current.",
  },
  {
    title: "Target roles where English can work",
    body:
      "Tech, data, SaaS, finance, logistics, research, international support, and multinational teams often accept English. Local customer-facing roles may not.",
  },
];

const cvFormula = [
  {
    title: "Header",
    body:
      "Name, target role, city or relocation timing, email, phone, LinkedIn, and portfolio if relevant.",
  },
  {
    title: "Profile",
    body:
      "Three to five lines explaining what you do, your experience level, your strongest proof, and the English-speaking role you are targeting.",
  },
  {
    title: "Language section",
    body:
      "List English, Dutch, and other languages with clear levels. Use CEFR terms when possible.",
  },
  {
    title: "Experience",
    body:
      "Use recent experience first. Translate unfamiliar job titles into plain English and add proof bullets.",
  },
  {
    title: "Skills",
    body:
      "Prioritize tools, systems, industry knowledge, and technical skills that match English-language Dutch vacancies.",
  },
  {
    title: "Eligibility context",
    body:
      "Mention right to work, relocation timing, or sponsorship need only when it reduces confusion for the recruiter.",
  },
];

const languageExamples = [
  {
    weak: "Dutch: basic",
    strong: "Dutch: A2, currently taking weekly lessons. English: C1 professional.",
  },
  {
    weak: "No Dutch yet",
    strong: "Dutch: beginner A1. Targeting English-speaking software and data roles.",
  },
  {
    weak: "Learning Dutch",
    strong: "Dutch: A2 reading and daily conversation, not yet for customer-facing writing.",
  },
];

const roleFit = [
  {
    role: "More realistic without Dutch",
    items: [
      "Software engineering, data, cloud, security, and product roles in international teams.",
      "SaaS customer support for English-speaking markets.",
      "Finance, accounting, and reporting roles where the company language is English.",
      "Logistics coordination in international operations, when local-language customer contact is limited.",
      "Research, PhD, university, and international student-facing environments.",
    ],
  },
  {
    role: "Harder without Dutch",
    items: [
      "Healthcare roles with direct Dutch-speaking patient contact.",
      "Education roles in Dutch-language schools.",
      "Public-sector or municipality roles.",
      "Retail, hospitality, and local service jobs where most customer contact is Dutch.",
      "Junior office roles where phone, admin, and local stakeholder work are mostly in Dutch.",
    ],
  },
];

const phrases = [
  "Based in Rotterdam; available from August 2026.",
  "Relocating to the Netherlands in September 2026.",
  "English: C1 professional. Dutch: A2, currently taking lessons.",
  "Eligible to work in the Netherlands.",
  "Requires employer sponsorship for Netherlands work authorization.",
  "Targeting English-speaking data analyst roles in international teams.",
];

const relatedResources = [
  {
    href: "/en/dutch-cv-template",
    title: "Dutch CV template in English",
    body: "Start from a local structure without translating your CV into weak Dutch.",
  },
  {
    href: "/en/english-speaking-companies-netherlands",
    title: "English-speaking companies in the Netherlands",
    body: "Use this when your next question is where English-only applications are more realistic.",
  },
  {
    href: "/en/highly-skilled-migrant-cv-netherlands",
    title: "Highly skilled migrant CV",
    body: "Useful if sponsorship, IND salary thresholds, or employer recognition may affect your application.",
  },
  {
    href: "/en/dutch-cv-mistakes-english-speaking-job-seekers",
    title: "7 Dutch CV mistakes English-speaking applicants make",
    body: "Use this if you want to check whether your existing CV is sending the wrong signal.",
  },
  {
    href: "/en/english-cv-example-netherlands",
    title: "English CV example Netherlands",
    body: "See practical wording before writing your own profile and experience bullets.",
  },
  {
    href: "/en/linkedin-to-cv-netherlands",
    title: "LinkedIn to CV Netherlands",
    body: "Turn your LinkedIn profile into a focused CV when you do not know where to start.",
  },
];

const sources = [
  {
    title: "Work in NL - CV",
    href: "https://www.workinnl.nl/en/employment/cv-en/default.aspx",
    note:
      "Official guidance that a CV for the Netherlands should clearly show who you are, what you can do, and where you have worked.",
  },
  {
    title: "Government.nl - Work permits",
    href: "https://www.government.nl/topics/foreign-citizens-working-in-the-netherlands/question-and-answer/what-permits-do-foreign-workers-need",
    note:
      "Official context on when work permits may be needed for foreign nationals working in the Netherlands.",
  },
  {
    title: "Europass - Create your CV",
    href: "https://europass.europa.eu/en/create-europass-cv",
    note:
      "European CV guidance on focusing on facts, tailoring the CV, and making it readable.",
  },
];

const faqs = [
  {
    question: "Can I apply for jobs in the Netherlands without speaking Dutch?",
    answer:
      "Yes, especially for English-speaking roles in international teams. But your CV should make the working language, Dutch level, location, and role fit clear instead of making the recruiter guess.",
  },
  {
    question: "Should I translate my CV into Dutch if my Dutch is weak?",
    answer:
      "Usually no. For English-language roles, a clear English CV is safer than a Dutch CV you cannot confidently explain in an interview.",
  },
  {
    question: "How should I write Dutch A1 or A2 on my CV?",
    answer:
      "Write it plainly, for example: Dutch: A2, currently taking weekly lessons. Avoid vague terms such as basic or conversational unless you add context.",
  },
  {
    question: "Should I mention sponsorship on my CV?",
    answer:
      "Mention work authorization or sponsorship when it helps the recruiter understand your situation quickly. Keep it factual and short.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to write a Dutch CV when you do not speak Dutch",
  description:
    "Practical guide for writing a Netherlands CV without strong Dutch language skills.",
  inLanguage: "en-NL",
  mainEntityOfPage: pageUrl,
  datePublished: "2026-06-25",
  dateModified: "2026-06-25",
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

export default function HowToWriteDutchCvWithoutSpeakingDutchPage() {
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
              { label: "CV without Dutch", href: pagePath },
            ]}
          />
        </div>
      </div>

      <section className="border-b-4 border-black bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="mb-3 inline-block border-2 border-black bg-[#FFD21F] px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-black">
            No Dutch yet
          </p>
          <p className="mb-4 text-sm font-bold text-slate-600">Last reviewed {lastReviewed}</p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">
            How to write a Dutch CV when you do not speak Dutch
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-700">
            Not speaking Dutch does not automatically make you a weak candidate.
            But hiding it, overstating it, or sending a generic resume makes the
            recruiter work too hard. Your CV should make the English-speaking fit obvious.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedLandingLink
              href="/en/editor?template=professional&startSource=en_no_dutch_cv_hero"
              trackingLocation="en_no_dutch_cv_hero"
              trackingLabel="open_editor"
              className="border-4 border-black bg-black px-6 py-3 text-sm font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Build my English CV
            </TrackedLandingLink>
            <TrackedLandingLink
              href="/en/templates?startSource=en_no_dutch_cv_hero"
              trackingLocation="en_no_dutch_cv_hero"
              trackingLabel="templates"
              className="border-4 border-black bg-[#4ECDC4] px-6 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Choose Dutch-style template
            </TrackedLandingLink>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-6xl px-6 py-12">
        <section className="mb-12 border-4 border-black bg-white p-6">
          <h2 className="text-3xl font-black text-slate-950">The practical answer</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">
            Write the CV in English if the vacancy is in English. Use a Dutch-market
            structure, state your Dutch level clearly, and aim at roles where English
            is a realistic working language. Do not translate your CV into Dutch just
            to look local if you cannot interview or work in Dutch.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {decisionCards.map((card) => (
              <div key={card.title} className="border-2 border-black bg-[#FFFEF0] p-4">
                <h3 className="font-black text-slate-950">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-black text-slate-950">The CV formula</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {cvFormula.map((item) => (
              <section key={item.title} className="border-4 border-black bg-white p-5">
                <h3 className="text-xl font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.body}</p>
              </section>
            ))}
          </div>
        </section>

        <section className="mb-12 border-4 border-black bg-[#E9FFFC] p-6">
          <h2 className="text-3xl font-black text-slate-950">How to write your Dutch level</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-slate-700">
            The goal is not to make weak Dutch sound strong. The goal is to remove doubt.
          </p>
          <div className="mt-6 overflow-hidden border-4 border-black bg-white">
            {languageExamples.map((example) => (
              <div key={example.weak} className="grid border-b-2 border-black last:border-b-0 md:grid-cols-2">
                <div className="bg-red-50 p-4">
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-red-700">Avoid</p>
                  <p className="text-sm font-semibold text-slate-800">{example.weak}</p>
                </div>
                <div className="bg-green-50 p-4 md:border-l-2 md:border-black">
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-green-700">Use instead</p>
                  <p className="text-sm font-semibold text-slate-900">{example.strong}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 grid gap-6 md:grid-cols-2">
          {roleFit.map((group) => (
            <section key={group.role} className="border-4 border-black bg-white p-6">
              <h2 className="text-2xl font-black text-slate-950">{group.role}</h2>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="border-2 border-black bg-[#FFFEF9] p-3 text-sm font-semibold leading-relaxed text-slate-800">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6">
          <h2 className="text-3xl font-black text-slate-950">Useful phrases you can copy</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-slate-700">
            Use only the phrases that are true for your situation. Do not add sponsorship
            or eligibility wording if it creates confusion rather than clarity.
          </p>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {phrases.map((phrase) => (
              <li key={phrase} className="border-2 border-black bg-[#FFFEF0] p-4 text-sm font-bold text-slate-900">
                {phrase}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12 border-4 border-black bg-black p-7 text-white">
          <h2 className="text-3xl font-black">Build the CV in English, structure it for Dutch recruiters</h2>
          <p className="mt-3 max-w-3xl text-slate-200">
            Start with an English CV template, add honest language levels, and keep
            the first page focused on role fit. You can edit for free and pay only
            when you download the PDF.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <TrackedLandingLink
              href="/en/editor?template=ats&startSource=en_no_dutch_cv_mid"
              trackingLocation="en_no_dutch_cv_mid"
              trackingLabel="editor"
              className="border-4 border-white bg-[#4ECDC4] px-5 py-3 font-black text-black"
            >
              Open English editor
            </TrackedLandingLink>
            <TrackedLandingLink
              href="/en/dutch-cv-checker?startSource=en_no_dutch_cv_mid"
              trackingLocation="en_no_dutch_cv_mid"
              trackingLabel="checker"
              className="border-4 border-white bg-white px-5 py-3 font-black text-black"
            >
              Check current CV
            </TrackedLandingLink>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-black text-slate-950">Related guides</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {relatedResources.map((resource) => (
              <Link key={resource.href} href={resource.href} className="border-4 border-black bg-white p-5 transition-colors hover:bg-[#FFFEF0]">
                <h3 className="text-xl font-black text-slate-950">{resource.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{resource.body}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6">
          <h2 className="text-3xl font-black text-slate-950">FAQ</h2>
          <div className="mt-6 divide-y-2 divide-black">
            {faqs.map((faq) => (
              <details key={faq.question} className="py-4">
                <summary className="cursor-pointer text-lg font-black text-slate-950">{faq.question}</summary>
                <p className="mt-3 max-w-3xl leading-relaxed text-slate-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-12 border-4 border-black bg-[#F8FAFC] p-6">
          <h2 className="text-3xl font-black text-slate-950">Sources checked</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-slate-700">
            Last reviewed on {lastReviewed}. These sources support the page guidance;
            your final wording should still match the vacancy and your legal work situation.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {sources.map((source) => (
              <a key={source.href} href={source.href} className="border-2 border-black bg-white p-4 hover:bg-[#FFFEF0]">
                <h3 className="font-black text-slate-950">{source.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{source.note}</p>
              </a>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
