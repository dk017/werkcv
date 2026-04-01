import IntentLandingPage from "@/components/seo/IntentLandingPage";
import { buildEnglishMetadata } from "../metadata";

const faqs = [
  {
    question: "Where can you find English-speaking companies in the Netherlands?",
    answer:
      "Most often in tech, international support, logistics, scale-ups, shared service centers, and globally oriented teams in cities like Amsterdam, Rotterdam, Utrecht, Eindhoven, and The Hague.",
  },
  {
    question: "Should I always use an English CV for these companies?",
    answer:
      "Usually yes when the vacancy is in English, but the structure should still fit Dutch hiring expectations. English language does not mean you should ignore Dutch-style clarity and section order.",
  },
  {
    question: "Why does this topic fit WerkCV?",
    answer:
      "WerkCV already helps expats and internationals with Dutch CV format, English guides, job-title translation, and salary or visa-related context for applying in the Netherlands.",
  },
  {
    question: "What should I do after finding target employers?",
    answer:
      "Adapt your CV to Dutch-market expectations, localize the job title, and then check whether salary or visa thresholds matter for your route.",
  },
];

export const metadata = buildEnglishMetadata({
  title: "English-Speaking Companies in the Netherlands",
  description:
    "Use this route to move from expat job search to a stronger CV for English-speaking companies in the Netherlands. Includes job-title and Dutch-market CV context.",
  path: "/en/english-speaking-companies-netherlands",
  nlPath: "/engelstalige-bedrijven-in-nederland",
  keywords: [
    "english speaking companies netherlands",
    "english jobs netherlands companies",
    "expat jobs netherlands english",
    "companies in netherlands english speaking",
    "dutch cv for english jobs",
  ],
});

export default function EnglishSpeakingCompaniesNetherlandsPage() {
  return (
    <IntentLandingPage
      breadcrumbItems={[
        { label: "Home", href: "/" },
        {
          label: "English-speaking companies in the Netherlands",
          href: "/en/english-speaking-companies-netherlands",
        },
      ]}
      eyebrow="Expat search intent"
      title="English-speaking companies in the Netherlands are only useful if your CV matches Dutch hiring logic"
      description="People searching this term usually need more than a list of employers. They are trying to understand whether English is acceptable, how to adapt their CV, and how to position themselves for Dutch-market recruiting even inside international teams."
      badges={["Expat", "English CV", "Netherlands", "Localization", "Job search"]}
      primaryCta={{ href: "/en/dutch-cv-template", label: "Open English CV template route" }}
      secondaryCta={{ href: "/tools/job-title-translator", label: "Translate job titles" }}
      sidebarTitle="What these visitors usually need next"
      sidebarItems={[
        "A CV that fits Dutch expectations even in English.",
        "Clear English job-title wording for vacancies and LinkedIn.",
        "Salary or visa context for relocation or sponsorship routes.",
        "Practical examples instead of generic expat advice.",
      ]}
      cardsTitle="Why this page matters for WerkCV"
      cards={[
        {
          title: "It sits close to real application intent",
          body: "This is not broad awareness traffic. Most visitors are already trying to apply, compare employers, or prepare a CV for real vacancies in the Netherlands.",
        },
        {
          title: "It connects discovery with localization",
          body: "Finding English-speaking employers is one problem. Adapting your CV and job-title language is the next problem, and that is where WerkCV becomes useful.",
        },
        {
          title: "It strengthens the expat content cluster",
          body: "This page complements the existing English hub, example pages, and expat tools without duplicating ATS or format pages you already have.",
        },
        {
          title: "It can convert into tool usage quickly",
          body: "Visitors here have a natural next step into English CV templates, job-title translation, and salary or visa checkers.",
        },
      ]}
      relatedTitle="Best next pages for internationals applying in the Netherlands"
      relatedDescription="Use these routes to move from search intent to an application-ready CV and clearer local context."
      relatedLinks={[
        {
          href: "/en/dutch-cv-template",
          label: "Dutch CV template in English",
          body: "Start with a Dutch-style structure that still works for English applications.",
        },
        {
          href: "/en/dutch-cv-examples",
          label: "Dutch CV examples",
          body: "Review role-based examples and adapt them for your own English CV.",
        },
        {
          href: "/tools/kennismigrant-salary-checker",
          label: "Highly skilled migrant salary checker",
          body: "Check whether salary thresholds matter for your target employers or route.",
        },
        {
          href: "/tools/eu-blue-card-checker",
          label: "EU Blue Card checker",
          body: "Compare Blue Card logic with sponsor-based Dutch hiring paths.",
        },
      ]}
      faqs={faqs}
      footerTitle="Turn expat job search into a stronger Dutch-market CV"
      footerBody="Use the English WerkCV routes to build a clearer, more localized CV for employers in the Netherlands instead of relying on generic international resume advice."
      footerPrimaryCta={{ href: "/en/dutch-cv-template", label: "Build your CV" }}
      footerSecondaryCta={{ href: "/en", label: "Open English guide hub" }}
    />
  );
}
