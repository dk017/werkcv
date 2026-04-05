# Feature Build Tracker

Last updated: 2026-04-05

This tracker is for non-SEO product features so we can keep scope, status, and follow-up work in one place.

## Status legend

- `planned`: scoped but not started
- `in_progress`: actively being built
- `done`: implemented and verified locally
- `deployed`: live in production
- `later`: intentionally deferred

## Active features

| Feature | Route | Status | Scope summary | Main files |
| --- | --- | --- | --- | --- |
| Nederlandse CV Kwaliteitsscore | `/tools/cv-score` | `done` | Free tool that scores a CV against Dutch hiring conventions across 6 dimensions, returns structured feedback, and pushes users into WerkCV conversion paths. | `app/tools/cv-score/*`, `app/api/tools/cv-score/route.ts`, `lib/tools/cv-score.ts`, `lib/analytics.ts`, `app/tools/page.tsx`, `app/sitemap.ts` |
| WerkCV CV Quality Standard v1 | `/tools/cv-score/methodologie` | `done` | Public methodology page that explains how the score is calculated, what is rule-based vs AI-assisted, and what the score does and does not claim. | `app/tools/cv-score/methodologie/page.tsx`, `app/tools/cv-score/page.tsx`, `app/sitemap.ts` |
| English resume translator handoff | `/en/guides/translate-resume-to-dutch-format` | `done` | Keeps translated-resume users inside the English experience by routing post-translation CTAs to `/en/editor` and `/en/templates`. | `components/translate/ResumeTranslator.tsx`, `app/api/translate-resume/route.ts` |

## Locked decisions

- V1 uses a hybrid scorer:
  - deterministic local checks for structure, contact info, completeness, and basic pattern detection
  - one constrained OpenAI JSON pass for nuanced judgement on profile quality, buzzword weakness, bullet strength, and language consistency
- Public tool only:
  - no login
  - no DB storage
  - no editor-side realtime scoring
- Abuse guardrails:
  - IP rate limiting
  - 5MB upload cap
  - reject too-short or partial CV input before model scoring
  - send only the relevant extracted CV snippets to OpenAI

## Implementation checklist

- [x] Add `cv-score` route and page metadata
- [x] Add backend scoring engine in `lib/tools/cv-score.ts`
- [x] Add public API route `POST /api/tools/cv-score`
- [x] Add upload and text input UX
- [x] Add loading state with rotating Dutch messages
- [x] Add score hero with animated ring
- [x] Add 6 expandable dimension cards
- [x] Add detailed issues list with severity sorting
- [x] Add conversion CTA block
- [x] Add analytics events
- [x] Add tool discovery link on `/tools`
- [x] Add sitemap entry
- [x] Run `eslint`
- [x] Run `npm run build`

## Follow-up ideas

- Job-description URL input for `cv-vacature-match` after the upload flow stabilizes
- Shared reusable score-card component for other diagnostic tools
- Optional editor prefill or “apply fixes” handoff from score results
