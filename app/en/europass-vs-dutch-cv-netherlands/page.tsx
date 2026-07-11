import Link from "next/link";
import { buildEnglishMetadata } from "../metadata";

const pagePath = "/en/europass-vs-dutch-cv-netherlands";

export const metadata = buildEnglishMetadata({
  title: "Europass vs Dutch CV for the Netherlands",
  description:
    "Compare Europass with a Dutch-style CV for jobs in the Netherlands. Learn when Europass is enough, when a local CV works better, and how to build one in English.",
  path: pagePath,
  keywords: [
    "europass vs dutch cv",
    "europass cv netherlands",
    "dutch cv vs europass",
    "europass resume netherlands",
    "dutch cv template english",
    "netherlands cv format english",
  ],
});

const comparisonRows = [
  {
    factor: "Best use case",
    europass: "Education, training, EU mobility, and applications where the employer asks for the Europass format.",
    dutch: "Commercial job applications in the Netherlands where recruiters need a fast, local, role-focused CV.",
  },
  {
    factor: "Structure",
    europass: "Standardized European profile that can hold a broad career record.",
    dutch: "Short profile, recent experience first, role proof, skills, languages, and only relevant personal details.",
  },
  {
    factor: "Design",
    europass: "Recognizable, official, and consistent across Europe.",
    dutch: "Cleaner and more flexible for ATS-friendly one or two page applications.",
  },
  {
    factor: "Tailoring",
    europass: "You select profile information and generate versions from your Europass profile.",
    dutch: "You rewrite the CV around one vacancy, one target role, and Dutch recruiter expectations.",
  },
  {
    factor: "Cost model",
    europass: "Free official European tool.",
    dutch: "WerkCV is free to build and edit. Pay once only when you want the final PDF download.",
  },
];

const decisionCards = [
  {
    title: "Use Europass when the employer asks for it",
    body:
      "Europass is a strong choice when the vacancy, school, public institution, or mobility program specifically requests the Europass format.",
  },
  {
    title: "Use a Dutch-style CV for most job applications",
    body:
      "For private-sector roles in the Netherlands, the safer default is a clean CV that gets to role fit, recent experience, tools, language levels, and availability quickly.",
  },
  {
    title: "Use both when you need a European record and a job CV",
    body:
      "Keep Europass as a full profile if useful, but send a shorter Dutch-market CV when applying to a specific job.",
  },
];

const dutchCvChecklist = [
  "Name, target role, city or relocation timing, email, phone, and LinkedIn.",
  "Three to five line profile summary focused on the target job.",
  "Reverse-chronological experience with measurable bullet points.",
  "Skills grouped by tools, domain knowledge, and soft skills only when proven.",
  "Languages with clear levels, especially English and Dutch.",
  "Education and certificates that matter for the role.",
  "A simple ATS-safe PDF layout without heavy graphics or unreadable columns.",
];

const conversionReasons = [
  {
    title: "Recruiters scan faster than Europass usually explains",
    body:
      "A local CV should answer the first screening questions quickly: what role are you targeting, where are you based, can you work in English or Dutch, what tools do you know, and what proof do you have?",
  },
  {
    title: "Dutch-market fit is more than translation",
    body:
      "An English CV can still feel Dutch-market ready if the section order, profile summary, language levels, and personal details are handled the way local recruiters expect.",
  },
  {
    title: "One focused PDF beats a complete profile export",
    body:
      "A full career profile is useful for storage. A job application CV should be selective. Remove old, irrelevant, or vague information before sending it.",
  },
];

const mistakes = [
  "Sending a generic Europass export to every Dutch vacancy without tailoring the first half page.",
  "Using long paragraphs where a recruiter expects short proof bullets.",
  "Hiding Dutch or English language level when it matters to the role.",
  "Adding nationality, full address, date of birth, or personal details that do not improve hiring clarity.",
  "Using a visually busy template that looks attractive but parses poorly in ATS systems.",
];

const faqs = [
  {
    question: "Is Europass accepted in the Netherlands?",
    answer:
      "Yes, Europass can be used in the Netherlands, especially when an employer, school, or EU-related process asks for it. For many private-sector jobs, a shorter Dutch-style CV is often easier for recruiters to scan.",
  },
  {
    question: "Is Europass better than a normal CV?",
    answer:
      "Not always. Europass is official, free, and recognizable across Europe. A normal Dutch-style CV can be better when you need a tailored job application that highlights the exact role, tools, achievements, and language fit.",
  },
  {
    question: "Should expats use Europass for Dutch jobs?",
    answer:
      "Expats can use Europass, but should not assume it is the best default for every Dutch job. For English-speaking roles in the Netherlands, a clear Dutch-market CV in English is often more direct.",
  },
  {
    question: "Can I create a Dutch-style CV in English?",
    answer:
      "Yes. Many international roles in the Netherlands accept English CVs. The important part is using a local structure: target role, short profile, relevant work proof, skills, education, and language levels.",
  },
];

