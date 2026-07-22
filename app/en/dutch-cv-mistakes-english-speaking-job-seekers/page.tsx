import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { buildEnglishMetadata } from "../metadata";

const pagePath = "/en/dutch-cv-mistakes-english-speaking-job-seekers";
const pageUrl = `https://werkcv.nl${pagePath}`;
const lastReviewed = "June 25, 2026";

export const metadata = buildEnglishMetadata({
  title: "7 Dutch CV Mistakes English-Speaking Job Seekers Make",
  description:
    "Avoid the Dutch CV mistakes that make English-speaking applicants harder to assess: vague profiles, unclear Dutch level, heavy design, missing location, and weak proof.",
  path: pagePath,
  keywords: [
    "dutch cv mistakes",
    "english speaking job seekers netherlands cv",
    "dutch cv for english speakers",
    "netherlands cv mistakes",
    "expat cv mistakes netherlands",
    "english cv netherlands mistakes",
  ],
  type: "article",
});

const mistakes = [
  {
    title: "Sending a generic international resume",
    short: "The CV may be polished, but it is calibrated for the wrong reader.",
    problem:
      "A CV that worked in London, Mumbai, Cape Town, Toronto, or New York can still feel unclear in the Netherlands. Dutch recruiters usually want the practical screening information first: current role, target role, recent experience, location, languages, and proof.",
    fix:
      "Keep the CV in English when the vacancy is in English, but use Dutch-market structure: clear heading, short profile, reverse-chronological experience, skills, education, and language levels.",
  },
  {
    title: "Writing a profile that says nothing",
    short: "Generic professional language feels safe, but it gives the recruiter no evidence.",
    problem:
      "Phrases like motivated team player, dynamic environment, and excellent communication skills are too broad to help. They signal polish, not fit.",
    fix:
      "Write four concrete points: what you do, how much experience you have, what you are strong at, and what kind of Netherlands role you are targeting.",
  },
  {
    title: "Hiding practical details",
    short: "Missing location, availability, Dutch level, or work status creates uncertainty.",
    problem:
      "International candidates often hide the information they fear will count against them. But silence makes the recruiter guess, and recruiters usually guess conservatively.",
    fix:
      "State the useful facts simply: based in Amsterdam, relocating in September, Dutch A2, available from August, eligible to work in the Netherlands, or sponsorship required when relevant.",
  },
  {
    title: "Using vague language levels",
    short: "Basic, conversational, and fluent-ish are not precise enough.",
    problem:
      "Language level affects role fit in the Netherlands, especially for customer-facing, healthcare, education, public-sector, logistics, and local operations roles.",
    fix:
      "Use CEFR levels where possible: English C1, Dutch A2, German B1. If you are learning Dutch, say that clearly without overselling it.",
  },
  {
    title: "Adding personal details that do not help",
    short: "A CV is not a personal file. It is a professional screening document.",
    problem:
      "Full street address, marital status, religion, national ID numbers, and family details can make an international CV feel outdated or not adapted for the Netherlands.",
    fix:
      "Use name, email, phone, city or region, LinkedIn, and relevant portfolio links. Treat a photo as optional: use one only when it is professional and supports the application.",
  },
  {
    title: "Designing for screenshots instead of recruiters",
    short: "A visually impressive CV can become harder to scan and harder to parse.",
    problem:
      "Heavy columns, icons, text boxes, skill bars, and image-based layouts can hide important information from both recruiters and applicant tracking systems.",
    fix:
      "Use real text, clear headings, readable spacing, consistent dates, and an ATS-safe PDF. Design should make the content easier to understand, not harder.",
  },
  {
    title: "Listing duties instead of evidence",
    short: "Responsibilities describe a job. Evidence describes your contribution.",
    problem:
      "Responsible for customer support or worked on reporting could describe almost anyone in the role. It does not show scope, tools, volume, or outcome.",
    fix:
      "Add proof: handled 40 requests per day, prepared monthly reports for 12 account managers, improved response consistency, reduced manual work, or supported customers across three markets.",
  },
];

const quickFixes = [
  "Put your target role directly under your name.",
  "Show city, relocation timing, or availability near the top.",
  "Use a profile summary with facts, not personality adjectives.",
  "Write language levels with CEFR terms when you can.",
  "Remove unnecessary personal details.",
  "Turn duties into proof bullets with scope, tools, or outcomes.",
  "Check the CV against the vacancy before sending.",
];

