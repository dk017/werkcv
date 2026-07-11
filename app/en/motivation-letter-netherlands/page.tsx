import Link from "next/link";
import Footer from "@/components/Footer";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { FaqCardSection, FinalCtaSection, LinkCardSection, WhyWerkCvSection, type OptimizerFaqItem, type OptimizerLinkCard } from "@/components/landing/CvOptimizerSections";
import SollicitatiebriefTool from "@/app/tools/sollicitatiebrief-generator/SollicitatiebriefTool";
import { buildEnglishMetadata } from "../metadata";

const checkedDate = "July 11, 2026";

const faqItems: OptimizerFaqItem[] = [
  {
    question: "Is a motivation letter still important in the Netherlands?",
    answer:
      "Sometimes yes, sometimes not. Recent Dutch discussion shows the value depends strongly on the sector and level. But when a letter is requested, it should add role-specific motivation and context that your CV alone does not show clearly.",
  },
  {
    question: "What do Dutch recruiters usually want from a motivation letter?",
    answer:
      "A short, concrete letter that shows you understand the vacancy, can connect your experience to the role, and can explain your motivation without repeating your CV line by line.",
  },
  {
    question: "How long should a motivation letter be for Dutch jobs?",
    answer:
      "Usually one page at most. A practical target is around 180 to 260 words in short paragraphs, unless the employer or institution explicitly asks for more.",
  },
  {
    question: "Should I call it a motivation letter or a cover letter?",
    answer:
      "For jobs in English, cover letter is usually the more natural term. In the Netherlands, people often use motivation letter and cover letter interchangeably in job-search conversations, but the expected function is the same: explain fit and motivation for that specific role.",
  },
  {
    question: "Should the letter repeat my CV?",
    answer:
      "No. It should interpret your strongest CV evidence, not duplicate every section. Use one or two relevant examples and explain why they matter for this vacancy.",
  },
];

const routeLinks: OptimizerLinkCard[] = [
  {
    href: "/en/dutch-cv-template",
    title: "Dutch CV template",
    body: "Best next step when the letter is ready and you need the CV to match the same Dutch-market tone and structure.",
  },
  {
    href: "/sollicitatiebrief-in-engels",
    title: "English cover letter examples",
    body: "Useful if you want more copy-ready examples and common Dutch-to-English phrasing fixes before generating your own version.",
  },
  {
    href: "/tools/sollicitatiebrief-generator",
    title: "Main generator page",
    body: "Go here if you prefer the generic tool page and Dutch-language routes around openings, examples and no-experience letters.",
  },
  {
    href: "/en/dutch-cv-checker",
    title: "Dutch CV checker",
    body: "Use this if your CV still needs checking for Dutch recruiter expectations before you send the full application package.",
  },
];

const signalCards = [
  {
    title: "Short beats impressive",
    body: "The recurring Netherlands signal is not to overdo the letter. Recruiters and admissions readers prefer a clear argument over a long performance.",
  },
  {
    title: "Tie it back to the CV",
    body: "Recent forum advice keeps repeating the same point: your letter should point to the strongest parts of your CV, not overwrite or restate everything already there.",
  },
  {
    title: "Sector matters",
    body: "Some Dutch professionals say letters barely matter at senior level, while others still value them when motivation or field-fit is not obvious from the CV alone.",
  },
];

const expectations = [
  "State the role and strongest fit early instead of opening with generic excitement.",
  "Use one or two concrete examples that connect directly to the vacancy.",
  "Explain why this employer or role makes sense for your next step.",
  "Keep the tone direct, practical and less theatrical than many generic AI letters.",
  "Make sure the wording still matches your CV and LinkedIn profile.",
];

const commonMistakes = [
  "Repeating your CV line by line instead of adding context.",
  "Writing a long universal letter and barely tailoring the company or role.",
  "Using robotic AI phrasing or overblown adjectives without proof.",
  "Making the letter longer than one page when the point can be made faster.",
  "Translating Dutch phrasing too literally into English.",
];

const sourceLinks = [
  {
    href: "https://student.uva.nl/en/information/writing-a-cover-letter",
    title: "University of Amsterdam: Writing a cover letter",
    body: "Current June 2026 guidance says the letter should supplement rather than repeat the CV, stay concise, and connect your qualities to the employer's needs.",
  },
  {
    href: "https://www.workinnl.nl/en/employment/cv-en/default.aspx",
    title: "Work in NL: CV and covering letter",
    body: "Official Dutch employment guidance says you usually send a CV and a covering letter when applying to a company in the Netherlands.",
  },
  {
    href: "https://europass.europa.eu/en/create-europass-cover-letter?ar_ref=RLFHuOTFEj",
    title: "Europass cover letter editor",
    body: "Official Europass guidance frames the cover letter as a structured application document with the essential information, built alongside the CV.",
  },
];

