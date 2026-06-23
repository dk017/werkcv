import type { CVData } from "@/lib/cv";
import { EnglishRoleCvExamplePage } from "../components/EnglishRoleCvExamplePage";
import { buildEnglishMetadata } from "../metadata";

const pagePath = "/en/english-cv-example-nurse-netherlands";

export const metadata = buildEnglishMetadata({
  title: "Nurse CV Example Netherlands 2026",
  description:
    "Use a realistic English nurse CV example for the Netherlands. Includes BIG registration, EHR, clinical skills, patient care, Dutch language level, and a one-click editor start.",
  path: pagePath,
  keywords: [
    "nurse cv example netherlands",
    "english nurse cv netherlands",
    "verpleegkundige cv english",
    "BIG registered nurse cv",
    "healthcare cv example netherlands",
  ],
});

const sampleCV: CVData = {
  personal: {
    name: "Linda de Vries",
    title: "Registered Nurse",
    resumeLanguage: "en",
    email: "linda.devries@example.com",
    phone: "+31 6 6789 0123",
    location: "Amsterdam, Netherlands",
    address: "",
    postalCode: "",
    summary:
      "Registered nurse with 8 years of experience in internal medicine, emergency care, patient education, medication safety, wound care, clinical observation, and multidisciplinary coordination. BIG registered, experienced with Epic EHR, and confident in calm communication with patients, families, doctors, and care teams.",
    birthDate: "",
    birthPlace: "",
    nationality: "",
    driversLicense: "B",
    gender: "",
    maritalStatus: "",
    linkedIn: "linkedin.com/in/lindadevries-rn",
    github: "",
    website: "",
    photo: "",
  },
  experience: [
    {
      role: "Registered Nurse - Internal Medicine",
      company: "Amsterdam Care Hospital",
      location: "Amsterdam",
      start: "Mar 2019",
      end: "Present",
      description: "",
      highlights: [
        "Provided daily nursing care for an average of 8 patients per shift, including medication, wound care, clinical observations, and handover.",
        "Coordinated care plans in Epic with physicians, physiotherapists, dietitians, and discharge coordinators.",
        "Supported patient and family education around medication, recovery steps, warning signs, and follow-up appointments.",
        "Guided nursing students and new colleagues as a workplace mentor, focusing on safe routines and clear documentation.",
      ],
    },
    {
      role: "Emergency Department Nurse",
      company: "Spaarne Care Centre",
      location: "Haarlem",
      start: "Sep 2016",
      end: "Feb 2019",
      description: "",
      highlights: [
        "Performed triage and nursing care for trauma, cardiac, neurological, and acute internal medicine cases.",
        "Participated in resuscitation team routines and maintained BLS/ALS training requirements.",
        "Communicated calmly with patients and families during acute situations and documented care actions clearly in the EHR.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Nursing",
      school: "Amsterdam University of Applied Sciences",
      location: "Amsterdam",
      start: "2012",
      end: "2016",
      description: "Focus on clinical nursing, acute care, patient communication, and evidence-based practice.",
    },
  ],
  skills: [
    { name: "Clinical nursing", level: 5 },
    { name: "Medication safety", level: 5 },
    { name: "Wound care", level: 4 },
    { name: "Triage", level: 4 },
    { name: "Epic EHR", level: 4 },
    { name: "Patient education", level: 5 },
    { name: "Care coordination", level: 5 },
    { name: "BLS/ALS", level: 4 },
  ],
  languages: [
    { name: "Dutch", level: "Fluent" },
    { name: "English", level: "Good" },
  ],
  internships: [],
  interests: [],
  properties: ["Calm", "Empathetic", "Accurate"],
  courses: [
    { name: "Advanced Life Support", institution: "Dutch Resuscitation Council", year: "2024" },
    { name: "Wound Care Update", institution: "V&VN Academy", year: "2023" },
    { name: "Clinical Reasoning", institution: "Hospital Academy", year: "2022" },
  ],
  awards: [],
  references: [],
  sideActivities: [],
  customSections: [
    {
      title: "Registration",
      items: ["BIG registered nurse - registration number available on request"],
    },
  ],
};

const faqs = [
  {
    question: "Should a nurse CV for the Netherlands mention BIG registration?",
    answer:
      "Yes. If you are BIG registered, mention it clearly near the top of the CV. If you have a foreign diploma, be clear about recognition status and language proof.",
  },
  {
    question: "Should a nurse CV be in English or Dutch?",
    answer:
      "Use the language of the vacancy. For Dutch healthcare roles, Dutch language level is often important, so show it clearly even if the CV is written in English.",
  },
  {
    question: "What clinical details should I include?",
    answer:
      "Include departments, patient group, EHR/ECD systems, medication safety, wound care, triage, clinical observation, care coordination, and relevant training such as BLS or ALS.",
  },
];

const sources = [
  {
    label: "BIG-register",
    href: "https://english.bigregister.nl/",
    note: "Official information on BIG registration, protected titles, foreign diploma recognition, and language proof.",
  },
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
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Nurse CV Example Netherlands",
  description: "A practical English CV example for nursing roles in the Netherlands.",
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

export default function NurseCvExamplePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <EnglishRoleCvExamplePage
        roleSlug="nurse"
        pagePath={pagePath}
        eyebrow="English CV example for healthcare roles"
        h1="Nurse CV example that opens directly in the editor"
        intro="Start from a realistic nurse CV written for applications in the Netherlands. The example shows BIG registration, clinical skills, EHR experience, patient communication, training, and language level."
        themeColor="blue"
        templateId="professional"
        colorThemeId="classic-blue"
        sampleCV={sampleCV}
        scanTitle="What healthcare hiring teams scan first"
        scanBody="A strong nurse CV should make registration, clinical scope, patient group, EHR experience, training, and language level immediately visible."
        scanChecks={[
          "Registration: BIG status, title, foreign diploma recognition status, or relevant next step.",
          "Clinical context: department, patient group, care intensity, triage, wound care, medication, or acute care.",
          "Systems: Epic, HiX, ONS, Medimo, ECD, EHR, or other care documentation systems.",
          "Training: BLS, ALS, wound care, medication safety, clinical reasoning, or specialist certificates.",
          "Language fit: Dutch and English level, especially for patient communication and handover.",
        ]}
        summaryLabel="Target: nursing role, Netherlands"
        experienceTitle="Experience bullets that show patient-care responsibility"
        mistakesTitle="Mistakes that weaken a nurse CV"
        mistakes={[
          "Hiding BIG registration, diploma recognition, or language proof.",
          "Listing empathy without clinical scope, patient group, or department context.",
          "Forgetting EHR/ECD systems and documentation responsibilities.",
          "Leaving out medication safety, handover, triage, wound care, or care coordination.",
          "Using an English CV without clearly showing Dutch language level for patient-facing roles.",
        ]}
        bottomTitle="Build from this nurse example"
        bottomBody="The button creates a CV with this example already filled in. Replace the fictional details with your own registration, departments, clinical skills, training, and language levels."
        sources={sources}
        faqs={faqs}
      />
    </>
  );
}
