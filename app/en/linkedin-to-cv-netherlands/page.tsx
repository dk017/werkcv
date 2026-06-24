import Link from "next/link";
import { buildEnglishMetadata } from "../metadata";

const pagePath = "/en/linkedin-to-cv-netherlands";

export const metadata = buildEnglishMetadata({
  title: "LinkedIn to CV for Jobs in the Netherlands",
  description:
    "Turn your LinkedIn profile into a Dutch-market CV in English. Learn what to keep, rewrite, remove, and tailor before applying to jobs in the Netherlands.",
  path: pagePath,
  keywords: [
    "linkedin to cv netherlands",
    "linkedin profile to cv netherlands",
    "convert linkedin to cv netherlands",
    "linkedin resume netherlands",
    "english cv netherlands linkedin",
    "dutch cv from linkedin",
  ],
});

const linkedInLimits = [
  {
    title: "LinkedIn is a profile, not a tailored CV",
    body:
      "A profile can show your whole professional story. A job CV should show the parts that matter for one vacancy.",
  },
  {
    title: "The PDF export is only a starting point",
    body:
      "LinkedIn says profile PDF export is available from desktop, not the mobile app, and may depend on English profile settings.",
  },
  {
    title: "Dutch recruiters need fast signals",
    body:
      "Your CV should quickly show target role, location, language levels, tools, achievements, and work authorization if relevant.",
  },
];

const conversionSteps = [
  {
    title: "Export or copy the right source",
    body:
      "Use your LinkedIn profile PDF if available, or copy your headline, About section, experience, education, skills, certificates, and languages into a working document.",
  },
  {
    title: "Rewrite the headline into a target role",
    body:
      "Replace broad LinkedIn positioning with the job title recruiters will search for: Software Engineer, Data Engineer, Customer Success Specialist, Finance Assistant, Nurse, or Logistics Coordinator.",
  },
  {
    title: "Turn About into a CV profile summary",
    body:
      "A LinkedIn About section can be personal and wide. A CV summary should be three to five lines about seniority, domain, tools, achievements, and target role.",
  },
  {
    title: "Convert experience into proof bullets",
    body:
      "Replace paragraph-style role descriptions with bullet points that show scope, tools, action, and result.",
  },
  {
    title: "Clean up skills and endorsements",
    body:
      "Do not copy every LinkedIn skill. Keep 8 to 15 skills that match the vacancy and are backed by your work experience.",
  },
  {
    title: "Add Dutch-market details",
    body:
      "Show city or relocation timing, English and Dutch levels, certificates, and work route only when it helps hiring clarity.",
  },
];

const keepRewriteRemove = [
  {
    label: "Keep",
    items: [
      "Current target title and recent roles.",
      "Achievements with numbers, scope, tools, or customer impact.",
      "Relevant certificates, education, portfolio, GitHub, or professional links.",
      "English and Dutch language levels.",
    ],
  },
  {
    label: "Rewrite",
    items: [
      "LinkedIn headline into a recruiter-friendly target role.",
      "About section into a short CV profile.",
      "Experience paragraphs into bullet points.",
      "Broad skill lists into vacancy-matched skill groups.",
    ],
  },
  {
    label: "Remove",
    items: [
      "Old or unrelated roles that do not support the application.",
      "Buzzwords without proof, such as passionate, dynamic, or results-driven.",
      "Too many endorsements, recommendations, or social-profile details.",
      "Personal details that do not improve hiring clarity.",
    ],
  },
];

