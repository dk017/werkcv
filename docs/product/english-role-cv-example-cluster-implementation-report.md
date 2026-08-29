# English role-based CV example cluster — implementation report

Status: implemented locally; production publication still requires manual smoke testing and deployment approval
Date: 2026-08-29
Specification: `docs/product/english-role-cv-example-cluster-spec.md`

## Delivered

- Kept `/en/english-cv-example-logistics-warehouse-netherlands` stable and updated the first fold, fictional-data warning, evidence map, no-number guidance, English/Dutch vocabulary, Netherlands context, source review dates, price/no-subscription copy, FAQs, and related links.
- Added exactly three adjacent role pages:
  - `/en/english-cv-example-forklift-reach-truck-netherlands`
  - `/en/english-cv-example-order-picker-fulfilment-netherlands`
  - `/en/english-cv-example-logistics-coordinator-netherlands`
- Added a typed shared role-page renderer and fictional CV fixture factory. Each sample uses synthetic names, `example.com` email addresses, fictional employers/training records, and role-specific evidence.
- Added visible static previews, example and own-CV upload CTAs, mobile-safe wrapping, and a shared one-time-price/no-subscription statement sourced from `cvDownloadPrice`.
- Added role-specific attribution sources (`en_role_example_<role>`, with `_upload` for own-CV starts), server allow-listing, safe login return propagation, pending-example continuity, and deterministic CV-source attribution.
- Added durable `cv_created` markers for role-example CVs. Analytics failures are caught and do not prevent CV creation.
- Added role, page, entry-method, language, and device dimensions to the relevant editor/preview/download events. Raw user-agent strings are no longer emitted in analytics logs.
- Added the private admin report at `/admin/analytics/english-role-examples` with role rows, landing paths, meaningful-CV counts, paid orders/revenue, device diagnostics, and data-quality warnings. The report excludes configured internal/test users, Agency users, malformed role sources, and orders that cannot be joined to a valid role-example CV.
- Added sitemap, English index, AI-discovery, and internal related-link entries for all four pages.

## Attribution and reporting definition

The report counts unique users from durable CV records and joins paid truth through `Order.cvId` and `paidAt`. It does not infer a role from an email address or referrer. Role-page visitors and starts are separate anonymous visitor/session diagnostics. Legacy and malformed sources are surfaced as data-quality warnings instead of being guessed into a role.

The role report is intentionally private. It must not be used as a public conversion claim until visitor/test identifiers and environment exclusions have been checked for the selected period.

## Verification completed

- `npm run test:english-role-examples` — passed (7 tests).
- `npx tsc --noEmit --pretty false` — passed.
- `npm run lint:ci` — passed with `--max-warnings=0`.
- `npm run build` — passed; all 550 static pages generated and all three new routes appeared in the route manifest.
- `git diff --check` — no content errors; Git reports normal LF/CRLF conversion warnings for edited files.

The build emitted one pre-existing/non-blocking dynamic-font download warning during static generation (`Status: 400`); it did not fail compilation or page generation and should be checked separately if the production font endpoint is expected to be available at build time.

## Manual release gate still required

Use fictional data only and verify in a production-like environment:

1. Open each role page signed out at desktop and 320/375px widths.
2. Click “Use this example — free to edit”, complete email-code login, and confirm the exact fictional sample and role-specific source appear in the English editor.
3. Repeat while already authenticated.
4. Click “Start with my own CV” and confirm the English editor opens the upload-first state with the parent role attribution.
5. Edit a field, open full preview, and confirm the edited text is present.
6. Run the normal one-time checkout test and confirm the paid order is joined to the CV’s role source in the private report.
7. Open the report and inspect device counts, legacy/unattributed warnings, and Agency/test exclusions before treating any rate as a baseline.

No new database migration, price change, ranking claim, ATS claim, or public performance claim was introduced. The three new pages should remain a small measured cluster until the review threshold in the specification is reached.

## Baseline context

The pre-implementation logistics diagnostic was an all-time production snapshot, not an experiment: 56 page views, 36 distinct visitors, 11 starts, 3 non-owner attributed signups, and 1 paid order joined to a CV source. The snapshot is directional and is not published as a conversion rate. The new report is the repeatable measurement surface for the post-release review window.
