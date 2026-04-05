"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type DragEvent } from "react";
import { track } from "@/lib/analytics";

type ScoreColor = "red" | "orange" | "yellow" | "green";
type ScoreBand = "critical" | "fair" | "good" | "excellent";
type ScoreStatus = "good" | "improvement" | "critical";
type ScoreSeverity = "critical" | "improvement" | "passed";

type ScoreCheck = {
  id: string;
  passed: boolean;
  points_earned: number;
  points_max: number;
  label: string;
  feedback: string | null;
  fix: string | null;
};

type ScoreDimension = {
  id: string;
  name: string;
  icon: string;
  score: number;
  max: number;
  percentage: number;
  status: ScoreStatus;
  checks: ScoreCheck[];
};

type ScoreIssue = {
  severity: ScoreSeverity;
  dimension: string;
  label: string;
  feedback: string;
  fix: string | null;
};

type ScoreResult = {
  total_score: number;
  score_label: string;
  score_color: ScoreColor;
  score_band: ScoreBand;
  dimensions: ScoreDimension[];
  all_issues: ScoreIssue[];
  banner?: {
    type: "english_cv";
    message: string;
  };
  special_message?: string;
  cta: {
    headline: string;
    subtext: string;
    primary_button_text: string;
    primary_button_url: string;
    secondary_button_text: string;
    secondary_button_url: string;
  };
};

const LOADING_MESSAGES = [
  "CV wordt gelezen...",
  "Profieltekst wordt geanalyseerd...",
  "Werkervaring wordt beoordeeld...",
  "Score wordt berekend...",
];

const SCORE_COLORS = {
  red: {
    ring: "#ef4444",
    soft: "bg-red-50 border-red-200 text-red-700",
  },
  orange: {
    ring: "#f97316",
    soft: "bg-orange-50 border-orange-200 text-orange-700",
  },
  yellow: {
    ring: "#eab308",
    soft: "bg-amber-50 border-amber-200 text-amber-800",
  },
  green: {
    ring: "#22c55e",
    soft: "bg-emerald-50 border-emerald-200 text-emerald-700",
  },
} as const;

const STATUS_CLASSES: Record<ScoreStatus, string> = {
  good: "bg-emerald-50 text-emerald-700 border-emerald-200",
  improvement: "bg-orange-50 text-orange-700 border-orange-200",
  critical: "bg-red-50 text-red-700 border-red-200",
};

const STATUS_LABELS: Record<ScoreStatus, string> = {
  good: "Goed",
  improvement: "Verbetering mogelijk",
  critical: "Kritiek punt",
};

const ISSUE_CLASSES: Record<ScoreSeverity, string> = {
  critical: "border-red-500 bg-red-50/70",
  improvement: "border-orange-500 bg-orange-50/70",
  passed: "border-emerald-500 bg-emerald-50/70",
};

const RADIUS = 74;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function Icon({ name, className = "w-4 h-4" }: { name: string; className?: string }) {
  switch (name) {
    case "layout":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 9v11" />
        </svg>
      );
    case "contact":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21a8 8 0 1 0-16 0" />
          <circle cx="12" cy="8" r="4" />
        </svg>
      );
    case "profile":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 5h16v14H4z" />
          <path d="M8 9h8M8 13h8M8 17h5" />
        </svg>
      );
    case "experience":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
        </svg>
      );
    case "language":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 5h8M8 5c0 6-2 10-5 13M8 5c1 4 3 8 6 11M14 5h6M17 5v13M14 18h6" />
        </svg>
      );
    case "checklist":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 7h11M9 12h11M9 17h11M4 7l1.5 1.5L7 6M4 12l1.5 1.5L7 11M4 17l1.5 1.5L7 16" />
        </svg>
      );
    case "critical":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 8v5" />
          <circle cx="12" cy="16.5" r="0.5" fill="currentColor" />
          <path d="M10.3 3.8 2.8 18a2 2 0 0 0 1.8 3h14.8a2 2 0 0 0 1.8-3L13.7 3.8a2 2 0 0 0-3.4 0Z" />
        </svg>
      );
    case "passed":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m5 12 4 4L19 6" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 8v5" />
          <circle cx="12" cy="16.5" r="0.5" fill="currentColor" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

function DimensionIcon({ dimension }: { dimension: ScoreDimension }) {
  return (
    <span className="inline-flex w-9 h-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700">
      <Icon name={dimension.icon} />
    </span>
  );
}