export const metadata = buildEnglishMetadata({
  title: "Motivation letter for jobs in the Netherlands",
  description:
    "Write a motivation letter / cover letter that fits Dutch recruiter expectations. Learn when it matters, what to include, what to avoid, and generate a cleaner English version.",
  path: "/en/motivation-letter-netherlands",
  keywords: [
    "motivation letter netherlands",
    "cover letter netherlands",
    "english cover letter dutch jobs",
    "motivation letter dutch recruiter",
    "cover letter for jobs in netherlands",
    "dutch job application letter",
  ],
  type: "article",
});

export default function MotivationLetterNetherlandsPage() {
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
              trackingLocation="motivation-letter-netherlands:header_primary"
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
              { label: "Motivation letter Netherlands", href: "/en/motivation-letter-netherlands" },
            ]}
          />
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {["Cover letter", "Dutch jobs", "One page", "CV-aligned"].map((badge) => (
                <span
                  key={badge}
                  className="border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-black"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              Write a motivation letter that fits Dutch recruiter expectations
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Use this page when you are applying in English in the Netherlands and want your motivation letter to sound clear, specific and credible, not generic or overpolished. The Dutch-market baseline is usually short, concrete and tightly connected to your CV.
            </p>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
              This page was shaped against current public guidance from Work in NL and Europass, plus recent Dutch and expat discussion about whether letters still matter, how long they should be, and what makes them sound useful instead of robotic, checked on <span className="font-black text-black">{checkedDate}</span>.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="#generator"
                trackingLocation="motivation-letter-netherlands:hero_primary"
                trackingLabel="Generate Dutch-market letter"
                ctaEventName="cta_resume_optimizer_en_hero"
                className="border-4 border-black bg-[#4ECDC4] px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Generate Dutch-market letter
              </TrackedLandingLink>
              <Link
                href="/en/dutch-cv-template"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Match it with your CV
              </Link>
            </div>
          </div>

          <aside className="h-fit border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Quick rule
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Add motivation, not repetition
            </h2>
            <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <p>1. State the role and your strongest fit early.</p>
              <p>2. Use one or two concrete examples, not broad claims.</p>
              <p>3. Explain why this role or employer fits your next step.</p>
              <p>4. Keep it short enough that a recruiter can finish it fast.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12 grid gap-5 md:grid-cols-3">
          {signalCards.map((card) => (
            <article
              key={card.title}
              className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="text-xl font-black text-black">{card.title}</h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{card.body}</p>
            </article>
          ))}
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              What usually works
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Dutch-market expectations for the letter
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm font-medium leading-relaxed text-slate-700 marker:text-black">
              {expectations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              What often hurts
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Common mistakes in English letters for Dutch jobs
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm font-medium leading-relaxed text-slate-700 marker:text-black">
              {commonMistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mb-12 border-4 border-black bg-[#FFF7E8] p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Short example
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            English motivation letter example for a job in the Netherlands
          </h2>
          <div className="mt-5 max-w-4xl space-y-4 border-2 border-black bg-white p-5 text-sm font-medium leading-relaxed text-slate-700">
            <p>Dear Ms de Vries,</p>
            <p>
              I am applying for the Business Analyst position at Northline. My five years of experience translating operational problems into requirements, process improvements and tested system changes closely match the role described in your vacancy.
            </p>
            <p>
              At Brabant Technology, I mapped an order-to-service process across six teams and helped redesign the workflow, reducing manual handoffs by 28%. I also coordinated user acceptance testing with 35 business users and converted findings into clear priorities for the product and engineering teams.
            </p>
            <p>
              Northline&apos;s focus on practical digital improvement appeals to me because it combines stakeholder work with measurable operational results. I would welcome the opportunity to discuss how this experience could support your transformation programme.
            </p>
            <p>Kind regards,<br />Sofia Costa</p>
          </div>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-700">
            Why it works: it names the role, gives one defensible example, explains employer-specific motivation, and adds context instead of repeating the complete CV.
          </p>
        </section>

        <section id="generator" className="mb-12">
          <div className="mb-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              English generator
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Generate the first version in English
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
              This generator is tuned for English cover letters for jobs in the Netherlands: concise, role-specific and less robotic than generic templates. Treat the result as a strong first draft and still tailor the company-specific lines yourself.
            </p>
          </div>
          <SollicitatiebriefTool locale="en" cvHref="/en/editor" />
        </section>

        <WhyWerkCvSection locale="en" />

        <section className="mb-12">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Sources checked
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Public guidance used for this page
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
          title="Useful pages after this motivation letter"
          links={routeLinks}
        />

        <FaqCardSection
          title="Motivation letter Netherlands FAQ"
          items={faqItems}
        />

        <FinalCtaSection
          title="Need the matching CV next?"
          description="Once your letter is clear, make sure the CV uses the same role focus, evidence and Dutch-market tone. That alignment usually matters more than adding extra flourish to either document."
          supportLine="Start free in the English editor and pay only when you want the final PDF."
          buttonLabel="Open English editor"
          buttonHref="/en/editor"
          trackingLocation="motivation-letter-netherlands:bottom_primary"
          trackingLabel="Open English editor"
        />
      </main>

      <Footer uiLanguage="en" />
    </div>
  );
}
