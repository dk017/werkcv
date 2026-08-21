# WerkCV Agency / MatchPack production-readiness specification

- Status: implementation specification
- Date: 2026-08-20
- Target executor: GPT-5.6 Luna Max coding agent using maximum reasoning
- Repository: `D:\DKPlayground\werkcv`
- Primary product: MatchPack
- Commercial tier: WerkCV Agency

Executor mandate: implement this specification phase by phase, verify every
acceptance criterion with evidence, and stop at every explicit authority or
safety gate. Do not reduce scope, replace required checks with assertions, or
claim completion while a required gate remains unverified.

This document is the source of truth for the next Agency implementation phase.
It supersedes outdated capability statements in
`docs/product/matchpack-v1-spec.md` and
`docs/product/agency-matchpack-content-implementation-plan.md` wherever those
documents say that DOCX output, revision history, team roles, reusable agency
templates, CSV exchange, deletion controls, or outcome measurement are not
implemented.

Do not infer that this document itself authorises a production deployment,
destructive production migration, legal publication, customer communication,
or use of real candidate data. Those actions require the explicit gates defined
below and, where stated, separate user approval.

---

## 1. Executive decision

Do not build another broad product feature first.

The current MatchPack product already contains the main candidate-proposal
workflow. The next release must make that workflow safe, testable,
self-explanatory and operationally supportable for normal paying agencies.

The required work, in dependency order, is:

1. Establish a safe database-migration path and a verified baseline.
2. Add automatic retention and complete deletion controls.
3. make route permissions explicit and test every Agency role.
4. Build a deterministic end-to-end Agency release gate.
5. Build a synthetic output-quality and privacy test corpus.
6. Add self-service onboarding and troubleshooting.
7. Finish the free checker's discovery and conversion connections.
8. Verify outcome measurement and add a restrained feedback loop.
9. Update product truth, deploy through the documented image workflow and
   verify production with fictional data.

No ATS integration, bulk vacancy workflow, automatic customer email, client
portal, automatic candidate ranking, new scoring model, logo builder or new
template family belongs in this release.

---

## 2. Product definition and positioning

### 2.1 Product category

- `MatchPack` is the product workflow.
- `Agency` is the paid account, quota and billing tier.
- MatchPack is not an ATS.
- MatchPack is not a candidate-ranking or hiring-decision system.
- MatchPack is not a legal anonymisation service.

### 2.2 Product promise

Use this as the canonical promise in product and marketing copy:

> WerkCV MatchPack turns one vacancy, one candidate CV and recruiter input
> into a checked candidate proposal. Each requirement is connected to visible
> source evidence, missing information remains visible, and a recruiter must
> review the controlled snapshot before PDF or DOCX export.

Dutch canonical version:

> WerkCV MatchPack zet één vacature, één kandidaat-CV en recruiterinformatie
> om in een gecontroleerd kandidaatvoorstel. Iedere functie-eis wordt gekoppeld
> aan zichtbaar bronbewijs, ontbrekende informatie blijft zichtbaar en een
> recruiter controleert de vaste snapshot vóór PDF- of DOCX-export.

### 2.3 Help-led sales standard

All Agency content must follow these rules:

- Diagnose the recruiter's decision problem before showing the paid plan.
- Explain the mechanism, evidence and limitations before the CTA.
- Use fictional examples unless the data is properly authorised.
- Never publish invented time savings, acceptance rates or customer quotes.
- Never call a contact-free output anonymous, AVG-proof or fully redacted.
- Never imply that a strong text match proves candidate competence.
- Keep the price, shared slot allowance and slot-consumption rule explicit.
- Make the free checker useful without requiring an account or sales call.
- Use MatchPack as the product name and Agency as the account/billing tier.

---

## 3. Verified current-state register

The executor must verify this table against the repository before editing. If a
row has changed, update this specification and explain the deviation in the
implementation report rather than silently following stale instructions.

| Capability | Verified state on 2026-08-20 | Release implication |
|---|---|---|
| MatchPack input | One text-based PDF or DOCX CV and pasted vacancy | Keep this boundary |
| Analysis | Strong, partial and missing requirement evidence | Retain conservative language |
| Evidence traceability | Source page/line/section/snippet plus reviewer status | Test against original extracted text |
| Recruiter review | Candidate data, proposal copy, commercial fields and evidence statuses are editable | Must remain human-controlled |
| Revision history | Stored revisions with version and changed fields | Add deterministic diff tests |
| Approval | Locked approved snapshot and idempotent quota reservation | Add concurrency tests |
| Export | Full and contact-free PDF and DOCX | Add structural, visual and PII tests |
| Agency templates | Reusable agency templates with company name, standard layout, colour, header and footer | Do not call this bespoke house-style design |
| Team roles | Owner, editor, reviewer and viewer exist | Permission semantics are currently too broad and need explicit route tests |
| CSV | CV-register import and MatchPack overview export exist | Validate escaping, quotas, encoding and permissions |
| Deletion | Draft deletion and owner-wide Agency data deletion exist | Approved single-pack deletion and automatic retention do not exist |
| Retention | No automatic content-retention period | Production-readiness blocker |
| Privacy documents | Product privacy page and provisional subprocessor explanation exist | Final factual registry and legally reviewed DPA are absent |
| Outcome measurement | Approval time, export time, corrections, unsupported claims and client outcomes are represented | Validate data quality; do not publish benchmarks yet |
| Free evidence checker | Dutch and English pages implemented locally with sample case, methodology and schema | Commit/deployment and full discovery connections remain |
| ATS integration | None; CSV is the only exchange route | Do not add an ATS integration in this release |
| Real outcome proof | Not established | Do not claim proven ROI or universal time saving |

Primary current files:

- `components/agency/AgencyMatchPackWorkspace.tsx`
- `components/agency/AgencySettingsPanel.tsx`
- `lib/agency-matchpack.ts`
- `lib/agency-access.ts`
- `lib/agency-docx.ts`
- `lib/agency-submission-pdf.ts`
- `lib/agency-csv.ts`
- `app/api/agency/**`
- `app/agency/**`
- `prisma/schema.prisma`
- `scripts/matchpack-v1-smoke.ts`
- `scripts/agency-submission-pdf-smoke.ts`
- `scripts/agency-page-visual-smoke.ts`

