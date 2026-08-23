# WerkCV UX, navigation and product-shell remediation specification

**Executor:** GPT-5.6 Luna Max  
**Date:** 23 August 2026  
**Status:** complete implementation specification; not deployment authorisation  
**Repository:** `D:\DKPlayground\werkcv`  
**Products:** Personal CVs and WerkCV MatchPack

---

## 1. Mission

Make WerkCV feel like two clear, related products sharing one account and visual system:

1. **Personal CVs:** create, edit, pay for and download a personal CV.
2. **MatchPack:** create an evidence-linked candidate proposal or standalone agency CV in an authorised agency workspace.

The finished UI must answer without inference: Where am I? Which product am I using? What is the main action? What happens next? Where is my previous work? How do I switch products when entitled to both?

```text
Personal:
Start or upload -> five editor sections -> preview -> pay -> download

MatchPack:
Workspace -> new MatchPack -> source -> claims -> candidate facts ->
client copy -> output -> approval/export

Standalone agency CV:
Workspace -> new standalone agency CV -> edit -> review -> Agency export
```

This is an information-architecture, navigation, responsive-layout, accessibility and interaction correction. Preserve the server-enforced Personal/MatchPack boundary.

## 2. Audited problems to fix

Treat every item as a requirement:

1. The public header mixes marketing, account, workspace and CTA controls.
2. Active navigation is inconsistent for route families.
3. Mobile navigation lacks complete Escape, focus and close-after-navigation behaviour.
4. The shared footer has roughly 37 links and behaves like an SEO directory.
5. Dynamic public pages do not always inherit a footer.
6. Agency pages use a consumer footer dominated by Personal CV and salary links.
7. Home is roughly 13,000 mobile pixels and combines landing page, editor, catalogue, price, tools and SEO hub.
8. Templates delay the first selection on mobile and render too much preview content.
9. `/mijn-cvs` lacks useful search, sorting, naming, status and management.
10. Mobile editor hides the clear route back to the CV library.
11. Agency marketing has competing hero actions, excessive length and mixed `u/je/jullie` voice.
12. Agency screens do not clearly separate MatchPack from standalone agency CV.
13. Seven-step onboarding pushes core actions below the mobile fold.
14. MatchPack list precedes creation on mobile.
15. MatchPack is one long page rather than a staged workflow.
16. Agency settings are a kitchen-sink page.
17. Broad compatibility CSS is fragile.

## 3. Source-of-truth hierarchy

1. This specification for UX/navigation/hierarchy/responsiveness.
2. `docs/product/werkcv-personal-matchpack-workspace-spec.md` for identity, ownership, authorization, payment and workspace invariants.
3. `docs/product/agency-matchpack-production-closure-spec.md` for evidence, acknowledgement, approval, retention and export.
4. `docs/product/agency-production-readiness-spec.md` for remaining Agency rules.
5. Current server authorization and Prisma invariants.
6. Current design tokens/components when compatible.
7. Implementation reports only as historical evidence; re-run checks.

Security and data rules always beat presentation.

## 4. Luna Max operating protocol

### Before editing

1. Read this file, `AGENTS.md`, and all section 3 specifications completely.
2. Run `git status --short`, `git branch --show-current`, `git rev-parse HEAD`.
3. Record branch, commit and dirty-worktree summary in the section 29 report.
4. Preserve unrelated tracked/untracked work. Never reset, clean, delete or reformat it.
5. Derive page inventory from every `app/**/page.tsx`; do not trust an old count.
6. Classify every page through section 7.
7. Inspect every section 23 file before editing.
8. Search every use of `SiteHeader`, `Footer`, inline `<header>`, `NavUserMenu`, `AgencyAccountShell`, `WorkspaceSwitcher`, `BrandRouteBoundary`.
9. Capture baseline screenshots at section 25 viewports using only fictional/disposable authorised data.
10. Run and record `npm run lint`, `npm run build`, `npm run test:workspace:unit`, `npm run test:agency:unit`, plus available disposable-database checks.
11. Create `docs/product/werkcv-ux-navigation-remediation-implementation-report.md` before product edits.

Record pre-existing failures exactly. Do not attribute them to this programme.

### While implementing

- Follow section 24 phase order; test each phase before the next.
- Reuse Manrope, brand colours, radii, shadows and spacing tokens.
- Build explicit reusable components; add no broad route-wide descendant override.
- Server Components by default; client components only for interaction/browser APIs.
- Preserve runtime validation and safe login-return validation.
- Never infer workspace from email, account ownership, source marker or URL alone.
- Add no TODO, placeholder, fake testimonial, invented metric, skipped or assertion-free test.
- Use current factual copy or exact labels here; invent no claims.
- Log no CV, candidate, vacancy, proposal, filename or search content.
- Do not deploy or mutate production without separate authorisation.

### Stop conditions

Stop the affected phase and record it if a visual change conflicts with authorization/approved snapshots; a route is ambiguous; shared edits overwrite user work; a required target does not exist; schema/price change would be needed; one URL would show both products without server context; or testing requires unsafe production data. Never guess around a stop condition.

## 5. Locked product decisions

