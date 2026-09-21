import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { NextRequest } from "next/server";
import { defaultCV, cvSchema, type CVData } from "./cv";
import { cvContentVersion } from "./cv-content-version";
import { handleConsumerAiRequest } from "./consumer-ai-request";
import { consumerAiEnabled } from "./consumer-ai-availability";
import { aiCvExamples } from "./ai-cv-examples";
import { safeAiErrorCode } from "./ai-error-code";
import { agencyAnalyticsAllowed } from "./agency-analytics-consent";
import { sanitizeAiWritingProperties } from "./ai-writing-analytics";
import { cvKeywordEvidence } from "./cv-keyword-evidence";
import { detectWritingLanguage } from "./ai-writing-language";
import { preserveSafeBulletPositions } from "./ai-bullet-correspondence";
import { applyWritingChange, writingChanges } from "./ai-writing-changes";
import { handleConsumerKeywordRequest } from "./consumer-keyword-request";

function fixture() {
  const data = structuredClone(defaultCV);
  data.personal.resumeLanguage = "en";
  data.personal.name = "Fictional original";
  data.experience = [{ entryId: "job", company: "Example", role: "Assistant", start: "2023-01", end: "", location: "", description: "Keep this description", highlights: ["Answered customer enquiries by email.", "Answered customer enquiries by email."] }];
  let calls = 0;
  const body = { schemaVersion: 2, requestId: randomUUID(), cvId: randomUUID(), expectedContentVersion: cvContentVersion(data), data, action: "improve", target: { kind: "experience", entryId: "job" }, targetRole: "", jobDescription: "", facts: "", bullet: { operation: "replace_bullet", index: 1, expectedText: data.experience[0].highlights[1], expectedArray: [...data.experience[0].highlights] } };
  const deps = { enabled: true, user: async () => ({ id: "owner" }), document: async () => ({ data }), acquire: async () => ({ ok: true as const, release: async () => {} }), generate: async (source: CVData) => { calls++; const generated = structuredClone(source); generated.experience[0].highlights = ["Answered customer enquiries via email."]; return generated; } };
  const run = () => handleConsumerAiRequest(new NextRequest("https://werkcv.nl/api/ats-rewrite", { method: "POST", headers: { origin: "https://werkcv.nl", "content-type": "application/json" }, body: JSON.stringify(body) }), deps);
  return { body, deps, data, run, calls: () => calls };
}
test("v2 changes only the selected duplicate bullet and returns provenance digests", async () => {
  const f = fixture(); const result = await f.run(); const body = await result.json();
  assert.equal(result.status, 200); assert.equal(body.schemaVersion, 2);
  assert.equal(body.sourceArrayDigest, cvContentVersion(f.body.bullet.expectedArray));
  assert.equal(body.provenance.documentVersion, f.body.expectedContentVersion);
  assert.equal(body.provenance.requestId, f.body.requestId);
  assert.equal(body.provenance.sourceArrayDigest, body.sourceArrayDigest);
  assert.match(body.provenance.contextDigest, /^[a-f0-9]{64}$/);
  assert.equal(body.data.experience[0].description, f.data.experience[0].description);
  assert.deepEqual(body.data.personal, f.data.personal);
  assert.deepEqual(body.data.experience[0].highlights, [f.body.bullet.expectedText, "Answered customer enquiries via email."]);
});
test("v2 wrong array and index reject before model use", async () => {
  const f = fixture(); f.body.bullet.index = 8;
  assert.equal((await f.run()).status, 400); assert.equal(f.calls(), 0);
  f.body.bullet.index = 1; f.body.bullet.expectedArray[0] = "modified";
  assert.equal((await f.run()).status, 400); assert.equal(f.calls(), 0);
});

