import { parseIndRegisterHtml, type SponsorRegister } from "./register";

// The loading logic of the sponsor register store, without any database or network code, so its failure
// cases are tested with fakes (see store.test.ts). store.ts wires it to the IND page, the disk and the database.

export const REFRESH_MS = 24 * 60 * 60 * 1_000;
export const RETRY_MS = 15 * 60 * 1_000;
/** The register holds about 13,000 organisations; far fewer means the page changed or loaded partially. */
export const MIN_ENTRIES = 10_000;

type Loaded = { register: SponsorRegister; loadedAt: number };
export type DiskCopy = { html: string; savedAt: number };

export type StoreDeps = {
  fetchHtml: () => Promise<string>;
  readCache: () => Promise<DiskCopy | null>;
  writeCache: (html: string) => Promise<void>;
  saveSnapshot: (register: SponsorRegister) => Promise<void>;
  now: () => number;
  /** Fewest entries a page may hold to be accepted (tests use a small fixture). */
  minEntries?: number;
};

export function createSponsorRegisterStore(deps: StoreDeps) {
  let current: Loaded | null = null;
  let inFlight: Promise<Loaded> | null = null;
  let lastFailureAt = 0;

  function parseChecked(html: string) {
    const register = parseIndRegisterHtml(html);
    if (register.entries.length < (deps.minEntries ?? MIN_ENTRIES)) throw new Error(`Sponsor register looks incomplete (${register.entries.length} entries)`);
    return register;
  }

  async function load(): Promise<Loaded> {
    // First use after a restart: a recent disk copy avoids fetching the page again.
    if (!current) {
      const cached = await deps.readCache();
      if (cached && deps.now() - cached.savedAt < REFRESH_MS) {
        try {
          return { register: parseChecked(cached.html), loadedAt: cached.savedAt };
        } catch {
          // A bad cache file is ignored; the page is fetched below.
        }
      }
    }
    try {
      const html = await deps.fetchHtml();
      const register = parseChecked(html);
      await deps.writeCache(html);
      // A failed snapshot must never fail a search.
      void deps.saveSnapshot(register).catch((error) => console.error("sponsor_register_snapshot_failed", error instanceof Error ? error.name : "unknown"));
      console.info(`[sponsor-register] loaded ${register.entries.length} sponsors (register ${register.registerDate ?? "undated"})`);
      return { register, loadedAt: deps.now() };
    } catch (error) {
      // The IND is down or the page changed: an older cached copy is better than no answer.
      if (!current) {
        const stale = await deps.readCache();
        if (stale) {
          try {
            console.warn("[sponsor-register] using a stale disk copy:", error instanceof Error ? error.message : "unknown error");
            return { register: parseChecked(stale.html), loadedAt: stale.savedAt };
          } catch {
            // Fall through to the original error.
          }
        }
      }
      throw error;
    }
  }

  function refresh() {
    inFlight ??= load()
      .then((loaded) => {
        current = loaded;
        return loaded;
      })
      .catch((error) => {
        lastFailureAt = deps.now();
        throw error;
      })
      .finally(() => {
        inFlight = null;
      });
    return inFlight;
  }

  /**
   * The register, refreshing in the background when it is over a day old. Only the very first request waits
   * for a fetch; later ones get the current copy immediately. Throws only when no copy has ever loaded.
   */
  async function getRegister(): Promise<SponsorRegister> {
    if (!current) {
      if (deps.now() - lastFailureAt < 60_000 && !inFlight) throw new Error("Sponsor register temporarily unavailable");
      return (await refresh()).register;
    }
    const stale = deps.now() - current.loadedAt > REFRESH_MS;
    const recentlyFailed = deps.now() - lastFailureAt < RETRY_MS;
    if (stale && !recentlyFailed) void refresh().catch(() => undefined);
    return current.register;
  }

  return { getRegister };
}
