# WerkCV cited-authority conversion bridge implementation report

Status: Implemented; release certification is incomplete until database-backed and authenticated checks pass
Review date: 2026-08-31
Specification: `docs/product/werkcv-cited-authority-conversion-bridge-spec.md`

## Outcome

Six cited consumer routes now use one typed route/source contract, a shared intent-aware bridge, safe editor focus, fictional-example attribution, and a private route-to-paid report. Useful content remains before the principal action and all consumer PDF price copy comes from `cvDownloadPrice`.

No migration, price/Agency entitlement change, deployment, email, checkout, or production write was performed.

## Route mapping

| Route | Source | Destination |
|---|---|---|
| `/vaardigheden-cv-voorbeelden` | `cited_authority_skills` | Dutch consumer editor, professional, skills focus |
| `/profieltekst-cv-voorbeelden` | `cited_authority_profile` | Dutch consumer editor, professional, profile focus |
| `/cv-tips/cv-maken-in-het-engels` | `cited_authority_english_cv` | English consumer editor/document, professional, profile focus |
| `/cv-voorbeelden/studenten-en-starters/student-cv` | `cited_authority_student_example` | Complete fictional student fixture, `jobboss` template/theme |
| `/cv-voorbeelden/zakelijk-en-financieel/administratief-medewerker` | `cited_authority_admin_example` | Complete fictional administrative fixture/template/theme |
| `/cv-template-administratief-medewerker` | `cited_authority_admin_template` | Complete fictional administrative fixture, professional template |

The two administrative routes share an intent but keep separate sources; report views are disambiguated by canonical slug.

## Implementation

- Shared contracts/reporting: `lib/cited-authority-conversion.ts`, `lib/editor-focus.ts`, `lib/cited-authority-funnel.ts`, `lib/cited-authority-conversion.test.ts`, `lib/admin-analytics.ts`, `app/admin/analytics/page.tsx`, `package.json`.
- Shared UI/flow: `components/conversion/*`, `components/analytics/TrackedLandingLink.tsx`, `components/cv-voorbeelden/UseExampleButton.tsx`, `components/cv-voorbeelden/RoleCvPrefillPanel.tsx`, `lib/pending-example-cv.ts`, `lib/role-cv-conversions.ts`.
- Route integration: the six scoped page renderers plus `app/cv-gids/[slug]/page.tsx`.
- Editor integration: `app/editor/page.tsx`, `app/en/editor/page.tsx`, `app/editor/editor.tsx`, `app/editor/sections.tsx`.

## Visual, canonical, and login checks

All six routes rendered at 320, 375, 768, 1024, and 1440 CSS pixels (30 combinations). Each had no horizontal overflow, the expected bridge/action, a primary target at least 44px high, visible price/no-subscription copy, no fixed/sticky bridge descendant, a footer, and the correct non-`www` canonical.

Logged-out handoffs preserved exact safe internal state:

- skills: `/login?next=%2Feditor%3Ftemplate%3Dprofessional%26startSource%3Dcited_authority_skills%26focus%3Dskills`;
- profile: `/login?next=%2Feditor%3Ftemplate%3Dprofessional%26startSource%3Dcited_authority_profile%26focus%3Dprofile`;
- English: `/login?next=%2Fen%2Feditor%3Ftemplate%3Dprofessional%26startSource%3Dcited_authority_english_cv%26focus%3Dprofile`.

Tests reject malformed focus, unsafe pending sources/data/templates/themes and external paths. Example actions have request and editor duplicate guards; pending data is consumed only after success and remains retryable after failure.

## Analytics and reporting

Safe event contracts contain bounded route/source metadata only. No new event contains CV/fixture text, selected skills/profile text, name, email, or filename.

The report uses distinct visitors, CVs, and users; `hasMeaningfulContent`; diagnostic full-preview events; and paid `Order` rows joined to the actual CV. It counts `cv-download` and the CV-inclusive bundle, excludes configured owner/test/example accounts, plus aliases, Agency documents, and `codex_test`, and displays an em dash for zero denominators.

Fixture tests cover repeats, cross-route visitors, two CVs per user, meaningful/non-meaningful CVs, preview, abandoned checkout, paid/unpaid/bundle/irrelevant orders, excluded users, Agency CVs, revenue, and median time.

Actual SQL execution is not certified: local Prisma returned `ECONNREFUSED`.

## English-CV content review

Removed or narrowed unsupported percentage/company/ATS claims, universal work-before-education advice, automatic Dutch degree/title translations, inflated job-title mappings, “ATS words not synonyms,” “British English is the European standard,” and overconfident photo/legal wording.

Visible sources and Article JSON-LD citations now agree:

- UK National Careers Service, `How to write a CV`;
- Europass, `Create your Europass CV`;
- Nuffic, `Diploma description: your Dutch diploma abroad`;
- Nuffic, `Level of Dutch diplomas`.

The shared source introduction was also corrected so it no longer tells unrelated articles to open LinkedIn Help.

## Verification results

- `npm run test:cited-authority-conversion`: 15/15 passed.
- `npm run test:conversion-funnel`: 13/13 passed.
- `npm run test:organic-conversion`: 17/17 passed.
- `npx tsc --noEmit --pretty false`: passed.
- Focused ESLint for every scoped file: passed.
- `npm run build`: passed; 550 static pages generated.
- `git diff --check`: passed (line-ending notices only; no whitespace errors).

Full `npm run lint` is not green because of eight unrelated, pre-existing CommonJS-import errors in `local/wordpress-sandbox/capture-screenshots.cjs`, `scripts/create_pilot_access.js`, and two WordPress webpack-config copies. Six existing warnings also remain. No scoped file produced a lint finding.

The first build attempt could not fetch configured Google fonts in the restricted environment. An approved network-enabled rerun passed, and a second final build after the analytics loading optimization also passed. Static generation printed one non-fatal existing dynamic-font warning.

## Baseline and schedule

A production baseline was not recorded before deployment because the local database was offline. The new start sources have no historical cohort before activation.

At deployment:

1. save existing route visitor/device/source figures;
2. reconcile the new report with aggregate production events, CVs, and orders;
3. schedule a functional review at deployment + 7 complete days;
4. schedule commercial evaluation at deployment + 28 complete days.

Deployment occurred on 2026-08-31. The functional review date is 2026-09-07 and the commercial evaluation date is 2026-09-28.

## Deployment and live smoke checks

- GitHub Actions run `33350464996` built and deployed commit `0ad740027976264113e0898b73cebc33a08702fd`.
- The live `/api/build-version` response reports the same build ID.
- Current app and healthy Postgres containers are running; the previous WerkCV image remains available as the rollback target.
- The confirmed-unreferenced `bengaluruevents-ingestor:latest` image was removed, reclaiming approximately 1.61 GB. No containers or volumes were removed.
- Local and public requests returned HTTP 200 for `/`, all six cited-authority routes, and `/en/cv-format-netherlands-english`.
- `bengaluruevents.com` returned HTTP 200 after cleanup.

## Remaining certification gates

- database execution/reconciliation of the SQL report;
- authenticated blank-CV creation and focus cleanup;
- authenticated fictional-example login/application;
- final preview/PDF parity for fictional examples;
- authorised checkout return and paid-PDF smoke test;
- production baseline and route/error monitoring.

Deployment status: deployed on 2026-08-31 as `0ad740027976264113e0898b73cebc33a08702fd`.

Do not label this release production-ready until those database-backed, authenticated, and paid-flow checks pass. No code-level P1 finding remains from the source, automated, responsive, canonical, and build review.
