# WerkCV six-item organic conversion implementation specification

Status: Ready for implementation
Audience: Luna Max implementation agent, product reviewer, SEO/content reviewer, analytics reviewer, and release reviewer
Repository: `D:/DKPlayground/werkcv`
Owner: WerkCV product team
Decision date: 2026-08-30

## 1. Mission

Improve conversion from the commercial search demand WerkCV already has before creating more landing pages.

This release covers exactly six workstreams:

1. Refresh and strengthen `/prijzen` as the Dutch pricing owner.
2. Remove template-choice friction from `/cv-maken-zonder-abonnement`.
3. Turn `/goedkoopste-cv-maker-nederland` into a current, honest comparison route with a direct product path.
4. Repair English price and checkout persuasion across `/en` and `/en/pricing`, then prepare one controlled English checkout-recovery experiment.
5. Add the missing canonical English commercial pages to WerkCV's machine-readable discovery surfaces.
6. Improve the two proven English support pages and one under-discovered Dutch page, while freezing new role-page expansion until explicit measurement gates are met.

The implementation must make the existing journey clearer:

> Relevant landing page -> start or upload the correct CV -> build and preview free -> see the exact one-time price -> use secure hosted checkout -> return to the same CV -> download the paid PDF.

This is not a programme to produce more pages. It is a conversion-quality release for routes that already receive qualified demand.

## 2. Evidence and interpretation

Use the following production and search snapshot as the baseline for this specification. These figures are internal diagnostics, not public marketing claims.

### 2.1 Paid acquisition baseline

For the last 90 days, after excluding the known owner/test accounts and example-domain accounts:

- 57 paid CV orders;
- 38 attributed to Google;
- 3 attributed to Bing;
- 1 attributed to Yahoo;
- 3 attributed to ChatGPT;
- 1 attributed to LinkedIn;
- 11 direct or unknown.

First-touch paid CV orders included:

- `/`: 17;
- `/prijzen`: 15;
- `/cv-maken-zonder-abonnement`: 7;
- `/en`: 7;
- `/cv-maken-eenmalig-betalen`: 2; this is historical attribution for the route that now redirects to `/prijzen`;
- `/goedkoopste-cv-maker-nederland`: 2;
- `/en/english-cv-example-logistics-warehouse-netherlands`: 1;
- `/en/resume-optimizer-netherlands`: 1;
- `/tools/linkedin-naar-cv`: 1.

### 2.2 Landing-to-order baseline

The directional, first-touch funnel snapshot is:

| Landing path | CVs created | Meaningful CVs | Preview events | Checkout users | Paid orders |
|---|---:|---:|---:|---:|---:|
| `/` | 78 | 49 | 0 | 25 | 17 |
| `/prijzen` | 49 | 40 | 0 | 18 | 15 |
| `/en` | 108 | 74 | 2 | 23 | 7 |
| `/cv-maken-zonder-abonnement` | 29 | 22 | 0 | 8 | 7 |
| `/cv-maken-eenmalig-betalen` | 7 | 5 | 0 | 2 | 2 |
| `/goedkoopste-cv-maker-nederland` | 5 | 5 | 0 | 2 | 2 |
| `/en/guides/cv-format-netherlands-english` | 24 | 16 | 1 | 5 | 0 |
| `/en/dutch-cv-template` | 17 | 15 | 0 | 2 | 0 |
| `/en/pricing` | 0 | 0 | 0 | 0 | 0 |
| `/cv-downloaden-zonder-abonnement` | 0 | 0 | 0 | 0 | 0 |

Preview instrumentation is incomplete in this baseline. A zero preview count must not be interpreted as proof that nobody previewed a CV. Preview is a diagnostic stage only until the existing production conversion certification reports it as reliable.

No `checkout_failed` events were found for these routes in the reviewed window. The English loss is therefore more consistent with abandonment, payment-method uncertainty, price hesitation, or incomplete attribution than with a demonstrated checkout API failure. Do not publish or internally report a technical root cause without evidence.

### 2.3 Search baseline through 2026-08-24

| Page | Impressions | Clicks | CTR | Average position |
|---|---:|---:|---:|---:|
| `/prijzen` | 1,574 | 64 | 4.07% | 11.31 |
| `/cv-maken-zonder-abonnement` | 920 | 39 | 4.24% | 13.75 |
| `/en` | 10,722 | 264 | 2.46% | 7.55 |
| `/en/guides/cv-format-netherlands-english` | 1,739 | 42 | 2.42% | 10.55 |
| `/en/dutch-cv-template` | 538 | 9 | 1.67% | 11.99 |
| `/goedkoopste-cv-maker-nederland` | 115 | 1 | 0.87% | 9.14 |
| `/cv-downloaden-zonder-abonnement` | 21 | 0 | 0% | 17.62 |
| `/en/pricing` | 3 | 0 | 0% | 2.33 |

High-relevance queries include:

- `cv maken eenmalig betalen`: 70 impressions, 10 clicks, 14.29% CTR, average position 5.44;
- `cv maken zonder abonnement`: 40 impressions, 0 clicks, average position 7.53;
- `netherlands cv format`: 369 impressions, 14 clicks, average position 5.96;
- `netherlands resume format`: 226 impressions, 10 clicks, average position 7.27;
- `dutch cv template`: 196 impressions, 8 clicks, average position 8.16;
- `netherlands cv template free download`: 123 impressions, 7 clicks, average position 6.23.

Do not calculate future conversion expectations from these small page-level samples. Use the data to prioritize work, not to claim causality.

## 3. Research and implementation principles

The implementation must follow these rules:

