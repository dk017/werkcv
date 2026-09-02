# WerkCV MatchPack SEO-led validation and production activation specification

**Date:** 1 September 2026  
**Status:** Implementation specification  
**Intended executor:** GPT-5.6 Luna Max or equivalent  
**Product:** WerkCV MatchPack

## 1. Mission

Turn the existing MatchPack implementation into a production-certified, SEO-led product-validation system. The completed journey must be measurable from discovery to repeat use:

**Qualified search visit → free Proposal Claim Verifier → methodology/trust → MatchPack account → paid Agency subscription → approved export → repeat MatchPack use**

Position MatchPack as:

> The pre-send evidence and acknowledgement layer for recruitment agencies. MatchPack shows where every client-facing claim came from, asks the candidate to confirm changing information, and lets the recruiter approve one controlled final version—without replacing the ATS or ranking candidates.

The defensible product chain is:

**Original CV → exact source span → atomic proposal claim → recruiter disposition → candidate acknowledgement of a named-client version → immutable approved snapshot → consistent PDF/DOCX export**

This is not a passive plan to wait for SEO. Complete the benchmark, verifier, English journey, measurement, indexing operations and production certification before starting the observation period.

## 2. Scope and authority

This document authorises implementation work. It does not by itself authorise production deployment, benchmark publication before independent review, customer contact, a price change, legal claims, or feature-flag activation before its gate passes.

If an earlier plan conflicts with this document, these decisions control:

- MatchPack is the product. “Agency” may remain the billing tier and authenticated route namespace.
- Add a public English commercial route at `/en/agency`. This is the sole override of an earlier restriction against that route.
- Authenticated users continue at `/agency/account`; do not build `/en/agency/account`.
- The public verifier result is fully useful without an email gate.
- Candidate acknowledgement applies to the current immutable snapshot, with only the controlled override defined below.
- WerkCV remains pre-send quality control, not an ATS, ranking engine, identity service, client portal or electronic-signature system.

## 3. Locked decisions

### 3.1 Commercial and acquisition

- Keep the Agency billing tier at **€149 per month**.
- Keep one shared allowance of **50 standalone Agency CVs or definitively approved MatchPacks** per billing period.
- English pages must disclose: “€149 per month, billed in EUR.” Do not invent GBP or USD prices.
- Do not create a permanent free Agency plan, discount, pilot funnel or required sales call.
- Do not add a stored trial in this programme. Reconsider it only under section 16.5 and write a separate specification first.
- Do not use paid traffic in this programme.
- Use SEO-led and product-led acquisition, but do not wait passively for rankings.

### 3.2 Product boundary

- Keep the existing CSV import/export route.
- Build no further ATS integration until the same named ATS is requested by at least 10 paying agencies or 20% of active Agency accounts within 90 days.
- Do not build a client portal, generic template expansion, generic summaries, candidate ranking/scoring, winners or recommendations.
- Do not create competitor-comparison pages unless testing is lawful, current and reproducible.
- Keep consumer CV Builder and MatchPack separate in navigation, entitlements, checkout, retention and analytics.

### 3.3 Truth and legal boundary

Never claim WerkCV:

- establishes objective truth or legal identity;
- provides an electronic signature, consent or right-to-represent;
- selects, scores or ranks candidates;
- guarantees GDPR, UK GDPR, EU AI Act, recruitment-code or ATS compliance;
- is “hallucination free,” “100% accurate” or incapable of inventing content;
- makes a document legally anonymous by removing contact details;
- saves a specific amount of time before measured external evidence exists.

Use these definitions everywhere:

- **CV evidence:** exact content that deterministically resolves to the submitted CV.
- **Candidate-confirmed information:** information acknowledged for the named recipient and current snapshot; not CV evidence.
- **Recruiter assessment:** professional recruiter judgement; not source evidence.
- **Candidate acknowledgement:** confirmation, correction or decline of the displayed version; not identity proof, consent, signature or right-to-represent.
- **Contact-reduced output:** direct contact information removed; residual identifiers may remain.

## 4. Verified starting state and P0 defects

Before editing, inspect the current repository and preserve working behaviour. The codebase already includes parsing, vacancy evidence, visible open points, editable recruiter copy and commercial facts, source references, review states, revisions, immutable approval, snapshot-derived PDF/DOCX exports, templates, CSV, roles, retention/deletion, verifier code, acknowledgement code, benchmark scaffolding and release tests.

The activation controls are:

- `PROPOSAL_CLAIM_VERIFIER_ENABLED`
- `CANDIDATE_ACKNOWLEDGEMENT_ENABLED`
- `CLAIM_BENCHMARK_PUBLICATION_ENABLED`

