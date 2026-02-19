import { ImageResponse } from 'next/og';
import { getArticleBySlug } from '@/lib/cv-tips/registry';
import { articleCategoryLabels } from '@/lib/cv-tips/types';
import { buildOgImage } from '@/lib/og-image';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const categoryColors: Record<string, string> = {
    schrijven: '#FF6B6B',
    solliciteren: '#4ECDC4',
    carriere: '#FACC15',
    opmaak: '#C084FC',
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = getArticleBySlug(slug);
    const title = article?.title ?? 'CV Tips & Advies';
    const category = article ? articleCategoryLabels[article.category] : 'CV Tip';
    const color = article ? (categoryColors[article.category] ?? '#FACC15') : '#FACC15';

    return new ImageResponse(
        buildOgImage({ title, label: category, labelColor: color }),
        { width: 1200, height: 630 }
    );
}
