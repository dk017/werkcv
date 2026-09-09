# MatchPack discovery, buying guide and evidence example

Status: implementation specification, not an implementation or indexing certificate.
Prepared 2026-09-07. Intended implementer: Luna Max.
Repository: D:/DKPlayground/werkcv.

## 1. Objective and scope

Implement in this order, verifying each package before proceeding:

1. Separate and reconcile consumer and Agency product descriptions.
2. Audit technical discovery eligibility and separately establish actual indexing when authorized access exists.
3. Strengthen ONE existing Dutch buying guide.
4. Strengthen ONE existing Dutch worked example and its downloadable artifacts.
5. Run regression/visual checks and deliver an evidence-backed report.

Success: people and retrieval systems can identify the products, audiences, prices, capabilities and limitations; buyers can compare workflows and inspect a complete honest example. This is NOT a guarantee of indexing, AI citations, rankings, conversions or Agency demand.

Do not change billing, prices, authentication, editor behavior, database schema, production data, feature flags or approval rules. No new MCP, ATS integration, client portal, trial system, benchmark, video production, article cluster or attribution platform. No outreach, paid links or fabricated reviews. Do not deploy, purchase anything or send indexing notifications without separate release authorization. Read-only public checks and authorized read-only webmaster inspection are in scope.

All communication and the report for the owner must be English. Public Dutch articles remain Dutch. Do not spawn subagents without separate authorization.

## 2. Implementer operating contract

- Read applicable AGENTS.md and the complete files selected for editing. Follow imports before asserting product behavior.
- Record starting commit and git status. Preserve unrelated work and temporary files. Do not commit browser profiles, logs, SQL exports, credentials or unrelated output folders.
- Use apply_patch for source/document edits and existing artifact generators where suitable.
- Maintain a requirement ledger with ID, changed path, evidence/test and status. Every requirement below must map to evidence or an explicit blocker.
- Status values: PASS, FAIL, BLOCKED_EXTERNAL, NOT_RUN. A skipped test is not PASS. A source inspection is not a production-flow certificate.
- Complete unblocked work while external checks are unavailable. Missing Search Console credentials does not block editing the guides.
- Never invent customer outcomes, reviewer credentials, availability, external access, benchmarks, legal compliance, competitor features or search volumes.
- If code differs from this baseline, document the difference. Follow verified product contracts; ask only when resolving a conflict requires a new product decision.
- Fix factual defects in existing samples rather than writing tests that simply preserve those defects.

## 3. Inspection map and known baseline

| Area | Read before changing |
| --- | --- |
| Product truth | `lib/agency-plan.ts`, `lib/site-content.ts`, `lib/agency-public-capabilities.ts`, `lib/agency-public-messaging.ts`, `lib/agency-feature-flags.ts` |
| Discovery | `lib/ai-discovery.ts`, `app/ai/service.json/route.ts`, `app/ai/summary.json/route.ts`, `app/ai/faq.json/route.ts`, `app/llms.txt/route.ts`, `app/.well-known/ai.txt/route.ts` |
| Product markup | `app/agency/page.tsx`, `app/en/agency/page.tsx`, `components/seo/JsonLd.tsx` |
| Content routing | `lib/agency-acquisition.ts`, `lib/agency-content.ts`, `app/voor-bureaus/page.tsx`, `app/voor-bureaus/kennisbank/page.tsx` |
| Buying guide | `app/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau/page.tsx`, `components/agency/AgencyGuideArticle.tsx`, `components/agency/AgencyGuideSpecialLink.tsx` |
| Worked example | `app/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld/page.tsx`, `lib/agency-fictional-example.ts`, `lib/agency-evidence-sample.ts`, their imported sample export handlers/renderers |
| Existing assets | `scripts/generate_agency_cv_sample_assets.py`, `public/downloads/agency-sample-bron-cv-hr-adviseur.pdf`, `public/downloads/agency-sample-client-ready-cv-hr-adviseur.pdf`, `public/agency-previews/` |
| Indexing | `app/robots.ts`, `app/sitemap.ts`, `scripts/gsc-mcp.ts`, `docs/gsc-mcp.md`, `scripts/submit-indexnow.ts` |
| Tests/events | `components/agency/AgencyContentAnalytics.tsx`, `lib/agency-analytics-contract.ts`, `lib/agency-acquisition.test.ts`, `lib/agency-positioning.test.ts`, `lib/agency-public-messaging.test.ts`, `package.json` |

