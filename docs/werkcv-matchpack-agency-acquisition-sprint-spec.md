# WerkCV MatchPack Agency acquisition sprint specification

**Date:** 2 September 2026  
**Status:** Ready for implementation  
**Intended executor:** GPT-5.6 Luna Max or equivalent  
**Repository:** `D:/DKPlayground/werkcv`  
**Product:** WerkCV MatchPack  
**Scope:** Public positioning, search acquisition, internal authority transfer, measurement, and release certification

## 0. Non-negotiable executor instructions

1. Read this specification completely before editing.
2. Inspect every named file and its current tests before selecting an interface or changing copy.
3. Preserve all unrelated tracked and untracked work. Do not clean, overwrite, stage, revert, commit, push, deploy, send email, submit URLs, or prune infrastructure unless the user separately requests that action.
4. Implement one checkpoint at a time. Run its gate and review its diff before proceeding.
5. Reuse existing MatchPack, pricing, feature-flag, analytics, attribution, brand, navigation, structured-data, and sitemap contracts. Do not build parallel systems.
6. Keep the consumer CV Builder, public MatchPack marketing pages, public checker, and authenticated Agency workspace clearly separated.
7. Do not enable `PROPOSAL_CLAIM_VERIFIER_ENABLED`, `CANDIDATE_ACKNOWLEDGEMENT_ENABLED`, or `CLAIM_BENCHMARK_PUBLICATION_ENABLED` as part of this sprint.
8. Do not advertise a disabled feature as available. Public copy must derive feature-dependent statements from the same server-side feature flags that control the product.
9. Do not create keyword-swapped pages. Every route in this specification has one distinct intent and must provide unique, useful content.
10. Use the current Manrope-based `wk-*` brand system and shared public shell. Do not extend the legacy hard-border/hard-shadow compatibility layer.
11. Do not make public performance, compliance, accuracy, time-saving, or conversion claims without the required external evidence.
12. Document repository mismatches and deviations in the implementation report. Never silently skip a requirement.

## 1. Mission

Make MatchPack understandable and discoverable in the language recruitment agencies already use, while preserving its defensible evidence-review positioning.

The public category statement is:

> Candidate submission software for recruitment agencies that connects important client-facing claims to CV evidence, keeps missing information visible, and lets the recruiter approve one controlled PDF or DOCX version.

The Dutch equivalent is:

> Software voor kandidaatvoorstellen waarmee recruitmentbureaus belangrijke klantclaims aan CV-bewijs koppelen, ontbrekende informatie zichtbaar houden en één gecontroleerde PDF- of DOCX-versie goedkeuren.

Use **MatchPack** as the product name and **Agency** only as the billing tier and authenticated route namespace. Searchers must not need to know either name before understanding what the product does.

The intended acquisition journey is:

**Category/task query → useful commercial page, guide, or fictional example → free checker or complete example → MatchPack product and price → Agency account/checkout → first MatchPack → approved export → repeat use**

This sprint improves discovery and comprehension. It does not reopen the underlying MatchPack architecture.

## 2. Evidence baseline and correct interpretation

Record this baseline in the implementation report before changing production-facing pages.

### 2.1 Search baseline

The supplied Search Console page export covers 13 May through 12 August 2026:

- `/agency`: 35 impressions, 0 clicks, 0% CTR, average position 9.34;
- `/voor-bureaus` and `/en/agency`: absent from the 422 exported page rows;
- no Agency-intent term appears in the 1,000 exported query rows.

The separate 90-day overview covering 27 May through 24 August 2026 contains 31,507 site-wide impressions and 602 clicks, a weighted CTR of approximately 1.91%. This proves that WerkCV receives search visibility, but does not prove visibility for MatchPack.

### 2.2 AI-citation baseline

The supplied Microsoft Clarity export covers 2 June through 30 August 2026:

- no MatchPack or Agency route appears in the exported top 100 cited pages;
- no Agency-intent phrase appears in the exported top 100 grounding queries;
- `/cv-tips/cv-voor-detachering` is the only directly adjacent cited route, with 45 exported citations.

Clarity citations are references inside supported AI answers. They are not visits, rankings, leads, or sales. Grounding queries are retrieval phrases, not necessarily exact user prompts.

### 2.3 Product analytics baseline

The production aggregate checked on 2 September 2026 contained, over the preceding 90 days:

- 190 Agency-related analytics rows across public, account, checker, and product events;
- 19 `page_view` rows for `/agency`;
- 6 `page_view` rows for `/voor-bureaus`;
- 5 `page_view` rows for `/en/candidate-proposal-checker`;
- 3 `page_view` rows for `/tools/kandidaatvoorstel-checker`;
- one active Agency subscription, one Agency payment, and one MatchPack.

These analytics rows are not unique visitors. The subscription/payment may be internal or owner activity. Apply the existing external-actor exclusions before using any value as market evidence.

### 2.4 Market-language evidence

Current products use category phrases such as:

- `candidate submission software`;
- `candidate presentation software`;
- `client submission software`;
- `candidate submission email software`;
- `candidate submission template`.

Market-context sources include:

- SubmitCraft: https://submitcraft.com/
- SmallRecruiter: https://smallrecruiter.com/candidate-submission-software
- ATZ CRM: https://atzcrm.com/solution/recruitment-client-portal-software/
- HireAra: https://www.hireara.ai/

These sources establish vocabulary and visible category expectations only. Do not repeat their performance figures, pricing, customer counts, or comparative claims in WerkCV copy without a current, reproducible review.

### 2.5 Interpretation

The evidence supports this diagnosis:

1. WerkCV's general SEO engine works.
2. MatchPack has almost no measurable non-branded search visibility.
3. The current English category wording is closer to market language than the Dutch wording.
4. `MatchPack`, `Agency Plan`, `evidence traceability`, and `candidate proposal evidence` are differentiation terms, not proven acquisition queries.
5. The first response must be clearer category language, authority transfer, recrawling, and measurement—not more product features or dozens of new pages.

Do not invent search volume. The keywords below are prioritised hypotheses. Search volume and country/language demand must be validated from Search Console, Bing Webmaster Tools, Keyword Planner, or another clearly named dataset.

## 3. Locked product and commercial decisions

- Keep the Agency billing tier at **€149 per month**.
- Keep the shared allowance of **50 standalone Agency CVs or definitively approved MatchPacks per paid period**.
- Derive price, currency, product name, and limit from `lib/agency-plan.ts`; do not hardcode them in repeated page copy.
- MatchPack remains a pre-send quality-control layer. It is not an ATS, recruitment CRM, ranking engine, client portal, identity-verification system, consent service, or electronic-signature system.
- Keep CSV as the current import/export integration route.
- Do not build ATS integrations, multi-candidate comparison, client portals, generic summary generators, template expansion, or new billing models.
- Do not create a pilot, sales-call, lead-capture, discount, countdown, trial, or email-gated funnel.
- Keep the public checker fully useful without email when its current mode is available.
- Do not change authentication, entitlement, quota, retention, checkout, payment, approval, or export behaviour.
- Do not change consumer pricing or consumer conversion pages.
- Do not publish competitor-comparison or “best software” pages in this sprint.
- Do not publish customer logos, testimonials, or quantified outcomes until they are real and authorised.

## 4. Public truth contract

Create `lib/agency-public-capabilities.ts` or extend an existing canonical equivalent. It must be a server-safe, pure source of truth for public MatchPack capabilities.

It must expose at least:

```ts
export type AgencyPublicCapabilities = {
  pdfExport: true;
  docxExport: true;
  reusableAgencyTemplates: true;
  teamRoles: true;
  revisionHistory: true;
  csvExchange: true;
  retentionControls: true;
  deletionControls: true;
  proposalClaimVerifier: boolean;
  candidateAcknowledgement: boolean;
  benchmarkPublished: boolean;
  atsIntegration: false;
  clientPortal: false;
  automatedClientSending: false;
};
```

The three conditional values must use the existing functions in `lib/agency-feature-flags.ts`. Static values must be backed by inspected production code and tests.

Use this contract to remove stale public statements. At minimum, inspect every file under:

- `app/agency/`
- `app/en/agency/`
- `app/voor-bureaus/`
- `components/agency/`
- `lib/agency-content.ts`
- `lib/ai-discovery.ts`

Known stale statements that must be corrected include claims that Agency customer output is PDF-only or that shared team roles are unavailable. Candidate acknowledgement and Proposal Claim Verifier copy must remain conditional because those features are flag-controlled.

Copy rules:

- Say “supported by the submitted CV,” not “verified true.”
- Say “candidate confirmation needed,” not “candidate claim is false.”
- Say “contact-reduced,” not “anonymous” or “anonymised,” unless the same visible block explains residual identifiers.
- Say “ATS-friendly” only where a tested formatting property supports it; do not claim ATS compliance.
- Say “works alongside your ATS,” not “integrates with your ATS,” because CSV is the only current exchange route.
- Never claim the product chooses, scores, ranks, recommends, or rejects candidates.
- Never claim GDPR, AI Act, recruitment-code, or legal compliance.
- Never claim a fixed time saving or conversion improvement without a measured sample, dates, methodology, and limitations.

## 5. Route and intent map

Create `lib/agency-acquisition.ts` as a pure registry. It must define one intent for every page in this sprint and prevent accidental cannibalisation.

Suggested contract:

```ts
export const agencyAcquisitionRouteIds = [
  "nl_product",
  "nl_solution_hub",
  "nl_how_to",
  "nl_example",
  "nl_branded_cv",
  "nl_checker",
  "en_product",
  "en_checker",
] as const;

export type AgencyAcquisitionRouteConfig = {
  id: (typeof agencyAcquisitionRouteIds)[number];
  path: string;
  locale: "nl" | "en";
  kind: "commercial" | "hub" | "guide" | "example" | "tool";
  primaryIntent: string;
  secondaryIntents: readonly string[];
  title: string;
  description: string;
  h1: string;
  primaryDestination: string;
  hreflangPeer?: string;
};
```

The registry is an editorial/technical contract, not a keyword-injection system. Page components may consume its canonical metadata and headings, but must not render hidden keyword lists.

### 5.1 Exact route ownership

| Route | Purpose | Primary search intent | Required outcome |
|---|---|---|---|
| `/agency` | Dutch commercial product and pricing | `kandidaatvoorstel software recruitmentbureau` | Understand MatchPack, inspect example, see price, start account/checkout |
| `/voor-bureaus` | Dutch solution/category hub | `kandidaatvoorstellen voor opdrachtgevers` | Choose the appropriate guide, checker, example, or product route |
| `/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever` | Dutch how-to/checklist | `kandidaatvoorstel maken`; `kandidaat voorstellen aan opdrachtgever` | Learn the workflow, use checker or inspect example |
| `/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld` | New Dutch fictional example | `kandidaatvoorstel voorbeeld` | Inspect a complete evidence-linked example, then use checker or MatchPack |
| `/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau` | Dutch branded-CV guide | `cv in huisstijl recruitmentbureau` | Understand safe branding and controlled exports |
| `/tools/kandidaatvoorstel-checker` | Dutch tool | `kandidaatvoorstel checker`; current enabled checker intent | Complete a useful free check |
| `/en/agency` | English commercial category page | `candidate submission software`; secondary `candidate presentation software` | Understand MatchPack, inspect example, see EUR price, start account/checkout |
| `/en/candidate-proposal-checker` | English tool | `candidate proposal checker`; current enabled checker intent | Complete a useful free check |

