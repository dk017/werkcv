# WerkCV MatchPack Agency production-remediation specification

**Status:** Ready for implementation. This document does not authorise a production migration, payment-provider change, deployment, customer contact, search submission, commit, push, or infrastructure cleanup.  
**Date:** 3 September 2026  
**Normative parent:** `docs/werkcv-matchpack-first-agency-customer-spec.md`  
**Report to update:** `docs/product/werkcv-matchpack-first-agency-customer-implementation-report.md`  
**Commercial contract:** EUR 99/month and 300 shared CV credits per billing period

## 0. Objective and definition of success

Finish and certify the existing first-customer release without broadening the product:

> MatchPack helps recruitment agencies connect every vacancy requirement to exact passages in an authorised candidate CV, keep missing information visible, record recruiter review, and approve one controlled PDF or DOCX proposal alongside their ATS.

The release is successful only when:

1. Dutch and English copy, metadata, structured data, examples and CTAs describe enabled capabilities only.
2. EUR 99/300 credits agree in code, Dodo, database, authenticated UI and production.
3. Migration and entitlements pass PostgreSQL-backed legacy, custom-limit, concurrency and idempotency tests.
4. Limit errors show actual used, limit, remaining and requested credits.
5. Public/authenticated flows pass responsive, keyboard, checkout and output certification.
6. Production exposes this release instead of the historical EUR 149/50-slot offer.
7. The report separates code completion, external configuration, deployment, indexing and commercial proof.

Do not claim truth verification, identity proof, ranking, ATS replacement, guaranteed compliance, guaranteed acceptance, market leadership or product-market fit.

## 1. Instructions for the implementing agent

1. Read this file and these dependencies completely before editing:
   - `docs/werkcv-matchpack-first-agency-customer-spec.md`
   - `docs/product/werkcv-matchpack-first-agency-customer-implementation-report.md`
   - `docs/product/agency-matchpack-production-closure-spec.md`
   - `DEPLOYMENT_HETZNER.md`
   - `lib/agency-plan.ts`, `lib/agency-public-capabilities.ts`, `lib/agency-feature-flags.ts`
   - `lib/agency-acquisition.ts`, `lib/agency-billing.ts`, `lib/agency-access.ts`, `lib/dodo.ts`
   - `scripts/agency-tests-migrations.ts` and every Agency script named in `package.json`
2. Record starting branch, commit, Node/npm versions and full `git status`. Preserve the large existing dirty worktree. Never reset, clean, overwrite or broadly reformat unrelated work.
3. Treat the parent specification as normative. If actual code conflicts with it, choose the safer product-truth, privacy and entitlement behavior and record the conflict.
4. Work checkpoint by checkpoint. Review the focused diff and pass focused checks before continuing.
5. Reuse the existing plan, capability flags, route registry, analytics, source map, approval snapshot and export systems. Do not create parallel sources of truth.
6. Keep the current Manrope WerkCV shell and established components.
7. Keep `PROPOSAL_CLAIM_VERIFIER_ENABLED`, `CANDIDATE_ACKNOWLEDGEMENT_ENABLED` and `CLAIM_BENCHMARK_PUBLICATION_ENABLED` off. Enabling them is outside this scope.
8. Use fictional or authorised data only. Never commit real emails, candidate text, vacancy text, tokens, provider payloads or secrets.
9. A blocked or unrun check is not a pass.
10. Dodo mutation, production backup/migration/deploy, search submission, outreach, commit/push and Docker cleanup require separate explicit owner authorisation.

## 2. Locked decisions

### 2.1 Audience and differentiation

Target small Dutch recruitment and secondment agencies preparing evidence-heavy submissions, particularly public-sector, IT, healthcare and specialist assignments. “2–20 recruiters” is an internal targeting heuristic, not a product limit or market-size claim.

The demonstrated reason to choose must be:

> The recruiter sees which exact CV passage supports each requirement, which points remain open, what the reviewer decided, and which approved snapshot produced the PDF and DOCX.

Do not lead with generic AI writing, formatting volume or lowest unit price. Do not publish competitor-comparison pages. State that MatchPack works alongside an ATS through CSV; do not imply native integration.

### 2.2 Price and credit contract

