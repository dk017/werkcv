# WerkCV MatchPack production-closure specification

**Executor edition:** GPT-5.6 Luna Max  
**Date:** 20 August 2026  
**Status:** implementation specification; not deployment authorisation  
**Repository:** `D:\DKPlayground\werkcv`  
**Primary product:** WerkCV MatchPack  
**Billing tier:** WerkCV Agency

---

## 1. Mission

Finish the existing MatchPack implementation so it satisfies the technical,
privacy, reviewer-trust and operational requirements needed for a controlled
production release.

The current implementation is a useful pre-production foundation. It builds and
its narrow smoke suite passes, but it is not production-ready. This specification
closes the remaining gaps. It does not authorise a production database change,
commit, push, deployment, customer email or legal publication.

The executor must optimise for this outcome:

> A recruiter can upload an authorised CV, add a genuine vacancy, review every
> requirement against resolvable source evidence, correct or reject unsupported
> claims, approve one immutable snapshot, and export full or contact-free PDF and
> DOCX outputs without rejected evidence, silent invention or uncontrolled
> retention.

Do not add unrelated product features. Do not add an ATS integration. Do not
redesign the consumer CV builder.

---

## 2. Source-of-truth hierarchy

Use this order when documents disagree:

1. This production-closure specification.
2. `docs/product/agency-production-readiness-spec.md` for requirements not
   explicitly replaced here.
3. Current database schema and route behaviour.
4. `docs/product/agency-production-readiness-implementation-report.md` only as a
   historical implementation record. Its green authentication, role and evidence
   rows are not release proof because route-level integration tests do not yet
   exist.
5. Older MatchPack planning documents are historical context only.

Never use chat memory as the only source for a product decision. Record every
material decision in this document's implementation report.

---

## 3. Non-negotiable product invariants

Every implementation and test must preserve these rules.

1. **MatchPack is the product category.** Agency is the billing tier and shared
   allowance.
2. **The allowance is shared.** It is 50 total paid document slots per billing
   period, not 50 MatchPacks plus 50 separate CVs.
3. **Analysis does not consume a slot.** Approval consumes exactly one slot.
   Creating a separate Agency CV also consumes one slot.
4. **Human review is real.** Review controls must be enforced by the server, not
   only by disabled buttons or browser checkboxes.
5. **Rejected evidence never becomes client evidence.** This includes PDF, DOCX,
   copied introductions and accompanying email.
6. **Missing information stays visible.** It must not be invented, converted into
   a positive claim or silently removed from the review workflow.
7. **Evidence is traceable.** Every client evidence statement must resolve to a
   stored source reference reviewed by a recruiter.
8. **Approval creates an immutable snapshot.** Retried or concurrent approval
   requests consume one slot and create one derived CV.
9. **Contact-free is not called anonymous.** It removes defined direct identifiers
   and displays its limitation. Employer, school and project identifiers may
   remain.
10. **Retention follows meaningful content state.** Saving a draft recalculates
    its expiry; approval freezes the new base at approval time; viewing or
    exporting does not extend it.
11. **Deletion never refunds quota.** Usage records and billing records remain.
12. **Candidate content does not enter logs, analytics or operational receipts.**
13. **Original upload files are not retained.** Page-aware extracted text and
    structured content may be retained inside the MatchPack retention boundary,
    provided public privacy copy says so.
14. **Production readiness is evidence, not a label.** A helper unit test cannot
    prove route enforcement; a structural PDF test cannot prove visual quality;
    a successful build cannot prove database migration safety.

---

## 4. Verified starting state

Before editing, confirm these facts again. If a fact has changed, record the
difference and adapt without weakening an invariant.

### 4.1 Present and useful

- MatchPack create, detail, save, approve, PDF, DOCX, deletion and outcome routes.
- Owner/editor/reviewer/viewer permission helpers.
- Same-origin helper.
- Evidence source snippets, reviewer statuses and revisions.
- Full and contact-free output paths.
- Retention settings, deletion receipts and a dry-run-by-default sweep.
- Migration-based container entrypoint.
- CSV import/export.
- Account checklist, help guide, privacy page and free NL/EN checker.
- Current TypeScript and production build pass.

### 4.2 Known release blockers

- Browser approval checkboxes are not proven to the approval API.
- The API can approve when evidence rows remain unreviewed.
- A rejected evidence row can still appear in the PDF because output selection
  ignores reviewer status.
- Corrected evidence has no unambiguous reviewed client-evidence contract.
- Draft save does not refresh `retentionExpiresAt`.
- Existing subscriptions can keep `retentionPolicySetAt = null` indefinitely
  while continuing to create and approve content.
- The release script has no database, route-permission, concurrency or browser
  journey coverage.
- CSV export does not neutralise formula-like cells.
- Invalid CSV row parsing can escape the per-row error boundary.
- Analytics accepts arbitrary properties and logs them.
- Approval timing is accepted from the browser rather than derived by the server.
- Client-outcome and product-feedback data are mixed.
- Acceptance-rate calculation omits withdrawn outcomes from the known
  denominator.
- The onboarding example is permanently incomplete.
- The required one-time factual welcome email is absent.
- Contact-free output and visual regression cover too few fields/templates.
- Prisma baseline and forward migrations have not been rehearsed on empty and
  existing-schema databases.
- No production scheduler, human document review, provider verification or
  rollback exercise has been completed.

---

## 5. Executor operating protocol

Luna Max must follow this protocol exactly.

### 5.1 Before making changes

1. Read this file completely.
2. Read `AGENTS.md` and repository instructions.
3. Read the current readiness specification and implementation report.
4. Run `git status --short` and preserve all unrelated work. The worktree is
   expected to be dirty.
