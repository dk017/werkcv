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

  // In production the app can sit behind a reverse proxy. In that case
  // NextRequest may contain an internal origin while the browser correctly
  // sends the public HTTPS origin. Trust only the proxy-derived host/protocol
  // for this request; never add an arbitrary Origin header to the allowlist.
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || request.headers.get("host")?.trim();
  if (host) {
    const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
    const protocol = forwardedProto === "https" || forwardedProto === "http"
      ? forwardedProto
      : request.nextUrl.protocol.replace(":", "");
    const proxyOrigin = normalizeOrigin(`${protocol}://${host}`);
    if (proxyOrigin) allowed.add(proxyOrigin);
    // Some managed proxies omit x-forwarded-proto while still presenting the
    // public HTTPS host to the browser. Adding the two standard schemes for
    // that same trusted host keeps POSTs working without accepting a foreign
    // host or origin.
    for (const scheme of ["https", "http"]) {
      const alternateOrigin = normalizeOrigin(`${scheme}://${host}`);
      if (alternateOrigin) allowed.add(alternateOrigin);
    }
  }

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
