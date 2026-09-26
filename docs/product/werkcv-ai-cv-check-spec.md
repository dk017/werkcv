# WerkCV AI CV-check: flagship spec (October 2026)

Status: decisions made; week 1 implemented locally · Author: research session 26 September 2026 · Scope: the October item of the revenue plan: fix the vacancy-match failures, merge the checker pages into one flagship Dutch "AI CV-check" with two modes (general check and vacancy match), and connect results to a "fix it in the editor" flow.

Evidence used: repository code; read-only aggregate production queries; Search Console exports (24 Jun–23 Sep 2026); Google Trends (NL, 5 years); competitor pages fetched 26 Sep 2026; one live production API call with fictional data. Sources are listed in §12.

---

## 1. Decision summary

1. **Build one flagship: "Gratis CV-check met AI"**, at `/cv-check` (NL) and `/en/cv-check` (EN), with an optional vacancy field. Paste a vacancy and the same report adds a vacancy-match section. All eight current checker pages 301-redirect into it (§6.1).
2. **Position it as the honest, Dutch CV check.** Report on what systems and people actually do with a CV. No fake "ATS-score", no fear copy, no "75% rejected" myth. Every finding quotes the CV or the vacancy.
3. **Differentiate on Dutch conventions** that the translated US tools and the small Dutch tools don't cover: CEFR language levels and "moedertaal", mbo/hbo/wo naming and foreign diplomas, "is een pre" (nice-to-have) vs. hard requirements, VOG/BIG/driving licence where the role signals it, and optional personal details (photo, date of birth, nationality, marital status).
4. **The free report is complete, with no email wall and no blur.** The upsell is the product loop: **"Verbeter dit in de editor"** creates the user's CV from the same upload, opens the editor with a fix checklist, and they pay the existing €4,99 once at download.
5. **Never show a blank failure.** If the AI step fails, show the deterministic report and say what's missing. The August–September outage (§2.2) must not repeat silently: add a schema contract test plus failure alerting.

---

## 2. Internal audit

### 2.1 Eight overlapping pages, three different engines

| Page | Engine | GSC impr. / clicks / avg pos (3 mo) | Landings 90d | Onward signal |
|---|---|---|---|---|
| `/tools/ats-cv-checker` | `analyzeAts`: one gpt-4o-mini call; **the LLM computes the score itself** (16 checks, "max 103 → normalize") | 436 / 14 / 10.4 | 27 | 5 tool→CV clicks, 1 signup |
| `/tools/cv-score` (+ `/methodologie`) | `scoreCv`: ~30 deterministic checks + an LLM part (1,658 lines) | 72 / 3 / 5.1 | 10 | 1 tool→CV click |
| `/tools/cv-vacature-match` | `matchCvVacature`: structured LLM requirements plus deterministic signals, 5 dimensions | 107 / 2 / 7.2 | 3 | all 3 runs failed |
| `/cv-checken` | Landing page (CvOptimizerSections), no tool | 25 / 0 / 17.3 | 7 | 5 CTA clicks |
| `/cv-nakijken` | Landing page, no tool | 198 / 3 / 18.8 | 8 | 3 CTA clicks |
| `/en/cv-job-match-checker` | `matchCvVacature` (EN) | 32 / 2 / 12.5 | 4 | 1 completed, 3 failed |
| `/en/dutch-cv-checker` | Landing page | 86 / 9 / 7.1 | 21 | 13 tool→CV clicks, 1 signup |
| `/en/resume-optimizer-netherlands` | Landing page | 260 / 7 / 6.1 | 15 | 5 signups, **2 paid orders** |

Related, not merged: `/cv-verbeteren`, `/cv-optimaliseren` (low traffic editorial landing pages) and `/en/ats-resume-netherlands` (1,155 impr, 42 landings → **10 signups**). Keep these as content and link them to the flagship.

Findings:
- **Three scoring systems give three different numbers for the same CV.** Users and AI assistants get inconsistent signals, and Google sees several near-duplicate pages.
- **`analyzeAts` lets the model compute the score**, so it isn't reproducible. Scores must be computed in code (§5.3).
- **Checker usage isn't measured.** The ATS checker and CV score record no started/completed events, only landings and CTA clicks, so their conversion is unknown.
- Traffic is small today (≈170 landings in 90 days across all these pages), but intent is high: the English ATS/optimizer pages turn about 1 in 3–4 landings into a signup.

### 2.2 Vacancy-match failures: root cause and status

