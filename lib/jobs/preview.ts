import { readFile } from "fs/promises";
import path from "path";
import type { JobPagePayload } from "@/lib/jobs/types";

type JobPagesPayload = {
  generatedAt: string;
  pages: JobPagePayload[];
};

type JobsClusterPayload = {
  generatedAt?: string;
  updatedAt?: string;
  jobs: Array<{ companyName: string }>;
};

export type JobsPreviewData = {
  generatedAt: string | null;
  englishJobCount: number;
  pageCount: number;
  pages: JobPagePayload[];
  companies: string[];
};

function safeParse<T>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function loadJobsPreview(): Promise<JobsPreviewData> {
  const derivedDir = path.join(process.cwd(), "data", "jobs", "derived");
  const jobPagesPath = path.join(derivedDir, "job-pages.json");
  const englishJobsPath = path.join(derivedDir, "english-speaking-jobs-netherlands.json");

  try {
    const [jobPagesRaw, englishJobsRaw] = await Promise.all([
      readFile(jobPagesPath, "utf-8"),
      readFile(englishJobsPath, "utf-8"),
    ]);

    const jobPagesPayload = safeParse<JobPagesPayload>(jobPagesRaw);
    const englishJobsPayload = safeParse<JobsClusterPayload>(englishJobsRaw);

    const pages = [...(jobPagesPayload?.pages ?? [])].sort((a, b) => {
      const companyCompare = a.normalizedJob.companyName.localeCompare(b.normalizedJob.companyName);
      if (companyCompare !== 0) return companyCompare;
      return a.normalizedJob.title.localeCompare(b.normalizedJob.title);
    });

    const companies = Array.from(new Set(pages.map((page) => page.normalizedJob.companyName))).sort();

    return {
      generatedAt: jobPagesPayload?.generatedAt ?? englishJobsPayload?.updatedAt ?? null,
      englishJobCount: englishJobsPayload?.jobs.length ?? 0,
      pageCount: pages.length,
      pages,
      companies,
    };
  } catch {
    return {
      generatedAt: null,
      englishJobCount: 0,
      pageCount: 0,
      pages: [],
      companies: [],
    };
  }
}

export function descriptionExcerpt(text: string, maxLength = 220): string {
  const collapsed = text.replace(/\s+/g, " ").trim();
  if (!collapsed) {
    return "Geen beschrijving beschikbaar in de preview-export.";
  }
  if (collapsed.length <= maxLength) {
    return collapsed;
  }
  return `${collapsed.slice(0, maxLength).trimEnd()}...`;
}
