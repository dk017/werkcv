"use client";

import type { ReactNode } from "react";
import type { AppLocale } from "@/lib/app-v2-paths";

const COPY = {
    nl: { title: "Ontwerp", hint: "Klik op tekst in je CV om die aan te passen. Sleep een onderdeel aan het grijpertje links, of druk Alt + ↑/↓ terwijl je erin typt. Alles wordt automatisch opgeslagen.", color: "Kleur", template: "Template", layout: "Opmaak" },
    en: { title: "Design", hint: "Click any text in your CV to change it. Drag a section by the grip on its left, or press Alt + ↑/↓ while typing in it. Everything is saved automatically.", color: "Colour", template: "Template", layout: "Layout" },
} as const;

// Right-hand panel of the document mode ("Op je CV"): the design controls next to the CV.
export default function DocumentDesignPanel({ locale, colorPicker, templateSelector, layoutControls, checkPanel }: {
    locale: AppLocale;
    /** The CV-check checklist, above the design controls. */
    checkPanel?: ReactNode;
    colorPicker: ReactNode;
    templateSelector: ReactNode;
    layoutControls?: ReactNode;
}) {
    const c = COPY[locale];
    return (
        <aside aria-label={c.title} className="werkcv-brand flex w-[320px] shrink-0 flex-col gap-5 overflow-y-auto border-l border-[var(--wk-border)] bg-[var(--wk-surface)] p-5">
            <div>
                <h2 className="text-[17px] font-extrabold text-[var(--wk-ink)]">{c.title}</h2>
                <p className="mt-1 text-[13px] leading-relaxed text-[var(--wk-ink-muted)]">{c.hint}</p>
            </div>
            {checkPanel}
            {layoutControls ? (
                <section aria-label={c.layout} className="flex flex-col gap-3 border-t border-[var(--wk-border)] pt-4">
                    <h3 className="text-sm font-extrabold text-[var(--wk-ink)]">{c.layout}</h3>
                    {layoutControls}
                </section>
            ) : null}
            {colorPicker ? (
                <section aria-label={c.color} className="flex flex-col gap-2 border-t border-[var(--wk-border)] pt-4">
                    <h3 className="text-sm font-extrabold text-[var(--wk-ink)]">{c.color}</h3>
                    {colorPicker}
                </section>
            ) : null}
            {templateSelector ? (
                <section aria-label={c.template} className="flex flex-col gap-2 border-t border-[var(--wk-border)] pt-4">
                    <h3 className="text-sm font-extrabold text-[var(--wk-ink)]">{c.template}</h3>
                    {templateSelector}
                </section>
            ) : null}
        </aside>
    );
}
