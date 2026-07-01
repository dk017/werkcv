"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import {
  PENDING_CV_MATCH_STORAGE_KEY,
  type PendingCvMatch,
} from "@/lib/pending-cv-match";
import type {
  CvMatchInputMode,
  CvMatchLocale,
  CvVacatureMatchResult,
} from "@/lib/tools/cv-vacature-match";

type ApiResponse = {
  result: CvVacatureMatchResult;
  sourceText: string;
  inputMode: CvMatchInputMode;
};

type CvVacatureMatchToolProps = {
  locale?: CvMatchLocale;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx"]);

const bandStyles: Record<CvVacatureMatchResult["scoreBand"], string> = {
  weak: "border-red-300 bg-red-50 text-red-800",
  fair: "border-amber-300 bg-amber-50 text-amber-800",
  good: "border-sky-300 bg-sky-50 text-sky-800",
  strong: "border-emerald-300 bg-emerald-50 text-emerald-800",
};

function getCopy(locale: CvMatchLocale) {
  if (locale === "en") {
    return {
      cvLabel: "Your CV",
      upload: "Upload",
      paste: "Paste text",
      uploadTitle: "Drop your CV here or choose a file",
      uploadHint: "PDF or Word, up to 10 MB",
      replace: "Choose another file",
      cvPlaceholder: "Paste the complete text of your CV...",
      vacancyLabel: "Vacancy",
      vacancyPlaceholder: "Paste the full vacancy, including requirements and responsibilities...",
      submit: "Check how clearly my CV shows the fit",
      loading: "Comparing evidence with the vacancy...",
      privacy: "Your text is processed only for this assessment. Its contents are not included in analytics.",
      errorGeneric: "The assessment could not be completed.",
      resultEyebrow: "How your CV may be understood",
      perceivedAs: "Perceived positioning",
      threeFixes: "The 3 changes most likely to improve clarity",
      strengths: "Evidence already working in your favour",
      missing: "Vacancy terms not clearly supported yet",
      missingNote: "Only add these when they truthfully reflect your experience.",
      requirements: "Requirement-by-requirement evidence",
      strong: "Strong evidence",
      partial: "Partly supported",
      absent: "Not demonstrated",
      vacancyEvidence: "Vacancy",
      cvEvidence: "Your CV",
      nextStep: "Continue with the same CV and vacancy",
      nextTitle: "Fix these issues in WerkCV",
      nextBody: "We will carry this CV, the vacancy and these three priorities into the editor after email verification.",
      primaryCta: "Fix these issues in my CV",
      secondaryCta: "Run another check",
      limitations: "What this result does not claim",
      invalidFile: "Choose a PDF or Word document.",
      largeFile: "The file is larger than 10 MB.",
      storageError: "Your browser could not preserve this assessment. Keep this tab open and try again.",
      inputFile: "file",
      inputText: "text",
    };
  }

  return {
    cvLabel: "Jouw CV",
    upload: "Uploaden",
    paste: "Tekst plakken",
    uploadTitle: "Sleep je CV hierheen of kies een bestand",
    uploadHint: "PDF of Word, maximaal 10 MB",
    replace: "Kies een ander bestand",
    cvPlaceholder: "Plak de volledige tekst van je CV...",
    vacancyLabel: "Vacature",
    vacancyPlaceholder: "Plak de volledige vacature, inclusief functie-eisen en verantwoordelijkheden...",
    submit: "Controleer hoe duidelijk mijn CV de match laat zien",
    loading: "Bewijs uit je CV wordt met de vacature vergeleken...",
    privacy: "Je tekst wordt alleen voor deze analyse verwerkt. De inhoud komt niet in analytics terecht.",
    errorGeneric: "De analyse kon niet worden voltooid.",
    resultEyebrow: "Hoe je CV waarschijnlijk wordt begrepen",
    perceivedAs: "Waargenomen positionering",
    threeFixes: "De 3 aanpassingen met de meeste impact",
    strengths: "Bewijs dat al in je voordeel werkt",
    missing: "Vacaturetermen die nog niet duidelijk zijn onderbouwd",
    missingNote: "Voeg deze alleen toe als ze aantoonbaar bij je ervaring passen.",
    requirements: "Bewijs per functie-eis",
    strong: "Sterk bewijs",
    partial: "Deels onderbouwd",
    absent: "Niet aangetoond",
    vacancyEvidence: "Vacature",
    cvEvidence: "Jouw CV",
    nextStep: "Ga verder met hetzelfde CV en dezelfde vacature",
    nextTitle: "Los deze punten op in WerkCV",
    nextBody: "Na e-mailverificatie nemen we dit CV, de vacature en de drie prioriteiten mee naar de editor.",
    primaryCta: "Verbeter deze punten in mijn CV",
    secondaryCta: "Nieuwe controle",
    limitations: "Wat deze uitslag niet beweert",
    invalidFile: "Kies een PDF- of Word-bestand.",
    largeFile: "Het bestand is groter dan 10 MB.",
    storageError: "Je browser kon deze analyse niet bewaren. Houd dit tabblad open en probeer opnieuw.",
    inputFile: "bestand",
    inputText: "tekst",
  };
}

function getRequirementStatusLabel(
  status: CvVacatureMatchResult["requirements"][number]["status"],
  copy: ReturnType<typeof getCopy>,
): string {
  if (status === "strong") return copy.strong;
  if (status === "partial") return copy.partial;
  return copy.absent;
}

export default function CvVacatureMatchTool({
  locale = "nl",
}: CvVacatureMatchToolProps) {
  const copy = getCopy(locale);
  const [inputMode, setInputMode] = useState<CvMatchInputMode>("file");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvText, setCvText] = useState("");
  const [vacancyText, setVacancyText] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState<CvVacatureMatchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    track("resume_screener_viewed", { locale });
  }, [locale]);

  function handleCvFile(file: File) {
    const extension = file.name.toLowerCase().split(".").pop() ?? "";
    if (!ALLOWED_EXTENSIONS.has(extension)) {
      setError(copy.invalidFile);
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError(copy.largeFile);
      return;
    }

    setError(null);
    setCvFile(file);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    const startedAt = Date.now();

    track("resume_screener_started", {
      locale,
      input_type: inputMode,
    });

    try {
      let response: Response;
      if (inputMode === "file") {
        if (!cvFile) throw new Error(copy.invalidFile);
        const formData = new FormData();
        formData.append("cvFile", cvFile);
        formData.append("vacancyText", vacancyText);
        formData.append("locale", locale);
        response = await fetch(`/api/tools/cv-vacature-match?locale=${locale}`, {
          method: "POST",
          body: formData,
        });
      } else {
        response = await fetch(`/api/tools/cv-vacature-match?locale=${locale}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cvText, vacancyText, locale }),
        });
      }

      const data = (await response.json().catch(() => ({}))) as Partial<ApiResponse> & {
        error?: string;
        code?: string;
      };
      if (!response.ok || !data.result || !data.sourceText) {
        throw new Error(data.error || copy.errorGeneric);
      }

      setResult(data.result);
      setSourceText(data.sourceText);
      track("resume_screener_completed", {
        locale,
        input_type: data.inputMode || inputMode,
        score_band: data.result.scoreBand,
        duration_ms: Date.now() - startedAt,
        top_issue_category: data.result.topFixes[0]?.category || "unknown",
      });
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : copy.errorGeneric;
      setError(message);
      track("resume_screener_failed", {
        locale,
        input_type: inputMode,
        reason: "analysis_failed",
      });
    } finally {
      setLoading(false);
    }
  }

  function resetAssessment() {
    setResult(null);
    setSourceText("");
    setCvText("");
    setCvFile(null);
    setVacancyText("");
    setError(null);
  }

  function continueToEditor() {
    if (!result || !sourceText) return;

    const pending: PendingCvMatch = {
      version: 1,
      createdAt: Date.now(),
      locale,
      inputMode,
      cvText: sourceText,
      vacancyText,
      result,
    };

    try {
      window.sessionStorage.setItem(PENDING_CV_MATCH_STORAGE_KEY, JSON.stringify(pending));
    } catch {
      setError(copy.storageError);
      return;
    }

    const destination =
      locale === "en"
        ? "/en/editor?template=professional&startSource=resume_screener_result"
        : "/editor?template=professional&startSource=resume_screener_result";
    track("resume_screener_result_cta_clicked", {
      locale,
      score_band: result.scoreBand,
      destination: locale === "en" ? "/en/editor" : "/editor",
    });
    window.location.assign(destination);
  }

  const hasValidCvInput =
    inputMode === "file" ? Boolean(cvFile) : cvText.trim().length >= 120;
  const canSubmit = hasValidCvInput && vacancyText.trim().length >= 120 && !loading;

  return (
    <div className="space-y-6">
      {!result ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 lg:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-black text-slate-950">
                {copy.cvLabel}
              </label>
              <div className="mb-3 grid grid-cols-2 border border-slate-300 bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => {
                    setInputMode("file");
                    setError(null);
                  }}
                  className={`px-3 py-2 text-sm font-bold transition-colors ${
                    inputMode === "file" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"
                  }`}
                >
                  {copy.upload}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInputMode("text");
                    setError(null);
                  }}
                  className={`px-3 py-2 text-sm font-bold transition-colors ${
                    inputMode === "text" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"
                  }`}
                >
                  {copy.paste}
                </button>
              </div>

              {inputMode === "file" ? (
                <button
                  type="button"
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(event) => {
                    event.preventDefault();
                    setIsDragging(false);
                    const file = event.dataTransfer.files?.[0];
                    if (file) handleCvFile(file);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex min-h-64 w-full flex-col items-center justify-center border-2 border-dashed p-6 text-center transition-colors ${
                    isDragging
                      ? "border-teal-600 bg-teal-50"
                      : cvFile
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-300 bg-slate-50 hover:border-slate-500"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) handleCvFile(file);
                    }}
                  />
                  <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl shadow-sm">
                    ↑
                  </span>
                  <span className="font-bold text-slate-950">
                    {cvFile ? cvFile.name : copy.uploadTitle}
                  </span>
                  <span className="mt-1 text-xs font-medium text-slate-500">
                    {cvFile ? copy.replace : copy.uploadHint}
                  </span>
                </button>
              ) : (
                <textarea
                  value={cvText}
                  onChange={(event) => setCvText(event.target.value)}
                  placeholder={copy.cvPlaceholder}
                  rows={12}
                  maxLength={18_000}
                  className="min-h-64 w-full resize-y border border-slate-300 bg-white p-3 text-sm leading-relaxed text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-black text-slate-950">
                {copy.vacancyLabel}
              </label>
              <textarea
                value={vacancyText}
                onChange={(event) => setVacancyText(event.target.value)}
                placeholder={copy.vacancyPlaceholder}
                rows={15}
                maxLength={18_000}
                className="min-h-[300px] w-full resize-y border border-slate-300 bg-white p-3 text-sm leading-relaxed text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 lg:min-h-[324px]"
              />
            </div>
          </div>

          {error ? (
            <div role="alert" className="border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full border-2 border-black bg-[#4ECDC4] px-5 py-3.5 text-sm font-black text-slate-950 shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            {loading ? copy.loading : copy.submit}
          </button>
          <p className="text-center text-xs font-medium leading-relaxed text-slate-500">
            {copy.privacy}
          </p>
        </form>
      ) : (
        <div className="space-y-6" aria-live="polite">
          <section className="grid gap-5 border-b border-slate-200 pb-6 md:grid-cols-[160px_1fr]">
            <div className={`flex min-h-36 flex-col items-center justify-center border-2 p-4 ${bandStyles[result.scoreBand]}`}>
              <span className="text-4xl font-black">{result.score}</span>
              <span className="mt-1 text-xs font-black uppercase">{result.scoreLabel}</span>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
                {copy.resultEyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                {result.perceivedRole}
              </h2>
              <p className="mt-1 text-sm font-bold text-slate-500">
                {copy.perceivedAs}: {result.perceivedSeniority}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">{result.summary}</p>
            </div>
          </section>

          <section>
            <div className="grid gap-3 sm:grid-cols-5">
              {result.dimensions.map((dimension) => {
                const percentage = Math.round((dimension.score / dimension.maxScore) * 100);
                return (
                  <div key={dimension.id} className="border border-slate-200 bg-white p-3" title={dimension.explanation}>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs font-bold text-slate-700">{dimension.label}</span>
                      <span className="text-xs font-black text-slate-950">
                        {dimension.score}/{dimension.maxScore}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden bg-slate-100">
                      <div
                        className="h-full bg-teal-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-black text-slate-950">{copy.threeFixes}</h3>
            <div className="mt-3 space-y-3">
              {result.topFixes.map((fix, index) => (
                <article key={`${fix.category}-${index}`} className="border border-slate-200 bg-slate-50 p-4">
                  <div className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="font-black text-slate-950">{fix.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{fix.evidence}</p>
                      <p className="mt-2 text-sm font-semibold leading-relaxed text-teal-800">{fix.action}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <div className="border border-emerald-200 bg-emerald-50 p-4">
              <h3 className="text-sm font-black text-emerald-900">{copy.strengths}</h3>
              <ul className="mt-3 space-y-3">
                {result.strengths.map((strength, index) => (
                  <li key={`${strength.title}-${index}`} className="text-sm text-emerald-900">
                    <span className="font-bold">{strength.title}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-emerald-800">
                      {strength.evidence}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-amber-200 bg-amber-50 p-4">
              <h3 className="text-sm font-black text-amber-950">{copy.missing}</h3>
              {result.missingKeywords.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {result.missingKeywords.map((keyword) => (
                    <span key={keyword} className="border border-amber-300 bg-white px-2 py-1 text-xs font-bold text-amber-900">
                      {keyword}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-amber-900">—</p>
              )}
              <p className="mt-3 text-xs leading-relaxed text-amber-900">{copy.missingNote}</p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-black text-slate-950">{copy.requirements}</h3>
            <div className="mt-3 space-y-2">
              {result.requirements.map((requirement, index) => (
                <details key={`${requirement.requirement}-${index}`} className="group border border-slate-200 bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3">
                    <span className="text-sm font-bold text-slate-900">{requirement.requirement}</span>
                    <span className={`shrink-0 text-xs font-bold ${
                      requirement.status === "strong"
                        ? "text-emerald-700"
                        : requirement.status === "partial"
                          ? "text-amber-700"
                          : "text-red-700"
                    }`}>
                      {getRequirementStatusLabel(requirement.status, copy)}
                    </span>
                  </summary>
                  <div className="border-t border-slate-100 px-4 py-3 text-xs leading-relaxed text-slate-600">
                    <p><strong>{copy.vacancyEvidence}:</strong> {requirement.vacancyEvidence}</p>
                    <p className="mt-2"><strong>{copy.cvEvidence}:</strong> {requirement.cvEvidence || "—"}</p>
                    <p className="mt-2 font-semibold text-slate-800">{requirement.honestAction}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section className="border-2 border-black bg-[#FFF7D6] p-5 shadow-[4px_4px_0_0_#000]">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-600">
              {copy.nextStep}
            </p>
            <h3 className="mt-2 text-xl font-black text-slate-950">{copy.nextTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{copy.nextBody}</p>
            {error ? (
              <p role="alert" className="mt-3 text-sm font-semibold text-red-700">{error}</p>
            ) : null}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={continueToEditor}
                className="flex-1 border-2 border-black bg-[#4ECDC4] px-4 py-3 text-sm font-black text-slate-950"
              >
                {copy.primaryCta}
              </button>
              <button
                type="button"
                onClick={resetAssessment}
                className="border-2 border-black bg-white px-4 py-3 text-sm font-black text-slate-950"
              >
                {copy.secondaryCta}
              </button>
            </div>
          </section>

          <details className="border-t border-slate-200 pt-4 text-xs text-slate-500">
            <summary className="cursor-pointer font-bold text-slate-700">{copy.limitations}</summary>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {result.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
            </ul>
          </details>
        </div>
      )}
    </div>
  );
}