const sourceLinks = [
  {
    label: "Europass - Create your CV",
    href: "https://europass.europa.eu/en/create-europass-cv",
    note:
      "Official EU page explaining Europass CV creation, profile storage, language support, sharing, and CV writing guidance.",
  },
  {
    label: "LinkedIn Help - Save a profile as PDF",
    href: "https://www.linkedin.com/help/linkedin/answer/a541960/save-a-profile-as-a-pdf",
    note:
      "Useful context for people comparing profile exports with a real application CV.",
  },
  {
    label: "WerkCV - Netherlands CV format",
    href: "/en/guides/cv-format-netherlands-english",
    note:
      "Our practical guide to section order and Dutch-market CV structure in English.",
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

export default function EuropassVsDutchCvNetherlandsPage() {
  return (
    <main className="min-h-screen bg-[#FFFEF9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="border-b-4 border-black bg-gradient-to-br from-sky-50 via-cyan-50 to-white">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-slate-700">
            Europass or Dutch CV?
          </p>
          <h1 className="max-w-4xl text-4xl font-black text-gray-900 md:text-5xl">
            Europass vs Dutch CV: which one should you use in the Netherlands?
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
            Europass is official, free, and well known across Europe. But for many
            Dutch job applications, a shorter Dutch-style CV in English is easier
            to scan and easier to tailor to one vacancy.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/en/editor?template=ats&startSource=en_europass_vs_dutch_cv_hero"
              className="border-4 border-black bg-black px-5 py-3 font-bold text-white"
            >
              Build a Dutch-market CV
            </Link>
            <Link
              href="/en/dutch-cv-template"
              className="border-4 border-black bg-[#4ECDC4] px-5 py-3 font-bold text-black"
            >
              See Dutch CV template
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10 space-y-8">
        <section className="border-4 border-black bg-white p-6">
          <h2 className="text-2xl font-black text-gray-900">Short answer</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-gray-700">
            Use Europass when the process asks for Europass or when you need a
            broad European profile. Use a Dutch-style CV when you are applying to
            a specific job in the Netherlands and want the recruiter to understand
            your fit in the first scan.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {decisionCards.map((card) => (
              <article key={card.title} className="border-2 border-black bg-[#FFFEF0] p-4">
                <h3 className="font-black text-gray-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-4 border-black bg-white p-6">
          <h2 className="text-2xl font-black text-gray-900">Europass vs Dutch CV comparison</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-black text-white">
                  <th className="border-2 border-black p-3">Factor</th>
                  <th className="border-2 border-black p-3">Europass</th>
                  <th className="border-2 border-black p-3">Dutch-style CV</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.factor}>
                    <td className="border-2 border-black p-3 font-black text-gray-900">{row.factor}</td>
                    <td className="border-2 border-black p-3 text-gray-700">{row.europass}</td>
                    <td className="border-2 border-black p-3 text-gray-700">{row.dutch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="border-4 border-black bg-[#E9FFFC] p-6">
          <h2 className="text-2xl font-black text-gray-900">Why a Dutch-style CV can work better for applications</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {conversionReasons.map((item) => (
              <article key={item.title} className="border-2 border-black bg-white p-4">
                <h3 className="font-black text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-4 border-black bg-white p-6">
          <h2 className="text-2xl font-black text-gray-900">What to change if you start from Europass</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-gray-700">
            Europass can be a good source record. Before sending it to Dutch
            employers, turn it into a selective application CV. Keep what helps
            the vacancy and remove what slows the recruiter down.
          </p>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {dutchCvChecklist.map((item) => (
              <li key={item} className="border-2 border-black bg-[#FFFEF0] p-3 text-sm font-semibold text-gray-800">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/en/templates?startSource=en_europass_vs_dutch_cv_checklist"
              className="border-4 border-black bg-black px-5 py-3 font-bold text-white"
            >
              Choose an English template
            </Link>
            <Link
              href="/en/resume-optimizer-netherlands"
              className="border-4 border-black bg-white px-5 py-3 font-bold text-black"
            >
              Optimize an existing resume
            </Link>
          </div>
        </section>

        <section className="border-4 border-black bg-white p-6">
          <h2 className="text-2xl font-black text-gray-900">Mistakes to avoid</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
            {mistakes.map((mistake) => (
              <li key={mistake}>{mistake}</li>
            ))}
          </ul>
        </section>

        <section className="border-4 border-black bg-[#FFF7E8] p-6">
          <h2 className="text-2xl font-black text-gray-900">Best route for most English-speaking applicants</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-gray-700">
            If you are applying to jobs in the Netherlands in English, start with
            a Dutch-market structure and keep the payment model transparent:
            build and edit for free, then pay once only when you want the final PDF.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/en/editor?template=ats&startSource=en_europass_vs_dutch_cv_bottom"
              className="border-4 border-black bg-[#4ECDC4] px-5 py-3 font-bold text-black"
            >
              Build my Netherlands CV
            </Link>
            <Link
              href="/en/guides/cv-format-netherlands-english"
              className="border-4 border-black bg-white px-5 py-3 font-bold text-black"
            >
              Read the format guide
            </Link>
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
