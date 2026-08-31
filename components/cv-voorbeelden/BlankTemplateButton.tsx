'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getStoredAttribution, track } from '@/lib/analytics';
import { PENDING_EXAMPLE_CV_STORAGE_KEY, type PendingExampleCV } from '@/lib/pending-example-cv';

interface BlankTemplateButtonProps {
    templateId: string;
    colorThemeId: string;
}

export function BlankTemplateButton({ templateId, colorThemeId }: BlankTemplateButtonProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function handleClick() {
        setIsLoading(true);
        try {
            track('start_cv', { entryPoint: 'example_blank_template', templateId });
            const attribution = getStoredAttribution();
            const res = await fetch('/api/create-cv', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    templateId,
                    colorThemeId,
                    attribution,
                    startSource: 'example_blank_template',
                }),
            });

            if (res.status === 401) {
                const pendingExample: PendingExampleCV = {
                    templateId,
                    colorThemeId,
                    startSource: 'example_blank_template',
                };
                window.sessionStorage.setItem(PENDING_EXAMPLE_CV_STORAGE_KEY, JSON.stringify(pendingExample));
                const nextPath = `/editor?template=${encodeURIComponent(templateId)}&startSource=example_blank_template`;
                router.push(`/login?next=${encodeURIComponent(nextPath)}`);
                return;
            }

            if (!res.ok) {
                throw new Error('CREATE_CV_FAILED');
            }

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
            className="wk-button wk-button-secondary disabled:opacity-60 disabled:cursor-not-allowed"
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
                'Leeg template'
            )}
        </button>
    );
}
