import assert from "node:assert/strict";
import test from "node:test";
import {
  isEnglishRoleAnalyticsContext,
  sanitizeEnglishRoleAnalyticsAttribution,
  sanitizeEnglishRoleAnalyticsProperties,
  sanitizeEnglishRoleAnalyticsUrl,
} from "./english-role-analytics-safety";

test("detects role context from sources and public role paths", () => {
  assert.equal(isEnglishRoleAnalyticsContext({ roleSlug: "logistics_warehouse" }, null), true);
  assert.equal(isEnglishRoleAnalyticsContext({ entryPoint: "en_role_example_forklift_reach_truck_upload" }, null), true);
  assert.equal(
    isEnglishRoleAnalyticsContext({}, "https://werkcv.nl/en/english-cv-example-order-picker-fulfilment-netherlands?utm_source=test"),
    true,
  );
  assert.equal(isEnglishRoleAnalyticsContext({ path: "/en/templates" }, "/en/templates"), false);
  assert.equal(
    isEnglishRoleAnalyticsContext(
      { nextPath: "/en/editor?startSource=en_role_example_logistics_coordinator" },
      null,
    ),
    true,
  );
  assert.equal(
    isEnglishRoleAnalyticsContext(
      { location: "header", label: "pricing" },
      "/en/english-cv-example-logistics-warehouse-netherlands",
    ),
    true,
  );
  assert.deepEqual(
    sanitizeEnglishRoleAnalyticsProperties({ location: "header", label: "pricing" }),
    { location: "header", label: "pricing" },
  );
});

test("keeps bounded content-free role analytics properties", () => {
  assert.deepEqual(
    sanitizeEnglishRoleAnalyticsProperties({
      roleSlug: "logistics_warehouse",
      entryMethod: "example",
      entryPoint: "en_role_example_logistics_warehouse",
      templateId: "professional",
      pagePath: "/en/english-cv-example-logistics-warehouse-netherlands",
      completionScore: 93,
    }),
    {
      roleSlug: "logistics_warehouse",
      entryMethod: "example",
      entryPoint: "en_role_example_logistics_warehouse",
      templateId: "professional",
      pagePath: "/en/english-cv-example-logistics-warehouse-netherlands",
      completionScore: 93,
    },
  );
});

test("rejects unknown keys and human-authored or identifying strings", () => {
  assert.equal(
    sanitizeEnglishRoleAnalyticsProperties({ roleSlug: "logistics_warehouse", cvText: "Complete candidate CV" }),
    null,
  );
  assert.equal(
    sanitizeEnglishRoleAnalyticsProperties({ roleSlug: "logistics_warehouse", label: "person@example.com" }),
    null,
  );
  assert.equal(
    sanitizeEnglishRoleAnalyticsProperties({ roleSlug: "logistics_warehouse", reason: "candidate resume.pdf" }),
    null,
  );
});

test("stores only the pathname for role-funnel URLs", () => {
  assert.equal(
    sanitizeEnglishRoleAnalyticsUrl("https://werkcv.nl/en/editor?id=private-id&email=person%40example.com"),
    "/en/editor",
  );
  assert.equal(sanitizeEnglishRoleAnalyticsUrl("https://attacker.example/en/editor"), null);
});

test("removes free-form campaign attribution from role events", () => {
  const sanitized = sanitizeEnglishRoleAnalyticsAttribution({
    version: 1,
    firstTouchAt: "2026-08-29T10:00:00.000Z",
    firstTouchPath: "/en/english-cv-example-logistics-warehouse-netherlands",
    firstTouchCluster: "en-guides",
    firstTouchReferrer: "https://search.example/results?q=private",
    lastTouchAt: "2026-08-29T10:01:00.000Z",
    lastTouchPath: "/en/editor?id=private",
    lastTouchCluster: "editor",
    locale: "en",
    utmSource: "newsletter",
    utmMedium: "email",
    utmCampaign: "person@example.com",
    utmTerm: "candidate resume",
    utmContent: "role_cta",
    gclid: "safe-token_123",
    fbclid: "",
    msclkid: "",
  });

  assert.equal(sanitized?.utmSource, "newsletter");
  assert.equal(sanitized?.utmCampaign, "");
  assert.equal(sanitized?.utmTerm, "");
  assert.equal(sanitized?.lastTouchPath, "/en/editor");
  assert.equal(sanitized?.firstTouchReferrer, "");
});
