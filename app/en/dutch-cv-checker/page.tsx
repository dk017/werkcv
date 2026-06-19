import Link from "next/link";
import Footer from "@/components/Footer";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { FaqCardSection, FinalCtaSection, LinkCardSection, WhyWerkCvSection, type OptimizerFaqItem, type OptimizerLinkCard } from "@/components/landing/CvOptimizerSections";
import AtsCheckerTool from "@/app/tools/ats-cv-checker/AtsCheckerTool";
import { buildEnglishMetadata } from "../metadata";

const checkedDate = "June 7, 2026";

const faqItems: OptimizerFaqItem[] = [
  {
    question: "What does this Dutch CV checker actually check?",
    answer:
      "It checks whether your current CV is readable, ATS-friendly and aligned with common Dutch hiring expectations such as clear section order, reverse-chronological experience, role-relevant wording, language levels and professional contact details.",
  },
  {
    question: "Is this the same as a generic ATS checker?",
    answer:
      "Not exactly. The underlying scan still checks ATS readability, but this page is framed for Dutch-market applications, where practical structure, a direct summary, one-to-two-page focus and LinkedIn consistency matter more than decorative resume design.",
  },
  {
    question: "Should I include a photo on a Dutch CV?",
    answer:
      "Usually it is optional. Recent expat discussions suggest many larger or international employers in the Netherlands are fine without one. If you are unsure, leave it out unless the role clearly benefits from it.",
  },
  {
    question: "Should references appear on a Dutch CV?",
    answer:
      "Usually no. Recent Netherlands-focused discussions suggest references are typically not expected on the CV itself unless a vacancy or application process specifically asks for them.",
  },
  {
    question: "Can I use this checker if my CV is in English?",
    answer:
      "Yes. This page is designed exactly for that case: English CV content that still needs to fit Dutch recruiter expectations and ATS readability.",
  },
];

const routeLinks: OptimizerLinkCard[] = [
  {
    href: "/en/dutch-cv-template",
    title: "Dutch CV template",
    body: "Best next step when the content is okay but the final layout and section order still need a Dutch-style format.",
  },
  {
    href: "/en/netherlands-cv-format",
    title: "Netherlands CV format",
    body: "Use this if you need the structural rules behind the checker: page length, section order, language choice and summary style.",
  },
  {
    href: "/en/ats-resume-netherlands",
    title: "ATS resume Netherlands",
    body: "Helpful if your biggest problem is missing keywords, unclear headings or a design that hurts ATS parsing.",
  },
  {
    href: "/en/resume-optimizer-netherlands",
    title: "Resume optimizer Netherlands",
    body: "Go here if you want a broader guide to rewrite wording, improve clarity and tailor your CV to Dutch vacancies.",
  },
];

const sourceLinks = [
  {
    href: "https://www.workinnl.nl/en/employment/cv-en/default.aspx",
    title: "Work in NL: CV",
    body: "Official Dutch employment guidance says a CV should clearly show who you are, what you can do and where you have worked, and should be laid out so readers can quickly understand your education and work experience.",
  },
  {
    href: "https://europass.europa.eu/en/create-europass-cv",
    title: "Europass CV guidance",
    body: "Official Europass guidance emphasizes tailoring the profile, using clear language and keeping work history in reverse chronological order.",
  },
];

const localSignals = [
  {
    title: "Photo is usually optional",
    body: "Recent expat discussions point in the same direction: for larger and international employers, leaving the photo out is often completely fine.",
  },
  {
    title: "Do not overload personal details",
    body: "A Dutch CV usually does not need date of birth, marital status, BSN, passport number or residence permit number on the page.",
  },
  {
    title: "Keep it practical and scan-friendly",
    body: "The recurring signal is one to two pages, simple headings, recent experience first and a direct tone over decorative personal branding.",
  },
  {
    title: "Your LinkedIn should match",
    body: "A mismatched headline, different dates or inconsistent role focus between CV and LinkedIn can reduce trust quickly with Dutch recruiters.",
  },
];

export const metadata = buildEnglishMetadata({
  title: "Dutch CV checker for jobs in the Netherlands",
  description:
    "Check whether your English CV fits Dutch recruiter expectations. Review ATS readability, section order, language levels, LinkedIn match and local CV norms before you apply.",
  path: "/en/dutch-cv-checker",
  keywords: [
    "dutch cv checker",
    "check cv for netherlands",
    "resume check netherlands",
    "english cv check netherlands",
    "dutch recruiter cv check",
    "ats cv check netherlands",
  ],
  type: "article",
});

