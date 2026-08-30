import "dotenv/config";
import { prisma } from "../lib/prisma";
import {
  assignCheckoutRecovery,
  buildEnglishCheckoutRecoveryEmail,
  checkoutRecoveryGenerationEnabled,
  ENGLISH_CHECKOUT_RECOVERY_MAX_AGE_MS,
  ENGLISH_CHECKOUT_RECOVERY_MIN_AGE_MS,
  ENGLISH_CHECKOUT_RECOVERY_TYPE,
  evaluateCheckoutRecoveryEligibility,
} from "../lib/checkout-recovery";
import {
  isConsumerExcludedEmail,
  normalizeConsumerEmail,
} from "../lib/consumer-analytics-exclusions";

type FollowupType =
  | "paid_customer_testimonial"
  | "signup_no_cv_feedback"
  | "created_cv_no_purchase"
  | "checkout_no_purchase"
  | typeof ENGLISH_CHECKOUT_RECOVERY_TYPE;

type Candidate = {
  email: string;
  type: FollowupType;
  reason: string;
  draftSubject: string;
  draftBody: string;
  dueAt: Date;
  relatedUserId?: string | null;
  relatedCvId?: string | null;
  relatedOrderId?: string | null;
  source?: string | null;
  initialStatus?: "draft" | "holdout";
};

type ScanResult = {
  candidate: Candidate;
  action: "created" | "updated" | "already_sent" | "skipped" | "dry_run";
  note?: string;
};

const DAY_MS = 24 * 60 * 60 * 1000;
const DEFAULT_DAYS = 14;
const TESTIMONIAL_DELAY_DAYS = 2;
const SIGNUP_FEEDBACK_DELAY_HOURS = 48;
const CREATED_CV_DELAY_HOURS = 36;
const CHECKOUT_DELAY_HOURS = 18;

function parseArgs() {
  const args = new Set(process.argv.slice(2));
  const daysArg = process.argv.find((arg) => arg.startsWith("--days="));
  const daysValue = daysArg ? Number(daysArg.replace("--days=", "")) : DEFAULT_DAYS;
  const days = Number.isFinite(daysValue) && daysValue > 0 ? Math.floor(daysValue) : DEFAULT_DAYS;

  return {
    dryRun: args.has("--dry-run"),
    days,
  };
}

function normalizeEmail(email: string | null | undefined): string {
  return normalizeConsumerEmail(email);
}

function isInternalOrTestEmail(email: string): boolean {
  return isConsumerExcludedEmail(email);
}

function hoursAgo(hours: number): Date {
  return new Date(Date.now() - hours * 60 * 60 * 1000);
}

function daysAgo(days: number): Date {
  return new Date(Date.now() - days * DAY_MS);
}

function isEnglishContext(path?: string | null, locale?: string | null): boolean {
  return Boolean(path?.startsWith("/en") || locale === "en" || path?.startsWith("en-"));
}

function firstNameFromEmail(email: string): string {
  const local = email.split("@")[0] || "";
  const firstToken = local.split(/[._+-]/)[0] || "";
  if (!firstToken || firstToken.length < 2) return "there";
  return firstToken.charAt(0).toUpperCase() + firstToken.slice(1);
}

function paidCustomerDraft(email: string, english: boolean): Pick<Candidate, "draftSubject" | "draftBody"> {
  const name = firstNameFromEmail(email);

  if (english) {
    return {
      draftSubject: "Quick question about your CV",
      draftBody: `Hi ${name},

I noticed you used WerkCV recently. I am improving the product and wanted to ask one simple thing:

Was the CV/download experience useful for you, or was there anything that felt confusing?

If it helped, a short sentence about your experience would also be really valuable. No pressure at all.

Thanks,
Dinesh`,
    };
  }

  return {
    draftSubject: "Korte vraag over je CV",
    draftBody: `Hoi ${name},

Ik zag dat je WerkCV recent hebt gebruikt. Ik ben het product aan het verbeteren en wilde je een simpele vraag stellen:

Was het maken en downloaden van je CV duidelijk genoeg, of was er iets dat verwarrend voelde?

Als WerkCV je geholpen heeft, is een korte zin over je ervaring ook heel waardevol. Geen verplichting natuurlijk.

Groet,
Dinesh`,
  };
}