const rewriteExamples = [
  {
    label: "Profile",
    weak: "Motivated team player with excellent communication skills looking for a challenging role.",
    strong:
      "Customer support specialist with 4 years of experience in SaaS and e-commerce teams. Strong in email, chat, complaint handling, and help-centre improvement. Looking for an English-speaking support role in the Netherlands.",
  },
  {
    label: "Language",
    weak: "Dutch: basic. English: good.",
    strong: "English: C1 professional. Dutch: A2, currently taking weekly lessons.",
  },
  {
    label: "Experience bullet",
    weak: "Responsible for customer communication and issue handling.",
    strong:
      "Handled 40-50 customer requests per day across email and chat, using Zendesk to resolve order, billing, and account issues.",
  },
];

const relatedResources = [
  {
    href: "/en/how-to-write-dutch-cv-without-speaking-dutch",
    title: "How to write a Dutch CV when you do not speak Dutch",
    body: "Use this if your biggest concern is language level, English-only vacancies, or relocation context.",
  },
  {
    href: "/en/dutch-cv-template",
    title: "Dutch CV template in English",
    body: "Use this if you already understand the mistakes and want the right structure.",
  },
  {
    href: "/en/dutch-cv-checker",
    title: "Dutch CV checker",
    body: "Upload your current CV and check Dutch-market fit, ATS readability, and missing information.",
  },
  {
    href: "/en/linkedin-to-cv-netherlands",
    title: "LinkedIn to CV Netherlands",
    body: "Best if your LinkedIn is stronger than your current CV and needs to become a focused PDF.",
  },
  {
    href: "/en/english-cv-example-netherlands",
    title: "English CV example Netherlands",
    body: "See profile tone, proof bullets, and section order before writing your own version.",
  },
  {
    href: "/en/europass-vs-dutch-cv-netherlands",
    title: "Europass vs Dutch CV",
    body: "Decide whether Europass is enough or whether a Dutch-market CV is the better application document.",
  },
];

const sources = [
  {
    title: "Work in NL - CV",
    href: "https://www.workinnl.nl/en/employment/cv-en/default.aspx",
    note:
      "Official Dutch employment guidance explaining that a CV should show who you are, what you can do, education, work history, and be clearly laid out.",
  },
  {
    title: "Europass - Create your CV",
    href: "https://europass.europa.eu/en/create-europass-cv",
    note:
      "European CV guidance on tailoring the CV to the job, focusing on facts, and using clear language.",
  },
  {
    title: "Government.nl - Prohibition of discrimination",
    href: "https://www.government.nl/themes/migration-and-travel/discrimination/prohibition-of-discrimination",
    note:
      "Official context for why unnecessary personal details should be treated carefully in Dutch professional documents.",
  },
];

