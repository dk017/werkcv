"use client";

import { Icon } from "@/components/app/icons";
import type { AppLocale } from "@/lib/app-v2-paths";
import { CONTENT_STEPS, EDITOR_STEP_COPY, neighbourSteps, type EditorStepId } from "@/lib/editor-steps";

export function StepHeader({ step, locale = "nl" }: { step: EditorStepId; locale?: AppLocale }) {
    const copy = EDITOR_STEP_COPY[locale][step];
    const index = CONTENT_STEPS.indexOf(step as (typeof CONTENT_STEPS)[number]);
    const en = locale === "en";
    return (
        <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--wk-success)]">
                {index >= 0
                    ? (en ? `Step ${index + 1} of ${CONTENT_STEPS.length}` : `Stap ${index + 1} van ${CONTENT_STEPS.length}`)
                    : (en ? "Final step" : "Laatste stap")}
            </p>
            <h1 className="mt-1.5 text-[28px] font-extrabold tracking-tight text-[var(--wk-ink)]">{copy.title}</h1>
            <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-[var(--wk-ink-muted)]">{copy.intro}</p>
        </div>
    );
}

export function StepNav({ step, onStep, locale = "nl" }: { step: EditorStepId; onStep: (step: EditorStepId) => void; locale?: AppLocale }) {
    const { previous, next } = neighbourSteps(step);
    const copy = EDITOR_STEP_COPY[locale];
    const en = locale === "en";
    return (
        <nav aria-label={en ? "Previous or next step" : "Vorige of volgende stap"} className="flex items-center justify-between gap-3 pt-2">
            {previous ? (
                <button
                    type="button"
                    onClick={() => onStep(previous)}
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-[10px] border border-[var(--wk-border)] bg-[var(--wk-surface)] px-4 text-[15px] font-bold text-[var(--wk-ink)] hover:bg-[var(--wk-surface-subtle)]"
                >
                    <Icon name="arrowLeft" size={17} strokeWidth={2} />
                    {copy[previous].label}
                </button>
            ) : <span />}
            {next ? (
                <button
                    type="button"
                    onClick={() => onStep(next)}
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-[10px] bg-[var(--wk-primary)] px-[18px] text-[15px] font-bold text-white hover:bg-[var(--wk-primary-hover)]"
                >
                    {en ? "Next" : "Volgende"}: {copy[next].label}
                    <Icon name="arrowRight" size={17} strokeWidth={2} />
                </button>
            ) : null}
        </nav>
    );
}
