# WerkCV six-item organic conversion implementation report

Date: 2026-08-30
Specification: `docs/product/werkcv-six-item-organic-conversion-spec.md`
Status: implemented locally; not deployed; English live-checkout certification still required before recovery generation can be enabled.

## 1. Outcome

The six approved workstreams are implemented:

1. `/prijzen` now exposes the one-time price, free-build/full-preview boundary, no-subscription model, same-paid-CV re-download rule and direct editor CTAs above the fold.
2. `/cv-maken-zonder-abonnement` uses direct editor routes for creation actions and separate template-comparison routes.
3. `/goedkoopste-cv-maker-nederland` now gives the honest zero-cost answer first, uses official dated pricing sources, distinguishes trials/subscriptions, and suppresses stale exact competitor prices.
4. The English homepage, pricing page, templates and support guides now share the exact price and payment boundary. A controlled English checkout-recovery capability exists but is disabled and certification-gated.
5. AI-discovery surfaces now include the four required English routes in the specified order, with no duplicate URL.
6. The English Dutch-template and Netherlands-format pages have transparent commercial bridges. The Dutch download page receives a limited unique-source discovery route. No new role cluster or generic content page was added.

## 2. Evidence and assumptions

Competitor pricing facts were checked on 2026-08-30 against official provider pages only:

- YoungCapital: `https://www.youngcapital.nl/sollicitatietips/cv/gratis-cv-maken`
- Canva: `https://www.canva.com/nl_nl/maken/cv/`
- CV.nl: `https://www.cv.nl/pricing`
- CVMaker: `https://www.cvmaker.nl/help/wat-kost-cvmaker-nl`
- CVster: `https://cvster.nl/pricing`

The facts live in one validated registry. Exact competitor prices disappear after 45 days unless the checked date is refreshed. This corrected the previous CVMaker trial price from €1.99 to the currently published €2.99.

No named payment method is guaranteed. English copy states that the configured provider hosts checkout and that the live methods shown can depend on country, device, bank, currency and provider configuration.

## 3. Changed files

Commercial pricing and pages:

- `lib/commercial/consumer-cv-pricing.ts`
- `lib/commercial/consumer-cv-pricing.test.ts`
- `app/prijzen/page.tsx`
- `app/cv-maken-zonder-abonnement/content.ts`
- `app/cv-maken-zonder-abonnement/page.tsx`
- `app/goedkoopste-cv-maker-nederland/page.tsx`
- `app/cv-downloaden-zonder-abonnement/page.tsx`
- `app/cv-maken-eenmalig-betalen/page.tsx`

English flow:

- `app/en/page.tsx`
- `app/en/pricing/page.tsx`
- `app/en/templates/page.tsx`
- `app/en/dutch-cv-template/page.tsx`
- `app/en/guides/[slug]/page.tsx`
- `app/en/editor/page.tsx`
- `app/editor/editor.tsx`

Discovery, attribution and recovery:

- `lib/ai-discovery.ts`
- `lib/consumer-analytics-exclusions.ts`
- `lib/conversion-funnel.ts`
- `lib/checkout-recovery.ts`
- `lib/checkout-recovery.test.ts`
- `lib/organic-conversion-contract.test.ts`
- `scripts/followups-scan.ts`
- `scripts/followups-send.ts`
- `.env.example`
- `package.json`

No Prisma schema or migration was added.

## 4. Metadata, H1 and CTA contracts

### `/prijzen`

- Title: `CV maken kosten: €4,99 per PDF, eenmalig betalen | WerkCV`
- H1: `Maak en bekijk je CV gratis. Download voor €4,99.`
- Sources: `nl_pricing_hero`, `nl_pricing_card`, `nl_pricing_bottom`, `nl_pricing_sticky`; template comparison uses `nl_pricing_templates`.

### `/cv-maken-zonder-abonnement`

- H1 remains the canonical no-subscription owner.
- Direct sources: `nl_no_subscription_header`, `nl_no_subscription_hero`, `nl_no_subscription_trust`, `nl_no_subscription_comparison`, `nl_no_subscription_download`, `nl_no_subscription_bottom`, `nl_no_subscription_sticky`.
- Template comparison is separated as `nl_no_subscription_templates`.

### `/goedkoopste-cv-maker-nederland`

- Title: `Goedkoopste CV-maker Nederland: kosten vergeleken | WerkCV`
- H1: `Wat is de goedkoopste CV-maker in Nederland?`
- Sources: `nl_cheapest_cv_hero`, `nl_cheapest_cv_templates`, `nl_cheapest_cv_comparison`, `nl_cheapest_cv_bottom`, `nl_cheapest_cv_sticky`.

