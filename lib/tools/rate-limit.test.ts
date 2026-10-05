import assert from "node:assert/strict";
import test from "node:test";
import { getClientIp } from "./rate-limit";

const request = (headers: Record<string, string>) => new Request("https://werkcv.nl/api/x", { headers });

test("the client IP is the one nginx set, not what the client wrote", () => {
  // nginx overwrites X-Real-IP with the connecting address and appends it to X-Forwarded-For.
  assert.equal(getClientIp(request({ "x-real-ip": "198.51.100.7", "x-forwarded-for": "203.0.113.99, 198.51.100.7" })), "198.51.100.7");
  // A client that spoofs both headers cannot change X-Real-IP, so its limit key stays the same.
  assert.equal(getClientIp(request({ "x-real-ip": "198.51.100.7", "x-forwarded-for": "1.2.3.4" })), "198.51.100.7");
});

test("without X-Real-IP the LAST X-Forwarded-For entry is used, never the first", () => {
  assert.equal(getClientIp(request({ "x-forwarded-for": "203.0.113.99, 198.51.100.7" })), "198.51.100.7");
  assert.equal(getClientIp(request({ "x-forwarded-for": "198.51.100.7" })), "198.51.100.7");
});

test("no proxy headers (local development) gives one shared key", () => {
  assert.equal(getClientIp(request({})), "unknown");
  assert.equal(getClientIp(request({ "x-forwarded-for": "  ", "x-real-ip": " " })), "unknown");
});
