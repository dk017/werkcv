export const AGENCY_CONSENT_COOKIE = "werkcv_agency_analytics_v1";
export const AGENCY_CONSENT_CHANGED = "werkcv:agency-analytics-consent";
export type AgencyAnalyticsConsent = "granted" | "denied" | null;

export function isAgencyAnalyticsPath(path: string): boolean {
  const clean = path.split(/[?#]/, 1)[0].replace(/\/$/, "");
  return /^\/(?:en\/)?(?:agency|voor-bureaus)(?:\/|$)/.test(clean)
    || clean === "/tools/kandidaatvoorstel-checker"
    || clean === "/en/candidate-proposal-checker"
    || clean === "/kandidaat/bevestigen";
}

export function requiresAgencyAnalyticsConsent(event: string, path: string): boolean {
  return /^(agency_|matchpack_)/.test(event) || isAgencyAnalyticsPath(path);
}

export function readAgencyAnalyticsConsent(cookies: string): AgencyAnalyticsConsent {
  const value = cookies.split(";").map((part) => part.trim())
    .find((part) => part.startsWith(`${AGENCY_CONSENT_COOKIE}=`))?.split("=")[1];
  return value === "granted" || value === "denied" ? value : null;
}

export function agencyAnalyticsAllowed(event: string, path: string, cookies: string): boolean {
  if (path.split(/[?#]/, 1)[0].replace(/\/$/, "") === "/kandidaat/bevestigen") return false;
  return !requiresAgencyAnalyticsConsent(event, path) || readAgencyAnalyticsConsent(cookies) === "granted";
}

export function clientAgencyAnalyticsAllowed(event = "page_view", path?: string): boolean {
  if (typeof window === "undefined") return false;
  return agencyAnalyticsAllowed(event, path ?? window.location.pathname, document.cookie);
}

export function setAgencyAnalyticsConsent(value: Exclude<AgencyAnalyticsConsent, null>): void {
  document.cookie = `${AGENCY_CONSENT_COOKIE}=${value}; Path=/; Max-Age=15552000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  // Do not replay views or clicks collected before consent, including after withdrawal.
  window.dispatchEvent(new Event(AGENCY_CONSENT_CHANGED));
}
