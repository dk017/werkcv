import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { matchPackResultSchema } from "./agency-matchpack";

test("MatchPack result strips consumer scoring fields", () => {
  const result = matchPackResultSchema.parse({
    score: 84,
    scoreBand: "strong",
    scoreLabel: "Sterke match",
    dimensions: [],
    summary: "Bronnen tonen meerdere relevante raakvlakken; één eis blijft open.",
    perceivedRole: "HR-adviseur",
    perceivedSeniority: "senior",
    strengths: [],
    requirements: [],
    missingKeywords: [],
    topFixes: [],
    limitations: ["Fictionele testdata."],
  });

  assert.equal("score" in result, false);
  assert.equal("scoreBand" in result, false);
  assert.equal("scoreLabel" in result, false);
  assert.equal("dimensions" in result, false);
  assert.equal(result.requirements.length, 0);
});

test("the development visual fixture is single-shell and score-free", () => {
  const fixture = readFileSync(path.join(process.cwd(), "app/agency/visual-test/page.tsx"), "utf8");
  const boundary = readFileSync(path.join(process.cwd(), "components/brand/BrandRouteBoundary.tsx"), "utf8");
  assert.doesNotMatch(fixture, /\b(?:score|scoreBand|scoreLabel|dimensions|matchscore|ranking|winner)\b/i);
  assert.match(boundary, /pathname === "\/agency\/visual-test"/u);
  assert.match(fixture, /robots:\s*\{\s*index:\s*false/u);
  assert.match(fixture, /process\.env\.NODE_ENV === "production"/u);
});