export default function DutchCvCheckerPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      <FAQJsonLd questions={faqItems} />

      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/en" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
            </span>
          </Link>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/en/dutch-cv-template"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Dutch CV template
            </Link>
            <TrackedLandingLink
              href="/en/editor"
              trackingLocation="dutch-cv-checker:header_primary"
              trackingLabel="Open English editor"
              ctaEventName="cta_resume_optimizer_en_hero"
              className="border-2 border-black bg-[#4ECDC4] px-4 py-2 text-sm font-black text-black"
            >
              Open English editor
            </TrackedLandingLink>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 pb-28 md:pb-10">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/en" },
              { label: "Dutch CV checker", href: "/en/dutch-cv-checker" },
            ]}
          />
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {["Dutch CV check", "ATS readability", "1-2 pages", "Photo optional"].map((badge) => (
                <span
                  key={badge}
                  className="border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-black"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              Check whether your CV fits Dutch recruiter expectations
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Use this page when your CV is already in English, but you want to know whether it still works for jobs in the Netherlands. The check focuses on ATS readability and the local signals recruiters usually expect: clear section order, direct summaries, reverse-chronological experience, language levels and LinkedIn consistency.
            </p>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
              This page was shaped against current public guidance from Work in NL and Europass, plus recent expat forum questions around photo use, references, page length and LinkedIn alignment, checked on <span className="font-black text-black">{checkedDate}</span>.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="#checker"
                trackingLocation="dutch-cv-checker:hero_primary"
                trackingLabel="Check my Dutch CV fit"
                ctaEventName="cta_resume_optimizer_en_hero"
                className="border-4 border-black bg-[#4ECDC4] px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Check my Dutch CV fit
              </TrackedLandingLink>
              <Link
                href="/en/dutch-cv-template"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Build the Dutch-style version
              </Link>
            </div>
          </div>

          <aside className="h-fit border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Best use
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Check first, rebuild second
            </h2>
            <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <p>1. Upload or paste your current CV.</p>
              <p>2. Fix the structural and ATS issues first.</p>
              <p>3. Rebuild the final version in a cleaner Dutch-style format.</p>
            </div>
          </aside>
        </section>

        <section id="checker" className="mb-12">
          <AtsCheckerTool
            locale="en"
            editorHref="/en/editor"
            templatesHref="/en/templates"
            toolName="dutch-cv-checker"
            trackingPrefix="dutch-cv-checker"
          />
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Official baseline
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              What current Dutch and EU guidance keeps consistent
            </h2>
            <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <p>Work in NL says a CV should clearly show who you are, what you can do and where you have worked, and that readers should be able to understand your education and work experience quickly.</p>
              <p>Europass emphasizes the same fundamentals: tailor the profile, focus on the facts that match the vacancy, use clear language and keep experience in reverse chronological order.</p>
              <p>So the Dutch CV check is less about visual style and more about clarity, relevance and easy scanning.</p>
            </div>
          </article>

          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              What this check should catch
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              The issues internationals most often miss
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm font-medium leading-relaxed text-slate-700 marker:text-black">
              <li>Your summary is too generic and does not match the Dutch vacancy language.</li>
              <li>Your CV is readable in English, but too decorative or too broad for ATS parsing.</li>
              <li>Your contact details, city, language levels or LinkedIn profile are missing or inconsistent.</li>
              <li>You included extra personal data that Dutch employers usually do not need on the page.</li>
            </ul>
          </article>
        </section>

        <section className="mb-12">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Recent expat signal
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Common questions people keep asking about Dutch CVs
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {localSignals.map((item) => (
              <article
                key={item.title}
                className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <WhyWerkCvSection locale="en" />

        <section className="mb-12">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Sources checked
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Public guidance used for this checker page
          </h2>
          <div className="mt-6 space-y-3">
            {sourceLinks.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="block border-2 border-black bg-white p-4 text-sm font-medium text-slate-700 transition-colors hover:bg-[#E9FFFC]"
              >
                <span className="font-black text-black">{source.title}</span>
                <span className="mt-1 block break-all">{source.href}</span>
                <span className="mt-2 block text-xs leading-relaxed text-slate-600">{source.body}</span>
              </a>
            ))}
          </div>
        </section>

        <LinkCardSection
          eyebrow="Next routes"
          title="Useful pages after this Dutch CV check"
          links={routeLinks}
        />

        <FaqCardSection
          title="Dutch CV checker FAQ"
          items={faqItems}
        />

        <FinalCtaSection
          title="Need the final Dutch-style version next?"
          description="Use the check to spot the issues first, then move into the English WerkCV editor to rebuild the final version in a cleaner Dutch-market structure."
          supportLine="Start free, stay on the English route, and only pay when you want the final PDF."
          buttonLabel="Open English editor"
          buttonHref="/en/editor"
          trackingLocation="dutch-cv-checker:bottom_primary"
          trackingLabel="Open English editor"
        />
      </main>

      <Footer uiLanguage="en" />
    </div>
  );
}
