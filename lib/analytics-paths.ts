const EDITOR_PATHS = ["/editor", "/en/editor"] as const;
const TEMPLATE_PATHS = ["/templates", "/en/templates"] as const;

export const ANALYTICS_PRODUCT_PROGRESS_PATHS = [
  ...EDITOR_PATHS,
  ...TEMPLATE_PATHS,
  "/login",
  "/cv-aanmaken",
  "/gratis-cv-maken",
] as const;

function matchesPath(path: string, basePath: string): boolean {
  return path === basePath || path.startsWith(`${basePath}/`);
}

export function normalizeAnalyticsPath(path: string): string {
  if (!path) return "/";
  const hashIndex = path.indexOf("#");
  const withoutHash = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const queryIndex = withoutHash.indexOf("?");
  return queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
}

export function isEditorPath(path: string): boolean {
  return EDITOR_PATHS.some((basePath) => matchesPath(path, basePath));
}

export function isTemplatePath(path: string): boolean {
  return TEMPLATE_PATHS.some((basePath) => matchesPath(path, basePath));
}

export function isFunnelCtaTargetPath(path: string): boolean {
  return (
    isEditorPath(path) ||
    isTemplatePath(path) ||
    path.startsWith("/prijzen") ||
    path.startsWith("/cv-maken-zonder-abonnement") ||
    path.startsWith("/cv-maken-eenmalig-betalen") ||
    path.startsWith("/cv-optimaliseren") ||
    path.startsWith("/cv-verbeteren") ||
    path.startsWith("/cv-checken") ||
    path.startsWith("/cv-nakijken") ||
    path.startsWith("/en/resume-optimizer-netherlands") ||
    path.startsWith("/tools/sollicitatiebrief-generator")
  );
}
