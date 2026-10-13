"use client";

import type { UiLanguage } from "@/lib/ui-language";
import {
  getCvSectionLabel,
  type CvBodySectionId,
  type CvSectionLayout,
} from "@/lib/cv-sections";

interface SectionOrderPanelProps {
  layout: CvSectionLayout;
  uiLanguage: UiLanguage;
  onMove: (sectionId: CvBodySectionId, direction: -1 | 1) => void;
  /** "steps": the app v2 stepped editor look (brand tokens from .werkcv-brand). */
  variant?: "classic" | "steps";
}

// The classic strings are the original ones, unchanged.
const ORDER_STYLES = {
  classic: {
    section: "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5",
    eyebrow: "text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700",
    title: "mt-1 text-base font-semibold text-slate-950",
    intro: "max-w-xl text-xs leading-relaxed text-slate-500",
    lane: "mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500",
    item: "flex min-h-12 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2",
    index: "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-500",
    label: "min-w-0 flex-1 truncate text-sm font-semibold text-slate-800",
    move: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white text-sm font-bold text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-35",
  },
  steps: {
    section: "rounded-2xl border border-[var(--wk-border)] bg-[var(--wk-surface)] p-5 sm:p-6",
    eyebrow: "sr-only",
    title: "text-[17px] font-extrabold text-[var(--wk-ink)]",
    intro: "mt-1 text-sm leading-relaxed text-[var(--wk-ink-muted)]",
    lane: "mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--wk-ink-muted)]",
    item: "flex min-h-14 items-center gap-2 rounded-xl border border-[var(--wk-border)] bg-white px-3 py-2",
    index: "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--wk-surface-subtle)] text-xs font-bold text-[var(--wk-ink-muted)]",
    label: "min-w-0 flex-1 truncate text-sm font-bold text-[var(--wk-ink)]",
    move: "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--wk-border)] bg-white text-sm font-bold text-[var(--wk-ink)] hover:border-[var(--wk-primary)] hover:bg-[var(--wk-surface-subtle)] disabled:cursor-not-allowed disabled:opacity-35",
  },
};

export default function SectionOrderPanel({ layout, uiLanguage, onMove, variant = "classic" }: SectionOrderPanelProps) {
  const isEnglish = uiLanguage === "en";
  const v = ORDER_STYLES[variant];
  const renderLane = (sectionIds: CvBodySectionId[], laneLabel: string) => sectionIds.length > 0 ? (
    <div>
      {layout.layout !== "single-column" ? <h3 className={v.lane}>{laneLabel}</h3> : null}
      <ol className="grid gap-2 sm:grid-cols-2" aria-label={laneLabel}>
        {sectionIds.map((sectionId, index) => (
          <li key={sectionId} className={v.item}>
            <span className={v.index} aria-hidden="true">
              {index + 1}
            </span>
            <span className={v.label}>
              {getCvSectionLabel(sectionId, uiLanguage)}
            </span>
            <button
              type="button"
              onClick={() => onMove(sectionId, -1)}
              disabled={index === 0}
              className={v.move}
              aria-label={isEnglish ? `Move ${getCvSectionLabel(sectionId, uiLanguage)} up` : `${getCvSectionLabel(sectionId, uiLanguage)} omhoog`}
            >↑</button>
            <button
              type="button"
              onClick={() => onMove(sectionId, 1)}
              disabled={index === sectionIds.length - 1}
              className={v.move}
              aria-label={isEnglish ? `Move ${getCvSectionLabel(sectionId, uiLanguage)} down` : `${getCvSectionLabel(sectionId, uiLanguage)} omlaag`}
            >↓</button>
          </li>
        ))}
      </ol>
    </div>
  ) : null;

  return (
    <section className={v.section} aria-labelledby="section-order-title">
      <div className={variant === "steps" ? "flex flex-col" : "flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4"}>
        <div>
          <p className={v.eyebrow}>
            {isEnglish ? "Layout control" : "Opmaak beheren"}
          </p>
          <h2 id="section-order-title" className={v.title}>
            {isEnglish ? "Choose your CV section order" : "Kies de volgorde van je CV-onderdelen"}
          </h2>
        </div>
        <p className={v.intro}>
          {isEnglish
            ? layout.layout === "single-column"
              ? "Personal details stay in the header. The order below is saved with your CV and followed by the live preview and final PDF."
              : "Personal details stay in the header. Sections can move only within their designed sidebar or main-column lane."
            : layout.layout === "single-column"
              ? "Persoonlijke gegevens blijven in de kop. De volgorde hieronder wordt opgeslagen en gevolgd door live preview en PDF."
              : "Persoonlijke gegevens blijven in de kop. Onderdelen kunnen alleen binnen hun vaste zijbalk of hoofdkolom worden verplaatst."}
        </p>
      </div>
      <div className="mt-4 space-y-4">
        {layout.layout === "single-column"
          ? renderLane(layout.main, isEnglish ? "CV section order" : "Volgorde CV-onderdelen")
          : <>
            {renderLane(layout.sidebar, isEnglish ? "Sidebar" : "Zijbalk")}
            {renderLane(layout.main, isEnglish ? "Main column" : "Hoofdkolom")}
          </>}
      </div>
    </section>
  );
}
