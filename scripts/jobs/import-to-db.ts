import "dotenv/config";
import { readFile } from "fs/promises";
import path from "path";
import { prisma } from "../../lib/prisma";
import type { JobPagePayload, JobRoleFamily, JobSeniority, LanguageHint, RemoteMode } from "../../lib/jobs/types";

type SupportedJobProvider = JobPagePayload["normalizedJob"]["provider"];
type SeedSourceRow = {
  source_id: string;
  status: string;
  priority: string;
  company_name: string;
  city: string;
  segment: string;
  english_fit: string;
  provider_hint: string;
  provider: string;
  source_key: string;
  api_url: string;
  careers_url: string;
  notes: string;
};

type JobPagesPayload = {
  generatedAt: string;
  pages: JobPagePayload[];
};

const ROOT_DIR = process.cwd();
const SOURCES_PATH = path.join(ROOT_DIR, "data", "jobs", "company_sources.seed.csv");
const JOB_PAGES_PATH = path.join(ROOT_DIR, "data", "jobs", "derived", "job-pages.json");
const ACTIVE_SOURCE_STATUSES = new Set(["pilot", "verified"]);
const PRIORITY_MAP: Record<string, number> = {
  P0: 0,
  P1: 10,
  P2: 20,
  P3: 30,
};

function parseArgs() {
  return {
    dryRun: process.argv.includes("--dry-run"),
  };
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "unknown";
}

function parseCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      const next = line[i + 1];
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      cells.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  cells.push(current);
  return cells;
}

async function loadSeedSources(): Promise<SeedSourceRow[]> {
  const raw = await readFile(SOURCES_PATH, "utf-8");
  const lines = raw.split(/\r?\n/).filter((line) => line.trim().length > 0);
  const header = parseCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row: Record<string, string> = {};

    for (let i = 0; i < header.length; i += 1) {
      row[header[i]] = values[i] ?? "";
    }

    return row as unknown as SeedSourceRow;
  });
}

async function loadJobPages(): Promise<JobPagesPayload> {
  const raw = await readFile(JOB_PAGES_PATH, "utf-8");
  return JSON.parse(raw) as JobPagesPayload;
}