1. One intent has one canonical owner. Do not create one page for every slight keyword variation.
2. A direct creation CTA must start the editor. A template-comparison CTA may open the template gallery. The label and destination must agree.
3. Never describe the final PDF as free. Building, editing, templates, and full preview are free; the final PDF for each separate CV has the current one-time price.
4. Render WerkCV's price from `cvDownloadPrice` in `lib/site-content.ts`. Do not hardcode consumer price literals in page copy or structured data.
5. Competitor price facts must come from the competitor's current official public page, have a visible checked date, and be omitted when they cannot be verified.
6. Do not claim that WerkCV is the cheapest overall. Fully free tools can be cheaper. The defensible statement is that WerkCV offers a clear paid route with a one-time PDF price and no consumer subscription.
7. Do not promise that a search engine or AI assistant will rank, cite, or recommend a page. Machine-readable discovery files are supplemental discovery aids, not guaranteed distribution.
8. Preserve route attribution through templates, editor, login, saved CV, checkout, paid order, and download.
9. Measure paid orders from the `Order` table joined to the actual CV. Analytics events are diagnostics and must not replace the financial source of truth.
10. Exclude owner, test, example-domain, and Agency activity from consumer reporting.
11. Keep Dutch routes entirely Dutch and English routes entirely English, including navigation, errors, checkout explanations, return states, and support copy.
12. Do not add third-party analytics, session replay, ad pixels, pop-ups, fake urgency, countdowns, discounts, testimonials, or review counts.

Relevant implementation guidance:

- Google canonical and redirect guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google title-link guidance: https://developers.google.com/search/docs/appearance/title-link
- Google snippet guidance: https://developers.google.com/search/docs/appearance/snippet
- Google multilingual-site guidance: https://developers.google.com/search/docs/advanced/crawling/managing-multi-regional-sites
- Google structured-data policies: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Dodo hosted-checkout documentation: https://docs.dodopayments.com/features/checkout

## 4. Locked decisions and keyword ownership

These decisions may not be changed during implementation without a new written product decision.

| Canonical route | Owned search intent | Required action |
|---|---|---|
| `/prijzen` | `cv maken kosten`, `cv maker kosten`, `cv maken prijs`, `cv maken eenmalig betalen`, `cv maker eenmalig betalen`, `eenmalig betalen cv`, `cv maken betaald` | Strengthen; keep canonical |
| `/cv-maken-zonder-abonnement` | `cv maken zonder abonnement`, `cv builder zonder abonnement`, `cv maken geen abonnement`, `geen abonnement cv maker` | Keep distinct; fix CTA routing |
| `/goedkoopste-cv-maker-nederland` | `goedkoopste cv maker nederland`, `goedkoop cv maken`, comparison of free/one-time/subscription routes | Keep honest comparison; strengthen direct conversion path |
| `/en` | `english cv builder netherlands`, broad English CV builder/product intent | Keep primary English product owner |
| `/en/pricing` | `cv builder netherlands price`, `cv builder netherlands no subscription`, `one time payment cv builder`, `resume builder no subscription`, `english cv builder netherlands price` | Reposition and link prominently |
| `/en/dutch-cv-template` | `dutch cv template`, `netherlands cv template`, `dutch resume template` | Keep educational/template owner; clarify price near first CTA |
| `/en/guides/cv-format-netherlands-english` | `netherlands cv format`, `netherlands resume format`, `cv format netherlands english` | Keep informational owner; add transparent commercial bridge |
| `/cv-downloaden-zonder-abonnement` | `cv downloaden zonder abonnement` | Keep as a small discovery test; do not expand or duplicate |

`/cv-maken-eenmalig-betalen` must remain a permanent redirect to `/prijzen`. Do not restore it as a separate page. After redirect tests pass, remove its dead page file if it still exists, keep the redirect, remove it from sitemap/internal discovery, and verify query strings do not produce a loop.

The HTML `keywords` metadata field is not an acceptance criterion. Implementation time must go into visible content, metadata title/description, canonical signals, internal links, and the actual funnel.

## 5. Scope and prohibited work

### In scope

- the eight canonical routes in the ownership table;
- the existing redirect from `/cv-maken-eenmalig-betalen`;
- shared consumer price/comparison data;
- CTA destinations and source attribution;
- English hosted-checkout explanation and return-flow certification;
- one controlled English checkout-recovery experiment using the existing follow-up queue;
- AI discovery endpoints backed by `lib/ai-discovery.ts`;
- focused funnel reporting, tests, rollout, and a dated implementation report.

### Explicitly out of scope

- new role-example pages;
- new generic CV guides, salary tools, or free-download pages;
- a new payment provider or payment method;
- a price change, discount, coupon, trial, bundle, or subscription;
- Agency or MatchPack changes;
- mass email or automatic sending without the release gate in this specification;
- unverified competitor price copy;
- a redesign of the editor, template system, global brand, header, or footer;
- redirects based on IP address or browser language;
- database migrations unless existing fields demonstrably cannot meet the contract.

## 6. Required delivery order

Implement one phase at a time. After every phase, run the phase-specific tests, inspect the complete diff, perform the required mobile and desktop check, record the result, and stop if the exit gate fails.

Required order:

1. Baseline and inventory.
2. Shared price and comparison truth.
3. `/prijzen`.
4. `/cv-maken-zonder-abonnement`.
5. `/goedkoopste-cv-maker-nederland`.
6. English pricing and checkout clarity.
7. Machine-readable discovery.
8. Supporting-page improvements and expansion hold.
9. Release certification and staged rollout.

Do not edit all pages first and test them at the end.

## 7. Phase 0 — Baseline and inventory

Before editing:

1. Read `AGENTS.md` completely.
2. Read all files directly involved in the routes and funnel:
   - `app/prijzen/page.tsx`;
   - `app/cv-maken-zonder-abonnement/page.tsx` and its `content` module;
   - `app/goedkoopste-cv-maker-nederland/page.tsx`;
   - `app/cv-downloaden-zonder-abonnement/page.tsx`;
   - `app/en/page.tsx`;
   - `app/en/pricing/page.tsx`;
   - `app/en/dutch-cv-template/page.tsx`;
   - the implementation behind `/en/guides/cv-format-netherlands-english`;
   - `lib/site-content.ts`;
   - `lib/ai-discovery.ts` and every route that consumes `primaryAiPages`;
   - `app/sitemap.ts` and `next.config.ts`;
   - `components/analytics/TrackedLandingLink.tsx`;
   - `lib/start-source.ts`, `lib/attribution.ts`, `lib/analytics.ts`, `lib/conversion-funnel.ts`, and `lib/conversion-funnel-server.ts`;
   - login, editor, checkout creation, checkout return, paid-download, and payment webhook code;
   - `scripts/followups-scan.ts`, `scripts/followups-send.ts`, and the related Prisma models.
3. Record the current branch, commit, and dirty worktree. Preserve unrelated user changes.
4. Capture for every scoped route: HTTP status/redirect; title; description; canonical; hreflang; H1; first visible CTA; CTA destination; `startSource`; sitemap membership; AI-discovery membership; 1440 px screenshot; 375 px screenshot; and horizontal overflow at 320/375 px.
5. Re-run the existing certified funnel report for the same date range and exclusions used by the baseline. Record the report command and output checksum in the implementation report.
6. Identify the exact payment-provider product/price ID used for the consumer CV. Confirm that displayed price, checkout request, webhook order amount, and `cvDownloadPrice.amountCents` agree. Do not modify production data.

Exit gate: route ownership, attribution propagation, current checkout behavior, and baseline metrics are reproducible. If they are not, stop and repair measurement before changing copy.

## 8. Phase 1 — Shared price and competitor-comparison truth

### 8.1 WerkCV price source

`cvDownloadPrice` in `lib/site-content.ts` remains the only source of truth for consumer CV price display and numeric structured data.

Replace hardcoded consumer price values in every scoped page and related FAQ/JSON-LD with:

- `cvDownloadPrice.display` for Dutch visible copy;
- `cvDownloadPrice.displayEn` for English visible copy;
- `cvDownloadPrice.value` for schema price strings;
- `cvDownloadPrice.amountCents` for comparisons or analytics amount;
- `cvDownloadPrice.currency` for currency.

Do not perform a repository-wide unrelated price rewrite. Add a focused test that fails when a scoped file contains the literal consumer-price forms outside `lib/site-content.ts`.

### 8.2 Competitor comparison contract

Create one typed module, preferably `lib/commercial/consumer-cv-pricing.ts`. It must hold factual competitor pricing mechanics used by `/prijzen`, `/cv-maken-zonder-abonnement`, and `/goedkoopste-cv-maker-nederland`.

Use this minimum contract:

```ts
export type ConsumerCvPricingModel =
  | "free"
  | "one_time"
  | "trial_subscription"
  | "subscription"
  | "mixed"
  | "unverified";

export type ConsumerCvPricingFact = {
  id: string;
  providerName: string;
  officialUrl: string;
  checkedAt: string; // ISO YYYY-MM-DD
  status: "verified" | "temporarily_unverifiable";
  model: ConsumerCvPricingModel;
  initialPriceTextNl: string | null;
  recurringPriceTextNl: string | null;
  renewalTextNl: string;
  cancellationRequired: boolean | null;
  factualNoteNl: string;
};
```

The exact type may include more fields, but it may not omit provider URL, per-provider checked date, verification status, pricing model, or renewal/cancellation mechanics.

Rules:

- Verify each fact against the provider's official pricing/product page during implementation.
- Do not use search snippets, affiliates, cached excerpts, reviews, or WerkCV's old copy as evidence.
- Store no competitor logo or copyrighted screenshot.
- Keep notes neutral. Do not call another provider deceptive, hidden, a scam, or unsafe.
- If an official page is unavailable, region-gated, ambiguous, or conflicting, set `status` to `temporarily_unverifiable`, set price fields to `null`, and render `Actuele prijs niet onafhankelijk geverifieerd` with the official link. Do not retain an old number.
- Expose a pure `isPricingFactFresh(fact, now)` helper. A verified fact is fresh for 45 days from `checkedAt`.
- The UI must not render an exact competitor price when stale. It may describe the model only when unambiguous and the old checked date remains visible.
- Every table shows `Laatst gecontroleerd: <localized date>` and links provider names to official sources.
- Do not derive a winner score.

The pages may have different narratives, but all overlapping factual values must come from this module.

### 8.3 Structured price validity

Remove manually maintained `priceValidUntil` values unless a real business commitment supports them. If retained, define one shared validity value beside `cvDownloadPrice`, document the updater, and test that it is not past. Never publish expired price schema.

Exit gate:

- all scoped WerkCV price copy derives from `cvDownloadPrice`;
- all overlapping competitor facts are shared;
- exact competitor prices are fresh within 45 days or hidden;
- visible copy and JSON-LD agree;
- tests cover freshness, unavailable facts, locale formatting, and stale-price suppression.

## 9. Workstream 1 / Phase 2 — Strengthen `/prijzen`

### 9.1 Page role

`/prijzen` is the canonical Dutch pricing page and only owner of one-time-payment price intent. Before the first major scroll it must answer: what is free, what costs money, exact price including VAT, no-subscription status, full-preview availability, same-CV repeat downloads, and the action that starts the CV.

### 9.2 Locked metadata and first fold

