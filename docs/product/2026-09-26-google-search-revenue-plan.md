# Google Search → revenue plan: path to $2k/month

Analysis date: 26 September 2026. Sources: Google Search Console exports (web, last 3 months, 24 Jun–23 Sep, incl. the Generative AI features report), read-only aggregate queries on production `werkcv` (`Order`, `AnalyticsEvent`, `AgencyPayment`), live page fetches and spot SERP checks. No customer data exported. Queries.csv is GSC's top-1,000 list, so cluster totals are lower bounds.

## 1. Where we are

| Metric | Value |
| --- | --- |
| Paid CV orders | Jun 20 · Jul 16 · Aug 20 · Sep (to 25th) 23 |
| Revenue, September to date | ≈ €125 (23 × €4.99 + 1 profile photo) → ~€150/month run-rate |
| Target | $2,000 ≈ **€1,725/month** (at ~1.16 USD/EUR) — **≈ 11–12× today** |
| Products actually sold (90d) | CV download €4.99 only; profile photo 2×; **bundle €14.99 and cover-letter €9.99: zero**; add-ons: zero |
| Agency (€99/month) | 1 payment in Aug, 1 in Sep |
| Google search trend | Impressions 2.5k/day → 6.3k/day; avg position 15 → 8; clicks 20/day → 85/day |
| AI Overview impressions | 300/day → 1,500–1,800/day (mostly calculators) |

Search is growing fast, but the growth is overwhelmingly **calculator traffic, which does not buy**.

## 2. What actually produces sales (server data, 90 days)

| Landing page group | Landings | Signups | Paid | Landing → paid |
| --- | ---: | ---: | ---: | ---: |
| Pricing / no-subscription (`/prijzen`, `/cv-maken-zonder-abonnement`…) | 251 | 66 | 28 | **11.2%** |
| Competitor / cancel pages | 127 | 11 | 2 | 1.6% |
| Home (`/`, `/en`) | 1,720 | 110 | 24 | 1.4% |
| CV tools (LinkedIn→CV, ATS…) | 160 | 8 | 2 | 1.3% |
| Examples / templates | 656 | 18 | 2 | 0.3% |
| English content | 1,462 | 118 | 3 | 0.2% |
| Cover-letter content | 244 | 2 | 0 | 0% |
| **Salary / benefit calculators** | **3,070** | **1** | **0** | **0%** |

By referrer, **ChatGPT is the best-converting source**: ~147 landings → ~7 orders (~5%), against Google organic at roughly 1%. Reddit sent 138 landings, Bing 824 (3 orders).

## 3. The biggest leaks (fix before adding traffic)

1. **English checkout converts at 8.7% against 49% for Dutch.** Over 90 days, English had 103 `checkout_started` and 9 `paid`; Dutch had 106 and 52. In `lib/dodo.ts`, Dutch checkouts pre-fill `billing_address: NL` + EUR, so iDEAL is essentially one tap. English checkouts pre-fill nothing and enable currency selection, so the buyer faces an address form first, and iDEAL only appears once the country is NL. Most English users are expats *in NL* (GSC: 88% of impressions are NL). **Hypothesis to verify:** pre-fill country from the request's geo (NL → NL + EUR) regardless of CV language. Even reaching 30% adds ~7 orders/month, about +30% revenue.
2. **Average order value is stuck at €5.** The €14.99 bundle and €9.99 cover-letter package have zero sales, so they aren't being presented at the moment of purchase. The nearest competitor showing up for one-time-payment searches, CVtogo, charges €7.95.
3. **Vacancy-match / resume screener is still failing**: 6 starts and 6 failures in the last 30 days, the same issue the 20 Sep report flagged. Google already ranks us #6 for *"kun je kijken of mijn cv aansluit bij de vacature"*.
4. **Analytics pollution**: `/admin/analytics` logged 320 `landing` events in 30 days, and `/login` / `/editor` also appear as landings. Exclude internal paths from `landing` before measuring the experiments below.

## 4. Search opportunities, by revenue value

