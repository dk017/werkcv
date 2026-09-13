/** Serialize all writes in one editor, including manual saves/uploads/downloads. */
export function createCvSaveQueue<T>(
  initialVersion: string | undefined,
  writer: (snapshot: T, version: string | undefined) => Promise<{ success: boolean; contentVersion?: string; error?: unknown }>,
) {
  let version = initialVersion;
  let conflicted = false;
  let tail: Promise<unknown> = Promise.resolve();
  return {
    getVersion: () => version,
    save(snapshot: T) {
      const copy = structuredClone(snapshot);
      const next = tail.then(async () => {
        if (conflicted) return { success: false, error: "SAVE_CONFLICT" };
        try {
          const result = await writer(copy, version);
          if (result.success) version = result.contentVersion ?? version;
          // A lost response may hide a committed write. Never guess the next version.
          else if (result.error === "SAVE_CONFLICT") conflicted = true;
          return result;
        } catch {
          conflicted = true;
          return { success: false, error: "SAVE_UNCERTAIN" };
        }
      });
      tail = next.catch(() => undefined);
      return next;
    },
  };
}
