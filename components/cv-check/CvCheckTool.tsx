"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState, type DragEvent } from "react";
import { track } from "@/lib/analytics";
import type { CVData } from "@/lib/cv";
import { fixEffort, resolvedByDesign, type FixEffort } from "@/lib/cv-check/fix-effort";
import { saveCheckedCvDataForEditor, saveCheckedCvForEditor } from "@/lib/cv-check/handoff";
import { cvDownloadPrice } from "@/lib/site-content";
import type { CvCheckCategory, CvCheckItem, CvCheckLocale, CvCheckResult } from "@/lib/cv-check/types";

// The templates only load once there is a result to preview.
const CvThumbnail = dynamic(() => import("@/components/app/CvThumbnail").then((module) => module.CvThumbnail), { ssr: false });

// The template the improve editor opens with (components/public-editor/PublicEditorSection.tsx).
const PREVIEW_TEMPLATE_ID = "professional";

type InputMode = "file" | "text";

/** The checked CV as WerkCV reads it, graded again as a WerkCV CV (see /api/cv-check/editor-grade). */
type Preview =
  | { status: "none" | "loading" | "failed" }
  | { status: "ready"; data: CVData; werkcvGrade: number | null; resolved: string[] };

const COPY = {
  nl: {
    upload: "Upload",
    paste: "Plak tekst",
    dropTitle: "Sleep je cv hierheen of kies een bestand",
    dropHint: "PDF of Word, maximaal 10 MB",
    chooseFile: "Kies bestand",
    pastePlaceholder: "Plak hier de volledige tekst van je cv…",
    vacancyToggle: "Vergelijk met een vacature (optioneel)",
    vacancyPlaceholder: "Plak de vacaturetekst: taken, eisen en wat een pre is…",
    submitGeneral: "Check mijn cv",
    submitVacancy: "Check cv tegen vacature",
    privacy: "Je cv wordt alleen voor deze check gebruikt en niet opgeslagen.",
    stepsGeneral: ["Tekst uitlezen", "Opbouw controleren", "Inhoud beoordelen"],
    stepVacancy: "Vacature vergelijken",
    missingFile: "Kies eerst een PDF- of Word-bestand.",
    shortText: "Plak de volledige tekst van je cv.",
    connection: "Verbindingsfout. Probeer het opnieuw.",
    yourGrade: "Jouw cijfer",
    general: "Algemene cv-check",
    match: "Match met vacature",
    bands: { onvoldoende: "Onvoldoende", voldoende: "Voldoende", goed: "Goed", uitstekend: "Uitstekend" },
    topFixes: "Verbeter eerst deze 3 punten",
    openingEditor: "Editor openen...",
    requirements: "Eisen uit de vacature",
    hardFirst: "Harde eisen staan bovenaan; een 'pre' is een pluspunt, geen harde eis.",
    essential: "Harde eis",
    preferred: "Pre",
    status: { strong: "Aangetoond", partial: "Deels", missing: "Ontbreekt" },
    inCv: "In je cv",
    inVacancy: "In de vacature",
    honestAction: "Wat je kunt doen",
    missingKeywords: "Termen uit de vacature die je cv nog niet aantoont",
    aiUnavailable: "De vacaturevergelijking is nu niet beschikbaar. Je algemene cv-check hieronder is wel compleet.",
    parseTitle: "Zo leest een systeem je cv",
    parseIntro: "Dit haalt een tekstgebaseerd systeem automatisch uit je cv. Ontbreekt hier iets, dan mist een sollicitatiesysteem het waarschijnlijk ook.",
    parseName: "Naam (eerste regel)",
    parseEmail: "E-mail",
    parsePhone: "Telefoon",
    parseLinkedin: "LinkedIn",
    parseSections: "Standaardkopjes gevonden",
    parsePeriods: "Periodes met datum",
    parseColumns: "Let op: twee kolommen naast elkaar. Systemen kunnen links en rechts door elkaar lezen.",
    parseFromImages: "Let op: je cv is een afbeelding. Wij lazen deze gegevens met AI; de meeste sollicitatiesystemen lezen hier niets uit.",
    notFound: "Niet gevonden",
    found: "Gevonden",
    sectionNames: { profile: "Profiel", experience: "Werkervaring", education: "Opleiding", skills: "Vaardigheden", languages: "Talen" },
    allChecks: "Alle controles",
    passedCount: (n: number) => `${n} geslaagd`,
    info: "Ter info",
    limitsTitle: "Wat deze check wel en niet zegt",
    limits: [
      "Sollicitatiesystemen wijzen cv's zelden automatisch af; ze lezen je gegevens uit en recruiters zoeken en filteren erin. Deze check kijkt daarom naar leesbaarheid, inhoud en aansluiting.",
      "Het cijfer is geen garantie of voorspelling van een uitnodiging. Voeg alleen informatie toe die klopt.",
    ],
    methodology: "Zo berekenen we het cijfer",
    rescan: "Opnieuw checken",
    rescanHint: "Pas je cv aan en check opnieuw. Opnieuw checken is gratis.",
    verdict: (band: CvCheckResult["gradeBand"], fixes: number) =>
      fixes === 0
        ? "Je cv is sterk"
        : band === "onvoldoende"
          ? "Je cv mist nog belangrijke punten"
          : `Je cv is ${band === "voldoende" ? "voldoende" : "goed"}, maar ${fixes === 1 ? "1 punt kost" : `${fixes} punten kosten`} je kansen`,
    effort: { design: "Al opgelost in WerkCV", quick: "Snel aan te passen", write: "Zelf aanpassen" } satisfies Record<FixEffort, string>,
    previewTitle: "Zo ziet je cv eruit in WerkCV",
    previewIntro: "Je eigen cv, al ingeladen, in een ATS-veilig ontwerp.",
    previewLoading: "We zetten je cv in een WerkCV-ontwerp…",
    previewFailed: "Het voorbeeld lukte niet, maar je kunt je cv wel in de editor openen en daar verbeteren.",
    previewText: "In de editor pas je je cv aan en zie je het resultaat direct.",
    gradeYourFile: "Je bestand",
    gradeInWerkcv: "Zelfde inhoud in WerkCV",
    resolvedTitle: "Al opgelost door het WerkCV-ontwerp",
    cta: (fixes: number) => (fixes === 0 ? "Open mijn cv in de editor" : fixes === 1 ? "Verbeter dit punt in mijn cv" : `Verbeter mijn cv met deze ${fixes} punten`),
    ctaNote: `Gratis aanpassen, zonder account · je betaalt pas ${cvDownloadPrice.display} als je de PDF downloadt · geen abonnement`,
    strongTitle: "Wat nu?",
    strongVacancyTitle: "Check je cv tegen een vacature",
    strongVacancyText: "Plak een vacature. Je ziet welke eisen je cv al raakt en welke nog ontbreken.",
    strongVacancyButton: "Check tegen een vacature",
    strongDesignTitle: "Zet je cv in een ATS-veilig ontwerp",
    strongDesignText: "Je inhoud blijft, de opmaak wordt strak en goed leesbaar voor systemen.",
    strongDesignButton: "Bekijk mijn cv in de editor",
  },
  en: {
    upload: "Upload",
    paste: "Paste text",
    dropTitle: "Drop your CV here or choose a file",
    dropHint: "PDF or Word, up to 10 MB",
    chooseFile: "Choose file",
    pastePlaceholder: "Paste the full text of your CV…",
    vacancyToggle: "Compare with a job ad (optional)",
    vacancyPlaceholder: "Paste the job ad: tasks, requirements and nice-to-haves…",
    submitGeneral: "Check my CV",
    submitVacancy: "Check CV against the job",
    privacy: "Your CV is only used for this check and is not stored.",
    stepsGeneral: ["Reading the text", "Checking the structure", "Reviewing the content"],
    stepVacancy: "Comparing with the job",
    missingFile: "Choose a PDF or Word file first.",
    shortText: "Paste the full text of your CV.",
    connection: "Connection error. Please try again.",
    yourGrade: "Your grade",
    general: "General CV check",
    match: "Match with the job",
    bands: { onvoldoende: "Below standard", voldoende: "Sufficient", goed: "Good", uitstekend: "Excellent" },
    topFixes: "Fix these 3 points first",
    openingEditor: "Opening the editor...",
    requirements: "Requirements from the job ad",
    hardFirst: "Hard requirements come first; a nice-to-have is a plus, not a requirement.",
    essential: "Requirement",
    preferred: "Nice to have",
    status: { strong: "Shown", partial: "Partly", missing: "Missing" },
    inCv: "In your CV",
    inVacancy: "In the job ad",
    honestAction: "What you can do",
    missingKeywords: "Terms from the job ad your CV does not show yet",
    aiUnavailable: "The job comparison is unavailable right now. Your general CV check below is complete.",
    parseTitle: "How a system reads your CV",
    parseIntro: "This is what a text-based system extracts from your CV automatically. If something is missing here, an application system probably misses it too.",
    parseName: "Name (first line)",
    parseEmail: "Email",
    parsePhone: "Phone",
    parseLinkedin: "LinkedIn",
    parseSections: "Standard headings found",
    parsePeriods: "Periods with dates",
    parseColumns: "Note: two columns side by side. Systems may mix up the left and right text.",
    parseFromImages: "Note: your CV is an image. We read these details with AI; most application systems read nothing from it.",
    notFound: "Not found",
    found: "Found",
    sectionNames: { profile: "Profile", experience: "Experience", education: "Education", skills: "Skills", languages: "Languages" },
    allChecks: "All checks",
    passedCount: (n: number) => `${n} passed`,
    info: "For your information",
    limitsTitle: "What this check does and does not tell you",
    limits: [
      "Application systems rarely reject CVs automatically; they extract your details and recruiters search and filter them. This check therefore looks at readability, content and fit.",
      "The grade is not a guarantee or prediction of an interview. Only add information that is true.",
    ],
    methodology: "How we calculate the grade",
    rescan: "Check again",
    rescanHint: "Update your CV and check again. Re-checking is free.",
    verdict: (band: CvCheckResult["gradeBand"], fixes: number) =>
      fixes === 0
        ? "Your CV is strong"
        : band === "onvoldoende"
          ? "Your CV is still missing important points"
          : `Your CV is ${band === "voldoende" ? "decent" : "good"}, but ${fixes === 1 ? "1 point is" : `${fixes} points are`} costing you chances`,
    effort: { design: "Already fixed in WerkCV", quick: "Quick to fix", write: "Edit yourself" } satisfies Record<FixEffort, string>,
    previewTitle: "Your CV in WerkCV",
    previewIntro: "Your own CV, already imported, in an ATS-safe design.",
    previewLoading: "Putting your CV into a WerkCV design…",
    previewFailed: "The preview did not work, but you can still open your CV in the editor and improve it there.",
    previewText: "In the editor you update your CV and see the result straight away.",
    gradeYourFile: "Your file",
    gradeInWerkcv: "Same content in WerkCV",
    resolvedTitle: "Already fixed by the WerkCV design",
    cta: (fixes: number) => (fixes === 0 ? "Open my CV in the editor" : fixes === 1 ? "Fix this point in my CV" : `Improve my CV with these ${fixes} points`),
    ctaNote: `Free to edit, no account · you only pay ${cvDownloadPrice.displayEn} when you download the PDF · no subscription`,
    strongTitle: "What next?",
    strongVacancyTitle: "Check your CV against a job ad",
    strongVacancyText: "Paste a job ad. You see which requirements your CV already covers and which are missing.",
    strongVacancyButton: "Check against a job ad",
    strongDesignTitle: "Put your CV in an ATS-safe design",
    strongDesignText: "Your content stays; the layout becomes clean and easy for systems to read.",
    strongDesignButton: "View my CV in the editor",
  },
} as const;

