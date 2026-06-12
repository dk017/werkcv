import "dotenv/config";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const DAY_MS = 24 * 60 * 60 * 1000;
const DEFAULT_DAYS = 14;
const SIGNUP_FEEDBACK_DELAY_HOURS = 48;

function parseArgs() {
  const args = new Set(process.argv.slice(2));
  const daysArg = process.argv.find((arg) => arg.startsWith("--days="));
  const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
  const daysValue = daysArg ? Number(daysArg.replace("--days=", "")) : DEFAULT_DAYS;
  const limitValue = limitArg ? Number(limitArg.replace("--limit=", "")) : 100;

  return {
    dryRun: args.has("--dry-run"),
    days: Number.isFinite(daysValue) && daysValue > 0 ? Math.floor(daysValue) : DEFAULT_DAYS,
    limit: Number.isFinite(limitValue) && limitValue > 0 ? Math.floor(limitValue) : 100,
  };
}

function normalizeEmail(email) {
  return (email || "").trim().toLowerCase();
}

function isInternalOrTestEmail(email) {
  const normalized = normalizeEmail(email);
  return (
    !normalized ||
    normalized.endsWith("@werkcv.nl") ||
    normalized.includes("+test") ||
    normalized.includes("test@") ||
    normalized === "dhineshkumar.stoic@gmail.com"
  );
}

function isEnglishContext(path, locale) {
  return Boolean((path || "").startsWith("/en") || locale === "en" || (path || "").startsWith("en-"));
}

function firstNameFromEmail(email) {
  const local = email.split("@")[0] || "";
  const firstToken = local.split(/[._+-]/)[0] || "";
  if (!firstToken || firstToken.length < 2) return "there";
  return firstToken.charAt(0).toUpperCase() + firstToken.slice(1);
}

function buildDraft(email, english) {
  const name = firstNameFromEmail(email);

  if (english) {
    return {
      subject: "Quick feedback on WerkCV?",
      body: `Hi ${name},

I saw you signed up for WerkCV, but it looks like you did not get to the CV builder yet.

I am improving the product and would genuinely value honest feedback, even if it is blunt:

- What were you expecting when you signed up?
- What felt unclear or missing?
- What nearly made you leave?

A reply with just 1 or 2 lines is already helpful. No sales pitch.

Thanks,
Dinesh`,
    };
  }

  return {
    subject: "Korte feedback over WerkCV?",
    body: `Hoi ${name},

Ik zag dat je je hebt aangemeld voor WerkCV, maar nog niet bij de cv-builder bent gekomen.

Ik ben het product aan het verbeteren en hoor graag eerlijke feedback, ook als die scherp is:

- Wat verwachtte je toen je je aanmeldde?
- Wat voelde onduidelijk of miste je?
- Wat maakte bijna dat je afhaakte?

Een reply van 1 of 2 zinnen helpt al enorm. Geen verkooppraatje.

Groet,
Dinesh`,
  };
}

