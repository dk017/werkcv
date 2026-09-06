# WerkCV MatchPack first Agency customer — implementation report

**Date:** 3 September 2026  
**Branch at review:** `codex/seo-implementation-audit`  
**Starting commit:** `d3df8d98c7d4d2f25ec3577417ecebb839f6dee7`  
**Ending commit:** not created in this implementation pass  
**Worktree:** contains pre-existing product, branding, voice and acquisition changes; unrelated edits were preserved.

This report records code completion separately from owner/provider/deployment actions. An unchecked item is not a claim that it happened.

## Executive status

The code-level Agency offer and first-customer acquisition assets are implemented as an additive release:

- EUR 99 per month;
- 300 shared CV credits per billing period;
- one credit for one new standalone candidate CV or the first definitive approval of one MatchPack;
- evidence-led Dutch public-sector guide, fictional source fixture, matrix DOCX/CSV and free-checker bridge;
- route registry, sitemap, `llms.txt`, AI discovery and privacy-safe guide/matrix events;
- MatchPack-specific result projection with no proposal-wide score, rank or suitability fields in the agency response, revision or CSV export;
- billing metadata and entitlement safeguards that prevent a provider webhook from lowering an existing custom allowance or treating a stored zero as missing.

The live Dodo product, production migration, deployment and external customer milestones remain owner-controlled and are **not certified here**. `PROPOSAL_CLAIM_VERIFIER_ENABLED`, `CANDIDATE_ACKNOWLEDGEMENT_ENABLED` and `CLAIM_BENCHMARK_PUBLICATION_ENABLED` remain off unless the environment explicitly enables them.

## 1. Final commercial contract

| Item | Value | Rule |
|---|---:|---|
| Plan code | `agency` | Billing tier; MatchPack is the product category |
| Plan version | `agency_99_300_2026_09` | Sent as bounded provider metadata |
| Monthly price | EUR 99 (`9900` cents) | Recurring monthly; provider must match before activation |
| Shared credits | 300 | Shared across the agency workspace and billing period |
| Consumption | 1 credit | New standalone CV **or** first definitive approval of a new MatchPack |
| Non-consumption | 0 credits | Analysis, drafting, editing, revisions and repeat downloads/re-exports |
| Rollover | none introduced | Existing production contract controls any legacy behaviour |

The plan source is `lib/agency-plan.ts`. Public, authenticated, API, email, fixture and schema defaults now use its values. The deprecated `AGENCY_MONTHLY_CV_LIMIT` alias remains only for compatibility.

## 2. Changed files by checkpoint

### Commercial and entitlement foundation

- `lib/agency-plan.ts` — authoritative price, currency, credit limit, version, display and remaining-credit helpers.
- `prisma/schema.prisma` — new Agency subscription and usage-period defaults set to 300.
- `prisma/migrations/20260903000000_agency_plan_99_300/migration.sql` — additive, non-decreasing upgrade for stored limits and current periods.
- `lib/agency-billing.ts` — webhook/renewal metadata, preserved custom limits, zero-safe allowance resolution and non-decreasing period allowance.
- `lib/agency-access.ts` — nullish-safe limits, actual allowance in errors and credit terminology. Existing usage-period allowances remain authoritative; only newly created periods inherit the subscription allowance.
- Agency MatchPack/public-CV API routes — actual allowance and credit-safe messages.
- `lib/agency-matchpack.ts`, MatchPack API routes and `components/agency/AgencyMatchPackWorkspace.tsx` — agency result projection strips legacy consumer score/band/dimension fields, returns the validated projection for old records, removes score from agency telemetry/CSV and presents evidence/open items instead.
- `lib/dodo.ts`, `app/api/agency/checkout/route.ts`, `lib/dodo.test.ts` — bounded plan metadata and existing checkout contract retained.
- `lib/email.ts` — welcome email explains the shared 300-credit unit.

### Public product and acquisition

- `lib/agency-acquisition.ts`, `lib/agency-content.ts` — canonical route/content registry and public-sector intent.
- `app/agency/page.tsx`, `app/en/agency/page.tsx`, `app/voor-bureaus/page.tsx` — evidence-led product copy and 300-credit offer.
- `app/voor-bureaus/kennisbank/kandidaat-aanbieden-overheid/page.tsx` — complete ungated Dutch guide.
- `lib/agency-public-sector-example.ts` — single fictional candidate/source/requirements fixture.
- `public/downloads/werkcv-eisenmatrix-kandidaat-aanbieden-overheid.csv` and `.docx` — fictional blank matrix assets.
- `lib/generate-agency-public-sector-matrix.ts`, `package.json` — reproducible DOCX generation command `npm run agency:public-sector-matrix`.
- `app/sitemap.ts`, `lib/ai-discovery.ts`, `app/llms.txt/route.ts` — exactly-once discovery registration.

