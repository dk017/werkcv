import { cvDownloadPrice } from "@/lib/site-content";
import { OpenInEditorOutput, SCHEMA_VERSION, utmMediumFromClient } from "./contract";
import { SCORING_VERSION } from "./check";

type Locale = "nl" | "en";

/**
 * utm_medium from the client's own name (initialize clientInfo) when the server has it. The route is
 * stateless, so a tools/call from a 2025-era client usually arrives without client info; then the
 * User-Agent label (lib/mcp/context.ts) is used instead of reporting "unknown".
 */
export function resolveUtmMedium(clientVersion: { name?: string } | undefined, userAgentClient: string): string {
  return clientVersion?.name ? utmMediumFromClient(clientVersion) : userAgentClient;
}

export function editorUrl(token: string, locale: Locale, utmMedium: string): string {
  const path = locale === "en" ? "/en/cv-check/improve" : "/cv-check/verbeteren";
  const params = new URLSearchParams({ handoff: token, utm_source: "mcp", utm_medium: utmMedium, utm_campaign: "cv-check" });
  return `https://werkcv.nl${path}?${params.toString()}`;
}

export function buildOpenInEditorV2(input: { token: string; locale: Locale; utmMedium: string; includesVacancy: boolean }): OpenInEditorOutput {
  const nl = input.locale === "nl";
  return {
    url: editorUrl(input.token, input.locale, input.utmMedium),
    expiresInMinutes: 60,
    singleUse: true,
    includesVacancy: input.includesVacancy,
    opensWith: input.includesVacancy ? "match" : "check",
    // The price is stated as a fact, as before: editing is free, the PDF is a one-time payment.
    userMessage: nl
      ? `Deze link werkt één keer en verloopt na 60 minuten. Je hebt geen account nodig. Bewerken is gratis; de pdf downloaden kost eenmalig ${cvDownloadPrice.display}, zonder abonnement.`
      : `This link works once and expires after 60 minutes. No account needed. Editing is free; downloading the PDF costs ${cvDownloadPrice.displayEn} once, with no subscription.`,
    meta: { tool: "open_in_editor", schemaVersion: SCHEMA_VERSION, scoringVersion: SCORING_VERSION, locale: input.locale },
  };
}
