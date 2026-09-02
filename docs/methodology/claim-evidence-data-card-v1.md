# WerkCV Claim–Evidence Benchmark v1 — data card

**Status:** Draft; public download and performance publication remain disabled pending independent review.  
**Version:** 1.0.0  
**Licence planned for the public set:** CC BY 4.0

## Summary

The benchmark evaluates whether atomic candidate-proposal claims are supported by exact spans in fictional CV sources. It measures source traceability, not truthfulness, identity, suitability, ranking or legal compliance.

## Composition

- 100 fictional cases in the complete evaluation design.
- 60-case public transparency set: 30 Dutch and 30 English.
- 40-case private holdout: 20 Dutch and 20 English, stored outside publicly served application assets.
- Six verdict classes; no class may represent less than 10%.
- At least eight occupational families, multiple seniority levels and text/PDF/DOCX parser routes.
- Error types include paraphrase, inflated responsibility, missing qualifications/skills, numerical/date/duration conflict, wrong-employer attribution, expired qualifications, current facts and subjective statements.

The repository currently contains the 60 fictional public draft cases and the holdout loader/manifest contract. The private cases must be created and independently reviewed outside the public repository.

## Fields

Each case includes exact proposal span, expected verdict, accepted source span or documented absence, error category, rationale, source version and SHA-256 checksum. Source and claim spans must resolve deterministically.

## Collection and privacy

All cases are authored fictionally. No real CVs, candidate emails, phone numbers or customer records may enter the corpus. Reviewers must report accidental resemblance or personal information before release.

## Intended use

- regression testing of the WerkCV claim verifier;
- transparent reporting of source-citation and verdict performance;
- analysis by verdict, locale and input format;
- reproducible comparison between WerkCV verifier versions.

## Out-of-scope use

- candidate screening, ranking or rejection;
- proof of candidate truthfulness or identity;
- legal, compliance or right-to-represent decisions;
- performance comparison with named competitors without equivalent lawful testing;
- training on private holdout labels.

## Evaluation

Run every case three times with pinned application commit, parser, verifier, prompt, model and settings. Report extraction precision/recall, per-class precision/recall, macro-F1, critical-claim catch rate, severe false alarms, citation validity, numerical contradiction recall, current-fact recall, parser success, NL/EN results, stability, bootstrap intervals and failures.

## Release limitations

The public set is transparent and may be overfit after release; the private holdout is used to detect that risk. Fictional cases cannot reproduce every CV layout, OCR problem, recruitment sector or language nuance. Passing thresholds does not establish accuracy on all real documents.

## Maintenance

Publish a version changelog and immutable result history. Never silently edit a released corpus version. Correct errors in a new version and document their effect. Difficult cases may be removed only for a documented data-quality defect, never because the verifier failed them.
