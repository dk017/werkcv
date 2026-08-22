import { NextRequest, NextResponse } from "next/server";
import { claimBenchmarkPublicationEnabled } from "@/lib/agency-feature-flags";
import { publicClaimEvidenceBenchmarkV1, publicClaimEvidenceBenchmarkV1Checksum } from "@/lib/benchmark/claim-evidence-public-v1";

export const runtime = "nodejs";
function csvCell(value: unknown) { const text = typeof value === "string" ? value : JSON.stringify(value); return `"${text.replaceAll('"', '""')}"`; }

export async function GET(request: NextRequest) {
  if (!claimBenchmarkPublicationEnabled()) return NextResponse.json({ error: "The independently reviewed dataset has not been published yet.", code: "BENCHMARK_REVIEW_PENDING" }, { status: 404, headers: { "Cache-Control": "no-store" } });
  const format = request.nextUrl.searchParams.get("format") === "csv" ? "csv" : "jsonl";
  const body = format === "jsonl"
    ? publicClaimEvidenceBenchmarkV1.map((item) => JSON.stringify(item)).join("\n") + "\n"
    : [
      ["case_id", "locale", "occupational_family", "seniority", "source_format", "source_checksum", "cv_text", "proposal_text", "claim_start", "claim_end", "expected_verdict", "accepted_source_span", "error_category", "annotation_rationale"].map(csvCell).join(","),
      ...publicClaimEvidenceBenchmarkV1.map((item) => [item.caseId, item.locale, item.occupationalFamily, item.seniority, item.sourceFormat, item.sourceChecksum, item.cvText, item.proposalText, item.claim.start, item.claim.end, item.claim.expectedVerdict, item.claim.acceptedSourceSpan, item.claim.errorCategory, item.claim.annotationRationale].map(csvCell).join(",")),
    ].join("\r\n");
  return new NextResponse(body, { headers: { "Content-Type": format === "csv" ? "text/csv; charset=utf-8" : "application/x-ndjson; charset=utf-8", "Content-Disposition": `attachment; filename="werkcv-claim-evidence-benchmark-v1.${format === "csv" ? "csv" : "jsonl"}"`, "Cache-Control": "public, max-age=3600", "X-Content-SHA256": publicClaimEvidenceBenchmarkV1Checksum } });
}
