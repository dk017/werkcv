import Link from "next/link";
import { buildEnglishMetadata } from "../metadata";

export const metadata = buildEnglishMetadata({
  title: "ATS Resume Tips for the Netherlands",
  description:
    "Optimize your CV for ATS screening in the Netherlands using the right formatting, keyword alignment, and section structure.",
  path: "/en/ats-resume-netherlands",
  keywords: [
    "ats resume builder netherlands",
    "ats friendly cv maker netherlands",
    "ats resume netherlands",
    "ats cv netherlands",
    "ats-friendly cv",
    "resume keywords netherlands",
    "applicant tracking system cv",
  ],
});

const steps = [
  "Use a plain layout with standard headings.",
  "Mirror keywords from the vacancy in skills and experience.",
  "Avoid tables, text in images, and decorative icons for key details.",
  "Use consistent date and role formatting.",
  "Submit in PDF unless a company requests another format.",
];

const buildFlow = [
  {
    title: "1. Start with a parser-safe layout",
    body:
      "Use a single-column CV structure with normal text for contact details, work experience, education and skills. Avoid designs that hide important text inside graphics or decorative blocks.",
  },
  {
    title: "2. Match the Dutch vacancy language",
    body:
      "ATS optimization is not keyword stuffing. Reuse relevant job titles, tools, certificates and skills from the vacancy when they accurately describe your background.",
  },
  {
    title: "3. Check before sending",
    body:
      "A clean template is only the baseline. Use the ATS checker to spot missing keywords, unclear sections and readability issues before you download or send your CV.",
  },
];

const faqs = [
  {
    question: "Do Dutch employers use ATS systems?",
    answer:
      "Many medium and large employers in the Netherlands use ATS systems for initial screening.",
  },
  {
    question: "What hurts ATS readability most?",
    answer:
      "Complex layouts, unclear headings, and missing role-specific keywords are common causes.",
  },
  {
    question: "Should I keyword-stuff my CV?",
    answer:
      "No. Keep wording natural and only include relevant terms that reflect your real experience.",
  },
];

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to make an ATS-friendly CV for the Netherlands",
  description:
    "Checklist for improving ATS pass-through with structure, keywords, and formatting.",
  inLanguage: "en-NL",
  step: steps.map((text, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: `Step ${index + 1}`,
    text,
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "en-NL",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function AtsResumeNetherlandsPage() {
  return (
    <main className="min-h-screen bg-[#FFFEF9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="border-b-4 border-black bg-[radial-gradient(circle_at_top_left,#E9FFFC_0,#FFFEF9_45%,#FFF4D8_100%)]">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-gray-700">
            ATS CV for Dutch applications
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Build an ATS-friendly CV for the Netherlands
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            If your CV is not getting callbacks, fix the basics first: a simple layout, vacancy-matched keywords and a
            PDF that remains readable for Dutch recruitment systems.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/en/editor" className="bg-black text-white font-bold px-5 py-3 border-4 border-black">
              Build ATS-safe CV
            </Link>
            <Link href="/tools/ats-cv-checker" className="bg-[#4ECDC4] text-black font-bold px-5 py-3 border-4 border-black">
              Check existing CV
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-600">
            Layout + keywords + check
          </p>
          <h2 className="mt-2 text-3xl font-black mb-3">ATS-friendly is more than choosing a template</h2>
          <p className="text-gray-700 max-w-3xl">
            The safest CV flow is practical: pick a parser-safe template, adapt the language to the Dutch vacancy, then
            check the document before sending it.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {buildFlow.map((item) => (
              <article key={item.title} className="border-2 border-black bg-[#FFFEF9] p-4">
                <h3 className="font-black text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{item.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">ATS checklist</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">Related English routes</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/en/guides/netherlands-cv-keywords-ats" className="underline font-bold">
              ATS keyword guide
            </Link>
            <Link href="/en/netherlands-cv-format" className="underline font-bold">
              Netherlands CV format
            </Link>
            <Link href="/en/dutch-cv-template" className="underline font-bold">
              Dutch CV template
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/en/templates" className="bg-black text-white font-bold px-5 py-3 border-4 border-black">
            Build ATS-safe CV
          </Link>
          <Link href="/en/editor" className="bg-[#4ECDC4] text-black font-bold px-5 py-3 border-4 border-black">
            Open English editor
          </Link>
          <Link href="/en/guides" className="bg-white text-black font-bold px-5 py-3 border-4 border-black">
            Back to English Guides
          </Link>
        </div>
      </section>
    </main>
  );
}
