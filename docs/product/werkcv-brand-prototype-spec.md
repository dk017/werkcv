# WerkCV brand-system prototype specification

**Executor edition:** GPT-5.6 Luna Max  
**Date:** 20 August 2026  
**Status:** implementation specification; not commit, push or deployment authorisation  
**Repository:** `D:\DKPlayground\werkcv`  
**Prototype routes:** `/`, `/tools/kandidaatvoorstel-checker`, `/agency/account/matchpack`

---

## 1. Mission

Create a high-fidelity WerkCV brand prototype across three representative
screens and establish the reusable visual foundation for a later site-wide
migration.

The intended quality bar is the restraint, consistency and product-led polish
visible on `https://dwighthq.com/` on 20 August 2026. Do not copy Dwight's logo,
mascot, illustrations, layouts, wording, font or trade dress. Learn from the
underlying qualities:

- one clear promise per screen;
- calm typography and generous spacing;
- restrained use of color;
- subtle borders, radii and depth;
- product UI used as the main visual proof;
- consistent controls and section rhythm;
- deliberate responsive and interaction states.

The outcome must still look unmistakably like WerkCV: practical, direct,
trustworthy, Dutch-market focused and centered on CVs, recruiter evidence and
candidate proposals.

This is a real working prototype, not a static mock-up. All existing behaviour
on the three routes must continue to work.

---

## 2. Why the prototype is limited to three screens

WerkCV has hundreds of public URLs but fewer underlying page families. The
current repository also repeats colors, shadows, headers and card styling in
many files instead of deriving them from a complete design system. Attempting a
site-wide visual conversion before proving the system would multiply rework.

The three screens deliberately cover different demands:

1. **Homepage `/`:** consumer marketing, navigation, product demonstration,
   conversion and long-form discovery content.
2. **Evidence checker `/tools/kandidaatvoorstel-checker`:** B2B marketing,
   trust, forms, a free interactive tool, status-rich results and SEO content.
3. **MatchPack workspace `/agency/account/matchpack`:** authenticated product
   UI, dense information, workflow steps, permissions, evidence review,
   document preview and destructive actions.

If one coherent system works for all three, it is suitable for a later
page-family migration. Do not expand this implementation to the remaining
routes.

---

## 3. Source-of-truth hierarchy

When requirements conflict, use this order:

1. This specification.
2. Existing MatchPack production invariants in
   `docs/product/agency-matchpack-production-closure-spec.md`.
3. Existing route behaviour, API contracts and analytics events.
4. Existing Dutch page copy and SEO metadata.
5. Current visual styling.

Visual styling is intentionally replaceable. Product behaviour, privacy
meaning, billing meaning, evidence meaning and factual claims are not.

---

## 4. Executor operating protocol

Before editing:

1. Read this entire specification.
2. Read the repository `AGENTS.md` instructions supplied by the environment.
3. Run `git status --short` and preserve all unrelated user changes.
4. Inspect every target file and all shared components it calls before changing
   an interface.
5. Record the baseline route structure and important interactive states.
6. Do not assume that a 500-URL site contains 500 independent page designs.

While implementing:

- Work in the ordered phases in section 12.
- Keep one coherent design system; do not style each screen independently.
- Prefer Server Components. Add `"use client"` only for actual browser state.
- Do not install a UI library, icon package, animation framework or CSS-in-JS
  library.
- Do not replace Tailwind or change the build system.
- Do not create remote dependencies on Dwight assets.
- Use existing product previews and lightweight HTML/CSS/SVG presentation.
- Do not use emoji as primary product icons.
- Never hide missing evidence, limitations, privacy warnings or destructive
  controls to make a screenshot cleaner.
- Do not commit, push, deploy, migrate a database or send external messages.

If a shared component would change non-prototype pages, either:

1. add a backward-compatible visual variant whose default preserves the old
   appearance; or
2. create a new brand component used only by the prototype routes.

Do not silently rebrand unrelated routes.

---

## 5. Non-negotiable scope

### 5.1 In scope

- A scoped WerkCV brand token layer.
- A reusable logo treatment, site header, site footer, page shell, section
  container, buttons, cards, badges, form controls and product-frame treatment.
- Full visual redesign of the three target routes.
- Responsive, focus, hover, disabled, loading, error, empty and populated states
  that already exist on those routes.
- Refactoring presentational markup when needed to apply the system safely.
- Small copy hierarchy adjustments such as breaking paragraphs, introducing an
  eyebrow or shortening a button label, only when meaning and SEO intent remain
  unchanged.