Observed during specification research; reproduce before editing:

- `service.json` names a consumer CV service and offer but attaches mixed consumer/Agency capabilities.
- `summary.json` describes consumer pricing with no monthly fee while also listing Agency capabilities/content.
- `lib/ai-discovery.ts` includes the unqualified claim that every requirement is connected to evidence. Ordinary analysis covers selected requirements, not exhaustive claim verification.
- Discovery date was fixed at 2026-09-02. Dates need honest content maintenance, not request-time freshness inflation.
- A search-tool snapshot showed an old Agency offer (€149, 50 slots, pilot), whereas a direct live fetch showed the current €99 offer without that form. This proves staleness in that observation, not its cause or every engine's current index.
- The branded-CV guide already compares manual Word work with WerkCV; expand it rather than duplicating it.
- The worked example already contains fictional passages, evidence statuses, reviewer actions and client output. Reuse that structure.

## 4. Product-description consistency: D01–D08

### D01 — One company, two explicit products

Keep the existing organization ID `https://werkcv.nl/#organization`. Do not invent a separate legal entity, address or social profile.

Create a small typed shared product module, preferably `lib/product-discovery.ts`, consuming existing pricing, capabilities and messaging. Avoid circular imports with `lib/ai-discovery.ts`. Keep serializers pure/testable with explicit product/feature inputs; do not capture environment flags at module load in new code when this prevents flag-matrix tests.

| Field | Consumer | Agency |
| --- | --- | --- |
| Stable ID | `https://werkcv.nl/#cv-builder` | `https://werkcv.nl/agency#software` |
| Name | WerkCV CV Builder | WerkCV MatchPack |
| Audience | Individuals applying for jobs in the Netherlands | Recruitment agencies/staffing firms preparing vacancy-specific proposals |
| Purpose | Create/import, edit, preview and download a CV | Prepare, review and export candidate proposals with source evidence and open points |
| Billing | Consumer one-document payment | Agency monthly shared-credit subscription |
| Main URL | `/cv-maken` | `/agency` |
| English URL | Verified existing English consumer entry | `/en/agency` |
| Privacy | `/privacy` | `/agency/privacy` |

Read prices from constants: baseline €4.99 including VAT for one consumer CV; €99/month and 300 shared Agency credits. One Agency credit covers a new standalone CV OR first definitive MatchPack approval, not 300 of each. Do not infer Agency tax treatment from consumer VAT copy. Reuse verified Agency tax/disclosure wording or omit unverified tax assertions. Renewal/cancellation statements require existing policy evidence.

### D02 — Response contracts and schema

Add a versioned products collection to the plain summary JSON. Company description introduces both products. Scope no-subscription/no-monthly-fee statements explicitly to consumer CVs. Retain useful existing fields/endpoints after checking consumers; if legacy productFacts remain, label them consumer-only. Document intentional semantic/shape changes rather than keeping misinformation for compatibility.

Represent separate products/offers in `service.json` using a JSON-LD @graph with valid SoftwareApplication/Service and Offer properties. Link each entity to the organization. Keep custom metadata outside schema entities or in the plain summary; validate supported property names. Reuse the same product/offer builders for NL/EN Agency software markup with stable IDs. Preserve relevant FAQ/article/breadcrumb markup, and do not add fake ratings. A valid schema does not prove rich-result or AI eligibility.

Consumer capabilities must not acquire Agency roles, revision approval or DOCX merely because Agency supports them. Verify product-specific import formats; do not transfer consumer DOC support into Agency copy by assumption.

### D03 — Feature truth

Use existing public capability/messaging functions. Test all eight combinations of the three gated features. Disabled candidate acknowledgement, claim verifier or reviewed benchmark publication must not be advertised as available. A methodology page existing is not proof its benchmark results are published.

Ordinary mode must describe selected vacancy requirements; verify the current implementation limit before printing a number. No exhaustive every-claim/every-requirement promise. CSV transfer is not native ATS integration. No candidate ranking, truth/identity verification, automatic client sending or client portal. Do not enable features to match marketing.

