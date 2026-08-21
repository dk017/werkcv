# WerkCV brand rollout 2 implementation report

**Date:** 21 August 2026  
**Scope:** Wave 2A agency/English trust pages and Wave 2B high-intent CV pages  
**Status:** implemented locally; production build and final regression checks pending

## Outcome

The second brand rollout routes now use the shared WerkCV shell, Manrope
typography and floating responsive header through
`components/brand/BrandRouteBoundary.tsx`. The migration is opt-in and route
scoped: page content, metadata, analytics, forms, API calls and product logic
remain owned by each existing page.

The route boundary hides only page-local navigation headers at the shallow
layout level. Semantic article headers containing a page's H1 remain visible,
so guide pages keep their document structure and accessibility headings.

## Wave 2A routes

Agency trust and English discovery pages:

1. `/voor-bureaus/kennisbank/matchpack-handleiding`
2. `/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever`
3. `/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau`
4. `/voor-bureaus/kennisbank/cv-anonimiseren-recruitment`
5. `/agency/privacy`
6. `/en/pricing`
7. `/en/guides`
8. `/en/expat-cv-netherlands`
9. `/en/cv-job-match-checker`
10. `/en/dutch-cv-checker`

## Wave 2B routes

High-intent Dutch CV creation and improvement pages:

11. `/cv-maken-in-word`
12. `/cv-maken-in-engels`
13. `/cv-maken-pdf`
14. `/cv-maken-op-mobiel`
15. `/cv-maken-student`
16. `/stage-cv-maken`
17. `/cv-maken-template`
18. `/cv-opstellen`
19. `/cv-opmaken`
20. `/cv-optimaliseren`

## Per-route verification

Each route was loaded locally at 1440px and 390px widths after being added to
the boundary. Every route passed these checks:

- the expected document title was present;
- the page H1 was present and visible;
- the shared `.wk-site-header` was present;
- the route shell was active;
- no horizontal body overflow was detected;
- guide pages retained their one intended semantic non-brand article header.

The reusable local smoke script is `tmp/brand-route-smoke.mjs` and accepts one
route at a time, for example:

```text
node tmp/brand-route-smoke.mjs /cv-maken-in-word
```

## Deliberate non-changes

- No CV editor, MatchPack evidence, redaction, export, billing or API behavior
  was rewritten.
- No content claims or SEO metadata were changed as part of the visual rollout.
- Routes outside the rollout set retain their existing headers and styles.
- No deployment or commit is implied by this report.

## Release gate

Before production approval, run `npx tsc --noEmit`, targeted ESLint, the
repository build, `npm run test:matchpack`, `npm run test:agency:unit`, and a
clean visual pass of the authenticated MatchPack workspace. The active agency
fixture remains the only state that cannot be verified from a signed-out local
route alone.
