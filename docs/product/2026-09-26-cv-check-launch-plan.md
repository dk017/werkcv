# CV-check launch plan (week 5)

Date: 26 September 2026. Sources: Search Console export (24 Jun–23 Sep), read-only production queries (`AnalyticsEvent`, `Order`, last 120 days), live Bing NL results fetched today, competitor pages fetched today. Week 4 (editor handoff) was dropped by decision on 26 Sep: the check keeps a plain link to the editor.

## 1. Baseline: what the old pages bring today

| Page | Google clicks / impressions (3 mo) | Avg. position | AI-features impressions | Landings (120 d) | Paid orders (first touch, all time) |
|---|---:|---:|---:|---:|---:|
| `/tools/ats-cv-checker` | 14 / 436 | 10,4 | 51 | 31 | 0 |
| `/en/dutch-cv-checker` | 9 / 86 | 7,1 | 19 | 22 | 0 |
| `/en/resume-optimizer-netherlands` | 7 / 260 | 6,1 | 42 | 18 | **2** |
| `/tools/cv-score` | 3 / 72 | 5,1 | 21 | 12 | 0 |
| `/cv-nakijken` | 3 / 198 | 18,8 | 30 | 9 | 0 |
| `/tools/cv-vacature-match` | 2 / 107 | 7,2 | 10 | 4 | 0 |
| `/en/cv-job-match-checker` | 2 / 32 | 12,5 | 7 | 4 | 0 |
| `/cv-checken` | 0 / 25 | 17,3 | 3 | 8 | 0 |
| **Total** | **40 / 1.216** | | **183** | **108** | **2** |

Queries to watch (Google, 3 months): "ats checker" 124 impr. at 8,9 · "cv check" 56 at 27,1 · "ats cv checker" 33 at 6,0 · "cv verbeteren" 84 at 62,6 · "ats-vriendelijke cv" 29 at 18,3.

**Reading:** the old pages carry little traffic (about 1 landing a day in total), so the redirect risk is small in absolute terms. The upside is one strong page for a growing query set instead of eight weak ones.

Bing NL today: WerkCV ranks **#1 for "cv vergelijken met vacature"** (`/tools/cv-vacature-match`) and **#4 for "cv laten checken"** (`/cv-nakijken`). The vacancy page must keep that intent in its title.

## 2. Competitors with the same promise

Two Dutch tools now say "gratis, zonder account", like we do:

- **aicvchecker.nl** (AI Loopbaan Solutions, Steenwijk): PDF/Word/paste, score with explanation, vacancy match at `/match`, "cv niet bewaard", emails results, paid tiers.
- **maakeencv.nl/cv-check**: PDF only, rule counts per category ("7 van 12") and deliberately **no score**, 3 free checks a day, BSN warning, gaps as discussion points; a free account imports the CV into their editor.

Also ranking: Enhancv NL, cv-check.nl, matchmatters.nl, owlapply, resumemaker.online, jobtestprep.nl.

What only WerkCV has, and what the page must show above the fold: per-requirement vacancy match with quotes from the CV **and** the vacancy; a readability preview (what a system reads); Dutch rules (CEFR levels, mbo/hbo/wo, VOG, BIG, driving licence, BSN); PDF, Word and pasted text; a Dutch and an English version.

## 3. Redirects (301)

| From | To |
|---|---|
| `/tools/ats-cv-checker`, `/tools/cv-score`, `/cv-checken`, `/cv-nakijken` | `/cv-check` |
| `/tools/cv-vacature-match` | `/cv-check/vacature` (new) |
| `/tools/cv-score/methodologie` | `/cv-check/methodologie` |
| `/en/dutch-cv-checker`, `/en/resume-optimizer-netherlands` | `/en/cv-check` |
| `/en/cv-job-match-checker` | `/en/cv-check/job-match` (new) |

Keep `/api/tools/cv-vacature-match`: the editor uses it. The old tool components and the `ats-checker` / `cv-score` APIs become unused; remove them in a cleanup commit about two weeks after launch, so a rollback stays a config change.

## 4. Work items

1. **Copy and FAQ.** Move the unique parts of the old pages into the flagship, not everything. NL: keep "ATS", "cv scanner" and "cv nakijken" wording (the old pages' best queries); take the best FAQ answers (ATS vs. normal check, AI check limits, "wanneer is een menselijke review slim"), about 8–10 questions in total. EN: take the resume-optimizer copy (the only page with orders) and the Dutch-CV FAQ (photo, references, English CV).
2. **Titles.** NL `/cv-check`: "Gratis CV-check en ATS checker met AI | WerkCV". `/cv-check/vacature`: "CV vergelijken met vacature: gratis match-check | WerkCV". EN: "Free CV checker for the Netherlands: ATS check and job match". Add a dated "Laatst bijgewerkt" line.
3. **Two new pages:** `/cv-check/vacature` and `/en/cv-check/job-match`: the same tool with the vacancy field open (new `initialMode` prop on `CvCheckTool`), each with its own intro and FAQ.
4. **English methodology page** `/en/cv-check/methodology`.
5. **Record failed check IDs** in `cv_check_completed` (IDs and counts only, never CV text), so the December "most common mistakes" report has data. Confirm the analytics endpoint keeps array properties.
6. **Remove noindex** from all CV-check pages; add them to the sitemap; remove the old URLs from the sitemap; hreflang pairs NL↔EN.
7. **Internal links:** about 68 files link to the old URLs. Point them at the new URLs directly (not via redirect): homepage facts block, `/prijzen`, tools index, menus, CV-tips hub, guides, `llms.txt`.
8. **Production QA before announcing:** fixture CVs (single column, two columns, Word with contact in header, pasted text) with and without a vacancy; mobile width; error states; rate limit messages; check that every old URL returns a 301 to the right page.
9. **Deploy**, then request indexing for the new URLs in Search Console. Bing follows with the Bing work.

## 5. How we judge it

- 2 weeks: all old URLs 301; new URLs indexed; `cv_check_completed` events and no rise in `cv_check_failed`.
- 6 weeks, against the table in §1: impressions and position for "ats checker", "ats cv checker", "cv check", "cv vergelijken met vacature"; landings on `/cv-check*` vs. the old pages' 108 per 120 days; `tool_to_cv_cta_click` from the check; orders with a `/cv-check` first touch.
- Expect 2–6 weeks of position movement after the redirects. Rollback if needed: remove the redirects and restore the old pages (kept in git).

## 6. Timing

Launch now (early October) rather than mid-November: it gives the new URLs about three months to settle before the January peak.
