"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { profilePhotoPrice } from "@/lib/site-content";

type Locale = "nl" | "en";
type Status = "pass" | "warn" | "fail";
type Item = { id: string; status: Status; tip: string; weight: number };
type Result = { score: number; band: "excellent" | "good" | "improve" | "weak"; items: Item[]; topFixes: Item[]; isPersonPhoto: boolean };

const LABELS: Record<string, { nl: string; en: string }> = {
  face: { nl: "Gezicht goed zichtbaar", en: "Face clearly visible" },
  framing: { nl: "Uitsnede (hoofd en schouders)", en: "Framing (head and shoulders)" },
  eyes: { nl: "Kijkt in de camera", en: "Looking at the camera" },
  expression: { nl: "Vriendelijke uitstraling", en: "Friendly expression" },
  light: { nl: "Licht op je gezicht", en: "Light on your face" },
  sharpness: { nl: "Scherpte", en: "Sharpness" },
  background: { nl: "Rustige achtergrond", en: "Calm background" },
  clothing: { nl: "Passende kleding", en: "Suitable clothing" },
  resolution: { nl: "Resolutie", en: "Resolution" },
};
const BAND: Record<Result["band"], { nl: string; en: string; color: string }> = {
  excellent: { nl: "Uitstekend", en: "Excellent", color: "#0f8f86" },
  good: { nl: "Goed", en: "Good", color: "#3b82f6" },
  improve: { nl: "Kan beter", en: "Could be better", color: "#d97706" },
  weak: { nl: "Zwak", en: "Weak", color: "#dc2626" },
};
const ICON: Record<Status, string> = { pass: "✓", warn: "!", fail: "✕" };
const ICON_BG: Record<Status, string> = { pass: "bg-[#4ECDC4] text-black", warn: "bg-[#FFD166] text-black", fail: "bg-[#FF6B6B] text-white" };

