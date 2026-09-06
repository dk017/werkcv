# WerkCV editor conversion remediation — implementation report

Date: 2026-08-26

This report records the implementation state against
`werkcv-editor-conversion-remediation-spec.md`. It is not a production-readiness
claim: browser, disposable-PostgreSQL, and final visual gates remain pending.

## Baseline and authorization

The worktree was already dirty. Existing unrelated changes and untracked files
were preserved. No production migration or backfill was run; no email, commit,
push, or deployment was performed.

## Write-path inventory

- `app/editor/editor.tsx`: manual, debounced auto-save, upload/import, and
  download saves pass bounded sources to `updateCV`.
- `app/actions.ts`: `updateCV` validates/authorizes and delegates to the
  transactional meaningful-state service. Legacy `createCV` initial data uses
  the same service.
- `app/api/public/cv/claim/route.ts`: claimed consumer and explicit Agency
  public-editor drafts use a workspace-scoped unique claim key. Meaningful
  state is included in the atomic document create, concurrent requests
  converge on the same document, and retries repair data/event persistence.
  Anonymous drafts themselves remain untracked until a claim.
- `app/api/ats-rewrite/route.ts`: rewritten CV JSON uses the same service.
- `createPersonalCvDocument`: creates a blank document; database defaults keep
  meaningful state false.
- Anonymous public drafts never emit the durable authenticated event; a claimed
  draft does. Cover-letter writes update cover-letter fields only, not CV JSON.

## Implemented changes

### Shared section contract

`lib/cv-sections.ts` now owns all twelve body IDs, normalization, substantive
presence, layout lanes, labels, and lane-local movement. React templates use
`app/editor/templates/section-layout.tsx` and a shared structural renderer,
while each of the thirteen wrappers owns a distinct visual profile and its
actual styled section markup. The PDF uses the same resolver and emits
section/lane markers. Right-sidebar templates
render main content before the sidebar, and identity/contact/photo content is
not duplicated. Skills and Languages are separate blocks. Properties,
References, Side activities, and Custom sections are independently represented
and rendered when substantive.

`SectionOrderPanel` shows one list for single-column/ATS layouts and separate
Main/Sidebar lists for two-column layouts. Empty lanes are not shown.

### Blank and preview behavior

`lib/cv-empty.ts` is used by the editor and template chooser. It checks every
personal string (including links and photo) plus every body family and nested
content. Identity-only, photo-only, highlight-only, custom-item-only, and
optional-only content replaces fictional preview data immediately.

The mobile preview is a native modal dialog that focuses inside the overlay,
contains Tab focus, handles Escape, restores the trigger, locks background
scrolling, and marks background siblings inert. Its trigger, close control and
footer actions meet the 44px touch-target contract. Consumer mobile widths do
not mount the hidden desktop renderer. Exact PDF preview has no React fallback;
loading/ready/error states are explicit, Retry is available, responses are
private/no-store, and a completed-CV download is disabled until exact rendering
is ready.

### Durable meaningful state

The additive migration adds `CVDocument.hasMeaningfulContent` (default false),
`meaningfulContentAt`, bounded `meaningfulContentSignals`, an index, and a
nullable unique `AnalyticsEvent.dedupeKey`.

`lib/cv-meaningful-persistence.ts` saves validated data, conditionally performs
the first transition, and upserts one content-free schema-version-2 event in a
single transaction. Signals use `profileSummary`, experience, education,
skills, languages, and otherSections. State never reverts and concurrent saves
cannot create a second event.

`scripts/cv-meaningful-backfill.ts` is dry-run by default, cursor-batched,
consumer-only, content-free in output, and creates no historical events. Execute
mode changes `updatedAt` through Prisma's normal `@updatedAt` behavior; review
that before any authorized run.

Both follow-up implementations query durable `hasMeaningfulContent`; the raw
SQL excludes meaningful/Agency records, prior sends, recent inbound replies,
and internal/test addresses before `LIMIT`, preventing newer excluded records
from starving older eligible users.

## Schema and compatibility

Migration: `prisma/migrations/20260826000000_cv_meaningful_content_state`.
It has not been executed. `npm run db:generate` and `npx prisma validate`
passed. Legacy missing/partial/duplicate/invalid/eight-ID section orders
normalize deterministically without rewriting stored CV JSON during reads.

Final placement is: single-column/ATS all visible sections in normalized main
order; two-column templates keep Skills/Languages/Interests in the registry
sidebar lane and all other sections in the main lane.

## Verification

Passed:

- Focused Node/TSX suites for meaningful state, blank detection, all thirteen
  React/PDF templates, cross-renderer parity, claim-key scoping, and follow-up
  query ordering.
- `npx tsc --noEmit`.
- Targeted ESLint over changed editor, renderer, persistence, PDF, route, and
  follow-up files with `--max-warnings=0`.
- `node --check scripts/followups-signup-feedback.mjs`.
- `npx prisma validate`; `npm run db:generate`.
- `git diff --check` (only Git line-ending normalization warnings).

`npm run build` passed after the final edits: 547 static pages generated. The
known dynamic-font HTTP 400 warning remained non-fatal.

## Browser/DB/visual matrix

Not run here: disposable PostgreSQL migration/backfill/concurrency/follow-up
tests (Docker was unavailable); authenticated Dutch/English template-first and
upload-first browser paths; 320/375px focus and overflow checks; forced
exact-preview failure; reload persistence; and one-/two-page visual renders for
all thirteen templates. The local browser reached the login boundary but no
authenticated disposable database was available. Static renderer tests assert
the full twelve-section set, exact lane order, one-time identity/section
emission, distinct visual profiles, and React/PDF parity for all templates.

## Acceptance state

| Gate | Evidence | State |
|---|---|---|
| Canonical IDs, legacy compatibility | `lib/cv-sections.test.ts` | Pass |
| React/PDF order and additional sections | marker/order tests | Pass (static) |
| Skills/Languages and lane controls | resolver + panel | Pass (static) |
| True blank and labels | `lib/cv-empty.test.ts` | Pass (static) |
| Mobile modal | focus/inert implementation | Browser pending |
| Exact failure | no fallback + status gate | Static pass; browser pending |
| Durable state/event/concurrency | service unit tests | Unit pass; PostgreSQL pending |
| Backfill/follow-up | scripts and durable queries | DB rehearsal pending |
| Entry routes | query handoff + one-shot upload consumption | Browser pending |
| Static checks | TypeScript, targeted lint, Prisma validation | Pass |
| Repository-wide lint | Eight unrelated legacy CommonJS import errors | Existing failure |
| Build | `npm run build` — 547 pages | Pass; dynamic-font warning recorded |

## Deviations/blockers

1. Template wrappers now own distinct visual profiles, but final human visual
   comparison across all thirteen templates is still required before release.
2. No disposable database or authenticated browser runner was available for the remaining
   release gates.
3. `npm run lint` still reports eight pre-existing CommonJS import errors in
   `local/wordpress-sandbox`, `scripts/create_pilot_access.js`, and two
   WordPress webpack configs. Changed-file lint is clean.
4. Do not call this production-ready or deploy until the remaining browser,
   database, and visual gates pass.
