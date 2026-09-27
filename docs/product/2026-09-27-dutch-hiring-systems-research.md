# Which hiring systems Dutch employers use, and whether per-system guides are worth building

Research date: 27 September 2026. Sources: Search Console export (24 Jun–23 Sep), Google Trends exports (NL, 5 years), Google NL autocomplete, Bing NL results, Greenhouse's public job-board API, and a crawl of the careers sites of 90 Dutch employers (raw result: `2026-09-27-dutch-employer-ats-sample.json`).

## 1. The "Greenhouse" signal is not job-seeker demand

The query behind "we rank #10 for Greenhouse" is `site:support.greenhouse.io "unsuccessful resume parse"` (197 impressions, plus 68 and 65 for variants starting with `+` and `%`). It uses a search operator aimed at Greenhouse's own help site. People don't type that; tools and AI assistants that look up Greenhouse's documentation do. It is not a reason to build a Greenhouse page.

## 2. Which systems 90 Dutch employers use (measured)

Sample: 90 employers across finance, retail, transport/logistics, government, healthcare, education, energy, construction, industry and tech. Method: careers page → vacancy page (via sitemap or vacancy feed) → apply link, looking for the system's domains and scripts.

- **About 25 of 90:** a known system is visible (table below).
- **About 23 of 90:** confirmed own branded careers site with a built-in application form; the system behind it is not visible to applicants. Many of these sites come from recruitment agencies: Floyd Hamilton (NS, Achmea, Eneco, UvA, Van Oord), Getnoticed (Randstad, Ahold Delhaize, Intergamma) and Dropr/Cdlvr (Belastingdienst, Kruidvat).
- **About 37 of 90:** not determined yet. The site blocked the crawler, or its vacancy pages load only via JavaScript (e.g. ABN AMRO, Rabobank, Albert Heijn, KPN, PostNL, KLM, Rijksoverheid, several municipalities and hospitals). This needs a browser pass before anything is published.
- Where the system is visible (about 25 of 90), no single system dominates. Two tools that sat on top of another system were excluded from this count (Phenom and Eightfold, 5 employers).

| System | Employers in the sample |
|---|---|
| Workday | ING, Nationale-Nederlanden, Unilever, Wolters Kluwer, Just Eat Takeaway |
| SAP SuccessFactors | Lidl, Heineken, TU Delft |
| Visma EasyCruit / Youforce | Zuyderland, Amsterdam UMC, Hogeschool Utrecht |
| Greenhouse | Adyen, bol |
| Recruitee | LUMC, Maastricht UMC+ |
| Jobylon | HEMA, Radboudumc |
| Others, 1 each | iCIMS (Booking.com), Ashby (Mollie), Carerix (ANWB), Otys (Heijmans), Connexys/Bullhorn (Nedap), Cegid/Talentsoft (UMC Utrecht), Cornerstone (HU) |

Greenhouse's job-board API confirms it for a few Dutch-based employers: Adyen (60 NL jobs), bol (32), Databricks Amsterdam (31), Catawiki (26), HelloFresh (17). These are mostly English-language tech roles.

## 3. What Dutch job seekers search

- Searches for system names are almost all logins: "recruitee inloggen", "easycruit inloggen", "easycruit zuyderland", "werken voor nederland mijn sollicitatie". "Greenhouse cv parsing" and "workday cv format" show up in autocomplete, but they are English and global.
- The generic ATS cluster is growing fast (Google Trends NL, 5 years): "ats cv" +3.750%, "cv ats template" +1.250%, "ats friendly cv template" is breaking out. Autocomplete: "ats cv maken", "ats systeem cv", "ats cv checker", "cv checker with job description", "cv ai proof maken".
- **"chatgpt cv" is much bigger:** Trends puts it at 7–11 against "cv maken" at 50–58 (NL), with "chatgpt cv maken", "cv laten maken door chatgpt" and "chatgpt cv prompt" as completions.

## 4. Where WerkCV stands in the ATS cluster

Search Console, 3 months: "ats cv" 94 impressions at position 45 · "ats resume" 63 at 24 · "ats-vriendelijke cv" 29 at 18. Four Dutch pages overlap on this intent (`/ats-cv-template` 190 impr. at 9,6; `/cv-tips/ats-vriendelijk-cv` 52 at 8,0; `/cv-gids/ats-vriendelijke-cv-builder-voor-nederlandse-vacatures` 59 at 8,6; plus the CV-check). The English `/en/ats-resume-netherlands` has 1.155 impressions at 16,0 and **320 AI-feature impressions**, the highest of any ATS page.

Bing NL for "ats cv", "ats systeem cv" and "ats vriendelijk cv": CVMaker, LiveCareer, cv.nl, YoungCapital, Indeed, Canva and CVontwerper, all with generic tips. **None has data on which systems Dutch employers actually use.**

## 5. Conclusion

- Per-system guides (Greenhouse, Workday, …) in Dutch: **don't build them.** There is no measurable job-seeker demand, many employers hide their system behind their own form, and no system is common enough to justify a guide (the most common, Workday, appears at 5 of 90).
- The research is itself the asset: an original, dated finding ("which systems Dutch employers use, and what it means for your CV"), which is the kind of content AI assistants and journalists cite.
