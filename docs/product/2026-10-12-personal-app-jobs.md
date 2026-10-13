# Personal app jobs and vacancy-linked CVs

Implemented on `feat/app-redesign`, behind the existing app-v2 switch.

## User flow

- Dutch: `/mijn-cvs/vacatures`, `/mijn-cvs/sollicitaties`.
- English: `/en/my-cvs/jobs`, `/en/my-cvs/applications`.
- The app sidebar links to both screens. Search starts only after submitting the form.
- The selected personal CV supplies an editable role and region. Only the role, region and
  remote preference go to JSearch (as query text); CV/contact fields do not.
- Results show literal skill overlap, with no numerical suitability score. Structured
  provider requirements absent from the CV are labelled as missing, never added to it.
- Save a provider vacancy or paste one manually. Saved descriptions persist independently
  of the search cache. Repeated saves preserve the original snapshot and tracking status.
- Track Saved / Applied / Interview / Offer / Rejected. Applying happens on the external
  provider site; changing a tracker status does not send an application.
- Creating a CV locks the saved application and makes one separate CV copy, retaining
  template/theme and validated CV content. Concurrent clicks reuse the same copy.
  Agency and MatchPack CVs are excluded. The source CV is never rewritten by this action.
- The linked vacancy is loaded from the database on reopening the copy, including on
  another device. The link goes to Finish and the vacancy field. Existing AI review handles
  proposals, individual acceptance and undo. AI-off still supports manual editing.
- Descriptions retain up to 18,000 characters. AI review uses the first 8,000, with an
  explicit notice for longer descriptions. No generated change is applied automatically.

## Configuration and persistence

- Add server-only `JSEARCH_API_KEY` for OpenWeb Ninja's direct API. The development key
  is in ignored `.env.local`; no credential is in the tracked files.
- `JSEARCH_MONTHLY_LIMIT` defaults to **180**, shared across the entire application,
  with an additional **10 uncached requests per user per UTC day**. Zero disables new
  upstream requests. These are conservative application counters, not provider billing
  reconciliation; requests made by other apps or directly with the key are not counted.
- Identical preferences share a six-hour database cache. PostgreSQL transaction locks
  coalesce concurrent identical searches; atomic quota reservations precede provider calls.
  Provider failures consume a reservation and do not trigger automatic retries.
- Direct API: `https://api.openwebninja.com/jsearch/search-v2`, `x-api-key`, `country=nl`,
  `date_posted=month`. Uses `{data:{jobs:[...]}}`. Fixed host, no redirects, 15-second timeout.
  Sanitizes HTML, blocks unsafe links, deduplicates results, removes explicitly expired
  and foreign-country results. Remote-only keeps listings the provider flags remote **or**
  whose title/description mentions remote, hybride, thuiswerken or op afstand.
- Fix of 13 October 2026: do **not** send `language` or `work_from_home`. With `country=nl`,
  `language=en` returns zero jobs (every English-app search was empty), and `work_from_home`
  returns non-NL listings that are then filtered out. JSearch almost never sets
  `job_is_remote` for NL listings. Remote searches put "remote" in the query instead.
  The country is not appended twice when the region already names it. Cache key: `jsearch-v3-nl`.
- Additive migration: `20261012000100_personal_app_jobs`. Creates applications, search
  cache and quota tables. Saved rows are scoped to users; deleting a linked CV clears
  its relation and allows a new copy. Deleting a user cascades saved applications.
- Every server action checks authentication, the redesign switch, input schemas and
  ownership. Responses omit raw provider errors/credentials. Mutations invalidate app routes.
- The new migration was applied to **localhost** and marked applied. Older local migration
  history already has unrelated unapplied entries for tables partly created outside migrations;
  these were left alone. Do not run a reset to reconcile that history.
- Release requires applying the new migration and setting the server key. No deployment,
  DNS changes, API subscription purchase, real job application or payment occurred.