Do not add `/en/candidate-submission-software`; `/en/agency` already owns that commercial intent. Do not add `/voor-bureaus/kandidaatvoorstel-maken`; the existing how-to guide already owns it.

### 5.2 Exact metadata and H1 contract

Use these as the default strings unless the implementation review finds a strict character-limit or localisation issue. Record any change.

#### `/agency`

- title: `Kandidaatvoorstel-software voor recruitmentbureaus | WerkCV`
- description: `Maak onderbouwde kandidaatvoorstellen met zichtbaar CV-bewijs, open punten, recruiter-review en gecontroleerde PDF- en DOCX-export. €149 per maand voor 50 gedeelde slots.`
- H1: `Maak onderbouwde kandidaatvoorstellen voor opdrachtgevers`
- first supporting sentence must identify MatchPack as software for recruitmentbureaus and detacheerders.

#### `/voor-bureaus`

- title: `Kandidaat voorstellen aan opdrachtgevers | Voor bureaus`
- description: `Praktische workflow voor recruitmentbureaus: verbind functie-eisen met CV-bewijs, houd onbevestigde informatie zichtbaar en keur één klantversie goed.`
- H1: `Kandidaat voorstellen aan een opdrachtgever, met bewijs uit het CV`
- move the current line `Laat uw opdrachtgever niet zelf uitzoeken waarom een kandidaat past` into supporting copy or a later section.

#### Dutch how-to guide

- title: `Kandidaatvoorstel maken: voorbeeld en checklist | WerkCV`
- description: `Leer stap voor stap een kandidaatvoorstel voor een opdrachtgever maken, met een klantintroductie, CV-bewijs, bevestigde gegevens, open punten en begeleidende e-mail.`
- H1: `Hoe maak je een kandidaatvoorstel voor een opdrachtgever?`

#### New Dutch example

- title: `Kandidaatvoorstel voorbeeld voor recruiters | WerkCV`
- description: `Bekijk een volledig fictief kandidaatvoorstel met vacature-eisen, exact CV-bewijs, open punten, klantintroductie, begeleidende e-mail en PDF/DOCX-output.`
- H1: `Kandidaatvoorstel voorbeeld: van CV-bewijs naar klantintroductie`

#### Dutch house-style guide

- title: `Kandidaat-CV in huisstijl van je recruitmentbureau | WerkCV`
- description: `Zet een kandidaat-CV gecontroleerd in bureauhuisstijl, bewaar de inhoudelijke bron en exporteer de goedgekeurde klantversie als PDF of DOCX.`
- H1: `Hoe zet je een kandidaat-CV in de huisstijl van je recruitmentbureau?`

#### `/en/agency`

- title: `Candidate Submission Software for Recruitment Agencies | WerkCV`
- description: `Connect client-facing candidate claims to exact CV evidence, keep gaps visible, and approve one controlled PDF or DOCX submission. €149 per month, billed in EUR.`
- H1: `Candidate submission software for recruitment agencies`
- use the current “every important claim connected to evidence” sentence as the differentiating subheading.

Use normal readable language in body copy. Exact-match phrases do not need to be repeated. Google recommends descriptive, concise titles and buyer language in prominent locations; keyword stuffing is forbidden.

### 5.3 Voice

- Dutch public Agency pages use `je` and `jullie`, not a mixture of `u`, `uw`, `jij`, and `jouw`.
- English uses direct professional language and sentence case.
- Lead with buyer outcome; introduce MatchPack in the first paragraph.
- Use Agency only for the billing tier or route/account label.
- Never tell a visitor they need a sales call or pilot.

## 6. Shared public Agency presentation

Refactor public Dutch Agency pages away from broad compatibility CSS toward route-family components using the current `wk-*` design tokens.

Create or extend shared components such as:

- `components/agency/AgencyMarketingHero.tsx`
- `components/agency/AgencyEvidenceExample.tsx`
- `components/agency/AgencyConversionPanel.tsx`
- `components/agency/AgencyGuideArticle.tsx`

Names may differ if an equivalent already exists. Do not create components with only one trivial use.

Requirements:

- use Manrope through the established brand shell;
- use current rounded cards, restrained borders, soft shadows, colour tokens, spacing, and buttons;
- remove new uses of legacy `border-2 border-slate-950` plus hard offset shadows from this route family;
- no broad descendant override selectors;
- `min-width: 0` on grid/flex children that contain long Dutch or English headings;
- safe wrapping for `kandidaatvoorstel`, `recruitmentbureau`, `candidate submission`, email addresses, URLs, and prices;
- no horizontal scroll at 320, 375, 768, 1024, or 1440 CSS pixels;
- one visually dominant H1;
- one dominant action per section;
- 44-by-44 CSS-pixel interactive targets;
- visible keyboard focus, logical heading order, sufficient contrast, reduced-motion support, and no content that depends solely on colour.

Preserve `BrandRouteBoundary`, `PublicSiteShell`, the MatchPack context label, and correct English pricing navigation. Add the new example route to the existing MatchPack route-family behaviour through the canonical route-context utility, not one-off pathname logic if the family already matches by prefix.

## 7. Page-by-page product requirements

### 7.1 Dutch commercial product: `/agency`

The first desktop viewport and first two mobile screens must communicate:

- category: software for candidate proposals;
- audience: recruitment agencies and staffing/detachment firms;
- input: authorised CV plus genuine vacancy and recruiter context;
- outcome: controlled client-facing proposal;
- differentiation: source evidence and visible unknowns;
- control: recruiter review and approval;
- outputs: PDF and DOCX from the same approved snapshot;
- price: €149/month in EUR, 50 shared slots;
- boundary: works alongside the ATS and does not rank candidates.

