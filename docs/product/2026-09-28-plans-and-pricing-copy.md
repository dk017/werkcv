# Plans and pricing copy: research and recommendation

Research date: 27–28 September 2026. Sources: competitor pricing pages (fetched 28 Sep), Trustpilot reviews of CV.nl, Gourville (1998), Dutch job-search duration studies, Domino's NL 2026 price list, WerkCV production data (read-only). Nothing here is live; the copy test below is built locally and not pushed.

## 1. What the market offers

| Provider | Plans | Renews? | Their words |
|---|---|---|---|
| **WerkCV (today)** | €4,99 per CV, unlimited edits and re-downloads of that CV | No | "Eenmalig €4,99, geen abonnement" |
| CVtogo | €7,95 per CV | No | "een vaste prijs per CV. Geen onverwachte kosten of verplichte abonnementen" |
| maakeencv | Free (1 PDF/month) · Pro €9,95/month · **Driemaandenpas €19,95** | Pro yes, pass no | Pass "stopt na drie maanden vanzelf" |
| CVster | €14,95 per 4 weeks (trial €2,95) · **6-month pass €44,95** | Monthly yes, pass no | "Annuleren is niet nodig" |
| Cultivaid | €14,99/month (trial €2,49) · **Lifetime €99** | Monthly yes | "Eerlijke prijzen voor iedereen" |
| CV.nl | 14 days €0,99, then **€19,99/month** | Yes | — |
| CVMaker | trial, then **€21,99/month** | Yes | — |
| Rezi (US) | Pro $29/month · Lifetime $149 | Pro yes | "All features, one payment." |

One-time passes (3 and 6 months) and lifetime deals already exist in the Dutch market; a 3-month pass at €19,95 is an existing, understood format.

## 2. What our buyers do (production)

- **63% of buyers (64 of 102) make one CV.** 37% make two or more, mostly within a few days (median gap between first and last CV 0–2,5 days; averages 7–41 days).
- **6 buyers paid twice**, with 0, 1, 3, 5, 31 and 53 days between payments. A 3-month pass would have covered all six; a 30-day pass four.
- Activity after paying (26 buyers with tracked edits/downloads): 38% after a day, 31% after a month, 12% after two months, **8% after three months**.
- Decision is fast: median 1,1 hours from sign-up to payment.
- **The price is not visible where people decide.** 211 checkout starts in 90 days (63 paid, 30%); almost all come from the editor's "PDF downloaden" button, which shows no price. People first see €4,99 on the Dodo checkout page.

## 3. Market facts that shape the plans

- A Dutch job search takes about 3–6 months on average; under-30s around 72 days, 50–55-year-olds around 147 days (Intelligence Group via managersonline.nl; wijzijntop.nl). → **3 months matches one job search.**
- Domino's NL 2026: Margherita from €10,99, medium from €12,49, Pepperoni €13,99 (topfoodlab.nl price list). Prices vary by location. → €4,99 = "less than half a pizza"; €9,95 = "less than one pizza"; **€19,95 ≈ two pizzas, not three** (three is €33–37).

## 4. What customers say (Trustpilot, CV.nl)

- Complaints (1★): hidden monthly charge after a cheap trial ("€1 betaald … vervolgens elke maand €20 afgeschreven"), small print ("kleine lettertjes"), cancelling impossible ("opzeggen is onmogelijk"), **no reminder before renewal ("geen reminder")**, charges continuing after cancelling. Repeated words: abonnement, opzeggen, afgeschreven, misleidend, kleine lettertjes, proefperiode.
- Praise (5★): makkelijk, mooi, overzichtelijk, handig, "baan gevonden".

## 5. What the evidence says about copy

1. **Concrete beats abstract (our own test).** Guide-page CTA test, Jun–Sep 2026: "Binnen 5 minuten een sterk CV" 21 clicks / 585 views (3,6%) vs "Solliciteren met meer vertrouwen" 3 / 563 (0,5%).
2. **Small everyday comparisons make small prices feel smaller** (Gourville 1998, "pennies-a-day"): the framing makes people compare with small daily expenses. For larger amounts an aggregate comparison works better → pizza for €4,99–€9,95, "one month of a subscription" for the pass.
3. **Use the customers' own words, answered:** geen abonnement, niets om op te zeggen, geen kleine lettertjes, stopt vanzelf, geen reminder nodig.
4. **Show the price where the decision happens** (next to the download button), not only on the payment page.
5. Only verifiable claims: competitor prices come from the dated, verified facts in `lib/commercial/consumer-cv-pricing.ts` and disappear automatically after 45 days; no "meest gekozen" badge until data shows it.

## 6. Plan options

