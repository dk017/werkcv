import { z } from "zod";
import type { CVData } from "@/lib/cv";

export const applicationStatuses = ["saved", "applied", "interview", "offer", "rejected"] as const;
export const statusSchema = z.enum(applicationStatuses);
export type ApplicationStatus = z.infer<typeof statusSchema>;
export const localeSchema = z.enum(["nl", "en"]);
export const idSchema = z.string().min(1).max(80);
export const searchSchema = z.object({
  cvId: idSchema.optional(),
  role: z.string().trim().min(2).max(120),
  location: z.string().trim().min(2).max(100),
  remote: z.boolean(),
  locale: localeSchema,
}).strict();
export type JobSearch = z.infer<typeof searchSchema>;

export function safeJobUrl(input: unknown): string | null {
  if (typeof input !== "string" || input.length > 2048) return null;
  try {
    const url = new URL(input);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return null;
    if (!url.hostname.includes('.') || /^(localhost|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/.test(url.hostname) || url.hostname.endsWith('.local')) return null;
    return url.href;
  } catch { return null; }
}

export const jobSchema = z.object({
  key: z.string().min(1).max(80),
  source: z.enum(["jsearch", "manual"]),
  title: z.string().min(1).max(200),
  company: z.string().max(200),
  location: z.string().max(200),
  description: z.string().max(18000),
  url: z.string().refine(value => value === "" || safeJobUrl(value) !== null),
  remote: z.boolean(),
  postedAt: z.string().datetime().nullable(),
  expiresAt: z.string().datetime().nullable(),
  requirements: z.array(z.string().min(1).max(100)).max(20),
});
export type AppJob = z.infer<typeof jobSchema>;
export type MatchEvidence = { matched: string[]; notInCv: string[] };
export type JobResult = { job: AppJob; match: MatchEvidence };
export type SavedApplication = { id: string; job: AppJob; status: ApplicationStatus; tailoredCvId: string | null; updatedAt: string };
export type CvChoice = { id: string; title: string; role: string; location: string };
export type JobErrorCode = "AUTH" | "DISABLED" | "INVALID" | "NOT_FOUND" | "UNAVAILABLE" | "QUOTA" | "NOT_CONFIGURED" | "BUSY";
export type JobActionResult<T> = { ok: true; value: T } | { ok: false; code: JobErrorCode };

export const manualJobSchema = z.object({
  title: z.string().trim().min(2).max(200),
  company: z.string().trim().max(200),
  location: z.string().trim().max(200),
  description: z.string().trim().min(40).max(18000),
  url: z.string().trim().max(2048).refine(value => value === "" || safeJobUrl(value) !== null),
}).strict();

function containsTerm(text: string, term: string) {
  const escaped = term.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return escaped.length > 1 && new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}($|[^\\p{L}\\p{N}])`, "iu").test(text);
}

// Evidence of literal overlap, not a suitability score or a hiring prediction.
export function matchJob(job: AppJob, cv?: CVData): MatchEvidence {
  if (!cv) return { matched: [], notInCv: [] };
  const cvText = [cv.personal.title, cv.personal.summary, ...cv.skills.map(s => s.name), ...cv.experience.flatMap(e => [e.role, e.description, ...e.highlights]), ...cv.education.map(e => `${e.degree} ${e.description}`)].join("\n");
  const jobText = `${job.title}\n${job.description}\n${job.requirements.join("\n")}`;
  return {
    matched: [...new Set(cv.skills.map(s => s.name.trim()).filter(skill => containsTerm(jobText, skill)))].slice(0, 8),
    notInCv: job.requirements.filter(term => !containsTerm(cvText, term)).slice(0, 8),
  };
}

export function vacancyText(job: AppJob) {
  return [job.title, job.company, job.location, job.description].filter(Boolean).join("\n\n");
}
