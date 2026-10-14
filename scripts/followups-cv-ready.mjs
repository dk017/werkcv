import { createHash, randomUUID } from "crypto";
import { pathToFileURL } from "url";
import { Pool } from "pg";
import { sendFollowupEmail } from "./followups-mailer.mjs";

// "Your CV is ready" reminder: one email to someone whose CV is (nearly) finished but who did not
// download it, or who started checkout and did not pay. Runs inside the app container:
//   node scripts/followups-cv-ready.mjs --preview          print the four email versions
//   node scripts/followups-cv-ready.mjs --scan --dry-run   count who would get it (nothing written)
//   node scripts/followups-cv-ready.mjs --scan             write tasks (draft, or approved with auto-approve)
//   node scripts/followups-cv-ready.mjs --send             send approved, due tasks
// 20% of eligible people are a holdout (task written, never sent) so the effect on sales is measurable.
// Sending needs CV_READY_REMINDER_SEND_APPROVED=true (owner approval of copy and privacy basis).

export const CV_READY_REMINDER_TYPE = "cv_ready_reminder_v1";
const VERSION = "cv-ready-reminder-v1";
export const CV_READY_PRICE = { nl: "€7,95", en: "€7.95" };
export const QUIET_HOURS = 3; // wait this long after the last activity on the CV
export const MIN_COMPLETION_SCORE = 70;
const SEND_WINDOW = { startHour: 8, endHour: 21 }; // Europe/Amsterdam

const EXCLUDED_EMAILS = ["dhinesh217@gmail.com", "dhineshkumar.stoic@gmail.com"];

// Same rules as lib/consumer-analytics-exclusions.ts (owner, test and internal addresses).
export function isExcludedEmail(email, envValue = process.env.ANALYTICS_EXCLUDED_EMAILS) {
  const normalized = (email || "").trim().toLowerCase();
  if (!normalized || !normalized.includes("@")) return true;
  const configured = (envValue || "").split(",").map((value) => value.trim().toLowerCase()).filter(Boolean);
  if ([...EXCLUDED_EMAILS, ...configured].includes(normalized)) return true;
  const [localPart, domain] = normalized.split("@");
  if (!localPart || !domain) return true;
  if (domain === "werkcv.nl" || domain === "werkcv.test" || domain === "example.com" || domain.endsWith(".example.com")) return true;
  if (localPart.includes("+")) return true;
  return /(^|[._-])(test|e2e|synthetic|fixture)([._-]|$)/i.test(localPart);
}

// The email is written in the language the person last used the editor in: that is what they
// read. The CV's own language is not used (a Dutch speaker may write an English CV). Without an
// editor language, fall back to how the CV was started; with no signal at all, return null and
// send nothing rather than guess.
export function pickEmailLanguage({ editorUi, locale, startSource, sourcePath }) {
  if (editorUi === "en" || editorUi === "nl") return editorUi;
  if (locale === "en" || startSource?.startsWith("en_") || sourcePath?.startsWith("/en")) return "en";
  if (locale === "nl") return "nl";
  return null;
}

export function assignCvReadyReminder(userId) {
  const digest = createHash("sha256").update(`${VERSION}:${userId}`).digest();
  return digest.readUInt32BE(0) % 5 === 0 ? "holdout" : "treatment";
}

