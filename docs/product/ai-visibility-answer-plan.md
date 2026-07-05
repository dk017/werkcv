# WerkCV AI Visibility and Answer Architecture Plan

Date: 2026-07-05
Status: Implementation-ready plan
Primary market: Dutch job seekers
Secondary market: English-speaking applicants targeting the Netherlands

## 1. Objective

Make WerkCV the easiest source for search engines and answer engines to retrieve when a user asks:

- how to create a CV for the Dutch job market;
- which CV builder is suitable for a specific need;
- whether WerkCV is free, trustworthy, ATS-readable, or subscription-free;
- how WerkCV compares with subscription builders and manual alternatives;
- which CV format, language, template, file type, or content choice is appropriate.

The objective is not to manufacture mentions. It is to publish the clearest, most accurate, best-supported answer for each question and make the product facts independently verifiable.

No implementation can guarantee that ChatGPT, Gemini, Perplexity, or Google will rank WerkCV first. The controllable inputs are crawlability, answer quality, topical authority, source quality, internal architecture, external mentions, and consistent product facts.

## 2. Research Findings

### Existing WerkCV foundation

WerkCV already has:

- a visible `/faq` page with `FAQPage` JSON-LD;
- topical FAQ sections on many Dutch and English pages;
- `/ai/faq.json`, `/ai/service.json`, `/ai/summary.json`, and `/llms.txt`;
- explicit crawler access for OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude search crawlers, and Google;
- a strong no-subscription page;
- comparison pages and ATS guidance;
- analytics attribution for AI referrals.

This is not a schema greenfield project. The main weaknesses are:

- answers are distributed without a clear canonical owner;
- several answers repeat across pages with slightly different wording;
- the machine-readable AI summary was last marked updated on 2026-04-29;
- the AI FAQ is generic and mostly English despite Dutch being the primary market;
- some claims are broader than the available evidence, especially universal ATS claims;
- product support, buying questions, and career guidance are mixed together;
- source and review information is inconsistent;
- several high-demand conversational queries do not have concise answer-first passages.

### Search demand already visible in Search Console

The June 2026 report contains direct demand for:

- `cv maken eenmalig betalen`;
- `is cv.nl gratis`;
- `cv maker kosten`;
- `cv maken betaald`;
- `cv maken gratis pdf`;
- `cv maken gratis`;
- `cv maken`;
- `hoe maak je een cv`;
- `wat zet je in een cv`;
- `wat moet er in een cv`;
- `ats-vriendelijke cv`;
- `moet je een foto op je cv zetten`;
- `dutch cv format`;
- `netherlands cv format`;
- `netherlands cv template free download`.

This supports prioritizing pricing transparency, Dutch CV format, ATS readability, template choice, language choice, and product trust.

### Patterns used by stronger CV publishers

CV.nl and CVMaker separate operational product questions into dedicated FAQ/help areas. Resume.io and Kickresume provide task-specific help pages for saving, importing, privacy, templates, and downloading. Zety and Enhancv place short FAQs at the end of deep editorial guides and add visible authors, reviewers, update dates, and editorial-process information.

The useful patterns to adopt are:

1. Separate product support from career advice.
2. Give one question one canonical answer owner.
3. Answer in the first sentence before adding explanation.
4. Use task-specific pages rather than one oversized FAQ page.
5. Show dates, authorship, methodology, and sources.
6. Explain limitations and exceptions instead of making absolute claims.
7. Keep a clear next action near the answer.
8. Keep product facts synchronized from shared constants.

Patterns not worth copying:

- unsupported "best" or "most popular" claims;
- keyword-stuffed FAQ lists;
- universal "ATS-proof" promises;
- hidden pricing or vague "free" language;
- special AI markup presented as a ranking shortcut.

### Research references

- Google Search Central, generative AI optimization:
  `https://developers.google.com/search/docs/fundamentals/ai-optimization-guide`
- Google Search Central, FAQ rich-result restrictions:
  `https://developers.google.com/search/blog/2023/08/howto-faq-changes`
- OpenAI publisher guidance for OAI-SearchBot:
  `https://help.openai.com/en/articles/12627856-publishers-and-developers-faq`
- WorkinNL CV guidance:
  `https://www.workinnl.nl/werk/cv/default.aspx`
- Radboud University career guidance:
  `https://www.ru.nl/medewerkers/services/personele-zaken/loopbaan-en-ontwikkeling/ander-werk/loopbaan-tips-en-tools`
