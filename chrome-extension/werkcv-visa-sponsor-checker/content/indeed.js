// Indeed Netherlands: search results, the job panel next to them and single job pages.

(() => {
  /** The employer from the job page's JobPosting structured data, when the visible header is missing. */
  function employerFromStructuredData() {
    for (const script of document.querySelectorAll("script[type='application/ld+json']")) {
      try {
        const data = JSON.parse(script.textContent || "");
        for (const item of [data, ...(Array.isArray(data?.["@graph"]) ? data["@graph"] : [])].flat()) {
          const name = item?.["@type"] === "JobPosting" ? item.hiringOrganization?.name : null;
          if (typeof name === "string" && name.trim()) return name.trim().slice(0, 120);
        }
      } catch {
        // Not JSON we can read; try the next block.
      }
    }
    return "";
  }

  WerkcvSponsorContent.start({
    site: "indeed",
    jobLinkSelector: "a[href*='/viewjob'], a[href*='/rc/clk'], a[data-jk]",
    isJobPage: () => /^\/(?:jobs|q-|viewjob|m\/|vacatures|rc\/)/.test(location.pathname) || location.pathname === "/",
    isResultsPage: () => /^\/(?:jobs|q-|vacatures)/.test(location.pathname),
    jobKey: () => new URLSearchParams(location.search).get("vjk") || new URLSearchParams(location.search).get("jk") || "",
    employerFromStructuredData,
  });
})();
