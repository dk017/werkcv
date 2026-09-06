# SEO keyword opportunity audit

Date: 2026-08-11

## Scope and reading notes

This audit uses the supplied Search Console exports:

- query export: the returned top query sample, including growing, new and declining rows;
- new-query export: 100 returned new queries;
- lost-query export: 100 of 343 returned lost queries;
- page export: 300 returned pages.

The exports do not include query-to-page pairs, so page assignments below are based on search intent and the current route inventory. Validate the final URL mapping in Search Console before making canonical or redirect changes.

## Priority order

| Priority | Canonical page or cluster | Baseline from export | Opportunity | Action taken or next action |
| --- | --- | --- | --- | --- |
| P0 | `/tools/parttime-salaris-calculator` | 387 clicks, 49.9K impressions, 0.8% CTR, position 7.7 | The largest traffic page. The query cluster includes `fulltime naar parttime berekenen` (650 impressions, position 7.8), `fulltime naar parttime` (368, position 9.4), `parttime salaris berekenen` (569, position 8.6) and `salaris 40 uur naar 32 uur berekenen` (230, position 11.0). | Hero now sends visitors to the calculator first; added visible content for parttime percentage and average monthly hours. Next: test editor CTA copy and calculator completion rate. |
| P0 | `/tools/eindejaarsuitkering-berekenen` | 226 clicks, 10.9K impressions, 2.1% CTR, position 15.8 | Strong commercial utility. `eindejaarsuitkering berekenen` has 1.3K impressions at position 5.6; `eindejaarsuitkering berekenen netto` has 210 at 6.2; long-tail new queries cover calculation, percentage and tax wording. | Added exact calculation, net, 13e-maand percentage, tax and `eindejaarspremie` answers without creating a duplicate 13e-maand URL. Next: improve result-state CTA clicks into the CV editor. |
| P0 | `/tools/vakantiegeld-berekenen` | 58 clicks, 14.5K impressions, 0.4% CTR, position 24.9 | High demand but weak page-level visibility. Declining `vakantiegeld berekenen` has 490 impressions at position 35.9; `vakantiegeld bruto naar netto` has 57 at position 23.3; `salaris inclusief vakantiegeld berekenen` is a new/declining opportunity. | Added the salary-including-holiday-pay calculation block, 2026 net FAQ wording and exact long-tail metadata. Next: compare title/description CTR against the calculator SERP and add stronger above-the-fold calculator framing if CTR stays below 1%. |
| P0 | `/tools/kilometervergoeding-berekenen` | 62 clicks, 6.5K impressions, 1% CTR, position 19.0 | `kilometervergoeding berekenen` has 274 impressions at position 14.2; 2026 variants already rank around positions 6–8. The page can win more by answering the high-intent “from how many km?” question. | Added the `reiskostenvergoeding 2026 vanaf hoeveel km` answer and separated employer policy from the tax-free maximum. The 2026 €0.25 figure is linked to the current Rijksoverheid and Belastingdienst guidance. |
| P1 | `/en/guides/cv-format-netherlands-english` + `/en/dutch-cv-template` | Guide: 12 clicks / 851 impressions / position 7.9. Template: 11 / 542 / position 9.9. | English queries are consolidating around `netherlands cv format`, `netherlands resume format`, `dutch resume format`, and `netherlands cv template free download`. `/en/cv-format-netherlands-english` is a redirect, so a second canonical page would split intent. | Expanded the canonical guide metadata, intro, format section and FAQ; added visible Netherlands-resume FAQ and free-start/download explanation to the template page. |
| P1 | `/cv-maken-16-jarige` and student/starter examples | `/cv-maken-16-jarige`: 8 clicks, 1.3K impressions, position 9.3. Queries include `cv 16 jarige` at position 6.7 and `cv maken 16 jarige` at 6.3. | Already close to page-one dominance and directly tied to the builder. | Keep one youth canonical cluster. Next: strengthen the editor CTA and link the 15/16-year-old pages to the matching student examples. |
| P1 | `/gratis-cv-maken`, `/cv-maken-zonder-abonnement`, `/cv-maken-eenmalig-betalen`, `/prijzen` | The pages collectively receive high-intent trust/pricing traffic. `cv maken eenmalig betalen` has 69 impressions at position 5.5; `cv.nl kosten` has 49 at 6.0; `is cv.nl gratis` has 56 at 9.0. | These are conversion pages, not new SEO page opportunities. Pricing clarity and a short route to the editor matter more than additional near-duplicate URLs. | No new URL added in this wave. Next: review CTA click-through and payment FAQ performance across these shared pages. |