- Events: completed on **14 Aug** (1/1). Failed on **28 Aug (2/2), 31 Aug (3/3) and 17 Sep (1/1)**, all with reason `analysis_failed`.
- Cause (from the code history): the MatchPack agency releases (16–21 Aug) added optional `vacancyReference`/`evidenceReference` fields to the shared `requirementSchema`. OpenAI strict structured outputs reject optional fields, so every call failed. Commit `061acc7` (21 Sep) split out `aiRequirementSchema`; the comment in `lib/tools/cv-vacature-match-schema.ts` documents it.
- **Status: fixed in production.** A live call on 26 Sep (fictional CV and vacancy) returned HTTP 200 in 6.2 s with a coherent result. There have been no real user runs since the fix.
- Why it went unnoticed for 4 weeks: the API returns a generic `ANALYSIS_FAILED`; there's no alert and no failure-rate monitor; and the shared schema has no contract test. §8 fixes all three.

### 2.3 Quality bug found in the live test

The vacancy asked for "Uitstekende beheersing van de Nederlandse taal in woord en geschrift". The CV said "Talen: Nederlands (moedertaal)". The model marked the requirement **missing** and made it the #1 fix. This is exactly the Dutch-convention judgement the flagship must get right. It goes into the golden test set (§8.1) as a required-pass case.

### 2.4 Reusable building blocks

- `ToolCvHandoff` (token-hashed, expiring, consumed once). It currently only supports `profile` and `experience` kinds; add a `cv_check` kind.
- `/api/parse-cv` + `createPersonalCvDocument` turn an uploaded file into an editor CV (login required).
- Editor: `KeywordScannerWidget` (vacancy keywords, can take a vacancy) and `AiWritingAssistant` with per-user daily AI limits (`consumer-ai-limits`).
- `lib/cv-parser.ts`: pdfjs text extraction with page structure; text items carry positions (usable for layout signals, §5.2).
- `reportOpsIncident` for alerting; the `startSource` convention for attribution.
- 175 vacancies in the `Job` table (`/vacatures/[slug]`) as a natural entry point for vacancy mode. `/vacatures` itself returns 404.

---

## 3. Market research

### 3.1 What the US leaders do

| Product | Core loop | Checks / structure | Free | Paid | Lesson for WerkCV |
|---|---|---|---|---|---|
| **Jobscan** | CV + job description → **match rate** → edit → rescan | Searchability (contact, headings, job title, dates, education), hard skills (counted in JD vs CV, weighted most), soft skills, recruiter tips (measurable results, tone, word count), formatting. Claims to detect the employer's ATS from the posting | 5 scans/month | $49.95/mo, or $89.95 per 3 months | Vacancy match is the high-intent feature; weighting hard skills and showing counts makes gaps concrete |
| **Enhancv** | Upload (JD optional) → score + task list → builder | 27 checks in 7 categories: ATS essentials, sections, content (parse rate, quantified impact, repetition, spelling, bullet length), job tailoring, recruiter red flags, **bias & discrimination** (age/date bias, gaps), seniority & impact | Basic check free, no signup stated | Pro adds human-reader "red flags" plan | Parse rate plus task list plus bias checks; privacy line "never used for AI training". Its NL version is well localised but uses generic ATS guidance (Greenhouse/Lever/Workday) |
| **Resume Worded** | Score My Resume (0–100) and Targeted Resume (relevancy vs JD) | 30+ checks; **line-level labels** ("no metrics", "weak verb", "vague"); keywords colour-coded matched/missing | Free score | Pro/AutoFix | Line-level feedback on the user's own text is far more actionable than a category score |
| **Rezi** | Builder where the score **updates live while editing** | Rezi Score: content, format, optimization, best practices (each /100). Keyword targeting asks **"Is this missing keyword relevant to your experience?"** before writing a bullet | 1 CV, 3 PDFs | $29/mo or $149 lifetime | Keep check and edit in one loop; ask before adding a keyword (honesty) |
| **Teal** | Free library of 50+ tools + tracker + builder | Resume analysis and keyword matching gated in Teal+ | Free forever with limited AI credits | $13/wk, $29/mo, $79/quarter | Tool library for SEO breadth; generous free core |
| **Kickresume** | Scan → 20+ weighted checks → % score | Design, structure, content; "75%+ is good" | Basic | Premium grader | No Dutch UI, so no direct competition in NL |

Across all of them: **free instant score → concrete gaps → fixing them happens in the paid product.** They charge by subscription ($29–50/month); none offers a one-time model, which is WerkCV's opening.

### 3.2 The Dutch market today

