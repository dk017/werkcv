import { FEATURED_TESTIMONIAL, type Testimonial } from "@/lib/testimonials";

type CustomerQuoteProps = {
  locale: "nl" | "en";
  testimonial?: Testimonial;
  /** "card" for page sections, "compact" for tight spots such as the editor's download panel. */
  variant?: "card" | "compact";
  className?: string;
};

/** A real customer quote. Dutch pages show the translation and say so; English pages show the original. */
export default function CustomerQuote({
  locale,
  testimonial = FEATURED_TESTIMONIAL,
  variant = "card",
  className = "",
}: CustomerQuoteProps) {
  const translated = locale === "nl" && testimonial.quoteLanguage !== "nl";
  const text = translated ? testimonial.quoteNl : testimonial.quote;
  const place = locale === "nl" ? testimonial.placeNl : testimonial.placeEn;
  const compact = variant === "compact";

  return (
    <figure
      className={`${compact ? "rounded-lg border border-slate-200 bg-slate-50 p-3" : "wk-card p-6 md:p-8"} ${className}`}
      lang={translated ? "nl" : testimonial.quoteLanguage}
    >
      <blockquote className={compact ? "text-xs leading-relaxed text-slate-700" : "text-lg md:text-xl leading-relaxed text-[var(--wk-ink)]"}>
        “{text}”
      </blockquote>
      <figcaption className={compact ? "mt-2 text-[11px] font-semibold text-slate-500" : "mt-4 text-sm font-semibold text-[var(--wk-ink-muted)]"}>
        {testimonial.name}, {place}
        {translated ? <span className="font-normal"> · vertaald uit het Engels</span> : null}
      </figcaption>
    </figure>
  );
}
