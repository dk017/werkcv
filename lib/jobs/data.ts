import type { Job, JobListingPage, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { jobsListingPageSeeds } from "@/lib/jobs/listing-pages";
import type { JobListingFilter } from "@/lib/jobs/types";

export type EvaluatedJobListingPage = {
  page: JobListingPage;
  filters: JobListingFilter;
  jobs: Job[];
  jobCount: number;
  companyCount: number;
  meetsThresholds: boolean;
};

export type JobPageResult = {
  job: Job;
  relatedJobs: Job[];
  relatedListings: JobListingPage[];
  redirectTo?: string;
};

function parseJobListingFilters(value: Prisma.JsonValue): JobListingFilter {
  if (!value || Array.isArray(value) || typeof value !== "object") {
    return {};
  }

  return value as unknown as JobListingFilter;
}

function buildJobWhere(filters: JobListingFilter): Prisma.JobWhereInput {
  const where: Prisma.JobWhereInput = {
    status: "active",
  };

  if (filters.countryCode) where.countryCode = filters.countryCode;
  if (filters.citySlug) where.citySlug = filters.citySlug;
  if (typeof filters.isNlRelevant === "boolean") where.isNlRelevant = filters.isNlRelevant;
  if (typeof filters.isEnglishFriendly === "boolean") where.isEnglishFriendly = filters.isEnglishFriendly;
  if (typeof filters.isWithoutDutch === "boolean") where.isWithoutDutch = filters.isWithoutDutch;
  if (typeof filters.visaHint === "boolean") where.visaHint = filters.visaHint;
  if (filters.languageHints?.length) where.languageHint = { in: filters.languageHints };
  if (filters.remoteModes?.length) where.remoteMode = { in: filters.remoteModes };
  if (filters.clusterTagsAny?.length) where.clusterTags = { hasSome: filters.clusterTagsAny };

  return where;
}

async function evaluateListingPage(page: JobListingPage): Promise<EvaluatedJobListingPage> {
  const filters = parseJobListingFilters(page.filters as Prisma.JsonValue);
  const where = buildJobWhere(filters);

  const [jobs, jobCount, companyRows] = await Promise.all([
    prisma.job.findMany({
      where,
      orderBy: [{ postedAt: "desc" }, { lastSeenAt: "desc" }, { createdAt: "desc" }],
      take: 150,
    }),
    prisma.job.count({ where }),
    prisma.job.findMany({
      where,
      select: { companySlug: true },
      distinct: ["companySlug"],
    }),
  ]);

  const companyCount = companyRows.length;

  return {
    page,
    filters,
    jobs,
    jobCount,
    companyCount,
    meetsThresholds: jobCount >= page.minJobCount && companyCount >= page.minCompanyCount,
  };
}

export async function getJobListingPageByPath(path: string): Promise<EvaluatedJobListingPage | null> {
  const page = await prisma.jobListingPage.findUnique({
    where: { path },
  });

  if (!page || !page.isActive) {
    return null;
  }

  return evaluateListingPage(page);
}

export async function getIndexableJobListingPages(): Promise<EvaluatedJobListingPage[]> {
  const pages = await prisma.jobListingPage.findMany({
    where: {
      isActive: true,
      isIndexable: true,
    },
    orderBy: { createdAt: "asc" },
  });

  const evaluated = await Promise.all(pages.map((page) => evaluateListingPage(page)));
  return evaluated.filter((item) => item.meetsThresholds);
}

function extractExternalIdFromSlug(slug: string): string | null {
  const uuidMatch = slug.match(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);
  if (uuidMatch) {
    return uuidMatch[1];
  }

  const numericPrefix = slug.match(/^(\d{6,})(?:-|$)/);
  if (numericPrefix) {
    return numericPrefix[1];
  }

  const numericSuffix = slug.match(/-(\d{6,})$/);
  if (numericSuffix) {
    return numericSuffix[1];
  }

  return null;
}

function relatedListingPathsForJob(job: Job): string[] {
  const paths = new Set<string>();

  if (job.isEnglishFriendly) {
    paths.add("/jobs/english-speaking-jobs-netherlands");
    paths.add("/vacatures/engelstalige-vacatures-nederland");
    paths.add("/vacatures/vacatures-voor-engelstaligen");

    if (job.citySlug === "amsterdam") {
      paths.add("/jobs/english-speaking-jobs-amsterdam");
      paths.add("/vacatures/engelstalige-vacatures-amsterdam");
    }
  }

  if (job.isWithoutDutch) {
    paths.add("/jobs/jobs-in-netherlands-without-dutch");
    paths.add("/vacatures/banen-zonder-nederlandse-taal");
  }

  if (job.visaHint) {
    paths.add("/jobs/visa-sponsorship-jobs-netherlands");
  }

  if (paths.size === 0) {
    paths.add("/jobs/english-speaking-jobs-netherlands");
  }

  return [...paths];
}

async function getRelatedJobs(job: Job): Promise<Job[]> {
  const sameCompany = await prisma.job.findMany({
    where: {
      status: "active",
      id: { not: job.id },
      companySlug: job.companySlug,
    },
    orderBy: [{ postedAt: "desc" }, { lastSeenAt: "desc" }],
    take: 3,
  });

  const excludedIds = [job.id, ...sameCompany.map((item) => item.id)];
  const secondaryOr: Prisma.JobWhereInput[] = [];

  if (job.citySlug) {
    secondaryOr.push({ citySlug: job.citySlug });
  }
  if (job.isEnglishFriendly) {
    secondaryOr.push({ isEnglishFriendly: true });
  }
  if (job.isWithoutDutch) {
    secondaryOr.push({ isWithoutDutch: true });
  }
  if (job.clusterTags.length > 0) {
    secondaryOr.push({ clusterTags: { hasSome: job.clusterTags.slice(0, 3) } });
  }

  if (secondaryOr.length === 0) {
    return sameCompany;
  }

  const secondary = await prisma.job.findMany({
    where: {
      status: "active",
      id: { notIn: excludedIds },
      OR: secondaryOr,
    },
    orderBy: [{ postedAt: "desc" }, { lastSeenAt: "desc" }],
    take: 4,
  });

  return [...sameCompany, ...secondary].slice(0, 6);
}

export async function getJobPage(companySlug: string, slug: string): Promise<JobPageResult | null> {
  const requestedPath = `/jobs/${companySlug}/${slug}`;
  const exact = await prisma.job.findUnique({
    where: { routePath: requestedPath },
  });

  if (exact?.status === "active") {
    const [relatedJobs, relatedListings] = await Promise.all([
      getRelatedJobs(exact),
      prisma.jobListingPage.findMany({
        where: {
          path: { in: relatedListingPathsForJob(exact) },
          isActive: true,
        },
        orderBy: { createdAt: "asc" },
      }),
    ]);

    return {
      job: exact,
      relatedJobs,
      relatedListings,
    };
  }

  const externalId = extractExternalIdFromSlug(slug);
  if (!externalId) {
    return null;
  }

  const fallback = await prisma.job.findFirst({
    where: {
      companySlug,
      externalId,
      status: "active",
    },
  });

  if (!fallback) {
    return null;
  }

  const [relatedJobs, relatedListings] = await Promise.all([
    getRelatedJobs(fallback),
    prisma.jobListingPage.findMany({
      where: {
        path: { in: relatedListingPathsForJob(fallback) },
        isActive: true,
      },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  return {
    job: fallback,
    relatedJobs,
    relatedListings,
    redirectTo: fallback.routePath !== requestedPath ? fallback.routePath : undefined,
  };
}

export async function getJobRoutesForSitemap() {
  return prisma.job.findMany({
    where: {
      status: "active",
      isNlRelevant: true,
    },
    select: {
      routePath: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: "desc" },
    take: 500,
  });
}

export function listingSeedForPath(path: string) {
  return jobsListingPageSeeds.find((seed) => seed.path === path) ?? null;
}

