# Netherlands Visa Sponsor Checker: Chrome extension spec

Written 31 October 2026. Status: **v1 built 1 November 2026, not committed or uploaded.** Build notes are in §14; owner decisions in §12.

## 1. What we are building and why

A Chrome extension that marks, on LinkedIn and Indeed job listings, which Dutch employers are on the IND public register of recognised sponsors (erkende referenten). It also checks the advertised salary against the highly skilled migrant (kennismigrant) threshold. The audience is internationals looking for a sponsored job in the Netherlands. They are the same people who buy WerkCV's English, Dutch-format CV.

Why this one, from the 31 Oct Chrome Web Store analysis:

- **Proven demand.** UK sponsor checkers have 10,000 users each. The Dutch leader, KMatch, has 2,000. Google autocomplete suggests "visa sponsorship checker chrome extension", so people search the web for the extension itself.
- **Weak competition.** Only one Dutch competitor is maintained and has users. The others have 20–445 users, and three run on register data from Nov 2024, Nov 2025 and Jan 2026.
- **Easy to rank.** SponsorSpot is #1 for "kennismigrant" and "dutch sponsor" with 30 users.
- **The backend already exists.** `lib/sponsor/register.ts` parses and searches the IND register (13,020 entries, dated 5 Oct 2026). `/tools/kennismigrant-salary-checker` holds the thresholds.
- **It fits the free-levers rule.** The extension needs no AI and no paid spend.

## 2. Research findings

### 2.1 Competitors (Chrome Web Store, 31 Oct 2026)

| Extension | Users | Rating | Last update / data date | Sites | What stands out |
|---|---|---|---|---|---|
| KMatch – Dutch Sponsor Job Checker | 2,000 | 4.7 (22) | 13 Oct 2026 | LinkedIn, Indeed | **Google sign-in required** (identity permission, Firestore). Green highlight, list of jobs on the page in the popup, browse sponsors by city and industry, viewed-jobs tracking |
| LinkedIn Sponsorship Highlighter | 445 | 4.0 (4) | data 25 Nov 2024 | LinkedIn | The developer says badges break when LinkedIn changes class names |
| Visa Sponsorship Checker (Rish) | 207 | 5.0 (5) | 30 Jun 2026 | LinkedIn | UK + NL registers, green/red markers, popup summary, data refreshed from GitHub, 3.4 MB |
| HSM Visa Sponsor Checker | 82 | 5.0 (1) | data 2 Jan 2026 | LinkedIn | Hover tooltip with the matched legal name, KvK search in the popup |
| SponsorSpot | 30 | 5.0 (1) | 8 Nov 2025 | LinkedIn, Indeed | Offline, open source, **SP + EN (English job) badges**, alias mapping |
| IND Sponsor Check | 20 | 5.0 (1) | — | LinkedIn, Indeed, company sites | — |
| *UK benchmark:* UK Visa Sponsorship Checker | 10,000 | 4.6 (58) | 19 Oct 2026 | Any site | Visa counts per employer, "has this role been sponsored", personal salary thresholds, tracker, paid upgrades |
| *UK benchmark:* Ultimate UK Visa Sponsor Checker | 10,000 | 3.7 (9) | 4 May 2026 | LinkedIn, Indeed, Glassdoor | Several "doesn't work at all" reviews. One 5★ review: "Please do something like this for the Netherlands" |

What reviewers complain about (KMatch, Ultimate UK, LinkedIn Sponsorship Highlighter):

1. **Login failures:** "stuck at connecting to google", "Login Failed: Unknown Error", doesn't work in Brave.
2. **Slowness:** "The website (LinkedIn) becomes laggy with this extension".
3. **Missed big brands:** "big companies like ING bank and Action are not marked as sponsors … I can't trust this extension".
4. **Breakage:** "doesn't work at all" after LinkedIn updates.

What reviewers praise: screening companies "before I even apply", and (KMatch) spotting English-speaking, international employers.

Our position answers all four complaints: no account, local matching, brand-to-legal-name matching, and a LinkedIn layout that is monitored.

### 2.2 Store searches (what we need to beat)

