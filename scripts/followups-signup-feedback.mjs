import nodemailer from "nodemailer";
import { Pool } from "pg";
import { randomUUID } from "crypto";

const DAY_MS = 24 * 60 * 60 * 1000;
const DEFAULT_DAYS = 14;
const SIGNUP_FEEDBACK_DELAY_HOURS = 48;
const RECENT_REPLY_WINDOW_DAYS = 30;

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

function getPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required");
  }

  return new Pool({ connectionString });
}

async function queryEligibleUsers(pool, lowerBound, cutoff, limit) {
  const result = await pool.query(
    `
      SELECT
        u.id,
        u.email,
        u."createdAt" AS "createdAt",
        u."sourcePath" AS "sourcePath",
        u."sourceCluster" AS "sourceCluster",
        u."sourceLocale" AS "sourceLocale",
        u.attribution AS attribution,
        COUNT(cv.id)::int AS "documentCount"
      FROM "User" u
      LEFT JOIN "CVDocument" cv ON cv."userId" = u.id
      WHERE u."createdAt" >= $1
        AND u."createdAt" <= $2
      GROUP BY u.id, u.email, u."createdAt", u."sourcePath", u."sourceCluster", u."sourceLocale", u.attribution
      ORDER BY u."createdAt" DESC
      LIMIT $3
    `,
    [lowerBound, cutoff, limit]
  );

  return result.rows;
}

async function hasInboundReplyAfter(pool, email, after) {
  const result = await pool.query(
    `
      SELECT 1
      FROM "EmailMessage"
      WHERE email = $1
        AND direction = 'inbound'
        AND COALESCE("receivedAt", "createdAt") >= $2
      LIMIT 1
    `,
    [email, after]
  );

  return result.rowCount > 0;
}

async function alreadySent(pool, email) {
  const result = await pool.query(
    `
      SELECT 1
      FROM "FollowupTask"
      WHERE email = $1
        AND type = 'signup_no_cv_feedback'
        AND "sentAt" IS NOT NULL
      LIMIT 1
    `,
    [email]
  );

  return result.rowCount > 0;
}

async function upsertFollowupRecords(pool, email, userId, sourceCluster, createdAt, draft, messageId) {
  const sentAt = new Date();
  const dueAt = new Date(createdAt.getTime() + SIGNUP_FEEDBACK_DELAY_HOURS * 60 * 60 * 1000);

  await pool.query(
    `
      INSERT INTO "FollowupTask" (
        id, email, type, status, reason, "draftSubject", "draftBody", "dueAt", "sentAt", "relatedUserId", "relatedCvId", "relatedOrderId", "createdAt", "updatedAt"
      ) VALUES (
        $8, $1, 'signup_no_cv_feedback', 'sent', $2, $3, $4, $5, $6, $7, NULL, NULL, NOW(), NOW()
      )
      ON CONFLICT (email, type, "relatedCvId")
      DO UPDATE SET
        status = 'sent',
        reason = EXCLUDED.reason,
        "draftSubject" = EXCLUDED."draftSubject",
        "draftBody" = EXCLUDED."draftBody",
        "dueAt" = EXCLUDED."dueAt",
        "sentAt" = EXCLUDED."sentAt",
        "relatedUserId" = EXCLUDED."relatedUserId",
        "updatedAt" = NOW()
    `,
    [
      email,
      `User signed up ${createdAt.toISOString()} and did not create a CV within ${SIGNUP_FEEDBACK_DELAY_HOURS} hours.`,
      draft.subject,
      draft.body,
      dueAt,
      sentAt,
      userId,
      randomUUID(),
    ]
  );

  await pool.query(
    `
      INSERT INTO "FollowupContact" (id, email, source, "userId", status, notes, "createdAt", "updatedAt")
      VALUES ($4, $1, $2, $3, 'active', NULL, NOW(), NOW())
      ON CONFLICT (email)
      DO UPDATE SET
        source = EXCLUDED.source,
        "userId" = EXCLUDED."userId",
        "updatedAt" = NOW()
    `,
    [email, sourceCluster || "signup_only", userId, randomUUID()]
  );

  await pool.query(
    `
      INSERT INTO "EmailMessage" (id, email, direction, subject, "bodyPreview", "messageId", "sentAt", "createdAt")
      VALUES ($5, $1, 'outbound', $2, $3, $4, NOW(), NOW())
      ON CONFLICT ("messageId") DO NOTHING
    `,
    [email, draft.subject, draft.body, messageId || null, randomUUID()]
  );
}

async function main() {
  const { dryRun, days, limit } = parseArgs();
  const pool = getPool();
  const transporter = dryRun ? null : getTransporter();
  const lowerBound = new Date(Date.now() - days * DAY_MS);
  const cutoff = new Date(Date.now() - SIGNUP_FEEDBACK_DELAY_HOURS * 60 * 60 * 1000);
  const recentReplyCutoff = new Date(Date.now() - RECENT_REPLY_WINDOW_DAYS * DAY_MS);

  try {
    const users = await queryEligibleUsers(pool, lowerBound, cutoff, limit);
    const summary = [];

    for (const user of users) {
      const email = normalizeEmail(user.email);
      if (isInternalOrTestEmail(email)) continue;
      if (Number(user.documentCount || 0) > 0) continue;
      if (await alreadySent(pool, email)) continue;
      if (await hasInboundReplyAfter(pool, email, recentReplyCutoff)) continue;

      const attribution = user.attribution && typeof user.attribution === "object" && !Array.isArray(user.attribution)
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

      await upsertFollowupRecords(
        pool,
        email,
        user.id,
        user.sourceCluster,
        new Date(user.createdAt),
        draft,
        Array.isArray(info.messageId) ? info.messageId[0] : info.messageId || null
      );

      summary.push({
        email,
        subject: draft.subject,
        messageId: Array.isArray(info.messageId) ? info.messageId[0] : info.messageId || "",
      });
    }

    console.table(summary);
  } finally {
    await pool.end();
    if (transporter) transporter.close();
  }
}

main()
  .catch((error) => {
    console.error("followups_signup_feedback_failed", error);
    process.exitCode = 1;
  });