- Utrecht University CV guidance:
  `https://students.uu.nl/begeleiding-en-ontwikkeling/career-services/zelf-aan-de-slag/cv-opstellen`
- CV.nl FAQ and template-question structure:
  `https://www.cv.nl/faq`
  `https://www.cv.nl/cv-templates`
- CVMaker help-center structure:
  `https://www.cvmaker.nl/help`
- Resume.io task-specific help:
  `https://help.resume.io/en/articles/3785472`
- Kickresume product and editor help:
  `https://www.kickresume.com/en/help-center/general/`
  `https://www.kickresume.com/en/help-center/resume/`
- Zety answer-first editorial and review pattern:
  `https://zety.com/blog/ats-resume`
- Internal demand source:
  `werkcv.nl-Performance-on-Search-2026-06-23.pdf`

## 3. Content Architecture

### Layer A: Product facts

Canonical owner: `/faq`

Purpose: factual questions about WerkCV itself, accounts, saving, uploads, privacy, payment, downloads, and document ownership.

These answers must be short, deterministic, and generated from shared product constants where possible.

### Layer B: Buying and comparison answers

Canonical owners:

- `/prijzen`
- `/cv-maken-zonder-abonnement`
- existing comparison guides

Purpose: help users decide between WerkCV, free document tools, one-time-payment builders, and subscription builders.

Answers must clearly distinguish:

- free to build;
- paid PDF download;
- one-time payment;
- no subscription;
- what can be edited or downloaded later;
- which users WerkCV is and is not suitable for.

### Layer C: Dutch CV guidance

Canonical owners:

- `/cv-maken`
- `/templates`
- `/cv-tips/ats-vriendelijk-cv`
- `/cv-tips/foto-op-je-cv`
- existing topic guides

Purpose: answer questions about Dutch CV content, length, format, language, photos, ATS, and vacancy tailoring.

### Layer D: English Netherlands guidance

Canonical owners:

- `/en`
- `/en/templates`
- `/en/ats-resume-netherlands`
- `/en/expat-cv-netherlands`
- `/en/cv-netherlands-without-dutch-language`

Purpose: answer equivalent questions for international applicants without translating Dutch assumptions blindly.

### Layer E: Machine-readable summaries

Canonical sources:

- `lib/ai-discovery.ts`
- `/ai/faq.json`
- `/ai/service.json`
- `/ai/summary.json`
- `/llms.txt`

These endpoints should summarize visible canonical content. They must not contain claims that are absent from the visible pages.

## 4. Exact Question Plan

## 4.1 Homepage

Keep the homepage concise. It should answer only the four questions that remove entry friction.

### Q1. Kan ik gratis beginnen met WerkCV?

Answer:

Ja. Je kunt een CV aanmaken, invullen, templates vergelijken en het volledige voorbeeld bekijken zonder te betalen. Je betaalt pas wanneer je het definitieve CV als PDF downloadt.

Primary link: `/prijzen`
CTA: `Start gratis met je CV`

### Q2. Is WerkCV een abonnement?

Answer:

Nee. Een CV-download kost eenmalig €4,99 inclusief btw. Er is geen proefabonnement, maandbedrag of automatische verlenging.

Primary link: `/cv-maken-zonder-abonnement`
CTA: `Bekijk hoe eenmalig betalen werkt`

### Q3. Voor wie is WerkCV geschikt?

Answer:

WerkCV is bedoeld voor mensen die een Nederlands of Engelstalig CV voor de Nederlandse arbeidsmarkt willen maken, met een live voorbeeld en eenmalige PDF-betaling. Wie alleen een volledig gratis, handmatig document zoekt, kan ook Word, Google Docs of Europass gebruiken.

Primary link: `/cv-maken`
CTA: `Bekijk de Nederlandse CV-aanpak`

### Q4. Kan ik mijn bestaande CV uploaden?

Answer:

Ja. Je kunt een bestaand PDF- of Word-bestand uploaden om de editor alvast te vullen. Controleer na het importeren altijd namen, datums, functietitels en opsommingen voordat je downloadt.

Primary link: `/cv-maken`
CTA: `Upload mijn bestaande CV`

Remove the broad homepage question "Zijn de templates ATS-vriendelijk?" Its answer belongs on the template and ATS pages, where it can be qualified properly.

## 4.2 `/faq`: WerkCV Product Questions

