import assert from "node:assert/strict";
import test from "node:test";
import { aggregateEnglishRoleExampleFunnel } from "./english-role-example-funnel";

const date = new Date("2026-08-20T00:00:00.000Z");

test("counts unique users per role and stage", () => {
  const rows = aggregateEnglishRoleExampleFunnel(
    [
      { id: "cv-a", userId: "user-a", startSource: "en_role_example_logistics_warehouse", meaningful: true, createdAt: date },
      { id: "cv-a2", userId: "user-a", startSource: "en_role_example_logistics_warehouse_upload", meaningful: true, createdAt: date },
      { id: "cv-b", userId: "user-b", startSource: "en_role_example_logistics_warehouse", meaningful: false, createdAt: date },
      { id: "cv-c", userId: "user-c", startSource: "en_role_example_forklift_reach_truck", meaningful: false, createdAt: date },
    ],
    [
      { cvId: "cv-a", event: "ready_to_download_viewed", createdAt: date },
      { cvId: "cv-a2", event: "full_preview_opened", createdAt: date },
      { cvId: "cv-a", event: "checkout_start", createdAt: date },
      { cvId: "cv-a2", event: "checkout_started", createdAt: date },
      { cvId: "cv-b", event: "full_preview_opened", createdAt: date },
    ],
    [{ cvId: "cv-a", paidAt: date, amountCents: 499 }, { cvId: "cv-a2", paidAt: date, amountCents: 499 }],
  );

  assert.deepEqual(rows, [
    {
      roleSlug: "forklift_reach_truck",
      landingPagePath: "/en/english-cv-example-forklift-reach-truck-netherlands",
      visitors: 0,
      rolePageSessions: 0,
      exampleStarts: 0,
      uploadStarts: 0,
      signups: 0,
      created: 1,
      meaningful: 0,
      ready: 0,
      preview: 0,
      checkout: 0,
      paid: 0,
      paidOrders: 0,
      revenueCents: 0,
      meaningfulRate: 0,
      readyRate: 0,
      previewRate: 0,
      checkoutRate: 0,
      paidRate: 0,
      deviceBreakdown: [],
    },
    {
      roleSlug: "logistics_warehouse",
      landingPagePath: "/en/english-cv-example-logistics-warehouse-netherlands",
      visitors: 0,
      rolePageSessions: 0,
      exampleStarts: 0,
      uploadStarts: 0,
      signups: 0,
      created: 2,
      meaningful: 1,
      ready: 1,
      preview: 2,
      checkout: 1,
      paid: 1,
      paidOrders: 2,
      revenueCents: 998,
      meaningfulRate: 50,
      readyRate: 50,
      previewRate: 100,
      checkoutRate: 50,
      paidRate: 50,
      deviceBreakdown: [],
    },
  ]);
});

test("ignores invalid sources and documents without a user", () => {
  const rows = aggregateEnglishRoleExampleFunnel(
    [
      { id: "valid", userId: "user-a", startSource: "en_role_example_order_picker_fulfilment", createdAt: date },
      { id: "invalid", userId: "user-b", startSource: "en_role_example_not_a_role", createdAt: date },
      { id: "anonymous", userId: null, startSource: "en_role_example_order_picker_fulfilment", createdAt: date },
    ],
    [{ cvId: "invalid", event: "checkout_start", createdAt: date }],
    [{ cvId: "invalid", paidAt: date }],
  );

  assert.equal(rows.length, 1);
  assert.equal(rows[0]?.roleSlug, "order_picker_fulfilment");
  assert.equal(rows[0]?.created, 1);
  assert.equal(rows[0]?.checkout, 0);
  assert.equal(rows[0]?.paid, 0);
});

test("counts role-page visitors, sessions, entry methods and signups without PII", () => {
  const rows = aggregateEnglishRoleExampleFunnel(
    [],
    [
      {
        event: "page_view",
        cvId: null,
        createdAt: date,
        path: "/en/english-cv-example-logistics-warehouse-netherlands",
        properties: { visitorId: "visitor-a", sessionId: "session-a" },
      },
      {
        event: "page_view",
        cvId: null,
        createdAt: date,
        path: "/en/english-cv-example-logistics-warehouse-netherlands",
        properties: { visitorId: "visitor-a", sessionId: "session-b" },
      },
      {
        event: "start_cv",
        cvId: null,
        createdAt: date,
        properties: { roleSlug: "logistics_warehouse", entryMethod: "example", visitorId: "visitor-a" },
      },
      {
        event: "start_cv",
        cvId: null,
        createdAt: date,
        properties: { roleSlug: "logistics_warehouse", entryMethod: "upload", visitorId: "visitor-b" },
      },
    ],
    [],
    [{ userId: "user-a", roleSlug: "logistics_warehouse" }],
    ["logistics_warehouse"],
  );

  assert.deepEqual(rows[0], {
    roleSlug: "logistics_warehouse",
    visitors: 1,
    rolePageSessions: 2,
    exampleStarts: 1,
    uploadStarts: 1,
    signups: 1,
    created: 0,
    meaningful: 0,
    ready: 0,
    preview: 0,
    checkout: 0,
    paid: 0,
    paidOrders: 0,
    revenueCents: 0,
    meaningfulRate: null,
    readyRate: null,
    previewRate: null,
    checkoutRate: null,
    paidRate: null,
    landingPagePath: "/en/english-cv-example-logistics-warehouse-netherlands",
    deviceBreakdown: [{
      deviceType: "unknown",
      visitors: 1,
      rolePageSessions: 2,
      exampleStarts: 1,
      uploadStarts: 1,
    }],
  });
});