/** Free LinkedIn photo check: upload, LinkedIn circle preview, score with tips, then the AI photo offer. */
export default function LinkedInPhotoCheck({ locale, source }: { locale: Locale; source: string }) {
  const nl = locale === "nl";
  const t = (dutch: string, english: string) => (nl ? dutch : english);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pagePath = typeof window === "undefined" ? "" : window.location.pathname;

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const pick = (f: File | undefined) => {
    if (!f) return;
    setResult(null);
    setError(null);
    if (!/^image\/(jpeg|png|webp)$/.test(f.type)) { setError(t("Gebruik een JPG, PNG of WebP-foto.", "Use a JPG, PNG or WebP photo.")); return; }
    if (f.size > 8 * 1024 * 1024) { setError(t("Je foto is groter dan 8 MB.", "Your photo is larger than 8 MB.")); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const run = async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    track("linkedin_photo_check_started", { page_path: pagePath, locale });
    try {
      const body = new FormData();
      body.append("photo", file);
      body.append("locale", locale);
      const res = await fetch("/api/tools/linkedin-photo-check", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || t("De check is mislukt.", "The check failed."));
        track("linkedin_photo_check_failed", { page_path: pagePath, locale, error: String(data.error || res.status) });
        return;
      }
      setResult(data as Result);
      track("linkedin_photo_check_completed", { page_path: pagePath, locale, score: data.score, band: data.band });
    } catch {
      setError(t("De check is mislukt. Probeer het opnieuw.", "The check failed. Please try again."));
      track("linkedin_photo_check_failed", { page_path: pagePath, locale, error: "network" });
    } finally {
      setBusy(false);
    }
  };

  const photoToolHref = `${nl ? "/profielfoto-cv-maken" : "/en/profile-photo"}?bron=${encodeURIComponent(source)}#profielfoto-tool`;
  const price = nl ? profilePhotoPrice.display : profilePhotoPrice.displayEn;

  return (
    <div data-clarity-mask="true" className="rounded-3xl border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:p-7">
      <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        {/* Upload + LinkedIn circle preview */}
        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); pick(e.dataTransfer.files?.[0]); }}
            className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-400 bg-[#FFFEF9] p-5 text-center hover:border-black"
          >
            {preview ? (
              <div className="flex items-end gap-4">
                <div className="text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element -- local object URL of the user's own photo */}
                  <img src={preview} alt="" className="h-28 w-28 rounded-xl border-2 border-black object-cover" />
                  <p className="mt-1 text-[11px] font-bold text-slate-500">{t("Je foto", "Your photo")}</p>
                </div>
                <div className="text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element -- same photo in LinkedIn's circular crop */}
                  <img src={preview} alt="" className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-[0_0_0_2px_#0a66c2]" />
                  <p className="mt-1 text-[11px] font-bold text-[#0a66c2]">{t("In de LinkedIn-cirkel", "In LinkedIn's circle")}</p>
                </div>
              </div>
            ) : (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-[#E9FFFC] text-2xl">⇪</span>
                <span className="mt-3 text-base font-black text-slate-950">{t("Kies je LinkedIn-foto", "Choose your LinkedIn photo")}</span>
                <span className="mt-1 text-xs font-semibold text-slate-600">{t("JPG, PNG of WebP, tot 8 MB. Of sleep hem hierheen.", "JPG, PNG or WebP, up to 8 MB. Or drag it here.")}</span>
              </>
            )}
          </button>
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? undefined)} />
          <button
            type="button"
            onClick={run}
            disabled={!file || busy}
            className="mt-4 w-full border-4 border-black bg-[#4ECDC4] px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? t("Je foto wordt bekeken…", "Checking your photo…") : t("Check mijn foto gratis", "Check my photo for free")}
          </button>
          {error ? <p className="mt-3 rounded-lg border-2 border-[#FF6B6B] bg-red-50 p-3 text-sm font-bold text-red-800">{error}</p> : null}
          <p className="mt-3 text-[11px] font-medium leading-relaxed text-slate-500">
            {t(
              "Gratis, zonder account. Je foto wordt niet opgeslagen: hij gaat alleen voor de beoordeling naar OpenAI en wordt niet gebruikt om AI te trainen.",
              "Free, no account. Your photo is not stored: it is only sent to OpenAI for the review and is not used to train AI.",
            )}
          </p>
        </div>

        {/* Result */}
        <div>
          {result ? (
            <div>
              <div className="flex items-center gap-4">
                <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-full border-4" style={{ borderColor: BAND[result.band].color }}>
                  <span className="text-3xl font-black text-slate-950">{result.score}</span>
                  <span className="text-[10px] font-bold text-slate-500">/ 100</span>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">{t("Je LinkedIn-fotoscore", "Your LinkedIn photo score")}</p>
                  <p className="text-2xl font-black" style={{ color: BAND[result.band].color }}>{BAND[result.band][locale]}</p>
                  <p className="text-sm font-semibold text-slate-700">
                    {result.topFixes.length
                      ? t(`${result.topFixes.length} ${result.topFixes.length === 1 ? "punt" : "punten"} om te verbeteren`, `${result.topFixes.length} ${result.topFixes.length === 1 ? "point" : "points"} to improve`)
                      : t("Deze foto is klaar voor LinkedIn.", "This photo is ready for LinkedIn.")}
                  </p>
                </div>
              </div>
              <ul className="mt-5 space-y-2">
                {result.items.map((item) => (
                  <li key={item.id} className="flex gap-3 rounded-xl border border-slate-200 p-3">
                    <span aria-hidden className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${ICON_BG[item.status]}`}>{ICON[item.status]}</span>
                    <div>
                      <p className="text-sm font-black text-slate-950">{LABELS[item.id]?.[locale] ?? item.id}</p>
                      <p className="text-sm font-medium leading-relaxed text-slate-700">{item.tip}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-slate-200 bg-[#FFFEF9] p-5">
              <p className="text-lg font-black text-slate-950">{t("Wat we checken", "What we check")}</p>
              <ul className="mt-3 grid gap-2 text-sm font-semibold text-slate-700 sm:grid-cols-2">
                {Object.values(LABELS).map((l) => (
                  <li key={l.nl} className="flex gap-2"><span aria-hidden className="text-[#0f8f86]">✓</span>{l[locale]}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-medium text-slate-500">
                {t("Je krijgt een score van 0 tot 100 en per punt een concrete tip. Duurt een paar seconden.", "You get a score from 0 to 100 and a concrete tip per point. Takes a few seconds.")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Offer after the result */}
      {result ? (
        <div className="mt-6 grid gap-4 rounded-2xl border-2 border-black bg-[#E9FFFC] p-5 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="text-lg font-black text-slate-950">
              {result.score >= 85
                ? t("Wil je er toch een strakke studiofoto van maken?", "Want a polished studio version anyway?")
                : t("Maak er een professionele versie van", "Turn it into a professional version")}
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              {t(
                `Upload dezelfde foto en bekijk gratis 4 professionele versies: rustige achtergrond, goed licht, nette uitsnede. Pas als je er een gebruikt, betaal je eenmalig ${price}.`,
                `Upload the same photo and see 4 professional versions for free: calm background, good light, clean framing. Only if you use one do you pay ${price} once.`,
              )}
            </p>
          </div>
          <Link
            href={photoToolHref}
            onClick={() => track("linkedin_photo_check_cta_clicked", { page_path: pagePath, locale, score: result.score })}
            className="inline-flex justify-center border-4 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            {t("Bekijk gratis voorbeelden", "See free previews")}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
