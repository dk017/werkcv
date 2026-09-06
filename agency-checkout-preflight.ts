import { config } from "dotenv";
import { inspectAgencyCheckoutProduct } from "./lib/agency-checkout-contract";

config({ quiet: true });

async function main() {
  const key = process.env.DODO_API_KEY || process.env.DODO_PAYMENTS_API_KEY;
  const id = process.env.DODO_AGENCY_PRODUCT_ID;
  const env = process.env.DODO_ENVIRONMENT || process.env.DODO_PAYMENTS_ENVIRONMENT || "live_mode";
  if (!key || !id) {
    console.log(JSON.stringify({ passed: false, reason: "Agency provider credentials or product ID are not configured in this environment." }));
    process.exitCode = 2;
    return;
  }
  if (!["test_mode", "test", "live_mode", "live"].includes(env)) {
    console.log(JSON.stringify({ passed: false, reason: "Unrecognised provider environment; no request made." }));
    process.exitCode = 2;
    return;
  }
  const test = env === "test_mode" || env === "test";
  const origin = test ? "https://test.dodopayments.com" : "https://live.dodopayments.com";
  // Read-only GET. No checkout creation, charge, product update or subscription.
  const response = await fetch(`${origin}/products/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${key}` }, cache: "no-store", signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) {
    console.log(JSON.stringify({ passed: false, mode: test ? "test" : "live", httpStatus: response.status }));
    process.exitCode = 1;
    return;
  }
  const result = inspectAgencyCheckoutProduct(await response.json());
  console.log(JSON.stringify({ checkedAt: new Date().toISOString(), mode: test ? "test" : "live", ...result, remainingGate: "Inspect hosted checkout totals and renewal/tax presentation before release. No checkout created by this check." }, null, 2));
  if (!result.passed) process.exitCode = 1;
}

main().catch(() => {
  // Do not expose raw provider errors, credentials, or payloads.
  console.log(JSON.stringify({ passed: false, reason: "Provider check failed or timed out; no checkout created." }));
  process.exitCode = 1;
});
