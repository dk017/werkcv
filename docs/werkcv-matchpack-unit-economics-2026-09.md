# WerkCV MatchPack unit economics — September 2026

**Status:** financially uncertified — the application contract is recorded, but provider, hosting, tax and payment-settlement inputs still need an owner-confirmed production export.

**Prepared:** 3 September 2026 (Asia/Calcutta)

## Decision boundary

This is an internal cost worksheet, not a customer-facing savings claim. It answers whether the locked **EUR 99/month / 300 shared credits** contract has enough room for variable costs. No activation or price change follows from this document by itself.

## 1. Commercial facts verified in the repository

| Item | Value | Source |
| --- | --- | --- |
| Billing tier | `agency` | `lib/agency-plan.ts` |
| Contract version | `agency_99_300_2026_09` | `lib/agency-plan.ts` |
| Monthly price | EUR 99.00 / 9,900 cents | `lib/agency-plan.ts` |
| Shared allowance | 300 credits per billing period | `lib/agency-plan.ts` |
| Credit unit | One new standalone Agency CV **or** first definitive approval of one MatchPack | `getAgencyCreditExplanation()` |
| Repeat work | Analysis, drafts, edits and repeat exports of the same credited item do not consume another credit | `getAgencyCreditExplanation()` and Agency access tests |
| Full-use reference | EUR 0.33 per credit (EUR 99 ÷ 300) | `getAgencyFullUseUnitPriceDisplay()`; explicitly a full-use reference, not a per-use price |

The application currently exposes `gpt-4o` then `gpt-4o-mini` as the CV parser fallback chain (`lib/cv-parser.ts`), and `gpt-4o-mini` for vacancy matching and proposal claim verification (`lib/tools/cv-vacature-match.ts`, `lib/tools/proposal-claim-verifier.ts`). The parser fallback is a maximum of two parser calls when the first model fails; matching and claim verification are one call each when those features are enabled. The claim verifier is flag-off in the current release, so it is not part of the normal Agency cost case.

## 2. Input and processing ceilings

These are safety ceilings, not expected usage:

| Path | Current ceiling |
| --- | --- |
| Agency CV upload | 10 MiB; five PDF pages; 40,000 extracted CV characters (`lib/agency-matchpack.ts`) |
| Vacancy input | 18,000 characters |
| Consumer/public proposal verifier | 10 MiB; 18,000 extracted CV characters; 8,000 proposal characters |
| Agency CSV import | 2 MiB; 100 rows per request |
| Parser output | Structured CV schema; no token ceiling is hard-coded in the wrapper, so provider limits and observed usage must be captured from billing telemetry |
| Request timeout | Proposal verifier 45 seconds; other routes must be measured from production request logs without recording source text |

## 3. Provider evidence and unknowns

OpenAI's current official model page lists GPT-4o Mini at **$0.15 / 1M input tokens, $0.075 / 1M cached input tokens and $0.60 / 1M output tokens**, with 128k context and 16,384 maximum output tokens. The original official release also records the $0.15/$0.60 rates. OpenAI's current pricing page lists GPT-4o at **$2.50 / 1M input and $10.00 / 1M output** for the listed GPT-4o family. Record the exact model snapshot, token usage and invoice currency from the production account before using these rates in a margin decision; aliases and provider pricing can change.

- OpenAI model page: https://developers.openai.com/api/docs/models/gpt-4o-mini (accessed 2026-09-03).
- OpenAI pricing documentation: https://developers.openai.com/api/docs/pricing (accessed 2026-09-03).
- OpenAI GPT-4o mini release/pricing record: https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/ (accessed 2026-09-03).

Dodo's official documentation says it operates as a merchant-of-record option, shows a 4% platform-fee example in its MoR documentation, and describes adaptive-currency fees of 2–4% depending on order value when the fee is absorbed by the merchant. These pages are product documentation, not our executed contract. The owner must confirm the actual account rate, taxes, currency conversion, refunds, disputes and settlement before calling the model financially certified.

- Dodo MoR documentation: https://docs.dodopayments.com/features/mor-introduction (accessed 2026-09-03).
- Dodo adaptive-currency fees: https://docs.dodopayments.com/features/adaptive-currency (accessed 2026-09-03).
- Dodo tax-inclusive pricing: https://docs.dodopayments.com/features/tax-inclusive-pricing (accessed 2026-09-03).
- Dodo payment methods: https://docs.dodopayments.com/features/payment-methods (accessed 2026-09-03).

The following are **not known from the repository** and must not be guessed:

1. the exact Dodo platform, currency-conversion, refund and dispute rates for this account;
2. whether EUR 99 is tax-inclusive for every customer location and the agency's tax treatment;
3. OpenAI account discounts, committed-use terms, rate-limit overages and invoice exchange rate;
4. actual input/output token distributions per parser and matcher call;
5. retry frequency, timeout retries and the proportion of parser calls that fall back from GPT-4o;
6. Hetzner compute, database, backup, object-storage, bandwidth and monitoring allocation;
7. SMTP/email delivery, support and chargeback costs;
8. refunds, failed payments, VAT/GST registration, accounting and legal costs.

