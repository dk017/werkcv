export type AgencyAnalyticsEventInput = {
  id: string;
  event: string;
  path?: string | null;
  properties?: unknown;
  createdAt: Date;
};

export type AgencyCandidateReviewMetricInput = {
  invitedAt?: Date | null;
  respondedAt?: Date | null;
  status: string;
  overriddenAt?: Date | null;
};

export type AgencyMatchPackMetricInput = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  claimVerificationData?: unknown;
  approvedAt?: Date | null;
  firstExportedAt?: Date | null;
  correctionsCount: number;
  unsupportedClaimsCaught: number;
  clientOutcome: string;
  clientOutcomeRecordedAt?: Date | null;
  candidateReviews: AgencyCandidateReviewMetricInput[];
};

export type AgencyProductActorInput = {
  userId: string;
  email: string;
  excludeFromProductMetrics: boolean;
  subscriptionCreatedAt: Date;
  checkoutSessionId?: string | null;
  status: string;
  paidAt?: Date | null;
  matchPacks: AgencyMatchPackMetricInput[];
};

export type AgencyValidationStageKey =
  | "qualified_organic_session"
  | "verifier_viewed"
  | "verifier_started"
  | "verifier_completed"
  | "methodology_viewed"
  | "matchpack_cta_selected"
  | "agency_login_completed"
  | "agency_checkout_created"
  | "agency_paid"
  | "first_analysis"
  | "claim_review_completed"
  | "candidate_acknowledged_or_overridden"
  | "matchpack_approved"
  | "first_export"
  | "repeat_matchpack"
  | "client_outcome_recorded";

export type AgencyValidationStage = {
  key: AgencyValidationStageKey;
  label: string;
  count: number;
  namespace: "visitor" | "user";
  previousComparableCount: number | null;
  conversionRate: number | null;
};

export type AgencyValidationBreakdown = {
  dimension: "locale" | "source" | "landing" | "device" | "visitor_status";
  segment: string;
  qualifiedSessions: number;
  verifierCompletions: number;
};

export type AgencyValidationReport = {
  generatedAt: Date;
  since: Date;
  until: Date;
  timezone: "UTC";
  stages: AgencyValidationStage[];
  breakdowns: AgencyValidationBreakdown[];
  outcomes: {
    externalPaidSubscriptions: number;
    approvedOrExportedMatchPacks: number;
    repeatUsersWithin30Days: number;
    unsupportedClaimsCaught: number;
    recruiterCorrections: number;
    clientOutcomesRecorded: number;
    medianUploadToExportMinutes: number | null;
    medianInvitationToResponseHours: number | null;
    candidateDeclines: number;
    candidateOverrides: number;
  };
  sampleSizes: {
    qualifiedOrganicSessions: number;
    completedVerifierRuns: number;
    timingMatchPacks: number;
    respondedCandidateReviews: number;
  };
};

const STAGE_LABELS: Record<AgencyValidationStageKey, string> = {
  qualified_organic_session: "Qualified organic sessions",
  verifier_viewed: "Verifier viewed",
  verifier_started: "Verifier started",
  verifier_completed: "Verifier completed",
  methodology_viewed: "Methodology viewed",
  matchpack_cta_selected: "MatchPack CTA selected",
  agency_login_completed: "Agency login completed",
  agency_checkout_created: "Agency checkout created",
  agency_paid: "Paid Agency subscription",
  first_analysis: "First MatchPack analysis",
  claim_review_completed: "Claim review completed",
  candidate_acknowledged_or_overridden: "Candidate acknowledged or permitted override",
  matchpack_approved: "MatchPack approved",
  first_export: "First approved export",
  repeat_matchpack: "Second MatchPack within 30 days",
  client_outcome_recorded: "Client outcome recorded",
};

const PRODUCT_STAGE_KEYS = new Set<AgencyValidationStageKey>([
  "agency_checkout_created",
  "agency_paid",
  "first_analysis",
  "claim_review_completed",
  "candidate_acknowledged_or_overridden",
  "matchpack_approved",
  "first_export",
  "repeat_matchpack",
  "client_outcome_recorded",
]);

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function pathname(value: string | null | undefined): string {
  if (!value) return "/";
  try {
    return new URL(value, "https://werkcv.nl").pathname.replace(/\/+$/, "") || "/";
  } catch {
    return value.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";
  }
}

