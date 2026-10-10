'use client';
/* eslint-disable react-hooks/static-components */

import { useEffect, useRef, useState } from 'react';
import type { CVData } from '@/lib/cv';
import { getTemplateComponent } from '@/app/editor/templates';
import { getDefaultThemeId, getThemeById } from '@/lib/templates/registry';
import { LinkTextProvider } from '@/app/editor/templates/link-utils';

// A4 at 96 dpi: the width the templates are designed for.
const A4_WIDTH_PX = 794;

export function CvThumbnail({ data, templateId, colorThemeId }: { data: CVData; templateId: string; colorThemeId?: string }) {
    const frameRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.3);
    const TemplateComponent = getTemplateComponent(templateId);
    const theme = getThemeById(colorThemeId || getDefaultThemeId(templateId));

    useEffect(() => {
        const frame = frameRef.current;
        if (!frame) return;
        const update = () => setScale(frame.clientWidth / A4_WIDTH_PX);
        update();
        const observer = new ResizeObserver(update);
        observer.observe(frame);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={frameRef} aria-hidden="true" className="relative aspect-[210/240] w-full overflow-hidden rounded-t-md bg-white shadow-[0_1px_2px_rgb(24_33_31/0.08)]">
            <div className="pointer-events-none origin-top-left" style={{ width: A4_WIDTH_PX, transform: `scale(${scale})` }}>
                <LinkTextProvider disableAnchors>
                    <TemplateComponent data={data} theme={theme} />
                </LinkTextProvider>
            </div>
        </div>
    );
}
