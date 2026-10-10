import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { isAppV2Active } from '@/lib/app-v2';
import DashboardScreen from '@/app/mijn-cvs/DashboardScreen';

export const metadata: Metadata = {
    title: 'My CVs | WerkCV',
    robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function MyCvsPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
    const user = await getCurrentUser();
    if (!user) redirect('/login?locale=en&next=/en/my-cvs');
    // Without the new app there is only the Dutch list page.
    if (!(await isAppV2Active())) redirect('/mijn-cvs');

    const { tab } = await searchParams;
    return <DashboardScreen tab={tab} locale="en" />;
}