| Player | Model | What it does | Weaknesses we can beat |
|---|---|---|---|
| **CVster** `/cv-checker` | Free, **email required** ("Deel uw e-mailadres om door te gaan"); upsell to subscription (€14,95 per 4 weeks) | Upload + optional job description, "16 essentiële controles", % score | Fear copy ("Je cv komt niet door de ATS cv scan" below 60%); logos of Meta/Google as "ATS users"; states data may transfer to the US; no Dutch-convention checks |
| **AICVchecker.nl** (AI Loopbaan Solutions, Steenwijk) | 1 free check, no account; credits €1,99 / 10 for €9,99 / 30 for €24,99, no subscription | Content, structure and ATS; vacancy match ("gericht advies") costs a credit | Small brand; vacancy match is paid; no builder to apply fixes. Strong privacy ("Cv wordt niet bewaard", "Gemaakt en gehost in Nederland"): **match that standard** |
| **Enhancv NL** | Free basic, Pro upsell (USD brand) | 27 checks, natural Dutch copy | Generic US ATS advice; no Dutch conventions; US company |
| **UseResume NL** | Free after short registration | 37 signals in 8 categories; natural Dutch | Registration wall; generic |
| **CV-Scanner.com/nl** | Unclear | Score /100, "80–85%+" target | Anonymous operator, fake-looking testimonials |
| **Sollicitatie.ai** | Fully free builder + AI letters | "ATS-optimised" templates | No real checker; free undercuts price but lacks depth |
| **maakeencv.nl** | Free / Pro €9,95/mo | Shows ATS readability per template; no checker | No checker |
| **Human checks**: FNV Young & United, CNV (free for members and under-26s), YER (final-year students), cvcheck.info (recruiters, 5 working days), loopbaancoaches | Free or membership | Human feedback | Slow (days), access-limited. **Partnership angle**, not a threat |

Nobody in the Dutch market combines: (a) a complete free report without an email wall, (b) Dutch-convention checks, (c) evidence quoted from the CV and vacancy, (d) a builder to apply fixes, and (e) a one-time price. That combination is the product.

### 3.3 What ATS software actually does (honest framing)

- The "75% of CVs are rejected by the ATS" figure has no study behind it. It traces to 2012 marketing material from Preptel, a company that closed in 2013. In Enhancv's 2025 interviews with 25 US recruiters, **92% said their ATS doesn't reject automatically**. CVs go unread mainly because of volume. Recruiters filter and search by keywords, and some employers use knock-out questions.
- What matters in practice: (1) **the parser reads your CV correctly**, so contact details, titles, dates and sections land in the right fields; (2) **recruiters find you** with keyword searches and filters; (3) **the human reader sees fit and evidence** within seconds.
- The Dutch hiring-system landscape is fragmented: about 45 vendors with local presence (29 corporate, 16 agency). Named in Dutch overviews: Recruitee/Tellent, Homerun, Connexys (Bullhorn), Workday, SAP SuccessFactors/SmartRecruiters (SAP bought SmartRecruiters in Sep 2025), Cornerstone, Oracle/Taleo, Visma|Raet EasyCruit, and at agencies OTYS, Carerix, MySolution, Bullhorn. No reliable market-share data exists.
- CV parsing: **Textkernel** (Amsterdam, owned by Bullhorn since June 2024) parses 29 languages including Dutch and serves 2,500+ HR software vendors, job boards and employers. It's reasonable to design parse checks around mainstream parser behaviour (single column, text not in images, contact details in the body, standard headings), but **don't claim to simulate a specific ATS**. Jobscan-style "ATS detection" isn't reliable in NL; we may later recognise the hiring system from a vacancy URL (e.g. `*.recruitee.com`, `*.homerun.co`, `*.myworkdayjobs.com`) purely to give parsing tips.

### 3.4 Search demand

- Search Console (3 months): checker-intent queries include "ats checker" 124 impr at #8.9, "ats cv checker" #6.0, "kun je kijken of mijn cv aansluit bij de vacature" 66 at #5.9, "cv check" 56 at #27, "ats cv" 94 at #45, "ats resume" 63 at #24, "cv ats proof maken" #7.9, "cv verbeteren" 84 at #63, and the Greenhouse "unsuccessful resume parse" queries ~330 at #9.9. "ats-netherlands.com" (162 impr) is a **freight company**: ignore it.
- Google Trends (NL): "ats cv" **+3,750%**, "ats friendly cv template" Breakout; "chatgpt cv" grew from 0 to about 10% of "cv maken" volume in 4 years, while "cv maken" fell 21%. Demand is moving to AI and ATS terms.
- Target phrases (check volumes in Keyword Planner before final titles): cv check, gratis cv check, cv checker, ai cv checker, ats cv checker, cv laten checken, cv vergelijken met vacature, cv afstemmen op vacature, cv verbeteren met ai, ats-proof cv. EN: dutch cv checker, resume checker netherlands, cv job match.

