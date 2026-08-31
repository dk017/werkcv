# WerkCV cited-authority conversion bridge implementation specification

Status: Ready for implementation
Audience: Luna Max implementation agent, product reviewer, content/SEO reviewer, analytics reviewer, and release reviewer
Repository: `D:/DKPlayground/werkcv`
Decision date: 2026-08-30

## 0. Non-negotiable instructions for Luna Max

1. Read this specification completely before editing.
2. Inspect every named existing file before deciding an interface. Do not invent an API, component, event, route, field, or test runner that already has an equivalent.
3. Preserve unrelated tracked and untracked work. Never clean, overwrite, stage, or revert files outside this scope.
4. Implement one checkpoint at a time and run its gate before proceeding.
5. When repository reality differs from this document, preserve the required product outcome, document the mismatch, and make the smallest compatible adjustment. Never silently skip the requirement.
6. Reuse current validation, template, attribution, workspace, pricing, analytics, and brand contracts.
7. Use Server Components by default and keep client boundaries minimal.
8. Never weaken authentication, same-origin navigation, consumer/Agency separation, CV schema validation, or analytics exclusions to make a test pass.
9. Review the completed diff as a product designer, content reviewer, privacy reviewer, and release engineer before writing the implementation report.
10. Do not commit, push, deploy, send email, run production outreach, or prune infrastructure without a separate user request.

## 1. Mission

Convert more of WerkCV's existing AI-citation and organic-search authority into completed consumer CV purchases without reducing the usefulness, credibility, indexability, or accessibility of the cited pages.

Build one reusable, intent-aware conversion bridge across five content-intent clusters and six canonical routes:

1. CV skills;
2. CV profile text;
3. an English-language CV;
4. a student CV;
5. an administrative-employee CV example and its companion template page.

The intended journey is:

> Useful answer or example -> contextual next step -> correct editor/template state -> meaningful CV -> full preview -> transparent one-time price -> checkout -> paid PDF.

This is not a generic CTA redesign, new content wave, email-capture funnel, Agency/MatchPack release, or editor rewrite.

## 2. Evidence and correct interpretation

### 2.1 Clarity baseline

The Microsoft Clarity exports reviewed for 2026-06-02 through 2026-08-30 contain:

- 100 cited WerkCV pages with 24,492 page citations in the exported top 100;
- 100 grounding queries with 11,365 citations in the exported top 100;
- 47.8% of exported page citations concentrated in the top ten pages;
- citation-weighted Share of Authority of approximately 24.1%;
- median exported-query Share of Authority of approximately 23.8%.

The two supplied `My cited pages` exports have the same SHA-256 digest. Treat them as duplicate downloads, not separate periods.

| Canonical page | Exported citations |
|---|---:|
| `/vaardigheden-cv-voorbeelden` | 1,566 |
| `/profieltekst-cv-voorbeelden` | 1,376 |
| `/cv-tips/cv-maken-in-het-engels` | 609 |
| `/cv-voorbeelden/studenten-en-starters/student-cv` | 259 |
| `/cv-template-administratief-medewerker` | 80 |
| `/cv-voorbeelden/zakelijk-en-financieel/administratief-medewerker` | 53 |

These routes account for 3,943 exported citations before combining historical `www` duplicates.

| Query | Citations | Share of Authority |
|---|---:|---:|
| `vaardigheden cv` | 277 | 14.95% |
| `vaardigheden cv voorbeelden` | 169 | 29.09% |
| `profieltekst cv` | 79 | 38.35% |
| `cv in het engels` | 184 | 20.20% |
| `cv in engels` | 120 | 30.00% |
| `dutch cv examples` | 90 | 30.82% |
| `cv voorbeeld student` | 111 | 23.22% |
| `professioneel cv voor studenten` | 60 | 44.78% |
| `professioneel cv voor administratief medewerker` | 56 | 66.67% |

These are internal prioritisation figures, not public marketing claims.

### 2.2 Interpretation rules

Clarity page citations are references in supported AI-generated answers. They are not rankings, prominence, visits, leads, or sales. Grounding queries are system-generated retrieval phrases and can differ from the user's prompt. Totals across page/query views need not reconcile.

Never describe:

- a citation as a visitor;
- a grounding query as an exact user prompt;
- Share of Authority as market share;
- citation movement as conversion movement;
- the top-100 export as the complete population.