1. One identity/login serves both products.
2. Workspaces are **Personal CVs** and **MatchPack**.
3. `Agency` is a billing tier, not the product category.
4. `/mijn-cvs` is Personal home; `/agency/account` is MatchPack home.
5. Editor workspace is persisted/document-derived or explicit authorised creation intent.
6. Agency has one shared allowance; never imply 50 MatchPacks plus 50 CVs.
7. Current configured prices do not change.
8. Changed Dutch product copy uses `je/jouw`, never `u/jullie`.
9. Public pages have the correct public header/footer; applications have app header and no marketing footer.
10. Candidate review, embed, admin, API, icons, OG and visual test receive no public shell.
11. Profile photos and logout move into account menu.
12. Authenticated app screens do not show generic `Maak je CV` marketing CTAs.
13. Present two Agency jobs: `Nieuw MatchPack` (CV + vacancy -> evidence proposal) and `Nieuw los bureau-CV` (one agency-formatted CV without vacancy matching).
14. MatchPack is not an ATS, ranking engine, suitability score or client portal.
15. First mention is `versie zonder directe contactgegevens`; never anonymous or guaranteed anonymisation.
16. Header/footer variants belong to route families, never one-off pages.

## 6. Information architecture

### Personal public

Logo to locale home; `Templates`; `Voorbeelden/Examples`; `Gidsen/Guides`; `Tools`; `Prijzen/Pricing`; login or account; primary `Start gratis/Start free`.

### MatchPack public Dutch

Logo with MatchPack context; `Hoe het werkt` -> `/agency#hoe-het-werkt`; `Methodologie` -> `/voor-bureaus/methodologie/claim-evidence-benchmark`; `Kennisbank` -> `/voor-bureaus/kennisbank`; `Prijs` -> `/agency#plan`; login/account; `Start MatchPack` on `/agency`, otherwise `Bekijk MatchPack`.

### MatchPack public English

Use existing routes only: `Checker` -> `/en/candidate-proposal-checker`; `Methodology` -> `/en/agency/methodology/claim-evidence-benchmark`; `Pricing` -> `/en/pricing`; `Contact` -> `/contact`; login/account; `Open MatchPack` -> `/agency/account`. Do not create an English landing page here.

### Authenticated applications

Header contains logo, current product, eligible workspace switcher, product-local nav, at most one contextual primary action, account menu.

Personal: `Mijn CV's`; primary `Nieuw CV`; menu has email, `Profielfoto's`, allowed MatchPack destination/discovery, `Uitloggen`.

MatchPack: `Overzicht`, `MatchPacks`, `Inzichten`, `Instellingen`; primary `Nieuw MatchPack` except while already creating/editing; menu has email, `Persoonlijke CV's`, role, `Uitloggen`.

No marketing links in app headers.

## 7. Route-shell contract

| Context | Header | Footer | Notes |
|---|---|---|---|
| `personal_public` | Personal public | Personal public | default public |
| `matchpack_marketing` | MatchPack public | MatchPack public | B2B/evidence |
| `personal_app` | Personal app | none | private |
| `matchpack_app` | MatchPack app | none | private |
| `document_derived` | editor app | none | persisted/service context |
| `auth_derived` | minimal auth | none | validated destination |
| `private_external` | candidate shell | none | no third-party analytics |
| `embedded` | none | none | embed |
| `admin` | current admin | none | admin |
| `none` | none | none | API/metadata/visual test |

MatchPack marketing exceptions: `/agency`, `/agency/privacy`, `/voor-bureaus/**`, `/en/agency/**`, `/tools/kandidaatvoorstel-checker`, `/en/candidate-proposal-checker`. `/agency/account/**` is app and takes precedence.

No public shell for `/api/**`, `/admin/**`, `/embed/**`, `/chrome/**`, `/kandidaat/bevestigen/**`, `/agency/visual-test/**`, `/icon*`, OG/metadata endpoints.

Create a deterministic inventory test that enumerates every `app/**/page.tsx`, derives the family and fails on missing/multiple/forbidden classification. Explicitly prove `/cv-tips/[slug]`, `/cv-voorbeelden/[category]/[slug]`, `/en/guides/[slug]`, `/salaris/[slug]`, `/vaardigheden/[slug]` inherit Personal footer. Production uses family rules, not a hard-coded page list.

## 8. Shared shell architecture

```text
BrandRouteBoundary
  -> route context
  -> PublicSiteShell for public contexts
       -> SiteHeader(personal-public | matchpack-public)
       -> page body
       -> PublicFooter(personal | matchpack)
  -> children unchanged for application/private/excluded

PersonalAppShell -> SiteHeader(personal-app) -> application
AgencyAccountShell -> SiteHeader(matchpack-app) -> application
```

Create/refactor `PublicSiteShell.tsx`, `PublicFooter.tsx`, `SiteHeader.tsx`, `MobileNavigation.tsx`, `AccountMenu.tsx`, `PersonalAppShell.tsx`, and current `AgencyAccountShell.tsx`.

`BrandRouteBoundary` owns public shell. Public pages own body only. App shells own app header. No duplicate shared header/footer. Remove inline legacy header when touching a page rather than another hide selector. Untouched public legacy pages still get exactly one visible header/footer. `Footer.tsx` may temporarily re-export but final rendering has one footer source.

Audit broad `.wk-route-brand` overrides. Move changed-component styling to explicit classes and remove only proven-obsolete rules after visual evidence. Do not wholesale-delete compatibility CSS and add no new broad override.

## 9. Header contract

Use a discriminated mode:

```ts
type SiteHeaderMode =
  | "personal-public"
  | "matchpack-public"
  | "personal-app"
  | "matchpack-app"
  | "editor"
  | "minimal";
```

Header receives locale, pathname, server account/entitlements when available, allowed contextual primary action and optional editor/minimal back destination. Pages do not provide arbitrary marketing nav arrays.

