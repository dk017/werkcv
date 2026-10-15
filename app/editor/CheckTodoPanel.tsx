"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import type { CVData } from "@/lib/cv";
import type { HandedOverCheck } from "@/lib/cv-check/handoff";
import { normalizeCvDates, planDateFix, profileWordCount, todoActionFor, yearOnlyCvDates, type TodoInputField } from "@/lib/cv-check/improve-todo";
import { EDITOR_STEP_COPY, stepForSection, type EditorStepId } from "@/lib/editor-steps";
import type { CvGrade } from "./useCvGrade";

// The CV-check as a to-do list in the editor. After a CV-check the items are that check's findings;
// otherwise they are the checks this CV fails when the editor opens (plus any that start failing
// later). An item is done when the re-graded CV no longer fails it, so "done" matches the grade.

const TOP_COUNT = 3;

const COPY = {
  nl: {
    eyebrowCheck: "Uit je cv-check",
    eyebrowLive: "CV-check",
    title: "Je verbeterpunten",
    progress: (done: number, total: number) => `${done} van ${total} gedaan`,
    grade: "Cijfer",
    apply: "Pas toe",
    save: "Opslaan",
    goTo: (step: string) => `Ga naar ${step}`,
    done: "Gedaan",
    more: (count: number) => `Meer punten (${count})`,
    allDone: "Alle punten zijn opgelost. Je cv is klaar om te downloaden.",
    noFindings: "Geen verbeterpunten gevonden. Je cv is klaar om te downloaden.",
    tooShort: "Vul je cv verder aan; vanaf ongeveer 100 woorden krijg je hier je cijfer uit de CV-check.",
    words: (count: number) => `Nu ${count} woorden, doel 50–120.`,
    placeholders: { linkedIn: "linkedin.com/in/jouw-naam", location: "Woonplaats", phone: "06-12345678", email: "naam@voorbeeld.nl" },
    autoHint: "We zetten alle periodes in één notatie, zoals “aug 2021 – heden”.",
    monthsHint: "Deze periodes hebben alleen een jaartal. Vul de maand aan, zoals “mrt 2017”, dan staan alle periodes in één notatie:",
    moreMissing: (count: number) => `en nog ${count}`,
    yearsOnlyHint: "Weet je de maanden niet meer? Gebruik dan overal alleen jaartallen, zoals “2022 – heden”.",
    yearsOnly: "Alleen jaartallen",
    method: "Zelfde cijfer als de gratis CV-check",
  },
  en: {
    eyebrowCheck: "From your CV check",
    eyebrowLive: "CV check",
    title: "Your points to improve",
    progress: (done: number, total: number) => `${done} of ${total} done`,
    grade: "Grade",
    apply: "Apply",
    save: "Save",
    goTo: (step: string) => `Go to ${step}`,
    done: "Done",
    more: (count: number) => `More points (${count})`,
    allDone: "All points are fixed. Your CV is ready to download.",
    noFindings: "No points to improve found. Your CV is ready to download.",
    tooShort: "Add more to your CV; from about 100 words you get your CV-check grade here.",
    words: (count: number) => `Now ${count} words, aim for 50–120.`,
    placeholders: { linkedIn: "linkedin.com/in/your-name", location: "City", phone: "+31 6 12345678", email: "name@example.com" },
    autoHint: "We put every period in one style, such as “Aug 2021 – present”.",
    monthsHint: "These periods only have a year. Add the month, such as “Mar 2017”, so every period has one style:",
    moreMissing: (count: number) => `and ${count} more`,
    yearsOnlyHint: "Don't remember the months? Then use years only everywhere, such as “2022 – present”.",
    yearsOnly: "Years only",
    method: "Same grade as the free CV check",
  },
} as const;

type Item = { id: string; label: string; fix: string | null };

export function formatCheckGrade(value: number, locale: "nl" | "en"): string {
  return new Intl.NumberFormat(locale === "en" ? "en-GB" : "nl-NL", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);
}

