# MatchPack SEO-led validation and activation implementation report

Date: 2026-09-02  
Specification: `docs/product/matchpack-seo-led-validation-and-activation-spec.md`  
Status: code foundation implemented; external certification, activation and deployment are not complete.

## Executive result

The repository now contains the Release A foundation, a fail-closed benchmark and publication system, a safer public claim verifier, candidate-acknowledgement hardening, an English MatchPack commercial journey, and a database-backed validation funnel. The public pages follow the current WerkCV Manrope, soft-surface, rounded-card visual system.

This does not establish production readiness or market validation. Independent bilingual review, a private holdout, the real three-run evaluation, live payment/email/export checks, mobile and assistive-technology review, search-console work, paid external use, deployment and activation remain incomplete. All activation flags must stay off.

## Implemented

### P0, analytics and English journey

- Corrected the Dutch and English verifier methodology links.
- Added one strict acquisition-event schema shared by client and server, including content-free verifier-copy, pricing-view and checkout-intent events.
- Localised Agency checkout and return handling while retaining EUR billing.
- Added `/en/agency` and `/en/agency/privacy`, canonical/hreflang pairs, sitemap, navigation/footer and AI-discovery coverage.
- Added a MatchPack validation dashboard and CLI report with central exclusions, UTC bounds, authoritative database milestones, sample sizes, medians, source/locale/device and new/returning breakdowns.

Key files: `app/en/agency/page.tsx`, `app/en/agency/privacy/page.tsx`, `lib/agency-analytics-contract.ts`, `lib/agency-validation-funnel.ts`, `lib/agency-validation-funnel-server.ts`, `app/admin/analytics/matchpack/page.tsx`, `scripts/agency-validation-report.ts`, `lib/dodo.ts`, `lib/i18n/route-pairs.ts`, `app/sitemap.ts`, `app/llms.txt/route.ts` and `lib/ai-discovery.ts`.

### Provenance, deterministic checks and privacy

- Reused `ProposalClaimVerificationV1` throughout the claim workflow.
- Require exact proposal spans and deterministically resolvable source snippets; unsafe source-supported verdicts are downgraded.
- Added current-fact, numerical/date/duration, negation and explicit employer-attribution controls.
- Added global and per-network concurrency leases in addition to existing rate and timeout controls.
- Kept results ungated and free of suitability scores or candidate ranking.
- Excluded both public verifier routes and the private candidate-review route from Clarity/session replay.

Key files: `lib/tools/proposal-claim-verifier.ts`, `lib/tools/proposal-claim-deterministic.ts`, `lib/tools/concurrency-limit.ts`, `app/api/tools/proposal-claim-verifier/route.ts`, `components/ConditionalClarity.tsx` and `app/layout.tsx`.

### Benchmark and publication gate

- Added 60 fictional public cases: 30 Dutch and 30 English, six balanced verdict classes, ten occupational profiles, multiple seniority levels and text/PDF/DOCX declarations.
- Added a fail-closed external 40-case holdout loader requiring 20 Dutch, 20 English, class coverage and an approved SHA-256 checksum.
- Added the required classification, citation, parsing, locale, stability and bootstrap-confidence metrics.
- Added an evaluator requiring prior independent review and real external PDF/DOCX fixtures. It runs all 100 cases three times, pins commit/model/prompt/parser/settings, records non-content failures and exits non-zero when thresholds fail.
- Publication now also requires a passed evaluation status and evaluation-report checksum. A feature flag alone cannot publish the dataset.
- Added an annotation guide, review template, data card and holdout manifest template.
- Redesigned the methodology page in the current theme; it emits neither Dataset JSON-LD nor performance claims while review is pending.

Key files: `lib/benchmark/claim-evidence-public-v1.ts`, `lib/benchmark/claim-evidence-holdout.ts`, `lib/benchmark/claim-evidence-metrics.ts`, `lib/benchmark/claim-evidence-evaluator.ts`, `lib/benchmark/claim-evidence-release-gate.ts`, `components/agency/ClaimEvidenceMethodology.tsx`, `app/api/benchmark/claim-evidence-v1/route.ts` and `docs/methodology/*`.

### Candidate acknowledgement

- Preserved 256-bit fragment tokens, SHA-256-only storage, atomic single-use exchange, 72-hour invitations and 60-minute hashed sessions.
- Added language-aware invitation URLs and Dutch/English review copy.
- Corrected response-header precedence so the private route gets `no-referrer`, `no-store`, noindex and its restrictive CSP.
- Restricted override to current invitations that are unavailable or unanswered; confirmed, declined, stale and correction-pending reviews remain ineligible.