All must default off and remain off until their gates pass. Existing internal data is implementation evidence, not market validation. At specification time there are no verified external paying Agency subscriptions, MatchPacks or candidate acknowledgements after excluding owner/internal/test actors.

Fix these P0 defects in the first release:

1. `components/agency/ProposalClaimVerifier.tsx` links to nonexistent paths `/en/candidate-proposal-checker/methodology` and `/voor-bureaus/methodologie/claim-verifier`. Link instead to:
   - `/en/agency/methodology/claim-evidence-benchmark`
   - `/voor-bureaus/methodologie/claim-evidence-benchmark`
2. `components/agency/AgencyRoiCalculator.tsx` emits `path`, `submissions`, `minutes`, `hourlyCost`, `reductionPercent`, `potentialHoursSaved`, and `potentialCostSaved`; `app/api/analytics/route.ts` expects `recruiters`, `proposalsPerRecruiter`, and `minutesSaved`. Create one shared typed schema, import it at both boundaries, and prove the real UI payload is accepted. Do not replace strict validation with arbitrary data.

The following are external gates and must remain visibly incomplete until a human does them: independent bilingual benchmark review, credentials/conflict statement, disagreement adjudication, legal review of any right-to-represent wording, search-console submission/inspection, and external payment/repeat-use evidence.

## 5. Implementation discipline

Use this authority order: this specification; existing database/security/approval invariants; canonical registries and shared brand components; primary sources in section 22; then current behaviour where it does not conflict.

The executor must:

- inspect affected files and tests before editing;
- reuse shared domain and security utilities;
- make migrations additive and rollback-compatible;
- never remove legacy fields in this programme;
- preserve unrelated working-tree changes;
- implement and verify one release unit at a time;
- use fictional or properly authorised data;
- document material assumptions instead of silently deciding them.

## 6. Shared product truth and copy contract

Create or extend a shared MatchPack terminology/copy module used by public pages, authenticated screens, emails, exports and structured data. Every relevant page must explain that MatchPack checks support in the submitted CV, shows exact evidence, keeps gaps/changing facts visible, collects acknowledgement for a named recipient, and leaves approval with a human recruiter.

Copy rules:

- Say “supported by the submitted CV,” never “verified true.”
- Say “candidate confirmation needed,” never imply dishonesty.
- Say “contact-reduced,” not “anonymous,” unless residual identifiers are explained.
- Say “controlled approved version,” not “legally signed version.”
- Do not advertise disabled or incomplete features as live.
- Couple every numerical performance statement with sample size, time window, methodology and last-evaluated date.

## 7. Phase 0 — Safe baseline and measurement repair

1. Review and commit the current brand/product state as a separate atomic release.
2. Reconcile it with `main` without discarding unrelated changes.
3. Run lint, production build, all current tests, Prisma migration rehearsal, Agency E2E, mobile checks and PDF/DOCX visual checks.
4. Test public and authenticated layouts at 320, 375, 768 and desktop widths.
5. Preserve the deployed baseline image and database backup as rollback targets.
6. Fix both P0 defects in section 4.
7. Inventory every client analytics event against the server validator. Add a contract test that fails if a known client event has no schema or its sample payload is rejected.
8. Keep analytics content-free: no CV/proposal text, filename, evidence snippet, candidate email or recruiter note.
9. Use client events only for interactions; use server/database records for payment and workflow completion.
10. Test the three flags independently and in every combination. Missing or invalid values must mean disabled.

Exit only when all baseline tests and migration rehearsal pass, live-shaped ROI data is accepted without content, both methodology links return 200, the consumer purchase/download funnel is healthy, and all new flags remain off.

## 8. Phase 1 — Shared provenance and benchmark certification

### 8.1 Provenance contract

Use one versioned `ProposalClaimVerificationV1` contract in the free verifier, saved MatchPack and every revision. It must contain:

- exact proposal claim text and character range;
- category: experience, duration, responsibility, skill, education, result, numerical scope, current fact or other;
- verdict: `supported`, `partially_supported`, `unsupported`, `contradicted`, `confirmation_required` or `not_checkable`;
- evidence source: `cv`, `candidate_acknowledgement`, `recruiter_assessment` or `none`;
- one or more source references with digest, page/line, section, character range and exact snippet;
- a source-support explanation, never a truth judgement;
- reviewer status, identity, timestamp and note;
- verifier, prompt and model identifiers and generation time.

