import Link from "next/link";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
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
      <div className="wk-eyebrow mb-2">
        <span>{eyebrow}</span>
      </div>
      <h2 className="mt-2 text-3xl font-semibold text-[var(--wk-ink)]">
        {title}
      </h2>
      {children && (
        <div className="mt-4 text-lg leading-8 text-[var(--wk-ink-muted)]">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ExpatCvNetherlandsPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="wk-container py-10 pb-28 md:pb-10">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "English hub", href: "/en" },
              { label: "Expat CV Netherlands", href: "/en/expat-cv-netherlands" },
            ]}
          />
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="wk-eyebrow mb-4">
              <span>Expat decision guide</span>
            </div>
            <p className="mb-4 text-sm font-medium leading-6 text-[var(--wk-ink-muted)]">
              Last reviewed May 14, 2026
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">
              Expat CV Netherlands: build a CV <span className="wk-hero-highlight">Dutch recruiters can trust</span>
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--wk-ink-muted)]">
              A strong expat CV for the Netherlands does not need to hide your
              international background. It needs to make your role fit, language
              level, availability, and hiring route easy to understand in the
              first scan.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/en/templates?startSource=en_expat_templates"
                trackingLocation="expat_cv_hero"
                trackingLabel="templates"
                className="wk-button wk-button-primary"
              >
                Choose an English CV template
              </TrackedLandingLink>
              <TrackedLandingLink
                href="/en/editor?template=professional&startSource=en_expat_editor"
                trackingLocation="expat_cv_hero"
                trackingLabel="editor"
                className="wk-button wk-button-secondary"
              >
                Open English editor
              </TrackedLandingLink>
            </div>
          </div>

          <aside className="h-fit rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-highlight-soft)] p-6 shadow-[var(--wk-shadow-sm)]">
            <div className="wk-eyebrow mb-2">
              <span>Use this page if</span>
            </div>
            <ul className="mt-4 space-y-3 text-sm font-medium leading-6 text-[var(--wk-ink)]">
              <li>You are applying in the Netherlands with an international CV.</li>
              <li>You are unsure whether to use English or Dutch.</li>
              <li>You do not know how much visa or work route context to show.</li>
              <li>You want Dutch-market structure without generic resume advice.</li>
            </ul>
          </aside>
        </section>

        <article>
          <section className="mb-12">
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
                  className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4 text-sm font-medium leading-6 text-[var(--wk-ink)]"
                >
                  {signal}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
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
                <div key={card.label} className="wk-card p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wk-ink-muted)]">
                    {card.label}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-[var(--wk-ink)]">
                    {card.answer}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                    {card.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
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

            <div className="mt-8 divide-y divide-[var(--wk-border)] overflow-hidden rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)] shadow-[var(--wk-shadow-sm)]">
              {cvStructure.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-3 p-5 md:grid-cols-[220px_1fr]"
                >
                  <h3 className="text-lg font-semibold text-[var(--wk-ink)]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-6 text-[var(--wk-ink-muted)]">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-highlight-soft)] p-6 shadow-[var(--wk-shadow-sm)]">
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
                <div
                  key={example.label}
                  className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-5"
                >
                  <h3 className="font-semibold text-[var(--wk-ink)]">
                    {example.label}
                  </h3>
                  <p className="mt-3 rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4 text-sm font-medium leading-6 text-[var(--wk-ink)]">
                    {example.summary}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                    {example.why}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="wk-card wk-card-accent mb-12">
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
                  className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-5"
                >
                  <h3 className="font-semibold text-[var(--wk-ink)]">
                    {example.situation}
                  </h3>
                  <p className="mt-3 rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-3 text-sm font-medium leading-6 text-[var(--wk-ink)]">
                    {example.wording}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                    {example.why}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
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

            <div className="mt-8 overflow-hidden rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)] shadow-[var(--wk-shadow-sm)]">
              <div className="grid grid-cols-1 border-b border-[var(--wk-border)] bg-[var(--wk-warning-soft)] text-sm font-semibold text-[var(--wk-ink)] md:grid-cols-2">
                <div className="p-4">Weak wording</div>
                <div className="p-4">Stronger wording</div>
              </div>
              {languageExamples.map((item) => (
                <div
                  key={item.weak}
                  className="grid grid-cols-1 border-b border-[var(--wk-border)] last:border-b-0 md:grid-cols-2"
                >
                  <div className="bg-[var(--wk-danger-soft)] p-4 text-sm font-medium leading-6 text-[var(--wk-ink)]">
                    {item.weak}
                  </div>
                  <div className="bg-[var(--wk-success-soft)] p-4 text-sm font-medium leading-6 text-[var(--wk-ink)]">
                    {item.stronger}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="wk-card mb-12">
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

            <div className="mt-8 divide-y divide-[var(--wk-border)] overflow-hidden rounded-[var(--wk-radius-md)] border border-[var(--wk-border)]">
              {personalDetails.map((detail) => (
                <div
                  key={detail.item}
                  className="grid gap-4 bg-[var(--wk-surface-subtle)] p-4 md:grid-cols-[160px_240px_1fr]"
                >
                  <h3 className="font-semibold text-[var(--wk-ink)]">
                    {detail.item}
                  </h3>
                  <p className="text-sm font-semibold text-[var(--wk-ink)]">
                    {detail.recommendation}
                  </p>
                  <p className="text-sm leading-6 text-[var(--wk-ink-muted)]">
                    {detail.note}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
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
                  className="block rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-5 shadow-[var(--wk-shadow-sm)] transition-colors hover:border-[var(--wk-primary)]"
                >
                  <h3 className="text-xl font-semibold text-[var(--wk-ink)]">
                    {route.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                    {route.body}
                  </p>
                  <span className="mt-4 wk-badge wk-badge-accent">
                    {route.cta}
                  </span>
                </TrackedLandingLink>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-[var(--wk-radius-lg)] bg-[var(--wk-primary)] p-8 text-[var(--wk-primary-contrast)] md:p-12">
            <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--wk-accent)]">
                  Build the actual CV
                </p>
                <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
                  Turn the decisions into a clean English CV for the Netherlands
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--wk-primary-contrast)]/85">
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
                  className="wk-button wk-button-accent"
                >
                  Choose English template
                </TrackedLandingLink>
                <TrackedLandingLink
                  href="/en/editor?template=professional&startSource=en_expat_bottom_editor"
                  trackingLocation="expat_cv_bottom"
                  trackingLabel="editor"
                  className="wk-button wk-button-secondary"
                >
                  Open English editor
                </TrackedLandingLink>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <SectionHeading
              eyebrow="FAQ"
              title="Common expat CV questions"
            />
            <div className="mt-8 space-y-4">
              {faqs.map((item) => (
                <details
                  key={item.question}
                  className="group wk-card p-5"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-[var(--wk-ink)]">
                    {item.question}
                    <span className="text-xl text-[var(--wk-ink-muted)] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-[var(--wk-ink-muted)]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="mb-12">
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
                  className="block rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-4 shadow-[var(--wk-shadow-sm)] transition-colors hover:border-[var(--wk-primary)]"
                >
                  <h3 className="text-sm font-semibold text-[var(--wk-ink)]">
                    {source.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                    {source.note}
                  </p>
                </a>
              ))}
            </div>
          </section>

          <section className="mb-12">
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
                {
                  href: "/en/guides/recent-graduate-cv-netherlands",
                  title: "Recent graduate CV guide",
                  body: "Turn projects, internships and study evidence into a focused starter CV.",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-5 shadow-[var(--wk-shadow-sm)] transition-colors hover:border-[var(--wk-primary)]"
                >
                  <h3 className="font-semibold text-[var(--wk-ink)]">
                    {link.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                    {link.body}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </div>

      <Footer variant="brand" uiLanguage="en" />
    </main>
  );
}
