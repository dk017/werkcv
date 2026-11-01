# Netherlands Visa Sponsor Checker

Chrome extension that marks which employers on LinkedIn and Indeed Netherlands are on the IND public register of
recognised sponsors (erkende referenten), compares the advertised salary with the highly skilled migrant threshold, and
flags adverts that ask for Dutch. Spec: `docs/product/2026-10-31-nl-visa-sponsor-checker-extension-spec.md`.

## Load it locally

1. Open `chrome://extensions` and turn on Developer mode.
2. Click Load unpacked and pick this folder. The bundle (`lib/sponsor.js`) and the register (`data/register.json`) are
   committed, so no build is needed.
3. Open a job search on LinkedIn or `nl.indeed.com`.

## How it fits together

| File | Role |
|---|---|
| `background.js` | Service worker. Holds the register, answers lookups from the content scripts and the popup, refreshes `data/register.json` from `https://werkcv.nl/api/sponsor-register/extension` once a day (data only, never code). |
| `content/common.js` | Finds job cards, asks the service worker for matches in one batch, draws badges, the popover and the card above the open job. |
| `content/linkedin.js`, `content/indeed.js` | Per-site settings: which paths are job pages, how to read the job id. |
| `shared/lines.js` | The sentences for sponsor status, salary and Dutch requirement, shared by the job card and the popup. |
| `popup.*` | Page summary, register search, settings, "Check this page" for other job sites. |
| `check-page.js` | Injected on click (`activeTab`): reads the page's JobPosting structured data. |
| `lib/sponsor.js` | Generated from `lib/sponsor/` in the repository: the same matcher, salary and language checks as werkcv.nl. |
| `data/register.json` | Generated: register entries, brand aliases, salary thresholds and the CSS selectors per site. |

The matching rules, aliases, thresholds and selectors live in the main repository under `lib/sponsor/`:

- `employer-match.ts`: tiers (sponsor, likely, not found) and name variants.
- `aliases.ts`: brands whose legal name differs (PwC, KLM, Ayvens…), keyed by KvK number.
- `thresholds.ts`: IND salary criteria per year. Add the new year every January.
- `extension-selectors.ts`: where to find employers on each site. A change here reaches installed extensions with the
  next daily data refresh after deploy, without a store review.

## Build

```bash
npm run build:sponsor-extension
```

Fetches the IND page, writes `lib/sponsor.js` and `data/register.json`, and writes the upload zip to `dist/`. Options:
`--ind <saved page.html>` to use a saved copy, `--no-data` to keep the current data file, `--icons` to redraw the PNG
icons from `icons/icon.svg`.

## Test

```bash
npm run test:sponsor
```

Includes the golden set (`lib/sponsor/fixtures/linkedin-employers-golden.json`): 305 employers from public LinkedIn job
cards, labelled by hand. The test fails when green-badge precision drops below 98% or green-plus-amber recall below 85%,
and when an alias KvK number disappears from the register.

```bash
node chrome-extension/werkcv-visa-sponsor-checker/canary.mjs
```

Checks that LinkedIn's public job search still yields employers with the current selectors. Indeed and logged-in
LinkedIn need a manual check after each release.

## Release checklist

1. `npm run test:sponsor`, then `npm run build:sponsor-extension`.
2. Bump `version` in `manifest.json` and rebuild, so the zip carries the new number.
3. Load the folder unpacked and do the manual pass: logged-in LinkedIn (scroll three result pages, open ten jobs, toggle
   "Only sponsors", search in the popup), logged-out LinkedIn, Indeed results and job panel, and "Check this page" on a
   company career page. Compare scrolling with the extension on and off.
4. Upload `dist/werkcv-visa-sponsor-checker-<version>.zip` in the Chrome Web Store developer dashboard. Listing copy is
   in `STORE-LISTING.md`.
5. After publishing, set `SPONSOR_EXTENSION_STORE_URL` in `lib/sponsor/links.ts` so the site shows "Add to Chrome".
