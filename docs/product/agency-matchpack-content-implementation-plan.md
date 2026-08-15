# WerkCV Agency and MatchPack content implementation plan

Date: 2026-08-15
Status: corrected source of truth for implementation
Commercial release label: available / early production

## 1. Decision

WerkCV may proceed with the English guide work and a separate Dutch agency
knowledge cluster before the first real MatchPack case is tested. The agency
cluster must send visitors to the available Agency product, sample output or
account route and must describe only capabilities that exist today.

MatchPack is deployed and technically verified, but it is not yet validated by
real production use. It is available for direct purchase, while outcome and
performance claims remain restricted. It must not be described as proven,
fully automated, legally anonymous, AVG-compliant, ATS-integrated, or
guaranteed to save a particular amount of time.

The controlled real-case test is a gate for publishing quality, acceptance or
time-saving claims. It is not a gate for product access.

## 2. Verified product truth

The following register is the authority for product and agency copy. If the
implementation changes, update this register before updating marketing pages.

| Capability or claim | Verified current state | Wording allowed now |
|---|---|---|
| Agency CV creation | Available for an active Agency Plan | "Maak losse kandidaat-CV's via het Agency-account." |
| MatchPack input | One text-based PDF or DOCX CV plus pasted vacancy text | "Upload een tekstgebaseerd PDF- of DOCX-CV en plak de vacature." |
| Requirement analysis | Maps 5-8 vacancy requirements to strong, partial, or missing CV evidence | "Koppel functie-eisen aan zichtbaar bewijs uit het CV." |
| Missing facts | Commercial facts remain empty until a recruiter adds them | "Ontbrekende informatie blijft zichtbaar en wordt niet automatisch ingevuld." |
| Recruiter editing | Candidate data, introduction, email, notes, and commercial fields are editable before approval | "De recruiter corrigeert en bevestigt de conceptgegevens." |
| Approval | Human checklist and recruiter approval are required before export | "De recruiter controleert en keurt het voorstel goed." |
| Approved state | The approved MatchPack snapshot is locked | "Een goedgekeurd voorstel blijft gekoppeld aan de gecontroleerde snapshot." |
| Version history | Not implemented | Do not claim version history. A locked snapshot is not version history. |
| Output | Full proposal PDF and redacted-concept PDF | "Download een volledig voorstel of geredigeerd concept als PDF." |
| Word input | DOCX upload is supported | Describe only as input. |
| Word output | Not implemented | Do not advertise editable Word or DOCX output. |
| Branding | Company name, configured standard template, and colour theme | "Consistente agency-opmaak" or explain the exact standard styling. |
| Custom house style | No logo upload, bespoke template builder, or multiple brand profiles | Do not claim a complete or custom house style. |
| Redaction | Structured personal fields are cleared and contact-like strings are scrubbed. Names embedded in narrative text, plus employer, school, and project names, may remain | "Geredigeerd concept waarin gestructureerde persoonsgegevens en contactgegevens zoveel mogelijk zijn verwijderd; menselijke controle blijft nodig." |
| Legal anonymisation | Not guaranteed | Never claim "volledig anoniem", "AVG-proof", or guaranteed anonymisation. |
| Candidate approval | No candidate approval or consent workflow exists | Discuss as an agency responsibility, not a WerkCV feature. |
| Recruiter approval | Implemented | May be described as a product control. |
| Data storage | Structured CV data, vacancy text, analysis, submission copy, and derived redacted data are stored | Explain this precisely in privacy copy. |
| Original upload | Uploaded binary and raw extracted CV text are not stored | This may be stated if kept synchronized with the implementation. |
| Draft deletion | An unapproved MatchPack can be explicitly deleted | May be described as draft deletion, not an automatic retention policy. |
| Automatic retention deletion | Not implemented | Do not claim configurable or automatic retention. |
| Team access | One paying owner account | Do not claim shared roles, permissions, or team workspaces. |
| ATS integration | Not implemented | Do not claim ATS integration, ATS export, or ATS synchronisation. |
| Bulk processing | Not implemented | Describe one candidate and one vacancy per MatchPack. |
| Email | Client email is editable and can be copied | Do not claim automatic sending or email tracking. |
| Languages | Dutch and English proposal output | May be stated. |
| Quota and price | EUR 149 per paid month, up to 50 new CV documents or approved MatchPacks | Keep synchronized with shared plan constants. |
| Proven time saving | No production evidence yet | Use a transparent calculator and measure controlled cases; publish no universal saving. |

