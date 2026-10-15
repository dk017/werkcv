"use client";

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import { Icon } from "@/components/app/icons";
import { CONTENT_STEPS, EDITOR_STEP_COPY, type EditorStepId } from "@/lib/editor-steps";
import { appPaths, type AppLocale } from "@/lib/app-v2-paths";

const TOP_BAR_COPY = {
    nl: { notSaved: "Niet opgeslagen", saved: "Opgeslagen", saving: "Opslaan…", toDashboard: "Naar Mijn CV's", dashboard: "Mijn CV's", steps: "Stappen", done: "klaar", upload: "Bestaand CV uploaden", preview: "Voorbeeld", previewLabel: "Voorbeeld bekijken", busy: "Bezig…", mode: "Werkwijze", form: "Formulier", document: "Op je CV", documentTitle: "Bewerk direct op je CV", documentHint: "Klik op tekst om die aan te passen" },
    en: { notSaved: "Not saved", saved: "Saved", saving: "Saving…", toDashboard: "Go to My CVs", dashboard: "My CVs", steps: "Steps", done: "done", upload: "Upload an existing CV", preview: "Preview", previewLabel: "View preview", busy: "Working…", mode: "Way of working", form: "Form", document: "On your CV", documentTitle: "Edit directly on your CV", documentHint: "Click any text to change it" },
} as const;

export type StepsSaveState = "saved" | "saving" | "problem";

// How far the bar is squeezed to fit its row: 0 spells everything out, 1 shows the save status as an
// icon, 2 tightens the step pills, 3 shows the other steps as numbers, 4 shows the
// "Formulier | Op je CV" switch as icons. The download button always keeps its label.
const MAX_DENSITY = 4;