The product diagnosis is that WerkCV has meaningful informational authority, but comparatively weak commercial and Agency/MatchPack citation presence. This release addresses only the natural consumer-CV conversion path.

Primary methodology references:

- Microsoft Clarity Citation dashboard: https://learn.microsoft.com/en-us/clarity/ai-visibility/ai-citations
- Microsoft Clarity citation reporting explanation: https://clarity.microsoft.com/blog/?p=10205
- Google duplicate/canonical URL guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- WCAG 2.2 focus order guidance: https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html

## 3. Locked decisions and non-goals

1. Preserve the complete useful answer. Show the bridge after meaningful value.
2. Do not gate text, examples, sources, FAQs, templates, or preview behind email.
3. Building, editing, template comparison, and full preview are free. The final PDF uses the current one-time price from `cvDownloadPrice` in `lib/site-content.ts`.
4. Never hardcode the price, currency, or VAT text in component/config copy.
5. CTA labels must accurately describe the destination and resulting state.
6. Skills/profile routes open a blank consumer CV at the relevant section. Never inject generic claims.
7. Student/admin routes may prefill only the existing fully fictional fixtures. Keep a prominent replacement warning.
8. The English-CV route opens the English editor and creates an English-language draft.
9. Preserve source attribution through login, CV creation, editor, preview, checkout, payment, and download.
10. Reuse the existing analytics events and certified consumer funnel. Do not create another database.
11. Do not A/B test v1. Establish a reliable baseline first.
12. No pop-ups, launch modals, countdowns, discounts, scarcity, ratings, testimonials, third-party tracking, or mobile sticky CTA.
13. Do not change price, Agency/MatchPack behaviour, authentication, entitlement, retention, quota, or billing rules.
14. Do not create new landing pages or force conversion blocks onto unrelated calculators/interview pages.

## 4. Repository contracts to preserve

Inspect these files before editing:

- `app/vaardigheden-cv-voorbeelden/page.tsx`
- `app/profieltekst-cv-voorbeelden/page.tsx`
- `app/cv-tips/[slug]/page.tsx`
- `lib/cv-tips/articles/cv-maken-in-het-engels.ts`
- `app/cv-voorbeelden/[category]/[slug]/page.tsx`
- `lib/cv-voorbeelden/examples/studenten-en-starters/student-cv.ts`
- `lib/cv-voorbeelden/examples/zakelijk-en-financieel/administratief-medewerker.ts`
- `app/cv-template-administratief-medewerker/page.tsx`
- `components/cv-voorbeelden/UseExampleButton.tsx`
- `components/cv-voorbeelden/RoleCvPrefillPanel.tsx`
- `components/analytics/TrackedLandingLink.tsx`
- `app/editor/page.tsx`, `app/en/editor/page.tsx`, and `app/editor/editor.tsx`
- `lib/editor-drafts.ts`, `lib/start-source.ts`, and `lib/pending-example-cv.ts`
- `lib/analytics.ts`, `app/api/analytics/route.ts`, `lib/conversion-funnel.ts`, and `lib/admin-analytics.ts`
- `lib/site-content.ts` and `lib/templates/registry.ts`

Known facts:

- `UseExampleButton` already supports authenticated creation and session-stored pending examples through login.
- `/api/create-cv` validates `initialData` with `cvSchema`.
- `RoleCvPrefillPanel` already warns that fictional facts require replacement.
- `startSource` is normalised and stored on `CVDocument`.
- editor anchors include `section-personal` and `section-skills`.
- `TrackedLandingLink` emits `cta_clicked` and `landing_cta_click`.
- `start_cv`, editor, meaningful-content, preview, checkout, paid, and PDF events already exist.
- paid orders/revenue come from `Order`, not event counts.
- certified consumer reporting already excludes owner/test/example-domain and Agency activity.

Extend these mechanisms; do not replace them.

## 5. Route registry

Create `lib/cited-authority-conversion.ts` as a pure registry and URL-builder module.

