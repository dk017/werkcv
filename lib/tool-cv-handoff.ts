import { createHash, randomBytes } from "node:crypto";
export { toolHandoffInput, type ToolHandoff } from "./tool-cv-handoff-schema";
export const toolHandoffHash = (token: string) => createHash("sha256").update(token).digest("hex");
export const createToolHandoffToken = () => randomBytes(32).toString("base64url");
export const validToolHandoffToken = (value: unknown): value is string => typeof value === "string" && /^[A-Za-z0-9_-]{43}$/.test(value);