Required order:

1. category-led hero;
2. concise trust strip with no more than four items;
3. complete fictional example or direct jump to it;
4. four-step workflow;
5. evidence/recruiter judgement/current-fact distinction;
6. what MatchPack does and does not do;
7. pricing and exact slot explanation;
8. privacy/retention/team/export trust links;
9. visible FAQ;
10. final action.

Primary hero action:

- when Proposal Claim Verifier is enabled and certified: `Controleer een voorstel gratis` → `/tools/kandidaatvoorstel-checker`;
- while disabled: use the truthful label for the current requirements-versus-CV checker, or `Bekijk het fictieve voorbeeld` → the example section/page.

Secondary action: `Start MatchPack · €149/maand` using the existing checkout/account contract.

Do not show a pilot form, intake form, “request demo,” or sales-call requirement. Do not hardcode the price or limit.

### 7.2 English commercial product: `/en/agency`

Keep the current new-brand implementation, but make the category phrase the H1 and preserve the evidence promise as the subheading.

Required content:

- `Candidate submission software for recruitment agencies` in title and H1;
- “candidate presentation software” used once naturally in explanatory copy or FAQ;
- €149 per month, billed in EUR;
- 50 shared standalone Agency CV/approved MatchPack slots;
- PDF and DOCX;
- works alongside an ATS through current CSV exchange;
- no ranking, scoring, recommendation, automated client sending, or legal/compliance guarantee;
- feature-dependent checker/acknowledgement statements rendered from the public-capability contract.

Do not create a duplicate English commercial landing page.

### 7.3 Dutch solution hub: `/voor-bureaus`

This route explains the problem category and routes visitors; it must not duplicate the full product/pricing page.

Within the first 120 words answer:

- what a professional candidate proposal contains;
- why CV evidence and current candidate information must be separated;
- which visitor should use the how-to guide, fictional example, free checker, or MatchPack product page.

Required navigation cards:

1. `Kandidaatvoorstel maken` → existing how-to guide;
2. `Bekijk een volledig voorbeeld` → new example page;
3. `Controleer bewijs` → current checker with a flag-accurate label;
4. `Bekijk MatchPack` → `/agency`.

Keep the existing honest “not every problem requires MatchPack” comparison, but update it to current capabilities and current terminology.

### 7.4 Dutch how-to guide

Route: `/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever`

Improve the existing page rather than creating a duplicate.

Required visible answer structure:

1. direct 60–100 word answer;
2. what belongs in a candidate proposal;
3. exact source for each type of information;
4. six-step pre-send checklist;
5. example of an unsupported generic claim and an evidence-linked rewrite;
6. current facts that require candidate confirmation;
7. internal notes versus client-facing information;
8. full versus contact-reduced output;
9. concise submission-email example;
10. limitations and authoritative sources;
11. contextual link to the complete fictional example;
12. checker/product action after the useful content.

Keep source-backed, unique instructional material. Do not expand the page with repetitive keyword sections. Correct stale feature statements via the public-capability contract.

### 7.5 New Dutch fictional example

Route: `/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld`

Use the existing fictional HR-adviser source and `AgencySubmissionDemo`/shared fixture as the sole content source. Do not create a second inconsistent Nina data object.

The page must show, in this order:

1. prominent `Volledig fictief voorbeeld` notice;
2. short fictional vacancy context;
3. relevant source-CV passages with stable page/section labels;
4. five to eight atomic client-facing claims;
5. evidence status for every displayed claim;
6. exact evidence snippet or an explicit absence/conflict;
7. recruiter disposition or next action;
8. current facts kept open until confirmation;
9. final recruiter-approved introduction;
10. accompanying client email;
11. full and contact-reduced output explanation;
12. PDF and DOCX availability from the same approved snapshot;
13. methodology/limitations links;
14. free-checker and MatchPack actions.

Never display a proposal-wide match score, candidate rank, “best candidate,” or suitability recommendation. If exact source references cannot be represented from the shared fixture, show the truthful source section and do not fabricate page numbers.

If downloadable sample files already exist, link only after verifying that their content matches the visible fixture and current terminology. Rename or replace a file labelled `geanonimiseerd` only through a deliberate compatibility-safe change; user-facing copy must say `zonder directe contactgegevens` or `contact-reduced`.

### 7.6 Dutch house-style guide

Route: `/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau`

Keep the existing unique guide and retarget its metadata/H1 according to section 5. Correct at least these outdated claims:

- MatchPack now exports both PDF and DOCX;
- team roles exist;
- reusable Agency templates exist;
- CSV is the current exchange route;
- contact-reduced output is not automatically anonymous.

Do not turn this page into generic design advice. Its unique purpose is preserving source meaning while adding bureau branding and controlling the exported version.

### 7.7 Public checker routes

Routes:

- `/tools/kandidaatvoorstel-checker`
- `/en/candidate-proposal-checker`

Do not change the verifier gate. The pages must render the correct mode and copy for the active feature flag.

When the proposal claim verifier is disabled:

- do not call the current tool a full proposal claim verifier;
- describe the actual requirements-versus-CV evidence check;
- keep the methodology/benchmark link truthful about unpublished results.

When enabled later through its separate release gate:

- the page may target `kandidaatvoorstel checker` / `candidate proposal checker`;
- the full useful result remains ungated;
- the MatchPack CTA appears only after the result.

## 8. Internal authority-transfer plan

Add contextual B2B links only where the reader can plausibly be a recruiter, agency owner, consultant, or staffing professional.

### 8.1 Required source routes

Inspect and update:

- `/cv-tips/cv-voor-detachering`;
- `/cv-tips/cv-voor-uitzendbureau`;
- homepage B2B section;
- public footer/navigation Agency link;
- relevant Agency knowledge pages.