## Validation (12 October 2026)

- `npm run test:app-jobs`: **8/8** passing (after the 13 Oct fix; was 7/7). Provider shape, malformed responses, HTML/URL
  safety, deduplication, expiry/country/remote filtering, skill boundaries, privacy, cache
  keys, missing key and upstream authentication/quota/failure handling.
- `npm run test:app-jobs:db`: passing against disposable users on localhost. Exercises
  cross-account rejection, legacy-agency exclusion, every status, duplicate saves,
  concurrent-copy idempotency, source preservation, deletion/recreation of a linked copy,
  shared-cache coalescing, failed-call accounting, daily and global limits, rollback of
  refused reservations, and cached access at quota. Fixtures clean up only their own rows.
- **69/69** existing editor/app-v2/AI tests passed. Command and output are in
  `output/app-jobs-qa/regression-tests.txt` (editor steps, section layout, CV-empty,
  app-v2, AI-writing-v2, AI-writing-changes and AI-safeguards suites).
- Production build passed (577 static pages); TypeScript and focused lint passed.
  A second build after final refinements passed as well (`output/app-jobs-qa/build.txt`).
  A temporary local production preview with AI disabled showed the saved vacancy and
  manual-editing fallback without an AI action button; that preview was then stopped.
  Full repository lint has the same **8 pre-existing errors and 12 warnings**, in untouched
  WordPress/local scripts. Build also reported the existing Edge runtime deprecation and
  a dynamic-font warning; neither failed the build.
- Live JSearch: one direct pilot and two app searches. Dutch marketing/Utrecht returned
  10 recent listings. English remote software-engineer search returned an empty result,
  which was the `language=en` bug above, not a lack of listings. After the fix: 10 results
  for English Software Engineer/Netherlands, 10 for remote, 10 for Verpleegkundige/Utrecht. No further live search calls are needed for retests;
  use fixtures or the cache.
- Browser: Dutch live search, saved vacancy, status change and reload; English manual
  vacancy and tracker; empty results; no-CV disables copy creation; status filtering;
  390px mobile layout; NL-to-EN reopening of the linked CV with its vacancy intact.
- Live AI using explicitly fictional QA content: generated a proposal, applied one
  profile change, then undid it. Original CV summary remained empty; only its copy
  retained the fictional QA profile. Existing facts were not automatically imported
  from the vacancy. Local preview used `CONSUMER_AI_REVIEW_ENABLED=true` for this check.
- Anonymous requests to all four new routes returned login redirects with correct
  language and return destination. Browser opt-out redirected the jobs route to the
  classic dashboard; opt-in restored the app. Final browser console had no errors.
- Screenshots: `output/app-jobs-qa/desktop-applications.png`, `mobile-applications.png`,
  `mobile-tailoring.png`.
- QA account: `redesign-test@werkcv.test`. Source CV
  `585fec15-12c7-4f42-87be-c63fe4f27c14`; linked QA copy
  `3709d8d6-2779-455f-8a5a-13642e8d7db8`. Tracker has one live listing and one explicitly
  fictional manual vacancy. These are local QA records, not submitted applications.

## Boundaries for the next iteration

- The free request budget supports an initial trial, not high-volume job discovery.
  Confirm provider account allowance and commercial/cache terms before rollout.
- Search currently shows the provider's first page (up to 20 normalized results); it
  does not claim complete Dutch-market coverage or guaranteed availability/eligibility.
- CV selector shows the latest 100 personal candidates; tracker loads the latest 200
  saved applications. Pagination and deletion/archiving are separate enhancements.
- Cache freshness is enforced on reads. Expired cache/budget rows currently remain in
  storage; add scheduled retention before a larger rollout. Saved vacancies must not
  be removed by cache cleanup.
- `app.werkcv.nl` routing and the login landing destination are existing/separate rollout
  work; this change adds features within the existing authenticated dashboard.
