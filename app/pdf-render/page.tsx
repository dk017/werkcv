import type { Metadata } from "next";
import PdfRenderClient from "./PdfRenderClient";
import { CONTINUED_PAGE_TOP_PADDING_PX } from "@/lib/preview-pagination";

export const metadata: Metadata = { title: "PDF", robots: { index: false, follow: false } };

// Print page for the server-side PDF (lib/pdf.ts, PDF_RENDERER=react). Same templates as the
// live preview; continued pages get the same top margin as the preview's continued pages.
const PRINT_CSS = `
@page { size: A4; margin: ${CONTINUED_PAGE_TOP_PADDING_PX}px 0 0 0; }
@page :first { margin-top: 0; }
html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }
#pdf-root { width: 210mm; }
/* Whole sections may split; entries (a job, a study) stay together. Page breaks are
   placed explicitly by PdfRenderClient, exactly where the preview breaks. */
#pdf-root [data-cv-section].break-inside-avoid { break-inside: auto; }
/* Trailing padding is empty space; on paper it would only push a line onto an extra page.
   Keep a full-page minimum (sidebar colour) just under the A4 height. */
#pdf-root [data-cv-template] { min-height: calc(297mm - 2px) !important; padding-bottom: 0 !important; }
#pdf-root [data-cv-lane] { padding-bottom: 0 !important; }
nextjs-portal { display: none !important; }
`;

export default function PdfRenderPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />
      <PdfRenderClient />
    </>
  );
}
