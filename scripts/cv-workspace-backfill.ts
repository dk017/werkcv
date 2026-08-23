import "dotenv/config";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { prisma } from "@/lib/prisma";

const EXECUTE = process.argv.includes("--execute");
const BATCH_SIZE = 100;
const LEGACY_MARKERS = new Set(["agency_plan", "agency_matchpack", "agency-matchpack", "agency-csv-import"]);

type Candidate = { subscriptionId: string; evidence: string };

function addCandidate(map: Map<string, Map<string, Set<string>>>, cvId: string, candidate: Candidate) {
  const bySubscription = map.get(cvId) || new Map<string, Set<string>>();
  const evidence = bySubscription.get(candidate.subscriptionId) || new Set<string>();
  evidence.add(candidate.evidence);
  bySubscription.set(candidate.subscriptionId, evidence);
  map.set(cvId, bySubscription);
}

function hasLegacyMarker(startSource: string | null, sourceCluster: string | null): string | null {
  if (startSource && LEGACY_MARKERS.has(startSource)) return `startSource:${startSource}`;
  if (sourceCluster && LEGACY_MARKERS.has(sourceCluster)) return `sourceCluster:${sourceCluster}`;
  return null;
}

function redactIds(ids: string[]): string[] { return ids.slice(0, 100); }

function batches<T>(items: T[], size = BATCH_SIZE): T[][] {
  const result: T[][] = [];
  for (let index = 0; index < items.length; index += size) result.push(items.slice(index, index + size));
  return result;
}

