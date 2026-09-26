import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SampleCVPreview } from "@/components/seo/SampleCVPreview";
import type { CVData } from "@/lib/cv";
import EnglishRoleExampleBand from "../components/EnglishRoleExampleBand";
import { buildEnglishMetadata } from "../metadata";
import { cvDownloadPrice } from "@/lib/site-content";

export const metadata = buildEnglishMetadata({
  title: "Dutch CV Template for the Netherlands (English)",
  description: `Use an English Dutch CV template for jobs in the Netherlands. Compare ATS-friendly layouts, build and preview free, then download your PDF for ${cvDownloadPrice.displayEn}.`,
  path: "/en/dutch-cv-template",
  nlPath: "/templates",
  keywords: [
    "dutch cv template",
    "dutch style cv template",
    "dutch cv format template",
    "english cv netherlands",
    "netherlands resume template",
    "netherlands resume",
    "netherlands resume format",
    "dutch resume format",
    "dutch resume template",
    "netherlands cv template free download",
    "netherlands cv template",
    "netherlands resume download templates",
    "ats cv template netherlands",
    "expat cv template",
  ],
});

const templatePreviewData: CVData = {
  personal: {
    name: "Maya Vermeer",
    title: "Operations Project Coordinator",
    resumeLanguage: "en",
    email: "maya.vermeer@example.com",
    phone: "+31 6 1234 5678",
    location: "Amsterdam, Netherlands",
    address: "",
    postalCode: "",
    summary:
      "Operations project coordinator with 5 years of experience improving planning, reporting, and cross-team delivery. Combines clear stakeholder communication with practical process improvement and measurable follow-through.",
    birthDate: "",
    birthPlace: "",
    nationality: "",
    driversLicense: "",
    gender: "",
    maritalStatus: "",
    linkedIn: "linkedin.com/in/mayavermeer",
    github: "",
    website: "",
    photo: "",
  },
  experience: [
    {
      role: "Project Coordinator",
      company: "North Harbor Mobility",
      location: "Amsterdam",
      start: "Mar 2022",
      end: "Present",
      description: "",
      highlights: [
        "Coordinated delivery plans across operations, product, and customer teams for 12 concurrent improvement projects.",
        "Reduced overdue project actions by 31% through clearer ownership, weekly reporting, and escalation routines.",
        "Prepared decision-ready progress reports for managers covering scope, risks, dependencies, and next steps.",
      ],
    },
    {
      role: "Operations Assistant",
      company: "Delta Service Group",
      location: "Utrecht",
      start: "Sep 2019",
      end: "Feb 2022",
      description: "",
      highlights: [
        "Maintained operational dashboards, supplier records, and weekly planning for a 25-person service team.",
        "Standardised handover checklists and reduced missing information in new assignments.",
      ],
    },
  ],
  education: [
    {
      degree: "BBA Business Administration",
      school: "Amsterdam University of Applied Sciences",
      location: "Amsterdam",
      start: "2015",
      end: "2019",
      description:
        "Focus on operations, project management, and business process improvement.",
    },
  ],
  skills: [
    { name: "Project coordination", level: 5 },
    { name: "Process improvement", level: 4 },
    { name: "Stakeholder management", level: 4 },
    { name: "Excel and reporting", level: 4 },
    { name: "Jira", level: 4 },
  ],
  languages: [
    { name: "English", level: "Fluent" },
    { name: "Dutch (B1)", level: "Good" },
  ],
  internships: [],
  interests: [],
  properties: ["Structured", "Collaborative", "Practical"],
  courses: [],
  awards: [],
  references: [],
  sideActivities: [],
  customSections: [],
};

const templateChoices = [
  {
    id: "professional",
    themeId: "charcoal",
    eyebrow: "Best all-round choice",
    title: "Professional",
    body:
      "A restrained single-column layout for business, operations, finance, support, and most general applications.",
    detail: "Clear reading order · strong first page",
    href: "/en/editor?template=professional&startSource=en_dutch_cv_template_professional",
  },
  {
    id: "ats",
    themeId: "classic-blue",
    eyebrow: "Lowest layout risk",
    title: "ATS-Friendly",
    body:
      "A cautious single-column option for corporate application portals and vacancies with structured screening.",
    detail: "Standard headings · selectable text",
    href: "/en/editor?template=ats&startSource=en_dutch_cv_template_ats",
  },
  {
    id: "modern",
    themeId: "ocean-blue",
    eyebrow: "Contemporary presentation",
    title: "Modern",
    body:
      "A polished two-column layout for direct applications in tech, marketing, product, and international teams.",
    detail: "More visual · still easy to scan",
    href: "/en/editor?template=modern&startSource=en_dutch_cv_template_modern",
  },
] as const;

