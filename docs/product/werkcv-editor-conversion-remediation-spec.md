# WerkCV editor conversion remediation specification

Status: Ready for implementation
Audience: Luna Max implementation agent and independent reviewer
Scope: Consumer CV editor, section ordering, live and final preview, meaningful-completion measurement, abandonment-feedback eligibility, and entry-route regression protection
Repository: D:/DKPlayground/werkcv

## 1. Mission

Make the editor form, live React preview, exact PDF preview, downloaded PDF, conversion analytics, and abandonment-feedback logic tell the same truth.

The first implementation passed TypeScript, targeted lint, focused tests, and the production build but still contained behavioral contradictions. Luna Max must fix the shared architecture and prove the behavior. It must not add another layer of local patches.

## 2. Mandatory execution rules

Read this entire specification before editing.

1. Read AGENTS.md and every file listed in Section 6 before changing production code.
2. Work one numbered phase at a time. Run its tests and review its diff before proceeding.
3. Preserve unrelated user changes and untracked files.
4. Use additive, backward-compatible database changes only.
5. Do not run a production migration, send email, commit, push, or deploy. Those actions require separate explicit authorization.
6. Use fictional CV data only in fixtures, screenshots, and database tests.
7. Do not redesign templates or branding. Preserve visual identity except where separating Skills and Languages is necessary for truthful ordering.
8. Do not use CSS order, cloned DOM, broad compatibility CSS, or duplicated order lists to conceal renderer differences.
9. Do not maintain a TypeScript meaningful-content definition and a separate handwritten SQL approximation.
10. A successful build is not proof of correct behavior.
11. Do not mark a phase complete when a required test is missing, skipped, or replaced by a smoke test.
12. If current code contradicts this specification, follow this specification and record the contradiction.
13. If an undefined decision would materially change behavior, stop and record the ambiguity instead of guessing.

After each phase:

- run the phase-specific checks;
- run git diff --check;
- inspect changed code for duplicated logic and unrelated edits;
- record evidence in the implementation report;
- proceed only when the exit gate passes.

## 3. Verified defects that must be fixed

1. sectionOrder is saved, but React preview templates render body sections in hard-coded order.
2. The Professional PDF combines Skills and Languages under the Skills position, so Languages cannot be moved independently.
3. Two-column templates show one apparently global order control even though main and sidebar are independently ordered.
4. Properties, References, Side activities, and Custom sections are outside the ordering contract and are appended at the end.
5. React preview templates do not render those four additional section families at all, while PDF output does.
6. The standalone feedback script treats any non-empty JSON array as meaningful, including blank placeholder objects.
7. cv_meaningful_content_saved is emitted in the browser and deduplicated only in sessionStorage. It can repeat in another session or be marked locally when delivery failed.
8. The mobile live-preview overlay has dialog semantics but does not move focus, contain focus, or restore focus.
9. Fictional blank-CV content is not labelled as example content on desktop. Current blank checks ignore valid fields and optional sections.
10. Exact PDF preview silently falls back to approximate React preview after an endpoint failure while still presenting itself as final PDF output.

Fix the root causes, not only these examples.

## 4. Locked product decisions

### 4.1 Fixed content

The following remain fixed and are not reorderable:

- personal and contact header;
- name and professional title;
- photo;
- profile summary;
- editor-only controls such as Add section and Final check.

### 4.2 Canonical body sections

The canonical ordering contract contains exactly these twelve IDs:

- experience
- education
- internships
- courses
- awards
- skills
- languages
- interests
- properties
- references
- sideActivities
- customSections

customSections is one movable group. Individual custom-section and item ordering remains controlled by its arrays.

### 4.3 Single-column templates

Every registry entry whose layout is single-column, including ATS, shows one ordered list.

Every visible body section follows that list in:

- editor form cards;
- live React preview;
- exact PDF preview;
- downloaded PDF.

Skills and Languages are separate sections. They must never share one positionable block.

### 4.4 Two-column templates

Every registry entry with two-column-left or two-column-right preserves designed column placement.

Sidebar sections:

- skills
- languages
- interests

Main-column sections:

