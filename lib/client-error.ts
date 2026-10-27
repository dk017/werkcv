// Properties for the client_error_shown event (the "Er is iets misgegaan" screens). Only the start of
// the error message is kept, with emails and long digit runs removed, so no personal data is sent.
export type ClientErrorBoundary = "route" | "global";

export function clientErrorMessage(error: unknown): string {
  const raw = error instanceof Error ? `${error.name}: ${error.message}` : String(error ?? "");
  return raw
    .replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, "[email]")
    .replace(/\d{5,}/g, "[n]")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 140);
}

export function clientErrorProperties(error: Error & { digest?: string }, boundary: ClientErrorBoundary) {
  return {
    page_path: typeof window === "undefined" ? "" : window.location.pathname,
    boundary,
    message: clientErrorMessage(error),
    digest: error?.digest ?? null,
  };
}
