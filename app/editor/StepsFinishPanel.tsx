"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/app/icons";

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
    onPreviewPdf: () => void;
    onFillIn: () => void;
}) {
    return (
        <>
            {hasContent ? (
                <section aria-labelledby="finish-download-title" className="flex flex-col gap-3 rounded-2xl bg-[var(--wk-primary)] p-5 text-white">
                    <h2 id="finish-download-title" className="text-[17px] font-extrabold">{isReady ? "Klaar om te versturen" : "Je kunt al downloaden"}</h2>
                    <p className="text-sm text-[#cfe7e2]">{priceLine}</p>
                    <div className="flex flex-wrap gap-2.5">
                        <button
                            type="button"
                            onClick={onDownload}
                            disabled={downloadDisabled}
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[var(--wk-highlight)] px-5 text-[15px] font-extrabold text-[var(--wk-ink)] hover:brightness-95 disabled:opacity-60"
                        >
                            <Icon name="download" strokeWidth={2} />
                            {isDownloading ? "Bezig…" : downloadLabel}
                        </button>
                        <button
                            type="button"
                            onClick={onPreviewPdf}
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-white/40 px-4 text-[15px] font-bold text-white hover:bg-white/10"
                        >
                            <Icon name="eye" />
                            Bekijk de PDF eerst
                        </button>
                    </div>
                    {!isReady ? (
                        <p className="text-[13px] leading-relaxed text-[#cfe7e2]">Nog niet alle basisonderdelen zijn ingevuld. De controle hieronder laat zien wat er nog mist.</p>
                    ) : null}
                </section>
            ) : (
                <section className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-[var(--wk-border-strong)] p-5">
                    <h2 className="text-[17px] font-extrabold text-[var(--wk-ink)]">Je CV is nog leeg</h2>
                    <p className="text-sm text-[var(--wk-ink-muted)]">Vul eerst je gegevens en ervaring in. Daarna kies je hier je ontwerp en download je je PDF.</p>
                    <button type="button" onClick={onFillIn} className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-[var(--wk-primary)] px-4 text-sm font-bold text-white">
                        Begin met invullen
                        <Icon name="arrowRight" size={17} strokeWidth={2} />
                    </button>
                </section>
            )}

            {templateSelector || colorPicker ? (
                <section aria-labelledby="finish-design-title" className="flex flex-col gap-4 rounded-2xl border border-[var(--wk-border)] bg-[var(--wk-surface)] p-5">
                    <div className="flex items-center gap-2">
                        <Icon name="palette" className="text-[var(--wk-primary)]" />
                        <h2 id="finish-design-title" className="text-[17px] font-extrabold text-[var(--wk-ink)]">Ontwerp</h2>
                    </div>
                    <p className="-mt-2 text-sm text-[var(--wk-ink-muted)]">Je tekst blijft staan als je een ander ontwerp kiest. Het voorbeeld rechts past zich meteen aan.</p>
                    {colorPicker ? (
                        <div className="flex items-center gap-3">
                            <span className="text-[13px] font-bold text-[var(--wk-ink)]">Kleur</span>
                            {colorPicker}
                        </div>
                    ) : null}
                    {templateSelector}
                </section>
            ) : null}
        </>
    );
}
