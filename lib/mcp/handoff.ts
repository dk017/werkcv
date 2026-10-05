import type { Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";
import { createToolHandoffToken, toolHandoffHash, validToolHandoffToken } from "@/lib/tool-cv-handoff";

/**
 * The CV someone checked in an AI assistant, handed to the no-account editor. It reuses the
 * ToolCvHandoff table (a new `kind`, no migration). The CV text is personal data, so the link
 * carries only a random single-use token; the text lives here for at most an hour and is deleted
 * the first time the editor exchanges the token.
 */
export const CHECKED_CV_KIND = "checked_cv";
export const CHECKED_CV_TTL_MS = 60 * 60 * 1000;
export const CV_TEXT_MIN = 200;
export const CV_TEXT_MAX = 25_000;
export const VACANCY_TEXT_MIN = 120;
export const VACANCY_TEXT_MAX = 18_000;

export type HandoffLocale = "nl" | "en";

/** At most this many unexpired handoffs exist at once: with 25,000 characters each, that bounds the storage. */
export const DEFAULT_MAX_LIVE_HANDOFFS = 200;

export function maxLiveHandoffs(env: Record<string, string | undefined> = process.env): number {
  const parsed = Number.parseInt(env.MCP_MAX_LIVE_HANDOFFS ?? "", 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : DEFAULT_MAX_LIVE_HANDOFFS;
}

export class HandoffCapacityError extends Error {
  constructor() {
    super("HANDOFF_CAPACITY");
    this.name = "HandoffCapacityError";
  }
}

const payloadSchema = z
  .object({
    cvText: z.string().min(1).max(CV_TEXT_MAX),
    vacancyText: z.string().max(VACANCY_TEXT_MAX).nullable(),
  })
  .strict();

export type CheckedCvHandoff = { cvText: string; vacancyText: string | null; locale: HandoffLocale };

type Db = Pick<PrismaClient, "toolCvHandoff">;

export async function createCheckedCvHandoff(
  db: Db,
  input: { cvText: string; vacancyText: string | null; locale: HandoffLocale },
  now = new Date(),
  maxLive = maxLiveHandoffs(),
): Promise<{ token: string; expiresAt: Date }> {
  // Expired handoffs are removed on the next write; nothing else needs to run on a schedule.
  await db.toolCvHandoff.deleteMany({ where: { kind: CHECKED_CV_KIND, expiresAt: { lte: now } } });
  // Anyone can ask for a link, and the per-IP limits can be dodged, so the total is capped as well.
  if ((await db.toolCvHandoff.count({ where: { kind: CHECKED_CV_KIND } })) >= maxLive) throw new HandoffCapacityError();
  const token = createToolHandoffToken();
  const expiresAt = new Date(now.getTime() + CHECKED_CV_TTL_MS);
  await db.toolCvHandoff.create({
    data: {
      tokenHash: toolHandoffHash(token),
      kind: CHECKED_CV_KIND,
      locale: input.locale,
      payload: { cvText: input.cvText, vacancyText: input.vacancyText } satisfies Prisma.InputJsonValue,
      expiresAt,
    },
  });
  return { token, expiresAt };
}

/** True when the token is known and unexpired. Changes nothing: used to check a cap before a handoff is used up. */
export async function peekCheckedCvHandoff(db: Db, token: unknown, now = new Date()): Promise<boolean> {
  if (!validToolHandoffToken(token)) return false;
  const row = await db.toolCvHandoff.findFirst({ where: { tokenHash: toolHandoffHash(token), kind: CHECKED_CV_KIND } });
  return Boolean(row && row.expiresAt > now);
}

/** Returns the handed-over CV once and deletes it; null when unknown, expired or already used. */
export async function takeCheckedCvHandoff(db: Db, token: unknown, now = new Date()): Promise<CheckedCvHandoff | null> {
  if (!validToolHandoffToken(token)) return null;
  const tokenHash = toolHandoffHash(token);
  const row = await db.toolCvHandoff.findFirst({ where: { tokenHash, kind: CHECKED_CV_KIND } });
  if (!row) return null;
  // Claim by deleting: when two requests race, only one sees count 1.
  const claimed = await db.toolCvHandoff.deleteMany({ where: { id: row.id, tokenHash, kind: CHECKED_CV_KIND } });
  if (claimed.count !== 1 || row.expiresAt <= now) return null;
  const payload = payloadSchema.safeParse(row.payload);
  if (!payload.success) return null;
  return { ...payload.data, locale: row.locale === "en" ? "en" : "nl" };
}
