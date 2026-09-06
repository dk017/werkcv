# WerkCV MatchPack first Agency customer specification

**Status:** Ready for implementation after the owner confirms the coordinated payment-provider price change  
**Date:** 3 September 2026  
**Commercial contract:** EUR 99 per month, including 300 shared CV credits  
**Primary market:** Dutch recruitment and secondment agencies that submit candidates against explicit requirements, especially public-sector and specialist IT assignments

## 0. Purpose and success condition

This programme has one near-term commercial objective:

> Acquire at least one external, paying Agency customer and help that customer complete an evidence-checked MatchPack export.

This is an internal operating objective, not a forecast and not a public claim. Report two separate milestones:

1. **First external paid Agency customer:** an authoritative, settled Agency payment from an account that is not owned by WerkCV, the founder, a tester or an administrator.
2. **First activated Agency customer:** that paid account subsequently creates a MatchPack, resolves its approval blockers, approves it and exports the approved PDF or DOCX.

Do not call a signup, checkout start, free-tool user or owner test a customer. Do not let missing attribution erase a genuine paid customer.

## 1. Instructions for the implementing agent

The implementing agent must follow these rules in order:

1. Read this specification completely before changing code.
2. Read these existing artefacts before designing replacements:
   - `docs/werkcv-matchpack-agency-acquisition-sprint-spec.md`
   - `docs/product/werkcv-matchpack-agency-acquisition-sprint-implementation-report.md`
   - `lib/agency-plan.ts`
   - `lib/agency-billing.ts`
   - `lib/agency-access.ts`
   - `lib/agency-acquisition.ts`
   - `lib/agency-content.ts`
   - `lib/agency-analytics-contract.ts`
   - `lib/agency-validation-funnel-server.ts`
   - the Agency Prisma models and migrations
3. Record the starting branch, commit and `git status`. The worktree may contain user changes. Preserve all unrelated changes and never overwrite them.
4. Work checkpoint by checkpoint. After every checkpoint, run its focused tests and review its diff before continuing.
5. Reuse the existing navigation, page-shell, analytics, content-registry, source-mapping, export and billing systems. Do not create parallel abstractions when an existing one can be extended safely.
6. Keep the current WerkCV visual system: Manrope typography, rounded surfaces, restrained colour palette, responsive shell and the same header/footer conventions as the current homepage.
7. Keep `PROPOSAL_CLAIM_VERIFIER_ENABLED` and `CANDIDATE_ACKNOWLEDGEMENT_ENABLED` in their current state. This programme does not authorize enabling incomplete protected features.
8. Never add candidate rankings, match scores, truth-verification language, legal-compliance guarantees, fabricated testimonials or fabricated performance claims.
9. Do not create competitor-comparison pages. Competitor observations in this document inform strategy; they are not public copy.
10. Do not change Dodo products, contact prospects, submit search-engine requests, deploy, commit or push unless the owner separately authorizes that external action.
11. Use only fictional or properly authorized candidate data in tests, screenshots and downloadable examples.
12. If an instruction conflicts with actual repository behaviour, stop that checkpoint, document the evidence and choose the safer backwards-compatible implementation. Do not silently improvise.

## 2. Evidence-based market diagnosis

### 2.1 Current WerkCV evidence

The existing Search Console evidence recorded in the repository showed `/agency` receiving 35 impressions, zero clicks and an average position of approximately 9.34 between 13 May and 12 August 2026. Other Agency pages and Agency queries were not present in the top exported results. Treat this as a small baseline, not a statistically reliable trend.

The current product already has meaningful delivery capabilities: PDF and DOCX output, agency templates, team roles, revisions, CSV support, retention/deletion controls and an approval workflow. However, the complete claim verifier, candidate acknowledgement and public benchmark remain feature-flagged. Public copy must describe the enabled product only.

### 2.2 Competitive facts to validate again at implementation time

Competitor prices and features are temporally unstable. Before using any of the following in internal decisions, revisit each primary product page and record the checked date in the implementation report:

- [SubmitCraft](https://submitcraft.com/) has marketed candidate submissions with evidence, gaps, recruiter review, candidate approval and outcomes, and previously displayed a USD 149 / 100-submission tier.
- [HireAra](https://www.hireara.ai/present-overview) is a mature candidate-presentation product with integrations and substantial review volume. Its [G2 reviews](https://www.g2.com/products/hireara/reviews) were 4.6/5 from 48 reviews in the 2 September 2026 research snapshot. Recurring critical comments included missing parsed content, formatting corrections, limited complex-layout control and AI personalisation requiring checking.
- [SignalMatch](https://www.signal-match.nl/) has marketed Dutch-first CV formatting/anonymisation and previously displayed EUR 49 / 500 CVs.
- [SmallRecruiter](https://smallrecruiter.com/pricing) has previously displayed EUR 59 / 300 credits / 10 seats as part of a broader recruitment product.
- [CV-Transformer](https://www.cv-transformer.com/nl/pricing) has previously displayed EUR 170 / 100 conversions and had no G2 reviews in the research snapshot.
- [Recruiterflow](https://admin.recruiterflow.com/pricing) and [Bullhorn](https://www.bullhorn.com/nl/) sell broader ATS/CRM workflows and should not be treated as equivalent products. Their review complaints concern broad-platform trade-offs such as imports, reporting, integrations, mobile use, performance, learning curve and customisation—not direct proof that MatchPack is better.

These facts do **not** establish that WerkCV is cheaper, better or more accurate. Pricing units, feature depth, service boundaries, seats and fair-use rules differ.

The review evidence must be handled honestly:

- HireAra reviews are overwhelmingly positive; critical comments validate that checking generated presentations is a real task, not that HireAra is generally unreliable.
- SubmitCraft, SignalMatch, SmallRecruiter and CV-Transformer did not have enough independent review material in the research snapshot to infer reliable complaint patterns.
- Absence of reviews is not evidence of weak quality.
- WerkCV has the same trust deficit today: no independently verified Agency case study, published accuracy benchmark or meaningful Agency review footprint.
- Do not quote competitor reviews in public product copy or build negative competitor pages. Use the findings to improve WerkCV's workflow and proof.

### 2.3 Strategic conclusion

WerkCV cannot win by presenting itself as another generic CV formatter or AI summary writer. That category already has cheaper and more mature products. SubmitCraft also overlaps with an evidence-and-gaps promise, so those words alone are not a moat.

The most credible initial wedge is:

> Evidence-checked candidate submissions for Dutch recruitment and secondment agencies, particularly when every knock-out requirement must be made demonstrable in the CV.

The product distinction must be visible in the workflow, not only in copy:

**original CV evidence -> client-facing claim -> recruiter disposition -> controlled approved revision -> consistent PDF/DOCX export**

The specific search-language opportunity is around tasks such as:

- `kandidaat aanbieden overheid`
- `functie-eisen aantoonbaar in cv`
- `knock-out eisen cv`
- `motivatie per functie-eis`
- `cv per functie-eis onderbouwen`
- `eisen en wensen kandidaat cv`
- `kandidaatvoorstel detachering`
- `kandidaatvoorstel voor overheidsopdracht`

This is a hypothesis to test. Do not publish search-volume numbers unless obtained from an identifiable source with date, market and methodology.

Relevant examples of the underlying requirement language include public assignments and guidance pages such as:

- https://overheidzzp.nl/vacatures/projectleider-huisvesting/
- https://select.hr/opdrachten/001-kadaster-sa/software-engineer-everest/0e3e587f-fb15-4867-b43e-1091879a9dee
- https://divetro.nl/vacature/inhuur-adviseur-onboarden/
- https://www.opdrachtoverheid.nl/veelgestelde-vragen/

These sources may be cited to explain process context. Do not copy their vacancy content into WerkCV examples and do not imply that one portal's rules apply universally.

### 2.4 Locked competitive interpretation

The implementation and copy review must use this internal comparison:

| Dimension | Honest WerkCV position | Product consequence |
|---|---|---|
| Price and volume | Weaker than several formatting-led offers | Do not lead with volume, low unit price or generic CV conversion |
| ATS integrations and bulk processing | Weaker than mature competitors | Say that MatchPack works alongside an ATS through the supported CSV path; do not imply native integration |
| Social proof | Materially weaker | Do not use empty logo strips, fabricated testimonials or unsupported adoption numbers |
| Proposal packaging | Roughly competitive but unproven | Demonstrate the complete fictional output instead of claiming superiority |
| Exact source traceability | Potentially stronger when the enabled workflow proves it | Show exact source passages, locations, gaps and reviewer disposition directly in product examples |
| Controlled human approval and no ranking | Meaningfully differentiated for the narrow use case | Make recruiter responsibility, revision integrity and the absence of candidate ranking explicit |

The initial customer is **not** a high-volume staffing agency that mainly wants fast, inexpensive branded formatting. Prioritise Dutch boutique recruitment and secondment agencies, approximately 2–20 recruiters as a targeting heuristic, working in IT, public-sector, healthcare or specialist professional assignments and already preparing evidence-heavy proposals manually alongside an ATS.

The implementer must not turn “2–20 recruiters” into a product limit, eligibility rule or unsupported market-size claim.

### 2.5 Reason-to-choose test

Every public Agency page and example must pass this test:

> A recruiter should be able to see why MatchPack is more useful than a formatter when the cost of one unsupported requirement, incorrect duration or wrong employer attribution could invalidate or weaken a candidate submission.

The answer must be demonstrated through the exact evidence workflow. “AI-powered,” “faster,” “beautiful,” “branded,” “all-in-one” and “300 credits” are supporting details, not the primary differentiation.

### 2.6 Keyword boundaries

Keep the following terms only as accurate supporting language; do not make them the first-customer SEO focus:

| Keyword family | Reason |
|---|---|
| `candidate submission software` | Commercially relevant but crowded; retain in English metadata/category copy |
| `candidate presentation software` | Strongly associated with established presentation competitors |
| `cv in huisstijl recruitmentbureau` | Valid formatting intent, but the category is crowded and price-sensitive |
| `cv anonimiseren recruitmentbureau` | Useful supporting capability, not the evidence-led wedge |
| `recruitment software` | Too broad and implies an ATS/CRM category WerkCV does not occupy |
| `candidate matching software` | Wrong promise because WerkCV must not score, select or rank candidates |

No page may optimise for “candidate matching software” in a way that presents MatchPack as a matching or recommendation engine.

## 3. Scope

### 3.1 Included

- Change the Agency commercial offer to EUR 99 per month with 300 shared CV credits.
- Make database entitlements, access checks, renewal logic, checkout, emails, public pages, authenticated pages, structured data and analytics agree on that contract.
- Sharpen the Dutch evidence-led positioning while preserving accurate English discovery copy.
- Create one high-quality Dutch guide and fictional requirements matrix for public-sector candidate submissions.
- Connect that guide to the existing free checker and MatchPack product path.
- Add internal links, sitemap/discovery registration and privacy-safe conversion measurement.
- Create owner-run checklists for payment-provider configuration, search discovery and manual distribution.
- Certify the release with automated, database, checkout, export, accessibility and responsive checks.

### 3.2 Explicitly excluded

- New ATS integrations beyond the existing CSV path.
- Bulk CV processing, multi-candidate comparison, scoring or ranking.
- A client portal.
- Additional generic templates or summary generators.
- Candidate acknowledgement or complete claim-verifier activation.
- Automated cold-emailing, purchased lead lists, scraped personal contact data or a pilot funnel.
- Discounts, annual billing, a free trial or additional Agency tiers.
- A consumer CV price change.

## 4. Commercial and credit contract

### 4.1 Customer-visible offer

The single Agency tier is:

- **EUR 99 per month**, recurring monthly.
- **300 shared CV credits per billing period** for the agency workspace.
- One newly created standalone candidate CV consumes one credit.
- One MatchPack consumes one credit when it is definitively approved for the first time.
- Analysis, drafting, editing, revisions and re-exporting the same credited item do not consume another credit.
- Re-approving a revision of the same MatchPack does not consume another credit.
- Credits do not roll over unless the existing production contract already says they do. Do not introduce rollover in this work.
- Reaching the limit blocks creation of a new standalone CV or first approval of a new MatchPack. It must not remove access to existing documents or prevent permitted re-downloads/re-exports.

Use **CV credits** in English and **CV-credits** in Dutch customer-facing UI. Explain the unit wherever the allowance is displayed:

> One credit covers either a new standalone candidate CV or the first definitive approval of one MatchPack.

Do not call credits “slots” or “allowance” in customer-facing copy. The arithmetic EUR 0.33 per credit may be shown only as “at full use”; it is not a per-credit billing promise.

### 4.2 One source of truth

Refactor `lib/agency-plan.ts` into the authoritative commercial configuration. It must export typed values equivalent to:

```ts
export const AGENCY_PLAN_VERSION = "agency_99_300_2026_09";
export const AGENCY_MONTHLY_CREDIT_LIMIT = 300;
export const AGENCY_MONTHLY_PRICE_CENTS = 9_900;
export const AGENCY_CURRENCY = "EUR";
```

During a compatibility period, `AGENCY_MONTHLY_CV_LIMIT` may remain as a deprecated alias of `AGENCY_MONTHLY_CREDIT_LIMIT`. New code must use the credit name.

Provide pure helpers for:

- locale-aware monthly price formatting;
- remaining credits using `max(allowance - used, 0)`;
- the customer-facing credit explanation;
- plan-version metadata;
- optional full-use unit arithmetic.

No page, API error, email, schema markup, fixture or test may independently hard-code EUR 99, `9900` or `300` when it can import this configuration. Historical migrations and dated reports may retain old values as historical truth.

### 4.3 Unit-economics gate

Before declaring the plan financially certified:

1. Identify every paid service invoked during the worst permitted path for one new standalone CV and one MatchPack first approval.
2. Record provider, model/version, maximum calls, token/file limits and the official rate source/date.
3. Calculate a documented high-use cost case for 300 credits. Include payment fees and operationally material storage/email costs where known.
4. Do not log candidate content while measuring usage.
5. If credible variable cost exceeds the EUR 0.33 full-use revenue per credit before fixed costs, mark the offer financially uncertified and report it to the owner. Do not silently lower output quality or weaken safety checks.

## 5. Database, subscriptions and entitlements

### 5.1 Current risk

At the start of this specification, code and schema contain legacy `50` defaults, while `lib/agency-billing.ts` can overwrite stored limits using a global constant. A page-only price edit would create an inconsistent and potentially harmful entitlement state.

### 5.2 Additive migration

Create an additive, idempotent Prisma migration that:

- changes the default for `AgencySubscription.monthlyLimit` from 50 to 300;
- changes the default for `AgencyUsagePeriod.allowance` from 50 to 300;
- upgrades every Agency subscription whose stored monthly limit is below 300 to 300;
- upgrades only current or future usage-period allowances below 300 to 300;
- preserves any custom limit greater than 300;
- preserves every usage count and never resets consumed credits;
- preserves expired historical usage periods as historical evidence;
- uses `GREATEST(existing_value, 300)` or an equivalent non-decreasing operation;
- can be rehearsed twice safely without changing the second result.

Do not drop, rename or repurpose existing fields in this release.

### 5.3 Runtime entitlement rules

- The stored subscription and usage-period allowance are authoritative for an account.
- Never use `storedValue || default` where zero is a legitimate stored value. Use explicit nullish handling.
- A new usage period inherits the subscription's stored limit.
- Provider synchronisation must never reduce a custom stored limit greater than 300.
- Renewal and webhook processing must be idempotent.
- Credit checks and consumption must remain transactional under concurrent requests.
- Limit errors must state the account's actual limit and used count, not stale hard-coded copy.
- Inactive subscriptions receive no paid entitlement merely because the global plan constant exists.

Inspect and update at least `lib/agency-billing.ts`, `lib/agency-access.ts`, MatchPack APIs, public-CV creation routes, fixtures, tests and every Prisma location found by a scoped search.

### 5.4 Existing customer treatment

- Every active Agency customer receives at least 300 credits for the current usable billing period after migration.
- Preserve paid-through dates, documents, usage and cancellation state.
- Preserve custom allowances above 300.
- Perform a read-only owner audit separating internal/test accounts from external accounts. Never place customer emails in a committed report.
- No external customer may renew at EUR 149 while new public pages advertise EUR 99 without a documented treatment. If the provider cannot change an existing subscription's renewal amount, prepare an individual migration procedure. Do not automatically cancel or recreate subscriptions.

## 6. Payment-provider coordination

Dodo controls the actual checkout charge through `DODO_AGENCY_PRODUCT_ID`; the website constant does not change the provider price.

### 6.1 Checkout metadata

Keep the product ID environment-driven. Add bounded, non-PII metadata to the checkout/subscription where supported:

- `plan_code: agency`
- `plan_version: agency_99_300_2026_09`
- `credit_limit: 300`
- `display_price_cents: 9900`
- existing attribution fields that already comply with the analytics contract

Do not include a CV ID, candidate name, recruiter email, vacancy text or document content.

If provider payloads expose an authoritative amount and currency, implement a private diagnostic for plan/provider mismatch only after validating the real payload semantics in test mode. Do not reject a valid paid webhook because tax-inclusive and tax-exclusive representations differ.

### 6.2 Owner-only provider runbook

Add a checklist to the implementation report covering:

1. Create or update a Dodo test-mode recurring product to EUR 99 monthly.
2. Verify the checkout visibly shows EUR 99, the monthly cadence, currency, tax handling and available payment methods.
3. Complete a test subscription and webhook cycle.
4. Verify the stored payment amount semantics and a 300-credit entitlement.
5. Verify cancellation and paid-through access.
6. Configure the live recurring product and update the production secret/environment reference.
7. Decide and execute the documented treatment for existing external renewals.
8. Confirm production checkout independently before making EUR 99 public.

The public price, checkout price and entitlement change form one coordinated release. Never deploy only one of them.

## 7. Product positioning and copy contract

### 7.1 Audience

Write for Dutch agency owners, operations leads and senior recruiters who already use an ATS, Word or email to submit candidates. The initial message may speak to small specialist agencies, but team size is not a contractual eligibility rule.

### 7.2 Dutch Agency page

The `/agency` hero must communicate the task and evidence standard before the brand category:

- Eyebrow: `Kandidaatvoorstel-software voor bureaus`
- H1: `Onderbouw elke functie-eis met exact CV-bewijs voordat je een kandidaat aanbiedt.`
- Supporting copy: explain that WerkCV connects each client-facing statement to CV evidence, keeps missing or changing information visible and lets the recruiter approve one controlled version.
- Primary action: open the free evidence checker.
- Secondary action: view the complete fictional example.
- Commercial action: start MatchPack at EUR 99 per month, 300 shared CV credits.

The price, monthly cadence, credit meaning and cancellation/access wording must be visible before checkout. The page must say that CSV works alongside the agency's ATS. Do not require a demo, pilot or intake call.

Visually distinguish:

- evidence found in the original CV;
- recruiter assessment;
- current fact requiring confirmation;
- missing or conflicting information;
- recruiter-approved output.

### 7.3 English Agency page

Keep “candidate submission software” in the title/meta for broad discovery, but use the evidence-led promise in the visible hero:

> Support every client-facing candidate claim with exact CV evidence before submission.

Show EUR 99/month, 300 shared CV credits, the same credit definition and the same product boundaries. Do not expand the English content library during this sprint.

### 7.4 Required boundaries

Every relevant product surface must accurately communicate that WerkCV:

- does not replace the ATS;
- does not rank or select candidates;
- does not prove identity or objective truth;
- does not guarantee GDPR, tender or AI Act compliance;
- leaves final responsibility with the recruiter;
- labels unavailable or changing information rather than inventing it.

### 7.5 Consistency sweep

Search and reconcile old Agency plan names, EUR 149, `14900`, 50-credit language and “slots” across:

- public Dutch and English Agency/pricing pages;
- authenticated account, settings, MatchPack and usage surfaces;
- checkout and return pages;
- plan and ROI modules;
- demo and fictional-example pages;
- acquisition/content registries;
- AI-discovery and `llms` documents;
- transactional emails;
- structured data;
- API error strings;
- visual-test fixtures and snapshots.

Do not rewrite historical reports or migrations merely to make the search return zero.

## 8. New Dutch search-and-trust asset

### 8.1 Route and registry contract

Create one canonical guide:

- **Route:** `/voor-bureaus/kennisbank/kandidaat-aanbieden-overheid`
- **Content ID:** `nl_public_sector_submission`
- **Kind:** `guide`
- **Primary intent:** `kandidaat aanbieden overheid`
- **Secondary language:** `functie-eisen aantoonbaar in cv`, `knock-out eisen cv`, `motivatie per functie-eis`, `cv per functie-eis onderbouwen`
- **SEO title:** `Kandidaat aanbieden bij de overheid: functie-eisen aantoonbaar maken | WerkCV`
- **H1:** `Kandidaat aanbieden bij de overheid: maak functie-eisen aantoonbaar in het CV`
- **Primary destination:** the existing free candidate-proposal evidence checker

This page is Dutch-only in this release. Give it a self-referencing canonical. Do not add an English hreflang counterpart that does not exist.

### 8.2 Editorial requirements

The guide must be genuinely useful without signup and must contain, in this order:

1. A direct two- or three-sentence answer to what recruiters need to do before offering a candidate.
2. A plain-language distinction between:
   - hard/knock-out requirement;
   - preference/wish;
   - current commercial fact;
   - subjective competency;
   - portal-specific submission rule.
3. A step-by-step workflow:
   - copy each requirement exactly;
   - classify the requirement;
   - locate exact evidence in the authorized CV;
   - verify dates, duration and employer/project attribution;
   - leave missing evidence visible;
   - confirm changing information with the candidate;
   - apply the named portal/client instructions;
   - obtain recruiter review;
   - export the approved version.
4. Common failure modes, including keyword-only evidence, invented duration, evidence attached to the wrong employer, claiming a wish as fact, hiding a gap and assuming one portal's rule is universal.
5. A complete fictional candidate submission containing the source CV excerpts, requirements matrix, client introduction, current-fact labels, recruiter dispositions and final-output preview—not merely a small table fragment.
6. A blank downloadable matrix in DOCX and CSV.
7. A manual pre-send checklist.
8. A transparent explanation of what the free checker can and cannot assess.
9. A short MatchPack workflow showing the route from evidence to approved export.
10. Visible FAQs whose answers match any FAQ structured data word-for-word in meaning.
11. A sources and limitations section with a visible “checked on” date.

The guide is process guidance, not legal or procurement advice. It must instruct users to follow the current text of the specific assignment and portal.

### 8.3 Canonical fictional example

Create a typed source module such as `lib/agency-public-sector-example.ts`. All rendered example cards, tables, downloads and tests must derive from this one object.

The example must contain at least eight requirements and deliberately include varied outcomes:

- three fully supported requirements;
- one partially supported requirement;
- one unsupported requirement;
- one contradiction or employer-attribution risk;
- two changing/current facts that require candidate confirmation.

For each requirement, store:

- original fictional requirement text;
- requirement category;
- proposed client-facing statement;
- status;
- exact fictional CV evidence snippet, or explicit absence;
- deterministic source location such as page and section;
- explanation;
- recruiter action/disposition;
- whether candidate confirmation is required.

Every displayed evidence snippet must resolve exactly to the fictional source fixture. Do not include a total score, percentage, candidate rank, pass/fail recommendation or “best candidate” language.

### 8.4 Downloadable assets

Generate:

- `public/downloads/werkcv-eisenmatrix-kandidaat-aanbieden-overheid.docx`
- `public/downloads/werkcv-eisenmatrix-kandidaat-aanbieden-overheid.csv`

The blank matrix must include at least these columns:

1. Requirement number
2. Exact requirement
3. Requirement type
4. Proposed client-facing claim
5. Exact CV evidence
6. Source page/section
7. Evidence status
8. Risk or gap
9. Candidate confirmation needed
10. Recruiter disposition
11. Reviewer
12. Review date
13. Next action

Render the DOCX to PDF/PNG using the repository's document QA workflow and inspect every page. Verify the CSV opens with all columns preserved, is UTF-8, and uses the delimiter already established for Dutch Excel imports in this repository. Determine that delimiter from existing code/tests; do not guess. Neither asset may contain real personal data or copied vacancy text.

## 9. Free checker and product path

Reuse the existing ungated free candidate-proposal checker. Do not build a second checker and do not require an email before showing its complete result.

The complete result must visibly demonstrate the enabled parts of the differentiation:

- the exact requirement or claim being assessed;
- exact supporting CV evidence and its source location when found;
- missing, partial, contradictory or uncertain evidence when applicable;
- changing facts such as availability or rate kept separate from CV evidence;
- one specific recruiter action: retain, rewrite, remove, ask the candidate or review manually.

If the current enabled checker cannot truthfully produce one of these outputs, omit that promise from the CTA and record the gap. Do not bypass the protected claim-verifier flag merely to satisfy marketing copy.

On the new guide, use this action hierarchy:

1. `Controleer uw kandidaatvoorstel gratis` -> existing Dutch checker.
2. `Download de eisenmatrix` -> DOCX/CSV choices.
3. `Bekijk hoe MatchPack werkt` -> relevant fictional example or product explanation.
4. `Start MatchPack` -> Agency checkout path.

The checker CTA must accurately describe its currently enabled mode. Do not market the protected full proposal claim verifier while its feature flag is off. Preserve current privacy controls: no persistence of uploaded content, no document text in logs/analytics, request limits and `Cache-Control: no-store` where already required.

## 10. SEO and discovery implementation

### 10.1 Page metadata

Implement:

- unique title and meta description;
- self-referencing canonical;
- Dutch Open Graph title/description;
- `Article` structured data with visible author/publisher/dateModified values;
- `BreadcrumbList` matching visible breadcrumbs;
- `FAQPage` only when the full questions and answers are visible;
- no aggregate rating, fake review, unsupported statistic or fabricated date.

### 10.2 Registry and discovery surfaces

Register the route exactly once in the existing systems:

- `lib/agency-acquisition.ts` with a unique content ID;
- `lib/agency-content.ts` or the existing knowledge-index registry;
- `/voor-bureaus/kennisbank`;
- the sitemap;
- the repository's AI-discovery/`llms` sources;
- any route certification list used by Agency acquisition tests.

Do not maintain a second hand-written list if the current registry can generate the same output.

### 10.3 Internal links and intent boundaries

Add contextual links from:

- `/agency`;
- `/voor-bureaus`;
- `/voor-bureaus/kennisbank`;
- the general candidate-proposal guide;
- the relevant detachering/public-sector content page, if one exists.

Do not add this Agency link inside consumer editor, consumer checkout or unrelated consumer articles.

Prevent cannibalisation:

- `/agency` owns product/category intent;
- the existing general guide owns broad `kandidaat voorstellen` process intent;
- the new page owns public-sector requirements/evidence intent;
- the checker owns tool intent;
- pricing remains commercial-plan intent.

## 11. Measurement contract

### 11.1 Privacy and identity exclusions

Reuse the existing Agency analytics contract. Never send candidate text, vacancy text, names, email addresses, filenames, CV IDs, proposal IDs or document content to analytics.

Maintain one central exclusion helper for:

- owner accounts;
- administrator accounts;
- known test-account hashes;
- automated test traffic;
- explicitly marked internal sessions.

Do not duplicate exclusion lists across browser, server and admin-report code.

### 11.2 New events

Add only the events not already represented by an existing contract:

- `agency_public_sector_guide_viewed`
  - properties: registered route ID, locale, device category and bounded source category.
- `agency_evidence_matrix_downloaded`
  - properties: format (`docx` or `csv`), registered route ID and bounded source category.

Use existing events for checker completion, product CTA, checkout and MatchPack workflow milestones. Do not create synonyms.

### 11.3 Paid and activated definitions

The authoritative paid milestone must come from settled payment/subscription state, not a browser redirect or success page. The first customer report must count a paid customer even if its source is direct or unknown.

The activated milestone requires all of the following after the qualifying payment:

- at least one MatchPack created;
- its current approval blockers resolved;
- a definitive approval recorded;
- an approved PDF or DOCX exported.

The admin report must show, from a recorded launch timestamp and plan version:

- qualified guide views;
- matrix downloads by format;
- checker starts/completions;
- MatchPack CTA selections;
- checkout starts;
- authoritative paid external accounts;
- paid external accounts that reached analysis, approval and export;
- raw conversion ratios with denominators;
- a clear small-sample warning.

Never expose customer email or CV content in the report.

## 12. First-customer distribution runbook

Create `docs/werkcv-matchpack-first-customer-distribution.md`. This is a manual owner workflow, not an automated marketing system.

### 12.1 Prospect-selection rules

Select 20–30 Dutch recruitment or secondment businesses whose public websites show all or most of:

- public-sector, IT or specialist contracting focus;
- explicit “aantoonbaar”, knock-out or requirement-by-requirement submission language;
- an existing candidate-submission process;
- a published business contact channel.

Use only public business contact information. Do not scrape personal emails, buy a list or upload candidate data. Record why each organisation fits before contacting it.

### 12.2 Message assets

The runbook must contain:

- one short Dutch email and an English translation for owner comprehension;
- one short Dutch LinkedIn message;
- one Dutch founder post introducing the free guide/matrix/checker;
- one follow-up after seven days for non-responders;
- stop rules for opt-out, reply, bounce or lack of fit.

Lead with the ungated tool or matrix and the job it solves. Do not ask for a meeting, subscription or “pilot” in the first message. Do not invent personalisation, praise or urgency.

The first message must preserve this substance in natural Dutch rather than copying it mechanically:

> Your assignments require experience to be demonstrable in the CV. WerkCV provides a free, ungated checker that connects each requirement to the supporting passage and leaves missing information visible. We would value one sentence about what it fails to catch in your workflow.

The message must not claim that the sender reviewed a specific assignment unless the sender actually reviewed and records that public source.

Use campaign label `evidence_matrix_launch_2026_09`. UTM parameters may include a bounded channel/campaign/content code, never a recipient name, company name or email.

Track aggregate numbers only: selected, contacted, delivered, replied, checker used, checkout started, paid and activated.

## 13. Automated verification

### 13.1 Pricing and entitlement tests

Add focused tests proving:

- price is 9,900 cents, currency EUR and limit 300;
- Dutch and English formatting is correct;
- full-use arithmetic is labelled and rounded correctly;
- checkout metadata contains the plan version and no PII;
- new subscriptions and periods receive 300;
- migration upgrades 50 to 300 while preserving greater custom limits and usage;
- the migration is idempotent;
- remaining credits never become negative;
- concurrent first-use requests cannot consume twice;
- inactive subscriptions do not gain access;
- a stored zero does not fall back to 300;
- errors use the stored account allowance instead of stale copy.

### 13.2 Content and discovery tests

Prove:

- the new route/content ID is unique;
- it appears exactly once in sitemap and discovery outputs;
- canonical and metadata are correct;
- no nonexistent hreflang is emitted;
- no pilot language appears;
- displayed prices come from the plan source;
- every fictional evidence snippet resolves to the canonical fixture;
- no score/rank/recommendation exists;
- both downloads exist, have the expected headers and contain no real PII;
- FAQ structured data matches visible content;
- all cited external sources use HTTPS.

### 13.3 Stale-value scan

Add a scoped scan for customer-facing EUR 149, `14900`, “50 slots”, “50 CV's/CVs” and obsolete Agency-plan wording. Exclude historical migrations and dated reports. Do not perform a naive global assertion that the number `50` cannot appear anywhere; unrelated legitimate values exist.

### 13.4 Analytics tests

Prove:

- event names are registered once;
- duplicate server/browser milestones deduplicate correctly;
- owner/admin/test traffic is excluded centrally;
- unattributed settled payments still count as paid;
- paid and activated milestones remain distinct;
- content fields cannot enter event properties;
- plan version and route ID are bounded allow-list values;
- zero-denominator ratios render safely.

## 14. Manual product and visual certification

Inspect at 320, 375, 768, 1024 and a wide desktop viewport:

- homepage Agency entry point;
- `/agency` and `/en/agency`;
- `/voor-bureaus` and the knowledge index;
- the new public-sector guide;
- free checker input and results;
- Agency checkout entry/return;
- authenticated account overview and usage state;
- MatchPack creation, review, approval and export.

Certify that:

- no horizontal overflow, clipped title or overlapping controls exists;
- mobile users reach the task promise, EUR 99 price and primary action without excessive preamble;
- large matrices use an accessible small-screen presentation rather than shrinking unreadably;
- header, product switcher and account identity do not collide;
- focus order, visible focus, labels, errors and keyboard activation work;
- downloads open correctly;
- consumer and Agency navigation remain clearly separated;
- public pages render without authentication;
- authenticated routes preserve the intended destination through login;
- no old price or allowance is visible.

Use populated fictional authenticated fixtures for certification. A source-code inspection alone is not visual certification.

## 15. Required verification sequence

Run focused tests after each checkpoint, then the repository's complete relevant release suite. At minimum, run the scripts that exist for:

```text
npm run test:agency:acquisition
npm run test:agency:activation
npm run test:agency:unit
npm run build
```

Also run every available Agency integration, migration rehearsal, MatchPack E2E, PDF/DOCX output, asset-smoke and stale-copy test. Inspect `package.json` for the exact current names; do not invent scripts or report an unrun command as passing.

The database verification must cover a real PostgreSQL-compatible test database, transactions and the production migration sequence. A Docker/WSL failure means those gates are **blocked**, not passed. Record the exact blocked checks and rerun them in a working production-compatible environment before release.

For each check, record:

- exact command or manual procedure;
- date and environment;
- result;
- relevant output/artifact;
- whether it is required for release.

## 16. Release sequence and rollback safety

### Release 0 — certify the existing acquisition baseline

The 2 September 2026 research found that the prepared Agency acquisition release was still local, while the retrievable live site contained inconsistent historical positioning. Do not assume that remains true: inspect the current branch, implementation report and production pages first.

If the acquisition release is still pending:

1. Reconcile it with the current branch and review the complete diff.
2. Verify it removes the pilot funnel and accurately distinguishes enabled from feature-flagged capabilities.
3. Run its documented test, mobile and production-migration gates.
4. Commit/deploy it as a stable baseline before introducing the new pricing migration and guide.
5. Verify the current live `/agency`, `/voor-bureaus`, example, checker and `/en/agency` pages directly.

If those changes are already live, record production evidence and treat the current live build as Release 0. Never judge the new positioning using traffic collected while prospects and search engines still receive the old message.

### Release A — code and additive schema, not commercially active

1. Implement plan configuration, migration, entitlement compatibility, tests, content and reports.
2. Keep production public price unchanged until the provider is prepared.
3. Rehearse backup and migration against a production-like database.
4. Verify the new code remains compatible with the currently configured Dodo product.

### Owner coordination gate

The owner must explicitly verify:

- production backup exists and restore procedure is understood;
- external versus test subscriptions are audited;
- Dodo test checkout charges EUR 99 monthly;
- webhooks create 300-credit entitlements;
- existing external renewal treatment is decided;
- the live product/environment reference is ready.

### Release B — coordinated commercial activation

1. Back up production.
2. Apply the additive migration.
3. Activate the live EUR 99 monthly Dodo product/environment reference.
4. Deploy public/authenticated copy and entitlement code in the same release window.
5. Complete a real production checkout certification with an authorized test account.
6. Verify actual charged amount, subscription state, 300 credits, cancellation state and checkout return.
7. Verify internal/test activity is excluded from first-customer reporting.
8. Smoke-test the five critical public routes and the authenticated flow.

The rollback target must keep these three things coherent: displayed price, actual checkout price and stored entitlement. Never roll back only the UI if doing so would advertise a different amount from checkout. Additive 300-credit database changes should remain non-destructive during rollback; do not reduce customer credits merely to restore an earlier frontend.

## 17. Post-release operating plan

After successful activation:

1. Request recrawl/indexing for only the important updated routes through the authorized Google/Bing owner workflow:
   - `/agency`
   - `/voor-bureaus`
   - `/voor-bureaus/kennisbank`
   - `/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld`
   - `/voor-bureaus/kennisbank/kandidaat-aanbieden-overheid`
   - the free checker
   - `/en/agency`
2. Start the small manual distribution list only after the free guide, assets and checker are certified.
3. Check technical errors, checkout failures and entitlement mismatches daily for the first seven days.
4. Produce factual 7-day and 14-day reports with raw counts and denominators.
5. Do not change price, promise or audience for 14 days unless there is a technical, legal or financial defect. Constant simultaneous changes make the result uninterpretable.

Use these diagnosis rules:

| Observed stage | Likely issue to investigate first | Do not conclude yet |
|---|---|---|
| No qualified views | Distribution/indexing/keyword discovery | Product rejection |
| Views but no matrix/checker use | Message or asset usefulness | Price objection |
| Checker use but no product CTA | Product bridge or perceived incremental value | Checkout failure |
| CTA but no checkout start | Trust, offer clarity or login friction | Provider payment failure |
| Checkout starts but no paid account | Actual payment methods, provider error, price/tax surprise | Feature inadequacy |
| Paid but no analysis | Onboarding/navigation/data-entry friction | Wrong target market |
| Analysis but no approved export | Workflow complexity, output quality or unresolved blockers | Successful activation |

One customer proves only that one customer bought. It does not prove product-market fit, market leadership or a repeatable acquisition channel.

## 18. Implementation report

Create:

`docs/product/werkcv-matchpack-first-agency-customer-implementation-report.md`

It must contain:

- starting and ending branch/commit plus a concise dirty-worktree note;
- changed-file inventory grouped by checkpoint;
- final EUR 99 / 300-credit contract and exact credit-consumption rules;
- migration design, rehearsal evidence and before/after aggregate counts;
- existing-customer handling;
- Dodo test/live configuration status without secret values;
- unit-economics calculation, source dates and certification conclusion;
- final route/content/internal-link map;
- enabled-versus-flagged capability table;
- automated test commands and exact outcomes;
- manual responsive/accessibility/export evidence;
- deployment and production smoke-test status;
- search/distribution actions performed versus owner-pending;
- known limitations and rollback target;
- first paid and first activated metrics shown separately.

Never mark an unperformed owner/provider/deployment action complete. Never commit secrets, customer email addresses, raw candidate content or production tokens.

## 19. Acceptance checklist

The programme is implementation-complete only when all applicable items below are true:

- [ ] The single code-level Agency plan is EUR 99/month and 300 shared CV credits.
- [ ] Credit meaning and consumption are consistent across public UI, authenticated UI, APIs and emails.
- [ ] Database defaults and active entitlements are migrated additively without lost usage or reduced custom allowances.
- [ ] Dodo test checkout charges the same price displayed by the site.
- [ ] Existing external renewal treatment is documented and safe.
- [ ] The unit-economics gate is completed with dated sources.
- [ ] `/agency` leads with the evidence/requirements job, not generic AI formatting.
- [ ] English pricing and product boundaries agree with Dutch.
- [ ] The new Dutch guide fully answers its target task without signup.
- [ ] The fictional matrix includes supported, partial, unsupported, contradictory/attribution and current-fact cases.
- [ ] Every fictional evidence quote resolves exactly to its source fixture.
- [ ] DOCX and CSV downloads are verified and contain no real personal information.
- [ ] The guide is registered once in content, sitemap and AI discovery.
- [ ] Internal links respect Agency/consumer intent boundaries.
- [ ] Analytics contain no PII/content and exclude internal activity centrally.
- [ ] Authoritative paid and activated customer milestones are distinct.
- [ ] Migration, integration, checkout, E2E and PDF/DOCX gates pass in a production-compatible environment.
- [ ] Required screens pass responsive, keyboard and visual inspection.
- [ ] No customer-facing legacy EUR 149/50-credit wording remains in current surfaces.
- [ ] The production public price is not activated before provider parity.
- [ ] The implementation report truthfully identifies every incomplete external action.
- [ ] The existing acquisition release is either certified live or explicitly completed as Release 0 before the commercial switch.
- [ ] Public pages demonstrate a concrete reason to choose MatchPack beyond formatting speed, branding or credit volume.

Commercial activation is complete only when the live checkout, live displayed price and live 300-credit entitlement agree. The programme objective is achieved only after at least one qualifying external account is both paid and activated under the definitions in section 0.

## 20. Public product truth after completion

When every relevant gate passes, WerkCV may accurately say:

- MatchPack helps agencies connect requirements to CV evidence and keep gaps visible before a candidate is submitted.
- Recruiters review and approve the final output.
- The plan costs EUR 99 per month and includes 300 shared CV credits.
- One credit covers a new standalone candidate CV or the first definitive approval of a MatchPack.
- The product works alongside an ATS through the supported CSV route.

WerkCV must not say, without separate evidence:

- “market leader”, “most accurate” or “zero hallucinations”;
- that it verifies candidate truth or identity;
- that candidate acknowledgement is active;
- that a public independent benchmark has passed;
- that it guarantees tender acceptance, client acceptance, GDPR compliance or AI Act compliance;
- that agencies save a stated amount of time or money;
- that customers prefer it to named competitors.
