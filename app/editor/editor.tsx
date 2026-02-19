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
import PhotoUpload from "./PhotoUpload";
import { hasCompletionTracked, markCompletionTracked, track } from "@/lib/analytics";

interface EditorProps {
    initialData: CVData;
    id: string;
    initialTemplateId: string;
    initialColorThemeId: string;
}

// Reusable input styles for cleaner, calmer form UI
const inputClass = "w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100";
const inputStyle = undefined;
const DESKTOP_PREVIEW_SCALE = 0.58;
const MOBILE_PREVIEW_SCALE = 0.44;
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

type CoverLetterTone = 'professional' | 'enthusiastic' | 'concise';
type AtsLanguageLock = 'auto' | 'nl' | 'en';
type OptionalSectionId =
    | 'internships'
    | 'courses'
    | 'awards'
    | 'interests'
    | 'properties'
    | 'references'
    | 'sideActivities'
    | 'customSections';

const optionalSectionOptions: Array<{ id: OptionalSectionId; label: string }> = [
    { id: 'interests', label: 'Interesses' },
    { id: 'properties', label: 'Eigenschappen' },
    { id: 'courses', label: 'Cursussen/Certificaten' },
    { id: 'internships', label: 'Stages' },
    { id: 'awards', label: 'Prestaties' },
    { id: 'references', label: 'Referenties' },
    { id: 'sideActivities', label: 'Nevenactiviteiten' },
    { id: 'customSections', label: 'Eigen onderdeel' },
];

function hasItems(value: unknown): boolean {
    return Array.isArray(value) && value.length > 0;
}