```ts
export const citedAuthorityIntentIds = [
  "skills", "profile", "english_cv", "student_cv", "admin_cv",
] as const;

export const citedAuthoritySourceIds = [
  "cited_authority_skills",
  "cited_authority_profile",
  "cited_authority_english_cv",
  "cited_authority_student_example",
  "cited_authority_admin_example",
  "cited_authority_admin_template",
] as const;

export type CitedAuthorityRouteConfig = {
  canonicalPath: string;
  intentId: (typeof citedAuthorityIntentIds)[number];
  startSource: (typeof citedAuthoritySourceIds)[number];
  landingLocale: "nl" | "en";
  editorUiLanguage: "nl" | "en";
  resumeLanguage: "nl" | "en";
  destination: "blank_editor" | "fictional_example";
  editorPath: "/editor" | "/en/editor";
  templateId: string;
  focus?: "profile" | "skills";
  placement:
    | "after_first_examples"
    | "after_structure_section"
    | "after_hero"
    | "after_template_comparison";
};
```

Test that canonical paths/source IDs are unique, internal, normalised, and within existing limits; templates resolve through `getTemplateConfig`; only blank routes use `focus`; only the English-CV route uses `/en/editor`; all six landing pages use Dutch copy; the English-CV route alone uses English editor/document language; no route uses `workspace=agency`; and no config contains CV/user text.

### Exact mapping

| Route | Intent/source | Landing/editor/document language | Destination |
|---|---|---|---|
| `/vaardigheden-cv-voorbeelden` | `skills` / `cited_authority_skills` | `nl/nl/nl` | `/editor?template=professional&startSource=cited_authority_skills&focus=skills` |
| `/profieltekst-cv-voorbeelden` | `profile` / `cited_authority_profile` | `nl/nl/nl` | `/editor?template=professional&startSource=cited_authority_profile&focus=profile` |
| `/cv-tips/cv-maken-in-het-engels` | `english_cv` / `cited_authority_english_cv` | `nl/en/en` | `/en/editor?template=professional&startSource=cited_authority_english_cv&focus=profile` |
| `/cv-voorbeelden/studenten-en-starters/student-cv` | `student_cv` / `cited_authority_student_example` | `nl/nl/nl` | existing `studentCv` fixture/template |
| `/cv-voorbeelden/zakelijk-en-financieel/administratief-medewerker` | `admin_cv` / `cited_authority_admin_example` | `nl/nl/nl` | existing `administratiefMedewerker` fixture/template |
| `/cv-template-administratief-medewerker` | `admin_cv` / `cited_authority_admin_template` | `nl/nl/nl` | `administratiefMedewerker.sampleCV`, professional template, registered theme |

The two admin routes share an intent but require separate sources.

## 6. Shared bridge component

Create `components/conversion/CitedAuthorityConversionBridge.tsx`.

It must:

- render page-specific Dutch copy from typed props/config;
- show one primary action and one quiet `/prijzen` link;
- render the current price from `cvDownloadPrice`;
- state free build/full preview, one-time PDF, and no subscription accurately;
- show the fictional-data warning where applicable;
- server-render useful visible copy and links;
- use current `wk-*` brand tokens/classes, not new legacy hard-shadow styling;
- work at 320, 375, 768, 1024, and 1440 widths;
- use a semantic section/heading and 44px touch targets;
- not introduce a fixed/sticky CTA.

Use a minimal client boundary with `IntersectionObserver` to emit one existing `cta_viewed` event after 50% visibility:

- `location`: `cited_authority:<intentId>:main`
- `variant`: `v1`
- `slug`: canonical path without its leading slash
- `locale`: `landingLocale`

Fallback to one view after mount only when `IntersectionObserver` is unavailable. Rendering must never depend on the observer.

For blank routes, reuse `TrackedLandingLink` where possible:

- primary location: `cited_authority:<intentId>:primary`
- primary label: `<startSource>:open_editor`
- price location: `cited_authority:<intentId>:pricing`
- price label: `<startSource>:view_pricing`

The primary click also emits existing `start_cv` with `entryPoint`, `templateId`, `pagePath`, and `uiLanguage=editorUiLanguage`. Do not send profile/skill text, CV data, emails, names, filenames, or raw query strings.

## 7. Safe editor-focus contract

Create `lib/editor-focus.ts`:

```ts
export const editorFocusTargets = ["profile", "skills"] as const;
export type EditorFocusTarget = (typeof editorFocusTargets)[number];
export function normalizeEditorFocus(value: unknown): EditorFocusTarget | null;
export function editorFocusAnchor(target: EditorFocusTarget):
  "section-personal" | "section-skills";
```

Reject arrays, objects, empty/unknown values, control characters, selectors, paths, and URLs.

