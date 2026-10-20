"use client";

import { useEffect } from "react";
import { PhotoTransformation } from "@/components/profile-photo/PhotoBeforeAfter";
import { track } from "@/lib/analytics";
import { profilePhotoExamples } from "@/lib/profile-photo-examples";
import { getProfilePhotoToolPath } from "@/lib/profile-photo-cv";
import { profilePhotoPrice } from "@/lib/site-content";

/**
 * AI profile photo offer after a CV purchase. 7 in 10 buyers put a photo on their CV (44 of 63
 * buyers, June–Sept 2026); the offer starts from that photo and puts the result back on this CV.
 */
export default function ProfilePhotoOffer({ cvId, language, cvPhoto, inApp = false }: { cvId: string; language: "nl" | "en"; cvPhoto: string | null; inApp?: boolean }) {
  const tr = (dutch: string, english: string) => (language === "en" ? english : dutch);
  const price = language === "en" ? profilePhotoPrice.displayEn : profilePhotoPrice.display;
  const context = { location: "success_page" as const, cvId, has_photo: Boolean(cvPhoto), uiLanguage: language };

  useEffect(() => {
    track("profile_photo_offer_viewed", { location: "success_page", cvId, has_photo: Boolean(cvPhoto), uiLanguage: language });
  }, [cvId, cvPhoto, language]);

  return (
    <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4 text-left">
      {/* Show the transformation (research 20 Oct 2026: every leading headshot service leads with selfie → result). */}
      {cvPhoto ? null : (
        <div className="mx-auto mb-4 max-w-[260px]">
          <PhotoTransformation example={profilePhotoExamples[0]} locale={language} size="md" />
          <p className="mt-2 text-center text-[10px] font-semibold text-gray-500">{tr("AI-voorbeeld met een fictieve testpersoon", "AI example with a fictional test person")}</p>
        </div>
      )}
      <div className="flex items-start gap-4">
        {cvPhoto ? (
          <div className="flex shrink-0 items-center gap-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element -- data URL from the buyer's own CV */}
            <img src={cvPhoto} alt="" className="h-16 w-16 rounded-lg border border-teal-200 object-cover" />
            <span aria-hidden className="text-sm font-black text-gray-700">→</span>
            <div className="relative h-16 w-16 overflow-hidden rounded-lg border-2 border-dashed border-teal-500 bg-white">
              <span className="absolute inset-0 flex items-center justify-center p-1 text-center text-[10px] font-bold leading-tight text-teal-800">{tr("jouw profielfoto", "your profile photo")}</span>
            </div>
          </div>
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
                  `Je ziet eerst gratis 4 voorbeelden. Wil je ze gebruiken, dan betaal je eenmalig ${price} en zet je je favoriet met één klik in dit cv.`,
                  `You see 4 previews for free. To use them, you pay a one-time ${price} and put your favourite on this CV in one click.`,
                )
              : tr(
                  `7 op de 10 WerkCV-kopers zetten een foto op hun cv. Maak er een van een gewone foto of selfie: eerst gratis voorbeelden, daarna eenmalig ${price} als je ze wilt gebruiken.`,
                  `7 in 10 WerkCV buyers put a photo on their CV. Make one from a regular photo or selfie: free previews first, then a one-time ${price} if you want to use them.`,
                )}
          </p>
        </div>
      </div>
      <a
        href={getProfilePhotoToolPath(language, cvId, "success_page", inApp ? "app" : "public")}
        onClick={() => track("profile_photo_offer_clicked", context)}
        className="mt-4 block w-full rounded-full border border-teal-700 bg-white px-6 py-3 text-center text-sm font-bold text-teal-900 transition hover:bg-teal-100"
      >
        {cvPhoto ? tr("Bekijk gratis voorbeelden", "See free previews") : tr("Maak een AI-profielfoto", "Create an AI profile photo")}
      </a>
    </div>
  );
}
