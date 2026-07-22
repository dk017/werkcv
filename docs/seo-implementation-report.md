# SEO implementation report

Branch: `codex/seo-implementation-audit`

Baseline: `ed6f4ee` (`origin/main` at implementation start)

Validated: 2026-07-22

## Phase 0 discovery

- Framework: Next.js 16.1.1, TypeScript, App Router (`app/`), with configuration in `next.config.ts`.
- Structured data: emitted through `components/seo/JsonLd.tsx`, `components/seo/Breadcrumbs.tsx`, `components/seo/RoleCoverLetterPage.tsx`, and route-local `application/ld+json` scripts. A repository scan found route-local emitters across the homepage, pricing, guide/tip, CV example, template, role, English, FAQ, and comparison pages. The canonical shared Organization/WebSite graph is rendered from the root layout.
- Sitemap: `app/sitemap.ts` returns Next.js `MetadataRoute.Sitemap`. Before this work, many entries used build-time `new Date()` fallbacks. Article dates came from the relevant content records where available.
- Metadata: the homepage, `/cv-voorbeelden`, `/prijzen`, and `/templates` use static `metadata`; `/cv-gids/[slug]` and other programmatic templates use `generateMetadata`; calculator routes generally use route-local static metadata; English pages use route-local metadata and shared helpers in `app/en/metadata.ts`.
- Content sources: CV tips are TypeScript records in `lib/cv-tips` and contain real `publishedAt`/`updatedAt` fields. Dutch guide-wave content is stored in `lib/seo-wave` and does not contain real publication dates. CV examples are TypeScript registries under `lib/cv-voorbeelden` and do not expose editorial dates. Salary/tool material is stored in route files and `lib/tools`.
- Export capability: WerkCV imports PDF/DOC/DOCX but exports CVs as PDF only. `/cv-maken-in-word` already explains this accurately.
- Browser third parties: Google Tag Manager/Analytics, Microsoft Clarity, unpkg-hosted Leaflet on the admin route, and OpenStreetMap tiles. The report-only CSP also allows the required Analytics/Clarity/Bing connection endpoints.
- Calculator metadata: all five requested calculator routes had route-local metadata; titles/descriptions were less query-specific than the brief and several lacked a complete server-rendered direct-answer/formula/example block.

The exact current JSON-LD emitter inventory can be reproduced with:

```powershell
rg -l 'application/ld\+json' app components --glob '*.tsx' --glob '*.ts'
```

## Task status and commits

| Task | Status | Commit(s) |
| --- | --- | --- |
| 1. Security headers | Implemented. CSP remains Report-Only; nginx ops action documented. | `4bb6197` |
| 2. Real CV visuals | Implemented with eight generated WerkCV previews and reproducible generator. | `b0fad70` |
| 3. Hreflang | Implemented with 14 explicit reciprocal route pairs and validation script. | `4769637` |
| 4. Remove HowTo | Implemented sitewide; visible instructions and existing FAQ schema retained. | `48ce42a` |
| 5. Article schema | CV tips use real dates and images. CV-guide images added; dates deliberately omitted because the source has none. | `e0fd9af` |
| 6. Schema entity IDs | Implemented; nested entities reference the canonical Organization/WebSite IDs. | `44364f6`, `b23a518` |
| 7. Sitemap lastmod | Implemented with real stored editorial dates only. Undated pages omit `lastmod`; `changefreq` and `priority` are removed. A post-deployment correction removed Docker filesystem timestamps. | `442281d`, `df4ac41`, post-deployment correction |
| 8. Cannibalization | `/cv-maken-sjabloon` consolidated into `/cv-maken-template`; internal links and sitemap updated; true HTTP 301 added. | `2c447c6`, `27727ad` |
| 9. Calculators | Metadata and server-rendered direct answers/formulas/examples updated for all five routes. | `afd74a8` |
| 10. Homepage trust | Unsupported testimonial removed; factual payment, hosting, preview, and renewal facts used. | `d2c04ce` |
| 11. Performance | Analytics deferred/deduplicated; homepage renderer code-split; large content registries moved server-side. | `0df15b2`, `4f9b483`, `4cc56d4` |
| 12. Structural schema/E-E-A-T | Breadcrumb/collection/item-list schema added; About/legal links strengthened; directory badges removed. Real-person authors deferred. | `b23a518` |

