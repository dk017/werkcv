"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import {
  buildCandidateProposalEvidenceReport,
  type CandidateProposalEvidenceReport,
  type CandidateProposalEvidenceRow,
  type EvidenceMatch,
} from "@/lib/tools/candidate-proposal-evidence";
import type { CvMatchLocale } from "@/lib/tools/cv-vacature-match";
import type { CvVacatureEvidenceResult } from "@/lib/tools/cv-vacature-match-schema";
import { getAgencyEvidenceSample, getSampleReport } from "@/lib/agency-evidence-sample";
import { getAgencyReviewScopeNotice, AGENCY_WORKSPACE_LANGUAGE_NOTICE } from "@/lib/agency-review-scope";

type InputMode = "text" | "file";

type ApiResponse = {
  result?: CvVacatureEvidenceResult;
  sourceText?: string;
  error?: string;
};

type CandidateProposalEvidenceCheckerProps = {
  locale?: CvMatchLocale;
  claimVerifierEnabled?: boolean;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx"]);

const inputClass = "wk-input w-full px-3 py-3 text-sm leading-relaxed outline-none transition";
const primaryButton = "wk-button wk-button-primary disabled:cursor-wait disabled:opacity-60";

function getCopy(locale: CvMatchLocale, claimVerifierEnabled: boolean) {
  if (locale === "en") {
    return {
      home: "Agency workspace",
      switchLabel: "Nederlands",
      switchHref: "/tools/kandidaatvoorstel-checker",
      badge: "Free agency tool · first-pass check",
      noAccount: "No account for the first check",
       title: claimVerifierEnabled ? "Check candidate-proposal claims against CV evidence" : "Check vacancy requirements against CV evidence",
       intro: claimVerifierEnabled
         ? "Compare one proposal with one candidate CV. The checker locates supporting source text and leaves weak or missing evidence visible before you prepare a client submission."
         : "Compare one vacancy with one candidate CV. The checker extracts the important requirements, locates supporting source text and leaves weak or missing evidence visible before you prepare a client submission.",
      trust: ["Fictional sample included", "Source snippets, not a black-box score", "Recruiter approval is still required"],
      toolTitle: "Run the evidence check",
      toolSubhead: getAgencyReviewScopeNotice("en"),
      inputEyebrow: "Recruiter input",
      roleLabel: "Role / vacancy title",
      mustHave: "Must-have",
      preferred: "Preferred",
      reviewEyebrow: "Review result",
      principleCards: [
        ["Evidence is not a keyword", "A CV mentioning a tool is not automatically proof of configuring it. Check level, scope, timing and context."],
        ["Missing stays visible", "Availability, rates and current preferences belong in confirmed intake data—not invented from an old CV."],
        ["A human sends it", "The checker suggests where to look. A recruiter still reviews the original source before a client sees the proposal."],
      ],
      toolIntro: "Start with the fictional case to see the complete result. For a real check, use only a CV you are authorised to process.",
      sample: "Use fictional HR case",
      reset: "Clear fields",
      cvLabel: "Candidate CV",
      vacancyLabel: "Full vacancy text",
      cvPlaceholder: "Paste the complete candidate CV text…",
      vacancyPlaceholder: "Paste the complete vacancy, including requirements and practical conditions…",
      inputText: "Paste text",
      inputFile: "Upload PDF or Word",
      uploadTitle: "Choose a text-based PDF or DOCX CV",
      uploadHint: "Maximum 10 MB. The extracted text is used for this check only.",
      chooseFile: "Choose file",
      submit: "Check evidence",
      analyzing: "Reading requirements and source lines…",
      privacy: "The checker does not write CV or vacancy content to WerkCV analytics. Use fictional or properly authorised data; the result is a first-pass aid, not a hiring decision.",
      privacyLink: "Privacy, retention and processor information →",
      privacyHref: "/en/agency/privacy#subprocessors",
      error: "The check could not be completed. Try again or use the fictional case.",
      resultTitle: "Evidence map for recruiter review",
      resultIntro: "These statuses are provisional. The source line is the text the checker located; confirm it against the original document before sharing anything with a client.",
      vacancySource: "Vacancy source",
      cvSource: "CV source",
       claimLabel: claimVerifierEnabled ? "Proposed claim · not verified" : "Requirement summary · source-derived",
       claimMissing: claimVerifierEnabled ? "No candidate evidence claim was returned." : "No source-derived requirement summary was returned.",
      noSource: "No matching source line located",
      line: "line",
      lines: "lines",
      sampleLabel: "Fictional illustration · prewritten result, not a live AI evaluation",
      exact: "Exact source match",
      approximate: "Approximate match",
      notFound: "No source match",
      summaryLabels: ["Requirements", "Strong · review", "Partial · review", "Not demonstrated"],
      openPoint: "What to verify next",
      limitationsTitle: "Use the result carefully",
      ctaEyebrow: "Ready for the full workflow?",
      ctaTitle: "MatchPack turns this first check into a controlled client proposal.",
      ctaBody: `${AGENCY_WORKSPACE_LANGUAGE_NOTICE} Review and edit an introduction and email, track versions and export PDF/DOCX from the approved version.`,
      ctaButton: "See MatchPack for agencies",
      guideButton: "Explore the English worked example",
      guideHref: "/en/agency#sample",
      print: "Print / save report",
      tryAgain: "Check another CV",
      noClaim: "Do not add a requirement to the CV just because the vacancy contains the keyword.",
    };
  }

  return {
    home: "Agency-workspace",
    switchLabel: "English",
    switchHref: "/en/candidate-proposal-checker",
    badge: "Gratis bureautool · eerste controle",
    noAccount: "Geen account nodig voor de eerste controle",
     title: "Controleer CV-bewijs vóór je een kandidaatvoorstel verstuurt",
    intro: "Vergelijk één vacature met één kandidaat-CV. De checker haalt belangrijke eisen uit de vacature, zoekt ondersteunende bronregels en laat zwak of ontbrekend bewijs zichtbaar vóór je een klantvoorstel maakt.",
    trust: ["Fictieve voorbeeldcase inbegrepen", "Bronfragmenten, geen black-box score", "Recruiterreview blijft verplicht"],
    toolTitle: "Start de bewijscontrole",
    toolSubhead: getAgencyReviewScopeNotice("nl"),
    inputEyebrow: "Recruiterinput",
    roleLabel: "Functie- of vacaturenaam",
    mustHave: "Must-have",
    preferred: "Pré",
    reviewEyebrow: "Uitslag voor review",
    principleCards: [
      ["Bewijs is geen zoekwoord", "Een CV dat een tool noemt, bewijst niet automatisch dat iemand die tool heeft geconfigureerd. Controleer niveau, scope, periode en context."],
      ["Ontbrekend blijft zichtbaar", "Beschikbaarheid, tarief en actuele voorkeuren komen uit bevestigde intakegegevens—niet uit aannames over een oud CV."],
      ["Een mens verstuurt", "De checker wijst aan waar je moet kijken. Een recruiter controleert de originele bron voordat de klant het voorstel ziet."],
    ],
    toolIntro: "Begin met de fictieve case om de volledige uitslag te zien. Gebruik voor een echte controle alleen een CV dat je bevoegd bent te verwerken.",
    sample: "Gebruik fictieve HR-case",
    reset: "Velden wissen",
    cvLabel: "Kandidaat-CV",
    vacancyLabel: "Volledige vacaturetekst",
    cvPlaceholder: "Plak de volledige tekst van het kandidaat-CV…",
    vacancyPlaceholder: "Plak de volledige vacature, inclusief functie-eisen en praktische voorwaarden…",
    inputText: "Tekst plakken",
    inputFile: "PDF of Word uploaden",
    uploadTitle: "Kies een tekstgebaseerd PDF- of DOCX-CV",
    uploadHint: "Maximaal 10 MB. De uitgelezen tekst wordt alleen voor deze controle gebruikt.",
    chooseFile: "Kies bestand",
    submit: "Controleer bewijs",
    analyzing: "Functie-eisen en bronregels worden gelezen…",
    privacy: "De checker schrijft CV- of vacaturetekst niet naar WerkCV-analytics. Gebruik fictieve of correct geautoriseerde data; de uitslag is een eerste hulpmiddel en geen aannamebeslissing.",
    privacyLink: "Privacy, retentie en verwerkersinformatie →",
    privacyHref: "/agency/privacy#subprocessors",
    error: "De controle kon niet worden voltooid. Probeer opnieuw of gebruik de fictieve case.",
    resultTitle: "Bewijsmatrix voor recruiter-review",
    resultIntro: "Deze statussen zijn voorlopig. De bronregel is de tekst die de checker heeft gevonden; controleer die altijd tegen het originele document voordat je iets met een klant deelt.",
    vacancySource: "Vacaturebron",
    cvSource: "CV-bron",
      claimLabel: claimVerifierEnabled ? "Voorgestelde claim · niet geverifieerd" : "Eisensamenvatting · uit bron afgeleid",
      claimMissing: claimVerifierEnabled ? "Geen kandidaatclaim voor dit punt teruggegeven." : "Geen uit de bron afgeleide eisensamenvatting teruggegeven.",
    noSource: "Geen passende bronregel gevonden",
    line: "regel",
    lines: "regels",
    sampleLabel: "Fictief voorbeeld · vooraf gemaakte uitslag, geen live AI-evaluatie",
    exact: "Exacte bronmatch",
    approximate: "Benaderende match",
    notFound: "Geen bronmatch",
    summaryLabels: ["Functie-eisen", "Sterk · review", "Gedeeltelijk · review", "Niet aangetoond"],
    openPoint: "Wat moet je nog controleren?",
    limitationsTitle: "Gebruik de uitslag zorgvuldig",
    ctaEyebrow: "Klaar voor de volledige workflow?",
    ctaTitle: "MatchPack maakt van deze eerste controle een gecontroleerd klantvoorstel.",
    ctaBody: "De Agency-workspace voegt een bewerkbare introductie en e-mail, reviewerstatus, versiegeschiedenis, PDF/DOCX-export en zichtbare open punten toe vanuit één gecontroleerde snapshot.",
    ctaButton: "Bekijk MatchPack voor bureaus",
    guideButton: "Lees de gids over kandidaatvoorstellen",
    guideHref: "/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever",
    print: "Rapport printen / opslaan",
    tryAgain: "Ander CV controleren",
    noClaim: "Voeg een eis niet aan het CV toe alleen omdat het zoekwoord in de vacature staat.",
  };
}

function formatMatch(match: EvidenceMatch, copy: ReturnType<typeof getCopy>): string {
  if (match === "exact") return copy.exact;
  if (match === "approximate") return copy.approximate;
  return copy.notFound;
}

function SourceBlock({
  title,
  reference,
  copy,
}: {
  title: string;
  reference: CandidateProposalEvidenceRow["cv"];
  copy: ReturnType<typeof getCopy>;
}) {
  return (
    <div className="wk-card min-w-0 bg-[var(--wk-surface-subtle)] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">{title}</p>
        <span className={`wk-badge text-[11px] font-black ${reference.match === "exact" ? "border-[#b9dfc9] bg-[var(--wk-success-soft)] text-[var(--wk-ink)]" : reference.match === "approximate" ? "border-[#ead59d] bg-[var(--wk-warning-soft)] text-[var(--wk-ink)]" : "border-[#e8b9c0] bg-[var(--wk-danger-soft)] text-[var(--wk-ink)]"}`}>
          {formatMatch(reference.match, copy)}
        </span>
      </div>
      {reference.line ? (
        <>
          <p className="mt-3 text-xs font-black text-slate-700">{reference.section} · {copy.line} {reference.line}</p>
          <p className="mt-2 border-l-2 border-[var(--wk-border-strong)] pl-3 text-sm leading-relaxed text-[var(--wk-ink-muted)] break-words">“{reference.snippet}”</p>
        </>
      ) : (
        <p className="mt-3 text-sm font-semibold leading-relaxed text-rose-900">{copy.noSource}</p>
      )}
    </div>
  );
}

function SummaryCard({ label, value, tone }: { label: string; value: number; tone: "neutral" | "green" | "amber" | "rose" }) {
  const toneClass = tone === "green" ? "wk-checker-summary-success" : tone === "amber" ? "wk-checker-summary-warning" : tone === "rose" ? "wk-checker-summary-danger" : "wk-checker-summary-neutral";
  return <div className={`wk-checker-summary ${toneClass}`}><p className="text-2xl font-black text-slate-950">{value}</p><p className="mt-1 text-xs font-black uppercase tracking-[0.08em] text-slate-600">{label}</p></div>;
}

export default function CandidateProposalEvidenceChecker({ locale = "nl", claimVerifierEnabled = false }: CandidateProposalEvidenceCheckerProps) {
  const copy = getCopy(locale, claimVerifierEnabled);
  const [inputMode, setInputMode] = useState<InputMode>("text");
  const [cvText, setCvText] = useState("");
  const [vacancyText, setVacancyText] = useState("");
  const [vacancyTitle, setVacancyTitle] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [report, setReport] = useState<CandidateProposalEvidenceReport | null>(null);
  const [isSample, setIsSample] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    track("agency_evidence_checker_viewed", { locale });
  }, [locale]);

  function loadSample() {
    const sample = getAgencyEvidenceSample(locale);
    setVacancyTitle(sample.title);
    setVacancyText(sample.vacancyText);
    setCvText(sample.cvText);
    setCvFile(null);
    setInputMode("text");
    setIsSample(true);
    setReport(null);
    setError(null);
    track("agency_evidence_checker_sample_loaded", { locale });
  }

  function clearFields() {
    setVacancyTitle("");
    setVacancyText("");
    setCvText("");
    setCvFile(null);
    setReport(null);
    setIsSample(false);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleFile(file: File | undefined) {
    if (!file) return;
    const extension = file.name.toLowerCase().split(".").pop() || "";
    if (!ALLOWED_EXTENSIONS.has(extension)) {
      setError(locale === "en" ? "Choose a PDF, DOC or DOCX file." : "Kies een PDF-, DOC- of DOCX-bestand.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError(locale === "en" ? "The file is larger than 10 MB." : "Het bestand is groter dan 10 MB.");
      return;
    }
    setCvFile(file);
    setCvText("");
    setIsSample(false);
    setError(null);
  }

  function switchToText() {
    setInputMode("text");
    setCvFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function runCheck(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setReport(null);
    setLoading(true);
    track("agency_evidence_checker_started", { locale, inputType: cvFile ? "file" : "text", sample: isSample });

    if (isSample && !cvFile) {
      const sampleReport = getSampleReport(locale);
      setReport(sampleReport);
      setLoading(false);
      track("agency_evidence_checker_completed", { locale, requirementCount: sampleReport.summary.total, missingCount: sampleReport.summary.missing, sample: true });
      return;
    }

    try {
      let response: Response;
      if (cvFile) {
        const body = new FormData();
        body.append("cvFile", cvFile);
        body.append("vacancyText", vacancyText);
        body.append("locale", locale);
        response = await fetch(`/api/tools/cv-vacature-evidence?locale=${locale}`, { method: "POST", body });
      } else {
        response = await fetch(`/api/tools/cv-vacature-evidence?locale=${locale}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cvText, vacancyText, locale }),
        });
      }

      const data = (await response.json().catch(() => ({}))) as ApiResponse;
      if (!response.ok || !data.result || !data.sourceText) throw new Error(data.error || copy.error);
      const sourceText = data.sourceText;
      const nextReport = buildCandidateProposalEvidenceReport(data.result, sourceText, vacancyText, locale);
      setReport({ ...nextReport, limitations: [getAgencyReviewScopeNotice(locale), ...nextReport.limitations] });
      track("agency_evidence_checker_completed", { locale, requirementCount: nextReport.summary.total, missingCount: nextReport.summary.missing, sample: false });
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : copy.error;
      setError(message || copy.error);
      const reason = caught instanceof Error && /network|fetch|timeout/i.test(message)
        ? "network_error"
        : "request_failed";
      track("agency_evidence_checker_failed", { locale, reason });
    } finally {
      setLoading(false);
    }
  }

  const hasInput = Boolean((cvText.trim() || cvFile) && vacancyText.trim());
  const summaryLabels = copy.summaryLabels;

  return (
    <div className="wk-agency-marketing min-h-screen min-w-0 bg-[var(--wk-canvas)] text-[var(--wk-ink)]">

      <main>
        <section className="wk-section border-y border-[var(--wk-border)] bg-[var(--wk-accent-soft)]">
          <div className="wk-container min-w-0 py-12 sm:py-16">
            <div className="flex flex-wrap gap-2">
              <span className="wk-badge bg-white text-xs font-black uppercase tracking-[0.16em]">{copy.badge}</span>
              <span className="wk-badge border-[#ead59d] bg-[var(--wk-highlight-soft)] text-xs font-black uppercase tracking-[0.16em]">{copy.noAccount}</span>
            </div>
            <h1 className="mt-5 max-w-4xl break-words text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-6xl">{copy.title}</h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">{copy.intro}</p>
            {claimVerifierEnabled ? <nav className="mt-7 flex flex-wrap gap-2" aria-label={locale === "en" ? "Checker mode" : "Controlemodus"}>
              <Link href={locale === "en" ? "/en/candidate-proposal-checker" : "/tools/kandidaatvoorstel-checker"} className="wk-button wk-button-secondary wk-button-small">{locale === "en" ? "Proposal claims vs CV" : "Voorstelclaims vs CV"}</Link>
              <Link href={`${locale === "en" ? "/en/candidate-proposal-checker" : "/tools/kandidaatvoorstel-checker"}?mode=requirements`} aria-current="page" className="wk-button wk-button-primary wk-button-small">{locale === "en" ? "Vacancy requirements vs CV" : "Vacature-eisen vs CV"}</Link>
            </nav> : null}
            <ul className="mt-7 grid max-w-5xl gap-3 md:grid-cols-3">
              {copy.trust.map((item) => <li key={item} className="wk-card flex min-w-0 gap-2 p-4 text-sm font-semibold"><span className="text-[var(--wk-success)]">✓</span><span>{item}</span></li>)}
            </ul>
          </div>
        </section>

        <section className="wk-section">
          <div className="wk-container grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">{copy.toolTitle}</p>
              <h2 className="mt-3 break-words text-3xl font-semibold tracking-[-0.035em]">{copy.toolSubhead}</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{copy.toolIntro}</p>
              <button type="button" onClick={loadSample} className="wk-button wk-button-accent mt-6 min-h-12">{copy.sample}</button>
              <div className="wk-card wk-card-dark mt-7 min-w-0 p-5">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-300">{copy.noClaim}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{copy.privacy}</p>
                <Link href={copy.privacyHref} className="mt-4 inline-block text-xs font-black text-yellow-300 underline decoration-2 underline-offset-4">{copy.privacyLink}</Link>
              </div>
            </div>

            <form onSubmit={runCheck} className="wk-card min-w-0 p-5 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--wk-border)] pb-5">
                <div><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">{isSample ? copy.sampleLabel : copy.inputEyebrow}</p><h3 className="mt-2 text-2xl font-black">{copy.toolTitle}</h3></div>
                <button type="button" onClick={clearFields} className="text-xs font-black text-slate-500 underline underline-offset-4 hover:text-slate-950">{copy.reset}</button>
              </div>

              <label className="mt-5 block text-xs font-black uppercase tracking-[0.12em] text-slate-500">{copy.roleLabel} <input className={`${inputClass} mt-2 normal-case tracking-normal`} value={vacancyTitle} onChange={(event) => { setVacancyTitle(event.target.value); setIsSample(false); }} placeholder={locale === "en" ? "e.g. Senior HR adviser" : "bijv. Senior HR-adviseur"} /></label>

              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2"><label htmlFor="proposal-cv" className="text-xs font-black uppercase tracking-[0.12em] text-[var(--wk-ink-muted)]">{copy.cvLabel}</label><div className="flex flex-wrap gap-1" role="tablist" aria-label={copy.cvLabel}><button type="button" role="tab" aria-selected={inputMode === "text"} onClick={switchToText} className={`wk-button wk-button-small min-h-9 px-2 text-[11px] ${inputMode === "text" ? "border-[var(--wk-primary)] bg-[var(--wk-accent-soft)]" : "border-[var(--wk-border)] bg-white text-[var(--wk-ink-muted)]"}`}>{copy.inputText}</button><button type="button" role="tab" aria-selected={inputMode === "file"} onClick={() => setInputMode("file")} className={`wk-button wk-button-small min-h-9 px-2 text-[11px] ${inputMode === "file" ? "border-[var(--wk-primary)] bg-[var(--wk-accent-soft)]" : "border-[var(--wk-border)] bg-white text-[var(--wk-ink-muted)]"}`}>{copy.inputFile}</button></div></div>
                  {inputMode === "text" ? <textarea id="proposal-cv" className={`${inputClass} mt-2 min-h-72 resize-y`} value={cvText} onChange={(event) => { setCvText(event.target.value); setIsSample(false); }} placeholder={copy.cvPlaceholder} required={!cvFile} /> : <div className="mt-2 rounded-[var(--wk-radius-sm)] border border-dashed border-[var(--wk-border-strong)] bg-[var(--wk-surface-subtle)] p-5"><p className="text-sm font-semibold">{copy.uploadTitle}</p><p className="mt-2 text-xs leading-relaxed text-[var(--wk-ink-muted)]">{copy.uploadHint}</p><input id="proposal-cv" ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(event) => handleFile(event.target.files?.[0])} className="mt-4 block w-full text-sm font-semibold text-[var(--wk-ink-muted)] file:mr-3 file:rounded-full file:border-0 file:bg-[var(--wk-primary)] file:px-3 file:py-2 file:text-xs file:font-black file:text-white" required={!cvText} />{cvFile ? <p className="mt-3 break-words text-xs font-semibold text-[var(--wk-success)]">{cvFile.name}</p> : null}</div>}
                </div>
                <label htmlFor="proposal-vacancy" className="block text-xs font-black uppercase tracking-[0.12em] text-slate-500">{copy.vacancyLabel}<textarea id="proposal-vacancy" className={`${inputClass} mt-2 min-h-72 resize-y`} value={vacancyText} onChange={(event) => { setVacancyText(event.target.value); setIsSample(false); }} placeholder={copy.vacancyPlaceholder} required /></label>
              </div>

              {error ? <div role="alert" className="wk-card wk-card-danger mt-5 p-4 text-sm font-semibold leading-relaxed">{error}</div> : null}
              <div className="mt-6 flex flex-col gap-3 border-t border-[var(--wk-border)] pt-5 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs font-semibold leading-relaxed text-[var(--wk-ink-muted)]">{copy.privacy}</p><button type="submit" disabled={loading || !hasInput} className={`${primaryButton} shrink-0`}>{loading ? copy.analyzing : copy.submit}</button></div>
            </form>
          </div>
        </section>

        {report ? <section className="wk-section border-y border-[var(--wk-border)] bg-[var(--wk-surface)]" aria-live="polite">
          <div className="wk-container">
            <div className="flex min-w-0 flex-col gap-5 border-b border-[var(--wk-border)] pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0"><p className="wk-eyebrow">{isSample ? copy.sampleLabel : copy.reviewEyebrow}</p><h2 className="mt-3 break-words text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">{copy.resultTitle}</h2><p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--wk-ink-muted)]">{copy.resultIntro}</p></div>
              <button type="button" onClick={() => window.print()} className="wk-button wk-button-secondary no-print shrink-0">{copy.print}</button>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-4"><SummaryCard label={summaryLabels[0]} value={report.summary.total} tone="neutral" /><SummaryCard label={summaryLabels[1]} value={report.summary.supported} tone="green" /><SummaryCard label={summaryLabels[2]} value={report.summary.review} tone="amber" /><SummaryCard label={summaryLabels[3]} value={report.summary.missing} tone="rose" /></div>

            <div className="mt-8 space-y-5">{report.requirements.map((row, index) => <article key={`${row.requirement}-${index}`} className="wk-card min-w-0 bg-[var(--wk-canvas)] p-5 sm:p-6"><div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div className="min-w-0"><p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--wk-ink-muted)]">{row.importance === "essential" ? copy.mustHave : copy.preferred} · {index + 1}</p><h3 className="mt-2 break-words text-xl font-semibold leading-tight">{row.requirement}</h3></div><span className={`wk-badge w-fit shrink-0 px-3 py-2 text-xs font-black ${row.status === "supported" ? "border-[#b9dfc9] bg-[var(--wk-success-soft)]" : row.status === "review" ? "border-[#ead59d] bg-[var(--wk-warning-soft)]" : "border-[#e8b9c0] bg-[var(--wk-danger-soft)]"}`}>{row.statusLabel}</span></div><div className="wk-card mt-5 bg-[var(--wk-surface)] p-4"><p className="text-[11px] font-black uppercase tracking-[0.14em] text-[var(--wk-ink-muted)]">{copy.claimLabel}</p><p className="mt-2 break-words text-sm leading-relaxed text-[var(--wk-ink-muted)]">{row.sourceClaim ? `“${row.sourceClaim}”` : copy.claimMissing}</p></div><div className="mt-4 grid min-w-0 gap-4 lg:grid-cols-2"><SourceBlock title={copy.vacancySource} reference={row.vacancy} copy={copy} /><SourceBlock title={copy.cvSource} reference={row.cv} copy={copy} /></div><div className="wk-card wk-card-warning mt-4 p-4"><p className="text-xs font-black uppercase tracking-[0.12em]">{copy.openPoint}</p><p className="mt-2 break-words text-sm font-semibold">{row.action}</p></div></article>)}</div>

            <div className="mt-8 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start"><div className="wk-card wk-card-dark min-w-0 p-6"><p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--wk-accent)]">{copy.limitationsTitle}</p><ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/75">{report.limitations.map((limitation) => <li key={limitation} className="flex gap-3"><span className="font-black text-[var(--wk-highlight)]">—</span><span>{limitation}</span></li>)}</ul></div><div className="wk-card wk-card-success min-w-0 p-6"><p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--wk-success)]">{copy.ctaEyebrow}</p><h3 className="mt-3 break-words text-2xl font-semibold leading-tight">{copy.ctaTitle}</h3><p className="mt-3 text-sm leading-relaxed text-[var(--wk-ink-muted)]">{copy.ctaBody}</p><div className="no-print mt-5 flex flex-col items-start gap-3"><Link href={locale === "en" ? "/en/agency" : "/agency"} onClick={() => track("agency_evidence_checker_cta_clicked", { locale, destination: "agency" })} className={primaryButton}>{copy.ctaButton}</Link><Link href={copy.guideHref} onClick={() => track("agency_evidence_checker_cta_clicked", { locale, destination: "guide" })} className="text-sm font-black text-[var(--wk-primary)] underline decoration-2 underline-offset-4">{copy.guideButton} →</Link></div></div></div>
          </div>
        </section> : null}

        <section className="wk-section"><div className="wk-container"><div className="grid min-w-0 gap-5 md:grid-cols-3">{copy.principleCards.map(([title, body], index) => <article key={title} className="wk-card min-w-0 p-5"><p className="font-mono text-sm font-black text-[var(--wk-primary)]">0{index + 1}</p><h2 className="mt-3 break-words text-xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-relaxed text-[var(--wk-ink-muted)]">{body}</p></article>)}</div></div></section>
      </main>
    </div>
  );
}
