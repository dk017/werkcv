"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CVData } from "@/lib/cv";
import Preview, { type PreviewLayout } from "@/app/editor/preview";
import { calculatePageBreaks } from "@/lib/preview-pagination";

export type PdfRenderPayload = { data: CVData; templateId: string; colorThemeId: string };

declare global {
  interface Window {
    /** Called by the server's headless browser (lib/pdf.ts) with the CV to print. */
    __werkcvRenderPdf?: (payload: PdfRenderPayload) => void;
  }
}

// Renders a CV with the same React templates and the same page breaks as the live
// preview, so the printed PDF matches what the user saw. The page shows nothing until
// the server hands it a CV; it never loads CV data itself.
export default function PdfRenderClient() {
  const [payload, setPayload] = useState<PdfRenderPayload | null>(null);
  // Pass 0 renders (and loads the fonts); pass 1 re-measures with the final fonts.
  const [pass, setPass] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.__werkcvRenderPdf = (next) => {
      rootRef.current?.removeAttribute("data-pdf-ready");
      setPass(0);
      setPayload(next);
    };
    document.documentElement.setAttribute("data-pdf-host", "ready");
    return () => { delete window.__werkcvRenderPdf; };
  }, []);

  useEffect(() => {
    if (!payload || pass !== 0) return;
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) requestAnimationFrame(() => setPass(1));
    });
    return () => { cancelled = true; };
  }, [payload, pass]);

  const applyPageBreaks = useCallback((layout: PreviewLayout) => {
    const root = rootRef.current;
    if (!root) return;
    root.querySelectorAll<HTMLElement>("[data-pdf-break]").forEach((element) => {
      element.style.breakBefore = "";
      element.removeAttribute("data-pdf-break");
    });
    // Force a page break before the same blocks the preview breaks before.
    const rootTop = root.getBoundingClientRect().top;
    const blocks = Array.from(root.querySelectorAll<HTMLElement>(".break-inside-avoid, [data-cv-break-avoid]"));
    for (const y of calculatePageBreaks(layout).slice(1)) {
      const block = blocks.find((candidate) => Math.abs(candidate.getBoundingClientRect().top - rootTop - y) < 0.5);
      if (block) {
        block.style.breakBefore = "page";
        block.setAttribute("data-pdf-break", "");
      }
    }
    root.setAttribute("data-pdf-ready", "true");
  }, []);

  return (
    <div ref={rootRef} id="pdf-root">
      {payload ? (
        <Preview
          key={pass}
          data={payload.data}
          templateId={payload.templateId}
          colorThemeId={payload.colorThemeId}
          onLayoutChange={pass === 1 ? applyPageBreaks : undefined}
        />
      ) : null}
    </div>
  );
}
