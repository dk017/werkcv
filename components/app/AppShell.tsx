import type { ReactNode } from 'react';
import { getCurrentUser } from '@/lib/auth';
import { AppFrame, type AppSection } from '@/components/app/AppFrame';
import type { AppLocale } from '@/lib/app-v2-paths';

export default async function AppShell({ active, locale = 'nl', children }: { active: AppSection; locale?: AppLocale; children: ReactNode }) {
    const user = await getCurrentUser();
    return (
        <AppFrame active={active} email={user?.email || ''} locale={locale}>
            {children}
        </AppFrame>
    );
}
