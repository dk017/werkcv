# WerkCV MatchPack agency acquisition sprint — implementation report

**Date:** 2 September 2026  
**Repository:** `D:/DKPlayground/werkcv`  
**Scope:** public MatchPack positioning, acquisition routes, authority transfer, privacy-safe measurement, fictional worked example, and release certification  
**Status:** code implemented and locally regression-tested; deployment, indexing, external review, and manual browser certification remain pending

## Executive status

The acquisition sprint is implemented as a migration-free, flag-off release. MatchPack is now described as candidate-submission software for recruitment agencies, with evidence-linked claims, visible gaps, recruiter review, and controlled PDF/DOCX output. A Dutch route registry, shared public-capability contract, fictional worked example, public checker mode, contextual consumer links, sitemap/AI-discovery entries, and privacy-safe acquisition funnel reporting are in place.

The following are deliberately **not** activated or changed:

- `PROPOSAL_CLAIM_VERIFIER_ENABLED` — effective value: `false`;
- `CANDIDATE_ACKNOWLEDGEMENT_ENABLED` — effective value: `false`;
- `CLAIM_BENCHMARK_PUBLICATION_ENABLED` — effective value: `false`;
- Agency billing: EUR 149 per month;
- shared allowance: 50 standalone Agency CVs or definitively approved MatchPacks per paid period;
- consumer pricing, authentication, checkout, quota, retention, approval, and export invariants;
- ATS integrations, client portal, ranking, candidate selection, generic summary expansion, or outreach automation.

This report separates code completion from release certification. The live site has not been changed by this implementation pass.

## 1. Before-state and evidence baseline

### Repository baseline

- Baseline source commit inspected: `d3df8d98c7d4d2f25ec3577417ecebb839f6dee7`.
- Working branch: `codex/seo-implementation-audit`.
- The worktree already contained unrelated tracked and untracked edits. They were preserved; no reset, clean, deploy, push, email, URL submission, or infrastructure pruning was performed.
- Effective feature flags were checked as unset/default-off. The new public capability contract therefore exposes only already-supported static capabilities.

### Supplied search baseline

The specification's supplied Search Console export covers 13 May–12 August 2026:

- `/agency`: 35 impressions, 0 clicks, 0% CTR, average position 9.34;
- `/voor-bureaus` and `/en/agency`: absent from 422 exported page rows;
- no Agency-intent term in the 1,000 exported query rows.

The supplied 27 May–24 August overview contains 31,507 site-wide impressions and 602 clicks (approximately 1.91% weighted CTR). This demonstrates general site visibility, not MatchPack demand.

### Supplied AI-citation baseline

The supplied Microsoft Clarity export covers 2 June–30 August 2026:

- no MatchPack or Agency route appears in the exported top-100 cited pages;
- no Agency-intent phrase appears in the exported top-100 grounding queries;
- `/cv-tips/cv-voor-detachering` is the adjacent cited route with 45 exported citations.

Citations and grounding queries are recorded as retrieval/citation evidence, not as visits, rankings, leads, or sales.

### Supplied product-analytics baseline

The supplied 2 September aggregate contained 190 Agency-related analytics rows over 90 days, including 19 `/agency` views, 6 `/voor-bureaus` views, 5 English checker views, 3 Dutch checker views, and one active Agency subscription/payment/MatchPack. These are rows, not unique people; internal/owner/test exclusions must be applied before commercial interpretation.

## 2. Implementation by checkpoint

### Checkpoint 0 — baseline and safety

The baseline above is recorded. The release remains additive and no Prisma migration was introduced. Existing unrelated files, generated output, logs, and auxiliary worktree files remain untouched.

### Checkpoint 1 — route, capability, pricing, and analytics contracts

Implemented:

- `lib/agency-acquisition.ts` — canonical route/intent registry, normalized internal destinations, reciprocal product hreflang validation, duplicate-intent detection, and account-URL guard;
- `lib/agency-public-capabilities.ts` — server-safe static/flagged/false public truth contract;
- `lib/agency-feature-flags.ts` — environment-injectable flag functions for deterministic tests;
- `lib/agency-plan.ts` — shared EUR price/allowance display helpers;
- `lib/agency-acquisition.test.ts` — registry, metadata limits, sitemap/AI-discovery coverage, copy safety, capability, pricing, and fictional-source tests;
- `lib/agency-analytics-contract.ts` and `lib/agency-analytics-contract.test.ts` — strict internal-path and content-free event contracts;
- `package.json` — `test:agency:acquisition` command.

