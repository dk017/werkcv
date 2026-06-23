import type { CVData } from "@/lib/cv";
import { EnglishRoleCvExamplePage } from "../components/EnglishRoleCvExamplePage";
import { buildEnglishMetadata } from "../metadata";

const pagePath = "/en/english-cv-example-finance-accounting-netherlands";

export const metadata = buildEnglishMetadata({
  title: "Finance and Accounting CV Example Netherlands 2026",
  description:
    "Use a realistic English finance and accounting CV example for the Netherlands. Includes month-end close, reporting, audit support, Excel, ERP, and a one-click editor start.",
  path: pagePath,
  keywords: [
    "finance accounting cv example netherlands",
    "accountant cv example netherlands english",
    "finance assistant resume netherlands",
    "controller cv netherlands",
    "accounting resume netherlands",
  ],
});

const sampleCV: CVData = {
  personal: {
    name: "Sofia de Jong",
    title: "Finance and Accounting Specialist",
    resumeLanguage: "en",
    email: "sofia.dejong@example.com",
    phone: "+31 6 4567 8901",
    location: "Amsterdam, Netherlands",
    address: "",
    postalCode: "",
    summary:
      "Finance and accounting specialist with 6 years of experience in month-end close, accounts payable and receivable, VAT preparation, management reporting, audit support, and process improvement. Strong in Exact Online, SAP, Excel, Power BI, reconciliations, and clear communication with operations and external accountants.",
    birthDate: "",
    birthPlace: "",
    nationality: "",
    driversLicense: "",
    gender: "",
    maritalStatus: "",
    linkedIn: "linkedin.com/in/sofiadejong",
    github: "",
    website: "",
    photo: "",
  },
  experience: [
    {
      role: "Finance and Accounting Specialist",
      company: "Delta Retail Group",
      location: "Amsterdam",
      start: "Feb 2021",
      end: "Present",
      description: "",
      highlights: [
        "Supported month-end close for 5 Dutch entities, including accruals, balance-sheet reconciliations, revenue checks, and variance analysis.",
        "Reduced overdue supplier invoices by 28% by improving AP follow-up, payment run preparation, and approval reminders in SAP.",
        "Prepared VAT files and audit schedules for external accountants, improving documentation quality and reducing follow-up questions.",
        "Built Excel and Power BI reports for store managers covering margin, stock corrections, payment differences, and cost centre trends.",
      ],
    },
    {
      role: "Accounts Assistant",
      company: "NorthLine Services B.V.",
      location: "Utrecht",
      start: "Sep 2018",
      end: "Jan 2021",
      description: "",
      highlights: [
        "Processed purchase invoices, bank transactions, and customer receipts in Exact Online for a growing service company.",
        "Maintained debtor follow-up lists and helped reduce average payment delay from 24 to 16 days.",
        "Assisted with payroll checks, expense claims, and quarterly reporting packs for management.",
      ],
    },
  ],
  education: [
    {
      degree: "HBO Finance & Control",
      school: "Amsterdam University of Applied Sciences",
      location: "Amsterdam",
      start: "2014",
      end: "2018",
      description: "Focus on financial accounting, management control, reporting, and business process improvement.",
    },
  ],
  skills: [
    { name: "Month-end close", level: 5 },
    { name: "Accounts payable", level: 5 },
    { name: "Accounts receivable", level: 4 },
    { name: "VAT preparation", level: 4 },
    { name: "SAP", level: 4 },
    { name: "Exact Online", level: 5 },
    { name: "Excel", level: 5 },
    { name: "Power BI", level: 4 },
  ],
  languages: [
    { name: "English", level: "Fluent" },
    { name: "Dutch", level: "Fluent" },
  ],
  internships: [],
  interests: [],
  properties: ["Accurate", "Analytical", "Process-minded"],
  courses: [
    { name: "Advanced Excel for Finance", institution: "NCOI", year: "2024" },
    { name: "Power BI Reporting Basics", institution: "Microsoft Learn", year: "2023" },
  ],
  awards: [],
  references: [],
  sideActivities: [],
  customSections: [],
};