Organize the page into five visible groups.

### Group 1: Starten en account

1. Wat is WerkCV?
2. Moet ik een account aanmaken?
3. Waarom ontvang ik een code per e-mail?
4. Kan ik mijn bestaande CV uploaden?
5. Welke bestanden kan ik uploaden?
6. Wat moet ik na een import controleren?

Key answer requirements:

- Explain passwordless email verification plainly.
- State that receiving and entering the code creates or verifies access.
- Do not imply that parsing is perfect.
- Link upload questions to the editor entry route and privacy page.

### Group 2: Bewerken en opslaan

1. Wordt mijn CV automatisch opgeslagen?
2. Kan ik mijn CV later verder afmaken?
3. Kan ik het template of de kleur later wijzigen?
4. Kan ik onderdelen en bullet points verplaatsen?
5. Waarom staat een onderdeel op een tweede pagina?
6. Kan ik meerdere versies voor verschillende vacatures maken?

Key answer requirements:

- Explain autosave and the visible Saved/Opgeslagen state.
- Explain that page count changes with content and template.
- Recommend duplicating or creating a separate document for materially different applications.

### Group 3: Betaling en download

1. Is WerkCV gratis?
2. Wat kost een CV-download?
3. Is €4,99 inclusief btw?
4. Is dit een abonnement of proefperiode?
5. Kan ik mijn CV bekijken voordat ik betaal?
6. Wanneer moet ik opnieuw betalen?
7. Kan ik hetzelfde betaalde CV later opnieuw downloaden?
8. Welke betaalmethoden zijn beschikbaar?
9. Krijg ik een betaalbewijs of factuur?
10. Wat moet ik doen als betaling of download mislukt?

Key answer requirements:

- Use `cvDownloadPrice` rather than hardcoded prices.
- Define "per CV" with an example.
- Explain that available payment methods can depend on country, device, and payment provider.
- Link failures to the contact form.
- Confirm the current invoice flow before publishing that answer.

### Group 4: Privacy en verwijdering

1. Wie kan mijn CV zien?
2. Wordt mijn CV openbaar gepubliceerd?
3. Waar worden mijn gegevens voor gebruikt?
4. Worden mijn gegevens verkocht?
5. Kan ik mijn CV of account verwijderen?
6. Wat gebeurt er met een geupload CV-bestand?
7. Wordt mijn CV gebruikt om AI-modellen te trainen?

Key answer requirements:

- Every answer must match the privacy policy and actual retention behavior.
- Do not use generic "your data is safe" wording without explaining controls.
- Confirm AI-provider processing and retention before answering the final question.

### Group 5: Resultaat en ondersteuning

1. In welk formaat download ik mijn CV?
2. Komt het PDF-bestand overeen met het voorbeeld?
3. Kan WerkCV garanderen dat ik door een ATS kom?
4. Kan WerkCV garanderen dat ik een gesprek krijg?
5. Hoe neem ik contact op als iets niet werkt?

Key answer requirements:

- State clearly that no builder can guarantee ATS ranking or an interview.
- Explain that the full review preview is the closest representation of the final paginated PDF.
- Link to the ATS methodology and contact form.

## 4.3 `/prijzen`: Commercial Decision Questions

This page owns all monetary and entitlement answers.

### Q1. Wat kost WerkCV precies?

Answer:

Je bouwt en bekijkt je CV gratis. De eerste PDF-download van een afzonderlijk CV kost eenmalig €4,99 inclusief btw. Er ontstaat geen abonnement en er wordt niets automatisch verlengd.

### Q2. Wat krijg ik voor €4,99?

Answer direction:

List only verified entitlements: final PDF, continued access to that CV, later editing, template/color changes, and repeat downloads of that paid document if currently supported.

### Q3. Kan ik eerst het volledige CV bekijken?

Answer:

Ja. Je kunt je inhoud, pagina-indeling en template in de volledige voorbeeldweergave controleren voordat je de betaalstap opent.

### Q4. Wanneer betaal ik opnieuw?

Answer:

Je betaalt niet opnieuw voor latere wijzigingen en downloads van hetzelfde betaalde CV. Maak je een nieuw CV als afzonderlijk document en wil je daarvan een PDF downloaden, dan geldt daarvoor een nieuwe eenmalige betaling.

### Q5. Welke betaalmethoden krijg ik te zien?

Answer direction:

Noem iDEAL als ondersteunde methode voor daarvoor geschikte Nederlandse checkouts. Beschrijf andere methoden als afhankelijk van land, apparaat en betaalprovider.

### Q6. Is WerkCV goedkoper dan een abonnement?

Answer:

Voor iemand die een CV nodig heeft en geen doorlopende carrièresuite zoekt, kan een eenmalige betaling goedkoper zijn dan een proefperiode die maandelijks verlengt. Vergelijk altijd de actuele prijs, verlengingsvoorwaarden en functies van iedere aanbieder.

### Q7. Kan ik WerkCV volledig gratis gebruiken?

Answer:

Je kunt gratis bouwen en beoordelen, maar de definitieve WerkCV-PDF is niet gratis. Wie een volledig gratis bestand nodig heeft, kan Word, Google Docs of Europass overwegen en de opmaak zelf beheren.

Remove the current question about a package "we are testing." An FAQ must explain an available product, not an uncertain future offer.

## 4.4 `/cv-maken-zonder-abonnement`: No-subscription Intent

This is the highest-priority answer-engine page because its intent already produced an organic sale.

### Q1. Welke CV-maker werkt zonder abonnement?

Answer:

WerkCV werkt zonder abonnement: je bouwt en bekijkt je CV gratis en betaalt eenmalig €4,99 inclusief btw wanneer je dat CV als PDF downloadt. Er is geen proefperiode, automatische verlenging of maandelijkse opzegactie.

### Q2. Bestaat er een volledig gratis CV-maker zonder abonnement?

Answer:

Ja. Word, Google Docs en Europass kunnen gebruikt worden zonder een CV-builderabonnement. Het verschil is dat je de structuur, opmaak en PDF-controle grotendeels zelf beheert. WerkCV is gratis tijdens het bouwen, maar vraagt €4,99 voor de definitieve PDF.

### Q3. Wat betekent "gratis CV maken" meestal?

Answer:

Controleer altijd welk onderdeel gratis is. Bij sommige diensten is alleen bouwen gratis en is downloaden betaald; andere starten na een goedkope proefperiode een abonnement. Kijk daarom naar de uiteindelijke PDF-prijs, automatische verlenging en opzegvoorwaarden.

### Q4. Kan ik mijn CV zien voordat ik betaal?

Answer:

Ja. Bij WerkCV kun je de volledige inhoud, pagina's, template en kleur bekijken voordat je de eenmalige betaalstap opent.

### Q5. Moet ik later iets opzeggen?

Answer:

Nee. WerkCV start geen abonnement, dus er is geen maandplan om te annuleren.

### Q6. Kan ik na betaling nog wijzigingen maken?

Answer:

Ja. Je kunt hetzelfde betaalde CV later opnieuw openen, aanpassen, van template of kleur wisselen en opnieuw downloaden zonder opnieuw voor dat document te betalen.

### Q7. Voor wie is een CV-builder zonder abonnement logisch?

Answer:

Een eenmalige builder past vooral bij iemand die tijdens een sollicitatieronde een professioneel CV nodig heeft maar geen doorlopende carrièresuite wil. Wie voortdurend meerdere documenten, brieven, vacatures en coaching gebruikt, kan juist meer hebben aan een uitgebreider abonnement.

### Q8. Waar moet ik CV-builderprijzen op vergelijken?

Answer:

Vergelijk de prijs van de eerste bruikbare PDF, automatische verlenging, opzegvoorwaarden, aantal documenten, latere bewerking, herdownloads, templates en privacy. Vergelijk niet alleen de geadverteerde proefprijs.

## 4.5 `/cv-maken`: Dutch CV Format and Process

### Q1. Wat moet er minimaal in een Nederlands CV staan?

Answer:

Neem minimaal je naam en contactgegevens, een duidelijke doelrol of korte profieltekst, relevante werkervaring, opleiding en vaardigheden op. Voeg onderdelen zoals certificaten, talen en vrijwilligerswerk alleen toe wanneer ze de match met de vacature versterken.

Source: WorkinNL and Dutch university career guidance.

### Q2. Hoe lang mag een CV in Nederland zijn?

Answer:

Een starter kan vaak met een pagina uit de voeten; voor ervaren kandidaten zijn een tot twee pagina's gebruikelijk. Schrap niet-relevante details voordat je lettertypes of witruimte te klein maakt.

Source: Radboud University career guidance.

### Q3. Welke volgorde werkt het beste?