The registry contains ten acquisition routes and no duplicate English category or Dutch how-to route.

### Checkpoint 2 — commercial category pages

Implemented:

- `app/agency/page.tsx` — Dutch category-led product page with exact registry metadata/H1, fictional example, evidence/recruiter/current-fact distinction, boundaries, price/allowance, FAQ, and product CTA;
- `app/en/agency/page.tsx` — native English category page with `candidate submission software` H1, one natural `candidate presentation software` use, EUR pricing, PDF/DOCX, CSV boundary, and flag-aware copy;
- `components/agency/AgencyCheckoutButton.tsx` — safe locale/attribution checkout events;
- `components/agency/AgencyRoiCalculator.tsx` — shared-price calculation without unsupported universal savings claims;
- `app/api/agency/checkout/route.ts`, `lib/dodo.ts`, `lib/dodo.test.ts` — registered route attribution only and existing checkout contract preservation.

Both pages lead with buyer outcome and evidence traceability. Neither presents a pilot, intake form, sales-call requirement, ranking, score, testimonial, customer count, or compliance guarantee.

### Checkpoint 3 — Dutch hub and shared presentation

Implemented:

- `app/voor-bureaus/page.tsx` — category/solution hub with distinct guide, example, checker, and product destinations;
- `app/voor-bureaus/kennisbank/page.tsx` — knowledge index with the new example;
- `app/voor-bureaus/layout.tsx` — shared route-family wrapper without duplicate footer/organization markup;
- `components/agency/AgencyGuideArticle.tsx` and `components/agency/AgencyGuideSpecialLink.tsx` — shared current-brand guide presentation, dates, Article/FAQ schema, and CTA handling;
- `app/globals.css` — public Agency compatibility descendant overrides removed; current `wk-*` cards/buttons/tokens remain the presentation source;
- `components/agency/AgencyInteractiveDemo.tsx` — dead/optional demo aligned to the canonical fictional data, shared plan values, current buttons/inputs, and safe grid wrapping.

### Checkpoint 4 — existing high-intent guides and trust pages

Implemented one route at a time:

- `app/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever/page.tsx`;
- `app/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau/page.tsx`;
- `app/voor-bureaus/kennisbank/cv-anonimiseren-recruitment/page.tsx`;
- `app/voor-bureaus/kennisbank/matchpack-handleiding/page.tsx`;
- `app/agency/privacy/page.tsx`;
- `app/en/agency/methodology/claim-evidence-benchmark/page.tsx`;
- `app/voor-bureaus/methodologie/claim-evidence-benchmark/page.tsx`;
- `components/agency/CandidateProposalEvidenceGuide.tsx`;
- `components/agency/ClaimEvidenceMethodology.tsx`.

Stale PDF-only/team-role language was corrected. Privacy copy now distinguishes contact-reduced output from legal anonymity and states that the agency remains responsible for its processing basis and notices. Candidate acknowledgement and benchmark performance remain visibly gated/pending.

### Checkpoint 5 — deterministic fictional example

Implemented:

- `lib/agency-fictional-example.ts` — sole canonical Nina de Vries / Stadshaven Zorggroep fictional source, claims, source locations, snippets, actions, introduction, and client email;
- `app/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld/page.tsx` — complete evidence-to-action example with no score/rank/recommendation;
- `components/agency/AgencySubmissionDemo.tsx` — shared fixture-driven demo and full/contact-reduced output links;
- `components/agency/CandidateProposalEvidenceChecker.tsx` and `components/agency/ProposalClaimVerifier.tsx` — current flag-accurate checker/verifier presentation;
- `public/downloads/werkcv-voorbeeld-kandidaatvoorstel-hr-adviseur.pdf`;
- `public/downloads/werkcv-voorbeeld-kandidaatvoorstel-hr-adviseur-geanonimiseerd.pdf`;
- `public/downloads/werkcv-voorbeeld-kandidaatvoorstel-hr-adviseur.docx`;
- `public/downloads/werkcv-voorbeeld-kandidaatvoorstel-hr-adviseur-geanonimiseerd.docx`.