export function isWithinSendWindow(now = new Date()) {
  const hour = Number(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", hour12: false, timeZone: "Europe/Amsterdam" }).format(now));
  return hour >= SEND_WINDOW.startHour && hour < SEND_WINDOW.endHour;
}

export function buildCvReadyLink({ cvId, language, origin = "https://werkcv.nl" }) {
  const url = new URL(language === "en" ? "/en/editor" : "/editor", origin);
  if (url.protocol !== "https:" && url.hostname !== "localhost") throw new Error("CV_READY_HTTPS_ORIGIN_REQUIRED");
  url.searchParams.set("id", cvId);
  url.searchParams.set("downloadIntent", "1");
  url.searchParams.set("utm_source", "werkcv");
  url.searchParams.set("utm_medium", "email");
  url.searchParams.set("utm_campaign", VERSION);
  return url.toString();
}

export function buildCvReadyEmail({ language, checkoutStarted, link }) {
  if (language === "en") {
    const footer = `You're getting this one email because you started a CV on werkcv.nl. Prefer no emails like this? Reply "stop".`;
    return checkoutStarted
      ? {
          subject: "Your CV payment wasn't completed",
          body: `Hi,

You reached the payment step for your CV, but it wasn't completed. Your CV is still saved in your account:
${link}

The PDF is a one-time ${CV_READY_PRICE.en}, paid by card or iDEAL. No subscription.

Did something go wrong at checkout? Reply to this email and I'll help.

Best,
Dinesh from WerkCV

${footer}`,
        }
      : {
          subject: "Your CV is ready in WerkCV",
          body: `Hi,

Your CV is nearly finished and saved in your account. Pick up where you left off:
${link}

When you're happy with it, download the PDF for a one-time ${CV_READY_PRICE.en}. No subscription.

Stuck on something, or not sure about part of your CV? Just reply to this email. I read every reply myself.

Best,
Dinesh from WerkCV

${footer}`,
        };
  }
  const footer = `Je krijgt deze mail één keer, omdat je een cv bent begonnen op werkcv.nl. Liever geen mails zoals deze? Antwoord met "stop".`;
  return checkoutStarted
    ? {
        subject: "Je betaling voor je cv is niet afgerond",
        body: `Hoi,

Je was bij de betaling voor je cv, maar die is niet afgerond. Je cv staat nog gewoon in je account:
${link}

De PDF kost eenmalig ${CV_READY_PRICE.nl} en je betaalt met iDEAL of kaart. Geen abonnement.

Ging er iets mis bij het betalen? Antwoord op deze mail, dan help ik je verder.

Groet,
Dinesh van WerkCV

${footer}`,
      }
    : {
        subject: "Je cv staat klaar in WerkCV",
        body: `Hoi,

Je cv is bijna af en staat veilig opgeslagen in je account. Via deze link ga je verder waar je gebleven was:
${link}

Ben je tevreden? Dan download je het als PDF voor eenmalig ${CV_READY_PRICE.nl}. Geen abonnement, je zit nergens aan vast.

Twijfel je nog over iets, of liep je ergens tegenaan? Antwoord gewoon op deze mail. Ik lees alles zelf.

Groet,
Dinesh van WerkCV

${footer}`,
      };
}

// One row per CV that qualifies: personal (not agency), real content, recent, quiet for QUIET_HOURS,
// completion score >= MIN_COMPLETION_SCORE, unpaid, the person has not bought anything in 30 days,
// has not opted out or replied in 30 days, and has not had this reminder in 30 days.
export const CANDIDATES_SQL = `
  WITH activity AS (
    SELECT e."cvId",
      MAX(e."createdAt") AS "lastAt",
      MAX((e.properties->>'completionScore')::int) FILTER (WHERE e.properties->>'completionScore' ~ '^[0-9]+$') AS score,
      BOOL_OR(e.event IN ('checkout_started', 'checkout_start')) AS "checkoutStarted",
      (ARRAY_AGG(e.properties->>'uiLanguage' ORDER BY e."createdAt" DESC) FILTER (WHERE e.properties->>'uiLanguage' IN ('nl', 'en')))[1] AS "editorUi"
    FROM "AnalyticsEvent" e
    WHERE e."cvId" IS NOT NULL AND e."createdAt" > NOW() - INTERVAL '8 days'
    GROUP BY e."cvId"
  )
  SELECT d.id AS "cvId", d."userId", lower(u.email) AS email, COALESCE(d."sourceLocale", u."sourceLocale") AS locale,
    d."startSource", u."sourcePath", a.score, a."checkoutStarted", a."editorUi",
    -- As text: the driver would read these UTC timestamps in the machine's own time zone.
    to_char(a."lastAt", 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS "lastAt",
    to_char(a."lastAt" + make_interval(hours => $1::int), 'YYYY-MM-DD HH24:MI:SS.MS') AS "dueAt"
  FROM "CVDocument" d
  JOIN "User" u ON u.id = d."userId"
  JOIN activity a ON a."cvId" = d.id
  WHERE d."agencySubscriptionId" IS NULL
    AND d."hasMeaningfulContent"
    AND d."createdAt" > NOW() - INTERVAL '7 days'
    AND a."lastAt" BETWEEN NOW() - INTERVAL '7 days' AND NOW() - make_interval(hours => $1::int)
    AND COALESCE(a.score, 0) >= $2::int
    AND NOT EXISTS (SELECT 1 FROM "AgencyMatchPack" mp WHERE mp."cvDocumentId" = d.id)
    AND NOT EXISTS (SELECT 1 FROM "AgencySubscription" s WHERE s."userId" = u.id)
    AND NOT EXISTS (SELECT 1 FROM "Order" o WHERE o."paidAt" IS NOT NULL
      AND (o."cvId" = d.id OR (lower(o.email) = lower(u.email) AND o."paidAt" > NOW() - INTERVAL '30 days')))
    AND NOT EXISTS (SELECT 1 FROM "FollowupContact" fc WHERE fc.email = lower(u.email) AND fc.status IN ('paused', 'do_not_contact'))
    AND NOT EXISTS (SELECT 1 FROM "EmailMessage" m WHERE m.email = lower(u.email) AND m.direction = 'inbound'
      AND COALESCE(m."receivedAt", m."createdAt") > NOW() - INTERVAL '30 days')
    AND NOT EXISTS (SELECT 1 FROM "FollowupTask" t WHERE t.email = lower(u.email) AND t.type = '${CV_READY_REMINDER_TYPE}'
      AND t."createdAt" > NOW() - INTERVAL '30 days')
  ORDER BY a."lastAt" DESC`;

function parseArgs(argv) {
  const args = new Set(argv);
  const limitArg = argv.find((arg) => arg.startsWith("--limit="));
  const limit = Number(limitArg?.slice("--limit=".length) || 20);
  return {
    mode: args.has("--send") ? "send" : args.has("--preview") ? "preview" : "scan",
    dryRun: args.has("--dry-run"),
    limit: Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 20,
  };
}

const origin = () => process.env.NEXT_PUBLIC_APP_URL || "https://werkcv.nl";
const enabled = (name) => (process.env[name] || "").trim().toLowerCase() === "true";
const mask = (email) => email.replace(/^(.).*(@.*)$/, "$1***$2");

function preview() {
  for (const language of ["nl", "en"]) {
    for (const checkoutStarted of [false, true]) {
      const email = buildCvReadyEmail({ language, checkoutStarted, link: buildCvReadyLink({ cvId: "<cv-id>", language, origin: origin() }) });
      console.log(`\n=== ${language === "en" ? "English" : "Nederlands"} · ${checkoutStarted ? "checkout started, not paid" : "CV ready, no download"} ===`);
      console.log(`Subject: ${email.subject}\n\n${email.body}`);
    }
  }
}

async function scan(pool, { dryRun }) {
  const { rows } = await pool.query(CANDIDATES_SQL, [QUIET_HOURS, MIN_COMPLETION_SCORE]);
  const seen = new Set();
  const counts = { eligible: 0, treatment: 0, holdout: 0, nl: 0, en: 0, noLanguage: 0, checkoutStarted: 0, written: 0 };
  const autoApprove = enabled("CV_READY_REMINDER_AUTO_APPROVE");
  for (const row of rows) {
    // One reminder per person: the most recently edited CV wins.
    if (seen.has(row.email) || isExcludedEmail(row.email)) continue;
    seen.add(row.email);
    const language = pickEmailLanguage(row);
    if (!language) { counts.noLanguage += 1; continue; }
    const assignment = assignCvReadyReminder(row.userId);
    counts.eligible += 1; counts[assignment] += 1; counts[language] += 1;
    if (row.checkoutStarted) counts.checkoutStarted += 1;
    if (dryRun) continue;

    const email = assignment === "treatment"
      ? buildCvReadyEmail({ language, checkoutStarted: row.checkoutStarted, link: buildCvReadyLink({ cvId: row.cvId, language, origin: origin() }) })
      : { subject: null, body: null };
    const status = assignment === "holdout" ? "holdout" : autoApprove ? "approved" : "draft";
    const reason = `CV score ${row.score}, language ${language}, last activity ${row.lastAt}, ${row.checkoutStarted ? "checkout started" : "no checkout"}; assignment=${assignment}.`;
    const inserted = await pool.query(
      `INSERT INTO "FollowupTask" (id, email, type, status, reason, "draftSubject", "draftBody", "dueAt", "relatedUserId", "relatedCvId", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8::timestamp, $9, $10, NOW(), NOW())
       ON CONFLICT (email, type, "relatedCvId") DO NOTHING`,
      [randomUUID(), row.email, CV_READY_REMINDER_TYPE, status, reason, email.subject, email.body, row.dueAt, row.userId, row.cvId],
    );
    if (inserted.rowCount) {
      counts.written += 1;
      await pool.query(
        `INSERT INTO "FollowupContact" (id, email, source, "userId", status, "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, 'active', NOW(), NOW()) ON CONFLICT (email) DO NOTHING`,
        [randomUUID(), row.email, CV_READY_REMINDER_TYPE, row.userId],
      );
    }
  }
  console.log(JSON.stringify({ mode: dryRun ? "scan-dry-run" : "scan", autoApprove, ...counts }));
}

async function send(pool, { dryRun, limit }) {
  if (!enabled("CV_READY_REMINDER_SEND_APPROVED")) {
    console.log("Not sending: CV_READY_REMINDER_SEND_APPROVED is not true.");
    return;
  }
  if (enabled("FOLLOWUP_DRY_RUN")) dryRun = true;
  if (!isWithinSendWindow()) {
    console.log("Not sending: outside 08:00-21:00 Amsterdam.");
    return;
  }
  const { rows: tasks } = await pool.query(
    `SELECT id, email, "draftSubject", "draftBody", "relatedCvId" FROM "FollowupTask"
     WHERE type = $1 AND status = 'approved' AND "sentAt" IS NULL AND "dueAt" <= NOW()
     ORDER BY "dueAt" LIMIT $2`,
    [CV_READY_REMINDER_TYPE, limit],
  );
  const result = { due: tasks.length, sent: 0, skipped: 0, failed: 0 };
  for (const task of tasks) {
    // Re-check right before sending: paid since, opted out, replied, or CV deleted.
    const { rows: [blocker] } = await pool.query(
      `SELECT CASE
         WHEN EXISTS (SELECT 1 FROM "Order" o WHERE o."paidAt" IS NOT NULL AND (o."cvId" = $2 OR (lower(o.email) = $1 AND o."paidAt" > NOW() - INTERVAL '30 days'))) THEN 'paid'
         WHEN EXISTS (SELECT 1 FROM "FollowupContact" fc WHERE fc.email = $1 AND fc.status <> 'active') THEN 'contact_inactive'
         WHEN EXISTS (SELECT 1 FROM "EmailMessage" m WHERE m.email = $1 AND m.direction = 'inbound'
           AND COALESCE(m."receivedAt", m."createdAt") >= (SELECT t."createdAt" FROM "FollowupTask" t WHERE t.id = $3)) THEN 'inbound_reply'
         WHEN NOT EXISTS (SELECT 1 FROM "CVDocument" d WHERE d.id = $2) THEN 'cv_deleted'
       END AS reason`,
      [task.email, task.relatedCvId, task.id],
    );
    if (blocker?.reason || isExcludedEmail(task.email) || !task.draftBody) {
      result.skipped += 1;
      if (!dryRun) await pool.query(`UPDATE "FollowupTask" SET status = 'skipped', "skippedReason" = $2, "updatedAt" = NOW() WHERE id = $1`, [task.id, blocker?.reason || "ineligible"]);
      continue;
    }
    if (dryRun) { console.log(`DRY RUN: would send to ${mask(task.email)}`); continue; }

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
    } catch (error) {
      result.failed += 1;
      await pool.query(`UPDATE "FollowupTask" SET status = 'approved', "updatedAt" = NOW() WHERE id = $1 AND status = 'sending'`, [task.id]);
      console.error("cv_ready_send_failed", task.id, error instanceof Error ? error.message : String(error));
    }
  }
  console.log(JSON.stringify({ mode: dryRun ? "send-dry-run" : "send", ...result }));
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.mode === "preview") return preview();
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    if (options.mode === "send") await send(pool, options);
    else await scan(pool, options);
  } finally {
    await pool.end();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error("followups_cv_ready_failed", error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