Lint cleanup is in `df4ac41`.

## Validation results

- `npm run build`: passed; 495 static pages generated.
- TypeScript (`tsc --noEmit`): passed.
- ESLint across every changed TS/TSX/JS/MJS file with `--max-warnings=0`: passed. The unrestricted repository-wide lint command remained silent for seven minutes and was stopped; targeted coverage includes every source file in this branch.
- `npm run i18n:validate-routes`: passed, 14 reciprocal NL/EN pairs.
- Local production response: all requested security headers and report-only CSP present.
- Redirect: `/cv-maken-sjabloon` returns `301` with `Location: /cv-maken-template`.
- Calculator raw HTML: all five routes contain formula, example, and 2026 text without client-side injection.
- CV examples: eight preview `<img>` elements; every preview has explicit width and height.
- Sitemap: 428 URLs; only the 45 CV-tip records with real `publishedAt`/`updatedAt` metadata emit `lastmod` (12 distinct editorial dates). Pages without stored editorial dates omit it; no `changefreq`, `priority`, or redirected template URL is emitted. This avoids Docker checkout times falsely presenting a bulk site update.
- Schema: requested BreadcrumbList, CollectionPage, and ItemList nodes are present in raw HTML; homepage contains one Organization and one WebSite node.
- HowTo: no `HowTo` or `HowToStep` schema strings remain.
- Bundle analyzer: initial homepage JavaScript decreased from a measured 1,825,058 bytes to 637,805 bytes (65.1%). The first checkpoint was taken after the renderer extraction, so this is a conservative reduction for the full branch.

Build warnings were non-fatal and unrelated to these changes: inferred monorepo root due to multiple lockfiles, Edge runtime static-generation notice, and one failed dynamic-font download during build.

## Cannibalization audit

- The confirmed Dutch synonym pair was consolidated. Added redirect: `/cv-maken-sjabloon` → `/cv-maken-template` (301).
- The CV-making head cluster has distinct titles/H1s and specific intent (general workflow, free start, online flow, writing/creating, Word alternative, PDF, and mobile). Retained pages link back to `/cv-maken`; no additional redirects were justified without query-level GSC evidence.
- `/cv-maken-in-word` explicitly says there is no Word export and positions WerkCV as a PDF-output alternative.
- Audited 10 `cv-template-[job]` routes and 10 `sollicitatiebrief-voorbeeld-[job]` routes. Each contains role-specific profile/copy examples, recruiter signals, checklists, ATS terms or skills, mistakes, and contextual links. The shorter horeca and magazijn source files use shared layout components but supply distinct rendered content; no job route was only a title substitution.

## Deliberate follow-ups

- Keep CSP in Report-Only for 24–48 hours in production, inspect browser console/reporting, then enforce only after legitimate origins are confirmed.
- Add `server_tokens off;` to the deployed nginx `http` block or relevant `server` block; the nginx configuration is not in this repository.
- Add `datePublished`/`dateModified` to `/cv-gids/*` only after real editorial dates are added to `lib/seo-wave`.
- Add advice bylines/Person schema only after a real author, biography, and credentials are supplied.
- Validate deployment responses, Rich Results Test, Lighthouse at 1280px/375px, analytics events, and CSP console behavior after rollout.

## Changed files