The canonical source digest is:

`sha256:ad9fbc196a0c5b8fb43dd5db63b33ebdf67366e7872f952d124ae720cacd3f86`

Source snippets are tested for deterministic resolution. The downloadable PDFs were regenerated and inspected with `pypdf`; the full file contains only fictional Nina/role/source data, and the contact-reduced file has no direct name, email, phone, address, or postal code while retaining the visible residual-identification warning.

### Checkpoint 6 — authority transfer and discovery

Implemented:

- `app/cv-tips/[slug]/page.tsx` — contextual recruiter bridge on detachering and uitzendbureau routes without changing their job-seeker purpose;
- `app/sitemap.ts` — example route exactly once and editorial modification dates from `AGENCY_CONTENT_MODIFIED`;
- `lib/ai-discovery.ts` — all ten registry routes, current category wording, active-capability language, and no benchmark Dataset while publication is off;
- `app/llms.txt/route.ts` — current Agency price/allowance/capabilities and explicit benchmark publication status;
- `components/Footer.tsx` — MatchPack navigation, trust links, and corrected English privacy destination;
- `docs/werkcv-matchpack-agency-search-submission.md` — owner-operated post-deploy GSC/Bing/recrawl runbook.

### Checkpoint 7 — measurement and attribution

Implemented:

- `lib/analytics.ts` — bounded Agency/example/checker/output event types;
- `lib/attribution.ts` — canonical internal path normalization and no query/fragment persistence;
- `app/api/analytics/route.ts` — safe URL normalization and bounded error reasons, with no input/proposal/CV content in event URLs;
- `lib/agency-validation-funnel.ts` and `lib/agency-validation-funnel-server.ts` — route/intent stages, distinct eligible-actor derivation, server-authoritative product milestones, and attribution coverage;
- `lib/agency-validation-funnel.test.ts` — repeat events, cross-route journeys, owner/test exclusions, direct return attribution, zero denominators, and privacy assertions;
- `app/admin/analytics/matchpack/page.tsx` — route/intent acquisition table with raw numerators/denominators, `—` zero-denominator display, and coverage notes;
- `components/agency/AgencyContentAnalytics.tsx` and `components/agency/AgencyCtaLink.tsx` — example/checker/CTA interactions.

The funnel does not count page-view rows as people. Authoritative payment, subscription, MatchPack, approval, export, and repeat-use stages remain server/database derived.

## 3. Final route and intent registry

| ID | Canonical route | Intent | H1 | Primary action |
|---|---|---|---|---|
| `nl_product` | `/agency` | kandidaatvoorstel software recruitmentbureau | Maak onderbouwde kandidaatvoorstellen voor opdrachtgevers | fictive example or current free evidence checker; Agency checkout secondary |
| `nl_solution_hub` | `/voor-bureaus` | kandidaatvoorstellen voor opdrachtgevers | Kandidaat voorstellen aan een opdrachtgever, met bewijs uit het CV | choose guide/example/checker/product |
| `nl_how_to` | `/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever` | kandidaatvoorstel maken | Hoe maak je een kandidaatvoorstel voor een opdrachtgever? | complete example/checker |
| `nl_example` | `/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld` | kandidaatvoorstel voorbeeld | Kandidaatvoorstel voorbeeld: van CV-bewijs naar klantintroductie | checker / MatchPack |
| `nl_branded_cv` | `/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau` | cv in huisstijl recruitmentbureau | Hoe zet je een kandidaat-CV in de huisstijl van je recruitmentbureau? | MatchPack example |
| `nl_redaction_guide` | `/voor-bureaus/kennisbank/cv-anonimiseren-recruitment` | contact-reduced CV sharing | CV delen zonder directe contactgegevens: controleer ook indirecte herkenning | example |
| `nl_matchpack_guide` | `/voor-bureaus/kennisbank/matchpack-handleiding` | MatchPack handleiding recruiter | Van CV en vacature naar een controleerbaar kandidaatvoorstel | `/agency` |
| `nl_checker` | `/tools/kandidaatvoorstel-checker` | kandidaatvoorstel checker | Controleer CV-bewijs vóór je een kandidaatvoorstel verstuurt | `/agency` |
| `en_product` | `/en/agency` | candidate submission software | Candidate submission software for recruitment agencies | English checker / checkout |
| `en_checker` | `/en/candidate-proposal-checker` | candidate proposal checker | Check candidate-proposal claims against CV evidence | `/en/agency` |

