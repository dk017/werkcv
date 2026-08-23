# WerkCV Personal CV / MatchPack workspace separation specification

**Executor edition:** GPT-5.6 Luna Max
**Date:** 22 August 2026
**Status:** complete implementation specification; not deployment authorisation
**Repository:** `D:\DKPlayground\werkcv`
**Customer-facing products:** Personal CVs and WerkCV MatchPack
**Billing tier:** WerkCV Agency

---

## 1. Mission

Implement a first-class, repository-wide separation between WerkCV's personal
CV product and the MatchPack workspace. The same person may use both products
through one login, but personal and MatchPack documents, permissions, quotas,
retention rules, exports, checkout flows and navigation must never be inferred
from the person's email address or merely from a URL.

The executor must deliver this outcome:

> A signed-in user always understands whether they are working in Personal CVs
> or MatchPack. Every CV has one server-enforced workspace owner. Personal
> actions cannot read, alter, delete, export or purchase MatchPack documents,
> and MatchPack actions cannot accidentally operate on personal documents.
> Workspace navigation is available throughout the relevant website without
> manually maintaining hundreds of page-specific headers.

This is not a visual-only switcher task. The data and permission boundary must
be completed before the switcher is enabled.

---

## 2. Source-of-truth hierarchy

When instructions or existing files disagree, use this order:

1. This specification.
2. `docs/product/agency-matchpack-production-closure-spec.md` for MatchPack
   invariants that are not explicitly changed here.
3. `docs/product/agency-production-readiness-spec.md` for remaining Agency
   production rules.
4. The current Prisma schema and current route behaviour.
5. Implementation reports only as historical evidence; re-run their claimed
   checks before relying on them.

Do not use chat memory as the only source for a technical or product decision.
If the repository has changed since this document was written, record the
difference in the implementation report and preserve the invariants below.

---

## 3. Executor operating protocol

### 3.1 Before editing

Luna Max must:

1. Read this file completely.
2. Read `AGENTS.md` completely.
3. Read the two production specifications named in section 2.
4. Run `git status --short`, record the current branch and commit, and preserve
   all unrelated tracked and untracked work. The worktree may be dirty.
5. Re-run the route and schema audit instead of trusting section 7 blindly.
6. Inspect every existing file listed in section 23 before modifying it.
7. Run and record the current deterministic baseline:
   - `npm run lint`
   - `npm run build`
   - `npm run test:agency:unit`
   - available database-backed Agency checks.
8. Create
   `docs/product/werkcv-personal-matchpack-workspace-implementation-report.md`.
9. Obtain the read-only data audit in section 10. Do not mutate production while
   gathering those facts.

### 3.2 While implementing

- Work in the phase order in section 24.
- Complete one phase and its tests before starting the next.
- Use `apply_patch` for hand-edited files.
- Keep runtime validation at request and stored-JSON boundaries.
- Derive the actor from the session. Never trust browser-supplied user, owner,
  subscription, role, ownership or payment fields.
- Query-string workspace values express intent only; they are not permission.
- Keep migrations additive and forward-compatible. Never rewrite an old one.
- Do not silently classify ambiguous production records.
- Do not introduce a second authentication system.
- Do not duplicate site headers across individual content pages.
- Do not add `TODO`, placeholder, skipped or assertion-free tests.
- Do not log CV content, candidate information, filenames or MatchPack source.
- If a release gate cannot run, leave it red. A build is not a substitute for
  database, permission, browser or migration evidence.

### 3.3 Required implementation report

The report must contain:

- starting branch, commit and dirty-worktree summary;
- baseline results;
- file-level change inventory;
- migration and backfill evidence;
- decisions and deviations;
- unit, integration, E2E, visual and accessibility results;
- unresolved risks and exact commands run;
- deployment status, remaining `not authorised` unless separately requested.

---

## 4. Locked product decisions

1. One login identity may access Personal CVs and MatchPack.
2. Authentication identifies the person; workspace identifies where they work;
   entitlement identifies what they may do.
3. Customer-facing names are Dutch `Persoonlijke CV's` and `MatchPack`, and
   English `Personal CVs` and `MatchPack`.
