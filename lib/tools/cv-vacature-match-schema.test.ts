import test from "node:test";
import assert from "node:assert/strict";
import { zodResponseFormat } from "openai/helpers/zod";
import { aiAnalysisSchema, aiRequirementSchema, requirementSchema } from "./cv-vacature-match-schema";

test("vacancy analysis produces a strict provider-compatible schema", () => {
  const format = zodResponseFormat(aiAnalysisSchema, "vacancy_analysis");
  assert.equal(format.json_schema.strict, true);
  const schema = JSON.stringify(format.json_schema.schema);
  assert.ok(!schema.includes("reviewerId"));
  assert.ok(!schema.includes("vacancyReference"));
});

test("application review references remain available without asking AI to invent them", () => {
  const requirement = { requirement: "Excel", vacancyEvidence: "Excel required", importance: "essential", status: "missing", cvEvidence: "", honestAction: "Ask candidate" };
  assert.ok(aiRequirementSchema.safeParse(requirement).success);
  assert.ok(requirementSchema.safeParse(requirement).success);
  assert.ok("evidenceReference" in requirementSchema.shape);
});
