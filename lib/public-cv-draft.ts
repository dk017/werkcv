import { cvSchema, type CVData } from "@/lib/cv";

export type PublicEditorFlow = "consumer" | "agency";
export type PublicEditorLocale = "nl" | "en";

export type PublicDraftSnapshot = {
  version: 1;
  draftId: string;
  data: CVData;
  templateId: string;
  colorThemeId: string;
  uiLanguage: PublicEditorLocale;
  flow: PublicEditorFlow;
  source: string;
  /** Where the visitor started (e.g. home_hero_primary); kept so the claimed CV keeps its attribution. */
  startSource?: string;
  updatedAt: string;
};

export const PUBLIC_DRAFT_STORAGE_PREFIX = "werkcv_public_cv_draft_v1:";
export const PUBLIC_DRAFT_LAST_ID_KEY = "werkcv_public_cv_last_draft_v1";
export const PUBLIC_DRAFT_ACTIVE_PREFIX = "werkcv_public_cv_active_v1:";
export const MAX_PUBLIC_DRAFT_JSON_CHARS = 900_000;
/** A draft without an account is kept in this browser for a week after its last change, then dropped. */
export const PUBLIC_DRAFT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const clientDraftIdCache = new Map<string, string>();

function isBrowser(): boolean {
  return typeof window !== "undefined" && (typeof window.localStorage !== "undefined" || typeof window.sessionStorage !== "undefined");
}

// Drafts live in localStorage so closing the tab does not lose a CV built without an account (before
// 15 Oct 2026 they lived in sessionStorage, which a closed tab wipes). sessionStorage is still read,
// so a draft started before the change is found, and every write or removal covers both.
function storages(): Storage[] {
  const list: Storage[] = [];
  try { if (window.localStorage) list.push(window.localStorage); } catch { /* blocked */ }
  try { if (window.sessionStorage) list.push(window.sessionStorage); } catch { /* blocked */ }
  return list;
}

function getItem(key: string): string | null {
  for (const storage of storages()) {
    try {
      const value = storage.getItem(key);
      if (value !== null) return value;
    } catch {
      // try the next one
    }
  }
  return null;
}

function setItem(key: string, value: string): void {
  const [primary, ...rest] = storages();
  if (!primary) throw new Error("STORAGE_UNAVAILABLE");
  primary.setItem(key, value);
  // Remove an older copy elsewhere so a stale tab copy can never shadow the current one.
  for (const storage of rest) {
    try { storage.removeItem(key); } catch { /* best effort */ }
  }
}

function removeItem(key: string): void {
  for (const storage of storages()) {
    try { storage.removeItem(key); } catch { /* best effort */ }
  }
}

export function isPublicDraftExpired(updatedAt: string, now = Date.now()): boolean {
  const time = Date.parse(updatedAt);
  return !Number.isFinite(time) || now - time > PUBLIC_DRAFT_MAX_AGE_MS;
}

export function isPublicDraftId(value: unknown): value is string {
  return typeof value === "string" && /^[a-zA-Z0-9_-]{16,100}$/.test(value);
}

export function createPublicDraftId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `draft_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 14)}`;
}

export function getPublicDraftStorageKey(draftId: string): string {
  return `${PUBLIC_DRAFT_STORAGE_PREFIX}${draftId}`;
}

function getActiveDraftStorageKey(source: string): string {
  return `${PUBLIC_DRAFT_ACTIVE_PREFIX}${source.slice(0, 160)}`;
}

function parseSnapshot(raw: string | null): PublicDraftSnapshot | null {
  if (!raw || raw.length > MAX_PUBLIC_DRAFT_JSON_CHARS) return null;

  try {
    const candidate = JSON.parse(raw) as Partial<PublicDraftSnapshot>;
    const parsedData = cvSchema.safeParse(candidate.data);

    if (
      candidate.version !== 1
      || !isPublicDraftId(candidate.draftId)
      || !parsedData.success
      || typeof candidate.templateId !== "string"
      || typeof candidate.colorThemeId !== "string"
      || (candidate.uiLanguage !== "nl" && candidate.uiLanguage !== "en")
      || (candidate.flow !== "consumer" && candidate.flow !== "agency")
      || typeof candidate.source !== "string"
      || typeof candidate.updatedAt !== "string"
    ) {
      return null;
    }

    return {
      version: 1,
      draftId: candidate.draftId,
      data: parsedData.data,
      templateId: candidate.templateId,
      colorThemeId: candidate.colorThemeId,
      uiLanguage: candidate.uiLanguage,
      flow: candidate.flow,
      source: candidate.source.slice(0, 160),
      ...(typeof candidate.startSource === "string" && candidate.startSource ? { startSource: candidate.startSource.slice(0, 120) } : {}),
      updatedAt: candidate.updatedAt,
    };
  } catch {
    return null;
  }
}