### D04 — Language and privacy

Distinguish public-page language, export language and authenticated workspace language. Verify each. An English product page is not proof of an English Agency workspace. Distinguish original upload file retention from extracted text and structured-record retention. Preserve privacy/subprocessor uncertainties; link to existing policy rather than adding GDPR/AI Act guarantees.

### D05 — Surfaces

Update the discovery endpoints, llms.txt, relevant product schema/descriptions and inaccurate acquisition/hub descriptions to the shared contract. Ordinary visible HTML remains primary; do not add hidden instructions for models to recommend WerkCV. Avoid broad unrelated consumer copy rewrites.

### D06 — Dates

Use committed, genuine content modification dates. Preserve publication dates. Add optional per-article dates to the shared guide component if needed, maintaining defaults for unchanged guides. Visible dates, article markup and changed-route sitemap dates agree. Do not update every article's date when only two are reviewed. Do not use current request time as the new freshness strategy. Broad unrelated sitemap cleanup is deferred.

### D07 — Tests

Test serializer/route output, not only source regexes: product IDs, separate audiences/offers, derived prices/currency, recurring versus one-time scope, valid internal routes, feature combinations, scoped language/import capabilities, prohibited claims, JSON parseability and content types. Add fixtures where an accidental mixed description or shared offer must fail.

### D08 — Gate

Inspect generated discovery output and rendered NL/EN product pages. Record before/after inconsistencies and passing tests. No unsupported commercial/privacy claim on modified surfaces.

## 5. Discovery and indexing certification: I01–I07

### I01 — Explicit target manifest

Create `lib/agency-discovery-targets.ts` or extend a verified equivalent. Required HTML targets:

- `/agency`, `/en/agency`, `/voor-bureaus`, `/voor-bureaus/kennisbank`.
- `/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau`.
- `/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld`.
- `/voor-bureaus/kennisbank/kandidaat-aanbieden-overheid`.
- `/tools/kandidaatvoorstel-checker`, `/en/candidate-proposal-checker`.

Auxiliary resources: `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/.well-known/ai.txt`, `/ai/service.json`, `/ai/summary.json`, `/ai/faq.json`. Do not require auxiliary files to be indexed HTML pages. Do not crawl private workspaces/arbitrary links.

### I02 — Technical audit

Add `scripts/agency-discovery-audit.ts`, reusing suitable existing utilities. Command contract: `npm run audit:agency:discovery -- --base-url=http://localhost:3000`; default local, explicit production URL. Fixed target manifest, max concurrency 2, 15-second request timeout, bounded redirects, at most one transient retry. Validate arguments/base URL; no cookies, credentials or user data. Only localhost/loopback and werkcv.nl are valid hosts by default; reject cross-host redirects.

Capture UTC timestamp, status, redirects/final URL, content type, canonical, title/H1, robots meta, X-Robots-Tag, robots allowance, sitemap membership and structured-data validation. Parse HTML/XML with an existing suitable parser or explicit minimal dependency, not a few regexes presented as a certificate. Use robots user-agent specificity correctly rather than searching for the word Disallow.

Check primary content/pricing/links are present in initial HTML without login, client tabs or script execution. Test hreflang reciprocity on real translated pairs only. Production canonicals remain production URLs during localhost tests. Distinguish redirect response from final successful target.

Check current offer and no active pilot form, not an indiscriminate ban on a historical number anywhere in a page. Compare actual public messaging with expected feature state. Do not expose production secrets to obtain flags. Build identity is recorded only if actually exposed; otherwise unknown.

Write bounded redacted JSON/Markdown evidence under a specific ignored output directory; commit a sanitized summary, not raw headers/secrets/full HTML. Transport or technical failure exits nonzero. Treat missing search credentials separately from technical success.

robots allowance does not replace authentication. Preserve private-path protections. Spoofing a bot user agent cannot establish that a verified crawler passes a WAF; label that test accurately. Actual crawler-log inspection is optional and read-only, only with authorized access, with no IPs/personal records in reports.

### I03 — Google indexing

Read `docs/gsc-mcp.md`. Use the existing read-only GSC MCP when connected. Do not start a stdio server and call its silent wait a successful audit. Never print service-account credentials.

