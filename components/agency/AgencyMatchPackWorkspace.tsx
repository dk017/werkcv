"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { CVData } from "@/lib/cv";
import {
  type MatchPackOutcome,
  type MatchPackAnalysis,
  type MatchPackSubmission,
} from "@/lib/agency-matchpack";
import { track } from "@/lib/analytics";
import ScaledCvPreview from "@/app/editor/ScaledCvPreview";
import type { ProposalClaimVerificationV1 } from "@/lib/tools/proposal-claim-verifier-schema";
import {
  deriveMatchPackStagePresentation,
  type MatchPackStageId,
  type MatchPackStageStatus,
} from "@/lib/agency-matchpack-stage-presentation";

export type AgencyMatchPackSummary = {
  id: string;
  title: string;
  vacancyTitle: string | null;
  locale: string;
  sourceFileType: string | null;
  status: string;
  cvDocumentId: string | null;
  approvedAt: string | null;
  retentionExpiresAt: string | null;
  createdAt: string;
  updatedAt: string;
  outcomeStatus?: MatchPackOutcome["status"];
};

export type AgencyMatchPackDetail = AgencyMatchPackSummary & {
  vacancyText: string;
  candidateData: CVData;
  originalCandidateData: CVData;
  anonymizedData: CVData;
  analysis: MatchPackAnalysis;
  submissionData: MatchPackSubmission;
  claimVerificationData?: ProposalClaimVerificationV1 | null;
  outcomeData?: (MatchPackOutcome & { sendability?: "sent" | "corrected" | "not_usable" | "not_sent" }) | null;
  sourceTextDigest?: string | null;
  templateId: string;
  colorThemeId: string;
  revisions: Array<{
    id: string;
    version: number;
    reason: string;
    changedFields: string[];
    createdById: string;
    createdAt: string;
  }>;
};

type AgencyMatchPackWorkspaceProps = {
  initialPacks: AgencyMatchPackSummary[];
  initialActivePack?: AgencyMatchPackDetail | null;
  initialUsed: number;
  allowance: number;
  canCreate: boolean;
  canCreateWork: boolean;
  canApprove: boolean;
  canDeleteDraft: boolean;
  canDeleteApproved: boolean;
  canOpenCv: boolean;
  claimVerifierEnabled?: boolean;
  candidateAcknowledgementEnabled?: boolean;
};

type CandidateReviewSummary = {
  id: string;
  revisionVersion: number;
  status: string;
  candidateEmail: string;
  recipientOrganization: string;
  vacancyTitle: string;
  candidateResponse: string | null;
  sentAt: string | null;
  respondedAt: string | null;
  tokenExpiresAt: string | null;
  suggestions: Array<{ id: string; targetPath: string; proposedValue: string; candidateNote: string; status: string }>;
};

type EvidenceFilter = "all" | "strong" | "partial" | "missing";

const stageCopy: Record<MatchPackStageId, { label: string; hint: string }> = {
  source: { label: "Bronnen", hint: "CV, vacature en brondata" },
  claims: { label: "Claims", hint: "Bewijs en revieweracties" },
  candidate_facts: { label: "Kandidaatfeiten", hint: "Actuele feiten en bevestiging" },
  client_copy: { label: "Klanttekst", hint: "Introductie en e-mail" },
  output: { label: "Uitvoer", hint: "Volledig of contactvrij" },
  approval: { label: "Goedkeuring", hint: "Gates en gecontroleerde export" },
};

function stageStatusLabel(status: MatchPackStageStatus): string {
  if (status === "complete") return "Gereed";
  if (status === "action_required") return "Actie nodig";
  if (status === "locked") return "Vergrendeld";
  return "Niet gestart";
}

function stageStatusClass(status: MatchPackStageStatus): string {
  if (status === "complete") return "bg-emerald-100 text-emerald-900";
  if (status === "action_required") return "bg-amber-100 text-amber-950";
  if (status === "locked") return "bg-slate-200 text-slate-700";
  return "bg-slate-100 text-slate-600";
}

function stageBlockingReasonLabel(code: string): string {
  const labels: Record<string, string> = {
    SOURCE_NOT_SAVED: "Sla eerst de brondata op.",
    UNSAVED_SOURCE_CHANGES: "Sla de bronwijzigingen op voordat je verdergaat.",
    CLAIM_VERIFICATION_REQUIRED: "Voer de claimcontrole uit.",
    EVIDENCE_REVIEW_REQUIRED: "Beoordeel de openstaande bewijsregels.",
    CLAIM_DISPOSITION_REQUIRED: "Leg voor iedere open claim een revieweractie vast.",
    UNSAVED_CHANGES_INVALIDATE_CLAIMS: "Sla de klanttekst op en voer de claimcontrole opnieuw uit.",
    CANDIDATE_REVIEW_REQUIRED: "Nodig de kandidaat uit voor controle van de huidige versie.",
    CANDIDATE_REVIEW_STALE: "Deze bevestiging hoort bij een oudere versie. Stuur een nieuwe uitnodiging.",
    CANDIDATE_DECLINED: "De kandidaat heeft delen van deze versie geweigerd.",
    CANDIDATE_CORRECTIONS_PENDING: "Behandel eerst de voorgestelde correcties.",
    CANDIDATE_RESPONSE_PENDING: "De kandidaatbevestiging is nog niet afgerond.",
    UNSAVED_CHANGES_INVALIDATE_ACKNOWLEDGEMENT: "Sla de huidige wijzigingen op; daarna is een bevestiging voor de nieuwe versie nodig.",
    UNSAVED_CANDIDATE_FACTS: "Sla de gewijzigde kandidaatfeiten op.",
    CLIENT_COPY_INCOMPLETE: "Vul de introductie, het onderwerp en de begeleidende e-mail in.",
    UNSAVED_CLIENT_COPY: "Sla de gewijzigde klanttekst op.",
    OUTPUT_SELECTION_REQUIRED: "Kies welke uitvoerversie je wilt delen.",
    UNSAVED_OUTPUT_SELECTION: "Sla de gekozen uitvoerversie op.",
    PREREQUISITES_UNRESOLVED: "Rond eerst de eerdere controlefases af.",
    APPROVAL_CHECKLIST_INCOMPLETE: "Rond de eindcontrole af.",
    ROLE_FORBIDDEN: "Je rol kan deze MatchPack niet goedkeuren.",
    AGENCY_QUOTA_REACHED: "Er is geen voorstel-slot beschikbaar.",
    FINAL_APPROVAL_REQUIRED: "Alle controles zijn gereed. Leg nu de definitieve goedkeuring vast.",
    MATCHPACK_SNAPSHOT_LOCKED: "Deze goedgekeurde versie is alleen-lezen.",
  };
  return labels[code] || "Controleer deze fase voordat je verdergaat.";
}

const inputClassName =
  "wk-input w-full px-3 py-3 text-sm font-semibold outline-none transition-colors";

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function isExpiringSoon(value: string | null): boolean {
  if (!value) return false;
  const remaining = new Date(value).getTime() - Date.now();
  return remaining >= 0 && remaining <= 14 * 24 * 60 * 60 * 1000;
}

function statusLabel(status: string): string {
  return status === "approved" ? "Goedgekeurd" : "Conceptreview";
}

function statusClass(status: string): string {
  return status === "approved"
    ? "border-emerald-300 bg-emerald-50 text-emerald-800"
    : "border-amber-300 bg-amber-50 text-amber-900";
}

function toSummary(pack: AgencyMatchPackDetail | AgencyMatchPackSummary): AgencyMatchPackSummary {
  return {
    id: pack.id,
    title: pack.title,
    vacancyTitle: pack.vacancyTitle,
    locale: pack.locale,
    sourceFileType: pack.sourceFileType,
    status: pack.status,
    cvDocumentId: pack.cvDocumentId,
    approvedAt: pack.approvedAt,
    retentionExpiresAt: pack.retentionExpiresAt,
    createdAt: pack.createdAt,
    updatedAt: pack.updatedAt,
    outcomeStatus: "outcomeData" in pack && pack.outcomeData ? pack.outcomeData.status : pack.outcomeStatus,
  };
}

function getStatusText(status: string): string {
  if (status === "strong") return "Sterk";
  if (status === "partial") return "Gedeeltelijk";
  return "Ontbreekt";
}

function getStatusTone(status: string): string {
  if (status === "strong") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (status === "partial") return "border-amber-200 bg-amber-50 text-amber-900";
  return "border-rose-200 bg-rose-50 text-rose-800";
}

function reviewerStatusLabel(status: string): string {
  if (status === "confirmed") return "Bevestigd";
  if (status === "corrected") return "Gecorrigeerd";
  if (status === "rejected") return "Afgewezen";
  return "Nog te beoordelen";
}

function getCandidateChanges(original: CVData, current: CVData): Array<{ label: string; before: string; after: string }> {
  const changes: Array<{ label: string; before: string; after: string }> = [];
  const compare = (label: string, before: string, after: string) => {
    if (before.trim() !== after.trim()) changes.push({ label, before: before || "—", after: after || "—" });
  };

  compare("Naam", original.personal.name, current.personal.name);
  compare("Professionele titel", original.personal.title, current.personal.title);
  compare("Profielsamenvatting", original.personal.summary, current.personal.summary);
  compare("Vaardigheden", original.skills.map((item) => item.name).join(", "), current.skills.map((item) => item.name).join(", "));
  if (original.experience.length !== current.experience.length) changes.push({ label: "Aantal werkervaringen", before: String(original.experience.length), after: String(current.experience.length) });
  if (original.education.length !== current.education.length) changes.push({ label: "Aantal opleidingen", before: String(original.education.length), after: String(current.education.length) });
  current.experience.forEach((experience, index) => {
    const before = original.experience[index];
    if (!before) return;
    compare(`Werkervaring ${index + 1} · functie`, before.role, experience.role);
    compare(`Werkervaring ${index + 1} · organisatie`, before.company, experience.company);
    compare(`Werkervaring ${index + 1} · beschrijving`, before.description, experience.description);
    compare(`Werkervaring ${index + 1} · resultaten`, before.highlights.join(" | "), experience.highlights.join(" | "));
  });
  current.education.forEach((education, index) => {
    const before = original.education[index];
    if (!before) return;
    compare(`Opleiding ${index + 1} · opleiding`, before.degree, education.degree);
    compare(`Opleiding ${index + 1} · instelling`, before.school, education.school);
  });
  return changes.slice(0, 24);
}