| Query | Top results today (users) | Our target |
|---|---|---|
| kennismigrant | SponsorSpot (30); only 1 result | #1 |
| IND recognised sponsor | IND Sponsor Check (20), SponsorSpot (30), HSM (82); 3 results | #1 |
| highly skilled migrant | HSM (82), SponsorSpot (30), IND Sponsor Check (20) | #1 |
| dutch sponsor | SponsorSpot (30), KMatch (2,000), LinkedIn Sponsorship Highlighter (445) | top 3 |
| netherlands jobs | KMatch (2,000), SponsorSpot (30) | top 3 |
| linkedin dutch | LinkedIn Sponsorship Highlighter (445), KMatch (2,000) | top 3 |
| visa sponsor / visa sponsorship jobs | UK checkers (10,000); the first Dutch-only result is HSM at #9 | page 1, stretch |

Store search matches the summary and description as well as the name. KMatch ranks for "netherlands jobs" without those words in its name. Google's listing rules: name "clear, concise and distinct", no keyword stuffing, summary ≤ 132 characters. Ranking uses ratings and usage, including installs versus uninstalls over time.

### 2.3 Lessons from our own extensions

- **WerkCV Vacature Keyword Highlighter** (live since April, v0.1.0) has too few users for the store to show a count.
- **WorkCV UK "Tailor your CV"** (live 27 Jul) has 3 users. It includes a sponsor check, but only when the user clicks (`activeTab`), and its name leads with "Tailor your CV".

Conclusion: the sponsor check must be the headline, and the badges must appear on their own as the user scrolls. That is what the 2,000- and 10,000-user products do.

- The UK version 0.2.0 was **rejected as keyword spam** ("Yellow Argon") for a list of example terms in the description. Never put keyword or site lists in the copy.

### 2.4 Matching quality (the main risk)

**Test A.** 55 well-known employers through the production API: 33 listed, 15 possible, 7 not found.

**Test B.** 181 unique employers from public LinkedIn job cards (searches "english", "engineer", "data", "finance", "marketing", location Netherlands, 31 Oct), matched locally against the 5 Oct register:

| Result | Count | Spot check |
|---|---|---|
| listed (exact core name) | 49 (27%) | All correct |
| possible (prefix / contains) | 25 (14%) | About 20 are real (bol → Bol.com B.V., Optiver → Optiver Holding B.V., Gazelle → Koninklijke Gazelle N.V., de Bijenkorf → Magazijn "De Bijenkorf" B.V.). About 5 are wrong (Emerson → Emerson College, Edge, ACE, Monumental) |
| not found | 107 (59%) | Mostly genuine non-sponsors (recruiters, small firms). Retrying 37 of them with shortened names found about 16 more: Foot Locker EMEA → Foot Locker Europe B.V., ROCKWOOL Group → Rockwool B.V., Hewlett Packard Enterprise → Hewlett-Packard Nederland B.V., Lamb Weston EMEA → Lamb Weston B.V., NX GROUP (NIPPON EXPRESS GROUP) → Nippon Express (Nederland) B.V., Just Eat Takeaway.com → Takeaway.com Group B.V. |

Names that need a curated alias: Miro → RealtimeBoard, PwC → PricewaterhouseCoopers, AWS → Amazon Web Services EMEA SARL, Ayvens → LeasePlan, DSM-Firmenich → Koninklijke DSM, Elastic → elasticsearch B.V., ING → ING Bank N.V., Rabobank → Coöperatieve Rabobank U.A.

Conclusion: the current matcher is precise but finds only about 55–60% of the real sponsors in a LinkedIn feed. That is exactly the KMatch "ING not marked" complaint. Three fixes, all in §5: name variants, a likely tier, and curated aliases.

**Recognition is per legal entity.** A recognised sister company (Van Leeuwen Buizen Groep B.V. for "Van Leeuwen Stainless") does not mean the employing entity can sponsor. Badges and tooltips must say this.

### 2.5 Other facts

- **Salary thresholds** (IND, gross per month, excluding the 8% holiday allowance, 2026): 30 or over €5,942, under 30 €4,357, reduced criterion €3,122, EU Blue Card €5,942. The IND says they change every year on 1 January.

  *Side finding:* `/tools/kennismigrant-salary-checker` says "up to and including June 30, 2026". Check that copy.
- **Rate limit:** `/api/tools/sponsor-check` allows 60 requests per 10 minutes per IP. I hit it after about 70 lookups during this research. One LinkedIn results page has about 25 employers, so per-card API calls are not an option. The register has to live in the extension (about 500 KB as name + KvK JSON).
- **Employer on LinkedIn job cards:** the public job cards put the employer in a link to `/company/<slug>`, which is more stable than LinkedIn's class names. The slug is also a better alias key than the display name.