---

## 4. Release goals and non-goals

### 4.1 Required release outcomes

The release is complete only when all of the following are true:

1. Schema changes can be deployed and rolled back without relying on an
   uncontrolled production `prisma db push`.
2. New Agency accounts have an explicit automatic retention policy.
3. Existing active Agency accounts cannot remain indefinitely without choosing
   or acknowledging a retention policy.
4. An owner can delete one draft or approved MatchPack and its derived CV
   without refunding a consumed slot.
5. Automatic retention removes all candidate content associated with an
   expired MatchPack, including revisions and the derived Agency CV.
6. Deletion creates a non-content receipt that contains counts and timestamps,
   never candidate names, CV text, vacancy text or proposal copy.
7. Every Agency role is enforced server-side for every route.
8. Approval and slot consumption remain idempotent under retries and concurrent
   requests.
9. Full and contact-free PDF/DOCX output pass synthetic content, visual and PII
   regression checks.
10. A deterministic browser test completes the normal workflow without an
    external AI dependency.
11. One separately labelled optional smoke test exercises the live AI path with
    fictional data.
12. First-time customers can understand and complete the workflow without a
    sales call.
13. The free evidence checker is present in the Tools index, AI discovery
    resources, sitemap and Agency conversion paths.
14. Public product copy matches implemented capability and privacy truth.
15. Production deployment uses the GitHub Actions/GHCR flow documented in
    `DEPLOYMENT_HETZNER.md` and has a tested rollback image.

### 4.2 Non-goals

Do not implement the following during this specification:

- Bullhorn, Carerix, Vincere, Recruiterflow or another ATS connector.
- Bulk candidate-to-vacancy matching.
- Automated candidate ranking, rejection or hiring recommendations.
- Client login/share portal.
- Automatic email delivery to clients.
- Candidate consent-signing workflow.
- Guaranteed legal anonymisation.
- Logo upload or arbitrary visual-template builder.
- A new AI score or public quality benchmark.
- Public claims based on synthetic or internal test data.

---

## 5. Mandatory executor operating rules

These instructions are written for an autonomous coding agent and are
mandatory.

### 5.1 Before modifying files

1. Read `AGENTS.md` and this specification completely.
2. Read `DEPLOYMENT_HETZNER.md` completely before changing deployment or
   migration behaviour.
3. Run `git status --short` and preserve every unrelated modification and
   untracked file.
4. Do not stage, revert, delete or reformat unrelated work.
5. Inspect the exact current implementation before applying a task; do not
   assume the current-state table is newer than the code.
6. Record a baseline result for:
   - targeted Agency ESLint;
   - `npx tsc --noEmit`;
   - `npm run build`;
   - `npm run test:matchpack`;
   - current production-route status if production inspection is authorised.

### 5.2 Data rules

- Use only fictional fixtures in code, automated tests, screenshots and logs.
- Never copy a production CV, vacancy or user email into a fixture.
- Never print CV text, vacancy text, candidate data or generated proposal copy
  to server logs.
- Do not store uploaded binaries unless a future, separately approved
  specification changes that rule.
- Never weaken same-origin checks, authentication or role checks to make a test
  pass.
- Never make a production deletion or migration without a verified backup,
  dry-run output and explicit user authorisation.

### 5.3 Implementation behaviour

- Work through the phases in order.
- Maintain a task plan and mark a phase complete only after its acceptance tests
  pass.
- Use focused, reversible changes.
- Prefer pure services with injected dependencies over test-only production
  backdoors.
- Do not add a public test endpoint or an environment flag that can bypass
  authentication in production.
- Use runtime validation at every API boundary.
- Return stable error codes in addition to human-readable messages.
- Keep analytics properties free of candidate and vacancy content.
- If implementation reality conflicts with this specification, stop that
  subtask, document the conflict and choose the safer interpretation.

### 5.4 Handoff requirements

At completion create:

- `docs/product/agency-production-readiness-implementation-report.md`
- a changed-file inventory grouped by phase;
- commands and results for all verification gates;
- migration and rollback instructions;
- remaining external/legal decisions;
- production checks performed and their results;
- a statement that no real candidate data was used.

Do not state that the product is proven, compliant or production-ready merely
because the code compiles.

---

## 6. Phase 0 — baseline, product truth and release boundary

### 6.1 Objective

Create a reliable baseline and remove contradictory product documentation
before structural changes begin.

### 6.2 Required work

1. Verify the current capability register in section 3.
2. Update `docs/product/matchpack-v1-spec.md`:
   - mark it as historical v1 design where appropriate;
   - link to this document as the current readiness source of truth;
   - do not delete useful historical decisions.
3. Update `docs/product/agency-matchpack-content-implementation-plan.md`:
   - correct the rows for revision history, DOCX output, team roles, templates,
     CSV exchange, deletion controls and outcome metrics;
   - retain the restrictions on anonymisation, ATS claims and proven ROI.
4. Confirm that all public Agency copy uses MatchPack as the workflow/product
   and Agency as the tier/account.
5. Confirm the current shared-slot wording. A newly created loose Agency CV and
   a newly approved MatchPack share the plan allowance; do not describe this as
   50 MatchPacks plus 50 separate CVs unless the billing implementation changes.
6. Add a short release note to this specification's implementation report
   identifying the exact commit used as the baseline.

### 6.3 Acceptance criteria

- No current public page claims a capability that the code does not provide.
- No current document says DOCX, revision history, roles, templates or CSV are
  absent when they are present.
- Redaction wording always says contact-free/contact-details-removed or
  geredigeerd concept, not legally anonymous.
- The shared slot rule is consistent on `/agency`, `/agency/account` and help
  content.

---

## 7. Phase 1 — safe database migration foundation

### 7.1 Problem