Update both editor route pages so validated `focus` and normalised `startSource` survive the landing link, `/login?next=...`, draft creation, and redirect to the ID-based editor URL. Store the same source on `CVDocument`. Never allow an arbitrary next host.

In `app/editor/editor.tsx`:

- apply focus once after render;
- scroll to the allowlisted anchor;
- focus `personal.summary` for profile;
- focus the first usable skills control, or skills heading when no input exists;
- avoid stealing focus after user interaction;
- respect reduced motion;
- remove only `focus` from the URL after success, retaining safe parameters;
- never alter CV content.

Show a dismissible, non-PDF context note:

- skills: `Gebruik alleen vaardigheden die bij de vacature passen en die je kunt onderbouwen.`
- profile: `Gebruik het voorbeeld als inspiratie en vervang algemene claims door je eigen ervaring en resultaten.`

## 8. Fictional-example flow

Extend `UseExampleButton` with optional `pagePath` and `uiLanguage` analytics context. Preserve the page-specific source through authenticated API creation, pending-example login flow, and successful editor URL. Preserve attribution and schema validation. Do not log or analyse fixture contents.

Required UX changes:

- expose an accessible Dutch creation error instead of failing silently;
- prevent duplicate requests/double clicks;
- retain the current loading state;
- never create an Agency document from these routes.

Extend `RoleCvPrefillPanel` with required `startSource` and `canonicalPath`; render price through the shared price source; remove its hardcoded generic `role_example_page` source.

Add student and administrative entries to the existing role-conversion registry. Reuse the existing fixtures; do not copy their objects.

Visible warning:

> Dit is fictieve voorbeeldinhoud. Vervang namen, werkgevers, periodes, resultaten, opleidingen, vaardigheden en certificaten door informatie die voor jou klopt voordat je het CV verstuurt.

## 9. Page-by-page instructions

### 9.1 Skills

Route: `/vaardigheden-cv-voorbeelden`

Place the bridge after the first complete role-example group and before the long skills library. Copy:

- eyebrow: `Van voorbeelden naar jouw CV`
- heading: `Zet je gekozen vaardigheden direct op de juiste plek`
- body: explain that the editor opens at skills and that only relevant, truthful, supportable skills belong on the CV
- primary: `Open mijn skillssectie`
- secondary: `Bekijk prijs en werkwijze`

Replace the generic bottom template CTA with a compact repeat. Keep the skills generator as an earlier optional tool, but do not show three competing primary actions together.

### 9.2 Profile text

Route: `/profieltekst-cv-voorbeelden`

Place after the first complete example set and before longer supporting sections. Copy:

- eyebrow: `Van voorbeeld naar eigen profiel`
- heading: `Schrijf je profieltekst terwijl je volledige CV zichtbaar blijft`
- body: explain that the editor opens at profile and generic claims need personal evidence/outcomes
- primary: `Open mijn profielsectie`
- secondary: `Bekijk prijs en werkwijze`

Keep the profile generator optional and never imply its output is automatically true. Replace the generic final template CTA.

### 9.3 English-CV article

Route: `/cv-tips/cv-maken-in-het-engels`

In the shared CV-tip renderer, insert only for slug `cv-maken-in-het-engels`, immediately after section ID `structuur`. Copy:

- eyebrow: `Maak de Engelse versie direct`
- heading: `Open een Engelstalig CV met de juiste sectievolgorde`
- body: English interface/output, free preview, normal one-time PDF price
- primary: `Open Engelse CV-editor`
- secondary: `Bekijk prijs en betaalwijze`

Replace this slug's generic inline/bottom template CTAs; do not stack three large boxes.

Fact-check every numerical/date claim. Remove `63% van de Nederlandse multinationals` and `meer dan 2.400 internationale bedrijven` unless an accessible authoritative source directly supports the exact statement. Only update `updatedAt` after a real visible review. Visible sources and Article JSON-LD citations must agree.

### 9.4 Student example

Route: `/cv-voorbeelden/studenten-en-starters/student-cv`

Use `RoleCvPrefillPanel` directly after the hero. Use `studentCv.sampleCV`, its registered template/theme, and `cited_authority_student_example`.

- heading: `Begin niet met een leeg document: open dit ingevulde student-CV`
- primary: `Open ingevuld student-CV`
- show the full fictional warning and shared price

Give the existing hero example button the same source or visually demote it so two indistinguishable primary actions do not compete.

