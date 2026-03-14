export type JobSourceStatus = "research" | "pilot" | "verified";
export type JobProvider = "greenhouse" | "lever" | "ashby" | "workable" | "unknown";
export type EnglishFit = "high" | "medium" | "low";
export type RemoteMode = "remote" | "hybrid" | "onsite";
export type LanguageHint = "english" | "dutch" | "mixed" | "unknown";

export interface JobSource {
  sourceId: string;
  status: JobSourceStatus;
  priority: string;
  companyName: string;
  city: string;
  segment: string;
  englishFit: EnglishFit;
  providerHint: string;
  provider: JobProvider;
  sourceKey: string;
  apiUrl: string;
  careersUrl: string;
  notes: string;
}

export interface NormalizedJob {
  provider: Exclude<JobProvider, "unknown">;
  externalId: string;
  companySlug: string;
  companyName: string;
  title: string;
  locationRaw: string;
  city?: string;
  countryCode?: string;
  remoteMode?: RemoteMode;
  employmentType?: string;
  languageHint?: LanguageHint;
  dutchRequired?: boolean | null;
  visaHint?: boolean | null;
  descriptionText: string;
  applyUrl: string;
  postedAt?: string;
  sourceUrl: string;
  keywords: string[];
  clusterTags: string[];
}

export interface JobsClusterPayload {
  clusterKey: string;
  title: string;
  description: string;
  jobs: NormalizedJob[];
  updatedAt: string;
}

export interface JobPagePayload {
  slug: string;
  jobPath: string;
  normalizedJob: NormalizedJob;
  relatedClusters: string[];
  primaryCtaHref: string;
  primaryCtaLabel: string;
}
