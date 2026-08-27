import "dotenv/config";
import { getCertifiedConsumerFunnel } from "@/lib/conversion-funnel-server";

const requestedDays = Number(process.argv.find((argument) => argument.startsWith("--days="))?.split("=")[1] || 30);
const days = Number.isFinite(requestedDays) && requestedDays > 0 ? requestedDays : 30;
const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

getCertifiedConsumerFunnel(since)
  .then((result) => {
    console.log(JSON.stringify({ days, ...result }, null, 2));
    if (result.certification.status === "fail") process.exitCode = 1;
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
