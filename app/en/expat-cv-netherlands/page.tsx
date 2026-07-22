import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { buildEnglishMetadata } from "../metadata";

export const metadata = buildEnglishMetadata({
  title: "Expat CV Netherlands",
  description:
    "A practical expert guide for expats building a CV for jobs in the Netherlands. Decide English vs Dutch, visa wording, language levels, personal details, and next steps.",
  path: "/en/expat-cv-netherlands",
  keywords: [
    "expat cv netherlands",
    "expat cv netherlands guide",
    "dutch cv for expats",
    "cv for expats netherlands",
    "english cv netherlands expats",
    "netherlands cv visa status",
    "dutch cv work authorization",
  ],
});

const pageUrl = "https://werkcv.nl/en/expat-cv-netherlands";

const decisionCards = [
  {
    label: "The vacancy is in English",
    answer: "Use English, but keep Dutch-market structure.",
    detail:
      "This is common for tech, international support, SaaS, finance, research, logistics, and multinational teams. The mistake is not the language; it is sending a generic international resume that does not answer local recruiter questions.",
  },
  {
    label: "The vacancy is in Dutch",
    answer: "Use Dutch unless the employer clearly says English is accepted.",
    detail:
      "If your Dutch is still developing, do not hide it. Be precise about your level and target roles where English is realistic.",
  },
  {
    label: "The company is international but the role is local",
    answer: "Match the vacancy language and add practical local signals.",
    detail:
      "Show city or relocation timing, language levels, availability, and role-specific proof in the first half of the CV.",
  },
];

const firstPageSignals = [
  "Target role in Dutch-market wording, not only your old international title.",
  "City, relocation timing, or Netherlands availability when it affects hiring.",
  "English and Dutch language levels shown separately.",
  "Work authorization or visa route only when it reduces recruiter uncertainty.",
  "Recent work experience first, with tools, scope, and proof bullets.",
];

const authorizationExamples = [
  {
    situation: "You can work in the Netherlands without employer sponsorship",
    wording: "Work authorization: eligible to work in the Netherlands. Available in Amsterdam from July 2026.",
    why:
      "It removes doubt without turning the CV into an immigration document.",
  },
  {
    situation: "You need a recognised sponsor",
    wording: "Work route: highly skilled migrant route; employer sponsorship required.",
    why:
      "This is clearer than vague phrases such as open to relocation or visa support needed.",
  },
  {
    situation: "You are in or eligible for orientation year",
    wording: "Residence route: orientation year/zoekjaar eligible until September 2026.",
    why:
      "It helps employers understand timing and the possible reduced salary criterion conversation.",
  },
  {
    situation: "You are comparing EU Blue Card and sponsor route",
    wording: "Work route: EU Blue Card or highly skilled migrant route, depending on contract and employer setup.",
    why:
      "Use this only when accurate. It signals that the route is a hiring condition, not your main selling point.",
  },
];

const languageExamples = [
  {
    weak: "Dutch: basic",
    stronger: "Dutch: A2, improving through weekly lessons. English: C1 professional.",
  },
  {
    weak: "Fluent English, some Dutch",
    stronger: "English: C1 professional. Dutch: B1 workplace conversations, not yet for client-facing Dutch writing.",
  },
  {
    weak: "Learning Dutch",
    stronger: "Dutch: beginner A1-A2. Targeting English-speaking roles while actively studying Dutch.",
  },
];

const personalDetails = [
  {
    item: "Photo",
    recommendation: "Optional. Use only if professional and culturally comfortable.",
    note:
      "A photo is still seen on some Dutch CVs, but it is not required. If the photo could distract from your qualifications, skip it.",
  },
  {
    item: "Date of birth",
    recommendation: "Usually skip it unless there is a specific reason.",
    note:
      "Age is rarely needed to assess job fit. Leaving it out keeps the CV focused on experience and skills.",
  },
  {
    item: "Nationality",
    recommendation: "Usually skip it; mention work authorization instead.",
    note:
      "Recruiters need to understand whether you can be hired, not your identity. Work route is more useful than passport information.",
  },
  {
    item: "Marital status, religion, family details",
    recommendation: "Do not include these.",
    note:
      "They do not help a recruiter assess role fit and can create unnecessary bias.",
  },
  {
    item: "Address",
    recommendation: "Use city or region, not full street address.",
    note:
      "Amsterdam, Utrecht, Eindhoven, Rotterdam, The Hague, or relocating to the Netherlands is enough for most applications.",
  },
];