The current production container starts by running `prisma db push` from
`entrypoint.sh`. The repository has no committed Prisma migration history.
Automatic schema push is not an acceptable foundation for retention and
deletion changes because drift or an unsafe change could be applied during app
startup without a reviewed migration.

### 7.2 Required architecture

Move to reviewed Prisma migrations and `prisma migrate deploy`.

Required files will include:

- `prisma/migrations/**`
- `entrypoint.sh`
- `Dockerfile` if the runtime image needs migration assets or CLI changes
- `.github/workflows/build-app-image.yml`
- `DEPLOYMENT_HETZNER.md`
- an optional migration verification script under `scripts/`

### 7.3 Baseline procedure

The executor must not invent a baseline or apply it directly to production.

1. Generate a schema-only dump from a disposable/local database representing
   the current Prisma schema.
2. Generate a baseline Prisma migration for the current schema.
3. Apply the baseline to a new empty database and verify that the resulting
   schema matches `prisma/schema.prisma`.
4. Restore a sanitized or schema-only production clone and verify that marking
   the baseline as applied produces no destructive diff.
5. Record the exact Prisma 7 commands used in the implementation report. Check
   `prisma migrate --help` and `prisma migrate diff --help` before selecting
   flags; do not copy commands written for an older Prisma version blindly.
6. Back up the production database before any production migration.
7. Only after explicit user approval, mark the baseline migration as applied in
   production without replaying table creation.
8. Change runtime deployment from `prisma db push` to `prisma migrate deploy`.
9. Ensure a failed migration prevents the new app image from becoming healthy.
10. Document rollback. Schema rollback must use a reviewed forward repair or
    backup restore; do not create an automatic destructive down migration.

### 7.4 Deployment design

Preferred order:

1. Build and publish the immutable application image in GitHub Actions.
2. Take and verify a PostgreSQL backup.
3. Run `prisma migrate deploy` once against the target database using the new
   image or a one-off migration container.
4. Start/recreate the application container only if migration succeeds.
5. Run health checks and route checks.

Do not build on the Hetzner VPS. Do not run a fresh `db push` as a shortcut.

### 7.5 Tests and acceptance criteria

- Empty-database migration succeeds.
- Existing-schema baseline verification produces no destructive operations.
- A new forward migration applies once and is idempotently recognised on the
  second deploy.
- Application startup does not call `prisma db push`.
- Migration failure stops release activation.
- Backup and restore are exercised on a non-production database.
- `DEPLOYMENT_HETZNER.md` contains the exact verified procedure.

Stop condition: do not begin production retention migration until this phase
passes.

---

## 8. Phase 2 — automatic retention and complete deletion

### 8.1 Product policy

This specification makes the following product decision:

- Default MatchPack content retention for new Agency subscriptions: 90 days.
- Owner-selectable options: 30, 90, 180 or 365 days.
- This is a WerkCV product default, not a claim that Dutch law requires 90
  days.
- The policy applies to MatchPack candidate content and its derived CV.
- Billing records, subscription status, payments and non-content quota counts
  are not deleted by MatchPack content retention.
- Retention is measured from the last meaningful content state:
  - draft: most recent saved revision/content update;
  - approved pack: approval timestamp.
- Exporting or viewing an approved pack does not silently extend retention.
- Changing to a shorter policy requires an impact preview and explicit owner
  confirmation.
- Existing accounts receive a minimum seven-day activation grace period so a
  newly introduced policy cannot delete historical content immediately.

### 8.2 Proposed schema changes

Use names compatible with the current schema unless inspection reveals a
collision.

Add to `AgencySubscription`:

```prisma
retentionDays          Int       @default(90)
retentionPolicySetAt   DateTime?
retentionUpdatedAt     DateTime?
```

Add to `AgencyMatchPack`:

```prisma
retentionExpiresAt     DateTime?
```

Add an index suitable for the sweep:

```prisma
@@index([retentionExpiresAt, status])
```

Add a non-content deletion receipt model. Exact relation names may be adjusted
to satisfy Prisma, but the data boundary must remain:

```prisma
model AgencyDeletionReceipt {
  id                    String   @id @default(cuid())
  subscriptionId        String
  actorUserId           String?
  reason                String
  matchPacksDeleted     Int      @default(0)
  revisionsDeleted      Int      @default(0)
  cvDocumentsDeleted    Int      @default(0)
  templatesDeleted      Int      @default(0)
  teamMembersDeleted    Int      @default(0)
  retentionDays         Int?
  createdAt             DateTime @default(now())

  @@index([subscriptionId, createdAt])
}
```

The receipt must never contain candidate name, email, CV text, vacancy title,
vacancy text, source snippet, proposal content, original filename or deleted
entity title. Random internal user/subscription identifiers are allowed only
where required for access and accountability.

### 8.3 Retention service

Create a pure, testable service such as `lib/agency-retention.ts` with:

- `getRetentionBaseDate(pack)`
- `calculateRetentionExpiry(pack, retentionDays)`
- `previewRetentionPolicyChange(ownerId, retentionDays, now)`
- `applyRetentionPolicyChange(...)`
- `deleteAgencyMatchPackContent(...)`
- `sweepExpiredAgencyContent(...)`

Rules:

1. Use one database transaction per owner/bounded batch.
2. Lock or re-check selected records before deletion to avoid deleting a pack
   that was modified after the sweep selected it.
3. For a linked MatchPack CV:
   - verify `userId` equals the Agency owner;
   - verify `startSource` or `sourceCluster` identifies an Agency MatchPack;
   - delete the derived `CVDocument`;
   - preserve `AgencyCvUsage` so deletion never refunds a consumed slot.
4. Delete the MatchPack; revisions must cascade.
5. Create the receipt in the same transaction.
6. Return counts only.
7. Process bounded batches, for example at most 100 packs per transaction.
8. A sweep error for one owner must not expose data or corrupt another owner.
9. Emit a content-free operational event with counts and an error code.

### 8.4 Existing-account migration

Do not silently delete existing content during the schema deploy.

1. Add nullable `retentionPolicySetAt` and `retentionExpiresAt` fields.
2. Set `retentionDays` to 90 through the schema default.
3. Leave policy activation null for existing subscriptions.
4. Add a blocking settings banner for active owners until they acknowledge or
   choose a policy.
