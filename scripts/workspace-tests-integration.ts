import assert from "node:assert/strict";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { sampleCV } from "@/lib/cv";
import { createMatchPackCvDocument, createPersonalCvDocument } from "@/lib/workspace/cv-document-service";
import { authorizeCvDocument, CvAuthorizationError } from "@/lib/workspace/cv-authorization";
import { requireAgencyTestDatabase } from "./agency-tests-db-guard";

const { runId } = requireAgencyTestDatabase();
const ownerEmail = `workspace-owner-${runId}@example.test`;
const memberEmail = `workspace-member-${runId}@example.test`;

async function main() {
  const now = new Date();
  const owner = await prisma.user.create({ data: { email: ownerEmail } });
  const member = await prisma.user.create({ data: { email: memberEmail } });
  const subscription = await prisma.agencySubscription.create({ data: {
    userId: owner.id, status: "active", currentPeriodStart: new Date(now.getTime() - 60_000),
    currentPeriodEnd: new Date(now.getTime() + 30 * 86400000), retentionPolicySetAt: now,
    retentionUpdatedAt: now, monthlyLimit: 50, excludeFromProductMetrics: true,
  } });
  const membership = await prisma.agencyTeamMember.create({
    data: { subscriptionId: subscription.id, userId: member.id, email: memberEmail, role: "editor", status: "invited" },
  });
  const input = {
    title: "Workspace fixture", data: structuredClone(sampleCV) as unknown as Prisma.InputJsonValue,
    templateId: "professional", colorThemeId: "classic-blue", startSource: "workspace_test",
  };

  const personal = await createPersonalCvDocument(owner.id, input);
  assert.equal(personal.agencySubscriptionId, null);
  assert.equal(await prisma.agencyCvUsage.count({ where: { cvId: personal.id } }), 0);

  const matchpack = await createMatchPackCvDocument(owner.id, { ...input, title: "MatchPack fixture", startSource: "agency_plan" });
  assert.equal(matchpack.agencySubscriptionId, subscription.id);
  assert.equal(await prisma.agencyCvUsage.count({ where: { cvId: matchpack.id } }), 1);

  await assert.rejects(() => authorizeCvDocument(member.id, matchpack.id, "read"),
    (error) => error instanceof CvAuthorizationError && error.code === "CV_WORKSPACE_FORBIDDEN");
  await prisma.agencyTeamMember.update({ where: { id: membership.id }, data: { status: "active", acceptedAt: now } });
  assert.equal((await authorizeCvDocument(member.id, matchpack.id, "edit_content")).workspace.kind, "matchpack");

  const personalIds = await prisma.cVDocument.findMany({ where: { userId: owner.id, agencySubscriptionId: null }, select: { id: true } });
  const agencyIds = await prisma.cVDocument.findMany({ where: { agencySubscriptionId: subscription.id }, select: { id: true } });
  assert.deepEqual(personalIds.map((row) => row.id), [personal.id]);
  assert.deepEqual(agencyIds.map((row) => row.id), [matchpack.id]);
  await assert.rejects(() => authorizeCvDocument(owner.id, matchpack.id, "personal_checkout"),
    (error) => error instanceof CvAuthorizationError && error.code === "CV_WORKSPACE_FORBIDDEN");
  console.log(JSON.stringify({ workspaceIntegration: "passed", invitedRejected: true, listsExclusive: true, quotaSeparated: true }));
}

main().catch((error) => {
  console.error(JSON.stringify({ workspaceIntegration: "failed", code: error instanceof Error ? error.message : "unknown" }));
  process.exitCode = 1;
}).finally(async () => {
  const owner = await prisma.user.findUnique({ where: { email: ownerEmail }, select: { id: true } });
  const member = await prisma.user.findUnique({ where: { email: memberEmail }, select: { id: true } });
  if (owner) {
    const subscription = await prisma.agencySubscription.findUnique({ where: { userId: owner.id }, select: { id: true } });
    await prisma.cVDocument.deleteMany({ where: { userId: owner.id } });
    if (subscription) await prisma.agencySubscription.delete({ where: { id: subscription.id } });
    await prisma.user.delete({ where: { id: owner.id } });
  }
  if (member) await prisma.user.delete({ where: { id: member.id } });
  await prisma.$disconnect();
});
