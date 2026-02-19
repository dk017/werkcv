import Link from "next/link";
import { buildEnglishMetadata } from "../metadata";

export const metadata = buildEnglishMetadata({
  title: "Netherlands CV Format",
  description:
    "Learn the standard CV format used in the Netherlands: section order, ideal length, language choices, and practical formatting rules.",
  path: "/en/netherlands-cv-format",
  nlPath: "/cv-tips/cv-schrijven-tips",
  keywords: [
    "netherlands cv format",
    "how to write cv in netherlands",
    "dutch cv layout",
    "cv structure netherlands",
    "resume format netherlands",
  ],
});

const steps = [
  "Start with a focused headline and contact details.",
  "Write a short profile summary matching the vacancy.",
  "List experience in reverse-chronological order.",
  "Use bullet points with measurable outcomes.",
  "Keep formatting clean and submit as PDF.",
];

const faqs = [
  {
    question: "Is one page required in the Netherlands?",
    answer:
      "No. One to two pages is common, depending on your experience and relevance.",
  },
  {
    question: "Should my CV be in Dutch or English?",
    answer:
      "Use the language of the vacancy. If the role and company are international, English is usually accepted.",
  },
  {
    question: "Do Dutch employers expect a profile summary?",
    answer:
      "Yes. A concise summary helps recruiters quickly understand role fit and seniority.",
  },
];

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to format a CV for the Netherlands",
  description:
    "Formatting checklist for a professional CV aligned with Dutch recruiter expectations.",
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

export default function NetherlandsCvFormatPage() {
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

      <section className="border-b-4 border-black bg-gradient-to-br from-yellow-50 via-orange-50 to-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Netherlands CV Format: Practical Rules
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            Keep your CV direct, role-specific, and easy to scan. Dutch hiring
            teams value clarity over visual noise.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">Section order</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Contact details and role headline.</li>
            <li>Short profile summary.</li>
            <li>Work experience with results.</li>
            <li>Education and certifications.</li>
            <li>Skills, tools, and language levels.</li>
          </ol>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">Format checklist</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">Deep-dive Dutch guides</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/cv-tips/cv-schrijven-tips" className="underline font-bold">
              CV Writing Tips (Dutch)
            </Link>
            <Link href="/cv-tips/cv-fouten" className="underline font-bold">
              Common CV Mistakes (Dutch)
            </Link>
            <Link href="/cv-tips/cv-template-kiezen" className="underline font-bold">
              Choosing a Template (Dutch)
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/templates" className="bg-black text-white font-bold px-5 py-3 border-4 border-black">
            Open CV Builder
          </Link>
          <Link href="/en" className="bg-white text-black font-bold px-5 py-3 border-4 border-black">
            Back to English Guides
          </Link>
        </div>
      </section>
    </main>
  );
}