5. When the owner activates a policy:
   - show the number of existing packs affected;
   - show the earliest scheduled deletion date;
   - apply at least seven days of grace from activation;
   - require typed confirmation if any existing pack would expire within 30
     days.
6. New subscriptions activate the 90-day policy when billing becomes active.
7. Broad real-data launch cannot be marked ready while an active Agency account
   has no acknowledged policy.

### 8.5 Scheduler

Implement the retention logic independently of any scheduler first.

Add:

- `scripts/agency-retention-sweep.ts`
- `npm run agency:retention:dry-run`
- `npm run agency:retention:execute`

Requirements:

- Dry-run is the default and cannot delete.
- Execution requires an explicit `--execute` argument and a production safety
  confirmation environment value defined in deployment documentation.
- Output contains counts and IDs suitable for operational debugging, but no
  candidate or vacancy content.
- Add the production schedule only after determining the actual scheduler used
  on Hetzner. Do not assume Vercel Cron.
- Recommended frequency is daily; this is an operational schedule, not a legal
  requirement.

### 8.6 Individual deletion API and UI

Extend deletion so an owner can delete a draft or approved MatchPack.

Server rules:

- Owner: delete draft or approved MatchPack plus derived CV.
- Editor: delete drafts created inside the owner's workspace; never approved
  content.
- Reviewer and viewer: cannot delete.
- Deletion never changes the historical slot count.
- Approved deletion requires a confirmation phrase and returns a receipt ID.
- Every route filters by owner scope derived from authenticated access, never a
  client-supplied owner ID.
- Existing entire-Agency deletion must use the same deletion service.
- Entire-Agency deletion must stop deleting `AgencyCvUsage` rows merely to
  restore quota. Preserve non-content usage counts unless a separate billing
  correction is explicitly authorised.

UI rules:

- Draft button: `Concept verwijderen`.
- Approved danger action: `Voorstel en gekoppeld CV verwijderen`.
- Warning must say exports already downloaded by another party cannot be
  recalled.
- Show the deletion receipt timestamp and counts after success.
- Add an `Expiring soon` label within 14 days of `retentionExpiresAt`.
- Show the exact expiry date on the MatchPack detail view.

### 8.7 Retention acceptance tests

- New subscription receives 90-day policy activation.
- Existing subscription receives no immediate deletion during migration.
- 30/90/180/365 inputs validate; any other value is rejected.
- Shorter policy preview returns accurate affected counts and earliest date.
- Draft expiry uses last meaningful saved update.
- Approval freezes the base date at approval.
- Export does not extend expiry.
- Sweep dry-run never mutates data.
- Sweep execute deletes only expired content in owner scope.
- Revisions and derived CV are deleted.
- Quota usage remains counted.
- Payment and subscription records remain.
- Receipt contains no candidate/vacancy content.
- Concurrent save or approval prevents a stale sweep from deleting the pack.
- Owner can delete approved content; editor cannot.
- Another agency cannot infer or delete the pack by changing an ID.

---

## 9. Phase 3 — permissions, origin and security hardening

### 9.1 Explicit role matrix

Replace broad helper reuse with action-specific permission helpers.

| Action | Owner | Editor | Reviewer | Viewer |
|---|---:|---:|---:|---:|
| View MatchPack list/detail | Yes | Yes | Yes | Yes |
| Create MatchPack | Yes | Yes | No | No |
| Edit candidate/proposal draft | Yes | Yes | Yes | No |
| Confirm/correct/reject evidence | Yes | Yes | Yes | No |
| Approve final snapshot | Yes | No | Yes | No |
| Export approved PDF/DOCX | Yes | Yes | Yes | No |
| Delete draft | Yes | Yes | No | No |
| Delete approved pack/CV | Yes | No | No | No |
| Import CV CSV | Yes | Yes | No | No |
| Export MatchPack overview CSV | Yes | Yes | Yes | No |
| Manage templates | Yes | No | No | No |
| Manage team | Yes | No | No | No |
| Set retention/delete all Agency data | Yes | No | No | No |
| View Agency insights | Yes | Yes | Yes | No |

Add helpers in `lib/agency-access.ts`, for example:

- `canViewAgencyWork`
- `canCreateAgencyWork`
- `canEditAgencyDraft`
- `canReviewAgencyEvidence`
- `canApproveAgencyWork`
- `canExportAgencyWork`
- `canDeleteAgencyDraft`
- `canDeleteApprovedAgencyWork`
- `canManageAgencySettings`

Do not rely on disabled buttons as enforcement. Every server route must call the
corresponding helper.

### 9.2 Same-origin behaviour

The product previously surfaced `INVALID_ORIGIN`; the release suite must make
proxy behaviour explicit.

Test:

- canonical HTTPS origin;
- same-origin request behind the production reverse proxy;
- valid `Host`, `X-Forwarded-Host` and `X-Forwarded-Proto` combination used by
  Hetzner/nginx;
- missing Origin with a valid same-site Referer where allowed;
- cross-origin Origin;
- forged forwarded host;
- `null` Origin;
- local development host.

Rules:

- Do not allow all origins.
- Do not trust arbitrary forwarded headers unless the deployment boundary is
  documented.
- Mutation endpoints remain same-origin protected.
- GET export endpoints require authenticated role and owner scope even though
  they do not use the origin check in the same way as a mutation.
- Add stable error code `INVALID_ORIGIN` and a user-facing retry/help message.

### 9.3 Upload and AI boundaries

Confirm and test:

- PDF and DOCX only for MatchPack input.
- File extension, MIME and signature agree.
- Maximum file size, extracted text size and PDF page count are enforced before
  AI processing.
- Scanned/empty documents return a clear actionable error.
- Vacancy text and CV text are wrapped as untrusted data in AI prompts.
- Model output is schema-validated before persistence.
- Source snippets displayed as evidence come from resolved source text, not an
  unverified generated quote.
- No uploaded filename or content is logged.
- Rate-limit keys do not contain candidate data.