const beforeAfterExamples = [
  {
    role: "Software engineer",
    before:
      "LinkedIn: Experienced software engineer passionate about building scalable solutions and working with modern technologies.",
    after:
      "CV: Backend software engineer with 6 years of Java, Spring Boot, AWS, and payments experience. Built APIs for high-volume merchant workflows and reduced incident follow-up time through monitoring and documentation improvements.",
  },
  {
    role: "Customer support",
    before:
      "LinkedIn: Customer support professional who loves helping people and creating positive customer experiences.",
    after:
      "CV: Customer support specialist with 4 years of SaaS and e-commerce experience using Zendesk, HubSpot, and live chat. Maintained 92% CSAT while handling English-language B2B support across onboarding, billing, and product questions.",
  },
  {
    role: "Finance",
    before:
      "LinkedIn: Finance professional with experience in accounting, reporting, and administration.",
    after:
      "CV: Finance assistant with 5 years of AP, AR, bank reconciliation, month-end support, Excel reporting, and Exact Online experience for multi-entity service businesses.",
  },
];

const dutchMarketChecks = [
  "Does the first half page show your target role and strongest proof?",
  "Are your latest roles first and easy to scan?",
  "Do your bullets include tools, scope, and measurable outcomes?",
  "Are English and Dutch language levels specific?",
  "Did you remove irrelevant LinkedIn-style profile text?",
  "Is the CV one to two pages unless seniority truly requires more?",
  "Does the PDF layout stay readable for ATS systems?",
];

const internalRoutes = [
  {
    href: "/en/editor?template=professional&startSource=en_linkedin_to_cv_primary",
    title: "Open the English editor",
    body:
      "Best if you already know what to copy from LinkedIn and want to build the CV now.",
  },
  {
    href: "/en/resume-optimizer-netherlands",
    title: "Optimize an existing resume",
    body:
      "Best if you already exported a PDF or have a draft that needs Dutch-market cleanup.",
  },
  {
    href: "/en/dutch-cv-template",
    title: "Use a Dutch CV template",
    body:
      "Best if you need a clear template before rewriting LinkedIn content.",
  },
  {
    href: "/en/cv-format-netherlands-english",
    title: "Read the format guide",
    body:
      "Best if you are not sure which sections Dutch recruiters expect first.",
  },
];

const faqs = [
  {
    question: "Can I use my LinkedIn profile as a CV in the Netherlands?",
    answer:
      "Use it as a source, not as the final CV. A LinkedIn profile is broad and public. A job CV should be selective, tailored to one role, and formatted as a clean PDF.",
  },
  {
    question: "Can LinkedIn export my profile as a PDF?",
    answer:
      "LinkedIn says members can save a profile as a PDF from desktop, but the feature is not available on the mobile app and may depend on English profile settings.",
  },
  {
    question: "Should my LinkedIn and CV match exactly?",
    answer:
      "They should be consistent, but not identical. Your CV can be shorter and more targeted. LinkedIn can hold broader background, posts, recommendations, and more detail.",
  },
  {
    question: "What should I add for Dutch applications?",
    answer:
      "Add local hiring signals when relevant: city or relocation timing, Dutch and English language levels, work authorization route, certificates, and a target role that matches the vacancy.",
  },
];

const sourceLinks = [
  {
    label: "LinkedIn Help - Save a profile as PDF",
    href: "https://www.linkedin.com/help/linkedin/answer/a541960/save-a-profile-as-a-pdf",
    note:
      "Official LinkedIn guidance on profile PDF export, desktop availability, English profile requirements, and download limits.",
  },
  {
    label: "Europass - CV writing guidance",
    href: "https://europass.europa.eu/en/create-europass-cv",
    note:
      "Official European guidance on tailoring a CV, readability, reverse chronological order, and matching the vacancy.",
  },
  {
    label: "WerkCV - Dutch CV checker",
    href: "/en/dutch-cv-checker",
    note:
      "Use this route if you want to check a draft CV for ATS readability and Dutch-market fit.",
  },
];

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

