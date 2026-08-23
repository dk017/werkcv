import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createAgencyCvDocumentForUser } from "@/lib/agency-access";

export type CvDocumentCreationInput = Omit<
  Prisma.CVDocumentUncheckedCreateInput,
  "userId" | "agencySubscriptionId"
>;

export async function createPersonalCvDocument(
  actorUserId: string,
  input: CvDocumentCreationInput,
) {
  return prisma.cVDocument.create({
    data: {
      ...input,
      userId: actorUserId,
      agencySubscriptionId: null,
    },
  });
}

export async function createMatchPackCvDocument(
  actorUserId: string,
  input: CvDocumentCreationInput,
) {
  return createAgencyCvDocumentForUser(actorUserId, input);
}