### 8.2 Exact linking behaviour

On `/cv-tips/cv-voor-detachering`, after the primary candidate-facing answer and before the final generic CV-builder CTA, add one compact branch:

- heading: `Werk je bij een bureau en stuur je kandidaten naar opdrachtgevers?`
- body: explain that MatchPack connects vacancy requirements, CV evidence, open points, and one approved client version;
- primary contextual link: `Bekijk hoe je een kandidaatvoorstel maakt` → the Dutch how-to guide;
- quiet link: `Bekijk MatchPack voor bureaus` → `/agency`.

On `/cv-tips/cv-voor-uitzendbureau`, add a similar but shorter branch only if the page clearly distinguishes job-seeker and agency-reader intent. Do not displace the consumer page's primary purpose.

Use descriptive anchor text. Do not use `klik hier`, inject keyword lists, or add site-wide B2B banners to the consumer editor, pricing, login, checkout, or download flow.

All Agency pages must link to the canonical route for each intent. Do not link internally to query-string variants or stale aliases.

## 9. Content and citation quality contract

Every changed commercial or editorial route must:

- answer the main query in the first 120 words;
- include one unique, useful example or workflow;
- make the main title visually and semantically unambiguous;
- use the primary intent naturally in title, H1, first paragraph, and at most one descriptive internal anchor;
- distinguish CV evidence, recruiter assessment, and candidate-confirmed current information;
- explain what remains unknown or requires human review;
- disclose that examples are fictional;
- cite current primary or authoritative sources for legal, privacy, technical, or recruitment-code statements;
- display a truthful published/updated date only after substantive review;
- keep visible FAQ copy identical to FAQ structured data when FAQ markup is used;
- keep Article structured-data facts identical to visible content;
- contain no hidden crawler-only or AI-only text;
- contain no unsupported statistic, rating, testimonial, customer count, or market-superiority claim;
- provide useful value before the commercial CTA.

Do not promise that Google, Bing, ChatGPT, Copilot, Perplexity, or another AI system will cite or rank a page.

Use these sources where relevant and re-check them at implementation time:

- Google Search Essentials: https://developers.google.com/search/docs/essentials
- Google title-link guidance: https://developers.google.com/search/docs/appearance/title-link
- Google canonical guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google sitemap guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- IndexNow documentation: https://www.indexnow.org/documentation
- NVP Sollicitatiecode: https://www.nvp-hrnetwerk.nl/nl/sollicitatiecode
- EDPB lawful-processing guidance: https://www.edpb.europa.eu/sme/be-compliant/process-personal-data-lawfully_en

External sources support only the claim next to which they are cited. Do not treat one source as a blanket endorsement of MatchPack.

## 10. Technical SEO requirements

### 10.1 Canonicals and language

- Every public route in section 5 must return 200 and self-canonicalise on `https://werkcv.nl`.
- `/agency` and `/en/agency` are genuine language equivalents and must have reciprocal `nl-NL`, `en`, and `x-default` alternates.
- Do not add hreflang between non-equivalent guide/example routes.
- Preserve the canonical non-`www` host and existing permanent host redirect.
- Do not change public URLs unless this specification explicitly creates the example route.

### 10.2 Sitemap and discovery

- Add the new example page exactly once to `app/sitemap.ts`.
- Keep all existing canonical Agency pages exactly once.
- Use editorial last-modified dates from `lib/agency-content.ts` or a route-specific registry; do not stamp every URL with build time.
- Update `lib/ai-discovery.ts` so descriptions use current category language and active capabilities.
- Update any `llms.txt`/AI FAQ output generated from that registry through the existing mechanism.
- Keep `/agency/account`, checkout, API, admin, candidate-session, and editor routes out of the public index.

### 10.3 Structured data

- Commercial pages may use accurate `SoftwareApplication`/`WebApplication`, `Offer`, and `BreadcrumbList` data already supported by visible content.
- The offer must use EUR and values derived from `lib/agency-plan.ts`.
- Guides/examples use `Article` and `BreadcrumbList` only when visible author/publisher/date content agrees.
- FAQ markup is allowed only for visible matching FAQs; do not expect or claim a Google FAQ rich result.
- Do not publish `Dataset` results while the benchmark-publication flag is disabled.
- Do not add ratings, reviews, aggregate ratings, or customer counts.

### 10.4 Search-engine refresh

Code cannot certify indexing. After an authorised deployment, a human must:

1. submit or confirm `https://werkcv.nl/sitemap.xml` in Google Search Console and Bing Webmaster Tools;
2. inspect `/agency`, `/voor-bureaus`, `/en/agency`, the Dutch how-to, the new Dutch example, and both checker routes;
3. record index state, Google-selected canonical, crawl date, and any error;
4. request recrawling once after the substantive update;
5. verify after recrawl that the stale pilot/intake search snippet is no longer shown;
6. use IndexNow only if a valid existing site integration/key is already configured; do not invent or expose a key in this sprint.

Google states that recrawling and reprocessing can take days to weeks. Do not declare the title/snippet fixed merely because the live HTML changed.

## 11. Analytics and attribution

Extend the existing certified Agency validation funnel. Do not create a new event database or count raw page-view rows as people.

Inspect and reuse:

- `components/agency/AgencyContentAnalytics.tsx`
- `components/agency/AgencyCommercialAnalytics.tsx`
- `components/agency/AgencyCtaLink.tsx`
- `lib/agency-analytics-contract.ts`
- `lib/agency-validation-funnel.ts`
- `lib/agency-validation-funnel-server.ts`
- `lib/agency-validation-funnel.test.ts`
- current admin MatchPack analytics page/data layer.

### 11.1 Required route stages

For each acquisition route and in aggregate, report distinct eligible actors for:

1. qualified landing session;
2. page engaged or primary content reached, if an existing safe event supports it;
3. example viewed/downloaded;
4. checker viewed;
5. checker started;
6. checker completed;
7. MatchPack CTA selected;
8. Agency login/account completed;
9. Agency checkout created;
10. Agency payment/subscription active;
11. first MatchPack analysis;
12. first approved export;
13. repeat MatchPack use.

Payments, subscriptions, MatchPacks, approvals, exports, and repeat use must come from authoritative server/database records. Client events are interaction signals only.

### 11.2 Route context

Persist safe acquisition context through internal navigation, login, account, and checkout using existing attribution mechanisms:

- canonical landing path;
- route ID;
- locale;
- CTA location;
- first-touch source/medium/campaign where already available;
- latest non-direct attribution where already available.

Never send query strings, CV/proposal text, evidence snippets, vacancy text, candidate/recruiter notes, email, name, filename, organisation name, or free-form form values to analytics.

### 11.3 Exclusions

Use the central external-actor exclusion policy. Exclude:

- configured owner/internal accounts;
- `@werkcv.nl`;
- smoke, fixtures, automation, known test domains, and test plus-addresses;
- subscriptions marked `excludeFromProductMetrics`;
- bots and health checks;
- account/product events without a qualifying external actor where the metric requires one.

Do not hardcode the owner's personal email in a new query or component.

### 11.4 Required admin view

Add or extend a MatchPack acquisition table with:

- date range and timezone;
- route and intent;
- unique qualified sessions;
- search/AI/direct/referral breakdown where known;
- checker starts/completions;
- example views/downloads;
- product CTA users;
- checkout users;
- paid external Agency users;
- first-analysis users;
- first-export users;
- repeat-use users;
- raw numerator and denominator next to every rate.

Display `—`, not `0%`, when the denominator is zero. Label incomplete identity/attribution coverage explicitly.

## 12. Measurement and decision framework

### 12.1 Observation clock

The 30–45 day observation clock starts only when:

- all scoped pages are deployed and return 200;
- canonical/hreflang/sitemap tests pass;
- the priority URLs have been inspected/submitted by a human;
- stale pilot copy is absent from live HTML;
- funnel fixtures and external-actor exclusions pass;
- the release baseline and deployment date are recorded.

### 12.2 Reporting cadence

- Day 0: save baseline.
- Day 7: functional/indexing review only; do not judge commercial success.
- Day 14: inspect coverage, selected canonical, impressions, queries, and errors.
- Day 30: first directional acquisition review.
- Day 45: decide whether SEO/category acquisition has enough signal to continue.

Report rolling 7-, 28-, and 45-day views without comparing incomplete calendar periods as if equivalent.

### 12.3 Diagnostic rules

1. Not indexed: technical/discovery problem.
2. Indexed but fewer than 50 total non-branded impressions after 45 days: topic/authority/distribution problem; do not add more product features.
3. At least 100 impressions but CTR below 1%: title/snippet/intent problem; test copy only.
4. Visits but weak checker/example engagement: promise or page-experience problem.
5. Checker completions but weak product CTA: positioning/value problem.
6. Product CTA but weak login/checkout: trust, price, currency, or authentication problem.
7. Checkout but weak payment: checkout/payment or commercial-friction problem.
8. Payment but no first MatchPack: onboarding/product problem.
9. First MatchPack but no repeat use: workflow-fit/product-value problem.

Thresholds above are operational diagnostic rules, not public success claims.

Do not interpret conversion rates until there are at least 100 qualified external sessions and 30 completed checker runs. Show small samples rather than hiding them.

### 12.4 Commercial validation remains separate

Search impressions, rankings, citations, visits, and checker completions do not validate willingness to pay. Retain the existing external validation gate from the broader MatchPack specification. Do not call the product market-validated based on this sprint alone.

## 13. Distribution actions outside code

This specification does not authorise messages or posts. Record these as owner-operated actions after deployment:

- submit/inspect priority URLs in search tools;
- publish two useful LinkedIn posts derived from the fictional example and evidence checklist, linking to the relevant free resource rather than directly demanding purchase;
- share the checker/example individually with a small, clearly relevant group of recruiters or agencies;
- ask for workflow feedback, not a testimonial;
- record response category without copying private candidate content into analytics.

Do not call this a pilot. Do not automate unsolicited outreach or email existing consumer users about the Agency product.

## 14. Required automated tests

Add `test:agency:acquisition` using the repository's existing `npx tsx --test` convention, or extend an equivalent scoped test command.

### 14.1 Registry and public truth tests

Test that:

- all route IDs and canonical paths are unique;
- every route is internal, normalised, and on the correct locale path;
- `/agency` and `/en/agency` are reciprocal language peers;
- no other non-equivalent route has hreflang;
- no duplicate route owns the same primary intent;
- title, description, and H1 are non-empty and within existing editorial limits;
- price/limit values derive from `lib/agency-plan.ts`;
- public capabilities match the current feature flags;
- disabled features are not described as active;
- no route registry produces an Agency account URL as an indexable canonical.

### 14.2 Copy safety tests

Scan scoped public content for forbidden or stale unqualified phrases:

- `pilot`;
- `AVG-proof` / `GDPR compliant`;
- `100% accurate` / `hallucination free`;
- `verified true`;
- `anonymous` / `geanonimiseerd` without a same-block limitation;
- PDF-only statements;
- statements that team roles do not exist;
- direct ATS integration claims;
- candidate rank, score, winner, or recommendation claims.

The test must allow legitimate explanatory/negative uses where context is explicitly encoded; do not use an unmaintainable global grep as the only validation.

### 14.3 SEO tests

For all scoped routes verify:

- route returns/render contract exists;
- unique title and description;
- exactly one visible H1;
- self-canonical;
- correct reciprocal hreflang only for `/agency` and `/en/agency`;
- no `noindex` on public routes;
- sitemap includes each canonical exactly once;
- new example is present in Agency content and AI-discovery registries;
- structured-data URLs use the non-`www` canonical;
- visible FAQ and FAQ schema remain identical;
- price in structured data matches the shared Agency plan constants.

### 14.4 Analytics tests

Extend deterministic funnel fixtures to cover:

- repeat page events from one visitor;
- one visitor crossing multiple Agency content routes;
- how-to → example → checker → product → checkout;
- English product → checker → product;
- direct return that preserves known first-touch attribution;
- internal owner/test actor exclusion;
- bot/health-check exclusion;
- payment without redundant client paid event;
- zero denominators;
- no CV/proposal/PII values in event properties.

Assert exact distinct counts and rates.

### 14.5 Product regression tests

Run the existing:

- `npm run test:agency:activation`
- `npm run test:agency:unit`
- `npm run test:workspace:unit`
- `npm run i18n:validate-routes`
- focused lint for all changed files
- `npm run build`

If database, account, checkout, or product code changes unexpectedly, also run the relevant integration, migration, E2E, and output suites. This sprint is expected to require no Prisma migration.

## 15. Manual UX and content verification

Verify these routes at 320, 375, 768, 1024, and 1440 CSS-pixel viewport widths:

- `/agency`;
- `/voor-bureaus`;
- `/voor-bureaus/kennisbank`;
- `/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever`;
- `/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld`;
- `/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau`;
- `/tools/kandidaatvoorstel-checker`;
- `/en/agency`;
- `/en/candidate-proposal-checker`.

For each applicable route, verify and record:

- the shared public header, mobile menu, logo link, and footer behave correctly;
- the browser title, canonical URL, H1, visible promise, and primary CTA agree;
- the current Manrope-based WerkCV theme is used, with no legacy four-pixel borders or hard shadows;
- there is no horizontal overflow, clipped headline, overlapping navigation, or inaccessible off-screen action;
- the primary CTA destination matches the route map and preserves locale and intended entry context;
- disabled capabilities are not presented as available;
- the €149 monthly price and 50-document allowance are shown only where commercially relevant and are sourced from shared constants;
- the fictional example is prominently labelled fictional and contains no real person, email address, phone number, company, school, or client information;
- source snippets, evidence labels, unresolved information, and recruiter actions remain readable without colour alone;
- all interactive controls have visible focus, descriptive accessible names, logical keyboard order, and a sufficiently large pointer target;
- heading hierarchy and landmark structure are sensible with a screen reader;
- Dutch pages consistently address recruiters as `je`/`jullie` and do not switch to formal `u`/`uw`;
- English CTAs stay on valid English routes unless the destination is a deliberately shared authenticated product route;
- no consumer CV-builder route unexpectedly redirects to Agency and no Agency route falls into the consumer purchase flow.

Using fictional fixture data, inspect the full and contact-reduced PDF and DOCX outputs referenced by the example. Confirm that the visible example does not promise any output or redaction behaviour that the generated documents do not actually provide.

## 16. Sequenced implementation checkpoints

The executor must work in this order. Complete and review each checkpoint before starting the next one. Do not combine all changes into a single unreviewable rewrite.

### Checkpoint 0 — Baseline inventory

1. Record the current commit, working-tree state, route inventory, current metadata, feature-flag defaults, shared price/limit constants, and relevant test commands.
2. Identify unrelated modified or untracked files and leave them untouched.
3. Capture desktop and mobile screenshots of every route in Section 15.
4. Record current internal links into the Agency route family and the current analytics event names.

Exit gate: the implementation report contains a reproducible before-state and an explicit list of files in scope.

### Checkpoint 1 — Route and capability contracts

1. Implement the route/intent registry defined in Section 5.
2. Implement the public-capability truth contract defined in Section 4.
3. Add registry, price, flag, copy-safety, and route-uniqueness tests.
4. Make no visible copy change until these contracts pass.

Exit gate: automated tests fail for a duplicate intent owner, stale price, invalid locale peer, or unqualified disabled-feature claim.

### Checkpoint 2 — Commercial category pages

1. Update `/agency` only.
2. Review its copy, CTA sequence, responsive behaviour, analytics, and product-truth assertions.
3. Then update `/en/agency` as a native English page, not a literal translation.
4. Verify reciprocal hreflang and the English pricing destination.

Exit gate: both routes clearly explain category, buyer, problem, workflow, boundaries, evidence, price, and next action without using `MatchPack` as the only explanation.

### Checkpoint 3 — Dutch hub and shared guide presentation

1. Update `/voor-bureaus` and its knowledge index.
2. Refactor `AgencyGuideArticle` or introduce a narrow route-family presentation primitive so the scoped guides inherit the current brand without broad descendant overrides.
3. Retest all existing pages using the shared component before continuing.

Exit gate: the hub has distinct educational intent, guide navigation is coherent, and all scoped guides use the current theme without breaking unrelated routes.

### Checkpoint 4 — Existing high-intent guides

Update and review one page at a time in this order:

1. `/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever`;
2. `/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau`;
3. `/voor-bureaus/kennisbank/cv-anonimiseren-recruitment` only where truth-contract or internal-link corrections are required;
4. `/voor-bureaus/kennisbank/matchpack-handleiding` only where truth-contract or terminology corrections are required.

Exit gate: stale PDF-only, team-role, candidate-review, privacy, and product-boundary claims have been corrected; each page has one owned intent and a useful next step.

### Checkpoint 5 — Fictional worked example