4. `Agency` remains the billing-tier name, not the primary product label.
5. `/mijn-cvs` is the stable Personal destination.
6. `/agency/account` is the stable MatchPack destination.
7. Pending, paused or expired owners may enter MatchPack account/status, while
   existing server rules continue controlling creation, approval and export.
8. MatchPack appears as a workspace only for a real owner or active-member
   relationship. Other users receive a separate marketing link.
9. Switching is navigation only. It never converts, moves, copies or
   reclassifies a document.
10. Document conversion is outside this programme.
11. Candidate-review, embed, admin and other excluded contexts have no switcher.

---

## 5. Non-negotiable invariants

### 5.1 Ownership

1. Every `CVDocument` is personal or belongs to exactly one subscription.
2. Personal means `agencySubscriptionId = null`.
3. MatchPack means a valid non-null `agencySubscriptionId`.
4. Source fields, attribution, route and email are never final authority.
5. Subscription deletion must not silently personalize documents.

### 5.2 Creation and quota

1. Normal templates, editor and consumer tools create personal CVs unless an
   explicit authorised MatchPack operation is selected.
2. Owning Agency never changes normal personal behaviour.
3. Personal creation never checks Agency retention or consumes a slot.
4. MatchPack creation validates subscription, role, retention and quota and
   writes ownership transactionally.
5. The allowance remains 50 total paid document slots per period, not 50+50.

### 5.3 Reading and mutation

1. Personal lists contain only the actor's personal CVs.
2. MatchPack lists contain only the resolved subscription's documents.
3. Personal delete, update, styling, payment and download reject MatchPack IDs.
4. MatchPack routes reject personal IDs.
5. Team access follows document subscription and role, not owner `userId`.
6. Existing approved-snapshot locks remain enforced.

### 5.4 Checkout and export

1. Agency does not grant free personal downloads.
2. Personal PDF uses existing payment/pilot rules.
3. Agency export uses Agency entitlement/role rules.
4. Personal checkout refuses MatchPack documents.
5. MatchPack editor never shows a personal purchase CTA.

### 5.5 Navigation and privacy

1. Current workspace is visible on authenticated application screens.
2. Public pages inherit shared navigation; do not edit each page.
3. Existing document context comes from persistence, never `?workspace=`.
4. Login uses a validated destination and explains its workspace.
5. Switching never mutates data.
6. Workspace telemetry is aggregate and content-free.
7. Candidate acknowledgement keeps private/no-store protections.

---

## 6. Explicit non-goals

- second login or Agency password;
- ATS integration, client portal, comparison or ranking;
- personal-to-MatchPack conversion;
- price or 50-slot changes;
- evidence/acknowledgement redesign;
- general editor rewrite;
- manual replacement of every legacy header;
- new analytics vendor or component library;
- deploy, production migration or customer communication without a separate
  user instruction.

---

## 7. Verified starting state

The 22 August 2026 audit found:

- 262 pages: 197 Dutch public, 45 English, 7 Agency, 2 editor, 2 admin,
  3 embed, 2 Chrome, and one each candidate review, login, Mijn CV's and success;
- 142 page files containing an inline `<header>`;
- root `BrandRouteBoundary` supplies `SiteHeader` to most public routes and hides
  legacy nested headers through compatibility CSS;
- editor, login, Mijn CV's and Agency account use exceptional shells;
- `NavUserMenu` currently receives only user ID/email from `/api/auth/me`;
- no first-class Agency relation on `CVDocument`;
- `AgencyCvUsage.cvId` is a string accounting ledger;
- `getAgencyAccessForUser` may create a period and activate a membership;
- `createCvDocumentForUser` infers quota behaviour from owner subscription;
- personal and Agency lists query owner `userId`;
- personal deletion and checkout lack a first-class workspace guard;
- `/api/pdf` waives payment for an active Agency user's personal CV because it
  checks the person rather than document workspace;
- editor uses `agencyRouteLocked` from source fields;
- login `next` validation is too broad;
- existing Agency unit, integration, migration, E2E and output scripts.

Re-verify and record changes before adapting implementation.

---

## 8. Target architecture

```text
Authenticated identity
        +-- Personal CVs: agencySubscriptionId = null
        |      +-- owner actions + personal payment
        +-- MatchPack: agencySubscriptionId = subscription.id
               +-- team roles + retention/quota + Agency export
```

