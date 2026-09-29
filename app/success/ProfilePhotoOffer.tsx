"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { getProfilePhotoToolPath } from "@/lib/profile-photo-cv";
import { profilePhotoPrice } from "@/lib/site-content";

/**
 * AI profile photo offer after a CV purchase. 7 in 10 buyers put a photo on their CV (44 of 63
 * buyers, June–Sept 2026); the offer starts from that photo and puts the result back on this CV.
 */
export default function ProfilePhotoOffer({ cvId, language, cvPhoto }: { cvId: string; language: "nl" | "en"; cvPhoto: string | null }) {
  const tr = (dutch: string, english: string) => (language === "en" ? english : dutch);
  const price = language === "en" ? profilePhotoPrice.displayEn : profilePhotoPrice.display;
  const context = { location: "success_page" as const, cvId, has_photo: Boolean(cvPhoto), uiLanguage: language };

  useEffect(() => {
    track("profile_photo_offer_viewed", { location: "success_page", cvId, has_photo: Boolean(cvPhoto), uiLanguage: language });
  }, [cvId, cvPhoto, language]);

  return (
    <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4 text-left">
      <div className="flex items-start gap-4">
        {cvPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element -- data URL from the buyer's own CV
          <img src={cvPhoto} alt="" className="h-16 w-16 shrink-0 rounded-lg border border-teal-200 object-cover" />
        ) : null}
        <div className="min-w-0">
          <h2 className="text-base font-bold text-gray-900">
            {cvPhoto
              ? tr("Maak van je cv-foto een zakelijke profielfoto", "Turn your CV photo into a professional headshot")
              : tr("Nog een foto voor je cv en LinkedIn?", "Need a photo for your CV and LinkedIn?")}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">
            {cvPhoto
              ? tr(
                  `Je ziet eerst gratis 4 voorbeelden. Gebruik je er een, dan betaal je ${price} en staat hij direct in dit cv.`,
                  `You see 4 previews for free. If you use one, you pay ${price} and it goes straight onto this CV.`,
                )
              : tr(
                  `7 op de 10 WerkCV-kopers zetten een foto op hun cv. Maak er een van een gewone foto of selfie: eerst gratis voorbeelden, ${price} als je hem gebruikt.`,
                  `7 in 10 WerkCV buyers put a photo on their CV. Make one from a regular photo or selfie: free previews first, ${price} if you use it.`,
                )}
          </p>
        </div>
      </div>
      <a
        href={getProfilePhotoToolPath(language, cvId, "success_page")}
        onClick={() => track("profile_photo_offer_clicked", context)}
        className="mt-4 block w-full rounded-full border border-teal-700 bg-white px-6 py-3 text-center text-sm font-bold text-teal-900 transition hover:bg-teal-100"
      >
        {cvPhoto ? tr("Bekijk gratis voorbeelden", "See free previews") : tr("Maak een AI-profielfoto", "Create an AI profile photo")}
      </a>
    </div>
  );
}
