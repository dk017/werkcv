// Service worker: holds the register and answers lookups from the content scripts and the popup, so the register is
// loaded once instead of in every tab. Refreshes the data file from werkcv.nl once a day. No lookup ever leaves the
// browser; the only request out is that data file.

importScripts("lib/sponsor.js");

const DATA_URL = "https://werkcv.nl/api/sponsor-register/extension";
const EVENT_URL = "https://werkcv.nl/api/sponsor-register/extension/events";
const WELCOME_URL = "https://werkcv.nl/en/chrome/visa-sponsor-checker/welcome";
const UNINSTALL_URL = "https://werkcv.nl/en/chrome/visa-sponsor-checker/removed";
const DATA_VERSION = 1;
const MIN_ENTRIES = 10000;
const REFRESH_ALARM = "refresh-register";

let state = null; // { data, index, source }
let loading = null;
const cache = new Map();

async function packagedData() {
  const response = await fetch(chrome.runtime.getURL("data/register.json"));
  return response.json();
}

function usable(data) {
  return data && data.version === DATA_VERSION && Array.isArray(data.entries) && data.entries.length >= MIN_ENTRIES;
}

function newer(a, b) {
  return (a?.registerDate || "") > (b?.registerDate || "") || ((a?.registerDate || "") === (b?.registerDate || "") && (a?.generatedAt || "") > (b?.generatedAt || ""));
}

async function load() {
  if (state) return state;
  if (!loading) {
    loading = (async () => {
      const [{ remoteData }, packaged] = await Promise.all([chrome.storage.local.get("remoteData"), packagedData()]);
      const useRemote = usable(remoteData) && !newer(packaged, remoteData);
      const data = useRemote ? remoteData : packaged;
      const index = WerkcvSponsor.employerIndexFromEntries(data.entries, data.aliases || {}, data.registerDate || null);
      cache.clear();
      state = { data, index, source: useRemote ? "refreshed" : "packaged" };
      return state;
    })().finally(() => {
      loading = null;
    });
  }
  return loading;
}

async function refresh() {
  const { remoteEtag } = await chrome.storage.local.get("remoteEtag");
  try {
    const response = await fetch(DATA_URL, { headers: remoteEtag ? { "If-None-Match": remoteEtag } : {}, cache: "no-cache" });
    await chrome.storage.local.set({ lastRefreshAt: Date.now() });
    if (response.status === 304 || !response.ok) return;
    const data = await response.json();
    if (!usable(data)) return; // keep the last good copy
    await chrome.storage.local.set({ remoteData: data, remoteEtag: response.headers.get("ETag") || null });
    state = null;
    await load();
  } catch {
    // Offline or werkcv.nl unreachable: the packaged or last refreshed copy keeps working.
  }
}

function matchOne(index, employer) {
  const key = `${employer.slug || ""}|${employer.name}`;
  let result = cache.get(key);
  if (!result) {
    result = WerkcvSponsor.matchEmployer(index, employer);
    if (cache.size > 5000) cache.clear();
    cache.set(key, result);
  }
  return result;
}

/** Counts a layout miss at most once a day per site; no URL, page text or user data is sent. */
async function reportLayoutMiss(site) {
  const today = new Date().toISOString().slice(0, 10);
  const key = `layoutMiss:${site}`;
  const stored = await chrome.storage.local.get(key);
  if (stored[key] === today) return;
  await chrome.storage.local.set({ [key]: today });
  fetch(EVENT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" }, // a simple request: no CORS preflight
    body: JSON.stringify({ event: "layout_miss", site, version: chrome.runtime.getManifest().version }),
  }).catch(() => {});
}

/** Remembers the days on which sponsor badges were shown, for the one-time rating link in the popup. */
async function noteSponsorDay() {
  const today = new Date().toISOString().slice(0, 10);
  const { sponsorDays = [] } = await chrome.storage.local.get("sponsorDays");
  if (sponsorDays.includes(today)) return;
  await chrome.storage.local.set({ sponsorDays: [...sponsorDays, today].slice(-10) });
}

async function handle(message) {
  switch (message?.type) {
    case "match": {
      const { index, data } = await load();
      const results = (message.employers || []).slice(0, 200).map((employer) => matchOne(index, employer));
      if (results.some((result) => result.tier === "sponsor")) noteSponsorDay();
      return { results, registerDate: data.registerDate, thresholds: data.thresholds, selectors: data.selectors };
    }
    case "config": {
      const { data } = await load();
      return { registerDate: data.registerDate, thresholds: data.thresholds, selectors: data.selectors };
    }
    case "search": {
      const { index, data } = await load();
      const query = String(message.query || "").slice(0, 160);
      const employer = WerkcvSponsor.kvkFromQuery(query) ? null : WerkcvSponsor.matchEmployer(index, { name: query });
      const register = WerkcvSponsor.searchSponsors(index.register, query, 8);
      return { employer, register, registerDate: data.registerDate };
    }
    case "status": {
      const { data, source } = await load();
      const { lastRefreshAt = null } = await chrome.storage.local.get("lastRefreshAt");
      return { registerDate: data.registerDate, entries: data.entries.length, source, lastRefreshAt };
    }
    case "layoutMiss":
      await reportLayoutMiss(String(message.site || "unknown").slice(0, 20));
      return { ok: true };
    default:
      return null;
  }
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  handle(message).then(sendResponse, (error) => sendResponse({ error: String(error?.message || error) }));
  return true;
});

chrome.runtime.onInstalled.addListener((details) => {
  chrome.alarms.create(REFRESH_ALARM, { periodInMinutes: 24 * 60, delayInMinutes: 1 });
  chrome.runtime.setUninstallURL(UNINSTALL_URL);
  if (details.reason === "install") chrome.tabs.create({ url: `${WELCOME_URL}?utm_source=chrome_extension&utm_campaign=sponsor_checker&utm_content=install` });
});

chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.get(REFRESH_ALARM).then((alarm) => {
    if (!alarm) chrome.alarms.create(REFRESH_ALARM, { periodInMinutes: 24 * 60, delayInMinutes: 1 });
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === REFRESH_ALARM) refresh();
});
