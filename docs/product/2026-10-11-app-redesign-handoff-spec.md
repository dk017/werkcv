# WerkCV app redesign: handoff spec (dashboard + stepped editor)

Date: 11 October 2026
Author of the work so far: Claude Code sessions of 9-11 October 2026
Audience: the next coding agent (ChatGPT Codex) continuing this work

Read this whole file before changing code. It explains what we are building, why, what already
exists, the rules that must not be broken, and what is left.

---

## 1. Goal and intention

WerkCV (werkcv.nl) is a Dutch CV builder: people build a CV in an editor with a live preview and pay
**€7,95 once** (no subscription) to download the PDF. The owner did not like the old editor (one very
long scrolling page with everything on it) and there was no real logged-in "app" (dashboard).

**Goal:** turn the logged-in part of WerkCV into a professional app, in Dutch and English:

1. An **app frame** with a left navigation (like ResumAI / Rezi): New CV, My CVs, Cover letters, tools,
   help, account. Full labelled sidebar on wide screens, an icon rail on narrower screens, a top bar
   with a menu on phones.
2. A **dashboard** ("Mijn CV's" / "My CVs"): CV cards with real thumbnails and a status, a ••• menu,
   a "New CV" dialog, a cover letters tab, a tools section.
3. A **stepped editor**: one part of the CV per screen (Persoonlijk → Profiel → Werkervaring →
   Opleiding → Vaardigheden → Extra → Afronden), Previous/Next, a live preview next to every step,
   and **click-to-edit**: clicking a part of the preview opens the step that edits it.
4. An **Afronden (finish) step**: download card (price, pay once), design (colour + template gallery),
   CV score / checks, vacancy tailoring, cover letter.

Everything ships **behind a feature flag** so the current site keeps working exactly as before until
the owner turns it on. The editor is the revenue path: never break saving, checkout or PDF download.

The owner's way of working: research competitors before building, think about the Dutch market,
high visual quality ("professional, like ResumAI"), and verify in a real browser before claiming
something works.

---

## 2. Reference material

- **ResumAI (app.resumai.com, built by Rezi's founder)**: the visual/UX reference. Screen captures are
  in `D:\Downloads\screencapture-app-resumai-*.pdf` (dashboard, create dialog, contact/experience/
  education/skills/summary steps, finish-up page, sample library, job search). Key takeaways:
  fixed left nav, dashboard of CV thumbnails, one section per screen, entries as a list, a separate
  finish/preview workspace with design controls and a score. Tech: React SPA (Vite) + Tailwind +
  Firestore; irrelevant for us, we keep our stack.
- **Competitor editors checked (9 Oct 2026):** CVmaker.nl's new editor (`/app/resumes-next`) and
  Resume.io's guest builder both use: Content/Design switch, "Step 1 of 8", one section per screen,
  "Next: <section>" button, live preview on the right that you **cannot** type into.
- **Approved design canvas (owner said "looks fine, proceed"):**
  https://claude.ai/artifact/Vq83u7FWhUsCwtN4TSQaZp (dashboard + new-CV dialog, editor step with
  click-to-edit preview, Afronden, mobile step). It uses the WerkCV brand tokens.

### Decisions made with the owner