const steps = [
  "Choose a simple ATS-safe template.",
  "Use a clear job title and profile summary for the Dutch job market.",
  "Add measurable achievements under each role.",
  "State English and Dutch language levels clearly.",
  "Export as PDF and tailor keywords to the vacancy.",
];

const quickAnswerCards = [
  {
    title: "Netherlands resume format: simple one-column layout",
    body:
      "A Netherlands resume format is usually the same practical document as a Dutch CV: plain, easy to scan, and free of decorative blocks that hurt ATS readability.",
  },
  {
    title: "Reverse-chronological work history",
    body:
      "Dutch recruiters expect your latest role first. Keep role titles, dates, and achievements easy to scan in seconds.",
  },
  {
    title: "Tailored summary and keywords",
    body:
      "A Dutch-style CV should connect directly to the vacancy, not read like a generic international resume.",
  },
];

const dutchExpectations = [
  "A clear job title directly under your name.",
  "A short profile summary instead of a long personal statement.",
  "Work experience in reverse chronological order.",
  "Bullet points with measurable outcomes, not just responsibilities.",
  "A simple PDF-ready layout that survives ATS parsing.",
];

const routeChoices = [
  {
    href: "/en/guides/cv-format-netherlands-english",
    title: "Read the format guide",
    body: "Use this when you want the Dutch section order, length guidance, and first-page logic before you start writing.",
  },
  {
    href: "/en/cv-check",
    title: "Check an existing CV",
    body: "Use this when you already have a draft and want to review ATS readability, Dutch-market fit, and LinkedIn alignment.",
  },
  {
    href: "/en/how-to-write-dutch-cv-without-speaking-dutch",
    title: "Apply without speaking Dutch",
    body: "Use this when you are applying in English and need to present your Dutch level, location, and international experience clearly.",
  },
  {
    href: "/en/english-cv-example-netherlands",
    title: "Study a complete example",
    body: "Use this when you want to see the right tone, profile summary, and achievement bullets before writing your own version.",
  },
];

const relatedGuides = [
  {
    href: "/en/dutch-cv-mistakes-english-speaking-job-seekers",
    label: "Dutch CV mistakes",
  },
  { href: "/en/expat-cv-netherlands", label: "Dutch CV for expats" },
  {
    href: "/en/europass-vs-dutch-cv-netherlands",
    label: "Europass vs Dutch CV",
  },
  {
    href: "/en/linkedin-to-cv-netherlands",
    label: "Turn LinkedIn into a Dutch CV",
  },
  {
    href: "/en/motivation-letter-netherlands",
    label: "Motivation letter for the Netherlands",
  },
];

const trustPoints = [
  "Build and compare templates before paying.",
  `Final PDF download: ${cvDownloadPrice.displayEn} including VAT.`,
  "No subscription, no automatic renewal, no cancellation task.",
];

const packagePoints = [
  "English wording with Dutch-market CV structure.",
  "ATS-friendly A4 PDF for applications in the Netherlands.",
  "One-time CV download when you are ready, not a resume subscription.",
];

