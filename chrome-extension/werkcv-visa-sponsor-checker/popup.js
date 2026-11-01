// Popup: what the badges found on this page, a search of the local register by name or KvK number, settings, and
// "Check this page" for job sites without badges. Links to werkcv.nl live here and on the welcome page only, never on
// the job sites themselves.

const t = (key, subs) => chrome.i18n.getMessage(key, subs) || key;
const $ = (id) => document.getElementById(id);
const DEFAULT_SETTINGS = { badges: true, onlySponsors: false, route: "hsm30" };
const UTM = "utm_source=chrome_extension&utm_campaign=sponsor_checker&utm_content=popup";
const SITE = "https://werkcv.nl";

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function translate() {
  document.documentElement.lang = chrome.i18n.getUILanguage().startsWith("nl") ? "nl" : "en";
  for (const node of document.querySelectorAll("[data-i18n]")) node.textContent = t(node.dataset.i18n);
  $("search").placeholder = t("searchPlaceholder");
  $("cv-link").href = `${SITE}/en/expat-cv-netherlands?${UTM}`;
  $("privacy-link").href = `${SITE}/en/chrome/visa-sponsor-checker/privacy?${UTM}`;
}

async function activeTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

// --- page summary and "Check this page" ---------------------------------------------------------------------------

async function showPage() {
  const tab = await activeTab();
  const summary = tab?.id ? await chrome.tabs.sendMessage(tab.id, { type: "summary" }).catch(() => null) : null;
  if (summary?.onJobPage && summary.employers) {
    const line = $("page-summary");
    line.textContent = "";
    line.append(t("summaryChecked", [String(summary.employers)]), " ");
    line.append(element("strong", null, t("summarySponsors", [String(summary.sponsor)])));
    if (summary.likely) line.append(" · ", t("summaryLikelyCount", [String(summary.likely)]));
    $("layout-miss").hidden = !summary.layoutMiss;
    return;
  }
  if (summary?.onJobPage) {
    $("page-summary").textContent = t(summary.layoutMiss ? "summaryNone" : "summaryWaiting");
    $("layout-miss").hidden = !summary.layoutMiss;
    return;
  }
  $("page-summary").textContent = t(summary ? "summaryOpenJobs" : "summaryOtherSite");
  $("check-page").hidden = !tab?.id || !/^https?:/.test(tab.url || "https:");
}

function renderJob(container, job, match, settings, thresholds) {
  container.textContent = "";
  const block = element("div", "result");
  block.append(element("span", `tier tier--${match.tier}`, t(`badge${{ sponsor: "Sponsor", likely: "Likely", not_found: "NotFound" }[match.tier]}`)));
  block.append(element("div", "result-name", job.employer));
  if (job.title) block.append(element("p", "result-note", job.title));
  block.append(element("p", "line", WerkcvSponsorLines.sponsorSummary({ name: job.employer }, match)));
  for (const line of [WerkcvSponsorLines.salaryLine(`${job.salary} ${job.description.slice(0, 6000)}`, thresholds, settings.route), WerkcvSponsorLines.dutchLine(job.description)]) {
    if (line) block.append(element("p", "line", line.text));
  }
  container.append(block);
  for (const entry of match.matches) container.append(entryRow(entry));
}

async function checkPage() {
  const tab = await activeTab();
  const box = $("check-result");
  box.hidden = false;
  box.textContent = t("checking");
  try {
    const [injection] = await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["check-page.js"] });
    const job = injection?.result;
    if (!job?.found || !job.employer) {
      box.textContent = t("checkNoJob");
      $("search").focus();
      return;
    }
    const [response, settings] = await Promise.all([
      chrome.runtime.sendMessage({ type: "match", employers: [{ name: job.employer }] }),
      chrome.storage.sync.get(DEFAULT_SETTINGS),
    ]);
    renderJob(box, job, response.results[0], settings, response.thresholds);
  } catch {
    box.textContent = t("checkBlocked");
  }
}

// --- search ---------------------------------------------------------------------------------------------------------

function entryRow(entry) {
  const row = element("div", "result");
  const head = element("div", "result-head");
  head.append(element("span", "result-name", entry.name), element("span", "result-kvk", `KvK ${entry.kvk}`));
  row.append(head);
  return row;
}

let searchTimer = null;
async function search() {
  const query = $("search").value.trim();
  const box = $("search-results");
  if (query.length < 2) {
    box.textContent = "";
    return;
  }
  const response = await chrome.runtime.sendMessage({ type: "search", query });
  if ($("search").value.trim() !== query) return;
  box.textContent = "";
  // A brand name goes through the same matcher as the badges; the plain register search adds what it finds.
  const employer = response.employer;
  const seen = new Set();
  if (employer && employer.tier !== "not_found") {
    box.append(element("span", `tier tier--${employer.tier}`, t(employer.tier === "sponsor" ? "badgeSponsor" : "badgeLikely")));
    for (const entry of employer.matches) {
      seen.add(entry.kvk + entry.name);
      box.append(entryRow(entry));
    }
  }
  const extra = response.register.matches.filter((entry) => !seen.has(entry.kvk + entry.name));
  for (const entry of extra) box.append(entryRow(entry));
  if (!box.childElementCount) box.append(element("p", "result-note", t("searchNone", [query])));
  else box.append(element("p", "result-note", t("searchHint")));
}

// --- settings, rating, register date --------------------------------------------------------------------------------

async function showSettings() {
  const settings = await chrome.storage.sync.get(DEFAULT_SETTINGS);
  $("route").value = settings.route;
  $("badges").checked = settings.badges;
  $("onlySponsors").checked = settings.onlySponsors;
  $("route").addEventListener("change", () => chrome.storage.sync.set({ route: $("route").value }));
  $("badges").addEventListener("change", () => chrome.storage.sync.set({ badges: $("badges").checked }));
  $("onlySponsors").addEventListener("change", () => chrome.storage.sync.set({ onlySponsors: $("onlySponsors").checked }));
}

async function showStatus() {
  const status = await chrome.runtime.sendMessage({ type: "status" });
  if (status?.registerDate) $("register-date").textContent = t("registerDateShort", [status.registerDate, status.entries.toLocaleString("en-US")]);
}

/** Once, after badges found sponsors on three different days: a plain link to the store's review page. */
async function showRating() {
  const { sponsorDays = [], ratingDismissed = false } = await chrome.storage.local.get(["sponsorDays", "ratingDismissed"]);
  if (ratingDismissed || sponsorDays.length < 3) return;
  $("rate-link").href = `https://chromewebstore.google.com/detail/${chrome.runtime.id}/reviews`;
  $("rate").hidden = false;
  const dismiss = () => {
    chrome.storage.local.set({ ratingDismissed: true });
    $("rate").hidden = true;
  };
  $("rate-dismiss").addEventListener("click", dismiss);
  $("rate-link").addEventListener("click", dismiss);
}

translate();
$("check-page").addEventListener("click", checkPage);
$("search").addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(search, 150);
});
showPage();
showSettings();
showStatus();
showRating();
