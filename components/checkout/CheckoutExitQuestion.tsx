"use client";

import { useEffect, useId, useState } from "react";
import { track } from "@/lib/analytics";
import {
  CHECKOUT_CANCEL_PARAM,
  CHECKOUT_CANCEL_VALUE,
  CHECKOUT_EXIT_DETAIL_MAX,
  type CheckoutExitEventContext,
  type CheckoutExitReason,
  type CheckoutExitTrigger,
  clearPendingCheckout,
  decideExitPrompt,
  getCheckoutExitCopy,
  markExitPromptShown,
  readExitPromptShownAt,
  readPendingCheckout,
  scrubExitDetail,
} from "@/lib/checkout-exit";
import { readStoredPriceCopyVariant } from "@/lib/pricing-copy-experiment";
import { cvDownloadPrice } from "@/lib/site-content";

type Props = {
  cvId: string;
  locale: "nl" | "en";
  /** Only for CVs that still need paying. */
  enabled: boolean;
  downloadLabel: string;
  isDownloading: boolean;
  onRetry: () => void;
};

const NEEDS_DETAIL: CheckoutExitReason[] = ["payment_method", "other"];

/**
 * "Wat hield je tegen?" after someone returns from the payment page without paying: via Dodo's
 * back button (cancel_url marker) or the browser's back button (pending checkout in storage,
 * including pages restored from the back/forward cache). Inline, dismissible, never blocks editing.
 */
export default function CheckoutExitQuestion({ cvId, locale, enabled, downloadLabel, isDownloading, onRetry }: Props) {
  const copy = getCheckoutExitCopy(locale);
  const headingId = useId();
  const detailId = useId();
  const [prompt, setPrompt] = useState<{ trigger: CheckoutExitTrigger; context: CheckoutExitEventContext } | null>(null);
  const [reason, setReason] = useState<CheckoutExitReason | null>(null);
  const [detail, setDetail] = useState("");
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const check = () => {
      const url = new URL(window.location.href);
      const cancelMarker = url.searchParams.get(CHECKOUT_CANCEL_PARAM) === CHECKOUT_CANCEL_VALUE;
      if (cancelMarker) {
        url.searchParams.delete(CHECKOUT_CANCEL_PARAM);
        window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
      }
      const now = Date.now();
      const pending = readPendingCheckout();
      const trigger = decideExitPrompt({ cvId, now, cancelMarker, pending, lastShownAt: readExitPromptShownAt(cvId) });
      if (!trigger) return;
      markExitPromptShown(cvId, now);
      clearPendingCheckout(cvId);
      const context: CheckoutExitEventContext = {
        cvId,
        uiLanguage: locale,
        trigger,
        amountCents: cvDownloadPrice.amountCents,
        priceCopyVariant: readStoredPriceCopyVariant(),
        ...(pending?.cvId === cvId ? { secondsSinceCheckout: Math.round((now - pending.at) / 1000) } : {}),
      };
      track("checkout_exit_prompt_shown", context);
      setReason(null);
      setDetail("");
      setAnswered(false);
      setPrompt({ trigger, context });
    };
    // Deferred like usePriceCopy: reads URL and storage, which only exist on the client.
    const timeoutId = window.setTimeout(check, 0);
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) check();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [cvId, enabled, locale]);

  if (!enabled || !prompt) return null;

  const submit = (chosen: CheckoutExitReason, text?: string) => {
    const cleanDetail = NEEDS_DETAIL.includes(chosen) ? scrubExitDetail(text) : undefined;
    track("checkout_exit_reason", { ...prompt.context, reason: chosen, ...(cleanDetail ? { detail: cleanDetail } : {}) });
    setReason(chosen);
    setAnswered(true);
  };

  const choose = (chosen: CheckoutExitReason) => {
    if (NEEDS_DETAIL.includes(chosen)) {
      setReason(chosen);
      return;
    }
    submit(chosen);
  };

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-slate-900 shadow-sm"
      data-checkout-exit={prompt.trigger}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 id={headingId} className="text-sm font-black">{copy.question}</h2>
          {!answered ? <p className="mt-1 text-xs font-medium leading-relaxed text-slate-600">{copy.intro}</p> : null}
        </div>
        <button
          type="button"
          onClick={() => setPrompt(null)}
          aria-label={copy.dismiss}
          className="-mr-1 -mt-1 rounded p-1 text-lg leading-none text-slate-500 hover:bg-amber-100 hover:text-slate-800"
        >
          ×
        </button>
      </div>

      {!answered ? (
        <>
          <div className="mt-3 flex flex-wrap gap-2">
            {copy.options.map((option) => (
              <button
                key={option.reason}
                type="button"
                onClick={() => choose(option.reason)}
                aria-pressed={reason === option.reason}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${reason === option.reason
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-300 bg-white text-slate-800 hover:border-slate-500"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          {reason && NEEDS_DETAIL.includes(reason) ? (
            <form
              className="mt-3"
              onSubmit={(event) => {
                event.preventDefault();
                submit(reason, detail);
              }}
            >
              <label htmlFor={detailId} className="block text-xs font-semibold text-slate-700">{copy.detailLabel[reason]}</label>
              <div className="mt-1 flex gap-2">
                <input
                  id={detailId}
                  type="text"
                  value={detail}
                  maxLength={CHECKOUT_EXIT_DETAIL_MAX}
                  onChange={(event) => setDetail(event.target.value)}
                  placeholder={copy.detailPlaceholder[reason]}
                  autoComplete="off"
                  className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                />
                <button type="submit" className="shrink-0 rounded-md border border-slate-900 bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-800">
                  {copy.submit}
                </button>
              </div>
            </form>
          ) : null}
        </>
      ) : reason ? (
        <div className="mt-2">
          <p className="text-sm font-medium leading-relaxed text-slate-700" role="status">{copy.replies[reason]}</p>
          {reason !== "not_ready" ? (
            <button
              type="button"
              onClick={onRetry}
              disabled={isDownloading}
              className="mt-3 rounded-md border border-emerald-700 bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {downloadLabel}
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
