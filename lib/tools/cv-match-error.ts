const publicCodes = new Set(["RATE_LIMITED", "CV_REQUIRED", "INVALID_FILE_TYPE", "FILE_TOO_LARGE", "CV_TOO_SHORT", "VACANCY_TOO_SHORT", "ANALYSIS_FAILED"]);
export function safeCvMatchErrorCode(value: unknown): string {
  return typeof value === "string" && publicCodes.has(value) ? value : "ANALYSIS_FAILED";
}

/** Logs categories only: never a provider message, filename or source text. */
export function cvMatchFailureCategory(error: unknown): string {
  const e = error as { status?: number; code?: string; name?: string } | null;
  if (e?.status === 401) return "provider_auth";
  if (e?.code === "insufficient_quota") return "provider_quota";
  if (e?.status === 429) return "provider_rate_limit";
  if (e?.status === 400) return "provider_request";
  if (e?.name === "APIConnectionTimeoutError") return "provider_timeout";
  if (e?.name === "APIConnectionError") return "provider_connection";
  return "analysis_failed";
}
