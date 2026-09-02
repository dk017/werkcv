import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import type { ClaimEvidenceBenchmarkCaseV1 } from "@/lib/benchmark/claim-evidence-public-v1";
import type { ProposalClaimVerdict } from "@/lib/tools/proposal-claim-verifier-schema";

const verdicts: ProposalClaimVerdict[] = [
  "supported",
  "partially_supported",
  "unsupported",
  "contradicted",
  "confirmation_required",
  "not_checkable",
];

function digest(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function assertCase(value: unknown, line: number): asserts value is ClaimEvidenceBenchmarkCaseV1 {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`Holdout line ${line} is not an object.`);
  const item = value as Record<string, unknown>;
  const claim = item.claim as Record<string, unknown> | undefined;
  if (item.version !== 1 || typeof item.caseId !== "string" || !/^wcv-ceb-v1-holdout-(nl|en)-\d{2}$/.test(item.caseId)) {
    throw new Error(`Holdout line ${line} has an invalid version or case ID.`);
  }
  if (item.locale !== "nl" && item.locale !== "en") throw new Error(`Holdout line ${line} has an invalid locale.`);
  if (typeof item.cvText !== "string" || typeof item.proposalText !== "string" || typeof item.sourceChecksum !== "string") {
    throw new Error(`Holdout line ${line} is missing source text or checksum.`);
  }
  if (digest(item.cvText) !== item.sourceChecksum) throw new Error(`Holdout line ${line} source checksum does not resolve.`);
  if (!claim || typeof claim.text !== "string" || typeof claim.start !== "number" || typeof claim.end !== "number") {
    throw new Error(`Holdout line ${line} has an invalid claim span.`);
  }
  if (item.proposalText.slice(claim.start, claim.end) !== claim.text) throw new Error(`Holdout line ${line} claim span does not resolve.`);
  if (!verdicts.includes(claim.expectedVerdict as ProposalClaimVerdict)) throw new Error(`Holdout line ${line} has an invalid verdict.`);
  if (claim.acceptedSourceSpan != null) {
    const span = claim.acceptedSourceSpan as Record<string, unknown>;
    if (typeof span.start !== "number" || typeof span.end !== "number" || typeof span.text !== "string") {
      throw new Error(`Holdout line ${line} has an invalid accepted source span.`);
    }
    if (item.cvText.slice(span.start, span.end) !== span.text) throw new Error(`Holdout line ${line} accepted source span does not resolve.`);
  }
}

export function parsePrivateHoldoutJsonl(source: string): ClaimEvidenceBenchmarkCaseV1[] {
  const cases = source.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line, index) => {
    let value: unknown;
    try {
      value = JSON.parse(line);
    } catch {
      throw new Error(`Holdout line ${index + 1} is not valid JSON.`);
    }
    assertCase(value, index + 1);
    return value;
  });

  if (cases.length !== 40) throw new Error(`Private holdout must contain exactly 40 cases; received ${cases.length}.`);
  if (cases.filter((item) => item.locale === "nl").length !== 20 || cases.filter((item) => item.locale === "en").length !== 20) {
    throw new Error("Private holdout must contain exactly 20 Dutch and 20 English cases.");
  }
  if (new Set(cases.map((item) => item.caseId)).size !== cases.length) throw new Error("Private holdout case IDs must be unique.");

  const classCounts = new Map<ProposalClaimVerdict, number>(verdicts.map((verdict) => [verdict, 0]));
  for (const item of cases) classCounts.set(item.claim.expectedVerdict, (classCounts.get(item.claim.expectedVerdict) || 0) + 1);
  for (const [verdict, count] of classCounts) {
    if (count < 4) throw new Error(`Private holdout verdict ${verdict} is below the 10% minimum (${count}/40).`);
  }
  return cases;
}

export async function loadPrivateClaimEvidenceHoldout(): Promise<{
  cases: ClaimEvidenceBenchmarkCaseV1[];
  fileChecksum: string;
}> {
  const path = process.env.CLAIM_BENCHMARK_HOLDOUT_PATH?.trim();
  const expectedChecksum = process.env.CLAIM_BENCHMARK_HOLDOUT_SHA256?.trim().toLowerCase();
  if (!path) throw new Error("CLAIM_BENCHMARK_HOLDOUT_PATH is required for private evaluation.");
  if (!expectedChecksum || !/^[a-f0-9]{64}$/.test(expectedChecksum)) {
    throw new Error("CLAIM_BENCHMARK_HOLDOUT_SHA256 must contain the approved 64-character SHA-256 checksum.");
  }

  const source = await readFile(path, "utf8");
  const fileChecksum = digest(source);
  if (fileChecksum !== expectedChecksum) throw new Error("Private benchmark checksum does not match the approved manifest.");
  return { cases: parsePrivateHoldoutJsonl(source), fileChecksum };
}
