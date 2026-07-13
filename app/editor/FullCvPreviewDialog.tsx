"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { CVData } from "@/lib/cv";
import { track, type FullPreviewSource } from "@/lib/analytics";
import { cvDownloadPrice } from "@/lib/site-content";
import type { UiLanguage } from "@/lib/ui-language";
import PdfPagedPreview from "./PdfPagedPreview";
import PreviewDesignPanel from "./PreviewDesignPanel";
import { A4_HEIGHT_PX, A4_WIDTH_PX } from "./ScaledCvPreview";

type FullPreviewCloseMethod = "x" | "back_to_editor" | "escape" | "browser_back";
type ZoomMode = "fit" | "custom";

interface FullCvPreviewDialogProps {
  cvId: string;
  data: CVData;
  templateId: string;
  colorThemeId: string;
  completionScore: number;
  isReady: boolean;
  remainingSteps: number;
  isSaved: boolean;
  isSaving: boolean;
  isDownloading: boolean;
  pageCount: number;
  source: FullPreviewSource;
  uiLanguage: UiLanguage;
  onClose: () => void;
  onContinueEditing: () => void;
  onDownload: () => void | Promise<void>;
  onPageCountChange: (pageCount: number) => void;
  onSelectTemplate: (templateId: string, defaultThemeId: string) => void | Promise<void>;
  onSelectTheme: (themeId: string) => void | Promise<void>;
}

const MIN_CUSTOM_ZOOM = 0.5;
const MAX_CUSTOM_ZOOM = 1.25;
const ZOOM_STEP = 0.1;
const MIN_DESKTOP_FIT_ZOOM = 0.72;
const MAX_DESKTOP_FIT_ZOOM = 0.9;

function formatPrice(uiLanguage: UiLanguage) {
  return uiLanguage === "en"
    ? cvDownloadPrice.display.replace(",", ".")
    : cvDownloadPrice.display;
}

