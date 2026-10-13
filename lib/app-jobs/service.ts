import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { cvSchema } from "@/lib/cv";
import { isAgencyCvStartSource } from "@/lib/agency-access";
import { getMeaningfulCvState } from "@/lib/cv-meaningful";
import { applicationStatuses, jobSchema, matchJob, statusSchema, vacancyText, type AppJob, type JobSearch, type SavedApplication, type CvChoice, type ApplicationStatus } from "./model";
import { fetchJSearch, jobHash, JobServiceError, searchKey } from "./provider";

const CACHE_MS = 6 * 60 * 60 * 1000;
const DAILY_LIMIT = 10;
function monthlyLimit() {
  const value = Number(process.env.JSEARCH_MONTHLY_LIMIT ?? 180);
  return Number.isInteger(value) && value >= 0 && value <= 100000 ? value : 180;
}
const json = (value: unknown) => value as Prisma.InputJsonValue;
const personalWhere = (userId: string) => ({ userId, agencySubscriptionId: null, matchPack: null });

export async function ownedCv(userId: string, id: string, client = prisma) {
  const cv = await client.cVDocument.findFirst({ where: { ...personalWhere(userId), id } });
  if (!cv || isAgencyCvStartSource(cv.startSource, cv.sourceCluster)) throw new JobServiceError("NOT_FOUND");
  const parsed = cvSchema.safeParse(cv.data);
  if (!parsed.success) throw new JobServiceError("INVALID");
  return { ...cv, data: parsed.data };
}

export async function listCvChoices(userId: string): Promise<CvChoice[]> {
  const cvs = await prisma.cVDocument.findMany({ where: personalWhere(userId), orderBy: { updatedAt: "desc" }, take: 100, select: { id: true, title: true, data: true, startSource: true, sourceCluster: true } });
  return cvs.filter(cv => !isAgencyCvStartSource(cv.startSource, cv.sourceCluster)).flatMap(cv => {
    const parsed = cvSchema.safeParse(cv.data);
    return parsed.success ? [{ id: cv.id, title: cv.title, role: (parsed.data.personal.title || parsed.data.experience[0]?.role || "").slice(0, 120), location: (parsed.data.personal.location || "").slice(0, 100) }] : [];
  });
}

export async function searchJobs(userId: string, input: JobSearch, options: { provider?: typeof fetchJSearch; now?: Date } = {}) {
  const provider = options.provider ?? fetchJSearch;
  const now = options.now ?? new Date();
  const cv = input.cvId ? await ownedCv(userId, input.cvId) : undefined;
  const key = searchKey(input);
  const result = await prisma.$transaction(async tx => {
    // Coalesce identical searches across processes, then atomically reserve quota.
    await tx.$queryRaw`SELECT pg_advisory_xact_lock(hashtext(${`jobs:${key}`}))::text`;
    const cached = await tx.personalJobSearchCache.findUnique({ where: { id: key } });
    if (cached && cached.expiresAt > now) return { jobs: jobSchema.array().parse(cached.jobs), cached: true };
    if (!process.env.JSEARCH_API_KEY && provider === fetchJSearch) throw new JobServiceError("NOT_CONFIGURED");
    const month = now.toISOString().slice(0, 7);
    const day = now.toISOString().slice(0, 10);
    const expiry = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
    for (const [id, limit] of [[`month:${month}`, monthlyLimit()], [`user:${userId}:${day}`, DAILY_LIMIT]] as const) {
      if (limit === 0) throw new JobServiceError("QUOTA");
      const reserved = await tx.$queryRaw<Array<{ used: number }>>`
        INSERT INTO "PersonalJobSearchBudget" ("id", "used", "expiresAt") VALUES (${id}, 1, ${expiry})
        ON CONFLICT ("id") DO UPDATE SET "used" = "PersonalJobSearchBudget"."used" + 1
        WHERE "PersonalJobSearchBudget"."used" < ${limit} RETURNING "used"`;
      if (!reserved.length) throw new JobServiceError("QUOTA");
    }
    // Failed upstream requests still consume a reserved slot; never retry automatically.
    try {
      const jobs = await provider(input);
      await tx.personalJobSearchCache.upsert({ where: { id: key }, create: { id: key, jobs: json(jobs), expiresAt: new Date(now.valueOf() + CACHE_MS) }, update: { jobs: json(jobs), expiresAt: new Date(now.valueOf() + CACHE_MS) } });
      return { jobs, cached: false };
    } catch (error) {
      return { error: error instanceof JobServiceError ? error.code : "UNAVAILABLE" as const };
    }
  }, { timeout: 25000, maxWait: 5000 });
  if ("error" in result) throw new JobServiceError(result.error!);
  return { searchKey: key, cached: result.cached, results: result.jobs
    .filter(job => !job.expiresAt || new Date(job.expiresAt) > now)
    .map(job => ({ job, match: matchJob(job, cv?.data) }))
    .sort((a, b) => b.match.matched.length - a.match.matched.length) };
}