### `/en`

- Keeps the English CV-builder product promise and the existing editor/upload actions.
- Adds `See price and payment methods` to `/en/pricing#payment-methods` with location `en_home:price_payment_methods`.
- Shared price copy: build and preview free; final PDF €4.99 including VAT; no subscription.

### `/en/pricing`

- Title: `CV Builder Netherlands Price: €4.99, No Subscription | WerkCV`
- H1: `CV builder for the Netherlands: €4.99 once, no subscription`
- Sources: `en_pricing_hero`, `en_pricing_card`, `en_pricing_bottom`, `en_pricing_sticky`.
- The visible payment section has `id="payment-methods"`.

### Support routes

- `/en/dutch-cv-template`: `en_dutch_cv_template_hero` and `en_dutch_cv_template_compare`.
- `/en/guides/cv-format-netherlands-english`: `en_cv_format_guide_hero` and `en_cv_format_guide_templates`.
- `/cv-downloaden-zonder-abonnement`: direct creation uses `nl_no_subscription_download_page`; template comparison is separate.
- `/cv-maken-eenmalig-betalen`: permanent redirect to `/prijzen`; absent from sitemap and AI discovery.

## 5. Recovery safety state

Task type: `checkout_recovery_en_v1`.

Generation requires both:

- `ENGLISH_CHECKOUT_RECOVERY_ENABLED=true`
- `ENGLISH_CHECKOUT_CERTIFIED=true`

Sending additionally requires:

- task status `approved`;
- treatment assignment, never holdout;
- `ENGLISH_CHECKOUT_RECOVERY_OWNER_APPROVED=true`;
- `ENGLISH_CHECKOUT_RECOVERY_PRIVACY_BASIS_CONFIRMED=true`;
- a fresh transactional re-check of exact-CV payment, ownership, consumer status, contact status and inbound replies.

Assignment is a deterministic SHA-256-based 75% treatment / 25% holdout split. Both assignments use the existing `FollowupTask` queue. The link uses the configured canonical HTTPS origin, exact server-known CV ID and English `downloadIntent`; login preserves that intent and the editor opens the final preview, then removes the intent parameter from browser history.

Current state: every flag defaults to false. No recovery task was created and no email was sent during implementation or verification.

## 6. AI-discovery contract

The first twelve `primaryAiPages` entries now follow the specified order:

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

The duplicate `/en/expat-cv-netherlands` entry was removed. English AI FAQ answers now use English pricing/template canonicals. `aiDiscoveryUpdatedAt` is `2026-08-30`.

## 7. Verification

Automated:

- `npm run test:organic-conversion`: 17 passed, 0 failed.
- `npx tsc --noEmit --pretty false`: passed.
- focused ESLint on all changed implementation files: passed.
- `npm run build`: passed; 550 static pages generated.

The full repository lint still reports eight pre-existing CommonJS `require()` errors in the WordPress/local sandbox and legacy pilot script, plus unrelated warnings. None is in a file changed by this workstream.

Build notes:

- One build attempt failed only because Google Fonts was temporarily unreachable; the retry with network access passed.
- Static generation logged a non-fatal dynamic-font warning for the glyph `✓`. The build completed.

Responsive browser checks against the production build:

- Routes checked: `/prijzen`, `/cv-maken-zonder-abonnement`, `/goedkoopste-cv-maker-nederland`, `/cv-downloaden-zonder-abonnement`, `/en`, `/en/pricing`, `/en/dutch-cv-template`, `/en/guides/cv-format-netherlands-english`.
- Widths checked: 320, 375, 768 and 1440 px.
- All final routes: no document-level horizontal overflow.
- All desktop routes: first editor action visible above the fold.
- English pricing: exact title and visible `#payment-methods` section verified.
- The 320px comparison-table overflow found during QA was fixed and re-verified.

## 8. Not yet certified

The live payment-provider matrix in specification section 12.C still requires an authorised production-compatible account and provider-safe payment method. This implementation did not execute a real purchase, webhook, refund or production email. Therefore:

- `ENGLISH_CHECKOUT_CERTIFIED` must remain false;
- recovery generation and sending must remain off;
- no claim is made about which payment methods will appear for a particular user;
- deployment should be followed by the documented signed-out/login/cancel/success/webhook/download/re-download/separate-CV test.

## 9. Rollback

UI/content/discovery changes can be reverted as one release. Keep all recovery flags false during rollback. Because this release adds no database migration and creates no recovery records while disabled, rollback does not require data transformation.
