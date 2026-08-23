import Link from "next/link";
import { buildEnglishMetadata } from "./metadata";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import MobileStickyCta from "@/components/landing/MobileStickyCta";
import EnglishRoleExampleBand from "./components/EnglishRoleExampleBand";
import { FAQJsonLd } from "@/components/seo/JsonLd";

export const metadata = buildEnglishMetadata({
  title: "English CV Builder for Jobs in the Netherlands",
  description:
    "Build an English CV for jobs in the Netherlands. Start free, use Dutch-market structure and ATS-safe templates, then pay €4.99 once to download the PDF.",
  path: "/en",
  nlPath: "/",
  keywords: [
    "english cv builder netherlands",
    "cv builder netherlands",
    "english cv netherlands",
    "create cv netherlands english",
    "cv maker netherlands english",
    "online cv maker netherlands",
    "english resume builder netherlands",
  ],
});

const pages = [
  {
    href: "/en/dutch-cv-mistakes-english-speaking-job-seekers",
    title: "Dutch CV Mistakes",
    description: "Avoid the common mistakes that make English-speaking applicants harder for Dutch recruiters to assess.",
  },
  {
    href: "/en/how-to-write-dutch-cv-without-speaking-dutch",
    title: "Write a Dutch CV Without Dutch",
    description: "How to apply in English, show Dutch level honestly, and reduce recruiter uncertainty.",
  },
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
    href: "/en/guides/one-page-cv-netherlands",
    title: "One-Page or Two-Page CV",
    description: "Choose the right length for your evidence instead of forcing every profile onto one page.",
  },
  {
    href: "/en/guides/startup-vs-corporate-cv-netherlands",
    title: "Startup vs Corporate CV",
    description: "Tailor ownership, scale, governance and keywords to the role and organisation.",
  },
  {
    href: "/en/guides/creative-cv-templates-netherlands",
    title: "Creative CV Templates",
    description: "Decide when visual branding is useful and how to keep the text readable for ATS and humans.",
  },
  {
    href: "/en/guides/recent-graduate-cv-netherlands",
    title: "Recent Graduate CV",
    description: "Turn projects, thesis work, internships, volunteering and part-time jobs into evidence.",
  },
  {
    href: "/en/dutch-cv-checker",
    title: "Dutch CV Checker",
    description: "Check whether your current English CV fits Dutch recruiter expectations before you rebuild it.",
  },
  {
    href: "/en/motivation-letter-netherlands",
    title: "Motivation Letter Netherlands",
    description: "Write a short, role-specific cover letter that fits Dutch recruiter expectations and stays aligned with your CV.",
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
    href: "/en/english-cv-example-data-engineer-netherlands",
    title: "Data Engineer CV Example",
    description: "English CV example for data engineers applying to Dutch data and analytics roles.",
  },
  {
    href: "/en/english-cv-example-customer-support-netherlands",
    title: "Customer Support CV Example",
    description: "English CV example for support agents and service specialists applying in the Netherlands.",
  },
  {
    href: "/en/english-cv-example-finance-accounting-netherlands",
    title: "Finance & Accounting CV Example",
    description: "English CV example for finance, accounting and reporting roles in the Netherlands.",
  },
  {
    href: "/en/english-cv-example-logistics-warehouse-netherlands",
    title: "Logistics & Warehouse CV Example",
    description: "English CV example for warehouse, order picking and logistics roles in the Netherlands.",
  },
  {
    href: "/en/english-cv-example-nurse-netherlands",
    title: "Nurse CV Example",
    description: "English CV example for nursing and healthcare roles in the Netherlands.",
  },
  {
    href: "/en/cv-netherlands-without-dutch-language",
    title: "CV Without Dutch Language",
    description: "How to target English-speaking roles while showing Dutch level honestly.",
  },
  {
    href: "/en/europass-vs-dutch-cv-netherlands",
    title: "Europass vs Dutch CV",
    description: "Decide when Europass is enough and when a Dutch-market CV works better for applications.",
  },
  {
    href: "/en/linkedin-to-cv-netherlands",
    title: "LinkedIn to CV Netherlands",
    description: "Turn your LinkedIn profile into a focused English CV for jobs in the Netherlands.",
  },
  {
    href: "/en/guides/cv-format-netherlands-english",
    title: "CV Format Netherlands English",
    description: "Use the updated format guide for section order, Europass context, ATS-safe layout and examples.",
  },
  {
    href: "/en/english-cv-example-netherlands",
    title: "English CV Example Netherlands",
    description: "See the tone, profile summary, and proof bullets before writing your own version.",
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

const howItWorks = [
  {
    step: "1",
    title: "Build or upload",
    description: "Start with an English template or upload your current PDF or Word CV to prefill the editor.",
  },
  {
    step: "2",
    title: "Review the complete CV",
    description: "Edit the content, compare templates and check the full preview before deciding whether to pay.",
  },
  {
    step: "3",
    title: "Download for €4.99",
    description: "Pay once when the PDF is ready. There is no subscription, trial renewal or monthly charge.",
  },
];

const englishHomeFaqs = [
  {
    question: "Can I build a CV for the Netherlands for free?",
    answer:
      "You can create an account, build or upload your CV, compare templates, and review the complete result for free. You pay a one-time €4.99 including VAT only when you choose to download the PDF.",
  },
  {
    question: "Is WerkCV a subscription?",
    answer:
      "No. There is no trial subscription, automatic renewal, or monthly charge. A PDF download is a one-time €4.99 payment including VAT.",
  },
  {
    question: "Can my Netherlands CV be written in English?",
    answer:
      "Yes. Use English when the vacancy and working language are English. Match a Dutch-language vacancy in Dutch unless the employer explicitly welcomes English applications. Keep official tool names and certifications in their recognised form.",
  },
  {
    question: "Can I upload my current resume or CV?",
    answer:
      "Yes. Upload a PDF or Word file to prefill the editor, then verify names, dates, bullets, and section order in the preview. Scans, tables, and complex multi-column documents may import less accurately.",
  },
  {
    question: "Do I need to speak Dutch to use WerkCV?",
    answer:
      "No. The English editor and guidance are designed for international applicants. On the CV, state your actual Dutch level honestly and focus on roles whose vacancy language and requirements match your situation.",
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
    href: "/en/linkedin-to-cv-netherlands",
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
    href: "https://europass.europa.eu/en/create-europass-cv",
    title: "Europass: Create your CV",
    description: "European CV guidance on readable language, tailoring and reverse-chronological experience.",
  },
  {
    href: "https://www.rijksoverheid.nl/onderwerpen/onderwijs-en-internationalisering/vraag-en-antwoord/wat-is-europass-en-wat-kan-ik-er-mee",
    title: "Dutch government: Europass",
    description: "Official Dutch government explanation of Europass as a European Commission initiative and EU-recognized standard.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://werkcv.nl/en#webpage",
      name: "English CV Builder for Jobs in the Netherlands",
      description:
        "Build an English CV with Dutch-market structure and download the finished PDF for a one-time €4.99 payment.",
      url: "https://werkcv.nl/en",
      inLanguage: "en-NL",
      isPartOf: { "@id": "https://werkcv.nl/#website" },
    },
    {
      "@type": "WebApplication",
      "@id": "https://werkcv.nl/en#cv-builder",
      name: "WerkCV English CV Builder",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      browserRequirements: "Requires JavaScript and a modern web browser.",
      url: "https://werkcv.nl/en/editor",
      description:
        "An English CV builder for job applications in the Netherlands with Dutch-market structure, ATS-safe templates and PDF export.",
      offers: {
        "@type": "Offer",
        price: "4.99",
        priceCurrency: "EUR",
        description: "One-time payment for the finished CV PDF download; no subscription.",
        availability: "https://schema.org/InStock",
      },
      featureList: [
        "Build or upload an English CV",
        "Dutch-market CV structure",
        "ATS-safe templates",
        "Full CV preview before payment",
        "One-time PDF download payment",
      ],
    },
  ],
};

