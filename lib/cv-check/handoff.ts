/**
 * Hand the CV someone just checked to the editor, so "Verbeter in de editor" opens their own CV
 * instead of an empty one. The file stays in this browser only (IndexedDB holds files up to the
 * 10 MB upload limit without base64), survives the login redirect, and is removed once the
 * editor has used it or after two hours.
 */

const DB_NAME = "werkcv";
const STORE = "handoff";
const KEY = "cv_check_file";
export const CV_CHECK_HANDOFF_MAX_AGE_MS = 2 * 60 * 60 * 1000;

type StoredFile = { blob: Blob; name: string; type: string; at: number };

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest): Promise<T> {
  const db = await openDb();
  try {
    return await new Promise<T>((resolve, reject) => {
      const request = run(db.transaction(STORE, mode).objectStore(STORE));
      request.onsuccess = () => resolve(request.result as T);
      request.onerror = () => reject(request.error);
    });
  } finally {
    db.close();
  }
}

/** True when the handoff was stored; false (never throws) when the browser blocks storage. */
export async function saveCheckedCvForEditor(file: File, now = Date.now()): Promise<boolean> {
  try {
    const value: StoredFile = { blob: file, name: file.name, type: file.type, at: now };
    await withStore("readwrite", (store) => store.put(value, KEY));
    return true;
  } catch {
    return false;
  }
}

export function isFreshHandoff(at: unknown, now: number): boolean {
  return typeof at === "number" && now - at >= 0 && now - at < CV_CHECK_HANDOFF_MAX_AGE_MS;
}

/** Reads and removes the checked CV; null when there is none, it is stale, or storage is blocked. */
export async function takeCheckedCvForEditor(now = Date.now()): Promise<File | null> {
  try {
    const stored = await withStore<StoredFile | undefined>("readonly", (store) => store.get(KEY));
    await withStore("readwrite", (store) => store.delete(KEY));
    if (!stored || !(stored.blob instanceof Blob) || !isFreshHandoff(stored.at, now)) return null;
    return new File([stored.blob], stored.name || "cv", { type: stored.type || stored.blob.type });
  } catch {
    return null;
  }
}

/** Only CV-check links hand over a file; other upload intents keep today's empty uploader. */
export function isCvCheckStartSource(value: string | null): boolean {
  return value === "cv_check" || value === "cv_check_en";
}