- Keep the stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind 4, Prisma/PostgreSQL. No rewrite.
- Light theme (not ResumAI's dark), WerkCV brand: deep green `#173f38`, teal accent `#4ecdc4`,
  yellow highlight `#f3ca52`, Manrope font, rounded cards.
- Keep the live preview next to every step.
- Preview is **click-to-edit** (click a block → open that step). **No** "edit mode" toggle and **no**
  typing directly in the preview for now (fragile, two places to type, preview and PDF are different
  renderers). Maybe later: inline typing for short fields in the finish step only.
- Dashboard v1: CVs, cover letters, tools (CV-check, job/vacancy match, profile photo, examples).
  Job search: later.
- The agency/MatchPack editor stays as it is (the stepped layout is switched off for it).
- Profile-photo tool pages stay public SEO pages; the app sidebar links to them.

---

## 3. Where the code is

- Work in the main repo folder **`D:\DKPlayground\werkcv`**, branch **`feat/app-redesign`**
  (cut from `origin/main` at `13f1be5`; `node_modules` and `.env` are in place).
- Commits on the branch (all local, **not pushed, not deployed**):
  - `8712939` feat(app-v2): app shell and Mijn CV's dashboard behind APP_V2_MODE
  - `1d40b17` feat(app-v2): stepped editor with click-to-edit live preview
  - `5bd667d` feat(app-v2): foldable entries, inline template gallery in Afronden
  - `af9783f` feat(app-v2): English app, cover letter workspace and success page in the app frame
  - `0e159c4` feat(app-v2): left navigation rail on every app screen, like the reference
  - `618b974` docs: this handoff spec
- History (12 Oct 2026): the work was first done in a separate worktree
  (`D:\DKPlayground\werkcv-app-redesign`, now removed) because the main folder held other sessions'
  unfinished edits. Those edits were set aside, nothing was lost:
  - `git stash list` → `stash@{0}` "other-session-wip": uncommitted changes to
    `app/api/cv-check/route.ts`, `components/cv-check/CvCheckTool.tsx`, `lib/cv-check/engine.ts`,
    `lib/cv-check/layout.ts`, `lib/pdf-preview-images.ts` (from branch `cv-check-handoff`).
    **Do not drop or apply this stash on `feat/app-redesign`**; it belongs to the CV-check work.
  - `D:\DKPlayground\werkcv-wip-backup-2026-10-12\`: untracked files that clashed with the branch
    (a different draft of `docs/product/2026-10-04-werkcv-cv-mcp-spec.md`; copies of `lib/cv-check/ocr.ts`
    and this spec that were identical to the branch).
  - Other untracked files in the folder (logs, `tmp/`, `output/`, other docs) belong to other work:
    never `git add -A`; stage only your own files.

### Run it locally

```bash
cd D:/DKPlayground/werkcv
npm run dev -- -p 3021
```

- Database: local PostgreSQL in Docker (`werkcv-db-1`), already running; `DATABASE_URL` is in `.env`.
- Turn the new app on **for your browser**: open `http://localhost:3021/app-v2?aan=1`
  (`?aan=0` turns it off). In development the default mode is opt-in.
- Log in: `/login`, any email (test account used: `redesign-test@werkcv.test`). In development the
  6-digit login code is printed in the dev server log as `auth_dev_code <email> <code>`.
- Payments are **off** locally unless `PAYMENT_ENABLED=true`; with payments off the download is free
  and the UI says "already paid". With payments on, clicking download creates a **real checkout
  session** at the payment provider (Polar/Dodo): do not do that without the owner's OK.
- AI writing buttons only show when `CONSUMER_AI_REVIEW_ENABLED=true` (off locally).
- `next dev` and `next build` share `.next/`: stop the dev server before `npm run build`.

---

## 4. What is built (architecture)

### 4.1 Feature flag: `lib/app-v2.ts`

- `APP_V2_MODE` env: `off` | `optin` | `on`. Default: `off` in production, `optin` in development.
- Cookie `werkcv_app_v2` (`1`/`0`), set by the route `app/app-v2/route.ts`
  (`/app-v2?aan=1&next=/mijn-cvs`; `next` must be a same-site path, see `safeAppV2Next`).
- `optin`: only browsers with cookie `1`. `on`: everyone except cookie `0`.
- Server code calls `await isAppV2Active()`. Tests: `lib/app-v2.test.ts`.

### 4.2 Language-aware links: `lib/app-v2-paths.ts`

`appPaths(locale)` returns dashboard (`/mijn-cvs` | `/en/my-cvs`), letters tab, editor base
(`/editor` | `/en/editor`), app cover letter (`/mijn-cvs/brief?id=` | `/en/my-cvs/letter?id=`),
classic cover letter (`/sollicitatiebrief?id=` | `/en/cover-letter?id=`), tools (`/cv-check`,
`/cv-check/vacature` | `/en/cv-check`, `/en/cv-check/job-match`; `/profielfoto-cv-maken` |
`/en/profile-photo`; `/cv-voorbeelden` | `/en/dutch-cv-examples`) and help (`/faq` | `/contact`).
`isLettersTab(tab)` accepts `brieven` and `letters`.

### 4.3 App frame: `components/app/`

- `AppFrame.tsx`: client frame. `AppSidebar` with `mode="responsive"` (icon rail from 520px, full
  248px labelled sidebar from 1280px) or `mode="rail"` (always the rail; used by the editor). Phones
  (<520px) get a top bar with "New CV" and a ☰ menu. Wraps `NewCvDialogProvider`.
  The frame root carries the class `werkcv-brand`: **the `--wk-*` brand tokens only exist inside
  `.werkcv-brand`** (see `app/globals.css`). Anything using `var(--wk-...)` must be inside it.
- `AppShell.tsx`: server wrapper that loads the user's email and renders `AppFrame` (`active`,
  `locale` props).
- `NewCvDialog.tsx`: native `<dialog>` (focus trap/Esc for free). Name, start (blank / upload / copy
  of an existing CV), optional "tailor to a vacancy" text. Calls the server action
  `createCvFromDashboard` (`app/mijn-cvs/actions.ts`), stores the vacancy in sessionStorage under
  `getTargetVacancySessionKey(cvId)` (that is where the editor reads it), then opens the editor
  (`?upload=1` for upload). Bilingual copy table.
