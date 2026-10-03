"use client";
import { useEffect, useRef, useState } from "react";
import { CVData } from "@/lib/cv";
import { UiLanguage } from "@/lib/ui-language";

interface CvScoreWidgetProps {
    data: CVData;
    uiLanguage?: UiLanguage;
}

type GradeBand = "onvoldoende" | "voldoende" | "goed" | "uitstekend";
type FailedCheck = { id: string; category: string; severity: "critical" | "important" | "tip"; label: string; fix: string | null };
type GradeResponse =
    | { status: "ok"; grade: number; gradeBand: GradeBand; failed: FailedCheck[]; passedCount: number }
    | { status: "too_short" };

const RADIUS = 28;
const CIRC = 2 * Math.PI * RADIUS;
const REGRADE_DELAY_MS = 1500;
const VISIBLE_FIXES = 5;

const BAND: Record<GradeBand, { nl: string; en: string; text: string; ring: string }> = {
    onvoldoende: { nl: "Onvoldoende", en: "Insufficient", text: "text-red-600", ring: "#dc2626" },
    voldoende: { nl: "Voldoende", en: "Sufficient", text: "text-amber-600", ring: "#d97706" },
    goed: { nl: "Goed", en: "Good", text: "text-emerald-600", ring: "#059669" },
    uitstekend: { nl: "Uitstekend", en: "Excellent", text: "text-emerald-700", ring: "#047857" },
};

/**
 * The CV-check grade (the same checks and 1–10 grade as /cv-check) for the CV in the editor. It
 * regrades shortly after each edit, so fixing a point from the report visibly raises the grade.
 */
export default function CvScoreWidget({ data, uiLanguage = "nl" }: CvScoreWidgetProps) {
    const isEnglish = uiLanguage === "en";
    const tr = (nl: string, en: string) => (isEnglish ? en : nl);
    const formatGrade = (value: number) => (isEnglish ? value.toFixed(1) : value.toFixed(1).replace(".", ","));
    const [result, setResult] = useState<GradeResponse | null>(null);
    const [failedRequest, setFailedRequest] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const firstGradeRef = useRef<number | null>(null);

    // The photo is not graded and can be large.
    const gradedData = JSON.stringify({ ...data, personal: { ...data.personal, photo: "" } });

    useEffect(() => {
        const controller = new AbortController();
        const timer = window.setTimeout(async () => {
            try {
                const response = await fetch("/api/cv-check/editor-grade", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: `{"locale":${JSON.stringify(uiLanguage)},"data":${gradedData}}`,
                    signal: controller.signal,
                });
                if (!response.ok) throw new Error(String(response.status));
                const next = (await response.json()) as GradeResponse;
                if (next.status === "ok" && firstGradeRef.current === null) firstGradeRef.current = next.grade;
                setResult(next);
                setFailedRequest(false);
            } catch {
                if (!controller.signal.aborted) setFailedRequest(true);
            }
        }, result ? REGRADE_DELAY_MS : 0);
        return () => {
            controller.abort();
            window.clearTimeout(timer);
        };
        // Regrade on content changes only; `result` just picks the first-load delay.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gradedData, uiLanguage]);

    const methodologyHref = isEnglish ? "/en/cv-check/methodology" : "/cv-check/methodologie";
    const header = (
        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-0.5">{tr("CV-check cijfer", "CV check grade")}</p>
    );

    if (!result || result.status === "too_short") {
        return (
            <section className="bg-white border border-slate-200 rounded-2xl shadow-sm px-5 py-4">
                {header}
                <p className="text-xs text-slate-500">
                    {failedRequest
                        ? tr("Het cijfer kon niet worden berekend. Je cv is niet gewijzigd.", "The grade could not be calculated. Your CV is unchanged.")
                        : result?.status === "too_short"
                            ? tr("Vul je cv verder aan; vanaf ongeveer 100 woorden krijg je hier je cijfer uit de CV-check.", "Keep filling in your CV; from about 100 words you get your CV check grade here.")
                            : tr("Je cijfer wordt berekend…", "Calculating your grade…")}
                </p>
            </section>
        );
    }

    const band = BAND[result.gradeBand];
    const firstGrade = firstGradeRef.current;
    const change = firstGrade === null ? 0 : Math.round((result.grade - firstGrade) * 10) / 10;
    const fixes = showAll ? result.failed : result.failed.slice(0, VISIBLE_FIXES);

    return (
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden" aria-live="polite">
            <div className="flex w-full items-center gap-4 px-5 py-4">
                <div className="relative flex-shrink-0 w-16 h-16">
                    <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90" aria-hidden="true">
                        <circle cx="32" cy="32" r={RADIUS} fill="none" stroke="#e2e8f0" strokeWidth="6" />
                        <circle
                            cx="32" cy="32" r={RADIUS}
                            fill="none"
                            stroke={band.ring}
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={CIRC}
                            strokeDashoffset={CIRC * (1 - result.grade / 10)}
                            style={{ transition: "stroke-dashoffset 0.5s ease, stroke 0.4s ease" }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-base font-black text-slate-800">{formatGrade(result.grade)}</span>
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    {header}
                    <p className={`text-sm font-bold leading-tight ${band.text}`}>{isEnglish ? band.en : band.nl}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                        {change > 0
                            ? tr(`+${formatGrade(change)} sinds je deze editor opende`, `+${formatGrade(change)} since you opened this editor`)
                            : change < 0
                                ? tr(`${formatGrade(change)} sinds je deze editor opende`, `${formatGrade(change)} since you opened this editor`)
                                : result.failed.length
                                    ? tr(`${result.failed.length} ${result.failed.length === 1 ? "punt" : "punten"} om te verbeteren`, `${result.failed.length} ${result.failed.length === 1 ? "point" : "points"} to improve`)
                                    : tr("Alle checks geslaagd", "All checks passed")}
                    </p>
                </div>
            </div>

            {result.failed.length > 0 && (
                <ul className="border-t border-slate-100 px-5 pb-2 pt-3 space-y-2">
                    {fixes.map((check) => (
                        <li key={check.id} className="flex items-start gap-2.5">
                            <span
                                aria-hidden="true"
                                className={`flex-shrink-0 mt-1 w-2 h-2 rounded-full ${check.severity === "tip" ? "bg-slate-300" : "bg-amber-500"}`}
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-slate-700 leading-snug">{check.label}</p>
                                {check.fix && <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{check.fix}</p>}
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 px-5 pb-4 pt-1">
                {result.failed.length > VISIBLE_FIXES ? (
                    <button type="button" onClick={() => setShowAll((value) => !value)} className="text-[11px] font-semibold text-slate-500 hover:text-slate-700">
                        {showAll ? tr("Toon minder", "Show fewer") : tr(`Toon alle ${result.failed.length} punten`, `Show all ${result.failed.length} points`)}
                    </button>
                ) : <span />}
                <a href={methodologyHref} target="_blank" rel="noopener" className="text-[11px] font-semibold text-slate-500 underline underline-offset-2 hover:text-slate-700">
                    {tr("Zo berekenen we je cijfer", "How we calculate your grade")}
                </a>
            </div>
        </section>
    );
}
