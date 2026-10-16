import { afterEach, beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import { defaultCV, sampleCV } from "./cv";
import { PENDING_EXAMPLE_CV_STORAGE_KEY } from "./pending-example-cv";
import { getDefaultThemeId } from "./templates/registry";
import {
  PUBLIC_DRAFT_LAST_ID_KEY,
  adoptPendingExampleIntoPublicDraft,
  takeAdoptedPendingExample,
  PUBLIC_DRAFT_MAX_AGE_MS,
  clearPublicDraft,
  createPublicDraftId,
  getPublicDraftStorageKey,
  isPublicDraftExpired,
  readLastPublicDraftId,
  readPublicDraft,
  readPublicDraftIdForSource,
  savePublicDraft,
  type PublicDraftSnapshot,
} from "./public-cv-draft";

class MemoryStorage implements Storage {
  private map = new Map<string, string>();
  get length() { return this.map.size; }
  clear() { this.map.clear(); }
  getItem(key: string) { return this.map.has(key) ? this.map.get(key)! : null; }
  key(index: number) { return [...this.map.keys()][index] ?? null; }
  removeItem(key: string) { this.map.delete(key); }
  setItem(key: string, value: string) { this.map.set(key, String(value)); }
}

let local: MemoryStorage;
let session: MemoryStorage;

beforeEach(() => {
  local = new MemoryStorage();
  session = new MemoryStorage();
  (globalThis as unknown as { window: unknown }).window = { localStorage: local, sessionStorage: session };
});

afterEach(() => {
  delete (globalThis as unknown as { window?: unknown }).window;
});

function snapshot(overrides: Partial<PublicDraftSnapshot> = {}): PublicDraftSnapshot {
  return {
    version: 1,
    draftId: createPublicDraftId(),
    source: "public_editor_build_first",
    templateId: "professional",
    colorThemeId: "default",
    uiLanguage: "nl",
    flow: "consumer",
    data: defaultCV,
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

describe("public CV draft storage", () => {
  it("saves to localStorage so the draft survives a closed tab", () => {
    const draft = snapshot();
    assert.deepEqual(savePublicDraft(draft), { ok: true });
    assert.ok(local.getItem(getPublicDraftStorageKey(draft.draftId)));
    assert.equal(session.getItem(getPublicDraftStorageKey(draft.draftId)), null);

    session.clear(); // closing the tab wipes sessionStorage only
    assert.equal(readPublicDraftIdForSource(draft.source), draft.draftId);
    assert.equal(readPublicDraft(draft.draftId)?.draftId, draft.draftId);
    assert.equal(readLastPublicDraftId(), draft.draftId);
  });

  it("still finds a draft that an older version kept in sessionStorage", () => {
    const draft = snapshot();
    session.setItem(getPublicDraftStorageKey(draft.draftId), JSON.stringify(draft));
    session.setItem(PUBLIC_DRAFT_LAST_ID_KEY, draft.draftId);
    assert.equal(readPublicDraft(draft.draftId)?.draftId, draft.draftId);
    assert.equal(readLastPublicDraftId(), draft.draftId);

    // The next save moves it to localStorage and removes the old copy.
    savePublicDraft({ ...draft, updatedAt: new Date().toISOString() });
    assert.equal(session.getItem(getPublicDraftStorageKey(draft.draftId)), null);
    assert.ok(local.getItem(getPublicDraftStorageKey(draft.draftId)));
  });

  it("drops a draft that has not changed for more than a week", () => {
    const old = new Date(Date.now() - PUBLIC_DRAFT_MAX_AGE_MS - 60_000).toISOString();
    const draft = snapshot();
    savePublicDraft(draft);
    local.setItem(getPublicDraftStorageKey(draft.draftId), JSON.stringify({ ...draft, updatedAt: old }));
    assert.equal(readPublicDraftIdForSource(draft.source), null);
    assert.equal(readPublicDraft(draft.draftId), null);
    assert.equal(local.getItem(getPublicDraftStorageKey(draft.draftId)), null);
    assert.equal(readLastPublicDraftId(), null);
  });

  it("keeps a draft changed within the week", () => {
    const draft = snapshot();
    savePublicDraft(draft);
    const sixDaysOld = new Date(Date.now() - PUBLIC_DRAFT_MAX_AGE_MS + 60_000).toISOString();
    local.setItem(getPublicDraftStorageKey(draft.draftId), JSON.stringify({ ...draft, updatedAt: sixDaysOld }));
    assert.equal(readPublicDraftIdForSource(draft.source), draft.draftId);
    assert.equal(readPublicDraft(draft.draftId)?.draftId, draft.draftId);
  });

  it("clearing removes the draft from both stores", () => {
    const draft = snapshot();
    savePublicDraft(draft);
    session.setItem(getPublicDraftStorageKey(draft.draftId), JSON.stringify(draft));
    clearPublicDraft(draft.draftId);
    assert.equal(local.getItem(getPublicDraftStorageKey(draft.draftId)), null);
    assert.equal(session.getItem(getPublicDraftStorageKey(draft.draftId)), null);
    assert.equal(readPublicDraftIdForSource(draft.source), null);
    assert.equal(readLastPublicDraftId(), null);
  });

  it("clearing an older draft keeps a newer active draft for the same source", () => {
    const first = snapshot();
    const second = snapshot();
    savePublicDraft(first);
    savePublicDraft(second);
    clearPublicDraft(first.draftId);
    assert.equal(readPublicDraftIdForSource(second.source), second.draftId);
  });

  it("treats an unreadable date as expired", () => {
    assert.equal(isPublicDraftExpired("not a date"), true);
    assert.equal(isPublicDraftExpired(new Date().toISOString()), false);
  });
});

describe("an example chosen without an account", () => {
  const source = "public_editor_build_first_nl";
  const pending = (overrides: Record<string, unknown> = {}) => JSON.stringify({
    templateId: "professional",
    colorThemeId: getDefaultThemeId("professional"),
    sampleCV,
    startSource: "example_page",
    pagePath: "/cv-voorbeelden/zorg-en-welzijn/verpleegkundige",
    uiLanguage: "nl",
    ...overrides,
  });

  it("becomes the draft of the no-account editor, once", () => {
    session.setItem(PENDING_EXAMPLE_CV_STORAGE_KEY, pending());
    const adopted = adoptPendingExampleIntoPublicDraft(source, { locale: "nl", flow: "consumer" });
    assert.ok(adopted);
    assert.equal(session.getItem(PENDING_EXAMPLE_CV_STORAGE_KEY), null);
    assert.equal(readPublicDraftIdForSource(source), adopted.draftId);
    const draft = readPublicDraft(adopted.draftId);
    assert.equal(draft?.data.personal.name, sampleCV.personal.name);
    assert.equal(draft?.startSource, "example_page");
    assert.equal(draft?.templateId, "professional");
    assert.deepEqual(takeAdoptedPendingExample(), adopted);
    assert.equal(takeAdoptedPendingExample(), null);
    assert.equal(adoptPendingExampleIntoPublicDraft(source, { locale: "nl", flow: "consumer" }), null);
  });

  it("starts a new draft and leaves an earlier draft stored", () => {
    const earlier = snapshot({ source });
    savePublicDraft(earlier);
    session.setItem(PENDING_EXAMPLE_CV_STORAGE_KEY, pending());
    const adopted = adoptPendingExampleIntoPublicDraft(source, { locale: "nl", flow: "consumer" });
    assert.ok(adopted && adopted.draftId !== earlier.draftId);
    assert.equal(readPublicDraftIdForSource(source), adopted.draftId);
    assert.ok(readPublicDraft(earlier.draftId));
  });

  it("ignores a blank template and an invalid record, and removes both", () => {
    session.setItem(PENDING_EXAMPLE_CV_STORAGE_KEY, pending({ sampleCV: undefined, startSource: "example_blank_template" }));
    assert.equal(adoptPendingExampleIntoPublicDraft(source, { locale: "nl", flow: "consumer" }), null);
    assert.equal(session.getItem(PENDING_EXAMPLE_CV_STORAGE_KEY), null);
    session.setItem(PENDING_EXAMPLE_CV_STORAGE_KEY, pending({ templateId: "does-not-exist" }));
    assert.equal(adoptPendingExampleIntoPublicDraft(source, { locale: "nl", flow: "consumer" }), null);
    assert.equal(session.getItem(PENDING_EXAMPLE_CV_STORAGE_KEY), null);
    assert.equal(readPublicDraftIdForSource(source), null);
  });
});