5. Build a file-level change inventory. Mark each target as existing, new or
   migration-only.
6. Run the current deterministic Agency suite, TypeScript and a focused lint
   baseline. Record results before changing code.
7. Inspect the actual Prisma schema and every `app/api/agency/**/route.ts` route.
8. Do not assume the implementation report proves anything that has not been
   reproduced.

### 5.2 While implementing

- Work in the phase order in section 18.
- Complete one phase and its tests before starting the next.
- Use pure domain services with injected clock/database/output dependencies where
  practical. Do not keep adding logic directly to route handlers.
- Validate every request and stored JSON boundary with Zod.
- Use server-derived owner scope. Never accept `ownerUserId` or
  `subscriptionId` from the browser.
- Do not add a public test endpoint or production authentication bypass.
- Do not log filenames, candidate names, CV/vacancy text, source snippets,
  proposal copy or email copy.
- Do not add `TODO`, placeholder tests, skipped tests or assertions that merely
  restate a fixture.
- If a command cannot run because the required database/browser/provider is
  unavailable, continue safe independent work but leave that gate red. Do not
  relabel it as passed.
- After modifying a route, re-read the whole route and its permission/error
  behaviour. Do not review only the diff hunk.
- After modifying a shared schema, search every parser, writer and renderer that
  consumes it.

### 5.3 Claims discipline

The executor must not say:

- "production-ready" before every technical gate passes;
- "GDPR/AVG compliant" without legal/provider verification;
- "anonymous" for the contact-free variant;
- "release tests pass" when only unit/smoke tests ran;
- "migration safe" without empty/existing-schema rehearsal and restore evidence;
- "review enforced" when enforcement exists only in React state.

Use these accurate intermediate labels:

- `implemented, not integration-tested`;
- `deterministically tested`;
- `database-tested in a non-production environment`;
- `human-reviewed`;
- `production-verified`.

### 5.4 Stop conditions

Stop and report rather than guess if:

- the production schema differs from the migration baseline;
- the only available database resolves to production;
- a test cleanup target cannot be proven to belong to the test run;
- existing user changes overlap in a way that cannot be preserved;
- provider, region, subprocessor or legal facts cannot be verified;
- production baseline marking, migration, scheduler activation, email delivery,
  commit, push or deploy has not been explicitly authorised.

---

## 6. Target architecture

Route handlers must become thin adapters around these domain boundaries.

```text
CV upload + vacancy
        |
        v
page-aware extraction -> stored extracted source + source map
        |
        v
AI parse/match -> schema validation -> source resolution
        |
        v
reviewable MatchPack draft + revision history
        |
        v
server review validation + approval checklist + serializable quota transaction
        |
        v
immutable approved snapshot
        |
        +--> reviewed output projection --> full PDF/DOCX/email
        |
        +--> contact-free projection --> PII scan --> contact-free PDF/DOCX/email
        |
        +--> server-derived metrics and separate bounded feedback
        |
        v
retention sweep / scoped deletion -> content-free receipt, quota preserved
```

### 6.1 Required domain modules

Create or refactor toward these files. Naming may be adjusted only to avoid an
existing collision; record any adjustment.

```text
lib/agency-matchpack-source.ts
  Page-aware extraction result and source-reference resolution.

lib/agency-matchpack-review.ts
  Evidence-review schema, review validation and output eligibility.

lib/agency-matchpack-approval.ts
  Approval request schema, checklist validation, immutable snapshot digest and
  serializable approval orchestration.

lib/agency-output-projection.ts
  The single reviewed projection used by PDF, DOCX, preview and copied email.

lib/agency-retention.ts
  Retention calculation, policy activation, deletion and sweep.

lib/agency-metrics.ts
  Server-derived timing/outcome definitions and reporting queries.

lib/agency-feedback.ts
  Separate bounded product-feedback validation and content-safety checks.

lib/agency-csv.ts
  BOM-safe parsing, complete validation and formula-safe export.

lib/email.ts
  Shared SMTP transport boundary used by login and one-time Agency welcome mail.

scripts/agency-tests/
  Unit, integration, concurrency, migration, output and browser release tests.
```

Do not duplicate business rules independently inside the PDF and DOCX renderers.

---

## 7. Data model and migration changes

Inspect the generated Prisma client and existing names before editing. Use one or
more forward migrations after the existing migration sequence. Never modify a
migration that has already been applied anywhere without first proving it has not
been applied.

### 7.1 `AgencyMatchPack`

Add fields equivalent to:

```prisma
sourceText                  String?   @db.Text
sourceMap                   Json?
approvalData                Json?
approvedRevisionVersion     Int?
approvedSnapshotDigest      String?
firstExportedAt             DateTime?
correctionsCount            Int       @default(0)
unsupportedClaimsCaught     Int       @default(0)
clientOutcome               String    @default("unknown")
clientOutcomeRecordedAt     DateTime?
clientOutcomeRecordedById   String?
productFeedbackData         Json?
```

Rules:

- `sourceText` is extracted text, not the binary upload and not the filename.
- It is candidate content and must disappear with the MatchPack.
- `sourceMap` follows the versioned schema in section 8.1.
- `approvalData` contains only checklist/version/actor/timestamp metadata and no
  candidate content.
- `approvedSnapshotDigest` is SHA-256 over a canonical serialization of the
  approved candidate data, submission, reviewed analysis, output choice,
  template and revision version.
- Explicit metric fields replace browser-supplied timing values.
- Keep legacy `outcomeData` temporarily for a controlled compatibility/backfill
  migration. New writes must use the explicit fields. Remove it only in a later
  migration after the backfill is verified.

