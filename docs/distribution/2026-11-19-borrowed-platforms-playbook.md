# Borrowed-platforms playbook (YouTube, LinkedIn, Reddit, Facebook, Pinterest)

Written 19 November 2026. Goal: get job seekers who are close to buying a CV onto WerkCV from platforms that
Google and AI answers already trust. Every piece links to a page or tool that is one step from a paid download,
never to calculators or general blog posts.

Facts used in all copy (check before posting if months have passed):
- CV PDF: **€7,95 once**, no subscription (`lib/site-content.ts`). Sollicitatiepas: €24,99 for 90 days.
- CV check: free, full report, no account or e-mail needed, also against a vacancy (`lib/cv-check/landing-content.ts`).
- CV.nl: €0,99 for 14 days, then €19,99 per month, renews automatically (our comparison page, checked
  28 Sep 2026). **Re-check CV.nl's pricing page before quoting it in public.**
- Internal data (Sep 2026 revenue plan): pricing / no-subscription pages convert ~11% of landings to paid,
  the homepage ~1.4%, templates/examples ~0.3%, calculators 0%. So the links below point at the check, the
  no-subscription page and the CV.nl comparison.

---

## 0. One-time setup (about 1 hour)

1. **YouTube:** create a channel named "WerkCV" (Brand Account under your Google account). Add the
   werkcv.nl link to the channel's "Links" section. Turn on "Allow embedding".
2. **LinkedIn:** post from **your personal profile** (founder voice gets far more reach in NL than a
   company page). Add "Founder WerkCV" to your headline and werkcv.nl as your featured link. Create a
   WerkCV company page too, only so posts can tag it.
3. **Reddit:** use an account with real history. If yours is new, spend 2 weeks answering CV and job
   questions **without links** first. Put "I build WerkCV, a Dutch CV builder" in your profile bio.
