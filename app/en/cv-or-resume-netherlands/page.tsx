import Link from "next/link";
import { buildEnglishMetadata } from "../metadata";

export const metadata = buildEnglishMetadata({
  title: "CV or Resume in the Netherlands",
  description:
    "Understand when to use a CV vs resume in the Netherlands, what Dutch recruiters expect, and how to pick the right format for international applications.",
  path: "/en/cv-or-resume-netherlands",
  nlPath: "/cv-tips/cv-schrijven-tips",
  keywords: [
    "cv or resume netherlands",
    "difference cv and resume netherlands",
    "dutch cv vs resume",
    "which format netherlands job application",
    "expat cv netherlands",
  ],
});

const steps = [
  "Read the vacancy language and required documents first.",
  "For Dutch market roles, use a concise CV format.",
  "For international teams, English CV is usually accepted.",
  "Keep one master CV and tailor a copy per vacancy.",
  "Match terminology and skill keywords from the job post.",
];

const faqs = [
  {
    question: "Is there a strict difference between CV and resume in the Netherlands?",
    answer:
      "In practice, people often use the terms interchangeably. Employers mainly expect a concise, role-focused CV document.",
  },
  {
    question: "Can I submit an English resume to Dutch companies?",
    answer:
      "Yes, for international environments. If Dutch is required in the vacancy, submit in Dutch.",
  },
  {
    question: "Should I prepare two versions?",
    answer:
      "Yes. Keep one English version and one Dutch version if you apply across both international and Dutch-speaking roles.",
  },
];

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to choose between CV and resume in the Netherlands",
  description:
    "Decision framework for document format and language for Dutch job applications.",
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

export default function CvOrResumeNetherlandsPage() {
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

      <section className="border-b-4 border-black bg-gradient-to-br from-red-50 via-pink-50 to-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            CV or Resume in the Netherlands?
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            Focus less on labels and more on recruiter expectations: clear
            structure, role relevance, and language match with the vacancy.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">Decision framework</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">Useful Dutch resources</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/cv-tips/cv-schrijven-tips" className="underline font-bold">
              CV Writing Tips (Dutch)
            </Link>
            <Link href="/cv-tips/profieltekst-schrijven" className="underline font-bold">
              Profile Summary Tips (Dutch)
            </Link>
            <Link href="/cv-voorbeelden" className="underline font-bold">
              CV Examples (Dutch)
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/templates" className="bg-black text-white font-bold px-5 py-3 border-4 border-black">
            Start Your CV
          </Link>
          <Link href="/en" className="bg-white text-black font-bold px-5 py-3 border-4 border-black">
            Back to English Guides
          </Link>
        </div>
      </section>
    </main>
  );
}