### 9.5 Administrative example

Route: `/cv-voorbeelden/zakelijk-en-financieel/administratief-medewerker`

Use `RoleCvPrefillPanel` after the hero with `administratiefMedewerker.sampleCV`, its template/theme, and `cited_authority_admin_example`.

- heading: `Open een ingevuld administratief CV en vervang de voorbeeldgegevens`
- primary: `Open ingevuld administratief CV`
- show the complete fictional-data warning and shared price

### 9.6 Administrative template

Route: `/cv-template-administratief-medewerker`

Place after the first template comparison. Use `administratiefMedewerker.sampleCV`, professional template, registered theme, and `cited_authority_admin_template`.

- eyebrow: `Voorbeeldinhoud + template`
- heading: `Bekijk de administratieve opmaak met volledige fictieve inhoud`
- primary: `Open ingevuld admin-CV`
- secondary: `Bekijk prijs en werkwijze`

Replace untracked generic `/editor` actions in the recommended-template and bottom CTA. If a card starts empty, label and track it explicitly as empty.

## 10. Content and AI-citation quality

Improve commercial continuity without degrading why the pages are cited:

1. Preserve each canonical URL and its search intent.
2. Keep the first substantive answer above the principal bridge.
3. Keep one concise visible answer capsule of roughly 40-90 words where the current structure supports it.
4. Use headings that answer real query intent, but never copy malformed/misspelled grounding queries mechanically.
5. Retain useful original examples; do not add shallow keyword variants.
6. Verify every numerical, legal, salary, date, or market-statistic claim using a current authoritative source or remove the precision.
7. Show `Bijgewerkt` only after a genuine content review.
8. FAQ structured data must exactly match visible FAQs.
9. Article/Breadcrumb structured data must use the canonical non-`www` host.
10. Do not add ratings, reviews, offers, SoftwareApplication, or FAQ markup unsupported by visible content.
11. Do not add hidden crawler/AI-only text.
12. Never promise that an AI assistant or search engine will cite the page.

The current `www.werkcv.nl` host redirects to the canonical host with HTTP 308. Preserve that redirect. Historical host variants may be combined only in internal analysis.

## 11. Analytics and reporting

### 11.1 Reuse existing events

Use:

- `page_view`
- `cta_viewed`
- `cta_clicked`
- `landing_cta_click`
- `start_cv`
- `editor_started`
- `cv_meaningful_content_saved`
- `ready_to_download_viewed`
- existing full-preview events
- existing checkout-started/completed events
- `paid` as a diagnostic event
- `pdf_download_completed`

Do not add an event when the same fact already exists.

### 11.2 Admin report

Add a cited-authority funnel to the existing admin analytics data layer and UI. It must accept the existing date-range filter and show each of the six `startSource` values plus an aggregate row.

Required columns:

- canonical landing path;
- intent/source;
- bridge views: distinct `visitorId`;
- bridge clicks: distinct `visitorId`;
- view-to-click rate;
- distinct CV documents created with the source;
- distinct CV users;
- meaningful CV users;
- full-preview users;
- checkout users;
- paid users;
- paid orders;
- revenue from paid `Order` rows;
- paid users / distinct CV users;
- median creation-to-paid time where calculable.

Rules:

- count unique identities appropriate to each stage, never raw event rows;
- paid orders/revenue come from `Order` joined through the actual CV;
- exclude configured owner/test/example-domain accounts;
- exclude `sourceLabel=codex_test`;
- exclude Agency documents and Agency/MatchPack orders;
- retain Dutch/English and mobile/desktop diagnostic dimensions;
- display `—`, not `0%`, when the denominator is zero;
- label event-dependent preview metrics diagnostic until the certified funnel considers them reliable;
- never query/display CV text, email, name, or filename.

### 11.3 Baseline and evaluation

Before activation, save a dated internal baseline for all six routes:

- unique landing visitors;
- attributable CV starts;
- meaningful CV users;
- preview users;
- checkout users;
- paid users/orders;
- route-to-paid rate;
- traffic source and device split.

Review after seven days for functional failures. Evaluate commercial impact only after 28 complete days.

Primary metric:

> Paid consumer users divided by distinct attributable CV users, by source and in aggregate.

Diagnostic metrics:

- bridge view-to-click;
- click-to-CV creation;
- CV creation-to-meaningful;
- meaningful-to-preview;
- preview-to-checkout;
- checkout-to-paid;
- median time to paid;
- paid orders by AI/organic/direct attribution.

