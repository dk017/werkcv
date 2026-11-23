import { randomUUID } from "crypto";
import { pathToFileURL } from "url";
import { Pool } from "pg";
import { sendFollowupEmail } from "./followups-mailer.mjs";
import { isExcludedEmail, isWithinSendWindow, pickEmailLanguage } from "./followups-cv-ready.mjs";

// Trustpilot review request, one email per buyer, DELAY_DAYS after their (latest) purchase.
// Runs daily from the server timer werkcv-trustpilot-review (/usr/local/bin/werkcv-trustpilot-review.sh),
// inside the app container:
//   node scripts/followups-trustpilot-review.mjs --preview          print the email versions
//   node scripts/followups-trustpilot-review.mjs --scan --dry-run   list who would get it (nothing written)
//   node scripts/followups-trustpilot-review.mjs --scan             write approved tasks (one per person, ever)
//   node scripts/followups-trustpilot-review.mjs --send --confirm   send them (needs --confirm; 08-21 Amsterdam)
// Window: paid between WINDOW_DAYS and DELAY_DAYS ago, so a missed day is caught up and nobody gets it
// weeks later. --days=N widens the start of the window (used once on 23 Nov 2026 with 30 for the backfill).
// Trustpilot rules: invite every customer (no picking happy ones), no incentive, don't ask for a positive review.
// So the only exclusions are owner/test addresses, opt-outs and people who already got this mail.

export const TRUSTPILOT_REVIEW_TYPE = "trustpilot_review_request_v1";
export const DELAY_DAYS = 3;
export const WINDOW_DAYS = 10;
const REVIEW_URL = { nl: "https://nl.trustpilot.com/evaluate/werkcv.nl", en: "https://www.trustpilot.com/evaluate/werkcv.nl" };

// Consumer products only; agency plans are a different relationship.
const CONSUMER_PRODUCT_SQL = `(o.product IN ('cv-download', 'cv-profile-photo-bundle', 'job-pass') OR o.product ILIKE '%photo%')`;

export function purchaseKind(product) {
  if (product === "cv-download" || product === "job-pass") return "cv";
  if (product === "cv-profile-photo-bundle") return "cv_photo";
  return product?.toLowerCase().includes("photo") ? "photo" : "cv";
}

export function buildReviewEmail({ language, kind }) {
  if (language === "en") {
    const what = kind === "photo" ? "made your profile photo" : kind === "cv_photo" ? "downloaded your CV and profile photo" : "downloaded your CV";
    return {
      subject: "How was WerkCV for you?",
      body: `Hi,

Recently you ${what} with WerkCV. Thank you for that.

WerkCV is small and still fairly unknown. Would you share in a few sentences on Trustpilot how it went? Positive or critical, both help: other job seekers see what to expect.
${REVIEW_URL.en}

Ran into something? Just reply to this email. I read every reply myself.

Best,
Dinesh from WerkCV

You're getting this one email because you bought something on werkcv.nl. Prefer no emails like this? Reply "stop".`,
    };
  }
  const what = kind === "photo" ? "je profielfoto gemaakt" : kind === "cv_photo" ? "je cv en profielfoto gedownload" : "je cv gedownload";
  return {
    subject: "Hoe was WerkCV voor je?",
    body: `Hoi,

Je hebt onlangs ${what} bij WerkCV. Dank je wel daarvoor.

WerkCV is klein en nog vrij onbekend. Wil je in een paar zinnen op Trustpilot vertellen hoe het was? Positief of kritisch, allebei helpt: andere werkzoekenden zien zo wat ze kunnen verwachten.
${REVIEW_URL.nl}

Liep je ergens tegenaan? Antwoord dan gewoon op deze mail. Ik lees alles zelf.

Groet,
Dinesh van WerkCV

Je krijgt deze mail één keer, omdat je iets hebt gekocht op werkcv.nl. Liever geen mails zoals deze? Antwoord met "stop".`,
  };
}

// Latest consumer order per person in the window, with the language signals pickEmailLanguage uses.
export const CANDIDATES_SQL = `
  WITH latest AS (
    SELECT DISTINCT ON (lower(o.email)) o.id AS "orderId", lower(o.email) AS email, o."cvId", o.product, o.currency, o."paidAt"
    FROM "Order" o
    WHERE o."paidAt" > NOW() - make_interval(days => $1::int) AND o."paidAt" <= NOW() - make_interval(days => $2::int)
      AND ${CONSUMER_PRODUCT_SQL}
    ORDER BY lower(o.email), o."paidAt" DESC
  )
  SELECT l.*, COALESCE(d."sourceLocale", u."sourceLocale") AS locale, d."startSource", u."sourcePath",
    (SELECT e.properties->>'uiLanguage' FROM "AnalyticsEvent" e
      WHERE e."cvId" = l."cvId" AND e.properties->>'uiLanguage' IN ('nl', 'en')
      ORDER BY e."createdAt" DESC LIMIT 1) AS "editorUi"
  FROM latest l
  LEFT JOIN "CVDocument" d ON d.id = l."cvId"
  LEFT JOIN "User" u ON lower(u.email) = l.email
  WHERE NOT EXISTS (SELECT 1 FROM "FollowupContact" fc WHERE fc.email = l.email AND fc.status IN ('paused', 'do_not_contact'))
    AND NOT EXISTS (SELECT 1 FROM "FollowupTask" t WHERE t.email = l.email AND t.type = '${TRUSTPILOT_REVIEW_TYPE}')
  ORDER BY l."paidAt" DESC`;

// No editor signal: non-euro payers get English, euro payers Dutch (most buyers are Dutch).
export function reviewLanguage(row) {
  return pickEmailLanguage(row) || (row.currency && row.currency.toUpperCase() !== "EUR" ? "en" : "nl");
}