### 9.4 Security acceptance tests

- Unauthenticated requests receive `401`.
- Non-Agency authenticated users cannot access Agency data.
- Every role follows the matrix for every route.
- ID manipulation cannot cross Agency owner scope.
- Cross-origin mutations receive `403 INVALID_ORIGIN`.
- Oversized/mismatched files fail before AI work.
- Logs contain error codes and request IDs, not content.
- Reviewer/owner approval is idempotent under retry.
- Two concurrent approvals consume one slot and create one linked CV.
- Approved snapshots cannot be edited through a stale request.

---

## 10. Phase 4 — deterministic Agency release gate

### 10.1 Test strategy

Use the repository's existing Node/TypeScript/Puppeteer stack. Do not add a
large test framework unless the current stack cannot satisfy a concrete test.

Create a directory such as:

```text
scripts/agency-tests/
  fixtures.ts
  matchpack-domain.test.ts
  permissions.test.ts
  quota-concurrency.test.ts
  retention.test.ts
  exports.test.ts
  csv.test.ts
  production-flow.e2e.ts
  live-ai-smoke.ts
```

Use `node:test` and strict assertions through `tsx` where practical.

Add scripts:

```json
"test:agency:unit": "...",
"test:agency:integration": "...",
"test:agency:e2e": "...",
"test:agency:outputs": "...",
"test:agency:live-ai": "...",
"test:agency:release": "..."
```

`test:agency:release` must not require a paid external AI call. The separately
named live-AI smoke may require credentials and must use fictional data.

### 10.2 Architecture for deterministic tests

Do not add a public endpoint or production authentication bypass.

Refactor the MatchPack creation route so domain orchestration can be invoked
with injected dependencies:

- candidate text extractor;
- CV parser;
- vacancy matcher;
- clock;
- database transaction boundary where practical.

The production route injects real implementations. Integration tests inject
deterministic fictional fixtures. Browser E2E may start with a database-seeded
fictional draft after separately testing the upload/orchestration service.

All database tests must:

- use a dedicated non-production database;
- refuse to run if the database host/name matches documented production;
- create unique test users/subscriptions;
- clean only records created by the test;
- verify resolved absolute scope before cleanup;
- never use broad database truncation in a shared environment.

### 10.3 Required browser journey

Automate the complete path:

1. Create or seed a fictional active Agency owner.
2. Log in through an isolated test session mechanism that cannot exist in
   production, or generate a normal session directly in the test database.
3. Open `/agency/account/matchpack`.
4. Create a deterministic fictional MatchPack.
5. Confirm no slot was consumed by analysis.
6. Review fit summary and every evidence row.
7. Confirm an exact reference, correct a partial reference and reject an
   unsupported reference.
8. Edit candidate data and verify dirty-state warning.
9. Save and verify revision number and changed fields.
10. Fill confirmed commercial information.
11. Edit introduction and accompanying email.
12. Select full or contact-free output.
13. Complete the approval checklist.
14. Approve as owner or reviewer.
15. Confirm exactly one slot was consumed.
16. Download selected PDF and DOCX.
17. Download the alternative variant.
18. Verify export timestamps/metrics.
19. Record a client outcome.
20. Reopen the pack and confirm it is immutable.
21. Verify history and visible changes.
22. Delete the approved fictional pack as owner and verify its derived CV is
    gone while usage remains counted.

Run the primary UI flow at desktop and mobile viewport widths. Mobile testing
may use a shorter path after the complete desktop path, but it must cover
upload, review navigation, approval visibility and downloads.

### 10.4 Failure and concurrency cases

Automate:

- invalid origin;
- invalid/oversized file;
- unreadable/scanned PDF;
- vacancy too short/long;
- rate limit response;
- inactive/cancelled subscription;
- quota at allowance;
- two approval requests at the same time;
- stale draft save after another approval;
- another Agency's MatchPack ID;
- viewer mutation attempts;
- editor approval attempt;
- reviewer creation/deletion attempt;
- failed PDF generation;
- failed DOCX generation;
- CSV with BOM, commas, quotes, line breaks and formula-like cells;
- retention sweep racing with an update.

### 10.5 Release-test output

The release test prints a compact summary containing only:

- pass/fail per gate;
- synthetic IDs;
- counts;
- durations;
- error codes;
- output file paths inside the test-output directory.

It must not print fictional or real CV content, because log policy should be
tested under the same boundary used in production.

---

## 11. Phase 5 — synthetic output-quality and privacy corpus

### 11.1 Purpose

Compilation proves neither evidence quality nor safe output. Build a stable,
fictional corpus that exercises document parsing, evidence review and both
export formats.

### 11.2 Required fixture cases

Create at least 15 synthetic cases under a clearly named fixture directory,
including every case below. Every organisation, person, email, number and
project must be fictional.

1. Clean single-page Dutch CV.
2. Two-page Dutch CV with multiple employers.
3. English CV with Dutch vacancy.
4. Dutch CV with English vacancy.
5. DOCX containing tables.
6. Long CV near the allowed text/page boundary.
7. Missing dates and overlapping employment periods.
8. Requirement mentioned as a keyword without proof of use.
9. Availability and hours absent from the CV.
10. Candidate name/email/phone/URL/postal code repeated inside narrative text.
11. Candidate name appearing in a project, course or reference section.
12. Employer, school and unusual project details that remain indirect
    identifiers in the contact-free output.
13. Unsupported AI-proposed source quote.
14. Scanned or effectively unreadable PDF fixture.
15. Unicode, accents, Dutch punctuation and long compound words.

### 11.3 Evidence assertions

For each analyzable fixture:

- Every displayed vacancy snippet exists in the supplied vacancy text.
- Every displayed CV snippet exists in extracted CV text.
- Source line/section/page references resolve to the displayed snippet.
- A generated quote that cannot be resolved is labelled review or missing,
  never strong evidence.
- Keyword-only cases remain partial/review.
- Availability, rate, notice period and current preferences remain open unless
  explicitly confirmed through recruiter input.