- Visual-regression screenshots and an implementation report.
- A basic smoke check of `/en/candidate-proposal-checker` because it shares
  `CandidateProposalEvidenceChecker` with the Dutch route.

### 5.2 Out of scope

- Rebranding the remaining pages, the English homepage or all tools.
- Changing URLs, redirects, canonical tags, structured data or indexability.
- Rewriting SEO titles, descriptions, H1 intent or long-form content.
- Changing prices, allowances, subscriptions or conversion promises.
- Changing MatchPack analysis, evidence, redaction, retention, approval,
  permissions, export or deletion behaviour.
- Changing any API contract, Prisma schema, migration or stored data.
- Replacing CV document templates or PDF/DOCX rendering.
- Adding runtime AI calls.
- Adding a CMS, analytics provider, feature-flag service or design library.
- Copying Dwight's mascot, assets, exact compositions or proprietary Sofia Pro
  font.
- Commit, push or deployment.

---

## 6. Brand strategy

### 6.1 Brand promise

WerkCV helps people and recruiters turn source information into a clear,
professional document without hiding uncertainty or inventing evidence.

### 6.2 Personality

The interface must feel:

- confident, not loud;
- helpful, not needy;
- precise, not clinical;
- modern, not fashionable for its own sake;
- human, not cartoonish;
- transparent, not magical;
- premium, without appearing expensive or exclusive.

### 6.3 Visual direction

Move away from the current pervasive neo-brutalist treatment:

- no repeated four-pixel black borders;
- no repeated offset black box shadows;
- no rotated labels as routine decoration;
- no rainbow of unrelated pastel panels;
- no oversized collection of equally prominent CTAs;
- no dense uppercase typography for normal reading.

Retain recognisable WerkCV equity:

- warm off-white environment;
- deep ink text;
- teal as the identifying accent;
- yellow as a restrained highlight;
- bold, direct headlines;
- real CV and MatchPack product surfaces as proof.

### 6.4 Color tokens

Implement these as scoped CSS custom properties under a wrapper such as
`.werkcv-brand`, not as a global replacement for existing pages:

```css
--wk-canvas: #f7f8f5;
--wk-surface: #ffffff;
--wk-surface-subtle: #f0f3ef;
--wk-ink: #18211f;
--wk-ink-muted: #606a67;
--wk-border: #d7ded9;
--wk-border-strong: #aebbb5;
--wk-primary: #173f38;
--wk-primary-hover: #0f332d;
--wk-primary-contrast: #ffffff;
--wk-accent: #4ecdc4;
--wk-accent-soft: #dff7f3;
--wk-highlight: #f3ca52;
--wk-highlight-soft: #fff5ce;
--wk-info: #315f88;
--wk-info-soft: #e8f2fb;
--wk-success: #287153;
--wk-success-soft: #e7f5ed;
--wk-warning: #946419;
--wk-warning-soft: #fff4da;
--wk-danger: #a33d47;
--wk-danger-soft: #fcecef;
--wk-focus: #167a6e;
```

The exact values may be adjusted slightly only when contrast testing or visual
QA demonstrates a concrete problem. Record every adjustment in the
implementation report. Do not introduce additional decorative colors without a
semantic purpose.

### 6.5 Typography

- Use `Manrope` from `next/font/google` for the prototype when the build can
  fetch and bundle it reliably. If the build environment cannot fetch a second
  font, use the already bundled Geist variable (`--font-geist-sans`) inside the
  brand wrapper and record that fallback in the implementation report. Do not
  apply a new font to unrelated pages.
- Use one type family. Hierarchy must come from size, weight, spacing and width,
  not from mixing display fonts.
- Body copy: 16px minimum on marketing surfaces, 14px minimum in dense product
  UI where necessary.
- Body line-height: approximately 1.55–1.7.
- Headlines: compact tracking, confident weight, controlled line length.
- Eyebrows may be uppercase but must remain short and sparse.
- Do not use monospace for decorative headings. Reserve it for source locations,
  file types or technical evidence where useful.

### 6.6 Shape, depth and spacing

- Primary radius scale: 10px controls, 14px cards, 20–24px major frames.
- Normal borders: one pixel. Use two pixels only for selected or high-emphasis
  states.
- Shadows: soft and low-opacity. No routine hard-offset shadows.
- Use an eight-pixel spacing rhythm.
- Default content width: approximately 1180–1240px.
- Reading copy should normally remain below 720px width.
- Let major sections breathe; do not place every paragraph inside a card.

