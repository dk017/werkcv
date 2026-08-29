# English role-based CV example cluster and conversion specification

Status: Ready for implementation
Audience: Luna Max implementation agent, product reviewer, content reviewer, and analytics reviewer
Repository: D:/DKPlayground/werkcv
Owner: WerkCV product team
Decision date: 2026-08-29

## 1. Mission

Turn the existing English logistics/warehouse CV-example page into a trustworthy, measurable acquisition pattern, then expand it into a small set of genuinely useful English role examples for people applying for work in the Netherlands.

The product promise is:

> See a realistic role-specific CV structure, adapt it for free in the WerkCV editor, review the complete result, and pay only once for the finished PDF.

This is a content-and-conversion release. It is not a new subscription funnel, an ATS, a job board, an immigration service, a ranking system, or a mass-produced SEO-page programme.

The implementation must make it possible to answer, for every role example:

1. Did a real visitor see the page?
2. Did they start the example or upload their own CV?
3. Did they create a meaningful CV and reach preview?
4. Did they start checkout?
5. Did they pay for a CV created from that role page?

No page may be declared successful from page views alone.

## 2. Evidence and what it means

The following is the production snapshot used to justify this work. It is internal evidence, not public marketing copy.

For /en/english-cv-example-logistics-warehouse-netherlands, the current production records show:

- 56 page_view events;
- 36 distinct visitors in the event properties;
- 11 start_cv events;
- 3 non-owner signups attributed to the exact source path;
- 1 paid cv-download order attributed to a CV created from the page.

The known owner accounts were removed from the signup/order check. The query is an all-time diagnostic snapshot, not a controlled experiment. Event-path traffic and account attribution are not perfectly identical, so the result must not be advertised as a 33% conversion rate.

Sibling diagnostics are mixed: the software-engineer example has more traffic and editor starts but no recorded paid order in the same attribution view. Therefore the logistics result is promising but not yet a repeatable causal finding.

The current logistics page already has useful differentiators:

- English-language content specifically for applications in the Netherlands;
- realistic warehouse terminology such as WMS, SAP EWM, EPT, reach truck, shifts and safety;
- measurable sample evidence such as pick rate and accuracy;
- a pre-filled editor action;
- a visible one-time €4.99 PDF price and no-subscription explanation.

The page must be improved and measured before producing more pages.

## 3. Research constraints and content principles

The implementation must follow these principles:

1. Answer the user first. A visitor searching for a CV example must see the role, local context, and useful structure before reading product promotion.
2. Use role-specific substance. A new page must contain a materially different sample CV, vocabulary set, evidence examples, mistakes, FAQs, and local context. Changing only the job title is prohibited.
3. Use fictional data only. Names, employers, contact details, dates, metrics and organisations in examples must be synthetic. Use example.com email domains. Label the entire CV as fictional/example content near the top.
4. Never encourage copying unsupported claims. Every number, certificate, responsibility, employer, date and language level in a sample must be replaced with the visitor’s own evidence.
5. Do not make legal or hiring guarantees. WerkCV must not promise a job, ATS acceptance, sponsorship, work authorisation, identity verification, or compliance. Link to official sources for work-permit or qualification questions.
6. Keep the price truthful. Use cvDownloadPrice.displayEn from the existing price source. State that editing, templates, and preview are free and that the finished PDF costs one one-time payment. Do not hardcode a second price.
7. Do not mass-produce thin pages. Google’s people-first guidance requires original, useful, complete content and warns against large numbers of near-duplicate pages created primarily for search traffic. The cluster must stay small until the data justifies expansion.
8. Separate editorial guidance from product claims. “A warehouse CV often shows…” is guidance. “WerkCV lets you…” is a product statement. Do not present fictional CV facts as research findings.
9. Cite current authoritative sources. Use Work in NL, UWV, Government.nl, IND, or another directly relevant official source only where it supports the nearby statement. Record the source URL and review date. Do not add an unrelated source merely to make the page look researched.
10. Do not promise AI or search-engine citation. Good structure and authoritative sourcing improve machine readability, but no ranking or AI citation is guaranteed.

Research references used for this specification:

- Work in NL: CV — https://www.workinnl.nl/en/employment/cv-en/default.aspx
- Indeed: Warehouse Worker Resume Examples — https://www.indeed.com/career-advice/resume-samples/warehouse-worker
- UWV: Working in the Netherlands — https://www.uwv.nl/en/individuals/working-in-the-netherlands
- Government.nl: work permits — https://www.government.nl/faq/foreign-citizens-working-in-the-netherlands/what-permits-do-foreign-workers-need
- Google: Creating helpful, reliable, people-first content — https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google: guidance on generative AI content — https://developers.google.com/search/docs/fundamentals/using-gen-ai-content

## 4. Locked product decisions

These decisions are not to be changed during implementation without a written product decision:

- The pages are public English educational/example pages, not a pilot funnel.
- The first release contains the existing logistics page plus exactly three adjacent role pages.
- The first three new roles are:
  1. Forklift / Reach Truck Operator;
  2. Order Picker / Fulfilment Worker;
  3. Logistics Coordinator.
- The English editor remains the destination for all example CTAs.
- The visitor can use the fictional example or start with their own CV upload.
- Account creation/login is still required before a saved CV is created, but the visitor must return to the exact role and sample data after authentication.
- The editor, preview, checkout, and PDF output remain the source of truth for the actual product experience.
- The PDF price remains the existing one-time consumer price (€4.99 including VAT at the time of this specification).
- No discount, subscription, trial, ranking, suitability score, job matching, or employer lead form is added.
- No personal or candidate data is stored by the public page itself.
- A role-page paid conversion is counted from a paid Order joined to the CV created from that role page. A payment that cannot be tied to a role-specific CV source is unattributed.

## 5. Scope

### In scope

- Repairing role-level attribution for example CTAs and login return paths;
- improving the existing logistics/warehouse page;
- adding three unique role pages using a shared, accessible component contract;
- improving first-fold preview and CTA clarity;
- adding role-specific content, FAQs, sources, metadata, structured data, and internal links;
- adding analytics dimensions and a role-level report;
- testing the complete public-to-editor-to-payment route;
- documenting rollout and measurement gates.

### Explicitly out of scope

- Creating twenty or more role pages now;
- translating every page into every language;
- building an ATS integration, job board, candidate portal, or recruiter workflow;
- changing the pricing model or raising the price;
- generating real candidate CVs;
- claiming that a sample CV is a successful real candidate outcome;
- building a downloadable public library of full sample PDFs that bypasses the product’s paid download flow;
- adding third-party advertising, session replay, or new tracking vendors;
- creating pages for synonyms that do not have distinct user intent;
- changing global branding or unrelated navigation.

## 6. Required delivery sequence

Implement one phase at a time. After each phase, run its checks, inspect the diff, and record the result in an implementation report. Do not proceed when a phase gate fails.

### Phase 0 — Read and baseline

Before editing production code:

1. Read AGENTS.md completely.
2. Read the existing role-page component and all current English example pages:
   - app/en/components/EnglishRoleCvExamplePage.tsx;
   - components/cv-examples/EnglishUseExampleButton.tsx;
   - app/api/create-cv/route.ts;
   - app/en/editor/page.tsx;
   - the login route and post-login redirect code;
   - lib/analytics.ts;
   - lib/conversion-funnel.ts;
   - lib/conversion-funnel-server.ts;
   - lib/attribution.ts;
   - lib/start-source.ts;
   - app/sitemap.ts and the English metadata helpers.
3. Confirm the current working tree and preserve all unrelated user changes.
4. Capture a baseline for each existing English example page:
   - HTTP status;
   - canonical and language links;
   - page views, distinct visitors, example starts, signups, meaningful CVs, previews, checkouts, paid users and paid orders where available;
   - mobile and desktop screenshots;
   - current page copy and source-review date.
5. Do not use the baseline to publish a conversion claim. It is for before/after comparison only.

Exit gate: the baseline is reproducible, the current page routes are understood, and no implementation starts with an unexamined attribution assumption.

### Phase 1 — Make role attribution reliable

The current EnglishUseExampleButton sends the generic startSource value english_example_page. Replace this with a validated role-specific source while keeping backward compatibility for old records.

#### Source contract

Define a single role-source helper, for example en_role_example_<roleSlug>, with these rules:

- lowercase ASCII letters, digits, and underscores only;
- maximum 80 characters;
- derived from a server-approved role registry, not arbitrary client input;
- never contains an email, candidate name, CV text, query string, or free-form user input;
- old english_example_page values remain readable but are reported as legacy/unattributed.

