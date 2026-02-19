import Link from "next/link";
import { buildEnglishMetadata } from "../metadata";

export const metadata = buildEnglishMetadata({
  title: "Dutch CV Template for English Speakers",
  description:
    "Create a Dutch-style CV in English with ATS-friendly structure, practical section order, and the format commonly expected by employers in the Netherlands.",
  path: "/en/dutch-cv-template",
  nlPath: "/templates",
  keywords: [
    "dutch cv template",
    "english cv netherlands",
    "netherlands resume template",
    "ats cv template netherlands",
    "expat cv template",
  ],
});

const steps = [
  "Choose a simple ATS-safe template.",
  "Use a clear job title and profile summary for the Dutch market.",
  "Add measurable achievements under each role.",
  "Keep language consistent (all English or all Dutch).",
  "Export as PDF and tailor keywords to the vacancy.",
];

const faqs = [
  {
    question: "Can I apply in English in the Netherlands?",
    answer:
      "Yes, especially for international and tech roles. For Dutch-speaking roles, use Dutch when required in the vacancy text.",
  },
  {
    question: "Should I include a photo on a Dutch CV?",
    answer:
      "It is optional in the Netherlands. If you include one, keep it professional. If unsure, skip it.",
  },
  {
    question: "How long should a Dutch CV be?",
    answer:
      "Most profiles should stay within one to two pages, focused on relevant experience and results.",
  },
];

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to build a Dutch-style CV in English",
  description:
    "Step-by-step process for building an ATS-friendly CV for jobs in the Netherlands.",
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

export default function DutchCvTemplatePage() {
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

      <section className="border-b-4 border-black bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Dutch CV Template for English Speakers
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            Use this structure if you are applying in the Netherlands and want
            a professional, ATS-safe CV without guessing local expectations.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">Recommended structure</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Header: name, title, city, phone, email, LinkedIn.</li>
            <li>Profile summary: 3-4 lines tailored to the target role.</li>
            <li>Work experience: reverse-chronological with bullet outcomes.</li>
            <li>Education, certificates, language skills, and key tools.</li>
          </ol>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">Build it quickly</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">Related Dutch examples</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/cv-voorbeelden/technologie-en-ict/software-ontwikkelaar" className="underline font-bold">
              Software Developer Example
            </Link>
            <Link href="/cv-voorbeelden/studenten-en-starters/student-cv" className="underline font-bold">
              Student Example
            </Link>
            <Link href="/cv-voorbeelden/zorg-en-welzijn/verpleegkundige" className="underline font-bold">
              Nurse Example
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/templates" className="bg-black text-white font-bold px-5 py-3 border-4 border-black">
            Start with a Template
          </Link>
          <Link href="/en" className="bg-white text-black font-bold px-5 py-3 border-4 border-black">
            Back to English Guides
          </Link>
        </div>
      </section>
    </main>
  );
}