export default function AgencyMatchPackWorkspace({
  initialPacks,
  initialActivePack = null,
  initialUsed,
  allowance,
  canCreate,
  canCreateWork,
  canApprove,
  canDeleteDraft,
  canDeleteApproved,
  canOpenCv,
  claimVerifierEnabled = false,
  candidateAcknowledgementEnabled = false,
}: AgencyMatchPackWorkspaceProps) {
  useEffect(() => {
    track("agency_workspace_started", { location: "agency_matchpack_workspace" });
  }, []);

  const [packs, setPacks] = useState<AgencyMatchPackSummary[]>(initialPacks);
  const [activePack, setActivePack] = useState<AgencyMatchPackDetail | null>(initialActivePack);
  const [vacancyTitle, setVacancyTitle] = useState("");
  const [vacancyText, setVacancyText] = useState("");
  const [locale, setLocale] = useState<"nl" | "en">("nl");
  const [file, setFile] = useState<File | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState([false, false, false, false]);
  const [used, setUsed] = useState(initialUsed);
  const [fullPageCount, setFullPageCount] = useState(1);
  const [anonymizedPageCount, setAnonymizedPageCount] = useState(1);
  const [dirtyStages, setDirtyStages] = useState<Set<MatchPackStageId>>(() => new Set());
  const isDirty = dirtyStages.size > 0;
  const [reviewStep, setReviewStep] = useState<MatchPackStageId>("source");
  const [evidenceFilter, setEvidenceFilter] = useState<EvidenceFilter>("all");
  const [previewVariant, setPreviewVariant] = useState<"full" | "anonymized">("full");
  const [outcomeStatus, setOutcomeStatus] = useState<MatchPackOutcome["status"]>("unknown");
  const [outcomeNote, setOutcomeNote] = useState("");
  const [outcomeIssueCategory, setOutcomeIssueCategory] = useState<NonNullable<MatchPackOutcome["issueCategory"]>>("other");
  const [feedbackSendability, setFeedbackSendability] = useState<"sent" | "corrected" | "not_usable" | "not_sent">("sent");
  const [isOutcomeBusy, setIsOutcomeBusy] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [candidateReviews, setCandidateReviews] = useState<CandidateReviewSummary[]>([]);
  const [candidateInvite, setCandidateInvite] = useState({ candidateEmail: "", recipientOrganization: "", vacancyTitle: "", selectedVariant: "full" as "full" | "contact_free" });
  const [overrideReason, setOverrideReason] = useState("");
  const reviewStartedAtRef = useRef<number | null>(null);
  const workflowStartedAtRef = useRef<number | null>(null);

  const activeResult = activePack?.analysis.result;
  const evidenceReviewReady = Boolean(activeResult?.requirements.length)
    && activeResult!.requirements.every((requirement) => requirement.evidenceReference?.reviewerStatus !== "unreviewed");
  const claims = activePack?.claimVerificationData?.claims || [];
  const claimsReadyForCandidate = !claimVerifierEnabled || (claims.length > 0 && claims.every((claim) => {
    if (claim.verdict === "unsupported" || claim.verdict === "contradicted") return claim.reviewer.status === "corrected" || claim.reviewer.status === "removed";
    if (claim.verdict === "partially_supported" || claim.verdict === "not_checkable") return ["accepted", "corrected", "removed"].includes(claim.reviewer.status);
    return true;
  }));
  const latestCandidateReview = candidateReviews[0] || null;
  const candidateReady = !candidateAcknowledgementEnabled || latestCandidateReview?.candidateResponse === "confirmed" || latestCandidateReview?.status === "overridden";
  const reviewReady = checkedItems.every(Boolean) && evidenceReviewReady && claimsReadyForCandidate && candidateReady;
  const activeIsApproved = activePack?.status === "approved" && Boolean(activePack.cvDocumentId);
  const hasQuota = canCreate && used < allowance;
  const stagePresentation = activePack ? deriveMatchPackStagePresentation({
    isApproved: activeIsApproved,
    unsavedStageIds: Array.from(dirtyStages),
    canApprove,
    hasQuota,
    hasSavedSource: Boolean(activeResult && activePack.sourceTextDigest && activePack.revisions[0]),
    currentRevisionVersion: activePack.revisions[0]?.version || null,
    evidenceReviewerStatuses: activeResult?.requirements.map(
      (requirement) => requirement.evidenceReference?.reviewerStatus || "unreviewed",
    ) || [],
    claimVerification: activePack.claimVerificationData || null,
    clientCopy: {
      introduction: activePack.submissionData.clientIntroduction,
      emailSubject: activePack.submissionData.clientEmailSubject,
      emailBody: activePack.submissionData.clientEmailBody,
    },
    selectedVariant: activePack.submissionData.selectedVariant,
    approvalChecklistCompleted: checkedItems.filter(Boolean).length,
    approvalChecklistTotal: checkedItems.length,
    latestCandidateReview: latestCandidateReview ? {
      revisionVersion: latestCandidateReview.revisionVersion,
      status: latestCandidateReview.status,
      candidateResponse: latestCandidateReview.candidateResponse,
      pendingSuggestionCount: latestCandidateReview.suggestions.filter((suggestion) => suggestion.status === "pending").length,
    } : null,
    claimVerifierEnabled,
    candidateAcknowledgementEnabled,
  }) : [];
  const currentStage = stagePresentation.find((stage) => stage.id === reviewStep) || stagePresentation[0];
  const usagePercent = Math.min(100, (used / Math.max(1, allowance)) * 100);
  const filteredRequirements = activeResult?.requirements.filter((requirement) => (
    evidenceFilter === "all" || requirement.status === evidenceFilter
  )) || [];

  const activePackTitle = useMemo(() => {
    if (!activePack) return "Nieuw kandidaatvoorstel";
    return activePack.vacancyTitle || activePack.title;
  }, [activePack]);

  const resetWorkspace = () => {
    setActivePack(null);
    setShowDeleteConfirmation(false);
    setDeleteConfirmation("");
    setVacancyTitle("");
    setVacancyText("");
    setLocale("nl");
    setFile(null);
    setCheckedItems([false, false, false, false]);
    setError(null);
    setNotice(null);
    setDirtyStages(new Set());
    setReviewStep("source");
    setEvidenceFilter("all");
    setPreviewVariant("full");
    setOutcomeStatus("unknown");
    setOutcomeNote("");
    reviewStartedAtRef.current = null;
    workflowStartedAtRef.current = null;
  };

  const updateCandidatePersonal = (field: keyof CVData["personal"], value: string) => {
    setActivePack((current) => current ? {
      ...current,
      candidateData: {
        ...current.candidateData,
        personal: { ...current.candidateData.personal, [field]: value },
      },
    } : current);
    setDirtyStages((current) => new Set(current).add("candidate_facts"));
  };

  const updateExperience = (index: number, field: keyof CVData["experience"][number], value: string | string[]) => {
    setActivePack((current) => current ? {
      ...current,
      candidateData: {
        ...current.candidateData,
        experience: current.candidateData.experience.map((item, itemIndex) => itemIndex === index
          ? { ...item, [field]: value }
          : item),
      },
    } : current);
    setDirtyStages((current) => new Set(current).add("candidate_facts"));
  };

  const updateEducation = (index: number, field: keyof CVData["education"][number], value: string) => {
    setActivePack((current) => current ? {
      ...current,
      candidateData: {
        ...current.candidateData,
        education: current.candidateData.education.map((item, itemIndex) => itemIndex === index
          ? { ...item, [field]: value }
          : item),
      },
    } : current);
    setDirtyStages((current) => new Set(current).add("candidate_facts"));
  };

  const updateSkills = (value: string) => {
    const names = value.split(",").map((item) => item.trim()).filter(Boolean).slice(0, 40);
    setActivePack((current) => current ? {
      ...current,
      candidateData: {
        ...current.candidateData,
        skills: names.map((name, index) => ({ name, level: current.candidateData.skills[index]?.level || 3 })),
      },
    } : current);
    setDirtyStages((current) => new Set(current).add("candidate_facts"));
  };

  const updateSubmission = <K extends keyof MatchPackSubmission>(field: K, value: MatchPackSubmission[K]) => {
    setActivePack((current) => current ? {
      ...current,
      submissionData: { ...current.submissionData, [field]: value },
    } : current);
    setDirtyStages((current) => new Set(current).add(field === "selectedVariant" ? "output" : "client_copy"));
  };

  const updateCommercial = (field: keyof MatchPackSubmission["commercial"], value: string) => {
    setActivePack((current) => current ? {
      ...current,
      submissionData: {
        ...current.submissionData,
        commercial: { ...current.submissionData.commercial, [field]: value },
      },
    } : current);
    setDirtyStages((current) => new Set(current).add("candidate_facts"));
  };

  const updateEvidenceReview = (
    requirementIndex: number,
    reviewerStatus: "unreviewed" | "confirmed" | "corrected" | "rejected",
    reviewerNote: string,
  ) => {
    setActivePack((current) => {
      if (!current) return current;
      return {
        ...current,
        analysis: {
          ...current.analysis,
          result: {
            ...current.analysis.result,
            requirements: current.analysis.result.requirements.map((requirement, index) => index === requirementIndex
              ? {
                ...requirement,
                evidenceReference: {
                  version: 1,
                  sourcePage: requirement.evidenceReference?.sourcePage ?? null,
                  sourceLine: requirement.evidenceReference?.sourceLine || 1,
                  sourceSection: requirement.evidenceReference?.sourceSection || "CV-bron",
                  snippet: requirement.evidenceReference?.snippet || "",
                  match: requirement.evidenceReference?.match || "not_found",
                  reviewerStatus,
                  reviewerNote,
                  reviewedEvidence: reviewerStatus === "rejected" || reviewerStatus === "unreviewed"
                    ? ""
                    : requirement.evidenceReference?.reviewedEvidence || requirement.cvEvidence,
                  reviewedSource: reviewerStatus === "rejected" || reviewerStatus === "unreviewed"
                    ? null
                    : requirement.evidenceReference?.reviewedSource || {
                      sourcePage: requirement.evidenceReference?.sourcePage ?? null,
                      sourceLine: requirement.evidenceReference?.sourceLine || 1,
                      sourceSection: requirement.evidenceReference?.sourceSection || "CV-bron",
                      snippet: requirement.evidenceReference?.snippet || "",
                      match: requirement.evidenceReference?.match || "not_found",
                    },
                  reviewedAt: reviewerStatus === "unreviewed" ? null : new Date().toISOString(),
                  reviewerId: reviewerStatus === "unreviewed" ? null : "current-user",
                },
              }
              : requirement),
          },
        },
      };
    });
    setDirtyStages((current) => new Set(current).add(claimVerifierEnabled ? "claims" : "source"));
  };

  const updateEvidenceDetail = (requirementIndex: number, field: "reviewedEvidence" | "reviewerNote" | "sourceSnippet", value: string) => {
    setActivePack((current) => {
      if (!current) return current;
      return {
        ...current,
        analysis: {
          ...current.analysis,
          result: {
            ...current.analysis.result,
            requirements: current.analysis.result.requirements.map((requirement, index) => {
              if (index !== requirementIndex || !requirement.evidenceReference) return requirement;
              const evidenceReference = requirement.evidenceReference;
              if (field === "sourceSnippet") {
                return { ...requirement, evidenceReference: { ...evidenceReference, reviewedSource: evidenceReference.reviewedSource ? { ...evidenceReference.reviewedSource, snippet: value } : null } };
              }
              return { ...requirement, evidenceReference: { ...evidenceReference, [field]: value } };
            }),
          },
        },
      };
    });
    setDirtyStages((current) => new Set(current).add(claimVerifierEnabled ? "claims" : "source"));
  };

  const handleAnalyze = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canCreateWork) {
      setError("Je rol kan bestaande MatchPacks beoordelen, maar geen nieuwe maken.");
      return;
    }
    if (!file) {
      setError("Upload eerst het CV van de kandidaat.");
      return;
    }
    if (vacancyText.trim().length < 120) {
      setError("Plak de volledige vacaturetekst, inclusief eisen en verantwoordelijkheden.");
      return;
    }

    setIsBusy(true);
    setError(null);
    setNotice(null);
    workflowStartedAtRef.current = Date.now();
    const fileType = file.name.toLowerCase().endsWith(".pdf")
      ? "pdf"
      : file.name.toLowerCase().endsWith(".docx") ? "docx" : "unknown";
    track("matchpack_analysis_started", { locale, fileType });
    try {
      const formData = new FormData();
      formData.append("cvFile", file);
      formData.append("vacancyTitle", vacancyTitle);
      formData.append("vacancyText", vacancyText);
      formData.append("locale", locale);

      const response = await fetch("/api/agency/matchpack", {
        method: "POST",
        body: formData,
        cache: "no-store",
      });
      const body = await response.json().catch(() => null) as { pack?: AgencyMatchPackDetail; error?: string; code?: string } | null;
      if (!response.ok || !body?.pack) {
        track("matchpack_analysis_failed", { locale, reason: body?.code || `http_${response.status}` });
        throw new Error(body?.error || "De MatchPack kon niet worden gemaakt.");
      }

      setActivePack(body.pack);
      reviewStartedAtRef.current = Date.now();
      setOutcomeStatus(body.pack.outcomeData?.status || "unknown");
      setOutcomeNote(body.pack.outcomeData?.note || "");
      setOutcomeIssueCategory(body.pack.outcomeData?.issueCategory || "other");
      setFeedbackSendability(body.pack.outcomeData?.sendability || "sent");
      setPacks((current) => [toSummary(body.pack as AgencyMatchPackDetail), ...current.filter((pack) => pack.id !== body.pack?.id)]);
      setCheckedItems([false, false, false, false]);
      setDirtyStages(new Set());
      setReviewStep("source");
      setEvidenceFilter("all");
      setPreviewVariant(body.pack.submissionData.selectedVariant);
      setNotice("Analyse klaar. Controleer eerst het bewijs per vacature-eis.");
      track("matchpack_analysis_completed", {
        locale,
        requirementCount: body.pack.analysis.result.requirements.length,
        scoreBand: body.pack.analysis.result.scoreBand,
      });
    } catch (caught) {
      if (!(caught instanceof Error)) track("matchpack_analysis_failed", { locale, reason: "unknown" });
      setError(caught instanceof Error ? caught.message : "De MatchPack kon niet worden gemaakt.");
    } finally {
      setIsBusy(false);
    }
  };

  const openPack = async (id: string) => {
    setIsBusy(true);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch(`/api/agency/matchpack/${encodeURIComponent(id)}`, { cache: "no-store" });
      const body = await response.json().catch(() => null) as { pack?: AgencyMatchPackDetail; error?: string } | null;
      if (!response.ok || !body?.pack) throw new Error(body?.error || "De MatchPack kon niet worden geopend.");
      setActivePack(body.pack);
      if (candidateAcknowledgementEnabled) void loadCandidateReviews(body.pack.id);
      reviewStartedAtRef.current = Date.now();
      workflowStartedAtRef.current = null;
      setOutcomeStatus(body.pack.outcomeData?.status || "unknown");
      setOutcomeNote(body.pack.outcomeData?.note || "");
      setOutcomeIssueCategory(body.pack.outcomeData?.issueCategory || "other");
      setFeedbackSendability(body.pack.outcomeData?.sendability || "sent");
      setCheckedItems([false, false, false, false]);
      setDirtyStages(new Set());
      setReviewStep("source");
      setEvidenceFilter("all");
      setPreviewVariant(body.pack.submissionData.selectedVariant);
      track("matchpack_review_opened", {
        locale: body.pack.locale === "en" ? "en" : "nl",
        status: body.pack.status === "approved" ? "approved" : "analyzed",
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "De MatchPack kon niet worden geopend.");
    } finally {
      setIsBusy(false);
    }
  };

  const loadCandidateReviews = async (packId: string) => {
    const response = await fetch(`/api/agency/matchpack/${encodeURIComponent(packId)}/candidate-review`, { cache: "no-store" });
    const body = await response.json().catch(() => ({})) as { reviews?: CandidateReviewSummary[] };
    if (response.ok && Array.isArray(body.reviews)) setCandidateReviews(body.reviews);
  };

  useEffect(() => {
    if (!candidateAcknowledgementEnabled || !activePack?.id) {
      setCandidateReviews([]);
      return;
    }
    let cancelled = false;
    fetch(`/api/agency/matchpack/${encodeURIComponent(activePack.id)}/candidate-review`, { cache: "no-store" })
      .then(async (response) => ({ response, body: await response.json().catch(() => ({})) as { reviews?: CandidateReviewSummary[] } }))
      .then(({ response, body }) => {
        if (!cancelled && response.ok && Array.isArray(body.reviews)) setCandidateReviews(body.reviews);
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, [activePack?.id, candidateAcknowledgementEnabled]);

  const runClaimVerification = async () => {
    if (!activePack || isDirty) return;
    setIsBusy(true); setError(null); setNotice(null);
    try {
      const response = await fetch(`/api/agency/matchpack/${encodeURIComponent(activePack.id)}/claims`, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      const body = await response.json().catch(() => ({})) as { verification?: ProposalClaimVerificationV1; revisionVersion?: number; error?: string };
      if (!response.ok || !body.verification) throw new Error(body.error || "De claims konden niet worden gecontroleerd.");
      setActivePack((current) => current ? { ...current, claimVerificationData: body.verification!, updatedAt: new Date().toISOString(), revisions: body.revisionVersion ? [{ id: `claim-${body.revisionVersion}`, version: body.revisionVersion, reason: "claim_review_saved", changedFields: ["claimVerificationData"], createdById: "", createdAt: new Date().toISOString() }, ...current.revisions] : current.revisions } : current);
      setNotice("Klantclaims gecontroleerd. Beoordeel de gemarkeerde claims vóór de kandidaatuitnodiging.");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "De claims konden niet worden gecontroleerd."); }
    finally { setIsBusy(false); }
  };

  const reviewClaim = async (claimId: string, status: "accepted" | "corrected" | "removed") => {
    if (!activePack) return;
    setIsBusy(true); setError(null);
    try {
      const response = await fetch(`/api/agency/matchpack/${encodeURIComponent(activePack.id)}/claims`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reviews: [{ claimId, status, note: "" }] }) });
      const body = await response.json().catch(() => ({})) as { verification?: ProposalClaimVerificationV1; revisionVersion?: number; error?: string };
      if (!response.ok || !body.verification) throw new Error(body.error || "De claimreview kon niet worden opgeslagen.");
      setActivePack((current) => current ? { ...current, claimVerificationData: body.verification!, updatedAt: new Date().toISOString(), revisions: body.revisionVersion ? [{ id: `claim-${body.revisionVersion}`, version: body.revisionVersion, reason: "claim_review_saved", changedFields: ["claimVerificationData"], createdById: "", createdAt: new Date().toISOString() }, ...current.revisions] : current.revisions } : current);
    } catch (caught) { setError(caught instanceof Error ? caught.message : "De claimreview kon niet worden opgeslagen."); }
    finally { setIsBusy(false); }
  };

  const inviteCandidate = async () => {
    if (!activePack || !claimsReadyForCandidate) return;
    setIsBusy(true); setError(null); setNotice(null);
    try {
      const response = await fetch(`/api/agency/matchpack/${encodeURIComponent(activePack.id)}/candidate-review`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...candidateInvite, vacancyTitle: candidateInvite.vacancyTitle || activePack.vacancyTitle || activePack.title, selectedVariant: activePack.submissionData.selectedVariant === "full" ? "full" : "contact_free" }) });
      const body = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) throw new Error(body.error || "De kandidaatuitnodiging kon niet worden verzonden.");
      await loadCandidateReviews(activePack.id);
      setNotice("De kandidaatuitnodiging is verzonden. Goedkeuring blijft geblokkeerd tot bevestiging of een toegestane override.");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "De kandidaatuitnodiging kon niet worden verzonden."); }
    finally { setIsBusy(false); }
  };

  const recordOverride = async () => {
    if (!activePack) return;
    setIsBusy(true); setError(null);
    try {
      const response = await fetch(`/api/agency/matchpack/${encodeURIComponent(activePack.id)}/candidate-review/override`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reason: overrideReason }) });
      const body = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) throw new Error(body.error || "De override kon niet worden vastgelegd.");
      await loadCandidateReviews(activePack.id); setOverrideReason(""); setNotice("Override vastgelegd in het onveranderbare gebeurtenislog.");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "De override kon niet worden vastgelegd."); }
    finally { setIsBusy(false); }
  };

  const resolveCandidateSuggestion = async (suggestionId: string, status: "accepted" | "rejected") => {
    if (!activePack) return;
    setIsBusy(true); setError(null);
    try {
      const response = await fetch(`/api/agency/matchpack/${encodeURIComponent(activePack.id)}/candidate-review/suggestions/${encodeURIComponent(suggestionId)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status, reviewerNote: "" }) });
      const body = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) throw new Error(body.error || "De correctie kon niet worden verwerkt.");
      await openPack(activePack.id);
      setNotice(status === "accepted" ? "Correctie verwerkt in een nieuwe revisie. Controleer de klantclaims opnieuw en stuur daarna een nieuwe uitnodiging." : "Correctie afgewezen en vastgelegd. Stuur een nieuwe uitnodiging om deze versie opnieuw te laten bevestigen.");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "De correctie kon niet worden verwerkt."); }
    finally { setIsBusy(false); }
  };

  const saveDraft = async () => {
    if (!activePack || activeIsApproved || (!canCreateWork && !canApprove)) return;
    setIsBusy(true);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch(`/api/agency/matchpack/${encodeURIComponent(activePack.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateData: activePack.candidateData,
          submissionData: activePack.submissionData,
          evidenceReviews: activePack.analysis.result.requirements.map((requirement, requirementIndex) => ({
            requirementIndex,
            reviewerStatus: requirement.evidenceReference?.reviewerStatus || "unreviewed",
            reviewerNote: requirement.evidenceReference?.reviewerNote || "",
            reviewedEvidence: requirement.evidenceReference?.reviewedEvidence || "",
            reviewedSource: requirement.evidenceReference?.reviewedSource || null,
          })),
        }),
      });
      const body = await response.json().catch(() => null) as {
        pack?: Pick<AgencyMatchPackDetail, "candidateData" | "anonymizedData" | "analysis" | "submissionData" | "claimVerificationData" | "updatedAt" | "revisions">;
        error?: string;
      } | null;
      if (!response.ok || !body?.pack) throw new Error(body?.error || "Het concept kon niet worden opgeslagen.");
       setActivePack((current) => current ? { ...current, ...body.pack } : current);
      setPacks((current) => current.map((pack) => pack.id === activePack.id
        ? { ...pack, updatedAt: body.pack?.updatedAt || pack.updatedAt }
        : pack));
      setDirtyStages(new Set());
      setCheckedItems([false, false, false, false]);
      setNotice("Concept opgeslagen. Beide uitvoerversies gebruiken nu dezelfde gecontroleerde brondata.");
      track("matchpack_draft_saved", {
        locale: activePack.locale === "en" ? "en" : "nl",
        selectedVariant: activePack.submissionData.selectedVariant,
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Het concept kon niet worden opgeslagen.");
    } finally {
      setIsBusy(false);
    }
  };

  const approvePack = async () => {
    if (!activePack || !reviewReady || activeIsApproved || isDirty || !canApprove) return;
    setIsBusy(true);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch(`/api/agency/matchpack/${encodeURIComponent(activePack.id)}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          version: 1,
          expectedUpdatedAt: activePack.updatedAt,
          expectedRevisionVersion: activePack.revisions[0]?.version || 1,
          selectedVariant: activePack.submissionData.selectedVariant === "full" ? "full" : "contact_free",
          confirmations: {
            evidenceReviewed: checkedItems[0] === true,
            candidateDataReviewed: checkedItems[1] === true,
            clientCopyReviewed: checkedItems[2] === true,
            sharingAuthorityConfirmed: checkedItems[3] === true,
          },
        }),
      });
      const body = await response.json().catch(() => null) as {
        cvId?: string;
        reused?: boolean;
        retentionExpiresAt?: string | null;
        quota?: { used?: number; remaining?: number };
        error?: string;
      } | null;
      if (!response.ok || typeof body?.cvId !== "string") {
        throw new Error(body?.error || "De MatchPack kon niet worden goedgekeurd.");
      }

      setActivePack((current) => current ? {
        ...current,
        status: "approved",
         cvDocumentId: body.cvId || current.cvDocumentId,
         approvedAt: new Date().toISOString(),
         retentionExpiresAt: body.retentionExpiresAt || current.retentionExpiresAt,
      } : current);
      setPacks((current) => current.map((pack) => pack.id === activePack.id
         ? { ...pack, status: "approved", cvDocumentId: body.cvId || pack.cvDocumentId, approvedAt: new Date().toISOString(), retentionExpiresAt: body.retentionExpiresAt || pack.retentionExpiresAt }
        : pack));
      if (typeof body.quota?.used === "number") setUsed(body.quota.used);
      setNotice(body.reused ? "Dit kandidaatvoorstel was al goedgekeurd." : "Goedgekeurd. Eén voorstel-slot is nu gebruikt en de gekozen klantversie staat klaar.");
      track("matchpack_approved", {
        locale: activePack.locale === "en" ? "en" : "nl",
        selectedVariant: activePack.submissionData.selectedVariant,
        requirementCount: activePack.analysis.result.requirements.length,
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "De MatchPack kon niet worden goedgekeurd.");
    } finally {
      setIsBusy(false);
    }
  };

  const chooseOutputVariant = (variant: "full" | "anonymized") => {
    setPreviewVariant(variant);
    if (!activePack || activeIsApproved || !canApprove || activePack.submissionData.selectedVariant === variant) return;
    updateSubmission("selectedVariant", variant);
  };

  const moveReviewStep = (direction: -1 | 1) => {
    const currentIndex = stagePresentation.findIndex((step) => step.id === reviewStep);
    const nextStep = stagePresentation[currentIndex + direction];
    if (nextStep) setReviewStep(nextStep.id);
  };

  const copyClientEmail = async () => {
    if (!activePack) return;
    try {
      const locale = activePack.locale === "en" ? "en" : "nl";
      const response = await fetch(`/api/agency/matchpack/${encodeURIComponent(activePack.id)}/client-copy`);
      const body = await response.json().catch(() => null) as { copy?: { emailSubject: string; emailBody: string }; error?: string } | null;
      if (!response.ok || !body?.copy) throw new Error(body?.error || "De gecontroleerde e-mail kon niet worden voorbereid.");
      await navigator.clipboard.writeText(`${body.copy.emailSubject}\n\n${body.copy.emailBody}`);
      setNotice("Onderwerp en e-mailtekst gekopieerd.");
      track("matchpack_email_copied", { locale });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Kopiëren lukte niet.");
    }
  };

  const deletePack = async () => {
    if (!activePack) return;
    if (activeIsApproved && !canDeleteApproved) return;
    if (!activeIsApproved && !canDeleteDraft) return;
    if (activeIsApproved && deleteConfirmation !== "DELETE MATCHPACK") return;

    setIsBusy(true);
    setError(null);
    try {
      const response = await fetch(`/api/agency/matchpack/${encodeURIComponent(activePack.id)}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activeIsApproved ? { confirmation: deleteConfirmation } : {}),
      });
      const body = await response.json().catch(() => null) as { error?: string } | null;
      if (!response.ok) throw new Error(body?.error || "De MatchPack kon niet worden verwijderd.");
      setPacks((current) => current.filter((pack) => pack.id !== activePack.id));
      resetWorkspace();
      setNotice("MatchPack verwijderd.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "De MatchPack kon niet worden verwijderd.");
    } finally {
      setIsBusy(false);
    }
  };

  const saveOutcome = async () => {
    if (!activePack || activePack.status !== "approved") return;
    setIsOutcomeBusy(true);
    setError(null);
    try {
      const response = await fetch(`/api/agency/matchpack/${encodeURIComponent(activePack.id)}/outcome`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: outcomeStatus }),
      });
      const body = await response.json().catch(() => null) as { outcome?: { status: MatchPackOutcome["status"] }; error?: string } | null;
      if (!response.ok || !body?.outcome) throw new Error(body?.error || "De klantstatus kon niet worden opgeslagen.");
      if (outcomeNote.trim()) {
        const feedbackResponse = await fetch(`/api/agency/matchpack/${encodeURIComponent(activePack.id)}/feedback`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ version: 1, sendability: feedbackSendability, issueCategories: [outcomeIssueCategory], note: outcomeNote }),
        });
        const feedbackBody = await feedbackResponse.json().catch(() => null) as { error?: string } | null;
        if (!feedbackResponse.ok) throw new Error(feedbackBody?.error || "De productfeedback kon niet worden opgeslagen.");
      }
      const savedOutcome = body.outcome;
      setActivePack((current) => current ? { ...current, outcomeData: { status: savedOutcome.status, note: outcomeNote, issueCategory: outcomeIssueCategory, sendability: feedbackSendability }, outcomeStatus: savedOutcome.status } : current);
      setPacks((current) => current.map((pack) => pack.id === activePack.id ? { ...pack, outcomeStatus: savedOutcome.status } : pack));
      setNotice("Klantstatus opgeslagen.");
      track("matchpack_client_outcome_saved", { status: savedOutcome.status });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "De klantstatus kon niet worden opgeslagen.");
    } finally {
      setIsOutcomeBusy(false);
    }
  };

  const visibleSourceChanges = activePack
    ? getCandidateChanges(activePack.originalCandidateData, activePack.candidateData)
    : [];

  const renderPackList = () => packs.length ? packs.map((pack) => (
    <button
      type="button"
      key={pack.id}
      onClick={() => void openPack(pack.id)}
      className={"w-full border-2 px-3 py-3 text-left transition-colors " + (activePack?.id === pack.id ? "border-emerald-600 bg-emerald-50" : "border-slate-200 bg-white hover:border-slate-400")}
    >
      <span className="block truncate text-sm font-black">{pack.vacancyTitle || pack.title}</span>
      <span className="mt-1 flex items-center justify-between gap-2 text-[11px] font-bold text-slate-500">
        <span>{formatDate(pack.updatedAt)}</span>
        <span className={"border px-1.5 py-0.5 " + statusClass(pack.status)}>{statusLabel(pack.status)}</span>
      </span>
    </button>
  )) : (
    <p className="border-2 border-dashed border-slate-300 px-3 py-4 text-xs font-semibold leading-relaxed text-slate-500">
      Nog geen kandidaatvoorstellen. Start met een CV en vacature hieronder.
    </p>
  );

  return (
    <div className="wk-matchpack-workspace">
      <aside className="wk-matchpack-sidebar">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Agency workflow</p>
            <h2 className="mt-1 text-xl font-black">Kandidaatvoorstellen</h2>
          </div>
          <button
            type="button"
            onClick={resetWorkspace}
            disabled={!canCreateWork}
            className="border-2 border-slate-900 bg-yellow-300 px-3 py-2 text-xs font-black"
          >
            Nieuw
          </button>
        </div>

        <div className="mt-5 border-t-2 border-slate-100 pt-4">
          <div className="flex items-end justify-between gap-3">
            <span className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">Voorstel-slots</span>
            <span className="text-sm font-black">{used} / {allowance}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden bg-slate-100">
            <div className="h-full bg-emerald-500" style={{ width: `${usagePercent}%` }} />
          </div>
          <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-500">
            Analyse en conceptreview gebruiken geen slot. Een slot wordt pas gebruikt bij definitieve goedkeuring.
          </p>
        </div>

        <div className="wk-matchpack-desktop-list mt-5 space-y-2">{renderPackList()}</div>
        <div className="wk-matchpack-mobile-list mt-5">
          <details open={Boolean(activePack)} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <summary className="cursor-pointer list-none text-sm font-black text-slate-900">
              {activePack ? "Andere MatchPacks openen" : "Bestaande MatchPacks bekijken"} <span className="text-xs font-bold text-slate-500">({packs.length})</span>
            </summary>
            <div className="mt-3 space-y-2">{renderPackList()}</div>
          </details>
        </div>
      </aside>

      <section className="min-w-0">
        {error ? <div className="mb-5 border-2 border-rose-500 bg-rose-50 p-4 text-sm font-semibold text-rose-900" role="alert">{error}</div> : null}
        {notice ? <div className="mb-5 border-2 border-emerald-500 bg-emerald-50 p-4 text-sm font-semibold text-emerald-900" role="status">{notice}</div> : null}
        {!canApprove ? <div className="mb-5 border-2 border-slate-300 bg-slate-50 p-4 text-sm font-semibold text-slate-700">Je rol is alleen-lezen. Je kunt MatchPacks openen, maar niet wijzigen of goedkeuren.</div> : null}

        {!activePack ? (
          <form onSubmit={handleAnalyze} className="wk-matchpack-new-proposal">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-slate-100 pb-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Nieuw kandidaatvoorstel · MatchPack</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">CV + vacature → compleet concept voor review</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
                  Upload het CV, plak de vacature en laat WerkCV de eisen koppelen aan concreet bewijs. Je houdt de laatste goedkeuring zelf.
                </p>
              </div>
              <span className="border-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-800">Geen slot bij analyse</span>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <label className="block text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                Vacaturetitel <span className="font-semibold normal-case tracking-normal">(optioneel)</span>
                <input className={`${inputClassName} mt-2`} value={vacancyTitle} onChange={(event) => setVacancyTitle(event.target.value)} placeholder="Bijv. Senior Java Developer" maxLength={160} />
              </label>
              <label className="block text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                Outputtaal
                <select className={`${inputClassName} mt-2`} value={locale} onChange={(event) => setLocale(event.target.value === "en" ? "en" : "nl")}>
                  <option value="nl">Nederlands</option>
                  <option value="en">English</option>
                </select>
              </label>
            </div>

            <label className="mt-5 block text-xs font-black uppercase tracking-[0.12em] text-slate-500">
              Kandidaat-CV
              <input
                className="mt-2 block w-full border-2 border-dashed border-slate-300 bg-slate-50 px-3 py-4 text-sm font-semibold text-slate-700 file:mr-3 file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:font-black file:text-white"
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(event) => setFile(event.target.files?.[0] || null)}
              />
              <span className="mt-2 block text-xs font-semibold normal-case tracking-normal text-slate-500">PDF of DOCX · maximaal 10 MB · tekstgebaseerd bestand</span>
            </label>

            <label className="mt-5 block text-xs font-black uppercase tracking-[0.12em] text-slate-500">
              Volledige vacaturetekst
              <textarea className={`${inputClassName} mt-2 min-h-64 resize-y font-medium leading-relaxed`} value={vacancyText} onChange={(event) => setVacancyText(event.target.value)} placeholder="Plak hier de functie, verantwoordelijkheden, eisen en pré's..." maxLength={18000} />
              <span className="mt-2 block text-xs font-semibold normal-case tracking-normal text-slate-500">{vacancyText.length.toLocaleString("nl-NL")} / 18.000 tekens</span>
            </label>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t-2 border-slate-100 pt-5">
              <p className="max-w-xl text-xs font-semibold leading-relaxed text-slate-500">De upload en vacaturetekst worden alleen binnen je beveiligde agency-account verwerkt. Het originele bestand wordt niet opgeslagen; het gecontroleerde concept blijft beschikbaar in je account.</p>
      <button type="submit" disabled={isBusy || !hasQuota || !canCreateWork} className="border-2 border-slate-900 bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] disabled:cursor-not-allowed disabled:opacity-50">
                {isBusy ? "Voorstel analyseren…" : !canCreateWork ? "Je rol kan geen nieuwe MatchPacks maken" : hasQuota ? "Analyseer en maak concept" : "Maandlimiet bereikt"}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="wk-matchpack-active-header">
              <div>
                <button type="button" onClick={resetWorkspace} className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700 underline underline-offset-4">← Nieuwe MatchPack</button>
                <h2 className="mt-3 text-3xl font-black tracking-tight">{activePackTitle}</h2>
                <p className="mt-2 text-sm font-semibold text-slate-500">Aangemaakt {formatDate(activePack.createdAt)} · {activePack.sourceFileType?.toUpperCase() || "CV"}</p>
              </div>
              <span className={`border-2 px-3 py-2 text-xs font-black ${statusClass(activePack.status)}`}>{statusLabel(activePack.status)}</span>
            </div>

            <nav aria-label="MatchPack-stappen" className="wk-matchpack-stepper">
              <ol className="grid gap-2 sm:grid-cols-3 xl:grid-cols-6">
                {stagePresentation.map((step, index) => {
                  const isCurrent = reviewStep === step.id;
                  const copy = stageCopy[step.id];
                  return (
                    <li key={step.id}>
                      <button
                        type="button"
                        onClick={() => setReviewStep(step.id)}
                        disabled={!step.canOpen}
                        className={`flex w-full items-start gap-2 border-2 px-3 py-3 text-left transition-colors ${isCurrent ? "border-slate-900 bg-emerald-50" : "border-slate-200 bg-white hover:border-slate-400"}`}
                        aria-current={isCurrent ? "step" : undefined}
                        aria-describedby={`matchpack-stage-${step.id}-status`}
                      >
                        <span className={`flex h-6 w-6 shrink-0 items-center justify-center text-xs font-black ${isCurrent ? "bg-emerald-400 text-slate-950" : stageStatusClass(step.status)}`}>{index + 1}</span>
                        <span className="min-w-0">
                          <span className="block text-xs font-black leading-tight">{copy.label}</span>
                          <span className="mt-1 block text-[11px] font-semibold leading-tight text-slate-500">{copy.hint}</span>
                          <span id={`matchpack-stage-${step.id}-status`} className={`mt-2 inline-flex px-1.5 py-0.5 text-[10px] font-black ${stageStatusClass(step.status)}`}>
                            {stageStatusLabel(step.status)}{step.unresolvedCount ? ` · ${step.unresolvedCount}` : ""}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            {currentStage && currentStage.blockingReasonCodes.length ? (
              <div className="border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-950" role="status">
                <span className="font-black">{stageStatusLabel(currentStage.status)}:</span>{" "}
                {stageBlockingReasonLabel(currentStage.blockingReasonCodes[0])}
                {currentStage.unresolvedCount > 1 ? ` Nog ${currentStage.unresolvedCount} acties.` : ""}
              </div>
            ) : null}

            {activeResult ? (
              <>
                {reviewStep === "source" && claimVerifierEnabled ? <section className="border-2 border-slate-900 bg-white p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Vaste bronset</p>
                      <h3 className="mt-2 text-2xl font-black">Controleer welke bronnen bij deze versie horen</h3>
                      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-700">De oorspronkelijke upload wordt niet als bestand bewaard. WerkCV bewaart de gecontroleerde extractie, bronverwijzingen en digest die bij deze MatchPack-versie horen.</p>
                    </div>
                    <span className="border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-black">Versie {activePack.revisions[0]?.version || "—"}</span>
                  </div>
                  <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="border border-slate-200 bg-slate-50 p-3"><dt className="text-[11px] font-black uppercase tracking-wide text-slate-500">CV-bron</dt><dd className="mt-1 text-sm font-black">{activePack.sourceFileType?.toUpperCase() || "Onbekend bestandstype"}</dd></div>
                    <div className="border border-slate-200 bg-slate-50 p-3"><dt className="text-[11px] font-black uppercase tracking-wide text-slate-500">Vacature</dt><dd className="mt-1 break-words text-sm font-black">{activePack.vacancyTitle || "Zonder titel"}</dd></div>
                    <div className="border border-slate-200 bg-slate-50 p-3"><dt className="text-[11px] font-black uppercase tracking-wide text-slate-500">Bron-digest</dt><dd className="mt-1 break-all font-mono text-xs font-bold">{activePack.sourceTextDigest ? `${activePack.sourceTextDigest.slice(0, 16)}…` : "Niet beschikbaar"}</dd></div>
                    <div className="border border-slate-200 bg-slate-50 p-3"><dt className="text-[11px] font-black uppercase tracking-wide text-slate-500">Laatste opslag</dt><dd className="mt-1 text-sm font-black">{formatDate(activePack.updatedAt)}</dd></div>
                  </dl>
                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    <details className="border-2 border-slate-200 bg-slate-50 p-4">
                      <summary className="cursor-pointer text-sm font-black">Originele verwerkte CV bekijken</summary>
                      <div className="mt-4 max-h-[620px] overflow-auto bg-slate-200 p-3">
                        <ScaledCvPreview data={activePack.originalCandidateData} templateId={activePack.templateId} colorThemeId={activePack.colorThemeId} scale={0.42} pageCount={fullPageCount} paginated />
                      </div>
                    </details>
                    <details className="border-2 border-slate-200 bg-slate-50 p-4">
                      <summary className="cursor-pointer text-sm font-black">Volledige vacaturetekst bekijken</summary>
                      <div className="mt-4 max-h-[620px] overflow-auto whitespace-pre-wrap break-words bg-white p-4 text-sm leading-relaxed text-slate-700">{activePack.vacancyText}</div>
                    </details>
                  </div>
                  <div className="mt-5 border-t border-slate-200 pt-5">
                    <h4 className="text-sm font-black">Versiegeschiedenis</h4>
                    <ol className="mt-3 space-y-2">
                      {activePack.revisions.slice(0, 8).map((revision) => <li key={revision.id} className="flex flex-wrap items-start justify-between gap-3 border border-slate-200 bg-slate-50 px-3 py-3 text-xs"><span><strong>Versie {revision.version}</strong> · {revision.reason || "Opgeslagen versie"}{revision.changedFields.length ? ` · ${revision.changedFields.join(", ")}` : ""}</span><time dateTime={revision.createdAt} className="font-semibold text-slate-500">{formatDate(revision.createdAt)}</time></li>)}
                    </ol>
                  </div>
                </section> : null}

                {reviewStep === "claims" || (reviewStep === "source" && !claimVerifierEnabled) ? <>
                <section className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
                  <div className="border-2 border-slate-900 bg-white p-5 shadow-[4px_4px_0px_0px_rgba(78,205,196,1)] sm:p-6">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Onderbouwde match</p>
                    <h3 className="mt-2 text-2xl font-black">Waarom dit profiel wel of niet past</h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-700">{activeResult.summary}</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="border-2 border-slate-200 bg-slate-50 p-3"><p className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-500">Rol</p><p className="mt-1 text-sm font-black">{activeResult.perceivedRole}</p></div>
                      <div className="border-2 border-slate-200 bg-slate-50 p-3"><p className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-500">Senioriteit</p><p className="mt-1 text-sm font-black">{activeResult.perceivedSeniority}</p></div>
                    </div>
                  </div>
                  <div className="border-2 border-slate-900 bg-slate-950 p-5 text-white sm:p-6">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">Recruiter focus</p>
                    <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-200">Gebruik de bewijsregels hieronder in je interne review. WerkCV rangschikt of selecteert geen kandidaten.</p>
                    <div className="mt-5 space-y-3">
                      {activeResult.strengths.slice(0, 3).map((strength) => <div key={`${strength.title}-${strength.evidence}`} className="border-l-4 border-emerald-400 pl-3"><p className="text-sm font-black">{strength.title}</p><p className="mt-1 text-xs leading-relaxed text-slate-300">{strength.evidence}</p></div>)}
                    </div>
                  </div>
                </section>

                <section className="border-2 border-slate-900 bg-white p-5 sm:p-6">
                  <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Bewijs per vacature-eis</p><h3 className="mt-2 text-2xl font-black">Eisen, bewijs en eerlijk vervolgpunt</h3></div><span className="text-xs font-bold text-slate-500">{activeResult.requirements.length} eisen gecontroleerd</span></div>
                  <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter bewijsstatus">
                    {(["all", "strong", "partial", "missing"] as const).map((filter) => <button key={filter} type="button" onClick={() => setEvidenceFilter(filter)} className={`border-2 px-3 py-2 text-xs font-black ${evidenceFilter === filter ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}>{filter === "all" ? "Alle" : filter === "strong" ? "Sterk" : filter === "partial" ? "Gedeeltelijk" : "Ontbreekt"}</button>)}
                  </div>
                   <div className="mt-4 space-y-3 md:hidden">{filteredRequirements.map((requirement) => {
                      const requirementIndex = activeResult.requirements.indexOf(requirement);
                      const reference = requirement.evidenceReference;
                      const vacancyReference = requirement.vacancyReference;
                      return <article key={`${requirement.requirement}-${requirement.vacancyEvidence}`} className="border-2 border-slate-200 bg-slate-50 p-4">
                        <div className="flex flex-wrap items-start justify-between gap-2"><p className="font-black">{requirement.requirement}</p><span className={`inline-flex border px-2 py-1 text-xs font-black ${getStatusTone(requirement.status)}`}>{getStatusText(requirement.status)}</span></div>
                        <p className="mt-2 text-xs leading-relaxed text-slate-500">Vacaturebron: {vacancyReference?.snippet ? `“${vacancyReference.snippet}” · Regel ${vacancyReference.sourceLine} · ${vacancyReference.sourceSection}` : "Geen exact bronfragment gevonden; controleer de originele vacature."}</p>
                       <p className="mt-3 text-xs leading-relaxed text-slate-700"><span className="font-black">CV-bewijs:</span> {requirement.cvEvidence || "Geen concreet bewijs gevonden."}</p>
                       <div className="mt-3 border-l-4 border-emerald-400 bg-white p-3 text-xs leading-relaxed text-slate-700"><p className="font-black">Bronverwijzing</p><p className="mt-1">{reference?.sourcePage ? `PDF-pagina ${reference.sourcePage}` : `Regel ${reference?.sourceLine || "—"}`} · {reference?.sourceSection || "Niet gevonden"}</p><p className="mt-1 italic">{reference?.snippet ? `“${reference.snippet}”` : "Geen exact bronfragment gevonden."}</p></div>
                       <p className="mt-2 text-xs leading-relaxed text-slate-700"><span className="font-black">Eerlijke actie:</span> {requirement.honestAction}</p>
                        <label className="mt-3 block text-xs font-black text-slate-600">Reviewstatus<select className={`${inputClassName} mt-1`} value={reference?.reviewerStatus || "unreviewed"} onChange={(event) => updateEvidenceReview(requirementIndex, event.target.value as "unreviewed" | "confirmed" | "corrected" | "rejected", reference?.reviewerNote || "")} disabled={activeIsApproved}><option value="unreviewed">Nog te beoordelen</option><option value="confirmed">Bevestigd</option><option value="corrected">Gecorrigeerd</option><option value="rejected">Afgewezen</option></select></label>
                        {reference?.reviewerStatus === "corrected" ? <div className="mt-3 space-y-3"><label className="block text-xs font-black text-slate-600">Gecorrigeerd bewijs<textarea className={`${inputClassName} mt-1 min-h-20`} value={reference.reviewedEvidence} onChange={(event) => updateEvidenceDetail(requirementIndex, "reviewedEvidence", event.target.value)} maxLength={600} disabled={activeIsApproved} /></label><label className="block text-xs font-black text-slate-600">Exact bronfragment<textarea className={`${inputClassName} mt-1 min-h-20`} value={reference.reviewedSource?.snippet || ""} onChange={(event) => updateEvidenceDetail(requirementIndex, "sourceSnippet", event.target.value)} maxLength={500} disabled={activeIsApproved} /></label><label className="block text-xs font-black text-slate-600">Waarom gecorrigeerd?<textarea className={`${inputClassName} mt-1 min-h-20`} value={reference.reviewerNote} onChange={(event) => updateEvidenceDetail(requirementIndex, "reviewerNote", event.target.value)} maxLength={400} disabled={activeIsApproved} /></label></div> : null}
                     </article>;
                   })}</div>
                   <div className="mt-4 hidden overflow-x-auto md:block"><table className="w-full min-w-[1,140px] border-collapse text-left text-sm"><thead><tr className="border-b-2 border-slate-900 text-xs uppercase tracking-[0.1em] text-slate-500"><th className="px-3 py-3">Vacature-eis</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">CV-bewijs</th><th className="px-3 py-3">Bronverwijzing</th><th className="px-3 py-3">Review</th><th className="px-3 py-3">Eerlijke actie</th></tr></thead><tbody>{filteredRequirements.map((requirement) => {
                      const requirementIndex = activeResult.requirements.indexOf(requirement);
                      const reference = requirement.evidenceReference;
                      const vacancyReference = requirement.vacancyReference;
                       return <tr key={`${requirement.requirement}-${requirement.vacancyEvidence}`} className="border-b border-slate-100 align-top"><td className="px-3 py-4"><p className="font-black">{requirement.requirement}</p><p className="mt-1 text-xs leading-relaxed text-slate-500">{vacancyReference?.snippet ? `“${vacancyReference.snippet}” · Regel ${vacancyReference.sourceLine} · ${vacancyReference.sourceSection}` : "Geen exact bronfragment gevonden; controleer de originele vacature."}</p></td><td className="px-3 py-4"><span className={`inline-flex border px-2 py-1 text-xs font-black ${getStatusTone(requirement.status)}`}>{getStatusText(requirement.status)}</span></td><td className="px-3 py-4 text-xs leading-relaxed text-slate-700">{requirement.cvEvidence || "Geen concreet bewijs gevonden."}</td><td className="px-3 py-4 text-xs leading-relaxed text-slate-700"><p>{reference?.sourcePage ? `PDF-pagina ${reference.sourcePage}` : `Regel ${reference?.sourceLine || "—"}`}</p><p className="mt-1 text-[11px] italic">{reference?.snippet || "Geen exact bronfragment gevonden."}</p>{reference?.reviewerStatus === "corrected" ? <><textarea aria-label="Gecorrigeerd bewijs" className={`${inputClassName} mt-2 min-h-20`} value={reference.reviewedEvidence} onChange={(event) => updateEvidenceDetail(requirementIndex, "reviewedEvidence", event.target.value)} maxLength={600} disabled={activeIsApproved} /><textarea aria-label="Exact bronfragment" className={`${inputClassName} mt-2 min-h-20`} value={reference.reviewedSource?.snippet || ""} onChange={(event) => updateEvidenceDetail(requirementIndex, "sourceSnippet", event.target.value)} maxLength={500} disabled={activeIsApproved} /></> : null}</td><td className="px-3 py-4"><select className="border-2 border-slate-300 bg-white px-2 py-2 text-xs font-bold" value={reference?.reviewerStatus || "unreviewed"} onChange={(event) => updateEvidenceReview(requirementIndex, event.target.value as "unreviewed" | "confirmed" | "corrected" | "rejected", reference?.reviewerNote || "")} disabled={activeIsApproved}><option value="unreviewed">Nog te beoordelen</option><option value="confirmed">Bevestigd</option><option value="corrected">Gecorrigeerd</option><option value="rejected">Afgewezen</option></select><p className="mt-1 text-[11px] font-bold text-slate-500">{reviewerStatusLabel(reference?.reviewerStatus || "unreviewed")}</p>{reference?.reviewerStatus === "corrected" ? <textarea aria-label="Reden voor correctie" className={`${inputClassName} mt-2 min-h-20`} value={reference.reviewerNote} onChange={(event) => updateEvidenceDetail(requirementIndex, "reviewerNote", event.target.value)} maxLength={400} disabled={activeIsApproved} /> : null}</td><td className="px-3 py-4 text-xs leading-relaxed text-slate-700">{requirement.honestAction}</td></tr>;
                   })}</tbody></table></div>
                  {filteredRequirements.length === 0 ? <p className="mt-4 border-2 border-dashed border-slate-300 p-4 text-sm font-semibold text-slate-600">Geen eisen met deze status.</p> : null}
                </section>

                <section className="grid gap-5 lg:grid-cols-2">
                  <div className="border-2 border-amber-400 bg-amber-50 p-5"><p className="text-xs font-black uppercase tracking-[0.16em] text-amber-800">Top verbeterpunten</p><div className="mt-4 space-y-4">{activeResult.topFixes.map((fix) => <div key={`${fix.title}-${fix.action}`}><p className="text-sm font-black text-amber-950">{fix.title}</p><p className="mt-1 text-xs leading-relaxed text-amber-900">{fix.evidence} {fix.action}</p></div>)}</div></div>
                  <div className="border-2 border-slate-200 bg-slate-50 p-5"><p className="text-xs font-black uppercase tracking-[0.16em] text-slate-600">Niet verbergen</p><p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">Ontbrekende termen: {activeResult.missingKeywords.length ? activeResult.missingKeywords.join(", ") : "geen duidelijke ontbrekende termen gevonden"}.</p><p className="mt-4 text-xs font-semibold leading-relaxed text-slate-500">{activeResult.limitations[0]}</p></div>
                </section>

                {claimVerifierEnabled ? <section className="border-2 border-slate-900 bg-emerald-50 p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div><p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-800">Pre-send claimcontrole</p><h3 className="mt-1 text-xl font-black">Controleer iedere klantclaim tegen het originele CV</h3><p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-700">Geen matchscore of selectieadvies. Vacaturetekst is context, nooit bewijs over de kandidaat.</p></div>
                    {!activeIsApproved ? <button type="button" onClick={() => void runClaimVerification()} disabled={isDirty || isBusy} className="border-2 border-slate-900 bg-white px-4 py-3 text-sm font-black disabled:opacity-50">{activePack.claimVerificationData ? "Claims opnieuw controleren" : "Controleer klantclaims"}</button> : null}
                  </div>
                  {activePack.claimVerificationData ? <div className="mt-5 space-y-3">{activePack.claimVerificationData.claims.map((claim) => <article key={claim.id} className="border-2 border-slate-200 bg-white p-4"><div className="flex flex-wrap items-start justify-between gap-2"><p className="max-w-2xl font-black">“{claim.claim}”</p><span className={`border px-2 py-1 text-xs font-black ${claim.verdict === "supported" ? "border-emerald-300 bg-emerald-50 text-emerald-800" : claim.verdict === "unsupported" || claim.verdict === "contradicted" ? "border-rose-300 bg-rose-50 text-rose-800" : "border-amber-300 bg-amber-50 text-amber-900"}`}>{claim.verdict.replaceAll("_", " ")}</span></div><p className="mt-2 text-sm leading-6 text-slate-700">{claim.explanation}</p>{claim.evidence.map((evidence) => <blockquote key={`${evidence.start}-${evidence.end}`} className="mt-3 border-l-4 border-emerald-400 bg-slate-50 p-3 text-sm"><p>“{evidence.snippet}”</p><footer className="mt-1 text-xs font-bold text-slate-500">{evidence.sourceSection} · regel {evidence.sourceLine}{evidence.sourcePage ? ` · pagina ${evidence.sourcePage}` : ""}</footer></blockquote>)}{!activeIsApproved && (claim.verdict === "unsupported" || claim.verdict === "contradicted") ? <div className="mt-3 flex flex-wrap gap-2"><button type="button" disabled={isBusy} onClick={() => void reviewClaim(claim.id, "corrected")} className="border border-slate-900 px-3 py-2 text-xs font-black">Tekst is gecorrigeerd</button><button type="button" disabled={isBusy} onClick={() => void reviewClaim(claim.id, "removed")} className="border border-slate-900 px-3 py-2 text-xs font-black">Claim is verwijderd</button></div> : !activeIsApproved && (claim.verdict === "partially_supported" || claim.verdict === "not_checkable") ? <div className="mt-3 flex flex-wrap gap-2"><button type="button" disabled={isBusy} onClick={() => void reviewClaim(claim.id, "accepted")} className="border border-slate-900 px-3 py-2 text-xs font-black">Bewust behouden</button><button type="button" disabled={isBusy} onClick={() => void reviewClaim(claim.id, "removed")} className="border border-slate-900 px-3 py-2 text-xs font-black">Verwijderd</button></div> : null}<p className="mt-2 text-xs font-bold text-slate-500">Reviewerstatus: {claim.reviewer.status}</p></article>)}</div> : <p className="mt-5 border-2 border-dashed border-emerald-300 bg-white p-4 text-sm font-semibold text-slate-700">Voer de claimcontrole uit nadat de klanttekst is opgeslagen. Goedkeuring blijft geblokkeerd totdat alle vereiste revieweracties zijn afgehandeld.</p>}
                </section> : null}
                </> : null}

                {reviewStep === "source" ? <section className="border-2 border-slate-900 bg-white p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Gecontroleerde brondata</p>
                      <h3 className="mt-2 text-2xl font-black">Corrigeer de informatie vóór goedkeuring</h3>
                      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">Deze gecontroleerde bron voedt beide uitvoerversies. Corrigeer alleen extractiefouten en voeg geen onbevestigde claims toe.</p>
                    </div>
                    {isDirty ? <span className="border-2 border-amber-300 bg-amber-50 px-3 py-2 text-xs font-black text-amber-900">Niet-opgeslagen wijzigingen</span> : <span className="border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-800">Brondata gesynchroniseerd</span>}
                   </div>

                   <div className="mt-5 grid gap-4 lg:grid-cols-2">
                     <div className="border-2 border-slate-900 bg-slate-50 p-4">
                       <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-600">Bron → uitvoer</p>
                       <p className="mt-2 text-sm font-bold text-slate-800">De goedgekeurde output gebruikt de gecorrigeerde brondata. Controleer hieronder wat sinds de eerste extractie is gewijzigd.</p>
                       {activePack.sourceTextDigest ? <p className="mt-2 break-all text-[11px] font-semibold text-slate-500">Bronfingerprint: {activePack.sourceTextDigest.slice(0, 16)}…</p> : null}
                       {visibleSourceChanges.length ? <ul className="mt-3 space-y-2 text-xs leading-relaxed">{visibleSourceChanges.map((change) => <li key={change.label} className="border-l-4 border-amber-400 bg-white p-2"><span className="font-black">{change.label}</span><br /><span className="text-rose-800">Bron: {change.before}</span><br /><span className="text-emerald-800">Uitvoer: {change.after}</span></li>)}</ul> : <p className="mt-3 text-xs font-semibold text-slate-500">Nog geen inhoudelijke correcties sinds de eerste extractie.</p>}
                       <p className="mt-3 text-[11px] font-semibold text-slate-500">Contactvrije uitvoer verwijdert daarnaast de directe velden die in de waarschuwing staan; controleer indirecte herkenbaarheid zelf.</p>
                     </div>
                     <div className="border-2 border-slate-200 bg-white p-4">
                       <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-600">Versiegeschiedenis</p>
                       <div className="mt-3 space-y-2">{activePack.revisions?.length ? activePack.revisions.slice(0, 8).map((revision) => <div key={revision.id} className="flex items-start justify-between gap-3 border-b border-slate-100 pb-2 text-xs"><div><p className="font-black">v{revision.version} · {revision.reason === "analysis_created" ? "Analyse aangemaakt" : "Concept opgeslagen"}</p><p className="mt-1 text-slate-500">{revision.changedFields.join(", ")}</p></div><time className="shrink-0 font-semibold text-slate-500">{formatDate(revision.createdAt)}</time></div>) : <p className="text-xs font-semibold text-slate-500">Nog geen versies opgeslagen.</p>}</div>
                     </div>
                   </div>

                   <details className="mt-5 border-2 border-slate-200 bg-slate-50 p-4" open={!activeIsApproved}>
                    <summary className="cursor-pointer font-black">Persoons- en profielgegevens</summary>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {([
                        ["name", "Naam"],
                        ["title", "Professionele titel"],
                        ["email", "E-mail"],
                        ["phone", "Telefoon"],
                        ["location", "Woonplaats"],
                      ] as const).map(([field, label]) => <label key={field} className="text-xs font-black uppercase tracking-[0.1em] text-slate-500">{label}<input className={`${inputClassName} mt-2 normal-case tracking-normal`} value={activePack.candidateData.personal[field]} onChange={(event) => updateCandidatePersonal(field, event.target.value)} disabled={activeIsApproved} maxLength={240} /></label>)}
                    </div>
                    <label className="mt-4 block text-xs font-black uppercase tracking-[0.1em] text-slate-500">Profielsamenvatting<textarea className={`${inputClassName} mt-2 min-h-36 normal-case tracking-normal`} value={activePack.candidateData.personal.summary} onChange={(event) => updateCandidatePersonal("summary", event.target.value)} disabled={activeIsApproved} maxLength={4_000} /></label>
                    <label className="mt-4 block text-xs font-black uppercase tracking-[0.1em] text-slate-500">Vaardigheden, kommagescheiden<input className={`${inputClassName} mt-2 normal-case tracking-normal`} value={activePack.candidateData.skills.map((skill) => skill.name).join(", ")} onChange={(event) => updateSkills(event.target.value)} disabled={activeIsApproved} maxLength={1_500} /></label>
                  </details>

                  <details className="mt-3 border-2 border-slate-200 bg-slate-50 p-4">
                    <summary className="cursor-pointer font-black">Werkervaring ({activePack.candidateData.experience.length})</summary>
                    <div className="mt-4 space-y-5">
                      {activePack.candidateData.experience.map((experience, index) => <div key={`${experience.company}-${experience.role}-${index}`} className="border-l-4 border-emerald-400 bg-white p-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <label className="text-xs font-black text-slate-500">Functie<input className={`${inputClassName} mt-1`} value={experience.role} onChange={(event) => updateExperience(index, "role", event.target.value)} disabled={activeIsApproved} maxLength={240} /></label>
                          <label className="text-xs font-black text-slate-500">Organisatie<input className={`${inputClassName} mt-1`} value={experience.company} onChange={(event) => updateExperience(index, "company", event.target.value)} disabled={activeIsApproved} maxLength={240} /></label>
                          <label className="text-xs font-black text-slate-500">Start<input className={`${inputClassName} mt-1`} value={experience.start} onChange={(event) => updateExperience(index, "start", event.target.value)} disabled={activeIsApproved} maxLength={80} /></label>
                          <label className="text-xs font-black text-slate-500">Einde<input className={`${inputClassName} mt-1`} value={experience.end} onChange={(event) => updateExperience(index, "end", event.target.value)} disabled={activeIsApproved} maxLength={80} /></label>
                        </div>
                        <label className="mt-3 block text-xs font-black text-slate-500">Beschrijving<textarea className={`${inputClassName} mt-1 min-h-24`} value={experience.description} onChange={(event) => updateExperience(index, "description", event.target.value)} disabled={activeIsApproved} maxLength={3_000} /></label>
                        <label className="mt-3 block text-xs font-black text-slate-500">Resultaten en taken, één per regel<textarea className={`${inputClassName} mt-1 min-h-28`} value={experience.highlights.join("\n")} onChange={(event) => updateExperience(index, "highlights", event.target.value.split("\n").map((item) => item.trim()).filter(Boolean))} disabled={activeIsApproved} maxLength={5_000} /></label>
                      </div>)}
                    </div>
                  </details>

                  <details className="mt-3 border-2 border-slate-200 bg-slate-50 p-4">
                    <summary className="cursor-pointer font-black">Opleidingen ({activePack.candidateData.education.length})</summary>
                    <div className="mt-4 space-y-4">
                      {activePack.candidateData.education.map((education, index) => <div key={`${education.school}-${education.degree}-${index}`} className="grid gap-3 border-l-4 border-sky-400 bg-white p-4 sm:grid-cols-2">
                        <label className="text-xs font-black text-slate-500">Opleiding<input className={`${inputClassName} mt-1`} value={education.degree} onChange={(event) => updateEducation(index, "degree", event.target.value)} disabled={activeIsApproved} /></label>
                        <label className="text-xs font-black text-slate-500">Onderwijsinstelling<input className={`${inputClassName} mt-1`} value={education.school} onChange={(event) => updateEducation(index, "school", event.target.value)} disabled={activeIsApproved} /></label>
                        <label className="text-xs font-black text-slate-500">Start<input className={`${inputClassName} mt-1`} value={education.start} onChange={(event) => updateEducation(index, "start", event.target.value)} disabled={activeIsApproved} /></label>
                        <label className="text-xs font-black text-slate-500">Einde<input className={`${inputClassName} mt-1`} value={education.end} onChange={(event) => updateEducation(index, "end", event.target.value)} disabled={activeIsApproved} /></label>
                      </div>)}
                    </div>
                  </details>
                </section> : null}

                {reviewStep === "candidate_facts" ? <section className="border-2 border-slate-900 bg-emerald-50 p-5 sm:p-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-800">Kandidaatfeiten</p>
                  <h3 className="mt-2 text-2xl font-black">Controleer actuele en veranderlijke informatie</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-700">Beschikbaarheid, opzegtermijn, salaris, uren, locatie en voorkeuren zijn geen vast CV-bewijs. Laat onbekende gegevens leeg en leg kandidaatbevestiging afzonderlijk vast.</p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {([
                      ["availability", "Beschikbaarheid"],
                      ["noticePeriod", "Opzegtermijn"],
                      ["salaryIndication", "Salaris- of tariefindicatie"],
                      ["hoursPerWeek", "Uren per week"],
                      ["workLocation", "Werklocatie"],
                    ] as const).map(([field, label]) => <label key={field} className="text-xs font-black text-slate-600">{label}<input className={`${inputClassName} mt-2`} value={activePack.submissionData.commercial[field]} onChange={(event) => updateCommercial(field, event.target.value)} disabled={activeIsApproved} maxLength={240} placeholder="Leeg laten als onbekend" /></label>)}
                  </div>
                  <label className="mt-4 block text-xs font-black text-slate-600">Wensen van de kandidaat<textarea className={`${inputClassName} mt-2 min-h-24`} value={activePack.submissionData.commercial.candidatePreferences} onChange={(event) => updateCommercial("candidatePreferences", event.target.value)} disabled={activeIsApproved} maxLength={800} placeholder="Alleen bevestigde voorkeuren" /></label>
                  {!activeIsApproved ? <button type="button" onClick={() => void saveDraft()} disabled={!isDirty || isBusy} className="mt-5 border-2 border-slate-900 bg-emerald-400 px-5 py-3 text-sm font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] disabled:cursor-not-allowed disabled:opacity-50">{isBusy ? "Opslaan…" : isDirty ? "Sla kandidaatfeiten op" : "Kandidaatfeiten opgeslagen"}</button> : null}

                  {candidateAcknowledgementEnabled && !activeIsApproved ? <div className="mt-6 border-2 border-slate-900 bg-white p-4 sm:p-5"><p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">Kandidaatbevestiging</p><h4 className="mt-1 text-xl font-black">Laat de kandidaat de exacte klantversie controleren</h4><p className="mt-2 text-sm leading-6 text-slate-600">De ontvangende organisatie moet bij naam bekend zijn. Bevestiging geldt alleen voor deze revisie en is geen identiteitstoets, toestemmingstekst of elektronische handtekening.</p>{latestCandidateReview ? <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm"><p className="font-black">Status: {latestCandidateReview.status.replaceAll("_", " ")}</p><p className="mt-1 break-words text-slate-600">{latestCandidateReview.candidateEmail} · {latestCandidateReview.recipientOrganization}</p>{latestCandidateReview.suggestions.length ? <div className="mt-3 space-y-2">{latestCandidateReview.suggestions.map((suggestion) => <div key={suggestion.id} className="border-l-4 border-amber-400 bg-white p-2"><strong>{suggestion.targetPath}</strong><br />{suggestion.proposedValue}<br /><span className="text-xs font-bold">Status: {suggestion.status}</span>{suggestion.status === "pending" ? <div className="mt-2 flex flex-wrap gap-2"><button type="button" onClick={() => void resolveCandidateSuggestion(suggestion.id, "accepted")} className="border border-slate-900 px-2 py-1 text-xs font-black">Accepteren</button><button type="button" onClick={() => void resolveCandidateSuggestion(suggestion.id, "rejected")} className="border border-slate-900 px-2 py-1 text-xs font-black">Afwijzen</button></div> : null}</div>)}</div> : null}</div> : null}<div className="mt-4 grid gap-3 sm:grid-cols-2"><label className="text-xs font-black text-slate-600">E-mail kandidaat<input type="email" className={`${inputClassName} mt-1`} value={candidateInvite.candidateEmail} onChange={(event) => setCandidateInvite({ ...candidateInvite, candidateEmail: event.target.value })} /></label><label className="text-xs font-black text-slate-600">Ontvangende organisatie<input className={`${inputClassName} mt-1`} value={candidateInvite.recipientOrganization} onChange={(event) => setCandidateInvite({ ...candidateInvite, recipientOrganization: event.target.value })} /></label><label className="text-xs font-black text-slate-600 sm:col-span-2">Vacature<input className={`${inputClassName} mt-1`} value={candidateInvite.vacancyTitle || activePack.vacancyTitle || ""} onChange={(event) => setCandidateInvite({ ...candidateInvite, vacancyTitle: event.target.value })} /></label></div><button type="button" onClick={() => void inviteCandidate()} disabled={isBusy || isDirty || !claimsReadyForCandidate || !candidateInvite.candidateEmail || !candidateInvite.recipientOrganization} className="mt-4 border-2 border-slate-900 bg-emerald-400 px-4 py-3 text-sm font-black disabled:opacity-50">{latestCandidateReview ? "Nieuwe beveiligde uitnodiging sturen" : "Kandidaat uitnodigen"}</button>{canApprove && latestCandidateReview && !candidateReady && latestCandidateReview.candidateResponse !== "declined" && latestCandidateReview.candidateResponse !== "corrections_requested" ? <div className="mt-5 border-t border-slate-200 pt-4"><label className="text-xs font-black text-slate-600">Override bij niet-beschikbare of onbeantwoorde uitnodiging<textarea className={`${inputClassName} mt-2 min-h-20`} minLength={20} maxLength={500} value={overrideReason} onChange={(event) => setOverrideReason(event.target.value)} /></label><button type="button" disabled={overrideReason.trim().length < 20 || isBusy} onClick={() => void recordOverride()} className="mt-3 border-2 border-slate-900 bg-white px-4 py-3 text-sm font-black disabled:opacity-50">Override vastleggen</button></div> : null}</div> : null}
                </section> : null}

                {reviewStep === "client_copy" ? <section className="border-2 border-slate-900 bg-emerald-50 p-5 sm:p-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-800">Klantvoorstel</p>
                  <h3 className="mt-2 text-2xl font-black">Maak de introductie en begeleidende e-mail af</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-700">WerkCV maakt een concept op basis van de gecontroleerde bron en kandidaatfeiten. Controleer elke klantgerichte formulering voordat je verdergaat.</p>

                  <label className="mt-5 block text-xs font-black uppercase tracking-[0.1em] text-slate-600">Introductie op het voorblad<textarea className={`${inputClassName} mt-2 min-h-36 normal-case tracking-normal`} value={activePack.submissionData.clientIntroduction} onChange={(event) => updateSubmission("clientIntroduction", event.target.value)} disabled={activeIsApproved} maxLength={2_800} /></label>

                  <label className="mt-4 block text-xs font-black text-slate-600">Interne recruiternotities — niet opgenomen in het klantpakket<textarea className={`${inputClassName} mt-2 min-h-24`} value={activePack.submissionData.recruiterNotes} onChange={(event) => updateSubmission("recruiterNotes", event.target.value)} disabled={activeIsApproved} maxLength={4_000} /></label>

                  <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
                    <label className="text-xs font-black text-slate-600">E-mailonderwerp<input className={`${inputClassName} mt-2`} value={activePack.submissionData.clientEmailSubject} onChange={(event) => updateSubmission("clientEmailSubject", event.target.value)} disabled={activeIsApproved} maxLength={180} /></label>
                    <label className="text-xs font-black text-slate-600">Begeleidende e-mail<textarea className={`${inputClassName} mt-2 min-h-44`} value={activePack.submissionData.clientEmailBody} onChange={(event) => updateSubmission("clientEmailBody", event.target.value)} disabled={activeIsApproved} maxLength={4_000} /></label>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-4 border-t-2 border-emerald-200 pt-5">
                    <p className="max-w-xl text-xs font-semibold leading-relaxed text-slate-600">Kies in de volgende stap welke versie je met de opdrachtgever wilt delen.</p>
                    <button type="button" onClick={() => void copyClientEmail()} disabled={isDirty} className="ml-auto border-2 border-slate-900 bg-white px-4 py-2 text-xs font-black disabled:cursor-not-allowed disabled:opacity-50">Kopieer e-mail</button>
                  </div>

                  {!activeIsApproved ? <button type="button" onClick={() => void saveDraft()} disabled={!isDirty || isBusy} className="mt-5 border-2 border-slate-900 bg-emerald-400 px-5 py-3 text-sm font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] disabled:cursor-not-allowed disabled:opacity-50">{isBusy ? "Opslaan…" : isDirty ? "Sla gecontroleerd concept op" : "Concept opgeslagen"}</button> : null}
                </section> : null}

                {reviewStep === "output" ? <section className="border-2 border-slate-900 bg-white p-5 sm:p-6">
                  <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Uitvoer kiezen</p><h3 className="mt-2 text-2xl font-black">Welke versie deel je met de opdrachtgever?</h3></div><p className="text-xs font-semibold text-slate-500">Eén gecontroleerde bron, één bewuste keuze</p></div>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">De volledige versie bevat kandidaatcontactgegevens. De optionele tweede versie verwijdert directe contactgegevens, maar is geen juridische garantie dat de kandidaat niet herkenbaar is.</p>
                  <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Klantversie kiezen">
                    <button type="button" role="tab" aria-selected={previewVariant === "full"} onClick={() => chooseOutputVariant("full")} className={`border-2 px-4 py-3 text-left text-sm font-black ${previewVariant === "full" ? "border-slate-900 bg-emerald-400" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}><span className="block">Volledig voorstel</span><span className="mt-1 block text-xs font-semibold">Met kandidaatcontactgegevens</span></button>
                    <button type="button" role="tab" aria-selected={previewVariant === "anonymized"} onClick={() => chooseOutputVariant("anonymized")} className={`border-2 px-4 py-3 text-left text-sm font-black ${previewVariant === "anonymized" ? "border-slate-900 bg-emerald-400" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}><span className="block">Zonder directe contactgegevens</span><span className="mt-1 block text-xs font-semibold">Controleer resterende herkenbaarheid</span></button>
                  </div>
                  <div className="mt-5 border-2 border-slate-200 bg-slate-50 p-3 sm:p-4">
                    {previewVariant === "full" ? <><div className="flex items-center justify-between gap-3"><p className="text-sm font-black">Volledig kandidaatvoorstel</p><span className="text-xs font-bold text-slate-500">{fullPageCount} pagina&apos;s</span></div><div className="mt-3 max-h-[760px] overflow-auto bg-slate-200 p-3"><ScaledCvPreview data={activePack.candidateData} templateId={activePack.templateId} colorThemeId={activePack.colorThemeId} scale={0.43} pageCount={fullPageCount} paginated onPageCountChange={setFullPageCount} /></div></> : <><div className="flex items-center justify-between gap-3"><p className="text-sm font-black">Concept zonder directe contactgegevens</p><span className="text-xs font-bold text-slate-500">{anonymizedPageCount} pagina&apos;s</span></div><div className="mt-3 max-h-[760px] overflow-auto bg-slate-200 p-3"><ScaledCvPreview data={activePack.anonymizedData} templateId={activePack.templateId} colorThemeId={activePack.colorThemeId} scale={0.43} pageCount={anonymizedPageCount} paginated onPageCountChange={setAnonymizedPageCount} /></div><p className="mt-3 border-2 border-amber-300 bg-amber-50 p-3 text-xs font-semibold leading-relaxed text-amber-950">{activePack.locale === "en" ? "Direct contact details removed. Review company names, schools and project details before sharing with a client." : "Directe contactgegevens verwijderd. Controleer bedrijfsnamen, scholen en projectdetails voordat je dit met een klant deelt."}</p></>}
                  </div>
                  <p className="mt-4 text-xs font-black text-slate-600">Deze versie is geselecteerd voor goedkeuring. Sla de wijziging op voordat je naar de laatste stap gaat.</p>
                  {!activeIsApproved ? <button type="button" onClick={() => void saveDraft()} disabled={!isDirty || isBusy} className="mt-5 border-2 border-slate-900 bg-emerald-400 px-5 py-3 text-sm font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] disabled:cursor-not-allowed disabled:opacity-50">{isBusy ? "Opslaan…" : isDirty ? "Sla gekozen uitvoer op" : "Uitvoer opgeslagen"}</button> : null}
                </section> : null}

                {reviewStep === "approval" ? <section className="border-2 border-slate-900 bg-yellow-50 p-5 sm:p-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-700">Approval checklist</p>
                  <h3 className="mt-2 text-2xl font-black">Jij blijft de eindredacteur</h3>
                  <div className="mt-4 space-y-3 text-sm font-semibold text-slate-800">
                    {["Ik heb de vacature-eisen, het CV-bewijs en alle correcties gecontroleerd.", "Ik heb de introductie, commerciële gegevens en begeleidende e-mail gecontroleerd.", `Ik heb de gekozen uitvoerversie (${activePack.submissionData.selectedVariant === "full" ? "volledig voorstel" : "zonder directe contactgegevens"}) gecontroleerd.`, "Ik bevestig dat mijn bureau bevoegd is om deze kandidaatdata voor deze vacature te verwerken en te delen."] .map((label, index) => <label key={label} className="flex items-start gap-3"><input type="checkbox" className="mt-0.5 h-5 w-5 accent-emerald-600" checked={checkedItems[index] || false} onChange={(event) => setCheckedItems((current) => current.map((value, itemIndex) => itemIndex === index ? event.target.checked : value))} disabled={activeIsApproved || isDirty} /><span>{label}</span></label>)}
                  </div>
                  {!evidenceReviewReady && !activeIsApproved ? <p className="mt-4 border-2 border-amber-300 bg-white p-3 text-xs font-bold text-amber-900">Beoordeel eerst elke vacature-eis als bevestigd, gecorrigeerd of afgewezen. Niet-beoordeelde regels kunnen niet worden goedgekeurd.</p> : null}
                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t-2 border-yellow-200 pt-5">
                    {!activeIsApproved ? <button type="button" onClick={() => void approvePack()} disabled={!reviewReady || isBusy || !hasQuota || isDirty} className="border-2 border-slate-900 bg-emerald-400 px-5 py-3 text-sm font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] disabled:cursor-not-allowed disabled:opacity-50">{isBusy ? "Goedkeuren…" : isDirty ? "Sla wijzigingen eerst op" : hasQuota ? "Goedkeuren en 1 voorstel-slot gebruiken" : "Maandlimiet bereikt"}</button> : <><a href={`/api/agency/matchpack/${encodeURIComponent(activePack.id)}/pdf?variant=${activePack.submissionData.selectedVariant === "full" ? "full" : "anonymized"}`} onClick={() => track("matchpack_pdf_downloaded", { variant: activePack.submissionData.selectedVariant })} className="border-2 border-slate-900 bg-emerald-400 px-4 py-3 text-sm font-black">Gekozen PDF downloaden</a><a href={`/api/agency/matchpack/${encodeURIComponent(activePack.id)}/docx?variant=${activePack.submissionData.selectedVariant === "full" ? "full" : "anonymized"}`} onClick={() => track("matchpack_docx_downloaded", { variant: activePack.submissionData.selectedVariant })} className="border-2 border-slate-900 bg-yellow-300 px-4 py-3 text-sm font-black">Gekozen DOCX downloaden</a><a href={`/api/agency/matchpack/${encodeURIComponent(activePack.id)}/pdf?variant=${activePack.submissionData.selectedVariant === "full" ? "anonymized" : "full"}`} onClick={() => track("matchpack_pdf_downloaded", { variant: activePack.submissionData.selectedVariant === "full" ? "anonymized" : "full" })} className="border-2 border-slate-300 bg-white px-4 py-3 text-sm font-black">Andere PDF downloaden</a>{activePack.cvDocumentId && canOpenCv ? <Link href={`/editor?id=${encodeURIComponent(activePack.cvDocumentId)}`} className="border-2 border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-700">Goedgekeurd CV openen</Link> : null}</>}
                    {!activeIsApproved && canDeleteDraft ? <button type="button" onClick={() => setShowDeleteConfirmation(true)} disabled={isBusy} className="border-2 border-rose-200 bg-white px-4 py-3 text-sm font-black text-rose-700 disabled:opacity-50">Verwijder concept</button> : null}
                    {activeIsApproved && canDeleteApproved ? <button type="button" onClick={() => setShowDeleteConfirmation(true)} disabled={isBusy} className="border-2 border-rose-200 bg-white px-4 py-3 text-sm font-black text-rose-700 disabled:opacity-50">Voorstel en gekoppeld CV verwijderen</button> : null}
                    <span className={`text-xs font-bold ${isExpiringSoon(activePack.retentionExpiresAt) ? "text-amber-800" : "text-emerald-800"}`}>{activeIsApproved ? `Goedgekeurd op ${formatDate(activePack.approvedAt)}` : "Concept"}{activePack.retentionExpiresAt ? ` · vervalt ${formatDate(activePack.retentionExpiresAt)}` : " · retentie nog niet geactiveerd"}{isExpiringSoon(activePack.retentionExpiresAt) ? " · verloopt binnen 14 dagen" : ""}</span>
                  </div>
                  {showDeleteConfirmation && ((activeIsApproved && canDeleteApproved) || (!activeIsApproved && canDeleteDraft)) ? <div className="mt-4 border-2 border-rose-500 bg-white p-4" role="region" aria-label="MatchPack verwijderen bevestigen"><p className="text-sm font-black text-rose-900">{activeIsApproved ? "Dit verwijdert het goedgekeurde voorstel en het gekoppelde CV. Het gebruikte slot blijft geteld." : "Dit verwijdert dit ongekeurde MatchPack-concept."}</p>{activeIsApproved ? <label className="mt-3 block text-xs font-black uppercase tracking-wide text-rose-800">Typ DELETE MATCHPACK<input className={`${inputClassName} mt-2`} value={deleteConfirmation} onChange={(event) => setDeleteConfirmation(event.target.value)} autoComplete="off" /></label> : null}<div className="mt-3 flex flex-wrap gap-2"><button type="button" disabled={isBusy || (activeIsApproved && deleteConfirmation !== "DELETE MATCHPACK")} onClick={() => void deletePack()} className="border-2 border-rose-700 bg-rose-100 px-4 py-2 text-sm font-black text-rose-900 disabled:opacity-50">Definitief verwijderen</button><button type="button" disabled={isBusy} onClick={() => { setShowDeleteConfirmation(false); setDeleteConfirmation(""); }} className="border-2 border-slate-300 bg-white px-4 py-2 text-sm font-black">Annuleren</button></div></div> : null}
                </section> : null}

                {activeIsApproved ? <section className="border-2 border-slate-900 bg-emerald-50 p-5 sm:p-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-800">Resultaat volgen</p>
                  <h3 className="mt-2 text-2xl font-black">Wat deed de opdrachtgever met dit voorstel?</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-700">Leg de uitkomst vast zodra je die weet. Deze gegevens blijven intern en helpen ons echte acceptatie, correcties en herhaalgebruik te meten.</p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-[220px_1fr]">
                    <label className="text-xs font-black text-slate-600">Klantstatus<select className={`${inputClassName} mt-2`} value={outcomeStatus} onChange={(event) => setOutcomeStatus(event.target.value as MatchPackOutcome["status"])}><option value="unknown">Nog onbekend</option><option value="pending">In behandeling</option><option value="accepted">Geaccepteerd</option><option value="rejected">Afgewezen</option><option value="withdrawn">Ingetrokken</option></select></label>
                    <label className="text-xs font-black text-slate-600">Verzendbaarheid<select className={`${inputClassName} mt-2`} value={feedbackSendability} onChange={(event) => setFeedbackSendability(event.target.value as typeof feedbackSendability)}><option value="sent">Verzonden zoals gemaakt</option><option value="corrected">Eerst gecorrigeerd</option><option value="not_usable">Niet bruikbaar</option><option value="not_sent">Niet verzonden</option></select></label>
                    <label className="text-xs font-black text-slate-600">Feedbackcategorie<select className={`${inputClassName} mt-2`} value={outcomeIssueCategory} onChange={(event) => setOutcomeIssueCategory(event.target.value as NonNullable<MatchPackOutcome["issueCategory"]>)}><option value="evidence">Bewijs</option><option value="parsing">Uitlezen</option><option value="editing">Bewerken</option><option value="pdf">PDF</option><option value="docx">DOCX</option><option value="privacy">Privacy</option><option value="other">Overig</option></select></label>
                    <label className="text-xs font-black text-slate-600 sm:col-span-2">Productfeedback (optioneel)<textarea className={`${inputClassName} mt-2 min-h-24`} value={outcomeNote} onChange={(event) => setOutcomeNote(event.target.value)} maxLength={500} placeholder="Bijv. bewijscontrole was duidelijk; DOCX had nog handmatige opmaak nodig." /><span className="mt-1 block text-[11px] font-semibold text-slate-500">Gebruik geen kandidaatnaam, CV-/vacaturetekst, contactgegevens of links.</span></label>
                  </div>
                  <button type="button" onClick={() => void saveOutcome()} disabled={isOutcomeBusy} className="mt-4 border-2 border-slate-900 bg-emerald-400 px-4 py-3 text-sm font-black disabled:opacity-50">{isOutcomeBusy ? "Opslaan…" : "Klantstatus opslaan"}</button>
                </section> : null}

                <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-slate-100 pt-5">
                  <button type="button" onClick={() => moveReviewStep(-1)} disabled={stagePresentation[0]?.id === reviewStep} className="border-2 border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-700 disabled:cursor-not-allowed disabled:opacity-40">← Vorige stap</button>
                  {stagePresentation[stagePresentation.length - 1]?.id !== reviewStep ? <button type="button" onClick={() => moveReviewStep(1)} className="border-2 border-slate-900 bg-emerald-400 px-5 py-3 text-sm font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">Volgende stap →</button> : <span className="text-xs font-semibold text-slate-500">Je kunt tussen de stappen teruggaan zolang je nog niet hebt goedgekeurd.</span>}
                </div>
              </>
            ) : <p className="border-2 border-rose-500 bg-rose-50 p-5 text-sm font-semibold text-rose-900">Deze MatchPack bevat geen geldige analyse.</p>}
          </div>
        )}
      </section>
    </div>
  );
}
