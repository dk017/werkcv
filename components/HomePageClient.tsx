"use client";

import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { TemplateConfig } from "@/lib/templates";
import { getStoredAttribution, track } from "@/lib/analytics";
import { applicationBundlePrice, cvDownloadPrice, homepageFaqItems, profilePhotoPrice } from "@/lib/site-content";

interface HomePageClientProps {
    templateCount: number;
    articleCount: number;
    exampleCount: number;
    categoryCount: number;
    showcaseTemplates: TemplateConfig[];
    featuredArticles: Array<{ slug: string; title: string }>;
    featuredCategories: Array<{ slug: string; name: string }>;
}

function TemplatePreviewPlaceholder({ compact = false }: { compact?: boolean }) {
    return (
        <div
            aria-hidden="true"
            className={`relative h-full overflow-hidden border border-[var(--wk-border)] bg-[var(--wk-surface)] ${
                compact ? "min-h-[208px]" : "min-h-[312px]"
            }`}
        >
            <div className="relative flex h-full flex-col gap-3 p-4">
                <div className="h-4 w-28 rounded-[var(--wk-radius-sm)] bg-[var(--wk-accent-soft)]" />
                <div className="h-3 w-24 rounded-[var(--wk-radius-sm)] bg-[var(--wk-highlight-soft)]" />
                <div className="mt-4 space-y-2">
                    <div className="h-3 w-full rounded bg-[var(--wk-surface-subtle)]" />
                    <div className="h-3 w-5/6 rounded bg-[var(--wk-surface-subtle)]" />
                    <div className="h-3 w-4/6 rounded bg-[var(--wk-surface-subtle)]" />
                </div>
                <div className="mt-auto grid grid-cols-2 gap-2">
                    <div className="h-10 rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] bg-[var(--wk-accent-soft)]" />
                    <div className="h-10 rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] bg-[var(--wk-highlight-soft)]" />
                </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[var(--wk-surface)] via-[var(--wk-surface)] to-transparent" />
        </div>
    );
}

function HeroCarouselPlaceholder() {
    return (
        <div className="hidden md:flex flex-col items-center gap-5 flex-shrink-0">
            <div className="relative w-[220px] h-[312px]">
                <div
                    className="absolute inset-0 rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-accent-soft)]"
                    style={{ transform: "rotate(6deg) translate(10px, 4px)", zIndex: 0 }}
                />
                <div
                    className="absolute inset-0 rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-highlight-soft)]"
                    style={{ transform: "rotate(-4deg) translate(-8px, -2px)", zIndex: 1 }}
                />
                <div
                    className="absolute inset-0 overflow-hidden rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)] shadow-[var(--wk-shadow-md)]"
                    style={{ zIndex: 2 }}
                >
                    <TemplatePreviewPlaceholder />
                </div>
            </div>
            <div className="rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] bg-[var(--wk-surface)] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[var(--wk-ink)] shadow-[var(--wk-shadow-sm)]">
                13+ templates
            </div>
            <div className="flex items-center gap-1.5">
                <span className="h-2 w-5 rounded-full bg-[var(--wk-accent)]" />
                <span className="h-2 w-2 rounded-full bg-[var(--wk-border-strong)]" />
                <span className="h-2 w-2 rounded-full bg-[var(--wk-border-strong)]" />
            </div>
        </div>
    );
}

const HomeTemplatePreview = dynamic(
    () => import("@/components/home/HomeTemplatePreviews").then((module) => module.HomeTemplatePreview),
    {
        ssr: false,
        loading: () => <TemplatePreviewPlaceholder compact />,
    }
);

const HeroCarousel = dynamic(
    () => import("@/components/home/HomeTemplatePreviews").then((module) => module.HeroCarousel),
    {
        ssr: false,
        loading: () => <HeroCarouselPlaceholder />,
    }
);