The canonical role slugs for the first release are:

- logistics_warehouse;
- forklift_reach_truck;
- order_picker_fulfilment;
- logistics_coordinator.

#### Required propagation

The role source must survive every path:

1. public page view;
2. example CTA click;
3. unauthenticated redirect to login;
4. session storage of pending sample data;
5. login verification;
6. post-login editor route;
7. sample data application;
8. CVDocument.startSource and attribution;
9. editor events through preview, checkout and paid order.

If a visitor chooses “Start with my own CV,” use a separate source such as en_role_example_<roleSlug>_upload, while preserving the parent role slug for reporting.

#### Required events

Reuse the existing event taxonomy where possible. Add only the missing role property or a narrowly scoped event; do not create multiple names for the same action.

Every event from this flow must include, where applicable:

- roleSlug;
- pagePath;
- uiLanguage: en;
- entryMethod: example or upload;
- templateId;
- cvId after a CV exists;
- device category from the existing analytics context.

The flow must produce these measurable stages:

- page_view / landing;
- landing_cta_click;
- start_cv;
- login_verified with the preserved next path;
- example_cv_applied_after_login;
- cv_created;
- durable meaningful-CV state;
- ready_to_download_viewed;
- full_preview_opened;
- checkout_start or checkout_started;
- database-backed paid order.

Do not put CV text, sample text, email addresses, names, filenames, IP addresses, or user-agent strings into event properties or logs.

#### Attribution rules

- Primary role conversion attribution is the CVDocument.startSource of the paid CV.
- The first-touch page/source is retained and must not be overwritten by later navigation.
- If one user creates several CVs from different role pages, each CV is reported separately by its own role source.
- Paid truth comes from Order.paidAt and product cv-download, not from a browser paid event.
- Agency documents, internal accounts, test accounts, known owner accounts, and configured analytics exclusions are removed from public-consumer reports.
- A missing or legacy role source is shown as unattributed, never guessed from a referrer or email.

#### Analytics report requirements

Add a role-example report to the existing admin analytics or a dedicated server-side report. It must show, for a selected date range:

- unique visitors;
- unique role-page sessions;
- example CTA starts;
- own-CV upload starts;
- unique signups;
- unique meaningful CV users;
- unique ready users;
- unique preview users;
- unique checkout users;
- unique paid users;
- paid orders and revenue;
- conversion rates with denominators;
- Dutch/English only where relevant (this cluster is English);
- mobile/desktop;
- landing page and role slug;
- legacy/unattributed volume;
- data-quality warnings.

The certified unique-user funnel must be the basis for conversion claims. Session-level diagnostics may be displayed separately but must be labelled as sessions.

Exit gate:

- An unauthenticated visitor using each role example returns to the correct role-specific pre-filled editor after login.
- An authenticated visitor reaches the same editor state directly.
- A paid order can be joined to the correct role source through the CV, without joining by email alone.
- A test fixture with a missing role source is reported as unattributed.
- Internal, test, and Agency fixtures are excluded.
- No content or PII appears in analytics logs.

### Phase 2 — Improve the existing logistics page

Update /en/english-cv-example-logistics-warehouse-netherlands without changing its stable URL.

#### Required metadata

- Title: English Warehouse CV Example for the Netherlands | WerkCV, or an equally clear title that leads with the search intent rather than a year that will go stale.
- Description: state that it is a realistic English warehouse/logistics CV example for the Netherlands, free to edit, with a one-time PDF price and no subscription.
- Canonical: the exact production URL.
- inLanguage: en-NL only if the page genuinely serves that locale; otherwise use en consistently with the site’s metadata conventions.
- dateModified: the actual editorial/source-review date, never a fabricated future date.

#### Required above-the-fold structure

1. Eyebrow: English warehouse CV example for the Netherlands.
2. H1: English warehouse CV example for the Netherlands, or a similarly direct answer-first variant.
3. One short paragraph explaining who the example is for and what it demonstrates.
4. A prominent label: Fictional example — replace every detail with your own evidence.
5. Primary button: Use this example — free to edit.
6. Secondary button: Start with my own CV and an upload-first route.
7. A compact price line using the shared price source: Free to edit and preview. The finished PDF costs €4.99 including VAT. No subscription.
8. A larger visual preview of the sample’s structure. It must be readable on mobile and clearly labelled as a preview, not a real candidate document.

