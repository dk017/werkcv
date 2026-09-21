import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cvSchema, type CVData } from "./cv";
import { cvContentVersion } from "./cv-content-version";
import { rewriteContext } from "./ai-rewrite-review";
import { isAllowedSameOriginRequest } from "./request-origin";
import { AiInputError, readAiJson } from "./ai-request-body";
import type { acquireConsumerAiLease } from "./consumer-ai-limits";
import { writingActionSchema, writingTargetSchema, WRITING_PROMPT_VERSION, type WritingAction, type WritingTarget } from "./ai-writing-changes";
import { checkWritingFacts, WRITING_GUARD_VERSION } from "./ai-writing-facts";
import { preserveSafeBulletPositions } from "./ai-bullet-correspondence";

const legacySchema = z.object({
  schemaVersion: z.literal(1),
  requestId: z.string().uuid(),
  cvId: z.string().uuid(),
  expectedContentVersion: z.string().regex(/^[a-f0-9]{64}$/),
  data: cvSchema,
  targetRole: z.string().max(200),
  jobDescription: z.string().max(8000),
  action: writingActionSchema.default("tailor"),
  target: writingTargetSchema.default({ kind: "all" }),
  facts: z.string().max(4000).default(""),
}).strict();
const schema = z.discriminatedUnion("schemaVersion", [legacySchema, legacySchema.extend({
  schemaVersion: z.literal(2),
  bullet: z.object({ operation: z.enum(["replace_bullet", "insert_bullet"]), index: z.number().int().min(0).max(30),
    expectedText: z.string().max(1000), expectedArray: z.array(z.string().max(1000)).max(30) }).strict(),
}).strict()]);
type Dependencies = {
  enabled: boolean;
  user: (request: NextRequest) => Promise<{ id: string } | null>;
  document: (userId: string, cvId: string) => Promise<{ data: unknown } | null>;
  acquire: (userId: string, cvId: string, requestId: string) => ReturnType<typeof acquireConsumerAiLease>;
  generate: (source: CVData, options: { targetRole: string; jobDescription: string; preferredLanguage: "nl" | "en"; signal: AbortSignal; action: WritingAction; target: WritingTarget }) => Promise<CVData>;
};
const reply = (code: string, status: number) => NextResponse.json({ code }, {
  status, headers: { "Cache-Control": "no-store", ...(status === 429 ? { "Retry-After": code === "AI_DAILY_LIMIT" ? "86400" : "60" } : {}) },
});
export async function handleConsumerAiRequest(request: NextRequest, deps: Dependencies) {
  if (!deps.enabled) return reply("FEATURE_UNAVAILABLE", 503);
  if (!request.headers.get("origin") || !isAllowedSameOriginRequest(request, { checkReferer: true })) return reply("INVALID_ORIGIN", 403);
  let release: (() => Promise<void>) | undefined;
  try {
    const user = await deps.user(request);
    if (!user) return reply("AUTH_REQUIRED", 401);
    const parsed = schema.safeParse(await readAiJson(request));
    if (!parsed.success) return reply("INVALID_INPUT", 400);
    const input = parsed.data;
    const cv = await deps.document(user.id, input.cvId);
    if (!cv) return reply("NOT_FOUND", 404);
    if (cvContentVersion(cv.data) !== input.expectedContentVersion) return reply("STALE_DOCUMENT", 409);
    // Persisted fields are authoritative. Explicit fact notes below are separate,
    // unverified user assertions, scoped to the requested section, not verified facts.
    const stored = cvSchema.safeParse(cv.data);
    if (!stored.success) return reply("NOT_FOUND", 404);
    const source = rewriteContext(stored.data);
    if ((input.action === "draft_profile" && input.target.kind !== "profile") ||
      (input.action === "draft_experience" && input.target.kind !== "experience") ||
      (input.target.kind === "all" && input.action !== "tailor") ||
      (input.target.kind !== "all" && input.action === "tailor") ||
      (input.target.kind === "all" && input.facts.trim())) return reply("INVALID_INPUT", 400);
    const selectedEntry = input.target.kind === "experience"
      ? source.experience.find(e => e.entryId === (input.target as { entryId: string }).entryId) : undefined;
    if (input.target.kind === "experience" && !selectedEntry) return reply("INVALID_INPUT", 400);
    const bullet = input.schemaVersion === 2 ? input.bullet : undefined;
    if (bullet && (!selectedEntry || input.target.kind !== "experience" ||
      JSON.stringify(selectedEntry.highlights) !== JSON.stringify(bullet.expectedArray) ||
      (bullet.operation === "replace_bullet" ? selectedEntry.highlights[bullet.index] !== bullet.expectedText || !["improve", "shorten"].includes(input.action)
        : bullet.index !== selectedEntry.highlights.length || bullet.index >= 30 || bullet.expectedText !== "" || input.action !== "draft_experience" || !input.facts.trim()))) return reply("INVALID_INPUT", 400);
    const originalTargetText = bullet ? bullet.expectedText : input.target.kind === "profile" ? source.personal.summary :
      selectedEntry ? [selectedEntry.description, ...selectedEntry.highlights].join("\n") : "";
    if ((input.action === "improve" || input.action === "shorten") && !originalTargetText.trim()) return reply("MORE_FACTS_REQUIRED", 422);
    if (input.target.kind === "profile" && input.facts.trim()) source.personal.summary += "\n" + input.facts.trim();
    if (selectedEntry && input.facts.trim()) {
      // Copy, never mutate the submitted data object or saved CV.
      source.experience = source.experience.map(e => e.entryId === selectedEntry.entryId ? { ...e, description: e.description + "\n" + input.facts.trim() } : e);
    }
    if (input.target.kind === "experience") {
      source.personal = { ...source.personal, summary: "", title: "" };
      source.experience = source.experience.filter(e => e.entryId === selectedEntry?.entryId);
      source.education = []; source.skills = [];
    }
    if (bullet && selectedEntry) {
      // A single bullet is rewritten in isolation. Other bullets cannot donate facts.
      source.experience = [{ ...selectedEntry, description: "",
        highlights: [bullet.operation === "replace_bullet" ? bullet.expectedText : input.facts.trim()] }];
    }
    if (!source.personal.resumeLanguage) return reply("INVALID_INPUT", 400);
    const ids = source.experience.map(e => e.entryId);
    if (ids.some(id => !id) || new Set(ids).size !== ids.length) return reply("INVALID_INPUT", 400);
    if (JSON.stringify(source).length > 18000 || source.personal.summary.length > 4000 ||
      source.experience.some(e => e.description.length + e.highlights.join("\n").length > 4000)) return reply("INPUT_TOO_LARGE", 413);
    const hasConcreteSource = source.personal.summary.trim().length >= 20 ||
      source.experience.some(e => [e.description, ...e.highlights].join(" ").trim().length >= 20) ||
      (input.target.kind !== "experience" && source.education.some(e => e.description.trim().length >= 20));
    if (!hasConcreteSource) return reply("MORE_FACTS_REQUIRED", 422);
    const lease = await deps.acquire(user.id, input.cvId, input.requestId);
    if (!lease.ok) return reply(lease.code, lease.code === "REQUEST_REPLAY" ? 409 : 429);
    release = lease.release;
    const signal = AbortSignal.any([request.signal, AbortSignal.timeout(40000)]);
    const generated = await deps.generate(source, {
      targetRole: input.targetRole, jobDescription: input.jobDescription,
      preferredLanguage: source.personal.resumeLanguage, signal,
      action: input.action, target: input.target,
    });
    // A section action may never alter other sections, even if the provider returns them.
    let bulletReviewRequired = false;
    const data: CVData = {
      ...stored.data,
      personal: input.target.kind !== "experience" ? { ...stored.data.personal, summary: generated.personal.summary } : stored.data.personal,
      experience: input.target.kind !== "profile" ? stored.data.experience.map(e => {
        if (input.target.kind === "experience" && e.entryId !== selectedEntry?.entryId) return e;
        const proposed = generated.experience.find(g => g.entryId === e.entryId);
        if (!proposed) throw new Error("INVALID_TARGET");
        if (bullet) {
          if (proposed.highlights.length !== 1 || !proposed.highlights[0].trim()) throw new Error("INVALID_TARGET");
          if (checkWritingFacts(bullet.operation === "replace_bullet" ? bullet.expectedText : input.facts.trim(), proposed.highlights[0]).length) throw new Error("AI_FACT_CHECK_FAILED");
          const highlights = [...e.highlights];
          highlights.splice(bullet.index, bullet.operation === "replace_bullet" ? 1 : 0, proposed.highlights[0]);
          return { ...e, highlights };
        }
        const highlights = preserveSafeBulletPositions(e.highlights, proposed.highlights);
        if (JSON.stringify(highlights) !== JSON.stringify(proposed.highlights)) bulletReviewRequired = true;
        return { ...e, description: proposed.description, highlights };
      }) : stored.data.experience,
    };
    if (input.action === "shorten") {
      const shortened = bullet ? data.experience.find(e => e.entryId === selectedEntry?.entryId)!.highlights[bullet.index] : input.target.kind === "profile" ? data.personal.summary :
        data.experience.filter(e => e.entryId === selectedEntry?.entryId).map(e => [e.description, ...e.highlights].join("\n")).join("");
      if (shortened.length >= originalTargetText.length) return reply("NO_SHORTER_SUGGESTION", 422);
    }
    if (signal.aborted) return reply("REQUEST_TIMEOUT", 408);
    const latest = await deps.document(user.id, input.cvId);
    if (!latest || cvContentVersion(latest.data) !== input.expectedContentVersion) return reply("STALE_DOCUMENT", 409);
    return NextResponse.json({ schemaVersion: input.schemaVersion, requestId: input.requestId, data, bulletReviewRequired,
      provenance: {
        requestId: input.requestId,
        documentVersion: input.expectedContentVersion,
        contextDigest: cvContentVersion({ source: rewriteContext(stored.data), target: input.target, action: input.action,
          role: input.targetRole, vacancy: input.jobDescription, facts: input.facts, bullet: bullet || null }),
        ...(bullet ? { sourceArrayDigest: cvContentVersion(bullet.expectedArray) } : {}),
      },
      ...(bullet ? { sourceArrayDigest: cvContentVersion(bullet.expectedArray), sourceContentVersion: input.expectedContentVersion } : {}),
      verifierVersion: WRITING_GUARD_VERSION, promptVersion: WRITING_PROMPT_VERSION, model: "gpt-4o-mini", generatedAt: new Date().toISOString(),
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof AiInputError) return reply(error.code, error.code === "INPUT_TOO_LARGE" ? 413 : error.code === "REQUEST_TIMEOUT" ? 408 : 400);
    if (error instanceof Error && error.message === "AI_FACT_CHECK_FAILED") return reply("FACT_REVIEW_REQUIRED", 422);
    return reply("SUGGESTION_FAILED", 503);
  } finally {
    // Expiring lease is the backstop if DB release fails. Never expose request content.
    if (release) await release().catch(() => undefined);
  }
}