- EUR 99 recurring monthly.
- 300 shared credits per billing period.
- One credit for a new standalone Agency CV.
- One credit for first definitive approval of a new MatchPack.
- Analysis, drafts, edits, revisions and repeat exports of the same credited item use no additional credit.
- Exhaustion blocks only new credit-consuming work; existing permitted documents remain accessible/downloadable.
- No rollover, trial, pilot, annual tier, discount or consumer-price change is introduced.

### 2.3 Public capability matrix

| Capability | Required off-state treatment | On-state treatment |
|---|---|---|
| Vacancy requirement → exact CV evidence | Enabled and public | Enabled and public |
| Recruiter review, revisions, PDF/DOCX, templates, roles, CSV, retention/deletion | Enabled and public | Enabled and public |
| Every proposal/email claim → evidence | Must not be promised | May be described only after verifier release gates pass |
| Candidate acknowledgement | Must not appear as available | May be described only after its own gates pass |
| Accuracy benchmark | No validated-accuracy implication | Actual independently reviewed measurements only |

## 3. Scope

Included: capability-derived copy; mobile Agency hero; entitlement diagnostics/tests; full migration rehearsal; visual-fixture repair; score-remnant removal; public/authenticated accessibility and export certification; unit-economics record; coordinated-release runbook; post-deploy discovery/measurement.

Excluded: new ATS integrations, bulk processing, comparisons/ranking/scoring, client portal, automatic sending, generic templates/summaries, protected-feature activation, discounts/trials/pilots, consumer changes and automated outreach.

## 4. Checkpoint 0 — baseline

Before editing, record flag states and run:

```text
npm run test:agency:acquisition
npm run test:agency:activation
npm run test:agency:unit
npx tsc --noEmit --pretty false
git diff --check
```

Inspect live `/agency`, `/en/agency`, `/voor-bureaus`, the public-sector guide, Dutch checker, sitemap and `llms.txt`. Record HTTP status, canonical, visible price/credits and whether the old or current release is served. Recheck; do not rely on a search cache.

Exit: baseline is reproducible and unrelated work remains intact.

## 5. Checkpoint 1 — truthful capability-derived messaging

### 5.1 Architecture

Add one pure server-safe module, preferably `lib/agency-public-messaging.ts`, accepting locale plus `AgencyPublicCapabilities` and returning:

- mode: `requirement_evidence` or `proposal_claim_verification`;
- title, description, H1, eyebrow and one-sentence hero explanation;
- free-tool CTA;
- workflow steps and benefit labels;
- answer explaining what is checked;
- `SoftwareApplication.featureList` strings.

Do not put React or URLs in this module. Do not duplicate capability evaluation. The route registry must contain conservative, always-true metadata; pages may enrich body copy only when a capability is enabled. Visible FAQ and `FAQPage` JSON-LD must share the same data array.

### 5.2 Exact verifier-off English contract

- Title: `MatchPack for recruitment agencies | CV evidence per requirement`
- Description: `Map vacancy requirements to exact passages in a candidate CV, keep missing information visible, and approve one controlled PDF or DOCX proposal.`
- H1: `Connect every vacancy requirement to exact CV evidence before submission.`
- Hero: `Upload an authorised candidate CV and a genuine vacancy. MatchPack shows the CV passage supporting each requirement, keeps open points visible and lets the recruiter approve the final version.`
- CTA: `Check CV evidence free`
- Step 2: `Review every requirement`
- Boundary: `A source status describes support in the supplied CV; it does not prove that the candidate is truthful or objectively suitable.`

### 5.3 Exact verifier-off Dutch contract

- Title: `MatchPack voor recruitmentbureaus | CV-bewijs per functie-eis`
- Description: `Koppel vacature-eisen aan exacte passages in het kandidaat-CV, houd ontbrekende informatie zichtbaar en keur één gecontroleerd PDF- of DOCX-voorstel goed.`
- H1: `Onderbouw iedere functie-eis met exact CV-bewijs voordat je een kandidaat voorstelt.`
- Hero: `Upload een bevoegd kandidaat-CV en een echte vacature. MatchPack toont welk CV-fragment iedere eis ondersteunt, houdt open punten zichtbaar en laat de recruiter de definitieve versie goedkeuren.`
- CTA: `Controleer CV-bewijs gratis`
- Step 2: `Controleer iedere functie-eis`
- Boundary: `Een bronstatus beschrijft alleen ondersteuning in het aangeleverde CV; het is geen bewijs dat de kandidaat de waarheid spreekt of geschikt is.`

Minor grammar edits may not broaden meaning.

