"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { CVData } from "@/lib/cv";
import { updateCV, updateCVTemplate, updateCVColorTheme, getCheckoutURL } from "../actions";
import Preview from "./preview";
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
import type { CheckoutProduct } from "@/lib/polar";
import { applicationBundlePrice, cvDownloadPrice } from "@/lib/site-content";
import {
    hasCompletionTracked,
    hasEditorStartedTracked,
    markCompletionTracked,
    markEditorStartedTracked,
    track
} from "@/lib/analytics";
import { UiLanguage } from "@/lib/ui-language";
import {
    getCompletionState,
    type CompletionState,
    type CompletionStep,
    type CompletionStepId,
} from "@/lib/cv-completion";
import { getTargetVacancySessionKey } from "@/lib/cover-letter-session";

interface EditorProps {
    initialData: CVData;
    id: string;
    initialTemplateId: string;
    initialColorThemeId: string;
    uiLanguage?: UiLanguage;
}

// Reusable input styles for cleaner, calmer form UI
const inputClass = "w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100";
const inputStyle = undefined;
const DESKTOP_PREVIEW_SCALE = 0.58;
const MOBILE_PREVIEW_SCALE = 0.44;
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;
const CHECKOUT_EXPERIMENT_STORAGE_KEY = 'werkcv_checkout_variant_v1';
const CHECKOUT_EXPERIMENT_TRACKED_PREFIX = 'werkcv_checkout_variant_tracked_';
const READY_TO_DOWNLOAD_TRACKED_PREFIX = 'werkcv_ready_to_download_tracked_';

type AtsLanguageLock = 'auto' | 'nl' | 'en';
type CheckoutModalCloseReason = 'later_button' | 'close_button' | 'overlay';
type CheckoutExperimentVariant = 'modal' | 'direct';
type DownloadSource = 'toolbar' | 'post_completion_tools';
type OptionalSectionId =
    | 'internships'
    | 'courses'
    | 'awards'
    | 'interests'
    | 'properties'
    | 'references'
    | 'sideActivities'
    | 'customSections';

function isCheckoutExperimentVariant(value: string | null): value is CheckoutExperimentVariant {
    return value === 'modal' || value === 'direct';
}

