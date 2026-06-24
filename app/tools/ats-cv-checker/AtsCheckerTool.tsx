"use client";
import { useRef, useState } from "react";
import TrackedToolLink from "@/components/analytics/TrackedToolLink";

interface AtsCheck {
  id: string;
  categorie: string;
  label: string;
  passed: boolean;
  tip: string | null;
  punten: number;
}

interface AtsResult {
  score: number;
  label: string;
  labelKleur: "rood" | "oranje" | "geel" | "groen";
  samenvatting: string;
  checks: AtsCheck[];
}

type Locale = "nl" | "en";

type AtsCheckerToolProps = {
  locale?: Locale;
  editorHref?: string;
  templatesHref?: string;
  toolName?: string;
  trackingPrefix?: string;
};

const RADIUS = 40;
const CIRC = 2 * Math.PI * RADIUS;

const kleurMap = {
  rood: { ring: "#ef4444", bg: "bg-red-50", border: "border-red-300", text: "text-red-700" },
  oranje: { ring: "#f97316", bg: "bg-orange-50", border: "border-orange-300", text: "text-orange-700" },
  geel: { ring: "#eab308", bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-800" },
  groen: { ring: "#22c55e", bg: "bg-emerald-50", border: "border-emerald-300", text: "text-emerald-700" },
} as const;

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

const copy = {
  nl: {
    uploadTab: "PDF / Word uploaden",
    textTab: "Tekst plakken",
    missingFile: "Upload eerst een PDF of Word-bestand.",
    shortText: "Plak minimaal 50 tekens van je CV-tekst.",
    connectionError: "Verbindingsfout. Probeer het opnieuw.",
    uploadPrompt: "Sleep je CV hier naartoe",
    uploadSub: "of klik om te uploaden — PDF of Word, max 5 MB",
    fileChange: "klik om te wijzigen",
    pasteLabel: "Plak je CV-tekst",
    pastePlaceholder: "Kopieer de volledige tekst van je CV en plak die hier...",
    minNeeded: "tekens — minimaal 50 nodig",
    analyze: "Analyseer mijn CV",
    analyzing: "CV analyseren...",
    checksLabel: "checks",
    perfect: "🎉 Perfect score! Je CV is volledig ATS-geoptimaliseerd.",
    resolveEyebrow: "Direct oplossen",
    resolveTitle: "Maak nu een ATS-vriendelijke versie van je cv",
    resolveBody: "Gebruik deze check als prioriteitenlijst. Zet je profiel, secties en werkervaring meteen over naar een rustige Nederlandse template en betaal pas als je de PDF wilt downloaden.",
    primaryCta: "Maak een ATS-vriendelijke cv",
    secondaryCta: "Bekijk ATS-vriendelijke templates",
    priceLine: "Gratis bouwen. Eénmalig €4,99 bij PDF-download. Geen abonnement.",
    analyzeAnother: "Ander CV analyseren",
  },
  en: {
    uploadTab: "Upload PDF / Word",
    textTab: "Paste text",
    missingFile: "Upload a PDF or Word file first.",
    shortText: "Paste at least 50 characters of your CV text.",
    connectionError: "Connection error. Please try again.",
    uploadPrompt: "Drop your CV here",
    uploadSub: "or click to upload — PDF or Word, max 5 MB",
    fileChange: "click to change",
    pasteLabel: "Paste your CV text",
    pastePlaceholder: "Copy the full text of your CV and paste it here...",
    minNeeded: "characters — minimum 50 needed",
    analyze: "Analyze my CV",
    analyzing: "Analyzing CV...",
    checksLabel: "checks",
    perfect: "🎉 Perfect score! Your CV is fully ATS-optimized.",
    resolveEyebrow: "Fix it now",
    resolveTitle: "Turn this into a Dutch-market CV now",
    resolveBody: "Use this check as your priority list. Move your profile, sections and work history into a cleaner Dutch-style template and only pay when you want the PDF.",
    primaryCta: "Create a Dutch-style CV",
    secondaryCta: "Compare English templates",
    priceLine: "Build for free. Pay one time when you download the PDF. No subscription.",
    analyzeAnother: "Analyze another CV",
  },
} as const;

function groupByCategory(checks: AtsCheck[]) {
  const map: Record<string, AtsCheck[]> = {};
  for (const check of checks) {
    if (!map[check.categorie]) {
      map[check.categorie] = [];
    }
    map[check.categorie].push(check);
  }
  return map;
}

export default function AtsCheckerTool({
  locale = "nl",
  editorHref,
  templatesHref,
  toolName,
  trackingPrefix,
}: AtsCheckerToolProps) {
  const strings = copy[locale];
  const resolvedEditorHref =
    editorHref ?? (locale === "en" ? "/en/editor?template=ats&startSource=ats_checker_result" : "/editor?template=ats&startSource=ats_checker_result");
  const resolvedTemplatesHref =
    templatesHref ?? (locale === "en" ? "/en/templates?startSource=ats_checker_template_compare" : "/templates?startSource=ats_checker_template_compare");
  const resolvedToolName = toolName ?? (locale === "en" ? "dutch-cv-checker" : "ats-cv-checker");
  const resolvedTrackingPrefix = trackingPrefix ?? resolvedToolName;

  const [mode, setMode] = useState<"upload" | "tekst">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [cvText, setCvText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AtsResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleAnalyze() {
    setError("");
    setIsLoading(true);
    setResult(null);

    try {
      let res: Response;

      if (mode === "upload") {
        if (!file) {
          setError(strings.missingFile);
          setIsLoading(false);
          return;
        }
        const formData = new FormData();
        formData.append("file", file);
        formData.append("locale", locale);
        res = await fetch(`/api/tools/ats-checker?locale=${locale}`, { method: "POST", body: formData });
      } else {
        if (cvText.trim().length < 50) {
          setError(strings.shortText);
          setIsLoading(false);
          return;
        }
        res = await fetch(`/api/tools/ats-checker?locale=${locale}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cvText, locale }),
        });
      }

      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? strings.connectionError);
        return;
      }
      setResult(json as AtsResult);
    } catch {
      setError(strings.connectionError);
    } finally {
      setIsLoading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      setFile(dropped);
    }
  }

  const dashOffset = result ? CIRC * (1 - result.score / 100) : CIRC;
  const ringColor = result ? kleurMap[result.labelKleur].ring : "#e2e8f0";
  const categories = result ? groupByCategory(result.checks) : {};
  const passedCount = result?.checks.filter((check) => check.passed).length ?? 0;
  const totalCount = result?.checks.length ?? 0;

  return (
    <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-8">
      {!result ? (
        <div className="space-y-5">
          <div className="flex overflow-hidden rounded-lg border-2 border-slate-200">
            <button
              type="button"
              onClick={() => setMode("upload")}
              className={`flex-1 py-2.5 text-xs font-black uppercase tracking-wide transition-colors ${
                mode === "upload" ? "bg-black text-white" : "bg-white text-slate-500 hover:bg-slate-50"
              }`}
            >
              {strings.uploadTab}
            </button>
            <button
              type="button"
              onClick={() => setMode("tekst")}
              className={`flex-1 py-2.5 text-xs font-black uppercase tracking-wide transition-colors ${
                mode === "tekst" ? "bg-black text-white" : "bg-white text-slate-500 hover:bg-slate-50"
              }`}
            >
              {strings.textTab}
            </button>
          </div>

          {mode === "upload" ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
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
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) {
                    setFile(selectedFile);
                  }
                }}
              />
              {file ? (
                <>
                  <div className="mb-2 text-2xl">📄</div>
                  <p className="text-sm font-black text-emerald-700">{file.name}</p>
                  <p className="mt-1 text-xs text-emerald-600">
                    {(file.size / 1024).toFixed(0)} KB — {strings.fileChange}
                  </p>
                </>
              ) : (
                <>
                  <div className="mb-3 text-3xl">☁</div>
                  <p className="mb-1 text-sm font-black text-slate-700">{strings.uploadPrompt}</p>
                  <p className="text-xs text-slate-400">{strings.uploadSub}</p>
                </>
              )}
            </div>
          ) : (
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                {strings.pasteLabel}
              </label>
              <textarea
                value={cvText}
                onChange={(e) => {
                  setCvText(e.target.value);
                  setError("");
                }}
                placeholder={strings.pastePlaceholder}
                rows={10}
                className={`${inputClass} resize-none`}
              />
              <p className="mt-1 text-xs text-slate-400">
                {cvText.length} {strings.minNeeded}
              </p>
            </div>
          )}

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 border-3 border-black bg-[#4ECDC4] px-6 py-3 text-sm font-black text-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-teal-500 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:cursor-not-allowed disabled:opacity-50"
            style={{ borderWidth: "3px" }}
          >
            {isLoading ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v8z" />
                </svg>
                {strings.analyzing}
              </>
            ) : (
              strings.analyze
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative h-24 w-24 shrink-0">
              <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
                <circle cx="48" cy="48" r={RADIUS} fill="none" stroke="#e2e8f0" strokeWidth="8" />
                <circle
                  cx="48"
                  cy="48"
                  r={RADIUS}
                  fill="none"
                  stroke={ringColor}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={dashOffset}
                  style={{ transition: "stroke-dashoffset 0.8s ease, stroke 0.4s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-800">{result.score}</span>
                <span className="-mt-0.5 text-[10px] font-bold text-slate-400">/ 100</span>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className={`text-lg font-black ${kleurMap[result.labelKleur].text}`}>{result.label}</span>
                <span className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${kleurMap[result.labelKleur].bg} ${kleurMap[result.labelKleur].border} ${kleurMap[result.labelKleur].text}`}>
                  {passedCount}/{totalCount} {strings.checksLabel}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{result.samenvatting}</p>
            </div>
          </div>

          {Object.entries(categories).map(([category, checks]) => (
            <div key={category}>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wide text-slate-500">{category}</span>
                <span className="text-[10px] font-bold text-slate-400">
                  {checks.filter((check) => check.passed).length}/{checks.length}
                </span>
              </div>
              <div className="space-y-1.5">
                {checks.filter((check) => !check.passed).map((check) => (
                  <div key={check.id} className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-red-300 bg-red-100">
                      <svg className="h-2.5 w-2.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold leading-snug text-slate-800">{check.label}</p>
                      {check.tip && <p className="mt-0.5 text-[11px] leading-snug text-red-700">{check.tip}</p>}
                    </div>
                    <span className="mt-0.5 shrink-0 text-[10px] font-bold text-slate-400">+{check.punten}</span>
                  </div>
                ))}
                {checks.filter((check) => check.passed).map((check) => (
                  <div key={check.id} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <svg className="h-2.5 w-2.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <p className="text-xs leading-snug text-slate-400 line-through">{check.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {result.score === 100 && (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 py-2 text-center text-sm font-bold text-emerald-700">
              {strings.perfect}
            </p>
          )}

          <div className="border-4 border-black bg-[#FFF7D6] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:p-5">
            <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-600">
              {strings.resolveEyebrow}
            </p>
            <h3 className="mb-2 text-lg font-black text-slate-900">{strings.resolveTitle}</h3>
            <p className="mb-4 text-sm leading-relaxed text-slate-700">{strings.resolveBody}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <TrackedToolLink
                href={resolvedEditorHref}
                eventName="tool_to_cv_cta_click"
                toolName={resolvedToolName}
                ctaVariant="primary"
                ctaIntent="cv_content"
                resultState={`ats_checker_score_${result.score}`}
                trackingLocation={`${resolvedTrackingPrefix}:result_primary`}
                trackingLabel={strings.primaryCta}
                className="flex flex-1 items-center justify-center gap-2 border-[3px] border-black bg-[#4ECDC4] px-4 py-3 text-sm font-black text-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                {strings.primaryCta}
              </TrackedToolLink>
              <TrackedToolLink
                href={resolvedTemplatesHref}
                eventName="tool_to_cv_cta_click"
                toolName={resolvedToolName}
                ctaVariant="secondary"
                ctaIntent="cv_content"
                resultState={`ats_checker_score_${result.score}`}
                trackingLocation={`${resolvedTrackingPrefix}:result_secondary`}
                trackingLabel={strings.secondaryCta}
                className="flex flex-1 items-center justify-center gap-2 border-2 border-black bg-white px-4 py-3 text-sm font-black text-slate-900 transition-colors hover:bg-slate-50"
              >
                {strings.secondaryCta}
              </TrackedToolLink>
            </div>
            <p className="mt-3 text-xs font-bold text-slate-600">{strings.priceLine}</p>
          </div>

          <button
            onClick={() => {
              setResult(null);
              setFile(null);
              setCvText("");
              setError("");
            }}
            className="w-full rounded-lg border-2 border-slate-300 px-4 py-3 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50"
          >
            {strings.analyzeAnother}
          </button>
        </div>
      )}
    </div>
  );
}
