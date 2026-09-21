import "dotenv/config";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { createHash, randomUUID } from "node:crypto";
import { execFileSync } from "node:child_process";
import { NextRequest } from "next/server";
import { defaultCV, cvSchema, type CVData } from "../cv";
import { z } from "zod";
import { handleConsumerAiRequest } from "../consumer-ai-request";
import { rewriteCVForATS } from "../ats-rewrite";
import { cvContentVersion } from "../cv-content-version";
import { WRITING_PROMPT_VERSION, type WritingAction } from "../ai-writing-changes";
import { WRITING_GUARD_VERSION } from "../ai-writing-facts";
import { safeAiErrorCode } from "../ai-error-code";

const families = [
  ["retail", "Hielp klanten bij het vinden van kleding en vulde de voorraad aan.", "Helped customers find clothing and replenished stock."],
  ["logistics", "Verzamelde gemiddeld 25 bestellingen per dienst met een handscanner.", "Collected an average of 25 orders per shift using a handheld scanner."],
  ["administration", "Voerde facturen in Excel in en controleerde de bedragen.", "Entered invoices in Excel and checked the amounts."],
  ["service", "Beantwoordde klantvragen per e-mail en telefoon, zonder leidinggevende taken.", "Answered customer enquiries by email and telephone without management responsibilities."],
  ["ict", "Onder begeleiding hielp ik bij het testen van software. Ik leidde geen team.", "Under supervision I helped test software. I did not lead a team."],
  ["education", "Oefende op school met het invoeren van facturen in Excel. De opleiding is nog niet afgerond.", "Practised entering invoices in Excel at school. The course is not yet completed."],
];
const actions: WritingAction[] = ["draft_profile", "draft_experience", "improve", "shorten", "tailor"];
export const qualityCases = Array.from({ length: 30 }, (_, i) => {
  const englishFamiliesByAction = [[0, 1], [2, 3], [4, 5], [0, 2], [3, 4]];
  const locale = englishFamiliesByAction[Math.floor(i / 6)].includes(i % 6) ? "en" as const : "nl" as const;
  const family = families[i % families.length];
  const fact = family[locale === "nl" ? 1 : 2];
  const action = actions[Math.floor(i / 6)];
  const data: CVData = structuredClone(defaultCV);
  data.personal.resumeLanguage = locale;
  data.personal.summary = fact;
  data.personal.title = family[0];
  const student = family[0] === "education";
  if (student) data.education = [{ degree: locale === "nl" ? "Mbo Administratie (in opleiding)" : "Vocational administration course (in progress)", school: "Fictional school", location: "", start: "2025-09", end: "", description: fact }];
  data.experience = student && ["draft_profile", "tailor"].includes(action) ? [] : [{ entryId: "fictional-job", role: student ? "Schoolproject" : family[0], company: "Fictional example", location: "", start: "2023-01", end: "", description: fact, highlights: [fact, fact] }];
  const bulletMode = action === "improve" || action === "shorten" ? "replace_bullet" : action === "draft_experience" ? "insert_bullet" : undefined;
  const target = action === "draft_profile" ? { kind: "profile" as const } : action === "tailor" ? { kind: "all" as const } : { kind: "experience" as const, entryId: "fictional-job" };
  return { id: locale + "-" + family[0] + "-" + action, locale, family: family[0], data, action, target, fact, bulletMode,
    intendedBehavior: "Retain supplied tasks, quantities and limiting statements. Do not add a certificate, employer, result or leadership. Preserve unselected fields. Safe unchanged output is not an improvement score.",
    applicantContext: student ? "first applicant with school project" : i % 3 === 0 ? "career changer; keep past experience distinct from vacancy" : "experienced applicant",
  };
});