## 4. Reproducible calculations

Let:

```text
R = 99.00 EUR monthly price as charged
T = known tax portion (0 until confirmed; never silently assumed zero)
P = Dodo fees, conversion, refund and dispute costs
A = OpenAI input/output cost for the observed calls
I = infrastructure, email and support allocation
V = R - T - P - A - I   (contribution before fixed company costs)
```

The contract's full-use reference is **EUR 0.33 per consumed credit**. It must not be described as the amount charged for an individual CV, because the plan is a subscription and unused credits do not create a per-document refund or rollover.

| Consumed credits | Gross revenue allocated at the reference | Comment |
| ---: | ---: | --- |
| 75 (25%) | EUR 24.75 | Illustrative utilization only; subscription still charges EUR 99 |
| 150 (50%) | EUR 49.50 | Illustrative utilization only |
| 225 (75%) | EUR 74.25 | Illustrative utilization only |
| 300 (100%) | EUR 99.00 | Full-use reference; no variable cost included |

The same credit ceiling covers either 300 standalone Agency CVs or 300 first-approved MatchPacks. A mixed month is calculated by `standaloneCredits + firstApprovedMatchPackCredits`; editing and repeat exports are zero additional credits.

## 5. Token-cost worksheet (fill from billing export)

For each production call, export aggregate counts only (no CV/proposal content): model, input tokens, cached input tokens, output tokens, success/failure, retry number and route. Then calculate:

```text
openai_usd = input_tokens / 1_000_000 * input_rate
           + cached_input_tokens / 1_000_000 * cached_input_rate
           + output_tokens / 1_000_000 * output_rate
openai_eur = openai_usd * verified_invoice_usd_to_eur_rate
```

Use the actual model rates for the invoice period. The example below is deliberately a template, not a claim:

| Operation | Normal calls | Maximum configured calls | Model(s) | Input tokens p50 | Output tokens p50 | Cost per operation (EUR) |
| --- | ---: | ---: | --- | ---: | ---: | ---: |
| Agency CV parse | 1 | 2 (fallback) | `gpt-4o`, then `gpt-4o-mini` | **owner input** | **owner input** | **owner calculation** |
| Vacancy requirement analysis | 1 | 1 | `gpt-4o-mini` unless environment overrides | **owner input** | **owner input** | **owner calculation** |
| Proposal claim verification (flag-off currently) | 0 | 1 | `gpt-4o-mini` unless environment overrides | **owner input** | **owner input** | **owner calculation** |
| Dutch formatting (separate consumer/import paths) | 0 or 1 | 1 | `gpt-4o` | **owner input** | **owner input** | **owner calculation** |

Report p50, p95 and maximum observed values separately. A safe worst-case scenario uses the configured retry ceiling and maximum observed tokens, but it must not invent a token count.

## 6. Sensitivity cases

Complete these columns from the verified worksheet:

| Case | Credits consumed | AI calls per credit | Retry multiplier | Dodo/tax/infrastructure costs | Contribution before fixed costs |
| --- | ---: | ---: | ---: | ---: | ---: |
| 25% standalone | 75 | **owner input** | 1.0x | **owner input** | `99 - T - P - A - I` |
| 50% mixed | 150 | **owner input** | 1.0x | **owner input** | `99 - T - P - A - I` |
| 75% mixed | 225 | **owner input** | 1.0x | **owner input** | `99 - T - P - A - I` |
| 100% standalone | 300 | **owner input** | 1.0x | **owner input** | `99 - T - P - A - I` |
| 100% first-approved MatchPack | 300 | **owner input** | 1.0x | **owner input** | `99 - T - P - A - I` |
| 100% mixed, p95 tokens | 300 | **owner input** | **p95** | **owner input** | `99 - T - P - A - I` |
| 100% mixed, maximum retries | 300 | **owner input** | **verified ceiling** | **owner input** | `99 - T - P - A - I` |

Stop activation if the verified maximum variable cost is greater than EUR 99 per active subscription, or if a missing input could plausibly make that true. Do not reduce safety checks, evidence quality or export quality to force a positive result.

## 7. Certification decision

**Current decision: FINANCIALLY UNCERTIFIED.** The price and allowance are code-verified, and official public provider documentation is linked, but no production invoice/token/infrastructure export was available during this implementation. The following owner inputs are required:

- [ ] Dodo executed account fee schedule, settlement currency, tax treatment and refund/dispute policy.
- [ ] OpenAI invoice export plus model-level token aggregates for at least one representative period.
- [ ] p50/p95/max call counts and retry rates for Agency CV creation and MatchPack analysis.
- [ ] Monthly Hetzner/DB/backup/storage/bandwidth allocation attributable to Agency.
- [ ] SMTP, support, accounting and expected refund/chargeback allocation.
- [ ] Calculation reviewed by the owner; date, reviewer and source exports recorded.

Reclassify to **financially certified** only after every required input is dated, traceable and the maximum-variable-cost case remains below EUR 99 with a documented safety margin.