## 3. Corrected product positioning

### Public category

WerkCV Agency is the paid account and quota. MatchPack is the
candidate-proposal workflow inside that account.

### Public positioning

> WerkCV helpt recruitment- en detacheringsbureaus een kandidaat-CV en
> vacature om te zetten in een controleerbaar kandidaatvoorstel. Functie-eisen
> worden gekoppeld aan zichtbaar CV-bewijs, ontbrekende informatie blijft
> gemarkeerd en de recruiter controleert het voorstel voor PDF-export.
> Bekijk het voorbeeld en start het Agency Plan wanneer de werkwijze past.

### Redaction wording

> WerkCV kan een geredigeerd concept maken waarin gestructureerde
> persoonsgegevens, zoals de naam- en contactvelden, worden leeggemaakt en
> contactachtige tekst wordt gefilterd. Een naam in lopende tekst, werkgevers,
> opleidingen, projecten en andere identificerende informatie kan zichtbaar
> blijven. Menselijke controle blijft noodzakelijk voor delen.

### Branding wording

Use "consistente agency-opmaak" while the product supports a company name,
standard template, and colour. Reserve "eigen huisstijl" for a future release
that supports at least a logo and an agency-specific reusable template.

### Help-led sales standard

Agency copy follows the principle "diagnose before pitching":

- start with the recruiter's or client's decision problem;
- show the exact mechanism that resolves it;
- explain when MatchPack is not the right route;
- give useful operating guidance before presenting the purchase CTA;
- use fictional examples and verifiable product facts instead of confidence
  theatre, fake urgency or unsupported social proof;
- make the sample, price, limits and next action easy to inspect without a
  sales conversation;
- write with professional authority, never neediness or pressure.

## 4. Corrected scope

The work has two independent streams. They share quality and truth standards,
but they have different audiences and conversion paths.

### Stream A: four English Netherlands CV questions

Purpose: improve direct, source-backed answers for international candidates.

1. Improve the existing `/en/guides/one-page-cv-netherlands` page without
   changing its URL.
2. Create `/en/guides/startup-vs-corporate-cv-netherlands`.
3. Create `/en/guides/creative-cv-templates-netherlands`.
4. Create `/en/guides/recent-graduate-cv-netherlands`.

The original detailed editorial requirements for these four pages remain
valid. Existing citation-winning URLs and their principal answers must remain
intact. This stream points to candidate templates, examples, and the candidate
editor; it does not use the Agency checkout as its default CTA.

### Stream B: Dutch agency knowledge and product cluster

Purpose: educate agencies, support inbound and outbound discovery, and explain
the verified workflow without mixing it with the EUR 4.99 consumer checkout.

Initial route architecture:

```text
/voor-bureaus
    /kennisbank
        /cv-in-huisstijl-recruitmentbureau
        /cv-anonimiseren-recruitment
        /kandidaat-voorstellen-opdrachtgever

/agency
    public product, pricing, sample, ROI, and direct-purchase page

/agency/account
    authenticated Agency account

/agency/account/matchpack
    authenticated MatchPack workspace
```

`/voor-bureaus` is the educational hub. `/agency` remains the product and
commercial page. The private workspace stays under `/agency/account` and must
not be indexed.

## 5. Audience priority

The first MatchPack message targets workflows where a candidate is proposed
against a specific vacancy:

1. Recruitment agencies.
2. Detachment and consultancy agencies.
3. Specialist staffing teams.
4. Werving-en-selectiebureaus.

Outplacement, re-integration, Spoor 2/3, and career-coaching organisations are
secondary audiences. They may fit Agency CV creation, but MatchPack is relevant
only when they create a vacancy-specific candidate proposal. Do not imply that
all agency segments need the same workflow.

## 6. Agency hub requirements

### Recommended H1