## 3. Goals and measures

| Measure | Target | When |
|---|---|---|
| Store rank for kennismigrant, IND recognised sponsor, highly skilled migrant | #1 | 4 weeks after publish |
| Store rank for dutch sponsor, netherlands jobs, linkedin dutch | top 3 | 6 weeks |
| Weekly users (developer dashboard) | 100 | 6 weeks |
| Weekly users | 500 | 15 Jan 2027 (job-search peak) |
| Ratings | ≥ 10, average ≥ 4.5 | 8 weeks |
| Popup → werkcv.nl visits (`utm_source=chrome_extension&utm_campaign=sponsor_checker`) | tracked; first sales attributed | review at 6 weeks |
| Matching on the labelled 181-employer set | green precision ≥ 98%; green + amber recall ≥ 85% | before submit |

**Stop rule:** fewer than 50 weekly users at 8 weeks means no further sites or features. Fix only what breaks.

Be honest about sales. Someone checking sponsors is early in the job search, so direct sales will be small at first. The extension is a free acquisition channel and a reason for expat pages to link to us.

## 4. Scope

**v1 (this build):**

1. **Badges on LinkedIn** job search results and the job detail panel, logged-in and logged-out, under `www.linkedin.com` and `nl.linkedin.com`.
2. **Badges on Indeed Netherlands** (`nl.indeed.com`) results and job pages.
3. **Detail-panel card:**
   - sponsor status with the matched legal names and KvK numbers;
   - salary check against the user's threshold, when the ad states a salary;
   - a "Dutch required?" flag from the job text.
4. **"Only sponsors" toggle** that dims non-sponsor job cards. This is a filter, not a hide, so the page never looks broken.
5. **Popup:**
   - summary of the page (jobs checked, sponsors found);
   - local register search by name or KvK;
   - settings: age bracket for the threshold, toggle, badges on/off;
   - register date;
   - "Report a wrong match";
   - one link to WerkCV's Dutch-format English CV.
6. **"Check this page"** button for any other job site (company career pages, IamExpat Jobs, Undutchables). It reads the JobPosting structured data on click via `activeTab`, reusing `job-capture.js` from the UK extension.
7. **Daily data refresh** from werkcv.nl, with the packaged snapshot as fallback.
8. **English UI with Dutch strings** (`_locales/en`, `_locales/nl`), including a Dutch store name and summary.

**Not in v1:**

- Glassdoor (v1.1 if users ask).
- Filtering LinkedIn by job language across the list. That stays a separate product decision; only the per-job "Dutch required?" flag ships now.
- Job tracker, viewed-jobs history, sponsors by city/industry (KMatch has these; none of the complaints are about them).
- Any AI, any account.
- History of how many people an employer has sponsored. The Dutch register only lists name and KvK; monthly snapshots from `SponsorRegisterSnapshot` could later show "recognised since" or "new this month".

## 5. How it works

### 5.1 Data

New route `GET /api/sponsor-register/extension` returns:

```json
{ "version": 1, "registerDate": "2026-10-05", "generatedAt": "…",
  "entries": [["Booking.com B.V.", "<kvk>"], …],
  "aliases": { "slug:ing": ["<kvk of ING Bank N.V.>"], "name:pwc": ["<kvk>", …] },
  "thresholds": { "2026": { "hsm30": 5942, "hsmUnder30": 4357, "reduced": 3122, "blueCard": 5942 } } }
```

- Built from `getSponsorRegister()`. Aliases live in a new `lib/sponsor/aliases.ts`; thresholds in a new `lib/sponsor/thresholds.ts`, which the salary-checker page should then read too.
- Headers: gzip, `ETag`, `Cache-Control: public, max-age=86400`. No rate limit needed (one request per install per day, cacheable).
- The extension refreshes with `chrome.alarms` once a day, sending `If-None-Match`. Only the data file is fetched, never code, which keeps us inside the Manifest V3 remote-code rule.
- The packaged copy is generated at build time. If a refresh fails or returns fewer than `MIN_ENTRIES`, the extension keeps its last good copy.

### 5.2 Matching (one matcher for site and extension)

