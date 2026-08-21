import test from "node:test";
import assert from "node:assert/strict";
import { sampleCV } from "../lib/cv";
import { createMatchPackSource, resolveMatchPackSourceReference } from "../lib/agency-matchpack-source";
import { matchPackApprovalRequestSchema } from "../lib/agency-matchpack-review";
import { ApprovedSnapshotIntegrityError, assertApprovedSnapshotIntegrity, createApprovedSnapshotDigest } from "../lib/agency-matchpack-approval";
import { AgencyCsvError, csvEscape, parseCsv } from "../lib/agency-csv";
import { clientAcceptanceSummary, deriveMatchPackDurations } from "../lib/agency-metrics";
import { feedbackContainsCandidateContent } from "../lib/agency-feedback";

test("PDF source map preserves page boundaries and DOCX never invents pages", () => {
  const pdf = createMatchPackSource("pdf", "Page one evidence\nPage two evidence", [
    { pageNumber: 1, text: "Page one evidence" },
    { pageNumber: 2, text: "Page two evidence" },
  ]);
  assert.equal(resolveMatchPackSourceReference(pdf.text, "Page two evidence", pdf.sourceMap).sourcePage, 2);
  const docx = createMatchPackSource("docx", "Line one\nLine two");
  assert.deepEqual(docx.sourceMap.pages, []);
  assert.equal(resolveMatchPackSourceReference(docx.text, "Line two", docx.sourceMap).sourcePage, null);
});

test("approval request rejects missing confirmations and arbitrary browser metrics", () => {
  const valid = {
    version: 1,
    expectedUpdatedAt: "2026-08-20T00:00:00.000Z",
    expectedRevisionVersion: 2,
    selectedVariant: "contact_free",
    confirmations: { evidenceReviewed: true, candidateDataReviewed: true, clientCopyReviewed: true, sharingAuthorityConfirmed: true },
  };
  assert.equal(matchPackApprovalRequestSchema.safeParse(valid).success, true);
  assert.equal(matchPackApprovalRequestSchema.safeParse({ ...valid, correctionsCount: 99 }).success, false);
  assert.equal(matchPackApprovalRequestSchema.safeParse({ ...valid, confirmations: { ...valid.confirmations, evidenceReviewed: false } }).success, false);
});

test("approved snapshot digest is canonical and changes with revision", () => {
  const base = { candidateData: { b: 2, a: 1 }, submissionData: {}, analysis: {}, selectedVariant: "full" as const, templateId: "professional", colorThemeId: "classic-blue", revisionVersion: 3 };
  const reordered = { ...base, candidateData: { a: 1, b: 2 } };
  assert.equal(createApprovedSnapshotDigest(base), createApprovedSnapshotDigest(reordered));
  assert.notEqual(createApprovedSnapshotDigest(base), createApprovedSnapshotDigest({ ...base, revisionVersion: 4 }));
  const approvalData = {
    version: 1 as const,
    selectedVariant: "full" as const,
    confirmations: { evidenceReviewed: true as const, candidateDataReviewed: true as const, clientCopyReviewed: true as const, sharingAuthorityConfirmed: true as const },
    approvedAt: "2026-08-20T00:00:00.000Z",
    approvedById: "reviewer-1",
    revisionVersion: 3,
  };
  const integrityInput = { ...base, approvalData, approvedRevisionVersion: 3, approvedSnapshotDigest: createApprovedSnapshotDigest(base) };
  assert.doesNotThrow(() => assertApprovedSnapshotIntegrity(integrityInput));
  assert.throws(() => assertApprovedSnapshotIntegrity({ ...integrityInput, candidateData: { a: 1, b: 3 } }), ApprovedSnapshotIntegrityError);
});

test("CSV neutralizes spreadsheet formulas including leading whitespace", () => {
  for (const value of ['=HYPERLINK("https://example.test")', "+SUM(1,1)", "-1+2", "@cmd", "  =1+1"]) {
    assert.match(csvEscape(value), /^"?'\s*[=+\-@]/u);
  }
  assert.throws(() => parseCsv("name,name\nA,B"), (error) => error instanceof AgencyCsvError && error.code === "CSV_DUPLICATE_HEADER");
  assert.throws(() => parseCsv("name,\nA,B"), (error) => error instanceof AgencyCsvError && error.code === "CSV_EMPTY_HEADER");
});

test("metrics use server timestamps and include withdrawn in acceptance denominator", () => {
  const values = deriveMatchPackDurations({
    createdAt: new Date("2026-08-20T10:00:00Z"),
    approvedAt: new Date("2026-08-20T10:05:00Z"),
    firstExportedAt: new Date("2026-08-20T10:07:30Z"),
  });
  assert.deepEqual(values, { uploadToApprovalSeconds: 300, approvalToFirstExportSeconds: 150 });
  assert.deepEqual(clientAcceptanceSummary(["accepted", "rejected", "withdrawn", "pending", "unknown"]), { accepted: 1, denominator: 3, rate: 1 / 3 });
});

test("product feedback rejects candidate names, contact data and copied source phrases", () => {
  const candidate = structuredClone(sampleCV);
  candidate.personal.name = "Mila Vermeer";
  const base = { candidateData: candidate, sourceText: "one two three four five six seven eight nine", vacancyText: "", clientIntroduction: "", clientEmailBody: "" };
  assert.equal(feedbackContainsCandidateContent({ ...base, note: "Mila needs changes" }), true);
  assert.equal(feedbackContainsCandidateContent({ ...base, note: "mail mila@example.test" }), true);
  assert.equal(feedbackContainsCandidateContent({ ...base, note: "one two three four five six seven eight" }), true);
  assert.equal(feedbackContainsCandidateContent({ ...base, note: "The evidence table was clear." }), false);
});