Keep four resolvers independent: existing identity/session, pure route context,
read-only entitlements and persisted-document authorisation.

---

## 9. Shared TypeScript contracts

Create `lib/workspace/types.ts`. Use `matchpack` in new UI/API names; keep the
Prisma field named `agencySubscriptionId`.

```ts
export type WorkspaceKind = "personal" | "matchpack";
export type MatchPackWorkspaceState =
  | "active" | "pending" | "paused" | "expired" | "needs_sync";
export type MatchPackWorkspaceRole =
  | "owner" | "editor" | "reviewer" | "viewer";
export type WorkspaceEntitlements = {
  personal: { available: true; href: "/mijn-cvs" };
  matchpack: null | {
    available: true;
    href: "/agency/account";
    companyName: string | null;
    state: MatchPackWorkspaceState;
    role: MatchPackWorkspaceRole;
    canCreate: boolean;
  };
};
export type CvWorkspace =
  | { kind: "personal"; ownerUserId: string }
  | { kind: "matchpack"; agencySubscriptionId: string; ownerUserId: string };
export type RouteWorkspaceContext =
  | "personal_public" | "personal_app"
  | "matchpack_marketing" | "matchpack_app"
  | "document_derived" | "auth_derived"
  | "private_external" | "embedded" | "admin" | "none";
```

Do not expose server IDs in browser navigation data unless genuinely required.

---

## 10. Required read-only data audit

Report aggregate counts and opaque IDs only for:

1. total CVs;
2. MatchPack-linked CVs;
3. usage-ledger CV IDs;
4. each legacy Agency source marker;
5. CVs mapping to multiple subscriptions;
6. Agency-marked CVs without subscription;
7. MatchPacks whose owner has no subscription;
8. users with direct subscription and active membership;
9. users with multiple active Agency memberships;
10. usage rows whose CV is absent;
11. MatchPack CV links whose CV is absent;
12. paid personal orders attached to otherwise Agency-classified CVs.

Never output CV content, titles or emails.

### 10.1 Stop conditions

- If a user has multiple concurrently usable Agency workspaces, keep switcher
  activation off and request a product decision. Do not pick a default or build
  a multi-Agency selector silently.
- If a CV maps to multiple subscriptions, do not classify it. Recency, source
  string and email are insufficient evidence.

---

## 11. Prisma data model

Modify `prisma/schema.prisma` additively.

Add to `CVDocument` using valid one-line Prisma syntax:

```prisma
agencySubscriptionId String?
agencySubscription AgencySubscription? @relation("AgencyCvDocuments", fields: [agencySubscriptionId], references: [id], onDelete: Restrict)
@@index([agencySubscriptionId, updatedAt])
@@index([userId, agencySubscriptionId, updatedAt])
```

Add to `AgencySubscription`:

```prisma
cvDocuments CVDocument[] @relation("AgencyCvDocuments")
```

`Restrict` is mandatory: `SetNull` would personalize Agency documents and
`Cascade` could destroy them. Keep usage `cvId` as an accounting string because
deletion must not refund quota. Preserve `CVDocument.userId` for compatibility,
but never use it as the Agency permission boundary.

Use an additive `add_cv_agency_workspace_relation` migration. Never edit old
migrations or run backfill during application startup. Do not add a redundant
workspace enum; null/non-null is the ownership invariant.

---

## 12. Historical backfill

Create `scripts/cv-workspace-backfill.ts` and scripts:

```json
"workspace:backfill:dry-run": "npx tsx scripts/cv-workspace-backfill.ts",
"workspace:backfill:execute": "npx tsx scripts/cv-workspace-backfill.ts --execute"
```

Dry-run is default. Candidate evidence order:

1. MatchPack link joined through owner subscription;
2. usage row joined through usage-period subscription;
3. legacy markers only when owner resolves to exactly one subscription:
   `agency_plan`, `agency_matchpack`, `agency-matchpack`, `agency-csv-import`.

Title, vacancy, template, email and timestamps are not evidence.

Rules:

- zero candidates: leave null/report;
- one: eligible;
- multiple: no update/report opaque IDs;
- existing equal: no-op;
- existing different: hard conflict/no overwrite;
- bounded transactional batches and idempotent reruns;
- non-zero execute exit on conflict;
- content-free machine-readable report in gitignored non-public storage;
- independent post-execution count verification.

