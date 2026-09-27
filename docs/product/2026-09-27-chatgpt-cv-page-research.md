# "CV maken met ChatGPT": research and page plan

Research date: 27 September 2026.

## 1. Demand
- Google Trends NL (5 years): "chatgpt cv" 7–11 vs "cv maken" 50–58, i.e. roughly 12–20% of the head term. Autocomplete: "chatgpt cv maken", "chatgpt cv laten maken", "chatgpt cv prompt", "cv laten maken door chatgpt", "cv ai checker".
- WerkCV today (Search Console, 3 months): `/cv-gids/cv-maken-met-chatgpt` 30 impressions at 19,1 · `/cv-tips/cv-schrijven-met-ai` 48 at 7,2 · `/cv-maken-met-ai` 28 at 41,9 · `/en/guides/create-cv-with-chatgpt` 24 at 7,75. The ChatGPT guide is about 300 words, has no prompts or steps, and says the AI writing help "wordt nog getest".

## 2. What ranks (Bing NL, 26–27 Sep)
1. chatgpt.com's own "CV-generator" page. 2. cvtips.nl (~1.300 words, 7 prompts, pros/cons, no sources, no date). 3. solliciteer.net (~2.000 words, 9 prompts, "written by AI (Grok) and checked", dated April 2025, no sources).
Gaps in all of them: no privacy advice on what not to paste, nothing on Dutch conventions (language levels, 'pre'), no data or sources, no way to check the result.

## 3. External evidence (verified at the primary source)
Tilburg University & Rendement, press release 19 Nov 2024 ("Werkgevers gedogen sollicitatiebrief en cv door ChatGPT"):
- 94% of organisations select with a CV and/or form; 80% ask for a letter.
- Employers estimate 25% of CVs and 29% of letters are written with a language model, and probably underestimate it.
- 79% let applicants decide, as long as the letter or CV matches reality; 11% forbid it.
- 18% say an AI-looking letter lowers the chance of an interview (37% no difference, 23% depends on the role); organisations are "iets minder streng" for CVs.
- Concerns: skills harder to judge 62% · less authentic 49% · unintentionally wrong information 28% · privacy 15% · deliberately wrong information 14%. Only 8% plan to respond.

OpenAI Help Center, "Data controls in ChatGPT" (read 27 Sep 2026): conversations can be used to train models unless "Improve the model for everyone" is turned off (Settings → Data controls). Temporary chats are not used for training and may be kept up to 30 days.

## 4. Our test: 24 CVs written by gpt-5.5
Method: OpenAI API, model `gpt-5.5` (27 Sep 2026), default settings, no system prompt. 8 roles × 3 prompt styles taken from the ranking guides: (1) "Schrijf een voorbeeld cv voor een [functie]", (2) "Maak een cv van deze gegevens: [notities]", (3) "Hier is mijn cv … Pas mijn cv aan op deze vacature", where the vacancy asks for two things the person does not have. All people are fictional. Raw outputs and scripts: `docs/product/data/2026-09-27-chatgpt-cv-test-*`.