### 7.2 `AgencySubscription`

Add fields equivalent to:

```prisma
onboardingExampleViewedAt   DateTime?
excludeFromProductMetrics   Boolean   @default(false)
```

`excludeFromProductMetrics` must be true for automated fixtures, internal QA and
test subscriptions. It must not be writable from the customer UI.

Add a durable content-free outbox model equivalent to:

```prisma
model AgencyTransactionalEmail {
  id              String   @id @default(cuid())
  subscriptionId  String
  kind            String
  recipientEmail  String
  locale          String   @default("nl")
  status          String   @default("pending")
  attemptCount    Int      @default(0)
  claimedAt       DateTime?
  sentAt          DateTime?
  lastErrorCode   String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@unique([subscriptionId, kind])
  @@index([status, createdAt])
}
```

This record may contain the account recipient address because it is required for
transactional delivery. It must never contain candidate data, proposal text,
vacancy text or arbitrary email-body content. The body is generated from the
versioned `kind + locale` template at send time.

### 7.3 Backfill rules

Write a bounded, resumable, dry-run-by-default backfill if existing JSON metric
data must be migrated.

- Never print JSON content.
- Print only counts, synthetic/internal IDs, error codes and durations.
- Map known client outcomes exactly.
- Treat absent timing as null, never zero.
- Do not infer `firstExportedAt` from `updatedAt`.
- Do not activate retention or calculate legacy expiry during schema deployment.
- Existing retention acknowledgement remains an explicit owner action.

### 7.4 Migration acceptance

The migration gate passes only when all are true:

1. `prisma validate` and `prisma generate` pass.
2. Full migration chain succeeds on an empty disposable PostgreSQL database.
3. A schema-equivalent legacy database without migration history is baselined in
   the rehearsal, then forward migrations succeed.
4. The final schema is compared with `prisma/schema.prisma` and has no drift.
5. A pre-migration backup is restored into a separate disposable database and
   opens successfully.
6. Failure stops application activation.
7. No production database was touched unless separately authorised.

---

## 8. Source and evidence contracts

### 8.1 Stored source map

Create a versioned Zod schema:

```ts
type MatchPackSourceMapV1 = {
  version: 1;
  fileType: "pdf" | "docx";
  lineCount: number;
  pages: Array<{
    pageNumber: number;
    startLine: number;
    endLine: number;
  }>;
};
```

Rules:

- PDF extraction must preserve page boundaries before concatenating text.
- DOCX does not have reliable rendered pages; store `pages: []` and show line and
  section only. Never invent DOCX page numbers.
- Normalise line endings to `\n` before calculating references and digest.
- A source reference contains page only when the mapped line is inside a known
  PDF page range.
- The original filename is never stored.

### 8.2 Reviewed evidence schema

Extend each requirement with one review object equivalent to:

```ts
type EvidenceReviewV1 = {
  version: 1;
  reviewerStatus: "unreviewed" | "confirmed" | "corrected" | "rejected";
  reviewerNote: string;             // internal only, max 400
  reviewedEvidence: string;         // client-eligible text, max 600
  reviewedSource: SourceReference | null;
  reviewedAt: string | null;
  reviewerId: string | null;
};
```

Do not use `reviewerNote` in client output.

Validation rules:

- `unreviewed`: `reviewedAt` and `reviewerId` are null.
- `confirmed`: requires non-empty resolved source snippet and a source match of
  `exact` or `approximate`. `reviewedEvidence` defaults to the current evidence
  statement but is still validated.
- `corrected`: requires a non-empty `reviewedEvidence`, non-empty internal note
  explaining the correction and a reviewed source that resolves to stored source
  text. Do not permit a correction without a source.
- `rejected`: `reviewedEvidence` must be empty and the row is never eligible for
  client evidence.
- Requirements whose analysis status is `missing` can be marked reviewed/rejected
  but remain open items.
- Approximate source matches remain visibly qualified. Human confirmation does
  not rewrite an approximate source into an exact source.
- Availability, notice period, rate, hours, work location and preferences are
  commercial/current facts. They do not become CV evidence. They remain empty
  until a recruiter enters and confirms them separately.

### 8.3 Source resolution

Implement one resolver used during analysis, save, approval and tests.

- Resolve vacancy snippets against `vacancyText`.
- Resolve CV snippets against `sourceText`.
- Verify line, section and page metadata against the resolved snippet.
- If a stored reference no longer resolves, downgrade it to review/missing and
  block approval until reviewed.
- Generated AI text is never treated as its own source.
- Store and compare a digest of normalised `sourceText`.

---

## 9. Server-enforced review and approval

### 9.1 Approval request contract

The browser must send exactly:

```ts
type MatchPackApprovalRequestV1 = {
  version: 1;
  expectedUpdatedAt: string;
  expectedRevisionVersion: number;
  selectedVariant: "full" | "contact_free";
  confirmations: {
    evidenceReviewed: true;
    candidateDataReviewed: true;
    clientCopyReviewed: true;
    sharingAuthorityConfirmed: true;
  };
};
```

Remove client-supplied duration and correction metrics from this endpoint.

### 9.2 Approval server validation

Inside the same serializable approval operation:

1. Authenticate and derive Agency access.
2. Enforce owner/reviewer approval role.
3. Load the pack by `id + ownerUserId`.
4. Require active subscription and acknowledged retention policy.
5. Require status `analyzed`, unless returning an already-created idempotent
   result.