Only `/agency` and `/en/agency` declare reciprocal language alternates. Trust and methodology routes are indexable but are not falsely declared as language equivalents.

## 4. Public capability truth table

| Capability | Public value in this release | Source |
|---|---:|---|
| PDF export | true | existing Agency output contract |
| DOCX export | true | existing Agency DOCX output contract |
| reusable Agency templates | true | existing template API/workspace |
| team roles | true | existing Agency permission matrix |
| revision history | true | existing MatchPack revisions |
| CSV exchange | true | existing import/export routes |
| retention controls | true | existing Agency settings/sweep |
| deletion controls | true | existing permission/data routes |
| Proposal Claim Verifier | false | `PROPOSAL_CLAIM_VERIFIER_ENABLED` off |
| candidate acknowledgement | false | `CANDIDATE_ACKNOWLEDGEMENT_ENABLED` off |
| published benchmark | false | `CLAIM_BENCHMARK_PUBLICATION_ENABLED` off |
| ATS integration | false | no direct integration exists |
| client portal | false | explicitly deferred |
| automated client sending | false | explicitly deferred |

## 5. Claim and copy corrections

- Agency output copy now says PDF **and** DOCX, including the shared-snapshot relationship.
- Team roles and reusable templates are described as available where the inspected product supports them.
- “Works alongside your ATS via CSV exchange” replaces direct ATS-integration claims.
- “Contact-reduced” and residual-identification limitations replace unqualified anonymous/anonymised wording.
- Evidence is described as source support, not truth or identity verification.
- Candidate confirmation is described as a future/flag-controlled process, not consent or an electronic signature.
- Ranking, score, winner, suitability, selection, and hiring recommendations are explicitly excluded from MatchPack marketing and the worked example.
- The old English `/en/agency` navigation destination was corrected to valid English pricing/product routes.
- Duplicate `id="voorbeeld"` usage was removed from the demo; the canonical section remains uniquely addressable.
- Legacy public hard-border/hard-offset-shadow descendant overrides were removed from `app/globals.css`.
- Benchmark/accuracy pages and `llms.txt` now state that reviewed performance is not published while the flag is off.
- Formal Dutch `u/uw` usage in the scoped Agency copy was replaced with consistent `je/jouw/jullie` voice.

## 6. Internal-link map

| Source | Visible anchor/action | Destination |
|---|---|---|
| `/cv-tips/cv-voor-detachering` | Bekijk hoe je een kandidaatvoorstel maakt | `/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever` |
| `/cv-tips/cv-voor-detachering` | Bekijk MatchPack voor bureaus | `/agency` |
| `/cv-tips/cv-voor-uitzendbureau` | bureau-context branch | Dutch how-to and `/agency` |
| `/voor-bureaus` | Kandidaatvoorstel maken | Dutch how-to |
| `/voor-bureaus` | Bekijk een volledig voorbeeld | Dutch fictional example |
| `/voor-bureaus` | Controleer bewijs | Dutch checker |
| `/voor-bureaus` | Bekijk MatchPack | `/agency` |
| Dutch how-to/guides | example/checker/product contextual links | canonical registry routes |
| fictional example | gratis checker / MatchPack actions | Dutch checker / `/agency` |
| `/agency` | Open het volledige voorbeeld / checker / privacy | canonical example, checker, Agency privacy |
| `/en/agency` | View fictional example / free checker | English checker and the native English product route |
| MatchPack footer | Methodologie, checker, handleiding, privacy | canonical trust routes |

No site-wide Agency banner was added to consumer editor, pricing, login, checkout, or download flows.

## 7. Analytics and attribution contract

Tracked interaction families include `agency_content_cta_clicked`, `agency_example_viewed`, `agency_sample_pack_downloaded`, `agency_checker_started`, `agency_checker_completed`, `agency_checkout_cta_clicked`, `agency_checkout_started`, `agency_checkout_failed`, `matchpack_cta_selected`, and existing Agency product events. Properties are bounded to route IDs, locale, CTA location, output variant, input type, latency/error category, and verdict counts.

