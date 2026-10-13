"use client";

import { useId } from "react";
import type { CVData, CvLayoutFont } from "@/lib/cv";
import type { AppLocale } from "@/lib/app-v2-paths";
import { Icon } from "@/components/app/icons";

export type CvLayout = NonNullable<CVData["layout"]>;

const COPY = {
    nl: {
        font: "Lettertype", size: "Lettergrootte", line: "Regelafstand", gap: "Ruimte tussen onderdelen",
        smaller: "Kleiner", larger: "Groter", less: "Minder", more: "Meer",
        fit: "Pas op 1 pagina", fitting: "Bezig met passen…", reset: "Standaard herstellen",
        fitFailed: "Past niet op 1 pagina zonder dat de tekst te klein wordt. Kort je tekst wat in.",
        fonts: { template: "Standaard van het ontwerp", manrope: "Manrope", inter: "Inter", "source-serif": "Source Serif", merriweather: "Merriweather" },
    },
    en: {
        font: "Font", size: "Font size", line: "Line spacing", gap: "Space between sections",
        smaller: "Smaller", larger: "Larger", less: "Less", more: "More",
        fit: "Fit on 1 page", fitting: "Fitting…", reset: "Reset to default",
        fitFailed: "It does not fit on 1 page without making the text too small. Shorten your text a little.",
        fonts: { template: "The design's own font", manrope: "Manrope", inter: "Inter", "source-serif": "Source Serif", merriweather: "Merriweather" },
    },
} as const;

const FONTS: CvLayoutFont[] = ["template", "manrope", "inter", "source-serif", "merriweather"];
export const LAYOUT_LIMITS = {
    fontScale: { min: 0.85, max: 1.15, step: 0.05 },
    lineSpacing: { min: 0.85, max: 1.3, step: 0.05 },
    sectionSpacing: { min: 0.4, max: 1.6, step: 0.1 },
} as const;

function Stepper({ label, value, limits, onChange, lessLabel, moreLabel }: {
    label: string;
    value: number;
    limits: { min: number; max: number; step: number };
    onChange: (value: number) => void;
    lessLabel: string;
    moreLabel: string;
}) {
    const labelId = useId();
    const set = (next: number) => onChange(Math.round(Math.min(limits.max, Math.max(limits.min, next)) * 100) / 100);
    const button = "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--wk-border)] bg-white text-[var(--wk-ink)] hover:bg-[var(--wk-surface-subtle)] disabled:cursor-not-allowed disabled:opacity-40";
    return (
        <div role="group" aria-labelledby={labelId} className="flex items-center justify-between gap-3">
            <span id={labelId} className="text-[13px] font-bold text-[var(--wk-ink)]">{label}</span>
            <span className="flex items-center gap-1.5">
                <button type="button" className={button} aria-label={`${label}: ${lessLabel}`} disabled={value <= limits.min} onClick={() => set(value - limits.step)}>
                    <span aria-hidden="true" className="text-lg font-bold leading-none">−</span>
                </button>
                <span aria-live="polite" className="w-12 text-center text-[13px] font-bold tabular-nums text-[var(--wk-ink)]">{Math.round(value * 100)}%</span>
                <button type="button" className={button} aria-label={`${label}: ${moreLabel}`} disabled={value >= limits.max} onClick={() => set(value + limits.step)}>
                    <Icon name="plus" size={16} aria-hidden="true" />
                </button>
            </span>
        </div>
    );
}

// Typography and spacing for document mode. The values live in the CV data (data.layout), so the
// preview and the PDF follow them.
export default function LayoutControls({ layout, onChange, pageCount, onFitOnePage, fitting, fitFailed, locale }: {
    layout: CvLayout | undefined;
    onChange: (next: CvLayout) => void;
    pageCount: number;
    onFitOnePage: () => void;
    fitting: boolean;
    fitFailed: boolean;
    locale: AppLocale;
}) {
    const c = COPY[locale];
    const fontId = useId();
    const current = layout ?? {};
    const customised = Boolean(current.font && current.font !== "template") || [current.fontScale, current.lineSpacing, current.sectionSpacing].some((value) => value !== undefined && value !== 1);
    const update = (patch: Partial<CvLayout>) => onChange({ ...current, ...patch });

    return (
        <div className="flex flex-col gap-3">
            <label htmlFor={fontId} className="flex flex-col gap-1.5 text-[13px] font-bold text-[var(--wk-ink)]">
                {c.font}
                <select
                    id={fontId}
                    value={current.font ?? "template"}
                    onChange={(event) => update({ font: event.target.value as CvLayoutFont })}
                    className="min-h-10 rounded-[10px] border border-[var(--wk-border-strong)] bg-white px-3 text-sm font-semibold text-[var(--wk-ink)]"
                >
                    {FONTS.map((font) => <option key={font} value={font}>{c.fonts[font]}</option>)}
                </select>
            </label>
            <Stepper label={c.size} value={current.fontScale ?? 1} limits={LAYOUT_LIMITS.fontScale} onChange={(fontScale) => update({ fontScale })} lessLabel={c.smaller} moreLabel={c.larger} />
            <Stepper label={c.line} value={current.lineSpacing ?? 1} limits={LAYOUT_LIMITS.lineSpacing} onChange={(lineSpacing) => update({ lineSpacing })} lessLabel={c.less} moreLabel={c.more} />
            <Stepper label={c.gap} value={current.sectionSpacing ?? 1} limits={LAYOUT_LIMITS.sectionSpacing} onChange={(sectionSpacing) => update({ sectionSpacing })} lessLabel={c.less} moreLabel={c.more} />
            <div className="mt-1 flex flex-wrap items-center gap-2">
                {pageCount > 1 || fitting ? (
                    <button
                        type="button"
                        onClick={onFitOnePage}
                        disabled={fitting}
                        className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-[var(--wk-primary)] px-4 text-[13px] font-bold text-[var(--wk-primary-contrast)] hover:bg-[var(--wk-primary-hover)] disabled:opacity-60"
                    >
                        <Icon name="sparkle" size={15} aria-hidden="true" />
                        {fitting ? c.fitting : c.fit}
                    </button>
                ) : null}
                {customised ? (
                    <button type="button" onClick={() => onChange({})} className="inline-flex min-h-10 items-center rounded-full px-3 text-[13px] font-bold text-[var(--wk-primary)] underline underline-offset-2">
                        {c.reset}
                    </button>
                ) : null}
            </div>
            {fitFailed ? <p role="status" className="text-[12px] leading-relaxed text-[var(--wk-warning)]">{c.fitFailed}</p> : null}
        </div>
    );
}
