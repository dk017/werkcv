import assert from "node:assert/strict";
process.env.OPENAI_API_KEY ||= "test-key-not-used";
import test from "node:test";
import { opsEmailsEnabled } from "./ops-alerts";

test("ops alert emails are sent in production and test, not from a local dev server", () => {
  assert.equal(opsEmailsEnabled({ NODE_ENV: "production" }), true);
  assert.equal(opsEmailsEnabled({ NODE_ENV: "test" }), true);
  assert.equal(opsEmailsEnabled({ NODE_ENV: "development" }), false);
});

test("a dev server can opt in to ops alert emails", () => {
  assert.equal(opsEmailsEnabled({ NODE_ENV: "development", OPS_ALERT_EMAILS_IN_DEV: "true" }), true);
  assert.equal(opsEmailsEnabled({ NODE_ENV: "development", OPS_ALERT_EMAILS_IN_DEV: "false" }), false);
});
