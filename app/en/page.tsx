import Link from "next/link";
import { buildEnglishMetadata } from "./metadata";

export const metadata = buildEnglishMetadata({
  title: "English CV Guides for the Netherlands",
  description:
    "English resources for writing a Dutch-style CV: templates, format guidance, ATS tips, and role-based examples for job seekers in the Netherlands.",
  path: "/en",
  nlPath: "/",
  keywords: [
    "english cv netherlands",
    "dutch cv guide in english",
    "netherlands resume help",
    "cv template netherlands",
    "expat cv netherlands",
  ],
});

const pages = [
  {
    href: "/en/dutch-cv-template",
    title: "Dutch CV Template",
    description: "Use an ATS-safe Dutch-style CV template in English.",
  },
  {
    href: "/en/netherlands-cv-format",
    title: "Netherlands CV Format",
    description: "Understand layout, sections, and what Dutch recruiters expect.",
  },
  {
    href: "/en/dutch-cv-examples",
    title: "Dutch CV Examples",
    description: "Review role-based examples and map them to your profile.",
  },
  {
    href: "/en/ats-resume-netherlands",
    title: "ATS Resume Netherlands",
    description: "Optimize your CV for applicant tracking systems in the Dutch market.",
  },
  {
    href: "/en/cv-or-resume-netherlands",
    title: "CV or Resume in the Netherlands",
    description: "Know which format to use and when.",
  },
  {
    href: "/en/guides",
    title: "Expat SEO Guides",
    description: "Long-tail English guides for expats applying in the Netherlands.",
  },
  {
    href: "/en/english-speaking-companies-netherlands",
    title: "English-Speaking Companies",
    description: "Move from employer search to a Dutch-market CV that fits international jobs.",
  },
];

const expatTools = [
  {
    href: "/tools/zoekjaar-checker",
    title: "Zoekjaar Checker",
    description: "Check whether the Dutch orientation year route still fits your timeline.",
  },
  {
    href: "/tools/kennismigrant-salary-checker",
    title: "Highly Skilled Migrant Salary Checker",
    description: "Compare your offer against the current IND salary thresholds.",
  },
  {
    href: "/tools/eu-blue-card-checker",
    title: "EU Blue Card Checker",
    description: "Compare the Blue Card route with Dutch sponsor-based options.",
  },
  {
    href: "/tools/job-title-translator",
    title: "Job Title Translator",
    description: "Translate job titles between Dutch and English for CV and LinkedIn use.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "English CV Guides for the Netherlands",
  description:
    "English resources for writing a Dutch-style CV for jobs in the Netherlands.",
  url: "https://werkcv.nl/en",
  inLanguage: "en-NL",
  isPartOf: {
    "@type": "WebSite",
    name: "WerkCV.nl",
    url: "https://werkcv.nl",
  },
};

export default function EnglishHubPage() {
  return (
    <main className="min-h-screen bg-[#FFFEF9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b-4 border-black bg-gradient-to-br from-blue-50 via-cyan-50 to-yellow-50">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <span className="inline-block bg-[#4ECDC4] text-black text-sm font-bold px-3 py-1 mb-4 border-2 border-black">
            ENGLISH GUIDES
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Build a Dutch-Style CV in English
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl">
            Use these focused pages to write a CV that fits hiring expectations
            in the Netherlands, even if you apply in English.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-5">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="block bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <h2 className="text-2xl font-black mb-2 text-gray-900">{page.title}</h2>
              <p className="text-gray-700">{page.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 border-t-4 border-black pt-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black text-gray-900 mb-3">
              Practical Tools for Expats Applying in the Netherlands
            </h2>
            <p className="text-gray-700 text-lg">
              CV format is only one part of the move. These tools help you compare routes,
              salary thresholds, and job-title wording before you localize your applications.
            </p>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-5">
            {expatTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <h3 className="text-xl font-black mb-2 text-gray-900">{tool.title}</h3>
                <p className="text-gray-700">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/en/english-speaking-companies-netherlands"
            className="inline-block bg-[#4ECDC4] text-black font-bold px-5 py-3 border-4 border-black"
          >
            English-Speaking Companies
          </Link>
          <Link
            href="/en/templates"
            className="inline-block bg-black text-white font-bold px-5 py-3 border-4 border-black"
          >
            Open CV Templates
          </Link>
          <Link
            href="/cv-voorbeelden"
            className="inline-block bg-white text-black font-bold px-5 py-3 border-4 border-black"
          >
            Dutch CV Examples
          </Link>
        </div>
      </section>
    </main>
  );
}