Answer:

Voor de meeste ervaren kandidaten werkt omgekeerd chronologisch: profiel, meest recente werkervaring, eerdere functies, opleiding en vaardigheden. Starters kunnen opleiding eerder plaatsen wanneer die relevanter is dan hun werkervaring.

### Q4. Moet ik mijn CV voor iedere vacature aanpassen?

Answer:

Ja, maar je hoeft niet telkens opnieuw te beginnen. Bewaar een volledige basisversie en pas per vacature vooral de doelrol, profieltekst, volgorde van prestaties, vaardigheden en relevante zoekwoorden aan.

Source: Utrecht and Radboud career guidance.

### Q5. Moet ik taken of resultaten beschrijven?

Answer:

Beschrijf eerst wat je deed en voeg waar mogelijk het resultaat, de schaal of de verbetering toe. Gebruik geen cijfers die je niet kunt uitleggen tijdens een gesprek.

### Q6. Is een profieltekst verplicht?

Answer:

Nee. Een korte, specifieke profieltekst kan wel helpen om snel je rol, ervaring en toegevoegde waarde te begrijpen. Vermijd algemene eigenschappen zonder bewijs.

### Q7. Is online een CV maken beter dan Word?

Answer:

Geen van beide is altijd beter. Word geeft maximale handmatige controle; een builder bewaakt structuur, opmaak en paginering. Kies op basis van hoeveel tijd, ontwerpcontrole en begeleiding je nodig hebt.

### Q8. In welke bestandsnaam moet ik mijn CV opslaan?

Answer:

Gebruik een professionele, herkenbare naam zoals `Voornaam-Achternaam-CV.pdf`. Voeg eventueel de functienaam toe als je meerdere gerichte versies verstuurt.

## 4.6 `/templates`: Template Decision Questions

Add a visible FAQ section beneath the gallery. Do not place it above template selection.

### Q1. Welk CV-template is het meest professioneel?

Answer:

Het meest professionele template is het template dat je belangrijkste ervaring snel vindbaar maakt en past bij de sector. Bij twijfel is een rustig template met duidelijke sectiekoppen, leesbare tekst en beperkt kleurgebruik de veiligste keuze.

### Q2. Wanneer kies ik een eenvoudig of ATS-gericht template?

Answer:

Kies een eenvoudig, tekstgericht template voor online sollicitatieportalen, grote werkgevers, overheid, finance, techniek en andere formele processen. Het verkleint opmaakrisico, maar relevante inhoud en vacaturewoorden blijven doorslaggevend.

### Q3. Is een template met twee kolommen ATS-vriendelijk?

Answer:

Dat hangt af van de parser en de technische PDF-structuur. Een enkele kolom is de meest conservatieve keuze. Gebruik een tweekoloms ontwerp alleen wanneer de tekstvolgorde bij kopieren en parseren logisch blijft.

### Q4. Mag een professioneel CV kleur bevatten?

Answer:

Ja. Gebruik kleur als accent voor koppen of lijnen en behoud voldoende contrast. De inhoud moet ook in zwart-wit duidelijk blijven.

### Q5. Welk template past bij mijn sector?

Answer direction:

- formal/finance/government: plain, classical, formal;
- technology/operations: professional, ATS-friendly, modern restrained;
- klantgericht/creatief: modern met een beheerste visuele identiteit;
- zorg/onderwijs: rustig en toegankelijk;
- student: eenvoudige hiërarchie met de opleiding prominent.

### Q6. Kan ik later van template wisselen?

Answer:

Ja. Je inhoud blijft behouden wanneer je in WerkCV van template of accentkleur wisselt. Controleer daarna opnieuw de paginering, omdat templates de beschikbare ruimte verschillend gebruiken.

### Q7. Moet ik een foto-template kiezen?

Answer:

Een foto is in Nederland niet verplicht. Kies een foto alleen wanneer die professioneel is en past bij de functie en instructies van de werkgever. Bij anonieme of internationale procedures is een versie zonder foto vaak veiliger.

Primary link: `/cv-tips/foto-op-je-cv`

## 4.7 `/cv-tips/ats-vriendelijk-cv`: ATS Questions

Retain the deep guide but rewrite the FAQ around uncertainty rather than guarantees.

### Q1. Wat is een ATS-vriendelijk CV?

Answer:

