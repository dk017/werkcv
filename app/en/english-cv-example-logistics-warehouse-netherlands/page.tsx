import type { CVData } from "@/lib/cv";
import { EnglishRoleCvExamplePage } from "../components/EnglishRoleCvExamplePage";
import { buildEnglishMetadata } from "../metadata";

const pagePath = "/en/english-cv-example-logistics-warehouse-netherlands";

export const metadata = buildEnglishMetadata({
  title: "Logistics and Warehouse CV Example Netherlands 2026",
  description:
    "Use a realistic English logistics and warehouse CV example for the Netherlands. Includes WMS, order picking, forklift, safety, shifts, and a one-click editor start.",
  path: pagePath,
  keywords: [
    "logistics warehouse cv example netherlands",
    "warehouse worker cv netherlands",
    "order picker cv example netherlands",
    "logistics employee resume netherlands",
    "magazijnmedewerker cv english",
  ],
});

const sampleCV: CVData = {
  personal: {
    name: "Ricardo Bakker",
    title: "Warehouse and Logistics Employee",
    resumeLanguage: "en",
    email: "ricardo.bakker@example.com",
    phone: "+31 6 5678 9012",
    location: "Tilburg, Netherlands",
    address: "",
    postalCode: "",
    summary:
      "Reliable warehouse and logistics employee with 5 years of experience in order picking, inbound, outbound, inventory checks, loading and unloading, WMS registration, hand scanners, EPT, and reach truck work. Known for safe working habits, high pick accuracy, and steady performance in 2- and 3-shift operations.",
    birthDate: "",
    birthPlace: "",
    nationality: "",
    driversLicense: "B",
    gender: "",
    maritalStatus: "",
    linkedIn: "",
    github: "",
    website: "",
    photo: "",
  },
  experience: [
    {
      role: "Warehouse Employee / Order Picker",
      company: "SouthLine Fulfilment",
      location: "Waalwijk",
      start: "Aug 2022",
      end: "Present",
      description: "",
      highlights: [
        "Picked an average of 145 order lines per hour with 99.4% accuracy using hand scanners and WMS location checks.",
        "Operated reach truck and EPT for pallet movement, pick-location replenishment, urgent orders, and outbound staging.",
        "Registered stock corrections, damaged goods, and returns in SAP EWM according to warehouse procedures.",
        "Trained new colleagues on pick routes, scanner use, safety rules, and reporting location or stock errors.",
      ],
    },
    {
      role: "Logistics Employee",
      company: "FreshMarket Distribution",
      location: "Breda",
      start: "Jan 2019",
      end: "Jul 2022",
      description: "",
      highlights: [
        "Processed 70-90 pallets per shift for inbound, outbound, and cross-dock flows in a temperature-controlled warehouse.",
        "Helped reduce stock differences by improving counting discipline during cycle counts and location checks.",
        "Prepared orders for transport, checked labels, and supported loading teams during evening and weekend shifts.",
      ],
    },
  ],
  education: [
    {
      degree: "MBO 2 Logistics Employee",
      school: "ROC Tilburg",
      location: "Tilburg",
      start: "2016",
      end: "2018",
      description: "Training in warehouse operations, order picking, safety, stock control, and transport preparation.",
    },
  ],
  skills: [
    { name: "Order picking", level: 5 },
    { name: "WMS", level: 4 },
    { name: "SAP EWM", level: 4 },
    { name: "Hand scanner", level: 5 },
    { name: "Reach truck", level: 4 },
    { name: "EPT", level: 5 },
    { name: "Inventory checks", level: 4 },
    { name: "Shift work", level: 5 },
  ],
  languages: [
    { name: "English", level: "Good" },
    { name: "Dutch", level: "Fluent" },
  ],
  internships: [],
  interests: [],
  properties: ["Reliable", "Safety-minded", "Physically fit"],
  courses: [
    { name: "Reach Truck Certificate", institution: "Logistics Training Centre", year: "2024" },
    { name: "Forklift Certificate", institution: "Logistics Training Centre", year: "2023" },
    { name: "VCA Basic Safety", institution: "VCA Infra", year: "2022" },
  ],
  awards: [],
  references: [],
  sideActivities: [],
  customSections: [],
};

const faqs = [
  {
    question: "What should a warehouse CV show first?",
    answer:
      "Show your warehouse tasks, systems, certificates, shift availability, safety record, and measurable productivity such as pick rate, accuracy, pallets, or order lines.",
  },
  {
    question: "Should I mention forklift or reach truck certificates?",
    answer:
      "Yes. Mention the certificate type and year. Employers often scan for forklift, reach truck, EPT, VCA, BHV, and availability for shifts.",
  },
  {
    question: "Can I use this CV for logistics roles in English?",
    answer:
      "Yes, especially for international warehouses and distribution centres. Keep Dutch language level visible if the workplace uses Dutch instructions or safety briefings.",
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
  headline: "Logistics and Warehouse CV Example Netherlands",
  description: "A practical English CV example for logistics and warehouse roles in the Netherlands.",
  inLanguage: "en-NL",
  mainEntityOfPage: `https://werkcv.nl${pagePath}`,
  datePublished: "2026-06-23",
  dateModified: "2026-06-23",
  author: { "@id": "https://werkcv.nl/#organization" },
  publisher: { "@id": "https://werkcv.nl/#organization" },
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

export default function LogisticsWarehouseCvExamplePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <EnglishRoleCvExamplePage
        roleSlug="logistics-warehouse"
        pagePath={pagePath}
        eyebrow="English CV example for logistics roles"
        h1="Logistics and warehouse CV example that opens directly in the editor"
        intro="Start from a realistic warehouse CV written for applications in the Netherlands. The example shows WMS experience, scanner work, certificates, shift availability, safety, and measurable productivity."
        themeColor="amber"
        templateId="simple"
        colorThemeId="charcoal"
        sampleCV={sampleCV}
        scanTitle="What warehouse hiring teams scan first"
        scanBody="A strong warehouse CV should prove that you can work safely, follow procedures, use warehouse systems, and keep productivity and accuracy stable."
        scanChecks={[
          "Warehouse flows: inbound, outbound, order picking, returns, cross-dock, inventory checks, or loading.",
          "Equipment and certificates: forklift, reach truck, EPT, VCA, BHV, scanner, voice picking, or WMS.",
          "Productivity proof: order lines per hour, pick accuracy, pallets per shift, stock-difference reduction.",
          "Availability: 2-shift, 3-shift, evening, night, weekend, cold storage, or physical work.",
          "Language fit: Dutch and English level for instructions, safety briefings, and team communication.",
        ]}
        summaryLabel="Target: logistics and warehouse, Netherlands"
        experienceTitle="Experience bullets that show warehouse reliability"
        mistakesTitle="Mistakes that weaken a warehouse CV"
        mistakes={[
          "Only listing tasks without systems, certificates, or shift availability.",
          "Forgetting safety, accuracy, or productivity evidence.",
          "Using vague physical work claims instead of concrete warehouse flows.",
          "Leaving out WMS, scanner, forklift, reach truck, EPT, or VCA details.",
          "Not showing whether you can work evenings, nights, weekends, or rotating shifts.",
        ]}
        bottomTitle="Build from this logistics example"
        bottomBody="The button creates a CV with this example already filled in. Replace the fictional details with your own warehouse systems, certificates, shifts, and productivity proof."
        sources={sources}
        faqs={faqs}
      />
    </>
  );
}