function toNullableString(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function toDateOrNull(value: string | null | undefined): Date | null {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function priorityToNumber(value: string): number {
  const trimmed = value.trim();
  if (trimmed in PRIORITY_MAP) return PRIORITY_MAP[trimmed];
  const numeric = Number(trimmed);
  return Number.isFinite(numeric) ? numeric : 100;
}

function stripHtml(text: string): string {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function makeExcerpt(text: string, maxLength = 320): string {
  const clean = stripHtml(text);
  if (!clean) return "Geen beschrijving beschikbaar.";
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength).trimEnd()}...`;
}

function isEnglishFriendly(languageHint: LanguageHint | undefined, tags: string[], dutchRequired: boolean | null | undefined) {
  if (dutchRequired === true) return false;
  if (dutchRequired === false) return true;
  if (languageHint === "english" || languageHint === "mixed") return true;
  return tags.includes("english_possible");
}

function isWithoutDutch(tags: string[], dutchRequired: boolean | null | undefined) {
  if (dutchRequired === false) return true;
  return tags.includes("without_dutch") || tags.includes("no_dutch");
}

function isNlRelevant(countryCode: string | null | undefined, tags: string[], locationRaw: string) {
  if (countryCode === "NL") return true;
  if (tags.includes("country_nl")) return true;
  const normalizedLocation = locationRaw.toLowerCase();
  return normalizedLocation.includes("netherlands") || normalizedLocation.includes("nederland");
}

function buildCanonicalSlug(externalId: string, title: string): string {
  return `${externalId}-${slugify(title)}`;
}

function buildRoutePath(companySlug: string, externalId: string, title: string): string {
  return `/jobs/${companySlug}/${buildCanonicalSlug(externalId, title)}`;
}

function sourceLookupKeys(row: SeedSourceRow): string[] {
  const provider = row.provider as SupportedJobProvider;
  const sourceSlug = slugify(row.source_id);
  const companySlug = slugify(row.company_name);
  const keys = [`${provider}:${sourceSlug}`];
  if (companySlug !== sourceSlug) {
    keys.push(`${provider}:${companySlug}`);
  }
  return keys;
}

async function main() {
  const { dryRun } = parseArgs();
  const [seedSources, jobPagesPayload] = await Promise.all([loadSeedSources(), loadJobPages()]);
  const fetchableSources = seedSources.filter(
    (row) => ACTIVE_SOURCE_STATUSES.has(row.status) && row.provider && row.provider !== "unknown"
  );

  const pages = jobPagesPayload.pages;
  const sourceRowsByKey = new Map<string, SeedSourceRow>();
  for (const row of fetchableSources) {
    for (const key of sourceLookupKeys(row)) {
      sourceRowsByKey.set(key, row);
    }
  }

  const sourceSummaries = new Map<string, { row: SeedSourceRow; jobIds: Set<string> }>();
  const importRows: Array<{
    sourceRow: SeedSourceRow | null;
    provider: SupportedJobProvider;
    externalId: string;
    companySlug: string;
    companyName: string;
    title: string;
    titleSlug: string;
    canonicalSlug: string;
    routePath: string;
    locationRaw: string;
    city: string | null;
    citySlug: string | null;
    countryCode: string | null;
    remoteMode: RemoteMode | null;
    employmentType: string | null;
    languageHint: LanguageHint;
    dutchRequired: boolean | null;
    visaHint: boolean | null;
    roleFamily: JobRoleFamily;
    seniority: JobSeniority;
    isNlRelevant: boolean;
    isEnglishFriendly: boolean;
    isWithoutDutch: boolean;
    descriptionText: string;
    excerpt: string;
    applyUrl: string;
    sourceUrl: string;
    postedAt: Date | null;
    keywords: string[];
    clusterTags: string[];
  }> = [];
  const missingSourceJobs: Array<{ company: string; provider: string; title: string }> = [];

  for (const page of pages) {
    const job = page.normalizedJob;
    const provider: SupportedJobProvider = job.provider;
    const titleSlug = slugify(job.title);
    const canonicalSlug = buildCanonicalSlug(job.externalId, job.title);
    const routePath = buildRoutePath(job.companySlug, job.externalId, job.title);
    const clusterTags = Array.from(new Set([...(job.clusterTags ?? []), ...(page.relatedClusters ?? [])]));
    const lookupKey = `${provider}:${job.companySlug}`;
    const sourceRow = sourceRowsByKey.get(lookupKey) ?? null;

    if (sourceRow) {
      const sourceSummaryKey = sourceRow.source_id;
      const current = sourceSummaries.get(sourceSummaryKey) ?? {
        row: sourceRow,
        jobIds: new Set<string>(),
      };
      current.jobIds.add(job.externalId);
      sourceSummaries.set(sourceSummaryKey, current);
    } else {
      missingSourceJobs.push({
        company: job.companyName,
        provider,
        title: job.title,
      });
    }

    importRows.push({
      sourceRow,
      provider,
      externalId: job.externalId,
      companySlug: job.companySlug,
      companyName: job.companyName,
      title: job.title,
      titleSlug,
      canonicalSlug,
      routePath,
      locationRaw: job.locationRaw,
      city: job.city ?? null,
      citySlug: job.city ? slugify(job.city) : null,
      countryCode: job.countryCode ?? null,
      remoteMode: job.remoteMode ?? null,
      employmentType: job.employmentType ?? null,
      languageHint: (job.languageHint ?? "unknown") as LanguageHint,
      dutchRequired: job.dutchRequired ?? null,
      visaHint: job.visaHint ?? null,
      roleFamily: (job.roleFamily ?? "unknown") as JobRoleFamily,
      seniority: (job.seniority ?? "unknown") as JobSeniority,
      isNlRelevant: isNlRelevant(job.countryCode ?? null, clusterTags, job.locationRaw),
      isEnglishFriendly: isEnglishFriendly(job.languageHint, clusterTags, job.dutchRequired),
      isWithoutDutch: isWithoutDutch(clusterTags, job.dutchRequired),
      descriptionText: job.descriptionText,
      excerpt: makeExcerpt(job.descriptionText),
      applyUrl: job.applyUrl,
      sourceUrl: job.sourceUrl,
      postedAt: toDateOrNull(job.postedAt),
      keywords: job.keywords ?? [],
      clusterTags,
    });
  }

  if (dryRun) {
    console.log("Dry run: jobs import preview");
    console.table([
      {
        verified_sources: fetchableSources.length,
        page_payloads: pages.length,
        import_rows: importRows.length,
        matched_sources: sourceSummaries.size,
        missing_source_jobs: missingSourceJobs.length,
      },
    ]);
    console.table(
      importRows.slice(0, 10).map((row) => ({
        company: row.companyName,
        title: row.title,
        route: row.routePath,
        english: row.isEnglishFriendly,
        without_dutch: row.isWithoutDutch,
        visa: row.visaHint ?? false,
      }))
    );
    if (missingSourceJobs.length > 0) {
      console.log("Jobs without a matching source row:");
      console.table(missingSourceJobs.slice(0, 10));
    }
    return;
  }

  const now = new Date();
  const sourceIdByKey = new Map<string, string>();
  let createdSources = 0;
  let updatedSources = 0;

  for (const row of fetchableSources) {
    const existing = await prisma.jobSource.findUnique({
      where: { slug: row.source_id },
      select: { id: true },
    });

    const source = await prisma.jobSource.upsert({
      where: { slug: row.source_id },
      create: {
        slug: row.source_id,
        companyName: row.company_name,
        companySlug: slugify(row.source_id),
        segment: toNullableString(row.segment),
        city: toNullableString(row.city),
        countryCode: "NL",
        englishFit: row.english_fit as "high" | "medium" | "low",
        providerHint: toNullableString(row.provider_hint),
        provider: row.provider as SupportedJobProvider,
        sourceKey: toNullableString(row.source_key),
        apiUrl: toNullableString(row.api_url),
        careersUrl: row.careers_url,
        status: row.status as "research" | "pilot" | "verified" | "paused",
        priority: priorityToNumber(row.priority),
        notes: toNullableString(row.notes),
        lastFetchedAt: now,
        lastSuccessfulFetchAt: now,
      },
      update: {
        companyName: row.company_name,
        companySlug: slugify(row.source_id),
        segment: toNullableString(row.segment),
        city: toNullableString(row.city),
        countryCode: "NL",
        englishFit: row.english_fit as "high" | "medium" | "low",
        providerHint: toNullableString(row.provider_hint),
        provider: row.provider as SupportedJobProvider,
        sourceKey: toNullableString(row.source_key),
        apiUrl: toNullableString(row.api_url),
        careersUrl: row.careers_url,
        status: row.status as "research" | "pilot" | "verified" | "paused",
        priority: priorityToNumber(row.priority),
        notes: toNullableString(row.notes),
        isActive: true,
        lastFetchedAt: now,
        lastSuccessfulFetchAt: now,
        lastError: null,
      },
      select: { id: true },
    });

    sourceLookupKeys(row).forEach((key) => sourceIdByKey.set(key, source.id));

    if (existing) {
      updatedSources += 1;
    } else {
      createdSources += 1;
    }
  }

  let createdJobs = 0;
  let updatedJobs = 0;

  for (const row of importRows) {
    const sourceId = row.sourceRow ? sourceIdByKey.get(`${row.provider}:${row.companySlug}`) ?? null : null;
    const existing = await prisma.job.findUnique({
      where: {
        provider_externalId: {
          provider: row.provider,
          externalId: row.externalId,
        },
      },
      select: { id: true, routePath: true, canonicalSlug: true },
    });

    await prisma.job.upsert({
      where: {
        provider_externalId: {
          provider: row.provider,
          externalId: row.externalId,
        },
      },
      create: {
        sourceId,
        provider: row.provider,
        externalId: row.externalId,
        companyName: row.companyName,
        companySlug: row.companySlug,
        title: row.title,
        titleSlug: row.titleSlug,
        canonicalSlug: existing?.canonicalSlug || row.canonicalSlug,
        routePath: existing?.routePath || row.routePath,
        locationRaw: row.locationRaw,
        city: row.city,
        citySlug: row.citySlug,
        countryCode: row.countryCode,
        remoteMode: row.remoteMode,
        employmentType: row.employmentType,
        languageHint: row.languageHint,
        dutchRequired: row.dutchRequired,
        visaHint: row.visaHint,
        roleFamily: row.roleFamily,
        seniority: row.seniority,
        isNlRelevant: row.isNlRelevant,
        isEnglishFriendly: row.isEnglishFriendly,
        isWithoutDutch: row.isWithoutDutch,
        status: "active",
        descriptionText: row.descriptionText,
        excerpt: row.excerpt,
        applyUrl: row.applyUrl,
        sourceUrl: row.sourceUrl,
        postedAt: row.postedAt,
        lastSeenAt: now,
        expiresAt: null,
        keywords: row.keywords,
        clusterTags: row.clusterTags,
      },
      update: {
        sourceId,
        companyName: row.companyName,
        companySlug: row.companySlug,
        title: row.title,
        titleSlug: row.titleSlug,
        canonicalSlug: existing?.canonicalSlug || row.canonicalSlug,
        routePath: existing?.routePath || row.routePath,
        locationRaw: row.locationRaw,
        city: row.city,
        citySlug: row.citySlug,
        countryCode: row.countryCode,
        remoteMode: row.remoteMode,
        employmentType: row.employmentType,
        languageHint: row.languageHint,
        dutchRequired: row.dutchRequired,
        visaHint: row.visaHint,
        roleFamily: row.roleFamily,
        seniority: row.seniority,
        isNlRelevant: row.isNlRelevant,
        isEnglishFriendly: row.isEnglishFriendly,
        isWithoutDutch: row.isWithoutDutch,
        status: "active",
        descriptionText: row.descriptionText,
        excerpt: row.excerpt,
        applyUrl: row.applyUrl,
        sourceUrl: row.sourceUrl,
        postedAt: row.postedAt,
        lastSeenAt: now,
        expiresAt: null,
        keywords: row.keywords,
        clusterTags: row.clusterTags,
      },
    });

    if (existing) {
      updatedJobs += 1;
    } else {
      createdJobs += 1;
    }
  }

  let expiredJobs = 0;
  for (const summary of sourceSummaries.values()) {
    const sourceId = sourceIdByKey.get(`${summary.row.provider as SupportedJobProvider}:${slugify(summary.row.source_id)}`);
    if (!sourceId) continue;

    const result = await prisma.job.updateMany({
      where: {
        sourceId,
        status: "active",
        externalId: { notIn: [...summary.jobIds] },
      },
      data: {
        status: "expired",
        expiresAt: now,
      },
    });

    expiredJobs += result.count;
  }

  console.log("Imported jobs into Postgres.");
  console.table([
    {
      created_sources: createdSources,
      updated_sources: updatedSources,
      created_jobs: createdJobs,
      updated_jobs: updatedJobs,
      expired_jobs: expiredJobs,
      imported_pages: importRows.length,
      missing_source_jobs: missingSourceJobs.length,
    },
  ]);
}

main()
  .catch((error) => {
    console.error("Failed to import jobs into Postgres.");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

