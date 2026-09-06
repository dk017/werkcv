# MatchPack Agency search-submission runbook

This runbook is the owner-operated follow-up for the MatchPack acquisition release. It is documentation only: code deployment, URL submission and external outreach require separate authorisation.

## Before submitting anything

1. Record the deployed commit, deployment timestamp, database migration state and rollback image/commit.
2. Confirm the following public URLs return HTTP 200 on `https://werkcv.nl`:
   - `/agency`
   - `/en/agency`
   - `/voor-bureaus`
   - `/voor-bureaus/kennisbank`
   - `/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever`
   - `/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld`
   - `/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau`
   - `/tools/kandidaatvoorstel-checker`
   - `/en/candidate-proposal-checker`
3. Inspect each response for the expected title, one visible H1, self-canonical URL, robots directive and primary CTA. Confirm that the Dutch and English commercial pages have reciprocal `nl-NL`, `en`, and `x-default` alternates.
4. Confirm `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/ai/summary.json`, `/ai/faq.json` and `/ai/service.json` are reachable and contain only public URLs. Do not submit authenticated, editor, checkout, API or candidate-session URLs.
5. Confirm all three release flags remain disabled unless their separate release gates have been approved:
   - `PROPOSAL_CLAIM_VERIFIER_ENABLED`
   - `CANDIDATE_ACKNOWLEDGEMENT_ENABLED`
   - `CLAIM_BENCHMARK_PUBLICATION_ENABLED`

## Google Search Console

Use the verified `werkcv.nl` property. Submit the sitemap once after deployment, then use URL inspection for each priority URL. Record in the release report:

- submission/inspection date and timezone;
- Google-selected canonical;
- index status and last crawl date;
- coverage or enhancement errors;
- whether the rendered title, H1 and primary CTA match the release.

Request recrawl once after the substantive page update. A request is not evidence of indexing; Google may take days or weeks to recrawl and reprocess a page. Do not repeatedly automate submissions or report a ranking/citation result from a submission receipt.

## Bing Webmaster Tools

Use the verified `werkcv.nl` property. Submit or refresh the sitemap once, inspect the same priority URLs, and record the equivalent status, canonical and error fields. Use IndexNow only if a valid existing site integration and key are already configured. Never invent, expose or commit an IndexNow key as part of this release.

## Observation clock

Start the 30–45 day observation clock only after all priority URLs are deployed, inspected and the release gates pass. Record Day 0 separately from the date a search engine reports indexing. Review at Day 7 (functional/indexing only), Day 14 (coverage and queries), Day 30 (directional acquisition) and Day 45 (continue or change the category/distribution plan).

Use the existing funnel report for distinct, qualified external actors and report 7-, 28- and 45-day windows. Search impressions, rankings, AI citations and checker completions are not evidence of willingness to pay. Keep paid validation separate.

## Rollback triggers

Roll back to the recorded previous image/commit if deployment introduces a broken public link, accidental `noindex`, incorrect price/allowance, consumer-to-Agency routing, unsupported feature claim, PII in telemetry, checkout regression or mobile overflow. A rollback must preserve existing approval, retention, role and source-integrity invariants.
