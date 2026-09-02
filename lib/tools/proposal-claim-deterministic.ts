import type { ProposalClaimVerdict } from "@/lib/tools/proposal-claim-verifier-schema";

const CURRENT_FACT_PATTERNS = [
  /\b(?:beschikbaar|beschikbaarheid|startdatum|opzegtermijn|notice period|available|availability|start date)\b/i,
  /\b(?:salaris|salary|tarief|rate|compensation|vergoeding)\b/i,
  /\b(?:uren per week|hours per week|hybride|hybrid|remote|thuiswerk|work location|werklocatie)\b/i,
  /\b(?:voorkeur|preference|werkvergunning|work authori[sz]ation)\b/i,
] as const;

function numberTokens(value: string): string[] {
  return [...value.matchAll(/\b\d+(?:[.,]\d+)?(?:\s?(?:%|jaar|jaren|year|years|uur|hours?))?\b/giu)]
    .map((match) => match[0].toLocaleLowerCase().replace(/\s+/g, " "));
}

function numberKind(token: string): "percentage" | "duration" | "year" | "plain" {
  if (token.includes("%")) return "percentage";
  if (/\b(?:jaar|jaren|year|years|uur|hours?)\b/i.test(token)) return "duration";
  const numeric = Number(token.replace(/[^\d]/g, ""));
  return numeric >= 1900 && numeric <= 2200 ? "year" : "plain";
}

function explicitEmployer(value: string): string | null {
  const match = value.match(/\b(?:at|At|bij|Bij)\s+([A-ZÀ-ÖØ-Þ][\p{L}\d&.'-]*(?:\s+[A-ZÀ-ÖØ-Þ][\p{L}\d&.'-]*){0,3})/u);
  return match?.[1]?.toLocaleLowerCase().replace(/[^\p{L}\d]/gu, "") || null;
}

export function applyDeterministicProposalClaimVerdict(
  claim: string,
  evidence: string,
  verdict: ProposalClaimVerdict,
): ProposalClaimVerdict {
  if (CURRENT_FACT_PATTERNS.some((pattern) => pattern.test(claim))) return "confirmation_required";
  if (!evidence && (verdict === "supported" || verdict === "partially_supported" || verdict === "contradicted")) {
    return "unsupported";
  }

  const claimNumbers = numberTokens(claim);
  const evidenceNumbers = new Set(numberTokens(evidence));
  if (claimNumbers.length && evidence) {
    const missingNumber = claimNumbers.some((token) => !evidenceNumbers.has(token));
    const conflictingComparableNumber = claimNumbers.some((token) => {
      const kind = numberKind(token);
      return !evidenceNumbers.has(token) && [...evidenceNumbers].some((evidenceToken) => numberKind(evidenceToken) === kind);
    });
    if (missingNumber && conflictingComparableNumber && (verdict === "supported" || verdict === "partially_supported")) return "contradicted";
    if (missingNumber && verdict === "supported") return "partially_supported";
  }

  const claimEmployer = explicitEmployer(claim);
  const evidenceEmployer = explicitEmployer(evidence);
  if (claimEmployer && evidenceEmployer && claimEmployer !== evidenceEmployer
    && (verdict === "supported" || verdict === "partially_supported")) return "contradicted";

  const claimIsPositive = !/\b(?:geen|niet|zonder|no|not|without|never)\b/i.test(claim);
  const evidenceIsNegative = /\b(?:geen|niet|zonder|no|not|without|never|verlopen|expired)\b/i.test(evidence);
  if (claimIsPositive && evidenceIsNegative && (verdict === "supported" || verdict === "partially_supported")) {
    return "contradicted";
  }
  return verdict;
}
