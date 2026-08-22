# Agency brand rollout completion report

**Date:** 21 August 2026  
**Scope:** all `/agency` product and account routes  
**Status:** implemented locally; not committed or deployed

## Outcome

The public MatchPack landing and privacy pages, plus the authenticated Agency
overview, MatchPack workspace, insights and settings screens, now use one
WerkCV visual system. The rollout applies Manrope, the floating WerkCV header,
route-aware navigation, calm off-white surfaces, restrained teal/yellow
accents, soft borders and radii, consistent controls and responsive product
layouts.

No billing, quota, permissions, evidence, approval, retention, export,
deletion, analytics or API behaviour was changed.

## Route coverage

- `/agency`
- `/agency/privacy`
- `/agency/account`
- `/agency/account/matchpack`
- `/agency/account/insights`
- `/agency/account/settings`

## Shared implementation

- Added `components/agency/AgencyAccountShell.tsx` for authenticated navigation,
  account context and the scoped brand boundary.
- Added an optional active-route state to `components/brand/SiteHeader.tsx`.
- Extended the Agency detection in `BrandRouteBoundary` to cover privacy.
- Added dedicated Agency application, workspace, settings, insights, privacy
  and marketing styles to `app/globals.css`.
- Added stable presentation hooks to the MatchPack workspace, onboarding,
  browser-draft and settings components without changing their state handlers.

## Visual verification

Public desktop and 390px mobile screenshots were captured for `/agency` and
`/agency/privacy`. Both routes showed:

- Manrope inside the scoped brand shell;
- exactly one visible shared header;
- the expected H1;
- no document-level horizontal overflow.

The privacy processor table remains horizontally scrollable on narrow screens
and now includes a visible mobile instruction.

Screenshot directory: `output/agency-brand-qa/`.

Authenticated active-state screenshots remain blocked because
`AGENCY_TEST_DATABASE_URL` is not configured. The guarded E2E test correctly
refused to use another database. Signed-out account access still redirects to
`/login?next=%2Fagency%2Faccount`.

## Verification

- `npx tsc --noEmit`: pass.
- Targeted ESLint for every changed TS/TSX file: pass.
- `npm run build`: pass; all 538 static pages generated.
- `npm run test:agency:unit`: pass; 20/20.
- `npm run test:matchpack`: pass.
- `npm run test:agency:outputs`: pass for full/contact-free PDF and DOCX.
- `npm run test:agency:e2e`: blocked by the required disposable database guard.
- Full `npm run lint`: produced no diagnostics but did not finish after more
  than five minutes; it was stopped after the targeted lint had passed.

## Release recommendation

The code is suitable for local user review. Before deployment, visually inspect
one active fictional MatchPack at desktop and mobile using the dedicated test
database, then rerun the guarded E2E test. Do not use production candidate data
for that design check.
