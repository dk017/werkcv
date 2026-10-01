import { jobPassPrice } from "@/lib/site-content";

/** Order.product for the Sollicitatiepas (€24,99 one-time, 90 days of unlimited CVs). */
export const JOB_PASS_PRODUCT = "job-pass";

const DAY_MS = 86_400_000;

export type JobPassStatus = { active: boolean; expiresAt: string | null; daysLeft: number };

// Unlock rules (same as the UK Job Search Pass):
// - a CV with its own paid order is unlocked;
// - a CV created before any pass window ends is unlocked, including CVs created before the pass was
//   bought. It stays unlocked after the pass ends; only CVs created later need a new purchase.
export function jobPassExpiry(paidAt: Date, days: number = jobPassPrice.days): Date {
  return new Date(paidAt.getTime() + days * DAY_MS);
}

export function isCoveredByJobPass(documentCreatedAt: Date, passPaidAts: Date[]): boolean {
  return passPaidAts.some((paidAt) => documentCreatedAt < jobPassExpiry(paidAt));
}

export function jobPassStatusFrom(passPaidAts: Date[], now: Date = new Date()): JobPassStatus {
  const latest = passPaidAts
    .map((paidAt) => jobPassExpiry(paidAt))
    .sort((a, b) => b.getTime() - a.getTime())[0];
  if (!latest || latest <= now) {
    return { active: false, expiresAt: latest?.toISOString() ?? null, daysLeft: 0 };
  }
  return {
    active: true,
    expiresAt: latest.toISOString(),
    daysLeft: Math.ceil((latest.getTime() - now.getTime()) / DAY_MS),
  };
}
