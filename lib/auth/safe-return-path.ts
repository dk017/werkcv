const SAFE_APPLICATION_PREFIXES = [
  "/editor",
  "/en/editor",
  "/templates",
  "/en/templates",
  "/mijn-cvs",
  "/agency/account",
] as const;

function hasControlCharacter(value: string): boolean {
  return /[\u0000-\u001f\u007f]/.test(value);
}

function matchesAllowedPrefix(pathname: string): boolean {
  return SAFE_APPLICATION_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

/**
 * Accept only same-origin application destinations. The returned value is safe
 * to place in a server-controlled post-login redirect.
 */
export function sanitizeInternalReturnPath(value: unknown, fallback = "/templates"): string {
  if (typeof value !== "string" || !value || hasControlCharacter(value)) return fallback;
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return fallback;

  try {
    const parsed = new URL(value, "https://werkcv.invalid");
    if (parsed.origin !== "https://werkcv.invalid") return fallback;
    if (!matchesAllowedPrefix(parsed.pathname)) return fallback;
    return `${parsed.pathname}${parsed.search}`;
  } catch {
    return fallback;
  }
}

export function isMatchPackReturnPath(value: string): boolean {
  const pathname = value.split(/[?#]/, 1)[0];
  return pathname === "/agency/account" || pathname.startsWith("/agency/account/");
}

export function isEnglishReturnPath(value: string): boolean {
  const pathname = value.split(/[?#]/, 1)[0];
  return pathname === "/en/editor" || pathname.startsWith("/en/editor/")
    || pathname === "/en/templates" || pathname.startsWith("/en/templates/");
}