The page must not make the visitor scroll through several generic paragraphs before seeing the example and primary action.

#### Required content improvements

Keep the useful current material, but add or refine:

- a short answer block explaining the first items a warehouse hiring team scans;
- a role-specific evidence map covering warehouse flows, equipment, systems, certificates, shifts, safety, languages, location, and measurable output;
- a transparent bullet formula such as action + system/equipment + scale or quality + result;
- a “no numbers yet” alternative showing how to write a truthful process/safety bullet without inventing metrics;
- English and Dutch vacancy vocabulary (warehouse operative, warehouse employee, order picker, logistics employee, magazijnmedewerker) with a note that the candidate should use terms that match the vacancy and their real experience;
- local context about English/Dutch communication, shifts, certificates, and work authorisation, with official links only where relevant;
- a clearly separated “what to copy” versus “what not to copy” section;
- a role-specific FAQ with at least four useful questions, including experience level, certificates, English/Dutch use, and measurable achievements;
- a visible editorial/source-review date and a truthful statement that the sample CV is fictional;
- links to the English example index, English CV format guide, English templates, English editor, and the next most relevant role examples.

Remove or explain any source that does not support a nearby claim. The current IND income-requirements link must not remain as decorative research; replace it with a relevant official source or remove it.

#### Sample CV requirements

The sample must continue to demonstrate:

- a realistic five-year progression;
- inbound/outbound/order-picking or related warehouse flows;
- WMS/scanner/system use;
- equipment and certificate fields;
- shift and language information;
- at least one clearly labelled fictional metric;
- no real person, employer, phone number, or email address.

Every prominent metric must be visibly covered by the fictional-example warning. The page copy must instruct the visitor not to reuse 145 order lines per hour, 99.4%, or any other sample fact unless it is true of them.

### Phase 3 — Build the first three new role pages

Create one page per role using the shared role-example component and a typed role data contract. Do not copy the logistics page and replace only its title.

#### Role 1: Forklift / Reach Truck Operator

Suggested path: /en/english-cv-example-forklift-reach-truck-netherlands

Required unique material:

- forklift, reach truck, EPT/pallet truck and safety vocabulary;
- certificate type and certificate-year fields;
- loading/unloading, replenishment, put-away and damage reporting;
- shift, temperature-controlled, yard, or warehouse-context availability;
- safe-operation and incident-reporting evidence;
- FAQs about certificates, expired certificates, English/Dutch instructions, and how to describe equipment honestly.

Do not imply that a certificate is valid or legally accepted merely because it appears in the fictional example.

#### Role 2: Order Picker / Fulfilment Worker

Suggested path: /en/english-cv-example-order-picker-fulfilment-netherlands

Required unique material:

- pick routes, scanners, WMS, packing, returns, replenishment and dispatch;
- accuracy, order lines, units, pallets, cut-off times, or error reduction as optional evidence types;
- cold-storage, evening, night, weekend, or rotating-shift context where appropriate;
- a no-numbers writing alternative;
- FAQs about entry-level experience, agency work, shift availability, language, and physical-work claims.

The sample must not use the logistics page’s exact employer, dates, metrics, or bullets.

#### Role 3: Logistics Coordinator

Suggested path: /en/english-cv-example-logistics-coordinator-netherlands

Required unique material:

- transport or warehouse planning, carrier communication, ERP/TMS, Excel, delivery performance and exception handling;
- a progression story that differs from an operational warehouse worker;
- stakeholder communication in English/Dutch;
- measurable but fictional outcomes such as on-time delivery, planning volume, or reduced exceptions;
- FAQs about coordinator versus warehouse roles, systems, planning metrics, and translating Dutch vacancy terms.

This page targets a more administrative/professional logistics intent and must not be presented as an entry-level warehouse template.

#### Shared page content contract

Every role page must provide the following typed fields or equivalent:

~~~ts
type EnglishRoleExample = {
  roleSlug: string;
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  audience: string;
  templateId: string;
  colorThemeId: string;
  sampleCV: CVData;
  previewAlt: string;
  scanTitle: string;
  scanBody: string;
  scanChecks: string[];
  evidenceExamples: string[];
  noNumbersExample: string;
  vocabulary: { english: string; dutch?: string; explanation: string }[];
  localContext: string;
  mistakes: string[];
  faqs: { question: string; answer: string }[];
  sources: { label: string; href: string; note: string; reviewedOn: string }[];
  relatedLinks: { href: string; label: string }[];
  lastReviewed: string;
};
~~~

