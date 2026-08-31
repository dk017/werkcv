'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CVData } from '@/lib/cv';
import { getStoredAttribution, track } from '@/lib/analytics';
import { PENDING_EXAMPLE_CV_STORAGE_KEY, type PendingExampleCV } from '@/lib/pending-example-cv';

interface UseExampleButtonProps {
    templateId: string;
    colorThemeId: string;
    sampleCV: CVData;
    label?: string;
    startSource?: PendingExampleCV["startSource"];
    pagePath?: string;
    uiLanguage?: "nl" | "en";
    variant?: "primary" | "quiet";
    trackingLocation?: string;
    trackingLabel?: string;
}

export function UseExampleButton({
    templateId,
    colorThemeId,
    sampleCV,
    label = 'Gebruik dit voorbeeld',
    startSource = 'example_page',
    pagePath,
    uiLanguage = 'nl',
    variant = 'primary',
    trackingLocation,
    trackingLabel,
}: UseExampleButtonProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const requestInFlightRef = useRef(false);

    async function handleClick() {
        if (requestInFlightRef.current) return;
        requestInFlightRef.current = true;
        setIsLoading(true);
        setErrorMessage(null);
        try {
            track('start_cv', { entryPoint: startSource, templateId, pagePath, uiLanguage });
            if (trackingLocation && trackingLabel) {
                track('cta_clicked', { location: trackingLocation, label: trackingLabel });
            }
            const attribution = getStoredAttribution();
            const res = await fetch('/api/create-cv', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    templateId,
                    colorThemeId,
                    initialData: sampleCV,
                    attribution,
                    startSource,
                    uiLanguage,
                    workspace: 'consumer',
                }),
            });

            if (res.status === 401) {
                const pendingExample: PendingExampleCV = {
                    templateId,
                    colorThemeId,
                    sampleCV,
                    startSource,
                    pagePath,
                    uiLanguage,
                };
                window.sessionStorage.setItem(PENDING_EXAMPLE_CV_STORAGE_KEY, JSON.stringify(pendingExample));
                const editorPath = uiLanguage === 'en' ? '/en/editor' : '/editor';
                const nextPath = `${editorPath}?template=${encodeURIComponent(templateId)}&startSource=${encodeURIComponent(startSource)}`;
                router.push(`/login?next=${encodeURIComponent(nextPath)}`);
                return;
            }

            if (!res.ok) {
                throw new Error('CREATE_CV_FAILED');
            }

            const { cvId } = await res.json();
            const editorPath = uiLanguage === 'en' ? '/en/editor' : '/editor';
            const editorParams = new URLSearchParams({
                id: cvId,
                template: templateId,
                startSource,
            });
            router.push(`${editorPath}?${editorParams.toString()}`);
        } catch {
            setErrorMessage('Het ingevulde voorbeeld kon niet worden geopend. Probeer het opnieuw.');
            setIsLoading(false);
            requestInFlightRef.current = false;
        }
    }

    return (
        <div className="inline-flex flex-col items-start gap-2">
        <button
            type="button"
            onClick={handleClick}
            disabled={isLoading}
            className={variant === 'quiet'
                ? 'wk-button wk-button-secondary'
                : 'wk-button wk-button-primary'}
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
                label
            )}
        </button>
        {errorMessage ? (
            <p className="max-w-sm text-sm font-semibold text-[var(--wk-danger)]" role="alert" aria-live="polite">
                {errorMessage}
            </p>
        ) : null}
        </div>
    );
}