| Finding | Count |
|---|---|
| Markdown formatting (**, ##, ---) | 24/24 |
| Advice or "if you do have this, add…" alternatives mixed into the CV text | 8/8 tailored CVs |
| Placeholders such as [jouw telefoonnummer] | 7/24 (3/8 from notes, 4/8 tailored) |
| Personality traits added that were not in the notes (stressbestendig, resultaatgericht, …) | 5/8 CVs from notes |
| Tool added that was not in the notes (Microsoft Office) | 1/8 |
| Missing vacancy requirement claimed as experience | 0/8 (1 borderline: "Bekend met IPM-principes") |
| Language level as moedertaal/CEFR | only where the input had one; otherwise "vloeiend", "redelijk", "goed" |
| Example-CV prompt: fictional name, address and employers; date of birth 2/8; "Referenties op aanvraag" 3/8 | – |

Reading: the current model is careful about claims, but the copy-paste result is not a finished Dutch CV. The risks are leftovers, placeholders, formatting, empty traits and vague language levels, not invented jobs.

### 4b. Same people, WerkCV prompts (16 CVs)
Prompts with explicit rules (only my facts; plain text, no placeholders; Dutch headings; languages as moedertaal/CEFR; no advice inside the CV; questions after an end marker). Result: leftovers 0/16 (vs 24/24), traits not in the notes 0/8 (vs 5/8), missing requirements claimed 0/8, end marker used 16/16. Where the notes had no language level, it asked for it instead of guessing (one guessed "Duits: A1" from "basis"). Raw outputs: `docs/product/data/2026-09-27-chatgpt-cv-test-outputs-werkcv-prompts.json`.

## 5. Plan
- Rewrite `/cv-gids/cv-maken-met-chatgpt` (keeps its URL and EN pair) as the flagship guide: dated intro, whether employers allow it (Tilburg), our test results, a step-by-step plan with copy-paste Dutch prompts (incl. privacy step), a checklist, and the CV-check embedded with pasted text as the default input.
- Add an "AI-restanten" check to the CV-check engine: placeholders in brackets, markdown, chat phrases and conditional instructions left in the CV. Bump the score version and the methodology page.
- Keep `/cv-tips/cv-schrijven-met-ai` (different keyword, position 7) and link both ways; English guide rewrite follows.

## 6. English test (for /en/guides/create-cv-with-chatgpt)
Same method, 8 expat personas (e.g. a nurse with BIG registration in progress, Dutch A2–B2), English prompts: "Write a CV for a [job] in the Netherlands", "Create a CV from these details", "Tailor my CV to this job" (ad asks for two missing items and good Dutch), plus English versions of the WerkCV rules. 40 CVs, gpt-5.5, 27 Sep 2026. Raw: `data/2026-09-27-chatgpt-cv-test-outputs-en.json`.

| Finding | Popular prompts | WerkCV prompts |
|---|---|---|
| Formatting symbols | 24/24 | 0/16 |
| Placeholders | 17/24 (8/8 example prompt) | 0/16 |
| Advice/alternatives mixed into tailored CV | 8/8 | 0/8 |
| Traits not in the notes | 6/8 (notes prompt) | 0/8 |
| Date of birth / nationality / marital status added | 3/8 example prompt (0/8 notes, 0/8 tailored; an earlier count of 5 matched "age:" inside "language:") | 0/16 |
| Tailored CV switched to Dutch unasked | 2/8 (nurse, admin assistant; Dutch A2/B1) | 0/8 |
| Missing requirement claimed | 0/8 (2 borderline "familiar with") | 0/8 |

Detector: English framing patterns added ("Below is…", "I've kept…", "If you have…, add"); raw English outputs flagged 24/24; clean Dutch + English CVs flagged 0/87.

## 7. Cover-letter test (for /cv-gids/sollicitatiebrief-met-chatgpt)
Same 8 fictional applicants, each with a fictional vacancy (company, city, size, two requirements the applicant lacks). gpt-5.5, 27 Sep 2026. Prompts: (1) "Schrijf een motivatiebrief voor de functie [functie] bij [bedrijf]." (no details), (2) "Schrijf een sollicitatiebrief op basis van mijn cv en deze vacature", (3) WerkCV rules (facts only from CV and vacancy, no company claims beyond the vacancy, missing requirements only as questions, max 250 words, no standard opening, plain text, no placeholders, questions after ---EINDE BRIEF---). Raw: `data/2026-09-27-chatgpt-letter-test-outputs.json`.

| Finding | No details | CV + vacancy | WerkCV rules |
|---|---|---|---|
| Placeholders ([datum], [naam], …) | 8/8 | 5/8 | 0/8 |
| Formatting symbols | 7/8 | 2/8 | 0/8 |
| Traits not given (gedreven, leergierig, stressbestendig, …) | 8/8 | 7/8 | 0/8 |
| Standard opening ("Met veel interesse/belangstelling…", "Graag solliciteer ik…") | 8/8 | 8/8 | 0/8 |
| Claims about the organisation not in the vacancy | n/a | 2/8 ("klantgerichtheid staat centraal", "groeiend bedrijf") | 0/8 |
| Missing requirement claimed | n/a | 0/8 (named honestly as "nog geen ervaring") | 0/8 (only as questions) |
| Average words | 246 | 293 | 151 |

Trade-off: the rule-based letters are factual but plain; they restate vacancy facts. Readers should add one concrete example of their own (the questions after the letter ask for it).
