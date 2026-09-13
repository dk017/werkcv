import "dotenv/config";
import assert from "node:assert/strict";
import { rewriteCVForATS } from "../ats-rewrite";
import { defaultCV, type CVData } from "../cv";
import { NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import { handleConsumerAiRequest } from "../consumer-ai-request";
import { cvContentVersion } from "../cv-content-version";
import { checkWritingFacts, WRITING_GUARD_VERSION } from "../ai-writing-facts";
import { WRITING_PROMPT_VERSION } from "../ai-writing-changes";
import { execFileSync } from "node:child_process";

type Case = { id: string; locale: "nl" | "en"; data: CVData; action: "improve" | "shorten"; target: { kind: "profile" } | { kind: "experience"; entryId: string } };
function cv(locale: "nl" | "en", summary: string, description: string, highlights: string[]): CVData {
  return { ...structuredClone(defaultCV), personal: { ...structuredClone(defaultCV.personal), resumeLanguage: locale, title: locale === "nl" ? "Klantenservicemedewerker" : "Customer service assistant", summary }, experience: [{ entryId: "experience-fixture-1", role: locale === "nl" ? "Klantenservicemedewerker" : "Customer service assistant", company: "Northwind Services", location: "Utrecht", start: "2022-03", end: "2024-06", description, highlights }] };
}
const cases: Case[] = [
  { id: "nl-profile", locale: "nl", action: "improve", target: { kind: "profile" }, data: cv("nl", "Nauwkeurige klantenservicemedewerker met ervaring in e-mail en telefonische vragen.", "Beantwoordde vragen en hield het teamoverzicht actueel.", ["Ondersteunde collega's bij drukte."]) },
  { id: "en-profile", locale: "en", action: "improve", target: { kind: "profile" }, data: cv("en", "Careful customer service assistant experienced in email and telephone enquiries.", "Answered enquiries and maintained the team overview.", ["Supported colleagues during busy periods."]) },
  { id: "nl-qualifier", locale: "nl", action: "shorten", target: { kind: "experience", entryId: "experience-fixture-1" }, data: cv("nl", "Administratief medewerker.", "Onder begeleiding hielp ik met basisrapportages; ik leidde geen team.", ["Werkte met Excel op basisniveau."]) },
  { id: "en-qualifier", locale: "en", action: "shorten", target: { kind: "experience", entryId: "experience-fixture-1" }, data: cv("en", "Administrative assistant.", "Under supervision, I helped with basic reports and did not lead a team.", ["Used Excel at a basic level."]) },
  { id: "nl-number", locale: "nl", action: "improve", target: { kind: "experience", entryId: "experience-fixture-1" }, data: cv("nl", "Logistiek medewerker.", "Verwerkte gemiddeld 25 bestellingen per dienst.", ["Controleerde aantallen voor verzending."]) },
  { id: "en-number", locale: "en", action: "improve", target: { kind: "experience", entryId: "experience-fixture-1" }, data: cv("en", "Warehouse assistant.", "Processed an average of 25 orders per shift.", ["Checked quantities before dispatch."]) },
];
async function main() {
  assert(process.env.OPENAI_API_KEY, "OPENAI_API_KEY is required");
  const started = Date.now(); const results: Array<{ id: string; run: number; locale: string; status: "pass" | "fail"; durationMs: number; code?: string; fictionalOutput?: string }> = [];
  // All six inputs are safe tasks. A refusal is a failed usefulness check;
  // no result is labelled correct just because the provider returned JSON.
  for (let run = 1; run <= 3; run++) for (const fixture of cases) {
    const at = Date.now();
    try {
      const origin = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "https://werkcv.nl";
      const response = await handleConsumerAiRequest(new NextRequest(`${origin}/api/ats-rewrite`, { method: "POST", headers: { origin, "content-type": "application/json" }, body: JSON.stringify({ schemaVersion: 1, requestId: randomUUID(), cvId: randomUUID(), expectedContentVersion: cvContentVersion(fixture.data), data: fixture.data, action: fixture.action, target: fixture.target, targetRole: "", jobDescription: "", facts: "" }) }), {
        enabled: true, user: async () => ({ id: "fictional-evaluation" }), document: async () => ({ data: fixture.data }), acquire: async () => ({ ok: true, release: async () => {} }), generate: rewriteCVForATS,
      });
      const body = await response.json();
      if (!response.ok) { results.push({ id: fixture.id, run, locale: fixture.locale, status: "fail", durationMs: Date.now() - at, code: body.code }); continue; }
      const output = body.data as CVData;
      const written = fixture.target.kind === "profile" ? output.personal.summary : [output.experience[0].description, ...output.experience[0].highlights].join("\n");
      if (fixture.target.kind === "profile") {
        assert.deepEqual(output.experience, fixture.data.experience);
        assert.match(written, fixture.locale === "nl" ? /klant/i : /customer/i);
        assert.match(written, /e-?mail/i);
        assert.match(written, /tele[fph]+on/i);
        assert(!/\d|%|Zendesk|Workday|HubSpot|manager|senior|expert|leader/i.test(written));
      } else {
        assert.deepEqual(output.personal, fixture.data.personal);
        assert.equal(output.experience[0].entryId, "experience-fixture-1");
        if (fixture.id.endsWith("number")) { assert.match(written, /25/); assert.match(written, fixture.locale === "nl" ? /per dienst/i : /per shift/i); assert.deepEqual(written.match(/\d+/g), ["25"]); }
        else { assert.match(written, fixture.locale === "nl" ? /geen team/i : /(?:not|never).*lead.*team/i); assert.match(written, fixture.locale === "nl" ? /onder begeleiding/i : /under supervision/i); const before = [fixture.data.experience[0].description, ...fixture.data.experience[0].highlights].join("\n"); assert(written.length < before.length); }
      }
      results.push({ id: fixture.id, run, locale: fixture.locale, status: "pass", durationMs: Date.now() - at, fictionalOutput: written });
    } catch (error) {
      // Keep provider diagnostics useful without ever serialising prompts,
      // CV text or exception payloads into the report.
      const message = error instanceof Error ? error.message : "";
      const code = /connection|network|fetch|timeout/i.test(message) ? "PROVIDER_UNAVAILABLE" : "ORACLE_OR_TRANSPORT_FAILURE";
      results.push({ id: fixture.id, run, locale: fixture.locale, status: "fail", durationMs: Date.now() - at, code });
    }
  }
  const negativeFixtures = [
    ["Answered customer enquiries.", "Answered customer enquiries using Zendesk."],
    ["Processed 25 orders per week.", "Processed 25 orders per day."],
    ["Beantwoordde klantvragen.", "Beantwoordde klantvragen met Workday."],
    ["Verwerkte 25 orders per week.", "Verwerkte 25 orders per dag."],
  ];
  const negativePassed = negativeFixtures.every(([source, proposal]) => checkWritingFacts(source, proposal).length > 0);
  const failed = results.filter(item => item.status === "fail");
  const workingTreeModified = Boolean(execFileSync("git", ["status", "--porcelain"], { encoding: "utf8" }).trim());
  console.log(JSON.stringify({ evaluationVersion: "consumer-ai-2026-09-13.1", guardVersion: WRITING_GUARD_VERSION, promptVersion: WRITING_PROMPT_VERSION, model: "gpt-4o-mini", temperature: 0.2, commit: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(), workingTreeModified, fictionalDataOnly: true, cases: results.length, passed: results.filter(x => x.status === "pass").length, failed: failed.length, negativePassed, activationEligible: failed.length === 0 && negativePassed, durationMs: Date.now() - started, limitations: "Small regression set; requires human review of fictional outputs and broader occupational evaluation before accuracy claims.", results }, null, 2));
  if (failed.length || !negativePassed) process.exitCode = 1;
}
void main();
