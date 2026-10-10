import { getUserCVs } from '@/app/actions';
import AppShell from '@/components/app/AppShell';
import { isLettersTab, type AppLocale } from '@/lib/app-v2-paths';
import Dashboard from './Dashboard';
import { getUserCoverLetters } from './actions';

// The app v2 dashboard, shared by /mijn-cvs and /en/my-cvs. Callers check login and the flag.
export default async function DashboardScreen({ tab, locale }: { tab: string | undefined; locale: AppLocale }) {
    const letters = isLettersTab(tab);
    const [library, coverLetters] = await Promise.all([
        getUserCVs(),
        letters ? getUserCoverLetters() : Promise.resolve([]),
    ]);
    return (
        <AppShell active={letters ? 'letters' : 'cvs'} locale={locale}>
            <Dashboard tab={letters ? 'letters' : 'cvs'} initialResult={library} letters={coverLetters} locale={locale} />
        </AppShell>
    );
}
