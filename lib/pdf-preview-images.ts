import { createCanvas } from "@napi-rs/canvas";

const PREVIEW_SCALE = 4 / 3;
const MAX_PREVIEW_PAGES = 12;

export async function renderPdfPreviewImages(pdfBuffer: Buffer): Promise<string[]> {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.js");
  const loadingTask = pdfjs.getDocument({
    data: new Uint8Array(pdfBuffer),
    isEvalSupported: false,
    useSystemFonts: true,
  });
  const document = await loadingTask.promise;

  try {
    if (document.numPages > MAX_PREVIEW_PAGES) {
      throw new Error(`Preview exceeds ${MAX_PREVIEW_PAGES} pages`);
    }

    const pages: string[] = [];
    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const viewport = page.getViewport({ scale: PREVIEW_SCALE });
      const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
      const context = canvas.getContext("2d");

      await page.render({
        canvasContext: context as never,
        viewport,
      }).promise;

      const png = await canvas.encode("png");
      pages.push(`data:image/png;base64,${png.toString("base64")}`);
      page.cleanup();
    }
    return pages;
  } finally {
    await document.destroy();
  }
}