Active matching is family-aware: `/cv-tips/**` -> Guides; `/cv-voorbeelden/**` -> Examples; `/tools/**` -> Tools except proposal checker -> MatchPack Checker; `/voor-bureaus/kennisbank/**` -> Knowledge base. Ignore query/hash. Exactly one `aria-current="page"` and a non-colour-only active style.

Signed out shows login using existing safe allowlist. MatchPack returns to `/agency/account` or safe MatchPack app destination. Do not broaden `next`.

Signed in replaces inline CV/profile/logout links with one account menu. Desktop may show truncated email; narrow says `Account`. Menu shows email as context; logout stays POST. Public auth loading reserves stable `aria-hidden` space.

Desktop >=1024: one row, non-shrinking logo, one-line nav, one CTA maximum, no more than seven top-level controls excluding logo. Long email never causes overflow.

Mobile replaces uncontrolled `details/summary` with controlled button/panel: `aria-expanded`, `aria-controls`; click/Enter/Space open; Escape, route change and link activation close; Escape returns focus; logical DOM; no focus trap because non-modal; one copy of CTA/account; 44x44 targets; no body overflow; logo/menu/context visible at 320.

Workspace switcher appears only when existing `WORKSPACE_SWITCHER_ENABLED` and server `switcherEligible` are true. Preserve pending/paused/expired and membership rules. UI never grants access.

## 10. Footer contract

### Personal Dutch

- Product: `CV maken` `/editor`; `Templates` `/templates`; `Prijzen` `/prijzen`.
- Inspiratie: `CV-voorbeelden` `/cv-voorbeelden`; `CV-tips` `/cv-tips`; `Gratis tools` `/tools`.
- Hulp: `Veelgestelde vragen` `/faq`; `Contact` `/contact`; `Over WerkCV` `/over-ons`.
- Juridisch: `Privacy` `/privacy`; `Voorwaarden` `/voorwaarden`.
- Taal: `English` `/en`.

### Personal English

- Product: `Build your CV` `/en/editor`; `Templates` `/en/templates`; `Pricing` `/en/pricing`.
- Resources: `CV examples` `/en/dutch-cv-examples`; `Guides` `/en/guides`; `Tools` `/tools`.
- Help: `FAQ` `/faq`; `Contact` `/contact`; `About` `/about`.
- Legal: `Privacy` `/en/privacy`; `Terms` `/en/terms`.
- Language: `Nederlands` `/`.

### MatchPack Dutch

- MatchPack: `Overzicht` `/agency`; `Hoe het werkt` `/agency#hoe-het-werkt`; `Prijs` `/agency#plan`.
- Bewijs: `Methodologie` `/voor-bureaus/methodologie/claim-evidence-benchmark`; `Kandidaatvoorstel-checker` `/tools/kandidaatvoorstel-checker`; `Handleiding` `/voor-bureaus/kennisbank/matchpack-handleiding`.
- Bureaus: `Kennisbank` `/voor-bureaus/kennisbank`; `Kandidaatbevestiging` `/voor-bureaus/kennisbank/matchpack-handleiding#kandidaatbevestiging`; `Agency-account` `/agency/account`.
- Vertrouwen: `Privacy, retentie en DPA` `/agency/privacy`; `Subverwerkers` `/agency/privacy#subverwerkers`; `Contact` `/contact`.
- Producten: `Persoonlijke CV's` `/`; `English` `/en/candidate-proposal-checker`.

Add the two stable anchors if absent; do not duplicate pages.

### MatchPack English

`Proposal checker` `/en/candidate-proposal-checker`; `Open MatchPack` `/agency/account`; `Pricing` `/en/pricing`; `Methodology` `/en/agency/methodology/claim-evidence-benchmark`; `Privacy and data processing` `/agency/privacy`; `Contact` `/contact`; `Personal CVs` `/en`.

Presentation: one-sentence description; no salary/SEO directory; semantic labelled groups; stacked mobile; legal always visible. Exactly one correct footer on public pages, none on app/private/excluded pages. Preserve discovery through hubs/body links.

## 11. Personal home

Order: header; hero; compact trust strip; three steps; at most three templates; focused benefits and one trust section; one pricing card; FAQ; final CTA; Personal footer.

Dutch hero: `h1` `Maak een professioneel CV voor Nederlandse vacatures.`; one sentence explaining free creation and one-time configured price at download; `Start gratis` -> `/editor?template=professional&startSource=home_hero_primary`; `Upload je CV` -> `/editor?template=professional&startSource=home_upload&upload=1`; `Bekijk templates` -> `/templates`. Use equivalent truthful English and `/en/editor` paths.

Remove the full editable builder from home. Replace with one compact non-editable existing preview, at most one page and three annotations. It accepts no data and creates no CV. Show at most three tools and three templates; move long SEO explanation to existing dedicated pages while keeping contextual links and accurate visible schema. One `h1`; primary begins within 600 CSS px at 375 width.

## 12. Templates

Within first 700 CSS px at 375 width: one `h1`, one short sentence, filters and a card with `Gebruik dit template`.

Recommended three first, then registry order. Filters `Alle`, `Modern`, `Klassiek`, `Creatief`, `ATS` only from real metadata. Card: thumbnail, name, one property line, preview and use actions. Body opens preview; use starts editor and preserves `startSource`. Public template selection stays Personal even for Agency owner unless explicit authorised Agency intent supplied.

Do not render full live CV per card. Use lazy bounded thumbnails; render full preview only when accessible dialog/drawer opens. Dialog has label, close, Escape, scroll containment and focus return. Hidden previews add no headings; exactly one page `h1`.

## 13. Pricing