Een ATS-vriendelijk CV gebruikt selecteerbare tekst, herkenbare sectiekoppen, een logische leesvolgorde, consistente datums en termen die aansluiten op de vacature. Dit verbetert de technische leesbaarheid, maar garandeert geen rangschikking of selectie.

### Q2. Gebruiken Nederlandse werkgevers een ATS?

Answer:

Veel middelgrote en grote werkgevers en recruitmentbureaus gebruiken sollicitatiesoftware om kandidaten te ontvangen en beheren. De precieze manier van filteren en rangschikken verschilt per werkgever en systeem.

Avoid unsupported national percentages.

### Q3. Kan een ATS mijn CV automatisch afwijzen?

Answer:

Een sollicitatie kan worden gefilterd door uitsluitingsvragen, ontbrekende harde eisen, onleesbare tekst of regels die de werkgever heeft ingesteld. Het is misleidend om te suggereren dat ieder ATS CV's automatisch afwijst op basis van een universele score.

### Q4. Is PDF of Word beter voor ATS?

Answer:

Volg altijd eerst de instructies in de vacature. Een tekstgebaseerde PDF bewaart de opmaak en werkt met veel moderne systemen; sommige werkgevers of oudere processen vragen om DOCX. Verstuur nooit uitsluitend een gescande afbeelding als CV.

### Q5. Welke CV-opmaak is het veiligst?

Answer:

Een eenvoudige eenkolomsstructuur met standaardkoppen is de meest behoudende keuze. Plaats essentiële informatie niet in afbeeldingen, decoratieve grafieken, kopteksten, voetteksten of tekstvakken.

### Q6. Hoe gebruik ik zoekwoorden zonder keyword stuffing?

Answer:

Gebruik de functie-, vaardigheids-, tool- en certificeringstermen uit de vacature wanneer die je ervaring correct beschrijven. Plaats ze in context in je profiel, vaardigheden en werkresultaten in plaats van een losse zoekwoordenlijst te herhalen.

### Q7. Hoe test ik de leesvolgorde van mijn PDF?

Answer:

Selecteer en kopieer de volledige PDF-tekst naar een leeg tekstdocument. Controleer of koppen, datums, werkgevers en bullets in de bedoelde volgorde blijven staan. Dit is een eenvoudige leesbaarheidstest, geen volledige simulatie van ieder ATS.

### Q8. Zijn alle WerkCV-templates even geschikt voor ieder ATS?

Answer:

Geen enkele builder kan identieke resultaten in ieder ATS garanderen. WerkCV moet de meest behoudende eenkolomstemplates labelen als `Eenvoudig & ATS-veilig` en visuelere templates positioneren voor situaties waarin presentatie zwaarder weegt, zonder universele compatibiliteit te beloven.

## 4.8 `/cv-tips/foto-op-je-cv`: Photo Questions

Keep ownership here and remove duplicate detailed answers elsewhere.

1. Moet een foto op je CV in Nederland?
2. Wanneer kan ik beter geen foto gebruiken?
3. Mag een werkgever om een foto vragen?
4. Wat is een professionele CV-foto?
5. Hoe recent moet de foto zijn?
6. Is een foto verstandig voor een ATS-upload?
7. Is een foto gebruikelijk bij internationale werkgevers?

Answers must distinguish Dutch custom, employer instruction, anonymous recruitment and international expectations. Avoid claiming that a photo increases interview rates without defensible evidence.

## 4.9 Comparison Questions

Comparison content is already the strongest AI visibility signal. Expand quality, not page count.

Every comparison page should answer:

1. Wat is het belangrijkste verschil?
2. Wat kost de eerste bruikbare PDF?
3. Is er automatische verlenging?
4. Kan ik voor betaling het volledige resultaat bekijken?
5. Kan ik later bewerken en opnieuw downloaden?
6. Welke tool heeft het sterkste template- en ontwerpaanbod?
7. Welke tool past bij een eenmalige sollicitatieronde?
8. Welke tool past bij doorlopend loopbaanbeheer?
9. Hoe zijn prijs en functies gecontroleerd?
10. Wanneer is neither tool the best choice?

Required methodology:

- check official pricing, terms and help pages;
- display a `Last checked` date;
- link to primary sources;
- separate verified facts from WerkCV's assessment;
- never call WerkCV "most popular";
- state commercial interest clearly.

## 4.10 English Netherlands Pages

Do not translate every Dutch FAQ. Own international questions separately.

### `/en`

