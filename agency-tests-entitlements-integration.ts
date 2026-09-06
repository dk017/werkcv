import assert from "node:assert/strict";
import { prisma } from "@/lib/prisma";
import { sampleCV } from "@/lib/cv";
import { createAgencyCvDocumentForUser, isAgencyAccessError } from "@/lib/agency-access";
import { syncAgencyBilling } from "@/lib/agency-billing";
import { saveCvDocumentWithMeaningfulState } from "@/lib/cv-meaningful-persistence";
import { requireAgencyTestDatabase } from "./scripts/agency-tests-db-guard";

const { runId } = requireAgencyTestDatabase();
const email = `agency-entitlements-${runId}@example.test`;

async function main() {
  const now = new Date();
  const periodStart = new Date(now.getTime() - 60_000);
  const periodEnd = new Date(now.getTime() + 30 * 86400000);
  const user = await prisma.user.create({ data: { email } });
  const subscription = await prisma.agencySubscription.create({ data: {
    userId: user.id,
    status: "active",
    currentPeriodStart: periodStart,
    currentPeriodEnd: periodEnd,
    retentionPolicySetAt: now,
    retentionUpdatedAt: now,
    monthlyLimit: 1,
    excludeFromProductMetrics: true,
  } });
  const input = {
    title: "Entitlement fixture",
    data: sampleCV,
    templateId: "professional",
    colorThemeId: "classic-blue",
    sourceCluster: "agency-entitlement-test",
    startSource: "agency_plan",
  };

  const competing = await Promise.allSettled([
    createAgencyCvDocumentForUser(user.id, { ...input, title: "Last credit A" }),
    createAgencyCvDocumentForUser(user.id, { ...input, title: "Last credit B" }),
  ]);
  const fulfilled = competing.filter((result): result is PromiseFulfilledResult<Awaited<ReturnType<typeof createAgencyCvDocumentForUser>>> => result.status === "fulfilled");
  const rejected = competing.filter((result): result is PromiseRejectedResult => result.status === "rejected");
  assert.equal(fulfilled.length, 1, "exactly one distinct request may reserve the last credit");
  assert.equal(rejected.length, 1);
  assert.equal(isAgencyAccessError(rejected[0].reason), true);
  assert.equal(rejected[0].reason.code, "AGENCY_QUOTA_REACHED");

  const period = await prisma.agencyUsagePeriod.findUniqueOrThrow({
    where: { subscriptionId_startsAt: { subscriptionId: subscription.id, startsAt: periodStart } },
  });
  assert.equal(period.allowance, 1);
  assert.equal(await prisma.agencyCvUsage.count({ where: { periodId: period.id } }), 1);

  const existingCv = fulfilled[0].value;
  const edited = structuredClone(sampleCV);
  edited.personal.title = "Edited after credit exhaustion";
  const saved = await saveCvDocumentWithMeaningfulState({
    id: existingCv.id,
    where: { id: existingCv.id, userId: user.id, agencySubscriptionId: subscription.id },
    data: edited,
    source: "manual_save",
    uiLanguage: "en",
  });
  assert.equal(saved.success, true, "an existing credited CV must remain editable at exhaustion");
  assert.equal(await prisma.agencyCvUsage.count({ where: { periodId: period.id } }), 1, "editing must not consume another credit");

  const customStart = new Date(periodEnd.getTime() + 86400000);
  const customEnd = new Date(customStart.getTime() + 30 * 86400000);
  await prisma.agencySubscription.update({ where: { id: subscription.id }, data: { monthlyLimit: 750 } });
  const renewal = { eventType: "subscription.renewed", email, status: "active", currentPeriodStart: customStart, currentPeriodEnd: customEnd } as const;
  await syncAgencyBilling(renewal);
  await syncAgencyBilling(renewal);
  assert.equal(await prisma.agencyUsagePeriod.count({ where: { subscriptionId: subscription.id, startsAt: customStart } }), 1, "renewal replay must be idempotent");
  assert.equal((await prisma.agencyUsagePeriod.findUniqueOrThrow({ where: { subscriptionId_startsAt: { subscriptionId: subscription.id, startsAt: customStart } } })).allowance, 750);

  await prisma.agencySubscription.update({ where: { id: subscription.id }, data: { monthlyLimit: 0 } });
  await syncAgencyBilling(renewal);
  assert.equal((await prisma.agencyUsagePeriod.findUniqueOrThrow({ where: { subscriptionId_startsAt: { subscriptionId: subscription.id, startsAt: customStart } } })).allowance, 750, "provider replay must not reduce a stored custom period");
  const zeroStart = customEnd;
  const zeroEnd = new Date(zeroStart.getTime() + 30 * 86400000);
  await syncAgencyBilling({ ...renewal, currentPeriodStart: zeroStart, currentPeriodEnd: zeroEnd });
  assert.equal((await prisma.agencyUsagePeriod.findUniqueOrThrow({ where: { subscriptionId_startsAt: { subscriptionId: subscription.id, startsAt: zeroStart } } })).allowance, 0, "a new period must inherit an intentional stored zero");

  console.log(JSON.stringify({ entitlements: "passed", distinctLastCredit: true, editAtExhaustion: true, renewalIdempotent: true, customAllowancePreserved: true, storedZeroPreserved: true }));
}

main().catch((error) => {
  console.error(JSON.stringify({ entitlements: "failed", code: error instanceof Error ? error.message : "unknown" }));
  process.exitCode = 1;
}).finally(async () => {
  const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (user) {
    const subscription = await prisma.agencySubscription.findUnique({ where: { userId: user.id }, select: { id: true } });
    await prisma.cVDocument.deleteMany({ where: { userId: user.id } });
    if (subscription) await prisma.agencySubscription.delete({ where: { id: subscription.id } });
    await prisma.user.delete({ where: { id: user.id } });
  }
  await prisma.$disconnect();
});
