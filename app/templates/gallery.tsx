"use client";
/* eslint-disable react-hooks/static-components */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TemplateConfig, ColorTheme } from '@/lib/templates';
import { CVData, sampleCV } from '@/lib/cv';
import { getTemplateComponent, getTheme } from '@/app/editor/templates';
import Footer from "@/components/Footer";
import NavUserMenu from "@/components/NavUserMenu";
import { getStoredAttribution, track } from '@/lib/analytics';

interface TemplateGalleryProps {
    templates: TemplateConfig[];
}

const categoryLabels: Record<string, string> = {
    all: 'Alle',
    classic: 'Klassiek',
    modern: 'Modern',
    creative: 'Creatief',
    minimal: 'Minimaal',
};

const templatePreviewData: CVData = {
    ...sampleCV,
    personal: {
        ...sampleCV.personal,
        photo: 'https://randomuser.me/api/portraits/women/44.jpg',
        linkedIn: 'linkedin.com/in/simone-van-roodenburg',
        github: 'github.com/simoneroodenburg',
        website: 'simoneroodenburg.dev',
        summary:
            'Gemotiveerde en enthousiaste lerares basisonderwijs met een passie voor het inspireren en begeleiden van jonge leerlingen. Ik vertaal leerdoelen naar praktische lessen, werk datagedreven aan leerresultaten en bouw sterke ouder- en teamcommunicatie.',
    },
    experience: [
        ...sampleCV.experience,
        {
            role: 'Onderwijsassistent',
            company: 'OBS De Horizon',
            location: 'Utrecht',
            start: 'augustus 2016',
            end: 'juli 2018',
            description: 'Ondersteunde leerkrachten in groep 3 en 5 bij taal- en rekendidactiek.',
            highlights: [
                'Differentiatieplannen opgesteld voor leerlingen met taalachterstand',
                'Projectweek georganiseerd met lokale bibliotheek en ouders',
            ],
        },
    ],
    courses: [
        ...sampleCV.courses,
        {
            name: 'Didactisch Coachen',
            institution: 'Onderwijsacademie NL',
            year: '2023',
        },
    ],
    awards: ['Docent van het Jaar nominatie (2022)', 'Schoolinnovatie Award (team, 2021)'],
    interests: ['Schilderen', 'Kinderliteratuur', 'Natuurwandelingen', 'Onderwijsinnovatie'],
};

function RichTemplatePreview({ templateId, colorThemeId }: { templateId: string; colorThemeId: string }) {
    const TemplateComponent = getTemplateComponent(templateId);
    const theme = getTheme(templateId, colorThemeId);

    return (
        <div className="w-full h-full overflow-hidden border-2 border-black bg-white relative">
            <div
                className="origin-top-left pointer-events-none"
                style={{
                    transform: 'scale(0.24)',
                    width: `${100 / 0.24}%`,
                }}
            >
                <TemplateComponent data={templatePreviewData} theme={theme} />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none" />
        </div>
    );
}

const recommendedTemplateIds = new Set(['professional', 'modern', 'ats']);