### Measurement and review

- `components/agency/AgencyContentAnalytics.tsx` — matrix download tracking with only format, registered route ID and bounded source category; no content or identifiers.
- `lib/analytics.ts`, `lib/agency-analytics-contract.ts`, `app/api/analytics/route.ts` — strict bounded event contract.
- `lib/agency-validation-funnel.ts`, `lib/agency-validation-funnel-server.ts` — guide views, matrix downloads by format, central exclusions and server-derived paid/activated stages.
- `app/admin/analytics/matchpack/page.tsx` — matrix format cards and route-level guide/matrix columns.
- `lib/agency-acquisition.test.ts`, `lib/agency-analytics-contract.test.ts`, `lib/agency-matchpack.test.ts`, `lib/agency-validation-funnel.test.ts` — route, stale-copy, fixture, download, score-removal and privacy tests.
- `app/api/tools/cv-vacature-evidence/route.ts` — dedicated no-store, score-free Agency evidence API; the consumer scored checker remains a separate contract.
- `agency-production-remediation.test.ts` and `agency-tests-entitlements-integration.ts` — existing-draft-at-exhaustion, repeat-output, stable API errors, last-credit concurrency, renewal replay and custom/zero allowance regression coverage.

### Owner runbooks

- `docs/werkcv-matchpack-first-customer-distribution.md` — bounded manual 20–30 business outreach with Dutch/English message assets and stop rules.
- `docs/werkcv-matchpack-agency-search-submission.md` — post-deploy search inspection and recrawl procedure.
- `docs/werkcv-matchpack-first-agency-customer-spec.md` — normative scope and release gates.

## 3. Migration and existing customers

Migration design:

- subscription and usage-period defaults become 300;
- stored subscription limits below 300 are raised to 300;
- only current/future periods below 300 are raised;
- usage counts, paid-through dates, cancellation state, documents and custom limits above 300 are preserved;
- the SQL is idempotent and never lowers a value.

Migration rehearsal status: **implemented but not run in this pass**. The rehearsal validates exact fixture IDs, subscription/period relationships, dates, status, cancellation state, current/future/expired/custom allowance outcomes, 37 preserved usage rows, replay equality, restore equality and PostgreSQL's 63-byte identifier limit. It uses only `pg_dump`/`psql` connected through the guarded URL; the unsafe compose-cluster fallback was removed. A production-compatible PostgreSQL run still requires the owner/environment gate.

## 4. Dodo/provider status

Code adds `plan_code`, `plan_version`, `credit_limit`, `display_price_cents` and `currency` metadata without CV IDs, candidate names, emails or document content. The product ID remains environment-driven.

Owner-only actions still pending:

1. Configure/verify a Dodo test recurring product at EUR 99 monthly.
2. Verify visible cadence, currency, tax handling and payment methods.
3. Complete a test checkout and webhook cycle; confirm 300 credits.
4. Verify cancellation and paid-through access.
5. Configure the live product/environment reference and decide treatment of legacy external renewals.
6. Back up production, apply the migration and certify the coordinated live release.

No provider secret, product mutation or live charge was performed by this implementation pass.

## 5. Unit economics gate

The full-use revenue arithmetic is implemented (`EUR 99 / 300 = EUR 0.33 per credit`) and is labelled as a full-use reference, not a billing promise. The detailed worksheet is recorded at `docs/werkcv-matchpack-unit-economics-2026-09.md`; financial certification remains **pending** because executed provider/model invoices, worst-path call counts, email/storage costs, taxes and payment fees are not available.

## 6. Public route and intent map

| Route | Intent | Primary job |
|---|---|---|
| `/agency` | Dutch product/category | evidence-led MatchPack and free checker bridge |
| `/voor-bureaus` | Dutch solution hub | choose guide, example, checker or product |
| `/voor-bureaus/kennisbank/kandidaat-aanbieden-overheid` | public-sector evidence | requirements matrix, fictional worked example and downloads |
| `/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld` | example | complete fictional output |
| `/tools/kandidaatvoorstel-checker` | Dutch tool | ungated current checker mode |
| `/en/agency` | English product/category | evidence-led candidate submission software |
| `/en/candidate-proposal-checker` | English tool | ungated current checker mode |

