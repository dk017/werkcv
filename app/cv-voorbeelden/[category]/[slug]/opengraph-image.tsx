import { ImageResponse } from 'next/og';
import { getExampleBySlug } from '@/lib/cv-voorbeelden/registry';
import { buildOgImage } from '@/lib/og-image';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ category: string; slug: string }> }) {
    const { category, slug } = await params;
    const example = getExampleBySlug(category, slug);
    const title = example?.heroTitle ?? example?.name ?? 'CV Voorbeeld';
    const label = example?.category?.name ?? 'CV Voorbeeld';

    return new ImageResponse(
        buildOgImage({ title, label, labelColor: '#4ECDC4' }),
        { width: 1200, height: 630 }
    );
}
