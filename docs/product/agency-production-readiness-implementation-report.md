# Agency / MatchPack production-closure implementation report

**Date:** 20 August 2026  
**Repository:** `D:\DKPlayground\werkcv`  
**Specification:** [`agency-matchpack-production-closure-spec.md`](./agency-matchpack-production-closure-spec.md)

## Outcome

The production-closure implementation is complete in the local repository and the deterministic local release gates pass. MatchPack is the product workflow; Agency remains the billing/account tier. The implementation uses only fictional test candidates and `.example.test` contacts.

This report is not authorisation to migrate, commit, push, deploy, activate a scheduler or change production data. Those actions were not performed. Public provider/subprocessor facts and an executed DPA remain external verification items.

## Implemented boundaries

- Versioned PDF/DOCX source maps with exact extracted snippets, real PDF page references and no invented DOCX page numbers.
- Server-resolved reviewer decisions (`confirmed`, `corrected`, `rejected`), visible source changes and immutable revision history.
- Strict, idempotent approval with four server-validated confirmations, stale revision protection, one shared slot, canonical SHA-256 approved-snapshot digest and export-time integrity verification.
- One validated output projection for PDF, DOCX and accompanying client copy. Rejected/unreviewed evidence is excluded; partial evidence is visibly qualified and remains an open item.
- Contact-free projection and final artifact token scans. Direct identifiers are removed; employer, school and project identifiers remain subject to the visible limitation.
- Full and contact-free PDF/DOCX exports, reusable agency templates and locked approved linked CVs.
- Atomic CSV import, formula-safe CSV output, strict header/quote/BOM handling and quota enforcement.
- Exact 30/90/180/365-day retention, first-activation grace, meaningful-save refresh, immutable export expiry, bounded dry-run sweep and content-free deletion receipts.
- Retention preview/apply fingerprint tied to the same captured clock and database state. Stale previews are rejected transactionally; shortening/imminent expiry uses inline typed confirmation.
- Accessible inline deletion confirmations; no `window.confirm()` or `window.prompt()` remains in the Agency workflow.
- Explicit server-derived timing/correction/unsupported-claim metrics, separate client outcome and product feedback storage, PII/source-copy feedback rejection and test/internal-metric exclusion.
- Event-specific strict analytics allowlists for Agency/MatchPack events.
- Owner/editor/reviewer/viewer action matrix, owner-only settings and locked approved content.
- Factual `agency_welcome_v1` email, durable unique outbox, conditional claim, ambiguous SMTP-result state and injected-mailer exactly-once regression coverage.
- Bounded, resumable, dry-run-by-default legacy outcome backfill. It never infers `firstExportedAt`, changes retention or prints legacy JSON.
- Forward Prisma migration adding production-closure fields and the transactional-email outbox.

## Verification evidence

| Gate | Result |
|---|---|
| `npm run test:agency:unit` | Pass — 20 tests |
| Focused ESLint for changed runtime files | Pass — no warnings/errors |
| Focused ESLint for new test/worker/backfill scripts | Pass — no warnings/errors |
| `npm run build` | Pass — optimized production bundle and 538 pages/routes |
| `npm run test:agency:integration` | Pass — real local PostgreSQL; incomplete review rejected, concurrent approval creates one CV/slot, server counters, quota preservation, atomic CSV, retention race rejection, welcome-email idempotency |
| `npm run test:agency:migrations` | Pass — empty chain, legacy baseline/forward migration, no drift, backup/restore probe |
| `npm run test:agency:e2e` | Pass — authenticated fictional owner workflow at 1440px and 390px; analysis, review, edits, revision/retention, approval, four exports, matching email projection, outcome/feedback, reopen, mobile overflow and deletion |
| `npm run test:matchpack` | Pass — deterministic legacy MatchPack smoke |
| `npm run test:agency:outputs` | Pass — full/contact-free PDF and DOCX structure, extractable text, evidence qualification, open items and direct-identifier checks |
| PDF visual review | Pass — all pages rendered and inspected; clipped long date fixed |
| DOCX Word review | Pass — both variants opened by Microsoft Word, exported to PDF, rendered and inspected; continuing-number defect fixed with a real bullet numbering part |
| Legacy backfill dry run | Pass on local test DB; zero content printed |

Known non-blocking tool warnings:

- Next reports an existing dynamic-font warning for the `✓` glyph during static generation.
- `pdfjs-dist` reports optional `canvas` polyfill warnings. Rendering uses `@napi-rs/canvas`; generated PNGs were inspected successfully.

## Acceptance status

| Area | Status | Note |
|---|---|---|
| Product truth / evidence / approval / quota | Pass | Server-enforced and covered by unit, database and browser gates |
| Output consistency and contact-free boundary | Pass | One projection; PDF/DOCX/client copy checked |
| Migration safety | Pass locally | Production backup/baseline/migrate-deploy still requires separate authorisation |
| Retention and deletion | Pass locally | Scheduler mechanism and first production dry run are deployment tasks |
| CSV / metrics / analytics / onboarding / email outbox | Pass locally | SMTP credentials/deliverability require environment verification |
| Desktop/mobile owner workflow | Pass | Full authenticated fictional workflow completed |
| Role policy | Pass at policy/service level | A production smoke should still exercise real owner/editor/reviewer/viewer accounts through the deployed proxy |
| Provider/privacy/DPA facts | External blocker | Keep unresolved wording until providers, regions, subprocessors and agreement status are verified |
| Paid live-AI quality | Optional, not a release gate | `test:agency:live-ai` remains deliberately outside deterministic release |
| Production release | Not authorised | No production action was taken |

## Production-only next actions

1. Verify provider/subprocessor facts and complete the DPA/legal review without converting unresolved facts into compliance claims.
2. Take and verify a production backup; record schema fingerprint and deployed image SHA.
3. Run the documented production backfill in dry-run mode and review counts before any execute authorisation.
4. Deploy the exact reviewed image and run `prisma migrate deploy`; do not use `db push`.
5. Run the fictional authorised production smoke across roles, exports, retention and deletion; inspect content-free logs.
6. Run the retention sweep in dry-run mode, verify the real Hetzner scheduler/alerts, then separately authorise execution if the selection is correct.

## Artifacts and operational references

- [`agency-matchpack-production-closure-spec.md`](./agency-matchpack-production-closure-spec.md)
- [`agency-dpa-review-checklist.md`](./agency-dpa-review-checklist.md)
- [`DEPLOYMENT_HETZNER.md`](../../DEPLOYMENT_HETZNER.md)
- `prisma/migrations/20260820000300_agency_matchpack_production_closure/migration.sql`
- `scripts/agency-tests-db-guard.ts`
- `scripts/agency-tests-integration.ts`
- `scripts/agency-tests-migrations.ts`
- `scripts/agency-tests-e2e.ts`
- `scripts/agency-submission-pdf-smoke.ts`
- `scripts/agency-matchpack-backfill.ts`
- `scripts/agency-retention-sweep.ts`
- Generated local QA artifacts: `output/pdf/werkcv-kandidaatvoorstel-*`
