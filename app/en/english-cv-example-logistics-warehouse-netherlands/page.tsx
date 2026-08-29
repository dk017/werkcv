import type { CVData } from "@/lib/cv";
import EnglishRoleExampleRoute from "../components/EnglishRoleExampleRoute";
import { buildEnglishMetadata } from "../metadata";

const pagePath = "/en/english-cv-example-logistics-warehouse-netherlands";

export const metadata = buildEnglishMetadata({
  title: "English Warehouse CV Example for Jobs in the Netherlands",
  description:
    "Use a realistic English warehouse CV example for jobs in the Netherlands. See WMS, order picking, reach-truck safety, shift availability, and evidence-backed bullet structure. Edit and preview for free; the finished PDF has one one-time price and no subscription.",
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
      company: "SouthLine Fulfilment (fictional)",
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
      company: "FreshMarket Distribution (fictional)",
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
      school: "Canalbridge Logistics College (fictional)",
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
    { name: "Reach Truck Certificate", institution: "Fictional Logistics Training Centre", year: "2024" },
    { name: "Forklift Certificate", institution: "Fictional Logistics Training Centre", year: "2023" },
    { name: "VCA Basic Safety", institution: "Fictional Safety Institute", year: "2022" },
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
    reviewedOn: "29 August 2026",
  },
  {
    label: "Government.nl - working in the Netherlands",
    href: "https://www.government.nl/faq/foreign-citizens-working-in-the-netherlands/what-permits-do-foreign-workers-need",
    note: "Check work-permit questions with the official government guidance and the employer; this page does not assess eligibility.",
    reviewedOn: "29 August 2026",
  },
  {
    label: "WerkCV English templates",
    href: "https://werkcv.nl/en/templates",
    note: "English CV templates that keep the user in the Netherlands-focused editor flow.",
    reviewedOn: "29 August 2026",
  },
];

export default function LogisticsWarehouseCvExamplePage() {
  return (
      <EnglishRoleExampleRoute
        articleDescription="A realistic fictional English warehouse CV example for jobs in the Netherlands, with WMS, equipment, shift, and evidence guidance."
        datePublished="2026-06-23"
        lastReviewed="29 August 2026"
        roleSlug="logistics-warehouse"
        pagePath={pagePath}
        eyebrow="English warehouse CV example"
        h1="English warehouse CV example for jobs in the Netherlands"
        intro="See how to show warehouse systems, safe equipment use, shift availability, and defensible outcomes. Open the filled example or start with your own CV."
        audience="warehouse employees, order pickers, and logistics workers applying to Dutch distribution and fulfilment operations"
        previewAlt="Fictional warehouse CV preview showing summary, WMS experience, certificates, and shift evidence"
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
        summaryLabel="Target: warehouse and logistics roles, Netherlands"
        fictionalLabel="Fictional candidate — Ricardo Bakker is not a real person; replace every detail before sending"
        evidenceExamples={[
          { claim: "Pick-rate claim", evidence: "145 order lines per hour is stated in the fictional SouthLine Fulfilment bullet.", source: "Experience · SouthLine Fulfilment", status: "supported" },
          { claim: "Equipment claim", evidence: "Reach truck and EPT use is named in the current-role bullet.", source: "Experience · SouthLine Fulfilment", status: "supported" },
          { claim: "Certificate claim", evidence: "The fictional courses section names reach-truck, forklift, and VCA certificates with years.", source: "Courses / certificates", status: "supported" },
          { claim: "Shift claim", evidence: "The summary and previous role mention 2- and 3-shift work; confirm current availability separately.", source: "Summary + experience", status: "partial" },
        ]}
        noNumbersExample="If you cannot verify a pick rate or accuracy figure, write the process and result without inventing a number: for example, “Maintained accurate order picking through scanner checks and location verification.”"
        vocabulary={[
          { term: "Order picker", meaning: "Orderpicker", note: "Use the English title for an English vacancy and keep the Dutch term when it helps local search." },
          { term: "Reach truck", meaning: "Reachtruck", note: "Name the exact equipment and certificate only when you have used or earned it." },
          { term: "Warehouse management system (WMS)", meaning: "Warehousemanagementsysteem", note: "Add the actual system, such as SAP EWM, only when it appears in your experience." },
          { term: "Shift availability", meaning: "Beschikbaarheid voor ploegendienst", note: "State day, evening, night, or weekend availability as a current fact to confirm." },
        ]}
        localContext="For a Netherlands application, make location, Dutch/English level, certificates, shift availability, and work-authorisation questions easy to find. The example gives structure; an employer must confirm the role and any permit requirements."
        relatedLinks={[
          { href: "/en/english-cv-example-forklift-reach-truck-netherlands", label: "Forklift and reach-truck CV example" },
          { href: "/en/english-cv-example-order-picker-fulfilment-netherlands", label: "Order picker CV example" },
          { href: "/en/english-cv-example-logistics-coordinator-netherlands", label: "Logistics coordinator CV example" },
        ]}
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
        faqs={[
          ...faqs,
          {
            question: "What if I am new to warehouse work?",
            answer: "Lead with transferable evidence such as safe manual handling, stock work, retail or production routines, reliability, and any relevant training. Never add equipment or productivity claims you cannot support.",
          },
        ]}
      />
  );
}
