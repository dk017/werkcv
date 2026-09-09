# MatchPack discovery implementation report

Latest release status: see [the security/container certification report](security-container-certification-2026-09-08.md). Application audit is zero, isolated authenticated checks pass and Word/PDF section parity is covered by a regression test. The exact container still fails the high-severity scan threshold, so this remains a release candidate rather than unconditional deployment approval.

Updated: 2026-09-08. Starting commit: `60bbbdceac4f6f778bc5a15452895bb45f9bafeb`.

## Status

The three requested remediation items are implemented locally: reviewed example downloads, explicit Agency analytics consent, and dependency review. Nothing has been deployed, committed, submitted to an indexing service, purchased, or sent to a customer during this work.

The public-folder files and local production server are verified. This does not certify the currently deployed website. Remaining OS advisories and external indexing evidence are explicitly separate from the completed content work.

## Requirement ledger

| Requirements | Status | Evidence |
| --- | --- | --- |
| D01–D07 | PASS | Shared two-product descriptions, billing constants, language/retention limitations, feature-flag combinations and structured discovery responses; regression tests. |
| D08, I01–I02, I05–I07 | PASS locally | Nine fixed HTML targets plus auxiliary discovery resources pass the bounded technical auditor. No arbitrary crawl or indexing notifications. |
| I03–I04 | BLOCKED_EXTERNAL | No authenticated Google Search Console or Bing inspection evidence. Actual index inclusion, indexed version and engine-selected canonical remain unknown. |
| B01–B06 | PASS | Existing buying-guide route improved with workflow comparisons, fit/non-fit, disclosed commercial interest, actual usage cost examples and relevant next steps. Assistant editorial review only; no independent Dutch human review claimed. |
| E01–E03 | PASS | Versioned fictional Nina source, vacancy and five source/claim/action examples. Seven years of broad HR experience is not represented as seven years of independent responsibility; vacancy requirements are not candidate evidence. |
| E04 | PASS locally | Six coherent files promoted into public/downloads and linked from the existing worked example, without email gating. Actual HTTP bytes and MIME types checked. |
| E05 | PASS | Every page of source/full/contact-reduced PDF and both rendered Word files inspected. Public-file semantic verification passes. |
| E06–E07 | PASS | Existing brand theme, readable server-rendered example, correct ungated links, source references and contact-reduction limitations. Checksummed public manifest records artifact versions and review scope. |
| R01–R02 | PASS within stated scope | Previous four-route keyboard/responsive checks retained. New download page tested at 320/375/768/1440; mobile/desktop screenshots inspected. Native preference controls are labeled and keyboard-focusable. Not a full accessibility certification. |
| R03 | PASS locally | All six download destinations return 200, expected MIME type and bytes identical to the reviewed public artifacts. Links also exist with JavaScript disabled. |
| R04 | PASS within stated scope | Consumer route/entry contract regression tests retained; no authenticated checkout, real purchase or payment-provider test performed. |
| R05 | PASS | Client and server consent guards, default denied, no retrospective replay, exactly one permitted CTA event, immediate withdrawal and persistence across reload. |
| R06 | PASS with security limitations | 68 tests pass; production build verification and lint recorded below. Dependency review completed, but 22 advisories remain—not security-cleared. |

## Product and content contract

CV Builder remains the consumer product: EUR 4.99 including VAT for one CV payment. MatchPack remains the Agency product: EUR 99/month with 300 shared credits. Values come from existing pricing constants; consumer VAT language is not inferred for Agency. No feature flags were activated.

The buying guide compares manual Word work, general AI, specialist formatting, ATS-native workflows and MatchPack without inventing competitor limitations. Low-volume manual work remains a legitimate alternative. ATS synchronization, bulk automation and client portals are explicit non-fits. Usage allocations are not presented as a per-document purchase price.

The worked example is authored fictional demonstration material, not an independently evaluated AI result or a customer outcome. The source is visible in initial HTML. Original text, vacancy context, retained claims, corrected numbers and unknown changing facts remain distinguishable.

## Reviewed and connected downloads

Fixture: nina-hr-v2, as of 2026-08-31. Public manifest: `public/downloads/werkcv-fictional-example-manifest.json`.

| File | Review |
| --- | --- |
| agency-sample-bron-cv-hr-adviseur.pdf | One page, visually checked, visible source line numbers |
| agency-sample-vacature-hr-adviseur.txt | Complete fictional vacancy, semantic check |
| werkcv-voorbeeld-kandidaatvoorstel-hr-adviseur.pdf | Two pages, both visually checked |
| werkcv-voorbeeld-kandidaatvoorstel-hr-adviseur.docx | Two rendered pages, visually checked |
| werkcv-voorbeeld-kandidaatvoorstel-hr-adviseur-geanonimiseerd.pdf | Two pages, both visually checked |
| werkcv-voorbeeld-kandidaatvoorstel-hr-adviseur-geanonimiseerd.docx | Two rendered pages, visually checked |