### 6.7 Motion

- Motion must explain hierarchy or interaction, not decorate empty space.
- Use short opacity/translate transitions, generally 140–220ms.
- No continuous floating, bouncing or marquee motion.
- Respect `prefers-reduced-motion`.
- Avoid animation that delays input, changes layout or hurts Core Web Vitals.

---

## 7. Reusable implementation foundation

Create a small, practical component layer under `components/brand/`. Suggested
structure:

```text
components/brand/
  BrandShell.tsx
  BrandLogo.tsx
  SiteHeader.tsx
  SiteFooter.tsx
  primitives.tsx
  ProductFrame.tsx
```

Equivalent grouping is acceptable when it stays small and understandable. Do
not create a generic design-system framework.

The foundation must provide:

- scoped font and token wrapper;
- consistent maximum-width container and section spacing;
- logo with a calm, accessible WerkCV wordmark treatment;
- responsive site header with visible current-purpose navigation;
- footer suitable for both consumer and recruiter pages;
- primary, secondary and quiet button/link variants;
- surface/card variants;
- eyebrow and badge variants;
- shared label, input, textarea, select, upload and error styling;
- semantic success, warning, danger and information states;
- product screenshot/frame treatment.

Requirements:

- Semantic HTML remains visible in the components: links remain links and
  buttons remain buttons.
- Components accept `className` only where composition is genuinely needed.
- Do not encode page-specific copy into primitives.
- Do not replace all existing components globally.
- Avoid giant variant matrices. Prefer a few named variants with strong
  defaults.
- Add accessible `focus-visible` treatment to every interactive primitive.
- Disabled elements must look disabled and remain legible.

Use the new components on all three prototype screens. Repeated brand values in
the target files must reference tokens or components rather than introducing
new arbitrary hex values and shadow strings.

---

## 8. Screen specification: homepage `/`

Primary files:

- `app/page.tsx`
- `components/HomePageClient.tsx`
- `components/home/HomeTemplatePreviews.tsx`
- new brand components

### 8.1 Preserve

- Existing metadata, canonical URL, JSON-LD and FAQ data.
- The primary H1 search intent: making an ATS-friendly CV for Dutch vacancies.
- Existing prices and the explicit no-subscription proposition.
- Template counts and all factual dynamic values.
- Upload, drag-and-drop, loading, error and routing behaviour.
- Existing analytics event names and meaningful properties.
- Existing internal links and substantial SEO content.
- Existing CV preview functionality.

### 8.2 New hierarchy

1. Calm shared site header.
2. Focused hero with one primary promise.
3. Primary CTA to start the CV and a clearly secondary upload-existing-CV
   action.
4. Product-led visual using the real CV template preview rather than decorative
   shapes as the main proof.
5. Compact trust row: ATS-friendly, pay once, private.
6. Existing workflow, templates, proof, content and FAQ sections restyled into a
   consistent editorial rhythm.
7. Shared brand footer.

### 8.3 Visual requirements

- The hero must look complete at 1440px without requiring scrolling to
  understand the product and next action.
- On mobile, headline, CTA and product preview must appear in that order.
- The user must not see several equally strong yellow buttons at once.
- Product preview may use subtle layering but no exaggerated rotation or hard
  black offset shadow.
- Keep template previews truthful; do not fabricate customer logos, ratings or
  testimonials.
- Reduce card count where plain grouped content is clearer.

### 8.4 Functional checks

- Start-new-CV CTA retains its destination and tracking.
- Upload button opens the correct file input.
- Dragging, loading and error overlays remain usable and above the new header.
- Header works for signed-out and signed-in users.
- Language switch remains available.
- Every existing homepage section and FAQ remains reachable.

---

## 9. Screen specification: Candidate Proposal Evidence Checker

Primary files:

- `app/tools/kandidaatvoorstel-checker/page.tsx`
- `components/agency/CandidateProposalEvidenceChecker.tsx`
- `components/agency/CandidateProposalEvidenceGuide.tsx`
- new brand components

Shared-route note: `CandidateProposalEvidenceChecker` is also used by
`/en/candidate-proposal-checker`. A shared visual change is permitted and should
look coherent in English. Do not create a Dutch-only fork merely to avoid the
shared route.

### 9.1 Preserve

- Metadata, canonical, language alternates and structured data.
- All existing privacy and limitation statements.
- Text-input and file-upload modes.
- PDF/DOC/DOCX validation and the 10 MB limit.
- Sample loading and sample result behaviour.
- API endpoint and request payloads.
- Existing analytics event names.
- Results, source references, missing-evidence visibility and print behaviour.
- All guide content and internal links.