Use dynamic price interpolation:

- Title: `CV maken kosten: {display} per PDF, eenmalig betalen | WerkCV`
- Description: `Wat kost een CV maken? Bouw en bekijk je volledige CV gratis. Betaal eenmalig {display} inclusief btw voor de PDF, zonder abonnement of automatische verlenging.`
- H1: `Maak en bekijk je CV gratis. Download voor {display}.`
- Support: `Betaal één keer voor de PDF van dit CV. Geen proefperiode, maandkosten of automatische verlenging.`
- Primary CTA: `Maak gratis je CV`
- Secondary CTA: `Bekijk wat je krijgt`

The first fold shows exactly four short trust facts, in this order:

1. `Volledig voorbeeld vóór betaling`
2. `Eenmalig {display} inclusief btw`
3. `Geen abonnement`
4. `Zelfde betaalde CV later opnieuw downloaden`

The price, support sentence, and primary CTA must be visible at 375 x 667.

### 9.3 CTA map

| Location | Label | Destination |
|---|---|---|
| hero/header | Maak gratis je CV | `/editor?template=professional&startSource=nl_pricing_hero` |
| pricing card | Start gratis | `/editor?template=professional&startSource=nl_pricing_card` |
| bottom | Maak je CV gratis | `/editor?template=professional&startSource=nl_pricing_bottom` |
| mobile sticky | Start gratis | `/editor?template=professional&startSource=nl_pricing_sticky` |

An optional secondary `Vergelijk templates` link routes to `/templates?startSource=nl_pricing_templates`. Stop emitting old generic `pricing_header` and `pricing_card_primary` values; historical values remain readable as legacy.

### 9.4 Comparison, links, and schema

- Render competitor facts from the shared module and replace the stale hardcoded CV.nl facts.
- Distinguish free, one-time, and trial/subscription models.
- Add contextual links to `/cv-maken-zonder-abonnement`, `/goedkoopste-cv-maker-nederland`, and `/cv-downloaden-zonder-abonnement`.
- Do not add a large keyword-link block above the primary action.
- Product/Offer and FAQ schema must use shared price fields, canonical `/prijzen`, no invented rating, no expired validity, and only visible FAQs.

Exit gate: the page is internally consistent, current, and its complete signed-out and signed-in creation route works.

## 10. Workstream 2 / Phase 3 — Fix `/cv-maken-zonder-abonnement` CTA routing

This page owns no-subscription intent. It must not force a visitor who chose “make my CV” into template selection.

If a label promises creation, starting, or downloading, route directly to the professional-template editor. Only links explicitly labelled as template comparison may open `/templates`.

| Location | Required destination | Required source |
|---|---|---|
| header | `/editor?template=professional&startSource=nl_no_subscription_header` | `nl_no_subscription_header` |
| hero | `/editor?template=professional&startSource=nl_no_subscription_hero` | `nl_no_subscription_hero` |
| trust section | `/editor?template=professional&startSource=nl_no_subscription_trust` | `nl_no_subscription_trust` |
| comparison section | `/editor?template=professional&startSource=nl_no_subscription_comparison` | `nl_no_subscription_comparison` |
| download section | `/editor?template=professional&startSource=nl_no_subscription_download` | `nl_no_subscription_download` |
| bottom | `/editor?template=professional&startSource=nl_no_subscription_bottom` | `nl_no_subscription_bottom` |
| mobile sticky | `/editor?template=professional&startSource=nl_no_subscription_sticky` | `nl_no_subscription_sticky` |

All explicit secondary template links use `/templates?startSource=nl_no_subscription_templates`. Primary and template paths never share a source.

Replace hardcoded price literals in metadata, Open Graph, Twitter, FAQ, badges, and body with `cvDownloadPrice`. Preserve the canonical, free-build/full-preview boundary, per-separate-CV payment, and same-paid-CV re-download rule. Do not merge or redirect this page into `/prijzen`.

For every primary and template route test: signed-out click; login-code return; consumer editor rather than Agency; preserved template/source; exactly one CV; no unexpected return to templates; and no retention-policy requirement.

Exit gate: zero CTA-label/destination mismatches remain, including mobile sticky actions.

## 11. Workstream 3 / Phase 4 — Improve `/goedkoopste-cv-maker-nederland`

This page compares fully free/manual tools, paid one-time downloads, and trials/recurring subscriptions. It must state that a genuinely free tool is cheapest when zero cost is the only criterion, then explain when WerkCV's guided one-time route fits.

Prohibited: unqualified “WerkCV is cheapest”; best-price/value claims without methodology; stale competitor prices; accusations of hidden/deceptive conduct; conversion claims from five starts/two orders.

### 11.1 Locked metadata and opening

- Title: `Goedkoopste CV-maker Nederland: kosten vergeleken | WerkCV`
- H1: `Wat is de goedkoopste CV-maker in Nederland?`
- Description: `Vergelijk gratis CV-tools, eenmalige downloads en abonnementen. Zie actuele prijsmodellen, verlenging en wat WerkCV voor {display} inclusief btw biedt.`
- Intro: `Een volledig gratis tool is het goedkoopst als je alleen naar de prijs kijkt. Wil je een begeleide CV-builder zonder abonnement, vergelijk dan de eenmalige PDF-prijs, preview en voorwaarden.`

Do not put a calendar year in title/H1. Use visible checked dates instead.

### 11.2 First fold and CTA map

The first fold contains H1/direct answer, shared checked date, primary editor action, secondary template action, and methodology anchor.