6. Compare `expectedUpdatedAt` and latest revision version.
7. Parse candidate, submission, analysis, source map and request schemas.
8. Resolve every vacancy and CV reference again.
9. Require every requirement to have a non-`unreviewed` reviewer status.
10. Enforce the corrected/rejected rules in section 8.2.
11. Require all four confirmations to be literal `true`.
12. Build the reviewed output projection before reserving quota. If projection
    validation fails, do not consume a slot.
13. Count corrections and unsupported claims on the server from persisted
    revisions/review state.
14. Derive upload-to-approval time from `pack.createdAt` and server approval time.
15. Reserve one shared slot, create one derived CV, save approval metadata and
    lock the pack in one serializable transaction.
16. Store approved revision version and snapshot digest.
17. Return content-free metadata only.

Stable failure codes:

```text
AUTH_REQUIRED
AGENCY_PLAN_REQUIRED
RETENTION_POLICY_REQUIRED
ROLE_FORBIDDEN
NOT_FOUND
PACK_STALE
PACK_LOCKED
REVIEW_INCOMPLETE
EVIDENCE_UNRESOLVED
CORRECTION_INVALID
APPROVAL_CONFIRMATION_REQUIRED
AGENCY_QUOTA_REACHED
APPROVAL_FAILED
```

### 9.3 Idempotency and concurrency

- Use Serializable isolation with bounded retry for serialization conflicts.
- A retry after successful approval returns the existing linked CV and does not
  add usage.
- Two simultaneous approval requests produce one approved pack, one linked CV
  and one `AgencyCvUsage` row.
- Add or verify database uniqueness that supports this invariant.
- Do not rely on a pre-transaction status read as the concurrency control.

### 9.4 Immutable approved snapshot

- PATCH on an approved pack returns `409 PACK_LOCKED`.
- PDF/DOCX/email projection uses only the locked approved snapshot fields.
- The linked MatchPack CV must not be editable through the normal editor action.
  `updateCV`, template and colour changes must reject a CV linked to an approved
  MatchPack with `MATCHPACK_SNAPSHOT_LOCKED`.
- If an editable copy is desired, expose an explicit duplicate action in a later
  release. Do not silently mutate the approved artifact.

---

## 10. One reviewed output projection

Create `buildApprovedMatchPackOutput(...)` as the only source for:

- client proposal preview;
- full PDF;
- contact-free PDF;
- full DOCX;
- contact-free DOCX;
- copied client introduction;
- copied accompanying email.

### 10.1 Evidence selection

A requirement can enter the client evidence section only when:

- analysis status is `strong` or `partial`;
- reviewer status is `confirmed` or `corrected`;
- reviewed source resolves to stored source text;
- reviewed evidence is non-empty.

Rules:

- `rejected` and `unreviewed` rows are excluded.
- `missing` rows are excluded from positive evidence and included in open items.
- Confirmed partial evidence retains a visible qualification.
- Open items use safe, factual action text and never imply the requirement is met.
- Internal reviewer notes, IDs and source diagnostics never enter client output.

### 10.2 Contact-free projection

Apply redaction to every client-visible string, not only candidate CV fields:

- proposal title and introduction;
- reviewed evidence;
- open-item requirement/action text;
- commercial fields and preferences;
- candidate summary and all CV sections;
- email subject and body;
- template header/footer fields only where they contain candidate data.

Remove known direct candidate identifiers:

- full name and unambiguous name parts;
- email;
- telephone;
- personal URL/social URL;
- home address;
- postal code;
- exact personal location when stored as a direct contact field;
- photo and references;
- birth and personal-status fields.

Then scan the complete generated text/XML before returning it. If any known
direct token remains, fail with `CONTACT_FREE_VALIDATION_FAILED`; never return a
best-effort file.

Keep the visible limitation:

> Directe contactgegevens verwijderd. Controleer bedrijfsnamen, scholen en
> projectdetails voordat je dit met een klant deelt.

Do not claim employers, schools or projects were removed.

### 10.3 Renderer rules

- PDF and DOCX receive the same projection object.
- Renderers do not reinterpret reviewer status.
- PDF HTML escapes all untrusted strings.
- DOCX XML escapes all untrusted strings.
- Accompanying email is tested for the selected variant.
- First successful export timestamp is set atomically using a conditional update;
  concurrent first downloads cannot overwrite an earlier timestamp.
- Viewing/exporting does not update retention expiry.

---

## 11. Retention and deletion closure

### 11.0 Policy invariants

- A newly activated Agency subscription sets 90 days and
  `retentionPolicySetAt = activation time`.
- Selectable values remain exactly 30, 90, 180 and 365 days.
- Existing subscriptions remain null until explicit acknowledgement; schema
  migration alone does not schedule their historical content for deletion.
- First activation of historical content applies at least seven days of grace.
- A shorter policy shows affected pack count and earliest deletion date before
  mutation.
- If any existing content would expire within 30 days, require a real typed
  confirmation field. A browser `window.confirm()` dialog is not typed
  confirmation.
- Policy preview and apply use the same captured clock value and re-check state
  transactionally before applying.

### 11.1 Existing-account enforcement

For an active subscription with `retentionPolicySetAt = null`:

Allowed:

- view existing packs;
- export an already-approved pack;
- delete content;
- open account/privacy/help/settings;
- preview and activate a retention policy.

Blocked with `409 RETENTION_POLICY_REQUIRED`:

- create MatchPack;
- save candidate/proposal/evidence changes;
- approve MatchPack;
- import Agency CV CSV;
- create a separate Agency CV.

This preserves existing content without silently deleting it and prevents new
indefinite content.

### 11.2 Draft save refresh

Every successful meaningful PATCH must, in the same transaction:

1. lock/re-check `status = analyzed`;
2. persist draft and revision;
3. use the transaction's resulting `updatedAt` as the retention base;
4. calculate `retentionExpiresAt = updatedAt + retentionDays`;
5. return the new exact expiry.

Do not apply the seven-day activation grace on every normal save. Grace exists
for first activation of historical content, not as a permanent extension rule.

### 11.3 Approval and export

- Approval sets expiry from `approvedAt + retentionDays`.
- Export does not change expiry.
- Outcome/feedback save does not change expiry because it is non-candidate
  lifecycle metadata.

### 11.4 Sweep and deletion

- Dry-run remains default.
- Execute still requires both `--execute` and the documented confirmation value.
- Re-check expected `updatedAt` and expiry inside the deletion transaction.
- Process at most 100 packs per bounded selection.
- Continue safely across owners; one owner failure does not expose another.
- Delete source text/map, candidate/submission/analysis JSON, revisions and linked
  derived CV by deleting the scoped pack/CV records.
- Preserve quota, billing and payment records.
- Receipt remains content-free.
- Add a content-free operational result containing counts, durations and error
  codes.

---

## 12. Permissions and origin route matrix

Keep the existing role matrix, but prove it at route level.

| Route/action | Owner | Editor | Reviewer | Viewer |
|---|---:|---:|---:|---:|
| List/detail | yes | yes | yes | yes |
| Create MatchPack | yes | yes | no | no |
| Save candidate/proposal | yes | yes | yes | no |
| Review evidence | yes | yes | yes | no |
| Approve | yes | no | yes | no |
| Export approved PDF/DOCX | yes | yes | yes | no |
| Delete draft | yes | yes | no | no |
| Delete approved | yes | no | no | no |
| CSV import | yes | yes | no | no |
| CSV export | yes | yes | yes | no |
| Insights | yes | yes | yes | no |
| Templates/team/retention/all-data | yes | no | no | no |

Requirements:

- Each cell receives an API/integration assertion, not only a helper assertion.
- Every query filters by authenticated owner scope.
- Another Agency's pack ID returns 404 and reveals no existence metadata.
- Mutation routes use same-origin validation and stable `INVALID_ORIGIN`.
- Test the real nginx header combination, canonical origin, valid referer fallback,
  cross-origin, forged forwarded host, null origin and loopback development.
- Export GET routes remain authenticated, role-checked and owner-scoped.

---

## 13. CSV safety and quota behaviour

### 13.1 Parser

- Accept UTF-8 with or without BOM.
- Handle commas, quotes, CRLF/LF and embedded line breaks.
- Reject duplicate/empty headers.
- Validate every row before writing anything.
- Move `cvSchema` parsing inside the row validation boundary.
- Return bounded row numbers and error codes, never echo candidate cell content.
- Limit file to 2 MB and 100 rows.

### 13.2 Import transaction

Use all-or-nothing semantics for this release:

- Validate all rows first.
- Calculate required slots.
- If remaining allowance is insufficient, return `409 AGENCY_QUOTA_REACHED` and
  create no CVs.
- Create all CVs and usage rows inside one Serializable transaction.
- A failed row or database write creates no partial import.

### 13.3 Export formula neutralisation

Before CSV escaping, if a cell's first non-whitespace character is `=`, `+`, `-`
or `@`, prefix the exported cell value with a single apostrophe.

Test at least:

```text
=HYPERLINK("https://example.test")
+SUM(1,1)
-1+2
@cmd
  =1+1
```

The exported CSV must open as text values in common spreadsheet applications.

---

## 14. Metrics, outcomes and product feedback

### 14.1 Server-derived metrics

- `upload_to_approval = approvedAt - createdAt`.
- `approval_to_first_export = firstExportedAt - approvedAt`.
- `corrections_count` comes from persisted changed fields and corrected/rejected
  review actions, not browser keystrokes.
- `unsupported_claims_caught` counts persisted rejected/corrected claims whose
  source did not support the proposed evidence.
- Browser requests cannot submit or overwrite these values.
- Retries do not duplicate counts.

### 14.2 Client outcome

Keep client outcome separate from product feedback:

```text
unknown
pending
accepted
rejected
withdrawn
```

Acceptance denominator contains `accepted + rejected + withdrawn`. `unknown` and
`pending` are excluded.

### 14.3 Product feedback

Store separately in `productFeedbackData`:

```ts
type ProductFeedbackV1 = {
  version: 1;
  sendability: "sent" | "corrected" | "not_usable" | "not_sent";
  issueCategories: Array<"evidence" | "parsing" | "editing" | "pdf" | "docx" | "privacy" | "other">;
  note: string;
  recordedAt: string;
  recordedById: string;
};
```

Content safety:

- max 500 characters;
- reject email, phone, URL, postal code and known candidate-name tokens;
- reject long phrases copied from stored CV, vacancy, introduction or email;
- never copy feedback to analytics;
- return a clear `FEEDBACK_CONTENT_NOT_ALLOWED` message;
- deletion follows the MatchPack content boundary.

### 14.4 Analytics endpoint

Replace arbitrary Agency property passthrough with event-specific Zod schemas and
allowlisted property names.

- Reject unknown keys for Agency events.
- Cap string lengths.
- Do not log the raw request body or arbitrary properties.
- Persist only content-free fields such as locale, variant, status, counts,
  durations and coarse error code.
- Add checker and onboarding events to persistence if they are part of the
  measurement plan.
- Exclude subscriptions with `excludeFromProductMetrics = true` from commercial
  insight queries.

---

## 15. Onboarding and factual welcome email

### 15.1 Checklist