async function main() {
  if (!process.env.OPENAI_API_KEY) throw new Error("KEY_NOT_CONFIGURED");
  for (const fixture of qualityCases) cvSchema.parse(fixture.data);
  const directory = "output/ai-quality-" + new Date().toISOString().replace(/[:.]/g, "-");
  mkdirSync(directory, { recursive: true });
  writeFileSync(directory + "/manifest.json", JSON.stringify(qualityCases, null, 2));
  const sourceFiles = ["lib/consumer-ai-request.ts", "lib/ats-rewrite.ts", "lib/ai-writing-facts.ts", "lib/ai-writing-language.ts", "lib/ai-writing-changes.ts", "lib/maintenance/consumer-ai-quality-evaluation.ts"];
  const sourceChecksums = Object.fromEntries(sourceFiles.map(file => [file, createHash("sha256").update(readFileSync(file)).digest("hex")]));
  writeFileSync(directory + "/source-checksums.json", JSON.stringify(sourceChecksums, null, 2));
  const results: Array<Record<string, unknown>> = [];
  const limit = process.argv.includes("--smoke") ? 1 : 3;
  for (let run = 1; run <= limit; run++) for (const item of qualityCases) {
    const at = Date.now();
    const array = item.data.experience[0]?.highlights || [];
    const bullet = item.bulletMode ? { operation: item.bulletMode, index: item.bulletMode === "insert_bullet" ? array.length : 0, expectedArray: array, expectedText: item.bulletMode === "insert_bullet" ? "" : array[0] } : undefined;
    const origin = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "https://werkcv.nl";
    const request = new NextRequest(origin + "/api/ats-rewrite", { method: "POST", headers: { origin, "content-type": "application/json" }, body: JSON.stringify({ schemaVersion: bullet ? 2 : 1, requestId: randomUUID(), cvId: randomUUID(), expectedContentVersion: cvContentVersion(item.data), data: item.data, action: item.action, target: item.target, targetRole: "", jobDescription: item.action === "tailor" ? (item.locale === "nl" ? "Gevraagd: nauwkeurig werken en een heftruckcertificaat. Voeg geen certificaat toe als dat niet in het cv staat." : "Wanted: careful working and a forklift certificate. Do not add a certificate not present in the CV.") : "", facts: item.bulletMode === "insert_bullet" ? item.fact : "", ...(bullet ? { bullet } : {}) }) });
    let diagnostic: string | null = null;
    const response = await handleConsumerAiRequest(request, { enabled: true, user: async () => ({ id: "fictional-evaluation" }), document: async () => ({ data: item.data }), acquire: async () => ({ ok: true, release: async () => {} }), generate: async (source, options) => {
      try { return await rewriteCVForATS(source, options); }
      catch (error) {
        diagnostic = error instanceof z.ZodError ? "MODEL_SCHEMA_INVALID" : error instanceof Error && ["AI_FACT_CHECK_FAILED", "ATS_REWRITE_LANGUAGE_MISMATCH", "ATS_REWRITE_INVALID_TARGETS"].includes(error.message) ? error.message : "PROVIDER_OR_UNCLASSIFIED_ERROR";
        throw error;
      }
    } });
    const body = await response.json();
    results.push({ id: item.id, run, locale: item.locale, family: item.family, action: item.action, httpStatus: response.status, validResponse: response.ok, durationMs: Date.now() - at, diagnostic, errorCode: response.ok ? null : safeAiErrorCode(body.code), fictionalOutput: response.ok ? body.data : null, humanReview: { reviewer: null, reviewedAt: null, language: null, usefulness: null, factualFidelity: null, note: null } });
    writeFileSync(directory + "/results.json", JSON.stringify(results, null, 2));
    console.log(JSON.stringify({ case: item.id, run, status: response.status, durationMs: Date.now() - at }));
  }
  const durations = results.map(r => Number(r.durationMs)).sort((a, b) => a - b);
  const valid = results.filter(r => r.validResponse).length;
  const report = { evaluatedAt: new Date().toISOString(), commit: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(), workingDiffDigest: createHash("sha256").update(execFileSync("git", ["diff", "--", "lib", "app/editor"])).digest("hex"), model: "gpt-4o-mini", temperature: 0.2, promptVersion: WRITING_PROMPT_VERSION, guardVersion: WRITING_GUARD_VERSION, cases: qualityCases.length, runs: limit, responses: results.length, validResponses: valid, validResponseRate: valid / results.length, medianMs: durations[Math.floor(durations.length / 2)], p95Ms: durations[Math.ceil(durations.length * .95) - 1], humanReviewComplete: false, activationEligible: false, limitations: "Fictional positive fixtures. HTTP success measures response availability, not language quality or factual correctness. Independent human review and security/browser/database gates remain mandatory." };
  writeFileSync(directory + "/summary.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report));
  if (valid / results.length < .9) process.exitCode = 1;
}
if (process.argv[1]?.includes("consumer-ai-quality-evaluation")) void main().catch(() => { console.error("EVALUATION_FAILED: inspect setup without printing credentials"); process.exitCode = 1; });
