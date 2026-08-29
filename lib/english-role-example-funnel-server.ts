import { prisma } from "@/lib/prisma";
import { analyticsExcludedEmails } from "@/lib/conversion-funnel";
import {
  ENGLISH_ROLE_EXAMPLE_CLUSTER_SLUGS,
  normalizeEnglishRoleExampleSlug,
  parseEnglishRoleExampleStartSource,
  readEnglishRoleExampleSourceFromPath,
  roleSlugFromEnglishRoleExamplePath,
} from "@/lib/english-role-examples";
import {
  aggregateEnglishRoleExampleFunnel,
  type EnglishRoleExampleFunnelRow,
  type RoleExampleDocument,
  type RoleExampleEvent,
  type RoleExamplePaidOrder,
  type RoleExampleSignup,
} from "@/lib/english-role-example-funnel";

export type EnglishRoleExampleFunnelRange = "7d" | "30d" | "90d";

export type EnglishRoleExampleFunnelReport = {
  range: EnglishRoleExampleFunnelRange;
  since: Date;
  generatedAt: Date;
  rows: EnglishRoleExampleFunnelRow[];
  definitionVersion: "english-role-example-user-funnel-v1";
  dataQuality: {
    legacySourceDocuments: number;
    invalidRoleSourceDocuments: number;
    legacyOrUnattributedStarts: number;
    unattributedSignups: number;
    paidOrdersWithoutRoleSource: number;
    pageEventsMissingVisitorId: number;
    pageEventsMissingSessionId: number;
    conflictingRoleEvents: number;
    warnings: string[];
  };
  limitations: string[];
};

function rangeDays(range: EnglishRoleExampleFunnelRange): number {
  if (range === "7d") return 7;
  if (range === "90d") return 90;
  return 30;
}