- Persist `onboardingExampleViewedAt` through an owner-only same-origin action.
- The fictional-example step becomes complete after the owner opens the example.
- Other steps continue to derive from real state.
- Viewer/editor/reviewer must not be shown owner-only settings as actionable.
- Dismissal remains optional and persisted.
- A newly active owner can reach every required step without a sales call.

### 15.2 Welcome email

Refactor SMTP transport into a shared `lib/email.ts` boundary rather than
duplicating credentials.

Queue one welcome-email job after first successful Agency activation:

- Enforce `@@unique([subscriptionId, kind])` with kind `agency_welcome_v1` so
  duplicate activation events create one job.
- Atomically claim a pending job with a bounded lease before sending.
- Mark `sentAt` only after the SMTP transport reports acceptance.
- A timeout after SMTP submission is an ambiguous-delivery state. Record a
  content-free error code and require an operator decision before retrying; do
  not pretend plain SMTP provides exactly-once delivery.
- Unit/integration tests must prove duplicate activation events queue one job and
  a successfully sent job is never automatically sent again.
- If delivery fails, store/log only a content-free error code and retry state.
- Never include candidate data.
- Email links:
  - `/agency#voorbeeld`;
  - `/agency/account`;
  - `/agency/privacy`;
  - `/voor-bureaus/kennisbank/matchpack-handleiding`.
- State the shared 50-slot rule and that review is required.
- Do not add a sales sequence.

Add an injected fake mailer integration test proving one queued job and one send
across duplicate activation events.

---

## 16. Privacy and public truth

Update public copy only after implementation truth is stable.

Public explanations must accurately state:

- binary upload is processed and not retained;
- extracted source text, source references and structured MatchPack content are
  retained for the chosen period;
- exact selectable retention values and activation behaviour;
- what deletion removes and what billing/quota records remain;
- contact-free removes direct identifiers but may retain employer, school and
  project identifiers;
- AI output requires recruiter review;
- actual provider/subprocessor facts only after verification;
- DPA status without implying an executed legal agreement.

Do not claim legal compliance. Update
`docs/product/agency-dpa-review-checklist.md` with verified facts or leave fields
explicitly unresolved.

---

## 17. Required deterministic release system

### 17.1 Scripts

Create these scripts. The exact shell composition may differ, but the semantic
gates may not be omitted.

```json
{
  "test:agency:unit": "pure schemas/services",
  "test:agency:integration": "database routes, permissions, quota, retention",
  "test:agency:migrations": "empty + legacy baseline + restore rehearsal",
  "test:agency:e2e": "desktop/mobile authenticated browser workflow",
  "test:agency:outputs": "PDF/DOCX/email structural, PII and visual artifacts",
  "test:agency:live-ai": "optional fictional live model smoke",
  "test:agency:release": "unit + integration + migrations + e2e + outputs"
}
```

`test:agency:release` must not call paid external AI. It must fail if a required
database/browser is absent; it must not silently skip a gate.

### 17.2 Database safety guard

Database tests require `AGENCY_TEST_DATABASE_URL`.

Before connecting:

- parse the URL;
- require database name to end in `_test` or `_ci`;
- reject equality with `DATABASE_URL`;
- reject documented production host/database combinations;
- print only safe host classification and generated run ID;
- create unique users/subscriptions/records per run;
- clean only IDs recorded by that run;
- never truncate a shared database.

### 17.3 Route-level integration matrix

Test:

- unauthenticated request;
- consumer/non-Agency user;
- inactive/cancelled subscription;
- retention-unacknowledged owner;
- owner/editor/reviewer/viewer for every matrix action;
- another owner's ID;
- invalid origin cases;
- stable content-free request/error IDs and log payloads;
- invalid/oversized/mismatched/scanned files before AI invocation;
- rate-limit responses without candidate-derived keys;
- stale draft save;
- incomplete review approval;
- rejected evidence approval/output;
- quota exhausted;
- two concurrent approvals;
- retention sweep racing with save/approval;
- draft/approved/all-data deletion and quota preservation;
- CSV atomic import and formula-safe export;
- failed PDF and DOCX generation.

### 17.4 Browser journey

Use Puppeteer with a normal test session inserted directly in the dedicated test
database. Do not add a public login bypass.

Desktop flow:

1. Seed fictional active owner with acknowledged retention.
2. Set the normal session cookie.
3. Open MatchPack workspace.
4. Create deterministic fictional pack through injected orchestration or seeded
   source after upload boundary is separately integration-tested.
5. Verify analysis used no slot.
6. Review every evidence row: confirm exact, correct approximate, reject
   unsupported and confirm missing/open state.
7. Edit candidate data, introduction, email and commercial fields.
8. Save and verify revision/expiry changed.
9. Attempt approval with an unreviewed row and assert rejection.
10. Complete server-bound checklist and approve.
11. Assert one slot and immutable snapshot.
12. Download full/contact-free PDF and DOCX and copy the matching email.
13. Record separate client outcome and product feedback.
14. Reopen and verify history/lock.
15. Delete as owner; assert linked CV gone and usage remains.

Mobile flow at 390 px covers upload control, evidence navigation, approval
visibility, output selection and downloads. Assert no horizontal overflow.

### 17.5 Synthetic fixture corpus

Use only fictional data and `.example.test`/non-routable contacts.

Required cases:

1. Exact, partial, missing and rejected HR evidence.
2. Generated quote that cannot be resolved.
3. Candidate name/email/phone/address/postcode/URL repeated in every narrative
   and proposal field.