test("provenance context changes with vacancy while source version remains stable", async () => {
  const f = fixture();
  const first = await (await f.run()).json();
  f.body.jobDescription = "This role also asks for a forklift certificate.";
  const second = await (await f.run()).json();
  assert.equal(second.provenance.documentVersion, first.provenance.documentVersion);
  assert.equal(second.provenance.sourceArrayDigest, first.provenance.sourceArrayDigest);
  assert.notEqual(second.provenance.contextDigest, first.provenance.contextDigest);
});
test("v2 insertion requires factual notes and leaves stored data untouched", async () => {
  const f = fixture(); f.body.action = "draft_experience";
  f.body.bullet = { operation: "insert_bullet", index: 2, expectedText: "", expectedArray: [...f.data.experience[0].highlights] };
  assert.equal((await f.run()).status, 400);
  f.body.facts = "Answered customer enquiries by email.";
  const body = await (await f.run()).json();
  assert.equal(body.data.experience[0].highlights.length, 3); assert.equal(f.data.experience[0].highlights.length, 2);
});
test("v2 cannot hide a dropped negation in an ignored description", async () => {
  const f = fixture(); f.data.experience[0].highlights[1] = "Answered emails but did not manage staff.";
  f.body.expectedContentVersion = cvContentVersion(f.data);
  f.body.bullet.expectedText = f.data.experience[0].highlights[1]; f.body.bullet.expectedArray = [...f.data.experience[0].highlights];
  f.deps.generate = async source => ({ ...source, experience: source.experience.map(e => ({ ...e, description: "Did not manage staff.", highlights: ["Answered emails and managed staff."] })) });
  assert.equal((await f.run()).status, 422);
});
test("activation is strict, errors are bounded and analytics require explicit AI consent", () => {
  assert.equal(consumerAiEnabled("true"), true);
  for (const value of ["", "false", "TRUE", "1"]) assert.equal(consumerAiEnabled(value), false);
  assert.equal(safeAiErrorCode("MY_PRIVATE_CV_CONTENT"), "SUGGESTION_FAILED");
  assert.equal(safeAiErrorCode("AI_BUSY"), "AI_BUSY");
  for (const cookie of ["", "werkcv_ai_analytics_v1=denied", "werkcv_agency_analytics_v1=granted"]) assert.equal(agencyAnalyticsAllowed("ai_writing_result", "/editor", cookie), false);
  assert.equal(agencyAnalyticsAllowed("ai_writing_result", "/editor", "werkcv_ai_analytics_v1=granted"), true);
});
test("all editorial example CVs parse in both languages", () => {
  for (const locale of ["nl", "en"] as const) for (const example of aiCvExamples(locale)) {
    assert.equal(cvSchema.safeParse(example.data).success, true, example.id);
    assert.ok(example.data.personal.email.endsWith("@example.com"));
    if (example.id === "student") assert.equal(example.data.experience.length, 0);
  }
});

test("analytics allowlist drops content and bounds malformed numbers", () => {
  const result = sanitizeAiWritingProperties("ai_writing_result", { locale: "en", target: "experience", bullet: true, changeCount: Infinity, latency: "private text", cvText: "secret" });
  assert.deepEqual(result, { locale: "en", target: "experience", bullet: true, changeCount: 100, latency: "over_30s" });
  assert.equal(JSON.stringify(sanitizeAiWritingProperties("ai_writing_failed", { reason: "private text" })).includes("private text"), false);
});

test("keyword evidence is literal, escaped and excludes personal contact data", () => {
  const data = structuredClone(defaultCV);
  data.personal.email = "Excel@example.com";
  data.personal.summary = "Used Excel for school invoices, not advanced modelling.";
  assert.equal(cvKeywordEvidence(data, "Excel")[0].text, data.personal.summary);
  assert.equal(cvKeywordEvidence(data, "advanced").length, 1); // Negated text remains visible, not a skill judgment.
  assert.equal(cvKeywordEvidence(data, "example.com").length, 0);
  assert.equal(cvKeywordEvidence(data, ".*").length, 0);
  assert.equal(cvKeywordEvidence(data, "cel").length, 0);
});

test("shared prepositions do not misclassify Dutch writing as English", () => {
  assert.equal(detectWritingLanguage("Voerde facturen in Excel in."), "nl");
  assert.equal(detectWritingLanguage("Entered invoices in Excel."), "en");
  assert.equal(detectWritingLanguage("Excel in Utrecht"), "unknown");
  assert.equal(detectWritingLanguage("I answered enquiries with the team."), "en");
  assert.equal(detectWritingLanguage("Ik beantwoordde vragen met het team."), "nl");
});

test("first-applicant profile can use a real school project without inventing employment", async () => {
  const f = fixture(); f.data.experience = []; f.data.personal.summary = "";
  f.data.education = [{ degree: "Administration in progress", school: "Fictional school", location: "", start: "", end: "", description: "Entered invoices in Excel during a school project." }];
  f.body.expectedContentVersion = cvContentVersion(f.data);
  f.deps.generate = async source => ({ ...source, personal: { ...source.personal, summary: source.education[0].description } });
  const response = await handleConsumerAiRequest(new NextRequest("https://werkcv.nl/api/ats-rewrite", { method: "POST", headers: { origin: "https://werkcv.nl", "content-type": "application/json" }, body: JSON.stringify({ ...f.body, schemaVersion: 1, target: { kind: "profile" }, action: "draft_profile", bullet: undefined }) }), f.deps);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.deepEqual(body.data.experience, []);
  assert.deepEqual(body.data.education, f.data.education);
  assert.equal(body.data.personal.summary, f.data.education[0].description);
});

