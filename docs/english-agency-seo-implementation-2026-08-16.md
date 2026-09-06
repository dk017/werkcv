# English question guides and Agency content implementation

Implementation date: 16 August 2026

## Pages created

English question guides:

- `/en/guides/startup-vs-corporate-cv-netherlands`
- `/en/guides/creative-cv-templates-netherlands`
- `/en/guides/recent-graduate-cv-netherlands`

Dutch Agency knowledge guides:

- `/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau`
- `/voor-bureaus/kennisbank/cv-anonimiseren-recruitment`

The existing `/voor-bureaus` hub and `/voor-bureaus/kennisbank` index now publish the three-guide knowledge cluster. No thin standalone pages for Word export, candidate profiles, or anonymisation were added.

## Pages updated

- `/en/guides/one-page-cv-netherlands` keeps its URL and now answers the one-page/two-page question directly, with the seven-profile decision table, shortening guidance, exceptions, examples, FAQs, sources, and a template CTA.
- `/en`, `/en/guides`, `/en/english-speaking-companies-netherlands`, `/en/expat-cv-netherlands`, the software-engineer example, and the product-manager example now link to the relevant new guides.
- `/voor-bureaus` has clearer audience, workflow, limits, contact-free-output, and human-review copy.
- `/voor-bureaus/kennisbank` now marks the two new guides as published.
- `/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever` uses “versie zonder directe contactgegevens” and keeps its evidence-first candidate-presentation guidance.
- Agency navigation, sitemap entries, date metadata, and persisted analytics events were extended.

## Preserved URLs and product boundary

The existing English guide URL `/en/guides/one-page-cv-netherlands` was preserved. Existing consumer CV pages, editor routes, checkout routes, and the Agency workspace routes were not renamed or redirected.

The Agency copy reflects the current implementation: one CV plus one vacancy per proposal, shared 50-slot quota, one account owner, PDF customer output, a copyable email, and an optional version without direct contact details. It does not claim editable Word export, ATS integration, bulk processing, team roles, a client portal, legal anonymity, AVG compliance, or automatic candidate approval. There is no pilot form or pilot CTA because the self-serve Agency workspace is available.

## Content-intent map

| Intent | Primary page | Next action |
| --- | --- | --- |
| One or two CV pages | `/en/guides/one-page-cv-netherlands` | English templates or editor |
| Startup versus corporate tailoring | `/en/guides/startup-vs-corporate-cv-netherlands` | English templates/editor |
| Creative CV acceptance and parsing | `/en/guides/creative-cv-templates-netherlands` | Text-first or lightly branded templates |
| Recent graduate without much experience | `/en/guides/recent-graduate-cv-netherlands` | English editor and starter/example routes |
| Agency-branded candidate CV | `/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau` | Agency sample and workspace |
| Contact-free candidate version | `/voor-bureaus/kennisbank/cv-anonimiseren-recruitment` | Agency sample, with human review warning |
| Evidence-led client submission | `/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever` | Agency sample and workspace |

## Internal-link map

The candidate cluster links the four question guides to the English hub, Netherlands CV format, international-student and expat pages, examples, templates, the English-speaking-companies page, and the editor. The Agency cluster links the hub, knowledge index, three guides, the fictitious sample output, and the functional Agency plan/workspace. Cross-links are limited to overlaps such as startup/corporate context from employer and role-example pages.

## Structured data and metadata

- English guide pages use unique title and description metadata, canonical URLs, Open Graph article metadata, visible breadcrumbs, Article JSON-LD, FAQ JSON-LD matching the visible FAQ, and datePublished/dateModified values.
- The shared breadcrumb component supplies one BreadcrumbList per page; duplicate page-level breadcrumb schemas were removed.
- Agency guides use unique article metadata, visible breadcrumbs, Article JSON-LD, matching FAQ JSON-LD, and dated content conventions.
- The Agency hub and knowledge index retain their existing WebPage/CollectionPage and FAQ/ItemList conventions.

## Sitemap and analytics

- All four English question pages are included through the English guide data used by `app/sitemap.ts`.
- The two new Dutch guides are explicit sitemap entries, with 16 August 2026 last-modified dates. The Agency hub, index, and candidate-presentation guide use the same date.
- Existing analytics were extended for guide views, CTA clicks, Agency workspace starts, sample-output views, Word-context clicks, redaction-context clicks, and the Agency funnel events are persisted by the analytics route. No second analytics vendor was introduced.

## Sources used

The visible guide source lists use primary or authoritative references where available:

- [Europass CV guidance](https://europass.europa.eu/en/create-europass-cv)
- [European Environment Agency Europass instructions](https://www.eea.europa.eu/about-us/jobs/application-documents/instructions_for_europass_cv.pdf)
- [EURES Europass information](https://eures.europa.eu/jobseekers/europass_en)
- [Greenhouse resume parsing guidance](https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse)
- [Workable resume upload/parsing guidance](https://help.workable.com/hc/en-us/articles/115012661408-Uploading-candidate-resumes-CVs-Individual-and-bulk-options)
- [Autoriteit Persoonsgegevens AVG manual](https://autoriteitpersoonsgegevens.nl/uploads/imported/handleidingalgemeneverordeninggegevensbescherming.pdf)
- [European Data Protection Board on anonymisation and pseudonymisation](https://www.edpb.europa.eu/topics/ai-and-technology/anonymisationpseudonymisation_en)
- [Rijksoverheid on sharing personal data](https://www.rijksoverheid.nl/vraag-en-antwoord/privacy-en-persoonsgegevens/mogen-organisaties-mijn-persoonsgegevens-aan-anderen-doorgeven)
- [IND orientation-year residence permit](https://ind.nl/en/residence-permits/work/residence-permit-for-orientation-year)

## Claims tightened or removed

- “Geredigeerd”, “geanonimiseerd”, and “AVG-proof” were removed from ordinary Agency product positioning; the product now says “versie zonder directe contactgegevens” and explains the remaining identification risk.
- Word is described as a possible source or manual route, not as an Agency export capability.
- Creative-CV and ATS advice uses “can”, “may”, and “safer starting point”; it does not claim all ATS products behave identically.
- The guides contain no universal one-page rule, seven-second rule, guaranteed ATS result, guaranteed interview result, automatic accuracy claim, legal-anonymity guarantee, or unsupported recruiter statistic.

## Verification

- `npm run build`: passed. Next generated the four English guide paths and both new Dutch guide paths. The build still reports the repository’s existing dynamic-font download warning (HTTP 400), but completes successfully.
- `npm run test:matchpack`: passed (`MatchPack submission smoke checks passed.`).
- Targeted ESLint on all changed English, Agency, analytics, sitemap, and content files: passed with `--max-warnings=0`.
- Lightweight production-route requests returned the expected responses for `/`, `/cv-maken`, `/editor`, `/en/editor`, `/prijzen`, `/en/pricing`, `/agency`, `/agency/account`, `/voor-bureaus`, and `/voor-bureaus/kennisbank` (consumer editor/account routes redirect to login as expected).
- The built `/sitemap.xml` contains all six new or updated guide URLs listed above.
- The broad `npm run lint` scan was stopped after it failed to finish in a reasonable time in this unusually large worktree; the targeted check is the relevant changed-file result.
- Rendered smoke checks at desktop 1440px and mobile 390px returned HTTP 200/304, the expected H1/title, tables, visible FAQs, Article/FAQ/Breadcrumb JSON-LD, and no horizontal document overflow.

Representative screenshots are stored in the Codex visualization workspace and were visually inspected:

- `english-one-page-desktop.png`
- `english-one-page-mobile.png`
- `agency-hub-desktop.png`
- `agency-privacy-mobile.png`

## Known limitations

- The Agency customer output is PDF; editable Word output remains a manual process and is explicitly disclosed.
- The contact-free PDF removes structured direct fields but is not a legal anonymisation service. Recruiter review and the bureau’s own privacy process remain required.
- The current Agency workflow does not provide ATS integrations, bulk processing, shared team roles, customer portal, or an embedded candidate-approval workflow.
- Search citation performance has not yet been re-measured; the new prompt coverage needs a Search Console/AI-citation observation window.
- The new English guides are intentionally not paired with Dutch route slugs because the requested search intent is English; language alternates remain absent where no equivalent page exists.

## Broader issues for a separate audit

- Audit older programmatic consumer pages for repeated “fast”, “professional”, or outcome-oriented language that may read as a guarantee without evidence.
- Review overlapping English format routes (`/en/cv-format-netherlands-english`, `/en/netherlands-cv-format`, and related guides) for canonical and intent clarity after this cluster has had time to settle.
- Standardise visible publication dates on older editorial pages; this implementation only normalised the Agency cluster.
- Review legacy downloadable filenames and internal labels containing anonymisation terminology, even where the visible copy now uses the more precise contact-free language.

## Prompts to monitor next

Candidate prompts:

1. “How do Dutch employers view a two-page CV for senior candidates?”
2. “Should an English CV for a Dutch startup include a photo?”
3. “What makes a creative CV parseable by Dutch ATS software?”
4. “How should a recent international graduate describe a Dutch orientation year on a CV?”

Agency prompts:

1. “How do I create a candidate presentation with evidence for every requirement?”
2. “Can a recruitment agency send a CV without direct contact details safely?”
3. “How do I put a candidate CV in agency branding without changing its content?”
4. “What should a recruiter confirm before sending a candidate to a client?”
