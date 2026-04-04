# SEO Audit Tracker

Last updated: 2026-04-04

This tracker reflects the actual state of the codebase, not just the raw audit output.

## Status legend

- `done`: implemented and verified in the codebase
- `in_progress`: currently being worked on
- `next`: high-value and worth building next
- `later`: useful, but not urgent
- `skip`: low ROI or based on a weak audit assumption

## Tracker

| Priority | Item | Status | Notes | Main files |
| --- | --- | --- | --- | --- |
| Critical | Global `WebSite` + `Organization` JSON-LD shell | `done` | Already rendered in the shared layout. | `app/layout.tsx`, `components/seo/JsonLd.tsx` |
| Critical | Complete global OG + Twitter shell | `done` | Shared shell now includes `twitter:site`, `og:site_name`, and route metadata can layer on top cleanly. | `app/layout.tsx`, key route metadata files |
| Critical | Hreflang for Dutch and English roots | `done` | Root and `/en` alternates already added. | `app/page.tsx`, `app/en/metadata.ts` |
| Critical | Dynamic sitemap `lastmod` | `done` | Static pages, tools, `cv-voorbeelden`, `cv-tips`, and `cv-gids` now resolve from real content dates and source file mtimes. | `app/sitemap.ts` |
| Critical | Breadcrumb schema on content pages | `done` | Shared breadcrumb JSON-LD stays in `Breadcrumbs`; duplicate route-level breadcrumb scripts were removed from key content routes. | `components/seo/Breadcrumbs.tsx`, `app/cv-tips/[slug]/page.tsx`, `app/cv-gids/[slug]/page.tsx` |
| Critical | FAQ schema on `cv-tips` articles | `done` | Already emitted from the shared article route. | `app/cv-tips/[slug]/page.tsx` |
| Critical | `Article` schema with `datePublished` / `dateModified` on `cv-tips` | `done` | Already implemented in the shared article route. | `app/cv-tips/[slug]/page.tsx` |
| Critical | `HowTo` on step-by-step guides | `later` | Already on homepage and `/cv-maken`. Add only where the page is truly procedural. | `app/page.tsx`, `app/cv-maken/page.tsx` |
| High | Consolidate / differentiate `cv maken` variants | `done` | The pillar, the primary sub-intent routes, the core synonym pages, and the longer-tail style/speed/template variants now separate narrow intent from the `/cv-maken` pillar through hero copy and cleaner follow-up links. Keep monitoring in Search Console instead of adding more near-duplicate variants. | `app/sitemap.ts`, multiple `app/*` route files |
| High | Unique meta descriptions across pages | `later` | Many key pages are already being fixed, but this is still a broad cleanup task. | route-level `page.tsx` files |
| High | Optimize tool result-page CTAs | `done` | Highest-intent tool result states now push users into `/editor` and `/templates`, and shared CTA tracking now counts `/templates` clicks as funnel actions too. | `components/AnalyticsProvider.tsx`, `app/tools/ats-cv-checker/AtsCheckerTool.tsx`, `app/tools/cv-vacature-match/CvVacatureMatchTool.tsx`, `app/tools/profieltekst-generator/ProfieltekstTool.tsx` |
| High | Remove homepage demo CV content from SSR | `done` | Sample CV preview content is client-only now. | `app/page.tsx`, `components/HomePageClient.tsx` |
| Quick win | Consistent `| WerkCV` title suffix | `done` | Shared metadata no longer double-appends the brand, dynamic families normalize centrally, and static route metadata titles/site names were swept from `WerkCV.nl` to `WerkCV`. Remaining `WerkCV.nl` mentions are normal copy, domain references, or content source text. | `app/layout.tsx`, `lib/seo-branding.ts`, route metadata files |
| Quick win | Replace decorative `✓` / `•` in SEO-facing headings | `later` | Some targeted cleanup already done. Remaining symbols are low impact unless they sit in headings or schema-relevant content. | multiple routes |
| Quick win | Add `theme-color` | `done` | Added in the shared viewport metadata. | `app/layout.tsx` |
| Quick win | Strengthen `/over-ons` trust signals | `done` | Added stronger content plus `Organization` / `AboutPage` schema. | `app/over-ons/page.tsx` |
| Long-term | Custom OG images for key pages | `done` | Global and dynamic OG image routes already exist. | `app/opengraph-image.tsx`, `app/cv-tips/[slug]/opengraph-image.tsx`, `app/cv-gids/[slug]/opengraph-image.tsx` |
| Long-term | Author bios on `cv-tips` | `later` | Only worth doing once there is a real, defensible author model. | `app/cv-tips/[slug]/page.tsx` |
| Long-term | Build links to the tools section | `next` | Worth doing selectively for the strongest rule-based calculators/checkers, not for the whole tool set. | `app/tools/page.tsx`, selected `app/tools/*/page.tsx` |

## Best next implementation order

1. Build outreach targets only for the strongest tool pages.
2. Add author-level trust signals only if there is a real, defensible author model.
3. Expand unique meta description cleanup across the remaining long-tail routes.

## Best tool pages for backlink outreach

- `/tools/netto-bruto-calculator`
- `/tools/minimumloon-checker`
- `/tools/ww-recht-checker`
- `/tools/ww-dagloon-checker`
- `/tools/transitievergoeding-berekenen`
- `/tools/vakantiegeld-berekenen`
- `/tools/30-procent-regeling-checker`
- `/tools/kennismigrant-salary-checker`

## Weak tool pages for backlink outreach

These can still rank, but they are less likely to earn editorial links on their own:

- `/tools/ats-cv-checker`
- `/tools/profieltekst-generator`
- `/tools/job-title-translator`
- `/tools/sollicitatiebrief-generator`
- `/tools/cv-samenvatting-generator`