The type is a contract, not permission to fill every page with identical copy. The implementation must reject empty role-specific arrays for scanChecks, evidenceExamples, mistakes, faqs, and sources.

### Phase 4 — Shared page and CTA UX

Improve EnglishRoleCvExamplePage and EnglishUseExampleButton as shared components rather than adding one-off CSS or event logic to individual pages.

#### Primary CTA behaviour

- Label: Use this example — free to edit on the first button.
- Loading state: Opening example… and disabled while the request is pending.
- On unauthenticated response: save the validated role slug, template ID, colour, and fictional sample data in the existing pending-example mechanism; route to login with a safe encoded next path.
- After login: apply the exact sample once, create or open the correct CV, and record example_cv_applied_after_login.
- On authenticated response: create the CV with role-specific startSource and route to /en/editor?id=....
- On failure: show a visible, localized recovery message and restore the button. Do not silently swallow the error.
- Never expose sample data in a URL query string.

#### Own-CV CTA behaviour

- Label: Start with my own CV.
- Preserve role attribution while setting entryMethod=upload.
- Route to the English editor’s upload-first flow, not the Dutch editor and not the Agency workspace.
- Keep the same €4.99 and no-subscription explanation.

#### Preview requirements

- Show a useful static preview in the public page.
- The preview must not pretend to be a real candidate or a paid export.
- Use the same template and colour IDs as the sample editor route where possible.
- Do not render private analytics or third-party embeds.
- At 320px and 375px widths, text must wrap without horizontal scrolling, buttons must remain reachable, and the sample must not become unreadably small.

#### Price and trust block

The first fold or the immediate CTA block must state:

- edit and preview are free;
- the finished PDF has a one-time price from the shared price source;
- no subscription or automatic renewal;
- later editing and re-download rules as currently implemented;
- payment methods may vary by country/provider.

Do not hide the price until checkout.

### Phase 5 — SEO, structured data, and internal linking

#### URL and indexing rules

- Keep the existing logistics URL unchanged.
- Use one canonical URL per new role.
- Add each live page to the sitemap through the existing sitemap mechanism.
- Do not create trailing-slash duplicates, query-string index pages, or alternate synonym pages.
- Use noindex only for test or preview routes, never the public role pages.
- Add an English language link to /en/dutch-cv-examples and the English guides/templates where appropriate.
- Add a Dutch counterpart only when a genuinely maintained Dutch page exists. Do not invent hreflang pairs for non-equivalent pages.

#### Metadata rules

Each page must have:

- a unique title leading with the user’s role and Netherlands intent;
- a unique description describing the actual sample and editor action;
- one descriptive H1;
- canonical URL;
- correct Open Graph/Twitter metadata using existing site helpers;
- an accurate dateModified.

Do not use keyword lists as a substitute for useful content. If the existing metadata helper accepts keywords, keep them short, role-specific, and non-repetitive.

#### Structured data

Use JSON-LD only for content visible on the page:

- BreadcrumbList for the visible breadcrumbs;
- Article or WebPage for the educational example page, with truthful author/publisher data;
- FAQPage only for visible FAQ questions and answers;
- SoftwareApplication only where the page genuinely describes the editor application, not as a fake review or rating.

Do not add ratings, reviews, prices, availability, or user outcomes that are not visibly and factually present. Validate JSON-LD syntax and required fields in tests.

#### Internal links

Every page must link to:

- the English example index;
- the English CV-format guide;
- English templates;
- the English editor;
- at least two genuinely relevant adjacent role pages once those pages exist.

The example index must link back to every live role page with the same role name used in the H1. Avoid circular keyword-only links.

### Phase 6 — Measurement and review period

After deployment, do not immediately add more pages. Observe the four-page cluster for a fixed review window chosen before launch. The reviewer must record:

- date range and deploy commit;
- unique visitors by role;
- editor starts by role and entry method;
- meaningful CV rate;
- preview rate;
- checkout rate;
- paid-user rate and paid-order rate;
- time from role-page start to paid order;
- mobile versus desktop;
- signups that cannot be attributed because of legacy/generic source values;
- processing or routing errors;
- qualitative feedback or support contacts.

