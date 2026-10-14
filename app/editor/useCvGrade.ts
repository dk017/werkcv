"use client";

import { useEffect, useRef, useState } from "react";
import type { CVData } from "@/lib/cv";

// The CV-check grade of the CV open in the editor, shared by the top-bar chip, the checklist and the
// "Op je CV" panel so the editor sends one request per change (/api/cv-check/editor-grade, no AI).

const REGRADE_DELAY_MS = 1200;

export type GradedCheck = { id: string; category: string; severity: string; label: string; fix: string | null };

export type CvGrade =
  | { status: "loading" | "error" }
  | { status: "too_short" }
  | { status: "ok"; grade: number; failed: GradedCheck[]; firstGrade: number };

export function useCvGrade({ data, templateId, locale, enabled }: { data: CVData; templateId: string; locale: "nl" | "en"; enabled: boolean }): CvGrade {
  const [grade, setGrade] = useState<CvGrade>({ status: "loading" });
  const firstGradeRef = useRef<number | null>(null);
  const hasResultRef = useRef(false);
  // The photo is not graded and can be large.
  const gradedData = JSON.stringify({ ...data, personal: { ...data.personal, photo: "" } });

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch("/api/cv-check/editor-grade", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: `{"locale":${JSON.stringify(locale)},"templateId":${JSON.stringify(templateId)},"data":${gradedData}}`,
          signal: controller.signal,
        });
        const next = (await response.json().catch(() => ({}))) as { status?: string; grade?: number; failed?: GradedCheck[] };
        hasResultRef.current = true;
        if (next.status === "too_short") return setGrade({ status: "too_short" });
        if (!response.ok || next.status !== "ok" || typeof next.grade !== "number" || !next.failed) return setGrade({ status: "error" });
        if (firstGradeRef.current === null) firstGradeRef.current = next.grade;
        setGrade({ status: "ok", grade: next.grade, failed: next.failed, firstGrade: firstGradeRef.current });
      } catch {
        if (!controller.signal.aborted) setGrade((current) => (current.status === "ok" ? current : { status: "error" }));
      }
    }, hasResultRef.current ? REGRADE_DELAY_MS : 0);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [enabled, gradedData, templateId, locale]);

  return grade;
}