Include `claimVerificationData` in MatchPack revisions and the approved snapshot digest. A displayed citation must deterministically resolve against the stored source and digest. If resolution fails, downgrade the verdict and do not show invented evidence. Add deterministic checks for numbers, dates, durations, negation and employer attribution. Vacancy requirements are context, never evidence. Treat instructions inside uploaded documents only as document content.

### 8.2 Benchmark corpus

Replace the repetitive draft scaffold with **WerkCV Claim–Evidence Benchmark v1**, containing 100 wholly fictional cases:

- 60 public cases: 30 Dutch and 30 English;
- 40 private holdout cases: 20 Dutch and 20 English;
- at least eight occupational families and multiple seniority levels;
- PDF, DOCX and pasted-text inputs;
- realistic paraphrases, multiple-source claims, numbers, dates, inflated responsibilities, wrong employer attribution, missing information, current facts, negation and subjective statements;
- no verdict class below 10% of labelled claims.

Every label must contain the exact proposal span, expected verdict, accepted source span or explicit absence, error category, annotation rationale, source version and checksum.

The private holdout must not be committed or publicly served. Load it only from `CLAIM_BENCHMARK_HOLDOUT_PATH`. Commit only its manifest, checksum and aggregate evaluation output. Fail safely if the path or checksum is wrong.

Create:

- `docs/methodology/claim-evidence-annotation-guide-v1.md`
- `docs/methodology/claim-evidence-review-record-template.md`
- `docs/methodology/claim-evidence-data-card-v1.md`

### 8.3 Independent human review

The internal author labels every case using the guide. An independent bilingual reviewer with recruitment-agency submission experience reviews every label. Record credentials, role, conflicts, disagreements and adjudications. Obtain a second specialist opinion for unresolved disagreements. Calculate and publish pre-adjudication agreement. Do not publish performance claims before this process is complete.

### 8.4 Evaluation protocol

Run each case three times with pinned application commit, parser, verifier version, prompt, model, temperature/settings and source checksums. Calculate:

- claim-extraction precision and recall;
- macro-F1 and per-class precision/recall;
- unsupported/contradicted catch recall;
- supported-claim severe false-alarm rate;
- citation-resolution validity;
- numerical-contradiction recall;
- current-fact confirmation recall;
- parser success by PDF, DOCX and text;
- Dutch versus English performance;
- run-to-run verdict stability;
- bootstrap confidence intervals;
- known limitations and representative failure cases.

Public thresholds:

- citation validity: 100%;
- unsupported/contradicted recall: at least 90%;
- supported claims labelled unsupported/contradicted: at most 5%;
- macro-F1: at least 0.80;
- current-fact confirmation recall: at least 90%;
- verdict stability: at least 95%;
- no unexplained Dutch/English difference greater than 10 percentage points.

Never delete difficult cases to pass. A failed threshold blocks an unqualified accuracy claim; publish the actual result and limitation only after independent review.

### 8.5 Publication gate

After review and thresholds pass, publish the 60-case set as versioned JSONL and CSV under CC BY 4.0, with data card, result history, changelog and visible last-evaluated date. Add valid `Dataset` JSON-LD with creator, version, licence and distributions. Keep the holdout private. Enable `CLAIM_BENCHMARK_PUBLICATION_ENABLED` only after production smoke tests confirm files, metadata and methodology pages.

## 9. Phase 2 — Proposal Claim Verifier

Make claim verification the default mode on `/tools/kandidaatvoorstel-checker` and `/en/candidate-proposal-checker`. Preserve vacancy-requirements-versus-CV as an explicitly named secondary mode at `?mode=requirements`; canonicalise the base path and do not index the query variant separately.

Inputs:

- CV: PDF, DOCX or pasted text;
- candidate proposal/client introduction;
- optional vacancy context;
- Dutch or English;
- maximum 10 MB, 18,000 extracted CV characters and 8,000 proposal characters.

Processing order: parse and map source → split proposal into atomic checkable claims → resolve claim spans → retrieve candidate evidence → classify → deterministically resolve every cited span → run number/date/duration/negation/attribution checks → return cards and aggregate counts, never a match score.

Each result card must show the exact claim, verdict, plain-language reason, exact CV evidence and location, conflicting evidence when present, changing facts needing confirmation, and one action: retain, rewrite, remove, ask candidate or manually review. Provide limitations, correct methodology link, copy-report action and a contextual MatchPack CTA only after the complete result. Do not gate any result behind email or account creation.

Privacy and abuse controls:

- do not persist raw CV, proposal, filename or result;
- do not include source content in logs or analytics;
- record only locale, input type, latency, error category and verdict counts;
- add IP rate limiting, concurrency limits, hard timeouts and `Cache-Control: no-store`;
- confirm configured AI-provider terms do not use submitted data for public model training;
- place no advertising or session-replay scripts on verifier pages.

