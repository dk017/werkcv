"use client";

import { useEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import { Icon } from "@/components/app/icons";
import { CONTENT_STEPS, EDITOR_STEP_COPY, type EditorStepId } from "@/lib/editor-steps";
import { appPaths, type AppLocale } from "@/lib/app-v2-paths";

const TOP_BAR_COPY = {
    nl: { notSaved: "Niet opgeslagen", saved: "Opgeslagen", saving: "Opslaan…", toDashboard: "Naar Mijn CV's", dashboard: "Mijn CV's", steps: "Stappen", done: "klaar", upload: "Bestaand CV uploaden", preview: "Voorbeeld", previewLabel: "Voorbeeld bekijken", busy: "Bezig…" },
    en: { notSaved: "Not saved", saved: "Saved", saving: "Saving…", toDashboard: "Go to My CVs", dashboard: "My CVs", steps: "Steps", done: "done", upload: "Upload an existing CV", preview: "Preview", previewLabel: "View preview", busy: "Working…" },
} as const;

export type StepsSaveState = "saved" | "saving" | "problem";

function SaveStatus({ state, locale }: { state: StepsSaveState; locale: AppLocale }) {
    const c = TOP_BAR_COPY[locale];
    if (state === "problem") {
        return <span role="status" className="hidden text-[13px] font-semibold text-[var(--wk-danger)] sm:inline">{c.notSaved}</span>;
    }
    return (
        <span role="status" className={`hidden items-center gap-1.5 text-[13px] font-semibold sm:inline-flex ${state === "saved" ? "text-[var(--wk-success)]" : "text-[var(--wk-ink-muted)]"}`}>
            {state === "saved" ? <Icon name="check" size={16} strokeWidth={2.2} /> : null}
            {state === "saved" ? c.saved : c.saving}
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
}) {
    const c = TOP_BAR_COPY[locale];
    const stepCopy = EDITOR_STEP_COPY[locale];
    const navRef = useRef<HTMLElement>(null);

    // On narrow screens the step list scrolls sideways: keep the current step visible.
    useEffect(() => {
        const current = navRef.current?.querySelector<HTMLElement>('[aria-current="step"]');
        current?.scrollIntoView({ block: "nearest", inline: "center" });
    }, [activeStep]);

    return (
        <header className="werkcv-brand z-40 shrink-0 border-b border-[var(--wk-border)] bg-[var(--wk-surface)]" style={{ minHeight: 0 }}>
            <div className="flex items-center gap-3 px-3 py-2 sm:px-5">
                <Link
                    href={appPaths(locale).dashboard}
                    aria-label={c.toDashboard}
                    title={c.dashboard}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[var(--wk-primary)] text-[15px] font-extrabold text-white"
                >
                    W
                </Link>

                <nav ref={navRef} aria-label={c.steps} className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none]">
                    <ol className="flex w-max items-center gap-1 xl:mx-auto">
                        {CONTENT_STEPS.map((step, index) => {
                            const current = step === activeStep;
                            const done = stepStates[step];
                            return (
                                <li key={step}>
                                    <button
                                        type="button"
                                        onClick={() => onStep(step)}
                                        aria-current={current ? "step" : undefined}
                                        className={`inline-flex min-h-10 items-center gap-2 rounded-full px-2.5 text-sm font-bold transition-colors ${current
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
                                        <span className={current ? "" : "sr-only xl:not-sr-only"}>{stepCopy[step].label}</span>
                                        {done && !current ? <span className="sr-only"> ({c.done})</span> : null}
                                    </button>
                                </li>
                            );
                        })}
                        <li aria-hidden="true" className="mx-1.5 h-6 w-px bg-[var(--wk-border)]" />
                        <li>
                            <button
                                type="button"
                                onClick={() => onStep("afronden")}
                                aria-current={activeStep === "afronden" ? "step" : undefined}
                                className={`inline-flex min-h-10 items-center rounded-full px-3.5 text-sm font-bold transition-colors ${activeStep === "afronden"
                                    ? "bg-[var(--wk-primary)] text-white"
                                    : "text-[#3c4744] hover:bg-[var(--wk-surface-subtle)]"}`}
                            >
                                {stepCopy.afronden.label}
                            </button>
                        </li>
                    </ol>
                </nav>

                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    <SaveStatus state={saveState} locale={locale} />
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
                            className="inline-flex min-h-10 items-center gap-2 rounded-[10px] bg-[var(--wk-primary)] px-3 text-sm font-bold text-white hover:bg-[var(--wk-primary-hover)] disabled:opacity-50 sm:px-4"
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