---

## 4. Positioning and principles

**Name:** "CV-check" (NL) / "CV check" (EN). Page title direction: *Gratis CV-check met AI: ATS-leesbaarheid, inhoud en match met de vacature*.

**Promise:** *Binnen een minuut zie je wat systemen en recruiters uit je cv halen, wat ontbreekt voor deze vacature en wat je als eerste verbetert, met citaten uit je eigen cv.* (Within a minute you see what systems and recruiters get from your CV, what's missing for this vacancy and what to fix first, quoted from your own CV.)

Principles (product and copy):
1. **Evidence over vibes.** Every finding quotes the CV and/or vacancy. No finding without a quote or a measurable signal.
2. **Honest about ATS.** Call it "CV-check score", never "ATS-score". Explain that systems mostly parse and search; people decide. No 75% statistic, no "you won't get through" fear messages, no big-tech logos.
3. **Never encourage lying.** Missing requirements get "voeg alleen toe als het klopt" (only add it if it's true) plus how to show real evidence. This carries over the current `honestAction` rule and Rezi's "is this relevant to your experience?" pattern.
4. **Dutch first.** Dutch conventions are a scored category, not a footnote.
5. **Complete for free.** No email wall, no blurred results. Saving the report or fixing it in the editor requires the existing email-code account.
6. **Privacy by default.** CVs aren't stored unless the user asks to continue in the editor. No CV content in logs or analytics.
7. **Consistent and explainable.** Same input gives the same score (±1); the score is computed in code; there's a public, versioned methodology page.

---

## 5. Product spec

### 5.1 Flow

1. **Input**
   - CV: upload PDF/DOCX (≤10 MB, like the vacancy match today), or paste text. Show "Je cv wordt niet opgeslagen" and a link to methodology/privacy.
   - Optional **"Plak de vacature (optioneel)"**. With a vacancy, the report adds §5.4 D.
   - Entry with `?vacature=<job slug>` (from `/vacatures/[slug]`) pre-fills the vacancy.
2. **Progress:** staged steps: "Tekst uitlezen → Structuur controleren → Inhoud beoordelen → (Vacature vergelijken)". Target p50 < 8 s, p95 < 15 s.
3. **Report** (§5.4) on the same page, with anchor navigation.
4. **Next step:** "Verbeter dit in de editor" (§5.6); secondary: "Check een andere vacature", "Download of bewaar rapport" (account).

### 5.2 Checks

Every check has an id, category, severity (`critical|important|tip`), pass/fail/not-applicable, evidence (quote or measured value), and a fix text. Deterministic checks run in code; semantic checks come from one structured LLM call.

**A. Leesbaarheid voor systemen** (parse; mostly deterministic)
- Text extractable; **scanned/image-only pages** (page text length ~0) → critical.
- **Reading order / columns**: cluster pdfjs text-item x-positions per page; interleaved columns → important, with "zo leest een systeem je cv" (how a system reads your CV) preview.
- Contact details only in the header/footer region (by y-position) → important.
- DOCX: text in text boxes, tables or headers that `mammoth` drops (compare raw XML text vs extracted) → important.
- Standard section headings recognised (NL/EN aliases, as in the current `SECTION_ALIASES`).
- Consistent date formats; dates present for each role.
- File name (e.g. `CV_Voornaam_Achternaam.pdf`), file size, page count.
- Icons/special glyphs replacing words (e.g. phone/email icons without text).
- **Parse preview:** show the fields a parser would get: name, email, phone, location, job titles with dates, education, languages. This is the most tangible "ATS" answer we can give honestly.

**B. Basis en contact**
- Name; professional email (not a placeholder, not an obviously unprofessional handle); NL phone format; city/region (full address not needed); LinkedIn URL.

**C. Inhoud en bewijs** (reuse and trim `scoreCv` rules; LLM for judgement)
- Profile text present, 3–5 sentences, role-specific, not buzzword-only (reuse the NL/EN buzzword lists).
- Quantified results per role; action verbs; bullet length and consistency; repetition; first person; spelling and grammar (LLM, max 5 examples quoted).
- **Line-level labels** on up to 8 bullets ("geen resultaat", "vaag", "zwak werkwoord", "sterk"), Resume Worded style.

**D. Nederlandse conventies** (the differentiator; deterministic + LLM)
- **Talen**: CEFR (A1–C2) or clear wording. **"Moedertaal" counts as C2/native** for a Dutch-language requirement (fixes §2.3). For non-native Dutch, suggest NT2/CEFR level if known.
- **Opleiding**: Dutch naming (vmbo/havo/vwo, mbo niveau 1–4, hbo, wo); "werk- en denkniveau" in vacancies is met by the equivalent level. Foreign degrees → suggest adding the Dutch equivalent (IDW/Nuffic evaluation) when relevant.
- **Persoonsgegevens**: photo, date of birth, nationality and marital status are **optional**. Tip-level only, neutral wording (you may leave them out; they aren't required), no judgement. **BSN, ID numbers and health information → critical: remove.**
- **Role signals**: care/education/childcare → mention **VOG** if available; healthcare → **BIG-registratie** where applicable; logistics/sales/field roles → **rijbewijs**. Only when the CV or vacancy signals the domain.
- **Lengte**: 1–2 pages for most roles; academic/senior roles may be longer.
- Language consistency: CV language matches the vacancy language (NL vacancy + EN CV → tip).
- "Referenties op aanvraag": optional; interests: optional, and only when they add something.

**E. Aansluiting op de vacature** (only with a vacancy; extends the current `matchCvVacature`)
- Extract 5–10 requirements, each quoted from the vacancy, classified as **hard requirement** (diploma/level, years of experience, licence, language, availability/hours, certificates) or **pre** (nice-to-have: Dutch "is een pre", "pré", "gewenst", "bij voorkeur", "is een plus").
- Per requirement: strong / partial / missing, CV quote, honest action.
- **Keyword coverage**: hard skills and tools with counts in the vacancy vs the CV (Jobscan pattern). Only list keywords that literally occur in the vacancy (keep the existing `validatedMissingKeywords` guard).
- **Job title alignment**: target title vs CV titles and profile.
- **Knock-out risk**: hard requirements with no CV evidence → shown first.
- Never infer protected characteristics; never predict hiring outcomes (keep the current system prompt rules).

### 5.3 Scoring

- **Headline: a Dutch "rapportcijfer" (school-grade) 1,0–10,0 with one decimal**, plus a band ("Onvoldoende" < 5,5, "Voldoende" 5,5–6,9, "Goed" 7,0–8,4, "Uitstekend" ≥ 8,5). Culturally native (CVster already uses "score met cijfer"), and it avoids the fake-precision "%" of ATS tools. Show the 0–100 underneath for EN users and for the methodology.
- **General mode weights:** A Leesbaarheid 30 · B Basis 10 · C Inhoud & bewijs 35 · D Nederlandse conventies 25.
- **Vacancy mode:** the headline becomes the **match**. E Aansluiting 50 + A 15 + C 20 + D 15; the general grade is still shown separately.
- Severity caps: any `critical` check caps the grade at 5,4 until fixed (e.g. scanned PDF, BSN present).
- The **score is computed in code** from check outcomes. The LLM only returns classifications and quotes (never numbers).
- `scoreVersion` is stored with every result and shown on the methodology page; changing weights bumps the version.
- Stability: temperature 0; deterministic checks first. Semantic items use enums. Target: re-running the same input gives the same grade in ≥ 95% of runs (golden set).

### 5.4 Report layout (top to bottom)

1. Grade + band + one-sentence summary; with a vacancy: match grade + "Harde eisen: 4 van 5 aangetoond" (hard requirements: 4 of 5 shown).
2. **Top 3 verbeteringen** (ordered by impact; each with a quote and "Los op in de editor" (fix in the editor)).
3. With a vacancy: requirements table (hard requirements first, then "pre"), then keyword coverage.
4. "Zo leest een systeem je cv" parse preview.
5. Category sections A–D with all checks (collapsed when passing).
6. "Wat deze check wel en niet zegt" (what this check does and doesn't tell you): limitations, the methodology link and the ATS reality in 3 lines.
7. FAQ (also as FAQPage schema).

### 5.5 Access, limits and cost

- Anonymous: general check **and** vacancy match are free. Rate limit per IP: 8 per hour (current), plus 20 per day; logged-in users get 40 per day.
- AI cost per run (gpt-4o-mini class): well under €0,01. Set a daily spend guard with an ops alert.
- Only saving the report, reopening it and "fix in the editor" need an account (existing email-code login).

### 5.6 "Verbeter dit in de editor" (fix it in the editor)

1. Click → consent line: "We bewaren je cv en de bevindingen maximaal 24 uur om je editor te vullen" (we keep your CV and findings for at most 24 hours to fill your editor).
2. Server creates a `ToolCvHandoff` with `kind: "cv_check"`. The payload contains the structured CV (`parseCVText` on the already-extracted text, so no second upload), the finding ids plus fix texts, the vacancy text if present, and `scoreVersion`. TTL 24 h; stored token-hashed as today.
3. Login if needed → consume → `createPersonalCvDocument` (attribution `startSource=cv_check`, cluster `cv-check`) → open the editor.
4. The editor shows a **"CV-check" panel** with the fix checklist. Each item jumps to its section; items can be ticked off. With a vacancy, `KeywordScannerWidget` opens pre-filled with the vacancy.
5. A "Check opnieuw" (check again) button in the panel re-runs the check on the current CV JSON and shows the grade change (the Rezi live-score idea in v1 form; true live scoring is v2).
6. Payment is unchanged: €4,99 once at PDF download.

### 5.7 English version

`/en/cv-check` with identical logic and English copy. "Dutch conventions" is framed for expats (what Dutch recruiters expect; EN vs NL CV choice; CEFR for Dutch). Keep hreflang pairs.

---

## 6. SEO, AI citations and entry points

### 6.1 URLs and redirects

| From | To |
|---|---|
| `/tools/ats-cv-checker`, `/tools/cv-score`, `/cv-checken`, `/cv-nakijken` | `/cv-check` (301) |
| `/tools/cv-vacature-match` | `/cv-check/vacature` (301). Same tool, vacancy field open, own title/intro targeting "cv vergelijken met vacature" |
| `/tools/cv-score/methodologie` | `/cv-check/methodologie` (301) |
| `/en/dutch-cv-checker`, `/en/resume-optimizer-netherlands` | `/en/cv-check` (301) |
| `/en/cv-job-match-checker` | `/en/cv-check/job-match` (301) |

Risk: `/tools/ats-cv-checker` holds the best positions (#8.9 for "ats checker"). A 301 transfers most signals, but expect 2–6 weeks of fluctuation. Mitigation: move its best copy blocks and FAQ into the flagship, keep "ATS" prominent in the title/H1, update all internal links (not just redirects), and resubmit in Search Console and Bing. **Launch before mid-November** so it settles before the January peak.

`/en/resume-optimizer-netherlands` produced 2 paid orders. Keep its strongest copy in the EN flagship, and check its conversion after the move.

### 6.2 On-page

- Title/H1 with "CV-check", "AI", "ATS" and "vacature"; a first paragraph that works as the quotable answer; a dated "Laatst bijgewerkt" (last updated) line.
- `WebApplication` + `FAQPage` schema; methodology page with version, weights and limitations (a citation magnet for AI assistants, following Jobscan/Enhancv's research-content pattern).
- Internal links from the homepage facts block, `/prijzen`, the editor, the CV-tips hub, `/en/ats-resume-netherlands`, `/cv-verbeteren`, `/cv-optimaliseren`, and every `/vacatures/[slug]` page ("Check je cv tegen deze vacature").
- `llms.txt`: add the CV-check to "Quick answers" once live.

### 6.3 Follow-ups (not in October scope)

- Greenhouse "unsuccessful resume parse" page (EN + NL), linking to the check.
- Anonymised aggregate report ("Nederlandse cv's onder de loep 2027: de 5 meest voorkomende fouten"), counts only, from check outcomes. Needs a privacy review first.
- A fair "AI CV-checkers vergeleken" comparison page.

---

## 7. Technical design

### 7.1 Module

`lib/cv-check/`
- `extract.ts`: wraps `extractTextFromFileWithPages`; adds layout signals (column clustering, header/footer contact detection, empty-page detection) and a DOCX text-box/table probe.
- `checks/deterministic.ts`: categories A, B, parts of C and D (port from `cv-score.ts` and `cv-vacature-match.ts`; delete duplicates after the migration).
- `llm.ts`: **one** structured call per run (general, or general + vacancy). A strict-compatible Zod schema (no optional fields; use `nullable` instead). Returns enums and quotes only.
- `score.ts`: weights, caps, grade conversion, `scoreVersion`.
- `schema.ts`: public result schema (versioned), shared by the API, UI, handoff and tests.
- API: `POST /api/cv-check` (multipart or JSON; `locale`; optional `vacancyText` or `jobSlug`). Redirects replace the old APIs; keep `/api/tools/cv-vacature-evidence` for the agency product, **which must never expose the consumer score** (existing rule in `cvVacatureEvidenceResultSchema`).

### 7.2 Reliability

- Timeout 25 s on the LLM call; one retry on schema/parse errors; then **fallback**: return the deterministic report with `aiStatus: "unavailable"` and a clear notice. The user always gets a report.
- Specific error codes: `PARSE_FAILED`, `SCANNED_PDF`, `TEXT_TOO_SHORT`, `PROVIDER_ERROR`, `PROVIDER_TIMEOUT`, `SCHEMA_ERROR`, `RATE_LIMITED`, `DAILY_BUDGET`.
- `reportOpsIncident` when ≥ 3 of the last 10 runs fail or any `SCHEMA_ERROR` occurs.
- Never log CV or vacancy text; log only lengths, codes and timings.

### 7.3 Privacy and legal (for review by counsel before launch)

- **AVG/GDPR:** process in memory; no storage without the §5.6 consent. Handoff TTL 24 h, deleted after consumption. Update `/privacy` (purpose, processor, retention). Consider OpenAI's **EU data residency** (zero data retention for eligible EU projects) or an EU-hosted model provider, and state it on the page; AICVchecker's "gehost in Nederland" sets the local bar.
- **EU AI Act:** a tool used by candidates on their own CV isn't the Annex III use case of an employer screening applicants (high-risk obligations from 2 Dec 2027). But the **same engine must not be offered to recruiters as a ranking or score**. Keep the agency evidence-only projection. Meet transparency norms: say clearly that AI produces parts of the report (Art. 50 spirit), and publish the methodology.
- **Equal treatment (College voor de Rechten van de Mens):** no inference or advice based on protected characteristics. Personal-detail checks stay neutral ("optioneel") and never suggest hiding identity to "improve" chances. The College's standard for procedures, "inzichtelijk, controleerbaar en systematisch" (transparent, verifiable and systematic), is a good bar for our own explanations.

---

## 8. Quality program

### 8.1 Golden set (required before launch)

- 40 fictional CVs × 3 formats where relevant (clean single-column PDF, two-column PDF, DOCX with text boxes, scanned PDF) and 20 fictional Dutch and English vacancies, across mbo/hbo/wo levels, care/education, logistics, IT, retail, office and expat cases.
- Each pair has expected outcomes per check and per requirement. Required passes include:
  - "Nederlands (moedertaal)" meets "uitstekende beheersing Nederlands".
  - "is een pre" → `pre`, never a knock-out.
  - "mbo 4" meets "mbo 4 werk- en denkniveau"; "hbo" meets it too.
  - A skill present without an example → `partial`, never "add this term".
  - Two-column PDF → reading-order warning.
  - A BSN in the CV → critical.
- CI: run deterministic checks on every PR. LLM golden runs nightly or before release, with ≥ 90% agreement on requirement status and ≥ 95% grade stability.

### 8.2 Contract tests

- A test that feeds every LLM schema through `zodResponseFormat` and fails on optional fields. It would have caught the August outage.
- A test that the agency evidence schema contains no score fields.

---

## 9. Measurement

Events (no CV content; buckets only):
- `cv_check_viewed` {locale, entry: direct|vacature_page|editor|content}
- `cv_check_started` {mode: general|vacancy, input: file|text}
- `cv_check_completed` {mode, gradeBucket, criticalCount, aiStatus, durationMsBucket, scoreVersion}
- `cv_check_failed` {mode, code}
- `cv_check_fix_clicked` {checkId, category}
- `cv_check_handoff_created`, `cv_check_handoff_consumed`
- Attribution: `startSource=cv_check` through to `paid`.

Baseline (last 90 days, all 8 pages): ≈170 landings; ≥ 2 paid orders attributable; vacancy match 1 completion / 7 starts.

Targets (first 8 weeks after launch; revisit after 4 weeks of data):
- Completion ≥ 85% of starts; failures < 3%.
- ≥ 20% of completed checks click "Verbeter in de editor"; ≥ 50% of those reach the editor with a CV.
- Paid conversion of check-originated CVs at least at the Dutch site average for editor-started CVs.
- Search: flagship in the top 5 for "ats cv checker" and "cv check" (NL) by January.

---

## 10. Plan (October → early November)

| Week | Deliverables |
|---|---|
| 1 | Measurement on current pages (§9 events); schema contract test; ops alert on failures; fix the moedertaal false negative in the current prompt as a hotfix; start the golden set |
| 2 | `lib/cv-check` engine: extract + layout signals, deterministic checks (ported), one LLM call, scoring, fallback, API; golden set green on deterministic checks |
| 3 | Flagship UI NL/EN (report, parse preview, vacancy mode), methodology page, `?vacature=` entry + vacancy-page button |
| 4 | "Verbeter in de editor" handoff (`cv_check` kind) + editor panel + "check opnieuw"; privacy page update; legal review |
| 5 (by early Nov) | Redirects + internal links + sitemap/`llms.txt`; Search Console/Bing resubmission; launch; monitor daily for 2 weeks |

---

## 11. Decisions (made 26 September 2026)

1. **Flagship URL: `/cv-check`** (EN `/en/cv-check`), with the §6.1 redirects.
2. **Headline score: Dutch rapportcijfer 1,0–10,0**, with 0–100 shown underneath.
3. **AI provider: stay on OpenAI for now.** Enable an EU data-residency project when eligible (a dashboard/config change, no code change) and state it on the page once active.
4. **Free limits: everything free without an account**, including the vacancy match, with rate limits of 8 per hour and 20 per day per IP. Only saving the report and "fix in the editor" need login.
5. **Human review upsell:** later; not in October scope.

### Week 1 status (26 September 2026)

- Contract test `lib/ai-structured-output-contract.test.ts`: runs every production structured-output schema through `zodResponseFormat` and fails when a new call site isn't registered. Verified that the pre-21-Sep schema throws the exact outage error.
- Vacancy-match route: specific error codes (`PARSE_FAILED`, `PROVIDER_TIMEOUT`, `PROVIDER_RATE_LIMITED`, `PROVIDER_ERROR`, `SCHEMA_ERROR`, `UNKNOWN`); `ops_ai_tool_failed` alert for defects/outages with a sanitised error (no CV text); client failure events carry the code.
- Dutch-convention fixes, as prompt rules plus deterministic post-processing in `lib/tools/cv-vacature-match-rules.ts`: CEFR comparison (moedertaal/native = C2, uitstekend/vloeiend/fluent = C1), "quoted CV evidence is never missing", "named tool present in the CV is at least partial", and availability fixes ranked after substantive gaps. This also applies to the agency evidence workflow, which calls the same function.
- Golden set `lib/cv-check/golden/vacancy-match-cases.ts` (7 cases) + runner `npm run test:cv-check:golden`. Old prompt: **33/41** checks. Current: **58/58** over 3 runs per case, with scores identical across runs in 6 of 7 cases.
- Measurement: `cv_score_*` events were logged but never stored (not in `PERSISTED_FUNNEL_EVENTS`); now stored. Added `cv_score_failed` and `ats_checker_started/completed/failed`.

## 12. Sources

- Jobscan: https://www.jobscan.co/ · report sections: https://www.jobscan.co/jobscan-tutorial · pricing review: https://careery.pro/blog/resume-applications/is-jobscan-worth-it-2026
- Enhancv checker: https://enhancv.com/resources/resume-checker/ · NL: https://enhancv.com/nl/cv-checker/ · recruiter study: https://enhancv.com/blog/does-ats-reject-resumes/
- Resume Worded: https://resumeworded.com/
- Rezi: https://www.rezi.ai/ · keyword targeting: https://www.rezi.ai/rezi-docs/ai-keyword-targeting-explained
- Teal pricing: https://www.tealhq.com/pricing · tools: https://www.tealhq.com/tools
- Kickresume checker: https://www.kickresume.com/en/resume-checker/
- CVster checker: https://cvster.nl/cv-checker
- AICVchecker: https://aicvchecker.nl/ · pricing: https://aicvchecker.nl/prijzen
- UseResume NL: https://useresume.ai/nl/free-tools/resume-checker
- CV-Scanner NL: https://cv-scanner.com/nl
- Sollicitatie.ai: https://sollicitatie.ai/ · maakeencv pricing: https://www.maakeencv.nl/prijzen
- Human checks: https://www.cnv.nl/diensten/laat-je-sollicitatiebrief-en-cv-door-ons-nakijken/ · https://www.yer.nl/cv-check/ · https://www.cvcheck.info/
- ATS myth: https://www.hr.com/en/app/blog/2026/04/ats-rejection-myth-debunked-92-of-recruiters-confi_mntajhyq.html · https://blog.theinterviewguys.com/ats-resume-rejection-myth/
- Dutch ATS landscape: https://recruitmenttraining.pro/nieuws/ats-systemen-nederland-2026/ · https://www.recruitmenttech.nl/2026/03/23/dit-zijn-de-meest-gebruikte-ats-systemen-wereldwijd-in-2026/
- Textkernel: https://www.textkernel.com/products-solutions/parser/ · https://www.dutchstartup.ai/en/startups/textkernel
- EU AI Act Annex III: https://artificialintelligenceact.eu/annex/3/ · Art. 50: https://artificialintelligenceact.eu/article/50/
- College voor de Rechten van de Mens, werving en selectie: https://www.mensenrechten.nl/themas/digitalisering/werving-en-selectie
- OpenAI EU data residency: https://openai.com/index/introducing-data-residency-in-europe/ · https://help.openai.com/en/articles/10503543-data-residency-for-the-openai-api
