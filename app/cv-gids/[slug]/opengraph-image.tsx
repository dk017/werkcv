import { ImageResponse } from 'next/og';
import { getDutchWavePage } from '@/lib/seo-wave/data';
import { buildOgImage } from '@/lib/og-image';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = getDutchWavePage(slug);
    const title = page?.title ?? 'CV Gids';

    return new ImageResponse(
        buildOgImage({ title, label: 'CV Gids', labelColor: '#4ECDC4' }),
        { width: 1200, height: 630 }
    );
}
