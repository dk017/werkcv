import { createHash } from "node:crypto";

export function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return "[" + value.map(canonicalJson).join(",") + "]";
  if (value && typeof value === "object") {
    return "{" + Object.entries(value).filter(([, v]) => v !== undefined)
      .sort(([a], [b]) => a.localeCompare(b, "en"))
      .map(([k, v]) => JSON.stringify(k) + ":" + canonicalJson(v)).join(",") + "}";
  }
  return JSON.stringify(value) ?? "null";
}

/** Opaque content version: design, billing and analytics updates do not invalidate it. */
export function cvContentVersion(data: unknown): string {
  return createHash("sha256").update(canonicalJson(data)).digest("hex");
}