| Location | Label | Destination |
|---|---|---|
| hero | Maak eerst gratis je CV | `/editor?template=professional&startSource=nl_cheapest_cv_hero` |
| hero secondary | Vergelijk templates | `/templates?startSource=nl_cheapest_cv_templates` |
| comparison result | Probeer WerkCV gratis | `/editor?template=professional&startSource=nl_cheapest_cv_comparison` |
| bottom | Maak je CV en bekijk het resultaat | `/editor?template=professional&startSource=nl_cheapest_cv_bottom` |
| mobile sticky | Start gratis | `/editor?template=professional&startSource=nl_cheapest_cv_sticky` |

Each comparison row shows official-source provider link, pricing model, verified initial/recurring cost, renewal, cancellation yes/no/unknown, checked date or unverified state, and neutral note. Explain the methodology and that features, export quality, privacy, support, and personal needs are not reduced to one score.

Use WebPage/Article and FAQ schema only when visible. Do not add Review, AggregateRating, or ranking ItemList schema.

Add one contextual link from `/prijzen`, `/cv-maken-zonder-abonnement`, relevant alternative pages, and at most two genuinely relevant cancellation pages. Do not insert it sitewide.

Exit gate: no stale numeric claim, the zero-cost answer remains honest, and direct editor attribution survives payment.

## 12. Workstream 4 / Phase 5 — English price and checkout repair

Complete A, B, and C before enabling D.

### 12.A Improve the commercial bridge on `/en`

Keep the existing primary English product promise and editor/upload CTAs. Do not turn the homepage into a pricing page.

Near the hero actions add one secondary text link:

- label: `See price and payment methods`;
- destination: `/en/pricing#payment-methods`;
- tracking location: `en_home:price_payment_methods`.

The hero price line uses `cvDownloadPrice.displayEn`:

`Build and preview free. Download the final PDF for {displayEn} including VAT. No subscription.`

Use shared price values in FAQ and structured data; remove scoped hardcoded values.

### 12.B Reposition `/en/pricing`

Use this exact contract:

- Title: `CV Builder Netherlands Price: {displayEn}, No Subscription | WerkCV`
- Description: `Build and preview your Netherlands-ready CV for free. Pay {displayEn} once, including VAT, for the final PDF. No trial, subscription or automatic renewal.`
- H1: `CV builder for the Netherlands: {displayEn} once, no subscription`
- Support: `Build, edit, change templates and review every page free. Pay only when you download the final PDF.`

The first fold shows exact price including VAT, no subscription, full preview before payment, same-paid-CV re-download, primary editor CTA, and `How payment works` anchor.

Use sources `en_pricing_hero`, `en_pricing_card`, `en_pricing_bottom`, `en_pricing_sticky`, and optional `en_pricing_templates`.

Add `id="payment-methods"` to the actual visible payment-method section. Explain:

- checkout is hosted by the configured payment provider;
- final methods are shown in checkout;
- methods vary by country, device, bank, currency, and provider configuration;
- iDEAL, cards, Apple Pay, or Google Pay may be available only when live checkout offers them;
- WerkCV does not guarantee a method before the provider displays it.

Do not add logos for unverified methods.

Add contextual `/en/pricing` links from `/en`, `/en/templates`, `/en/dutch-cv-template`, the English format guide, and English FAQ/footer where the information architecture supports them.

Use `hreflang` only for real equivalents. `/prijzen` and `/en/pricing` are equivalents; `/cv-maken-zonder-abonnement` is not automatically one.

### 12.C Certify the English checkout path

Test with an authorised account and provider-safe method:

1. `/en` direct editor start;
2. `/en` upload start;
3. `/en/pricing` editor start;
4. signed-out login and return;
5. English editor state;
6. full preview;
7. exact price before checkout;
8. checkout creation;
9. hosted-checkout locale and methods;
10. cancelled return;
11. successful return;
12. webhook/order reconciliation;
13. PDF download;
14. later edit/re-download of the same paid CV;
15. separate new CV requiring its own payment.

Every error and recovery action is English. No English path may route to `/agency/account`, require Agency retention, or send users to Dutch templates. Record actual payment-method availability by tested context; do not infer it from docs alone.

### 12.D Controlled English checkout-recovery experiment

Use the existing `FollowupTask`/`FollowupContact` queue and manual approval/sending controls. Do not add a separate mail service.

Feature flag: `ENGLISH_CHECKOUT_RECOVERY_ENABLED=false`

The flag defaults off everywhere. Enabling it may create experiment tasks but must not bypass approved-task sending.

Eligibility:

- consumer CV only;
- English context proven by `sourceLocale`, English `startSource`, or English landing path; never infer from email/name;
- checkout event tied to a specific `cvId`;
- no paid order for that exact CV after checkout;
- checkout at least 4 hours and at most 7 days old;
- valid user email associated with the CV;
- not owner, employee, test, example-domain, Agency, or MatchPack;
- active contact status;
- no previous recovery for that CV;
- no suppressing inbound reply/do-not-contact instruction;
- CV still exists and belongs to that user.

Assignment:

- deterministic stable hash of experiment version plus `cvId`;
- 25% holdout and 75% treatment;
- persist both as `FollowupTask` type `checkout_recovery_en_v1`;
- treatment begins `draft`; holdout status is `holdout` and sender can never select it;
- repeated scans retain assignment;
- store no CV content in task reason/body or analytics.

Before send, atomically re-check exact-CV payment and contact eligibility. Otherwise mark `skipped` with a non-sensitive reason.

Recovery link requirements:

- exact same CV via server-known ID;
- configured canonical HTTPS origin, never request `Host`;
- authenticated clean English editor/download-intent route;
- login returns to the same CV;
- no raw session token, email, CV content, or payment token in URL;
- server-side ownership check.

Email requirements:

- one maximum per CV;
- no discount, urgency, scarcity, guilt, or assertion that payment failed;
- dynamic exact one-time price and no-subscription statement;
- secure return link and reply route;
- plain stop-follow-up instruction;
- monitored reply-to inbox.

Suggested subject: `Your WerkCV is still available`

Required meaning:

`You reached checkout for your CV, but the PDF was not purchased. Your CV is still available. You can review it again and, if you choose, download the final PDF for {displayEn} including VAT. This is a one-time payment, not a subscription. If checkout did not work, reply and tell us what happened. If you do not want a reminder like this, reply “stop”.`

Do not send until the owner approves final copy and records confirmation of the applicable email/privacy basis. Otherwise keep flag off and draft-only.

Primary outcome: incremental paid-CV rate within seven days of assignment, treatment versus holdout, joined to the same `cvId`. Secondary: time to purchase, reply, support/problem reply, and opt-out. Opens/clicks are diagnostic only if already available without third-party tracking. Report sample sizes/confidence intervals and stop or review after 30 days.

Exit gate: English checkout is certified before tasks can be generated; sending remains impossible without feature flag plus existing approval controls.

## 13. Workstream 5 / Phase 6 — Machine-readable discovery

Update `lib/ai-discovery.ts` with exactly these missing high-priority entries:

1. `/en` — English CV builder for the Netherlands;
2. `/en/pricing` — one-time English CV pricing and payment explanation;
3. `/en/dutch-cv-template` — English Dutch-market template guidance;
4. `/en/guides/cv-format-netherlands-english` — English Netherlands CV-format guide.

Do not add `/cv-maken-eenmalig-betalen`, `/goedkoopste-cv-maker-nederland`, `/cv-downloaden-zonder-abonnement`, or every commercial variation to the primary list in this release.

Set `aiDiscoveryUpdatedAt` to the actual release date in UTC, never a future date.

Required first-twelve order:

1. `/`
2. `/cv-maken`
3. `/prijzen`
4. `/cv-maken-zonder-abonnement`
5. `/en`
6. `/en/pricing`
7. `/en/dutch-cv-template`
8. `/en/guides/cv-format-netherlands-english`
9. `/templates`
10. `/cv-voorbeelden`
11. `/cv-tips`
12. `/faq`

Retain remaining useful tool, Agency, privacy, profile-photo, expat, and role entries without duplicate URLs. Consolidate the current duplicate `/en/expat-cv-netherlands` into one accurate entry.

Every description must match the visible canonical page, use shared price when relevant, distinguish free build/preview from paid PDF, avoid superlatives/citation promises, and use a production URL without tracking.

Verify `/llms.txt`, `/ai/summary.json`, `/ai/service.json`, `/ai/faq.json`, and `/rss.xml`. If RSS takes the first twelve entries, test the intentional order so unrelated insertion cannot silently change it.

Add/update English AI FAQ answers:

- “What does WerkCV cost?” -> `/en/pricing`;
- “Is WerkCV a subscription?” -> `/en/pricing`;
- “Can I preview before paying?” -> `/en/pricing`;
- “Where can I find a Dutch CV template in English?” -> `/en/dutch-cv-template`.

Do not claim `llms.txt` is an official ranking standard. These routes improve consistent machine-readable access only.

Exit gate: all four English pages appear consistently, no URL duplicates, every URL returns 200, descriptions match visible copy, and update date is truthful.

## 14. Workstream 6 / Phase 7 — Supporting pages and expansion hold

### 14.1 `/en/dutch-cv-template`

Keep template intent and educational content. Immediately below the opening paragraph and near first CTAs render:

`Build and preview free · Final PDF {displayEn} including VAT · No subscription`

Use `cvDownloadPrice.displayEn` and replace hardcoded price in trust points/FAQ.

- Primary label: `Use this template in the editor`
- Primary destination: `/en/editor?template=professional&startSource=en_dutch_cv_template_hero`
- Secondary label: `Compare English templates`
- Secondary destination: `/en/templates?startSource=en_dutch_cv_template_compare`
- Trust link: `/en/pricing#payment-methods`

Retain unique mid/bottom sources. Do not say “free download”; explain the real free/paid boundary.

### 14.2 `/en/guides/cv-format-netherlands-english`

Keep the guide informational. Near the first product action add:

`Use the guide free, build and preview free, and pay {displayEn} including VAT only if you download the final PDF. No subscription.`

- Primary: `/en/editor?template=professional&startSource=en_cv_format_guide_hero`
- Secondary: `/en/templates?startSource=en_cv_format_guide_templates`
- Trust link: `/en/pricing#payment-methods`

Do not add a full price table, aggressive modal, or sticky purchase takeover. Preserve useful sources/examples without requiring purchase.

### 14.3 `/cv-downloaden-zonder-abonnement`

Do not rewrite unless the baseline finds a functional/factual defect. Add no more than four natural contextual links from `/prijzen`, `/cv-maken-zonder-abonnement`, `/faq` when relevant, and one template/export help section. Its direct editor CTA uses unique source `nl_no_subscription_download_page`.

Treat it as a 30-day discovery test. Do not add it to primary AI discovery or create siblings.

### 14.4 Freeze new role pages

Do not add a fifth logistics/warehouse role page or a new occupational cluster. Apply the existing gate in `docs/product/english-role-cv-example-cluster-spec.md`:

- reliable role attribution;
- no unresolved routing/payment defect;
- at least 20 non-internal attributed signups or 5 paid orders per role, whichever comes first, before interpreting beyond directional;
- distinct user problem/content brief;
- named reviewer and current official sources.

Below the gate, keep useful pages live but call results inconclusive. One order does not justify mass expansion.

Exit gate: support pages expose the price boundary without losing informational value and no out-of-scope page was added.

