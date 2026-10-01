import { prisma } from "@/lib/prisma";
import { isCoveredByJobPass } from "@/lib/job-pass";
import { getJobPassPaidAts } from "@/lib/job-pass-server";

/**
 * Whether this user can download this CV without paying: payments off, an active pilot pass,
 * an agency (MatchPack) workspace, a paid order for this CV, or a Sollicitatiepas whose window
 * covers the CV's creation date. The PDF route enforces it; the editor uses it to decide whether
 * the download button shows the price.
 */
export async function hasCvDownloadAccess(userId: string, cvId: string, workspaceKind: "personal" | "matchpack"): Promise<boolean> {
  if (process.env.PAYMENT_ENABLED !== "true" || workspaceKind !== "personal") return true;
  const [pilotAccess, paidOrder] = await Promise.all([
    prisma.pilotAccess.findFirst({ where: { userId, expiresAt: { gte: new Date() } }, select: { id: true } }),
    prisma.order.findFirst({ where: { cvId, paidAt: { not: null } }, select: { id: true } }),
  ]);
  if (pilotAccess || paidOrder) return true;
  return isCvCoveredByUserJobPass(userId, cvId);
}

async function isCvCoveredByUserJobPass(userId: string, cvId: string): Promise<boolean> {
  const [user, cv] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { email: true } }),
    prisma.cVDocument.findUnique({ where: { id: cvId }, select: { createdAt: true } }),
  ]);
  if (!cv) return false;
  return isCoveredByJobPass(cv.createdAt, await getJobPassPaidAts(userId, user?.email));
}
