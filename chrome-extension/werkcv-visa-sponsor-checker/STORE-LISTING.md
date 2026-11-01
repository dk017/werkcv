# Chrome Web Store listing: Netherlands Visa Sponsor Checker

No keyword or site lists anywhere in this copy: the UK extension's 0.2.0 was rejected as keyword spam for a list of
example terms. Name LinkedIn and Indeed once, inside a sentence.

## Name

- en: `Netherlands Visa Sponsor Checker – IND Recognised Sponsors` (58 characters)
- nl: `Erkend referent check – kennismigrant visum Nederland` (53 characters)

Both come from `_locales/*/messages.json` (`extName`). No "LinkedIn" in the name (trademark and impersonation rules).

## Summary (≤ 132 characters)

- en: See which Dutch employers are IND recognised sponsors for the highly skilled migrant (kennismigrant) visa, right on job ads. (124)
- nl: Zie direct op vacatures of een Nederlandse werkgever erkend referent is bij de IND voor het kennismigrantenvisum. (113)

## Description (en)

Looking for a job in the Netherlands that can sponsor your visa? This extension shows, next to each employer on LinkedIn and Indeed Netherlands job listings, whether the company is on the IND public register of recognised sponsors (erkende referenten). Only recognised sponsors can apply for a highly skilled migrant (kennismigrant) residence permit for you.

What you get:

• A badge next to every employer as you scroll: IND sponsor, possible sponsor (a related or similarly named company is registered), or not on the IND list under this name.
• Click a badge to see the registered legal names and KvK numbers, search the register or report a wrong match.
• On the open job: the advertised salary compared with the IND threshold you choose (30 or over, under 30, recent graduate, EU Blue Card).
• A note when the advert asks for Dutch, says Dutch is a plus, or is written in English with no Dutch requirement.
• An "only sponsors" filter that dims the other jobs.
• A search of the register by company name or KvK number, and "Check this page" for other job sites.

Private by design: there is no account and no sign-in. Matching runs in your browser against a copy of the register that is updated daily. The jobs and employers you view are not sent anywhere.

Good to know: the register lists legal names, which can differ from the brand on an advert, and recognition applies per legal entity. Always check that the company named in your contract is on the register. The IND decides on every application.

Made by WerkCV, which builds Dutch-format CVs in English.

## Description (nl)

Zoek je een baan in Nederland waarvoor je een visum nodig hebt? Deze extensie laat bij vacatures op LinkedIn en Indeed Nederland naast elke werkgever zien of het bedrijf in het openbare IND-register van erkende referenten staat. Alleen een erkend referent kan een verblijfsvergunning als kennismigrant voor je aanvragen.

Wat je krijgt:

• Een label bij elke werkgever terwijl je scrolt: erkend referent, mogelijk referent (een verwant of vergelijkbaar bedrijf staat erin) of niet onder deze naam in de IND-lijst.
• Klik op een label voor de juridische namen en KvK-nummers, om in het register te zoeken of een foute match te melden.
• Bij de geopende vacature: het geadverteerde salaris naast de IND-grens die je kiest (30 jaar of ouder, jonger dan 30, afgestudeerd, Europese blauwe kaart).
• Een melding als de vacature Nederlands vraagt, Nederlands een pré noemt, of in het Engels is zonder eis voor Nederlands.
• Een filter "alleen referenten" dat de andere vacatures dimt.
• Zoeken in het register op bedrijfsnaam of KvK-nummer, en "Controleer deze pagina" voor andere vacaturesites.

Privacy: geen account en niet inloggen. De controle draait in je browser met een kopie van het register die dagelijks wordt bijgewerkt. De vacatures en werkgevers die je bekijkt, worden nergens heen gestuurd.

Goed om te weten: het register noemt juridische namen, die kunnen afwijken van de merknaam in een vacature, en erkenning geldt per rechtspersoon. Controleer altijd of het bedrijf in je contract in het register staat. De IND beslist over elke aanvraag.

Gemaakt door WerkCV, dat cv's in Nederlandse opmaak maakt, ook in het Engels.

## Category

Productivity → Tools (check what KMatch uses when submitting).

## Single purpose

Show whether a job in the Netherlands is open to international applicants: the employer's IND recognised-sponsor status, the salary threshold and the Dutch-language requirement.

## Permission justifications

- `storage`: keeps the user's settings and the local copy of the IND register.
- `alarms`: refreshes the register data file from werkcv.nl once a day.
- Host access to `www.linkedin.com`, `nl.linkedin.com` and `nl.indeed.com` (content scripts): shows the sponsor badges and the job card while the user browses job listings. The script does nothing outside job pages.
- `activeTab`: lets the user check the job posting on another site, only when they click "Check this page".
- `scripting`: injects the one-off reader for that page's JobPosting data after that click.
- Remote code: none. The daily download is a JSON data file (register entries, aliases, thresholds, CSS selector strings).

## Data usage (privacy form)

- Collects: nothing about the user. No personally identifiable information, no browsing history, no website content is transmitted.
- The only request out besides the data file: a count-only `layout_miss` event (event name, site, extension version), at most once a day per site, when a job site's layout stops yielding employers.
- Privacy policy URL: `https://werkcv.nl/en/chrome/visa-sponsor-checker/privacy`
- Support / homepage URL: `https://werkcv.nl/en/chrome/visa-sponsor-checker`

## Screenshots (1280×800) and tile (440×280)

To make after the manual pass, in the owner's Chrome:

1. Badges on a LinkedIn results page.
2. The job card with sponsor status, salary and Dutch requirement.
3. The "possible sponsor" popover with legal names and KvK numbers.
4. The popup: register search by name or KvK number.
5. The popup's privacy line and settings: no account, nothing sent.
