import { createCanvas } from "@napi-rs/canvas";

const PREVIEW_SCALE = 4 / 3;
const MAX_PREVIEW_PAGES = 12;

type RenderOptions = {
  /** Render only the first N pages instead of rejecting longer documents. */
  firstPages?: number;
  scale?: number;
  format?: "png" | "jpeg";
};

export async function renderPdfPreviewImages(pdfBuffer: Buffer): Promise<string[]> {
  return renderPdfPages(pdfBuffer, { scale: PREVIEW_SCALE, format: "png" });
}

/** First pages as JPEG data URLs, e.g. to let a vision model read a scanned PDF. */
export async function renderPdfFirstPageImages(pdfBuffer: Buffer, firstPages: number, scale = 2): Promise<string[]> {
  return renderPdfPages(pdfBuffer, { firstPages, scale, format: "jpeg" });
}

async function renderPdfPages(pdfBuffer: Buffer, options: RenderOptions): Promise<string[]> {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const loadingTask = pdfjs.getDocument({
    data: new Uint8Array(pdfBuffer),
    useSystemFonts: true,
  });
  const document = await loadingTask.promise;

  try {
    if (options.firstPages === undefined && document.numPages > MAX_PREVIEW_PAGES) {
      throw new Error(`Preview exceeds ${MAX_PREVIEW_PAGES} pages`);
    }
    const pageCount = Math.min(document.numPages, options.firstPages ?? document.numPages);
    const format = options.format ?? "png";

    const pages: string[] = [];
    for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const viewport = page.getViewport({ scale: options.scale ?? PREVIEW_SCALE });
      const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
      const context = canvas.getContext("2d");
      if (format === "jpeg") {
        // JPEG has no alpha: paint the page white first so transparent areas do not turn black.
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      await page.render({
        canvas: canvas as never,
        canvasContext: context as never,
        viewport,
      }).promise;

      const image = format === "jpeg" ? await canvas.encode("jpeg", 85) : await canvas.encode("png");
      pages.push(`data:image/${format};base64,${image.toString("base64")}`);
      page.cleanup();
    }
    return pages;
  } finally {
    await loadingTask.destroy();
  }
}