Preserve purchase model/configured price. Mobile order: `h1`, one sentence, price, primary action, three inclusions, payment/no-subscription clarification, FAQ/detail. Price/action within 600 CSS px at 375 width. At most two badges. Move comparison SEO below decision or dedicated pages. Preserve accurate canonical, hreflang, Offer and FAQ data. Invent no claims.

## 14. Personal CV library

Use `PersonalAppShell`; context/`h1` `Mijn CV's`; primary `Nieuw CV`; no footer; Personal documents only.

Controls: title search; sorts `Laatst gewijzigd` default, `Nieuwste`, `Oudste`, `Naam A–Z`; language filter only if reliable stored language exists; reliable draft/payment/download badges only; 12 cards per page/batch. Validate query <=100 chars and enum values; never analyse search text.

Card: bounded accessible thumbnail; title fallback `Naamloos CV`; modified date; reliable state; `Verder bewerken`; authorised menu actions `Naam wijzigen`, `Dupliceren`, `Verwijderen`.

Rename trims to 1–80 chars, title only, inline errors/success. Duplicate uses central Personal service, cannot copy MatchPack here, creates unpaid Personal draft, `<original> – kopie` capped at 80, focuses/redirects new card. Delete uses central authorization and named confirmation accurately explaining permanence; remove after server success. Use existing `CVDocument.title`; no schema field or authorization bypass.

States: empty `Je hebt nog geen persoonlijke CV's` with New/Upload; no results with Clear filters; failure with retry and usable header; never leak another workspace.

## 15. Editor

Preserve five-section editor, preview, upload, templates, payment and persistence. At 320/375 show visible back, product/document context, save state and one next action. Personal back -> `/mijn-cvs`; Agency document back -> authorised origin from persisted context, never query. Icon may replace text but not the control/accessibility name.

Preserve unsaved-change guard. Personal keeps Personal payment even for Agency owner; MatchPack never shows Personal purchase CTA. No footer or horizontal overflow.

## 16. Agency landing

Positioning:

> MatchPack is the pre-send evidence and acknowledgement layer for recruitment agencies. It connects client-facing claims to source evidence, keeps missing information visible and lets a recruiter approve one controlled final version.

Never claim truth verification, identity proof, electronic signature, suitability/ranking, guaranteed GDPR compliance or ATS replacement.

Order: header; hero; how it works; two-job distinction; example; claim evidence; candidate acknowledgement; privacy/human control; pricing; FAQ; final CTA; MatchPack footer.

Hero primary `Start MatchPack` -> `/agency/account/matchpack`; secondary text `Bekijk een voorbeeld` -> `#voorbeeld`. Move free checker after evidence.

Two cards:

1. `Kandidaatvoorstel maken` — `CV + vacature -> bewijscontrole, kandidaatfeiten, klanttekst en gecontroleerde export.` CTA `Nieuw MatchPack`.
2. `Los bureau-CV maken` — `Eén kandidaat-CV opmaken in je bureau-template, zonder vacaturematching.` CTA `Nieuw bureau-CV`.

Explain both use the same existing Agency allowance; read configured value/rules and never hard-code conflict. Use `je/jouw`; Agency only for billing. Explain capabilities once. Mobile primary starts within 650 CSS px. Preserve legal qualifications/methodology.

## 17. MatchPack account overview

Mobile order:

1. Compact workspace heading/account state.
2. Actions `Nieuw MatchPack`, `Nieuw los bureau-CV`, and `Verder met laatste concept` only when one exists.
3. Genuine blocking alert if any.
4. Usage summary.
5. Compact onboarding.
6. Recent work.

When creation is allowed, `Nieuw MatchPack` begins within 700 CSS px at 375 width.

If retention blocks Agency creation, show a concise alert linked to `/agency/account/settings/privacy`. Personal creation remains unaffected. Never show raw JSON.

Replace expanded onboarding with `Je MatchPack-workspace instellen`, `X van Y voltooid`, progress bar, first incomplete action/CTA, and `Alle stappen bekijken` disclosure. Keep dismissal. Completion uses existing factual signals, not clicks unless the model explicitly defines them.

Separate `Recente MatchPacks` and `Recente bureau-CV's`, maximum five each, newest updated first, with `Alles bekijken`. Keep role-helper permissions.

## 18. MatchPack workspace

### Modes and list

Explicit **New** mode puts creation first; **Existing** mode puts selected workflow first. Selected ID may use existing support or validated `?id=<opaque id>`; server authorization remains mandatory.

Desktop >=1024: bounded left column, up to 25 proposals, local title/vacancy search without analytics, `Nieuw MatchPack` above, semantic selected state.

Below 1024: the full list never precedes form/workflow. Show a `MatchPacks` button/count opening an accessible drawer/dialog. Selection closes it and focuses workflow heading. `Nieuw MatchPack` remains near top.

### Creation form

Order: vacancy title; output language; CV file; vacancy text; privacy note; `Analyseer en maak concept`. Preserve limits, file types, origin/rate protection and error codes. Show field errors plus summary; never raw API JSON.

### Six stages

Present one stage at a time using a sticky or horizontally scrollable stepper:

1. `Bronnen` — CV, vacancy, source map, corrected source.
2. `Claims` — claim verifier, exact evidence, reviewer dispositions.
3. `Kandidaatfeiten` — changing facts and acknowledgement.
4. `Klanttekst` — introduction and accompanying email.
5. `Uitvoer` — full/reduced PDF and DOCX previews.
6. `Goedkeuring` — gates, acknowledgement/override, digest, export.