function getTransporter() {
  const host = process.env.FOLLOWUP_SMTP_HOST || process.env.SMTP_HOST;
  const user = process.env.FOLLOWUP_SMTP_USER || process.env.SMTP_USER;
  const pass = process.env.FOLLOWUP_SMTP_PASSWORD || process.env.SMTP_PASS;
  const port = Number(process.env.FOLLOWUP_SMTP_PORT || process.env.SMTP_PORT || 465);
  const secure =
    process.env.FOLLOWUP_SMTP_SECURE !== undefined
      ? process.env.FOLLOWUP_SMTP_SECURE !== "false"
      : port === 465;

  if (!host || !user || !pass) {
    throw new Error("SMTP credentials are required");
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

function fromName() {
  return process.env.FOLLOWUP_FROM_NAME || "WerkCV";
}

function fromEmail() {
  return (
    process.env.FOLLOWUP_FROM_EMAIL ||
    process.env.AUTH_FROM_EMAIL ||
    process.env.FOLLOWUP_SMTP_USER ||
    process.env.SMTP_USER ||
    "contact@werkcv.nl"
  );
}

function replyToEmail() {
  return process.env.FOLLOWUP_REPLY_TO || fromEmail();
}

async function hasInboundReplyAfter(email, after) {
  const message = await prisma.emailMessage.findFirst({
    where: {
      email,
      direction: "inbound",
      OR: [{ receivedAt: { gte: after } }, { createdAt: { gte: after } }],
    },
    select: { id: true },
  });

  return Boolean(message);
}

async function alreadySent(email) {
  const existing = await prisma.followupTask.findFirst({
    where: {
      email,
      type: "signup_no_cv_feedback",
      sentAt: { not: null },
    },
    select: { id: true },
  });

  return Boolean(existing);
}

async function main() {
  const { dryRun, days, limit } = parseArgs();
  const lowerBound = new Date(Date.now() - days * DAY_MS);
  const cutoff = new Date(Date.now() - SIGNUP_FEEDBACK_DELAY_HOURS * 60 * 60 * 1000);

  const users = await prisma.user.findMany({
    where: {
      createdAt: {
        gte: lowerBound,
        lte: cutoff,
      },
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
      sourcePath: true,
      sourceCluster: true,
      sourceLocale: true,
      attribution: true,
      documents: {
        select: {
          id: true,
        },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  const transporter = dryRun ? null : getTransporter();
  const summary = [];

  for (const user of users) {
    const email = normalizeEmail(user.email);
    if (isInternalOrTestEmail(email)) continue;
    if (user.documents.length > 0) continue;
    if (await alreadySent(email)) continue;
    if (await hasInboundReplyAfter(email, new Date(Date.now() - 30 * DAY_MS))) continue;

    const attribution =
      user.attribution && typeof user.attribution === "object" && !Array.isArray(user.attribution)
        ? user.attribution
        : null;
    const path =
      user.sourcePath ||
      (attribution && typeof attribution.firstTouchPath === "string" ? attribution.firstTouchPath : null);
    const locale =
      user.sourceLocale ||
      (attribution && typeof attribution.locale === "string" ? attribution.locale : null);
    const english = isEnglishContext(path, locale);
    const draft = buildDraft(email, english);

    if (dryRun) {
      console.log(`DRY RUN: would send signup feedback to ${email}`);
      continue;
    }

    const info = await transporter.sendMail({
      from: `${fromName()} <${fromEmail()}>`,
      to: email,
      replyTo: replyToEmail(),
      subject: draft.subject,
      text: draft.body,
    });

    const dueAt = new Date(user.createdAt.getTime() + SIGNUP_FEEDBACK_DELAY_HOURS * 60 * 60 * 1000);
    const existing = await prisma.followupTask.findFirst({
      where: {
        email,
        type: "signup_no_cv_feedback",
        relatedCvId: null,
        relatedOrderId: null,
      },
      select: { id: true },
    });

    const taskData = {
      email,
      type: "signup_no_cv_feedback",
      status: "sent",
      reason: `User signed up ${user.createdAt.toISOString()} and did not create a CV within ${SIGNUP_FEEDBACK_DELAY_HOURS} hours.`,
      draftSubject: draft.subject,
      draftBody: draft.body,
      dueAt,
      sentAt: new Date(),
      relatedUserId: user.id,
      relatedCvId: null,
      relatedOrderId: null,
    };

    if (existing) {
      await prisma.followupTask.update({
        where: { id: existing.id },
        data: taskData,
      });
    } else {
      await prisma.followupTask.create({ data: taskData });
    }

    await prisma.followupContact.upsert({
      where: { email },
      create: {
        email,
        userId: user.id,
        source: user.sourceCluster || "signup_only",
      },
      update: {
        userId: user.id,
        source: user.sourceCluster || undefined,
      },
    });

    await prisma.emailMessage.create({
      data: {
        email,
        direction: "outbound",
        subject: draft.subject,
        bodyPreview: draft.body,
        messageId: Array.isArray(info.messageId) ? info.messageId[0] : info.messageId || undefined,
        sentAt: new Date(),
      },
    });

    summary.push({
      email,
      subject: draft.subject,
      messageId: Array.isArray(info.messageId) ? info.messageId[0] : info.messageId || "",
    });
  }

  console.table(summary);
}

main()
  .catch((error) => {
    console.error("followups_signup_feedback_failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
