import assert from "node:assert/strict";
import test from "node:test";
import { describeMailError, isTransientMailError, sendMailWithRetry } from "./mail-retry";

const mailError = (props: Record<string, unknown>) => Object.assign(new Error("smtp"), props);

test("timeouts, dropped connections and 4xx replies are transient; rejections and auth errors are not", () => {
  assert.equal(isTransientMailError(mailError({ code: "ETIMEDOUT" })), true);
  assert.equal(isTransientMailError(mailError({ code: "ECONNECTION" })), true);
  assert.equal(isTransientMailError(mailError({ code: "ESOCKET" })), true);
  assert.equal(isTransientMailError(mailError({ code: "EENVELOPE", responseCode: 451 })), true);
  assert.equal(isTransientMailError(mailError({ code: "EAUTH", responseCode: 535 })), false);
  assert.equal(isTransientMailError(mailError({ code: "EENVELOPE", responseCode: 550 })), false);
  assert.equal(isTransientMailError("weird"), false);
  assert.deepEqual(describeMailError(mailError({ code: "ETIMEDOUT" })), { code: "ETIMEDOUT", responseCode: null, name: "Error" });
});

test("a transient failure is retried once and then succeeds", async () => {
  let calls = 0;
  const failures: Array<{ attempt: number; willRetry: boolean }> = [];
  const result = await sendMailWithRetry(async () => {
    calls += 1;
    if (calls === 1) throw mailError({ code: "ETIMEDOUT" });
    return "sent";
  }, { delayMs: 1, onFailure: ({ attempt, willRetry }) => failures.push({ attempt, willRetry }) });
  assert.equal(result, "sent");
  assert.equal(calls, 2);
  assert.deepEqual(failures, [{ attempt: 1, willRetry: true }]);
});

test("a permanent failure is not retried, and a second transient failure is thrown", async () => {
  let calls = 0;
  await assert.rejects(sendMailWithRetry(async () => { calls += 1; throw mailError({ code: "EAUTH", responseCode: 535 }); }, { delayMs: 1 }));
  assert.equal(calls, 1);
  calls = 0;
  await assert.rejects(sendMailWithRetry(async () => { calls += 1; throw mailError({ code: "ETIMEDOUT" }); }, { delayMs: 1 }));
  assert.equal(calls, 2);
});