## Query clusters

### 1. Fulltime, parttime and monthly-hours calculations

This is the best combined traffic and conversion opportunity. The existing calculator already serves the intent, so the correct move is to strengthen the page around the phrases people actually use:

- `fulltime naar parttime berekenen`;
- `parttime salaris berekenen` and `parttime loon berekenen`;
- `salaris 40 uur naar 32 uur berekenen`;
- `parttime percentage berekenen`;
- `32 uur per week is hoeveel uur per maand`.

The page now contains the formula, percentage examples and monthly-hours table. Avoid separate pages for 24-, 28-, 32- and 36-hour variants unless future data shows a distinct SERP and conversion path.

### 2. Eindejaarsuitkering, 13e maand and net calculation

The query set is already producing the strongest individual clicks. The canonical page should own the whole cluster:

- fixed 13e month versus percentage;
- 8.33% conversion;
- pro-rata calculation;
- bruto-to-net indication;
- tax/loonstrook explanation;
- `eindejaarspremie` as a terminology variant.

Do not build `/tools/13e-maand-berekenen` yet. That would duplicate the page that already ranks for the same calculator intent.

### 3. Holiday pay and salary including holiday pay

The page has meaningful impressions but low CTR and a weak average position. The immediate content job is to make the calculation intent obvious before the long explanatory sections:

- gross 8% calculation;
- gross-to-net estimate with an explicit caveat;
- annual salary including holiday pay;
- part-time and leaving-employment cases;
- distinction from a 13e month.

The page now includes the annual-total example and the missing net FAQ. If the next export still shows the main term below page two, the next test should be a shorter, more calculation-led title and above-the-fold layout.

### 4. English Netherlands CV/resume format

The main risk here is cannibalization, not lack of content. Keep these roles clear:

- `/en/guides/cv-format-netherlands-english`: format rules, section order, examples and ATS guidance;
- `/en/dutch-cv-template`: template selection and builder conversion;
- `/en/resume-optimizer-netherlands`: optimization/check intent;
- `/en/dutch-cv-examples`: example intent.

The redirect `/en/cv-format-netherlands-english` should remain a redirect to the guide.

### 5. Lost queries

The supplied lost sample contains no high-volume recovery target. The most actionable rows are small role/example terms such as `cv productiemedewerker` (position 8), `cv projectmanager` (position 14), `cv example netherlands` (position 11), and `cv magazijnbeheerder` (position 24). Refresh those existing role pages and their internal links before creating new pages. The old competitor cancellation terms should remain utility pages, but they are not the first growth lever.

## Pages with impressions but no clicks

Several existing pages are indexed but underperforming rather than missing:

- `/cv-aanmaken`: 2.1K impressions, position 48.8;
- `/cv-maken-template`: 2.1K, position 70.3;
- `/cv-maken-student`: 1.4K, position 51.8;
- `/cv-maken-in-word`: 448, position 43.0;
- `/cv-maken-pdf`: 301, position 26.6.

These should receive a second content/internal-linking wave. Creating more variants for the same terms would make the architecture harder to understand and would not solve their page-one weakness.

## Conversion measurement to add to the next review

For each P0 page, compare the next export with:

1. organic CTR;
2. calculator interaction/completion;
3. click-through to `/editor` or the no-subscription route;
4. signup/start rate;
5. paid PDF download rate.

The SEO win is only useful if the calculator pages move visitors into the CV workflow.

## Source note for 2026 travel wording

The kilometer page’s 2026 wording follows the current [Rijksoverheid explanation of the maximum employer kilometer allowance](https://www.rijksoverheid.nl/vraag-en-antwoord/inkomstenbelasting/wat-is-de-maximale-kilometervergoeding-die-ik-van-mijn-werkgever-kan-ontvangen) and [Belastingdienst WKR guidance](https://www.belastingdienst.nl/wps/wcm/connect/nl/personeel-en-loon/content/werkkostenregeling). Employer reimbursement policy and the tax-free maximum are separate questions.
