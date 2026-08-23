# WerkCV UX, navigation and product-shell remediation — implementation report

Date: 23 August 2026

## Delivered

### Shared product shells
- Added route classification for Personal public, MatchPack marketing, Personal app, MatchPack app, document-derived and private candidate routes.
- Added the shared public shell with one responsive header, mobile navigation, account menu and product-aware footer.
- Added a Personal application shell for Mijn CV's and retained the Agency MatchPack shell.
- Root and dynamic public route families inherit the shared shell through the root boundary.

### Navigation and footer
- Replaced the long footer directory with a compact, product-aware footer.
- Personal and MatchPack footers have separate labels and links.
- Added keyboard-safe account and workspace disclosures with Escape, click-away and expanded-state handling.
- Legacy page-owned footers are de-duplicated while pages migrate.

### Personal CV workflow
- Added clear Personal workspace framing.
- Added search, sort, twelve-item progressive loading, rename, duplicate and delete actions.
- Personal library data already excludes Agency documents.
- Added a clear route to MatchPack without mixing workspaces.

### Agency account workflow
- Added first-viewport actions for New MatchPack, New bureau CV, and Continue work or view the example.
- Changed onboarding to a focused next-step panel with an expandable route.
- Updated the retention CTA to the dedicated privacy/retention route.

### Agency settings
- Added stable routes: /agency/account/settings/privacy, /agency/account/settings/templates, /agency/account/settings/team and /agency/account/settings/data.
- Reused the existing authorized settings panel and focused the relevant section instead of duplicating data logic.
- Added stable team and data anchors and stabilized the settings loader.

### MatchPack workspace and checker
- Added a mobile disclosure for existing MatchPacks while preserving the desktop list and open behavior.
- Added mobile overflow safeguards for Agency grids and long Dutch headings.
- Removed duplicate checker headers so public checker routes use the shared MatchPack shell.
- Removed the embedded public editor from the homepage and removed duplicate checker footers.

## Verification

Passed: TypeScript with npx tsc --noEmit --pretty false; workspace unit suite 6/6; Agency unit suite 20/20; targeted ESLint for changed UX/shell/workflow files; production build; static generation 551/551.

The production build emitted a non-fatal dynamic-font download warning for one generated page and still completed successfully.

Full repository lint still exits non-zero because of eight pre-existing CommonJS errors in the WordPress sandbox, pilot script and WordPress build configs. It also reports legacy image and unused-variable warnings outside this change.

## Human browser acceptance still required

- Test 320px, 375px, 768px and desktop widths.
- Test Personal header to Templates to editor and confirm a Personal CV is created.
- Test Agency account to New bureau CV and New MatchPack and confirm workspace permissions.
- Test all four nested settings URLs and confirm they focus the intended section.
- Test the mobile MatchPack disclosure, account menu, logout, Escape and click-away behavior.
- Confirm the checker has one header and one footer and Agency has no horizontal scrollbar at 375px.

This implementation was not deployed or committed.