The new guide is Dutch-only and self-canonical. Only `/agency` and `/en/agency` emit a reciprocal language pair. The checker, guide and example do not claim a ranking, match score, truth proof, identity verification, legal compliance or guaranteed client acceptance.

## 7. Capability truth

| Capability | Current public state |
|---|---|
| PDF/DOCX export, reusable templates, team roles, revisions, CSV exchange, retention and deletion controls | enabled/existing |
| Proposal Claim Verifier | feature-flagged off |
| Candidate acknowledgement | feature-flagged off |
| Published benchmark | feature-flagged off |
| Native ATS integrations | not implemented; CSV path only |
| Client portal, ranking, bulk comparison, generic summary expansion | deferred |

## 8. Analytics contract

The existing central Agency event contract now includes `agency_evidence_matrix_downloaded` (`docx`/`csv`, registered route ID and bounded source category). Existing `agency_guide_viewed` is included in the server report. The report displays distinct eligible identities, guide views, matrix downloads by format, checker/CTA stages and authoritative paid/activated product records. It uses a safe `—` for zero denominators. MatchPack completion telemetry records only locale and requirement count; no score band is sent.

Inputs, candidate text, vacancy text, names, emails, filenames, IDs and evidence snippets are excluded from event properties and logs. Owner, admin, configured test, synthetic and bot activity is excluded centrally. Direct/unknown settled payments remain eligible for the overall paid milestone.

## 9. Verification record

Run in this worktree on 3 September 2026:

| Command | Result |
|---|---|
| `npm run test:agency:acquisition` | PASS — 17 tests |
| `npm run test:agency:activation` | PASS — 31 tests |
| `npm run test:agency:unit` | PASS — 32 tests |
| `npm run test:workspace:unit` | PASS — 13 tests |
| `npm run test:matchpack` | PASS — MatchPack submission smoke |
| `npm run test:agency:outputs` | PASS — PDF/DOCX output smoke; optional `canvas` warnings only |
| `npx tsc --noEmit --pretty false` | PASS |
| focused `npx eslint` over changed Agency/MatchPack files | PASS |
| `npm run build` | PASS — 555 routes generated; existing dynamic-font status-400 warning only |
| `git diff --check` | PASS (line-ending warnings only) |
| `npm run agency:public-sector-matrix` | PASS — DOCX generated |

Still required before release:

- `npm run test:agency:integration`, `npm run test:agency:migrations` and `npm run test:agency:e2e` against a real PostgreSQL-compatible test database;
- manual 320/375/768/1024/desktop, keyboard, screen-reader, authenticated and checkout checks;
- production 200/canonical/price/entitlement smoke after the owner-coordinated deployment.

Database-backed checks were attempted in this pass and are **blocked**, not passed: `AGENCY_TEST_DATABASE_URL` is not configured and the Docker Desktop Linux engine is unavailable in this environment. No production or unknown database was reused.

## 10. Search, distribution and customer milestones

No search-engine submission, outreach, provider change, deployment or paid customer claim is recorded here. After release, use the two runbooks and record aggregate selected/contacted/delivered/replied/checker-used/checkout-started/paid/activated counts.

- **First external paid Agency customer:** settled payment from an account not owned by WerkCV, a tester, administrator or founder.
- **First activated Agency customer:** that paid account creates a MatchPack, resolves blockers, approves it and exports an approved PDF or DOCX.

Current values for both milestones: **not certified / no qualifying external account recorded in this report**.

## 11. Rollback and known limitations

The rollback target must keep displayed price, provider checkout price and stored entitlement coherent. The additive migration is non-destructive; rollback must not reduce a customer's credits. Do not roll back only the UI if it would advertise a different charge.

Known limitations:

- payment-provider configuration and actual live price are external;
- migration and database-backed tests need a production-compatible PostgreSQL environment;
- benchmark publication and full claim-verifier/candidate-acknowledgement remain gated;
- responsive/accessibility certification requires manual populated-fixture inspection;
- one existing legacy PDF smoke script still uses a separate internal fixture; the public guide/downloads use the canonical fixture.
