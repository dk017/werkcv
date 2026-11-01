// The sentences shown for one job, shared by the job card on LinkedIn and Indeed and by the popup's "Check this page":
// sponsor status, the salary against the chosen IND threshold, and the Dutch-language requirement. Needs lib/sponsor.js.

(() => {
  const t = (key, subs) => chrome.i18n.getMessage(key, subs) || key;
  const euro = (amount) => `€${Math.round(amount).toLocaleString("en-US")}`;
  const range = (min, max) => (min === max ? euro(min) : `${euro(min)}–${euro(max)}`);

  /** This year's amounts, or the latest year known when the IND has not published a newer one yet. */
  function currentAmounts(thresholds) {
    const year = String(new Date().getFullYear());
    const years = Object.keys(thresholds || {}).sort();
    const pick = years.filter((candidate) => candidate <= year).pop() || years[0];
    return pick ? thresholds[pick] : null;
  }

  function salaryLine(text, thresholds, route) {
    const salary = WerkcvSponsor.parseAdvertisedSalary(text);
    const amounts = currentAmounts(thresholds);
    if (!salary || !amounts) return null;
    const threshold = amounts[route] ?? amounts.hsm30;
    const verdict = WerkcvSponsor.compareSalary(salary, threshold);
    const routeName = t(`route_${route}`);
    const shown = `${range(salary.min, salary.max)}${t(`per_${salary.period}`)}`;
    if (salary.period === "hour") return { tone: "neutral", text: t("salaryHourly", [shown, euro(threshold), routeName]) };
    const monthly = verdict.yearly ? ` (≈ ${range(verdict.monthlyMin, verdict.monthlyMax)}${t("per_month")})` : "";
    const key = { above: "salaryAbove", below: "salaryBelow", range: "salaryRange", unclear: "salaryUnclear" }[verdict.verdict];
    const tone = { above: "good", below: "warn", range: "neutral", unclear: "neutral" }[verdict.verdict];
    const line = t(key, [`${shown}${monthly}`, euro(threshold), routeName]);
    return { tone, text: verdict.yearly && verdict.verdict !== "unclear" ? `${line} ${t("salaryYearlyNote")}` : line };
  }

  function dutchLine(text) {
    const result = WerkcvSponsor.dutchRequirement(text);
    if (result.level === "required") return { tone: "warn", text: t("dutchRequired", [result.evidence || ""]) };
    if (result.level === "plus") return { tone: "neutral", text: t("dutchPlus") };
    if (result.level === "not_required") return { tone: "good", text: t("dutchNotRequired") };
    if (result.writtenIn === "en") return { tone: "good", text: t("dutchNoneFoundEnglish") };
    if (result.writtenIn === "nl") return { tone: "warn", text: t("dutchWrittenInDutch") };
    return null;
  }

  function sponsorSummary(employer, result) {
    const legal = result.matches.slice(0, 2).map((match) => match.name).join(", ");
    if (result.tier === "sponsor") return t("summarySponsor", [legal]);
    if (result.tier === "likely") return t("summaryLikely", [legal]);
    return t("summaryNotFound", [employer.name]);
  }

  globalThis.WerkcvSponsorLines = { salaryLine, dutchLine, sponsorSummary };
})();