### 5.4 Forbidden off-state promises

Sweep page body, metadata, Open Graph, FAQ/JSON-LD, `SoftwareApplication.featureList`, checkers, privacy/methodology descriptions, route registries, knowledge index, sitemap descriptions, `llms.txt`, AI discovery and shared CTAs. With the verifier off they must not say or imply:

- every client-facing/proposal/email claim is evidence-linked;
- every proposal claim is reviewed;
- unsupported client-facing claims are automatically blocked by the verifier;
- introduction/email claims are verified;
- exact source references exist for every proposal claim.

When the verifier is on in an isolated test, stronger claim-review wording is allowed, but never “truth verified”, “hallucination-free”, “guaranteed accurate/compliant”, match score, ranking, winner or suitability recommendation.

### 5.5 Tests

Add `lib/agency-public-messaging.test.ts` to `test:agency:acquisition`. Test both locales with flags off and verifier on. Assert mode, title, description, H1, hero, workflow, FAQ, feature list and CTA; forbidden language must be absent off-state and prohibited truth/ranking language absent in both states. Test that visible FAQ and JSON-LD share data, and that the CTA changes only when the linked tool exposes that mode.

Exit: all human- and machine-readable public surfaces tell the truth with protected flags off.

## 6. Checkpoint 2 — mobile commercial hierarchy

At mobile widths, order both Agency heroes as:

1. audience eyebrow;
2. H1;
3. plan summary from `lib/agency-plan.ts`;
4. one explanatory paragraph;
5. primary free evidence action;
6. commercial start action;
7. one text link to the fictional example;
8. supporting/product-boundary card.

Plan summary semantics:

- Dutch: `€ 99 per maand · 300 gedeelde CV-credits`;
- English: `€99 per month · 300 shared CV credits`.

Do not hard-code numeric values in page JSX. Use locale-aware plan helpers.

Actions:

- Dutch primary `Controleer CV-bewijs gratis` → `/tools/kandidaatvoorstel-checker`.
- English primary `Check CV evidence free` → `/en/candidate-proposal-checker`.
- Commercial action `Start MatchPack · [formatted monthly price]` → existing locale-preserving checkout/account flow.
- Fictional-example link must target a route that exists; do not invent an English route.
- Preserve attribution and intended destination through login. No sales-call or pilot gate.

Layout rules:

- grid children and columns use `min-width: 0`;
- long English labels wrap safely;
- controls are at least 44 CSS px high;
- actions stack full width below the small breakpoint;
- reduce repetitive badges/copy and mobile vertical padding before reducing readable type;
- one primary visual button; no three-button competition;
- no fixed width causes page-level overflow.

Acceptance:

- 320×568: task promise and plan summary before first scroll; no overflow.
- 375×812: complete primary action visible initially.
- 768×1024, 1024×768 and 1440×900: balanced hierarchy, no collision.
- every viewport: `document.documentElement.scrollWidth <= window.innerWidth`.

Exit: task, price and first action are immediately discoverable on mobile.

## 7. Checkpoint 3 — actionable credit diagnostics

Add one pure formatter/serializer, preferably `lib/agency-credit-errors.ts`, used by standalone creation, CSV import and first MatchPack approval.

Input:

```ts
type AgencyCreditLimitContext = {
  locale: "nl" | "en";
  used: number;
  limit: number;
  requested: number;
};
```

Derive `remaining = Math.max(limit - used, 0)` and `shortfall = Math.max(requested - remaining, 0)`.

Keep stable error codes and add bounded numeric fields to authenticated responses:

```json
{
  "code": "AGENCY_LIMIT_REACHED",
  "error": "300 of 300 shared CV credits have been used in this billing period.",
  "used": 300,
  "limit": 300,
  "remaining": 0,
  "requested": 1
}
```

Bulk example: `295 of 300 shared CV credits have been used. This import requests 8 credits; 5 remain.` Supply natural Dutch equivalents. Do not expose subscription/period/CV IDs or identity.

Behavior:

- calculate used inside the deciding transaction;
- use the stored period allowance, including custom 750 and zero;
- bulk reports requested rows;
- repeated approval/export remains credit-idempotent;
- exhaustion never blocks existing downloads/re-exports;
- API catch blocks preserve known code/context and sanitize unknown failures.

