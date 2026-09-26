import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { zodResponseFormat } from "openai/helpers/zod";
import type { z } from "zod";

// Importing modules that construct the OpenAI client needs a key; no request is made.
process.env.OPENAI_API_KEY ||= "test-key-not-used";

// Every schema passed to zodResponseFormat in production code. OpenAI strict structured
// outputs reject `.optional()` without `.nullable()`; the helper throws at call time, so an
// incompatible schema otherwise only fails in production (the Aug–Sep 2026 vacancy-match outage).
async function productionSchemas(): Promise<Array<[string, z.ZodType]>> {
  const [{ aiParsedCvSchema }, { aiAnalysisSchema }, { proposalClaimAiResponseSchema }, { voiceCandidateSchema }] =
    await Promise.all([
      import("./cv-parser"),
      import("./tools/cv-vacature-match-schema"),
      import("./tools/proposal-claim-verifier-schema"),
      import("./voice-cv"),
    ]);
  return [
    ["lib/cv-parser.ts aiParsedCvSchema", aiParsedCvSchema],
    ["lib/tools/cv-vacature-match.ts aiAnalysisSchema", aiAnalysisSchema],
    ["lib/tools/proposal-claim-verifier.ts proposalClaimAiResponseSchema", proposalClaimAiResponseSchema],
    ["lib/voice-cv-ai.ts voiceCandidateSchema", voiceCandidateSchema],
  ];
}

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.tsx?$/.test(entry) && !/\.test\.tsx?$/.test(entry) ? [full] : [];
  });
}

test("every structured-output schema is accepted by OpenAI strict mode", async () => {
  for (const [name, schema] of await productionSchemas()) {
    assert.doesNotThrow(() => zodResponseFormat(schema, "contract_test"), `${name} is not strict-compatible`);
  }
});

test("every zodResponseFormat call site is covered by this contract test", async () => {
  const root = path.join(process.cwd());
  const callSites = ["lib", "app"]
    .flatMap((dir) => sourceFiles(path.join(root, dir)))
    .reduce((count, file) => count + (readFileSync(file, "utf8").match(/zodResponseFormat\(/g)?.length ?? 0), 0);
  assert.equal(
    callSites,
    (await productionSchemas()).length,
    "A zodResponseFormat call was added or removed; register its schema in productionSchemas()",
  );
});
