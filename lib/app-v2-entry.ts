import { appPaths, type AppLocale } from "@/lib/app-v2-paths";

// Destinations that mean "just take me in", not a specific task. With the app on,
// a returning user should land in the dashboard instead of a new blank draft or a
// marketing page. Anything more specific (an editor id, a template choice with a
// start source, a claim, a handoff, checkout success) is kept as is.
const GENERIC_ENTRY_PATHS = new Set([
  "/",
  "/en",
  "/editor",
  "/en/editor",
  "/editor?template=professional",
  "/en/editor?template=professional",
  "/templates",
  "/en/templates",
  "/prijzen",
]);

export function isGenericEntryPath(path: string | null | undefined): boolean {
  return !path || GENERIC_ENTRY_PATHS.has(path);
}

/** Where to send a signed-in user when the redesigned app is active. `next` must already be sanitized. */
export function appPostLoginPath(next: string | null | undefined, locale: AppLocale): string {
  return isGenericEntryPath(next) ? appPaths(locale).dashboard : next!;
}

/** English when the destination, the explicit login locale or the first visit says so. */
export function appEntryLocale(input: { next?: string | null; locale?: unknown; firstTouchPath?: string | null; attributionLocale?: unknown }): AppLocale {
  const next = input.next || "";
  if (next === "/en" || next.startsWith("/en/") || next.startsWith("/en?")) return "en";
  if (next.startsWith("/success") && new URLSearchParams(next.split("?")[1] || "").get("lang") === "en") return "en";
  if (input.locale === "en") return "en";
  if (next && !isGenericEntryPath(next)) return "nl";
  return (input.firstTouchPath || "").startsWith("/en") || input.attributionLocale === "en" ? "en" : "nl";
}