- Missing evidence never becomes invented candidate content.
- Reviewer corrections survive save, history, approval and export.

### 11.4 PDF assertions

For full and contact-free variants:

- PDF opens and has at least one page.
- Page count remains within expected fixture bounds.
- Required headings and proposal title are extractable.
- Full variant contains the fixture's allowed direct details.
- Contact-free variant contains none of the fixture's known name, email,
  phone, URL, address or postal-code tokens.
- The contact-free warning remains visible.
- Employer, school and project names are not silently claimed to be removed.
- No content is clipped outside page bounds in rendered PNG inspection.
- Headers, footers and page numbers remain readable.

### 11.5 DOCX assertions

- DOCX opens as a valid ZIP/OpenXML document.
- Required document parts exist.
- Extracted document text contains the intended proposal and CV sections.
- Full/contact-free PII assertions match the PDF assertions.
- No source placeholder, template token or debug text remains.
- Page breaks and header/footer content are represented correctly.

### 11.6 Visual regression

Extend the existing PDF/visual smoke scripts to render:

- every supported production template;
- every supported colour theme used by Agency templates;
- full and contact-free output;
- at least one one-page and one multi-page case;
- desktop and mobile Agency workspace.

Store review artifacts under `output/agency-qa/` and keep large generated
artifacts out of source control unless they are deliberately approved baselines.
The implementation report must link the reviewed outputs and record defects
found and fixed.

### 11.7 Manual review gate

Automation cannot certify indirect anonymity or document quality. Before
release, a human must inspect:

- all pages of one full PDF and DOCX;
- all pages of the corresponding contact-free PDF and DOCX;
- every evidence connection for at least two fictional cases;
- mobile and desktop approval workflow;
- copied accompanying email.

Record reviewer name/identifier, date, fixture and result in the implementation
report. This is product QA, not a pilot or a public customer claim.

---

## 12. Phase 6 — self-service onboarding and support

### 12.1 Objective

A normal paying Agency customer must be able to understand and complete the
workflow without a pilot programme or sales call.

### 12.2 Account onboarding checklist

Add a persistent, dismissible panel on `/agency/account` derived primarily from
real account state:

1. `Bekijk het fictieve MatchPack-voorbeeld`.
2. `Kies je bewaartermijn`.
3. `Stel je bureautemplate in`.
4. `Maak je eerste MatchPack`.
5. `Controleer en keur het voorstel goed`.
6. `Download PDF of DOCX`.
7. `Leg de klantuitkomst vast`.

Derive completion from stored state where possible. If dismissal must persist,
add one explicit timestamp field or a validated metadata entry; do not build a
generic onboarding CMS.

The panel must explain:

- analysis is free of slot consumption;
- a slot is used only on final approval or creation of a separate Agency CV;
- the 50 allowance is shared, not 50 plus 50;
- recruiter review is required;
- contact-free does not mean legally anonymous;
- real data requires proper authority and processor arrangements.

### 12.3 In-product guidance

Add concise help at the decision point, not a long tour overlay:

- Evidence status: exact source, approximate source, not found.
- Reviewer status: unreviewed, confirmed, corrected, rejected.
- Commercial fields: current facts must be confirmed separately.
- Revision history: what changed and who saved it.
- Approval: snapshot becomes locked and consumes one slot.
- Output choice: full versus contact-free.
- Deletion/retention: exact date and consequences.

### 12.4 Help centre route

Create or extend a public, indexable Agency help route, for example
`/voor-bureaus/kennisbank/matchpack-handleiding`, containing:

- complete fictional workflow;
- supported files and limits;
- evidence-status explanations;
- common upload failures;
- correcting source data;
- review and approval checklist;
- PDF/DOCX output differences;
- contact-free limitations;
- slot and billing explanation;
- retention and deletion explanation;
- role matrix;
- CSV import/export format;
- support contact.

Use screenshots or product visuals only if they match the deployed interface.
Do not use fabricated testimonials or performance claims.

### 12.5 Transactional communication

Required now:

- one factual Agency activation/welcome email;
- login/security emails already required by authentication;
- no sales drip sequence in this release.

The welcome email must link to the fictional example, account checklist,
privacy/retention page and help guide. It must not include candidate data.
Do not send a marketing sequence unless consent and communication purpose are
separately decided.

### 12.6 Feedback loop

After the first approved export, show a restrained optional in-product prompt:

- `Kon je dit voorstel na controle naar de klant sturen?`
- answers: `Ja`, `Nog gecorrigeerd`, `Niet bruikbaar`, `Nog niet verstuurd`;
- optional issue categories: evidence, parsing, editing, PDF, DOCX, privacy,
  other;
- optional free-text note capped at a reasonable length.

Do not collect candidate names or paste proposal content into feedback. Store
product feedback separately from the client outcome status.

### 12.7 Onboarding acceptance criteria

- New owner sees the checklist.
- Checklist completion reflects actual actions.
- Viewer cannot see owner-only retention/template actions as available.
- Every step has one clear next action.
- Slot rule and contact-free limitations are visible before approval.
- Help guide answers the most common failure cases.
- Welcome email contains no PII and sends once per subscription activation.
- Feedback prompt is optional, bounded and content-safe.

---

## 13. Phase 7 — free checker discovery and conversion completion

### 13.1 Existing routes

- Dutch: `/tools/kandidaatvoorstel-checker`
- English: `/en/candidate-proposal-checker`

Preserve these URLs.

### 13.2 Required discovery connections

1. Add the Dutch checker to the main `/tools` index under a clear Agency or
   recruiter section; do not mix its CTA with consumer CV purchase wording.
2. Add the checker and the Agency/MatchPack hub to `lib/ai-discovery.ts`:
   - `primaryAiPages`;
   - relevant capability lists;
   - factual FAQ entries where useful.
3. Update the AI discovery date only when the resource output truly changes.
4. Verify `/llms.txt`, `/.well-known/ai.txt`, `/ai/service.json`,
   `/ai/summary.json` and `/ai/faq.json` expose only verified capabilities.