### 9.2 New hierarchy

1. Shared recruiter-aware site header.
2. Compact hero explaining the outcome in plain Dutch.
3. A three-item trust strip without oversized bordered boxes.
4. Tool introduction and sample action.
5. Main input surface with strong labels and calm field treatment.
6. Results area with summary, evidence and actions.
7. Educational guide content.
8. Clear but non-aggressive MatchPack CTA.
9. Shared brand footer.

### 9.3 Form requirements

- Labels must remain visible; placeholders are not labels.
- Text/file tabs must expose selected state through text, shape and ARIA, not
  color alone.
- File input must remain keyboard accessible.
- Long vacancy and CV text must remain comfortable to edit.
- Privacy copy must be visible before submission.
- Loading state must prevent duplicate submission without making the form jump.
- Error messages use `role="alert"` and remain close to the form.
- Sample action must look secondary to the main analysis action.

### 9.4 Result requirements

- Supported, partial and missing evidence use semantic tokens and explicit text.
- Missing and unsupported information must never be visually minimised.
- Source snippets and source locations must be easier to scan than surrounding
  explanation.
- Status cannot be communicated by color alone.
- Printed output must remain legible and must exclude navigation and unnecessary
  calls to action.
- The transition from free result to MatchPack must explain the additional
  workflow value; it must not imply the free checker completed human review.

### 9.5 Functional checks

- Empty-state submit remains disabled.
- Sample CV + vacancy can be loaded and produces the existing deterministic
  sample report.
- Text mode can call the existing API.
- File mode validates type and size.
- Reset clears the expected fields and result.
- Dutch/English switch works in both directions.
- Browser print preview remains clean.

---

## 10. Screen specification: MatchPack workspace

Primary files:

- `app/agency/account/matchpack/page.tsx`
- `components/agency/AgencyMatchPackWorkspace.tsx`
- new brand components

### 10.1 Product invariants

This phase is visual only. Preserve all of the following exactly:

- authentication and redirect behaviour;
- organisation membership and owner/editor/reviewer/viewer permissions;
- shared 50-slot allowance meaning;
- analysis uses no slot and approval uses one slot;
- evidence reviewer statuses and approval gates;
- source snippets, source references and visible missing information;
- full and contact-free output choices and their limitation wording;
- revision history and visible source/output changes;
- save, approval, deletion, export, copy and outcome behaviour;
- retention dates and deletion confirmations;
- every API URL, method, request shape and response assumption;
- all existing analytics event names;
- exact privacy meaning. Never rename contact-free output to anonymous.

Do not rewrite the 900+ line workspace component from scratch. Refactor
presentation in small, reviewable pieces and keep state and event handlers
stable.

### 10.2 Workspace hierarchy

The workspace should feel like a calm professional review product, not a long
marketing page.

Desktop:

- compact product header with account context;
- restrained introductory block;
- clear allowance usage, not a dominant sales card;
- proposal list/sidebar with active, draft and approved states;
- main working surface with a persistent sense of current review step;
- evidence content receives the greatest visual attention;
- primary next action is unambiguous;
- destructive and account actions remain visibly secondary.

Mobile:

- proposal list becomes a clear first panel or drawer-like section without
  hiding access to it;
- steps remain understandable without horizontal page overflow;
- forms and previews fit the viewport;
- primary workflow action remains reachable after long content;
- no sticky element may cover fields, warnings or browser controls.

### 10.3 Component treatment

- Convert the workflow steps into a consistent stepper using number, label and
  state; do not use color alone.
- Use semantic badges for concept, approved, expiring, evidence and outcome
  status.
- Treat source snippets as evidence, visually distinct from generated or edited
  client copy.
- Preserve the distinction between source correction and persuasive rewriting.
- Inputs, selects and textareas must use shared brand form treatment.
- Full/contact-free output choice must be a real choice group with visible
  selected state.
- Document previews should sit in a neutral product frame and remain large
  enough to inspect.
- Approval checklist must remain prominent and must not appear pre-confirmed.
- Delete controls must retain confirmation friction and danger semantics.
- Empty, loading, saving, saved and error states must all receive intentional
  treatment.

### 10.4 Inactive billing state

Restyle the inactive state with the same system, but do not turn it into an
aggressive paywall. It must explain that the Agency billing tier is required and
offer the existing valid next action. Do not change the price or entitlement
copy.

### 10.5 Functional checks

