# WerkCV MatchPack v1.1

Status: implementation verified; production deployment is included in this release.

## Product promise

MatchPack turns one candidate CV and one vacancy into an agency-ready review pack:

1. Extract the candidate CV into the existing WerkCV structure.
2. Extract the concrete vacancy requirements and map them to evidence in the CV.
3. Produce a concise, evidence-backed fit summary for the recruiter.
4. Produce the branded full CV and a separate anonymised CV draft.
5. Let the recruiter correct extracted CV data and edit the client introduction, email and confirmed commercial details.
6. Require human approval before the frozen snapshot becomes a complete client-facing submission and uses one monthly slot.

The product is agency-only in v1. It does not change the public editor, consumer checkout, public upload parser, or existing CV editor route.

## v1 workflow

```text
Agency account
    -> MatchPack workspace
    -> Upload PDF/DOCX + paste vacancy
    -> authenticated server validates file, plan, origin, limits and ownership
    -> parse CV + analyse vacancy evidence
    -> save MatchPack as analysed draft (no CV slot consumed)
    -> recruiter reviews fit, gaps and redactions
    -> recruiter corrects source data and edits the client-facing introduction
    -> saving regenerates both CV variants from the same candidate snapshot
    -> recruiter approves
    -> one CVDocument is created in the existing agency quota transaction
    -> full and anonymised submission PDFs (cover sheet + CV) become available
    -> client email is available to copy
```

An approved pack is immutable. Before approval, the recruiter may correct the structured source data and edit submission copy. The linked full CV can still be opened in the existing editor for the agency record, but MatchPack exports remain tied to the approved snapshot. If the vacancy or candidate changes after approval, the agency starts a new pack; this prevents an approved analysis from silently becoming stale.

## Data and quota decisions

- `AgencyMatchPack` is separate from `CVDocument` so analysis, evidence and anonymisation do not pollute the consumer CV model.
- Only structured CV data, vacancy text, validated analysis, submission copy and derived anonymised data are stored. The uploaded binary and raw extracted CV text are not stored.
- A draft analysis does not consume quota. Approval creates one `CVDocument` and one existing `AgencyCvUsage` row in the same serializable transaction.
- Approval is idempotent. A repeated click or concurrent request returns the existing linked CV instead of consuming another slot.
- The agency plan's configured template and colour are used for the full and anonymised outputs. The existing agency-branded route lock remains intact.

## Evidence rules

The model receives CV and vacancy text as untrusted source material, wrapped as data rather than instructions. It must:

- identify 5–8 concrete requirements with short vacancy evidence;
- classify each as strong, partial or missing;
- include a short CV quote where evidence exists;
- distinguish a keyword from proof of experience;
- never invent experience, qualifications, outcomes or availability;
- make the summary a recruiter-facing explanation, not an ATS guarantee;
- keep missing requirements visible instead of hiding them in a score.

The UI presents the score, if returned by the shared matching engine, as a secondary signal. The primary content is the evidence table, strengths, gaps and honest next action.

## Anonymisation rules

The v1 anonymised draft removes or replaces:

- name, email, phone, address, postal code and personal location;
- birth date, birth place, nationality, gender and marital status;
- LinkedIn, GitHub, personal website and photo;
- reference contact details and reference names;
- direct contact-like strings found in free text (email addresses, phone numbers, URLs and postal codes).

Company names, schools and project names are retained in v1 because reliably removing them without damaging the candidate story requires a separate review experience. The UI explicitly labels the result as an anonymised draft and requires the recruiter to review it before sharing. We do not claim that it is legally anonymous or AVG-proof.

## Security boundaries

- All MatchPack routes require a current session and an active Agency Plan for analysis and approval.
- Every read, update, approve, delete and PDF request filters by the authenticated `userId`.
- Same-origin checks and per-user/IP rate limits protect the mutation and AI routes.
- File extension, MIME, size, PDF page count and extracted-text limits are enforced before AI work.
- No uploaded filename, CV text, vacancy text or PII is written to logs.
- AI output is parsed through a Zod schema before it is persisted.
- PDFs are generated server-side from stored, schema-validated data; no file URL is exposed.
- Deleting a MatchPack is an explicit hard delete. An approved pack cannot be deleted while its linked CV remains; the user must remove the linked document through the existing account flow first. This guard is deferred if the existing UI has no safe document-delete action.

## v1 acceptance tests

- Non-authenticated requests receive `401`.
- An authenticated non-agency user cannot analyse, approve, or export a MatchPack.
- Invalid extensions, mismatched file signatures, oversized files, oversized vacancy text and overlong extracted CV text are rejected before AI work.
- An analysis stores no binary or raw extracted CV text.
- Candidate PII is absent from the anonymised JSON and anonymised PDF data.
- AI evidence is schema-validated and never allows unsupported “add this experience” advice.
- A draft analysis leaves agency usage unchanged.
- Approval increases usage exactly once, including on retry/concurrent approval.
- An unapproved pack cannot be downloaded.
- A user cannot access another user's pack by changing the URL id.
- Existing public parsing, consumer checkout and existing `/editor` PDF download still pass their existing build/lint smoke checks.

## Deliberate non-goals

Not in v1: vacancy URL scraping, ATS integrations, bulk upload, automatic candidate scoring as a hiring decision, client share links, comments, shortlist buttons, view tracking, automatic email delivery, company/school redaction, and automatic retention deletion. These can follow after agencies use the core pack and tell us which step saves them the most time.
