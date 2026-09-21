/** A completed transfer means bytes received and handed to the browser, not
 * proof that the user saved the file to disk. Never track on the initial click. */
export async function downloadPdfResponse(response: Response): Promise<void> {
  if (!response.ok || !response.headers.get("content-type")?.toLowerCase().includes("application/pdf")) {
    throw new Error("PDF_RESPONSE_INVALID");
  }
  const blob = await response.blob();
  if (!blob.size || !(await blob.slice(0, 5).text()).startsWith("%PDF-")) {
    throw new Error("PDF_RESPONSE_INVALID");
  }
  const disposition = response.headers.get("content-disposition");
  const filename = disposition?.match(/filename="?([^";\n]+)"?/)?.[1] || "cv.pdf";
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  try {
    link.click();
  } finally {
    link.remove();
    // Give the browser time to start consuming the blob before revoking it.
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
  }
}