export function readPublicDraft(draftId: string): PublicDraftSnapshot | null {
  if (!isBrowser() || !isPublicDraftId(draftId)) return null;
  const snapshot = parseSnapshot(getItem(getPublicDraftStorageKey(draftId)));
  if (snapshot && isPublicDraftExpired(snapshot.updatedAt)) {
    clearPublicDraft(draftId);
    return null;
  }
  return snapshot;
}

export function savePublicDraft(snapshot: PublicDraftSnapshot): { ok: true } | { ok: false; code: "TOO_LARGE" | "STORAGE_UNAVAILABLE" } {
  if (!isBrowser() || !isPublicDraftId(snapshot.draftId)) {
    return { ok: false, code: "STORAGE_UNAVAILABLE" };
  }

  const safeSnapshot: PublicDraftSnapshot = {
    ...snapshot,
    source: snapshot.source.slice(0, 160),
    updatedAt: new Date().toISOString(),
  };

  const serialized = JSON.stringify(safeSnapshot);
  if (serialized.length > MAX_PUBLIC_DRAFT_JSON_CHARS) {
    return { ok: false, code: "TOO_LARGE" };
  }

  try {
    setItem(getPublicDraftStorageKey(snapshot.draftId), serialized);
    setItem(PUBLIC_DRAFT_LAST_ID_KEY, snapshot.draftId);
    setItem(getActiveDraftStorageKey(snapshot.source), snapshot.draftId);
    return { ok: true };
  } catch {
    return { ok: false, code: "STORAGE_UNAVAILABLE" };
  }
}

export function clearPublicDraft(draftId: string): void {
  if (!isBrowser() || !isPublicDraftId(draftId)) return;

  try {
    const snapshot = parseSnapshot(getItem(getPublicDraftStorageKey(draftId)));
    removeItem(getPublicDraftStorageKey(draftId));
    if (snapshot && getItem(getActiveDraftStorageKey(snapshot.source)) === draftId) {
      removeItem(getActiveDraftStorageKey(snapshot.source));
    }
    if (getItem(PUBLIC_DRAFT_LAST_ID_KEY) === draftId) {
      removeItem(PUBLIC_DRAFT_LAST_ID_KEY);
    }
  } catch {
    // Storage cleanup is best effort and must never interrupt the paid flow.
  }
}

export function readPublicDraftIdForSource(source: string): string | null {
  if (!isBrowser() || !source) return null;

  try {
    const draftId = getItem(getActiveDraftStorageKey(source));
    if (!isPublicDraftId(draftId)) return null;
    // A stored but expired draft is dropped here, so the editor starts fresh instead of reopening it.
    // An id without a stored snapshot yet (nothing typed so far) is still returned.
    const snapshot = parseSnapshot(getItem(getPublicDraftStorageKey(draftId)));
    if (snapshot && isPublicDraftExpired(snapshot.updatedAt)) {
      clearPublicDraft(draftId);
      return null;
    }
    return draftId;
  } catch {
    return null;
  }
}

/**
 * Stable external-store snapshot for client components that need to wait for
 * browser storage without causing a synchronous setState in an effect.
 */
export function getPublicDraftHydrationKey(source: string): string {
  if (!isBrowser() || !source) return "";

  const existingId = readPublicDraftIdForSource(source);
  if (existingId) {
    const snapshot = readPublicDraft(existingId);
    return `${existingId}|${snapshot?.updatedAt || "empty"}`;
  }

  const cachedId = clientDraftIdCache.get(source) || createPublicDraftId();
  clientDraftIdCache.set(source, cachedId);
  return `${cachedId}|new`;
}

export function readLastPublicDraftId(): string | null {
  if (!isBrowser()) return null;

  try {
    const draftId = getItem(PUBLIC_DRAFT_LAST_ID_KEY);
    return isPublicDraftId(draftId) ? draftId : null;
  } catch {
    return null;
  }
}
