"use client";
/* eslint-disable react-hooks/static-components */
import { useRef, useEffect, useCallback } from "react";
import { CVData } from "@/lib/cv";
import { getTemplateComponent, getTheme } from "./templates";

interface PreviewProps {
    data: CVData;
    templateId: string;
    colorThemeId: string;
    continuedPageTopPadding?: number;
    onPageCountChange?: (pageCount: number) => void;
    onLayoutChange?: (layout: PreviewLayout) => void;
}

export interface PreviewLayout {
    height: number;
    breakAvoidRanges: Array<{ top: number; bottom: number }>;
}

const PREVIEW_WIDTH_PX = 794;

export default function Preview({
    data,
    templateId,
    colorThemeId,
    continuedPageTopPadding = 0,
    onPageCountChange,
    onLayoutChange,
}: PreviewProps) {
    const TemplateComponent = getTemplateComponent(templateId);
    const theme = getTheme(templateId, colorThemeId);
    const containerRef = useRef<HTMLDivElement>(null);
    // Cache A4 height in px — measured once, never changes during a session
    const a4HeightRef = useRef<number>(0);

    const measureLayout = useCallback((heightPx?: number) => {
        const container = containerRef.current;
        if (!container) return;

        // Measure A4 height once and cache it — this remains independent of the
        // visual zoom applied by ScaledCvPreview.
        if (a4HeightRef.current === 0) {
            const tempDiv = document.createElement('div');
            tempDiv.style.height = '297mm';
            tempDiv.style.position = 'absolute';
            tempDiv.style.visibility = 'hidden';
            document.body.appendChild(tempDiv);
            a4HeightRef.current = tempDiv.offsetHeight;
            document.body.removeChild(tempDiv);
        }

        const containerRect = container.getBoundingClientRect();
        const renderScale = containerRect.width > 0
            ? containerRect.width / PREVIEW_WIDTH_PX
            : 1;
        const measuredHeight = Math.max(
            0,
            heightPx ?? (renderScale > 0 ? containerRect.height / renderScale : containerRect.height)
        );
        const breakAvoidRanges = Array.from(
            container.querySelectorAll<HTMLElement>('.break-inside-avoid, [data-cv-break-avoid]')
        )
            .map((element) => {
                const rect = element.getBoundingClientRect();
                return {
                    top: (rect.top - containerRect.top) / renderScale,
                    bottom: (rect.bottom - containerRect.top) / renderScale,
                };
            })
            .filter((range) => Number.isFinite(range.top) && Number.isFinite(range.bottom) && range.bottom > range.top);

        if (onPageCountChange) {
            const firstPageHeight = a4HeightRef.current;
            const continuedPageHeight = Math.max(1, firstPageHeight - continuedPageTopPadding);
            const pages = measuredHeight <= firstPageHeight
                ? 1
                : 1 + Math.ceil((measuredHeight - firstPageHeight) / continuedPageHeight);
            onPageCountChange(pages);
        }

        onLayoutChange?.({ height: measuredHeight, breakAvoidRanges });
    }, [continuedPageTopPadding, onLayoutChange, onPageCountChange]);

    // Stable callback for ResizeObserver
    const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
        const entry = entries.find((candidate) => candidate.target === containerRef.current);
        if (entry) measureLayout(entry.contentRect.height);
    }, [measureLayout]);

    useEffect(() => {
        if (!containerRef.current || (!onPageCountChange && !onLayoutChange)) return;

        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [handleResize, onLayoutChange, onPageCountChange]);

    useEffect(() => {
        if (!containerRef.current || (!onPageCountChange && !onLayoutChange)) return;

        const frameId = window.requestAnimationFrame(() => measureLayout());
        return () => window.cancelAnimationFrame(frameId);
    }, [colorThemeId, data, measureLayout, onLayoutChange, onPageCountChange, templateId]);

    return (
        <div ref={containerRef}>
            <TemplateComponent data={data} theme={theme} />
        </div>
    );
}
