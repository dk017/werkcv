# Agency positioning review fixes — 6 September 2026

## Status

Implemented locally; not committed, pushed or deployed. Existing unrelated worktree changes were preserved. This report covers the positioning fixes, not certification of the entire pending release.

## Findings and changes

1. **Coverage overpromise:** requirement mode now explicitly describes a first pass over up to eight selected vacancy requirements. Landing pages, the checker, its copied report, the workspace and the public-sector guide tell recruiters to compare omitted requirements manually. This does not expand the underlying matcher or make it exhaustive. A regression test checks the published limit against the existing engine limit.
2. **Evidence clarity:** the landing pages show a fictional source-resolved example with source section and line, supported/missing outcomes and next actions. Internal evidence review is distinguished from the introduction, CV and accompanying email intended for clients. Disabled candidate acknowledgement is not advertised as available.
3. **English journey:** the checker has a separate English CV, vacancy and prewritten report, rather than Dutch sample inputs. Account entry preserves English and payment-return context through login. Purchase notes and entry links disclose that the workspace is Dutch; candidate documents support Dutch or English. This is not a fully translated workspace.
4. **Positioning and mobile:** clearer candidate-submission terminology in metadata, a concrete client-proposal promise, narrower agency audience, shorter hero and earlier actions. Existing new-theme components and colours are retained.
5. **Privacy:** paid-workflow storage disclosures now explicitly include complete extracted CV text, source map and digest. Provider/DPA verification is still outstanding and is disclosed before purchase. No provider region, executed agreement or compliance certification was invented.
6. **Purchase clarity:** monthly subscription and shared-credit semantics remain visible. The offer remains EUR 99 and 300 shared credits; editing/redownloading does not become a new credit charge. Added recurring billing, cancellation and checkout-tax explanation. Actual tax inclusion is not asserted without provider confirmation.

## Verification

- `npm run test:agency:acquisition`: 23 passed, including six new positioning contracts.
- `npx tsx --test lib/dodo.test.ts`: six passed.
- TypeScript check passed.
- Targeted ESLint passed on the changed application, component and domain files.
- Scoped `git diff --check` passed; Git printed line-ending notices only.
- Browser checks: Dutch and English landing pages at 320, 375, 768 and desktop widths, without horizontal overflow. At 375px the Dutch first action begins at approximately 468px, compared with approximately 674px in the earlier review. This is a layout measurement, not evidence of increased conversion.
- English checker: loaded the fictional case, ran its prewritten result path and verified English evidence and next actions with no Dutch sample fallback. No live AI request was made by this check.
- `npm run build`: passed (exit 0), including TypeScript and generation of all 555 static pages. Non-fatal warnings: an edge-runtime page cannot be statically generated, and dynamic font download for the checkmark character returned HTTP 400. The build was successful but was not warning-free; no claim is made here that every generated image was visually certified.

## Outstanding release gates

- Verify real hosting/email/AI subprocessors, processing regions, configured provider terms and the reviewed/executed DPA. Use fictional data for this validation until the relevant arrangements are verified. Permission to use a CV does not substitute for those arrangements.
- Run `npm run agency:checkout:preflight` in the configured deployment environment. It makes only a provider product GET request and prints an allowlisted result. Local configuration did not contain the required Agency provider credentials/product ID, so the production price has **not** been verified here. This command is a release diagnostic, not a new runtime payment gate.
- Inspect hosted checkout's actual EUR 99 monthly charge, tax presentation and renewal terms. Metadata advertising EUR 99 is not proof of what the provider charges.
- This task did not certify authenticated database workflows, run production migrations or re-certify PDF/DOCX exports. No export generation changes were made for these positioning fixes.

## Provider API references used

- [Dodo product retrieval](https://docs.dodopayments.com/api-reference/products/get-products-1)
- [Dodo tax-inclusive pricing](https://docs.dodopayments.com/features/tax-inclusive-pricing)

Do not mark the external gates complete merely because the local tests pass.
