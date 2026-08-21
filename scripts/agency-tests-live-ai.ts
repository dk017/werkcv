if (process.env.AGENCY_RUN_LIVE_AI !== "1") {
  console.log("Live AI smoke is optional and was not run. Set AGENCY_RUN_LIVE_AI=1 with a test-only key to run it deliberately.");
  process.exit(0);
}
if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY_REQUIRED_FOR_LIVE_AI");
console.log("Use the fictional MatchPack browser fixture for a deliberate paid live-AI smoke; this command never runs as part of test:agency:release.");
