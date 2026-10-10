import { redirect } from 'next/navigation';
import { getCVWithSettings } from '@/app/actions';
import CoverLetterEditor from '@/app/cover-letter/CoverLetterEditor';
import AppShell from '@/components/app/AppShell';
import { getCurrentUser } from '@/lib/auth';
import { isAppV2Active } from '@/lib/app-v2';
import { appPaths, type AppLocale } from '@/lib/app-v2-paths';

// Cover letter workspace inside the app v2 frame (/mijn-cvs/brief, /en/my-cvs/letter).
// Without the new app it sends people to the classic workspace.
export default async function LetterScreen({ id, locale }: { id: string | undefined; locale: AppLocale }) {
    const paths = appPaths(locale);
    const user = await getCurrentUser();
    if (!user) {
        const next = id ? paths.coverLetter(id) : paths.letters;
        redirect(`/login?locale=${locale}&next=${encodeURIComponent(next)}`);
    }
    if (!id) redirect(paths.letters);
    if (!(await isAppV2Active())) redirect(paths.classicCoverLetter(id));

    const cv = await getCVWithSettings(id, 'personal');
    if (!cv) redirect(paths.letters);

    return (
        <AppShell active="letters" locale={locale}>
            <CoverLetterEditor cvId={id} initialTargetRole={cv.data.personal.title} uiLanguage={locale} variant="app" />
        </AppShell>
    );
}
