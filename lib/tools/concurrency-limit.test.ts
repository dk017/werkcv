import assert from "node:assert/strict";
import test from "node:test";
import { resetConcurrencyLimitForTests, tryAcquireConcurrencyLease } from "./concurrency-limit";

test("concurrency leases enforce per-network and global limits without leaking capacity", () => {
  resetConcurrencyLimitForTests();
  const first = tryAcquireConcurrencyLease("network-a", { maxGlobal: 2, maxPerKey: 1 });
  assert.ok(first);
  assert.equal(tryAcquireConcurrencyLease("network-a", { maxGlobal: 2, maxPerKey: 1 }), null);
  const second = tryAcquireConcurrencyLease("network-b", { maxGlobal: 2, maxPerKey: 1 });
  assert.ok(second);
  assert.equal(tryAcquireConcurrencyLease("network-c", { maxGlobal: 2, maxPerKey: 1 }), null);
  first.release();
  first.release();
  const third = tryAcquireConcurrencyLease("network-c", { maxGlobal: 2, maxPerKey: 1 });
  assert.ok(third);
  second.release();
  third.release();
});
