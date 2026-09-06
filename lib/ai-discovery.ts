import { aiProductFaqItems } from "@/lib/product-faq";
import { cvDownloadPrice, profilePhotoPrice } from "@/lib/site-content";
import { getAgencyPublicCapabilities } from "@/lib/agency-public-capabilities";
import { getAgencyPublicMessaging } from "@/lib/agency-public-messaging";
import { AGENCY_MONTHLY_CREDIT_LIMIT, getAgencyMonthlyPriceDisplay } from "@/lib/agency-plan";

export const siteBaseUrl = "https://werkcv.nl";

export const aiDiscoveryUpdatedAt = "2026-09-02";
const agencyCapabilities = getAgencyPublicCapabilities();
const agencyMessagingNl = getAgencyPublicMessaging({ locale: "nl", capabilities: agencyCapabilities });
const agencyMessagingEn = getAgencyPublicMessaging({ locale: "en", capabilities: agencyCapabilities });
const agencyPriceNl = getAgencyMonthlyPriceDisplay("nl");
const agencyPriceEn = getAgencyMonthlyPriceDisplay("en");

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
    title: "English CV builder for the Netherlands",
    url: `${siteBaseUrl}/en`,
    description: `Build or import an English CV with Dutch-market structure, preview every page free, and pay ${cvDownloadPrice.displayEn} including VAT only for the final PDF. No subscription.`,
  },
  {
    title: "English WerkCV pricing",
    url: `${siteBaseUrl}/en/pricing`,
    description: `English pricing and payment explanation: build and preview free, then pay ${cvDownloadPrice.displayEn} once including VAT for the final PDF of one CV. No trial or subscription.`,
  },
  {
    title: "Dutch CV template in English",
    url: `${siteBaseUrl}/en/dutch-cv-template`,
    description:
      "English guidance and templates for a Netherlands-ready CV, including local section order, ATS-aware layout and the free-build versus paid-PDF boundary.",
  },
  {
    title: "Netherlands CV format in English",
    url: `${siteBaseUrl}/en/guides/cv-format-netherlands-english`,
    description:
      "English guide to Netherlands CV format, section order, length, language choices and evidence-based writing, with official sources and a free editor route.",
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
    title: "WerkCV product FAQ",
    url: `${siteBaseUrl}/faq`,
    description:
      "Canonical product answers about email-code accounts, CV upload, autosave, payment, repeat downloads, privacy and support.",
  },
  {
    title: "ATS-vriendelijk CV",
    url: `${siteBaseUrl}/cv-tips/ats-vriendelijk-cv`,
    description:
      "Dutch guidance on ATS-readable structure, vacancy keywords, file formats and the limits of ATS claims.",
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
    title: "Kandidaatvoorstel-software voor recruitmentbureaus",
    url: `${siteBaseUrl}/agency`,
    description:
      `${agencyMessagingNl.description} Agency billing is ${agencyPriceNl} for ${AGENCY_MONTHLY_CREDIT_LIMIT} shared CV credits.`,
  },
  {
    title: "Gratis kandidaatvoorstel evidence checker",
    url: `${siteBaseUrl}/tools/kandidaatvoorstel-checker`,
    description:
      "Free Dutch checker for recruiters: compare vacancy requirements with CV evidence, source snippets and visible open points before sending a candidate proposal. The result is a quality check, not an automated hiring decision.",
  },
  {
    title: "Kandidaatvoorstel voorbeeld",
    url: `${siteBaseUrl}/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld`,
    description:
      "Fictional Dutch worked example showing vacancy requirements, exact CV source snippets, supported and unsupported claims, changing facts, recruiter actions, client introduction, email and controlled PDF/DOCX outputs.",
  },
  {
    title: "Kandidaat aanbieden bij de overheid",
    url: `${siteBaseUrl}/voor-bureaus/kennisbank/kandidaat-aanbieden-overheid`,
    description:
      "Dutch guide for public-sector and secondment submissions: classify knock-out requirements, connect each requirement to exact CV evidence, keep missing/current facts visible and review a fictional requirements matrix.",
  },
  {
    title: "Free candidate proposal evidence checker",
    url: `${siteBaseUrl}/en/candidate-proposal-checker`,
    description:
      "Free English checker for recruitment agencies to inspect whether vacancy requirements are supported by source CV evidence, with unresolved points kept visible.",
  },
  {
    title: "MatchPack candidate submission evidence software",
    url: `${siteBaseUrl}/en/agency`,
    description:
      `${agencyMessagingEn.description}${agencyCapabilities.candidateAcknowledgement ? " Candidate acknowledgement is available for a named recipient." : ""} Agency billing is ${agencyPriceEn} for ${AGENCY_MONTHLY_CREDIT_LIMIT} shared CV credits.`,
  },
  {
    title: "MatchPack voor bureaus",
    url: `${siteBaseUrl}/voor-bureaus`,
    description:
      "WerkCV MatchPack turns one vacancy, one candidate CV and recruiter notes into a reviewable candidate proposal. Every requirement is connected to evidence; missing information remains visible.",
  },
  {
    title: "MatchPack handleiding",
    url: `${siteBaseUrl}/voor-bureaus/kennisbank/matchpack-handleiding`,
    description:
      "Step-by-step guide to MatchPack inputs, evidence statuses, recruiter corrections, versions, approval, PDF/DOCX exports, contact-free review, retention, roles and the shared Agency CV-credit contract.",
  },
  {
    title: "Kandidaatvoorstel maken: voorbeeld en checklist",
    url: `${siteBaseUrl}/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever`,
    description:
      "Dutch practical guide to making a candidate proposal for a client, with source-backed evidence, confirmed practical facts, open points, internal notes, output choices and a pre-send checklist.",
  },
  {
    title: "Kandidaat-CV in huisstijl van een recruitmentbureau",
    url: `${siteBaseUrl}/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau`,
    description:
      "Dutch guide to placing a candidate CV in agency house style without changing source meaning, with controlled PDF/DOCX output, versions, CSV exchange and contact-reduced review.",
  },
  {
    title: "CV delen zonder directe contactgegevens",
    url: `${siteBaseUrl}/voor-bureaus/kennisbank/cv-anonimiseren-recruitment`,
    description:
      "Dutch recruitment guide to contact-reduced CV sharing: review direct fields and indirect identifiers, preserve the source, and avoid claims of legal anonymity.",
  },
  {
    title: "AI-profielfoto voor CV en LinkedIn",
    url: `${siteBaseUrl}/profielfoto-cv-maken`,
    description:
      `Create four AI profile-photo previews from one to four source photos, refine a selected variant twice, and pay ${profilePhotoPrice.display} including VAT only when downloading. No subscription.`,
  },
  {
    title: "Bronfoto-gids voor AI-headshots",
    url: `${siteBaseUrl}/ai-headshot-foto-tips`,
    description:
      "Dutch source-photo guide covering lighting, crop, resolution, number of references, glasses, clothing, identity checks, upload limits and photo privacy.",
  },
  {
    title: "AI profile photo for the Netherlands",
    url: `${siteBaseUrl}/en/profile-photo`,
    description:
      `English AI headshot generator for Dutch CV and LinkedIn use, with previews before a one-time ${profilePhotoPrice.display} download including VAT.`,
  },
  {
    title: "AI headshot photo requirements",
    url: `${siteBaseUrl}/en/ai-headshot-photo-requirements`,
    description:
      "English source-photo guide explaining which selfies or portraits to upload, technical limits, consistency, identity review and privacy.",
  },
  {
    title: "Expat CV Netherlands",
    url: `${siteBaseUrl}/en/expat-cv-netherlands`,
    description:
      "English decision guide for expats building a Netherlands-ready CV, including CV language, work authorization wording, Dutch language level, personal details and route next steps.",
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
    title: "English CV example for forklift and reach-truck operators",
    url: `${siteBaseUrl}/en/english-cv-example-forklift-reach-truck-netherlands`,
    description:
      "Fictional, role-specific English CV example covering equipment, certificates and safe warehouse work in the Netherlands.",
  },
  {
    title: "English CV example for order pickers and fulfilment",
    url: `${siteBaseUrl}/en/english-cv-example-order-picker-fulfilment-netherlands`,
    description:
      "Fictional English order-picker CV example covering picking, packing, returns, WMS and shift evidence.",
  },
  {
    title: "English CV example for logistics coordinators",
    url: `${siteBaseUrl}/en/english-cv-example-logistics-coordinator-netherlands`,
    description:
      "Fictional English logistics coordinator CV example covering transport planning, carriers, systems and exceptions.",
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
      `WerkCV is an online CV builder for applications in the Netherlands. Users can create or import a CV, review templates and pages, and pay ${cvDownloadPrice.displayEn} including VAT only when downloading the final PDF of one CV.`,
    canonicalUrl: `${siteBaseUrl}/en`,
    language: "en-NL",
  },
  {
    question: "Is WerkCV free?",
    answer:
      `Building, editing, switching templates and reviewing the complete CV are free. The final PDF download costs ${cvDownloadPrice.displayEn} including VAT per separate CV.`,
    canonicalUrl: `${siteBaseUrl}/en/pricing`,
    language: "en-NL",
  },
  {
    question: "Is WerkCV a subscription?",
    answer:
      "No. WerkCV does not start a trial or monthly subscription for an individual CV download. There is no automatic renewal to cancel.",
    canonicalUrl: `${siteBaseUrl}/en/pricing`,
    language: "en-NL",
  },
  {
    question: "What does WerkCV cost?",
    answer: `Building, editing and full preview are free. The final PDF for one separate CV costs ${cvDownloadPrice.displayEn} including VAT as a one-time payment.`,
    canonicalUrl: `${siteBaseUrl}/en/pricing`,
    language: "en-NL",
  },
  {
    question: "Can I preview before paying?",
    answer:
      "Yes. You can review every page, change content, templates and colours before opening checkout. Payment is required only when you choose to download the final PDF.",
    canonicalUrl: `${siteBaseUrl}/en/pricing`,
    language: "en-NL",
  },
  {
    question: "Where can I find a Dutch CV template in English?",
    answer:
      "WerkCV provides an English Dutch-market template guide with local section order, ATS-aware layout guidance and direct English editor and template routes.",
    canonicalUrl: `${siteBaseUrl}/en/dutch-cv-template`,
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

const agencyAiFaqItems = [
  {
    question: "What is WerkCV MatchPack?",
    answer:
      "MatchPack is a recruiter-controlled candidate-proposal workflow. It compares one vacancy with one candidate CV, connects requirements to source evidence, keeps missing information visible, and lets the recruiter correct and approve the final proposal before export.",
    canonicalUrl: `${siteBaseUrl}/voor-bureaus`,
    language: "nl-NL",
  },
  {
    question: "Does MatchPack automatically rank or recommend candidates?",
    answer:
      "No. MatchPack does not replace recruiter judgement or make hiring decisions. It checks evidence connections and highlights strong, partial and missing support for a specific proposal.",
    canonicalUrl: `${siteBaseUrl}/voor-bureaus/kennisbank/matchpack-handleiding`,
    language: "nl-NL",
  },
  {
    question: "What is the free candidate proposal evidence checker?",
    answer:
      agencyMessagingEn.mode === "proposal_claim_verification"
        ? "It is a public, no-login quality-check tool. Paste a fictional or authorised candidate profile and a real vacancy to see whether proposal claims have concrete evidence, which points are unresolved, and what a recruiter should verify before sending."
        : "It is a public, no-login quality-check tool. Paste a fictional or authorised candidate profile and a real vacancy to see whether vacancy requirements have concrete evidence, which points are unresolved, and what a recruiter should verify before sending.",
    canonicalUrl: `${siteBaseUrl}/tools/kandidaatvoorstel-checker`,
    language: "nl-NL",
  },
  {
    question: "How many Agency CV credits does MatchPack use?",
    answer:
      `The Agency billing tier currently provides ${AGENCY_MONTHLY_CREDIT_LIMIT} shared CV credits per billing period. One credit covers a new standalone CV or the first definitive approval of a MatchPack; analysis, draft review, editing and repeat downloads do not consume another credit.`,
    canonicalUrl: `${siteBaseUrl}/agency`,
    language: "nl-NL",
  },
];

export const aiFaqItems = [...aiProductFaqItems, ...englishAiFaqItems, ...agencyAiFaqItems];

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
  "AI profile-photo generation for CV and LinkedIn",
  "Source-photo guidance and identity-review checklists for AI headshots",
  "MatchPack candidate-proposal workflow for recruitment agencies",
  "Evidence-linked vacancy-requirement review with visible missing points",
  "Recruiter-controlled PDF and DOCX candidate-proposal export",
  "Free candidate-proposal evidence checker in Dutch and English",
];