Each stage shows factual `Niet gestart`, `Actie nodig`, `Gereed` or `Vergrendeld`; unresolved count; one next action; previous/next where allowed; concise blocker reason. Navigation is presentation and never bypasses gates.

Edits that invalidate later work immediately mark affected stages `Actie nodig`, explain the affected state, never reuse stale acknowledgement, and preserve immutable revision/event history.

Output labels are `Volledig voorstel` and `Versie zonder directe contactgegevens`, with this adjacent persistent warning:

> Directe contactgegevens worden verwijderd. Controleer bedrijfsnamen, scholen en projectdetails voordat je dit met een klant deelt.

Never call the output anonymous, anonymised or safe without recruiter review.

## 19. Agency settings

Create real nested routes:

```text
/agency/account/settings/organisation
/agency/account/settings/templates
/agency/account/settings/team
/agency/account/settings/privacy
/agency/account/settings/data
```

Authenticated `/agency/account/settings` redirects to organisation; safe login return remains.

Shared layout: `h1` `Instellingen`, one sentence, accessible current secondary nav, role-aware content, save status/errors. Mobile uses horizontally scrollable tabs or labelled select without body overflow. Browser Back/Forward changes real routes.

Responsibilities:

- **Organisatie:** legal/display name, privacy URL, supported brand/logo and contact fields.
- **Templates:** existing reusable template, colour/logo/export defaults and preview.
- **Team:** members, roles, invitations and clear role descriptions.
- **Privacy en retentie:** retention state/selection, what is deleted and when, DPA/subprocessor/privacy links, no compliance guarantee.
- **Import en export:** CSV import/export, formats/limits, data export/deletion; `Gevarenzone` at bottom.

Move current controls/handlers; add no fields, integrations or duplicate state. Every setting appears once. Server role checks remain authoritative.

## 20. Language glossary

| Use | Do not use as product language |
|---|---|
| MatchPack | Agency Plan, ATS replacement |
| Agency-abonnement / Agency billing | MatchPack when referring only to billing |
| Persoonlijke CV's | ordinary/consumer CVs |
| Los bureau-CV | MatchPack CV, anonymous CV |
| Kandidaatbevestiging | consent, signature, identity verification |
| Bevestigde/gecorrigeerde informatie | verified truth |
| Versie zonder directe contactgegevens | anonymous/redacted CV |
| Bewijs uit het CV | proof candidate is truthful |
| Niet onderbouwd | false/lying |
| Menselijke controle | AI guarantee |

Tone is direct, calm, specific and helpful: no neediness, hype, urgency, unsupported metric or compliance claim.

## 21. State, authorization and errors

Presentation follows server truth: route/persisted resolver determines workspace; read-only entitlements determine visibility; central authorization and role helpers determine actions; query parameters select views only after validation.

Map at least these codes to plain in-context messages and one recovery action: `AUTH_REQUIRED`, `CV_NOT_FOUND`, `CV_WORKSPACE_FORBIDDEN`, `ROLE_FORBIDDEN`, `MATCHPACK_SNAPSHOT_LOCKED`, `PERSONAL_CHECKOUT_REQUIRED`, `WORKSPACE_MIGRATION_REQUIRED`, `RETENTION_POLICY_REQUIRED`, `INVALID_ORIGIN`, validation, size, parsing, rate-limit and network errors.

APIs retain machine-readable JSON; pages translate it. Never expose raw JSON, record ownership, stack/provider output or candidate content. Unknown errors use neutral wording and a content-free correlation ID only if existing infrastructure supports it.

## 22. Analytics

Use the existing abstraction/vendor only. Allowed new aggregate events:

- `public_navigation_selected`: locale, shell, destination family.
- `public_primary_cta_selected`: page family, CTA enum.
- `account_menu_opened`: shell.
- `workspace_switcher_opened` / `workspace_selected`: workspace kind only.
- `cv_library_search_used`: result-count bucket, never query.
- `cv_library_sort_changed`: enum.
- `matchpack_stage_viewed`: stage/status.
- `agency_primary_action_selected`: action enum.
- existing onboarding events with step ID only.

Never send email, user/CV/MatchPack ID, title, vacancy, query, candidate or proposal content. Add no analytics to candidate-review, embed or private-token routes.

## 23. File-level map

### Shared

Inspect/update:

- `app/layout.tsx`.
- `components/brand/BrandRouteBoundary.tsx`.
- `components/brand/SiteHeader.tsx`.
- `components/Footer.tsx`.
- `components/NavUserMenu.tsx`.
- `components/workspace/WorkspaceSwitcher.tsx`.
- `lib/workspace/route-context.ts`.
- `lib/workspace/types.ts`.
- `app/globals.css`.

Expected new components: `components/brand/PublicSiteShell.tsx`, `components/brand/PublicFooter.tsx`, `components/brand/MobileNavigation.tsx`, `components/account/AccountMenu.tsx`, `components/personal/PersonalAppShell.tsx`.

### Personal

Inspect/update `app/page.tsx`, `components/HomePageClient.tsx`, `app/en/page.tsx` and its relevant component, `app/templates/page.tsx`, `app/en/templates/page.tsx`, `app/prijzen/page.tsx`, `app/en/pricing/page.tsx`, `app/mijn-cvs/page.tsx`, `app/mijn-cvs/CvGrid.tsx`, `app/editor/page.tsx`, `app/editor/editor.tsx`, `app/en/editor/page.tsx`, and central CV services/actions for rename/duplicate/delete.

### MatchPack

