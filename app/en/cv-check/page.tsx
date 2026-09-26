import type { Metadata } from "next";
import CvCheckTool from "@/components/cv-check/CvCheckTool";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { buildEnglishMetadata } from "@/app/en/metadata";
import { cvDownloadPrice } from "@/lib/site-content";

const faqItems = [
  {
    question: "Is the CV check free?",
    answer: `Yes. You get the full report without an account or email address, including the comparison with a job ad, and re-checking after edits is free too. You only pay ${cvDownloadPrice.displayEn} once if you improve your CV in the WerkCV editor and download it as a PDF.`,
  },
  {
    question: "Is my CV stored?",
    answer: "No. Your CV and the job ad are only used for this check and are not kept. We do not store CV text in logs or statistics.",
  },
  {
    question: "Will an ATS automatically reject my CV?",
    answer:
      "Rarely. An applicant tracking system mostly extracts your details, and recruiters search and filter them. The popular claim that '75% of CVs are rejected by the ATS' has no study behind it. What matters is that systems can read your CV correctly, that you show the requested experience, and that a recruiter can see it quickly.",
  },
  {
    question: "What does the check look at for jobs in the Netherlands?",
    answer:
      "Among other things: a language level per language (native or CEFR A1–C2; Dutch employers often ask for B2 or higher), a recognisable education level (MBO, HBO/bachelor, WO/master), a length of 1–2 pages, sensitive data such as a BSN, and where relevant a VOG, BIG registration or driving licence. Photo, date of birth and nationality are optional in the Netherlands; we only mention them for information.",
  },
  {
    question: "Should my CV be in Dutch or English?",
    answer:
      "Use the language of the job ad. If you paste a job ad, the check flags when your CV and the job ad are in different languages.",
  },
];

export const metadata: Metadata = {
  ...buildEnglishMetadata({
    title: "Free AI CV Check for Jobs in the Netherlands: ATS, Content and Job Match",
    description:
      "Check your CV for free with AI, no account needed. See what Dutch recruiters and application systems get from your CV, what is missing for the job and what to fix first.",
    path: "/en/cv-check",
    nlPath: "/cv-check",
    keywords: ["cv checker netherlands", "dutch cv checker", "resume checker netherlands", "ats cv check", "cv job match"],
  }),
  // Not indexed until the launch that redirects the old checker pages here (spec §6.1).
  robots: { index: false, follow: true },
};

const webApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "WerkCV CV check",
  url: "https://werkcv.nl/en/cv-check",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "en",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description:
    "Free AI CV check for applications in the Netherlands: readability for application systems, content, Dutch conventions and fit with a job ad.",
};

const whatWeCheck = [
  { title: "Readable by systems", body: "Scans, two-column layouts, text boxes and headers or footers that application systems misread or skip." },
  { title: "Basics and contact", body: "Name, email, phone, city and LinkedIn: can a recruiter reach you straight away?" },
  { title: "Content and evidence", body: "A concrete profile, results with numbers, active verbs and consistent dates." },
  { title: "Dutch conventions", body: "Language levels, MBO/HBO/WO, length, sensitive data, and where relevant VOG, BIG or a driving licence." },
];

export default function EnglishCvCheckPage() {
  return (
    <main>
      <FAQJsonLd questions={faqItems} />
      <JsonLd data={webApplicationJsonLd} />

      <section className="wk-section">
        <div className="wk-container max-w-3xl">
          <p className="wk-eyebrow">Free AI CV check</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">
            Check your CV the way Dutch recruiters and systems read it
          </h1>
          <p className="mt-4 text-lg leading-8 text-[var(--wk-ink-muted)]">
            Within a minute, see what application systems get from your CV, what is missing for the job and what to fix first, quoted from your own CV.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="wk-trust-pill">Free, no account</span>
            <span className="wk-trust-pill">Your CV is not stored</span>
            <span className="wk-trust-pill">Dutch rules: language levels, MBO/HBO, VOG</span>
          </div>
          <div className="mt-8">
            <CvCheckTool
              locale="en"
              methodologyHref="/cv-check/methodologie"
              editorHref="/en/editor?template=professional&startSource=cv_check_en"
            />
          </div>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-4xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">What the CV check looks at</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {whatWeCheck.map((item) => (
              <div key={item.title} className="wk-card p-5">
                <h3 className="font-semibold text-[var(--wk-ink)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-6 text-[var(--wk-ink-muted)]">
            Paste a job ad to also see, per requirement, whether your CV shows it, with quotes from both. Hard requirements come first; a nice-to-have (&lsquo;pre&rsquo; in Dutch job ads) counts as a plus.
          </p>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Frequently asked questions</h2>
          <div className="mt-6 space-y-3">
            {faqItems.map((item) => (
              <details key={item.question} className="wk-card p-4">
                <summary className="cursor-pointer font-semibold text-[var(--wk-ink)]">{item.question}</summary>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
