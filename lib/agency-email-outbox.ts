import { prisma } from "@/lib/prisma";
import { sendAgencyTransactionalEmail, type AgencyTransactionalEmailKind } from "@/lib/email";

export async function enqueueAgencyWelcomeEmail(input: { subscriptionId: string; recipientEmail: string; locale?: string }) {
  return prisma.agencyTransactionalEmail.upsert({
    where: { subscriptionId_kind: { subscriptionId: input.subscriptionId, kind: "agency_welcome_v1" } },
    update: {},
    create: {
      subscriptionId: input.subscriptionId,
      kind: "agency_welcome_v1",
      recipientEmail: input.recipientEmail.trim().toLowerCase(),
      locale: input.locale === "en" ? "en" : "nl",
    },
  });
}

export async function processAgencyEmailOutbox(limit = 20, options: {
  now?: Date;
  send?: typeof sendAgencyTransactionalEmail;
} = {}) {
  const now = options.now || new Date();
  const send = options.send || sendAgencyTransactionalEmail;
  await prisma.agencyTransactionalEmail.updateMany({
    where: { status: "sending", claimedAt: { lt: new Date(now.getTime() - 15 * 60 * 1000) } },
    data: { status: "failed", lastErrorCode: "SMTP_RESULT_UNKNOWN" },
  });
  const jobs = await prisma.agencyTransactionalEmail.findMany({
    where: { status: { in: ["pending", "retry"] }, attemptCount: { lt: 3 } },
    orderBy: { createdAt: "asc" },
    take: Math.max(1, Math.min(100, limit)),
  });
  let sent = 0;
  let failed = 0;
  for (const job of jobs) {
    const claimedAt = new Date();
    const claim = await prisma.agencyTransactionalEmail.updateMany({
      where: { id: job.id, status: job.status, attemptCount: job.attemptCount },
      data: { status: "sending", claimedAt, attemptCount: { increment: 1 }, lastErrorCode: null },
    });
    if (claim.count !== 1) continue;
    try {
      await send({
        kind: job.kind as AgencyTransactionalEmailKind,
        recipientEmail: job.recipientEmail,
        locale: job.locale,
      });
      await prisma.agencyTransactionalEmail.update({ where: { id: job.id }, data: { status: "sent", sentAt: new Date() } });
      sent += 1;
    } catch (error) {
      const code = error instanceof Error && error.message === "SMTP_NOT_CONFIGURED"
        ? "SMTP_NOT_CONFIGURED"
        : "SMTP_RESULT_UNKNOWN";
      await prisma.agencyTransactionalEmail.update({
        where: { id: job.id },
        data: { status: code === "SMTP_NOT_CONFIGURED" ? "retry" : "failed", lastErrorCode: code },
      });
      failed += 1;
    }
  }
  return { selected: jobs.length, sent, failed };
}
