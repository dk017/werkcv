"use client";

import { useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { downloadPdfResponse } from "@/lib/pdf-download";

export default function PdfDownloadButton({ cvId, language, className }: {
  cvId: string; language: "nl" | "en"; className: string;
}) {
  const busy = useRef(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  async function download() {
    if (busy.current) return;
    busy.current = true;
    setLoading(true);
    setError(false);
    const properties = { cvId, uiLanguage: language, source: "payment_success" };
    track("pdf_download_started", properties);
    try {
      const response = await fetch(`/api/pdf?cvId=${encodeURIComponent(cvId)}`, {
        cache: "no-store", credentials: "same-origin",
      });
      await downloadPdfResponse(response);
      track("pdf_download_completed", properties);
    } catch {
      setError(true);
      track("pdf_download_failed", properties);
    } finally {
      busy.current = false;
      setLoading(false);
    }
  }
  return <>
    <button type="button" className={className} disabled={loading} onClick={() => void download()}>
      {loading ? (language === "en" ? "Preparing PDF…" : "PDF voorbereiden…") : "Download PDF"}
    </button>
    {error && <p role="alert" className="mt-3 text-sm text-red-700">
      {language === "en" ? "Your PDF could not be downloaded. Please try again or return to the editor. You do not need to pay again." : "Je PDF kon niet worden gedownload. Probeer opnieuw of ga terug naar de editor. Je hoeft niet opnieuw te betalen."}
    </p>}
  </>;
}
