"use client";

import { useEffect, useId } from "react";
import { cvDownloadPrice } from "@/lib/site-content";

type DownloadUnlockModalProps = {
  uiLanguage: "nl" | "en";
  busy: boolean;
  priceAnchorLine?: string | null;
  onContinue: () => void;
  onClose: (reason: "later_button" | "close_button" | "overlay") => void;
};

/**
 * Value-framed pre-checkout modal shown when an authenticated user clicks Download on an unpaid CV.
 * Keeps the editor download CTA clean while making the one-time price, benefits, and payment
 * methods crystal clear right before opening checkout.
 */
export default function DownloadUnlockModal({
  uiLanguage,
  busy,
  priceAnchorLine,
  onContinue,
  onClose,
}: DownloadUnlockModalProps) {
  const titleId = useId();
  const en = uiLanguage === "en";
  const price = en ? cvDownloadPrice.displayEn : cvDownloadPrice.display;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) onClose("close_button");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy, onClose]);

  const benefits = en
    ? [
        "Clean, ATS-ready PDF without watermark",
        "Edit and re-download this CV as often as you like",
        "One-time payment — no subscription or auto-renewal",
      ]
    : [
        "Strakke, ATS-vriendelijke PDF zonder watermerk",
        "Pas dit cv daarna onbeperkt aan en download opnieuw",
        "Eenmalig betalen — geen abonnement of verlenging",
      ];

  const paymentMethods = en
    ? "Card · Apple Pay · Google Pay · iDEAL"
    : "iDEAL · Apple Pay · Google Pay · Creditcard";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(event) => {
        if (event.target === event.currentTarget && !busy) onClose("overlay");
      }}
    >
      <div className="w-full max-w-md rounded-t-2xl bg-white p-5 shadow-2xl sm:rounded-2xl sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-emerald-700">
              {en ? "Ready to download" : "Klaar om te downloaden"}
            </p>
            <h2 id={titleId} className="mt-1 text-xl font-extrabold text-slate-900">
              {en ? "Download your ATS-ready PDF" : "Download je ATS-vriendelijke PDF"}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onClose("close_button")}
            disabled={busy}
            aria-label={en ? "Close" : "Sluiten"}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50"
          >
            ×
          </button>
        </div>

        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-sm font-bold text-slate-800">
              {en ? "One-time download" : "Eenmalige download"}
            </span>
            <span className="text-2xl font-extrabold text-slate-950">{price}</span>
          </div>
          <p className="mt-1 text-xs font-medium text-slate-600">
            {priceAnchorLine || (en ? "No subscription · Instant PDF download" : "Geen abonnement · Direct je PDF downloaden")}
          </p>
        </div>

        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          {benefits.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span aria-hidden="true" className="mt-0.5 font-extrabold text-emerald-600">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            onClick={onContinue}
            disabled={busy}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-emerald-700 bg-emerald-600 px-4 text-sm font-extrabold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy
              ? en ? "Opening secure checkout..." : "Veilige betaling openen..."
              : en ? `Continue to payment · ${price}` : `Verder naar betalen · ${price}`}
          </button>
          <p className="text-center text-[11px] font-medium text-slate-500">{paymentMethods}</p>
          <button
            type="button"
            onClick={() => onClose("later_button")}
            disabled={busy}
            className="mt-1 rounded-md px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50"
          >
            {en ? "Back to editor" : "Terug naar editor"}
          </button>
        </div>
      </div>
    </div>
  );
}