Excluded from analytics and logs: CV/proposal/vacancy text, evidence snippets, filename, candidate/recruiter name, email, organisation, and free-form field values. URL paths are internal, normalized, and query/fragment-free.

Actor exclusions use the central policy for configured internal owners, `@werkcv.nl`, fixtures, smoke/automation/test domains and plus-addresses, excluded subscriptions, bots, and health checks. No owner email is hardcoded in the new funnel.

The report separates identity namespaces and shows product-attribution coverage. Rates display raw numerator and denominator, and `—` when the denominator is zero.

Example calculation: if three distinct eligible actors have completed the checker and one of those three selected a MatchPack CTA, the displayed rate is `1 / 3 = 33.3%`; repeated events from any actor do not increase the numerator.

## 8. SEO, structured data, sitemap, and AI discovery

- All ten acquisition routes are represented exactly once in `app/sitemap.ts` and `lib/ai-discovery.ts`.
- Registry product routes self-canonicalize and declare reciprocal `/agency` ↔ `/en/agency` alternates.
- Public pages use non-`www` `https://werkcv.nl` URLs in metadata and structured-data links.
- Commercial routes use visible-content-aligned `SoftwareApplication`, `Offer`, `BreadcrumbList`, and FAQ data where applicable.
- Price and allowance in structured data are derived from `lib/agency-plan.ts`.
- No ratings, testimonials, customer counts, or Dataset markup are published.
- Methodology pages are indexable and transparent about review status; no benchmark results are represented as published while the publication flag is false.
- `/llms.txt` and the JSON discovery surfaces contain the current category language and feature state.
- Private account/editor/checkout/API/candidate-session routes remain outside the public acquisition registry and sitemap.

Search-engine submission and recrawl are not code-certifiable. The owner runbook is at [the search-submission runbook](../werkcv-matchpack-agency-search-submission.md).

## 9. Fictional output verification

The source-span test passed against the canonical digest shown above. The output smoke suite generated and checked full and contact-reduced PDF/DOCX files:

- full PDF generated and parsed;
- contact-reduced PDF generated and parsed;
- full DOCX generated and parsed;
- contact-reduced DOCX generated and parsed;
- output smoke assertion: `Agency PDF/DOCX output smoke checks passed.`

The public example demo now links both formats for the full and contact-reduced variants. The contact-reduced filename retains the existing `geanonimiseerd` compatibility name, while all visible copy uses “zonder directe contactgegevens” and explains residual identification risk.

The existing smoke script still builds its internal test fixture from an older local sample object (`scripts/agency-submission-pdf-smoke.ts`) rather than importing the canonical public fixture. This is a test-fixture maintenance deviation only; the public downloadable PDFs and example page use the canonical fixture. A future safe refactor should import `agencyFictionalCandidateData` into that script.

## 10. Verification commands

| Command | Result |
|---|---|
| `npm run test:agency:acquisition` | PASS — 9 tests |
| `npm run test:agency:activation` | PASS — 27 tests |
| `npm run test:agency:unit` | PASS — 9 tests |
| `npm run test:workspace:unit` | PASS — 13 tests |
| `npm run i18n:validate-routes` | PASS — 20 one-to-one pairs |
| `npm run test:conversion-funnel` | PASS — 16 tests |
| `npm run test:organic-conversion` | PASS — 17 tests |
| `npm run test:cited-authority-conversion` | PASS — 15 tests |
| `npm run test:agency:outputs` | PASS — PDF/DOCX smoke; optional `canvas` warnings only |
| `npx tsc --noEmit --pretty false` | PASS |
| focused `npx eslint` over changed acquisition paths | PASS — 0 errors, one ignored CSS warning |
| `npm run build` | PASS — optimized build completed; existing dynamic-font warning emitted |
| `git diff --check` | PASS — only line-ending warnings |

A local production-server route smoke also returned HTTP 200, one H1, a canonical URL, and a relevant CTA for all nine public routes listed in the manual section. This is an automated HTML smoke, not a substitute for the required human viewport, keyboard, screen-reader, or visual comparison review.

