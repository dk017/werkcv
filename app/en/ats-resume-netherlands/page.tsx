import Link from "next/link";
import { buildEnglishMetadata } from "../metadata";

export const metadata = buildEnglishMetadata({
  title: "ATS Resume Tips for the Netherlands",
  description:
    "Optimize your CV for ATS screening in the Netherlands using the right formatting, keyword alignment, and section structure.",
  path: "/en/ats-resume-netherlands",
  nlPath: "/cv-tips/ats-vriendelijk-cv",
  keywords: [
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

      <section className="border-b-4 border-black bg-gradient-to-br from-purple-50 via-indigo-50 to-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            ATS Resume Guide for the Netherlands
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            If your CV is never getting callbacks, ATS alignment is often the
            first issue to fix.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">ATS checklist</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">Related Dutch pages</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/cv-tips/ats-vriendelijk-cv" className="underline font-bold">
              ATS-friendly CV Article (Dutch)
            </Link>
            <Link href="/templates" className="underline font-bold">
              ATS Template Options
            </Link>
            <Link href="/cv-voorbeelden/technologie-en-ict/software-ontwikkelaar" className="underline font-bold">
              Tech Example CV
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/templates" className="bg-black text-white font-bold px-5 py-3 border-4 border-black">
            Build ATS-safe CV
          </Link>
          <Link href="/en" className="bg-white text-black font-bold px-5 py-3 border-4 border-black">
            Back to English Guides
          </Link>
        </div>
      </section>
    </main>
  );
}