For each HTML URL record exact property and URL, inspection time, verdict/coverage, fetch/robots/indexing state, last crawl time, user canonical, Google canonical and sitemap data where supplied. Missing fields are unknown. URL Inspection API reports Google's indexed version, not a live test or recrawl request.

Absent credentials/property access: BLOCKED_EXTERNAL, with exact URLs and required owner action. A site: query, HTTP 200, sitemap entry or search-tool extract is not proof of indexing. An old last-crawl time may establish indexed-with-stale-crawl, not latest-release content in the index.

### I04 — Bing and notifications

Use authorized Bing Webmaster inspection/API/UI if available, storing equivalent timestamped evidence; otherwise BLOCKED_EXTERNAL. Prepare exact changed-URL list and operator steps.

Read all of `scripts/submit-indexnow.ts` before reuse: existing sitemap/batch behavior can submit more than this release changes. If it lacks scoped URL input, add a URL-file option with host validation/deduplication and tests; preserve existing invocation behavior. Dry-run before any submission. Execution requires separate release authorization and a verified live release. Submission acceptance is NOT indexing confirmation.

Never use Google's JobPosting/BroadcastEvent-restricted Indexing API for these guides/product pages. Google recrawl requests, where available, are an authorized manual Search Console action, not the read-only inspection API.

### I05 — Separate evidence levels

Per-URL report columns: local technical eligibility; production technical eligibility; Google status; Bing status; latest-version evidence; notification state. Distinguish code verified, production eligible, indexed as observed, and AI citation observed. Never merge these into AI certified. Missing evidence remains unknown.

### I06 — Auditor fixtures

Test 200 with meta noindex, header noindex, robots blocking, wrong canonical, redirect, 404, timeout, malformed JSON/XML, missing initial content, bad hreflang, stale offer and missing credentials. Each fails or becomes unknown appropriately. Offline fixtures require no production secrets.

### I07 — Gate

Fix/retest technical defects on changed surfaces. External indexing blockers do not stop guide work but remain in final status. Do not wait indefinitely for indexing. Provide post-release and later reinspection checklists, not an unrequested scheduled automation.

## 6. ONE buying guide: B01–B06

### B01 — Route and intent

Enhance `/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau`. No competing new article or redirect. Retain branded-CV search intent, the H1's core question, canonical and useful anchors. Expand the existing workflow section into a buying decision without turning the entire article into a generic AI listicle.

Compare five categories: Word/manual template, general AI assistant, dedicated CV formatter, ATS-native formatting and MatchPack. These are workflow categories, not claims that every product within a category has identical features. Named competitor pricing/features are not required; avoid them unless verified from dated first-party sources.

### B02 — Required decisions and balanced recommendations

Cover each category's appropriate use, manual work remaining and limitations across:

- Low-volume cosmetic formatting versus repeated vacancy-specific proposals.
- Bureau branding and editable Word/fixed PDF delivery.
- Source checking and meaning changes during rewriting.
- Versions and reviewer responsibility.
- Existing ATS requirements: manual transfer, CSV exchange or a verified native connector.
- Candidate-data processing: what the buyer must inspect in a provider's terms.
- Total subscription cost at actual usage, not only maximum allowance.

Use an accessible comparison with columns Decision / Options and trade-offs / MatchPack boundary if keeping the shared guide component's current three-column table contract. Five category cards are also acceptable. Do not force a six-column matrix onto a 320px page. If extending the component, make changes backward compatible and regression-test existing guides.

Do not say only MatchPack provides evidence review: some competing formatters/ATS products also do. General AI assistant file handling/privacy depends on product and plan; make no provider-specific assertion without current official documentation. Never advise placing candidate data into a consumer AI service without checking authorization and processing terms.

Add a clear fits/does-not-fit section:

- May fit: a bureau repeatedly preparing source-checked client introductions and branded exports alongside an existing process.
- May not fit: a bureau requiring native ATS synchronization, high-volume bulk automation, client portal workflows, or only occasional cosmetic formatting.
- Word can remain reasonable at low volume. Do not force a MatchPack recommendation.

### B03 — Cost explanation