function ScoreCircle({ score, color }: { score: number; color: ScoreColor }) {
  const dashOffset = CIRCUMFERENCE * (1 - score / 100);

  return (
    <div className="relative w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] flex-shrink-0">
      <svg viewBox="0 0 180 180" className="w-full h-full -rotate-90">
        <circle cx="90" cy="90" r={RADIUS} fill="none" stroke="#e2e8f0" strokeWidth="14" />
        <circle
          cx="90"
          cy="90"
          r={RADIUS}
          fill="none"
          stroke={SCORE_COLORS[color].ring}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 1.5s ease, stroke 0.3s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[42px] sm:text-[48px] font-black leading-none text-slate-900">
          {score}
        </span>
        <span className="text-sm font-bold text-slate-400 mt-1">/100</span>
      </div>
    </div>
  );
}

function SeverityIcon({ severity }: { severity: ScoreSeverity }) {
  if (severity === "passed") {
    return (
      <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <Icon name="passed" className="w-4 h-4" />
      </span>
    );
  }

  if (severity === "critical") {
    return (
      <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-red-100 text-red-700">
        <Icon name="critical" className="w-4 h-4" />
      </span>
    );
  }

  return (
    <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-orange-100 text-orange-700">
      <Icon name="default" className="w-4 h-4" />
    </span>
  );
}

