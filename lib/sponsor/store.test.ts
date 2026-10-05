import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { parseIndRegisterHtml } from "./register";
import { REFRESH_MS, createSponsorRegisterStore, type StoreDeps } from "./store-core";

const html = readFileSync(path.join(process.cwd(), "lib/sponsor/fixtures/ind-register-sample.html"), "utf8");
const entryCount = parseIndRegisterHtml(html).entries.length;
const tooSmall = html.split("</tr>").slice(0, 6).join("</tr>") + "</tr></table></body></html>";

function setup(overrides: Partial<StoreDeps> = {}) {
  const calls = { fetch: 0, writeCache: 0, snapshots: 0 };
  let clock = 1_000_000;
  let cache: { html: string; savedAt: number } | null = null;
  const deps: StoreDeps = {
    fetchHtml: async () => {
      calls.fetch += 1;
      return html;
    },
    readCache: async () => cache,
    writeCache: async (value) => {
      calls.writeCache += 1;
      cache = { html: value, savedAt: clock };
    },
    saveSnapshot: async () => {
      calls.snapshots += 1;
    },
    now: () => clock,
    minEntries: 100,
    ...overrides,
  };
  return {
    store: createSponsorRegisterStore(deps),
    calls,
    advance: (ms: number) => (clock += ms),
    setCache: (value: { html: string; savedAt: number } | null) => (cache = value),
  };
}

test("the first request fetches the page once, caches it and saves a snapshot", async () => {
  const { store, calls } = setup();
  const register = await store.getRegister();
  assert.equal(register.entries.length, entryCount);
  assert.deepEqual(calls, { fetch: 1, writeCache: 1, snapshots: 1 });
  await store.getRegister();
  assert.equal(calls.fetch, 1, "the second request is served from memory");
});

test("simultaneous first requests share one fetch", async () => {
  const { store, calls } = setup();
  await Promise.all([store.getRegister(), store.getRegister(), store.getRegister()]);
  assert.equal(calls.fetch, 1);
});

test("after a day the old copy is served at once while a fresh one loads in the background", async () => {
  const { store, calls, advance } = setup();
  await store.getRegister();
  advance(REFRESH_MS + 1_000);
  const register = await store.getRegister();
  assert.equal(register.entries.length, entryCount, "no waiting for the refresh");
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(calls.fetch, 2);
});

test("a recent disk copy is used after a restart without fetching the page", async () => {
  const { store, calls, setCache } = setup();
  setCache({ html, savedAt: 1_000_000 - 60_000 });
  await store.getRegister();
  assert.equal(calls.fetch, 0);
});

test("when the IND is down, an old disk copy still answers", async () => {
  const { store, setCache, calls } = setup({
    fetchHtml: async () => {
      throw new Error("IND responded 503");
    },
  });
  setCache({ html, savedAt: 1_000_000 - 3 * REFRESH_MS });
  const register = await store.getRegister();
  assert.equal(register.entries.length, entryCount);
  assert.equal(calls.snapshots, 0, "nothing new to snapshot");
});

test("when the IND is down and nothing is cached, the request fails and retries are paced", async () => {
  let fetches = 0;
  const { store } = setup({
    fetchHtml: async () => {
      fetches += 1;
      throw new Error("IND responded 503");
    },
  });
  await assert.rejects(() => store.getRegister(), /503/);
  await assert.rejects(() => store.getRegister(), /temporarily unavailable/);
  assert.equal(fetches, 1, "the second request did not hit the IND again");
});

test("a page that is too short or has other columns is rejected, not served", async () => {
  const short = setup({ fetchHtml: async () => tooSmall, minEntries: 10_000 });
  await assert.rejects(() => short.store.getRegister(), /incomplete/);
  const changed = setup({ fetchHtml: async () => "<html><p>onderhoud</p></html>" });
  await assert.rejects(() => changed.store.getRegister(), /Unexpected register columns/);
  assert.equal(changed.calls.writeCache, 0, "a bad page is never written to the cache");
});

test("a failing snapshot does not fail the search", async () => {
  const { store } = setup({
    saveSnapshot: async () => {
      throw new Error("database down");
    },
  });
  const register = await store.getRegister();
  assert.equal(register.entries.length, entryCount);
});
