"use client";

import { useState } from "react";
import {
    checkZoekjaarEligibility,
    zoekjaarBasisOptions,
    type ZoekjaarBasis,
    type ZoekjaarCheckResult,
} from "@/lib/tools/zoekjaar";

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

const statusConfig = {
    eligible: {
        eyebrow: "IND orientation year quick check",
        title: "Looks broadly eligible",
        className: "bg-emerald-50 border-emerald-300",
        textClassName: "text-emerald-900",
        eyebrowClassName: "text-emerald-700",
        summary: "The main IND timing and basis checks look aligned. You still need to file the formal application with supporting documents.",
    },
    needs_evidence: {
        eyebrow: "IND orientation year quick check",
        title: "Possible, but evidence is still missing",
        className: "bg-amber-50 border-amber-300",
        textClassName: "text-amber-900",
        eyebrowClassName: "text-amber-700",
        summary: "The route may still work, but one or more documentary conditions still need to be proven before you can rely on this basis.",
    },
    not_eligible: {
        eyebrow: "IND orientation year quick check",
        title: "A core rule blocks this route",
        className: "bg-rose-50 border-rose-300",
        textClassName: "text-rose-900",
        eyebrowClassName: "text-rose-700",
        summary: "This result usually means the 3-year window has passed or the same study basis cannot be used again for a second orientation year.",
    },
} as const;

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    }).format(date);
}

function getDeadlineCopy(daysUntilDeadline: number): string {
    if (daysUntilDeadline > 0) {
        return `${daysUntilDeadline} days left`;
    }

    if (daysUntilDeadline === 0) {
        return "Last likely application day";
    }

    return `${Math.abs(daysUntilDeadline)} days past the likely deadline`;
}

