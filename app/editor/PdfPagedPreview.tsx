"use client";

import { useEffect, useMemo, useState } from "react";
import type { CVData } from "@/lib/cv";
import type { UiLanguage } from "@/lib/ui-language";
import { A4_HEIGHT_PX, A4_WIDTH_PX } from "./ScaledCvPreview";

interface PdfPagedPreviewProps {
  cvId: string;
  data: CVData;
  templateId: string;
  colorThemeId: string;
  scale: number;
  uiLanguage: UiLanguage;
  onPageCountChange: (pageCount: number) => void;
  onStatusChange?: (status: PreviewStatus) => void;
}

type PreviewStatus = "loading" | "ready" | "error";

const PAGE_GAP_PX = 24;

export default function PdfPagedPreview({
  cvId,
  data,
  templateId,
  colorThemeId,
  scale,
  uiLanguage,
  onPageCountChange,
  onStatusChange,
}: PdfPagedPreviewProps) {
  const [status, setStatus] = useState<PreviewStatus>("loading");
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [retryToken, setRetryToken] = useState(0);
  const payloadJson = useMemo(
    () => JSON.stringify({ cvId, data, templateId, colorThemeId }),
    [colorThemeId, cvId, data, templateId],
  );

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    onStatusChange?.("loading");
    const timer = window.setTimeout(async () => {
      setStatus("loading");
      try {
        const response = await fetch("/api/pdf-preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payloadJson,
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Preview request failed: ${response.status}`);

        const result = await response.json();
        if (
          !Array.isArray(result?.pages)
          || result.pages.length === 0
          || result.pages.some((page: unknown) => typeof page !== "string")
        ) {
          throw new Error("Preview pages missing");
        }

        setPageImages(result.pages);
        onPageCountChange(result.pages.length);
        setStatus("ready");
        onStatusChange?.("ready");
      } catch (error) {
        if (controller.signal.aborted) return;
        const category = error instanceof Error && error.message.includes("status") ? "http_error" : "render_error";
        console.error("PDF-accurate preview failed", { category });
        setStatus("error");
        onStatusChange?.("error");
      }
    }, 120);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [onPageCountChange, onStatusChange, payloadJson, retryToken]);

  if (status === "error") {
    return (
      <div
        role="alert"
        className="flex items-center justify-center border border-rose-200 bg-rose-50 text-center"
        style={{ width: A4_WIDTH_PX * scale, height: A4_HEIGHT_PX * scale }}
      >
        <div className="max-w-[min(90%,360px)] space-y-3 px-4 text-xs text-rose-900">
          <p className="font-bold">{uiLanguage === "en" ? "The exact PDF preview could not be prepared." : "Het exacte PDF-voorbeeld kon niet worden voorbereid."}</p>
          <p>{uiLanguage === "en" ? "Your saved CV was not changed. Retry, or return to the live preview." : "Je opgeslagen CV is niet gewijzigd. Probeer opnieuw of ga terug naar live preview."}</p>
          <button
            type="button"
            onClick={() => {
              setPageImages([]);
              setRetryToken((value) => value + 1);
            }}
            className="rounded-md border border-rose-300 bg-white px-3 py-2 font-bold text-rose-800 hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            {uiLanguage === "en" ? "Retry exact preview" : "Exact voorbeeld opnieuw proberen"}
          </button>
        </div>
      </div>
    );
  }

  const renderedPageCount = Math.max(1, pageImages.length);
  const totalHeight =
    renderedPageCount * A4_HEIGHT_PX + Math.max(0, renderedPageCount - 1) * PAGE_GAP_PX;

  return (
    <div
      className="relative"
      style={{
        width: A4_WIDTH_PX * scale,
        height: totalHeight * scale,
      }}
      aria-busy={status !== "ready"}
    >
      {status === "ready" ? (
        <div
          className="absolute left-0 top-0 flex flex-col"
          style={{
            gap: PAGE_GAP_PX,
            width: A4_WIDTH_PX,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {pageImages.map((src, index) => (
            <div
              key={`${index}-${src.length}`}
              data-preview-page={index + 1}
              className="overflow-hidden border border-slate-300 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.12)]"
              style={{ width: A4_WIDTH_PX, height: A4_HEIGHT_PX }}
            >
              {/* The preview endpoint returns private, short-lived data URLs, not public assets. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={uiLanguage === "en" ? `CV page ${index + 1}` : `CV-pagina ${index + 1}`}
                className="block h-full w-full"
                draggable={false}
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="absolute left-0 top-0 flex items-center justify-center border border-slate-200 bg-white shadow-sm"
          style={{
            width: A4_WIDTH_PX * scale,
            height: A4_HEIGHT_PX * scale,
          }}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600 motion-reduce:animate-none" />
            {uiLanguage === "en" ? "Preparing exact PDF preview..." : "Exact PDF-voorbeeld voorbereiden..."}
          </div>
        </div>
      )}
    </div>
  );
}