Until backfill is proven complete, retain `isAgencyCvStartSource` only as a
fail-closed guard. A null relation plus legacy marker blocks personal destructive
and payment actions with `WORKSPACE_MIGRATION_REQUIRED`; it never grants Agency
access. Remove only after zero unresolved rows are documented.

---

## 13. Read-only entitlements

Create `lib/workspace/entitlements.ts`:

```ts
getWorkspaceEntitlementsForUser(userId: string): Promise<WorkspaceEntitlements>
```

It must be read-only; never ensure a usage period or mutate/accept membership.
Personal is always available. Direct owners remain visible in all known states.
Team workspace appears only for active membership. `canCreate` is a UI hint;
operations re-check access, retention and quota. Omit quota/content/provider
details. Keep operational `getAgencyAccessForUser` where full quota data is
needed, but never use it for shared navigation.

---

## 14. Route-context resolver

Create pure `lib/workspace/route-context.ts`.

| Routes | Context | Treatment |
|---|---|---|
| public NL/EN content, templates, tools, pricing | `personal_public` | public header + authenticated workspace menu |
| `/mijn-cvs` | `personal_app` | visible Personal context |
| `/agency`, `/voor-bureaus` children | `matchpack_marketing` | MatchPack marketing + account menu |
| `/agency/account` children | `matchpack_app` | visible MatchPack context |
| `/editor`, `/en/editor` | `document_derived` | document/new intent |
| `/login` | `auth_derived` | sanitised destination |
| candidate review | `private_external` | no switcher |
| `/embed` | `embedded` | no switcher |
| `/admin` | `admin` | existing admin navigation |
| Chrome/extension | `none` by default | no injected switcher |
| `/success` | verified order/document | personal success only |
| API/icon/OG/metadata | `none` | no visual navigation |

Use family rules for dynamic routes. Convert route inventory into a test that
fails when any new page has no known classification.

---

## 15. Central document authorisation

Create `lib/workspace/cv-authorization.ts` with actions:

```ts
type CvDocumentAction =
  | "read" | "edit_content" | "edit_design" | "delete"
  | "personal_checkout" | "personal_download" | "agency_export";
```

Use stable codes `AUTH_REQUIRED`, `CV_NOT_FOUND`, `CV_WORKSPACE_FORBIDDEN`,
`ROLE_FORBIDDEN`, `MATCHPACK_SNAPSHOT_LOCKED`, `PERSONAL_CHECKOUT_REQUIRED` and
`WORKSPACE_MIGRATION_REQUIRED`. Do not reveal another user's document existence.

Personal: actor owns `userId`, relation is null, Agency export forbidden.
MatchPack: relation non-null, actor belongs to exactly that subscription, current
role helpers govern draft edit/delete/export, viewer gets no mutable editor,
personal checkout/download forbidden, approved locks remain.

Every write must include workspace scope or equivalent transaction/optimistic
condition. A prior read plus unscoped update is insufficient.

---

## 16. Explicit creation services

Create `lib/workspace/cv-document-service.ts`.

`createPersonalCvDocument` explicitly writes actor `userId` and null relation,
and never queries Agency subscription, retention, quota or usage.

`createMatchPackCvDocument` must derive access from actor, require active
subscription and owner/editor role, require retention, establish period, reserve
quota with current serializable retry, create the CV with owner-compatible
`userId` plus resolved subscription ID, and create one usage row transactionally.
Keep existing Agency template/theme behaviour and error codes.

Refactor CSV import and approval-derived CV creation to write the relation.
Delete/deprecate `createCvDocumentForUser` after all callers migrate. No generic
helper may infer workspace from a user's subscription.

---

## 17. Creation-path migration matrix

Search again before implementation and update this matrix if new paths exist.

| Existing path | Target | Required service |
|---|---|---|
| `app/actions.ts` normal creation | Personal | personal service |
| `lib/editor-drafts.ts` normal editor | Personal | personal service |
| explicit authorised editor `workspace=agency` | MatchPack | MatchPack service |
| `app/api/create-cv/route.ts` missing/default workspace | Personal | personal service |
| `app/api/create-cv/route.ts` explicit Agency intent | MatchPack | MatchPack service |
| `app/api/public/cv/claim/route.ts` consumer | Personal | personal service |
| `app/api/public/cv/claim/route.ts` Agency | MatchPack | MatchPack service |
| parse/translate/LinkedIn consumer routes | Personal | personal service or authorised personal update |
| Agency CSV import | MatchPack | refactored atomic Agency service |
| MatchPack approval-derived CV | MatchPack | approval transaction writing relation |