const routeSteps = [
  {
    title: "Highly skilled migrant",
    body:
      "Best when an employer is or can become the recognised sponsor and your salary meets the IND threshold for your age or reduced criterion.",
    href: "/tools/kennismigrant-salary-checker",
    cta: "Check HSM salary route",
  },
  {
    title: "EU Blue Card",
    body:
      "Useful when the role is highly qualified, the salary and contract fit, and the employer route may not depend on recognised sponsor status.",
    href: "/tools/eu-blue-card-checker",
    cta: "Check Blue Card route",
  },
  {
    title: "Zoekjaar or orientation year",
    body:
      "Useful for recent graduates and researchers who need a bridge from study or research into Dutch employment.",
    href: "/tools/zoekjaar-checker",
    cta: "Check zoekjaar timing",
  },
  {
    title: "30% ruling context",
    body:
      "Relevant after salary and hiring route look realistic. It affects compensation planning, not the basic CV structure.",
    href: "/tools/30-procent-regeling-checker",
    cta: "Check 30% ruling basics",
  },
];

const cvStructure = [
  {
    title: "Header",
    detail:
      "Name, target title, city or relocation timing, phone, email, LinkedIn, portfolio if relevant.",
  },
  {
    title: "Profile summary",
    detail:
      "Three to five lines that connect your background to the Dutch role. Mention sector, seniority, tools, strongest proof, and language or availability only when useful.",
  },
  {
    title: "Work experience",
    detail:
      "Reverse chronological. Each role should show title, company, country/city if useful, dates, scope, tools, and result bullets.",
  },
  {
    title: "Education and credentials",
    detail:
      "List degrees clearly. If the institution is unfamiliar in the Netherlands, add one short clarifier such as MSc Computer Science or accredited university.",
  },
  {
    title: "Skills and languages",
    detail:
      "Separate tools from languages. Use CEFR levels for Dutch and English where possible.",
  },
];

const profileExamples = [
  {
    label: "Software engineer moving from India to the Netherlands",
    summary:
      "Backend software engineer with 6 years of experience in Java, Spring Boot, AWS, and payments platforms. Built API services used by high-volume merchant teams and reduced incident follow-up time through better monitoring and documentation. Targeting English-speaking backend roles in the Netherlands; highly skilled migrant sponsorship required.",
    why:
      "The summary links role, seniority, tools, business context, target market, and work route in one compact block.",
  },
  {
    label: "Customer success professional already in Amsterdam",
    summary:
      "Customer success specialist based in Amsterdam with 4 years of SaaS onboarding and retention experience. Strong in HubSpot, Zendesk, English customer communication, and cross-team handover notes. Dutch A2, actively studying; targeting English-speaking customer success roles in international teams.",
    why:
      "The language limitation is honest, but it is framed with the right target role instead of presented as a weakness.",
  },
];

const sourceLinks = [
  {
    label: "Work in NL - CV",
    href: "https://www.workinnl.nl/en/employment/cv-en/default.aspx",
    note:
      "Official Dutch employment guidance on the role of a CV in employer screening.",
  },
  {
    label: "Europass - Create your CV",
    href: "https://europass.europa.eu/en/create-europass-cv",
    note:
      "European guidance on readable, tailored CVs and reverse-chronological work history.",
  },
  {
    label: "IND - Required amounts and income requirements",
    href: "https://ind.nl/en/required-amounts-income-requirements",
    note:
      "Official IND page for current income thresholds used by migration routes.",
  },
  {
    label: "IND - Highly skilled migrant",
    href: "https://ind.nl/en/residence-permits/work/highly-skilled-migrant",
    note:
      "Official route guidance for highly skilled migrant applications and recognised sponsorship.",
  },
  {
    label: "IND - European Blue Card",
    href: "https://ind.nl/en/residence-permits/work/european-blue-card-residence-permit",
    note:
      "Official route guidance for EU Blue Card applications in the Netherlands.",
  },
  {
    label: "IND - Orientation year for highly educated persons",
    href: "https://ind.nl/en/residence-permits/work/residence-permit-for-orientation-year",
    note:
      "Official route guidance for zoekjaar/orientation year timing and eligibility.",
  },
  {
    label: "Belastingdienst - 30% ruling",
    href: "https://www.belastingdienst.nl/wps/wcm/connect/en/individuals/content/coming-to-work-in-the-netherlands-30-percent-facility",
    note:
      "Official tax authority guidance on the Dutch 30% facility for incoming employees.",
  },
  {
    label: "Government.nl - Equal treatment",
    href: "https://www.government.nl/topics/discrimination/prohibition-of-discrimination",
    note:
      "General Dutch government context for equal treatment and avoiding unnecessary personal details.",
  },
];