## 15. Attribution and analytics contract

### 15.1 Source propagation

Every new `startSource` must be accepted by the normalizer, at most 80 characters, lowercase ASCII letters/digits/underscores only, and survive templates, editor, login, draft claim, saved CV, checkout events, and paid attribution. It must contain no email, name, CV text, query, or arbitrary input.

Keep first-touch landing path and CTA source as separate dimensions.

### 15.2 Funnel definitions

Report unique non-internal consumer users through:

1. landing: `landing` or `page_view` on exact canonical path;
2. CTA: `landing_cta_click`/`cta_clicked` with location;
3. created: persisted consumer `CVDocument` or tied `cv_created`/`start_cv`;
4. meaningful: persisted `hasMeaningfulContent` checked by current classifier;
5. preview: `full_preview_opened` tied to CV;
6. download intent: `full_preview_download_clicked` or `pdf_download_started`;
7. checkout: `checkout_start`, `checkout_started`, or `checkout_option_clicked` tied to CV;
8. paid: `Order.paidAt` for exact same CV;
9. downloaded: `pdf_download_completed` after paid order.

The certified report must not treat “same email paid for another CV” as payment for this CV. Orders without exact `cvId` attribution remain unattributed.

### 15.3 Dimensions and exclusions

Break down by first-touch path, CTA source, locale, safe device class, acquisition source, new/returning when supported, checkout failure category, and payment outcome.

Exclude:

- `dhinesh217@gmail.com`;
- `dhineshkumar.stoic@gmail.com`;
- `@werkcv.nl`;
- `@example.com`;
- plus-address/explicit test accounts;
- Agency/MatchPack CVs and purchases;
- synthetic E2E records;
- refunded/test-provider orders when distinguishable.

Centralize exclusions in one predicate used by reports and follow-up selection; reconcile current inconsistent lists.

### 15.4 Data quality

- `Order` remains revenue truth.
- Missing paid/checkout analytics events are warnings.
- Meaningful-content mismatches are certification failures.
- Preview is untrusted until event coverage is demonstrated.
- Never fabricate/backfill events for monotonicity.
- Report legacy redirect/generic sources separately.
- Store no CV content, filename, email, or free-form text in analytics.

## 16. Automated and manual tests

Use existing repository Node/TypeScript test conventions; do not add a framework solely for this release.

### 16.1 Unit tests

- scoped pages import `cvDownloadPrice` and contain no hardcoded consumer-price literals;
- competitor schema rejects invalid dates/status/models;
- stale/unavailable facts suppress exact price;
- latest checked date calculates correctly;
- required CTAs exactly match the specification;
- new sources pass normalization/length limits;
- old one-time route redirects to `/prijzen` and is absent from sitemap/discovery;
- four English discovery routes occur once and first-twelve order is stable;
- discovery has no duplicate URL;
- AI FAQ uses required English canonicals;
- treatment/holdout assignment is deterministic over fixed fixtures;
- recovery excludes paid, Agency, test, do-not-contact, replied, stale, and contacted cases;
- send-time paid check skips ineligible tasks;
- exact-CV paid attribution does not fall back to another CV for the same email.

### 16.2 Integration tests

- signed-out Dutch CTA -> login -> consumer editor -> one CV -> source preserved;
- signed-in Dutch CTA -> editor without template detour;
- explicit template comparison -> gallery -> editor -> source preserved;
- English routes remain English through login/editor;
- `/en/pricing#payment-methods` locates a visible section;
- checkout uses configured consumer product/amount;
- cancel return preserves CV/English locale;
- webhook reconciles order to exact CV;
- same paid CV re-download is free, separate CV unpaid;
- no Agency retention gate on consumer route;
- repeated follow-up scan creates one stable assignment;
- sender cannot select holdout;
- payment between scan/send causes skip;
- analytics contains safe categories/IDs only.

### 16.3 End-to-end scenarios

Use fictional accounts and CV data only.

1. `/prijzen` signed out -> authenticate -> meaningful CV -> preview -> safe payment -> download.
2. Every no-subscription primary CTA; none may open templates.
3. Explicit template link -> choose template -> editor with distinct source.
4. Cheapest page -> inspect sources/dates -> editor -> attribution.
5. `/en` and `/en/pricing` on mobile/desktop, including cancel/success.
6. Every English screen/error remains English.
7. Re-download same paid CV without payment; new CV has own gate.
8. Old route with query string permanently redirects without loop.
9. Fetch sitemap, `llms.txt`, AI JSON, RSS; required URLs and no duplicates/old route.
10. Recovery dry-run fixtures: treatment, holdout, paid-before-send, do-not-contact, Agency, test.
11. Keyboard/screen-reader navigation for changed actions/sections.
12. At 320, 375, 768, and 1440 px: no horizontal scroll, clipping, sticky overlap, or hidden CTA.

Run repository checks:

- `npm run lint`;
- focused Node/TypeScript tests;
- `npm run build`;
- production migration status/rehearsal required by the current release process;
- `git diff --check`.

A successful build alone is not acceptance.

## 17. Content and design acceptance criteria

### All scoped pages

- [ ] One clear H1.
- [ ] Title, H1, opening, and internal anchors describe the same owned intent.
- [ ] Exact price and free/paid boundary agree.
- [ ] Primary starts editor; template action explicitly says compare templates.
- [ ] No fake review, urgency, savings, discount, or performance claim.
- [ ] No stale competitor number.
- [ ] External comparison links follow repository safety conventions.
- [ ] Visible FAQs match FAQ schema.
- [ ] Absolute correct canonical.
- [ ] Reciprocal `hreflang` only for real equivalents.
- [ ] Sticky CTA does not obscure content/footer.
- [ ] 200% zoom readability and visible focus.

