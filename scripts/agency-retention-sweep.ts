import "dotenv/config";
import { sweepExpiredAgencyContent } from "../lib/agency-retention";

const execute = process.argv.includes("--execute");
const confirmation = process.env.AGENCY_RETENTION_EXECUTE_CONFIRM;

if (execute && confirmation !== "I_UNDERSTAND_RETENTION_DELETE") {
  console.error(JSON.stringify({
    ok: false,
    code: "RETENTION_EXECUTION_NOT_CONFIRMED",
    message: "Set AGENCY_RETENTION_EXECUTE_CONFIRM=I_UNDERSTAND_RETENTION_DELETE to execute deletion.",
  }));
  process.exitCode = 1;
} else {
  const result = await sweepExpiredAgencyContent({ execute });
  console.log(JSON.stringify({ ok: true, ...result }));
}