5. Retain `OAI-SearchBot`, `ChatGPT-User`, `GPTBot`, Perplexity and Claude bot
   access to public pages while private Agency/account/API paths remain blocked.
6. Verify canonical and Dutch/English hreflang mappings.
7. Keep WebApplication and FAQ structured data aligned with visible page copy.
8. Link the checker from:
   - `/voor-bureaus`;
   - `/voor-bureaus/kennisbank`;
   - the candidate-proposal guide;
   - `/agency`;
   - the main Tools index.

### 13.3 Conversion rules

The free checker must provide a complete useful first-pass result before the
paid CTA.

CTA sequence:

1. Run fictional or authorised evidence check.
2. Understand unresolved requirements.
3. View complete fictional MatchPack example.
4. Read workflow/privacy limits.
5. Consider the paid Agency account.

Do not gate the first checker result behind email collection. Do not show fake
scarcity. Do not promise AI-agent citation or search ranking.

### 13.4 Checker analytics

Measure only content-free events:

- checker viewed;
- fictional sample loaded;
- analysis started;
- analysis completed/failed;
- report printed;
- methodology/help opened;
- MatchPack sample opened;
- Agency CTA clicked;
- signup/checkout attribution from the checker.

Never attach CV text, vacancy text, title, filename, source snippets or
candidate identity to analytics.

### 13.5 Discovery acceptance criteria

- Both routes return `200` after deployment.
- Both routes are in the sitemap and language alternates.
- Main Tools index links to the Dutch route.
- AI discovery resources name the checker accurately.
- Private Agency routes remain disallowed for crawlers.
- Structured data matches visible content.
- The fictional sample works without an AI call.
- A real check uses the existing rate-limited AI path and displays privacy
  guidance before submission.

---

## 14. Phase 8 — measurement and evidence of value

### 14.1 Existing metrics to preserve

- upload to approval duration;
- approval to first export duration;
- corrections count;
- unsupported claims caught;
- client outcome;
- repeat approved usage.

### 14.2 Required data-quality audit

Verify for every metric:

- exact start and end timestamps;
- whether retries duplicate the event;
- whether the metric survives PDF and DOCX export paths;
- how abandoned drafts are represented;
- how unknown client outcomes are excluded from acceptance rate;
- how deleted content affects aggregate counts;
- how synthetic/internal test accounts are excluded from commercial reporting.

Do not treat an empty value as zero. Do not calculate client acceptance from
unknown outcomes. Do not count multiple downloads of the same snapshot as
repeat product usage.

### 14.3 Measurement definitions

- `upload_to_approval`: first successful draft creation to successful approval.
- `approval_to_first_export`: approval to first successful PDF or DOCX response.
- `corrections_count`: recruiter-confirmed changed fields/review actions, not
  keystrokes.
- `unsupported_claims_caught`: requirements explicitly rejected or corrected
  because source evidence did not support the proposed claim.
- `client_acceptance_rate`: accepted outcomes divided only by packs with a
  known accepted/rejected/withdrawn outcome; report the denominator.
- `repeat_usage`: a separate approved MatchPack after the account's first
  approved MatchPack; repeated downloads do not count.

### 14.4 Public-claim gate

Do not publish a time-saving percentage, correction rate, unsupported-claim
rate, client acceptance rate or “trusted by” statement until:

1. the observations come from normal paying customers, not synthetic tests;
2. the sample size and date range are stated internally;
3. internal/test accounts are excluded;
4. the calculation can be reproduced;
5. the wording describes observed data, not a universal guarantee;
6. the user approves publication.

There is intentionally no invented numerical threshold in this specification.
First establish the baseline, then set product targets from observed usage.

---

## 15. Phase 9 — privacy, subprocessors and DPA documentation

### 15.1 Technical truth registry

Create one structured source of truth, for example
`lib/agency-privacy-content.ts`, covering:

- category of candidate/account data;
- processing purpose;
- whether stored;
- storage location/region;
- default/configurable retention;
- deletion behaviour;
- subprocessor legal entity;
- service purpose;
- processing region/data-transfer mechanism where verified;
- effective date and last verified date.

Public privacy, retention, subprocessor and help pages should render from or be
checked against this source instead of duplicating contradictory prose.

### 15.2 Public pages

Required:

- update `/agency/privacy`;
- add a dedicated public subprocessor page or clear anchored section;
- link it from Agency checkout, account settings, checker and help guide;
- publish a change date;
- explain how customers can request the current DPA.

The subprocessor page must list only verified deployed providers. Do not infer
the SMTP provider, hosting legal entity, data region or contractual transfer
mechanism from a hostname or environment variable. The deployment owner must
confirm those facts from invoices/contracts/configuration.

### 15.3 DPA boundary

The coding agent may prepare a factual DPA draft and implementation checklist,
but must label it `LEGAL REVIEW REQUIRED` and must not publish it as an executed
or legally approved agreement.

Broad promotion for routine processing of real candidate data remains blocked
until the user has either:

- obtained appropriate professional legal review and approved the DPA; or
- made a documented business decision to continue with restricted authorised
  use and truthful “DPA on request / under review” wording.

The agent must not claim GDPR/AVG compliance as a binary product feature.

### 15.4 Required privacy explanations

- Original PDF/DOCX binary handling.
- Extracted text handling.
- Stored structured candidate data.
- Stored vacancy, analysis, revisions, proposal and outcomes.
- OpenAI processing boundary.
- Authentication/email provider boundary.
- Billing provider boundary.
- Hosting/database boundary.
- Analytics boundary.
- Retention options and expiry calculation.
- Individual and full Agency deletion.
- Deletion receipts and accounting records retained.
- Contact-free output limitations and indirect identifiers.
- Customer/agency controller responsibility and candidate authority.

### 15.5 Privacy acceptance criteria

- Public copy matches actual code and deployed providers.
- Retention UI and privacy page show the same options/default.
- Deletion page explains retained billing/quota/deletion-receipt data.
- No page promises legal anonymity.
- DPA status is unambiguous.
- Provider legal names and regions are verified, not guessed.
- Privacy links are available before the user submits real data.

---

## 16. Phase 10 — production deployment and rollout