export function isMatchPackAcquisitionPath(value: string | null | undefined): boolean {
  const path = pathname(value);
  return path === "/agency"
    || path === "/en/agency"
    || path === "/tools/kandidaatvoorstel-checker"
    || path === "/en/candidate-proposal-checker"
    || path.startsWith("/voor-bureaus")
    || path.startsWith("/en/agency/methodology");
}

export function isExcludedAgencyEmail(
  email: string,
  options: { explicitlyExcluded?: boolean; configuredEmails?: readonly string[] } = {},
): boolean {
  if (options.explicitlyExcluded) return true;
  const normalized = email.trim().toLowerCase();
  if (!normalized || !normalized.includes("@")) return true;
  if (options.configuredEmails?.some((item) => item.trim().toLowerCase() === normalized)) return true;

  const [local, domain] = normalized.split("@", 2);
  if (domain === "werkcv.nl") return true;
  if (["example.com", "example.org", "example.net", "test.com", "yopmail.com"].includes(domain)) return true;
  if (local.includes("+test") || /^(test|fixture|smoke|synthetic)([+._-]|$)/.test(local)) return true;
  return false;
}

export function isExcludedAgencyAnalyticsEvent(event: AgencyAnalyticsEventInput): boolean {
  const properties = record(event.properties);
  const device = text(properties.deviceType).toLowerCase();
  const browser = text(properties.browserName).toLowerCase();
  const visitorId = text(properties.visitorId).toLowerCase();
  const sessionId = text(properties.sessionId).toLowerCase();
  const path = pathname(event.path);
  return device === "bot"
    || browser === "bot"
    || /^(bot|smoke|fixture|synthetic|test)[-_:]/.test(visitorId)
    || /^(bot|smoke|fixture|synthetic|test)[-_:]/.test(sessionId)
    || path.startsWith("/api/")
    || path === "/health"
    || path === "/api/health";
}

function eventIdentity(event: AgencyAnalyticsEventInput): string {
  const properties = record(event.properties);
  return text(properties.visitorId) || text(properties.sessionId) || `event:${event.id}`;
}

function eventLocale(event: AgencyAnalyticsEventInput): string {
  const properties = record(event.properties);
  const locale = text(properties.locale);
  if (locale === "nl" || locale === "en") return locale;
  return pathname(event.path).startsWith("/en") ? "en" : "nl";
}

function eventSource(event: AgencyAnalyticsEventInput): string {
  const properties = record(event.properties);
  return text(properties.sourceLabel) || text(properties.sourceType) || "Unknown";
}

function eventDevice(event: AgencyAnalyticsEventInput): string {
  return text(record(event.properties).deviceType) || "unknown";
}

function eventVisitorStatus(event: AgencyAnalyticsEventInput): string {
  const visitNumber = Number(record(event.properties).visitNumber);
  if (!Number.isFinite(visitNumber) || visitNumber < 1) return "unknown";
  return visitNumber === 1 ? "new" : "returning";
}

function isQualifiedOrganicEvent(event: AgencyAnalyticsEventInput): boolean {
  if (event.event !== "page_view" || !isMatchPackAcquisitionPath(event.path)) return false;
  const sourceType = text(record(event.properties).sourceType).toLowerCase();
  return sourceType === "search" || sourceType === "ai";
}

function hasAgencyNextPath(event: AgencyAnalyticsEventInput): boolean {
  const nextPath = text(record(event.properties).nextPath);
  return nextPath === "/agency/account" || nextPath.startsWith("/agency/account/");
}

function uniqueEventIdentities(events: AgencyAnalyticsEventInput[], predicate: (event: AgencyAnalyticsEventInput) => boolean): Set<string> {
  return new Set(events.filter(predicate).map(eventIdentity));
}

function median(values: number[]): number | null {
  const finite = values.filter((value) => Number.isFinite(value) && value >= 0).sort((a, b) => a - b);
  if (!finite.length) return null;
  const middle = Math.floor(finite.length / 2);
  return finite.length % 2 ? finite[middle] : (finite[middle - 1] + finite[middle]) / 2;
}

function hoursBetween(from: Date, to: Date): number {
  return (to.getTime() - from.getTime()) / 3_600_000;
}

function addBreakdown(
  map: Map<string, { dimension: AgencyValidationBreakdown["dimension"]; segment: string; qualified: Set<string>; completed: Set<string> }>,
  dimension: AgencyValidationBreakdown["dimension"],
  segment: string,
  kind: "qualified" | "completed",
  identity: string,
) {
  const safeSegment = segment || "unknown";
  const key = `${dimension}:${safeSegment}`;
  const row = map.get(key) || { dimension, segment: safeSegment, qualified: new Set<string>(), completed: new Set<string>() };
  row[kind].add(identity);
  map.set(key, row);
}

