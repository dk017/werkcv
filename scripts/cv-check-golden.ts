/**
 * Runs the vacancy-match golden set against the live model (needs OPENAI_API_KEY).
 * Usage: npx tsx scripts/cv-check-golden.ts [--runs=2]
 * Exits non-zero when any expectation fails or a case's score varies by more than 5 points.
 */
import { matchCvVacature } from "../lib/tools/cv-vacature-match";
import { vacancyMatchGoldenCases } from "../lib/cv-check/golden/vacancy-match-cases";

const runs = Number(process.argv.find((arg) => arg.startsWith("--runs="))?.split("=")[1] ?? 2);
const includesCi = (haystack: string, needle: string) => haystack.toLowerCase().includes(needle.toLowerCase());

async function main() {
  let failures = 0;
  let checks = 0;

  for (const goldenCase of vacancyMatchGoldenCases) {
    const scores: number[] = [];
    for (let run = 1; run <= runs; run++) {
      const result = await matchCvVacature(goldenCase.cvText, goldenCase.vacancyText, goldenCase.locale);
      scores.push(result.score);

      for (const expected of goldenCase.expect) {
        checks++;
        const requirement = result.requirements.find((item) =>
          includesCi(`${item.requirement} ${item.vacancyEvidence}`, expected.match),
        );
        const problems: string[] = [];
        if (!requirement) problems.push("requirement not extracted");
        else {
          if (expected.status && !expected.status.includes(requirement.status)) {
            problems.push(`status ${requirement.status}, expected ${expected.status.join("/")}`);
          }
          if (expected.importance && requirement.importance !== expected.importance) {
            problems.push(`importance ${requirement.importance}, expected ${expected.importance}`);
          }
        }
        if (problems.length) {
          failures++;
          console.log(`FAIL ${goldenCase.id} run ${run} [${expected.match}]: ${problems.join("; ")}`);
        }
      }

      for (const forbidden of goldenCase.forbiddenTopFix ?? []) {
        checks++;
        const hit = result.topFixes.find((fix) => includesCi(fix.title, forbidden));
        if (hit) {
          failures++;
          console.log(`FAIL ${goldenCase.id} run ${run}: topFix "${hit.title}" should not mention "${forbidden}"`);
        }
      }
    }

    const spread = Math.max(...scores) - Math.min(...scores);
    checks++;
    if (spread > 5) {
      failures++;
      console.log(`FAIL ${goldenCase.id}: score unstable across runs (${scores.join(", ")})`);
    }
    console.log(`${goldenCase.id}: scores ${scores.join(", ")}`);
  }

  console.log(`\n${checks - failures}/${checks} checks passed`);
  process.exitCode = failures ? 1 : 0;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
