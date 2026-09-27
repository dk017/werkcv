# Bing and AI-assistant analysis

Data: Bing Webmaster Tools exports (27 Jun–25 Sep 2026: search performance, pages, keywords, AI performance) and production `AnalyticsEvent` / `Order` (last 90 days, read-only).

## 1. Size and trend

- Bing search: 41.504 impressions and 692 clicks in 3 months. Daily impressions went from ~313 (first week) to ~792 (last week), clicks from ~6 to ~9 a day.
- **Bing AI citations (Copilot and Bing's AI answers): 49.852 in 3 months, from ~297 a day to ~1.747 a day (×6).** Cited pages went from ~34 to ~100 a day. Citations now outnumber search impressions about 2:1.

## 2. What Bing traffic is worth (production, last 90 days)

| Source | Landings | Paid orders | Orders per 100 landings |
|---|---:|---:|---:|
| Google | 4.832 | 44 | 0,91 |
| Direct | 3.829 | 11 | 0,29 |
| Bing-index engines (Bing 835, DuckDuckGo 468, Ecosia 181, Yahoo 89) | 1.573 | 7 | 0,45 |
| AI assistants (ChatGPT 274, Perplexity 12, Copilot 20, Gemini 9) | 315 | 3 | 0,95 |

DuckDuckGo, Ecosia and Yahoo rely largely on Bing's index, so Bing's index drives about a third as many landings as Google. AI assistants convert as well as Google and land on commercial pages (home, `/en/dutch-cv-template`, `/en/templates`, `/cv-voorbeelden`, `/cv-maken-zonder-abonnement`, `/prijzen`).

## 3. What Bing ranks us for

- Mostly informational pages: interview questions (3.511 impressions, 125 clicks, position 4,7), "naar aanleiding van" spelling, profile-text examples, mileage and leave calculators. These convert poorly.
- Commercial queries rank but don't click: "cv" 763 impressions at 5,5 (1 click), "cv maken" 113 at 7,0 (1 click).
- **Commercial pages barely appear in the Bing page report:** `/cv-maken` 21 impressions, `/gratis-cv-maken` 2, `/templates`, `/prijzen`, `/cv-maken-zonder-abonnement` and the new `/cv-check` pages not at all. On Google these pages are among the best converters.
- Index status could not be checked from here (Bing CAPTCHA). Check with URL Inspection in Bing Webmaster Tools.

## 4. IndexNow

The site has an IndexNow key (`public/cc5e780d6ef64af9b8875d65b82fee66.txt`) and `scripts/submit-indexnow.ts`, but it only runs by hand; it is not part of deploys. The CV-check launch (new URLs and 9 redirects) and the new guides of 26–27 Sep have not been submitted. A dry run with 25 new/changed/redirected URLs validated.

## 5. Recommendations

1. Submit the 25 new, changed and redirected URLs via IndexNow (dry run passed).
2. Run IndexNow for changed URLs as a step in the deploy workflow, so Bing (and engines using its index) pick up changes within days.
3. In Bing Webmaster Tools: URL Inspection for `/prijzen`, `/templates`, `/cv-maken-zonder-abonnement`, `/cv-check`; if not indexed, request indexing.
4. Export the page-level AI Performance report (which pages Copilot cites), to see whether commercial pages are cited or only informational ones.

## 6. Which pages Bing's AI cites (page and grounding-query exports, 27 Jun–25 Sep)

- Most-cited pages are informational: `/vaardigheden-cv-voorbeelden` 3.741, `/cv-tips/vragen-stellen-sollicitatiegesprek` 3.069, `/cv-voorbeelden` 3.044, `/vaardigheden/karaktereigenschappen-lijst` 2.911, `/profieltekst-cv-voorbeelden` 2.114, letter examples and layouts 1.300–1.700 each.
- Commercial pages are barely cited: `/` 339, `/cv-maken` 82, `/gratis-cv-maken` 74, `/prijzen` 14, `/cv-maken-zonder-abonnement` 6. Citation share for "cv maken" is 0,25%.
- Cancellation pages are cited well: `/livecareer-opzeggen` 735, `/cv-nl-opzeggen` 482, `/cvster-opzeggen` 115; citation share 22–34% for "livecareer opzeggen", "cv.nl opzeggen", "cvster opzeggen".
- New AI-writing queries already appear: "ai sollicitatiebrief schrijven gratis" (49 citations), "ats proof cv" (24), "cv maken met ai" (12).

**Citations do not turn into visits or sales.** Landings in 120 days (all sources) and orders ever: skills examples 64 / 0, interview questions 388 / 0, character traits 17 / 0, the five cancellation pages 133 / 0. Copilot sent 20 landings in 90 days. The AI-assistant orders (3 in 90 days) came via ChatGPT landing on commercial pages (home, templates, `/prijzen`), not via Bing's AI.

**Conclusion:** Bing's AI citations are exposure, not a revenue channel today. Keep IndexNow running and get the commercial pages indexed; don't invest in more informational content for citations. The cancellation pages' 133 visits with 0 orders are too few to judge (at the site's ~0,9% rate that would be about 1 order); revisit when traffic grows.
