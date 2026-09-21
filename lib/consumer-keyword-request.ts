import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { AiInputError, readAiJson } from "./ai-request-body";
import { isAllowedSameOriginRequest } from "./request-origin";
import type { acquireConsumerAiLease } from "./consumer-ai-limits";
import { literalKeywordOccurs } from "./cv-keyword-evidence";

const inputSchema = z.object({ cvId: z.string().uuid(), requestId: z.string().uuid(), jobDescription: z.string().trim().min(20).max(8000) }).strict();
type Dependencies = {
  user: (request: NextRequest) => Promise<{ id: string } | null>;
  ownsPersonalCv: (userId: string, cvId: string) => Promise<boolean>;
  acquire: (userId: string, cvId: string, requestId: string) => ReturnType<typeof acquireConsumerAiLease>;
  extract: (vacancy: string, signal: AbortSignal) => Promise<{ keywords: Array<{ keyword: string }> }>;
};
const response = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function handleConsumerKeywordRequest(request: NextRequest, deps: Dependencies) {
  if (!request.headers.get("origin") || !isAllowedSameOriginRequest(request, { checkReferer: true })) return response({ code: "INVALID_ORIGIN" }, 403);
  let release: (() => Promise<void>) | undefined;
  try {
    const user = await deps.user(request);
    if (!user) return response({ code: "AUTH_REQUIRED" }, 401);
    const input = inputSchema.safeParse(await readAiJson(request, 32000));
    if (!input.success) return response({ code: "INVALID_INPUT" }, 400);
    const { cvId, requestId, jobDescription } = input.data;
    if (!(await deps.ownsPersonalCv(user.id, cvId))) return response({ code: "NOT_FOUND" }, 404);
    const lease = await deps.acquire(user.id, cvId, requestId);
    if (!lease.ok) return response({ code: lease.code }, lease.code === "REQUEST_REPLAY" ? 409 : 429);
    release = lease.release;
    const signal = AbortSignal.any([request.signal, AbortSignal.timeout(25000)]);
    const result = await deps.extract(jobDescription, signal);
    if (signal.aborted) return response({ code: "REQUEST_TIMEOUT" }, 408);
    // Literal vacancy terms only, never model claims about the applicant.
    const keywords = [...new Set(result.keywords.map(item => item.keyword.trim()).filter(term => literalKeywordOccurs(jobDescription, term)))].slice(0, 20);
    return response({ keywords: keywords.map(keyword => ({ keyword, found: false })) });
  } catch (error) {
    if (error instanceof AiInputError) return response({ code: error.code }, error.code === "INPUT_TOO_LARGE" ? 413 : 400);
    return response({ code: "SUGGESTION_FAILED" }, 503);
  } finally { if (release) await release().catch(() => undefined); }
}
