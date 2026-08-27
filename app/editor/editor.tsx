"use client";
import {
    useState,
    useEffect,
    useCallback,
    useRef,
    type KeyboardEvent as ReactKeyboardEvent,
    type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { CVData } from "@/lib/cv";
import { updateCV, updateCVTemplate, updateCVColorTheme, getCheckoutURL } from "../actions";
import { savePublicDraft, type PublicEditorFlow } from "@/lib/public-cv-draft";
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
import TemplateSelector, { getTemplatePreviewData } from "./TemplateSelector";
import ColorThemePicker from "./ColorThemePicker";
import CVUploader from "./CVUploader";
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
import {
    cvSectionHasSubstantiveContent,
    getOrderedSectionIds,
    moveSectionWithinLane,
    normalizeCvSectionOrder,
    resolveCvSectionLayout,
    type CvBodySectionId,
} from "@/lib/cv-sections";
import { isCvEmpty } from "@/lib/cv-empty";
import ScaledCvPreview, { A4_WIDTH_PX } from "./ScaledCvPreview";
import FullCvPreviewDialog from "./FullCvPreviewDialog";
import SectionOrderPanel from "./SectionOrderPanel";
import EditorFeedbackWidget from "./EditorFeedbackWidget";
import WorkspaceSwitcher from "@/components/workspace/WorkspaceSwitcher";
import type { WorkspaceEntitlements } from "@/lib/workspace/types";

interface EditorProps {
    initialData: CVData;
    id: string;
    initialTemplateId: string;
    initialColorThemeId: string;
    accountEmail: string;
    uiLanguage?: UiLanguage;
    agencyRouteLocked?: boolean;
    workspaceContext?: {
        kind: "personal" | "matchpack";
        label: string;
        backHref: string;
        canEdit: boolean;
        canEditDesign: boolean;
        canExport: boolean;
        downloadMode: "personal_checkout" | "matchpack_export";
    };
    workspaceEntitlements?: WorkspaceEntitlements;
    workspaceSwitcherEnabled?: boolean;
    mode?: "account" | "public";
    publicDraftId?: string;
    publicFlow?: PublicEditorFlow;
    publicSource?: string;
    onPublicDownloadRequest?: (input: {
        data: CVData;
        templateId: string;
        colorThemeId: string;
        draftId: string;
        flow: PublicEditorFlow;
        source: string;
    }) => void | Promise<void>;
}

// Reusable input styles for cleaner, calmer form UI
const inputClass = "w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100";
const inputStyle = undefined;
const DESKTOP_PREVIEW_SCALE = 0.58;
const DESKTOP_PREVIEW_MIN_SCALE = 0.42;
const DESKTOP_PREVIEW_MAX_SCALE = 1.4;
const DESKTOP_PREVIEW_GUTTER_PX = 0;
const EDITOR_PANE_WIDTH_STORAGE_KEY = "werkcv_editor_pane_width";
const DEFAULT_EDITOR_PANE_WIDTH = 50;
const MIN_EDITOR_PANE_WIDTH = 40;
const MAX_EDITOR_PANE_WIDTH = 60;
const COMPACT_EDITOR_TOOLBAR_WIDTH_PX = 980;
const READY_TO_DOWNLOAD_TRACKED_PREFIX = 'werkcv_ready_to_download_tracked_';
const CHECKOUT_FLOW_VARIANT = 'direct' as const;

type AtsLanguageLock = 'auto' | 'nl' | 'en';
type DownloadSource = 'toolbar' | 'ready_panel' | 'post_completion_tools';
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
        sectionOrder: normalizeCvSectionOrder(data.sectionOrder),
    };
}