export function buildAgencyValidationReport({
  events,
  actors,
  since,
  until,
  configuredExcludedEmails = [],
}: {
  events: AgencyAnalyticsEventInput[];
  actors: AgencyProductActorInput[];
  since: Date;
  until: Date;
  configuredExcludedEmails?: readonly string[];
}): AgencyValidationReport {
  const cleanEvents = events.filter((event) => event.createdAt >= since
    && event.createdAt < until
    && !isExcludedAgencyAnalyticsEvent(event));
  const cleanActors = actors.filter((actor) => !isExcludedAgencyEmail(actor.email, {
    explicitlyExcluded: actor.excludeFromProductMetrics,
    configuredEmails: configuredExcludedEmails,
  }));

  const eventStages = new Map<AgencyValidationStageKey, Set<string>>([
    ["qualified_organic_session", uniqueEventIdentities(cleanEvents, isQualifiedOrganicEvent)],
    ["verifier_viewed", uniqueEventIdentities(cleanEvents, (event) => event.event === "proposal_claim_verifier_viewed")],
    ["verifier_started", uniqueEventIdentities(cleanEvents, (event) => event.event === "proposal_claim_verifier_started")],
    ["verifier_completed", uniqueEventIdentities(cleanEvents, (event) => event.event === "proposal_claim_verifier_completed")],
    ["methodology_viewed", uniqueEventIdentities(cleanEvents, (event) => event.event === "page_view" && pathname(event.path).includes("/methodology/claim-evidence-benchmark") || event.event === "proposal_claim_methodology_clicked")],
    ["matchpack_cta_selected", uniqueEventIdentities(cleanEvents, (event) => event.event === "proposal_claim_verifier_cta_clicked")],
    ["agency_login_completed", uniqueEventIdentities(cleanEvents, (event) => event.event === "login_verified" && hasAgencyNextPath(event))],
  ]);

  const productStages = new Map<AgencyValidationStageKey, Set<string>>();
  for (const key of PRODUCT_STAGE_KEYS) productStages.set(key, new Set<string>());

  const uploadToExportMinutes: number[] = [];
  const invitationToResponseHours: number[] = [];
  let unsupportedClaimsCaught = 0;
  let recruiterCorrections = 0;
  let candidateDeclines = 0;
  let candidateOverrides = 0;
  let approvedOrExportedMatchPacks = 0;
  let clientOutcomesRecorded = 0;

  for (const actor of cleanActors) {
    const withinRange = (value?: Date | null) => Boolean(value && value >= since && value < until);
    if (actor.checkoutSessionId && withinRange(actor.subscriptionCreatedAt)) productStages.get("agency_checkout_created")?.add(actor.userId);
    if (withinRange(actor.paidAt)) productStages.get("agency_paid")?.add(actor.userId);

    const sortedPacks = [...actor.matchPacks].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    if (sortedPacks.some((pack) => withinRange(pack.createdAt))) productStages.get("first_analysis")?.add(actor.userId);
    if (sortedPacks.some((pack) => pack.claimVerificationData != null && withinRange(pack.updatedAt))) productStages.get("claim_review_completed")?.add(actor.userId);
    if (sortedPacks.some((pack) => pack.candidateReviews.some((review) =>
      (review.status === "confirmed" && withinRange(review.respondedAt)) || withinRange(review.overriddenAt)))) {
      productStages.get("candidate_acknowledged_or_overridden")?.add(actor.userId);
    }
    if (sortedPacks.some((pack) => withinRange(pack.approvedAt))) productStages.get("matchpack_approved")?.add(actor.userId);
    if (sortedPacks.some((pack) => withinRange(pack.firstExportedAt))) productStages.get("first_export")?.add(actor.userId);
    if (sortedPacks.some((pack, index) => index > 0 && withinRange(pack.createdAt) && pack.createdAt.getTime() - sortedPacks[index - 1].createdAt.getTime() <= 30 * 86_400_000)) {
      productStages.get("repeat_matchpack")?.add(actor.userId);
    }
    if (sortedPacks.some((pack) => pack.clientOutcome !== "unknown" && withinRange(pack.clientOutcomeRecordedAt || pack.updatedAt))) productStages.get("client_outcome_recorded")?.add(actor.userId);

    for (const pack of sortedPacks) {
      if (withinRange(pack.updatedAt)) {
        unsupportedClaimsCaught += pack.unsupportedClaimsCaught;
        recruiterCorrections += pack.correctionsCount;
      }
      if (withinRange(pack.approvedAt) || withinRange(pack.firstExportedAt)) approvedOrExportedMatchPacks += 1;
      if (pack.clientOutcome !== "unknown" && withinRange(pack.clientOutcomeRecordedAt || pack.updatedAt)) clientOutcomesRecorded += 1;
      if (pack.firstExportedAt && withinRange(pack.firstExportedAt)) uploadToExportMinutes.push(hoursBetween(pack.createdAt, pack.firstExportedAt) * 60);
      for (const review of pack.candidateReviews) {
        if (review.status === "declined" && withinRange(review.respondedAt)) candidateDeclines += 1;
        if (withinRange(review.overriddenAt)) candidateOverrides += 1;
        if (review.invitedAt && review.respondedAt && withinRange(review.respondedAt)) invitationToResponseHours.push(hoursBetween(review.invitedAt, review.respondedAt));
      }
    }
  }

  const orderedKeys: AgencyValidationStageKey[] = [
    "qualified_organic_session", "verifier_viewed", "verifier_started", "verifier_completed",
    "methodology_viewed", "matchpack_cta_selected", "agency_login_completed", "agency_checkout_created",
    "agency_paid", "first_analysis", "claim_review_completed", "candidate_acknowledged_or_overridden",
    "matchpack_approved", "first_export", "repeat_matchpack", "client_outcome_recorded",
  ];

  const stages: AgencyValidationStage[] = orderedKeys.map((key, index) => {
    const namespace = PRODUCT_STAGE_KEYS.has(key) ? "user" : "visitor";
    const count = (eventStages.get(key) || productStages.get(key) || new Set()).size;
    const priorKey = orderedKeys[index - 1];
    const priorNamespace = priorKey ? (PRODUCT_STAGE_KEYS.has(priorKey) ? "user" : "visitor") : null;
    const previousComparableCount = priorKey && priorNamespace === namespace
      ? (eventStages.get(priorKey) || productStages.get(priorKey) || new Set()).size
      : null;
    return {
      key,
      label: STAGE_LABELS[key],
      count,
      namespace,
      previousComparableCount,
      conversionRate: previousComparableCount && previousComparableCount > 0 ? count / previousComparableCount : null,
    };
  });

  const breakdownMap = new Map<string, { dimension: AgencyValidationBreakdown["dimension"]; segment: string; qualified: Set<string>; completed: Set<string> }>();
  for (const event of cleanEvents) {
    const identity = eventIdentity(event);
    const kind = isQualifiedOrganicEvent(event) ? "qualified" : event.event === "proposal_claim_verifier_completed" ? "completed" : null;
    if (!kind) continue;
    addBreakdown(breakdownMap, "locale", eventLocale(event), kind, identity);
    addBreakdown(breakdownMap, "source", eventSource(event), kind, identity);
    addBreakdown(breakdownMap, "landing", pathname(event.path), kind, identity);
    addBreakdown(breakdownMap, "device", eventDevice(event), kind, identity);
    addBreakdown(breakdownMap, "visitor_status", eventVisitorStatus(event), kind, identity);
  }

  const breakdowns = [...breakdownMap.values()]
    .map((row) => ({
      dimension: row.dimension,
      segment: row.segment,
      qualifiedSessions: row.qualified.size,
      verifierCompletions: row.completed.size,
    }))
    .sort((a, b) => a.dimension.localeCompare(b.dimension) || b.qualifiedSessions - a.qualifiedSessions || a.segment.localeCompare(b.segment));

  return {
    generatedAt: new Date(),
    since,
    until,
    timezone: "UTC",
    stages,
    breakdowns,
    outcomes: {
      externalPaidSubscriptions: productStages.get("agency_paid")?.size || 0,
      approvedOrExportedMatchPacks,
      repeatUsersWithin30Days: productStages.get("repeat_matchpack")?.size || 0,
      unsupportedClaimsCaught,
      recruiterCorrections,
      clientOutcomesRecorded,
      medianUploadToExportMinutes: median(uploadToExportMinutes),
      medianInvitationToResponseHours: median(invitationToResponseHours),
      candidateDeclines,
      candidateOverrides,
    },
    sampleSizes: {
      qualifiedOrganicSessions: eventStages.get("qualified_organic_session")?.size || 0,
      completedVerifierRuns: eventStages.get("verifier_completed")?.size || 0,
      timingMatchPacks: uploadToExportMinutes.length,
      respondedCandidateReviews: invitationToResponseHours.length,
    },
  };
}