Use paid users/orders as the commercial outcome. Page views, CTA clicks, and email opens are diagnostic metrics only.

Do not declare a role winner or loser from one order. Set the minimum sample before reading the result. The recommended review gate is at least 20 non-internal attributed signups or 5 paid orders per role, whichever comes first; if traffic is below that, report the result as directional and keep the page live only if its content remains useful.

Expansion beyond these four pages requires:

- reliable role-level attribution;
- no unresolved routing or payment defects;
- evidence that at least one role has meaningful demand;
- a written content brief showing a distinct user problem;
- a named reviewer and current official sources.

## 7. Detailed acceptance criteria

### Functional

- [ ] Every page returns HTTP 200 in production and local production mode.
- [ ] Every primary CTA opens the correct English editor route.
- [ ] Unauthenticated example use survives login with the exact sample and role source.
- [ ] Authenticated example use creates the correct CV without a login loop.
- [ ] Own-CV upload starts the upload route and retains the parent role attribution.
- [ ] The template and colour shown on the public preview match the editor start.
- [ ] The editor’s full preview, checkout and PDF use the actual saved sample, not a separate page-only approximation.
- [ ] The price is rendered from the shared source and is consistent across page, editor, checkout, and success state.
- [ ] No CTA routes to Agency, Dutch editor, a nonexistent path, or a generic template list unexpectedly.
- [ ] The failure state is visible when CV creation or login return fails.

### Content

- [ ] Each page has a unique role-specific H1, intro, sample, scan checklist, evidence examples, mistakes, FAQs, and source list.
- [ ] Each sample is fictional and visibly labelled near the top.
- [ ] Every fictional metric is clearly presented as example content and accompanied by a replace-with-your-own-evidence instruction.
- [ ] No source is unrelated to the claim it follows.
- [ ] Official work-context links are current and do not become immigration/legal advice.
- [ ] The page answers the role-specific CV question before asking the visitor to use the product.
- [ ] English is natural, consistent, and appropriate for applicants in the Netherlands.
- [ ] There are no unsupported guarantees about ATS systems, hiring, sponsorship, or job outcomes.

### Analytics and privacy

- [ ] Role slug is present on all relevant stages.
- [ ] A paid order is joined to its CV source, not inferred from email alone.
- [ ] Certified reports count unique users and exclude internal/test/Agency activity.
- [ ] Legacy and missing sources are visible as unattributed.
- [ ] No CV text, sample text, filename, email, IP, or user-agent is stored in analytics properties/logs.
- [ ] Public pages and example actions use existing no-third-party-tracking rules.
- [ ] Analytics failures do not block editor creation or payment.

### SEO and accessibility

- [ ] Canonical and sitemap entries are correct.
- [ ] hreflang is emitted only for real equivalent pages.
- [ ] JSON-LD validates and matches visible content.
- [ ] Keyboard users can reach and activate both CTAs.
- [ ] Buttons have visible focus states and accurate busy/disabled states.
- [ ] Headings are hierarchical and unique.
- [ ] Preview text and images have useful accessible names.
- [ ] At 320px, 375px, 768px, and desktop widths there is no horizontal scrolling or clipped CTA.
- [ ] Colour contrast meets the project’s accessibility standard.

### Security and data handling

- [ ] Role slugs are allow-listed server-side.
- [ ] Sample data is not accepted as arbitrary executable input.
- [ ] Login next paths are same-origin and safely encoded.
- [ ] No sample CV is persisted for an unauthenticated visitor.
- [ ] No third-party script is added to the public example pages.
- [ ] Logs contain event names and safe IDs only.

## 8. Required automated and manual tests

Add or update tests before marking the release ready.

### Unit tests

- role-slug validation and source generation;
- legacy-source normalization;
- sample data schema validation;
- rejection of missing role-specific content fields;
- attribution propagation through example, upload, and login paths;
- conversion aggregation and internal/Agency exclusion;
- paid-order-to-CV-source joining;
- JSON-LD generation for all four pages.

### Integration tests

- unauthenticated example CTA → login → sample application;
- authenticated example CTA → CV creation;
- upload-first route with parent role attribution;
- duplicate-click idempotency;
- failed create-CV response with visible recovery;
- no raw input in analytics rows or application logs;
- legacy english_example_page source reported as unattributed;
- paid order joined to the exact CV source;
- Agency CV excluded from consumer report.

