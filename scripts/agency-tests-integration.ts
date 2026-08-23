import assert from "node:assert/strict";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { sampleCV } from "@/lib/cv";
import { anonymizeCvData, attachEvidenceReferences, createDefaultMatchPackSubmission, createMatchPackAnalysis } from "@/lib/agency-matchpack";
import { applyEvidenceReviews, MatchPackReviewError } from "@/lib/agency-matchpack-review";
import { createMatchPackSource } from "@/lib/agency-matchpack-source";
import { approveAgencyMatchPackForUser, createAgencyCvDocumentsAtomically, isAgencyAccessError } from "@/lib/agency-access";
import { applyRetentionPolicyChange, deleteAgencyMatchPackContent, previewRetentionPolicyChange } from "@/lib/agency-retention";
import { enqueueAgencyWelcomeEmail, processAgencyEmailOutbox } from "@/lib/agency-email-outbox";
import { requireAgencyTestDatabase } from "./agency-tests-db-guard";

const { runId } = requireAgencyTestDatabase();
const email = `agency-${runId}@example.test`;

async function main() {
  const now = new Date();
  const user = await prisma.user.create({ data: { email } });
  const subscription = await prisma.agencySubscription.create({ data: {
    userId: user.id, status: "active", currentPeriodStart: new Date(now.getTime() - 60_000), currentPeriodEnd: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
    retentionDays: 90, retentionPolicySetAt: now, retentionUpdatedAt: now, monthlyLimit: 5, excludeFromProductMetrics: true,
  } });
  const queued = await Promise.all([
    enqueueAgencyWelcomeEmail({ subscriptionId: subscription.id, recipientEmail: email, locale: "nl" }),
    enqueueAgencyWelcomeEmail({ subscriptionId: subscription.id, recipientEmail: email, locale: "nl" }),
  ]);
  assert.equal(queued[0].id, queued[1].id);
  assert.equal(await prisma.agencyTransactionalEmail.count({ where: { subscriptionId: subscription.id } }), 1);
  let mailSends = 0;
  const firstMailRun = await processAgencyEmailOutbox(10, { send: async () => { mailSends += 1; } });
  const secondMailRun = await processAgencyEmailOutbox(10, { send: async () => { mailSends += 1; } });
  assert.deepEqual({ sent: firstMailRun.sent, secondSelected: secondMailRun.selected, mailSends }, { sent: 1, secondSelected: 0, mailSends: 1 });
  const candidate = structuredClone(sampleCV);
  candidate.personal.name = "Mila Vermeer";
  candidate.personal.email = "mila.vermeer@example.test";
  candidate.personal.phone = "+31 20 555 0142";
  const source = createMatchPackSource("docx", "Adviseerde 24 teamleiders over complexe verzuimdossiers.");
  const vacancyText = "Adviseer minimaal twintig teamleiders.\nAFAS-ervaring is vereist.";
  const rawResult = {
    score: 72, scoreBand: "good" as const, scoreLabel: "Goed", summary: "Relevant profiel met één open punt.", perceivedRole: "HR-adviseur", perceivedSeniority: "senior",
    dimensions: [{ id: "evidence" as const, label: "Bewijs", score: 20, maxScore: 30, explanation: "Eén eis ondersteund." }], strengths: [{ title: "Advies", evidence: "24 teamleiders" }],
    requirements: [
      { requirement: "Advies aan twintig teamleiders", vacancyEvidence: "Adviseer minimaal twintig teamleiders.", importance: "essential" as const, status: "strong" as const, cvEvidence: "Adviseerde 24 teamleiders over complexe verzuimdossiers.", honestAction: "Geen aanvullende actie." },
      { requirement: "AFAS", vacancyEvidence: "AFAS-ervaring is vereist.", importance: "essential" as const, status: "missing" as const, cvEvidence: "", honestAction: "Vraag AFAS-ervaring na." },
    ], missingKeywords: ["AFAS"], topFixes: [], limitations: ["Fictional test fixture"],
  };
  const referenced = attachEvidenceReferences(rawResult, source.text, "docx", vacancyText, source.sourceMap);
  const anonymized = anonymizeCvData(candidate, "nl");
  const baseAnalysis = createMatchPackAnalysis(referenced, anonymized, { fileType: "docx", digest: source.digest });
  const submission = createDefaultMatchPackSubmission(candidate, referenced, "HR-adviseur", "nl");
  const pack = await prisma.agencyMatchPack.create({ data: {
    userId: user.id, title: "Integration MatchPack", vacancyTitle: "HR-adviseur", vacancyText, locale: "nl", sourceFileType: "docx", sourceText: source.text,
    sourceMap: source.sourceMap as unknown as Prisma.InputJsonValue, sourceTextDigest: source.digest, originalCandidateData: candidate as unknown as Prisma.InputJsonValue,
    candidateData: candidate as unknown as Prisma.InputJsonValue, anonymizedData: anonymized.data as unknown as Prisma.InputJsonValue, analysis: baseAnalysis as unknown as Prisma.InputJsonValue,
    submissionData: submission as unknown as Prisma.InputJsonValue, retentionExpiresAt: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000),
    revisions: { create: { version: 1, reason: "analysis_created", candidateData: candidate as unknown as Prisma.InputJsonValue, submissionData: submission as unknown as Prisma.InputJsonValue, analysis: baseAnalysis as unknown as Prisma.InputJsonValue, changedFields: ["analysis"], createdById: user.id } },
  } });
  const approvalInput = { userId: user.id, matchPackId: pack.id, approvedById: user.id, expectedUpdatedAt: pack.updatedAt, expectedRevisionVersion: 1, selectedVariant: "contact_free" as const, confirmations: { evidenceReviewed: true as const, candidateDataReviewed: true as const, clientCopyReviewed: true as const, sharingAuthorityConfirmed: true as const } };
  await assert.rejects(() => approveAgencyMatchPackForUser(approvalInput), (error) => error instanceof MatchPackReviewError && error.code === "REVIEW_INCOMPLETE");
  const reviewed = applyEvidenceReviews(baseAnalysis, [
    { requirementIndex: 0, reviewerStatus: "confirmed", reviewerNote: "", reviewedEvidence: referenced.requirements[0].cvEvidence, reviewedSource: null },
    { requirementIndex: 1, reviewerStatus: "rejected", reviewerNote: "Niet in CV", reviewedEvidence: "", reviewedSource: null },
  ], user.id, source.text, source.sourceMap);
  const refreshed = await prisma.agencyMatchPack.update({ where: { id: pack.id }, data: { analysis: reviewed as unknown as Prisma.InputJsonValue }, select: { updatedAt: true } });
  await prisma.agencyMatchPackRevision.update({ where: { matchPackId_version: { matchPackId: pack.id, version: 1 } }, data: { analysis: reviewed as unknown as Prisma.InputJsonValue } });
  const concurrentInput = { ...approvalInput, expectedUpdatedAt: refreshed.updatedAt };
  const approvals = await Promise.all([approveAgencyMatchPackForUser(concurrentInput), approveAgencyMatchPackForUser(concurrentInput)]);
  assert.equal(new Set(approvals.map((result) => result.cv.id)).size, 1);
  const approved = await prisma.agencyMatchPack.findUniqueOrThrow({ where: { id: pack.id } });
  assert.equal(approved.status, "approved");
  assert.equal(approved.unsupportedClaimsCaught, 1);
  assert.ok(approved.approvedSnapshotDigest);
  const usageBeforeDelete = await prisma.agencyCvUsage.count({ where: { period: { subscriptionId: subscription.id } } });
  assert.equal(usageBeforeDelete, 1);
  const deletion = await deleteAgencyMatchPackContent({ matchPackId: pack.id, ownerUserId: user.id, subscriptionId: subscription.id, actorUserId: user.id, reason: "integration_test" });
  assert.equal(deletion?.matchPacksDeleted, 1);
  assert.equal(await prisma.agencyCvUsage.count({ where: { period: { subscriptionId: subscription.id } } }), usageBeforeDelete);
  const csvRows = [1, 2].map((index) => ({ title: `CSV ${index}`, data: candidate as unknown as Prisma.InputJsonValue, templateId: "professional", colorThemeId: "classic-blue", sourceCluster: "agency-csv-import", startSource: "agency_plan", userId: user.id }));
  await prisma.agencySubscription.update({ where: { id: subscription.id }, data: { retentionPolicySetAt: null } });
  await assert.rejects(() => createAgencyCvDocumentsAtomically(user.id, csvRows), (error) => isAgencyAccessError(error) && error.code === "RETENTION_POLICY_REQUIRED");
  assert.equal(await prisma.cVDocument.count({ where: { userId: user.id } }), 0);
  await prisma.agencySubscription.update({ where: { id: subscription.id }, data: { retentionPolicySetAt: now } });
  assert.equal((await createAgencyCvDocumentsAtomically(user.id, csvRows)).length, 2);
  const retentionPack = await prisma.agencyMatchPack.create({ data: {
    userId: user.id, title: "Retention race", vacancyText, locale: "nl", sourceFileType: "docx", sourceText: source.text,
    sourceMap: source.sourceMap as unknown as Prisma.InputJsonValue, sourceTextDigest: source.digest, originalCandidateData: candidate as unknown as Prisma.InputJsonValue,
    candidateData: candidate as unknown as Prisma.InputJsonValue, anonymizedData: anonymized.data as unknown as Prisma.InputJsonValue, analysis: baseAnalysis as unknown as Prisma.InputJsonValue,
    submissionData: submission as unknown as Prisma.InputJsonValue, retentionExpiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  } });
  const stalePreview = await previewRetentionPolicyChange(subscription.id, 30, new Date());
  await prisma.agencyMatchPack.update({ where: { id: retentionPack.id }, data: { title: "Retention race changed" } });
  await assert.rejects(() => applyRetentionPolicyChange(subscription.id, 30, { previewAt: stalePreview.previewAt, previewToken: stalePreview.previewToken, confirmation: "APPLY RETENTION POLICY" }), /RETENTION_PREVIEW_STALE/u);
  const currentPreview = await previewRetentionPolicyChange(subscription.id, 30, new Date());
  await applyRetentionPolicyChange(subscription.id, 30, { previewAt: currentPreview.previewAt, previewToken: currentPreview.previewToken, confirmation: "APPLY RETENTION POLICY" });
  assert.equal((await prisma.agencySubscription.findUniqueOrThrow({ where: { id: subscription.id } })).retentionDays, 30);
  console.log(JSON.stringify({ integration: "passed", concurrentApproval: true, atomicCsv: true, quotaPreserved: true, welcomeEmailExactlyOnce: true, retentionRaceRejected: true }));
}

main().catch((error) => {
  console.error(JSON.stringify({ integration: "failed", code: error instanceof Error ? error.message : "unknown" }));
  process.exitCode = 1;
}).finally(async () => {
  const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (user) {
    const subscription = await prisma.agencySubscription.findUnique({ where: { userId: user.id }, select: { id: true } });
    await prisma.agencyMatchPack.deleteMany({ where: { userId: user.id } });
    await prisma.cVDocument.deleteMany({ where: { userId: user.id } });
    if (subscription) await prisma.agencySubscription.delete({ where: { id: subscription.id } });
    await prisma.user.delete({ where: { id: user.id } });
  }
  await prisma.$disconnect();
});