Unknown workspace values must never select MatchPack. They fail validation or
fall back to personal only where backward compatibility explicitly requires it.

---

## 18. Lists, mutations, payment, export and retention

### 18.1 Personal list

`getUserCVs` must query actor `userId` and `agencySubscriptionId: null`.
`/mijn-cvs` must never show standalone Agency or MatchPack-derived CVs.

### 18.2 Agency list

`app/agency/account/page.tsx` must query the resolved
`agencySubscriptionId`, not every CV owned by `access.ownerUserId`. Users without
edit rights must not receive an active mutable editor link.

### 18.3 Personal actions

Refactor every CV-ID action in `app/actions.ts`, including `getCV`,
`getCVWithSettings`, content/design updates, payment status, list, delete and
checkout. Each must use central authorisation. Do not leave an `id + userId`
bypass.

### 18.4 PDF

Refactor `app/api/pdf/route.ts`:

- personal: actor owns it; paid order or existing personal pilot rule applies;
- MatchPack: actor has export access to that document's subscription and
  existing approved/Agency rules apply;
- active Agency does not waive personal payment;
- no quota-mutating lookup merely to test personal entitlement;
- preserve current privacy-safe operations alerts.

Add a regression test proving an active Agency owner receives
`PAYMENT_REQUIRED` for an unpaid personal CV.

### 18.5 Checkout and retention

`getCheckoutURL` must authorise `personal_checkout` before contacting a payment
provider. MatchPack input returns `CV_WORKSPACE_FORBIDDEN` and creates no provider
checkout.

Replace source-marker selection in `lib/agency-retention.ts` with subscription
ownership. Keep the temporary legacy guard until migration completion. A fixture
with one personal and one MatchPack CV for the same owner must prove retention
deletes only the eligible MatchPack CV.

---

## 19. Authentication and safe return paths

Create `lib/auth/safe-return-path.ts` and use one
`sanitizeInternalReturnPath` in login page and verification API.

Requirements:

- string beginning with exactly one `/`;
- reject `//`, backslashes, control characters and encoded cross-origin forms;
- parse against a fixed canonical/dummy origin and verify same origin;
- allow only intended application destinations: `/editor`, `/en/editor`,
  `/templates`, `/en/templates`, `/mijn-cvs`, `/agency/account` and legitimate
  Agency account children;
- preserve safe editor query parameters;
- reject candidate tokens, admin, API and external URLs;
- use locale-appropriate personal default when invalid;
- never construct destination from request `Host`.

Derive visible login context from the sanitised destination. Required copy:

- Dutch: `Je logt in bij Persoonlijke CV's.`
- Dutch: `Je logt in bij je MatchPack-werkruimte.`
- English: `You're signing in to Personal CVs.`
- English: `You're signing in to your MatchPack workspace.`

Provide a low-emphasis destination-change link before code request. Keep one
email-code login. Verification returns only the server-sanitised destination;
client must never fall back to raw `next`.

---

## 20. Navigation API

Extend `app/api/auth/me/route.ts` backward-compatibly.

Unauthenticated remains:

```json
{ "authenticated": false }
```

Authenticated shape:

```json
{
  "authenticated": true,
  "user": { "id": "opaque", "email": "user@example.com" },
  "workspaces": {
    "personal": { "available": true, "href": "/mijn-cvs" },
    "matchpack": {
      "available": true,
      "href": "/agency/account",
      "companyName": "Example Recruitment",
      "state": "active",
      "role": "owner",
      "canCreate": true
    }
  }
}
```

When absent, `matchpack` is null. Use the read-only resolver and
`Cache-Control: private, no-store`. Return no quota, candidate data, retention
dates, provider IDs or membership side effects. Preserve current callers while
rolling out.

---

## 21. Workspace switcher UI

Create `components/workspace/WorkspaceSwitcher.tsx` and only minimal supporting
components.

