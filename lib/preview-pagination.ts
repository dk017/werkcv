// Page breaks for the live preview. Templates mark blocks that should not be split
// (.break-inside-avoid / [data-cv-break-avoid]): whole sections, and inside the long
// sections each entry (a job, a study). Ranges are in unscaled A4 pixels.

export const A4_HEIGHT_PX = 1123;
export const CONTINUED_PAGE_TOP_PADDING_PX = 38;
/**
 * Usable height of a printed A4 page for page breaks. A4 is 1122.52 px; deciding with 1123 let
 * content that fits the preview spill a line onto the next PDF page.
 */
export const PAGE_CONTENT_HEIGHT_PX = 1122;
const MAX_PREVIEW_PAGES = 100;
/** A section heading plus its spacing. Never leave just that at the bottom of a page. */
const HEADING_KEEP_PX = 60;
/** Sections up to this share of a page move as a whole rather than splitting between entries. */
const SMALL_SECTION_SHARE = 0.25;

export type BreakAvoidRange = { top: number; bottom: number };

export function calculatePageBreaks(layout: { height: number; contentBottom?: number; breakAvoidRanges: BreakAvoidRange[] }): number[] {
  // Where the content ends: the template's bottom padding and last margin are empty space and
  // must not create a page of their own (they are dropped when printing).
  const height = layout.contentBottom ?? layout.height;
  const ranges = layout.breakAvoidRanges
    .filter((range) => range.top > 0 && range.bottom > range.top)
    .sort((a, b) => a.top - b.top);
  const pageBreaks = [0];
  let pageStart = 0;

  while (pageBreaks.length < MAX_PREVIEW_PAGES) {
    const firstPage = pageBreaks.length === 1;
    const pageCapacity = firstPage ? PAGE_CONTENT_HEIGHT_PX : PAGE_CONTENT_HEIGHT_PX - CONTINUED_PAGE_TOP_PADDING_PX;
    const nominalNextBreak = pageStart + pageCapacity;

    if (nominalNextBreak >= height) break;

    const crossing = ranges.filter((range) => (
      range.top > pageStart + 1
      && range.top < nominalNextBreak
      && range.bottom > nominalNextBreak
      && range.bottom - range.top <= pageCapacity
    ));
    // Break before the innermost block that crosses the page edge: one job moves to the
    // next page, not the whole Werkervaring section (which left most of page 1 empty).
    let chosen = crossing.reduce<BreakAvoidRange | undefined>((best, range) => (!best || range.top > best.top ? range : best), undefined);
    if (chosen) {
      const inner = chosen;
      const enclosing = crossing
        .filter((range) => range.top < inner.top && range.bottom >= inner.bottom)
        .sort((a, b) => a.top - b.top);
      // Keep a heading with its first entry, and keep small sections together.
      const keepWhole = enclosing.find((range) => (
        inner.top - range.top <= HEADING_KEEP_PX
        || range.bottom - range.top <= pageCapacity * SMALL_SECTION_SHARE
      ));
      if (keepWhole) chosen = keepWhole;
    }
    const nextBreak = chosen?.top ?? nominalNextBreak;

    if (nextBreak <= pageStart + 1) break;

    pageBreaks.push(nextBreak);
    pageStart = nextBreak;
  }

  return pageBreaks;
}