const faqs = [
  {
    question: "Should an expat CV for the Netherlands be in English or Dutch?",
    answer:
      "Use the language of the vacancy. English is normal for many international roles, but a Dutch-language vacancy usually expects Dutch unless the employer says otherwise.",
  },
  {
    question: "Should I put visa status on my CV in the Netherlands?",
    answer:
      "Mention work authorization or visa route only when it helps the employer understand whether and how you can be hired. Keep it short and factual.",
  },
  {
    question: "Should I include nationality on a Dutch CV?",
    answer:
      "Usually no. Work authorization is more useful than nationality. Keep the CV focused on role fit, eligibility, experience, and language level.",
  },
  {
    question: "Should I include a photo on my CV in the Netherlands?",
    answer:
      "A photo is optional. If you include one, use a professional, neutral photo. If you are unsure, skip it and let the CV content carry the application.",
  },
  {
    question: "How do I show limited Dutch without hurting my chances?",
    answer:
      "Be precise. Use CEFR levels such as A2, B1, or C1 and connect your level to the roles you target. For example: Dutch A2, targeting English-speaking product roles while studying Dutch.",
  },
  {
    question: "How long should an expat CV be in the Netherlands?",
    answer:
      "One page can work for a graduate or short career; one to two pages is common for experienced applicants. Prioritise evidence relevant to the vacancy and remove older detail rather than shrinking the type. The employer's instructions take priority.",
  },
  {
    question: "Do I need a Dutch address or BSN on my CV?",
    answer:
      "Do not put your BSN on a CV. A city, region, or clear relocation note is normally enough location context. Add a full street address only when an employer specifically needs it later in the hiring process.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Expat CV Netherlands",
  description:
    "A practical decision guide for expats creating a CV for jobs in the Netherlands.",
  inLanguage: "en-NL",
  mainEntityOfPage: pageUrl,
  datePublished: "2026-05-13",
  dateModified: "2026-05-14",
  author: { "@id": "https://werkcv.nl/#organization" },
  publisher: { "@id": "https://werkcv.nl/#organization" },
  about: [
    "CV format in the Netherlands",
    "Expat job applications",
    "Dutch hiring expectations",
    "Work authorization wording",
  ],
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
function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-slate-500">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-black leading-tight text-slate-950 md:text-4xl">
        {title}
      </h2>
      {children && (
        <div className="mt-4 text-lg leading-relaxed text-slate-700">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ExpatCvNetherlandsPage() {
  return (
    <main className="min-h-screen bg-[#FFFEF9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="border-b-4 border-black bg-white">
        <div className="mx-auto max-w-6xl px-6 py-3">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "English hub", href: "/en" },
              { label: "Expat CV Netherlands", href: "/en/expat-cv-netherlands" },
            ]}
          />
        </div>
      </div>

      <section className="border-b-4 border-black bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-4 inline-block border-2 border-black bg-[#4ECDC4] px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-black">
              Expat decision guide
            </p>
            <p className="mb-4 text-sm font-bold text-slate-600">
              Last reviewed May 14, 2026
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              Expat CV Netherlands: build a CV Dutch recruiters can trust
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-700">
              A strong expat CV for the Netherlands does not need to hide your
              international background. It needs to make your role fit, language
              level, availability, and hiring route easy to understand in the
              first scan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/en/templates?startSource=en_expat_templates"
                trackingLocation="expat_cv_hero"
                trackingLabel="templates"
                className="border-4 border-black bg-black px-6 py-3 text-sm font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                Choose an English CV template
              </TrackedLandingLink>
              <TrackedLandingLink
                href="/en/editor?template=professional&startSource=en_expat_editor"
                trackingLocation="expat_cv_hero"
                trackingLabel="editor"
                className="border-4 border-black bg-[#4ECDC4] px-6 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                Open English editor
              </TrackedLandingLink>
            </div>
          </div>

          <aside className="border-4 border-black bg-[#FFF7E8] p-6 shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">
              Use this page if
            </p>
            <ul className="mt-4 space-y-3 text-sm font-semibold leading-relaxed text-slate-800">
              <li>You are applying in the Netherlands with an international CV.</li>
              <li>You are unsure whether to use English or Dutch.</li>
              <li>You do not know how much visa or work route context to show.</li>
              <li>You want Dutch-market structure without generic resume advice.</li>
            </ul>
          </aside>
        </div>
      </section>

      <article className="mx-auto max-w-6xl px-6 py-12">
        <section className="mb-14">
          <SectionHeading
            eyebrow="Quick answer"
            title="Your expat CV has one job: reduce uncertainty fast"
          >
            <p>
              Dutch employers and recruiters use the CV to decide who is worth
              inviting. For expats, that decision has extra friction: does the
              experience map to the local role, can communication work, is the
              person available in the Netherlands, and is the hiring route
              realistic?
            </p>
            <p className="mt-3">
              The safest answer is not a longer CV. It is a clearer first page:
              local role wording, recent experience first, language levels, and
              only the work authorization detail that helps the recruiter move
              forward.
            </p>
          </SectionHeading>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {firstPageSignals.map((signal) => (
              <div
                key={signal}
                className="border-3 border-black bg-white p-4 text-sm font-bold leading-relaxed text-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                {signal}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 border-y-4 border-black py-12">
          <SectionHeading
            eyebrow="Language decision"
            title="Should your CV be in English or Dutch?"
          >
            <p>
              Use the language of the vacancy as your default rule. English is
              normal in many international roles, but the structure still needs
              to feel familiar to Dutch recruiters: direct summary, recent
              experience first, clear tools and outcomes, and no decorative
              layout that makes the document hard to scan.
            </p>
          </SectionHeading>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {decisionCards.map((card) => (
              <div
                key={card.label}
                className="border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                  {card.label}
                </p>
                <h3 className="mt-2 text-xl font-black text-slate-950">
                  {card.answer}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  {card.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Structure"
            title="Use Dutch-market structure, even when the text is English"
          >
            <p>
              A Dutch-market CV should feel calm, practical, and easy to verify.
              Expats often lose interviews because the CV assumes the recruiter
              understands foreign job titles, company context, education systems,
              or visa details. Spell out the things that affect hiring, but keep
              the document focused on work.
            </p>
          </SectionHeading>

          <div className="mt-8 divide-y-2 divide-black border-4 border-black bg-white">
            {cvStructure.map((item) => (
              <div
                key={item.title}
                className="grid gap-3 p-5 md:grid-cols-[220px_1fr]"
              >
                <h3 className="text-lg font-black text-slate-950">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-slate-700">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-[#FFF7E8] p-6 shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]">
          <SectionHeading
            eyebrow="Profile examples"
            title="What a strong expat profile summary sounds like"
          >
            <p>
              The profile summary is where many expat CVs become too broad. Do
              not write a personal story. Use it as a bridge between your
              international experience and the Dutch vacancy.
            </p>
          </SectionHeading>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {profileExamples.map((example) => (
              <div key={example.label} className="border-3 border-black bg-white p-5">
                <h3 className="font-black text-slate-950">{example.label}</h3>
                <p className="mt-3 border-2 border-black bg-[#FFFEF9] p-4 text-sm font-semibold leading-relaxed text-slate-900">
                  {example.summary}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  {example.why}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 bg-[#E9FFFC] px-5 py-10 md:px-8">
          <SectionHeading
            eyebrow="Work authorization"
            title="What should you put for visa or work authorization?"
          >
            <p>
              Do not make the CV about immigration. Do add one clear line when
              it helps the employer understand whether the application is
              realistic. The line belongs near the header or profile, not buried
              at the end.
            </p>
          </SectionHeading>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {authorizationExamples.map((example) => (
              <div
                key={example.situation}
                className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="font-black text-slate-950">
                  {example.situation}
                </h3>
                <p className="mt-3 border-2 border-black bg-[#FFFEF9] p-3 text-sm font-bold leading-relaxed text-slate-900">
                  {example.wording}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  {example.why}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Language levels"
            title="How to show Dutch level without hurting yourself"
          >
            <p>
              Vague language wording creates doubt. Be specific, especially if
              your Dutch is not yet strong. A recruiter can work with a clear A2
              or B1 statement when the role is English-speaking. They cannot work
              with a CV that pretends language is irrelevant.
            </p>
          </SectionHeading>

          <div className="mt-8 overflow-hidden border-4 border-black bg-white">
            <div className="grid grid-cols-1 border-b-4 border-black bg-black text-sm font-black text-white md:grid-cols-2">
              <div className="p-4">Weak wording</div>
              <div className="p-4">Stronger wording</div>
            </div>
            {languageExamples.map((item) => (
              <div
                key={item.weak}
                className="grid grid-cols-1 border-b-2 border-black last:border-b-0 md:grid-cols-2"
              >
                <div className="bg-red-50 p-4 text-sm font-semibold text-slate-800">
                  {item.weak}
                </div>
                <div className="bg-green-50 p-4 text-sm font-semibold text-slate-900">
                  {item.stronger}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]">
          <SectionHeading
            eyebrow="Personal details"
            title="Photo, date of birth, nationality: include or skip?"
          >
            <p>
              A strong expat CV keeps personal details practical. The recruiter
              needs to know how to contact you, where you are based or when you
              can relocate, what language you can work in, and whether the
              hiring route is realistic. Most identity details do not help that
              decision.
            </p>
          </SectionHeading>

          <div className="mt-8 divide-y-2 divide-black border-2 border-black">
            {personalDetails.map((detail) => (
              <div
                key={detail.item}
                className="grid gap-4 bg-[#FFFEF9] p-4 md:grid-cols-[160px_240px_1fr]"
              >
                <h3 className="font-black text-slate-950">{detail.item}</h3>
                <p className="text-sm font-black text-slate-800">
                  {detail.recommendation}
                </p>
                <p className="text-sm leading-relaxed text-slate-700">
                  {detail.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Route next step"
            title="Highly skilled migrant, Blue Card, zoekjaar, or 30% ruling?"
          >
            <p>
              Your CV does not need to explain the full immigration route. It
              should show the hiring facts that matter, then let a focused tool
              handle the route check. Use the route only to remove uncertainty,
              not as the main argument for hiring you.
            </p>
          </SectionHeading>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {routeSteps.map((route) => (
              <TrackedLandingLink
                key={route.href}
                href={route.href}
                trackingLocation="expat_cv_route_tools"
                trackingLabel={route.title}
                className="block border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                <h3 className="text-xl font-black text-slate-950">
                  {route.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  {route.body}
                </p>
                <span className="mt-4 inline-block border-2 border-black bg-[#4ECDC4] px-3 py-2 text-sm font-black text-black">
                  {route.cta}
                </span>
              </TrackedLandingLink>
            ))}
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-black p-7 text-white">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4ECDC4]">
                Build the actual CV
              </p>
              <h2 className="mt-2 text-3xl font-black leading-tight md:text-4xl">
                Turn the decisions into a clean English CV for the Netherlands
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-200">
                Start with a Dutch-style template, keep the wording in English
                when the vacancy is English, and export only when the document is
                ready. No subscription is needed for individual job seekers.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <TrackedLandingLink
                href="/en/templates?startSource=en_expat_bottom_templates"
                trackingLocation="expat_cv_bottom"
                trackingLabel="templates"
                className="border-4 border-white bg-[#4ECDC4] px-6 py-3 text-center text-sm font-black text-black"
              >
                Choose English template
              </TrackedLandingLink>
              <TrackedLandingLink
                href="/en/editor?template=professional&startSource=en_expat_bottom_editor"
                trackingLocation="expat_cv_bottom"
                trackingLabel="editor"
                className="border-4 border-white bg-white px-6 py-3 text-center text-sm font-black text-black"
              >
                Open English editor
              </TrackedLandingLink>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="FAQ"
            title="Common expat CV questions"
          />
          <div className="mt-8 space-y-4">
            {faqs.map((item) => (
              <details
                key={item.question}
                className="group border-4 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-4 font-black text-slate-950">
                  {item.question}
                  <span className="text-xl transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-4 pb-4 leading-relaxed text-slate-700">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Sources"
            title="Sources behind this guide"
          >
            <p>
              This page combines WerkCV&apos;s Dutch-market CV workflow with official
              public sources for CV use, migration routes, tax context, and equal
              treatment. It is practical guidance, not legal advice.
            </p>
          </SectionHeading>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {sourceLinks.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-3 border-black bg-white p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                <h3 className="text-sm font-black text-slate-950">
                  {source.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {source.note}
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="border-t-4 border-black pt-10">
          <SectionHeading
            eyebrow="Related routes"
            title="Best next pages for expats"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                href: "/en/dutch-cv-template",
                title: "Dutch CV template in English",
                body: "Start with the template route if you already know what your CV should say.",
              },
              {
                href: "/en/cv-netherlands-without-dutch-language",
                title: "CV without Dutch language",
                body: "Useful if you are targeting English-speaking roles while still learning Dutch.",
              },
              {
                href: "/en/english-speaking-companies-netherlands",
                title: "English-speaking companies",
                body: "Move from employer search to CV localization and route checks.",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                <h3 className="font-black text-slate-950">{link.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {link.body}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