The full `npm run lint` command exits 1 because of pre-existing unrelated `require()` errors in `local/wordpress-sandbox/capture-screenshots.cjs`, `scripts/create_pilot_access.js`, and WordPress webpack configuration files. It also reports existing warnings in PhotoUpload, global error, LoginForm, RelatedCVs, and Prisma seed code. No acquisition-sprint path produced a lint error in the focused run.

## 11. Manual and environment-limited gates

**NOT CERTIFIED in this pass:**

- manual browser inspection at 320, 375, 768, 1024, and 1440px for all nine required public routes;
- keyboard/screen-reader walkthrough and screenshot attachment for each route;
- live 200/canonical/robots/title/H1/CTA checks after deployment;
- authenticated Agency smoke with a disposable authorised account;
- production database integration/migration/E2E suites (no database change was introduced, and no safe production-like environment was used);
- independent bilingual benchmark review, private holdout execution, and publication threshold certification;
- Google Search Console/Bing inspection, submission, and recrawl confirmation;
- seven-day error/404/CTA/checker/checkout monitoring;
- external recruiter review and commercial willingness-to-pay validation.

These are release-certification gates, not silently assumed successes. The release should remain blocked from an unqualified production-certification statement until an owner completes them.

## 12. Deferred work and explicit boundaries

- Candidate acknowledgement, Proposal Claim Verifier, and benchmark publication remain behind their existing flags and separate release gates.
- Multi-candidate comparison, new ATS integrations, client portal, generic summary/template expansion, and competitor-comparison pages remain deferred by the specification.
- No outbound outreach, LinkedIn posting, email campaign, search submission, or IndexNow call was made.
- No deployment, commit, push, migration, data mutation, or Docker cleanup was performed.

## 13. Proposed deployment and rollback record

This section is intentionally a template because deployment was not authorized in this pass.

- Proposed release identifier: `TBD after reviewed commit/build`.
- Previous production rollback identifier: `TBD — record the currently live image/commit before deployment`.
- Database migration state: no new migration; existing migration state must be recorded before deployment.
- Deployment owner: `TBD`.
- Product reviewer: `TBD`.
- Security/privacy reviewer: `TBD`.
- Content/SEO reviewer: `TBD`.
- Manual verification date: `TBD`.
- Search submission date: `TBD`.
- Observation-clock start: only after every Section 12.1 condition in the specification is evidenced.

## 14. Deviations and risk

1. **Manual screenshots/accessibility not attached.** The current environment did not provide a completed browser certification pass. Risk: visual overflow or interaction regressions could remain undiscovered. Mitigation: perform the specified viewport and keyboard walkthrough before deployment.
2. **Database integration/migration/E2E not run.** The sprint is migration-free and did not alter the underlying Agency workflow, but no production-like database gate is claimed. Risk: environment-specific integration regressions remain possible. Mitigation: run the existing suites in a safe disposable environment.
3. **Canonical fixture not imported by the old smoke script.** Public assets and page use the canonical fixture; the script still contains a separate internal fixture because the script path could not be safely edited through the workspace patch mechanism. Risk: future output changes could drift the script fixture. Mitigation: refactor the script before benchmark/output certification.
4. **Full lint remains red on unrelated files.** Focused lint is clean for changed acquisition paths. Risk: repository-wide lint cannot be used as a single green release signal until unrelated errors are repaired or excluded. Mitigation: keep the unrelated fixes separate and retain the focused result in this report.
5. **No benchmark results are published.** The methodology and release gate exist, but independent review and holdout evidence are not complete. Risk: no public accuracy claim is available. Mitigation: do not enable the publication flag until every review and threshold gate passes.

## 15. Reviewer sign-off placeholders

- Engineering reviewer: `________________` Date: `__________`
- Product/agency-workflow reviewer: `________________` Date: `__________`
- Privacy/security reviewer: `________________` Date: `__________`
- Dutch content reviewer: `________________` Date: `__________`
- English content reviewer: `________________` Date: `__________`
- Independent recruiter reviewer: `________________` Date: `__________`

**Conclusion:** the requested implementation is present and locally tested with the feature flags off. It is ready for a deliberate manual and deployment-certification pass, not for an unsupported claim that search visibility, AI citation, agency traffic, or sales have already improved.