1. Build `/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld` from a deterministic fictional fixture.
2. Add it to the content registry, knowledge index, sitemap, internal recommendations, and AI-discovery output.
3. Validate every displayed source snippet and claim classification against that fixture.
4. Confirm that no benchmark or accuracy claim is implied.

Exit gate: a recruiter can understand the full evidence-review workflow from the page without creating an account, and every factual example is reproducible from fictional source data.

### Checkpoint 6 — Authority transfer and discovery

1. Add the contextual links defined in Section 8.
2. Verify links are crawlable anchors with descriptive visible text.
3. Verify consumer pages retain their primary job-seeker purpose and do not become Agency landing pages.
4. Add or update canonical, sitemap, and IndexNow/search-submission documentation.

Exit gate: Agency pages receive relevant internal authority without harming consumer journeys or creating duplicate intent pages.

### Checkpoint 7 — Measurement

1. Implement the event contract and distinct-actor reporting from Section 11.
2. Add deterministic analytics fixtures and privacy assertions.
3. Create the 7-day diagnostic and 30–45-day decision views without inventing targets from insufficient data.

Exit gate: a repeated visitor cannot be counted as multiple prospects at the same stage, test/owner traffic is excluded, and the funnel can distinguish discovery failure from proposition or activation failure.

### Checkpoint 8 — Full certification

1. Run all automated gates in Section 14.
2. Complete every manual check in Section 15.
3. Review the final diff for unrelated edits, stale claims, route collisions, visual regressions, and accidental feature activation.
4. Complete the implementation report in Section 18.

Exit gate: every Definition of Done item is evidenced, or the release remains blocked with the unmet item recorded.

## 17. Release and rollback requirements

This is a focused, migration-free acquisition release. It is not authorisation to deploy.

Before any separately authorised deployment:

- reconcile the release with the latest `main` without discarding unrelated work;
- stage only the reviewed acquisition-sprint files;
- confirm the Agency price, allowance, authentication split, checkout behaviour, and all three feature-flag defaults are unchanged;
- preserve the previous production image/commit as the named rollback target;
- record the exact build identifier and migration state;
- do not send outreach email or submit URLs to external services unless separately authorised.

After an authorised deployment:

- verify the live build identifier and health endpoint;
- verify HTTP status, canonical, robots directive, title, H1, and CTA destination for every route in Section 15;
- complete one Dutch and one English public journey;
- perform an authenticated Agency smoke test with authorised fictional data when a safe account is available;
- verify analytics contain no CV, proposal, email, name, filename, or source-snippet content;
- monitor application errors, 404s, CTA failures, checker failures, and checkout regressions for at least seven days;
- request recrawl through the configured search-engine process and record the request date separately from the index date.

Roll back the release if it introduces broken navigation, checkout regression, accidental `noindex`, incorrect price, unsupported live-feature claims, consumer-to-Agency routing leakage, PII in telemetry, or unresolved mobile overflow. A rollback must not bypass existing product approval, retention, role, or source-integrity invariants.

## 18. Required implementation report

Create:

`docs/product/werkcv-matchpack-agency-acquisition-sprint-implementation-report.md`

The report must contain:

- baseline commit, branch, working-tree state, and evidence dates;
- every changed file grouped by checkpoint;
- final route/intent registry and capability truth table;
- before/after metadata, H1, primary CTA, and canonical for each scoped route;
- every stale or contradictory claim found and how it was resolved;
- final internal-link map, including source page, anchor text, and destination;
- analytics event dictionary, actor exclusions, attribution rules, and example funnel calculation;
- explicit exclusions and deferred work;
- structured-data, sitemap, hreflang, and AI-discovery verification;
- desktop/mobile screenshots and accessibility findings;
- fictional example fixture checksum and source-span verification result;
- PDF/DOCX comparison findings where applicable;
- exact commands run, exit codes, failed checks, and fixes;
- external actions that remain pending because they require separate authorisation;
- proposed deployment and rollback identifiers;
- reviewer name/role placeholders and review dates;
- every deviation from this specification, with reason and risk.

Do not mark an item complete with phrases such as `appears correct` or `should work`. Cite a test, screenshot, rendered output, query result, or inspected file/line. If a required environment is unavailable, mark the gate `NOT CERTIFIED`; do not silently omit it.

## 19. Definition of Done

The sprint is complete only when all of the following are true:

- a first-time recruitment-agency visitor can understand the product category and purpose without already knowing the name MatchPack;
- `/agency`, `/en/agency`, `/voor-bureaus`, each guide, the example, and each checker own a distinct documented search intent;
- no duplicate Dutch commercial how-to page or duplicate English category page was introduced;
- public copy derives changing price, allowance, feature availability, and product boundaries from tested shared truth contracts;
- all scoped pages use the current Manrope-based WerkCV design and a consistent Dutch or English voice;
- the fictional worked example shows the complete evidence-to-action workflow and every snippet resolves to its source;
- relevant consumer authority pages link contextually into the Agency journey without hijacking their job-seeker purpose;
- every public route is indexable, self-canonical, present once in the sitemap, and represented correctly in AI-discovery output;
- discovery, engaged visit, checker completion, activation, checkout, and paid conversion are measured by distinct non-test actors with privacy-safe properties;
- the diagnostic report can state whether the next constraint is indexing, search demand, proposition, activation, or payment;
- required tests, production build, mobile checks, keyboard checks, content review, and output comparisons pass;
- no feature flag, price, billing limit, retention rule, product approval invariant, ATS integration, client portal, ranking feature, or outreach automation was changed;
- the implementation report clearly separates code completion, deployment, indexation, traffic observation, and commercial validation.

The desired outcome is a truthful, measurable opportunity for qualified agencies to discover and evaluate MatchPack. This sprint cannot guarantee rankings, traffic, leads, or sales, and its reporting must never imply otherwise.