It receives locale, current route/document context, entitlements and compact/full
mode. It renders `Werkruimte` / `Workspace`, current workspace, Personal
destination, entitled MatchPack destination, and company/role/state only when
available and useful. Personal-only users get a separate MatchPack marketing
link, not a fake workspace.

Switching uses normal navigation links and no mutation API.

### 21.1 Public presentation

Keep article/marketing headers quiet. Authenticated account menu contains the
workspace options; do not place a large segmented control on every article.

### 21.2 Application presentation

On Mijn CV's, Agency account and editor, show a visible compact context control.
Use `Persoonlijke CV's`, `MatchPack`, or `MatchPack · {companyName}`.

### 21.3 Accessibility and mobile

- native link/menu semantics and accessible name;
- `aria-current`, expanded state, Escape close and focus return;
- keyboard-only operation and visible focus;
- no colour-only meaning and AA contrast;
- no two-dimensional page scrolling at 200% zoom;
- no horizontal overflow at 320/375px;
- labels wrap/truncate with accessible full label;
- email is not forced into fixed editor toolbar;
- primary actions remain reachable;
- touch targets at least 44px where practical;
- menu not clipped by sticky header/preview.

---

## 22. Page-family integration

### 22.1 Public pages

Integrate through `BrandRouteBoundary`, `SiteHeader` and `NavUserMenu`. Do not
edit hundreds of Dutch/English files. Dynamic articles, tools, examples and
templates inherit through route families. Preserve the marketing-navigation
difference between personal and MatchPack content.

### 22.2 Mijn CV's

Replace its one-off legacy header with shared branded application header or a
thin Personal shell. Show Personal context, filter the list, retain existing
personal actions, and show MatchPack only when entitled.

### 22.3 Agency account

Modify `AgencyAccountShell` to include the switcher while retaining Agency nav,
company, email and role. Make MatchPack the visible workspace and Agency the
billing language. Apply through account children: MatchPack, settings, insights,
privacy/help and other current account routes.

### 22.4 Editor

Replace boolean `agencyRouteLocked` with typed server-derived context:

```ts
type EditorWorkspaceContext = {
  kind: "personal" | "matchpack";
  label: string;
  backHref: string;
  canEdit: boolean;
  canEditDesign: boolean;
  downloadMode: "personal_checkout" | "matchpack_export";
};
```

New documents default personal; explicit MatchPack intent calls authorised
MatchPack creation. Once a CV exists, persistence alone determines context.

Personal editor: Personal label, `/mijn-cvs` back path, personal design and
checkout/download.

MatchPack editor: visible MatchPack label, Agency back path, no personal €4.99
CTA, Agency export/role behaviour, server-authorised design changes only,
viewer no mutable editor, approved locks intact.

Do not create two editors; adapt the current toolbar/actions.

### 22.5 Login, success and exclusions

Login uses section 19 context. `/success` verifies order and associated document
before showing personal context and does not infer from query alone. Do not add
the switcher to candidate acknowledgement, embeds, admin, API, icon/OG, Chrome
embedded surfaces or visual fixtures except explicit component tests.

---

## 23. File-level inventory

### 23.1 Expected new files

- `lib/workspace/types.ts`
- `lib/workspace/route-context.ts`
- `lib/workspace/entitlements.ts`
- `lib/workspace/cv-authorization.ts`
- `lib/workspace/cv-document-service.ts`
- `lib/auth/safe-return-path.ts`
- `components/workspace/WorkspaceSwitcher.tsx`
- `scripts/cv-workspace-backfill.ts`
- `scripts/workspace-tests-unit.test.ts`
- `scripts/workspace-tests-integration.ts`
- `scripts/workspace-tests-e2e.ts`
- `scripts/workspace-page-visual-smoke.ts`
- additive migration(s)
- the required implementation report.

### 23.2 Expected modified files

- `prisma/schema.prisma`, `package.json`;
- `lib/agency-access.ts`, `lib/agency-retention.ts`, `lib/editor-drafts.ts`;
- `app/actions.ts`, all CV-creation routes, PDF route;
- MatchPack approval and CSV writers;
- auth/me and verify-code routes;
- login page/form;
- `NavUserMenu`, `SiteHeader`, `BrandRouteBoundary`, `AgencyAccountShell`;
- Agency account page, Mijn CV's page;
- NL/EN editor page and shared editor;
- success page and focused global styles;
- relevant Agency test scripts.

