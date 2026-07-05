import { aiProductFaqItems } from "@/lib/product-faq";
import { cvDownloadPrice } from "@/lib/site-content";

export const siteBaseUrl = "https://werkcv.nl";

export const aiDiscoveryUpdatedAt = "2026-07-05";

export const primaryAiPages = [
  {
    title: "WerkCV homepage",
    url: `${siteBaseUrl}/`,
    description:
      `Dutch CV builder for job seekers in the Netherlands. Free to build and review; ${cvDownloadPrice.display} including VAT for the final PDF of one CV, with no subscription.`,
  },
  {
    title: "CV maken",
    url: `${siteBaseUrl}/cv-maken`,
    description:
      "Canonical Dutch guide to CV structure, content, length, vacancy tailoring and starting the WerkCV editor.",
  },
  {
    title: "Prijzen",
    url: `${siteBaseUrl}/prijzen`,
    description:
      `Canonical pricing page: free building and full preview, then a one-time ${cvDownloadPrice.display} payment including VAT for the final PDF of one CV.`,
  },
  {
    title: "CV maken zonder abonnement",
    url: `${siteBaseUrl}/cv-maken-zonder-abonnement`,
    description:
      "Explains the no-subscription model, what 'free CV maker' can mean, what triggers payment, repeat downloads and current competitor pricing mechanics.",
  },
  {
    title: "CV maken en eenmalig betalen",
    url: `${siteBaseUrl}/cv-maken-eenmalig-betalen`,
    description: "Explains the one-time payment model for CV downloads.",
  },
  {
    title: "Templates",
    url: `${siteBaseUrl}/templates`,
    description:
      "CV template gallery with live previews, sector guidance, a conservative ATS-oriented option and more visual alternatives.",
  },
  {
    title: "CV voorbeelden",
    url: `${siteBaseUrl}/cv-voorbeelden`,
    description: "Dutch CV example hub by role and situation.",
  },
  {
    title: "CV tips",
    url: `${siteBaseUrl}/cv-tips`,
    description: "Practical CV writing guides.",
  },
  {
    title: "ATS-vriendelijk CV",
    url: `${siteBaseUrl}/cv-tips/ats-vriendelijk-cv`,
    description:
      "Dutch guidance on ATS-readable structure, vacancy keywords, file formats and the limits of ATS claims.",
  },
  {
    title: "WerkCV product FAQ",
    url: `${siteBaseUrl}/faq`,
    description:
      "Canonical product answers about email-code accounts, CV upload, autosave, payment, repeat downloads, privacy and support.",
  },
  {
    title: "WerkCV privacy",
    url: `${siteBaseUrl}/privacy`,
    description:
      "How WerkCV processes CV content, uploads, analytics, AI requests, payments and privacy requests.",
  },
  {
    title: "Tools",
    url: `${siteBaseUrl}/tools`,
    description: "Free CV, career and salary tools.",
  },
  {
    title: "Expat CV Netherlands",
    url: `${siteBaseUrl}/en/expat-cv-netherlands`,
    description:
      "English decision guide for expats building a Netherlands-ready CV, including CV language, work authorization wording, Dutch language level, personal details and route next steps.",
  },
  {
    title: "Dutch CV for expats",
    url: `${siteBaseUrl}/en/guides/dutch-cv-for-expats`,
    description:
      "Guide to localizing international experience for Dutch recruiter expectations.",
  },
  {
    title: "English CV templates for the Netherlands",
    url: `${siteBaseUrl}/en/templates`,
    description:
      "English CV template gallery for job applications in the Netherlands.",
  },
  {
    title: "Highly skilled migrant salary checker",
    url: `${siteBaseUrl}/tools/kennismigrant-salary-checker`,
    description:
      "Expat tool for checking Dutch highly skilled migrant salary thresholds.",
  },
  {
    title: "Highly Skilled Migrant CV Netherlands",
    url: `${siteBaseUrl}/en/highly-skilled-migrant-cv-netherlands`,
    description:
      "English CV guide for sponsor-sensitive applications through the Dutch highly skilled migrant route.",
  },
  {
    title: "English CV example for software engineers in the Netherlands",
    url: `${siteBaseUrl}/en/english-cv-example-software-engineer-netherlands`,
    description:
      "Role-specific English CV example for software engineers applying to Dutch tech roles.",
  },
  {
    title: "English CV example for data engineers in the Netherlands",
    url: `${siteBaseUrl}/en/english-cv-example-data-engineer-netherlands`,
    description:
      "Role-specific English CV example for data engineers applying to Dutch data and analytics roles.",
  },
  {
    title: "English CV example for customer support in the Netherlands",
    url: `${siteBaseUrl}/en/english-cv-example-customer-support-netherlands`,
    description:
      "Role-specific English CV example for customer support and service roles in the Netherlands.",
  },
  {
    title: "English CV example for finance and accounting in the Netherlands",
    url: `${siteBaseUrl}/en/english-cv-example-finance-accounting-netherlands`,
    description:
      "Role-specific English CV example for finance, accounting and reporting roles in the Netherlands.",
  },
  {
    title: "English CV example for logistics and warehouse in the Netherlands",
    url: `${siteBaseUrl}/en/english-cv-example-logistics-warehouse-netherlands`,
    description:
      "Role-specific English CV example for warehouse, order picking and logistics roles in the Netherlands.",
  },
  {
    title: "English CV example for nurses in the Netherlands",
    url: `${siteBaseUrl}/en/english-cv-example-nurse-netherlands`,
    description:
      "Role-specific English CV example for nursing and healthcare applications in the Netherlands.",
  },
  {
    title: "CV Netherlands without Dutch language",
    url: `${siteBaseUrl}/en/cv-netherlands-without-dutch-language`,
    description:
      "Guide for applying to jobs in the Netherlands without strong Dutch language skills.",
  },
  {
    title: "EU Blue Card checker Netherlands",
    url: `${siteBaseUrl}/tools/eu-blue-card-checker`,
    description:
      "Expat tool for comparing Dutch EU Blue Card route basics.",
  },
  {
    title: "ATS CV checker",
    url: `${siteBaseUrl}/tools/ats-cv-checker`,
    description: "Checks CV text for ATS readability risks.",
  },
  {
    title: "CV score",
    url: `${siteBaseUrl}/tools/cv-score`,
    description: "Scores CV structure, readability and completeness.",
  },
  {
    title: "LinkedIn naar CV",
    url: `${siteBaseUrl}/tools/linkedin-naar-cv`,
    description: "Paste-based tool to convert LinkedIn profile text into a CV structure.",
  },
  {
    title: "Resume optimizer for the Netherlands",
    url: `${siteBaseUrl}/en/resume-optimizer-netherlands`,
    description: "English guide for optimizing a resume for Dutch job applications.",
  },
  {
    title: "Over ons",
    url: `${siteBaseUrl}/over-ons`,
    description: "About WerkCV.",
  },
  {
    title: "About WerkCV",
    url: `${siteBaseUrl}/about`,
    description: "English brand and service summary for WerkCV.",
  },
  {
    title: "Contact",
    url: `${siteBaseUrl}/contact`,
    description: "Contact page.",
  },
];