function signupNoCvFeedbackDraft(email: string, english: boolean): Pick<Candidate, "draftSubject" | "draftBody"> {
  const name = firstNameFromEmail(email);

  if (english) {
    return {
      draftSubject: "Quick feedback on WerkCV?",
      draftBody: `Hi ${name},

You recently created a WerkCV account. I am trying to understand the first few minutes of the experience, whether you tried the editor or stopped before that.

What were you expecting, and what felt unclear or missing?

A reply with one or two lines is already helpful. No sales pitch.

Thanks,
Dinesh`,
    };
  }

  return {
    draftSubject: "Korte feedback over WerkCV?",
    draftBody: `Hoi ${name},

Je hebt onlangs een WerkCV-account aangemaakt. Ik probeer te begrijpen hoe de eerste paar minuten voelen, of je de editor hebt geprobeerd of daarvoor bent gestopt.

Wat verwachtte je, en wat voelde onduidelijk of ontbrak?

Een reply van één of twee zinnen helpt al enorm. Geen verkooppraatje.

Groet,
Dinesh`,
  };
}

function createdCvNoPurchaseDraft(email: string, english: boolean): Pick<Candidate, "draftSubject" | "draftBody"> {
  const name = firstNameFromEmail(email);

  if (english) {
    return {
      draftSubject: "Quick question about your CV",
      draftBody: `Hi ${name},

I saw you started creating a CV on WerkCV, but it looks like you did not finish the download.

I am not trying to push you to buy anything. I am trying to understand what stopped you:

- Was the editor unclear?
- Did the CV not feel good enough yet?
- Was the price or checkout not clear?
- Or did you simply not need it anymore?

A one-line reply would really help me improve the product.

Thanks,
Dinesh`,
    };
  }

  return {
    draftSubject: "Korte vraag over je CV",
    draftBody: `Hoi ${name},

Ik zag dat je een CV bent gaan maken op WerkCV, maar volgens mij heb je de PDF-download niet afgerond.

Ik probeer je niks te verkopen. Ik wil vooral begrijpen wat je tegenhield:

- Was de editor onduidelijk?
- Voelde het CV nog niet goed genoeg?
- Was de prijs of checkout niet duidelijk?
- Of had je het simpelweg niet meer nodig?

Een korte reply van een zin zou al enorm helpen om WerkCV beter te maken.

Groet,
Dinesh`,
  };
}

function checkoutNoPurchaseDraft(email: string, english: boolean): Pick<Candidate, "draftSubject" | "draftBody"> {
  const name = firstNameFromEmail(email);

  if (english) {
    return {
      draftSubject: "Did checkout work for you?",
      draftBody: `Hi ${name},

I noticed you reached the WerkCV checkout but did not complete the download.

Just checking: did something break or feel unclear? If it was simply not the right moment, no problem.

A short reply would help me spot issues faster.

Thanks,
Dinesh`,
    };
  }

  return {
    draftSubject: "Werkte de checkout goed?",
    draftBody: `Hoi ${name},

Ik zag dat je bij de WerkCV-checkout bent geweest, maar de download niet hebt afgerond.

Korte check: ging er iets mis of was iets onduidelijk? Als het gewoon niet het juiste moment was, is dat natuurlijk ook prima.

Een korte reply helpt mij om problemen sneller te vinden.

Groet,
Dinesh`,
  };
}