- experience
- education
- internships
- courses
- awards
- properties
- references
- sideActivities
- customSections

The editor shows two labelled lists:

- Hoofdkolom / Main column
- Zijkolom / Sidebar

Users can move sections only within their current column. This release does not allow movement between columns. The UI must not imply that a sidebar section can be placed above a main-column section.

Keep one persisted sectionOrder array. The resolver filters it into main and sidebar sequences while preserving relative order. Do not add per-template order state.

### 4.5 Optional sections

Core cards retain existing editor visibility behavior. Optional cards appear when enabled or when saved content exists.

Presence is based on substantive trimmed content, not array length. A placeholder object containing only blank strings is empty.

An optional section with saved content must not disappear because a local visibility toggle was not initialized.

### 4.6 Preview promises

Live preview means immediate React rendering.

Final PDF preview means pages rendered through the same PDF generator used for download.

Never call React preview exact. Never silently substitute it when final PDF rendering fails.

### 4.7 Meaningful completion

A CV becomes meaningfully started when it has at least one of:

- a profile summary with at least 40 trimmed characters;
- a substantive Experience entry;
- a substantive Education entry;
- a named Skill;
- a named Language;
- substantive Internships, Courses, Awards, Interests, Properties, References, Side activities, or Custom sections.

Name, title, email, phone, location, links, photo, and other identity or contact fields alone are not meaningful completion.

Once a persisted authenticated CV becomes meaningful, that durable state never reverts. meaningfulContentAt records the first successful meaningful save.

## 5. Goals and non-goals

### Goals

1. One domain contract controls editor cards, React preview, and PDF export.
2. Every supported non-empty body section appears exactly once in both renderers.
3. Single-column ordering is fully truthful.
4. Two-column ordering is lane-specific and clearly explained.
5. Exact preview either shows generated PDF pages or an explicit recoverable error.
6. Blank previews are useful, fictional, clearly labelled, and never persisted.
7. Meaningful content is classified once through a shared pure function.
8. The first persisted meaningful transition creates exactly one server-side event per CV.
9. Both feedback scripts use durable meaningful state.
10. Mobile preview meets modal-dialog focus and keyboard requirements.
11. Existing template-first and upload-first routes remain correct in Dutch and English.

### Non-goals

- no direct editing inside preview;
- no drag-and-drop; accessible Up and Down controls are sufficient;
- no arbitrary column assignment;
- no change to readiness, price, payment, Agency routing, or retention;
- no template redesign;
- no new analytics vendor;
- no feedback-email delivery;
- no production backfill;
- no MatchPack feature expansion.

## 6. Required code inspection

Inspect at least:

- app/editor/editor.tsx
- app/editor/preview.tsx
- app/editor/ScaledCvPreview.tsx
- app/editor/FullCvPreviewDialog.tsx
- app/editor/PdfPagedPreview.tsx
- app/editor/TemplateSelector.tsx
- app/editor/SectionOrderPanel.tsx
- every production file matching app/editor/templates/*Template.tsx
- app/api/pdf-preview/route.ts
- app/actions.ts, especially updateCV
- lib/cv.ts
- lib/cv-sections.ts
- lib/cv-meaningful.ts
- lib/pdf.ts
- lib/templates/registry.ts
- lib/workspace/cv-document-service.ts
- prisma/schema.prisma
- existing migrations under prisma/migrations
- scripts/followups-scan.ts
- scripts/followups-signup-feedback.mjs
- existing CV, PDF, preview, and follow-up tests

Search for every occurrence of:

- cVDocument.create
- cVDocument.update
- cVDocument.updateMany
- createEditorDraft
- updateCV

Before persistence changes, produce a write-path inventory identifying which consumer paths can initially save meaningful data. Include that inventory in the final report.

## 7. Target architecture

### 7.1 Canonical section domain

Make lib/cv-sections.ts the only source of truth for section identity and layout.

It must export equivalents of:

- CV_BODY_SECTION_IDS
- CvBodySectionId
- DEFAULT_CV_SECTION_ORDER
- normalizeCvSectionOrder
- getCvSectionLabel
- cvSectionHasSubstantiveContent
- getEditorVisibleSectionIds
- resolveCvSectionLayout
- moveSectionWithinLane

Required layout result:

    type ResolvedCvSectionLayout =
      | {
          mode: "single-column";
          ordered: CvBodySectionId[];
          main: CvBodySectionId[];
          sidebar: [];
        }
      | {
          mode: "two-column";
          ordered: CvBodySectionId[];
          main: CvBodySectionId[];
          sidebar: CvBodySectionId[];
        };

Rules:

- obtain layout from lib/templates/registry.ts;
- do not reproduce template ID lists elsewhere;
- ATS resolves as single-column;
- normalize missing, partial, duplicate, invalid, and legacy eight-ID arrays;
- preserve each valid known ID exactly once;
- append newly introduced IDs in the locked default order;
- filter visibility only after normalization;
- do not import React, Prisma, or PDF code into this module.

### 7.2 CV schema compatibility

Extend the sectionOrder Zod enum and default in lib/cv.ts to all twelve IDs.

Existing data with no order or the original eight IDs must parse and normalize deterministically.

Do not change sectionOrder from an array into an object. Do not rewrite all stored CV JSON during normal requests.

### 7.3 Shared renderer contract

Every rendered body-section wrapper must expose a nonvisual marker:

    data-cv-section="experience"

Use the corresponding ID. customSections has one outer marker and may have per-item index markers.

The marker supports deterministic parity tests. No production renderer may hard-code a complete body-section sequence after this work.

### 7.4 React renderer

Create a small shared ordering helper under app/editor/templates, such as section-layout.tsx. It can accept a resolved ID list and a map of React nodes. It must not own styling.

Update all thirteen templates:

- Professional
- Classical
- Formal
- Modern
- Dynamic
- JobBoss
- Elegant
- Remarkable
- Sepia
- Simple
- Robust
- Monochrome
- ATS

Each template must:

1. build its own styled section blocks;
2. include all twelve supported section families;
3. order blocks from the shared resolver;
4. render main and sidebar into the correct containers;
5. omit genuinely empty blocks;
6. render each non-empty section exactly once.

Properties, References, Side activities, and Custom sections are currently missing from React templates and must be added.

Do not wrap Skills, Languages, and Interests in one positionable block. Shared visual containers are permitted only when independent ordering remains truthful.

### 7.5 PDF renderer

Refactor lib/pdf.ts to consume the same resolver.

Replace the concatenated additional-section function with individual entries in a section-block map.

Requirements:

- separate Skills HTML and Languages HTML;
- separate Properties, References, Side activities, and Custom sections;
- single-column output renders resolved.main in order;
- two-column output renders resolved.main and resolved.sidebar independently;
- missing blocks are skipped without affecting others;
- every outer section has data-cv-section;
- preserve escaping, linkification, localization, and safe rendering;
- remove the combined-row workaround and its comments.

### 7.6 Editor order panel

SectionOrderPanel receives resolved layout rather than a misleading flat list.

Single-column behavior:

- one list;
- copy states that preview and PDF use this order;
- Up and Down work across all visible body sections.

Two-column behavior:

- separate Main column and Sidebar lists;
- copy states that placement is fixed but order inside each column is adjustable;
- Up and Down work within the relevant list;
- no cross-column controls;
- do not show an empty list.

moveSectionWithinLane must be a tested pure helper. Moving visible sections must not unpredictably reorder hidden sections.

## 8. Implementation phases

### Phase 0: Baseline and failing regression evidence

Before production edits:

1. Record git status --short.
2. Run current focused tests, targeted ESLint, npx tsc --noEmit, and npm run build.
3. Add failing deterministic tests proving:
   - Professional React preview ignores Education-before-Experience;
   - Professional PDF ignores Languages-before-Education;
   - React preview omits an additional section;
   - a blank placeholder differs between the TypeScript helper and SQL approximation.
4. Document the mobile focus defect if no component browser runner exists.

Do not alter production behavior until deterministic regression tests fail for the expected reason.

Exit gate: baseline results and failing evidence are recorded.

### Phase 1: Shared section domain

Implement Sections 7.1 and 7.2.

Required unit cases:

- missing legacy order;
- original eight-ID order;
- partial order;
- duplicates;
- invalid IDs;
- all twelve IDs exactly once;
- substantive and blank content for every section family;
- single-column resolution;
- two-column-left resolution;
- two-column-right resolution;
- ATS resolution;
- lane-local movement at first, middle, and last positions;
- hidden optional-section stability.

Exit gate: pure domain tests pass without renderer imports.

### Phase 2: PDF truth

Implement Section 7.5 first.

Create one fictional fixture with a unique marker for every body section.

Tests must prove:

1. Every single-column template includes every marker exactly once in requested order.
2. Skills and Languages independently appear before, between, and after Education and Experience.
3. Every additional section can appear between core sections.
4. Every two-column template follows main order and sidebar order.
5. No test assumes cross-column visual order.
6. Blank placeholder sections produce no heading.
7. Legacy data exports in default order.
8. Every section has the correct data marker.

A smoke test that only finds the candidate name is insufficient.

Exit gate: the Languages-before-Education reproduction passes for Professional and ATS, and all layout cases pass.

### Phase 3: React live-preview truth

Implement Sections 7.3 and 7.4.

Use react-dom/server static rendering for deterministic tests.

For every template prove:

- every supported non-empty section appears exactly once;
- single-column order matches the resolver;
- two-column main and sidebar match the resolver;
- all four additional section families appear;
- Skills and Languages move independently in single-column templates;
- blank placeholders do not appear;
- React and PDF expose the same section-ID sequence per lane.

Then render one-page and two-page artifacts for all thirteen templates. Inspect spacing, headings, overflow, page breaks, and duplicate sections.

Exit gate: no React template contains a hard-coded full body-section order and cross-renderer sequence tests pass.

### Phase 4: Editor ordering UX

Connect editor cards and SectionOrderPanel to the resolver.

Requirements:

- editor cards follow resolved order;
- enabled additional-section cards participate;
- Add section remains an editor control;
- template changes immediately switch one-list and two-list modes;
- template changes never delete canonical order;
- movement marks the form dirty and uses current autosave;
- content is never lost or duplicated;
- guided-build behavior remains unchanged until the full workspace is revealed.

Add tests for movement and one browser case that reorders at least three sections, reloads, and confirms persistence.

Exit gate: form cards, live preview, exact preview, and PDF use the same saved order.

### Phase 5: True blank detection and example labelling

Create one pure helper such as lib/cv-empty.ts.

It must inspect:

- every personal field, including title, location, links, and photo;
- all twelve section families;
- nested highlights and custom items;
- trimmed content rather than array length.

Use it in editor.tsx and TemplateSelector.tsx. Remove duplicated partial checks.

Behavior:

- only a completely blank CV uses fictional data;
- desktop and mobile show Voorbeeldinhoud or Example content outside the page;
- the badge is never exported;
- any real field or section immediately replaces fictional data with user data;
- fictional content is never persisted or included in analytics or download;
- assistive copy explains that example content will be replaced.

Performance:

- do not mount the hidden desktop preview on mobile;
- mount the mobile renderer only while its dialog is open;
- avoid multiple expensive preview trees for one viewport.

Test blank, identity-only, optional-only, highlight-only, custom-item-only, and photo-only states.

Exit gate: sample-truth and performance contracts pass.

### Phase 6: Accessible mobile preview

Extract the bespoke overlay to app/editor/LiveCvPreviewDialog.tsx.

Use native dialog with showModal unless a documented repository constraint prevents it. Otherwise implement the complete modal pattern.

Required behavior:

- labelled title;
- modal semantics;
- initial focus inside;
- Tab and Shift+Tab containment;
- Escape close;
- focus restoration to the exact trigger;
- inert, non-scrolling background;
- close target at least 44 by 44 CSS pixels;
- safe-area support;
- no horizontal page-level scrollbar at 320px and 375px;
- reduced-motion support;
- example badge when relevant.

Reuse FullCvPreviewDialog focus handling instead of creating a third pattern.

Exit gate: keyboard and mobile viewport tests pass.

### Phase 7: Exact PDF preview failure honesty

PdfPagedPreview and FullCvPreviewDialog must expose loading, ready, and recoverable error states.

On error:

- never render ScaledCvPreview inside the exact workspace;
- state that exact PDF preview could not be prepared;
- offer Retry;
- offer Return to live preview or Back to editor;
- preserve CV data, template, and theme;
- prevent automatic retry loops;
- log error category and HTTP status only, never CV content;
- disable Download when current data cannot be safely saved or verified.

Abort obsolete requests when input or dialog state changes. Preserve authentication, ownership checks, validation, and private no-store caching.

Exit gate: forced endpoint failure shows the error and never approximate output.

### Phase 8: Durable meaningful-content state

Add backward-compatible Prisma fields:

    CVDocument:
      hasMeaningfulContent Boolean default false
      meaningfulContentAt DateTime optional
      meaningfulContentSignals Json optional

    AnalyticsEvent:
      dedupeKey String optional unique

Create an additive migration. Do not use db push as the release migration.

meaningfulContentSignals contains bounded booleans only:

- profileSummary
- experience
- education
- skills
- languages
- otherSections

Never store names, contact details, titles, employers, schools, filenames, or CV text.

Correct lib/cv-meaningful.ts:

- profileSummary is true only for a qualifying summary;
- identity and contact fields never set it;
- the 40-character threshold has one exported constant;
- nested content is checked for every section family;
- the helper remains deterministic and side-effect free.

Create a server service such as lib/cv-meaningful-persistence.ts.

It must:

1. receive validated CV data and a bounded source;
2. classify the data;
3. persist CV data;
4. atomically set first-transition fields;
5. create one AnalyticsEvent using dedupeKey cv_meaningful_content_saved plus CV ID;
6. tolerate concurrent saves;
7. never revert durable meaningful state;
8. never store CV content in analytics.

Allowed source values:

- manual_save
- auto_save
- upload
- download
- public_claim
- import
- initial_create

Use a Prisma transaction and unique dedupe key. Do not use an unprotected read-then-create sequence.

Required concurrency algorithm:

1. Save the validated CV JSON inside the transaction.
2. When the classifier is false, do not touch durable meaningful fields.
3. When the classifier is true, run a conditional updateMany scoped to the authorized CV ID and hasMeaningfulContent false.
4. Only when the conditional update count is one, set meaningfulContentAt, bounded signals, and create or upsert the deduplicated event.
5. When the count is zero, treat the meaningful transition as already recorded and do not create another event.
6. Keep the CV data save successful when the event already exists for the same dedupe key.

New internal event properties are versioned and content-free:

    {
      schemaVersion: 2,
      source: one of the allowed values,
      completionScore: bounded number,
      signalCount: bounded number,
      contentSignals: bounded boolean object,
      locale: "nl" or "en"
    }

Update the TypeScript analytics contract, server persistence code, and internal reporting queries for schemaVersion 2. Historical version-1 events remain readable. Do not backfill or rewrite historical analytics. Do not send the server-only event to GA4 through a browser replay.

Remove browser emission and sessionStorage dedupe for persisted cv_meaningful_content_saved. Anonymous public drafts do not emit this durable event. Their claimed CV uses public_claim.

Create a dry-run-first backfill script:

- cursor-batched consumer CV scan;
- shared TypeScript classifier;
- dry-run by default;
- reports counts only;
- execute mode updates durable flags and bounded signals;
- creates no historical events;
- does not change CV JSON, ownership, template, or billing;
- documents updatedAt behavior before execution;
- excludes Agency CVs using agencySubscriptionId null unless the write-path inventory establishes another rule;
- prints no CV content or email.

Do not run the backfill against production.

Exit gate: additive migration rehearsal, idempotency, and concurrency tests pass on disposable PostgreSQL.

### Phase 9: Follow-up eligibility

Update both follow-up scripts to query persisted hasMeaningfulContent. Delete the manual JSON and SQL approximation.

A user is eligible only when every owned consumer CV remains false after the configured delay.

Preserve internal and test exclusions, prior-reply checks, already-sent checks, and dry-run behavior.

Apply eligibility before LIMIT. Repeated runs must reach older eligible users rather than repeatedly filling the limit with newer ineligible records.

Required tests or disposable scenarios:

- no CV;
- blank auto-created CV;
- placeholder-only CV;
- meaningful CV;
- multiple blank plus one meaningful CV;
- meaningful CV later emptied;
- already contacted user;
- recent inbound reply;
- more recent ineligible users than query limit plus one older eligible user.

Both scripts must select identical users. Tests must not send email.

Exit gate: selection parity and limit behavior pass.

### Phase 10: Entry-route regression protection

Do not redesign template-first or upload-first flow.

Template-first must preserve:

- authenticated creation with selected template;
- login return to selected template;
- start-source attribution;
- consumer workspace without Agency retention rules.

Upload-first must preserve:

- Dutch and English editor upload query through login;
- one consumer draft;
- uploader opens once;
- parsed data remains in chosen template;
- cancellation returns to editable blank CV;
- refresh and login return do not duplicate CV.

Exit gate: both locale paths pass browser regression coverage.

## 9. Data-flow contracts

### 9.1 Saved CV

    form data
      -> server cvSchema validation
      -> consumer authorization
      -> shared meaningful classifier
      -> transactional CV update
      -> first-transition state and idempotent analytics
      -> success response
      -> client saved state

The browser can render optimistically but cannot claim a durable meaningful save before server success.

### 9.2 Preview and export

    CV data plus template ID
      -> normalize section order
      -> resolve layout
      -> editor cards and React section blocks

    same normalized data and template ID
      -> same resolver
      -> PDF section blocks
      -> generated PDF
      -> exact preview images and download

Styling implementations may differ. Presence, lane, and order may not.

### 9.3 Feedback

    persisted hasMeaningfulContent
      -> database eligibility before limit
      -> existing safety exclusions
      -> dry-run report or separately authorized delivery

After activation, feedback scripts do not reclassify raw CV JSON.

## 10. Test and release gates

### 10.1 Deterministic tests

Required or equivalent:

- lib/cv-sections.test.ts
- lib/cv-meaningful.test.ts
- lib/cv-empty.test.ts
- lib/pdf-section-order.test.ts
- app/editor/templates/section-layout.test.tsx

Assert exact section-ID sequences, never only candidate-name presence.

### 10.2 Database integration

On disposable PostgreSQL test:

- migration from current schema;
- backfill dry-run and execute;
- blank save;
- first meaningful save;
- repeated save;
- concurrent save;
- event uniqueness;
- follow-up parity;
- query-limit behavior.

### 10.3 Browser scenarios

1. Blank Dutch CV shows labelled fictional content.
2. Optional-only content removes fictional preview.
3. Professional Education-before-Experience agrees everywhere.
4. Professional and ATS Languages-before-Education agree everywhere.
5. References and Side activities appear and reorder.
6. A two-column template shows separate lane controls.
7. Lane order persists after reload.
8. Exact-preview failure shows Retry and no approximate fallback.
9. Mobile 320px and 375px focus entry, containment, Escape, and restoration pass.
10. Dutch and English template-first and upload-first paths pass.

### 10.4 Visual review

Render one-page and two-page fictional fixtures for all thirteen templates.

Inspect:

- missing and duplicate sections;
- order and column placement;
- Skills and Languages;
- additional sections;
- page breaks;
- long references and links;
- 320px and 375px containment;
- example labelling;
- exact-preview error.

Keep large artifacts out of source control unless existing repository policy says otherwise.

### 10.5 Required command gate

Run and record:

- targeted Node or tsx tests;
- disposable database integration tests;
- targeted ESLint for every changed source file;
- npx tsc --noEmit;
- git diff --check;
- npm run build.

Full repository lint contains unrelated legacy failures. Do not hide them and do not modify unrelated files. Record targeted and full-lint results separately.

Record the known dynamic-font warning if it still occurs even when build exits successfully.

## 11. Forbidden shortcuts

The work is incorrect if it:

- sorts editor cards but leaves React templates hard-coded;
- fixes only Professional;
- smoke-tests templates by finding a candidate name;
- combines Skills and Languages while exposing two controls;
- describes two-column order as global;
- appends additional sections outside the resolver;
- uses CSS order to hide a mismatch;
- uses array length as meaningful evidence;
- duplicates classification in SQL;
- relies on sessionStorage for durable conversion truth;
- writes analytics outside a successful transaction;
- uses non-unique event dedupe;
- shows unlabelled fictional content;
- silently falls back from exact PDF to React;
- updates Dutch but not English;
- sends feedback email;
- changes payment, Agency routing, or retention;
- commits, pushes, or deploys.

## 12. Acceptance matrix

The implementation report must reproduce this table and fill Evidence.

| Gate | Pass condition | Evidence |
|---|---|---|
| Canonical IDs | All twelve normalize exactly once | |
| Legacy compatibility | Missing and eight-ID orders normalize | |
| Single-column editor | One truthful ordered list | |
| Two-column editor | Separate lane-local lists | |
| React order | All thirteen templates use resolver | |
| PDF order | All thirteen templates use resolver | |
| Skills and Languages | Independently movable in single column | |
| Additional sections | Present exactly once and reorderable | |
| Renderer parity | React and PDF sequences agree per lane | |
| Blank preview | Fictional content only when truly blank and labelled | |
| Mobile modal | Focus, Tab, Escape, and restoration pass | |
| Exact failure | Explicit Retry and no approximate fallback | |
| Classifier | Blank placeholders fail and substance passes | |
| Durable state | First transition persists once and never reverts | |
| Analytics | One content-free event per CV | |
| Concurrency | Concurrent saves cannot duplicate event | |
| Backfill | Dry-run and disposable execute agree | |
| Follow-up | Both scripts select the same users | |
| Query limit | Older eligible users are not starved | |
| Template-first | Intent survives authentication | |
| Upload-first | Dutch and English open uploader once | |
| Responsive | 320, 375, 768, and desktop reviewed | |
| Privacy | No CV content in analytics or logs | |
| Static checks | Targeted lint, TypeScript, and diff pass | |
| Build | Next build succeeds and warnings are recorded | |

## 13. Required implementation report

Create docs/product/werkcv-editor-conversion-remediation-implementation-report.md.

It must contain:

1. worktree baseline;
2. consumer CV write-path inventory;
3. changed files grouped by phase;
4. schema and migration summary;
5. backward-compatibility explanation;
6. final section placement by layout;
7. exact test commands and results;
8. browser and visual-review matrix;
9. completed acceptance matrix;
10. defects found and fixed;
11. deviations from this specification;
12. remaining blockers;
13. confirmation that no email, production migration, commit, push, or deploy occurred unless separately authorized.

Do not write all good, production ready, or fully tested without corresponding evidence.

## 14. Exact Luna Max sequence

1. Read this specification, AGENTS.md, and Section 6 files.
2. Inventory write paths and template layouts.
3. Run the baseline.
4. Add failing regression tests.
5. Implement the canonical section domain.
6. Refactor and test PDF.
7. Refactor and test all thirteen React templates.
8. Implement one-list and two-list editor controls.
9. Implement true-blank detection and example labels.
10. Extract the accessible mobile dialog.
11. Remove exact-preview fallback.
12. Add Prisma fields and migration.
13. Implement the server meaningful-transition service.
14. Update every relevant consumer write path.
15. Rehearse dry-run backfill on disposable data.
16. Align both follow-up scripts.
17. Protect template-first and upload-first routes.
18. Run deterministic, database, browser, and visual verification.
19. Run the full command gate.
20. Review the complete diff for unrelated changes, duplication, and misleading copy.
21. Write the implementation report and stop.

Do not combine or skip phases.

## 15. Definition of done

Done means:

- one section contract governs editor, React, and PDF;
- all production templates agree on presence, lane, and order;
- Skills and Languages are independently movable where promised;
- two-column constraints are clear;
- additional sections appear and reorder;
- fictional content is labelled and never persisted;
- mobile preview is an accessible modal;
- exact-preview failure is honest;
- meaningful state is durable and concurrency-safe;
- feedback uses durable truth;
- entry routes remain correct in both locales;
- every acceptance gate has evidence;
- no unrelated files changed;
- the report states anything incomplete truthfully.