export default function LinkedinToCvNetherlandsPage() {
  return (
    <main className="min-h-screen bg-[#FFFEF9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="border-b-4 border-black bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-slate-700">
            LinkedIn to CV
          </p>
          <h1 className="max-w-4xl text-4xl font-black text-gray-900 md:text-5xl">
            Turn your LinkedIn profile into a CV for jobs in the Netherlands
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
            Your LinkedIn profile is a useful source, but it is not a finished
            application CV. Convert it into a focused Dutch-market CV in English
            before sending it to recruiters.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/en/editor?template=professional&startSource=en_linkedin_to_cv_hero"
              className="border-4 border-black bg-black px-5 py-3 font-bold text-white"
            >
              Build my CV using LinkedIn text
            </Link>
            <Link
              href="/en/resume-optimizer-netherlands"
              className="border-4 border-black bg-[#4ECDC4] px-5 py-3 font-bold text-black"
            >
              Optimize existing CV
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10 space-y-8">
        <section className="grid gap-4 md:grid-cols-3">
          {linkedInLimits.map((card) => (
            <article key={card.title} className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-lg font-black text-gray-900">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">{card.body}</p>
            </article>
          ))}
        </section>

        <section className="border-4 border-black bg-white p-6">
          <h2 className="text-2xl font-black text-gray-900">How to convert LinkedIn into a Dutch-market CV</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {conversionSteps.map((step, index) => (
              <article key={step.title} className="border-2 border-black bg-[#FFFEF0] p-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">Step {index + 1}</p>
                <h3 className="mt-2 font-black text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-4 border-black bg-[#E9FFFC] p-6">
          <h2 className="text-2xl font-black text-gray-900">Keep, rewrite, remove</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {keepRewriteRemove.map((column) => (
              <article key={column.label} className="border-2 border-black bg-white p-4">
                <h3 className="text-xl font-black text-gray-900">{column.label}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="border-4 border-black bg-white p-6">
          <h2 className="text-2xl font-black text-gray-900">Before and after examples</h2>
          <div className="mt-5 space-y-4">
            {beforeAfterExamples.map((example) => (
              <article key={example.role} className="border-2 border-black bg-white">
                <div className="border-b-2 border-black bg-black px-4 py-2 font-black text-white">
                  {example.role}
                </div>
                <div className="grid gap-0 md:grid-cols-2">
                  <div className="border-b-2 border-black p-4 md:border-b-0 md:border-r-2">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">LinkedIn-style</p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">{example.before}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">CV-ready</p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">{example.after}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-4 border-black bg-white p-6">
          <h2 className="text-2xl font-black text-gray-900">Dutch-market quality check</h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {dutchMarketChecks.map((check) => (
              <li key={check} className="border-2 border-black bg-[#FFFEF0] p-3 text-sm font-semibold text-gray-800">
                {check}
              </li>
            ))}
          </ul>
        </section>

        <section className="border-4 border-black bg-[#FFF7E8] p-6">
          <h2 className="text-2xl font-black text-gray-900">Choose the right next step</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-gray-700">
            If your LinkedIn profile is already complete, you do not need to start
            from blank. Use it as source material, then build a focused CV that
            fits one Netherlands application.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {internalRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="block border-2 border-black bg-white p-4 transition-colors hover:bg-yellow-100"
              >
                <h3 className="font-black text-gray-900">{route.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{route.body}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-4 border-black bg-white p-6">
          <h2 className="text-2xl font-black text-gray-900">FAQ</h2>
          <div className="mt-4 space-y-4">
            {faqs.map((item) => (
              <details key={item.question} className="border-2 border-black bg-white">
                <summary className="cursor-pointer p-4 font-black text-gray-900">{item.question}</summary>
                <p className="px-4 pb-4 leading-relaxed text-gray-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="border-4 border-black bg-white p-6">
          <h2 className="text-2xl font-black text-gray-900">Sources and next reading</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {sourceLinks.map((source) => (
              <Link
                key={source.href}
                href={source.href}
                className="block border-2 border-black bg-[#FFFEF0] p-4 transition-colors hover:bg-yellow-100"
              >
                <h3 className="font-black text-gray-900">{source.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{source.note}</p>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
