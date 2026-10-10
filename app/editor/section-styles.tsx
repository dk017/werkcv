"use client";

import { createContext, useContext, type ReactNode } from "react";

// Class names used by the section forms in sections.tsx. The classic editor
// keeps its original look; the stepped editor (app v2) uses the WerkCV
// brand tokens, which its form pane provides via .werkcv-brand.
export type SectionStyles = {
    card: string;
    headerRow: string;
    heading: string;
    headingChip: string;
    addButton: string;
    label: string;
    labelBare: string;
    input: string;
    item: string;
    removeAbs: string;
    row: string;
    rowStart: string;
    emptySmall: string;
    emptyLarge: string;
    emptyTall: string;
    removeInline: string;
    removeInlineAlt: string;
    smallAdd: string;
    assist: string;
};

export const CLASSIC_SECTION_STYLES: SectionStyles = {
    card: "bg-white border border-slate-200 rounded-2xl p-6 shadow-sm",
    headerRow: "flex justify-between items-center mb-4",
    heading: "text-lg font-semibold text-slate-900",
    headingChip: "bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 rounded-md inline-block",
    addButton: "text-sm bg-emerald-600 text-white font-semibold px-3 py-1.5 rounded-md border border-emerald-700 hover:bg-emerald-700 transition-colors",
    label: "block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5",
    labelBare: "block text-[11px] font-semibold text-slate-500 uppercase tracking-wide",
    input: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100",
    item: "relative bg-slate-50 p-4 border border-slate-200 rounded-xl group",
    removeAbs: "absolute top-2 right-2 bg-white text-rose-700 font-semibold px-2 py-1 text-xs border border-rose-200 rounded-md opacity-0 group-hover:opacity-100 hover:bg-rose-50 transition-colors",
    row: "flex gap-3 items-center bg-slate-50 p-3 border border-slate-200 rounded-xl",
    rowStart: "flex gap-2 items-start bg-slate-50 p-3 border border-slate-200 rounded-xl",
    emptySmall: "text-sm text-slate-600 font-medium bg-slate-50 p-3 border border-dashed border-slate-300 rounded-xl",
    emptyLarge: "text-center py-6 bg-slate-50 border border-dashed border-slate-300 text-slate-600 font-medium text-sm rounded-xl",
    emptyTall: "text-center py-8 bg-slate-50 border border-dashed border-slate-300 text-slate-600 font-medium text-sm rounded-xl",
    removeInline: "bg-white text-rose-700 font-semibold px-2 py-1 text-xs border border-rose-200 rounded-md hover:bg-rose-50 transition-colors mt-1",
    removeInlineAlt: "bg-red-400 text-black font-black px-2 py-2 text-xs border border-slate-300 hover:bg-red-500 transition-all",
    smallAdd: "text-xs bg-sky-100 text-sky-900 font-semibold px-2 py-1 rounded-md border border-sky-300 hover:bg-sky-200 transition-colors",
    assist: "rounded-lg border px-3 py-2 text-sm",
};

const STEPS_REMOVE = "inline-flex min-h-8 items-center rounded-lg px-2 text-xs font-bold text-[var(--wk-danger)] hover:bg-[var(--wk-danger-soft)]";

export function stepsSectionStyles({ showHeading }: { showHeading: boolean }): SectionStyles {
    return {
        card: "flex flex-col",
        headerRow: "mb-3 flex items-center justify-between gap-3",
        heading: showHeading ? "text-[17px] font-extrabold text-[var(--wk-ink)]" : "sr-only",
        headingChip: "",
        addButton: "ml-auto inline-flex min-h-10 items-center rounded-full border border-[var(--wk-border-strong)] bg-[var(--wk-surface)] px-4 text-sm font-bold text-[var(--wk-primary)] transition-colors hover:border-[var(--wk-primary)] hover:bg-[var(--wk-surface-subtle)]",
        label: "mb-1.5 block text-[13px] font-bold text-[var(--wk-ink)]",
        labelBare: "block text-[13px] font-bold text-[var(--wk-ink)]",
        input: "w-full rounded-[10px] border border-[var(--wk-border-strong)] bg-white px-3 py-2.5 text-[15px] text-[var(--wk-ink)] placeholder:text-[#8a9490] outline-none focus:border-[var(--wk-focus)] focus:ring-2 focus:ring-[var(--wk-accent-soft)]",
        item: "relative rounded-[14px] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-4 pt-6 sm:p-5 sm:pt-6",
        removeAbs: "absolute -top-3 right-4 inline-flex h-7 items-center rounded-full border border-[var(--wk-border)] bg-white px-2.5 text-xs font-bold text-[var(--wk-danger)] hover:bg-[var(--wk-danger-soft)]",
        row: "flex items-center gap-3 rounded-xl border border-[var(--wk-border)] bg-[var(--wk-surface)] p-3",
        rowStart: "flex items-start gap-2 rounded-xl border border-[var(--wk-border)] bg-[var(--wk-surface)] p-3",
        emptySmall: "rounded-[14px] border-2 border-dashed border-[var(--wk-border-strong)] px-4 py-5 text-center text-sm font-medium text-[var(--wk-ink-muted)]",
        emptyLarge: "rounded-[14px] border-2 border-dashed border-[var(--wk-border-strong)] px-4 py-6 text-center text-sm font-medium text-[var(--wk-ink-muted)]",
        emptyTall: "rounded-[14px] border-2 border-dashed border-[var(--wk-border-strong)] px-4 py-8 text-center text-sm font-medium text-[var(--wk-ink-muted)]",
        removeInline: `mt-1 ${STEPS_REMOVE}`,
        removeInlineAlt: STEPS_REMOVE,
        smallAdd: "inline-flex min-h-8 items-center rounded-full border border-[var(--wk-border)] bg-white px-3 text-xs font-bold text-[var(--wk-primary)] hover:bg-[var(--wk-surface-subtle)]",
        assist: "inline-flex min-h-10 items-center rounded-full border border-[var(--wk-border)] bg-white px-3.5 text-[13px] font-bold text-[var(--wk-ink)] transition-colors hover:border-[var(--wk-primary)] hover:bg-[var(--wk-surface-subtle)] disabled:opacity-50",
    };
}

const SectionStylesContext = createContext<SectionStyles>(CLASSIC_SECTION_STYLES);

export function SectionStylesProvider({ value, children }: { value: SectionStyles; children: ReactNode }) {
    return <SectionStylesContext.Provider value={value}>{children}</SectionStylesContext.Provider>;
}

export function useSectionStyles(): SectionStyles {
    return useContext(SectionStylesContext);
}