async function main() {
  const documents = await prisma.cVDocument.findMany({
    select: { id: true, userId: true, agencySubscriptionId: true, startSource: true, sourceCluster: true },
  });
  const packs = await prisma.agencyMatchPack.findMany({ select: { id: true, userId: true, cvDocumentId: true } });
  const subscriptions = await prisma.agencySubscription.findMany({ select: { id: true, userId: true } });
  const usageRows = await prisma.agencyCvUsage.findMany({ select: { cvId: true, period: { select: { subscriptionId: true } } } });
  const members = await prisma.agencyTeamMember.findMany({ select: { userId: true, status: true, subscriptionId: true } });
  const paidOrders = await prisma.order.findMany({ where: { paidAt: { not: null }, cvId: { not: null } }, select: { cvId: true } });

  const subscriptionByOwner = new Map(subscriptions.map((subscription) => [subscription.userId, subscription.id]));
  const existingDocumentIds = new Set(documents.map((document) => document.id));
  const candidates = new Map<string, Map<string, Set<string>>>();
  const orphanPackIds: string[] = [];
  const orphanUsageCvIds: string[] = [];

  for (const pack of packs) {
    if (!pack.cvDocumentId) continue;
    const subscriptionId = subscriptionByOwner.get(pack.userId);
    if (!existingDocumentIds.has(pack.cvDocumentId) || !subscriptionId) { orphanPackIds.push(pack.id); continue; }
    if (subscriptionId) addCandidate(candidates, pack.cvDocumentId, { subscriptionId, evidence: "matchpack_link" });
  }
  for (const usage of usageRows) {
    if (!existingDocumentIds.has(usage.cvId)) { orphanUsageCvIds.push(usage.cvId); continue; }
    addCandidate(candidates, usage.cvId, { subscriptionId: usage.period.subscriptionId, evidence: "usage_ledger" });
  }

  const agencySourceCounts: Record<string, number> = {};
  const agencyMarkedWithoutSubscription: string[] = [];
  for (const document of documents) {
    const marker = hasLegacyMarker(document.startSource, document.sourceCluster);
    if (!marker) continue;
    agencySourceCounts[marker] = (agencySourceCounts[marker] || 0) + 1;
    const subscriptionId = document.userId ? subscriptionByOwner.get(document.userId) : undefined;
    if (subscriptionId) addCandidate(candidates, document.id, { subscriptionId, evidence: marker });
    else agencyMarkedWithoutSubscription.push(document.id);
  }

  const conflicts: Array<{ cvId: string; subscriptionIds: string[] }> = [];
  const eligible: Array<{ cvId: string; subscriptionId: string; evidence: string[] }> = [];
  const currently = { personal: 0, matchpack: 0 };
  for (const document of documents) {
    if (document.agencySubscriptionId) currently.matchpack += 1; else currently.personal += 1;
    const map = candidates.get(document.id);
    if (!map) continue;
    const subscriptionIds = [...map.keys()];
    if (subscriptionIds.length !== 1) { conflicts.push({ cvId: document.id, subscriptionIds }); continue; }
    const subscriptionId = subscriptionIds[0];
    if (document.agencySubscriptionId && document.agencySubscriptionId !== subscriptionId) {
      conflicts.push({ cvId: document.id, subscriptionIds: [document.agencySubscriptionId, subscriptionId] });
      continue;
    }
    if (!document.agencySubscriptionId) eligible.push({ cvId: document.id, subscriptionId, evidence: [...(map.get(subscriptionId) || [])] });
  }

  const activeMembershipsByUser = new Map<string, Set<string>>();
  for (const member of members) {
    if (member.status !== "active" || !member.userId) continue;
    const ids = activeMembershipsByUser.get(member.userId) || new Set<string>();
    ids.add(member.subscriptionId); activeMembershipsByUser.set(member.userId, ids);
  }
  const multipleWorkspaceUsers = [...activeMembershipsByUser.entries()].filter(([, ids]) => ids.size > 1).map(([userId]) => userId);
  const directAndActiveMembershipUsers = subscriptions
    .filter((subscription) => (activeMembershipsByUser.get(subscription.userId)?.size || 0) > 0)
    .map((subscription) => subscription.userId);
  const paidOrderDocumentIds = new Set(paidOrders.flatMap((order) => order.cvId ? [order.cvId] : []));
  const paidAgencyOrders = documents
    .filter((document) => {
      if (!paidOrderDocumentIds.has(document.id)) return false;
      if (document.agencySubscriptionId) return true;
      return (candidates.get(document.id)?.size || 0) === 1;
    })
    .map((document) => document.id);

  const blockingIssueCount = conflicts.length
    + agencyMarkedWithoutSubscription.length
    + orphanPackIds.length
    + orphanUsageCvIds.length;

  let updatedDocuments = 0;
  const verificationFailures: string[] = [];
  if (EXECUTE && blockingIssueCount === 0) {
    for (const batch of batches(eligible)) {
      updatedDocuments += await prisma.$transaction(async (tx) => {
        let batchUpdated = 0;
        for (const row of batch) {
          const updated = await tx.cVDocument.updateMany({
            where: { id: row.cvId, agencySubscriptionId: null },
            data: { agencySubscriptionId: row.subscriptionId },
          });
          if (updated.count === 0) {
            const current = await tx.cVDocument.findUnique({ where: { id: row.cvId }, select: { agencySubscriptionId: true } });
            if (current?.agencySubscriptionId !== row.subscriptionId) throw new Error("BACKFILL_CONCURRENT_CLASSIFICATION_CONFLICT");
          } else {
            batchUpdated += updated.count;
          }
        }
        return batchUpdated;
      });
    }

    // Verify independently after all write transactions have committed.
    for (const batch of batches(eligible)) {
      const verified = await prisma.cVDocument.findMany({
        where: { id: { in: batch.map((row) => row.cvId) } },
        select: { id: true, agencySubscriptionId: true },
      });
      const byId = new Map(verified.map((row) => [row.id, row.agencySubscriptionId]));
      for (const row of batch) {
        if (byId.get(row.cvId) !== row.subscriptionId) verificationFailures.push(row.cvId);
      }
    }
  }

  const report = {
    generatedAt: new Date().toISOString(), mode: EXECUTE ? "execute" : "dry_run",
    totals: {
      documents: documents.length, currentlyPersonal: currently.personal, currentlyMatchPack: currently.matchpack,
      eligibleToClassify: eligible.length, conflicts: conflicts.length,
      agencyMarkedWithoutSubscription: agencyMarkedWithoutSubscription.length,
      orphanPackLinks: orphanPackIds.length, orphanUsageRows: orphanUsageCvIds.length,
      multipleWorkspaceUsers: multipleWorkspaceUsers.length, paidAgencyOrders: paidAgencyOrders.length,
      directAndActiveMembershipUsers: directAndActiveMembershipUsers.length,
      blockingIssueCount,
      updatedDocuments,
      postExecutionVerificationFailures: verificationFailures.length,
    },
    agencySourceCounts,
    conflictDocumentIds: redactIds(conflicts.map((row) => row.cvId)),
    agencyMarkedWithoutSubscriptionIds: redactIds(agencyMarkedWithoutSubscription),
    orphanPackIds: redactIds(orphanPackIds), orphanUsageCvIds: redactIds(orphanUsageCvIds),
    multipleWorkspaceUserIds: redactIds(multipleWorkspaceUsers), paidAgencyOrderDocumentIds: redactIds(paidAgencyOrders),
    directAndActiveMembershipUserIds: redactIds(directAndActiveMembershipUsers),
    postExecutionVerificationFailureIds: redactIds(verificationFailures),
    eligibleSample: eligible.slice(0, 100).map((row) => row.cvId),
  };
  const reportDirectory = join(process.cwd(), ".codex-tmp", "workspace-reports");
  await mkdir(reportDirectory, { recursive: true });
  const reportPath = join(reportDirectory, `cv-workspace-backfill-${Date.now()}.json`);
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(report, null, 2));
  if (blockingIssueCount > 0) process.exitCode = 2;
  if (verificationFailures.length > 0) process.exitCode = 3;
}

main().catch((error) => {
  console.error("cv_workspace_backfill_failed", error instanceof Error ? error.message : "unknown");
  process.exitCode = 1;
}).finally(async () => { await prisma.$disconnect(); });
