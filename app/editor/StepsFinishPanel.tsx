"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/app/icons";
import type { AppLocale } from "@/lib/app-v2-paths";

const FINISH_COPY = {
    nl: {
        ready: "Klaar om te versturen",
        canDownload: "Je kunt al downloaden",
        previewPdf: "Bekijk de PDF eerst",
        busy: "Bezig…",
        notReady: "Nog niet alle basisonderdelen zijn ingevuld. De controle hieronder laat zien wat er nog mist.",
        emptyTitle: "Je CV is nog leeg",
        emptyText: "Vul eerst je gegevens en ervaring in. Daarna kies je hier je ontwerp en download je je PDF.",
        fillIn: "Begin met invullen",
        design: "Ontwerp",
        designText: "Je tekst blijft staan als je een ander ontwerp kiest. Het voorbeeld rechts past zich meteen aan.",
        colour: "Kleur",
    },
    en: {
        ready: "Ready to send",
        canDownload: "You can download already",
        previewPdf: "View the PDF first",
        busy: "Working…",
        notReady: "Not all core sections are filled in yet. The check below shows what is still missing.",
        emptyTitle: "Your CV is still empty",
        emptyText: "Fill in your details and experience first. Then choose your design here and download your PDF.",
        fillIn: "Start filling in",
        design: "Design",
        designText: "Your text stays when you pick another design. The preview on the right updates straight away.",
        colour: "Colour",
    },
} as const;

export default function StepsFinishPanel({
    templateSelector,
    colorPicker,
    hasContent,
    isReady,
    downloadLabel,
    priceLine,
    isDownloading,
    downloadDisabled,
    onDownload,
    onPreviewPdf,
    onFillIn,
    locale = "nl",
}: {
    templateSelector: ReactNode;
    colorPicker: ReactNode;
    hasContent: boolean;
    isReady: boolean;
    downloadLabel: string;
    priceLine: string;
    isDownloading: boolean;
    downloadDisabled: boolean;
    onDownload: () => void;
    /** Absent without an account: the exact PDF preview needs one. */
    onPreviewPdf?: () => void;
    onFillIn: () => void;
    locale?: AppLocale;
}) {
    const c = FINISH_COPY[locale];
    return (
        <>
            {hasContent ? (
                <section aria-labelledby="finish-download-title" className="flex flex-col gap-3 rounded-2xl bg-[var(--wk-primary)] p-5 text-white">
                    <h2 id="finish-download-title" className="text-[17px] font-extrabold">{isReady ? c.ready : c.canDownload}</h2>
                    <p className="text-sm text-[#cfe7e2]">{priceLine}</p>
                    <div className="flex flex-wrap gap-2.5">
                        <button
                            type="button"
                            onClick={onDownload}
                            disabled={downloadDisabled}
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[var(--wk-highlight)] px-5 text-[15px] font-extrabold text-[var(--wk-ink)] hover:brightness-95 disabled:opacity-60"
                        >
                            <Icon name="download" strokeWidth={2} />
                            {isDownloading ? c.busy : downloadLabel}
                        </button>
                        {onPreviewPdf ? (
                            <button
                                type="button"
                                onClick={onPreviewPdf}
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-white/40 px-4 text-[15px] font-bold text-white hover:bg-white/10"
                            >
                                <Icon name="eye" />
                                {c.previewPdf}
                            </button>
                        ) : null}
                    </div>
                    {!isReady ? (
                        <p className="text-[13px] leading-relaxed text-[#cfe7e2]">{c.notReady}</p>
                    ) : null}
                </section>
            ) : (
                <section className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-[var(--wk-border-strong)] p-5">
                    <h2 className="text-[17px] font-extrabold text-[var(--wk-ink)]">{c.emptyTitle}</h2>
                    <p className="text-sm text-[var(--wk-ink-muted)]">{c.emptyText}</p>
                    <button type="button" onClick={onFillIn} className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-[var(--wk-primary)] px-4 text-sm font-bold text-white">
                        {c.fillIn}
                        <Icon name="arrowRight" size={17} strokeWidth={2} />
                    </button>
                </section>
            )}

            {templateSelector || colorPicker ? (
                <section aria-labelledby="finish-design-title" className="flex flex-col gap-4 rounded-2xl border border-[var(--wk-border)] bg-[var(--wk-surface)] p-5">
                    <div className="flex items-center gap-2">
                        <Icon name="palette" className="text-[var(--wk-primary)]" />
                        <h2 id="finish-design-title" className="text-[17px] font-extrabold text-[var(--wk-ink)]">{c.design}</h2>
                    </div>
                    <p className="-mt-2 text-sm text-[var(--wk-ink-muted)]">{c.designText}</p>
                    {colorPicker ? (
                        <div className="flex items-center gap-3">
                            <span className="text-[13px] font-bold text-[var(--wk-ink)]">{c.colour}</span>
                            {colorPicker}
                        </div>
                    ) : null}
                    {templateSelector}
                </section>
            ) : null}
        </>
    );
}