Guardrails:

- no increase in route errors;
- no horizontal overflow;
- no material performance degradation;
- no unexplained canonical/indexing change;
- no source loss through login;
- no paid order detached from the correct CV;
- monitor citation direction without claiming causality.

Do not publish an uplift claim without a defined comparison window, adequate sample, and limitations.

## 12. Accessibility, UX, performance, and privacy

The bridge and focus behaviour must:

- meet WCAG AA contrast;
- expose 44-by-44 CSS-pixel touch targets;
- use a logical heading level;
- keep keyboard focus visible;
- announce loading/errors to assistive technology;
- avoid hydration layout shift;
- wrap at 320px using `min-width: 0` where needed;
- add no new font, remote image, large dependency, autoplay, or scroll hijacking;
- respect reduced motion;
- feel like a helpful continuation, not an inserted advertisement.

Security/privacy:

- no database migration is required;
- do not persist article selections outside the CV;
- do not log/send CV text, fixture text, name, email, filename, or free-form profile/skills content;
- validate focus, template, source, internal destinations, and pending fixture data;
- preserve same-origin login-return validation;
- never read a destination from an unvalidated URL parameter;
- no third-party pixels, ads, replay, or marketing SDKs;
- never imply an example proves a skill or experience.

## 13. Required automated tests

Add focused tests using the existing Node/TypeScript convention and a script such as `test:cited-authority-conversion`.

### 13.1 Pure contracts

Test:

- all six configs parse;
- paths/source IDs are unique and valid;
- template IDs resolve;
- destinations are internal and locale-correct;
- query construction preserves template/source/focus exactly once;
- no `workspace=agency` is produced;
- focus accepts only `profile` and `skills`;
- malformed values/arrays are rejected;
- price copy derives from `cvDownloadPrice`;
- no copy describes the paid PDF as free;
- analytics labels fit existing limits and contain no content.

### 13.2 Component behaviour

Test or verify using the available component approach:

- useful copy/links render without JS-only state;
- view tracking fires once;
- primary/pricing labels are correct;
- keyboard activation works;
- loading prevents duplicate example creation;
- API failure shows accessible Dutch feedback;
- no fixed/sticky element is rendered.

### 13.3 Login and creation integration

For each blank source:

1. logged-out click goes to `/login`;
2. `next` contains only the correct internal path;
3. login returns correctly;
4. one consumer CV is created;
5. source/template are correct;
6. focus applies and is cleaned;
7. no generic content is injected.

For each fictional source:

1. authenticated creation stores correct fixture/source;
2. logged-out flow stores pending data safely;
3. login applies it once;
4. refresh creates no duplicate;
5. result remains consumer-owned;
6. fixture content never appears in logs/analytics.

### 13.4 Funnel fixtures

Cover repeated events, two CVs per visitor, returning sessions, meaningful/non-meaningful CVs, abandoned checkout, paid orders with/without redundant paid events, owner/test/example accounts, Agency documents, and zero denominators. Assert unique counts, revenue, exclusions, rates, and `—` behaviour.

## 14. Manual and visual verification

Verify each route at 320, 375, 768, 1024, and 1440 CSS pixels:

- `/vaardigheden-cv-voorbeelden`
- `/profieltekst-cv-voorbeelden`
- `/cv-tips/cv-maken-in-het-engels`
- `/cv-voorbeelden/studenten-en-starters/student-cv`
- `/cv-voorbeelden/zakelijk-en-financieel/administratief-medewerker`
- `/cv-template-administratief-medewerker`

For every route verify:

- useful value appears before the bridge;
- only one dominant contextual CTA appears in the relevant section;
- label and destination agree;
- price/no-subscription copy is accurate;
- no horizontal overflow;
- header/footer/navigation remain usable;
- canonical and structured data remain correct;
- keyboard order and focus are logical;
- blank-editor links remain navigable without client JavaScript.

Run the complete logged-out and logged-in flows for all six sources. For fixtures, inspect editor and final preview to confirm fictional content is complete, replaceable, and clearly distinguished from user data.

Use test attribution for production-compatible analytics checks and verify its exclusion from consumer reporting.

## 15. Sequenced build checkpoints

Luna Max must implement one checkpoint at a time. At each checkpoint:

1. inspect the named existing code;
2. make the smallest coherent change;
3. run its focused tests, typecheck, and focused lint;
4. review the diff for scope creep and content/PII leaks;
5. fix findings before advancing.

Do not defer required behaviour to a later unspecified task.

### Checkpoint 1 — Pure contracts

- add route registry;
- add editor-focus normaliser;
- add href builders;
- add contract tests.

Exit: pure tests, typecheck, and focused lint pass.

### Checkpoint 2 — Shared component

- add the bridge and visibility tracking;
- use current brand system;
- verify accessibility and 320px layout.

Exit: component states and tracked labels are correct.

### Checkpoint 3 — Skills and profile

- integrate one route at a time;
- implement focus preservation through login;
- reconcile existing generic CTAs.

Exit: both blank-editor journeys pass logged-out/logged-in tests and inject no content.

### Checkpoint 4 — English-CV article

- add slug-specific placement;
- route to English editor;
- complete factual/source review;
- remove unsupported precision;
- reconcile generic CTAs and JSON-LD.

Exit: English output, price, login return, visible sources, and schema pass.

### Checkpoint 5 — Fictional examples

- extend example-button/prefill contracts;
- add student/admin mappings;
- integrate admin template;
- verify pending login, retry, and duplicate prevention.

Exit: all three sources create the correct consumer CV exactly once.

### Checkpoint 6 — Reporting

- add admin contract/UI;
- add deterministic funnel fixtures;
- record the pre-release baseline.

Exit: counts reconcile to events/CVs/orders and every exclusion passes.

### Checkpoint 7 — Full certification

Run:

- focused conversion test script;
- TypeScript typecheck;
- focused ESLint for all changed files;
- production build;
- existing consumer funnel tests;
- route/status/canonical checks;
- logged-out/logged-in browser flows;
- mobile/desktop visual checks;
- authorised checkout-return and paid-PDF smoke test when the environment supports it.

Do not send email, generate recovery outreach, change production configuration, commit, push, deploy, or prune Docker resources unless the user separately requests it.

## 16. Release and rollback

This release requires no Prisma migration. Keep it isolated in one focused commit after all gates pass.

Before deployment:

- ensure `main` has not advanced unexpectedly;
- preserve unrelated dirty/untracked work;
- stage only specification-scoped files;
- record the baseline before the new component goes live;
- confirm the current consumer price remains unchanged.

After deployment:

- verify the production build ID;
- verify all six routes return 200;
- verify canonical non-`www` URLs;
- perform one logged-out journey and one authorised logged-in journey for each flow type;
- verify analytics receives safe metadata only;
- verify admin reporting excludes the test run;
- monitor application errors for seven days.

Rollback means reverting the complete feature commit. Do not leave editor-focus parsing or partial CTA mappings active if the component/report is rolled back.

## 17. Required implementation report

Create:

`docs/product/werkcv-cited-authority-conversion-bridge-implementation-report.md`

It must record:

- every changed file and why;
- final route/source mapping;
- screenshots or viewport results for all six routes;
- logged-out and login-return results;
- example-prefill and duplicate-prevention results;
- editor-focus results;
- safe analytics event examples;
- funnel reconciliation and exclusions;
- content claims removed, retained, or rewritten, with sources;
- canonical and structured-data verification;
- exact test/typecheck/lint/build commands and outcomes;
- known limitations;
- deployment status;
- scheduled 7-day functional and 28-day commercial review dates.

Do not write `production ready` unless every required gate has passed. Do not represent an untested checkout or disabled report as certified.

## 18. Definition of done

Complete only when:

- five intent clusters/six routes use the exact mapping;
- useful content precedes the bridge;
- blank routes preserve source/focus through login;
- the English route creates an English draft;
- fictional examples are labelled and applied once;
- all price copy uses the shared price source;
- competing generic CTAs are reconciled rather than stacked;
- downstream CV, checkout, order, and PDF remain attributable;
- reporting uses unique identities and `Order` as revenue truth;
- owner/test/example-domain and Agency activity are excluded;
- no CV content or PII enters analytics/logs;
- mobile, keyboard, focus, canonical, schema, test, typecheck, lint, and build checks pass;
- the implementation report truthfully records certification.

The desired outcome is not clicks at any cost. It is a clearer, measurable path from trusted WerkCV guidance to a useful CV that the visitor understands, previews, and chooses to purchase without subscription confusion.
