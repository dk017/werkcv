import type { Job, JobLanguageHint, JobRemoteMode } from "@prisma/client";

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
  job: Pick<Job, "title" | "city" | "remoteMode" | "isEnglishFriendly" | "isWithoutDutch" | "visaHint">
): string[] {
  const title = job.title.toLowerCase();
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

  if (/(engineer|developer|architect|software|data)/.test(title)) {
    tips.push("Lead with technologies shipped, systems owned, and business outcomes instead of a generic responsibilities list.");
  } else if (/(sales|account executive|business development)/.test(title)) {
    tips.push("Highlight quota, pipeline, deal size, and expansion results so the CV matches commercial hiring signals.");
  } else if (/(marketing|growth|content)/.test(title)) {
    tips.push("Use channel metrics, campaign results, and experimentation wins to make the CV stronger than a generic marketing summary.");
  } else if (/(support|customer service|success)/.test(title)) {
    tips.push("Show ticket volume, SLA impact, CSAT, or retention outcomes to make customer-facing experience concrete.");
  } else {
    tips.push("Make the first three bullets in your latest role specific to this vacancy instead of sending a generic CV.");
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
