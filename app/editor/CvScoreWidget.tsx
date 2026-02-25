"use client";
import { useMemo, useState } from "react";
import { CVData } from "@/lib/cv";
import { computeCvScore } from "@/lib/cv-score";

interface CvScoreWidgetProps {
    data: CVData;
}

// SVG ring: radius=28, so circumference = 2π×28 ≈ 175.9
const RADIUS = 28;
const CIRC = 2 * Math.PI * RADIUS;

export default function CvScoreWidget({ data }: CvScoreWidgetProps) {
    const [expanded, setExpanded] = useState(true);
    const result = useMemo(() => computeCvScore(data), [data]);

    const passedCount = result.checks.filter(c => c.passed).length;
    const totalCount = result.checks.length;
    const dashOffset = CIRC * (1 - result.score / 100);

    const failedChecks = result.checks.filter(c => !c.passed);
    const passedChecks = result.checks.filter(c => c.passed);

    return (
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            {/* Header — always visible */}
            <button
                onClick={() => setExpanded(v => !v)}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors text-left"
            >
                {/* Score Ring */}
                <div className="relative flex-shrink-0 w-16 h-16">
                    <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
                        {/* Track */}
                        <circle
                            cx="32" cy="32" r={RADIUS}
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="6"
                        />
                        {/* Progress */}
                        <circle
                            cx="32" cy="32" r={RADIUS}
                            fill="none"
                            stroke={result.ringColor}
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={CIRC}
                            strokeDashoffset={dashOffset}
                            style={{ transition: 'stroke-dashoffset 0.5s ease, stroke 0.4s ease' }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-black text-slate-800">{result.score}</span>
                    </div>
                </div>

                {/* Label + progress */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">CV Score</span>
                    </div>
                    <p className={`text-sm font-bold ${result.color} leading-tight`}>{result.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{passedCount} van {totalCount} checks geslaagd</p>
                </div>

                {/* Expand chevron */}
                <svg
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Expandable check list */}
            {expanded && (
                <div className="border-t border-slate-100 px-5 pb-4 pt-3 space-y-1">
                    {/* Failed checks first */}
                    {failedChecks.map(check => (
                        <div key={check.id} className="group">
                            <div className="flex items-start gap-2.5 py-1.5">
                                <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                                    <svg className="w-2.5 h-2.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-slate-700 leading-snug">{check.label}</p>
                                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{check.tip}</p>
                                </div>
                                <span className="flex-shrink-0 text-[10px] font-bold text-slate-400 mt-0.5">+{check.points}</span>
                            </div>
                        </div>
                    ))}

                    {/* Passed checks */}
                    {passedChecks.length > 0 && failedChecks.length > 0 && (
                        <div className="border-t border-slate-100 pt-1 mt-1" />
                    )}
                    {passedChecks.map(check => (
                        <div key={check.id} className="flex items-center gap-2.5 py-1">
                            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                                <svg className="w-2.5 h-2.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <p className="text-xs text-slate-400 line-through leading-snug">{check.label}</p>
                        </div>
                    ))}

                    {/* All passed state */}
                    {result.score === 100 && (
                        <p className="text-xs text-emerald-700 font-semibold text-center py-2">
                            🎉 Je CV is volledig geoptimaliseerd!
                        </p>
                    )}
                </div>
            )}
        </section>
    );
}