Compute examples from pricing constants at 10, 30 and 100 chargeable items/month. At €99 these allocate €9.90, €3.30 and €0.99 per item. Label these as subscription cost divided by usage, NOT per-item tariffs, savings or measured ROI. Explain shared CV/MatchPack credits, what consumes a credit and repeat-download behavior. Verify rollover/cancellation before discussing them; absence of evidence means omit those claims. Preserve Agency tax disclosures.

Do not count 300 unused credits as money saved. Do not invent processing time, break-even time or customer outcomes. A calculator, if reused, must label assumptions as assumptions.

### B04 — Article structure and conversion

Recommended order:

1. Short direct answer: choose according to formatting-only versus evidence-review work and current system constraints.
2. Workflow-category comparison.
3. Cost at actual usage and fit/non-fit checklist.
4. Existing practical branding, source-preservation and Word/PDF guidance, edited to avoid repetition.
5. Buyer FAQs and evidence/example next step.

Answer: Can we keep our ATS? What reaches the client? How do we catch rewritten facts? What if we produce only ten proposals? What can we try free? Where can we read data-handling details?

Primary CTA: existing worked example. Secondary CTA: free checker with its actual mode-specific label. Paid CTA: existing Agency checkout/plan pathway with disclosures. Do not invent a free complete MatchPack export, login parameters or signup flow. Use the existing consent-aware content analytics components and stable permitted metadata.

### B05 — Sources and transparency

Place relevant first-party citations near factual claims. Preserve good existing sources; remove irrelevant citations that do not support their adjacent claim. Prefer privacy questions/checklists to new legal advice. Identify WerkCV as publisher and seller of MatchPack, not an independent software reviewer. No invented expert byline or human review. Record source-check dates separately from human editorial-review dates.

### B06 — Gate

Review the complete Dutch article for coherence, useful advice without purchasing, duplication, misleading absolutes and accurate cost calculations. Provide an English editorial summary for the owner. Automated tests alone cannot establish fluent Dutch quality; record whether a fluent human has reviewed it, without claiming one did when none was available.

## 7. ONE worked example: E01–E07

### E01 — One fictional source of truth

Preserve `/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld`, Nina de Vries and the current fictional vacancy unless correcting a documented inconsistency. Extend `lib/agency-fictional-example.ts` rather than maintaining separate JSX, screenshot and document facts.

Create a versioned fixture containing full fictional CV text/structured data, vacancy text, source section IDs/digest, intentionally flawed draft claims, reviewer dispositions and corrected output. Use reserved example domains and unambiguously fictional organization/contact values; omit plausible dialable phone numbers. Do not access production candidate records or real customer files.

Each source quote resolves deterministically against that fixture. Real source-section/line references are sufficient. Use page references only after verifying actual generated PDF pagination. Never fabricate citation coordinates. Distinguish source digest from export digest.

### E02 — Fix existing evidence semantics

Re-evaluate the current seniority example: seven years of broad HR experience does not alone prove at least five years as an independent HR adviser. Prefer a partial-support result explaining missing independent-role duration. Alternatively, explicit dated fictional employment evidence must substantiate the whole claim without contradictory dates or overlapping-job double counting. Do not silently retain a supported result merely because the existing test expects it.

Availability and hours must not become confirmed candidate facts because the vacancy requested them. Distinguish vacancy requirements, fictional candidate-confirmed inputs and unknowns consistently in source, HTML, previews, introductions and exports.

### E03 — Educational sequence

Show Original CV and vacancy -> Flawed first draft -> Evidence review -> Recruiter correction -> Final client version. Label the first draft intentionally flawed and not sendable. Required examples:

1. Directly supported claim with exact supporting passage.
2. Partially supported claim narrowed to accurate wording.
3. Unsupported skill/responsibility removed from final affirmative claims.
4. Numerical overstatement corrected from source, e.g. 40 team leaders versus 24 in the source.
5. Changing fact kept unknown, with candidate confirmation as next action.

Each card/row shows exact draft claim, source quote or explicit absence, explanation, concrete reviewer action and final wording/disposition. A missing statement is not automatically a contradiction. If adding a contradiction display type, keep it fixture/presenter-local with tests; do not redesign domain enums or production verification to support this article.