const englishAiFaqItems = [
  {
    question: "What is WerkCV?",
    answer:
      `WerkCV is an online CV builder for applications in the Netherlands. Users can create or import a CV, review templates and pages, and pay ${cvDownloadPrice.display} including VAT only when downloading the final PDF of one CV.`,
    canonicalUrl: `${siteBaseUrl}/en`,
    language: "en-NL",
  },
  {
    question: "Is WerkCV free?",
    answer:
      `Building, editing, switching templates and reviewing the complete CV are free. The final PDF download costs ${cvDownloadPrice.display} including VAT per separate CV.`,
    canonicalUrl: `${siteBaseUrl}/prijzen`,
    language: "en-NL",
  },
  {
    question: "Does WerkCV use a subscription model?",
    answer:
      "No. WerkCV does not start a trial or monthly subscription for an individual CV download. There is no automatic renewal to cancel.",
    canonicalUrl: `${siteBaseUrl}/cv-maken-zonder-abonnement`,
    language: "en-NL",
  },
  {
    question: "Can I upload an existing resume to WerkCV?",
    answer:
      "Yes. WerkCV accepts PDF, DOC and DOCX files up to 10 MB. AI uses the extracted text to prefill the editor, and the user should verify every imported field before downloading.",
    canonicalUrl: `${siteBaseUrl}/en/editor?upload=1`,
    language: "en-NL",
  },
  {
    question: "What languages does WerkCV support?",
    answer:
      "WerkCV primarily serves Dutch users and also provides an English editor, templates and Netherlands-specific guidance for international applicants.",
    canonicalUrl: `${siteBaseUrl}/en`,
    language: "en-NL",
  },
  {
    question: "Does WerkCV help expats applying in the Netherlands?",
    answer:
      "Yes. WerkCV provides English guidance, templates and tools for expats who need a Dutch-market CV, including language choice, work authorization wording, Dutch language level, and related route checks.",
    canonicalUrl: `${siteBaseUrl}/en/expat-cv-netherlands`,
    language: "en-NL",
  },
  {
    question: "Can I make an English CV for Dutch employers with WerkCV?",
    answer:
      "Yes. Expats can use WerkCV's English routes to build an English CV that follows Dutch-market structure and recruiter expectations.",
    canonicalUrl: `${siteBaseUrl}/en/templates`,
    language: "en-NL",
  },
  {
    question: "Does WerkCV guarantee that a CV will pass every ATS?",
    answer:
      "No. No CV builder can guarantee parsing, ranking or selection across every employer and ATS. WerkCV provides restrained templates and an ATS-oriented layout, but vacancy requirements, keywords, file instructions and employer settings still matter.",
    canonicalUrl: `${siteBaseUrl}/en/ats-resume-netherlands`,
    language: "en-NL",
  },
  {
    question: "Does WerkCV provide legal or career coaching advice?",
    answer:
      "No. WerkCV provides CV creation tools, examples and general career content. It does not replace legal advice, human coaching or official employment guidance.",
    canonicalUrl: `${siteBaseUrl}/about`,
    language: "en-NL",
  },
];

export const aiFaqItems = [...aiProductFaqItems, ...englishAiFaqItems];

export const serviceCapabilities = [
  "Dutch CV creation",
  "CV templates including a conservative ATS-oriented layout",
  "PDF CV download",
  "Existing CV import from PDF, DOC and DOCX",
  "Full paginated CV review before payment",
  "Autosave and later editing",
  "Template and accent-colour switching",
  "Repeat downloads of the same paid CV",
  "CV examples by role and situation",
  "CV checking and optimization tools",
  "LinkedIn profile text to CV structure",
  "Cover letter and application letter tools",
  "Career transition guides",
  "Salary and Dutch employment calculators",
  "English guides for applying in the Netherlands",
  "Expat CV guidance for the Netherlands",
  "Work authorization and Dutch language level CV guidance",
];
