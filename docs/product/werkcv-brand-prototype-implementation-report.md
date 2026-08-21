# WerkCV brand prototype implementation report

**Date:** 20 August 2026  
**Specification:** `docs/product/werkcv-brand-prototype-spec.md`  
**Status:** local 20-route rollout implemented; local visual review required before deployment

## Executive summary

The brand prototype has been extended into a controlled first rollout. Twenty
priority conversion, agency and English surfaces now share a calmer visual
language: Manrope typography, warm off-white surfaces, deep ink text,
restrained teal and yellow accents, soft depth, rounded surfaces and a floating
responsive header inspired by the compact rhythm of Dwight HQ.

The prototype preserves existing route, metadata, analytics and product
behaviour. It does not rebrand unrelated pages and does not change APIs,
database schemas, billing, MatchPack evidence rules or exports.

The rollout is ready for local visual review. The active authenticated
MatchPack state still needs a screenshot using the dedicated agency test
database before deployment approval.

## Implemented foundation

- Added `components/brand/BrandShell.tsx` as the opt-in boundary.
- Added `components/brand/BrandLogo.tsx`.
- Added `components/brand/SiteHeader.tsx` with desktop/mobile navigation,
  account context and primary action variants.
- Added `components/brand/primitives.tsx` for sections, cards, badges, buttons
  and product frames.
- Added scoped brand tokens, focus states, reduced-motion support, typography,
  spacing, surfaces, form treatment and responsive rules to
  `app/globals.css`.
- Added a `brand` footer variant while preserving the existing default footer.
- Added opt-in `brand` tones to `LanguageSwitcher` and `NavUserMenu`.
- Added Manrope through `next/font/google` with the existing Geist variable as
  a fallback. The production build completed successfully with the font
  embedded in the bundle.
- Added `components/brand/BrandRouteBoundary.tsx` to opt the first rollout
  routes into the shared shell without changing product behavior.
- Updated the shared header to a rounded, floating container with compact
  navigation, locale-aware links and a primary action.

## Route implementation

### Homepage `/`

- Replaced the local homepage header with the shared brand header.
- Added the scoped brand shell and brand footer.
- Reworked hero eyebrow, headline highlight, CTA hierarchy and trust pills.
- Preserved upload, drag-and-drop, loading, error, routing, analytics, metadata,
  JSON-LD, internal links, pricing claims and all existing content sections.
- Existing decorative and hard-shadow treatment is softened by the opt-in
  prototype layer.

### Candidate Proposal Evidence Checker

Routes:

- `/tools/kandidaatvoorstel-checker`
- `/en/candidate-proposal-checker`

- Added the shared shell and brand footer to both language routes.
- Replaced the checker-local header with the shared product-aware header.
- Restyled form controls, buttons, summary cards, evidence surfaces and CTA
  hierarchy.
- Preserved the fictional sample flow, text/file modes, validation, API payload,
  analytics events, source snippets, missing evidence, print behaviour, privacy
  copy, SEO metadata and guide content.

### MatchPack workspace `/agency/account/matchpack`

- Added the scoped brand shell and shared account-aware header.
- Preserved the account email, login redirect, billing gate and existing
  workspace layout.
- Routed workspace inputs through the shared prototype form treatment.
- The existing workspace state machine, permissions, quota, review steps,
  evidence controls, redaction wording, revisions, exports, deletion and
  outcome tracking were not rewritten.

## First 20-route rollout

The rollout is deliberately based on conversion intent, product discovery and
agency relevance rather than a claim about measured traffic ranking. Four
routes already used the brand shell; sixteen additional routes now receive the
shared Manrope typography and header through the route boundary:

1. `/`
2. `/templates`
3. `/cv-maken`
4. `/gratis-cv-maken`
5. `/online-cv-maken`
6. `/cv-voorbeelden`
7. `/cv-tips`
8. `/tools`
9. `/tools/ats-cv-checker`
10. `/tools/cv-score`
11. `/tools/cv-vacature-match`
12. `/tools/kandidaatvoorstel-checker`
13. `/prijzen`
14. `/agency`
15. `/agency/account/matchpack`
16. `/voor-bureaus`
17. `/voor-bureaus/kennisbank`
18. `/en`
19. `/en/templates`
20. `/en/candidate-proposal-checker`

The boundary supplies Dutch, English and agency-specific navigation. Legacy
page-local headers are hidden only inside the rollout boundary; page content,
metadata, forms, API calls and analytics remain owned by their original route.

## Shared-route impact

Intentional:

- The shared evidence-checker component changes both Dutch and English checker
  routes. Both routes were rendered successfully.
- The `Footer`, `LanguageSwitcher` and `NavUserMenu` APIs gained backward-
  compatible variants. Their default appearance remains unchanged elsewhere.

Not intentionally changed:

- No global body theme replacement.
- No consumer English homepage migration.
- No site-wide SEO/content page migration.
- No API, Prisma, billing, retention or document-output change.

## Verification results

| Check | Result | Notes |
|---|---|---|
| `npx tsc --noEmit` | Pass | TypeScript completed without errors. |
| Targeted ESLint | Pass | Touched brand, route and workspace files checked. |
| `npm run build` | Pass | All 538 generated static pages completed; build exited 0. |
| `npm run test:matchpack` | Pass | MatchPack submission smoke checks passed. |
| `npm run test:agency:unit` | Pass | 20 tests passed, 0 failed. |
| Public route smoke | Pass | Homepage and Dutch/English checker returned HTTP 200. |
| Signed-out MatchPack access | Pass | Returned 307 to `/login?next=%2Fagency%2Faccount%2Fmatchpack`. |
| Brand rollout visual smoke | Pass | Eight representative routes rendered at desktop and mobile with no horizontal overflow. |
| Active MatchPack E2E | Blocked | `AGENCY_TEST_DATABASE_URL` is not configured in this environment. |

The repository-wide `npm run lint` command was started but is unusually slow in
the current dirty workspace and did not produce a result within the review
window. Targeted ESLint completed successfully; run the full command again in a
clean CI environment before release.

## Visual QA inventory

Generated local screenshots:

- `output/brand-prototype/home-desktop.png`
- `output/brand-prototype/home-mobile.png`
- `output/brand-prototype/checker-empty.png`
- `output/brand-prototype/checker-sample-result.png`
- `output/brand-prototype/checker-mobile.png`
- `output/brand-rollout/home-desktop.png`
- `output/brand-rollout/agency-desktop.png`
- `output/brand-rollout/en-desktop.png`
- `output/brand-rollout/templates-mobile.png`

Reviewed findings:

- Homepage: coherent desktop and mobile hierarchy; product preview is the hero
  proof; no observed horizontal overflow.
- Checker: empty, sample-result and mobile states are readable; evidence status,
  source snippets and open points remain visually distinct; footer and CTA do
  not overpower the tool.
- MatchPack: only the signed-out state was available for a live route check.
  Active-state visual review remains a release follow-up.

## Known limitations and risks

1. The active authenticated MatchPack workspace still needs visual screenshots
   at 390px and 1440px using the disposable agency fixture.
2. Existing unrelated repository changes make a clean whole-worktree visual
   comparison impractical.
3. `npm install` reported existing dependency audit findings (38 advisories).
   No dependency source file was changed by this prototype.

## Recommendation

Open the local server and review the 20 routes in the rollout list, starting
with `/`, `/templates`, `/agency`, `/voor-bureaus` and `/en`. Capture the
authenticated MatchPack state with a disposable agency fixture. If those
screens are accepted, migrate the next page family through the same boundary
instead of redesigning routes independently.

No commit, push or deployment was performed.