export default function EnglishHubPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="wk-section">
        <div className="wk-container">
          <span className="wk-badge wk-badge-accent mb-4">English CV for the Netherlands</span>
          <div className="mb-4 flex flex-wrap gap-2">
            {["Start free", "One-time €4.99 PDF download", "No subscription"].map((badge) => (
              <span key={badge} className="wk-trust-pill">
                {badge}
              </span>
            ))}
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">
            Build an <span className="wk-hero-highlight">English CV</span> for jobs in the Netherlands
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-[var(--wk-ink-muted)]">
            Use WerkCV when you want English CV content with Dutch-market structure:
            clear section order, practical proof, language levels, ATS-safe layout and
            examples for jobs in the Netherlands.
          </p>
          <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-[var(--wk-ink)]">
            Start for free, finish your CV first, and only pay a one-time €4.99 when you want the PDF.
            No subscription, no trial trap, and no auto-renewal.
          </p>
          <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <TrackedLandingLink
              href="/en/editor?template=professional&startSource=en_home_hero"
              trackingLocation="english_hub_hero"
              trackingLabel="build_netherlands_cv"
              className="wk-button wk-button-primary"
            >
              Build my Netherlands CV
            </TrackedLandingLink>
            <TrackedLandingLink
              href="/en/editor?upload=1&startSource=en_home_upload"
              trackingLocation="english_hub_hero"
              trackingLabel="upload_current_cv"
              className="wk-button wk-button-secondary"
            >
              Upload my current CV
            </TrackedLandingLink>
          </div>
          <div className="mt-4">
            <Link
              href="/en/guides/cv-format-netherlands-english"
              className="text-sm font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
            >
              Read the Netherlands CV format guidance
            </Link>
          </div>
          <p className="mt-4 text-sm leading-6 text-[var(--wk-ink-muted)]">
            Best for expats, international students, English-speaking professionals and candidates applying to Dutch companies in English.
          </p>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="wk-card wk-card-accent p-6 md:p-8">
            <div className="max-w-3xl">
              <div className="wk-eyebrow mb-3">
                <span>How WerkCV works</span>
              </div>
              <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
                Create your English CV before you pay
              </h2>
              <p className="mt-3 text-base leading-7 text-[var(--wk-ink-muted)] md:text-lg md:leading-8">
                Build and review the complete CV first. Payment is only required when you choose to download the finished PDF.
              </p>
            </div>
            <ol className="mt-6 grid gap-5 md:grid-cols-3">
              {howItWorks.map((item) => (
                <li
                  key={item.step}
                  className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-5"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--wk-accent-soft)] font-semibold text-[var(--wk-primary)]">
                    {item.step}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-[var(--wk-ink)]">{item.title}</h3>
                  <p className="mt-2 leading-7 text-[var(--wk-ink-muted)]">{item.description}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mb-12 mt-12">
            <EnglishRoleExampleBand trackingLocation="english_hub_role_examples" />
          </div>

          <div className="mb-12 grid gap-5 md:grid-cols-3">
            {proofPoints.map((point) => (
              <div key={point.title} className="wk-card p-5">
                <h2 className="text-xl font-semibold text-[var(--wk-ink)]">{point.title}</h2>
                <p className="mt-2 leading-7 text-[var(--wk-ink-muted)]">{point.description}</p>
              </div>
            ))}
          </div>

          <div className="wk-card mb-12 p-6 md:p-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
                Choose the fastest route for your situation
              </h2>
              <p className="mt-3 text-base leading-7 text-[var(--wk-ink-muted)] md:text-lg">
                Do not start by reading every guide. Pick the path that matches the job you need done:
                build now, fix format, adapt a student profile, improve ATS match or convert LinkedIn.
              </p>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {startPaths.map((path) => (
                <Link
                  key={path.href}
                  href={path.href}
                  className="block rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-5 transition-colors hover:border-[var(--wk-primary)] hover:bg-[var(--wk-accent-soft)]"
                >
                  <h3 className="mb-2 text-xl font-semibold text-[var(--wk-ink)]">{path.title}</h3>
                  <p className="text-[var(--wk-ink-muted)]">{path.description}</p>
                  <span className="wk-button wk-button-secondary wk-button-small mt-4">
                    {path.cta}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="wk-card wk-card-accent mb-12 p-6 md:p-8">
            <h2 className="mb-3 text-3xl font-semibold text-[var(--wk-ink)]">
              What belongs on a Dutch CV in English?
            </h2>
            <p className="max-w-3xl text-base leading-8 text-[var(--wk-ink-muted)] md:text-lg">
              A strong Netherlands CV in English usually includes contact details, city or relocation context,
              one target role, a short profile, recent work experience first, education, skills, languages,
              certifications and optional links. Keep the writing practical: tools, scope, outcomes and
              vacancy language matter more than long career storytelling.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/en/guides/cv-format-netherlands-english" className="wk-button wk-button-secondary">
                Read the full format guide
              </Link>
              <Link href="/en/dutch-cv-template" className="wk-button wk-button-primary">
                Open Dutch CV template guide
              </Link>
            </div>
          </div>

          <div className="mb-6 max-w-3xl">
            <h2 className="mb-3 text-3xl font-semibold text-[var(--wk-ink)]">
              English CV resources
            </h2>
            <p className="text-base leading-7 text-[var(--wk-ink-muted)] md:text-lg">
              These pages are split by intent so the hub does not compete with the detailed guides.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {pages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="wk-card block p-6 transition-colors hover:border-[var(--wk-primary)]"
              >
                <h2 className="mb-2 text-2xl font-semibold text-[var(--wk-ink)]">{page.title}</h2>
                <p className="text-[var(--wk-ink-muted)]">{page.description}</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 border-t border-[var(--wk-border)] pt-12">
            <div className="max-w-3xl">
              <h2 className="mb-3 text-3xl font-semibold text-[var(--wk-ink)]">
                Practical Tools for Expats Applying in the Netherlands
              </h2>
              <p className="text-base leading-7 text-[var(--wk-ink-muted)] md:text-lg">
                CV format is only one part of the move. These tools help you compare routes,
                salary thresholds, and job-title wording before you localize your applications.
              </p>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {expatTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="wk-card block p-6 transition-colors hover:border-[var(--wk-primary)]"
                >
                  <h3 className="mb-2 text-xl font-semibold text-[var(--wk-ink)]">{tool.title}</h3>
                  <p className="text-[var(--wk-ink-muted)]">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="wk-card mt-12 p-6 md:p-8">
            <h2 className="mb-3 text-3xl font-semibold text-[var(--wk-ink)]">
              Sources behind this hub
            </h2>
            <p className="max-w-3xl text-base leading-7 text-[var(--wk-ink-muted)] md:text-lg">
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
                  className="block rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4 transition-colors hover:border-[var(--wk-primary)] hover:bg-[var(--wk-accent-soft)]"
                >
                  <h3 className="text-sm font-semibold text-[var(--wk-ink)]">{source.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{source.description}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/en/editor?template=professional&startSource=en_home_bottom"
              className="wk-button wk-button-primary"
            >
              Open English editor
            </Link>
            <Link
              href="/en/templates?startSource=en_home_template_compare"
              className="wk-button wk-button-secondary"
            >
              Open CV Templates
            </Link>
            <Link
              href="/en/dutch-cv-examples"
              className="wk-button wk-button-secondary"
            >
              English CV examples
            </Link>
            <Link
              href="/en/english-cv-example-netherlands"
              className="wk-button wk-button-secondary"
            >
              Netherlands example
            </Link>
          </div>

          <div className="wk-card mt-12 p-6 md:p-8">
            <div className="wk-eyebrow mb-3">
              <span>Before you start</span>
            </div>
            <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">English CV builder questions</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {englishHomeFaqs.map((item) => (
                <details
                  key={item.question}
                  className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] p-4"
                >
                  <summary className="cursor-pointer font-semibold text-[var(--wk-ink)]">{item.question}</summary>
                  <p className="mt-3 leading-7 text-[var(--wk-ink-muted)]">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
      <MobileStickyCta
        variant="brand"
        text="Start free. Final PDF €4.99 including VAT. No subscription."
        buttonLabel="Build my CV"
        href="/en/editor?template=professional&startSource=en_home_sticky"
        trackingLocation="english_hub_mobile_sticky"
        trackingLabel="build_netherlands_cv"
      />
      <FAQJsonLd questions={englishHomeFaqs} />
    </main>
  );
}
