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
    "dutch style cv template",
    "dutch cv format template",
    "english cv netherlands",
    "netherlands resume template",
    "netherlands resume download templates",
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

const quickAnswerCards = [
  {
    title: "Simple one-column layout",
    body:
      "A Dutch CV template usually works best when the structure is plain, easy to scan, and free of decorative blocks that hurt ATS readability.",
  },
  {
    title: "Reverse-chronological work history",
    body:
      "Dutch recruiters expect your latest role first. Keep role titles, dates, and achievements easy to scan in seconds.",
  },
  {
    title: "Tailored summary and keywords",
    body:
      "A Dutch-style CV should connect directly to the vacancy, not read like a generic international resume.",
  },
];

const dutchExpectations = [
  "A clear job title directly under your name.",
  "A short profile summary instead of a long personal statement.",
  "Work experience in reverse chronological order.",
  "Bullet points with measurable outcomes, not just responsibilities.",
  "A simple PDF-ready layout that survives ATS parsing.",
];

const routeChoices = [
  {
    href: "/en/templates",
    title: "English CV templates",
    body: "Best if you want to compare layouts and start writing immediately inside the builder.",
  },
  {
    href: "/en/netherlands-cv-format",
    title: "Netherlands CV format",
    body: "Best if you mostly want the full structure rules before choosing a template.",
  },
  {
    href: "/en/dutch-cv-examples",
    title: "Dutch CV examples",
    body: "Best if you want to see how finished English CVs for the Netherlands actually read.",
  },
];

const faqs = [
  {
    question: "What is a Dutch CV template?",
    answer:
      "A Dutch CV template is a layout and section order that matches what recruiters in the Netherlands usually expect: clear role title, short profile, reverse-chronological experience, and an ATS-safe structure.",
  },
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
          <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-slate-700">
            Near-BOFU English intent
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Dutch CV Template for English Speakers
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            Use this structure if you are applying in the Netherlands and want
            a professional, ATS-safe CV without guessing local expectations.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/en/templates" className="bg-black text-white font-bold px-5 py-3 border-4 border-black">
              Compare English Templates
            </Link>
            <Link href="/en/editor" className="bg-[#4ECDC4] text-black font-bold px-5 py-3 border-4 border-black">
              Open English editor
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">What makes a Dutch CV template different?</h2>
          <p className="text-gray-700 max-w-3xl">
            A Dutch CV template is usually more direct and more structured than a generic international resume layout. Dutch recruiters tend to prefer a short summary, recent experience first, straightforward section labels, and a layout that feels professional rather than overly designed.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {quickAnswerCards.map((card) => (
              <article key={card.title} className="border-2 border-black bg-[#FFFEF0] p-4">
                <h3 className="text-base font-black text-black">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{card.body}</p>
              </article>
            ))}
          </div>
        </div>

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
          <h2 className="text-2xl font-black mb-3">What Dutch recruiters usually expect</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {dutchExpectations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">Build it quickly</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>

        <div className="bg-[#FFF7E8] border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">Choose the right next route</h2>
          <p className="text-gray-700 max-w-3xl">
            People searching for a Dutch CV template do not always want the same thing. Some want layouts, some want examples, and some want format rules first.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {routeChoices.map((choice) => (
              <Link key={choice.href} href={choice.href} className="block border-2 border-black bg-white p-4 transition-colors hover:bg-yellow-100">
                <h3 className="text-base font-black text-black">{choice.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{choice.body}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">Best next English routes</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/en/netherlands-cv-format" className="underline font-bold">
              Netherlands CV format
            </Link>
            <Link href="/en/dutch-cv-examples" className="underline font-bold">
              Dutch CV examples in English
            </Link>
            <Link href="/tools/linkedin-naar-cv" className="underline font-bold">
              Convert your LinkedIn profile into a Dutch CV
            </Link>
            <Link href="/en/guides/dutch-cv-for-expats" className="underline font-bold">
              Dutch CV for expats
            </Link>
            <Link href="/en/guides/netherlands-cv-keywords-ats" className="underline font-bold">
              ATS keyword guide
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/en/templates" className="bg-black text-white font-bold px-5 py-3 border-4 border-black">
            Start with a Template
          </Link>
          <Link href="/en/editor" className="bg-[#4ECDC4] text-black font-bold px-5 py-3 border-4 border-black">
            Open English editor
          </Link>
          <Link href="/en" className="bg-white text-black font-bold px-5 py-3 border-4 border-black">
            Back to English Guides
          </Link>
        </div>
      </section>
    </main>
  );
}
