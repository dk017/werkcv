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
import type { CvMatchLocale, CvVacatureMatchResult } from "@/lib/tools/cv-vacature-match";
import { SiteHeader } from "@/components/brand/SiteHeader";

type InputMode = "text" | "file";

type ApiResponse = {
  result?: CvVacatureMatchResult;
  sourceText?: string;
  error?: string;
};

type CandidateProposalEvidenceCheckerProps = {
  locale?: CvMatchLocale;
  claimVerifierEnabled?: boolean;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx"]);

const SAMPLE_VACANCY = `VACATURE — Senior HR-adviseur

Stadshaven Zorggroep zoekt een Senior HR-adviseur voor 32–36 uur per week in Utrecht.

Functie-eisen
1. Afgeronde hbo-opleiding Human Resource Management of vergelijkbaar.
2. Minimaal vijf jaar ervaring als zelfstandig HR-adviseur.
3. Aantoonbare ervaring met complexe verzuimdossiers volgens de Wet verbetering poortwachter.
4. Ruime ervaring met AFAS, waaronder het configureren van workflows.
5. Ervaring met HR-dashboards in Power BI.
6. Ervaring met het adviseren van ten minste twintig leidinggevenden.
7. Beschikbaar voor 32–36 uur per week vanaf 1 oktober 2026.
8. Uitstekende beheersing van het Nederlands en minimaal B2 Engels.`;

const SAMPLE_CV = `Nina de Vries
HR-adviseur | Utrecht

PROFIEL
Senior HR-adviseur met zeven jaar ervaring in zorg en zakelijke dienstverlening. Adviseert leidinggevenden over verzuim, ontwikkeling en personeelsvraagstukken.

WERKERVARING
Senior HR-adviseur — MiddenNederland Zorggroep — 2021–heden
• Adviseert 24 teamleiders over verzuim, ontwikkeling en arbeidsvoorwaarden.
• Begeleidt complexe verzuimdossiers en werkt samen met arbodienst en leidinggevenden.
• Maakt maandelijkse HR-rapportages voor directie en HR-management.

HR-adviseur — PeopleWorks — 2018–2021
• Ondersteunde meerdere teams bij personeelsgesprekken en HR-processen.
• Verbeterde de onboardingworkflow voor nieuwe medewerkers.

OPLEIDING
HBO Human Resource Management — Hogeschool Utrecht — 2014–2018

VAARDIGHEDEN
Verzuimbegeleiding, HR-advies, Power BI, personeelsgesprekken, Nederlands, Engels (B2).

Aanvullende AFAS-ervaring en exacte beschikbaarheid zijn nog niet bevestigd.`;

const SAMPLE_REPORT: CandidateProposalEvidenceReport = {
  requirements: [
    {
      requirement: "Afgeronde hbo-opleiding Human Resource Management of vergelijkbaar",
      importance: "essential",
      status: "supported",
      statusLabel: "Sterk · review",
      vacancy: { line: 6, section: "Functie-eisen", snippet: "1. Afgeronde hbo-opleiding Human Resource Management of vergelijkbaar.", match: "exact" },
      cv: { line: 18, section: "OPLEIDING", snippet: "HBO Human Resource Management — Hogeschool Utrecht — 2014–2018", match: "exact" },
      sourceClaim: "HBO Human Resource Management — Hogeschool Utrecht — 2014–2018",
      action: "Controleer of de opleiding en het niveau overeenkomen met de eis en markeer deze daarna als beoordeeld.",
    },
    {
      requirement: "Minimaal vijf jaar ervaring als zelfstandig HR-adviseur",
      importance: "essential",
      status: "supported",
      statusLabel: "Sterk · review",
      vacancy: { line: 7, section: "Functie-eisen", snippet: "2. Minimaal vijf jaar ervaring als zelfstandig HR-adviseur.", match: "exact" },
      cv: { line: 8, section: "Senior HR-adviseur", snippet: "Senior HR-adviseur — MiddenNederland Zorggroep — 2021–heden", match: "exact" },
      sourceClaim: "Senior HR-adviseur — MiddenNederland Zorggroep — 2021–heden",
      action: "Controleer de totale relevante periode en of de rol zelfstandig genoeg was voor deze eis.",
    },
    {
      requirement: "Ervaring met complexe verzuimdossiers volgens de Wet verbetering poortwachter",
      importance: "essential",
      status: "review",
      statusLabel: "Gedeeltelijk · review",
      vacancy: { line: 8, section: "Functie-eisen", snippet: "3. Aantoonbare ervaring met complexe verzuimdossiers volgens de Wet verbetering poortwachter.", match: "exact" },
      cv: { line: 10, section: "Senior HR-adviseur", snippet: "• Begeleidt complexe verzuimdossiers en werkt samen met arbodienst en leidinggevenden.", match: "approximate" },
      sourceClaim: "Begeleidt complexe verzuimdossiers en werkt samen met arbodienst en leidinggevenden.",
      action: "Controleer of de Wet verbetering poortwachter expliciet en aantoonbaar onderdeel was van de werkzaamheden.",
    },
    {
      requirement: "Ruime ervaring met AFAS, waaronder het configureren van workflows",
      importance: "essential",
      status: "missing",
      statusLabel: "Niet aangetoond",
      vacancy: { line: 9, section: "Functie-eisen", snippet: "4. Ruime ervaring met AFAS, waaronder het configureren van workflows.", match: "exact" },
      cv: { line: null, section: "Niet gevonden in bron", snippet: "", match: "not_found" },
      sourceClaim: "",
      action: "Vraag dit expliciet na of laat het als open punt staan. Voeg de claim niet toe zonder bron.",
    },
    {
      requirement: "Ervaring met HR-dashboards in Power BI",
      importance: "preferred",
      status: "supported",
      statusLabel: "Sterk · review",
      vacancy: { line: 10, section: "Functie-eisen", snippet: "5. Ervaring met HR-dashboards in Power BI.", match: "exact" },
      cv: { line: 11, section: "Senior HR-adviseur", snippet: "• Maakt maandelijkse HR-rapportages voor directie en HR-management.", match: "approximate" },
      sourceClaim: "HR-rapportages voor directie en HR-management",
      action: "Controleer of Power BI en dashboardonderhoud expliciet kunnen worden bevestigd; rapportages alleen zijn niet hetzelfde.",
    },
    {
      requirement: "Adviseren van ten minste twintig leidinggevenden",
      importance: "essential",
      status: "supported",
      statusLabel: "Sterk · review",
      vacancy: { line: 11, section: "Functie-eisen", snippet: "6. Ervaring met het adviseren van ten minste twintig leidinggevenden.", match: "exact" },
      cv: { line: 9, section: "Senior HR-adviseur", snippet: "• Adviseert 24 teamleiders over verzuim, ontwikkeling en arbeidsvoorwaarden.", match: "exact" },
      sourceClaim: "Adviseert 24 teamleiders over verzuim, ontwikkeling en arbeidsvoorwaarden.",
      action: "Controleer dat teamleiders in deze context als leidinggevenden tellen en dat de periode duidelijk is.",
    },
    {
      requirement: "Beschikbaar voor 32–36 uur per week vanaf 1 oktober 2026",
      importance: "essential",
      status: "missing",
      statusLabel: "Niet aangetoond",
      vacancy: { line: 12, section: "Functie-eisen", snippet: "7. Beschikbaar voor 32–36 uur per week vanaf 1 oktober 2026.", match: "exact" },
      cv: { line: null, section: "Niet gevonden in bron", snippet: "", match: "not_found" },
      sourceClaim: "",
      action: "Vraag beschikbaarheid en gewenste uren rechtstreeks na. Een CV is hiervoor geen betrouwbare actuele bron.",
    },
    {
      requirement: "Nederlands en minimaal B2 Engels",
      importance: "essential",
      status: "supported",
      statusLabel: "Sterk · review",
      vacancy: { line: 13, section: "Functie-eisen", snippet: "8. Uitstekende beheersing van het Nederlands en minimaal B2 Engels.", match: "exact" },
      cv: { line: 21, section: "VAARDIGHEDEN", snippet: "Verzuimbegeleiding, HR-advies, Power BI, personeelsgesprekken, Nederlands, Engels (B2).", match: "exact" },
      sourceClaim: "Nederlands, Engels (B2)",
      action: "Controleer of het niveau door de kandidaat is bevestigd en of ‘uitstekend Nederlands’ passend is.",
    },
  ],
  summary: { total: 8, supported: 5, review: 1, missing: 2, exactCvReferences: 4, sourceChecks: 6 },
  limitations: [
    "Dit is een eerste tekstcontrole, geen bewijs dat een kandidaat de geclaimde ervaring daadwerkelijk heeft.",
    "Regelverwijzingen zijn gebaseerd op uitgelezen tekst. Controleer altijd het originele CV en actuele kandidaatdata.",
    "Een ontbrekende quote kan betekenen dat de bron onvolledig is, niet dat de kandidaat de ervaring mist.",
    "Gebruik de uitslag niet als automatische aanname- of afwijzingsbeslissing.",
  ],
};

const inputClass = "wk-input w-full px-3 py-3 text-sm leading-relaxed outline-none transition";
const primaryButton = "wk-button wk-button-primary disabled:cursor-wait disabled:opacity-60";

function getCopy(locale: CvMatchLocale) {
  if (locale === "en") {
    return {
      home: "Agency workspace",
      switchLabel: "Nederlands",
      switchHref: "/tools/kandidaatvoorstel-checker",
      badge: "Free agency tool · first-pass check",
      noAccount: "No account for the first check",
      title: "Can you show the evidence behind every candidate claim?",
      intro: "Compare one vacancy with one candidate CV. The checker extracts the important requirements, locates supporting source text and leaves weak or missing evidence visible before you prepare a client submission.",
      trust: ["Fictional sample included", "Source snippets, not a black-box score", "Recruiter approval is still required"],
      toolTitle: "Run the evidence check",
      toolSubhead: "One vacancy. One CV. Clear next questions.",
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
      privacyHref: "/agency/privacy#subprocessors",
      error: "The check could not be completed. Try again or use the fictional case.",
      resultTitle: "Evidence map for recruiter review",
      resultIntro: "These statuses are provisional. The source line is the text the checker located; confirm it against the original document before sharing anything with a client.",
      vacancySource: "Vacancy source",
      cvSource: "CV source",
      claimLabel: "Proposed claim · not verified",
      claimMissing: "No candidate evidence claim was returned.",
      noSource: "No matching source line located",
      line: "line",
      lines: "lines",
      sampleLabel: "Fictional case",
      exact: "Exact source match",
      approximate: "Approximate match",
      notFound: "No source match",
      summaryLabels: ["Requirements", "Strong · review", "Partial · review", "Not demonstrated"],
      openPoint: "What to verify next",
      limitationsTitle: "Use the result carefully",
      ctaEyebrow: "Ready for the full workflow?",
      ctaTitle: "MatchPack turns this first check into a controlled client proposal.",
      ctaBody: "The Agency workspace adds editable introduction and email, reviewer status, version history, PDF/DOCX export and visible open points from one controlled snapshot.",
      ctaButton: "See MatchPack for agencies",
      guideButton: "Read the candidate proposal guide",
      guideHref: "/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever",
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
    title: "Kunt u het bewijs achter iedere kandidaatclaim laten zien?",
    intro: "Vergelijk één vacature met één kandidaat-CV. De checker haalt belangrijke eisen uit de vacature, zoekt ondersteunende bronregels en laat zwak of ontbrekend bewijs zichtbaar vóór u een klantvoorstel maakt.",
    trust: ["Fictieve voorbeeldcase inbegrepen", "Bronfragmenten, geen black-box score", "Recruiterreview blijft verplicht"],
    toolTitle: "Start de bewijscontrole",
    toolSubhead: "Eén vacature. Eén CV. Duidelijke volgende vragen.",
    inputEyebrow: "Recruiterinput",
    roleLabel: "Functie- of vacaturenaam",
    mustHave: "Must-have",
    preferred: "Pré",
    reviewEyebrow: "Uitslag voor review",
    principleCards: [
      ["Bewijs is geen zoekwoord", "Een CV dat een tool noemt, bewijst niet automatisch dat iemand die tool heeft geconfigureerd. Controleer niveau, scope, periode en context."],
      ["Ontbrekend blijft zichtbaar", "Beschikbaarheid, tarief en actuele voorkeuren komen uit bevestigde intakegegevens—niet uit aannames over een oud CV."],
      ["Een mens verstuurt", "De checker wijst aan waar u moet kijken. Een recruiter controleert de originele bron voordat de klant het voorstel ziet."],
    ],
    toolIntro: "Begin met de fictieve case om de volledige uitslag te zien. Gebruik voor een echte controle alleen een CV dat u bevoegd bent te verwerken.",
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
    resultIntro: "Deze statussen zijn voorlopig. De bronregel is de tekst die de checker heeft gevonden; controleer die altijd tegen het originele document voordat u iets met een klant deelt.",
    vacancySource: "Vacaturebron",
    cvSource: "CV-bron",
    claimLabel: "Voorgestelde claim · niet geverifieerd",
    claimMissing: "Geen kandidaatclaim voor dit punt teruggegeven.",
    noSource: "Geen passende bronregel gevonden",
    line: "regel",
    lines: "regels",
    sampleLabel: "Fictieve case",
    exact: "Exacte bronmatch",
    approximate: "Benaderende match",
    notFound: "Geen bronmatch",
    summaryLabels: ["Functie-eisen", "Sterk · review", "Gedeeltelijk · review", "Niet aangetoond"],
    openPoint: "Wat moet u nog controleren?",
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
    <div className="border-2 border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">{title}</p>
        <span className={`border px-2 py-1 text-[11px] font-black ${reference.match === "exact" ? "border-emerald-300 bg-emerald-100 text-emerald-900" : reference.match === "approximate" ? "border-amber-300 bg-amber-100 text-amber-950" : "border-rose-300 bg-rose-100 text-rose-900"}`}>
          {formatMatch(reference.match, copy)}
        </span>
      </div>
      {reference.line ? (
        <>
          <p className="mt-3 text-xs font-black text-slate-700">{reference.section} · {copy.line} {reference.line}</p>
          <p className="mt-2 border-l-4 border-slate-300 pl-3 text-sm leading-relaxed text-slate-700">“{reference.snippet}”</p>
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
  const copy = getCopy(locale);
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
    setVacancyTitle(locale === "en" ? "Senior HR adviser" : "Senior HR-adviseur");
    setVacancyText(SAMPLE_VACANCY);
    setCvText(SAMPLE_CV);
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
      setReport(SAMPLE_REPORT);
      setLoading(false);
      track("agency_evidence_checker_completed", { locale, requirementCount: SAMPLE_REPORT.summary.total, missingCount: SAMPLE_REPORT.summary.missing, sample: true });
      return;
    }

    try {
      let response: Response;
      if (cvFile) {
        const body = new FormData();
        body.append("cvFile", cvFile);
        body.append("vacancyText", vacancyText);
        body.append("locale", locale);
        response = await fetch(`/api/tools/cv-vacature-match?locale=${locale}`, { method: "POST", body });
      } else {
        response = await fetch(`/api/tools/cv-vacature-match?locale=${locale}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cvText, vacancyText, locale }),
        });
      }

      const data = (await response.json().catch(() => ({}))) as ApiResponse;
      if (!response.ok || !data.result || !data.sourceText) throw new Error(data.error || copy.error);
      const sourceText = data.sourceText;
      const nextReport = buildCandidateProposalEvidenceReport(data.result, sourceText, vacancyText, locale);
      setReport(nextReport);
      track("agency_evidence_checker_completed", { locale, requirementCount: nextReport.summary.total, missingCount: nextReport.summary.missing, sample: false });
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : copy.error;
      setError(message || copy.error);
      track("agency_evidence_checker_failed", { locale, reason: message.slice(0, 120) || "unknown" });
    } finally {
      setLoading(false);
    }
  }

  const hasInput = Boolean((cvText.trim() || cvFile) && vacancyText.trim());
  const summaryLabels = copy.summaryLabels;

  return (
    <div className="min-h-screen bg-[#FFFEF9] text-slate-950">
      <SiteHeader
        navItems={[]}
        backHref="/voor-bureaus"
        backLabel={copy.home}
        context={locale === "en" ? "Evidence checker" : "Evidence checker"}
        rightContent={<Link href={copy.switchHref} className="wk-language-switcher">{copy.switchLabel}</Link>}
      />

      <main>
        <section className="border-b-2 border-slate-950 bg-[#E9FFFC]">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
            <div className="flex flex-wrap gap-2">
              <span className="border-2 border-slate-950 bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.16em]">{copy.badge}</span>
              <span className="border-2 border-slate-950 bg-yellow-300 px-3 py-1 text-xs font-black uppercase tracking-[0.16em]">{copy.noAccount}</span>
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">{copy.title}</h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">{copy.intro}</p>
            {claimVerifierEnabled ? <nav className="mt-7 flex flex-wrap gap-2" aria-label={locale === "en" ? "Checker mode" : "Controlemodus"}>
              <Link href={locale === "en" ? "/en/candidate-proposal-checker" : "/tools/kandidaatvoorstel-checker"} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-extrabold text-slate-700">{locale === "en" ? "Proposal claims vs CV" : "Voorstelclaims vs CV"}</Link>
              <Link href={`${locale === "en" ? "/en/candidate-proposal-checker" : "/tools/kandidaatvoorstel-checker"}?mode=requirements`} aria-current="page" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-extrabold text-white">{locale === "en" ? "Vacancy requirements vs CV" : "Vacature-eisen vs CV"}</Link>
            </nav> : null}
            <ul className="mt-7 grid max-w-5xl gap-3 md:grid-cols-3">
              {copy.trust.map((item) => <li key={item} className="flex gap-2 border border-teal-300 bg-white px-4 py-3 text-sm font-bold text-slate-800"><span className="text-teal-700">✓</span><span>{item}</span></li>)}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">{copy.toolTitle}</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">{copy.toolSubhead}</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{copy.toolIntro}</p>
              <button type="button" onClick={loadSample} className="mt-6 inline-flex min-h-12 items-center justify-center border-2 border-slate-950 bg-yellow-300 px-4 py-3 text-sm font-black shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition hover:translate-x-0.5 hover:translate-y-0.5">{copy.sample}</button>
              <div className="mt-7 border-2 border-slate-950 bg-slate-950 p-5 text-white">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-300">{copy.noClaim}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{copy.privacy}</p>
                <Link href={copy.privacyHref} className="mt-4 inline-block text-xs font-black text-yellow-300 underline decoration-2 underline-offset-4">{copy.privacyLink}</Link>
              </div>
            </div>

            <form onSubmit={runCheck} className="border-2 border-slate-950 bg-white p-5 shadow-[7px_7px_0px_0px_rgba(78,205,196,1)] sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-slate-200 pb-5">
                <div><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">{isSample ? copy.sampleLabel : copy.inputEyebrow}</p><h3 className="mt-2 text-2xl font-black">{copy.toolTitle}</h3></div>
                <button type="button" onClick={clearFields} className="text-xs font-black text-slate-500 underline underline-offset-4 hover:text-slate-950">{copy.reset}</button>
              </div>

              <label className="mt-5 block text-xs font-black uppercase tracking-[0.12em] text-slate-500">{copy.roleLabel} <input className={`${inputClass} mt-2 normal-case tracking-normal`} value={vacancyTitle} onChange={(event) => { setVacancyTitle(event.target.value); setIsSample(false); }} placeholder={locale === "en" ? "e.g. Senior HR adviser" : "bijv. Senior HR-adviseur"} /></label>

              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2"><label htmlFor="proposal-cv" className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">{copy.cvLabel}</label><div className="flex gap-1" role="tablist" aria-label={copy.cvLabel}><button type="button" role="tab" aria-selected={inputMode === "text"} onClick={switchToText} className={`border px-2 py-1 text-[11px] font-black ${inputMode === "text" ? "border-slate-950 bg-emerald-100" : "border-slate-200 bg-white text-slate-500"}`}>{copy.inputText}</button><button type="button" role="tab" aria-selected={inputMode === "file"} onClick={() => setInputMode("file")} className={`border px-2 py-1 text-[11px] font-black ${inputMode === "file" ? "border-slate-950 bg-emerald-100" : "border-slate-200 bg-white text-slate-500"}`}>{copy.inputFile}</button></div></div>
                  {inputMode === "text" ? <textarea id="proposal-cv" className={`${inputClass} mt-2 min-h-72 resize-y`} value={cvText} onChange={(event) => { setCvText(event.target.value); setIsSample(false); }} placeholder={copy.cvPlaceholder} required={!cvFile} /> : <div className="mt-2 border-2 border-dashed border-slate-300 bg-slate-50 p-5"><p className="text-sm font-black">{copy.uploadTitle}</p><p className="mt-2 text-xs leading-relaxed text-slate-500">{copy.uploadHint}</p><input id="proposal-cv" ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(event) => handleFile(event.target.files?.[0])} className="mt-4 block w-full text-sm font-semibold text-slate-700 file:mr-3 file:border-2 file:border-slate-950 file:bg-slate-950 file:px-3 file:py-2 file:text-xs file:font-black file:text-white" required={!cvText} />{cvFile ? <p className="mt-3 text-xs font-black text-emerald-800">{cvFile.name}</p> : null}</div>}
                </div>
                <label htmlFor="proposal-vacancy" className="block text-xs font-black uppercase tracking-[0.12em] text-slate-500">{copy.vacancyLabel}<textarea id="proposal-vacancy" className={`${inputClass} mt-2 min-h-72 resize-y`} value={vacancyText} onChange={(event) => { setVacancyText(event.target.value); setIsSample(false); }} placeholder={copy.vacancyPlaceholder} required /></label>
              </div>

              {error ? <div role="alert" className="mt-5 border-2 border-rose-400 bg-rose-50 p-4 text-sm font-semibold leading-relaxed text-rose-950">{error}</div> : null}
              <div className="mt-6 flex flex-col gap-3 border-t-2 border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs font-semibold leading-relaxed text-slate-500">{copy.privacy}</p><button type="submit" disabled={loading || !hasInput} className={`${primaryButton} shrink-0`}>{loading ? copy.analyzing : copy.submit}</button></div>
            </form>
          </div>
        </section>

        {report ? <section className="border-y-2 border-slate-950 bg-white" aria-live="polite">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
            <div className="flex flex-col gap-5 border-b-2 border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">{isSample ? copy.sampleLabel : copy.reviewEyebrow}</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{copy.resultTitle}</h2><p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">{copy.resultIntro}</p></div>
              <button type="button" onClick={() => window.print()} className="no-print inline-flex min-h-11 items-center justify-center border-2 border-slate-950 bg-white px-4 py-2 text-sm font-black hover:bg-yellow-100">{copy.print}</button>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-4"><SummaryCard label={summaryLabels[0]} value={report.summary.total} tone="neutral" /><SummaryCard label={summaryLabels[1]} value={report.summary.supported} tone="green" /><SummaryCard label={summaryLabels[2]} value={report.summary.review} tone="amber" /><SummaryCard label={summaryLabels[3]} value={report.summary.missing} tone="rose" /></div>

            <div className="mt-8 space-y-5">{report.requirements.map((row, index) => <article key={`${row.requirement}-${index}`} className="border-2 border-slate-950 bg-[#FFFEF9] p-5 shadow-[4px_4px_0px_0px_rgba(226,232,240,1)] sm:p-6"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">{row.importance === "essential" ? copy.mustHave : copy.preferred} · {index + 1}</p><h3 className="mt-2 text-xl font-black leading-tight">{row.requirement}</h3></div><span className={`w-fit border-2 px-3 py-2 text-xs font-black ${row.status === "supported" ? "border-emerald-300 bg-emerald-100 text-emerald-900" : row.status === "review" ? "border-amber-300 bg-amber-100 text-amber-950" : "border-rose-300 bg-rose-100 text-rose-900"}`}>{row.statusLabel}</span></div><div className="mt-5 border-2 border-slate-200 bg-white p-4"><p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">{copy.claimLabel}</p><p className="mt-2 text-sm leading-relaxed text-slate-700">{row.sourceClaim ? `“${row.sourceClaim}”` : copy.claimMissing}</p></div><div className="mt-4 grid gap-4 lg:grid-cols-2"><SourceBlock title={copy.vacancySource} reference={row.vacancy} copy={copy} /><SourceBlock title={copy.cvSource} reference={row.cv} copy={copy} /></div><div className="mt-4 border-2 border-amber-300 bg-amber-50 p-4"><p className="text-xs font-black uppercase tracking-[0.12em] text-amber-800">{copy.openPoint}</p><p className="mt-2 text-sm font-semibold leading-relaxed text-amber-950">{row.action}</p></div></article>)}</div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"><div className="border-2 border-slate-950 bg-slate-950 p-6 text-white"><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">{copy.limitationsTitle}</p><ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">{report.limitations.map((limitation) => <li key={limitation} className="flex gap-3"><span className="font-black text-yellow-300">—</span><span>{limitation}</span></li>)}</ul></div><div className="border-2 border-emerald-400 bg-emerald-50 p-6"><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-800">{copy.ctaEyebrow}</p><h3 className="mt-3 text-2xl font-black leading-tight">{copy.ctaTitle}</h3><p className="mt-3 text-sm leading-relaxed text-slate-700">{copy.ctaBody}</p><div className="no-print mt-5 flex flex-col items-start gap-3"><Link href="/agency" onClick={() => track("agency_evidence_checker_cta_clicked", { locale, destination: "agency" })} className={primaryButton}>{copy.ctaButton}</Link><Link href={copy.guideHref} onClick={() => track("agency_evidence_checker_cta_clicked", { locale, destination: "guide" })} className="text-sm font-black text-emerald-900 underline decoration-2 underline-offset-4">{copy.guideButton} →</Link></div></div></div>
          </div>
        </section> : null}

        <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16"><div className="grid gap-5 md:grid-cols-3">{copy.principleCards.map(([title, body], index) => <article key={title} className="border-2 border-slate-950 bg-white p-5"><p className="font-mono text-sm font-black text-emerald-700">0{index + 1}</p><h2 className="mt-3 text-xl font-black">{title}</h2><p className="mt-3 text-sm leading-relaxed text-slate-600">{body}</p></article>)}</div></section>
      </main>
    </div>
  );
}
