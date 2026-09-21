import { NextRequest } from "next/server";
import { scanKeywords } from "@/lib/keyword-scan";
import { prisma } from "@/lib/prisma";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { authorizeCvDocument } from "@/lib/workspace/cv-authorization";
import { acquireConsumerAiLease } from "@/lib/consumer-ai-limits";
import { handleConsumerKeywordRequest } from "@/lib/consumer-keyword-request";

export const maxDuration = 30;
export async function POST(request: NextRequest) {
  return handleConsumerKeywordRequest(request, {
    user: getCurrentUserFromRequest,
    ownsPersonalCv: async (userId, cvId) => {
      try { return (await authorizeCvDocument(userId, cvId, "edit_content")).workspace.kind === "personal"; }
      catch { return false; }
    },
    acquire: (userId, cvId, requestId) => acquireConsumerAiLease(prisma, userId, cvId, requestId),
    extract: (vacancy, signal) => scanKeywords(vacancy, "", signal),
  });
}