- `CvThumbnail.tsx`: renders the real template at A4 width (794px) scaled with ResizeObserver.
- `icons.tsx`: small inline-SVG icon set (`<Icon name=... />`). There is no icon library; add icons here.

### 4.4 Dashboard

- `app/mijn-cvs/page.tsx`: flag on → `DashboardScreen` (locale nl); flag off → the old page (unchanged).
- `app/en/my-cvs/page.tsx` (new): flag on → `DashboardScreen` (locale en); flag off → redirect to `/mijn-cvs`.
- `app/mijn-cvs/DashboardScreen.tsx`: loads `getUserCVs()` (+ cover letters for the letters tab).
- `app/mijn-cvs/Dashboard.tsx`: client UI with a `COPY` table (nl/en). Search, sort, paging, CV cards
  (thumbnail, edited time, status chip: Betaald/Paid, Klaar/Ready, Concept/Draft n/5 from
  `getCompletionState`), ••• menu (edit, rename inline, copy, cover letter, delete with confirmation),
  "New CV" tile, cover letters tab (list + "new letter for which CV?"), tools section.
  Reuses the existing server actions `getUserCVs`, `renameCV`, `duplicateCV`, `deleteCV` in `app/actions.ts`.
- `app/mijn-cvs/actions.ts`: `createCvFromDashboard` (bilingual errors) and `getUserCoverLetters`.
- Cover letter workspace in the app: `app/mijn-cvs/LetterScreen.tsx` + `app/mijn-cvs/brief/page.tsx`
  + `app/en/my-cvs/letter/page.tsx`, rendering `CoverLetterEditor` with `variant="app"`
  (`app/cover-letter/CoverLetterEditor.tsx`; classic variant untouched). Flag off → redirect to the
  classic `/sollicitatiebrief` / `/en/cover-letter`. Why separate URLs: the classic cover-letter routes
  are "public" routes that get the marketing header from `BrandRouteBoundary`; the app routes under
  `/mijn-cvs` and `/en/my-cvs` are `personal_app` routes (`lib/workspace/route-context.ts`) without it.
- `app/success/page.tsx` (after payment): flag on → same content inside `AppShell`.
- `components/NavUserMenu.tsx`: English "My CVs" link now points to `/en/my-cvs`.

### 4.5 Stepped editor (inside the existing editor)

The editor (`app/editor/editor.tsx`, ~3,000 lines) holds saving (3-second debounced autosave via a
save queue), checkout, PDF download, upload/import, AI writing, tracking, public (no-account) mode and
the agency workspace. **We did not rewrite it.** A `layoutVariant="steps"` prop switches the layout;
all logic is shared. `isSteps = layoutVariant === "steps" && !isPublicMode && !isMatchPackWorkspace`.
Every layout change is gated by `isSteps`, so the classic editor renders exactly as before.

- Pages: `app/editor/page.tsx` and `app/en/editor/page.tsx` set `layoutVariant` from the flag
  (never for matchpack/agency CVs) and `initialStep` from `resolveInitialStep(...)`.
- Steps model: `lib/editor-steps.ts` (+ tests `lib/editor-steps.test.ts`): `EDITOR_STEPS`,
  `EDITOR_STEP_COPY[locale][step]` (nl/en labels, titles, intros), `stepForSection`,
  `stepForPreviewTarget`, `getStepStates`, `initialEditorStep`, `resolveInitialStep`, `neighbourSteps`,
  `stepParamName(locale)` (`?stap=` for Dutch, `?step=` for English; both accepted).
  Section → step: experience → werkervaring; education → opleiding; skills, languages → vaardigheden;
  internships, courses, awards, interests, properties, references, sideActivities, customSections → extra.
- Layout in steps mode: `[icon rail] [ top bar (StepsTopBar) / form pane | live preview ]`.
  - `app/editor/StepsTopBar.tsx`: steps with ✓ for done, Afronden, save status, upload, preview
    (phones), download button + price caption, progress bar. Keeps the current step in view on phones.
  - `app/editor/StepParts.tsx`: `StepHeader` ("Stap 3 van 6", title, intro) and `StepNav` (Previous / Next: X).
  - `app/editor/StepsFinishPanel.tsx`: Afronden download card first (price line, Download, "View the
    PDF first"), then design (colour picker + inline `TemplateGallery`, shown with example data until
    the CV is complete). Then the existing final check, vacancy tailoring and cover letter blocks.
  - `goToStep(step, source)`: sets state, updates the URL with `history.replaceState`, scrolls the form
    to the top, tracks `cta_clicked { location: "editor_steps", label: "<source>_<step>" }`.