MatchPack integration adds “Check client-facing claims” after drafting and before candidate acknowledgement. Unresolved `unsupported` or `contradicted` claims block approval. `confirmation_required` must be removed or resolved by current acknowledgement. `partially_supported` and `not_checkable` require explicit recruiter disposition. Editing affected content invalidates its review and reruns only changed sections. All exports must still derive from one approved snapshot.

Enable `PROPOSAL_CLAIM_VERIFIER_ENABLED` only after benchmark publication is legitimately enabled, every displayed citation resolves, known unsupported/contradictory fixtures cannot pass unresolved, privacy tests pass and both locale flows pass production smoke tests.

## 10. Phase 3 — Candidate acknowledgement

Before invitation require candidate email, named receiving organisation, vacancy title, selected full/contact-reduced output, current introduction/email/commercial facts, agency legal name, privacy-policy URL and actual retention expiry date.

Create an immutable review snapshot and digest covering recipient, vacancy, selected CV content, introduction, email, commercial facts, claim-verification results, locale and statement version. Visual-only colours may be excluded; client-visible facts may not.

Preserve or complete these models:

- `AgencyCandidateReview`: MatchPack/revision, candidate email, recipient, immutable snapshot/digest, status, token hash/expiry, lifecycle timestamps, statement version, response and retention expiry.
- `AgencyCandidateReviewSession`: hashed secret, review, created/expiry/revocation times.
- `AgencyCandidateReviewSuggestion`: target, original/proposed value, note, status, recruiter resolution and timestamps.
- `AgencyCandidateReviewEvent`: append-only invitation, exchange, view, response, resolution, invalidation, resend and override events.
- Transactional outbox: unique `dedupeKey` and related entity ID; safely backfill old welcome-email records before changing uniqueness.

Access security:

- emailed 256-bit random token, stored only as SHA-256 hash;
- 72-hour expiry, revocable, single-use and bound to review/snapshot digest;
- canonical configured HTTPS origin, never request `Host`;
- token in URL fragment; GET must not consume it;
- candidate selects “Open proposal,” then same-origin POST atomically consumes the token, creates a hashed 60-minute session and redirects to a clean URL;
- secure HttpOnly SameSite cookie, CSRF/origin enforcement, no-store, no-referrer, restrictive CSP, no third-party analytics and neutral expired/revoked responses;
- do not store raw IP or user agent; rate-limit with short-lived pseudonymous network keys.

Candidate view must show agency identity/privacy link, named client/vacancy, purpose, plain-language AI explanation, exact selected CV and proposal, changing facts separately, exact sharing scope, retention date and human contact. Actions are confirm, suggest section-level corrections or decline this version. State clearly that mailbox control is not strong identity proof.

Suggestions never edit MatchPack directly. Recruiter acceptance creates a revision and invalidates the prior acknowledgement; send a new invitation for the new snapshot. Use “acknowledgement” and “confirmed/corrected information,” never consent, verification or signature.

Approval requires acknowledgement for the current snapshot. Reviewer/owner override is allowed only if invitation is unavailable, expired or unanswered, with a 20–500 character reason and immutable event. Override is forbidden after explicit decline, with unresolved corrections, for a stale snapshot, or while critical unsupported/contradictory claims remain. Approved digest records acknowledgement or override. Any client-visible change invalidates acknowledgement and approval.

Enable `CANDIDATE_ACKNOWLEDGEMENT_ENABLED` only after email delivery, security, retention, mobile/accessibility and all candidate E2E gates pass.

## 11. Phase 4 — English/UK commercial journey

Create `/en/agency` using the current brand system and shared MatchPack components. It must be a complete English commercial page, not a translated shell. Include:

1. outcome-led promise and a concise explanation of the pre-send evidence layer;
2. primary action: use the free Proposal Claim Verifier;
3. secondary action: view a fictional MatchPack example;
4. workflow from source to approved export;
5. exact-source evidence, visible missing/changing information and recruiter control;
6. candidate acknowledgement with its limitations;
7. PDF/DOCX and contact-reduced outputs;
8. privacy, retention and security summary with policy links;
9. transparent price: **€149 per month, billed in EUR. Up to 50 standalone Agency CVs or approved MatchPacks per billing period**;
10. FAQ addressing ATS relationship, data use, acknowledgement, evidence limitations, currencies and cancellation;
11. checkout/account CTA that preserves the MatchPack intent through shared login.

