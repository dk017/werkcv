"use client";
/* eslint-disable react-hooks/static-components */

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import NavUserMenu from "@/components/NavUserMenu";
import { templateList } from "@/lib/templates/registry";
import { CVData, sampleCV } from "@/lib/cv";
import { getTemplateComponent, getTheme } from "@/app/editor/templates";
import { LinkTextProvider } from "@/app/editor/templates/link-utils";
import { getAllArticles } from "@/lib/cv-tips/registry";
import { getAllExamples, getAllCategories } from "@/lib/cv-voorbeelden/registry";
import { getStoredAttribution, track } from "@/lib/analytics";

// Computed stats from actual data
const templateCount = templateList.length;
const articleCount = getAllArticles().length;
const exampleCount = getAllExamples().length;
const categoryCount = getAllCategories().length;

// 4 featured templates for showcase
const showcaseTemplates = ['professional', 'modern', 'elegant', 'ats']
    .map(id => templateList.find(t => t.id === id))
    .filter(Boolean);

// Hero carousel: 8 best templates with their strongest color theme
const HERO_SCALE = 220 / 794; // renders A4 width (794px) → 220px
const heroSlides = [
    { templateId: 'professional', themeId: 'classic-blue',   label: 'Professioneel' },
    { templateId: 'modern',       themeId: 'ocean-blue',     label: 'Modern' },
    { templateId: 'elegant',      themeId: 'elegant-navy',   label: 'Elegant' },
    { templateId: 'dynamic',      themeId: 'purple-royal',   label: 'Dynamisch' },
    { templateId: 'remarkable',   themeId: 'rose-gold',      label: 'Opmerkelijk' },
    { templateId: 'formal',       themeId: 'elegant-navy',   label: 'Formeel' },
    { templateId: 'sepia',        themeId: 'warm-earth',     label: 'Sepia' },
    { templateId: 'jobboss',      themeId: 'modern-teal',    label: 'Sollicitatiebaas' },
];

const homepageTemplatePreviewData: CVData = {
    ...sampleCV,
    personal: {
        ...sampleCV.personal,
        name: "Anouk de Vries",
        title: "Marketing & Communicatie Specialist",
        email: "anouk.devries@gmail.com",
        phone: "+31 6 12345678",
        location: "Amsterdam",
        linkedIn: "linkedin.com/in/anouk-devries",
        website: "anoukdevries.nl",
        photo: "https://randomuser.me/api/portraits/women/44.jpg",
        summary:
            "Resultaatgerichte marketing professional met 6+ jaar ervaring in contentstrategie, campagne-optimalisatie en merkpositionering. Sterk in data-gedreven keuzes, stakeholdermanagement en het vertalen van doelstellingen naar meetbare groei.",
    },
    experience: [
        {
            role: "Senior Marketing Specialist",
            company: "BrightWave Digital",
            location: "Amsterdam",
            start: "jan 2022",
            end: "heden",
            description: "",
            highlights: [
                "Verhoogde organisch verkeer met 48% via SEO contentclusters.",
                "Leidde omnichannel campagnes met gemiddeld +32% leadgroei.",
            ],
        },
        {
            role: "Content Marketeer",
            company: "ScaleUp Partners",
            location: "Utrecht",
            start: "mrt 2019",
            end: "dec 2021",
            description: "",
            highlights: [
                "Ontwikkelde employer-branding strategie voor internationale hiring.",
                "Verbeterde nieuwsbrief-CTR van 3.8% naar 7.1% binnen 5 maanden.",
            ],
        },
    ],
    education: [
        {
            degree: "BSc Communicatiewetenschap",
            school: "Universiteit van Amsterdam",
            location: "Amsterdam",
            start: "2014",
            end: "2018",
            description: "",
        },
    ],
    skills: [
        { name: "SEO & Contentstrategie", level: 5 },
        { name: "Campagne Management", level: 5 },
        { name: "GA4 & Looker Studio", level: 4 },
        { name: "Copywriting", level: 4 },
        { name: "Stakeholdermanagement", level: 4 },
    ],
    languages: [
        { name: "Nederlands", level: "Moedertaal" },
        { name: "Engels", level: "Vloeiend" },
        { name: "Duits", level: "Goed" },
    ],
    interests: ["Hardlopen", "Design", "Reizen", "Podcasting"],
    awards: ["Best Campaign Award (2023)"],
};