- **Click-to-edit:** templates mark body sections with `data-cv-section="<id>"` (already existed) and
  now the header/contact/photo with `data-cv-edit="personal"` and the profile text with
  `data-cv-edit="profile"` (`app/editor/templates/CanonicalCvTemplate.tsx`; all 14 templates render
  through it). `handlePreviewClick` maps the clicked element to a step. Hover outline via the
  `PREVIEW_CLICK_TO_EDIT_CLASS` Tailwind arbitrary variants in `editor.tsx`. Works in the phone preview
  dialog too (tapping a part closes the dialog and opens the step).
- **Section form styling:** `app/editor/section-styles.tsx` provides a style context.
  `CLASSIC_SECTION_STYLES` contains the **exact original class strings**; `stepsSectionStyles()` the new
  look. `app/editor/sections.tsx` reads `const s = useSectionStyles()` in every component instead of
  hard-coded classes. In steps mode, experience/internships/education entries fold into summary cards
  (`EntryCard`, one open at a time, a new entry opens itself). The personal fields in `editor.tsx` use
  `fieldInputClass` / `labelClass`, which switch the same way.
- Preview and PDF are **two different renderers**: the preview is the React templates
  (`app/editor/templates/*`), the downloaded PDF is built by `lib/pdf.ts`. Visual changes to the CV
  itself must be made in both; data attributes in the preview do not affect the PDF.

### 4.6 Tests and checks that pass

```bash
cd D:/DKPlayground/werkcv
node node_modules/typescript/bin/tsc --noEmit -p .
npx eslint components/app app/mijn-cvs app/en/my-cvs app/editor app/cover-letter app/success lib/app-v2.ts lib/app-v2-paths.ts lib/editor-steps.ts
npx tsx --test lib/app-v2.test.ts lib/editor-steps.test.ts app/editor/templates/section-layout.test.tsx lib/cv-sections.test.ts lib/cv-empty.test.ts lib/pdf-section-order.test.ts scripts/workspace-boundary.test.ts
npm run build   # stop the dev server first
```

State on 10-11 Oct: tsc clean, 0 lint errors (4 old warnings in files we did not touch), 36/36 tests,
`npm run build` passed (before the rail commit `0e159c4`; tsc and lint were clean after it).

Verified in a browser (local, flag on): dashboard nl/en, New CV dialog (blank + vacancy → editor),
rename/menu, cover letters tab, stepped editor all steps, click-to-edit, foldable entries, template
switch, Afronden, English editor (`?step=`), app cover-letter pages nl/en, success page in the frame,
icon rail at 582px and full sidebar at 1440px, phone layouts. Flag off: classic editor unchanged.

---

## 5. Rules (do not break these)

1. **Flag off = no visible change.** Everything new must be behind `isAppV2Active()` / `isSteps`.
   The only accepted flag-off change so far: English "My CVs" in the account menu goes to `/en/my-cvs`,
   which redirects to `/mijn-cvs`.
2. **Never break saving, checkout, PDF download, upload/import, public (no-account) mode, the
   agency/MatchPack workspace or analytics events.** Reuse the existing handlers (`handleDownload`,
   `startCheckout`, `openUploader`, save queue). Do not rename tracked events.
3. **Do not deploy or push to `main` without the owner's explicit OK.** Pushing to `main` + running the
   deploy workflow ships to production (see section 7).
4. **Do not create real checkout sessions** (with `PAYMENT_ENABLED=true`, clicking download calls the
   payment provider). Ask first.
5. **Commit only your own changes.** Other sessions edit files in `D:\DKPlayground\werkcv` at the same
   time; check `git diff <file>` and stage only your hunks. Never commit `.env`. Before pushing, type-check
   a clean checkout of the exact commit (CI once failed because a local-only change was missing).
6. Keep the classic class strings in `CLASSIC_SECTION_STYLES` byte-for-byte.
7. Brand tokens: use `text-[var(--wk-ink)]`-style Tailwind classes, only inside `.werkcv-brand`.
   Do not wrap the CV preview in `.werkcv-brand` (it changes font colour/line-height of the preview).
   Do not edit `app/globals.css` without need (the owner has uncommitted edits there in the main folder).
8. Copy: Dutch is the primary language, plain and friendly ("je", not "u"). Every new UI string needs
   an English equivalent (copy tables or `tr(nl, en)`). Price: €7,95 one-time (`cvDownloadPrice` in
   `lib/site-content.ts`); never promise things that are not true (no subscriptions, no invented stats).
