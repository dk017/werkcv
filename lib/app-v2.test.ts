import test from "node:test";
import assert from "node:assert/strict";
import { getAppV2Mode, resolveAppV2, safeAppV2Next } from "./app-v2";

test("app v2 is off in production unless switched on", () => {
  assert.equal(getAppV2Mode({ NODE_ENV: "production" }), "off");
  assert.equal(getAppV2Mode({ NODE_ENV: "development" }), "optin");
  assert.equal(getAppV2Mode({ NODE_ENV: "production", APP_V2_MODE: " On " }), "on");
  assert.equal(getAppV2Mode({ NODE_ENV: "production", APP_V2_MODE: "maybe" }), "off");
});

test("cookie opts in for optin mode and opts out for on mode", () => {
  assert.equal(resolveAppV2("off", "1"), false);
  assert.equal(resolveAppV2("optin", undefined), false);
  assert.equal(resolveAppV2("optin", "1"), true);
  assert.equal(resolveAppV2("on", undefined), true);
  assert.equal(resolveAppV2("on", "0"), false);
});

test("the switch only redirects to same-site paths", () => {
  assert.equal(safeAppV2Next("/editor?id=1"), "/editor?id=1");
  assert.equal(safeAppV2Next("https://evil.example"), "/mijn-cvs");
  assert.equal(safeAppV2Next("//evil.example"), "/mijn-cvs");
  assert.equal(safeAppV2Next("/\\evil.example"), "/mijn-cvs");
  assert.equal(safeAppV2Next(null), "/mijn-cvs");
});
