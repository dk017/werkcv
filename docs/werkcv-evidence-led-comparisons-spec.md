# WerkCV evidence-led comparison implementation report

Implementation date: 2026-09-10.

## Scope completed

- Replaced `/beste-cv-maker-nederland` with a neutral, evidence-labelled Dutch comparison. Removed internal BOFU and conversion-planning copy.
- Added `/voor-bureaus/kennisbank/cv-opmaak-software-vergelijken` as one task-based Agency comparison. The remediation below replaces the original unverified shortlist with official-source profiles.
- Added `/en/guides/cv-builders-netherlands-compared` for English-speaking applicants in the Netherlands and linked it from the English guides hub.
- Added shared comparison-table presentation and typed editorial evidence records under `lib/comparisons/evidence.ts`.
- Added seven fictional proposal-error examples to the candidate-proposal worked example.
- Added a hypothetical review-time worksheet to the Agency house-style guide.
- Expanded the contact-reduction guide with separate PDF/DOCX controls for text layers, metadata, revisions, links and visual review.
- Registered the new Agency route in acquisition, content, AI-discovery and sitemap registries. Added discovery coverage and updated editorial dates.
- Structured data uses an ISO `dateModified` value while the visible review label remains localized for readers.

## Evidence status

`vendor_documented`: WerkCV pricing, FlowCV free offer, YoungCapital CV route, Europass CV route and Canva free/design route, each with a dated public source.

CVMaker, Canva and YoungCapital now use the existing consumer pricing registry, including its 45-day expiry handling. CVMaker's official help page was rechecked during remediation and matched the stored terms; the stored check date was not silently advanced for other providers.

HireAra, Allsorter, CV-Transformer and EazyCV now have official product/pricing sources checked on 2026-09-10. Public figures retain currency, period, plan allowance and setup caveats. Allsorter uses a quote rather than an invented amount. Simply was removed because its identity was not confirmed. These are provider-documented facts, not hands-on results.

## Review remediation

1. Corrected the employer-attribution example: the deliberately wrong claim now names Middenland Services; the correction names Fictieve Zorgdiensten as the full source CV does. All seven examples live in a shared fixture; source snippets and employer attribution have regression coverage.
2. Replaced the unfinished Agency shortlist with four sourced profiles, including pricing models and material limits. Official sources are linked on the public page.
3. Removed internal publication instructions from public copy; optional features render as customer-facing descriptions only when enabled.
4. Removed duplicate consumer pricing evidence; both comparison pages use the existing registry and suppress expired exact prices. Pages revalidate daily.
5. Localized comparison headings and the scroll-region description in Dutch and English.
6. Added an editable cost worksheet with formulas, labour/transfer/software totals, current/new comparison, negative-difference explanation and input validation. Defaults assume equal work time; no savings are invented.

Remediation checks: focused ESLint passed; content tests 13/13; Agency acquisition tests 23/23. The earlier 10-test count below describes the initial implementation.

The remediation production build also passed. All five affected routes returned HTTP 200 with one H1; the worksheet rendered eight inputs. Browser automation timed out before interactive/viewport certification, so mobile visuals and browser interaction remain unverified. No production deployment was performed.

The report does not claim Google/Bing index status, stable SERP rank, ChatGPT recommendation, ATS acceptance or sales causality. No customer CV or production data is included in public content.

## Files changed

- `components/seo/EvidenceComparisonArticle.tsx`
- `components/seo/EvidenceComparisonTable.tsx`
- `lib/comparisons/evidence.ts`
- `app/beste-cv-maker-nederland/page.tsx`
- `app/en/guides/cv-builders-netherlands-compared/page.tsx`
- `app/en/guides/page.tsx`
- `app/voor-bureaus/kennisbank/cv-opmaak-software-vergelijken/page.tsx`
- `app/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld/page.tsx`
- `app/voor-bureaus/kennisbank/cv-anonimiseren-recruitment/page.tsx`
- `lib/agency-acquisition.ts`
- `lib/agency-content.ts`
- `lib/agency-buying-guide.ts`
- `lib/agency-discovery-targets.ts`
- `lib/ai-discovery.ts`
- `app/sitemap.ts`
- `lib/comparisons/evidence.test.ts`
- `lib/agency-buying-guide.test.ts`
- `package.json`

## Verification completed

- Focused ESLint for every changed TypeScript file: passed.
- `npm run build`: passed; 557 routes generated, including both new comparison routes.
- `npm run test:agency:content-evidence`: 10/10 passed.
- `npm run test:agency:discovery`: 24/24 passed.
- `npm run test:organic-conversion`: 17/17 passed.
- `npm run i18n:validate-routes`: passed (20 route pairs).
- Local HTTP smoke checks: all six target routes, sitemap and AI summary returned 200; target pages had one H1, site header/footer and no legacy BOFU copy.
- `git diff --check`: passed; only normal line-ending warnings were reported.

## Remaining release checks

- Run the full repository lint separately; it still reports eight pre-existing errors in legacy/local and WordPress build scripts, outside this change.
- Visually inspect all six routes at 320, 375, 768 and 1440px, including keyboard navigation and overflow.
- Verify current official competitor URLs/prices before publication of any additional claim.
- Run authenticated Google/Bing index inspection and the neutral repeated AI-prompt baseline separately; neither is certified by this implementation.
- Review any generated/downloaded artifacts under the existing PDF/DOCX visual QA process.

Status: `implemented_automated_checks_passed`; visual, authenticated index and live-AI checks remain intentionally unverified.
