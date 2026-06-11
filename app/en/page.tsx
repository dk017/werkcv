import Link from "next/link";
import { buildEnglishMetadata } from "./metadata";

export const metadata = buildEnglishMetadata({
  title: "Netherlands CV Format: Dutch CV Template in English",
  description:
    "Use a Dutch CV template in English for jobs in the Netherlands. Start with format rules, examples, ATS guidance, expat tools and an English editor.",
  path: "/en",
  nlPath: "/",
  keywords: [
    "dutch cv in english",
    "english cv netherlands",
    "dutch cv guide in english",
    "netherlands resume help",
    "cv template netherlands",
    "expat cv netherlands",
  ],
});

const pages = [
  {
    href: "/en/expat-cv-netherlands",
    title: "Expat CV Netherlands",
    description: "A practical decision guide for English vs Dutch, visa wording, language levels, and personal details.",
  },
  {
    href: "/en/dutch-cv-template",
    title: "Dutch CV Template",
    description: "Use an ATS-safe Dutch-style CV template in English for jobs in the Netherlands.",
  },
  {
    href: "/en/highly-skilled-migrant-cv-netherlands",
    title: "Highly Skilled Migrant CV",
    description: "CV guidance for sponsor-sensitive applications and HSM salary-route preparation.",
  },
  {
    href: "/en/english-cv-example-software-engineer-netherlands",
    title: "Software Engineer CV Example",
    description: "English CV example for developers applying to Dutch tech roles.",
  },
  {
    href: "/en/cv-netherlands-without-dutch-language",
    title: "CV Without Dutch Language",
    description: "How to target English-speaking roles while showing Dutch level honestly.",
  },
  {
    href: "/en/guides/cv-format-netherlands-english",
    title: "CV Format Netherlands English",
    description: "Use the updated format guide for section order, Europass context, ATS-safe layout and examples.",
  },
  {
    href: "/en/dutch-cv-for-expats",
    title: "Dutch CV for Expats",
    description: "Localize international experience, language levels, and practical hiring signals.",
  },
  {
    href: "/en/english-cv-example-netherlands",
    title: "English CV Example Netherlands",
    description: "See the tone, profile summary, and proof bullets before writing your own version.",
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
    title: "Expat CV Guides",
    description: "Long-tail English guides for expats, students, non-Dutch speakers and ATS-heavy applications.",
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

const proofPoints = [
  {
    title: "English copy, Dutch structure",
    description:
      "Keep the language English when the vacancy is English, but use Dutch-market section order and recruiter logic.",
  },
  {
    title: "Clear language and eligibility signals",
    description:
      "Show English, Dutch and other language levels clearly. Add work authorization context only when it helps the recruiter.",
  },
  {
    title: "ATS-safe before decorative",
    description:
      "Use real text, clear headings and simple layout before adding visual elements that can make parsing harder.",
  },
];

const startPaths = [
  {
    href: "/en/expat-cv-netherlands",
    title: "I am an expat and need the full route",
    description: "Use this if you need one decision page for CV language, work authorization, Dutch level, and next tools.",
    cta: "Open expat CV guide",
  },
  {
    href: "/en/editor",
    title: "I want to build the CV now",
    description: "Go straight to the English editor if you already know the structure and want to create the document.",
    cta: "Open English editor",
  },
  {
    href: "/en/guides/cv-format-netherlands-english",
    title: "I need the right format first",
    description: "Use this if you are unsure about section order, page length, Europass, photo choice or ATS formatting.",
    cta: "Read format guide",
  },
  {
    href: "/en/guides/cv-for-international-students-netherlands",
    title: "Student or graduate route",
    description: "Use the student guide if your profile depends on projects, internships, and part-time work.",
    cta: "Open student guide",
  },
  {
    href: "/en/guides/netherlands-cv-keywords-ats",
    title: "ATS and keyword route",
    description: "Useful if your CV gets views but not callbacks and you suspect wording or structure issues.",
    cta: "Fix ATS wording",
  },
  {
    href: "/en/guides/linkedin-to-cv-netherlands",
    title: "LinkedIn to CV route",
    description: "Best if your profile is stronger on LinkedIn than in your current resume or CV document.",
    cta: "Convert LinkedIn profile",
  },
];

const sourceLinks = [
  {
    href: "https://www.workinnl.nl/en/employment/cv-en/default.aspx",
    title: "Work in NL: CV",
    description:
      "Public Dutch employment guidance explaining that a CV is used by employers in the Netherlands to decide whom to invite.",
  },
  {
    href: "https://europass.europa.eu/nl/create-europass-cv",
    title: "Europass: Create your CV",
    description:
      "European CV guidance on readable language, tailoring and reverse-chronological experience.",
  },
  {
    href: "https://www.rijksoverheid.nl/onderwerpen/onderwijs-en-internationalisering/vraag-en-antwoord/wat-is-europass-en-wat-kan-ik-er-mee",
    title: "Dutch government: Europass",
    description:
      "Official Dutch government explanation of Europass as a European Commission initiative and EU-recognized standard.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Dutch CV in English for Jobs in the Netherlands",
  description:
    "English resources for building a Dutch-style CV for jobs in the Netherlands.",
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

      <section className="border-b-4 border-black bg-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <span className="inline-block bg-[#4ECDC4] text-black text-sm font-bold px-3 py-1 mb-4 border-2 border-black">
            ENGLISH CV FOR THE NETHERLANDS
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Netherlands CV format and Dutch CV template in English
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl leading-relaxed">
            Use WerkCV when you want English CV content with Dutch-market structure:
            clear section order, practical proof, language levels, ATS-safe layout and
            examples for jobs in the Netherlands.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/en/editor"
              className="inline-block bg-[#4ECDC4] text-black font-black px-5 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Create my English CV
            </Link>
            <Link
              href="/en/guides/cv-format-netherlands-english"
              className="inline-block bg-black text-white font-black px-5 py-3 border-4 border-black"
            >
              Check the Netherlands CV format
            </Link>
            <Link
              href="/en/templates"
              className="inline-block bg-white text-black font-black px-5 py-3 border-4 border-black"
            >
              Browse templates
            </Link>
          </div>
          <p className="mt-4 text-sm font-medium text-gray-600">
            Best for expats, international students, English-speaking professionals and candidates applying to Dutch companies in English.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-12 grid gap-5 md:grid-cols-3">
          {proofPoints.map((point) => (
            <div key={point.title} className="border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-xl font-black text-gray-900">{point.title}</h2>
              <p className="mt-2 text-gray-700 leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black text-gray-900 mb-3">
              Choose the fastest route for your situation
            </h2>
            <p className="text-gray-700 text-lg">
              Do not start by reading every guide. Pick the path that matches the job you need done:
              build now, fix format, adapt a student profile, improve ATS match or convert LinkedIn.
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {startPaths.map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className="block border-4 border-black bg-[#FFF7E8] p-5 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <h3 className="text-xl font-black mb-2 text-gray-900">{path.title}</h3>
                <p className="text-gray-700">{path.description}</p>
                <span className="mt-4 inline-block border-2 border-black bg-white px-3 py-2 text-sm font-black text-black">
                  {path.cta}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-12 border-4 border-black bg-[#E7F8F6] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-black text-gray-900 mb-3">
            What belongs on a Dutch CV in English?
          </h2>
          <p className="max-w-3xl text-gray-700 text-lg leading-relaxed">
            A strong Netherlands CV in English usually includes contact details, city or relocation context,
            one target role, a short profile, recent work experience first, education, skills, languages,
            certifications and optional links. Keep the writing practical: tools, scope, outcomes and
            vacancy language matter more than long career storytelling.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/en/guides/cv-format-netherlands-english" className="border-4 border-black bg-white px-5 py-3 font-black text-black">
              Read the full format guide
            </Link>
            <Link href="/en/dutch-cv-template" className="border-4 border-black bg-black px-5 py-3 font-black text-white">
              Open Dutch CV template guide
            </Link>
          </div>
        </div>

        <div className="mb-6 max-w-3xl">
          <h2 className="text-3xl font-black text-gray-900 mb-3">
            English CV resources
          </h2>
          <p className="text-gray-700 text-lg">
            These pages are split by intent so the hub does not compete with the detailed guides.
          </p>
        </div>
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

        <div className="mt-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-black text-gray-900 mb-3">
            Sources behind this hub
          </h2>
          <p className="max-w-3xl text-gray-700 text-lg">
            The detailed guides link to more specific sources. This hub uses the following public references
            for the broad Netherlands CV context.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {sourceLinks.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="block border-2 border-black bg-[#FFFEF9] p-4 hover:bg-yellow-100 transition-colors"
              >
                <h3 className="text-sm font-black text-gray-900">{source.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{source.description}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/en/editor"
            className="inline-block bg-[#4ECDC4] text-black font-bold px-5 py-3 border-4 border-black"
          >
            Open English editor
          </Link>
          <Link
            href="/en/templates"
            className="inline-block bg-black text-white font-bold px-5 py-3 border-4 border-black"
          >
            Open CV Templates
          </Link>
          <Link
            href="/en/dutch-cv-examples"
            className="inline-block bg-white text-black font-bold px-5 py-3 border-4 border-black"
          >
            English CV examples
          </Link>
          <Link
            href="/en/english-cv-example-netherlands"
            className="inline-block bg-white text-black font-bold px-5 py-3 border-4 border-black"
          >
            Netherlands example
          </Link>
        </div>
      </section>
    </main>
  );
}
