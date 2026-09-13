import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { NextRequest } from "next/server";
import { defaultCV } from "./cv";
import { cvContentVersion } from "./cv-content-version";
import { createCvSaveQueue } from "./cv-save-queue";
import { readAiJson } from "./ai-request-body";
import { checkWritingFacts, assertWritingFacts } from "./ai-writing-facts";
import { handleConsumerAiRequest } from "./consumer-ai-request";
import { applyReviewedRewrite } from "./ai-rewrite-review";
import { aiDailyLimit } from "./consumer-ai-limits";

test("content versions ignore key order, not text changes", () => {
  assert.equal(cvContentVersion({ a: 1, b: 2 }), cvContentVersion({ b: 2, a: 1 }));
  assert.notEqual(cvContentVersion({ a: 1 }), cvContentVersion({ a: 2 }));
});
test("save queue serialises snapshots and advances only acknowledged versions", async () => {
  const calls: unknown[] = [];
  const q = createCvSaveQueue("v0", async (data: string, version) => {
    calls.push([data, version]); await new Promise(r => setTimeout(r, 5));
    return { success: true, contentVersion: data };
  });
  await Promise.all([q.save("v1"), q.save("v2"), q.save("v3")]);
  assert.deepEqual(calls, [["v1", "v0"], ["v2", "v1"], ["v3", "v2"]]);
});
for (const failure of ["SAVE_CONFLICT", "network"]) {
  test("queue blocks later writes after " + failure, async () => {
    let calls = 0;
    const q = createCvSaveQueue("v0", async () => {
      calls++; if (failure === "network") throw new Error("private exception");
      return { success: false, error: failure };
    });
    await q.save("first"); await q.save("second");
    assert.equal(calls, 1);
    assert.equal(q.getVersion(), "v0");
  });
}
for (const [source, output, issue] of [
  ["Processed 20 orders daily.", "Processed 200 orders daily.", "NEW_NUMBER_OR_UNIT"],
  ["Processed 20 orders daily.", "Managed 20 people daily.", "NEW_NUMBER_OR_UNIT"],
  ["Werkte vier jaar in logistiek.", "Werkte vijf jaar in logistiek.", "NEW_NUMBER_OR_UNIT"],
  ["Used Excel daily.", "Used Python daily.", "NEW_NAMED_TERM"],
  ["Supported the team.", "Led the team.", "INFLATED_SCOPE"],
  ["Geen ervaring met AFAS.", "Ervaring met AFAS.", "LOST_QUALIFIER"],
  ["I did not manage staff.", "I managed staff.", "LOST_QUALIFIER"],
  ["Basic English.", "Fluent English.", "INFLATED_SCOPE"],
]) test("rejects " + output, () => assert.ok(checkWritingFacts(source, output).includes(issue as ReturnType<typeof checkWritingFacts>[number])));