| Option | Evidence for | Evidence against | Verdict |
|---|---|---|---|
| Per CV only (today) | Simple; fits the 63% who make one CV | Leaves the 37% who make several CVs underserved; 7% pay twice | Keep as the entry plan |
| **Per CV + 3-month pass** | 37% make several CVs; all repeat purchases within 53 days; job search 3–6 months; identical format sells at maakeencv (€19,95); answers "no renewal" complaints | Which share chooses it is unknown | **Recommended** |
| Per CV + 30-day pass | Cheaper entry | Misses 2 of 6 repeat purchases; shorter than a typical job search | No |
| 6-month pass | CVster sells it (€44,95) | 8% of our buyers are active after 3 months | No |
| Lifetime | Cultivaid €99, Rezi $149 | Gives away future purchases; open-ended AI cost; 8% active after 3 months | No |
| Monthly subscription | Industry standard | Contradicts our brand promise and the exact complaints above | No |
| Add-on: AI profile photo €9,99 | 70% of buyers use a photo; photo checkout converted 2 of 3 | Small sample | Add at checkout |

**Pass price:** €19,95 matches maakeencv's identical pass and is just under **one month of CV.nl (€19,99)**, the strongest accurate anchor we have. The "1 pizza / 3 pizzas" story needs a pass around €29,95–€34,95; at €19,95 the honest line is "two pizzas".

## 7. Recommended copy (Dutch)

**Plan 1 — Eén cv — €4,99**
- Anchor: *Minder dan een halve pizza.*
- Promise: *Eén keer betalen. Daarna pas je dit cv onbeperkt aan en download je het opnieuw.*
- Trust: *Geen abonnement. Niets om op te zeggen.*
- Button: *Download mijn cv – €4,99*

**Plan 2 — Sollicitatiepas, 3 maanden — €19,95**
- Anchor: *Drie maanden solliciteren voor minder dan één maand CV.nl.* (CV.nl €19,99/maand na de proefperiode, gecontroleerd op [datum]) — or: *Voor de prijs van twee pizza's.*
- Promise: *Zoveel cv's en versies als je wilt: per vacature, in het Nederlands en Engels, met sollicitatiebrieven en de cv-check.*
- Trust: *Stopt na 3 maanden vanzelf. Geen verlenging, geen reminder nodig.*
- After: *Daarna blijven je cv's zichtbaar en kun je de laatste versie van elk cv downloaden.*
- Button: *Start mijn sollicitatiepas – €19,95*
- Label (instead of "meest gekozen"): *Handig als je op meerdere vacatures reageert.*

**Add-on:** *+ AI-profielfoto voor €9,99. 7 op de 10 kopers zetten een foto op hun cv.*

**/prijzen headline:** *Eén cv of drie maanden solliciteren. Altijd één keer betalen.*

**Next to the download button (today's single price):**
- *€4,99 eenmalig · minder dan een halve pizza*
- *€4,99 eenmalig · CV.nl kost €19,99 per maand*

## 8. Test built locally (not pushed): `price_copy_v1`

- Arms: **control** (today: no price next to the download button), **pizza**, **competitor** (verified CV.nl price, generic fallback when stale).
- Surfaces: caption under the editor's download button (desktop), the copy line in the full preview, an extra lead line on `/prijzen`.
- Assignment: sticky per browser (`localStorage`), exposure event `price_copy_exposed`; the arm is attached to `checkout_paywall_reached`, `checkout_start`, `checkout_started` (also after login via the claim flow).
- **Primary metric: revenue per editor visitor who reaches the download step, and paid orders per checkout start**, by arm (join `checkout_started.cvId` → `Order.cvId`). Not clicks.
- Power: ~70 checkout starts a month; three arms give ~23 per arm per month. Only large differences (roughly 2×) show within 2–3 months. For a faster answer, run two arms (control vs one anchor).
- Code: `lib/pricing-copy-experiment.ts` (+ tests), `components/pricing/usePriceCopy.ts`, `components/pricing/PricingCopyLead.tsx`, `app/editor/editor.tsx`, `app/editor/FullCvPreviewDialog.tsx`, `app/editor/claim/PublicDraftClaimClient.tsx`, `app/prijzen/page.tsx`, `lib/analytics.ts`, `app/api/analytics/route.ts`.

## 9. Sources

- Gourville, J. T. (1998). Pennies-a-Day: The Effect of Temporal Reframing on Transaction Evaluation. *Journal of Consumer Research* 24(4), 395–408. https://academic.oup.com/jcr/article-abstract/24/4/395/1797969
- maakeencv.nl/prijzen · cvster.nl/pricing · cvtogo.nl/prijzen · cultivaid.ai/pricing · rezi.ai/pricing (all fetched 28 Sep 2026)
- Trustpilot CV.nl: https://nl.trustpilot.com/review/cv.nl
- Job-search duration: https://www.managersonline.nl/nieuws/13344/zoekduur-nieuwe-baan-is-gemiddeld-zes-maanden-.html · https://www.wijzijntop.nl/kennisbank/hoe-lang-duurt-het-gemiddeld-om-werk-te-vinden/
- Domino's NL 2026 price list: https://www.topfoodlab.nl/fastfood-prijzen/dominos-prijzen/
