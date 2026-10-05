import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { SponsorRegister } from "./register";
import { IND_REGISTER_URL } from "./links";
import { createSponsorRegisterStore, type DiskCopy } from "./store-core";

// Wires the register store to the IND page, a disk cache and the database. The IND publishes one static page
// and updates it once a month, so the page is fetched at most once a day, cached on disk so a restart does not
// fetch it again, and each new monthly version is saved as a snapshot (for a later "new this month" page).

const USER_AGENT = "WerkCV sponsor checker (https://werkcv.nl; contact@werkcv.nl)";
const MAX_BYTES = 8_000_000;

// --- production wiring -----------------------------------------------------------------------------------

const cacheDir = path.join(os.tmpdir(), "werkcv-sponsor-register");
const cacheFile = path.join(cacheDir, "register.html");
const cacheMeta = path.join(cacheDir, "register.json");

async function fetchHtml() {
  const response = await fetch(IND_REGISTER_URL, { signal: AbortSignal.timeout(30_000), headers: { "User-Agent": USER_AGENT, "Accept-Language": "nl" } });
  if (!response.ok) throw new Error(`IND responded ${response.status}`);
  if (Number(response.headers.get("content-length") || "0") > MAX_BYTES) throw new Error("IND register page is unexpectedly large");
  const html = await response.text();
  if (html.length > MAX_BYTES) throw new Error("IND register page is unexpectedly large");
  return html;
}

async function readCache(): Promise<DiskCopy | null> {
  try {
    const meta = JSON.parse(await readFile(cacheMeta, "utf8")) as { savedAt: number };
    return { html: await readFile(cacheFile, "utf8"), savedAt: meta.savedAt };
  } catch {
    return null;
  }
}

async function writeCache(html: string) {
  try {
    await mkdir(cacheDir, { recursive: true });
    await writeFile(`${cacheFile}.tmp`, html, "utf8");
    await rename(`${cacheFile}.tmp`, cacheFile);
    await writeFile(cacheMeta, JSON.stringify({ savedAt: Date.now() }), "utf8");
  } catch {
    // The checker still works from memory; only the restart cache is lost.
  }
}

/** Saves this month's register once (the IND's own date is the key); a second load of the same date does nothing. */
export async function saveSnapshot(register: SponsorRegister) {
  if (!register.registerDate) return;
  const exists = await prisma.sponsorRegisterSnapshot.findUnique({ where: { registerDate: register.registerDate }, select: { id: true } });
  if (exists) return;
  await prisma.sponsorRegisterSnapshot.create({
    data: {
      registerDate: register.registerDate,
      rowCount: register.entries.length,
      entries: register.entries.map((entry) => [entry.name, entry.kvk]) as Prisma.InputJsonValue,
    },
  });
}

const store = createSponsorRegisterStore({ fetchHtml, readCache, writeCache, saveSnapshot, now: () => Date.now() });

export const getSponsorRegister = store.getRegister;
