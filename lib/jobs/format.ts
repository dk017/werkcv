import type { Job, JobLanguageHint, JobRemoteMode, JobRoleFamily, JobSeniority } from "@prisma/client";

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function cleanJobText(text: string): string {
  return decodeHtmlEntities(text)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function descriptionExcerpt(text: string, maxLength = 220): string {
  const collapsed = cleanJobText(text);
  if (!collapsed) {
    return "Geen beschrijving beschikbaar.";
  }
  if (collapsed.length <= maxLength) {
    return collapsed;
  }
  return `${collapsed.slice(0, maxLength).trimEnd()}...`;
}

export function descriptionParagraphs(text: string, maxParagraphs = 3): string[] {
  const collapsed = cleanJobText(text);
  if (!collapsed) {
    return ["No description is available for this job yet."];
  }

  const sentences = collapsed
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  if (sentences.length === 0) {
    return [collapsed];
  }

  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length && paragraphs.length < maxParagraphs; i += 2) {
    const paragraph = [sentences[i], sentences[i + 1]].filter(Boolean).join(" ");
    if (paragraph) {
      paragraphs.push(paragraph);
    }
  }

  return paragraphs;
}

export function formatRemoteMode(mode: JobRemoteMode | null): string | null {
  if (!mode) return null;
  if (mode === "remote") return "Remote";
  if (mode === "hybrid") return "Hybrid";
  return "On-site";
}

export function formatLanguageHint(language: JobLanguageHint | null): string {
  if (language === "english") return "English";
  if (language === "dutch") return "Dutch";
  if (language === "mixed") return "English / Dutch";
  return "Language unclear";
}

export function formatRoleFamily(roleFamily: JobRoleFamily | null): string | null {
  switch (roleFamily) {
    case "engineering":
      return "Engineering";
    case "data":
      return "Data / AI";
    case "product_design":
      return "Product / Design";
    case "sales":
      return "Sales";
    case "marketing":
      return "Marketing";
    case "customer_support":
      return "Customer Support";
    case "customer_success":
      return "Customer Success";
    case "operations":
      return "Operations";
    case "finance_accounting":
      return "Finance / Accounting";
    case "hr_people":
      return "HR / People";
    case "legal_compliance":
      return "Legal / Compliance";
    case "admin_office":
      return "Admin / Office";
    case "logistics_supply_chain":
      return "Logistics / Supply Chain";
    case "general_business":
      return "Business";
    default:
      return null;
  }
}

export function formatSeniority(seniority: JobSeniority | null): string | null {
  switch (seniority) {
    case "internship":
      return "Internship";
    case "graduate":
      return "Graduate";
    case "junior":
      return "Junior";
    case "mid":
      return "Mid-level";
    case "senior":
      return "Senior";
    case "lead":
      return "Lead";
    case "manager":
      return "Manager";
    case "director":
      return "Director";
    case "executive":
      return "Executive";
    default:
      return null;
  }
}

export function formatLocationLabel(job: Pick<Job, "city" | "countryCode" | "locationRaw" | "remoteMode">): string {
  if (job.remoteMode === "remote" && job.countryCode === "NL") {
    return "Remote - Netherlands";
  }
  if (job.city && job.countryCode === "NL") {
    return `${job.city}, Netherlands`;
  }
  if (job.locationRaw) {
    return job.locationRaw;
  }
  return "Location not specified";
}

export function formatPostedDate(date: Date | null): string | null {
  if (!date) return null;
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function pickPrimaryJobCta(job: Pick<Job, "isEnglishFriendly" | "isWithoutDutch" | "visaHint">) {
  if (job.isEnglishFriendly || job.isWithoutDutch || job.visaHint) {
    return {
      href: "/en/dutch-cv-template",
      label: "Build a Dutch CV in English",
    };
  }

  return {
    href: "/tools/ats-cv-checker",
    label: "Check your CV for ATS issues",
  };
}

export function buildJobCvTips(
  job: Pick<Job, "title" | "city" | "remoteMode" | "isEnglishFriendly" | "isWithoutDutch" | "visaHint" | "roleFamily" | "seniority">
): string[] {
  const tips: string[] = [];

  if (job.isEnglishFriendly || job.isWithoutDutch) {
    tips.push("Keep your CV in one language and mirror the vacancy wording in your summary and recent experience.");
  }

  if (job.visaHint) {
    tips.push("If you need sponsorship or relocation support, mention your work authorization or move plan clearly near the top of your CV.");
  }

  if (job.city) {
    tips.push(`Add your ${job.city} location or relocation availability so recruiters can see your Netherlands fit immediately.`);
  }

  if (job.remoteMode === "remote" || job.remoteMode === "hybrid") {
    tips.push("Show remote collaboration, stakeholder communication, and async delivery examples in your recent work bullets.");
  }

  switch (job.roleFamily) {
    case "engineering":
    case "data":
      tips.push("Lead with systems shipped, tools used, and measurable outcomes instead of a generic responsibilities list.");
      break;
    case "sales":
      tips.push("Highlight quota, pipeline ownership, deal size, and expansion results so the CV matches commercial hiring signals.");
      break;
    case "marketing":
      tips.push("Use channel metrics, campaign results, and experimentation wins to make the CV stronger than a generic marketing summary.");
      break;
    case "finance_accounting":
      tips.push("Show reporting scope, controls, closes, audits, or forecast impact so finance experience reads as concrete and trustworthy.");
      break;
    case "customer_support":
    case "customer_success":
      tips.push("Show ticket volume, SLA impact, CSAT, onboarding results, or retention outcomes to make customer-facing experience concrete.");
      break;
    case "operations":
      tips.push("Focus on process improvements, cross-team coordination, and efficiency gains instead of vague operational support wording.");
      break;
    default:
      tips.push("Make the first three bullets in your latest role specific to this vacancy instead of sending a generic CV.");
      break;
  }

  if (job.seniority === "internship" || job.seniority === "graduate" || job.seniority === "junior") {
    tips.push("For early-career roles, push projects, internships, coursework, and practical outcomes higher up the CV than general profile text.");
  }

  return tips.slice(0, 4);
}

export function buildInternationalSignals(
  job: Pick<Job, "isEnglishFriendly" | "isWithoutDutch" | "visaHint" | "remoteMode" | "locationRaw" | "city">
): string[] {
  const items: string[] = [];

  if (job.isEnglishFriendly) {
    items.push("This vacancy reads as English-friendly, so an English CV is the right default.");
  }

  if (job.isWithoutDutch) {
    items.push("Dutch does not appear to be a hard requirement in the source copy.");
  }

  if (job.visaHint) {
    items.push("The source copy includes relocation or visa signals, which is useful for internationals.");
  }

  if (job.remoteMode === "remote") {
    items.push("This role includes a remote setup signal, which often changes the emphasis of your work-style bullets.");
  }

  if (job.city) {
    items.push(`The job is tied to ${job.city}, so your location or willingness to relocate should be obvious on the CV.`);
  } else if (job.locationRaw) {
    items.push(`The source location is listed as ${job.locationRaw}.`);
  }

  return items.slice(0, 4);
}
