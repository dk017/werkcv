import "dotenv/config";
import nodemailer from "nodemailer";
import { prisma } from "../lib/prisma";
import {
  checkoutRecoverySendingApproved,
  ENGLISH_CHECKOUT_RECOVERY_TYPE,
} from "../lib/checkout-recovery";
import { isConsumerExcludedEmail } from "../lib/consumer-analytics-exclusions";

type FollowupTask = {
  id: string;
  email: string;
  type: string;
  status: string;
  reason: string;
  draftSubject: string | null;
  draftBody: string | null;
  dueAt: Date;
  sentAt: Date | null;
  relatedCvId: string | null;
  relatedOrderId: string | null;
  relatedUserId: string | null;
  createdAt: Date;
};

type ParseArgsResult = {
  dryRun: boolean;
  includeDrafts: boolean;
  limit: number;
  types: string[];
};

function parseArgs(): ParseArgsResult {
  const args = new Set(process.argv.slice(2));
  const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
  const typesArg = process.argv.find((arg) => arg.startsWith("--types="));
  const limitValue = limitArg ? Number(limitArg.replace("--limit=", "")) : 20;
  const limit = Number.isFinite(limitValue) && limitValue > 0 ? Math.floor(limitValue) : 20;
  const types = (typesArg ? typesArg.replace("--types=", "") : "")
    .split(",")
    .map((type) => type.trim())
    .filter(Boolean);

  return {
    dryRun: args.has("--dry-run"),
    includeDrafts: args.has("--include-drafts"),
    limit,
    types,
  };
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function getTransporter() {
  const host = process.env.FOLLOWUP_SMTP_HOST || process.env.SMTP_HOST;
  const user = process.env.FOLLOWUP_SMTP_USER || process.env.SMTP_USER;
  const pass = process.env.FOLLOWUP_SMTP_PASSWORD || process.env.SMTP_PASS;
  const port = Number(process.env.FOLLOWUP_SMTP_PORT || process.env.SMTP_PORT || 465);
  const secure = (process.env.FOLLOWUP_SMTP_SECURE ?? (process.env.SMTP_PORT === "465" ? "true" : "false")) !== "false";

  if (!host || !user || !pass) {
    throw new Error("FOLLOWUP_SMTP_HOST, FOLLOWUP_SMTP_USER and FOLLOWUP_SMTP_PASSWORD are required");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

function fromName(): string {
  return process.env.FOLLOWUP_FROM_NAME || "WerkCV";
}

function fromEmail(): string {
  return process.env.FOLLOWUP_FROM_EMAIL || process.env.AUTH_FROM_EMAIL || process.env.FOLLOWUP_SMTP_USER || process.env.SMTP_USER || "contact@werkcv.nl";
}

function replyToEmail(): string {
  return process.env.FOLLOWUP_REPLY_TO || fromEmail();
}

async function claimEnglishRecoveryForSend(task: FollowupTask): Promise<string | null> {
  return prisma.$transaction(async (tx) => {
    if (!task.relatedCvId || !task.relatedUserId || isConsumerExcludedEmail(task.email)) {
      await tx.followupTask.update({
        where: { id: task.id },
        data: { status: "skipped", skippedReason: "recovery_identity_ineligible" },
      });
      return "recovery_identity_ineligible";
    }

    const [document, paidOrder, contact, inboundReply] = await Promise.all([
      tx.cVDocument.findFirst({
        where: {
          id: task.relatedCvId,
          userId: task.relatedUserId,
          agencySubscriptionId: null,
          matchPack: null,
          user: { email: task.email },
        },
        select: { id: true },
      }),
      tx.order.findFirst({
        where: { cvId: task.relatedCvId, paidAt: { not: null } },
        select: { id: true },
      }),
      tx.followupContact.findUnique({ where: { email: task.email }, select: { status: true } }),
      tx.emailMessage.findFirst({
        where: {
          email: task.email,
          direction: "inbound",
          OR: [{ receivedAt: { gte: task.createdAt } }, { createdAt: { gte: task.createdAt } }],
        },
        select: { id: true },
      }),
    ]);

    const reason = !document
      ? "recovery_cv_unavailable"
      : paidOrder
        ? "recovery_exact_cv_paid"
        : contact?.status !== "active"
          ? "recovery_contact_inactive"
          : inboundReply
            ? "recovery_inbound_reply"
            : null;
    if (reason) {
      await tx.followupTask.update({
        where: { id: task.id },
        data: { status: "skipped", skippedReason: reason },
      });
      return reason;
    }

    const claimed = await tx.followupTask.updateMany({
      where: { id: task.id, status: "approved", sentAt: null },
      data: { status: "sending", skippedReason: null },
    });
    return claimed.count === 1 ? null : "recovery_not_claimed";
  });
}

async function main() {
  const { dryRun, includeDrafts, limit, types } = parseArgs();
  const now = new Date();

  const tasks = await prisma.followupTask.findMany({
    where: {
      dueAt: { lte: now },
      status: includeDrafts ? { in: ["draft", "approved"] } : "approved",
      sentAt: null,
      ...(types.length > 0 ? { type: { in: types } } : {}),
    },
    orderBy: [{ dueAt: "asc" }, { createdAt: "asc" }],
    take: limit,
  });

  if (tasks.length === 0) {
    console.log("No followup tasks due for sending.");
    return;
  }

  const transporter = dryRun ? null : getTransporter();
  const summary: Array<{ id: string; email: string; status: string; messageId?: string }> = [];

  for (const task of tasks as FollowupTask[]) {
    const email = normalizeEmail(task.email);
    const subject = task.draftSubject || "Quick follow-up";
    const body = task.draftBody || "";

    if (task.type === ENGLISH_CHECKOUT_RECOVERY_TYPE) {
      if (task.status === "holdout" || task.status !== "approved") {
        console.log(`Skipping ${task.id}: recovery tasks must be treatment and explicitly approved.`);
        continue;
      }
      if (!checkoutRecoverySendingApproved()) {
        console.log(`Skipping ${task.id}: English checkout recovery sending approvals are disabled.`);
        continue;
      }
      if (!dryRun) {
        const skipReason = await claimEnglishRecoveryForSend(task);
        if (skipReason) {
          console.log(`Skipping ${task.id}: ${skipReason}.`);
          continue;
        }
      }
    }

    if (!body.trim()) {
      console.log(`Skipping ${task.id} (${email}) because it has no draft body.`);
      continue;
    }

    if (dryRun) {
      console.log(`DRY RUN: would send ${task.type} to ${email} (${task.id})`);
      continue;
    }

    let info;
    try {
      info = await transporter!.sendMail({
        from: `${fromName()} <${fromEmail()}>`,
        to: email,
        replyTo: replyToEmail(),
        subject,
        text: body,
      });
    } catch (error) {
      if (task.type === ENGLISH_CHECKOUT_RECOVERY_TYPE) {
        await prisma.followupTask.updateMany({
          where: { id: task.id, status: "sending", sentAt: null },
          data: { status: "approved" },
        });
      }
      throw error;
    }

    await prisma.followupTask.update({
      where: { id: task.id },
      data: {
        status: "sent",
        sentAt: new Date(),
      },
    });

    await prisma.emailMessage.create({
      data: {
        email,
        direction: "outbound",
        subject,
        bodyPreview: body,
        messageId: Array.isArray(info.messageId) ? info.messageId[0] : info.messageId || undefined,
        sentAt: new Date(),
      },
    });

    summary.push({
      id: task.id,
      email,
      status: "sent",
      messageId: Array.isArray(info.messageId) ? info.messageId[0] : info.messageId || undefined,
    });
  }

  console.table(summary);
}

main()
  .catch((error) => {
    console.error("followups_send_failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