export default function HomePageClient({
    templateCount,
    articleCount,
    exampleCount,
    categoryCount,
    showcaseTemplates,
    featuredArticles,
    featuredCategories,
}: HomePageClientProps) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const trackHomepageTemplatesClick = (location: string, label: string) => {
        track('cta_clicked', { location, label });
        track('landing_cta_click', { fromPath: '/', toPath: '/templates', label });
    };

    const handleFile = async (file: File) => {
        setError(null);
        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            const attribution = getStoredAttribution();
            if (attribution) {
                formData.append("attribution", JSON.stringify(attribution));
            }

            const response = await fetch("/api/parse-cv", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    router.push(`/login?next=${encodeURIComponent('/')}`);
                    return;
                }
                throw new Error(data.error || "Upload failed");
            }

            track('start_cv', { entryPoint: 'home_upload', cvId: data.cvId });
            router.push(`/editor?id=${data.cvId}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Er ging iets mis");
            setIsUploading(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const features = [
        { title: "ATS-Vriendelijk", desc: "Alle templates werken met Applicant Tracking Systems", color: "bg-[var(--wk-accent-soft)]", icon: "✓" },
        { title: "Direct PDF Download", desc: "Download je CV direct als professionele PDF", color: "bg-[var(--wk-surface-subtle)]", icon: "↓" },
        { title: "100% Privacy", desc: "Je gegevens blijven van jou. Wij verkopen niets door", color: "bg-[var(--wk-highlight-soft)]", icon: "🔒" },
        { title: "Geen Abonnement", desc: `Eenmalig ${cvDownloadPrice.display} per CV, geen verborgen kosten`, color: "bg-[var(--wk-accent-soft)]", icon: "€" },
        { title: "Live Preview", desc: "Bekijk je CV in realtime terwijl je typt", color: "bg-[var(--wk-surface-subtle)]", icon: "👁" },
        { title: "Binnen 5 Minuten", desc: "Upload je bestaande CV of begin helemaal opnieuw", color: "bg-[var(--wk-highlight-soft)]", icon: "⚡" },
    ];

    const steps = [
        { num: "1", title: "Kies een template", desc: `Selecteer uit ${templateCount}+ professionele, ATS-vriendelijke templates.`, color: "bg-[var(--wk-highlight-soft)]" },
        { num: "2", title: "Vul je gegevens in", desc: "Typ je gegevens in de editor. Je CV wordt live bijgewerkt.", color: "bg-[var(--wk-accent-soft)]" },
        { num: "3", title: "Download als PDF", desc: `Download je afgeronde CV als professionele PDF. Eenmalig ${cvDownloadPrice.display} per CV.`, color: "bg-[var(--wk-surface-subtle)]" },
    ];

    return (
        <div
            className="min-h-screen"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            {/* Hidden file input for upload */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                }}
            />

            {/* Drag overlay */}
            {isDragging && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--wk-primary)]/20">
                    <div className="rounded-[var(--wk-radius-lg)] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-8 shadow-[var(--wk-shadow-md)]">
                        <p className="text-xl font-semibold text-[var(--wk-ink)]">Sleep je CV hier om te uploaden</p>
                    </div>
                </div>
            )}

            {/* Upload status */}
            {isUploading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--wk-ink)]/50">
                    <div className="rounded-[var(--wk-radius-lg)] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-8 text-center shadow-[var(--wk-shadow-md)]">
                        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[var(--wk-border-strong)] border-t-transparent" />
                        <p className="font-semibold text-[var(--wk-ink)]">CV wordt verwerkt...</p>
                    </div>
                </div>
            )}

            {/* Error display */}
            {error && (
                <div className="wk-card wk-card-danger fixed right-4 top-4 z-50 max-w-sm">
                    <p className="text-sm font-semibold text-[var(--wk-danger)]">{error}</p>
                    <button onClick={() => setError(null)} className="mt-2 text-xs font-semibold underline text-[var(--wk-danger)]">Sluiten</button>
                </div>
            )}
            {/* ============================================================ */}
            {/* HERO - Two column with template mockup */}
            {/* ============================================================ */}
            <section className="relative z-10 border-b border-black bg-gradient-to-br from-[#FFFEF0] via-yellow-50 to-blue-50 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-16 left-8 w-24 h-24 bg-yellow-300 rounded-full opacity-30" />
                <div className="absolute bottom-16 right-12 w-32 h-32 bg-blue-300 rounded-full opacity-20" />
                <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-pink-300 rounded-full opacity-20" />

                <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        {/* Left: Copy */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="wk-eyebrow mb-4">
                                Nederlandse CV builder
                            </div>
                            <h1 className="max-w-3xl text-4xl sm:text-5xl md:text-6xl font-black text-black leading-tight mb-6">
                                Maak een{" "}
                                <span className="wk-hero-highlight">
                                    ATS-vriendelijk
                                </span>{" "}
                                CV voor Nederlandse vacatures
                            </h1>
                            <p className="text-lg md:text-xl font-medium text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0">
                                WerkCV.nl helpt je snel een professioneel CV op te bouwen met {templateCount}+ templates die rustig, recruiter-proof en ATS-vriendelijk blijven. Maak je CV eerst af, bekijk de volledige preview en betaal pas als je de PDF echt wilt downloaden.{" "}
                                <span className="wk-inline-highlight">
                                    Geen abonnement:{" "}
                                    <Link href="/cv-maken-zonder-abonnement" className="underline decoration-2 underline-offset-2">
                                        eenmalig betalen
                                    </Link>{" "}
                                    van {cvDownloadPrice.display} per CV.
                                </span>
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    href="/editor?template=professional&startSource=home_hero_primary"
                                    onClick={() => track('cta_clicked', { location: 'hero', label: 'Begin nu gratis' })}
                                    className="wk-button wk-button-primary min-h-12 px-7 text-base"
                                >
                                    Begin nu gratis
                                </Link>
                                <button
                                    onClick={() => { track('cta_clicked', { location: 'hero', label: 'Upload bestaand CV' }); fileInputRef.current?.click(); }}
                                    className="wk-button wk-button-secondary min-h-12 px-7 text-base"
                                >
                                    Upload bestaand CV
                                </button>
                            </div>
                            <div className="mt-4 text-sm font-bold text-slate-700">
                                Liever eerst kijken?{" "}
                                <Link
                                    href="/templates"
                                    onClick={() => trackHomepageTemplatesClick('hero_secondary_text', 'Vergelijk templates')}
                                    className="underline decoration-2 underline-offset-2 hover:text-black"
                                >
                                    Vergelijk templates
                                </Link>
                                .
                            </div>
                            <div className="mt-5 flex flex-wrap gap-3 justify-center lg:justify-start text-xs font-black uppercase tracking-[0.2em] text-black">
                                <span className="wk-trust-pill">Voor Nederlandse sollicitaties</span>
                                <span className="wk-trust-pill">ATS-vriendelijke templates</span>
                                <span className="wk-trust-pill">Eenmalig per CV</span>
                                <span className="wk-trust-pill">Later opnieuw downloaden</span>
                            </div>
                        </div>

                        {/* Right: Animated template carousel */}
                        <HeroCarousel />
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* TRUST BAR - Factual product stats */}
            {/* ============================================================ */}
            <section className="relative z-10 wk-section bg-[var(--wk-surface)]">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {[
                        { number: `${templateCount}+`, label: "Templates", color: "bg-[var(--wk-accent-soft)]" },
                        { number: `${exampleCount}+`, label: "CV Voorbeelden", color: "bg-[var(--wk-highlight-soft)]" },
                        { number: `${articleCount}`, label: "Expert Artikelen", color: "bg-[var(--wk-accent-soft)]" },
                        { number: cvDownloadPrice.display, label: "Eenmalig", color: "bg-[var(--wk-highlight-soft)]" },
                    ].map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center">
                            <div
                                className={`${stat.color} rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] px-4 py-2 font-semibold text-2xl md:text-3xl text-[var(--wk-ink)] shadow-[var(--wk-shadow-sm)] mb-2`}
                            >
                                {stat.number}
                            </div>
                            <span className="text-sm font-semibold text-[var(--wk-ink-muted)]">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ============================================================ */}
            {/* HOW IT WORKS - 3 steps */}
            {/* ============================================================ */}
            <section className="relative z-10 wk-section">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-semibold text-[var(--wk-ink)] text-center mb-12">
                        Hoe het werkt
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {steps.map((step) => (
                            <div key={step.num} className="text-center">
                                <div className={`${step.color} w-16 h-16 rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] shadow-[var(--wk-shadow-sm)] flex items-center justify-center font-semibold text-3xl text-[var(--wk-ink)] mx-auto mb-4`}>
                                    {step.num}
                                </div>
                                <h3 className="text-xl font-semibold text-[var(--wk-ink)] mb-2">{step.title}</h3>
                                <p className="text-[var(--wk-ink-muted)] font-medium">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* TEMPLATE SHOWCASE - 4 featured templates */}
            {/* ============================================================ */}
            <section className="relative z-10 wk-section bg-[var(--wk-surface)]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl md:text-4xl font-semibold text-[var(--wk-ink)]">
                            Onze templates
                        </h2>
                        <Link
                            href="/templates"
                            className="hidden sm:flex items-center gap-1 font-bold text-sm text-[var(--wk-primary)] hover:underline"
                        >
                            Bekijk alle {templateCount}+
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {showcaseTemplates.map((template) => {
                            if (!template) return null;
                            const theme = template.colorThemes.find(t => t.id === template.defaultThemeId) || template.colorThemes[0];
                            return (
                                <Link
                                    key={template.id}
                                    href="/templates"
                                    className="group rounded-[var(--wk-radius-lg)] border border-[var(--wk-border)] bg-[var(--wk-surface)] overflow-hidden shadow-[var(--wk-shadow-sm)] hover:shadow-[var(--wk-shadow-md)] hover:-translate-y-0.5 transition-all"
                                >
                                    <div className="h-4" style={{ backgroundColor: theme.primary }} />
                                    <div className="p-4">
                                        <div className="h-52 md:h-56 mb-3 overflow-hidden">
                                            <HomeTemplatePreview templateId={template.id} colorThemeId={theme.id} />
                                        </div>
                                        <h3 className="font-semibold text-sm text-[var(--wk-ink)] group-hover:text-[var(--wk-primary)] transition-colors">
                                            {template.nameDutch}
                                        </h3>
                                        <p className="text-xs text-[var(--wk-ink-muted)] font-medium mt-0.5">
                                            {template.category === 'classic' ? 'Klassiek' : template.category === 'modern' ? 'Modern' : template.category === 'creative' ? 'Creatief' : 'Minimaal'}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <div className="sm:hidden text-center mt-6">
                        <Link
                            href="/templates"
                            className="inline-flex items-center gap-1 font-bold text-sm text-[var(--wk-primary)] hover:underline"
                        >
                            Bekijk alle {templateCount}+ templates
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* FEATURE GRID - 6 features */}
            {/* ============================================================ */}
            <section className="relative z-10 wk-section">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-semibold text-[var(--wk-ink)] text-center mb-12">
                        Waarom WerkCV.nl?
                    </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => (
                    <div
                        key={feature.title}
                                className="rounded-[var(--wk-radius-lg)] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-6 shadow-[var(--wk-shadow-sm)]"
                            >
                                <div className={`${feature.color} w-12 h-12 rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] flex items-center justify-center font-semibold text-xl text-[var(--wk-primary)] mb-4`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-[var(--wk-ink)] mb-2">{feature.title}</h3>
                                <p className="text-[var(--wk-ink-muted)] font-medium text-sm">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>

    <section className="relative z-10 wk-section">
        <div className="max-w-6xl mx-auto px-6">
            <div className="mb-8 flex flex-col gap-2 text-center">
                <p className="wk-eyebrow justify-center">
                    Vertrouwen
                </p>
                <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
                    Wat je vooraf zeker weet
                </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
                <div className="wk-card text-[var(--wk-ink-muted)]">
                    <p className="text-base font-semibold text-[var(--wk-ink)]">
                        Eerst volledig bekijken, daarna beslissen
                    </p>
                    <p className="mt-3 text-sm">
                        Je bouwt je cv gratis, vergelijkt templates en bekijkt het volledige resultaat vóór je afrekent. Alleen de definitieve PDF-download kost {cvDownloadPrice.display} per cv.
                    </p>
                </div>
                <div className="wk-card text-[var(--wk-ink-muted)]">
                    <p className="text-base font-semibold text-[var(--wk-ink)]">
                        Eén betaling, zonder automatische verlenging
                    </p>
                    <p className="mt-3 text-sm">
                        WerkCV verkoopt geen abonnement en start geen proefperiode. Je rekent eenmalig af via Dodo Payments en kunt die betaalde cv later opnieuw downloaden zonder extra kosten.
                    </p>
                    <div className="mt-5 flex flex-col items-start gap-2">
                        <span className="wk-badge w-fit">EU-hosting in Duitsland</span>
                        <span className="wk-badge w-fit">Betaling via Dodo Payments</span>
                        <span className="wk-badge w-fit">Geen automatische verlenging</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

            {/* ============================================================ */}
            {/* PRICING CLARITY */}
            {/* ============================================================ */}
            <section className="relative z-10 wk-section bg-[var(--wk-surface)]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="max-w-md mx-auto text-center">
                        <span className="wk-badge wk-badge-success mb-6">
                            EENMALIGE BETALING
                        </span>
                        <div className="rounded-[var(--wk-radius-lg)] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-8 shadow-[var(--wk-shadow-md)]">
                            <div className="text-6xl font-semibold text-[var(--wk-ink)] mb-2">
                                {cvDownloadPrice.display}
                            </div>
                            <p className="text-[var(--wk-ink-muted)] font-medium mb-6">eenmalig per CV</p>
                            <div className="space-y-3 text-left mb-8">
                                {[
                                    "Gratis bewerken en vormgeven",
                                    `${templateCount}+ professionele templates`,
                                    "ATS-vriendelijk ontwerp",
                                    "Direct downloaden als PDF",
                                    "Later opnieuw downloaden zonder extra betaling",
                                    "Gehost op EU-servers (Hetzner, Duitsland)",
                                    "Geen abonnement of verborgen kosten",
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-[var(--wk-radius-sm)] bg-[var(--wk-success-soft)] border border-[var(--wk-border)] flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-semibold text-[var(--wk-success)]">✓</span>
                                        </div>
                                        <span className="text-sm font-medium text-[var(--wk-ink)]">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mb-6 rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] bg-[var(--wk-accent-soft)] p-3 text-left">
                                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--wk-ink)]">Nieuw</p>
                                <p className="mt-1 text-sm font-medium text-[var(--wk-ink-muted)]">
                                    Maak je CV en AI-profielfoto samen voor {applicationBundlePrice.display}. De profielfoto los kost {profilePhotoPrice.display}.
                                </p>
                            </div>
                            <Link
                                href="/templates"
                                onClick={() => trackHomepageTemplatesClick('pricing', 'Begin nu gratis')}
                                className="wk-button wk-button-primary w-full"
                            >
                                Begin nu gratis
                            </Link>
                        </div>
                        <p className="text-sm text-[var(--wk-ink-muted)] font-medium mt-4">
                            Geen creditcard nodig om te beginnen
                        </p>
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* CONTENT AUTHORITY - CV Tips & Examples */}
            {/* ============================================================ */}
            <section className="relative z-10 wk-section">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-semibold text-[var(--wk-ink)] text-center mb-12">
                        Leer meer over CV schrijven
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* CV Tips card */}
                        <Link
                            href="/cv-tips"
                            className="group wk-card transition-transform hover:-translate-y-0.5"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] bg-[var(--wk-accent-soft)] flex items-center justify-center text-lg">
                                    📝
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-[var(--wk-ink)] group-hover:text-[var(--wk-primary)] transition-colors">CV Tips & Advies</h3>
                                    <p className="text-sm text-[var(--wk-ink-muted)] font-medium">{articleCount} expert artikelen</p>
                                </div>
                            </div>
                            <ul className="space-y-2">
                                {featuredArticles.map(article => (
                                    <li key={article.slug} className="text-sm font-medium text-[var(--wk-ink-muted)] flex items-start gap-2">
                                        <span className="text-[var(--wk-primary)] mt-0.5">→</span>
                                        {article.title}
                                    </li>
                                ))}
                            </ul>
                        </Link>

                        {/* CV Examples card */}
                        <Link
                            href="/cv-voorbeelden"
                            className="group wk-card transition-transform hover:-translate-y-0.5"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] bg-[var(--wk-highlight-soft)] flex items-center justify-center text-lg">
                                    📄
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-[var(--wk-ink)] group-hover:text-[var(--wk-primary)] transition-colors">CV Voorbeelden</h3>
                                    <p className="text-sm text-[var(--wk-ink-muted)] font-medium">{exampleCount}+ voorbeelden in {categoryCount} categorieën</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {featuredCategories.map(cat => (
                                    <span key={cat.slug} className="rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] px-2 py-1 text-xs font-semibold text-[var(--wk-ink-muted)]">
                                        {cat.name}
                                    </span>
                                ))}
                                <span className="px-2 py-1 text-xs font-semibold text-[var(--wk-ink-muted)]">
                                    +{categoryCount - 6} meer
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="relative z-10 wk-section bg-[var(--wk-surface)]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="max-w-4xl">
                        <p className="wk-eyebrow">
                            Populaire CV Zoekopdrachten
                        </p>
                        <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-[var(--wk-ink)]">
                            Start direct op de route die bij je zoekintentie past
                        </h2>
                        <p className="mt-4 text-base md:text-lg font-medium leading-relaxed text-[var(--wk-ink-muted)]">
                            Niet iedereen zoekt op dezelfde manier. Sommige bezoekers willen{" "}
                            <Link href="/gratis-cv-maken" className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4">
                                gratis een CV maken
                            </Link>
                            , anderen willen snel een professioneel CV{" "}
                            <Link href="/cv-maken" className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4">
                                maken
                            </Link>
                            , op mobiel werken of direct weten hoe een eerste CV voor school, stage of bijbaan eruitziet. Daarom linken we hieronder direct naar de belangrijkste routes.
                        </p>
                    </div>
                    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {[
                            {
                                href: "/gratis-cv-maken",
                                title: "Gratis CV maken",
                                body: "Voor bezoekers die gratis willen starten, templates willen vergelijken en pas bij download willen betalen.",
                            },
                            {
                                href: "/cv-maken",
                                title: "CV maken voor Nederlandse vacatures",
                                body: "Voor snelle starters die vanaf nul een professioneel CV willen opzetten zonder blanco-pagina stress.",
                            },
                            {
                                href: "/cv-maken-student",
                                title: "CV maken student",
                                body: "Sterke route voor studenten, starters en iedereen die school, projecten of stage slim wil inzetten.",
                            },
                            {
                                href: "/stage-cv-maken",
                                title: "Stage CV maken",
                                body: "Focus op stage-intentie, afstudeerrollen en een profieltekst zonder veel werkervaring.",
                            },
                            {
                                href: "/cv-maken-16-jarige",
                                title: "CV maken 16-jarige",
                                body: "Praktische eerste-CV pagina voor jongeren die solliciteren op bijbaan, winkel of horeca.",
                            },
                            {
                                href: "/cv-maken-pdf",
                                title: "CV maken PDF",
                                body: "Voor mensen die vooral op eindformaat zoeken en van daaruit naar de editorflow moeten worden geleid.",
                            },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group block wk-card transition-transform hover:-translate-y-0.5"
                            >
                                <h3 className="text-lg font-semibold text-[var(--wk-ink)] group-hover:text-[var(--wk-primary)] transition-colors">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">
                                    {item.body}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative z-10 wk-section">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="max-w-3xl">
                        <p className="wk-eyebrow">
                            Veelgestelde vragen
                        </p>
                        <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-[var(--wk-ink)]">
                            Eerst de basis helder, daarna pas je CV bouwen
                        </h2>
                        <p className="mt-4 text-base md:text-lg font-medium leading-relaxed text-[var(--wk-ink-muted)]">
                            Deze vragen komen het vaakst terug bij bezoekers die eerst willen begrijpen hoe gratis
                            starten, ATS-vriendelijke templates en later downloaden precies werken.
                        </p>
                    </div>

                    <div className="mt-8 space-y-4">
                        {homepageFaqItems.map((item) => (
                            <details
                                key={item.question}
                                className="group rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)] shadow-[var(--wk-shadow-sm)]"
                            >
                                <summary className="flex cursor-pointer items-center justify-between p-5 text-left text-base font-semibold text-[var(--wk-ink)]">
                                    <span className="pr-4">{item.question}</span>
                                    <span className="text-xl transition-transform group-open:rotate-45">+</span>
                                </summary>
                                <div className="border-t border-[var(--wk-border)] px-5 pb-5 pt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">
                                    {item.answer}
                                </div>
                            </details>
                        ))}
                    </div>

                    <div className="mt-6">
                        <Link
                            href="/faq"
                            className="wk-button wk-button-secondary"
                        >
                            Bekijk alle veelgestelde vragen
                        </Link>
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* TOOLS PROMO - 4 highlighted tools */}
            {/* ============================================================ */}
            <section className="relative z-10 wk-section bg-[var(--wk-surface)]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--wk-ink)]">
                                Gratis carrière tools
                            </h2>
                            <p className="text-[var(--wk-ink-muted)] font-medium mt-1">Geen registratie vereist</p>
                        </div>
                        <Link
                            href="/tools"
                            className="hidden sm:flex items-center gap-1 font-bold text-sm text-[var(--wk-primary)] hover:underline"
                        >
                            Bekijk alle 30 tools
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { href: "/tools/salaris-calculator", title: "Salaris check", desc: "Vergelijk je salaris met CBS-marktdata per beroep.", badge: "Geld" },
                            { href: "/tools/netto-bruto-calculator", title: "Netto-Bruto", desc: "Bereken bruto naar netto en netto naar bruto voor 2026.", badge: "Geld" },
                            { href: "/tools/vakantiegeld-berekenen", title: "Vakantiegeld", desc: "Bereken je bruto vakantiegeld op basis van 8% en je loon.", badge: "Geld" },
                            { href: "/tools/ww-recht-checker", title: "WW-recht", desc: "Controleer snel de basisvoorwaarden voor WW.", badge: "NL wetgeving" },
                        ].map((tool) => (
                            <Link
                                key={tool.href}
                                href={tool.href}
                                className="group block rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-4 shadow-[var(--wk-shadow-sm)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--wk-shadow-md)]"
                            >
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h3 className="font-semibold text-[var(--wk-ink)] text-sm leading-tight group-hover:text-[var(--wk-primary)] transition-colors">
                                        {tool.title}
                                    </h3>
                                    <span className="flex-shrink-0 rounded-full border border-[var(--wk-border)] bg-[var(--wk-accent-soft)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--wk-primary)]">
                                        {tool.badge}
                                    </span>
                                </div>
                                <p className="text-xs text-[var(--wk-ink-muted)] leading-relaxed">{tool.desc}</p>
                            </Link>
                        ))}
                    </div>
                    <div className="sm:hidden text-center mt-6">
                        <Link href="/tools" className="inline-flex items-center gap-1 font-bold text-sm text-[var(--wk-primary)] hover:underline">
                            Bekijk alle 30 gratis tools
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="relative z-10 wk-section">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="max-w-3xl">
                        <span className="wk-eyebrow">
                            B2B routes
                        </span>
                        <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-[var(--wk-ink)]">
                            Werk je met kandidaten, cliënten of deelnemers?
                        </h2>
                        <p className="mt-4 text-base md:text-lg font-medium leading-relaxed text-[var(--wk-ink-muted)]">
                            WerkCV heeft ook routes voor coaches, recruitmentbureaus en partners die hun doelgroep sneller
                            van advies naar een concrete sollicitatieversie willen brengen.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        {[
                            {
                                href: "/for-coaches",
                                title: "Voor coaches",
                                body: "Voor loopbaancoaches, jobcoaches, re-integratie en outplacement met Nederlandse en expat-doelgroepen.",
                            },
                            {
                                href: "/agency",
                                title: "WerkCV MatchPack",
                                body: "Voor recruiters en boutique bureaus die onderbouwde kandidaatvoorstellen sneller in bureau-uitstraling willen opleveren.",
                            },
                            {
                                href: "/partners",
                                title: "Partners",
                                body: "Voor scholen, communities, career services en programma's die bruikbare WerkCV-assets willen delen.",
                            },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group block wk-card transition-transform hover:-translate-y-0.5"
                            >
                                <h3 className="text-lg font-semibold text-[var(--wk-ink)] group-hover:text-[var(--wk-primary)] transition-colors">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">
                                    {item.body}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* FINAL CTA */}
            {/* ============================================================ */}
            <section className="relative z-10 wk-section">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="rounded-[var(--wk-radius-lg)] bg-[var(--wk-primary)] p-8 text-center md:p-12">
                        <h2 className="text-4xl font-semibold mb-6 text-[var(--wk-primary-contrast)]">
                            Klaar om je CV te maken?
                        </h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto text-[var(--wk-primary-contrast)]/80">
                            Maak binnen 5 minuten een professioneel CV dat opvalt bij recruiters.
                            Eenmalig {cvDownloadPrice.display} per CV, later opnieuw bewerken en downloaden.
                        </p>
                        <Link
                            href="/templates"
                            onClick={() => trackHomepageTemplatesClick('footer_cta', 'Begin nu')}
                            className="wk-button wk-button-accent"
                        >
                            Begin nu
                        </Link>
                    </div>
                </div>
            </section>

            </div>
    );
}
