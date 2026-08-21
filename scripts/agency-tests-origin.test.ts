import test from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { isAllowedSameOriginRequest } from "../lib/request-origin";

function request(url: string, headers: Record<string, string> = {}) {
  return new NextRequest(url, { headers });
}

test("origin policy accepts canonical HTTPS and same-site referer", () => {
  assert.equal(isAllowedSameOriginRequest(request("https://werkcv.nl/api/agency", {
    origin: "https://werkcv.nl",
    referer: "https://werkcv.nl/agency/account",
  }), { checkReferer: true }), true);
  assert.equal(isAllowedSameOriginRequest(request("https://werkcv.nl/api/agency", {
    referer: "https://werkcv.nl/agency/account",
  }), { checkReferer: true }), true);
});

test("origin policy rejects cross-origin and forged forwarded-host requests", () => {
  assert.equal(isAllowedSameOriginRequest(request("https://werkcv.nl/api/agency", {
    origin: "https://evil.example",
    referer: "https://evil.example/",
  }), { checkReferer: true }), false);
  assert.equal(isAllowedSameOriginRequest(request("https://werkcv.nl/api/agency", {
    origin: "https://evil.example",
    "x-forwarded-host": "evil.example",
    "x-forwarded-proto": "https",
  }), { checkReferer: true }), false);
});

test("origin policy does not accept a mutation with no browser provenance", () => {
  assert.equal(isAllowedSameOriginRequest(request("https://werkcv.nl/api/agency"), { checkReferer: true }), false);
});

test("origin policy accepts loopback development origin", () => {
  assert.equal(isAllowedSameOriginRequest(request("http://localhost:3000/api/agency", {
    origin: "http://localhost:3000",
    referer: "http://localhost:3000/agency",
  }), { checkReferer: true }), true);
});
