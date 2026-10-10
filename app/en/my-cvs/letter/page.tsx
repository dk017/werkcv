import type { Metadata } from 'next';
import LetterScreen from '@/app/mijn-cvs/LetterScreen';

export const metadata: Metadata = {
    title: 'Cover letter | WerkCV',
    robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function DashboardLetterPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
    const { id } = await searchParams;
    return <LetterScreen id={id} locale="en" />;
}