### English quality

- [ ] Price uses `displayEn`.
- [ ] Every user-facing string is English.
- [ ] CV/resume words are natural, not stuffed.
- [ ] Netherlands context avoids universal-employer claims.
- [ ] Payment-method language is conditional and verified.
- [ ] No automatic language redirect blocks English URLs.

### Comparison quality

- [ ] Free alternatives represented honestly.
- [ ] One-time/trial/recurring/mixed models remain distinct.
- [ ] Every exact price has official source and fresh date.
- [ ] Unknown remains unknown.
- [ ] WerkCV row uses checkout's shared price.

## 18. Release gates and rollout

### Release A — Page truth, routes, and discovery

Deploy only when Phases 0–7 except recovery sending pass; lint/tests/build/migration status/diff check pass; desktop/mobile checks pass; production-compatible checkout smoke passes; competitor facts are within 45 days; and implementation report is complete.

Deploy page, CTA, price-source, support-page, and discovery changes together so metadata and visible content remain consistent.

### Release B — Recovery code, flag off

Deploy with `ENGLISH_CHECKOUT_RECOVERY_ENABLED=false`. Verify dry-run selection against fictional fixtures and a read-only production audit. Do not generate/send live tasks.

### Release C — Controlled experiment

Enable generation only after English checkout has no unresolved defect, owner approves copy and records the contact/privacy basis, deterministic holdout/exact-CV checks pass, send-time suppression is verified, inbox is monitored, and rollback is documented.

Sending still requires task approval. Stop immediately for wrong recipient/CV, email after payment, inability to honor stop, Agency/test inclusion, material complaint, or broken return/auth route.

## 19. Measurement windows and decisions

Record deploy commit and UTC timestamp.

### Seven-day safety review

Review route errors, loops, checkout failures, payment/webhook mismatch, language leakage, support contacts, mobile defects, and attribution gaps. This is not an SEO conclusion window.

### Thirty-day conversion review

For each page/source report qualified landings, starts, meaningful CVs, preview with coverage warning, checkout, paid users/orders, elapsed time, device, locale, acquisition source, legacy/unattributed, date window, and sample size.

Do not name a winner below 20 non-internal attributed starts or 5 paid orders. Label lower samples directional/insufficient.

### Search review

Compare 28 complete days before and after while recording deploy/indexing dates. Report impressions, clicks, CTR, and average position by canonical/owned query. State seasonality/query-mix limitations.

### Recovery decision

After 30 days or a predeclared sufficient sample, whichever is later: continue only for defensible incremental treatment lift without trust harm; revise for clear reply evidence; stop if no lift/harm; never substitute opens for holdout comparison.

### Expansion decision

No new keyword/role page until the funnel remains certified, role gate is met, intent is distinct from section 4 owners, demand evidence exists, and useful content brief exists independently of keyword.

## 20. Expected implementation files

Expected areas, after inspection:

- `lib/site-content.ts`;
- new `lib/commercial/consumer-cv-pricing.ts` plus tests;
- `app/prijzen/page.tsx`;
- `app/cv-maken-zonder-abonnement/page.tsx` and content module;
- `app/goedkoopste-cv-maker-nederland/page.tsx`;
- `app/en/page.tsx`;
- `app/en/pricing/page.tsx`;
- `app/en/dutch-cv-template/page.tsx`;
- registry/page behind the English format guide;
- Dutch download page only if source routing is missing;
- limited FAQ/template/help contextual links;
- `lib/ai-discovery.ts` and consumer tests;
- `next.config.ts`/redirect tests without removing redirect;
- conversion/attribution reports/tests;
- follow-up scripts only for gated recovery;
- dated implementation report.

Do not assume every listed file needs edits. Make the smallest coherent change. Do not touch Agency, MatchPack, unrelated SEO, template designs, or global branding.

## 21. Required implementation report

Create `docs/product/werkcv-six-item-organic-conversion-implementation-report.md` containing:

1. scope/non-scope;
2. baseline and release commits;
3. exact changed files;
4. competitor sources, facts, verifier, checked dates;
5. old/new metadata, H1, CTA map;
6. source-propagation evidence;
7. English checkout matrix by route/device/outcome;
8. sitemap/canonical/hreflang/redirect/schema/discovery/RSS checks;
9. automated results;
10. screenshot paths;
11. recovery flag and whether any real task/email occurred;
12. limitations/deferred work;
13. rollback target/steps;
14. seven-day/thirty-day review dates.

Never mark an item “looks good”; link evidence.

## 22. Final acceptance checklist

- [ ] `/prijzen` owns one-time intent and uses shared price everywhere.
- [ ] Old one-time route permanently redirects and is absent from discovery.
- [ ] Every no-subscription creation CTA opens editor, not templates.
- [ ] Cheapest page distinguishes free, one-time, recurring honestly.
- [ ] Every competitor price is fresh or omitted.
- [ ] `/en` links clearly to price/payment without weakening primary CTA.
- [ ] `/en/pricing` has aligned metadata, payment-method section, dynamic price.
- [ ] English editor/login/checkout/cancel/success/download is certified.
- [ ] Recovery remains flag-off and controlled until activation gate.
- [ ] Four required English URLs occur once in AI discovery.
- [ ] Template and format guide state free/paid boundary near first CTA.
- [ ] Dutch download page receives only limited link test.
- [ ] No new role/generic keyword page.
- [ ] Paid attribution uses exact CV and exclusions.
- [ ] Preview limitations remain visible until certified.
- [ ] Tests, build, mobile, schema, route checks pass.
- [ ] Implementation report provides evidence.

If any required item fails, do not call the release production-ready.
