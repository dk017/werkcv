// Consent for Microsoft Clarity session recordings (consumer pages). Without a stored "granted",
// Clarity runs in its no-consent mode for EEA visitors: no cookies, one id per page view.
export const CLARITY_CONSENT_COOKIE = "werkcv_clarity_consent_v1";
export const CLARITY_CONSENT_CHANGED = "werkcv:clarity-consent";
export const CLARITY_CONSENT_REOPEN = "werkcv:clarity-consent-reopen";
// 6 months; Clarity treats consent as valid for at most 9 months.
const MAX_AGE_SECONDS = 15552000;

export type ClarityConsent = "granted" | "denied" | null;

export function readClarityConsent(cookies: string): ClarityConsent {
  const value = cookies.split(";").map((part) => part.trim())
    .find((part) => part.startsWith(`${CLARITY_CONSENT_COOKIE}=`))?.split("=")[1];
  return value === "granted" || value === "denied" ? value : null;
}

/** The consentv2 payload. Ads storage is always denied: WerkCV does not use Clarity for advertising. */
export function clarityConsentPayload(value: Exclude<ClarityConsent, null>) {
  return { ad_Storage: "denied", analytics_Storage: value } as const;
}

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };

export function sendClarityConsent(value: Exclude<ClarityConsent, null>): void {
  const w = window as unknown as { clarity?: ClarityFn };
  // Same queue stub as Clarity's own snippet, so the call is kept if the tag has not loaded yet.
  if (typeof w.clarity !== "function") {
    const stub: ClarityFn = (...args: unknown[]) => { (stub.q = stub.q || []).push(args); };
    w.clarity = stub;
  }
  w.clarity("consentv2", clarityConsentPayload(value));
}

export function setClarityConsent(value: Exclude<ClarityConsent, null>): void {
  document.cookie = `${CLARITY_CONSENT_COOKIE}=${value}; Path=/; Max-Age=${MAX_AGE_SECONDS}; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  sendClarityConsent(value);
  window.dispatchEvent(new Event(CLARITY_CONSENT_CHANGED));
}

/** Inline snippet run right after the Clarity tag: re-sends a stored choice on every page load. */
export const CLARITY_STORED_CONSENT_SNIPPET =
  `(function(){var m=document.cookie.match(/(?:^|; )${CLARITY_CONSENT_COOKIE}=(granted|denied)/);` +
  `if(m){window.clarity("consentv2",{ad_Storage:"denied",analytics_Storage:m[1]});}})();`;