const faqs = [
  {
    question: "What is a Dutch CV template?",
    answer:
      "A Dutch CV template is a layout and section order that matches what recruiters in the Netherlands usually expect: clear role title, short profile, reverse-chronological experience, and an ATS-safe structure.",
  },
  {
    question: "Is a Dutch CV the same as a resume?",
    answer:
      "For job applications in the Netherlands, CV and resume usually mean the same concise application document. Dutch employers typically ask for a CV, even when the document is written in English.",
  },
  {
    question: "Can I use a UK or US resume in the Netherlands?",
    answer:
      "You can reuse the content, but adapt the document to Dutch expectations: use a clear target title, a short profile, reverse-chronological experience, explicit language levels, and a restrained one- or two-page layout.",
  },
  {
    question: "Can I apply in English in the Netherlands?",
    answer:
      "Yes, especially for international and tech roles. For Dutch-speaking roles, use Dutch when required in the vacancy text.",
  },
  {
    question: "Should I include a photo on a Dutch CV?",
    answer:
      "It is optional in the Netherlands. If you include one, keep it professional. If unsure, skip it.",
  },
  {
    question: "Do I need to include my birth date or nationality?",
    answer:
      "No. Birth date, nationality, gender, and marital status are not required for a Dutch CV. Include only personal details that are relevant to the application, such as your city and work-authorisation context when useful.",
  },
  {
    question: "How long should a Dutch CV be?",
    answer:
      "Most profiles should stay within one to two pages, focused on relevant experience and results.",
  },
  {
    question: "Can I download a free Netherlands CV template?",
    answer: `You can compare templates and start building for free in WerkCV. The final PDF download is a one-time ${cvDownloadPrice.displayEn} including VAT, with no subscription or automatic renewal.`,
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

export default function DutchCvTemplatePage() {
  return (
    <main className="min-h-screen bg-[#FFFEF9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="border-b-4 border-black bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <Breadcrumbs
            items={[
              { label: "English", href: "/en" },
              { label: "Templates", href: "/en/templates" },
              { label: "Dutch CV template", href: "/en/dutch-cv-template" },
            ]}
          />
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-14 pt-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-slate-700">
              English CV for the Dutch market
            </p>
            <h1 className="mb-4 text-4xl font-black text-gray-900 md:text-5xl">
              Dutch CV Template in English for Jobs in the Netherlands
            </h1>
            <p className="max-w-2xl text-lg text-gray-700">
              Choose a proven Dutch-style layout, replace the example content with your
              own, and tailor the wording to the vacancy. The CV stays in English while
              the structure matches how recruiters in the Netherlands scan applications.
            </p>
            <p className="mt-4 text-sm font-bold text-gray-800">
              Build and preview free · Final PDF {cvDownloadPrice.displayEn} including VAT · No
              subscription
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/en/editor?template=professional&startSource=en_dutch_cv_template_hero"
                className="border-4 border-black bg-[#4ECDC4] px-5 py-3 font-bold text-black transition-transform hover:-translate-y-0.5"
              >
                Use this Dutch CV template
              </Link>
              <Link
                href="/en/templates?startSource=en_dutch_cv_template_compare"
                className="border-4 border-black bg-black px-5 py-3 font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                Compare English templates
              </Link>
              <Link
                href="/en/pricing#payment-methods"
                className="self-center font-bold underline"
              >
                See price and payment methods
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[470px] lg:mx-0 lg:ml-auto">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-700">
                Filled English example
              </p>
              <span className="border-2 border-black bg-white px-2 py-1 text-xs font-bold">
                Professional
              </span>
            </div>
            <SampleCVPreview
              data={templatePreviewData}
              templateId="professional"
              colorThemeId="charcoal"
              scale={0.53}
              maxHeight={590}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-6 py-10">
        <div className="border-4 border-black bg-white p-6 md:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-teal-800">
              Choose your layout
            </p>
            <h2 className="mt-2 text-3xl font-black text-gray-900">
              Three Dutch CV templates for different applications
            </h2>
            <p className="mt-3 text-gray-700">
              Start with the Professional template when you are unsure. Choose ATS-Friendly
              for cautious corporate screening, or Modern when a more visual presentation
              fits the role and employer.
            </p>
          </div>
          <div className="mt-7 grid gap-6 lg:grid-cols-3">
            {templateChoices.map((template) => (
              <article
                key={template.id}
                className="flex flex-col border-2 border-black bg-[#FFFEF9] p-4"
              >
                <div className="mb-4">
                  <SampleCVPreview
                    data={templatePreviewData}
                    templateId={template.id}
                    colorThemeId={template.themeId}
                    scale={0.34}
                    maxHeight={350}
                  />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-teal-800">
                  {template.eyebrow}
                </p>
                <h3 className="mt-1 text-xl font-black text-black">{template.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-700">
                  {template.body}
                </p>
                <p className="mt-3 text-xs font-bold text-gray-600">{template.detail}</p>
                <Link
                  href={template.href}
                  className="mt-4 block border-2 border-black bg-[#4ECDC4] px-4 py-3 text-center text-sm font-black text-black transition-colors hover:bg-[#40beb5]"
                >
                  Use {template.title} template
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-6 border-4 border-black bg-[#E9FFFC] p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-teal-800">
              What the preview shows
            </p>
            <h2 className="mt-2 text-2xl font-black text-gray-900">
              A filled Dutch CV example, not an empty mock-up
            </h2>
          </div>
          <div className="space-y-3 text-gray-700">
            <p>
              The sample uses a clear target title, a short profile, reverse-chronological
              experience, measurable achievements, and honest language levels. Those choices
              matter more than decorative styling.
            </p>
            <p>
              Open any template to replace the example with your own content. You can switch
              layouts while editing, preview the result for free, and pay only when you choose
              to download the final PDF.
            </p>
          </div>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">What makes a Dutch CV template different?</h2>
          <p className="text-gray-700 max-w-3xl">
            A Dutch CV template is usually more direct and more structured than a generic international resume layout. Dutch recruiters tend to prefer a short summary, recent experience first, straightforward section labels, and a layout that feels professional rather than overly designed. The writing can stay in English, but the structure should feel local.
          </p>
          <p className="mt-3 text-sm text-gray-600 max-w-3xl">
            For the underlying Europass ordering guidance and Greenhouse parsing guidance, see the{" "}
            <Link href="/en/guides/cv-format-netherlands-english#sources" className="font-bold underline">
              source list in our Netherlands CV format guide
            </Link>
            .
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {quickAnswerCards.map((card) => (
              <article key={card.title} className="border-2 border-black bg-[#FFFEF0] p-4">
                <h3 className="text-base font-black text-black">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{card.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="bg-[#FFF7E8] border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">Netherlands resume format and free template expectations</h2>
          <p className="text-gray-700 max-w-3xl">
            If you search for a Netherlands resume template or a Dutch resume format, you are usually looking for the same essentials: a clear target role, reverse-chronological experience, honest language levels, and a clean PDF that recruiters and ATS software can read. Start free, compare the layouts, and only pay once if you want to download the final PDF.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/en/templates?startSource=en_dutch_cv_template_resume_format" className="bg-black text-white font-bold px-5 py-3 border-4 border-black">
              Compare free templates
            </Link>
            <Link href="/en/editor?template=professional&startSource=en_dutch_cv_template_resume_format_editor" className="bg-[#4ECDC4] text-black font-bold px-5 py-3 border-4 border-black">
              Start the English CV
            </Link>
          </div>
        </div>

        <EnglishRoleExampleBand
          trackingLocation="english_template_role_examples"
          title="Not sure which template to start with?"
          description="Pick the role example closest to your application. It shows the right section order and wording before you open the editor."
        />

        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">Recommended structure</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Header: name, title, city, phone, email, LinkedIn.</li>
            <li>Profile summary: 3-4 lines tailored to the target role.</li>
            <li>Work experience: reverse-chronological with bullet outcomes.</li>
            <li>Education, certificates, language skills, and key tools.</li>
          </ol>
        </div>

        <div className="bg-[#E9FFFC] border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">English CV for Dutch-market applications</h2>
          <p className="text-gray-700 max-w-3xl">
            Treat this as a focused application package, not a generic resume-builder flow.
            You are building one clean English CV that follows Dutch-market expectations and
            can be exported when you are ready.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {packagePoints.map((point) => (
              <div key={point} className="border-2 border-black bg-white p-4 text-sm font-bold text-black">
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">What Dutch recruiters usually expect</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {dutchExpectations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">Build it quickly</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>

        <div className="bg-[#FFF7E8] border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">Choose the right next route</h2>
          <p className="text-gray-700 max-w-3xl">
            Already have part of the work done? Pick the resource that matches where you are now.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {routeChoices.map((choice) => (
              <Link key={choice.href} href={choice.href} className="block border-2 border-black bg-white p-4 transition-colors hover:bg-yellow-100">
                <h3 className="text-base font-black text-black">{choice.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{choice.body}</p>
              </Link>
            ))}
          </div>
          <div className="mt-6 border-t-2 border-black pt-5">
            <h3 className="text-sm font-black uppercase tracking-[0.14em] text-gray-700">
              Related guidance
            </h3>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {relatedGuides.map((guide) => (
                <Link key={guide.href} href={guide.href} className="font-bold underline">
                  {guide.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">How the download step works</h2>
          <p className="text-gray-700 max-w-3xl">
            WerkCV is useful when you need one strong CV for the Dutch market and do not want a resume-builder subscription. You can write, edit, compare templates, and only decide at the PDF download step.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {trustPoints.map((point) => (
              <div key={point} className="border-2 border-black bg-[#FFFEF0] p-4 text-sm font-bold text-black">
                {point}
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/en/editor?template=professional&startSource=en_dutch_cv_template_mid_editor" className="bg-[#4ECDC4] text-black font-bold px-5 py-3 border-4 border-black">
              Start in English
            </Link>
            <Link href="/en/pricing#payment-methods" className="bg-white text-black font-bold px-5 py-3 border-4 border-black">
              View pricing model
            </Link>
          </div>
        </div>

        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black mb-3">Frequently asked questions about a Netherlands resume</h2>
          <div className="divide-y-2 divide-slate-200">
            {faqs.map((item) => (
              <div key={item.question} className="py-4 first:pt-0 last:pb-0">
                <h3 className="font-black text-black">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/en/templates?startSource=en_dutch_cv_template_bottom_templates" className="bg-black text-white font-bold px-5 py-3 border-4 border-black">
            Start with a Template
          </Link>
          <Link href="/en/editor?template=professional&startSource=en_dutch_cv_template_bottom_editor" className="bg-[#4ECDC4] text-black font-bold px-5 py-3 border-4 border-black">
            Open English editor
          </Link>
          <Link href="/en" className="bg-white text-black font-bold px-5 py-3 border-4 border-black">
            Back to English hub
          </Link>
        </div>
      </section>
    </main>
  );
}