Do not claim Dutch-specific practice applies in the UK. Do not market right-to-represent until wording and workflow receive separate legal review. Existing authenticated routes remain locale-capable at `/agency/account`.

Certify the complete English path: landing → verifier → methodology → pricing → login → checkout → return → account → first MatchPack → export. Check language persistence, EUR disclosure, international payment method availability from the actual payment provider, errors, email copy, mobile behaviour and no unintended Dutch copy.

## 12. Phase 5 — SEO and AI discovery

### 12.1 Intent-to-route map

Do not create overlapping keyword pages. Assign one canonical route to each intent.

| Locale | Intent/root query | Canonical destination |
|---|---|---|
| NL | kandidaatvoorstel recruitment | Existing candidate-proposal guide |
| NL | kandidaatvoorstel software | `/agency` |
| NL | kandidaatvoorstel checker / CV bewijs | `/tools/kandidaatvoorstel-checker` |
| NL | CV in huisstijl recruitment | Existing house-style guide |
| NL | CV anonimiseren recruitment | Existing guide, rewritten around contact-reduced limitations |
| NL | claim-evidence methodologie | `/voor-bureaus/methodologie/claim-evidence-benchmark` |
| EN | candidate submission / presentation software | `/en/agency` |
| EN | candidate proposal / evidence checker | `/en/candidate-proposal-checker` |
| EN | claim-evidence methodology | `/en/agency/methodology/claim-evidence-benchmark` |
| EN | submission template / branded CV / checklist | Cover within `/en/agency`; create a separate guide only after Search Console shows distinct demand |

Do not commercially target “right to represent” until legal review.

### 12.2 Content quality contract

Every commercial or educational page must:

- answer its main question within the first 120 words;
- include a realistic fictional example;
- distinguish CV evidence, recruiter assessment and candidate-confirmed information;
- state limitations and what the tool does not establish;
- cite primary/authoritative sources for legal or technical claims;
- show author/reviewer and last-reviewed date where appropriate;
- use no unsupported statistics;
- have one dominant intent-aligned CTA;
- add substantive value, not keyword-swapped boilerplate.

Do not mass-produce pages from root keywords. New pages require distinct intent, evidence of demand, unique substance and a named maintenance owner.

### 12.3 Technical SEO

- All canonical public routes must return 200 and self-canonicalise.
- Add reciprocal NL/EN `hreflang` and `x-default` where content equivalents genuinely exist.
- Keep query-mode variants out of the index.
- Add unique sitemap entries with editorial `lastmod`, not a build-time timestamp for every URL.
- Keep account, checkout, candidate-session, API and admin paths non-indexable.
- Use truthful `SoftwareApplication`/`WebApplication`, `BreadcrumbList`, and `Offer` structured data where applicable.
- Use `Dataset` structured data only after real benchmark publication.
- Update `robots.txt`, sitemap, `llms.txt` and any AI-discovery registry so descriptions and canonical URLs match current capabilities.
- Validate structured data, canonicals, hreflang and status codes in automated tests.

### 12.4 Search operations requiring a human account

After deployment, submit the sitemap and inspect `/agency`, `/en/agency`, both verifier pages and both methodology pages in Google Search Console and Bing Webmaster Tools. Record submission date, index status, selected canonical and any error. Do not repeatedly automate URL submission or claim indexing until the connected service confirms it.

## 13. Phase 6 — Certified validation funnel

### 13.1 Authoritative stages

Measure these stages for distinct external actors:

1. qualified organic session;
2. verifier viewed;
3. verifier started;
4. verifier completed;
5. methodology viewed;
6. MatchPack CTA selected;
7. account/login completed;
8. Agency checkout created;
9. Agency payment/subscription active;
10. first MatchPack analysis;
11. claim review completed;
12. candidate acknowledgement completed or permitted override recorded;
13. MatchPack approved;
14. first approved export;
15. second MatchPack created/approved;
16. client outcome recorded.

Client analytics provide interaction signals only. Payment and product milestones must be derived from authoritative server records such as User attribution, Agency payment/subscription, MatchPack revisions/approval/export and CandidateReview.

Add only these new client interactions unless an existing equivalent exists:

- `proposal_claim_verifier_result_copied`
- `agency_pricing_viewed`
- `agency_checkout_cta_clicked`

Do not emit client-side “paid,” “approved,” “exported” or “repeat” events as authoritative facts.

### 13.2 Exclusion policy

Create one central, tested exclusion utility used by all dashboards, scripts and reports. Exclude:

- owner emails and configured internal accounts;
- `@werkcv.nl`;
- known test domains, `yopmail`, plus-addresses containing `test`, fixtures and smoke users;
- users with `excludeFromProductMetrics` or its canonical equivalent;
- bots, health checks and automation traffic.

