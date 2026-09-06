# NL/EN Route Pair Audit

Audited: 2026-06-20

## Scope

This audit defines only routes with matching user intent in Dutch and English. It does not assume that adding or removing `/en` produces a valid counterpart.

The executable source of truth is `lib/i18n/route-pairs.ts`.

## Validated pairs

| Dutch | English | Switcher | Hreflang | Preserve query |
| --- | --- | --- | --- | --- |
| `/` | `/en` | Yes | Yes | No |
| `/templates` | `/en/templates` | Yes | Yes | Yes |
| `/editor` | `/en/editor` | Yes | No | Yes |
| `/cv-optimaliseren` | `/en/resume-optimizer-netherlands` | Yes | Yes | No |
| `/cv-voorbeelden` | `/en/dutch-cv-examples` | Yes | Yes | No |
| `/engels-cv-voorbeeld` | `/en/english-cv-example-netherlands` | Yes | Yes | No |
| `/engelstalige-bedrijven-in-nederland` | `/en/english-speaking-companies-netherlands` | Yes | Yes | No |
| `/cv-maken-in-engels` | `/en/cv-format-netherlands-english` | Yes | Yes | No |
| `/cv-tips/cv-schrijven-buitenlander-nederland` | `/en/dutch-cv-for-expats` | Yes | Yes | No |
| `/cv-tips/ats-vriendelijk-cv` | `/en/ats-resume-netherlands` | Yes | Yes | No |

The editor pair is navigation-only because authenticated product routes should not be emitted as public hreflang alternates.

## Excluded or unresolved routes

- `/en/dutch-cv-template` previously declared `/templates` as its Dutch alternate. The conflicting alternate was removed in this pass; the route remains excluded until it has a unique Dutch counterpart.
- `/en/netherlands-cv-format` overlaps with `/en/cv-format-netherlands-english`. Only the latter has an existing, defensible Dutch counterpart.
- `/en/dutch-cv-checker` has several related Dutch checking routes, but none is a confirmed translation-equivalent page.
- `/en/motivation-letter-netherlands` is broader than any single Dutch motivation-letter route currently identified.
- `/en/expat-cv-netherlands` overlaps with `/en/dutch-cv-for-expats`; only the latter is already tied to the Dutch expat article.
- Dynamic `/cv-gids/[slug]` and `/en/guides/[slug]` routes remain unpaired until their two content registries have an explicit slug-level translation map.
- English-only immigration and role-specific pages remain unpaired. A locale-home fallback may be offered by a future switcher, but it must not be presented as a translated counterpart or emitted as hreflang.

## Validation rules

- A Dutch path can appear only once.
- An English path can appear only once.
- Pair IDs must be unique.
- Dutch paths cannot start with `/en`; English paths must start with `/en`.
- Stored paths cannot have trailing slashes.
- Every pair must be enabled for the switcher, hreflang, or both.
- Query preservation is allowed only for switcher-enabled routes.
