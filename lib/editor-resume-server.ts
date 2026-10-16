import { prisma } from "@/lib/prisma";
import { resumeWindowStart } from "@/lib/editor-resume";

/** The personal CV with content this user edited most recently, within the resume window. */
export async function findRecentCvToResume(userId: string): Promise<string | null> {
  const cv = await prisma.cVDocument.findFirst({
    where: {
      userId,
      agencySubscriptionId: null,
      hasMeaningfulContent: true,
      updatedAt: { gte: resumeWindowStart() },
    },
    orderBy: { updatedAt: "desc" },
    select: { id: true },
  });
  return cv?.id ?? null;
}
