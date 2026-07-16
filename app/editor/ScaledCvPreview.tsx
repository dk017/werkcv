"use client";

import type { CVData } from "@/lib/cv";
import Preview from "./preview";
import { LinkTextProvider } from "./templates/link-utils";

export const A4_WIDTH_PX = 794;
export const A4_HEIGHT_PX = 1123;
const CONTINUED_PAGE_TOP_PADDING_PX = 38;

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
  const safePageCount = Math.max(1, pageCount);

  if (paginated) {
    return (
      <div className="flex flex-col items-center gap-5 sm:gap-6">
        {Array.from({ length: safePageCount }, (_, pageIndex) => (
          <div
            key={pageIndex}
            data-preview-page={pageIndex + 1}
            className="relative shrink-0 overflow-hidden border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.12)]"
            style={{
              width: A4_WIDTH_PX * scale,
              height: A4_HEIGHT_PX * scale,
            }}
          >
            <div
              className="absolute left-0 w-[794px]"
              style={{
                top: (
                  pageIndex === 0
                    ? 0
                    : CONTINUED_PAGE_TOP_PADDING_PX
                      - A4_HEIGHT_PX
                      - (pageIndex - 1) * (A4_HEIGHT_PX - CONTINUED_PAGE_TOP_PADDING_PX)
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
