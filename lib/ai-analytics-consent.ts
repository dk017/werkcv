export const AI_CONSENT_COOKIE = "werkcv_ai_analytics_v1";
export const AI_CONSENT_CHANGED = "werkcv:ai-analytics-consent";
export function readAiAnalyticsConsent(cookies: string): "granted" | "denied" | null {
  const value = cookies.split(";").map(part => part.trim()).find(part => part.startsWith(`${AI_CONSENT_COOKIE}=`))?.split("=")[1];
  return value === "granted" || value === "denied" ? value : null;
}
export function setAiAnalyticsConsent(value: "granted" | "denied") {
  document.cookie = `${AI_CONSENT_COOKIE}=${value}; Path=/; Max-Age=15552000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  window.dispatchEvent(new Event(AI_CONSENT_CHANGED));
}
