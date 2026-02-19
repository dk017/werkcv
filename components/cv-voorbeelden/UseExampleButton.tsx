'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CVData } from '@/lib/cv';
import { getStoredAttribution, track } from '@/lib/analytics';

interface UseExampleButtonProps {
    templateId: string;
    colorThemeId: string;
    sampleCV: CVData;
}

export function UseExampleButton({ templateId, colorThemeId, sampleCV }: UseExampleButtonProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function handleClick() {
        setIsLoading(true);
        try {
            track('start_cv', { entryPoint: 'example_page', templateId });
            const attribution = getStoredAttribution();
            const res = await fetch('/api/create-cv', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    templateId,
                    colorThemeId,
                    initialData: sampleCV,
                    attribution,
                    startSource: 'example_page',
                }),
            });

            const { cvId } = await res.json();
            router.push(`/editor?id=${cvId}`);
        } catch {
            setIsLoading(false);
        }
    }

    return (
        <button
            onClick={handleClick}
            disabled={isLoading}
            className="inline-flex items-center gap-2 bg-[#FF6B6B] text-white font-bold px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Laden...
                </>
            ) : (
                'Gebruik dit voorbeeld'
            )}
        </button>
    );
}