const faqs = [
  {
    question: "Can I use an English CV in the Netherlands?",
    answer:
      "Yes, when the vacancy is in English or the working language is English. The safer approach is an English CV with Dutch-market structure, clear language levels, and direct proof.",
  },
  {
    question: "What is the biggest CV mistake English-speaking applicants make?",
    answer:
      "The biggest mistake is sending a generic international resume without adapting it to Dutch recruiter expectations: location, language level, target role, recent experience, and proof need to be easy to scan.",
  },
  {
    question: "Should I mention weak Dutch on my CV?",
    answer:
      "Yes. Use a clear level such as Dutch A1 or A2, and mention active learning if true. Hiding the language level often creates more doubt than being honest.",
  },
  {
    question: "Should I include a photo on a Dutch CV?",
    answer:
      "A photo is optional in the Netherlands. If you include one, use a simple professional photo. If you are unsure, skip it and focus on readable structure and strong evidence.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "7 Dutch CV mistakes English-speaking job seekers make",
  description:
    "Practical Dutch CV mistakes and fixes for English-speaking job seekers applying in the Netherlands.",
  inLanguage: "en-NL",
  mainEntityOfPage: pageUrl,
  datePublished: "2026-06-25",
  dateModified: "2026-06-25",
  author: { "@id": "https://werkcv.nl/#organization" },
  publisher: { "@id": "https://werkcv.nl/#organization" },
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

export default function DutchCvMistakesEnglishSpeakingJobSeekersPage() {
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
              { label: "Dutch CV mistakes", href: pagePath },
            ]}
          />
        </div>
      </div>

      <section className="border-b-4 border-black bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="mb-3 inline-block border-2 border-black bg-[#4ECDC4] px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-black">
            English-speaking applicants
          </p>
          <p className="mb-4 text-sm font-bold text-slate-600">Last reviewed {lastReviewed}</p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">
            7 Dutch CV mistakes English-speaking job seekers make
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-700">
            Most international CVs are not bad. They are often written for the wrong
            reader. A Dutch recruiter needs fast proof: what you do, where you fit,
            what language you can work in, and why this vacancy makes sense.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedLandingLink
              href="/en/dutch-cv-checker?startSource=en_cv_mistakes_hero"
              trackingLocation="en_cv_mistakes_hero"
              trackingLabel="check_current_cv"
              className="border-4 border-black bg-black px-6 py-3 text-sm font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Check my current CV
            </TrackedLandingLink>
            <TrackedLandingLink
              href="/en/editor?template=ats&startSource=en_cv_mistakes_hero"
              trackingLocation="en_cv_mistakes_hero"
              trackingLabel="build_dutch_cv"
              className="border-4 border-black bg-[#4ECDC4] px-6 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Build a Dutch-market CV
            </TrackedLandingLink>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-6xl px-6 py-12">
        <section className="mb-12 border-4 border-black bg-white p-6">
          <h2 className="text-3xl font-black text-slate-950">The short version</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">
            A good Dutch CV is direct. It should help the recruiter understand your
            target role, recent experience, location, language level, and evidence
            without decoding an international resume style.
          </p>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {quickFixes.map((item) => (
              <li key={item} className="border-2 border-black bg-[#FFFEF0] p-4 text-sm font-bold text-slate-900">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12 space-y-6">
          {mistakes.map((mistake, index) => (
            <section key={mistake.title} className="border-4 border-black bg-white p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">Mistake {index + 1}</p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">{mistake.title}</h2>
              <p className="mt-2 text-lg font-bold text-slate-800">{mistake.short}</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="border-2 border-black bg-red-50 p-4">
                  <h3 className="font-black text-slate-950">Why it hurts</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{mistake.problem}</p>
                </div>
                <div className="border-2 border-black bg-green-50 p-4">
                  <h3 className="font-black text-slate-950">What to do instead</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{mistake.fix}</p>
                </div>
              </div>
            </section>
          ))}
        </section>

        <section className="mb-12 border-4 border-black bg-[#E9FFFC] p-6">
          <h2 className="text-3xl font-black text-slate-950">Rewrite examples</h2>
          <p className="mt-3 max-w-3xl text-slate-700">
            The fix is usually not more impressive language. It is more useful information.
          </p>
          <div className="mt-6 space-y-4">
            {rewriteExamples.map((example) => (
              <div key={example.label} className="overflow-hidden border-4 border-black bg-white">
                <div className="border-b-2 border-black bg-black px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-white">
                  {example.label}
                </div>
                <div className="grid md:grid-cols-2">
                  <div className="border-b-2 border-black bg-red-50 p-4 md:border-b-0 md:border-r-2">
                    <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-red-700">Weak</p>
                    <p className="text-sm font-semibold leading-relaxed text-slate-800">{example.weak}</p>
                  </div>
                  <div className="bg-green-50 p-4">
                    <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-green-700">Stronger</p>
                    <p className="text-sm font-semibold leading-relaxed text-slate-900">{example.strong}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 border-4 border-black bg-black p-7 text-white">
          <h2 className="text-3xl font-black">Not sure which mistake is in your CV?</h2>
          <p className="mt-3 max-w-3xl text-slate-200">
            Upload your existing CV, check Dutch-market fit, then rebuild only the parts
            that need work. You can edit for free and pay only if you download the PDF.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <TrackedLandingLink
              href="/en/dutch-cv-checker?startSource=en_cv_mistakes_mid"
              trackingLocation="en_cv_mistakes_mid"
              trackingLabel="checker"
              className="border-4 border-white bg-[#4ECDC4] px-5 py-3 font-black text-black"
            >
              Check current CV
            </TrackedLandingLink>
            <TrackedLandingLink
              href="/en/templates?startSource=en_cv_mistakes_mid"
              trackingLocation="en_cv_mistakes_mid"
              trackingLabel="templates"
              className="border-4 border-white bg-white px-5 py-3 font-black text-black"
            >
              Compare templates
            </TrackedLandingLink>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-black text-slate-950">What to read next</h2>
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
            individual applications still depend on the vacancy and employer.
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
