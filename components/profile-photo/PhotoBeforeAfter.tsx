import Image from "next/image";
import type { ProfilePhotoExample } from "@/lib/profile-photo-examples";

type Locale = "nl" | "en";

/**
 * Selfie → result, the way the leading headshot services show it: the result large, the original selfie as a
 * small inset (results grid), or side by side with an arrow (hero and compact cards).
 */
export function PhotoInsetCard({ example, locale, priority = false }: { example: ProfilePhotoExample; locale: Locale; priority?: boolean }) {
  return (
    <figure className="group relative overflow-hidden rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="relative aspect-square">
        <Image
          src={example.result}
          alt={locale === "nl" ? `AI-profielfoto, stijl ${example.style.nl}` : `AI profile photo, ${example.style.en} style`}
          fill
          sizes="(min-width: 1024px) 260px, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
          priority={priority}
        />
        <div className="absolute bottom-2 left-2 w-[34%] overflow-hidden rounded-xl border-2 border-white shadow-lg">
          <div className="relative aspect-square">
            <Image src={example.selfie} alt={locale === "nl" ? "Oorspronkelijke selfie" : "Original selfie"} fill sizes="90px" className="object-cover" />
          </div>
          <span className="absolute inset-x-0 bottom-0 bg-black/70 px-1 py-0.5 text-center text-[10px] font-bold text-white">
            {locale === "nl" ? "Selfie" : "Selfie"}
          </span>
        </div>
      </div>
      <figcaption className="flex items-center justify-between gap-2 border-t-2 border-black px-3 py-2">
        <span className="text-xs font-black text-slate-900">{example.style[locale]}</span>
        <span className="text-[11px] font-semibold text-slate-500">{example.selfieNote[locale]}</span>
      </figcaption>
    </figure>
  );
}

/** Selfie → arrow → result, side by side. `size` sm for cards and the editor, lg for the hero. */
export function PhotoTransformation({ example, locale, size = "lg", priority = false }: { example: ProfilePhotoExample; locale: Locale; size?: "sm" | "md" | "lg"; priority?: boolean }) {
  const dims = size === "lg" ? { selfie: "w-[38%]", result: "w-[54%]", label: "text-xs" } : size === "md" ? { selfie: "w-[40%]", result: "w-[52%]", label: "text-[11px]" } : { selfie: "w-12", result: "w-16", label: "hidden" };
  return (
    <div className="flex items-center justify-between gap-2">
      <div className={`${dims.selfie} shrink-0`}>
        <div className={`relative aspect-square overflow-hidden border-2 border-black bg-slate-100 ${size === "sm" ? "rounded-lg" : "rotate-[-3deg] rounded-2xl"}`}>
          <Image src={example.selfie} alt={locale === "nl" ? "Gewone selfie" : "Regular selfie"} fill sizes={size === "sm" ? "48px" : "220px"} className="object-cover" priority={priority} />
        </div>
        <p className={`mt-2 text-center font-black uppercase tracking-[0.14em] text-slate-500 ${dims.label}`}>{locale === "nl" ? "Je selfie" : "Your selfie"}</p>
      </div>
      <span aria-hidden className={`shrink-0 font-black text-slate-900 ${size === "sm" ? "text-base" : "text-3xl"}`}>→</span>
      <div className={`${dims.result} shrink-0`}>
        <div className={`relative aspect-square overflow-hidden border-black bg-white ${size === "sm" ? "rounded-lg border-2" : "rounded-2xl border-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"}`}>
          <Image
            src={example.result}
            alt={locale === "nl" ? `AI-profielfoto, stijl ${example.style.nl}` : `AI profile photo, ${example.style.en} style`}
            fill
            sizes={size === "sm" ? "64px" : "320px"}
            className="object-cover"
            priority={priority}
          />
        </div>
        <p className={`mt-2 text-center font-black uppercase tracking-[0.14em] text-slate-900 ${dims.label}`}>{locale === "nl" ? "Profielfoto" : "Profile photo"}</p>
      </div>
    </div>
  );
}
