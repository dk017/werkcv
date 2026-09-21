import { safeAiErrorCode } from "./ai-error-code";

/** Shared browser/server allowlist. Never forward free-form model or document text. */
export function sanitizeAiWritingProperties(event: string, value: Record<string, unknown>): Record<string, unknown> {
  const locale = value.locale === "en" ? "en" : "nl";
  const target = ["profile", "experience", "all"].includes(String(value.target)) ? String(value.target) : "all";
  const bullet = value.bullet === true;
  const base = { locale, target, bullet };
  if (event === "ai_writing_facts") return { ...base, stage: value.stage === "completed" ? "completed" : "started" };
  if (event === "ai_writing_result") return { ...base, changeCount: Math.max(0, Math.min(100, Math.floor(Number(value.changeCount) || 0))), latency: ["under_5s", "5_to_15s", "15_to_30s", "over_30s"].includes(String(value.latency)) ? String(value.latency) : "over_30s" };
  if (event === "ai_writing_decision") return { ...base, field: ["summary", "description", "highlights"].includes(String(value.field)) ? String(value.field) : "summary", decision: ["accepted", "rejected", "undone"].includes(String(value.decision)) ? String(value.decision) : "rejected" };
  if (event === "ai_writing_failed") return { ...base, reason: safeAiErrorCode(value.reason) };
  const action = ["draft_profile", "draft_experience", "improve", "shorten", "tailor"].includes(String(value.action)) ? String(value.action) : "improve";
  return event === "ai_writing_requested" ? { ...base, action, regeneration: value.regeneration === true } : { ...base, action };
}

export function writingLatencyBucket(durationMs: number) {
  return durationMs < 5000 ? "under_5s" : durationMs < 15000 ? "5_to_15s" : durationMs < 30000 ? "15_to_30s" : "over_30s";
}