4. Employer, school and project identifiers intentionally retained with warning.
5. One-page and multi-page PDF.
6. DOCX with headings, tables and line breaks.
7. Scanned/empty PDF and page-limit failure.
8. CSV BOM, commas, quotes, CRLF, embedded newline and formula cells.
9. Concurrent approval and retention-save race.
10. Duplicate billing activation for welcome-email idempotency.

### 17.6 Output checks

Automated:

- PDF opens, expected pages, headings and text.
- DOCX valid OpenXML parts and extracted text.
- Full output contains allowed fictional identifiers.
- Contact-free output contains none of the known direct tokens across proposal,
  CV and email.
- Rejected/unreviewed evidence is absent.
- Missing/open items remain visible.
- No template token/debug text.
- Every production template with its default theme.
- Every Agency-selectable colour theme on one representative template.
- One-page and multi-page content.

Visual artifacts:

- render PDF pages to PNG;
- render DOCX to PDF/PNG using the repository's available document runtime;
- store under `output/agency-qa/<run-id>/`;
- do not commit large artifacts unless deliberately approved.

### 17.7 Human gate

Automation cannot approve indirect anonymity or visual quality. Record reviewer,
date, fixture and result for:

- every page of one full and contact-free PDF;
- every page of matching DOCX renders;
- every evidence link in two fictional cases;
- selected accompanying emails;
- desktop and mobile approval workflow;
- indirect identifiers remaining in contact-free output.

Until recorded, output quality remains `automated checks passed; human gate open`.

---

## 18. Mandatory implementation sequence

Luna Max must use this sequence and maintain a live checklist. Do not jump to
content/SEO before safety gates.

### Phase 0 — baseline and inventory

- Confirm dirty worktree and affected files.
- Run existing tests/TypeScript/build baseline.
- Create the new implementation report or add a closure section to the existing
  report.
- Record which required environments are available.

Exit: baseline evidence recorded; no files overwritten accidentally.

### Phase 1 — schema, source storage and migrations

- Add source map, approval, metric, feedback and onboarding/email fields.
- Add Zod schemas.
- Add page-aware PDF extraction and truthful DOCX mapping.
- Add forward migrations and disposable migration tests.

Exit: schema/migration unit checks pass; database rehearsal status explicit.

### Phase 2 — review and approval safety

- Implement reviewed evidence contract.
- Bind browser checklist to request contract.
- Validate reviews/references server-side.
- Implement approval snapshot digest/version.
- Prove concurrent idempotency.
- Lock linked approved CV editing.

Exit: rejected/unreviewed evidence cannot be approved or exported; concurrency
integration test passes.

### Phase 3 — reviewed output projection

- Centralise projection.
- Make PDF/DOCX/preview/email use it.
- Complete contact-free sanitisation and final token scan.
- Add rejected/open-item assertions.

Exit: structural/PII tests pass for all required variants; visual gate status
recorded separately.

### Phase 4 — retention and deletion closure

- Block indefinite new content for unacknowledged accounts.
- Refresh expiry on save.
- Verify approval/export retention semantics.
- Add sweep race and deletion integration tests.

Exit: all retention acceptance cases pass on a test database.

### Phase 5 — route permissions, origin and CSV

- Build the complete route matrix.
- Harden CSV parse/import/export.
- Prove owner isolation and formula neutralisation.

Exit: every matrix cell and CSV edge case has an integration assertion.

### Phase 6 — metrics, feedback, onboarding and email

- Move metrics to server-derived fields.
- Separate outcome and feedback.
- Allowlist Agency analytics properties.
- Persist example completion.
- Send one factual welcome email through injected shared mailer.

Exit: duplicate activation sends one email; metrics definitions reproduce from
stored server timestamps; feedback is content-bounded.

### Phase 7 — complete deterministic release gate

- Add database safety guard.
- Add integration, migration, concurrency, browser and output suites.
- Run full TypeScript, lint, production build and Agency release suite.
- Do not accept focused lint as the final lint gate.

Exit: commands complete with zero required skipped gates.

### Phase 8 — self-review and refinement

Perform three explicit review passes:

1. **Adversarial pass:** bypass browser controls, forge IDs/roles/origin, race
   approval/save/sweep, inject CSV formula and candidate text into analytics.
2. **Product-truth pass:** compare every Agency/privacy/help claim against code.
3. **New-user pass:** complete onboarding and normal workflow without relying on
   developer knowledge.

Fix all P0/P1 findings and rerun affected gates. Record remaining P2 items.

Before leaving this phase, search the implementation for each of these shortcut
patterns and explain every remaining occurrence:

```text
reviewReady                 browser-only approval readiness
window.confirm              destructive/retention confirmation
outcomeData                 legacy mixed metrics/outcome storage
safeProperties              arbitrary analytics passthrough
reviewerStatus              every client-output selection must consider it
retentionExpiresAt          every meaningful write must have explicit semantics
startSource agency_matchpack approved linked-CV mutation boundary
csvEscape                   formula neutralisation before quoting
```

### Phase 9 — handoff and stop

- Update implementation report and acceptance matrix.
- List exact commands/results, migrations, output artifacts and manual reviews.
- List external/legal/production blockers.
- Stop before production actions unless explicitly authorised.

---

## 19. Production rollout protocol — separate authorisation required

Do not execute this section merely because implementation is complete. The user
must separately authorise the relevant production database, commit/push and
deployment actions.

### 19.1 Pre-deployment evidence

- Every technical matrix gate is `pass`.
- Human document/evidence review is recorded.
- Provider/subprocessor facts are verified or public copy remains explicitly
  unresolved.
- Production PostgreSQL backup completes and a restore has already been
  rehearsed on a separate database.
- Record current production image SHA, candidate image SHA and rollback image
  SHA.
