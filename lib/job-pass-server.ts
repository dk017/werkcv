import { prisma } from "@/lib/prisma";
import { JOB_PASS_PRODUCT } from "@/lib/job-pass";

/**
 * Payment dates of this user's paid Sollicitatiepas orders. Orders store an email, not a user id,
 * so a pass counts when it was paid with the user's email or bought from one of the user's CVs.
 */
export async function getJobPassPaidAts(userId: string, email: string | null | undefined): Promise<Date[]> {
  const rows = await prisma.$queryRaw<Array<{ paidAt: Date }>>`
    SELECT o."paidAt"
    FROM "Order" o
    LEFT JOIN "CVDocument" d ON d.id = o."cvId"
    WHERE o.product = ${JOB_PASS_PRODUCT}
      AND o."paidAt" IS NOT NULL
      AND (d."userId" = ${userId} OR LOWER(o.email) = LOWER(${email ?? ""}))
  `;
  return rows.map((row) => row.paidAt);
}
