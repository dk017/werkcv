import {
  normalizeEnglishRoleExampleSlug,
  parseEnglishRoleExampleStartSource,
  readEnglishRoleExampleSourceFromPath,
  roleSlugFromEnglishRoleExamplePath,
} from "@/lib/english-role-examples";
import type { AttributionSnapshot } from "@/lib/attribution";

const SAFE_PROPERTY_KEYS = new Set([
  "amountCents",
  "completionScore",
  "contentSignals",
  "cvId",
  "destination",
  "entryMethod",
  "entryPoint",
  "experimentVariant",
  "expanded",
  "flow",
  "firstTouchCluster",
  "fromPath",
  "hasSampleCV",
  "isNewUser",
  "isReady",
  "label",
  "locale",
  "location",
  "milestone",
  "nextPath",
  "orderId",
  "pageCount",
  "pagePath",
  "path",
  "previousId",
  "product",
  "reason",
  "referrer",
  "roleSlug",
  "schemaVersion",
  "section",
  "signalCount",
  "source",
  "stage",
  "startSource",
  "step",
  "slug",
  "templateId",
  "themeId",
  "toPath",
  "uiLanguage",
  "variant",
]);

const SAFE_CONTENT_SIGNAL_KEYS = new Set([
  "education",
  "experience",
  "languages",
  "otherSections",
  "profileSummary",
  "skills",
]);

// Analytics values are identifiers, paths, enums and bounded measurements.
// Human-authored prose, email addresses and filenames are intentionally invalid.
const SAFE_IDENTIFIER_OR_PATH = /^[A-Za-z0-9_./:?=&%+\-]*$/;

function pathFromUnknown(value: unknown): string | null {
  if (typeof value !== "string" || value.length > 500) return null;
  try {
    const parsed = new URL(value, "https://werkcv.nl");
    if (parsed.origin !== "https://werkcv.nl") return null;
    return parsed.pathname;
  } catch {
    return null;
  }
}

function containsRolePath(value: unknown): boolean {
  const path = pathFromUnknown(value);
  return Boolean(
    (path && roleSlugFromEnglishRoleExamplePath(path))
    || (typeof value === "string" && readEnglishRoleExampleSourceFromPath(value)),
  );
}

export function isEnglishRoleAnalyticsContext(
  properties: Record<string, unknown>,
  url: unknown,
): boolean {
  if (normalizeEnglishRoleExampleSlug(properties.roleSlug)) return true;
  if (parseEnglishRoleExampleStartSource(properties.startSource)) return true;
  if (parseEnglishRoleExampleStartSource(properties.entryPoint)) return true;

  return [
    properties.path,
    properties.pagePath,
    properties.fromPath,
    properties.nextPath,
    url,
  ].some(containsRolePath);
}

function sanitizeContentSignals(value: unknown): Record<string, boolean> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.some(([key, item]) => !SAFE_CONTENT_SIGNAL_KEYS.has(key) || typeof item !== "boolean")) {
    return null;
  }
  return Object.fromEntries(entries) as Record<string, boolean>;
}

/**
 * Returns a content-free role-funnel property object, or null when the client
 * supplied a key/value outside the analytics contract.
 */
export function sanitizeEnglishRoleAnalyticsProperties(
  properties: Record<string, unknown>,
): Record<string, unknown> | null {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(properties)) {
    if (!SAFE_PROPERTY_KEYS.has(key)) return null;

    if (key === "contentSignals") {
      const contentSignals = sanitizeContentSignals(value);
      if (!contentSignals) return null;
      sanitized[key] = contentSignals;
      continue;
    }

    if (key === "roleSlug") {
      const roleSlug = normalizeEnglishRoleExampleSlug(value);
      if (!roleSlug) return null;
      sanitized[key] = roleSlug;
      continue;
    }

    if (key === "entryMethod") {
      if (value !== "example" && value !== "upload") return null;
      sanitized[key] = value;
      continue;
    }

    if (typeof value === "string") {
      if (value.length > 500 || !SAFE_IDENTIFIER_OR_PATH.test(value)) return null;
      sanitized[key] = value;
      continue;
    }

    if (typeof value === "number") {
      if (!Number.isFinite(value) || Math.abs(value) > 10_000_000) return null;
      sanitized[key] = value;
      continue;
    }

    if (typeof value === "boolean") {
      sanitized[key] = value;
      continue;
    }

    return null;
  }

  return sanitized;
}

/** Removes query strings and origins from role-funnel URLs before storage. */
export function sanitizeEnglishRoleAnalyticsUrl(value: unknown): string | null {
  return pathFromUnknown(value);
}

function safeAttributionToken(value: string, maxLength = 160): string {
  return value.length <= maxLength && SAFE_IDENTIFIER_OR_PATH.test(value) ? value : "";
}

/** Keep campaign attribution useful without allowing free-form or identifying text. */
export function sanitizeEnglishRoleAnalyticsAttribution(
  value: AttributionSnapshot | null,
): AttributionSnapshot | null {
  if (!value) return null;
  const firstTouchPath = pathFromUnknown(value.firstTouchPath);
  const lastTouchPath = pathFromUnknown(value.lastTouchPath);
  if (!firstTouchPath || !lastTouchPath) return null;

  const timestamp = (input: string): string => (
    input.length <= 40 && Number.isFinite(Date.parse(input)) ? input : ""
  );

  return {
    version: 1,
    firstTouchAt: timestamp(value.firstTouchAt),
    firstTouchPath,
    firstTouchCluster: safeAttributionToken(value.firstTouchCluster, 80),
    firstTouchReferrer: value.firstTouchReferrer
      ? sanitizeEnglishRoleAnalyticsUrl(value.firstTouchReferrer) || ""
      : "",
    lastTouchAt: timestamp(value.lastTouchAt),
    lastTouchPath,
    lastTouchCluster: safeAttributionToken(value.lastTouchCluster, 80),
    locale: value.locale === "en" ? "en" : "nl",
    utmSource: safeAttributionToken(value.utmSource),
    utmMedium: safeAttributionToken(value.utmMedium),
    utmCampaign: safeAttributionToken(value.utmCampaign),
    utmTerm: safeAttributionToken(value.utmTerm),
    utmContent: safeAttributionToken(value.utmContent),
    gclid: safeAttributionToken(value.gclid),
    fbclid: safeAttributionToken(value.fbclid),
    msclkid: safeAttributionToken(value.msclkid),
  };
}