- Signed-out access still redirects to login with the correct `next` URL.
- An active authorised fixture can open the workspace and a proposal.
- A draft can move through all five review steps.
- Evidence filters and reviewer controls work.
- Source corrections and client copy remain editable only when permitted.
- Full/contact-free preview switching works.
- Save, approval readiness, export links and copy actions remain correct.
- Viewer/editor/reviewer restrictions remain enforced.
- Delete confirmation still requires the exact existing confirmation.
- No horizontal overflow exists at 390px width.

Use the fictional fixture pattern already present in
`scripts/agency-tests-e2e.ts` for authenticated visual verification. Never add a
production auth bypass or public mock-data query parameter. If the guarded test
database is unavailable, do not point the fixture at a development or
production database. Record the blocked active-state screenshot explicitly and
still run the existing non-database checks.

---

## 11. Accessibility, performance and trust requirements

### 11.1 Accessibility

- One H1 per route.
- Logical heading order.
- Keyboard access to every control.
- Visible focus rings using `--wk-focus`.
- Text/background contrast meeting WCAG AA for normal text.
- Status text present in addition to color.
- Tap targets approximately 44px high where practical.
- Form errors programmatically associated where the existing structure permits.
- Reduced-motion support.
- Decorative SVGs use `aria-hidden="true"`.
- Meaningful icons have an accessible name or accompanying visible text.

### 11.2 Performance

- No autoplay video.
- No remote hero imagery.
- No large raster image introduced merely for decoration.
- Prefer existing previews, CSS and small inline SVG.
- Avoid converting server-rendered sections into client components.
- Avoid layout shift from font or preview loading.
- Preserve lazy loading of existing heavy preview components.
- Do not add a dependency solely for a minor visual effect.

### 11.3 Trust and copy

- Do not invent testimonials, customer counts, ratings, compliance badges or
  performance results.
- Do not describe contact-free output as anonymous.
- Do not claim a candidate is suitable when evidence is missing.
- Keep uncertainty, limitations and privacy handling visible.
- Keep sales copy helpful and outcome-led. Avoid desperation, urgency tricks and
  exaggerated AI language.

---

## 12. Ordered implementation plan

### Phase 0 — Baseline and dependency map

1. Record `git status --short`.
2. Inspect the three pages, shared components and their consumers.
3. Identify which changes would spill into non-prototype routes.
4. Capture or record baseline desktop/mobile screenshots when the environment
   permits.
5. Write a short checklist of preserved behaviours before editing.

**Checkpoint:** no files changed yet; target and shared-route impact understood.

### Phase 1 — Scoped brand foundation

1. Add the scoped font and CSS variables.
2. Add the minimal reusable brand components.
3. Implement focus, reduced-motion and semantic state defaults.
4. Create a small internal visual inventory within the three real screens; do
   not add a public style-guide route.
5. Confirm unrelated pages retain their existing appearance.

**Checkpoint:** brand components render, build type-checks, no global visual
replacement occurred.

### Phase 2 — Homepage

1. Replace the local header/footer usage with brand versions on `/` only.
2. Recompose and restyle the hero while preserving copy intent and behaviour.
3. Restyle the remaining existing sections consistently.
4. Verify upload, navigation, language and analytics behaviour.
5. Check 390px, 768px and 1440px layouts.

**Checkpoint:** homepage is visually complete and functional before starting the
checker.

### Phase 3 — Evidence checker

1. Apply the shared shell/header/footer.
2. Restyle hero, trust strip, form and privacy information.
3. Restyle deterministic sample results and evidence presentation.
4. Restyle guide and MatchPack transition without changing factual content.
5. Verify Dutch and English shared-component rendering.
6. Verify print mode.

**Checkpoint:** empty, sample-result, loading/error and print states are coherent.

### Phase 4 — MatchPack workspace

1. Apply the shared shell and product header.
2. Restyle the inactive-billing state.
3. Refactor visual subsections of the workspace without changing state logic.
4. Apply consistent navigation, stepper, forms, evidence, status, preview,
   approval and danger treatments.
5. Verify permissions and workflow using the guarded fictional E2E fixture.
6. Check dense content at 390px and 1440px.

**Checkpoint:** all five steps and major states are usable, with no product
invariant changed.

### Phase 5 — Review and refinement

1. Compare the three screens side by side.
2. Remove one-off styling that should use a token or shared primitive.
3. Check that teal and yellow are accents, not competing page backgrounds.
4. Check typography, section rhythm, alignment and button hierarchy.
5. Verify focus, keyboard, reduced motion and contrast.
6. Run the required commands and create the implementation report.