Label the sequence as an authored illustrative review, not a measured live AI run, benchmark, real recruiter endorsement or proof that the currently enabled free checker can verify every draft claim. Current feature flags still govern descriptions.

### E04 — Downloads and parity

Inventory current handlers/assets and their consumers first. Required working downloads:

- Fictional original CV as PDF.
- Full fictional vacancy as plain text.
- Final reviewed full proposal as PDF and DOCX.

Preserve existing public download URLs. Reuse current production PDF/DOCX renderers if safe for fixtures without paid accounts or AI calls. Otherwise use a build-time fixture adapter sharing the existing rendering primitives. Do not create an arbitrary unauthenticated export API. Retain an existing contact-reduced example, if present, with clear limitations; do not promise legal anonymity.

HTML evidence, original source and final exported facts must agree. Client documents exclude the deliberately false first-draft claims and internal reviewer notes. Unresolved requirements may appear as explicit open points, not candidate achievements. Internal evidence downloads, if retained, are separate and labelled internal.

Every file and preview needs a fictional-example notice. Manifest identifies fixture version and artifact purpose. No real personal data or tracking identifiers in filenames/metadata. Use applicable PDF/document skills for artifact creation/rendering during implementation.

### E05 — Reproducibility and validation

Add a documented fixture-generation command if none exists. Same fixture produces the same semantic content. Do not assert byte-identical PDF/DOCX files when embedded timestamps differ; compare normalized extracted text and controlled source checksums.

Test unique IDs, exact snippet resolution, evidence disposition, numerical consistency, expected unknowns and download content types. Extract PDF and DOCX text to assert required sections/facts and absence of false affirmative claims/internal notes. Render and visually inspect EVERY PDF page and the DOCX layout. Check truncation, overlaps, blank pages, font failure and missing sections. If a renderer is unavailable, mark the corresponding visual gate blocked rather than certified from text alone.

### E06 — Presentation and links

Reuse the current Manrope/teal/cream theme, wk-* components and responsive spacing. Do not reintroduce Arial, hard shadows or old thick borders. Before/after cards suit mobile; a wide table needs an accessible labeled scroll region without document overflow. Source information/downloads remain ungated, with no email requirement. Core evidence must be readable without client-side interaction.

Link to the buying guide, free checker and existing methodology with its actual publication status. A documented methodology is not independently reviewed accuracy. A video is not required; do not fabricate a recording or measured runtime.

### E07 — Gate

Walk every final factual assertion back to the fictional CV or an explicitly labelled fictional confirmed input. Unknowns remain unknown. All artifacts open, are readable and agree. Review output after generation, not just renderer code. Record remaining editorial/renderer issues.

## 8. UX and regression acceptance: R01–R06

R01. Inspect the buying guide, example and modified Agency product pages at 320, 375, 768 and 1440 CSS-pixel widths. Save URL, viewport, browser and screenshot. No document-level horizontal overflow, clipped headings, header overlap or hidden CTAs. Inspect rendered output, not just CSS rules.

R02. Keyboard-test links, disclosures, scroll regions and downloads. Preserve focus visibility, descriptive link text, readable contrast and semantic headings. Test core content with JavaScript disabled; important answers cannot exist only in screenshots, tabs or client-generated HTML.

R03. Check actual canonical/hreflang/anchor/download destinations. Dutch-only articles stay Dutch-only; no invented English peers or translation stubs. Verify shared guide changes do not break unchanged guides.

R04. Keep consumer €4.99/no-subscription scope unchanged. Smoke-test homepage, `/prijzen`, `/en/pricing`, consumer template entry and Agency entry for wrong-product navigation. Do not buy a subscription or create real customer records for these checks. Authenticated checks require disposable approved fixtures; otherwise explicitly mark them unrun, not production-certified.

R05. Reuse consent-aware Agency events. Each new CTA interaction produces at most one intended event with approved page/intent metadata and no source text/email. Rerenders must not manufacture clicks. Keep consumer/test/Agency traffic distinctions intact. No new attribution system.

