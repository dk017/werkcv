# MBO, stage and BBL content experiment

Updated: 13 September 2026

## Scope

This release improves three high-intent Dutch routes:

- `/cv-gids/cv-zonder-ervaring-mbo` — an MBO CV without formal work experience.
- `/stage-cv-maken` — an internship CV for MBO, HBO and WO students.
- `/cv-gids/cv-bbl-opleiding` — a CV for a BBL learning/work placement.

The BBL route is a new page. The other two URLs are preserved.

## Baseline status

Search Console data was not available in the local implementation environment, so no baseline numbers have been invented. Before evaluating the experiment, record the previous 28- and 90-day values for each URL:

| URL | Impressions | Clicks | CTR | Average position | CV starts | Paid downloads |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/cv-gids/cv-zonder-ervaring-mbo` | — | — | — | — | — | — |
| `/stage-cv-maken` | — | — | — | — | — | — |
| `/cv-gids/cv-bbl-opleiding` | New page | New page | New page | New page | New page | New page |

The existing analytics system should preserve the content source through the editor using these start-source values:

- `mbo_cv_no_experience`
- `stage_cv_maken`
- `bbl_cv_opleiding`

No CV text, candidate name or email address is sent to analytics.

## Content quality checks

Each page contains a complete fictional CV rendered as selectable HTML, three situation-specific profile examples, practical guidance, a tailored checklist, FAQs, related links and an exact one-time-payment explanation. All example contact details use `.example.test` or zeroed placeholder numbers.

The BBL page links to current public guidance from Rijksoverheid, the Onderwijsinspectie and SBB. It describes BBL arrangements as programme-dependent and does not promise admission, employment or an objectively recognised learning company.

## Review points

Review after four weeks for indexing and early engagement, and after eight to twelve weeks for direction. Compare impressions, clicks, CTR, CV starts and confirmed paid downloads against the captured baseline. Treat this as an experiment; do not describe the keyword opportunity as proven until Search Console data supports it.