const faqs = [
  {
    question: "What should a finance or accounting CV show first?",
    answer:
      "Show your finance scope, systems, reporting tasks, reconciliations, close responsibilities, and accuracy. Employers need to know which part of the finance cycle you can own.",
  },
  {
    question: "Should I call myself accountant on an English CV?",
    answer:
      "Use the title that matches your actual role and qualifications. If you are not applying as a registered accountant, finance specialist, accounting specialist, assistant accountant, or controller may be clearer.",
  },
  {
    question: "Should I include ERP and Excel skills?",
    answer:
      "Yes. Finance employers scan for systems such as SAP, Exact, AFAS, Twinfield, Oracle, Excel, and Power BI because they show how quickly you can work in their reporting environment.",
  },
];

const sources = [
  {
    label: "Work in NL - CV guidance",
    href: "https://www.workinnl.nl/en/employment/cv-en/default.aspx",
    note: "Official guidance that a CV should be clear, well laid out, and quick to understand.",
  },
  {
    label: "IND - 2026 income requirements",
    href: "https://ind.nl/en/required-amounts-income-requirements",
    note: "Useful when sponsorship or work-route details affect the application.",
  },
  {
    label: "WerkCV English templates",
    href: "https://werkcv.nl/en/templates",
    note: "English CV templates that keep the user in the Netherlands-focused editor flow.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Finance and Accounting CV Example Netherlands",
  description: "A practical English CV example for finance and accounting roles in the Netherlands.",
  inLanguage: "en-NL",
  mainEntityOfPage: `https://werkcv.nl${pagePath}`,
  datePublished: "2026-06-23",
  dateModified: "2026-06-23",
  author: { "@type": "Organization", name: "WerkCV", url: "https://werkcv.nl" },
  publisher: { "@type": "Organization", name: "WerkCV", url: "https://werkcv.nl" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "en-NL",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FinanceAccountingCvExamplePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <EnglishRoleCvExamplePage
        roleSlug="finance-accounting"
        pagePath={pagePath}
        eyebrow="English CV example for finance roles"
        h1="Finance and accounting CV example that opens directly in the editor"
        intro="Start from a realistic finance CV written for applications in the Netherlands. The example shows close work, reporting, reconciliations, ERP systems, audit support, and measurable process improvements."
        themeColor="blue"
        templateId="professional"
        colorThemeId="classic-blue"
        sampleCV={sampleCV}
        scanTitle="What finance hiring teams scan first"
        scanBody="A strong finance CV should make your part of the finance cycle clear: close, AP, AR, reporting, audit, controls, systems, and business partnering."
        scanChecks={[
          "Finance scope: month-end close, AP, AR, VAT, payroll checks, reporting, audit, or controlling.",
          "Systems used: SAP, Exact, AFAS, Twinfield, Oracle, Excel, Power BI, or banking platforms.",
          "Accuracy proof: reconciliations, clean audit schedules, reduced overdue invoices, or fewer reporting errors.",
          "Business context: retail, SaaS, logistics, healthcare, services, manufacturing, or international entities.",
          "Qualification clarity: finance degree, certificates, accounting title, or controller path.",
        ]}
        summaryLabel="Target: finance and accounting, Netherlands"
        experienceTitle="Experience bullets that show finance ownership"
        mistakesTitle="Mistakes that weaken a finance CV"
        mistakes={[
          "Using a generic finance title without showing the exact responsibilities owned.",
          "Listing systems but not explaining how they were used.",
          "Forgetting month-end close, reconciliations, VAT, audit, or reporting scope.",
          "Claiming accuracy without examples such as cleaner schedules or fewer follow-up questions.",
          "Using a protected or senior title that does not match your actual qualification or role.",
        ]}
        bottomTitle="Build from this finance example"
        bottomBody="The button creates a CV with this example already filled in. Replace the fictional details with your own finance scope, systems, reporting work, and measurable improvements."
        sources={sources}
        faqs={faqs}
      />
    </>
  );
}