export default function FullCvPreviewDialog({
  cvId,
  data,
  templateId,
  colorThemeId,
  completionScore,
  isReady,
  remainingSteps,
  isSaved,
  isSaving,
  isDownloading,
  pageCount,
  source,
  uiLanguage,
  onClose,
  onContinueEditing,
  onDownload,
  onPageCountChange,
  onSelectTemplate,
  onSelectTheme,
}: FullCvPreviewDialogProps) {
  const isEnglish = uiLanguage === "en";
  const dialogRef = useRef<HTMLDialogElement>(null);
  const desktopCloseButtonRef = useRef<HTMLButtonElement>(null);
  const mobileCloseButtonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const designButtonRef = useRef<HTMLButtonElement>(null);
  const historyMarkerRef = useRef(`full-preview-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const hasHistoryEntryRef = useRef(false);
  const openedAtRef = useRef(Date.now());
  const closedRef = useRef(false);
  const designOpenedRef = useRef(false);
  const templateChangedRef = useRef(false);
  const downloadClickedRef = useRef(false);
  const maxPageViewedRef = useRef(1);
  const scrollFrameRef = useRef<number | null>(null);
  const [isDesignOpen, setIsDesignOpen] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [zoomMode, setZoomMode] = useState<ZoomMode>("fit");
  const [scale, setScale] = useState(0.68);
  const [hasMounted, setHasMounted] = useState(false);

  const eventContext = useMemo(() => ({
    cvId,
    source,
    uiLanguage,
    templateId,
    completionScore,
    isReady,
    pageCount,
  }), [completionScore, cvId, isReady, pageCount, source, templateId, uiLanguage]);

  const trackClose = useCallback((closeMethod: FullPreviewCloseMethod) => {
    if (closedRef.current) return;
    closedRef.current = true;
    track("full_preview_closed", {
      ...eventContext,
      closeMethod,
      durationMs: Date.now() - openedAtRef.current,
      maxPageViewed: maxPageViewedRef.current,
      finalZoomMode: zoomMode,
      designOpened: designOpenedRef.current,
      templateChanged: templateChangedRef.current,
      downloadClicked: downloadClickedRef.current,
    });
  }, [eventContext, zoomMode]);

  const closePreview = useCallback((closeMethod: FullPreviewCloseMethod) => {
    trackClose(closeMethod);
    if (
      closeMethod !== "browser_back"
      && hasHistoryEntryRef.current
      && window.history.state?.werkcvFullPreview === historyMarkerRef.current
    ) {
      hasHistoryEntryRef.current = false;
      window.history.back();
    }
    onClose();
  }, [onClose, trackClose]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    requestAnimationFrame(() => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      (isDesktop ? desktopCloseButtonRef.current : mobileCloseButtonRef.current)?.focus();
    });
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [hasMounted]);

  useEffect(() => {
    if (!hasMounted) return;
    track("full_preview_opened", eventContext);

    window.history.pushState(
      {
        ...window.history.state,
        werkcvFullPreview: historyMarkerRef.current,
      },
      "",
    );
    hasHistoryEntryRef.current = true;

    const handlePopState = () => {
      if (!hasHistoryEntryRef.current) return;
      hasHistoryEntryRef.current = false;
      trackClose("browser_back");
      onClose();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
    // Opening context is intentionally captured once per dialog mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMounted]);

  const scrollToPage = useCallback((page: number, smooth = true) => {
    const target = canvasRef.current?.querySelector<HTMLElement>(`[data-preview-page="${page}"]`);
    if (!target) return;
    target.scrollIntoView({
      behavior: smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "auto",
      block: "center",
    });
  }, []);

  const updateActivePage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasRect = canvas.getBoundingClientRect();
    const viewportCenter = canvasRect.top + canvasRect.height / 2;
    const pages = canvas.querySelectorAll<HTMLElement>("[data-preview-page]");
    let nearestPage = 1;
    let nearestDistance = Number.POSITIVE_INFINITY;

    pages.forEach((page, index) => {
      const pageRect = page.getBoundingClientRect();
      const pageCenter = pageRect.top + pageRect.height / 2;
      const distance = Math.abs(pageCenter - viewportCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestPage = index + 1;
      }
    });

    maxPageViewedRef.current = Math.max(maxPageViewedRef.current, nearestPage);
    setActivePage(nearestPage);
  }, []);

  const handleCanvasScroll = useCallback(() => {
    if (scrollFrameRef.current !== null) return;
    scrollFrameRef.current = requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      updateActivePage();
    });
  }, [updateActivePage]);

  const fitPreview = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    const horizontalPadding = isMobile ? 24 : 96;
    const verticalPadding = isMobile ? 32 : 48;
    const widthScale = (canvas.clientWidth - horizontalPadding) / A4_WIDTH_PX;
    const heightScale = (canvas.clientHeight - verticalPadding) / A4_HEIGHT_PX;
    const nextScale = isMobile
      ? widthScale
      : Math.min(
          widthScale,
          Math.max(heightScale, MIN_DESKTOP_FIT_ZOOM),
          MAX_DESKTOP_FIT_ZOOM,
        );

    if (Number.isFinite(nextScale)) {
      setScale(Math.max(0.32, nextScale));
      setZoomMode("fit");
    }
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    if (zoomMode === "fit") fitPreview();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => {
      if (zoomMode === "fit") fitPreview();
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [fitPreview, hasMounted, isDesignOpen, zoomMode]);

  useEffect(() => {
    setActivePage((current) => Math.min(current, Math.max(1, pageCount)));
  }, [pageCount]);

  useEffect(() => () => {
    if (scrollFrameRef.current !== null) cancelAnimationFrame(scrollFrameRef.current);
  }, []);

  const changeZoom = (direction: -1 | 1) => {
    setZoomMode("custom");
    setScale((current) => {
      const startingScale = Math.max(MIN_CUSTOM_ZOOM, current);
      return Math.min(
        MAX_CUSTOM_ZOOM,
        Math.max(MIN_CUSTOM_ZOOM, startingScale + direction * ZOOM_STEP),
      );
    });
    requestAnimationFrame(() => scrollToPage(activePage, false));
  };

  const openDesign = () => {
    designOpenedRef.current = true;
    track("full_preview_design_opened", {
      ...eventContext,
      activePage,
      zoomMode,
    });
    setIsDesignOpen(true);
  };

  const closeDesign = () => {
    setIsDesignOpen(false);
    requestAnimationFrame(() => designButtonRef.current?.focus());
  };

  const handleTemplateSelect = async (nextTemplateId: string, defaultThemeId: string) => {
    if (nextTemplateId !== templateId) {
      templateChangedRef.current = true;
      track("full_preview_template_selected", {
        ...eventContext,
        previousTemplateId: templateId,
        templateId: nextTemplateId,
      });
    }
    await onSelectTemplate(nextTemplateId, defaultThemeId);
  };

  const handleThemeSelect = async (nextThemeId: string) => {
    if (nextThemeId !== colorThemeId) {
      track("full_preview_color_changed", {
        ...eventContext,
        previousThemeId: colorThemeId,
        themeId: nextThemeId,
      });
    }
    await onSelectTheme(nextThemeId);
  };

  const handlePrimaryAction = async () => {
    if (!isReady) {
      closePreview("back_to_editor");
      requestAnimationFrame(onContinueEditing);
      return;
    }

    downloadClickedRef.current = true;
    track("full_preview_download_clicked", {
      ...eventContext,
      durationMs: Date.now() - openedAtRef.current,
      maxPageViewed: maxPageViewedRef.current,
      designOpened: designOpenedRef.current,
      templateChanged: templateChangedRef.current,
    });
    await onDownload();
  };

  const saveLabel = isSaving || !isSaved
    ? isEnglish ? "Saving..." : "Opslaan..."
    : isEnglish ? "Saved" : "Opgeslagen";
  const primaryLabel = isReady
    ? isEnglish ? "Download CV" : "CV downloaden"
    : isEnglish
      ? `Finish CV · ${remainingSteps} ${remainingSteps === 1 ? "step" : "steps"} left`
      : `CV afronden · nog ${remainingSteps} ${remainingSteps === 1 ? "stap" : "stappen"}`;
  const pageLabel = isEnglish
    ? `${activePage} of ${pageCount}`
    : `${activePage} van ${pageCount}`;
  const mobilePageLabel = isEnglish
    ? `Page ${activePage} of ${pageCount}`
    : `Pagina ${activePage} van ${pageCount}`;
  const price = formatPrice(uiLanguage);
  const priceCopy = isEnglish
    ? `One-time ${price} incl. VAT · No subscription`
    : `Eenmalig ${price} incl. btw · Geen abonnement`;

  if (!hasMounted || typeof document === "undefined") return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden border-0 bg-white p-0 text-slate-900 backdrop:bg-slate-950/55 lg:inset-4 lg:h-[calc(100dvh-2rem)] lg:w-[calc(100vw-2rem)] lg:rounded-lg lg:border lg:border-white/30 lg:shadow-2xl"
      aria-label={isEnglish ? "Review your CV" : "Controleer je CV"}
      onCancel={(event) => {
        event.preventDefault();
        if (isDesignOpen) {
          closeDesign();
          return;
        }
        closePreview("escape");
      }}
    >
      <div className="relative flex h-full min-h-0 flex-col bg-white">
        <header className="hidden h-[72px] shrink-0 grid-cols-[minmax(180px,1fr)_auto_minmax(560px,1fr)] items-center gap-4 border-b border-slate-200 bg-white px-5 lg:grid">
          <div className="flex min-w-0 items-center gap-5">
            <span className="hidden shrink-0 text-xl font-bold text-slate-900 xl:inline">
              Werk<span className="rounded-sm bg-[#4ECDC4] px-1">CV</span>.nl
            </span>
            <button
              ref={desktopCloseButtonRef}
              type="button"
              onClick={() => closePreview("back_to_editor")}
              className="inline-flex h-10 items-center gap-2 rounded-md px-2 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <CloseIcon />
              {isEnglish ? "Back to editor" : "Terug naar editor"}
            </button>
          </div>

          <div className="min-w-40 text-center">
            <h1 className="text-base font-bold text-slate-950">
              {isEnglish ? "Review your CV" : "Controleer je CV"}
            </h1>
            <p className={`mt-1 inline-flex items-center gap-1 text-[11px] font-bold ${
              isSaved && !isSaving ? "text-emerald-700" : "text-slate-500"
            }`}>
              {isSaved && !isSaving ? <CheckIcon /> : <SavingIcon />}
              {saveLabel}
            </p>
          </div>

          <div className="flex min-w-0 items-center justify-end gap-2">
            <button
              ref={designButtonRef}
              type="button"
              onClick={isDesignOpen ? closeDesign : openDesign}
              className={`inline-flex h-10 items-center gap-2 rounded-md border px-3 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                isDesignOpen
                  ? "border-blue-600 bg-blue-100 text-blue-800"
                  : "border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
              aria-expanded={isDesignOpen}
            >
              <DesignIcon />
              {isEnglish ? "Review design" : "Ontwerp bekijken"}
            </button>

            <div className="flex items-center gap-1" aria-label={isEnglish ? "Zoom controls" : "Zoomknoppen"}>
              <ToolbarIconButton
                label={isEnglish ? "Zoom out" : "Uitzoomen"}
                onClick={() => changeZoom(-1)}
                disabled={zoomMode === "custom" && scale <= MIN_CUSTOM_ZOOM}
              >
                <MinusIcon />
              </ToolbarIconButton>
              <button
                type="button"
                onClick={fitPreview}
                className="h-10 rounded-md border border-slate-200 bg-white px-3 text-xs font-bold text-slate-600 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {isEnglish ? "Fit" : "Passend"}
              </button>
              <ToolbarIconButton
                label={isEnglish ? "Zoom in" : "Inzoomen"}
                onClick={() => changeZoom(1)}
                disabled={zoomMode === "custom" && scale >= MAX_CUSTOM_ZOOM}
              >
                <PlusIcon />
              </ToolbarIconButton>
            </div>

            <span className={`min-w-14 text-center text-xs font-bold ${
              pageCount > 2 ? "text-amber-700" : "text-slate-500"
            }`}>
              {pageLabel}
            </span>

            <div className="w-[196px] text-center">
              <button
                type="button"
                onClick={handlePrimaryAction}
                disabled={isDownloading || isSaving}
                className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border px-4 text-sm font-bold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                  isReady
                    ? "border-emerald-700 bg-emerald-600 hover:bg-emerald-700"
                    : "border-slate-900 bg-slate-900 hover:bg-slate-800"
                }`}
              >
                {isReady ? <DownloadIcon /> : null}
                {isDownloading ? isEnglish ? "Working..." : "Bezig..." : primaryLabel}
              </button>
              {isReady ? <p className="mt-1 whitespace-nowrap text-[9px] font-medium text-slate-500">{priceCopy}</p> : null}
            </div>
          </div>
        </header>

        <header className="shrink-0 border-b border-slate-200 bg-white pt-[env(safe-area-inset-top)] lg:hidden">
          <div className="grid h-14 grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-2 px-2">
            <button
              ref={mobileCloseButtonRef}
              type="button"
              onClick={() => closePreview("x")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={isEnglish ? "Back to editor" : "Terug naar editor"}
              title={isEnglish ? "Back to editor" : "Terug naar editor"}
            >
              <CloseIcon />
            </button>
            <div className="min-w-0 text-center">
              <h1 className="truncate text-sm font-bold text-slate-950">
                {isEnglish ? "Review CV" : "CV controleren"}
              </h1>
              <p className={`mt-0.5 inline-flex items-center gap-1 text-[10px] font-bold ${
                isSaved && !isSaving ? "text-emerald-700" : "text-slate-500"
              }`}>
                {isSaved && !isSaving ? <CheckIcon /> : <SavingIcon />}
                {saveLabel}
              </p>
            </div>
            <button
              type="button"
              onClick={openDesign}
              className="inline-flex h-11 items-center gap-2 rounded-md border border-blue-300 bg-blue-50 px-3 text-xs font-bold text-blue-700 hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <DesignIcon />
              <span className="hidden min-[370px]:inline">
                {isEnglish ? "Review design" : "Ontwerp bekijken"}
              </span>
            </button>
          </div>
        </header>

        <div className="flex h-[52px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-3 lg:hidden">
          <span className={`text-xs font-bold ${pageCount > 2 ? "text-amber-700" : "text-slate-600"}`}>
            {mobilePageLabel}
          </span>
          <div className="flex items-center gap-1" aria-label={isEnglish ? "Zoom controls" : "Zoomknoppen"}>
            <ToolbarIconButton
              label={isEnglish ? "Zoom out" : "Uitzoomen"}
              onClick={() => changeZoom(-1)}
              disabled={zoomMode === "custom" && scale <= MIN_CUSTOM_ZOOM}
              mobile
            >
              <MinusIcon />
            </ToolbarIconButton>
            <button
              type="button"
              onClick={fitPreview}
              className="h-11 min-w-12 rounded-md px-2 text-xs font-bold text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {isEnglish ? "Fit" : "Passend"}
            </button>
            <ToolbarIconButton
              label={isEnglish ? "Zoom in" : "Inzoomen"}
              onClick={() => changeZoom(1)}
              disabled={zoomMode === "custom" && scale >= MAX_CUSTOM_ZOOM}
              mobile
            >
              <PlusIcon />
            </ToolbarIconButton>
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 bg-[#edf7f6]">
          <div
            ref={canvasRef}
            onScroll={handleCanvasScroll}
            className="min-w-0 flex-1 overflow-auto overscroll-contain px-3 py-5 lg:px-12 lg:py-6"
          >
            <div className="mx-auto flex w-max min-w-full justify-center">
              <PdfPagedPreview
                cvId={cvId}
                data={data}
                templateId={templateId}
                colorThemeId={colorThemeId}
                scale={scale}
                pageCount={pageCount}
                uiLanguage={uiLanguage}
                onPageCountChange={onPageCountChange}
              />
            </div>
          </div>

          {pageCount > 1 ? (
            <nav className={`absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-md border border-slate-200 bg-white/95 p-1 shadow-sm lg:grid ${
              isDesignOpen ? "right-[360px]" : "right-4"
            }`} aria-label={isEnglish ? "Page navigation" : "Paginanavigatie"}>
              <ToolbarIconButton
                label={isEnglish ? "Previous page" : "Vorige pagina"}
                onClick={() => scrollToPage(Math.max(1, activePage - 1))}
                disabled={activePage <= 1}
              >
                <UpIcon />
              </ToolbarIconButton>
              <span className="py-1 text-center text-[10px] font-bold leading-tight text-slate-600">
                {activePage}<br />{isEnglish ? "of" : "van"}<br />{pageCount}
              </span>
              <ToolbarIconButton
                label={isEnglish ? "Next page" : "Volgende pagina"}
                onClick={() => scrollToPage(Math.min(pageCount, activePage + 1))}
                disabled={activePage >= pageCount}
              >
                <DownIcon />
              </ToolbarIconButton>
            </nav>
          ) : null}

          {isDesignOpen ? (
            <aside className="hidden h-full w-[344px] shrink-0 border-l border-slate-200 lg:block">
              <PreviewDesignPanel
                data={data}
                currentTemplateId={templateId}
                currentThemeId={colorThemeId}
                uiLanguage={uiLanguage}
                onClose={closeDesign}
                onSelectTemplate={handleTemplateSelect}
                onSelectTheme={handleThemeSelect}
              />
            </aside>
          ) : null}
        </div>

        {pageCount > 2 ? (
          <div className="shrink-0 border-t border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-bold text-amber-800">
            {isEnglish
              ? `${pageCount} pages - review the length`
              : `${pageCount} pagina's - controleer de lengte`}
          </div>
        ) : null}

        <footer className="shrink-0 border-t border-slate-200 bg-white px-3 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2 shadow-[0_-6px_18px_rgba(15,23,42,0.08)] lg:hidden">
          <button
            type="button"
            onClick={handlePrimaryAction}
            disabled={isDownloading || isSaving}
            className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60 ${
              isReady
                ? "border-emerald-700 bg-emerald-600"
                : "border-slate-900 bg-slate-900"
            }`}
          >
            {isReady ? <DownloadIcon /> : null}
            {isDownloading ? isEnglish ? "Working..." : "Bezig..." : primaryLabel}
          </button>
          {isReady ? <p className="mt-1.5 text-center text-[10px] font-medium text-slate-500">{priceCopy}</p> : null}
        </footer>

        {isDesignOpen ? (
          <div className="absolute inset-0 z-30 bg-white pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] lg:hidden">
            <div className="h-full">
              <PreviewDesignPanel
                data={data}
                currentTemplateId={templateId}
                currentThemeId={colorThemeId}
                uiLanguage={uiLanguage}
                onClose={closeDesign}
                onSelectTemplate={handleTemplateSelect}
                onSelectTheme={handleThemeSelect}
              />
            </div>
          </div>
        ) : null}

        <span className="sr-only" aria-live="polite">
          {mobilePageLabel}
        </span>
      </div>
    </dialog>,
    document.body,
  );
}

function ToolbarIconButton({
  label,
  onClick,
  disabled,
  mobile = false,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  mobile?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
        mobile ? "h-11 w-11" : "h-10 w-10 border border-slate-200 bg-white"
      }`}
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

function CloseIcon() {
  return <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" /></svg>;
}

function CheckIcon() {
  return <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="m5 12 4 4L19 6" /></svg>;
}

function SavingIcon() {
  return <svg className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeWidth={2} d="M20 12a8 8 0 1 1-2.34-5.66" /></svg>;
}

function DesignIcon() {
  return <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>;
}

function DownloadIcon() {
  return <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" /></svg>;
}

function MinusIcon() {
  return <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M8 12h8" /></svg>;
}

function PlusIcon() {
  return <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M12 8v8M8 12h8" /></svg>;
}

function UpIcon() {
  return <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 15 5-5 5 5" /></svg>;
}

function DownIcon() {
  return <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 9 5 5 5-5" /></svg>;
}
