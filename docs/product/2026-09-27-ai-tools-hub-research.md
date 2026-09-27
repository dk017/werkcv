# AI tools hub: research before building

Research date: 27 September 2026. Sources: production `AnalyticsEvent` / `Order` (last 120 days, read-only), Search Console export (24 Jun–23 Sep), Google NL autocomplete.

## 1. Which AI tools get used (last 120 days)

| Page | Landings | Google clicks / impressions (3 mo) | Paid orders (first touch, all time) |
|---|---:|---:|---:|
| `/tools/linkedin-naar-cv` | 88 | 50 / 1.316 (position 7,8) | **2** |
| `/tools/sollicitatiebrief-generator` | 25 | 1 / 25 | 0 |
| `/tools/jubileumtekst-generator` | 19 | 14 / 1.675 | 0 |
| `/tools/job-title-translator`, `/tools/cv-keywords` | 11 each | 0–1 | 0 |
| `/tools` (overview) | 9 | 1 / 102 | 0 |
| `/tools/profieltekst-generator` | 6 | 2 / 21 | 0 |
| `/tools/vaardigheden-generator` | 4 | 0 / 126 | 0 |
| `/tools/werkervaring-bullets` | 1 | 0 / 2 | 0 |

LinkedIn → CV funnel (events, last 6 months): 111 views → 13 CVs generated (12%) → 2 clicks on "Open dit ingevulde CV" (tracked as `start_cv` with `entryPoint: linkedin_to_cv_tool`) → 2 CVs created → 1 paid. A second order came from a visitor who first landed on the tool but paid for a CV started elsewhere. (An earlier draft read `linkedin_to_cv_cta_editor_click` as "opened the editor"; that event is fired by the links to `/cv-maken` and `/cv-check`, not by the pre-filled editor button.)

## 2. What people search (Google NL autocomplete)

- No Dutch demand for an "AI tools" hub; "ai tools cv" completes in English only.
- Demand is per task: "gratis ai cv maken / maker", "cv generator ai (gratis / linkedin)", "linkedin cv maker / generator / downloaden", "motivatiebrief ai (gratis)", "motivatiebrief generator gratis", "sollicitatiebrief chatgpt / prompt chatgpt sollicitatiebrief".
- "profieltekst generator" has no completions; "profieltekst cv (voorbeeld)" does.

## 3. Conclusion

A new hub page would have no search demand and would link mostly to tools nobody uses. The evidence points elsewhere:

1. **LinkedIn → CV is the one tool that works** (traffic, ranking, orders). Opening the editor pre-filled already exists. The biggest drop is before that: 88% of visitors never generate a CV. The cause is not measured; a likely factor is that the tool asks them to copy and paste their profile text, and part of the traffic comes from informational LinkedIn queries ("linkedin profiel voorbeeld"). LinkedIn's own "Save to PDF" export works only on desktop, for profiles in English with the language setting on English (LinkedIn Help, "Save a profile as a PDF", checked 27 Sep 2026), so it is not an option for most Dutch profiles.
2. **Cover letters with AI** have real demand ("motivatiebrief ai", "sollicitatiebrief chatgpt"). The letter generator exists (25 landings); it could get the same tested-prompts treatment as the ChatGPT CV guide. Selling the cover-letter package is part of the parked pricing work.
3. Keep `/tools` as the overview; no separate AI hub.

## 4. Separate finding: `/motivatiebrief-albert-heijn`

2.263 impressions at position 4,9 and **0 clicks** in 3 months (query "motivatiebrief albert heijn": 2.516 impressions, 0 clicks). 808 of the page's impressions come from Google's AI features (AI Overviews / AI Mode), which may explain part of it. The Google results page could not be inspected from here (CAPTCHA); check it manually before changing anything.