- Record current production schema fingerprint and compare it with the reviewed
  baseline.
- Confirm actual Hetzner scheduler mechanism, working directory, environment
  source, log destination and alerting.

### 19.2 Baseline and migration

- Use the documented one-time `migrate resolve --applied` command only if schema
  comparison proves the production schema already matches that baseline.
- Run `prisma migrate deploy`; never use production `db push`.
- Migration failure stops application activation.
- Do not improvise a destructive down migration. Use forward repair or restore
  according to the pre-approved rollback decision.

### 19.3 Application rollout

- Use the documented GitHub Actions/GHCR image flow in
  `DEPLOYMENT_HETZNER.md`.
- Deploy the exact reviewed image SHA.
- Verify health before routing normal traffic.
- Run a fictional authorised account smoke covering login, retention, create,
  review, approval, full/contact-free PDF/DOCX, outcome and deletion.
- Verify one slot consumed, linked CV deletion and usage preservation.
- Check logs for error/request codes and absence of candidate/vacancy content.

### 19.4 Retention scheduler

- Run production dry-run and review selected counts first.
- Activate the daily execute schedule only after dry-run approval.
- Require the documented execution confirmation environment value.
- Alert on failures and unexpected deletion counts.
- Record the first successful bounded execute result without candidate content.

### 19.5 Rollback triggers

Rollback or stop traffic when:

- login/origin protection rejects valid production requests;
- permissions expose cross-owner data;
- approval consumes duplicate slots;
- rejected evidence appears in output;
- contact-free known tokens remain;
- migrations drift/fail;
- retention selects unexpected records;
- error rate or document generation failures materially increase.

Record the rollback decision, image, database action and verification result.

---

## 20. Required implementation report format

Update:

`docs/product/agency-production-readiness-implementation-report.md`

It must contain:

1. Date, branch and tested commit/worktree identifier.
2. Scope completed.
3. Files and migrations added/changed.
4. Decisions or deviations from this specification and reasons.
5. Exact commands with exit result.
6. Test counts by unit/integration/migration/e2e/output.
7. Database safety guard result and disposable database identifiers.
8. Concurrency result: slot count, CV count and pack status.
9. Output artifact paths and automated PII result.
10. Human reviewer record or explicit open gate.
11. Provider/legal verification status.
12. Production backup/migration/scheduler/image/rollback status.
13. Final matrix using only `pass`, `fail`, `blocked` or `not run`.

Do not use a green check for a gate whose required test was not run.

---

## 21. Final acceptance matrix

| Gate | Exact pass condition |
|---|---|
| Product truth | Public/internal claims match implemented and tested behaviour |
| Source traceability | Stored PDF page/line and DOCX line references resolve |
| Review enforcement | Every row reviewed; direct API bypass rejected |
| Rejected evidence | Absent from preview, PDF, DOCX and email |
| Corrected evidence | Has resolved reviewed source and persists through history/export |
| Missing evidence | Remains open; never becomes positive client evidence |
| Approval checklist | Four confirmations validated and stored server-side |
| Approval concurrency | One pack, one linked CV, one usage row under simultaneous requests |
| Immutability | Pack and linked snapshot CV cannot be mutated after approval |
| Migration safety | Empty/legacy/restore rehearsals pass with no drift |
| Retention activation | New active accounts default 90; existing accounts cannot create indefinite content |
| Retention refresh | Meaningful draft save updates exact expiry |
| Retention sweep | Dry-run/execute/race/owner isolation pass on test DB |
| Deletion | Draft/approved/all-data scoped, receipted, derived CV removed, quota preserved |
| Authentication | Unauthenticated and non-Agency users rejected by integration tests |
| Roles | Every route/action matrix cell passes |
| Origin | Canonical/nginx/referer/local accepted; hostile/null/forged rejected as specified |
| Upload | Size/MIME/signature/page/text failures happen before AI |
| CSV | BOM/encoding/escaping/formula/atomic quota/role tests pass |
| PDF | Full/contact-free structural, content, PII and visual gates pass |
| DOCX | Full/contact-free OpenXML, content, PII and visual gates pass |
| Email | Variant-safe copy; one factual welcome email sent once |
| Metrics | Server-derived, retry-safe, reproducible, test/internal excluded |
| Feedback | Separate from outcome and rejects candidate content patterns |
| Analytics | Agency event schemas allowlisted; no arbitrary content logged |
| Onboarding | First owner can complete every step; role-aware actions |
| Free checker | NL/EN/sample/sitemap/AI discovery/conversion smoke passes |
| Privacy/help | Retention, deletion, extracted storage, limits and DPA status truthful |
| Build | Full lint, TypeScript and production build pass |
| Deterministic release | Unit + integration + migration + e2e + outputs pass with no required skips |
| Human QA | Named/date-stamped document, evidence, email and responsive review recorded |
| Production | Backup, image SHA, migration, scheduler, fictional smoke, logs and rollback verified |

The implementation is technically production-ready only when every technical
gate is `pass`. Human/legal/production gates must be described separately and may
still block release. Market proof remains a different question and requires
normal paying-customer outcome data.

---

## 22. Final executor instruction

Implement the specification completely, review the result against every matrix
row, and refine until no P0/P1 implementation finding remains.

Do not stop after the code compiles. Do not stop after unit tests pass. Do not
stop after the UI looks correct. The work is complete only when the relevant
server, database, output and browser gates have produced evidence, and every gate
that could not run is clearly left open.

If production authority has not been explicitly granted, finish with a safe
handoff and wait for the user. Do not baseline the production database, activate
the scheduler, send the welcome email to real customers, commit, push or deploy.
