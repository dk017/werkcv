// Lazily loaded PDF.js (legacy build for Node). Kept separate from cv-parser so modules that
// only need PDF layout do not pull in the OpenAI client.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pdfjs: any = null;

export async function getPdfjs() {
    if (!pdfjs) {
        // PDF.js resolves its matching worker module for Node internally.
        pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
    }
    return pdfjs;
}
