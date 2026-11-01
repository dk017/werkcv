// Shared by the LinkedIn and Indeed content scripts: finds job cards, asks the service worker which employers are on
// the IND register, and shows a badge next to each employer plus a short card above the open job. Matching runs in the
// service worker against the local register copy; nothing about the page leaves the browser.
//
// Everything is built with textContent and createElement, never innerHTML, and every class starts with "werkcv-sp-".

(() => {
  if (window.WerkcvSponsorContent) return;

  const IND_REGISTER_URL = "https://ind.nl/nl/openbaar-register-erkende-referenten/openbaar-register-arbeid";
  const REPORT_EMAIL = "contact@werkcv.nl";
  const SCAN_DELAY_MS = 350;
  const DEFAULT_SETTINGS = { badges: true, onlySponsors: false, route: "hsm30" };

  const t = (key, subs) => chrome.i18n.getMessage(key, subs) || key;

  let adapter = null;
  let settings = { ...DEFAULT_SETTINGS };
  let config = { registerDate: null, thresholds: null, selectors: null };
  const results = new Map(); // employer key -> match result
  const waiting = new Map(); // employer key -> { employer, targets: Set<{ employerEl, card }> }
  const rendered = new Map(); // employer element -> { key, card, badge }
  let scanTimer = null;
  let layoutMissReported = false;
  let detailKey = null;
  let contextGone = false;

  // --- helpers ---------------------------------------------------------------------------------------------------

  function send(message) {
    if (contextGone) return Promise.resolve(null);
    return chrome.runtime.sendMessage(message).catch((error) => {
      // After an update or reload of the extension the old content script loses its connection; stop quietly.
      if (/context invalidated/i.test(String(error?.message))) contextGone = true;
      return null;
    });
  }

  function validSelectors(list) {
    return (list || []).filter((selector) => {
      try {
        document.createDocumentFragment().querySelector(selector);
        return true;
      } catch {
        return false;
      }
    });
  }

  // The selectors come with the register data (packaged, then refreshed daily), so a layout change on a job site is
  // fixed by a data update. lib/sponsor/extension-selectors.ts in the WerkCV repository is the source.
  const validated = new Map();
  function selectorsFor(field) {
    const list = config.selectors?.[adapter.site]?.[field] || [];
    const key = `${field}:${list.join("|")}`;
    if (!validated.has(key)) validated.set(key, validSelectors(list));
    return validated.get(key);
  }

  function first(root, selectors) {
    for (const selector of selectors) {
      const found = root.querySelector(selector);
      if (found && textOf(found)) return found;
    }
    return null;
  }

  /** Visible text of an element, without our own badges and without style or script blocks inside it. */
  function textOf(element, max = 400) {
    let text = "";
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) =>
        /^(STYLE|SCRIPT|NOSCRIPT|TEMPLATE)$/.test(node.parentElement?.tagName || "") || node.parentElement?.closest(".werkcv-sp-badge, .werkcv-sp-card")
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT,
    });
    while (walker.nextNode() && text.length < max) text += ` ${walker.currentNode.nodeValue}`;
    return text.replace(/\s+/g, " ").trim();
  }

  function employerName(element) {
    return textOf(element).split(/\s+[·•|]\s+/)[0].trim().slice(0, 120);
  }

  function slugFrom(...elements) {
    for (const element of elements) {
      const link = element?.matches?.("a[href*='/company/']") ? element : element?.querySelector?.("a[href*='/company/']") || element?.closest?.("a[href*='/company/']");
      const match = link && /\/company\/([^/?#]+)/.exec(link.getAttribute("href") || "");
      if (match) {
        try {
          return decodeURIComponent(match[1]).toLowerCase();
        } catch {
          return match[1].toLowerCase();
        }
      }
    }
    return null;
  }

  const keyOf = (employer) => `${employer.slug || ""}|${employer.name}`;

  // --- badges ----------------------------------------------------------------------------------------------------

  const BADGE_TEXT = { sponsor: "badgeSponsor", likely: "badgeLikely", not_found: "badgeNotFound" };

  function makeBadge(employer, result) {
    const badge = document.createElement("span");
    badge.className = `werkcv-sp-badge werkcv-sp-badge--${result.tier}`;
    badge.setAttribute("role", "button");
    badge.tabIndex = 0;
    badge.textContent = t(BADGE_TEXT[result.tier]);
    badge.title = tooltip(employer, result);
    const open = (event) => {
      event.preventDefault();
      event.stopPropagation();
      openPopover(badge, employer, result);
    };
    badge.addEventListener("click", open, true);
    badge.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") open(event);
    });
    // Job cards are links; keep the press on the badge from opening the job.
    for (const type of ["mousedown", "mouseup", "pointerdown", "pointerup"]) badge.addEventListener(type, (event) => event.stopPropagation(), true);
    return badge;
  }

  function tooltip(employer, result) {
    const names = result.matches.slice(0, 3).map((match) => `${match.name} (KvK ${match.kvk})`);
    if (result.tier === "sponsor") return [t("tipSponsor"), ...names, t("tipCheckEntity")].join("\n");
    if (result.tier === "likely") return [t("tipLikely"), ...names, t("tipPerEntity")].join("\n");
    return t("tipNotFound", [employer.name]);
  }

  function placeBadge(employerEl, badge) {
    const inline = /^(A|SPAN|STRONG|B)$/.test(employerEl.tagName);
    if (inline) employerEl.insertAdjacentElement("afterend", badge);
    else employerEl.appendChild(badge);
  }

  function applyDim(card, result) {
    card?.classList.toggle("werkcv-sp-dim", Boolean(settings.onlySponsors && result?.tier === "not_found"));
  }

  function render(employerEl, card, employer, result) {
    const previous = rendered.get(employerEl);
    if (previous?.badge?.isConnected && previous.key === keyOf(employer)) {
      applyDim(card, result);
      return;
    }
    previous?.badge?.remove();
    const badge = settings.badges ? makeBadge(employer, result) : null;
    if (badge) placeBadge(employerEl, badge);
    rendered.set(employerEl, { key: keyOf(employer), card, badge, tier: result.tier });
    applyDim(card, result);
  }

  // --- popover ---------------------------------------------------------------------------------------------------

  let popover = null;

  function closePopover() {
    popover?.remove();
    popover = null;
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function reportLink(employer, result) {
    const body = [
      "Wrong match reported from the Netherlands Visa Sponsor Checker.",
      `Employer as shown: ${employer.name}`,
      `LinkedIn page: ${employer.slug || "-"}`,
      `Badge: ${result.tier}`,
      `Matched KvK: ${result.matches.map((match) => match.kvk).join(", ") || "-"}`,
      "",
      "What is wrong (optional):",
    ].join("\n");
    return `mailto:${REPORT_EMAIL}?subject=${encodeURIComponent(`Wrong sponsor match: ${employer.name}`)}&body=${encodeURIComponent(body)}`;
  }

  function openPopover(anchor, employer, result) {
    closePopover();
    popover = element("div", "werkcv-sp-popover");
    popover.setAttribute("role", "dialog");
    popover.append(element("p", `werkcv-sp-popover__title werkcv-sp-popover__title--${result.tier}`, t(`title_${result.tier}`)));
    popover.append(element("p", "werkcv-sp-popover__employer", employer.name));

    if (result.matches.length) {
      const list = element("ul", "werkcv-sp-popover__list");
      for (const match of result.matches) {
        const item = element("li");
        item.append(element("span", "werkcv-sp-popover__legal", match.name), element("span", "werkcv-sp-popover__kvk", `KvK ${match.kvk}`));
        list.append(item);
      }
      popover.append(list);
      if (result.total > result.matches.length) popover.append(element("p", "werkcv-sp-popover__more", t("moreEntities", [String(result.total - result.matches.length)])));
    }

    popover.append(element("p", "werkcv-sp-popover__note", t(`note_${result.tier}`)));

    const links = element("p", "werkcv-sp-popover__links");
    const search = element("a", null, t("searchRegister"));
    search.href = IND_REGISTER_URL;
    search.target = "_blank";
    search.rel = "noopener";
    const report = element("a", null, t("reportWrong"));
    report.href = reportLink(employer, result);
    links.append(search, document.createTextNode(" · "), report);
    popover.append(links);
    if (config.registerDate) popover.append(element("p", "werkcv-sp-popover__date", t("registerDate", [config.registerDate])));

    document.body.append(popover);
    const rect = anchor.getBoundingClientRect();
    const width = popover.offsetWidth;
    popover.style.left = `${Math.max(8, Math.min(window.innerWidth - width - 8, rect.left))}px`;
    const below = rect.bottom + 6;
    popover.style.top = below + popover.offsetHeight > window.innerHeight - 8 ? `${Math.max(8, rect.top - popover.offsetHeight - 6)}px` : `${below}px`;
  }

  document.addEventListener("click", (event) => {
    if (popover && !popover.contains(event.target)) closePopover();
  }, true);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePopover();
  });
  window.addEventListener("scroll", closePopover, { passive: true, capture: true });

  // --- scanning --------------------------------------------------------------------------------------------------

  function queue(employerEl, card, employer) {
    const key = keyOf(employer);
    const known = results.get(key);
    if (known) return render(employerEl, card, employer, known);
    const entry = waiting.get(key) || { employer, targets: new Set() };
    entry.targets.add({ employerEl, card });
    waiting.set(key, entry);
  }

  async function flush() {
    if (!waiting.size) return;
    const batch = Array.from(waiting.values());
    waiting.clear();
    const response = await send({ type: "match", employers: batch.map((entry) => entry.employer) });
    if (!response?.results) return;
    config = { registerDate: response.registerDate, thresholds: response.thresholds, selectors: response.selectors };
    batch.forEach((entry, index) => {
      const result = response.results[index];
      results.set(keyOf(entry.employer), result);
      for (const { employerEl, card } of entry.targets) if (employerEl.isConnected) render(employerEl, card, entry.employer, result);
    });
  }

  function scanCards() {
    const cardSelectors = selectorsFor("cards");
    const employerSelectors = selectorsFor("cardEmployer");
    if (!cardSelectors.length) return 0;
    for (const employerEl of rendered.keys()) if (!employerEl.isConnected) rendered.delete(employerEl);
    // Outer cards come first in document order, so the innermost card that holds the employer wins.
    const owners = new Map();
    for (const card of document.querySelectorAll(cardSelectors.join(","))) {
      if (card.closest(".werkcv-sp-card, .werkcv-sp-popover")) continue;
      const employerEl = first(card, employerSelectors);
      if (employerEl) owners.set(employerEl, card);
    }
    for (const [employerEl, card] of owners) {
      const name = employerName(employerEl);
      if (name.length < 2) continue;
      queue(employerEl, card, { name, slug: slugFrom(employerEl, card) });
    }
    return owners.size;
  }

  function checkLayout(found) {
    if (found || layoutMissReported || !adapter.isResultsPage?.()) return;
    if (document.querySelectorAll(adapter.jobLinkSelector).length >= 3) {
      layoutMissReported = true;
      send({ type: "layoutMiss", site: adapter.site });
    }
  }

  async function scan() {
    scanTimer = null;
    if (contextGone || !adapter.isJobPage()) return;
    const found = scanCards();
    await flush();
    checkLayout(found);
    await renderDetail();
  }

  function schedule() {
    if (scanTimer || contextGone) return;
    scanTimer = setTimeout(scan, SCAN_DELAY_MS);
  }

  // --- detail card -----------------------------------------------------------------------------------------------

  async function renderDetail() {
    const description = first(document, selectorsFor("detailDescription"));
    const employerEl = first(document, selectorsFor("detailEmployer"));
    const name = employerEl ? employerName(employerEl) : adapter.employerFromStructuredData?.() || "";
    const existing = document.querySelector(".werkcv-sp-card");
    if (!description || name.length < 2) {
      existing?.remove();
      detailKey = null;
      return;
    }
    const employer = { name, slug: slugFrom(employerEl) };
    const salaryText = selectorsFor("detailSalary").map((selector) => document.querySelector(selector)).filter(Boolean).map((element) => textOf(element, 1000)).join(" ");
    const jobText = textOf(description, 12000).slice(0, 12000);
    const key = `${adapter.jobKey?.() || ""}|${keyOf(employer)}|${jobText.length}|${settings.route}`;
    if (existing && detailKey === key && existing.isConnected && existing.nextElementSibling === description) return;

    let result = results.get(keyOf(employer));
    if (!result) {
      const response = await send({ type: "match", employers: [employer] });
      result = response?.results?.[0];
      if (!result) return;
      config = { registerDate: response.registerDate, thresholds: response.thresholds, selectors: response.selectors };
      results.set(keyOf(employer), result);
    }

    const card = element("section", "werkcv-sp-card");
    card.setAttribute("aria-label", t("cardLabel"));
    const head = element("div", "werkcv-sp-card__row");
    head.append(makeBadge(employer, result), element("span", "werkcv-sp-card__text", WerkcvSponsorLines.sponsorSummary(employer, result)));
    card.append(head);
    const { salaryLine, dutchLine } = WerkcvSponsorLines;
    for (const line of [salaryLine(`${salaryText} ${jobText.slice(0, 6000)}`, config.thresholds, settings.route), dutchLine(jobText)]) {
      if (!line) continue;
      const row = element("div", `werkcv-sp-card__row werkcv-sp-card__row--${line.tone}`);
      row.append(element("span", "werkcv-sp-card__dot"), element("span", "werkcv-sp-card__text", line.text));
      card.append(row);
    }
    card.append(element("p", "werkcv-sp-card__foot", t("cardFoot", [t(`route_${settings.route}`)])));

    existing?.remove();
    description.parentElement?.insertBefore(card, description);
    detailKey = key;
  }

  // --- settings and popup ----------------------------------------------------------------------------------------

  function rerender() {
    for (const [employerEl, entry] of rendered) {
      entry.badge?.remove();
      entry.card?.classList.remove("werkcv-sp-dim");
      rendered.delete(employerEl);
    }
    document.querySelector(".werkcv-sp-card")?.remove();
    detailKey = null;
    schedule();
  }

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;
    let changed = false;
    for (const key of Object.keys(DEFAULT_SETTINGS)) {
      if (changes[key]) {
        settings[key] = changes[key].newValue ?? DEFAULT_SETTINGS[key];
        changed = true;
      }
    }
    if (changed) rerender();
  });

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type !== "summary") return;
    const tiers = { sponsor: 0, likely: 0, not_found: 0 };
    const seen = new Set();
    for (const [employerEl, entry] of rendered) {
      if (!employerEl.isConnected || seen.has(entry.key)) continue;
      seen.add(entry.key);
      tiers[entry.tier] += 1;
    }
    sendResponse({ site: adapter.site, onJobPage: adapter.isJobPage(), employers: seen.size, ...tiers, layoutMiss: layoutMissReported });
  });

  // --- start -----------------------------------------------------------------------------------------------------

  async function start(siteAdapter) {
    adapter = siteAdapter;
    settings = { ...DEFAULT_SETTINGS, ...(await chrome.storage.sync.get(DEFAULT_SETTINGS)) };
    const response = await send({ type: "config" });
    if (response) config = response;
    new MutationObserver((mutations) => {
      const ours = mutations.every((mutation) =>
        [...mutation.addedNodes, ...mutation.removedNodes].every((node) => node.nodeType === 1 && /\bwerkcv-sp-/.test(node.className || "")),
      );
      if (!ours) schedule();
    }).observe(document.body, { childList: true, subtree: true });
    schedule();
  }

  window.WerkcvSponsorContent = { start };
})();
