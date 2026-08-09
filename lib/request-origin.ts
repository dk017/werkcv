import type { NextRequest } from "next/server";

function normalizeOrigin(value: string | null | undefined): string | null {
  if (!value || value === "null") return null;

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function getAllowedOrigins(request: NextRequest): Set<string> {
  const allowed = new Set<string>();
  const requestOrigin = normalizeOrigin(request.nextUrl.origin);
  const configuredOrigin = normalizeOrigin(process.env.NEXT_PUBLIC_APP_URL);

  if (requestOrigin) allowed.add(requestOrigin);
  if (configuredOrigin) allowed.add(configuredOrigin);

  return allowed;
}

export function isAllowedSameOriginRequest(
  request: NextRequest,
  options: { checkReferer?: boolean } = {},
): boolean {
  const allowedOrigins = getAllowedOrigins(request);
  const originHeader = request.headers.get("origin");

  if (originHeader) {
    const origin = normalizeOrigin(originHeader);
    if (!origin || !allowedOrigins.has(origin)) return false;
  }

  if (options.checkReferer) {
    const refererHeader = request.headers.get("referer");
    if (refererHeader) {
      const refererOrigin = normalizeOrigin(refererHeader);
      if (!refererOrigin || !allowedOrigins.has(refererOrigin)) return false;
    }
  }

  return true;
}
