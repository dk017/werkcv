export const PENDING_START_SOURCE_COOKIE = "werkcv_pending_start_source";

const MAX_START_SOURCE_LENGTH = 160;

export function normalizeStartSource(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().replace(/[\u0000-\u001f\u007f]/g, "").slice(0, MAX_START_SOURCE_LENGTH);
  return normalized || null;
}

export function landingStartSource(pathname: string): string {
  return `landing:${pathname || "/"}`;
}

export function readEncodedStartSource(value: string | undefined): string | null {
  if (!value) return null;
  try {
    return normalizeStartSource(decodeURIComponent(value));
  } catch {
    return normalizeStartSource(value);
  }
}
