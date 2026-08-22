import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AgencyAccountShell from "@/components/agency/AgencyAccountShell";
import AgencyMatchPackWorkspace, {
  type AgencyMatchPackDetail,
  type AgencyMatchPackSummary,
} from "@/components/agency/AgencyMatchPackWorkspace";
import AgencySettingsPanel, {
  type AgencySettingsVisualFixture,
} from "@/components/agency/AgencySettingsPanel";
import {
  anonymizeCvData,
  attachEvidenceReferences,
  createDefaultMatchPackSubmission,
  createMatchPackAnalysis,
} from "@/lib/agency-matchpack";
import { sampleCV } from "@/lib/cv";
import type { CvVacatureMatchResult } from "@/lib/tools/cv-vacature-match-schema";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Agency visual test | WerkCV",
  robots: { index: false, follow: false },
};

type VisualScreen = "overview" | "matchpack" | "insights" | "settings";

const visualScreens: Array<{ id: VisualScreen; label: string }> = [
  { id: "overview", label: "Overzicht" },
  { id: "matchpack", label: "MatchPack" },
  { id: "insights", label: "Inzichten" },
  { id: "settings", label: "Instellingen" },
];

function createMatchPackFixture(): AgencyMatchPackDetail {
  const candidate = structuredClone(sampleCV);
  candidate.personal = {
    ...candidate.personal,
    name: "Mila Vermeer",
    title: "Senior HR-adviseur",
    email: "mila.vermeer@example.test",
    phone: "+31 6 1234 5678",
    location: "Utrecht",
    summary: "Senior HR-adviseur met acht jaar ervaring in complexe verzuimdossiers, organisatieverandering en het adviseren van leidinggevenden.",
  };
  candidate.experience = [
    {
      role: "Senior HR-adviseur",
      company: "Noorderlicht Services",
      location: "Utrecht",
      start: "januari 2020",
      end: "heden",
      description: "Adviseert 24 teamleiders over verzuim, inzetbaarheid en organisatieontwikkeling.",
      highlights: [
        "Begeleidde complexe verzuimdossiers volgens de Wet verbetering poortwachter.",
        "Bouwde HR-rapportages in Power BI voor directie en teamleiders.",
      ],
    },
  ];
  candidate.education = [{
    degree: "Bachelor Human Resource Management",
    school: "Hogeschool Rivierstad",
    location: "Utrecht",
    start: "september 2010",
    end: "juni 2014",
    description: "Afgeronde hbo-opleiding Human Resource Management.",
  }];
  candidate.skills = [
    { name: "Verzuimbegeleiding", level: 5 },
    { name: "Power BI", level: 4 },
    { name: "Organisatieverandering", level: 4 },
  ];

  const vacancyText = [
    "Senior HR-adviseur",
    "Een afgeronde hbo-opleiding Human Resource Management is vereist.",
    "Adviseer ten minste twintig teamleiders.",
    "Aantoonbare ervaring met complexe verzuimdossiers is vereist.",
    "Ruime ervaring met AFAS-workflows is vereist.",
    "Ervaring met Power BI is gewenst.",
  ].join("\n");
  const cvText = [
    "Mila Vermeer",
    "Senior HR-adviseur",
    "Bachelor Human Resource Management — Hogeschool Rivierstad",
    "Adviseert 24 teamleiders over verzuim, inzetbaarheid en organisatieontwikkeling.",
    "Begeleidde complexe verzuimdossiers volgens de Wet verbetering poortwachter.",
    "Bouwde HR-rapportages in Power BI voor directie en teamleiders.",
  ].join("\n");
  const rawResult: CvVacatureMatchResult = {
    score: 78,
    scoreBand: "good",
    scoreLabel: "Goede match",
    summary: "Het profiel sluit goed aan op HR-advies, verzuim en stakeholdermanagement. AFAS-workflowbeheer blijft een zichtbaar open punt.",
    perceivedRole: "Senior HR-adviseur",
    perceivedSeniority: "senior",
    dimensions: [
      { id: "relevance", label: "Aansluiting", score: 29, maxScore: 35, explanation: "Sterke aansluiting op de kernwerkzaamheden." },
      { id: "evidence", label: "Bewijs", score: 24, maxScore: 30, explanation: "Meerdere eisen zijn terug te vinden in concrete bronzinnen." },
    ],
    strengths: [
      { title: "Leidinggevenden adviseren", evidence: "Het CV noemt 24 teamleiders." },
      { title: "Complex verzuim", evidence: "Wet verbetering poortwachter staat expliciet in de werkervaring." },
    ],
    requirements: [
      { requirement: "Afgeronde hbo-opleiding HRM", vacancyEvidence: "Een afgeronde hbo-opleiding Human Resource Management is vereist.", importance: "essential", status: "strong", cvEvidence: "Bachelor Human Resource Management — Hogeschool Rivierstad", honestAction: "Controleer diploma en opleidingsniveau." },
      { requirement: "Ten minste twintig teamleiders adviseren", vacancyEvidence: "Adviseer ten minste twintig teamleiders.", importance: "essential", status: "strong", cvEvidence: "Adviseert 24 teamleiders over verzuim, inzetbaarheid en organisatieontwikkeling.", honestAction: "Verifieer omvang en periode in het gesprek." },
      { requirement: "Complexe verzuimdossiers", vacancyEvidence: "Aantoonbare ervaring met complexe verzuimdossiers is vereist.", importance: "essential", status: "strong", cvEvidence: "Begeleidde complexe verzuimdossiers volgens de Wet verbetering poortwachter.", honestAction: "Controleer zelfstandigheid en casuscomplexiteit." },
      { requirement: "AFAS-workflows beheren", vacancyEvidence: "Ruime ervaring met AFAS-workflows is vereist.", importance: "essential", status: "missing", cvEvidence: "Geen concreet bewijs gevonden.", honestAction: "Vraag naar AFAS-ervaring; voeg niets toe zonder bevestiging." },
      { requirement: "Power BI", vacancyEvidence: "Ervaring met Power BI is gewenst.", importance: "preferred", status: "strong", cvEvidence: "Bouwde HR-rapportages in Power BI voor directie en teamleiders.", honestAction: "Controleer welke dashboards zelfstandig zijn gebouwd." },
    ],
    missingKeywords: ["AFAS"],
    topFixes: [{ category: "evidence", title: "AFAS blijft onbewezen", evidence: "De vacature maakt AFAS essentieel.", action: "Laat de recruiter dit expliciet verifiëren." }],
    limitations: ["Fictionele, uitsluitend lokaal gebruikte visuele testdata."],
  };
  const tracedResult = attachEvidenceReferences(rawResult, cvText, "docx", vacancyText);
  const reviewedResult: CvVacatureMatchResult = {
    ...tracedResult,
    requirements: tracedResult.requirements.map((requirement, index) => ({
      ...requirement,
      evidenceReference: requirement.evidenceReference
        ? {
            ...requirement.evidenceReference,
            reviewerStatus: index === 3 ? "rejected" : "confirmed",
            reviewerNote: index === 3 ? "AFAS is nog niet bevestigd." : "Bronzin gecontroleerd.",
            reviewedAt: "2026-08-20T09:30:00.000Z",
            reviewerId: "visual-reviewer",
          }
        : undefined,
    })),
  };
  const anonymized = anonymizeCvData(candidate, "nl");
  const submission = createDefaultMatchPackSubmission(candidate, reviewedResult, "Senior HR-adviseur", "nl");
  submission.commercial.availability = "Beschikbaar vanaf 1 oktober 2026";
  submission.commercial.hoursPerWeek = "32–36 uur";
  submission.commercial.workLocation = "Utrecht / hybride";
  submission.recruiterNotes = "Controleer AFAS-ervaring voor verzending.";

  return {
    id: "visual-matchpack-1",
    title: "Kandidaatvoorstel Senior HR-adviseur",
    vacancyTitle: "Senior HR-adviseur",
    locale: "nl",
    sourceFileType: "docx",
    status: "analyzed",
    cvDocumentId: null,
    approvedAt: null,
    retentionExpiresAt: "2026-11-18T09:00:00.000Z",
    createdAt: "2026-08-20T09:00:00.000Z",
    updatedAt: "2026-08-20T09:30:00.000Z",
    outcomeStatus: "unknown",
    vacancyText,
    candidateData: candidate,
    originalCandidateData: structuredClone(candidate),
    anonymizedData: anonymized.data,
    analysis: createMatchPackAnalysis(reviewedResult, anonymized, { fileType: "docx", digest: "visual-fixture-digest" }),
    submissionData: submission,
    outcomeData: null,
    sourceTextDigest: "visual-fixture-digest",
    templateId: "professional",
    colorThemeId: "modern-teal",
    revisions: [
      { id: "revision-2", version: 2, reason: "draft_saved", changedFields: ["commercial", "evidenceReviews"], createdById: "visual-reviewer", createdAt: "2026-08-20T09:30:00.000Z" },
      { id: "revision-1", version: 1, reason: "analysis_created", changedFields: ["analysis", "candidateData"], createdById: "visual-reviewer", createdAt: "2026-08-20T09:00:00.000Z" },
    ],
  };
}

