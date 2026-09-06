# WerkCV MatchPack Agency production-remediation implementation report

**Date:** 3 September 2026  
**Status:** implementation verified without the guarded database gates; not code-complete under the normative release definition, release-ready or production-complete

This report records the September remediation implementation without treating unrun database, provider, manual, deployment or discovery checks as passed. The worktree already contained substantial user changes; no reset, cleanup, commit, push, provider mutation or production deployment was performed.

## Starting state

- Branch: `codex/seo-implementation-audit`
- Starting commit: `d3df8d...`
- Node/npm and full dirty status were recorded before editing; the worktree contained unrelated tracked and untracked changes and was preserved.
- Protected flags remain off unless explicitly supplied by the environment:
  - `PROPOSAL_CLAIM_VERIFIER_ENABLED`
  - `CANDIDATE_ACKNOWLEDGEMENT_ENABLED`
  - `CLAIM_BENCHMARK_PUBLICATION_ENABLED`
- Current application contract in `lib/agency-plan.ts`: EUR 99/month, 300 shared credits, version `agency_99_300_2026_09`.

## Implemented checkpoints

### Capability-derived public messaging

`lib/agency-public-messaging.ts` is the pure server-safe copy contract used by Dutch and English Agency pages, checkers, AI discovery and `llms.txt`. With the verifier off, the promise is requirement-to-CV evidence and visible open points. Claim-verification language appears only when the corresponding flag is on. Tests cover both locales, metadata/body/FAQ/feature-list language and forbidden claims.

### Mobile Agency hierarchy

Both Agency heroes now derive the plan summary from the plan module, show the free evidence action before the commercial action, use a single primary visual action, stack safely on small screens and apply `min-width: 0`/wrapping safeguards. Local browser checks passed at 320, 375, 768, 1024 and 1440 widths with no page-level overflow on the tested routes.

### Actionable credit diagnostics

`lib/agency-credit-errors.ts` and `serializeAgencyAccessError()` are used by standalone Agency creation, CSV import and first MatchPack approval. Authenticated rejection payloads preserve the stable code and bounded `used`, `limit`, `remaining` and `requested` fields. Dutch and English messages, custom allowances and stored zero are covered by unit tests. Existing permitted exports are not gated by exhaustion.

Existing usage-period allowances are now authoritative during ordinary access: reopening the workspace updates only the period end date and never overwrites a stored zero or custom allowance. The public-draft claim route resolves an existing credited draft before applying new-credit exhaustion, so editing/reopening continues at the limit while a genuinely new draft is rejected with the stable diagnostics.

### Plan, billing and checkout contract tests

Tests now cover the EUR/300/version contract, locale display, the labelled full-use EUR 0.33 reference, allowance clamping, inactive/paid-through subscription states, custom allowance preservation, webhook metadata and non-PII checkout metadata.

### Migration and restore rehearsal implementation

`agency-tests-migrations.ts` discovers and validates the complete sorted migration chain, targets the single `20260903000000_agency_plan_99_300` SQL file, builds isolated empty/legacy/restore database names within PostgreSQL's 63-byte identifier limit, seeds ordinary/custom/zero/cancelled subscriptions, current/future/expired periods and 37 usage rows, checks exact IDs and preserved relationships/dates/status/cancellation state, replays the SQL, runs schema drift checks and verifies a logical backup/restore projection. The unsafe Docker Compose fallback was removed: backup and restore can use only `pg_dump`/`psql` connected through the guarded database URL. The tracked `scripts/agency-tests-migrations.ts` path could not be recreated by the workspace patch writer because that directory is exposed as a reparse point, so the runnable replacement is at the repository root and `package.json` points to it.

`agency-tests-entitlements-integration.ts` adds guarded PostgreSQL coverage for two distinct requests racing for the final credit, editing an existing credited CV at exhaustion, renewal replay idempotency, custom period preservation and intentional stored-zero inheritance.

### Visual fixture and score cleanup

The development visual fixture is excluded only at the exact `/agency/visual-test` path from the public shell, remains noindex and production-disabled, and uses a score-free MatchPack projection. The activation suite verifies one shell, flag-faithful stages and absence of score/ranking fields.

The public Agency evidence checker now calls the dedicated `app/api/tools/cv-vacature-evidence/route.ts`. Its response is parsed through the evidence-only schema and every response uses `Cache-Control: no-store`; consumer score fields cannot cross that boundary. The original consumer vacancy/CV checker remains separate and unchanged.

### Unit-economics worksheet

`docs/werkcv-matchpack-unit-economics-2026-09.md` records the repository contract, actual model call paths and limits, official OpenAI/Dodo documentation links, reproducible formulas, utilization scenarios, retry sensitivity and the missing provider/infrastructure inputs. It is intentionally marked **financially uncertified** until invoice, token, fee, tax and infrastructure exports are reviewed.

## Verification completed

Passed locally:

```text
npm run test:agency:acquisition   (17 passed)
npm run test:agency:activation    (31 passed)
npm run test:agency:unit          (32 passed)
npm run test:workspace:unit       (13 passed)
npx tsc --noEmit --pretty false
git diff --check
npx eslint on the changed remediation scope (clean)
npm run build                      (555 routes; successful; Next reported a non-blocking dynamic-font download warning)
```

The repository-wide `npm run lint` remains non-zero because it includes pre-existing generated/utility files (`local/wordpress-sandbox/capture-screenshots.cjs`, pilot helper, and WordPress webpack configs) with `require()` violations, plus unrelated warnings. The changed remediation scope has no lint errors or warnings.

The build generated the Agency, English Agency, checker, methodology and visual-test routes successfully.

Local browser evidence recorded:

- `/agency` and `/en/agency`: plan summary and free action visible in the mobile hierarchy; no horizontal overflow at tested widths.
- `/agency/visual-test?screen=matchpack`: exactly one header/site shell.
- Verifier-off DOM: Sources/Bronnen, Candidate facts, Client text, Output and Approval; Claims and score fields absent.
- English verifier-off metadata uses the exact requirement-evidence title/description contract and retains a working free-checker CTA.

## Blocked or owner-pending gates

These are not passes:

1. `npm run test:agency:migrations` stops at `AGENCY_TEST_DATABASE_URL_REQUIRED`; no guarded PostgreSQL URL was available. Docker/WSL was not used to bypass the safety guard.
2. Agency integration, E2E, output-parity and full workspace/consumer production-compatible suites were not certified against a populated database in this environment.
3. Dodo test checkout, historical subscription renewal treatment, production backup/restore, production migration/deploy, image digest and live smoke require separate owner authorization and provider/infrastructure access.
4. Manual keyboard/screen-reader certification, authenticated role matrix and full/anonymous PDF/DOCX snapshot comparison require a disposable populated Agency database and browser review.
5. The unit-economics decision remains financially uncertified pending Dodo fee/tax/settlement details, OpenAI invoice/token aggregates and attributable hosting/email/support costs.
6. Search submission and indexing are intentionally pending the authorized live smoke; no indexing or commercial outcome is claimed.

## Readiness decision

The implementation is **locally verified only for the non-database gates**. Under the normative specification it is not code-complete or release-ready until the guarded PostgreSQL migration/restore rehearsal, integration/E2E/output/manual accessibility checks, economics review, provider checkout test and backup/rollback plan pass. It is **not production-complete** until a separately authorized release agrees in live HTML, provider charge, database entitlement and smoke tests.