function SaveStatus({ state, locale, savedLabel, compact }: { state: StepsSaveState; locale: AppLocale; savedLabel?: string; compact: boolean }) {
    const c = TOP_BAR_COPY[locale];
    if (state === "problem") {
        // Always spelled out: the person has to notice this one.
        return <span role="status" className="hidden whitespace-nowrap text-[13px] font-semibold text-[var(--wk-danger)] sm:inline">{c.notSaved}</span>;
    }
    const label = state === "saved" ? savedLabel ?? c.saved : c.saving;
    return (
        <span
            role="status"
            title={compact ? label : undefined}
            className={`hidden items-center gap-1.5 whitespace-nowrap text-[13px] font-semibold sm:inline-flex ${compact ? "h-10 w-6 justify-center" : ""} ${state === "saved" ? "text-[var(--wk-success)]" : "text-[var(--wk-ink-muted)]"}`}
        >
            {state === "saved" ? <Icon name="check" size={16} strokeWidth={2.2} aria-hidden="true" /> : compact ? <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-current" /> : null}
            <span className={compact ? "sr-only" : undefined}>{label}</span>
        </span>
    );
}

export default function StepsTopBar({
    activeStep,
    stepStates,
    onStep,
    saveState,
    onUpload,
    onOpenPreview,
    previewTriggerRef,
    downloadLabel,
    onDownload,
    downloadDisabled,
    isDownloading,
    priceCaption,
    completionScore,
    locale = "nl",
    mode = "form",
    onModeChange,
    dashboardHref,
    saveLabel,
    gradeLabel,
    gradeGood = false,
    onGradeClick,
}: {
    activeStep: EditorStepId;
    stepStates: Record<EditorStepId, boolean>;
    onStep: (step: EditorStepId) => void;
    saveState: StepsSaveState;
    onUpload?: () => void;
    onOpenPreview: () => void;
    previewTriggerRef: RefObject<HTMLButtonElement | null>;
    downloadLabel: string;
    onDownload: () => void;
    downloadDisabled: boolean;
    isDownloading: boolean;
    priceCaption?: string | null;
    completionScore: number;
    locale?: AppLocale;
    /** null: no dashboard link (no account); undefined: the app dashboard. */
    dashboardHref?: string | null;
    /** Replaces "Opgeslagen" (e.g. "Bewaard in deze browser" without an account). */
    saveLabel?: string;
    /** The CV-check grade ("Cijfer 8,4"); opens the checklist. */
    gradeLabel?: string | null;
    gradeGood?: boolean;
    onGradeClick?: () => void;
    /** "Formulier | Op je CV" switch (desktop). Hidden when onModeChange is not given. */
    mode?: "form" | "document";
    onModeChange?: (mode: "form" | "document") => void;
}) {
    const c = TOP_BAR_COPY[locale];
    const stepCopy = EDITOR_STEP_COPY[locale];
    const headerRef = useRef<HTMLElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const documentTitleRef = useRef<HTMLParagraphElement>(null);
    const [barWidth, setBarWidth] = useState(0);
    const [fontsReady, setFontsReady] = useState(false);
    const [edges, setEdges] = useState({ start: false, end: false });

    useEffect(() => {
        const header = headerRef.current;
        if (!header) return;
        const update = () => setBarWidth(Math.round(header.getBoundingClientRect().width));
        update();
        if (typeof ResizeObserver === "undefined") {
            window.addEventListener("resize", update);
            return () => window.removeEventListener("resize", update);
        }
        const observer = new ResizeObserver(update);
        observer.observe(header);
        return () => observer.disconnect();
    }, []);

    // Labels get wider once the web font is in.
    useEffect(() => {
        let cancelled = false;
        document.fonts?.ready.then(() => {
            if (!cancelled) setFontsReady(true);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    // Squeeze the bar one level at a time until the steps (or the "Op je CV" title) fit. Everything that
    // changes a width is in the key, so the bar starts spelled out again whenever one of them changes.
    // Layout effects run before paint, so the in-between levels never show.
    const fitKey = [barWidth, fontsReady, mode, activeStep, locale, gradeLabel, saveState, saveLabel, downloadLabel, isDownloading, priceCaption, Boolean(onUpload), Boolean(onModeChange)].join("|");
    const [fit, setFit] = useState({ key: "", density: 0 });
    const density = fit.key === fitKey ? fit.density : 0;

    const updateEdges = () => {
        const nav = navRef.current;
        const next = nav
            ? { start: nav.scrollLeft > 1, end: nav.scrollLeft + nav.clientWidth < nav.scrollWidth - 1 }
            : { start: false, end: false };
        setEdges((prev) => (prev.start === next.start && prev.end === next.end ? prev : next));
    };

    useLayoutEffect(() => {
        const target = mode === "document" ? documentTitleRef.current : navRef.current;
        if (target && density < MAX_DENSITY && target.scrollWidth > target.clientWidth + 1) {
            // Measuring layout and adjusting before paint is what layout effects are for.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFit({ key: fitKey, density: density + 1 });
            return;
        }
        if (fit.key !== fitKey) setFit({ key: fitKey, density });
        // When it still does not fit (small screens), the step list scrolls sideways: keep the current step visible.
        navRef.current?.querySelector<HTMLElement>('[aria-current="step"]')?.scrollIntoView({ block: "nearest", inline: "center" });
        updateEdges();
    }, [density, fitKey, fit.key, mode]);

    const tightSteps = density >= 2;
    const stepNumbersOnly = density >= 3;
    const modeIconsOnly = density >= 4;

    const fadeWidth = "28px";
    const navMask = edges.start || edges.end
        ? `linear-gradient(to right, ${edges.start ? `transparent, #000 ${fadeWidth}` : "#000"}, ${edges.end ? `#000 calc(100% - ${fadeWidth}), transparent` : "#000"})`
        : undefined;

    return (
        <header ref={headerRef} className="werkcv-brand z-40 shrink-0 border-b border-[var(--wk-border)] bg-[var(--wk-surface)]" style={{ minHeight: 0 }}>
            <div className="flex items-center gap-3 px-3 py-2 sm:px-5">
                {dashboardHref === null ? (
                    <span aria-hidden="true" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[var(--wk-primary)] text-[15px] font-extrabold text-white">
                        W
                    </span>
                ) : (
                    <Link
                        href={dashboardHref ?? appPaths(locale).dashboard}
                        aria-label={c.toDashboard}
                        title={c.dashboard}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[var(--wk-primary)] text-[15px] font-extrabold text-white min-[520px]:hidden"
                    >
                        W
                    </Link>
                )}

                {mode === "document" ? (
                    <div className="min-w-0 flex-1">
                        <p ref={documentTitleRef} className="truncate text-[15px] font-extrabold text-[var(--wk-ink)]">{c.documentTitle}</p>
                        <p className="truncate text-[12px] font-medium text-[var(--wk-ink-muted)]">{c.documentHint}</p>
                    </div>
                ) : (
                <nav
                    ref={navRef}
                    aria-label={c.steps}
                    onScroll={updateEdges}
                    className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    style={navMask ? { maskImage: navMask, WebkitMaskImage: navMask } : undefined}
                >
                    <ol className={`flex w-max items-center xl:mx-auto ${tightSteps ? "gap-0.5" : "gap-1"}`}>
                        {CONTENT_STEPS.map((step, index) => {
                            const current = step === activeStep;
                            const done = stepStates[step];
                            return (
                                <li key={step}>
                                    <button
                                        type="button"
                                        onClick={() => onStep(step)}
                                        aria-current={current ? "step" : undefined}
                                        title={current ? undefined : stepCopy[step].label}
                                        className={`inline-flex min-h-10 items-center whitespace-nowrap rounded-full text-sm ${tightSteps ? "gap-1.5 px-2" : "gap-2 px-2.5"} font-bold transition-colors ${current
                                            ? "bg-[var(--wk-primary)] text-white"
                                            : "text-[#3c4744] hover:bg-[var(--wk-surface-subtle)]"}`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`inline-flex h-[22px] w-[22px] items-center justify-center rounded-full text-xs font-extrabold ${current
                                                ? "bg-white text-[var(--wk-primary)]"
                                                : done
                                                    ? "bg-[var(--wk-accent-soft)] text-[#1f5c43]"
                                                    : "border-[1.5px] border-[var(--wk-border-strong)] text-[var(--wk-ink-muted)]"}`}
                                        >
                                            {done && !current ? <Icon name="check" size={13} strokeWidth={2.6} /> : index + 1}
                                        </span>
                                        <span className={current ? "" : stepNumbersOnly ? "sr-only" : "sr-only xl:not-sr-only"}>{stepCopy[step].label}</span>
                                        {done && !current ? <span className="sr-only"> ({c.done})</span> : null}
                                    </button>
                                </li>
                            );
                        })}
                        <li aria-hidden="true" className={`h-6 w-px bg-[var(--wk-border)] ${tightSteps ? "mx-1" : "mx-1.5"}`} />
                        <li>
                            <button
                                type="button"
                                onClick={() => onStep("afronden")}
                                aria-current={activeStep === "afronden" ? "step" : undefined}
                                className={`inline-flex min-h-10 items-center whitespace-nowrap rounded-full text-sm font-bold transition-colors ${tightSteps ? "px-3" : "px-3.5"} ${activeStep === "afronden"
                                    ? "bg-[var(--wk-primary)] text-white"
                                    : "text-[#3c4744] hover:bg-[var(--wk-surface-subtle)]"}`}
                            >
                                {stepCopy.afronden.label}
                            </button>
                        </li>
                    </ol>
                </nav>
                )}

                {onModeChange ? (
                    <div role="radiogroup" aria-label={c.mode} className="hidden shrink-0 items-center rounded-full border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-1 lg:inline-flex">
                        {(["form", "document"] as const).map((option) => (
                            <button
                                key={option}
                                type="button"
                                role="radio"
                                aria-checked={mode === option}
                                onClick={() => onModeChange(option)}
                                title={modeIconsOnly ? (option === "form" ? c.form : c.document) : undefined}
                                className={`inline-flex min-h-9 items-center gap-1.5 whitespace-nowrap rounded-full text-[13px] font-bold transition-colors ${modeIconsOnly ? "px-2.5" : "px-3.5"} ${mode === option
                                    ? "bg-[var(--wk-surface)] text-[var(--wk-primary)] shadow-sm"
                                    : "text-[var(--wk-ink-muted)] hover:text-[var(--wk-ink)]"}`}
                            >
                                <Icon name={option === "form" ? "menu" : "pencil"} size={15} aria-hidden="true" />
                                <span className={modeIconsOnly ? "sr-only" : undefined}>{option === "form" ? c.form : c.document}</span>
                            </button>
                        ))}
                    </div>
                ) : null}

                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    {gradeLabel && onGradeClick ? (
                        <button
                            type="button"
                            onClick={onGradeClick}
                            className={`inline-flex min-h-9 shrink-0 items-center rounded-full px-3 text-[13px] font-extrabold ${gradeGood ? "bg-[var(--wk-success-soft)] text-[var(--wk-success)]" : "bg-[var(--wk-highlight-soft)] text-[var(--wk-warning)]"}`}
                        >
                            {gradeLabel}
                        </button>
                    ) : null}
                    <SaveStatus state={saveState} locale={locale} savedLabel={saveLabel} compact={density >= 1} />
                    {onUpload ? (
                        <button
                            type="button"
                            onClick={onUpload}
                            aria-label={c.upload}
                            title={c.upload}
                            className="hidden h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--wk-border)] text-[#3c4744] hover:bg-[var(--wk-surface-subtle)] md:inline-flex"
                        >
                            <Icon name="upload" />
                        </button>
                    ) : null}
                    <button
                        type="button"
                        ref={previewTriggerRef}
                        onClick={onOpenPreview}
                        aria-label={c.previewLabel}
                        className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-[var(--wk-border)] px-2.5 text-sm font-bold text-[#3c4744] hover:bg-[var(--wk-surface-subtle)] lg:hidden"
                    >
                        <Icon name="eye" />
                        <span className="hidden sm:inline">{c.preview}</span>
                    </button>
                    <div className="flex flex-col items-end">
                        <button
                            type="button"
                            onClick={onDownload}
                            disabled={downloadDisabled}
                            aria-label={isDownloading ? c.busy : downloadLabel}
                            className="inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-[10px] bg-[var(--wk-primary)] px-3 text-sm font-bold text-white hover:bg-[var(--wk-primary-hover)] disabled:opacity-50 sm:px-4"
                        >
                            <Icon name="download" size={17} strokeWidth={2} />
                            <span className="hidden sm:inline">{isDownloading ? c.busy : downloadLabel}</span>
                        </button>
                        {priceCaption ? <span className="mt-0.5 hidden whitespace-nowrap text-[11px] font-medium text-[var(--wk-ink-muted)] md:block">{priceCaption}</span> : null}
                    </div>
                </div>
            </div>
            <div aria-hidden="true" className="h-1 bg-[#e6ebe7]">
                <div className="h-1 bg-[var(--wk-accent)] transition-[width] duration-300" style={{ width: `${Math.max(4, completionScore)}%` }} />
            </div>
        </header>
    );
}