9. Accessibility: real `<button>`/`<a>`, labels on inputs, `aria-label` on icon-only buttons,
   44px touch targets, visible focus, text contrast ≥ 4.5:1.
10. No new dependencies unless clearly needed (icons are inline SVG in `components/app/icons.tsx`).
11. Verify in a real browser before saying something works; say plainly what was not tested.

---

## 6. What is left (suggested order)

### A. Ship behind the flag (needs the owner's OK)
1. Re-run tsc, lint, tests and `npm run build` on a clean checkout of `feat/app-redesign`.
2. Push the branch, open a PR to `main`, merge after review. Production default is `off`, so visitors
   see nothing new.
3. Deploy (section 7). Then the owner opts in on production with `https://werkcv.nl/app-v2?aan=1`
   and tests with their own account, including one real payment if they want.

### B. Polish the stepped editor to the approved design
- Labels in `sections.tsx` are not linked to their inputs (`<label>` without `htmlFor`/nesting). Fix
  for accessibility (both layouts can benefit, but keep classic visuals identical).
- Clicking a specific job in the preview should open **that** entry (now it opens the step only).
  Needs a per-entry marker in `CanonicalCvTemplate` (e.g. `data-cv-entry="experience:<entryId>"`) and
  passing the target into the section's disclosure state.
- Restyle the remaining old-looking parts in steps mode: photo upload box (`PhotoUpload.tsx`, black
  border), "Meer persoonlijke gegevens" toggle, Extra step toggle buttons, `SectionOrderPanel`,
  `CvScoreWidget`, `KeywordScannerWidget`, the vacancy-tailoring card, the preview pane header chips,
  the phone preview dialog, the AI writing buttons (check with `CONSUMER_AI_REVIEW_ENABLED=true`).
- Template gallery thumbnails in Afronden are small (fixed `zoom` in `TemplateSelector.tsx`
  `TemplateCard`); consider a larger card in the steps layout. `template_selected` events from the
  inline gallery report `source: "toolbar"`; add a proper source value (check the analytics event types
  in `lib/analytics.ts`).
- Highlight the current step's section in the live preview (subtle outline).
- In the remove (✕) button inside an open entry card, use a text label ("Verwijderen") and make sure it
  does not overlap the "Bedrijf" label on narrow screens.

### C. Remaining app screens
- Login page (`app/login/`) in the new look when the flag is on (careful: logic is shared with all entry flows).
- Consider showing the app frame on the profile-photo tool when opened from the app (keep the public SEO page as is).
- Job search was originally postponed; the owner subsequently requested implementation.
  See section 10 and `2026-10-12-personal-app-jobs.md` for the implemented slice.

### D. Rollout
- After the owner is happy: A/B test old vs new editor with `APP_V2_MODE`-style assignment (cookie per
  visitor), measured on `pdf_download_started`, `checkout_paywall_reached`, paid orders, and
  `cv_section_completed`. Only then switch `APP_V2_MODE=on`.

---

## 7. Deploy procedure (for when the owner says go)

From the owner's notes (WerkCV production runs on a server via Docker images built by GitHub Actions):

1. Merge to `main` and push.
2. Trigger the build-and-deploy workflow (Git Bash needs `MSYS_NO_PATHCONV=1`):
   ```bash
   MSYS_NO_PATHCONV=1 gh workflow run "Build app image" --ref main -f deploy=true -f deploy_dir=/opt/werkcv
   ```
3. To enable the new app for everyone later: add `APP_V2_MODE=on` (or `optin`) to `/opt/werkcv/.env` on
   the server and recreate the app container (same way `MCP_ENABLED=true` was enabled:
   `WERKCV_IMAGE=<current> APP_BUILD_ID=<tag> docker compose -p werkcv -f docker-compose.ghcr.yml up -d app`).
   Without the variable production stays `off`, and in `off` mode the `/app-v2?aan=1` cookie is ignored.
   Use `optin` to let the owner (and only opted-in browsers) test on production; use `on` for everyone.
4. Never delete the `bengaluruevents-ingestor` image on the server; `workcv-app` there is a separate app, keep it.

**Important:** for the owner to test on production, production must run with `APP_V2_MODE=optin`
(then only browsers that visited `/app-v2?aan=1` see the new app). With no variable it is `off` and
nobody can see it.

---

## 8. Quick file map

