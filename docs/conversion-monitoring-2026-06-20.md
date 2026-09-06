# Conversion Measurement Checkpoint

Release: `a4073e5884b0d35ef14dc778542a60ead273a88e`

Production cutoff used for the baseline: 2026-06-19 22:30 UTC.

## Initial baseline

At the 2026-06-20 check, the persisted conversion-event set contained one `login_view` and no later funnel events after the cutoff. This is insufficient volume for evaluating English conversion or the checkout experiment.

## 48-72 hour review

Review on 2026-06-22 or 2026-06-23 using the existing admin analytics funnels and experiment tables.

Event integrity checks:

- `login_view` is followed by `login_code_requested`, then either `login_verified` or `login_failed`.
- `cv_progress_milestone`, `cv_section_completed`, and `ready_to_download_viewed` persist with a CV ID.
- `pdf_download_started` and `pdf_download_completed` persist through the paid-download flow.
- `checkout_experiment_assigned` records both `modal` and `direct` variants.
- Ready CVs can be followed through `checkout_paywall_reached`, checkout start, failure/completion, and paid outcome.
- English and Dutch paths appear separately in locale and landing-page funnel segments.
- Landing-page and `startSource` attribution survive login and CV creation.

Do not select an experiment winner at this checkpoint unless each checkout variant has at least 50 assigned CVs. Treat missing downstream events as a measurement defect before treating them as user abandonment.
