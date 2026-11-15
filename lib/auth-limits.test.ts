import assert from "node:assert/strict";
import test from "node:test";
import { LOGIN_LIMITS, MAX_CODE_ATTEMPTS, allowLoginCodeRequest, allowLoginCodeVerify, countLoginCodeAttempt } from "./auth-limits";

test("a login code allows MAX_CODE_ATTEMPTS tries and flags the last one", () => {
  const results = Array.from({ length: MAX_CODE_ATTEMPTS + 1 }, () => countLoginCodeAttempt("code-a"));
  assert.deepEqual(results.slice(0, MAX_CODE_ATTEMPTS - 1).map((r) => r.lastAttempt), Array(MAX_CODE_ATTEMPTS - 1).fill(false));
  assert.deepEqual(results[MAX_CODE_ATTEMPTS - 1], { allowed: true, lastAttempt: true });
  assert.deepEqual(results[MAX_CODE_ATTEMPTS], { allowed: false, lastAttempt: false });
  // Another code is counted separately.
  assert.deepEqual(countLoginCodeAttempt("code-b"), { allowed: true, lastAttempt: false });
});

test("one inbox gets at most requestPerEmail codes, even from many IPs", () => {
  const max = LOGIN_LIMITS.requestPerEmail.maxRequests;
  for (let i = 0; i < max; i += 1) assert.equal(allowLoginCodeRequest(`198.51.100.${i}`, "victim@example.com"), true);
  assert.equal(allowLoginCodeRequest("198.51.100.200", "victim@example.com"), false);
  assert.equal(allowLoginCodeRequest("198.51.100.200", "someone-else@example.com"), true);
});

test("one IP gets at most requestPerIp codes, spread over any addresses", () => {
  const max = LOGIN_LIMITS.requestPerIp.maxRequests;
  for (let i = 0; i < max; i += 1) assert.equal(allowLoginCodeRequest("203.0.113.9", `user${i}@example.com`), true);
  assert.equal(allowLoginCodeRequest("203.0.113.9", "fresh@example.com"), false);
});

test("code checks are capped per IP", () => {
  const max = LOGIN_LIMITS.verifyPerIp.maxRequests;
  for (let i = 0; i < max; i += 1) assert.equal(allowLoginCodeVerify("203.0.113.50"), true);
  assert.equal(allowLoginCodeVerify("203.0.113.50"), false);
  assert.equal(allowLoginCodeVerify("203.0.113.51"), true);
});