function CheckRow({ label, passed }: { label: string; passed: boolean }) {
    return (
        <li className="flex items-start gap-3">
            <span className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border text-[11px] font-black ${passed ? "border-emerald-300 bg-emerald-100 text-emerald-700" : "border-rose-300 bg-rose-100 text-rose-700"}`}>
                {passed ? "OK" : "NO"}
            </span>
            <span>{label}</span>
        </li>
    );
}

export default function ZoekjaarCheckerTool() {
    const [basis, setBasis] = useState<ZoekjaarBasis>("dutch_bachelor_or_master");
    const [completionDate, setCompletionDate] = useState("");
    const [hadPreviousOrientationYear, setHadPreviousOrientationYear] = useState(false);
    const [newQualificationAfterPreviousOrientationYear, setNewQualificationAfterPreviousOrientationYear] = useState(false);
    const [researchPermitEligible, setResearchPermitEligible] = useState(false);
    const [foreignInstitutionTop200Eligible, setForeignInstitutionTop200Eligible] = useState(false);
    const [hasNufficEvaluation, setHasNufficEvaluation] = useState(false);
    const [hasAcceptedLanguageProof, setHasAcceptedLanguageProof] = useState(false);
    const [result, setResult] = useState<ZoekjaarCheckResult | null>(null);
    const [error, setError] = useState("");

    const foreignRoute = basis === "designated_foreign_institution";
    const researchRoute = basis === "scientific_research";

    function handleCheck() {
        try {
            const nextResult = checkZoekjaarEligibility({
                basis,
                completionDate,
                hadPreviousOrientationYear,
                newQualificationAfterPreviousOrientationYear,
                researchPermitEligible,
                foreignInstitutionTop200Eligible,
                hasNufficEvaluation,
                hasAcceptedLanguageProof,
            });

            setError("");
            setResult(nextResult);
        } catch (nextError) {
            setResult(null);
            setError(nextError instanceof Error ? nextError.message : "Enter a valid completion date.");
        }
    }

    return (
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            {!result ? (
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                            Qualification basis
                        </label>
                        <select
                            value={basis}
                            onChange={(event) => setBasis(event.target.value as ZoekjaarBasis)}
                            className={inputClass}
                        >
                            {zoekjaarBasisOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                            Graduation, doctorate or research end date
                        </label>
                        <input
                            type="date"
                            value={completionDate}
                            onChange={(event) => setCompletionDate(event.target.value)}
                            className={inputClass}
                        />
                        <p className="text-[11px] text-slate-500 mt-1">
                            The IND generally checks whether you apply within 3 years of this date.
                        </p>
                    </div>

                    <label className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
                        <input
                            type="checkbox"
                            checked={hadPreviousOrientationYear}
                            onChange={(event) => {
                                setHadPreviousOrientationYear(event.target.checked);
                                if (!event.target.checked) {
                                    setNewQualificationAfterPreviousOrientationYear(false);
                                }
                            }}
                            className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-slate-600 leading-relaxed">
                            I already had an orientation year in the Netherlands before.
                        </span>
                    </label>

                    {hadPreviousOrientationYear ? (
                        <label className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <input
                                type="checkbox"
                                checked={newQualificationAfterPreviousOrientationYear}
                                onChange={(event) => setNewQualificationAfterPreviousOrientationYear(event.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="text-sm text-slate-600 leading-relaxed">
                                This study, doctorate or research was completed after that previous orientation year.
                            </span>
                        </label>
                    ) : null}

                    {researchRoute ? (
                        <label className="flex items-start gap-3 bg-violet-50 border border-violet-200 rounded-lg p-4">
                            <input
                                type="checkbox"
                                checked={researchPermitEligible}
                                onChange={(event) => setResearchPermitEligible(event.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="text-sm text-slate-600 leading-relaxed">
                                My Dutch research was under the IND research route or a qualifying research HSM appointment with UFO job code starting with 01.
                            </span>
                        </label>
                    ) : null}

                    {foreignRoute ? (
                        <div className="space-y-3 rounded-xl border border-violet-200 bg-violet-50 p-4">
                            <p className="text-xs font-black uppercase tracking-wide text-violet-700">
                                Extra foreign-degree checks
                            </p>
                            <label className="flex items-start gap-3 rounded-lg bg-white border border-violet-100 p-4">
                                <input
                                    type="checkbox"
                                    checked={foreignInstitutionTop200Eligible}
                                    onChange={(event) => setForeignInstitutionTop200Eligible(event.target.checked)}
                                    className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                />
                                <span className="text-sm text-slate-600 leading-relaxed">
                                    My university met the IND top-200 rule on my graduation or promotion date in at least 2 of the 3 accepted rankings.
                                </span>
                            </label>
                            <label className="flex items-start gap-3 rounded-lg bg-white border border-violet-100 p-4">
                                <input
                                    type="checkbox"
                                    checked={hasNufficEvaluation}
                                    onChange={(event) => setHasNufficEvaluation(event.target.checked)}
                                    className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                />
                                <span className="text-sm text-slate-600 leading-relaxed">
                                    I already have or can obtain a Nuffic credential evaluation, unless my accredited degree is from Flanders.
                                </span>
                            </label>
                            <label className="flex items-start gap-3 rounded-lg bg-white border border-violet-100 p-4">
                                <input
                                    type="checkbox"
                                    checked={hasAcceptedLanguageProof}
                                    onChange={(event) => setHasAcceptedLanguageProof(event.target.checked)}
                                    className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                />
                                <span className="text-sm text-slate-600 leading-relaxed">
                                    I meet one accepted English or Dutch language-proof route for this foreign-degree basis.
                                </span>
                            </label>
                        </div>
                    ) : null}

                    {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

                    <button
                        type="button"
                        onClick={handleCheck}
                        className="w-full py-3 px-6 bg-[#4ECDC4] hover:bg-teal-500 text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                        style={{ borderWidth: "3px" }}
                    >
                        Check orientation year fit
                    </button>
                </div>
            ) : (
                <div className="space-y-5">
                    <div className={`border-2 rounded-xl p-5 ${statusConfig[result.status].className}`}>
                        <p className={`text-xs font-black uppercase tracking-wide mb-2 ${statusConfig[result.status].eyebrowClassName}`}>
                            {statusConfig[result.status].eyebrow}
                        </p>
                        <p className={`text-3xl font-black mb-2 ${statusConfig[result.status].textClassName}`}>
                            {statusConfig[result.status].title}
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            {statusConfig[result.status].summary}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">
                                Basis checked
                            </p>
                            <p className="text-base font-black text-slate-900">{result.basisLabel}</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">
                                Latest likely application date
                            </p>
                            <p className="text-base font-black text-slate-900">{formatDate(result.applicationDeadline)}</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">
                                Window status
                            </p>
                            <p className="text-base font-black text-slate-900">{getDeadlineCopy(result.daysUntilDeadline)}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
                                Core checks
                            </p>
                            <ul className="space-y-2 text-sm text-slate-700">
                                <CheckRow label="Still within the IND 3-year application window" passed={result.withinWindow} />
                                <CheckRow label="Previous orientation year rule is satisfied" passed={result.repeatRuleEligible} />
                                <CheckRow label="Research-specific permit basis is satisfied" passed={result.researchPermitEligible} />
                                <CheckRow label="Foreign top-200 institution rule is satisfied" passed={result.foreignInstitutionTop200Eligible} />
                                <CheckRow label="Nuffic credential evaluation is covered where needed" passed={result.hasNufficEvaluation} />
                                <CheckRow label="Accepted language proof is covered where needed" passed={result.hasAcceptedLanguageProof} />
                            </ul>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
                                What the permit gives you
                            </p>
                            <ul className="space-y-2 text-sm text-slate-700">
                                <li>Duration: 1 year, with no extension of the same permit.</li>
                                <li>Work access: free to work in the Netherlands, no separate TWV work permit for the employer.</li>
                                <li>Typical next route: highly skilled migrant using the reduced salary criterion if the timing fits.</li>
                                <li>Application timing still matters even if the document set looks complete.</li>
                            </ul>
                        </div>
                    </div>

                    {result.missingChecks.length > 0 ? (
                        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
                            <p className="text-xs font-black uppercase tracking-wide text-rose-700 mb-3">
                                Blockers seen in this check
                            </p>
                            <ul className="space-y-2 text-sm text-slate-700">
                                {result.missingChecks.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ) : null}

                    {result.actionItems.length > 0 ? (
                        <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
                            <p className="text-xs font-black uppercase tracking-wide text-teal-700 mb-3">
                                Best next actions
                            </p>
                            <ul className="space-y-2 text-sm text-slate-700">
                                {result.actionItems.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ) : null}

                    <button
                        type="button"
                        onClick={() => {
                            setResult(null);
                            setError("");
                        }}
                        className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        Check again
                    </button>
                </div>
            )}
        </div>
    );
}
