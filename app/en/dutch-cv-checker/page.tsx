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
    href: "/en/cv-job-match-checker",
    title: "CV and job match checker",
    body: "Use this when you have a specific vacancy and want to see which requirements your CV supports or leaves unclear.",
  },
  {
    href: "/en/dutch-cv-template",
    title: "Dutch CV template",
    body: "Best next step when the content is okay but the final layout and section order still need a Dutch-style format.",
  },
  {
    href: "/en/guides/cv-format-netherlands-english",
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
    <main>
      <FAQJsonLd questions={faqItems} />

      <div className="wk-container py-10 pb-28 md:pb-10">
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
                <span key={badge} className="wk-trust-pill">
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">
              Check whether your CV fits <span className="wk-hero-highlight">Dutch recruiter</span> expectations
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--wk-ink-muted)]">
              Use this page when your CV is already in English, but you want to know whether it still works for jobs in the Netherlands. The check focuses on ATS readability and the local signals recruiters usually expect: clear section order, direct summaries, reverse-chronological experience, language levels and LinkedIn consistency.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--wk-ink-muted)]">
              This page was shaped against current public guidance from Work in NL and Europass, plus recent expat forum questions around photo use, references, page length and LinkedIn alignment, checked on <span className="font-semibold text-[var(--wk-ink)]">{checkedDate}</span>.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="#checker"
                trackingLocation="dutch-cv-checker:hero_primary"
                trackingLabel="Check my Dutch CV fit"
                ctaEventName="cta_resume_optimizer_en_hero"
                className="wk-button wk-button-primary"
              >
                Check my Dutch CV fit
              </TrackedLandingLink>
              <Link href="/en/dutch-cv-template" className="wk-button wk-button-secondary">
                Build the Dutch-style version
              </Link>
            </div>
          </div>

          <aside className="wk-card h-fit p-6">
            <div className="wk-eyebrow mb-2">
              <span>Best use</span>
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--wk-ink)]">
              Check first, rebuild second
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
              <p>1. Upload or paste your current CV.</p>
              <p>2. Fix the structural and ATS issues first.</p>
              <p>3. Rebuild the final version in a cleaner Dutch-style format.</p>
            </div>
          </aside>
        </section>

        <section id="checker" className="mb-12 scroll-mt-24">
          <AtsCheckerTool
            locale="en"
            editorHref="/en/editor"
            templatesHref="/en/templates"
            toolName="dutch-cv-checker"
            trackingPrefix="dutch-cv-checker"
          />
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <article className="wk-card p-6">
            <div className="wk-eyebrow mb-2">
              <span>Official baseline</span>
            </div>
            <h2 className="mt-2 text-3xl font-semibold text-[var(--wk-ink)]">
              What current Dutch and EU guidance keeps consistent
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--wk-ink-muted)]">
              <p>Work in NL says a CV should clearly show who you are, what you can do and where you have worked, and that readers should be able to understand your education and work experience quickly.</p>
              <p>Europass emphasizes the same fundamentals: tailor the profile, focus on the facts that match the vacancy, use clear language and keep experience in reverse chronological order.</p>
              <p>So the Dutch CV check is less about visual style and more about clarity, relevance and easy scanning.</p>
            </div>
          </article>

          <article className="wk-card p-6">
            <div className="wk-eyebrow mb-2">
              <span>What this check should catch</span>
            </div>
            <h2 className="mt-2 text-3xl font-semibold text-[var(--wk-ink)]">
              The issues internationals most often miss
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--wk-ink-muted)] marker:text-[var(--wk-ink)]">
              <li>Your summary is too generic and does not match the Dutch vacancy language.</li>
              <li>Your CV is readable in English, but too decorative or too broad for ATS parsing.</li>
              <li>Your contact details, city, language levels or LinkedIn profile are missing or inconsistent.</li>
              <li>You included extra personal data that Dutch employers usually do not need on the page.</li>
            </ul>
          </article>
        </section>

        <section className="mb-12">
          <div className="wk-eyebrow mb-2">
            <span>Recent expat signal</span>
          </div>
          <h2 className="mt-2 text-3xl font-semibold text-[var(--wk-ink)]">
            Common questions people keep asking about Dutch CVs
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {localSignals.map((item) => (
              <article key={item.title} className="wk-card p-5">
                <h3 className="text-lg font-semibold text-[var(--wk-ink)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <WhyWerkCvSection locale="en" />

        <section className="mb-12">
          <div className="wk-eyebrow mb-2">
            <span>Sources checked</span>
          </div>
          <h2 className="mt-2 text-3xl font-semibold text-[var(--wk-ink)]">
            Public guidance used for this checker page
          </h2>
          <div className="mt-6 space-y-3">
            {sourceLinks.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="block rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-4 text-sm leading-6 text-[var(--wk-ink-muted)] transition-colors hover:bg-[var(--wk-accent-soft)]"
              >
                <span className="font-semibold text-[var(--wk-ink)]">{source.title}</span>
                <span className="mt-1 block break-all">{source.href}</span>
                <span className="mt-2 block text-xs leading-5 text-[var(--wk-ink-muted)]">{source.body}</span>
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
          supportLine="Start free. Final PDF €4.99 including VAT. No subscription."
          buttonLabel="Open English editor"
          buttonHref="/en/editor"
          trackingLocation="dutch-cv-checker:bottom_primary"
          trackingLabel="Open English editor"
        />
      </div>

      <Footer variant="brand" uiLanguage="en" />
    </main>
  );
}