const CATEGORY_ORDER: Array<Exclude<CvCheckCategory, "vacancy">> = ["parsing", "basics", "content", "dutch"];

function formatGrade(grade: number, locale: CvCheckLocale): string {
  return new Intl.NumberFormat(locale === "en" ? "en-GB" : "nl-NL", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(grade);
}

function bandTone(band: CvCheckResult["gradeBand"]): string {
  if (band === "uitstekend" || band === "goed") return "wk-badge-success";
  if (band === "voldoende") return "wk-badge-warning";
  return "wk-badge-danger";
}

function barColor(score: number): string {
  if (score >= 80) return "bg-emerald-500";
  if (score >= 55) return "bg-amber-400";
  return "bg-rose-500";
}

function statusIcon(check: CvCheckItem): { symbol: string; className: string } {
  if (check.status === "pass") return { symbol: "✓", className: "text-emerald-600" };
  if (check.status === "info") return { symbol: "i", className: "text-sky-600" };
  if (check.severity === "critical") return { symbol: "!", className: "text-rose-600" };
  return { symbol: "•", className: "text-amber-600" };
}

export default function CvCheckTool({
  locale,
  initialVacancyText = "",
  initialShowVacancy = false,
  initialInputMode = "file",
  entry = "direct",
  methodologyHref,
  editorHref,
}: {
  locale: CvCheckLocale;
  initialVacancyText?: string;
  /** Opens the vacancy field on load (the /cv-check/vacature pages). */
  initialShowVacancy?: boolean;
  /** "text" opens the paste field first (e.g. for text copied from ChatGPT). */
  initialInputMode?: InputMode;
  entry?: "direct" | "vacancy_page" | "vacancy_mode" | "chatgpt_guide" | "app" | "app_vacancy";
  methodologyHref: string;
  editorHref: string;
}) {
  const copy = COPY[locale];
  const [inputMode, setInputMode] = useState<InputMode>(initialInputMode);
  const [file, setFile] = useState<File | null>(null);
  const [cvText, setCvText] = useState("");
  const [showVacancy, setShowVacancy] = useState(initialShowVacancy || Boolean(initialVacancyText));
  const [vacancyText, setVacancyText] = useState(initialVacancyText);
  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<CvCheckResult | null>(null);
  const [dragging, setDragging] = useState(false);
  const [openingEditor, setOpeningEditor] = useState(false);
  const [preview, setPreview] = useState<Preview>({ status: "none" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const vacancyRef = useRef<HTMLTextAreaElement>(null);
  // The checked file is handed to the editor (see lib/cv-check/handoff.ts) so it opens with this CV.
  const canHandOffFile = inputMode === "file" && Boolean(file);

  async function openEditor(source: "main" | "mobile" | "strong_design") {
    if (openingEditor || !result) return;
    setOpeningEditor(true);
    // The to-do list in the editor: the top fixes first, then the other failed checks.
    const topIds = result.topFixes.map((fix) => fix.checkId);
    const failedChecks = result.checks
      .filter((check) => check.status === "fail")
      .sort((a, b) => (topIds.includes(a.id) ? topIds.indexOf(a.id) : 99) - (topIds.includes(b.id) ? topIds.indexOf(b.id) : 99))
      .map((check) => ({ id: check.id, label: check.label, fix: check.fix }));
    // Prefer the CV as already read for the preview; the file stays as a fallback for the editor's own import.
    const dataHandoff = preview.status === "ready" && file ? await saveCheckedCvDataForEditor(preview.data, failedChecks, file.name) : false;
    const fileHandoff = canHandOffFile && file ? await saveCheckedCvForEditor(file) : false;
    const handoff = dataHandoff || fileHandoff;
    const firstFix = result.topFixes[0];
    track("cv_check_fix_clicked", {
      locale,
      check_id: firstFix?.checkId ?? "none",
      category: firstFix?.category ?? "none",
      handoff,
      source,
      preview: preview.status,
    });
    window.location.assign(handoff ? `${editorHref}${editorHref.includes("?") ? "&" : "?"}upload=1` : editorHref);
  }

  // Reads the checked file the way the editor will (one AI parse, reused by the editor) and grades it
  // as a WerkCV CV. Checks that fail on the file but not in WerkCV are "fixed by the design".
  async function preparePreview(checkedFile: File, checked: CvCheckResult) {
    setPreview({ status: "loading" });
    const fail = (outcome: "parse_failed" | "rate_limited" | "grade_failed") => {
      setPreview({ status: "failed" });
      track("cv_check_preview_ready", { locale, outcome });
    };
    try {
      const form = new FormData();
      form.append("file", checkedFile);
      const parseResponse = await fetch("/api/public/cv/parse", { method: "POST", body: form, headers: { "x-werkcv-language": locale } });
      const parsed = (await parseResponse.json().catch(() => ({}))) as { data?: CVData };
      if (!parseResponse.ok || !parsed.data) return fail(parseResponse.status === 429 ? "rate_limited" : "parse_failed");

      const gradeResponse = await fetch("/api/cv-check/editor-grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: parsed.data, locale, templateId: PREVIEW_TEMPLATE_ID }),
      });
      const graded = (await gradeResponse.json().catch(() => ({}))) as { status?: string; grade?: number; failed?: Array<{ id: string }> };
      if (!gradeResponse.ok || graded.status !== "ok" || typeof graded.grade !== "number" || !graded.failed) return fail("grade_failed");

      const originalFailed = checked.checks.filter((check) => check.status === "fail").map((check) => check.id);
      const resolved = resolvedByDesign(originalFailed, graded.failed.map((check) => check.id));
      // Only claim a better grade when there is one; the general grade is the fair comparison.
      const werkcvGrade = graded.grade > checked.generalGrade ? graded.grade : null;
      setPreview({ status: "ready", data: parsed.data, werkcvGrade, resolved });
      track("cv_check_preview_ready", {
        locale,
        outcome: "ok",
        grade_bucket: String(Math.floor(graded.grade)),
        grade_gain: Math.round((graded.grade - checked.generalGrade) * 10) / 10,
        resolved_count: resolved.length,
      });
    } catch {
      fail("parse_failed");
    }
  }

  function checkAgainstVacancy() {
    track("cv_check_vacancy_path_clicked", { locale });
    setResult(null);
    setPreview({ status: "none" });
    setShowVacancy(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.setTimeout(() => vacancyRef.current?.focus(), 400);
  }

  const withVacancy = showVacancy && vacancyText.trim().length > 0;
  const steps = withVacancy ? [...copy.stepsGeneral, copy.stepVacancy] : [...copy.stepsGeneral];

  useEffect(() => {
    track("cv_check_viewed", { locale, entry });
  }, [locale, entry]);

  useEffect(() => {
    if (!loading) return;
    setStepIndex(0);
    const timer = window.setInterval(() => {
      setStepIndex((index) => Math.min(index + 1, steps.length - 1));
    }, 1600);
    return () => window.clearInterval(timer);
  }, [loading, steps.length]);

  async function runCheck() {
    setError("");
    const mode = withVacancy ? "vacancy" : "general";
    if (inputMode === "file" && !file) {
      setError(copy.missingFile);
      return;
    }
    if (inputMode === "text" && cvText.trim().length < 200) {
      setError(copy.shortText);
      return;
    }

    setLoading(true);
    setResult(null);
    setPreview({ status: "none" });
    const startedAt = Date.now();
    track("cv_check_started", { locale, mode, input_type: inputMode });

    try {
      let response: Response;
      if (inputMode === "file" && file) {
        const formData = new FormData();
        formData.append("cvFile", file);
        formData.append("locale", locale);
        if (withVacancy) formData.append("vacancyText", vacancyText);
        response = await fetch(`/api/cv-check?locale=${locale}`, { method: "POST", body: formData });
      } else {
        response = await fetch(`/api/cv-check?locale=${locale}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cvText, vacancyText: withVacancy ? vacancyText : null, locale }),
        });
      }
      const data = (await response.json().catch(() => ({}))) as { result?: CvCheckResult; error?: string; code?: string };
      if (!response.ok || !data.result) {
        track("cv_check_failed", { locale, mode, input_type: inputMode, code: data.code || `HTTP_${response.status}` });
        setError(data.error || copy.connection);
        return;
      }
      setResult(data.result);
      track("cv_check_completed", {
        locale,
        mode,
        input_type: inputMode,
        grade_bucket: String(Math.floor(data.result.grade)),
        critical_count: data.result.checks.filter((check) => check.severity === "critical" && check.status === "fail").length,
        // Check IDs only (never CV text): input for the aggregate "most common mistakes" report.
        failed_checks: data.result.checks
          .filter((check) => check.status === "fail")
          .map((check) => check.id)
          .join(","),
        ai_status: data.result.aiStatus,
        text_source: data.result.layout.textFromImages ? "ocr" : inputMode,
        duration_ms: Date.now() - startedAt,
        score_version: data.result.scoreVersion,
      });
      if (inputMode === "file" && file) void preparePreview(file, data.result);
      window.setTimeout(() => reportRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    } catch {
      track("cv_check_failed", { locale, mode, input_type: inputMode, code: "NETWORK_ERROR" });
      setError(copy.connection);
    } finally {
      setLoading(false);
    }
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) setFile(dropped);
  }

  function rescan() {
    track("cv_check_rescan_clicked", { locale });
    setResult(null);
    setPreview({ status: "none" });
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="space-y-8">
      {!result && (
        <div className="wk-card p-5 md:p-6">
          <div role="tablist" aria-label={copy.upload} className="mb-4 inline-flex rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] p-1">
            {(["file", "text"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                role="tab"
                aria-selected={inputMode === mode}
                onClick={() => setInputMode(mode)}
                className={`rounded-[var(--wk-radius-sm)] px-4 py-2 text-sm font-semibold ${
                  inputMode === mode ? "bg-[var(--wk-ink)] text-white" : "text-[var(--wk-ink-muted)]"
                }`}
              >
                {mode === "file" ? copy.upload : copy.paste}
              </button>
            ))}
          </div>

          {inputMode === "file" ? (
            <div
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`flex flex-col items-center justify-center gap-3 rounded-[var(--wk-radius-md)] border-2 border-dashed p-8 text-center transition-colors ${
                dragging ? "border-[var(--wk-accent)] bg-[var(--wk-accent-soft)]" : "border-[var(--wk-border-strong)] bg-[var(--wk-surface)]"
              }`}
            >
              <p className="font-semibold text-[var(--wk-ink)]">{file ? file.name : copy.dropTitle}</p>
              <p className="text-sm text-[var(--wk-ink-muted)]">{copy.dropHint}</p>
              <button type="button" className="wk-button wk-button-secondary wk-button-small" onClick={() => fileInputRef.current?.click()}>
                {copy.chooseFile}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                className="sr-only"
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              />
            </div>
          ) : (
            <textarea
              className="wk-input min-h-[220px] w-full"
              placeholder={copy.pastePlaceholder}
              value={cvText}
              onChange={(event) => setCvText(event.target.value)}
              aria-label={copy.paste}
            />
          )}

          <div className="mt-4">
            <button
              type="button"
              aria-expanded={showVacancy}
              onClick={() => setShowVacancy((open) => !open)}
              className="text-sm font-semibold text-[var(--wk-ink)] underline underline-offset-4"
            >
              {showVacancy ? "− " : "+ "}
              {copy.vacancyToggle}
            </button>
            {showVacancy && (
              <textarea
                ref={vacancyRef}
                className="wk-input mt-3 min-h-[160px] w-full"
                placeholder={copy.vacancyPlaceholder}
                value={vacancyText}
                onChange={(event) => setVacancyText(event.target.value)}
                aria-label={copy.vacancyToggle}
              />
            )}
          </div>

          {error && (
            <p role="alert" className="mt-4 rounded-[var(--wk-radius-sm)] border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
              {error}
            </p>
          )}

          {loading ? (
            <ol className="mt-5 space-y-2" aria-live="polite">
              {steps.map((step, index) => (
                <li key={step} className="flex items-center gap-2 text-sm">
                  <span
                    aria-hidden="true"
                    className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                      index < stepIndex ? "bg-emerald-500 text-white" : index === stepIndex ? "animate-pulse bg-[var(--wk-accent)] text-white" : "bg-[var(--wk-surface-subtle)]"
                    }`}
                  >
                    {index < stepIndex ? "✓" : ""}
                  </span>
                  <span className={index <= stepIndex ? "font-semibold text-[var(--wk-ink)]" : "text-[var(--wk-ink-muted)]"}>{step}</span>
                </li>
              ))}
            </ol>
          ) : (
            <div className="mt-5 flex flex-col items-start gap-2">
              <button type="button" className="wk-button wk-button-primary" onClick={runCheck}>
                {withVacancy ? copy.submitVacancy : copy.submitGeneral}
              </button>
              <p className="text-xs text-[var(--wk-ink-muted)]">🔒 {copy.privacy}</p>
            </div>
          )}
        </div>
      )}

      {result && (
        <div ref={reportRef} className="scroll-mt-24 space-y-6">
          <Summary result={result} locale={locale} />
          {result.topFixes.length > 0 ? (
            <>
              {/* On phones the main action sits right under the grade. */}
              <div className="lg:hidden">
                <ImproveButton locale={locale} fixes={result.topFixes.length} opening={openingEditor} onClick={() => void openEditor("mobile")} />
              </div>
              <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
                <TopFixes result={result} locale={locale} preview={preview} />
                <ImprovePanel result={result} locale={locale} preview={preview} opening={openingEditor} onImprove={() => void openEditor("main")} />
              </div>
            </>
          ) : (
            <StrongPaths
              result={result}
              locale={locale}
              preview={preview}
              opening={openingEditor}
              onVacancy={checkAgainstVacancy}
              onDesign={() => void openEditor("strong_design")}
            />
          )}
          {result.aiStatus === "unavailable" && (
            <p className="rounded-[var(--wk-radius-sm)] border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">{copy.aiUnavailable}</p>
          )}
          {result.vacancy && <VacancySection result={result} locale={locale} />}
          <ParsePreviewCard result={result} locale={locale} />
          <AllChecks result={result} locale={locale} />
          <section className="wk-card p-5">
            <h2 className="text-lg font-semibold text-[var(--wk-ink)]">{copy.limitsTitle}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--wk-ink-muted)]">
              {copy.limits.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <Link href={methodologyHref} className="mt-3 inline-block text-sm font-semibold underline underline-offset-4">
              {copy.methodology}
            </Link>
          </section>
          <div className="flex flex-col items-start gap-2">
            <button type="button" className="wk-button wk-button-secondary" onClick={rescan}>
              {copy.rescan}
            </button>
            <p className="text-xs text-[var(--wk-ink-muted)]">{copy.rescanHint}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Summary({ result, locale }: { result: CvCheckResult; locale: CvCheckLocale }) {
  const copy = COPY[locale];
  return (
    <section className="wk-card p-5 md:p-6" aria-labelledby="cv-check-grade">
      <h2 className="mb-4 text-2xl font-semibold text-[var(--wk-ink)]">{copy.verdict(result.gradeBand, result.topFixes.length)}</h2>
      <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
        <div>
          <p id="cv-check-grade" className="text-sm font-semibold text-[var(--wk-ink-muted)]">
            {result.vacancy ? copy.match : copy.yourGrade}
          </p>
          <p className="text-6xl font-semibold leading-none text-[var(--wk-ink)]">{formatGrade(result.grade, locale)}</p>
          <span className={`wk-badge mt-2 inline-block ${bandTone(result.gradeBand)}`}>{copy.bands[result.gradeBand]}</span>
        </div>
        {result.vacancy && (
          <div>
            <p className="text-sm font-semibold text-[var(--wk-ink-muted)]">{copy.general}</p>
            <p className="text-3xl font-semibold text-[var(--wk-ink)]">{formatGrade(result.generalGrade, locale)}</p>
          </div>
        )}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {result.categories.map((category) => (
          <div key={category.id}>
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-[var(--wk-ink)]">{category.label}</span>
              <span className="text-[var(--wk-ink-muted)]">{category.score}/100</span>
            </div>
            <div className="mt-1 h-2 rounded-full bg-[var(--wk-surface-subtle)]" aria-hidden="true">
              <div className={`h-2 rounded-full ${barColor(category.score)}`} style={{ width: `${category.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const EFFORT_BADGE: Record<FixEffort, string> = {
  design: "wk-badge-success",
  quick: "wk-badge-accent",
  write: "wk-badge-warning",
};

function TopFixes({ result, locale, preview }: { result: CvCheckResult; locale: CvCheckLocale; preview: Preview }) {
  const copy = COPY[locale];
  // "Already fixed in WerkCV" is only claimed once the preview has measured it.
  const resolved = new Set(preview.status === "ready" ? preview.resolved : []);
  return (
    <section aria-labelledby="cv-check-top-fixes">
      <h2 id="cv-check-top-fixes" className="text-xl font-semibold text-[var(--wk-ink)]">
        {copy.topFixes}
      </h2>
      <ol className="mt-3 space-y-3">
        {result.topFixes.map((fix, index) => {
          const effort = fixEffort(fix.checkId, resolved);
          return (
            <li key={fix.checkId} className="wk-card p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="font-semibold text-[var(--wk-ink)]">
                  {index + 1}. {fix.title}
                </p>
                <span className={`wk-badge ${EFFORT_BADGE[effort]}`}>{copy.effort[effort]}</span>
              </div>
              {fix.evidence && <p className="mt-1 text-sm italic text-[var(--wk-ink-muted)]">“{fix.evidence}”</p>}
              <p className="mt-2 text-sm text-[var(--wk-ink)]">{fix.fix}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function ImproveButton({ locale, fixes, opening, onClick }: { locale: CvCheckLocale; fixes: number; opening: boolean; onClick: () => void }) {
  const copy = COPY[locale];
  return (
    <div>
      <button type="button" className="wk-button wk-button-primary w-full justify-center py-4 text-base" onClick={onClick} disabled={opening}>
        {opening ? copy.openingEditor : `${copy.cta(fixes)} →`}
      </button>
      <p className="mt-2 text-center text-xs text-[var(--wk-ink-muted)]">{copy.ctaNote}</p>
    </div>
  );
}

function PreviewThumbnail({ preview, locale }: { preview: Preview; locale: CvCheckLocale }) {
  const copy = COPY[locale];
  if (preview.status === "ready") {
    return (
      <div className="mx-auto w-full max-w-[340px] overflow-hidden rounded-md border border-[var(--wk-border)] shadow-[var(--wk-shadow-md)]">
        <CvThumbnail data={preview.data} templateId={PREVIEW_TEMPLATE_ID} />
      </div>
    );
  }
  if (preview.status === "loading") {
    return (
      <div className="mx-auto flex aspect-[210/240] w-full max-w-[340px] items-center justify-center rounded-md border border-dashed border-[var(--wk-border-strong)] bg-[var(--wk-surface)] p-6 text-center text-sm text-[var(--wk-ink-muted)]" aria-live="polite">
        <span className="animate-pulse">{copy.previewLoading}</span>
      </div>
    );
  }
  return null;
}

function ImprovePanel({
  result,
  locale,
  preview,
  opening,
  onImprove,
}: {
  result: CvCheckResult;
  locale: CvCheckLocale;
  preview: Preview;
  opening: boolean;
  onImprove: () => void;
}) {
  const copy = COPY[locale];
  const resolvedLabels =
    preview.status === "ready"
      ? preview.resolved.map((id) => result.checks.find((check) => check.id === id)?.label).filter((label): label is string => Boolean(label))
      : [];
  return (
    <section aria-labelledby="cv-check-improve" className="wk-card bg-[var(--wk-surface-subtle)] p-5 md:p-6">
      <h2 id="cv-check-improve" className="text-xl font-semibold text-[var(--wk-ink)]">
        {copy.previewTitle}
      </h2>
      <p className="mt-1 text-sm text-[var(--wk-ink-muted)]">
        {preview.status === "failed" ? copy.previewFailed : preview.status === "none" ? copy.previewText : copy.previewIntro}
      </p>
      <div className="mt-4">
        <PreviewThumbnail preview={preview} locale={locale} />
      </div>
      {preview.status === "ready" && preview.werkcvGrade !== null && (
        <dl className="mt-4 flex items-center justify-center gap-4 text-center">
          <div>
            <dt className="text-xs font-semibold text-[var(--wk-ink-muted)]">{copy.gradeYourFile}</dt>
            <dd className="text-2xl font-semibold text-[var(--wk-ink-muted)]">{formatGrade(result.generalGrade, locale)}</dd>
          </div>
          <span aria-hidden="true" className="text-xl text-[var(--wk-ink-muted)]">→</span>
          <div>
            <dt className="text-xs font-semibold text-[var(--wk-ink-muted)]">{copy.gradeInWerkcv}</dt>
            <dd className="text-3xl font-semibold text-[var(--wk-success)]">{formatGrade(preview.werkcvGrade, locale)}</dd>
          </div>
        </dl>
      )}
      {resolvedLabels.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-[var(--wk-ink)]">{copy.resolvedTitle}</p>
          <ul className="mt-1 space-y-1 text-sm text-[var(--wk-ink)]">
            {resolvedLabels.map((label) => (
              <li key={label}>
                <span aria-hidden="true" className="mr-1 font-bold text-[var(--wk-success)]">✓</span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-5">
        <ImproveButton locale={locale} fixes={result.topFixes.length} opening={opening} onClick={onImprove} />
      </div>
    </section>
  );
}

function StrongPaths({
  result,
  locale,
  preview,
  opening,
  onVacancy,
  onDesign,
}: {
  result: CvCheckResult;
  locale: CvCheckLocale;
  preview: Preview;
  opening: boolean;
  onVacancy: () => void;
  onDesign: () => void;
}) {
  const copy = COPY[locale];
  return (
    <section aria-labelledby="cv-check-next">
      <h2 id="cv-check-next" className="text-xl font-semibold text-[var(--wk-ink)]">
        {copy.strongTitle}
      </h2>
      <div className={`mt-3 grid gap-6 ${result.vacancy ? "" : "lg:grid-cols-2"}`}>
        {!result.vacancy && (
          <div className="wk-card p-5 md:p-6">
            <h3 className="text-lg font-semibold text-[var(--wk-ink)]">{copy.strongVacancyTitle}</h3>
            <p className="mt-1 text-sm text-[var(--wk-ink-muted)]">{copy.strongVacancyText}</p>
            <button type="button" className="wk-button wk-button-primary mt-4" onClick={onVacancy}>
              {copy.strongVacancyButton}
            </button>
          </div>
        )}
        <div className="wk-card p-5 md:p-6">
          <h3 className="text-lg font-semibold text-[var(--wk-ink)]">{copy.strongDesignTitle}</h3>
          <p className="mt-1 text-sm text-[var(--wk-ink-muted)]">{copy.strongDesignText}</p>
          <div className="mt-4">
            <PreviewThumbnail preview={preview} locale={locale} />
          </div>
          <button type="button" className="wk-button wk-button-secondary mt-4" onClick={onDesign} disabled={opening}>
            {opening ? copy.openingEditor : copy.strongDesignButton}
          </button>
          <p className="mt-2 text-xs text-[var(--wk-ink-muted)]">{copy.ctaNote}</p>
        </div>
      </div>
    </section>
  );
}

function VacancySection({ result, locale }: { result: CvCheckResult; locale: CvCheckLocale }) {
  const copy = COPY[locale];
  const vacancy = result.vacancy!;
  const requirements = [...vacancy.requirements].sort(
    (a, b) => Number(b.importance === "essential") - Number(a.importance === "essential"),
  );
  const chip = { strong: "wk-badge-success", partial: "wk-badge-warning", missing: "wk-badge-danger" } as const;
  // Only short terms are useful as "keywords"; full requirement sentences are already listed above.
  const keywords = vacancy.missingKeywords.filter((keyword) => keyword.split(/\s+/).length <= 4 && !/[.!?]$/.test(keyword));
  return (
    <section aria-labelledby="cv-check-requirements" className="wk-card p-5 md:p-6">
      <h2 id="cv-check-requirements" className="text-xl font-semibold text-[var(--wk-ink)]">
        {copy.requirements}
      </h2>
      <p className="mt-1 text-sm text-[var(--wk-ink-muted)]">{copy.hardFirst}</p>
      <ul className="mt-4 divide-y divide-[var(--wk-border)]">
        {requirements.map((requirement) => (
          <li key={`${requirement.requirement}-${requirement.vacancyEvidence}`} className="py-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`wk-badge ${
                  // A missing "pre" is a plus you lack, not a failed requirement.
                  requirement.status === "missing" && requirement.importance === "preferred" ? "wk-badge-warning" : chip[requirement.status]
                }`}
              >
                {copy.status[requirement.status]}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--wk-ink-muted)]">
                {requirement.importance === "essential" ? copy.essential : copy.preferred}
              </span>
            </div>
            <p className="mt-1 font-semibold text-[var(--wk-ink)]">{requirement.requirement}</p>
            <dl className="mt-1 grid gap-1 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-[var(--wk-ink-muted)]">{copy.inVacancy}</dt>
                <dd className="italic">“{requirement.vacancyEvidence}”</dd>
              </div>
              {requirement.cvEvidence && (
                <div>
                  <dt className="text-[var(--wk-ink-muted)]">{copy.inCv}</dt>
                  <dd className="italic">“{requirement.cvEvidence}”</dd>
                </div>
              )}
            </dl>
            {requirement.status !== "strong" && requirement.honestAction && (
              <p className="mt-1 text-sm">
                <span className="font-semibold">{copy.honestAction}: </span>
                {requirement.honestAction}
              </p>
            )}
          </li>
        ))}
      </ul>
      {keywords.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-[var(--wk-ink)]">{copy.missingKeywords}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-[var(--wk-border)] bg-[var(--wk-surface)] px-3 py-1 text-sm text-[var(--wk-ink)]"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function ParsePreviewCard({ result, locale }: { result: CvCheckResult; locale: CvCheckLocale }) {
  const copy = COPY[locale];
  const preview = result.parsePreview;
  const columns = (result.layout.twoColumnRowShare ?? 0) >= 0.25;
  const rows: Array<[string, string | null]> = [
    [copy.parseName, preview.firstLine],
    [copy.parseEmail, preview.email],
    [copy.parsePhone, preview.phone],
    [copy.parseLinkedin, preview.linkedin ? copy.found : null],
    [
      copy.parseSections,
      preview.sections.length ? preview.sections.map((section) => copy.sectionNames[section]).join(", ") : null,
    ],
    [copy.parsePeriods, preview.datedPeriods ? String(preview.datedPeriods) : null],
  ];
  return (
    <section aria-labelledby="cv-check-parse" className="wk-card p-5 md:p-6">
      <h2 id="cv-check-parse" className="text-xl font-semibold text-[var(--wk-ink)]">
        {copy.parseTitle}
      </h2>
      <p className="mt-1 text-sm text-[var(--wk-ink-muted)]">{copy.parseIntro}</p>
      <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-3 border-b border-[var(--wk-border)] py-1">
            <dt className="text-[var(--wk-ink-muted)]">{label}</dt>
            <dd className={value ? "text-right font-semibold text-[var(--wk-ink)]" : "text-right text-rose-700"}>{value ?? copy.notFound}</dd>
          </div>
        ))}
      </dl>
      {result.layout.textFromImages && <p className="mt-3 text-sm font-semibold text-rose-700">{copy.parseFromImages}</p>}
      {columns && <p className="mt-3 text-sm font-semibold text-amber-800">{copy.parseColumns}</p>}
    </section>
  );
}

function AllChecks({ result, locale }: { result: CvCheckResult; locale: CvCheckLocale }) {
  const copy = COPY[locale];
  return (
    <section aria-labelledby="cv-check-all" className="space-y-3">
      <h2 id="cv-check-all" className="text-xl font-semibold text-[var(--wk-ink)]">
        {copy.allChecks}
      </h2>
      {CATEGORY_ORDER.map((categoryId) => {
        const category = result.categories.find((item) => item.id === categoryId);
        const checks = result.checks.filter((check) => check.category === categoryId && check.status !== "not_applicable");
        if (!category || !checks.length) return null;
        const failed = checks.filter((check) => check.status === "fail");
        const info = checks.filter((check) => check.status === "info");
        const passed = checks.filter((check) => check.status === "pass");
        return (
          // Collapsed: the screen leads with the top fixes and one action; the full report is one click away.
          <details key={categoryId} className="wk-card p-4">
            <summary className="flex cursor-pointer items-center justify-between gap-3 font-semibold text-[var(--wk-ink)]">
              <span>{category.label}</span>
              <span className="text-sm text-[var(--wk-ink-muted)]">
                {category.score}/100 · {copy.passedCount(passed.length)}
              </span>
            </summary>
            <ul className="mt-3 space-y-3">
              {[...failed, ...info, ...passed].map((check) => {
                const icon = statusIcon(check);
                return (
                  <li key={check.id} className="flex gap-3 text-sm">
                    <span aria-hidden="true" className={`w-4 shrink-0 text-center font-bold ${icon.className}`}>
                      {icon.symbol}
                    </span>
                    <div>
                      <p className="font-semibold text-[var(--wk-ink)]">
                        {check.label}
                        {check.status === "info" && <span className="ml-2 text-xs font-normal text-sky-700">{copy.info}</span>}
                      </p>
                      {check.evidence && check.status !== "pass" && <p className="text-[var(--wk-ink-muted)]">{check.evidence}</p>}
                      {check.fix && check.status !== "pass" && <p className="mt-1 text-[var(--wk-ink)]">{check.fix}</p>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </details>
        );
      })}
    </section>
  );
}