- Extend `lib/sponsor/register.ts` and bundle it into the extension with esbuild (already in `node_modules`), so the web checker and the extension always agree.
- **`employerNameVariants(name)`** (new). Try, in order:
  1. the name as shown;
  2. without trailing words that are generic on LinkedIn (EMEA, Europe, Benelux, NL, Netherlands, Group, Corporation, Company, Inc, International, Global) and without leading Royal / Koninklijke / Coöperatieve;
  3. the text in brackets ("NX GROUP (NIPPON EXPRESS GROUP)" → "Nippon Express").

  The web checker gets these variants too.
- **Order of checks:**
  1. LinkedIn slug alias;
  2. name alias;
  3. exact core name on any variant;
  4. prefix match on any variant;
  5. contains match.
- **Speed.** Build an index from first word to entries at load time. Cache results per employer name per page. Match only new cards (debounced `MutationObserver`). Target < 2 ms per card and no visible scroll lag on a 25-card page. Test this against the KMatch "laggy" complaint before submitting.

### 5.3 Badges (wording matters)

| Tier | When | Badge | Tooltip |
|---|---|---|---|
| Sponsor | exact name or alias | green "IND sponsor" | legal name(s), KvK, register date, "Check which entity employs you in the offer" |
| Likely | prefix/contains, or one-word brand | amber "Sponsor (check entity)" | the candidate legal names; "A related company is recognised. Recognition is per legal entity." |
| Not found | none | small grey "Not on IND list" | "Not found under this name. Brand and legal names can differ. Search the register" (opens the popup search) |

- Never show red or "not a sponsor". The register lists legal names, and a false "no" costs someone an application.
- The salary line in the detail card reads "Advertised €4,500/month: above the €4,357 under-30 threshold". When the ad gives a yearly figure, say it is unclear whether it includes holiday allowance. With no salary, show nothing.
- **"Dutch required?":** a local check of the job text for Dutch-language phrases ("vloeiend Nederlands", "Dutch is a must", "Nederlandse taal vereist") and for a description written mainly in Dutch. Show "Dutch likely required" or "Written in English, no Dutch requirement found". Never a certainty.

### 5.4 Reading the job sites

- **LinkedIn.** Anchor on links to `/company/<slug>` inside job cards and the detail top card, not on class names. Fall back to the card's subtitle line.
- **Indeed.** Read the employer from the card's company element and from `JobPosting.hiringOrganization` on job pages.
- **Selectors as packaged data** (a JSON of CSS selectors per site). They can be refreshed with the daily data file, so a LinkedIn layout change can be fixed without a store review.
  - This is data, not code. Keep it to plain selector strings.
  - Packaged defaults always ship.
  - If a reviewer objects, drop the remote part and ship selectors only in updates.
- **Self-check.** If a jobs page with results yields zero employers, the popup says "LinkedIn changed its layout. We are on it" and sends a count-only `layout_miss {site}` ping. That ping is the only telemetry from job sites, and the privacy page states it.
- **Canary.** A daily owner-side script (`werkcv-qa/sponsor-ext-canary.cjs`) loads one public LinkedIn job search and one Indeed NL search and checks that employers are extracted. Logged-in LinkedIn differs, so it also gets a manual check in the owner's Chrome after each release.

## 6. Privacy and permissions

| Permission | Why |
|---|---|
| `storage` | settings and the register copy |
| `alarms` | daily data refresh |
| host: `https://www.linkedin.com/*`, `https://nl.linkedin.com/*`, `https://nl.indeed.com/*` | show badges as the user browses jobs (content scripts on job paths only) |
| host: `https://werkcv.nl/*` | download the register data file |
| `activeTab`, `scripting` | "Check this page" on other job sites, only on click |

- **No lookups leave the browser.** No account, no analytics on job pages (except the `layout_miss` count), no browsing history.
- **"Report a wrong match"** sends only the employer display name, slug and matched KvK, and only after the user clicks.
- Host permissions bring a longer in-depth review. Plan for several days.
- Support and privacy pages: `/en/chrome/visa-sponsor-checker` and `/en/chrome/visa-sponsor-checker/privacy`, following the existing highlighter's pages.

**Store rules we must respect:**
- No promotion inside LinkedIn or Indeed pages; ad-injection rules forbid it. WerkCV links live only in the popup and on the welcome page.
- No incentive for reviews.
- No keyword or site lists in the copy.
- Single purpose: "Show whether a job in the Netherlands is open to international applicants: the employer's IND recognised-sponsor status, the salary threshold and the Dutch-language requirement."

