"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { CVData } from "@/lib/cv";
import { updateCV, updateCVTemplate, updateCVColorTheme, getCheckoutURL } from "../actions";
import {
    ExperienceSection,
    EducationSection,
    SkillsSection,
    LanguagesSection,
    InternshipsSection,
    InterestsSection,
    PropertiesSection,
    CoursesSection,
    AwardsSection,
    ReferencesSection,
    SideActivitiesSection,
    CustomSectionsSection
} from "./sections";
import TemplateSelector from "./TemplateSelector";
import ColorThemePicker from "./ColorThemePicker";
import CVUploader from "./CVUploader";
import WelcomeOnboarding from "./WelcomeOnboarding";
import CvScoreWidget from "./CvScoreWidget";
import KeywordScannerWidget from "./KeywordScannerWidget";
import PhotoUpload from "./PhotoUpload";
import { cvDownloadPrice } from "@/lib/site-content";
import {
    hasCompletionTracked,
    hasEditorStartedTracked,
    markCompletionTracked,
    markEditorStartedTracked,
    track,
    type CvUploadSource,
    type FullPreviewSource,
} from "@/lib/analytics";
import { UiLanguage } from "@/lib/ui-language";
import {
    getCompletionState,
    type CompletionState,
    type CompletionStep,
    type CompletionStepId,
} from "@/lib/cv-completion";
import { getTargetVacancySessionKey } from "@/lib/cover-letter-session";
import { PENDING_EXAMPLE_CV_STORAGE_KEY, type PendingExampleCV } from "@/lib/pending-example-cv";
import {
    isPendingCvMatch,
    PENDING_CV_MATCH_STORAGE_KEY,
    PENDING_CV_MATCH_TTL_MS,
} from "@/lib/pending-cv-match";
import type { CvVacatureMatchResult } from "@/lib/tools/cv-vacature-match";
import { suggestTargetRoleFromExperience } from "@/lib/cv-normalize";
import FullCvPreviewDialog from "./FullCvPreviewDialog";
import ScaledCvPreview, { A4_WIDTH_PX } from "./ScaledCvPreview";
import EditorFeedbackWidget from "./EditorFeedbackWidget";

interface EditorProps {
    initialData: CVData;
    id: string;
    initialTemplateId: string;
    initialColorThemeId: string;
    accountEmail: string;
    uiLanguage?: UiLanguage;
}

// Reusable input styles for cleaner, calmer form UI
const inputClass = "w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100";
const inputStyle = undefined;
const DESKTOP_PREVIEW_SCALE = 0.58;
const READY_TO_DOWNLOAD_TRACKED_PREFIX = 'werkcv_ready_to_download_tracked_';
const CHECKOUT_FLOW_VARIANT = 'direct' as const;

type AtsLanguageLock = 'auto' | 'nl' | 'en';
type DownloadSource = 'toolbar' | 'ready_panel' | 'post_completion_tools' | 'full_preview';
type TemplateSelectorSource = 'toolbar' | 'ready_state';
type MatchImportFeedback =
    | { status: 'idle' }
    | { status: 'importing' }
    | { status: 'success'; result: CvVacatureMatchResult }
    | { status: 'error'; message: string };
type OptionalSectionId =
    | 'internships'
    | 'courses'
    | 'awards'
    | 'interests'
    | 'properties'
    | 'references'
    | 'sideActivities'
    | 'customSections';

function getEditorSearchContext() {
    if (typeof window === 'undefined') return {};

    const params = new URLSearchParams(window.location.search);
    return {
        startSource: params.get('startSource') || undefined,
        requestedTemplate: params.get('template') || undefined,
    };
}

function getOptionalSectionOptions(uiLanguage: UiLanguage): Array<{ id: OptionalSectionId; label: string }> {
    if (uiLanguage === "en") {
        return [
            { id: "interests", label: "Interests" },
            { id: "properties", label: "Strengths" },
            { id: "courses", label: "Courses/Certificates" },
            { id: "internships", label: "Internships" },
            { id: "awards", label: "Achievements" },
            { id: "references", label: "References" },
            { id: "sideActivities", label: "Side Activities" },
            { id: "customSections", label: "Custom Section" },
        ];
    }

    return [
        { id: "interests", label: "Interesses" },
        { id: "properties", label: "Eigenschappen" },
        { id: "courses", label: "Cursussen/Certificaten" },
        { id: "internships", label: "Stages" },
        { id: "awards", label: "Prestaties" },
        { id: "references", label: "Referenties" },
        { id: "sideActivities", label: "Nevenactiviteiten" },
        { id: "customSections", label: "Eigen onderdeel" },
    ];
}

function hasItems(value: unknown): boolean {
    return Array.isArray(value) && value.length > 0;
}

function ensureEditorData(data: CVData, fallbackLanguage: UiLanguage = "nl"): CVData {
    return {
        ...data,
        personal: {
            ...data.personal,
            resumeLanguage: data.personal.resumeLanguage ?? fallbackLanguage,
        },
        references: data.references ?? [],
        sideActivities: data.sideActivities ?? [],
        customSections: data.customSections ?? [],
        properties: data.properties ?? [],
    };
}

function deriveVisibleOptionalSections(data: CVData): Record<OptionalSectionId, boolean> {
    return {
        internships: hasItems(data.internships),
        courses: hasItems(data.courses),
        awards: hasItems(data.awards),
        interests: hasItems(data.interests),
        properties: hasItems(data.properties),
        references: hasItems(data.references),
        sideActivities: hasItems(data.sideActivities),
        customSections: hasItems(data.customSections),
    };
}

function hasAdditionalPersonalDetails(data: CVData): boolean {
    const personal = data.personal;
    return [
        personal.photo,
        personal.address,
        personal.postalCode,
        personal.birthDate,
        personal.birthPlace,
        personal.nationality,
        personal.driversLicense,
        personal.gender,
        personal.maritalStatus,
        personal.linkedIn,
        personal.github,
        personal.website,
    ].some((value) => typeof value === "string" && value.trim().length > 0);
}

