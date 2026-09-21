import { z } from "zod";
import type { CVData } from "./cv";
import { rewriteContext } from "./ai-rewrite-review";
export const WRITING_PROMPT_VERSION = "writing-2026-09-20.1";

export const writingActionSchema = z.enum(["draft_profile", "draft_experience", "improve", "shorten", "tailor"]);
export const writingTargetSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("all") }).strict(),
  z.object({ kind: z.literal("profile") }).strict(),
  z.object({ kind: z.literal("experience"), entryId: z.string().min(1).max(80) }).strict(),
]);
export type WritingAction = z.infer<typeof writingActionSchema>;
export type WritingTarget = z.infer<typeof writingTargetSchema>;
export type BulletSelection = { operation: "replace_bullet" | "insert_bullet"; index: number };
export type WritingSelection = { target: WritingTarget; action: WritingAction; bullet?: BulletSelection };
export const writingProvenanceSchema = z.object({
  requestId: z.string().uuid(),
  documentVersion: z.string().regex(/^[a-f0-9]{64}$/),
  contextDigest: z.string().regex(/^[a-f0-9]{64}$/),
  sourceArrayDigest: z.string().regex(/^[a-f0-9]{64}$/).optional(),
}).strict();
export type WritingProvenance = z.infer<typeof writingProvenanceSchema>;
export type WritingChange = {
  id: string;
  target: WritingTarget;
  field: "summary" | "description" | "highlights";
  before: string | string[];
  after: string | string[];
  label: string;
  provenance?: WritingProvenance & { operationId: string };
  bullet?: BulletSelection & { arrayBefore: string[]; arrayAfter: string[] };
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
export function writingChanges(before: CVData, after: CVData, target: WritingTarget, bullet?: BulletSelection): WritingChange[] {
  const changes: WritingChange[] = [];
  if (target.kind !== "experience" && before.personal.summary !== after.personal.summary) {
    changes.push({ id: "profile", target: { kind: "profile" }, field: "summary", before: before.personal.summary, after: after.personal.summary, label: "" });
  }
  if (target.kind === "profile") return changes;
  for (const entry of before.experience) {
    if (!entry.entryId || (target.kind === "experience" && target.entryId !== entry.entryId)) continue;
    const matches = after.experience.filter(e => e.entryId === entry.entryId);
    if (matches.length !== 1) throw new Error("INVALID_TARGET");
    for (const field of ["description"] as const) {
      if (bullet) continue;
      if (!same(entry[field], matches[0][field])) changes.push({
        id: entry.entryId + ":" + field, target: { kind: "experience", entryId: entry.entryId },
        field, before: entry[field], after: matches[0][field], label: [entry.role, entry.company].filter(Boolean).join(" — "),
      });
    }
    const proposed = matches[0].highlights;
    const label = [entry.role, entry.company].filter(Boolean).join(" — ");
    if (bullet?.operation === "insert_bullet") {
      if (proposed.length !== entry.highlights.length + 1 || bullet.index !== entry.highlights.length) throw new Error("INVALID_TARGET");
      changes.push({ id: `${entry.entryId}:insert:${bullet.index}`, target: { kind: "experience", entryId: entry.entryId }, field: "highlights", before: "", after: proposed[bullet.index], label,
        bullet: { ...bullet, arrayBefore: [...entry.highlights], arrayAfter: [...proposed] } });
    } else if (proposed.length === entry.highlights.length) {
      // Never pair a known moved bullet with its old index.
      for (let index = 0; index < proposed.length; index++) {
        if (bullet && bullet.index !== index) continue;
        if (proposed[index] === entry.highlights[index]) continue;
        if (!bullet && entry.highlights.some((text, i) => i !== index && text === proposed[index])) continue;
        const arrayAfter = [...entry.highlights]; arrayAfter[index] = proposed[index];
        changes.push({ id: `${entry.entryId}:bullet:${index}`, target: { kind: "experience", entryId: entry.entryId }, field: "highlights", before: entry.highlights[index], after: proposed[index], label,
          bullet: { operation: "replace_bullet", index, arrayBefore: [...entry.highlights], arrayAfter } });
      }
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
  if (change.bullet) {
    const operation = change.bullet;
    if (typeof change.after !== "string" || typeof change.before !== "string" || !Number.isInteger(operation.index) || operation.index < 0) throw new Error("INVALID_TARGET");
    const derived = [...operation.arrayBefore];
    if (operation.operation === "replace_bullet") {
      if (derived[operation.index] !== change.before) throw new Error("INVALID_TARGET");
      derived[operation.index] = change.after;
    } else {
      if (operation.index !== derived.length || change.before !== "") throw new Error("INVALID_TARGET");
      derived.push(change.after);
    }
    if (!same(derived, operation.arrayAfter)) throw new Error("INVALID_TARGET");
    const expectedArray = undo ? change.bullet.arrayAfter : change.bullet.arrayBefore;
    const replacement = undo ? change.bullet.arrayBefore : change.bullet.arrayAfter;
    if (matches.length !== 1 || !same(matches[0].highlights, expectedArray)) throw new Error("STALE_CHANGE");
    return { ...data, experience: data.experience.map(e => e.entryId === entryId ? { ...e, highlights: [...replacement] } : e) };
  }
  if (matches.length !== 1 || change.field === "summary" || !same(matches[0][change.field], expected)) throw new Error("STALE_CHANGE");
  const field = change.field;
  if ((field === "highlights" && !Array.isArray(value)) || (field === "description" && typeof value !== "string")) throw new Error("INVALID_TARGET");
  return { ...data, experience: data.experience.map(e => e.entryId === entryId
    ? { ...e, [field]: Array.isArray(value) ? [...value] : value } : e) };
}

/** Only call immediately after a known accepted operation in the same review. */
export function rebaseWritingChanges(changes: WritingChange[], accepted: WritingChange, data: CVData): WritingChange[] {
  if (!accepted.bullet || accepted.target.kind !== "experience") return changes;
  const entryId = accepted.target.entryId;
  const entry = data.experience.find(e => e.entryId === entryId);
  if (!entry) throw new Error("STALE_CHANGE");
  return changes.map(change => {
    if (!change.bullet || change.id === accepted.id || change.target.kind !== "experience" || change.target.entryId !== entryId) return change;
    if (!same(change.bullet.arrayBefore, accepted.bullet!.arrayBefore)) return change;
    const arrayAfter = [...entry.highlights];
    if (change.bullet.operation !== "replace_bullet" || arrayAfter[change.bullet.index] !== change.before) return change;
    arrayAfter[change.bullet.index] = change.after as string;
    return { ...change, bullet: { ...change.bullet, arrayBefore: [...entry.highlights], arrayAfter } };
  });
}
