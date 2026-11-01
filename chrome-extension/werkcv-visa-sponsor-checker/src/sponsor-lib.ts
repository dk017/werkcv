// Entry for lib/sponsor.js, the one bundle the extension's service worker and popup load: the same matcher, salary
// and language checks as werkcv.nl, built from lib/sponsor by build.mjs. Exposed as globalThis.WerkcvSponsor.

import { employerIndexFromEntries, employerNameVariants, matchEmployer } from "../../../lib/sponsor/employer-match";
import { compareSalary, dutchRequirement, parseAdvertisedSalary } from "../../../lib/sponsor/job-signals";
import { kvkFromQuery, searchSponsors } from "../../../lib/sponsor/register";

const api = { employerIndexFromEntries, employerNameVariants, matchEmployer, searchSponsors, kvkFromQuery, parseAdvertisedSalary, compareSalary, dutchRequirement };

(globalThis as typeof globalThis & { WerkcvSponsor?: typeof api }).WerkcvSponsor = api;