`Van kandidaat-CV en vacature naar een controleerbaar voorstel`

### Direct answer below the H1

> WerkCV voor Bureaus helpt recruiters een kandidaat-CV en vacature samen te
> brengen in een controleerbaar kandidaatvoorstel. Functie-eisen worden
> gekoppeld aan CV-bewijs, ontbrekende gegevens blijven zichtbaar en de
> recruiter corrigeert en keurt het voorstel goed voor PDF-export. Bekijk het
> fictieve voorbeeld en start het Agency Plan wanneer de werkwijze past.

### Required hub sections

- Who the workflow is and is not for.
- The current manual problem, without invented time-saving statistics.
- The verified MatchPack workflow.
- What the AI prepares and what the recruiter must decide.
- Full proposal versus redacted concept.
- Exact PDF output and styling limitations.
- Exact data handling and known retention limitations.
- EUR 149 plan and shared 50-slot allowance, if still current.
- Fictional sample output.
- Transparent ROI calculator.
- Direct Agency Plan CTA, sample output and Agency-account login.
- Visible limitations and non-goals.

### CTA hierarchy for direct availability

1. Learning CTA: `Bekijk de werkwijze` -> relevant explanatory section.
2. Proof CTA: `Bekijk het fictieve voorbeeld` -> sample section or sample PDF.
3. Purchase CTA: `Start Agency` -> `/agency#plan` or configured checkout.
4. Returning customer: `Inloggen` -> `/login?next=/agency/account`.

Never send an agency-intent visitor directly to the consumer EUR 4.99 checkout.

## 7. Page rollout decision

### Build in the first agency content release

- `/voor-bureaus`
- `/voor-bureaus/kennisbank`
- `/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau`
- `/voor-bureaus/kennisbank/cv-anonimiseren-recruitment`
- `/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever`

### Defer as standalone pages

- `/voor-bureaus/cv-in-huisstijl`
- `/voor-bureaus/cv-anonimiseren`
- `/voor-bureaus/kandidaatprofiel-maken`
- `/voor-bureaus/kandidaat-voorstellen`
- `/voor-bureaus/word-export`

Reason: the first four would overlap the hub and knowledge guides before demand
is measured. `/voor-bureaus/word-export` describes an unavailable feature and
must not be created. Relevant concepts can be substantial sections in the hub.

## 8. Corrected guide boundaries

### Guide A: agency formatting

URL: `/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau`

This is an operational guide, not a promise that WerkCV currently supports a
fully custom house style. It should explain:

- preserving the original candidate document;
- separating content correction from visual formatting;
- safe use of company name, colour, typography, and a cover page;
- when a bespoke logo/template workflow needs other software;
- PDF versus DOCX as general workflow choices;
- that current WerkCV output is PDF only;
- content-diff and human review controls;
- how a locked MatchPack snapshot differs from version history.

### Guide B: redaction and privacy

URL: `/voor-bureaus/kennisbank/cv-anonimiseren-recruitment`

Use authoritative sources such as the Autoriteit Persoonsgegevens, European
Data Protection Board, and Rijksoverheid. Explain operational practice, not
legal advice. The page must distinguish:

- removal of direct identifiers;
- pseudonymisation;
- true anonymisation;
- indirect identification through employers, schools, projects, dates, and
  unusual career histories;
- agency responsibility for lawful basis, permission where applicable,
  purpose limitation, retention, and deletion;
- why visual black boxes are not reliable document redaction;
- current MatchPack redaction boundaries and the required human review.

### Guide C: candidate proposal

URL: `/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever`

This is the closest informational owner for MatchPack. It should cover:

- candidate summary;
- availability, location, salary or rate, hours, and notice period;
- work authorisation and language level where relevant;
- evidence for important vacancy requirements;
- missing and unverified information;
- recruiter-only notes versus client-facing copy;
- full versus redacted CV;
- introduction-email structure;
- fictional example proposal.

Candidate confirmation and document version control may be recommended as
agency practices, but must not be described as current MatchPack functions.
Unsupported experience, achievements, availability, rates, or results must not
be added.

## 9. Content and source standard

Every created or materially updated guide must:

