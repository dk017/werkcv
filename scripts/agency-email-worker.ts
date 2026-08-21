import "dotenv/config";
import { processAgencyEmailOutbox } from "@/lib/agency-email-outbox";

processAgencyEmailOutbox().then((result) => {
  console.log(JSON.stringify(result));
}).catch((error) => {
  console.error(JSON.stringify({ error: error instanceof Error ? error.name : "unknown" }));
  process.exitCode = 1;
});
