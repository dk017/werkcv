# WerkCV internal-link map — 2026-09-21

The local sitemap currently contains 474 URLs. The primary Dutch CV workflow pillar is
`/cv-maken`; the no-subscription conversion page is `/cv-maken-zonder-abonnement`.
`/prijzen` answers the narrower price question, while `/editor` is the action route and
is intentionally not in the sitemap. This is a site-architecture choice, not a claim
that Search Console has proved `/cv-maken` owns every broad “cv maken” query.

## Link rules

| Source | Destination | Reader reason |
| --- | --- | --- |
| `/cv-maken` | `/cv-maken-zonder-abonnement` | Understand the no-trial, one-time-download option after the general workflow. |
| `/cv-maken-zonder-abonnement` | `/cv-maken`, `/prijzen`, `/templates`, `/gratis-cv-maken` | Return to the complete workflow or inspect price, layout and free-start details. |
| CV-writing and formatting articles under `/cv-tips/[slug]` | `/cv-maken` | Apply the article's advice in the full CV workflow. Other article categories do not receive this generic link. |
| `/cv-gids/[slug]` role guides | Matching `/cv-voorbeelden/[category]/[slug]`, its category hub, then a relevant writing tip | Move from role-specific advice to a concrete example and nearby roles. Explicit editorial overrides still take precedence. |
| `/cv-voorbeelden` → category hubs → example pages | Child examples, sibling examples, relevant guide, `/templates` | Existing hub and example templates make the large role-example family discoverable without editing each example. |
| `/tools` | `/cv-tools-links`, and CV workflow links where the tool-to-CV transition is relevant | Connect the tools hub to career resources and the next CV step. |
| `/en/guides` | `/en/expat-cv-netherlands` | Link the canonical expat page, not `/en/guides/dutch-cv-for-expats`, which redirects. |
| English personal-page footer | `/about` | Make the English trust page reachable from English pages. |
| `/cv-tips/sollicitatiebrief-tips` | `/sollicitatiehulp` and `/sollicitatiehulp/geachte-heer-mevrouw` | Lead readers from the article to the wording hub and the precise salutation guide. |

The shared role-guide mapping currently covers: administratief medewerker (including
parttime), klantenservice, verkoopmedewerker, horeca, callcenter, receptionist,
office manager, projectmanager, productiemedewerker, schoonmaakmedewerker, bezorger,
magazijnmedewerker (starter and parttime), orderpicker, and student bijbaan. For
an adjacent rather than exact role, the link label says so; unlisted role guides keep
their existing editorial links. Do not add a money-page link to unrelated salary,
interview, or career articles just to increase link counts.

## Canonical and crawl checks

The homepage canonical belongs to `app/page.tsx`, not the root layout. The inherited
layout canonical had caused pages such as `/tools` to declare the homepage as their
canonical. Removing it leaves the homepage's self-canonical in place and lets other
pages use their own canonical where defined. Absence of an explicit canonical on a
page is not, by itself, an error.

Run a local Next server, then:

```sh
npx tsx scripts/internal-link-audit.ts --origin=http://localhost:3000 --concurrency=2
```

The post-change local crawl fetched all 474 sitemap URLs with status 200: zero URLs
without an HTML inbound link and zero mismatched declared canonicals. It also reports
non-sitemap targets separately; editor, account, legal and download URLs can be
intentional. A local crawl does not prove Google indexing or ranking gains. Recheck
Search Console after recrawling, especially the affected landing pages and the
previously reported “Crawled - currently not indexed” group.

Google's applicable guidance is to use crawlable `<a href>` links, descriptive anchor
text, logical site structure, and canonical destination URLs. It does not prescribe a
fixed number of links per page:

- https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
