/**
 * Login codes go out over SMTP (Hostinger). With 5 s timeouts, about 1 in 14 code requests failed
 * with a server error (6 of ~80, 2-16 Oct 2026), and the user had to ask again. A slow greeting or a
 * dropped connection is retried once; a rejected address or bad credentials is not.
 */
export const SMTP_TIMEOUT_MS = 15_000;

const TRANSIENT_CODES = new Set(["ETIMEDOUT", "ECONNECTION", "ESOCKET", "ECONNRESET", "ECONNREFUSED", "EDNS", "EPIPE"]);

export type MailErrorInfo = { code: string | null; responseCode: number | null; name: string };

export function describeMailError(error: unknown): MailErrorInfo {
  const e = (error && typeof error === "object" ? error : {}) as { code?: unknown; responseCode?: unknown; name?: unknown };
  return {
    code: typeof e.code === "string" ? e.code : null,
    responseCode: typeof e.responseCode === "number" ? e.responseCode : null,
    name: typeof e.name === "string" ? e.name : "UNKNOWN",
  };
}

/** Network trouble and 4xx SMTP replies ("try again later") are worth one more try. */
export function isTransientMailError(error: unknown): boolean {
  const { code, responseCode } = describeMailError(error);
  if (code && TRANSIENT_CODES.has(code)) return true;
  return responseCode !== null && responseCode >= 400 && responseCode < 500;
}

export async function sendMailWithRetry<T>(
  send: () => Promise<T>,
  options: { attempts?: number; delayMs?: number; onFailure?: (info: MailErrorInfo & { attempt: number; willRetry: boolean }) => void } = {},
): Promise<T> {
  const attempts = options.attempts ?? 2;
  const delayMs = options.delayMs ?? 800;
  for (let attempt = 1; ; attempt += 1) {
    try {
      return await send();
    } catch (error) {
      const willRetry = attempt < attempts && isTransientMailError(error);
      options.onFailure?.({ ...describeMailError(error), attempt, willRetry });
      if (!willRetry) throw error;
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}