function HomeTemplatePreview({ templateId, colorThemeId }: { templateId: string; colorThemeId: string }) {
    const TemplateComponent = getTemplateComponent(templateId);
    const theme = getTheme(templateId, colorThemeId);

    return (
        <div className="relative h-full overflow-hidden border-2 border-black bg-white">
            <div
                className="origin-top-left pointer-events-none"
                style={{
                    transform: "scale(0.24)",
                    width: `${100 / 0.24}%`,
                }}
            >
                <LinkTextProvider disableAnchors>
                    <TemplateComponent data={homepageTemplatePreviewData} theme={theme} />
                </LinkTextProvider>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none" />
        </div>
    );
}

function HeroCarousel() {
    const [current, setCurrent] = useState(0);
    const pausedRef = useRef(false);

    useEffect(() => {
        const t = setInterval(() => {
            if (!pausedRef.current) {
                setCurrent(c => (c + 1) % heroSlides.length);
            }
        }, 3000);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="hidden md:flex flex-col items-center gap-5 flex-shrink-0">
            {/* Card stack */}
            <div className="relative w-[220px] h-[312px]">
                {/* Back decorative cards */}
                <div className="absolute inset-0 bg-blue-300 border-4 border-black"
                    style={{ transform: 'rotate(6deg) translate(10px, 4px)', zIndex: 0 }} />
                <div className="absolute inset-0 bg-yellow-300 border-4 border-black"
                    style={{ transform: 'rotate(-4deg) translate(-8px, -2px)', zIndex: 1 }} />

                {/* Main carousel card */}
                <div
                    className="absolute inset-0 border-4 border-black overflow-hidden bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                    style={{ zIndex: 2 }}
                    onMouseEnter={() => { pausedRef.current = true; }}
                    onMouseLeave={() => { pausedRef.current = false; }}
                >
                    {heroSlides.map((slide, idx) => {
                        const TemplateComponent = getTemplateComponent(slide.templateId);
                        const theme = getTheme(slide.templateId, slide.themeId);
                        return (
                            <div
                                key={slide.templateId}
                                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                                style={{ opacity: idx === current ? 1 : 0, zIndex: idx === current ? 1 : 0 }}
                            >
                                <div
                                    className="origin-top-left pointer-events-none"
                                    style={{ transform: `scale(${HERO_SCALE})`, width: `${100 / HERO_SCALE}%` }}
                                >
                                    <LinkTextProvider disableAnchors>
                                        <TemplateComponent data={homepageTemplatePreviewData} theme={theme} />
                                    </LinkTextProvider>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Template name label */}
            <div className="bg-white border-2 border-black px-3 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-[11px] font-black tracking-widest uppercase text-black">
                {heroSlides[current].label}
            </div>

            {/* Dot / pill indicators */}
            <div className="flex gap-1.5 items-center">
                {heroSlides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`h-2 border-2 border-black transition-all duration-300 ${
                            idx === current ? 'w-5 bg-black' : 'w-2 bg-gray-300 hover:bg-gray-500'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

// 3 featured articles
const featuredArticles = getAllArticles().filter(a => a.featured).slice(0, 3);

export default function Home() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
        { title: "ATS-Vriendelijk", desc: "Alle templates werken met Applicant Tracking Systems", color: "bg-yellow-400", icon: "✓" },
        { title: "Direct PDF Download", desc: "Download je CV direct als professionele PDF", color: "bg-blue-400", icon: "↓" },
        { title: "100% Privacy", desc: "Je gegevens blijven van jou. Wij verkopen niets door", color: "bg-pink-400", icon: "🔒" },
        { title: "Geen Abonnement", desc: "Eenmalig €5 per download, geen verborgen kosten", color: "bg-green-400", icon: "€" },
        { title: "Live Preview", desc: "Bekijk je CV in realtime terwijl je typt", color: "bg-purple-400", icon: "👁" },
        { title: "Binnen 5 Minuten", desc: "Upload je bestaande CV of begin helemaal opnieuw", color: "bg-[#4ECDC4]", icon: "⚡" },
    ];

    const steps = [
        { num: "1", title: "Kies een template", desc: `Selecteer uit ${templateCount}+ professionele, ATS-vriendelijke templates.`, color: "bg-yellow-400" },
        { num: "2", title: "Vul je gegevens in", desc: "Typ je gegevens in de editor. Je CV wordt live bijgewerkt.", color: "bg-blue-400" },
        { num: "3", title: "Download als PDF", desc: "Download je afgeronde CV als professionele PDF. Eenmalig €5.", color: "bg-pink-400" },
    ];

    return (
        <div
            className="min-h-screen bg-[#FFFEF0]"
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
                <div className="fixed inset-0 bg-blue-400/20 z-50 flex items-center justify-center">
                    <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <p className="text-xl font-black text-black">Sleep je CV hier om te uploaden</p>
                    </div>
                </div>
            )}

            {/* Upload status */}
            {isUploading && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
                        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="font-black text-black">CV wordt verwerkt...</p>
                    </div>
                </div>
            )}

            {/* Error display */}
            {error && (
                <div className="fixed top-4 right-4 z-50 bg-red-400 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-sm">
                    <p className="font-bold text-black text-sm">{error}</p>
                    <button onClick={() => setError(null)} className="mt-2 text-xs font-black underline">Sluiten</button>
                </div>
            )}

            {/* ============================================================ */}
            {/* HEADER - Sticky with navigation */}
            {/* ============================================================ */}
            <header className="relative z-10 border-b-4 border-black bg-white sticky top-0">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="font-black text-2xl sm:text-3xl tracking-tight text-black">
                            Werk<span className="bg-yellow-400 px-1">CV</span>.nl
                        </Link>
                    </div>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-black">
                        <Link href="/templates" className="hover:text-yellow-600 transition-colors">Templates</Link>
                        <Link href="/cv-voorbeelden" className="hover:text-yellow-600 transition-colors">CV Voorbeelden</Link>
                        <Link href="/cv-tips" className="hover:text-yellow-600 transition-colors">CV Tips</Link>
                        <Link href="/prijzen" className="hover:text-yellow-600 transition-colors">Prijzen</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <NavUserMenu />
                        <Link
                            href="/templates"
                            className="bg-yellow-400 text-black px-4 py-2 font-black text-sm border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                            style={{ borderWidth: '3px' }}
                        >
                            CV Maken
                        </Link>
                    </div>
                </div>
            </header>

            {/* ============================================================ */}
            {/* HERO - Two column with template mockup */}
            {/* ============================================================ */}
            <section className="relative z-10 border-b-4 border-black bg-gradient-to-br from-[#FFFEF0] via-yellow-50 to-blue-50 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-16 left-8 w-24 h-24 bg-yellow-300 rounded-full opacity-30" />
                <div className="absolute bottom-16 right-12 w-32 h-32 bg-blue-300 rounded-full opacity-20" />
                <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-pink-300 rounded-full opacity-20" />

                <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        {/* Left: Copy */}
                        <div className="flex-1 text-center lg:text-left">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black leading-tight mb-6">
                                Maak een CV dat{" "}
                                <span className="bg-yellow-400 px-2 -rotate-1 inline-block border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    uitnodigt
                                </span>{" "}
                                voor gesprekken
                            </h1>
                            <p className="text-lg md:text-xl font-medium text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0">
                                Kies uit {templateCount}+ professionele templates, vul je gegevens in en download als PDF.{" "}
                                <span className="bg-blue-200 px-1">Eenmalig €5, geen abonnement.</span>
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    href="/templates"
                                    onClick={() => track('cta_clicked', { location: 'hero', label: 'Begin je CV' })}
                                    className="bg-yellow-400 text-black px-8 py-4 font-black text-lg border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-center"
                                >
                                    Begin je CV
                                </Link>
                                <button
                                    onClick={() => { track('cta_clicked', { location: 'hero', label: 'Upload bestaand CV' }); fileInputRef.current?.click(); }}
                                    className="bg-white text-black px-8 py-4 font-black text-lg border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-center cursor-pointer"
                                >
                                    Upload bestaand CV
                                </button>
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
            <section className="relative z-10 border-b-4 border-black bg-white">
                <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {[
                        { number: `${templateCount}+`, label: "Templates", color: "bg-yellow-400" },
                        { number: `${exampleCount}+`, label: "CV Voorbeelden", color: "bg-blue-400" },
                        { number: `${articleCount}`, label: "Expert Artikelen", color: "bg-pink-400" },
                        { number: "€5", label: "Eenmalig", color: "bg-green-400" },
                    ].map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center">
                            <div
                                className={`${stat.color} border-3 border-black px-4 py-2 font-black text-2xl md:text-3xl text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-2`}
                                style={{ borderWidth: '3px' }}
                            >
                                {stat.number}
                            </div>
                            <span className="font-bold text-sm text-black">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ============================================================ */}
            {/* HOW IT WORKS - 3 steps */}
            {/* ============================================================ */}
            <section className="relative z-10 border-b-4 border-black bg-[#FFFEF0]">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <h2 className="text-3xl md:text-4xl font-black text-black text-center mb-12">
                        Hoe het werkt
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {steps.map((step) => (
                            <div key={step.num} className="text-center">
                                <div className={`${step.color} w-16 h-16 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-3xl text-black mx-auto mb-4 -rotate-3`}>
                                    {step.num}
                                </div>
                                <h3 className="text-xl font-black text-black mb-2">{step.title}</h3>
                                <p className="text-gray-600 font-medium">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* TEMPLATE SHOWCASE - 4 featured templates */}
            {/* ============================================================ */}
            <section className="relative z-10 border-b-4 border-black bg-white">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl md:text-4xl font-black text-black">
                            Onze templates
                        </h2>
                        <Link
                            href="/templates"
                            className="hidden sm:flex items-center gap-1 font-bold text-sm text-[#FF6B6B] hover:underline"
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
                                    className="group bg-white border-4 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                                >
                                    <div className="h-4" style={{ backgroundColor: theme.primary }} />
                                    <div className="p-4">
                                        <div className="h-52 md:h-56 mb-3 overflow-hidden">
                                            <HomeTemplatePreview templateId={template.id} colorThemeId={theme.id} />
                                        </div>
                                        <h3 className="font-black text-sm text-black group-hover:text-[#FF6B6B] transition-colors">
                                            {template.nameDutch}
                                        </h3>
                                        <p className="text-xs text-gray-500 font-medium mt-0.5">
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
                            className="inline-flex items-center gap-1 font-bold text-sm text-[#FF6B6B] hover:underline"
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
            <section className="relative z-10 border-b-4 border-black bg-[#FFFEF0]">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <h2 className="text-3xl md:text-4xl font-black text-black text-center mb-12">
                        Waarom WerkCV.nl?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <div className={`${feature.color} w-12 h-12 border-3 border-black flex items-center justify-center font-black text-xl text-black mb-4 -rotate-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`} style={{ borderWidth: '3px' }}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-black text-black mb-2">{feature.title}</h3>
                                <p className="text-gray-600 font-medium text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* PRICING CLARITY */}
            {/* ============================================================ */}
            <section className="relative z-10 border-b-4 border-black bg-white">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="max-w-md mx-auto text-center">
                        <span className="inline-block bg-green-400 text-black text-sm font-black px-3 py-1 border-3 border-black mb-6" style={{ borderWidth: '3px' }}>
                            EENMALIGE BETALING
                        </span>
                        <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <div className="text-6xl font-black text-black mb-2">
                                <span className="text-3xl align-top">€</span>5
                            </div>
                            <p className="text-gray-600 font-medium mb-6">per CV download</p>
                            <div className="space-y-3 text-left mb-8">
                                {[
                                    "Gratis bewerken en vormgeven",
                                    `${templateCount}+ professionele templates`,
                                    "ATS-vriendelijk ontwerp",
                                    "Direct downloaden als PDF",
                                    "Geen abonnement of verborgen kosten",
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-green-400 border-2 border-black flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-black">✓</span>
                                        </div>
                                        <span className="text-sm font-medium text-black">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <Link
                                href="/templates"
                                onClick={() => track('cta_clicked', { location: 'pricing', label: 'Begin nu gratis' })}
                                className="block w-full bg-yellow-400 text-black py-4 font-black text-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-center"
                            >
                                Begin nu gratis
                            </Link>
                        </div>
                        <p className="text-sm text-gray-500 font-medium mt-4">
                            Geen creditcard nodig om te beginnen
                        </p>
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* CONTENT AUTHORITY - CV Tips & Examples */}
            {/* ============================================================ */}
            <section className="relative z-10 border-b-4 border-black bg-[#FFFEF0]">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <h2 className="text-3xl md:text-4xl font-black text-black text-center mb-12">
                        Leer meer over CV schrijven
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* CV Tips card */}
                        <Link
                            href="/cv-tips"
                            className="group bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-[#FF6B6B] w-10 h-10 border-3 border-black flex items-center justify-center font-black text-lg text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -rotate-3" style={{ borderWidth: '3px' }}>
                                    📝
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-black group-hover:text-[#FF6B6B] transition-colors">CV Tips & Advies</h3>
                                    <p className="text-sm text-gray-500 font-medium">{articleCount} expert artikelen</p>
                                </div>
                            </div>
                            <ul className="space-y-2">
                                {featuredArticles.map(article => (
                                    <li key={article.slug} className="text-sm font-medium text-gray-700 flex items-start gap-2">
                                        <span className="text-[#FF6B6B] mt-0.5">→</span>
                                        {article.title}
                                    </li>
                                ))}
                            </ul>
                        </Link>

                        {/* CV Examples card */}
                        <Link
                            href="/cv-voorbeelden"
                            className="group bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-[#4ECDC4] w-10 h-10 border-3 border-black flex items-center justify-center font-black text-lg text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-3" style={{ borderWidth: '3px' }}>
                                    📄
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-black group-hover:text-[#4ECDC4] transition-colors">CV Voorbeelden</h3>
                                    <p className="text-sm text-gray-500 font-medium">{exampleCount}+ voorbeelden in {categoryCount} categorieën</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {getAllCategories().slice(0, 6).map(cat => (
                                    <span key={cat.slug} className="text-xs font-bold bg-gray-100 border-2 border-black px-2 py-1">
                                        {cat.name}
                                    </span>
                                ))}
                                <span className="text-xs font-bold text-gray-400 px-2 py-1">
                                    +{categoryCount - 6} meer
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* FINAL CTA */}
            {/* ============================================================ */}
            <section className="relative z-10 border-b-4 border-black bg-[#4ECDC4]">
                <div className="max-w-6xl mx-auto px-6 py-16 text-center">
                    <h2 className="text-4xl font-black mb-6 text-black">
                        Klaar om je CV te maken?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto text-black/80">
                        Maak binnen 5 minuten een professioneel CV dat opvalt bij recruiters.
                        Eenmalig €5, geen abonnement.
                    </p>
                    <Link
                        href="/templates"
                        onClick={() => track('cta_clicked', { location: 'footer_cta', label: 'Begin nu' })}
                        className="inline-block bg-black text-white font-bold px-10 py-5 text-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                    >
                        Begin nu
                    </Link>
                </div>
            </section>

            {/* ============================================================ */}
            {/* FOOTER */}
            {/* ============================================================ */}
            <Footer />
        </div>
    );
}
