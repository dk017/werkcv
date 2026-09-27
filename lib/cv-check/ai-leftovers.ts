import type { CvCheckItem, CvCheckLocale } from "./types";

// Leftovers from pasting a chatbot answer into a CV. Patterns come from the
// 27 Sep 2026 test of 24 ChatGPT-written CVs (docs/product/2026-09-27-chatgpt-cv-page-research.md):
// markdown in 24/24, advice mixed into 8/8 tailored CVs, placeholders in 7/24.
const LEFTOVER_PATTERNS: Array<{ kind: "placeholder" | "markdown" | "chat"; pattern: RegExp }> = [
  { kind: "placeholder", pattern: /\[[^\]\n]{2,40}\]/ },
  { kind: "placeholder", pattern: /\b(?:XX+|xx)\s?%|\b0?6[-\s]?X{4,}\b|\{\{?[^}\n]{2,30}\}?\}/ },
  { kind: "markdown", pattern: /\*\*[^*\n]{2,80}\*\*/ },
  { kind: "markdown", pattern: /^\s{0,3}#{1,4}\s+\S/m },
  {
    kind: "chat",
    pattern:
      /^\W{0,3}(?:natuurlijk\b|zeker[!,]|hieronder (?:staat|vind je|een)|hier is (?:je|een|jouw)|laat (?:het )?me weten|wil je dat ik|succes met (?:je|de|jouw) sollicitatie|here is (?:your|a|an)\b|certainly[!,]|let me know|feel free to)/im,
  },
  {
    kind: "chat",
    pattern:
      /\balleen opnemen als dit klopt\b|\bals je (?:wél|geen|nog geen)\b[^.\n]{0,60}\b(?:voeg|zet|kun je|vul)\b|\bif you (?:do|don't) have\b[^.\n]{0,60}\badd\b|\(vul (?:hier )?in\)|\bvul hier\b/i,
  },
];

export function findAiLeftovers(cvText: string): Array<{ kind: "placeholder" | "markdown" | "chat"; excerpt: string }> {
  const hits: Array<{ kind: "placeholder" | "markdown" | "chat"; excerpt: string }> = [];
  for (const { kind, pattern } of LEFTOVER_PATTERNS) {
    const match = cvText.match(pattern);
    if (!match || match.index === undefined) continue;
    const lineStart = cvText.lastIndexOf("\n", match.index) + 1;
    const lineEnd = cvText.indexOf("\n", match.index);
    const line = cvText.slice(lineStart, lineEnd === -1 ? undefined : lineEnd).trim();
    hits.push({ kind, excerpt: line.length > 90 ? `${line.slice(0, 87)}…` : line });
  }
  return hits;
}

export function aiLeftoversCheck(cvText: string, locale: CvCheckLocale): CvCheckItem {
  const hits = findAiLeftovers(cvText);
  const en = locale === "en";
  const kinds = new Set(hits.map((hit) => hit.kind));
  const parts = [
    kinds.has("placeholder") && (en ? "placeholders such as [your phone number]" : "invulvelden zoals [jouw telefoonnummer]"),
    kinds.has("markdown") && (en ? "formatting symbols such as ** or ##" : "opmaaktekens zoals ** of ##"),
    kinds.has("chat") && (en ? "chatbot text or advice" : "chatbottekst of advies"),
  ].filter(Boolean);

  return {
    id: "content_ai_leftovers",
    category: "content",
    // Placeholders or chatbot text make the CV unsendable (like a BSN on the CV); stray markdown only looks untidy.
    severity: kinds.has("placeholder") || kinds.has("chat") ? "critical" : "important",
    status: hits.length ? "fail" : "pass",
    weight: 6,
    label: hits.length
      ? en
        ? "Leftovers from an AI tool or template"
        : "Restanten van een AI-tool of sjabloon"
      : en
        ? "No leftovers from an AI tool or template"
        : "Geen restanten van een AI-tool of sjabloon",
    evidence: hits.length ? hits[0].excerpt : null,
    fix: hits.length
      ? en
        ? `Remove ${parts.join(", ")}. Fill in your own details and keep only text that is true for you.`
        : `Haal ${parts.join(", ")} weg. Vul je eigen gegevens in en houd alleen tekst over die voor jou klopt.`
      : null,
  };
}