| Area | Files |
|---|---|
| Flag | `lib/app-v2.ts`, `lib/app-v2.test.ts`, `app/app-v2/route.ts` |
| Links | `lib/app-v2-paths.ts` |
| Frame | `components/app/AppFrame.tsx`, `AppShell.tsx`, `NewCvDialog.tsx`, `CvThumbnail.tsx`, `icons.tsx` |
| Dashboard | `app/mijn-cvs/page.tsx`, `DashboardScreen.tsx`, `Dashboard.tsx`, `actions.ts`, `app/en/my-cvs/page.tsx` |
| Cover letter (app) | `app/mijn-cvs/LetterScreen.tsx`, `app/mijn-cvs/brief/page.tsx`, `app/en/my-cvs/letter/page.tsx`, `app/cover-letter/CoverLetterEditor.tsx` (`variant="app"`) |
| Success | `app/success/page.tsx` |
| Editor (steps) | `app/editor/editor.tsx` (search `isSteps`), `app/editor/page.tsx`, `app/en/editor/page.tsx`, `StepsTopBar.tsx`, `StepParts.tsx`, `StepsFinishPanel.tsx`, `section-styles.tsx`, `sections.tsx` |
| Steps model | `lib/editor-steps.ts`, `lib/editor-steps.test.ts` |
| Click-to-edit markers | `app/editor/templates/CanonicalCvTemplate.tsx` (`data-cv-edit`), section renderers (`data-cv-section`) |
| Route contexts | `lib/workspace/route-context.ts`, `scripts/workspace-boundary.test.ts` |
| PDF (separate renderer) | `lib/pdf.ts` |

---

## 9. Continuation: 12 October 2026 (Codex)

Completed the first editor-polish slice from section 6B on `feat/app-redesign`:

- Linked all 23 single-field labels in `sections.tsx` to their controls. Added bilingual
  accessible names to placeholder-only fields; group headings are no longer unattached labels.
- Preview clicks now open, scroll to and focus the exact experience, education or internship
  entry, including when entering from another step or the phone preview dialog.
  `data-cv-entry` uses the current array index, resolved immediately to React Hook Form's
  field ID. This supports legacy education/internship records without a schema migration.
  Each click creates a fresh request so a manually collapsed entry can be opened again.
- Open entry cards have a separate 44px-high "Verwijderen" / "Remove" control that cannot
  overlap the first field label. Disclosure buttons have visible keyboard focus and panel IDs.
- Classic section class strings, persistence, checkout, PDF rendering and analytics handlers
  are unchanged. Changes remain local; nothing was pushed or deployed.

Verification:

- TypeScript check and lint of all changed code/test files passed.
- Full lint was rerun excluding `.claude/**`, `.codex-chrome-profile/**`,
  `.codex-remote-attachments/**`, `output/**` and `tmp/**` after the default command scanned
  generated bundles in another worktree. It reports 8 existing CommonJS-import errors in
  `local/wordpress-sandbox/capture-screenshots.cjs`, `scripts/create_pilot_access.js` and
  the two WordPress webpack configs, plus 12 warnings in untouched files.
- The section 4.6 regression command passed **37/37** tests. Added invalid-entry-marker
  coverage and entry-marker assertions across every registered template.
- Real browser: Dutch jobs, English education/internships, repeated selection after collapse,
  cross-step selection, saved content surviving navigation, 390px mobile preview selection,
  and flag-off classic editor checked. No browser console errors at the final check.
- Screenshots: `output/app-redesign-2026-10-12/desktop-entry.jpg` and `mobile-entry.jpg`.
- Local QA CV: `585fec15-12c7-4f42-87be-c63fe4f27c14`, named
  "Redesign QA 12 Oct – entry selection", in `redesign-test@werkcv.test`.
- No production build in this session: an existing development server owns port 3021 and was
  left running. No payment, upload/import, public-mode or agency browser flows exercised.

Next: remaining visual polish from 6B (photo/Extra/finish widgets, preview highlighting,
template-gallery sizing and analytics source). Shipping and rollout remain separate steps.

## 10. Personal jobs continuation: 12 October 2026

The owner requested job discovery, saved applications and vacancy-specific CV tailoring.
Implemented NL/EN screens in the app frame, a server-side JSearch integration, persisted
tracking statuses, manual vacancies, and idempotent separate CV copies with durable
vacancy context in the editor. The original CV is preserved; AI proposals use the existing
accept/reject/undo review flow. The API key is only in ignored local configuration.

Implementation, migration/setup, quota controls, limitations and validation results:
[`2026-10-12-personal-app-jobs.md`](./2026-10-12-personal-app-jobs.md).
Changes remain local on `feat/app-redesign`; shipping remains a separate step.

## 11. Editor polish continuation: 13 October 2026 (Claude Code)

Steps mode only; classic class strings are kept byte-for-byte (moved into `classic` style maps).

- `PhotoUpload.tsx` and `SectionOrderPanel.tsx` take `variant="steps"`: brand-token look,
  larger touch targets. The photo box is now keyboard-operable (both variants, no visual change).
