import { agencyAcquisitionRoutes, getAgencyAcquisitionRoute } from "@/lib/agency-acquisition";

export type AgencyAnalyticsEventInput = {
  id: string;
  event: string;
  path?: string | null;
  properties?: unknown;
  attribution?: unknown;
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
  sourcePath?: string | null;
  sourceLocale?: string | null;
  attribution?: unknown;
  subscriptionMetadata?: unknown;
  paidAt?: Date | null;
  matchPacks: AgencyMatchPackMetricInput[];
};

export type AgencyValidationStageKey =
  | "qualified_organic_session"
  | "guide_viewed"
  | "example_viewed"
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

export type AgencyRouteAcquisitionBreakdown = {
  routeId: string;
  path: string;
  intent: string;
  locale: "nl" | "en" | "mixed";
  qualifiedSessions: number;
  engagedSessions: number;
  guideViews: number;
  exampleViews: number;
  exampleDownloads: number;
  matrixDocxDownloads: number;
  matrixCsvDownloads: number;
  checkerViews: number;
  checkerStarts: number;
  checkerCompletions: number;
  matchpackCtaUsers: number;
  agencyLoginUsers: number;
  checkoutUsers: number;
  paidUsers: number;
  firstAnalysisUsers: number;
  firstExportUsers: number;
  repeatUseUsers: number;
  sourceBreakdown: Record<string, number>;
  productAttributionCoverage: "attributed" | "not_attributed" | "aggregate";
};

