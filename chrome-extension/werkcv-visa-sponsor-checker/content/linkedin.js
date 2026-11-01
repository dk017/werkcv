// LinkedIn: job search results, the job detail panel and single job pages, logged in and logged out. LinkedIn is a
// single-page app, so the script runs on the whole site and only acts on job pages.

(() => {
  WerkcvSponsorContent.start({
    site: "linkedin",
    jobLinkSelector: "a[href*='/jobs/view/'], [role='button'][componentkey^='job-card-component-ref-']",
    isJobPage: () => /^\/(?:jobs|comm\/jobs)(?:\/|$)/.test(location.pathname),
    isResultsPage: () => /^\/jobs\/(?:search|collections|search-results)/.test(location.pathname),
    jobKey: () => new URLSearchParams(location.search).get("currentJobId") || (/\/jobs\/view\/[^/]*?(\d{6,})/.exec(location.pathname) || [])[1] || "",
  });
})();