### 23.3 Mandatory search

Before completion, classify every occurrence of:

- `cVDocument.create`, `update`, `updateMany`, `delete`, `deleteMany`,
  `findFirst`, `findMany`;
- `createCvDocumentForUser`, `isAgencyCvStartSource`, `agencyRouteLocked`;
- `getAgencyAccessForUser`, `userId: access.ownerUserId`;
- `workspace=agency`, `PAYMENT_REQUIRED`, `RETENTION_POLICY_REQUIRED`.

Record every security-relevant disposition. This inventory is not assumed
exhaustive.

---

## 24. Implementation phases

### Phase 0 — Baseline and audit

Run baseline, data audit, route/mutation inventory and desktop/375/320 screenshots
for homepage, templates, editor, Mijn CV's and Agency fixture.

Gate: evidence recorded, no hidden ambiguity, no production writes.

### Phase 1 — Schema and backfill tooling

Add relation/indexes, generate client, build dry-run and migration tests for empty
and existing-schema databases, and rehearse on disposable fixtures.

Gate: migrations work both ways forward, old-compatible app builds, dry-run is
idempotent and conflict-safe.

### Phase 2 — Services and enforcement

Add entitlements/authorisation/creation services, migrate all writers, separate
lists, guard actions/PDF/checkout and refactor retention.

Gate: personal never touches Agency quota/retention; MatchPack writes relation
and usage atomically; cross-workspace tests pass; Agency cannot bypass personal
payment.

### Phase 3 — Shared navigation

Add safe return helper, auth/me summary, switcher, public header, Agency shell
and Mijn CV's header. Gate UI behind `WORKSPACE_SWITCHER_ENABLED=false`.
The flag is presentation-only and never disables server enforcement.

Gate: all page families classified; personal-only/dual states render; excluded
routes remain clean; no layout shift or mobile overflow.

### Phase 4 — Editor and login

Replace boolean context, wire toolbar modes, remove personal CTA from MatchPack,
add login context and verify NL/EN.

Gate: query cannot change existing context; actions use correct services; unsafe
returns fail; viewer cannot mutate.

### Phase 5 — Verification

Run all suites, migration rehearsal, responsive/accessibility review and staging
flag activation. Produce release and rollback checklist.

Gate: every requirement has evidence; report complete; no deployment without
separate authorisation.

---

## 25. Automated tests

### 25.1 Unit

Test route families/inventory, safe return attacks, entitlement states,
document-workspace derivation, action matrix, legacy guard, creation validation,
response schema and backfill resolution/conflicts/idempotence/orphans.

### 25.2 Database integration

Using disposable PostgreSQL, prove:

1. Agency owner personal creation: null relation, no retention error/usage row.
2. Explicit MatchPack creation: relation, role/retention and one usage row.
3. Quota failure rolls back CV and usage.
4. Consumer public claim stays personal for Agency owner.
5. Agency public claim requires access and becomes MatchPack.
6. Personal/Agency lists are mutually exclusive.
7. Personal actions reject MatchPack; Agency actions reject personal.
8. Role matrix is subscription-specific.
9. Membership in A cannot access subscription B.
10. Approved locks survive.
11. Retention preserves same-owner personal CV.
12. Personal paid orders still work.
13. Active Agency does not waive personal payment.
14. Concurrent creation cannot exceed quota.
15. Backfill rerun changes zero rows.

### 25.3 API

Test auth/me, create-cv personal/Agency/unknown, public claim modes, PDF paid/unpaid
and authorised/forbidden, safe/unsafe login return, CSV and approval-derived CV,
origin/auth failures. Verify database side effects and absence of provider calls,
not only status codes.

---

## 26. End-to-end scenarios

Use existing Puppeteer/testing patterns and disposable authenticated data.

1. Personal-only login, create/edit/list, marketing-only MatchPack link.
2. Active Agency owner uses normal template: personal CV, no retention/usage,
   personal checkout still required.
3. Owner switches Personal ↔ MatchPack: navigation changes, rows do not.
4. Explicit standalone Agency CV: quota/retention, MatchPack editor, no personal
   checkout, Agency back path.