- answer the main question in 40-70 words directly below the H1;
- contain question-specific information rather than shared boilerplate;
- include at least one decision table;
- include practical or before-and-after examples;
- explain exceptions;
- distinguish verified facts from recommendations;
- show visible sources and state what each source supports;
- use primary or authoritative sources where possible;
- include visible FAQs only when they add new decision value;
- generate FAQ JSON-LD from the exact visible FAQ data, or omit it;
- include Article and Breadcrumb structured data;
- include both `datePublished` and `dateModified`;
- follow existing author/editorial conventions;
- provide relevant internal links and one natural CTA;
- remain useful without purchasing WerkCV.

Do not publish invented statistics, unattributed recruiter quotes, universal
ATS statements, hiring guarantees, legal guarantees, or claims that AI output
is automatically accurate.

## 10. Internal-link architecture

```text
English candidate guides
    -> related English examples and templates
    -> /en/editor

Dutch agency knowledge guides
    -> /voor-bureaus
    -> /agency sample or product
    -> /agency/account for returning customers
```

Cross-link the clusters only when user intent genuinely overlaps. Agency pages
must not be used to funnel general job seekers into a subscription, and
consumer pricing pages must not aggressively promote the Agency Plan.

Add one discreet `Voor bureaus` link to the Dutch footer or navigation. The
agency section can provide its own compact navigation for Overview, Knowledge
base, Candidate proposal, Redaction, Product, and Login.

## 11. Analytics plan

Reuse the existing internal analytics and GA4 forwarding. Do not add another
vendor.

Required content and conversion events:

| Event | When it fires | Minimum properties |
|---|---|---|
| `agency_hub_viewed` | `/voor-bureaus` is viewed | `path` |
| `agency_guide_viewed` | An agency knowledge guide is viewed | `path`, `slug` |
| `agency_content_cta_clicked` | Hub or guide CTA is clicked | `path`, `location`, `destination`, `intent` |
| `agency_sample_viewed` | Fictional sample is opened | `path`, `variant` |
| `agency_roi_completed` | User changes assumptions and reaches a valid result | `path`, inputs; do not send personal data |
| `agency_redaction_interest_clicked` | Redaction guide CTA is clicked | `path`, `destination` |

Keep the already implemented MatchPack events, including analysis, review,
save, approval, PDF download, and email-copy events.

Remove the proposed DOCX CTA event from the current release. Do not create a
CTA for unavailable output merely to measure interest. If product discovery
later needs this signal, use an explicitly labelled research question or
waitlist rather than an output claim.

## 12. Technical SEO requirements

- Unique title, description, H1, canonical, Open Graph metadata, and language.
- Server-rendered primary content.
- Breadcrumbs visible and represented in JSON-LD.
- Article JSON-LD for editorial guides.
- `datePublished` and `dateModified` in visible/editorial data and Article
  structured data.
- FAQ JSON-LD only when the same FAQ is visible.
- All public routes in the relevant sitemap.
- Private Agency account, MatchPack, login, checkout, and API routes remain
  non-indexable.
- Existing successful English URLs remain unchanged.
- No duplicate commercial pages competing with `/agency`.
- No agency pages in consumer hreflang pairs unless a real English equivalent
  is created.

## 13. Delivery sequence

### Phase 0: product truth — complete

- Repository, build, live route, and database deployment verified.
- MatchPack smoke test and targeted lint passed.
- Product status set to available / early production, with outcome claims
  restricted until controlled validation.
- No real production MatchPack has yet validated the workflow.

### Phase 1: agency content foundation

1. Create a shared agency content/navigation layer.
2. Build `/voor-bureaus` with help-led, direct-availability positioning.
3. Build the knowledge index.
4. Build the candidate-proposal guide first because it is the closest match to
   the verified MatchPack workflow.
5. Build the agency-formatting and redaction/privacy guides after their
   authoritative source sets are verified.
6. Link the cluster to `/agency`, not the consumer checkout.
7. Add analytics, sitemap entries, schema, and a discreet footer/nav link.
8. Review every product claim against Section 2.

This phase may be implemented before the controlled real-case test because the
deployed workflow is directly available. It must retain all verified limits.

