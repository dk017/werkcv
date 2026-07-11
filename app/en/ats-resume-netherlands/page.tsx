import Link from "next/link";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import MobileStickyCta from "@/components/landing/MobileStickyCta";
import LanguageSwitcher from "@/components/LanguageSwitcher";
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
  "Follow the requested file format; otherwise use a text-based PDF.",
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
      "Many larger employers, agencies, and career portals use applicant tracking software, but its role varies. One system may only store and search applications, while another may add screening questions or matching. Recruiters can still review CVs manually.",
  },
  {
    question: "Can an ATS automatically reject my CV?",
    answer:
      "It can when an employer configures knockout questions or filters, but not every vacancy works that way. A rejection may also result from human review, missing requirements, or competition, so an external score cannot reveal the exact cause.",
  },
  {
    question: "What layout has the lowest ATS risk?",
    answer:
      "A simple single-column layout with standard headings and selectable text is the cautious option. Keep essential details out of images, charts, and decorative text boxes. Some systems parse complex layouts well, but you rarely know the configuration in advance.",
  },
  {
    question: "Should my CV be in English or Dutch for ATS screening?",
    answer:
      "Match the vacancy language. If the job post is English, use English keywords. If the vacancy is Dutch, use Dutch section headings and Dutch role terms unless the industry normally uses English tool names.",
  },
  {
    question: "Is PDF safe for ATS systems in the Netherlands?",
    answer:
      "Follow the vacancy or upload form first. If no format is specified, a text-based PDF is a practical choice when all text can be selected and copied in a logical order. Use DOCX when the employer explicitly requests it, and avoid scans.",
  },
  {
    question: "How should I use keywords from a Dutch vacancy?",
    answer:
      "Identify relevant job titles, responsibilities, tools, certifications, and skills. Use recognisable wording where it truthfully describes your background, then prove it inside experience bullets. Do not repeat terms that you cannot support.",
  },
];

const beforeAfterExample = {
  vacancy:
    "Vacancy signal: Customer Success Specialist in Amsterdam, SaaS onboarding, CRM, stakeholder communication, Dutch and English clients.",
  before:
    "Responsible for helping customers, answering questions and keeping systems updated.",
  after:
    "Customer Success Specialist supporting Dutch and English SaaS clients with onboarding, CRM follow-up and stakeholder communication across sales and support teams.",
};

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
    <main className="min-h-screen bg-[#FFFEF9] pb-20 md:pb-0">
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
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher tone="solid" />
          </div>
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
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <TrackedLandingLink
              href="/en/editor"
              trackingLocation="ats_resume_netherlands_hero"
              trackingLabel="build_ats_cv"
              className="bg-black text-white font-bold px-5 py-3 border-4 border-black"
            >
              Build my ATS-safe CV
            </TrackedLandingLink>
            <TrackedLandingLink
              href="/en/dutch-cv-checker"
              trackingLocation="ats_resume_netherlands_hero"
              trackingLabel="check_existing_cv"
              className="text-sm font-semibold text-slate-600 underline decoration-slate-400 underline-offset-4 hover:text-slate-950"
            >
              Check my current CV
            </TrackedLandingLink>
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

        <div className="bg-black text-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(78,205,196,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#4ECDC4]">
            Dutch ATS context
          </p>
          <h2 className="mt-2 text-3xl font-black mb-3">
            Why ATS matters more in the Netherlands than many expats expect
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-200">
            <p>
              Dutch applications often look personal and human on the surface, but the intake process is increasingly
              structured. Job boards, recruitment agencies, corporate portals and HR platforms still need to parse your
              CV into fields such as name, role, experience, education, skills and location.
            </p>
            <p>
              That means a CV can lose clarity before a recruiter reads it. A two-column design, missing section
              headings or broad wording like “helped customers” gives the system fewer reliable signals than a clean
              CV that mirrors the actual vacancy language.
            </p>
            <p>
              For international candidates, the biggest mistake is often mixing formats: an American-style resume,
              Dutch vacancy keywords and a design-heavy template. Keep the layout simple and let your wording carry the
              relevance.
            </p>
          </div>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-600">
            Worked example
          </p>
          <h2 className="mt-2 text-3xl font-black mb-3">Before and after: matching a Dutch vacancy</h2>
          <p className="text-gray-700 mb-5">
            A small rewrite can make the same experience easier for both ATS software and a Dutch recruiter to
            understand.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="border-2 border-black bg-[#E9FFFC] p-4">
              <h3 className="font-black text-gray-900">Vacancy language</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">{beforeAfterExample.vacancy}</p>
            </article>
            <article className="border-2 border-black bg-[#FFFEF9] p-4">
              <h3 className="font-black text-gray-900">Before</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">{beforeAfterExample.before}</p>
            </article>
            <article className="border-2 border-black bg-[#FFD166] p-4">
              <h3 className="font-black text-gray-900">After</h3>
              <p className="mt-2 text-sm font-bold leading-relaxed text-gray-900">{beforeAfterExample.after}</p>
            </article>
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
            <Link href="/en/dutch-cv-checker" className="underline font-bold">
              Dutch CV checker
            </Link>
            <Link href="/en/guides/netherlands-cv-keywords-ats" className="underline font-bold">
              ATS keyword guide
            </Link>
            <Link href="/en/guides/cv-format-netherlands-english" className="underline font-bold">
              Netherlands CV format
            </Link>
            <Link href="/en/dutch-cv-template" className="underline font-bold">
              Dutch CV template
            </Link>
            <Link href="/en/profile-photo" className="underline font-bold">
              AI profile photo
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
      <MobileStickyCta
        text="Build an ATS-safe Netherlands CV."
        buttonLabel="Start CV"
        href="/en/editor"
        trackingLocation="ats_resume_netherlands_mobile_sticky"
        trackingLabel="build_ats_cv"
      />
    </main>
  );
}