Inspect/update `app/agency/page.tsx`, `app/voor-bureaus/page.tsx`, `app/agency/privacy/page.tsx`, `app/agency/account/page.tsx`, `app/agency/account/matchpack/page.tsx`, `app/agency/account/settings/page.tsx`, `components/agency/AgencyAccountShell.tsx`, `AgencyOnboardingChecklist.tsx`, `AgencyDraftResume.tsx`, `AgencyMatchPackWorkspace.tsx`, `AgencySettingsPanel.tsx`.

Expected extractions: `AgencyPrimaryActions.tsx`, `AgencyOnboardingNextStep.tsx`, `MatchPackListDrawer.tsx`, `MatchPackStageNavigation.tsx`, `MatchPackStageStatus.tsx`, `agency/settings/AgencySettingsLayout.tsx`, section components and nested pages. Names may vary only if an existing component already owns the responsibility; do not duplicate abstractions.

### Tests and scripts

Add:

- `scripts/ux-navigation-contract.test.ts`.
- `scripts/ux-navigation-e2e.ts`.
- optional `scripts/ux-accessibility-smoke.ts` if E2E cannot cover it cleanly.
- section 29 implementation report.

Add package scripts:

```json
"test:ux:navigation": "npx tsx --test scripts/ux-navigation-contract.test.ts",
"test:ux:e2e": "npx tsx scripts/ux-navigation-e2e.ts",
"test:ux:release": "npm run test:ux:navigation && npm run test:workspace:unit && npm run test:agency:unit && npm run build && npm run test:ux:e2e"
```

Existing browser tooling may be reused, but these entry names remain stable.

## 24. Implementation phases

### Phase 0 — Baseline

Complete section 4, route report, signed-out/signed-in fictional screenshots, page height/first-action/overflow baseline. Exit: report exists; no product code changed.

### Phase 1 — Shared shells

Implement route exceptions, public shell/footer variants, explicit header modes, accessible mobile/account menus, entitlement integration, duplicate-shell removal, route tests and obsolete compatibility CSS removal. Exit: every public dynamic page has one correct shell; app/excluded pages do not.

### Phase 2 — Personal path

One page and test cycle at a time: home, templates, pricing, CV library, editor mobile, English equivalents. Exit: public-to-editor and returning-user journeys are clear; Agency access does not alter Personal creation/payment.

### Phase 3 — MatchPack public/account

Agency hierarchy/copy, B2B footer/nav, first-viewport actions, compact onboarding, recent-work split, retention recovery. Exit: UI distinguishes MatchPack and standalone CV; actions precede setup detail.

### Phase 4 — MatchPack stages

New/Existing modes, desktop list/mobile drawer, creation hierarchy/errors, six stages/status/invalidation/output warning. Exit: evidence, acknowledgement, approval, revision and export tests pass; no visual bypass.

### Phase 5 — Settings

Nested routes/layout, move controls without duplicate state, preserve roles/APIs, redirect old URL, test deep links/history/mobile. Exit: every current setting exists once with unchanged persistence/authorization.

### Phase 6 — Hardening

Viewport, keyboard, screen-reader, footer coverage, performance, full release tests, screenshot comparison, dead code/style cleanup and report. Exit: section 28 passes. Deployment remains unauthorised.

## 25. Responsive and accessibility matrix

Test: 320x700, 375x812, 768x1024, 1024x768, 1440x1000.

Representative routes/states:

- `/` signed out and signed in.
- `/templates`.
- one dynamic `/cv-tips/[slug]`.
- `/prijzen`.
- `/mijn-cvs` with 0, 1 and at least 25 fictional Personal CVs.
- `/editor` new and existing Personal.
- `/agency`.
- `/tools/kandidaatvoorstel-checker`.
- `/agency/account` active, retention-required, no-plan and viewer.
- MatchPack new, unresolved claims, acknowledgement pending and approved.
- every settings section as owner and viewer.
- candidate confirmation route to prove public-shell exclusion.

For each:

- `document.documentElement.scrollWidth <= document.documentElement.clientWidth`.
- No clipped heading, form, button, dialog or nav.
- Primary body/form text >=14px; meta/legal may be 12px with sufficient contrast.
- Touch targets >=44x44 or equivalent safe spacing.
- Visible, unclipped focus.
- Sticky UI does not cover focus.
- 80-character email/title/company/vacancy wraps/truncates without widening page.
- Desktop works at 200% zoom.
- Exactly one `h1`; logical heading order.
- Distinct navigation landmark names.
- `aria-current` on current navigation.
- Programmatic form labels/descriptions/errors.
- Menus, disclosures, dialogs and tabs meet keyboard contracts.
- No colour-only state.
- Loading live regions do not chatter.
- Preview internals are hidden or represented by one concise description.

## 26. Performance and SEO

- Do not initially render all full template/CV previews; lazy-load non-critical previews.
- Public shell cannot block body on auth fetch; reserve stable space when enriched client-side.
- Add no UI library or app-only bundle to content pages; minimize client boundaries.
- Record production-build Lighthouse environment/results; targets LCP <=2.5s, CLS <=0.1. Never call local values field performance.
- Compare bundles; explain route growth above 20 KB compressed or 10%.
- Preserve canonical, hreflang and accurate FAQ/Product/Offer/Dataset/methodology schema.
- Keep no invisible text solely for schema.
- Footer reduction must not orphan `/tools`, `/cv-tips`, `/cv-voorbeelden`, Agency knowledge, methodology, privacy or pricing.
- Keep app/private indexability unless a defect is proven.
- Dynamic public pages include footer in rendered HTML.
- Exactly one shared header/footer in DOM.