Key files: `components/agency/CandidateAcknowledgementReview.tsx`, `app/api/agency/matchpack/[id]/candidate-review/route.ts`, `app/api/agency/matchpack/[id]/candidate-review/override/route.ts`, `next.config.ts` and `lib/agency-candidate-review.test.ts`.

## Flags and migrations

These flags remain fail-closed and must remain disabled:

- `CLAIM_BENCHMARK_PUBLICATION_ENABLED`
- `PROPOSAL_CLAIM_VERIFIER_ENABLED`
- `CANDIDATE_ACKNOWLEDGEMENT_ENABLED`

Publication additionally requires review approval/version, public and holdout checksums, external holdout/fixture paths, a passed evaluation status and an evaluation-report checksum.

No Prisma change or migration was added. This uses the existing additive MatchPack, revision and candidate-review models.

## Verification

| Check | Result |
|---|---|
| `npm run test:agency:activation` | Passed 24/24 |
| `npm run test:agency:unit` | Passed 20/20 |
| `npm run test:workspace:unit` | Passed 13/13 |
| `npm run i18n:validate-routes` | Passed 20 route pairs |
| Focused ESLint for changed implementation files | Passed with zero findings |
| `npm run build` | Passed; 551 routes |
| Benchmark command without review/holdout | Correctly failed before any AI call |
| `git diff --check` | Passed; Windows line-ending notices only |
| Full `npm run lint` | Blocked by eight existing CommonJS-import errors outside this work; six unrelated warnings remain |

The build emitted the existing non-fatal dynamic-font warning for the checkmark glyph. Built-route inspection verified the candidate page's `no-referrer`, `no-store`, noindex and CSP headers and absence of Clarity. Local canonical routes resolved and the unpublished benchmark API returned a fail-closed 404.

## Acceptance matrix

| Area | Status | Evidence / remaining gate |
|---|---|---|
| P0 links | Implemented locally | Production 200 smoke pending deployment |
| Analytics | Passed | Shared contract tests pass |
| Corpus | Partial | 60 public cases exist; reviewed external 40-case holdout absent |
| Independent review | Not complete | Human credentials, conflict, agreement and adjudication required |
| Benchmark quality | Not complete | Evaluator exists; real reviewed three-run result not run |
| Publication | Correctly blocked | Dataset and Dataset JSON-LD unavailable until all gates pass |
| Verifier | Implemented behind flag | Live bilingual certification pending |
| Verifier privacy | Strong local evidence | Provider-terms review and production log audit pending |
| MatchPack gate | Unit-covered | Database integration/E2E pending |
| Acknowledgement | Hardened | Real email and full E2E pending |
| Override | Hardened | Database permission/concurrency E2E pending |
| English journey | Partial | Page/checkout compile; paid account-to-export not certified |
| SEO | Implemented locally | Rich-result validation and human search-console submission pending |
| Funnel | Implemented locally | Production reconciliation not run |
| Mobile/accessibility | Not certified | Manual 320/375/768/desktop, keyboard and reader review pending |
| Exports | Existing unit contract passes | PDF/DOCX visual snapshot comparison pending |
| Retention | Existing unit contract passes | Database cascade/receipt integration pending |
| Rollout | Not started | No commit, deploy, image digest, restore point or rollback target |
| Validation | Not achieved | No external paid-agency or repeat-use threshold claimed |

## Required next actions

1. Commit this release without mixing unrelated untracked voice/editor or temporary files.
2. Produce the private holdout and real PDF/DOCX fixtures outside public assets.
3. Complete independent bilingual review and adjudication.
4. Run the evaluator, archive only the aggregate report and verify its checksum and thresholds.
5. Run database integration, migration rehearsal, Agency E2E and PDF/DOCX visual checks in a disposable production-compatible environment.
6. Complete mobile, keyboard and screen-reader checks across public and candidate states.
7. Review provider data terms and production logs; document the result.
8. Deploy Release A with all flags off and record rollback evidence.
9. Activate publication, verifier and acknowledgement only as separate gated releases.
10. Submit priority URLs and begin observation only after production certification.

## Explicit non-actions

- No customer email, price change, feature activation, production deployment, database mutation, image cleanup or search-console submission was performed.
- No benchmark performance figure was published.
- No private holdout or candidate content was committed.