5. Personal CV plus forged Agency query remains personal.
6. MatchPack CV plus forged personal query remains MatchPack.
7. Owner/editor/reviewer/viewer receive exact allowed actions.
8. Pending/paused/expired owner sees account status while Personal remains usable.
9. Deep safe login returns correctly; unsafe return uses safe default.
10. Candidate review contains no account/workspace navigation.
11. Dynamic index/detail public pages inherit shared navigation.
12. Verified success works; forged/mismatched query exposes nothing.

Run Dutch and English equivalents where available.

---

## 27. Visual, responsive and accessibility gates

Inspect homepage, templates, representative dynamic NL/EN pages, Mijn CV's,
personal editor empty/populated, MatchPack editor, Agency active/pending/expired,
Personal/MatchPack login and mobile menus at 320, 375, 768 and desktop.

Require:

- `scrollWidth <= clientWidth`;
- no clipped context/primary action;
- no switcher behind editor preview;
- no hydration error or wrong-workspace flash;
- keyboard open/navigate/close and visible focus;
- accessible current-workspace announcement;
- long email/company fixtures and Dutch/English wrapping;
- operation at 200% zoom.

Use a stable loading placeholder while `NavUserMenu` loads; never briefly show
the wrong workspace.

---

## 28. Analytics and operations

Use existing analytics only. Allowed events:

- `workspace_switcher_viewed`
- `workspace_switcher_selected`
- `workspace_context_mismatch_blocked`
- `workspace_migration_guard_blocked`

Allowed properties: from/to kind, locale, route family, entitlement state, role
and anonymous UI variant. Never send email, company, CV/candidate content, raw
document/subscription IDs or checkout URL.

Post-release targets:

- personal `RETENTION_POLICY_REQUIRED`: zero;
- cross-listed documents: zero;
- personal payment bypass by Agency owners: zero;
- migration guard trends to zero before fallback removal.

Do not publish claims without measured data.

---

## 29. Feature flag and rollback

Add `WORKSPACE_SWITCHER_ENABLED`. Only the project's standard true value enables
it. It gates presentation only, has no query override and cannot bypass server
enforcement.

Compatibility sequence:

1. additive schema + old-compatible app + dry-run tooling;
2. audited backfill + services/enforcement + switcher off;
3. shared navigation/editor/login + switcher on.

After step 2, rollback must retain workspace-aware guards. Do not drop source
fields; they remain provenance.

---

## 30. Migration rehearsal and release blockers

Rehearse on empty DB, existing-schema fixture, conflict/orphan fixture, and an
authorised production backup only after separate permission. Record commands,
exit codes, indexes, dry-run/execute totals, second-run idempotence, build,
integration and compatibility result.

Do not activate if:

- ambiguous CVs remain;
- multi-workspace identity needs a decision;
- reviewed audit and production dry-run differ;
- payment-bypass, list-separation or retention-isolation tests fail;
- mobile overflow exists;
- any unsafe return fixture passes.

---

## 31. Completion definition

Complete means:

1. relation, restrictive deletion and indexes exist;
2. classification is audited, deterministic and conflict-free for activation;
3. all creators use explicit Personal or MatchPack service;
4. inference helper has no caller;
5. every sensitive action is workspace-authorised;
6. lists are mutually exclusive;
7. retention uses subscription relation;
8. Agency cannot waive personal payment;
9. MatchPack cannot enter personal checkout;
10. public pages inherit shared switcher;
11. Mijn CV's, Agency, editor and login show correct context;
12. exclusions remain clean;
13. query strings cannot reclassify documents;
14. safe-return, NL/EN, mobile, keyboard and accessibility checks pass;
15. existing Agency and new workspace suites, build and lint pass;
16. report contains reproducible evidence and no unsupported readiness claim.

---

## 32. Required Luna Max final response

Lead with actual outcome and include:

- implementation summary;
- schema/migration and backfill/audit status;
- important files changed;
- tests passed and not run;
- screenshots/visual status;
- limitations/blocking decisions;
- whether anything was committed, pushed, migrated or deployed;
- safest next action.

Never say `production ready` if production audit, migration rehearsal, database
integration, responsive visual review or permission E2E evidence is missing. Do
not deploy merely because implementation is complete.
