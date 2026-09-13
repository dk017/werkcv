import { z } from "zod";
const text = z.string().trim().min(1);
export const toolHandoffInput = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("profile"), locale: z.enum(["nl", "en"]), payload: z.object({ text: text.max(2200) }).strict() }).strict(),
  z.object({ kind: z.literal("experience"), locale: z.enum(["nl", "en"]), payload: z.object({ role: text.max(160), company: z.string().trim().max(160), bullets: z.array(text.max(700)).min(1).max(8) }).strict() }).strict(),
]);
export type ToolHandoff = z.infer<typeof toolHandoffInput>;