function resolveCheckoutExperimentVariant(): CheckoutExperimentVariant {
    const params = new URLSearchParams(window.location.search);
    const forcedVariant = params.get('checkout');
    if (isCheckoutExperimentVariant(forcedVariant)) {
        window.localStorage.setItem(CHECKOUT_EXPERIMENT_STORAGE_KEY, forcedVariant);
        return forcedVariant;
    }

    const storedVariant = window.localStorage.getItem(CHECKOUT_EXPERIMENT_STORAGE_KEY);
    if (isCheckoutExperimentVariant(storedVariant)) return storedVariant;

    const assignedVariant: CheckoutExperimentVariant = Math.random() < 0.5 ? 'modal' : 'direct';
    window.localStorage.setItem(CHECKOUT_EXPERIMENT_STORAGE_KEY, assignedVariant);
    return assignedVariant;
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
    const checkoutBenefits = isEnglish
        ? [
            `One-time ${cvDownloadPrice.display.replace(",", ".")} payment for this CV`,
            "No subscription or automatic renewal",
            "You only pay for this PDF download",
            "Edit this CV later and re-download it for free",
            "Professional PDF available immediately",
        ]
        : [
            `Eenmalig ${cvDownloadPrice.display} voor dit CV`,
            "Geen abonnement of automatische verlenging",
            "Je betaalt alleen voor deze PDF-download",
            "Dit CV later gratis aanpassen en opnieuw downloaden",
            "Professionele PDF direct beschikbaar",
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
    const [showMobilePreview, setShowMobilePreview] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [desktopPreviewScale, setDesktopPreviewScale] = useState(DESKTOP_PREVIEW_SCALE);
    const [mobilePreviewScale, setMobilePreviewScale] = useState(MOBILE_PREVIEW_SCALE);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [showTemplateHint, setShowTemplateHint] = useState(false);
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [checkoutExperimentVariant, setCheckoutExperimentVariant] = useState<CheckoutExperimentVariant>('modal');
    const [visibleOptionalSections, setVisibleOptionalSections] = useState<Record<OptionalSectionId, boolean>>(
        () => deriveVisibleOptionalSections(normalizedInitialData)
    );
    const [showAdditionalPersonalDetails, setShowAdditionalPersonalDetails] = useState(
        () => hasAdditionalPersonalDetails(normalizedInitialData)
    );
    const [isCheckoutRedirecting, setIsCheckoutRedirecting] = useState(false);
    const [isAtsRewriting, setIsAtsRewriting] = useState(false);
    const [atsTargetRole, setAtsTargetRole] = useState(initialData.personal.title || '');
    const [targetVacancy, setTargetVacancy] = useState('');
    const [atsLanguageLock, setAtsLanguageLock] = useState<AtsLanguageLock>('auto');
    const desktopPreviewViewportRef = useRef<HTMLDivElement>(null);
    const mobilePreviewViewportRef = useRef<HTMLDivElement>(null);
    const progressMilestonesTrackedRef = useRef<Set<number>>(new Set());
    const completedSectionsTrackedRef = useRef<Set<CompletionStepId>>(new Set());
    const progressTrackingInitializedRef = useRef(false);
    const readyToDownloadTrackedRef = useRef(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const params = new URLSearchParams(window.location.search);
        if (params.get('upload') === '1') {
            setShowUploader(true);
        }
    }, []);

    useEffect(() => {
        const variant = resolveCheckoutExperimentVariant();
        setCheckoutExperimentVariant(variant);

        const trackedKey = `${CHECKOUT_EXPERIMENT_TRACKED_PREFIX}${id}`;
        if (window.sessionStorage.getItem(trackedKey)) return;
        track('checkout_experiment_assigned', { cvId: id, variant, uiLanguage });
        window.sessionStorage.setItem(trackedKey, '1');
    }, [id, uiLanguage]);

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
            computeScale(mobilePreviewViewportRef.current, 0.36, 0.65, setMobilePreviewScale);
        };

        recalc();

        const observer = new ResizeObserver(recalc);
        if (desktopPreviewViewportRef.current) observer.observe(desktopPreviewViewportRef.current);
        if (mobilePreviewViewportRef.current) observer.observe(mobilePreviewViewportRef.current);

        return () => observer.disconnect();
    }, [showMobilePreview]);

    // Show onboarding for empty CVs on first visit
    useEffect(() => {
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

        track('editor_started', { cvId: id, fromPath });
        markEditorStartedTracked(id);
    }, [id]);

    useEffect(() => {
        if (!showCheckoutModal) return;
        track('checkout_modal_viewed', { cvId: id, source: 'pdf_download', experimentVariant: checkoutExperimentVariant });
        track('checkout_option_viewed', {
            cvId: id,
            product: "cv-profile-photo-bundle",
            amountCents: applicationBundlePrice.amountCents,
            uiLanguage,
            recommended: true,
        });
        track('checkout_option_viewed', {
            cvId: id,
            product: "cv-download",
            amountCents: cvDownloadPrice.amountCents,
            uiLanguage,
            recommended: false,
        });
    }, [checkoutExperimentVariant, showCheckoutModal, id, uiLanguage]);

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

    const handleDismissOnboarding = () => {
        setShowOnboarding(false);
        localStorage.setItem('werkcv-onboarding-dismissed', 'true');
        track('onboarding_dismissed', { action: 'start_typing' });
        // Show template hint after dismissing
        setShowTemplateHint(true);
        setTimeout(() => setShowTemplateHint(false), 5000);
    };

    const handleOnboardingUpload = () => {
        setShowOnboarding(false);
        localStorage.setItem('werkcv-onboarding-dismissed', 'true');
        track('onboarding_dismissed', { action: 'upload_cv' });
        setShowUploader(true);
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
        track('template_selected', { templateId: newTemplateId, previousId: templateId });
        setTemplateId(newTemplateId);
        setColorThemeId(defaultThemeId);
        await updateCVTemplate(id, newTemplateId);
        await updateCVColorTheme(id, defaultThemeId);
    };

    const handleColorThemeChange = async (newThemeId: string) => {
        track('color_theme_changed', { themeId: newThemeId, templateId });
        setColorThemeId(newThemeId);
        await updateCVColorTheme(id, newThemeId);
    };

    const handleCVParsed = (data: CVData) => {
        const normalizedData = ensureEditorData(data, uiLanguage);
        // Reset the form with the parsed CV data
        reset(normalizedData);
        setVisibleOptionalSections(deriveVisibleOptionalSections(normalizedData));
        setShowAdditionalPersonalDetails(hasAdditionalPersonalDetails(normalizedData));
        setShowUploader(false);
        setIsSaved(false);
        track('cv_uploaded', { fileType: 'parsed' });
    };

    const startCheckout = async (checkoutProduct: CheckoutProduct = "cv-download") => {
        setIsCheckoutRedirecting(true);
        const amountCents = checkoutProduct === "cv-profile-photo-bundle"
            ? applicationBundlePrice.amountCents
            : cvDownloadPrice.amountCents;
        track('checkout_start', { cvId: id, product: checkoutProduct, amountCents, experimentVariant: checkoutExperimentVariant });
        try {
            const checkoutResult = await getCheckoutURL(id, undefined, [], checkoutProduct);
            if (!checkoutResult.ok) {
                track('checkout_failed', {
                    cvId: id,
                    reason: checkoutResult.reason || checkoutResult.code,
                    product: checkoutProduct,
                    experimentVariant: checkoutExperimentVariant,
                });
                alert(checkoutResult.supportNotified ? supportNotifiedMessage : tr(
                    "Betaling kon niet gestart worden. Controleer de betaalconfiguratie en probeer opnieuw.",
                    "Payment could not be started. Check the payment configuration and try again."
                ));
                setIsCheckoutRedirecting(false);
                return;
            }
            track('checkout_started', { cvId: id, product: checkoutProduct, amountCents, experimentVariant: checkoutExperimentVariant });
            window.location.href = checkoutResult.url;
        } catch (error) {
            track('checkout_failed', { cvId: id, reason: getCheckoutFailureReason(error), product: checkoutProduct, experimentVariant: checkoutExperimentVariant });
            alert(tr("Betaling kon niet gestart worden. Controleer de betaalconfiguratie en probeer opnieuw.", "Payment could not be started. Check the payment configuration and try again."));
            setIsCheckoutRedirecting(false);
        }
    };

    const handleCheckoutOptionClick = (checkoutProduct: CheckoutProduct) => {
        const isBundle = checkoutProduct === "cv-profile-photo-bundle";
        const amountCents = isBundle ? applicationBundlePrice.amountCents : cvDownloadPrice.amountCents;
        const ctaText = isBundle
            ? tr(`Kies CV + profielfoto voor ${applicationBundlePrice.display}`, `Choose CV + profile photo for ${applicationBundlePrice.display.replace(",", ".")}`)
            : tr(`Alleen CV downloaden voor ${cvDownloadPrice.display}`, `Download CV only for ${cvDownloadPrice.display.replace(",", ".")}`);

        track('checkout_option_clicked', {
            cvId: id,
            product: checkoutProduct,
            amountCents,
            uiLanguage,
            recommended: isBundle,
            ctaText,
        });
        startCheckout(checkoutProduct);
    };

    const closeCheckoutModal = (reason: CheckoutModalCloseReason) => {
        if (isCheckoutRedirecting) return;
        track('checkout_modal_closed', { cvId: id, reason });
        setShowCheckoutModal(false);
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
        track('pdf_download_started', { cvId: id, source, completionScore });
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
                        variant: checkoutExperimentVariant,
                        source,
                        completionScore,
                    });
                    if (checkoutExperimentVariant === 'direct') {
                        await startCheckout('cv-download');
                    } else {
                        setShowCheckoutModal(true);
                    }
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
                            <button
                                type="button"
                                onClick={() => setShowUploader(true)}
                                className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:px-3"
                                title={tr("Upload je bestaande CV", "Upload your existing CV")}
                                aria-label={tr("Upload je bestaande CV", "Upload your existing CV")}
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                <span className="hidden sm:inline">{tr("CV uploaden", "Upload CV")}</span>
                            </button>
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
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                                        <PhotoUpload
                                            currentPhoto={data.personal.photo}
                                            onPhotoChange={handlePhotoChange}
                                            uiLanguage={uiLanguage}
                                        />
                                        <div className="flex-1 rounded-md border border-slate-200 bg-white p-3">
                                            <p className="text-sm font-semibold text-slate-900">{tr("Profielfoto", "Profile photo")}</p>
                                            <p className="mt-1 text-xs leading-relaxed text-slate-600">
                                                {tr("Een foto is optioneel. Gebruik alleen een foto die professioneel en actueel is.", "A photo is optional. Use one only when it is professional and current.")}
                                            </p>
                                            <Link
                                                href={isEnglish ? "/en/profile-photo" : "/profielfoto-cv-maken"}
                                                className="mt-2 inline-flex text-xs font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                                            >
                                                {tr("AI-profielfoto maken (€9,99)", "Create an AI profile photo (€9.99)")}
                                            </Link>
                                        </div>
                                    </div>

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
                            <div className="bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-900 border border-amber-300 rounded-md">
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
                    className="flex-1 overflow-y-auto p-4 xl:p-5 flex justify-center items-start"
                >
                    <div
                        className="relative bg-white shadow-sm border border-slate-200"
                        style={{
                            width: A4_WIDTH_PX * desktopPreviewScale,
                            height: pageCount * A4_HEIGHT_PX * desktopPreviewScale,
                        }}
                    >
                        <div
                            style={{
                                transform: `scale(${desktopPreviewScale})`,
                                transformOrigin: 'top left',
                                width: A4_WIDTH_PX,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                            }}
                        >
                            <Preview
                                data={data}
                                templateId={templateId}
                                colorThemeId={colorThemeId}
                                onPageCountChange={handlePageCountChange}
                            />
                        </div>
                        {pageCount > 1 && Array.from({ length: pageCount - 1 }, (_, i) => (
                            <div
                                key={i}
                                className="absolute left-0 right-0 z-10 bg-slate-200"
                                style={{ top: (i + 1) * A4_HEIGHT_PX * desktopPreviewScale, height: 6 }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile/Tablet preview trigger */}
            <button
                type="button"
                onClick={() => setShowMobilePreview(true)}
                className="lg:hidden fixed bottom-4 right-4 z-40 bg-slate-900 text-white px-4 py-2 font-semibold text-xs rounded-md border border-slate-900 shadow-sm"
               
            >
                {tr("Live preview", "Live preview")}{pageCount > 1 ? ` (${pageCount})` : ""}
            </button>

            {/* Mobile/Tablet preview panel */}
            {showMobilePreview && (
                <div className="lg:hidden fixed inset-0 z-40 bg-black/50">
                    <button
                        type="button"
                        onClick={() => setShowMobilePreview(false)}
                        className="absolute inset-0 w-full h-full cursor-default"
                        aria-label={tr("Sluit voorbeeld", "Close preview")}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-[72vh] md:inset-y-0 md:right-0 md:left-auto md:h-full md:w-[460px] bg-[#f0faf9] border-t md:border-t-0 md:border-l border-slate-300 flex flex-col">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white">
                            <div className="flex items-center gap-2">
                                <span className="bg-slate-900 px-2 py-1 text-xs font-semibold text-white border border-slate-900 rounded-md">{tr("Live preview", "Live preview")}</span>
                                {pageCount > 1 && (
                                    <span className="bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-900 border border-amber-300 rounded-md">{pageCount} {tr("pagina's", "pages")}</span>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowMobilePreview(false)}
                                className="px-3 py-1 border border-slate-300 text-xs font-semibold text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200"
                            >
                                {tr("Sluiten", "Close")}
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto px-2 sm:px-3 py-4">
                            <div
                                ref={mobilePreviewViewportRef}
                                className="flex justify-center items-start"
                            >
                                <div
                                    className="relative bg-white shadow-sm border border-slate-200"
                                    style={{
                                        width: A4_WIDTH_PX * mobilePreviewScale,
                                        height: pageCount * A4_HEIGHT_PX * mobilePreviewScale,
                                    }}
                                >
                                    <div
                                        style={{
                                            transform: `scale(${mobilePreviewScale})`,
                                            transformOrigin: 'top left',
                                            width: A4_WIDTH_PX,
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                        }}
                                    >
                                        <Preview
                                            data={data}
                                            templateId={templateId}
                                            colorThemeId={colorThemeId}
                                            onPageCountChange={handlePageCountChange}
                                        />
                                    </div>
                                    {pageCount > 1 && Array.from({ length: pageCount - 1 }, (_, i) => (
                                        <div
                                            key={i}
                                            className="absolute left-0 right-0 z-10 bg-slate-200"
                                            style={{ top: (i + 1) * A4_HEIGHT_PX * mobilePreviewScale, height: 4 }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Checkout Modal */}
            {showCheckoutModal && (
                <div
                    className="fixed inset-0 z-50 bg-black/55 flex items-center justify-center p-4"
                    onClick={() => closeCheckoutModal('overlay')}
                >
                    <div
                        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="border-b-4 border-black bg-[#FFF3BF] px-5 py-5 sm:px-6">
                            <div className="flex items-start justify-between gap-3">
                                <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-black">
                                    {tr("Eenmalige betaling", "One-time payment")}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => closeCheckoutModal('close_button')}
                                    disabled={isCheckoutRedirecting}
                                    className="flex h-9 w-9 items-center justify-center border-2 border-black bg-white text-lg font-black text-black hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
                                    aria-label={tr("Sluit betalingsoverzicht", "Close payment summary")}
                                >
                                    ×
                                </button>
                            </div>
                            <h3 className="mt-4 text-2xl font-black text-black sm:text-[2rem]">
                                {tr("Je CV is klaar om te downloaden.", "Your CV is ready to download.")}
                            </h3>
                            <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-700">
                                {tr(
                                    `Download je PDF voor eenmalig ${cvDownloadPrice.display}. Geen abonnement, geen automatische verlenging.`,
                                    `Download your Dutch-market English CV PDF for a one-time ${cvDownloadPrice.display.replace(",", ".")} payment. No subscription, no automatic renewal.`
                                )}
                            </p>
                        </div>

                        <div className="px-5 py-5 sm:px-6">
                            <div className="mb-5 space-y-4">
                                <div className="border-4 border-black bg-[#E9FFFC] p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-xl font-black text-black">{tr("Alleen CV als PDF", "CV PDF only")}</p>
                                            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
                                                {tr("Voor als je nu alleen deze sollicitatie-PDF nodig hebt.", "For when you only need this Dutch-market application PDF now.")}
                                            </p>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <p className="text-4xl font-black text-black">{cvDownloadPrice.display}</p>
                                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-600">
                                                {tr("eenmalig", "one-time")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 grid gap-2 text-xs font-bold text-slate-800 sm:grid-cols-3">
                                        <span className="border border-black/15 bg-white px-2 py-2">{tr("Directe PDF-download", "Immediate PDF download")}</span>
                                        <span className="border border-black/15 bg-white px-2 py-2">{tr("Later opnieuw downloaden", "Download again later")}</span>
                                        <span className="border border-black/15 bg-white px-2 py-2">{tr("Geen abonnement", "No subscription")}</span>
                                    </div>
                                    <button
                                        onClick={() => handleCheckoutOptionClick("cv-download")}
                                        disabled={isCheckoutRedirecting}
                                        className="mt-4 w-full px-5 py-3 border-2 border-black font-black text-sm bg-yellow-400 hover:bg-yellow-500 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                    >
                                        {isCheckoutRedirecting ? tr('Bezig...', 'Working...') : tr(`Alleen CV downloaden voor ${cvDownloadPrice.display}`, `Download CV only for ${cvDownloadPrice.display.replace(",", ".")}`)}
                                    </button>
                                    <p className="mt-3 text-xs font-semibold leading-relaxed text-slate-600">
                                        {tr(
                                            "Optioneel: ",
                                            "Optional: "
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => handleCheckoutOptionClick("cv-profile-photo-bundle")}
                                            disabled={isCheckoutRedirecting}
                                            className="font-black text-black underline decoration-2 underline-offset-2 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {tr(
                                                `voeg een AI-profielfoto toe`,
                                                `add an AI profile photo`
                                            )}
                                        </button>
                                        {tr(
                                            ` en betaal ${applicationBundlePrice.display} totaal voor CV + profielfoto.`,
                                            ` and pay ${applicationBundlePrice.display.replace(",", ".")} total for CV + profile photo.`
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-5 grid gap-3 rounded-md border border-slate-300 bg-slate-50 px-3 py-3 text-xs font-semibold text-slate-700 sm:grid-cols-2">
                                {checkoutBenefits.slice(0, 4).map((benefit) => (
                                    <p key={benefit} className="flex items-start gap-2">
                                        <span className="font-black text-emerald-700">✓</span>
                                        <span>{benefit}</span>
                                    </p>
                                ))}
                            </div>

                            <div className="mb-5 rounded-md border border-slate-300 bg-white px-3 py-3 text-xs font-semibold text-slate-700">
                                {tr(
                                    "Betaal pas als je klaar bent met downloaden. Je CV blijft beschikbaar om later opnieuw te openen en opnieuw te downloaden.",
                                    "Only pay when you are ready to download. Your CV stays available so you can open and download it again later."
                                )}
                            </div>

                            <div className="flex">
                                <button
                                    onClick={() => closeCheckoutModal('later_button')}
                                    disabled={isCheckoutRedirecting}
                                    className="w-full px-4 py-3 border-2 border-black font-bold text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {tr("Nog even bewerken", "Keep editing")}
                                </button>
                            </div>

                            <p className="mt-3 text-center text-[11px] font-medium text-slate-500">
                                {tr("Veilige betaling via onze betaalpartner.", "Secure payment via our payment partner.")}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* CV Upload Modal */}
            {showUploader && (
                <CVUploader
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