1. Can I build an English CV for jobs in the Netherlands?
2. Do I need to speak Dutch to use WerkCV?
3. Is WerkCV free?
4. Is the EUR 4.99 payment a subscription?
5. Can I upload my existing resume?

### `/en/expat-cv-netherlands`

1. Should my Netherlands CV be in English or Dutch?
2. What personal details belong on a Dutch CV?
3. Should I include nationality or work authorization?
4. Should I include a photo?
5. How do I explain foreign qualifications?
6. How do I state my Dutch language level honestly?
7. How long should an expat CV be?

### `/en/templates`

1. Which CV template is safest for Dutch employers?
2. Should I use a one-column template?
3. Can a Netherlands CV use colour?
4. Can I switch templates without losing content?
5. Which template is best for an English-speaking role?

### `/en/ats-resume-netherlands`

1. Do Dutch employers use ATS software?
2. Should ATS keywords be English or Dutch?
3. Is PDF safe for Dutch application portals?
4. Should I include work authorization in my CV?
5. Can an ATS reject a two-column resume?
6. How can I test text extraction?

## 5. Answer Quality Standard

Every answer must pass these checks:

1. Direct answer appears in sentence one.
2. Answer is normally 45 to 110 words.
3. Important exception or limitation is included.
4. Product claims match current code, checkout and policies.
5. External claims use a primary or authoritative source.
6. No invented statistics.
7. No "guaranteed interview," "beats ATS," or "best" claim without evidence.
8. Dutch answers use natural Dutch, not translated English SEO phrasing.
9. English answers are specific to applying in the Netherlands.
10. One clear internal link follows the answer where deeper detail is useful.
11. A CTA is shown only when it is the natural next step.
12. The same question is not marked up as a full FAQ on several pages.

## 6. Source Policy

Preferred sources:

- official Dutch government and public employment guidance;
- WorkinNL;
- UWV;
- university career services;
- official employer or ATS documentation;
- official competitor pricing, terms and help pages;
- WerkCV's own tested product behavior.

Secondary sources:

- named recruiters and certified career professionals;
- transparent original research with a published methodology;
- current user feedback when presented as qualitative evidence.

Do not cite:

- unattributed SEO statistics;
- circular claims from CV-builder affiliate sites;
- old statistics without a retrievable primary study;
- Reddit comments as factual proof. Reddit may reveal questions, not establish the answer.

## 7. Structured Data and Technical Plan

### FAQ schema

- Keep `FAQPage` only where all questions and answers are visible on the page.
- Generate JSON-LD from the same data rendered in HTML.
- Do not expect a Google FAQ rich result for a commercial CV site.
- Do not add FAQ schema to every page merely for AI visibility.

### Product and software facts

- Continue using shared constants for price and currency.
- Review `SoftwareApplication`, `Product`, `Organization`, `BreadcrumbList`, and article schema for factual consistency.
- Do not add aggregate ratings until a real public rating source exists.

### AI discovery endpoints

Update `lib/ai-discovery.ts` to:

- use a current reviewed date;
- provide Dutch and English product facts;
- include price, VAT treatment, no-subscription status and paid-PDF distinction;
- include canonical answer pages by topic;
- state limitations around ATS and career outcomes;
- remove generic descriptions that add no retrieval value.

Update `/ai/faq.json` to expose the canonical product-fact questions, not the entire editorial FAQ library.

Keep `/llms.txt` as a convenience for systems that may use it, but do not treat it as a Google ranking mechanism.

### Crawlability

- Verify production `robots.txt` for each named search crawler.
- Keep private editor, login, checkout, account and API paths blocked.
- Confirm canonical URLs, hreflang and sitemap inclusion for every answer owner.

## 8. Internal Linking Plan

Each canonical page should receive contextual links with natural anchor variation:

- `/cv-maken` from homepage, examples, profile text, skills and work-experience guides;
- `/cv-maken-zonder-abonnement` from pricing, cancellation pages and comparison pages;
- `/templates` from examples and template-choice guidance;
- `/cv-tips/ats-vriendelijk-cv` from templates, optimizer, checker and role examples;
- `/cv-tips/foto-op-je-cv` from templates and personal-details guidance;
- English pages only from relevant English routes.

Avoid sitewide exact-match footer links for every target. A contextual sentence from a closely related page is stronger and clearer.

## 9. Presentation Plan

Use three distinct components:

### DirectAnswer

