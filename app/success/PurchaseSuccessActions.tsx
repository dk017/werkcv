"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PurchaseTracker from "./PurchaseTracker";

type PaidOrder = {
  id: string;
  product: string;
  amountCents: number | null;
  currency: string | null;
};

type Props = {
  cvId: string;
  language: "nl" | "en";
  editorPath: string;
  profilePhotoPath: string;
  hasProfilePhotoBundle: boolean;
  initialOrder: PaidOrder | null;
};

const MAX_ATTEMPTS = 20;

export default function PurchaseSuccessActions({
  cvId,
  language,
  editorPath,
  profilePhotoPath,
  hasProfilePhotoBundle,
  initialOrder,
}: Props) {
  const [order, setOrder] = useState<PaidOrder | null>(initialOrder);
  const [timedOut, setTimedOut] = useState(false);
  const tr = (dutch: string, english: string) => language === "en" ? english : dutch;

  useEffect(() => {
    if (order) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;

    const poll = async () => {
      attempts += 1;
      try {
        const response = await fetch(`/api/payment-status?cvId=${encodeURIComponent(cvId)}`, {
          cache: "no-store",
          credentials: "same-origin",
        });
        if (response.ok) {
          const result = await response.json() as { paid?: boolean; order?: PaidOrder | null };
          if (!cancelled && result.paid && result.order) {
            setOrder(result.order);
            return;
          }
        }
      } catch {
        // A transient network failure should not turn a successful payment into
        // an error. Continue polling until the bounded timeout is reached.
      }

      if (cancelled) return;
      if (attempts >= MAX_ATTEMPTS) {
        setTimedOut(true);
        return;
      }
      timeoutId = setTimeout(poll, 1500);
    };

    void poll();
    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [cvId, order]);

  if (!order) {
    return (
      <div className="space-y-4">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
          <span className="h-7 w-7 animate-spin rounded-full border-4 border-amber-600 border-t-transparent" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          {tr("Betaling wordt afgerond", "Finalising your payment")}
        </h1>
        <p className="text-gray-600">
          {tr(
            "We wachten op de betalingsbevestiging voordat we je download vrijgeven.",
            "We are waiting for payment confirmation before enabling your download.",
          )}
        </p>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-left">
          <p className="font-bold text-gray-900">
            {timedOut
              ? tr("De betaling wordt nog verwerkt", "Your payment is still being processed")
              : tr("Je betaling wordt afgerond…", "Finalising your payment…")}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-gray-600" aria-live="polite">
            {timedOut
              ? tr(
                "Vernieuw deze pagina over een minuut. Je aankoop blijft veilig bewaard; neem contact op als de download daarna nog niet verschijnt.",
                "Refresh this page in one minute. Your purchase remains safe; contact us if the download still does not appear.",
              )
              : tr(
                "Dit duurt meestal maar enkele seconden. De download verschijnt automatisch zodra de betaling is bevestigd.",
                "This usually takes only a few seconds. Your download will appear automatically when the payment is confirmed.",
              )}
          </p>
        </div>
        {timedOut && (
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="block w-full rounded-full bg-gray-900 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-black"
          >
            {tr("Controleer opnieuw", "Check again")}
          </button>
        )}
        <Link
          href={editorPath}
          className="block w-full rounded-full bg-gray-100 px-6 py-3 text-center text-sm font-bold text-gray-700 transition hover:bg-gray-200"
        >
          {tr("Terug naar editor", "Back to editor")}
        </Link>
      </div>
    );
  }

  return (
    <>
      <PurchaseTracker
        orderId={order.id}
        cvId={cvId}
        product={order.product}
        amountCents={order.amountCents ?? undefined}
        currency={order.currency ?? undefined}
      />
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="mb-2 text-2xl font-bold text-gray-900">
        {tr("Betaling geslaagd!", "Payment successful!")}
      </h1>
      <p className="mb-8 text-gray-600" aria-live="polite">
        {tr(
          hasProfilePhotoBundle
            ? "Je sollicitatiepakket is betaald. Download je CV en maak je AI-profielfoto wanneer het jou uitkomt."
            : "Bedankt voor je aankoop. Je kunt nu je CV downloaden als PDF.",
          hasProfilePhotoBundle
            ? "Your application package is paid. Download your CV and create your AI profile photo whenever you are ready."
            : "Thanks for your purchase. You can now download your CV as a PDF.",
        )}
      </p>
      {hasProfilePhotoBundle ? (
        <div className="space-y-4 text-left">
          <div className="rounded-2xl border-2 border-black bg-[#FFFEF9] p-4">
            <p className="text-xs font-black uppercase tracking-wide text-gray-500">{tr("Stap 1", "Step 1")}</p>
            <h2 className="mt-1 text-lg font-black text-gray-900">{tr("Download je CV", "Download your CV")}</h2>
            <a href={`/api/pdf?cvId=${cvId}`} className="mt-4 block w-full rounded-full bg-gray-900 px-6 py-3 text-center text-sm font-bold text-white shadow-md transition hover:bg-black">
              {tr("Download PDF", "Download PDF")}
            </a>
          </div>
          <div className="rounded-2xl border-2 border-black bg-[#E9FFFC] p-4">
            <p className="text-xs font-black uppercase tracking-wide text-gray-500">{tr("Stap 2", "Step 2")}</p>
            <h2 className="mt-1 text-lg font-black text-gray-900">{tr("Maak je AI-profielfoto", "Create your AI profile photo")}</h2>
            <Link href={profilePhotoPath} className="mt-4 block w-full rounded-full bg-teal-300 px-6 py-3 text-center text-sm font-bold text-gray-900 shadow-md transition hover:bg-teal-400">
              {tr("Maak mijn AI-profielfoto", "Create my AI profile photo")}
            </Link>
          </div>
          <Link href={editorPath} className="block w-full rounded-full bg-gray-100 px-6 py-3 text-center text-sm font-bold text-gray-700 transition hover:bg-gray-200">
            {tr("Terug naar editor", "Back to editor")}
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <a href={`/api/pdf?cvId=${cvId}`} className="block w-full rounded-full bg-gray-900 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-black">
            {tr("Download PDF", "Download PDF")}
          </a>
          <Link href={editorPath} className="block w-full rounded-full bg-gray-100 px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-200">
            {tr("Terug naar editor", "Back to editor")}
          </Link>
        </div>
      )}
      <p className="mt-8 text-xs text-gray-400">
        {tr(
          "Je kunt na bevestiging altijd opnieuw downloaden via de editor.",
          "After confirmation, you can always download again from the editor.",
        )}
      </p>
    </>
  );
}