### A. Competitor-cancel queries (highest intent, already page 1)
~3,000 impressions at **average position 8.8** and 0.5% CTR. These people are angry about a subscription, which is exactly who a one-time €4.99 product is for.

| Query | Impr. | Pos. | Our page |
| --- | ---: | ---: | --- |
| cv.nl opzeggen | 968 | 8.5 | `/cv-nl-opzeggen` (3,269 impr, 17 clicks) |
| cv.nl | 448 | 8.2 | — |
| livecareer opzeggen (+ variants) | ~450 | 6 | `/livecareer-opzeggen` |
| cv maker opzeggen / cvmaker opzeggen | 249 | 8.5 | `/cvmaker-opzeggen` |
| cv.nl inloggen · is cv.nl gratis · cv.nl kosten · via mollie opzeggen | ~340 | 6–17 | — |
| cvster kosten / cvster opzeggen | 95 | 18–26 | `/cvster-opzeggen` |

The SERP for *cv.nl opzeggen* is 8 cancellation-service sites (123opzeggen, Xpendy, Abbostop…) with thin content, and none of them offers an alternative. Actions:
- Put a "what cancelling costs you vs. €4.99 once" box and a pricing CTA above the fold; add the missing *"download je CV vóór je opzegt"* step. That step is the #1 worry, and our editor can import the PDF.
- New pages: **"Is CV.nl gratis? Wat het echt kost"** (covers *is cv.nl gratis*, *cv.nl kosten*, *cvster kosten*, *cv maker kosten*, *cv maker abonnement*) and a **CV.nl-via-Mollie afschrijving** explainer.

### B. Head "make a CV" terms (large, currently page 3–6)
The *cv maken / gratis / online / opstellen / laten maken* cluster is 5,765 impressions at **position 41.6**, and the generic *cv voorbeeld / template* cluster is 5,558 at 31.4. Home ranks ~31 and `/cv-maken` ~60. The likely cause is **self-cannibalisation**: `/`, `/cv-maken`, `/gratis-cv-maken`, `/cv-aanmaken`, `/cv-opstellen`, `/online-cv-maken`, `/cv-maken-online`, `/snel-cv-maken`, `/mooie-cv-maken`, `/professioneel-cv-maken`, `/cv-maken-template`, `/eerste-cv-maken` all target the same intent, and each gets only 1–60 impressions.
- Pick one canonical target per head term (e.g. `/` = "cv maken", `/cv-voorbeelden` = "cv voorbeeld", `/gratis-cv-maken` = "gratis cv maken") and 301 or canonicalise the thin variants into them.
- This is the slowest lever (8–12 weeks) and the only one that can multiply sales by itself. Top-5 for *cv maken* alone would out-earn everything else in this plan.

### C. Keywords we rank for without a matching page (content gaps)