function CompletionPanel({
    state,
    onGoToStep,
    uiLanguage,
}: {
    state: CompletionState;
    onGoToStep: (step: CompletionStep) => void;
    uiLanguage: UiLanguage;
}) {
    const isEnglish = uiLanguage === "en";
    const tr = (dutch: string, english: string) => (isEnglish ? english : dutch);
    const progressColor = state.isComplete ? "bg-emerald-600" : state.isReady ? "bg-teal-500" : "bg-slate-900";

    return (
        <section className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">
                        {state.isComplete
                            ? tr("CV compleet", "CV complete")
                            : state.isReady
                                ? tr("Klaar om te downloaden", "Ready to download")
                                : tr("CV voortgang", "CV progress")}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                        {state.isComplete
                            ? tr("Klaar om te downloaden", "Ready to download")
                            : state.isReady && state.nextStep
                                ? tr(`Aanbevolen voor 100%: ${state.nextStep.label}`, `Recommended for 100%: ${state.nextStep.label}`)
                            : state.nextStep
                                ? tr(`Volgende: ${state.nextStep.label}`, `Next: ${state.nextStep.label}`)
                                : tr("Bijna klaar", "Almost done")}
                    </p>
                </div>
                <span className={`shrink-0 text-sm font-bold ${state.isComplete || state.isReady ? "text-emerald-700" : "text-slate-700"}`}>
                    {state.isComplete ? "✓ 100%" : state.isReady ? `✓ ${state.score}%` : `${state.score}%`}
                </span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                    className={`h-full rounded-full ${progressColor} transition-all duration-300`}
                    style={{ width: `${state.score}%` }}
                />
            </div>

            <div className="mt-3 grid grid-cols-5 gap-1">
                {state.steps.map((step) => (
                    <button
                        key={step.id}
                        type="button"
                        onClick={() => onGoToStep(step)}
                        className="group min-w-0 text-left"
                        title={step.hint}
                    >
                        <span className="flex items-center gap-1.5">
                            <span className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${step.complete ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 bg-white text-slate-400 group-hover:border-slate-500"}`}>
                                {step.complete ? "✓" : ""}
                            </span>
                            <span className={`hidden truncate text-[11px] font-medium sm:block ${step.complete ? "text-emerald-800" : "text-slate-500"}`}>
                                {step.label}
                            </span>
                        </span>
                    </button>
                ))}
            </div>
        </section>
    );
}

function getCheckoutFailureReason(error: unknown): string {
    if (error instanceof Error && error.message) {
        return error.message.slice(0, 160);
    }
    return "unknown";
}

export default function Editor({
    initialData,
    id,
    initialTemplateId,
    initialColorThemeId,
    accountEmail,
    uiLanguage = "nl",
}: EditorProps) {
    const isEnglish = uiLanguage === "en";
    const tr = (dutch: string, english: string) => (isEnglish ? english : dutch);
    const normalizedInitialData = ensureEditorData(initialData, uiLanguage);
    const optionalSectionOptions = getOptionalSectionOptions(uiLanguage);
    const genderOptions = [
        { value: "", label: tr("Selecteer...", "Select...") },
        { value: "Man", label: tr("Man", "Male") },
        { value: "Vrouw", label: tr("Vrouw", "Female") },
        { value: "Anders", label: tr("Anders", "Other") },
    ];
    const maritalStatusOptions = [
        { value: "", label: tr("Selecteer...", "Select...") },
        { value: "Ongehuwd", label: tr("Ongehuwd", "Single") },
        { value: "Gehuwd", label: tr("Gehuwd", "Married") },
        { value: "Samenwonend", label: tr("Samenwonend", "Cohabiting") },
        { value: "Gescheiden", label: tr("Gescheiden", "Divorced") },
    ];
    const supportNotifiedMessage = tr(
        "We hebben een technisch probleem aan onze kant gedetecteerd. Ons team is op de hoogte en bekijkt dit zo snel mogelijk. Als het nodig is, nemen we contact op via je e-mailadres.",
        "We hit a technical issue on our side. Our team has been notified and will review it shortly. If needed, we will contact you at your email address."
    );
    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { isSubmitting },
    } = useForm<CVData>({
        defaultValues: normalizedInitialData,
    });

    const data = watch();
    const isCurrentCvEmpty =
        !data.personal.name?.trim() &&
        !data.personal.email?.trim() &&
        !data.personal.summary?.trim() &&
        data.experience.length === 0 &&
        data.education.length === 0 &&
        data.skills.length === 0;
    const completionState = getCompletionState(data, uiLanguage);
    const completionScore = completionState.score;
    const isReadyToDownload = completionState.isReady;
    const remainingCoreSteps = completionState.steps.filter((step) => !step.complete).length;
    const toolbarCtaLabel = isReadyToDownload
        ? tr("CV downloaden", "Download CV")
        : uiLanguage === "en"
            ? `Finish CV · ${remainingCoreSteps} ${remainingCoreSteps === 1 ? "step" : "steps"} left`
            : `CV afronden · nog ${remainingCoreSteps} ${remainingCoreSteps === 1 ? "stap" : "stappen"}`;
    const [isSaved, setIsSaved] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);
    const [templateId, setTemplateId] = useState(initialTemplateId);
    const [colorThemeId, setColorThemeId] = useState(initialColorThemeId);
    const [showUploader, setShowUploader] = useState(false);
    const [uploaderSource, setUploaderSource] = useState<CvUploadSource>("toolbar");
    const [fullPreviewSource, setFullPreviewSource] = useState<FullPreviewSource | null>(null);
    const [pageCount, setPageCount] = useState(1);
    const [desktopPreviewScale, setDesktopPreviewScale] = useState(DESKTOP_PREVIEW_SCALE);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [showTemplateHint, setShowTemplateHint] = useState(false);
    const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
    const [templateSelectorSource, setTemplateSelectorSource] = useState<TemplateSelectorSource>("toolbar");
    const [showPostUploadReview, setShowPostUploadReview] = useState(false);
    const [showMobilePhoto, setShowMobilePhoto] = useState(() => Boolean(normalizedInitialData.personal.photo));
    const [suggestedTargetRole, setSuggestedTargetRole] = useState<string | null>(null);
    const [visibleOptionalSections, setVisibleOptionalSections] = useState<Record<OptionalSectionId, boolean>>(
        () => deriveVisibleOptionalSections(normalizedInitialData)
    );
    const [showAdditionalPersonalDetails, setShowAdditionalPersonalDetails] = useState(
        () => hasAdditionalPersonalDetails(normalizedInitialData)
    );
    const [isAtsRewriting, setIsAtsRewriting] = useState(false);
    const [atsTargetRole, setAtsTargetRole] = useState(initialData.personal.title || '');
    const [targetVacancy, setTargetVacancy] = useState('');
    const [atsLanguageLock, setAtsLanguageLock] = useState<AtsLanguageLock>('auto');
    const [matchImportFeedback, setMatchImportFeedback] = useState<MatchImportFeedback>({ status: 'idle' });
    const desktopPreviewViewportRef = useRef<HTMLDivElement>(null);
    const progressMilestonesTrackedRef = useRef<Set<number>>(new Set());
    const completedSectionsTrackedRef = useRef<Set<CompletionStepId>>(new Set());
    const progressTrackingInitializedRef = useRef(false);
    const readyToDownloadTrackedRef = useRef(false);
    const uploadIntentHandledRef = useRef(false);
    const matchImportHandledRef = useRef(false);

    const openUploader = useCallback((source: CvUploadSource) => {
        track("cv_upload_modal_opened", {
            cvId: id,
            source,
            uiLanguage,
            templateId,
            ...getEditorSearchContext(),
        });
        setUploaderSource(source);
        setShowUploader(true);
    }, [id, templateId, uiLanguage]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const params = new URLSearchParams(window.location.search);
        if (params.get('upload') === '1' && !uploadIntentHandledRef.current) {
            uploadIntentHandledRef.current = true;
            openUploader("route_intent");
        }
    }, [openUploader]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const rawPendingExample = window.sessionStorage.getItem(PENDING_EXAMPLE_CV_STORAGE_KEY);
        if (!rawPendingExample) return;

        let pendingExample: PendingExampleCV | null = null;
        try {
            pendingExample = JSON.parse(rawPendingExample) as PendingExampleCV;
        } catch {
            window.sessionStorage.removeItem(PENDING_EXAMPLE_CV_STORAGE_KEY);
            return;
        }

        if (!pendingExample || pendingExample.templateId !== initialTemplateId) {
            return;
        }

        window.sessionStorage.removeItem(PENDING_EXAMPLE_CV_STORAGE_KEY);

        const applyPendingExample = async () => {
            try {
                if (pendingExample.sampleCV) {
                    const normalizedData = ensureEditorData(pendingExample.sampleCV, uiLanguage);
                    reset(normalizedData);
                    setVisibleOptionalSections(deriveVisibleOptionalSections(normalizedData));
                    setShowAdditionalPersonalDetails(hasAdditionalPersonalDetails(normalizedData));
                    setIsSaved(false);
                    await updateCV(id, normalizedData);
                }

                if (pendingExample.colorThemeId && pendingExample.colorThemeId !== initialColorThemeId) {
                    setColorThemeId(pendingExample.colorThemeId);
                    await updateCVColorTheme(id, pendingExample.colorThemeId);
                }

                setIsSaved(true);
                track('example_cv_applied_after_login', {
                    cvId: id,
                    templateId: pendingExample.templateId,
                    startSource: pendingExample.startSource,
                    hasSampleCV: Boolean(pendingExample.sampleCV),
                });
            } catch {
                setIsSaved(false);
            }
        };

        void applyPendingExample();
    }, [id, initialColorThemeId, initialTemplateId, reset, uiLanguage]);

    useEffect(() => {
        if (typeof window === 'undefined' || matchImportHandledRef.current) return;
        const rawPendingMatch = window.sessionStorage.getItem(PENDING_CV_MATCH_STORAGE_KEY);
        if (!rawPendingMatch) return;

        let parsedPendingMatch: unknown;
        try {
            parsedPendingMatch = JSON.parse(rawPendingMatch);
        } catch {
            window.sessionStorage.removeItem(PENDING_CV_MATCH_STORAGE_KEY);
            return;
        }

        if (
            !isPendingCvMatch(parsedPendingMatch) ||
            Date.now() - parsedPendingMatch.createdAt > PENDING_CV_MATCH_TTL_MS
        ) {
            window.sessionStorage.removeItem(PENDING_CV_MATCH_STORAGE_KEY);
            return;
        }

        matchImportHandledRef.current = true;
        setMatchImportFeedback({ status: 'importing' });

        const applyPendingMatch = async () => {
            try {
                const response = await fetch('/api/tools/cv-vacature-match/import', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        cvText: parsedPendingMatch.cvText,
                        locale: parsedPendingMatch.locale,
                    }),
                });
                const body = await response.json().catch(() => ({}));
                if (!response.ok || !body.data) {
                    throw new Error(body.error || 'CV import failed');
                }

                const normalizedData = ensureEditorData(body.data as CVData, uiLanguage);
                const targetRoleSuggestion = normalizedData.personal.title
                    ? null
                    : suggestTargetRoleFromExperience(normalizedData);
                if (targetRoleSuggestion) {
                    normalizedData.personal.title = targetRoleSuggestion;
                }

                reset(normalizedData);
                setSuggestedTargetRole(targetRoleSuggestion);
                setAtsTargetRole(normalizedData.personal.title);
                setTargetVacancy(parsedPendingMatch.vacancyText);
                window.sessionStorage.setItem(
                    getTargetVacancySessionKey(id),
                    parsedPendingMatch.vacancyText,
                );
                setVisibleOptionalSections(deriveVisibleOptionalSections(normalizedData));
                setShowAdditionalPersonalDetails(hasAdditionalPersonalDetails(normalizedData));
                setIsSaved(false);

                const updateResult = await updateCV(id, normalizedData);
                if (!updateResult.success) {
                    throw new Error('CV save failed');
                }

                window.sessionStorage.removeItem(PENDING_CV_MATCH_STORAGE_KEY);
                setIsSaved(true);
                setMatchImportFeedback({
                    status: 'success',
                    result: parsedPendingMatch.result,
                });
                track('resume_screener_editor_imported', {
                    cvId: id,
                    locale: parsedPendingMatch.locale,
                    input_type: parsedPendingMatch.inputMode,
                    score_band: parsedPendingMatch.result.scoreBand,
                    top_issue_category: parsedPendingMatch.result.topFixes[0]?.category || 'unknown',
                });
            } catch {
                setIsSaved(false);
                setMatchImportFeedback({
                    status: 'error',
                    message: uiLanguage === 'en'
                        ? 'Your assessment was preserved, but the CV could not be imported automatically. Return to the check and try again.'
                        : 'Je analyse is bewaard, maar het CV kon niet automatisch worden ingevuld. Ga terug naar de controle en probeer het opnieuw.',
                });
                track('resume_screener_failed', {
                    locale: parsedPendingMatch.locale,
                    input_type: parsedPendingMatch.inputMode,
                    reason: 'import_failed',
                });
            }
        };

        void applyPendingMatch();
    }, [id, reset, uiLanguage]);

    useEffect(() => {
        const storedVacancy = window.sessionStorage.getItem(getTargetVacancySessionKey(id));
        if (storedVacancy) setTargetVacancy(storedVacancy);
    }, [id]);

    const handlePageCountChange = useCallback((count: number) => {
        setPageCount(count);
    }, []);

    useEffect(() => {
        const computeScale = (
            el: HTMLDivElement | null,
            minScale: number,
            maxScale: number,
            setter: (value: number) => void
        ) => {
            if (!el) return;
            const width = Math.max(0, el.clientWidth - 32);
            const fitScale = width / A4_WIDTH_PX;
            const clamped = Math.max(minScale, Math.min(maxScale, fitScale));
            if (Number.isFinite(clamped)) {
                setter(clamped);
            }
        };

        const recalc = () => {
            computeScale(desktopPreviewViewportRef.current, 0.5, 0.9, setDesktopPreviewScale);
        };

        recalc();

        const observer = new ResizeObserver(recalc);
        if (desktopPreviewViewportRef.current) observer.observe(desktopPreviewViewportRef.current);

        return () => observer.disconnect();
    }, []);

    // Show onboarding for empty CVs on first visit
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("upload") === "1") return;

        const dismissed = localStorage.getItem('werkcv-onboarding-dismissed');
        const isEmpty = initialData.personal.name === '' &&
            initialData.personal.email === '' &&
            initialData.experience.length === 0 &&
            initialData.education.length === 0;
        if (!dismissed && isEmpty) {
            setShowOnboarding(true);
            track('onboarding_shown', {});
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (hasEditorStartedTracked(id)) return;

        let fromPath: string | undefined;
        if (typeof document !== 'undefined' && document.referrer) {
            try {
                const referrerUrl = new URL(document.referrer);
                if (referrerUrl.origin === window.location.origin) {
                    fromPath = referrerUrl.pathname;
                }
            } catch {
                // Ignore malformed referrers.
            }
        }

        track('editor_started', {
            cvId: id,
            fromPath,
            templateId,
            uiLanguage,
            ...getEditorSearchContext(),
        });
        markEditorStartedTracked(id);
    }, [id, templateId, uiLanguage]);

    useEffect(() => {
        const milestones: Array<25 | 50 | 75 | 100> = [25, 50, 75, 100];
        if (!progressTrackingInitializedRef.current) {
            for (const milestone of milestones) {
                if (completionScore >= milestone) progressMilestonesTrackedRef.current.add(milestone);
            }
            for (const step of completionState.steps) {
                if (step.complete) completedSectionsTrackedRef.current.add(step.id);
            }
            progressTrackingInitializedRef.current = true;
        } else {
            for (const milestone of milestones) {
                if (completionScore >= milestone && !progressMilestonesTrackedRef.current.has(milestone)) {
                    track('cv_progress_milestone', { cvId: id, milestone, completionScore });
                    progressMilestonesTrackedRef.current.add(milestone);
                }
            }

            for (const step of completionState.steps) {
                if (step.complete && !completedSectionsTrackedRef.current.has(step.id)) {
                    track('cv_section_completed', { cvId: id, section: step.id, completionScore });
                    completedSectionsTrackedRef.current.add(step.id);
                }
            }
        }

        if (completionState.isReady && !readyToDownloadTrackedRef.current) {
            const trackedKey = `${READY_TO_DOWNLOAD_TRACKED_PREFIX}${id}`;
            if (!window.sessionStorage.getItem(trackedKey)) {
                track('ready_to_download_viewed', { cvId: id, completionScore });
                window.sessionStorage.setItem(trackedKey, '1');
            }
            readyToDownloadTrackedRef.current = true;
        }
    }, [completionScore, completionState.isReady, completionState.steps, id]);

    const highlightTemplateSwitcher = () => {
        setShowTemplateHint(true);
        setTimeout(() => setShowTemplateHint(false), 5000);
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleDismissOnboarding = () => {
        setShowOnboarding(false);
        localStorage.setItem('werkcv-onboarding-dismissed', 'true');
        track('onboarding_dismissed', { action: 'start_typing' });
        highlightTemplateSwitcher();
    };

    const handleOnboardingUpload = () => {
        setShowOnboarding(false);
        localStorage.setItem('werkcv-onboarding-dismissed', 'true');
        track('onboarding_dismissed', { action: 'upload_cv' });
        openUploader("onboarding");
    };

    const handlePhotoChange = useCallback((base64: string) => {
        setValue('personal.photo', base64, { shouldDirty: true });
        setIsSaved(false);
    }, [setValue]);

    const maybeTrackCompletion = useCallback((cvData: CVData) => {
        if (hasCompletionTracked(id)) return;
        const state = getCompletionState(cvData, uiLanguage);
        if (!state.isComplete) return;
        track('complete_cv', { cvId: id, completionScore: state.score });
        markCompletionTracked(id);
    }, [id, uiLanguage]);

    const toggleOptionalSection = (sectionId: OptionalSectionId) => {
        setVisibleOptionalSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    const onSubmit = async (formData: CVData) => {
        setIsSaved(false);
        const res = await updateCV(id, formData);
        if (res.success) {
            setIsSaved(true);
            maybeTrackCompletion(formData);
        } else {
            alert(tr("Er ging iets mis bij het opslaan.", "Something went wrong while saving."));
        }
    };

    // Dirty detection logic + auto-save
    const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isSavingRef = useRef(false);

    useEffect(() => {
        const subscription = watch(() => {
            setIsSaved(false);

            // Debounced auto-save: save 3 seconds after last change
            if (autoSaveTimerRef.current) {
                clearTimeout(autoSaveTimerRef.current);
            }
            autoSaveTimerRef.current = setTimeout(async () => {
                if (isSavingRef.current) return;
                isSavingRef.current = true;
                try {
                    const currentData = watch() as CVData;
                    const res = await updateCV(id, currentData);
                    if (res.success) {
                        setIsSaved(true);
                        maybeTrackCompletion(currentData);
                    }
                } finally {
                    isSavingRef.current = false;
                }
            }, 3000);
        });
        return () => {
            subscription.unsubscribe();
            if (autoSaveTimerRef.current) {
                clearTimeout(autoSaveTimerRef.current);
            }
        };
    }, [watch, id, maybeTrackCompletion]);

    // Warn user before closing tab with unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (!isSaved) {
                e.preventDefault();
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isSaved]);

    const handleTemplateChange = async (newTemplateId: string, defaultThemeId: string) => {
        track('template_selected', {
            cvId: id,
            templateId: newTemplateId,
            previousId: templateId,
            source: templateSelectorSource,
            completionScore,
            isReady: isReadyToDownload,
        });
        setTemplateId(newTemplateId);
        setColorThemeId(defaultThemeId);
        await updateCVTemplate(id, newTemplateId);
        await updateCVColorTheme(id, defaultThemeId);
    };

    const openTemplateSelector = (source: TemplateSelectorSource) => {
        track('template_selector_opened', {
            cvId: id,
            source,
            completionScore,
            isReady: isReadyToDownload,
            templateId,
            uiLanguage,
            ...getEditorSearchContext(),
        });
        setTemplateSelectorSource(source);
        setIsTemplateSelectorOpen(true);
    };

    const closeTemplateSelector = (reason: "dismissed" | "selected") => {
        track('template_selector_closed', {
            cvId: id,
            source: templateSelectorSource,
            reason,
            completionScore,
            isReady: isReadyToDownload,
            templateId,
        });
        setIsTemplateSelectorOpen(false);
    };

    const handleColorThemeChange = async (newThemeId: string) => {
        track('color_theme_changed', { themeId: newThemeId, templateId });
        setColorThemeId(newThemeId);
        await updateCVColorTheme(id, newThemeId);
    };

    const handleCVParsed = (data: CVData) => {
        const normalizedData = ensureEditorData(data, uiLanguage);
        const targetRoleSuggestion = suggestTargetRoleFromExperience(normalizedData);
        if (targetRoleSuggestion) {
            normalizedData.personal.title = targetRoleSuggestion;
        }
        // Reset the form with the parsed CV data
        reset(normalizedData);
        setSuggestedTargetRole(targetRoleSuggestion || null);
        setAtsTargetRole(normalizedData.personal.title);
        setVisibleOptionalSections(deriveVisibleOptionalSections(normalizedData));
        setShowAdditionalPersonalDetails(hasAdditionalPersonalDetails(normalizedData));
        setShowUploader(false);
        setIsSaved(false);
        setShowPostUploadReview(getCompletionState(normalizedData, uiLanguage).isReady);
        track('cv_uploaded', { cvId: id, fileType: 'parsed', templateId, entryMethod: 'upload' });
    };

    const startCheckout = async (source: DownloadSource) => {
        const checkoutEventContext = {
            cvId: id,
            product: "cv-download" as const,
            amountCents: cvDownloadPrice.amountCents,
            source,
            variant: CHECKOUT_FLOW_VARIANT,
            experimentVariant: CHECKOUT_FLOW_VARIANT,
            templateId,
            uiLanguage,
            ...getEditorSearchContext(),
        };
        track('checkout_start', checkoutEventContext);
        try {
            const checkoutResult = await getCheckoutURL(id, undefined, [], "cv-download");
            if (!checkoutResult.ok) {
                track('checkout_failed', {
                    ...checkoutEventContext,
                    reason: checkoutResult.reason || checkoutResult.code,
                });
                alert(checkoutResult.supportNotified ? supportNotifiedMessage : tr(
                    "Betaling kon niet gestart worden. Controleer de betaalconfiguratie en probeer opnieuw.",
                    "Payment could not be started. Check the payment configuration and try again."
                ));
                return;
            }
            track('checkout_started', checkoutEventContext);
            window.location.href = checkoutResult.url;
        } catch (error) {
            track('checkout_failed', {
                ...checkoutEventContext,
                reason: getCheckoutFailureReason(error),
            });
            alert(tr("Betaling kon niet gestart worden. Controleer de betaalconfiguratie en probeer opnieuw.", "Payment could not be started. Check the payment configuration and try again."));
        }
    };

    const scrollToCompletionStep = (step: CompletionStep) => {
        if (typeof document === "undefined") return;
        document.getElementById(step.anchorId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleOpenCoverLetter = () => {
        if (typeof window !== "undefined") {
            window.sessionStorage.setItem(getTargetVacancySessionKey(id), targetVacancy);
        }
        track('cta_clicked', { location: 'editor_final_review', label: 'open_cover_letter' });
    };

    const handleAtsRewrite = async () => {
        setIsAtsRewriting(true);
        try {
            const targetRole = atsTargetRole.trim() || data.personal.title || '';
            const response = await fetch('/api/ats-rewrite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cvId: id,
                    targetRole,
                    jobDescription: targetVacancy,
                    preferredLanguage: atsLanguageLock === 'auto' ? undefined : atsLanguageLock,
                }),
            });

            const result = await response.json().catch(() => null);

            if (!response.ok) {
                if (result?.code === 'ATS_LANGUAGE_MISMATCH') {
                    alert(tr("ATS kon de gewenste taal niet betrouwbaar aanhouden. Kies een vaste taal (NL/EN) en probeer opnieuw.", "ATS could not reliably keep the requested language. Choose a fixed language (NL/EN) and try again."));
                    return;
                }
                alert(result?.error || tr("ATS Rewrite mislukt. Probeer het opnieuw.", "ATS rewrite failed. Please try again."));
                return;
            }

            if (result?.data) {
                const rewrittenData = result.data as CVData;
                const currentData = watch() as CVData;
                const normalizedData = ensureEditorData({
                    ...currentData,
                    ...rewrittenData,
                    personal: {
                        ...currentData.personal,
                        ...rewrittenData.personal,
                    },
                    references: rewrittenData.references ?? currentData.references,
                    sideActivities: rewrittenData.sideActivities ?? currentData.sideActivities,
                    customSections: rewrittenData.customSections ?? currentData.customSections,
                    properties: rewrittenData.properties ?? currentData.properties,
                }, uiLanguage);
                reset(normalizedData);
                setVisibleOptionalSections((prev) => ({
                    ...prev,
                    internships: prev.internships || hasItems(normalizedData.internships),
                    courses: prev.courses || hasItems(normalizedData.courses),
                    awards: prev.awards || hasItems(normalizedData.awards),
                    interests: prev.interests || hasItems(normalizedData.interests),
                    properties: prev.properties || hasItems(normalizedData.properties),
                    references: prev.references || hasItems(normalizedData.references),
                    sideActivities: prev.sideActivities || hasItems(normalizedData.sideActivities),
                    customSections: prev.customSections || hasItems(normalizedData.customSections),
                }));
                setIsSaved(false);
            }
        } finally {
            setIsAtsRewriting(false);
        }
    };

    const handleDownload = async (source: DownloadSource = "toolbar") => {
        setIsDownloading(true);
        track('pdf_download_started', { cvId: id, source, completionScore, templateId, pageCount });
        try {
            // Always save latest data before generating PDF to prevent stale content
            const formData = watch();
            const res = await updateCV(id, formData);
            if (!res.success) {
                alert(tr("Er ging iets mis bij het opslaan.", "Something went wrong while saving."));
                return;
            }
            setIsSaved(true);
            maybeTrackCompletion(formData);

            // Fetch PDF as blob so we can track completion and handle errors
            const response = await fetch(`/api/pdf?cvId=${id}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                if (errorData?.code === 'PAYMENT_REQUIRED') {
                    track('checkout_paywall_reached', {
                        cvId: id,
                        variant: CHECKOUT_FLOW_VARIANT,
                        experimentVariant: CHECKOUT_FLOW_VARIANT,
                        source,
                        completionScore,
                        pageCount,
                        templateId,
                        uiLanguage,
                        ...getEditorSearchContext(),
                    });
                    await startCheckout(source);
                } else if (errorData?.code === 'PDF_ERROR') {
                    alert(errorData?.supportNotified
                        ? supportNotifiedMessage
                        : tr("Er ging iets mis bij het genereren van de PDF. Probeer het opnieuw.", "Something went wrong while generating the PDF. Please try again."));
                } else {
                    alert(tr("Er ging iets mis bij het downloaden.", "Something went wrong while downloading."));
                }
                return;
            }

            // Extract filename from Content-Disposition header or use default
            const disposition = response.headers.get('Content-Disposition');
            let filename = 'cv.pdf';
            if (disposition) {
                const match = disposition.match(/filename="?([^";\n]+)"?/);
                if (match) filename = match[1];
            }

            // Trigger download via blob URL
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            track('pdf_download_completed', { cvId: id });
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-[#FFFEF9] font-sans text-slate-900 overflow-hidden">
            {/* Left: Editor Form */}
            <div className="flex w-full lg:w-[54%] flex-col border-r-0 lg:border-r border-slate-200 bg-[#FFFEF9] z-10 h-screen">
                {/* Toolbar */}
                <div className="sticky top-0 z-20 flex h-14 items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-3 backdrop-blur sm:px-4">
                    {/* Left side - Logo and tools */}
                    <div className="flex min-w-0 items-center gap-2">
                        <Link href={isEnglish ? "/en" : "/"} className="hidden shrink-0 items-center gap-1 lg:flex">
                            <span className="font-semibold text-lg sm:text-xl tracking-tight text-slate-900">
                                Werk<span className="bg-[#4ECDC4] px-1 rounded-sm">CV</span>.nl
                            </span>
                        </Link>
                        <div className="relative flex items-center gap-1 sm:gap-2">
                            <TemplateSelector
                                currentTemplateId={templateId}
                                data={data}
                                isOpen={isTemplateSelectorOpen}
                                reviewMode={isReadyToDownload}
                                onOpen={() => openTemplateSelector(isReadyToDownload ? "ready_state" : "toolbar")}
                                onClose={closeTemplateSelector}
                                onSelectTemplate={handleTemplateChange}
                                uiLanguage={uiLanguage}
                            />
                            {showTemplateHint && (
                                <div className="absolute top-full left-0 mt-2 bg-emerald-100 border border-emerald-300 px-3 py-2 text-xs font-semibold text-emerald-900 shadow-sm z-30 whitespace-nowrap">
                                    {tr("Wissel hier van template", "Switch templates here")}
                                </div>
                            )}
                            <ColorThemePicker
                                templateId={templateId}
                                currentThemeId={colorThemeId}
                                onSelectTheme={handleColorThemeChange}
                                uiLanguage={uiLanguage}
                            />
                        </div>
                    </div>

                    {/* Right side - Save and Download */}
                    <div className="flex shrink-0 items-center">
                        <div className="flex items-center gap-2 sm:gap-3">
                            {!isCurrentCvEmpty ? (
                                <button
                                    type="button"
                                    onClick={() => openUploader("toolbar")}
                                    className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:px-3"
                                    title={tr("Upload je bestaande CV", "Upload your existing CV")}
                                    aria-label={tr("Upload je bestaande CV", "Upload your existing CV")}
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    <span className="hidden sm:inline">{tr("CV uploaden", "Upload CV")}</span>
                                </button>
                            ) : null}
                            <button
                                onClick={handleSubmit(onSubmit)}
                                disabled={isSubmitting || isSaved}
                                className={`px-3 sm:px-4 py-2 font-semibold text-xs sm:text-sm rounded-md border transition-colors ${isSaved
                                        ? "border-transparent bg-transparent text-emerald-700 cursor-default"
                                        : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50"
                                    }`}
                            >
                                {isSubmitting
                                    ? tr("Opslaan...", "Saving...")
                                    : isSaved
                                        ? `✓ ${tr("Opgeslagen", "Saved")}`
                                        : tr("Opslaan", "Save")}
                            </button>
                            <button
                                onClick={() => {
                                    if (!completionState.isReady && completionState.nextStep) {
                                        scrollToCompletionStep(completionState.nextStep);
                                        return;
                                    }
                                    handleDownload("toolbar");
                                }}
                                disabled={isDownloading}
                                className={`px-3 sm:px-4 py-2 font-semibold text-xs sm:text-sm rounded-md border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isReadyToDownload
                                    ? "border-emerald-700 bg-emerald-600 text-white hover:bg-emerald-700"
                                    : "border-slate-800 bg-slate-900 text-white hover:bg-slate-800"
                                }`}
                            >
                                {isDownloading
                                    ? tr("Bezig...", "Working...")
                                    : toolbarCtaLabel}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scrollable Form Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 scroll-smooth bg-[#FFFEF9]">
                    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 pb-12">

                        <CompletionPanel
                            state={completionState}
                            onGoToStep={scrollToCompletionStep}
                            uiLanguage={uiLanguage}
                        />

                        {matchImportFeedback.status === 'importing' ? (
                            <section className="rounded-lg border border-teal-200 bg-teal-50 px-4 py-3" aria-live="polite">
                                <p className="text-sm font-semibold text-teal-900">
                                    {tr(
                                        'Je CV en vacature worden in de editor gezet...',
                                        'Your CV and vacancy are being added to the editor...',
                                    )}
                                </p>
                            </section>
                        ) : null}

                        {matchImportFeedback.status === 'error' ? (
                            <section className="rounded-lg border border-red-200 bg-red-50 px-4 py-3" role="alert">
                                <p className="text-sm font-semibold text-red-800">{matchImportFeedback.message}</p>
                                <Link
                                    href={isEnglish ? '/en/cv-job-match-checker' : '/tools/cv-vacature-match'}
                                    className="mt-2 inline-block text-sm font-bold text-red-900 underline"
                                >
                                    {tr('Terug naar de controle', 'Return to the check')}
                                </Link>
                            </section>
                        ) : null}

                        {matchImportFeedback.status === 'success' ? (
                            <section className="rounded-lg border border-teal-200 bg-white px-4 py-4 shadow-sm">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-teal-700">
                                            {tr('Vacaturematch meegenomen', 'Vacancy match imported')}
                                        </p>
                                        <h2 className="mt-1 text-base font-semibold text-slate-950">
                                            {tr(
                                                `Je CV en vacature staan klaar. Begin met deze ${matchImportFeedback.result.topFixes.length} verbeterpunten.`,
                                                `Your CV and vacancy are ready. Start with these ${matchImportFeedback.result.topFixes.length} priorities.`,
                                            )}
                                        </h2>
                                    </div>
                                    <span className="shrink-0 rounded-md bg-teal-50 px-2 py-1 text-sm font-black text-teal-800">
                                        {matchImportFeedback.result.score}/100
                                    </span>
                                </div>
                                <ol className="mt-3 space-y-2">
                                    {matchImportFeedback.result.topFixes.map((fix, index) => (
                                        <li key={`${fix.category}-${index}`} className="flex gap-2 text-sm text-slate-700">
                                            <span className="font-black text-teal-700">{index + 1}.</span>
                                            <span><strong className="text-slate-900">{fix.title}:</strong> {fix.action}</span>
                                        </li>
                                    ))}
                                </ol>
                                <button
                                    type="button"
                                    onClick={() => setMatchImportFeedback({ status: 'idle' })}
                                    className="mt-3 text-xs font-bold text-slate-500 underline hover:text-slate-800"
                                >
                                    {tr('Verbergen', 'Hide')}
                                </button>
                            </section>
                        ) : null}

                        {!isReadyToDownload && isCurrentCvEmpty ? (
                            <section className="rounded-2xl border border-teal-200 bg-teal-50 p-4 shadow-sm sm:p-5">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">
                                            {tr("Sneller starten", "Faster start")}
                                        </p>
                                        <h2 className="mt-1 text-base font-semibold text-slate-950">
                                            {tr("Heb je al een CV? Upload hem en vul dit formulier automatisch.", "Already have a CV? Upload it and fill this form automatically.")}
                                        </h2>
                                        <p className="mt-1 text-sm font-medium text-slate-600">
                                            {tr("Je kunt daarna alles aanpassen voordat je downloadt.", "You can edit everything before downloading.")}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            track("cta_clicked", {
                                                location: "editor_empty_cv_upload_nudge",
                                                label: "upload_existing_cv",
                                            });
                                            openUploader("empty_state");
                                        }}
                                        className="inline-flex shrink-0 items-center justify-center rounded-md border border-teal-700 bg-teal-600 px-4 py-3 text-sm font-black text-white transition-colors hover:bg-teal-700"
                                    >
                                        {tr("CV uploaden", "Upload CV")}
                                    </button>
                                </div>
                            </section>
                        ) : null}

                        {isReadyToDownload && showPostUploadReview ? (
                            <section className="rounded-2xl border-2 border-blue-300 bg-blue-50 p-4 shadow-sm sm:p-5">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
                                            {tr("Upload geslaagd", "Upload complete")}
                                        </p>
                                        <h2 className="mt-1 text-lg font-semibold text-slate-950">
                                            {tr("Controleer eerst je volledige CV", "Review your complete CV first")}
                                        </h2>
                                        <p className="mt-1 text-sm font-medium text-slate-600">
                                            {tr(
                                                "Je gegevens zijn ingevuld. Controleer de opmaak en inhoud; daarna kun je de PDF downloaden.",
                                                "Your details are filled in. Review the layout and content, then download the PDF when you are satisfied."
                                            )}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            track("cta_clicked", { location: "editor_upload_success", label: "review_cv" });
                                            setShowPostUploadReview(false);
                                            setFullPreviewSource("upload_success");
                                        }}
                                        className="inline-flex shrink-0 items-center justify-center rounded-md border border-blue-800 bg-blue-700 px-5 py-3 text-sm font-black text-white transition-colors hover:bg-blue-800"
                                    >
                                        {tr("CV controleren →", "Review CV →")}
                                    </button>
                                </div>
                            </section>
                        ) : null}

                        {isReadyToDownload && !showPostUploadReview ? (
                            <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm sm:p-5">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                                            {tr("Klaar voor download", "Ready to download")}
                                        </p>
                                        <h2 className="mt-1 text-lg font-semibold text-slate-950">
                                            {tr("Je CV is compleet genoeg om te versturen.", "Your CV is ready to send.")}
                                        </h2>
                                        <p className="mt-1 text-sm font-medium text-slate-600">
                                            {tr(
                                                `Download je PDF wanneer je tevreden bent. Eenmalig ${cvDownloadPrice.display}. Geen abonnement. Geen automatische verlenging.`,
                                                `Download your PDF when you are happy with it. One-time ${cvDownloadPrice.display.replace(",", ".")}. No subscription. No automatic renewal.`
                                            )}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleDownload("ready_panel")}
                                        disabled={isDownloading}
                                        className="inline-flex shrink-0 items-center justify-center rounded-md border border-emerald-700 bg-emerald-600 px-5 py-3 text-sm font-black text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isDownloading
                                            ? tr("Bezig...", "Working...")
                                            : tr("CV downloaden", "Download CV")}
                                    </button>
                                </div>
                            </section>
                        ) : null}

                        {/* Personal Section */}
                        <section id="section-personal" className="scroll-mt-28 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
                            <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 rounded-md">
                                    {tr("Persoonlijke Gegevens", "Personal Details")}
                                </span>
                            </h2>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">{tr("Volledige Naam", "Full Name")}</label>
                                    <input {...register("personal.name")} placeholder={tr("bv. Simone van Roodenburg", "e.g. Emma Johnson")} className={inputClass} style={inputStyle} />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">{tr("Gewenste Functie", "Target Role")}</label>
                                    <input {...register("personal.title")} placeholder={tr("bv. Leerkracht Basisonderwijs", "e.g. Primary School Teacher")} className={inputClass} style={inputStyle} />
                                    {suggestedTargetRole && data.personal.title.trim() === suggestedTargetRole ? (
                                        <p className="mt-1.5 text-xs leading-relaxed text-emerald-700" role="status">
                                            {tr(
                                                "Voorgesteld op basis van je meest recente functie. Pas dit aan voor de vacature waarop je solliciteert.",
                                                "Suggested from your most recent role. Adjust it for the job you are targeting."
                                            )}
                                        </p>
                                    ) : null}
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Email</label>
                                    <input {...register("personal.email")} placeholder={tr("email@voorbeeld.nl", "email@example.com")} className={inputClass} style={inputStyle} />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">{tr("Telefoonnummer", "Phone number")}</label>
                                    <input {...register("personal.phone")} placeholder={tr("06 12345678", "+31 6 12345678")} className={inputClass} style={inputStyle} />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">{tr("Plaats", "City")}</label>
                                    <input {...register("personal.location")} placeholder={tr("bv. Utrecht", "e.g. Utrecht")} className={inputClass} style={inputStyle} />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">{tr("CV taal", "CV language")}</label>
                                    <select {...register("personal.resumeLanguage")} className={inputClass} style={inputStyle}>
                                        <option value="nl">{tr("Nederlands", "Dutch")}</option>
                                        <option value="en">English</option>
                                    </select>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="mt-4">
                                <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">{tr("Persoonlijk Profiel", "Personal Profile")}</label>
                                <textarea {...register("personal.summary")} placeholder={tr("Korte introductie over jezelf, je ervaring en wat je zoekt...", "Short introduction about yourself, your experience, and what you are looking for...")} className={`${inputClass} h-28`} style={inputStyle} />
                            </div>

                            <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
                                {!data.personal.photo ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowMobilePhoto((visible) => !visible);
                                            track("cta_clicked", { location: "editor_mobile_optional_photo", label: showMobilePhoto ? "hide_photo" : "add_photo_later" });
                                        }}
                                        className="flex w-full items-center justify-between text-left sm:hidden"
                                        aria-expanded={showMobilePhoto}
                                    >
                                        <span>
                                            <span className="block text-sm font-semibold text-slate-900">{tr("Profielfoto", "Profile photo")}</span>
                                            <span className="mt-1 block text-xs text-slate-600">{tr("Optioneel — je kunt dit later toevoegen", "Optional — you can add this later")}</span>
                                        </span>
                                        <span className="text-sm font-bold text-slate-500">{showMobilePhoto ? "−" : "+"}</span>
                                    </button>
                                ) : null}
                                <div className={`${showMobilePhoto || data.personal.photo ? "flex" : "hidden"} flex-col gap-4 pt-4 sm:flex sm:flex-row sm:items-start sm:pt-0`}>
                                    <PhotoUpload
                                        currentPhoto={data.personal.photo}
                                        onPhotoChange={handlePhotoChange}
                                        uiLanguage={uiLanguage}
                                    />
                                    <div className="flex-1 rounded-md border border-slate-200 bg-white p-3">
                                        <p className="text-sm font-semibold text-slate-900">{tr("Profielfoto", "Profile photo")}</p>
                                        <p className="mt-1 text-xs leading-relaxed text-slate-600">
                                            {tr("Optioneel. Voeg alleen een professionele, actuele foto toe als dit past bij je sollicitatie.", "Optional. Add one only if it is professional, current, and fits the job application.")}
                                        </p>
                                        <Link
                                            href={isEnglish ? "/en/profile-photo" : "/profielfoto-cv-maken"}
                                            className="mt-2 inline-flex text-xs font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                                        >
                                            {tr("AI-profielfoto maken (€9,99)", "Create an AI profile photo (€9.99)")}
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowAdditionalPersonalDetails((open) => !open)}
                                aria-expanded={showAdditionalPersonalDetails}
                                className="mt-5 flex w-full items-center justify-between border-t border-slate-200 pt-4 text-left text-sm font-semibold text-slate-700 hover:text-slate-950"
                            >
                                <span>
                                    {tr("Meer persoonlijke gegevens", "More personal details")}
                                    <span className="ml-2 text-xs font-medium text-slate-400">{tr("optioneel", "optional")}</span>
                                </span>
                                <span className={`text-slate-400 transition-transform ${showAdditionalPersonalDetails ? "rotate-180" : ""}`}>⌄</span>
                            </button>

                            {showAdditionalPersonalDetails ? (
                                <div className="mt-4 space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">{tr("Adres", "Address")}</label>
                                            <input {...register("personal.address")} placeholder={tr("bv. Wilhelminastraat 78", "e.g. Wilhelminastraat 78")} className={inputClass} style={inputStyle} />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">{tr("Postcode", "Postal code")}</label>
                                            <input {...register("personal.postalCode")} placeholder="1234 AB" className={inputClass} style={inputStyle} />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">{tr("Geboortedatum", "Date of birth")}</label>
                                            <input {...register("personal.birthDate")} placeholder="15-03-1994" className={inputClass} style={inputStyle} />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">{tr("Geboorteplaats", "Place of birth")}</label>
                                            <input {...register("personal.birthPlace")} placeholder="Naarden" className={inputClass} style={inputStyle} />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">{tr("Nationaliteit", "Nationality")}</label>
                                            <input {...register("personal.nationality")} placeholder={tr("Nederlandse", "Dutch")} className={inputClass} style={inputStyle} />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">{tr("Rijbewijs", "Driver's license")}</label>
                                            <input {...register("personal.driversLicense")} placeholder="B" className={inputClass} style={inputStyle} />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">{tr("Geslacht", "Gender")}</label>
                                            <select {...register("personal.gender")} className={inputClass} style={inputStyle}>
                                                {genderOptions.map((option) => (
                                                    <option key={option.value || "empty"} value={option.value}>{option.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">{tr("Burgerlijke staat", "Marital status")}</label>
                                            <select {...register("personal.maritalStatus")} className={inputClass} style={inputStyle}>
                                                {maritalStatusOptions.map((option) => (
                                                    <option key={option.value || "empty"} value={option.value}>{option.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">LinkedIn</label>
                                            <input {...register("personal.linkedIn")} placeholder={tr("linkedin.com/in/naam", "linkedin.com/in/name")} className={inputClass} style={inputStyle} />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">GitHub</label>
                                            <input {...register("personal.github")} placeholder="github.com/username" className={inputClass} style={inputStyle} />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Website</label>
                                            <input {...register("personal.website")} placeholder="portfolio.example.com" className={inputClass} style={inputStyle} />
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </section>

                        <div id="section-experience" className="scroll-mt-28">
                            <ExperienceSection control={control} register={register} uiLanguage={uiLanguage} />
                        </div>
                        <div id="section-education" className="scroll-mt-28">
                            <EducationSection control={control} register={register} uiLanguage={uiLanguage} />
                        </div>
                        <div id="section-skills" className="scroll-mt-28">
                            <SkillsSection control={control} register={register} uiLanguage={uiLanguage} />
                        </div>
                        <LanguagesSection control={control} register={register} uiLanguage={uiLanguage} />

                        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
                            <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-4">
                                <span className="bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 rounded-md inline-block">
                                    {tr("Extra onderdelen", "Add Section")}
                                </span>
                            </h2>
                            <p className="text-xs font-bold text-gray-700 mb-4">
                                {tr("Activeer extra onderdelen zoals referenties, nevenactiviteiten of een eigen sectie.", "Enable extra sections such as references, side activities, or a custom section.")}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {optionalSectionOptions.map((option) => {
                                    const isActive = visibleOptionalSections[option.id];
                                    return (
                                        <button
                                            key={option.id}
                                            type="button"
                                            onClick={() => toggleOptionalSection(option.id)}
                                            className={`px-3 py-2 text-xs font-semibold rounded-md border transition-colors ${
                                                isActive
                                                    ? 'bg-slate-900 text-white border-slate-900'
                                                    : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                                            }`}
                                        >
                                            {isActive ? '✓ ' : '+ '}
                                            {option.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        {visibleOptionalSections.internships && <InternshipsSection control={control} register={register} uiLanguage={uiLanguage} />}
                        {visibleOptionalSections.courses && <CoursesSection control={control} register={register} uiLanguage={uiLanguage} />}
                        {visibleOptionalSections.awards && <AwardsSection control={control} register={register} uiLanguage={uiLanguage} />}
                        {visibleOptionalSections.interests && <InterestsSection control={control} register={register} uiLanguage={uiLanguage} />}
                        {visibleOptionalSections.properties && <PropertiesSection control={control} register={register} uiLanguage={uiLanguage} />}
                        {visibleOptionalSections.references && <ReferencesSection control={control} register={register} uiLanguage={uiLanguage} />}
                        {visibleOptionalSections.sideActivities && <SideActivitiesSection control={control} register={register} uiLanguage={uiLanguage} />}
                        {visibleOptionalSections.customSections && <CustomSectionsSection control={control} register={register} uiLanguage={uiLanguage} />}

                        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                                        <span className="bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 rounded-md inline-block">
                                            {tr("Laatste controle", "Final check")}
                                        </span>
                                    </h2>
                                    <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                                        {isReadyToDownload
                                            ? tr("Je basis-CV is klaar. Gebruik deze checks om je PDF sterker te maken voor een specifieke vacature.", "Your core CV is ready. Use these checks to make your PDF stronger for a specific vacancy.")
                                            : tr("Maak eerst de belangrijkste onderdelen af. Daarna tonen we de optimalisatie voor ATS, keywords en sollicitatiebrief.", "Finish the key sections first. Then we show ATS, keyword, and cover-letter optimization.")}
                                    </p>
                                </div>
                                {isReadyToDownload ? (
                                    <button
                                        type="button"
                                        onClick={() => handleDownload("post_completion_tools")}
                                        disabled={isDownloading}
                                        className="inline-flex shrink-0 items-center justify-center rounded-md border border-emerald-700 bg-emerald-600 px-4 py-2 text-xs font-black text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isDownloading
                                            ? tr("Bezig...", "Working...")
                                            : tr("CV downloaden", "Download CV")}
                                    </button>
                                ) : null}
                            </div>

                            <div className="mt-5 grid gap-4">
                                <CvScoreWidget data={data} uiLanguage={uiLanguage} />
                                <KeywordScannerWidget
                                    data={data}
                                    jobDescription={targetVacancy}
                                    onJobDescriptionChange={setTargetVacancy}
                                    uiLanguage={uiLanguage}
                                />
                            </div>
                        </section>

                        {isReadyToDownload ? (
                            <>
                                <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
                                    <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-4">
                                        <span className="bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 rounded-md inline-block">
                                            {tr("ATS Optimalisatie", "ATS Optimization")}
                                        </span>
                                    </h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                        <div className="sm:col-span-2">
                                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">{tr("Doelrol", "Target role")}</label>
                                            <input
                                                value={atsTargetRole}
                                                onChange={(e) => setAtsTargetRole(e.target.value)}
                                                placeholder={data.personal.title || tr("bv. Backend Developer", "e.g. Backend Developer")}
                                                className={inputClass}
                                                style={inputStyle}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">{tr("Taal lock", "Language lock")}</label>
                                            <select
                                                value={atsLanguageLock}
                                                onChange={(e) => setAtsLanguageLock(e.target.value as AtsLanguageLock)}
                                                className={inputClass}
                                                style={inputStyle}
                                            >
                                                <option value="auto">{tr("Auto (detecteer)", "Auto (detect)")}</option>
                                                <option value="nl">{tr("Nederlands", "Dutch")}</option>
                                                <option value="en">English</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">{tr("Vacaturetekst (optioneel)", "Job description (optional)")}</label>
                                        <textarea
                                            value={targetVacancy}
                                            onChange={(e) => setTargetVacancy(e.target.value)}
                                            placeholder={tr("Plak de vacaturetekst voor sterkere ATS-keyword match...", "Paste the job description for a stronger ATS keyword match...")}
                                            className={`${inputClass} h-24`}
                                            style={inputStyle}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                        <button
                                            onClick={handleAtsRewrite}
                                            disabled={isAtsRewriting}
                                            className="px-4 py-2 rounded-md border border-sky-300 bg-sky-50 text-sky-900 font-semibold text-xs hover:bg-sky-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            {isAtsRewriting ? tr('Bezig...', 'Working...') : tr('ATS herschrijven', 'Rewrite for ATS')}
                                        </button>
                                        <p className="text-xs font-bold text-gray-600">
                                            {tr("Herschrijft profiel + werkervaring met taalbehoud.", "Rewrites your profile and experience while keeping the selected language.")}
                                        </p>
                                    </div>
                                </section>

                                <section className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="text-base font-semibold text-slate-950">{tr("Ook een sollicitatiebrief nodig?", "Need a cover letter too?")}</h2>
                                        <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-600">
                                            {tr("Open een aparte werkruimte voor je brief. Je CV blijft overzichtelijk en de vacaturetekst wordt meegenomen.", "Open a focused workspace for your letter. Your CV stays uncluttered and the job description carries over.")}
                                        </p>
                                    </div>
                                    <Link
                                        href={isEnglish ? `/en/cover-letter?id=${encodeURIComponent(id)}` : `/sollicitatiebrief?id=${encodeURIComponent(id)}`}
                                        onClick={handleOpenCoverLetter}
                                        className="inline-flex shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                                    >
                                        {tr("Open sollicitatiebrief", "Open cover letter")} →
                                    </Link>
                                </section>
                            </>
                        ) : null}

                    </div>
                </div>
            </div>

            {/* Right: Live Preview */}
            <div className="hidden lg:flex flex-col lg:w-[46%] xl:w-[48%] bg-[#f0faf9] overflow-hidden">
                {/* Fixed header */}
                <div className="shrink-0 flex items-center justify-between px-4 py-2.5 bg-white/95 backdrop-blur border-b border-slate-200">
                    <span className="text-xs font-semibold text-slate-600">{tr("Live preview", "Live preview")}</span>
                    <div className="flex items-center gap-2">
                        {pageCount > 1 && (
                            <div className={`px-2 py-1 text-xs font-semibold rounded-md border ${
                                pageCount > 2
                                    ? "border-amber-300 bg-amber-100 text-amber-900"
                                    : "border-slate-200 bg-slate-100 text-slate-700"
                            }`}>
                                {pageCount} {tr("pagina's", "pages")}
                            </div>
                        )}
                        <div className="bg-slate-900 px-2 py-1 text-xs font-semibold text-white border border-slate-900 rounded-md">
                            Live
                        </div>
                        <button
                            type="button"
                            onClick={() => setFullPreviewSource("desktop_preview_header")}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-blue-200 bg-blue-50 text-blue-700 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            title={tr("Open grote CV-weergave", "Open full CV preview")}
                            aria-label={tr("Open grote CV-weergave", "Open full CV preview")}
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* Scrollable preview area */}
                <div
                    ref={desktopPreviewViewportRef}
                    className="flex-1 overflow-y-auto p-4 xl:p-5 flex justify-center items-start"
                >
                    {!fullPreviewSource ? (
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={() => setFullPreviewSource("desktop_document")}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    setFullPreviewSource("desktop_document");
                                }
                            }}
                            className="cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f0faf9]"
                            title={tr("Klik voor grote CV-weergave", "Click for full CV preview")}
                            aria-label={tr("Open grote CV-weergave", "Open full CV preview")}
                        >
                            <ScaledCvPreview
                                data={data}
                                templateId={templateId}
                                colorThemeId={colorThemeId}
                                scale={desktopPreviewScale}
                                pageCount={pageCount}
                                onPageCountChange={handlePageCountChange}
                            />
                        </div>
                    ) : null}
                </div>
            </div>

            {/* Mobile/tablet full-preview trigger */}
            <button
                type="button"
                onClick={() => setFullPreviewSource("mobile_floating")}
                className={`lg:hidden fixed bottom-4 right-4 z-40 px-4 py-2 font-semibold text-xs rounded-md border shadow-sm ${
                    isReadyToDownload
                        ? "border-blue-300 bg-blue-50 text-blue-800"
                        : "border-slate-900 bg-slate-900 text-white"
                }`}
            >
                {isReadyToDownload
                    ? tr("CV bekijken", "Review CV")
                    : tr("Live preview", "Live preview")}
                {pageCount > 1 ? ` (${pageCount})` : ""}
            </button>

            <EditorFeedbackWidget
                accountEmail={accountEmail}
                userName={data.personal.name}
                uiLanguage={uiLanguage}
                context={{
                    cvId: id,
                    uiLanguage,
                    templateId,
                    completionScore,
                    pageCount,
                    nextStep: completionState.nextStep?.id || null,
                }}
            />

            {fullPreviewSource ? (
                <FullCvPreviewDialog
                    cvId={id}
                    data={data}
                    templateId={templateId}
                    colorThemeId={colorThemeId}
                    completionScore={completionScore}
                    isReady={isReadyToDownload}
                    remainingSteps={remainingCoreSteps}
                    isSaved={isSaved}
                    isSaving={isSubmitting}
                    isDownloading={isDownloading}
                    pageCount={pageCount}
                    source={fullPreviewSource}
                    uiLanguage={uiLanguage}
                    onClose={() => setFullPreviewSource(null)}
                    onContinueEditing={() => {
                        if (completionState.nextStep) scrollToCompletionStep(completionState.nextStep);
                    }}
                    onDownload={() => handleDownload("full_preview")}
                    onPageCountChange={handlePageCountChange}
                    onSelectTemplate={handleTemplateChange}
                    onSelectTheme={handleColorThemeChange}
                />
            ) : null}

            {/* CV Upload Modal */}
            {showUploader && (
                <CVUploader
                    cvId={id}
                    source={uploaderSource}
                    onParsed={handleCVParsed}
                    onClose={() => setShowUploader(false)}
                    uiLanguage={uiLanguage}
                />
            )}

            {/* Welcome Onboarding Modal */}
            {showOnboarding && (
                <WelcomeOnboarding
                    onDismiss={handleDismissOnboarding}
                    onUploadCV={handleOnboardingUpload}
                    uiLanguage={uiLanguage}
                />
            )}
        </div>
    );
}

