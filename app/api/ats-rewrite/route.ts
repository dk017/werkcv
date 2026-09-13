import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { rewriteCVForATS } from "@/lib/ats-rewrite";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { authorizeCvDocument } from "@/lib/workspace/cv-authorization";
import { acquireConsumerAiLease } from "@/lib/consumer-ai-limits";
import { handleConsumerAiRequest } from "@/lib/consumer-ai-request";

export const maxDuration = 60;
export async function POST(request: NextRequest) {
  return handleConsumerAiRequest(request, {
    enabled: process.env.CONSUMER_AI_REVIEW_ENABLED === "true",
    user: getCurrentUserFromRequest,
    document: async (userId, cvId) => {
      try {
        const cv = await authorizeCvDocument(userId, cvId, "edit_content");
        return cv.workspace.kind === "personal" ? cv : null;
      } catch { return null; }
    },
    acquire: (userId, cvId, requestId) => acquireConsumerAiLease(prisma, userId, cvId, requestId),
    generate: rewriteCVForATS,
  });
}
