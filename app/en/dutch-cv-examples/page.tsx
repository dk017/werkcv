import Link from "next/link";
import { buildEnglishMetadata } from "../metadata";

export const metadata = buildEnglishMetadata({
  title: "Dutch CV Examples by Role",
  description:
    "Review Dutch CV examples by profession and adapt them for English applications in the Netherlands. Compare structure, wording, and section priorities.",
  path: "/en/dutch-cv-examples",
  nlPath: "/cv-voorbeelden",
  keywords: [
    "dutch cv examples",
    "netherlands resume examples",
    "cv examples netherlands jobs",
    "expat cv examples",
    "english cv netherlands examples",
  ],
});

const steps = [
  "Pick an example closest to your target role.",
  "Copy section structure, not exact wording.",
  "Replace bullets with your own measurable achievements.",
  "Align skills and keywords with the vacancy.",
  "Export and review for ATS readability.",
];

const faqs = [
  {
    question: "Can I use a Dutch CV example for English applications?",
    answer:
      "Yes. Keep the same structure and convert content to clear English aligned with the role requirements.",
  },
  {
    question: "How many examples should I review?",
    answer:
      "Two to three is enough: one close role, one seniority match, and one ATS-focused format.",
  },
  {
    question: "Should I keep Dutch job titles on an English CV?",
    answer:
      "Use an English title and optionally include the Dutch title in parentheses for context.",
  },
];

const roleLinks = [
  { href: "/cv-voorbeelden/technologie-en-ict/software-ontwikkelaar", label: "Software Developer" },
  { href: "/cv-voorbeelden/technologie-en-ict/data-engineer", label: "Data Engineer" },
  { href: "/cv-voorbeelden/zakelijk-en-financieel/controller", label: "Controller" },
  { href: "/cv-voorbeelden/zorg-en-welzijn/verpleegkundige", label: "Nurse" },
  { href: "/cv-voorbeelden/studenten-en-starters/eerste-baan-starter", label: "Starter / First Job" },
  { href: "/cv-voorbeelden/marketing-en-communicatie/marketing-manager", label: "Marketing Manager" },
];

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to adapt Dutch CV examples for English applications",
  description:
    "A practical workflow for using Dutch CV examples when applying in English in the Netherlands.",
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

export default function DutchCvExamplesPage() {
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

      <section className="border-b-4 border-black bg-gradient-to-br from-green-50 via-teal-50 to-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Dutch CV Examples You Can Adapt in English
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            Compare real role-based examples and reuse the same logic for your
            own CV: clear structure, focused bullets, and ATS-friendly wording.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">High-value example pages</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {roleLinks.map((link) => (
              <Link key={link.href} href={link.href} className="underline font-bold">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">How to use examples</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/cv-voorbeelden" className="bg-black text-white font-bold px-5 py-3 border-4 border-black">
            Browse All Dutch Examples
          </Link>
          <Link href="/en" className="bg-white text-black font-bold px-5 py-3 border-4 border-black">
            Back to English Guides
          </Link>
        </div>
      </section>
    </main>
  );
}
