import test from "node:test";
import assert from "node:assert/strict";
import { createToolHandoffToken, toolHandoffHash, toolHandoffInput, validToolHandoffToken } from "./tool-cv-handoff";
test("handoff tokens are random, valid and hashed", () => { const a = createToolHandoffToken(); const b = createToolHandoffToken(); assert.notEqual(a, b); assert(validToolHandoffToken(a)); assert.equal(toolHandoffHash(a).length, 64); });
test("handoff payloads are allowlisted and bounded", () => { assert(toolHandoffInput.safeParse({ kind: "profile", locale: "nl", payload: { text: "Factual profile" } }).success); assert(!toolHandoffInput.safeParse({ kind: "profile", locale: "nl", payload: { text: "x".repeat(2201) } }).success); });
