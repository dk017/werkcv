import Link from "next/link";
import { PhotoTransformation } from "@/components/profile-photo/PhotoBeforeAfter";
import { profilePhotoExampleLabel, profilePhotoExamples } from "@/lib/profile-photo-examples";
import { profilePhotoPrice } from "@/lib/site-content";

type Locale = "nl" | "en";

/**
 * Photo-tool card for content pages (CV photo guides, LinkedIn guide): the selfie → result example, the
 * free-preview promise and one button. `source` is kept as ?bron= so tool visits can be attributed.
 */
export default function ProfilePhotoPromoCard({ locale, source, exampleId = "sanne", compact = false }: { locale: Locale; source: string; exampleId?: string; compact?: boolean }) {
  const example = profilePhotoExamples.find((e) => e.id === exampleId) ?? profilePhotoExamples[0];
  const nl = locale === "nl";
  const price = nl ? profilePhotoPrice.display : profilePhotoPrice.displayEn;
  const href = `${nl ? "/profielfoto-cv-maken" : "/en/profile-photo"}?bron=${encodeURIComponent(source)}`;

  if (compact) {
    return (
      <aside className="my-8 flex flex-col gap-4 rounded-2xl border-2 border-black bg-[#E9FFFC] p-4 sm:flex-row sm:items-center">
        <div className="w-full max-w-[220px] shrink-0">
          <PhotoTransformation example={example} locale={locale} size="md" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-black text-slate-950">{nl ? "Nog geen nette foto?" : "No good photo yet?"}</p>
          <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
            {nl
              ? `Maak er een van een gewone selfie. Eerst gratis 4 voorbeelden, pas betalen als je er een gebruikt (${price}).`
              : `Make one from a regular selfie. 4 free previews first, pay only if you use one (${price}).`}
          </p>
          <Link href={href} className="mt-3 inline-flex border-2 border-black bg-white px-4 py-2 text-sm font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            {nl ? "Bekijk gratis voorbeelden" : "See free previews"}
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <aside className="my-10 overflow-hidden rounded-3xl border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div className="mx-auto w-full max-w-[340px]">
          <PhotoTransformation example={example} locale={locale} size="lg" />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">{nl ? "AI-profielfoto voor cv en LinkedIn" : "AI profile photo for CV and LinkedIn"}</p>
          <h3 className="mt-2 text-2xl font-black leading-tight text-slate-950">
            {nl ? "Geen nette foto? Maak er een van je selfie" : "No good photo? Make one from your selfie"}
          </h3>
          <ul className="mt-4 space-y-2 text-sm font-bold text-slate-800">
            {(nl
              ? ["Eerst gratis 4 voorbeelden bekijken", `Pas betalen als je er een gebruikt: eenmalig ${price}`, "Geen fotoshoot, geen abonnement"]
              : ["See 4 previews for free first", `Pay only if you use one: ${price} once`, "No photo shoot, no subscription"]
            ).map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4ECDC4] text-xs font-black text-black">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link href={href} className="mt-5 inline-flex border-4 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {nl ? "Maak gratis mijn voorbeelden" : "Create my free previews"}
          </Link>
          <p className="mt-3 text-[11px] font-semibold leading-relaxed text-slate-500">{profilePhotoExampleLabel[locale]}</p>
        </div>
      </div>
    </aside>
  );
}