Purpose: a concise answer capsule near the relevant section.

Contains:

- question as H2/H3;
- 45 to 90 word answer;
- optional source link;
- optional next-step link.

### TopicFaq

Purpose: four to eight supporting questions near the end of a deep guide.

Contains:

- accessible native `details` elements;
- visible answers in HTML;
- optional FAQ JSON-LD from the same data.

### ProductHelpGroup

Purpose: grouped operational help on `/faq`.

Contains:

- category navigation;
- search/filter only if it remains indexable without JavaScript;
- contact route after unanswered questions;
- no sales CTA inside troubleshooting answers.

## 10. Measurement

### Prompt benchmark

Track at least 30 stable prompts:

- 12 Dutch informational questions;
- 8 Dutch product/comparison questions;
- 6 English Netherlands questions;
- 4 branded trust questions.

For each prompt and engine, record:

- whether WerkCV is mentioned;
- whether WerkCV is directly recommended;
- whether a WerkCV URL is cited;
- which URL is cited;
- citation position;
- whether product facts are accurate;
- whether a competitor is recommended instead;
- date, locale and signed-in state where reproducible.

Run three repetitions per engine because generative answers vary.

### Commercial analytics

Continue tracking:

- AI referrer;
- landing page;
- locale and device;
- CTA click;
- login verification;
- editor start;
- ready CV;
- full preview;
- PDF click;
- checkout;
- paid revenue.

AI visibility without editor starts or revenue is not the primary success metric.

### Content metrics

Measure by canonical answer page:

- Search Console impressions and clicks;
- queries containing question modifiers;
- AI referral sessions;
- editor starts;
- ready CV rate;
- paid revenue;
- assisted conversions.

## 11. Rollout Order

### Phase 1: Truth and commercial clarity

1. Rewrite `/faq` product facts.
2. Rewrite `/prijzen` FAQs and remove unavailable/test-product wording.
3. Strengthen `/cv-maken-zonder-abonnement`.
4. Synchronize shared price, VAT, payment and re-download facts.
5. Update AI discovery endpoints.

Reason: these pages answer the questions closest to purchase and trust.

### Phase 2: Dutch decision guidance

1. Add template FAQ beneath `/templates`.
2. Rewrite ATS FAQs and remove unsupported statistics.
3. Refine `/cv-maken` answers around actual Search Console questions.
4. Consolidate photo guidance into its canonical page.

Reason: these questions drive both discovery and editor entry.

### Phase 3: English Netherlands answers

1. Add concise product answers to `/en`.
2. Add expat decision questions.
3. Add English template questions.
4. Refine English ATS answers.
5. Mirror only verified product facts, not all Dutch content.

### Phase 4: Authority and evaluation

1. Add visible author/reviewer and last-reviewed information to priority guides.
2. Add source lists using primary sources.
3. Publish comparison methodology.
4. Run the 30-prompt benchmark.
5. Review Search Console and paid conversion after four to six weeks.

## 12. Acceptance Checklist

### Content

- Every planned question has exactly one canonical owner.
- Answers are visible without requiring a crawler-specific endpoint.
- No misleading use of "free."
- No unsupported "most popular," ATS percentage, or guarantee.
- Pricing, VAT, subscription and re-download language are consistent.
- Dutch and English answers reflect their actual audiences.

### Technical

- JSON-LD matches visible text.
- All canonical pages are indexable and in the sitemap.
- Private customer routes remain blocked.
- AI discovery endpoints contain current facts and dates.
- No duplicate canonical or hreflang regressions.
- Build and lint pass.

### UX

- FAQs do not displace the primary editor CTA.
- Template FAQs appear below the gallery.
- Troubleshooting answers do not become sales pitches.
- Every commercial answer has one relevant next step.
- Mobile accordions are readable and keyboard accessible.

### Measurement

- AI referral attribution is retained.
- CTA sources identify the answer page and question group.
- Prompt benchmark has a baseline before rollout.
- Results are evaluated by cited visibility, editor starts and paid revenue, not mentions alone.

## 13. Recommended First Implementation Slice

The first slice should cover only:

1. `/faq`
2. `/prijzen`
3. `/cv-maken-zonder-abonnement`
4. `lib/ai-discovery.ts` and the AI JSON endpoints

This slice fixes product truth, trust, pricing and machine-readable consistency without changing broad editorial content. After review and deployment, proceed to templates and ATS guidance.