export type AgencyValidationReport = {
  generatedAt: Date;
  since: Date;
  until: Date;
  timezone: "UTC";
  stages: AgencyValidationStage[];
  breakdowns: AgencyValidationBreakdown[];
  routeBreakdowns: AgencyRouteAcquisitionBreakdown[];
  outcomes: {
    externalPaidSubscriptions: number;
    matrixDownloads: { docx: number; csv: number };
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
  guide_viewed: "Agency guide viewed",
  example_viewed: "Fictional example viewed",
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

function routeIdForPath(value: string | null | undefined): string | null {
  const route = getAgencyAcquisitionRoute(pathname(value));
  return route?.id || null;
}

function routeIdForEvent(event: AgencyAnalyticsEventInput): string | null {
  const direct = routeIdForPath(event.path);
  if (direct) return direct;
  const registeredRouteId = text(record(event.properties).route_id);
  if (agencyAcquisitionRoutes.some((route) => route.id === registeredRouteId)) return registeredRouteId;
  const attributedPath = text(record(event.attribution).firstTouchPath);
  return routeIdForPath(attributedPath);
}

function routeIdForActor(actor: AgencyProductActorInput): string | null {
  const metadata = record(actor.subscriptionMetadata);
  const metadataRouteId = text(metadata.agency_route_id);
  if (agencyAcquisitionRoutes.some((route) => route.id === metadataRouteId)) return metadataRouteId;

  const attributedPath = text(record(actor.attribution).firstTouchPath);
  return routeIdForPath(attributedPath) || routeIdForPath(actor.sourcePath);
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

function isVerifierEvent(event: AgencyAnalyticsEventInput, suffix: "viewed" | "started" | "completed"): boolean {
  return event.event === `proposal_claim_verifier_${suffix}` || event.event === `agency_evidence_checker_${suffix}`;
}

function isVerifierCompletion(event: AgencyAnalyticsEventInput): boolean {
  return isVerifierEvent(event, "completed");
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

type AgencyRouteMetricKey =
  | "qualifiedSessions"
  | "engagedSessions"
  | "guideViews"
  | "exampleViews"
  | "exampleDownloads"
  | "matrixDocxDownloads"
  | "matrixCsvDownloads"
  | "checkerViews"
  | "checkerStarts"
  | "checkerCompletions"
  | "matchpackCtaUsers"
  | "agencyLoginUsers"
  | "checkoutUsers"
  | "paidUsers"
  | "firstAnalysisUsers"
  | "firstExportUsers"
  | "repeatUseUsers";

type AgencyRouteMetricAccumulator = {
  sets: Record<AgencyRouteMetricKey, Set<string>>;
  sourceSets: Map<string, Set<string>>;
  productAttribution: boolean;
};

const ROUTE_METRIC_KEYS: readonly AgencyRouteMetricKey[] = [
  "qualifiedSessions",
  "engagedSessions",
  "guideViews",
  "exampleViews",
  "exampleDownloads",
  "matrixDocxDownloads",
  "matrixCsvDownloads",
  "checkerViews",
  "checkerStarts",
  "checkerCompletions",
  "matchpackCtaUsers",
  "agencyLoginUsers",
  "checkoutUsers",
  "paidUsers",
  "firstAnalysisUsers",
  "firstExportUsers",
  "repeatUseUsers",
];

function createRouteMetricAccumulator(): AgencyRouteMetricAccumulator {
  return {
    sets: Object.fromEntries(ROUTE_METRIC_KEYS.map((key) => [key, new Set<string>()])) as Record<AgencyRouteMetricKey, Set<string>>,
    sourceSets: new Map<string, Set<string>>(),
    productAttribution: false,
  };
}

function addRouteMetricEvent(accumulator: AgencyRouteMetricAccumulator, event: AgencyAnalyticsEventInput, identity: string): void {
  const set = (key: AgencyRouteMetricKey) => accumulator.sets[key].add(identity);
  const eventName = event.event;
  const isCheckerViewed = isVerifierEvent(event, "viewed");
  const isCheckerStarted = isVerifierEvent(event, "started");
  const isCheckerCompleted = isVerifierEvent(event, "completed");
  const isContentEngagement = eventName === "agency_content_cta_clicked"
    || eventName === "agency_hub_viewed"
    || eventName === "agency_guide_index_viewed"
    || eventName === "agency_guide_viewed"
    || eventName === "agency_public_sector_guide_viewed"
    || eventName === "agency_example_viewed"
    || eventName === "agency_evidence_matrix_downloaded"
    || isCheckerViewed
    || eventName === "proposal_claim_methodology_clicked";

  if (isQualifiedOrganicEvent(event)) {
    set("qualifiedSessions");
    const source = eventSource(event);
    const sourceSet = accumulator.sourceSets.get(source) || new Set<string>();
    sourceSet.add(identity);
    accumulator.sourceSets.set(source, sourceSet);
  }
  if (isContentEngagement) set("engagedSessions");
  if (eventName === "agency_guide_viewed" || eventName === "agency_public_sector_guide_viewed") set("guideViews");
  if (eventName === "agency_example_viewed") set("exampleViews");
  if (eventName === "agency_sample_pack_downloaded") set("exampleDownloads");
  if (eventName === "agency_evidence_matrix_downloaded") {
    const format = text(record(event.properties).format);
    if (format === "docx") set("matrixDocxDownloads");
    if (format === "csv") set("matrixCsvDownloads");
  }
  if (isCheckerViewed) set("checkerViews");
  if (isCheckerStarted) set("checkerStarts");
  if (isCheckerCompleted) set("checkerCompletions");
  if (eventName === "agency_content_cta_clicked"
    || eventName === "agency_evidence_checker_cta_clicked"
    || eventName === "proposal_claim_verifier_cta_clicked"
    || eventName === "agency_checkout_cta_clicked") set("matchpackCtaUsers");
  if (eventName === "login_verified" && hasAgencyNextPath(event)) set("agencyLoginUsers");
  if (eventName === "agency_checkout_started") set("checkoutUsers");
}

function addRouteProductMetric(
  accumulator: AgencyRouteMetricAccumulator,
  key: AgencyRouteMetricKey,
  identity: string,
): void {
  accumulator.sets[key].add(identity);
  accumulator.productAttribution = true;
}

function routeMetricRow(
  route: { id: string; path: string; primaryIntent: string; locale: "nl" | "en" },
  accumulator: AgencyRouteMetricAccumulator,
  productAttribution: AgencyRouteAcquisitionBreakdown["productAttributionCoverage"],
): AgencyRouteAcquisitionBreakdown {
  const sourceBreakdown: Record<string, number> = {};
  for (const [source, identities] of accumulator.sourceSets) sourceBreakdown[source] = identities.size;
  return {
    routeId: route.id,
    path: route.path,
    intent: route.primaryIntent,
    locale: route.locale,
    qualifiedSessions: accumulator.sets.qualifiedSessions.size,
    engagedSessions: accumulator.sets.engagedSessions.size,
    guideViews: accumulator.sets.guideViews.size,
    exampleViews: accumulator.sets.exampleViews.size,
    exampleDownloads: accumulator.sets.exampleDownloads.size,
    matrixDocxDownloads: accumulator.sets.matrixDocxDownloads.size,
    matrixCsvDownloads: accumulator.sets.matrixCsvDownloads.size,
    checkerViews: accumulator.sets.checkerViews.size,
    checkerStarts: accumulator.sets.checkerStarts.size,
    checkerCompletions: accumulator.sets.checkerCompletions.size,
    matchpackCtaUsers: accumulator.sets.matchpackCtaUsers.size,
    agencyLoginUsers: accumulator.sets.agencyLoginUsers.size,
    checkoutUsers: accumulator.sets.checkoutUsers.size,
    paidUsers: accumulator.sets.paidUsers.size,
    firstAnalysisUsers: accumulator.sets.firstAnalysisUsers.size,
    firstExportUsers: accumulator.sets.firstExportUsers.size,
    repeatUseUsers: accumulator.sets.repeatUseUsers.size,
    sourceBreakdown,
    productAttributionCoverage: productAttribution,
  };
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

  const aggregateRouteMetrics = createRouteMetricAccumulator();
  const routeMetricMap = new Map<string, AgencyRouteMetricAccumulator>(
    agencyAcquisitionRoutes.map((route) => [route.id, createRouteMetricAccumulator()]),
  );

  for (const event of cleanEvents) {
    const identity = eventIdentity(event);
    addRouteMetricEvent(aggregateRouteMetrics, event, identity);
    const routeId = routeIdForEvent(event);
    if (routeId) addRouteMetricEvent(routeMetricMap.get(routeId)!, event, identity);
  }

  const eventStages = new Map<AgencyValidationStageKey, Set<string>>([
    ["qualified_organic_session", uniqueEventIdentities(cleanEvents, isQualifiedOrganicEvent)],
    ["guide_viewed", uniqueEventIdentities(cleanEvents, (event) => event.event === "agency_guide_viewed" || event.event === "agency_public_sector_guide_viewed")],
    ["example_viewed", uniqueEventIdentities(cleanEvents, (event) => event.event === "agency_example_viewed")],
    ["verifier_viewed", uniqueEventIdentities(cleanEvents, (event) => isVerifierEvent(event, "viewed"))],
    ["verifier_started", uniqueEventIdentities(cleanEvents, (event) => isVerifierEvent(event, "started"))],
    ["verifier_completed", uniqueEventIdentities(cleanEvents, isVerifierCompletion)],
    ["methodology_viewed", uniqueEventIdentities(cleanEvents, (event) => event.event === "page_view" && pathname(event.path).includes("/methodology/claim-evidence-benchmark") || event.event === "proposal_claim_methodology_clicked")],
    ["matchpack_cta_selected", uniqueEventIdentities(cleanEvents, (event) => event.event === "agency_content_cta_clicked"
      || event.event === "agency_checkout_cta_clicked"
      || event.event === "proposal_claim_verifier_cta_clicked"
      || event.event === "agency_evidence_checker_cta_clicked")],
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
  const matrixDownloadSets = { docx: new Set<string>(), csv: new Set<string>() };

  for (const event of cleanEvents) {
    if (event.event !== "agency_evidence_matrix_downloaded") continue;
    const format = text(record(event.properties).format);
    if (format === "docx") matrixDownloadSets.docx.add(eventIdentity(event));
    if (format === "csv") matrixDownloadSets.csv.add(eventIdentity(event));
  }

  for (const actor of cleanActors) {
    const withinRange = (value?: Date | null) => Boolean(value && value >= since && value < until);
    const actorRouteId = routeIdForActor(actor);
    const actorRouteMetrics = actorRouteId ? routeMetricMap.get(actorRouteId) : null;
    const addProduct = (key: AgencyValidationStageKey, routeKey: AgencyRouteMetricKey) => {
      productStages.get(key)?.add(actor.userId);
      addRouteProductMetric(aggregateRouteMetrics, routeKey, actor.userId);
      if (actorRouteMetrics) addRouteProductMetric(actorRouteMetrics, routeKey, actor.userId);
    };
    if (actor.checkoutSessionId && withinRange(actor.subscriptionCreatedAt)) addProduct("agency_checkout_created", "checkoutUsers");
    if (withinRange(actor.paidAt)) addProduct("agency_paid", "paidUsers");

    const sortedPacks = [...actor.matchPacks].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    if (sortedPacks.some((pack) => withinRange(pack.createdAt))) addProduct("first_analysis", "firstAnalysisUsers");
    if (sortedPacks.some((pack) => pack.claimVerificationData != null && withinRange(pack.updatedAt))) productStages.get("claim_review_completed")?.add(actor.userId);
    if (sortedPacks.some((pack) => pack.candidateReviews.some((review) =>
      (review.status === "confirmed" && withinRange(review.respondedAt)) || withinRange(review.overriddenAt)))) {
      productStages.get("candidate_acknowledged_or_overridden")?.add(actor.userId);
    }
    if (sortedPacks.some((pack) => withinRange(pack.approvedAt))) productStages.get("matchpack_approved")?.add(actor.userId);
    if (sortedPacks.some((pack) => withinRange(pack.firstExportedAt))) addProduct("first_export", "firstExportUsers");
    if (sortedPacks.some((pack, index) => index > 0 && withinRange(pack.createdAt) && pack.createdAt.getTime() - sortedPacks[index - 1].createdAt.getTime() <= 30 * 86_400_000)) {
      addProduct("repeat_matchpack", "repeatUseUsers");
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
    "qualified_organic_session", "guide_viewed", "example_viewed", "verifier_viewed", "verifier_started", "verifier_completed",
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
    const kind = isQualifiedOrganicEvent(event) ? "qualified" : isVerifierCompletion(event) ? "completed" : null;
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

  const routeBreakdowns: AgencyRouteAcquisitionBreakdown[] = [
    ...agencyAcquisitionRoutes.map((route) => routeMetricRow(
      route,
      routeMetricMap.get(route.id) || createRouteMetricAccumulator(),
      routeMetricMap.get(route.id)?.productAttribution ? "attributed" : "not_attributed",
    )),
    routeMetricRow(
      { id: "aggregate", path: "*", primaryIntent: "All registered Agency acquisition routes", locale: "nl" },
      aggregateRouteMetrics,
      "aggregate",
    ),
  ].map((row) => row.routeId === "aggregate" ? { ...row, locale: "mixed" as const } : row);

  return {
    generatedAt: new Date(),
    since,
    until,
    timezone: "UTC",
    stages,
    breakdowns,
    routeBreakdowns,
    outcomes: {
      externalPaidSubscriptions: productStages.get("agency_paid")?.size || 0,
      matrixDownloads: { docx: matrixDownloadSets.docx.size, csv: matrixDownloadSets.csv.size },
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