Tests: 0/300, 299/300, 300/300; 295/300 with 5 and 8 requested; 749/750 and 750/750; stored zero; both locales; repeat approval; two concurrent last-credit requests with exactly one success; existing export at limit; structured error propagation through each API.

Exit: every rejection explains actual account state and concurrency cannot double-consume.

## 8. Checkpoint 4 — plan and entitlement test completion

Directly test every commercial helper and contract:

- plan code `agency`, version `agency_99_300_2026_09`, EUR, 9900 cents, 300 credits;
- Dutch/English display and credit explanation;
- remaining clamps to zero;
- EUR 0.33 is labelled “at full use”, not a billing rate;
- checkout metadata contains bounded plan code/version/limit/display price/currency and no email, CV, candidate, vacancy or proposal identifiers;
- `resolveAgencyMonthlyLimit(null/undefined)` → 300, `0` → 0, `50` → 50 at runtime, `750` → 750;
- inactive subscriptions gain no paid access;
- new period inherits stored subscription limit;
- webhook renewal cannot lower custom limit and remains idempotent.

Provider tests must stub the boundary and require no real credentials.

Exit: price or credit semantics cannot drift without a focused failure.

## 9. Checkpoint 5 — complete migration and restore rehearsal

### 9.1 Migration-chain setup

`scripts/agency-tests-migrations.ts` must stop applying only three named old migrations. Discover sorted migration directories, locate exact target `20260903000000_agency_plan_99_300`, fail on missing/duplicate SQL, apply every preceding migration to the legacy database, seed, then run `prisma migrate deploy` through head. Never infer order from filesystem timestamps.

### 9.2 Required legacy fixture

Use deterministic `example.test` identities:

| Case | Before | Expected after target |
|---|---|---|
| ordinary subscription | limit 50 | 300 |
| custom subscription | limit 750 | 750 |
| zero legacy subscription | limit 0 | 300 by explicit migration rule; runtime zero preservation is separate |
| current period | allowance 50, used 37 | allowance 300, used 37 |
| future period | allowance 50 | 300 |
| expired period | allowance 50 | 50 |
| custom current period | allowance 750 | 750 |
| statuses/dates/cancellation | representative values | unchanged |

### 9.3 Idempotency and restore

Capture a canonical business projection after migration, execute the target SQL a second time directly in the isolated database, capture again and assert deep equality.

Prove full empty chain/no drift, legacy-forward/no drift, every fixture expectation, second-run equality, and logical backup/restore into a separate guarded database with matching migration history and business projection.

Do not assume the guarded DB is in Docker. Support direct configured `pg_dump`/`psql`, or Docker only after proving it is the isolated repository DB. Never print URLs/passwords. Validate every generated DB name before create/drop and touch no database outside those names.

Exit: `npm run test:agency:migrations` passes twice in PostgreSQL and proves all fixture rows.

## 10. Checkpoint 6 — visual fixture and score cleanup

`/agency/visual-test` must render exactly one shell. Exclude that exact development route from `BrandRouteBoundary` or make `AgencyAccountShell` its sole shell. Do not broadly exclude `/agency/*`. Keep the selector accessible, `noindex`, and unavailable in production. Test that `/agency` retains the public shell while the fixture is not double-wrapped.

Remove proposal-wide score, percentage, score band, dimensions, ranking, winner and suitability wording from visual fixtures/UI. If a legacy scored object is needed, move it to a unit fixture proving the Agency projection strips it.

With verifier off, visible stages are Sources, Candidate facts, Client text, Output, Approval. With verifier on in an isolated test, Claims appears in its domain position. Status, counts and blockers derive from saved domain state, never current UI index.

Exit: certification fixture is single-shell, score-free and flag-faithful.

## 11. Checkpoint 7 — full product certification

Public routes: `/agency`, `/en/agency`, `/voor-bureaus`, knowledge index, public-sector guide, fictional example, both checkers and linked privacy/methodology pages.

Authenticated fictional states: no subscription; active 0/300 and 299/300; exhausted 300/300; custom >300; retention unset; populated partial/missing-evidence MatchPack; approved exports; cancel-at-period-end paid-through; expired. Exercise owner, reviewer, editor and viewer across overview, MatchPacks, insights and every settings section.

Viewports: 320×568, 375×812, 768×1024, 1024×768, 1440×900. Record route/state, screenshot, scroll widths, visible price/CTA and result. Do not commit browser profiles/runtime logs.

Keyboard/accessibility:

- skip link, logical header/language/product/account order and visible focus;
- Escape/menu/dialog focus behavior;
- labels, help, errors and live status announcements;
- accessible evidence tables/scroll regions;
- disabled actions explain blockers;
- evidence status is not color-only.

Output parity with one canonical fictional approved snapshot:

1. record revision/digest;
2. export full PDF/DOCX and contact-reduced PDF/DOCX;
3. verify client-visible data derives from the snapshot;
4. verify direct contacts are removed and indirect-identifier warning remains;
5. verify re-export uses no credit;
6. render and inspect all PDF pages and DOCX previews.

Exit: no public/authenticated/mobile/keyboard/output release blocker remains, with dated evidence.

## 12. Checkpoint 8 — unit economics

Create `docs/product/werkcv-matchpack-unit-economics-2026-09.md`. Inspect actual configured code paths and current official provider documentation; never guess.

For standalone CV and first-approved MatchPack record provider/model, normal/max calls, token/file limits, retry ceiling, parsing/conversion, material storage/email, payment fees, tax boundary, official URL/access date and private-contract unknowns.

Calculate revenue excluding/including tax only when known; EUR 0.33 full-use reference; 300 standalone-CV worst case; 300 maximum MatchPack case; mixed use at 25/50/75/100%; retry sensitivity; contribution before fixed costs.

Mark `financially certified` or `financially uncertified` with the missing/unsafe input. If credible variable cost exceeds full-use revenue, stop activation; do not silently lower evidence/safety quality. Keep this internal and never turn it into an unsupported savings claim.

Exit: EUR 99/300 is judged from dated evidence, not intuition.

## 13. Checkpoint 9 — automated release gate

Run in order:

```text
npm run test:agency:acquisition
npm run test:agency:activation
npm run test:agency:unit
npm run test:workspace:unit
npx tsc --noEmit --pretty false
npm run build
npm run test:agency:integration
npm run test:agency:migrations
npm run test:agency:e2e
npm run test:matchpack
npm run test:agency:outputs
git diff --check
```

Run focused ESLint on every changed TS/TSX file, then full `npm run lint`. Existing unrelated failures may be documented; changed scope allows no new error/warning.

Negative scans: no current Agency EUR 149/14900/50 slots/50 CVs, pilot funnel, score/rank, disabled-feature promise, duplicate current price outside plan configuration, candidate content in telemetry/logs, or real PII in fixtures/downloads. Historical migrations/reports are allowed exclusions.

Docker/WSL/database failure is blocked, not passed. Do not activate with blocked integration, migration or E2E.

Exit: all gates pass in a production-compatible environment and the image/commit is immutable.

## 14. Checkpoint 10 — separately authorised coordinated release

Record candidate/current image digests, commits, migration head, flag states, safe Dodo product label and amount/currency/cadence, aggregate external renewal treatment, rollback image, and backup timestamp/size/checksum/restore result. No secrets/identities.

Dodo test must prove both locales, EUR 99 monthly, tax/payment display, cancel/return paths, one active 300-credit subscription, webhook replay idempotency, no duplicate welcome message, paid-through cancellation and bounded non-PII metadata.

Audit historical external subscriptions. Never leave a customer renewing at EUR 149 while advertising EUR 99 without documented treatment. Preserve dates/cancellation; never duplicate subscriptions.

Use documented GitHub Actions/GHCR/Hetzner flow:

1. freeze reviewed commit/image;
2. verify backup;
3. prepare matching EUR 99 Dodo reference;
4. run `prisma migrate deploy`, never production `db push`;
5. deploy exact image/config in the same window;
6. keep protected flags off;
7. run production smoke.

Smoke: both Agency pages 200 with EUR 99/300; old price absent in HTML/metadata/JSON-LD; guide/assets/checkers work; sitemap/`llms.txt` unique; canonical/hreflang correct; checkout charges EUR 99; fresh authorised subscription gets 300; fictional create→analyse→review→approve→PDF/DOCX works; re-export costs zero; logs clean; consumer login/editor/template/checkout/download unaffected.

Rollback on price mismatch, wrong/reduced entitlement, reset usage, consumer/Agency leakage, accidental gated capability, PII leak, approval/export failure, critical route failure or blocking mobile overflow. Keep additive 300-credit migration. If UI rollback causes price mismatch, disable Agency checkout with truthful maintenance copy until coherent.

Exit: live page, provider charge and database entitlement agree.