function readConfiguredEmails(): string[] {
  const configured = (process.env.ANALYTICS_TEST_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  return [...new Set([...analyticsExcludedEmails(), ...configured])];
}

export async function getEnglishRoleExampleFunnelReport(
  range: EnglishRoleExampleFunnelRange = "30d",
): Promise<EnglishRoleExampleFunnelReport> {
  const since = new Date(Date.now() - rangeDays(range) * 24 * 60 * 60 * 1000);
  const excludedEmails = readConfiguredEmails();

  const sourceDocuments = await prisma.cVDocument.findMany({
    where: {
      createdAt: { gte: since },
      agencySubscriptionId: null,
      user: {
        email: { notIn: excludedEmails, mode: "insensitive" },
        // A consumer CV belonging to an Agency account is still Agency
        // activity for the purposes of this public acquisition report.
        agencySubscription: null,
      },
    },
    select: {
      id: true,
      userId: true,
      startSource: true,
      hasMeaningfulContent: true,
      createdAt: true,
    },
  });

  const documents: RoleExampleDocument[] = sourceDocuments
    .filter((document) => Boolean(parseEnglishRoleExampleStartSource(document.startSource)))
    .map((document) => ({
      id: document.id,
      userId: document.userId,
      startSource: document.startSource,
      meaningful: document.hasMeaningfulContent,
      createdAt: document.createdAt,
    }));
  const [sourceEvents, sourceOrders, signupEvents] = await Promise.all([
    prisma.analyticsEvent.findMany({
      where: {
        createdAt: { gte: since },
        event: {
          in: [
            "page_view",
            "landing_cta_click",
            "start_cv",
            "cv_created",
            "cv_meaningful_content_saved",
            "editor_started",
            "ready_to_download_viewed",
            "full_preview_opened",
            "checkout_start",
            "checkout_started",
            "checkout_completed",
            "pdf_download_started",
            "pdf_download_completed",
          ],
        },
      },
      select: { id: true, cvId: true, event: true, path: true, properties: true, createdAt: true },
    }),
    prisma.order.findMany({
      where: { product: "cv-download", paidAt: { gte: since }, cvId: { not: null } },
      select: { cvId: true, paidAt: true, amountCents: true },
    }),
    prisma.analyticsEvent.findMany({
      where: { event: "signup_completed", createdAt: { gte: since } },
      select: { path: true, properties: true, createdAt: true },
    }),
  ]);

  const excludedVisitorIds = new Set(
    (process.env.ANALYTICS_EXCLUDED_VISITOR_IDS || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  );
  const toProperties = (value: unknown): Record<string, unknown> | null => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    return value as Record<string, unknown>;
  };
  const events: RoleExampleEvent[] = sourceEvents
    .filter((event) => {
      const properties = toProperties(event.properties);
      const visitorId = typeof properties?.visitorId === "string" ? properties.visitorId : null;
      return properties?.sourceLabel !== "codex_test" && (!visitorId || !excludedVisitorIds.has(visitorId));
    })
    .map((event) => ({
      id: event.id,
      cvId: event.cvId,
      event: event.event,
      path: event.path,
      properties: toProperties(event.properties),
      createdAt: event.createdAt,
    }));
  const paidOrders: RoleExamplePaidOrder[] = sourceOrders;
  const signupCandidates: RoleExampleSignup[] = [];
  let unattributedSignups = 0;
  for (const event of signupEvents) {
    const properties = toProperties(event.properties);
    if (properties?.sourceLabel === "codex_test") continue;
    const visitorId = typeof properties?.visitorId === "string" ? properties.visitorId : null;
    if (visitorId && excludedVisitorIds.has(visitorId)) continue;
    const userId = typeof properties?.userId === "string" ? properties.userId : null;
    const nextPath = typeof properties?.nextPath === "string" ? properties.nextPath : null;
    const sourcePath = typeof properties?.sourcePath === "string" ? properties.sourcePath : event.path;
    const roleFromNextPath = readEnglishRoleExampleSourceFromPath(nextPath)?.roleSlug;
    const roleSlug = roleFromNextPath || roleSlugFromEnglishRoleExamplePath(sourcePath);
    const entryPoint = typeof properties?.entryPoint === "string" ? properties.entryPoint : "";
    const isRoleExampleContext = Boolean(
      roleSlug
      || sourcePath?.includes("english-cv-example-")
      || nextPath?.includes("english-cv-example-")
      || entryPoint === "english_example_page"
      || entryPoint.startsWith("en_role_example_"),
    );
    if (!isRoleExampleContext) continue;
    if (!userId) {
      unattributedSignups += 1;
      continue;
    }
    if (roleSlug && ENGLISH_ROLE_EXAMPLE_CLUSTER_SLUGS.includes(roleSlug as typeof ENGLISH_ROLE_EXAMPLE_CLUSTER_SLUGS[number])) {
      signupCandidates.push({ userId, roleSlug: roleSlug as typeof ENGLISH_ROLE_EXAMPLE_CLUSTER_SLUGS[number] });
    } else {
      unattributedSignups += 1;
    }
  }

  const signupUserIds = [...new Set(signupCandidates.map((signup) => signup.userId))];
  const eligibleSignupUserIds = new Set(
    signupUserIds.length === 0
      ? []
      : (await prisma.user.findMany({
          where: {
            id: { in: signupUserIds },
            email: { notIn: excludedEmails, mode: "insensitive" },
            agencySubscription: null,
          },
          select: { id: true },
        })).map((user) => user.id),
  );
  const signups: RoleExampleSignup[] = signupCandidates
    .filter((signup) => eligibleSignupUserIds.has(signup.userId))
    .map(({ userId, roleSlug }) => ({ userId, roleSlug }));

  const validDocumentIds = new Set(documents.map((document) => document.id));
  const roleExampleDocumentIds = new Set(
    sourceDocuments
      .filter((document) => {
        const source = document.startSource?.trim().toLowerCase() || "";
        return source.startsWith("en_role_example_") || source === "english_example_page" || source.startsWith("english_example_");
      })
      .map((document) => document.id),
  );
  const legacySourceDocuments = sourceDocuments.filter((document) => {
    const source = document.startSource?.trim().toLowerCase() || "";
    return source === "english_example_page" || source.startsWith("english_example_");
  }).length;
  const invalidRoleSourceDocuments = sourceDocuments.filter((document) => {
    const source = document.startSource?.trim().toLowerCase() || "";
    return source.startsWith("en_role_example_")
      && !parseEnglishRoleExampleStartSource(source);
  }).length;
  const legacyOrUnattributedStarts = sourceEvents.filter((event) => {
    if (event.event !== "start_cv" && event.event !== "landing_cta_click") return false;
    const properties = toProperties(event.properties);
    const role = roleSlugFromEnglishRoleExamplePath(event.path);
    const explicitRole = normalizeEnglishRoleExampleSlug(properties?.roleSlug);
    const entryPoint = typeof properties?.entryPoint === "string" ? properties.entryPoint : "";
    const entryMethod = properties?.entryMethod === "upload" || properties?.entryMethod === "example"
      ? properties.entryMethod
      : parseEnglishRoleExampleStartSource(entryPoint)?.entryMethod || null;
    const rolePageContext = Boolean(role || explicitRole || event.path?.includes("english-cv-example-"));
    return rolePageContext && !entryMethod && (
      entryPoint === "english_example_page"
      || entryPoint.startsWith("en_role_example_")
      || Boolean(event.path?.includes("english-cv-example-"))
    );
  }).length;
  const pageEventsMissingVisitorId = sourceEvents.filter((event) => {
    if (event.event !== "page_view" && event.event !== "start_cv" && event.event !== "landing_cta_click") return false;
    const properties = toProperties(event.properties);
    const hasRolePath = Boolean(roleSlugFromEnglishRoleExamplePath(event.path) || event.path?.includes("english-cv-example-"));
    const hasRoleProperty = Boolean(normalizeEnglishRoleExampleSlug(properties?.roleSlug));
    const hasRoleEntryPoint = typeof properties?.entryPoint === "string" && (
      properties.entryPoint === "english_example_page" || properties.entryPoint.startsWith("en_role_example_")
    );
    if (!hasRolePath && !hasRoleProperty && !hasRoleEntryPoint) return false;
    return typeof toProperties(event.properties)?.visitorId !== "string";
  }).length;
  const pageEventsMissingSessionId = sourceEvents.filter((event) => {
    if (event.event !== "page_view" && event.event !== "start_cv" && event.event !== "landing_cta_click") return false;
    const properties = toProperties(event.properties);
    const hasRolePath = Boolean(roleSlugFromEnglishRoleExamplePath(event.path) || event.path?.includes("english-cv-example-"));
    const hasRoleProperty = Boolean(normalizeEnglishRoleExampleSlug(properties?.roleSlug));
    const hasRoleEntryPoint = typeof properties?.entryPoint === "string" && (
      properties.entryPoint === "english_example_page" || properties.entryPoint.startsWith("en_role_example_")
    );
    if (!hasRolePath && !hasRoleProperty && !hasRoleEntryPoint) return false;
    return typeof toProperties(event.properties)?.sessionId !== "string";
  }).length;
  const conflictingRoleEvents = events.filter((event) => {
    if (!event.cvId) return false;
    const document = documents.find((candidate) => candidate.id === event.cvId);
    const properties = toProperties(event.properties);
    const explicitRole = normalizeEnglishRoleExampleSlug(properties?.roleSlug);
    const documentRole = parseEnglishRoleExampleStartSource(document?.startSource)?.roleSlug;
    return Boolean(documentRole && explicitRole && documentRole !== explicitRole);
  }).length;
  const paidOrdersWithoutRoleSource = sourceOrders.filter((order) => (
    Boolean(order.cvId && roleExampleDocumentIds.has(order.cvId) && !validDocumentIds.has(order.cvId))
  )).length;
  const warnings: string[] = [];
  if (legacySourceDocuments > 0) warnings.push(`${legacySourceDocuments} legacy English-example CV record(s) are outside role attribution.`);
  if (invalidRoleSourceDocuments > 0) warnings.push(`${invalidRoleSourceDocuments} CV record(s) have a malformed role source and are excluded.`);
  if (legacyOrUnattributedStarts > 0) warnings.push(`${legacyOrUnattributedStarts} example start event(s) cannot be assigned to a role.`);
  if (unattributedSignups > 0) warnings.push(`${unattributedSignups} signup event(s) had no valid role attribution.`);
  if (paidOrdersWithoutRoleSource > 0) warnings.push(`${paidOrdersWithoutRoleSource} paid order(s) are not linked to a valid role-example CV.`);
  if (pageEventsMissingVisitorId > 0 || pageEventsMissingSessionId > 0) warnings.push("Some visitor or session identifiers are missing; visitor and session counts are lower bounds.");
  if (conflictingRoleEvents > 0) warnings.push(`${conflictingRoleEvents} event(s) carried a role that conflicted with the CV source; the CV source wins.`);

  return {
    range,
    since,
    generatedAt: new Date(),
    rows: aggregateEnglishRoleExampleFunnel(
      documents,
      events,
      paidOrders,
      signups,
      [...ENGLISH_ROLE_EXAMPLE_CLUSTER_SLUGS],
    ),
    definitionVersion: "english-role-example-user-funnel-v1",
    dataQuality: {
      legacySourceDocuments,
      invalidRoleSourceDocuments,
      legacyOrUnattributedStarts,
      unattributedSignups,
      paidOrdersWithoutRoleSource,
      pageEventsMissingVisitorId,
      pageEventsMissingSessionId,
      conflictingRoleEvents,
      warnings,
    },
    limitations: [
      "Rows are unique users attached to a role-example CV created in the selected range.",
      "Visitors and sessions come from anonymous browser identifiers; owner/test visitor IDs must be configured before using the numbers as a public baseline.",
      "Paid stage is based on a paid Order linked to the role-example CV; browser payment events are not used as proof of payment.",
      "Internal and test exclusions come from ANALYTICS_EXCLUDED_EMAILS and ANALYTICS_TEST_EMAILS; configure both before publishing a baseline.",
    ],
  };
}
