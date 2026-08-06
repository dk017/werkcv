"use client";

import { useCallback, useState } from "react";
import type { CVData } from "@/lib/cv";
import Preview, { type PreviewLayout } from "./preview";
import { LinkTextProvider } from "./templates/link-utils";

export const A4_WIDTH_PX = 794;
export const A4_HEIGHT_PX = 1123;
const CONTINUED_PAGE_TOP_PADDING_PX = 38;
const MAX_PREVIEW_PAGES = 100;

function calculatePageBreaks(layout: PreviewLayout): number[] {
  const height = Math.max(A4_HEIGHT_PX, layout.height);
  const ranges = layout.breakAvoidRanges
    .filter((range) => range.top > 0 && range.bottom > range.top)
    .sort((a, b) => a.top - b.top);
  const pageBreaks = [0];
  let pageStart = 0;

  while (pageBreaks.length < MAX_PREVIEW_PAGES) {
    const firstPage = pageBreaks.length === 1;
    const pageCapacity = firstPage
      ? A4_HEIGHT_PX
      : A4_HEIGHT_PX - CONTINUED_PAGE_TOP_PADDING_PX;
    const nominalNextBreak = pageStart + pageCapacity;

    if (nominalNextBreak >= height - 1) break;

    const crossingRange = ranges.find((range) => (
      range.top > pageStart + 1
      && range.top < nominalNextBreak
      && range.bottom > nominalNextBreak
      && range.bottom - range.top <= pageCapacity
    ));
    const nextBreak = crossingRange?.top ?? nominalNextBreak;

    if (nextBreak <= pageStart + 1) break;

    pageBreaks.push(nextBreak);
    pageStart = nextBreak;
  }

  return pageBreaks;
}

interface ScaledCvPreviewProps {
  data: CVData;
  templateId: string;
  colorThemeId: string;
  scale: number;
  pageCount: number;
  paginated?: boolean;
  dividerHeight?: number;
  onPageCountChange?: (pageCount: number) => void;
}

export default function ScaledCvPreview({
  data,
  templateId,
  colorThemeId,
  scale,
  pageCount,
  paginated = false,
  dividerHeight = 6,
  onPageCountChange,
}: ScaledCvPreviewProps) {
  const [pageBreaks, setPageBreaks] = useState<number[] | null>(null);
  const handlePreviewLayout = useCallback((layout: PreviewLayout) => {
    const nextPageBreaks = calculatePageBreaks(layout);

    setPageBreaks((current) => {
      if (current?.length === nextPageBreaks.length && current.every((value, index) => value === nextPageBreaks[index])) {
        return current;
      }
      return nextPageBreaks;
    });

    onPageCountChange?.(nextPageBreaks.length);
  }, [onPageCountChange]);

  const safePageCount = Math.max(1, pageBreaks?.length ?? pageCount);

  if (paginated) {
    return (
      <div className="flex flex-col items-center gap-1">
        {Array.from({ length: safePageCount }, (_, pageIndex) => (
          <div
            key={pageIndex}
            data-preview-page={pageIndex + 1}
            className="relative shrink-0 overflow-hidden border border-slate-200 bg-white shadow-[0_4px_14px_rgba(15,23,42,0.10)]"
            style={{
              width: A4_WIDTH_PX * scale,
              height: A4_HEIGHT_PX * scale,
            }}
          >
            {pageIndex > 0 ? (
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-white"
                style={{ height: CONTINUED_PAGE_TOP_PADDING_PX * scale }}
                aria-hidden="true"
              />
            ) : null}
            {pageBreaks?.[pageIndex + 1] !== undefined ? (
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-white"
                style={{
                  top: Math.min(
                    A4_HEIGHT_PX,
                    pageIndex === 0
                      ? pageBreaks[pageIndex + 1]
                      : CONTINUED_PAGE_TOP_PADDING_PX
                        + pageBreaks[pageIndex + 1]
                        - (pageBreaks[pageIndex] ?? 0)
                  ) * scale,
                }}
                aria-hidden="true"
              />
            ) : null}
            <div
              className="absolute left-0 w-[794px]"
              style={{
                top: (
                  pageIndex === 0
                    ? 0
                    : CONTINUED_PAGE_TOP_PADDING_PX
                      - (pageBreaks?.[pageIndex] ?? (
                        A4_HEIGHT_PX
                        + (pageIndex - 1) * (A4_HEIGHT_PX - CONTINUED_PAGE_TOP_PADDING_PX)
                      ))
                ) * scale,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              <LinkTextProvider disableAnchors>
                <Preview
                  data={data}
                  templateId={templateId}
                  colorThemeId={colorThemeId}
                  continuedPageTopPadding={CONTINUED_PAGE_TOP_PADDING_PX}
                  onPageCountChange={pageIndex === 0 ? onPageCountChange : undefined}
                  onLayoutChange={pageIndex === 0 ? handlePreviewLayout : undefined}
                />
              </LinkTextProvider>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative border border-slate-200 bg-white shadow-sm"
      style={{
        width: A4_WIDTH_PX * scale,
        height: safePageCount * A4_HEIGHT_PX * scale,
      }}
    >
      <div
        className="absolute left-0 top-0 w-[794px]"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <LinkTextProvider disableAnchors>
          <Preview
            data={data}
            templateId={templateId}
            colorThemeId={colorThemeId}
            onPageCountChange={onPageCountChange}
          />
        </LinkTextProvider>
      </div>

      {safePageCount > 1
        ? Array.from({ length: safePageCount - 1 }, (_, index) => (
            <div
              key={index}
              className="absolute left-0 right-0 z-10 bg-slate-200"
              style={{
                top: (index + 1) * A4_HEIGHT_PX * scale,
                height: dividerHeight,
              }}
            />
          ))
        : null}
    </div>
  );
}