export default function TemplateGallery({ templates }: TemplateGalleryProps) {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreating, setIsCreating] = useState<string | null>(null);
    const [hoveredColors, setHoveredColors] = useState<Record<string, string>>({});

    const filteredTemplates = templates.filter(t => {
        const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
        const matchesSearch = searchQuery === '' ||
            t.nameDutch.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const categoryCounts: Record<string, number> = {
        all: templates.length,
        classic: templates.filter(t => t.category === 'classic').length,
        modern: templates.filter(t => t.category === 'modern').length,
        creative: templates.filter(t => t.category === 'creative').length,
        minimal: templates.filter(t => t.category === 'minimal').length,
    };

    const handleSelectTemplate = async (templateId: string, defaultThemeId: string) => {
        setIsCreating(templateId);
        try {
            track('start_cv', { entryPoint: 'template_gallery', templateId });
            const attribution = getStoredAttribution();
            const response = await fetch('/api/create-cv', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    templateId,
                    colorThemeId: defaultThemeId,
                    attribution,
                    startSource: 'template_gallery',
                }),
            });
            const raw = await response.text();
            let data: { cvId?: string; error?: string } | null = null;
            if (raw) {
                try {
                    data = JSON.parse(raw) as { cvId?: string; error?: string };
                } catch {
                    data = null;
                }
            }

            if (!response.ok) {
                if (response.status === 401) {
                    router.push(`/login?next=${encodeURIComponent('/templates')}`);
                    return;
                }
                const message = data?.error || `Request failed with status ${response.status}`;
                throw new Error(message);
            }

            if (!data?.cvId || typeof data.cvId !== 'string') {
                throw new Error('Missing cvId in create-cv response');
            }

            router.push(`/editor?id=${data.cvId}`);
        } catch (error) {
            console.error('Error creating CV:', error);
        } finally {
            setIsCreating(null);
        }
    };

    const getActiveTheme = (template: TemplateConfig): ColorTheme => {
        const hoveredThemeId = hoveredColors[template.id];
        if (hoveredThemeId) {
            return template.colorThemes.find(t => t.id === hoveredThemeId) || template.colorThemes[0];
        }
        return template.colorThemes.find(t => t.id === template.defaultThemeId) || template.colorThemes[0];
    };

    return (
        <div className="min-h-screen bg-[#FFFEF0]">
            {/* Decorative background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-32 left-20 w-40 h-40 bg-purple-300 rounded-full opacity-30" />
                <div className="absolute top-60 right-32 w-32 h-32 bg-yellow-300 rounded-full opacity-30" />
                <div className="absolute bottom-60 left-1/3 w-28 h-28 bg-blue-300 rounded-full opacity-30" />
                <div className="absolute bottom-32 right-1/4 w-36 h-36 bg-green-300 rounded-full opacity-30" />
            </div>

            {/* Header */}
            <header className="relative z-10 border-b-4 border-black bg-white sticky top-0">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="font-black text-3xl tracking-tight text-black">
                            Werk<span className="bg-yellow-400 px-1">CV</span>.nl
                        </span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <NavUserMenu />
                        <div className="text-sm font-bold text-black bg-blue-400 px-3 py-1 border-2 border-black">
                            Kies je template
                        </div>
                    </div>
                </div>
            </header>

            <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
                {/* Hero */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-black text-black mb-4">
                        Kies je{" "}
                        <span className="bg-purple-400 px-2 -rotate-1 inline-block border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            CV template
                        </span>
                    </h1>
                    <p className="text-xl font-medium text-black max-w-2xl mx-auto">
                        Selecteer een professioneel ontwerp dat bij jou past.
                        <br />
                        <span className="bg-green-200 px-1">Alle templates zijn ATS-vriendelijk.</span>
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-6">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Zoek op naam of stijl..."
                        className="w-full border-4 border-black px-4 py-3 text-sm font-medium focus:ring-0 outline-none bg-white text-black placeholder:text-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    />
                </div>

                {/* Category Filter */}
                <div className="flex justify-center gap-3 mb-10 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap">
                    {Object.entries(categoryLabels).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedCategory(key)}
                            className={`px-5 py-2 font-bold text-sm border-3 border-black transition-all whitespace-nowrap flex items-center gap-2 ${
                                selectedCategory === key
                                    ? 'bg-black text-white shadow-none translate-x-[2px] translate-y-[2px]'
                                    : 'bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]'
                            }`}
                            style={{ borderWidth: '3px' }}
                        >
                            {label}
                            <span className={`text-xs font-black px-1.5 py-0.5 border-2 border-current ${
                                selectedCategory === key ? 'bg-white/20' : 'bg-gray-100'
                            }`}>
                                {categoryCounts[key]}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Template Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates.map((template) => {
                        const activeTheme = getActiveTheme(template);

                        return (
                            <div
                                key={template.id}
                                className="bg-white border-4 border-black overflow-hidden transition-all duration-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] group relative"
                            >
                                {/* Aanbevolen badge */}
                                {recommendedTemplateIds.has(template.id) && (
                                    <div className="absolute top-2 right-2 z-20 bg-yellow-400 border-3 border-black px-2 py-0.5 text-xs font-black rotate-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" style={{ borderWidth: '3px' }}>
                                        Aanbevolen
                                    </div>
                                )}

                                {/* Preview with sample data */}
                                <div
                                    className="h-56 md:h-72 relative overflow-hidden p-4"
                                    style={{ backgroundColor: '#f5f5f5' }}
                                >
                                    {/* Mini CV preview */}
                                    <div className="relative z-10 h-full transition-transform duration-200 group-hover:scale-[1.01]">
                                        <RichTemplatePreview templateId={template.id} colorThemeId={activeTheme.id} />
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-5 border-t-4 border-black bg-white">
                                    <h3 className="text-xl font-black text-black mb-1">
                                        {template.nameDutch}
                                    </h3>
                                    <p className="text-sm font-medium text-black mb-4">
                                        {template.description}
                                    </p>

                                    {/* Color themes - interactive preview */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-xs font-bold text-black">Kleuren:</span>
                                        <div className="flex gap-1">
                                            {template.colorThemes.slice(0, 6).map((theme) => (
                                                <button
                                                    key={theme.id}
                                                    className={`w-7 h-7 border-2 border-black transition-all ${
                                                        activeTheme.id === theme.id
                                                            ? 'scale-110 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                                            : 'hover:scale-105'
                                                    }`}
                                                    style={{ backgroundColor: theme.primary }}
                                                    title={theme.name}
                                                    onMouseEnter={() => setHoveredColors(prev => ({ ...prev, [template.id]: theme.id }))}
                                                    onMouseLeave={() => setHoveredColors(prev => ({ ...prev, [template.id]: '' }))}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <button
                                        onClick={() => handleSelectTemplate(template.id, template.defaultThemeId)}
                                        disabled={isCreating !== null}
                                        className={`w-full py-3 font-black text-sm border-3 border-black transition-all ${
                                            isCreating === template.id
                                                ? 'bg-gray-300 text-gray-600 cursor-wait shadow-none'
                                                : 'bg-yellow-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]'
                                        }`}
                                        style={{ borderWidth: '3px' }}
                                    >
                                        {isCreating === template.id ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <div className="w-4 h-4 border-3 border-black border-t-transparent rounded-full animate-spin" />
                                                Bezig...
                                            </span>
                                        ) : (
                                            'Kies template'
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty state */}
                {filteredTemplates.length === 0 && (
                    <div className="text-center py-16">
                        <div className="inline-block bg-yellow-400 border-4 border-black px-8 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <p className="font-bold text-black">
                                {searchQuery
                                    ? `Geen templates gevonden voor "${searchQuery}". Probeer een andere zoekterm.`
                                    : 'Geen templates gevonden in deze categorie.'
                                }
                            </p>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