- Persoonlijk: real chevron icon on "Meer persoonlijke gegevens"; profile AI buttons use `assist`.
- Extra: new "Wat wil je toevoegen?" picker first (pill toggles, `aria-pressed`), then the
  section forms, then the section-order panel. The old chip-heading card is classic-only.
- Afronden: plain headings for "Laatste controle" and "Pas aan op een vacature"; the duplicate
  download button inside "Laatste controle" is hidden (the download card has one); brand tailor button.
- Live preview outlines the parts the current step edits: `previewSelectorsForStep` in
  `lib/editor-steps.ts` (tested as the inverse of click-to-edit), rendered as a scoped `<style>`.
- Verified in a browser: desktop 1440 (Persoonlijk, Werkervaring, Extra, Afronden), phone 390
  (Persoonlijk, Extra), flag-off classic editor unchanged, no console errors.

Still open from 6B: step highlight inside the phone preview dialog, larger template gallery
cards and a proper `template_selected` source for the inline gallery, `CvScoreWidget` /
`KeywordScannerWidget` internals, phone photo toggle.

## 12. "Never leave the app": login routing, in-app tools, account (13 October 2026)

Owner's requirement: once signed in, the user stays inside the app frame; the same applies when
arriving from other pages through login, signup or a handoff.

**Login and handoffs** (commit `256485e`), all behind `isAppV2Active()` unless noted:
- `lib/app-v2-entry.ts` (+ tests): generic destinations (`/`, `/editor`, `/editor?template=professional`,
  `/templates`, `/prijzen`, none) → dashboard in the right language; specific ones (editor id,
  template + startSource, claim, handoff, success) are kept. Used by `app/api/auth/verify-code` and
  `app/login/page.tsx` (signed-in users skip the form).
- `lib/auth/safe-return-path.ts` now allows `/en/my-cvs`, `/sollicitatiebrief`, `/en/cover-letter`,
  `/profielfoto-cv-maken`, `/en/profile-photo` (flag-independent bug fix: these used to fall back to
  a new blank Dutch draft).
- Classic cover letter routes forward to the app letter workspace; `/success` dead ends,
  `/cv-handoff` Cancel and claim-error links go to the dashboard.

**In-app tools, help and account** (`appPaths()` now points here; public SEO pages unchanged and
still reachable via `appPaths().publicTools`; every route falls back to its public page when the flag is off):

| NL | EN | Content |
|---|---|---|
| `/mijn-cvs/cv-check` | `/en/my-cvs/cv-check` | `CvCheckTool`, `entry="app"`, editor link straight to `/editor?…startSource=cv_check` (keeps the file handoff) |
| `/mijn-cvs/vacature-match` | `/en/my-cvs/job-match` | same tool, vacancy mode, `entry="app_vacancy"` |
| `/mijn-cvs/profielfoto` | `/en/my-cvs/profile-photo` | `ProfilePhotoGenerator context="app"`; login/checkout return here |
| `/mijn-cvs/voorbeelden` | `/en/my-cvs/examples` | gallery from the examples registry (+ 4 English role examples), `startSource=app_examples` |
| `/mijn-cvs/hulp` | `/en/my-cvs/help` | product FAQ (NL) / English consumer FAQ, contact by email |
| `/mijn-cvs/account` | `/en/my-cvs/account` | email, paid orders (by email or CV), app language, log out, deletion by email |

- Profile photo checkout: `returnTo` is one of `public_nl | public_en | app_nl | app_en`
  (`parseProfilePhotoReturnTarget`, unknown → `public_nl`, so no open redirect). Side effect: the
  public English page now returns English buyers to `/en/profile-photo` instead of the Dutch page.
- Editor photo card (steps mode) and the success-page photo offer (flag on) open the in-app tool.
- Sidebar: tools and Help have active states; the email row is the link to Account.

**Verified** (local, Puppeteer): crawler from every app screen (NL+EN) — all links stay in the
frame except deliberate new-tab links; 25 login journeys incl. flag off; "use this example" lands in
the editor; editor photo card → in-app tool with `cvId`; flag-off fallbacks; CV-check at 390 px.

**Known gaps:** the profile photo generator keeps its neo-brutalist styling inside the app; the
CV-check methodology link opens the public page; claim (`/editor/claim`) and `/cv-handoff` screens
are transitional pages without the frame; logout goes to the marketing home (intended).

## 13. PDF = preview: one renderer (13 October 2026)