## 27. Verification commands

Run in order:

```text
npm run lint
npm run test:ux:navigation
npm run test:workspace:unit
npm run test:agency:unit
npm run build
npm run test:ux:e2e
```

With disposable production-compatible database:

```text
npm run test:workspace:integration
npm run test:workspace:e2e
npm run test:agency:integration
npm run test:agency:migrations
npm run test:agency:e2e
npm run test:matchpack
npm run test:agency:outputs
```

Then `npm run test:ux:release`. Never target production. Build is not a substitute for DB/browser/accessibility/export. Visually inspect full and contact-reduced PDF/DOCX with fictional/authorised data.

## 28. Definition of done

### Global/navigation/footer

- [ ] Every route has exactly one shell classification.
- [ ] Personal public, MatchPack public, Personal app and MatchPack app are clear.
- [ ] Dynamic active navigation works.
- [ ] Mobile menu keyboard/Escape/navigation-close works.
- [ ] Profile/logout no longer crowd primary header.
- [ ] Workspace switcher rules remain unchanged.
- [ ] Every public route has exactly one correct inherited footer.
- [ ] Footer links exactly match section 10.
- [ ] No app/private route has marketing footer.
- [ ] Agency no longer shows consumer salary/SEO footer.

### Personal

- [ ] Home follows section 11; no embedded full editor.
- [ ] Home start/upload paths work.
- [ ] Templates select within first mobile viewport and avoid preview fan-out.
- [ ] Pricing puts price/action first.
- [ ] CV library handles required actions/states without MatchPack leakage.
- [ ] Mobile editor has visible correct exit and preserves payment/workspace rules.

### MatchPack

- [ ] One hero primary and clear two-job distinction.
- [ ] Changed Dutch uses `je/jouw`.
- [ ] Account actions precede onboarding.
- [ ] Retention error gives exact recovery, never raw JSON.
- [ ] Mobile list does not precede form/workflow.
- [ ] Six stages use real state, counts and invalidation.
- [ ] Approval/evidence/acknowledgement cannot be bypassed.
- [ ] Reduced output is not called anonymous.
- [ ] Settings split exactly as section 19.

### Quality

- [ ] No overflow at required widths.
- [ ] One `h1`, valid landmarks, focus, contrast, targets and zoom pass.
- [ ] No invented claims, metrics or testimonials.
- [ ] No new broad compatibility override.
- [ ] Applicable deterministic, DB, E2E, output and visual gates pass.
- [ ] Every deviation recorded; nothing passed without evidence.

## 29. Required implementation report

Create `docs/product/werkcv-ux-navigation-remediation-implementation-report.md` with exact sections:

1. `Starting state` — branch, commit, dirty files, baseline.
2. `Route classification` — shell counts/exceptions.
3. `Decisions implemented` — decision to code mapping.
4. `Files changed` — responsibility per file.
5. `Compatibility CSS` — removed/retained and why.
6. `Personal journey` — before/after and screenshots.
7. `MatchPack journey` — state-level before/after and screenshots.
8. `Responsive evidence` — route/state/viewport, overflow, first-action position.
9. `Accessibility evidence` — keyboard, headings, landmarks, dialogs, menus, errors.
10. `Authorization regression evidence` — ownership, payment, retention, roles.
11. `Performance and SEO evidence` — bundle, Lighthouse environment/results, metadata/links.
12. `Commands run` — exact command, exit code, result.
13. `Deviations and unresolved risks`.
14. `Deployment status` — `Not authorised by this specification` unless separately authorised.

Screenshot names identify route, state and viewport and contain no real customer/candidate data.

## 30. Explicit non-goals

Do not implement: price/allowance change; Prisma model/migration; new auth; ownership/backfill redesign; ATS integration; client portal; multi-candidate ranking/comparison; AI generator; new template family; new settings field; logo/colour/font rebrand; rewrite of all page bodies; removal of valid dedicated long-form content; new analytics/session replay/ads; deployment, production migration or communication.

A necessary security/authorization defect fix must be separately recorded and regression-tested.

## 31. Luna Max final handoff

Final response order:

1. One-sentence outcome.
2. Link to implementation report.
3. Completed phases.
4. Verification pass/fail summary.
5. Failed/unavailable gates stated plainly.
6. Deviations.
7. Deployment status.

Do not say `production ready`, `fully tested` or `complete` unless every applicable section 28 item has evidence and every available required test is green. If work remains, name exact specification section, route/file and next safe action.

## Appendix A — Exact destinations and implementation contracts

This appendix is normative and has the same priority as the numbered sections.

### A.1 Exact primary destinations

Use these destinations and attribution values:

| UI action | Destination |
|---|---|
| Personal public `Start gratis` | `/editor?template=professional&startSource=public_header` |
| English public `Start free` | `/en/editor?template=professional&startSource=english_public_header` |
| Personal app `Nieuw CV` | `/editor?template=professional&startSource=my_cvs_new` |
| Personal app `CV uploaden` | `/editor?template=professional&startSource=my_cvs_upload&upload=1` |
| Agency `Nieuw MatchPack` | `/agency/account/matchpack` with no selected `id` |
| Agency `Nieuw los bureau-CV` | `/editor?template=professional&startSource=agency_plan&workspace=agency` |
| MatchPack marketing login/start | existing login flow with safe final destination `/agency/account/matchpack` |
| Retention recovery | `/agency/account/settings/privacy` |

The home hero keeps the more specific `home_hero_primary` and `home_upload` values from section 11. Page-specific existing `startSource` values remain when they are more specific than the shared-header values. Do not rename existing analytics attribution values outside changed links.

