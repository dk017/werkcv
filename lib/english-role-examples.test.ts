import assert from "node:assert/strict";
import test from "node:test";
import {
  buildEnglishRoleExampleStartSource,
  normalizeEnglishRoleExampleSlug,
  parseEnglishRoleExampleStartSource,
  readEnglishRoleExampleSourceFromPath,
} from "./english-role-examples";
import {
  forkliftReachTruckExample,
  logisticsCoordinatorExample,
  orderPickerFulfilmentExample,
} from "@/app/en/components/english-logistics-cluster";

test("normalizes known route slugs and rejects unknown values", () => {
  assert.equal(normalizeEnglishRoleExampleSlug("forklift-reach-truck"), "forklift_reach_truck");
  assert.equal(normalizeEnglishRoleExampleSlug("  Logistics Warehouse "), "logistics_warehouse");
  assert.equal(normalizeEnglishRoleExampleSlug("unknown-role"), null);
  assert.equal(normalizeEnglishRoleExampleSlug("logistics/warehouse"), null);
});

test("builds and parses stable role sources", () => {
  assert.equal(
    buildEnglishRoleExampleStartSource("order-picker-fulfilment"),
    "en_role_example_order_picker_fulfilment",
  );
  assert.equal(
    buildEnglishRoleExampleStartSource("logistics_coordinator", "upload"),
    "en_role_example_logistics_coordinator_upload",
  );
  assert.deepEqual(
    parseEnglishRoleExampleStartSource("en_role_example_logistics_coordinator_upload"),
    { roleSlug: "logistics_coordinator", entryMethod: "upload" },
  );
  assert.equal(parseEnglishRoleExampleStartSource("en_role_example_unknown"), null);
  assert.equal(parseEnglishRoleExampleStartSource("en_role_example_logistics_coordinator_extra"), null);
});

test("does not classify template comparison as a filled role example", () => {
  assert.equal(parseEnglishRoleExampleStartSource("english_role_template_comparison"), null);
});

test("uses explicitly synthetic education organisations in the new role samples", () => {
  const schools = [
    forkliftReachTruckExample.sampleCV.education[0]?.school,
    orderPickerFulfilmentExample.sampleCV.education[0]?.school,
    logisticsCoordinatorExample.sampleCV.education[0]?.school,
  ];

  assert.deepEqual(schools, [
    "Rivermark Logistics College (fictional)",
    "Northgate Logistics College (fictional)",
    "Harbourline Logistics College (fictional)",
  ]);
});

test("keeps every first-release source within the storage contract", () => {
  for (const role of ["logistics_warehouse", "forklift_reach_truck", "order_picker_fulfilment", "logistics_coordinator"] as const) {
    const source = buildEnglishRoleExampleStartSource(role, "upload");
    assert.ok(source);
    assert.ok(source.length <= 80);
    assert.match(source, /^en_role_example_[a-z0-9_]+$/);
  }
});

test("reads only same-origin internal paths", () => {
  assert.deepEqual(
    readEnglishRoleExampleSourceFromPath(
      "/en/editor?template=professional&startSource=en_role_example_forklift_reach_truck",
    ),
    {
      roleSlug: "forklift_reach_truck",
      entryMethod: "example",
      startSource: "en_role_example_forklift_reach_truck",
    },
  );
  assert.equal(
    readEnglishRoleExampleSourceFromPath(
      "https://evil.example/en/editor?startSource=en_role_example_forklift_reach_truck",
    ),
    null,
  );
  assert.equal(
    readEnglishRoleExampleSourceFromPath(
      "//evil.example/en/editor?startSource=en_role_example_forklift_reach_truck",
    ),
    null,
  );
  assert.equal(readEnglishRoleExampleSourceFromPath("/en/editor?startSource=english_example_page"), null);
});
