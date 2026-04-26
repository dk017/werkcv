import Link from "next/link";
import Footer from "@/components/Footer";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import {
  FaqCardSection,
  FinalCtaSection,
  LinkCardSection,
  WhyWerkCvSection,
  type OptimizerFaqItem,
  type OptimizerLinkCard,
} from "@/components/landing/CvOptimizerSections";
import { buildEnglishMetadata } from "../metadata";

const faqItems: OptimizerFaqItem[] = [
  {
    question: "Why optimize a resume specifically for the Netherlands?",
    answer:
      "Dutch employers often expect a clear, structured CV with straightforward headings, concise profile text, and role-relevant keywords. Optimizing for that context improves both ATS readability and recruiter trust.",
  },
  {
    question: "Is a Dutch CV different from an international resume?",
    answer:
      "Usually yes. The overall structure is familiar, but Dutch CVs tend to be direct, practical, and less decorative. Contact details, location, clear work history, and readable formatting matter more than visual styling.",
  },
  {
    question: "Should I use keywords from the job description?",
    answer:
      "Yes, but naturally. Mirror the role-specific language that genuinely fits your experience and place it in your profile, experience bullets, and skills.",
  },
  {
    question: "Can I build a Dutch-style CV after the check?",
    answer:
      "Yes. You can use the check to spot ATS or clarity issues first, then move into WerkCV to build a cleaner Dutch-style CV version.",
  },
];

const routeLinks: OptimizerLinkCard[] = [
  {
    href: "/en/ats-resume-netherlands",
    title: "ATS resume guide",
    body: "Use this route if you want a broader explanation of ATS-friendly resume structure for Dutch job applications.",
  },
  {
    href: "/en/dutch-cv-template",
    title: "Dutch CV template",
    body: "Helpful if you already know the content issues and now want a clean Dutch-style layout.",
  },
  {
    href: "/en/netherlands-cv-format",
    title: "Netherlands CV format",
    body: "Good next step when you want to understand what Dutch recruiters expect structurally.",
  },
  {
    href: "/cv-optimaliseren",
    title: "Dutch version: cv optimaliseren",
    body: "Useful if you prefer the Dutch-language version of this optimizer cluster.",
  },
];

export const metadata = buildEnglishMetadata({
  title: "Resume optimizer for jobs in the Netherlands",
  description:
    "Optimize your resume for Dutch job applications. Check ATS risks, structure, keywords and Dutch CV expectations. Start free with WerkCV.",
  path: "/en/resume-optimizer-netherlands",
  nlPath: "/cv-optimaliseren",
  keywords: [
    "resume optimizer netherlands",
    "resume check netherlands",
    "ats resume netherlands",
    "dutch cv optimizer",
    "resume keywords netherlands",
  ],
  type: "article",
});

