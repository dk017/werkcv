# WerkCV Claim–Evidence Benchmark v1 — annotation guide

**Status:** Draft for independent bilingual review  
**Version:** 1.0.0  
**Last updated:** 1 September 2026

## Purpose

Label whether one atomic client-facing candidate-proposal claim is supported by the supplied CV source. This is a source-support task. It does not assess candidate truthfulness, identity, suitability or legal compliance.

## Unit of annotation

One case contains one exact proposal claim span and one versioned CV source. Split compound statements whenever each part could receive a different verdict. Keep numbers, dates, employers, responsibilities and negation inside the atomic span they qualify.

## Verdict definitions

- `supported`: the material meaning of the entire claim is directly supported by one or more resolvable CV spans. Harmless grammatical paraphrase is allowed; scope, time, attribution and numbers must remain intact.
- `partially_supported`: the CV supports a material part but not the complete scope, level, independence, duration, number or attribution.
- `unsupported`: no CV span supports the material claim and the source does not explicitly contradict it.
- `contradicted`: an explicit CV fact conflicts with the claim, including a different number, date, duration, employer, qualification state or negated fact.
- `confirmation_required`: the claim concerns changing current information such as availability, notice period, working hours, location preference, salary/rate or willingness to relocate. A historical CV is not a reliable current source.
- `not_checkable`: the statement is a subjective judgement, prediction or superlative that cannot be established from CV evidence.

## Evidence-span rules

1. Copy the shortest exact source span that preserves the supporting or conflicting meaning.
2. Record character start/end offsets against the exact source version.
3. The stored text must equal `cvText.slice(start, end)`.
4. Use multiple spans only when the claim genuinely requires combined evidence.
5. Do not cite the vacancy as evidence about the candidate.
6. Do not repair, translate or improve the quoted source.
7. `unsupported`, `confirmation_required` and `not_checkable` normally have no accepted source span.
8. A citation that does not resolve is an annotation error, never evidence.

## Decision order

1. Confirm the proposal span is atomic and resolves exactly.
2. Identify whether it is a changing current fact. If yes, use `confirmation_required` unless the claim is explicitly contradicted by a newer authoritative candidate acknowledgement in the evaluated source set.
3. Identify whether it is inherently subjective/not checkable.
4. Look for explicit conflicting CV evidence.
5. Look for complete supporting evidence.
6. If only part is supported, use `partially_supported`.
7. Otherwise use `unsupported`.

## High-risk details

- Numbers: preserve unit, denominator and time period.
- Dates/durations: calculate only from explicit dates; do not round upward.
- Employer attribution: experience at one organisation cannot be moved to another.
- Responsibility: “supported,” “contributed,” and “reviewed” do not establish ownership or final accountability.
- Qualifications: distinguish studying, completed, current, expired and inferred.
- Negation: “not used,” “no experience,” or expired status must not become positive evidence.
- Current facts: availability and commercial terms must not be inferred from an old CV.

## Review procedure

The internal author labels all cases first. The independent bilingual reviewer then labels every case without seeing the author verdict where practical. Record each disagreement, rationale and adjudicated result. A second specialist reviews disagreements that remain unresolved. Do not remove a difficult case merely because the system fails it.

Report pre-adjudication agreement, reviewer credentials and conflict statement. The public result must identify the application commit, parser, verifier, prompt, model/settings, corpus checksum and three repeated runs.

## Prohibited annotation shortcuts

- keyword overlap as automatic support;
- vacancy text as candidate evidence;
- adding facts from general knowledge;
- treating recruiter judgement as CV evidence;
- treating candidate acknowledgement as CV evidence;
- labelling “probably true” as supported;
- changing source text to make a citation resolve.
