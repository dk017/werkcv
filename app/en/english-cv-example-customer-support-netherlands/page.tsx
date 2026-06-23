import type { CVData } from "@/lib/cv";
import { EnglishRoleCvExamplePage } from "../components/EnglishRoleCvExamplePage";
import { buildEnglishMetadata } from "../metadata";

const pagePath = "/en/english-cv-example-customer-support-netherlands";

export const metadata = buildEnglishMetadata({
  title: "Customer Support CV Example Netherlands 2026",
  description:
    "Use a realistic English customer support CV example for the Netherlands. Includes CRM, ticket handling, customer satisfaction, escalation, and a one-click editor start.",
  path: pagePath,
  keywords: [
    "customer support cv example netherlands",
    "customer service cv netherlands",
    "english customer support resume netherlands",
    "support agent cv netherlands",
    "klantenservice cv english",
  ],
});

const sampleCV: CVData = {
  personal: {
    name: "Nora Janssen",
    title: "Customer Support Specialist",
    resumeLanguage: "en",
    email: "nora.janssen@example.com",
    phone: "+31 6 3456 7890",
    location: "Rotterdam, Netherlands",
    address: "",
    postalCode: "",
    summary:
      "Customer support specialist with 4 years of experience handling phone, email, live chat, and CRM-based ticket workflows for e-commerce and subscription services. Strong in de-escalation, clear customer communication, Zendesk, Salesforce, SLA follow-up, and improving first-contact resolution while keeping service quality high.",
    birthDate: "",
    birthPlace: "",
    nationality: "",
    driversLicense: "",
    gender: "",
    maritalStatus: "",
    linkedIn: "linkedin.com/in/norajanssen",
    github: "",
    website: "",
    photo: "",
  },
  experience: [
    {
      role: "Customer Support Specialist",
      company: "Canal Commerce B.V.",
      location: "Rotterdam",
      start: "May 2022",
      end: "Present",
      description: "",
      highlights: [
        "Handled 55-70 customer contacts per day across phone, chat, and email while maintaining an average CSAT score of 8.8/10.",
        "Improved first-contact resolution for returns and warranty questions by using clearer Zendesk macros and follow-up tags.",
        "Prepared escalation notes for senior support, reducing repeated customer explanations and improving complaint handovers.",
        "Trained 6 new colleagues on tone of voice, ticket registration, SLA follow-up, and documenting customer agreements.",
      ],
    },
    {
      role: "Customer Service Agent",
      company: "GreenHome Energy",
      location: "The Hague",
      start: "Jan 2020",
      end: "Apr 2022",
      description: "",
      highlights: [
        "Resolved contract, invoice, and meter-reading questions in Salesforce and internal billing systems.",
        "Explained complex invoice corrections in simple language, reducing avoidable repeat calls from assigned cases.",
        "Supported the complaints team with timeline reconstruction, call notes, and customer communication drafts.",
      ],
    },
  ],
  education: [
    {
      degree: "MBO 4 Customer Contact and Sales",
      school: "Albeda College",
      location: "Rotterdam",
      start: "2016",
      end: "2019",
      description: "Focus on customer communication, service processes, sales support, and business administration.",
    },
  ],
  skills: [
    { name: "Zendesk", level: 5 },
    { name: "Salesforce", level: 4 },
    { name: "Phone support", level: 5 },
    { name: "Live chat", level: 5 },
    { name: "Complaint handling", level: 4 },
    { name: "SLA follow-up", level: 4 },
    { name: "Microsoft 365", level: 4 },
    { name: "Customer communication", level: 5 },
  ],
  languages: [
    { name: "English", level: "Fluent" },
    { name: "Dutch", level: "Fluent" },
  ],
  internships: [],
  interests: [],
  properties: ["Patient", "Clear communicator", "Calm under pressure"],
  courses: [
    { name: "Complaint Handling and De-escalation", institution: "CustomerFirst Academy", year: "2024" },
    { name: "Zendesk Support Administrator Basics", institution: "Zendesk", year: "2023" },
  ],
  awards: [],
  references: [],
  sideActivities: [],
  customSections: [],
};

const faqs = [
  {
    question: "What should a customer support CV show first?",
    answer:
      "Show your channels, CRM or ticketing tools, volume, service quality, and complaint-handling ability. Recruiters need to see both communication skill and operational reliability.",
  },
  {
    question: "Should I include customer satisfaction scores?",
    answer:
      "Yes, if they are accurate and recent. CSAT, first-contact resolution, ticket volume, SLA performance, and escalation reduction make support experience more credible.",
  },
  {
    question: "Can this CV be used for English-speaking support roles?",
    answer:
      "Yes. Keep the CV in English when the vacancy is English, but include Dutch language level honestly because many Dutch support roles involve local customers or internal Dutch systems.",
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
  headline: "Customer Support CV Example Netherlands",
  description: "A practical English CV example for customer support roles in the Netherlands.",
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

export default function CustomerSupportCvExamplePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <EnglishRoleCvExamplePage
        roleSlug="customer-support"
        pagePath={pagePath}
        eyebrow="English CV example for support roles"
        h1="Customer support CV example that opens directly in the editor"
        intro="Start from a realistic support CV written for applications in the Netherlands. The example shows customer channels, CRM tools, service quality, complaint handling, and clear language levels."
        themeColor="emerald"
        templateId="simple"
        colorThemeId="modern-teal"
        sampleCV={sampleCV}
        scanTitle="What support hiring teams scan first"
        scanBody="A strong customer support CV should prove that you can communicate clearly, stay calm under pressure, register cases properly, and protect service quality."
        scanChecks={[
          "Channels handled: phone, email, live chat, social, counter, WhatsApp, or ticket portal.",
          "Systems used: Zendesk, Salesforce, Freshdesk, HubSpot, Microsoft Dynamics, or internal CRM.",
          "Service proof: CSAT, ticket volume, SLA follow-up, first-contact resolution, or escalation quality.",
          "Complaint handling: de-escalation, clear notes, customer agreements, and handover quality.",
          "Language fit: English and Dutch level, especially for customer-facing Dutch-market roles.",
        ]}
        summaryLabel="Target: customer support, Netherlands"
        experienceTitle="Experience bullets that show service quality"
        mistakesTitle="Mistakes that weaken a support CV"
        mistakes={[
          "Only saying friendly and customer-oriented without proof from real customer work.",
          "Leaving out CRM, ticketing, or channel experience.",
          "Using call volume without quality context, or quality claims without measurable examples.",
          "Hiding complaint handling, even though it is often the strongest support signal.",
          "Forgetting language levels for roles that may involve Dutch customers.",
        ]}
        bottomTitle="Build from this customer support example"
        bottomBody="The button creates a CV with this example already filled in. Replace the fictional details with your own systems, channels, service metrics, and language levels."
        sources={sources}
        faqs={faqs}
      />
    </>
  );
}
