import { prisma } from "@/lib/prisma";

/**
 * Whether this user can download this CV without paying: payments off, an active pilot pass,
 * an agency (MatchPack) workspace, or a paid order for this CV. The PDF route enforces it; the
 * editor uses it to decide whether the download button shows the price.
 */
export async function hasCvDownloadAccess(userId: string, cvId: string, workspaceKind: "personal" | "matchpack"): Promise<boolean> {
  if (process.env.PAYMENT_ENABLED !== "true" || workspaceKind !== "personal") return true;
  const [pilotAccess, paidOrder] = await Promise.all([
    prisma.pilotAccess.findFirst({ where: { userId, expiresAt: { gte: new Date() } }, select: { id: true } }),
    prisma.order.findFirst({ where: { cvId, paidAt: { not: null } }, select: { id: true } }),
  ]);
  return Boolean(pilotAccess || paidOrder);
}
