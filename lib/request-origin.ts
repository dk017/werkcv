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
  const configuredOrigin = normalizeOrigin(process.env.NEXT_PUBLIC_APP_URL) || "https://werkcv.nl";
  allowed.add(configuredOrigin);

  // Development may use a loopback origin. Never add an arbitrary Host or
  // forwarded host to this set: doing so would let a forged proxy header turn
  // an attacker-controlled Origin into an accepted same-origin request.
  const requestOrigin = normalizeOrigin(request.nextUrl.origin);
  if (requestOrigin) {
    try {
      const hostname = new URL(requestOrigin).hostname;
      if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]") {
        allowed.add(requestOrigin);
      }
    } catch {
      // Ignore an invalid framework-derived origin.
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
    if (!refererHeader && !originHeader) return false;
    if (refererHeader) {
      const refererOrigin = normalizeOrigin(refererHeader);
      if (!refererOrigin || !allowedOrigins.has(refererOrigin)) return false;
    }
  }

  return true;
}