function ensureEditorData(data: CVData): CVData {
    return {
        ...data,
        personal: {
            ...data.personal,
            resumeLanguage: data.personal.resumeLanguage ?? 'nl',
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

function getCompletionScore(data: CVData): number {
    let score = 0;
    if (data.personal.name) score += 20;
    if (data.personal.email) score += 10;
    if (data.personal.phone) score += 10;
    if (data.personal.summary && data.personal.summary.length > 80) score += 20;
    if (data.experience.length > 0) score += 20;
    if (data.education.length > 0) score += 10;
    if (data.skills.length >= 3) score += 10;
    return Math.min(score, 100);
}

export default function Editor({ initialData, id, initialTemplateId, initialColorThemeId }: EditorProps) {
    const normalizedInitialData = ensureEditorData(initialData);
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
    const [isSaved, setIsSaved] = useState(true);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
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
    const [visibleOptionalSections, setVisibleOptionalSections] = useState<Record<OptionalSectionId, boolean>>(
        () => deriveVisibleOptionalSections(normalizedInitialData)
    );
    const [isCheckoutRedirecting, setIsCheckoutRedirecting] = useState(false);
    const [isAtsRewriting, setIsAtsRewriting] = useState(false);
    const [atsTargetRole, setAtsTargetRole] = useState(initialData.personal.title || '');
    const [atsJobDescription, setAtsJobDescription] = useState('');
    const [atsLanguageLock, setAtsLanguageLock] = useState<AtsLanguageLock>('auto');
    const [coverLetter, setCoverLetter] = useState('');
    const [coverLetterUpdatedAt, setCoverLetterUpdatedAt] = useState<string | null>(null);
    const [coverLetterCompanyName, setCoverLetterCompanyName] = useState('');
    const [coverLetterJobDescription, setCoverLetterJobDescription] = useState('');
    const [coverLetterTone, setCoverLetterTone] = useState<CoverLetterTone>('professional');
    const [isCoverLetterLoading, setIsCoverLetterLoading] = useState(true);
    const [isCoverLetterGenerating, setIsCoverLetterGenerating] = useState(false);
    const [isCoverLetterSaving, setIsCoverLetterSaving] = useState(false);
    const [isCoverLetterDirty, setIsCoverLetterDirty] = useState(false);
    const desktopPreviewViewportRef = useRef<HTMLDivElement>(null);
    const mobilePreviewViewportRef = useRef<HTMLDivElement>(null);

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
        let cancelled = false;

        const loadCoverLetter = async () => {
            setIsCoverLetterLoading(true);
            try {
                const response = await fetch(`/api/cover-letter?cvId=${encodeURIComponent(id)}`);
                if (!response.ok) {
                    // If payment/add-on is missing we keep editor usable and only gate on generate/save actions.
                    setCoverLetter('');
                    setCoverLetterUpdatedAt(null);
                    return;
                }
                const result = await response.json().catch(() => null);
                if (cancelled) return;
                setCoverLetter(typeof result?.coverLetter === 'string' ? result.coverLetter : '');
                setCoverLetterUpdatedAt(typeof result?.updatedAt === 'string' ? result.updatedAt : null);
                setIsCoverLetterDirty(false);
            } finally {
                if (!cancelled) {
                    setIsCoverLetterLoading(false);
                }
            }
        };

        loadCoverLetter();

        return () => {
            cancelled = true;
        };
    }, [id]);

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
        const score = getCompletionScore(cvData);
        if (score < 70) return;
        track('complete_cv', { cvId: id, completionScore: score });
        markCompletionTracked(id);
    }, [id]);

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
            setLastSaved(new Date());
            maybeTrackCompletion(formData);
        } else {
            alert("Er ging iets mis bij het opslaan.");
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
                        setLastSaved(new Date());
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
        const normalizedData = ensureEditorData(data);
        // Reset the form with the parsed CV data
        reset(normalizedData);
        setVisibleOptionalSections(deriveVisibleOptionalSections(normalizedData));
        setShowUploader(false);
        setIsSaved(false);
        track('cv_uploaded', { fileType: 'parsed' });
    };

    const startCheckout = async () => {
        setIsCheckoutRedirecting(true);
        track('checkout_start', { cvId: id });
        track('checkout_started', { cvId: id });
        try {
            const checkoutUrl = await getCheckoutURL(id, undefined, []);
            window.location.href = checkoutUrl;
        } catch {
            alert("Betaling kon niet gestart worden. Controleer de betaalconfiguratie en probeer opnieuw.");
            setIsCheckoutRedirecting(false);
        }
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
                    jobDescription: atsJobDescription,
                    preferredLanguage: atsLanguageLock === 'auto' ? undefined : atsLanguageLock,
                }),
            });

            const result = await response.json().catch(() => null);

            if (!response.ok) {
                if (result?.code === 'ATS_LANGUAGE_MISMATCH') {
                    alert("ATS kon de gewenste taal niet betrouwbaar aanhouden. Kies een vaste taal (NL/EN) en probeer opnieuw.");
                    return;
                }
                alert(result?.error || "ATS Rewrite mislukt. Probeer het opnieuw.");
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
                });
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

    const handleGenerateCoverLetter = async () => {
        setIsCoverLetterGenerating(true);
        track('cta_clicked', { location: 'editor_cover_letter', label: coverLetter ? 'regenerate' : 'generate' });
        try {
            const response = await fetch('/api/cover-letter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cvId: id,
                    targetRole: data.personal.title || '',
                    companyName: coverLetterCompanyName,
                    jobDescription: coverLetterJobDescription,
                    tone: coverLetterTone,
                }),
            });

            const result = await response.json().catch(() => null);
            if (!response.ok) {
                alert(result?.error || "Sollicitatiebrief genereren mislukt. Probeer het opnieuw.");
                return;
            }

            setCoverLetter(typeof result?.coverLetter === 'string' ? result.coverLetter : '');
            setCoverLetterUpdatedAt(typeof result?.updatedAt === 'string' ? result.updatedAt : null);
            setIsCoverLetterDirty(false);
        } finally {
            setIsCoverLetterGenerating(false);
        }
    };

    const handleSaveCoverLetter = async () => {
        if (!isCoverLetterDirty) return;
        setIsCoverLetterSaving(true);
        track('cta_clicked', { location: 'editor_cover_letter', label: 'save' });
        try {
            const response = await fetch('/api/cover-letter', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cvId: id,
                    coverLetter,
                }),
            });

            const result = await response.json().catch(() => null);
            if (!response.ok) {
                alert(result?.error || "Opslaan van sollicitatiebrief mislukt.");
                return;
            }

            setCoverLetter(typeof result?.coverLetter === 'string' ? result.coverLetter : coverLetter);
            setCoverLetterUpdatedAt(typeof result?.updatedAt === 'string' ? result.updatedAt : null);
            setIsCoverLetterDirty(false);
        } finally {
            setIsCoverLetterSaving(false);
        }
    };

    const handleDownload = async () => {
        setIsDownloading(true);
        track('pdf_download_started', { cvId: id });
        try {
            // Always save latest data before generating PDF to prevent stale content
            const formData = watch();
            const res = await updateCV(id, formData);
            if (!res.success) {
                alert("Er ging iets mis bij het opslaan.");
                return;
            }
            setIsSaved(true);
            setLastSaved(new Date());
            maybeTrackCompletion(formData);

            // Fetch PDF as blob so we can track completion and handle errors
            const response = await fetch(`/api/pdf?cvId=${id}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                if (errorData?.code === 'PAYMENT_REQUIRED') {
                    setShowCheckoutModal(true);
                } else if (errorData?.code === 'PDF_ERROR') {
                    alert("Er ging iets mis bij het genereren van de PDF. Probeer het opnieuw.");
                } else {
                    alert("Er ging iets mis bij het downloaden.");
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
        <div className="flex flex-col lg:flex-row h-screen bg-[#eef3f1] font-sans text-slate-900 overflow-hidden">
            {/* Left: Editor Form */}
            <div className="flex w-full lg:w-[54%] flex-col border-r-0 lg:border-r border-slate-200 bg-[#f8fbfa] z-10 h-screen">
                {/* Toolbar */}
                <div className="min-h-14 lg:h-16 border-b border-slate-200 flex flex-wrap items-center justify-between px-3 sm:px-5 py-2 lg:py-0 bg-white/95 backdrop-blur sticky top-0 z-20 gap-2">
                    {/* Left side - Logo and tools */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        <Link href="/" className="flex items-center gap-1">
                            <span className="font-semibold text-lg sm:text-xl tracking-tight text-slate-900">
                                Werk<span className="bg-emerald-200 px-1 rounded-sm">CV</span>.nl
                            </span>
                        </Link>
                        <Link
                            href="/mijn-cvs"
                            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                            title="Mijn CV's"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Mijn CV&apos;s
                        </Link>
                        <div className="hidden sm:block w-px h-6 bg-slate-300" />
                        <div className="relative flex items-center gap-1 sm:gap-2">
                            <TemplateSelector
                                currentTemplateId={templateId}
                                onSelectTemplate={handleTemplateChange}
                            />
                            {showTemplateHint && (
                                <div className="absolute top-full left-0 mt-2 bg-emerald-100 border border-emerald-300 px-3 py-2 text-xs font-semibold text-emerald-900 shadow-sm z-30 whitespace-nowrap">
                                    Wissel hier van template
                                </div>
                            )}
                            <ColorThemePicker
                                templateId={templateId}
                                currentThemeId={colorThemeId}
                                onSelectTheme={handleColorThemeChange}
                            />
                        </div>
                        <div className="hidden md:block w-px h-6 bg-slate-300" />
                        <button
                            onClick={() => setShowUploader(true)}
                            className="hidden md:flex px-3 py-1.5 font-semibold text-xs border border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 transition-colors rounded-md items-center gap-1.5"
                           
                            title="Upload je bestaande CV"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            <span className="hidden lg:inline">CV Uploaden</span>
                        </button>
                        <button
                            onClick={handleAtsRewrite}
                            disabled={isAtsRewriting}
                            className="hidden md:flex px-3 py-1.5 font-semibold text-xs border border-sky-300 bg-sky-50 text-sky-900 hover:bg-sky-100 transition-colors rounded-md items-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
                           
                            title="ATS Rewrite"
                        >
                            <span className="font-black">{isAtsRewriting ? '...' : 'ATS'}</span>
                        </button>
                        <button
                            onClick={handleGenerateCoverLetter}
                            disabled={isCoverLetterGenerating}
                            className="hidden md:flex px-3 py-1.5 font-semibold text-xs border border-rose-300 bg-rose-50 text-rose-900 hover:bg-rose-100 transition-colors rounded-md items-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
                           
                            title="Genereer sollicitatiebrief"
                        >
                            <span className="font-black">{isCoverLetterGenerating ? '...' : 'Brief AI'}</span>
                        </button>
                    </div>

                    {/* Right side - Save and Download */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                            {isSaved ? (lastSaved ? <span className="text-green-700">✓ <span className="hidden sm:inline">Opgeslagen {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></span> : "✓") : <span className="text-orange-600">●<span className="hidden sm:inline"> Niet opgeslagen</span></span>}
                        </div>
                        <button
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting || isSaved}
                            className={`px-3 sm:px-4 py-2 font-semibold text-xs sm:text-sm rounded-md border transition-colors ${isSaved
                                    ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                                    : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50"
                                }`}
                           
                        >
                            {isSubmitting ? "..." : isSaved ? "✓" : "Opslaan"}
                        </button>
                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className="bg-emerald-600 text-white px-3 sm:px-4 py-2 font-semibold text-xs sm:text-sm rounded-md border border-emerald-700 hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                           
                        >
                            {isDownloading ? "..." : "PDF"}
                        </button>
                    </div>
                </div>

                {/* Mobile Upload Button - shown below toolbar on small screens */}
                <div className="md:hidden flex px-4 py-2 bg-white border-b border-slate-200">
                    <button
                        onClick={() => setShowUploader(true)}
                        className="flex-1 px-3 py-2 font-semibold text-xs rounded-md border border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2 mr-2"
                       
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Upload bestaand CV
                    </button>
                    <button
                        onClick={handleAtsRewrite}
                        disabled={isAtsRewriting}
                        className="px-3 py-2 font-semibold text-xs rounded-md border border-sky-300 bg-sky-50 text-sky-900 hover:bg-sky-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                       
                    >
                        {isAtsRewriting ? '...' : 'ATS'}
                    </button>
                    <button
                        onClick={handleGenerateCoverLetter}
                        disabled={isCoverLetterGenerating}
                        className="px-3 py-2 font-semibold text-xs rounded-md border border-rose-300 bg-rose-50 text-rose-900 hover:bg-rose-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                       
                    >
                        {isCoverLetterGenerating ? '...' : 'Brief AI'}
                    </button>
                </div>

                {/* Scrollable Form Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 scroll-smooth bg-[#f1f5f4]">
                    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 pb-12">

                        {/* Personal Section */}
                        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
                            <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 rounded-md">
                                    Persoonlijke Gegevens
                                </span>
                            </h2>

                            {/* Photo Upload + Name/Title */}
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
                                <PhotoUpload
                                    currentPhoto={data.personal.photo}
                                    onPhotoChange={handlePhotoChange}
                                />
                                <div className="flex-1 grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Volledige Naam</label>
                                        <input {...register("personal.name")} placeholder="bv. Simone van Roodenburg" className={inputClass} style={inputStyle} />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Gewenste Functie</label>
                                        <input {...register("personal.title")} placeholder="bv. Leerkracht Basisonderwijs" className={inputClass} style={inputStyle} />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">CV taal</label>
                                        <select {...register("personal.resumeLanguage")} className={inputClass} style={inputStyle}>
                                            <option value="nl">Nederlands</option>
                                            <option value="en">English</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Email</label>
                                    <input {...register("personal.email")} placeholder="email@voorbeeld.nl" className={inputClass} style={inputStyle} />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Telefoonnummer</label>
                                    <input {...register("personal.phone")} placeholder="06 12345678" className={inputClass} style={inputStyle} />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Adres</label>
                                    <input {...register("personal.address")} placeholder="bv. Wilhelminastraat 78" className={inputClass} style={inputStyle} />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Postcode & Plaats</label>
                                    <input {...register("personal.postalCode")} placeholder="1234 AB Utrecht" className={inputClass} style={inputStyle} />
                                </div>
                            </div>

                            {/* Personal Details */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Geboortedatum</label>
                                    <input {...register("personal.birthDate")} placeholder="15-03-1994" className={inputClass} style={inputStyle} />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Geboorteplaats</label>
                                    <input {...register("personal.birthPlace")} placeholder="Naarden" className={inputClass} style={inputStyle} />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Nationaliteit</label>
                                    <input {...register("personal.nationality")} placeholder="Nederlandse" className={inputClass} style={inputStyle} />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Rijbewijs</label>
                                    <input {...register("personal.driversLicense")} placeholder="B" className={inputClass} style={inputStyle} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Geslacht</label>
                                    <select {...register("personal.gender")} className={inputClass} style={inputStyle}>
                                        <option value="">Selecteer...</option>
                                        <option value="Man">Man</option>
                                        <option value="Vrouw">Vrouw</option>
                                        <option value="Anders">Anders</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Burgerlijke staat</label>
                                    <select {...register("personal.maritalStatus")} className={inputClass} style={inputStyle}>
                                        <option value="">Selecteer...</option>
                                        <option value="Ongehuwd">Ongehuwd</option>
                                        <option value="Gehuwd">Gehuwd</option>
                                        <option value="Samenwonend">Samenwonend</option>
                                        <option value="Gescheiden">Gescheiden</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">LinkedIn</label>
                                    <input {...register("personal.linkedIn")} placeholder="linkedin.com/in/naam" className={inputClass} style={inputStyle} />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">GitHub</label>
                                    <input {...register("personal.github")} placeholder="github.com/username" className={inputClass} style={inputStyle} />
                                </div>
                            </div>

                            {/* Summary */}
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Persoonlijk Profiel</label>
                                <textarea {...register("personal.summary")} placeholder="Korte introductie over jezelf, je ervaring en wat je zoekt..." className={`${inputClass} h-28`} style={inputStyle} />
                            </div>
                        </section>

                        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
                            <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-4">
                                <span className="bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 rounded-md inline-block">
                                    ATS Optimalisatie
                                </span>
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Doelrol</label>
                                    <input
                                        value={atsTargetRole}
                                        onChange={(e) => setAtsTargetRole(e.target.value)}
                                        placeholder={data.personal.title || "bv. Backend Developer"}
                                        className={inputClass}
                                        style={inputStyle}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Taal lock</label>
                                    <select
                                        value={atsLanguageLock}
                                        onChange={(e) => setAtsLanguageLock(e.target.value as AtsLanguageLock)}
                                        className={inputClass}
                                        style={inputStyle}
                                    >
                                        <option value="auto">Auto (detecteer)</option>
                                        <option value="nl">Nederlands</option>
                                        <option value="en">English</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Vacaturetekst (optioneel)</label>
                                <textarea
                                    value={atsJobDescription}
                                    onChange={(e) => setAtsJobDescription(e.target.value)}
                                    placeholder="Plak de vacaturetekst voor sterkere ATS-keyword match..."
                                    className={`${inputClass} h-24`}
                                    style={inputStyle}
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleAtsRewrite}
                                    disabled={isAtsRewriting}
                                    className="px-4 py-2 rounded-md border border-sky-300 bg-sky-50 text-sky-900 font-semibold text-xs hover:bg-sky-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {isAtsRewriting ? 'Bezig...' : 'ATS herschrijven'}
                                </button>
                                <p className="text-xs font-bold text-gray-600">
                                    Herschrijft profiel + werkervaring met taalbehoud.
                                </p>
                            </div>
                        </section>

                        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
                            <div className="flex items-start justify-between gap-3 mb-4">
                                <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 rounded-md inline-block">
                                        Sollicitatiebrief AI
                                    </span>
                                </h2>
                                {coverLetterUpdatedAt && (
                                    <span className="text-[11px] font-bold text-gray-600">
                                        Bijgewerkt: {new Date(coverLetterUpdatedAt).toLocaleString()}
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Bedrijfsnaam (optioneel)</label>
                                    <input
                                        value={coverLetterCompanyName}
                                        onChange={(e) => setCoverLetterCompanyName(e.target.value)}
                                        placeholder="bv. ASML"
                                        className={inputClass}
                                        style={inputStyle}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Toon</label>
                                    <select
                                        value={coverLetterTone}
                                        onChange={(e) => setCoverLetterTone(e.target.value as CoverLetterTone)}
                                        className={inputClass}
                                        style={inputStyle}
                                    >
                                        <option value="professional">Professioneel</option>
                                        <option value="enthusiastic">Enthousiast</option>
                                        <option value="concise">Bondig</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Vacaturetekst (optioneel)</label>
                                <textarea
                                    value={coverLetterJobDescription}
                                    onChange={(e) => setCoverLetterJobDescription(e.target.value)}
                                    placeholder="Plak hier de vacaturetekst voor betere afstemming..."
                                    className={`${inputClass} h-24`}
                                    style={inputStyle}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Brieftekst</label>
                                {isCoverLetterLoading ? (
                                    <div className="border-3 border-black bg-gray-50 px-3 py-4 text-sm font-bold text-gray-600">
                                        Sollicitatiebrief laden...
                                    </div>
                                ) : (
                                    <textarea
                                        value={coverLetter}
                                        onChange={(e) => {
                                            setCoverLetter(e.target.value);
                                            setIsCoverLetterDirty(true);
                                        }}
                                        placeholder="Klik op 'Genereer brief' om je sollicitatiebrief te maken."
                                        className={`${inputClass} h-56`}
                                        style={inputStyle}
                                    />
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    onClick={handleGenerateCoverLetter}
                                    disabled={isCoverLetterGenerating}
                                    className="px-4 py-2 rounded-md border border-rose-300 bg-rose-50 text-rose-900 font-semibold text-xs hover:bg-rose-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {isCoverLetterGenerating ? 'Bezig...' : coverLetter ? 'Regenereer brief' : 'Genereer brief'}
                                </button>
                                <button
                                    onClick={handleSaveCoverLetter}
                                    disabled={!isCoverLetterDirty || isCoverLetterSaving}
                                    className="px-4 py-2 rounded-md border border-amber-300 bg-amber-50 text-amber-900 font-semibold text-xs hover:bg-amber-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {isCoverLetterSaving ? 'Opslaan...' : 'Brief opslaan'}
                                </button>
                                <p className="text-xs font-bold text-gray-600">
                                    Je kunt handmatig aanpassen en opnieuw genereren.
                                </p>
                            </div>
                        </section>

                        <ExperienceSection control={control} register={register} />
                        <EducationSection control={control} register={register} />
                        <SkillsSection control={control} register={register} />
                        <LanguagesSection control={control} register={register} />

                        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
                            <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-4">
                                <span className="bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 rounded-md inline-block">
                                    Add Part
                                </span>
                            </h2>
                            <p className="text-xs font-bold text-gray-700 mb-4">
                                Activeer extra onderdelen zoals referenties, nevenactiviteiten of een eigen sectie.
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

                        {visibleOptionalSections.internships && <InternshipsSection control={control} register={register} />}
                        {visibleOptionalSections.courses && <CoursesSection control={control} register={register} />}
                        {visibleOptionalSections.awards && <AwardsSection control={control} register={register} />}
                        {visibleOptionalSections.interests && <InterestsSection control={control} register={register} />}
                        {visibleOptionalSections.properties && <PropertiesSection control={control} register={register} />}
                        {visibleOptionalSections.references && <ReferencesSection control={control} register={register} />}
                        {visibleOptionalSections.sideActivities && <SideActivitiesSection control={control} register={register} />}
                        {visibleOptionalSections.customSections && <CustomSectionsSection control={control} register={register} />}

                    </div>
                </div>
            </div>

            {/* Right: Live Preview */}
            <div className="hidden lg:flex flex-col lg:w-[46%] xl:w-[48%] bg-[#e8efed] overflow-hidden">
                {/* Fixed header */}
                <div className="shrink-0 flex items-center justify-between px-4 py-2.5 bg-white/95 backdrop-blur border-b border-slate-200">
                    <span className="text-xs font-semibold text-slate-600">Live preview</span>
                    <div className="flex items-center gap-2">
                        {pageCount > 1 && (
                            <div className="bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-900 border border-amber-300 rounded-md">
                                {pageCount} pagina&apos;s
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
                Live preview{pageCount > 1 ? ` (${pageCount})` : ""}
            </button>

            {/* Mobile/Tablet preview panel */}
            {showMobilePreview && (
                <div className="lg:hidden fixed inset-0 z-40 bg-black/50">
                    <button
                        type="button"
                        onClick={() => setShowMobilePreview(false)}
                        className="absolute inset-0 w-full h-full cursor-default"
                        aria-label="Sluit voorbeeld"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-[72vh] md:inset-y-0 md:right-0 md:left-auto md:h-full md:w-[460px] bg-[#e8efed] border-t md:border-t-0 md:border-l border-slate-300 flex flex-col">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white">
                            <div className="flex items-center gap-2">
                                <span className="bg-slate-900 px-2 py-1 text-xs font-semibold text-white border border-slate-900 rounded-md">Live preview</span>
                                {pageCount > 1 && (
                                    <span className="bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-900 border border-amber-300 rounded-md">{pageCount} pagina&apos;s</span>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowMobilePreview(false)}
                                className="px-3 py-1 border border-slate-300 text-xs font-semibold text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200"
                            >
                                Sluiten
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
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <div className="w-full max-w-sm bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
                        <h3 className="text-2xl font-black text-black mb-2">Download je CV</h3>
                        <p className="text-sm text-gray-700 mb-6">
                            Eenmalige betaling. Geen abonnement.
                        </p>

                        <div className="flex items-center justify-between border-2 border-black p-4 mb-6 bg-gray-50">
                            <p className="font-bold text-black">CV als PDF</p>
                            <p className="text-2xl font-black text-black">€5</p>
                        </div>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowCheckoutModal(false)}
                                disabled={isCheckoutRedirecting}
                                className="px-4 py-2 border-2 border-black font-bold text-sm bg-gray-100 hover:bg-gray-200"
                            >
                                Later
                            </button>
                            <button
                                onClick={startCheckout}
                                disabled={isCheckoutRedirecting}
                                className="px-5 py-2 border-2 border-black font-black text-sm bg-yellow-400 hover:bg-yellow-500 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isCheckoutRedirecting ? 'Bezig...' : 'Betalen →'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* CV Upload Modal */}
            {showUploader && (
                <CVUploader
                    onParsed={handleCVParsed}
                    onClose={() => setShowUploader(false)}
                />
            )}

            {/* Welcome Onboarding Modal */}
            {showOnboarding && (
                <WelcomeOnboarding
                    onDismiss={handleDismissOnboarding}
                    onUploadCV={handleOnboardingUpload}
                />
            )}
        </div>
    );
}



