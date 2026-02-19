import { ImageResponse } from 'next/og';
import { getEnglishWavePage } from '@/lib/seo-wave/data';
import { buildOgImage } from '@/lib/og-image';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = getEnglishWavePage(slug);
    const title = page?.title ?? 'Netherlands CV Guide';

    return new ImageResponse(
        buildOgImage({ title, label: 'Netherlands CV Guide', labelColor: '#60A5FA', isEnglish: true }),
        { width: 1200, height: 630 }
    );
}