const settingsFixture: AgencySettingsVisualFixture = {
  templates: [{
    id: "template-1",
    name: "Stadshaven standaard",
    templateId: "professional",
    colorThemeId: "modern-teal",
    companyName: "Stadshaven Recruitment",
    website: "https://example.test",
    headerText: "Kandidaatvoorstel",
    footerText: "Vertrouwelijk",
    isDefault: true,
  }],
  members: [{
    id: "member-1",
    email: "recruiter@example.test",
    role: "editor",
    status: "active",
    invitedAt: "2026-08-01T09:00:00.000Z",
    acceptedAt: "2026-08-01T10:00:00.000Z",
  }],
  retention: {
    options: [30, 90, 180, 365],
    retentionDays: 90,
    policySetAt: "2026-08-01T09:00:00.000Z",
    needsAcknowledgement: false,
    preview: { packsAffected: 3, packsShortened: 0, earliestExpiry: "2026-11-18T09:00:00.000Z" },
  },
};

function VisualScenarioNav({ current }: { current: VisualScreen }) {
  return (
    <div className="wk-container pt-5">
      <div className="wk-visual-test-bar" role="navigation" aria-label="Agency visuele testscenario's">
        <span className="wk-badge wk-badge-warning">Alleen lokale testdata</span>
        <div className="flex flex-wrap gap-2">
          {visualScreens.map((screen) => (
            <Link
              key={screen.id}
              href={`/agency/visual-test?screen=${screen.id}`}
              className={current === screen.id ? "wk-button wk-button-primary wk-button-small" : "wk-button wk-button-secondary wk-button-small"}
            >
              {screen.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function OverviewFixture() {
  return (
    <main className="wk-agency-main">
      <div className="wk-container wk-agency-container-narrow">
        <section className="wk-agency-page-hero grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="min-w-0">
            <p className="wk-eyebrow">Agency account</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Jouw WerkCV MatchPack-workspace</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">Werk samen aan controleerbare kandidaatvoorstellen, exports en klantuitkomsten.</p>
          </div>
          <div className="wk-agency-plan-summary">
            <p className="text-xs font-black uppercase tracking-[0.16em]">Agency billing tier</p>
            <p className="mt-2 text-4xl font-black">€149 <span className="text-base">/ maand</span></p>
            <p className="mt-2 text-sm font-bold">Actief</p>
          </div>
        </section>
        <section className="wk-agency-panel wk-agency-usage-card">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="wk-eyebrow">Gebruik deze periode</p><p className="mt-2 text-3xl font-black">7 / 50 voorstel-slots</p></div><p className="text-sm font-semibold text-slate-600">Nieuwe periode vanaf 1 september 2026</p></div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-[14%] bg-emerald-500" /></div>
          <div className="mt-5 flex flex-wrap gap-3"><span className="wk-button wk-button-primary">MatchPack maken</span><span className="wk-button wk-button-secondary">Nieuw CV maken</span></div>
        </section>
        <section className="wk-agency-documents">
          <p className="wk-eyebrow">Laatste documenten</p>
          <h2 className="mt-2 text-2xl font-black">Goedgekeurde en losse CV-documenten</h2>
          <div className="wk-agency-list mt-4 divide-y divide-slate-100">{["Senior HR-adviseur", "Projectmanager Zorg", "Data-analist"].map((title) => <div key={title} className="flex items-center justify-between gap-4 px-4 py-4"><span className="min-w-0 truncate text-sm font-bold">{title}</span><span className="shrink-0 text-xs font-semibold text-slate-500">20 augustus 2026</span></div>)}</div>
        </section>
      </div>
    </main>
  );
}

function InsightsFixture() {
  const metrics = [["Goedgekeurd", "12", "voorstellen"], ["Upload → goedkeuring", "18 min", "gemiddeld"], ["Correcties", "9", "vastgelegd"], ["Unsupported claims", "5", "onderschept"], ["Klantacceptatie", "75%", "9/12 bekend"]];
  return (
    <main className="wk-agency-main">
      <div className="wk-container">
        <section className="wk-agency-page-hero"><p className="wk-eyebrow">MatchPack-inzichten</p><h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Meet of het werk echt beter wordt.</h1><p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">Fictionele waarden controleren de volledige actieve datastaat zonder een klantdatabase te gebruiken.</p></section>
        <section className="wk-agency-metrics-grid">{metrics.map(([label, value, hint]) => <div key={label} className="wk-agency-metric"><p className="wk-agency-metric-label">{label}</p><p className="wk-agency-metric-value">{value}</p><p className="wk-agency-metric-hint">{hint}</p></div>)}</section>
        <section className="wk-agency-insight-context"><div className="wk-agency-panel"><p className="wk-eyebrow">Herhaalgebruik</p><h2 className="mt-2 text-2xl font-black">11 herhaalgebruiken na het eerste voorstel</h2></div><div className="wk-agency-panel wk-agency-panel-warning"><p className="wk-eyebrow">Interpretatie</p><p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">Gebruik correcties, unsupported claims en echte klantacceptatie om kwaliteit te beoordelen.</p></div></section>
      </div>
    </main>
  );
}

export default async function AgencyVisualTestPage({ searchParams }: { searchParams: Promise<{ screen?: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const requested = (await searchParams).screen;
  const screen: VisualScreen = visualScreens.some((item) => item.id === requested) ? requested as VisualScreen : "overview";
  const pack = createMatchPackFixture();
  const summary: AgencyMatchPackSummary = pack;

  return (
    <AgencyAccountShell currentPath={`/agency/account/${screen === "overview" ? "" : screen}`} email="owner@example.test" role="owner">
      <VisualScenarioNav current={screen} />
      {screen === "overview" ? <OverviewFixture /> : null}
      {screen === "insights" ? <InsightsFixture /> : null}
      {screen === "settings" ? <main className="wk-agency-main"><div className="wk-container wk-agency-container-narrow"><section className="wk-agency-page-hero"><p className="wk-eyebrow">Workspace-instellingen</p><h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Team, templates en gegevensbeheer.</h1></section><AgencySettingsPanel owner canImport role="owner" visualFixture={settingsFixture} /></div></main> : null}
      {screen === "matchpack" ? <main className="wk-agency-main"><div className="wk-container wk-agency-container-wide"><section className="wk-agency-page-hero max-w-4xl"><p className="wk-eyebrow">WerkCV MatchPack</p><h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Van CV en vacature naar een compleet kandidaatvoorstel.</h1></section><AgencyMatchPackWorkspace initialPacks={[summary]} initialActivePack={pack} initialUsed={7} allowance={50} canCreate canCreateWork canApprove canDeleteDraft canDeleteApproved canOpenCv /></div></main> : null}
    </AgencyAccountShell>
  );
}
