import type { RouteWorkspaceContext } from "@/lib/workspace/types";

function normalisePathname(pathname: string): string {
  const value = pathname.trim().split(/[?#]/, 1)[0];
  if (!value) return "/";
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  const withoutTrailingSlash = withLeadingSlash.replace(/\/+$/, "");
  return withoutTrailingSlash || "/";
}

function startsWithFamily(pathname: string, family: string): boolean {
  return pathname === family || pathname.startsWith(`${family}/`);
}

export function getRouteWorkspaceContext(pathname: string): RouteWorkspaceContext {
  const path = normalisePathname(pathname);

  if (
    startsWithFamily(path, "/api") ||
    startsWithFamily(path, "/icon") ||
    path.endsWith("/opengraph-image")
  ) return "none";
  if (startsWithFamily(path, "/kandidaat/bevestigen")) return "private_external";
  if (startsWithFamily(path, "/embed")) return "embedded";
  if (startsWithFamily(path, "/admin")) return "admin";
  if (startsWithFamily(path, "/chrome")) return "none";
  if (startsWithFamily(path, "/login")) return "auth_derived";
  if (startsWithFamily(path, "/editor") || startsWithFamily(path, "/en/editor")) return "document_derived";
  if (startsWithFamily(path, "/mijn-cvs")) return "personal_app";
  if (startsWithFamily(path, "/agency/account")) return "matchpack_app";
  if (
    startsWithFamily(path, "/agency") ||
    startsWithFamily(path, "/voor-bureaus") ||
    startsWithFamily(path, "/en/agency") ||
    path === "/tools/kandidaatvoorstel-checker" ||
    path === "/en/candidate-proposal-checker"
  ) return "matchpack_marketing";
  if (startsWithFamily(path, "/success")) return "personal_app";
  return "personal_public";
}

export function isEnglishWorkspacePath(pathname: string): boolean {
  const path = normalisePathname(pathname);
  return path === "/en" || path.startsWith("/en/");
}

export function normaliseWorkspacePathname(pathname: string): string {
  return normalisePathname(pathname);
}
