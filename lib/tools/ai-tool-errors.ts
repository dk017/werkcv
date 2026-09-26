import OpenAI from "openai";
import { ZodError } from "zod";

export type AiToolErrorCode =
  | "PROVIDER_TIMEOUT"
  | "PROVIDER_RATE_LIMITED"
  | "PROVIDER_ERROR"
  | "SCHEMA_ERROR"
  | "UNKNOWN";

/**
 * Maps an error thrown while calling the AI provider to a stable code, so failures are
 * distinguishable in analytics and alerts. Never includes CV or vacancy text.
 */
export function classifyAiToolError(error: unknown): AiToolErrorCode {
  if (error instanceof OpenAI.APIConnectionTimeoutError) return "PROVIDER_TIMEOUT";
  if (error instanceof OpenAI.RateLimitError) return "PROVIDER_RATE_LIMITED";
  if (error instanceof OpenAI.APIError) return "PROVIDER_ERROR";
  if (error instanceof ZodError) return "SCHEMA_ERROR";
  if (error instanceof Error) {
    if (error.name === "AbortError" || /timed? ?out/i.test(error.message)) return "PROVIDER_TIMEOUT";
    // zodResponseFormat rejects non-strict schemas; parse() fails when the model output cannot be read.
    if (/\.optional\(\)|structured|response_format|could not parse/i.test(error.message)) return "SCHEMA_ERROR";
  }
  return "UNKNOWN";
}

/**
 * Error safe to store in ops alerts: Zod issues can echo model output (which may quote the CV),
 * so keep only paths and issue codes. Provider and helper messages do not contain user input.
 */
export function toSafeAiToolError(error: unknown): Error {
  if (error instanceof ZodError) {
    const issues = error.issues.map((issue) => `${issue.path.join(".") || "(root)"}:${issue.code}`).join(", ");
    return new Error(`ZodError ${issues}`.slice(0, 500));
  }
  if (error instanceof Error) {
    const safe = new Error(error.message.slice(0, 500));
    safe.name = error.name;
    return safe;
  }
  return new Error("Unknown AI tool error");
}

/** Codes that point to a defect or outage on our side and should alert operations. */
export function shouldAlertAiToolError(code: AiToolErrorCode): boolean {
  return code === "SCHEMA_ERROR" || code === "PROVIDER_ERROR" || code === "UNKNOWN";
}