### Phase 2: English guide implementation

1. Audit the four target intents and existing internal-link owners.
2. Improve the preserved one-page guide.
3. Create the startup/corporate guide.
4. Create the creative-template guide.
5. Create the recent-graduate guide.
6. Add carefully selected contextual links.
7. Validate schema, sitemap, build, and responsive rendering.

This phase is independent of MatchPack validation and may proceed in parallel
with the agency content work when capacity permits.

### Phase 3: controlled real-case validation

Use a fictional or properly authorised candidate CV and a genuine vacancy.
Complete the workflow, verify every evidence connection, review both PDFs and
the email, measure elapsed and active time, and collect recruiter feedback.

Record at minimum:

- unsupported or incorrect evidence links;
- missed vacancy requirements;
- extraction corrections;
- redaction leaks and false removals;
- proposal copy corrections;
- PDF layout problems;
- time to reviewed export;
- recruiter's send / send-after-edit / do-not-send decision;
- reasons for that decision.

### Phase 4: evidence and refinement decision

Do not publish quality, acceptance or time-saving claims until controlled cases
have completed without a critical privacy or evidence defect. One case proves
workflow completion, not market quality.

The decision record must say whether to:

- continue direct availability with the same boundaries;
- fix blocking quality or privacy issues;
- narrow the supported audience or input type;
- add missing product controls;
- support a broader outcome claim only when the evidence justifies it.

## 14. Release gates

### Content release gate

- Every product claim matches Section 2.
- Direct availability, pricing and limitations are visible near primary
  MatchPack claims and CTAs.
- No Word-output, full-house-style, version-history, candidate-approval,
  ATS-integration, legal-anonymity, or time-saving promise appears.
- Privacy wording matches actual storage and deletion behavior.
- Technical SEO, analytics, mobile, and desktop checks pass.
- Consumer creation and checkout remain unchanged.

### Outcome-claim gate

- Controlled end-to-end case completed.
- No critical unsupported evidence in the final proposal.
- After recruiter review and correction, no direct identifier remains in the
  redacted output used for the test.
- Recruiter can identify indirect-identification risks before sharing.
- Both PDFs render correctly.
- Email copy is editable and usable.
- Quota is consumed exactly once on approval.
- Access control and ownership checks pass.
- Known limitations are visible and accepted.
- A named owner records the release decision.

## 15. Required implementation report

After the page implementation, report:

1. Pages created and updated.
2. URLs intentionally preserved.
3. Content-intent and internal-link maps.
4. Structured-data and sitemap changes.
5. Analytics events added or reused.
6. Authoritative sources and what they support.
7. Unsupported claims removed or rewritten.
8. Representative desktop and mobile screenshots.
9. Build, targeted lint, and test results.
10. Known limitations and deferred pages.
11. Four English AI prompts and four Dutch agency prompts to monitor.

## 16. Explicitly superseded statements from the original proposal

The following original-plan statements must not be implemented as written:

- "Kandidaat-CV's sneller in uw eigen huisstijl" as the primary MatchPack
  promise: too narrow for MatchPack and broader than current styling support.
- "een bewerkbare Word- of PDF-versie": PDF output exists; Word output does
  not.
- "version history": not implemented; approved snapshot locking is different.
- "candidate approval" as a product feature: not implemented.
- `/voor-bureaus/word-export`: do not create a landing page for an unavailable
  feature.
- "branded" without explanation: replace with exact standard styling or
  "consistente agency-opmaak."
- "anonymised" without qualification: use "geredigeerd concept" and describe
  what remains.
- broad positioning for every coaching and re-integration organisation:
  distinguish CV creation from vacancy-specific MatchPack use.

Everything else in the original proposal remains subject to the product-truth
register, source standard, non-guarantee rules, and release gates in this plan.

## 17. Internal-document authority

This plan and `docs/product/matchpack-v1-spec.md` are the current authorities
for MatchPack capability and positioning. Prospect-research documents may
contain historical product assumptions such as broad "branded workflow" or
invoice-billing language. Those documents may inform audience research but
must not be reused as current product copy without re-verification.