**Problem found:** the downloaded PDF was built by `lib/pdf.ts` (4 generic HTML layouts), while the
preview and template gallery use the 13 React templates. Several PDFs were a different design from
what the user chose (Dynamic: other layout; Classical: no serif; Formal/Modern/JobBoss: extra
initials badge; Simple/ATS: other header and skills), and page counts differed for 6 of 13.

**Also fixed first (commit `1190643`):** the preview moved a whole section to the next page when it
crossed the page edge (big gap after the profile on ATS/Simple); breaks now go between entries
(`lib/preview-pagination.ts`). The final PDF view showed the preview's page count instead of the PDF's.

**New renderer** (switch `PDF_RENDERER=react`, default `legacy`):
- `app/pdf-render/` renders `<Preview>` (same templates) and forces `break-before: page` on the
  exact blocks the preview breaks before (`calculatePageBreaks`). `@page` gives continued pages the
  same 38px top margin as the preview. The page loads no CV data itself; the server injects it.
  Excluded from analytics (private path + AnalyticsProvider), marketing header (`none` context), robots.
- `generateCvPdf()` in `lib/pdf.ts` is used by `/api/pdf` (download) and `/api/pdf-preview` (final
  PDF view). Any error → legacy builder + `pdf_render_fallback` log; downloads cannot break on it.
- Origin: `PDF_RENDER_ORIGIN` or `http://127.0.0.1:$PORT` in production (container has PORT=3000).
- ATS: faded text uses `text-current/NN` instead of `opacity-NN` (opacity made Chrome emit
  transparency groups → text out of reading order); section-heading letter spacing capped at
  0.1em (above ~0.1em, extractors read "P R O F I L E"). Both apply to preview and PDF alike.

**Verified locally:** all 13 templates, PDF page count = preview page count (legacy: 6 differed);
visual side-by-side identical apart from clickable links being underlined; text extraction in
reading order, no spaced headings, same word count; links now include phone, LinkedIn, GitHub;
photo templates; fallback (renderer unreachable → valid legacy PDF); real download route and final
PDF view with `PDF_RENDERER=react` (local `.env.development.local`); production build and a
production-mode render via 127.0.0.1. QA scripts live outside the repo (`D:\DKPlayground\werkcv-qa`).

**Rollout (owner's OK needed):** deploy with `PDF_RENDERER` unset (no change), then set
`PDF_RENDERER=react` in `/opt/werkcv/.env` and recreate the app container; watch logs for
`pdf_render_fallback`. Customers then receive the design they chose; previously generated PDFs differ.
Not changed: agency/MatchPack PDFs (`lib/agency-submission-pdf.ts`).

## 14. Experiment: edit in place in Afronden (13 October 2026)

Owner: "let's try it; if it works fine we keep it, else we revert". One commit, so `git revert <hash>`
removes it completely.

**Research:** ResumAI and Rezi edit directly in the Finish Up preview (Rezi docs: "make edits
directly from the preview page or return to any section"), next to font/spacing controls and
Auto-Adjust; Enhancv calls its editor a "live editing canvas"; Kickresume, Resume.io and CVmaker.nl
use forms with a non-editable preview. Technical: React re-rendering a focused contenteditable
moves the caret; `contenteditable="plaintext-only"` has ~97% support (Firefox ≥136), so paste is
also forced to plain text; editable regions need role=textbox + an accessible name (WCAG 4.1.2).

**Built (steps mode, Afronden, desktop preview; toggle "Direct bewerken", default on, remembered in
localStorage `werkcv_inline_edit_v1`):**
- `app/editor/templates/inline-edit.tsx`: `<Editable>` renders the plain value unless an
  `InlineEditProvider` is present, so thumbnails, gallery, normal preview and PDF are unchanged
  (verified: identical PDF text and page counts for all 13 templates). Uncontrolled while focused
  (no caret jumps); Escape restores; Enter in a bullet adds one, Backspace on an empty bullet removes it.
- Editable: name, job title, profile, filled contact fields, role/company/location/dates/description
  of jobs, internships and education, bullets, skills, languages. Other sections stay click-to-edit
  via the steps (navigation is off while editing; toggle off restores it).
- `ScaledCvPreview editable`: one continuous document with "Pagina N" markers (the paginated view
  renders a copy per page, which would duplicate every field).
- Writes via `setValue` → same autosave as the forms. Analytics: `cta_clicked` with location
  `editor_inline_edit`, labels `toggle_on|toggle_off|first_edit`.
- Bullet/skill keys are now positional (text keys remounted the field on each keystroke).

**Verified:** 11/11 browser checks on a fictional CV (caret stays mid-word, Enter/Backspace bullets,
Escape, plain paste, autosave in the database, toggle off, no console errors).
Not done (phase 2/3): adding/removing whole entries in the page, a layout toolbar, mobile.