## 7. Store listing

- **Name (en):** `Netherlands Visa Sponsor Checker – IND Recognised Sponsors` (58 characters). No "LinkedIn" in the name, because of trademark and impersonation rules. Brand "WerkCV" goes in the developer name and the description, not the title.
- **Name (nl):** `Erkend referent check – kennismigrant visum Nederland`.
- **Summary (en, ≤ 132):** "See which Dutch employers are IND recognised sponsors for the highly skilled migrant (kennismigrant) visa, right on job ads." (~123 characters)
- **Description:**
  - one overview paragraph in plain prose, naming LinkedIn and Indeed once in a sentence;
  - a short feature list: badges, entity check, salary threshold, Dutch requirement, no account, local matching, daily register update;
  - an honest-limits paragraph (legal names, recognition per entity, always confirm with the IND).
  - No keyword lists.
- **Screenshots (5, 1280×800):**
  1. badges on a LinkedIn results page;
  2. detail card with sponsor, salary and Dutch flag;
  3. amber "check entity" tooltip;
  4. popup search by name or KvK;
  5. "no account, nothing sent" privacy panel.

  Plus a 440×280 small tile.
- **Category:** Productivity → Tools. Check what KMatch uses when submitting.
- **On install:** open `werkcv.nl/en/chrome/visa-sponsor-checker/welcome`. It counts installs in our analytics, explains the badges, and has the CV call to action. Set an uninstall URL to a one-question "why did you remove it?" page.
- **Ratings prompt:** once, in the popup, after the user has seen sponsor badges on 3 different days. A plain "Rate it on the Chrome Web Store" link, no incentive.

## 8. Free promotion

- "Add to Chrome" calls to action on `/en/netherlands-visa-sponsor-checker`, `/en/netherlands-visa-sponsor-list` (all letter pages), `/erkende-referenten-lijst`, `/tools/kennismigrant-salary-checker`, `/en/highly-skilled-migrant-cv-netherlands` and `/en/expat-cv-netherlands`.

  These pages earn about 1,000 sponsor-query impressions per 90 days at position ~45. The store listing can rank in Google where the pages don't yet.
- A public GitHub repo, like `dk017/werkcv-mcp`. SponsorSpot uses "open source" as a trust signal.
- A launch post in r/Netherlands, r/expats, the IamExpat forum and a LinkedIn post, from the owner's accounts. A plain announcement with no review requests.
- The register's monthly update can become a short "new recognised sponsors this month" post using the snapshots. That would be its own feature, later.

## 9. Files (planned)

```
chrome-extension/werkcv-visa-sponsor-checker/
  manifest.json, _locales/{en,nl}/messages.json
  background.js        data refresh (alarms), install/uninstall URLs
  content-linkedin.js  content-indeed.js  badges.css
  matcher.js           built from lib/sponsor/register.ts (esbuild)
  popup.html/.js/.css
  data/register.json   generated at build
  build.mjs            bundles matcher + data, writes the upload zip
  STORE-LISTING.md     README.md  store-assets/
app/api/sponsor-register/extension/route.ts
lib/sponsor/aliases.ts (+ test)   lib/sponsor/thresholds.ts
lib/sponsor/register.ts           employerNameVariants + tests
app/en/chrome/visa-sponsor-checker/{page,privacy/page,welcome/page}.tsx
werkcv-qa/sponsor-ext-canary.cjs  werkcv-qa/sponsor-ext-golden.json (labelled 181 employers)
```

## 10. Testing

- **Unit tests** for name variants, aliases, the tier rules and the salary parser (monthly, yearly, ranges, "€4.500 – €5.500 per maand", hourly → unclear).
- **Golden set:** label the 181 employers (sponsor yes/no, entity) and enforce the §3 targets in the test.
- **Saved-page fixtures** for LinkedIn (logged-in list, logged-in detail, logged-out) and Indeed NL. A content-script test that the employers are found.
- **Manual pass** in the owner's Chrome while logged in to LinkedIn: scroll 3 result pages, open 10 jobs, toggle "only sponsors", use the popup search. Measure scroll smoothness with the extension on and off.
- **Brave and Edge smoke test** (the KMatch Brave complaint).

## 11. Plan

