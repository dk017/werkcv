const codes = new Set(["MORE_FACTS_REQUIRED", "AI_DAILY_LIMIT", "AI_BUSY", "FACT_REVIEW_REQUIRED", "STALE_DOCUMENT", "SAVE_CONFLICT", "NO_SHORTER_SUGGESTION", "INPUT_TOO_LARGE", "AUTH_REQUIRED", "FEATURE_UNAVAILABLE", "INVALID_INPUT", "INVALID_ORIGIN", "REQUEST_REPLAY", "REQUEST_TIMEOUT", "SUGGESTION_FAILED", "NOT_FOUND"]);
export function safeAiErrorCode(value: unknown): string {
  return typeof value === "string" && codes.has(value) ? value : "SUGGESTION_FAILED";
}