const mask = (email) => email.replace(/^(.).*(@.*)$/, "$1***$2");

function preview() {
  for (const language of ["nl", "en"]) {
    for (const kind of ["cv", "photo"]) {
      const email = buildReviewEmail({ language, kind });
      console.log(`\n=== ${language} · ${kind} ===\nSubject: ${email.subject}\n\n${email.body}`);
    }
  }
}

async function scan(pool, { dryRun, windowDays }) {
  const { rows } = await pool.query(CANDIDATES_SQL, [windowDays, DELAY_DAYS]);
  const counts = { candidates: rows.length, excluded: 0, eligible: 0, nl: 0, en: 0, cv: 0, photo: 0, cv_photo: 0, written: 0 };
  for (const row of rows) {
    if (isExcludedEmail(row.email)) { counts.excluded += 1; continue; }
    const language = reviewLanguage(row);
    const kind = purchaseKind(row.product);
    counts.eligible += 1; counts[language] += 1; counts[kind] += 1;
    if (dryRun) { console.log(`${mask(row.email)} ${language} ${kind} paid ${row.paidAt.toISOString().slice(0, 10)}`); continue; }
    const email = buildReviewEmail({ language, kind });
    const inserted = await pool.query(
      `INSERT INTO "FollowupTask" (id, email, type, status, reason, "draftSubject", "draftBody", "dueAt", "relatedCvId", "relatedOrderId", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, 'approved', $4, $5, $6, NOW(), $7, $8, NOW(), NOW())
       ON CONFLICT (email, type, "relatedOrderId") DO NOTHING`,
      [randomUUID(), row.email, TRUSTPILOT_REVIEW_TYPE, `Paid ${kind} ${row.paidAt.toISOString().slice(0, 10)}, language ${language}.`,
        email.subject, email.body, row.cvId, row.orderId],
    );
    if (inserted.rowCount) {
      counts.written += 1;
      await pool.query(
        `INSERT INTO "FollowupContact" (id, email, source, status, "createdAt", "updatedAt")
         VALUES ($1, $2, $3, 'active', NOW(), NOW()) ON CONFLICT (email) DO NOTHING`,
        [randomUUID(), row.email, TRUSTPILOT_REVIEW_TYPE],
      );
    }
  }
  console.log(JSON.stringify({ mode: dryRun ? "scan-dry-run" : "scan", windowDays, delayDays: DELAY_DAYS, ...counts }));
}

async function send(pool, { confirm, limit }) {
  if (!confirm) { console.log("Not sending: add --confirm."); return; }
  if (!isWithinSendWindow()) { console.log("Not sending: outside 08:00-21:00 Amsterdam."); return; }
  const { rows: tasks } = await pool.query(
    `SELECT id, email, "draftSubject", "draftBody" FROM "FollowupTask"
     WHERE type = $1 AND status = 'approved' AND "sentAt" IS NULL ORDER BY "createdAt" LIMIT $2`,
    [TRUSTPILOT_REVIEW_TYPE, limit],
  );
  const result = { due: tasks.length, sent: 0, skipped: 0, failed: 0 };
  for (const task of tasks) {
    const { rows: [blocker] } = await pool.query(
      `SELECT 1 AS blocked FROM "FollowupContact" WHERE email = $1 AND status <> 'active'`, [task.email]);
    if (blocker || isExcludedEmail(task.email)) {
      result.skipped += 1;
      await pool.query(`UPDATE "FollowupTask" SET status = 'skipped', "skippedReason" = 'contact_inactive', "updatedAt" = NOW() WHERE id = $1`, [task.id]);
      continue;
    }
    const claimed = await pool.query(`UPDATE "FollowupTask" SET status = 'sending', "updatedAt" = NOW() WHERE id = $1 AND status = 'approved' AND "sentAt" IS NULL`, [task.id]);
    if (claimed.rowCount !== 1) continue;
    try {
      const { messageId } = await sendFollowupEmail({ to: task.email, subject: task.draftSubject, text: task.draftBody });
      await pool.query(`UPDATE "FollowupTask" SET status = 'sent', "sentAt" = NOW(), "updatedAt" = NOW() WHERE id = $1`, [task.id]);
      await pool.query(
        `INSERT INTO "EmailMessage" (id, email, direction, subject, "bodyPreview", "messageId", "sentAt", "createdAt")
         VALUES ($1, $2, 'outbound', $3, $4, $5, NOW(), NOW()) ON CONFLICT ("messageId") DO NOTHING`,
        [randomUUID(), task.email, task.draftSubject, task.draftBody, messageId],
      );
      result.sent += 1;
      await new Promise((resolve) => setTimeout(resolve, 1500)); // gentle pace for the mail provider
    } catch (error) {
      result.failed += 1;
      await pool.query(`UPDATE "FollowupTask" SET status = 'approved', "updatedAt" = NOW() WHERE id = $1 AND status = 'sending'`, [task.id]);
      console.error("trustpilot_review_send_failed", task.id, error instanceof Error ? error.message : String(error));
    }
  }
  console.log(JSON.stringify({ mode: "send", ...result }));
}

async function main() {
  const argv = process.argv.slice(2);
  const args = new Set(argv);
  const limit = Number(argv.find((arg) => arg.startsWith("--limit="))?.slice(8) || 100);
  const windowDays = Number(argv.find((arg) => arg.startsWith("--days="))?.slice(7) || WINDOW_DAYS);
  if (args.has("--preview")) return preview();
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    if (args.has("--send")) await send(pool, { confirm: args.has("--confirm"), limit });
    else await scan(pool, { dryRun: args.has("--dry-run"), windowDays });
  } finally {
    await pool.end();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error("followups_trustpilot_review_failed", error?.code || "", error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