Do not hard-code personal owner emails in multiple queries. Configure them once. Keep excluded data available for operations but out of acquisition and product-validation metrics.

### 13.3 Required implementation targets

Create or use canonical equivalents of:

- `lib/agency-validation-funnel.ts`
- `lib/agency-validation-funnel.test.ts`
- `scripts/agency-validation-report.ts`
- `app/admin/analytics/matchpack/page.tsx`

The report/dashboard must use UTC boundaries, display the viewer timezone, and show raw counts beside rates. Break down by locale, source/medium, landing page, device, new/returning user and funnel stage. Show medians, sample sizes and defined denominators. Never present percentages with hidden zero/small denominators.

### 13.4 Attribution and deduplication

- Preserve first-touch and latest non-direct attribution through authentication and checkout using server-trusted identifiers.
- Do not overwrite a known source with direct/unknown on return.
- Count qualified sessions by stable anonymous/user identity and defined session window, not raw page views.
- Link pre-login verifier use to a later account only through existing privacy-safe attribution, never source content.
- Record landing path and locale without query strings containing personal data.

### 13.5 Certification fixtures

Build deterministic fixtures covering duplicate page views, NL/EN verifier completion, copied result, methodology view, login, abandoned checkout, paid checkout, first analysis/export, repeat use, correction/stale acknowledgement, excluded owner/test actor and bot traffic. Assert exact expected counts and rates. Include boundary dates and timezone checks.

Phase 6 exits only when the fixture report is exact, production queries return plausible counts, excluded actors are absent, no content enters analytics, and payments/workflow stages reconcile to database records.

## 14. Phase 7 — SEO-led observation and controlled experiments

The observation clock starts only after all of these are true:

- benchmark independently reviewed and truthfully published;
- public verifier enabled and healthy;
- validation funnel certified;
- `/en/agency` deployed and English path certified;
- priority URLs submitted/inspected in search tools;
- production health and error monitoring are normal.

Produce weekly snapshots and rolling 28-day and 90-day reports. Minimum evidence before interpreting commercial funnel rates is **100 qualified organic sessions and 30 completed verifier runs**. These are decision denominators, not success criteria.

Diagnose one layer at a time:

1. Low impressions: indexing/topic/authority problem.
2. Impressions but low clicks: title/snippet/intent problem.
3. Visits but low verifier starts: promise/input/friction problem.
4. Starts but low completions: tool quality/performance/error problem.
5. Completions but low CTA: value/positioning problem.
6. CTA but low account/checkout: trust, price, currency or login problem.
7. Checkout but low payment: payment/technical/commercial problem.
8. Payment but low first use: onboarding/product problem.
9. First use but no repeat: product value/workflow-fit problem.

Run one material experiment at a time. Before each experiment record hypothesis, primary metric, guardrails, segment, start/end dates and stopping rule. Keep a stable control; do not simultaneously change price, onboarding and page promise. Do not use discounts initially. Do not start an unsolicited sales sequence as a substitute for product evidence.

## 15. Phase 8 — Business validation decision

SEO traffic, signups, verifier completions and internal tests do not validate willingness to pay. The minimum commercial evidence is:

- five distinct external paid Agency subscriptions;
- at least three of the first five create a second MatchPack within 30 days;
- at least 20 external approved/exported MatchPacks provide workflow timing data;
- approval rules actually block unresolved critical claims in external use;
- citation resolution remains 100% for displayed evidence;
- measured correction counts and workflow times are available;
- at least one properly recorded client outcome exists;
- no unresolved privacy/security incident affects the period.

Only then may the product be described internally as initially validated. Public performance claims require a larger, disclosed sample and separate approval.

If results fail, identify the failed funnel layer before changing the product. Do not conclude “SEO needs more time” when the failure is tool completion, checkout, onboarding or repeat use.

## 16. Decision rules and deferred work

### 16.1 Price

Keep €149/50 during the observation period. Review pricing only after external payment and repeat-use evidence exists. Never interpret internal subscriptions as price validation.

### 16.2 Multi-candidate comparison

Do not implement until requested by at least 10 paying agencies or 20% of active Agency accounts. If later built, it may show a side-by-side evidence matrix only—no ranks, scores, winners or recommendations.

### 16.3 ATS integrations

Keep CSV. Apply the demand threshold in section 3.2 before choosing Bullhorn, Carerix, Vincere, Recruiterflow or any other integration.

### 16.4 Client portal and generic features

No design or implementation work. Fix existing template defects only.

