export type JobSourceStatus = "research" | "pilot" | "verified";
export type JobProvider = "greenhouse" | "lever" | "ashby" | "workable" | "unknown";
export type EnglishFit = "high" | "medium" | "low";
export type RemoteMode = "remote" | "hybrid" | "onsite";
export type LanguageHint = "english" | "dutch" | "mixed" | "unknown";
export type JobRoleFamily =
  | "engineering"
  | "data"
  | "product_design"
  | "sales"
  | "marketing"
  | "customer_support"
  | "customer_success"
  | "operations"
  | "finance_accounting"
  | "hr_people"
  | "legal_compliance"
  | "admin_office"
  | "logistics_supply_chain"
  | "general_business"
  | "unknown";
export type JobSeniority =
  | "internship"
  | "graduate"
  | "junior"
  | "mid"
  | "senior"
  | "lead"
  | "manager"
  | "director"
  | "executive"
  | "unknown";
export type JobRecordStatus = "active" | "expired" | "hidden";
export type JobListingKind =
  | "english_speaking_nl"
  | "without_dutch"
  | "visa_sponsorship"
  | "english_speaking_city"
  | "without_dutch_city"
  | "role_family_nl"
  | "starter_nl";

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
  roleFamily?: JobRoleFamily;
  seniority?: JobSeniority;
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

export interface JobListingFilter {
  countryCode?: string;
  citySlug?: string;
  isNlRelevant?: boolean;
  isEnglishFriendly?: boolean;
  isWithoutDutch?: boolean;
  visaHint?: boolean;
  languageHints?: LanguageHint[];
  remoteModes?: RemoteMode[];
  roleFamilies?: JobRoleFamily[];
  seniorities?: JobSeniority[];
  clusterTagsAny?: string[];
}

export interface JobListingPageSeed {
  slug: string;
  path: string;
  locale: "nl" | "en";
  kind: JobListingKind;
  title: string;
  heroTitle: string;
  description: string;
  metaTitle: string;
  metaDesc: string;
  introText: string;
  filters: JobListingFilter;
  minJobCount: number;
  minCompanyCount: number;
  primaryCtaHref: string;
  primaryCtaLabel: string;
  relatedGuideHref?: string;
}