## 15. Checkpoint 11 — discovery and proof

After smoke and separate authorisation, submit sitemap once through authorised Google/Bing flows and inspect priority routes in `docs/werkcv-matchpack-agency-search-submission.md`. Record date, canonical, index state and errors. Do not claim indexing until confirmed; do not wait for SEO before separately authorised manual distribution.

Do not add testimonials, logos, time, accuracy or acceptance claims without evidence. Keep first external settled payment separate from activation (created, resolved, approved, exported). Record aggregate corrections/open points/time/outcome through privacy-safe measurement. One customer is not market leadership or product-market fit.

## 16. Required test inventory

| Area | Required proof |
|---|---|
| Capability copy | both locales; verifier off/on; body/metadata/FAQ/JSON-LD; forbidden claims absent |
| Plan | EUR/9900/300/version; display; explanation; remaining; full-use label |
| Checkout | locale/return; bounded metadata; no PII; request contract |
| Runtime limit | stored 0/50/300/750; inactive; inheritance; non-decreasing sync |
| Errors | used/limit/remaining/requested; single/bulk; locales; API preservation |
| Concurrency | final credit succeeds exactly once |
| MatchPack | first approval consumes once; reapproval/revision/export consumes zero |
| Migration | empty; 50/0→300; 750 preserved; expired unchanged; usage preserved; idempotent; no drift |
| Backup | isolated dump/restore and canonical equality |
| Shell | one visual shell; public `/agency` shell retained |
| No scoring | no score/rank in API, revision, CSV, UI or telemetry |
| Discovery | uniqueness, canonical/hreflang, downloads, sitemap/AI discovery |
| Analytics | exclusions; paid vs activated; no PII/content; bounded values |

Do not use source-text assertions where a pure-function, rendered, API or database test can prove behavior.

## 17. Manual release checklist

- [ ] Both off-state languages describe requirement-to-CV evidence only.
- [ ] No disabled verifier benefit exists in body, metadata, FAQ or JSON-LD.
- [ ] 375×812 shows plan summary and complete primary action initially.
- [ ] 320 px has no page-level overflow; matrices are accessible.
- [ ] Authenticated header/switcher/identity/settings never collide.
- [ ] Visual fixture has one shell and MatchPack no score.
- [ ] Limit errors show used, limit, remaining and requested.
- [ ] Existing items export at exhaustion.
- [ ] PDF/DOCX variants match approved snapshot.
- [ ] Keyboard/focus/screen-reader status behavior passes.
- [ ] Dodo test charges EUR 99 and creates 300 credits.
- [ ] Migration preserves custom limits, history and usage on second run.
- [ ] Backup restore is verified.
- [ ] Live page, checkout and entitlement agree.
- [ ] Consumer smoke passes and protected flags remain off.

## 18. Reporting and definitions of done

Append `Production remediation — September 2026` to the existing report. Include starting/ending state, files by checkpoint, exact capability contract, stale scan, tests, migration before/after/second run, DB/restore, viewport/accessibility, output parity, unit economics, safe Dodo state, production image/migration/deployment/rollback if authorised, live smoke, search actions done/pending, paid vs activated milestones, and every blocked/unrun/owner-pending item. Do not rewrite history or call code production completion.

**Code-complete:** Checkpoints 0–9 pass locally and in guarded PostgreSQL, focused lint clean, build successful, report truthful.

**Release-ready:** code-complete plus manual product/output/accessibility, economics decision, Dodo test, backup/rollback and historical-renewal treatment.

**Production-complete:** live copy truthful, UI/Dodo EUR 99, entitlement 300, migration/E2E/consumer smoke pass, logs clean, rollback recorded.

**Commercial objective:** a qualifying external account has a settled payment and subsequently approves and exports a MatchPack. Report sample size honestly.

## 19. Mandatory order

1. Baseline.
2. Capability copy.
3. Mobile hero.
4. Credit diagnostics.
5. Plan/entitlement tests.
6. Migration/restore.
7. Visual fixture/score cleanup.
8. Product/accessibility/output certification.
9. Unit economics.
10. Automated gate.
11. Stop and report readiness.
12. Only with separate authorisation: Dodo, production migration/deploy.
13. Only after smoke: search submission and authorised distribution.

If a checkpoint fails, fix and rerun it. Never make marketing true by enabling unfinished functionality, repair entitlements only in UI, or bypass migration gates.