function deriveVisibleOptionalSections(data: CVData): Record<OptionalSectionId, boolean> {
    return {
        internships: cvSectionHasSubstantiveContent(data, "internships"),
        courses: cvSectionHasSubstantiveContent(data, "courses"),
        awards: cvSectionHasSubstantiveContent(data, "awards"),
        interests: cvSectionHasSubstantiveContent(data, "interests"),
        properties: cvSectionHasSubstantiveContent(data, "properties"),
        references: cvSectionHasSubstantiveContent(data, "references"),
        sideActivities: cvSectionHasSubstantiveContent(data, "sideActivities"),
        customSections: cvSectionHasSubstantiveContent(data, "customSections"),
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
    agencyRouteLocked = false,
    workspaceContext,
    workspaceEntitlements,
    workspaceSwitcherEnabled = false,
    mode = "account",
    publicDraftId,
    publicFlow = "consumer",
    publicSource = "public_editor",
    onPublicDownloadRequest,
}: EditorProps) {
    const isEnglish = uiLanguage === "en";
    const isPublicMode = mode === "public";
    const isMatchPackWorkspace = workspaceContext?.kind === "matchpack" || agencyRouteLocked;
    const isReadOnlyWorkspace = Boolean(isMatchPackWorkspace && workspaceContext && !workspaceContext.canEdit);
    const canChangeWorkspaceDesign = !isMatchPackWorkspace || !workspaceContext || workspaceContext.canEditDesign;
    const canDownloadWorkspace = !isMatchPackWorkspace || Boolean(workspaceContext?.canExport);
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
    const isCurrentCvEmpty = isCvEmpty(data);
    const completionState = getCompletionState(data, uiLanguage);
    const completionScore = completionState.score;
    const isReadyToDownload = completionState.isReady;
    const remainingCoreSteps = completionState.steps.filter((step) => !step.complete).length;
    const [isSaved, setIsSaved] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isPublicEditorFullscreen, setIsPublicEditorFullscreen] = useState(false);
    const [templateId, setTemplateId] = useState(initialTemplateId);
    const [colorThemeId, setColorThemeId] = useState(initialColorThemeId);
    const [showUploader, setShowUploader] = useState(false);
    const [uploaderSource, setUploaderSource] = useState<CvUploadSource>("toolbar");
    const [pageCount, setPageCount] = useState(1);
    const [desktopPreviewScale, setDesktopPreviewScale] = useState(DESKTOP_PREVIEW_SCALE);
    const [mobilePreviewScale, setMobilePreviewScale] = useState(0.42);
    const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);
    const [isFinalPdfPreviewOpen, setIsFinalPdfPreviewOpen] = useState(false);
    const [editorPaneWidth, setEditorPaneWidth] = useState(DEFAULT_EDITOR_PANE_WIDTH);
    const [panePreferenceLoaded, setPanePreferenceLoaded] = useState(false);
    const [isDesktopSplit, setIsDesktopSplit] = useState(false);
    const [isResizingPanes, setIsResizingPanes] = useState(false);
    const [isCompactToolbar, setIsCompactToolbar] = useState(false);
    const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
    const [templateSelectorSource, setTemplateSelectorSource] = useState<TemplateSelectorSource>("toolbar");
    const [showPostUploadReview, setShowPostUploadReview] = useState(false);
    const [showDesignWorkspace, setShowDesignWorkspace] = useState(() => isPublicMode || !isCvEmpty(normalizedInitialData));
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
    const publicStorageWarningRef = useRef(false);
    const editorSplitRef = useRef<HTMLDivElement>(null);
    const editorPaneRef = useRef<HTMLDivElement>(null);
    const desktopPreviewViewportRef = useRef<HTMLDivElement>(null);
    const mobilePreviewDialogRef = useRef<HTMLDialogElement>(null);
    const mobilePreviewTriggerRef = useRef<HTMLButtonElement>(null);
    const mobilePreviewPreviousFocusRef = useRef<HTMLElement | null>(null);
    const publicEditorScrollPositionRef = useRef<{ x: number; y: number } | null>(null);
    const paneResizeRef = useRef<{
        startX: number;
        startWidth: number;
        trackWidth: number;
    } | null>(null);
    const progressMilestonesTrackedRef = useRef<Set<number>>(new Set());
    const completedSectionsTrackedRef = useRef<Set<CompletionStepId>>(new Set());
    const progressTrackingInitializedRef = useRef(false);
    const readyToDownloadTrackedRef = useRef(false);
    const uploadIntentHandledRef = useRef(false);
    const matchImportHandledRef = useRef(false);
    const quickBuildViewedRef = useRef(false);
    const quickBuildStartedRef = useRef(false);
    const isGuidedBuild = !showDesignWorkspace && !isReadyToDownload;
    // Keep the guided checklist while showing the visual result immediately.
    // Editable workspaces should never make users earn access to the preview.
    const showLivePreview = isPublicMode || !isReadOnlyWorkspace || showDesignWorkspace || isReadyToDownload;
    const shouldRenderDesktopPreview = showLivePreview && (isDesktopSplit || isPublicMode);
    const previewData = isCurrentCvEmpty ? getTemplatePreviewData(uiLanguage) : data;

    useEffect(() => {
        let storedWidth: number | null = null;
        try {
            const storedValue = window.sessionStorage.getItem(EDITOR_PANE_WIDTH_STORAGE_KEY);
            if (storedValue) storedWidth = Number(storedValue);
        } catch {
            storedWidth = null;
        }

        if (storedWidth !== null && Number.isFinite(storedWidth)) {
            setEditorPaneWidth(Math.min(MAX_EDITOR_PANE_WIDTH, Math.max(MIN_EDITOR_PANE_WIDTH, storedWidth)));
        }
        setPanePreferenceLoaded(true);
    }, []);

    useEffect(() => {
        if (!panePreferenceLoaded) return;

        try {
            window.sessionStorage.setItem(
                EDITOR_PANE_WIDTH_STORAGE_KEY,
                String(Math.round(editorPaneWidth))
            );
        } catch {
            // A blocked session storage should not affect editing.
        }
    }, [editorPaneWidth, panePreferenceLoaded]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");
        const updateDesktopSplitState = () => setIsDesktopSplit(mediaQuery.matches);

        updateDesktopSplitState();
        mediaQuery.addEventListener("change", updateDesktopSplitState);
        return () => mediaQuery.removeEventListener("change", updateDesktopSplitState);
    }, []);

    useEffect(() => {
        const pane = editorPaneRef.current;
        if (!pane) return;

        const updateToolbarDensity = () => {
            setIsCompactToolbar(pane.getBoundingClientRect().width < COMPACT_EDITOR_TOOLBAR_WIDTH_PX);
        };

        updateToolbarDensity();

        if (typeof ResizeObserver === "undefined") {
            window.addEventListener("resize", updateToolbarDensity);
            return () => window.removeEventListener("resize", updateToolbarDensity);
        }

        const observer = new ResizeObserver(updateToolbarDensity);
        observer.observe(pane);
        return () => observer.disconnect();
    }, [isDesktopSplit, isGuidedBuild]);

    useEffect(() => {
        if (!isResizingPanes) return;

        const handlePointerMove = (event: PointerEvent) => {
            const resizeState = paneResizeRef.current;
            if (!resizeState) return;

            const deltaPercentage = ((event.clientX - resizeState.startX) / resizeState.trackWidth) * 100;
            const nextWidth = Math.min(
                MAX_EDITOR_PANE_WIDTH,
                Math.max(MIN_EDITOR_PANE_WIDTH, resizeState.startWidth + deltaPercentage)
            );
            setEditorPaneWidth(nextWidth);
        };
        const stopResizing = () => {
            paneResizeRef.current = null;
            setIsResizingPanes(false);
        };

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", stopResizing);
        window.addEventListener("pointercancel", stopResizing);

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", stopResizing);
            window.removeEventListener("pointercancel", stopResizing);
        };
    }, [isResizingPanes]);

    useEffect(() => {
        if (!isResizingPanes) return;

        const previousCursor = document.body.style.cursor;
        const previousUserSelect = document.body.style.userSelect;
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";

        return () => {
            document.body.style.cursor = previousCursor;
            document.body.style.userSelect = previousUserSelect;
        };
    }, [isResizingPanes]);

    const handlePaneResizePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
        if (!isDesktopSplit || isGuidedBuild || !editorSplitRef.current) return;

        event.preventDefault();
        paneResizeRef.current = {
            startX: event.clientX,
            startWidth: editorPaneWidth,
            trackWidth: editorSplitRef.current.getBoundingClientRect().width,
        };
        setIsResizingPanes(true);
    }, [editorPaneWidth, isDesktopSplit, isGuidedBuild]);

    const handlePaneResizeKeyDown = useCallback((event: ReactKeyboardEvent<HTMLDivElement>) => {
        let nextWidth: number | null = null;
        if (event.key === "ArrowLeft") nextWidth = editorPaneWidth - 5;
        if (event.key === "ArrowRight") nextWidth = editorPaneWidth + 5;
        if (event.key === "Home") nextWidth = MIN_EDITOR_PANE_WIDTH;
        if (event.key === "End") nextWidth = MAX_EDITOR_PANE_WIDTH;

        if (nextWidth === null) return;

        event.preventDefault();
        setEditorPaneWidth(Math.min(MAX_EDITOR_PANE_WIDTH, Math.max(MIN_EDITOR_PANE_WIDTH, nextWidth)));
    }, [editorPaneWidth]);

    const resetPaneWidth = useCallback(() => {
        setEditorPaneWidth(DEFAULT_EDITOR_PANE_WIDTH);
    }, []);

    useEffect(() => {
        if (!isPublicEditorFullscreen) return;

        const previousBodyOverflow = document.body.style.overflow;
        const previousDocumentOverflow = document.documentElement.style.overflow;
        const previousBodyOverflowAnchor = document.body.style.overflowAnchor;
        const previousDocumentOverflowAnchor = document.documentElement.style.overflowAnchor;
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflowAnchor = "none";
        document.documentElement.style.overflowAnchor = "none";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
                setIsPublicEditorFullscreen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousDocumentOverflow;
            document.body.style.overflowAnchor = previousBodyOverflowAnchor;
            document.documentElement.style.overflowAnchor = previousDocumentOverflowAnchor;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isPublicEditorFullscreen]);

    const handlePublicEditorFullscreenToggle = () => {
        if (!isPublicMode) return;

        if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
        const expanded = !isPublicEditorFullscreen;
        if (expanded) {
            publicEditorScrollPositionRef.current = { x: window.scrollX, y: window.scrollY };
        } else {
            const scrollPosition = publicEditorScrollPositionRef.current;
            if (scrollPosition) {
                window.setTimeout(() => {
                    if (publicEditorScrollPositionRef.current !== scrollPosition) return;
                    window.scrollTo({ left: scrollPosition.x, top: scrollPosition.y, behavior: "auto" });
                    publicEditorScrollPositionRef.current = null;
                }, 50);
            }
        }
        setIsPublicEditorFullscreen(expanded);
        track("public_editor_fullscreen_toggled", {
            location: publicSource,
            uiLanguage,
            flow: publicFlow,
            expanded,
        });
    };

    const persistPublicDraft = useCallback((currentData: CVData, nextTemplateId = templateId, nextColorThemeId = colorThemeId): boolean => {
        if (!isPublicMode || !publicDraftId) return true;

        const result = savePublicDraft({
            version: 1,
            draftId: publicDraftId,
            data: currentData,
            templateId: nextTemplateId,
            colorThemeId: nextColorThemeId,
            uiLanguage,
            flow: publicFlow,
            source: publicSource,
            updatedAt: new Date().toISOString(),
        });

        if (!result.ok && !publicStorageWarningRef.current) {
            publicStorageWarningRef.current = true;
            alert(isEnglish
                ? "Your browser could not temporarily save this CV. Remove the photo or sign in before continuing."
                : "Je browser kan dit CV niet tijdelijk opslaan. Verwijder eventueel je foto of meld je eerst aan om verder te gaan.");
        }

        return result.ok;
    }, [colorThemeId, isEnglish, isPublicMode, publicDraftId, publicFlow, publicSource, templateId, uiLanguage]);
    const downloadPriceLabel = uiLanguage === "en"
        ? cvDownloadPrice.display.replace(",", ".")
        : cvDownloadPrice.display;
    const paidDownloadCtaLabel = tr(
        "PDF downloaden",
        "Download PDF"
    );
    const readyPanelDownloadCtaLabel = tr(
        `PDF downloaden · eenmalig ${downloadPriceLabel}`,
        `Download PDF · one-time ${downloadPriceLabel}`
    );
    // Completion is guidance, not an export gate. A user may intentionally
    // download a partly completed CV and finish it later. Keep the empty-CV
    // guard so we never send someone to payment for a blank document.
    const hasExportableContent = !isCurrentCvEmpty;
    const downloadActionLabel = isMatchPackWorkspace
        ? tr("PDF exporteren", "Export PDF")
        : readyPanelDownloadCtaLabel;
    const toolbarCtaLabel = hasExportableContent
        ? downloadActionLabel
        : tr("Voeg inhoud toe om te downloaden", "Add content to download");

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
        if (isPublicMode) return;
        if (typeof window === 'undefined') return;
        const params = new URLSearchParams(window.location.search);
        if (params.get('upload') === '1' && !uploadIntentHandledRef.current) {
            uploadIntentHandledRef.current = true;
            // Consume the one-shot route intent so a refresh does not open a
            // second uploader for the same draft. The draft itself remains in
            // the URL and is therefore safe across login handoff and reload.
            params.delete('upload');
            const nextQuery = params.toString();
            window.history.replaceState(
                window.history.state,
                '',
                `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ''}${window.location.hash}`,
            );
            openUploader("route_intent");
        }
    }, [isPublicMode, openUploader]);

    useEffect(() => {
        if (isPublicMode) return;
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
                    setShowDesignWorkspace(true);
                    setVisibleOptionalSections(deriveVisibleOptionalSections(normalizedData));
                    setShowAdditionalPersonalDetails(hasAdditionalPersonalDetails(normalizedData));
                    setIsSaved(false);
                    await updateCV(id, normalizedData, { source: "upload", uiLanguage });
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
    }, [id, initialColorThemeId, initialTemplateId, isPublicMode, reset, uiLanguage]);

    useEffect(() => {
        if (isPublicMode) return;
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
                setShowDesignWorkspace(true);
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

                const updateResult = await updateCV(id, normalizedData, { source: "upload", uiLanguage });
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
    }, [id, isPublicMode, reset, uiLanguage]);

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
            const styles = window.getComputedStyle(el);
            const horizontalPadding = Number.parseFloat(styles.paddingLeft)
                + Number.parseFloat(styles.paddingRight);
            const width = Math.max(
                0,
                el.clientWidth - horizontalPadding - DESKTOP_PREVIEW_GUTTER_PX
            );
            const fitScale = width / A4_WIDTH_PX;
            const clamped = Math.max(minScale, Math.min(maxScale, fitScale));
            if (Number.isFinite(clamped)) {
                setter(clamped);
            }
        };

        const recalc = () => {
            computeScale(
                desktopPreviewViewportRef.current,
                DESKTOP_PREVIEW_MIN_SCALE,
                DESKTOP_PREVIEW_MAX_SCALE,
                setDesktopPreviewScale
            );
        };

        recalc();

        const observer = new ResizeObserver(recalc);
        if (desktopPreviewViewportRef.current) observer.observe(desktopPreviewViewportRef.current);

        return () => observer.disconnect();
    }, [shouldRenderDesktopPreview]);

    useEffect(() => {
        if (!isMobilePreviewOpen) return;

        const updateMobilePreviewScale = () => {
            const availableWidth = Math.max(0, window.innerWidth - 24);
            const nextScale = availableWidth / A4_WIDTH_PX;
            setMobilePreviewScale(Math.max(0.32, Math.min(0.9, nextScale)));
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                setIsMobilePreviewOpen(false);
                return;
            }
            if (event.key !== "Tab") return;
            const dialog = mobilePreviewDialogRef.current;
            if (!dialog) return;
            const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
                "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
            ));
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const nativeDialog = mobilePreviewDialogRef.current;
        if (nativeDialog && typeof nativeDialog.showModal === "function" && !nativeDialog.open) {
            nativeDialog.showModal();
        }
        const restoreFocusTarget = mobilePreviewPreviousFocusRef.current || mobilePreviewTriggerRef.current;
        const backgroundNodes = editorSplitRef.current
            ? Array.from(editorSplitRef.current.children).filter((node) => (
                !(node instanceof HTMLElement) || !node.hasAttribute("data-mobile-preview-dialog")
            ))
            : [];
        backgroundNodes.forEach((node) => {
            if (node instanceof HTMLElement) node.setAttribute("inert", "");
        });
        updateMobilePreviewScale();
        requestAnimationFrame(() => {
            const dialog = mobilePreviewDialogRef.current;
            const firstFocusable = dialog?.querySelector<HTMLElement>(
                "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
            );
            firstFocusable?.focus();
        });
        window.addEventListener("resize", updateMobilePreviewScale);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            backgroundNodes.forEach((node) => {
                if (node instanceof HTMLElement) node.removeAttribute("inert");
            });
            window.removeEventListener("resize", updateMobilePreviewScale);
            document.removeEventListener("keydown", handleKeyDown);
            if (nativeDialog?.open && typeof nativeDialog.close === "function") nativeDialog.close();
            if (restoreFocusTarget && document.contains(restoreFocusTarget)) restoreFocusTarget.focus();
            mobilePreviewPreviousFocusRef.current = null;
        };
    }, [isMobilePreviewOpen]);

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
        if (!isGuidedBuild || quickBuildViewedRef.current) return;
        quickBuildViewedRef.current = true;
        track('quick_build_viewed', {
            cvId: id,
            uiLanguage,
            completionScore,
            ...getEditorSearchContext(),
        });
    }, [completionScore, id, isGuidedBuild, uiLanguage]);

    const handleQuickBuildInput = useCallback(() => {
        if (!isGuidedBuild || quickBuildStartedRef.current) return;
        quickBuildStartedRef.current = true;
        track('quick_build_started', { cvId: id, completionScore });
    }, [completionScore, id, isGuidedBuild]);

    useEffect(() => {
        if (!isReadyToDownload || showDesignWorkspace) return;
        setShowDesignWorkspace(true);
        track('quick_build_completed', { cvId: id, completionScore });
    }, [completionScore, id, isReadyToDownload, showDesignWorkspace]);

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

    const moveReorderableSection = (sectionId: CvBodySectionId, direction: -1 | 1) => {
        const nextOrder = moveSectionWithinLane(data, templateId, sectionId, direction, visibleOptionalSections);
        if (nextOrder.join("|") === normalizeCvSectionOrder(data.sectionOrder).join("|")) return;
        setValue("sectionOrder", nextOrder, { shouldDirty: true });
        track("cta_clicked", {
            location: "editor_section_reorder",
            label: `${sectionId}_${direction < 0 ? "up" : "down"}`,
        });
    };

    const onSubmit = async (formData: CVData) => {
        if (!isPublicMode && isReadOnlyWorkspace) return;
        setIsSaved(false);
        if (isPublicMode) {
            const saved = persistPublicDraft(formData);
            setIsSaved(saved);
            if (saved) {
                maybeTrackCompletion(formData);
            }
            return;
        }
        const res = await updateCV(id, formData, { source: "manual_save", uiLanguage });
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
        if (!isPublicMode && isReadOnlyWorkspace) return;
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
                    const saved = isPublicMode
                        ? persistPublicDraft(currentData)
                        : (await updateCV(id, currentData, { source: "auto_save", uiLanguage })).success;
                    if (saved) {
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
    }, [isPublicMode, isReadOnlyWorkspace, maybeTrackCompletion, persistPublicDraft, watch, id, uiLanguage]);

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
        if (!canChangeWorkspaceDesign) return;
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
        if (isPublicMode) {
            setIsSaved(persistPublicDraft(watch() as CVData, newTemplateId, defaultThemeId));
            return;
        }
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
        if (!canChangeWorkspaceDesign) return;
        track('color_theme_changed', { themeId: newThemeId, templateId });
        setColorThemeId(newThemeId);
        if (isPublicMode) {
            setIsSaved(persistPublicDraft(watch() as CVData, templateId, newThemeId));
            return;
        }
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
        setShowDesignWorkspace(true);
        setSuggestedTargetRole(targetRoleSuggestion || null);
        setAtsTargetRole(normalizedData.personal.title);
        setVisibleOptionalSections(deriveVisibleOptionalSections(normalizedData));
        setShowAdditionalPersonalDetails(hasAdditionalPersonalDetails(normalizedData));
        setShowUploader(false);
        setIsSaved(false);
        setShowPostUploadReview(getCompletionState(normalizedData, uiLanguage).isReady);
        persistPublicDraft(normalizedData);
        track('cv_uploaded', { cvId: id, fileType: 'parsed', templateId, entryMethod: 'upload' });
    };

    const revealDesignWorkspace = () => {
        setShowDesignWorkspace(true);
        track('quick_build_design_revealed', { cvId: id, completionScore });
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
        if (isPublicMode) return;
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
                    internships: prev.internships || cvSectionHasSubstantiveContent(normalizedData, "internships"),
                    courses: prev.courses || cvSectionHasSubstantiveContent(normalizedData, "courses"),
                    awards: prev.awards || cvSectionHasSubstantiveContent(normalizedData, "awards"),
                    interests: prev.interests || cvSectionHasSubstantiveContent(normalizedData, "interests"),
                    properties: prev.properties || cvSectionHasSubstantiveContent(normalizedData, "properties"),
                    references: prev.references || cvSectionHasSubstantiveContent(normalizedData, "references"),
                    sideActivities: prev.sideActivities || cvSectionHasSubstantiveContent(normalizedData, "sideActivities"),
                    customSections: prev.customSections || cvSectionHasSubstantiveContent(normalizedData, "customSections"),
                }));
                setIsSaved(false);
            }
        } finally {
            setIsAtsRewriting(false);
        }
    };

    const handleDownload = async (source: DownloadSource = "toolbar") => {
        setIsDownloading(true);
        if (isPublicMode) {
            track('public_editor_download_intent', {
                location: publicSource,
                uiLanguage,
                flow: publicFlow,
                completionScore,
                templateId,
            });
        } else {
            track('pdf_download_started', { cvId: id, source, completionScore, templateId, pageCount });
        }
        try {
            if (isPublicMode) {
                const formData = ensureEditorData(watch() as CVData, uiLanguage);
                if (!persistPublicDraft(formData)) return;
                if (publicDraftId && onPublicDownloadRequest) {
                    await onPublicDownloadRequest({
                        data: formData,
                        templateId,
                        colorThemeId,
                        draftId: publicDraftId,
                        flow: publicFlow,
                        source: publicSource,
                    });
                }
                return;
            }

            // Editable documents are saved first. Approved MatchPack snapshots are
            // immutable but remain exportable through the Agency entitlement gate.
            const formData = watch();
            if (!isReadOnlyWorkspace) {
                const res = await updateCV(id, formData, { source: "download", uiLanguage });
                if (!res.success) {
                    alert(tr("Er ging iets mis bij het opslaan.", "Something went wrong while saving."));
                    return;
                }
                setIsSaved(true);
                maybeTrackCompletion(formData);
            }

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

    const desktopEditorPaneStyle = isDesktopSplit && showLivePreview
        ? { flex: `0 0 ${editorPaneWidth}%`, minWidth: 0 }
        : undefined;
    const desktopPreviewPaneStyle = isDesktopSplit && showLivePreview
        ? { flex: `0 0 ${100 - editorPaneWidth}%`, minWidth: 0 }
        : undefined;

    const editorMarkup = (
        <div
            ref={editorSplitRef}
            className={`${isPublicEditorFullscreen ? "" : "relative"} flex flex-col lg:flex-row bg-[#FFFEF9] font-sans text-slate-900 overflow-hidden ${isResizingPanes ? "select-none" : ""} ${isPublicMode
            ? isPublicEditorFullscreen
                ? "fixed inset-0 z-[70] h-[100dvh] min-h-0 w-full rounded-none border-0 shadow-none"
                : "h-[980px] min-h-[760px] rounded-2xl border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.12)] lg:h-[760px]"
            : "h-screen"
        }`}
        >
            {/* Left: Editor Form */}
            <div
                ref={editorPaneRef}
                className={`flex w-full min-h-0 flex-col border-r-0 border-slate-200 bg-[#FFFEF9] z-10 ${isPublicMode
                ? isPublicEditorFullscreen
                    ? "h-[55%] min-h-0 shrink-0 lg:h-auto lg:w-1/2 lg:flex-none lg:border-r"
                    : "h-[540px] shrink-0 lg:h-auto lg:w-1/2 lg:flex-none lg:border-r"
                : `h-screen ${showLivePreview ? "lg:w-1/2 lg:flex-none lg:border-r" : "lg:w-full"}`
            }`}
                style={desktopEditorPaneStyle}
            >
                {/* Toolbar */}
                <div className="sticky top-0 z-20 flex min-h-14 w-full min-w-0 items-center justify-between gap-2 border-b border-slate-200 bg-white/95 px-2 py-2 backdrop-blur sm:px-3">
                    {/* Left side - Logo and tools */}
                    <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden sm:gap-2">
                        <Link
                            href={isEnglish ? "/en" : "/"}
                            className={isCompactToolbar ? "hidden" : "hidden shrink-0 items-center gap-1 lg:flex"}
                        >
                            <span className="font-semibold text-lg sm:text-xl tracking-tight text-slate-900">
                                Werk<span className="bg-[#4ECDC4] px-1 rounded-sm">CV</span>.nl
                            </span>
                        </Link>
                        {workspaceContext && !isPublicMode ? (
                            <Link
                                href={isEnglish && workspaceContext.kind === "personal" ? "/en" : workspaceContext.backHref}
                                className="hidden min-w-0 max-w-[10rem] truncate rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600 transition-colors hover:border-emerald-300 hover:text-emerald-800 sm:inline-flex"
                                title={tr("Terug naar werkruimte", "Back to workspace")}
                            >
                                ← {isEnglish && workspaceContext.kind === "personal" ? "English CV" : workspaceContext.label}
                            </Link>
                        ) : null}
                        {workspaceEntitlements && workspaceSwitcherEnabled && !isPublicMode ? (
                            <WorkspaceSwitcher
                                workspaces={workspaceEntitlements}
                                currentWorkspace={isMatchPackWorkspace ? "matchpack" : "personal"}
                                locale={isEnglish ? "en" : "nl"}
                                compact
                            />
                        ) : null}
                        {isGuidedBuild ? (
                            <div className="relative flex shrink-0 items-center gap-1 sm:gap-2">
                                <span className={isCompactToolbar
                                    ? "hidden"
                                    : "hidden rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-[11px] font-bold text-teal-800 sm:inline-flex"}>
                                    {tr("Stap voor stap", "Guided build")}
                                </span>
                                <TemplateSelector
                                    currentTemplateId={templateId}
                                    data={data}
                                    isOpen={isTemplateSelectorOpen}
                                    reviewMode={false}
                                    compactToolbar={isCompactToolbar}
                                    triggerLabel={tr("Template", "Template")}
                                    onOpen={() => openTemplateSelector("toolbar")}
                                    onClose={closeTemplateSelector}
                                    onSelectTemplate={handleTemplateChange}
                                    uiLanguage={uiLanguage}
                                />
                                <ColorThemePicker
                                    templateId={templateId}
                                    currentThemeId={colorThemeId}
                                    onSelectTheme={handleColorThemeChange}
                                    uiLanguage={uiLanguage}
                                />
                            </div>
                        ) : isMatchPackWorkspace && canChangeWorkspaceDesign ? (
                            <div className="relative flex shrink-0 items-center gap-1 sm:gap-2">
                                <TemplateSelector
                                    currentTemplateId={templateId}
                                    data={data}
                                    isOpen={isTemplateSelectorOpen}
                                    reviewMode={isReadyToDownload}
                                    compactToolbar={false}
                                    triggerLabel={tr("Design wijzigen", "Change design")}
                                    onOpen={() => openTemplateSelector(isReadyToDownload ? "ready_state" : "toolbar")}
                                    onClose={closeTemplateSelector}
                                    onSelectTemplate={handleTemplateChange}
                                    uiLanguage={uiLanguage}
                                />
                                <ColorThemePicker
                                    templateId={templateId}
                                    currentThemeId={colorThemeId}
                                    onSelectTheme={handleColorThemeChange}
                                    uiLanguage={uiLanguage}
                                />
                            </div>
                        ) : isMatchPackWorkspace ? (
                            <span className="inline-flex shrink-0 items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                                {tr("Ontwerp vergrendeld", "Design locked")}
                            </span>
                        ) : (
                            <div className="relative flex shrink-0 items-center gap-1 sm:gap-2">
                                <TemplateSelector
                                    currentTemplateId={templateId}
                                    data={data}
                                    isOpen={isTemplateSelectorOpen}
                                    reviewMode={isReadyToDownload}
                                    compactToolbar={isCompactToolbar}
                                    onOpen={() => openTemplateSelector(isReadyToDownload ? "ready_state" : "toolbar")}
                                    onClose={closeTemplateSelector}
                                    onSelectTemplate={handleTemplateChange}
                                    uiLanguage={uiLanguage}
                                />
                                <ColorThemePicker
                                    templateId={templateId}
                                    currentThemeId={colorThemeId}
                                    onSelectTheme={handleColorThemeChange}
                                    uiLanguage={uiLanguage}
                                />
                            </div>
                        )}
                    </div>

                    {/* Right side - Save and Download */}
                    <div className="flex shrink-0 items-center">
                        {isReadOnlyWorkspace ? (
                            <span className="mr-2 hidden max-w-[12rem] truncate text-[11px] font-semibold text-slate-500 lg:inline" role="status">
                                {tr("Alleen bekijken", "View only")}
                            </span>
                        ) : null}
                        <div className="flex items-center gap-1 sm:gap-2">
                            {!isCurrentCvEmpty && !isReadOnlyWorkspace ? (
                                <button
                                    type="button"
                                    onClick={() => openUploader("toolbar")}
                                    className={`inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 ${isCompactToolbar ? "w-9 px-0" : "px-2.5 sm:px-3"}`}
                                    title={tr("Upload je bestaande CV", "Upload your existing CV")}
                                    aria-label={tr("Upload je bestaande CV", "Upload your existing CV")}
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    <span className={isCompactToolbar ? "hidden" : "hidden sm:inline"}>{tr("CV uploaden", "Upload CV")}</span>
                                </button>
                            ) : null}
                            <button
                                type="button"
                                onClick={() => {
                                    track("cta_clicked", { location: "editor_mobile_preview", label: "open_preview" });
                                    mobilePreviewPreviousFocusRef.current = document.activeElement as HTMLElement | null;
                                    setIsMobilePreviewOpen(true);
                                }}
                                ref={mobilePreviewTriggerRef}
                                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-sky-300 bg-sky-50 px-2.5 text-xs font-semibold text-sky-800 transition-colors hover:bg-sky-100 lg:hidden"
                                aria-label={tr("Voorbeeld bekijken", "View preview")}
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 12s3.5-6 9.75-6 9.75 6 9.75 6-3.5 6-9.75 6-9.75-6-9.75-6Z" />
                                    <circle cx="12" cy="12" r="2.5" strokeWidth={2} />
                                </svg>
                                <span className="hidden min-[380px]:inline">{tr("Voorbeeld", "Preview")}</span>
                            </button>
                            {isPublicMode ? (
                                <button
                                    type="button"
                                    onClick={handlePublicEditorFullscreenToggle}
                                    aria-pressed={isPublicEditorFullscreen}
                                    className={`inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 ${isCompactToolbar ? "w-9 px-0" : "px-2.5 sm:px-3"}`}
                                    title={isPublicEditorFullscreen
                                        ? tr("Volledig scherm sluiten", "Exit full screen")
                                        : tr("Open in volledig scherm", "Open full screen")}
                                    aria-label={isPublicEditorFullscreen
                                        ? tr("Volledig scherm sluiten", "Exit full screen")
                                        : tr("Open in volledig scherm", "Open full screen")}
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        {isPublicEditorFullscreen ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M9 4H4v5m0-5 6 6M15 20h5v-5m0 5-6-6" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M4 9V4h5M4 4l6 6m10 5v5h-5m5 0-6-6" />
                                        )}
                                    </svg>
                                    <span className={isCompactToolbar ? "hidden" : "hidden md:inline"}>
                                        {isPublicEditorFullscreen
                                            ? tr("Sluiten", "Exit")
                                            : tr("Volledig scherm", "Full screen")}
                                    </span>
                                </button>
                            ) : null}
                            <button
                                onClick={handleSubmit(onSubmit)}
                                disabled={isSubmitting || isSaved || isReadOnlyWorkspace}
                                title={tr("CV opslaan", "Save CV")}
                                aria-label={tr("CV opslaan", "Save CV")}
                                className={`${isCompactToolbar ? "h-9 min-w-9 px-2" : "px-3 sm:px-4"} py-2 font-semibold text-xs sm:text-sm rounded-md border transition-colors ${isSaved
                                        ? "border-transparent bg-transparent text-emerald-700 cursor-default"
                                        : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50"
                                    }`}
                            >
                                {isCompactToolbar ? (
                                    isSubmitting ? "…" : isSaved ? "✓" : tr("Opslaan", "Save")
                                ) : (
                                    isSubmitting
                                        ? tr("Opslaan...", "Saving...")
                                        : isSaved
                                            ? `✓ ${tr("Opgeslagen", "Saved")}`
                                            : tr("Opslaan", "Save")
                                )}
                            </button>
                            <button
                                onClick={() => {
                                    if (!hasExportableContent) {
                                        if (completionState.nextStep) scrollToCompletionStep(completionState.nextStep);
                                        return;
                                    }
                                    void handleDownload("toolbar");
                                }}
                                disabled={isDownloading || !canDownloadWorkspace}
                                aria-label={isDownloading ? tr("PDF wordt gemaakt", "Generating PDF") : toolbarCtaLabel}
                                title={toolbarCtaLabel}
                                className={`${isCompactToolbar ? "px-2" : "px-3 sm:px-4"} py-2 font-semibold text-xs sm:text-sm rounded-md border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${hasExportableContent
                                    ? "border-emerald-700 bg-emerald-600 text-white hover:bg-emerald-700"
                                    : "border-slate-800 bg-slate-900 text-white hover:bg-slate-800"
                                }`}
                            >
                                {isDownloading ? (
                                    isCompactToolbar ? "…" : tr("Bezig...", "Working...")
                                ) : (
                                    isCompactToolbar ? (
                                        hasExportableContent ? "PDF" : tr("Start", "Start")
                                    ) : (
                                        <>
                                            <span className="sm:hidden">
                                                {hasExportableContent ? "PDF" : tr("Start", "Start")}
                                            </span>
                                            <span className="hidden sm:inline">{toolbarCtaLabel}</span>
                                        </>
                                    )
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scrollable Form Area */}
                <div
                    className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5 scroll-smooth bg-[#FFFEF9]"
                    onInputCapture={handleQuickBuildInput}
                >
                    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 pb-12">

                        {isGuidedBuild ? (
                            <section className="rounded-2xl border border-teal-200 bg-white p-4 shadow-sm sm:p-5">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="min-w-0">
                                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">
                                            {tr("Eerst de inhoud", "Content first")}
                                        </p>
                                        <h1 className="mt-1 text-lg font-semibold text-slate-950">
                                            {tr("Maak je CV af in 5 duidelijke stappen", "Complete your CV in 5 clear steps")}
                                        </h1>
                                        <p className="mt-1 text-sm font-medium text-slate-600">
                                            {tr(
                                                "Vul alleen de basis in. Template, kleur, foto en extra onderdelen komen daarna.",
                                                "Add the essentials first. Template, colour, photo, and extra sections come afterwards."
                                            )}
                                        </p>
                                        <div className="mt-3 flex items-center gap-3">
                                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                                                <div className="h-full rounded-full bg-teal-600 transition-all duration-300" style={{ width: `${completionScore}%` }} />
                                            </div>
                                            <span className="shrink-0 text-xs font-bold text-slate-600">{completionScore}%</span>
                                        </div>
                                    </div>
                                    {completionState.nextStep ? (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                track('quick_build_next_clicked', {
                                                    cvId: id,
                                                    step: completionState.nextStep?.id || 'unknown',
                                                    completionScore,
                                                });
                                                scrollToCompletionStep(completionState.nextStep!);
                                            }}
                                            className="inline-flex shrink-0 items-center justify-center rounded-md border border-teal-800 bg-teal-700 px-5 py-3 text-sm font-black text-white transition-colors hover:bg-teal-800"
                                        >
                                            {tr(`Volgende: ${completionState.nextStep.label}`, `Next: ${completionState.nextStep.label}`)} →
                                        </button>
                                    ) : null}
                                </div>
                                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-3 text-xs font-semibold">
                                    <button type="button" onClick={() => openUploader("empty_state")} disabled={isReadOnlyWorkspace} className="text-teal-800 underline underline-offset-2 hover:text-teal-950 disabled:cursor-not-allowed disabled:opacity-50">
                                        {tr("Heb je al een CV? Upload het", "Already have a CV? Upload it")}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => openTemplateSelector("toolbar")}
                                        className="text-teal-800 underline underline-offset-2 hover:text-teal-950"
                                    >
                                        {tr("Bekijk voorbeeldtemplates", "Preview template examples")}
                                    </button>
                                    <button type="button" onClick={revealDesignWorkspace} className="text-slate-500 underline underline-offset-2 hover:text-slate-800">
                                        {tr("Alle CV-onderdelen tonen", "Show all CV sections")}
                                    </button>
                                </div>
                            </section>
                        ) : (
                            <CompletionPanel
                                state={completionState}
                                onGoToStep={scrollToCompletionStep}
                                uiLanguage={uiLanguage}
                            />
                        )}

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

                        {!isGuidedBuild && !isReadyToDownload && isCurrentCvEmpty ? (
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
                                            if (!isReadOnlyWorkspace) openUploader("empty_state");
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
                                            track("cta_clicked", { location: "editor_upload_success", label: "continue_in_editor" });
                                            setShowPostUploadReview(false);
                                        }}
                                        className="inline-flex shrink-0 items-center justify-center rounded-md border border-blue-800 bg-blue-700 px-5 py-3 text-sm font-black text-white transition-colors hover:bg-blue-800"
                                    >
                                        {tr("Verder in editor →", "Continue in editor →")}
                                    </button>
                                </div>
                            </section>
                        ) : null}

                        {isReadyToDownload && !showPostUploadReview && !isPublicMode ? (
                            <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm sm:p-5">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                                            {tr("Klaar voor download", "Ready to download")}
                                        </p>
                                        <h2 className="mt-1 text-lg font-semibold text-slate-950">
                                            {tr("Je CV is klaar om te versturen.", "Your CV is ready to send.")}
                                        </h2>
                                        <p className="mt-1 text-sm font-medium text-slate-600">
                                            {tr(
                                                `Controleer eerst je volledige CV. De knop opent de betaalstap: daarna download je direct je PDF voor eenmalig ${downloadPriceLabel}. Geen abonnement en geen automatische verlenging.`,
                                                `Review your complete CV first. The button opens checkout: after payment, download your PDF immediately for a one-time ${downloadPriceLabel}. No subscription and no automatic renewal.`
                                            )}
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-emerald-800">
                                            <span className="rounded-full border border-emerald-300 bg-white px-2.5 py-1">
                                                {tr(`Eenmalig ${downloadPriceLabel}`, `One-time ${downloadPriceLabel}`)}
                                            </span>
                                            <span className="rounded-full border border-emerald-300 bg-white px-2.5 py-1">
                                                {tr("Geen abonnement", "No subscription")}
                                            </span>
                                            <span className="rounded-full border border-emerald-300 bg-white px-2.5 py-1">
                                                {tr("PDF direct na betaling", "PDF immediately after payment")}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleDownload("ready_panel")}
                                        disabled={isDownloading || !canDownloadWorkspace}
                                        className="inline-flex shrink-0 items-center justify-center rounded-md border border-emerald-700 bg-emerald-600 px-5 py-3 text-sm font-black text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isDownloading
                                            ? tr("Bezig...", "Working...")
                                            : readyPanelDownloadCtaLabel}
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

                            {!isGuidedBuild ? <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
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
                            </div> : null}

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

                        {!isGuidedBuild ? (
                            <SectionOrderPanel
                                layout={resolveCvSectionLayout(data, templateId, visibleOptionalSections)}
                                uiLanguage={uiLanguage}
                                onMove={moveReorderableSection}
                            />
                        ) : null}

                        {getOrderedSectionIds(data, visibleOptionalSections).map((sectionId) => {
                            if (
                                isGuidedBuild
                                && !["experience", "education", "skills"].includes(sectionId)
                            ) return null;

                            const section = sectionId === "experience"
                                ? <ExperienceSection control={control} register={register} uiLanguage={uiLanguage} />
                                : sectionId === "education"
                                    ? <EducationSection control={control} register={register} uiLanguage={uiLanguage} />
                                    : sectionId === "skills"
                                        ? <SkillsSection control={control} register={register} uiLanguage={uiLanguage} />
                                        : sectionId === "languages"
                                            ? <LanguagesSection control={control} register={register} uiLanguage={uiLanguage} />
                                            : sectionId === "internships"
                                                ? <InternshipsSection control={control} register={register} uiLanguage={uiLanguage} />
                                                : sectionId === "courses"
                                                    ? <CoursesSection control={control} register={register} uiLanguage={uiLanguage} />
                                                    : sectionId === "awards"
                                                        ? <AwardsSection control={control} register={register} uiLanguage={uiLanguage} />
                                                        : sectionId === "interests"
                                                            ? <InterestsSection control={control} register={register} uiLanguage={uiLanguage} />
                                                            : sectionId === "properties"
                                                                ? <PropertiesSection control={control} register={register} uiLanguage={uiLanguage} />
                                                                : sectionId === "references"
                                                                    ? <ReferencesSection control={control} register={register} uiLanguage={uiLanguage} />
                                                                    : sectionId === "sideActivities"
                                                                        ? <SideActivitiesSection control={control} register={register} uiLanguage={uiLanguage} />
                                                                        : sectionId === "customSections"
                                                                            ? <CustomSectionsSection control={control} register={register} uiLanguage={uiLanguage} />
                                                            : null;

                            return section ? (
                                <div key={sectionId} id={`section-${sectionId}`} className="scroll-mt-28">
                                    {section}
                                </div>
                            ) : null;
                        })}

                        <div className={isGuidedBuild ? "hidden" : "contents"} aria-hidden={isGuidedBuild}>
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
                                            : tr("Je kunt je CV nu al downloaden. Vul deze onderdelen aan als je de inhoud verder wilt versterken.", "You can download your CV now. Complete these sections if you want to strengthen the content further.")}
                                    </p>
                                </div>
                                {isReadyToDownload ? (
                                    <button
                                        type="button"
                                        onClick={() => handleDownload("post_completion_tools")}
                                        disabled={isDownloading || !canDownloadWorkspace}
                                        className="inline-flex shrink-0 items-center justify-center rounded-md border border-emerald-700 bg-emerald-600 px-4 py-2 text-xs font-black text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isDownloading
                                            ? tr("Bezig...", "Working...")
                                            : paidDownloadCtaLabel}
                                    </button>
                                ) : null}
                            </div>

                            <div className="mt-5 grid gap-4">
                                <CvScoreWidget data={data} uiLanguage={uiLanguage} />
                                {!isPublicMode ? (
                                    <KeywordScannerWidget
                                        data={data}
                                        jobDescription={targetVacancy}
                                        onJobDescriptionChange={setTargetVacancy}
                                        uiLanguage={uiLanguage}
                                    />
                                ) : (
                                    <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs font-semibold leading-relaxed text-slate-600">
                                        {tr("ATS- en vacaturematching komt beschikbaar nadat je je CV hebt opgeslagen.", "ATS and vacancy matching become available after you save your CV.")}
                                    </p>
                                )}
                            </div>
                        </section>

                        {isReadyToDownload && !isPublicMode ? (
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
            </div>

            {showLivePreview ? (
                <div
                    role="separator"
                    aria-orientation="vertical"
                    aria-label={tr("Editor en preview verdelen", "Resize editor and preview")}
                    aria-valuemin={MIN_EDITOR_PANE_WIDTH}
                    aria-valuemax={MAX_EDITOR_PANE_WIDTH}
                    aria-valuenow={Math.round(editorPaneWidth)}
                    aria-valuetext={`${Math.round(editorPaneWidth)}% ${tr("editor", "editor")} / ${Math.round(100 - editorPaneWidth)}% ${tr("preview", "preview")}`}
                    tabIndex={0}
                    onPointerDown={handlePaneResizePointerDown}
                    onKeyDown={handlePaneResizeKeyDown}
                    onDoubleClick={resetPaneWidth}
                    className="pointer-events-auto absolute inset-y-0 z-30 hidden w-5 -translate-x-1/2 touch-none items-center justify-center cursor-col-resize lg:flex"
                    style={{ left: `${editorPaneWidth}%` }}
                >
                    <span className="flex h-16 w-2 items-center justify-center rounded-full border border-slate-300 bg-white shadow-sm transition-colors hover:border-emerald-400 hover:bg-emerald-50 focus-visible:border-emerald-500">
                        <span className="h-8 w-0.5 rounded-full bg-slate-400" aria-hidden="true" />
                    </span>
                </div>
            ) : null}

            {/* Right: Live Preview */}
            {shouldRenderDesktopPreview ? <div
                className={`flex flex-col bg-[#f0faf9] overflow-hidden ${isPublicMode
                ? isPublicEditorFullscreen
                    ? "h-[45%] min-h-0 shrink-0 lg:h-auto lg:w-1/2 lg:flex-none"
                    : "h-[420px] shrink-0 lg:h-auto lg:w-1/2 lg:flex-none"
                : "hidden lg:flex lg:w-1/2 lg:flex-none"
            }`}
                style={desktopPreviewPaneStyle}
            >
                {/* Fixed header */}
                <div className="shrink-0 flex items-center justify-between px-4 py-2.5 bg-white/95 backdrop-blur border-b border-slate-200">
                    <div className="flex min-w-0 items-center gap-2">
                        <span className="text-xs font-semibold text-slate-600">{tr("Live preview", "Live preview")}</span>
                        {isCurrentCvEmpty ? (
                            <span className="truncate rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                                {tr("Voorbeeldtemplate", "Example template")}
                            </span>
                        ) : null}
                    </div>
                    <div className="flex items-center gap-2">
                        {!isPublicMode && !isMatchPackWorkspace ? (
                            <button
                                type="button"
                                onClick={() => setIsFinalPdfPreviewOpen(true)}
                                className="rounded-md border border-emerald-300 bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-800 transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                            >
                                {tr("Definitieve PDF", "Final PDF")}
                            </button>
                        ) : null}
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
                    </div>
                </div>
                {/* Scrollable preview area */}
                <div
                    ref={desktopPreviewViewportRef}
                    data-live-preview-viewport
                    className="min-h-0 flex-1 overflow-y-auto p-2 flex justify-center items-start"
                >
                    <ScaledCvPreview
                        data={previewData}
                        templateId={templateId}
                        colorThemeId={colorThemeId}
                        scale={desktopPreviewScale}
                        pageCount={pageCount}
                        paginated
                        onPageCountChange={handlePageCountChange}
                    />
                </div>
            </div> : null}

            {isMobilePreviewOpen ? (
                <dialog
                    ref={mobilePreviewDialogRef}
                    data-mobile-preview-dialog
                    className="fixed inset-0 z-[80] m-0 flex h-[100dvh] max-h-none w-full max-w-none flex-col border-0 bg-[#edf7f6] p-0 backdrop:bg-slate-950/35 lg:hidden"
                    aria-labelledby="mobile-preview-title"
                    onCancel={(event) => {
                        event.preventDefault();
                        setIsMobilePreviewOpen(false);
                    }}
                >
                    <header className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-3 py-3 shadow-sm">
                        <div className="flex min-w-0 items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setIsMobilePreviewOpen(false)}
                                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white text-lg font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                                aria-label={tr("Sluit voorbeeld", "Close preview")}
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                            <div className="min-w-0">
                                <h2 id="mobile-preview-title" className="truncate text-sm font-bold text-slate-900">
                                    {tr("Live voorbeeld", "Live preview")}
                                </h2>
                                <p className="truncate text-[11px] font-medium text-slate-500">
                                    {isCurrentCvEmpty
                                        ? tr("Voorbeeldtemplate — jouw gegevens verschijnen hier", "Example template — your details will appear here")
                                        : tr("Dit is hoe je CV er nu uitziet", "This is how your CV looks now")}
                                </p>
                            </div>
                        </div>
                        <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-bold text-slate-600">
                            {pageCount} {tr("pagina's", "pages")}
                        </span>
                    </header>

                    <div className="min-h-0 flex-1 overflow-auto p-3">
                        <div className="mx-auto w-max rounded-md border border-slate-200 bg-white p-2 shadow-lg">
                            <ScaledCvPreview
                                data={previewData}
                                templateId={templateId}
                                colorThemeId={colorThemeId}
                                scale={mobilePreviewScale}
                                pageCount={pageCount}
                                paginated
                                onPageCountChange={handlePageCountChange}
                            />
                        </div>
                    </div>

                    <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 bg-white px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                        <button
                            type="button"
                            onClick={() => setIsMobilePreviewOpen(false)}
                            className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                        >
                            {tr("Terug naar editor", "Back to editor")}
                        </button>
                        {!isPublicMode && !isMatchPackWorkspace ? (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsMobilePreviewOpen(false);
                                    setIsFinalPdfPreviewOpen(true);
                                }}
                                className="inline-flex min-h-11 items-center justify-center rounded-md border border-emerald-300 bg-emerald-50 px-3 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                            >
                                {tr("Bekijk definitieve PDF", "View final PDF")}
                            </button>
                        ) : null}
                        <span className="text-right text-[11px] font-medium leading-relaxed text-slate-500">
                            {tr("Wijzigingen worden automatisch opgeslagen.", "Changes save automatically.")}
                        </span>
                    </footer>
                </dialog>
            ) : null}

            {isFinalPdfPreviewOpen && !isPublicMode && !isMatchPackWorkspace ? (
                <FullCvPreviewDialog
                    cvId={id}
                    data={data}
                    templateId={templateId}
                    colorThemeId={colorThemeId}
                    completionScore={completionScore}
                    isReady={isReadyToDownload}
                    remainingSteps={remainingCoreSteps}
                    isSaved={isSaved}
                    isSaving={!isSaved}
                    isDownloading={isDownloading}
                    pageCount={pageCount}
                    source="desktop_preview_header"
                    uiLanguage={uiLanguage}
                    onClose={() => setIsFinalPdfPreviewOpen(false)}
                    onContinueEditing={() => setIsFinalPdfPreviewOpen(false)}
                    onDownload={() => handleDownload("toolbar")}
                    onPageCountChange={setPageCount}
                    onSelectTemplate={handleTemplateChange}
                    onSelectTheme={handleColorThemeChange}
                />
            ) : null}

            {!isPublicMode ? (
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
            ) : null}

            {/* CV Upload Modal */}
            {showUploader && (
                <CVUploader
                    cvId={id}
                    source={uploaderSource}
                    onParsed={handleCVParsed}
                    onClose={() => setShowUploader(false)}
                    uiLanguage={uiLanguage}
                    endpoint={isPublicMode ? "/api/public/cv/parse" : undefined}
                    allowLegacyDoc={!isPublicMode}
                    maxFileSizeMb={isPublicMode ? 5 : 10}
                />
            )}

        </div>
    );

    return isPublicEditorFullscreen && typeof document !== "undefined"
        ? createPortal(editorMarkup, document.body)
        : editorMarkup;
}
