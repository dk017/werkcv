// Where the Chrome extension finds job cards, employer names and job text on each site: plain CSS selector strings,
// tried in order. They ship in the extension and arrive again with the daily data file, so a LinkedIn or Indeed layout
// change can be fixed without waiting for a store review. Prefer attributes and links (/company/<slug>) over class
// names, which change more often.

export type SiteSelectors = {
  /** A job in a results list. Nested matches are fine: the innermost card that holds an employer is used. */
  cards: string[];
  /** The employer name inside a card. */
  cardEmployer: string[];
  /** The employer on the open job (detail panel or job page). */
  detailEmployer: string[];
  /** The job text on the open job; the detail card is placed above it. */
  detailDescription: string[];
  /** Where the open job shows its salary, if anywhere outside the job text. */
  detailSalary: string[];
};

export const SITE_SELECTORS: Record<"linkedin" | "indeed", SiteSelectors> = {
  // Two LinkedIn layouts are live: the classic one and the rewrite on /jobs/search-results (checked logged in,
  // 1 Nov 2026), which has hashed class names and no company link in its cards. In the rewrite the employer is the
  // first paragraph of the card after the title, which is the paragraph that holds an aria-hidden copy of the title.
  linkedin: {
    cards: [
      "[componentkey^='job-card-component-ref-']",
      "li[data-occludable-job-id]",
      "[data-job-id]",
      "div.job-card-container",
      "div.base-search-card",
      "div.base-card",
      "li.jobs-search-results__list-item",
      "li.scaffold-layout__list-item",
      "[data-view-name='job-card']",
    ],
    cardEmployer: [
      "a[href*='/company/']",
      ".artdeco-entity-lockup__subtitle",
      ".job-card-container__primary-description",
      ".job-card-container__company-name",
      ".base-search-card__subtitle",
      "p:not(:has(span[aria-hidden='true']))",
    ],
    detailEmployer: [
      ".job-details-jobs-unified-top-card__company-name a[href*='/company/']",
      ".job-details-jobs-unified-top-card__company-name",
      ".jobs-unified-top-card__company-name a[href*='/company/']",
      ".jobs-unified-top-card__company-name",
      "a.topcard__org-name-link",
      ".top-card-layout__card a[href*='/company/']",
      "[data-view-name='job-details-company-name'] a[href*='/company/']",
      "[aria-label^='Company, '] a[href*='/company/']",
      "a[componentkey^='auto-binding'][href*='/company/']",
    ],
    detailDescription: [
      "#job-details",
      ".jobs-description__content",
      ".jobs-description-content__text",
      ".show-more-less-html__markup",
      ".description__text",
      "[data-testid='expandable-text-box']:not([componentkey^='JobDetails_AboutTheCompany'] *)",
    ],
    detailSalary: [
      ".job-details-fit-level-preferences",
      ".job-details-jobs-unified-top-card__job-insight",
      ".compensation__salary",
      ".salary",
    ],
  },
  indeed: {
    cards: ["div.job_seen_beacon", "[data-jk]", "li div.cardOutline", "td.resultContent"],
    cardEmployer: ["[data-testid='company-name']", ".companyName", "[data-testid='companyName']"],
    // Two job-panel layouts are live at Indeed: the newer one (data-testid "company-info-metadata", checked
    // 1 Nov 2026) and the classic one.
    detailEmployer: [
      "[data-testid='company-info-metadata'] a[href*='/cmp/']",
      "[data-testid='inlineHeader-companyName'] a",
      "[data-testid='inlineHeader-companyName']",
      "[data-company-name='true']",
      ".jobsearch-CompanyInfoContainer a",
      ".jobsearch-InlineCompanyRating div",
    ],
    detailDescription: [".simple-job-description-html", "#jobDescriptionText", ".jobsearch-jobDescriptionText", "[data-testid='jobsearch-JobComponent-description']"],
    detailSalary: ["[data-testid='structured-job-summary']", "#salaryInfoAndJobType", "[data-testid='jobsearch-OtherJobDetailsContainer']", "#jobDetailsSection"],
  },
};
