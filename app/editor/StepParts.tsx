"use client";

import { Icon } from "@/components/app/icons";
import { CONTENT_STEPS, EDITOR_STEP_COPY, neighbourSteps, type EditorStepId } from "@/lib/editor-steps";

export function StepHeader({ step }: { step: EditorStepId }) {
    const copy = EDITOR_STEP_COPY[step];
    const index = CONTENT_STEPS.indexOf(step as (typeof CONTENT_STEPS)[number]);
    return (
        <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--wk-success)]">
                {index >= 0 ? `Stap ${index + 1} van ${CONTENT_STEPS.length}` : "Laatste stap"}
            </p>
            <h1 className="mt-1.5 text-[28px] font-extrabold tracking-tight text-[var(--wk-ink)]">{copy.title}</h1>
            <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-[var(--wk-ink-muted)]">{copy.intro}</p>
        </div>
    );
}

export function StepNav({ step, onStep }: { step: EditorStepId; onStep: (step: EditorStepId) => void }) {
    const { previous, next } = neighbourSteps(step);
    return (
        <nav aria-label="Vorige of volgende stap" className="flex items-center justify-between gap-3 pt-2">
            {previous ? (
                <button
                    type="button"
                    onClick={() => onStep(previous)}
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-[10px] border border-[var(--wk-border)] bg-[var(--wk-surface)] px-4 text-[15px] font-bold text-[var(--wk-ink)] hover:bg-[var(--wk-surface-subtle)]"
                >
                    <Icon name="arrowLeft" size={17} strokeWidth={2} />
                    {EDITOR_STEP_COPY[previous].label}
                </button>
            ) : <span />}
            {next ? (
                <button
                    type="button"
                    onClick={() => onStep(next)}
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-[10px] bg-[var(--wk-primary)] px-[18px] text-[15px] font-bold text-white hover:bg-[var(--wk-primary-hover)]"
                >
                    Volgende: {EDITOR_STEP_COPY[next].label}
                    <Icon name="arrowRight" size={17} strokeWidth={2} />
                </button>
            ) : null}
        </nav>
    );
}