test("section generation cannot reorder, remove or redistribute numerical facts", () => {
  const original = ["Processed 25 orders per shift.", "Answered customer emails."];
  assert.deepEqual(preserveSafeBulletPositions(original, [...original].reverse()), original);
  assert.deepEqual(preserveSafeBulletPositions(original, [original[0]]), original);
  assert.deepEqual(preserveSafeBulletPositions(original, [original[0], "Answered 25 customer emails per shift."]), original);
  assert.deepEqual(preserveSafeBulletPositions(["Used Excel without management duties."], ["Managed staff using Excel."]), ["Used Excel without management duties."]);
});

test("a malformed bullet operation cannot overwrite a sibling", () => {
  const f = fixture(); const after = structuredClone(f.data);
  after.experience[0].highlights[1] = "Answered enquiries via email.";
  const change = writingChanges(f.data, after, { kind: "experience", entryId: "job" }, { operation: "replace_bullet", index: 1 })[0];
  change.bullet!.arrayAfter[0] = "Unexpected unrelated replacement";
  assert.throws(() => applyWritingChange(f.data, change), /INVALID_TARGET/);
  assert.equal(f.data.experience[0].highlights[0], "Answered customer enquiries by email.");
});

test("vacancy extraction requires ownership, limits input and returns only literal terms", async () => {
  let owned = true, called = 0, released = 0;
  const input = { cvId: randomUUID(), requestId: randomUUID(), jobDescription: "We need Excel and NoSQL experience for this vacancy." };
  const request = (value: unknown = input, origin = "https://werkcv.nl") => new NextRequest("https://werkcv.nl/api/keyword-scan", { method: "POST", headers: { origin, "content-type": "application/json" }, body: JSON.stringify(value) });
  const deps = { user: async () => ({ id: "owner" }), ownsPersonalCv: async () => owned, acquire: async () => ({ ok: true as const, release: async () => { released++; } }), extract: async () => { called++; return { keywords: [{ keyword: "Excel" }, { keyword: "Python" }, { keyword: "SQL" }, { keyword: "NoSQL" }] }; } };
  const good = await handleConsumerKeywordRequest(request(), deps);
  assert.equal(good.headers.get("cache-control"), "no-store");
  assert.deepEqual((await good.json()).keywords, [{ keyword: "Excel", found: false }, { keyword: "NoSQL", found: false }]);
  assert.equal(released, 1);
  assert.equal((await handleConsumerKeywordRequest(request(input, "https://evil.example"), deps)).status, 403);
  owned = false;
  assert.equal((await handleConsumerKeywordRequest(request(), deps)).status, 404);
  assert.equal((await handleConsumerKeywordRequest(request({ ...input, jobDescription: "x".repeat(8001) }), deps)).status, 400);
  assert.equal((await handleConsumerKeywordRequest(request({ ...input, cvData: { private: "not allowed" } }), deps)).status, 400);
  assert.equal(called, 1);
});

test("vacancy quota and provider failures are safe and release admission", async () => {
  const input = { cvId: randomUUID(), requestId: randomUUID(), jobDescription: "A vacancy with Excel and customer service." };
  const request = () => new NextRequest("https://werkcv.nl/api/keyword-scan", { method: "POST", headers: { origin: "https://werkcv.nl", "content-type": "application/json" }, body: JSON.stringify(input) });
  let released = 0;
  const deps = { user: async () => ({ id: "owner" }), ownsPersonalCv: async () => true, acquire: async () => ({ ok: true as const, release: async () => { released++; } }), extract: async (): Promise<{ keywords: Array<{ keyword: string }> }> => { throw new Error("PRIVATE_PROVIDER_CONTENT"); } };
  const failed = await handleConsumerKeywordRequest(request(), deps);
  assert.equal(failed.status, 503); assert.equal(released, 1);
  assert.equal((await failed.text()).includes("PRIVATE_PROVIDER_CONTENT"), false);
  const limited = await handleConsumerKeywordRequest(request(), { ...deps, acquire: async () => ({ ok: false, code: "AI_DAILY_LIMIT" }) });
  assert.equal(limited.status, 429); assert.equal(released, 1);
  assert.equal((await handleConsumerKeywordRequest(request(), { ...deps, user: async () => null })).status, 401);
});
