import { AGENCY_CURRENCY, AGENCY_MONTHLY_PRICE_CENTS } from "@/lib/agency-plan";

function record(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

/** Read-only release check. Metadata never determines the provider's charge. */
export function inspectAgencyCheckoutProduct(input: unknown) {
  const product = record(input);
  const price = record(product.price);
  const failures: string[] = [];
  if (product.is_recurring !== true || price.type !== "recurring_price") failures.push("Product must be recurring, not one-time or usage-based.");
  if (price.price !== AGENCY_MONTHLY_PRICE_CENTS) failures.push("Provider price does not match the advertised EUR 99.");
  if (price.currency !== AGENCY_CURRENCY) failures.push("Provider currency must be EUR.");
  if (price.payment_frequency_interval !== "Month" || price.payment_frequency_count !== 1) failures.push("Provider billing interval must be one month.");
  if (price.trial_period_days != null && price.trial_period_days !== 0) failures.push("Trial configuration requires review; the page does not advertise a trial.");
  if (price.discount != null && price.discount !== 0) failures.push("Product-level discount requires review.");
  if (price.purchasing_power_parity !== false) failures.push("Purchasing-power pricing must be explicitly disabled for the fixed EUR offer.");
  if (product.pricing_mode != null) failures.push("Localized pricing requires a separate checkout-total check.");
  if (typeof price.tax_inclusive !== "boolean") failures.push("Tax inclusion is unknown; verify it before release.");
  return {
    passed: failures.length === 0,
    failures,
    // Deliberate allowlist: never output the product payload, customer data or credentials.
    priceCents: typeof price.price === "number" ? price.price : null,
    currency: typeof price.currency === "string" ? price.currency : null,
    taxInclusive: typeof price.tax_inclusive === "boolean" ? price.tax_inclusive : null,
  };
}