`Verder met laatste concept` is server-derived:

- latest unfinished MatchPack -> `/agency/account/matchpack?id=<authorised id>`;
- latest unfinished standalone agency CV -> `/editor?id=<authorised id>`;
- compare `updatedAt`; never use title, source marker or browser state;
- show no button when the user cannot edit the result;
- never include a Personal CV in this Agency resume decision.

### A.2 Account menu and workspace switcher interaction

Implement both as controlled disclosure navigation, not ARIA `menu` widgets:

- trigger is a `button` with `aria-expanded` and `aria-controls`;
- panel contains ordinary links and buttons in normal Tab order;
- Escape closes and returns focus to the trigger;
- outside pointer activation and route change close it;
- activating a link closes it;
- opening account menu closes workspace switcher and vice versa;
- no focus trap because neither is modal;
- logout stays disabled while pending, redirects only after successful server response, and shows a neutral retryable error on failure;
- workspace options are links only and never mutate or convert a document;
- panel placement flips/clamps within the viewport and cannot widen the body;
- at 320 pixels, panel width is `min(remaining viewport, configured maximum)` with at least 16 pixels of viewport inset.

Public signed-in account contents:

1. email as non-interactive context;
2. `Mijn CV's` / `My CVs` always;
3. `MatchPack` only when entitlement supplies a workspace; otherwise `Ontdek MatchPack` / `Discover MatchPack` as a clearly marketing-labelled link;
4. `Profielfoto's` / `Profile photos` only in Personal public context;
5. `Uitloggen` / `Log out`.

Application account contents follow section 6 and must not duplicate the current product's primary navigation.

### A.3 Personal library server contract

Create or extend one server service with an equivalent contract:

```ts
type PersonalCvLibrarySort =
  | "updated_desc"
  | "created_desc"
  | "created_asc"
  | "title_asc";

type PersonalCvLibraryQuery = {
  query: string;
  sort: PersonalCvLibrarySort;
  cursor?: string;
  limit: 12;
};
```

Rules:

- session supplies `userId`; browser never supplies an owner;
- query always contains `agencySubscriptionId: null` and actor ownership;
- trimmed title search is case-insensitive, maximum 100 characters;
- default sort is `updatedAt desc, id desc`;
- every sort has a stable opaque cursor/tie-breaker;
- cursor is validated and cannot inject arbitrary ordering;
- return only card/list fields, never entire CV JSON when not required for the thumbnail;
- rename, duplicate and delete re-run central authorization on the server;
- mutation returns a discriminated success/error result with stable existing workspace codes;
- invalidate/revalidate only Personal library paths after success.

If the current thumbnail requires full CV data, create a bounded preview projection containing only the existing safe fields required by the renderer. Do not return MatchPack metadata to the browser.

### A.4 MatchPack stage state contract

Create one pure presenter, for example `deriveMatchPackStagePresentation`, rather than calculating badges independently across components:

```ts
type MatchPackStageId =
  | "source"
  | "claims"
  | "candidate_facts"
  | "client_copy"
  | "output"
  | "approval";

type MatchPackStagePresentation = {
  id: MatchPackStageId;
  status: "not_started" | "action_required" | "complete" | "locked";
  unresolvedCount: number;
  blockingReasonCodes: string[];
  canOpen: boolean;
};
```

Rules:

- consume existing saved revision, verifier, acknowledgement and approval selectors; do not duplicate or weaken domain rules;
- `unresolvedCount` counts existing actionable items only and never becomes a score;
- `canOpen` controls presentation only; every operation re-authorizes;
- approved immutable content remains viewable but locked for editing;
- invalidation comes from existing digest/revision rules, not a client-side dirty flag alone;
- a stale acknowledgement can never produce `complete` for current candidate facts/approval;
- unresolved unsupported/contradicted claims can never produce complete approval;
- role restrictions can lock an editing action without hiding readable evidence.

Feature flags are mandatory inputs:

- when `PROPOSAL_CLAIM_VERIFIER_ENABLED` is false, omit the `Claims` stage from navigation and preserve the currently valid approval contract; never fake a completed claim review;
- when enabled, show and enforce the Claims stage using current domain rules;
- `Kandidaatfeiten` always exists for recruiter-entered facts;
- when `CANDIDATE_ACKNOWLEDGEMENT_ENABLED` is false, omit acknowledgement controls and preserve the currently valid approval contract;
- when enabled, show acknowledgement state and enforce its current gates;
- UI refactoring must not toggle either flag or change defaults.

### A.5 AI and privacy boundary

This programme adds no AI call and changes no prompt/model. The staged UI displays already produced claim-verification data. It must not re-run AI merely because a user opens, closes or changes stages. Existing invalidation/re-run rules remain the only trigger.

Public auth/navigation analytics and library controls must not send user-entered text. Candidate confirmation keeps its existing `no-store`, no third-party analytics, token/session, referrer and CSP protections. Public shell code must return children unchanged for that family so no header script or analytics provider is introduced by this work.

### A.6 No-assumption decision rule

When implementation discovers an unlisted UI state:

1. determine whether existing server/domain code already defines it;
2. if yes, represent that state without changing its meaning and document it;
3. if no and the choice affects permissions, money, retention, approval, deletion, public claims or product scope, stop and request a product decision;
4. if no and it is purely presentational, use existing WerkCV tokens/patterns, add a test, and document the decision;
5. never resolve ambiguity by exposing more access, treating missing data as complete, or showing an unsupported marketing claim.