### 16.5 Trial reconsideration

Reconsider a time/usage-limited stored trial only when all are true:

- at least 30 external verifier completions exist;
- verifier-to-MatchPack CTA interest is credible;
- account or checkout conversion is weak;
- direct feedback identifies inability to test the saved workflow as a barrier;
- payment and login defects have been excluded.

Any trial requires a separate specification covering entitlements, retention, abuse, migration, cancellation and measurement. Do not infer a trial from this document.

## 17. Competitive positioning guardrails

Competitors already produce branded candidate submissions, summaries and email drafts. SubmitCraft also markets evidence, gaps and candidate review. Therefore generic AI writing or “evidence included” is not a moat.

Differentiate on the complete controlled chain: deterministic exact citations, explicit recruiter disposition, named-recipient acknowledgement, immutable approved snapshot, consistent exports, transparent limitations and independently reviewed benchmark results.

Do not publish “better than HireAra/Allsorter/SubmitCraft” claims without lawful equivalent testing. Competitor facts change; verify them from primary pages at publication time. Avoid negative competitor copy. Explain the category boundary: MatchPack complements the ATS by controlling what is sent to a client.

## 18. Testing and production gates

### 18.1 Unit tests

Cover schemas, atomic spans, deterministic citation resolution, numbers/dates/durations/negation/attribution, source and snapshot digest stability, invalidation, review dispositions, token entropy/hash/expiry/replay/revocation, permissions/override, suggestions, email deduplication, benchmark metrics/confidence intervals, funnel exclusions/attribution and structured-data generation.

### 18.2 Integration tests

Cover database transactions, concurrent token exchange, resend/revocation, stale snapshots, owner/reviewer/editor permissions, retention cascade/deletion receipts, additive migration compatibility, no raw inputs in logs, rate limits, origin/CSRF, no-store/no-referrer/CSP, analytics schemas and checkout attribution.

### 18.3 E2E scenarios

1. Recruiter resolves claims, invites candidate, candidate confirms, reviewer approves and exports.
2. Candidate suggests correction, recruiter accepts, old review becomes stale, new version is acknowledged.
3. Email scanner GET does not consume the token.
4. Replay, expiry and revocation fail safely.
5. Candidate decline blocks approval.
6. Reviewer records a permitted non-response override.
7. Proposal change invalidates claim review, acknowledgement and approval.
8. Full/contact-reduced PDF and DOCX match the approved snapshot.
9. NL/EN public and authenticated paths work at 320, 375, 768 and desktop widths with keyboard and screen-reader navigation.
10. Retention deletion removes MatchPack, invitations, sessions, suggestions and events according to policy.
11. Verifier result is complete without login and contains no score/rank.
12. Consumer CV login/template/editor/payment/download remains isolated and unaffected.

### 18.4 Production certification

Before each activation run the complete Agency suite, benchmark public plus private holdout, production migration rehearsal, PDF/DOCX visual comparison, structured-data validation, security-header checks and fictional end-to-end smoke. Record commit, image digest, migration state, flags, test evidence and rollback target.

## 19. Release sequence

Use separately deployable, rollback-compatible releases:

### Release A — Baseline, P0 fixes, measurement and English page

- No schema removals.
- Fix methodology links and analytics contract.
- Add/certify funnel reporting and exclusions.
- Add `/en/agency`, SEO metadata and journey tests.
- Keep all three feature flags off.

### Release B — Provenance and benchmark publication

- Additive schema/contract compatibility.
- Complete corpus/evaluator/docs.
- Human independent review occurs outside code.
- Enable only `CLAIM_BENCHMARK_PUBLICATION_ENABLED` after the gate passes.

### Release C — Public verifier

- Enable `PROPOSAL_CLAIM_VERIFIER_ENABLED` after Release B and verifier gates.
- Observe security, errors, latency and citation validity.

### Release D — Candidate acknowledgement

- Enable `CANDIDATE_ACKNOWLEDGEMENT_ENABLED` only after email/security/mobile/retention gates.
- Approval backend must remain safe if the UI is rolled back.

### Release E — Search submission and observation

- Human submission/inspection of priority URLs.
- Begin the defined observation clock and weekly reports.

Never combine all flag changes in one deployment. Do not drop legacy fields until at least one full retention period has passed and production records prove they are unused.

## 20. Rollback requirements

Every release must identify the previous compatible image and database restore point. Roll back or disable the affected flag immediately if any of these occur:

