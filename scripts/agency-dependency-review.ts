import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

// Explicit maintenance command: sends dependency metadata to npm, never .env or CV data.
const result = process.platform === "win32"
  ? spawnSync("cmd.exe", ["/d", "/s", "/c", "npm audit --json"], { encoding: "utf8", maxBuffer: 8_000_000, timeout: 120_000 })
  : spawnSync("npm", ["audit", "--json"], { encoding: "utf8", maxBuffer: 8_000_000, timeout: 120_000 });
if (result.error) throw result.error;
const report = JSON.parse(result.stdout);
if (!report.vulnerabilities || report.error) throw new Error("Dependency audit unavailable");
const directory = ".codex-tmp/agency-discovery";
mkdirSync(directory, { recursive: true });
writeFileSync(`${directory}/dependency-audit.json`, JSON.stringify({ observedAt: new Date().toISOString(), ...report }, null, 2));
console.log(JSON.stringify({ counts: report.metadata.vulnerabilities, findings: Object.values(report.vulnerabilities).map((value) => {
  const item = value as { name: string; severity: string; isDirect: boolean; fixAvailable: unknown; via: Array<string | { title: string; url: string }> };
  return { name: item.name, severity: item.severity, direct: item.isDirect, fix: item.fixAvailable, advisories: item.via.filter((v) => typeof v !== "string") };
}) }, null, 2));