async function hasInboundReplyAfter(email: string, after: Date): Promise<boolean> {
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

async function ensureContact(candidate: Candidate, dryRun: boolean) {
  if (dryRun) return;

  await prisma.followupContact.upsert({
    where: { email: candidate.email },
    create: {
      email: candidate.email,
      userId: candidate.relatedUserId || undefined,
      source: candidate.source || candidate.type,
    },
    update: {
      userId: candidate.relatedUserId || undefined,
      source: candidate.source || undefined,
    },
  });
}

async function getContactStatus(email: string): Promise<string> {
  const contact = await prisma.followupContact.findUnique({
    where: { email },
    select: { status: true },
  });

  return contact?.status || "active";
}

async function upsertTask(candidate: Candidate, dryRun: boolean): Promise<ScanResult> {
  const email = normalizeEmail(candidate.email);
  if (isInternalOrTestEmail(email)) {
    return { candidate, action: "skipped", note: "internal_or_test_email" };
  }

  const contactStatus = await getContactStatus(email);
  if (contactStatus === "paused" || contactStatus === "do_not_contact") {
    return { candidate, action: "skipped", note: `contact_${contactStatus}` };
  }

  if (await hasInboundReplyAfter(email, daysAgo(30))) {
    return { candidate, action: "skipped", note: "recent_inbound_reply" };
  }

  if (dryRun) return { candidate, action: "dry_run" };

  await ensureContact(candidate, dryRun);
  const autoApprove = candidate.type === "signup_no_cv_feedback";

  const existing = await prisma.followupTask.findFirst({
    where: {
      email,
      type: candidate.type,
      relatedCvId: candidate.relatedCvId || null,
      relatedOrderId: candidate.relatedOrderId || null,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (existing?.status === "sent") {
    return { candidate, action: "already_sent" };
  }

  if (existing?.status === "skipped" || existing?.status === "paused") {
    return { candidate, action: "skipped", note: `task_${existing.status}` };
  }

  const data = {
    email,
    type: candidate.type,
    status:
      existing?.status === "approved" || autoApprove
        ? "approved"
        : candidate.initialStatus || "draft",
    reason: candidate.reason,
    draftSubject: candidate.draftSubject,
    draftBody: candidate.draftBody,
    dueAt: candidate.dueAt,
    relatedUserId: candidate.relatedUserId || null,
    relatedCvId: candidate.relatedCvId || null,
    relatedOrderId: candidate.relatedOrderId || null,
  };

  if (existing) {
    await prisma.followupTask.update({
      where: { id: existing.id },
      data,
    });
    return { candidate, action: "updated" };
  }

  await prisma.followupTask.create({ data });
  return { candidate, action: "created" };
}

async function findPaidCustomerCandidates(days: number): Promise<Candidate[]> {
  const lowerBound = daysAgo(days);
  const testimonialCutoff = daysAgo(TESTIMONIAL_DELAY_DAYS);
  const orders = await prisma.order.findMany({
    where: {
      paidAt: {
        gte: lowerBound,
        lte: testimonialCutoff,
      },
    },
    select: {
      id: true,
      email: true,
      cvId: true,
      paidAt: true,
      product: true,
      sourceCluster: true,
    },
    orderBy: { paidAt: "desc" },
  });

  return orders
    .filter((order) => order.paidAt && !isInternalOrTestEmail(order.email))
    .map((order) => {
      const english = isEnglishContext(order.sourceCluster, null);
      const draft = paidCustomerDraft(order.email, english);
      const paidAt = order.paidAt || new Date();
      return {
        email: normalizeEmail(order.email),
        type: "paid_customer_testimonial",
        reason: `Paid ${order.product} order completed ${paidAt.toISOString()}; ask for product experience/testimonial after ${TESTIMONIAL_DELAY_DAYS} days.`,
        dueAt: new Date(paidAt.getTime() + TESTIMONIAL_DELAY_DAYS * DAY_MS),
        relatedCvId: order.cvId,
        relatedOrderId: order.id,
        source: order.sourceCluster || "paid_order",
        ...draft,
      };
    });
}

async function findSignupNoCvFeedbackCandidates(days: number): Promise<Candidate[]> {
  const lowerBound = daysAgo(days);
  const cutoff = hoursAgo(SIGNUP_FEEDBACK_DELAY_HOURS);

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
        where: {
          agencySubscriptionId: null,
        },
        select: {
          id: true,
          hasMeaningfulContent: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const candidates: Candidate[] = [];

  for (const user of users) {
    const email = normalizeEmail(user.email);
    if (isInternalOrTestEmail(email)) continue;
    if (user.documents.some((document) => document.hasMeaningfulContent)) continue;

    const attribution = user.attribution && typeof user.attribution === "object" && !Array.isArray(user.attribution)
      ? (user.attribution as Record<string, unknown>)
      : null;
    const path = user.sourcePath || (typeof attribution?.firstTouchPath === "string" ? attribution.firstTouchPath : null);
    const locale = user.sourceLocale || (typeof attribution?.locale === "string" ? attribution.locale : null);
    const english = isEnglishContext(path, locale);
    const draft = signupNoCvFeedbackDraft(email, english);

    candidates.push({
      email,
      type: "signup_no_cv_feedback",
      reason: `User signed up ${user.createdAt.toISOString()} but no meaningful CV content was saved within ${SIGNUP_FEEDBACK_DELAY_HOURS} hours.`,
      dueAt: new Date(user.createdAt.getTime() + SIGNUP_FEEDBACK_DELAY_HOURS * 60 * 60 * 1000),
      relatedUserId: user.id,
      source: user.sourceCluster || "signup_only",
      ...draft,
    });
  }

  return candidates;
}

async function findCreatedCvNoPurchaseCandidates(days: number): Promise<Candidate[]> {
  const lowerBound = daysAgo(days);
  const cutoff = hoursAgo(CREATED_CV_DELAY_HOURS);

  const documents = await prisma.cVDocument.findMany({
    where: {
      createdAt: {
        gte: lowerBound,
        lte: cutoff,
      },
      userId: { not: null },
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      sourceCluster: true,
      sourceLocale: true,
      startSource: true,
      userId: true,
      user: {
        select: {
          email: true,
          sourcePath: true,
          sourceCluster: true,
          sourceLocale: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const candidates: Candidate[] = [];

  for (const document of documents) {
    const email = normalizeEmail(document.user?.email);
    if (isInternalOrTestEmail(email)) continue;

    const paidOrder = await prisma.order.findFirst({
      where: { cvId: document.id, paidAt: { not: null } },
      select: { id: true },
    });
    if (paidOrder) continue;

    const checkoutStarted = await prisma.analyticsEvent.findFirst({
      where: {
        cvId: document.id,
        event: { in: ["checkout_start", "checkout_started", "checkout_option_clicked"] },
      },
      select: { id: true },
    });
    if (checkoutStarted) continue;

    const path = document.user?.sourcePath || document.startSource;
    const locale = document.sourceLocale || document.user?.sourceLocale;
    const english = isEnglishContext(path, locale);
    const draft = createdCvNoPurchaseDraft(email, english);

    candidates.push({
      email,
      type: "created_cv_no_purchase",
      reason: `CV created ${document.createdAt.toISOString()} and no paid order after ${CREATED_CV_DELAY_HOURS} hours.`,
      dueAt: new Date(document.createdAt.getTime() + CREATED_CV_DELAY_HOURS * 60 * 60 * 1000),
      relatedUserId: document.userId,
      relatedCvId: document.id,
      source: document.sourceCluster || document.user?.sourceCluster || "cv_document",
      ...draft,
    });
  }

  return candidates;
}

async function findCheckoutNoPurchaseCandidates(days: number): Promise<Candidate[]> {
  const lowerBound = daysAgo(days);
  const cutoff = hoursAgo(CHECKOUT_DELAY_HOURS);

  const checkoutEvents = await prisma.analyticsEvent.findMany({
    where: {
      event: { in: ["checkout_start", "checkout_started", "checkout_option_clicked"] },
      cvId: { not: null },
      createdAt: {
        gte: lowerBound,
        lte: cutoff,
      },
    },
    select: {
      cvId: true,
      createdAt: true,
      path: true,
      cluster: true,
    },
    distinct: ["cvId"],
    orderBy: { createdAt: "desc" },
  });

  const candidates: Candidate[] = [];

  for (const event of checkoutEvents) {
    if (!event.cvId) continue;

    const document = await prisma.cVDocument.findUnique({
      where: { id: event.cvId },
      select: {
        id: true,
        userId: true,
        sourceLocale: true,
        user: {
          select: {
            email: true,
            sourcePath: true,
            sourceLocale: true,
            sourceCluster: true,
          },
        },
      },
    });
    const email = normalizeEmail(document?.user?.email);
    if (!document || isInternalOrTestEmail(email)) continue;

    const paidOrder = await prisma.order.findFirst({
      where: { cvId: event.cvId, paidAt: { not: null } },
      select: { id: true },
    });
    if (paidOrder) continue;

    const english = isEnglishContext(event.path || document.user?.sourcePath, document.sourceLocale || document.user?.sourceLocale);
    if (english && checkoutRecoveryGenerationEnabled()) continue;
    const draft = checkoutNoPurchaseDraft(email, english);

    candidates.push({
      email,
      type: "checkout_no_purchase",
      reason: `Checkout intent recorded ${event.createdAt.toISOString()} but no paid order after ${CHECKOUT_DELAY_HOURS} hours.`,
      dueAt: new Date(event.createdAt.getTime() + CHECKOUT_DELAY_HOURS * 60 * 60 * 1000),
      relatedUserId: document.userId,
      relatedCvId: event.cvId,
      source: event.cluster || document.user?.sourceCluster || "checkout_event",
      ...draft,
    });
  }

  return candidates;
}

async function findEnglishCheckoutRecoveryCandidates(): Promise<Candidate[]> {
  if (!checkoutRecoveryGenerationEnabled()) return [];

  const now = new Date();
  const checkoutEvents = await prisma.analyticsEvent.findMany({
    where: {
      event: { in: ["checkout_start", "checkout_started", "checkout_option_clicked"] },
      cvId: { not: null },
      createdAt: {
        gte: new Date(now.getTime() - ENGLISH_CHECKOUT_RECOVERY_MAX_AGE_MS),
        lte: new Date(now.getTime() - ENGLISH_CHECKOUT_RECOVERY_MIN_AGE_MS),
      },
    },
    select: { cvId: true, createdAt: true, path: true },
    distinct: ["cvId"],
    orderBy: { createdAt: "desc" },
  });

  const candidates: Candidate[] = [];
  const configuredOrigin = process.env.NEXT_PUBLIC_APP_URL || "https://werkcv.nl";

  for (const event of checkoutEvents) {
    if (!event.cvId) continue;
    const document = await prisma.cVDocument.findUnique({
      where: { id: event.cvId },
      select: {
        id: true,
        userId: true,
        sourceLocale: true,
        startSource: true,
        agencySubscriptionId: true,
        matchPack: { select: { id: true } },
        user: {
          select: {
            id: true,
            email: true,
            sourceLocale: true,
            sourcePath: true,
            agencySubscription: { select: { id: true } },
          },
        },
      },
    });
    const email = normalizeEmail(document?.user?.email);
    const [paidOrder, contact, previousRecovery, suppressingReply] = await Promise.all([
      prisma.order.findFirst({
        where: { cvId: event.cvId, paidAt: { not: null } },
        select: { id: true },
      }),
      email
        ? prisma.followupContact.findUnique({ where: { email }, select: { status: true } })
        : Promise.resolve(null),
      prisma.followupTask.findFirst({
        where: {
          type: { in: [ENGLISH_CHECKOUT_RECOVERY_TYPE, "checkout_no_purchase"] },
          relatedCvId: event.cvId,
        },
        select: { id: true },
      }),
      email ? hasInboundReplyAfter(email, event.createdAt) : Promise.resolve(false),
    ]);

    const eligibility = evaluateCheckoutRecoveryEligibility({
      now,
      checkoutAt: event.createdAt,
      cvId: event.cvId,
      email,
      sourceLocale: document?.sourceLocale || document?.user?.sourceLocale,
      startSource: document?.startSource,
      landingPath: event.path || document?.user?.sourcePath,
      hasExactCvPaidOrder: Boolean(paidOrder),
      isAgencyCv: Boolean(
        document?.agencySubscriptionId || document?.matchPack || document?.user?.agencySubscription,
      ),
      cvBelongsToUser: Boolean(document?.userId && document.user?.id === document.userId),
      contactStatus: contact?.status || "active",
      hasSuppressingInboundReply: suppressingReply,
      hasPreviousRecovery: Boolean(previousRecovery),
    });
    if (!eligibility.eligible || !document?.userId) continue;

    const assignment = assignCheckoutRecovery(event.cvId);
    const draft =
      assignment === "treatment"
        ? buildEnglishCheckoutRecoveryEmail({ cvId: event.cvId, configuredOrigin })
        : { subject: "", body: "" };
    candidates.push({
      email,
      type: ENGLISH_CHECKOUT_RECOVERY_TYPE,
      reason: `Eligible English checkout recovery; assignment=${assignment}.`,
      draftSubject: draft.subject,
      draftBody: draft.body,
      dueAt: new Date(event.createdAt.getTime() + ENGLISH_CHECKOUT_RECOVERY_MIN_AGE_MS),
      relatedUserId: document.userId,
      relatedCvId: event.cvId,
      source: ENGLISH_CHECKOUT_RECOVERY_TYPE,
      initialStatus: assignment === "holdout" ? "holdout" : "draft",
    });
  }

  return candidates;
}

function printResults(results: ScanResult[], dryRun: boolean) {
  const due = results.filter((result) => result.candidate.dueAt <= new Date());
  const byAction = results.reduce<Record<string, number>>((acc, result) => {
    acc[result.action] = (acc[result.action] || 0) + 1;
    return acc;
  }, {});

  console.log(`Followup scan ${dryRun ? "(dry run)" : ""}`);
  console.log(`Candidates: ${results.length}`);
  console.table(byAction);
  console.log("");

  if (due.length === 0) {
    console.log("No due followups found.");
    return;
  }

  console.log("Due followups");
  console.table(
    due.map((result) => ({
      action: result.action,
      type: result.candidate.type,
      email: result.candidate.email,
      due_at: result.candidate.dueAt.toISOString(),
      subject: result.candidate.draftSubject,
      note: result.note || "",
    }))
  );

  for (const result of due) {
    console.log("");
    console.log("------------------------------------------------------------");
    console.log(`${result.candidate.type} -> ${result.candidate.email}`);
    console.log(`Reason: ${result.candidate.reason}`);
    console.log(`Subject: ${result.candidate.draftSubject}`);
    console.log(result.candidate.draftBody);
  }
}

async function main() {
  const { dryRun, days } = parseArgs();

  const candidates = [
    ...(await findPaidCustomerCandidates(days)),
    ...(await findSignupNoCvFeedbackCandidates(days)),
    ...(await findCreatedCvNoPurchaseCandidates(days)),
    ...(await findCheckoutNoPurchaseCandidates(days)),
    ...(await findEnglishCheckoutRecoveryCandidates()),
  ];

  const uniqueCandidates = new Map<string, Candidate>();
  for (const candidate of candidates) {
    const key = `${candidate.email}:${candidate.type}:${candidate.relatedCvId || ""}:${candidate.relatedOrderId || ""}`;
    if (!uniqueCandidates.has(key)) uniqueCandidates.set(key, candidate);
  }

  const results: ScanResult[] = [];
  for (const candidate of uniqueCandidates.values()) {
    results.push(await upsertTask(candidate, dryRun));
  }

  printResults(results, dryRun);
}

main()
  .catch((error) => {
    console.error("followups_scan_failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
