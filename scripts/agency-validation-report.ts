import { getAgencyValidationReport, parseAgencyValidationDays } from "../lib/agency-validation-funnel-server";

function argument(name: string): string | undefined {
  const prefix = `--${name}=`;
  return process.argv.find((value) => value.startsWith(prefix))?.slice(prefix.length);
}

async function main() {
  const days = parseAgencyValidationDays(argument("days"));
  const report = await getAgencyValidationReport({ days });

  if (process.argv.includes("--json")) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log(`MatchPack validation report · ${days} days · UTC`);
  console.log(`${report.since.toISOString()} → ${report.until.toISOString()}`);
  console.table(report.stages.map((stage) => ({
    stage: stage.label,
    identity: stage.namespace,
    count: stage.count,
    rate: stage.conversionRate === null ? "n/a" : `${(stage.conversionRate * 100).toFixed(1)}%`,
  })));
  console.log("Outcomes", report.outcomes);
  console.log("Sample sizes", report.sampleSizes);
}

main().catch((error) => {
  console.error("agency_validation_report_failed", error instanceof Error ? error.message : "unknown_error");
  process.exitCode = 1;
});