- a displayed evidence snippet cannot resolve;
- an unresolved critical claim passes approval;
- stale or declined acknowledgement passes approval;
- token replay, cross-review access or content leakage is possible;
- raw source content appears in logs/analytics;
- approved PDF/DOCX differs materially from its snapshot;
- consumer checkout/download is regressed;
- error or latency guardrails exceed the documented release threshold.

Prefer feature-flag disablement over database restoration when data integrity is intact. Never roll back application code to a version that can bypass newer approval invariants.

## 21. Required implementation report and acceptance matrix

Create `docs/product/matchpack-seo-led-validation-and-activation-implementation-report.md`. For each section record changed files, migrations, flags, test commands/results, screenshots at required widths, security/privacy verification, unresolved external gates, deployment/rollback details and deviations approved by the user.

The implementation is complete only when this matrix is satisfied:

| Area | Acceptance evidence |
|---|---|
| P0 links | Both canonical methodology routes return 200; no obsolete links remain |
| Analytics contract | Real ROI payload accepted; shared schema and contract test pass |
| Benchmark corpus | 100 fictional cases, language/format/occupation/class requirements met |
| Independent review | Credentials/conflict, agreement, disagreements and adjudication recorded |
| Benchmark quality | All thresholds reported across three pinned runs and private holdout |
| Publication | Only 60 public cases downloadable; holdout absent from public assets |
| Verifier | Ungated full results, exact citations, no score, correct next actions |
| Verifier privacy | No raw persistence/logging/analytics; limits and no-store verified |
| MatchPack gate | Critical claims and current-fact states cannot pass unresolved |
| Acknowledgement | Exact named-recipient snapshot, secure fragment exchange, corrections/invalidation |
| Override | Permission, reason and forbidden-state tests pass |
| English journey | `/en/agency` through paid account/export certified; EUR disclosure accurate |
| SEO | Canonical/hreflang/sitemap/robots/structured data/AI discovery validated |
| Funnel | Certified fixtures exact; central exclusions and authoritative milestones reconcile |
| Mobile/accessibility | All listed routes/states pass at 320/375/768/desktop and keyboard/reader checks |
| Exports | PDF/DOCX full/contact-reduced outputs match approved snapshot |
| Retention | Deletion cascade/receipts include acknowledgement artefacts |
| Rollout | Separate releases, flags and rollback targets recorded |
| Validation | No success claim before external payment and repeat-use thresholds |

## 22. Primary external references

Use current versions at implementation/publication time and cite only claims they directly support:

- [EU AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng)
- [NIST AI Risk Management Framework](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)
- [NIST Measure guidance](https://airc.nist.gov/airmf-resources/playbook/measure/)
- [NVP Recruitment Code](https://www.nvp-hrnetwerk.nl/nl/sollicitatiecode)
- [ICO recruitment and selection guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/employment/recruitment-and-selection/)
- [UK agency-worker information guidance](https://www.gov.uk/agency-workers-your-rights/basic-information-you-should-receive)
- [EDPB lawful processing guidance](https://www.edpb.europa.eu/sme/be-compliant/process-personal-data-lawfully_en)
- [OWASP token guidance](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html)
- [NIST digital identity guidance](https://pages.nist.gov/800-63-4/sp800-63b.html)
- [Google Dataset structured-data guidance](https://developers.google.com/search/docs/appearance/structured-data/dataset)
- [FactCC](https://aclanthology.org/2020.emnlp-main.750/)
- [FENICE](https://aclanthology.org/2024.findings-acl.841/)
- [REC UK Recruitment Industry Status Report](https://www.rec.uk.com/our-view/research/recruitment-and-industry-status-report/uk-recruitment-industry-status-report-202425)
- [UK labour-market enforcement annex](https://assets.publishing.service.gov.uk/media/687a3ff6312ee8a5f0806b8c/uk-labour-market-enforcement-strategy_2025-26-annex-b-large-print.pdf)

Market-context pages may inform internal positioning but must be reverified before any public comparison:

- [HireAra pricing](https://www.hireara.ai/pricing)
- [HireAra G2 reviews](https://www.g2.com/products/hireara/reviews)
- [SubmitCraft](https://submitcraft.com/)
- [Allsorter](https://allsorter.com/)
- [Allsorter security](https://allsorter.com/security-and-compliance)

## 23. Final executor instruction

Do not begin by adding pages or rewriting copy. First inspect the current code and record the baseline, then implement Release A and verify it completely. Continue release by release. Stop at every external gate and mark it unresolved instead of fabricating completion. Do not enable a feature, publish an accuracy claim, send customer communications, change pricing or deploy without explicit authorisation. The final report must distinguish implemented code, production-enabled behaviour, externally verified evidence and work still awaiting a human decision.
