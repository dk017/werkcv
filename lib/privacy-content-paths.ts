/**
 * Routes that can render submitted CV/proposal text in the browser. These
 * routes must not load third-party analytics or session replay. Keep the
 * predicate pathname-only so query strings and fragments cannot change the
 * decision.
 */
const PRIVATE_CONTENT_PATHS = new Set([
  "/tools/kandidaatvoorstel-checker",
  "/en/candidate-proposal-checker",
  "/kandidaat/bevestigen",
  "/cv-handoff",
  "/en/cv-handoff",
]);

export function isPrivateContentPath(pathname: string): boolean {
  const clean = pathname.trim().split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";
  return PRIVATE_CONTENT_PATHS.has(clean) || clean.startsWith("/kandidaat/bevestigen/");
}
