import { NextRequest } from "next/server";

export type GeoLookupResult = {
  city: string;
  region: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
};

type CachedGeo = {
  expiresAt: number;
  value: GeoLookupResult | null;
};

const geoCache = new Map<string, CachedGeo>();
const GEO_CACHE_TTL_MS = 6 * 60 * 60 * 1000;

function isPrivateIp(ip: string): boolean {
  return (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip) ||
    ip.startsWith("fc") ||
    ip.startsWith("fd")
  );
}

export function getClientIp(request: NextRequest): string | null {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const candidate =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    forwardedFor?.split(",")[0]?.trim() ||
    "";

  if (!candidate || isPrivateIp(candidate)) return null;
  return candidate;
}

export async function geolocateIp(ip: string | null): Promise<GeoLookupResult | null> {
  if (!ip) return null;

  const cached = geoCache.get(ip);
  if (cached && cached.expiresAt > Date.now()) return cached.value;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1200);

  try {
    const response = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(
        ip
      )}?fields=status,message,country,countryCode,regionName,city,lat,lon,timezone`,
      {
        signal: controller.signal,
        next: { revalidate: 60 * 60 },
      }
    );

    if (!response.ok) return null;
    const data = (await response.json()) as {
      status?: string;
      country?: string;
      countryCode?: string;
      regionName?: string;
      city?: string;
      lat?: number;
      lon?: number;
      timezone?: string;
    };

    const value =
      data.status === "success" &&
      typeof data.lat === "number" &&
      typeof data.lon === "number"
        ? {
            city: data.city || "",
            region: data.regionName || "",
            country: data.country || "",
            countryCode: data.countryCode || "",
            latitude: data.lat,
            longitude: data.lon,
            timezone: data.timezone || "",
          }
        : null;

    geoCache.set(ip, {
      expiresAt: Date.now() + GEO_CACHE_TTL_MS,
      value,
    });

    return value;
  } catch {
    geoCache.set(ip, {
      expiresAt: Date.now() + 5 * 60 * 1000,
      value: null,
    });
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