export default function ResumeOptimizerNetherlandsPage() {
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
            <Link
              href="/en/editor"
              className="border-2 border-black bg-[#4ECDC4] px-4 py-2 text-sm font-black text-black"
            >
              Create a Dutch CV
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/en" },
              { label: "Resume optimizer Netherlands", href: "/en/resume-optimizer-netherlands" },
            ]}
          />
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {["ATS", "Dutch CV", "Keywords", "Structure", "Readability"].map((badge) => (
                <span
                  key={badge}
                  className="border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-black"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              Resume optimizer for jobs in the Netherlands
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Applying for jobs in the Netherlands? Check whether your resume is readable, ATS-friendly and aligned with Dutch hiring expectations. Then create a clean Dutch-style CV in WerkCV.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/tools/ats-cv-checker"
                trackingLocation="resume-optimizer-netherlands:hero_primary"
                trackingLabel="Check my resume"
                ctaEventName="cta_resume_optimizer_en_hero"
                className="border-4 border-black bg-[#4ECDC4] px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Check my resume
              </TrackedLandingLink>
              <Link
                href="/en/editor"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Create a Dutch CV
              </Link>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-700">
              Prefer Dutch? Use the{" "}
              <Link href="/cv-optimaliseren" className="font-black underline">
                Dutch cv optimizer page
              </Link>
              .
            </p>
          </div>

          <aside className="h-fit border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Best next steps
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Check first, rebuild second
            </h2>
            <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <p>1. Start with ATS readability and structure.</p>
              <p>2. Compare your wording with the job description keywords.</p>
              <p>3. Rebuild the final version in a cleaner Dutch-style CV format.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Why optimize your resume for the Netherlands?
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Why optimize your resume for the Netherlands?
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Dutch recruiters usually prefer resumes that are direct, easy to scan, and focused on relevance rather than visual flair. If your document feels too generic or too design-heavy, it can reduce trust quickly.
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
              Optimization helps you present the same experience more clearly for Dutch hiring expectations and common ATS filters.
            </p>
          </article>

          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Dutch CV vs international resume
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Dutch CV vs international resume
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              The Dutch format is usually straightforward: clear headings, concise profile text, practical bullet points, and a layout that stays readable in PDF and ATS parsing.
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
              Use the{" "}
              <Link href="/en/netherlands-cv-format" className="font-black underline">
                Netherlands CV format
              </Link>
              {" "}guide and the{" "}
              <Link href="/en/dutch-cv-template" className="font-black underline">
                Dutch CV template
              </Link>
              {" "}page if you want a cleaner local format.
            </p>
          </article>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            ATS risks to check
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            ATS risks to check
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              "Unclear section headings or missing profile summary",
              "Inconsistent date formatting across roles",
              "Too much design, columns, or decorative icons",
              "Weak experience bullets without results",
              "Missing skills or terms expected in the vacancy",
            ].map((item) => (
              <article
                key={item}
                className="border-3 border-black bg-[#E9FFFC] p-4"
                style={{ borderWidth: "3px" }}
              >
                <p className="text-sm font-black text-black">{item}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
            Start with the{" "}
            <Link href="/tools/ats-cv-checker" className="font-black underline">
              ATS CV checker
            </Link>
            {" "}and compare with the guidance on{" "}
            <Link href="/en/ats-resume-netherlands" className="font-black underline">
              ATS resumes for the Netherlands
            </Link>
            .
          </p>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Common resume issues for Dutch applications
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Common resume issues for Dutch applications
          </h2>
          <div className="mt-6 overflow-hidden border-2 border-black">
            <div className="grid grid-cols-2 bg-black text-sm font-black text-white">
              <div className="border-r border-white px-4 py-3">International resume issue</div>
              <div className="px-4 py-3">Better for the Netherlands</div>
            </div>
            {[
              ["Too design-heavy", "Clean, simple CV layout"],
              ["Long summary", "Short profile focused on role fit"],
              ["Generic responsibilities", "Concrete bullets with results"],
              ["Missing location/work eligibility", "Clear contact and availability details"],
            ].map(([left, right], index) => (
              <div
                key={left}
                className={`grid grid-cols-2 text-sm ${index % 2 === 0 ? "bg-[#E9FFFC]" : "bg-white"}`}
              >
                <div className="border-r border-black px-4 py-3 font-medium text-slate-800">{left}</div>
                <div className="px-4 py-3 font-medium text-slate-800">{right}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Keywords from the job description
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Keywords from the job description
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              If the vacancy emphasizes tools, methods, industries, or responsibilities that also match your experience, those terms should be visible in your summary, experience bullets, and skills.
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
              The goal is not stuffing keywords, but reflecting the role language naturally and credibly.
            </p>
          </article>

          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Create a Dutch-style CV after the check
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Create a Dutch-style CV after the check
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Once you know what to fix, rebuild the final version in a cleaner format rather than patching a messy file repeatedly. That makes your final PDF easier to maintain across multiple Dutch applications.
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
              Go straight to{" "}
              <Link href="/en/editor" className="font-black underline">
                the English editor
              </Link>
              {" "}or use the Dutch{" "}
              <Link href="/cv-maken" className="font-black underline">
                CV builder
              </Link>
              {" "}if you want the local-language flow.
            </p>
          </article>
        </section>

        <LinkCardSection
          eyebrow="Related routes"
          title="Useful pages around this resume optimizer"
          links={routeLinks}
        />

        <FaqCardSection title="Frequently asked questions about optimizing a resume" items={faqItems} />

        <WhyWerkCvSection locale="en" />

        <FinalCtaSection
          title="Optimize your resume for Dutch job applications"
          description="Use the check to improve clarity, ATS readability, and role alignment, then build the final Dutch-style version in WerkCV."
          supportLine="Start free. Pay only when you download your PDF. No subscription."
          buttonLabel="Create a Dutch CV"
          buttonHref="/en/editor"
          trackingLocation="resume-optimizer-netherlands:final_primary"
          trackingLabel="Create a Dutch CV"
        />
      </main>

      <Footer />
    </div>
  );
}
