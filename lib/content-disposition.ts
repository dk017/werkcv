/**
 * `Content-Disposition: attachment` for a user-chosen filename.
 *
 * HTTP header values must be Latin-1 (ByteString): a name like "Łukasz", "Ayşe Yılmaz"
 * or "Jeroen Blom – CV" made `new NextResponse(...)` throw after the PDF was already
 * built, so the paid download failed with an empty 500. Send an ASCII fallback in
 * `filename` and the real name in RFC 5987/6266 `filename*`, which browsers prefer.
 */
export function attachmentContentDisposition(filename: string): string {
  const asciiFallback = filename
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7e]/g, "")
    .replace(/["\\]/g, "")
    .replace(/\s+/g, " ")
    .trim() || "cv.pdf";
  const encoded = encodeURIComponent(filename).replace(/['()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
  return `attachment; filename="${asciiFallback}"; filename*=UTF-8''${encoded}`;
}
