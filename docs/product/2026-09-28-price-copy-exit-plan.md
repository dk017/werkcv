# Plan: higher price, price shown before paying, exit question (local first)

Date: 28 September 2026. Branch: `price-copy-test` (local, not pushed). Evidence: `2026-09-28-plans-and-pricing-copy.md` and the abandonment analysis below.

## Why

- 211 checkout starts in 90 days, 63 paid (30%). Netherlands 40/77 (52%), elsewhere 7/34 (21%), India 0/13.
- Of 98 abandoned checkouts: 60 closed the payment page, **28 came back within 30 seconds** (22 English UI). A 30-second return is a reaction to what the page showed, not a failed payment.
- The price is not visible before the click: "PDF downloaden" goes straight to Dodo, where €4,99 appears for the first time. Unexpected cost is the #1 abandonment reason (Baymard: 48%).
- Dutch buyers did not react to a 17% price change (73% at €6,04 vs 68% at €4,99).
- Belgian buyers never see Bancontact: Dodo shows it only with EUR billing and a Belgian billing country; we set that only for NL.

## What changes (in order)

| # | Change | Where | Test locally | Deploy step |
|---|---|---|---|---|
| 1 | **Price €4,99 → €7,95** (one CV, unlimited edits and re-downloads of that CV). One source of truth; remove all hardcoded "4,99/4.99/499" | `lib/site-content.ts` + ~55 files, `lib/commercial/consumer-cv-pricing.ts` (WerkCV row), `llms.txt`, AI discovery, JSON-LD, OG image | Unit test fails on any leftover hardcoded old price; build | **You change the Dodo product price to €7,95 first**, then deploy |
| 2 | **Price on the download button** for every CV that still needs paying: "PDF downloaden · €7,95". Paid CVs show "PDF downloaden" and "Al inbegrepen · je betaalt niet opnieuw" (paid state from `lib/cv-download-access.ts`, the same check the PDF route enforces) | `app/editor/editor.tsx`, full preview | Visual check in editor | – |
| 3 | **Copy test `price_copy_v2`**: arms `plain` (price only), `pizza` ("minder dan een pizza"), `competitor` ("CV.nl kost €19,99 per maand"; verified, auto-expires) | `lib/pricing-copy-experiment.ts`, editor caption, preview line, `/prijzen` lead | Unit tests per arm and locale; visual check | Arm stored on checkout events |
| 4 | **Exit question** when someone returns from the payment page without paying: "Wat hield je tegen?" 6 options + optional short text | cancel URL marker `&checkout=cancelled` in `lib/dodo.ts`; pending-checkout note in local storage for the browser back button; `lib/checkout-exit.ts`; `components/checkout/CheckoutExitQuestion.tsx`; editor | Simulate return (`?id=…&checkout=cancelled`, or a pending note); unit tests | Events persisted and allowlisted server-side: `checkout_exit_prompt_shown`, `checkout_exit_reason` |
| 5 | **Bancontact / Multibanco / EPS** for BE, PT, AT (EUR + matching billing country) behind `DODO_EU_LOCAL_METHODS`, off by default | `lib/dodo.ts` | Unit test of the request body | After deploy: create one BE checkout session on the server, confirm Dodo accepts it, then switch the flag on |

## Price choice: €7,95

- Market: CVtogo sells exactly this (one CV, one-time) at €7,95; maakeencv charges €4,95 per extra PDF; subscriptions cost €14,95–21,99 per month.
- Our data: no measurable drop between €4,99 and €6,04 for Dutch buyers. €7,95 is a moderate step outside the tested range; €9,95 would double the price without evidence.
- ",95" ending (Dutch convention; 9-endings raise demand in field experiments, Anderson & Simester 2003).
- Break-even: revenue only falls if conversion drops by more than 37%.
- Anchors stay true: less than one pizza (Domino's Margherita from €10,99); far below one month of CV.nl (€19,99).

## Exit question design

- Trigger: the user returns to the editor from Dodo without paying. Two signals: Dodo's own back button (cancel URL with `checkout=cancelled`), and the browser back button (the editor stores a pending-checkout note just before leaving for Dodo; the question also runs when the page is restored from the back/forward cache). The note counts for 6 hours and is cleared once the success page confirms payment. Once per CV per 24 hours. Inline card at the top of the form, dismissible, never blocks editing. Not shown for paid CVs or agency workspaces.
- Question: **"Wat hield je tegen?"** Options (Baymard categories plus our own hypotheses):
  1. Duurder dan ik verwachtte
  2. Ik dacht dat downloaden gratis was
  3. Mijn betaalmethode stond er niet bij
  4. Ik twijfelde over de betaalpagina
  5. Mijn cv is nog niet klaar
  6. Iets anders (optional text, 200 characters, "geen persoonsgegevens")
- "Mijn betaalmethode stond er niet bij" also asks which method (optional text); this decides whether Bancontact/EPS/Multibanco or others are worth switching on.
- Free text: e-mail addresses, phone numbers and links are replaced by `[verwijderd]` in the browser and again on the server; only reason, detail, trigger, seconds since checkout, price and copy arm are stored.
- After answering: a short, honest reply per reason (what you get for the price, payment methods, that the CV stays saved) and the download button with the price.
- Benchmarks: single-question exit surveys get roughly 10–40% response.

## How we judge it after deploy

- Baseline (last 90 days): 30% start → paid overall; 52% NL; revenue per checkout start ≈ €1,49.
- After ~60 checkout starts at €7,95: revenue per checkout start and NL start → paid. Revert the price if revenue per start is below €1,49.
- Exit reasons: after 2–3 weeks, the top reason decides the next change.
- Copy arms: compare revenue per checkout start per arm; expect 2–3 months for large differences.

## Rollback

- Price: set the Dodo product back to €4,99 and revert the price constant.
- Copy test and exit question: remove the components; no data migration involved.
- Bancontact: flag off.
