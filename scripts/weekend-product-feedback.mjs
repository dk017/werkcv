import { randomUUID } from "crypto";
import nodemailer from "nodemailer";
import { Pool } from "pg";

const DEFAULT_START = "2026-06-28T22:00:00.000Z";
const DEFAULT_END = "2026-06-29T22:00:00.000Z";
const TASK_TYPE = "nonbuyer_product_feedback";

function readArg(name, fallback = "") {
  const prefix = `--${name}=`;
  const value = process.argv.find((arg) => arg.startsWith(prefix));
  return value ? value.slice(prefix.length) : fallback;
}

function normalizeEmail(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function isInternalOrTestEmail(email) {
  return (
    !email ||
    email.endsWith("@werkcv.nl") ||
    email.endsWith("@yopmail.com") ||
    email.includes("+test") ||
    email.includes("test@") ||
    email === "dhineshkumar.stoic@gmail.com"
  );
}

function isEnglishContext(user) {
  return user.locale === "en" || user.landing?.startsWith("/en");
}

function classifyStage(user) {
  if (Number(user.cvCount) === 0) return "no_cv";
  if (user.checkoutStarted) return "checkout_started";
  if (user.modalClosed) return "modal_closed";
  if (user.paywallOpened) return "paywall_opened";
  if (user.ready && !user.pdfStarted) return "ready_no_download";
  if (!user.ready) return "unfinished_cv";
  return "ready_no_download";
}

function buildDraft(stage, english) {
  if (english) {
    const subject = "One honest question about your WerkCV experience";
    const opening = "Hi,\n\nYou recently tried WerkCV. I build the product and I’m trying to understand what was useful and what got in the way.";
    const closing = "A one-line reply is enough. I’m not trying to sell you anything, and I won’t follow up unless you reply.\n\nThanks,\nDhinesh\nWerkCV.nl";
    const questions = {
      no_cv:
        "What did you like, and what made you stop? Was something confusing, missing, or were you only exploring?",
      unfinished_cv:
        "What did you like, and what made you stop? Was it the template or design, the editor, a missing feature, or were you only exploring?",
      ready_no_download:
        "What did you like, and what made you decide not to download? Was it the template or design, the editor, the price, a missing feature, or were you only exploring?",
      paywall_opened:
        "What did you like, and what made you stop at the download step? Was it the design, price, payment step, a missing feature, or were you only exploring?",
      modal_closed:
        "What did you like, and what made you stop at the download step? Was it the design, price, payment step, a missing feature, or were you only exploring?",
      checkout_started:
        "What did you like, and what made you stop at the payment step? Did something not work, or was it the design, price, payment options, or simply that you were only exploring?",
    };

    return {
      subject,
      body: `${opening}\n\n${questions[stage]}\n\n${closing}`,
    };
  }

  const subject = "Eén eerlijke vraag over je ervaring met WerkCV";
  const opening = "Hoi,\n\nJe hebt WerkCV onlangs geprobeerd. Ik bouw het product en probeer te begrijpen wat nuttig was en wat in de weg zat.";
  const closing = "Een antwoord van één regel is al genoeg. Ik probeer je niets te verkopen en stuur geen vervolgbericht tenzij je reageert.\n\nBedankt,\nDhinesh\nWerkCV.nl";
  const questions = {
    no_cv:
      "Wat vond je goed en waarom stopte je? Was iets onduidelijk, ontbrak er iets of was je alleen aan het rondkijken?",
    unfinished_cv:
      "Wat vond je goed en waarom stopte je? Lag het aan het template of ontwerp, de editor, een ontbrekende functie of was je alleen aan het rondkijken?",
    ready_no_download:
      "Wat vond je goed en waarom besloot je niet te downloaden? Lag het aan het template of ontwerp, de editor, de prijs, een ontbrekende functie of was je alleen aan het rondkijken?",
    paywall_opened:
      "Wat vond je goed en waarom stopte je bij het downloaden? Lag het aan het ontwerp, de prijs, de betaalstap, een ontbrekende functie of was je alleen aan het rondkijken?",
    modal_closed:
      "Wat vond je goed en waarom stopte je bij het downloaden? Lag het aan het ontwerp, de prijs, de betaalstap, een ontbrekende functie of was je alleen aan het rondkijken?",
    checkout_started:
      "Wat vond je goed en waarom stopte je bij het betalen? Werkte iets niet, of lag het aan het ontwerp, de prijs, de betaalopties of was je alleen aan het rondkijken?",
  };

  return {
    subject,
    body: `${opening}\n\n${questions[stage]}\n\n${closing}`,
  };
}

function getResendApiKey() {
  return (
    process.env.FOLLOWUP_RESEND_API_KEY ||
    process.env.RESEND_API_KEY ||
    process.env.RESENT ||
    ""
  );
}

async function sendViaResend({ to, subject, text }) {
  const apiKey = getResendApiKey();
  if (!apiKey) throw new Error("Resend API key is required");

  const fromEmail = process.env.FOLLOWUP_FROM_EMAIL || "contact@werkcv.nl";
  const fromName = process.env.FOLLOWUP_FROM_NAME || "Dhinesh at WerkCV";
  const replyTo = process.env.FOLLOWUP_REPLY_TO || fromEmail;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${fromName} <${fromEmail}>`,
      to: [to],
      reply_to: replyTo,
      subject,
      text,
    }),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(payload?.message || payload?.error || `Resend failed with status ${response.status}`);
  }
  return payload?.id || null;
}

function buildSmtpPortCandidates() {
  const preferred = Number(process.env.FOLLOWUP_SMTP_PORT || process.env.SMTP_PORT || 587);
  const ports = [preferred, 465, 587, 2525, 2587, 2465, 25];
  const seen = new Set();

  return ports
    .filter((port) => Number.isFinite(port) && port > 0 && !seen.has(port) && seen.add(port))
    .map((port) => ({ port, secure: port === 465 || port === 2465 }));
}

async function sendViaSmtp({ to, subject, text }) {
  const host = process.env.FOLLOWUP_SMTP_HOST || process.env.SMTP_HOST;
  const user = process.env.FOLLOWUP_SMTP_USER || process.env.SMTP_USER;
  const pass = process.env.FOLLOWUP_SMTP_PASSWORD || process.env.SMTP_PASS;
  if (!host || !user || !pass) throw new Error("SMTP credentials are required");

  const fromEmail = process.env.FOLLOWUP_FROM_EMAIL || "contact@werkcv.nl";
  const fromName = process.env.FOLLOWUP_FROM_NAME || "Dhinesh at WerkCV";
  const replyTo = process.env.FOLLOWUP_REPLY_TO || fromEmail;
  let lastError = null;

  for (const candidate of buildSmtpPortCandidates()) {
    const transporter = nodemailer.createTransport({
      host,
      port: candidate.port,
      secure: candidate.secure,
      auth: { user, pass },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 15000,
    });

    try {
      const info = await transporter.sendMail({
        from: `${fromName} <${fromEmail}>`,
        to,
        replyTo,
        subject,
        text,
      });
      transporter.close();
      return Array.isArray(info.messageId) ? info.messageId[0] : info.messageId || null;
    } catch (error) {
      lastError = error;
      transporter.close();
      const code = typeof error === "object" && error && "code" in error ? String(error.code || "") : "";
      if (code && !["ETIMEDOUT", "ESOCKET", "ECONNECTION", "ECONNREFUSED"].includes(code)) {
        throw error;
      }
    }
  }

  throw lastError || new Error("SMTP delivery failed");
}

async function sendMessage(message) {
  if (getResendApiKey()) {
    try {
      return await sendViaResend(message);
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      if (!/api key is invalid/i.test(detail)) throw error;
    }
  }

  return sendViaSmtp(message);
}

async function queryEligibleUsers(pool, start, end) {
  const result = await pool.query(
    `
      WITH weekend_users AS (
        SELECT
          u.id,
          u.email,
          u."createdAt",
          COALESCE(u."sourceLocale", u.attribution->>'locale', 'unknown') AS locale,
          COALESCE(u."sourcePath", u.attribution->>'firstTouchPath', 'unknown') AS landing,
          u."sourceCluster"
        FROM "User" u
        WHERE u."createdAt" >= $1
          AND u."createdAt" < $2
      ),
      cv_state AS (
        SELECT
          c."userId" AS user_id,
          c.id AS cv_id,
          COALESCE(
            MAX((e.properties->>'completionScore')::int)
              FILTER (WHERE e.properties->>'completionScore' ~ '^[0-9]+$'),
            0
          ) AS max_score,
          BOOL_OR(e.event = 'ready_to_download_viewed') AS ready,
          BOOL_OR(e.event IN ('pdf_download_started', 'pdf_download_completed')) AS pdf_started,
          BOOL_OR(e.event IN ('checkout_paywall_reached', 'checkout_modal_viewed')) AS paywall_opened,
          BOOL_OR(e.event IN ('checkout_start', 'checkout_started')) AS checkout_started,
          BOOL_OR(e.event = 'checkout_modal_closed') AS modal_closed
        FROM "CVDocument" c
        LEFT JOIN "AnalyticsEvent" e ON e."cvId" = c.id
        WHERE c."userId" IN (SELECT id FROM weekend_users)
        GROUP BY c."userId", c.id
      )
      SELECT
        u.id,
        u.email,
        u."createdAt",
        u.locale,
        u.landing,
        u."sourceCluster",
        COUNT(c.cv_id)::int AS "cvCount",
        COALESCE(MAX(c.max_score), 0)::int AS "maxScore",
        COALESCE(BOOL_OR(c.ready), false) AS ready,
        COALESCE(BOOL_OR(c.pdf_started), false) AS "pdfStarted",
        COALESCE(BOOL_OR(c.paywall_opened), false) AS "paywallOpened",
        COALESCE(BOOL_OR(c.checkout_started), false) AS "checkoutStarted",
        COALESCE(BOOL_OR(c.modal_closed), false) AS "modalClosed"
      FROM weekend_users u
      LEFT JOIN cv_state c ON c.user_id = u.id
      WHERE NOT EXISTS (
        SELECT 1
        FROM "CVDocument" paid_cv
        JOIN "Order" paid_order ON paid_order."cvId" = paid_cv.id
        WHERE paid_cv."userId" = u.id
          AND paid_order."paidAt" IS NOT NULL
      )
        AND NOT EXISTS (
          SELECT 1
          FROM "Order" paid_order
          WHERE LOWER(paid_order.email) = LOWER(u.email)
            AND paid_order."paidAt" IS NOT NULL
        )
        AND NOT EXISTS (
          SELECT 1
          FROM "EmailMessage" message
          WHERE LOWER(message.email) = LOWER(u.email)
            AND message.direction IN ('outbound', 'inbound')
        )
        AND NOT EXISTS (
          SELECT 1
          FROM "FollowupTask" task
          WHERE LOWER(task.email) = LOWER(u.email)
            AND task.type = $3
        )
      GROUP BY u.id, u.email, u."createdAt", u.locale, u.landing, u."sourceCluster"
      ORDER BY u."createdAt" ASC
    `,
    [start, end, TASK_TYPE],
  );
  return result.rows;
}

async function recordSend(pool, user, stage, draft, messageId) {
  const taskId = randomUUID();
  const contactId = randomUUID();
  const emailMessageId = randomUUID();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query(
      `
        INSERT INTO "FollowupTask" (
          id, email, type, status, reason, "draftSubject", "draftBody",
          "dueAt", "sentAt", "relatedUserId", "createdAt", "updatedAt"
        ) VALUES ($1, $2, $3, 'sent', $4, $5, $6, NOW(), NOW(), $7, NOW(), NOW())
      `,
      [
        taskId,
        user.email,
        TASK_TYPE,
        `Product feedback after stage: ${stage}`,
        draft.subject,
        draft.body,
        user.id,
      ],
    );
    await client.query(
      `
        INSERT INTO "FollowupContact" (
          id, email, source, "userId", status, notes, "createdAt", "updatedAt"
        ) VALUES ($1, $2, $3, $4, 'active', $5, NOW(), NOW())
        ON CONFLICT (email)
        DO UPDATE SET
          source = EXCLUDED.source,
          "userId" = EXCLUDED."userId",
          notes = EXCLUDED.notes,
          "updatedAt" = NOW()
      `,
      [contactId, user.email, user.sourceCluster || "product_feedback", user.id, `Sent ${TASK_TYPE}: ${stage}`],
    );
    await client.query(
      `
        INSERT INTO "EmailMessage" (
          id, email, direction, "fromAddress", "toAddress", subject,
          "bodyPreview", "messageId", "sentAt", "createdAt"
        ) VALUES ($1, $2, 'outbound', $3, $2, $4, $5, $6, NOW(), NOW())
      `,
      [
        emailMessageId,
        user.email,
        process.env.FOLLOWUP_FROM_EMAIL || "contact@werkcv.nl",
        draft.subject,
        draft.body,
        messageId,
      ],
    );
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function main() {
  const start = new Date(readArg("start", DEFAULT_START));
  const end = new Date(readArg("end", DEFAULT_END));
  const shouldSend = process.argv.includes("--send");
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL is required");
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start >= end) {
    throw new Error("A valid --start and --end range is required");
  }

  const pool = new Pool({ connectionString: databaseUrl });
  try {
    const users = await queryEligibleUsers(pool, start, end);
    const summary = [];

    for (const user of users) {
      const email = normalizeEmail(user.email);
      if (isInternalOrTestEmail(email)) continue;

      const stage = classifyStage(user);
      const english = isEnglishContext(user);
      const draft = buildDraft(stage, english);
      const item = {
        email,
        locale: english ? "en" : "nl",
        stage,
        subject: draft.subject,
        body: draft.body,
      };

      if (!shouldSend) {
        summary.push({ ...item, status: "dry_run" });
        continue;
      }

      const messageId = await sendMessage({
        to: email,
        subject: draft.subject,
        text: draft.body,
      });
      await recordSend(pool, { ...user, email }, stage, draft, messageId);
      summary.push({ ...item, status: "sent", messageId });

      await new Promise((resolve) => setTimeout(resolve, 10000));
    }

    console.log(JSON.stringify(summary, null, 2));
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error("product_feedback_failed", error);
  process.exitCode = 1;
});
