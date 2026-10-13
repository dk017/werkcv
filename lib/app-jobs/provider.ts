import { createHash } from "node:crypto";
import { load } from "cheerio";
import { z } from "zod";
import { jobSchema, safeJobUrl, type AppJob, type JobSearch, type JobErrorCode } from "./model";

export class JobServiceError extends Error {
  constructor(public code: JobErrorCode) { super(code); }
}

export function jobHash(text: string) { return createHash("sha256").update(text).digest("hex"); }
export function searchKey(input: JobSearch) {
  return jobHash(JSON.stringify(["jsearch-v3-nl", input.role.trim().toLowerCase(), input.location.trim().toLowerCase(), input.remote, input.locale]));
}
export function plainText(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  const $ = load(value.slice(0, 100000));
  $("script, style, iframe").remove();
  $("br").replaceWith("\n");
  $("p, li, div").append("\n");
  return $.text().replace(/\r/g, "").replace(/\n{3,}/g, "\n\n").trim().slice(0, max);
}
function date(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.valueOf()) ? null : parsed.toISOString();
}
// JSearch almost never sets job_is_remote for NL listings, so also read the posting text.
const REMOTE_TEXT = /\b(remote|hybrid|hybride|thuiswerk\w*|work from home|op afstand)\b/i;
const responseSchema = z.object({ status: z.literal("OK"), data: z.object({ jobs: z.array(z.record(z.string(), z.unknown())).max(100) }) });

export function normalizeJobs(payload: unknown, now = new Date()): AppJob[] {
  const parsed = responseSchema.safeParse(payload);
  if (!parsed.success) throw new JobServiceError("UNAVAILABLE");
  const seen = new Set<string>();
  const jobs: AppJob[] = [];
  for (const row of parsed.data.data.jobs) {
    const url = safeJobUrl(row.job_apply_link);
    const title = plainText(row.job_title, 200);
    const company = plainText(row.employer_name, 200);
    const location = plainText(row.job_location || [row.job_city, row.job_state, row.job_country].filter(Boolean).join(", "), 200);
    const expiresAt = date(row.job_offer_expiration_datetime_utc);
    if (!url || !title || (expiresAt && new Date(expiresAt) <= now)) continue;
    // Exclude foreign-country listings; "remote" alone does not imply NL eligibility.
    if (typeof row.job_country === "string" && row.job_country.toLowerCase() !== "nl") continue;
    const dedupe = `${title}|${company}|${location}`.toLowerCase();
    const key = jobHash(`jsearch:${row.job_id || url}`);
    if (seen.has(key) || seen.has(dedupe) || seen.has(url)) continue;
    seen.add(key); seen.add(dedupe); seen.add(url);
    const description = plainText(row.job_description, 18000);
    jobs.push(jobSchema.parse({
      key, source: "jsearch", title, company, location, url, description,
      remote: row.job_is_remote === true || REMOTE_TEXT.test(`${title}\n${description}`),
      postedAt: date(row.job_posted_at_datetime_utc), expiresAt,
      requirements: Array.isArray(row.required_technologies)
        ? [...new Set(row.required_technologies.map(v => plainText(v, 100)).filter(Boolean))].slice(0, 20) : [],
    }));
  }
  return jobs.slice(0, 20);
}

export async function fetchJSearch(input: JobSearch, options: { apiKey?: string; fetcher?: typeof fetch } = {}) {
  const apiKey = options.apiKey ?? process.env.JSEARCH_API_KEY;
  if (!apiKey) throw new JobServiceError("NOT_CONFIGURED");
  const url = new URL("https://api.openwebninja.com/jsearch/search-v2");
  const location = input.location.trim();
  const where = !location ? "Netherlands" : /\b(netherlands|nederland)\b/i.test(location) ? location : `${location}, Netherlands`;
  // No `language` or `work_from_home`: with country=nl, language=en returns zero jobs and
  // work_from_home returns non-NL listings that are then filtered out.
  url.search = new URLSearchParams({ query: `${input.remote ? "remote " : ""}${input.role} in ${where}`, country: "nl", date_posted: "month" }).toString();
  try {
    const response = await (options.fetcher ?? fetch)(url, {
      headers: { "x-api-key": apiKey }, cache: "no-store", redirect: "error", signal: AbortSignal.timeout(15000),
    });
    if (response.status === 429) throw new JobServiceError("QUOTA");
    if (!response.ok) throw new JobServiceError("UNAVAILABLE");
    return normalizeJobs(await response.json()).filter(job => !input.remote || job.remote);
  } catch (error) {
    if (error instanceof JobServiceError) throw error;
    // Never surface provider responses, request headers or credentials to clients/logs.
    throw new JobServiceError("UNAVAILABLE");
  }
}