test("unchanged factual writing passes", () => {
  assert.deepEqual(checkWritingFacts("Processed 20 orders daily.", "Processed 20 orders daily."), []);
});
const experience = (entryId: string, company: string, description: string) => ({
  entryId, company, description, role: "Warehouse assistant", location: "", start: "", end: "", highlights: [],
});
test("stable IDs apply by identity after reordering; unknown IDs reject", () => {
  const current = { ...structuredClone(defaultCV), experience: [experience("a", "Alpha", "first"), experience("b", "Beta", "second")] };
  const proposal = { ...current, experience: [experience("b", "Beta", "second new"), experience("a", "Alpha", "first new")] };
  assert.equal(applyReviewedRewrite(current, proposal).experience[0].description, "first new");
  proposal.experience[0].entryId = "c";
  assert.throws(() => applyReviewedRewrite(current, proposal));
});
test("facts from one employer cannot substantiate another employer's output", () => {
  const source = { ...structuredClone(defaultCV), experience: [experience("a", "Alpha", "Processed 20 orders."), experience("b", "Beta", "Processed 10 orders.")] };
  const proposed = structuredClone(source); proposed.experience[1].description = "Processed 20 orders.";
  assert.throws(() => assertWritingFacts(source, proposed), /AI_FACT_CHECK_FAILED/);
});
test("request parser bounds actual streamed bytes and rejects malformed JSON", async () => {
  await assert.rejects(readAiJson(new Request("https://werkcv.nl", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ x: "é".repeat(100) }) }), 50));
  await assert.rejects(readAiJson(new Request("https://werkcv.nl", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" })), /INVALID_INPUT/);
});
test("attempt limit configuration is bounded", () => {
  assert.equal(aiDailyLimit(), 30); assert.equal(aiDailyLimit("5"), 5);
  for (const value of ["-1", "0", "NaN", "5000"]) assert.equal(aiDailyLimit(value), 30);
});

function fixture() {
  const data = structuredClone(defaultCV); data.personal.summary = "Processed customer orders daily.";
  const input = { schemaVersion: 1, requestId: randomUUID(), cvId: randomUUID(), expectedContentVersion: cvContentVersion(data), data, targetRole: "", jobDescription: "" };
  let generated = 0, released = 0;
  const deps = {
    enabled: true,
    user: async () => ({ id: "owner" }),
    document: async () => ({ data }),
    acquire: async () => ({ ok: true as const, release: async () => { released++; } }),
    generate: async () => { generated++; return data; },
  };
  const request = (body: unknown = input, origin = "https://werkcv.nl") => new NextRequest("https://werkcv.nl/api/ats-rewrite", {
    method: "POST", headers: { origin, "Content-Type": "application/json" }, body: JSON.stringify(body),
  });
  return { input, deps, request, stats: () => ({ generated, released }) };
}
test("request success releases lease and sends no-store", async () => {
  const f = fixture(); const result = await handleConsumerAiRequest(f.request(), f.deps);
  assert.equal(result.status, 200); assert.equal(result.headers.get("cache-control"), "no-store");
  assert.deepEqual(f.stats(), { generated: 1, released: 1 });
});
test("disabled flag, forged origin, stale content and legacy payload never generate", async () => {
  const f = fixture();
  assert.equal((await handleConsumerAiRequest(f.request(), { ...f.deps, enabled: false })).status, 503);
  assert.equal((await handleConsumerAiRequest(f.request(f.input, "https://evil.example"), f.deps)).status, 403);
  assert.equal((await handleConsumerAiRequest(f.request({ ...f.input, expectedContentVersion: "0".repeat(64) }), f.deps)).status, 409);
  assert.equal((await handleConsumerAiRequest(f.request({ cvId: f.input.cvId }), f.deps)).status, 400);
  assert.equal(f.stats().generated, 0);
});
test("ownership and quota failure never generate", async () => {
  const f = fixture();
  assert.equal((await handleConsumerAiRequest(f.request(), { ...f.deps, document: async () => null })).status, 404);
  assert.equal((await handleConsumerAiRequest(f.request(), { ...f.deps, acquire: async () => ({ ok: false, code: "AI_DAILY_LIMIT" }) })).status, 429);
  assert.equal(f.stats().generated, 0);
});
test("provider exception releases lease without exposing private exception", async () => {
  const f = fixture();
  const result = await handleConsumerAiRequest(f.request(), { ...f.deps, generate: async () => { throw new Error("private CV content"); } });
  assert.equal(result.status, 503); assert.equal((await result.text()).includes("private"), false);
  assert.equal(f.stats().released, 1);
});
test("document changed during generation returns no suggestion", async () => {
  const f = fixture(); let reads = 0;
  const result = await handleConsumerAiRequest(f.request(), { ...f.deps, document: async () => ({ data: ++reads === 1 ? f.input.data : defaultCV }) });
  assert.equal(result.status, 409); assert.equal(f.stats().released, 1);
});

test("profile notes are generation evidence, not persisted CV fields", async () => {
  const f = fixture();
  const original = JSON.stringify(f.input.data);
  const response = await handleConsumerAiRequest(f.request({ ...f.input, target: { kind: "profile" }, action: "draft_profile", facts: "I processed orders and handled returns." }), {
    ...f.deps, generate: async source => {
      assert.ok(source.personal.summary.includes("handled returns"));
      return { ...source, personal: { ...source.personal, summary: "A proposed profile" } };
    },
  });
  assert.equal(response.status, 200);
  assert.equal(JSON.stringify(f.input.data), original);
});
test("experience action uses only the selected employer and preserves profile", async () => {
  const f = fixture();
  f.input.data.experience = [experience("a", "Alpha", "Processed orders and packaged deliveries."), experience("b", "Beta", "Worked on different tasks and projects.")];
  f.input.expectedContentVersion = cvContentVersion(f.input.data);
  const response = await handleConsumerAiRequest(f.request({ ...f.input, target: { kind: "experience", entryId: "a" }, action: "improve" }), {
    ...f.deps, generate: async source => {
      assert.equal(source.experience.length, 1);
      assert.equal(source.experience[0].company, "Alpha");
      assert.equal(source.personal.summary, "");
      return { ...source, personal: { ...source.personal, summary: "Must not replace profile" } };
    },
  });
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.data.personal.summary, f.input.data.personal.summary);
  assert.deepEqual(body.data.experience[1], f.input.data.experience[1]);
});
test("invalid action/target and non-shorter output fail safely", async () => {
  const f = fixture();
  assert.equal((await handleConsumerAiRequest(f.request({ ...f.input, action: "draft_experience", target: { kind: "profile" } }), f.deps)).status, 400);
  assert.equal((await handleConsumerAiRequest(f.request({ ...f.input, action: "shorten", target: { kind: "profile" } }), f.deps)).status, 422);
});