export default function CvScoreTool() {
  const [mode, setMode] = useState<"upload" | "text">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [cvText, setCvText] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [expandedDimensions, setExpandedDimensions] = useState<string[]>([]);
  const [showAllIssues, setShowAllIssues] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const viewedTrackedRef = useRef(false);
  const lastTrackedScoreRef = useRef<number | null>(null);

  useEffect(() => {
    if (viewedTrackedRef.current) {
      return;
    }

    viewedTrackedRef.current = true;
    track("cv_score_tool_viewed", {});
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setLoadingIndex(0);
      return;
    }

    const interval = window.setInterval(() => {
      setLoadingIndex((current) => (current + 1) % LOADING_MESSAGES.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (!result) {
      setAnimatedScore(0);
      setExpandedDimensions([]);
      setShowAllIssues(false);
      return;
    }

    const criticalDimensions = result.dimensions
      .filter((dimension) => dimension.status === "critical")
      .map((dimension) => dimension.id);
    setExpandedDimensions(criticalDimensions.slice(0, 2));
    setShowAllIssues(false);

    let startTime: number | null = null;
    const duration = 1500;

    const frame = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      setAnimatedScore(Math.round(result.total_score * progress));

      if (progress < 1) {
        window.requestAnimationFrame(frame);
      }
    };

    window.requestAnimationFrame(frame);
  }, [result]);

  useEffect(() => {
    if (!result || lastTrackedScoreRef.current === result.total_score) {
      return;
    }

    lastTrackedScoreRef.current = result.total_score;
    const topIssue = result.all_issues.find((issue) => issue.severity !== "passed");

    track("cv_score_result_shown", {
      total_score: result.total_score,
      score_band: result.score_band,
      top_issue_dimension: topIssue?.dimension ?? "none",
    });
  }, [result]);

  const hasInput = mode === "upload" ? Boolean(file) : cvText.trim().length >= 100;
  const actionableIssues = result
    ? result.all_issues.filter((issue) => issue.severity !== "passed")
    : [];
  const visibleIssues = result
    ? showAllIssues
      ? actionableIssues
      : actionableIssues.slice(0, 5)
    : [];
  const hiddenIssueCount = result ? Math.max(actionableIssues.length - visibleIssues.length, 0) : 0;

  function resetResultState() {
    setResult(null);
    setShowAllIssues(false);
    setExpandedDimensions([]);
    lastTrackedScoreRef.current = null;
  }

  function handleFileSelect(nextFile: File | null) {
    if (!nextFile) {
      return;
    }

    setError("");
    setFile(nextFile);
    resetResultState();
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    handleFileSelect(event.dataTransfer.files[0] ?? null);
  }

  async function handleAnalyze() {
    setError("");
    resetResultState();

    if (mode === "upload" && !file) {
      setError("Upload eerst een PDF- of Word-bestand.");
      return;
    }

    if (mode === "text" && cvText.trim().length < 100) {
      setError("Plak de volledige tekst van je CV voor een bruikbare analyse.");
      return;
    }

    setIsLoading(true);
    track("cv_score_input_provided", { input_type: mode === "upload" ? "file" : "text" });

    try {
      let response: Response;

      if (mode === "upload") {
        const formData = new FormData();
        formData.append("file", file as File);
        response = await fetch("/api/tools/cv-score", {
          method: "POST",
          body: formData,
        });
      } else {
        response = await fetch("/api/tools/cv-score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: cvText }),
        });
      }

      const json = await response.json();
      if (!response.ok) {
        setError(json.error ?? "Analyse mislukt. Probeer het opnieuw.");
        return;
      }

      setResult(json as ScoreResult);
    } catch {
      setError("Verbindingsfout. Probeer het opnieuw.");
    } finally {
      setIsLoading(false);
    }
  }

  function toggleDimension(id: string) {
    setExpandedDimensions((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function handleCtaClick(button: "editor" | "templates") {
    track("cv_score_cta_clicked", { button });
  }

  return (
    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
      {!result ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              ["6 sec", "Een recruiter bekijkt je CV gemiddeld 6 seconden"],
              ["70%", "CV's worden afgewezen door ATS vóór menselijke beoordeling"],
              ["6 dimensies", "Zo wordt jouw CV beoordeeld"],
            ].map(([value, copy]) => (
              <div key={value} className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4">
                <p className="text-lg font-black text-slate-900">{value}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{copy}</p>
              </div>
            ))}
          </div>

          <div className="flex border-2 border-slate-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => {
                setMode("upload");
                setError("");
              }}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-wide transition-colors ${
                mode === "upload" ? "bg-black text-white" : "bg-white text-slate-500 hover:bg-slate-50"
              }`}
            >
              PDF / Word uploaden
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("text");
                setError("");
              }}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-wide transition-colors ${
                mode === "text" ? "bg-black text-white" : "bg-white text-slate-500 hover:bg-slate-50"
              }`}
            >
              Tekst plakken
            </button>
          </div>

          {mode === "upload" ? (
            <div
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-teal-400 bg-teal-50"
                  : file
                    ? "border-emerald-400 bg-emerald-50"
                    : "border-slate-300 hover:border-teal-300 hover:bg-slate-50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(event) => handleFileSelect(event.target.files?.[0] ?? null)}
              />
              {file ? (
                <div className="space-y-2">
                  <div className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-white border border-emerald-200 text-emerald-700">
                    <Icon name="profile" className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-black text-emerald-700 break-all">{file.name}</p>
                  <p className="text-xs text-emerald-600">
                    {Math.round(file.size / 1024)} KB · klik om te wijzigen
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700">
                    <Icon name="layout" className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-black text-slate-800">
                    Sleep je CV hier naartoe
                  </p>
                  <p className="text-xs text-slate-500">
                    of klik om te uploaden · PDF of Word · max 5 MB
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wide text-slate-600">
                Plak je CV-tekst
              </label>
              <textarea
                value={cvText}
                onChange={(event) => {
                  setCvText(event.target.value);
                  setError("");
                  resetResultState();
                }}
                placeholder="Plak hier de volledige tekst van je CV..."
                rows={12}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 resize-none"
              />
              <p className="text-xs text-slate-500">
                {cvText.trim().length} tekens · plak bij voorkeur het volledige CV
              </p>
            </div>
          )}

          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!hasInput || isLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-[#4ECDC4] hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              style={{ borderWidth: "3px" }}
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v8z" />
                  </svg>
                  {LOADING_MESSAGES[loadingIndex]}
                </>
              ) : (
                "Analyseer mijn CV →"
              )}
            </button>

            <p className="text-center text-xs text-slate-500">
              Privacy gegarandeerd - je CV wordt niet opgeslagen
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-6 md:items-center">
            <ScoreCircle score={animatedScore} color={result.score_color} />

            <div className="min-w-0 flex-1">
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wide ${SCORE_COLORS[result.score_color].soft}`}
              >
                Nederlandse CV kwaliteitsscore
              </span>
              <h3 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {result.score_label}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Je totaalscore combineert structuur, personalia, profieltekst, werkervaring, taalgebruik en volledigheid.
              </p>
              {result.banner ? (
                <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
                  {result.banner.message}
                </div>
              ) : null}
              {result.special_message ? (
                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  {result.special_message}
                </div>
              ) : null}
            </div>
          </div>

          <section>
            <div className="flex items-end justify-between gap-4 mb-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                  6 dimensies
                </p>
                <h3 className="text-xl font-black text-slate-900">Waar recruiters het eerst op afknappen</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.dimensions.map((dimension) => {
                const isExpanded = expandedDimensions.includes(dimension.id);
                return (
                  <button
                    key={dimension.id}
                    type="button"
                    onClick={() => toggleDimension(dimension.id)}
                    className="text-left rounded-2xl border-2 border-slate-200 bg-white p-5 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <DimensionIcon dimension={dimension} />
                        <div className="min-w-0">
                          <p className="font-black text-slate-900 leading-tight">{dimension.name}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            {dimension.score}/{dimension.max} punten
                          </p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold ${STATUS_CLASSES[dimension.status]}`}>
                        {STATUS_LABELS[dimension.status]}
                      </span>
                    </div>

                    <div className="mt-4">
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            dimension.status === "good"
                              ? "bg-emerald-500"
                              : dimension.status === "improvement"
                                ? "bg-orange-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${dimension.percentage}%` }}
                        />
                      </div>
                    </div>

                    {isExpanded ? (
                      <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                        {dimension.checks.map((check) => (
                          <div key={check.id} className="flex items-start gap-3">
                            <span
                              className={`inline-flex mt-0.5 w-7 h-7 items-center justify-center rounded-full ${
                                check.passed
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              <Icon
                                name={check.passed ? "passed" : "critical"}
                                className="w-4 h-4"
                              />
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-900">{check.label}</p>
                              {check.feedback ? (
                                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                                  {check.feedback}
                                </p>
                              ) : null}
                              {!check.passed && check.fix ? (
                                <p className="mt-1 text-xs font-medium text-slate-700 leading-relaxed">
                                  Fix: {check.fix}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <div className="mb-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                Feedback
              </p>
              <h3 className="text-xl font-black text-slate-900">Concreet wat je moet verbeteren</h3>
            </div>

            <div className="space-y-3">
              {visibleIssues.map((issue, index) => (
                <div
                  key={`${issue.dimension}-${issue.label}-${index}`}
                  className={`rounded-2xl border-l-4 border border-slate-200 px-4 py-4 ${ISSUE_CLASSES[issue.severity]}`}
                >
                  <div className="flex items-start gap-3">
                    <SeverityIcon severity={issue.severity} />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-black text-slate-900">{issue.label}</p>
                        <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                          {issue.dimension}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                        {issue.feedback}
                      </p>
                      {issue.fix ? (
                        <p className="mt-2 text-sm font-medium text-slate-800 leading-relaxed">
                          Fix: {issue.fix}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {hiddenIssueCount > 0 ? (
              <button
                type="button"
                onClick={() => setShowAllIssues(true)}
                className="mt-4 text-sm font-black text-slate-700 underline decoration-2 underline-offset-4"
              >
                Toon alle {actionableIssues.length} verbeterpunten
              </button>
            ) : null}
          </section>

          <section className="rounded-3xl border-4 border-black bg-[#FFF7D6] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600 mb-3">
              Volgende stap
            </p>
            <h3 className="text-2xl font-black text-slate-900">{result.cta.headline}</h3>
            <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
              {result.cta.subtext}{" "}
              <Link href="/prijzen" className="font-black underline decoration-2 underline-offset-4">
                Bekijk prijs
              </Link>
              .
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Link
                href={result.cta.primary_button_url}
                onClick={() => handleCtaClick("editor")}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#4ECDC4] text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                style={{ borderWidth: "3px" }}
              >
                {result.cta.primary_button_text}
              </Link>
              <Link
                href={result.cta.secondary_button_url}
                onClick={() => handleCtaClick("templates")}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-white text-slate-900 font-black text-sm border-2 border-black hover:bg-slate-50 transition-colors"
              >
                {result.cta.secondary_button_text}
              </Link>
            </div>
          </section>

          <button
            type="button"
            onClick={() => {
              setResult(null);
              setError("");
              setFile(null);
              setCvText("");
              setAnimatedScore(0);
            }}
            className="w-full rounded-xl border-2 border-slate-300 py-3 px-4 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Ander CV analyseren
          </button>
        </div>
      )}
    </div>
  );
}