**Checkpoint:** all acceptance criteria in section 14 are evidenced.

---

## 13. Verification protocol

Run at minimum:

```text
npm run lint
npm run build
npm run test:matchpack
npm run test:agency:unit
```

Run guarded integration/E2E tests only when `AGENCY_TEST_DATABASE_URL` points to
the dedicated disposable test database:

```text
npm run test:agency:integration
npm run test:agency:e2e
```

Do not weaken, skip or delete a failing test to make the prototype pass.

### 13.1 Required visual states

Capture screenshots where the environment permits at:

- mobile: 390 × 844;
- tablet: 768 × 1024;
- desktop: 1440 × 1000 or taller when needed.

Required states:

- homepage default desktop and mobile;
- evidence checker empty form;
- evidence checker deterministic sample result;
- evidence checker mobile form/result;
- MatchPack inactive billing state where available;
- MatchPack active empty/new proposal state;
- MatchPack active evidence-review state with one supported and one missing
  requirement;
- MatchPack output/approval state;
- MatchPack mobile workspace.

Inspect screenshots visually. A successful build is not visual proof.

### 13.2 Manual interaction checklist

- Tab through header, hero and first form controls.
- Open and close mobile navigation.
- Trigger homepage upload selection.
- Load, run and reset checker sample.
- Switch checker input mode.
- Verify one error state.
- Open a MatchPack and move through the five steps.
- Change evidence filter and reviewer status where authorised.
- Switch full/contact-free preview.
- Inspect approval checklist and deletion confirmation without approving or
  deleting user data.

---

## 14. Acceptance criteria

The prototype is complete only when all statements below are true.

### System

- All three routes visibly belong to the same WerkCV system.
- Brand tokens are scoped and do not unexpectedly restyle unrelated routes.
- The three routes reuse brand header, type, controls, surfaces and buttons.
- Modified target files introduce no new arbitrary brand hex colors or hard
  offset shadow strings outside the central token/component layer.
- No new UI/framework dependency was added.

### Visual quality

- Hierarchy is clear within five seconds on each screen.
- The product is the main visual proof.
- Teal identifies WerkCV; yellow highlights rather than dominates.
- Borders and shadows are restrained.
- Spacing and typography remain consistent across marketing and application UI.
- Mobile layouts have no clipped content or horizontal page scroll.
- Dense MatchPack content remains scannable rather than merely enlarged.

### Behaviour

- Existing homepage upload/start flows work.
- Checker sample, input modes, API flow, reset and print work.
- MatchPack auth, permissions, evidence, approval, quota, redaction, retention,
  export, deletion and outcome behaviour are unchanged.
- Analytics event names are unchanged.
- Metadata, structured data, canonicals and important internal links remain.

### Quality gates

- `npm run lint` passes.
- `npm run build` passes.
- `npm run test:matchpack` passes.
- `npm run test:agency:unit` passes.
- Guarded agency integration/E2E results are recorded as pass, fail or blocked
  with the exact reason.
- Required screenshots are reviewed, or every unavailable state is listed with
  a concrete environment blocker.
- No commit, push or deployment was performed.

---

## 15. Implementation report

Create:

`docs/product/werkcv-brand-prototype-implementation-report.md`

The report must contain:

1. Executive summary.
2. Exact changed files and why each changed.
3. Final token values and any justified deviations.
4. Shared component/API decisions.
5. Routes unintentionally or intentionally affected through shared components.
6. Preserved behaviour checklist for each screen.
7. Verification command results.
8. Screenshot inventory by route, state and viewport.
9. Accessibility and responsive findings.
10. Known limitations or blocked checks.
11. A recommendation: proceed, refine or reject the system before wider
    migration.
12. A proposed page-family migration order, without implementing it.

Do not call the prototype production-ready merely because it builds. The report
must distinguish code verification, visual verification and authenticated
workflow verification.

---

## 16. Final handoff format for Luna Max

At completion, respond with:

1. **Outcome:** what was implemented.
2. **Three-screen summary:** homepage, checker and MatchPack.
3. **Verification:** exact pass/fail/blocked results.
4. **Visual QA:** screenshots reviewed and remaining issues.
5. **Shared-route impact:** any page outside the three routes that changed.
6. **Open risks:** only real unresolved items.
7. **Recommendation:** whether the system is ready for user review.

Do not commit, push or deploy. Stop after the verified local implementation and
handoff.
