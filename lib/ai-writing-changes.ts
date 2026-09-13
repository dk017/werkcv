import { z } from "zod";
import type { CVData } from "./cv";
import { rewriteContext } from "./ai-rewrite-review";
export const WRITING_PROMPT_VERSION = "writing-2026-09-12.2";

export const writingActionSchema = z.enum(["draft_profile", "draft_experience", "improve", "shorten", "tailor"]);
export const writingTargetSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("all") }).strict(),
  z.object({ kind: z.literal("profile") }).strict(),
  z.object({ kind: z.literal("experience"), entryId: z.string().min(1).max(80) }).strict(),
]);
export type WritingAction = z.infer<typeof writingActionSchema>;
export type WritingTarget = z.infer<typeof writingTargetSchema>;
export type WritingSelection = { target: WritingTarget; action: WritingAction };
export type WritingChange = {
  id: string;
  target: WritingTarget;
  field: "summary" | "description" | "highlights";
  before: string | string[];
  after: string | string[];
  label: string;
};
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
export function writingContextKey(data: CVData, target: WritingTarget, vacancy: string, role: string): string {
  const context = rewriteContext(data);
  // Experience writing cannot borrow facts from another employer.
  if (target.kind === "experience") return JSON.stringify([
    context.personal.resumeLanguage, context.experience.find(e => e.entryId === target.entryId), vacancy, role,
  ]);
  return JSON.stringify([context, vacancy, role]);
}
export function writingChanges(before: CVData, after: CVData, target: WritingTarget): WritingChange[] {
  const changes: WritingChange[] = [];
  if (target.kind !== "experience" && before.personal.summary !== after.personal.summary) {
    changes.push({ id: "profile", target: { kind: "profile" }, field: "summary", before: before.personal.summary, after: after.personal.summary, label: "" });
  }
  if (target.kind === "profile") return changes;
  for (const entry of before.experience) {
    if (!entry.entryId || (target.kind === "experience" && target.entryId !== entry.entryId)) continue;
    const matches = after.experience.filter(e => e.entryId === entry.entryId);
    if (matches.length !== 1) throw new Error("INVALID_TARGET");
    for (const field of ["description", "highlights"] as const) {
      if (!same(entry[field], matches[0][field])) changes.push({
        id: entry.entryId + ":" + field, target: { kind: "experience", entryId: entry.entryId },
        field, before: entry[field], after: matches[0][field], label: [entry.role, entry.company].filter(Boolean).join(" — "),
      });
    }
  }
  return changes;
}
export function applyWritingChange(data: CVData, change: WritingChange, undo = false): CVData {
  const expected = undo ? change.after : change.before;
  const value = undo ? change.before : change.after;
  if (change.target.kind === "profile" && change.field === "summary") {
    if (typeof value !== "string" || data.personal.summary !== expected) throw new Error("STALE_CHANGE");
    return { ...data, personal: { ...data.personal, summary: value } };
  }
  if (change.target.kind !== "experience") throw new Error("INVALID_TARGET");
  const entryId = change.target.entryId;
  const matches = data.experience.filter(e => e.entryId === entryId);
  if (matches.length !== 1 || change.field === "summary" || !same(matches[0][change.field], expected)) throw new Error("STALE_CHANGE");
  const field = change.field;
  if ((field === "highlights" && !Array.isArray(value)) || (field === "description" && typeof value !== "string")) throw new Error("INVALID_TARGET");
  return { ...data, experience: data.experience.map(e => e.entryId === entryId
    ? { ...e, [field]: Array.isArray(value) ? [...value] : value } : e) };
}