### End-to-end tests

Run with fictional accounts and fictional CV data only:

1. Open each public role page on desktop, click the example CTA while signed out, log in, verify the correct sample editor.
2. Repeat while already authenticated.
3. Start with own CV upload from each page and verify the parent role is retained.
4. Edit a sample field, open full preview, and verify the edited content is present.
5. Proceed through the normal one-time checkout test path and verify the paid order is attributed to the CV’s role source.
6. Verify a stale/legacy source is not guessed into a role.
7. Verify internal, test, and Agency fixtures never appear in the public role report.
8. Check all pages at 320, 375, 768, and desktop widths with keyboard navigation.

Run the repository’s normal checks:

- npm run lint;
- npm run build;
- the existing focused analytics/editor tests;
- all new unit/integration/E2E tests;
- git diff --check.

A successful build alone is not an acceptance gate.

## 9. Implementation file guidance

Prefer a small shared implementation with explicit data over page-specific duplication.

Expected areas of change:

- app/en/components/EnglishRoleCvExamplePage.tsx — page layout, preview, content sections, accessibility, structured-data inputs;
- components/cv-examples/EnglishUseExampleButton.tsx — role-specific source propagation, error state, login return;
- a new typed English role-example registry under lib/ or app/en/ — allow-listed role data and source generation;
- the four role page modules under app/en/ — unique metadata, sample data, content, and source lists;
- app/api/create-cv/route.ts and related attribution helpers — validate and persist the role source;
- login/post-login routing code — preserve the safe role-specific next path and pending sample;
- lib/analytics.ts and analytics server/report code — role dimensions and certified aggregation;
- app/sitemap.ts and metadata helpers — canonical/indexing support if required;
- tests adjacent to the changed domain modules;
- a dated implementation report under docs/product/.

Do not edit unrelated pages, global branding, payment prices, Agency authorization, or database records. Do not add a migration unless the existing fields cannot satisfy the source contract; if a migration is genuinely required, make it additive and document rollback compatibility.

## 10. Rollout and rollback

Roll out in two safe releases if necessary:

1. Release the source/analytics contract and logistics-page improvements with the three new pages behind a content registry flag or disabled sitemap entry until QA passes.
2. Publish the three new pages and sitemap links only after routing, content, structured data, mobile, and analytics gates pass.

The old logistics page must remain the rollback target. Removing a new page must not remove existing CV records, alter existing orders, or break old english_example_page sources.

Do not deploy or announce performance claims until:

- production route checks pass;
- payment/download smoke testing passes;
- the role-level report has no data-quality blocker;
- the reviewer has inspected every page on mobile and desktop;
- the implementation report records the commit and test evidence.

## 11. Reviewer checklist

The independent reviewer must answer these questions in writing:

1. Is the page useful if the visitor never uses WerkCV?
2. Is the sample unmistakably fictional and safe to adapt?
3. Does each page answer a distinct role intent rather than a keyword synonym?
4. Can a visitor reach the correct editor after login without losing their sample?
5. Can a paid order be traced to the correct role CV without PII-based guessing?
6. Are the price and no-subscription statements consistent everywhere?
7. Are the official sources relevant, current, and accurately represented?
8. Is the page readable and operable on a 320px phone?
9. Are the analytics denominators and exclusions trustworthy?
10. Is there enough evidence to expand the cluster, or should the team wait?

The reviewer must record defects as blocking, important, or advisory. A page with a broken CTA, misleading fictional claim, incorrect price, missing attribution, or inaccessible mobile layout is not ready for publication.

## 12. Definition of done

This specification is complete only when:

- the logistics page is materially improved and reviewed;
- the three new pages are genuinely distinct and source-checked;
- the role source survives login, editor, preview, checkout, and paid order;
- certified analytics can compare roles without internal/test/Agency contamination;
- all required automated and manual tests pass;
- the pages are indexable with correct canonical/structured data;
- the four-page cluster is deployed with a documented rollback target;
- no unsupported conversion, ranking, ATS, or job-outcome claim is published;
- the team has a scheduled review point before creating any further role pages.

Until these conditions are met, do not describe the cluster as a proven acquisition channel.