The previous missing-renderer blocker is resolved. An isolated official LibreOffice 26.2.6 package was checksum-verified and extracted for review; the user's desktop Office installation was not used or changed. Both DOCX files were rendered with the document skill's renderer and inspected. PDF pages were independently rendered with Poppler. This verifies that renderer's output, not every possible version of Microsoft Word.

Review improved source-line traceability and corrected the opening capitalization in the contact-reduced Word output. Existing shared DOCX fixes preserve languages, courses, qualities and driving licence. Contact-reduced does not mean legally anonymous: employers, schools and project details can remain recognizable.

The generator stages outputs first. Reviewed artifacts were copied as a coherent set; old public files were backed up under the ignored local review directory. The public manifest records exact checksums. Future regeneration requires repeating visual review and updating the manifest.

## Analytics consent contract

- Optional Agency measurement starts off. Unknown, denied and invalid choices fail closed.
- Preference is stored for 180 days in a first-party cookie and can be changed in the page-footer preference control.
- Client guard executes before analytics identifiers or attribution are read/created.
- Server guard rejects unconsented Agency events and Agency-referrer generic events with 204/no-store before enrichment or persistence.
- Candidate acknowledgement routes remain excluded even if permission was granted elsewhere.
- Agency pages do not load Google Analytics or Clarity. Navigation from consumer pages disables those providers on Agency paths.
- Granting consent does not replay previous activity. Withdrawing it blocks subsequent activity immediately.
- Downloads and content remain available without permission or JavaScript.
- Manual CTA tracking prevents duplicate generic click events.
- Allowed event properties are bounded, non-content metadata; no CV/proposal text is added.
- Consumer analytics policy was not globally redesigned. Existing stored identifiers are not claimed to be deleted on withdrawal.

The automated browser test intercepts permitted test events rather than writing them to a customer database. Real server requests verify denied/unknown rejection. It does not certify consent as a legal basis for every processing activity.

## Verification evidence

- Combined discovery, evidence, positioning, consumer-contract and consent regression suite: 68/68 passed.
- Production-renderer PDF/DOCX smoke: both variants passed; all populated CV sections are retained in DOCX and section parity is regression-tested.
- Public-artifact semantic checker: passed.
- Local discovery audit: nine pages, zero errors.
- Local browser release report: `.codex-tmp/agency-discovery/release-check/results.json`, observed 2026-09-08T01:59:06.210Z, Chrome 143.0.7499.169.
- Browser checks: six HTTP destinations, exact bytes/MIME, unknown/granted/denied/withdrawal/reload, English preference route, zero third-party analytics requests, four widths, six no-JavaScript links.
- Visual evidence: final fictional PDF/DOCX pages plus representative download/preference mobile and desktop screenshots inspected.
- Runtime profile-photo storage roundtrip: passed with fictional bytes in a temporary directory.
- Next.js 16.3.4 production build completed 555 pages at the previous checkpoint. Final packaging-only rebuild verification is recorded in the completion addendum.
- Dependency advisory review: application audit zero; final image has 82 high/critical OS scanner matches, see the separate security certification report.

Local QA artifacts and runtime photo uploads are excluded from Docker build context and standalone tracing. No customer-upload directories were deleted. The final candidate image was built and scanned locally; it is not a production deployment.

## External limits and next release steps

1. Review the remaining dependency risks in `matchpack-discovery-security-review.md`; do not call the application vulnerability-free.
2. Deploy only when separately authorized, then rerun the HTTP/download and discovery checks against production.
3. Obtain authenticated Search Console/Bing evidence for the nine bounded URLs. Technical eligibility is not proof of indexing.
4. Review the scoped changed-URL file before separately authorized IndexNow submission. Accepted notifications are not indexing confirmation.
5. Human Dutch editorial review, full authenticated payment checks and independent accessibility certification were not performed in this content remediation; the final local image scan is documented separately and still needs an OS-advisory decision.
6. Do not promise AI citations, GPT recommendations, conversions or competitor superiority based on this work alone.

Unrelated untracked files and existing user changes were preserved.

## Final packaging verification

- Final Next.js 16.3.4 production build: exit 0, all 555 pages, TypeScript passed.
- Focused ESLint: exit 0. Git diff whitespace check: exit 0 (Windows line-ending notices only).
- Final profile-photo route trace: 181 files; zero local QA/tmp/output/upload files.
- Non-fatal build warnings remain: deprecated Edge runtime and a failed dynamic checkmark-font download. They did not prevent compilation or static generation; no claim of a warning-free build.