| Query group | Impr. | Pos. | Action |
| --- | ---: | ---: | --- |
| Greenhouse "unsuccessful resume parse" (3 variants) | ~330 | 9.8 | **New EN page**: why Greenhouse/Workday can't parse your CV, plus a fix. Pure buyer intent; the CTA is "rebuild as ATS-safe PDF €4.99". |
| certificaten / certificaat / BHV op cv · cursussen vermelden · hbo/wo titel op cv | ~315 | 11–27 | New `cv-tips/certificaten-op-cv` |
| zzp cv maken / zzp cv schrijven | 543 | 11–28 | Consolidate `cv-gids/cv-voorbeeld-zzper` + `cv-tips/freelance-cv-maken` into one strong page |
| 13e maand berekenen / belasting 13e maand / verschil met eindejaarsuitkering | ~1,700 | 30–75 | Section + FAQ on the eindejaarsuitkering page (ranks #2); peaks Nov–Dec |
| stage op cv · cv stage voorbeeld | ~500 | 19–27 | Strengthen the stage-CV example |
| pakkende cv titel / kopregel cv | 150 | 24–39 | New CV-headline page (the current one is LinkedIn-only) |
| prestaties cv voorbeeld · doelstelling cv · functioneel cv · carrièreswitch | ~290 | 18–62 | Expand existing tips |
| bedankmail na aangenomen / na sollicitatiegesprek | ~220 | 9–17 | Expand `/cv-tips/sollicitatie-bedankbrief` with ready-to-copy mails |
| Role CVs with no page: winkelmanager, supermarkt/kledingzaak medewerker, fabrieksarbeider, boekhouder, financieel adviseur, telemarketeer, buitendienst | ~570 | 10–47 | Role examples (these rank fast: *cv productmanager* #4, *cv software ontwikkelaar* #4) |
| language levels resume · dutch cv examples | ~110 | 17–32 | Add to EN guides |

### D. Click-through fixes on pages already on page 1
- `/motivatiebrief-albert-heijn`: **2,263 impr, position 4.9, 0 clicks**, and 808 AI-Overview impressions. The AI Overview and werk.ah.nl likely absorb the click. Test a title that promises something the Overview can't give, e.g. *"Motivatiebrief Albert Heijn: kopieer + pas aan in 2 min (per functie)"*, and link it to the €9.99 cover-letter product.
- `/tools/parttime-salaris-calculator`: 97,627 impr, position 6.4, 0.63% CTR. Traffic only, but cheap to improve.
- `/cv-tips/cv-opleiding-vermelden` (9,651 impr, #7.7, 0.7%) and `/cv-tips/foto-op-je-cv` (2,963, #28.7): these are CV-intent readers, so give them a stronger editor CTA.

### E. AI citations
ChatGPT converts about 5× better than Google. Make our key facts easy to cite: one canonical comparison page ("CV-builders in Nederland: prijs, abonnement, opzegtermijn" as a table), consistent pricing statements, FAQ schema, and presence in Reddit threads (r/Netherlands, r/Amsterdam, r/werken) where people ask about CV.nl charges. Also note that **one search engine still shows the old title "Eenmalig €7,99" for `/cv-maken-zonder-abonnement`**. The live title is €4,99, so request a recrawl (Bing phase).

### F. What not to prioritise
Calculators (3,070 landings, 0 sales), interview-question content (position 77), and generic motivatiebrief/sollicitatiebrief content (position 32–70, 0 sales). Keep the calculators because they build authority, but don't write more of them for revenue. If you want to monetise them, display ads on calculator pages only is the honest option: ~30k pageviews/month × €5–10 RPM ≈ €150–300/month. That's a brand trade-off for you to decide.

## 5. Plan and realistic revenue path

| Month | Work | Orders × AOV | Revenue |
| --- | --- | --- | --- |
| Now | — | ~27 × €5.10 | ~€140 |
| Oct | Fix EN checkout country; test €4.99 → €7.99 (A/B); order bump at checkout: "+ motivatiebrief €4" / bundle; clean `landing` analytics; fix resume screener | 35 × €7.50 | ~€260 |
| Nov | Competitor pages A + new cost pages; Greenhouse page; head-term consolidation (B); 13e maand section before seasonal peak | 60 × €8 | ~€480 |
| Dec | Content gaps C; CTR fixes D; AI/Reddit citation push E | 80 × €8 | ~€640 |
| Jan (job-search peak) | Consolidation gains land | 130 × €8.50 | ~€1,100 |

**Honest read:** B2C search alone most likely reaches **~€1,000–1,200/month (~$1.2–1.4k) by January**. Reaching $2k in 3–4 months needs at least one of:
- **5–6 agency customers at €99/month (+€500–600).** That's the fastest lump, and the product already exists.
- A **top-5 ranking for "cv maken"** after consolidation. Possible, but not controllable on this timeline.
- **Ads on the calculator pages** (+€150–300).

## 6. Measurement to add now
- Exclude `/admin*`, `/login`, `/editor` and `/en/editor` from `landing` events.
- Store the checkout country and currency on `checkout_started`, so the English-checkout fix can be measured.
- Server-side PDF delivery event (already flagged 20 Sep).
- A weekly read-only query: landings → signups → paid by page group, the same as §2, so every action above has a before/after.

Next step after this: repeat §2–§4 with Bing Webmaster data. Bing sent 824 landings but only 3 orders, and it's the source showing the stale €7,99 title.