function application(row: { id: string; snapshot: unknown; status: string; tailoredCvId: string | null; updatedAt: Date }): SavedApplication {
  return { id: row.id, job: jobSchema.parse(row.snapshot), status: statusSchema.parse(row.status), tailoredCvId: row.tailoredCvId, updatedAt: row.updatedAt.toISOString() };
}
export async function listApplications(userId: string) {
  return (await prisma.personalJobApplication.findMany({ where: { userId }, orderBy: { updatedAt: "desc" }, take: 200 })).map(application);
}
export async function saveJob(userId: string, job: AppJob) {
  return application(await prisma.personalJobApplication.upsert({
    where: { userId_jobKey: { userId, jobKey: job.key } },
    create: { userId, jobKey: job.key, snapshot: json(job) },
    // Repeated saves never reset application progress or overwrite a saved description.
    update: {},
  }));
}
export async function saveSearchJob(userId: string, key: string, jobKey: string) {
  const cached = await prisma.personalJobSearchCache.findUnique({ where: { id: key } });
  const job = cached && jobSchema.array().parse(cached.jobs).find(job => job.key === jobKey);
  if (!job) throw new JobServiceError("NOT_FOUND");
  return saveJob(userId, job);
}
export async function updateApplication(userId: string, id: string, status: ApplicationStatus) {
  if (!applicationStatuses.includes(status)) throw new JobServiceError("INVALID");
  const updated = await prisma.personalJobApplication.updateMany({ where: { id, userId }, data: { status } });
  if (!updated.count) throw new JobServiceError("NOT_FOUND");
}
export async function createTailoredCopy(userId: string, applicationId: string, cvId: string, locale: "nl" | "en") {
  const source = await ownedCv(userId, cvId);
  return prisma.$transaction(async tx => {
    await tx.$queryRaw`SELECT "id" FROM "PersonalJobApplication" WHERE "id" = ${applicationId} AND "userId" = ${userId} FOR UPDATE`;
    const saved = await tx.personalJobApplication.findFirst({ where: { id: applicationId, userId } });
    if (!saved) throw new JobServiceError("NOT_FOUND");
    if (saved.tailoredCvId) {
      const existing = await tx.cVDocument.findFirst({ where: { ...personalWhere(userId), id: saved.tailoredCvId } });
      if (existing) return { cvId: existing.id, reused: true };
    }
    const job = jobSchema.parse(saved.snapshot);
    if (job.description.trim().length < 40) throw new JobServiceError("INVALID");
    const meaningful = getMeaningfulCvState(source.data);
    const copy = await tx.cVDocument.create({ data: {
      userId, agencySubscriptionId: null,
      title: `${job.title} – ${job.company || (locale === "en" ? "application" : "sollicitatie")}`.slice(0, 80),
      data: json(source.data), templateId: source.templateId, colorThemeId: source.colorThemeId,
      hasMeaningfulContent: meaningful.isMeaningful,
      meaningfulContentAt: meaningful.isMeaningful ? new Date() : null,
      startSource: "app_job_tailor", sourceLocale: locale,
    } });
    await tx.personalJobApplication.update({ where: { id: saved.id }, data: { tailoredCvId: copy.id } });
    return { cvId: copy.id, reused: false };
  });
}
export async function jobVacancyForCv(userId: string, cvId: string) {
  const saved = await prisma.personalJobApplication.findFirst({ where: { userId, tailoredCvId: cvId } });
  if (!saved) return "";
  return vacancyText(jobSchema.parse(saved.snapshot));
}

export function manualJob(input: { title: string; company: string; location: string; description: string; url: string }): AppJob {
  return jobSchema.parse({ ...input, key: jobHash(`manual:${JSON.stringify(input)}`), source: "manual", remote: false, postedAt: null, expiresAt: null, requirements: [] });
}