export default function CheckTodoPanel({
  grade,
  checks,
  surface,
  data,
  locale,
  onApplyData,
  onSetField,
  onGoToStep,
  onSummaryChange,
}: {
  grade: CvGrade;
  /** The CV-check's findings (CV-check flow); without them the list comes from the CV's own grade. */
  checks?: HandedOverCheck[] | null;
  /** Where the list is shown, for analytics. */
  surface: "steps" | "finish" | "document";
  data: CVData;
  locale: "nl" | "en";
  onApplyData: (next: CVData) => void;
  onSetField: (field: TodoInputField, value: string) => void;
  onGoToStep: (step: EditorStepId) => void;
  /** The first and current grade and progress, for the download dialog. */
  onSummaryChange?: (summary: { first: number; current: number; doneCount: number; total: number }) => void;
}) {
  const copy = COPY[locale];
  const mode = checks?.length ? "check" : "live";
  const [inputs, setInputs] = useState<Partial<Record<TodoInputField, string>>>({});
  // Live mode: what failed when the editor opened, plus anything that starts failing later.
  const [liveItems, setLiveItems] = useState<Item[]>([]);
  const [seenGrade, setSeenGrade] = useState<CvGrade | null>(null);
  const failed = useMemo(() => (grade.status === "ok" ? new Set(grade.failed.map((check) => check.id)) : null), [grade]);
  // Adjust the list while rendering when a new grade arrives (React's pattern for state derived from props).
  if (grade !== seenGrade) {
    setSeenGrade(grade);
    if (mode === "live" && grade.status === "ok") {
      const known = new Set(liveItems.map((item) => item.id));
      const added = grade.failed.filter((check) => !known.has(check.id)).map(({ id, label, fix }) => ({ id, label, fix }));
      if (added.length) setLiveItems([...liveItems, ...added]);
    }
  }

  const items: Item[] = useMemo(() => (mode === "check" ? (checks ?? []) : liveItems), [mode, checks, liveItems]);
  const isDone = (id: string) => Boolean(failed && !failed.has(id));
  const doneCount = items.filter((item) => isDone(item.id)).length;
  // Whether "Pas toe" can fix the dates, or months are missing that only the person knows.
  const hasDateItem = items.some((item) => todoActionFor(item.id).kind === "auto");
  const dateFix = useMemo(() => (hasDateItem ? planDateFix(data) : null), [hasDateItem, data]);

  // Analytics: one view per mount once graded, and each item that becomes done.
  const viewedRef = useRef(false);
  const doneRef = useRef<Set<string> | null>(null);
  const summaryRef = useRef(onSummaryChange);
  useEffect(() => {
    summaryRef.current = onSummaryChange;
  });
  useEffect(() => {
    if (grade.status !== "ok" || !failed) return;
    if (!viewedRef.current) {
      viewedRef.current = true;
      track("editor_check_viewed", { mode, surface, grade_bucket: String(Math.floor(grade.grade)), failed_count: grade.failed.length });
    }
    const nowDone = new Set(items.filter((item) => !failed.has(item.id)).map((item) => item.id));
    if (doneRef.current) {
      for (const id of nowDone) if (!doneRef.current.has(id)) track("editor_check_fixed", { mode, surface, check_id: id, grade: grade.grade });
    }
    doneRef.current = nowDone;
    summaryRef.current?.({ first: grade.firstGrade, current: grade.grade, doneCount: nowDone.size, total: items.length });
  }, [grade, failed, items, mode, surface]);

  if (grade.status === "loading" || grade.status === "error") return null;
  const improved = grade.status === "ok" && grade.grade > grade.firstGrade;

  const renderDateMonths = (item: Item, fix: Extract<NonNullable<typeof dateFix>, { kind: "months" }>) => {
    const step = fix.missing.length ? stepForSection(fix.missing[0].section) : "werkervaring";
    const shown = fix.missing.slice(0, 3);
    return (
      <>
        {fix.missing.length > 0 ? (
          <>
            <p className="mt-1 text-[13px] leading-snug text-[var(--wk-ink-muted)]">{copy.monthsHint}</p>
            <ul className="mt-1 space-y-0.5 text-[13px] text-[var(--wk-ink)]">
              {shown.map((period) => (
                <li key={`${period.section}-${period.index}`}>
                  <span className="font-bold">{period.label}</span>: {period.period}
                </li>
              ))}
              {fix.missing.length > shown.length && <li className="text-[var(--wk-ink-muted)]">{copy.moreMissing(fix.missing.length - shown.length)}</li>}
            </ul>
          </>
        ) : (
          item.fix && <p className="mt-1 text-[13px] leading-snug text-[var(--wk-ink-muted)]">{item.fix}</p>
        )}
        {fix.yearsOnly && <p className="mt-1 text-[13px] leading-snug text-[var(--wk-ink-muted)]">{copy.yearsOnlyHint}</p>}
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="button"
            className="wk-button wk-button-primary wk-button-small"
            onClick={() => {
              track("cta_clicked", { location: "cv_check_todo", label: `date_months_${step}` });
              onGoToStep(step);
            }}
          >
            {copy.goTo(EDITOR_STEP_COPY[locale][step].label.toLowerCase())}
          </button>
          {fix.yearsOnly && (
            <button
              type="button"
              className="wk-button wk-button-secondary wk-button-small"
              onClick={() => {
                track("cta_clicked", { location: "cv_check_todo", label: "auto_years_only" });
                onApplyData(yearOnlyCvDates(data));
              }}
            >
              {copy.yearsOnly}
            </button>
          )}
        </div>
      </>
    );
  };

  const renderItem = (item: Item) => {
    const done = isDone(item.id);
    const action = todoActionFor(item.id);
    if (!done && action.kind === "auto" && dateFix?.kind === "months") {
      return (
        <li key={item.id} className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-3">
          <p className="text-[14px] font-bold text-[var(--wk-ink)]">{item.label}</p>
          {renderDateMonths(item, dateFix)}
        </li>
      );
    }
    return (
      <li key={item.id} className={`rounded-[var(--wk-radius-md)] border p-3 ${done ? "border-[#9fd2b8] bg-[var(--wk-success-soft)]" : "border-[var(--wk-border)] bg-[var(--wk-surface)]"}`}>
        <p className="text-[14px] font-bold text-[var(--wk-ink)]">{item.label}</p>
        {done ? (
          <p className="mt-1 text-[13px] font-bold text-[var(--wk-success)]">✓ {copy.done}</p>
        ) : (
          <>
            {item.fix && <p className="mt-1 text-[13px] leading-snug text-[var(--wk-ink-muted)]">{action.kind === "auto" ? copy.autoHint : item.fix}</p>}
            {item.id === "score_profile_length" && <p className="mt-1 text-[12px] font-bold text-[var(--wk-warning)]">{copy.words(profileWordCount(data))}</p>}
            <div className="mt-2">
              {action.kind === "auto" ? (
                <button
                  type="button"
                  className="wk-button wk-button-primary wk-button-small"
                  onClick={() => {
                    track("cta_clicked", { location: "cv_check_todo", label: `auto_${action.fix}` });
                    onApplyData(normalizeCvDates(data));
                  }}
                >
                  {copy.apply}
                </button>
              ) : action.kind === "input" ? (
                <form
                  className="flex gap-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const value = (inputs[action.field] ?? "").trim();
                    if (!value) return;
                    track("cta_clicked", { location: "cv_check_todo", label: `input_${action.field}` });
                    onSetField(action.field, value);
                  }}
                >
                  <input
                    className="wk-input min-w-0 flex-1 py-1.5 text-[13px]"
                    aria-label={item.label}
                    placeholder={copy.placeholders[action.field]}
                    value={inputs[action.field] ?? ""}
                    onChange={(event) => setInputs((current) => ({ ...current, [action.field]: event.target.value }))}
                  />
                  <button type="submit" className="wk-button wk-button-primary wk-button-small">
                    {copy.save}
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  className="wk-button wk-button-secondary wk-button-small"
                  onClick={() => {
                    track("cta_clicked", { location: "cv_check_todo", label: `step_${action.step}` });
                    onGoToStep(action.step);
                  }}
                >
                  {copy.goTo(EDITOR_STEP_COPY[locale][action.step].label.toLowerCase())}
                </button>
              )}
            </div>
          </>
        )}
      </li>
    );
  };

  const top = items.slice(0, TOP_COUNT);
  const rest = items.slice(TOP_COUNT);
  return (
    <section id={`cv-check-todo-${surface}`} aria-labelledby={`cv-check-todo-title-${surface}`} className="werkcv-brand shrink-0 scroll-mt-4 rounded-[var(--wk-radius-lg)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4" style={{ minHeight: 0 }}>
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--wk-success)]">{mode === "check" ? copy.eyebrowCheck : copy.eyebrowLive}</p>
          <h2 id={`cv-check-todo-title-${surface}`} className="text-[17px] font-extrabold text-[var(--wk-ink)]">
            {copy.title}
          </h2>
          {grade.status === "ok" && items.length > 0 && <p className="text-[12px] text-[var(--wk-ink-muted)]">{copy.progress(doneCount, items.length)}</p>}
        </div>
        {grade.status === "ok" && (
          <span
            className={`shrink-0 rounded-full px-3 py-1.5 text-[14px] font-extrabold ${grade.grade >= 8 ? "bg-[var(--wk-success-soft)] text-[var(--wk-success)]" : "bg-[var(--wk-highlight-soft)] text-[var(--wk-warning)]"}`}
            aria-live="polite"
          >
            {copy.grade} {formatCheckGrade(grade.grade, locale)}
            {improved ? " ↑" : ""}
          </span>
        )}
      </div>
      {grade.status === "too_short" ? (
        <p className="mt-3 text-[13px] text-[var(--wk-ink-muted)]">{copy.tooShort}</p>
      ) : items.length === 0 ? (
        <p className="mt-3 text-[14px] font-bold text-[var(--wk-success)]">{copy.noFindings}</p>
      ) : doneCount === items.length ? (
        <p className="mt-3 text-[14px] font-bold text-[var(--wk-success)]">{copy.allDone}</p>
      ) : (
        <>
          <ul className="mt-3 space-y-2">{top.map(renderItem)}</ul>
          {rest.length > 0 && (
            <details className="mt-3">
              <summary className="cursor-pointer text-[12px] font-extrabold uppercase tracking-[0.08em] text-[var(--wk-ink-muted)]">{copy.more(rest.length)}</summary>
              <ul className="mt-2 space-y-2">{rest.map(renderItem)}</ul>
            </details>
          )}
        </>
      )}
      <p className="mt-3 text-[11px] text-[var(--wk-ink-muted)]">{copy.method}</p>
    </section>
  );
}