4. **Pinterest:** create a free **business** account "WerkCV", claim werkcv.nl (Settings → Claimed
   accounts; it gives you a meta tag. Send it to me and I'll add it to the site).
5. **Screen recorder:** OBS (free) or Loom. Record the editor at 1080p, browser zoom 125%, in a clean
   Chrome profile with no bookmarks bar.
6. **Test CV:** make one fictional, complete CV in WerkCV (for example "Sanne de Vries, logistiek
   medewerker") for every recording. Never show a real customer's CV.

### Tagged links (use exactly these, so each platform's sales show up in attribution)

The site already stores `utm_source` as first touch on the visitor and the order (`lib/attribution.ts`).

| Where | Link |
| --- | --- |
| YouTube descriptions (Dutch) | `https://werkcv.nl/cv-check?utm_source=youtube&utm_medium=video&utm_campaign=<video-slug>` |
| YouTube (CV.nl video) | `https://werkcv.nl/cv-gids/werkcv-vs-cv-nl?utm_source=youtube&utm_medium=video&utm_campaign=cvnl-opzeggen` |
| YouTube (English) | `https://werkcv.nl/en/cv-check?utm_source=youtube&utm_medium=video&utm_campaign=expat-cv` |
| LinkedIn posts | `https://werkcv.nl/cv-check?utm_source=linkedin&utm_medium=social&utm_campaign=<post-nr>` |
| Reddit (Dutch) | `https://werkcv.nl/cv-maken-zonder-abonnement?utm_source=reddit&utm_medium=social&utm_campaign=<thread>` |
| Reddit (English) | `https://werkcv.nl/en/dutch-cv-for-expats?utm_source=reddit&utm_medium=social&utm_campaign=<thread>` |
| Facebook groups | `https://werkcv.nl/cv-check?utm_source=facebook&utm_medium=social&utm_campaign=<group>` |
| Pinterest | `https://werkcv.nl/templates?utm_source=pinterest&utm_medium=social&utm_campaign=<template>` |

Reddit sometimes hides long tracking links; if a comment gets removed, post the plain URL instead.

---

## 1. YouTube (highest priority)

Rules: title starts with the search phrase. First 2 lines of the description = the answer + the link.
Add chapters. Length 3–6 minutes. Thumbnail: big text (max 4 words) + a CV image. Speak Dutch naturally;
the script is a guide, not something to read word for word.

### Video 1: "CV maken in 5 minuten (gratis template, zonder abonnement)"

- **Thumbnail text:** CV IN 5 MIN
- **Description:**
  > Zo maak je in 5 minuten een net cv dat sollicitatiesystemen goed lezen. Check je cv gratis (zonder account): https://werkcv.nl/cv-check?utm_source=youtube&utm_medium=video&utm_campaign=cv-5-min
  >
  > Bij WerkCV is maken en aanpassen gratis; alleen de PDF kost eenmalig €7,95, zonder abonnement.
  >
  > 0:00 Wat een recruiter in 10 seconden zoekt
  > 0:40 Template kiezen (waarom één kolom)
  > 1:30 Persoonlijke gegevens: wat wel en niet
  > 2:20 Werkervaring met resultaten
  > 3:30 Opleiding, vaardigheden, talen
  > 4:20 Checken en downloaden
- **Script outline:**
  1. Hook (0–15s): "Een recruiter kijkt gemiddeld een paar seconden naar je cv. In deze video maak je er één die die seconden overleeft."
  2. Kies een template met één kolom: sollicitatiesystemen lezen die het best. Show the template picker.
  3. Gegevens: naam, telefoon, e-mail, woonplaats, LinkedIn. Niet nodig: BSN, volledig adres, burgerlijke staat. Foto is in Nederland gebruikelijk maar niet verplicht.
  4. Werkervaring: nieuwste eerst, per functie 3–5 punten die met een werkwoord beginnen en een resultaat noemen. Show one bad and one good bullet side by side.
  5. Opleiding, vaardigheden, talen met niveau.
  6. Run the CV check on the test CV, fix one point live, end: "Link naar de gratis check staat in de beschrijving."

### Video 2: "CV laten checken: 5 fouten die recruiters direct zien"

- **Thumbnail text:** 5 CV-FOUTEN
- **Description first line:** "Plak je cv in de gratis check en zie je cijfer en verbeterpunten (geen account nodig): <cv-check link, campaign=5-fouten>"
- **Script:** take a deliberately weak test CV, paste it into `/cv-check`, and walk through 5 findings the
  report gives (e.g. vague profile text, no results in bullets, missing language levels, two-column layout,
  inconsistent dates). Fix each in the editor, re-check, show the higher grade. Only show findings the
  tool actually produces; record it first, then write the chapters.

### Video 3: "CV.nl opzeggen? Download eerst je cv" (high intent: people angry about a subscription)

- **Thumbnail text:** EERST DOWNLOADEN
- **Description first line:** "Voor je CV.nl opzegt: download je cv als PDF, anders ben je hem kwijt. Daarna kun je hem hier gratis importeren en eenmalig downloaden: <werkcv-vs-cv-nl link>"
- **Script:**
  1. "Zeg je CV.nl op? Doe eerst dit, anders verlies je je cv."
  2. Show (on your own account, if you have one, or described) where to download the PDF before cancelling.
  3. How cancelling works (general: account settings or via the payment provider; check the current CV.nl
     steps the day you record and show only what you have verified).
  4. "Wil je hem daarna nog aanpassen zonder abonnement?" Import the PDF in WerkCV (the editor's upload), show it filled in, €7,95 once.
  5. Keep it factual and polite about CV.nl; no claims you can't show on screen.

### Video 4 (English): "Dutch CV for expats: what recruiters in the Netherlands expect"

- **Thumbnail text:** DUTCH CV FORMAT
- **Description first line:** "Check whether your CV fits the Dutch market, free and without an account: <en/cv-check link>"
- **Script outline:** (from `/en/dutch-cv-for-expats`)
  1. "You don't need to pretend you're Dutch. You need to make your background easy to scan."
  2. Use a recognisable target job title, not a broad international one.
  3. Tools, sectors and measurable results per role.
  4. Dutch and English level stated separately and honestly.
  5. Location, availability and work permit route when relevant (mention the free visa sponsor checker page).
  6. 1–2 pages, one column, no date of birth or marital status needed.
  7. Run the English CV check on a test CV.

**Cadence:** 1 video per week. After 4 videos, look in YouTube Studio → Research tab for what Dutch
viewers search, and make video 5–8 from that.

---

## 2. LinkedIn (personal profile, 2 posts per week)

Rules: no link in the post itself (LinkedIn shows those to fewer people). Put the link in the **first
comment** right after posting. First line must make people click "...meer". Reply to every comment in
the first hour.

### Post 1
> De meeste cv's die ik zie, zakken niet op inhoud maar op opmaak.
>
> Twee kolommen, tekst in kaders, iconen voor je telefoonnummer. Het ziet er mooi uit, maar veel sollicitatiesystemen lezen het in de verkeerde volgorde of slaan stukken over.
>
> Mijn advies:
> → Eén kolom
> → Gewone kopjes: Werkervaring, Opleiding, Vaardigheden
> → Je contactgegevens als tekst, niet in de kopregel
> → PDF, geen foto van je cv
>
> Twijfel je over die van jou? In de eerste reactie staat een gratis check, zonder account.

First comment: `Gratis cv-check: <cv-check link, campaign=li-1>`

### Post 2
> "Verantwoordelijk voor de klantenservice."
>
> Deze zin staat op duizenden cv's. Een recruiter leert er niks van.
>
> Vergelijk:
> "Beantwoordde 60 klantvragen per dag; klanttevredenheid van 7,4 naar 8,1."
>
> Zelfde baan. Maar nu zie je wat iemand doet en hoe goed.
>
> Formule voor elk punt op je cv: werkwoord + wat je deed + resultaat (een getal als het kan).
>
> Welke zin op jouw cv kan zo herschreven worden?

### Post 3
> Een cv-abonnement van €19,99 per maand voor een document dat je één keer nodig hebt.
>
> Ik bouw WerkCV omdat ik dat model vreemd vind: je maakt je cv gratis en betaalt €7,95 één keer als je de PDF downloadt. Later aanpassen kost niets extra.
>
> Heb je ooit een abonnement afgesloten voor je cv en vergeten op te zeggen? Je bent niet de enige.

(First comment: no-subscription link, campaign=li-3. Re-check CV.nl's price that week.)

### Post 4
> Moet er een foto op je cv in Nederland?
>
> Kort antwoord: het mag, het is gebruikelijk, het is niet verplicht.
>
> Wel een foto? Recent, neutraal, alleen je gezicht en schouders, rustige achtergrond.
> Geen foto? Prima, zeker bij internationale bedrijven die anoniem werven.
>
> Wat wél verplicht voelt maar het niet is: geboortedatum, burgerlijke staat, BSN. Laat die weg.

### Post 5 (English, for expats)
> Applying for jobs in the Netherlands with an international CV?
>
> Dutch recruiters aren't asking you to be Dutch. They want to answer three questions fast:
> 1. Does your experience match this local role?
> 2. Will communication work? (State Dutch and English levels separately.)
> 3. Any practical risk? (Location, availability, work permit.)
>
> Make those three answers easy to find and your CV stops looking "foreign".
>
> Free check for Dutch-market fit in the first comment.

### Post 6
> Je eerste cv, zonder werkervaring. Wat zet je erop?
>
> → Bijbaan (ja, ook vakkenvullen: betrouwbaarheid, klantcontact, roosters)
> → Stage en projecten van je opleiding, met wat je opleverde
> → Vrijwilligerswerk, sportclub, bestuursfunctie
> → Vaardigheden die je kunt bewijzen (Excel, talen, rijbewijs)
>
> Een student-cv is kort. Eén pagina is genoeg.

(First comment: `https://werkcv.nl/cv-voorbeeld-student?utm_source=linkedin&utm_medium=social&utm_campaign=li-6`)

After 6 posts: reuse the best-performing format (look at "Impressions" and comments), and turn each
YouTube video into a LinkedIn post.

---

## 3. Reddit (expats + CV.nl complaints)

Subreddits: r/Netherlands, r/thenetherlands (Dutch), r/Amsterdam, r/Rotterdam, r/expats, r/werken,
r/cscareerquestionsEU (only for tech CV questions). **Read each subreddit's rules first**; several ban
self-promotion outright. Where links are banned, answer without one; the account bio still brings people.

How to find threads: Google `site:reddit.com "dutch cv"`, `site:reddit.com cv.nl abonnement`,
`site:reddit.com "cv" netherlands format`, `site:reddit.com cv maken`. Old threads that rank on Google
are worth answering too; people still land on them.

Rules for every comment:
- Answer the question fully in the comment first. The link is optional, at the end.
- **Always disclose:** "(Disclosure: I build WerkCV.)" Undisclosed self-promotion gets accounts banned and
  breaks Reddit's rules.
- Max 1 in 5 of your comments should contain a WerkCV link.

### Answer template A: "What does a Dutch CV look like?" (English)
> A few things that differ from the US/UK style:
> - 1–2 pages, one column, reverse chronological.
> - Photo is common but optional; skip date of birth, marital status and BSN.
> - State Dutch and English levels separately and honestly (e.g. Dutch A2, English C1).
> - Use recognisable job titles and say what you achieved, with numbers where you can.
> - If it matters for the role, make your location, availability and work permit situation easy to find.
>
> If you want a second opinion, there's a free checker for Dutch-market fit that needs no account (disclosure: I build it): <en link>

### Answer template B: "CV.nl keeps charging me / is CV.nl free?" (Dutch)
> Bij CV.nl betaal je na de proefperiode een maandbedrag dat automatisch doorloopt (check hun prijzenpagina voor het actuele bedrag). Tip: download eerst je cv als PDF vóór je opzegt, anders ben je hem kwijt. Opzeggen kan via je accountinstellingen; lukt dat niet, neem dan contact op met hun klantenservice of check je afschrift voor de betaalprovider.
>
> Als je daarna iets zonder abonnement zoekt: bij WerkCV (disclosure: die bouw ik) kun je die PDF importeren en betaal je één keer €7,95 bij downloaden. <no-subscription link>

### Answer template C: "Can someone review my CV?"
> Give real feedback on their actual CV first (2–3 specific points). Then, optionally:
> "If you want a quick automated pass for layout and missing sections, this one is free and doesn't need an account (disclosure: I made it): <cv-check link>"

---

## 4. Facebook groups

Search Facebook for: "expats Netherlands jobs", "jobs in Amsterdam", "vacatures [jouw regio]",
"werkzoekenden Nederland", "zij-instromers", "internationals in Eindhoven/Rotterdam/Den Haag".
Join 5–10 groups that are active (posts this week) and allow job-search help.

Weekly: answer 3–5 CV questions properly (template A/C above work here too). Once a month, if the group
allows it, post a tip with an image:

> 3 dingen die je vandaag van je cv kunt schrappen: je geboortedatum, je volledige adres en "referenties op aanvraag". Recruiters missen ze niet, en je wint ruimte voor resultaten. Gratis cv-check (geen account nodig): <facebook link>

---

## 5. Pinterest (low effort once set up)

1. Screenshot each template from `/templates` (13 templates) at high resolution.
2. Make one tall pin per template (1000×1500 px) in Canva: the screenshot + title text.
3. Pin title: "Modern cv template (gratis te bewerken)", "Cv voorbeeld student", "Professioneel cv template Word-alternatief", etc. Use the template's page name.
4. Pin description (example):
   > Gratis cv template met één kolom die sollicitatiesystemen goed lezen. Online invullen, eenmalig €7,95 voor de PDF, geen abonnement.
5. Link each pin to its own template page with `utm_source=pinterest&utm_campaign=<template>`.
6. Boards: "Cv templates", "Cv voorbeelden", "Sollicitatietips". Add 3–5 pins per week.

---

## 6. Weekly routine (about 4 hours)

| Day | Task | Time |
| --- | --- | --- |
| Mon | Record + upload 1 YouTube video | 90 min |
| Tue | LinkedIn post + first comment; reply to comments | 30 min |
| Wed | 3–5 Reddit answers, 3–5 Facebook group answers | 45 min |
| Thu | LinkedIn post (turn the week's video into a post) | 30 min |
| Fri | 3–5 Pinterest pins; check results (below) | 30 min |

## 7. How to know if it works (check every Friday, decide after 6 weeks)

- Run `scripts/paid-attribution-report.ts` against production and filter by `utm_source` =
  youtube / linkedin / reddit / facebook / pinterest. Count **paid orders**, not visits.
- Rule after 6 weeks: a platform with **0 paid orders** and fewer than 50 visits gets dropped. Put that
  time into the platform with the most orders.
- Also watch YouTube Studio "Search" traffic source and Google Search Console for `youtube.com` results
  showing for your keywords.
