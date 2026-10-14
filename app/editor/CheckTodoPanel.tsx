"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import type { CVData } from "@/lib/cv";
import type { HandedOverCheck } from "@/lib/cv-check/handoff";
import { normalizeCvDates, profileWordCount, todoActionFor, type TodoInputField } from "@/lib/cv-check/improve-todo";
import { EDITOR_STEP_COPY, type EditorStepId } from "@/lib/editor-steps";

// The CV-check findings as a to-do list beside the CV (CV-check improve flow). An item is done when
// the re-graded CV no longer fails that check, so "done" always matches the grade shown.

const REGRADE_DELAY_MS = 1200;
const TOP_COUNT = 3;

const COPY = {
  nl: {
    eyebrow: "Uit je cv-check",
    title: "Je verbeterpunten",
    progress: (done: number, total: number) => `${done} van ${total} gedaan`,
    grade: "Cijfer",
    apply: "Pas toe",
    save: "Opslaan",
    goTo: (step: string) => `Ga naar ${step}`,
    done: "Gedaan",
    more: (count: number) => `Ook in je rapport (${count})`,
    allDone: "Alle punten zijn opgelost. Je cv is klaar om te downloaden.",
    words: (count: number) => `Nu ${count} woorden, doel 50–120.`,
    placeholders: { linkedIn: "linkedin.com/in/jouw-naam", location: "Woonplaats", phone: "06-12345678", email: "naam@voorbeeld.nl" },
    autoHint: "We zetten alle periodes in één notatie, zoals “aug 2021 – heden”.",
  },
  en: {
    eyebrow: "From your CV check",
    title: "Your points to improve",
    progress: (done: number, total: number) => `${done} of ${total} done`,
    grade: "Grade",
    apply: "Apply",
    save: "Save",
    goTo: (step: string) => `Go to ${step}`,
    done: "Done",
    more: (count: number) => `Also in your report (${count})`,
    allDone: "All points are fixed. Your CV is ready to download.",
    words: (count: number) => `Now ${count} words, aim for 50–120.`,
    placeholders: { linkedIn: "linkedin.com/in/your-name", location: "City", phone: "+31 6 12345678", email: "name@example.com" },
    autoHint: "We put every period in one style, such as “Aug 2021 – present”.",
  },
} as const;

type Grade = { grade: number; failed: Set<string> };

export default function CheckTodoPanel({
  checks,
  data,
  templateId,
  locale,
  onApplyData,
  onSetField,
  onGoToStep,
  onSummaryChange,
}: {
  checks: HandedOverCheck[];
  data: CVData;
  templateId: string;
  locale: "nl" | "en";
  onApplyData: (next: CVData) => void;
  onSetField: (field: TodoInputField, value: string) => void;
  onGoToStep: (step: EditorStepId) => void;
  /** The first and current grade and progress, for the download dialog. */
  onSummaryChange?: (summary: { first: number; current: number; doneCount: number; total: number }) => void;
}) {
  const copy = COPY[locale];
  const [graded, setGraded] = useState<Grade | null>(null);
  const [inputs, setInputs] = useState<Partial<Record<TodoInputField, string>>>({});
  const firstGradeRef = useRef<number | null>(null);
  const gradedData = JSON.stringify({ ...data, personal: { ...data.personal, photo: "" } });

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch("/api/cv-check/editor-grade", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: `{"locale":${JSON.stringify(locale)},"templateId":${JSON.stringify(templateId)},"data":${gradedData}}`,
          signal: controller.signal,
        });
        const next = (await response.json()) as { status?: string; grade?: number; failed?: Array<{ id: string }> };
        if (next.status !== "ok" || typeof next.grade !== "number" || !next.failed) return;
        if (firstGradeRef.current === null) firstGradeRef.current = next.grade;
        setGraded({ grade: next.grade, failed: new Set(next.failed.map((check) => check.id)) });
      } catch {
        // Keep the last grade; the list still works without it.
      }
    }, graded ? REGRADE_DELAY_MS : 0);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
    // Re-grade when the CV, template or language changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradedData, templateId, locale]);

  useEffect(() => {
    if (!graded || firstGradeRef.current === null) return;
    onSummaryChange?.({
      first: firstGradeRef.current,
      current: graded.grade,
      doneCount: checks.filter((check) => !graded.failed.has(check.id)).length,
      total: checks.length,
    });
  }, [graded, checks, onSummaryChange]);

  if (!checks.length) return null;
  const isDone = (id: string) => Boolean(graded && !graded.failed.has(id));
  const doneCount = checks.filter((check) => isDone(check.id)).length;
  const formatGrade = (value: number) => new Intl.NumberFormat(locale === "en" ? "en-GB" : "nl-NL", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);
  const improved = graded && firstGradeRef.current !== null && graded.grade > firstGradeRef.current;

  const renderItem = (check: HandedOverCheck) => {
    const done = isDone(check.id);
    const action = todoActionFor(check.id);
    return (
      <li
        key={check.id}
        className={`rounded-[var(--wk-radius-md)] border p-3 ${done ? "border-[#9fd2b8] bg-[var(--wk-success-soft)]" : "border-[var(--wk-border)] bg-[var(--wk-surface)]"}`}
      >
        <p className="text-[14px] font-bold text-[var(--wk-ink)]">{check.label}</p>
        {done ? (
          <p className="mt-1 text-[13px] font-bold text-[var(--wk-success)]">✓ {copy.done}</p>
        ) : (
          <>
            {check.fix && <p className="mt-1 text-[13px] leading-snug text-[var(--wk-ink-muted)]">{action.kind === "auto" ? copy.autoHint : check.fix}</p>}
            {check.id === "score_profile_length" && <p className="mt-1 text-[12px] font-bold text-[var(--wk-warning)]">{copy.words(profileWordCount(data))}</p>}
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
                    aria-label={check.label}
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

  const top = checks.slice(0, TOP_COUNT);
  const rest = checks.slice(TOP_COUNT);
  return (
    <section aria-labelledby="cv-check-todo" className="werkcv-brand rounded-[var(--wk-radius-lg)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--wk-success)]">{copy.eyebrow}</p>
          <h2 id="cv-check-todo" className="text-[17px] font-extrabold text-[var(--wk-ink)]">
            {copy.title}
          </h2>
          <p className="text-[12px] text-[var(--wk-ink-muted)]">{copy.progress(doneCount, checks.length)}</p>
        </div>
        {graded && (
          <span
            className={`shrink-0 rounded-full px-3 py-1.5 text-[14px] font-extrabold ${graded.grade >= 8 ? "bg-[var(--wk-success-soft)] text-[var(--wk-success)]" : "bg-[var(--wk-highlight-soft)] text-[var(--wk-warning)]"}`}
            aria-live="polite"
          >
            {copy.grade} {formatGrade(graded.grade)}
            {improved ? " ↑" : ""}
          </span>
        )}
      </div>
      {doneCount === checks.length && graded ? (
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
    </section>
  );
}
