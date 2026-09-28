"use client";

import { usePriceCopy } from "@/components/pricing/usePriceCopy";

/** price_copy_v2 on /prijzen: an extra lead line for the anchor arms; plain renders nothing. */
export default function PricingCopyLead({ locale = "nl" }: { locale?: "nl" | "en" }) {
  const { variant, copy } = usePriceCopy(locale, "pricing_page");
  if (!variant || !copy.pricingLead) return null;
  return (
    <p
      className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-7 text-[var(--wk-ink)] md:text-xl"
      data-price-copy={variant}
    >
      {copy.pricingLead}
    </p>
  );
}