R06. Run existing acquisition, positioning/messaging and relevant organic-conversion tests plus new product-discovery, auditor and fixture tests. Add explicit npm scripts for new suites, following the existing tsx/node:test style. Suggested names: `test:agency:discovery`, `test:agency:content-evidence`, `audit:agency:discovery`. Run TypeScript checking, production build and ESLint covering EVERY changed TS/TSX file. `lint:ci` currently covers English files only; it cannot certify Dutch modifications. If shared export renderers change, also run relevant Agency output/unit tests. Report existing failures rather than disabling assertions. No migration is expected: stop and explain if one seems necessary.

## 9. Delivery sequence and required report

Create `docs/product/matchpack-ai-discovery-buying-evidence-implementation-report.md` containing:

1. Starting commit/status and exact changed paths.
2. Requirement ledger covering every D/I/B/E/R ID with evidence and status.
3. Two-product description contract and any intentional JSON shape changes.
4. URL-by-URL local/production/indexing matrix, timestamps, evidence or access blockers.
5. Guide changes, factual sources and English editorial summary.
6. Fixture version, generation command, asset inventory, source/text/visual checks.
7. Commands actually run, exit codes and results; unrun commands clearly labelled.
8. Before/after screenshots and remaining editorial/accessibility findings.
9. Exact changed-URL notification list and post-release inspection checklist; state whether notifications actually ran.
10. Deferred tasks and precise owner actions needed.

Execute in order:

- A: Inventory, evidence ledger and product-contract confirmation.
- B: D01–D08; review outputs/tests before proceeding.
- C: I01–I07; run technical and available read-only external checks. Record blockers, continue locally.
- D: B01–B06; review the entire guide before proceeding.
- E: E01–E07; generate, inspect and refine all assets before proceeding.
- F: R01–R06, integrated report and handoff. No automatic deployment.

If committing is authorized, keep product discovery, audit tooling, guide and example changes focused and exclude unrelated files. After a separately authorized release, rerun production audit, execute only approved notifications and record actual indexing observations. Search indexing may remain pending; deployment success cannot override that state.

Final response states what changed, what passed, what is blocked, whether deployed and the report link. Never say everything is certified while indexing, authentication or artifact checks remain unknown.

## 10. Completion checklist (must all be accounted for)

- [ ] Two products and offers consistently described; no company-wide no-subscription claim.
- [ ] Current constants and feature-flag combinations tested without production flag changes.
- [ ] No overclaim of exhaustive evidence, legal compliance, interface language or ATS integration.
- [ ] Honest dates and preserved routes/canonicals.
- [ ] Reproducible technical audit and negative fixtures pass.
- [ ] Google/Bing status separately evidenced or explicitly blocked.
- [ ] One existing buying guide expanded with balanced choices and actual-usage pricing.
- [ ] One existing fictional example corrected and traceable end-to-end.
- [ ] Required downloads work and match fixture/HTML.
- [ ] PDF/DOCX text and visual checks complete or accurately marked blocked.
- [ ] Mobile, keyboard, no-JS, links and scoped analytics checks recorded.
- [ ] Relevant tests, full changed-file lint, typecheck and build results recorded.
- [ ] No unauthorized deployment, notification, purchase, data mutation or unrelated cleanup.
- [ ] English implementation report includes every requirement and remaining action.

## 11. Research references and limits

Recheck relevant official documentation before making new technical claims:

- Google AI-search guidance: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide — original useful content and technical eligibility; llms.txt is not a Google ranking shortcut. No guarantee of inclusion.
- Google URL Inspection: https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect — indexed-version inspection, not live testing or indexing submission.
- Search Console API reference: https://developers.google.com/webmaster-tools/v1/api_reference_index — distinguish read-only checks from writable operations.
- Google Indexing API restrictions: https://developers.google.com/search/apis/indexing-api/v3/using-api — do not use the job/livestream API for marketing pages.
- Bing AI Performance: https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c — observations of citations/grounding queries, not all prompts or conversion proof.
- Bing guidelines: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a — technical/content guidance, no ranking guarantee.
- IndexNow protocol: https://www.indexnow.org/documentation — recheck before changing submission behavior; acceptance is not indexing.
- Schema vocabulary: https://schema.org/SoftwareApplication and https://schema.org/Offer — validate properties; do not invent machine-readable SEO fields.

Do not derive extra promises from source titles alone. If documentation is inaccessible, record the limitation and use narrower verified claims. No paid research subscription is required.