### 16.1 Pre-deployment release gate

All must pass:

- targeted Agency ESLint;
- `npx tsc --noEmit`;
- `npm run build`;
- existing MatchPack smoke;
- new Agency unit/integration/release suite;
- output-quality suite;
- empty and existing-schema migration rehearsal;
- retention dry-run on a non-production database;
- manual PDF/DOCX review;
- product-truth review;
- privacy/subprocessor factual review;
- production backup and rollback-image identification.

### 16.2 Commit structure

Prefer focused commits:

1. `docs: establish agency production-readiness truth`
2. `chore: baseline prisma migrations`
3. `feat: add agency retention and deletion controls`
4. `fix: enforce agency role permissions`
5. `test: add agency release and output gates`
6. `feat: add agency onboarding and help`
7. `feat: connect evidence checker discovery`
8. `docs: publish verified agency privacy information`

Do not include unrelated dirty-worktree changes. Adapt commit boundaries only
when files cannot be safely separated.

### 16.3 Deployment

Follow `DEPLOYMENT_HETZNER.md`:

1. Confirm reviewed commit and branch lineage.
2. Push the reviewed commit.
3. Trigger the GitHub `Build app image` workflow with deployment enabled.
4. Do not build on the VPS.
5. Watch the workflow to completion.
6. Confirm migration success before app health.
7. Confirm container image SHA equals the reviewed commit.

Deployment is not authorised by this specification alone. The executing task
must explicitly authorise commit/push/deploy.

### 16.4 Production smoke test

Use only the built-in fictional case or a newly created fictional Agency test
account.

Verify:

- `/tools/kandidaatvoorstel-checker` returns `200`;
- `/en/candidate-proposal-checker` returns `200`;
- `/agency` returns expected product copy;
- `/agency/account` authentication works;
- same-origin MatchPack POST succeeds behind nginx;
- cross-origin request fails;
- fictional draft creation consumes no slot;
- approval consumes exactly one slot;
- full/contact-free PDF and DOCX download;
- revision history and reviewer statuses;
- retention date display;
- individual deletion and receipt on a disposable fictional pack;
- role permissions with disposable fictional team users;
- sitemap/robots/AI discovery resources;
- logs contain no fixture content or secrets.

### 16.5 Rollback

Rollback immediately if:

- migration fails or schema drift appears;
- authentication or origin checks block legitimate production use;
- cross-account access is possible;
- approval consumes more than one slot;
- export exposes direct identifiers in the contact-free synthetic fixture;
- deletion removes billing records or refunds quota;
- the app container fails health checks;
- a new route logs CV/vacancy content.

Rollback uses the previous known-good GHCR image. Database rollback uses the
pre-deploy backup or an explicitly reviewed forward repair. Never improvise a
destructive production schema command.

---

## 17. Final acceptance matrix

The implementation report must reproduce this matrix with evidence links or
command results.

| Gate | Pass condition |
|---|---|
| Product truth | Public and internal capability statements match code |
| Migration safety | Baseline and forward migration verified on empty and existing-schema databases |
| Retention | New/default policy, existing-account activation, dry-run and execute tested |
| Deletion | Draft/approved/all-data deletion complete, scoped, receipted and no quota refund |
| Authentication | Unauthenticated and non-Agency requests rejected |
| Origin | Valid nginx request accepted; cross-origin request rejected |
| Roles | Every matrix cell enforced by API tests |
| Evidence | Displayed snippets resolve to supplied sources |
| Human review | Unreviewed/partial/missing evidence cannot be silently treated as confirmed |
| Revision | Changed fields and actor/version persist correctly |
| Approval | Immutable and exactly one shared slot consumed under concurrency |
| PDF | Full/contact-free structural, visual and PII checks pass |
| DOCX | Full/contact-free OpenXML, content and PII checks pass |
| CSV | Encoding, escaping, formulas, quota and permission checks pass |
| Onboarding | First-time owner can complete workflow without sales assistance |
| Help/privacy | Limits, retention, processors and DPA status are truthful and findable |
| Free checker | NL/EN routes, sample, sitemap, AI discovery and conversion paths pass |
| Analytics | Metrics are reproducible and contain no candidate content |
| Build | Lint, TypeScript and production build pass |
| Production | Image SHA, migration, routes, fictional workflow, logs and rollback verified |

The product may be described as technically production-ready only when every
technical gate passes. It may be described as market-proven only after normal
paying-customer outcome data supports that separate claim.

---

## 18. Recommended execution sequence for the coding agent

Use this checklist exactly:

1. Baseline and update stale truth documents.
2. Establish Prisma migration baseline in local/disposable environments.
3. Implement schema changes and retention service.
4. Implement retention settings, expiry display and individual deletion.
5. Refactor and enforce action-specific role permissions.
6. Refactor MatchPack orchestration for deterministic dependency injection.
7. Build domain, integration, permission, concurrency and retention tests.
8. Build synthetic fixture corpus and PDF/DOCX privacy checks.
9. Build browser release journey and mobile smoke.
10. Add onboarding checklist, help content and bounded feedback prompt.
11. Complete free-checker Tools/AI-discovery connections.
12. Audit measurement definitions and test event quality.
13. Update privacy/subprocessor pages from verified provider facts.
14. Prepare the legally labelled DPA draft/checklist; stop short of claiming
    legal approval.
15. Run the complete release gate.
16. Create the implementation report.
17. Stop and request explicit authorisation before production baseline marking,
    database migration, commit/push, deployment or external communication if
    the current task did not already provide that authority.

---

## 19. Definition of done

This specification is done when:

- all technical acceptance gates pass;
- all destructive operations have dry-run and owner-scope protections;
- no real candidate data was used during implementation or QA;
- no unrelated user changes were overwritten or staged;
- migration, backup and rollback procedures are verified;
- public content accurately states the product's limits;
- the free checker and onboarding make normal self-service acquisition
  possible;
- the implementation report distinguishes completed work, external/legal
  blockers and unproven market outcomes;
- the user can decide to deploy without needing the implementing agent to guess
  what remains.