```text
app/ai/service.json/route.ts
app/curriculum-vitae-maken/page.tsx
app/cv-aanmaken/page.tsx
app/cv-gids/[slug]/page.tsx
app/cv-gids/page.tsx
app/cv-maken-15-jarige/page.tsx
app/cv-maken-16-jarige/page.tsx
app/cv-maken-in-engels/page.tsx
app/cv-maken-in-word/page.tsx
app/cv-maken-op-mobiel/page.tsx
app/cv-maken-pdf/page.tsx
app/cv-maken-sjabloon/page.tsx
app/cv-maken-student/page.tsx
app/cv-maken-template/page.tsx
app/cv-maken/page.tsx
app/cv-ontwerpen/page.tsx
app/cv-opmaak-voorbeeld/page.tsx
app/cv-opmaken/page.tsx
app/cv-opstellen/page.tsx
app/cv-tips/[slug]/page.tsx
app/cv-tips/page.tsx
app/cv-voorbeelden/[category]/[slug]/page.tsx
app/cv-voorbeelden/[category]/page.tsx
app/cv-voorbeelden/page.tsx
app/eerste-cv-maken/page.tsx
app/en/ats-resume-netherlands/page.tsx
app/en/components/EnglishRoleExampleRoute.tsx
app/en/cv-netherlands-without-dutch-language/page.tsx
app/en/cv-or-resume-netherlands/page.tsx
app/en/dutch-cv-examples/page.tsx
app/en/dutch-cv-mistakes-english-speaking-job-seekers/page.tsx
app/en/dutch-cv-template/page.tsx
app/en/english-cv-example-customer-support-netherlands/page.tsx
app/en/english-cv-example-data-engineer-netherlands/page.tsx
app/en/english-cv-example-finance-accounting-netherlands/page.tsx
app/en/english-cv-example-logistics-warehouse-netherlands/page.tsx
app/en/english-cv-example-nurse-netherlands/page.tsx
app/en/english-cv-example-software-engineer-netherlands/page.tsx
app/en/expat-cv-netherlands/page.tsx
app/en/guides/[slug]/page.tsx
app/en/highly-skilled-migrant-cv-netherlands/page.tsx
app/en/how-to-write-dutch-cv-without-speaking-dutch/page.tsx
app/en/metadata.ts
app/en/page.tsx
app/goedkoopste-cv-maker-nederland/page.tsx
app/gratis-cv-maken/page.tsx
app/layout.tsx
app/makkelijk-cv-maken/page.tsx
app/mooie-cv-maken/page.tsx
app/motivatiebrief-layout/page.tsx
app/online-cv-maken/page.tsx
app/over-ons/page.tsx
app/page.tsx
app/prijzen/page.tsx
app/professioneel-cv-maken/page.tsx
app/professioneel-cv-voorbeeld/page.tsx
app/sitemap.ts
app/snel-cv-maken/page.tsx
app/sollicitatiebrief-beginnen/page.tsx
app/sollicitatiebrief-in-engels/page.tsx
app/sollicitatiebrief-maken/page.tsx
app/stage-cv-maken/page.tsx
app/templates/page.tsx
app/tools/eindejaarsuitkering-berekenen/page.tsx
app/tools/kilometervergoeding-berekenen/page.tsx
app/tools/parttime-salaris-calculator/page.tsx
app/tools/uurloon-calculator/page.tsx
app/tools/vakantiegeld-berekenen/page.tsx
components/Footer.tsx
components/GoogleAnalytics.tsx
components/HomePageClient.tsx
components/home/HomeTemplatePreviews.tsx
components/seo/JsonLd.tsx
components/seo/index.ts
docs/seo-implementation-report.md
docs/seo-security-headers.md
lib/cv-tips/articles/cv-template-kiezen.ts
lib/i18n/route-pairs.ts
next.config.ts
package.json
public/cv-example-previews/administratief-medewerker.png
public/cv-example-previews/magazijnmedewerker.png
public/cv-example-previews/marketing-manager.png
public/cv-example-previews/onderwijsassistent.png
public/cv-example-previews/software-ontwikkelaar.png
public/cv-example-previews/student-cv.png
public/cv-example-previews/verpleegkundige.png
public/cv-example-previews/winkelmedewerker.png
scripts/generate-cv-example-previews.ts
scripts/validate-route-pairs.ts
```
