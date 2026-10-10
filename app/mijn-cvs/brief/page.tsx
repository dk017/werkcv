import type { Metadata } from 'next';
import LetterScreen from '../LetterScreen';

export const metadata: Metadata = {
    title: 'Sollicitatiebrief | WerkCV',
    robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function DashboardLetterPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
    const { id } = await searchParams;
    return <LetterScreen id={id} locale="nl" />;
}