| Day | Work |
|---|---|
| 1 | Name variants + tier rules in `register.ts`, aliases (top 300 LinkedIn NL employers, reviewed by hand), thresholds module, golden-set test |
| 2 | Data route, extension build script, matcher bundle, background refresh |
| 3 | LinkedIn content script, badges, detail card, toggle |
| 4 | Indeed content script, popup, "Check this page", locales |
| 5 | Support/privacy/welcome pages, screenshots, listing copy, manual pass, upload |

Review then takes a few days. If we submit in the week of 3 Nov, it is live well before the January peak. Reviews of the measures: 2 weeks and 6 weeks after publish.

## 12. Owner decisions

1. **Developer account and trader status.** Publish from the account that holds the keyword highlighter. As a business selling CVs, WerkCV should probably declare itself a *trader* under the EU Digital Services Act; that shows a business address on the listing. Your call.
2. **Open source repo:** yes or no (recommended: yes).
3. **The old keyword highlighter:** leave it as it is (recommended), or retire it later.
4. **Launch posts** from your Reddit and LinkedIn accounts.

## 13. Risks

| Risk | Mitigation |
|---|---|
| LinkedIn changes its layout and badges vanish | Anchor on company links, selector data refresh, self-check notice, daily canary |
| False "not found" costs an application | Grey "not found under this name" wording, popup search, entity tooltip, link to the IND register |
| Store rejection (keyword spam, host permissions, single purpose) | No keyword lists, single-purpose statement in §6, narrow job-path content scripts, permission justifications |
| IND changes the register page | `parseIndRegisterHtml` throws on a changed header; the server and extension keep the last good copy |
| KMatch adds a no-login mode | Our edge then rests on match quality, salary and Dutch flags, and fresher data. Keep the golden set honest |
| Little direct revenue | The goal is a free channel. Judge at 6 weeks by weekly users and popup → site visits, then decide on more |

## 14. Build notes (1 November 2026)

Built in `chrome-extension/werkcv-visa-sponsor-checker/` (see its README) plus `lib/sponsor/{employer-match,aliases,thresholds,job-signals,extension-data,extension-selectors}.ts`, `app/api/sponsor-register/extension/` (data file and events), and `app/en/chrome/visa-sponsor-checker/` (support, privacy, welcome, removed).

**Matching results** (`npm run test:sponsor`, golden set in `lib/sponsor/fixtures/linkedin-employers-golden.json`):

| Set | Employers | Real sponsors | Green precision | Green + amber recall |
|---|---|---|---|---|
| Tuning (31 Oct sample, rules shaped on it) | 181 | 91 | 100% | 100% |
| Holdout (1 Nov sample, labelled before the last two rule changes) | 124 | 64 | 98.1% (52 of 53) before the fix, 100% after | 95.3% before, 96.9% after |

The tuning numbers are optimistic by construction; the holdout's first run is the honest one. Amber is noisier: about 1 in 4 amber badges points to an unrelated company with a similar name (Extreme Networks for "extreme cashmere"). The popover lists the legal names, so the user can see it.

**Checked live:** the content script on the public LinkedIn search (56 employers, one batched lookup, badges inline, the badge takes clicks without opening the job, job card above the description), Indeed NL result cards (16 employers) and the newer Indeed job panel (employer, text, salary). Not checked: logged-in LinkedIn, the popup, "Check this page", the refresh alarm in a real install. These need the manual pass in §10.

**Changes from the spec:**

- The amber badge reads "Possible sponsor", not "Sponsor (check entity)": the same meaning, and shorter.
- LinkedIn content scripts match the whole site and act only on `/jobs` paths. LinkedIn is a single-page app, so a script limited to `/jobs/*` would not load when someone navigates there from the feed.
- No host permission for werkcv.nl: the data route sends `Access-Control-Allow-Origin: *`, so the service worker can fetch it without one.
- "Report a wrong match" opens an email draft rather than posting to an endpoint.
- The canary lives in the extension folder (`canary.mjs`) and checks LinkedIn only; Indeed answers scripted requests with 403.
- The web checker (`/api/tools/sponsor-check`) now uses the same matcher, so "ING" and "PwC" are "listed" there too.
- Aliases: 35 brands (not 300). Add more from "Report a wrong match" emails.

**Not done yet:** store screenshots and tile, the manual pass, upload, the "Add to Chrome" buttons on the sponsor pages (they appear once `SPONSOR_EXTENSION_STORE_URL` is set), launch posts.

